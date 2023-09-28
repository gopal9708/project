import React, { useState } from "react";
import { Helmet } from "react-helmet";
// import * as company_details from "../../constants/CompanyDetails";
import axios from "axios"; // eslint-disable-line
import {
    Row,
    Col,
    CardBody,
    Card,
    Alert,
    Container,
    Form,
    Input,
    FormFeedback,
    Label,
    InputGroupText,
    InputGroup,
} from "reactstrap";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { IconContext } from "react-icons";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ServerAddress } from "../../../constants/ServerAddress";
import { useLayoutEffect } from "react";

const AdminChangePassword = () => {

    const navigate = useNavigate();
    const accessTK = useSelector((state) => state.authentication.access_token);

    const [user_name, setuser_name] = useState("")
    const [user_name_error, setuser_name_error] = useState(false);

    const [new_password, setnew_password] = useState("");
    const [new_password_error, setnew_password_error] = useState(false);

    const [showPass, setshowPass] = useState(false);
    const [error, seterror] = useState(false);

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
    const [check_Regex, setcheck_Regex] = useState(false);

    const validatePassword = ((password) => {
        return passwordRegex.test(password);
    },[]);

    const changepassword = (newpassword) => {
        axios
            .post(
                ServerAddress + "ems/admin_change_password/",
                {
                    username: user_name,
                    new_password: new_password,
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessTK}`,
                    },
                }
            )
            .then(function (response) {
                console.log("adminChangePassword==", response.data)
                if (response.data === "Password, Successfully Changed By Admin") {
                    alert("Password Changed Successfully.")
                    navigate("/dashboard")
                }
                else if (response.data === "Invalid Username") {
                    alert("Enter Valid Username")
                }
            })
            .catch(function () {
                seterror(true);
            });
    };

    useLayoutEffect(() => {
        if (user_name !== "") {
            setuser_name_error(false);
        }
        if (new_password !== "") {
            setnew_password_error(false);
        }
        if (validatePassword(new_password)) {
            setcheck_Regex(false);
        }
    }, [user_name, new_password, check_Regex, validatePassword])

    return (
        <>
            <Helmet>
                <title>Login </title>
            </Helmet>
            <div className="home-btn d-none d-sm-block">
                <Link to="/" className="text-dark">
                    <i className="fas fa-home h2" />
                </Link>
            </div>
            <div className="account-pages my-5 pt-sm-5">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={8} lg={6} xl={5}>
                            <Card className="overflow-hidden">
                                <div className="bg-primary bg-soft">
                                    <Row>
                                        <Col xs={7}>
                                            <div className="text-primary p-4">
                                                <h5 className="text-primary">Password Reset</h5>
                                            </div>
                                        </Col>
                                        <Col className="col-5">
                                            <img className="img-fluid"  alt="" />
                                        </Col>
                                    </Row>
                                </div>
                                <CardBody className="pt-0">
                                    <div>
                                        {/* <Link to="/" className="auth-logo-light">
                      {/* <div className="avatar-md profile-user-wid mb-4">
                             </div> */}
                                        {/* </Link> */}
                                    </div>
                                    <div className="p-2">
                                        <Form
                                            className="form-horizontal"
                                            onSubmit={e => {
                                                e.preventDefault();
                                                if (user_name === "") {
                                                    setuser_name_error(true);
                                                }
                                                else if (new_password === "") {
                                                    setnew_password_error(true);
                                                }
                                                else if (!validatePassword(new_password)) {
                                                    setcheck_Regex(true);
                                                }
                                                else {
                                                    changepassword();
                                                    setcheck_Regex(false)
                                                }
                                                return false;
                                            }}
                                        >
                                            {/* {error ? <Alert color="danger">{error}</Alert> : null} */}
                                            {error ? (
                                                <Alert color="danger">Some Error Occur</Alert>
                                            ) : null}
                                            {check_Regex &&
                                                <div style={{
                                                    textAlign: "center", padding: "8px", background: "#E6F1FF", color: "#ea7878", fontSize: "15px"
                                                }}>Password must contain at least one digit, one lowercase letter, one uppercase letter,
                                                    one special character, and have a minimum length of 8 characters.</div>
                                            }
                                            {/* {check_pass &&
                                                <div style={{
                                                    textAlign: "center", padding: "8px", background: "#E6F1FF", color: "#ea7878", fontSize: "15px"
                                                }}>New Password Must Be Equal To Confirm Password</div>
                                            } */}
                                            <div className="mb-3">
                                                <Label className="form-label">Enter Username</Label>
                                                <Input
                                                    name="user_name"
                                                    placeholder="Enter User_name"
                                                    value={user_name}
                                                    onChange={(e) => {
                                                        setuser_name(e.target.value)
                                                    }}
                                                    invalid={user_name_error}
                                                />
                                                {user_name_error &&
                                                    (<FormFeedback type="invalid">
                                                        {"Write Valid User_name"}
                                                    </FormFeedback>)
                                                }
                                            </div>
                                            {/* New Password */}
                                            <div className="mb-3">
                                                <Label className="form-label">Enter New Password</Label>
                                                <InputGroup>
                                                    <Input
                                                        // name="newpassword"
                                                        // value={validation.values.newpassword || ""}
                                                        // type={showPass ? "text" : "password"}
                                                        // placeholder="Enter New Password"
                                                        // onChange={validation.handleChange}
                                                        // // onBlur={validation.handleBlur}
                                                        // onBlur={() => {
                                                        //     if (!validatePassword(newpassword)) {
                                                        //         setcheck_Regex(true)
                                                        //       }
                                                        // }}
                                                        // invalid={
                                                        //     validation.touched.newpassword &&
                                                        //         validation.errors.newpassword
                                                        //         ? true
                                                        //         : false
                                                        // }
                                                        type={showPass ? "text" : "password"}
                                                        name="new_password"
                                                        // id="new_password"
                                                        // className="form-input"
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
                                                    {new_password_error &&
                                                        (<FormFeedback type="invalid">
                                                            {"Write New Password"}
                                                        </FormFeedback>)
                                                    }
                                                </InputGroup>
                                            </div>
                                            <div className="mt-3 d-grid">
                                                <button
                                                    className="btn btn-primary btn-block"
                                                    type="submit"
                                                >
                                                    Change Password
                                                </button>
                                            </div>
                                        </Form>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
};
export default AdminChangePassword;