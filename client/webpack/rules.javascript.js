// eslint-disable-next-line no-unused-vars
module.exports = (params) => {
  const rules = [];


  rules.push({
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
      },
    },
  });

  return rules;
};
