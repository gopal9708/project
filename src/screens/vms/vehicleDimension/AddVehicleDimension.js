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
import axios from "axios";
import { ServerAddress } from "../../../constants/ServerAddress";
import { useSelector } from "react-redux";

const AddVehicleDimension = () => {
  const accessToken = useSelector((state) => state.authentication.access_token);
  const search = useSelector((state) => state.searchbar.search_item);

  const navigate = useNavigate();
  const [page, setpage] = useState(1);
  const [model_search_item, setmodel_search_item] = useState("");

  // const [model_list, setmodel_list] = useState([]);
  // const [model, setmodel] = useState("");
  const [model_id, setmodel_id] = useState("");
  // console.log("MODEL ID is==",model_id);
  // console.log("MODEL LIST is==",model_list);
  // const [vehicle_model_error, setvehicle_model_error] = useState(false);

  //circle btn
  const [circle_btn, setcircle_btn] = useState(true);
  const toggle_circle = () => {
    setcircle_btn(!circle_btn);
  };

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      // This should be in small letter or smallcase
      width: "",
      height: "",
      length: "",
      interior_volume: "",
      passenger_volume: "",
      cargo_volume: "",
      ground_clearance: "",
      bed_length: "",
    },

    validationSchema: Yup.object({
      width: Yup.string().required("Width is required"),
      height: Yup.string().required("Height is required"),
      length: Yup.string().required("Length is required"),
      interior_volume: Yup.string().required("Interior volume is required"),
      passenger_volume: Yup.string().required("Passenger volume is required"),
      cargo_volume: Yup.string().required("Cargo volume is required"),
      ground_clearance: Yup.string().required("Ground clearance is required"),
      bed_length: Yup.string().required("Bed length is required"),
    }),

    onSubmit: (values) => {
      send_vehicle_dimension(values);
    },
  });

  const send_vehicle_dimension = (values) => {
    axios
      .post(
        ServerAddress + "vms/add_vehicledimension/",
        {
          // vehicle_model: model_id,
          width: values.width,
          height: values.height,
          length: values.length,
          interior_volume: values.interior_volume,
          passenger_volume: values.passenger_volume,
          cargo_volume: values.cargo_volume,
          ground_clearance: values.ground_clearance,
          bed_length: values.bed_length,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (response) {
        console.log("Add Vehicle Dimension Response is ",response);
        if (response.data.status === "success") {
          alert("done");
          navigate(-1);
        }
      })
      .catch((error) => {
        alert(`Error Happen While Posting Vehicle Dimension Data ${error}`);
      });
  };

  // const get_vehicle_model = () => {
  //   let temp = [...model_list];
  //   axios
  //     .get(
  //       ServerAddress +
  //         `vms/get_vehiclemodel/?p=${page}&records=${10}&name=${[
  //           "",
  //         ]}&model_name_search=${model_search_item}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       }
  //     )
  //     .then(function (response) {
  //       console.log("get_vehicle_model response is==",response.data);
  //       let data = response.data.results;
  //       // setmodel_id(data.id)
  //       for (let index = 0; index < data.length; index++) {
  //         temp.push([data[index].id, data[index].model_name]);
  //       }
  //       temp = [...new Set(temp.map((v) => `${v}`))].map((v) => v.split(","));
  //       setmodel_list(temp);
  //     })
  //     .catch((error) => {
  //       alert(`Error occured while Gettting Data ${error}`);
  //     });
  // };

  // useLayoutEffect(() => {
  //   get_vehicle_model();
  // }, [page, model_search_item]);

  return (
    <div>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          // if (model == "") {
          //   setvehicle_model_error(true);
          // }
          validation.handleSubmit(e.values);
          return false;
        }}
      >
        <div className="mt-3">
          <PageTitle page=" Vehicle Dimension" />
          <Title title=" Add Vehicle Dimension" parent_title="Vms" />
        </div>

        {/*  Vehicle dimension*/}
        <div className=" m-3">
          <Col lg={12}>
            <Card className="shadow bg-white rounded">
              <CardTitle className="mb-1 header">
                <div className="header-text-icon header-text">
                  Vehicle Dimension
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
                        <Label className="header-child">Model Name:</Label>
                        <SearchInput
                          data_list={model_list}
                          setdata_list={setmodel_list}
                          data_item_s={model}
                          set_data_item_s={setmodel}
                          set_id={setmodel_id}
                          error_message={"Please Select Vehicle Model"}
                          page={page}
                          setpage={setpage}
                          // error_s={vehicle_model_error}
                          setsearch_item={setmodel_search_item}
                        />
                      </div>
                    </Col> */}

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header_child">Length:</Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.length || ""}
                          invalid={
                            validation.touched.length &&
                            validation.errors.length
                              ? true
                              : false
                          }
                          className="form-control-md "
                          name="length"
                          id="input"
                          type="number"
                          min={0}
                          placeholder="Enter Length"
                        />
                        {validation.touched.length &&
                        validation.errors.length ? (
                          <FormFeedback type="invalid">
                            {validation.errors.length}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">Width:</Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.width || ""}
                          invalid={
                            validation.touched.width && validation.errors.width
                              ? true
                              : false
                          }
                          type="number"
                          min={0}
                          name="width"
                          className="form-control-md "
                          id="input"
                          placeholder="Enter Width"
                        />
                        {validation.touched.width && validation.errors.width ? (
                          <FormFeedback type="invalid">
                            {validation.errors.width}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className='header-child"'>Height:</Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.height || ""}
                          invalid={
                            validation.touched.height &&
                            validation.errors.height
                              ? true
                              : false
                          }
                          className="form-control-md "
                          name="height"
                          id="input"
                          type="number"
                          min={0}
                          placeholder="Enter Height"
                        />
                        {validation.touched.height &&
                        validation.errors.height ? (
                          <FormFeedback type="invalid">
                            {validation.errors.height}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">Interior Volume:</Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.interior_volume || ""}
                          invalid={
                            validation.touched.interior_volume &&
                            validation.errors.interior_volume
                              ? true
                              : false
                          }
                          className="form-control-md "
                          name="interior_volume"
                          id="input"
                          type="number"
                          min={0}
                          placeholder="Enter Interior Volume"
                        />
                        {validation.touched.interior_volume &&
                        validation.errors.interior_volume ? (
                          <FormFeedback type="invalid">
                            {validation.errors.interior_volume}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">
                          Passenger Volume:
                        </Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.passenger_volume || ""}
                          invalid={
                            validation.touched.passenger_volume &&
                            validation.errors.passenger_volume
                              ? true
                              : false
                          }
                          className="form-control-md "
                          name="passenger_volume"
                          id="input"
                          type="number"
                          min={0}
                          placeholder="Enter Passenger Volume"
                        />
                        {validation.touched.passenger_volume &&
                        validation.errors.passenger_volume ? (
                          <FormFeedback type="invalid">
                            {validation.errors.passenger_volume}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">Cargo Volume:</Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.cargo_volume || ""}
                          invalid={
                            validation.touched.cargo_volume &&
                            validation.errors.cargo_volume
                              ? true
                              : false
                          }
                          className="form-control-md "
                          name="cargo_volume"
                          id="input"
                          type="number"
                          min={0}
                          placeholder="Enter Cargo Volume"
                        />
                        {validation.touched.cargo_volume &&
                        validation.errors.cargo_volume ? (
                          <FormFeedback type="invalid">
                            {validation.errors.cargo_volume}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">
                          Ground Clearance:
                        </Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.ground_clearance || ""}
                          invalid={
                            validation.touched.ground_clearance &&
                            validation.errors.ground_clearance
                              ? true
                              : false
                          }
                          className="form-control-md "
                          name="ground_clearance"
                          id="input"
                          type="number"
                          min={0}
                          placeholder="Enter Ground Clearance"
                        />
                        {validation.touched.ground_clearance &&
                        validation.errors.ground_clearance ? (
                          <FormFeedback type="invalid">
                            {validation.errors.ground_clearance}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">Bed Length:</Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.bed_length || ""}
                          invalid={
                            validation.touched.bed_length &&
                            validation.errors.bed_length
                              ? true
                              : false
                          }
                          className="form-control-md "
                          name="bed_length"
                          id="input"
                          type="number"
                          min={0}
                          placeholder="Enter Bed Length"
                        />
                        {validation.touched.bed_length &&
                        validation.errors.bed_length ? (
                          <FormFeedback type="invalid">
                            {validation.errors.bed_length}
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

export default AddVehicleDimension;
