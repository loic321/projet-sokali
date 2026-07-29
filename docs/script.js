

const ANNONCES = [
  {
    id: 1,
    titre: "Iphone 13 Pro Max Avec Son Kit Ecouteur",
    prix: 300000,                    // ← nombre, PAS une chaîne "300 000 FCFA"
    categorie: "ÉLECTRONIQUE",
    description: "Excellent état, batterie à 97%. Acheté en janvier 2024. Boîte originale, chargeur rapide 30W",
    image: "assets/iphone-16-pro-max.jpg",
    localisation: "Yaoundé, Cameroun",
    nouveau: true,
    datePublication: "15 juin 2026"
  },
  {
    id: 2,
    titre: "Iphone 14 Pro Max",
    prix: 400000,
    categorie: "ÉLECTRONIQUE",
    description: "Excellent état, batterie à 97%. Acheté en janvier 2024. Boîte originale, chargeur rapide 30W",
    image: "assets/iphone-16-pro-max.jpg",
    localisation: "Yaoundé, Cameroun",
    nouveau: true,
    datePublication: "15 juin 2026"
  },
  {
    id: 3,
    titre: "Iphone 15 Pro Max",
    prix: 500000,
    categorie: "ÉLECTRONIQUE",
    description: "Excellent état, batterie à 97%. Acheté en janvier 2024. Boîte originale, chargeur rapide 30W",
    image: "assets/iphone-16-pro-max.jpg",
    localisation: "Yaoundé, Cameroun",
    nouveau: true,
    datePublication: "15 juin 2026"
  },
  {
    id: 4,
    titre: "Iphone 16 Pro Max",
    prix: 600000,
    categorie: "ÉLECTRONIQUE",
    description: "Excellent état, batterie à 97%. Acheté en janvier 2024. Boîte originale, chargeur rapide 30W",
    image: "assets/iphone-16-pro-max.jpg",
    localisation: "Yaoundé, Cameroun",
    nouveau: true,
    datePublication: "15 juin 2026"
  }
];

const fmtPrix = (prix) => new Intl.NumberFormat('fr-FR').format(prix) + ' FCFA';
// fmtPrix(300000) → "300 000 FCFA"

// script.js — tout en haut, avant DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.classList.remove('no-js');

  // ⚠️ EN PREMIER, avant tout le reste : on génère les cartes
  afficherAnnonces(ANNONCES);

  // Ensuite seulement : le reveal au scroll, la recherche, etc.
  // (le reste de ton code actuel ne change pas)
  const revealCibles = document.querySelectorAll('.categorie-item, .annonce-card');
  // ...

  if ('IntersectionObserver' in window && revealCibles.length) {
    const observer = new IntersectionObserver((entrees) => {
      entrees.forEach((entree) => {
        if (entree.isIntersecting) {
          entree.target.classList.add('visible');
          observer.unobserve(entree.target);
        }
      });
    }, { threshold: 0.15 });

    revealCibles.forEach((el) => observer.observe(el));
  } else {
    // Pas de support IntersectionObserver : on affiche tout de suite
    revealCibles.forEach((el) => el.classList.add('visible'));
  }

  /* ---------------------------------------------------
     2) Header qui se compresse légèrement au scroll
  --------------------------------------------------- */
  const header = document.querySelector('.header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 12);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------------------------------------------------
     3) Bouton "favoris" : bascule visuelle au clic
  --------------------------------------------------- */
 document.querySelector('.annonce-grille')?.addEventListener('click', (e) => {
  const bouton = e.target.closest('.btn-like');
  if (!bouton) return; // le clic n'était pas sur un bouton favori, on ignore

  const actif = bouton.classList.toggle('liked');
  bouton.setAttribute('aria-pressed', actif ? 'true' : 'false');
});
  /* ---------------------------------------------------
     4) Bouton "Filtrer & Trier" : rotation de l'icône
  --------------------------------------------------- */
  document.querySelectorAll('.btn-filtre').forEach((bouton) => {
    bouton.addEventListener('click', () => {
      bouton.classList.toggle('actif');
    });
  });
   
  /*categorie active */
  document.querySelectorAll('.categorie-item').forEach((categorieactive) => {
    categorieactive.addEventListener('click', () => {
      const etaitActif = categorieactive.classList.contains('active');
      document.querySelectorAll('.categorie-item').forEach((el) => el.classList.remove('active'));
      if (!etaitActif) {
        categorieactive.classList.add('active');
      }
    });
  });
   
  /*recherche annonce-card*/
  const  searchInput = document.querySelector('.search-input');
  const annonceCard = document.querySelectorAll('.annonce-card'); 

  searchInput.addEventListener('input', function() {
    const filter = searchInput.value.toLowerCase();
    annonceCard.forEach(card => {
      const text = card.textContent.toLowerCase();
      if (text.includes(filter)) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    }); 

  });

  /* 
     Drawer mobile (menu hamburger)
  - */
  const menuToggle    = document.querySelector('.menu-toggle');
  const mobileDrawer  = document.querySelector('.mobile-drawer');
  const drawerOverlay = document.querySelector('.drawer-overlay');
  const drwClose      = document.querySelector('#drwClose');

  function openDrw() {
    mobileDrawer.classList.add('ouvert');
    drawerOverlay.classList.add('ouvert');
    document.body.classList.add('drawer-ouvert');
    menuToggle.setAttribute('aria-expanded', 'true');
    drwClose.focus();   // focus management : on saute directement sur "Fermer"
  }

  function closeDrw() {
    mobileDrawer.classList.remove('ouvert');
    drawerOverlay.classList.remove('ouvert');
    document.body.classList.remove('drawer-ouvert');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.focus();   // le focus REVIENT sur le bouton qui a ouvert le drawer
  }

  if (menuToggle && mobileDrawer && drawerOverlay && drwClose) {
    menuToggle.addEventListener('click', openDrw);
    drwClose.addEventListener('click', closeDrw);
    drawerOverlay.addEventListener('click', closeDrw);   // clic en dehors = ferme

    // Touche Échap ferme le drawer, mais seulement s'il est ouvert
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer.classList.contains('ouvert')) {
        closeDrw();
      }
    });
  }


 //faire des annonces dynamiques
  function afficherAnnonces(liste) {
  const grille = document.querySelector('.annonce-grille');
  if (!grille) return; // garde défensive : si l'élément n'existe pas, on ne plante pas

  grille.innerHTML = liste.map((a, i) => `
    <article class="annonce-card" role="listitem" aria-label="Annonce : ${a.titre} à ${fmtPrix(a.prix)}">
      ${a.nouveau ? `<div class="annonce-badge" aria-hidden="true">NOUVEAU</div>` : ''}
      <button class="btn-like" type="button" aria-label="Mettre en favoris" aria-pressed="false">
        <i class="fas fa-heart" aria-hidden="true"></i>
      </button>
      <div class="annonce-image-wrap">
        <img src="${a.image}" alt="Annonce ${a.titre}" loading="${i < 4 ? 'eager' : 'lazy'}" class="annonce-image">
      </div>
      <div class="annonce-detail">
        <p class="annonce-categorie">${a.categorie}</p>
        <h3 class="annonce-titre">${a.titre}</h3>
        <p class="annonce-description">${a.description}</p>
        <p class="annonce-prix">${fmtPrix(a.prix)}</p>
        <p class="annonce-localisation"><i class="fas fa-location-dot" aria-hidden="true"></i> ${a.localisation}</p>
        <div class="annonce-fin">
          <p class="annonce-date"><i class="fa-regular fa-clock" aria-hidden="true"></i> Publié le ${a.datePublication}</p>
          <button class="btn-icon" type="button" aria-label="Voir les détails">
            <i class="fas fa-eye" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </article>
  `).join('');
}
});