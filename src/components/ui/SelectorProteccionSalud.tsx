import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import type { ProteccionSalud } from '../../types';
import { COLORS, FONTS, RADIUS, SPACE } from './tokens';

interface Props {
  valor: ProteccionSalud;
  calificaParaIgssVoluntario: boolean;
  onCambiar: (v: ProteccionSalud) => void;
  onSolicitarPerfil: () => void;
}

const OPCIONES: { value: ProteccionSalud; label: string }[] = [
  { value: 'ninguna', label: 'Ninguna' },
  { value: 'seguro_privado', label: 'Seguro médico privado' },
  { value: 'igss_voluntario', label: 'IGSS voluntario (5.5%)' },
];

export default function SelectorProteccionSalud({
  valor,
  calificaParaIgssVoluntario,
  onCambiar,
  onSolicitarPerfil,
}: Props) {
  return (
    <View style={styles.wrapper}>
      {OPCIONES.map((op) => {
        const seleccionado = valor === op.value;
        const deshabilitado = op.value === 'igss_voluntario' && !calificaParaIgssVoluntario;
        return (
          <Pressable
            key={op.value}
            onPress={() => !deshabilitado && onCambiar(op.value)}
            style={styles.fila}
            accessibilityRole="radio"
            accessibilityState={{ selected: seleccionado, disabled: deshabilitado }}
            accessibilityLabel={op.label}
          >
            <View style={[styles.radio, seleccionado && styles.radioActivo, deshabilitado && styles.radioDeshabilitado]}>
              {seleccionado && <View style={styles.radioInterior} />}
            </View>
            <View style={styles.textos}>
              <Text style={[styles.label, deshabilitado && styles.labelDeshabilitado]}>
                {op.label}
              </Text>
              {deshabilitado && (
                <Text style={styles.nota}>Requiere 12 meses de trabajo formal previo</Text>
              )}
            </View>
          </Pressable>
        );
      })}
      {!calificaParaIgssVoluntario && (
        <Pressable onPress={onSolicitarPerfil} style={styles.enlace}>
          <Text style={styles.enlaceTexto}>¿Ya trabajaste en planilla antes?</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: SPACE[4] },
  fila: { flexDirection: 'row', alignItems: 'center', minHeight: 44, paddingVertical: SPACE[2] },
  radio: {
    width: 22,
    height: 22,
    borderRadius: RADIUS.full,
    borderWidth: 2,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACE[3],
  },
  radioActivo: { borderColor: COLORS.primary },
  radioDeshabilitado: { borderColor: COLORS.textMuted },
  radioInterior: { width: 10, height: 10, borderRadius: RADIUS.full, backgroundColor: COLORS.primary },
  textos: { flex: 1 },
  label: { ...FONTS.body, color: COLORS.text },
  labelDeshabilitado: { color: COLORS.textMuted },
  nota: { ...FONTS.caption, color: COLORS.textMuted, marginTop: 2 },
  enlace: { marginTop: SPACE[2], paddingVertical: SPACE[1] },
  enlaceTexto: { ...FONTS.small, color: COLORS.primary, textDecorationLine: 'underline' },
});
