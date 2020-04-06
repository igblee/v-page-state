const path = require('path')
import { terser } from 'rollup-plugin-terser';
export default {
  external: ['vue', 'vuex', 'lodash'],
  input: {
    'main':  path.resolve(__dirname, 'src', 'index.js'),
  },
  output: {
    format: 'iife',
    dir: path.resolve(__dirname, 'dist'),
    name: "vPageState",
    plugins: [terser()],
    globals: {
      vue: 'Vue',
      vuex: 'Vuex',
      lodash: 'lodash',
    }
  },
  watch: {
    clearScreen: true,
    include: ['src/**']
  }
};