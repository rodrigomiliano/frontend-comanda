import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  makeStyles,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Fab,  
} from "@material-ui/core";
import StoreIcon from "@material-ui/icons/Store";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import ArrowBack from "@material-ui/icons/ArrowBack";
import DialogInfo from "../../components/DialogInfo";

const useStyles = makeStyles((theme) => ({
  contImg: {
    width: "100%",
    height: "220px",
    overflow: "hidden",    
    borderRadius: "6px",
    backgroundPosition: "center",
    backgroundSize: "cover", // Asegura que la imagen se ajuste al contenedor
    position: "relative", // Agregado para posicionar elementos hijos de manera absoluta
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "50% 50%", // Centrar la imagen verticalmente
  },
  arrowBack: {
    position: "absolute",
    top: "10px",
    left: "10px",
    zIndex: 1, // Para que el ícono esté encima de la imagen
  },
  flexTop: {
    marginTop: "30px",
  },
  flexMargin: {
    margin: "30px 0",
  },
}));

function SearchResto() {
  const classes = useStyles();
  const { id } = useParams(); // Utiliza el ID para obtener los detalles del local desde tu fuente de datos
  const [local, setLocal] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/comanda/local/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setLocal(data);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });
  }, [id]);

  return (
    <>
      <Container disableGutters={true}>
        <div className={classes.contImg}>
          <Fab
            size="small"
            color="primary"
            aria-label="arrow"
            component={Link}
            to="/search"
            className={classes.arrowBack}
          >
            <ArrowBack />
          </Fab>
          {local &&
            local.imagen && ( // Verifica si hay datos y una URL de imagen
              <img className={classes.img} src={local.imagen} alt="Local" />
            )}
        </div>
      </Container>

      <Container maxWidth="sm">
        <List>
          <ListItem>
            <ListItemIcon>
              <StoreIcon fontSize="large" />
            </ListItemIcon>
            {local ? (
              <ListItemText primary={local.nombre} />
            ) : (
              <ListItemText primary="Cargando datos..." />
            )}
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <LocationOnIcon fontSize="large" />
            </ListItemIcon>
            {local ? (
              <ListItemText
                secondary={`${local.calle} ${local.altura}, CP ${local.codigo_postal}`}
              />
            ) : (
              <ListItemText secondary="Cargando datos..." />
            )}
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <PhoneIcon fontSize="large" />
            </ListItemIcon>
            {local ? (
              <ListItemText secondary={local.telefono} />
            ) : (
              <ListItemText secondary="Cargando datos..." />
            )}
          </ListItem>
        </List>

        <Divider />

        <Grid container alignContent="flex-end" className={classes.flexMargin}>
          <Grid item>
            {local ? (
              <Typography component="h3" variant="body1">
                {local.descripcion}
              </Typography>
            ) : (
              <Typography component="h3" variant="body1">
                Cargando descripción...
              </Typography>
            )}
          </Grid>
        </Grid>

        <Divider />

        <Grid container justifyContent="center" className={classes.flexMargin}>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to={`/items/${id}`}
            >
              VER MENÚ
            </Button>
          </Grid>
        </Grid>

        <Grid container justifyContent="center" className={classes.flexMargin}>
          <Grid item>
            <DialogInfo
              mensaje="EMPEZAR A PEDIR"
              pregunta={
                <>
                  ¿Ya estás en el local?
                  <br />
                  Si es así, empezá a pedir desde tu mesa
                </>
              }
              btnIzquierda="No"
              btnDerecha="Sí, ya llegué"
              hrefIzquierda=""
              hrefDerecha={`/seleccionar-mesa/${id}`}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default SearchResto;