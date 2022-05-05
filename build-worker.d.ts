export { buildWorker }

declare function buildWorker(options: {
  entry: string
  out: string
  debug?: boolean
  external?: string[]
}): Promise<undefined>
