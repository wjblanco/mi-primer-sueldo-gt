import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { COLORS, FONTS, SPACE } from './tokens';

interface Props {
  valor: boolean;
  onCambiar: (v: boolean) => void;
}

export default function SwitchIgssAdicional({ valor, onCambiar }: Props) {
  return (
    <View style={styles.fila}>
      <Text style={styles.label}>También quiero aportar al IGSS voluntario</Text>
      <Switch
        value={valor}
        onValueChange={onCambiar}
        trackColor={{ false: COLORS.border, true: COLORS.primary }}
        thumbColor={COLORS.surface}
        accessibilityLabel="También quiero aportar al IGSS voluntario"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fila: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACE[2],
    marginBottom: SPACE[3],
  },
  label: { ...FONTS.body, color: COLORS.text, flex: 1, marginRight: SPACE[3] },
});
