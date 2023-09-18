var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/index', 
  {  
    nom: "Parent",
    prenom: "Felix",
    adresse: "1341 rue Montagne",
    courriel: "parentfel123@gmail.com",
    codepostal: "J4L8P4",
    telephone: "123-456-7890",
  });
});
router.post('/', function(req,res,next){
  let prixSansTaxes = calculPrix(req);
  let TVQ = prixSansTaxes * 0.10;
  let TPS = prixSansTaxes * 0.05;
  let prixAvecTaxes = prixSansTaxes + TVQ + TPS;
  res.render('pages/resultat', 
  {
    nom: req.body.nom,
    prenom: req.body.prenom,
    adresse: req.body.adresse,
    courriel: req.body.courriel,
    codepostal: req.body.codepostal,
    type: req.body.type,
    taille: req.body.taille,
    telephone: req.body.tel,
    qte: req.body.qte,
    prixST : prixSansTaxes.toFixed(2),
    prixAT : prixAvecTaxes.toFixed(2),
    pepperoni: req.body.pepperoni,
    mozarella: req.body.mozarella,
    oeuf: req.body.oeuf,
    TVQ: TVQ,
    TPS: TPS,
    paiement: req.body.paiement
  });
});
router.use(function(req,res,next){
  res.render("pages/error");
});
function calculPrix(req){
  let prix = 0.0;
  switch(req.body.type)
  {
    case "Hawaienne":
      prix += 7.0;
      break;
    case "All Dressed":
      prix += 8.1;
      break;
    default: //sicilienne
      prix += 6.3;
      break;
  }
  if(req.body.pepperoni == "Oui")
    prix += 0.5;
  if(req.body.oeuf == "Oui")
    prix += 0.5;
  if(req.body.mozarella == "Oui")
    prix += 0.5;
  switch(req.body.taille)
  {
    case "Small":
      prix *= 0.8;
      break;
    case "Large":
      prix *= 1.2
      break;
    default:
      break;
  }
  prix *= req.body.qte;
  return prix;
}
module.exports = router;
