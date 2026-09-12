interface SliderProps {
  id: string
  label: string
  min: number
  max: number
  value: number
  onChange: (value: number) => void
  valueLabel: string
}

export function Slider({ id, label, min, max, value, onChange, valueLabel }: SliderProps) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between">
        <label htmlFor={id} className="text-sm font-medium text-slate-900">
          {label}
        </label>
        <span className="text-sm font-semibold text-brand">{valueLabel}</span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      />
    </div>
  )
}
