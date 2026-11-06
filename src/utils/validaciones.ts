import type { Frecuencia } from '../types';

export interface ErroresItem {
  nombre?: string;
  monto?: string;
}

export function parseMonto(texto: string): number | null {
  // Acepta "1,500.50", "1500.5", "1500"
  const limpio = texto.replace(/,/g, '').replace(/[^\d.]/g, '');
  if (!limpio) return null;
  const n = Number(limpio);
  return Number.isFinite(n) ? n : null;
}

export function validarItem(
  nombre: string,
  montoTexto: string,
  frecuencia: Frecuencia
): { errores: ErroresItem; monto: number | null } {
  const errores: ErroresItem = {};
  const nombreLimpio = nombre.trim();

  if (!nombreLimpio) {
    errores.nombre = 'Ponle un nombre al gasto.';
  } else if (nombreLimpio.length > 40) {
    errores.nombre = 'Máximo 40 caracteres.';
  }

  const monto = parseMonto(montoTexto);
  if (monto === null) {
    errores.monto = 'Ingresa un monto.';
  } else if (monto <= 0) {
    errores.monto = 'El monto debe ser mayor que cero.';
  } else if (monto > 1_000_000) {
    errores.monto = 'El monto es demasiado alto.';
  }

  return { errores, monto };
}

export function formatMontoInput(valor: number | null): string {
  if (valor === null || valor === 0) return '';
  return valor.toLocaleString('es-GT', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

// ── Validación del neto deseado (Módulo B) ──────────────────────────
export function validarNeto(texto: string): { error: string | null; neto: number | null } {
  const neto = parseMonto(texto);
  if (neto === null) {
    return { error: 'Ingresa cuánto necesitas recibir.', neto: null };
  }
  if (neto <= 0) {
    return { error: 'El monto debe ser mayor que cero.', neto: null };
  }
  if (neto > 100_000) {
    return { error: 'El monto es demasiado alto para esta estimación.', neto: null };
  }
  return { error: null, neto };
}
