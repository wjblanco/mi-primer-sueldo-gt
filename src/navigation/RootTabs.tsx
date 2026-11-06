import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { RootTabParamList } from './types';
import PresupuestoStack from './PresupuestoStack';
import CalculadoraStack from './CalculadoraStack';
import { ICONO_ACCION, ICON_SIZE } from '../components/ui/iconos';
import { COLORS } from '../components/ui/tokens';

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function RootTabs() {
  const ClipboardIcon = ICONO_ACCION.presupuesto;
  const CalculatorIcon = ICONO_ACCION.calcular;

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textMuted,
        tabBarStyle: {
          backgroundColor: COLORS.surface,
          borderTopColor: COLORS.border,
        },
      }}
    >
      <Tab.Screen
        name="PresupuestoTab"
        component={PresupuestoStack}
        options={{
          title: 'Mi presupuesto',
          tabBarAccessibilityLabel: 'Mi presupuesto',
          tabBarIcon: ({ color }) => (
            <ClipboardIcon size={ICON_SIZE.lg} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tab.Screen
        name="CalculadoraTab"
        component={CalculadoraStack}
        options={{
          title: 'Calcular salario',
          tabBarAccessibilityLabel: 'Calcular salario',
          tabBarIcon: ({ color }) => (
            <CalculatorIcon size={ICON_SIZE.lg} color={color} strokeWidth={2} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
