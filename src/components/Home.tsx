// Aqui dizemos que a Home precisa receber a função de trocar de aba lá do App.tsx
interface HomeProps {
  setAbaAtiva: (aba: string) => void;
}

export const Home = ({ setAbaAtiva }: HomeProps) => {
  return (
    <div
      style={{
        display: "flex", // Ativa o Flexbox
        flexDirection: "column", // Empilha os itens (título, texto, cards)
        alignItems: "center", // Centraliza horizontalmente
        justifyContent: "center", // Centraliza verticalmente
        minHeight: "80vh", // Faz a div ter quase a altura toda da tela
        textAlign: "center",
        padding: "2rem",
        maxWidth: "1200px", // Aumentei um pouco para os cards ficarem melhores
        margin: "0 auto",
      }}
    >
      {/* Mensagem de Boas-vindas (Hero Section) */}
      <h1
        style={{ fontSize: "2.5rem", color: "#0056b3", marginBottom: "1rem" }}
      >
        Descubra o seu caminho com o Trilha Jovem
      </h1>
      <p style={{ fontSize: "1.2rem", color: "#555", marginBottom: "3rem" }}>
        O ensino médio está acabando e a dúvida bateu? Não se preocupe! Estamos
        aqui para te ajudar a entender suas habilidades e explorar o mercado de
        trabalho.
      </p>

      {/* Grade com os 3 atalhos principais */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
          width: "100%", // Garante que o grid use o espaço disponível
          marginTop: "2rem",
        }}
      >
        {/* Cartão 1: Quiz */}
        <div
          onClick={() => setAbaAtiva("quiz")}
          style={{
            backgroundColor: "#ffffff",
            padding: "30px",
            borderRadius: "15px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            cursor: "pointer",
            transition: "transform 0.2s",
            borderTop: "5px solid #4CAF50",
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <h2 style={{ color: "#4CAF50", marginBottom: "10px" }}>
            Autoconhecimento
          </h2>
          <p style={{ color: "#666", width: "100%", margin: "0 auto" }}>
            Responda um quiz rápido para descobrir com quais áreas você tem mais
            afinidade.
          </p>
        </div>

        {/* Cartão 2: Catálogo */}
        <div
          onClick={() => setAbaAtiva("catalogo")}
          style={{
            backgroundColor: "#ffffff",
            padding: "30px 5px",
            borderRadius: "15px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            cursor: "pointer",
            transition: "transform 0.2s",
            borderTop: "5px solid #FF9800",
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <h2 style={{ color: "#FF9800", marginBottom: "10px" }}>
            Explorar Carreiras
          </h2>
          <p style={{ color: "#666", width: "100%", margin: "0 auto" }}>
            Pesquise profissões, salários, exigências e entenda o que cada
            profissional faz.
          </p>
        </div>

        {/* Cartão 3: Mural */}
        <div
          onClick={() => setAbaAtiva("mural")}
          style={{
            backgroundColor: "#ffffff",
            padding: "30px 5px",
            borderRadius: "15px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            cursor: "pointer",
            transition: "transform 0.2s",
            borderTop: "5px solid #2196F3",
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <h2 style={{ color: "#2196F3", marginBottom: "5px" }}>
            Fórum de Dúvidas
          </h2>
          <p style={{ color: "#666", width: "100%", margin: "0 auto"}}>
            Tem alguma pergunta específica? Mande de forma anônima para os
            nossos mentores.
          </p>
        </div>
      </div>
    </div>
  );
};
