import executeStatement from "../datos/peticionGenerica.js";

const consultaGenerica = `SELECT Carta.idCarta, Jugador.nombre as nombreJugador, Jugador.apellido as apellidoJugador, Equipo.nombre as equipo, Rareza.nombre as rareza, RolJugador.nombre as rolJugador, Serie.fechaSalida, Carta.foto, Carta.activo
FROM Carta 
JOIN Equipo ON Equipo.idEquipo = Carta.idEquipo
JOIN Jugador ON Jugador.idJugador = Carta.idJugador
JOIN Rareza ON Rareza.idRareza = Carta.idRareza
JOIN RolJugador ON RolJugador.idRolJugador = Carta.idRolJugador
JOIN Serie ON Serie.idSerie = Carta.idSerie`;

const getCartas = () => {
  const cartas = executeStatement(`${consultaGenerica} WHERE activo = 1`);
  return cartas;
};

const getCartasId = async (req, res) => {
  const { id } = req.params;
  const cartas = executeStatement(
    `${consultaGenerica} WHERE Carta.idCarta = '${id}' AND activo = 1`
  );
  if (!cartas) {
    return res.status(403).send("La carta buscada no pertenece a la coleccion");
  }
  res.status(200).send((await cartas).recordset[0]);
};

const postCarta = async (
  nombreJugador,
  apellidoJugador,
  equipo,
  rareza,
  foto,
  rolJugador,
  fechaSalida
) => {
  await executeStatement(
    `INSERT INTO Jugador (nombre, apellido) VALUES ('${nombreJugador}', '${apellidoJugador}')`
  );

  const idJugador = (
    await executeStatement(`SELECT IDENT_CURRENT('Jugador') as idJugador`)
  ).recordset[0].idJugador;
  console.log(idJugador);

  await executeStatement(`INSERT INTO Equipo (nombre) VALUES ('${equipo}')`);

  const idEquipo = (
    await executeStatement(`SELECT IDENT_CURRENT('Equipo') as idEquipo`)
  ).recordset[0].idEquipo;

  await executeStatement(`INSERT INTO Rareza (nombre) VALUES ('${rareza}')`);

  const idRareza = (
    await executeStatement(`SELECT IDENT_CURRENT('Rareza') as idRareza`)
  ).recordset[0].idRareza;

  await executeStatement(
    `INSERT INTO RolJugador (nombre) VALUES ('${rolJugador}')`
  );

  const idRolJugador = (
    await executeStatement(`SELECT IDENT_CURRENT('RolJugador') as idRolJugador`)
  ).recordset[0].idRolJugador;

  await executeStatement(
    `INSERT INTO Serie (fechaSalida) VALUES ('${fechaSalida}')`
  );

  const idSerie = (
    await executeStatement(`SELECT IDENT_CURRENT('Serie') as idSerie`)
  ).recordset[0].idSerie;

  await executeStatement(
    `INSERT INTO Carta (idJugador, idEquipo, idRareza, foto, idRolJugador, idSerie, activo) VALUES (${idJugador}, ${idEquipo}, ${idRareza}, '${foto}', ${idRolJugador}, ${idSerie}, 1)`
  );

  const idCarta = (
    await executeStatement(`SELECT IDENT_CURRENT('Carta') as idCarta`)
  ).recordset[0].idCarta;

  const nuevaCarta = (
    await executeStatement(
      `SELECT Carta.idCarta, Jugador.nombre as nombreJugador, Jugador.apellido as apellidoJugador, Equipo.nombre as equipo, Rareza.nombre as rareza, RolJugador.nombre as rolJugador, Serie.fechaSalida, Carta.activo
      as cartaCreada 
      FROM Carta 
      JOIN Equipo ON Equipo.idEquipo = Carta.idEquipo
      JOIN Jugador ON Jugador.idJugador = Carta.idJugador
      JOIN Rareza ON Rareza.idRareza = Carta.idRareza
      JOIN RolJugador ON RolJugador.idRolJugador = Carta.idRolJugador
      JOIN Serie ON Serie.idSerie = Carta.idSerie WHERE idCarta = ${idCarta}`
    )
  ).recordset[0];

  return nuevaCarta;
};

const getCartaPorNombre = (nombreABuscar) => {
  const cartaBuscada = executeStatement(
    `${consultaGenerica} WHERE Jugador.nombre = '${nombreABuscar}' AND activo = 1`
  );
  return cartaBuscada;
};

const getCartaPorId = (id) => {
  const cartaBuscada = executeStatement(
    `${consultaGenerica} WHERE Carta.idCarta = '${id}' AND activo = 1`
  );
  return cartaBuscada;
};

const deleteCartaPorId = async (idCartaAEliminar) => {
  let cartaEliminada;

  const seEliminoCarta = await executeStatement(
    `UPDATE Carta SET activo = 0 WHERE idCarta = ${idCartaAEliminar} AND activo = 1`
  );

  if (seEliminoCarta) {
    cartaEliminada = await executeStatement(
      `${consultaGenerica} WHERE idCarta = ${idCartaAEliminar}`
    );
  }

  return cartaEliminada;
};

const putCartaPorId = async (
  idCartaAModificar,
  nombreJugador,
  apellidoJugador,
  equipo,
  rareza,
  foto,
  rolJugador,
  fechaSalida
) => {
  await executeStatement(
    `UPDATE Jugador SET nombre = '${nombreJugador}', apellido = '${apellidoJugador}' FROM Carta JOIN Jugador ON Jugador.idJugador = Carta.idJugador WHERE idCarta = ${idCartaAModificar}`
  );

  await executeStatement(
    `UPDATE Equipo SET nombre = '${equipo}' FROM Carta JOIN Equipo ON Equipo.idEquipo = Carta.idEquipo WHERE idCarta = ${idCartaAModificar}`
  );

  await executeStatement(
    `UPDATE Rareza SET nombre = '${rareza}' FROM Carta JOIN Rareza ON Rareza.idRareza = Carta.idRareza WHERE idCarta = ${idCartaAModificar}`
  );

  await executeStatement(
    `UPDATE Carta SET foto = '${foto}' WHERE idCarta = ${idCartaAModificar}`
  );

  await executeStatement(
    `UPDATE RolJugador SET nombre = '${rolJugador}' FROM Carta JOIN RolJugador ON RolJugador.idRolJugador = Carta.idRolJugador WHERE idCarta = ${idCartaAModificar}`
  );

  await executeStatement(
    `UPDATE Serie SET fechaSalida = CONVERT(DATETIME, '${fechaSalida}') FROM Carta JOIN Serie ON Serie.idSerie = Carta.idSerie WHERE idCarta = ${idCartaAModificar}`
  );

  const cartaModificada = await executeStatement(
    `${consultaGenerica} WHERE idCarta = ${idCartaAModificar}`
  );

  return cartaModificada;
};

export {
  getCartas,
  postCarta,
  getCartaPorNombre,
  getCartaPorId,
  getCartasId,
  deleteCartaPorId,
  putCartaPorId,
};
