import React, { useState } from "react";
import Swal from "sweetalert2";
import moment from "moment";
import Formulario from "../componentes/Formulario";

//Redux.
import { crearNuevaCartaAction } from "../actions/cartaActions";
import { mostrarAlerta, ocultarAlertaAction } from "../actions/alertaActions";
import { RootStore } from "..";
import { useDispatch, useSelector } from "react-redux";

const NuevaCarta = ({ history }: any) => {
  const cartasState = useSelector(
    (state: RootStore) => state.cartas.cartas.cartas
  );

  //utilizar use dispatch y te crea una funcion
  const dispatch = useDispatch();

  interface cartaInterface {
    nombreJugador: string;
    apellidoJugador: string;
    equipo: string;
    rareza: string;
    rolJugador: string;
    fechaSalida: string;
    foto: string;
  }

  const [cartaActual, setCartaActual] = useState<any>({
    nombreJugador: "",
    apellidoJugador: "",
    equipo: "",
    rareza: "",
    rolJugador: "",
    fechaSalida: "",
    foto: "",
  });

  const onChangeFormulario = (e: any) => {
    setCartaActual({
      ...cartaActual,
      [e.target.name]: e.target.value,
    });
  };

  //mandar llamar el action de cartaAction
  const agregarCarta = (carta: cartaInterface) => {
    dispatch(crearNuevaCartaAction(carta));
  };

  //cuando el usuario haga submit
  const submitNuevaCarta = (e: any) => {
    e.preventDefault();

    //validar formulario
    if (
      cartaActual.nombreJugador === "" ||
      cartaActual.apellidoJugador === "" ||
      cartaActual.equipo === "" ||
      cartaActual.rareza === "" ||
      cartaActual.rolJugador === "" ||
      cartaActual.fechaSalida === ""
    ) {
      const alerta = {
        msg: "Complete todos los campos",
      };
      dispatch(mostrarAlerta(alerta));
      Swal.fire({
        icon: "error",
        title: "Hubo un error",
        text: "Complete todos los campos",
      });

      return;
    }

    //si no hay errores
    dispatch(ocultarAlertaAction());

    //verificacion de si la carta que quiere agregar el usuario ya existe.
    let yaExiste = false;
    cartasState.map((carta: any) => {
      if (
        cartaActual.nombreJugador === carta.nombreJugador &&
        cartaActual.apellidoJugador === carta.apellidoJugador &&
        cartaActual.equipo === carta.equipo &&
        cartaActual.rareza === carta.rareza &&
        cartaActual.rolJugador === carta.rolJugador &&
        cartaActual.fechaSalida === moment(carta.fechaSalida).year()
      ) {
        const alerta = {
          msg: "La carta que quiere agregar ya existe",
        };
        dispatch(mostrarAlerta(alerta));
        Swal.fire({
          icon: "error",
          title: "Hubo un error",
          text: "La carta que quiere agregar ya existe",
        });

        yaExiste = true;

        return;
      }
    });

    //si no hay errores
    dispatch(ocultarAlertaAction());

    // crear el nueva carta
    if (!yaExiste) {
      agregarCarta(cartaActual);
    }
  };

  return (
    <Formulario
      cartaActual={cartaActual}
      submitFormulario={submitNuevaCarta}
      onChangeFormulario={onChangeFormulario}
    />
  );
};

export default NuevaCarta;
