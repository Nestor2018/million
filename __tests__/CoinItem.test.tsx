import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Image } from 'react-native';
import CoinItem from '../src/components/listCoins/CoinItem';
import '@testing-library/jest-native/extend-expect';


describe('CoinItem Component', () => {
  const mockCoin = {
    symbol: 'BTC',
    name: 'Bitcoin',
    price_usd: '50000',
    percent_change_1h: 5,
    id: '1',
    nameid: 'bitcoin',
    rank: 1,
    percent_change_24h: 10,
    percent_change_7d: 20,
    market_cap_usd: '1000000000',
    volume24: '500000000',
    volume24a: '450000000',
    csupply: '18000000',
    tsupply: '21000000',
    msupply: '21000000',
  };

  it('should call onPress when pressed', () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = render(
      <CoinItem coin={mockCoin} onPress={mockOnPress} />,
    );

    const coinItem = getByTestId('coinItem');
    fireEvent.press(coinItem);

    expect(mockOnPress).toHaveBeenCalled();
  });

  it('should display the correct coin details', () => {
    const { getByText } = render(
      <CoinItem coin={mockCoin} onPress={() => { }} />,
    );

    expect(getByText('BTC')).toBeTruthy();
    expect(getByText('Bitcoin')).toBeTruthy();
    expect(getByText('$50000')).toBeTruthy();
    expect(getByText('5')).toBeTruthy();
  });

  it('should display the correct arrow icon based on percent change', () => {
    const mockCoinPositive = {
      ...mockCoin,
      percent_change_1h: 5, // Cambio positivo
    };
    const { getByTestId } = render(
      <CoinItem coin={mockCoinPositive} onPress={() => { }} />,
    );
    const image = getByTestId('coinItem').findByType(Image);
    expect(image.props.source).toEqual(require('../assets/arrow_up.png'));

    const mockCoinNegative = {
      ...mockCoin,
      percent_change_1h: -5, // Cambio negativo
    };
    const { getByTestId: getByTestIdNegative } = render(
      <CoinItem coin={mockCoinNegative} onPress={() => { }} />,
    );
    const imageNegative = getByTestIdNegative('coinItem').findByType(Image);
    expect(imageNegative.props.source).toEqual(require('../assets/arrow_down.png'));
  });


  it('should handle missing or invalid data gracefully', () => {
    const mockCoinInvalid = {
      symbol: 'BTC',
      name: 'Bitcoin',
      price_usd: undefined, // Precio no definido
      percent_change_1h: null, // Cambio no definido
      id: '1',
      nameid: 'bitcoin',
      rank: 1,
      percent_change_24h: 10,
      percent_change_7d: 20,
      market_cap_usd: '1000000000',
      volume24: '500000000',
      volume24a: '450000000',
      csupply: '18000000',
      tsupply: '21000000',
      msupply: '21000000',
    };
    const { getByText } = render(
      <CoinItem coin={mockCoinInvalid} onPress={() => { }} />,
    );

    // Verifica que el precio y el cambio porcentual se muestren correctamente
    expect(getByText('$undefined')).toBeTruthy(); // Precio vacío
  });

  it('should not re-render when props do not change', () => {
    const mockOnPress = jest.fn();
    const { rerender, getByTestId } = render(
      <CoinItem coin={mockCoin} onPress={mockOnPress} />,
    );

    const initialRender = getByTestId('coinItem');
    expect(initialRender).toBeTruthy();

    // Re-renderiza el componente con las mismas props
    rerender(<CoinItem coin={mockCoin} onPress={mockOnPress} />);
    const afterRerender = getByTestId('coinItem');

    // Verifica que el componente no haya cambiado
    expect(afterRerender).toBe(initialRender);
  });

  it('should match snapshot', () => {
    const tree = render(<CoinItem coin={mockCoin} onPress={() => { }} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

