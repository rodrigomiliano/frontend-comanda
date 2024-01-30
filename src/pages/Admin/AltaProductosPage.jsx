import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import CustomizedTablesProductos from "../../components/CustomizedTablesProductos";

const useStyles = makeStyles((theme) => ({
  flexTop: {
    marginTop: "30px",
  },
  flexMargin: {
    margin: "30px 0",
  },
}));

function AltaProductosPage() {
  const [productos, setProductos] = useState([]);
  const classes = useStyles();
  const [user, setUser] = useState(null);
  const [loggedUser, setloggedUser] = useState({});
  const navigate = useNavigate();
  
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;
  
    if (!user) {
      navigate("/admin");
    } else {
      setUser(user);
  
      // Verificar el contenido completo del usuario
      console.log("Usuario almacenado:", user);  
      // Verificar USER_ROL directamente
      console.log("USER_ROL:", user && user.rol);
  
      if (user.rol === 1) {
        console.log("Fetching productos for USER_ROL 1");
        fetch("http://localhost:8080/comanda/buscarproducto", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: user.id }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Productos recibidos:", data);
            setProductos(data);
          })
          .catch((error) => {
            console.error("Error al obtener productos desde el servidor", error);
          });
      } else  {
        console.log("Fetching productos for USER_ROL 2");
        fetch("http://localhost:8080/comanda/buscarproducto", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: localStorage.getItem("user"),
          //body: JSON.stringify({ localId: user.localId }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Productos recibidos:", data);
            setProductos(data);
          })
          .catch((error) => {
            console.error(
              "Error al obtener productos desde el servidor",
              error
            );
          });
      }
    }
  }, [navigate]);

  const handleEdit = (id) => {    
    window.location.href = `/admin/editar-productos/${id}`;
  };

  const handleDelete = (id) => {
    console.log("ID a eliminar:", id); 
    fetch(`http://localhost:8080/comanda/producto/${id}`, {
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
        console.error("Error al eliminar el producto:", error);
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
              Productos
            </Typography>
          </Box>
        </Grid>
        <Grid item>
          <Fab
            size="small"
            color="primary"
            aria-label="add"
            component={Link}
            to="/admin/alta-productos-2"
          >
            <AddIcon />
          </Fab>
        </Grid>
      </Grid>

      <Divider />

      <Grid container justifyContent="center" className={classes.flexMargin}>
        <Grid item xs={12}>
          <CustomizedTablesProductos
            productos={productos}
            handleEdit={handleEdit}
            handleDelete={(id) => handleDelete(id)}
          ></CustomizedTablesProductos>
        </Grid>
      </Grid>
    </Container>
  );
}

export default AltaProductosPage;
