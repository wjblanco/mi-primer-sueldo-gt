import React from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, Linking } from 'react-native';
import Constants from 'expo-constants';
import { useNavigation } from '@react-navigation/native';
import {
  COLORS,
  FONTS,
  RADIUS,
  SPACE,
} from '../components/ui';
import { ICONO_ACCION, ICON_SIZE } from '../components/ui/iconos';

export default function AcercaDeScreen() {
  const navigation = useNavigation();
  const VolverIcon = ICONO_ACCION.volver;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.botonVolver}
          accessibilityRole="button"
          accessibilityLabel="Volver"
          hitSlop={8}
        >
          <VolverIcon size={ICON_SIZE.lg} color={COLORS.text} strokeWidth={2} />
        </Pressable>
        <Text style={styles.titulo}>Acerca de</Text>
      </View>

      <Text style={styles.appNombre}>Mi Primer Sueldo GT</Text>
      <Text style={styles.version}>Versión {Constants.expoConfig?.version ?? '1.0.0'}</Text>

      <View style={styles.bloque}>
        <Text style={styles.bloqueTitulo}>¿Para qué sirve?</Text>
        <Text style={styles.bloqueTexto}>
          Esta app te ayuda a calcular cuánto necesitas ganar para cubrir tus gastos mensuales,
          entender cómo se compone un salario en Guatemala, y comparar un trabajo en planilla con
          uno por facturación.
        </Text>
      </View>

      <View style={styles.bloque}>
        <Text style={styles.bloqueTitulo}>Lo que esta app no hace</Text>
        <Text style={styles.bloqueTexto}>
          No te dice cuánto pagar ni cuánto aceptar. No reemplaza asesoría legal ni una liquidación
          oficial. Los cálculos son estimaciones basadas en las reglas laborales y fiscales vigentes
          en Guatemala, pero tu situación particular puede variar.
        </Text>
      </View>

      <View style={styles.bloque}>
        <Text style={styles.bloqueTitulo}>Privacidad</Text>
        <Text style={styles.bloqueTexto}>
          No recolectamos tus datos. Todo lo que ingresas se guarda solo en tu teléfono. La app
          funciona sin internet y no incluye anuncios ni analítica.
        </Text>
      </View>

      <View style={styles.bloque}>
        <Text style={styles.bloqueTitulo}>Fuentes de los cálculos</Text>
        <Text style={styles.bloqueTexto}>
          IGSS: 4.83% en planilla, 5.5% en régimen voluntario.{'\n'}
          ISR: tarifas del 5% y 7% según tramos.{'\n'}
          Aguinaldo, bono 14 y vacaciones: Código de Trabajo de Guatemala.{'\n'}
          Impuesto único del Pequeño Contribuyente: 5% sobre ingresos brutos.{'\n'}
          Tope del Pequeño Contribuyente: referencia a la publicación anual de la SAT.
        </Text>
      </View>

      <View style={styles.bloque}>
        <Text style={styles.bloqueTitulo}>Contacto</Text>
        <Text style={styles.bloqueTexto}>
          Si encuentras un error o tienes una sugerencia, escríbenos a{' '}
          <Text
            style={styles.enlace}
            onPress={() => Linking.openURL('mailto:wilsonjblancog@gmail.com')}
          >
            wilsonjblancog@gmail.com
          </Text>
        </Text>
      </View>

      <Text style={styles.pie}>
        Hecha en Guatemala, para jóvenes que empiezan su vida laboral.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  content: { padding: SPACE[4], paddingBottom: SPACE[6] },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACE[5],
  },
  botonVolver: { width: 44, height: 44, justifyContent: 'center', marginRight: SPACE[2] },
  titulo: { ...FONTS.h1, color: COLORS.text },
  appNombre: { ...FONTS.h2, color: COLORS.primary, marginBottom: SPACE[1] },
  version: { ...FONTS.small, color: COLORS.textMuted, marginBottom: SPACE[5] },
  bloque: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    padding: SPACE[4],
    marginBottom: SPACE[3],
  },
  bloqueTitulo: { ...FONTS.bodyStrong, color: COLORS.text, marginBottom: SPACE[2] },
  bloqueTexto: { ...FONTS.body, color: COLORS.text2, lineHeight: 22 },
  enlace: { color: COLORS.primary, textDecorationLine: 'underline' },
  pie: {
    ...FONTS.caption,
    color: COLORS.textMuted,
    textAlign: 'center',
    marginTop: SPACE[5],
    fontStyle: 'italic',
  },
});
