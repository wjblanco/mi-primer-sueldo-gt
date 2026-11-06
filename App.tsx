import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PresupuestoProvider } from './src/context/PresupuestoContext';
import { ConfiguracionProvider } from './src/context/ConfiguracionContext';
import RootTabs from './src/navigation/RootTabs';
import OnboardingScreen from './src/screens/OnboardingScreen';
import { onboardingVisto, marcarOnboardingVisto } from './src/utils/storage';
import { COLORS } from './src/components/ui/tokens';

export default function App() {
  const [estado, setEstado] = useState<'cargando' | 'onboarding' | 'app'>('cargando');

  useEffect(() => {
    (async () => {
      const visto = await onboardingVisto();
      setEstado(visto ? 'app' : 'onboarding');
    })();
  }, []);

  const onTerminarOnboarding = async () => {
    await marcarOnboardingVisto();
    setEstado('app');
  };

  if (estado === 'cargando') {
    return (
      <View style={styles.cargando}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <ConfiguracionProvider>
        <PresupuestoProvider>
          {estado === 'onboarding' ? (
            <OnboardingScreen onTerminar={onTerminarOnboarding} />
          ) : (
            <NavigationContainer>
              <RootTabs />
            </NavigationContainer>
          )}
        </PresupuestoProvider>
      </ConfiguracionProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  cargando: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.bg },
});
