# `build-worker`

Bundle your Cloudflare Worker with [esbuild](https://esbuild.github.io/) instead of [webpack](https://webpack.js.org/). (It's ridiculously faster!)

[Wrangler v1](https://github.com/cloudflare/wrangler) uses webpack.
<br/>
[Wrangler v2](https://github.com/cloudflare/wrangler2) is [using esbuild](https://github.com/cloudflare/wrangler/issues/2158#issuecomment-995914059).

Problem: Wrangler 2 is [not production-ready](https://github.com/cloudflare/wrangler2#readme).
<br/>
Solution: `build-worker`.

## Usage

1. Install.
   ```
   npm install build-worker
   ```
2. Add a `package.json` script.
   ```json5
   // package.json
   {
     scripts: {
       'build:worker': 'build-worker --entry worker.js --out dist/worker.js --debug'
     }
   }
   ```
   > The `--debug` flag disables minification, making debugging much easier.
3. Run your script.
   ```shell
   npm run build:worker
   ```

It can also be used programmatically:

```js
import { buildWorker } from 'build-worker'
await buildWorker({ entry: 'worker.js' , out: 'dist/worker.js', debug: false })
```

## `IS_CLOUDFLARE_WORKER`

`build-worker` replaces any occurrences of `IS_CLOUDFLARE_WORKER` with `true`, which your code can use to determine whether its being run in a Cloudflare Worker:

```js
if (IS_CLOUDFLARE_WORKER !== 'undefined' && IS_CLOUDFLARE_WORKER === true) {
  // Do something that should only happen in Cloudflare Workers
} else {
  // Do something that should not happen in Cloudflare Workers
}
```

## How it works

`build-worker` uses the same esbuild configuration than Wrangler 2.

See https://github.com/evanw/esbuild/issues/1189.
