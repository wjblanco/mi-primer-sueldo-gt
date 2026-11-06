import { calcularNeto, calcularSueldoOrdinario } from '../calculoInverso';

const PARAMS_2026 = { anioFiscal: 2026, salarioMinimoVigente: null };

describe('MotorCalculoInverso', () => {
  test('CP-01: neto Q4,200 → SO ≈ Q4,152, ISR = 0', () => {
    const r = calcularSueldoOrdinario(4200, PARAMS_2026);
    expect(r.convergio).toBe(true);
    expect(r.sueldoOrdinario).toBeGreaterThan(4100);
    expect(r.sueldoOrdinario).toBeLessThan(4200);
    expect(r.isr).toBeCloseTo(0, 1);
    expect(Math.abs(r.netoCalculado - 4200)).toBeLessThanOrEqual(1);
  });

  test('CP-02: neto Q6,000 → ISR > 0 en 2026', () => {
    const r = calcularSueldoOrdinario(6000, PARAMS_2026);
    expect(r.convergio).toBe(true);
    expect(r.isr).toBeGreaterThan(0);
    expect(Math.abs(r.netoCalculado - 6000)).toBeLessThanOrEqual(1);
  });

  test('CP-03: neto Q9,000 → ISR > 0', () => {
    const r = calcularSueldoOrdinario(9000, PARAMS_2026);
    expect(r.convergio).toBe(true);
    expect(r.isr).toBeGreaterThan(0);
    expect(Math.abs(r.netoCalculado - 9000)).toBeLessThanOrEqual(1);
  });

  test('CP-34: neto Q0.01 no rompe', () => {
    const r = calcularSueldoOrdinario(0.01, PARAMS_2026);
    expect(r.sueldoOrdinario).toBeGreaterThanOrEqual(0);
    expect(Number.isFinite(r.sueldoOrdinario)).toBe(true);
  });

  test('CP-35: neto Q80,000 converge dentro del rango', () => {
    const r = calcularSueldoOrdinario(80000, PARAMS_2026);
    expect(r.sueldoOrdinario).toBeGreaterThan(0);
    expect(r.sueldoOrdinario).toBeLessThan(100000);
    expect(r.convergio).toBe(true);
    expect(Math.abs(r.netoCalculado - 80000)).toBeLessThanOrEqual(1);
  });

  test('CP-35b: neto inalcanzable Q99,999 falla de forma controlada', () => {
    // El rango de búsqueda llega a Q100,000 de SO, cuyo neto máximo es ~Q89,538.
    // Un neto de Q99,999 está fuera de alcance. El motor debe devolver
    // convergio = false y el límite superior, sin colgarse ni dar NaN.
    const r = calcularSueldoOrdinario(99999, PARAMS_2026);
    expect(r.convergio).toBe(false);
    expect(r.sueldoOrdinario).toBe(100000);
    expect(Number.isFinite(r.netoCalculado)).toBe(true);
    expect(r.netoCalculado).toBeLessThan(99999);
  });

  test('La función calcularNeto es la inversa de calcularSueldoOrdinario', () => {
    const r = calcularSueldoOrdinario(7500, PARAMS_2026);
    const neto = calcularNeto(r.sueldoOrdinario, PARAMS_2026);
    expect(Math.abs(neto - 7500)).toBeLessThanOrEqual(1);
  });
});
