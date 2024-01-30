import { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import ArrowBack from "@material-ui/icons/ArrowBack";
import {
  Grid,
  makeStyles,
  Paper,
  Typography,
  ButtonBase,
  Container,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
} from "@material-ui/core";
import RestaurantIcon from "@material-ui/icons/Restaurant";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: "20px",
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    marginBottom: "10px",
    maxWidth: 500,
  },
  image: {
    width: 100,
    height: 100,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  fixed: {
    bottom: "0px",
    backgroundColor: theme.palette.primary.contrastText,
    width: "100%",
    height: "50px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  total: {
    marginRight: "20px",
    borderRadius: "30px",
    backgroundColor: theme.palette.success.dark,
    padding: "8px",
    color: "white",
    fontSize: "18px",
  },
  total2: {
    marginRight: "20px",
    borderRadius: "30px",
    backgroundColor: theme.palette.primary.dark,
    color: "white",
    width: "100%",
    fontSize: "18px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  descPrice: {
    width: 180,
    height: 20,
    overflow: "hidden",
  },
}));

function VisualizarConsumos() {
  const { id } = useParams();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [consumos, setConsumos] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseTable = async () => {
    const tableId = JSON.parse(localStorage.getItem("tableId"));
    try {
      const response = await fetch(
        "http://localhost:8080/comanda/close/" + JSON.stringify(tableId),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        navigate("/confirmar-cerrar-mesa/" + id);
      }
    } catch (error) {
      console.error("Error al cerrar mesa", error);
    }
  };

  useEffect(() => {
    const tableId = JSON.parse(localStorage.getItem("tableId"));
    fetch(`http://localhost:8080/comanda/consumos/` + tableId)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setConsumos(data || []);
        let total = 0;
        data.forEach((c) => (total += c.precio));
        setTotalAmount(total);
      })
      .catch((error) => {
        console.error("Error al obtener consumos:", error);
      });
  }, []);

  return (
    <>
      <Grid container alignContent="flex-end" className={classes.flexMargin}>
        <div className="margin5">
          <Fab
            size="small"
            color="primary"
            aria-label="arrow"
            component={Link}
            to={`/agregar-adicionales-1/${id}`}
            className={classes.arrowBack}
          >
            <ArrowBack />
          </Fab>
        </div>
      </Grid>

      <Container maxWidth="sm">
        <Box
          className={classes.fixed + " margin5 padding5 "}
          textAlign={"center"}
          fontSize="24px"
        >
          Consumos realizados
        </Box>
      </Container>

      <div className={classes.root}>
        {consumos.map((consumo, index) => (
          <Paper className={classes.paper} key={index}>
            <Grid container spacing={2}>
              <Grid item>
                <ButtonBase className={classes.image}>
                  <img
                    className={classes.img}
                    alt="Imagen del producto"
                    src={consumo.producto.imagen} // Ajusta esto según la estructura de tu objeto producto
                    style={{
                      //maxWidth: "100px",
                      //maxHeight: "100px",
                      width: "100px", //ancho
                      height: "100px", //alto
                      margin: "5px",
                      objectFit: "cover",
                      objectPosition: "50% 50%", // Centrar la imagen verticalmente
                      borderRadius: "6px",
                    }}
                  />
                </ButtonBase>
              </Grid>
              <Grid item xs sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <Typography gutterBottom variant="subtitle1">
                      {consumo.producto.nombre}
                    </Typography>
                    <Typography
                      variant="body2"
                      gutterBottom
                      className={classes.descPrice}
                    >
                      {consumo.producto.descripcion}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2" style={{ cursor: "pointer" }}>
                      ${consumo.precio}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        ))}

        <Box className={classes.fixed}>
          <Button
            variant="contained"
            color="primary"
            style={{ marginLeft: "20px", borderRadius: "30px" }}
            startIcon={<RestaurantIcon />}
            onClick={handleCloseTable}
          >
            Cerrar mesa
          </Button>
          <Box className={classes.total}>Total: ${totalAmount}</Box>
        </Box>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Cierre de mesa"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Realmente desea cerrar la mesa?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="contained">
            Cancelar
          </Button>
          <Button
            onClick={handleClose}
            color="primary"
            variant="contained"
            autoFocus
            component={Link}
            to="/gestionar-pago"
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default VisualizarConsumos;
