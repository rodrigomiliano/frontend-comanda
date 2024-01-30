import React, { useEffect, useState } from "react";
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
import { Link } from "react-router-dom";
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

function AltaCategoriasPage2Error1() {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    nombre: "",
    imagen: "",
    destacado: 0, // Inicialmente no establecido
  });
  const [botonDeshabilitado, setBotonDeshabilitado] = useState(true);
  const [showWarning, setShowWarning] = useState(false);

  const handleImageUpload = (imageUrl) => {
    setFormData({ ...formData, imagen: imageUrl });
  };

  useEffect(() => {
    const isFormDataValid = formData.nombre.trim();
    setBotonDeshabilitado(!isFormDataValid || showWarning);
  }, [formData, showWarning]);

  // Función para enviar los datos al servidor
  const handleSubmit = async () => {
    if (botonDeshabilitado) {
      console.error("El nombre no puede estar vacío");
      return;
    }
    // Configura la solicitud POST
    try {
      const response = await fetch("http://localhost:8080/comanda/categoria", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Envía el nombre en formato JSON
      });

      if (response.ok) {
        console.log("Categoría agregada correctamente");
        window.location.href = "/admin/alta-categorias-3";
      } else {
        console.error("Error al agregar la categoría");
        window.location.href = "/admin/alta-categorias-2-error-1";
      }
    } catch (error) {
      console.error("Error al agregar categoria:", error);
      // Puedes mostrar el error en un componente, por ejemplo, si es relevante
      // setErrorMessage("Error al agregar categoria: " + error.message);
    }
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

      <Grid container justifyContent="center" className={classes.flexMargin}>
        <Grid item>
          <Typography component="h1" variant="h6">
            AGREGAR CATEGORIA
          </Typography>
        </Grid>
      </Grid>

      <Grid container justifyContent="center" className={classes.flexMargin}>
        <Grid item>
          <AlertComanda
            sev="error"
            tit="Error"
            desc="Ya existe una categoría con ese nombre"
          />
        </Grid>
      </Grid>

      <Grid container justifyContent="center" className={classes.flexMargin}>
        <Grid item>
        <TextField
            id="nombre"
            label="Nombre"
            variant="outlined"
            value={formData.nombre}
            onChange={(e) => {
              setFormData({ ...formData, nombre: e.target.value });
            }}
          />
        </Grid>
      </Grid>

      <Grid container justifyContent="center" className={classes.flexMargin}>
        <Grid item>
          <UploadWidget onImageUpload={handleImageUpload} />
        </Grid>
      </Grid>

      <Grid container justifyContent="center" className={classes.flexMargin}>
        <Grid item>
          <Typography variant="body1">¿Es destacada?</Typography>
          {formData.destacado ? (
            <StarIcon
              color="secondary"
              onClick={() => setFormData({ ...formData, destacado: 0 })}
            />
          ) : (
            <StarBorderIcon
              onClick={() => setFormData({ ...formData, destacado: 1 })}
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
            to="/admin/alta-categorias-3"
            onClick={handleSubmit}
            disabled={botonDeshabilitado}
          >
            SIGUIENTE
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default AltaCategoriasPage2Error1;
