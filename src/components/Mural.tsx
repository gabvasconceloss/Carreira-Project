import React, { useState } from "react";
import type { DuvidaForum } from "../types";

export const Mural = () => {
  const [novaDuvida, setNovaDuvida] = useState("");
  const [duvidas, setDuvidas] = useState<DuvidaForum[]>([
    {
      id: "1",
      autor: "Aluno do 1º Ano",
      pergunta: "Preciso ser muito bom em matemática para fazer programação?",
      respondida: true,
      respostaMentor:
        "Não necessariamente! A lógica de programação é o mais importante. Com o tempo você se acostuma com os cálculos necessários.",
    },
    {
      id: "2",
      autor: "Anônimo",
      pergunta: "Qual a diferença entre ensino técnico e faculdade?",
      respondida: false,
    },
  ]);

  const enviarDuvida = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novaDuvida.trim()) return;

    const nova: DuvidaForum = {
      id: Date.now().toString(),
      autor: "Anônimo",
      pergunta: novaDuvida,
      respondida: false,
    };

    setDuvidas([nova, ...duvidas]);
    setNovaDuvida("");
  };

  return (
    <div className="section-container mural-container">
      <div className="form-lado">
        <h2 className="titulo-secao">Conecte-se e Tire Dúvidas</h2>
        <p>Envie sua dúvida anonimamente e nossos mentores responderão.</p>

        <form onSubmit={enviarDuvida} className="form-duvida dark-card">
          <textarea
            value={novaDuvida}
            onChange={(e) => setNovaDuvida(e.target.value)}
            placeholder="Escreva sua dúvida aqui..."
            rows={4}
          />
          <button type="submit" className="btn-primario">
            Enviar Dúvida
          </button>
        </form>
      </div>

      <div className="lista-duvidas">
        {duvidas.map((d) => (
          <div key={d.id} className="duvida-item dark-card">
            <p className="pergunta-texto">
              <strong>🤔 {d.autor}:</strong> {d.pergunta}
            </p>

            {d.respondida ? (
              <div className="resposta-mentor">
                <p>
                  <strong>💡 Resposta:</strong> {d.respostaMentor}
                </p>
              </div>
            ) : (
              <span className="badge-aguardando">
                ⏳ Aguardando resposta dos mentores...
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
