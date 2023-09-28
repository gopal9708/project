/* eslint-disable */
import React, { useState, useEffect, useLayoutEffect } from "react";
import "../../../assets/scss/forms/form.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
// import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
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
import { MdDeleteForever, MdAdd } from "react-icons/md";
import { IconContext } from "react-icons";
import { MdAddCircleOutline, MdRemoveCircleOutline } from "react-icons/md";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "reactstrap";
import toTitleCase from "../../../lib/titleCase/TitleCase";
import SearchInput from "../../../components/formComponent/searchInput/SearchInput";
import NSearchInput from "../../../components/formComponent/nsearchInput/NSearchInput";
import { ServerAddress } from "../../../constants/ServerAddress";
import {
  setAlertType,
  setDataExist,
  setShowAlert,
} from "../../../store/alert/Alert";
import PageTitle from "../../../components/pageTitle/PageTitle";
import Title from "../../../components/title/Title";
import { setToggle } from "../../../store/pagination/Pagination";
import Main_c from "../../../components/crop/main";
import { responsivePropType } from "react-bootstrap/esm/createUtilityClasses";
import { FiSquare, FiCheckSquare } from "react-icons/fi";

const AddHubVehicle = (manifest) => {
  console.log("manifest--yyy---", manifest.manifest.is_scanned)
  const user_id = useSelector((state) => state.authentication.userdetails.id);
  const user_branch = useSelector(
    (state) => state.authentication.userdetails.home_branch
  );
  const [show, setShow] = useState(false);
  const accessToken = useSelector((state) => state.authentication.access_token);
  const alert = useSelector((state) => state.alert.show_alert);

  // const location= useLocation

  const dispatch = useDispatch();
  const location_data = useLocation();
  console.log("location_data-----", location_data);
  const navigate = useNavigate();

  //Circle Toogle Btn
  const [circle_btn, setcircle_btn] = useState(true);
  const toggle_circle = () => {
    setcircle_btn(!circle_btn);
  };

  const [circle_btn1, setcircle_btn1] = useState(true);
  const toggle_circle1 = () => {
    setcircle_btn1(!circle_btn1);
  };

  const [circle_btn2, setcircle_btn2] = useState(true);
  const toggle_circle2 = () => {
    setcircle_btn2(!circle_btn2);
  };
  const [circle_btn4, setcircle_btn4] = useState(true);
  const toggle_circle4 = () => {
    setcircle_btn4(!circle_btn4);
  };
  //  Coloader Mode
  const [coloader_mode_list, setcoloader_mode_list] = useState([
    // "Direct Awb",
    // "Air Console",
    // "By Road (Surface)",
    // "By Train",
    // "Direct Vehicle",
    // "Partload",
  ]);
  console.log("coloader_mode_list-----", coloader_mode_list)

  const [coloader_selcted_m, setcoloader_selcted_m] = useState("");
  const [coloader_selected, setcoloader_selected] = useState("");
  const [search, setsearch] = useState("");
  const [page, setpage] = useState(1);
  const [manifest_no, setmanifest_no] = useState("");
  const [forward_branch, setforward_branch] = useState("");
  const [today, settoday] = useState("");
  const [open_box, setopen_box] = useState(false);
  const [box_quantity, setbox_quantity] = useState("");

  const [coloader_list, setcoloader_list] = useState([]);
  const [company_slected_list, setcompany_slected_list] = useState("");
  const [coloader_selected_s, setcoloader_selected_s] = useState("");
  const [coloader_id, setcoloader_id] = useState("");
  const [orgin, setorgin] = useState("");
  const [dest, setdest] = useState("");
  const [manifest_id, setmanifest_id] = useState();

  const [orders, setorders] = useState([])
  const [docket_weight, setdocket_weight] = useState("")

  //This state is used for date
  const [coloader_mode_error, setcoloader_mode_error] = useState(false);
  const [forwording_date_error, setforwording_date_error] = useState(false);

  const [order_active_btn, setorder_active_btn] = useState("first");

  //  State For Cropping In React Crop
  const [showModal, setshowModal] = useState(false);
  const [document, setdocument] = useState([]);
  const [doc_result_image, setdoc_result_image] = useState([]);

  //  State For Cropping In React Crop Ended

  // adding extra input fields in Packages
  const [length, setlength] = useState("");
  const [breadth, setbreadth] = useState("");
  const [height, setheight] = useState("");
  const [pieces, setpieces] = useState("");
  const [package_id_list, setpackage_id_list] = useState("");
  const [packages_id, setpackages_id] = useState([]);
  const [deleted_packages_id, setdeleted_packages_id] = useState([]);

  let dimension_list = [length, breadth, height, pieces];
  const [row, setrow] = useState([dimension_list]);
  console.log("row-----------", row)

  // adding extra input fields in Order Images
  const [selectedFile, setSelectedFile] = useState("");

  let dimension_list1 = [selectedFile];
  const [row1, setrow1] = useState([dimension_list1]);

  // adding extra input fields in Invoice
  const [invoice_img, setinvoice_img] = useState("");
  const [invoice_no, setinvoice_no] = useState("");
  const [invoice_value, setinvoice_value] = useState("");

  let dimension_list2 = [invoice_img, today, invoice_no, invoice_value];
  const [row2, setrow2] = useState([dimension_list2]);

  // Packages
  let p = row.length - 1;
  const a = parseInt(row[p][3]) + parseInt(row[p][3]);
  const addPackage = () => {
    setlength("");
    setbreadth("");
    setheight("");
    setpieces("");
    dimension_list = ["", "", "", ""];
    setrow([...row, dimension_list]);
  };

  const deletePackage = (item) => {
    setlength("length");
    setbreadth("breadth");
    setheight("height");
    setpieces("pieces");

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
  // Validation
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      coloader_no: "",
      flight_no: "",
      no_of_bags: "",
      actual_weight: "",
      chargeable_weight: ""
    },

    validationSchema: Yup.object({
      coloader_no: Yup.string().required("Coloader No is required"),
      flight_no: Yup.string().required("Flight Name is required"),
      no_of_bags: Yup.string().required("Number Of Bags is required"),
      actual_weight: Yup.string().required("Enter Manifest Weight"),
      chargeable_weight: Yup.string().required("Enter Chargable Weight"),
      actual_weight: Yup.string().required("Enter Actual Weight"),
    }),

    onSubmit: (values) => {
      if (docket_weight + 5 >= values.actual_weight) {
        updateManifest(values);
      }
      else {
        const result = window.confirm('Docket Weight Is Not Equal To Coloader Actual Weight Are you sure you want to proceed?');
        if (result) {
          updateManifest(values);
        }
      }
    },
  });

  const updateManifest = (values) => {
    let fields_name = Object.entries({
      airwaybill_no:values.coloader_no,
      bag_count:values.no_of_bags,
      chargeable_weight:values.chargeable_weight,
      coloader: coloader_id,
      total_weight:values.actual_weight,
    });
    console.log("fields_name-------", fields_name)
    let change_fields = {};
    for (let j = 0; j < fields_name.length; j++) {
      const ele = fields_name[j];
      console.log("ele-----", ele)
      let prev = manifest.manifest[`${ele[0]}`];
      console.log("prev-----", prev)
      let new_v = ele[1];
      console.log("new_v-----", new_v)
      if (String(prev).toUpperCase() !== String(new_v).toUpperCase()) {
        change_fields[`${ele[0]}`] = new_v.toString().toUpperCase();
      }
    }
    console.log("change_fields----", change_fields)
    axios
      .put(
        ServerAddress + "manifest/update_manifest/" + manifest_id,
        {
          change_fields: change_fields,
          coloader_mode: coloader_selcted_m.toUpperCase(),
          coloader: coloader_id,
          airwaybill_no: toTitleCase(values.coloader_no).toUpperCase(),
          forwarded_at: today,
          bag_count: values.no_of_bags,
          total_weight: values.actual_weight,
          manifest_no: manifest_no,
          chargeable_weight: values.chargeable_weight,
          coloader_name: (coloader_selected).toUpperCase(),
          carrier_name: toTitleCase(values.flight_no).toUpperCase(),
          is_forwarded: "True",
          forwarded_by: user_id,
          // open_box:open_box ? "True" :"False",
          // box_count:box_quantity,

          forwarded: "True",
          forwarded_branch: user_branch,
          modified_by: user_id,
          manifest_packages: row,
        },

        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (response) {
        console.log("response-----", response.data)
        if (response.data.status === "success") {
          dispatch(setToggle(true));
          dispatch(setShowAlert(true));
          dispatch(
            setDataExist(`Manifest of  ${manifest_no} Forwarded sucessfully`)
          );
          dispatch(setAlertType("info"));
          setShow(false)
          let form = new FormData();
          if (document.length !== 0) {
            document.forEach((e, i) => {
              form.append(`manifestImage${i}`, e, e.name);
            });
            let imageLength = document.length;
            form.append(`manifest_count`, imageLength);
            form.append(`manifest_no`, response.data.data.manifest_no);
            axios
              .post(ServerAddress + `manifest/add-manifest-image/`, form, {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                  "content-type": "multipart/form-data",
                },
              })
              .then((res) => {
                console.log("ImageResssssssssssssssssssss", res.data);
                successMSg();
              })
              .catch((err) => {
                console.log("ImaeErrrrrrrrrrrrrrrrrrr", err);
              });
          } else {
            console.log("Manifest created without image");
          }
        } else if (response.data === "duplicate") {
          dispatch(setShowAlert(true));
          dispatch(
            setDataExist(
              `Commodity Name "${toTitleCase(
                values.commodity_name
              )}" already exists`
            )
          );
          dispatch(setAlertType("warning"));
        }
      })
      .catch(function (err) {
        alert(`Error While  Updateing Manifest ${err}`);
      });
  };

  useEffect(() => {
    if (manifest.manifest && show) {
      setorders(manifest.manifest.orders)
      setmanifest_no(manifest.manifest.manifest_no);
      setforward_branch(
        toTitleCase(manifest.manifest.from_branch_n)
      );
      setorgin(toTitleCase(manifest.manifest.orgin_branch_n));
      setdest(toTitleCase(manifest.manifest.destination_branch_n));
      setmanifest_id(manifest.manifest.id);
    }

  }, [show]);

  useEffect(() => {
    if (orders.length > 0) {
      const sum = orders.map((item) => item.actual_weight).reduce((accumulator, currentValue) => accumulator + currentValue);
      setdocket_weight(sum)
    }
  }, [orders])




  const get_coloader = () => {
    axios
      .get(
        ServerAddress +
        `master/get_coloader/?p=${page}&records=${10}&name_search=${search}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        let temp = [];
        let temp2 = [...coloader_list];
        temp = response.data.results;
        for (let index = 0; index < temp.length; index++) {
          temp2.push([temp[index].id, toTitleCase(temp[index].name)]);
        }
        temp2 = [...new Set(temp2.map((v) => `${v}`))].map((v) => v.split(","));
        setcoloader_list(temp2);
      })
      .catch((err) => {
        alert(`Error While Loading Client , ${err}`);
      });
  };

  const getVendorService = (id) => {
    let temp = [];

    axios
      .get(ServerAddress + `master/get_vendorservice/?vendor_id=${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((resp) => {
        console.log("vendor res------", resp)

        for (let index = 0; index < resp.data.vendor_service.length; index++) {
          const data = resp.data.vendor_service[index];
          if (data.service_type === 'AIRWAY BILL') {
            temp.push('Direct AWB')
          }
          // else if (data.service_type === 'DIRECT VEHICLE') {
          //   temp.push('Direct Vehicle')
          // }
          else if (data.service_type === 'CONSOLE CONNECTION') {
            temp.push('Air Console')
          }
          // else if (data.service_type === 'PART LOAD VEHICLE') {
          //   temp.push('Part Load')
          // }
          // else if (data.service_mode === 'FORWARDING BY TRAIN') {
          //   temp.push('By Train')
          // }
          // else if (data.service_type === 'DIRECT VEHICLE' || data.service_type === 'KG WISE' || data.service_type === 'PART LOAD VEHICLE') {
          //   temp.push('By Road')
          // }

        }
        setcoloader_mode_list([...new Set(temp)])

      })
      .catch((err) => {
        alert(`Error Occur in Get vendor service, ${err}`);
      });
  };

  useEffect(() => {
    let date = new Date();
    let added_date_time =
      String(date.getDate()).length === 1
        ? "0" + String(date.getDate())
        : String(date.getDate());
    let month =
      String(date.getMonth() + 1).length === 1
        ? "0" + String(date.getMonth() + 1)
        : String(date.getMonth() + 1);
    let year = String(date.getFullYear());

    let hour =
      String(date.getHours()).length === 1
        ? "0" + String(date.getHours())
        : String(date.getHours());
    let minutes =
      String(date.getMinutes()).length === 1
        ? "0" + String(date.getMinutes())
        : date.getMinutes();
    settoday(`${year}-${month}-${added_date_time}T${hour}:${minutes}`);
  }, []);

  useLayoutEffect(() => {
    get_coloader();
  }, [search, page]);

  useEffect(() => {
    if (coloader_id !== "") {
      getVendorService(coloader_id)

    }
    setcoloader_selcted_m("")
  }, [coloader_id])

  //Modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSuccess = () => {
    // send_runsheet_data();
  };

useEffect(() => {
  dispatch(setToggle(false));
}, [alert])

  return (
    <>
      <Button size="sm" outline color="primary" type="button" onClick={() => setShow(true)} disabled={!manifest.manifest.is_scanned}>
        Forward
      </Button>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="custom-modal"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Create Manifest
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form
            onSubmit={(e) => {
              e.preventDefault();
              if (coloader_selcted_m == "") {
                setcoloader_mode_error(true);
              }
              if (today == "") {
                setforwording_date_error(true);
              }
              validation.handleSubmit(e.values);
              return false;
            }}
          >
            {/* Branch Info */}
            <div className="m-3">
              <Col lg={12}>
                <Card className="shadow bg-white rounded">
                  <CardTitle className="mb-1 header">
                    <div className="header-text-icon header-text">
                      Manifest Info :
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
                        <Col lg={3} md={3} sm={6}>
                          <div className="mb-2">
                            <Label className="header-child">Manifest No* :</Label>
                            <Input id="input" disabled value={manifest_no} />
                          </div>
                        </Col>
                        <Col lg={3} md={3} sm={6}>
                          <div className="mb-2">
                            <Label className="header-child">
                              Forward Branch* :
                            </Label>
                            <Input id="input" disabled value={forward_branch} />
                          </div>
                        </Col>

                        <Col lg={3} md={3} sm={6}>
                          <div className="mb-2">
                            <Label className="header-child"> Orgin:</Label>
                            <Input id="input" disabled value={orgin} />
                          </div>
                        </Col>

                        <Col lg={3} md={3} sm={6}>
                          <div className="mb-2">
                            <Label className="header-child">Destination* :</Label>
                            <Input id="input" disabled value={dest} />
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  ) : null}
                </Card>
              </Col>
            </div>

            {/* Colader info */}
            <div className="m-3">
              <Col lg={12}>
                <Card className="shadow bg-white rounded">
                  <CardTitle className="mb-1 header">
                    <div className="header-text-icon header-text">
                      Coloader Info
                      <IconContext.Provider
                        value={{
                          className: "header-add-icon",
                        }}
                      >
                        <div onClick={toggle_circle1}>
                          {circle_btn1 ? (
                            <MdRemoveCircleOutline />
                          ) : (
                            <MdAddCircleOutline />
                          )}
                        </div>
                      </IconContext.Provider>
                    </div>
                  </CardTitle>
                  {circle_btn1 ? (
                    <CardBody>
                      <Row>
                        <Col lg={3} md={3} sm={6}>
                          <div className="mb-2">
                            <Label className="header-child">
                              Select Coloader* :
                            </Label>
                            <SearchInput
                              data_list={coloader_list}
                              setdata_list={setcoloader_list}
                              data_item_s={coloader_selected}
                              set_data_item_s={setcoloader_selected}
                              set_id={setcoloader_id}
                              page={page}
                              setpage={setpage}
                              error_message={"Please Select Colader"}
                              search_item={search}
                              setsearch_item={setsearch}
                            />
                          </div>
                        </Col>


                        <Col lg={3} md={3} sm={6}>
                          <div className="mb-2">
                            <Label className="header-child">
                              Coloader Mode* :
                            </Label>
                            <span onClick={() => setby_pincode(false)}>
                              <NSearchInput
                                data_list={coloader_mode_list}
                                data_item_s={coloader_selcted_m}
                                set_data_item_s={setcoloader_selcted_m}
                                show_search={false}
                                error_message={"Please Select Coloader Mode"}
                                error_s={coloader_mode_error}
                              />
                            </span>
                          </div>
                        </Col>

                        <Col lg={3} md={3} sm={6}>
                          <div className="mb-2">
                            <Label className="header-child">
                              Co-loader No / Airway bill no* :
                            </Label>
                            <Input
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.coloader_no || ""}
                              invalid={
                                validation.touched.coloader_no &&
                                  validation.errors.coloader_no
                                  ? true
                                  : false
                              }
                              type="text"
                              className="form-control-md"
                              id="input"
                              name="coloader_no"
                              placeholder="Enter Coloader No:"
                            />
                            {validation.touched.coloader_no &&
                              validation.errors.coloader_no ? (
                              <FormFeedback type="invalid">
                                {validation.errors.coloader_no}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </Col>
                        {(coloader_selcted_m === "Direct AWB" || coloader_selcted_m === "Air Console") &&
                          <Col lg={3} md={3} sm={6}>
                            <div className="mb-2">
                              <Label className="header-child">
                                Flight Name & Number :
                              </Label>
                              <Input
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.flight_no}
                                invalid={
                                  validation.touched.flight_no &&
                                    validation.errors.flight_no
                                    ? true
                                    : false
                                }
                                type="text"
                                className="form-control-md"
                                id="input"
                                name="flight_no"
                                placeholder="Enter Flight Name"
                              />
                              {validation.touched.flight_no &&
                                validation.errors.flight_no ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.flight_no}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </Col>
                        }
                        <Col lg={3} md={3} sm={6}>
                          <div className="mb-2">
                            <Label className="header-child">
                              Forwarding Date* :
                            </Label>
                            <Input
                              type="datetime-local"
                              className="form-control d-block form-control-md "
                              id="input"
                              value={today}
                              onChange={(val) => {
                                settoday(val.target.value);
                              }}
                              onBlur={() => {
                                setforwording_date_error(true);
                              }}
                              invalid={today == "" && forwording_date_error}
                            />
                            {today == "" && forwording_date_error ? (
                              <FormFeedback type="invalid">
                                Date is required
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

            {/*Package info*/}
            <div className="m-3">
              <Col lg={12}>
                <Card className="shadow bg-white rounded">
                  <CardTitle className="mb-1 header">
                    <div className="header-text-icon header-text">
                      Package Info :
                      <IconContext.Provider
                        value={{
                          className: "header-add-icon",
                        }}
                      >
                        <div onClick={toggle_circle2}>
                          {circle_btn2 ? (
                            <MdRemoveCircleOutline />
                          ) : (
                            <MdAddCircleOutline />
                          )}
                        </div>
                      </IconContext.Provider>
                    </div>
                  </CardTitle>
                  {circle_btn2 ? (
                    <CardBody>
                      <Row>
                        <Col lg={3} md={3} sm={6}>
                          <div className="mb-2">
                            <Label className="header-child">No of Bags* :</Label>
                            <Input
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.no_of_bags || ""}
                              invalid={
                                validation.touched.no_of_bags &&
                                  validation.errors.no_of_bags
                                  ? true
                                  : false
                              }
                              type="number"
                              min={0}
                              className="form-control-md"
                              id="input"
                              name="no_of_bags"
                              placeholder="Enter Total  Bags"
                            />
                            {validation.touched.no_of_bags &&
                              validation.errors.no_of_bags ? (
                              <FormFeedback type="invalid">
                                {validation.errors.no_of_bags}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </Col>

                        <Col lg={3} md={3} sm={6}>
                          <div className="mb-2">
                            <Label className="header-child">
                              Docket Weight* :
                            </Label>
                            <Input
                              id="input"
                              disabled
                              placeholder="Docket Weight"
                              value={docket_weight}
                            />
                          </div>
                        </Col>
                        <Col lg={3} md={3} sm={6}>
                          <div className="mb-2">
                            <Label className="header-child">TSP* :</Label>
                            <Input id="input" disabled placeholder="TSP Value" />
                          </div>
                        </Col>

                        <Col lg={3} md={3} sm={6}>
                          <div className="mb-2">
                            <Label className="header-child">
                              Coloader Actual Weight* :
                            </Label>
                            <Input
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.actual_weight || ""}
                              invalid={
                                validation.touched.actual_weight &&
                                  validation.errors.actual_weight
                                  ? true
                                  : false
                              }
                              type="number"
                              min={0}
                              className="form-control-md"
                              id="input"
                              name="actual_weight"
                              placeholder="Enter Manifest Weight"
                            />
                          </div>
                        </Col>

                        <Col lg={3} md={3} sm={6}>
                          <div className="mb-2">
                            <Label className="header-child">
                              Coloader Chargeable Weight* :
                            </Label>
                            <Input
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.chargeable_weight || ""}
                              invalid={
                                validation.touched.chargeable_weight &&
                                  validation.errors.chargeable_weight
                                  ? true
                                  : false
                              }
                              type="number"
                              min={0}
                              className="form-control-md"
                              id="input"
                              name="chargeable_weight"
                              placeholder="Enter Manifest Weight"
                            />
                          </div>
                        </Col>

                        <Col lg={3} md={3} sm={6}>
                          <div className="mb-2">
                            <Label className="header-child">Rate* :</Label>
                            <Input id="input" disabled placeholder="Enter Rate" />
                          </div>
                        </Col>
                        <Col lg={3} md={3} sm={6}>
                          <div className="mb-2">
                            <Label className="header-child">
                              Other Charges* :
                            </Label>
                            <Input
                              id="input"
                              disabled
                              placeholder="Enter Charges"
                            />
                          </div>
                        </Col>
                        <Col lg={3} md={3} sm={6}>
                          <div className="mb-2">
                            <Label className="header-child">
                              Carrier Charges
                            </Label>
                            <Input
                              id="input"
                              disabled
                              placeholder="Enter Charges"
                            />
                          </div>
                        </Col>
                        <Col lg={3} md={3} sm={6}>
                          <div className="mb-2">
                            <Label className="header-child">Tax Slab</Label>
                            <Input
                              id="input"
                              disabled
                              placeholder="Enter Tax Slab"
                            />
                          </div>
                        </Col>
                        {/* <Col lg={3} md={3} sm={6}>
                          <div className="mb-2">
                            <Label className="header-child">Open Box</Label>
                            {
                              open_box ? 
                              <FiCheckSquare onClick={()=>{
                                setopen_box(!open_box)
                              }} />:
                              <FiSquare  onClick={()=>{
                                setopen_box(!open_box);
                               }}/>
                            }
                          
                          </div>
                        </Col>
                        {open_box &&
                        
                        <Col lg={3} md={3} sm={6}>
                          <div className="mb-2">
                            <Label className="header-child">Box Quantity</Label>
                            <Input
                              id="input"
                              placeholder="Enter Box Quantity"
                              value={box_quantity}
                              onChange={(e)=>{
                                setbox_quantity(e.target.value);
                              }}
                            />
                          </div>
                        </Col>
                        }
                         */}
                      </Row>
                    </CardBody>
                  ) : null}
                </Card>
              </Col>
            </div>
            {/* Packages */}
            <div className="m-3">
              <Col lg={12}>
                <Card className="shadow bg-white rounded">
                  <CardTitle className="mb-1 ">
                    <div className="btn-header">
                      <div className="btn-subheader">
                        <div
                          id="packages"
                          value="first"
                          style={{
                            background:
                              order_active_btn === "first" ? "#C4D7FE" : null,
                          }}
                          className="btn1 footer-text"
                          onClick={() => {
                            setorder_active_btn("first");
                          }}
                        >
                          Manifest Dimesions
                        </div>
                        <div
                          id="images"
                          value="second"
                          style={{
                            background:
                              order_active_btn === "second" ? "#C4D7FE" : null,
                          }}
                          className="btn2 footer-text"
                          onClick={() => {
                            setorder_active_btn("second");
                          }}
                        >
                          Forwarding Images
                        </div>
                      </div>
                      <div className="btn-icon">
                        <IconContext.Provider
                          value={{
                            className: "header-add-icon",
                          }}
                        >
                          <div onClick={toggle_circle4}>
                            {circle_btn4 ? (
                              <MdRemoveCircleOutline />
                            ) : (
                              <MdAddCircleOutline />
                            )}
                          </div>
                        </IconContext.Provider>
                      </div>
                    </div>
                  </CardTitle>

                  {circle_btn4 ? (
                    <CardBody>
                      {order_active_btn === "first" ? (
                        <>
                          <Row className="hide">
                            <Col md={3} sm={3}>
                              <div className="mb-3">
                                <Label className="header-child">Length</Label>
                                {row.map((item, index) => {
                                  return (
                                    <Input
                                      min={0}
                                      key={index}
                                      value={item[0]}
                                      type="number"
                                      className="form-control-md"
                                      id="input"
                                      style={{ marginBottom: "15px" }}
                                      placeholder="Enter Packages Length "
                                      onChange={(val) => {
                                        setlength(val.target.value);
                                        item[0] = val.target.value;
                                      }}
                                      onFocus={() => {
                                        setclicked(true);
                                      }}
                                    />
                                  );
                                })}
                              </div>
                            </Col>
                            <Col md={3} sm={3}>
                              <div className="mb-3">
                                <Label className="header-child">Breadth</Label>
                                {row.map((item, index) => (
                                  <Input
                                    min={0}
                                    key={index}
                                    value={item[1]}
                                    type="number"
                                    className="form-control-md"
                                    id="input"
                                    style={{ marginBottom: "15px" }}
                                    placeholder="Enter Packages Breadth"
                                    onChange={(val) => {
                                      setbreadth(val.target.value);
                                      item[1] = val.target.value;
                                    }}
                                  />
                                ))}
                              </div>
                            </Col>
                            <Col md={3} sm={3}>
                              <div className="mb-3">
                                <Label className="header-child">Height</Label>
                                {row.map((item, index) => (
                                  <Input
                                    min={0}
                                    key={index}
                                    value={item[2]}
                                    type="number"
                                    className="form-control-md d"
                                    id="input"
                                    style={{ marginBottom: "15px" }}
                                    placeholder="Enter Packages Height"
                                    onChange={(val) => {
                                      setheight(val.target.value);
                                      item[2] = val.target.value;
                                    }}
                                  />
                                ))}
                              </div>
                            </Col>
                            <Col md={row.length > 1 ? 2 : 3} sm={3}>
                              <div className="mb-3">
                                <Label className="header-child">
                                  No of Pieces
                                </Label>
                                {row.map((item, index) => (
                                  <Input
                                    min={0}
                                    key={index}
                                    // value={item[3] + pieces}
                                    value={item[3]}
                                    type="number"
                                    className="form-control-md"
                                    id="input"
                                    style={{ marginBottom: "15px" }}
                                    placeholder="Enter No of Pieces"
                                    onChange={(val) => {
                                      setpieces(val.target.value);
                                      item[3] = val.target.value;
                                    }}
                                  />
                                ))}
                              </div>
                            </Col>

                            <Col lg={1}>
                              <div
                                className="mb-3"
                                style={{ textAlign: "center" }}
                              >
                                {row.length > 1 ? (
                                  <Label className="header-child">Delete</Label>
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
                                        <div style={{ height: "14.5px" }}></div>
                                        <div
                                          onClick={() => {
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

                          {row.length < 20 && (
                            <div>
                              <span
                                className="link-text"
                                onClick={() => {
                                  if (length && breadth && height && pieces) {
                                    addPackage();
                                  } else {
                                    alert("Packages is required");
                                  }
                                }}
                              >
                                <IconContext.Provider
                                  value={{
                                    className: "link-text",
                                  }}
                                >
                                  <MdAdd />
                                </IconContext.Provider>
                                Add Another Packages
                              </span>
                            </div>
                          )}
                        </>
                      ) : (
                        ""
                      )}
                      {showModal ? (
                        <Main_c
                          modal={showModal}
                          modal_set={setshowModal}
                          upload_image={(val) => setdocument([...document, val])}
                          result_image={(val) =>
                            setdoc_result_image([...doc_result_image, val])
                          }
                        />
                      ) : null}
                      {order_active_btn === "second" ? (
                        <Row className="hide">
                          <Col md={row1.length > 1 ? 5 : 6} sm={5}>
                            <div className="mb-3">
                              <Label className="header-child">Image</Label>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  border: "1px solid #dad7d7",
                                  alignItems: "center",
                                  height: "38px",
                                }}
                                onClick={() => {
                                  setshowModal(true);
                                }}
                              >
                                <div style={{ marginLeft: "3px" }}>
                                  Chooose File
                                </div>
                                <div
                                  style={{
                                    fontSize: "25px",
                                    color: "#dad7d7",
                                    marginLeft: "5px",
                                  }}
                                >
                                  |
                                </div>
                                {doc_result_image.length !== 0 ? (
                                  <div>Image Not Uploaded</div>
                                ) : (
                                  <div>Image Uploaded</div>
                                )}
                              </div>
                            </div>
                          </Col>
                          <Col lg={6} md={6} sm={6}>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              {doc_result_image.length !== 0 ? (
                                <div style={{ flex: 1 }}>
                                  {doc_result_image.map((e, i) => {
                                    return (
                                      <div
                                        style={{
                                          width: "100%",
                                          flexDirection: "column",
                                          justifyContent: "space-between",
                                        }}
                                      >
                                        <img
                                          src={e}
                                          style={{
                                            height: "110px",
                                            width: "110px",
                                            borderRadius: "10px",
                                            padding: 20,
                                          }}
                                          key={i}
                                        />
                                        <MdDeleteForever
                                          size={30}
                                          color="#ff7b7b"
                                          style={{ marginLeft: 50 }}
                                          onClick={() => {
                                            let filterData =
                                              doc_result_image.filter(
                                                (fe, fi) => i !== fi
                                              );
                                            console.log(
                                              "filerData----------------------",
                                              filterData
                                            );
                                            setdoc_result_image(filterData);
                                            let documentfilterData =
                                              document.filter(
                                                (fe, fi) => i !== fi
                                              );
                                            console.log(
                                              "documentfilerData----------------------",
                                              documentfilterData
                                            );
                                            setdocument(documentfilterData);
                                          }}
                                        />
                                        {/* <a>Delete</a> */}
                                      </div>
                                    );
                                  })}
                                </div>
                              ) : (
                                <div
                                  style={{
                                    marginTop: "28px",
                                    color: "red",
                                    fontSize: "14px",
                                  }}
                                >
                                  {" "}
                                  No Image Has Been Selected
                                </div>
                              )}
                            </div>
                          </Col>

                          <Col md={1}>
                            <div className="mb-3" style={{ textAlign: "center" }}>
                              {row1.length > 1 ? (
                                <Label className="header-child">Delete</Label>
                              ) : null}
                              {row1.map((item1, index1) => (
                                <IconContext.Provider
                                  key={index1}
                                  value={{
                                    className: "icon multi-input",
                                  }}
                                >
                                  {row1.length > 1 ? (
                                    <>
                                      <div style={{ height: "14.5px" }}></div>
                                      <div
                                        onClick={() => {
                                          deleteimage(item1);
                                        }}
                                      >
                                        <MdDeleteForever
                                          style={{
                                            alignItems: "center",
                                            background: "",
                                          }}
                                        />
                                      </div>
                                    </>
                                  ) : null}
                                </IconContext.Provider>
                              ))}
                            </div>
                          </Col>
                          <div>
                            <span
                              className="link-text"
                              onClick={() => {
                                if (doc_result_image.length !== 0) {
                                  setshowModal(true);
                                } else {
                                  alert("Order images is required");
                                }
                              }}
                            >
                              <IconContext.Provider
                                value={{
                                  className: "icon",
                                }}
                              >
                                <MdAdd />
                              </IconContext.Provider>
                              Add Another Manifest Images
                            </span>
                          </div>
                        </Row>
                      ) : (
                        ""
                      )}
                    </CardBody>
                  ) : null}
                </Card>
              </Col>
            </div>
            {/* Footer */}
            <div className="m-3">
              <Col lg={12}>
                <div className="mb-1 footer_btn">
                  <Button type="submit" className="btn btn-info m-1 cu_btn">
                    Forward
                  </Button>

                  <Button
                    type="button"
                    className="btn btn-info m-1 cu_btn"
                    onClick={() => setShow(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </Col>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddHubVehicle;
