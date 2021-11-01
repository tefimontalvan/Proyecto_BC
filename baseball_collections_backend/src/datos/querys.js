const consultaGenerica = `SELECT Carta.idCarta, Jugador.nombre as nombreJugador, Jugador.apellido as apellidoJugador, Equipo.nombre as equipo, Rareza.nombre as rareza, RolJugador.nombre as rolJugador, Serie.fechaSalida, Carta.foto, Carta.activo
FROM Carta 
JOIN Equipo ON Equipo.idEquipo = Carta.idEquipo
JOIN Jugador ON Jugador.idJugador = Carta.idJugador
JOIN Rareza ON Rareza.idRareza = Carta.idRareza
JOIN RolJugador ON RolJugador.idRolJugador = Carta.idRolJugador
JOIN Serie ON Serie.idSerie = Carta.idSerie`;

const querys = {
  getCartas: `${consultaGenerica} WHERE activo = 1`,
  getCartasId: `${consultaGenerica} WHERE Carta.idCarta = @id AND activo = 1`,
  getRarezas: `SELECT nombre FROM Rareza`,
  getFechas: `SELECT fechaSalida FROM Serie`,
  getRoles: `SELECT nombre FROM RolJugador`,
  getEquipos: `SELECT nombre FROM Equipo`,
  insertarNombre: `INSERT INTO Jugador (nombre, apellido) VALUES (@nombreJugador, @apellidoJugador)`,
  getIdJugador: `SELECT IDENT_CURRENT('Jugador') as idJugador`,
  getIdEquipo: `SELECT idEquipo FROM Equipo WHERE nombre = @equipo`,
  getIdRareza: `SELECT idRareza FROM Rareza WHERE nombre = @rareza`,
  getIdRolJugador: `SELECT idRolJugador FROM RolJugador WHERE nombre = @rolJugador`,
  getIdSerie: `SELECT idSerie FROM Serie WHERE YEAR(fechaSalida) = @fechaSalida`,
  insertarCarta: `INSERT INTO Carta (idJugador, idEquipo, idRareza, foto, idRolJugador, idSerie, activo) VALUES (@idJugador, @idEquipo, @idRareza, @foto, @idRolJugador, @idSerie, 1)`,
  getIdCarta: `SELECT IDENT_CURRENT('Carta') as idCarta`,
  getNuevaCarta: `SELECT Carta.idCarta, Jugador.nombre as nombreJugador, Jugador.apellido as apellidoJugador, Equipo.nombre as equipo, Rareza.nombre as rareza, RolJugador.nombre as rolJugador, Serie.fechaSalida, Carta.activo
  as cartaCreada 
  FROM Carta 
  JOIN Equipo ON Equipo.idEquipo = Carta.idEquipo
  JOIN Jugador ON Jugador.idJugador = Carta.idJugador
  JOIN Rareza ON Rareza.idRareza = Carta.idRareza
  JOIN RolJugador ON RolJugador.idRolJugador = Carta.idRolJugador
  JOIN Serie ON Serie.idSerie = Carta.idSerie WHERE idCarta = @idCarta`,
};

export default querys;
