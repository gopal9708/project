/* eslint-disable */
import React, { useState, useEffect, useLayoutEffect } from "react";
import "../../../assets/scss/forms/form.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { MdDeleteForever, MdAdd } from "react-icons/md";
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
import { IconContext } from "react-icons";
import { MdAddCircleOutline, MdRemoveCircleOutline } from "react-icons/md";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import toTitleCase from "../../../lib/titleCase/TitleCase";
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
import EditManifestDataFormat from "./editManifestOrders/EditManifestDataFormat";
import AddAnotherOrder from "./AddAnotherOrder";
import SearchInput from "../../../components/formComponent/searchInput/SearchInput";

const EditHub = () => {
  const accessToken = useSelector((state) => state.authentication.access_token);
  const search = useSelector((state) => state.searchbar.search_item);
  const [page, setpage] = useState(1);
  const [refresh, setrefresh] = useState("false");
  const dispatch = useDispatch();
  const location_data = useLocation();
  // console.log("location_data--------hub-", location_data)
  const user_id = useSelector((state) => state.authentication.userdetails.id);
  const navigate = useNavigate();
  const [hub_data, sethub_data] = useState([])
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

  // Navigation At the time of Cancel
  const handleAction = () => {
    dispatch(setToggle(true));
    navigate("/manifest/pendingtodepart");
  };

  const [order_active_btn, setorder_active_btn] = useState("first");

  //  State For Cropping In React Crop
  const [showModal, setshowModal] = useState(false);
  const [document, setdocument] = useState([]);
  const [doc_result_image, setdoc_result_image] = useState([]);

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

  // adding extra input fields in Order Images
  const [selectedFile, setSelectedFile] = useState("");

  let dimension_list1 = [selectedFile];
  const [row1, setrow1] = useState([dimension_list1]);

  // adding extra input fields in Invoice
  const [invoice_img, setinvoice_img] = useState("");
  const [invoice_no, setinvoice_no] = useState("");
  const [invoice_value, setinvoice_value] = useState("");

  let dimension_list2 = [invoice_img, invoice_no, invoice_value];
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
  const [from_branch, setfrom_branch] = useState("");
  const [to_branch, setto_branch] = useState("");
  const [hub_no, sethub_no] = useState("");
  const [hub_id, sethub_id] = useState("");
  const success = useSelector((state) => state.alert.show_alert);

  const [data, setdata] = useState([]);

  const [coloader_mode_list, setcoloader_mode_list] = useState([

  ]);
  const [coloader_mode, setcoloader_mode] = useState("");
  const [search_text, setsearch_text] = useState("")
  const [coloader_list, setcoloader_list] = useState([]);
  const [coloader_selected, setcoloader_selected] = useState("");
  const [coloader_id, setcoloader_id] = useState("");

  const [total_bags, settotal_bags] = useState("");
  const [total_bag_error, settotal_bag_error] = useState(false);

  const [manifest_weight, setmanifest_weight] = useState("");
  const [manifest_weight_error, setmanifest_weight_error] = useState(false);

  const [airway_bill_no, setairway_bill_no] = useState("");
  const [airway_bill_no_error, setairway_bill_no_error] = useState(false);

  // Validation
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      coloader_no: hub_data.airwaybill_no || "",
      vehicle_no: hub_data.vehicle_no || "",
      actual_weight: hub_data.total_weight || "",
      chargeable_weight: hub_data.chargeable_weight || "",
      driver_name: hub_data.driver_name || "",
      supporting_staff: hub_data.supporting_staff || "",
    },

    validationSchema: Yup.object({
      coloader_no: Yup.string().required("Coloader No is required"),
      vehicle_no: Yup.string().required("Vehicle Number is required"),
      actual_weight: Yup.string().required("Manifest Weight is required"),
      driver_name: Yup.string().required("Driver Name is required"),
      supporting_staff: Yup.string().required("Spporting Staff Name is required"),
    }),

    onSubmit: (values) => {
      updateManifest(values);
    },
  });

  const get_company = () => {
    axios
      .get(
        ServerAddress +
        `master/get_company/?search=${""}&p=${page}&records=${10}&branch_name=${[
          "",
        ]}&branch_city=${[""]}&branch_search=${search_text}`,
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

          if (data.service_type === 'DIRECT VEHICLE') {
            temp.push('Direct Vehicle')
          }
          else if (data.service_type === 'PART LOAD VEHICLE') {
            temp.push('Part Load')
          }
          else if (data.service_mode === 'FORWARDING BY TRAIN') {
            temp.push('By Train')
          }
          else if (data.service_type === 'DIRECT VEHICLE' || data.service_type === 'KG WISE' || data.service_type === 'PART LOAD VEHICLE') {
            temp.push('By Road')
          }

        }
        setcoloader_mode_list([...new Set(temp)])

      })
      .catch((err) => {
        alert(`Error Occur in Get vendor service, ${err}`);
      });
  };

  useEffect(() => {
    if (coloader_id !== "") {
      getVendorService(coloader_id)
    }
  }, [coloader_id])

  useLayoutEffect(() => {
    get_company();
  }, [search, page]);

  useLayoutEffect(() => {
    let manifest_data = location_data.state.hub;
    sethub_data(manifest_data)
    sethub_no(manifest_data.hub_transfer_no);
    sethub_id(manifest_data.id);
    setfrom_branch(toTitleCase(manifest_data.orgin_branch_name));
    setto_branch(toTitleCase(manifest_data.destination_branch_name));
    setcoloader_id(manifest_data.coloader);
    setcoloader_selected(toTitleCase(manifest_data.coloader_name));
    setcoloader_mode(toTitleCase(manifest_data.coloader_mode));
    settotal_bags(manifest_data.bag_count);
  }, []);

  const get_orderof_manifest = () => {
    axios
      .get(ServerAddress + `manifest/get_hub_orders/?hub_no=${hub_no}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        setdata(response.data);
      })
      .catch((err) => {
        alert(`Error While Loading Client , ${err}`);
      });
  };

  useLayoutEffect(() => {
    hub_no && get_orderof_manifest();
  }, [hub_no,success]);


  useEffect(() => {
    console.log("row----------------", row)
    if (location_data.state.hub.packages.length > 0) {
      let temp = location_data.state.hub.packages
      let temp_list = []
      let temp_list2 = []
      for (let index = 0; index < temp.length; index++) {
        temp_list.push([
          temp[index].length,
          temp[index].breadth,
          temp[index].height,
          temp[index].pieces,
          temp[index].id,
        ]);
        temp_list2.push(temp[index].id);
      }
      setrow(temp_list);
      setlength(temp_list[0][0]);
      setbreadth(temp_list[0][1]);
      setheight(temp_list[0][2]);
      setpieces(temp_list[0][3]);
      setpackage_id_list(temp_list2);
      setpackages_id(temp_list2);

    }
  }, [location_data])

  useEffect(() => {
    if (package_id_list !== "") {
      let id_list = packages_id.filter(
        (p) => package_id_list.indexOf(p) === -1
      );
      setdeleted_packages_id(id_list);
    }
  }, [package_id_list, packages_id]);

  const updateManifest = (values) => {
    axios
      .put(
        ServerAddress + "manifest/update_hub_manifest/" + hub_data.id,
        {
          coloader_mode: coloader_mode.toUpperCase(),
          coloader: coloader_id,
          airwaybill_no: values.coloader_no,
          // forwarded_at: today,
          bag_count: total_bags,
          total_weight: values.actual_weight,
          chargeable_weight: values.chargeable_weight,
          coloader_name: coloader_selected.toUpperCase(),
          carrier_name: toTitleCase(values.vehicle_no).toUpperCase(),
          update: "True",
          forwarded_by: user_id,
          forwarded: "False",
          departed: "False",
          // forwarded_branch: user_branch,
          modified_by: user_id,
          hub_packages: row,
          vehicle_no: values.vehicle_no,
          driver_name: values.driver_name,
          supporting_staff: values.supporting_staff,
          deleted_packages: deleted_packages_id,
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
            setDataExist(`Manifest Updated sucessfully`)
          );
          dispatch(setAlertType("info"));
          navigate(-1)
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
              `Already exists`
            )
          );
          dispatch(setAlertType("warning"));
        }
      })
      .catch(function (err) {
        alert(`Error While  Updateing Manifest ${err}`);
      });
  };

  return (
    <>
      <div>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            validation.handleSubmit(e.values);
            return false;
          }}
        >
          <div className="mt-3">
            <PageTitle page={"Edit Hub Manifest"} />
            <Title title={"Edit Hub Manifest"} parent_title="Manifests" />
          </div>

          {/* Company Info */}
          <div className="m-3">
            <Col lg={12}>
              <Card className="shadow bg-white rounded">
                <CardTitle className="mb-1 header">
                  <div className="header-text-icon header-text">
                    Hub Manifest Info111 :
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
                          <Label className="header-child">Manifest No* :</Label>

                          <Input id="input" disabled value={hub_no} />
                        </div>
                      </Col>
                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-2">
                          <Label className="header-child">From Branch* :</Label>
                          <Input id="input" disabled value={from_branch} />
                        </div>
                      </Col>

                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-2">
                          <Label className="header-child">To Branch* :</Label>
                          <Input id="input" disabled value={to_branch} />
                        </div>
                      </Col>

                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-2">
                          <Label className="header-child">
                            Select Coloader:
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
                            search_item={search_text}
                            setsearch_item={setsearch_text}
                          />
                        </div>
                      </Col>

                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-2">
                          <Label className="header-child">
                            Coloader Mode :
                          </Label>
                          <NSearchInput
                            data_list={coloader_mode_list}
                            data_item_s={coloader_mode}
                            set_data_item_s={setcoloader_mode}
                            show_search={false}
                            error_message={"Please Select Coloader Mode"}
                          />
                        </div>
                      </Col>

                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-2">
                          <Label className="header-child">Total Bags </Label>
                          <Input
                            value={total_bags}
                            onChange={(e) => {
                              settotal_bags(e.target.value);
                            }}
                            onBlur={() => {
                              settotal_bag_error(true);
                            }}
                            invalid={total_bags == "" && total_bag_error}
                            type="text"
                            className="form-control-md"
                            id="input"
                            name="total_bags"
                            placeholder="Enter No Of Bags"
                          />
                          {total_bags == "" && total_bag_error ? (
                            <FormFeedback type="invalid">
                              Total Bages is required
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                      <Col lg={4} md={6} sm={6}>
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

                      <Col lg={4} md={6} sm={6}>
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
                        {validation.touched.chargeable_weight &&
                          validation.errors.chargeable_weight ? (
                          <FormFeedback type="invalid">
                            {validation.errors.chargeable_weight}
                          </FormFeedback>
                        ) : null}
                      </Col>
                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-2">
                          <Label className="header-child">
                            Co-loader No / Airway bill no* :{" "}
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
                            type="number"
                            min={0}
                            className="form-control-md"
                            id="input"
                            name="coloader_no"
                            placeholder="Enter Manifest Weight"
                          />
                          {validation.touched.coloader_no &&
                            validation.errors.coloader_no ? (
                            <FormFeedback type="invalid">
                              {validation.errors.coloader_no}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-2">
                          <Label className="header-child">
                            Vehicle Number* :
                          </Label>
                          <Input
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.vehicle_no}
                            invalid={
                              validation.touched.vehicle_no &&
                                validation.errors.vehicle_no
                                ? true
                                : false
                            }
                            type="text"
                            className="form-control-md"
                            id="input"
                            name="vehicle_no"
                            placeholder="Enter Vehicle Number"
                          />
                          {validation.touched.vehicle_no &&
                            validation.errors.vehicle_no ? (
                            <FormFeedback type="invalid">
                              {validation.errors.vehicle_no}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-2">
                          <Label className="header-child">
                            Driver Name* :
                          </Label>
                          <Input
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.driver_name}
                            invalid={
                              validation.touched.driver_name &&
                                validation.errors.driver_name
                                ? true
                                : false
                            }
                            type="text"
                            className="form-control-md"
                            id="input"
                            name="driver_name"
                            placeholder="Enter Driver Name"
                          />
                          {validation.touched.driver_name &&
                            validation.errors.driver_name ? (
                            <FormFeedback type="invalid">
                              {validation.errors.driver_name}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-2">
                          <Label className="header-child">
                            Spporting Staff* :
                          </Label>
                          <Input
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.supporting_staff}
                            invalid={
                              validation.touched.supporting_staff &&
                                validation.errors.supporting_staff
                                ? true
                                : false
                            }
                            type="text"
                            className="form-control-md"
                            id="input"
                            name="supporting_staff"
                            placeholder="Enter Spporting Staff Name"
                          />
                          {validation.touched.supporting_staff &&
                            validation.errors.supporting_staff ? (
                            <FormFeedback type="invalid">
                              {validation.errors.supporting_staff}
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

          {/* Colader Services */}
          <div className="m-3">
            <Col lg={12}>
              <Card className="shadow bg-white rounded">
                <CardTitle className="mb-1 header">
                  <div className="header-text-icon header-text">
                    Docket Info
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                      }}
                    >
                      <AddAnotherOrder
                        id_m={hub_no}
                        refresh={refresh}
                        setrefresh={setrefresh}
                      />
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
                  </div>
                </CardTitle>
                {circle_btn1 ? (
                  <CardBody>
                    <EditManifestDataFormat Manifest_list={data} />
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
                  Save
                </Button>

                <Button
                  type="button"
                  className="btn btn-info m-1 cu_btn"
                  onClick={handleAction}
                >
                  Cancel
                </Button>
              </div>
            </Col>
          </div>
        </Form>
      </div>
    </>
  );
};

export default EditHub;
