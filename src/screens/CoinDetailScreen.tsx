import React, { useState, useEffect, memo } from 'react';
import {
  View,
  StyleSheet,
  SectionList,
  FlatList,
  Text,
  Image,
} from 'react-native';

import CoinMarketItem from '../components/coinMarketItem/CoinMarketItem';
import Loader from '../components/loader/Loader';
import colors from '../utils/colors';
import { get } from '../api/coins';
import { Icoin } from '../interfaces/coin.interface';


interface Imarket {
  name: string;
  base: string;
  quote: string;
  price: number;
  price_usd: number;
  volume: number;
  volume_usd: number;
  time: number;
}

interface CoinDetailScreenProps {
  navigation: any;
  route: {
    params: {
      coin: Icoin;
    };
  };
}

/**
 * Componente CoinDetailScreen (Muestra los detalles de una moneda)
 * @param {CoinDetailScreenProps} props - Propiedades para el componente
 * @returns {JSX.Element} El componente renderizado
 */
const CoinDetailScreen: React.FC<CoinDetailScreenProps> = ({ navigation, route }) => {
  const coin = route.params.coin;
  const [markets, setMarkets] = useState<Array<Imarket>>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    navigation.setOptions({ title: coin.name });
    getMarkets(coin.id);
  }, [coin, navigation]);

  const getSymbolIcon = (name: string) => {
    if (name) {
      const symbol = name.toLowerCase().replace(' ', '-');
      return `https://c1.coinlore.com/img/25x25/${symbol}.png`;
    }
    return '';
  };

  const getMarkets = async (coinId: string) => {
    try {
      setLoading(true);
      const marketsList = await get(`/coin/markets/?id=${coinId}`);
      setMarkets(marketsList);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Genera secciones para el componente SectionList
   * @param {Icoin} coin - El objeto de moneda que contiene detalles
   * @returns {Array} Un array de objetos de sección
   */
  const getSections = (coin: Icoin) => [
    {
      title: 'Price',
      data: [coin.price_usd]
    },
    {
      title: 'Market cap',
      data: [coin.market_cap_usd],
    },
    {
      title: 'Volumen 24h',
      data: [coin.volume24],
    },
    {
      title: 'Change',
      data: [coin.percent_change_24h],
    },
  ];

  const renderItem = ({ item }: { item: { name: string; price_usd: string } }) => (
    <CoinMarketItem market={item} />
  );

  return (
    <View style={styles.container} testID="coinDetail">
      <View style={styles.subHeader}>
        <View style={styles.row}>
          <Image
            style={styles.image}
            source={{ uri: getSymbolIcon(coin.name) }}
          />
          <Text style={styles.titleText}>{coin.name}</Text>
        </View>
      </View>
      {loading && <Loader />}
      <SectionList
        style={styles.section}
        sections={getSections(coin)}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => (
          <View style={styles.sectionItem}>
            <Text style={styles.sectionText}>{item}</Text>
          </View>
        )}
        renderSectionHeader={({ section }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionText}>{section.title}</Text>
          </View>
        )}
      />
      <Text style={styles.marketsTitle}>Markets</Text>
      <FlatList
        style={styles.list}
        horizontal
        data={markets}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.charade,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subHeader: {
    backgroundColor: 'rgba(0,0,0, 0.1)',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  image: {
    width: 25,
    height: 25,
    marginRight: 8,
  },
  section: {
    maxHeight: 320,
  },
  sectionHeader: {
    backgroundColor: 'rgba(0,0,0, 0.2)',
    padding: 8,
  },
  sectionItem: {
    padding: 8,
  },
  itemText: {
    color: colors.white,
    fontSize: 14,
  },
  sectionText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  list: {
    maxHeight: 100,
    paddingLeft: 16,
  },
  marketsTitle: {
    color: colors.white,
    fontSize: 16,
    marginBottom: 16,
    marginLeft: 16,
  },
  btnFavorite: {
    padding: 8,
    borderRadius: 8,
  },
  btnFavoriteText: {
    color: colors.white,
  },
  btnFavoriteAdd: {
    backgroundColor: colors.picton,
  },
  btnFavoriteRemove: {
    backgroundColor: colors.carmine,
  },
});
export default memo(CoinDetailScreen);
