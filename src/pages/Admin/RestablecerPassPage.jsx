import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  Button,
  Divider,
  makeStyles,
  Box,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const useStyles = makeStyles((theme) => ({
  flexTop: {
    marginTop: "30px",
  },
  flexMargin: {
    margin: "30px 0",
  },
  emailLink: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textDecoration: "none",
    color: "#ffffff", // Establecer el color del texto a blanco
    cursor: "pointer",
  },
  whatsappButton: {
    backgroundColor: "#4CAF50", // Cambia este color al verde que prefieras
    color: "#ffffff", // Texto en color blanco para mayor contraste
    "&:hover": {
      backgroundColor: "#45a049", // Cambia este color al tono más oscuro si prefieres un efecto de hover
    },
  },
}));

function RestablecerPassPage() {
  const classes = useStyles();
  const navigate = useNavigate();
  const email = "soportecomanda@gmail.com";
  const asuntoEmail = "COMANDA: Recuperación de contraseña";
  const mensajeEmail =
    "Hola, soy usuario de COMANDA y olvidé mi contraseña. ¿Pueden ayudarme a restablecerla?";
  const telefonoWhatsApp = "1167390317";
  const mensajeWhatsApp = "Hola, soy usuario de COMANDA y olvidé mi contraseña";
 
  const handleEmailClick = () => {
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(
      asuntoEmail
    )}&body=${encodeURIComponent(mensajeEmail)}`;
  };

  const handleWhatsAppClick = () => {
    const whatsappURL = `https://wa.me/${telefonoWhatsApp}?text=${encodeURIComponent(
      mensajeWhatsApp
    )}`;
    window.open(whatsappURL, "_blank");
  };

  return (
    <Container maxWidth="sm">
      <Grid container justifyContent="center" className={classes.flexTop}>
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
          <Typography component="h1" variant="h6">
            ¿Olvidaste tu contraseña?
          </Typography>
        </Grid>
        <Grid item>
          <Typography component="h1" variant="h6">
            No te preocupes, es posible recuperarla
          </Typography>
        </Grid>
      </Grid>

      <Grid container justifyContent="center" className={classes.flexMargin}>
        <Grid>
          <Typography component="h6" variant="subtitle1">
            Te ofrecemos canales de contacto directo con soporte a través de
            mail y chat al whatsapp para ayudarte a ingresar de nuevo a COMANDA.
          </Typography>
        </Grid>
      </Grid>

      <Grid container justifyContent="center" className={classes.flexMargin}>
        <Grid container alignItems="center" justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            className={classes.emailLink}
            onClick={handleEmailClick}
          >
            <EmailIcon fontSize="small" />
            <Typography component="h6" variant="subtitle1">
              {email}
            </Typography>
          </Button>
        </Grid>
      </Grid>

      <Grid container justifyContent="center" className={classes.flexMargin}>
        <Grid container alignItems="center" justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            className={classes.whatsappButton}
            onClick={handleWhatsAppClick}
          >
            <WhatsAppIcon fontSize="small" />
            <Typography component="h6" variant="subtitle1">
              CONTACTAR POR WHATSAPP
            </Typography>
          </Button>
        </Grid>
      </Grid>

      <br />

      <Grid container justifyContent="center">
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/admin"
          >
            VOLVER AL LOGIN
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default RestablecerPassPage;
