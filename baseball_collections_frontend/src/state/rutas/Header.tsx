import React from "react";
import { Link } from "react-router-dom";
import BottomNavigation from "@mui/material/BottomNavigation";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";

const Header = () => (
  <BottomNavigation sx={{ bgcolor: "#173351" }}>
    <Box sx={style.itemsNav}>
      <Link to={"/"} style={style.text}>
        Baseball Colecciones
      </Link>
    </Box>
    <Box sx={{ margin: 1 }}>
      <Button color="error" variant="contained" size="large">
        <Link to={"/inicio/nueva"} style={style.text}>
          Agregar Carta &#43;
        </Link>
      </Button>
    </Box>
  </BottomNavigation>
);

const style = {
  text: {
    color: "#eeeee4",
  },
  itemsNav: {
    margin: 2,
    flexGrow: 1,
  },
};

export default Header;
