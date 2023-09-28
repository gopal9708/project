import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

import "./BirthdayModal.css";

// import required modules
import { EffectCards } from "swiper";

export default function BirthdayModal() {
  return (
    <>
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="card swiper-slide">
            <div className="image-content">
              <span className="overlay"></span>

              <div className="card-image">
                <img
                  src="https://media.licdn.com/dms/image/C4D03AQGGHsGmbbtXMQ/profile-displayphoto-shrink_200_200/0/1652336693756?e=1686787200&v=beta&t=7p9VLrG6B_xTRH1oVtSYi1v7SAjD1tFL7CrAJxM8Qj4"
                  alt="Available"
                  className="card-img"
                ></img>
              </div>
            </div>

            <div className="card-content">
              <h2 className="name">Abhinav</h2>
              <p className="description">DOB: 13th Feb</p>
              <p className="description">Vehicle System</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <div className="card swiper-slide">
            <div className="image-content">
              <span className="overlay"></span>

              <div className="card-image">
                <img
                  src="https://media.licdn.com/dms/image/C4D03AQFV0MhQ7tMWug/profile-displayphoto-shrink_200_200/0/1654531024102?e=1686787200&v=beta&t=H145xpFUtyhXplSsXUh7cD2m7YNemTXkJjOsK0CS1fc"
                  alt="Available"
                  className="card-img"
                ></img>
              </div>
            </div>

            <div className="card-content">
              <h2 className="name">Karan</h2>
              <p className="description">DOB: 13th Feb</p>
              <p className="description">Vehicle System</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <div className="card swiper-slide">
            <div className="image-content">
              <span className="overlay"></span>

              <div className="card-image">
                <img
                  src="https://media.licdn.com/dms/image/C4D03AQFanUFt-exU5Q/profile-displayphoto-shrink_200_200/0/1651911365217?e=1686787200&v=beta&t=hkR0xCcwNX47DXFjTvuUvSYLtx6mRduQH0A7jWeeyE0"
                  alt="Available"
                  className="card-img"
                ></img>
              </div>
            </div>

            <div className="card-content">
              <h2 className="name">Ankit</h2>
              <p className="description">DOB: 13th Feb</p>
              <p className="description">Vehicle System</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <div className="card swiper-slide">
            <div className="image-content">
              <span className="overlay"></span>

              <div className="card-image">
                <img
                  src="https://media.licdn.com/dms/image/C5103AQEVLuPfI_Rh3w/profile-displayphoto-shrink_200_200/0/1518872449311?e=1686182400&v=beta&t=KqqwW_dpTmgCsXS5MZCDFfABQTRR6g1YVyJUPx2RRa4"
                  alt="Available"
                  className="card-img"
                ></img>
              </div>
            </div>

            <div className="card-content">
              <h2 className="name">Rahul Thakur</h2>
              <p className="description">DOB: 13th Feb</p>
              <p className="description">Vehicle System</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <div className="card swiper-slide">
            <div className="image-content">
              <span className="overlay"></span>

              <div className="card-image">
                <img
                  src="https://media.licdn.com/dms/image/C4D03AQGGHsGmbbtXMQ/profile-displayphoto-shrink_200_200/0/1652336693756?e=1686787200&v=beta&t=7p9VLrG6B_xTRH1oVtSYi1v7SAjD1tFL7CrAJxM8Qj4"
                  alt="Available"
                  className="card-img"
                ></img>
              </div>
            </div>

            <div className="card-content">
              <h2 className="name">Gaurav</h2>
              <p className="description">DOB: 13th Feb</p>
              <p className="description">Vehicle System</p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
