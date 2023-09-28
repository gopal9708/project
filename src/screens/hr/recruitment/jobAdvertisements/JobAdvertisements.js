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
import {
  setShowAlert,
  setDataExist,
  setAlertType,
} from "../../../../store/alert/Alert";
import PageTitle from "../../../../components/pageTitle/PageTitle";
import Title from "../../../../components/title/Title";
import { IconContext } from "react-icons";
import { MdAddCircleOutline, MdRemoveCircleOutline } from "react-icons/md";
import { useFormik } from "formik";
import * as Yup from "yup";
import NSearchInput from "../../../../components/formComponent/nsearchInput/NSearchInput";
import { setToggle } from "../../../../store/pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ServerAddress } from "../../../../constants/ServerAddress";

function JobAdvertisements() {
  const dispatch = useDispatch();
  const location= useLocation();
  const navigate = useNavigate();

  // Redux state
  const user = useSelector((state) => state.authentication.userdetails);
  const accessToken = useSelector((state) => state.authentication.access_token);
const organization=useSelector((state)=>state.authentication.organization_id);
  // for toggle btn
  const [circle_btn, setcircle_btn] = useState(true);
  const toggle_circle = () => {
    setcircle_btn(!circle_btn);
  };

  // usestate
  const [isupdating, setisupdating] = useState(false);
  const [position_list, setposition_list] = useState([
    "SoftWare Devloper",
    "Database Designer",
  ]);
  const [position, setposition] = useState("");
  const [get_data, setget_data] = useState("");
  const [org_id, setorg_id] = useState("");

  // Function to handle cancel btn
  const handleAction = () => {
    dispatch(setToggle(true));
    navigate("/hr/recruitment/jobAdvertisements/JobList");
  };

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      education: get_data.education || "",
      vacancy:get_data.vacancy || "",
      experience:get_data.experience || "",
      post_date:get_data.post_date || "",
      dead_line:get_data.dead_line || "",
      description:get_data.description || "",
    },
    validationSchema: Yup.object({
    }),
    onSubmit: (values) => {     
      isupdating ? update_jobadv_data(values) : send_advertisment(values);
    },
  });

  const send_advertisment = (values) => {
    axios
      .post(
        ServerAddress + "ems/add-job-advertisement/",
        {
          organization:user.organization_id,
          user:user.id,
          position:position,
          education:values.education,
          vacancy:values.vacancy,
          experience:values.experience,
          post_date:values.post_date,
          dead_line:values.dead_line,
          description:values.description,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (response) {
        console.log(response.data);
        if (response.data !== "") {
          dispatch(setToggle(true));
          dispatch(
            setDataExist(`Job Advertisement "${position}" Added Sucessfully`)
          );
          navigate("/hr/recruitment/jobAdvertisements/JobList");
        }
      })
      .catch((error) => {
        alert(`Error Happen while posting Advertisement Data ${error}`);
      });
  };

  const update_jobadv_data = (values) => {
    axios
      .put(
        ServerAddress + "ems/update_jobAdevrtisment/" + org_id,
        {
          organization:user.organization_id,
          user:user.id,
          position:position,
          education:values.education,
          vacancy:values.vacancy,
          experience:values.experience,
          post_date:values.post_date,
          dead_line:values.dead_line,
          description:values.description,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        if (response.data.status === "success") {
          dispatch(setShowAlert(true));
          dispatch(setAlertType("warning"));
          dispatch(
            setDataExist(`Job Advertisement ${position} Updated Successfully`)
          );
          navigate("/hr/recruitment/jobAdvertisements/JobList");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };  
  useEffect(() => {
    try {
      let mastr = location.state.data;
      console.log("Card Master data==", location);
      setisupdating(true);
      setget_data(mastr);
      setorg_id(mastr.id);
      setposition(mastr.position);
    } catch (error) {
      setisupdating(false);
    }
  }, [isupdating]);


  return (
    <>
      <div>
        <Form
          onSubmit={(e) => {
            console.log("ert")
            e.preventDefault();
            validation.handleSubmit(e.values);
            return false;
          }}
        >
          <div className="mt-3">
            <PageTitle
              page={
                isupdating
                  ? "Update Job Advertisements"
                  : "Add Job Advertisements"
              }
            />
            <Title
              title={
                isupdating
                  ? "Update Job Advertisements"
                  : "Add Job Advertisements"
              }
              parent_title="Recruitment
              "
            />
            <div className="m-3">
              <Col lg={12}>
                <Card className="shadow bg-white rounded">
                  <CardTitle className="mb-1 header">
                    <div className="header-text-icon header-text">
                      Basic Info
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
                          <div className="mb-2">
                            <Label className="header-child">
                              Position: <span className="mandatory">*</span>
                            </Label>
                            {/* SearchInput is required */}
                            <NSearchInput
                              data_list={position_list}
                              data_item_s={position}
                              set_data_item_s={setposition}
                            />
                          </div>
                        </Col>

                        <Col lg={4} md={6} sm={6}>
                          <div className="mb-2">
                            <Label className="header-child">
                              Education: <span className="mandatory">*</span>
                            </Label>
                            <Input
                              className="form-control d-block from control-md"
                              bsSize="sm"
                              name="education"
                              type="text"
                              placeholder="Enter Education"
                              onChange={validation.handleChange}
                              value={validation.values.education}
                              invalid={
                                validation.touched.education &&
                                  validation.errors.education
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.education &&
                              validation.errors.education ? (
                              <FormFeedback type="invalid">
                                {validation.errors.education}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </Col>

                        <Col lg={4} md={6} sm={6}>
                          <div className="mb-2">
                            <Label className="header-child">
                              Vacancy: <span className="mandatory">*</span>
                            </Label>
                            <Input
                              className="form-control d-block from control-md"
                              bsSize="sm"
                              name="vacancy"
                              type="text"
                              placeholder="Enter Vacancy Name"
                              onChange={validation.handleChange}
                              value={validation.values.vacancy}
                              invalid={
                                validation.touched.vacancy &&
                                  validation.errors.vacancy
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.vacancy &&
                              validation.errors.vacancy ? (
                              <FormFeedback type="invalid">
                                {validation.errors.vacancy}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </Col>

                        <Col lg={4} md={6} sm={6}>
                          <div className="mb-2">
                            <Label className="header-child">
                              Experience: <span className="mandatory">*</span>
                            </Label>
                            <Input
                              className="form-control d-block from control-md"
                              bsSize="sm"
                              name="experience"
                              type="text"
                              placeholder="Enter Year Experience"
                              onChange={validation.handleChange}
                              value={validation.values.experience}
                              invalid={
                                validation.touched.experience &&
                                  validation.errors.experience
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.experience &&
                              validation.errors.experience ? (
                              <FormFeedback type="invalid">
                                {validation.errors.experience}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </Col>

                        <Col lg={4} md={6} sm={6}>
                          <div className="mb-2">
                            <Label className="header-child">
                              Post date: <span className="mandatory">*</span>
                            </Label>
                            <Input
                              className="form-control d-block from control-md"
                              bsSize="sm"
                              name="post_date"
                              type="date"
                              onChange={validation.handleChange}
                              value={validation.values.post_date}
                            />
                          </div>
                        </Col>

                        <Col lg={4} md={6} sm={6}>
                          <div className="mb-2">
                            <Label className="header-child">
                              Deadline : <span className="mandatory">*</span>
                            </Label>
                            <Input
                              className="form-control d-block from control-md"
                              bsSize="sm"
                              name="dead_line"
                              type="date"
                              onChange={validation.handleChange}
                              value={validation.values.dead_line}
                            />
                          </div>
                        </Col>

                        <Col lg={4} md={6} sm={6}>
                          <div className="mb-2">
                            <Label className="header-child">Show salary</Label>
                            <Input
                              style={{ margin: "5px 0px 0px 10px" }}
                              type="checkbox"
                            />
                          </div>
                        </Col>

                        <Col lg={4} md={6} sm={6}>
                          <div className="mb-2">
                            <Label className="header-child">
                              Description: <span className="mandatory">*</span>
                            </Label>
                            <br />
                            <Input
                              style={{ minWidth: "300px", minHeight: "70px" }}
                              name="description"
                              type="textarea"
                              onChange={validation.handleChange}
                              value={validation.values.description}
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

          {/* footer btn */}
          <div className="m-3">
            <Col lg={12}>
              <div className="mb-1 footer_btn">
                <Button type="submit" className="btn btn-success m-1 cu_btn">
                  {isupdating ? "Update" : "Save"}
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

export default JobAdvertisements;
