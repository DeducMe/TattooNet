module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src/'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          containers: './src/containers',
          hooks: './src/hooks',
          components: './src/components',
          screens: './src/screens',
          theme: './src/common/theme',
          types: './src/types',
          utils: './src/utils',
          navigators: './src/navigators',
          providers: './src/providers',
          translations: './src/translations',
        },
      },
    ],
  ],
  sourceMaps: true,
};
