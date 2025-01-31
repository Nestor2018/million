import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import ListCoins from '../src/components/listCoins/ListCoins';
import * as coinsApi from '../src/api/coins';

const mockCoins = [
  {
    id: '1',
    name: 'Bitcoin',
    symbol: 'BTC',
    price_usd: '50000',
    percent_change_1h: 5,
  },
  {
    id: '2',
    name: 'Ethereum',
    symbol: 'ETH',
    price_usd: '3000',
    percent_change_1h: -2,
  },
];

// Mock del navigation props
const mockNavigation = { navigate: jest.fn() };

describe('ListCoins Component', () => {
  beforeEach(() => {
    jest.spyOn(coinsApi, 'get').mockResolvedValue({ data: mockCoins });
  });

  it('should filter coins correctly', async () => {
    const { getByTestId, queryByText } = render(
      <ListCoins navigation={mockNavigation} />
    );

    // Espera a que los datos se carguen y el componente se actualice
    await act(async () => {
      await Promise.resolve();
    });

    // Filtra las monedas por nombre
    const coinSearchInput = getByTestId('input');
    act(() => {
      fireEvent.changeText(coinSearchInput, 'Bitcoin');
    });

    // Solo Bitcoin debería ser visible
    expect(queryByText('Bitcoin')).toBeTruthy();
    expect(queryByText('Ethereum')).toBeNull();
  });

  it('should load coins from the API on mount', async () => {
    const { getByTestId } = render(<ListCoins navigation={mockNavigation} />);

    // Espera a que los datos se carguen y el componente se actualice
    await act(async () => {
      await Promise.resolve();
    });

    expect(getByTestId('listCoins')).toBeTruthy();
  });

  it('should show loader while loading data', async () => {
    const { getByTestId } = render(<ListCoins navigation={mockNavigation} />);

    // Verifica que el Loader esté presente mientras los datos se cargan
    expect(getByTestId('loader')).toBeTruthy();

    // Espera a que los datos se carguen
    await act(async () => {
      await Promise.resolve();
    });

    // Verifica que el Loader desaparezca después de cargar los datos
    expect(() => getByTestId('loader')).toThrow();
  });

  it('should show all coins when search input is cleared', async () => {
    const { getByTestId, queryByText } = render(
      <ListCoins navigation={mockNavigation} />
    );

    // Espera a que los datos se carguen
    await act(async () => {
      await Promise.resolve();
    });

    // Filtra las monedas por nombre
    const coinSearchInput = getByTestId('input');
    fireEvent.changeText(coinSearchInput, 'Bitcoin');

    // Solo Bitcoin debería ser visible
    expect(queryByText('Bitcoin')).toBeTruthy();
    expect(queryByText('Ethereum')).toBeNull();

    // Limpia el campo de búsqueda
    fireEvent.changeText(coinSearchInput, '');

    // Todas las monedas deberían ser visibles nuevamente
    expect(queryByText('Bitcoin')).toBeTruthy();
    expect(queryByText('Ethereum')).toBeTruthy();
  });

  it('should handle edge cases in search input', async () => {
    const { getByTestId, queryByText } = render(
      <ListCoins navigation={mockNavigation} />
    );

    // Espera a que los datos se carguen
    await act(async () => {
      await Promise.resolve();
    });

    // Simula una búsqueda con texto largo
    const coinSearchInput = getByTestId('input');
    fireEvent.changeText(coinSearchInput, 'a'.repeat(50));

    // Ninguna moneda debería coincidir
    expect(queryByText('Bitcoin')).toBeNull();
    expect(queryByText('Ethereum')).toBeNull();

    // Simula una búsqueda con caracteres especiales
    fireEvent.changeText(coinSearchInput, '@#$%^&*');

    // Ninguna moneda debería coincidir
    expect(queryByText('Bitcoin')).toBeNull();
    expect(queryByText('Ethereum')).toBeNull();
  });

  it('matches snapshot', async () => {
    const tree = render(<ListCoins navigation={mockNavigation} />);

    // Espera a que los datos se carguen
    await act(async () => {
      await Promise.resolve();
    });

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should render initial number of items correctly', async () => {
    const { getAllByTestId } = render(<ListCoins navigation={mockNavigation} />);

    // Espera a que los datos se carguen
    await act(async () => {
      await Promise.resolve();
    });

    // Verifica que se rendericen los elementos iniciales
    const renderedItems = getAllByTestId('coinItem');
    expect(renderedItems.length).toBe(2); // Deberían renderizarse 2 monedas (mockCoins)
  });
});
