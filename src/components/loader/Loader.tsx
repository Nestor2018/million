import React from 'react';
import { StyleSheet, ActivityIndicator, ActivityIndicatorProps } from 'react-native';

interface LoaderProps extends ActivityIndicatorProps { }

/**
 * Componente de Loader (Muestra un indicador de carga cuando se está cargando información en la pantalla)
 * @param {LoaderProps} props - Propiedades para personalizar el loader
 * @returns {JSX.Element} El componente renderizado
 */
const Loader: React.FC<LoaderProps> = ({ color = 'white', size = 'large', style, ...rest }) => (
  <ActivityIndicator color={color} size={size} style={[styles.loader, style]} {...rest} testID="loader" />
);

const styles = StyleSheet.create({
  loader: {
    margin: 20,
  },
});

export default Loader;
