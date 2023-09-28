import React from "react";
import "./Timeline.css";
import { Link, useLocation } from "react-router-dom";

function TimelineNotification() {
  const location_data = useLocation();
  console.log("location_data=====", location_data);
  return (
    <div className="container">
      <div className="hero">
        {/* <h2 >
          Something coming soon very shortly
          <p>Soil stove is made up of soil, soil belongs to the pond,</p>
        </h2> */}
      </div>
      <main>
        <h2>{location_data.state.title} </h2>
        <div className="profile-container">
          <div className="profile">
            <div className="img-container">
              <img
                className="img-container"
                src="https://media.licdn.com/dms/image/C5103AQEVLuPfI_Rh3w/profile-displayphoto-shrink_200_200/0/1518872449311?e=1686182400&v=beta&t=KqqwW_dpTmgCsXS5MZCDFfABQTRR6g1YVyJUPx2RRa4"
                alt="My pic"
              />
            </div>
            <div className="text">
              <h3 className="hero_t">{location_data.state.comment}</h3>
              <div className="hero_t">
            <span className="date">{location_data.state.date}</span>
          </div>
            </div>
          </div>
        </div>
        <div className="content-time">
          <blockquote>
            <p>{location_data.state.text}</p>
          </blockquote>
          {/* <div className="date">{location_data.state.date}</div> */}
        </div>
        
      </main>
    </div>
  );
}

export default TimelineNotification;
