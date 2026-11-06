import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { PresupuestoStackParamList } from '../../navigation/types';
import type { Categoria, Frecuencia } from '../../types';
import { usePresupuesto } from '../../context/PresupuestoContext';
import { FACTORES_FRECUENCIA } from '../../constants/calculo';
import { TEXTOS } from '../../constants/textos';
import {
  BotonPrincipal,
  BotonSecundario,
  CampoTexto,
  CampoMonto,
  Chips,
  NotaInformativa,
  CATEGORIA_LABEL,
  COLORS,
  FONTS,
  RADIUS,
  SPACE,
  formatQ,
} from '../../components/ui';
import { ICONO_CATEGORIA, ICON_SIZE } from '../../components/ui/iconos';
import { parseMonto, validarItem, formatMontoInput, type ErroresItem } from '../../utils/validaciones';
import type { PresupuestoStackScreenProps } from '../../navigation/types';

type Nav = NativeStackNavigationProp<PresupuestoStackParamList, 'ItemForm'>;

const FRECUENCIAS: { value: Frecuencia; label: string }[] = [
  { value: 'diario', label: 'Diario' },
  { value: 'semanal', label: 'Semanal' },
  { value: 'quincenal', label: 'Quincenal' },
  { value: 'mensual', label: 'Mensual' },
  { value: 'anual', label: 'Anual' },
];

const CATEGORIAS: Categoria[] = [
  'vivienda',
  'alimentacion',
  'transporte',
  'servicios',
  'salud',
  'ocio',
  'otros',
];

export default function ItemFormScreen({ route }: PresupuestoStackScreenProps<'ItemForm'>) {
  const navigation = useNavigation<Nav>();
  const { items, agregarItem, editarItem, eliminarItem } = usePresupuesto();

  const itemId = route.params?.itemId;
  const itemExistente = itemId ? items.find((i) => i.id === itemId) : undefined;
  const modoEditar = !!itemExistente;

  const [nombre, setNombre] = useState(itemExistente?.nombre ?? '');
  const [montoTexto, setMontoTexto] = useState(
    itemExistente ? formatMontoInput(itemExistente.monto) : ''
  );
  const [frecuencia, setFrecuencia] = useState<Frecuencia>(
    itemExistente?.frecuencia ?? 'mensual'
  );
  const [categoria, setCategoria] = useState<Categoria>(itemExistente?.categoria ?? 'otros');
  const [errores, setErrores] = useState<ErroresItem>({});

  const montoParsed = parseMonto(montoTexto);
  const equivalenteMensual = montoParsed ? montoParsed * FACTORES_FRECUENCIA[frecuencia] : 0;

  const onGuardar = () => {
    const { errores: nuevosErrores, monto } = validarItem(nombre, montoTexto, frecuencia);
    if (Object.keys(nuevosErrores).length > 0 || monto === null) {
      setErrores(nuevosErrores);
      return;
    }
    setErrores({});

    if (modoEditar && itemId) {
      editarItem(itemId, { nombre: nombre.trim(), monto, frecuencia, categoria });
    } else {
      agregarItem({ nombre: nombre.trim(), monto, frecuencia, categoria });
    }
    navigation.goBack();
  };

  const onEliminar = () => {
    if (!itemId) return;
    Alert.alert('¿Eliminar este gasto?', 'Esta acción no se puede deshacer.', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sí, eliminar',
        style: 'destructive',
        onPress: () => {
          eliminarItem(itemId);
          navigation.goBack();
        },
      },
    ]);
  };

  // Construir opciones de categoría con ícono
  const opcionesCategoria = CATEGORIAS.map((c) => {
    const Icon = ICONO_CATEGORIA[c];
    return {
      value: c,
      label: CATEGORIA_LABEL[c],
      icono: (
        <Icon
          size={ICON_SIZE.sm}
          color={categoria === c ? COLORS.primary : COLORS.text2}
          strokeWidth={2}
        />
      ),
    };
  });

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <CampoTexto
        etiqueta="Nombre"
        placeholder="Ej.: Renta, almuerzo, pasajes…"
        value={nombre}
        onChangeText={setNombre}
        maxLength={40}
        error={errores.nombre}
      />

      <CampoMonto
        etiqueta="Monto (Q)"
        placeholder="0.00"
        value={montoTexto}
        onChangeText={setMontoTexto}
        error={errores.monto}
      />

      <Text style={styles.label}>Frecuencia</Text>
      <Chips opciones={FRECUENCIAS} seleccionado={frecuencia} onSeleccionar={setFrecuencia} />

      <Text style={styles.label}>Categoría (opcional)</Text>
      <Chips opciones={opcionesCategoria} seleccionado={categoria} onSeleccionar={setCategoria} />

      <NotaInformativa
        texto={
          equivalenteMensual > 0
            ? `Equivale al mes: ${formatQ(equivalenteMensual)}`
            : 'Equivale al mes: —'
        }
      />

      <BotonPrincipal
        titulo={modoEditar ? 'Guardar cambios' : 'Agregar'}
        onPress={onGuardar}
      />

      {modoEditar && (
        <BotonSecundario
          titulo="Eliminar"
          onPress={onEliminar}
          peligro
          style={{ marginTop: SPACE[3] }}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  content: { padding: SPACE[4] },
  label: { ...FONTS.small, color: COLORS.text2, marginBottom: SPACE[2] },
});
