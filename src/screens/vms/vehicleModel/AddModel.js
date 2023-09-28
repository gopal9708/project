import React, { useState, useLayoutEffect } from "react";
import { MdAddCircleOutline, MdRemoveCircleOutline } from "react-icons/md";
import {
  Col,
  Card,
  CardTitle,
  CardBody,
  Label,
  Form,
  Row,
  Input,
  FormFeedback,
  Button,
} from "reactstrap";
import PageTitle from "../../../components/pageTitle/PageTitle";
import Title from "../../../components/title/Title";
import { IconContext } from "react-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ServerAddress } from "../../../constants/ServerAddress";
import { useSelector, useDispatch } from "react-redux";
import { setToggle } from "../../../store/pagination/Pagination";
import {
  setAlertType,
  setDataExist,
  setShowAlert,
} from "../../../store/alert/Alert";
import toTitleCase from "../../../lib/titleCase/TitleCase";
import ImgModal from "../../../components/crop/ImgModal";


const AddModel = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const accessToken = useSelector((state) => state.authentication.access_token);
  
  
  //Used for date
  const [make_year, setmake_year] = useState("");
  const [make_year_error, setmake_year_error] = useState(false);

  


  // for image ------------
  const [modal, setmodal] = useState(false);
  const [vehicle_img, setvehicle_img] = useState("");
  const [uploaded_img, setuploaded_img] = useState("");
  const [vehicle_img_error, setvehicle_img_error] = useState(false);

  const [model_up, setmodel_up] = useState("");
  const [model_id, setmodel_id] = useState("");

  const [is_updating, setis_updating] = useState(false);


  //This State is used for toggle
  const [circle_btn, setcircle_btn] = useState(true);
  const toggle_circle = () => {
    setcircle_btn(!circle_btn);
  };

  const [circle_btn1, setcircle_btn1] = useState(true);
  const toggle_circle1 = () => {
    setcircle_btn1(!circle_btn1);
  };

  const [circle_btn2, setcircle_btn2] = useState(true);
  const toggle_circle2 = () => {
    setcircle_btn2(!circle_btn2);
  };
  const [circle_btn3, setcircle_btn3] = useState(true);
  const toggle_circle3 = () => {
    setcircle_btn3(!circle_btn3);
  };

  

  //Used for validation
  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      // This should be in small letter or smallcase
      model_name: model_up.model_name || "",
      make: model_up.make || "",
      
      towing_capacity: model_up.towing_capacity || "",
      max_payload: model_up.max_payload || "",
      kmpl_city: model_up.kmpl_city || "",
      kmpl_highway: model_up.kmpl_highway || "",
      kmpl_combined: model_up.kmpl_combined || "",
      kerb_weight: model_up.kerb_weight || "",
      gross_weight: model_up.gross_weight || "",
    },

    validationSchema: Yup.object({
      model_name: Yup.string().required("Model name is required"),
      make: Yup.string().required("Make is required"),

      towing_capacity: Yup.string().required("Towing Capacity is required"),
      max_payload: Yup.string().required("Max Payload is required"),
      kmpl_city: Yup.string().required("KMPL City name is required"),
      kmpl_highway: Yup.string().required("KMPL Highway is required"),
      kmpl_combined: Yup.string().required("KMPL Combined is required"),
      kerb_weight: Yup.string().required("Curb Weight is required"),
      gross_weight: Yup.string().required("Gross Weight is required"),
    }),

    onSubmit: (values) => {
      is_updating ? updateModelData(values) : sendModelData(values);
    },
  });

  //function to send the data
  const sendModelData = (values) => {
    alert("sendModelData----------")
    axios
      .post(
        ServerAddress + "vms/add_vehiclemodel/",
        {
          model_name: toTitleCase(values.model_name).toUpperCase(),
          make: toTitleCase(values.make).toUpperCase(),
          make_year: make_year,

          towing_capacity: values.towing_capacity,
          max_payload: values.max_payload,
          kmpl_city: values.kmpl_city,
          kmpl_highway: values.kmpl_highway,
          kmpl_combined: values.kmpl_combined,
          kerb_weight: values.kerb_weight,
          gross_weight:values.gross_weight,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (response) {
        if (response.data.status === "success") {
          dispatch(setShowAlert(true));
          dispatch(setAlertType("success"));
          dispatch(
            setDataExist(
              `Vehicle Model Added ${values.model_name} Added Sucessfully`
            )
          );
          navigate(-1);
        }
      })
      .catch((error) => {
        alert(`Error Happen while posting raches  Data ${error}`);
      });
  };

  // function to Update Data
  const updateModelData = (values) => {
    alert("updateModelData HISTORY called-----------");
    // let branch_id_list = branch_list2.map((v) => v[0]).filter((v) => v !== null);
    // let branch_ids = [...new Set(branch_id_list.map((v) => `${v}`))].map((v) =>
    //   parseInt(v.split(","))
    // );
    let fields_names = Object.entries({
      // associated_branch:branch_list2,
      gross_weight:values.gross_weight,
      kerb_weight: values.kerb_weight,
      kmpl_city: values.kmpl_city,
      kmpl_combined: values.kmpl_combined,
      kmpl_highway: values.kmpl_highway,
      make: toTitleCase(values.make).toUpperCase(),
      make_year: make_year,
      max_payload: values.max_payload,
      model_name: toTitleCase(values.model_name).toUpperCase(),
      towing_capacity: values.towing_capacity,

    });
    let change_fields = {};
    console.log("fields_names========", fields_names)
    var prom = new Promise((resolve, reject) => {
      for (let j = 0; j < fields_names.length; j++) {
        const ele = fields_names[j];
        let prev = location.state[`${ele[0]}`];
        let new_v = ele[1];
        if (String(prev).toUpperCase() !== String(new_v).toUpperCase()) {
          change_fields[`${ele[0]}`] = new_v.toString().toUpperCase();
        }
        if (j === fields_names.length - 1) resolve();
      }
    });
    prom.then(() => {
    alert("updateModelData----------")
      axios
        .put(
          ServerAddress + "vms/update_vehiclemodel/" + model_id,
          {
            change_fields: change_fields,
            model_name: toTitleCase(values.model_name).toUpperCase(),
            make: toTitleCase(values.make).toUpperCase(),
            make_year: make_year,

            towing_capacity: values.towing_capacity,
            max_payload: values.max_payload,
            kmpl_city: values.kmpl_city,
            kmpl_highway: values.kmpl_highway,
            kmpl_combined: values.kmpl_combined,
            kerb_weight: values.kerb_weight,
            gross_weight: values.gross_weight,            
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then(function (response) {
          console.log("update_vehicle_details response", response.data)
          if (response.data.status === "success") {
            dispatch(setToggle(true));
            dispatch(setShowAlert(true));
            dispatch(
              setDataExist(
                `"${(
                  values.vehicle_number
                )}" Updated sucessfully`
              )
            );
            dispatch(setAlertType("info"));
            navigate(-1);
          } else if (response.data === "duplicate") {
            dispatch(setShowAlert(true));
            dispatch(
              setDataExist(
                `"${(
                  values.vehicle_number
                )}" already exists`
              )
            );
            dispatch(setAlertType("warning"));
          }
        })
        .catch(function () {
          alert("Error Error While Updateing Vehicle");
        });
    });
  };



  useLayoutEffect(() => {
    try {
      let model_loc = location.state.item;
      console.log("model_loc====", model_loc);
      setmodel_up(model_loc);
      setmodel_id(model_loc.id);
      setmake_year(model_loc.make_year);

      setis_updating(true);
    } catch (error) { }
  }, []);

  return (
    <div>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          if (make_year === "") {
            setmake_year_error(true);
          }
          validation.handleSubmit(e.values);
          return false;
        }}
      >
        <div className="mt-3">
          <PageTitle page="Model" />
          <Title title=" Add Model" parent_title="VMS" />
        </div>

        {/*  Vehicle modal*/}
        <div className=" m-3">
          <Col lg={12}>
            <Card className="shadow bg-white rounded">
              <CardTitle className="mb-1 header">
                <div className="header-text-icon header-text">
                  Model
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
                        <Label className="header-child">Model Name:*</Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.model_name || ""}
                          invalid={
                            validation.touched.model_name &&
                              validation.errors.model_name
                              ? true
                              : false
                          }
                          type="text"
                          name="model_name"
                          placeholder="Enter Model Name"
                          className="form-control-md "
                          id="input"
                        />
                        {validation.touched.model_name &&
                          validation.errors.model_name ? (
                          <FormFeedback type="invalid">
                            {validation.errors.model_name}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">Make:*</Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.make || ""}
                          invalid={
                            validation.touched.make && validation.errors.make
                              ? true
                              : false
                          }
                          type="text"
                          name="make"
                          className="form-control-md "
                          id="input"
                          placeholder="Enter Make Name"
                        />
                        {validation.touched.make && validation.errors.make ? (
                          <FormFeedback type="invalid">
                            {validation.errors.make}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className='header-child"'>Make Year</Label>
                        <Input
                          value={make_year}
                          onChange={(val) => {
                            setmake_year(val.target.value);
                          }}
                          onBlur={() => {
                            setmake_year_error(true);
                          }}
                          invalid={make_year === "" && make_year_error}
                          className="form-control-md "
                          id="input"
                          type="date"
                        />
                        {make_year === "" && make_year_error ? (
                          <FormFeedback type="invalid">
                            Make Date is required
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>


                    <ImgModal
                    modal={modal}
                    modal_set={() => {
                      setmodal(false);
                    }}
                    pre_image={vehicle_img ? vehicle_img : ""}
                    upload_image={(val) => {
                      setuploaded_img(val);
                    }}
                    result_image={(val) => {
                      setvehicle_img(val);
                    }}
                  />
                  {(vehicle_img === "" || !vehicle_img) &&
                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2" style={{ position: "relative" }}>
                        <Label>Vehicle Front Image*</Label>
                        <Input
                          style={{ background: "white" }}
                          className="form-control-md"
                          name="logo"
                          // type=""
                          id="input"
                          disabled
                          value={vehicle_img}
                          invalid={vehicle_img_error}
                          onChange={(val) => {
                            setvehicle_img(val.target.value)
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
                          Vehicle Image is required
                        </FormFeedback>
                      </div>
                    </Col>
                  }

                  {vehicle_img && (
                    <Col lg={4} md={4} sm={6}>
                      <Label>Vehicle Front Image*</Label>
                      <div className="mb-3">
                        <img
                          onClick={() => setmodal(true)}
                          src={vehicle_img}
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


                  {/* Side Image */}
                  <ImgModal
                    modal={modal}
                    modal_set={() => {
                      setmodal(false);
                    }}
                    pre_image={vehicle_img ? vehicle_img : ""}
                    upload_image={(val) => {
                      setuploaded_img(val);
                    }}
                    result_image={(val) => {
                      setvehicle_img(val);
                    }}
                  />
                  {(vehicle_img === "" || !vehicle_img) &&
                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2" style={{ position: "relative" }}>
                        <Label>Vehicle Side Image*</Label>
                        <Input
                          style={{ background: "white" }}
                          className="form-control-md"
                          name="logo"
                          // type=""
                          id="input"
                          disabled
                          value={vehicle_img}
                          invalid={vehicle_img_error}
                          onChange={(val) => {
                            setvehicle_img(val.target.value)
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
                          Vehicle Image is required
                        </FormFeedback>
                      </div>
                    </Col>
                  }

                  {vehicle_img && (
                    <Col lg={4} md={4} sm={6}>
                      <Label>Vehicle Side Image*</Label>
                      <div className="mb-3">
                        <img
                          onClick={() => setmodal(true)}
                          src={vehicle_img}
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

                  {/* Back Image */}
                  <ImgModal
                    modal={modal}
                    modal_set={() => {
                      setmodal(false);
                    }}
                    pre_image={vehicle_img ? vehicle_img : ""}
                    upload_image={(val) => {
                      setuploaded_img(val);
                    }}
                    result_image={(val) => {
                      setvehicle_img(val);
                    }}
                  />
                  {(vehicle_img === "" || !vehicle_img) &&
                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2" style={{ position: "relative" }}>
                        <Label>Vehicle Back Image*</Label>
                        <Input
                          style={{ background: "white" }}
                          className="form-control-md"
                          name="logo"
                          // type=""
                          id="input"
                          disabled
                          value={vehicle_img}
                          invalid={vehicle_img_error}
                          onChange={(val) => {
                            setvehicle_img(val.target.value)
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
                          Vehicle Image is required
                        </FormFeedback>
                      </div>
                    </Col>
                  }

                  {vehicle_img && (
                    <Col lg={4} md={4} sm={6}>
                      <Label>Vehicle Back Image*</Label>
                      <div className="mb-3">
                        <img
                          onClick={() => setmodal(true)}
                          src={vehicle_img}
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



        {/*Model Performance*/}
        <div className=" m-3">
          <Col lg={12}>
            <Card className="shadow bg-white rounded">
              <CardTitle className="mb-1 header">
                <div className="header-text-icon header-text">
                  Model Performance
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
                          Towing Capacity:*
                        </Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.towing_capacity || ""}
                          invalid={
                            validation.touched.towing_capacity &&
                              validation.errors.towing_capacity
                              ? true
                              : false
                          }
                          type="number"
                          min={0}
                          name="towing_capacity"
                          className="form-control-md "
                          id="input"
                          placeholder="Enter Towing Capacity"
                        />
                        {validation.touched.towing_capacity &&
                          validation.errors.towing_capacity ? (
                          <FormFeedback type="invalid">
                            {validation.errors.towing_capacity}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className='header-child"'>Max Payload</Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.max_payload || ""}
                          invalid={
                            validation.touched.max_payload &&
                              validation.errors.max_payload
                              ? true
                              : false
                          }
                          className="form-control-md "
                          name="max_payload"
                          id="input"
                          type="number"
                          min={0}
                          placeholder="Enter Max Playload"
                        />
                        {validation.touched.max_payload &&
                          validation.errors.max_payload ? (
                          <FormFeedback type="invalid">
                            {validation.errors.max_payload}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>

                  </Row>
                </CardBody>
              ) : null}
            </Card>
          </Col>
        </div>


        {/*Model Fuel Economy*/}
        <div className=" m-3">
          <Col lg={12}>
            <Card className="shadow bg-white rounded">
              <CardTitle className="mb-1 header">
                <div className="header-text-icon header-text">
                  Model Fuel Economy
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
                        <Label className="header-child">KMPL City</Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.kmpl_city || ""}
                          invalid={
                            validation.touched.kmpl_city &&
                              validation.errors.kmpl_city
                              ? true
                              : false
                          }
                          type="number"
                          min={0}
                          name="kmpl_city"
                          className="form-control-md "
                          id="input"
                          placeholder="Enter KMPL City"
                        />
                        {validation.touched.kmpl_city &&
                          validation.errors.kmpl_city ? (
                          <FormFeedback type="invalid">
                            {validation.errors.kmpl_city}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className='header-child"'>KMPL Highway</Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.kmpl_highway || ""}
                          invalid={
                            validation.touched.kmpl_highway &&
                              validation.errors.kmpl_highway
                              ? true
                              : false
                          }
                          className="form-control-md "
                          name="kmpl_highway"
                          id="input"
                          type="number"
                          min={0}
                          placeholder="Enter KMPL Highway"
                        />
                        {validation.touched.kmpl_highway &&
                          validation.errors.kmpl_highway ? (
                          <FormFeedback type="invalid">
                            {validation.errors.kmpl_highway}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">KMPL Combined</Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.kmpl_combined || ""}
                          invalid={
                            validation.touched.kmpl_combined &&
                              validation.errors.kmpl_combined
                              ? true
                              : false
                          }
                          type="number"
                          min={0}
                          name="kmpl_combined"
                          className="form-control-md "
                          id="input"
                          placeholder="Enter KMPL Combined"
                        />
                        {validation.touched.kmpl_combined &&
                          validation.errors.kmpl_combined ? (
                          <FormFeedback type="invalid">
                            {validation.errors.kmpl_combined}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>



                  </Row>
                </CardBody>
              ) : null}
            </Card>
          </Col>
        </div>

        {/*Model Weight*/}
        <div className=" m-3">
          <Col lg={12}>
            <Card className="shadow bg-white rounded">
              <CardTitle className="mb-1 header">
                <div className="header-text-icon header-text">
                  Model Weight
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
                        <Label className="header-child">Kerb Weight:</Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.kerb_weight || ""}
                          invalid={
                            validation.touched.kerb_weight &&
                              validation.errors.kerb_weight
                              ? true
                              : false
                          }
                          type="number"
                          min={0}
                          name="kerb_weight"
                          className="form-control-md "
                          id="input"
                          placeholder="Enter Curb Weight"
                        />
                        {validation.touched.kerb_weight &&
                          validation.errors.kerb_weight ? (
                          <FormFeedback type="invalid">
                            {validation.errors.kerb_weight}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className='header-child"'>
                          Gross Vehicle Weight Rating:
                        </Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.gross_weight || ""}
                          invalid={
                            validation.touched.gross_weight &&
                              validation.errors.gross_weight
                              ? true
                              : false
                          }
                          className="form-control-md "
                          name="gross_weight"
                          id="input"
                          type="number"
                          min={0}
                          placeholder="Enter Gross Weight"
                        />
                        {validation.touched.gross_weight &&
                          validation.errors.gross_weight ? (
                          <FormFeedback type="invalid">
                            {validation.errors.gross_weight}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>

                  </Row>
                </CardBody>
              ) : null}
            </Card>
          </Col>
        </div>

        {/*Button */}
        <div className=" m-3">
          <Col lg={12}>
            <div className="mb-1 footer_btn">
              <Button type="submit" className="btn btn-info m-1">
                Save
              </Button>

              <Button
                type="button"
                className="btn btn-info m-1 "
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

export default AddModel;
