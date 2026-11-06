import {
  BONIFICACION_INCENTIVO,
  DEDUCCION_PERSONAL_2026,
  ISR_CUOTA_FIJA_TRAMO_ALTO,
  ISR_TASA_ALTA,
  ISR_TASA_BAJA,
  ISR_UMBRAL_TRAMO_ALTO,
  SALARIO_MINIMO_REFERENCIA,
  TASA_IGSS_PLANILLA,
} from '../constants/calculo';
import type { ResultadoISR } from '../types';

export interface ParametrosISR {
  anioFiscal: number;
  /**
   * Salario mínimo BASE (sin bonificación incentivo).
   * La fórmula de deducción suma Q250 internamente.
   * Si es null y el año es 2027+, se usa SALARIO_MINIMO_REFERENCIA.
   */
  salarioMinimoVigente: number | null;
}

export type EstadoAnioFiscal = 'anio2026' | 'anio2027' | 'anio2027SinDato';

/**
 * Determina el estado del año fiscal para la UI.
 * - anio2026: deducción fija.
 * - anio2027: deducción indexada con dato del usuario.
 * - anio2027SinDato: deducción indexada con valor de referencia.
 */
export function estadoAnioFiscal(params: ParametrosISR): EstadoAnioFiscal {
  if (params.anioFiscal <= 2026) return 'anio2026';
  return params.salarioMinimoVigente !== null ? 'anio2027' : 'anio2027SinDato';
}

/**
 * Calcula la deducción personal anual según el año fiscal.
 * - 2026: monto fijo (Q48,000 + Q3,024 transitorio = Q51,024).
 * - 2027+: (salario mínimo base + Q250) × 12.
 */
export function calcularDeduccionPersonal({
  anioFiscal,
  salarioMinimoVigente,
}: ParametrosISR): number {
  if (anioFiscal <= 2026) return DEDUCCION_PERSONAL_2026;

  const salarioBase = salarioMinimoVigente ?? SALARIO_MINIMO_REFERENCIA;
  return (salarioBase + BONIFICACION_INCENTIVO) * 12;
}

/**
 * Calcula el ISR mensual a partir del salario ordinario.
 */
export function calcularISR(salarioOrdinario: number, params: ParametrosISR): ResultadoISR {
  const ingresoBrutoAnual = (salarioOrdinario + BONIFICACION_INCENTIVO) * 12;
  const igssAnual = salarioOrdinario * TASA_IGSS_PLANILLA * 12;
  const deduccionPersonal = calcularDeduccionPersonal(params);
  const rentaImponible = ingresoBrutoAnual - igssAnual - deduccionPersonal;

  let isrAnual = 0;
  if (rentaImponible > 0) {
    if (rentaImponible <= ISR_UMBRAL_TRAMO_ALTO) {
      isrAnual = rentaImponible * ISR_TASA_BAJA;
    } else {
      isrAnual =
        ISR_CUOTA_FIJA_TRAMO_ALTO + (rentaImponible - ISR_UMBRAL_TRAMO_ALTO) * ISR_TASA_ALTA;
    }
  }

  return {
    ingresoBrutoAnual,
    igssAnual,
    deduccionPersonal,
    rentaImponible,
    isrAnual,
    isrMensual: isrAnual / 12,
  };
}

/**
 * Atajo: devuelve solo el ISR mensual.
 */
export function isrMensual(salarioOrdinario: number, params: ParametrosISR): number {
  return calcularISR(salarioOrdinario, params).isrMensual;
}
