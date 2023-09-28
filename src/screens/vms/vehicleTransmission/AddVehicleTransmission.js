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

const AddVehicleTransmission = () => {
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
      transmission_description: "",
      transmission_brand: "",
      transmission_gears: "",
    },

    validationSchema: Yup.object({
      transmission_description: Yup.string().required(
        "Transmission Description is required"
      ),
      transmission_brand: Yup.string().required(
        "Transmission Brand is required"
      ),
      transmission_gears: Yup.string().required(
        "Transmission Gears is required"
      ),
    }),

    onSubmit: (values) => {
      send_engine_data(values);
      //   send_engine_data(values);
    },
  });

  const [page, setpage] = useState(1);
  const search = useSelector((state) => state.searchbar.search_item);

  //--------------
  const [model_search_item, setmodel_search_item] = useState("");
  const [model_list, setmodel_list] = useState([]);
  const [model, setmodel] = useState("");
  const [model_id, setmodel_id] = useState("");

  const [transmission_type, settransmission_type] = useState("");
  const [transmission_type_list, settransmission_type_list] = useState([
    "AUTOMATIC",
    "MANUAL",
  ]);

  const send_engine_data = (values) => {
    axios
      .post(
        ServerAddress + "vms/add_vehiclemodel-transmission/",
        {
          vehicle: model_id,
          transmission_description: values.transmission_description,
          transmission_brand: values.transmission_brand,
          transmission_type: transmission_type,
          transmission_gears: values.transmission_gears,
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
            setDataExist(`Vehicle Engine Added ${model} Added Sucessfully`)
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
          validation.handleSubmit(e.values);
          return false;
        }}
      >
        <div className="mt-3">
          <PageTitle page=" Vehicle Transmission" />
          <Title title=" Add Vehicle Transmission" parent_title="Vms" />
        </div>

        {/*  Vehicle modal*/}
        <div className=" m-3">
          <Col lg={12}>
            <Card className="shadow bg-white rounded">
              <CardTitle className="mb-1 header">
                <div className="header-text-icon header-text">
                  Vehicle Transmission
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
                          // error_s={vehicle_model_error}
                        />
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">
                          Transmission Description:
                        </Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={
                            validation.values.transmission_description || ""
                          }
                          invalid={
                            validation.touched.transmission_description &&
                            validation.errors.transmission_description
                              ? true
                              : false
                          }
                          type="text"
                          name="transmission_description"
                          className="form-control-md "
                          id="input"
                          placeholder="Enter Transmission Description"
                        />
                        {validation.touched.transmission_description &&
                        validation.errors.transmission_description ? (
                          <FormFeedback type="invalid">
                            {validation.errors.transmission_description}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className='header-child"'>
                          Transmission Brand:
                        </Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.transmission_brand || ""}
                          invalid={
                            validation.touched.transmission_brand &&
                            validation.errors.transmission_brand
                              ? true
                              : false
                          }
                          className="form-control-md "
                          name="transmission_brand"
                          id="input"
                          type="text"
                          placeholder="Enter Transmition Brand"
                        />
                        {validation.touched.transmission_brand &&
                        validation.errors.transmission_brand ? (
                          <FormFeedback type="invalid">
                            {validation.errors.transmission_brand}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header_child">
                          Transmission Type:
                        </Label>
                        <NSearchInput
                          data_list={transmission_type_list}
                          data_item_s={transmission_type}
                          set_data_item_s={settransmission_type}
                        />
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">
                          Transmission Gears:
                        </Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.transmission_gears || ""}
                          invalid={
                            validation.touched.transmission_gears &&
                            validation.errors.transmission_gears
                              ? true
                              : false
                          }
                          type="number"
                          min={0}
                          name="transmission_gears"
                          className="form-control-md "
                          id="input"
                          placeholder="Enter Transmission Gears"
                        />
                        {validation.touched.transmission_gears &&
                        validation.errors.transmission_gears ? (
                          <FormFeedback type="invalid">
                            {validation.errors.transmission_gears}
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

export default AddVehicleTransmission;
