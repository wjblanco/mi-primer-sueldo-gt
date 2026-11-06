import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Item } from '../types';

const KEY_PRESUPUESTO = '@mi-primer-sueldo-gt/presupuesto-items';

export async function cargarItems(): Promise<Item[]> {
  try {
    const raw = await AsyncStorage.getItem(KEY_PRESUPUESTO);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as Item[];
  } catch (e) {
    console.warn('No se pudo cargar el presupuesto:', e);
    return [];
  }
}

export async function guardarItems(items: Item[]): Promise<void> {
  try {
    await AsyncStorage.setItem(KEY_PRESUPUESTO, JSON.stringify(items));
  } catch (e) {
    console.warn('No se pudo guardar el presupuesto:', e);
    throw e;
  }
}

export async function borrarItems(): Promise<void> {
  try {
    await AsyncStorage.removeItem(KEY_PRESUPUESTO);
  } catch (e) {
    console.warn('No se pudo borrar el presupuesto:', e);
    throw e;
  }
}

// ── Configuración del usuario ────────────────────────────────────────
import type { ConfiguracionUsuario } from '../types';

const KEY_CONFIGURACION = '@mi-primer-sueldo-gt/configuracion';

export async function cargarConfiguracion(): Promise<Partial<ConfiguracionUsuario> | null> {
  try {
    const raw = await AsyncStorage.getItem(KEY_CONFIGURACION);
    if (!raw) return null;
    return JSON.parse(raw) as Partial<ConfiguracionUsuario>;
  } catch (e) {
    console.warn('No se pudo cargar la configuración:', e);
    return null;
  }
}

export async function guardarConfiguracion(config: ConfiguracionUsuario): Promise<void> {
  try {
    await AsyncStorage.setItem(KEY_CONFIGURACION, JSON.stringify(config));
  } catch (e) {
    console.warn('No se pudo guardar la configuración:', e);
    throw e;
  }
}

// ── Onboarding ──────────────────────────────────────────────────────
const KEY_ONBOARDING = '@mi-primer-sueldo-gt/onboarding-visto';

export async function onboardingVisto(): Promise<boolean> {
  try {
    return (await AsyncStorage.getItem(KEY_ONBOARDING)) === 'true';
  } catch {
    return false;
  }
}

export async function marcarOnboardingVisto(): Promise<void> {
  try {
    await AsyncStorage.setItem(KEY_ONBOARDING, 'true');
  } catch (e) {
    console.warn('No se pudo guardar el onboarding:', e);
  }
}
