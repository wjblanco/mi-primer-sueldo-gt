import { useEffect, useState } from 'react';
import { AccessibilityInfo } from 'react-native';

/**
 * Hook que devuelve true si el usuario tiene activada la preferencia
 * de «reducir movimiento» en el sistema.
 */
export function useReducirMovimiento(): boolean {
  const [reducir, setReducir] = useState(false);

  useEffect(() => {
    let activo = true;
    AccessibilityInfo.isReduceMotionEnabled().then((valor) => {
      if (activo) setReducir(valor);
    });
    const sub = AccessibilityInfo.addEventListener('reduceMotionChanged', (valor) => {
      setReducir(valor);
    });
    return () => {
      activo = false;
      sub.remove();
    };
  }, []);

  return reducir;
}
