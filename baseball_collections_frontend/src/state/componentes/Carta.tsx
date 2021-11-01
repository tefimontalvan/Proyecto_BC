//Material UI.
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { styleInicio } from "../styles/styles";
import moment from "moment";
import { cartaInterface } from "../actions/cartaActions";
import { PropsWithoutRef } from "react";

interface CartaProps {
  carta: cartaInterface;
  redireccionarEdicion: (carta: cartaInterface) => void;
  confirmarEliminarCarta: (carta: cartaInterface) => void;
}

const Carta = ({
  carta,
  redireccionarEdicion,
  confirmarEliminarCarta,
}: PropsWithoutRef<CartaProps>) => {
  return (
    <Card key={carta.idCarta} sx={styleInicio.tarjeta}>
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
          sx={styleInicio.textCard}
        >
          {carta.nombreJugador} {carta.apellidoJugador}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={styleInicio.textCard}
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
};

export default Carta;
