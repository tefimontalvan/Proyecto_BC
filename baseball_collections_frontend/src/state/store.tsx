import { createStore, applyMiddleware, compose } from "redux";
import reducers from "./reducers/index";
import thunk from "redux-thunk";

export const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
    typeof (window as any) === "object" &&
      typeof (window as any).__REDUX_DEVTOOLS_EXTENSION__ !== "undefined"
      ? (window as any).__REDUX_DEVTOOLS_EXTENSION__()
      : undefined
  )
);

export type RootStore = ReturnType<typeof reducers>;
