import { obtenerConexion } from "./conexion.js";

const executeStatement = async (consulta) => {
  let resultado;
  try {
    const respuesta = await obtenerConexion();
    resultado = await respuesta.request().query(consulta);
  } catch (error) {
    //console.error(error);
  }
  return resultado;
};

export default executeStatement;
