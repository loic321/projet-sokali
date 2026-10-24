import { brand } from '../config/brand'

// Logo provisoire : pastille orange + "A". À remplacer par un vrai travail de design.
export function Logo() {
  return (
    <span className="inline-flex items-center gap-2 font-display font-extrabold tracking-tight">
      <svg viewBox="0 0 32 32" className="size-8" aria-hidden="true">
        <rect width="32" height="32" rx="9" className="fill-brand-500" />
        <path
          d="M9 23 16 8l7 15M12 18.5h8"
          fill="none"
          stroke="#0f172a"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="text-xl leading-none">
        {brand.parts[0]} <span className="text-brand-700 dark:text-brand-500">{brand.parts[1]}</span>
      </span>
    </span>
  )
}
