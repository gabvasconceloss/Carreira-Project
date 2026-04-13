import { useEffect, useState } from "react";
import { Quiz } from "./components/Quiz";
import { Catalogo } from "./components/Catalogo";
import { Mural } from "./components/Mural";
import "./App.css";

export const App = () => {
  const [abaAtiva, setAbaAtiva] = useState("home");

  // 1. A NOVA LISTA (Tech e Itálicos)
  const listaDeFontes = [
    { nome: "var(--font-main)", estilo: "normal" },
    { nome: "'Courier New', Courier, monospace", estilo: "normal" }, // Tech / Hacker
    { nome: "'Consolas', monospace", estilo: "normal" }, // Tech Moderna
    { nome: "'Georgia', serif", estilo: "italic" }, // Elegante Itálico
    { nome: "'Palatino Linotype', serif", estilo: "italic" }, // Clássica Itálico
  ];

  const [indiceDaFonte, setIndiceDaFonte] = useState(0);
  const [estaPiscando, setEstaPiscando] = useState(true);

  // 2. O MOTOR (Continua com a mesma lógica de tempo)
  useEffect(() => {
    let cronometro: ReturnType<typeof setTimeout>;

    const rodarSequencia = (piscasRestantes: number) => {
      const fonteSorteada = Math.floor(Math.random() * listaDeFontes.length);
      setIndiceDaFonte(fonteSorteada);

      if (piscasRestantes > 0) {
        setEstaPiscando(true); // LIGA O EFEITO CYBER
        cronometro = setTimeout(() => rodarSequencia(piscasRestantes - 1), 100);
      } else {
        setEstaPiscando(false); // DESLIGA O EFEITO E FOCA
        cronometro = setTimeout(() => rodarSequencia(10), 6000);
      }
    };

    rodarSequencia(10);
    return () => clearTimeout(cronometro);
  }, []);

  const renderContent = () => {
    switch (abaAtiva) {
      case "autoconhecimento":
        return <Quiz />;
      case "carreiras":
        return <Catalogo />;
      case "forum":
        return <Mural />;
      default:
        return (
          <div className="home-container">
            {/* SEÇÃO 1: HERO (Agora com a imagem de fundo exclusiva) */}
            <section className="hero-section">
              <div className="hero-bg"></div>
              <div className="hero-content">
                <h1
                  style={{ marginLeft: "-0.4rem", color: "#ffffff" }}
                  className="hero-title"
                >
                  INCLUSÃO <br />
                  <span className="destaque-neon">DIGITAL</span>
                </h1>
                <h2 className="hero-subtitle">
                  ORIENTAÇÃO PROFISSIONAL NO ENSINO MÉDIO
                </h2>
                <p
                  className={estaPiscando ? "efeito-cyber" : ""}
                  style={{
                    fontSize: "24px",
                    color: "var(--gray-text)",
                    marginLeft: "0.2rem",
                    fontFamily: listaDeFontes[indiceDaFonte].nome,
                    fontStyle: listaDeFontes[indiceDaFonte].estilo,
                    transition: "font-size 0.2s ease",
                    maxWidth: "800px",
                  }}
                >
                  Sua jornada para um futuro consciente começa aqui.
                </p>
                <button
                  className="btn-primario hero-btn"
                  onClick={() => setAbaAtiva("autoconhecimento")}
                >
                  COMEÇAR TRILHA
                </button>
              </div>
            </section>
            
            {/* SEÇÃO 2: PROBLEMÁTICA (Fundo escuro/limpo) */}
            <section className="info-section">
              <div className="container-leitura">
                <h2 className="titulo-secao-grande">
                  A <span className="destaque-neon">Problemática</span>
                </h2>
                <div className="texto-informativo">
                  <p>
                    Atualmente, o abismo entre a educação básica e as exigências
                    do mercado tecnológico é um dos maiores desafios do Brasil.
                    Milhares de jovens concluem o ensino médio sem o domínio de
                    competências digitais essenciais, o que limita suas
                    oportunidades de carreira e perpetua ciclos de desigualdade.
                  </p>
                  <p>
                    A ausência de uma orientação vocacional conectada com a
                    realidade da economia digital faz com que muitos talentos
                    sejam desperdiçados. O jovem sente-se perdido em um mar de
                    possibilidades, sem saber por onde começar ou quais
                    habilidades realmente importam.
                  </p>
                </div>
              </div>
            </section>

            {/* SEÇÃO 3: OBJETIVO (Fundo com destaque) */}
            <section className="info-section alt-bg">
              <div className="container-leitura">
                <h2 className="titulo-secao-grande">
                  Nosso <span className="destaque-neon">Objetivo</span>
                </h2>
                <div className="texto-informativo">
                  <p>
                    O projeto <strong>Trilha Jovem</strong> nasce para ser a
                    ponte entre o estudante e o seu futuro. Nossa missão é
                    democratizar o acesso à orientação profissional de
                    qualidade, utilizando a tecnologia como aliada no processo
                    de autodescoberta.
                  </p>
                  <p>
                    Queremos capacitar os alunos a identificarem suas
                    afinidades, entenderem as demandas do mercado de trabalho
                    contemporâneo e traçarem planos de carreira estratégicos.
                    Não é apenas sobre tecnologia, é sobre autonomia e
                    propósito.
                  </p>
                </div>
              </div>
            </section>

            {/* SEÇÃO 4: QUEM SOMOS */}
            <section className="team-section">
              <h2 className="section-title">
                QUEM <span className="destaque-neon">SOMOS</span>
              </h2>
              <div className="team-grid">
                <div className="team-card">
                  <h3>Gabriel Vasconcelos</h3>
                  <p>Desenvolvedor & Idealizador</p>
                </div>
                <div className="team-card">
                  <h3>Raul da Silva</h3>
                  <p>Desenvolvedor & Idealizador</p>
                </div>
              </div>
            </section>
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
            onClick={() => setAbaAtiva("carreiras")}
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

      <main className="miolo">
        <main className="main-content">{renderContent()}</main>
      </main>

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
