import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView, FlatList, StyleSheet, Text } from 'react-native';
import { NavigationProp } from '@react-navigation/native';

import CoinItem from './CoinItem';
import CoinSearch from '../coinSearch/CoinSearch';
import Loader from '../loader/Loader';
import { get } from '../../api/coins';
import colors from '../../utils/colors';
import { Icoin } from '../../interfaces/coin.interface';


interface ListCoinsProps {
  navigation: NavigationProp<any>;
}

/**
 * Componente ListCoins (lista de monedas)
 * @param {ListCoinsProps} props - Propiedades que contienen el objeto de navegación
 * @returns {JSX.Element} El componente renderizado
 */
const ListCoins: React.FC<ListCoinsProps> = ({ navigation }) => {
  const [coins, setCoins] = useState<Icoin[]>([]);
  const [allCoins, setAllCoins] = useState<Icoin[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      await loadCoins();
    })();
  }, []);

  /**
  Realiza una solicitud GET para obtener las monedas
  */

  const loadCoins = async () => {
    try {
      setLoading(true);
      const response = await get('/tickers');
      setCoins(response.data);
      setAllCoins(response.data);
    } catch (error) {
      console.error('Error loading coins:', error);
      setError('Error loading coins. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  /**
  Recibe el texto ingresado en el input para filtrar el array de monedas
  @param {string} query
  */
  const handleSearch = useCallback((query: string) => {
    const coinsFiltered = allCoins.filter((coin: Icoin) => {
      return (
        coin.name.toLowerCase().includes(query.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(query.toLowerCase())
      );
    });
    setCoins(coinsFiltered);
  }, [allCoins]);

  /**
  Redirige a la pantalla de CoinDetail y envía la moneda para ser renderizada
  @param {object} coin 
  */
  const handlePress = useCallback((coin: Icoin) => {
    navigation.navigate('CoinDetail', { coin });
  }, [navigation]);

  const renderItem = ({ item }: { item: Icoin }) => (
    <CoinItem coin={item} onPress={() => handlePress(item)} />
  );

  return (
    <SafeAreaView style={styles.container} testID="listCoins">
      <CoinSearch onChange={handleSearch} />
      {loading ? <Loader testID="loader" /> : null}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <FlatList
        data={coins}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        extraData={allCoins}
        initialNumToRender={13}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.charade,
    flex: 1,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default ListCoins;

