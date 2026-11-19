const express = require('express');
const router = express.Router();

const products=[
   {id:1, titre: "iphone 13", prix: 300000,categorie: "Électronique",etat: "Neuf", localisation: "Douala" },
   {id:2, titre: "iphone 14", prix: 400000,categorie: "Électronique",etat: "Neuf", localisation: "Douala" },
   {id:3, titre: "iphone 15", prix: 500000,categorie: "Électronique",etat: "Neuf", localisation: "Douala" }
]

router.get('/', (req, res) => {
  res.json(products);
});

router.get('/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find(p => p.id === productId);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Produit non trouvé' });
  }
});

module.exports = router;
