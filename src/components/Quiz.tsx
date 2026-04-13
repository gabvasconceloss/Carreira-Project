import { useState } from "react";
import type { PerguntaQuiz } from "../types";

const perguntasMock: PerguntaQuiz[] = [
  {
    id: 1,
    texto:
      "Quando um jogo ou aplicativo dá erro, você gosta de fuçar nas configurações para tentar consertar?",
    eixo: "tecnologia",
  },
  {
    id: 2,
    texto:
      "Você se imagina trabalhando em um computador a maior parte do dia, criando coisas novas ou resolvendo problemas lógicos?",
    eixo: "tecnologia",
  },
  {
    id: 3,
    texto:
      "Você presta atenção em como os sites e aplicativos são desenhados e pensa em como poderiam ser melhores?",
    eixo: "tecnologia",
  },
  {
    id: 4,
    texto:
      "Quando rola uma discussão na sala de aula ou na internet, você gosta de argumentar e defender seu ponto de vista?",
    eixo: "humanas",
  },
  {
    id: 5,
    texto:
      "Você tem facilidade para escrever textos, redações ou explicar assuntos complexos para seus colegas?",
    eixo: "humanas",
  },
  {
    id: 6,
    texto:
      "Você se interessa muito por questões sociais, história, cultura ou política?",
    eixo: "humanas",
  },
  {
    id: 7,
    texto:
      "Você tem curiosidade natural sobre como o corpo humano funciona, doenças ou nutrição?",
    eixo: "saude",
  },
  {
    id: 8,
    texto:
      "Se alguém se machuca na quadra da escola, você mantém a calma e tenta ajudar nos primeiros socorros?",
    eixo: "saude",
  },
  {
    id: 9,
    texto:
      "Você gosta de documentários ou canais no YouTube sobre animais, natureza ou biologia?",
    eixo: "saude",
  },
  {
    id: 10,
    texto:
      "Você acha mais satisfatório resolver um cálculo matemático que tem um resultado exato do que escrever uma redação?",
    eixo: "exatas",
  },
  {
    id: 11,
    texto:
      "Você é a pessoa do grupo de amigos que organiza o dinheiro, faz as contas do lanche ou planeja os gastos?",
    eixo: "exatas",
  },
  {
    id: 12,
    texto:
      "Você gosta de entender como as coisas são construídas por dentro (prédios, motores, máquinas)?",
    eixo: "exatas",
  },
];

// O "Banco de Dados" dos resultados focado em Manaus
const dadosResultado = {
  tecnologia: {
    titulo: "Tecnologia & Inovação",
    icone: "💻",
    descricao:
      "O mercado de TI em Manaus cresce rápido, com muitas oportunidades no Polo Digital e no Distrito Industrial.",
    faculdades: [
      "Engenharia de Software",
      "Ciência da Computação",
      "Sistemas de Informação",
      "Engenharia de Computação",
      "Jogos Digitais",
      "Defesa Cibernética",
      "Análise de Sistemas",
    ],
    tecnicos: [
      "Técnico em Informática",
      "Redes de Computadores",
      "Desenvolvimento de Sistemas",
      "Manutenção e Suporte",
      "Computação Gráfica",
    ],
    dica: "Dica: Fique de olho nos cursos do Ocean Samsung (UEA) e nos hackathons do Casarão da Inovação Cassina!",
  },
  humanas: {
    titulo: "Comunicação, Gestão & Artes",
    icone: "🗣️",
    descricao:
      "Manaus possui um setor de serviços e comércio muito forte, além de uma riqueza cultural única para áreas criativas.",
    faculdades: [
      "Direito",
      "Psicologia",
      "Administração",
      "Pedagogia",
      "Jornalismo",
      "Publicidade",
      "Design",
      "Serviço Social",
      "Letras",
      "Turismo",
      "Arqueologia",
    ],
    tecnicos: [
      "Técnico em Administração",
      "Recursos Humanos",
      "Logística",
      "Marketing",
      "Guia de Turismo",
      "Secretariado",
      "Vendas",
    ],
    dica: "Dica: Explore os projetos culturais do Teatro Amazonas e as oportunidades de estágio em RH no Distrito Industrial.",
  },
  saude: {
    titulo: "Saúde & Biodiversidade",
    icone: "🧬",
    descricao:
      "Com a maior biodiversidade do mundo ao redor, Manaus é um polo para pesquisa biológica e saúde regional.",
    faculdades: [
      "Medicina",
      "Enfermagem",
      "Odontologia",
      "Farmácia",
      "Fisioterapia",
      "Nutrição",
      "Medicina Veterinária",
      "Biomedicina",
      "Educação Física",
      "Biotecnologia",
      "Ciências Biológicas",
    ],
    tecnicos: [
      "Técnico em Enfermagem",
      "Radiologia",
      "Saúde Bucal",
      "Estética",
      "Análises Clínicas",
      "Agente Comunitário de Saúde",
    ],
    dica: "Dica: Pesquise sobre o trabalho do INPA e da Fundação Medicina Tropical, referências mundiais aqui em Manaus.",
  },
  exatas: {
    titulo: "Engenharias & Produção Industrial",
    icone: "📐",
    descricao:
      "O Polo Industrial de Manaus (PIM) é um dos maiores do Brasil e precisa constantemente de profissionais técnicos e engenheiros.",
    faculdades: [
      "Engenharia de Produção",
      "Engenharia Mecânica",
      "Engenharia Elétrica",
      "Engenharia Civil",
      "Engenharia de Controle e Automação",
      "Arquitetura",
      "Geologia",
      "Química",
      "Matemática",
      "Física",
    ],
    tecnicos: [
      "Mecatrônica",
      "Eletrotécnica",
      "Mecânica Industrial",
      "Automação Industrial",
      "Edificações",
      "Qualidade",
      "Segurança do Trabalho",
    ],
    dica: "Dica: Cursos técnicos no IFAM ou SENAI são portas de entrada excelentes para as fábricas do Distrito.",
  },
};

// --- A MÁGICA 1: O Quiz agora recebe a função 'setEixo' ---
export const Quiz = ({
  mudarAba,
  setEixo,
}: {
  mudarAba: (aba: string) => void;
  setEixo: (eixo: string) => void;
}) => {
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [pontuacao, setPontuacao] = useState({
    tecnologia: 0,
    humanas: 0,
    saude: 0,
    exatas: 0,
  });
  const [finalizado, setFinalizado] = useState(false);
  const [animando, setAnimando] = useState(false);

  const responder = (peso: number) => {
    if (animando) return;

    const eixoAtual = perguntasMock[indiceAtual].eixo;
    setPontuacao((prev) => ({ ...prev, [eixoAtual]: prev[eixoAtual] + peso }));

    setAnimando(true);
    setTimeout(() => {
      if (indiceAtual + 1 < perguntasMock.length) {
        setIndiceAtual(indiceAtual + 1);
      } else {
        setFinalizado(true);
      }
      setAnimando(false);
    }, 300);
  };

  const progresso = (indiceAtual / perguntasMock.length) * 100;

  if (finalizado) {
    const totalPontos =
      pontuacao.tecnologia +
      pontuacao.humanas +
      pontuacao.saude +
      pontuacao.exatas;

    if (totalPontos === 0) {
      return (
        <div className="section-container">
          <div className="quiz-card dark-card quiz-finalizado quiz-animacao-entra">
            <h2>Nenhuma afinidade clara detectada 🤔</h2>
            <p style={{ marginTop: "1rem", color: "#ccc" }}>
              Parece que você não se identificou com nenhuma das situações. E
              está tudo bem! O primeiro ano do ensino médio é exatamente para
              descobrir coisas novas.
            </p>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "center",
                marginTop: "2rem",
              }}
            >
              <button
                className="btn-primario"
                onClick={() => window.location.reload()}
              >
                Tentar Novamente
              </button>
            </div>
          </div>
        </div>
      );
    }

    const resultados = [
      {
        id: "tecnologia",
        nome: "Tecnologia",
        valor: Math.round((pontuacao.tecnologia / totalPontos) * 100),
      },
      {
        id: "humanas",
        nome: "Humanas",
        valor: Math.round((pontuacao.humanas / totalPontos) * 100),
      },
      {
        id: "saude",
        nome: "Saúde",
        valor: Math.round((pontuacao.saude / totalPontos) * 100),
      },
      {
        id: "exatas",
        nome: "Exatas",
        valor: Math.round((pontuacao.exatas / totalPontos) * 100),
      },
    ].sort((a, b) => b.valor - a.valor);

    const eixoVencedorId = resultados[0].id as keyof typeof dadosResultado;
    const infoVencedor = dadosResultado[eixoVencedorId];

    return (
      <div className="section-container">
        <div
          className="quiz-card dark-card quiz-finalizado quiz-animacao-entra"
          style={{ maxWidth: "700px", margin: "0 auto" }}
        >
          <h2
            style={{
              fontSize: "1.2rem",
              color: "#888",
              textTransform: "uppercase",
            }}
          >
            Seu Perfil Principal é:
          </h2>
          <h3
            className="destaque-neon"
            style={{ fontSize: "2.5rem", margin: "0.5rem 0" }}
          >
            {infoVencedor.icone} {infoVencedor.titulo}
          </h3>
          <p style={{ color: "#ccc", marginBottom: "2rem" }}>
            {infoVencedor.descricao}
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "2rem",
              textAlign: "left",
              backgroundColor: "#111",
              padding: "1.5rem",
              borderRadius: "8px",
            }}
          >
            <div>
              <h4
                style={{ color: "var(--neon-color)", marginBottom: "0.8rem" }}
              >
                🎓 Cursos Superiores (Faculdade)
              </h4>
              <div
                className="cursos-lista"
                style={{ justifyContent: "flex-start" }}
              >
                {infoVencedor.faculdades.map((curso) => (
                  <span key={curso} className="curso-badge">
                    {curso}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 style={{ color: "#aaa", marginBottom: "0.8rem" }}>
                🛠️ Cursos Técnicos Rápidos
              </h4>
              <div
                className="cursos-lista"
                style={{ justifyContent: "flex-start" }}
              >
                {infoVencedor.tecnicos.map((curso) => (
                  <span key={curso} className="curso-badge tecnico">
                    {curso}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "rgba(204, 255, 0, 0.1)",
              padding: "1rem",
              borderRadius: "8px",
              marginTop: "1.5rem",
              textAlign: "left",
              borderLeft: "4px solid var(--neon-color)",
            }}
          >
            <strong>Próximo Passo: </strong>
            {infoVencedor.dica}
          </div>

          <div
            style={{
              marginTop: "2.5rem",
              marginBottom: "1rem",
              textAlign: "left",
            }}
          >
            <h4
              style={{
                marginBottom: "1rem",
                borderBottom: "1px solid #333",
                paddingBottom: "0.5rem",
              }}
            >
              Análise Completa:
            </h4>
            {resultados.map((res) => (
              <div key={res.id} style={{ marginBottom: "0.8rem" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "0.2rem",
                    fontSize: "0.85rem",
                  }}
                >
                  <span>{res.nome}</span>
                  <strong>{res.valor}%</strong>
                </div>
                <div
                  style={{
                    width: "100%",
                    backgroundColor: "#333",
                    height: "6px",
                    borderRadius: "4px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${res.valor}%`,
                      backgroundColor: "var(--neon-color)",
                      height: "100%",
                      borderRadius: "4px",
                      transition: "width 1s ease",
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              marginTop: "2rem",
            }}
          >
            {/* --- A MÁGICA 2: O clique envia o nome do eixo vencedor (Ex: "Tecnologia") e depois muda de tela --- */}
            <button
              className="btn-primario"
              onClick={() => {
                setEixo(resultados[0].nome);
                mudarAba("carreiras");
              }}
            >
              BUSCAR ESSAS CARREIRAS NO CATÁLOGO
            </button>
            <button
              className="btn-peso-0"
              onClick={() => window.location.reload()}
              style={{ border: "none", textDecoration: "underline" }}
            >
              Refazer o teste vocacional
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section-container">
      <div className="quiz-card dark-card">
        <div className="progresso-container">
          <div
            className="progresso-barra"
            style={{ width: `${progresso}%` }}
          ></div>
        </div>

        <span className="quiz-contador">
          Passo {indiceAtual + 1} de {perguntasMock.length}
        </span>

        <div className={animando ? "quiz-animacao-sai" : "quiz-animacao-entra"}>
          <h2 style={{ minHeight: "100px", marginTop: "1rem" }}>
            {perguntasMock[indiceAtual].texto}
          </h2>

          <div className="botoes-escala">
            <button
              onClick={() => responder(2)}
              className="btn-opcao btn-peso-2"
            >
              COM CERTEZA!
            </button>
            <button
              onClick={() => responder(1)}
              className="btn-opcao btn-peso-1"
            >
              ÀS VEZES / UM POUCO
            </button>
            <button
              onClick={() => responder(0)}
              className="btn-opcao btn-peso-0"
            >
              NADA A VER COMIGO
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
