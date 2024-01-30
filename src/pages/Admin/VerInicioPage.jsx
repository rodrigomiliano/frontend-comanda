import {
  Container,
  Typography,
  Grid,
  Divider,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  flexTop: {
    marginTop: "30px",
  },
  flexMargin: {
    margin: "30px 0",
  },
}));

function VerInicioPage() {
  const classes = useStyles();

  return (
    <Container maxWidth="sm">
      <Grid container justifyContent="center" className={classes.flexTop}>
        <Grid item>
          <Typography component="h1" variant="h3">
            ComÁnda
          </Typography>
          <Typography component="h1" variant="h5">
            Te damos la bienvenida
          </Typography>
        </Grid>
      </Grid>

      <Divider />
    </Container>
  );
}

export default VerInicioPage;
