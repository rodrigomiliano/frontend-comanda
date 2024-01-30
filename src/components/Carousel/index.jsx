import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { FreeMode, Pagination } from "swiper";
import { Typography } from "@material-ui/core";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import "./style.css";
import { Link } from "react-router-dom";

SwiperCore.use([FreeMode, Pagination]);

function Carousel({ slides }) {
  return (
    <>
      <Typography variant="body2"></Typography>

      <Swiper
        slidesPerView={5}
        spaceBetween={30}
        freeMode={true}
        className="mySwiper"
      >
        {slides.map(({ text }, index) => (
          <SwiperSlide key={index}>{text} </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default Carousel;
