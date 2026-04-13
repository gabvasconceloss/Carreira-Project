import { useState } from "react";
import type { PerguntaQuiz } from "../types";

const perguntasMock: PerguntaQuiz[] = [
  {
    id: 1,
    texto: "Você gosta de resolver problemas lógicos e usar o computador?",
    eixo: "tecnologia",
  },
  {
    id: 2,
    texto: "Você tem facilidade em se comunicar e entender as pessoas?",
    eixo: "humanas",
  },
  {
    id: 3,
    texto: "Você se interessa por biologia e cuidados com a saúde?",
    eixo: "saude",
  },
  {
    id: 4,
    texto: "Você prefere trabalhar com números, cálculos e construções?",
    eixo: "exatas",
  },
];

export const Quiz = () => {
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [pontuacao, setPontuacao] = useState({
    tecnologia: 0,
    humanas: 0,
    saude: 0,
    exatas: 0,
  });
  const [finalizado, setFinalizado] = useState(false);

  const responder = (resposta: "sim" | "nao") => {
    if (resposta === "sim") {
      const eixoAtual = perguntasMock[indiceAtual].eixo;
      setPontuacao((prev) => ({ ...prev, [eixoAtual]: prev[eixoAtual] + 1 }));
    }

    if (indiceAtual + 1 < perguntasMock.length) {
      setIndiceAtual(indiceAtual + 1);
    } else {
      setFinalizado(true);
    }
  };

  if (finalizado) {
    // Lógica simples para pegar o eixo com maior pontuação
    const eixoVencedor = Object.keys(pontuacao).reduce((a, b) =>
      pontuacao[a as keyof typeof pontuacao] >
      pontuacao[b as keyof typeof pontuacao]
        ? a
        : b,
    );

    return (
      <div className="section-container quiz-finalizado">
        <h2>Trilha Concluída! 🚀</h2>
        <p>
          Com base nas suas respostas, você tem grande afinidade com a área de:
        </p>
        <h3 className="destaque-neon">{eixoVencedor.toUpperCase()}</h3>
        <button
          className="btn-primario"
          onClick={() => window.location.reload()}
        >
          Refazer Teste
        </button>
      </div>
    );
  }

  return (
    <div className="section-container">
      <div className="quiz-card dark-card">
        <span className="quiz-contador">
          Passo {indiceAtual + 1} de {perguntasMock.length}
        </span>
        <h2>{perguntasMock[indiceAtual].texto}</h2>

        <div className="botoes-acao">
          <button onClick={() => responder("sim")} className="btn-sim">
            SIM
          </button>
          <button onClick={() => responder("nao")} className="btn-nao">
            NÃO
          </button>
        </div>
      </div>
    </div>
  );
};
