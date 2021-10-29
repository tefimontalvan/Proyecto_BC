import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import moment from "moment";
import axios from "axios";
import { RootStore } from "..";
import { styleFormulario } from "../styles/styles";

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
  const cartasState = useSelector(
    (state: RootStore) => state.cartas.cartas.cartas
  );

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

    //verificacion de si la carta que quiere agregar el usuario ya existe.
    let yaExiste = false;
    cartasState.map((carta: any) => {
      if (
        nombreJugador === carta.nombreJugador &&
        apellidoJugador === carta.apellidoJugador &&
        equipo === carta.equipo &&
        rareza === carta.rareza &&
        rolJugador === carta.rolJugador &&
        fechaSalida === moment(carta.fechaSalida).year()
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
      agregarCarta({
        nombreJugador,
        apellidoJugador,
        equipo,
        rareza,
        rolJugador,
        fechaSalida,
        foto,
      });
    }
  };

  return (
    <div style={styleFormulario.contenedor}>
      <Card sx={styleFormulario.card}>
        <h2 style={styleFormulario.textCard}>Agregar Nueva Carta</h2>

        <form onSubmit={submitNuevaCarta}>
          <div style={styleFormulario.input}>
            <label style={styleFormulario.textCard}>Nombre Jugador</label>
            <Input
              placeholder="Nombre Jugador"
              inputProps={ariaLabel}
              type="text"
              value={nombreJugador}
              onChange={(e) => guardarNombre(e.target.value)}
            />
          </div>

          <div style={styleFormulario.input}>
            <label style={styleFormulario.textCard}>Apellido Jugador</label>
            <Input
              placeholder="Apellido Jugador"
              inputProps={ariaLabel}
              type="text"
              value={apellidoJugador}
              onChange={(e) => guardarApellido(e.target.value)}
            />
          </div>

          <div style={styleFormulario.input}>
            <FormControl sx={{ m: 1, width: 240 }}>
              <InputLabel
                style={styleFormulario.textCard}
                id="demo-multiple-name-label"
              >
                Equipo
              </InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                value={equipoArray}
                onChange={handleChangeEquipo}
              >
                {equipos.map((elemento: any) => (
                  <MenuItem key={elemento} value={elemento.nombre}>
                    {elemento.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div style={styleFormulario.input}>
            <FormControl sx={{ m: 1, width: 240 }}>
              <InputLabel
                style={styleFormulario.textCard}
                id="demo-multiple-name-label"
              >
                Rareza
              </InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                value={rarezaArray}
                onChange={handleChangeRareza}
              >
                {rarezas.map((elemento: any) => (
                  <MenuItem key={elemento} value={elemento.nombre}>
                    {elemento.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div style={styleFormulario.input}>
            <FormControl sx={{ m: 1, width: 240 }}>
              <InputLabel
                style={styleFormulario.textCard}
                id="demo-multiple-name-label"
              >
                Rol Jugador
              </InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                value={rolJugadorArray}
                onChange={handleChangeRol}
              >
                {roles.map((rol: any) => (
                  <MenuItem key={rol} value={rol.nombre}>
                    {rol.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div style={styleFormulario.input}>
            <FormControl sx={{ m: 1, width: 240 }}>
              <InputLabel
                style={styleFormulario.textCard}
                id="demo-multiple-name-label"
              >
                Serie
              </InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                value={fechaSalidaArray}
                onChange={handleChangeSerie}
              >
                {seriesmap.map((elemento: any) => (
                  <MenuItem key={elemento} value={elemento}>
                    {elemento}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div style={styleFormulario.input}>
            <label style={styleFormulario.textCard}>Foto</label>
            <Input
              placeholder="Foto"
              inputProps={ariaLabel}
              type="text"
              value={foto}
              onChange={(e) => guardarFoto(e.target.value)}
            />
          </div>
          <div style={styleFormulario.button}>
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
      </Card>
    </div>
  );
};

export default NuevaCarta;
