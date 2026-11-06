import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle, ActivityIndicator } from 'react-native';
import { COLORS, FONTS, RADIUS, SPACE, TOUCH_MIN } from './tokens';

interface Props {
  titulo: string;
  onPress: () => void;
  deshabilitado?: boolean;
  cargando?: boolean;
  style?: ViewStyle;
  accessibilityHint?: string;
}

export default function BotonPrincipal({
  titulo,
  onPress,
  deshabilitado,
  cargando,
  style,
  accessibilityHint,
}: Props) {
  const inactivo = deshabilitado || cargando;
  return (
    <Pressable
      onPress={inactivo ? undefined : onPress}
      style={({ pressed }) => [
        styles.base,
        inactivo && styles.inactivo,
        pressed && !inactivo && styles.presionado,
        style,
      ]}
      disabled={inactivo}
      accessibilityRole="button"
      accessibilityLabel={titulo}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled: !!inactivo, busy: !!cargando }}
    >
      {cargando ? (
        <ActivityIndicator color={COLORS.surface} />
      ) : (
        <Text style={[styles.texto, inactivo && styles.textoInactivo]}>{titulo}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: Math.max(52, TOUCH_MIN),
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACE[4],
  },
  presionado: { backgroundColor: COLORS.primaryDk },
  inactivo: { backgroundColor: COLORS.border },
  texto: { ...FONTS.bodyStrong, color: COLORS.surface },
  textoInactivo: { color: COLORS.textMuted },
});
