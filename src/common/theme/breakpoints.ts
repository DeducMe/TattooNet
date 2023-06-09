import {
  Dimensions,
  ImageStyle,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';
const { width: WIDTH } = Dimensions.get('window');

// this one if for responsive layouts
const breakpoints = {
  default: 0,
  xs: 410,
  sm: 411,
  md: 568,
  lg: 768,
  xl: 1024,
  xxl: 1280,
};

const breakpointsArray = Object.values(breakpoints);
// [410, 411, 568, 768, 1024, 1280];
// xs	<= 410 pt	phones
// sm	>= 411 pt	large phones
// md	>= 568 pt	phones - landscape
// lg	>= 768 pt	tablets
// xl	>= 1024 pt	tablets - landscape, large tablets
// xxl	>= 1280 pt	large tablets - landscape

// export const breakPoint = (payload: typeof breakpoints) => {
//   // filter to get just bigger () values => [411,568, ....]
//   const possiblePoints = breakpointsArray.filter(
//     (breakpoint) => breakpoint >= WIDTH,
//   );
//   const indexOfScreenKey = Object.values(breakpoints).indexOf(
//     possiblePoints[0],
//   );

//   const defaultSmall = payload.xs || payload.sm;
//   const defaultMedium = payload.sm || payload.md;
//   const defaultLarge = payload.lg || payload.xl || payload.xxl;

//   const key = Object.keys(breakpoints)[indexOfScreenKey];

//   return key ? payload[key] : undefined;
// };

export const isSmall = WIDTH < 410;
export const isMedium = WIDTH >= 411 && WIDTH < 568;
export const isLarge = WIDTH >= 768;

type TT = {
  small?: ViewStyle | TextStyle | ImageStyle;
  medium?: ViewStyle | TextStyle | ImageStyle;
  large?: ViewStyle | TextStyle | ImageStyle;
  default?: ViewStyle | TextStyle | ImageStyle;
};

export const breakpoint = (values: StyleSheet.NamedStyles<TT>) => {
  if (isSmall && values.small) {
    return { ...values.default, ...values.small };
  }

  if (isMedium && values.medium) {
    return { ...values.default, ...values.medium };
  }

  if (isLarge && values.large) {
    return { ...values.default, ...values.large };
  }

  return values.default || {};
};
