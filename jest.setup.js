import { TextEncoder, TextDecoder } from 'util';
import { jest } from '@jest/globals';
import 'jest-react-native';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock para StyleSheet
jest.mock('react-native/Libraries/StyleSheet/StyleSheet', () => ({
  create: jest.fn(() => ({})),
  flatten: jest.fn((style) => style),
}));

// Mock para Dimensions
jest.mock('react-native/Libraries/Utilities/Dimensions', () => ({
  get: jest.fn().mockReturnValue({ width: 100, height: 100 }),
}));


// Mock para Platform
jest.mock('react-native/Libraries/Utilities/Platform', () => ({
  OS: 'ios', // Puedes cambiar esto a 'android' si es necesario
  select: jest.fn((obj) => obj.ios || obj.default),
}));


// Mock para FlatList
jest.mock('react-native/Libraries/Lists/FlatList', () => {
  const { View } = require('react-native');
  const MockFlatList = (props) => {
    return (
      <View testID="flat-list">
        {props.data.map((item, index) => (
          <View key={index} testID={`flat-list-item-${index}`}>
            {props.renderItem({ item, index })}
          </View>
        ))}
      </View>
    );
  };
  return MockFlatList;
});

// Mock para EventEmitter
jest.mock('react-native/Libraries/vendor/emitter/EventEmitter', () => ({
  default: jest.fn(() => ({
    addListener: jest.fn(),
    removeListener: jest.fn(),
    emit: jest.fn(),
  })),
}));

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter', () => {
  const { EventEmitter } = require('events');
  return class MockNativeEventEmitter extends EventEmitter {
    constructor() {
      super();
    }
  };
});
