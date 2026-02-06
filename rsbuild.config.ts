import { defineConfig } from '@rsbuild/core';
import { pluginBabel } from '@rsbuild/plugin-babel';
import { pluginSolid } from '@rsbuild/plugin-solid';

export default defineConfig({
   plugins: [
      pluginBabel({
         include: /\.(?:jsx|tsx)$/,
      }),
      pluginSolid(),
   ],
   output: {
      distPath: {
         root: './docs',
         js: './',
         css: './'
      },
      assetPrefix: './',
      cleanDistPath: true,
   },
   html: {
      template: './src/index.html'
   }
});
