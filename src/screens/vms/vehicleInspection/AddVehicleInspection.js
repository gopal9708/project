import React, { useState, useLayoutEffect } from "react";
import {
  MdAddCircleOutline,
  MdLocationSearching,
  MdRemoveCircleOutline,
} from "react-icons/md";
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
import axios from "axios";
import { ServerAddress } from "../../../constants/ServerAddress";
import { useSelector, useDispatch } from "react-redux";
import {
  setShowAlert,
  setAlertType,
  setDataExist,
} from "../../../store/alert/Alert";
import NSearchInput from "../../../components/formComponent/nsearchInput/NSearchInput";

const AddVehicleInspection = () => {
  const accessToken = useSelector((state) => state.authentication.access_token);
  const search = useSelector((state) => state.searchbar.search_item);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [page, setpage] = useState(1);
  const [search_vehicle_reg_no, setsearch_vehicle_reg_no] = useState("");

  //circle btn
  const [circle_btn, setcircle_btn] = useState(true);
  const toggle_circle = () => {
    setcircle_btn(!circle_btn);
  };

  // const [vehicle_reg_no_list, setvehicle_reg_no_list] = useState([]);
  // const [vehicle_reg_no, setvehicle_reg_no] = useState("");
  // const [vehicle_reg_no_id, setvehicle_reg_no_id] = useState("");
  // const [vehicle_reg_no_error, setvehicle_reg_no_error] = useState(false);

  const [engine, setengine] = useState("");
  const [pass_fail_list, setpass_fail_list] = useState(["PASS", "FAIL"]);

  const [fuel_level, setfuel_level] = useState("");
  const [fuel_level_list, setfuel_level_list] = useState([
    "FULL",
    "3/4",
    "1/2",
    "1/4",
    "EMPTY",
  ]);

  const [transmission, settransmission] = useState("");
  const [clutch, setclutch] = useState("");
  const [steering_mechanism, setsteering_mechanism] = useState("");
  const [horn, sethorn] = useState("");
  const [windshield, setwindshield] = useState("");
  const [wipers_washer, setwipers_washer] = useState("");
  const [rear_mirror, setrear_mirror] = useState("");
  const [lighting_reflector, setlighting_reflector] = useState("");
  const [parking_brake, setparking_brake] = useState("");
  const [service_brakes, setservice_brakes] = useState("");
  const [coupling_devices, setcoupling_devices] = useState("");
  const [tires, settires] = useState("");
  const [wheels, setwheels] = useState("");
  const [emergency, setemergency] = useState("");

  const [vehicle_condition, setvehicle_condition] = useState("");
  const [vehicle_condition_list, setvehicle_condition_list] = useState([
    "EXCELLENT",
    "HAVE ISSUE BUT SAFE TO OPERATE",
    "NO SAFE TO OPERATE",
  ]);

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      // This should be in small letter or smallcase
      odometer_reading: "",
      oil_life_left: "",
      remark: "",
    },

    validationSchema: Yup.object({
      odometer_reading: Yup.string().required("Odometer Reading is required"),
      oil_life_left: Yup.string().required("Oli Life Left is required"),
    }),

    onSubmit: (values) => {
      //   send_vehicle_model_fuel_eco(values);
    },
  });

  //   const send_vehicle_model_fuel_eco = (values) => {
  //     axios
  //       .post(
  //         ServerAddress + "vms/add_vehiclefueleconomy/",
  //         {
  //           vehicle: model_id,
  //           kmpl_city: values.kmpl_city,
  //           kmpl_highway: values.kmpl_highway,
  //           kmpl_combined: values.kmpl_combined,
  //         },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${accessToken}`,
  //           },
  //         }
  //       )
  //       .then(function (response) {
  //         if (response.data.status === "success") {
  //           dispatch(setShowAlert(true));
  //           dispatch(setAlertType("success"));
  //           dispatch(setDataExist(`${model} Fuel Economy Added Successfully`));
  //           navigate(-1);
  //         }
  //       })
  //       .catch((error) => {
  //         alert(
  //           `Error Happen While Posting Vehicle Model Fuel Economy Data ${error}`
  //         );
  //       });
  //   };

  // const get_vehicle_reg_no = () => {
  //   let temp = [...vehicle_reg_no_list];
  //   axios
  //     .get(
  //       ServerAddress +
  //         `vms/get_vehicle/?p=${page}&records=${10}&name=${[
  //           "",
  //         ]}&model_name_search=${search_vehicle_reg_no}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       }
  //     )
  //     .then(function (response) {
  //       let data = response.data.results;
  //       for (let index = 0; index < data.length; index++) {
  //         temp.push([data[index].id, data[index].registeration_no]);
  //       }
  //       temp = [...new Set(temp.map((v) => `${v}`))].map((v) => v.split(","));
  //       setvehicle_reg_no_list(temp);
  //     })
  //     .catch((error) => {
  //       alert(`Error occured while Gettting Data ${error}`);
  //     });
  // };

  // useLayoutEffect(() => {
  //   get_vehicle_reg_no();
  // }, [page, search_vehicle_reg_no]);

  return (
    <div>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          // if (vehicle_reg_no == "") {
          //   setvehicle_reg_no_error(true);
          // }
          validation.handleSubmit(e.values);
          return false;
        }}
      >
        <div className="mt-3">
          <PageTitle page="Vehicle Inspection" />
          <Title title="Add vehicle inspection" parent_title="Vms" />
        </div>

        {/* modal preformance*/}
        <div className=" m-3">
          <Col lg={12}>
            <Card className="shadow bg-white rounded">
              <CardTitle className="mb-1 header">
                <div className="header-text-icon header-text">
                  Vehicle Inspection
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

                    {/* <Col lg={4} md={6} sm={6}>
                      <div className="mb-3">
                        <Label className="header-child">Model Name : *</Label>
                        <SearchInput
                          data_list={vehicle_reg_no_list}
                          setdata_list={setvehicle_reg_no_list}
                          data_item_s={vehicle_reg_no}
                          set_data_item_s={setvehicle_reg_no}
                          set_id={setvehicle_reg_no_id}
                          page={page}
                          setpage={setpage}
                          error_message={"Please Select vehicle Model"}
                          error_s={vehicle_reg_no_error}
                          setsearch_item={setsearch_vehicle_reg_no}
                        />
                      </div>
                    </Col> */}

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">
                          Odometer Reading:
                        </Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.odometer_reading || ""}
                          invalid={
                            validation.touched.odometer_reading &&
                            validation.errors.odometer_reading
                              ? true
                              : false
                          }
                          type="number"
                          min={0}
                          name="odometer_reading"
                          className="form-control-md "
                          id="input"
                          placeholder="Enter Odometer Reading"
                        />
                        {validation.touched.odometer_reading &&
                        validation.errors.odometer_reading ? (
                          <FormFeedback type="invalid">
                            {validation.errors.odometer_reading}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">Oil Life Left:</Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          values={validation.values.oil_life_left || ""}
                          invalid={
                            validation.touched.oil_life_left &&
                            validation.errors.oil_life_left
                              ? true
                              : false
                          }
                          type="text"
                          name="oil_life_left"
                          className="form-control-md "
                          id="input"
                          placeholder="Enter Oil Life Left"
                        />
                        {validation.touched.oil_life_left &&
                        validation.errors.oil_life_left ? (
                          <FormFeedback type="invalid">
                            {validation.errors.oil_life_left}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className='header-child"'>
                          Meter Entry Photo Verification:
                        </Label>
                        <Input
                          className="form-control-md "
                          id="input"
                          type="file"
                        />
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className='header-child"'>
                          Interior Cleanliness:
                        </Label>
                        <Input
                          className="form-control-md "
                          id="input"
                          type="file"
                        />
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">
                          Reviewing Driver Signature:
                        </Label>
                        <Input
                          className="form-control-md "
                          id="input"
                          type="file"
                        />
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">Remarks:</Label>
                        <Input
                          onChange={validation.handleChange}
                          value={validation.values.remark || ""}
                          type="text"
                          name="remark"
                          className="form-control-md "
                          id="input"
                          placeholder="Enter Remark"
                        />
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">Engine</Label>
                        <NSearchInput
                          data_list={pass_fail_list}
                          data_item_s={engine}
                          set_data_item_s={setengine}
                        />
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">Fuel Level:</Label>
                        <NSearchInput
                          data_list={fuel_level_list}
                          data_item_s={fuel_level}
                          set_data_item_s={setfuel_level}
                        />
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">Transmission:</Label>
                        <NSearchInput
                          data_list={pass_fail_list}
                          data_item_s={transmission}
                          set_data_item_s={settransmission}
                        />
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">Clutch:</Label>
                        <NSearchInput
                          data_list={pass_fail_list}
                          data_item_s={clutch}
                          set_data_item_s={setclutch}
                        />
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">
                          Steering Mechanism:
                        </Label>
                        <NSearchInput
                          data_list={pass_fail_list}
                          data_item_s={steering_mechanism}
                          set_data_item_s={setsteering_mechanism}
                        />
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">Horn:</Label>
                        <NSearchInput
                          data_list={pass_fail_list}
                          data_item_s={horn}
                          set_data_item_s={sethorn}
                        />
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">Windshield:</Label>
                        <NSearchInput
                          data_list={pass_fail_list}
                          data_item_s={windshield}
                          set_data_item_s={setwindshield}
                        />
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header_child">Wipers/Washers:</Label>
                        <NSearchInput
                          data_list={pass_fail_list}
                          data_item_s={wipers_washer}
                          set_data_item_s={setwipers_washer}
                        />
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">
                          Rear Vision Mirrors:
                        </Label>
                        <NSearchInput
                          data_list={pass_fail_list}
                          data_item_s={rear_mirror}
                          set_data_item_s={setrear_mirror}
                        />
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header_child">
                          Lighting Devices and Reflectors:
                        </Label>
                        <NSearchInput
                          data_list={pass_fail_list}
                          data_item_s={lighting_reflector}
                          set_data_item_s={setlighting_reflector}
                        />
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">Parking Brake:</Label>
                        <NSearchInput
                          data_list={pass_fail_list}
                          data_item_s={parking_brake}
                          set_data_item_s={setparking_brake}
                        />
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">Service Brakes:</Label>
                        <NSearchInput
                          data_list={pass_fail_list}
                          data_item_s={service_brakes}
                          set_data_item_s={setservice_brakes}
                        />
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">
                          Coupling Devices:
                        </Label>
                        <NSearchInput
                          data_list={pass_fail_list}
                          data_item_s={coupling_devices}
                          set_data_item_s={setcoupling_devices}
                        />
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">Tires:</Label>
                        <NSearchInput
                          data_list={pass_fail_list}
                          data_item_s={tires}
                          set_data_item_s={settires}
                        />
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">Wheels and Rims:</Label>
                        <NSearchInput
                          data_list={pass_fail_list}
                          data_item_s={wheels}
                          set_data_item_s={setwheels}
                        />
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">
                          Emergency Equipment:
                        </Label>
                        <NSearchInput
                          data_list={pass_fail_list}
                          data_item_s={emergency}
                          set_data_item_s={setemergency}
                        />
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">
                          Vehicle Condition OK:
                        </Label>
                        <NSearchInput
                          data_list={vehicle_condition_list}
                          data_item_s={vehicle_condition}
                          set_data_item_s={setvehicle_condition}
                        />
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

export default AddVehicleInspection;
