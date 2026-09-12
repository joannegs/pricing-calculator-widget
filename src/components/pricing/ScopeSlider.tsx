import { Slider } from '../ui/Slider'
import type { ProjectType } from '../../types/pricing.types'

interface ScopeSliderProps {
  projectType: ProjectType
  value: number
  onChange: (value: number) => void
}

export function ScopeSlider({ projectType, value, onChange }: ScopeSliderProps) {
  return (
    <Slider
      id="scope-units"
      label={projectType.scopeUnitLabel}
      min={projectType.scopeMin}
      max={projectType.scopeMax}
      value={value}
      onChange={onChange}
      valueLabel={`${value}`}
    />
  )
}
