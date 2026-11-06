import React, { useMemo, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { PresupuestoStackParamList, RootTabParamList } from '../../navigation/types';
import type { Categoria } from '../../types';
import { usePresupuesto } from '../../context/PresupuestoContext';
import { FACTORES_FRECUENCIA } from '../../constants/calculo';
import { TEXTOS } from '../../constants/textos';
import {
  BotonPrincipal,
  BotonSecundario,
  TarjetaItem,
  CategoriaIcono,
  CATEGORIA_LABEL,
  COLORS,
  FONTS,
  RADIUS,
  SPACE,
  formatQ,
} from '../../components/ui';
import { CompositeNavigationProp } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { AccessibilityInfo } from 'react-native';

type Nav = CompositeNavigationProp<
  NativeStackNavigationProp<PresupuestoStackParamList, 'PresupuestoHome'>,
  BottomTabNavigationProp<RootTabParamList>
>;

export default function PresupuestoHomeScreen() {
  const navigation = useNavigation<Nav>();
  const { items, totalMensual, cargandoInicial, estadoGuardado, guardarManual } = usePresupuesto();

  const desglosePorCategoria = useMemo(() => {
    const mapa = new Map<Categoria, number>();
    for (const item of items) {
      const eq = item.monto * FACTORES_FRECUENCIA[item.frecuencia];
      mapa.set(item.categoria, (mapa.get(item.categoria) ?? 0) + eq);
    }
    return Array.from(mapa.entries())
      .map(([categoria, monto]) => ({
        categoria,
        monto,
        porcentaje: totalMensual > 0 ? (monto / totalMensual) * 100 : 0,
      }))
      .sort((a, b) => b.monto - a.monto);
  }, [items, totalMensual]);
  
  useEffect(() => {
    // No anunciar en el render inicial ni cuando la lista está vacía
    if (items.length === 0) return;
  
    const mensaje = `Total actualizado: ${totalMensual.toFixed(2)} quetzales`;
    AccessibilityInfo.announceForAccessibility(mensaje);
  }, [totalMensual, items.length]);

  if (cargandoInicial) {
    return (
      <View style={styles.cargandoContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  // ── A-3: Estado vacío ──────────────────────────────────────────────
  if (items.length === 0) {
    return (
      <View style={styles.vacioContainer}>
        {(() => { const Icon = require('../../components/ui/iconos').ICONO_ACCION.presupuesto; return <Icon size={64} color={COLORS.textMuted} strokeWidth={1.5} style={{ marginBottom: 16 }} />; })()}
        <Text style={styles.vacioTitulo}>{TEXTOS.moduloA.estadoVacioTitulo}</Text>
        <Text style={styles.vacioSub}>{TEXTOS.moduloA.estadoVacioSub}</Text>
        <BotonPrincipal
          titulo={TEXTOS.moduloA.agregarPrimerGasto}
          onPress={() => navigation.navigate('ItemForm')}
          style={styles.vacioBoton}
        />
      </View>
    );
  }

  // ── A-1: Con datos ──────────────────────────────────────────────────
  const textoBotonGuardar =
    estadoGuardado === 'guardando'
      ? TEXTOS.moduloA.guardando
      : estadoGuardado === 'guardado'
      ? TEXTOS.moduloA.guardado
      : 'Guardar en el teléfono';

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Tarjeta de total */}
	{/* Se removió el atributo 'accessibilityLiveRegion="polite"' */}
        <View
          style={styles.totalCard}
          accessible
          accessibilityLabel={`${TEXTOS.moduloA.necesitoAlMes}: ${totalMensual.toFixed(2)} quetzales`}
        >
          <Text style={styles.totalEtiqueta}>{TEXTOS.moduloA.necesitoAlMes}</Text>
          <Text style={styles.totalMonto}>{formatQ(totalMensual)}</Text>
        </View>

        {/* Desglose por categoría */}
        <Text style={styles.seccion}>{TEXTOS.moduloA.porCategoria}</Text>
        <View style={styles.categoriasCard}>
          {desglosePorCategoria.map(({ categoria, monto, porcentaje }) => (
            <View key={categoria} style={styles.categoriaFila}>
              <CategoriaIcono categoria={categoria} />
              <Text style={styles.categoriaLabel}>{CATEGORIA_LABEL[categoria]}</Text>
              <Text style={styles.categoriaMonto}>{formatQ(monto)}</Text>
              <Text style={styles.categoriaPct}>{porcentaje.toFixed(0)}%</Text>
            </View>
          ))}
        </View>

        {/* Lista de ítems */}
        <Text style={styles.seccion}>{TEXTOS.moduloA.todosLosGastos}</Text>
        <View style={styles.itemsCard}>
          {items.map((item) => (
            <TarjetaItem
              key={item.id}
              item={item}
              onEditar={() => navigation.navigate('ItemForm', { itemId: item.id })}
            />
          ))}
        </View>

        <BotonSecundario
          titulo={TEXTOS.moduloA.agregarGasto}
          onPress={() => navigation.navigate('ItemForm')}
          style={styles.agregarBoton}
        />

        {/* Botón de guardado manual */}
        <Pressable
          onPress={guardarManual}
          disabled={estadoGuardado === 'guardando'}
          style={[styles.guardarBoton, estadoGuardado === 'error' && styles.guardarError]}
          accessibilityRole="button"
          accessibilityLabel={TEXTOS.moduloA.guardarEnTelefono}
          accessibilityHint="Guarda tu presupuesto en este dispositivo"
        >
          <Text style={styles.guardarTexto}>{textoBotonGuardar}</Text>
        </Pressable>
      </ScrollView>

      {/* Acción principal fija al fondo */}
      <View style={styles.footer}>
        <BotonPrincipal
          titulo={TEXTOS.moduloA.calcularCuantoDeboPedir}
          onPress={() => {
            navigation.navigate('CalculadoraTab', {
              screen: 'CalculadoraEntrada',
              params: { netoPrecargado: totalMensual, origen: 'presupuesto' },
            });
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  cargandoContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.bg },
  scrollContent: { padding: SPACE[4], paddingBottom: SPACE[6] },
  totalCard: {
    backgroundColor: COLORS.primarySoft,
    borderRadius: RADIUS.lg,
    padding: SPACE[5],
    marginBottom: SPACE[5],
  },
  totalEtiqueta: { ...FONTS.body, color: COLORS.text2, marginBottom: SPACE[1] },
  totalMonto: { ...FONTS.display, color: COLORS.text },
  seccion: { ...FONTS.h2, color: COLORS.text, marginBottom: SPACE[3] },
  categoriasCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    padding: SPACE[4],
    marginBottom: SPACE[5],
  },
  categoriaFila: { flexDirection: 'row', alignItems: 'center', paddingVertical: SPACE[2] },
  categoriaLabel: { ...FONTS.body, color: COLORS.text, flex: 1, marginLeft: SPACE[2] },
  categoriaMonto: { ...FONTS.bodyStrong, color: COLORS.text, marginRight: SPACE[3] },
  categoriaPct: { ...FONTS.small, color: COLORS.text2, width: 40, textAlign: 'right' },
  itemsCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    overflow: 'hidden',
    marginBottom: SPACE[4],
  },
  agregarBoton: { marginTop: SPACE[2], marginBottom: SPACE[3] },
  guardarBoton: {
    height: 44,
    borderRadius: RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  guardarError: { borderColor: COLORS.error, backgroundColor: COLORS.errorSoft },
  guardarTexto: { ...FONTS.bodyStrong, color: COLORS.primary },
  footer: {
    padding: SPACE[4],
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  vacioContainer: {
    flex: 1,
    backgroundColor: COLORS.bg,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACE[5],
  },
  vacioIcono: { fontSize: 48, marginBottom: SPACE[4] },
  vacioTitulo: { ...FONTS.h2, color: COLORS.text, textAlign: 'center', marginBottom: SPACE[2] },
  vacioSub: { ...FONTS.body, color: COLORS.text2, textAlign: 'center', marginBottom: SPACE[5] },
  vacioBoton: { width: '100%' },
});
