import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  makeStyles,
  Paper,
  ButtonBase,
  Fab,
  TextField,
} from "@material-ui/core";
import StoreIcon from "@material-ui/icons/Store";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBack from "@material-ui/icons/ArrowBack";
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from "axios"; // Asegúrate de tener axios instalado
import DialogInfo from "../../components/DialogInfo";

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
}));

function MenuItems() {
  const classes = useStyles();
  const { id } = useParams();
  const [productos, setProductos] = useState([]);
  const [local, setLocal] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoria, setCategoria] = useState([]);
  const [filteredProductos, setFilteredProductos] = useState([]);
  const productosDelLocal = productos.filter(
    (producto) => producto.local.id === parseInt(id)
  );
  const [selectedCategory, setSelectedCategory] = useState(""); // Agregar un estado para la categoría seleccionada

  // Obtener categorías únicas de los productos del local seleccionado
  const categoriesFromProducts = productosDelLocal.map(
    (producto) => producto.categoria
  );
  const uniqueCategories = categoriesFromProducts.filter(
    (cat, index, self) => index === self.findIndex((c) => c.id === cat.id)
  );

  // Función para filtrar productos por categoría seleccionada
  const filterProductsByCategory = (categoryId) => {
    const category = uniqueCategories.find(
      (cat) => cat.id === parseInt(categoryId, 10)
    );
    if (!category) return setFilteredProductos(productosDelLocal);

    // Filtrar productos por categoría seleccionada
    const filtered = productosDelLocal.filter(
      (producto) => producto.categoria.id === category.id
    );
    setFilteredProductos(filtered);
  };

  useEffect(() => {
    // Llamada a la API para obtener las categorías
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
  }, []);

  useEffect(() => {
    // Llamada a la API para obtener productos al cargar la página
    async function fetchData() {
      try {
        const productosResponse = await axios.get(
          `http://localhost:8080/comanda/producto/local/${id}`
        );
        setProductos(productosResponse.data || []);
        setFilteredProductos(productosResponse.data || []); // Inicializa filteredProductos con todos los productos
      } catch (error) {
        console.error("Error al obtener datos desde el servidor", error);
      }
    }

    fetchData();
  }, [id]);

  useEffect(() => {
    fetch(`http://localhost:8080/comanda/local/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setLocal(data);
      })
      .catch((error) => {
        console.error("Error al obtener local:", error);
      });
  }, [id]);

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const getFilteredItems = () => {
    const filteredProductos = productos.filter(
      (producto) =>
        producto.local.id.toString() === id.toString() && // Comparar IDs del local
        producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return [...filteredProductos].map((item) => item.nombre);
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
        <StoreIcon fontSize="medium" />
        {local && local.nombre && (
          <Typography component="h1" variant="h6">
            {local.nombre}
          </Typography>
        )}
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
                  label={
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <SearchIcon />
                      Buscar
                    </div>
                  }
                  margin="normal"
                  variant="outlined"
                  onChange={(e) => handleSearch(e.target.value)}
                />
              )}
              onChange={(e, value) => {
                const selectedProduct = productos.find(
                  (producto) => producto.nombre === value
                );
                if (selectedProduct) {
                  // Redirige a la página del producto seleccionado
                  window.location.href = `/item/${selectedProduct.id}?localId=${id}`;
                }
              }}
            />
          </Grid>
        </Grid>

        {/* Lista desplegable generada a partir de las categorías únicas de productos filtrados */}
        <Grid container justifyContent="center" className={classes.flexMargin}>
          <Grid item xs={12}>
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                filterProductsByCategory(e.target.value);
              }}
            >
              <option value="">Todas las categorías</option>
              {uniqueCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nombre}
                </option>
              ))}
            </select>
          </Grid>
        </Grid>

        {/* Lista generada a partir de productos filtrados por el local seleccionado*/}
        {filteredProductos.map((producto) => (
          <Paper className="margin5 bc-gray" key={producto.id}>
            <Grid container className="padding5" direction="column">
              <Grid item xs container>
                <ButtonBase
                  className={classes.image}
                  component={Link}
                  //to={`/item/${producto.id}`}
                  to={`/item/${producto.id}?localId=${id}`} // Incluye el localId como parámetro en la URL
                >
                  <img
                    className={classes.img}
                    alt="Imagen del producto"
                    src={producto.imagen}
                    style={{
                      //maxWidth: "150px",
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
              </Grid>
            </Grid>
          </Paper>
        ))}

        <Grid container justifyContent="center" className={classes.flexMargin}>
          <Grid item>
            <DialogInfo
              mensaje="EMPEZAR A PEDIR"
              pregunta={
                <>
                  ¿Ya estás en el local?
                  <br />
                  Si es así, empezá a pedir desde tu mesa.
                </>
              }
              btnIzquierda="No"
              btnDerecha="Sí, ya llegué"
              hrefIzquierda=""
              hrefDerecha={`/seleccionar-mesa/${id}`}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default MenuItems;
