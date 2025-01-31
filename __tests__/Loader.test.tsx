import React, { memo } from 'react';
import { render } from '@testing-library/react-native';
import Loader from "../src/components/loader/Loader"

describe('Loader Component', () => {
  const MemoizedLoader = memo(Loader);

  it('should render the Loader component', () => {
    const { getByTestId } = render(<Loader />);
    const loader = getByTestId('loader');

    expect(loader).toBeTruthy();
  });

  it('should apply custom color and size', () => {
    const { getByTestId } = render(<Loader color="red" size="small" />);
    const loader = getByTestId('loader');

    // Verifica que las props se apliquen correctamente
    expect(loader.props.color).toBe('red');
    expect(loader.props.size).toBe('small');
  });

  it('should combine default styles with custom styles', () => {
    const customStyle = { margin: 50 };
    const { getByTestId } = render(<Loader style={customStyle} />);
    const loader = getByTestId('loader');

    expect(loader.props.style).toEqual(expect.arrayContaining([customStyle]));
  });

  it('matches snapshot', () => {
    const tree = render(<Loader />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('is accessible with proper accessibility labels', () => {
    const { getByTestId } = render(<Loader accessibilityLabel="Loading..." />);
    const loader = getByTestId('loader');

    // Verifica que el componente tenga un label de accesibilidad
    expect(loader.props.accessibilityLabel).toBe('Loading...');
  });

  it('should pass additional props to ActivityIndicator', () => {
    const customProps = { animating: false, hidesWhenStopped: true };
    const { getByTestId } = render(<Loader {...customProps} />);
    const loader = getByTestId('loader');

    // Verifica que las props adicionales se apliquen correctamente
    expect(loader.props.animating).toBe(false);
    expect(loader.props.hidesWhenStopped).toBe(true);
  });

  it('does not re-render when props do not change', () => {
    const { rerender, getByTestId } = render(<MemoizedLoader />);
    const initialRender = getByTestId('loader');

    // Re-renderiza el componente con las mismas props
    rerender(<MemoizedLoader />);
    const afterRerender = getByTestId('loader');

    // Verifica que el componente no haya cambiado
    expect(afterRerender).toBe(initialRender);
  });
});
