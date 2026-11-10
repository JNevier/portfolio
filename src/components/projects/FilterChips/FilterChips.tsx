type FilterOption = {
  id: string
  label: string
  /** How many projects this chip would show. */
  count: number
}

type FilterChipsProps = {
  options: FilterOption[]
  /** The id of the active chip. */
  value: string
  onChange: (id: string) => void
}

/*
  A row of toggle buttons ("chips"), one active at a time.
  Each chip is a real <button>, so it works with Tab, Enter and Space.
  aria-pressed tells screen readers which chip is currently on.
  Utilities only: no own CSS file is needed.
*/
export default function FilterChips({ options, value, onChange }: FilterChipsProps) {
  return (
    <div
      role="group"
      aria-label="Filter projects by type"
      className="flex flex-wrap gap-2"
    >
      {options.map((option) => {
        const active = option.id === value
        const look = active
          ? 'bg-brand-700 border-brand-700 text-on-brand'
          : 'border-line bg-surface hover:bg-surface-muted'
        // A chip with no projects stays clickable, with muted text.
        const empty = !active && option.count === 0 ? 'text-muted' : ''

        return (
          <button
            key={option.id}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option.id)}
            className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm font-medium ${look} ${empty}`}
          >
            {/* The space keeps the name readable ("Front-End 2"); flex gap does the spacing. */}
            {option.label}{' '}
            <span className={active ? '' : 'text-muted'}>{option.count}</span>
          </button>
        )
      })}
    </div>
  )
}
