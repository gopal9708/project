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
import { useSelector, useDispatch } from "react-redux";
import {
  setAlertType,
  setDataExist,
  setShowAlert,
} from "../../../store/alert/Alert";

const AddModelPerformance = () => {
  const accessToken = useSelector((state) => state.authentication.access_token);
  const search = useSelector((state) => state.searchbar.search_item);

  const [page, setpage] = useState(1);
  const [model_search_item, setmodel_search_item] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [circle_btn, setcircle_btn] = useState(true);
  const toggle_circle = () => {
    setcircle_btn(!circle_btn);
  };

  const [model_list, setmodel_list] = useState([]);
  const [model, setmodel] = useState("");
  const [model_id, setmodel_id] = useState("");
  const [vehicle_model_error, setvehicle_model_error] = useState(false);

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      // This should be in small letter or smallcase
      towing_capacity: "",
      max_payload: "",
    },

    validationSchema: Yup.object({
      towing_capacity: Yup.string().required("Towing Capacity is required"),
      max_payload: Yup.string().required("Max Payload is required"),
    }),

    onSubmit: (values) => {
      send_vehicle_model_performence(values);
    },
  });

  const send_vehicle_model_performence = (values) => {
    axios
      .post(
        ServerAddress + "vms/add_modelperformance/",
        {
          vehicle_model: model_id,
          towing_capacity: values.towing_capacity,
          max_payload: values.max_payload,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (response) {
        console.log("ADD MODEL PERFORMANCE response is==",response);
        if (response.data.status === "success") {
          dispatch(setShowAlert(true));
          dispatch(setAlertType("success"));
          dispatch(
            setDataExist(`Vehicle Model ${model} Performance Added Sucessfully`)
          );
          navigate(-1);
        }
      })
      .catch((error) => {
        alert(
          `Error Happen While Posting Vehicle Model Performance Data ${error}`
        );
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
            setvehicle_model_error(true);
          }
          validation.handleSubmit(e.values);
          return false;
        }}
      >
        <div className="mt-3">
          <PageTitle page=" Vehicle Model Performance" />
          <Title title=" Add Model Performance" parent_title="Vms" />
        </div>

        {/*Vehicle modal preformance*/}
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
                      <div className="mb-3">
                        <Label className="header-child">Vehicle:*</Label>
                        <SearchInput
                          data_list={model_list}
                          setdata_list={setmodel_list}
                          data_item_s={model}
                          set_data_item_s={setmodel}
                          set_id={setmodel_id}
                          page={page}
                          setpage={setpage}
                          error_message={"Plaese Select Vehicle Model"}
                          error_s={vehicle_model_error}
                          setsearch_item={setmodel_search_item}
                        />
                      </div>
                    </Col>

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

export default AddModelPerformance;
