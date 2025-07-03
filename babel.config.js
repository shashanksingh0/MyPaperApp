module.exports = {
  presets: ['module:@react-native/babel-preset'],
   plugins: [
    'react-native-reanimated/plugin', // 👈 MUST be the LAST in this list!
  ],
};
