const express = require("express");
const top1000CheapItems = require("../controllers/topMasVendido")
const router = express.Router(); // Asegúrate de invocar la función Router()

router.get("/",top1000CheapItems);
 

module.exports = router;