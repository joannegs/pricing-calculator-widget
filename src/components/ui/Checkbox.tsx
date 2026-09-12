interface CheckboxProps {
  id: string
  checked: boolean
  onChange: (checked: boolean) => void
  label: string
  description?: string
  trailing?: string
}

export function Checkbox({
  id,
  checked,
  onChange,
  label,
  description,
  trailing,
}: CheckboxProps) {
  return (
    <label
      htmlFor={id}
      className={`flex cursor-pointer items-start justify-between gap-3 rounded-xl border-2 p-4 transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand ${
        checked
          ? 'border-brand bg-brand/10'
          : 'border-slate-200 bg-white hover:border-slate-300'
      }`}
    >
      <span className="flex items-start gap-3">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          className="sr-only"
        />
        <span
          aria-hidden="true"
          className={`mt-0.5 flex size-4 shrink-0 items-center justify-center rounded border-2 ${
            checked ? 'border-brand bg-brand' : 'border-slate-300 bg-white'
          }`}
        >
          {checked && (
            <svg viewBox="0 0 12 12" className="size-3 fill-none stroke-white stroke-2">
              <path d="M2.5 6.5L4.5 8.5L9.5 3.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </span>
        <span>
          <span className="block text-sm font-medium text-slate-900">{label}</span>
          {description && (
            <span className="block text-xs text-slate-500">{description}</span>
          )}
        </span>
      </span>
      {trailing && (
        <span className="shrink-0 text-sm font-medium text-slate-600">{trailing}</span>
      )}
    </label>
  )
}
