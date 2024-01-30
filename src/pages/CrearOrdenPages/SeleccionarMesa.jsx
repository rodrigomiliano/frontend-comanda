import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  makeStyles,
  Button,
  Paper,
  ButtonBase,
  Fab,
  Box,
} from "@material-ui/core";
import StoreIcon from "@material-ui/icons/Store";
import ArrowBack from "@material-ui/icons/ArrowBack";
import DoneIcon from "@mui/icons-material/Done";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import Tooltip from "@mui/material/Tooltip";

const useStyles = makeStyles((theme) => ({
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

function CrearOrdenAPage() {
  const { id } = useParams();
  const [productos, setProductos] = useState([]);
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);
  const [tienda, setTienda] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [locales, setLocales] = useState([]);
  const [cartCounter, setCartCounter] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [mesas, setMesas] = useState([]);
  const [filteredProductos, setFilteredProductos] = useState([]);
  const navigate = useNavigate();
  const productosDelLocal = productosSeleccionados.filter(
    (producto) => producto.local.id === parseInt(id)
  );
  const classes = useStyles();
  // Agregar un estado para la categoría seleccionada
  const [selectedCategory, setSelectedCategory] = useState("");
  // Obtener categorías únicas de los productos del local seleccionado
  const categoriesFromProducts = productosDelLocal.map(
    (producto) => producto.categoria
  );
  const uniqueCategories = Array.from(new Set(categoriesFromProducts));

  // Función para filtrar productos por categoría seleccionada
  const filterProductsByCategory = (event) => {
    setSelectedCategory(event.target.value);
    if (event.target.value != "") {
      setProductosSeleccionados(
        productos.filter((p) => p.categoria.nombre === event.target.value)
      );
    } else {
      setProductosSeleccionados(productos);
    }
  };

  useEffect(() => {
    fetch(`http://localhost:8080/comanda/local/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setTienda(data);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });
  }, [id]);

  useEffect(() => {
    // Llamada a la API para obtener las categorías
    fetch(`http://localhost:8080/comanda/mesa`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error obteniendo mesas");
        }
        return response.json();
      })
      .then((data) => {
        data = data.filter((m) => m.local.id == id);
        setMesas(data || []);
      })
      .catch((error) => {
        console.error("Error al obtener mesas:", error);
      });
  }, []);

  // Filtrar productos por categoría seleccionada

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const selectTable = async (tableId) => {
    localStorage.setItem("tableId", tableId);

    const response = await fetch("http://localhost:8080/comanda/seleccion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: tableId }), // Envía el nombre en formato JSON
    });

    if (response.ok) {
      // Redireccionar a la página siguiente si se agrega correctamente
    } else {
      console.error("Error al seleccionar mesa");
      // Mostrar la página de error si falla la adición      
    }

    navigate("/crear-orden-a/" + id);
  };

  return (
    <>
      <Grid container alignContent="flex-end" className={classes.flexMargin}>
        <Fab
          size="small"
          color="primary"
          aria-label="arrow"
          component={Link}
          to={`/resto/${id}`}
          className={classes.arrowBack}
        >
          <ArrowBack />
        </Fab>
        <StoreIcon fontSize="medium"/>
        {tienda && tienda.nombre && (
          <Typography component="h1" variant="h6">
            {tienda.nombre}
          </Typography>
        )}
      </Grid>

      <Container maxWidth="sm">
        <Box
          className={classes.fixed + " margin5 padding5 "}
          textAlign="center"
          fontSize="24px"
        >
          Seleccionar mesa
        </Box>
        <div>
          {/* Lista desplegable generada a partir de las categorías únicas */}

          {mesas.length != 0 ? (
            ""
          ) : (
            <>
              <Paper className="margin5 bc-gray padding5">
                <Box>
                  No hay mesas disponibles en este local. <br></br>Por favor,
                  aguarde y podra seleccionar su lugar en cuanto haya
                  disponibilidad.
                </Box>
              </Paper>

              <Grid
                container
                justifyContent="center"
                className={classes.flexMargin}
              >
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
            </>
          )}
          {mesas.map((mesaItem) => (
            <Paper className="margin5 bc-gray" key={mesaItem.id}>
              <Grid container className="padding5" direction="column">
                <Grid item xs container>
                  <ButtonBase
                    className={classes.image}
                    component={Link}
                    to={``}
                  >
                    <Box>
                      <ul>
                        <li>{"Id: " + mesaItem.id}</li>
                        <li>{"Sillas: " + mesaItem.sillas}</li>
                        <li>{"Observaciones: " + mesaItem.observacion}</li>
                      </ul>
                    </Box>
                  </ButtonBase>
                  <Grid item xs>
                    <Typography
                      gutterBottom
                      variant="subtitle1"
                      className="underline"
                    >
                      {mesaItem.nombre}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      {mesaItem.descripcion}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="body2"
                      style={{ cursor: "pointer" }}
                    ></Typography>
                  </Grid>

                  <Grid item>
                    {mesaItem.estado.id == 1 ? (
                      <Tooltip title="Mesa disponible">
                        <Fab
                          color="primary"
                          aria-label="add"
                          size="small"
                          // component={Link}
                          // to={`/crear-orden/${producto.id}`}
                          onClick={() => selectTable(mesaItem.id)}
                        >
                          <DoneIcon />
                        </Fab>
                      </Tooltip>
                    ) : (
                      <Tooltip title="Mesa ocupada">
                        <div>
                          <Fab
                            color="secondary"
                            aria-label="add"
                            size="small"
                            disabled
                            onClick={() => selectTable(mesaItem.id)}
                          >
                            <AccessTimeFilledIcon />
                          </Fab>
                        </div>
                      </Tooltip>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          ))}
        </div>
        <br />
      </Container>
    </>
  );
}

export default CrearOrdenAPage;
