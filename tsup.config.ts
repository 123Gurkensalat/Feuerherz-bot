import type { Options } from 'tsup'
import * as glob from 'glob'

const entries = ['src\\index.ts'];
entries.push(...glob.sync('**/src/commands/*/*.ts'));
entries.push(...glob.sync('**/src/events/**/.ts'));
entries.push(...glob.sync('**/src/handlers/*.ts'));
entries.push(...glob.sync('**/src/modalSubmits/*/*.ts'));
entries.push(...glob.sync('**/src/utils/*.ts'));

console.log(entries);

const config: Options = {
  entry: entries,
  dts: true,
  sourcemap: true,
  minify: true,
  outDir: 'dist'
}

export default config;