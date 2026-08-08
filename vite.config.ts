import { defineConfig, UserConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';
import babel from '@rolldown/plugin-babel';
import generateScopedName from 'mini-css-class-name/postcss-modules';

export default defineConfig(({ mode }): UserConfig => {
  const isProd = mode === 'production';
  const isDev = mode === 'development';

  return {
    root: 'src',
    base: '/audio-player/',
    server: { open: true },
    build: {
      outDir: '../dist',
      assetsDir: '.',
      emptyOutDir: true,
      target: 'esnext',
      cssCodeSplit: false,
      minify: isProd ? 'terser' : false,
      terserOptions: {
        ecma: 2025,
        module: true,
        toplevel: true,
        sourceMap: false,
        compress: {
          ecma: 2025,
          module: true,
          comparisons: false,
          inline: 2,
          drop_console: true,
          passes: 3,
          toplevel: true,
          pure_getters: true,
          unsafe: true,
          unsafe_arrows: true,
          unsafe_symbols: true,
        },
      },
      sourcemap: isDev,
      modulePreload: false,
      reportCompressedSize: true,
      rolldownOptions: {
        treeshake: false,
      },
    },
    css: {
      modules: {
        generateScopedName: isProd
          ? generateScopedName()
          : '[name]__[local]___[hash:base64:5]',
      },
    },
    oxc: {
      jsx: 'preserve',
      target: 'esnext',
    },
    plugins: [
      babel({
        include: /\.tsx$/,
        comments: isDev,
        sourceMap: isDev,
        presets: ['jsx-dom-runtime/babel-preset'],
      }),
      viteSingleFile(),
    ],
  };
});
