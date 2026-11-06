import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { CalculadoraStackParamList } from '../../navigation/types';
import { TEXTOS } from '../../constants/textos';
import {
  BotonPrincipal,
  CampoMonto,
  NotaInformativa,
  COLORS,
  FONTS,
  RADIUS,
  SPACE,
} from '../../components/ui';
import { parseMonto, validarNeto, formatMontoInput } from '../../utils/validaciones';
import type { CalculadoraStackScreenProps } from '../../navigation/types';

type Nav = NativeStackNavigationProp<CalculadoraStackParamList, 'CalculadoraEntrada'>;

export default function CalculadoraEntradaScreen({
  route,
}: CalculadoraStackScreenProps<'CalculadoraEntrada'>) {
  const navigation = useNavigation<Nav>();
  const netoPrecargado = route.params?.netoPrecargado;
  const origen = route.params?.origen;

  const [netoTexto, setNetoTexto] = useState(
    netoPrecargado ? formatMontoInput(netoPrecargado) : ''
  );
  const [error, setError] = useState<string | null>(null);
  const [mostrarChip, setMostrarChip] = useState(origen === 'presupuesto');

  const onCalcular = () => {
    const { error: nuevoError, neto } = validarNeto(netoTexto);
    if (nuevoError || neto === null) {
      setError(nuevoError);
      return;
    }
    setError(null);
    navigation.navigate('ResultadoPlanilla', {
      netoObjetivo: neto,
      anioFiscal: 0, // B-2 ignora este valor y usa configuracion.anioFiscal
    });
  };

  const onCambiarTexto = (texto: string) => {
    setNetoTexto(texto);
    if (error) setError(null);
    if (mostrarChip) setMostrarChip(false);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.titulo}>{TEXTOS.moduloB.tituloEntrada}</Text>

      <CampoMonto
        etiqueta={TEXTOS.moduloB.etiquetaNeto}
        placeholder={TEXTOS.moduloB.placeholderMonto}
        value={netoTexto}
        onChangeText={onCambiarTexto}
        error={error}
      />

      {mostrarChip && (
        <Pressable
          onPress={() => setMostrarChip(false)}
          style={styles.chip}
          accessibilityRole="button"
          accessibilityLabel="Quitar origen desde presupuesto"
        >
          <Text style={styles.chipTexto}>Desde mi presupuesto ✕</Text>
        </Pressable>
      )}

      <BotonPrincipal titulo={TEXTOS.moduloB.calcular} onPress={onCalcular} />

      <View style={styles.notaWrapper}>
        <NotaInformativa texto={TEXTOS.moduloB.avisoNeto} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  content: { padding: SPACE[4] },
  titulo: { ...FONTS.h1, color: COLORS.text, marginBottom: SPACE[5] },
  chip: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.primarySoft,
    borderRadius: RADIUS.full,
    paddingVertical: SPACE[1],
    paddingHorizontal: SPACE[3],
    marginBottom: SPACE[4],
    marginTop: -SPACE[2],
  },
  chipTexto: { ...FONTS.small, color: COLORS.primary },
  notaWrapper: { marginTop: SPACE[5] },
});
