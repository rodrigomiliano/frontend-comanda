import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  Box,
  Divider,
  makeStyles,
  Fab,
  Button,
  TextField,
  InputLabel,
  MenuItem,
  FormHelperText,
  FormControl,
  FormControlLabel,
  Select,
  Switch,
} from "@material-ui/core";
import ArrowBack from "@material-ui/icons/ArrowBack";
import AlertComanda from "../../components/AlertComanda";
import UploadWidget from "../../components/cloudinary/UploadWidget";

const useStyles = makeStyles((theme) => ({
  flexTop: {
    marginTop: "30px",
  },
  flexMargin: {
    margin: "30px 0",
  },
}));

function EditarProductosPage() {
  const classes = useStyles();
  const [producto, setProducto] = useState(null);
  const [nombreProducto, setNombreProducto] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [categoriaId, setCategoriaId] = useState("");
  const [locales, setLocales] = useState([]);
  const [localId, setLocalId] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagen, setImagen] = useState("");
  const { id } = useParams();
  const [botonDeshabilitado, setBotonDeshabilitado] = useState(true);
  const [precioValido, setPrecioValido] = useState(true);
  const [nuevaImagenCargada, setNuevaImagenCargada] = useState(false);
  const [activo, setActivo] = useState(false); 

  const handleSwitchChange = () => {
    setActivo(!activo);
    console.log("Nuevo estado de 'activo':", !activo);
  };  

  const handleImageUpload = (imageUrl) => {
    setImagen(imageUrl); // Actualiza el estado de la imagen con la URL cargada
    setNuevaImagenCargada(true); // Indica que se ha cargado una nueva imagen
  };

  // Función para obtener las categorías
  const obtenerCategorias = async () => {
    try {
      const response = await fetch("http://localhost:8080/comanda/categoria");
      if (response.ok) {
        const data = await response.json();
        setCategorias(data);
      } else {
        console.error("Error al obtener las categorías");
      }
    } catch (error) {
      console.error("Error al obtener las categorías:", error);
    }
  };

  useEffect(() => {
    obtenerCategorias();
  }, []);

  // Función para obtener las categorías
  const obtenerLocales = async () => {
    try {
      const response = await fetch("http://localhost:8080/comanda/local");
      if (response.ok) {
        const data = await response.json();
        setLocales(data);
      } else {
        console.error("Error al obtener los locales");
      }
    } catch (error) {
      console.error("Error al obtener los locales:", error);
    }
  };

  useEffect(() => {
    obtenerLocales();
  }, []);

  useEffect(() => {
    setBotonDeshabilitado(
      !(nombreProducto.trim() && descripcion.trim() && categoriaId && precio)
    );
  }, [nombreProducto, descripcion, categoriaId, precio]);

  useEffect(() => {
    fetch(`http://localhost:8080/comanda/producto/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setNombreProducto(data.nombre);
        setDescripcion(data.descripcion);
        setPrecio(data.precio);
        setImagen(data.imagen);
        setActivo(data.activo);
        setProducto(data);

        // Asegúrate de manejar correctamente la categoría si está presente en los datos del producto
        if (data.categoria) {
          setCategoriaId(data.categoria.id);
        } else {
          setCategoriaId(""); // o configúralo en una ID de categoría predeterminada
        }

        if (data.local) {
          setLocalId(data.local.id);
        } else {
          setLocalId(""); // o configúralo en una ID de local predeterminada
        }
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });
  }, [id]);

  const handleGuardar = () => {
    const isNumeric = !isNaN(parseFloat(precio)) && isFinite(precio);
    const camposCompletos =
      nombreProducto.trim() &&
      descripcion.trim() &&
      categoriaId &&
      (isNumeric || precio.trim() === ""); // Permitir un campo de precio vacío

    if (!camposCompletos) {
      console.error("Por favor complete los campos correctamente");
      return;
    }

    fetch(`http://localhost:8080/comanda/producto/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: nombreProducto,
        descripcion: descripcion,
        categoriaId: categoriaId,
        precio: precio,
        imagen: imagen,
        localId: localId,
        activo: activo,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          console.error("Error al actualizar el producto:", response.status);
          window.location.href = "/admin/editar-productos-error-1";
          throw new Error("Error al actualizar el producto");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Datos actualizados:", data);
        // Obtener la lista actualizada de productos después de editar
        fetch("http://localhost:8080/comanda/producto")
          .then((response) => response.json())
          .then((data) => {
            setProductos(data); // Actualizar el estado de productos
            // Redirigir a la página de lista de productos después de editar
            window.location.href = "/admin/editar-productos-2";
          })
          .catch((error) => {
            //console.error("Error al obtener productos después de editar:", error);
          });
      })
      .catch((error) => {
        //console.error("Error al actualizar el producto:", error);
      });
  };

  useEffect(() => {
    // Actualizar el estado de deshabilitado basado en la validez del precio y otros campos
    const isNumeric = !isNaN(parseFloat(precio)) && isFinite(precio);
    setBotonDeshabilitado(
      !(
        nombreProducto.trim() &&
        descripcion.trim() &&
        categoriaId &&
        (!isNaN(parseFloat(precio)) || precio.trim() === "")
      )
    );
  }, [nombreProducto, descripcion, categoriaId, precio]);

  return (
    <Container maxWidth="xl">
      <Grid container justifyContent="center" className={classes.flexTop}>
        <Grid item>
          <Fab
            size="small"
            color="primary"
            aria-label="arrow"
            component={Link}
            to="/admin/alta-productos"
          >
            <ArrowBack />
          </Fab>
        </Grid>
        <Grid item xs={11}>
          <Box textAlign="center">
            <Typography component="h1" variant="h3">
              Productos
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Divider />

      {(nombreProducto.trim() === "" ||
        descripcion.trim() === "" ||
        categoriaId === "" ||
        precio === "") && (
        <Grid container justifyContent="center" className={classes.flexMargin}>
          <Grid item>
            <AlertComanda
              sev="warning"
              tit="¡Atención!"
              desc="Por favor complete los campos"
            />
          </Grid>
        </Grid>
      )}

      <Grid container justifyContent="center" className={classes.flexMargin}>
        <Grid item>
          {producto && producto.nombre && (
            <Typography component="h1" variant="h6">
              EDITAR PRODUCTO: {producto.nombre}
            </Typography>
          )}
        </Grid>
      </Grid>

      <Grid container justifyContent="center" className={classes.flexMargin}>
        <Grid item>
          <label htmlFor="nombreProducto">
            <TextField
              id="nombreProducto"
              label="Nombre"
              variant="outlined"              
              value={nombreProducto}
              onChange={(e) => setNombreProducto(e.target.value)}
            />
          </label>
        </Grid>
      </Grid>

      <Grid container justifyContent="center" className={classes.flexMargin}>
        <Grid item>
          <label htmlFor="descripcion">
            <TextField
              id="descripcion"
              label="Descripción"
              variant="outlined"              
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </label>
        </Grid>
      </Grid>

      <Grid container justifyContent="center" className={classes.flexMargin}>
        <Grid item>
          <FormControl className={classes.formControl}>
            <InputLabel id="categoria-select-label">Categoría</InputLabel>
            <Select
              labelId="categoria-select-label"
              id="categoria-select"
              value={categoriaId}
              onChange={(e) => setCategoriaId(e.target.value)}
            >
              <MenuItem value="">
                <em>Seleccione una categoría</em>
              </MenuItem>
              {categorias.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.nombre}
                </MenuItem>
              ))}
            </Select>

            <FormHelperText>Seleccione una categoría</FormHelperText>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container justifyContent="center" className={classes.flexMargin}>
        <Grid item>
          <label htmlFor="precio">
            <TextField
              id="precio"
              label="Precio"
              variant="outlined"              
              value={precio}
              onChange={(e) => {
                const value = e.target.value;
                const isNumeric = !isNaN(parseFloat(value)) && isFinite(value);
                setPrecio(value);
                setPrecioValido(isNumeric); // Actualizar estado de precio válido
                setBotonDeshabilitado(
                  !(
                    nombreProducto.trim() &&
                    descripcion.trim() &&
                    categoriaId &&
                    isNumeric
                  )
                );
              }}
              // Mostrar error si el precio no es un número válido
              error={!precioValido}
              helperText={
                !precioValido ? "El precio debe ser un número válido" : ""
              }
            />
          </label>
        </Grid>
      </Grid>

      {!nuevaImagenCargada && imagen && (
        <Grid container justifyContent="center" className={classes.flexMargin}>
          <Grid item>
            <Typography variant="subtitle1">
              Vista previa de la imagen:
            </Typography>
            <div style={{ marginTop: "10px" }}>
              <img
                src={imagen}
                alt="Imagen actual"
                style={{ maxWidth: "150px", maxHeight: "150px" }}
              />
            </div>
            <Typography variant="subtitle2">
              Nombre de la imagen:{" "}
              {imagen.substring(imagen.lastIndexOf("/") + 1)}
            </Typography>
          </Grid>
        </Grid>
      )}
      <Grid container justifyContent="center" className={classes.flexMargin}>
        <Grid item>
          <UploadWidget
            onImageUpload={handleImageUpload}
            currentImage={imagen}
          />
        </Grid>
      </Grid>

      <Grid container justifyContent="center" className={classes.flexMargin}>
        <Grid item>
          <FormControl className={classes.formControl}>
            <InputLabel id="local-select-label">Local</InputLabel>
            <Select
              labelId="local-select-label"
              id="local-select"
              value={localId}
              onChange={(e) => setLocalId(e.target.value)}
            >
              <MenuItem value="">
                <em>Seleccione un local</em>
              </MenuItem>
              {locales.map((loc) => (
                <MenuItem key={loc.id} value={loc.id}>
                  {loc.nombre}
                </MenuItem>
              ))}
            </Select>

            <FormHelperText>Seleccione un local</FormHelperText>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container justifyContent="center" className={classes.flexMargin}>
        <Grid item>
          <FormControlLabel
            control={
              <Switch
                checked={activo}
                onChange={() => setActivo(!activo)}
                color="primary"
              />
            }
            label={`¿Activo? ${activo ? "Sí" : "No"}`}
          />
        </Grid>
      </Grid>

      <Grid container justifyContent="center">
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/admin/editar-productos-2"
            onClick={handleGuardar}
            disabled={botonDeshabilitado}
          >
            GUARDAR
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default EditarProductosPage;
