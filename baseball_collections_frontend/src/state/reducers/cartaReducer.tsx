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
  CARTA_EDITADA_EXITO,
  CARTA_EDITADA_ERROR,
  BUSCAR_CARTA,
  CARTA_ENCONTRADA_EXITO,
  CARTA_ENCONTRADA_ERROR,
} from "../types";

const initialState = {
  cartas: [],
  error: null,
  loading: false,
  cartaEliminar: null,
  cartaEditar: null,
};

interface payloadEstado {
  type: any;
  payload: boolean;
}

interface payloadCarta {
  type: any;
  payload: cartaInterface;
}

interface payloadId {
  type: any;
  payload: number;
}

interface cartaInterface {
  idCarta: number;
  nombreJugador: string;
  apellidoJugador: string;
  equipo: string;
  rareza: string;
  rolJugador: string;
  fechaSalida: Date;
  foto: string;
  activo: boolean;
}

type Action = payloadCarta | payloadEstado | payloadId | any;

const cartaReducer = (state: any = initialState, action: Action) => {
  switch (action.type) {
    case COMENZAR_DESCARGA_CARTAS:
    case AGREGAR_CARTA:
      return {
        ...state,
        loading: action.payload,
      };

    case DESCARGA_CARTAS_EXITO:
      return {
        ...state,
        loading: false,
        cartas: action.payload,
      };
    case AGREGAR_CARTA_EXITO:
      return {
        ...state,
        loading: false,
        cartas: [...state.cartas, action.payload],
      };

    case DESCARGA_CARTAS_ERROR:
    case AGREGAR_CARTA_ERROR:
    case CARTA_ELIMINADA_ERROR:
    case CARTA_EDITADA_ERROR:
    case CARTA_ENCONTRADA_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case OBTENER_CARTA_ELIMINAR:
      return {
        ...state,
        cartaEliminar: action.payload,
      };

    case BUSCAR_CARTA:
      return {
        ...state,
        cartaBuscar: action.payload,
      };

    case CARTA_ELIMINADA_EXITO:
      return {
        ...state,
        cartas: state.cartas.filter(
          (carta: cartaInterface) => carta.idCarta !== state.cartaEliminar
        ),
        cartaEliminar: null,
      };

    case CARTA_ENCONTRADA_EXITO:
      return {
        ...state,
        cartas: state.cartas.filter(
          (carta: cartaInterface) => carta.idCarta !== state.cartaBuscar
        ),
        cartaEliminar: null,
      };

    case OBTENER_CARTA_EDITAR:
      return {
        ...state,
        cartaEditar: action.payload,
      };

    case CARTA_EDITADA_EXITO:
      return {
        ...state,
        cartaEditar: null,
        cartas: state.cartas.map(
          (carta: cartaInterface) =>
            carta.idCarta === action.payload.idCarta((carta = action.payload))
        ),
      };

    default:
      return state;
  }
};

export default cartaReducer;
