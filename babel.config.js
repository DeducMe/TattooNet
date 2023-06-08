module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./source'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          containers: './source/containers',
          hooks: './source/hooks',
          components: './source/components',
          screens: './source/screens',
          theme: './source/common/theme',
          types: './source/types',
          utils: './source/utils',
          navigators: './source/navigators',
          providers: './source/providers',
          translations: './source/translations',
        },
      },
    ],
  ],
};
