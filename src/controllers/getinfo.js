const axios = require("axios");
const { config } = require("dotenv");



// Lee las variables de entorno desde el archivo .env
config();

const {ACCESTOKEN,CATEGORYID} = process.env


const BASE_URL = `https://api.mercadolibre.com/sites/MLM/search?category=${CATEGORYID}`; // URL base para búsqueda en Mercado Libre
const CATEGORY_ID = CATEGORYID; // ID de categoría para celulares
const LIMIT = 50; // Número máximo de artículos por solicitud
const TOTAL_ITEMS = 1000; // Número total de artículos a obtener
const ACCESS_TOKEN = ACCESTOKEN ; // Sustituye con tu token de acceso válido

const fetchItems = async (req,res) => {
    try {
        const response = await axios.get(BASE_URL, {
            headers: {
                'Authorization': `Bearer ${ACCESS_TOKEN}`
            }
        });
         res.send(response.data);
         console.log(response.data)
    } catch (error) {
        console.error('Error al obtener los artículos:', error);
        throw error;
    }
};

  module.exports = fetchItems