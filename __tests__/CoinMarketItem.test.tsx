import React from 'react';
import { render } from '@testing-library/react-native';
import CoinMarketItem from '../src/components/coinMarketItem/CoinMarketItem';

describe('CoinMarketItem component', () => {
  const mockMarket = {
    name: 'Market Name',
    price_usd: '100',
  };

  it('renders correctly', () => {
    const { getByText } = render(<CoinMarketItem market={mockMarket} />);
    const nameElement = getByText(mockMarket.name);
    const priceElement = getByText(mockMarket.price_usd);
    expect(nameElement).toBeTruthy();
    expect(priceElement).toBeTruthy();
  });

  it('is accessible with proper accessibility labels', () => {
    const { getByTestId } = render(<CoinMarketItem market={mockMarket} />);

    const nameElement = getByTestId('marketName');
    expect(nameElement.props.accessible).toBe(true);
    expect(nameElement.props.accessibilityLabel).toBe('Market Name');

    const priceElement = getByTestId('marketPrice');
    expect(priceElement.props.accessible).toBe(true);
    expect(priceElement.props.accessibilityLabel).toBe('100');
  });

  it('does not re-render when props do not change', () => {
    const { rerender, getByTestId } = render(<CoinMarketItem market={mockMarket} />);

    const initialRender = getByTestId('marketName');
    expect(initialRender).toBeTruthy();

    // Re-renderiza el componente con las mismas props
    rerender(<CoinMarketItem market={mockMarket} />);
    const afterRerender = getByTestId('marketName');

    // Verifica que el componente no haya cambiado
    expect(afterRerender).toBe(initialRender);
  });

  it('matches snapshot', () => {
    const tree = render(<CoinMarketItem market={mockMarket} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
