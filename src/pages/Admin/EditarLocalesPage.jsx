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
import UploadWidget from "../../components/cloudinary/UploadWidget";

const useStyles = makeStyles((theme) => ({
  flexTop: {
    marginTop: "30px",
  },
  flexMargin: {
    margin: "30px 0",
  },
}));

function EditarLocalesPage() {
  const classes = useStyles();
  const [local, setLocal] = useState(null);
  const [nombre, setNombre] = useState("");
  const [calle, setCalle] = useState("");
  const [altura, setAltura] = useState("");
  const [codigo_postal, setCodigo_postal] = useState("");
  const [telefono, setTelefono] = useState("");
  const [imagen, setImagen] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const { id } = useParams();
  const [botonDeshabilitado, setBotonDeshabilitado] = useState(true);
  const [showAlturaWarning, setShowAlturaWarning] = useState(false);
  const [showCPWarning, setShowCPWarning] = useState(false);
  const [showTelWarning, setShowTelWarning] = useState(false);
  const [nuevaImagenCargada, setNuevaImagenCargada] = useState(false);

  const handleImageUpload = (imageUrl) => {
    setImagen(imageUrl); // Actualiza el estado de la imagen con la URL cargada
    setNuevaImagenCargada(true); // Indica que se ha cargado una nueva imagen
  };

  useEffect(() => {
    const isNumericAltura =
      !altura ||
      String(altura).trim() === "" ||
      Number.isInteger(parseFloat(altura));
    const isNumericCP =
      !codigo_postal ||
      String(codigo_postal).trim() === "" ||
      Number.isInteger(parseFloat(codigo_postal));
    const isNumericTel =
      !telefono ||
      String(telefono).trim() === "" ||
      Number.isInteger(parseFloat(telefono));

    const camposCompletos =
      nombre.trim() &&
      calle.trim() &&
      imagen.trim() &&
      isNumericAltura &&
      isNumericCP &&
      isNumericTel;

    const camposNulos = !altura || !codigo_postal || !telefono;

    setBotonDeshabilitado(!camposCompletos || camposNulos);
  }, [nombre, calle, imagen, altura, codigo_postal, telefono, descripcion]);

  const handleAlturaChange = (e) => {
    const value = e.target.value;
    setAltura(value);
    setShowAlturaWarning(
      value.trim() !== "" &&
        (isNaN(value) || !Number.isInteger(parseFloat(value)))
    );
  };

  const handleCodigoPostalChange = (e) => {
    const value = e.target.value;
    setCodigo_postal(value);
    setShowCPWarning(
      value.trim() !== "" &&
        (isNaN(value) || !Number.isInteger(parseFloat(value)))
    );
  };

  const handleTelefonoChange = (e) => {
    const value = e.target.value;
    setTelefono(value);
    setShowTelWarning(
      value.trim() !== "" &&
        (isNaN(value) || !Number.isInteger(parseFloat(value)))
    );
  };

  useEffect(() => {
    fetch(`http://localhost:8080/comanda/local/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setNombre(data.nombre);
        setCalle(data.calle);
        setAltura(data.altura);
        setCodigo_postal(data.codigo_postal); // Actualiza con el nombre de propiedad correcto
        setTelefono(data.telefono);
        setImagen(data.imagen);
        setDescripcion(data.descripcion);
        setLocal(data);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });
  }, [id]);

  const handleGuardar = () => {
    if (botonDeshabilitado) {
      console.error("Por favor complete los campos correctamente");
      return;
    }

    fetch(`http://localhost:8080/comanda/local/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: nombre,
        calle: calle,
        altura: altura,
        codigo_postal: codigo_postal,
        telefono: telefono,
        imagen: imagen,
        descripcion: descripcion,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          console.error("Error al actualizar el local:", response.status);
          window.location.href = "/admin/editar-locales-error-1";
          throw new Error("Error al actualizar el local");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Datos actualizados:", data);
        // Obtener la lista actualizada de locales después de editar
        fetch("http://localhost:8080/comanda/local")
          .then((response) => response.json())
          .then((data) => {
            setLocales(data); // Actualizar el estado de locales
            window.location.href = "/admin/editar-locales-2";
          })
          .catch((error) => {
            //console.error("Error al obtener locales después de editar:", error);
          });
      })
      .catch((error) => {
        //console.error("Error al actualizar el local:", error);
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
          {local && local.nombre && (
            <Typography component="h1" variant="h6">
              EDITAR LOCAL: {local.nombre}
            </Typography>
          )}
        </Grid>
      </Grid>

      <Grid container justifyContent="center" className={classes.flexMargin}>
        <Grid item>
          <label htmlFor="nombre">
            <TextField
              id="nombre"
              label="Nombre"
              variant="outlined"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </label>
        </Grid>
      </Grid>

      <Grid container justifyContent="center" className={classes.flexMargin}>
        <Grid item>
          <label htmlFor="calle">
            <TextField
              id="calle"
              label="Calle"
              variant="outlined"
              value={calle}
              onChange={(e) => setCalle(e.target.value)}
            />
          </label>
        </Grid>
      </Grid>

      <Grid container justifyContent="center" className={classes.flexMargin}>
        <Grid item>
          <label htmlFor="altura">
            <TextField
              id="altura"
              label="Altura"
              variant="outlined"
              value={altura}
              onChange={(e) => handleAlturaChange(e)}
            />
          </label>
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
          <label htmlFor="codigo_postal">
            <TextField
              id="codigo_postal"
              label="Codigo Postal"
              variant="outlined"
              value={codigo_postal}
              onChange={(e) => handleCodigoPostalChange(e)}
            />
          </label>
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
          <label htmlFor="telefono">
            <TextField
              id="telefono"
              label="Telefono"
              variant="outlined"
              value={telefono}
              onChange={(e) => handleTelefonoChange(e)}
            />
          </label>
          <Grid>
            {showTelWarning && (
              <Typography variant="caption" color="error">
                El teléfono debe ser un número válido.
              </Typography>
            )}
          </Grid>
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
          <label htmlFor="descripcion">
            <TextField
              id="descripcion"
              label="Descripcion"
              variant="outlined"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </label>
        </Grid>
      </Grid>

      <Grid container justifyContent="center">
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/admin/editar-locales-2"
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

export default EditarLocalesPage;
