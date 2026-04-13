import { useState } from "react";
import type { Profissao } from "../types";

const profissoesMock: Profissao[] = [
  {
    id: "1",
    titulo: "Desenvolvimento de Software",
    descricaoBreve:
      "Criação de sistemas, sites e aplicativos. Resolve problemas através de código.",
    formacao: "Graduação ou Técnico",
    tags: ["Tecnologia", "Lógica"],
  },
  {
    id: "2",
    titulo: "Marketing Digital",
    descricaoBreve:
      "Estratégias de vendas e comunicação usando internet e redes sociais.",
    formacao: "Graduação ou Cursos Livres",
    tags: ["Humanas", "Criatividade"],
  },
  {
    id: "3",
    titulo: "Técnico em Enfermagem",
    descricaoBreve:
      "Atua no cuidado direto a pacientes em hospitais e clínicas.",
    formacao: "Ensino Técnico",
    tags: ["Saúde", "Cuidado"],
  },
  {
    id: "4",
    titulo: "Ciência de Dados",
    descricaoBreve:
      "Análise de grandes volumes de informações para prever tendências.",
    formacao: "Graduação (Exatas/TI)",
    tags: ["Tecnologia", "Matemática"],
  },
];

export const Catalogo = () => {
  const [busca, setBusca] = useState("");

  const filtradas = profissoesMock.filter(
    (p) =>
      p.titulo.toLowerCase().includes(busca.toLowerCase()) ||
      p.tags.some((tag) => tag.toLowerCase().includes(busca.toLowerCase())),
  );

  return (
    <div className="section-container">
      <h2 className="titulo-secao">Explore Trajetórias Profissionais</h2>

      <input
        type="text"
        className="input-busca"
        placeholder="🔍 Buscar profissão ou área (ex: Tecnologia)..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />

      <div className="grid-profissoes">
        {filtradas.map((prof) => (
          <div key={prof.id} className="card-profissao dark-card">
            <h3>{prof.titulo}</h3>
            <p>{prof.descricaoBreve}</p>
            <div className="info-extra">
              <span className="badge-formacao">{prof.formacao}</span>
            </div>
          </div>
        ))}
        {filtradas.length === 0 && <p>Nenhuma profissão encontrada.</p>}
      </div>
    </div>
  );
};
