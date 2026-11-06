import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { COLORS, FONTS, SPACE } from './tokens';

interface Props {
  texto: string;
}

export default function AvisoLegal({ texto }: Props) {
  return <Text style={styles.texto}>{texto}</Text>;
}

const styles = StyleSheet.create({
  texto: {
    ...FONTS.caption,
    color: COLORS.textMuted,
    textAlign: 'center',
    marginTop: SPACE[4],
    paddingHorizontal: SPACE[4],
  },
});
