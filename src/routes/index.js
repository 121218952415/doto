const express = require("express");
const router = express.Router(); // Asegúrate de invocar la función Router()
const getinfo = require("./infodata")//requerimos  el archivo con la función que nos devuelve la información de la base de datos
const infoget = require("./infoget")// tenemos la informacion para ,ercadeo 
const topmeli =require("./topmeli")


router.use("/getall",getinfo)// traer toda la info de db 
router.use("/data",infoget)// informaciion solicitada para mercadeo 
router.use("/topventas",topmeli)// El top 100 de lo mas vendido 











module.exports= router