import React, { useLayoutEffect, useState } from "react";
import Notification from "./Notification";
import useWindowDimensions from "./ScreenSize";
import "./Dashboard.css";
import Birtday from "./Logo/Birtday.png";
import Gmail from "./Logo/Gmail.png";
import BookMarks from "./Logo/BookMarks.png";
import Calendar from "./Logo/Calendar.png";
import Whatsapp from "./Logo/Whatsapp.png";
import Attendance from "./Logo/Attendance.png";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import axios from "axios";
import { TiPlus } from "react-icons/ti";
import { ServerAddress } from "../../constants/ServerAddress";

const DashboardNotificationSection = ({ show, setShow, date }) => {
  const navigate = useNavigate();
  const [blogData, setBlogData] = useState([]);
  const accessToken = useSelector((state) => state.authentication.access_token);
  // To get Screen Size
  const { height } = useWindowDimensions();
  const getdepartment = () => {
    axios
      .get(ServerAddress + `notice_board/get-Notice/?&p=${1}&records=${10}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        setBlogData(response.data.results);
        console.log("Notice res", response);
      })
      .catch((err) => {
        alert(`Error Occur in Get , ${err}`);
      });
  };
  useLayoutEffect(() => {
    getdepartment();
  }, []);
  // console.log("blogData=====", blogData);
  // const formattedDate = new Date(date).toLocaleDateString('en-US');
  return (
    <>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            background: "#F1EEEE",
          }}
        >
          <div>
            <h4 className="timline_heading">Timeline</h4>
          </div>
          <div
            style={{ cursor: "pointer", margin: "10px 10px 10px 15px" }}
            onClick={() => {
              navigate("/dashboard/Notification/Notification");
            }}
          >
            <TiPlus />
          </div>
        </div>
        <div
          className="custom-scrollbars__content"
          style={{
            height: height / 2.5,
            overflowY: "scroll",
            background: "white",
            padding: "20px",
          }}
        >
          {blogData.map((val, index) => {
            console.log("raggg====", val)
            // <li key={a.id}>{a.text}</li>
            let f_date_f = val.created_at.split("T");
            let f_date = f_date_f[0];
            return (
              <Notification
                avatarSrc={
                  "https://media.licdn.com/dms/image/C5103AQEVLuPfI_Rh3w/profile-displayphoto-shrink_200_200/0/1518872449311?e=1686182400&v=beta&t=KqqwW_dpTmgCsXS5MZCDFfABQTRR6g1YVyJUPx2RRa4"
                }
                title={val.title}
                text={val.description}
                author={val.title}
                date={f_date}
                comment={val.comment}
              />
            )
          })}
        </div>
        <div className="notification_Card_container">
          <div className="notification_row">
            <span className="notity_card">
              <img
                onClick={() => {
                  // <BirthdayModal/>
                  setShow(!show);
                }}
                src={Birtday}
                alt="Birtday"
                width="100"
              />
            </span>
            <span className="notity_card">
              <img
                onClick={() => {
                  navigate("/dashboard/Calendar/Calendar");
                }}
                src={Calendar}
                alt="Calendar"
                width="100"
              />
            </span>
            <span className="notity_card">
              <img src={Attendance} alt="Attendance" width="100" />
            </span>
          </div>
          <div className="notification_row1">
            <span className="notity_card">
              <a href="https://mail.google.com/">
                <img src={Gmail} alt="Gmail" width="100" />
              </a>
            </span>
            <span className="notity_card">
              <a href="https://web.whatsapp.com/">
                <img src={Whatsapp} alt="Whatsapp" width="100" />
              </a>
            </span>
            <span className="notity_card">
              <img src={BookMarks} alt="BookMark" width="100" />
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
export default DashboardNotificationSection;