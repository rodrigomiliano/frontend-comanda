import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Button,
  Divider,
  TextField,
  makeStyles,
} from "@material-ui/core";
import { useNavigate, Link } from "react-router-dom";
import AlertComanda from "../../components/AlertComanda";

const useStyles = makeStyles((theme) => ({
  flexTop: {
    marginTop: "30px",
  },
  flexMargin: {
    margin: "30px 0",
  },
}));

function BienvenidaIngresoPage() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [errorSeverity, setErrorSeverity] = useState("error");
  const [formError, setFormError] = useState("");
  const [authError, setAuthError] = useState("");
  const [isFormIncomplete, setIsFormIncomplete] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    localStorage.removeItem("user");
  }, []);

  const handleLogin = () => {
    // Limpiar errores previos al intentar iniciar sesión
    setFormError("");
    setAuthError("");

    // Verificar si ambos campos están completos
    if (!formData.email || !formData.password) {
      setErrorSeverity("error");
      setFormError("Todos los campos son obligatorios");
      setIsFormIncomplete(true);
      return;
    }

    fetch(`http://localhost:8080/comanda/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data != null) {
          // Verificar si el usuario está inactivo (con el valor booleano false)
          if (data.activo === false) {
            // Redirigir al usuario inactivo a la página específica
            navigate("/admin/inactivo");
            return;
          }

          localStorage.setItem("user", JSON.stringify(data));
          navigate("ver-inicio");
        }
      })
      .catch((error) => {
        setIsFormIncomplete(false);
        setErrorSeverity("error");
        setAuthError("Usuario o contraseña inválidos");
        console.error("Error en login", error);
      });
  };

  return (
    <Container maxWidth="sm">
      <Grid container justifyContent="center" className={classes.flexTop}>
        <Grid item>
          <Typography component="h1" variant="h3">
            COMANDA
          </Typography>
        </Grid>
      </Grid>

      <Divider />

      <Grid container justifyContent="center" className={classes.flexMargin}>
        <Grid item>
          <Typography component="h1" variant="h6">
            INGRESAR
          </Typography>
        </Grid>
      </Grid>

      <Grid container justifyContent="center" className={classes.flexMargin}>
        <Grid item>
          <TextField
            id="email"
            label="Correo electrónico"
            variant="outlined"
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
            }}
          />
        </Grid>
      </Grid>

      <Grid container justifyContent="center" className={classes.flexMargin}>
        <Grid item>
          <TextField
            id="password"
            type="password"
            label="Contraseña"
            variant="outlined"
            value={formData.password}
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
            }}
          />
        </Grid>
      </Grid>

      <Grid container justifyContent="center" className={classes.flexMargin}>
        <Grid item>
          {isFormIncomplete && (
            <AlertComanda
              tit="Error"
              sev="error"
              desc="Todos los campos son obligatorios"
              severity={errorSeverity}
            >
              {formError}{" "}
            </AlertComanda>
          )}
        </Grid>
      </Grid>

      <Grid container justifyContent="center" className={classes.flexMargin}>
        <Grid item>
          {authError && (
            <AlertComanda
              tit="Error"
              sev="error"
              desc="Usuario y/o contraseña inválidos"
              severity={errorSeverity}
            >
              {authError}{" "}
            </AlertComanda>
          )}
        </Grid>
      </Grid>

      <Grid container justifyContent="center" className={classes.flexMargin}>
        <Grid item>
          <Button variant="contained" color="primary" onClick={handleLogin}>
            INGRESAR
          </Button>
        </Grid>
      </Grid>

      <Grid container justifyContent="center">
        <Grid item>
          <Button color="primary" component={Link} to="/admin/restablecer-pass">
            ¿Has olvidado la contraseña?
          </Button>
        </Grid>
      </Grid>

      <Grid container justifyContent="center">
        <Grid item>
          <Button
            color="primary"
            component={Link}
            to="/admin/registrar-usuario"
          >
            ¿No tenés cuenta? Registrate
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default BienvenidaIngresoPage;
