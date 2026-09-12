import { useState } from 'react'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { useAnimatedNumber } from '../../hooks/useAnimatedNumber'
import type { PriceBreakdown as PriceBreakdownData } from '../../types/pricing.types'
import { formatCurrency } from '../../utils/formatCurrency'
import { PriceBreakdown } from './PriceBreakdown'

interface PriceSummaryProps {
  breakdown: PriceBreakdownData
  onReset: () => void
}

export function PriceSummary({ breakdown, onReset }: PriceSummaryProps) {
  const [requested, setRequested] = useState(false)
  const animatedTotal = useAnimatedNumber(breakdown.total)

  return (
    <Card className="sticky top-6 space-y-5">
      <div>
        <p className="text-sm text-slate-500">Estimated total</p>
        <p className="text-4xl font-semibold tracking-tight text-slate-900" aria-live="polite">
          {formatCurrency(animatedTotal)}
        </p>
        <p className="mt-1 text-xs text-slate-500">
          ~{breakdown.estimatedHours}h estimated
        </p>
      </div>

      <PriceBreakdown breakdown={breakdown} />

      <div className="flex justify-between border-t border-slate-200 pt-3 text-sm font-semibold text-slate-900">
        <span>Total</span>
        <span>{formatCurrency(breakdown.total)}</span>
      </div>

      {requested ? (
        <p className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700" role="status">
          Estimate sent!
        </p>
      ) : (
        <Button className="w-full" onClick={() => setRequested(true)}>
          Request this estimate
        </Button>
      )}

      <Button variant="ghost" className="w-full" onClick={() => {
        setRequested(false)
        onReset()
      }}>
        Start over
      </Button>
    </Card>
  )
}
