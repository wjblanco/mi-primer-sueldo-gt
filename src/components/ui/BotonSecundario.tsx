import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle } from 'react-native';
import { COLORS, FONTS, RADIUS } from './tokens';

interface Props {
  titulo: string;
  onPress: () => void;
  peligro?: boolean;
  style?: ViewStyle;
}

export default function BotonSecundario({ titulo, onPress, peligro, style }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.base, pressed && styles.presionado, style]}
      accessibilityRole="button"
      accessibilityLabel={titulo}
    >
      <Text style={[styles.texto, peligro && styles.peligro]}>{titulo}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 44,
    borderRadius: RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  presionado: { backgroundColor: COLORS.primarySoft },
  texto: { ...FONTS.bodyStrong, color: COLORS.primary },
  peligro: { color: COLORS.error },
});
