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
  InputLabel,
  MenuItem,
  FormHelperText,
  FormControl,
  FormControlLabel,
  Select,
  Switch,
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

function AltaUsuariosPage2() {
  const classes = useStyles();
  const [roles, setRoles] = useState([]);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    usuario: "",
    dni: "",
    email: "",
    telefono: "",
    contrasena: "",
    rolId: "",
    activo: true,
  });
  const [botonDeshabilitado, setBotonDeshabilitado] = useState(true);
  const [showDniWarning, setShowDniWarning] = useState(false);
  const [showTelefonoWarning, setShowTelefonoWarning] = useState(false);
  const [showEmailWarning, setShowEmailWarning] = useState(false);

  useEffect(() => {
    const isFormDataValid =
      formData.nombre.trim() &&
      formData.apellido.trim() &&
      formData.usuario.trim() &&
      //formData.dni.trim() &&
      //formData.email.trim() &&
      //formData.telefono.trim() &&
      formData.contrasena.trim() &&
      typeof formData.rolId !== "string";

    setBotonDeshabilitado(
      !isFormDataValid ||
        showDniWarning ||
        showTelefonoWarning ||
        showEmailWarning
    );
  }, [formData, showDniWarning, showTelefonoWarning, showEmailWarning]);

  const handleDniChange = (value) => {
    // Verificar si el valor ingresado es numérico
    const isDniValid = /^[0-9]*$/.test(value.trim());

    setShowDniWarning(!isDniValid);

    // Actualizar el estado solo si el valor es numérico
    if (isDniValid) {
      setFormData({ ...formData, dni: value.trim() });
    }
  };

  const handleTelefonoChange = (value) => {
    // Verificar si el valor ingresado es numérico
    const isTelefonoValid = /^[0-9]*$/.test(value.trim());

    setShowTelefonoWarning(!isTelefonoValid);

    // Actualizar el estado solo si el valor es numérico
    if (isTelefonoValid) {
      setFormData({ ...formData, telefono: value.trim() });
    }
  };

  const handleEmailChange = (value) => {
    const isEmailValid = /\S+@\S+\.\S+/.test(value);
    setShowEmailWarning(!isEmailValid);
    setFormData({ ...formData, email: value });
  };

  // Función para obtener los roles desde el servidor
  const obtenerRoles = async () => {
    try {
      const response = await fetch("http://localhost:8080/comanda/rol");
      if (response.ok) {
        const data = await response.json();
        setRoles(data); // Almacena los roles en el estado
      } else {
        console.error("Error al obtener los roles");
      }
    } catch (error) {
      console.error("Error al obtener los roles:", error);
    }
  };

  useEffect(() => {
    obtenerRoles(); // Llama a la función para obtener los roles cuando el componente se monta
  }, []);

  // Función para enviar los datos al servidor
  const handleSubmit = async () => {
    if (botonDeshabilitado) {
      console.error("El nombre no puede estar vacío");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/comanda/usuario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Usuario agregado correctamente");
        window.location.href = "/admin/alta-usuarios-3";
      } else {
        console.error("Error al agregar usuario");
        window.location.href = "/admin/alta-usuarios-2-error-1";
      }
    } catch (error) {
      console.error("Error al agregar el usuario:", error);
      // Puedes mostrar el error en un componente, por ejemplo, si es relevante
      // setErrorMessage("Error al agregar el usuario: " + error.message);
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
            to="/admin/alta-usuarios"
          >
            <ArrowBack />
          </Fab>
        </Grid>
        <Grid item xs={11}>
          <Box textAlign="center">
            <Typography component="h1" variant="h3">
              Usuarios
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Divider />

      <Grid container justifyContent="center" className={classes.flexMargin}>
        <Grid item>
          <Typography component="h1" variant="h6">
            AGREGAR USUARIO
          </Typography>
        </Grid>
      </Grid>

      <Grid container justifyContent="center" className={classes.flexMargin}>
        <Grid item xl={3}>
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
        <Grid item xl={3}>
          <TextField
            id="apellido"
            label="Apellido"
            variant="outlined"
            value={formData.apellido}
            onChange={(e) =>
              setFormData({ ...formData, apellido: e.target.value })
            }
          />
        </Grid>
      </Grid>

      <Grid container justifyContent="center" className={classes.flexMargin}>
        <Grid item xl={3}>
          <TextField
            id="usuario"
            label="Usuario"
            variant="outlined"
            value={formData.usuario}
            onChange={(e) =>
              setFormData({ ...formData, usuario: e.target.value })
            }
          />
        </Grid>
        <Grid item xl={3}>
          <TextField
            id="dni"
            label="Dni"
            variant="outlined"
            value={formData.dni}
            onChange={(e) => handleDniChange(e.target.value)}
          />
          <Grid>
            {showDniWarning && (
              <Typography variant="caption" color="error">
                El dni debe ser un número válido.
              </Typography>
            )}
          </Grid>
        </Grid>
      </Grid>

      <Grid container justifyContent="center" className={classes.flexMargin}>
        <Grid item xl={3}>
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            value={formData.email}
            onChange={(e) => handleEmailChange(e.target.value)}
          />
          <Grid>
            {showEmailWarning && (
              <Typography variant="caption" color="error">
                Ingrese un email válido. Ej: "...@asd.com"
              </Typography>
            )}
          </Grid>
        </Grid>
        <Grid item xl={3}>
          <TextField
            id="telefono"
            label="Telefono"
            variant="outlined"
            value={formData.telefono}
            onChange={(e) => handleTelefonoChange(e.target.value)}
          />
          <Grid>
            {showTelefonoWarning && (
              <Typography variant="caption" color="error">
                El teléfono debe ser un número válido.
              </Typography>
            )}
          </Grid>
        </Grid>
      </Grid>

      <Grid container justifyContent="center" className={classes.flexMargin}>
        <Grid item>
          <TextField
            id="contrasena"
            type="password"
            label="Contrasena"
            variant="outlined"
            value={formData.contrasena}
            onChange={(e) =>
              setFormData({ ...formData, contrasena: e.target.value })
            }
          />
        </Grid>
      </Grid>

      <Grid container justifyContent="center" className={classes.flexMargin}>
        <Grid item>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-helper-label">Rol</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="rol"
              value={formData.rolId}
              onChange={(e) =>
                setFormData({ ...formData, rolId: e.target.value })
              }
            >
              <FormHelperText>Rol del usuario</FormHelperText>
              <MenuItem value="">
                <em>Seleccione un rol</em>
              </MenuItem>
              {roles.map((rol) => (
                <MenuItem key={rol.id} value={rol.id}>
                  {rol.nombre}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Rol del usuario</FormHelperText>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container justifyContent="center" className={classes.flexMargin}>
        <Grid item>
          <FormControlLabel
            control={
              <Switch
                checked={formData.activo}
                onChange={() =>
                  setFormData({ ...formData, activo: !formData.activo })
                }
                color="primary"
              />
            }
            label={`¿Activo? ${formData.activo ? "Sí" : "No"}`}
          />
        </Grid>
      </Grid>

      <Grid container justifyContent="center">
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/admin/alta-usuarios-3"
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

export default AltaUsuariosPage2;
