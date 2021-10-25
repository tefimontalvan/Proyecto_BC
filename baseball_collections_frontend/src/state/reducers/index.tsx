import { combineReducers } from "redux";
import cartaReducer from "./cartaReducer";
import alertaReducer from "./alertaReducer";

export default combineReducers({
  cartas: cartaReducer,
  alerta: alertaReducer,
});
