
document.addEventListener('DOMContentLoaded', () => {

  // Le contenu est visible par défaut (voir .no-js dans le CSS) :
  // on retire cette classe dès que le JS est bien chargé.
  document.documentElement.classList.remove('no-js');

  /* ---------------------------------------------------
     1) Apparition en fondu des cartes au défilement
  --------------------------------------------------- */
  const revealCibles = document.querySelectorAll('.categorie-item, .annonce-card');

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
  document.querySelectorAll('.btn-like').forEach((bouton) => {
    bouton.addEventListener('click', () => {
      const actif = bouton.classList.toggle('liked');
      bouton.setAttribute('aria-pressed', actif ? 'true' : 'false');
    });
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
   
  /*filtre annonce-card*/
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

  /*Menu hamburger mobile*/
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      // toggle() renvoie true si la classe vient d'être AJOUTÉE (menu ouvert)
      const estOuvert = mobileMenu.classList.toggle('ouvert');

      // On synchronise aria-expanded avec l'état réel du menu
      menuToggle.setAttribute('aria-expanded', estOuvert ? 'true' : 'false');
    });
  }
});