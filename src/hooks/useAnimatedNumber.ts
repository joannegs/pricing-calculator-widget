import { useEffect, useRef, useState } from 'react'

const ANIMATION_DURATION_MS = 400

export function useAnimatedNumber(targetValue: number): number {
  const [displayValue, setDisplayValue] = useState(targetValue)
  const frameRef = useRef<number>(0)

  useEffect(() => {
    const startValue = displayValue
    const delta = targetValue - startValue
    if (delta === 0) return

    const startTime = performance.now()

    function tick(now: number) {
      const progress = Math.min((now - startTime) / ANIMATION_DURATION_MS, 1)
      setDisplayValue(Math.round(startValue + delta * progress))
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick)
      }
    }

    frameRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameRef.current)
  }, [targetValue])

  return displayValue
}
