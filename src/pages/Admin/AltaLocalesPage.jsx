import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  Box,
  Divider,
  Fab,
  makeStyles,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ArrowBack from "@material-ui/icons/ArrowBack";
import { Link } from "react-router-dom";
import CustomizedTablesLocales from "../../components/CustomizedTablesLocales";

const useStyles = makeStyles((theme) => ({
  flexTop: {
    marginTop: "30px",
  },
  flexMargin: {
    margin: "30px 0",
  },
}));

function AltaLocalesPage() {
  const [locales, setLocales] = useState([]);
  const [user, setUser] = useState(null);
  const classes = useStyles();
  const navigate = useNavigate();
  const [loggedUser, setloggedUser] = useState({});

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("user"));
    if (!usuario) {
      navigate("/admin");
    } else {
      setUser(usuario);

      fetch("http://localhost:8080/comanda/localPorUsuario/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usuario), // Envía el nombre en formato JSON
      })
        .then((response) => response.json())
        .then((data) => {
          setLocales(data);
        })
        .catch((error) => {
          console.error("Error al obtener locales desde el servidor", error);
        });
    }
  }, []);

  const handleEdit = (id) => {
    window.location.href = `/admin/editar-locales/${id}`;
  };

  const handleDelete = (id) => {
    console.log("ID a eliminar:", id);
    fetch(`http://localhost:8080/comanda/local/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    })
      .then((response) => response.json())
      .then((data) => {})
      .catch((error) => {
        console.error("Error al eliminar el local:", error);
      });
  };

  useEffect(() => {
    setloggedUser(JSON.parse(localStorage.getItem("user")));
  }, [open]);

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
        {loggedUser && loggedUser.rol?.nombre === "ADMIN" && (
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
        )}
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

export default AltaLocalesPage;
