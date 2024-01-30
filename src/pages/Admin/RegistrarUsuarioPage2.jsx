import {
  Container,
  Typography,
  Grid,
  Button,
  Divider,
  makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import CheckIcon from "@material-ui/icons/Check";

const useStyles = makeStyles((theme) => ({
  flexTop: {
    marginTop: "30px",
  },
  flexMargin: {
    margin: "30px 0",
  },
}));

function RestablecerPassPage() {
  const classes = useStyles();

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
            REGISTRO EXITOSO
          </Typography>
        </Grid>
      </Grid>

      <Grid container justifyContent="center" className={classes.flexMargin}>
        <Grid item>
          <CheckIcon style={{ fontSize: 140 }} color="primary"></CheckIcon>
        </Grid>
      </Grid>

      <Grid container justifyContent="center" className={classes.flexMargin}>
        <Grid item>
          <Typography component="h2" variant="h6">
            Se registró su usuario correctamente, pronto nos pondremos en
            contacto con ud. para dar de alta su local y empezar a utilizar
            COMANDA.
          </Typography>
        </Grid>
      </Grid>

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
