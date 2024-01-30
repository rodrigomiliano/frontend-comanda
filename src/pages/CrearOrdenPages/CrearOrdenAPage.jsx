import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  makeStyles,
  Button,
  Paper,
  ButtonBase,
  Fab,
  TextField,
  Chip,
  Avatar,
  Box,
  Divider,
} from "@material-ui/core";
import StoreIcon from "@material-ui/icons/Store";
import AddIcon from "@material-ui/icons/Add";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from "axios"; // Asegúrate de tener axios instalado

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
  const [categorias, setCategorias] = useState([]);
  const [categoria, setCategoria] = useState([]);
  const [filteredProductos, setFilteredProductos] = useState([]);
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

  const handleAutocompleteChange = (event, value) => {
    const selectedProducto = productos.find(
      (producto) => producto.nombre === value
    );
    if (selectedProducto) {
      console.log("Producto seleccionado:", selectedProducto);
      window.location.href = `/ver-descripcion-producto/${selectedProducto.id}?localId=${id}`;
    }
  };

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
    fetch(`http://localhost:8080/comanda/categoria`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setCategoria(data || []);
      })
      .catch((error) => {
        console.error("Error al obtener categorías:", error);
      });
    JSON.parse(localStorage.getItem("cart")) || [];
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter((p) => p != null);
    let total = 0;
    cart.forEach((x) => setTotalAmount((total += x?.precio)));
    setTotalAmount(total);
    setCartCounter(cart.length);
  }, []);

  // Filtrar productos por categoría seleccionada
  const filteredProducts = productosDelLocal.filter(
    (producto) =>
      selectedCategory === "" || producto.categoria === selectedCategory
  );

  useEffect(() => {
    fetch(`http://localhost:8080/comanda/producto/local/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setProductos(data || []);
        setProductosSeleccionados(data || []);
      })
      .catch((error) => {
        console.error("Error al obtener productos:", error);
      });
  }, [id]);

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
    // Llamada a la API para obtener productos
    async function fetchData() {
      try {
        const productosResponse = await axios.get(
          "http://localhost:8080/comanda/producto"
        );
        setProductos(productosResponse.data);
      } catch (error) {
        console.error("Error al obtener datos desde el servidor", error);
      }
    }

    fetchData();
  }, []);

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const addItem = (productId) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(productos.find((p) => p.id === productId));
    const itemsCount = cart.length;
    localStorage.setItem("cart", JSON.stringify(cart));
    setCartCounter(itemsCount);
    cart = cart.filter((p) => p != null);
    cart.forEach((x) => setTotalAmount(totalAmount + x?.precio));
  };

  const getFilteredItems = () => {
    const filteredProductos = productosSeleccionados.filter(
      (producto) =>
        producto.local.id.toString() === id.toString() && // Comparar IDs del local
        producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return [...filteredProductos].map((item) => item.nombre);
  };

  return (
    <>
      <Grid container alignContent="flex-end" className={classes.flexMargin}>        
        <StoreIcon fontSize="medium" />
        {tienda && tienda.nombre && (
          <Typography component="h1" variant="h6">
            {tienda.nombre}
          </Typography>
        )}
      </Grid>

      <Grid container justifyContent="center" className={classes.flexTop}>
        <Grid item xs={5}>
          <Chip
            avatar={<Avatar>$</Avatar>}
            size="medium"
            label="Visualizar consumos"
            clickable
            color="primary"
            disabled
          />
        </Grid>
      </Grid>

      <Container maxWidth="sm">
        <Grid container justifyContent="center" className={classes.flexMargin}>
          <Grid item xs={12}>
            <Autocomplete
              freeSolo
              disableClearable
              options={getFilteredItems()}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Buscar"
                  margin="normal"
                  variant="outlined"
                  onChange={(e) => handleSearch(e.target.value)}
                />
              )}
              onChange={handleAutocompleteChange}
            />
          </Grid>
        </Grid>

        <Box
          className={classes.fixed + " margin5 padding5 "}
          textAlign="center"
          fontSize="24px"
        >
          Carta - Menú
        </Box>

        {/* Lista desplegable generada a partir de las categorías únicas */}
        <Grid container justifyContent="center" className={classes.flexMargin}>
          <Grid item xs={12}>
            <select
              value={selectedCategory}
              onChange={filterProductsByCategory}
              className="margin5 padding5 bold"
            >
              <option value="">Todas las categorías</option>
              {categoria.map((cat) => (
                <option key={cat.id} value={cat.nombre}>
                  {cat.nombre}
                </option>
              ))}
            </select>
          </Grid>
        </Grid>

        {productosDelLocal.map((producto) => (
          <Paper className="margin5 bc-gray" key={producto.id}>
            <Grid container className="padding5" direction="column">
              <Grid item xs container>
                <ButtonBase
                  className={classes.image}
                  component={Link}
                  to={`/ver-descripcion-producto/${producto.id}?localId=${id}`}
                >
                  <img
                    className={classes.img}
                    alt="Imagen del producto"
                    src={producto.imagen}
                    style={{
                      //maxWidth: "100px",
                      //maxHeight: "100px",
                      width: "100px", //ancho
                      height: "100px", //alto
                      margin: "5px",
                      objectFit: "cover",
                      objectPosition: "50% 50%", // Centrar la imagen verticalmente
                      borderRadius: "6px",
                    }}
                  />
                </ButtonBase>
                <Grid item xs>
                  <Typography
                    gutterBottom
                    variant="subtitle1"
                    className="underline"
                  >
                    {producto.nombre}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {producto.activo
                      ? producto.descripcion
                      : "Producto sin stock"}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2" style={{ cursor: "pointer" }}>
                    <span className="bold font12">${producto.precio}</span>
                  </Typography>
                </Grid>

                <Grid item>
                  <Fab
                    color="primary"
                    aria-label="add"
                    size="small"
                    // component={Link}
                    // to={`/crear-orden/${producto.id}`}
                    onClick={() => addItem(producto.id)}
                    disabled={!producto.activo}
                  >
                    <AddIcon />
                  </Fab>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        ))}

        <br />
        <Divider style={{ margin: "40px 0" }} />
        <br />

        <Box
          className={classes.flexEnd + " margin5"}
          style={{
            position: "fixed",
            bottom: 0,
            padding: "10px",
          }}
        >
          <Box className={classes.total}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<ShoppingCartIcon />}
              style={{ borderRadius: "30px" }}
              component={Link}
              to={"/modificar-orden/" + id}
            >
              {cartCounter} - mis pedidos
            </Button>
            <Box style={{ marginRight: "20px" }}>Total: ${totalAmount}</Box>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default CrearOrdenAPage;
