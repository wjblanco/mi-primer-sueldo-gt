import {
  BONIFICACION_INCENTIVO,
  MAX_ITERACIONES_BISECCION,
  RANGO_BUSQUEDA_SO_MAX,
  RANGO_BUSQUEDA_SO_MIN,
  TASA_IGSS_PLANILLA,
  TOLERANCIA_BISECCION,
} from '../constants/calculo';
import type { ResultadoCalculoInverso } from '../types';
import { isrMensual, type ParametrosISR } from './isr';

/**
 * Calcula el neto mensual a partir del salario ordinario.
 */
export function calcularNeto(salarioOrdinario: number, params: ParametrosISR): number {
  const igss = salarioOrdinario * TASA_IGSS_PLANILLA;
  const isr = isrMensual(salarioOrdinario, params);
  return salarioOrdinario + BONIFICACION_INCENTIVO - igss - isr;
}

/**
 * Resuelve el salario ordinario que produce un neto objetivo usando bisección.
 */
export function calcularSueldoOrdinario(
  netoObjetivo: number,
  params: ParametrosISR
): ResultadoCalculoInverso {
  let bajo = RANGO_BUSQUEDA_SO_MIN;
  let alto = RANGO_BUSQUEDA_SO_MAX;
  let medio = 0;
  let iteraciones = 0;
  let convergio = false;

  for (let i = 0; i < MAX_ITERACIONES_BISECCION; i++) {
    iteraciones = i + 1;
    medio = (bajo + alto) / 2;
    const netoMedio = calcularNeto(medio, params);

    if (Math.abs(netoMedio - netoObjetivo) <= TOLERANCIA_BISECCION) {
      convergio = true;
      break;
    }

    if (netoMedio < netoObjetivo) bajo = medio;
    else alto = medio;
  }

  const igss = medio * TASA_IGSS_PLANILLA;
  const isr = isrMensual(medio, params);
  const netoCalculado = medio + BONIFICACION_INCENTIVO - igss - isr;

  return {
    sueldoOrdinario: medio,
    bonificacionIncentivo: BONIFICACION_INCENTIVO,
    igss,
    isr,
    netoCalculado,
    iteraciones,
    convergio,
  };
}
