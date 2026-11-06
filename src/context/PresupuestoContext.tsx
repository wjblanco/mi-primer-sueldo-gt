import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { Item } from '../types';
import { FACTORES_FRECUENCIA } from '../constants/calculo';
import { cargarItems, guardarItems } from '../utils/storage';

export type EstadoGuardado = 'idle' | 'guardando' | 'guardado' | 'error';

interface PresupuestoContextValue {
  items: Item[];
  totalMensual: number;
  cargandoInicial: boolean;
  estadoGuardado: EstadoGuardado;
  agregarItem: (item: Omit<Item, 'id'>) => void;
  editarItem: (id: string, item: Partial<Omit<Item, 'id'>>) => void;
  eliminarItem: (id: string) => void;
  limpiarTodo: () => void;
  guardarManual: () => Promise<void>;
}

const PresupuestoContext = createContext<PresupuestoContextValue | null>(null);

export function PresupuestoProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Item[]>([]);
  const [cargandoInicial, setCargandoInicial] = useState(true);
  const [estadoGuardado, setEstadoGuardado] = useState<EstadoGuardado>('idle');
  const yaCargo = useRef(false);

  // ── Carga inicial ───────────────────────────────────────────────────
  useEffect(() => {
    let activo = true;
    (async () => {
      const cargados = await cargarItems();
      if (activo) {
        setItems(cargados);
        setCargandoInicial(false);
        yaCargo.current = true;
      }
    })();
    return () => {
      activo = false;
    };
  }, []);

  // ── Guardado automático en cada cambio ──────────────────────────────
  useEffect(() => {
    if (!yaCargo.current) return; // no guardar antes de la carga inicial
    let cancelado = false;
    (async () => {
      try {
        setEstadoGuardado('guardando');
        await guardarItems(items);
        if (!cancelado) setEstadoGuardado('guardado');
      } catch {
        if (!cancelado) setEstadoGuardado('error');
      }
    })();
    return () => {
      cancelado = true;
    };
  }, [items]);

  // Resetear el estado "guardado" a "idle" después de 2s
  useEffect(() => {
    if (estadoGuardado !== 'guardado') return;
    const t = setTimeout(() => setEstadoGuardado('idle'), 2000);
    return () => clearTimeout(t);
  }, [estadoGuardado]);

  const totalMensual = useMemo(
    () =>
      items.reduce(
        (sum, item) => sum + item.monto * FACTORES_FRECUENCIA[item.frecuencia],
        0
      ),
    [items]
  );

  const agregarItem = useCallback((item: Omit<Item, 'id'>) => {
    const id = `item-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    setItems((prev) => [...prev, { ...item, id }]);
  }, []);

  const editarItem = useCallback((id: string, cambios: Partial<Omit<Item, 'id'>>) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...cambios } : item))
    );
  }, []);

  const eliminarItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const limpiarTodo = useCallback(() => setItems([]), []);

  const guardarManual = useCallback(async () => {
    try {
      setEstadoGuardado('guardando');
      await guardarItems(items);
      setEstadoGuardado('guardado');
    } catch {
      setEstadoGuardado('error');
    }
  }, [items]);

  const value = useMemo(
    () => ({
      items,
      totalMensual,
      cargandoInicial,
      estadoGuardado,
      agregarItem,
      editarItem,
      eliminarItem,
      limpiarTodo,
      guardarManual,
    }),
    [items, totalMensual, cargandoInicial, estadoGuardado, agregarItem, editarItem, eliminarItem, limpiarTodo, guardarManual]
  );

  return <PresupuestoContext.Provider value={value}>{children}</PresupuestoContext.Provider>;
}

export function usePresupuesto(): PresupuestoContextValue {
  const ctx = useContext(PresupuestoContext);
  if (!ctx) {
    throw new Error('usePresupuesto debe usarse dentro de <PresupuestoProvider>');
  }
  return ctx;
}
