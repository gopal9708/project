import React, { useState } from "react";
import { Helmet } from "react-helmet";
import * as company_details from "../../../constants/CompanyDetails";
import axios from "axios";
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
  InputGroup,
  InputGroupText,
} from "reactstrap";
import { useNavigate, Link } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import profile from "../../../assets/images/profile-img.png";
import { ServerAddress } from "../../../constants/ServerAddress";
import { useSelector } from "react-redux";

const Reset_Password = () => {
  const navigate = useNavigate();

  const [showPass, setshowPass] = useState(false);
  const [error, seterror] = useState(false);
  const username = useSelector((state) => state.authentication.username);
  const accessToken = useSelector((state) => state.authentication.access_token);
  const [message, setmessage] = useState("")
  console.log("message----", message)

  const reset_password = (oldpassword, newpassword) => {
    axios
      .put(
        ServerAddress + "ems/reset_password/",
        {
          username: username,
          old_password: oldpassword,
          new_password: newpassword,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (response) {
        // console.log("Pass Reset------", response.data)
        if (response.data === "Password Reset Successfully") {
          seterror(false);
          navigate("/signin");
        } else {
          setmessage(response.data)
          seterror(true);
        }
      })
      .catch(function () {
        setmessage("Some Error Occur")
        seterror(true);
      });
  };

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      oldpassword: "",
      newpassword: "",
      confirmnewpassword: "",
    },

    validationSchema: Yup.object({
      oldpassword: Yup.string().required("Please Enter Your Old Password"),
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
      reset_password(values.oldpassword, values.newpassword);
    },
  });

  return (
    <>
      <Helmet>
        <title>Login | {company_details.WebApp_Name} </title>
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
                        <h5 className="text-primary">Reset Password </h5>
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
                          {message}
                        </Alert>
                      ) : null}

                      {/* Old Password */}
                      <div className="mb-2">
                        <Label className="form-label"> Old Password</Label>

                        <InputGroup>
                          <Input
                            style={{ fontSize: "12px" }}
                            name="oldpassword"
                            value={validation.values.oldpassword}
                            type={showPass ? "text" : "password"}
                            placeholder="Enter Old Password"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            invalid={
                              validation.touched.oldpassword &&
                              validation.errors.oldpassword
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
                          {validation.touched.oldpassword &&
                          validation.errors.oldpassword
                            ? "Please Enter Your Old Password"
                            : null}
                        </div>
                      </div>

                      {/* New Password */}
                      <div className="mb-2">
                        <Label className="form-label"> New Password</Label>
                        <Input
                          style={{ fontSize: "12px" }}
                          name="newpassword"
                          value={validation.values.newpassword || ""}
                          type={"password"}
                          placeholder="Enter New Password"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          invalid={
                            validation.touched.newpassword &&
                            validation.errors.newpassword
                              ? true
                              : false
                          }
                        />

                        {validation.touched.newpassword &&
                        validation.errors.newpassword ? (
                          <FormFeedback type="invalid">
                            {validation.errors.newpassword}
                          </FormFeedback>
                        ) : null}
                      </div>

                      {/* Confirm New Password */}
                      <div className="mb-2">
                        <Label className="form-label">
                          {" "}
                          Confirm New Password
                        </Label>

                        <Input
                          style={{ fontSize: "12px" }}
                          name="confirmnewpassword"
                          value={validation.values.confirmnewpassword || ""}
                          type={"password"}
                          placeholder="Confirm New Password"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          invalid={
                            validation.touched.confirmnewpassword &&
                            validation.errors.confirmnewpassword
                              ? true
                              : false
                          }
                        />

                        {validation.touched.confirmnewpassword &&
                        validation.errors.confirmnewpassword ? (
                          <FormFeedback type="invalid">
                            {validation.errors.confirmnewpassword}
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="mt-3 d-grid">
                        <button
                          className="btn btn-primary btn-block"
                          type="submit"
                        >
                          Reset Password
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
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Reset_Password;
