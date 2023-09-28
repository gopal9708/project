import React, { useState, useLayoutEffect } from "react";
// import MetaTags from 'react-meta-tags';
// import { Link } from "react-router-dom";
// import Dropzone from "react-dropzone";
import "../../../assets/scss/forms/form.scss";
import { IconContext } from "react-icons";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import SearchInput from "../../../components/formComponent/searchInput/SearchInput";
// import NSearchInput from "../../../components/formComponent/nsearchInput/NSearchInput.js";
import * as Yup from "yup";
import axios from "axios";
//Import Date Picker

import {
  Card,
  CardBody,
  CardTitle,
  FormFeedback,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { MdAddCircleOutline, MdRemoveCircleOutline } from "react-icons/md";

import toTitleCase from "../../../lib/titleCase/TitleCase";
import { ServerAddress } from "../../../constants/ServerAddress";
import {
  setAlertType,
  setDataExist,
  setShowAlert,
} from "../../../store/alert/Alert";
import { useNavigate } from "react-router-dom";
// import PageTitle from "../../../components/pageTitle/PageTitle";
// import Title from "../../../components/title/Title";
import { setToggle } from "../../../store/pagination/Pagination";
// import SearchInput from "../../../components/formComponent/searchInput/SearchInput";
import { MdAdd, MdDeleteForever } from "react-icons/md";
// import MultiRowSearchInput from "../../../components/formComponent/multiRowSearchInput/MultiRowSearchInput";
// import { FiCheckSquare, FiSquare } from "react-icons/fi";

function Notification() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [startDate, setstartDate] = useState(new Date());
  const [refresh, setrefresh] = useState(false);
  //Circle Toogle Btn
  const [circle_btn, setcircle_btn] = useState(true);
  const [circle_btn2, setcircle_btn2] = useState(true);
  const toggle_circle = () => {
    setcircle_btn(!circle_btn);
  };
  const toggle_circle2 = () => {
    setcircle_btn2(!circle_btn2);
  };
  //  Client details
  const [client, setclient] = useState({});
  const [package_id_list, setpackage_id_list] = useState([]);
  const [comment, setcomment] = useState("")
  let dimension_list = ["", "", "", ""];
  const [row, setrow] = useState([dimension_list]);
  const accessToken = useSelector((state) => state.authentication.access_token);
  // get_timeline
  const [vendor_error, setvendor_error] = useState(false);
  // Vendor
  const [category_list, setcategory_list] = useState([]);
  const [category_name, setcategory_name] = useState("");
  const [category_id, setcategory_id] = useState("");
  const [category_n_page, setcategory_n_page] = useState(1);
  const [search_category_name, setsearch_category_name] = useState("");
  const [booking_date1, setbooking_date1] = useState("");
  // const [refresh, setrefresh] = useState(false);

  // Start Datepicker
  const startDateChange = (date) => {
    setstartDate(date);
  };
  const addPackage = () => {
    dimension_list = ["", "", "", ""];
    setrow([...row, dimension_list]);
  };

  const deletePackage = (item) => {
    let temp = [...row];
    let temp_2 = [...package_id_list];
    const index = temp.indexOf(item);
    if (index > -1) {
      temp.splice(index, 1);
      temp_2.splice(index, 1);
    }
    setrow(temp);
    setpackage_id_list(temp_2);
  };
  // Formik Yup validation
  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      Timeline: client.Timeline || "",
      Status: client.Status || "",
      Description: client.Description || "",
    },

    validationSchema: Yup.object({
      Timeline: Yup.string().required("Title Is Required"),
      Status: Yup.string().required("Status is required"),
    }),
    onSubmit: (values) => {
      console.log("values", values);
      send_timeline_data(values);

    },
  });

  const [category_data, setcategory_data] = useState([]);
  //------------Api for Get Users Data------------------------//
  const get_timeline = async () => {
    let category_temp = [];
    let data = [];
    try {
      const response = await axios.get(
        ServerAddress + `notice_board/get-Category/?search=${""}&p=${category_n_page}&records=${10}&name_search=${search_category_name}&category_name=&data=all`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      data = response.data.results;
      setcategory_data(data);
      console.log("timeline----", data);
      if (response.data.results.length > 0) {
        if (category_n_page === 1) {
          category_temp = response.data.results.map((v) => [
            v.id,
            toTitleCase(v.name),
          ]);
        } else {
          category_temp = [
            ...category_list,
            ...response.data.results.map((v) => [v.id, v.name]),
          ];
        }
      }
      setcategory_list(category_temp);
    } catch (err) {
      alert(`Error Occur in Get, ${err}`);
    }
  };

  useLayoutEffect(() => {
    get_timeline();
  }, [refresh]);

  const send_timeline_data = async (values) => {
    const buttonType = window.event.submitter.name;
    try {
      const response = await axios.post(
        ServerAddress + "notice_board/add-Notice/",
        {
          category: category_id,
          title: toTitleCase(values.Timeline).toUpperCase(),
          description: values.Description,
          date_of_expiry: booking_date1,
          status: values.Status,
          comment: comment,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log("rahul---", response.data); // Log the response data to console

      if (response.data.status === "success") {
        alert(response.data)
        dispatch(setToggle(true));
        dispatch(setShowAlert(true));
        dispatch(setDataExist(`User Added sucessfully`));
        dispatch(setAlertType("success"));
        navigate(-1)
      }
      console.log("Timline", response.data);
    } catch (error) {
      alert(`Error Happened while posting Timeline Data ${error}`);
    }
  };

  return (
    <React.Fragment>
      <Form
        onSubmit={(e) => {
          alert("Timline Information")
          e.preventDefault();
          validation.handleSubmit(e.values);
          return false;
        }}
      >
        <div className="page-content">
          <Container fluid>
            <Row>
              <Col lg={12}>
                <Card>
                  <CardTitle className="mb-1 header">
                    <div
                      id="timeline"
                      value="first"
                      className="header-text-icon header-text"
                    >
                      Timline Information
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
                      <FormGroup className="mb-4" row>
                        <Label
                          htmlFor="projectname"
                          className="col-form-label col-lg-2"
                        >
                          Title*
                        </Label>
                        <Col lg="10">
                          <Input
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.Timeline || ""}
                            invalid={
                              validation.touched.Timeline &&
                                validation.errors.Timeline
                                ? true
                                : false
                            }
                            id="input"
                            name="Timeline"
                            type="text"
                            className="form-control"
                            placeholder="Enter Your Title..."
                          />
                          {validation.touched.Timeline &&
                            validation.errors.Timeline && (
                              <FormFeedback type="invalid">
                                {validation.errors.Timeline}
                              </FormFeedback>
                            )}
                        </Col>
                      </FormGroup>
                      <FormGroup className="mb-4" row>
                        <Label
                          htmlFor="projectdesc"
                          className="col-form-label col-lg-2"
                        >
                          Description
                        </Label>
                        <Col lg="10">
                          <textarea
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.Description || ""}
                            invalid={
                              validation.touched.Description &&
                                validation.errors.Description
                                ? true
                                : false
                            }
                            className="form-control"
                            name="Description"
                            id="input"
                            rows="3"
                            placeholder="Enter  Description..."
                          />
                          {validation.touched.Description &&
                            validation.errors.Description && (
                              <FormFeedback type="invalid">
                                {validation.errors.Description}
                              </FormFeedback>
                            )}
                        </Col>
                      </FormGroup>
                      <FormGroup className="mb-4" row>
                        <Label className="col-form-label col-lg-2">
                          Expiry Date*
                        </Label>
                        <Col lg="10">
                          <Row>
                            <Col lg={3} md={6} sm={6} className="pr-0">
                              <div>
                                <input
                                  type="date"
                                  className="form-control d-block form-control-md "
                                  id="input"
                                  value={booking_date1}
                                  onChange={(val) => {
                                    setbooking_date1(val.target.value);
                                  }}
                                />
                              </div>

                            </Col>
                          </Row>
                        </Col>
                      </FormGroup>
                      <Row>
                        <Col md={3} sm={3}>
                          <div className="mb-3">
                            <Label className="header-child">Status</Label>
                            <Input
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.Status || ""}
                              invalid={
                                validation.touched.Status &&
                                  validation.errors.Status
                                  ? true
                                  : false
                              }
                              min={0}
                              type="text"
                              name="Status"
                              className="form-control-md"
                              id="input"
                              style={{ marginBottom: "15px" }}
                              placeholder="Please Enter Status"
                            />
                            {validation.touched.Status &&
                              validation.errors.Status && (
                                <FormFeedback type="invalid">
                                  {validation.errors.Status}
                                </FormFeedback>
                              )}
                          </div>
                        </Col>
                        <Col md={3} sm={3}>
                          <div className="mb-3">
                            <Label className="header-child">Category</Label>
                            <SearchInput
                              placeholder="Enter Your Category..."
                              data_list={category_list}
                              setdata_list={setcategory_list}
                              data_item_s={category_name}
                              set_data_item_s={setcategory_name}
                              set_id={setcategory_id}
                              page={category_n_page}
                              setpage={setcategory_n_page}
                              search_item={search_category_name}
                              setsearch_item={setsearch_category_name}
                              error_message={"Please select a category"}
                              error_s={vendor_error}
                            />
                          </div>
                        </Col>
                      </Row>
                      <FormGroup className="mb-4" row>
                        <Label
                          htmlFor="projectdesc"
                          className="col-form-label col-lg-2"
                          value={comment}
                          onChange={(e) => {
                            setcomment(e.target.value);
                          }}
                        >
                          Comments
                        </Label>
                        <Col lg="6">
                          <textarea
                            className="form-control"
                            id="projectdesc"
                            rows="3"
                            placeholder="Enter your Comments..."
                          />
                        </Col>
                      </FormGroup>
                      {/*Button */}
                    </CardBody>
                  ) : null}
                  <div className=" m-3">
                    <Col lg={12}>
                      <Card className="shadow bg-white rounded">
                        <CardTitle className="mb-1 header">
                          <div className="header-text-icon header-text">
                            Add Your Attachments to
                            <IconContext.Provider
                              value={{
                                className: "header-add-icon",
                              }}
                            >
                              <div onClick={toggle_circle2}>
                                {circle_btn2 ? (
                                  <MdAddCircleOutline />
                                ) : (
                                  <MdRemoveCircleOutline />
                                )}
                              </div>
                            </IconContext.Provider>
                          </div>
                        </CardTitle>
                        {circle_btn2 ? (
                          <CardBody>
                            <Form>
                              <Row>
                                <Col md={3} sm={3}>
                                  <div className="mb-3">
                                    <Label className="header-child">
                                      Attachment
                                    </Label>
                                    {row.map((item, index) => (
                                      <Input
                                        className="form-control form-control-md"
                                        id="formFileSm"
                                        type="file"
                                        min={0}
                                        key={index}
                                        value={item[0]}
                                        onChange={(val) => {
                                          item[0] = val.target.value;
                                          setrefresh(!refresh);
                                        }}
                                      />
                                    ))}
                                  </div>
                                  {row.length < 20 && (
                                    <div>
                                      <span
                                        className="link-text"
                                        onClick={() => {
                                          addPackage();
                                        }}
                                      >
                                        <IconContext.Provider
                                          value={{
                                            className: "link-text",
                                          }}
                                        >
                                          <MdAdd />
                                        </IconContext.Provider>
                                        Add Another Image
                                      </span>
                                    </div>
                                  )}
                                </Col>
                                <Col lg={1}>
                                  <div
                                    className="mb-3"
                                    style={{ textAlign: "center" }}
                                  >
                                    {row.length > 1 ? (
                                      <Label className="header-child">
                                        Delete
                                      </Label>
                                    ) : null}
                                    {row.map((item, index) => (
                                      <IconContext.Provider
                                        key={index}
                                        value={{
                                          className: "icon multi-input",
                                        }}
                                      >
                                        {row.length > 1 ? (
                                          <>
                                            <div
                                              style={{ height: "9.5px" }}
                                            ></div>
                                            <div
                                              onClick={() => {
                                                // isupdating
                                                // && item[4] && delete_package(item[4])
                                                deletePackage(item);
                                              }}
                                            >
                                              <MdDeleteForever
                                                style={{
                                                  justifyContent: "center",
                                                  cursor: "pointer",
                                                }}
                                              />
                                            </div>
                                          </>
                                        ) : null}
                                      </IconContext.Provider>
                                    ))}
                                  </div>
                                </Col>
                              </Row>

                              {/*Button */}
                            </Form>
                          </CardBody>
                        ) : null}
                      </Card>
                    </Col>
                  </div>
                </Card>
              </Col>
            </Row>
            <div className=" m-4">
              <Col lg={12}>
                <div className="mb-1 footer_btn">
                  <button
                    className="btn btn-info m-2"
                    type="submit"
                    name="save_add"
                  // onClick={() => {
                  //   ();
                  // }}
                  >
                    Save
                  </button>

                  <button
                    type="button"
                    className="btn btn-info m-2 "
                    onClick={() => navigate(-1)}
                  >
                    Cancel
                  </button>
                </div>
              </Col>
            </div>
          </Container>
        </div>
      </Form>
    </React.Fragment>
  );
}

export default Notification;
