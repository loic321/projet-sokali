import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'

// Fenêtre native <dialog> : piège de focus, touche Échap et fond assombri fournis par le navigateur.
export function Dialog({
  open,
  onClose,
  label,
  className,
  children,
}: {
  open: boolean
  onClose: () => void
  label: string
  className?: string
  children: ReactNode
}) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      aria-label={label}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose()
      }}
      className={className}
    >
      {open ? children : null}
    </dialog>
  )
}
