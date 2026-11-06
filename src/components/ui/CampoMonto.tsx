import React from 'react';
import { TextInputProps } from 'react-native';
import CampoTexto from './CampoTexto';

interface Props extends Omit<TextInputProps, 'style' | 'keyboardType'> {
  etiqueta: string;
  error?: string | null;
  ayuda?: string;
}

export default function CampoMonto({ etiqueta, error, ayuda, ...rest }: Props) {
  return (
    <CampoTexto
      etiqueta={etiqueta}
      error={error}
      ayuda={ayuda}
      keyboardType="decimal-pad"
      {...rest}
    />
  );
}
