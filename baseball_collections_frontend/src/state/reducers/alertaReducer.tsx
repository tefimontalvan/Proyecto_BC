import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from "../types";

// Cada reducer tiene su state
const initialState = {
  alerta: null,
};

interface payloadAlerta {
  type: any;
  payload?: object;
}

type Action = payloadAlerta;

export default function alertaReducer(
  state: object = initialState,
  action: Action
) {
  switch (action.type) {
    case MOSTRAR_ALERTA:
      return {
        ...state,
        alerta: action.payload,
      };
    case OCULTAR_ALERTA:
      return {
        ...state,
        alerta: null,
      };
    default:
      return state;
  }
}
