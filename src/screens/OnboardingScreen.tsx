import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import {
  BotonPrincipal,
  BotonSecundario,
  COLORS,
  FONTS,
  RADIUS,
  SPACE,
} from '../components/ui';
import { ICONO_ACCION, ICON_SIZE } from '../components/ui/iconos';
import { useReducirMovimiento } from '../hooks/useReducirMovimiento';

interface Props {
  onTerminar: () => void;
}

const PASOS = [
  {
    titulo: 'Anota tus gastos',
    texto:
      'Escribe lo que gastas cada mes: renta, comida, transporte. La app te dice cuánto necesitas en total.',
    icono: ICONO_ACCION.presupuesto,
  },
  {
    titulo: 'Calcula tu salario',
    texto:
      'Dinos cuánto necesitas recibir y la app calcula cuánto deberías pedir en un trabajo en planilla, con todos los descuentos.',
    icono: ICONO_ACCION.calcular,
  },
  {
    titulo: 'Compara si facturas',
    texto:
      'Si te ofrecen trabajar facturando, la app te dice cuánto deberías cobrar para tener un beneficio similar.',
    icono: ICONO_ACCION.facturado,
  },
];

export default function OnboardingScreen({ onTerminar }: Props) {
  const reducir = useReducirMovimiento();
  const [paso, setPaso] = useState(0);
  const actual = PASOS[paso];
  const Icon = actual.icono;
  const esUltimo = paso === PASOS.length - 1;

  return (
    <View style={styles.container}>
      <View style={styles.iconoWrapper}>
        <Icon size={80} color={COLORS.primary} strokeWidth={1.5} />
      </View>

      <Text style={styles.titulo}>{actual.titulo}</Text>
      <Text style={styles.texto}>{actual.texto}</Text>

      <View style={styles.puntos}>
        {PASOS.map((_, i) => (
          <View key={i} style={[styles.punto, i === paso && styles.puntoActivo]} />
        ))}
      </View>

      <View style={styles.botones}>
        {esUltimo ? (
          <BotonPrincipal titulo="Empezar" onPress={onTerminar} />
        ) : (
          <BotonPrincipal titulo="Siguiente" onPress={() => setPaso(paso + 1)} />
        )}
        {paso > 0 && (
          <BotonSecundario
            titulo="Anterior"
            onPress={() => setPaso(paso - 1)}
            style={styles.botonSecundario}
          />
        )}
        <Pressable onPress={onTerminar} style={styles.saltar} accessibilityRole="button">
          <Text style={styles.saltarTexto}>Saltar introducción</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
    padding: SPACE[5],
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconoWrapper: {
    width: 140,
    height: 140,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.primarySoft,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACE[6],
  },
  titulo: {
    ...FONTS.h1,
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: SPACE[3],
  },
  texto: {
    ...FONTS.body,
    color: COLORS.text2,
    textAlign: 'center',
    marginBottom: SPACE[6],
  },
  puntos: { flexDirection: 'row', marginBottom: SPACE[6] },
  punto: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.border,
    marginHorizontal: 4,
  },
  puntoActivo: { backgroundColor: COLORS.primary, width: 24 },
  botones: { width: '100%' },
  botonSecundario: { marginTop: SPACE[2] },
  saltar: { marginTop: SPACE[4], alignItems: 'center', paddingVertical: SPACE[3] },
  saltarTexto: { ...FONTS.small, color: COLORS.textMuted },
});
