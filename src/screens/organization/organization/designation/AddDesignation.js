import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IconContext } from "react-icons";
import { MdAddCircleOutline, MdRemoveCircleOutline } from "react-icons/md";
import axios from "axios";
import { ServerAddress } from "../../../../constants/ServerAddress";
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
import toTitleCase from "../../../../lib/titleCase/TitleCase";
import { setToggle } from "../../../../store/pagination/Pagination";
import { setAlertType,setDataExist,setShowAlert } from "../../../../store/alert/Alert";
import PageTitle from "../../../../components/pageTitle/PageTitle";
import Title from "../../../../components/title/Title";
import { Button } from "react-bootstrap";
// import SearchInput from "../../../components/formComponent/searchInput/SearchInput";
const AddDesignation = () => {
  const dispatch = useDispatch();
  const user_id = useSelector((state) => state.authentication.userdetails.id);
  const accessToken = useSelector((state) => state.authentication.access_token);
  // const department = useSelector((state) => state.authentication.userdetails);
  // const userdepartment = useSelector(
  //   (state) => state.authentication.userdepartment
  // );
  const location = useLocation();
  // console.log("location---", location);
  const [isupdating, setisupdating] = useState(false);
  const [designation, setdesignation] = useState("");

  // Commodity
  // const [search_commodity_type, setsearch_commodity_type] = useState("");
  const [approved_entry, setapproved_entry] = useState(false);
  // const [commodity_type_search_item, setcommodity_type_search_item] =
  //   useState("");

  // const navigatee = useNavigate();

  // const refreshPage = () => {
  //   navigatee(0);
  // };

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      designation: toTitleCase(designation.name) || "",
    },
    validationSchema: Yup.object({
      designation: Yup.string().required("designation name is required"),
    }),
    onSubmit: (values) => {
      isupdating ? update_designation(values) : add_designation(values);
    },
  });
  const [circle_btn, setcircle_btn] = useState(true);
  const toggle_circle = () => {
    setcircle_btn(!circle_btn);
  };
  useEffect(() => {
    try {
      setdesignation(location.state.designation);
      setisupdating(true);
    } catch (error) {}
  }, []);

  //Post Data
  const add_designation = (values) => {
    axios
      .post(
        ServerAddress + "master/add_designations/",
        {
          name: toTitleCase(values.designation).toUpperCase(),
          created_by: user_id,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (response) {
        if (response.data.status === "success") {
          dispatch(setToggle(true));
          dispatch(setShowAlert(true));
          dispatch(
            setDataExist(
              `designation  "${toTitleCase(
                values.designation
              )}" Added sucessfully`
            )
          );
          dispatch(setAlertType("success"));
          navigate("/ems/designation");
        } else if (response.data === "duplicate") {
          dispatch(setShowAlert(true));
          dispatch(
            setDataExist(
              `designation Name "${toTitleCase(
                values.designation
              )}" already exists`
            )
          );
          dispatch(setAlertType("warning"));
        }
      })
      .catch((error) => {
        alert(`Error Happen while posting designation  Data ${error}`);
      });
  };

  // Update Data

  const update_designation = (values) => {
    let fields_names = Object.entries({
      name: values.designation,
    });
    let change_fields = {};
    var prom = new Promise((resolve, reject) => {
      for (let j = 0; j < fields_names.length; j++) {
        const ele = fields_names[j];
        let prev = location.state.designation[`${ele[0]}`];
        let new_v = ele[1];
        if (prev !== new_v.toUpperCase()) {
          change_fields[`${ele[0]}`] = new_v.toUpperCase();
        }
        if (j === fields_names.length - 1) resolve();
      }
    });
    prom.then(() => {
      axios
        .put(
          ServerAddress + "master/update_designations/" + designation.id,
          {
            name: toTitleCase(values.designation).toUpperCase(),
            modified_by: user_id,
            change_fields: change_fields,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then(function (response) {
          if (response.data.status === "success") {
            dispatch(setToggle(true));
            dispatch(setShowAlert(true));
            dispatch(
              setDataExist(
                ` "${toTitleCase(values.designation)}" Updated sucessfully`
              )
            );
            dispatch(setAlertType("info"));
            navigate("/ems/designation");
          } else if (response.data === "duplicate") {
            dispatch(setShowAlert(true));
            dispatch(
              setDataExist(
                `designation Name "${toTitleCase(
                  values.designation
                )}" already exists`
              )
            );
            dispatch(setAlertType("warning"));
          }
        })
        .catch(function () {
          alert("Error Error While  Updateing commidity");
        });
    });
  };
  const navigate = useNavigate();
  const handleAction = () => {
    dispatch(setToggle(true));
    navigate("/ems/designation");
  };

  return (
    <div>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          // if( == "") {
          //   setcommodity_type_error(true);
          // }
          validation.handleSubmit(e.values);
          return false;
        }}
      >
        {/* Commodity */}
        <div className="mt-3">
          <PageTitle
            page={isupdating ? "Update Designation" : "Add Designation"}
          />
          <Title
            title={isupdating ? "Update Designation" : "Add Designation"}
            parent_title="Ems"
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
                        <Label className="header-child">
                          Designation Name*
                        </Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.designation}
                          invalid={
                            validation.touched.designation &&
                            validation.errors.designation
                              ? true
                              : false
                          }
                          type="text"
                          name="designation"
                          className="form-control-md"
                          id="input"
                          placeholder="Enter Designation name"
                          disabled={approved_entry}
                        />
                        {validation.touched.designation &&
                        validation.errors.designation ? (
                          <FormFeedback type="invalid">
                            {validation.errors.designation}
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
              <Button type="submit" className="btn btn-info m-1 cu_btn">
                {isupdating ? "Update" : "Save"}
              </Button>
              <Button
                className="btn btn-info m-1 cu_btn"
                type="button"
                onClick={handleAction}
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

export default AddDesignation;
