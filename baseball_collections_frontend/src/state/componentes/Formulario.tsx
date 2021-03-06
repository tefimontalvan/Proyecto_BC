import Card from "@mui/material/Card";
import Input from "@mui/material/Input";
import { Button, MenuItem, Select, FormControl } from "@mui/material";
import { InputLabel } from "@material-ui/core";
import { cartaInterface } from "../actions/cartaActions";
import axios from "axios";
import { useState, useEffect } from "react";
import moment from "moment";

import { PropsWithoutRef } from "react";
import { styleFormulario } from "../styles/styles";

interface CartaProps {
  cartaActual: cartaInterface;
  submitFormulario: (e: any) => void;
  onChangeFormulario: (e: any) => void;
}

const Formulario = ({
  cartaActual,
  submitFormulario,
  onChangeFormulario,
}: PropsWithoutRef<CartaProps>) => {
  const ariaLabel = { "aria-label": "description" };

  //PIDE PROPIEDADES DE LA CARTA.
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

  return (
    <div style={styleFormulario.contenedor}>
      <Card sx={styleFormulario.card}>
        <h2 style={styleFormulario.textCard}>Agregar Nueva Carta</h2>

        <form onSubmit={submitFormulario}>
          <div style={styleFormulario.input}>
            <label style={styleFormulario.textCard}>Nombre Jugador</label>
            <Input
              placeholder="Nombre Jugador"
              inputProps={ariaLabel}
              type="text"
              name="nombreJugador"
              value={cartaActual?.nombreJugador}
              onChange={onChangeFormulario}
            />
          </div>

          <div style={styleFormulario.input}>
            <label style={styleFormulario.textCard}>Apellido Jugador</label>
            <Input
              placeholder="Apellido Jugador"
              inputProps={ariaLabel}
              type="text"
              name="apellidoJugador"
              value={cartaActual?.apellidoJugador}
              onChange={onChangeFormulario}
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
                name="equipo"
                value={cartaActual.equipo}
                onChange={onChangeFormulario}
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
                name="rareza"
                value={cartaActual.rareza}
                onChange={onChangeFormulario}
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
                name="rolJugador"
                value={cartaActual.rolJugador}
                onChange={onChangeFormulario}
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
                name="fechaSalida"
                value={cartaActual.fechaSalida}
                onChange={onChangeFormulario}
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
              name="foto"
              value={cartaActual?.foto}
              onChange={onChangeFormulario}
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

export default Formulario;
