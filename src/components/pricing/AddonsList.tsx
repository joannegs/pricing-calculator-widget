import { Checkbox } from '../ui/Checkbox'
import type { Addon, AddonId } from '../../types/pricing.types'
import { formatCurrency } from '../../utils/formatCurrency'

interface AddonsListProps {
  addons: Addon[]
  selectedIds: AddonId[]
  onToggle: (id: AddonId) => void
}

export function AddonsList({ addons, selectedIds, onToggle }: AddonsListProps) {
  return (
    <fieldset>
      <legend className="mb-3 text-sm font-semibold text-slate-900">Add-ons</legend>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {addons.map((addon) => (
          <Checkbox
            key={addon.id}
            id={`addon-${addon.id}`}
            checked={selectedIds.includes(addon.id)}
            onChange={() => onToggle(addon.id)}
            label={addon.label}
            description={addon.description}
            trailing={`+${formatCurrency(addon.price)}`}
          />
        ))}
      </div>
    </fieldset>
  )
}
