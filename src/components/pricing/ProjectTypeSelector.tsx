import { RadioCard } from '../ui/RadioCard'
import type { ProjectType, ProjectTypeId } from '../../types/pricing.types'
import { formatCurrency } from '../../utils/formatCurrency'

interface ProjectTypeSelectorProps {
  projectTypes: ProjectType[]
  selectedId: ProjectTypeId
  onSelect: (id: ProjectTypeId) => void
}

export function ProjectTypeSelector({
  projectTypes,
  selectedId,
  onSelect,
}: ProjectTypeSelectorProps) {
  return (
    <fieldset>
      <legend className="mb-3 text-sm font-semibold text-slate-900">
        What are you building?
      </legend>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {projectTypes.map((type) => (
          <RadioCard
            key={type.id}
            name="project-type"
            value={type.id}
            checked={type.id === selectedId}
            onChange={(value) => onSelect(value as ProjectTypeId)}
            title={type.label}
            description={`${type.description} From ${formatCurrency(type.basePrice)}.`}
          />
        ))}
      </div>
    </fieldset>
  )
}
