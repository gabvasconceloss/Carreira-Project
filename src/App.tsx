import { useState } from "react";
import { Quiz } from "./components/Quiz";
import { Catalogo } from "./components/Catalogo";
import { Mural } from "./components/Mural";
import "./App.css";

export const App = () => {
  const [abaAtiva, setAbaAtiva] = useState("home");

  // A PONTE: Esse estado guarda o resultado do Quiz para mandar pro Catálogo
  const [eixoDoQuiz, setEixoDoQuiz] = useState<string>("Todas");

  const renderContent = () => {
    switch (abaAtiva) {
      case "autoconhecimento":
        // O Quiz agora recebe a função para salvar o eixo vencedor
        return <Quiz mudarAba={setAbaAtiva} setEixo={setEixoDoQuiz} />;
      case "carreiras":
        // O Catálogo recebe o eixo que o Quiz mandou!
        return <Catalogo eixoSugerido={eixoDoQuiz} />;
      case "forum":
        return <Mural />;
      default:
        return (
          <div className="hero-section">
            <h1 className="hero-title">
              RAUL <br />
              <span className="destaque-neon">ROSA</span>
            </h1>
            <h2 className="hero-subtitle">
              ORIENTAÇÃO PROFISSIONAL NO ENSINO MÉDIO
            </h2>
            <p>Sua jornada para um futuro consciente começa aqui.</p>
            <button
              className="btn-primario hero-btn"
              onClick={() => setAbaAtiva("autoconhecimento")}
            >
              COMEÇAR TRILHA
            </button>
          </div>
        );
    }
  };

  return (
    <div className="app-container">
      <header className="header dark-bg">
        <div
          className="logo"
          onClick={() => setAbaAtiva("home")}
          style={{ cursor: "pointer" }}
        >
          <span className="globe-icon">🌐</span>{" "}
          <span className="destaque-neon font-bold">Trilha Jovem</span>
        </div>

        <nav className="nav-menu">
          <button
            className={abaAtiva === "home" ? "active" : ""}
            onClick={() => setAbaAtiva("home")}
          >
            HOME
          </button>
          <button
            className={abaAtiva === "autoconhecimento" ? "active" : ""}
            onClick={() => setAbaAtiva("autoconhecimento")}
          >
            AUTOCONHECIMENTO
          </button>
          <button
            className={abaAtiva === "carreiras" ? "active" : ""}
            onClick={() => {
              setEixoDoQuiz("Todas"); // Reseta o filtro se clicar no menu lá em cima
              setAbaAtiva("carreiras");
            }}
          >
            CARREIRAS
          </button>
          <button
            className={abaAtiva === "forum" ? "active" : ""}
            onClick={() => setAbaAtiva("forum")}
          >
            FÓRUM
          </button>
        </nav>
      </header>

      <main className="main-content">{renderContent()}</main>

      <footer className="footer dark-bg">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>
              <span className="destaque-neon">Trilha Jovem</span>
            </h3>
            <p>Projeto de Extensão - FAMETRO</p>
          </div>
          <div className="footer-team">
            <p>Raul da Silva Rosa - 2529910</p>
            <p>Leon Matheus Farias Piro - 2536809</p>
            <p>Wellington John Soares Pereira - 2533370</p>
            <p>Gabriel Vasconcelos Franco Martins - 2536063</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
