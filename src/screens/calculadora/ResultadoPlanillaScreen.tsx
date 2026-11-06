import React, { useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { CalculadoraStackParamList } from '../../navigation/types';
import type { Concepto } from '../../types';
import { TEXTOS } from '../../constants/textos';
import { useConfiguracion } from '../../context/ConfiguracionContext';
import {
  BotonPrincipal,
  TarjetaResultado,
  LineaDesglose,
  AvisoLegal,
  COLORS,
  FONTS,
  RADIUS,
  SPACE,
} from '../../components/ui';
import { calcularSueldoOrdinario } from '../../engine/calculoInverso';
import { calcularISR, estadoAnioFiscal } from '../../engine/isr';
import type { CalculadoraStackScreenProps } from '../../navigation/types';

type Nav = NativeStackNavigationProp<CalculadoraStackParamList, 'ResultadoPlanilla'>;

export default function ResultadoPlanillaScreen({
  route,
}: CalculadoraStackScreenProps<'ResultadoPlanilla'>) {
  const navigation = useNavigation<Nav>();
  const { netoObjetivo } = route.params;
  const { configuracion } = useConfiguracion();

  const params = useMemo(
    () => ({
      anioFiscal: configuracion.anioFiscal,
      salarioMinimoVigente: configuracion.salarioMinimoVigente,
    }),
    [configuracion.anioFiscal, configuracion.salarioMinimoVigente]
  );

  const resultado = useMemo(() => {
    const calc = calcularSueldoOrdinario(netoObjetivo, params);
    const isrDetalle = calcularISR(calc.sueldoOrdinario, params);
    const estado = estadoAnioFiscal(params);
    return { calc, isrDetalle, estado };
  }, [netoObjetivo, params]);

  const { calc, isrDetalle, estado } = resultado;
  const diferencia = Math.abs(calc.netoCalculado - netoObjetivo);
  const notaMeta = calc.convergio && diferencia <= 1 ? TEXTOS.moduloB.meta : TEXTOS.moduloB.ajustado;

  const abrirExplicacion = (concepto: Concepto) => {
    navigation.navigate('ExplicacionConcepto', {
      concepto,
      anioFiscal: configuracion.anioFiscal,
    });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.titulo}>{TEXTOS.moduloB.tituloPlanilla}</Text>

      <TarjetaResultado
        etiqueta={TEXTOS.moduloB.deberiasPedir}
        monto={calc.sueldoOrdinario}
        nota={notaMeta}
      />

      <Text style={styles.seccion}>{TEXTOS.moduloB.comoSeCalcula}</Text>
      <View style={styles.desgloseCard}>
        <LineaDesglose
          etiqueta="Sueldo base"
          monto={calc.sueldoOrdinario}
          tipo="ingreso"
          onPress={() => abrirExplicacion('sueldo_base')}
        />
        <LineaDesglose
          etiqueta="Bonificación incentivo"
          monto={calc.bonificacionIncentivo}
          tipo="ingreso"
          onPress={() => abrirExplicacion('bonificacion_incentivo')}
        />
        <LineaDesglose
          etiqueta="IGSS (4.83%)"
          monto={calc.igss}
          tipo="descuento"
          onPress={() => abrirExplicacion('igss')}
        />
        <LineaDesglose
          etiqueta="ISR"
          monto={calc.isr}
          tipo="descuento"
          onPress={() => abrirExplicacion('isr')}
        />
        <LineaDesglose etiqueta="Neto" monto={calc.netoCalculado} tipo="total" />
      </View>

      <Text style={styles.hint}>{TEXTOS.moduloB.tocaCadaLinea}</Text>

      {isrDetalle.rentaImponible < 0 && (
        <Text style={styles.isrNota}>
          Con las reglas de {configuracion.anioFiscal}, tu sueldo está por debajo del mínimo para
          pagar ISR.
        </Text>
      )}

      {estado === 'anio2027SinDato' && (
        <Text style={styles.isrNota}>
          Estamos usando un salario mínimo estimado para {configuracion.anioFiscal}. Toca «ISR» en el
          desglose para ajustarlo.
        </Text>
      )}

      <BotonPrincipal
        titulo={TEXTOS.moduloB.verSiFacturo}
        onPress={() => {
          navigation.navigate('ResultadoFacturado', {
            sueldoBase: calc.sueldoOrdinario,
            netoObjetivo,
          });
        }}
        style={styles.botonFacturado}
      />

      <AvisoLegal texto={TEXTOS.moduloB.avisoLegal} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  content: { padding: SPACE[4], paddingBottom: SPACE[6] },
  titulo: { ...FONTS.h1, color: COLORS.text, marginBottom: SPACE[5] },
  seccion: { ...FONTS.h3, color: COLORS.text, marginBottom: SPACE[3] },
  desgloseCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    paddingVertical: SPACE[2],
    marginBottom: SPACE[3],
  },
  hint: { ...FONTS.caption, color: COLORS.textMuted, textAlign: 'center', marginBottom: SPACE[3] },
  isrNota: {
    ...FONTS.small,
    color: COLORS.info,
    backgroundColor: COLORS.infoSoft,
    borderRadius: RADIUS.md,
    padding: SPACE[3],
    marginBottom: SPACE[3],
  },
  botonFacturado: { marginTop: SPACE[3] },
});
