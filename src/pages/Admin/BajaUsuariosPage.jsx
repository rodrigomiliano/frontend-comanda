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
import CustomizedTablesUsers from "../../components/CustomizedTablesUsers";
import AlertComanda from "../../components/AlertComanda";

const useStyles = makeStyles((theme) => ({
  flexTop: {
    marginTop: "30px",
  },
  flexMargin: {
    margin: "30px 0",
  },
}));

function BajaUsuariosPage() {
  const [users, setUsers] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    fetch("http://localhost:8080/comanda/usuario")
      .then((response) => response.json())
      .then((data) => {
        if (
          JSON.parse(localStorage.getItem("user")).rol.nombre == "USER_LOCAL"
        ) {
          setUsers(
            data.filter(
              (x) => x.id === JSON.parse(localStorage.getItem("user")).id
            )
          );
        } else {
          setUsers(data);
        }
      })
      .catch((error) => {
        console.error("Error al obtener usuarios desde el servidor", error);
      });
  }, []);

  const handleEdit = (id) => {
    window.location.href = `/admin/editar-usuarios/${id}`;
  };

  const handleDelete = (id) => {
    console.log("ID a eliminar:", id);
    fetch(`http://localhost:8080/comanda/usuario/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Datos actualizados:", data);
      })
      .catch((error) => {
        console.error("Error al eliminar el usuario:", error);
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
              Usuarios
            </Typography>
          </Box>
        </Grid>
        <Grid item>
          <Fab
            size="small"
            color="primary"
            aria-label="add"
            component={Link}
            to="/admin/alta-usuarios-2"
          >
            <AddIcon />
          </Fab>
        </Grid>
      </Grid>

      <Grid container justifyContent="center" className={classes.flexMargin}>
        <Grid item>
          <AlertComanda
            sev="success"
            tit=""
            desc="Usuario eliminado con éxito."
          />
        </Grid>
      </Grid>

      <Divider />

      <Grid container justifyContent="center" className={classes.flexMargin}>
        <Grid item xs={12}>
          <CustomizedTablesUsers
            users={users}
            handleEdit={handleEdit}
            handleDelete={(id) => handleDelete(id)}
          ></CustomizedTablesUsers>
        </Grid>
      </Grid>
    </Container>
  );
}

export default BajaUsuariosPage;
