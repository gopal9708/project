import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaExpandArrowsAlt, FaCrosshairs } from "react-icons/fa";
import { useNavigate } from "react-router";
import "./Dashboard.css";
import axios from "axios";
import { ServerAddress } from "../../constants/ServerAddress";
import { setUserDepartment } from "../../store/authentication/Authentication";
import useWindowDimensions from "./ScreenSize";
import BirthdayModal from "./BirthdayModal";
import {
  Button,
} from "reactstrap";
import Modal from "react-bootstrap/Modal";
import DashboardChartSection from "./DashboardChartSection";
import ClientDashboard from "./DashboardTypes/ClientDashboard";
import CheckerDashboard from "./DashboardTypes/CheckerDashboard";
import DashboardNotificationSection from "./DashboardNotificationSection";
import NSearchInput from "../../components/formComponent/nsearchInput/NSearchInput";
import VmsDashboard from "./DashboardTypes/VmsDashboard";
import TripDashboard from "./DashboardTypes/TripDashboard";
import BillingDashboard from "./DashboardTypes/BillingDashboard";

const Dashboard = () => {
  const navigate = useNavigate();

  // Redux State
  const accessToken = useSelector((state) => state.authentication.access_token);
  const dispatch = useDispatch();

  //Department
  const department = useSelector((state) => state.authentication.userdetails);
  const [dep_id, setdep_id] = useState("");

  const getdepartment = () => {
    axios
      .get(ServerAddress + "ems/get_department_info/?dep_id=" + dep_id, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        dispatch(setUserDepartment(response.data[0]));
      })
      .catch((err) => {
        // alert(`Error Occur in Get , ${err}`);
      });
  };

  useEffect(() => {
    getdepartment();
  }, [dep_id]);

  useEffect(() => {
    let dep_id = String(department.priority - 1).padStart(2, "0");
    if (dep_id === "00") {
      setdep_id("01");
    } else {
      setdep_id(dep_id);
    }
  }, [department]);

  // To get Screen Size
  const { width } = useWindowDimensions();

  // for dashborad type
  const [dashboard_type, setdashboard_type] = useState("Home");
  const [dashboard_type_list, setdashboard_type_list] = useState([
    "Home",
    "Client",
    "Maker-Checker",
    "VMS",
    "TRIP",
    "BILLING",
    "OERATIONAL",
  ]);

  const [dashboard_time_frame_list, setdashboard_time_frame_list] = useState([
    "Monthly",
    "Half Monthly",
    "Weekly",
  ]);
  const [dashboard_time_frame, setdashboard_time_frame] = useState("");

  // Modal funcation
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    // setmessage_error(false)
  };

  const [birthday_list, setbirthday_list] = useState([""]);

  console.log("Modal", show);
  return (
    <>
      {/* Birtday Modal */}
      <Modal show={show} onHide={handleClose} className="custom_modal" >
        <Modal.Header closeButton>
          <Modal.Title style={{fontFamily:"'Poppins', sans-serif", fontSize:"400"}}> Today's Birthdays</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: "#454545",}}>
          {birthday_list.length === 0 ? (
            <div className="birt_day" style={{fontFamily: 'Poppins sans-serif', fontSize:'400'}}>NO Birthdays Today</div>
          ) : (
            <>
              {birthday_list.map((item, idx) => {
                return <BirthdayModal />;
              })}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}style={{fontFamily:"'Poppins', sans-serif", fontSize:"400"}}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* <div>
      width: {width} ~ height: {height}
    </div> */}
      <div
        style={{
          display: "flex",
          Width: width,
          // background: "F9F9F9",
          //   margin: "2px",
          //   border: "2px solid black",
          flexDirection: width > 800 ? "row" : "column",
        }}
      >
        {/* For Chart */}
        <div
          className="custom-scrollbars__content"
          style={{
            // background: "white",
            padding: "10px",
            flex: "0.7",
            overflowY: "scroll",
            maxHeight: "83vh",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate("/dashboard/DashboardTypes/OrderDetails");
              }}
            >
              <FaExpandArrowsAlt />
            </div>
            {/* <div style={{ cursor: "pointer", display:"flex",position:"absolute",right:"540px", top:"80px" }} onClick={() => {
              navigate("/DashboardTypes/BranchDailyDetails")
            }}><FaCrosshairs/></div> */}
            <div className="responsive-div">
              <div
                className="responsive-child"
                onClick={() => {
                  navigate("/DashboardTypes/BranchDailyDetails");
                }}
              >
                <FaCrosshairs />
              </div>
            </div>
            <div>
            <NSearchInput
                data_list={dashboard_time_frame_list}
                data_item_s={dashboard_time_frame}
                set_data_item_s={setdashboard_time_frame}
                current_width={"120px"}
                child_width={"120px"}
                show_search={false}
              />
            </div>
            <div>
              <NSearchInput
                data_list={dashboard_type_list}
                data_item_s={dashboard_type}
                set_data_item_s={setdashboard_type}
                current_width={"120px"}
                child_width={"120px"}
                show_search={false}
              />
            </div>
          </div>

          {dashboard_type === "Home" ? (
            <>
              <DashboardChartSection />
            </>
          ) : null}

          {dashboard_type === "Client" ? (
            <>
              <div
                style={{
                  textAlign: "center",
                  fontSize: "32px",
                  fontFamily: "Georgia",
                  display: "flex",
                  postion: "relative",
                  padding: "inherit",
                }}
              >
                Client Dashboard
              </div>
              <ClientDashboard />
            </>
          ) : null}

          {dashboard_type === "Maker-Checker" ? (
            <>
              <div
                style={{
                  textAlign: "center",
                  fontSize: "32px",
                  fontFamily: "Georgia",
                  display: "flex",
                  postion: "relative",
                  padding: "inherit",
                }}
              >
               Checker/Maker Dashboard
              </div>
              <CheckerDashboard />
            </>
          ) : null}

          {dashboard_type === "VMS" ? (
            <>
              <div>Vms Dashboard</div>
              <VmsDashboard />
            </>
          ) : null}

          {dashboard_type === "TRIP" ? (
            <>
              <div>Trip Dashboard</div>
              <TripDashboard />
            </>
          ) : null}

          {dashboard_type === "BILLING" ? (
            <>
              <div
                style={{
                  textAlign: "center",
                  fontSize: "32px",
                  fontFamily: "Georgia",
                  display: "flex",
                  postion: "relative",
                  padding: "inherit",
                }}
              >
                Billing Dashboard
              </div>
              <BillingDashboard />
            </>
          ) : null}
        </div>

        {/* For Notification */}
        <div
          style={{
            // background: "#dee3e0",
            padding: "",
            // margin: "2px",
            flex: "0.3",
            Height: "83vh",
            border: "2px solid white",
          }}
        >
          <DashboardNotificationSection show={show} setShow={setShow} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
