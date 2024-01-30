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
import UploadWidget from "../../components/cloudinary/UploadWidget";

const useStyles = makeStyles((theme) => ({
  flexTop: {
    marginTop: "30px",
  },
  flexMargin: {
    margin: "30px 0",
  },
}));

function AltaLocalesPage2() {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    nombre: "",
    calle: "",
    altura: "",
    codigo_postal: "",
    telefono: "",
    imagen: "",
    descripcion: "",
  });
  const [botonDeshabilitado, setBotonDeshabilitado] = useState(true);
  const [showAlturaWarning, setShowAlturaWarning] = useState(false);
  const [showCPWarning, setShowCPWarning] = useState(false);
  const [showTelWarning, setShowTelWarning] = useState(false);
  const [imageName, setImageName] = useState("");

  const handleImageUpload = (imageUrl) => {
    setFormData({ ...formData, imagen: imageUrl });
  };

  useEffect(() => {
    const isFormDataValid =
      formData.nombre.trim() &&
      formData.calle.trim() &&
      formData.altura.trim() &&
      formData.codigo_postal.trim() &&
      formData.telefono.trim() &&
      formData.imagen.trim();

    setBotonDeshabilitado(
      !isFormDataValid || showAlturaWarning || showCPWarning || showTelWarning
    );
  }, [formData, showAlturaWarning, showCPWarning, showTelWarning]);

  const handleAlturaChange = (value) => {
    // Verificar si el valor ingresado es numérico
    const isAlturaValid = /^[0-9]*$/.test(value.trim());

    setShowAlturaWarning(!isAlturaValid);

    // Actualizar el estado solo si el valor es numérico
    if (isAlturaValid) {
      setFormData({ ...formData, altura: value.trim() });
    }
  };

  const handleCPChange = (value) => {
    // Verificar si el valor ingresado es numérico
    const isCPValid = /^[0-9]*$/.test(value.trim());

    setShowCPWarning(!isCPValid);

    // Actualizar el estado solo si el valor es numérico
    if (isCPValid) {
      setFormData({ ...formData, codigo_postal: value.trim() });
    }
  };

  const handleTelChange = (value) => {
    // Verificar si el valor ingresado es numérico
    const isTelValid = /^[0-9]*$/.test(value.trim());

    setShowTelWarning(!isTelValid);

    // Actualizar el estado solo si el valor es numérico
    if (isTelValid) {
      setFormData({ ...formData, telefono: value.trim() });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      // Aquí puedes realizar acciones con el archivo leído, por ejemplo, enviarlo al servidor
      const base64String = reader.result;
      setFormData({ ...formData, imagen: base64String });
      setImageName(file.name); // Actualiza el nombre del archivo
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // Función para enviar los datos al servidor
  const handleSubmit = async () => {
    if (botonDeshabilitado) {
      console.error("Todos los campos son obligatorios");
      return;
    }

    // Configura la solicitud POST
    const response = await fetch("http://localhost:8080/comanda/local", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData), // Envía el nombre en formato JSON
    });

    if (response.ok) {
      console.log("Local agregado correctamente");
      window.location.href = "/admin/alta-locales-3";
    } else {
      console.error("Error al agregar el local");
      window.location.href = "/admin/alta-locales-2-error-1";
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
            to="/admin/alta-locales"
          >
            <ArrowBack />
          </Fab>
        </Grid>
        <Grid item xs={11}>
          <Box textAlign="center">
            <Typography component="h1" variant="h3">
              Locales
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Divider />

      <Grid container justifyContent="center" className={classes.flexMargin}>
        <Grid item>
          <Typography component="h1" variant="h6">
            AGREGAR LOCAL
          </Typography>
        </Grid>
      </Grid>

      <Grid container justifyContent="center" className={classes.flexMargin}>
        <Grid item>
          <TextField
            id="nombre"
            label="Nombre"
            variant="outlined"
            value={formData.nombre}
            onChange={(e) =>
              setFormData({ ...formData, nombre: e.target.value })
            }
          />
        </Grid>
      </Grid>

      <Grid container justifyContent="center" className={classes.flexMargin}>
        <Grid item>
          <TextField
            id="calle"
            label="Calle"
            variant="outlined"
            value={formData.calle}
            onChange={(e) =>
              setFormData({ ...formData, calle: e.target.value })
            }
          />
        </Grid>
      </Grid>

      <Grid container justifyContent="center" className={classes.flexMargin}>
        <Grid item>
          <TextField
            id="altura"
            label="Altura"
            variant="outlined"
            value={formData.altura}
            onChange={(e) => handleAlturaChange(e.target.value)}
          />
          <Grid>
            {showAlturaWarning && (
              <Typography variant="caption" color="error">
                La altura debe ser un número válido.
              </Typography>
            )}
          </Grid>
        </Grid>
      </Grid>

      <Grid container justifyContent="center" className={classes.flexMargin}>
        <Grid item>
          <TextField
            id="cp"
            label="Codigo Postal"
            variant="outlined"
            value={formData.codigo_postal}
            onChange={(e) => handleCPChange(e.target.value)}
          />
          <Grid>
            {showCPWarning && (
              <Typography variant="caption" color="error">
                El CP debe ser un número válido.
              </Typography>
            )}
          </Grid>
        </Grid>
      </Grid>

      <Grid container justifyContent="center" className={classes.flexMargin}>
        <Grid item>
          <TextField
            id="telefono"
            label="Teléfono"
            variant="outlined"
            value={formData.telefono}
            onChange={(e) => handleTelChange(e.target.value)}
          />
          <Grid>
            {showTelWarning && (
              <Typography variant="caption" color="error">
                El teléfono debe ser un número válido.
              </Typography>
            )}
          </Grid>
        </Grid>
      </Grid>

      <Grid container justifyContent="center" className={classes.flexMargin}>
        <Grid item>
          <UploadWidget onImageUpload={handleImageUpload} />
        </Grid>
      </Grid>

      <Grid container justifyContent="center" className={classes.flexMargin}>
        <Grid item>
          <TextField
            id="descripcion"
            label="Descripcion"
            variant="outlined"
            multiline
            maxRows={4}
            value={formData.descripcion}
            onChange={(e) =>
              setFormData({ ...formData, descripcion: e.target.value })
            }
          />
        </Grid>
      </Grid>

      <Grid container justifyContent="center">
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/admin/alta-locales-3"
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

export default AltaLocalesPage2;
