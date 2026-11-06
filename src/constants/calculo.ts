export const FACTORES_FRECUENCIA = {
  diario: 30,
  semanal: 4.33,
  quincenal: 2,
  mensual: 1,
  anual: 1 / 12,
} as const;

export const BONIFICACION_INCENTIVO = 250;

export const TASA_IGSS_PLANILLA = 0.0483;
export const TASA_IGSS_VOLUNTARIO = 0.055;

export const DEDUCCION_PERSONAL_2026 = 51024;

export const SALARIO_MINIMO_REFERENCIA = 4002.28;
export const BONIFICACION_INCENTIVO_REFERENCIA = 250;

export const ISR_UMBRAL_TRAMO_ALTO = 300000;
export const ISR_TASA_BAJA = 0.05;
export const ISR_TASA_ALTA = 0.07;
export const ISR_CUOTA_FIJA_TRAMO_ALTO = 15000;

export const RANGO_BUSQUEDA_SO_MIN = 0;
export const RANGO_BUSQUEDA_SO_MAX = 100000;
export const MAX_ITERACIONES_BISECCION = 60;
export const TOLERANCIA_BISECCION = 1;

export const PROVISION_AGUINALDO_FACTOR = 1 / 12;
export const PROVISION_BONO14_FACTOR = 1 / 12;
export const PROVISION_VACACIONES_FACTOR = 15 / 360;

// ── Régimen de Pequeño Contribuyente (IVA) ──────────────────────────
// Tarifa única del 5% sobre ingresos brutos. Sustituye IVA e ISR.
// Fuente: Art. 47 Ley del IVA, Decreto 27-92.
export const TASA_PEQUENO_CONTRIBUYENTE = 0.05;

// Tope anual del régimen de Pequeño Contribuyente.
// La SAT publica el monto vigente cada año; NO se deriva automáticamente
// del salario mínimo, porque el límite no es una fórmula simple y se
// actualiza por resolución. Este valor es una aproximación conservadora
// para 2026 (referencia: 125 salarios mínimos no agrícolas mensuales).
// Revisar cada enero contra la publicación oficial de la SAT.
export const TOPE_PEQUENO_CONTRIBUYENTE = 500285.00;
