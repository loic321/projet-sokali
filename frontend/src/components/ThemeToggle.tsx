import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../lib/theme'
import { iconButtonClass } from '../lib/ui'

export function ThemeToggle() {
  const { dark, toggle } = useTheme()
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? 'Activer le mode clair' : 'Activer le mode sombre'}
      className={iconButtonClass}
    >
      {dark ? <Sun className="size-5" aria-hidden="true" /> : <Moon className="size-5" aria-hidden="true" />}
    </button>
  )
}
