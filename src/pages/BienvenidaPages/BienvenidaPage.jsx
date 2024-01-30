import { Link } from "react-router-dom";
import { Container, Grid, Typography, makeStyles } from "@material-ui/core";
import { Swiper, SwiperSlide } from "swiper/react";
import React, { useState, useEffect } from "react";
import SwiperCore, { FreeMode, Pagination } from "swiper";

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

function BienvenidaPage() {
  const classes = useStyles();
  const [showContinueText, setShowContinueText] = useState(false);
  const [showAdditionalText, setShowAdditionalText] = useState(false);
  const [showFinalText, setShowFinalText] = useState(false);
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

    return () => {
      clearTimeout(showContinueTimer);
      clearTimeout(showAdditionalTimer);
      clearTimeout(showFinalTimer);
    };
  }, []);

  const handleContainerClick = () => {
    // Cambiar de página al hacer clic en cualquier parte de la pantalla
    if (swiperInstance) {
      swiperInstance.slideNext();
    }
  };

  return (
    <Link
      to="/bienvenida-2"
      style={{ textDecoration: "none", color: "inherit" }}
    >
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
                alignItems="center"
                direction="column"
                style={{ height: "100vh" }}
              >
                <Grid item>
                  <Typography variant="h3" component="h1" align="center">
                    ComÁnda
                  </Typography>
                </Grid>

                <Grid item style={{ marginBottom: "20px" }}>
                  <div className={classes.continueText}>
                    <Typography
                      variant="h5"
                      component="h2"
                      className={`${classes.continueParagraph} ${
                        showContinueText ? classes.showText : ""
                      }`}
                      align="center"
                    >
                      Te damos la bienvenida
                    </Typography>
                  </div>
                </Grid>

                <Grid item style={{ marginBottom: "20px" }}>
                  {showContinueText && (
                    <div className="continue-text">
                      <Typography
                        variant="body1"
                        component="p"
                        align="center"
                        className={`${classes.continueParagraph} ${
                          showAdditionalText ? classes.showText : ""
                        }`}
                      >
                        La aplicación para ver la carta y pedir en tu
                        restaurante favorito
                      </Typography>
                    </div>
                  )}
                </Grid>
                <Grid item>
                  {showAdditionalText && (
                    <div className="continue-text">
                      <Typography
                        variant="body1"
                        component="p"
                        align="center"
                        className={`${classes.continueParagraph} ${
                          showFinalText ? classes.showText : ""
                        }`}
                      >
                        <br />
                        Toque la pantalla para continuar
                      </Typography>
                    </div>
                  )}
                </Grid>
              </Grid>
            </SwiperSlide>
          </Swiper>
        </Container>
      </Container>
    </Link>
  );
}

export default BienvenidaPage;
