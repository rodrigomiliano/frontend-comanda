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
  Select,
} from "@material-ui/core";
import ArrowBack from "@material-ui/icons/ArrowBack";

const useStyles = makeStyles((theme) => ({
  flexTop: {
    marginTop: "30px",
  },
  flexMargin: {
    margin: "30px 0",
  },
}));

function EditarMesasPageBis() {
  const classes = useStyles();
  const [mesa, setMesa] = useState([]);
  const [sillas, setSillas] = useState("");
  const [observacion, setObservacion] = useState("");
  const [estados, setEstados] = useState([]);
  const [estadoId, setEstadoId] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioId, setUsuarioId] = useState("");
  const [locales, setLocales] = useState([]);
  const [localId, setLocalId] = useState("");
  const { id } = useParams();
  const [botonDeshabilitado, setBotonDeshabilitado] = useState(true);
  const [showSillasWarning, setShowSillasWarning] = useState(false);

  // Función para obtener estados
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

  // Función para obtener usuarios
  const obtenerUsuarios = async () => {
    try {
      const response = await fetch("http://localhost:8080/comanda/usuario");
      if (response.ok) {
        const data = await response.json();
        const usuarioLogueado = JSON.parse(localStorage.getItem("user"));
  
        // Filtrar los usuarios para obtener solo al usuario logueado
        const usuariosFiltrados = data.filter(
          (usu) => usu.id === usuarioLogueado.id
        );
  
        setUsuarios(usuariosFiltrados);
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

  // Función para obtener locales
  const obtenerLocales = async () => {
    try {
      const response = await fetch("http://localhost:8080/comanda/local");
      if (response.ok) {
        const data = await response.json();
        const usuarioLogueado = JSON.parse(localStorage.getItem("user"));
  
        // Filtrar los locales para obtener solo el local del usuario logueado
        const localUsuarioLogueado = data.find(
          (loc) => loc.usuariosLocales.some((uLoc) => uLoc.usuario.id === usuarioLogueado.id)
        );
  
        setLocales(localUsuarioLogueado ? [localUsuarioLogueado] : []);
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
    const camposVacios = !sillas || !localId; // Agrega localId a la condición de inhabilitación
    setBotonDeshabilitado(camposVacios);
  }, [sillas, localId]);

  const isInteger = (value) => {
    return /^\d+$/.test(value);
  };

  useEffect(() => {
    fetch(`http://localhost:8080/comanda/mesa/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setSillas(data.sillas);
        setObservacion(data.observacion);
        setMesa(data);
  
        if (data.estado) {
          setEstadoId(data.estado.id);
        } else {
          setEstadoId(""); // o configúralo en una ID de categoría predeterminada
        }
  
        // Asegúrate de manejar correctamente los datos de usuario y local si están presentes
        if (data.usuario) {
          setUsuarioId(data.usuario.id);
        } else {
          setUsuarioId(""); // o configúralo en una ID de usuario predeterminada
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
    fetch(`http://localhost:8080/comanda/mesabis/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sillas: sillas,
        observacion: observacion,        
        estadoId: estadoId,
        usuarioId: usuarioId,
        localId: localId,
        // Puedes agregar otros campos de mesa aquí según sea necesario
      }),
    })
      .then((response) => {
        if (!response.ok) {
          console.error("Error al actualizar la mesa:", response.status);
          window.location.href = "/admin/editar-mesas-error";
          throw new Error("Error al actualizar la mesa");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Datos actualizados:", data);
        // Redirigir a la página de lista de mesas después de editar
        window.location.href = "/admin/editar-mesas-2";
      })
      .catch((error) => {
        console.error("Error al actualizar la mesa:", error);
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
            to="/admin/alta-mesas"
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
          {mesa && mesa.id && (
            <Typography component="h1" variant="h6">
              EDITAR MESA: {mesa.id}
            </Typography>
          )}
        </Grid>
      </Grid>

      <Grid container justifyContent="center" className={classes.flexMargin}>
        <Grid item xl={6}>
          <label htmlFor="sillas">
            <TextField
              id="sillas"
              label="Sillas"
              variant="outlined"
              fullWidth
              value={sillas}
              onChange={(e) => {
                const newValue = e.target.value;
                if (!isNaN(newValue) && Number.isInteger(Number(newValue))) {
                  setSillas(newValue);
                  setShowSillasWarning(false); // Reinicia el estado de la advertencia
                } else {
                  setSillas(newValue); // Actualiza el estado aunque no sea un número
                  setShowSillasWarning(true);
                }
              }}
            />
          </label>
          <Grid>
            {showSillasWarning && (
              <Typography variant="caption" color="error">
                La cantidad de sillas debe ser un número válido.
              </Typography>
            )}
          </Grid>
        </Grid>
        <Grid item xl={6}>
          <label htmlFor="observacion">
            <TextField
              id="observacion"
              label="Observacion"
              variant="outlined"
              fullWidth
              value={observacion}
              onChange={(e) => setObservacion(e.target.value)}
            />
          </label>
        </Grid>
      </Grid>

      <Grid container justifyContent="center" className={classes.flexMargin}>
        <Grid item xl={6}>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-helper-label">Estado</InputLabel>
            <Select
              labelId="rol-select-label"
              id="rol-select"
              value={estadoId}
              onChange={(e) => setEstadoId(e.target.value)}
            >
              <FormHelperText>Estado de la mesa</FormHelperText>
              <MenuItem value="">
                <em>Seleccione un estado</em>
              </MenuItem>
              {estados.map((estado) => (
                <MenuItem key={estado.id} value={estado.id}>
                  {estado.nombre}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Estado de la mesa</FormHelperText>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container justifyContent="center" className={classes.flexMargin}>
        <Grid item xl={6}>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-helper-label">Usuario</InputLabel>
            <Select
              labelId="usuario-select-label"
              id="usuario-select"
              value={usuarioId}
              onChange={(e) => setUsuarioId(e.target.value)}
            >
              <FormHelperText>Usuario de la mesa</FormHelperText>
              <MenuItem value="">
                <em>Seleccione un usuario</em>
              </MenuItem>
              {usuarios.map((usuario) => (
                <MenuItem key={usuario.id} value={usuario.id}>
                  {usuario.usuario}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Usuario de la mesa</FormHelperText>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container justifyContent="center" className={classes.flexMargin}>
        <Grid item xl={6}>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-helper-label">Local</InputLabel>
            <Select
              labelId="local-select-label"
              id="local-select"
              value={localId}
              onChange={(e) => setLocalId(e.target.value)}
            >
              <FormHelperText>Local de la mesa</FormHelperText>
              <MenuItem value="">
                <em>Seleccione un local</em>
              </MenuItem>
              {locales.map((local) => (
                <MenuItem key={local.id} value={local.id}>
                  {local.nombre}
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
            to="/admin/editar-mesas-2"
            onClick={handleGuardar}
            disabled={botonDeshabilitado || showSillasWarning}
          >
            GUARDAR
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default EditarMesasPageBis;
