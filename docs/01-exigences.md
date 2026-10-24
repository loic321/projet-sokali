# Exigences : AVA Market

Version 0.1 · Statut : brouillon à valider
Priorités (MoSCoW) : M = Must (obligatoire), S = Should (souhaitable),
C = Could (si le temps le permet), W = Won't (pas dans cette version).

## 1. User stories

Format : "En tant que [rôle], je veux [action] afin de [bénéfice]."

| ID | User story | Priorité |
|----|------------|----------|
| US-01 | En tant que visiteur, je veux créer un compte afin de publier et contacter. | M |
| US-02 | En tant qu'utilisateur, je veux me connecter et me déconnecter en sécurité. | M |
| US-03 | En tant que vendeur, je veux publier une annonce (titre, catégorie, prix en FCFA, description, état, ville) afin de vendre. | M |
| US-04 | En tant que vendeur, je veux ajouter jusqu'à 5 photos à mon annonce afin d'inspirer confiance. | M |
| US-05 | En tant qu'acheteur, je veux parcourir les annonces récentes, page par page. | M |
| US-06 | En tant qu'acheteur, je veux rechercher et filtrer (catégorie, ville, prix, état) et trier afin de trouver vite. | M |
| US-07 | En tant qu'acheteur, je veux voir la fiche complète d'une annonce. | M |
| US-08 | En tant qu'acheteur, je veux consulter le profil d'un vendeur et ses annonces. | M |
| US-09 | En tant qu'acheteur, je veux écrire au vendeur depuis l'annonce afin de négocier. | M |
| US-10 | En tant qu'acheteur, je veux enregistrer des favoris afin de les retrouver. | M |
| US-11 | En tant que vendeur, je veux modifier, marquer comme vendue ou supprimer mes annonces. | M |
| US-12 | En tant qu'acheteur, je veux noter un vendeur après un échange. | S |
| US-13 | En tant qu'utilisateur, je veux signaler une annonce suspecte. | S |
| US-14 | En tant qu'administrateur, je veux modérer annonces et comptes signalés. | C |
| US-15 | En tant qu'utilisateur, je veux des messages en temps réel. | C |
| US-16 | En tant qu'acheteur, je veux payer en ligne (Mobile Money). | W |

## 2. Critères d'acceptation (exemples)

Un critère d'acceptation est un test écrit en français : si tous passent,
la story est terminée. Format : Étant donné / Quand / Alors.

**US-01 Créer un compte**
- Étant donné un email non utilisé, quand je m'inscris avec un mot de passe
  d'au moins 8 caractères, alors mon compte est créé et je suis connecté.
- Étant donné un email déjà utilisé, quand je m'inscris, alors je reçois une
  erreur claire et aucun compte n'est créé.
- Le mot de passe n'est jamais stocké en clair ni renvoyé par l'API.

**US-03 Publier une annonce**
- Étant donné que je suis connecté, quand je soumets une annonce valide,
  alors elle apparaît dans la liste avec le statut ACTIVE.
- Quand le prix est négatif ou le titre vide, alors l'API refuse la
  demande et indique quel champ est invalide.
- Quand je ne suis pas connecté, alors la publication est refusée.

**US-11 Gérer mes annonces**
- Étant donné une annonce qui appartient à un autre utilisateur, quand je
  tente de la modifier ou de la supprimer, alors c'est refusé.

## 3. Exigences non fonctionnelles

| ID | Exigence | Mesure |
|----|----------|--------|
| NF-01 | Sécurité des accès | Contrôle d'accès vérifié côté serveur sur chaque route protégée |
| NF-02 | Sécurité des données | Mots de passe hashés, aucun secret dans Git, validation de toute entrée |
| NF-03 | Performance | Liste d'annonces : moins de 500 ms pour 95 % des requêtes en local |
| NF-04 | Connexion lente | Réponses paginées, images compressées, pas de page de plus de 1 Mo hors images |
| NF-05 | Mobile d'abord | Interface utilisable dès 360 px de large |
| NF-06 | Qualité | Chaque route a un test automatisé et figure dans le contrat OpenAPI |
| NF-07 | Langue | Interface en français ; code, commits et API en anglais |
