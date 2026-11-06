import {
  PROVISION_AGUINALDO_FACTOR,
  PROVISION_BONO14_FACTOR,
  PROVISION_VACACIONES_FACTOR,
  TASA_IGSS_VOLUNTARIO,
  TASA_PEQUENO_CONTRIBUYENTE,
  TOPE_PEQUENO_CONTRIBUYENTE,
} from '../constants/calculo';
import type { ProteccionSalud } from '../types';

export interface ParametrosFacturado {
  sueldoBase: number;
  proteccionSalud: ProteccionSalud;
  primaSeguroPrivado: number | null;
  tambienAportaIgssConSeguro: boolean;
}

export interface ResultadoFacturado {
  sueldoBase: number;
  provisionAguinaldo: number;
  provisionBono14: number;
  provisionVacaciones: number;
  costoSalud: number;
  detalleSalud: {
    seguroPrivado: number;
    igssVoluntario: number;
  };
  subtotal: number;
  impuestoUnico: number;
  montoFacturar: number;
  // Verificación de umbral
  proyeccionAnual: number;
  superaTope: boolean;
  topeAnual: number;
}

/**
 * Calcula el monto a facturar partiendo del sueldo base, incluyendo el
 * impuesto único del 5% del régimen de Pequeño Contribuyente.
 *
 * El impuesto único se calcula sobre el subtotal (sueldo base + provisiones
 * + salud) y se suma al total a facturar.
 *
 * Si la proyección anual (montoFacturar × 12) supera el tope del régimen,
 * se marca superaTope = true, pero el cálculo del 5% se mantiene porque
 * es el régimen vigente hasta cruzar el umbral. La UI muestra un aviso.
 */
export function calcularFacturado(params: ParametrosFacturado): ResultadoFacturado {
  const { sueldoBase, proteccionSalud, primaSeguroPrivado, tambienAportaIgssConSeguro } = params;

  const provisionAguinaldo = sueldoBase * PROVISION_AGUINALDO_FACTOR;
  const provisionBono14 = sueldoBase * PROVISION_BONO14_FACTOR;
  const provisionVacaciones = sueldoBase * PROVISION_VACACIONES_FACTOR;

  let seguroPrivado = 0;
  let igssVoluntario = 0;

  if (proteccionSalud === 'seguro_privado') {
    seguroPrivado = primaSeguroPrivado ?? 0;
    if (tambienAportaIgssConSeguro) {
      igssVoluntario = sueldoBase * TASA_IGSS_VOLUNTARIO;
    }
  } else if (proteccionSalud === 'igss_voluntario') {
    igssVoluntario = sueldoBase * TASA_IGSS_VOLUNTARIO;
  }

  const costoSalud = seguroPrivado + igssVoluntario;
  const subtotal =
    sueldoBase + provisionAguinaldo + provisionBono14 + provisionVacaciones + costoSalud;

  const impuestoUnico = subtotal * TASA_PEQUENO_CONTRIBUYENTE;
  const montoFacturar = subtotal + impuestoUnico;

  const proyeccionAnual = montoFacturar * 12;
  const superaTope = proyeccionAnual > TOPE_PEQUENO_CONTRIBUYENTE;

  return {
    sueldoBase,
    provisionAguinaldo,
    provisionBono14,
    provisionVacaciones,
    costoSalud,
    detalleSalud: { seguroPrivado, igssVoluntario },
    subtotal,
    impuestoUnico,
    montoFacturar,
    proyeccionAnual,
    superaTope,
    topeAnual: TOPE_PEQUENO_CONTRIBUYENTE,
  };
}
