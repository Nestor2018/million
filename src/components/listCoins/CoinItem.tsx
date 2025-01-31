import React, { useCallback, memo } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';

import colors from '../../utils/colors';
import { Icoin } from '../../interfaces/coin.interface';


interface CoinItemProps {
  coin: Icoin;
  onPress: () => void;
}

/**
 * Componente CoinItem (Renderiza una moneda)
 * @param {CoinItemProps} props - Props que contienen el objeto coin y la función onPress
 * @returns {JSX.Element} El componente renderizado
 */
const CoinItem: React.FC<CoinItemProps> = memo(({ coin, onPress }) => {
  const { symbol, name, price_usd, percent_change_1h } = coin;

  /**
   * Muestra una imagen dependiendo de si el valor de la moneda subió o bajó en la última hora
   * @param {number} percentChange
   * @returns {any} Fuente de la imagen
   */
  const getImageArrow = useCallback((percentChange: number) => {
    return percentChange > 0
      ? require('../../../assets/arrow_up.png')
      : require('../../../assets/arrow_down.png');
  }, []);

  return (
    <Pressable onPress={onPress} style={styles.container} testID="coinItem">
      <View style={styles.row}>
        <Text style={styles.symbolText}>{symbol}</Text>
        <Text style={styles.nameText}>{name}</Text>
        <Text style={styles.price}> {`$${price_usd}`}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.percentText}>{percent_change_1h}</Text>
        <Image
          source={getImageArrow(percent_change_1h)}
          style={styles.imageIcon}
        />
      </View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomColor: colors.zircon,
    borderBottomWidth: 1,
  },
  row: {
    flexDirection: 'row',
  },
  symbolText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 12,
  },
  nameText: {
    color: colors.white,
    fontSize: 14,
  },
  percentText: {
    color: colors.white,
    fontSize: 12,
    marginRight: 8,
  },
  price: {
    color: colors.white,
    fontSize: 14,
    marginLeft: 12,
  },
  imageIcon: {
    width: 22,
    height: 22,
  },
});

export default CoinItem;
