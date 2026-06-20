import { useCallback, useEffect, useRef } from 'react'
import {
  useExportStore,
  selectExportStatus,
  selectExportError,
  selectIsExporting,
} from '@/store/exportStore'
import { toast } from '@/store/toastStore'

export function useExport(resumeId: string, resumeTitle: string) {
  const status = useExportStore(selectExportStatus)
  const error = useExportStore(selectExportError)
  const isExporting = useExportStore(selectIsExporting)
  const startExport = useExportStore(s => s.startExport)
  const reset = useExportStore(s => s.reset)

  const prevStatus = useRef(status)

  useEffect(() => {
    if (prevStatus.current === status) return
    prevStatus.current = status

    if (status === 'done') {
      toast.success('Resume exported successfully')
      reset()
    }

    if (status === 'error' && error) {
      toast.error(error.message)
      reset()
    }
  }, [status, error, reset])

  const exportResume = useCallback(() => {
    if (isExporting) return
    void startExport(resumeId, resumeTitle)
  }, [isExporting, startExport, resumeId, resumeTitle])

  return {
    exportResume,
    status,
    isExporting,
    error,
  }
}
