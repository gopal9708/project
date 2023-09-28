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
  setShowAlert,
  setAlertType,
  setDataExist,
} from "../../../store/alert/Alert";

const AddModelWeight = () => {
  const accessToken = useSelector((state) => state.authentication.access_token);
  const search = useSelector((state) => state.searchbar.search_item);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [page, setpage] = useState(1);
  const [model_search_item, setmodel_search_item] = useState("");

  //circle btn
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
      curb_weight: "",
      gross_weight: "",
    },

    validationSchema: Yup.object({
      curb_weight: Yup.string().required("Curb Weight is required"),
      gross_weight: Yup.string().required("Gross Weight is required"),
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
  //         console.log(response.data);
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
          <PageTitle page="Model Weight" />
          <Title title="Add Model Weight" parent_title="Vms" />
        </div>

        {/* modal preformance*/}
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
                          error_message={"Please Select vehicle Model"}
                          error_s={vehicle_model_error}
                          setsearch_item={setmodel_search_item}
                        />
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">Curb Weight:</Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.curb_weight || ""}
                          invalid={
                            validation.touched.curb_weight &&
                            validation.errors.curb_weight
                              ? true
                              : false
                          }
                          type="number"
                          min={0}
                          name="curb_weight"
                          className="form-control-md "
                          id="input"
                          placeholder="Enter Curb Weight"
                        />
                        {validation.touched.curb_weight &&
                        validation.errors.curb_weight ? (
                          <FormFeedback type="invalid">
                            {validation.errors.curb_weight}
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

export default AddModelWeight;
