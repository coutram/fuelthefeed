import MiniCssExtractPlugin from 'mini-css-extract-plugin';

module.exports = {
  // ...other config...
  plugins: [
    // ...other plugins...
    new MiniCssExtractPlugin(),
  ],
  module: {
    rules: [
      // ...other rules...
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
};
