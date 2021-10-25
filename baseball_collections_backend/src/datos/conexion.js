import sql from "mssql";
import config from "../../config.js";

const dbSettings = {
  user: config.dbUser,
  password: config.dbPassword,
  server: config.dbServer,
  database: config.dbDatabase,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

export const obtenerConexion = async () => {
  try {
    const conexion = await sql.connect(dbSettings);
    return conexion;
  } catch (error) {
    console.error({ error });
  }
};
