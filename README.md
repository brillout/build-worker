# `build-worker`

Bundle your Cloudflare Worker with [esbuild](https://esbuild.github.io/) instead of [webpack](https://webpack.js.org/). (It's ridiculously faster!)

[Wrangler v1](https://github.com/cloudflare/wrangler) uses webpack.
<br/>
[Wrangler v2](https://github.com/cloudflare/wrangler2) is [using esbuild](https://github.com/cloudflare/wrangler/issues/2158#issuecomment-995914059).

Problem: Wrangler 2 is [not production-ready](https://github.com/cloudflare/wrangler2#readme).
<br/>
Solution: `build-worker`.

Usage:
  1. Install.
     ```
     npm install build-worker
     ```
  2. Add a `package.json` script.
     ```json5
     // package.json
     {
       "scripts": {
         "build:worker": "build-worker --entry worker.js --out dist/worker.js"
       }
     }
     ```
  3. Run your script.
     ```shell
     npm run build:worker
     ```
