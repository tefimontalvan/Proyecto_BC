import express from "express";
import {
  getCartas,
  postCarta,
  getCartaPorNombre,
  getCartaPorId,
  getCartasId,
  deleteCartaPorId,
  putCartaPorId,
} from "../controllers/cartas.controller.js";

const CartasRouter = express.Router();

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
  console.log({ body: req.body });

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

CartasRouter.get("/buscar", async (req, res) => {
  const { nombreABuscar } = req.body;

  if (!nombreABuscar) {
    res.status(400).send("Especifique el nombre del jugador");
    return;
  }

  const cartaBuscada = await (await getCartaPorNombre(nombreABuscar)).recordset;

  if (cartaBuscada) {
    res.json({ cartaEncontrada: cartaBuscada });
    return;
  }

  res.status(400).json("La carta que solicitó no ha podido ser encontrada");
});

//buscarPorId
CartasRouter.get("/buscarPorId", async (req, res) => {
  const { idABuscar } = req.body;

  if (!idABuscar) {
    res.status(400).send("Especifique el idCarta");
    return;
  }

  const cartaBuscada = await (await getCartaPorId(idABuscar)).recordset;

  if (cartaBuscada) {
    res.json({ cartaEncontrada: cartaBuscada });
    return;
  }

  res.status(400).json("La carta que solicitó no ha podido ser encontrada");
});

CartasRouter.delete("/eliminar", async (req, res) => {
  const { idCartaAEliminar } = req.body;

  if (!idCartaAEliminar) {
    res.status(400).send("Especifique el id de la carta a eliminar");
    return;
  }

  const cartaBorrada = await (
    await deleteCartaPorId(idCartaAEliminar)
  ).recordset[0];

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
