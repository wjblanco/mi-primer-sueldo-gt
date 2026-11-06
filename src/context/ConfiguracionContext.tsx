import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { ConfiguracionUsuario, PerfilLaboral, ProteccionSalud } from '../types';
import { cargarConfiguracion, guardarConfiguracion } from '../utils/storage';

const CONFIG_DEFAULT: ConfiguracionUsuario = {
  proteccionSalud: 'seguro_privado',
  primaSeguroPrivado: null,
  tambienAportaIgssConSeguro: false,
  calificaParaIgssVoluntario: false,
  haTrabajadoEnPlanilla: 'desconocido',
  salarioMinimoVigente: null,
  anioFiscal: new Date().getFullYear(),
};

interface ConfiguracionContextValue {
  configuracion: ConfiguracionUsuario;
  cargando: boolean;
  setPerfilLaboral: (perfil: PerfilLaboral) => void;
  setProteccionSalud: (v: ProteccionSalud) => void;
  setPrimaSeguroPrivado: (v: number | null) => void;
  setTambienAportaIgssConSeguro: (v: boolean) => void;
  setSalarioMinimoVigente: (v: number | null) => void;
}

const ConfiguracionContext = createContext<ConfiguracionContextValue | null>(null);

export function ConfiguracionProvider({ children }: { children: React.ReactNode }) {
  const [configuracion, setConfiguracion] = useState<ConfiguracionUsuario>(CONFIG_DEFAULT);
  const [cargando, setCargando] = useState(true);
  const yaCargo = useRef(false);

  useEffect(() => {
    let activo = true;
    (async () => {
      const guardada = await cargarConfiguracion();
      if (activo) {
        if (guardada) {
          setConfiguracion({ ...CONFIG_DEFAULT, ...guardada });
        }
        setCargando(false);
        yaCargo.current = true;
      }
    })();
    return () => {
      activo = false;
    };
  }, []);

  useEffect(() => {
    if (!yaCargo.current) return;
    let cancelado = false;
    (async () => {
      try {
        await guardarConfiguracion(configuracion);
      } catch {
        if (!cancelado) {
          // silencioso: el botón de guardado del presupuesto ya muestra errores
        }
      }
    })();
    return () => {
      cancelado = true;
    };
  }, [configuracion]);

  const setPerfilLaboral = useCallback((perfil: PerfilLaboral) => {
    setConfiguracion((prev) => ({
      ...prev,
      haTrabajadoEnPlanilla: perfil,
      calificaParaIgssVoluntario: perfil === 'si',
    }));
  }, []);

  const setProteccionSalud = useCallback((v: ProteccionSalud) => {
    setConfiguracion((prev) => ({ ...prev, proteccionSalud: v }));
  }, []);

  const setPrimaSeguroPrivado = useCallback((v: number | null) => {
    setConfiguracion((prev) => ({ ...prev, primaSeguroPrivado: v }));
  }, []);

  const setTambienAportaIgssConSeguro = useCallback((v: boolean) => {
    setConfiguracion((prev) => ({ ...prev, tambienAportaIgssConSeguro: v }));
  }, []);

  const setSalarioMinimoVigente = useCallback((v: number | null) => {
    setConfiguracion((prev) => ({ ...prev, salarioMinimoVigente: v }));
  }, []);

  const value = useMemo(
    () => ({
      configuracion,
      cargando,
      setPerfilLaboral,
      setProteccionSalud,
      setPrimaSeguroPrivado,
      setTambienAportaIgssConSeguro,
      setSalarioMinimoVigente,
    }),
    [configuracion, cargando, setPerfilLaboral, setProteccionSalud, setPrimaSeguroPrivado, setTambienAportaIgssConSeguro, setSalarioMinimoVigente]
  );

  return <ConfiguracionContext.Provider value={value}>{children}</ConfiguracionContext.Provider>;
}

export function useConfiguracion(): ConfiguracionContextValue {
  const ctx = useContext(ConfiguracionContext);
  if (!ctx) throw new Error('useConfiguracion debe usarse dentro de <ConfiguracionProvider>');
  return ctx;
}
