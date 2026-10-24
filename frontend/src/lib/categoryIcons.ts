import { Building2, Car, Gamepad2, Package, Shirt, Smartphone, Sofa, Wrench } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export const categoryIcons: Record<string, LucideIcon> = {
  electronique: Smartphone,
  vehicules: Car,
  immobilier: Building2,
  mode: Shirt,
  maison: Sofa,
  services: Wrench,
  loisirs: Gamepad2,
}

export const fallbackCategoryIcon: LucideIcon = Package
