import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  makeStyles,
  Paper,
  ButtonBase,
  Fab,
} from "@material-ui/core";
import { useParams, Link } from "react-router-dom";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import ArrowBack from "@material-ui/icons/ArrowBack";

const useStyles = makeStyles((theme) => ({
  flexTop: {
    marginTop: "15px",
  },
  flexMargin: {
    margin: "15px 0",
  },  
  img: {
    maxWidth: "150px",
    maxHeight: "100px",
    objectFit: "cover",
  },
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(1),
  }, 
}));

function SearchCategory() {
  const classes = useStyles();
  const { id } = useParams();
  const [categoria, setCategoria] = useState({});
  const [localesConCategoria, setLocalesConCategoria] = useState([]);
  const [localesConProductos, setLocalesConProductos] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/comanda/categoria/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCategoria(data);
      })
      .catch((err) => {
        console.error("Error al obtener datos de la categoría:", err);
      });
  }, [id]);

  useEffect(() => {
    console.log("Datos de categoría:", categoria);
    console.log("Locales con categoría:", localesConCategoria);

    if (categoria && categoria.id) {
      fetch(`http://localhost:8080/comanda/producto/categoria/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setLocalesConCategoria(data);
        })
        .catch((err) => {
          console.error("Error al obtener locales con la categoría:", err);
        });
    }
  }, [id, categoria]);

  useEffect(() => {
    if (categoria && categoria.id) {
      fetch(`http://localhost:8080/comanda/categoria/${categoria.id}/locales`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        })
        .then((data) => {
          setLocalesConProductos(data);
        })
        .catch((err) => {
          console.error(
            "Error al obtener locales con productos de la categoría:",
            err
          );
        });
    }
  }, [id, categoria]);

  return (
    <Container maxWidth="xs">
      <Grid container alignContent="flex-end" className={classes.flexMargin}>
        <Fab
          size="small"
          color="primary"
          aria-label="arrow"
          component={Link}
          to={`/search`}
          className={classes.arrowBack}
        >
          <ArrowBack />
        </Fab>
        <LocalOfferIcon fontSize="medium"></LocalOfferIcon>
        {categoria && categoria.nombre && (
          <Typography component="h1" variant="h6">
            Categoria: {categoria.nombre}
          </Typography>
        )}
      </Grid>

      {localesConProductos.length > 0 &&
        localesConProductos.map((local) => (
          <Paper key={local.id} className={classes.paper}>
            <Grid container spacing={1}>
              <Grid item>
                <ButtonBase
                  className={classes.image}
                  component={Link}
                  to={`/resto/${local.id}`}
                >
                  <img
                    className={local.img}
                    alt="Imagen del producto"
                    src={local.imagen}
                    style={{
                      maxWidth: "150px",
                      maxHeight: "100px",
                      objectFit: "cover",
                      borderRadius: "6px",
                    }}
                  />
                </ButtonBase>
              </Grid>

              <Grid item xs sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <Typography gutterBottom variant="subtitle1">
                      {local.nombre}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      {local.calle} {local.altura}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      CP {local.codigo_postal}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      TEL: {local.telefono}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        ))}
    </Container>
  );
}

export default SearchCategory;
