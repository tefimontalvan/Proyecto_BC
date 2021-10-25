import React, { Fragment, useEffect, useState } from "react";
import Swal from "sweetalert2";
import moment from "moment";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { obtenerCartasAction } from "../actions/cartaActions";
import { useHistory } from "react-router-dom";
import { borrarCartaAction, obtenerCartaEditar } from "../actions/cartaActions";
import { RootStore } from "..";

//Material UI.
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
//import SearchIcon from '@mui/icons-material/Search';

const Cartas = () => {
  interface stateInterface {
    cartas: string[];
    loading?: boolean;
    error?: boolean;
  }
  //const error = false; //useSelector((state) => state.cartas.error);
  const error = useSelector<stateInterface>((state) => state.error);

  const dispatch = useDispatch();

  const history = useHistory(); //habilitar history para redireccion
  //((state) => state.cartas.cartas);

  useEffect(() => {
    //Consulta la API
    const cargarCartas = () => dispatch(obtenerCartasAction());
    cargarCartas();
  }, [dispatch]);

  //AGREGAR COMENTADO CUANDO DEVUELVA CARTAS.
  const listaCartas = useSelector(
    (state: RootStore) => state.cartas.cartas.cartas
  );

  //Confirmar si desea eliminarlo
  const confirmarEliminarCarta = (carta: cartaInterface) => {
    //preguntar al usuario
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Una carta que se elimina no se puede recuperar.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        // pasarlo al action
        dispatch(borrarCartaAction(carta));
      }
    });
  };

  interface cartaInterface {
    idCarta: number;
    nombreJugador: string;
    apellidoJugador: string;
    equipo: string;
    rareza: string;
    rolJugador: string;
    fechaSalida: Date;
    foto: string;
    activo: boolean;
  }

  //funcion que redirije de forma programada
  const redireccionarEdicion = (carta: cartaInterface) => {
    dispatch(obtenerCartaEditar(carta));
    history.push("/inicio/cartas/" + carta.idCarta);
  };

  const [nombreJugadorABuscar, guardarNombreJugador] = useState("");

  let cartaEncontrada;

  /* useEffect(() => {
    //Consulta la API
    const buscarPorNombre = (nombreJugadorABuscar: string) =>
      dispatch(buscarPorNombreAction(nombreJugadorABuscar));

    buscarPorNombre(nombreJugadorABuscar);
  }, [cartaEncontrada]);
 */
  const filtrarCarta = (valorInput: string) => {
    cartaEncontrada = listaCartas.filter((cartaE: any) =>
      cartaE.nombreJugador.includes(valorInput)
    );

    const cartaE = cartaEncontrada[0];
    console.log({ cartaE });
    if (cartaE) {
      return (
        <Card sx={style.tarjeta}>
          <CardMedia
            component="img"
            alt="foto jugador"
            height="140"
            image={cartaE.foto}
          />

          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={style.textCard}
            >
              {cartaE.nombreJugador} {cartaE.apellidoJugador}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={style.textCard}
            >
              <p>Rol: {cartaE.rolJugador}</p>
              <p>Equipo: {cartaE.equipo}</p>
              <p>Rareza: {cartaE.rareza}</p>
              <p>Serie: {cartaE.fechaSalida}</p>
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              color="success"
              variant="outlined"
              size="small"
              onClick={() => redireccionarEdicion(cartaE)}
            >
              Editar
            </Button>
            <Button
              color="error"
              variant="outlined"
              size="small"
              onClick={() => confirmarEliminarCarta(cartaE)}
            >
              Eliminar
            </Button>
          </CardActions>
        </Card>
      );
    }
  };

  return (
    <Fragment>
      <h2 style={style.text}>Listado de Cartas</h2>

      <InputBase
        style={style.input}
        value={nombreJugadorABuscar}
        sx={{ ml: 1, flex: 1, color: "#d32f2f" }}
        placeholder="Buscar por nombre"
        inputProps={{ "aria-label": "search google maps" }}
        onChange={(e) => guardarNombreJugador(e.target.value)}
      />
      <IconButton
        type="submit"
        sx={{ p: "10px", color: "#d32f2f" }}
        aria-label="search"
        onClick={(e) => filtrarCarta(nombreJugadorABuscar)}
      >
        <SearchIcon />
      </IconButton>

      <div style={style.contenedor as React.CSSProperties}>
        {listaCartas?.map((carta: any) => {
          return (
            <Card sx={style.tarjeta}>
              <CardMedia
                component="img"
                alt="foto jugador"
                height="140"
                image={carta.foto}
              />

              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={style.textCard}
                >
                  {carta.nombreJugador} {carta.apellidoJugador}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={style.textCard}
                >
                  <p>Rol: {carta.rolJugador}</p>
                  <p>Equipo: {carta.equipo}</p>
                  <p>Rareza: {carta.rareza}</p>
                  <p>Serie: {moment(carta.fechaSalida).year()}</p>
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  color="success"
                  variant="outlined"
                  size="small"
                  onClick={() => redireccionarEdicion(carta)}
                >
                  Editar
                </Button>
                <Button
                  color="error"
                  variant="outlined"
                  size="small"
                  onClick={() => confirmarEliminarCarta(carta)}
                >
                  Eliminar
                </Button>
              </CardActions>
            </Card>
          );
        })}

        {error ? <p>Hubo un error</p> : null}
      </div>
    </Fragment>
  );
};

const style = {
  tarjeta: {
    width: 245,
    bgcolor: "#173351",
    borderColor: "primary.main",
    display: "grid",
    margin: 5,
  },
  input: {
    marginLeft: 40,
  },
  contenedor: {
    display: "flex",
    width: "100%",
    flexWrap: "wrap",
  },
  card: {
    objectFit: "cover",
  },
  text: {
    color: "#eeeee4",
    justifyContent: "center",
    display: "flex",
  },
  textCard: {
    color: "#eeeee4",
  },
};
export default Cartas;
