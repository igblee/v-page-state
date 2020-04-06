const path = require('path')
import { terser } from 'rollup-plugin-terser';
export default {
  external: ['vue', 'vuex', 'lodash'],
  input: {
    'main':  path.resolve(__dirname, 'src', 'index.js'),
  },
  output: {
    format: 'es',
    dir: path.resolve(__dirname, 'dist'),
    name: "vPageState",
    plugins: [terser()],
  },
  watch: {
    clearScreen: true,
    include: ['src/**']
  }
};