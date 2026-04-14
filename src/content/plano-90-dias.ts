import type { Persona } from "@/types";

export interface AcaoPlano {
  readonly titulo: string;
  readonly descricao: string;
}

export interface FasePlano {
  readonly label: string;
  readonly acoes: readonly AcaoPlano[];
}

export interface PlanoPersona {
  readonly titulo_plano: string;
  readonly fases: readonly [FasePlano, FasePlano, FasePlano];
}

const PLACEHOLDER_ACAO: AcaoPlano = {
  titulo: "A PRODUZIR",
  descricao: "A PRODUZIR",
};

export const PLANO_90_DIAS: Record<Persona, PlanoPersona> = {
  apagando_incendio: {
    titulo_plano: "Plano para sair do modo sobrevivência",
    fases: [
      {
        label: "Dias 1–30: Estancar",
        acoes: [PLACEHOLDER_ACAO, PLACEHOLDER_ACAO, PLACEHOLDER_ACAO],
      },
      {
        label: "Dias 31–60: Organizar",
        acoes: [PLACEHOLDER_ACAO, PLACEHOLDER_ACAO, PLACEHOLDER_ACAO],
      },
      {
        label: "Dias 61–90: Sistematizar",
        acoes: [PLACEHOLDER_ACAO, PLACEHOLDER_ACAO, PLACEHOLDER_ACAO],
      },
    ],
  },
  improviso: {
    titulo_plano: "Plano para sair do improviso",
    fases: [
      {
        label: "Dias 1–30: Diagnosticar",
        acoes: [PLACEHOLDER_ACAO, PLACEHOLDER_ACAO, PLACEHOLDER_ACAO],
      },
      {
        label: "Dias 31–60: Estruturar",
        acoes: [PLACEHOLDER_ACAO, PLACEHOLDER_ACAO, PLACEHOLDER_ACAO],
      },
      {
        label: "Dias 61–90: Consolidar",
        acoes: [PLACEHOLDER_ACAO, PLACEHOLDER_ACAO, PLACEHOLDER_ACAO],
      },
    ],
  },
  base_sem_metodo: {
    titulo_plano: "Plano para instalar o método",
    fases: [
      {
        label: "Dias 1–30: Integrar",
        acoes: [PLACEHOLDER_ACAO, PLACEHOLDER_ACAO, PLACEHOLDER_ACAO],
      },
      {
        label: "Dias 31–60: Automatizar",
        acoes: [PLACEHOLDER_ACAO, PLACEHOLDER_ACAO, PLACEHOLDER_ACAO],
      },
      {
        label: "Dias 61–90: Escalar",
        acoes: [PLACEHOLDER_ACAO, PLACEHOLDER_ACAO, PLACEHOLDER_ACAO],
      },
    ],
  },
  madura: {
    titulo_plano: "Plano para alcançar excelência",
    fases: [
      {
        label: "Dias 1–30: Auditar",
        acoes: [PLACEHOLDER_ACAO, PLACEHOLDER_ACAO, PLACEHOLDER_ACAO],
      },
      {
        label: "Dias 31–60: Otimizar",
        acoes: [PLACEHOLDER_ACAO, PLACEHOLDER_ACAO, PLACEHOLDER_ACAO],
      },
      {
        label: "Dias 61–90: Evoluir",
        acoes: [PLACEHOLDER_ACAO, PLACEHOLDER_ACAO, PLACEHOLDER_ACAO],
      },
    ],
  },
};
