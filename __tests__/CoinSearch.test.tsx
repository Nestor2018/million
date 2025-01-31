import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CoinSearch from '../src/components/coinSearch/CoinSearch';

describe('CoinSearch Component', () => {
  it('should call onChange when text is entered', () => {
    const mockOnChange = jest.fn();
    const { getByTestId } = render(<CoinSearch onChange={mockOnChange} />);
    const mockText = 'bitcoin';

    const input = getByTestId('input');
    fireEvent.changeText(input, mockText);

    expect(mockOnChange).toHaveBeenCalledWith(mockText);
  });

  it('should update the input value when text is entered', () => {
    const mockOnChange = jest.fn();
    const { getByTestId } = render(<CoinSearch onChange={mockOnChange} />);
    const mockText = 'bitcoin';
    const input = getByTestId('input');

    fireEvent.changeText(input, mockText);
    expect(input.props.value).toBe(mockText); // Verifica que el valor del campo sea correcto
  });

  it('should display the correct placeholder', () => {
    const mockOnChange = jest.fn();
    const { getByPlaceholderText } = render(<CoinSearch onChange={mockOnChange} />);

    const placeholder = getByPlaceholderText('Search coin');
    expect(placeholder).toBeTruthy(); // Verifica que el placeholder esté presente
  });

  it('should handle empty input correctly', () => {
    const mockOnChange = jest.fn();
    const { getByTestId } = render(<CoinSearch onChange={mockOnChange} />);
    const input = getByTestId('input');

    fireEvent.changeText(input, ''); // Simula un campo vacío
    expect(mockOnChange).toHaveBeenCalledWith(''); // Verifica que onChange reciba un string vacío
    expect(input.props.value).toBe(''); // Verifica que el valor del campo sea vacío
  });

  it('is accessible with proper accessibility labels', () => {
    const mockOnChange = jest.fn();
    const { getByTestId } = render(<CoinSearch onChange={mockOnChange} />);

    const input = getByTestId('input');
    expect(input.props.accessible).toBe(true); // Verifica que el campo sea accesible
    expect(input.props.accessibilityLabel).toBe('Search coin'); // Verifica el label de accesibilidad
  });

  it('does not re-render when props do not change', () => {
    const mockOnChange = jest.fn();
    const { rerender, getByTestId } = render(<CoinSearch onChange={mockOnChange} />);

    const initialRender = getByTestId('input');
    expect(initialRender).toBeTruthy();

    // Re-renderiza el componente con las mismas props
    rerender(<CoinSearch onChange={mockOnChange} />);
    const afterRerender = getByTestId('input');

    // Verifica que el componente no haya cambiado
    expect(afterRerender).toBe(initialRender);
  });

  it('matches snapshot', () => {
    const mockOnChange = jest.fn();
    const tree = render(<CoinSearch onChange={mockOnChange} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('handles long input values correctly', () => {
    const mockOnChange = jest.fn();
    const { getByTestId } = render(<CoinSearch onChange={mockOnChange} />);
    const input = getByTestId('input');

    const longText = 'a'.repeat(100); // Simula un texto muy largo
    fireEvent.changeText(input, longText);

    expect(mockOnChange).toHaveBeenCalledWith(longText); // Verifica que onChange reciba el texto largo
    expect(input.props.value).toBe(longText); // Verifica que el valor del campo sea correcto
  });
});
