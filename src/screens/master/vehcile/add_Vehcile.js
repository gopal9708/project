import React, { useState, useEffect, useLayoutEffect } from "react";
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
  Button,
} from "reactstrap";
import PageTitle from "../../../components/pageTitle/PageTitle";
import Title from "../../../components/title/Title";
import { useDispatch, useSelector } from "react-redux";
import { IconContext } from "react-icons";
import { MdAddCircleOutline, MdRemoveCircleOutline } from "react-icons/md";
import axios from "axios";
import NSearchInput from "../../../components/formComponent/nsearchInput/NSearchInput";
import {
  setAlertType,
  setDataExist,
  setShowAlert,
} from "../../../store/alert/Alert";
import { ServerAddress } from "../../../constants/ServerAddress";
import { setToggle } from "../../../store/pagination/Pagination";
import toTitleCase from "../../../lib/titleCase/TitleCase";
import { useLocation, useNavigate } from "react-router-dom";
import SearchInput from "../../../components/formComponent/searchInput/SearchInput";
import TransferList from "../../../components/formComponent/transferList/TransferList";
import ImgModal from "../../../components/crop/ImgModal";

const Add_Vehcile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location_data = useLocation();

  // vendor State
  const [vendor_list, setvendor_list] = useState([]);
  const [vendor_name, setvendor_name] = useState("");
  const [vendor_id, setvendor_id] = useState("");
  const [vendor_n_page, setvendor_n_page] = useState(1);
  const [search_vendor_name, setsearch_vendor_name] = useState("");
  const [vendor_error, setvendor_error] = useState(false);
  const [refresh, setrefresh] = useState(false);
  const accessToken = useSelector((state) => state.authentication.access_token);
  const [is_updating, setis_updating] = useState(false);
  const toggle_circle = () => {
    setcircle_btn(!circle_btn);
  };
  const [circle_btn, setcircle_btn] = useState(true);
  //   State For Saving For Data
  const [vehcile_owner, setvehcile_owner] = useState([
    "Owned Vehicle",
    "Partner Vehicle",])
  const [vehcile_owner_s, setvehcile_owner_s] = useState("")
  const [vehicle_owner_error, setvehicle_owner_error] = useState(false)

  const [vehcile_type, setvehcile_type] = useState([
    "Truck",
    "Van",
    "Bike",
  ]);
  const [active_list, setactive_list] = useState(["Active", "Inactive"]);
  const [active_selected, setactive_selected] = useState("Active");
  const [vehcile_type_s, setvehcile_type_s] = useState("");
  const [vehcile_no, setvehcile_no] = useState("");
  const [vehcile_capacity, setvehcile_capacity] = useState("")
  // vehcile image 
  const [modal, setmodal] = useState(false);
  const [uploaded_img, setuploaded_img] = useState("");
  const [result_img, setresult_img] = useState("")
  const [vehcile_img_error, setvehcile_img_error] = useState(false);

  const [vehcile_model, setvehcile_model] = useState("");
  const [vendor_data, setvendor_data] = useState([]);
  const [vehcile, setvehicle] = useState([]);

  const [branch_id, setbranch_id] = useState("");
  const [branch_list, setbranch_list] = useState([]);
  const [branch_list2, setbranch_list2] = useState([])
  // console.log("branch_list2----", branch_list2)
  const [branch, setbranch] = useState("");
  const [search_branch, setsearch_branch] = useState("");
  const [branch_count, setbranch_count] = useState(1)
  const [branch_loaded, setbranch_loaded] = useState(false)
  const [branch_bottom, setbranch_bottom] = useState(103)
  const [branch_err, setbranch_err] = useState(false);
  const [page, setpage] = useState(1);

  useEffect(() => {
    try {
      if (location_data.state.vehcile) {

        setis_updating(true);
        let vehicle_data = location_data.state.vehcile;
        // console.log("vehicle_data===", vehicle_data)
        setvehicle(vehicle_data);
        setbranch(toTitleCase(vehicle_data.branch_name));
        setbranch_id(vehicle_data.branch);
        setvehcile_type_s(toTitleCase(vehicle_data.vehcile_type));
        setvehcile_capacity(vehicle_data.vehcile_capacity);
        setvehcile_owner_s(toTitleCase(vehicle_data.vehcile_owner));
        setvehcile_no(vehicle_data.vehcile_no);
        setvehcile_model(toTitleCase(vehicle_data.vehcile_model));
        setactive_selected(vehicle_data.active_selected);
        setvendor_name(toTitleCase(vehicle_data.transporter));
        setresult_img(vehicle_data.image);
        if (vehicle_data.vehcile_status === true) {
          setactive_selected("Active")
        }
        else {
          setactive_selected("Inactive")

        }
      }

    } catch (error) { }
  }, []);

  //   Api For Posting Data
  const add_vehcile = () => {
    let branch_id = branch_list2.map((v) => v[0]);

    let branch_id_list = [...new Set(branch_id.map((v) => `${v}`))].map((v) =>
      parseInt(v.split(","))
    );
    axios
      .post(
        ServerAddress + "master/add_vehcile/",
        {
          vehcile_no: toTitleCase(vehcile_no).toUpperCase(),
          vehcile_model: toTitleCase(vehcile_model).toUpperCase(),
          vehcile_status: active_selected === "Active" ? "True" : "False",
          vehcile_type: (vehcile_type_s).toUpperCase(),
          transporter_name: vendor_id,
          branch: branch_id_list,
          vehcile_image: result_img,
          vehcile_capacity: toTitleCase(vehcile_capacity).toUpperCase(),
          vehcile_owner: toTitleCase(vehcile_owner_s).toUpperCase(),
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
              `Vehcile  "${vehcile_no.toUpperCase()}" Added sucessfully`
            )
          );
          dispatch(setAlertType("success"));
          navigate("/master/Vehcile");
        } else if (response.data === "duplicate") {
          dispatch(setShowAlert(true));
          dispatch(
            setDataExist(
              `Vehcile No "${vehcile_no.toUpperCase()}" already exists`
            )
          );
          dispatch(setAlertType("warning"));
        }
      })
      .catch((error) => {
        alert(`Error Happen while posting Vehicle  Data ${error}`);
      });
  };

  const upadte_vehcile = (values) => {
    let id = vehcile.id;
    let branch_id_list = branch_list2.map((v) => v[0]).filter((v) => v !== null);

    let branch_ids = [...new Set(branch_id_list.map((v) => `${v}`))].map((v) =>
      parseInt(v.split(","))
    );
    let fields_names = Object.entries({
      branch: branch_ids,
      transporter: vendor_name ? vendor_name : "",
      vehcile_capacity: vehcile_capacity ? vehcile_capacity : "",
      vehcile_model: vehcile_model,
      vehcile_no: vehcile_no,
      vehcile_owner: vehcile_owner_s,
      vehcile_type: vehcile_type_s,
    });
    let change_fields = {};
    // console.log("fields_names ========", fields_names)
    var prom = new Promise((resolve, reject) => {
      for (let j = 0; j < fields_names.length; j++) {
        const ele = fields_names[j];
        let prev = location_data.state.vehcile[`${ele[0]}`];
        let new_v = ele[1];
        if (String(prev).toUpperCase() !== String(new_v).toUpperCase()) {
          change_fields[`${ele[0]}`] = new_v.toString().toUpperCase();
        }
        if (j === fields_names.length - 1) resolve();
      }
    });
    prom.then(() => {
      axios
        .put(
          ServerAddress + "master/update_vehicle/" + id,
          {
            vehcile_no: toTitleCase(vehcile_no).toUpperCase(),
            vehcile_model: toTitleCase(vehcile_model).toUpperCase(),
            vehcile_status: active_selected === "Active" ? "True" : "False",
            vehcile_type: (vehcile_type_s).toUpperCase(),
            transporter_name: vendor_id,
            branch: branch_ids,
            change_fields: change_fields,
            vehcile_image: result_img?.substring(0, 4) !== "http" ? result_img : null,
            vehcile_capacity: vehcile_capacity ? toTitleCase(vehcile_capacity).toUpperCase() : null,
            vehcile_owner: toTitleCase(vehcile_owner_s).toUpperCase(),
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
                `"${toTitleCase(
                  vehcile_no
                )}" Updated sucessfully`
              )
            );
            dispatch(setAlertType("info"));
            navigate(-1);
          } else if (response.data === "duplicate") {
            dispatch(setShowAlert(true));
            dispatch(
              setDataExist(
                `"${toTitleCase(
                  vehcile_no
                )}" already exists`
              )
            );
            dispatch(setAlertType("warning"));
          }
        })
        .catch(function () {
          alert("Error Error While  Updateing Vehicle");
        });
    });
  };

  const get_VehicleBranchDetails = (id) => {

    let branch_temp = [];
    let data = [];
    axios
      .get(
        ServerAddress +
        `master/get_vehicle_branch/?vehicle_id=${id}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        // console.log("V response====", response)
        data = response.data.vehicle_branch;

        if (data.length > 0) {
          branch_temp = data.filter((v) => v.branch !== null).map((v) => [v.branch, toTitleCase(v.branch__name)]);
          setbranch_list2(branch_temp)
        }
      })
      .catch((err) => {
        alert(`Error Occur in Get OpCity, ${err}`);
      });
  };

  const get_vendor = () => {
    let vendor_temp = [];
    let data = [];
    axios
      .get(
        ServerAddress +
        `master/all_vendor/?search=${""}&p=${vendor_n_page}&records=${10}&name_search=${search_vendor_name}&vendor_name=&data=all`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        data = response.data.results;
        // console.log("data printing", data);
        setvendor_data(data);
        if (response.data.results.length > 0) {
          if (vendor_n_page === 1) {
            vendor_temp = response.data.results.map((v) => [
              v.id,
              toTitleCase(v.name),
            ]);
          } else {
            vendor_temp = [
              ...vendor_list,
              ...response.data.results.map((v) => [v.id, v.name]),
            ];
          }
        }
        setvendor_list(vendor_temp);
      })
      .catch((err) => {
        alert(`Error Occur in Get , ${err}`);
      });
  };

  const getBranches = (val) => {
    let temp3 = [];

    axios
      .get(
        ServerAddress +
        `master/all_vehicle_branch/?search=${search_branch}&p=${page}&records=${10}&data=${val}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        if (response.data.next === null) {
          setbranch_loaded(false);
        } else {
          setbranch_loaded(true);
        }

        if (response.data.results.length > 0) {
          if (page === 1) {
            temp3 = response.data.results.map((v) => [
              v.id,
              toTitleCase(v.name),
            ]);
          } else {
            temp3 = [
              ...branch_list,
              ...response.data.results.map((v) => [v.id, toTitleCase(v.name)]),
            ];
          }
          setbranch_count(branch_count + 2)
          setbranch_list(temp3);
        }
        else {
          setbranch_list([]);
        }

      })
      .catch((err) => {
        alert(`Error Occur in Get`, err);
      });
  };

  useLayoutEffect(() => {
    if (location_data.state === null) {
      getBranches("all");
    }
  }, [page, search_branch]);

  useLayoutEffect(() => {
    if (location_data.state !== null) {
      getBranches(parseInt(location_data.state.vehcile.id));
    }
  }, [page, search_branch]);

  useLayoutEffect(() => {
    get_vendor();
  }, [vendor_n_page, search_vendor_name, refresh]);

  // used for error
  const [vehicle_type_error, setvehicle_type_error] = useState(false);
  const [vehicle_number_error, setvehicle_number_error] = useState(false);
  const [vehicle_model_error, setvehicle_model_error] = useState(false);
  const [vehicle_len_error, setvehicle_len_error] = useState(false);

  useEffect(() => {
    if (branch_list2?.length > 0) {
      setbranch_err(false);
    }
    if (vehcile_type_s !== "") {
      setvehicle_type_error(false);
    }
    if (vehcile_owner_s !== "") {
      setvehicle_owner_error(false);
    }
    if (vehcile_owner_s === "PARTNER VEHCILE" && vendor_name !== "") {
      setvendor_error(false);
    }
    if (vehcile_no !== "") {
      setvehicle_number_error(false);
    }
    if (vehcile_model !== "") {
      setvehicle_model_error(false);
    }
    if (result_img !== "") {
      setvehcile_img_error(false)
    }
    if (vehcile_no !== "" && vehcile_no.length !== 10) {
      setvehicle_len_error(true);
    } else {
      setvehicle_len_error(false);
    }
  }, [vehcile_type_s, vehcile_no, vehcile_model, result_img, branch_list2, vehcile_owner_s]);

  useEffect(() => {

    if (location_data.state !== null && vehcile.length !== 0) {
      get_VehicleBranchDetails(vehcile.id)
    }
  }, [vehcile])

  return (
    <div>
      <Form
      // onSubmit={(e) => {
      //   e.preventDefault();
      //   ValidationError.handleSubmit(e.values);
      //   return false;
      // }}
      >
        {/* Commodity */}
        <div className="mt-3">
          <PageTitle page={is_updating ? "Update Vehicle" : "Add Vehicle"} />
          <Title
            title={is_updating ? "Update Vehicle" : "Add Vehicle"}
            parent_title="Masters"
          />
        </div>
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
                  <Col lg={4} md={4} sm={4}>
                    <div className="mb-3">
                      <Label className="header-child">Vehicle Owner Info*</Label>
                      <NSearchInput
                        data_list={vehcile_owner}
                        data_item_s={vehcile_owner_s}
                        set_data_item_s={setvehcile_owner_s}
                        show_search={false}
                        error_message={"Please Select Vehicle Type"}
                        error_s={vehicle_owner_error}
                      />
                    </div>
                  </Col>
                  <Col lg={4} md={4} sm={4}>
                    <div className="mb-3">
                      <Label className="header-child">Vehicle Type*</Label>
                      <NSearchInput
                        data_list={vehcile_type}
                        data_item_s={vehcile_type_s}
                        set_data_item_s={setvehcile_type_s}
                        show_search={false}
                        error_message={"Please Select Vehicle Type"}
                        error_s={vehicle_type_error}
                      />
                    </div>
                  </Col>
                  {vehcile_owner_s === "Partner Vehicle" && (
                    <Col lg={4} md={4} sm={4}>
                      <div className="mb-3">
                        <Label className="header-child">
                          Transporter Name*
                        </Label>
                        <SearchInput
                          data_list={vendor_list}
                          setdata_list={setvendor_list}
                          data_item_s={vendor_name}
                          set_data_item_s={setvendor_name}
                          set_id={setvendor_id}
                          page={vendor_n_page}
                          setpage={setvendor_n_page}
                          search_item={search_vendor_name}
                          setsearch_item={setsearch_vendor_name}
                          error_message={"Please Select Any Vendor"}
                          error_s={vendor_error}
                        />
                      </div>
                    </Col>
                  )}

                  <Col lg={4} md={4} sm={4}>
                    <div className="mb-3">
                      <Label className="header-child">Vehicle Number*</Label>
                      <Input
                        name="VEHCILE_NUMBER"
                        type="text"
                        id="input"
                        maxLength={10}
                        value={vehcile_no}
                        onChange={(e) => {
                          setvehcile_no(e.target.value);
                        }}
                        invalid={vehicle_number_error}
                      />
                      {vehicle_number_error && (
                        <div style={{ fontSize: "10.5px", color: "#f46a6a" }}>
                          Vehicle No is required
                        </div>
                      )}
                    </div>
                  </Col>

                  <Col lg={4} md={4} sm={4}>
                    <div className="mb-3">
                      <Label className="header-child">Vehicle Model*</Label>
                      <Input
                        name="VEHCILE_MODEL"
                        type="text"
                        id="input"
                        value={vehcile_model}
                        onChange={(e) => {
                          setvehcile_model(e.target.value);
                        }}
                        invalid={vehicle_model_error}
                      />
                      {vehicle_model_error && (
                        <div style={{ fontSize: "10.5px", color: "#f46a6a" }}>
                          Vehicle Model Name is required
                        </div>
                      )}
                    </div>
                  </Col>

                  {/* <Col lg={4} md={4} sm={4}>
                    <div className="mb-3" id="vehicle_img">
                      <Label className="header-child">Vehicle Image*</Label>
                      <Input type="file" name="file" id="input" invalid={vehcile_img_error}
                        onChange={(val) => {
                          setvehcile_img(val.target.value);
                        }}
                      />
                      <FormFeedback type="invalid">
                        Vehcile Image is required
                      </FormFeedback>
                    </div>
                  </Col> */}

                  <Col lg={4} md={4} sm={4}>
                    <div className="mb-3">
                      <Label className="header-child">container capacity</Label>
                      <Input
                        name="vehicle_capacity"
                        type="text"
                        id="input"
                        value={vehcile_capacity}
                        onChange={(e) => {
                          setvehcile_capacity(e.target.value);
                        }}
                      />
                    </div>
                  </Col>
                  <Col lg={4} md={4} sm={4}>
                    <div className="mb-3">
                      <Label className="header-child">Active Status</Label>
                      <NSearchInput
                        data_list={active_list}
                        data_item_s={active_selected}
                        set_data_item_s={setactive_selected}
                        show_search={false}
                      />
                    </div>
                  </Col>

                  <ImgModal
                    modal={modal}
                    modal_set={() => {
                      setmodal(false);
                    }}
                    pre_image={result_img ? result_img : ""}
                    upload_image={(val) => {
                      setuploaded_img(val);
                    }}
                    result_image={(val) => {
                      setresult_img(val);
                    }}
                  />
                  {(result_img === "" || !result_img) &&
                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2" style={{ position: "relative" }}>
                        <Label>Vehicle Image*</Label>
                        <Input
                          style={{ background: "white" }}
                          className="form-control-md"
                          name="logo"
                          // type=""
                          id="input"
                          disabled
                          value={result_img}
                          invalid={vehcile_img_error}
                          onChange={(val) => {
                            setresult_img(val.target.value)
                          }}
                        // accept="image/png,image/jpeg, image/jpg"
                        />
                        <button
                          style={{
                            border: "none",
                            position: "absolute",
                            borderRadius: "2px",
                            height: "29px",
                            top: "28.5px",
                            // padding: "0.375rem 0.75rem",
                            marginLeft: ".9px",
                            background: "#e9ecef",
                          }}
                          className="form-control-md"
                          id="input"
                          type="button"
                          onClick={() => setmodal(true)}
                        >
                          Choose Image
                        </button>
                        <FormFeedback type="invalid">
                          Vehcile Image is required
                        </FormFeedback>
                      </div>
                    </Col>
                  }
                  {result_img && (
                    <Col lg={4} md={4} sm={6}>
                      <Label>Vehicle Image*</Label>
                      <div className="mb-3">
                        <img
                          onClick={() => setmodal(true)}
                          src={result_img}
                          style={{
                            width: "95px",
                            height: "95px",
                            borderRadius: "8px",
                            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                          }}
                        />
                      </div>
                    </Col>
                  )}

                  <Col lg={12} md={12} sm={12}>
                    <Label className="header-child">Associated Branch *:</Label>
                    <TransferList
                      list_a={branch_list}
                      setlist_a={setbranch_list}
                      list_b={branch_list2}
                      setlist_b={setbranch_list2}
                      page={page}
                      setpage={setpage}
                      setsearch_item={setsearch_branch}
                      loaded={branch_loaded}
                      count={branch_count}
                      bottom={branch_bottom}
                      setbottom={setbranch_bottom}
                    />
                    {branch_err ? (
                      <div style={{ color: "#f46a6a", fontSize: "10.4px" }}>
                        Please Select At Least One Branch
                      </div>
                    ) : null}
                  </Col>
                </Row>
              </CardBody>
            ) : null}
          </Card>
        </Col>
        {/*  Button Footer */}
        {/*Button */}
        <div className="m-3">
          <Col lg={12}>
            <div className="mb-1 footer_btn">
              <Button
                className="btn btn-info m-1 cu_btn"
                type="button"
                onClick={() => {
                  if (vehcile_owner_s === "") {
                    setvehicle_owner_error(true);
                  } else if (vehcile_type_s === "") {
                    setvehicle_type_error(true);
                  }
                  else if (
                    vehcile_owner_s === "Partner Vehicle" &&
                    vendor_name === ""
                  ) {
                    setvendor_error(true);
                  } else if (vehcile_no === "" || vehcile_no.length !== 10) {
                    setvehicle_number_error(true);
                  } else if (vehcile_model === "") {
                    setvehicle_model_error(true);
                  } else if (result_img === "") {
                    setvehcile_img_error(true);
                  } else if (branch_list2?.length === 0) {
                    setbranch_err(true);
                  }
                  else {
                    is_updating ? upadte_vehcile() :
                      add_vehcile();
                  }
                }}
              >
                {is_updating ? "Update" : "Save"

                }

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

export default Add_Vehcile;
