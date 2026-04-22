import React, { useState, useEffect } from "react";
import { db } from "../firebase"; // Importando a conexão
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  doc,
  updateDoc,
} from "firebase/firestore";
import type { DuvidaForum } from "../types";

interface DuvidaExpandida extends DuvidaForum {
  categoria: string;
  curtidas: number;
  respondidoPor?: string;
  data: string; // Firestore usa um objeto de data próprio
  curtidoPorMim?: boolean;
}

export const Mural = () => {
  const [abaAtiva, setAbaAtiva] = useState<"perguntar" | "explorar">(
    "explorar",
  );
  const [duvidas, setDuvidas] = useState<DuvidaExpandida[]>([]);
  const [novaDuvida, setNovaDuvida] = useState("");
  const [nomeAutor, setNomeAutor] = useState("");
  const [categoriaForm, setCategoriaForm] = useState("Vestibular");
  const [filtroAtual, setFiltroAtual] = useState("Todas");
  const [ordenacao] = useState("populares");
  const [termoBusca, setTermoBusca] = useState("");
  const [mensagemSucesso, setMensagemSucesso] = useState(false);
  const [textosRespostas, setTextosRespostas] = useState<{
    [id: string]: string;
  }>({});

  const LIMITE_CARACTERES = 500;

  // --- BUSCAR DADOS DO FIREBASE EM TEMPO REAL ---
  useEffect(() => {
    const q = query(collection(db, "duvidas"), orderBy("curtidas", "desc"));

    // Essa função fica "escutando" o banco de dados
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const dados = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as DuvidaExpandida[];
      setDuvidas(dados);
    });

    return () => unsubscribe();
  }, []);

  // --- ENVIAR NOVA DÚVIDA PARA O CLOUD ---
  const enviarDuvida = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!novaDuvida.trim()) return;

    const autorFinal = nomeAutor.trim() !== "" ? nomeAutor : "Anônimo";

    try {
      await addDoc(collection(db, "duvidas"), {
        autor: autorFinal,
        categoria: categoriaForm,
        pergunta: novaDuvida,
        respondida: false,
        curtidas: 0,
        data: new Date().toLocaleString("pt-BR"),
      });

      setNovaDuvida("");
      setNomeAutor("");
      setMensagemSucesso(true);
      setTimeout(() => {
        setMensagemSucesso(false);
        setAbaAtiva("explorar");
      }, 2000);
    } catch (error) {
      console.error("Erro ao salvar no banco:", error);
      alert("Ops! Ocorreu um erro ao salvar sua pergunta.");
    }
  };

  // --- CURTIR (INCREMENTAR NO BANCO) ---
  const curtirDuvida = (id: string) => {
    setDuvidas(
      duvidas.map((d) => {
        if (d.id === id) {
          return d.curtidoPorMim
            ? { ...d, curtidas: d.curtidas - 1, curtidoPorMim: false }
            : { ...d, curtidas: d.curtidas + 1, curtidoPorMim: true };
        }
        return d;
      }),
    );
  };

  // --- RESPONDER (SALVAR RESPOSTA NO CLOUD) ---
  const responderDuvida = async (id: string) => {
    const resposta = textosRespostas[id];
    if (!resposta || !resposta.trim()) return;

    const docRef = doc(db, "duvidas", id);
    await updateDoc(docRef, {
      respondida: true,
      respostaMentor: resposta,
      respondidoPor: "Equipe do Projeto",
    });

    setTextosRespostas((prev) => ({ ...prev, [id]: "" }));
  };

  // Lógica de Filtro + Pesquisa
  const duvidasFiltradas = duvidas
    .filter((d) =>
      filtroAtual === "Todas" ? true : d.categoria === filtroAtual,
    )
    .filter(
      (d) =>
        d.pergunta.toLowerCase().includes(termoBusca.toLowerCase()) ||
        d.autor.toLowerCase().includes(termoBusca.toLowerCase()),
    )
    .sort((a, b) => {
      if (ordenacao === "populares") return b.curtidas - a.curtidas;
      return 0;
    });

  const getCorTag = (categoria: string) => {
    switch (categoria) {
      case "Vestibular":
        return "#ff4d4d";
      case "Mercado":
        return "#4d79ff";
      case "Cursos Técnicos":
        return "#ffb84d";
      default:
        return "#8c8c8c";
    }
  };

  return (
    <div
      className="section-container"
      style={{ maxWidth: "900px", margin: "0 auto" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          marginBottom: "3rem",
          borderBottom: "2px solid #ffffff",
          paddingBottom: "1rem",
        }}
      >
        <button
          className={`btn-aba-forum ${abaAtiva === "explorar" ? "ativa" : ""}`}
          onClick={() => setAbaAtiva("explorar")}
        >
          Explorar e Responder
        </button>
        <button
          className={`btn-aba-forum ${abaAtiva === "perguntar" ? "ativa" : ""}`}
          onClick={() => setAbaAtiva("perguntar")}
        >
          Fazer uma Pergunta
        </button>
      </div>

      {abaAtiva === "perguntar" && (
        <div
          className="quiz-animacao-entra"
          style={{ maxWidth: "600px", margin: "0 auto" }}
        >
          <h2 className="titulo-secao" style={{ textAlign: "center" }}>
            Qual é a sua dúvida?
          </h2>
          <form onSubmit={enviarDuvida} className="form-duvida dark-card">
            <label style={{ color: "#ccc", fontSize: "0.9rem" }}>
              Seu Nome (Opcional):
            </label>
            <input
              type="text"
              value={nomeAutor}
              onChange={(e) => setNomeAutor(e.target.value)}
              placeholder="Ex: Raul Rosa..."
              style={{
                marginBottom: "1.5rem",
                backgroundColor: "#1a1a1a",
                color: "#fff",
                padding: "1rem",
                borderRadius: "8px",
                border: "1px solid #444",
                width: "100%",
              }}
            />

            <label style={{ color: "#ccc", fontSize: "0.9rem" }}>Tema:</label>
            <select
              className="input-busca"
              style={{
                marginBottom: "1.5rem",
                backgroundColor: "#1a1a1a",
                color: "#fff",
                padding: "1rem",
                border: "1px solid #444",
              }}
              value={categoriaForm}
              onChange={(e) => setCategoriaForm(e.target.value)}
            >
              <option value="Vestibular">ENEM / SIS UEA / PSC UFAM</option>
              <option value="Mercado">Mercado de Trabalho em Manaus</option>
              <option value="Cursos Técnicos">
                Cursos Técnicos (IFAM, SENAI, CETAM)
              </option>
              <option value="Geral">Assunto Geral</option>
            </select>

            <label style={{ color: "#ccc", fontSize: "0.9rem" }}>
              Sua pergunta:
            </label>
            <textarea
              value={novaDuvida}
              onChange={(e) => setNovaDuvida(e.target.value)}
              maxLength={LIMITE_CARACTERES}
              placeholder="Escreva aqui..."
              rows={5}
              style={{
                backgroundColor: "#1a1a1a",
                color: "#fff",
                border: "1px solid #444",
                padding: "1rem",
                borderRadius: "8px",
              }}
              required
            />
            <div
              style={{
                textAlign: "right",
                fontSize: "0.85rem",
                color: "#888",
                marginTop: "5px",
              }}
            >
              {novaDuvida.length} / {LIMITE_CARACTERES}
            </div>

            <button
              type="submit"
              className="btn-primario"
              style={{
                marginTop: "1.5rem",
                width: "100%",
                border: "2px solid #000",
              }}
            >
              Enviar pergunta
            </button>

            {mensagemSucesso && (
              <div
                style={{
                  marginTop: "1rem",
                  color: "#000",
                  textAlign: "center",
                  backgroundColor: "var(--neon-color)",
                  padding: "1rem",
                  borderRadius: "8px",
                  fontWeight: "bold",
                }}
              >
                ✓ Sua pergunta foi enviada!
              </div>
            )}
          </form>
        </div>
      )}

      {abaAtiva === "explorar" && (
        <div className="quiz-animacao-entra">
          <input
            type="text"
            placeholder="Buscar nas perguntas..."
            value={termoBusca}
            onChange={(e) => setTermoBusca(e.target.value)}
            style={{
              width: "100%",
              padding: "1rem",
              borderRadius: "8px",
              border: "2px solid #000",
              marginBottom: "1.5rem",
            }}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "1.5rem",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {[
                "Todas",
                "Vestibular",
                "Mercado",
                "Cursos Técnicos",
                "Geral",
              ].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFiltroAtual(cat)}
                  className={`btn-filtro-alto-contraste ${filtroAtual === cat ? "ativo" : ""}`}
                  style={{
                    // Se estiver ativo, usa a cor da função getCorTag, senão fica transparente
                    backgroundColor:
                      filtroAtual === cat
                        ? cat === "Todas"
                          ? "var(--neon-color)"
                          : getCorTag(cat)
                        : "transparent",

                    // Se estiver ativo, a letra fica preta para contrastar com a cor de fundo
                    color: filtroAtual === cat ? "#000000" : "#ffffff",

                    // A borda também segue a cor da tag quando ativo
                    borderColor:
                      filtroAtual === cat
                        ? cat === "Todas"
                          ? "var(--neon-color)"
                          : getCorTag(cat)
                        : "#444",

                    fontWeight: "bold",
                    transition: "all 0.3s ease", // Adiciona uma suavidade na troca de cor
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="lista-duvidas">
            {duvidasFiltradas.length === 0 ? (
              <p
                style={{
                  textAlign: "center",
                  color: "#ffffff",
                  fontWeight: "bold",
                }}
              >
                Nenhuma pergunta encontrada.
              </p>
            ) : (
              duvidasFiltradas.map((d) => (
                <div
                  key={d.id}
                  className="duvida-item dark-card"
                  style={{ position: "relative" }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.8rem",
                      marginBottom: "1rem",
                    }}
                  >
                    <span
                      style={{
                        backgroundColor: getCorTag(d.categoria),
                        color: "#fff",
                        fontSize: "0.7rem",
                        fontWeight: "bold",
                        padding: "0.3rem 0.6rem",
                        borderRadius: "4px",
                        border: "1px solid #000",
                      }}
                    >
                      {d.categoria}
                    </span>
                    <span style={{ fontSize: "0.8rem", color: "#aaa" }}>
                      {d.autor} • {d.data}
                    </span>
                  </div>

                  <p className="pergunta-texto">
                    <strong>{d.pergunta}</strong>
                  </p>

                  {d.respondida ? (
                    <div
                      className="resposta-mentor"
                      style={{
                        borderLeft: "4px solid var(--neon-color)",
                        backgroundColor: "#1a1a1a",
                      }}
                    >
                      <span className="badge-equipe" style={{ color: "#000" }}>
                        {d.respondidoPor}
                      </span>
                      <p style={{ marginTop: "0.5rem", color: "#ddd" }}>
                        {d.respostaMentor}
                      </p>
                    </div>
                  ) : (
                    <div
                      style={{
                        marginTop: "1rem",
                        borderTop: "1px solid #333",
                        paddingTop: "1rem",
                      }}
                    >
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        <input
                          type="text"
                          placeholder="Responder..."
                          value={textosRespostas[d.id] || ""}
                          onChange={(e) =>
                            setTextosRespostas({
                              ...textosRespostas,
                              [d.id]: e.target.value,
                            })
                          }
                          style={{
                            flex: 1,
                            padding: "0.5rem",
                            backgroundColor: "#111",
                            color: "#fff",
                            border: "1px solid #444",
                            borderRadius: "4px",
                          }}
                        />
                        <button
                          onClick={() => responderDuvida(d.id)}
                          style={{
                            backgroundColor: "var(--neon-color)",
                            border: "none",
                            padding: "0 1rem",
                            borderRadius: "4px",
                            fontWeight: "bold",
                            cursor: "pointer",
                          }}
                        >
                          OK
                        </button>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => curtirDuvida(d.id)}
                    className="btn-curtir"
                    style={{ marginTop: "1.5rem", color: "var(--neon-color)" }}
                  >
                    👍 {d.curtidas} curtidas
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
