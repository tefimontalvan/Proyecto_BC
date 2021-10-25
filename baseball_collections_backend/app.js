import cors from "cors";
import express from "express";
import config from "./config.js";
import CartasRouter from "./src/rutas/cartas.ruta.js";
import { obtenerConexion } from "./src/datos/conexion.js";

const app = express();
const PORT = 4000;

app.use(cors());
app.set("PORT", config.PORT || 4000);
app.use(express.json());

app.use("/inicio", CartasRouter);

app.listen(PORT, () => {
  console.log("Servidor iniciado en puerto: " + PORT);
});

obtenerConexion();
