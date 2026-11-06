import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { CalculadoraStackParamList } from './types';
import CalculadoraEntradaScreen from '../screens/calculadora/CalculadoraEntradaScreen';
import ResultadoPlanillaScreen from '../screens/calculadora/ResultadoPlanillaScreen';
import ExplicacionConceptoScreen from '../screens/calculadora/ExplicacionConceptoScreen';
import ResultadoFacturadoScreen from '../screens/calculadora/ResultadoFacturadoScreen';
import { TEXTOS } from '../constants/textos';
import AcercaDeScreen from '../screens/AcercaDeScreen';
import { Pressable, Text } from 'react-native';
import { COLORS } from '../components/ui/tokens';

const Stack = createNativeStackNavigator<CalculadoraStackParamList>();

export default function CalculadoraStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CalculadoraEntrada"
        component={CalculadoraEntradaScreen}
        options={({ navigation }) => ({
          title: TEXTOS.moduloB.tituloEntrada,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('AcercaDe')}
              style={{ paddingHorizontal: 12, paddingVertical: 8 }}
              accessibilityRole="button"
              accessibilityLabel="Acerca de"
            >
              <Text style={{ color: COLORS.primary, fontWeight: '600' }}>Acerca de</Text>
            </Pressable>
          ),
        })}
      />
      <Stack.Screen
        name="AcercaDe"
        component={AcercaDeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ResultadoPlanilla"
        component={ResultadoPlanillaScreen}
        options={{ title: TEXTOS.moduloB.tituloPlanilla }}
      />
      <Stack.Screen
        name="ResultadoFacturado"
        component={ResultadoFacturadoScreen}
        options={{ title: TEXTOS.moduloB.tituloFacturado }}
      />
      <Stack.Screen
        name="ExplicacionConcepto"
        component={ExplicacionConceptoScreen}
        options={{ title: 'Explicación', presentation: 'modal' }}
      />
    </Stack.Navigator>
  );
}
