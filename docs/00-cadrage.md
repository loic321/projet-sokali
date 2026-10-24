# Cadrage : AVA Market (nom de code : Sokali)

Version 0.1 · 24 octobre 2026 · Auteur : Christian Loïc · Statut : brouillon à valider

## 1. Le problème

Au Cameroun, une grande part des ventes entre particuliers passe par des
groupes WhatsApp et Facebook. Les annonces se perdent dans le fil, on ne peut
pas les rechercher ni les filtrer par catégorie, ville ou prix, et rien ne
permet de juger si un vendeur est fiable avant de le contacter.

*Hypothèse à valider : interroger 5 acheteurs ou vendeurs réels avant de
figer le périmètre.*

## 2. Les utilisateurs

- **Acheteur** : cherche un article près de chez lui, compare, contacte le vendeur.
- **Vendeur** : publie ses annonces, gère leur état, répond aux acheteurs.
- **Administrateur** : modère les annonces et les comptes signalés (version ultérieure).

## 3. La solution

AVA Market est une marketplace web de petites annonces qui permet aux
particuliers camerounais de publier, rechercher et contacter en quelques
minutes, depuis un téléphone, avec une connexion lente.

## 4. MVP : version 1

1. Inscription et connexion sécurisées.
2. Publier une annonce : titre, catégorie, prix en FCFA, description, état, ville, photos.
3. Parcourir, rechercher, filtrer (catégorie, ville, prix, état) et trier.
4. Fiche d'annonce avec profil du vendeur.
5. Contacter un vendeur par messagerie interne simple (sans temps réel).
6. Favoris.
7. Gérer ses annonces : modifier, marquer comme vendue, supprimer.

**Prévu après le MVP (v1.1)** : avis sur les vendeurs, signalement d'annonce,
espace administrateur, messagerie en temps réel.

## 5. Hors périmètre

- Paiement en ligne et Mobile Money.
- Livraison et suivi de colis.
- Application mobile native (le site reste responsive).
- Vérification d'identité des vendeurs.
- Publicité, annonces sponsorisées.
- Recommandations par intelligence artificielle.

## 6. Critères de réussite

**Produit**
- Un nouvel utilisateur crée un compte et publie une annonce avec photo en
  moins de 2 minutes (test chronométré avec 5 personnes).

**Technique**
- 100 % des routes de l'API décrites dans un contrat OpenAPI et couvertes par
  des tests automatisés.
- Audit OWASP Top 10:2025 documenté, sans faille critique non corrigée.
- Pipeline CI/CD : à chaque push, build, tests, scans de sécurité, puis déploiement.
- Application déployée publiquement, avec une URL et un README complet.

**Apprentissage**
- Je peux expliquer, sans notes, chaque route du backend et chaque choix
  d'architecture documenté dans un ADR.

## 7. Contraintes et risques

- **Temps** : environ 11 h par semaine, développement en solo.
- **Budget** : zéro, offres gratuites uniquement.
- **Risque principal** : dérive du périmètre. Toute nouvelle fonctionnalité
  passe par ce document avant d'être codée.
- **Risque secondaire** : hypothèses de marché non validées auprès d'utilisateurs réels.
