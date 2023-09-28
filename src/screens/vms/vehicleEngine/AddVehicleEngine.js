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

const AddVehicleEngine = () => {
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
      engine_summary: "",
      engine_brand: "",
      bore: "",
      compression: "",
      cylinders: "",
      displacement: "",
    },

    validationSchema: Yup.object({
      engine_summary: Yup.string().required("Engine Summary is required"),
      engine_brand: Yup.string().required("Engine Brand is required"),
      bore: Yup.string().required("Bore is required"),
      compression: Yup.string().required("Compression is required"),
      cylinders: Yup.string().required("Clinders is required"),
      displacement: Yup.string().required("Displacement is required"),
    }),

    onSubmit: (values) => {
      send_engine_data(values);
    },
  });

  const [page, setpage] = useState(1);
  const search = useSelector((state) => state.searchbar.search_item);

  //--------------
  const [model_list, setmodel_list] = useState([]);
  const [model, setmodel] = useState("");
  // const [model_id, setmodel_id] = useState("");
  // console.log("MODEL LIST==",model_list);
  // console.log("MODEL ID==",model_id);
  const [model_search_item, setmodel_search_item] = useState("");

  const [aspiration, setaspiration] = useState("");
  const [aspiration_list, setaspiration_list] = useState([
    "NATURALLY ASPIRATION",
    "TURBOCHARGER",
    "TWIN TURBOCHARGER",
  ]);

  const [bloack_type, setbloack_type] = useState("");
  const [bloack_type_list, setbloack_type_list] = useState(["INLINE", "V"]);

  const [cam_type, setcam_type] = useState("");
  const [cam_type_list, setcam_type_list] = useState(["OHV", "DOHC"]);

  const send_engine_data = (values) => {
    axios
      .post(
        ServerAddress + "vms/add_vehicleengine/",
        {
          // vehicle_model: model_id,
          engine_summary: values.engine_summary,
          engine_brand: values.engine_brand,
          aspiration: aspiration,
          block_type: bloack_type,
          bore: values.bore,
          cam_type: cam_type,
          compression: values.compression,
          cylinders: values.cylinders,
          displacement: values.displacement,
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
  //       let data = response.data.results;
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
          validation.handleSubmit(e.values);
          return false;
        }}
      >
        <div className="mt-3">
          <PageTitle page="Engine" />
          <Title title=" Add Engine" parent_title="Vms" />
        </div>

        {/*  Vehicle modal*/}
        <div className=" m-3">
          <Col lg={12}>
            <Card className="shadow bg-white rounded">
              <CardTitle className="mb-1 header">
                <div className="header-text-icon header-text">
                  Vehicle Engine
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
                          page={page}
                          setpage={setpage}
                          error_message={"Please Select Vehicle MOdel"}
                          setsearch_item={setmodel_search_item}
                          // error_s={vehicle_model_error}
                        />
                      </div>
                    </Col> */}

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">Engine Summary:*</Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.engine_summary || ""}
                          invalid={
                            validation.touched.engine_summary &&
                            validation.errors.engine_summary
                              ? true
                              : false
                          }
                          type="text"
                          name="engine_summary"
                          className="form-control-md "
                          id="input"
                          placeholder="Enter Engine Summary"
                        />
                        {validation.touched.engine_summary &&
                        validation.errors.engine_summary ? (
                          <FormFeedback type="invalid">
                            {validation.errors.engine_summary}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className='header-child"'>Engine Brand:</Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.engine_brand || ""}
                          invalid={
                            validation.touched.engine_brand &&
                            validation.errors.engine_brand
                              ? true
                              : false
                          }
                          className="form-control-md "
                          name="engine_brand"
                          id="input"
                          type="text"
                          placeholder="Enter Engine Brand"
                        />
                        {validation.touched.engine_brand &&
                        validation.errors.engine_brand ? (
                          <FormFeedback type="invalid">
                            {validation.errors.engine_brand}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header_child">Aspiration</Label>
                        <NSearchInput
                          data_list={aspiration_list}
                          data_item_s={aspiration}
                          set_data_item_s={setaspiration}
                        />
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">Block Type</Label>
                        <NSearchInput
                          data_list={bloack_type_list}
                          data_item_s={bloack_type}
                          set_data_item_s={setbloack_type}
                        />
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">Bore:</Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.bore || ""}
                          invalid={
                            validation.touched.bore && validation.errors.bore
                              ? true
                              : false
                          }
                          className="form-control-md "
                          name="bore"
                          id="input"
                          type="number"
                          min={0}
                        />
                        {validation.touched.bore && validation.errors.bore ? (
                          <FormFeedback type="invalid">
                            {validation.errors.bore}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">Cam Type:</Label>
                        <NSearchInput
                          data_list={cam_type_list}
                          data_item_s={cam_type}
                          set_data_item_s={setcam_type}
                        />
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">Compression:</Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.compression || ""}
                          invalid={
                            validation.touched.compression &&
                            validation.errors.compression
                              ? true
                              : false
                          }
                          className="form-control-md "
                          name="compression"
                          id="input"
                          type="number"
                          min={0}
                        />
                        {validation.touched.compression &&
                        validation.errors.compression ? (
                          <FormFeedback type="invalid">
                            {validation.errors.compression}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">Cylinders:</Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.cylinders || ""}
                          invalid={
                            validation.touched.cylinders &&
                            validation.errors.cylinders
                              ? true
                              : false
                          }
                          className="form-control-md "
                          name="cylinders"
                          id="input"
                          type="number"
                          min={0}
                        />
                        {validation.touched.cylinders &&
                        validation.errors.cylinders ? (
                          <FormFeedback type="invalid">
                            {validation.errors.cylinders}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header_child">Displacement</Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.displacement || ""}
                          invalid={
                            validation.touched.displacement &&
                            validation.errors.displacement
                              ? true
                              : false
                          }
                          className="form-control-md "
                          name="displacement"
                          id="input"
                          type="number"
                          min={0}
                        />
                        {validation.touched.displacement &&
                        validation.errors.displacement ? (
                          <FormFeedback type="invalid">
                            {validation.errors.displacement}
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

export default AddVehicleEngine;
