import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Button,
  Divider,
  makeStyles,
  TextField,
  Fab,
} from "@material-ui/core";
import ArrowBack from "@material-ui/icons/ArrowBack";
import { Link, useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  flexTop: {
    marginTop: "30px",
  },
  flexMargin: {
    margin: "30px 0",
  },
}));

function RegistrarUsuarioPage() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    usuario: "",
    dni: "",
    email: "",
    telefono: "",
    contrasena: "",
    rolId: "2",
    activo: false,
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
      formData.contrasena.trim();

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

  // Función para enviar los datos al servidor
  const handleSubmit = async () => {
    if (botonDeshabilitado) {
      console.error("El nombre no puede estar vacío");
      return;
    }

    try {
      // Configura la solicitud POST
      const response = await fetch("http://localhost:8080/comanda/usuario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Envía el nombre en formato JSON
      });

      if (response.ok) {
        console.log("Usuario agregado correctamente");
        navigate("/admin/registrar-usuario-2"); 
      } else {
        console.error(
          "Error al agregar usuario:",
          response.status,
          response.statusText
        );
        navigate("/admin/registrar-usuario-error"); 
      }
    } catch (error) {
      console.error("Error al agregar el usuario:", error);
      // Puedes mostrar el error en un componente, por ejemplo, si es relevante
      // setErrorMessage("Error al agregar el usuario: " + error.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Grid container justifyContent="center" className={classes.flexTop}>
        <Grid item>
          <Fab
            size="small"
            color="primary"
            aria-label="arrow"
            component={Link}
            to="/admin"
          >
            <ArrowBack />
          </Fab>
        </Grid>
        <Grid item xs={11}>
          <Box textAlign="center">
            <Typography component="h1" variant="h3">
              COMANDA
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Divider />

      <Grid container justifyContent="center" className={classes.flexMargin}>
        <Grid item>
          <Typography component="h1" variant="h6">
            CREAR USUARIO
          </Typography>
        </Grid>
      </Grid>

      <Grid container justifyContent="center" className={classes.flexMargin}>
        <Grid item xl={5}>
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
        <Grid item xl={5}>
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
        <Grid item xl={5}>
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
        <Grid item xl={5}>
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
        <Grid item xl={5}>
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
        <Grid item xl={5}>
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
        <Grid item xl={5}>
          <TextField
            id="contrasena"
            label="Contraseña"
            type="password"
            variant="outlined"
            value={formData.contrasena}
            onChange={(e) =>
              setFormData({ ...formData, contrasena: e.target.value })
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
            to="/admin/registrar-usuario-2"
            onClick={handleSubmit}
            disabled={botonDeshabilitado}
          >
            CREAR CUENTA
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default RegistrarUsuarioPage;
