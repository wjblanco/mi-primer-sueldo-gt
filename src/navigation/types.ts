import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';

export type PresupuestoStackParamList = {
  PresupuestoHome: undefined;
  ItemForm: { itemId?: string } | undefined;
  AcercaDe: undefined;
};

export type CalculadoraStackParamList = {
  CalculadoraEntrada: { netoPrecargado?: number; origen?: 'presupuesto' } | undefined;
  ResultadoPlanilla: { netoObjetivo: number; anioFiscal: number };
  ResultadoFacturado: { sueldoBase: number; netoObjetivo: number };
  ExplicacionConcepto: { concepto: string; anioFiscal: number };
  AcercaDe: undefined;
};

export type RootTabParamList = {
  PresupuestoTab: NavigatorScreenParams<PresupuestoStackParamList> | undefined;
  CalculadoraTab: NavigatorScreenParams<CalculadoraStackParamList> | undefined;
};

export type PresupuestoStackScreenProps<T extends keyof PresupuestoStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<PresupuestoStackParamList, T>,
    BottomTabScreenProps<RootTabParamList>
  >;

export type CalculadoraStackScreenProps<T extends keyof CalculadoraStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<CalculadoraStackParamList, T>,
    BottomTabScreenProps<RootTabParamList>
  >;
