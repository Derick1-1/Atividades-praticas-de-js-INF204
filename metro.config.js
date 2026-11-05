const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Adiciona suporte para arquivos WebAssembly (.wasm)
config.resolver.assetExts.push('wasm');

module.exports = config;