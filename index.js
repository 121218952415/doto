const express = require("express");
const { config } = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const router = require("./src/routes/index"); // Ajuste en la ruta

// Lee las variables de entorno desde el archivo .env
config();
const app = express();

// Puerto del servidor
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(router);

// Iniciar el servidor
async function startServer() {
    try {
        app.listen(PORT, () =>
            console.log(`Server running on port http://localhost:${PORT}`)
        );
    } catch (error) {
        console.log("Unable to initiate", error);
    }
}

startServer();
