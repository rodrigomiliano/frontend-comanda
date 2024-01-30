import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Button,
  Divider,
  TextField,
  makeStyles,
} from "@material-ui/core";
import { useNavigate, Link } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";

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
    color: "inherit",
    cursor: "pointer",
  },
}));

function BienvenidaIngresoPage() {
  const classes = useStyles();
  const navigate = useNavigate();
  const email = "soportecomanda@gmail.com";

  const handleEmailClick = () => {    
    console.log("Email clicked");
  };

  return (
    <Container maxWidth="sm">
      <Grid container justifyContent="center" className={classes.flexTop}>
        <Grid item>
          <Typography component="h1" variant="h3">
            COMANDA
          </Typography>
        </Grid>
      </Grid>

      <Divider />

      <Grid container justifyContent="center" className={classes.flexMargin}>
        <Grid item>
          <Typography component="h1" variant="h6">
            INGRESAR
          </Typography>
        </Grid>
      </Grid>

      <Grid container justifyContent="center" className={classes.flexMargin}>
        <Grid>
          <Typography component="h6" variant="subtitle1">
            Su usuario aún se encuentra inactivo, por favor esperar a ser
            activado para ingresar al panel o comunicarse con COMANDA. Muchas
            gracias por la paciencia.
          </Typography>
        </Grid>
      </Grid>

      <Grid container justifyContent="center" className={classes.flexMargin}>
        <Grid container alignItems="center" justifyContent="center">
        <a
        href={`mailto:${email}`}
        className={classes.emailLink}
        onClick={handleEmailClick}
      >
          <EmailIcon fontSize="large" />
          <Typography component="h6" variant="subtitle1">
          {email}
          </Typography>
          </a>
        </Grid>
      </Grid>

      <Grid container justifyContent="center" className={classes.flexMargin}>
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

export default BienvenidaIngresoPage;
