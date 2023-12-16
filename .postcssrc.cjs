module.exports = {
  modules: true,
  plugins: {
    'postcss-modules': {
      generateScopedName: process.env.NODE_ENV === 'development'
        ? '[folder]_[local]_[hash:base64:5]'
        : '_[hash:base64:5]',
    },
  },
};
