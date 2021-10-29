const styleFormulario = {
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

const styleInicio = {
  refrescar: {
    justifyContent: "flexEnd",
  },
  tarjeta: {
    width: 245,
    bgcolor: "#173351",
    borderColor: "primary.main",
    display: "grid",
    margin: 5,
    "&:hover": {
      boxShadow: "0 10px 15px 0 rgb(45, 58, 72, 1)",
    },
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

export { styleFormulario, styleInicio };
