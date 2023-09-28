import React, { useState, useEffect, useCallback } from "react";
import { BsGear } from "react-icons/bs";
// import localforage from "localforage";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "reactstrap";
import {
  setAlertType,
  setDataExist,
  setShowAlert,
} from "../../store/alert/Alert";
import { setNavToggle } from "../../store/dataList/DataList";
import NotificationDropdown from "../TopbarDropdown/NotificationDropdown";
import ProfileMenu from "../TopbarDropdown/ProfileMenu";
import { BsSearch } from "react-icons/bs";
import {
  setDocketNumber,
  setSearchDocket,
} from "../../store/orderTracking/OrderTracking";

const Header = () => {
  const dispatch = useDispatch();

  const show_alert = useSelector((state) => state.alert.show_alert);
  const data_exist = useSelector((state) => state.alert.data_exist);
  const alert_type = useSelector((state) => state.alert.alert_type);

  // const send_logout_time = () => {
  //   if (login_id) {
  //     axios
  //       .post(
  //         ServerAddress + "ems/set_logout_time/",
  //         {
  //           login_id: login_id,
  //         },
  //         {
  //           headers: { Authorization: `Bearer ${accessTK}` },
  //         }
  //       )
  //       .then(function (response) { })
  //       .catch(function () {
  //         alert("Error Occur While Sending Logout Data");
  //       });
  //   }
  // };

  useEffect(() => {
    if (show_alert) {
      setTimeout(() => {
        dispatch(setShowAlert(false));
      }, 4000);
    }
  }, [show_alert]);

  const [sidebarActive, setSidebarActive] = useState(true);
  useEffect(() => {
    dispatch(setNavToggle(false));
  }, []);

  const handleClk = () => {
    setSidebarActive(!sidebarActive);
    dispatch(setNavToggle(sidebarActive));
  };
  const nav_toggle = useSelector((state) => state.datalist.nav_toggle);

  //Tracking Docket
  const [docket_number_entry, setdocket_number_entry] = useState([]);

  useEffect(() => {
    if (docket_number_entry === "") {
      dispatch(setDocketNumber([]));
      dispatch(setSearchDocket(false));
    }
  }, [docket_number_entry])

  // This Function Used for full screen
  function toggleFullscreen() {
    if (
      !document.fullscreenElement &&
      /* alternative standard method */ !document.mozFullScreenElement &&
      !document.webkitFullscreenElement
    ) {
      // current working methods
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(
          Element.ALLOW_KEYBOARD_INPUT
        );
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  }
  const docket_no = useSelector((state) => state.OrderTracking.docket_number);
  const search_docket = useSelector((state) => state.OrderTracking.search_docket);
  // console.log("docket_no----", docket_no)
  // useEffect(() => {
  //   if ((docket_no !==[] || docket_no !== "") && search_docket) {
  //     // You can update this URL with your desired link
  //     const url = "/booking/orders/addorder";
  //     window.open(url, "_blank");
  //     // setShouldOpenLink(false); // Reset the flag after opening the link
  //   }
  // }, [docket_no, search_docket]);

  // const click = useCallback(() => {
  //   if ((docket_no !==[] || docket_no !== "") && search_docket) {
  //     alert()
  //     return   <a
  //     href={""}
  //     target="_blank"
  //     rel="noopener noreferrer"
  //   >
  //   <BsSearch />               
  //   </a>
  //   }
  // }, [docket_no,search_docket]);

  return (
    <header>
      {show_alert ? (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Alert
            style={{
              position: "absolute",
              right: nav_toggle ? "200px" : "65px",
              top: "2vh",
              width: "75vw",
              zIndex: 200,
            }}
            color={alert_type}
            toggle={() => {
              dispatch(setDataExist(""));
              dispatch(setAlertType(""));
              dispatch(setShowAlert(""));
            }}
          >
            {data_exist}
          </Alert>
        </div>
      ) : null}
      <div
        style={{ width: "100%" }}
        className={
          sidebarActive ? "margin-left-20rem navbar-header" : "navbar-header"
        }
      >
        <div
          className="header-container align-items-center d-flex"
          style={{
            width: "100%",
            height: "100%",
            justifyContent: "space-between",
          }}
        >
          <button
            className={"hamburgerButton"}
            type="button"
            // onClick={() =>  setSidebarActive(!sidebarActive)}
            onClick={() => handleClk()}
          >
            <i className="fa fa-fw fa-bars" />
          </button>
          {/* <div>
             <form className="app-search d-none d-lg-block">
              <div className="position-relative">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search"
                />
                <span className="bx bx-search-alt" />
              </div>
            </form> 
          </div> */}

          <div>
            <nav>
              {/* <button
                style={{ backgroundColor: "#fff", borderWidth: 0 }}
                onBlur={() => {
                  if (link_clicked) {
                    setlink_clicked(false);
                  } else {
                    setBooking(false);
                  }
                }}
                className="dropdown"
                onClick={() => setBooking(!booking)}
              >
                <p>Bookings </p>
                <div
                  className="dropdownMenu"
                  id={booking ? "active" : ""}
                  style={{
                    position: "absolute",
                    top: "39px",
                    left: "0px",
                    fontSize: "12.5px",
                  }}
                >
                  <Link
                    onMouseDown={() => setlink_clicked(true)}
                    to="/booking/orders/addorder"
                  >
                    Add Order
                  </Link>
                  <Link
                    onMouseDown={() => setlink_clicked(true)}
                    to="/booking/orders"
                  >
                    Orders
                  </Link>
                  <Link
                    onMouseDown={() => setlink_clicked(true)}
                    to="/booking/orders/addorder"
                  >
                    Update Status
                  </Link>
                </div>
              </button> */}
              {/* <button
                style={{ backgroundColor: "#fff", borderWidth: 0 }}
                onBlur={() => {
                  if (link_clicked) {
                    setlink_clicked(false);
                  } else {
                    setManifists(false);
                  }
                }}
                className="dropdown"
                onClick={() => setManifists(!manifists)}
              >
                <p>Manifests</p>
                <div
                  className="dropdownMenu"
                  id={manifists ? "active" : ""}
                  style={{
                    position: "absolute",
                    top: "39px",
                    left: "0px",
                    fontSize: "12.5px",
                  }}
                >
                  <Link
                    onMouseDown={() => setlink_clicked(true)}
                    to="/manifests/pending-for-dispatch"
                  >
                    Pending For Dispatch
                  </Link>
                  <Link
                    onMouseDown={() => setlink_clicked(true)}
                    to="/manifests/rough-manifest"
                  >
                    Rough Manifest
                  </Link>
                  <Link
                    onMouseDown={() => setlink_clicked(true)}
                    to="/manifests/pending-to-depart"
                  >
                    Pending To Depart
                  </Link>
                  <Link
                    onMouseDown={() => setlink_clicked(true)}
                    to="/manifests/incoming-manifest"
                  >
                    Incoming Manifest
                  </Link>
                  <Link
                    onMouseDown={() => setlink_clicked(true)}
                    to="/manifests/all-manifest"
                  >
                    All Manifest
                  </Link>
                </div>
              </button> */}
              {/* <button
                style={{ backgroundColor: "#fff", borderWidth: 0 }}
                onBlur={() => {
                  {
                    if (link_clicked) {
                      setlink_clicked(false);
                    } else {
                      setRunsheet(false);
                    }
                  }
                }}
                className="dropdown"
                onClick={() => setRunsheet(!runsheet)}
              >
                <p>Runsheet</p>
                <div
                  className="dropdownMenu"
                  id={runsheet ? "active" : ""}
                  style={{
                    position: "absolute",
                    top: "39px",
                    left: "0px",
                    fontSize: "12.5px",
                  }}
                >
                  <Link
                    onMouseDown={() => setlink_clicked(true)}
                    to="/runsheet/pending-delivery"
                  >
                    Pending Delivery
                  </Link>
                  <Link
                    onMouseDown={() => setlink_clicked(true)}
                    to="/runsheet/all-runsheet"
                  >
                    All Runsheet
                  </Link>
                </div>
              </button> */}

              {/* <button
                style={{ backgroundColor: "#fff", borderWidth: 0 }}
                className="dropdown"
              >
                <Link to="/track">Track</Link>
              </button> */}

              {/* <button
                style={{ backgroundColor: "#fff", borderWidth: 0 }}
                onBlur={() => {
                  if (link_clicked) {
                    setlink_clicked(false);
                  } else {
                    setbilling(false);
                  }
                }}
                className="dropdown"
                onClick={() => setbilling(!billing)}
              >
                <p>Billing </p>
                <div
                  className="dropdownMenu"
                  id={billing ? "active" : ""}
                  style={{
                    position: "absolute",
                    top: "39px",
                    left: "0px",
                    fontSize: "12.5px",
                  }}
                >
                  <Link
                    onMouseDown={() => setlink_clicked(true)}
                    to="/billing/overview"
                  >
                    Overview
                  </Link>
                  <Link
                    onMouseDown={() => setlink_clicked(true)}
                    to="/billing/invoices"
                  >
                    Invoices
                  </Link>
                  <Link
                    onMouseDown={() => setlink_clicked(true)}
                    to="/billing/payment"
                  >
                    Payment
                  </Link>
                  <Link
                    onMouseDown={() => setlink_clicked(true)}
                    to="/billing/bill_closed/bill_closed"
                  >
                    Bill Closed
                  </Link>
                  <Link
                    onMouseDown={() => setlink_clicked(true)}
                    to="/billing/warai/warai"
                  >
                    Warai
                  </Link>
                </div>
              </button> */}
            </nav>
          </div>

          <div>
            <nav style={{ cursor: "pointer" }}>
              {/* <BsBell
                style={{ fontSize: "1.25rem", margin: "0 1rem" }}
                className="turn_hover"
              /> */}
              <div>
                <input
                  style={{
                    border: "2px solid #b6afaf",
                    borderRadius: "14px 0px 0px 14px",
                    background: "none",
                    borderLeft: "none",
                    height: "28px",
                    width: "98px",
                    fontSize: "12px",
                    textAlign: "center",
                  }}
                  type="search"
                  placeholder="Enter Docket Number"
                  value={docket_number_entry}
                  onChange={(val) => {
                    setdocket_number_entry(val.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    if (
                      docket_number_entry === "" ||
                      docket_number_entry.length < 6
                    ) {
                      alert("Please Enter a valid Docket Number");
                    } else {
                      dispatch(setSearchDocket(true));
                      dispatch(setDocketNumber(docket_number_entry));
                    }
                  }}
                  style={{
                    border: "2px solid #b6afaf",
                    borderRadius: "0px 14px 14px 0px",
                    background: " #e1d6d6",
                    borderLeft: "none",
                    height: " 28px",
                    width: "28px",
                  }}
                >
                    <a
                      href={`/booking/orders?${(
                        (docket_number_entry)
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <BsSearch />
                    </a>

                </button>
              </div>

              <div className="dropdown d-none d-lg-inline-block ms-1">
                <button
                  type="button"
                  className="btn header-item noti-icon "
                  onClick={() => {
                    toggleFullscreen();
                  }}
                  data-toggle="fullscreen"
                >
                  <i className="bx bx-fullscreen" />
                </button>
              </div>

              <NotificationDropdown />
              <ProfileMenu />
              {/* <button
                style={{ backgroundColor: "white", borderWidth: 0 }}
                className="dropdown hortizontal_space_between turn_hover"
                onClick={() => setProfile(!profile)}
                onBlur={() => setProfile(false)}
              >
                <BiUserCircle style={{ fontSize: "1.5rem" }} />
                <span> {` ${toTitleCase(userdetails.username)}`} </span>
                {userdetails.branch_nm
                  ? `( ${toTitleCase(userdetails.branch_nm)} )`
                  : "(  )"}

                <FaAngleDown />
                <div
                  className="dropdownMenu"
                  id={profile ? "active" : ""}
                  style={{ width: "75px", textAlign: "center" }}

                >
                  <p
                    onMouseDown={() => {
                      send_logout_time();
                      dispatch(setUserDetails(null));
                      dispatch(setAccessToken(""));
                      dispatch(setRefreshToken(""));
                      navigate("/");
                      dispatch(setPermission(false))
                    }}
                    style={{ display: "flex" }}

                  >
                    Logout
                    <RiLogoutCircleRLine
                      size={15}
                      style={{ color: "red", paddingTop: "4px" }}

                    />
                  </p>
                </div>
              </button> */}
              <BsGear
                className="rotate"
                style={{ fontSize: "1.25rem", margin: "0 1rem" }}
              />
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
