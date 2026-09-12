interface RadioCardProps {
  name: string
  value: string
  checked: boolean
  onChange: (value: string) => void
  title: string
  description: string
}

/**
 * Wraps a native radio input so screen readers and keyboard arrow-key
 * navigation get real radiogroup semantics for free, while the visual
 * card is just a styled label around it.
 */
export function RadioCard({
  name,
  value,
  checked,
  onChange,
  title,
  description,
}: RadioCardProps) {
  return (
    <label
      className={`flex cursor-pointer flex-col gap-1 rounded-xl border-2 p-4 transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand ${
        checked
          ? 'border-brand bg-brand/10'
          : 'border-slate-200 bg-white hover:border-slate-300'
      }`}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="sr-only"
      />
      <span className="text-sm font-semibold text-slate-900">{title}</span>
      <span className="text-xs text-slate-500">{description}</span>
    </label>
  )
}
