import React, { useState } from "react";
import { Helmet } from "react-helmet";
import * as company_details from "../../../constants/CompanyDetails";
import {
  Row,
  Col,
  CardBody,
  Card,
  Alert,
  Container,
  Form,
  Input,
  Label,
  InputGroup,
  InputGroupText,
} from "reactstrap";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import profile from "../../../assets/images/profile-img.png";

const ForgetPassword = () => {

  const [showPass, setshowPass] = useState(false);
  const [error, seterror] = useState(false);
  const [step, setstep] = useState(1);

  //   const forget_password = (email, newpassword) => {
  //     axios
  //       .put(
  //         ServerAddress + "ems/reset_password/",
  //         {
  //           username: username,
  //           old_password: email,
  //           new_password: newpassword,
  //         },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${accessToken}`,
  //           },
  //         }
  //       )
  //       .then(function (response) {
  //         if (response.data == "Pass Reset") {
  //           seterror(false);
  //           navigate("/signin");
  //         } else {
  //           seterror(true);
  //         }
  //       })
  //       .catch(function () {
  //         seterror(true);
  //       });
  //   };

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "",
      newpassword: "",
      confirmnewpassword: "",
    },

    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      newpassword: Yup.string().required("Please Enter New Password"),
      // .matches(
      //   /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      //   "Password must contain at least 8 characters, one uppercase, one number and one special case character"
      // ),

      confirmnewpassword: Yup.string()
        .required("Please Confirm New Password")
        .oneOf([Yup.ref("newpassword"), null], "Passwords don't match."),
    }),
    onSubmit: (values) => {
      //   forget_password(values.email, values.newpassword);
      setstep(step + 1);
    },
  });

  return (
    <>
      <Helmet>
        <title>Forget | {company_details.WebApp_Name} </title>
      </Helmet>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="fas fa-home h2" />
        </Link>
      </div>
      <div className="account-pages my-5 pt-sm-5">
        <Container style={{ maxWidth: "810px" }}>
          <Row className="justify-content-center">
            <Col md={6} lg={6} xl={6}>
              <Card className="overflow-hidden">
                <div className="bg-primary bg-soft">
                  <Row>
                    <Col xs={7}>
                      <div className="text-primary p-4">
                        <h5 className="text-primary">Forget Password </h5>
                      </div>
                    </Col>
                    <Col className="col-5">
                      <img src={profile} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div>
                    <Link to="/" className="auth-logo-light">
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                          <img
                            src={company_details.company_logo_square}
                            alt=""
                            className="rounded-circle"
                            height="34"
                          />
                        </span>
                      </div>
                    </Link>
                  </div>
                  {step === 1 ? (
                    <div>
                      <Form
                        className="form-horizontal"
                        onSubmit={(e) => {
                          e.preventDefault();
                          validation.handleSubmit();
                          return false;
                        }}
                      >
                        {error ? (
                          <Alert color="danger" style={{ fontSize: "12px" }}>
                            Some Error Occur
                          </Alert>
                        ) : null}

                        {/*  Enter Your Email */}
                        <div className="mb-2">
                          <Label className="form-label">Enter Your Email</Label>

                          <InputGroup>
                            <Input
                              style={{ fontSize: "12px" }}
                              name="email"
                              value={validation.values.email}
                              type={"email"}
                              placeholder="Enter Your Email"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              invalid={
                                validation.touched.email &&
                                validation.errors.email
                                  ? true
                                  : false
                              }
                            />

                            {/* <InputGroupText>
                            <i
                              onClick={() => {
                                setshowPass(!showPass);
                              }}
                              className={
                                showPass ? "fas fa-eye-slash" : "fas fa-eye"
                              }
                            ></i>
                          </InputGroupText> */}
                          </InputGroup>

                          <div
                            style={{ fontSize: 10, color: "#F46A6A" }}
                            className="mt-1"
                            color="danger"
                          >
                            {validation.touched.email && validation.errors.email
                              ? "Please Enter Your email"
                              : null}
                          </div>
                        </div>

                        <div className="mt-3 d-grid">
                          <button
                            className="btn btn-primary btn-block"
                            //   type="submit"
                            onClick={() => setstep(step + 1)}
                          >
                            Send OTP
                          </button>
                        </div>

                        {/* <div className="mt-4 text-center">
                        <Link to="/forget_password" className="text-muted">
                          <i className="mdi mdi-lock me-1" />
                          Forgot your password?
                        </Link>
                      </div> */}
                      </Form>
                    </div>
                  ) : null}
                  {step === 2 ? (
                    <div>
                      <Form
                        className="form-horizontal"
                        onSubmit={(e) => {
                          e.preventDefault();
                          validation.handleSubmit();
                          return false;
                        }}
                      >
                        {error ? (
                          <Alert color="danger" style={{ fontSize: "12px" }}>
                            Some Error Occur
                          </Alert>
                        ) : null}

                        {/* Old Password */}
                        <div>
                          <Label className="form-label">ankit@gmail.com</Label>
                          <a
                            style={{ color: "blue" }}
                            onClick={() => setstep(step - 1)}
                          >
                            {" "}
                            Change Email
                          </a>
                        </div>
                        <div className="mb-2">
                          <Label className="form-label">Enter OTP</Label>

                          <InputGroup>
                            <Input
                              style={{ fontSize: "12px" }}
                              name="OTP"
                              value={validation.values.OTP}
                              type={"number"}
                              placeholder="Enter OTP"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              invalid={
                                validation.touched.OTP && validation.errors.OTP
                                  ? true
                                  : false
                              }
                            />

                            <InputGroupText>
                              <i
                                onClick={() => {
                                  setshowPass(!showPass);
                                }}
                                className={
                                  showPass ? "fas fa-eye-slash" : "fas fa-eye"
                                }
                              ></i>
                            </InputGroupText>
                          </InputGroup>
                          <a
                            style={{
                              background: "#E1F081",
                              width: "100%",
                              color: "blue",
                              flex: 1,
                              alignSelf: "flex-end0",
                            }}
                            onClick={() => alert("OTP Resend Successfully.")}
                          >
                            Resend OTP
                          </a>

                          <div
                            style={{ fontSize: 10, color: "#F46A6A" }}
                            className="mt-1"
                            color="danger"
                          >
                            {validation.touched.email && validation.errors.email
                              ? "Please Enter Your Old Password"
                              : null}
                          </div>
                        </div>

                        <div className="mt-3 d-grid">
                          <button
                            className="btn btn-primary btn-block"
                            type="submit"
                            onClick={() => setstep(step + 1)}
                          >
                            Send OTP
                          </button>
                        </div>

                        {/* <div className="mt-4 text-center">
                        <Link to="/forget_password" className="text-muted">
                          <i className="mdi mdi-lock me-1" />
                          Forgot your password?
                        </Link>
                      </div> */}
                      </Form>
                    </div>
                  ) : null}

                  {step === 3 ? (
                    <div>
                      <Form
                        className="form-horizontal"
                        onSubmit={(e) => {
                          e.preventDefault();
                          validation.handleSubmit();
                          return false;
                        }}
                      >
                        {error ? (
                          <Alert color="danger" style={{ fontSize: "12px" }}>
                            Some Error Occur
                          </Alert>
                        ) : null}

                        {/* New Password */}

                        <div className="mb-2">
                          <Label className="form-label">
                            Enter New Password
                          </Label>

                          <InputGroup>
                            <Input
                              style={{ fontSize: "12px" }}
                              name="OTP"
                              value={validation.values.OTP}
                              type={"number"}
                              placeholder="Enter OTP"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              invalid={
                                validation.touched.OTP && validation.errors.OTP
                                  ? true
                                  : false
                              }
                            />

                            <InputGroupText>
                              <i
                                onClick={() => {
                                  setshowPass(!showPass);
                                }}
                                className={
                                  showPass ? "fas fa-eye-slash" : "fas fa-eye"
                                }
                              ></i>
                            </InputGroupText>
                          </InputGroup>

                          <div
                            style={{ fontSize: 10, color: "#F46A6A" }}
                            className="mt-1"
                            color="danger"
                          >
                            {validation.touched.email && validation.errors.email
                              ? "Please Enter Your Old Password"
                              : null}
                          </div>
                        </div>
                        <div className="mb-2">
                          <Label className="form-label">
                            Retype New Password
                          </Label>

                          <InputGroup>
                            <Input
                              style={{ fontSize: "12px" }}
                              name="OTP"
                              value={validation.values.OTP}
                              type={"number"}
                              placeholder="Enter OTP"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              invalid={
                                validation.touched.OTP && validation.errors.OTP
                                  ? true
                                  : false
                              }
                            />

                            <InputGroupText>
                              <i
                                onClick={() => {
                                  setshowPass(!showPass);
                                }}
                                className={
                                  showPass ? "fas fa-eye-slash" : "fas fa-eye"
                                }
                              ></i>
                            </InputGroupText>
                          </InputGroup>

                          <div
                            style={{ fontSize: 10, color: "#F46A6A" }}
                            className="mt-1"
                            color="danger"
                          >
                            {validation.touched.email && validation.errors.email
                              ? "Please Enter Your Old Password"
                              : null}
                          </div>
                        </div>

                        <div className="mt-3 d-grid">
                          <button
                            className="btn btn-primary btn-block"
                            type="submit"
                            onClick={() => setstep(step + 1)}
                          >
                            Change Password
                          </button>
                        </div>

                        {/* <div className="mt-4 text-center">
                        <Link to="/forget_password" className="text-muted">
                          <i className="mdi mdi-lock me-1" />
                          Forgot your password?
                        </Link>
                      </div> */}
                      </Form>
                    </div>
                  ) : null}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default ForgetPassword;
