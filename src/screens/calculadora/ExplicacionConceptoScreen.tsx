import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TEXTOS } from '../../constants/textos';
import {
  BotonPrincipal,
  CampoMonto,
  NotaInformativa,
  COLORS,
  FONTS,
  RADIUS,
  SPACE,
  formatQ,
} from '../../components/ui';
import PromptPerfilLaboral from '../../components/ui/PromptPerfilLaboral';
import { useConfiguracion } from '../../context/ConfiguracionContext';
import { parseMonto, formatMontoInput } from '../../utils/validaciones';
import type { CalculadoraStackScreenProps } from '../../navigation/types';

const TITULOS: Record<string, string> = {
  sueldo_base: 'Sueldo base',
  bonificacion_incentivo: 'Bonificación incentivo',
  igss: 'IGSS',
  isr: 'ISR',
  provision_aguinaldo: 'Provisión aguinaldo',
  provision_bono14: 'Provisión bono 14',
  provision_vacaciones: 'Provisión vacaciones',
  igss_voluntario: 'IGSS voluntario',
  seguro_privado: 'Seguro médico privado',
  impuesto_unico: 'Impuesto único (5%)',
};

export default function ExplicacionConceptoScreen({
  route,
}: CalculadoraStackScreenProps<'ExplicacionConcepto'>) {
  const navigation = useNavigation();
  const { concepto, anioFiscal } = route.params;
  const {
    configuracion,
    setPerfilLaboral,
    setSalarioMinimoVigente,
  } = useConfiguracion();

  const [promptVisible, setPromptVisible] = useState(false);
  const [salarioTexto, setSalarioTexto] = useState(
    configuracion.salarioMinimoVigente !== null
      ? formatMontoInput(configuracion.salarioMinimoVigente)
      : ''
  );
  const [errorSalario, setErrorSalario] = useState<string | null>(null);

  const titulo = TITULOS[concepto] ?? concepto;
  const texto =
    (TEXTOS.conceptos as Record<string, string>)[concepto] ?? 'Concepto no encontrado.';

  const mostrarEnlacePerfil =
    concepto === 'igss_voluntario' && configuracion.haTrabajadoEnPlanilla !== 'desconocido';

  const esISR2027 = concepto === 'isr' && anioFiscal >= 2027;

  const onGuardarSalario = () => {
    const parsed = parseMonto(salarioTexto);
    if (parsed === null || parsed <= 0) {
      setErrorSalario('Ingresa un salario mínimo válido.');
      return;
    }
    setErrorSalario(null);
    setSalarioMinimoVigente(parsed);
  };

  const salarioUsado =
    configuracion.salarioMinimoVigente !== null
      ? configuracion.salarioMinimoVigente
      : 4002.28;
  const deduccionMostrada = (salarioUsado + 250) * 12;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.titulo}>{titulo}</Text>
      <Text style={styles.cuerpo}>{texto}</Text>

      {esISR2027 && (
        <View style={styles.ajusteCard}>
          <NotaInformativa
            texto={`⚠️ Desde 2027, tu deducción personal equivale a 12 salarios mínimos. Si sabes el salario mínimo vigente, puedes ajustarlo aquí.`}
            tipo="warning"
          />
          <CampoMonto
            etiqueta="Salario mínimo base (sin bonificación)"
            placeholder="Q4,002.28"
            value={salarioTexto}
            onChangeText={(t) => {
              setSalarioTexto(t);
              if (errorSalario) setErrorSalario(null);
            }}
            error={errorSalario}
            ayuda={`Deducción resultante: ${formatQ(deduccionMostrada)}`}
          />
          <BotonPrincipal titulo="Guardar salario mínimo" onPress={onGuardarSalario} />
          {configuracion.salarioMinimoVigente === null && (
            <Text style={styles.avisoEstimado}>
              Usando valor estimado. Ajústalo si conoces el salario mínimo vigente.
            </Text>
          )}
        </View>
      )}

      {mostrarEnlacePerfil && (
        <Pressable
          onPress={() => setPromptVisible(true)}
          style={styles.enlace}
          accessibilityRole="button"
        >
          <Text style={styles.enlaceTexto}>¿Cambió tu situación? Actualizar mi perfil laboral</Text>
        </Pressable>
      )}

      <BotonPrincipal
        titulo={TEXTOS.global.entendido}
        onPress={() => navigation.goBack()}
        style={styles.boton}
      />

      <PromptPerfilLaboral
        visible={promptVisible}
        onResponder={(perfil) => {
          setPerfilLaboral(perfil);
          setPromptVisible(false);
        }}
        onCerrar={() => setPromptVisible(false)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  content: { padding: SPACE[4] },
  titulo: { ...FONTS.h2, color: COLORS.text, marginBottom: SPACE[4] },
  cuerpo: {
    ...FONTS.body,
    color: COLORS.text,
    lineHeight: 24,
    marginBottom: SPACE[4],
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    padding: SPACE[4],
  },
  ajusteCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    padding: SPACE[4],
    marginBottom: SPACE[4],
  },
  avisoEstimado: {
    ...FONTS.caption,
    color: COLORS.warning,
    marginTop: SPACE[2],
    textAlign: 'center',
  },
  enlace: { paddingVertical: SPACE[3], marginBottom: SPACE[4] },
  enlaceTexto: { ...FONTS.small, color: COLORS.primary, textDecorationLine: 'underline' },
  boton: { marginTop: SPACE[2] },
});
