import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from "../types";
import { Dispatch } from "redux";
import { CartaDispatchIntefaces } from "./cartaActions";

// Muestra alerta
export const mostrarAlerta =
  (alerta: object) => async (dispatch: Dispatch<CartaDispatchIntefaces>) => {
    dispatch(crearAlerta(alerta));
  };

const crearAlerta = (alerta: object) => ({
  type: MOSTRAR_ALERTA,
  payload: alerta,
});

// ocultar alerta
export const ocultarAlertaAction =
  () => async (dispatch: Dispatch<CartaDispatchIntefaces>) => {
    dispatch(ocultarAlerta());
  };

const ocultarAlerta = () => ({
  type: OCULTAR_ALERTA,
});
