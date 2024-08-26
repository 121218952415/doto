const express = require("express");
const router = express.Router(); // Asegúrate de invocar la función Router()
const fetchItems = require("../controllers/getinfo");

router.get("/", fetchItems);
 

module.exports = router;