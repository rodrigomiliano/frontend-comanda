import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { FreeMode, Pagination } from "swiper";
import { Typography } from "@material-ui/core";

/* import { useEffect, useState } from "react"; */
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import "./style.css";

import { Link } from "react-router-dom";

SwiperCore.use([FreeMode, Pagination]);

function Carousel({ slides }) {
  /* useEffect(() => {    
    fetch("http://localhost:8080/categories")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => {
        console.error("Instalar json-server");
      });
  }, []);
 */

  return (
    <>
      <Typography variant="body2"></Typography>

      <Swiper
        slidesPerView={2.4}
        spaceBetween={10}
        freeMode={true}
        className="mySwiper"
      >
        {slides.map(({ text, image, link }, index) => (
          <SwiperSlide key={index}>
          <div className="carousel-slide">
            <Link to={link}>
              <img src={image} alt={text} />
            </Link>
            <div className="carousel-slide-text">{text}</div>
          </div>
        </SwiperSlide>
        ))}
        {/* {categories.map(({ text, link }, index) => (
          <SwiperSlide key={index}>
            <Link to={link}>{text}</Link>
          </SwiperSlide>
        ))} */}
      </Swiper>
    </>
  );
}

export default Carousel;
