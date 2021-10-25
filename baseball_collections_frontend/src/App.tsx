import React from "react";
import Header from "./state/components/Header";
import Cartas from "./state/components/Cartas";
import NuevaCarta from "./state/components/NuevaCarta";
import EditarCarta from "./state/components/EditarCarta";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./index.css";

import { Provider } from "react-redux";
import { store } from "./state";

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Header />

        <div>
          <Switch>
            <Route exact path="/" component={Cartas} />
            <Route exact path="/inicio/nueva" component={NuevaCarta} />
            <Route exact path="/inicio/cartas/:id" component={EditarCarta} />
          </Switch>
        </div>
      </Provider>
    </Router>
  );
}

export default App;
