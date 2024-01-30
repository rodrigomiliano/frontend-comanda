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
} from "@material-ui/core";
import ArrowBack from "@material-ui/icons/ArrowBack";
import AlertComanda from "../../components/AlertComanda";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import UploadWidget from "../../components/cloudinary/UploadWidget";

const useStyles = makeStyles((theme) => ({
  flexTop: {
    marginTop: "30px",
  },
  flexMargin: {
    margin: "30px 0",
  },
}));

function EditarCategoriasPage() {
  const classes = useStyles();
  const [categoria, setCategoria] = useState(null);
  const [nombreCategoria, setNombreCategoria] = useState("");
  const [imagen, setImagen] = useState("");
  const [destacado, setDestacado] = useState("");
  const { id } = useParams();
  const [botonDeshabilitado, setBotonDeshabilitado] = useState(true);
  const [nuevaImagenCargada, setNuevaImagenCargada] = useState(false);

  const handleImageUpload = (imageUrl) => {
    setImagen(imageUrl); // Actualiza el estado de la imagen con la URL cargada
    setNuevaImagenCargada(true); // Indica que se ha cargado una nueva imagen
  };

  useEffect(() => {
    setBotonDeshabilitado(!nombreCategoria || nombreCategoria.trim() === "");
  }, [nombreCategoria]);

  useEffect(() => {
    //console.log("Estado local nombreCategoria:", nombreCategoria);
    fetch(`http://localhost:8080/comanda/categoria/${id}`)
      .then((response) => response.json())
      .then((data) => {        
        setNombreCategoria(data.nombre);
        setImagen(data.imagen);
        setDestacado(data.destacado);
        setCategoria(data);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });
  }, [id]);

  const handleGuardar = () => {
    if (botonDeshabilitado) {
      console.error("El nombre no puede estar vacío");
      return;
    }

    console.log("Nombre a guardar:", nombreCategoria);
    fetch(`http://localhost:8080/comanda/categoria/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: nombreCategoria,
        imagen: imagen,
        destacado: destacado,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          console.error("Error al actualizar la categoría:", response.status);
          window.location.href = "/admin/editar-categorias-error-1";
          throw new Error("Error al actualizar la categoría");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Datos actualizados:", data);
      })
      .catch((error) => {
        console.error("Error al actualizar la categoría:", error);
      });
  };

  return (
    <Container maxWidth="xl">
      <Grid container justifyContent="center" className={classes.flexTop}>
        <Grid item>
          <Fab
            size="small"
            color="primary"
            aria-label="arrow"
            component={Link}
            to="/admin/alta-categorias"
          >
            <ArrowBack />
          </Fab>
        </Grid>
        <Grid item xs={11}>
          <Box textAlign="center">
            <Typography component="h1" variant="h3">
              Categorías
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Divider />

      {/* Mostrar mensaje de error si el nombre está vacío */}
      {(!nombreCategoria || nombreCategoria.trim() === "") && (
        <Grid container justifyContent="center" className={classes.flexMargin}>
          <Grid item>
            <AlertComanda
              sev="warning"
              tit="¡Atención!"
              desc="El nombre no puede estar vacío"
            />
          </Grid>
        </Grid>
      )}

      <Grid container justifyContent="center" className={classes.flexMargin}>
        <Grid item>
          {categoria && categoria.nombre && (
            <Typography component="h1" variant="h6">
              EDITAR CATEGORIA: {categoria.nombre}
            </Typography>
          )}
        </Grid>
      </Grid>

      <Grid container justifyContent="center" className={classes.flexMargin}>
        <Grid item xl={6}>          
          <label htmlFor="nombreCategoria">
            <TextField
              id="nombreCategoria"
              label="Nombre"
              variant="outlined"              
              value={nombreCategoria}
              onChange={(e) => setNombreCategoria(e.target.value)}
            />
          </label>
        </Grid>
      </Grid>

      {!nuevaImagenCargada && imagen && (
        <Grid container justifyContent="center" className={classes.flexMargin}>
          <Grid item xl={6}>
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
        <Grid item xl={6}>
          <UploadWidget
            onImageUpload={handleImageUpload}
            currentImage={imagen}
          />
        </Grid>
      </Grid>

      <Grid container justifyContent="center" className={classes.flexMargin}>
        <Grid item>
          <Typography variant="body1">¿Es destacada?</Typography>
          {destacado ? (
            <StarIcon
              color="secondary"
              onClick={() => setDestacado(false)} // Cambia el estado a "false" al hacer clic en la estrella llena
            />
          ) : (
            <StarBorderIcon
              onClick={() => setDestacado(true)} // Cambia el estado a "true" al hacer clic en la estrella vacía
            />
          )}
        </Grid>
      </Grid>

      <Grid container justifyContent="center">
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/admin/editar-categorias-2"
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

export default EditarCategoriasPage;
