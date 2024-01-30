import { Link } from "react-router-dom";
import { Container, Grid, Typography, makeStyles } from "@material-ui/core";
import { Swiper, SwiperSlide } from "swiper/react";
import React, { useState, useEffect } from "react";
import SwiperCore, { FreeMode, Pagination } from "swiper";
import HouseIcon from "@material-ui/icons/House";
import CheckIcon from "@material-ui/icons/Check";
import MenuBookIcon from "@material-ui/icons/MenuBook";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

const useStyles = makeStyles((theme) => ({
  continueText: {
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
  continueParagraph: {
    display: "inline-block",
    margin: 0,
    opacity: 0,
    transform: "translateY(1em)",
    transition: "opacity 1s ease-in-out, transform 1s ease-in-out",
  },
  showText: {
    opacity: 1,
    transform: "translateY(0)",
  },
}));

function BienvenidaPage2() {
  const classes = useStyles();
  const [showContinueText, setShowContinueText] = useState(false);
  const [showAdditionalText, setShowAdditionalText] = useState(false);
  const [showFinalText, setShowFinalText] = useState(false);
  const [showContinuarText, setshowContinuarText] = useState(false);
  const [swiperInstance, setSwiperInstance] = useState(null);
  SwiperCore.use([FreeMode, Pagination]);

  useEffect(() => {
    const showContinueTimer = setTimeout(() => {
      setShowContinueText(true);
    }, 1000);

    const showAdditionalTimer = setTimeout(() => {
      setShowAdditionalText(true);
    }, 3000);

    const showFinalTimer = setTimeout(() => {
      setShowFinalText(true);
    }, 5000);

    const showContinuarTimer = setTimeout(() => {
      setshowContinuarText(true);
    }, 7000);

    return () => {
      clearTimeout(showContinueTimer);
      clearTimeout(showAdditionalTimer);
      clearTimeout(showFinalTimer);
      clearTimeout(showContinuarTimer);
    };
  }, []);

  const handleContainerClick = () => {
    // Cambiar de página al hacer clic en cualquier parte de la pantalla
    if (swiperInstance) {
      swiperInstance.slideNext();
    }
  };

  return (
    <Link to="/search" style={{ textDecoration: "none", color: "inherit" }}>
      <Container disableGutters={true} onClick={handleContainerClick}>
        <Container>
          <Swiper
            style={{ width: "100%", height: "100vh" }}
            pagination={true}
            modules={[Pagination]}
            className="mySwiper"
            onSwiper={setSwiperInstance}
          >
            <SwiperSlide>
              <Grid
                container
                justifyContent="center"
                direction="column"
                spacing={3}
              >
                <Grid item>
                  <Typography variant="h4" component="h1">
                    ¿Cómo funciona?
                  </Typography>
                </Grid>

                <Grid item style={{ marginBottom: "20px" }}>
                  <div className={classes.continueText} align="center">
                    <HouseIcon
                      fontSize="large"
                      className={`${classes.continueParagraph} ${
                        showContinueText ? classes.showText : ""
                      }`}
                      style={{ display: "block" }}
                    />
                    <Typography
                      variant="h5"
                      component="h2"
                      className={`${classes.continueParagraph} ${
                        showContinueText ? classes.showText : ""
                      }`}
                      style={{ display: "block" }}
                    >
                      Encuentra un restaurante
                    </Typography>
                    <Typography
                      className={`${classes.continueParagraph} ${
                        showContinueText ? classes.showText : ""
                      }`}
                      style={{ display: "block" }}
                    >
                      Según tus preferencias y antojos
                    </Typography>
                  </div>
                </Grid>

                <Grid item style={{ marginBottom: "20px" }}>
                  <div className={classes.continueText} align="center">
                    <CheckIcon
                      fontSize="large"
                      className={`${classes.continueParagraph} ${
                        showAdditionalText ? classes.showText : ""
                      }`}
                      style={{ display: "block" }}
                    />
                    <Typography
                      variant="h5"
                      component="h2"
                      className={`${classes.continueParagraph} ${
                        showAdditionalText ? classes.showText : ""
                      }`}
                      style={{ display: "block" }}
                    >
                      Productos actualizados
                    </Typography>
                    <Typography
                      className={`${classes.continueParagraph} ${
                        showAdditionalText ? classes.showText : ""
                      }`}
                      style={{ display: "block" }}
                    >
                      Menú completo y detallado para vos
                    </Typography>
                  </div>
                </Grid>

                <Grid item style={{ marginBottom: "20px" }}>
                  <div className={classes.continueText} align="center">
                    <MenuBookIcon
                      fontSize="large"
                      className={`${classes.continueParagraph} ${
                        showFinalText ? classes.showText : ""
                      }`}
                      style={{ display: "block" }}
                    />
                    <Typography
                      variant="h5"
                      component="h2"
                      className={`${classes.continueParagraph} ${
                        showFinalText ? classes.showText : ""
                      }`}
                      style={{ display: "block" }}
                    >
                      La carta en tu mano
                    </Typography>
                    <Typography
                      className={`${classes.continueParagraph} ${
                        showFinalText ? classes.showText : ""
                      }`}
                      style={{ display: "block" }}
                    >
                      Llegas al local y podés empezar <br />a pedir desde tu
                      celular
                    </Typography>
                  </div>
                </Grid>

                <Grid item style={{ marginBottom: "20px" }}>
                  <div className={classes.continueText} align="center">
                    <Typography
                      variant="body1"
                      component="p"
                      className={`${classes.continueParagraph} ${
                        showContinuarText ? classes.showText : ""
                      }`}
                      style={{ display: "block" }}
                    >
                      Toque la pantalla para continuar
                    </Typography>
                  </div>
                </Grid>
              </Grid>
            </SwiperSlide>
          </Swiper>
        </Container>
      </Container>
    </Link>
  );
}

export default BienvenidaPage2;
