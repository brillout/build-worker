export { buildWorker }

import esbuild from 'esbuild'
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'

function buildWorker({ entry, out }) {
  return esbuild.build({
    plugins: [NodeModulesPolyfillPlugin()],
    platform: 'browser',
    conditions: ['node'],
    entryPoints: [entry],
    sourcemap: true,
    outfile: out,
    logLevel: 'warning',
    format: 'esm',
    target: 'es2020',
    bundle: true
  })
}