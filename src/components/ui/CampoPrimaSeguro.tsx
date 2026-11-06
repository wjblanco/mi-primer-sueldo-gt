import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import CampoMonto from './CampoMonto';
import { COLORS, FONTS, RADIUS, SPACE } from './tokens';

interface Props {
  valor: string;
  onCambiar: (v: string) => void;
  error?: string | null;
  fueraDeRango?: boolean;
}

export default function CampoPrimaSeguro({ valor, onCambiar, error, fueraDeRango }: Props) {
  return (
    <View>
      <CampoMonto
        etiqueta="Prima mensual"
        placeholder="Q 0.00"
        value={valor}
        onChangeText={onCambiar}
        error={error}
        ayuda="Referencia: Q250–Q900 al mes"
      />
      {fueraDeRango && !error && (
        <View style={styles.aviso}>
          <Text style={styles.avisoTexto}>
            ⚠️ Está fuera del rango orientativo, pero puedes continuar
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  aviso: {
    backgroundColor: COLORS.warningSoft,
    borderRadius: RADIUS.md,
    padding: SPACE[3],
    marginBottom: SPACE[3],
    marginTop: -SPACE[2],
  },
  avisoTexto: { ...FONTS.small, color: COLORS.warning },
});
