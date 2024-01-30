import { useParams, useLocation, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  makeStyles,
  Fab,
} from "@material-ui/core";
import ArrowBack from "@material-ui/icons/ArrowBack";
import DialogInfo from "../../components/DialogInfo";

const useStyles = makeStyles((theme) => ({
  contImg: {
    width: "100%",
    //height: "220px",
    overflow: "hidden",
    backgroundPosition: "center",
    backgroundSize: "cover", // Asegura que la imagen se ajuste al contenedor
    position: "relative", // Agregado para posicionar elementos hijos de manera absoluta
  },
  flexTop: {
    marginTop: "15px",
  },
  flexMargin: {
    margin: "15px 0",
  },
  flexEnd: {
    paddingBottom: "70px",
  },
}));

function MenuItem() {
  const { productoId } = useParams();
  const { search } = useLocation(); 
  const localId = new URLSearchParams(search).get("localId"); // Obtén el localId de los parámetros de la URL
  const [producto, setProducto] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    console.log("ID del producto:", productoId);
    console.log("ID del local:", localId); // Utiliza localId según sea necesario
    // console.log("ID del producto:", id);
    // Asegúrate de que productoId es un número antes de hacer la solicitud
    if (!isNaN(productoId)) {
      fetch(`http://localhost:8080/comanda/producto/${productoId}`)
        .then((response) => response.json())
        .then((data) => {
          setProducto(data);
        })
        .catch((error) => {
          console.error("Error al obtener datos:", error);
        });
    }
  }, [productoId, localId]);

  return (
    <>
      <Container disableGutters={true}>
        <Grid container alignContent="flex-end" className={classes.flexMargin}>
          <Fab
            size="small"
            color="primary"
            aria-label="arrow"
            component={Link}
            to={`/items/${localId}`}            
          >
            <ArrowBack />
          </Fab>
        </Grid>
      </Container>

      <Container disableGutters={true}>
        <div className={classes.contImg}>
          <div className="margin5">
            {producto &&
              producto.imagen && ( // Verifica si hay datos y una URL de imagen
                <img
                  className={classes.contImg}
                  src={producto.imagen}
                  alt="Local"
                  style={{ width: "100%", borderRadius: "10px" }}
                />
              )}
          </div>
        </div>
      </Container>

      <Container maxWidth="sm">
        <Grid container alignContent="flex-end" className={classes.flexMargin}>
          <Grid item xs={12}>
            {producto && producto.nombre && (
              <Typography component="h2" variant="h5" className="bold">
                {producto.nombre}
              </Typography>
            )}
          </Grid>
        </Grid>

        <Grid container alignContent="flex-end" className={classes.flexMargin}>
          <Grid item xs={12}>
            {producto && producto.descripcion && (
              <Typography component="h3" variant="subtitle1">
                {producto.descripcion}
              </Typography>
            )}
          </Grid>
        </Grid>

        <Grid container alignContent="flex-end" className={classes.flexMargin}>
          <Grid item xs={12}>
            {producto && producto.precio && (
              <Typography component="h4" variant="h6" className="bold">
                ${producto.precio}
              </Typography>
            )}
          </Grid>
        </Grid>

        <Grid container justifyContent="center" className={classes.flexMargin}>
          <Grid item>
            <DialogInfo
              mensaje="EMPEZAR A PEDIR"
              pregunta={
                <>
                  ¿Ya estás en el local?
                  <br />
                  Si es así, empezá a pedir desde tu mesa
                </>
              }
              btnIzquierda="No"
              btnDerecha="Sí, ya llegué"
              hrefIzquierda=""
              hrefDerecha={`/seleccionar-mesa/${localId}`}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default MenuItem;
