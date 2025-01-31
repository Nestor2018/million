import React, { useState, useCallback, memo } from 'react';
import { View, StyleSheet, TextInput, Platform } from 'react-native';

import colors from '../../utils/colors';

interface CoinSearchProps {
  onChange: (query: string) => void;
}
/**
 * Componente CoinSearch (barra de búsqueda para filtrar monedas)
 * @param {CoinSearchProps} props - Props que contienen la función onChange
 * @returns {JSX.Element} El componente renderizado
 */
const CoinSearch: React.FC<CoinSearchProps> = memo(({ onChange }) => {
  const [query, setQuery] = useState<string>('');

  /**
  Cambia el estado de query y devuelve su valor a onChange
  @param {string} queryInput
  */
  const handleText = useCallback((queryInput: string) => {
    setQuery(queryInput);
    if (onChange) {
      onChange(queryInput);
    }
  }, [onChange]);

  return (
    <View testID="coinSearch">
      <TextInput
        testID="input"
        style={[
          styles.textInput,
          Platform.OS == 'ios' ? styles.textInputIos : styles.textInputAndroid,
        ]}
        onChangeText={handleText}
        value={query}
        placeholder="Search coin"
        placeholderTextColor="white"
        accessible={true}
        accessibilityLabel="Search coin"
      />
    </View>
  );
});

const styles = StyleSheet.create({
  textInput: {
    height: 46,
    backgroundColor: colors.blackPearl,
    paddingLeft: 16,
    color: colors.white,
  },
  textInputAndroid: {
    borderWidth: 2,
    borderBottomColor: colors.zircon,
  },
  textInputIos: {
    margin: 8,
    borderRadius: 8,
  },
});

export default CoinSearch;
