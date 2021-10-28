import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import moment from "moment";
import axios from "axios";

import { crearNuevaCartaAction } from "../actions/cartaActions";
import { mostrarAlerta, ocultarAlertaAction } from "../actions/alertaActions";

import Card from "@mui/material/Card";
import Input from "@mui/material/Input";
import {
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  FormControl,
} from "@mui/material";
import { InputLabel } from "@material-ui/core";

const NuevaCarta = ({ history }: any) => {
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const [roles, setRoles] = useState<any>([]);
  const pedirDatosRoles = async () => {
    const datosRoles = await axios.get<any>(
      "http://localhost:4000/inicio/roles/"
    );
    if (datosRoles.data) {
      setRoles(datosRoles.data.roles);
    }
  };

  const [equipos, setEquipos] = useState<any>([]);
  const pedirDatosEquipos = async () => {
    const datosEquipos = await axios.get<any>(
      "http://localhost:4000/inicio/equipos/"
    );
    if (datosEquipos.data) {
      setEquipos(datosEquipos.data.equipos);
    }
  };

  const [rarezas, setRarezas] = useState<any>([]);
  const pedirDatosRarezas = async () => {
    const datosRarezas = await axios.get<any>(
      "http://localhost:4000/inicio/rarezas/"
    );
    if (datosRarezas.data) {
      setRarezas(datosRarezas.data.rarezas);
    }
  };

  const [series, setSeries] = useState<any>([]);
  const pedirDatosSeries = async () => {
    const datosSeries = await axios.get<any>(
      "http://localhost:4000/inicio/fechas/"
    );
    if (datosSeries.data) {
      setSeries(datosSeries.data.fechas);
    }
  };

  const seriesmap = series.map((serie: any) =>
    moment(serie.fechaSalida).year()
  );

  useEffect(() => {
    pedirDatosEquipos();
    pedirDatosRarezas();
    pedirDatosRoles();
    pedirDatosSeries();
  }, []);

  //state del componente
  const [nombreJugador, guardarNombre] = useState("");
  const [apellidoJugador, guardarApellido] = useState("");
  const [equipoArray, guardarEquipo] = React.useState<any>([]);
  const [rarezaArray, guardarRareza] = React.useState<any>([]);
  const [rolJugadorArray, guardarRolJugador] = React.useState<any>([]);
  const [fechaSalidaArray, guardarFechaSalida] = React.useState<any>([]);
  const [foto, guardarFoto] = useState("");

  const handleChangeRol = (event: SelectChangeEvent) => {
    const {
      target: { value },
    } = event;
    guardarRolJugador(typeof value === "string" ? value.split(",") : value);
  };

  const handleChangeRareza = (event: SelectChangeEvent) => {
    const {
      target: { value },
    } = event;

    guardarRareza(typeof value === "string" ? value.split(",") : value);
  };

  const handleChangeSerie = (event: SelectChangeEvent) => {
    const {
      target: { value },
    } = event;

    guardarFechaSalida(typeof value === "string" ? value.split(",") : value);
  };

  const handleChangeEquipo = (event: SelectChangeEvent) => {
    const {
      target: { value },
    } = event;

    guardarEquipo(typeof value === "string" ? value.split(",") : value);
  };

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
  const agregarCarta = (carta: cartaInterface) => {
    dispatch(crearNuevaCartaAction(carta));
  };

  //cuando el usuario haga submit
  const submitNuevaCarta = (e: any) => {
    e.preventDefault();

    //validar formulario
    if (
      nombreJugador === "" ||
      apellidoJugador === "" ||
      equipoArray === "" ||
      rarezaArray === "" ||
      rolJugadorArray === "" ||
      fechaSalidaArray === ""
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

    const equipo = equipoArray[0];
    const rareza = rarezaArray[0];
    const rolJugador = rolJugadorArray[0];
    const fechaSalida = fechaSalidaArray[0];
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
            <FormControl sx={{ m: 1, width: 240 }}>
              <InputLabel style={styles.textCard} id="demo-multiple-name-label">
                Equipo
              </InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                value={equipoArray}
                onChange={handleChangeEquipo}
                MenuProps={MenuProps}
              >
                {equipos.map((elemento: any) => (
                  <MenuItem key={elemento} value={elemento.nombre}>
                    {elemento.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div style={styles.input}>
            <FormControl sx={{ m: 1, width: 240 }}>
              <InputLabel style={styles.textCard} id="demo-multiple-name-label">
                Rareza
              </InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                value={rarezaArray}
                onChange={handleChangeRareza}
                MenuProps={MenuProps}
              >
                {rarezas.map((elemento: any) => (
                  <MenuItem key={elemento} value={elemento.nombre}>
                    {elemento.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div style={styles.input}>
            <FormControl sx={{ m: 1, width: 240 }}>
              <InputLabel style={styles.textCard} id="demo-multiple-name-label">
                Rol Jugador
              </InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                value={rolJugadorArray}
                onChange={handleChangeRol}
                MenuProps={MenuProps}
              >
                {roles.map((rol: any) => (
                  <MenuItem key={rol} value={rol.nombre}>
                    {rol.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div style={styles.input}>
            <FormControl sx={{ m: 1, width: 240 }}>
              <InputLabel style={styles.textCard} id="demo-multiple-name-label">
                Serie
              </InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                value={fechaSalidaArray}
                onChange={handleChangeSerie}
                MenuProps={MenuProps}
              >
                {seriesmap.map((elemento: any) => (
                  <MenuItem key={elemento} value={elemento}>
                    {elemento}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
