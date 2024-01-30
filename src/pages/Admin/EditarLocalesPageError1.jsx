import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Box,
  Divider,
  makeStyles,
  Fab,  
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ArrowBack from "@material-ui/icons/ArrowBack";
import { Link } from "react-router-dom";
import CustomizedTablesLocales from "../../components/CustomizedTablesLocales";
import AlertComanda from "../../components/AlertComanda";

const useStyles = makeStyles((theme) => ({
  flexTop: {
    marginTop: "30px",
  },
  flexMargin: {
    margin: "30px 0",
  },
}));

function EditarLocalesPageError1() {  
  const [locales, setLocales] = useState([]);
  const classes = useStyles();

  useEffect(() => { 
    fetch("http://localhost:8080/comanda/local")
    .then((response) => response.json())
    .then((data) => {
      setLocales(data);
    })
    .catch((error) => {
      console.error("Error al obtener locales desde el servidor", error);
    });
  }, []);
  
  const handleEdit = (id) => {
    // Realiza la redirección con el ID
    window.location.href = `/admin/editar-locales/${id}`;
  };
  
  const handleDelete = (id) => {
    console.log("ID a eliminar:", id); // Verifica que el ID se imprima correctamente
    fetch(`http://localhost:8080/comanda/local/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}), // No parece que necesites enviar algún cuerpo en la solicitud DELETE
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Datos actualizados:", data);      
      })
      .catch((error) => {
        console.error("Error al eliminar el local:", error);
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
            to="/admin/ver-inicio"
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
        <Grid item>
          <Fab
            size="small"
            color="primary"
            aria-label="add"
            component={Link}
            to="/admin/alta-locales-2"
          >
            <AddIcon />
          </Fab>
        </Grid>
      </Grid>

      <Grid container justifyContent="center" className={classes.flexMargin}>
        <Grid item>
          <AlertComanda
            sev="error"
            tit="error"
            desc="Ya existe un local con ese nombre"
          />
        </Grid>
      </Grid>

      <Divider />

      <Grid container justifyContent="center" className={classes.flexMargin}>
        <Grid item xs={12}>
          <CustomizedTablesLocales 
          locales={locales}
          handleEdit={handleEdit}
          handleDelete={(id) => handleDelete(id)}
          ></CustomizedTablesLocales>
        </Grid>
      </Grid>
    </Container>
  );
}

export default EditarLocalesPageError1;
