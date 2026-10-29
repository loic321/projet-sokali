#!/usr/bin/env bash
# Vérifie les prérequis de la fiche d'annonce. À lancer depuis frontend/ : bash verifier-fiche.sh
bad=0
need() { # fichier, motif, description
  if grep -qE "$2" "$1" 2>/dev/null; then echo "OK      $3"; else echo "A CORRIGER  $3  (dans $1)"; bad=$((bad+1)); fi
}
need src/api/client.ts "export (class|const|function|async function) ApiError|export class ApiError" "ApiError exporté"
need src/api/client.ts "export (const|function|async function) apiGet" "apiGet exporté"
need src/api/client.ts "export (const|function|async function) apiPost" "apiPost exporté"
need src/api/types.ts "ContactInfo" "type ContactInfo"
need src/lib/ui.ts "export const sheetClass" "sheetClass"
need src/lib/ui.ts "export const whatsappButtonClass" "whatsappButtonClass"
need src/lib/ui.ts "export const iconButtonClass" "iconButtonClass"
need src/lib/favorites.ts "useFavorites" "useFavorites"
need src/lib/toast.ts "export" "toast"
need src/components/ImagePlaceholder.tsx "ImagePlaceholder" "ImagePlaceholder"
need src/components/ListingRail.tsx "ignoreCity" "ListingRail accepte ignoreCity"
need src/components/ListingRail.tsx "excludeId" "ListingRail accepte excludeId"
echo "---- classes Tailwind collées (espace manquant) ----"
glue=$(grep -rnE "[0-9a-z\]\)\"']dark:(bg|border|text|divide)|[a-z0-9]outline-none|text-base[a-z]" src --include=*.tsx || true)
if [ -n "$glue" ]; then echo "$glue"; echo "A CORRIGER  ajoute l'espace manquant sur les lignes ci-dessus"; bad=$((bad+1)); else echo "aucune"; fi
echo "---- $bad point(s) à corriger ----"
exit $bad
