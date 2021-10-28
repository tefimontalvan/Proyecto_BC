import express from "express";
import {
  getCartas,
  postCarta,
  getCartasId,
  deleteCartaPorId,
  putCartaPorId,
  getEquipos,
  getFechas,
  getRoles,
  getRarezas,
} from "../controllers/cartas.controller.js";

const CartasRouter = express.Router();

CartasRouter.get("/equipos", async (req, res) => {
  const datosEquipos = await (await getEquipos()).recordset;

  if (datosEquipos) return res.json({ equipos: datosEquipos });
  return res.status(400).json("No se pudieron obtener los equipos");
});

CartasRouter.get("/rarezas", async (req, res) => {
  const datosRarezas = await (await getRarezas()).recordset;

  if (datosRarezas) return res.json({ rarezas: datosRarezas });
  return res.status(400).json("No se pudieron obtener las rarezas");
});

CartasRouter.get("/fechas", async (req, res) => {
  const datosFechas = await (await getFechas()).recordset;

  if (datosFechas) return res.json({ fechas: datosFechas });
  return res.status(400).json("No se pudieron obtener las rarezas");
});

CartasRouter.get("/roles", async (req, res) => {
  const datosRoles = await (await getRoles()).recordset;

  if (datosRoles) return res.json({ roles: datosRoles });
  return res.status(400).json("No se pudieron obtener los roles");
});

CartasRouter.get("/cartas", async (req, res) => {
  const datosCartas = await (await getCartas()).recordset;

  if (datosCartas) return res.json({ cartas: datosCartas });
  return res.status(400).json("No se pudieron obtener las cartas");
});

CartasRouter.get("/cartas/:id", getCartasId);

CartasRouter.post("/nueva", async (req, res) => {
  //LA FECHA TIENE QUE SER EN FORMATO MM/DD/YYYY
  const {
    nombreJugador,
    apellidoJugador,
    equipo,
    rareza,
    foto,
    rolJugador,
    fechaSalida,
  } = req.body;

  if (
    !nombreJugador ||
    !apellidoJugador ||
    !equipo ||
    !rareza ||
    !foto ||
    !rolJugador ||
    !fechaSalida
  ) {
    res.status(400).send("Complete todos los campos de la carta a crear");
    return;
  }

  const nuevaCarta = await postCarta(
    nombreJugador,
    apellidoJugador,
    equipo,
    rareza,
    foto,
    rolJugador,
    fechaSalida
  );

  if (nuevaCarta) {
    res.json({ cartaCreada: nuevaCarta });
    return;
  }

  res.status(400).json("La carta no ha podido ser añadida");
});

CartasRouter.post("/eliminar", async (req, res) => {
  const { idCarta } = req.body;

  if (!idCarta) {
    res.status(400).send("Especifique el id de la carta a eliminar");
    return;
  }

  const cartaBorrada = await (await deleteCartaPorId(idCarta)).recordset[0];

  if (cartaBorrada) {
    res.json({ cartaEliminada: cartaBorrada });
    return;
  }

  res.status(400).json("La carta que solicitó no ha podido ser eliminada");
});

CartasRouter.put("/modificar", async (req, res) => {
  const {
    idCarta,
    nombreJugador,
    apellidoJugador,
    equipo,
    rareza,
    foto,
    rolJugador,
    fechaSalida,
  } = req.body;

  if (
    !idCarta ||
    !nombreJugador ||
    !apellidoJugador ||
    !equipo ||
    !rareza ||
    !foto ||
    !rolJugador ||
    !fechaSalida
  ) {
    res.status(400).send("Complete todos los campos de la carta a modificar");
    return;
  }

  const cartaParaModificar = await (
    await putCartaPorId(
      idCarta,
      nombreJugador,
      apellidoJugador,
      equipo,
      rareza,
      foto,
      rolJugador,
      fechaSalida
    )
  ).recordset[0];

  if (cartaParaModificar) {
    res.json({ cartaModificada: cartaParaModificar });
    return;
  }

  res.status(400).json("La carta que especificó no ha podido ser modificada");
});

export default CartasRouter;
