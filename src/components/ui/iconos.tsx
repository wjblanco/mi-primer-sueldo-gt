import React from 'react';
import type { Categoria, Concepto } from '../../types';
import {
  Home,
  Utensils,
  Bus,
  Lightbulb,
  HeartPulse,
  Gamepad2,
  Package,
  Pencil,
  Save,
  Calculator,
  ClipboardList,
  Receipt,
  AlertTriangle,
  Info,
  ChevronLeft,
  X,
  CheckCircle2,
  type LucideIcon,
} from 'lucide-react-native';

// ── Tamaños estándar ────────────────────────────────────────────────
export const ICON_SIZE = {
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
} as const;

// ── Íconos por categoría del presupuesto ────────────────────────────
export const ICONO_CATEGORIA: Record<Categoria, LucideIcon> = {
  vivienda: Home,
  alimentacion: Utensils,
  transporte: Bus,
  servicios: Lightbulb,
  salud: HeartPulse,
  ocio: Gamepad2,
  otros: Package,
};

// ── Íconos por concepto (para B-4) ──────────────────────────────────
export const ICONO_CONCEPTO: Record<Concepto, LucideIcon> = {
  sueldo_base: ClipboardList,
  bonificacion_incentivo: CheckCircle2,
  igss: HeartPulse,
  isr: Receipt,
  provision_aguinaldo: Save,
  provision_bono14: Save,
  provision_vacaciones: Save,
  igss_voluntario: HeartPulse,
  seguro_privado: HeartPulse,
  impuesto_unico: Receipt,
};

// ── Íconos de acción ────────────────────────────────────────────────
export const ICONO_ACCION = {
  editar: Pencil,
  guardar: Save,
  calcular: Calculator,
  presupuesto: ClipboardList,
  facturado: Receipt,
  aviso: AlertTriangle,
  info: Info,
  volver: ChevronLeft,
  cerrar: X,
  exito: CheckCircle2,
} as const;

// ── Componente helper (opcional, para simplificar) ──────────────────
interface IconoProps {
  icono: LucideIcon;
  size?: number;
  color: string;
}

export function Icono({ icono: Icon, size = ICON_SIZE.lg, color }: IconoProps) {
  return <Icon size={size} color={color} strokeWidth={2} />;
}
