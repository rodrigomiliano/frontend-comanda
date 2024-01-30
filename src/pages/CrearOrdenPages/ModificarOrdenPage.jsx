import React, { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import {
  Chip,
  Grid,
  Paper,
  Box,
  Typography,
  ButtonBase,
  Avatar,
  makeStyles,
  Fab,
  Button,
  Divider,
  Container,
} from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import RemoveIcon from "@material-ui/icons/Remove";
import ArrowBack from "@material-ui/icons/ArrowBack";

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
    width: 92,
    height: 92,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  total: {
    marginRight: "20px",
    borderRadius: "30px",
    backgroundColor: theme.palette.success.dark,
    padding: "8px",
    color: "white",
    width: "100%",
    fontSize: "18px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
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
  flexTop: {
    marginTop: "15px",
  },
  flexEnd: {
    paddingBottom: "70px",
  },
  descPrice: {
    width: 210,
    height: 20,
    overflow: "hidden",
  },
}));

function ModificarOrdenPage() {
  const navigate = useNavigate();
  const classes = useStyles();
  const { id } = useParams();
  const [cart, setCart] = useState([]);
  const [totalCartItems, setTotalCartItems] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const [formDataMesaUso, setFormDataMesaUso] = useState({
    mesaId: 0,
    cart: [],
  });

  const removeItem = (id) => {
    const element = cart.find((p) => p.id == id);
    const found = cart.indexOf(element);
    cart.splice(found, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    refreshInfo();
  };
  useEffect(() => {
    refreshInfo();
  }, []);

  const sendOrder = async () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    if (cart.length === 0) {      
      console.log("No se puede marchar la orden. El carrito está vacío.");
      return;
    }

    setTotalAmount(0);
    setTotalCartItems(0);
    localStorage.setItem("cart", JSON.stringify([]));

    const tableId = JSON.parse(localStorage.getItem("tableId"));
    const form = {
      tableId: tableId,
      cart: cart,
    };
    try {
      const response = await fetch("http://localhost:8080/comanda/orden", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form), // Envía el nombre en formato JSON
      });

      if (response.ok) {
        // Redireccionar a la página siguiente si se agrega correctamente
      } else {
        console.error("Error");
      }
    } catch (error) {
      console.error("Error:", error);
    }
    //cart = cart.filter((p) => p != null);
    let total = 0;
    cart.forEach((x) => (total += x?.precio));
    setTotalAmount(total);
    setCart([]);
    navigate("/marchar-orden-3/" + id);
  };

  const refreshInfo = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    setTotalCartItems(cart.length);
    cart = cart.filter((p) => p != null);
    let total = 0;
    cart.forEach((x) => (total += x?.precio));
    setTotalAmount(total);
    setCart(cart);
  };

  return (
    <>
      <Grid container alignContent="flex-end" className={classes.flexMargin}>
        <Grid item xs={4}>
          <div className="margin5">
            <Fab
              size="small"
              color="primary"
              aria-label="arrow"
              component={Link}
              to={`/crear-orden-a/${id}`}
              className={classes.arrowBack}
            >
              <ArrowBack />
            </Fab>
          </div>
        </Grid>
        <div className="margin5">
          <Grid item xs={5} className={classes.flexMargin}>
            <Chip
              avatar={<Avatar>$</Avatar>}
              size="medium"
              label="Visualizar consumos"
              clickable
              color="primary"
              component={Link}
              to={"/visualizar-consumos/" + id}
              disabled
            />
          </Grid>
        </div>
      </Grid>

      <Container maxWidth="sm">
        <Box
          className={classes.flexEnd + " margin5"}
          textAlign="center"
          fontSize="24px"
        >
          Consumos para marchar
        </Box>

        {cart.map((p, index) => (
          <Paper className={classes.paper} key={"paper" + index}>
            <Grid container spacing={1}>
              <Grid item>
                <ButtonBase className={classes.image} title={p.descripcion}>
                  <img
                    className={classes.img}
                    alt="complex"
                    src={p.imagen}
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
                      {p.nombre}
                    </Typography>
                    <Typography
                      variant="body2"
                      gutterBottom
                      className={classes.descPrice}
                    >
                      {p.descripcion}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2" style={{ cursor: "pointer" }}>
                      ${p.precio}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item>
                  <Fab
                    title="Eliminar este producto"
                    aria-label="remove"
                    size="small"
                    onClick={() => removeItem(p.id)}
                  >
                    <RemoveIcon />
                  </Fab>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        ))}

        <br />
        <Divider style={{ margin: "40px 0" }} />
        <br />

        <Box
          className={classes.flexEnd + " margin5"}
          style={{
            position: "fixed",
            bottom: 0,
            padding: "10px",
          }}
        >
          <Box className={classes.total}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<ShoppingCartIcon />}
              style={{ borderRadius: "30px" }}
              onClick={sendOrder}
              disabled={totalCartItems === 0} // Deshabilitar el botón si el carrito está vacío
            >
              {totalCartItems} - Marchar orden
            </Button>
            <Box style={{ marginRight: "20px" }}>Total: ${totalAmount}</Box>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default ModificarOrdenPage;
