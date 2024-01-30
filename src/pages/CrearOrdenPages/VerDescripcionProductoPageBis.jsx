import { useParams, useLocation, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,  
  makeStyles,  
  Fab,
} from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ArrowBack from "@material-ui/icons/ArrowBack";

const useStyles = makeStyles((theme) => ({
  contImg: {
    width: "100%",
    //height: "220px",
    overflow: "hidden",
    backgroundPosition: "center",
    backgroundSize: "cover", // Asegura que la imagen se ajuste al contenedor
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
  total: {
    marginRight: "20px",
    borderRadius: "30px",
    backgroundColor: theme.palette.success.dark,
    padding: "8px",
    color: "white",
    width: "100%",
    fontSize: "18px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

function VerDescripcionProductoPageBis() {
  const { id } = useParams();
  const { search } = useLocation(); // Necesitas importar useLocation desde 'react-router-dom'
  const localId = new URLSearchParams(search).get("localId"); // Obtén el localId de los parámetros de la URL
  const [producto, setProducto] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    console.log("ID del producto:", id);
    console.log("ID del local:", localId); // Utiliza localId según sea necesario
    fetch(`http://localhost:8080/comanda/producto/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProducto(data);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });
  }, [id, localId]);

  return (
    <>
      <Container maxWidth="xs">
        <Grid container alignContent="flex-end" className={classes.flexMargin}>
          <Fab
            size="small"
            color="primary"
            aria-label="arrow"
            component={Link}
            to={`/agregar-adicionales-1/${localId}`}            
            className={classes.arrowBack}
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
      </Container>
    </>
  );
}

export default VerDescripcionProductoPageBis;
