import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Divider,
  makeStyles,
  Fab,
  Button,
  TextField,
  InputLabel,
  MenuItem,
  FormHelperText,
  FormControl,
  Select,
} from "@material-ui/core";
import ArrowBack from "@material-ui/icons/ArrowBack";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  flexTop: {
    marginTop: "30px",
  },
  flexMargin: {
    margin: "30px 0",
  },
  formControl: {
    margin: theme.spacing(5),
    minWidth: 300,
  },
  selectEmpty: {
    marginTop: theme.spacing(1),
  },
}));

function AltaMesasPage2() {
  const classes = useStyles();
  const [estados, setEstados] = React.useState("");
  const [usuarios, setUsuarios] = React.useState("");
  const [locales, setLocales] = React.useState("");
  const [formData, setFormData] = useState({
    sillas: "",
    observacion: "",
    estadoId: "", // La propiedad se llama estadoId en el front-end
    usuarioId: "",
    localId: "",
  });
  const [botonDeshabilitado, setBotonDeshabilitado] = useState(true);
  const [showWarning, setShowWarning] = useState(false);
  const [showSillaWarning, setShowSillaWarning] = useState(false);

  const handleSillasChange = (value) => {
    const isSillaValid = !isNaN(parseInt(value)) && value.trim();
    setShowSillaWarning(!isSillaValid);
    setBotonDeshabilitado(
      !isSillaValid || !Number.isInteger(parseFloat(value))
    );
    setFormData({ ...formData, sillas: value });
  };

  const obtenerEstados = async () => {
    try {
      const response = await fetch("http://localhost:8080/comanda/estado");
      if (response.ok) {
        const data = await response.json();
        setEstados(data);
      } else {
        console.error("Error al obtener estados");
      }
    } catch (error) {
      console.error("Error al obtener estados:", error);
    }
  };

  useEffect(() => {
    obtenerEstados();
  }, []);

  const obtenerUsuarios = async () => {
  try {
    const response = await fetch("http://localhost:8080/comanda/usuario");
    if (response.ok) {
      const data = await response.json();

      // Obtener información del usuario logueado
      const usuarioLogueado = JSON.parse(localStorage.getItem("user"));

      // Si el usuario es administrador, mostrar todos los usuarios
      if (usuarioLogueado.rol && usuarioLogueado.rol.nombre === "ADMIN") {
        setUsuarios(data);
      } else {
        // Filtrar los usuarios para obtener solo el usuario logueado
        const usuariosFiltrados = data.filter(
          (usu) => usu.id === usuarioLogueado.id
        );

        setUsuarios(usuariosFiltrados);
      }
    } else {
      console.error("Error al obtener usuarios");
    }
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
  }
};

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  
  const obtenerLocales = async () => {
    try {
      const response = await fetch("http://localhost:8080/comanda/local");
      if (response.ok) {
        const data = await response.json();
        setLocales(data);
      } else {
        console.error("Error al obtener locales");
      }
    } catch (error) {
      console.error("Error al obtener locales:", error);
    }
  };
  
  useEffect(() => {
    obtenerLocales();
  }, []);
  
  
  

  useEffect(() => {
    obtenerLocales();
  }, []);

  const handleSubmit = async () => {
    if (botonDeshabilitado) {
      console.error("El campo sillas no puede estar vacío");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/comanda/mesabis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Miesa agregada correctamente");
        window.location.href = "/admin/alta-mesas-3";
      } else {
        console.error(
          "Error al agregar mesa - Respuesta del servidor:",
          response.status
        );
        window.location.href = "/admin/alta-mesas-2-error-1";
      }
    } catch (error) {
      console.error("Error al agregar mesa:", error);
      // Puedes mostrar el error en un componente, por ejemplo, si es relevante
      // setErrorMessage("Error al agregar el producto: " + error.message);
    }
  };

  return (
    <Container maxWidth="xl">
      <Grid container justifyContent="center" className={classes.flexTop}>
        <Grid item xs={4}>
          <Fab
            size="small"
            color="primary"
            aria-label="arrow"
            component={Link}
            to="/admin/alta-mesas"
          >
            <ArrowBack />
          </Fab>
        </Grid>
        <Grid item mx="auto">
          <Typography component="h1" variant="h3">
            COMANDA
          </Typography>
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>

      <Divider />

      <Grid container justifyContent="center" className={classes.flexMargin}>
        <Grid item>
          <Typography component="h1" variant="h6">
            AGREGAR MESA
          </Typography>
        </Grid>
      </Grid>

      <Grid container justifyContent="center" className={classes.flexMargin}>
        <Grid item>
          <TextField
            id="sillas"
            label="Sillas"
            variant="outlined"
            value={formData.sillas}
            onChange={(e) => handleSillasChange(e.target.value)}
          />
          <Grid>
            {showSillaWarning && (
              <Typography variant="caption" color="error">
                La cantidad de sillas debe ser un número válido.
              </Typography>
            )}
          </Grid>
        </Grid>
      </Grid>

      <Grid container justifyContent="center" className={classes.flexMargin}>
        <Grid item>
          <TextField
            id="observacion"
            label="Observacion"
            variant="outlined"
            value={formData.observacion}
            onChange={(e) =>
              setFormData({ ...formData, observacion: e.target.value })
            }
          />
        </Grid>
      </Grid>

      <Grid container justifyContent="center" className={classes.flexMargin}>
        <Grid item>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-helper-label">Estado</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              name="estadoId"
              value={formData.estadoId}
              onChange={(e) =>
                setFormData({ ...formData, estadoId: e.target.value })
              }
            >
              <FormHelperText>Estado de la mesa</FormHelperText>
              <MenuItem value="">
                <em>Seleccione un estado</em>
              </MenuItem>
              {Array.isArray(estados) &&
                estados.map((est) => (
                  <MenuItem key={est.id} value={est.id}>
                    {est.nombre}
                  </MenuItem>
                ))}
            </Select>
            <FormHelperText>Estado de la mesa</FormHelperText>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container justifyContent="center" className={classes.flexMargin}>
        <Grid item>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-helper-label">
              Usuario
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              name="usuario"
              value={formData.usuarioId}
              onChange={(e) =>
                setFormData({ ...formData, usuarioId: e.target.value })
              }
            >
              <FormHelperText>Usuario a cargo de la mesa</FormHelperText>
              <MenuItem value="">
                <em>Seleccione un usuario</em>
              </MenuItem>
              {Array.isArray(usuarios) &&
                usuarios.map((usu) => (
                  <MenuItem key={usu.id} value={usu.id}>
                    {usu.nombre}
                  </MenuItem>
                ))}
            </Select>
            <FormHelperText>Usuario a cargo de la mesa</FormHelperText>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container justifyContent="center" className={classes.flexMargin}>
        <Grid item>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-helper-label">Local</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              name="local"
              value={formData.localId}
              onChange={(e) =>
                setFormData({ ...formData, localId: e.target.value })
              }
            >
              <FormHelperText>Local de la mesa</FormHelperText>
              <MenuItem value="">
                <em>Seleccione una local</em>
              </MenuItem>
              {Array.isArray(locales) &&
                locales.map((loc) => (
                  <MenuItem key={loc.id} value={loc.id}>
                    {loc.nombre}
                  </MenuItem>
                ))}
            </Select>
            <FormHelperText>Local de la mesa</FormHelperText>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container justifyContent="center">
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/admin/alta-mesas-3"
            onClick={handleSubmit}
            disabled={
              botonDeshabilitado ||
              !formData.estadoId ||
              !formData.usuarioId ||
              !formData.localId
            }
          >
            SIGUIENTE
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default AltaMesasPage2;
