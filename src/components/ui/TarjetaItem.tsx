import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import type { Item } from '../../types';
import { FACTORES_FRECUENCIA } from '../../constants/calculo';
import { COLORS, FONTS, SPACE, formatQ } from './tokens';
import { ICONO_ACCION, ICON_SIZE } from './iconos';

interface Props {
  item: Item;
  onEditar: () => void;
}

const FRECUENCIA_LABEL: Record<Item['frecuencia'], string> = {
  diario: 'Diario',
  semanal: 'Semanal',
  quincenal: 'Quincenal',
  mensual: 'Mensual',
  anual: 'Anual',
};

export default function TarjetaItem({ item, onEditar }: Props) {
  const equivalente = item.monto * FACTORES_FRECUENCIA[item.frecuencia];
  const mostrarEquivalente = item.frecuencia !== 'mensual';
  const PencilIcon = ICONO_ACCION.editar;

  return (
    <View style={styles.row}>
      <View style={styles.info}>
        <Text style={styles.nombre} numberOfLines={1}>
          {item.nombre}
        </Text>
        <Text style={styles.detalle}>
          {formatQ(item.monto)} · {FRECUENCIA_LABEL[item.frecuencia]}
          {mostrarEquivalente ? ` ≈ ${formatQ(equivalente)}` : ''}
        </Text>
      </View>
      <Pressable
        onPress={onEditar}
        style={styles.boton}
        accessibilityRole="button"
        accessibilityLabel={`Editar ${item.nombre}`}
        accessibilityHint="Abre el formulario para modificar este gasto"
        hitSlop={12}
      >
        <PencilIcon size={ICON_SIZE.md} color={COLORS.text2} strokeWidth={2} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACE[4],
    paddingHorizontal: SPACE[4],
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  info: { flex: 1 },
  nombre: { ...FONTS.bodyStrong, color: COLORS.text, marginBottom: 2 },
  detalle: { ...FONTS.small, color: COLORS.text2 },
  boton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
