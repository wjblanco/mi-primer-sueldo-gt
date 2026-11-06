import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { CalculadoraStackParamList } from '../../navigation/types';
import type { Concepto, ProteccionSalud } from '../../types';
import { TEXTOS } from '../../constants/textos';
import { useConfiguracion } from '../../context/ConfiguracionContext';
import {
  BotonPrincipal,
  TarjetaResultado,
  LineaDesglose,
  AvisoLegal,
  NotaInformativa,
  SelectorProteccionSalud,
  CampoPrimaSeguro,
  SwitchIgssAdicional,
  PromptPerfilLaboral,
  COLORS,
  FONTS,
  RADIUS,
  SPACE,
  formatQ,
} from '../../components/ui';
import { calcularFacturado } from '../../engine/facturado';
import { parseMonto, formatMontoInput } from '../../utils/validaciones';
import type { CalculadoraStackScreenProps } from '../../navigation/types';

type Nav = NativeStackNavigationProp<CalculadoraStackParamList, 'ResultadoFacturado'>;

const RANGO_MIN = 250;
const RANGO_MAX = 900;

export default function ResultadoFacturadoScreen({
  route,
}: CalculadoraStackScreenProps<'ResultadoFacturado'>) {
  const navigation = useNavigation<Nav>();
  const { sueldoBase, netoObjetivo } = route.params;

  const {
    configuracion,
    setProteccionSalud,
    setPrimaSeguroPrivado,
    setTambienAportaIgssConSeguro,
    setPerfilLaboral,
  } = useConfiguracion();

  const [primaTexto, setPrimaTexto] = useState(
    configuracion.primaSeguroPrivado !== null
      ? formatMontoInput(configuracion.primaSeguroPrivado)
      : ''
  );
  const [promptVisible, setPromptVisible] = useState(false);

  useEffect(() => {
    const parsed = parseMonto(primaTexto);
    setPrimaSeguroPrivado(parsed);
  }, [primaTexto, setPrimaSeguroPrivado]);

  const primaParsed = parseMonto(primaTexto);
  const primaFueraDeRango =
    primaParsed !== null && (primaParsed < RANGO_MIN || primaParsed > RANGO_MAX);

  const resultado = useMemo(
    () =>
      calcularFacturado({
        sueldoBase,
        proteccionSalud: configuracion.proteccionSalud,
        primaSeguroPrivado: primaParsed,
        tambienAportaIgssConSeguro: configuracion.tambienAportaIgssConSeguro,
      }),
    [sueldoBase, configuracion.proteccionSalud, primaParsed, configuracion.tambienAportaIgssConSeguro]
  );

  const faltaPrima =
    configuracion.proteccionSalud === 'seguro_privado' && (primaParsed === null || primaParsed <= 0);
  const diferencia = resultado.montoFacturar - sueldoBase;

  const onCambiarProteccion = (v: ProteccionSalud) => {
    if (v === 'igss_voluntario' && !configuracion.calificaParaIgssVoluntario) {
      setPromptVisible(true);
      return;
    }
    setProteccionSalud(v);
  };

  const onResponderPerfil = (perfil: 'si' | 'no') => {
    setPerfilLaboral(perfil);
    setPromptVisible(false);
    if (perfil === 'si') {
      setProteccionSalud('igss_voluntario');
    }
  };

  const abrirExplicacion = (concepto: Concepto) => {
    navigation.navigate('ExplicacionConcepto', {
      concepto,
      anioFiscal: new Date().getFullYear(),
    });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.titulo}>{TEXTOS.moduloB.tituloFacturado}</Text>

      <TarjetaResultado
        etiqueta={TEXTOS.moduloB.deberiasFacturar}
        monto={resultado.montoFacturar}
        nota={faltaPrima ? TEXTOS.moduloB.completaPrima : undefined}
      />

      {resultado.superaTope && (
        <NotaInformativa
          texto={`⚠️ Con este monto, tus ingresos anuales superarían el límite del Pequeño Contribuyente (${formatQ(resultado.topeAnual)}). En ese caso, la ley exige inscribirte en el Régimen General, donde el IVA es del 12% y el ISR se calcula sobre tus utilidades. El cálculo que ves aquí es una estimación; consulta con un contador para ese escenario.`}
          tipo="warning"
        />
      )}

      <Text style={styles.seccion}>{TEXTOS.moduloB.proteccionSalud}</Text>
      <View style={styles.saludCard}>
        <SelectorProteccionSalud
          valor={configuracion.proteccionSalud}
          calificaParaIgssVoluntario={configuracion.calificaParaIgssVoluntario}
          onCambiar={onCambiarProteccion}
          onSolicitarPerfil={() => setPromptVisible(true)}
        />
        {configuracion.proteccionSalud === 'seguro_privado' && (
          <>
            <CampoPrimaSeguro
              valor={primaTexto}
              onCambiar={setPrimaTexto}
              fueraDeRango={primaFueraDeRango}
            />
            <SwitchIgssAdicional
              valor={configuracion.tambienAportaIgssConSeguro}
              onCambiar={setTambienAportaIgssConSeguro}
            />
          </>
        )}
      </View>

      <Text style={styles.seccion}>{TEXTOS.moduloB.comoSeCalcula}</Text>
      <View style={styles.desgloseCard}>
        <LineaDesglose
          etiqueta="Sueldo base"
          monto={resultado.sueldoBase}
          tipo="ingreso"
          onPress={() => abrirExplicacion('sueldo_base')}
        />
        <LineaDesglose
          etiqueta="Provisión aguinaldo"
          monto={resultado.provisionAguinaldo}
          tipo="provision"
          onPress={() => abrirExplicacion('provision_aguinaldo')}
        />
        <LineaDesglose
          etiqueta="Provisión bono 14"
          monto={resultado.provisionBono14}
          tipo="provision"
          onPress={() => abrirExplicacion('provision_bono14')}
        />
        <LineaDesglose
          etiqueta="Provisión vacaciones"
          monto={resultado.provisionVacaciones}
          tipo="provision"
          onPress={() => abrirExplicacion('provision_vacaciones')}
        />
        {resultado.detalleSalud.seguroPrivado > 0 && (
          <LineaDesglose
            etiqueta="Seguro médico"
            monto={resultado.detalleSalud.seguroPrivado}
            tipo="provision"
            onPress={() => abrirExplicacion('seguro_privado')}
          />
        )}
        {resultado.detalleSalud.igssVoluntario > 0 && (
          <LineaDesglose
            etiqueta="IGSS voluntario (5.5%)"
            monto={resultado.detalleSalud.igssVoluntario}
            tipo="provision"
            onPress={() => abrirExplicacion('igss_voluntario')}
          />
        )}
        <LineaDesglose
          etiqueta="Impuesto único (5%)"
          monto={resultado.impuestoUnico}
          tipo="provision"
          onPress={() => abrirExplicacion('impuesto_unico')}
        />
        <LineaDesglose etiqueta="A facturar" monto={resultado.montoFacturar} tipo="total" />
      </View>

      <Text style={styles.hint}>{TEXTOS.moduloB.tocaCadaLinea}</Text>

      <Text style={styles.seccion}>{TEXTOS.moduloB.comparacion}</Text>
      <View style={styles.comparacionCard}>
        <View style={styles.comparacionFila}>
          <Text style={styles.comparacionLabel}>En planilla pides</Text>
          <Text style={styles.comparacionMonto}>{formatQ(sueldoBase)}</Text>
        </View>
        <View style={styles.comparacionFila}>
          <Text style={styles.comparacionLabel}>Facturando pides</Text>
          <Text style={styles.comparacionMonto}>{formatQ(resultado.montoFacturar)}</Text>
        </View>
        <View style={[styles.comparacionFila, styles.comparacionTotal]}>
          <Text style={[styles.comparacionLabel, styles.comparacionLabelTotal]}>Diferencia</Text>
          <Text style={[styles.comparacionMonto, styles.comparacionMontoTotal]}>
            {formatQ(diferencia)}
          </Text>
        </View>
      </View>

      {configuracion.proteccionSalud === 'igss_voluntario' && (
        <NotaInformativa
          texto="El IGSS voluntario solo cubre pensión. No cubre consultas, medicinas ni hospitalización."
          tipo="warning"
        />
      )}

      <BotonPrincipal
        titulo={TEXTOS.moduloB.volverACalcular}
        onPress={() => navigation.popToTop()}
        style={styles.boton}
      />

      <AvisoLegal texto={TEXTOS.moduloB.avisoLegal} />

      <PromptPerfilLaboral
        visible={promptVisible}
        onResponder={onResponderPerfil}
        onCerrar={() => setPromptVisible(false)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  content: { padding: SPACE[4], paddingBottom: SPACE[6] },
  titulo: { ...FONTS.h1, color: COLORS.text, marginBottom: SPACE[5] },
  seccion: { ...FONTS.h3, color: COLORS.text, marginTop: SPACE[4], marginBottom: SPACE[3] },
  saludCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    padding: SPACE[4],
    marginBottom: SPACE[3],
  },
  desgloseCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    paddingVertical: SPACE[2],
    marginBottom: SPACE[3],
  },
  hint: { ...FONTS.caption, color: COLORS.textMuted, textAlign: 'center', marginBottom: SPACE[3] },
  comparacionCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    padding: SPACE[4],
    marginBottom: SPACE[4],
  },
  comparacionFila: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: SPACE[2],
  },
  comparacionTotal: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    marginTop: SPACE[2],
    paddingTop: SPACE[3],
  },
  comparacionLabel: { ...FONTS.body, color: COLORS.text2 },
  comparacionMonto: { ...FONTS.bodyStrong, color: COLORS.text },
  comparacionLabelTotal: { ...FONTS.bodyStrong, color: COLORS.text },
  comparacionMontoTotal: { ...FONTS.bodyStrong, color: COLORS.primary },
  boton: { marginTop: SPACE[3] },
});
