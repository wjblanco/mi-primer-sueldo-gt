// ── Enums como uniones de strings ─────────────────────────────────────
export type Frecuencia = 'diario' | 'semanal' | 'quincenal' | 'mensual' | 'anual';

export type Categoria =
  | 'vivienda'
  | 'alimentacion'
  | 'transporte'
  | 'servicios'
  | 'salud'
  | 'ocio'
  | 'otros';

export type ProteccionSalud = 'ninguna' | 'igss_voluntario' | 'seguro_privado'
  | 'impuesto_unico';

export type PerfilLaboral = 'desconocido' | 'si' | 'no';

// ── Entidades del presupuesto ─────────────────────────────────────────
export interface Item {
  id: string;
  nombre: string;
  monto: number;
  frecuencia: Frecuencia;
  categoria: Categoria;
}

export interface Presupuesto {
  id: string;
  creadoEn: string; // ISO8601
  actualizadoEn: string; // ISO8601
  items: Item[];
}

// ── Configuración del usuario ─────────────────────────────────────────
export interface ConfiguracionUsuario {
  proteccionSalud: ProteccionSalud;
  primaSeguroPrivado: number | null;
  tambienAportaIgssConSeguro: boolean;
  calificaParaIgssVoluntario: boolean;
  haTrabajadoEnPlanilla: PerfilLaboral;
  salarioMinimoVigente: number | null;
  anioFiscal: number;
}

// ── Resultados de los motores ────────────────────────────────────────
export interface ResultadoISR {
  ingresoBrutoAnual: number;
  igssAnual: number;
  deduccionPersonal: number;
  rentaImponible: number;
  isrAnual: number;
  isrMensual: number;
}

export interface ResultadoCalculoInverso {
  sueldoOrdinario: number;
  bonificacionIncentivo: number;
  igss: number;
  isr: number;
  netoCalculado: number;
  iteraciones: number;
  convergio: boolean;
}

// ── Contratos de navegación (para Fase 1) ────────────────────────────
export type Concepto =
  | 'sueldo_base'
  | 'bonificacion_incentivo'
  | 'igss'
  | 'isr'
  | 'provision_aguinaldo'
  | 'provision_bono14'
  | 'provision_vacaciones'
  | 'igss_voluntario'
  | 'seguro_privado'
  | 'impuesto_unico';
