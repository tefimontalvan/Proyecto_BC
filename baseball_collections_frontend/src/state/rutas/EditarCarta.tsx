import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { editarCartaAction } from "../actions/cartaActions";
import axios from "axios";
import moment from "moment";
import Formulario from "../componentes/Formulario";

const EditarCarta = (props: any) => {
  const dispatch = useDispatch();

  const [cartaActual, setCartaActual] = useState<any>({
    idCarta: 0,
    nombreJugador: "",
    apellidoJugador: "",
    equipo: "",
    rareza: "",
    rolJugador: "",
    fechaSalida: "",
    foto: "",
  });

  //PIDE LOS DATOS DE LA CARTA ACTUAL POR ID.
  const pedirDatos = async () => {
    const cartaSeleccionada = await axios.get<any>(
      "http://localhost:4000/inicio/cartas/" + props.match.params.id
    );

    const cartaData = cartaSeleccionada.data;
    const momentFecha = moment(cartaData.fechaSalida).year();
    //AGREGAR COMENTADO CUANDO DEVUELVA CARTAS
    setCartaActual({
      idCarta: cartaData.idCarta,
      nombreJugador: cartaData.nombreJugador,
      apellidoJugador: cartaData.apellidoJugador,
      equipo: cartaData.equipo,
      rareza: cartaData.rareza,
      rolJugador: cartaData.rolJugador,
      fechaSalida: momentFecha,
      foto: cartaData.foto,
    });
  };

  useEffect(() => {
    pedirDatos();
  }, []);

  // Leer los datos del formulario
  const onChangeFormulario = (e: any) => {
    setCartaActual({
      ...cartaActual,
      [e.target.name]: e.target.value,
    });
  };

  const submitEditarCarta = (e: any) => {
    e.preventDefault();
    dispatch(editarCartaAction(cartaActual));
  };

  return (
    <Formulario
      cartaActual={cartaActual}
      submitFormulario={submitEditarCarta}
      onChangeFormulario={onChangeFormulario}
    />
  );
};

export default EditarCarta;
