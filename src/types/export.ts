export type ExportStatus = 'idle' | 'preparing' | 'rendering' | 'generating' | 'done' | 'error'

export type ExportErrorCode =
  | 'TIMEOUT'
  | 'DOM_MISSING'
  | 'LIB_LOAD_FAIL'
  | 'UNKNOWN'

export class ExportError extends Error {
  readonly code: ExportErrorCode

  constructor(code: ExportErrorCode, message: string) {
    super(message)
    this.code = code
    this.name = 'ExportError'
  }
}

export type ExportMargin = [number, number, number, number]

export type ExportConfig = {
  filename: string
  quality: number
  scale: number
  margin: ExportMargin
}
