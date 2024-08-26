const axios = require("axios");
const { config } = require("dotenv");

// Lee las variables de entorno desde el archivo .env
config();

const { ACCESS_TOKEN, CATEGORYID } = process.env;

//(¿Aplica Envió Gratis?, Tipo de Logística)
const BASE_URL = `https://api.mercadolibre.com/sites/MLM/search?category=${CATEGORYID}`; // URL base para búsqueda en Mercado Libre

const filterItems = async (req, res) => {
  try {
    const response = await axios.get(BASE_URL, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });

    // Accede al array de resultados
    const results = response.data.results;

    // Verifica si results es un array antes de usar .map()
    if (Array.isArray(results)) {
      const attributes = results.map((item) => ({
        MeliID: item.id, // id del producto
        SiteID: item.site_id, //
        Títulopublicación: item.title,
        SellerID: item.seller?.id,
        SellerName: item.seller?.nickname,
        PreciodeVenta: item.price,
        CantidadDisponibleventa: item.available_quantity,
        Linkpublicación: item.permalink,
        DireccióndelSeller: item.seller, // Nota: Este es un objeto, puedes ajustar según tus necesidades
        InformacionDelEnvio: {
          AplicaEnvioGratis: item.shipping.free_shipping,
          TipoDeLogistica: item.shipping.logistic_type,
        },
        AtributosAsociados: item.attributes.map((attr) => ({
          NombreDelAtributo: attr.name,
          ValorDelAtributo: attr.value_name,
        })),
      }));
     
      if (req && res) {
        // Si req y res están definidos, respondemos con los datos
        res.json(attributes);
      } else {
        // Si no, simplemente devolvemos los datos
        return attributes;
      }
      // Imprime la estructura de response.data para depuración
      console.log("Data received:", response.data);
    } else {
      // En caso de que results no sea un array, responde con un error
      res.status(500).send("formato no valido");
    }
  } catch (error) {
    // Manejo de errores, responde con un error 500 y un mensaje
    console.error("Error al obtener los artículos:", error);
    res.status(500).send("Error al obtener los artículos");
  }
};

module.exports = filterItems;
