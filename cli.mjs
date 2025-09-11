#!/usr/bin/env node

import { buildWorker } from './build-worker.mjs'

build()

async function build() {
  const { entry, out, debug, external } = getArgs()
  try {
    await buildWorker({ entry, out, debug, external })
    console.log('[build-worker] Worker built successfully.')
  } catch (err) {
    console.error('[build-worker] Failed to build worker.', err)
  }
}

function getArgs() {
  let entry
  let external = []
  let out
  let debug = false

  const args = process.argv.filter(Boolean)
  let state = null
  for (const arg of args) {
    if (arg === '--debug') {
      debug = true
      continue;
    }
    if (arg === '--entry') {
      state = 'ENTRY'
      continue;
    }
    if (arg === '--external') {
      state = 'EXTERNAL'
      continue;
    }
    if (arg === '--out') {
      state = 'OUT'
      continue;
    }
    if (state === 'ENTRY') {
      entry = arg
      state = null
      continue
    }
    if (state === 'EXTERNAL') {
      external.push(arg)
      /* Allow multiple values
      state = null
      */
      continue
    }
    if (state === 'OUT') {
      out = arg
      state = null
      continue
    }
    throw new Error('[build-worker] Wrong CLI usage')
  }

  if (!entry) {
    throw new Error('[build-worker] CLI argument --entry missing.')
  }
  if (!out) {
    throw new Error('[build-worker] CLI argument --out missing.')
  }

  return { entry, out, debug }
}
