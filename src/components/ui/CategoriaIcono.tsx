import React from 'react';
import { View, StyleSheet } from 'react-native';
import type { Categoria } from '../../types';
import { ICONO_CATEGORIA, ICON_SIZE } from './iconos';
import { COLORS } from './tokens';

export const CATEGORIA_LABEL: Record<Categoria, string> = {
  vivienda: 'Vivienda',
  alimentacion: 'Alimentación',
  transporte: 'Transporte',
  servicios: 'Servicios',
  salud: 'Salud',
  ocio: 'Ocio',
  otros: 'Otros',
};

const CATEGORIA_COLOR: Record<Categoria, string> = {
  vivienda: '#8B6F47',
  alimentacion: '#C97B3F',
  transporte: '#4A7BA8',
  servicios: '#6E6BA8',
  salud: '#4E8C6A',
  ocio: '#B5739C',
  otros: '#7A7A7A',
};

interface Props {
  categoria: Categoria;
  size?: number;
}

export default function CategoriaIcono({ categoria, size = ICON_SIZE.lg }: Props) {
  const Icon = ICONO_CATEGORIA[categoria];
  return (
    <View style={styles.wrapper}>
      <Icon size={size} color={CATEGORIA_COLOR[categoria]} strokeWidth={2} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
