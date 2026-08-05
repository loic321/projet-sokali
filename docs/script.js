/* ═══════════════════════════════════════════════════════════
   SOKALI — script.js
═══════════════════════════════════════════════════════════ */

const CATS = [{
    n: "Électronique",
    i: "fa-mobile-alt",
    c: 8420
  },
  {
    n: "Véhicules",
    i: "fa-car",
    c: 5180
  },
  {
    n: "Immobilier",
    i: "fa-home",
    c: 4310
  },
  {
    n: "Mode",
    i: "fa-tshirt",
    c: 6750
  },
  {
    n: "Maison",
    i: "fa-couch",
    c: 3200
  },
  {
    n: "Services",
    i: "fa-briefcase",
    c: 2840
  },
  {
    n: "Loisirs",
    i: "fa-gamepad",
    c: 1900
  },
];

/* Vendeurs mock — id stable pour pouvoir retrouver "toutes les annonces
   de ce vendeur" et pour que la fiche profil et la fiche produit pointent
   vers la même personne. */
const ANNONCES = [{
    id: 1,
    titre: "iPhone 14 Pro Max 256GB — Noir Sidéral",
    prix: 185000,
    categorie: "Électronique",
    description: "Excellent état, batterie à 97%. Boîte originale, chargeur rapide 30W inclus.",
    images: ["assets/iphone-16-pro-max.jpg"],
    localisation: "Douala, Akwa",
    verifie: true,
    etat: "Très bon",
    heures: 2,
    tel: "237600000001",
    specs: {
      Marque: "Apple",
      Modèle: "iPhone 14 Pro Max",
      Stockage: "256 Go",
      Couleur: "Noir Sidéral",
      Batterie: "97%"
    },
    vendeur: {
      id: 101,
      nom: "Jean-Kevin M.",
      initiales: "JK",
      rt: 4.9,
      si: "Mars 2023",
      city: "Douala",
      ads: 12,
      sales: 9
    }
  },
  {
    id: 2,
    titre: "Toyota Corolla 2019 — Automatique",
    prix: 6500000,
    categorie: "Véhicules",
    description: "38 000 km, entretien suivi chez concessionnaire. Pas d'accident, pneus neufs.",
    images: ["assets/iphone-16-pro-max.jpg"],
    localisation: "Yaoundé, Bastos",
    verifie: true,
    etat: "Très bon",
    heures: 26,
    tel: "237600000002",
    specs: {
      Marque: "Toyota",
      Modèle: "Corolla",
      Année: "2019",
      Kilométrage: "38 000 km",
      Boîte: "Automatique"
    },
    vendeur: {
      id: 102,
      nom: "Amadou M.",
      initiales: "AM",
      rt: 4.8,
      si: "Juin 2022",
      city: "Yaoundé",
      ads: 6,
      sales: 5
    }
  },
  {
    id: 3,
    titre: "Appartement F3 meublé — Bonanjo",
    prix: 120000,
    categorie: "Immobilier",
    description: "F3 entièrement meublé et climatisé. Résidence gardée, parking sécurisé.",
    images: ["assets/iphone-16-pro-max.jpg"],
    localisation: "Douala, Bonanjo",
    verifie: false,
    etat: "Bon",
    heures: 50,
    tel: "237600000003",
    specs: {
      Type: "Appartement",
      Superficie: "75 m²",
      Pièces: "F3",
      Climatisation: "Oui"
    },
    vendeur: {
      id: 103,
      nom: "Sophie K.",
      initiales: "SK",
      rt: 4.7,
      si: "Jan 2023",
      city: "Douala",
      ads: 4,
      sales: 3
    }
  },
  {
    id: 4,
    titre: "MacBook Pro M2 16GB/512GB",
    prix: 650000,
    categorie: "Électronique",
    description: "État neuf, garantie Apple active jusqu'en décembre 2025. Chargeur MagSafe inclus.",
    images: ["assets/iphone-16-pro-max.jpg"],
    localisation: "Yaoundé, Nlongkak",
    verifie: true,
    etat: "Neuf",
    heures: 1,
    tel: "237600000004",
    specs: {
      Marque: "Apple",
      Puce: "M2",
      RAM: "16 Go",
      SSD: "512 Go",
      Garantie: "Déc. 2025"
    },
    vendeur: {
      id: 104,
      nom: "Patrick N.",
      initiales: "PN",
      rt: 4.9,
      si: "Mai 2022",
      city: "Yaoundé",
      ads: 23,
      sales: 21
    }
  },
  {
    id: 5,
    titre: "VTT Trek Marlin 7 — Taille M",
    prix: 95000,
    categorie: "Loisirs",
    description: "Très bon état, peu utilisé. Freins hydrauliques Shimano, 8 vitesses.",
    images: ["assets/iphone-16-pro-max.jpg"],
    localisation: "Douala, Kotto",
    verifie: false,
    etat: "Très bon",
    heures: 72,
    tel: "237600000005",
    specs: {
      Marque: "Trek",
      Modèle: "Marlin 7",
      Taille: "M",
      Vitesses: "8"
    },
    vendeur: {
      id: 105,
      nom: "Lucie M.",
      initiales: "LM",
      rt: 4.8,
      si: "Sep 2023",
      city: "Douala",
      ads: 3,
      sales: 2
    }
  },
  {
    id: 6,
    titre: "Canapé d'angle cuir 6 places",
    prix: 180000,
    categorie: "Maison",
    description: "Cuir marron chocolat, très confortable. Dimensions : 270×180 cm.",
    images: ["assets/iphone-16-pro-max.jpg"],
    localisation: "Douala, Deido",
    verifie: true,
    etat: "Bon",
    heures: 120,
    tel: "237600000006",
    specs: {
      Matière: "Cuir",
      Couleur: "Marron",
      Places: "6"
    },
    vendeur: {
      id: 106,
      nom: "Marc D.",
      initiales: "MD",
      rt: 4.6,
      si: "Fév 2022",
      city: "Douala",
      ads: 8,
      sales: 6
    }
  },
  {
    id: 7,
    titre: "Enceinte JBL Flip 6 — Étanche",
    prix: 60000,
    categorie: "Électronique",
    description: "JBL Flip 6, étanche IPX7, 12h autonomie. Deux semaines d'utilisation.",
    images: ["assets/iphone-16-pro-max.jpg"],
    localisation: "Douala, Akwa",
    verifie: true,
    etat: "Très bon",
    heures: 144,
    tel: "237600000007",
    specs: {
      Marque: "JBL",
      Modèle: "Flip 6",
      Autonomie: "12h",
      IP: "IPX7"
    },
    vendeur: {
      id: 101,
      nom: "Jean-Kevin M.",
      initiales: "JK",
      rt: 4.9,
      si: "Mars 2023",
      city: "Douala",
      ads: 12,
      sales: 9
    }
  },
  {
    id: 8,
    titre: "PlayStation 5 + 2 manettes",
    prix: 520000,
    categorie: "Loisirs",
    description: "PS5 avec lecteur, 2 DualSense, 3 jeux inclus. Garantie active.",
    images: ["assets/iphone-16-pro-max.jpg"],
    localisation: "Douala, Bonamoussadi",
    verifie: true,
    etat: "Très bon",
    heures: 3,
    tel: "237600000008",
    specs: {
      Marque: "Sony",
      SSD: "825 Go",
      Manettes: "2 incluses",
      Jeux: "3 inclus"
    },
    vendeur: {
      id: 109,
      nom: "Nicolas T.",
      initiales: "NT",
      rt: 4.9,
      si: "Août 2022",
      city: "Douala",
      ads: 18,
      sales: 17
    }
  },
];

const REVIEWS = [{
    a: "Sophie K.",
    av: "SK",
    rt: 5,
    dt: "Il y a 2 jours",
    tx: "Transaction parfaite, vendeur très sérieux et réactif."
  },
  {
    a: "Patrick N.",
    av: "PN",
    rt: 4,
    dt: "Il y a 1 semaine",
    tx: "Bonne communication, produit conforme à la description."
  },
  {
    a: "Lucie M.",
    av: "LM",
    rt: 5,
    dt: "Il y a 2 semaines",
    tx: "Excellent vendeur, honnête sur l'état de l'article."
  },
];

/* ── ÉTAT GLOBAL ── */
const S = {
  favs: prs("sk_favs") || [],
  user: prs("sk_user") || null,
  myAds: prs("sk_myads") || [],
  dark: localStorage.getItem("sk_dark") === "true",
  page: "home",
  cat: null,
  srch: "",
  sort: "recent",
  cond: "",
  pMin: 0,
  pMax: 0,
  curAd: null,
  curConv: null,
  curProfile: null,
  pubCat: "",
  pubCond: "Neuf",
};

function prs(k) {
  try {
    return JSON.parse(localStorage.getItem(k));
  } catch {
    return null;
  }
}

function sav(k, v) {
  localStorage.setItem(k, typeof v === "string" ? v : JSON.stringify(v));
}

const $ = (id) => document.getElementById(id);
const esc = (s) => String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const fmtPrix = (p) => new Intl.NumberFormat("fr-FR").format(p) + " FCFA";
const fmtDate = (h) => h < 1 ? "À l'instant" : h < 24 ? `Il y a ${h}h` : `Il y a ${Math.floor(h/24)} j`;
const allAds = () => [...S.myAds, ...ANNONCES];

document.addEventListener("DOMContentLoaded", () => {
  document.documentElement.classList.remove("no-js");

  applyDark(S.dark);
  updAuthUI();
  updFavUI();
  updMsgBdg();
  renderCatSG();

  renderSkeletons();
  setTimeout(() => {
    renderCatPills();
    renderAds();
  }, 380);

  setupNav();
  setupDrawer();
  setupSearchOverlay();
  setupTheme();
  setupBackToTop();
  setupPublishWizard();
  setupAuth();
  setupMessages();
  setupFilterPanel();
  setupProduct();
  setupProfile();
});

/* ═══════════════════════════════════════════════════════════
   ROUTEUR SPA — plus de bouton retour global : chaque vue qui
   en a besoin porte son propre lien contextuel dans son HTML
   (voir .bc, .auth-l-back, .prf-cov-back, la sidebar de /publier,
   le "×" de /messages) — câblés simplement via data-nav.
═══════════════════════════════════════════════════════════ */
const VIEWS = {
  home: "vHome",
  product: "vProduct",
  auth: "vAuth",
  publish: "vPublish",
  profile: "vProfile",
  msgs: "vMsgs",
  search: "vSearch"
};

function nav(page, data) {
  document.querySelectorAll(".view").forEach(v => v.classList.remove("on"));
  const v = $(VIEWS[page]);
  if (!v) return;
  v.classList.add("on");
  S.page = page;
  document.querySelectorAll(".bn-item[data-bn]").forEach(b => b.classList.toggle("on", b.dataset.bn === page));
  document.querySelector(".bottom-nav").classList.toggle("hidden-for-product", page === "product");

  if (page === "product" && data) loadProduct(data);
  if (page === "profile") loadProfile(data || null);
  if (page === "msgs") renderConvList();

  window.scrollTo({
    top: 0,
    behavior: "instant"
  });
}

function setupNav() {
  document.body.addEventListener("click", (e) => {
    const el = e.target.closest("[data-nav]");
    if (!el) return;
    e.preventDefault();
    nav(el.dataset.nav);
  });
  $("logoLink").addEventListener("click", (e) => {
    e.preventDefault();
    nav("home");
  });
  $("pubBtn").addEventListener("click", checkThenPublish);
  $("heroPubBtn").addEventListener("click", checkThenPublish);
  $("drwPub").addEventListener("click", () => {
    window.closeDrw();
    checkThenPublish();
  });
  $("bnPublish").addEventListener("click", checkThenPublish);
  $("heroExploreBtn").addEventListener("click", () => $("adsSec").scrollIntoView({
    behavior: "smooth"
  }));
  $("msgBtn").addEventListener("click", () => nav("msgs"));
  $("favBtn").addEventListener("click", showFavs);
  $("bnFav").addEventListener("click", showFavs);
  $("ftrFav").addEventListener("click", (e) => {
    e.preventDefault();
    showFavs();
  });
  $("drwFav").addEventListener("click", (e) => {
    e.preventDefault();
    window.closeDrw();
    showFavs();
  });
  $("userBtn").addEventListener("click", () => S.user ? nav("profile") : nav("auth"));
  $("bnProfile").addEventListener("click", () => S.user ? nav("profile") : nav("auth"));
  $("drwProfile").addEventListener("click", (e) => {
    e.preventDefault();
    window.closeDrw();
    S.user ? nav("profile") : nav("auth");
  });
  $("drwAuth").addEventListener("click", () => {
    window.closeDrw();
    S.user ? nav("profile") : nav("auth");
  });
}

function checkThenPublish() {
  if (!S.user) {
    notif("Connecte-toi pour publier une annonce", "er");
    setTimeout(() => nav("auth"), 500);
    return;
  }
  nav("publish");
}

/* ═══════════════════════════════════════════════════════════
   PANNEAU DE FILTRES — tri, fourchette de prix, état
   Fonctionnement en 2 temps, volontairement : cliquer sur un chip ne
   filtre PAS tout de suite (S.cat le fait, lui, en direct — cohérence
   discutable mais volontaire : les catégories sont "à un clic" par
   design, alors qu'un filtre de prix a besoin d'un bouton "Appliquer"
   sinon la grille se rafraîchit à chaque frappe dans le champ Min/Max,
   ce qui est désagréable). On stocke les choix dans des variables
   TEMPORAIRES (tmpSort/tmpCond) tant que le panneau est ouvert, et on
   ne les copie dans S qu'au clic sur "Appliquer".
═══════════════════════════════════════════════════════════ */
let tmpSort = S.sort,
  tmpCond = S.cond || "";

function setupFilterPanel() {
  const panel = $("filterPanel"),
    overlay = $("filterOverlay");

  function openPanel() {
    panel.classList.add("ouvert");
    overlay.classList.add("ouvert");
    panel.setAttribute("aria-hidden", "false");
    document.body.classList.add("drawer-ouvert");
    // Le panneau doit refléter l'état RÉELLEMENT appliqué à l'ouverture,
    // pas ce qu'on avait tripoté puis annulé la fois d'avant.
    tmpSort = S.sort;
    tmpCond = S.cond || "";
    syncChipsUI();
    $("fMin").value = S.pMin || "";
    $("fMax").value = S.pMax || "";
  }

  function closePanel() {
    panel.classList.remove("ouvert");
    overlay.classList.remove("ouvert");
    panel.setAttribute("aria-hidden", "true");
    document.body.classList.remove("drawer-ouvert");
  }

  function syncChipsUI() {
    $("sortChips").querySelectorAll(".chip").forEach(c => c.classList.toggle("on", c.dataset.sort === tmpSort));
    $("condChips").querySelectorAll(".chip").forEach(c => c.classList.toggle("on", c.dataset.cond === tmpCond));
  }

  $("filterBtn").addEventListener("click", openPanel);
  $("filterClose").addEventListener("click", closePanel);
  overlay.addEventListener("click", closePanel);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && panel.classList.contains("ouvert")) closePanel();
  });

  $("sortChips").querySelectorAll(".chip").forEach(chip => {
    chip.addEventListener("click", () => {
      tmpSort = chip.dataset.sort;
      syncChipsUI();
    });
  });
  $("condChips").querySelectorAll(".chip").forEach(chip => {
    chip.addEventListener("click", () => {
      tmpCond = chip.dataset.cond;
      syncChipsUI();
    });
  });

  $("filterApply").addEventListener("click", () => {
    S.sort = tmpSort;
    S.cond = tmpCond;
    S.pMin = parseInt($("fMin").value) || 0;
    S.pMax = parseInt($("fMax").value) || 0; // 0 = pas de plafond, voir filtered()
    updFilterCount();
    renderAds();
    closePanel();
  });
  $("filterReset").addEventListener("click", () => {
    S.sort = "recent";
    S.cond = "";
    S.pMin = 0;
    S.pMax = 0;
    tmpSort = "recent";
    tmpCond = "";
    $("fMin").value = "";
    $("fMax").value = "";
    syncChipsUI();
    updFilterCount();
    renderAds();
    closePanel();
  });
}

/* Badge numérique sur le bouton "Filtres" : compte les critères actifs
   pour donner un repère visuel sans avoir à rouvrir le panneau. */
function updFilterCount() {
  let n = 0;
  if (S.sort !== "recent") n++;
  if (S.cond) n++;
  if (S.pMin) n++;
  if (S.pMax) n++;
  $("filterCount").style.display = n ? "inline" : "none";
  $("filterCount").textContent = n;
  $("filterBtn").classList.toggle("active", n > 0);
}

/* ═══════════════════════════════════════════════════════════
   CATÉGORIES
═══════════════════════════════════════════════════════════ */
function renderCatPills() {
  const html = `<button class="cat-pill ${!S.cat ? 'active' : ''}" data-cat="" type="button">Tout</button>` +
    CATS.map(c => `<button class="cat-pill ${S.cat===c.n?'active':''}" data-cat="${esc(c.n)}" type="button">
        <i class="fas ${c.i}" aria-hidden="true"></i> ${esc(c.n)}</button>`).join("");
  $("catPillsBar").innerHTML = html;
  $("catPillsBar").querySelectorAll("[data-cat]").forEach(btn => {
    btn.addEventListener("click", () => {
      S.cat = btn.dataset.cat || null;
      renderCatPills();
      renderAds();
    });
  });
}

/* ═══════════════════════════════════════════════════════════
   ANNONCES
═══════════════════════════════════════════════════════════ */
function filtered() {
  return allAds().filter(a => {
    if (S.cat && a.categorie !== S.cat) return false;
    if (S.cond && a.etat !== S.cond) return false;
    if (S.pMin && a.prix < S.pMin) return false;
    if (S.pMax && a.prix > S.pMax) return false;
    return true;
  }).sort((a, b) => {
    if (S.sort === "price-asc") return a.prix - b.prix;
    if (S.sort === "price-desc") return b.prix - a.prix;
    return (a.heures || 0) - (b.heures || 0);
  });
}

function renderSkeletons() {
  $("catPillsBar").innerHTML = Array(6).fill('<div class="sk sk-pill"></div>').join("");
  $("adsGrid").innerHTML = Array(8).fill('<div class="sk sk-card" role="listitem"></div>').join("");
}

function buildCardHTML(a) {
  const fav = S.favs.includes(a.id);
  return `
  <article class="annonce-card" role="listitem" data-id="${a.id}" aria-label="${esc(a.titre)} — ${fmtPrix(a.prix)}">
    <div class="annonce-image-wrap" data-open="${a.id}">
      <img src="${esc(a.images[0])}" alt="${esc(a.titre)}" loading="lazy" class="annonce-image">
      <button class="btn-like ${fav?'liked':''}" type="button" data-fav="${a.id}"
              aria-label="${fav?'Retirer des favoris':'Ajouter aux favoris'}" aria-pressed="${fav}">
        <i class="fas fa-heart" aria-hidden="true"></i>
      </button>
    </div>
    <div class="annonce-detail" data-open="${a.id}">
      <h3 class="annonce-titre">${esc(a.titre)}</h3>
      <p class="annonce-meta-line"><i class="fas fa-location-dot" aria-hidden="true"></i> ${esc(a.localisation)} • ${fmtDate(a.heures)}</p>
      <p class="annonce-prix-inline">${fmtPrix(a.prix)}</p>
    </div>
  </article>`;
}

function renderCardsInto(gridEl, list) {
  gridEl.innerHTML = list.length ? list.map(buildCardHTML).join("") : `
    <div style="grid-column:1/-1;text-align:center;padding:3rem;color:var(--t3)">
      <i class="fas fa-search" style="font-size:2rem;display:block;margin-bottom:1rem" aria-hidden="true"></i>
      Aucune annonce ne correspond.</div>`;
  observeReveal();
  gridEl.querySelectorAll("[data-open]").forEach(el => el.addEventListener("click", () => nav("product", Number(el.dataset.open))));
  gridEl.querySelectorAll("[data-fav]").forEach(btn => btn.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleFav(Number(btn.dataset.fav));
  }));
}

function renderAds() {
  const list = filtered();
  $("lstCt").textContent = list.length ? `${list.length} annonce${list.length>1?'s':''} disponible${list.length>1?'s':''}` : "Aucun résultat";
  renderCardsInto($("adsGrid"), list);
}

function toggleFav(id) {
  const i = S.favs.indexOf(id);
  if (i === -1) {
    S.favs.push(id);
    notif("Ajouté aux favoris ❤️", "ok");
  } else {
    S.favs.splice(i, 1);
    notif("Retiré des favoris", "in");
  }
  sav("sk_favs", S.favs);
  updFavUI();
  if (S.page === "search") renderSearchResults(S.srch);
  else renderAds();
  if (S.page === "product" && S.curAd === id) loadProduct(id);
}

function updFavUI() {
  $("favDot").style.display = S.favs.length ? "block" : "none";
}

function showFavs() {
  nav("home");
  const favIds = new Set(S.favs);
  const list = allAds().filter(a => favIds.has(a.id));
  $("lstCt").textContent = list.length ? `${list.length} favori${list.length>1?'s':''}` : "Aucun favori pour le moment";
  renderCardsInto($("adsGrid"), list);
  if (!S.favs.length) notif("Tu n'as pas encore de favoris", "in");
}

/* ═══════════════════════════════════════════════════════════
   RECHERCHE
═══════════════════════════════════════════════════════════ */
function setupSearchOverlay() {
  $("searchTrigger").addEventListener("click", openSearchOverlay);
  $("searchIconBtn").addEventListener("click", openSearchOverlay);
  $("searchOverlayClose").addEventListener("click", closeSearchOverlay);
  $("searchOverlay").addEventListener("click", (e) => {
    if (e.target.id === "searchOverlay") closeSearchOverlay();
  });
  $("overlayInput").addEventListener("keydown", (e) => {
    if (e.key === "Enter") doSearch(e.target.value);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && $("searchOverlay").classList.contains("on")) closeSearchOverlay();
  });
}

function openSearchOverlay() {
  $("searchOverlay").classList.add("on");
  $("searchOverlay").setAttribute("aria-hidden", "false");
  document.body.classList.add("overlay-ouvert");
  renderRecentSearches();
  renderPopularCats();
  $("overlayInput").value = S.srch || "";
  setTimeout(() => $("overlayInput").focus(), 60);
}

function closeSearchOverlay() {
  $("searchOverlay").classList.remove("on");
  $("searchOverlay").setAttribute("aria-hidden", "true");
  document.body.classList.remove("overlay-ouvert");
}

function getRecent() {
  return prs("sk_recent") || [];
}

function saveRecentSearch(q) {
  let list = getRecent().filter(x => x.toLowerCase() !== q.toLowerCase());
  list.unshift(q);
  sav("sk_recent", list.slice(0, 5));
}

function renderRecentSearches() {
  const list = getRecent();
  $("recentList").innerHTML = list.length ?
    list.map(q => `<button class="search-chip" data-q="${esc(q)}" type="button"><i class="fas fa-clock-rotate-left" aria-hidden="true"></i> ${esc(q)}</button>`).join("") :
    `<p style="color:rgba(255,255,255,.5);font-size:.82rem">Aucune recherche récente</p>`;
  $("recentList").querySelectorAll("[data-q]").forEach(b => b.addEventListener("click", () => doSearch(b.dataset.q)));
}

function renderPopularCats() {
  $("popularCats").innerHTML = CATS.slice(0, 6).map(c =>
    `<button class="search-chip" data-q="${esc(c.n)}" type="button"><i class="fas ${c.i}" aria-hidden="true"></i> ${esc(c.n)}</button>`).join("");
  $("popularCats").querySelectorAll("[data-q]").forEach(b => b.addEventListener("click", () => doSearch(b.dataset.q)));
}

function doSearch(query) {
  query = (query || "").trim();
  if (!query) return;
  saveRecentSearch(query);
  closeSearchOverlay();
  S.srch = query;
  renderSearchResults(query);
  nav("search");
}

function renderSearchResults(query) {
  const q = query.toLowerCase();
  const list = allAds().filter(a => a.titre.toLowerCase().includes(q) || a.localisation.toLowerCase().includes(q));
  $("srchQ").textContent = query;
  $("srchCount").textContent = `${list.length} résultat${list.length>1?'s':''}`;
  renderCardsInto($("srchGrid"), list);
}

/* ═══════════════════════════════════════════════════════════
   PRODUIT — galerie, specs, vendeur cliquable, annonces similaires
═══════════════════════════════════════════════════════════ */
function setupProduct() {
  $("selC").addEventListener("click", () => {
    if (S.curAd) openSellerProfile();
  });
  $("selC").addEventListener("keydown", (e) => {
    if (e.key === "Enter" && S.curAd) openSellerProfile();
  });
}

function openSellerProfile() {
  const a = allAds().find(x => x.id === S.curAd);
  if (a) nav("profile", a.vendeur);
}

function loadProduct(id) {
  const a = allAds().find(x => x.id === id);
  if (!a) return;
  S.curAd = id;
  $("bcCat").textContent = a.categorie;
  $("bcTtl").textContent = a.titre;
  $("galImg").src = a.images[0];
  $("galImg").alt = a.titre;
  $("galVerif").style.display = a.verifie ? "flex" : "none";

  $("galTbs").innerHTML = a.images.map((src, i) => `
    <button class="gal-tb ${i===0?'on':''}" data-src="${esc(src)}" aria-label="Photo ${i+1}">
      <img src="${esc(src)}" alt="Photo ${i+1}" loading="lazy"></button>`).join("");
  $("galTbs").querySelectorAll(".gal-tb").forEach(tb => {
    tb.addEventListener("click", () => {
      $("galTbs").querySelectorAll(".gal-tb").forEach(t => t.classList.remove("on"));
      tb.classList.add("on");
      $("galImg").src = tb.dataset.src;
    });
  });

  $("pCat").textContent = a.categorie;
  $("pTtl").textContent = a.titre;
  $("pPrc").textContent = fmtPrix(a.prix);
  $("sPrc").textContent = fmtPrix(a.prix);
  $("pDesc").textContent = a.description;
  $("pMeta").innerHTML = `
    <div class="p-mi"><i class="fas fa-map-marker-alt" aria-hidden="true"></i>${esc(a.localisation)}</div>
    <div class="p-mi"><i class="far fa-clock" aria-hidden="true"></i>${fmtDate(a.heures)}</div>
    <div class="p-mi"><i class="fas fa-tag" aria-hidden="true"></i>${esc(a.etat)}</div>`;

  $("pSpecs").innerHTML = a.specs ? `<h4 style="margin-bottom:.9rem">Caractéristiques</h4>` +
    Object.entries(a.specs).map(([k, v]) => `<div class="sp-row"><span class="sp-l">${esc(k)}</span><span class="sp-v">${esc(v)}</span></div>`).join("") :
    "";

  const s = a.vendeur;
  $("selAv").textContent = s.initiales;
  $("selNm").textContent = s.nom;
  $("selSi").textContent = a.verifie ? "Vendeur vérifié" : "Membre SOKALI";
  $("selSts").innerHTML = `
    <div><div class="sst-n">★ ${s.rt}</div><div class="sst-l">Note</div></div>
    <div><div class="sst-n">${s.ads}</div><div class="sst-l">Annonces</div></div>
    <div><div class="sst-n">${s.sales}</div><div class="sst-l">Ventes</div></div>`;

  $("psbPrc").textContent = fmtPrix(a.prix);
  $("contactBtn").onclick = () => contactSeller(a);
  $("psbContactBtn").onclick = () => contactSeller(a);

  const fav = S.favs.includes(id);
  $("sFavBtn").innerHTML = `<i class="fas fa-heart" aria-hidden="true"></i> ${fav ? "Sauvegardé ❤" : "Ajouter aux favoris"}`;
  $("sFavBtn").onclick = () => toggleFav(id);

  const sim = allAds().filter(x => x.categorie === a.categorie && x.id !== id).slice(0, 6);
  $("simSec").style.display = sim.length ? "block" : "none";
  $("simList").innerHTML = sim.map(x => `
    <article class="annonce-card sim-c" data-open="${x.id}">
      <div class="annonce-image-wrap"><img src="${esc(x.images[0])}" alt="${esc(x.titre)}" loading="lazy" class="annonce-image"></div>
      <div class="annonce-detail"><h3 class="annonce-titre">${esc(x.titre)}</h3><p class="annonce-prix-inline">${fmtPrix(x.prix)}</p></div>
    </article>`).join("");
  $("simList").querySelectorAll("[data-open]").forEach(el => el.addEventListener("click", () => nav("product", Number(el.dataset.open))));
}

/* Contact interne — trouve ou crée la conversation avec ce vendeur */
function contactSeller(a) {
  if (!S.user) {
    notif("Connecte-toi pour contacter le vendeur", "er");
    setTimeout(() => nav("auth"), 500);
    return;
  }
  let conv = CONVS.find(c => c.nom === a.vendeur.nom);
  if (!conv) {
    conv = {
      id: `c_${a.id}`,
      nom: a.vendeur.nom,
      init: a.vendeur.initiales,
      messages: []
    };
    CONVS.unshift(conv);
  }
  nav("msgs");
  openConv(conv.id);
}
/* Même logique, mais appelée depuis une fiche PROFIL plutôt qu'une fiche
   PRODUIT — donc pas d'id d'annonce disponible pour générer l'id de
   conversation, on utilise le nom du vendeur à la place. */
function contactSellerByName(nom, init) {
  if (!S.user) {
    notif("Connecte-toi pour contacter le vendeur", "er");
    setTimeout(() => nav("auth"), 500);
    return;
  }
  let conv = CONVS.find(c => c.nom === nom);
  if (!conv) {
    conv = {
      id: `c_${nom.replace(/\s+/g,'')}`,
      nom,
      init,
      messages: []
    };
    CONVS.unshift(conv);
  }
  nav("msgs");
  openConv(conv.id);
}

/* ═══════════════════════════════════════════════════════════
   DARK MODE
═══════════════════════════════════════════════════════════ */
function applyDark(on) {
  document.documentElement.setAttribute("data-theme", on ? "dark" : "light");
  const btn = $("themeBtn");
  btn.innerHTML = on ? '<i class="fas fa-sun" aria-hidden="true"></i>' : '<i class="fas fa-moon" aria-hidden="true"></i>';
  btn.setAttribute("aria-pressed", on);
}

function setupTheme() {
  $("themeBtn").addEventListener("click", () => {
    S.dark = !S.dark;
    sav("sk_dark", S.dark);
    applyDark(S.dark);
  });
}

/* ═══════════════════════════════════════════════════════════
   DRAWER MOBILE
═══════════════════════════════════════════════════════════ */
function setupDrawer() {
  const drawer = $("mobileDrawer"),
    overlay = $("drawerOverlay"),
    toggle = $("mobTog"),
    close = $("drwClose");

  function openDrw() {
    drawer.classList.add("ouvert");
    overlay.classList.add("ouvert");
    document.body.classList.add("drawer-ouvert");
    toggle.setAttribute("aria-expanded", "true");
    close.focus();
  }
  window.closeDrw = function closeDrw() {
    drawer.classList.remove("ouvert");
    overlay.classList.remove("ouvert");
    document.body.classList.remove("drawer-ouvert");
    toggle.setAttribute("aria-expanded", "false");
    toggle.focus();
  };
  toggle.addEventListener("click", openDrw);
  close.addEventListener("click", window.closeDrw);
  overlay.addEventListener("click", window.closeDrw);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawer.classList.contains("ouvert")) window.closeDrw();
  });
}

/* ═══════════════════════════════════════════════════════════
   SCROLL
═══════════════════════════════════════════════════════════ */
let revealObserver;

function observeReveal() {
  const cibles = document.querySelectorAll(".annonce-card:not(.visible)");
  if (!("IntersectionObserver" in window)) {
    cibles.forEach(el => el.classList.add("visible"));
    return;
  }
  if (!revealObserver) {
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: .15
    });
  }
  cibles.forEach(el => revealObserver.observe(el));
}

function setupBackToTop() {
  const b = $("btt");
  window.addEventListener("scroll", () => b.classList.toggle("on", window.scrollY > 450), {
    passive: true
  });
  b.addEventListener("click", () => window.scrollTo({
    top: 0,
    behavior: "smooth"
  }));
}

/* ═══════════════════════════════════════════════════════════
   NOTIFICATIONS
═══════════════════════════════════════════════════════════ */
function notif(msg, type = "in") {
  const icons = {
    ok: "fa-check-circle",
    er: "fa-exclamation-circle",
    in: "fa-info-circle"
  };
  const n = document.createElement("div");
  n.className = `ntf ntf-${type}`;
  n.setAttribute("role", "alert");
  n.innerHTML = `<i class="fas ${icons[type]}" aria-hidden="true"></i><span>${esc(msg)}</span>`;
  $("nstk").appendChild(n);
  setTimeout(() => {
    n.style.animation = "slR .25s ease reverse";
    setTimeout(() => n.remove(), 220);
  }, 3200);
}

/* ═══════════════════════════════════════════════════════════
   AUTH
═══════════════════════════════════════════════════════════ */
function setupAuth() {
  document.querySelectorAll(".atab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".atab").forEach(t => t.classList.remove("on"));
      document.querySelectorAll(".apn").forEach(p => p.classList.remove("on"));
      tab.classList.add("on");
      $(tab.dataset.tab).classList.add("on");
    });
  });
  $("doLoginBtn").addEventListener("click", () => {
    const email = $("lEmail").value.trim();
    if (!email) {
      notif("Renseigne ton email", "er");
      return;
    }
    S.user = {
      id: Date.now(),
      name: email.split("@")[0],
      email
    };
    sav("sk_user", S.user);
    updAuthUI();
    notif(`Bienvenue, ${S.user.name} !`, "ok");
    nav("home");
  });
  $("doRegBtn").addEventListener("click", () => {
    const name = $("rNm").value.trim(),
      email = $("rEm").value.trim();
    if (!name || !email) {
      notif("Remplis tous les champs", "er");
      return;
    }
    S.user = {
      id: Date.now(),
      name,
      email
    };
    sav("sk_user", S.user);
    updAuthUI();
    notif(`Compte créé, bienvenue ${name} !`, "ok");
    nav("home");
  });
  // Boutons sociaux : pas de vraie intégration OAuth pour l'instant (ça
  // suppose un backend, cf. Phase E de ta feuille de route) — placeholders
  // honnêtes plutôt que de faire semblant que ça marche.
  $("socGoogle").addEventListener("click", () => notif("Connexion Google — arrive avec le backend (Phase E)", "in"));
  $("socFb").addEventListener("click", () => notif("Connexion Facebook — arrive avec le backend (Phase E)", "in"));
}

function updAuthUI() {
  $("userBtn").innerHTML = S.user ?
    `<div class="av-btn">${esc(S.user.name[0].toUpperCase())}</div>` :
    '<i class="fas fa-user" aria-hidden="true"></i>';
  $("drwAuthTxt").textContent = S.user ? "Mon profil" : "Se connecter";
}

/* ═══════════════════════════════════════════════════════════
   PROFIL — générique : profil perso (aucun argument) OU profil
   d'un vendeur consulté depuis une annonce (objet vendeur passé
   en argument par nav("profile", vendeurObj))
═══════════════════════════════════════════════════════════ */
function setupProfile() {
  document.querySelectorAll(".ptab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".ptab").forEach(t => t.classList.remove("on"));
      document.querySelectorAll(".ptpn").forEach(p => p.classList.remove("on"));
      tab.classList.add("on");
      $(tab.dataset.tab).classList.add("on");
    });
  });
}

function loadProfile(seller) {
  S.curProfile = seller;
  const isMe = !seller;
  if (isMe && !S.user) {
    nav("auth");
    return;
  }
  // Un seul objet "data" qu'on remplit soit depuis le vendeur passé en
  // argument, soit depuis S.user si on regarde son propre profil — le
  // reste de la fonction ne se demande ensuite JAMAIS "est-ce moi ou pas"
  // sauf pour les 2 endroits qui doivent vraiment différer (email/ville
  // affichée, et les boutons d'action).
  const data = seller || {
    id: S.user.id,
    nom: S.user.name,
    initiales: S.user.name[0].toUpperCase(),
    rt: 5.0,
    ads: S.myAds.length,
    sales: 0,
    city: S.user.city || null
  };

  $("prfAv").textContent = data.initiales;
  $("prfNm").textContent = data.nom;
  $("prfLoc").textContent = isMe ? (S.user.email) : `${data.city || 'Afrique'} · Membre depuis ${data.si || '2024'}`;
  $("prfBgs").innerHTML = (!isMe && data.rt >= 4.8) ?
    `<span class="prf-bg-ok"><i class="fas fa-check-circle" aria-hidden="true"></i> Vendeur vérifié</span>` : "";

  $("prfSts").innerHTML = `
    <div><div class="pst-n">★ ${data.rt}</div><div class="pst-l">Note</div></div>
    <div><div class="pst-n">${data.ads}</div><div class="pst-l">Annonces</div></div>
    <div><div class="pst-n">${data.sales}</div><div class="pst-l">Ventes</div></div>`;

  // Boutons d'action : deux jeux de boutons totalement différents selon
  // qu'on regarde SON PROPRE profil (raccourcis de gestion) ou celui d'un
  // vendeur croisé sur une annonce (action de contact).
  $("prfActs").innerHTML = isMe ?
    `<button class="btn btn-ghost" id="prfNewAdBtn"><i class="fas fa-plus" aria-hidden="true"></i> Nouvelle annonce</button>
       <button class="btn btn-ghost" id="prfMsgBtn"><i class="fas fa-envelope" aria-hidden="true"></i> Mes messages</button>` :
    `<button class="btn btn-orange" id="prfContactBtn"><i class="fas fa-comment-dots" aria-hidden="true"></i> Contacter</button>`;
  if (isMe) {
    $("prfNewAdBtn").addEventListener("click", checkThenPublish);
    $("prfMsgBtn").addEventListener("click", () => nav("msgs"));
  } else {
    $("prfContactBtn").addEventListener("click", () => contactSellerByName(data.nom, data.initiales));
  }

  const sellerAds = isMe ? S.myAds : allAds().filter(a => a.vendeur.id === data.id);
  $("prfAdsGrid").innerHTML = sellerAds.length ? sellerAds.map(buildCardHTML).join("") :
    `<div class="prf-empty">
         <i class="fas fa-box-open" aria-hidden="true"></i>
         <p>${isMe ? "Tu n'as encore publié aucune annonce." : "Ce vendeur n'a pas encore d'annonce active."}</p>
         ${isMe ? `<button class="btn btn-orange" id="prfEmptyPub" type="button"><i class="fas fa-plus" aria-hidden="true"></i> Publier ma première annonce</button>` : ""}
       </div>`;
  if (isMe && !sellerAds.length) $("prfEmptyPub")?.addEventListener("click", () => nav("publish"));
  $("prfInfo").innerHTML = isMe ?
    `<div class="pinfo-row"><i class="fas fa-envelope" aria-hidden="true"></i><span>${S.user.email}</span></div>
       <div class="pinfo-row"><i class="fas fa-map-marker-alt" aria-hidden="true"></i><span>${S.user.city || 'Ville non renseignée'}</span></div>
       <div class="pinfo-row"><i class="fas fa-calendar" aria-hidden="true"></i><span>Membre depuis ${data.si || '2024'}</span></div>` :
    `<div class="pinfo-row"><i class="fas fa-map-marker-alt" aria-hidden="true"></i><span>${data.city || 'Afrique'}</span></div>
       <div class="pinfo-row"><i class="fas fa-calendar" aria-hidden="true"></i><span>Membre depuis ${data.si || '2024'}</span></div>
       <div class="pinfo-row"><i class="fas fa-box" aria-hidden="true"></i><span>${data.ads} annonce${data.ads>1?'s':''} publiée${data.ads>1?'s':''}</span></div>
       <div class="pinfo-row"><i class="fas fa-handshake" aria-hidden="true"></i><span>${data.sales} vente${data.sales>1?'s':''} réalisée${data.sales>1?'s':''}</span></div>`;
  $("prfAdsGrid").querySelectorAll("[data-open]").forEach(el => el.addEventListener("click", () => nav("product", Number(el.dataset.open))));
  $("prfAdsGrid").querySelectorAll("[data-fav]").forEach(btn => btn.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleFav(Number(btn.dataset.fav));
  }));

  $("rvList").innerHTML = REVIEWS.map(r => `
    <div class="rv"><div class="rv-hd"><div class="rv-av">${r.av}</div>
      <div><div class="rv-nm">${esc(r.a)}</div><div class="rv-dt">${r.dt}</div></div>
      <div class="rv-sts">${'★'.repeat(r.rt)}${'☆'.repeat(5-r.rt)}</div></div>
      <p class="rv-tx">${esc(r.tx)}</p></div>`).join("");

  document.querySelectorAll(".ptab").forEach((t, i) => t.classList.toggle("on", i === 0));
  document.querySelectorAll(".ptpn").forEach((p, i) => p.classList.toggle("on", i === 0));
}

/* ═══════════════════════════════════════════════════════════
   PUBLIER — wizard 4 étapes
═══════════════════════════════════════════════════════════ */
function renderCatSG() {
  $("catSG").innerHTML = CATS.map(c => `
    <div class="cat-sb" data-cat="${esc(c.n)}"><i class="fas ${c.i}" aria-hidden="true"></i><span>${esc(c.n)}</span></div>`).join("");
  $("catSG").querySelectorAll(".cat-sb").forEach(el => {
    el.addEventListener("click", () => {
      S.pubCat = el.dataset.cat;
      $("catSG").querySelectorAll(".cat-sb").forEach(x => x.classList.remove("on"));
      el.classList.add("on");
    });
  });
}

function pubGoStep(n) {
  document.querySelectorAll(".pub-pn").forEach(p => p.classList.remove("on"));
  $(`pp${n}`).classList.add("on");
  document.querySelectorAll(".ps-it").forEach((el, i) => {
    el.classList.remove("act", "done");
    if (i + 1 < n) el.classList.add("done");
    else if (i + 1 === n) el.classList.add("act");
  });
  $("pubProgF").style.width = `${(n/4)*100}%`;
  if (n === 4) buildPubPreview();
}

function setupPublishWizard() {
  document.querySelectorAll(".cnd-c").forEach(el => {
    el.addEventListener("click", () => {
      document.querySelectorAll(".cnd-c").forEach(c => c.classList.remove("on"));
      el.classList.add("on");
      S.pubCond = el.dataset.c;
    });
  });
  $("pn1").addEventListener("click", () => {
    if (!S.pubCat) {
      notif("Choisis une catégorie", "er");
      return;
    }
    if (!$("pubTtl").value.trim()) {
      notif("Le titre est requis", "er");
      return;
    }
    pubGoStep(2);
  });
  $("pp2back").addEventListener("click", () => pubGoStep(1));
  $("pn2").addEventListener("click", () => {
    if (!$("pubPrc").value) {
      notif("Indique un prix", "er");
      return;
    }
    if (!$("pubDsc").value.trim()) {
      notif("La description est requise", "er");
      return;
    }
    pubGoStep(3);
  });
  $("pp3back").addEventListener("click", () => pubGoStep(2));
  $("pn3").addEventListener("click", () => {
    if (!$("pubLoc").value.trim()) {
      notif("La ville est requise", "er");
      return;
    }
    pubGoStep(4);
  });
  $("pp4back").addEventListener("click", () => pubGoStep(3));
  $("pubForm").addEventListener("submit", submitPub);
}

function buildPubPreview() {
  const img = $("pubImg").value.trim() || "https://picsum.photos/id/99/800/600";
  $("pubPrev").innerHTML = `
    <div style="display:flex;gap:1rem">
      <img src="${esc(img)}" style="width:90px;height:90px;object-fit:cover;border-radius:var(--r2);flex-shrink:0" alt="Aperçu">
      <div>
        <div style="font-size:.68rem;color:var(--p);font-weight:700;text-transform:uppercase">${esc(S.pubCat||'—')}</div>
        <div style="font-family:var(--fd);font-weight:700;margin:.2rem 0">${esc($("pubTtl").value || 'Titre non saisi')}</div>
        <div class="annonce-prix-inline" style="font-size:1.1rem">${$("pubPrc").value ? fmtPrix(parseInt($("pubPrc").value)) : 'Prix non défini'}</div>
        <div style="font-size:.78rem;color:var(--t3);margin-top:.3rem"><i class="fas fa-map-marker-alt" aria-hidden="true"></i> ${esc($("pubLoc").value||'—')} · ${esc(S.pubCond)}</div>
      </div>
    </div>`;
}

function submitPub(e) {
  e.preventDefault();
  if (!S.user) {
    notif("Connecte-toi d'abord", "er");
    nav("auth");
    return;
  }
  const newAd = {
    id: Date.now(),
    titre: $("pubTtl").value.trim(),
    prix: parseInt($("pubPrc").value) || 0,
    categorie: S.pubCat,
    description: $("pubDsc").value.trim(),
    images: [$("pubImg").value.trim() || "https://picsum.photos/id/99/800/600"],
    localisation: $("pubLoc").value.trim(),
    verifie: false,
    etat: S.pubCond,
    heures: 0,
    tel: "237600000000",
    specs: {
      État: S.pubCond
    },
    vendeur: {
      id: S.user.id,
      nom: S.user.name,
      initiales: S.user.name[0].toUpperCase(),
      rt: 5.0,
      ads: 1,
      sales: 0
    },
  };
  S.myAds.unshift(newAd);
  sav("sk_myads", S.myAds);
  notif("Annonce publiée avec succès 🎉", "ok");
  $("pubForm").reset();
  S.pubCat = "";
  S.pubCond = "Neuf";
  document.querySelectorAll(".cat-sb,.cnd-c").forEach(x => x.classList.remove("on"));
  document.querySelector('.cnd-c[data-c="Neuf"]').classList.add("on");
  pubGoStep(1);
  nav("home");
  renderAds();
}

/* ═══════════════════════════════════════════════════════════
   MESSAGES
═══════════════════════════════════════════════════════════ */
const CONVS = [{
    id: "c1",
    nom: "Jean-Kevin M.",
    init: "JK",
    messages: [{
        from: "you",
        txt: "Bonjour, l'iPhone est toujours disponible ?"
      },
      {
        from: "me",
        txt: "Oui, toujours dispo !"
      }
    ]
  },
  {
    id: "c2",
    nom: "Sophie K.",
    init: "SK",
    messages: [{
      from: "you",
      txt: "L'appartement est-il encore libre ?"
    }]
  },
];

function renderConvList() {
  $("convList").innerHTML = CONVS.length ? CONVS.map(c => `
    <div class="conv-it ${S.curConv===c.id?'on':''}" data-conv="${c.id}">
      <div class="conv-av">${c.init}</div>
      <div><div style="font-weight:700;font-size:.88rem">${esc(c.nom)}</div>
      <div style="font-size:.78rem;color:var(--t3)">${esc(c.messages[c.messages.length-1]?.txt || 'Démarrez la conversation')}</div></div>
    </div>`).join("") : `<p style="padding:2rem 1rem;color:var(--t3);text-align:center">Aucune conversation</p>`;
  $("convList").querySelectorAll("[data-conv]").forEach(el => el.addEventListener("click", () => openConv(el.dataset.conv)));
}

function openConv(id) {
  S.curConv = id;
  const c = CONVS.find(x => x.id === id);
  if (!c) return;
  renderConvList();
  $("thrEmpty").style.display = "none";
  $("thrActive").style.display = "flex";
  $("thrAv").textContent = c.init;
  $("thrNm").textContent = c.nom;
  renderThread(c);
  if (window.innerWidth <= 768) {
    $("msgListCol").classList.add("hide-m");
    $("msgThreadCol").classList.add("show-m");
    $("thrBack").style.display = "flex";
  }
}

function renderThread(c) {
  $("msgsArea").innerHTML = c.messages.map(m => `<div class="bub ${m.from==='me'?'me':'you'}">${esc(m.txt)}</div>`).join("");
  $("msgsArea").scrollTop = $("msgsArea").scrollHeight;
}

function setupMessages() {
  $("thrBack").addEventListener("click", () => {
    $("msgListCol").classList.remove("hide-m");
    $("msgThreadCol").classList.remove("show-m");
  });

  function send() {
    const inp = $("msgInp"),
      txt = inp.value.trim();
    if (!txt || !S.curConv) return;
    const c = CONVS.find(x => x.id === S.curConv);
    c.messages.push({
      from: "me",
      txt
    });
    inp.value = "";
    renderThread(c);
    renderConvList();
  }
  $("sendBtn").addEventListener("click", send);
  $("msgInp").addEventListener("keydown", (e) => {
    if (e.key === "Enter") send();
  });
}

function updMsgBdg() {
  $("msgBdg").style.display = "none";
  $("bnMsgBdg").style.display = "none";
}