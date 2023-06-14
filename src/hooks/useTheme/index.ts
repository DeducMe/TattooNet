import {useEffect, useState} from 'react';
import {Appearance} from 'react-native';
import {Dimensions} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {colors as constColors, fontSizes, breakpoint} from '../../common/theme';

const space = {
  xxxs: 2,
  xxs: 4,
  xs: 8,
  s: 12,
  m: 16,
  l: 20,
  xl: 24,
  xxl: 28,
  xxxl: 32,
  xxxxl: 36,
};

const fontWeights: {
  light: '200';
  normal: '400';
  bold: '600';
  extraBold: '800';
} = {
  light: '200',
  normal: '400',
  bold: '600',
  extraBold: '800',
};
const height = {
  xxxs: 8,
  xxs: 16,
  xs: 24,
  s: 32,
  m: 64,
  l: 128,
  xl: 192,
  xxl: 256,
  xxxl: 512,
  xxxxl: 1024,
};
const width = {
  xxxs: 8,
  xxs: 16,
  xs: 24,
  s: 32,
  m: 64,
  l: 128,
  xl: 192,
  xxl: 256,
  xxxl: 512,
  xxxxl: 1024,
};

const defaultShadow = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,

  elevation: 5,
};

const common = {
  tabNavigationHeight: 60,
};

export const useTheme = () => {
  const insets = useSafeAreaInsets();

  const [colorScheme, setColorScheme] = useState(
    Appearance.getColorScheme() || 'light',
  );

  useEffect(() => {
    Appearance.addChangeListener(e => setColorScheme(e.colorScheme || 'light'));
  }, []);

  const colors = constColors(colorScheme);

  return {
    colors,
    space,
    fontSizes,
    fontWeights,
    width,
    height,
    defaultShadow,
    breakpoint,
    dimensions: Dimensions.get('screen'),
    insets,
    common,
  };
};

export default useTheme;
