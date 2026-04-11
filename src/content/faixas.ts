import type { Persona } from "@/types";

export interface Faixa {
  readonly id: Persona;
  readonly nome: string;
  readonly score_min: number;
  readonly score_max: number;
  readonly cor: "vermelho" | "laranja" | "amarelo" | "verde";
  readonly mensagem_ancora: string;
  readonly produto_recomendado: string;
}

export const FAIXAS: readonly Faixa[] = [
  {
    id: "apagando_incendio",
    nome: "Empresa apagando incêndio",
    score_min: 0,
    score_max: 25,
    cor: "vermelho",
    mensagem_ancora: "A PRODUZIR",
    produto_recomendado: "Compass + Controladoria Gerencial",
  },
  {
    id: "improviso",
    nome: "Empresa funcionando no improviso",
    score_min: 26,
    score_max: 50,
    cor: "laranja",
    mensagem_ancora:
      "Sua empresa cresce apesar da gestão financeira, não por causa dela. Em algum momento, esse improviso vai cobrar a conta.",
    produto_recomendado: "Compass + Mentoria de Precificação",
  },
  {
    id: "base_sem_metodo",
    nome: "Empresa com base, sem método",
    score_min: 51,
    score_max: 75,
    cor: "amarelo",
    mensagem_ancora: "A PRODUZIR",
    produto_recomendado: "Compass + Conselho Consultivo Financeiro",
  },
  {
    id: "madura",
    nome: "Empresa madura, pronta pra escalar com método",
    score_min: 76,
    score_max: 100,
    cor: "verde",
    mensagem_ancora:
      "Você está acima da média do mercado. O próximo nível não é mais ferramenta. É olhar externo qualificado que questione suas premissas e te tire do isolamento da decisão.",
    produto_recomendado: "Conselho Consultivo Financeiro",
  },
] as const;
