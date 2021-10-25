import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { editarCartaAction } from "../actions/cartaActions";
import { useHistory } from "react-router-dom";
import axios from "axios";

import Card from "@mui/material/Card";
import Input from "@mui/material/Input";
import { Button } from "@mui/material";

const EditarCarta = (props: any) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const ariaLabel = { "aria-label": "description" };

  interface cartaInterface {
    idCarta: number;
    nombreJugador: string;
    apellidoJugador: string;
    equipo: string;
    rareza: string;
    rolJugador: string;
    fechaSalida: string;
    foto: string;
  }

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

  const pedirDatos = async () => {
    const cartaSeleccionada = await axios.get<cartaInterface[]>(
      "http://localhost:4000/inicio/cartas/" + props.match.params.id
    );

    //AGREGAR COMENTADO CUANDO DEVUELVA CARTAS
    setCartaActual(cartaSeleccionada.data);
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

    history.push("/");
  };

  return (
    <div style={styles.contenedor}>
      <Card sx={styles.card}>
        <h2 style={styles.textCard}>Editar Carta</h2>

        <form onSubmit={submitEditarCarta}>
          <div style={styles.input}>
            <label style={styles.textCard}>Nombre Jugador</label>
            <Input
              placeholder="Nombre Jugador"
              inputProps={ariaLabel}
              type="text"
              name="nombreJugador"
              value={cartaActual?.nombreJugador}
              onChange={onChangeFormulario}
            />
          </div>

          <div style={styles.input}>
            <label style={styles.textCard}>Apellido Jugador</label>
            <Input
              placeholder="Apellido Jugador"
              inputProps={ariaLabel}
              type="text"
              name="apellidoJugador"
              value={cartaActual?.apellidoJugador}
              onChange={onChangeFormulario}
            />
          </div>

          <div style={styles.input}>
            <label style={styles.textCard}>Equipo</label>
            <Input
              placeholder="Equipo"
              inputProps={ariaLabel}
              type="text"
              name="equipo"
              value={cartaActual?.equipo}
              onChange={onChangeFormulario}
            />
          </div>

          <div style={styles.input}>
            <label style={styles.textCard}>Rareza</label>
            <Input
              placeholder="Rareza"
              inputProps={ariaLabel}
              type="text"
              name="rareza"
              value={cartaActual?.rareza}
              onChange={onChangeFormulario}
            />
          </div>

          <div style={styles.input}>
            <label style={styles.textCard}>Rol Jugador</label>
            <Input
              placeholder="Rol Jugador"
              inputProps={ariaLabel}
              type="text"
              name="rolJugador"
              value={cartaActual?.rolJugador}
              onChange={onChangeFormulario}
            />
          </div>

          <div style={styles.input}>
            <label style={styles.textCard}>Fecha Salida</label>
            <Input
              placeholder="Fecha Salida"
              inputProps={ariaLabel}
              type="text"
              name="fechaSalida"
              value={cartaActual?.fechaSalida}
              onChange={onChangeFormulario}
            />
          </div>

          <div style={styles.input}>
            <label style={styles.textCard}>Foto</label>
            <Input
              placeholder="Foto"
              inputProps={ariaLabel}
              type="text"
              name="foto"
              value={cartaActual?.foto}
              onChange={onChangeFormulario}
            />
          </div>
          <div style={styles.button}>
            <Button
              color="success"
              variant="contained"
              size="large"
              type="submit"
            >
              Guardar Cambios
            </Button>
          </div>
        </form>
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

export default EditarCarta;
