// ── Colores ──────────────────────────────────────────────────────────
export const COLORS = {
  bg: '#FAFAF8',
  surface: '#FFFFFF',
  border: '#E4E4E0',
  text: '#1F2A24',
  text2: '#5A6660',
  textMuted: '#8A948E',
  primary: '#1F6F4A',
  primaryDk: '#175638',
  primarySoft: '#E6F2EB',
  success: '#2E7D4F',
  warning: '#B7791F',
  warningSoft: '#FDF6E3',
  error: '#B23A3A',
  errorSoft: '#FBEAEA',
  info: '#2F5D8A',
  infoSoft: '#EAF1F7',
} as const;

// ── Tipografía ───────────────────────────────────────────────────────
export const FONTS = {
  display: { fontSize: 40, lineHeight: 48, fontWeight: '700' as const },
  h1: { fontSize: 28, lineHeight: 36, fontWeight: '700' as const },
  h2: { fontSize: 22, lineHeight: 30, fontWeight: '600' as const },
  h3: { fontSize: 18, lineHeight: 26, fontWeight: '600' as const },
  body: { fontSize: 16, lineHeight: 24, fontWeight: '400' as const },
  bodyStrong: { fontSize: 16, lineHeight: 24, fontWeight: '600' as const },
  small: { fontSize: 14, lineHeight: 20, fontWeight: '400' as const },
  caption: { fontSize: 12, lineHeight: 16, fontWeight: '400' as const },
} as const;

// ── Espaciado ────────────────────────────────────────────────────────
export const SPACE = { 1: 4, 2: 8, 3: 12, 4: 16, 5: 24, 6: 32, 7: 48 } as const;

// ── Radios ───────────────────────────────────────────────────────────
export const RADIUS = { sm: 8, md: 12, lg: 16, full: 999 } as const;

// ── Sombras ──────────────────────────────────────────────────────────
export const SHADOWS = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  modal: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 8,
  },
} as const;

// ── Formato de moneda ────────────────────────────────────────────────
export function formatQ(amount: number): string {
  return `Q ${amount.toLocaleString('es-GT', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

// ── Accesibilidad ────────────────────────────────────────────────────
// Tamaño mínimo de área táctil recomendado por iOS y Android.
export const TOUCH_MIN = 44;
