import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { COLORS, FONTS, RADIUS, SPACE, TOUCH_MIN } from './tokens';

interface Props extends Omit<TextInputProps, 'style'> {
  etiqueta: string;
  error?: string | null;
  ayuda?: string;
}

export default function CampoTexto({ etiqueta, error, ayuda, ...inputProps }: Props) {
  const [focused, setFocused] = useState(false);
  return (
    <View style={styles.wrapper}>
      <Text style={styles.etiqueta}>{etiqueta}</Text>
      <TextInput
        {...inputProps}
        onFocus={(e) => {
          setFocused(true);
          inputProps.onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          inputProps.onBlur?.(e);
        }}
        style={[styles.input, focused && styles.focused, error ? styles.invalido : null]}
        placeholderTextColor={COLORS.textMuted}
        accessibilityLabel={etiqueta}
        accessibilityHint={error ?? ayuda}
      />
      {error ? (
        <Text
          style={styles.error}
          accessibilityLiveRegion="polite"
          accessibilityLabel={`Error: ${error}`}
        >
          ⚠️ {error}
        </Text>
      ) : ayuda ? (
        <Text style={styles.ayuda}>{ayuda}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: SPACE[4] },
  etiqueta: { ...FONTS.small, color: COLORS.text2, marginBottom: SPACE[2] },
  input: {
    minHeight: Math.max(52, TOUCH_MIN),
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACE[4],
    ...FONTS.body,
    color: COLORS.text,
    backgroundColor: COLORS.surface,
  },
  focused: { borderWidth: 2, borderColor: COLORS.primary },
  invalido: { borderWidth: 2, borderColor: COLORS.error, backgroundColor: COLORS.errorSoft },
  error: { ...FONTS.small, color: COLORS.error, marginTop: SPACE[1] },
  ayuda: { ...FONTS.caption, color: COLORS.textMuted, marginTop: SPACE[1] },
});
