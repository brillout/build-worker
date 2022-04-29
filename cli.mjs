#!/usr/bin/env node

import { buildWorker } from './build-worker.mjs'

build()

async function build() {
  const { entry, out } = getArgs()
  try {
    await buildWorker({ entry, out })
    console.log('[build-worker] Worker built successfully.')
  } catch (err) {
    console.error('[build-worker] Worker build failed.', err)
  }
}

function getArgs() {
  let entry
  let out

  const args = process.argv.filter(Boolean)
  let state = null
  for (const arg of args) {
    if (arg === '--entry') {
      state = 'ENTRY'
      continue;
    }
    if (arg === '--out') {
      state = 'OUT'
      continue;
    }
    if (state === 'ENTRY') {
      entry = arg
      state = null
    }
    if (state === 'OUT') {
      out = arg
      state = null
    }
  }

  if (!entry) {
    throw new Error('[build-worker] CLI argument --entry missing.')
  }
  if (!out) {
    throw new Error('[build-worker] CLI argument --out missing.')
  }

  return { entry, out }
}