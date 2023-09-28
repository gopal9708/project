/* eslint-disable */
import React, { useState, useEffect, useLayoutEffect } from "react";
import "../../../assets/scss/forms/form.scss";
import { MdDeleteForever, MdAdd } from "react-icons/md";
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
import SearchInput from "../../../components/formComponent/searchInput/SearchInput";
import EditManifestDataFormat from "./editManifestOrders/EditManifestDataFormat";
import AddAnotherOrder from "./AddAnotherOrder";

const EditManifest = () => {
  const user = useSelector((state) => state.authentication.userdetails);
  const user_id = useSelector((state) => state.authentication.userdetails.id);
  const accessToken = useSelector((state) => state.authentication.access_token);
  const success = useSelector((state) => state.alert.show_alert);

  const [refresh, setrefresh] = useState("false");
  const dispatch = useDispatch();
  const location_data = useLocation();
  // console.log("location_data-mnnn7777777777--", location_data);
  const navigate = useNavigate();

  //Circle Toogle Btn
  const [circle_btn, setcircle_btn] = useState(true);
  const toggle_circle = () => {
    setcircle_btn(!circle_btn);
  };
  const [circle_btn4, setcircle_btn4] = useState(true);
  const toggle_circle4 = () => {
    setcircle_btn4(!circle_btn4);
  };

  const [circle_btn1, setcircle_btn1] = useState(true);
  const toggle_circle1 = () => {
    setcircle_btn1(!circle_btn1);
  };

  const [circle_btn2, setcircle_btn2] = useState(true);
  const toggle_circle2 = () => {
    setcircle_btn2(!circle_btn2);
  };

  // Navigation At the time of Cancel
  const handleAction = () => {
    dispatch(setToggle(true));
    navigate("/manifest/pendingtodepart");
  };
  const [order_active_btn, setorder_active_btn] = useState("first");

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
  const [today, settoday] = useState("");

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

  // used for validation
  const [total_bag_error, settotal_bag_error] = useState(false);
  const [manifest_weight_error, setmanifest_weight_error] = useState(false);
  const [airway_bill_no_error, setairway_bill_no_error] = useState(false);
  const [flight_name_error, setflight_name_error] = useState(false);

  const [coloader_list, setcoloader_list] = useState([]);
  const [coloader_selected, setcoloader_selected] = useState("");
  const [coloader_id, setcoloader_id] = useState("");
  const [search, setsearch] = useState("");
  const [page, setpage] = useState(1);

  const [from_branch, setfrom_branch] = useState("");
  const [to_branch, setto_branch] = useState("");
  const [manifest_no, setmanifest_no] = useState("");
  const [manifest_id, setmanifest_id] = useState("");
  const [total_bags, settotal_bags] = useState("");
  const [manifest_weight, setmanifest_weight] = useState("");
  const [airway_bill_no, setairway_bill_no] = useState("");
  const [coloader_mode, setcoloader_mode] = useState("");
  const [company_slected_list, setcompany_slected_list] = useState("");
  const [flight_name, setflight_name] = useState("");
  const [data, setdata] = useState([]);
  const [coloader_mode_list, setcoloader_mode_list] = useState([
    // "Direct Awb",
    // "Air Console",
    // "By Road (Surface)",
    // "By Train",
    // "Direct Vehicle",
    // "Partload",
  ]);
  useLayoutEffect(() => {
    let manifest_data = location_data.state.depart;
    setmanifest_no(manifest_data.manifest_no);
    setmanifest_id(manifest_data.id);
    setfrom_branch(toTitleCase(manifest_data.from_branch_n));
    setto_branch(toTitleCase(manifest_data.to_branch_n));
    setcoloader_mode(toTitleCase(manifest_data.coloader_mode));
    setcoloader_id(manifest_data.coloader);
    setcoloader_selected(toTitleCase(manifest_data.coloader_name));
    settotal_bags(manifest_data.bag_count);
    setmanifest_weight(manifest_data.total_weight);
    setairway_bill_no(manifest_data.airwaybill_no);
    setflight_name(toTitleCase(manifest_data.carrier_name));
  }, []);

  const get_company = () => {
    axios
      .get(
        ServerAddress +
        `master/get_company/?search=${""}&p=${page}&records=${10}&branch_name=${[
          "",
        ]}&branch_city=${[""]}&branch_search=${search}`,
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
  const get_orderof_manifest = () => {
    axios
      .get(
        ServerAddress +
        `manifest/get_manifest_order/?manifest_no=${manifest_no}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        setdata(response.data);
      })
      .catch((err) => {
        alert(`Error While Loading Client , ${err}`);
      });
  };
  useLayoutEffect(() => {
    get_company();
  }, [search, page]);

  useLayoutEffect(() => {
    manifest_no && get_orderof_manifest();
  }, [manifest_no, success]);

  const updateManifest = () => {
    axios
      .put(
        ServerAddress + "manifest/update_manifest/" + manifest_id,
        {
          coloader_mode: coloader_mode,
          coloader: coloader_id,
          airwaybill_no: airway_bill_no,
          bag_count: total_bags,
          total_weight: manifest_weight,
          coloader_name: coloader_selected,
          carrier_name: flight_name,
          update: "True",
          forwarded: "False",
          departed: "False",
          modified_by: user_id,
          forwarded_branch_name: from_branch,
          forwarded_branch: location_data.state.depart.forwarded_branch,
          manifest_packages: row,
          manifest_no: manifest_no,
          deleted_packages: deleted_packages_id,
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
            setDataExist(`Manifest of  ${manifest_no} Forwarded sucessfully`)
          );
          dispatch(setAlertType("info"));
          navigate(-1);
        }
      })
      .catch(function (err) {
        alert(`Error While  Updating Manifest ${err}`);
      });
  };



  useEffect(() => {
    console.log("row----------------", row)
    if (location_data.state.depart.packages.length > 0) {
      let temp = location_data.state.depart.packages
      let temp_list = []
      let temp_list2 = []
      for (let index = 0; index < temp.length; index++) {
        temp_list.push([
          temp[index].manifest_length,
          temp[index].manifest_breadth,
          temp[index].manifest_height,
          temp[index].manifest_pieces,
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
    if (coloader_id !== "") {
      getVendorService(coloader_id)
    }
  }, [coloader_id])

  useEffect(() => {
    if (package_id_list !== "") {
      let id_list = packages_id.filter(
        (p) => package_id_list.indexOf(p) === -1
      );
      setdeleted_packages_id(id_list);
    }
  }, [package_id_list, packages_id]);


  
  
  return (
    <>
      <div>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            if (total_bags == "") {
              settotal_bag_error(true);
            }
            if (manifest_weight == "") {
              setmanifest_weight_error(true);
            }
            if (airway_bill_no == "") {
              setairway_bill_no_error(true);
            }
            if (flight_name == "") {
              setflight_name_error(true);
            }
            validation.handleSubmit(e.values);
            return false;
          }}
        >
          <div className="mt-3">
            <PageTitle page={"Market Hired "} />
            <Title title={"Market Hired "} parent_title="Manifests" />
          </div>

          {/* Company Info */}
          <div className="m-3">
            <Col lg={12}>
              <Card className="shadow bg-white rounded">
                <CardTitle className="mb-1 header">
                  <div className="header-text-icon header-text">
                    Forwarding Info :
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

                          <Input id="input" disabled value={manifest_no} />
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
                            search_item={search}
                            setsearch_item={setsearch}
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
                          Coloader Actual Weight*
                          </Label>
                          <Input
                            value={manifest_weight}
                            onChange={(e) => {
                              setmanifest_weight(e.target.value);
                            }}
                            onBlur={() => {
                              setmanifest_weight_error(true);
                            }}
                            invalid={
                              manifest_weight == "" && manifest_weight_error
                            }
                            type="text"
                            className="form-control-md"
                            id="input"
                            name="manifest_weight"
                            placeholder="Enter Manifest Weight"
                          />
                          {manifest_weight == "" && manifest_weight_error ? (
                            <FormFeedback type="invalid">
                              Manifest Weight is required
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-2">
                          <Label className="header-child">
                            Co-loader No / Airway bill no* :{" "}
                          </Label>
                          <Input
                            value={airway_bill_no}
                            onChange={(e) => {
                              setairway_bill_no(e.target.value);
                            }}
                            onBlur={() => {
                              setairway_bill_no_error(true);
                            }}
                            invalid={
                              airway_bill_no == "" && airway_bill_no_error
                            }
                            type="text"
                            className="form-control-md"
                            id="input"
                            name="manifest_weight"
                            placeholder="Enter Manifest Weight"
                          />
                          {airway_bill_no == "" && airway_bill_no_error ? (
                            <FormFeedback type="invalid">
                              Airway bill no is required
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-2">
                          <Label className="header-child">
                            Flight Name & Number :* :{" "}
                          </Label>
                          <Input
                            value={flight_name}
                            onChange={(e) => {
                              setflight_name(e.target.value);
                            }}
                            onBlur={() => {
                              setflight_name_error(true);
                            }}
                            invalid={flight_name == "" && flight_name_error}
                            type="text"
                            className="form-control-md"
                            id="input"
                            name="manifest_weight"
                            placeholder="Enter Manifest Weight"
                          />
                          {flight_name == "" && flight_name_error ? (
                            <FormFeedback type="invalid">
                              Flight Name is required
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
                        id_m={manifest_no}
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
                    {order_active_btn === "second" ? (
                      <Row className="hide">
                        <Col md={row1.length > 1 ? 5 : 6} sm={5}>
                          <div className="mb-3">
                            <Label className="header-child">Image</Label>
                            {row1.map((item1, index1) => (
                              <Input
                                style={{ marginBottom: "15px" }}
                                key={index1}
                                className="form-control-md"
                                type="file"
                                id="input"
                                onChange={(event) => {
                                  setSelectedFile(event.target.files[0]);
                                  item1[0] = event.target.files;
                                }}
                              />
                            ))}
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
                              if (selectedFile) {
                                addorderimage();
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
                <Button
                  type="button"
                  className="btn btn-info m-1 cu_btn"
                  onClick={() => {
                    updateManifest();
                  }}
                >
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

export default EditManifest;
