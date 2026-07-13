// script.js

document.addEventListener("DOMContentLoaded", () => {
  
  // --- Catégories : activer/désactiver ---
  const categories = document.querySelectorAll(".categorie-item");
  categories.forEach(cat => {
    cat.addEventListener("click", () => {
      categories.forEach(c => c.classList.remove("active"));
      cat.classList.add("active");
    });
  });

  // --- Favoris : cœur toggle ---
  const favorisBtns = document.querySelectorAll(".annonce-card .btn[aria-label='mettre en favoris']");
  favorisBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      btn.classList.toggle("active");
      btn.querySelector("i").classList.toggle("fas");
      btn.querySelector("i").classList.toggle("far"); // change icône plein/vide
    });
  });

  // --- Filtre & Trier ---
  const filtreBtn = document.querySelector(".btn-filtre");
  if (filtreBtn) {
    filtreBtn.addEventListener("click", () => {
      alert("Fonction Filtrer & Trier à implémenter !");
    });
  }

  // --- Recherche ---
  const searchInput = document.querySelector(".search-input");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      console.log("Recherche :", e.target.value);
      // Ici tu pourrais filtrer dynamiquement les annonces
    });
  }

  // --- Boutons CTA Hero ---
  const heroBtns = document.querySelectorAll(".hero-ctas .btn");
  heroBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      btn.classList.add("clicked");
      setTimeout(() => btn.classList.remove("clicked"), 300);
    });
  });

});
