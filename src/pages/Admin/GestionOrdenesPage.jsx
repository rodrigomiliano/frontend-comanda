import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { purple } from "@mui/material/colors";
import {
  withStyles,
  Container,
  Typography,
  Grid,
  TableCell,
  Box,
  Divider,
  makeStyles,
  TableRow,
  Fab,
} from "@material-ui/core";
import ArrowBack from "@material-ui/icons/ArrowBack";
import { Link } from "react-router-dom";
import RefreshIcon from "@material-ui/icons/Refresh";

const useStyles = makeStyles((theme) => ({
  flexTop: {
    marginTop: "30px",
  },
  flexMargin: {
    margin: "30px 0",
  },
}));

function GestionOrdenesPage() {
  const purple500 = purple[500];
  const [ordenes, setOrdenes] = useState([]);
  const [user, setUser] = useState();
  const classes = useStyles();
  const navigate = useNavigate();

  const StyledTableRow = withStyles((theme) => ({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("user"));
    if (!usuario) {
      navigate("/admin");
    } else {
      setUser(usuario);

      fetch("http://localhost:8080/comanda/comandas?fecha=", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usuario),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setOrdenes(data);
        })
        .catch((err) => {
          console.error("Instalar json-server");
        });
    }
  }, []);

  const seeDetail = (x) => {
    console.log(x);
  };

  const handleRefresh = () => {
    window.location.reload(); // Recarga la página
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
              Ordenes
            </Typography>
          </Box>
        </Grid>
        <Grid item>
          <Fab
            size="small"
            color="primary"
            aria-label="refresh"
            onClick={handleRefresh}
          >
            <RefreshIcon />
          </Fab>
        </Grid>
      </Grid>

      <Divider />
      <Grid container justifyContent="center" className={classes.flexMargin}>
        <Grid item xs={12}>
          {ordenes &&
            ordenes.map((orden, index) => (
              <Accordion key={index}>
                <AccordionSummary
                  id="panel-header"
                  aria-controls="panel-content"
                  className="margin5"
                >
                  <ul className="margin5">
                    <li>TOQUE AQUI PARA VER DETALLE DE CONSUMOS</li>
                    <li>Local: {orden.comanda.mesa.local.nombre}</li>
                    <li>Id: {orden.comanda.id}</li>
                    <li>
                      Estado:{" "}
                      <span
                        className={
                          orden.comanda.estado.nombre == "FINALIZADO"
                            ? "bc-red with100"
                            : "bc-green with100"
                        }
                      >
                        {orden.comanda.estado.nombre}{" "}
                      </span>
                    </li>
                    <li>
                      Mesa: {orden.comanda.mesa.id} -{" "}
                      {orden.comanda.mesa.observacion}
                    </li>
                    <li>Total $: {orden.comanda.total}</li>
                  </ul>
                </AccordionSummary>
                <AccordionDetails key={"order" + index}>
                  <u>Detalle de consumos: </u>
                  <div className="container">
                    <table className="table ">
                      {orden.items.map((key, in2) => (
                        <tbody key={"tbody" + in2}>
                          <tr key={"div" + in2}>
                            <td>{key.producto.nombre}:</td>
                            <td>............</td>
                            <td>{" $ " + key.precio}</td>
                          </tr>
                        </tbody>
                      ))}
                    </table>
                  </div>
                </AccordionDetails>
              </Accordion>
            ))}
        </Grid>
      </Grid>
    </Container>
  );
}

export default GestionOrdenesPage;
