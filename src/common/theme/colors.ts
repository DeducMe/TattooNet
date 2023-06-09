import {Appearance} from 'react-native';
import {DEFAULT_THEME} from './constants';
const colors = (theme: 'light' | 'dark') => ({
  // 	Primary
  primary: {
    light: '#0052D4',
    dark: '#0052D4',
  }[theme],

  textColor: {
    light: '#000000',
    dark: '#fff',
  }[theme],

  // Secondary
  secondary: {
    light: '#bdc3c7',
    dark: '#aa647b',
  }[theme],

  // Error
  error: {
    light: '#dc3545',
    dark: '#d32f2f',
  }[theme],

  // Warning
  warning: {
    light: '#ffb74d',
    dark: '#f57c00',
  }[theme],

  // Info
  info: {
    light: '#64b5f6',
    dark: '#1976d2',
  }[theme],

  // Success
  success: {
    light: '#2ecc71',
    dark: '#388e3c',
  }[theme],

  // Background
  background: {
    light: '#f2F4f5',
    dark: '#323232',
  }[theme],

  backgroundDarker: {
    light: '#d9dbdb',
    dark: '#212121',
  }[theme],

  contrast: {
    light: '#666666',
    dark: '#acc1ce',
  }[theme],

  activeTintColor: {
    light: '#0052D4',
    dark: '#f0f6fc',
  }[theme],

  inactiveTintColor: {
    light: '#d0d0d0',
    dark: '#f0f6fc',
  }[theme],
});

/**
 * https://material-ui.com/customization/palette/
 */
export {colors};
