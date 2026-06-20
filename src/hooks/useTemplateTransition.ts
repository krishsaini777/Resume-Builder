import { useState, useEffect, useRef } from 'react'

type TransitionState = 'idle' | 'leaving' | 'entering'

export function useTemplateTransition(templateId: string) {
  const [transitionState, setTransitionState] = useState<TransitionState>('idle')
  const [displayedTemplateId, setDisplayedTemplateId] = useState(templateId)
  const lastTemplateId = useRef<string>(templateId)
  const timer1 = useRef<ReturnType<typeof setTimeout> | null>(null)
  const timer2 = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (templateId === lastTemplateId.current) return
    lastTemplateId.current = templateId

    if (timer1.current) clearTimeout(timer1.current)
    if (timer2.current) clearTimeout(timer2.current)

    setTransitionState('leaving')

    timer1.current = setTimeout(() => {
      setDisplayedTemplateId(templateId)
      setTransitionState('entering')

      timer2.current = setTimeout(() => {
        setTransitionState('idle')
      }, 250)
    }, 180)

    return () => {
      if (timer1.current) clearTimeout(timer1.current)
      if (timer2.current) clearTimeout(timer2.current)
    }
  }, [templateId])

  return {
    displayedTemplateId,
    transitionState,
    isSwitching: transitionState !== 'idle',
  }
}
