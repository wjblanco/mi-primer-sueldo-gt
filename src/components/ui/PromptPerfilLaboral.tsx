import React from 'react';
import { Modal, View, Text, StyleSheet, Pressable } from 'react-native';
import { COLORS, FONTS, RADIUS, SPACE } from './tokens';

interface Props {
  visible: boolean;
  onResponder: (perfil: 'si' | 'no') => void;
  onCerrar: () => void;
}

export default function PromptPerfilLaboral({ visible, onResponder, onCerrar }: Props) {
  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onCerrar}>
      <Pressable style={styles.backdrop} onPress={onCerrar}>
        <Pressable style={styles.card} onPress={() => {}}>
          <Text style={styles.titulo}>¿Ya trabajaste en planilla antes?</Text>
          <Text style={styles.cuerpo}>
            Esto nos ayuda a saber si puedes optar al IGSS voluntario.
          </Text>
          <Pressable style={styles.botonPrimario} onPress={() => onResponder('si')}>
            <Text style={styles.botonPrimarioTexto}>Sí, ya trabajé</Text>
          </Pressable>
          <Pressable style={styles.botonSecundario} onPress={() => onResponder('no')}>
            <Text style={styles.botonSecundarioTexto}>No, sería mi primer empleo</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACE[5],
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACE[5],
    width: '100%',
    maxWidth: 400,
  },
  titulo: { ...FONTS.h3, color: COLORS.text, marginBottom: SPACE[3] },
  cuerpo: { ...FONTS.body, color: COLORS.text2, marginBottom: SPACE[5] },
  botonPrimario: {
    height: 48,
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACE[3],
  },
  botonPrimarioTexto: { ...FONTS.bodyStrong, color: COLORS.surface },
  botonSecundario: {
    height: 48,
    borderRadius: RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  botonSecundarioTexto: { ...FONTS.bodyStrong, color: COLORS.text2 },
});
