import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Grid, Button, makeStyles } from "@material-ui/core";
import AlertComanda from "../../components/AlertComanda";

const useStyles = makeStyles((theme) => ({
  flexTop: {
    marginTop: "30px",
  },
  flexMargin: {
    margin: "30px 0",
  },
  contImg: {
    width: "100%",
    height: "220px",
    overflow: "hidden",
    borderRadius: "6px",
    backgroundPosition: "center",
    backgroundSize: "cover",
    position: "relative",
  },
}));

function ConfirmaCerrarMesa() {
  const classes = useStyles();
  const [localData, setLocalData] = useState(null);
  const { id } = useParams(); // Utiliza el ID para obtener los detalles del local desde tu fuente de datos

  useEffect(() => {
    fetch(`http://localhost:8080/comanda/local/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setLocalData(data);
      })
      .catch((error) => {
        console.error("Error al obtener datos del local:", error);
      });
  }, []);

  return (
    <>
      <Container disableGutters={true}>
        <div
          className={classes.contImg}
          style={{
            backgroundImage: localData ? `url("${localData.imagen}")` : "none",
          }}
        ></div>
      </Container>

      <Container>
        <Grid container justifyContent="center" className={classes.flexTop}>
          <Grid item>
            <AlertComanda
              sev="success"
              tit="Mesa cerrada"
              desc="Muchas gracias por elegir nuestro 
              local, daremos aviso a los empleados 
              para gestionar el cobro de los 
              consumos."
            />
          </Grid>
        </Grid>

        <Grid container justifyContent="center" className={classes.flexMargin}>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/search"
            >
              Ir al inicio
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default ConfirmaCerrarMesa;
