import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { NavLink } from "react-router-dom";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "./homeCarousel.css";
import { Autoplay, EffectFade, Pagination } from "swiper";

const HomeCarousel = () => {
  const slideData = [
    {
      imageUrl:
        "https://icms-image.slatic.net/images/ims-web/2920b6a8-87f0-4650-8497-92b9a27cf30f.jpg_1200x1200.jpg",
      linkTo: "/shop/slide1",
    },
    {
      imageUrl:
        "https://icms-image.slatic.net/images/ims-web/c92277b8-9e09-4d9b-8933-ba83b454da3d.jpg",
      linkTo: "/shop/slide2",
    },
    {
      imageUrl:
        "https://icms-image.slatic.net/images/ims-web/8feeadd0-f5f2-45eb-b81a-cd15004ef004.jpg",
      linkTo: "/shop/slide3",
    },
    {
      imageUrl:
        "https://icms-image.slatic.net/images/ims-web/34a65341-4de4-409e-abe8-10f382dd0385.jpg",
      linkTo: "/shop/slide4",
    },
  ];

  return (
    <div className="container homeCarouselContainer">
      <Swiper
        spaceBetween={30}
        effect="fade"
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Autoplay, EffectFade]}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        className="mySwiper homeCarousel"
      >
        {slideData.map((slide, index) => (
          <SwiperSlide key={index}>
            <NavLink to={slide.linkTo}>
              <img style={{ cursor: "grab" }} src={slide.imageUrl} alt={`Slide ${index}`} />
            </NavLink>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomeCarousel;
