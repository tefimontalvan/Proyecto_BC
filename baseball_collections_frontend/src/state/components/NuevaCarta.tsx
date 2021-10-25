import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
//actions de Redux

import { crearNuevaCartaAction } from "../actions/cartaActions";
import { mostrarAlerta, ocultarAlertaAction } from "../actions/alertaActions";
//import { RootStore } from "..";

import Card from "@mui/material/Card";
import Input from "@mui/material/Input";
import { Button } from "@mui/material";

const NuevaCarta = ({ history }: any) => {
  //state del componente
  const [nombreJugador, guardarNombre] = useState("");
  const [apellidoJugador, guardarApellido] = useState("");
  const [equipo, guardarEquipo] = useState("");
  const [rareza, guardarRareza] = useState("");
  const [rolJugador, guardarRolJugador] = useState("");
  const [fechaSalida, guardarFechaSalida] = useState("");
  const [foto, guardarFoto] = useState("");

  //utilizar use dispatch y te crea una funcion
  const dispatch = useDispatch();

  interface stateInterface {
    cartas: string[];
    loading?: boolean;
    error?: boolean;
  }

  //acceder al state del store y pedir algo almacenado en el store
  //AGREGAR COMENTADO CUANDO DEVUELVA CARTAS.
  const cargando = useSelector<stateInterface>((state) => state.loading); //O useSelector((state: RootStore) => state.loading);
  const error = useSelector<stateInterface>((state) => state.error); //O useSelector((state: RootStore) => state.error);
  /* const alerta = useSelector((state: RootStore) => state.alerta); */

  interface cartaInterface {
    nombreJugador: string;
    apellidoJugador: string;
    equipo: string;
    rareza: string;
    rolJugador: string;
    fechaSalida: string;
    foto: string;
  }

  const ariaLabel = { "aria-label": "description" };

  //mandar llamar el action de cartaAction
  const agregarCarta = (carta: cartaInterface) =>
    dispatch(crearNuevaCartaAction(carta));

  //cuando el usuario haga submit
  const submitNuevaCarta = (e: any) => {
    e.preventDefault();

    //validar formulario
    if (
      nombreJugador === "" ||
      apellidoJugador === "" ||
      equipo === "" ||
      rareza === "" ||
      rolJugador === "" ||
      fechaSalida === ""
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

    // crear el nueva carta
    agregarCarta({
      nombreJugador,
      apellidoJugador,
      equipo,
      rareza,
      rolJugador,
      fechaSalida,
      foto,
    });

    //redireccionar
    history.push("/");
  };

  return (
    <div style={styles.contenedor}>
      <Card sx={styles.card}>
        <h2 style={styles.textCard}>Agregar Nueva Carta</h2>
        {/* {alerta ? <p> {alerta.msg} </p> : null} */}

        <form onSubmit={submitNuevaCarta}>
          <div style={styles.input}>
            <label style={styles.textCard}>Nombre Jugador</label>
            <Input
              placeholder="Nombre Jugador"
              inputProps={ariaLabel}
              type="text"
              value={nombreJugador}
              onChange={(e) => guardarNombre(e.target.value)}
            />
          </div>

          <div style={styles.input}>
            <label style={styles.textCard}>Apellido Jugador</label>
            <Input
              placeholder="Apellido Jugador"
              inputProps={ariaLabel}
              type="text"
              value={apellidoJugador}
              onChange={(e) => guardarApellido(e.target.value)}
            />
          </div>

          <div style={styles.input}>
            <label style={styles.textCard}>Equipo</label>
            <Input
              placeholder="Equipo"
              inputProps={ariaLabel}
              type="text"
              value={equipo}
              onChange={(e) => guardarEquipo(e.target.value)}
            />
          </div>

          <div style={styles.input}>
            <label style={styles.textCard}>Rareza</label>
            <Input
              placeholder="Rareza"
              inputProps={ariaLabel}
              type="text"
              value={rareza}
              onChange={(e) => guardarRareza(e.target.value)}
            />
          </div>

          <div style={styles.input}>
            <label style={styles.textCard}>Rol Jugador</label>
            <Input
              placeholder="Rol Jugador"
              inputProps={ariaLabel}
              type="text"
              value={rolJugador}
              onChange={(e) => guardarRolJugador(e.target.value)}
            />
          </div>

          <div style={styles.input}>
            <label style={styles.textCard}>Fecha Salida</label>
            <Input
              placeholder="Fecha Salida"
              inputProps={ariaLabel}
              type="text"
              value={fechaSalida}
              onChange={(e) => guardarFechaSalida(e.target.value)}
            />
          </div>

          <div style={styles.input}>
            <label style={styles.textCard}>Foto</label>
            <Input
              placeholder="Foto"
              inputProps={ariaLabel}
              type="text"
              value={foto}
              onChange={(e) => guardarFoto(e.target.value)}
            />
          </div>
          <div style={styles.button}>
            <Button
              color="success"
              variant="contained"
              size="large"
              type="submit"
            >
              Agregar
            </Button>
          </div>
        </form>

        {cargando ? <p style={styles.msg}>Cargando...</p> : null}
        {error ? <p style={styles.msg}>Hubo un error</p> : null}
      </Card>
    </div>
  );
};

const styles = {
  card: {
    borderColor: "primary.main",
    margin: 5,
    width: 500,
    bgcolor: "#173351",
    padding: 2,
  },
  textCard: {
    color: "#eeeee4",
    justifyContent: "center",
    display: "flex",
    marginTop: 20,
  },
  input: {
    justifyContent: "center",
    display: "grid",
  },
  contenedor: {
    display: "flex",
    justifyContent: "center",
  },
  button: {
    display: "flex",
    justifyContent: "center",
    marginTop: 20,
  },
  msg: {
    backgroundColor: "#d32f2f",
  },
};

export default NuevaCarta;
