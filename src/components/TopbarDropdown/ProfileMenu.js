import React, { useState, useCallback, useLayoutEffect } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  InputGroupText,
  InputGroup,
  Alert,
} from "reactstrap";
import Modal from "react-bootstrap/Modal";
import { IconContext } from "react-icons";
import { BiUserCircle } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { FaEye, FaEyeSlash } from "react-icons/fa";
//i18n
// import { withTranslation } from "react-i18next"
// Redux
import { withRouter, Link, useNavigate } from "react-router-dom";
import toTitleCase from "../../lib/titleCase/TitleCase";
import {
  setAccessToken,
  setRefreshToken,
  setUserDetails,
} from "../../store/authentication/Authentication";
import { ServerAddress } from "../../constants/ServerAddress";
import axios from "axios";
import { setPermission } from "../../store/permissions/Permissions";
import {resetAuthenticationState} from "../../store/authentication/Authentication";
import {
  setDocketNumber,
  setSearchDocket,
} from "../../store/orderTracking/OrderTracking";
import localStorage from "redux-persist/es/storage";
// users
// import user1 from "../../../assets/images/users/avatar-1.jpg"

const ProfileMenu = (apiCall) => {
  // Declare a new state variable, which we'll call "menu"
  const accessTK = useSelector((state) => state.authentication.access_token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menu, setMenu] = useState(false);
  const userdetails = useSelector((state) => state.authentication.userdetails);

  const login_id = useSelector((state) => state.authentication.login_id);

  // useEffect(() => {
  //   if (localStorage.getItem("authUser")) {
  //     if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
  //       const obj = JSON.parse(localStorage.getItem("authUser"))
  //       setusername(obj.displayName)
  //     } else if (
  //       process.env.REACT_APP_DEFAULTAUTH === "fake" ||
  //       process.env.REACT_APP_DEFAULTAUTH === "jwt"
  //     ) {
  //       const obj = JSON.parse(localStorage.getItem("authUser"))
  //       setusername(obj.username)
  //     }
  //   }
  // }, [props.success])
  const send_logout_time = () => {
    if (login_id) {
      axios
        .post(
          ServerAddress + "ems/set_logout_time/",
          {
            login_id: login_id,
          },
          {
            headers: { Authorization: `Bearer ${accessTK}` },
          }
        )
        .then(function (response) {
          console.log("Logout time", response);
        })
        .catch(function () {
          alert("Error Occur While Sending Logout Data");
        });
    }
  };

  //FOr logout after 30 sec

  const handleApi = useCallback(async () => {
    try {
      await apiCall();
    } catch (error) {
    }
  }, [apiCall]);

  useLayoutEffect(() => {
    let timeoutId;

    const resetTimer = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        send_logout_time();
        dispatch(setUserDetails(null));
        dispatch(setAccessToken(""));
        dispatch(setRefreshToken(""));
        dispatch(setPermission(false));
        dispatch(resetAuthenticationState());
        dispatch(setDocketNumber([]));
        dispatch(setSearchDocket(false));
        localStorage.clear();
        window.location.reload();
      }, 1800000);
      // 1800000
    };

    resetTimer();

    document.addEventListener("mousemove", resetTimer);
    document.addEventListener("mousedown", resetTimer);
    document.addEventListener("keypress", resetTimer);

    return () => {
      clearTimeout(timeoutId);

      document.removeEventListener("mousemove", resetTimer);
      document.removeEventListener("mousedown", resetTimer);
      document.removeEventListener("keypress", resetTimer);
    };
  }, [navigate, send_logout_time, dispatch, handleApi]);

  /////////
  const [old_password, setold_password] = useState("");
  const [new_password, setnew_password] = useState("");
  const [confirm_password, setconfirm_password] = useState("");

  const [old_password_error, setold_password_error] = useState(false);
  const [new_password_error, setnew_password_error] = useState(false);
  const [confirm_password_error, setconfirm_password_error] = useState(false);

  // error message if not matched password
  const [error, seterror] = useState(false);

  // Open Modal for change password
  const [openModal, setopenModal] = useState(false);
  const closeModal = () => {
    setold_password("");
    setnew_password("");
    setconfirm_password("");
    setcheck_Regex(false);
    setopenModal(false);
    seterror(false);
  }

  const [showPass, setshowPass] = useState(false);
  const [showPass1, setshowPass1] = useState(false);
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
  const [check_Regex, setcheck_Regex] = useState(false);
  const [check_pass, setcheck_pass] = useState(false);

  const validatePassword = (password) => {
    return passwordRegex.test(password);
  };

  const ResetPassword = () => {
    axios
      .put(
        ServerAddress + "ems/reset_password/",
        {
          username: userdetails.username,
          old_password: old_password,
          new_password: new_password,
        },
        {
          headers: {
            Authorization: `Bearer ${accessTK}`,
          },
        }
      )
      .then(function (response) {
        console.log("response is", response.data);
        if (response.data === "Password Reset Successfully") {
          setopenModal(false)
          alert('Password Reset SuccessFully, Login Again')
          seterror(false);
          send_logout_time();
          // dispatch(setlogout());
          dispatch(setUserDetails(null));
          dispatch(setAccessToken(""));
          dispatch(setRefreshToken(""));
          dispatch(setPermission(false));
          dispatch(resetAuthenticationState());
          localStorage.clear();
          navigate("/");
        }
        else if (response.data === "Old Password Wrong")
          seterror(true);

      })
      .catch(function () {
        seterror(true);
      });
  };

  useLayoutEffect(() => {
    if (old_password !== "") {
      setold_password_error(false)
    }
    if (new_password !== "") {
      setnew_password_error(false)
    }
    if (validatePassword(new_password)) {
      setcheck_Regex(false);
    }
    if (confirm_password !== "") {
      setconfirm_password_error(false)
    }
    if (new_password === confirm_password) {
      setcheck_pass(false);
    }
  }, [old_password, new_password, confirm_password])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (old_password === "") {
      setold_password_error(true)
    }
    else if (new_password === "") {
      setnew_password_error(true)
    }
    else if (!validatePassword(new_password)) {
      setcheck_Regex(true);
    }
    else if (confirm_password === "") {
      setconfirm_password_error(true)
    }
    else if (new_password !== confirm_password) {
      setcheck_pass(true);
    }
    else {
      ResetPassword();
      setcheck_Regex(false)
    }
  }
  /////////

  return (
    <React.Fragment>
      {/* ////// */}
      <Modal show={openModal}
        onHide={() => {
          closeModal();
        }}
        backdrop="static" keyboard={false}>
        <Modal.Header closeButton></Modal.Header>
        {check_Regex &&
          <div style={{
            textAlign: "center", padding: "8px", background: "#E6F1FF", color: "#ea7878", fontSize: "15px"
          }}>Password must contain at least one digit, one lowercase letter, one uppercase letter,
            one special character, and have a minimum length of 8 characters.</div>
        }
        {check_pass &&
          <div style={{
            textAlign: "center", padding: "8px", background: "#E6F1FF", color: "#ea7878", fontSize: "15px"
          }}>New Password Must Be Equal To Confirm Password</div>
        }

        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {error ? (
              <Alert color="danger">Old Password Wrong</Alert>
            ) : null}
            <FormGroup className="form-group">
              <Label for="old_password" className="form-label">Old Password</Label>
              <InputGroup>
                <Input
                  type={showPass ? "text" : "password"}
                  name="old_password"
                  id="old_password"
                  className="form-input"
                  placeholder="Enter Old Password"
                  value={old_password}
                  onChange={(val) =>
                    setold_password(val.target.value)
                  }
                  invalid={old_password_error}
                />
                <InputGroupText>
                  <IconContext.Provider
                    value={{ size: 16 }}
                  >
                    <div
                      onClick={() => {
                        setshowPass(!showPass);
                      }}
                    >
                      {showPass ? (
                        <FaEyeSlash style={{ size: 30 }} />
                      ) : (
                        <FaEye />
                      )}
                    </div>
                  </IconContext.Provider>
                </InputGroupText>
                {old_password_error &&
                  (<FormFeedback type="invalid">
                    {"Write Old Password"}
                  </FormFeedback>)
                }
              </InputGroup>
            </FormGroup>

            <FormGroup className="form-group">
              <Label for="new_password" className="form-label">New Password</Label>
              <Input
                type="password"
                name="new_password"
                id="new_password"
                className="form-input"
                placeholder="Enter New Password"
                value={new_password}
                onChange={(val) =>
                  setnew_password(val.target.value)
                }
                onBlur={() => {
                  if (!validatePassword(new_password)) {
                    setcheck_Regex(true)
                  }
                }}
                invalid={new_password_error}
              />
              {new_password_error &&
                (<FormFeedback type="invalid">
                  {"Write New Password"}
                </FormFeedback>)
              }
            </FormGroup>

            <FormGroup className="form-group">
              <Label for="confirm_password" className="form-label">Confirm Password</Label>
              <InputGroup>
                <Input
                  type={showPass1 ? "text" : "password"}
                  name="confirm_password"
                  id="confirm_password"
                  className="form-input"
                  placeholder="Enter Confirm Password"
                  value={confirm_password}
                  onChange={(val) =>
                    setconfirm_password(val.target.value)
                  }
                  invalid={confirm_password_error}
                />
                <InputGroupText>
                  <IconContext.Provider
                    value={{ size: 16 }}
                  >
                    <div
                      onClick={() => {
                        setshowPass1(!showPass1);
                      }}
                    >
                      {showPass1 ? (
                        <FaEyeSlash style={{ size: 30 }} />
                      ) : (
                        <FaEye />
                      )}
                    </div>
                  </IconContext.Provider>
                </InputGroupText>
                {confirm_password_error &&
                  (<FormFeedback type="invalid">
                    {"Write Confirm Password"}
                  </FormFeedback>)
                }
              </InputGroup>
            </FormGroup>
            <Button
              color="primary"
              type="submit"
              className="btn btn-info m-1"
            // onClick={() => {
            //   seterror(false);
            //   setopenModal_1(true);
            // }}
            // onClick={() => {
            //   setopenModal(false);
            // }}
            >Change Password</Button>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button color="secondary" className="btn btn-warning m-1"
            onClick={() => {
              closeModal();
            }}>Cancel</Button>
        </Modal.Footer>
      </Modal>
      {/* ////// */}
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item "
          id="page-header-user-dropdown"
          tag="button"
        >
          {/* <img
            className="rounded-circle header-profile-user"
            // src={user1}
            alt="Header Avatar"
          /> */}
          <BiUserCircle style={{ fontSize: "1.5rem" }} />
          <span className="d-none d-xl-inline-block ms-2 me-1">
            {" "}
            {toTitleCase(userdetails.username)}
          </span>
          <i className="mdi mdi-chevron-down d-none d-xl-inline-block" />
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <DropdownItem>
            {" "}
            <i className="bx bx-user font-size-16 align-middle me-1" />
            {userdetails.branch_nm
              ? `( ${toTitleCase(userdetails.branch_nm)} )`
              : "(  )"}
          </DropdownItem>
          {/* <DropdownItem tag="a" href="/authentication/userProfile/Profile">
            {" "} */}
           <DropdownItem  className="dropdown-item">
            <Link to="/authentication/userProfile/Profile"
>
            <i className="bx bx-user font-size-16 align-middle me-1" />
            Profile
            </Link>
          </DropdownItem>

          <DropdownItem tag="a" href="/crypto-wallet">
            <i className="bx bx-wallet font-size-16 align-middle me-1" />
            My Wallet
          </DropdownItem>

          <DropdownItem tag="a" href="#">
            <span className="badge bg-success float-end">11</span>
            <i className="bx bx-wrench font-size-16 align-middle me-1" />
            Settings
          </DropdownItem>

          <DropdownItem tag="a" href="auth-lock-screen">
            <i className="bx bx-lock-open font-size-16 align-middle me-1" />
            Lock screen
          </DropdownItem>

          <div className="dropdown-divider" />

          {/* ////// */}
          <DropdownItem className="dropdown-item">
          <Link
            to="/"
          >
            <i className="bx bx-reset font-size-20 align-middle me-1" />
            <span onClick={() => {
              setopenModal(true);
            }}
            >Change Password</span>
          </Link>
          </DropdownItem>

          {/* ////// */}

          <Link
            to="/signin"
            className="dropdown-item"
            onMouseDown={() => {
              send_logout_time();
              // dispatch(setUserDetails(null));
              // dispatch(setAccessToken(""));
              // dispatch(setRefreshToken(""));
              dispatch(setPermission(false));
              dispatch(resetAuthenticationState());
              dispatch(setDocketNumber([]));
              dispatch(setSearchDocket(false));
              localStorage.clear();
              navigate("/");
            }}
          >
            <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger" />
            <span>Logout</span>
          </Link>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

// ProfileMenu.propTypes = {
//   success: PropTypes.any,
//   t: PropTypes.any
// }

// const mapStatetoProps = state => {
//   const { error, success } = state.Profile
//   return { error, success }
// }

// export default withRouter(
//   connect(mapStatetoProps, {})(withTranslation()(ProfileMenu))
// )
export default ProfileMenu;
