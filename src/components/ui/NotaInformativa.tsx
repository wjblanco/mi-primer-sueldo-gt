import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS, RADIUS, SPACE } from './tokens';
import { ICONO_ACCION, ICON_SIZE } from './iconos';

interface Props {
  texto: string;
  tipo?: 'info' | 'warning';
}

export default function NotaInformativa({ texto, tipo = 'info' }: Props) {
  const esInfo = tipo === 'info';
  const Icon = esInfo ? ICONO_ACCION.info : ICONO_ACCION.aviso;
  const color = esInfo ? COLORS.info : COLORS.warning;
  const bg = esInfo ? COLORS.infoSoft : COLORS.warningSoft;

  return (
    <View style={[styles.base, { backgroundColor: bg }]}>
      <Icon size={ICON_SIZE.md} color={color} strokeWidth={2} style={styles.icono} />
      <Text style={[styles.texto, { color }]}>{texto}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: RADIUS.md,
    padding: SPACE[3],
    marginBottom: SPACE[3],
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  icono: { marginRight: SPACE[2], marginTop: 2 },
  texto: { ...FONTS.small, flex: 1 },
});
