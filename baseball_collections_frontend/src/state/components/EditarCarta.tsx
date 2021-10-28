import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { editarCartaAction } from "../actions/cartaActions";
import { useHistory } from "react-router-dom";
import axios from "axios";
import moment from "moment";

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

const EditarCarta = (props: any) => {
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

  const [equipos, setEquipos] = useState<any>({
    nombre: "",
  });
  const pedirDatosEquipos = async () => {
    const datosEquipos = await axios.get<any>(
      "http://localhost:4000/inicio/equipos/"
    );
    console.log({ datosEquipos });
    if (datosEquipos.data) {
      setEquipos(datosEquipos.data);
    }
  };

  console.log({ equipos });

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

  console.log({ cartaActual });

  const [equipo, setEquipo] = useState<any>(cartaActual.equipo);
  const [rol, setRol] = useState<any>(cartaActual.rolJugador);
  const [rareza, setRareza] = useState<any>(cartaActual.rareza);
  const [serie, setSerie] = useState<any>(
    moment(cartaActual.fechaActual).year()
  );

  useEffect(() => {
    for (let i = 0; i < equipos.length; i++) {
      if (cartaActual.equipo === equipos[i].nombre) {
        setEquipo(equipos[i]);
      }
    }
    for (let i = 0; i < roles.length; i++) {
      if (cartaActual.rolJugador === roles[i].nombre) {
        setRol(roles[i]);
      }
    }
    for (let i = 0; i < rarezas.length; i++) {
      if (cartaActual.rareza === rarezas[i].nombre) {
        setRareza(rarezas[i]);
      }
    }
    for (let i = 0; i < series.length; i++) {
      if (cartaActual.fechaActual === series[i].fechaSalida) {
        setSerie(series[i]);
      }
    }
  }, []);

  console.log({ cartaActual });

  // Leer los datos del formulario
  const onChangeFormulario = (e: SelectChangeEvent) => {
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
              //onChange={onChangeFormulario}
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
              //onChange={onChangeFormulario}
            />
          </div>

          {/*           <div style={styles.input}>
            <label style={styles.textCard}>Equipo</label>
            <Input
              placeholder="Equipo"
              inputProps={ariaLabel}
              type="text"
              name="equipo"
              value={cartaActual?.equipo}
              onChange={onChangeFormulario}
            />
          </div> */}

          <div style={styles.input}>
            <FormControl sx={{ m: 1, width: 240 }}>
              <InputLabel style={styles.textCard} id="demo-multiple-name-label">
                Equipo
              </InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                value={equipo}
                onChange={onChangeFormulario}
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
            <label style={styles.textCard}>Rareza</label>
            <Input
              placeholder="Rareza"
              inputProps={ariaLabel}
              type="text"
              name="rareza"
              value={cartaActual?.rareza}
              //onChange={onChangeFormulario}
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
              //onChange={onChangeFormulario}
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
              //onChange={onChangeFormulario}
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
              //onChange={onChangeFormulario}
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
