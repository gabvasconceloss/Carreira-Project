import React, { useState, useEffect } from "react";

// Definindo o formato dos dados de uma Carreira
interface Carreira {
  id: string;
  titulo: string;
  tipo: "Superior" | "Técnico";
  eixo: "Tecnologia" | "Humanas" | "Saúde" | "Exatas";
  descricaoCurta: string;
  diaADia: string;
  duracao: string;
  ondeEstudar: string;
  mercado: string;
}

// O nosso "Banco de Dados" Expandido!
const carreirasDados: Carreira[] = [
  // ================= TECNOLOGIA =================
  {
    id: "t1",
    titulo: "Engenharia de Software",
    tipo: "Superior",
    eixo: "Tecnologia",
    descricaoCurta:
      "Criação de sistemas, aplicativos e soluções lógicas para problemas complexos.",
    diaADia:
      "Passa a maior parte do tempo programando, desenhando a arquitetura de sistemas e fazendo reuniões com a equipe para alinhar os projetos.",
    duracao: "4 a 5 anos",
    ondeEstudar: "UFAM, UEA (EST), FAMETRO",
    mercado:
      "Excelente! Vagas sobrando no Polo Digital de Manaus, nos institutos de pesquisa (Sidia, Eldorado, Ocean) e Startups.",
  },
  {
    id: "t2",
    titulo: "Técnico em Informática",
    tipo: "Técnico",
    eixo: "Tecnologia",
    descricaoCurta:
      "Manutenção de computadores, redes e introdução à programação.",
    diaADia:
      "Montagem e conserto de máquinas, configuração de roteadores e redes nas empresas, e criação de sites básicos.",
    duracao: "1.5 a 2 anos",
    ondeEstudar: "IFAM, CETAM, SENAI",
    mercado:
      "Muito bom para o primeiro emprego. Toda empresa do Distrito Industrial precisa de suporte técnico.",
  },
  {
    id: "t3",
    titulo: "Ciência de Dados",
    tipo: "Superior",
    eixo: "Tecnologia",
    descricaoCurta:
      "Uso de inteligência artificial e matemática para analisar grandes volumes de informações.",
    diaADia:
      "Trabalha com códigos em Python, analisa gráficos e treina Inteligências Artificiais para prever vendas ou comportamentos.",
    duracao: "4 anos",
    ondeEstudar: "UEA (EST), UFAM, FUCAPI",
    mercado:
      "A profissão do futuro! Startups e grandes fábricas do PIM pagam altos salários para quem sabe prever tendências.",
  },
  {
    id: "t4",
    titulo: "Jogos Digitais",
    tipo: "Superior",
    eixo: "Tecnologia",
    descricaoCurta:
      "Desenvolvimento de games, desde a programação até a modelagem 3D e roteiro.",
    diaADia:
      "Muitas horas testando mecânicas de jogo, escrevendo códigos para movimentação de personagens e criando artes no computador.",
    duracao: "2.5 a 3 anos (Tecnólogo)",
    ondeEstudar: "UEA (EST), FUCAPI",
    mercado:
      "Crescente em Manaus. Existem estúdios independentes e institutos como o Sidia que contratam desenvolvedores Unity/Unreal.",
  },

  // ================= SAÚDE =================
  {
    id: "s1",
    titulo: "Enfermagem",
    tipo: "Superior",
    eixo: "Saúde",
    descricaoCurta:
      "Cuidado direto aos pacientes, gestão de alas hospitalares e saúde preventiva.",
    diaADia:
      "Acompanhamento de pacientes, administração de medicamentos, auxílio em cirurgias e chefia da equipe de técnicos.",
    duracao: "4 a 5 anos",
    ondeEstudar: "UFAM, UEA, FAMETRO, Nilton Lins",
    mercado:
      "Alta demanda na rede pública (28 de Agosto, João Lúcio) e em clínicas particulares e hospitais da Unimed/Hapvida.",
  },
  {
    id: "s2",
    titulo: "Técnico em Enfermagem",
    tipo: "Técnico",
    eixo: "Saúde",
    descricaoCurta:
      "Apoio prático e contínuo ao paciente em hospitais e clínicas.",
    diaADia:
      "Dar banho em pacientes, medir pressão, aplicar injeções e coletar sangue sob supervisão do enfermeiro.",
    duracao: "1.5 a 2 anos",
    ondeEstudar: "CETAM, Escolas Particulares",
    mercado:
      "A área que mais contrata rápido na saúde. Plantões em hospitais e home care (cuidar de pacientes em casa).",
  },
  {
    id: "s3",
    titulo: "Medicina",
    tipo: "Superior",
    eixo: "Saúde",
    descricaoCurta:
      "Diagnóstico, tratamento e prevenção de doenças no corpo humano.",
    diaADia:
      "Atendimento em consultórios, exames físicos, cirurgias, plantões noturnos intensos e muito estudo contínuo.",
    duracao: "6 anos + Especialização",
    ondeEstudar: "UFAM, UEA, Nilton Lins, FAMETRO",
    mercado:
      "Garantia de emprego, especialmente se o profissional tiver disposição para atuar em UBS ou no interior do Amazonas.",
  },
  {
    id: "s4",
    titulo: "Odontologia",
    tipo: "Superior",
    eixo: "Saúde",
    descricaoCurta:
      "Cuidado com a saúde bucal, estética dental e cirurgias maxilofaciais.",
    diaADia:
      "Atendimento clínico, uso de equipamentos de precisão para limpar, restaurar e extrair dentes. Alta interação com o paciente.",
    duracao: "4 a 5 anos",
    ondeEstudar: "UFAM, UEA, FAMETRO",
    mercado:
      "A maioria abre o próprio consultório, mas há muitas vagas em clínicas populares e na rede pública.",
  },

  // ================= EXATAS =================
  {
    id: "e1",
    titulo: "Engenharia de Produção",
    tipo: "Superior",
    eixo: "Exatas",
    descricaoCurta:
      "Otimização de processos, controle de qualidade e gestão de fábricas.",
    diaADia:
      "Fica na linha de produção analisando onde dá para economizar tempo e dinheiro, lidando com planilhas e liderando operários.",
    duracao: "5 anos",
    ondeEstudar: "UFAM, UEA, FAMETRO",
    mercado:
      "O coração do Distrito Industrial. Yamaha, Honda, Samsung e Moto Honda contratam muitos engenheiros de produção.",
  },
  {
    id: "e2",
    titulo: "Engenharia Elétrica",
    tipo: "Superior",
    eixo: "Exatas",
    descricaoCurta:
      "Projetos de energia, eletrônica, telecomunicações e automação.",
    diaADia:
      "Desenhando plantas elétricas, calculando voltagens para novas máquinas e gerenciando distribuição de energia.",
    duracao: "5 anos",
    ondeEstudar: "UFAM, UEA, FUCAPI",
    mercado:
      "Forte na concessionária local (Amazonas Energia), e nas fábricas de eletroeletrônicos do Distrito (LG, Samsung).",
  },
  {
    id: "e3",
    titulo: "Mecatrônica",
    tipo: "Técnico",
    eixo: "Exatas",
    descricaoCurta:
      "União de mecânica, eletrônica e robótica para manutenção industrial.",
    diaADia:
      "Consertar robôs de solda, programar esteiras automáticas e fazer a manutenção preventiva das máquinas nas fábricas.",
    duracao: "2 anos",
    ondeEstudar: "SENAI, IFAM",
    mercado:
      "Altíssima empregabilidade nas indústrias de duas rodas e eletrônicos do PIM.",
  },
  {
    id: "e4",
    titulo: "Téc. em Eletrotécnica",
    tipo: "Técnico",
    eixo: "Exatas",
    descricaoCurta:
      "Instalação e manutenção de painéis e redes elétricas de alta potência.",
    diaADia:
      "Uso de EPIs pesados, subida em postes ou manuseio de quadros de força industriais para evitar apagões nas fábricas.",
    duracao: "2 anos",
    ondeEstudar: "IFAM, SENAI, CETAM",
    mercado:
      "Sempre falta profissional bom. Contratação rápida por empresas terceirizadas de manutenção.",
  },

  // ================= HUMANAS =================
  {
    id: "h1",
    titulo: "Direito",
    tipo: "Superior",
    eixo: "Humanas",
    descricaoCurta:
      "Aplicação das leis, defesa de clientes e atuação no setor público.",
    diaADia:
      "Muita leitura de processos, escrita de peças jurídicas (petições), idas ao fórum e participação em audiências.",
    duracao: "5 anos",
    ondeEstudar: "UFAM, UEA, CIESA, FAMETRO",
    mercado:
      "Área concorrida, mas com excelente retorno se passar em concursos (TJ-AM, MPE) ou advogar para empresas do PIM.",
  },
  {
    id: "h2",
    titulo: "Psicologia",
    tipo: "Superior",
    eixo: "Humanas",
    descricaoCurta: "Estudo do comportamento humano e saúde mental.",
    diaADia:
      "Atendimento clínico a pacientes (ouvir e orientar), ou atuação em empresas fazendo recrutamento e seleção (RH).",
    duracao: "5 anos",
    ondeEstudar: "UFAM, FAMETRO, Nilton Lins",
    mercado:
      "Crescimento explosivo pós-pandemia na área clínica. No Distrito Industrial, atuam fortemente no setor de Recursos Humanos.",
  },
  {
    id: "h3",
    titulo: "Administração",
    tipo: "Superior",
    eixo: "Humanas",
    descricaoCurta:
      "Gestão de empresas, recursos humanos, finanças e marketing.",
    diaADia:
      "Organização de planilhas financeiras, contratação de pessoas, reuniões de estratégia de vendas e controle de estoque.",
    duracao: "4 anos",
    ondeEstudar: "UFAM, UEA, FAMETRO, CIESA",
    mercado:
      "O curso mais versátil. Toda escola, hospital, fábrica ou loja precisa de um administrador.",
  },
  {
    id: "h4",
    titulo: "Técnico em Logística",
    tipo: "Técnico",
    eixo: "Humanas",
    descricaoCurta:
      "Controle de estoque, transporte e distribuição de mercadorias.",
    diaADia:
      "Cuidar do recebimento de caminhões, organizar peças no galpão, emitir notas fiscais e calcular rotas de entrega.",
    duracao: "1.5 anos",
    ondeEstudar: "SENAI, CETAM",
    mercado:
      "Manaus é uma cidade que vive de trazer peças de fora (Porto/Aeroporto) e enviar produtos prontos. A logística nunca para.",
  },
  {
    id: "h5",
    titulo: "Téc. em Recursos Humanos",
    tipo: "Técnico",
    eixo: "Humanas",
    descricaoCurta: "Gestão de folha de pagamento, contratações e demissões.",
    diaADia:
      "Lidar com burocracia de DP (Departamento Pessoal), calcular férias, ponto, hora extra e organizar entrevistas.",
    duracao: "1.5 anos",
    ondeEstudar: "SENAC, CETAM",
    mercado:
      "Toda média ou grande empresa de Manaus tem um setor de RH precisando de analistas.",
  },
];

// --- MUDANÇA 1: Interface para receber a Props da Ponte Mágica ---
interface CatalogoProps {
  eixoSugerido?: string;
}

// --- MUDANÇA 2: O Componente agora recebe a prop e a define como valor inicial do filtro ---
export const Catalogo = ({ eixoSugerido = "Todas" }: CatalogoProps) => {
  // O estado inicial do filtro agora é o que vier do App (seja 'Tecnologia' ou 'Todas')
  const [filtroEixo, setFiltroEixo] = useState<string>(eixoSugerido);
  const [termoBusca, setTermoBusca] = useState<string>("");
  const [carreiraSelecionada, setCarreiraSelecionada] =
    useState<Carreira | null>(null);

  // --- MUDANÇA 3: Efeito para atualizar o filtro se o aluno refizer o quiz e mudar de área ---
  useEffect(() => {
    setFiltroEixo(eixoSugerido);
  }, [eixoSugerido]);

  // Filtragem e Busca
  const carreirasFiltradas = carreirasDados
    .filter((c) => (filtroEixo === "Todas" ? true : c.eixo === filtroEixo))
    .filter(
      (c) =>
        c.titulo.toLowerCase().includes(termoBusca.toLowerCase()) ||
        c.descricaoCurta.toLowerCase().includes(termoBusca.toLowerCase()),
    );

  const getCorEixo = (eixo: string) => {
    switch (eixo) {
      case "Tecnologia":
        return "#00e676"; // Verde
      case "Saúde":
        return "#ff4d4d"; // Vermelho
      case "Exatas":
        return "#4d79ff"; // Azul
      case "Humanas":
        return "#ffb84d"; // Laranja
      default:
        return "#ccc";
    }
  };

  return (
    <div
      className="section-container"
      style={{ maxWidth: "1100px", margin: "0 auto" }}
    >
      <h2
        className="titulo-secao"
        style={{ textAlign: "center", marginBottom: "1rem", marginTop: "1rem" }}
      >
        Explore Trajetórias Profissionais
      </h2>

      {/* BARRA DE PESQUISA */}
      <input
        type="text"
        placeholder="Buscar profissão (ex: Software, Enfermagem, Direito)..."
        value={termoBusca}
        onChange={(e) => setTermoBusca(e.target.value)}
        style={{
          width: "100%",
          padding: "1rem",
          borderRadius: "8px",
          border: "2px solid #000",
          marginBottom: "1.5rem",
          fontSize: "1rem",
        }}
      />

      {/* FILTROS DE EIXO (CORRIGIDO PARA TEXTO SEMPRE PRETO) */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "0.8rem",
          flexWrap: "wrap",
          marginBottom: "2.5rem",
          borderBottom: "1px solid #f0f0f0",
          paddingBottom: "1rem",
        }}
      >
        {["Todas", "Tecnologia", "Saúde", "Exatas", "Humanas"].map((eixo) => (
          <button
            key={eixo}
            onClick={() => setFiltroEixo(eixo)}
            className={`btn-filtro-alto-contraste ${filtroEixo === eixo ? "ativo" : ""}`}
            style={{
              backgroundColor:
                filtroEixo === eixo
                  ? eixo === "Todas"
                    ? "var(--neon-color)"
                    : getCorEixo(eixo)
                  : "transparent",
              color: "#000000", // TEXTO SEMPRE PRETO
              borderColor: filtroEixo === eixo ? "#000000" : "#888888",
              fontWeight: "bold",
            }}
          >
            {eixo}
          </button>
        ))}
      </div>

      {/* GRID DE CARREIRAS */}
      <div className="grid-profissoes">
        {carreirasFiltradas.map((carreira) => (
          <div
            key={carreira.id}
            className="dark-card"
            style={{
              cursor: "pointer",
              borderTop: `4px solid ${getCorEixo(carreira.eixo)}`,
            }}
            onClick={() => setCarreiraSelecionada(carreira)}
          >
            <h3
              style={{
                fontSize: "1.4rem",
                marginBottom: "0.5rem",
                color: "#fff",
              }}
            >
              {carreira.titulo}
            </h3>
            <span
              style={{
                display: "inline-block",
                padding: "0.2rem 0.6rem",
                borderRadius: "4px",
                backgroundColor:
                  carreira.tipo === "Superior" ? "var(--neon-color)" : "#ccc",
                color: "#000",
                fontWeight: "bold",
                fontSize: "0.75rem",
                textTransform: "uppercase",
                marginBottom: "1rem",
              }}
            >
              {carreira.tipo === "Superior"
                ? "🎓 Graduação"
                : "🛠️ Curso Técnico"}
            </span>
            <p style={{ color: "#aaa", fontSize: "1rem", lineHeight: "1.5" }}>
              {carreira.descricaoCurta}
            </p>
          </div>
        ))}
      </div>

      {carreirasFiltradas.length === 0 && (
        <p style={{ textAlign: "center", color: "#888", marginTop: "2rem" }}>
          Nenhuma profissão encontrada com essa busca.
        </p>
      )}

      {/* JANELA FLUTUANTE (MODAL) */}
      {carreiraSelecionada && (
        <div
          className="modal-overlay"
          onClick={() => setCarreiraSelecionada(null)}
        >
          <div
            className="modal-content dark-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setCarreiraSelecionada(null)}
            >
              ✖
            </button>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                marginBottom: "1.5rem",
              }}
            >
              <span
                style={{
                  width: "15px",
                  height: "15px",
                  borderRadius: "50%",
                  backgroundColor: getCorEixo(carreiraSelecionada.eixo),
                }}
              ></span>
              <h2 style={{ color: "#fff", margin: 0 }}>
                {carreiraSelecionada.titulo}
              </h2>
            </div>

            <div className="modal-info-box">
              <h4 style={{ color: "var(--neon-color)" }}>
                O que faz no dia a dia?
              </h4>
              <p>{carreiraSelecionada.diaADia}</p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
                marginBottom: "1.5rem",
              }}
            >
              <div className="modal-info-box">
                <h4 style={{ color: "var(--neon-color)" }}>Tempo de Curso</h4>
                <p>⏱️ {carreiraSelecionada.duracao}</p>
              </div>
              <div className="modal-info-box">
                <h4 style={{ color: "var(--neon-color)" }}>Onde estudar?</h4>
                <p>📍 {carreiraSelecionada.ondeEstudar}</p>
              </div>
            </div>

            <div className="modal-info-box" style={{ marginBottom: "2rem" }}>
              <h4 style={{ color: "var(--neon-color)" }}>Mercado em Manaus</h4>
              <p>💼 {carreiraSelecionada.mercado}</p>
            </div>

            <button
              className="btn-primario"
              style={{ width: "100%", border: "2px solid #000" }}
              onClick={() => setCarreiraSelecionada(null)}
            >
              Fechar Detalhes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
