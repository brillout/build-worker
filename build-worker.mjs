export { buildWorker }

import esbuild from 'esbuild'
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'

function buildWorker({ entry, out, debug, external } = {}) {
  return esbuild.build({
    plugins: [NodeModulesPolyfillPlugin()],
    platform: 'browser',
    conditions: ['worker', 'browser'],
    entryPoints: [entry],
    sourcemap: true,
    outfile: out,
    external,
    logLevel: 'warning',
    format: 'esm',
    target: 'es2020',
    bundle: true,
    minify: !debug,
    define: {
      IS_CLOUDFLARE_WORKER: 'true'
    }
  })
}
