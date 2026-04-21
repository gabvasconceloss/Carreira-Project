import { useEffect, useState } from "react";
import { Quiz } from "./components/Quiz";
import { Catalogo } from "./components/Catalogo";
import { Mural } from "./components/Mural";
import "./App.css";

const listaDeFontes = [
  { nome: "var(--font-main)", estilo: "normal" },
  { nome: "'Courier New', Courier, monospace", estilo: "normal" },
  { nome: "'Consolas', monospace", estilo: "normal" },
  { nome: "'Georgia', serif", estilo: "italic" },
  { nome: "'Palatino Linotype', serif", estilo: "italic" },
];

const navItems = [
  { id: "home", label: "HOME" },
  { id: "autoconhecimento", label: "AUTOCONHECIMENTO" },
  { id: "carreiras", label: "CARREIRAS" },
  { id: "forum", label: "FÓRUM" },
];

export const App = () => {
  const [abaAtiva, setAbaAtiva] = useState("home");
  const [indiceDaFonte, setIndiceDaFonte] = useState(0);
  const [estaPiscando, setEstaPiscando] = useState(true);
  const [headerRolado, setHeaderRolado] = useState(false);

  // DETECTOR DE SCROLL PARA O HEADER
  useEffect(() => {
    const lidarComScroll = () => setHeaderRolado(window.scrollY > 50);
    window.addEventListener("scroll", lidarComScroll);
    return () => window.removeEventListener("scroll", lidarComScroll);
  }, []);

  // MOTOR DE ANIMAÇÃO DO TEXTO CYBER
  useEffect(() => {
    let cronometro: ReturnType<typeof setTimeout>;

    const rodarSequencia = (piscasRestantes: number) => {
      setIndiceDaFonte(Math.floor(Math.random() * listaDeFontes.length));

      if (piscasRestantes > 0) {
        setEstaPiscando(true);
        cronometro = setTimeout(() => rodarSequencia(piscasRestantes - 1), 100);
      } else {
        setEstaPiscando(false);
        cronometro = setTimeout(() => rodarSequencia(10), 6000);
      }
    };

    rodarSequencia(10);
    return () => clearTimeout(cronometro);
  }, []);

  // FUNÇÃO DE NAVEGAÇÃO SUAVE
  const navegarPara = (aba: string) => {
    setAbaAtiva(aba);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
            {/* SEÇÃO 1: HERO */}
            <section className="hero-section">
              <div className="hero-bg"></div>
              <div className="hero-content">
                <h1 className="hero-title">
                  INCLUSÃO <br />
                  <span className="destaque-neon">DIGITAL</span>
                </h1>
                <h2 className="hero-subtitle">
                  ORIENTAÇÃO PROFISSIONAL NO ENSINO MÉDIO
                </h2>
                <p
                  className={`hero-cyber-text ${estaPiscando ? "efeito-cyber" : ""}`}
                  style={{
                    fontFamily: listaDeFontes[indiceDaFonte].nome,
                    fontStyle: listaDeFontes[indiceDaFonte].estilo,
                  }}
                >
                  Sua jornada para um futuro consciente começa aqui.
                </p>
                <button
                  className="btn-primario hero-btn"
                  onClick={() => navegarPara("autoconhecimento")}
                >
                  COMEÇAR TRILHA
                </button>
              </div>
            </section>

            {/* SEÇÃO 2: PROBLEMÁTICA */}
            <section className="secao-padrao escuro">
              <h2 className="secao-titulo">
                A <span className="destaque-neon">Problemática</span>
              </h2>
              <div className="cards-grid">
                <div className="glass-card">
                  <div className="card-icone">📉</div>
                  <h3>O Abismo Tecnológico</h3>
                  <p>
                    Milhares de jovens concluem o ensino básico sem domínio de
                    competências digitais, limitando severamente suas
                    oportunidades em um mercado cada vez mais tecnológico.
                  </p>
                </div>
                <div className="glass-card">
                  <div className="card-icone">🤯</div>
                  <h3>Excesso de Informação</h3>
                  <p>
                    O jovem atual vive em um mar de possibilidades. Sem filtros
                    adequados, essa abundância gera ansiedade, paralisia e
                    dificuldade na tomada de decisão.
                  </p>
                </div>
                <div className="glass-card">
                  <div className="card-icone">🧭</div>
                  <h3>Falta de Direção</h3>
                  <p>
                    A ausência de orientação vocacional conectada com a
                    realidade econômica atual faz com que muitos talentos sejam
                    desperdiçados em carreiras incompatíveis.
                  </p>
                </div>
              </div>
            </section>

            {/* SEÇÃO 3: OBJETIVO */}
            <section className="secao-padrao alternativo">
              <h2 className="secao-titulo">
                Nosso <span className="destaque-neon">Objetivo</span>
              </h2>
              <div className="cards-grid">
                <div className="glass-card">
                  <div className="card-icone">🎯</div>
                  <h3>Descoberta Guiada</h3>
                  <p>
                    Oferecer ferramentas interativas de autoconhecimento para
                    mapear afinidades, ajudando o aluno a entender seus próprios
                    pontos fortes e interesses.
                  </p>
                </div>
                <div className="glass-card">
                  <div className="card-icone">🚀</div>
                  <h3>Conexão de Mercado</h3>
                  <p>
                    Traduzir as demandas do mercado de trabalho contemporâneo de
                    forma clara, traçando caminhos lógicos entre o que o jovem
                    gosta e o que o mundo precisa.
                  </p>
                </div>
                <div className="glass-card">
                  <div className="card-icone">🌐</div>
                  <h3>Acesso Democrático</h3>
                  <p>
                    Garantir que a orientação vocacional de alta qualidade não
                    seja um luxo, utilizando a tecnologia como principal aliada
                    para alcançar estudantes do ensino médio.
                  </p>
                </div>
              </div>
            </section>

            {/* SEÇÃO 4: QUEM SOMOS */}
            <section className="secao-padrao escuro pb-extra">
              <h2 className="secao-titulo">
                OS <span className="destaque-neon">DEVELOPERS</span>
              </h2>
              <div className="cards-grid centralizado">
                {[
                  {
                    nome: "Gabriel Vasconcelos",
                    papel: "Desenvolvedor & Idealizador",
                    bio: "Apaixonado por tecnologia e design de interfaces. Focado em criar experiências imersivas que ajudam jovens a descobrirem seu verdadeiro potencial.",
                    imagem: "/assets/foto-gabriel.png", // Corrigido o caminho (sem /public)
                  },
                  {
                    nome: "Raul da Silva",
                    papel: "Desenvolvedor & Idealizador",
                    bio: "Especialista em lógica e estruturação de dados. Trabalha nos bastidores para garantir que o sistema seja rápido, seguro e eficiente para todos os usuários.",
                    imagem: "/assets/foto-raul.jpeg", // Corrigido o caminho (sem /public)
                  },
                ].map((membro, index) => (
                  <div key={index} className="glass-card perfil">
                    <div
                      className="foto-perfil"
                      style={{ backgroundImage: `url('${membro.imagem}')` }}
                    >
                      {/* O placeholder agora só aparece se a imagem falhar ou não existir */}
                      {!membro.imagem && (
                        <span className="foto-placeholder">
                          {membro.nome.charAt(0)}
                        </span>
                      )}
                    </div>
                    <h3>{membro.nome}</h3>
                    <p className="perfil-papel">{membro.papel}</p>
                    <hr className="card-divisor" />
                    <p className="perfil-bio">{membro.bio}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        );
    }
  };

  return (
    <div className="app-container">
      {/* HEADER INTELIGENTE */}
      <header className={`header ${headerRolado ? "scrolled" : ""}`}>
        <div className="logo" onClick={() => navegarPara("home")}>
          {/* Corrigido o caminho do SVG e adicionada a classe logo-texto no span! */}
          <img
            src="/assets/logo.svg"
            alt="Logo Trilha Jovem"
            className="logo-img"
          />
          <span className="logo-texto">Trilha Jovem</span>
        </div>

        <nav className="nav-menu">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-link ${abaAtiva === item.id ? "active" : ""}`}
              onClick={() => navegarPara(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </header>

      <main className="miolo">
        {/* Renderiza sem margens na Home, e com margens nas outras telas */}
        <div className={abaAtiva === "home" ? "main-home" : "main-content"}>
          {renderContent()}
        </div>
      </main>

      {/* FOOTER PREMIUM */}
      <footer className="footer-premium">
        <div className="footer-glow"></div>
        <div className="footer-content">
          <div className="footer-coluna brand">
            <h3>
              <span className="destaque-neon">Trilha Jovem</span>
            </h3>
            <p className="footer-desc">
              Democratizando a orientação profissional com tecnologia e
              propósito.
            </p>
            <p className="footer-faculdade">Projeto de Extensão - FAMETRO</p>
          </div>

          <div className="footer-coluna links">
            <h4>Navegação</h4>
            <button onClick={() => navegarPara("home")}>Home</button>
            <button onClick={() => navegarPara("autoconhecimento")}>
              Autoconhecimento
            </button>
            <button onClick={() => navegarPara("carreiras")}>Carreiras</button>
            <button onClick={() => navegarPara("forum")}>Fórum</button>
          </div>

          <div className="footer-coluna team">
            <h4>Desenvolvido por</h4>
            <div className="team-list">
              <p>
                <span>{"</>"}</span> Gabriel Vasconcelos
              </p>
              <p>
                <span>{"</>"}</span> Raul da Silva
              </p>
              <p>
                <span>{"</>"}</span> Leon Matheus Piro
              </p>
              <p>
                <span>{"</>"}</span> Wellington Soares
              </p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} Trilha Jovem. Todos os direitos
            reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
