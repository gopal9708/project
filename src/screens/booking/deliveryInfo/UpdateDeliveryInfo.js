import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IconContext } from "react-icons";
import { MdAddCircleOutline, MdRemoveCircleOutline } from "react-icons/md";
import axios from "axios";
import { ServerAddress } from "../../../constants/ServerAddress";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Card,
  Col,
  Row,
  CardBody,
  CardTitle,
  Label,
  Input,
  FormFeedback,
  Form,
  FormGroup
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import toTitleCase from "../../../lib/titleCase/TitleCase";
import {
  setAlertType,
  setDataExist,
  setShowAlert,
} from "../../../store/alert/Alert";
import PageTitle from "../../../components/pageTitle/PageTitle";
import Title from "../../../components/title/Title";
import { Button } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import ImgModal from "../../../components/crop/ImgModal";
import Loader from "../../../components/loader/Loader";
const UpdateDeliveryInfo = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authentication.userdetails);
  const accessToken = useSelector((state) => state.authentication.access_token);
 
  const navigate = useNavigate();
  const location = useLocation();
  // console.log("location----", location)
  const [delivery_data, setdelivery_data] = useState([])
  const [result_img, setresult_img] = useState("")
  const [vehcile_img_error, setvehcile_img_error] = useState(false);
  const [modal, setmodal] = useState(false);
  const [uploaded_img, setuploaded_img] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [sig_modal, setsig_modal] = useState(false);
  const [result_sig_img, setresult_sig_img] = useState("")
  const [signature_error, setsignature_error] = useState(false);
  const [isupdating, setisupdating] = useState(false);
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      // toTitleCase(commodity.person_name) || "",
      docket_no: delivery_data.docket_no || "",
      person_name: toTitleCase(delivery_data.signature_person_name) || "",
      phone_no: delivery_data.signature_person_phone_number || "",
    },
    validationSchema: Yup.object({
      person_name: Yup.string().required("Commodity name is required"),
    }),
    onSubmit: (values) => {
      update_delivery_info(values);
    },
  });
  const [circle_btn, setcircle_btn] = useState(true);
  const toggle_circle = () => {
    setcircle_btn(!circle_btn);
  };

  const update_delivery_info = (values) => {
    setIsLoading(true)
    let id = delivery_data.id;
    let fields_names = Object.entries({
      signature_person_name: values.person_name,
      signature_person_phone_number: values.phone_no,
    });
    let change_fields = {};

    for (let j = 0; j < fields_names.length; j++) {
      const ele = fields_names[j];
      let prev = delivery_data[`${ele[0]}`];
      let new_v = ele[1];
      if (String(prev).toUpperCase() !== String(new_v).toUpperCase()) {
        change_fields[`${ele[0]}`] = new_v.toString().toUpperCase();
      }
    }

    axios
      .put(
        ServerAddress + "booking/update_POD/" + id,
        {
          // order: delivery_data.order,
          pod: result_img?.substring(0, 4) !== "http" ? result_img : null,
          signature: result_sig_img?.substring(0, 4) !== "http" ? result_sig_img : null,
          signature_person_name: values.person_name,
          signature_person_phone_number: values.phone_no,
          change_fields: change_fields,
          //For C&M
          cm_transit_status: status_toggle === true ? current_status : "",
          cm_current_status: (current_status).toUpperCase(),
          cm_remarks: "",
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (response) {
        if (response.data.status === "success") {
          setIsLoading(false)
          // dispatch(Toggle(true))
          dispatch(setShowAlert(true));
          dispatch(setDataExist(`Status Updated sucessfully`));
          dispatch(setAlertType("info"));
          navigate("/booking/deliveryinfo");
        }
      })
      .catch(function (err) {
        setIsLoading(false)
        alert(`rror While  Updateing Coloader ${err}`);
      });
  };
  // console.log("location-----", location)

  useEffect(() => {
    try {
      let data = location.state.order
      setdelivery_data(data);
      setisupdating(true);
      setresult_img(data.pod_image)
      setresult_sig_img(data.image)
    } catch (error) { }
  }, []);


  //For Checker Maker
  const [current_status, setcurrent_status] = useState("");
  const [status_toggle, setstatus_toggle] = useState(false)
  const [message, setmessage] = useState("")
  const [message_error, setmessage_error] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true)
    setmessage_error(false)
  };
  useEffect(() => {
    if (user.user_department_name === "ADMIN") {
      setcurrent_status("NOT APPROVED")
      setstatus_toggle(true)
    }
    else if (user.user_department_name === "ACCOUNTANT" || user.user_department_name + " " + user.designation_name === "ACCOUNT MANAGER" || user.is_superuser) {
      setcurrent_status("APPROVED")
      setstatus_toggle(true)
    }
    else {
      setcurrent_status("NOT APPROVED")
      // setstatus_toggle(false)
    }

  }, [user, isupdating])

  const update_pod_status = (id) => {
    setIsLoading(true)
    axios
      .put(
        ServerAddress + "booking/update_POD/" + id,
        {
          cm_current_status: "REJECTED",
          cm_remarks: toTitleCase(message).toUpperCase(),
          change_fields: { 'cm_current_status': 'REJECTED' },
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (response) {
        if (response.data.status === "success") {
          setIsLoading(false)
          // dispatch(Toggle(true))
          dispatch(setShowAlert(true));
          dispatch(setDataExist(`Status Updated sucessfully`));
          dispatch(setAlertType("info"));
          navigate("/booking/deliveryinfo");
        }
      })
      .catch(function (err) {
        setIsLoading(false)
        alert(`rror While  Updateing Coloader ${err}`);
      });
  };

  const handleSubmit = () => {
    if (message === "") {
      setmessage_error(true);
    }
    else {
      update_pod_status(delivery_data.id)
      setShow(false)
    }
  }

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Reject Resion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup>
            <Label for="exampleText">
              Text Area
            </Label>
            <Input
              id="exampleText"
              name="text"
              type="textarea"
              style={{ height: "90px" }}
              onChange={(e) => {
                setmessage(e.target.value)
              }}
            />
            <div className="mt-1 error-text" color="danger">
              {message_error ? "Please Enter Reject Resion" : null}
            </div>
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => handleSubmit()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      <Form
        onSubmit={(e) => {
          e.preventDefault();
          validation.handleSubmit(e.values);
          return false;
        }}
      >
        {/* Commodity */}
        <div className="mt-3">
          <PageTitle page={"Update Delivery Info"} />
          <Title
            title={"Update Delivery Info"}
            parent_title="Booking"
          />
        </div>

        <div className="m-3">

          {/* //Added For History */}

          <Col lg={12}>
            <Card className="shadow bg-white rounded">
              <CardTitle className="mb-1 header">
                <div className="header-text-icon header-text">
                  <div></div>
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
                        <Label className="header-child">Docket Number*</Label>
                        <Input
                          onChange={validation.handleChange}
                          value={validation.values.docket_no}
                          type="text"
                          name="docket_no"
                          className="form-control-md"
                          id="input"
                          disabled
                        />
                      </div>
                    </Col>
                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-3">
                        <Label className="header-child">Person Name*</Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.person_name}
                          invalid={
                            validation.touched.person_name &&
                              validation.errors.person_name
                              ? true
                              : false
                          }
                          type="text"
                          name="person_name"
                          className="form-control-md"
                          id="input"
                          placeholder="Enter Name"
                        />
                        {validation.touched.person_name &&
                          validation.errors.person_name ? (
                          <FormFeedback type="invalid">
                            {validation.errors.person_name}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-3">
                        <Label className="header-child">Phone Number*</Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.phone_no}
                          invalid={
                            validation.touched.phone_no &&
                              validation.errors.phone_no
                              ? true
                              : false
                          }
                          type="text"
                          name="phone_no"
                          className="form-control-md"
                          id="input"
                          placeholder="Enter Phone Number"
                        />
                        {validation.touched.phone_no &&
                          validation.errors.phone_no ? (
                          <FormFeedback type="invalid">
                            {validation.errors.phone_no}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>

                    <ImgModal
                      modal={modal}
                      modal_set={() => {
                        setmodal(false);
                      }}
                      pre_image={result_img ? result_img : ""}
                      upload_image={(val) => {
                        setuploaded_img(val);
                      }}
                      result_image={(val) => {
                        setresult_img(val);
                      }}
                    />
                    {(result_img === "" || !result_img) &&
                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-2" style={{ position: "relative" }}>
                          <Label>POD*</Label>
                          <Input
                            style={{ background: "white" }}
                            className="form-control-md"
                            name="logo"
                            // type=""
                            id="input"
                            disabled
                            value={result_img}
                            invalid={vehcile_img_error}
                            onChange={(val) => {
                              setresult_img(val.target.value)
                            }}
                          // accept="image/png,image/jpeg, image/jpg"
                          />
                          <button
                            style={{
                              border: "none",
                              position: "absolute",
                              borderRadius: "2px",
                              height: "29px",
                              top: "28.5px",
                              // padding: "0.375rem 0.75rem",
                              marginLeft: ".9px",
                              background: "#e9ecef",
                            }}
                            className="form-control-md"
                            id="input"
                            type="button"
                            onClick={() => setmodal(true)}
                          >
                            Choose Image
                          </button>
                          <FormFeedback type="invalid">
                            POD is required
                          </FormFeedback>
                        </div>
                      </Col>
                    }
                    {result_img && (
                      <Col lg={4} md={4} sm={6}>
                        <Label>POD *</Label>
                        <div className="mb-3">
                          <img
                            onClick={() => setmodal(true)}
                            src={result_img}
                            alt="result_img"
                            style={{
                              width: "95px",
                              height: "95px",
                              borderRadius: "8px",
                              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                            }}
                          />
                        </div>
                      </Col>
                    )}

                    <ImgModal
                      modal={sig_modal}
                      modal_set={() => {
                        setsig_modal(false);
                      }}
                      pre_image={result_sig_img ? result_sig_img : ""}
                      upload_image={(val) => {
                        setuploaded_img(val);
                      }}
                      result_image={(val) => {
                        setresult_sig_img(val);
                      }}
                    />
                    {(result_sig_img === "" || !result_sig_img) &&
                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-2" style={{ position: "relative" }}>
                          <Label>Signature Image*</Label>
                          <Input
                            style={{ background: "white" }}
                            className="form-control-md"
                            name="logo"
                            // type=""
                            id="input"
                            disabled
                            value={result_sig_img}
                            invalid={signature_error}
                            onChange={(val) => {
                              setresult_sig_img(val.target.value)
                            }}
                          // accept="image/png,image/jpeg, image/jpg"
                          />
                          <button
                            style={{
                              border: "none",
                              position: "absolute",
                              borderRadius: "2px",
                              height: "29px",
                              top: "28.5px",
                              // padding: "0.375rem 0.75rem",
                              marginLeft: ".9px",
                              background: "#e9ecef",
                            }}
                            className="form-control-md"
                            id="input"
                            type="button"
                            onClick={() => setsig_modal(true)}
                          >
                            Choose Image
                          </button>
                          <FormFeedback type="invalid">
                            Signature Image is required
                          </FormFeedback>
                        </div>
                      </Col>
                    }
                    {result_sig_img && (
                      <Col lg={4} md={4} sm={6}>
                        <Label>Signature Image *</Label>
                        <div className="mb-3">
                          <img
                            onClick={() => setsig_modal(true)}
                            src={result_sig_img}
                            alt="result_sig_img"
                            style={{
                              width: "95px",
                              height: "95px",
                              borderRadius: "8px",
                              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                            }}
                          />
                        </div>
                      </Col>
                    )}

                  </Row>
                </CardBody>
              ) : null}
            </Card>
          </Col>
        </div>
        {/*Button */}
        <div className="m-3">
          <Col lg={12}>
            <div className="mb-1 footer_btn">
              {!isLoading ?
                <button
                  type="submit"
                  className={isupdating && (user.user_department_name + " " + user.designation_name ===
                    "DATA ENTRY OPERATOR" ||
                    user.user_department_name +
                    " " +
                    user.designation_name ===
                    "CUSTOMER SERVICE EXECUTIVE") ? "btn btn-info m-1" : !isupdating ? "btn btn-info m-1" : "btn btn-success m-1"}
                >
                  {isupdating && (user.user_department_name + " " + user.designation_name ===
                    "DATA ENTRY OPERATOR" ||
                    user.user_department_name +
                    " " +
                    user.designation_name ===
                    "CUSTOMER SERVICE EXECUTIVE" || user.is_superuser) ? "Update" : !isupdating ? "Save" : "Approved"}
                </button>
                :
                <button
                  type="button"
                  className={isupdating && (user.user_department_name + " " + user.designation_name ===
                    "DATA ENTRY OPERATOR" ||
                    user.user_department_name +
                    " " +
                    user.designation_name ===
                    "CUSTOMER SERVICE EXECUTIVE") ? "btn btn-info m-1" : !isupdating ? "btn btn-info m-1" : "btn btn-success m-1"}
                >
                  <Loader />
                </button>
              }
              {
                (isupdating && (user.user_department_name + " " + user.designation_name) !== "DATA ENTRY OPERATOR" &&
                  (user.user_department_name + " " + user.designation_name) !== "CUSTOMER SERVICE EXECUTIVE") &&
                !user.is_superuser &&
                (
                  <button
                    type="button"
                    className="btn btn-danger m-1"
                    onClick={handleShow}
                  >
                    Rejected
                  </button>
                )
              }
              <Button
                className="btn btn-info m-1 cu_btn"
                type="button"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
            </div>
          </Col>
        </div>
      </Form>
    </div>
  );
};
export default UpdateDeliveryInfo;
