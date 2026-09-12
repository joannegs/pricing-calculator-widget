import type { PriceBreakdown as PriceBreakdownData } from '../../types/pricing.types'
import { formatCurrency } from '../../utils/formatCurrency'

interface PriceBreakdownProps {
  breakdown: PriceBreakdownData
}

export function PriceBreakdown({ breakdown }: PriceBreakdownProps) {
  return (
    <dl className="space-y-2 text-sm">
      {breakdown.lineItems.map((item) => (
        <div key={item.label} className="flex justify-between text-slate-600">
          <dt>{item.label}</dt>
          <dd>{formatCurrency(item.amount)}</dd>
        </div>
      ))}
      {breakdown.timelineModifierAmount !== 0 && (
        <div className="flex justify-between text-slate-600">
          <dt>Timeline adjustment</dt>
          <dd>
            {breakdown.timelineModifierAmount > 0 ? '+' : ''}
            {formatCurrency(breakdown.timelineModifierAmount)}
          </dd>
        </div>
      )}
    </dl>
  )
}
