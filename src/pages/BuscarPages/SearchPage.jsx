import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  makeStyles,
  TextField,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import StoreIcon from "@material-ui/icons/Store";
import SearchIcon from "@mui/icons-material/Search";
import CarouselLink from "../../components/CarouselLink";
import axios from "axios"; // Asegúrate de tener axios instalado

const useStyles = makeStyles((theme) => ({
  flexTop: {
    marginTop: "15px",
  },
  flexMargin: {
    margin: "15px 0",
  },
}));

function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [locales, setLocales] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [filteredLocales, setFilteredLocales] = useState([]);
  const [filteredCategorias, setFilteredCategorias] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    // Llamada a la API para obtener locales y categorías
    async function fetchData() {
      try {
        const localesResponse = await axios.get(
          "http://localhost:8080/comanda/local"
        );
        setLocales(localesResponse.data);

        const categoriasResponse = await axios.get(
          "http://localhost:8080/comanda/categoria"
        );
        setCategorias(categoriasResponse.data);
      } catch (error) {
        console.error("Error al obtener datos desde el servidor", error);
      }
    }

    fetchData();
  }, []);

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const getFilteredItems = () => {
    const filteredLocales = locales.filter((local) =>
      local.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredCategorias = categorias.filter((categoria) =>
      categoria.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return [...filteredLocales, ...filteredCategorias].map(
      (item) => item.nombre
    );
  };

  return (
    <>
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
                const selectedLocal = locales.find(
                  (local) => local.nombre === value
                );
                const selectedCategoria = categorias.find(
                  (categoria) => categoria.nombre === value
                );
                if (selectedLocal) {
                  // Redirige a la página de detalles del local con el ID del local seleccionado
                  window.location.href = `/resto/${selectedLocal.id}`;
                } else if (selectedCategoria) {
                  // Redirige a la página de locales con el ID de la categoria seleccionada
                  window.location.href = `/category/${selectedCategoria.id}`;
                }
              }}
            />
          </Grid>
        </Grid>

        {/* Mostrar locales y categorías filtrados */}
        {filteredLocales.map((local) => (
          <div key={local.id}>{local.nombre}</div>
        ))}
        {filteredCategorias.map((categoria) => (
          <div key={categoria.id}>{categoria.nombre}</div>
        ))}

        <Grid container alignContent="flex-end" className={classes.flexMargin}>
          <StoreIcon fontSize="large"/>
          <Typography component="h1" variant="h5">
            Locales Recomendados
          </Typography>
        </Grid>

        <Grid container justifyContent="center" className={classes.flexTop}>
          <Grid item xs={12}>
            {/* Utiliza el componente Carousel para mostrar los nombres de los locales */}
            <CarouselLink
              slides={locales.map((local) => ({
                text: local.nombre,
                image: local.imagen, // Agrega la URL de la imagen del local
                link: `/resto/${local.id}`, // Establece el enlace con el ID del local
              }))}
            />
          </Grid>
        </Grid>

        <Grid container alignContent="flex-end" className={classes.flexMargin}>
          <LocalOfferIcon fontSize="medium"></LocalOfferIcon>
          <Typography component="h1" variant="h5">
            Categorías Populares
          </Typography>
        </Grid>

        <Grid container justifyContent="center" className={classes.flexTop}>
          <Grid item xs={12}>
            {/* Utiliza el componente Carousel para mostrar los nombres de las categorías */}           
            <CarouselLink
              slides={categorias
                .filter((categoria) => categoria.destacado) // Filtrar solo categorías destacadas
                .map((categoria) => ({
                  text: categoria.nombre,
                  image: categoria.imagen, // Agrega la URL de la imagen de la categoría
                  link: `/category/${categoria.id}`, // Establece el enlace con el ID del local
                }))}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default SearchPage;
