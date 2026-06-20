import type { ExportMargin } from '@/types/export'

const A4_MM = { width: 210, height: 297 } as const
const DEFAULT_MARGIN: ExportMargin = [8, 8, 8, 8]
const DEFAULT_SCALE = 2

type JsPdfOptions = {
  unit: string
  format: string
  orientation: string
  compress: boolean
}

type Html2CanvasOptions = {
  scale: number
  useCORS: boolean
  logging: boolean
  backgroundColor: string
  imageTimeout: number
  removeContainer: boolean
}

type PageBreakOptions = {
  mode: string[]
  before: string
  avoid: string
}

export type Html2PdfOptions = {
  filename: string
  margin: ExportMargin
  image: { type: string; quality: number }
  jsPDF: JsPdfOptions
  html2canvas: Html2CanvasOptions
  pagebreak: PageBreakOptions
}

export const PDF_DIMENSIONS = A4_MM

export function buildPdfOptions(filename: string, scale = DEFAULT_SCALE): Html2PdfOptions {
  return {
    filename,
    margin: DEFAULT_MARGIN,
    image: { type: 'jpeg', quality: 0.98 },
    jsPDF: {
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait',
      compress: true,
    },
    html2canvas: {
      scale,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      imageTimeout: 15000,
      removeContainer: true,
    },
    pagebreak: {
      mode: ['css', 'legacy'],
      before: '.pdf-page-break-before',
      avoid: '.pdf-page-break-avoid',
    },
  }
}
