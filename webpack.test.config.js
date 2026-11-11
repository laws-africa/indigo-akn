module.exports = {
  mode: 'development',
  resolve: {
    // The WASM dependency also contains Node-only paths.
    fallback: { fs: false, crypto: false },
    modules: ["node_modules", './'],
    extensions: [".js"]
  }
};
