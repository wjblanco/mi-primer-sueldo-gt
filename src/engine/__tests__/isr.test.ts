import { calcularISR } from '../isr';
import { DEDUCCION_PERSONAL_2026 } from '../../constants/calculo';

const PARAMS_2026 = { anioFiscal: 2026, salarioMinimoVigente: null };

describe('MotorISR — 2026', () => {
  test('CP-05: sueldo mínimo no paga ISR', () => {
    const r = calcularISR(4002.28, PARAMS_2026);
    expect(r.isrMensual).toBeCloseTo(0, 2);
    expect(r.deduccionPersonal).toBe(DEDUCCION_PERSONAL_2026);
    expect(r.rentaImponible).toBeLessThan(0);
  });

  test('CP-06: umbral de ISR cero en Q4,205.11', () => {
    const r = calcularISR(4205.11, PARAMS_2026);
    expect(Math.abs(r.isrMensual)).toBeLessThan(0.1);
  });

  test('CP-06b: apenas arriba del umbral aparece ISR', () => {
    const r = calcularISR(4206, PARAMS_2026);
    expect(r.isrMensual).toBeGreaterThan(0);
  });

  test('CP-07: sueldo Q9,000 en tramo 5%', () => {
    const r = calcularISR(9000, PARAMS_2026);
    expect(r.isrMensual).toBeCloseTo(228.17, 0);
  });

  test('CP-08: sueldo Q30,000 sigue en tramo 5%', () => {
    const r = calcularISR(30000, PARAMS_2026);
    expect(r.rentaImponible).toBeLessThan(300000);
    expect(r.isrMensual).toBeCloseTo((294588 * 0.05) / 12, 0);
  });
});

describe('MotorISR — 2027+', () => {
  // Nota: salarioMinimoVigente es el salario BASE (sin bonificación).
  // La fórmula suma Q250 internamente.
  test('CP-09: deducción indexada con salario mínimo base configurado', () => {
    const r = calcularISR(4500, { anioFiscal: 2027, salarioMinimoVigente: 4002.28 });
    expect(r.deduccionPersonal).toBeCloseTo(51027.36, 2);
    expect(r.isrMensual).toBeGreaterThan(0);
  });

  test('CP-10: sin salario mínimo configurado usa valor de referencia', () => {
    const r = calcularISR(4500, { anioFiscal: 2027, salarioMinimoVigente: null });
    expect(r.deduccionPersonal).toBeCloseTo(51027.36, 2);
  });

  test('CP-09b: si el usuario ingresa el total con bonificación, la deducción sube', () => {
    // Caso defensivo: usuario ingresa Q4,252.28 como "salario mínimo".
    // La fórmula suma Q250 y da 54,027.36. No es el uso esperado, pero es
    // matemáticamente consistente con la fórmula.
    const r = calcularISR(4500, { anioFiscal: 2027, salarioMinimoVigente: 4252.28 });
    expect(r.deduccionPersonal).toBeCloseTo(54027.36, 2);
  });
});
