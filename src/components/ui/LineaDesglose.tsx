import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS, SPACE, formatQ } from './tokens';

export type TipoLinea = 'ingreso' | 'descuento' | 'provision' | 'total';

interface Props {
  etiqueta: string;
  monto: number;
  tipo: TipoLinea;
  onPress?: () => void;
}

function signoDe(tipo: TipoLinea): string {
  if (tipo === 'ingreso') return '+';
  if (tipo === 'descuento') return '−';
  if (tipo === 'provision') return '+';
  return '=';
}

export default function LineaDesglose({ etiqueta, monto, tipo, onPress }: Props) {
  const esTotal = tipo === 'total';
  const contenido = (
    <View style={[styles.fila, esTotal && styles.filaTotal]}>
      <Text style={[styles.signo, esTotal && styles.textoTotal]}>{signoDe(tipo)}</Text>
      <Text style={[styles.etiqueta, esTotal && styles.textoTotal]} numberOfLines={2}>
        {etiqueta}
      </Text>
      <Text style={[styles.monto, esTotal && styles.textoTotal]}>{formatQ(monto)}</Text>
    </View>
  );

  if (!onPress) return contenido;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && styles.presionado}
      accessibilityRole="button"
      accessibilityLabel={`${etiqueta}: ${formatQ(monto)}`}
      accessibilityHint="Toca para ver la explicación"
    >
      {contenido}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  fila: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 44,
    paddingVertical: SPACE[2],
    paddingHorizontal: SPACE[4],
  },
  filaTotal: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: SPACE[3],
    marginTop: SPACE[2],
  },
  presionado: { backgroundColor: COLORS.bg },
  signo: { ...FONTS.body, color: COLORS.text2, width: 20, textAlign: 'center' },
  etiqueta: { ...FONTS.body, color: COLORS.text, flex: 1, marginLeft: SPACE[2] },
  monto: { ...FONTS.bodyStrong, color: COLORS.text },
  textoTotal: { ...FONTS.bodyStrong, color: COLORS.text },
});
