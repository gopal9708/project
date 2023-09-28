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
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import toTitleCase from "../../../lib/titleCase/TitleCase";
import { setToggle } from "../../../store/pagination/Pagination";
import {
  setAlertType,
  setDataExist,
  setShowAlert,
} from "../../../store/alert/Alert";
import PageTitle from "../../../components/pageTitle/PageTitle";
import Title from "../../../components/title/Title";
import { Button } from "react-bootstrap";


const UpdateCommodityType = () => {
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.alert.show_alert);
  const accessToken = useSelector((state) => state.authentication.access_token);
  const navigate = useNavigate();
  const location = useLocation();

  const [isupdating, setisupdating] = useState(false);
  const [commodity, setcommodity] = useState([]);

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      commodity_type: toTitleCase(commodity.type) || "",
    },
    validationSchema: Yup.object({
      commodity_type: Yup.string().required("Commodity name is required"),

    }),
    onSubmit: (values) => {
      isupdating && update_commodity(values);
    },
  });

  const [circle_btn, setcircle_btn] = useState(true);
  const toggle_circle = () => {
    setcircle_btn(!circle_btn);
  };

  const update_commodity = (values) => {
    let id = commodity.commodity_type;

      axios
        .put(
          ServerAddress + "master/update_commoditytype/" + id,
          {
            type: toTitleCase(values.commodity_type).toUpperCase(),

          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then(function (response) {
          console.log(response.data)
          if (response.data.status === "success") {
            dispatch(setToggle(true));
            dispatch(setShowAlert(true));
            dispatch(
              setDataExist(
                `Commidity Type "${toTitleCase(
                  values.commodity_type
                )}" Updated sucessfully`
              )
            );
            dispatch(setAlertType("info"));
            navigate(-1);
          } else if (response.data === "duplicate") {
            dispatch(setShowAlert(true));
            dispatch(
              setDataExist(
                `Commodity Type "${toTitleCase(
                  values.commodity_type
                )}" already exists`
              )
            );
            dispatch(setAlertType("warning"));
          }
        })
        .catch(function () {
          alert("Error Error While  Updateing commidity");
        });

  };

  useEffect(() => {
    try {
      setcommodity(location.state.commodity);
      setisupdating(true);
    } catch (error) { }
  }, []);


  return (

    <div>

      <Form
        onSubmit={(e) => {
          e.preventDefault();
          validation.handleSubmit(e.values);
          return false;
        }}
      >
        {/* Commodity */}

        <div className="mt-3">
          <PageTitle page="Update Commodity Type"/>
          <Title
            title="Update Commodity Type"
            parent_title="Masters"
          />
        </div>

        <div className="m-3">

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
                      <div className="mb-2">
                        <Label className="header-child">Commodity Type*</Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.commodity_type}
                          invalid={
                            validation.touched.commodity_type &&
                              validation.errors.commodity_type
                              ? true
                              : false
                          }
                          type="text"
                          name="commodity_type"
                          className="form-control-md"
                          id="input"
                          placeholder="Enter Commodity Type"
                        />
                        {validation.touched.commodity_type &&
                          validation.errors.commodity_type ? (
                          <FormFeedback type="invalid">
                            {validation.errors.commodity_type}
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
        <div className="m-3">
          <Col lg={12}>
            <div className="mb-1 footer_btn">
              <Button
                className="btn btn-info m-1 cu_btn"
                type="submit"
              >
                Update
              </Button>

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
export default UpdateCommodityType;
