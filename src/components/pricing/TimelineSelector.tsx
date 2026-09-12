import { RadioCard } from '../ui/RadioCard'
import type { TimelineId, TimelineOption } from '../../types/pricing.types'

interface TimelineSelectorProps {
  options: TimelineOption[]
  selectedId: TimelineId
  onSelect: (id: TimelineId) => void
}

export function TimelineSelector({ options, selectedId, onSelect }: TimelineSelectorProps) {
  return (
    <fieldset>
      <legend className="mb-3 text-sm font-semibold text-slate-900">Timeline</legend>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {options.map((option) => (
          <RadioCard
            key={option.id}
            name="timeline"
            value={option.id}
            checked={option.id === selectedId}
            onChange={(value) => onSelect(value as TimelineId)}
            title={option.label}
            description={option.description}
          />
        ))}
      </div>
    </fieldset>
  )
}
