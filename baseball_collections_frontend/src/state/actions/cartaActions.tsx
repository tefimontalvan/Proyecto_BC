import {
  AGREGAR_CARTA,
  AGREGAR_CARTA_ERROR,
  AGREGAR_CARTA_EXITO,
  COMENZAR_DESCARGA_CARTAS,
  DESCARGA_CARTAS_EXITO,
  DESCARGA_CARTAS_ERROR,
  OBTENER_CARTA_ELIMINAR,
  CARTA_ELIMINADA_EXITO,
  CARTA_ELIMINADA_ERROR,
  OBTENER_CARTA_EDITAR,
  COMENZAR_EDICION_CARTA,
  CARTA_EDITADA_EXITO,
  CARTA_EDITADA_ERROR,
  BUSCAR_CARTA,
  CARTA_ENCONTRADA_EXITO,
  CARTA_ENCONTRADA_ERROR,
} from "../types";
import { Dispatch } from "redux";
import axios from "axios";
import Swal from "sweetalert2";

export interface cartaInterface {
  idCarta: number;
  nombreJugador: string;
  apellidoJugador: string;
  equipo: string;
  rareza: string;
  rolJugador: string;
  fechaSalida: Date;
  foto: string;
}

interface cartaInterfaceSinId {
  nombreJugador: string;
  apellidoJugador: string;
  equipo: string;
  rareza: string;
  rolJugador: string;
  fechaSalida: string;
  foto: string;
}

interface payloadEstado {
  type: string;
  payload: boolean;
}

interface payloadCarta {
  type: string;
  payload: cartaInterface;
}

interface payloadId {
  type: string;
  payload: number;
}

interface payloadString {
  type: string;
  payload: string;
}

interface sinPayload {
  type: string;
}

export type CartaDispatchIntefaces =
  | payloadCarta
  | payloadEstado
  | payloadId
  | payloadString
  | sinPayload;

export const crearNuevaCartaAction =
  (carta: cartaInterfaceSinId) =>
  async (dispatch: Dispatch<CartaDispatchIntefaces>) => {
    dispatch(agregarCarta());

    try {
      console.log({ carta });
      //insertar en la API
      const cartaNueva = await axios.post<cartaInterface[]>(
        "http://localhost:4000/inicio/nueva",
        carta
      );

      //si todo sale bien actualizar el state
      dispatch(agregarCartaExito(cartaNueva.data));

      //Alerta
      Swal.fire("Correcto", "La carta se agregó correctamente", "success");
    } catch (error) {
      console.log({ error });
      //si hay un error cambiar el state
      dispatch(agregarCartaError(true));

      //alerta de error
      Swal.fire({
        icon: "error",
        title: "Hubo un error",
        text: "Hubo un error, no se pudo agregar la carta",
      });
    }
  };

const agregarCarta = () => ({
  type: AGREGAR_CARTA,
  payload: true,
});

//si el carta se guarda en la base de datos
const agregarCartaExito = (carta: cartaInterface[]) => ({
  type: AGREGAR_CARTA_EXITO,
  //como vamos a modificar el state se carga un payload
  payload: carta,
});

//si hubo un error

const agregarCartaError = (estado: boolean) => ({
  type: AGREGAR_CARTA_ERROR,
  payload: estado,
});

//Funcion que descarga las cartas de la base de datos
export const obtenerCartasAction =
  () => async (dispatch: Dispatch<CartaDispatchIntefaces>) => {
    dispatch(descargarCartas());

    try {
      const listaCartas = await axios.get<cartaInterface[]>(
        "http://localhost:4000/inicio/cartas"
      );

      dispatch(descargarCartaExito(listaCartas.data));
    } catch (error) {
      console.log({ error });
      dispatch(descargarCartaError(true));
    }
  };

const descargarCartas = () => ({
  type: COMENZAR_DESCARGA_CARTAS,
  payload: true,
});

const descargarCartaExito = (carta: cartaInterface[]) => ({
  type: DESCARGA_CARTAS_EXITO,
  payload: carta,
});

const descargarCartaError = (estado: boolean) => ({
  type: DESCARGA_CARTAS_ERROR,
  payload: estado,
});

//Selecciona y elimina la carta
export const borrarCartaAction =
  (carta: cartaInterface) =>
  async (dispatch: Dispatch<CartaDispatchIntefaces>) => {
    dispatch(obtenerCartaEliminar(carta));
    try {
      await axios.post<cartaInterface[]>(
        "http://localhost:4000/inicio/eliminar",
        carta
      );

      dispatch(eliminarCartaExito());

      //Si se elimina mostrar alerta
      Swal.fire("Eliminado!", "Su carta ha sido eliminada.", "success");
    } catch (error) {
      console.log({ error });
      dispatch(eliminarCartaError(true));
    }
  };

const obtenerCartaEliminar = (carta: cartaInterface) => ({
  type: OBTENER_CARTA_ELIMINAR,
  payload: carta,
});

const eliminarCartaExito = () => ({
  type: CARTA_ELIMINADA_EXITO,
});

const eliminarCartaError = (estado: boolean) => ({
  type: CARTA_ELIMINADA_ERROR,
  payload: estado,
});

export const buscarPorNombreAction =
  (carta: cartaInterface[]) =>
  async (dispatch: Dispatch<CartaDispatchIntefaces>) => {
    dispatch(buscarCarta(carta));
    try {
      dispatch(cartaEncontradaExito());
    } catch (error) {
      console.log({ error });
      dispatch(cartaEncontradaError(true));
    }
  };

const buscarCarta = (carta: cartaInterface[]) => ({
  type: BUSCAR_CARTA,
  payload: carta,
});

const cartaEncontradaExito = () => ({
  type: CARTA_ENCONTRADA_EXITO,
});

const cartaEncontradaError = (estado: boolean) => ({
  type: CARTA_ENCONTRADA_ERROR,
  payload: estado,
});

//Colocar carta en edicion

export const obtenerCartaEditar =
  (carta: cartaInterface) =>
  async (dispatch: Dispatch<CartaDispatchIntefaces>) => {
    dispatch(obtenerCartaEditarAction(carta));
  };

const obtenerCartaEditarAction = (carta: cartaInterface) => ({
  type: OBTENER_CARTA_EDITAR,
  payload: carta,
});

//Edita una carta en la API y en el state
export const editarCartaAction =
  (carta: cartaInterface) =>
  async (dispatch: Dispatch<CartaDispatchIntefaces>) => {
    dispatch(editarCarta());

    try {
      const cartaEditada = await axios.put<any>(
        "http://localhost:4000/inicio/modificar",
        carta
      );
      dispatch(editarCartaExito(cartaEditada.data.cartaModificada));
      Swal.fire(
        "Carta editada!",
        "Su carta ha sido editada correctamente.",
        "success"
      );
    } catch (error) {
      console.log({ error });
      dispatch(editarCartaError(true));
      Swal.fire({
        icon: "error",
        title: "Hubo un error",
        text: "Hubo un error, no se pudo editar la carta",
      });
    }
  };

const editarCarta = () => ({
  type: COMENZAR_EDICION_CARTA,
});

const editarCartaExito = (carta: cartaInterface) => ({
  type: CARTA_EDITADA_EXITO,
  payload: carta,
});

const editarCartaError = (estado: boolean) => ({
  type: CARTA_EDITADA_ERROR,
  payload: estado,
});
