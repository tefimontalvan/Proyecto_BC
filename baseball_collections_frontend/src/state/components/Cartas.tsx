import React, { Fragment, useEffect, useState } from "react";
import Swal from "sweetalert2";
import moment from "moment";
import { useHistory } from "react-router-dom";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { obtenerCartasAction } from "../actions/cartaActions";
import {
  borrarCartaAction,
  obtenerCartaEditar,
  buscarPorNombreAction,
} from "../actions/cartaActions";
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

const Cartas = () => {
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

  const dispatch = useDispatch();

  const history = useHistory(); //habilitar history para redireccion

  //Obtiene las cartas del backend y actualiza el state.cartas
  useEffect(() => {
    //Consulta la API
    const cargarCartas = () => dispatch(obtenerCartasAction());
    cargarCartas();
  }, [dispatch]);

  //ELIMINAR CARTA.
  //Confirmar si desea eliminarlo
  const confirmarEliminarCarta = (carta: cartaInterface) => {
    //preguntar al usuario
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Una carta que se elimina no se puede recuperar.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2e7d32",
      cancelButtonColor: "#d32f2f",
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        // pasarlo al action
        dispatch(borrarCartaAction(carta));
        //Si uso el history se pierden los cambios en el redux de eliminarCarta.
        //history.go(0);
      }
    });
  };

  //EDITAR CARTA.
  //funcion que redirije de forma programada
  const redireccionarEdicion = (carta: cartaInterface) => {
    dispatch(obtenerCartaEditar(carta));
    history.push("/inicio/cartas/" + carta.idCarta);
  };

  //OBTENER CARTAS.
  //Obtiene las cartas del state
  const cartasState = useSelector(
    (state: RootStore) => state.cartas.cartas.cartas
  );

  //useState para devolver todas las cartas en el front o solo las especificadas por nombreJugador.
  const [listaCartas, setListaCartas] = useState<cartaInterface[]>(cartasState);

  //Cuando el state pasa de undefined a el listado de cartas, se asigna a la variable "listaCartas" para mostrarlo en el front.
  useEffect(() => {
    setListaCartas(cartasState);
  }, [cartasState]);

  //BUSCAR CARTA/S.
  //Valor de la carta/s buscada/s que si cambia ejecuta el action de buscarCarta.
  const [cartaE, setCartaE] = useState<cartaInterface[]>(cartasState);

  const [nombreJugadorABuscar, guardarNombreJugador] = useState("");

  useEffect(() => {
    const buscarPorNombre = (carta: cartaInterface[]) =>
      dispatch(buscarPorNombreAction(carta));

    buscarPorNombre(cartaE);
  }, [cartaE]);

  const filtrarCarta = (valorInput: string) => {
    const cartaEncontrada = listaCartas?.filter((cartaEncontrada: any) =>
      new RegExp(valorInput, "i").test(cartaEncontrada.nombreJugador)
    );
    setCartaE(cartaEncontrada);
    setListaCartas(cartaEncontrada);
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
            <Card key={carta.idCarta} sx={style.tarjeta}>
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
