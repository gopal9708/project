import React, { useState, useEffect } from "react";
import {
  Col,
  Card,
  CardTitle,
  Form,
  CardBody,
  Row,
  Label,
  Input,
  FormFeedback,
  Button,
} from "reactstrap";
import PageTitle from "../../../components/pageTitle/PageTitle";
import Title from "../../../components/title/Title";
import { IconContext } from "react-icons";
import { MdAddCircleOutline, MdRemoveCircleOutline } from "react-icons/md";
import { useFormik } from "formik";
import * as Yup from "yup";
import { setToggle } from "../../../store/pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

function AddEmployee() {
  // Redux State
  const user = useSelector((state) => state.authentication.userdetails);
  const accessToken = useSelector((state) => state.authentication.access_token);

  const [isupdating, setisupdating] = useState(false);

  // toggle btn
  const [circle_btn, setcircle_btn] = useState(true);

  const toggle_circle = () => {
    setcircle_btn(!circle_btn);
  };

  const dispatch = useDispatch();
  const location_data = useLocation();
  const navigate = useNavigate();

  // usestate
  const [date_of_birth, setdate_of_birth] = useState("");
  const [age_is, setage_is] = useState("");

  const [gender, setgender] = useState("");

  const [marital_status, setmarital_status] = useState("");
  const [nationality, setnationality] = useState("");

  const [about_me, setabout_me] = useState("");
  const [about_exp, setabout_exp] = useState("");

  // To Calculate DOB
  useEffect(() => {
    let birth_year = date_of_birth.slice(0, 4);
    console.log("date", date_of_birth);
    console.log("birth year", birth_year);
    // if(date_of_birth !== "") {
    //   date_of_birth.getFullYear();

    // }

    let date = new Date();
    let current_year = date.getFullYear();
    let age = current_year - birth_year;
    setage_is(age);
    console.log("Age is ", age);
  }, [date_of_birth]);

  // To handle Cancle btn
  const handleAction = () => {
    dispatch(setToggle(true));
    navigate("/");
  };

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      first_name: "",
      middle_name: "",
      last_name: "",
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required("First name is required"),
      middle_name: Yup.string().required("Middle name is required "),
      last_name: Yup.string().required("Last name is required"),
    }),
    onSubmit: (values) => {
      console.log("Value is response", values);
      console.log("About ME", about_me);
      console.log("About Exp", about_exp);
    },
  });

  return (
    <>
      <div>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            console.log("Run");
            validation.handleSubmit(e.values);
            return false;
          }}
        >
          <div className="mt-3">
            <PageTitle page={"Add Employee"} />
            <Title title={"Add Employee"} parent_title="EMS" />

            <div className="m-3">
              <Col lg={12}>
                <Card className="shadow bg-white rounded">
                  <CardTitle className="mb-1 header">
                    <div className="header-text-icon header-text">
                      Employee Details
                      <IconContext.Provider
                        value={{
                          className: "header-add-icon",
                        }}
                      >
                        <div onClick={toggle_circle}>
                          {circle_btn ? (
                            <MdRemoveCircleOutline />
                          ) : (
                            <MdAddCircleOutline />
                          )}
                        </div>
                      </IconContext.Provider>
                    </div>
                  </CardTitle>
                  {circle_btn ? (
                    <CardBody>
                      <Row>
                        {isupdating && (
                          <Col lg={3} md={6} sm={6}>
                            <div className="mb-2">
                              <Label className="header-child">
                                Employee ID{" "}
                              </Label>
                              <Input
                                type="text"
                                className="form-control-md"
                                id="input"
                                name="employee_id"
                                disabled
                              />
                            </div>
                          </Col>
                        )}

                        <Col lg={3} md={6} sm={6}>
                          <div className="mb-2">
                            <Label className="header-child">
                              First Name
                              <span className="mandatory">*</span>
                            </Label>
                            <Input
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.first_name}
                              invalid={
                                validation.touched.first_name &&
                                validation.errors.first_name
                                  ? true
                                  : false
                              }
                              type="text"
                              className="form-control-md"
                              id="input"
                              name="first_name"
                              placeholder="Enter first name"
                            />
                            {validation.touched.first_name &&
                            validation.errors.first_name ? (
                              <FormFeedback type="invalid">
                                {validation.errors.first_name}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </Col>

                        <Col lg={3} md={6} sm={6}>
                          <div className="mb-2">
                            <Label className="header-child">
                              Middle Name <span className="mandatory">*</span>
                            </Label>
                            <Input
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.middle_name}
                              invalid={
                                validation.touched.middle_name &&
                                validation.errors.middle_name
                                  ? true
                                  : false
                              }
                              type="text"
                              className="form-control-md"
                              id="input"
                              name="middle_name"
                              placeholder="Enter middle name"
                            />
                            {validation.touched.middle_name &&
                            validation.errors.middle_name ? (
                              <FormFeedback type="invalid">
                                {validation.errors.middle_name}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </Col>

                        <Col lg={3} md={6} sm={6}>
                          <div className="mb-3">
                            <Label className="header-child">
                              Last Name
                              <span className="mandatory">*</span>
                            </Label>
                            <Input
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.last_name}
                              invalid={
                                validation.touched.last_name &&
                                validation.errors.last_name
                                  ? true
                                  : false
                              }
                              type="text"
                              className="form-control-md"
                              id="input"
                              name="last_name"
                              placeholder="Enter last name"
                            />
                            {validation.touched.last_name &&
                            validation.errors.last_name ? (
                              <FormFeedback type="invalid">
                                {validation.errors.last_name}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </Col>

                        <Col lg={3} md={6} sm={6}>
                          <div className="mb-3">
                            <Label className="header-child">
                              Nick Name
                              <span className="mandatory">*</span>
                            </Label>
                            <Input
                              type="text"
                              className="form-control-md"
                              id="input"
                              name="nick_name"
                              placeholder="Enter nick name"
                            />
                          </div>
                        </Col>

                        <Col lg={3} md={6} sm={6}>
                          <div className="mb-3">
                            <Label className="header-child">
                              Date of Birth
                              <span className="mandatory">*</span>
                            </Label>
                            <Input
                              type="date"
                              className="form-control-md"
                              id="input"
                              name="date_of_birth"
                              value={date_of_birth}
                              onChange={(val) => {
                                setdate_of_birth(val.target.value);
                              }}
                            />
                          </div>
                        </Col>

                        <Col lg={3} md={6} sm={6}>
                          <div className="mb-3">
                            <Label className="header-child">
                              Age
                              <span className="mandatory">*</span>
                            </Label>
                            <Input
                              type="number"
                              className="form-control-md"
                              id="input"
                              name="age"
                              value={age_is}
                              disabled
                            />
                          </div>
                        </Col>

                        <Col lg={3} md={6} sm={6}>
                          <div className="mb-3">
                            <Label className="header-child">
                              Gender
                              <span className="mandatory">*</span>
                            </Label>

                            <Col lg={12} md={12} sm={12}>
                              <Row>
                                <Col lg={4} md={6} sm={6}>
                                  <div className="mb-3">
                                    <Input
                                      type="radio"
                                      className="form-control-md"
                                      id="input"
                                      name="gender"
                                    />

                                    <Label>Male</Label>
                                  </div>
                                </Col>

                                <Col lg={4} md={6} sm={6}>
                                  <div className="mb-3">
                                    <Input
                                      type="radio"
                                      className="form-control-md"
                                      id="input"
                                      name="gender"
                                    />

                                    <Label>Female</Label>
                                  </div>
                                </Col>
                                {/* 
                                        <Col lg={4} md={6} sm={6}>
                                      <div className="mb-3">
                                        <Input
                                          type="radio"
                                          className="form-control-md"
                                          id="input"
                                          name="gender"
                                        />

                                        <Label>Others</Label>
                                        </div>
                                        </Col> */}
                              </Row>
                            </Col>
                          </div>
                        </Col>

                        <Col lg={3} md={6} sm={6}>
                          <div className="mb-3">
                            <Label className="header-child">
                              Marital status
                              <span className="mandatory">*</span>
                            </Label>
                            <Col lg={12} md={12} sm={12}>
                              <Row>
                                <Col lg={6} md={6} sm={6}>
                                  <div className="mb-3">
                                    <Input
                                      type="radio"
                                      className="form-control-md"
                                      id="input"
                                      name="marital_status"
                                    />

                                    <Label>Married</Label>
                                  </div>
                                </Col>

                                <Col lg={6} md={6} sm={6}>
                                  <div className="mb-3">
                                    <Input
                                      type="radio"
                                      className="form-control-md"
                                      id="input"
                                      name="marital_status"
                                    />

                                    <Label>Not Married</Label>
                                  </div>
                                </Col>
                              </Row>
                            </Col>
                          </div>
                        </Col>

                        <Col lg={3} md={6} sm={6}>
                          <div className="mb-3">
                            <Label className="header-child">
                              Nationality
                              <span className="mandatory">*</span>
                            </Label>
                            <Col lg={12} md={12} sm={12}>
                              <Row>
                                <Col lg={6} md={6} sm={6}>
                                  <div className="mb-3">
                                    <Input
                                      type="radio"
                                      className="form-control-md"
                                      id="input"
                                      name="nationality"
                                    />

                                    <Label>Indian</Label>
                                  </div>
                                </Col>

                                <Col lg={6} md={6} sm={6}>
                                  <div className="mb-3">
                                    <Input
                                      type="radio"
                                      className="form-control-md"
                                      id="input"
                                      name="nationality"
                                    />

                                    <Label>Other</Label>
                                  </div>
                                </Col>
                              </Row>
                            </Col>
                          </div>
                        </Col>
                        <Col lg={3} md={6} sm={6}>
                          <div className="mb-3">
                            <Label className="header-child">
                              Phone Number
                              <span className="mandatory">*</span>
                            </Label>
                            <Input
                              type="number"
                              min={0}
                              className="form-control-md"
                              id="input"
                              name="phone_number"
                              placeholder="Enter Phone Number"
                            />
                          </div>
                        </Col>

                        <Col lg={3} md={6} sm={6}>
                          <div className="mb-3">
                            <Label className="header-child">
                              Personal email
                              <span className="mandatory">*</span>
                            </Label>
                            <Input
                              type="email"
                              className="form-control-md"
                              id="input"
                              name="personal_email"
                              placeholder="Enter Personal Email"
                            />
                          </div>
                        </Col>

                        <Col lg={3} md={6} sm={6}>
                          <div className="mb-3">
                            <Label className="header-child">
                              Email
                              <span className="mandatory">*</span>
                            </Label>
                            <Input
                              type="email"
                              className="form-control-md"
                              id="input"
                              name="email"
                              placeholder="Enter Email"
                            />
                          </div>
                        </Col>

                        <Col lg={3} md={6} sm={6}>
                          <div className="mb-3">
                            <Label className="header-child">
                              PAN Number
                              <span className="mandatory">*</span>
                            </Label>
                            <Input
                              type="number"
                              min={0}
                              className="form-control-md"
                              id="input"
                              name="pan_number"
                              placeholder="Enter PAN Number"
                            />
                          </div>
                        </Col>

                        <Col lg={3} md={6} sm={6}>
                          <div className="mb-3">
                            <Label className="header-child">
                              National ID
                              <span className="mandatory">*</span>
                            </Label>
                            <Input
                              type="number"
                              min={0}
                              className="form-control-md"
                              id="input"
                              name="national_id"
                              placeholder="Enter ID Number"
                            />
                          </div>
                        </Col>

                        <Col lg={3} md={6} sm={6}>
                          <div className="mb-3">
                            <Label className="header-child">
                              Image URL
                              <span className="mandatory">*</span>
                            </Label>
                            <Input
                              type="file"
                              className="form-control-md"
                              id="input"
                            />
                          </div>
                        </Col>

                        <Col lg={6} md={6} sm={6}>
                          <div className="mb-3">
                            <Label className="header-child">
                              Residence Address
                              <span className="mandatory">*</span>
                            </Label>
                            <Input
                              type="text"
                              className="form-control-md"
                              id="input"
                              name="residence_address"
                              placeholder="Enter Residence Address"
                            />
                          </div>
                        </Col>

                        <Col lg={6} md={6} sm={6}>
                          <div className="mb-3">
                            <Label className="header-child">
                              About Me
                              <span className="mandatory">*</span>
                            </Label>
                            <br />
                            <textarea
                              type="text"
                              style={{ width: "450px", height: "180px" }}
                              value={about_me}
                              onChange={(val) => [
                                setabout_me(val.target.value),
                              ]}
                            />
                          </div>
                        </Col>

                        <Col lg={6} md={6} sm={6}>
                          <div className="mb-3">
                            <Label className="header-child">
                              Ask Me About Expertise
                              <span className="mandatory">*</span>
                            </Label>
                            <br />
                            <textarea
                              type="text"
                              style={{ width: "450px", height: "180px" }}
                              value={about_exp}
                              onChange={(val) => {
                                setabout_exp(val.target.value);
                              }}
                            />
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  ) : null}
                </Card>
              </Col>
            </div>
          </div>

          {/* Documents info */}
          <div className="m-3">
            <Col lg={12}>
              <Card className="shadow bg-white rounded">
                <CardTitle className="mb-1 header">
                  <div className="header-text-icon header-text">
                    Documents Info
                    <IconContext.Provider
                      value={{
                        className: "header-add-icon",
                      }}
                    >
                      <div onClick={toggle_circle}>
                        {circle_btn ? (
                          <MdRemoveCircleOutline />
                        ) : (
                          <MdAddCircleOutline />
                        )}
                      </div>
                    </IconContext.Provider>
                  </div>
                </CardTitle>
                {circle_btn ? (
                  <CardBody>
                    <Row>
                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-3">
                          <Label className="header-child">
                            Document Type
                            <span className="mandatory">*</span>
                          </Label>
                          <Input
                            type="text"
                            className="form-control-md"
                            id="input"
                            name="doc_type"
                            placeholder="Enter Document Type"
                          />
                        </div>
                      </Col>

                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-3">
                          <Label className="header-child">
                            Document Name
                            <span className="mandatory">*</span>
                          </Label>
                          <Input
                            type="text"
                            className="form-control-md"
                            id="input"
                            name="doc_name"
                            placeholder="Enter Document Name"
                          />
                        </div>
                      </Col>

                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-3">
                          <Label className="header-child">
                            Document
                            <span className="mandatory">*</span>
                          </Label>
                          <Input
                            type="file"
                            className="form-control-md"
                            id="input"
                          />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                ) : null}
              </Card>
            </Col>
          </div>

          {/* WorkExperience */}
          <div className="m-3">
            <Col lg={12}>
              <Card className="shadow bg-white rounded">
                <CardTitle className="mb-1 header">
                  <div className="header-text-icon header-text">
                    Emargency Contact
                    <IconContext.Provider
                      value={{
                        className: "header-add-icon",
                      }}
                    >
                      <div onClick={toggle_circle}>
                        {circle_btn ? (
                          <MdRemoveCircleOutline />
                        ) : (
                          <MdAddCircleOutline />
                        )}
                      </div>
                    </IconContext.Provider>
                  </div>
                </CardTitle>
                {circle_btn ? (
                  <CardBody>
                    <Row>
                      <Col lg={2} md={6} sm={6}>
                        <div className="mb-3">
                          <Label className="header-child">
                            Company Name
                            <span className="mandatory">*</span>
                          </Label>
                          <Input
                            type="text"
                            className="form-control-md"
                            id="input"
                            name="company_name"
                            placeholder="Enter company nmae"
                          />
                        </div>
                      </Col>

                      <Col lg={2} md={6} sm={6}>
                        <div className="mb-3">
                          <Label className="header-child">
                            Joining Date
                            <span className="mandatory">*</span>
                          </Label>
                          <Input
                            type="date"
                            className="form-control-md"
                            id="input"
                            name="joining_date"
                          />
                        </div>
                      </Col>

                      <Col lg={2} md={6} sm={6}>
                        <div className="mb-3">
                          <Label className="header-child">
                            Leaving Date
                            <span className="mandatory">*</span>
                          </Label>
                          <Input
                            type="date"
                            className="form-control-md"
                            id="input"
                            name="leaving_date"
                          />
                        </div>
                      </Col>

                      <Col lg={2} md={6} sm={6}>
                        <div className="mb-3">
                          <Label className="header-child">
                            Designation
                            <span className="mandatory">*</span>
                          </Label>
                          <Input
                            type="text"
                            className="form-control-md"
                            id="input"
                            name="desigation"
                            placeholder="Enter Designation"
                          />
                        </div>
                      </Col>

                      <Col lg={2} md={6} sm={6}>
                        <div className="mb-3">
                          <Label className="header-child">
                            Skills
                            <span className="mandatory">*</span>
                          </Label>
                          <Input
                            type="text"
                            className="form-control-md"
                            id="input"
                            name="skills"
                            placeholder="Enter Skills"
                          />
                        </div>
                      </Col>

                      <Col lg={2} md={6} sm={6}>
                        <div className="mb-3">
                          <Label className="header-child">
                            Last Employer
                            <span className="mandatory">*</span>
                          </Label>
                          <br />
                          <Input
                            type="checkbox"
                            // className="form-control-md"
                            // id="input"
                          />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                ) : null}
              </Card>
            </Col>
          </div>

          {/* Education Info */}
          <div className="m-3">
            <Col lg={12}>
              <Card className="shadow bg-white rounded">
                <CardTitle className="mb-1 header">
                  <div className="header-text-icon header-text">
                    Education Details
                    <IconContext.Provider
                      value={{
                        className: "header-add-icon",
                      }}
                    >
                      <div onClick={toggle_circle}>
                        {circle_btn ? (
                          <MdRemoveCircleOutline />
                        ) : (
                          <MdAddCircleOutline />
                        )}
                      </div>
                    </IconContext.Provider>
                  </div>
                </CardTitle>
                {circle_btn ? (
                  <CardBody>
                    <Row>
                      <Col lg={2} md={6} sm={6}>
                        <div className="mb-3">
                          <Label className="header-child">
                            Education Type
                            <span className="mandatory">*</span>
                          </Label>
                          <Input
                            type="text"
                            className="form-control-md"
                            id="input"
                            name="education_type"
                            placeholder="Enter Education Type"
                          />
                        </div>
                      </Col>

                      <Col lg={3} md={6} sm={6}>
                        <div className="mb-3">
                          <Label className="header-child">
                            Organization
                            <span className="mandatory">*</span>
                          </Label>
                          <Input
                            type="text"
                            className="form-control-md"
                            id="input"
                            name="organization_name"
                            placeholder="Enter Organization Name"
                          />
                        </div>
                      </Col>

                      <Col lg={3} md={6} sm={6}>
                        <div className="mb-3">
                          <Label className="header-child">
                            Degree
                            <span className="mandatory">*</span>
                          </Label>
                          <Input
                            type="text"
                            className="form-control-md"
                            id="input"
                            name="degree"
                            placeholder="Enter Degree"
                          />
                        </div>
                      </Col>

                      <Col lg={2} md={6} sm={6}>
                        <div className="mb-3">
                          <Label className="header-child">
                            Starting Date
                            <span className="mandatory">*</span>
                          </Label>
                          <Input
                            type="date"
                            className="form-control-md"
                            id="input"
                            name="starting_date"
                          />
                        </div>
                      </Col>

                      <Col lg={2} md={6} sm={6}>
                        <div className="mb-3">
                          <Label className="header-child">
                            Leaving Date
                            <span className="mandatory">*</span>
                          </Label>
                          <Input
                            type="date"
                            className="form-control-md"
                            id="input"
                            name="leaving_date"
                          />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                ) : null}
              </Card>
            </Col>
          </div>

          {/* Passport Details */}
          <div className="m-3">
            <Col lg={12}>
              <Card className="shadow bg-white rounded">
                <CardTitle className="mb-1 header">
                  <div className="header-text-icon header-text">
                    Passport Details
                    <IconContext.Provider
                      value={{
                        className: "header-add-icon",
                      }}
                    >
                      <div onClick={toggle_circle}>
                        {circle_btn ? (
                          <MdRemoveCircleOutline />
                        ) : (
                          <MdAddCircleOutline />
                        )}
                      </div>
                    </IconContext.Provider>
                  </div>
                </CardTitle>
                {circle_btn ? (
                  <CardBody>
                    <Row>
                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-3">
                          <Label className="header-child">
                            Nationality
                            <span className="mandatory">*</span>
                          </Label>
                          <Input
                            type="text"
                            className="form-control-md"
                            id="input"
                            name="nationality"
                            placeholder="Enter nationality"
                          />
                        </div>
                      </Col>

                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-3">
                          <Label className="header-child">
                            Passport Number
                            <span className="mandatory">*</span>
                          </Label>
                          <Input
                            type="number"
                            min={0}
                            className="form-control-md"
                            id="input"
                            name="passport_number"
                            placeholder="Enter Passport Number"
                          />
                        </div>
                      </Col>

                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-3">
                          <Label className="header-child">
                            Valid Till
                            <span className="mandatory">*</span>
                          </Label>
                          <Input
                            type="date"
                            className="form-control-md"
                            id="input"
                            name="valid_till"
                          />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                ) : null}
              </Card>
            </Col>
          </div>

          {/* fotter btn */}
          <div className="m-3">
            <Col lg={12}>
              <div className="mb-1 footer_btn">
                <Button type="submit" className="btn btn-success m-1 cu_btn">
                  Save
                </Button>

                <Button
                  type="button"
                  className="btn btn-danger m-1 cu_btn"
                  onClick={handleAction}
                >
                  Cancel
                </Button>
              </div>
            </Col>
          </div>
        </Form>
      </div>
    </>
  );
}

export default AddEmployee;
