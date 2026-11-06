import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { PresupuestoStackParamList } from './types';
import PresupuestoHomeScreen from '../screens/presupuesto/PresupuestoHomeScreen';
import ItemFormScreen from '../screens/presupuesto/ItemFormScreen';
import { TEXTOS } from '../constants/textos';
import AcercaDeScreen from '../screens/AcercaDeScreen';
import { Pressable, Text } from 'react-native';
import { COLORS } from '../components/ui/tokens';

const Stack = createNativeStackNavigator<PresupuestoStackParamList>();

export default function PresupuestoStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PresupuestoHome"
        component={PresupuestoHomeScreen}
        options={({ navigation }) => ({
          title: TEXTOS.moduloA.titulo,
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
        name="ItemForm"
        component={ItemFormScreen}
        options={({ route }) => ({
          title: route.params?.itemId ? 'Editar gasto' : 'Nuevo gasto',
        })}
      />
    </Stack.Navigator>
  );
}
