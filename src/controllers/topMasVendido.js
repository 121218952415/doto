const axios = require("axios");
const { config } = require("dotenv");

// Lee las variables de entorno desde el archivo .env
config();

const { ACCESS_TOKEN, CATEGORYID } = process.env;

//(¿Aplica Envió Gratis?, Tipo de Logística)
const BASE_URL = `https://api.mercadolibre.com/sites/MLM/search?category=${CATEGORYID}`; // URL base para búsqueda en Mercado Libre

const useTop1000CheapItems = async (req,res) => {
  try {
    const response = await axios.get(BASE_URL, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });

    // Accede al array de resultados
    const results = response.data.results;

    if (!Array.isArray(results)) {
      throw new Error("Datos recibidos no son un array");
    }

    // Filtra los 1000 artículos con menor precio
    const top1000CheapItems = results
      .sort((a, b) => (a.price || 0) - (b.price || 0)) // Ordena por precio ascendente
      .slice(0, 1000); // Toma los primeros 1000

    // Mapea los datos necesarios
    const topItems = top1000CheapItems.map((item) => ({
      SellerID: item.seller?.id || 'Desconocido',
      SellerName: item.seller?.nickname || 'Desconocido',
      Marca: item.attributes.find(attr => attr.name === "Marca")?.value_name || 'Desconocida',
      EnvioGratis: item.shipping?.free_shipping || false,
      TipoLogistica: item.shipping?.logistic_type || 'Desconocido',
      LugarOperacionSeller: item.seller?.address?.city_name || 'Desconocido',
      CondicionArticulo: item.condition || 'Desconocida',
      RangoPrecios: item.price || 'Desconocido',
    }));

    console.log("Top 1000 artículos más baratos:", topItems);
   
      // Si req y res están definidos, respondemos con los datos
      res.json(topItems);
    
  } catch (error) {
    console.error("Error al utilizar los artículos:", error);
    // Puedes retornar un valor predeterminado o lanzar un error según la lógica que necesites
    throw new Error("Error al procesar los artículos");
  }  try {
    const response = await axios.get(BASE_URL, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });

    // Accede al array de resultados
    const results = response.data.results;
    const top1000CheapItems = results
      .sort((a, b) => a.PrecioVenta - b.PrecioVenta) // Ordena por precio ascendente
      .slice(0, 1000); // Toma los primeros 1000
  
    // Mapea los datos necesarios
    const topItems = top1000CheapItems.map((item) => ({
      SellerID: item.SellerID,
      SellerName: item.SellerName,
      Marca: item.AtributosAsociados.find(
        (attr) => attr.NombreAtributo === "Marca"
      )?.ValorAtributo,
      EnvioGratis: item.InformacionDelEnvio.AplicaEnvioGratis,
      TipoLogistica: item.InformacionDelEnvio.TipoDeLogistica,
      LugarOperacionSeller: item.SiteID,
      CondicionArticulo: item.condition,
      RangoPrecios: item.PrecioVenta,
    }));

    console.log("Top 1000 artículos más baratos:", topItems);

    // Retorna los datos o envíalos en una respuesta HTTP
    return topItems;
  } catch (error) {
    console.error("Error al utilizar los artículos:", error);
  }
};

module.exports = useTop1000CheapItems;
