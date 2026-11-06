import React, { ReactNode } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { COLORS, FONTS, RADIUS, SPACE } from './tokens';

export interface ChipOption<T extends string> {
  value: T;
  label: string;
  icono?: ReactNode;
}

interface Props<T extends string> {
  opciones: ChipOption<T>[];
  seleccionado: T;
  onSeleccionar: (v: T) => void;
}

export default function Chips<T extends string>({ opciones, seleccionado, onSeleccionar }: Props<T>) {
  return (
    <View style={styles.wrapper}>
      {opciones.map((op) => {
        const activo = op.value === seleccionado;
        const color = activo ? COLORS.primary : COLORS.text2;
        return (
          <Pressable
            key={op.value}
            onPress={() => onSeleccionar(op.value)}
            style={[styles.chip, activo && styles.activo]}
            accessibilityRole="button"
            accessibilityLabel={op.label}
            accessibilityState={{ selected: activo }}
            accessibilityHint={activo ? 'Ya seleccionado' : 'Toca para seleccionar'}
          >
            {op.icono && <View style={styles.iconoWrapper}>{op.icono}</View>}
            <Text style={[styles.texto, activo && styles.textoActivo]}>{op.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACE[2], marginBottom: SPACE[4] },
  chip: {
    minHeight: 40,
    paddingHorizontal: SPACE[3],
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.bg,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  activo: { backgroundColor: COLORS.primarySoft, borderWidth: 2, borderColor: COLORS.primary },
  iconoWrapper: { marginRight: SPACE[1] },
  texto: { ...FONTS.small, color: COLORS.text2 },
  textoActivo: { color: COLORS.primary, fontWeight: '600' },
});
