export interface PerguntaQuiz {
  id: number;
  texto: string;
  eixo: "tecnologia" | "humanas" | "saude" | "exatas";
}

export interface Profissao {
  id: string;
  titulo: string;
  descricaoBreve: string;
  formacao: string;
  tags: string[];
}

export interface DuvidaForum {
  id: string;
  autor: string;
  pergunta: string;
  respondida: boolean;
  respostaMentor?: string;
}
