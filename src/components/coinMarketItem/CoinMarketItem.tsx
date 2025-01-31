import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import colors from '../../utils/colors';

interface CoinMarketItemProps {
  market: {
    name: string;
    price_usd: string;
  };
}

/**
 * Component CoinMarketItem (Renders the coin market)
 * @param {CoinMarketItemProps} props - Props containing the market object
 * @returns {JSX.Element} The rendered component
 */
const CoinMarketItem: React.FC<CoinMarketItemProps> = memo(({ market }) => {
  return (
    <View style={styles.container}>
      <Text
        style={styles.nameText}
        testID="marketName"
        accessible={true}
        accessibilityLabel={`${market.name}`}
      >
        {market.name}
      </Text>
      <Text
        style={styles.priceText}
        testID="marketPrice"
        accessible={true}
        accessibilityLabel={`${market.price_usd}`}
      >
        {market.price_usd}
      </Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0, 0.1)',
    borderColor: colors.zircon,
    borderWidth: 1,
    padding: 16,
    margin: 8,
    alignItems: 'center',
  },
  nameText: {
    color: colors.white,
    fontWeight: 'bold',
  },
  priceText: {
    color: colors.white,
  },
});

export default CoinMarketItem;
