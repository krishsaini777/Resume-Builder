import { create } from 'zustand'
import { exportToPdf } from '@/services/exportService'
import { ExportError } from '@/types/export'
import type { ExportStatus } from '@/types/export'

type ExportState = {
  status: ExportStatus
  error: ExportError | null
}

type ExportActions = {
  startExport: (resumeId: string, resumeTitle: string) => Promise<void>
  reset: () => void
}

type ExportStore = ExportState & ExportActions

export const useExportStore = create<ExportStore>((set) => ({
  status: 'idle',
  error: null,

  startExport: async (resumeId, resumeTitle) => {
    set({ status: 'preparing', error: null })

    try {
      set({ status: 'rendering' })
      await exportToPdf(resumeTitle, resumeId)
      set({ status: 'done', error: null })
    } catch (err) {
      if (err instanceof ExportError) {
        set({ status: 'error', error: err })
      } else {
        set({
          status: 'error',
          error: new ExportError('UNKNOWN', 'An unexpected error occurred during export.'),
        })
      }
    }
  },

  reset: () => {
    set({ status: 'idle', error: null })
  },
}))

export const selectExportStatus = (s: ExportStore) => s.status
export const selectExportError = (s: ExportStore) => s.error
export const selectIsExporting = (s: ExportStore) =>
  s.status === 'preparing' || s.status === 'rendering' || s.status === 'generating'
