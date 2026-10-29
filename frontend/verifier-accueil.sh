#!/usr/bin/env bash
# À lancer depuis le dossier frontend/ : vérifie que l'étape 2 (accueil) est bien en place.
set -u
ok=0; bad=0
check() { if grep -q "$2" "$1" 2>/dev/null; then echo "OK      $1"; ok=$((ok+1)); else echo "MANQUE  $1  (attendu : $2)"; bad=$((bad+1)); fi; }
check src/components/BottomNav.tsx "rounded-3xl"
check src/components/BottomNav.tsx "grid-cols-5"
check src/components/Header.tsx "CategoryBar"
check src/components/CategoryBar.tsx "aria-current"
check src/components/CitySelector.tsx "Autour de moi"
check src/lib/geo.ts "MAX_DISTANCE_KM"
check src/components/ListingCard.tsx "aspect-4/3"
check src/components/Rail.tsx "ArrowRight"
check src/components/ListingRail.tsx "useCity"
check src/pages/HomePage.tsx "Suggestions de recherche"
check src/components/Toaster.tsx "bottom-28"
echo "---- conflits possibles : classe d'aide + 'hidden' ----"
grep -rnE '\$\{(iconButtonClass|ghostButtonClass|primaryButtonClass|glassButtonClass|pillClass\([^)]*\))\}[^`]*[ "`]hidden[ "`]' src || echo "aucun conflit"
echo "---- $ok fichiers OK, $bad à corriger ----"
