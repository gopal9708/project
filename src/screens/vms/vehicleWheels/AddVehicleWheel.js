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
} from "reactstrap";
import PageTitle from "../../../components/pageTitle/PageTitle";
import Title from "../../../components/title/Title";
import { IconContext } from "react-icons";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import SearchInput from "../../../components/formComponent/searchInput/SearchInput";
import NSearchInput from "../../../components/formComponent/nsearchInput/NSearchInput";
import axios from "axios";
import { ServerAddress } from "../../../constants/ServerAddress";
import { useSelector, useDispatch } from "react-redux";
import {
  setShowAlert,
  setDataExist,
  setAlertType,
} from "../../../store/alert/Alert";

const AddVehicleWheel = () => {
  const accessToken = useSelector((state) => state.authentication.access_token);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [circle_btn, setcircle_btn] = useState(true);
  const toggle_circle = () => {
    setcircle_btn(!circle_btn);
  };

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      // This should be in small letter or smallcase
      wheelbase: "",
      front_wheel_diameter: "",
      rear_wheel_diameter: "",
    },

    validationSchema: Yup.object({
      wheelbase: Yup.string().required("Wheelbase  is required"),
      front_wheel_diameter: Yup.string().required(
        "Front Wheel Diameter is required"
      ),
      rear_wheel_diameter: Yup.string().required("Rear Wheel is required"),
    }),

    onSubmit: (values) => {
      send_wheel_data(values);
      //   send_engine_data(values);
    },
  });

  //--------------
  const [page, setpage] = useState(1);

  const [model_search_item, setmodel_search_item] = useState("");
  const [model_list, setmodel_list] = useState([]);
  const [model, setmodel] = useState("");
  const [model_id, setmodel_id] = useState("");
  const [model_error, setmodel_error] = useState(false);

  const [driver_type, setdriver_type] = useState("");
  const [driver_type_error, setdriver_type_error] = useState(false);
  const [driver_type_list, setdriver_type_list] = useState([
    "4*4",
    "^*4",
    "FWD",
    "RWD",
  ]);

  const [brake_system, setbrake_system] = useState("");
  const [brake_type_error, setbrake_type_error] = useState(false);
  const [brake_system_list, setbrake_system_list] = useState([
    "AIR",
    "HYDRAULIC",
  ]);

  const send_wheel_data = (values) => {
    axios
      .post(
        ServerAddress + "vms/add_vehiclemodel-wheelstire/",
        {
          vehicle: model_id,
          driver_type: driver_type,
          brake_system: brake_system,
          wheelbase: values.wheelbase,
          front_wheel_diameter: values.front_wheel_diameter,
          rear_wheel_diameter: values.rear_wheel_diameter,
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
            setDataExist(`Vehicle Wheel Added ${model} Added Sucessfully`)
          );
          navigate(-1);
        }
      })
      .catch((error) => {
        alert(`Error Happen while posting raches  Data ${error}`);
      });
  };

  const get_vehicle_model = () => {
    let temp = [...model_list];
    axios
      .get(
        ServerAddress +
          `vms/get_vehiclemodel/?p=${page}&records=${10}&name=${[
            "",
          ]}&model_name_search=${model_search_item}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (response) {
        let data = response.data.results;
        for (let index = 0; index < data.length; index++) {
          temp.push([data[index].id, data[index].model_name]);
        }
        temp = [...new Set(temp.map((v) => `${v}`))].map((v) => v.split(","));
        setmodel_list(temp);
      })
      .catch((error) => {
        alert(`Error occured while Gettting Data ${error}`);
      });
  };

  useLayoutEffect(() => {
    get_vehicle_model();
  }, [page, model_search_item]);

  return (
    <div>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          if (model == "") {
            setmodel_error(true);
          }
          if (driver_type == "") {
            setdriver_type_error(true);
          }
          if (brake_system == "") {
            setbrake_type_error(true);
          }
          validation.handleSubmit(e.values);
          return false;
        }}
      >
        <div className="mt-3">
          <PageTitle page=" Vehicle Wheels" />
          <Title title=" Add Wheels & Tires" parent_title="Vms" />
        </div>

        {/*  Vehicle wheels*/}
        <div className=" m-3">
          <Col lg={12}>
            <Card className="shadow bg-white rounded">
              <CardTitle className="mb-1 header">
                <div className="header-text-icon header-text">
                  Vehicle Wheels & Tires
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
                        <Label className="header-child">Vehicle:</Label>
                        <SearchInput
                          data_list={model_list}
                          setdata_list={setmodel_list}
                          data_item_s={model}
                          set_data_item_s={setmodel}
                          set_id={setmodel_id}
                          page={page}
                          setpage={setpage}
                          error_message={"Please Select Vehicle MOdel"}
                          setsearch_item={setmodel_search_item}
                          //   error_s={model_error}
                        />
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">Drive Type:</Label>
                        <NSearchInput
                          data_list={driver_type_list}
                          data_item_s={driver_type}
                          set_data_item_s={setdriver_type}
                          error_message={"Please Select Driver Type"}
                          error_s={driver_type_error}
                        />
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className='header-child"'>Brake System:</Label>
                        <NSearchInput
                          data_list={brake_system_list}
                          data_item_s={brake_system}
                          set_data_item_s={setbrake_system}
                          error_message={"Please Select Brake System"}
                          error_s={brake_type_error}
                        />
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">Wheelbase:</Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.wheelbase || ""}
                          invalid={
                            validation.touched.wheelbase &&
                            validation.errors.wheelbase
                              ? true
                              : false
                          }
                          type="number"
                          min={0}
                          name="wheelbase"
                          className="form-control-md "
                          id="input"
                          placeholder="Enter Wheelbase"
                        />
                        {validation.touched.wheelbase &&
                        validation.errors.wheelbase ? (
                          <FormFeedback type="invalid">
                            {validation.errors.wheelbase}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">
                          Front Wheel Diameter:
                        </Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.front_wheel_diameter || ""}
                          invalid={
                            validation.touched.front_wheel_diameter &&
                            validation.errors.front_wheel_diameter
                              ? true
                              : false
                          }
                          type="number"
                          min={0}
                          name="front_wheel_diameter"
                          className="form-control-md "
                          id="input"
                          placeholder="Enter Front Wheel Diameter"
                        />
                        {validation.touched.front_wheel_diameter &&
                        validation.errors.front_wheel_diameter ? (
                          <FormFeedback type="invalid">
                            {validation.errors.front_wheel_diameter}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">
                          Rear Wheel Diameter:
                        </Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.rear_wheel_diameter || ""}
                          invalid={
                            validation.touched.rear_wheel_diameter &&
                            validation.errors.rear_wheel_diameter
                              ? true
                              : false
                          }
                          type="number"
                          min={0}
                          name="rear_wheel_diameter"
                          className="form-control-md "
                          id="input"
                          placeholder="Enter Rear Wheel Diameter"
                        />
                        {validation.touched.rear_wheel_diameter &&
                        validation.errors.rear_wheel_diameter ? (
                          <FormFeedback type="invalid">
                            {validation.errors.rear_wheel_diameter}
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
              <button type="submit" className="btn btn-info m-1">
                Save
              </button>

              <button
                type="submit"
                className="btn btn-info m-1 "
                onClick={() => navigate(-1)}
              >
                Cancel
              </button>
            </div>
          </Col>
        </div>
      </Form>
    </div>
  );
};

export default AddVehicleWheel;
