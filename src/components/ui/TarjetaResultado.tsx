import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS, RADIUS, SPACE, formatQ } from './tokens';

interface Props {
  etiqueta: string;
  monto: number;
  nota?: string;
}

function montoEnPalabras(monto: number): string {
  return `${monto.toFixed(2)} quetzales`;
}

export default function TarjetaResultado({ etiqueta, monto, nota }: Props) {
  return (
    <View
      style={styles.card}
      accessible
      accessibilityLabel={`${etiqueta}: ${montoEnPalabras(monto)}${nota ? `. ${nota}` : ''}`}
      accessibilityLiveRegion="polite"
    >
      <Text style={styles.etiqueta}>{etiqueta}</Text>
      <Text style={styles.monto}>{formatQ(monto)}</Text>
      {nota ? <Text style={styles.nota}>{nota}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.primarySoft,
    borderRadius: RADIUS.lg,
    padding: SPACE[5],
    marginBottom: SPACE[5],
  },
  etiqueta: { ...FONTS.body, color: COLORS.text2, marginBottom: SPACE[1] },
  monto: { ...FONTS.display, color: COLORS.text },
  nota: { ...FONTS.small, color: COLORS.text2, marginTop: SPACE[2] },
});
