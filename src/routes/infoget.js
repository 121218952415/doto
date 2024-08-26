const express = require("express");
const filterItems = require("../controllers/getfiltermeli");
const router = express.Router(); // Asegúrate de invocar la función Router()

router.get("/",filterItems );
 

module.exports = router;