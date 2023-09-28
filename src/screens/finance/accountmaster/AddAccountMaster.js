/* eslint-disable */
import { IconContext } from "react-icons";
import { MdAddCircleOutline, MdRemoveCircleOutline } from "react-icons/md";
import {
  CardBody,
  CardTitle,
  Col,
  Form,
  Label,
  Row,
  Input,
  Card,
  FormFeedback,
} from "reactstrap";
import PageTitle from "../../../components/pageTitle/PageTitle";
import Title from "../../../components/title/Title";
import { BsSave } from "react-icons/bs";
import { useState, useLayoutEffect, useEffect } from "react";
import { useFormik } from "formik"; //used for validation
import * as Yup from "yup"; //used for validation
import { useLocation, useNavigate } from "react-router-dom"; // For navigation
import { ServerAddress } from "../../../constants/ServerAddress";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  setShowAlert,
  setDataExist,
  setAlertType,
} from "../../../store/alert/Alert";
import { useDispatch } from "react-redux";
import toTitleCase from "../../../components/Title_Case/TitleCase";
import NSearchInput from "../../../components/formComponent/nsearchInput/NSearchInput";

const AddAccountMaster = () => {
  const AccessToken = useSelector((state) => state.authentication.access_token);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  // Toggle Btn
  const [circle_btn, setcircle_btn] = useState(true);
  const toggle_circle = () => {
    setcircle_btn(!circle_btn);
  };
  const [circle_btn1, setcircle_btn1] = useState(true);
  const toggle_circle1 = () => {
    setcircle_btn1(!circle_btn1);
  };

  // for update
  const [is_updating, setis_updating] = useState(false);
  // console.log("is_updating is", is_updating);
  const [account_master, setaccount_master] = useState("");
  const [account_master_id, setaccount_master_id] = useState("");

  const [city_list_s, setcity_list_s] = useState([]);
  const [city, setcity] = useState("");
  const [city_id, setcity_id] = useState(0);
  const [city_error, setcity_error] = useState(false);
  const [city_page, setcity_page] = useState(1);
  const [city_search_item, setcity_search_item] = useState("");

  const [by_pincode, setby_pincode] = useState(false);
  const [pincode_list_s, setpincode_list_s] = useState([]);
  const [pincode, setpincode] = useState("");
  const [pin_code_error, setpin_code_error] = useState(false);
  const [pincode_error, setpincode_error] = useState(false);
  const [pincode_error2, setpincode_error2] = useState(false);
  const [pincode_page, setpincode_page] = useState(1);
  const [pincode_search_item, setpincode_search_item] = useState("");
  const [pincode_id, setpincode_id] = useState(0);
  const [pincode_loaded, setpincode_loaded] = useState(false);
  // for address
  const [state_list_s, setstate_list_s] = useState([]);
  const [state, setstate] = useState("");
  const [state_id, setstate_id] = useState(0);
  const [code, setcode] = useState("");
  const [state_error, setstate_error] = useState(false);
  const [state_page, setstate_page] = useState(1);
  const [state_search_item, setstate_search_item] = useState("");

  const [refresh, setrefresh] = useState(false);

  const getStates = (place_id, filter_by) => {
    // let state_list = [...state_list_s];
    let state_list = [];
    axios
      .get(
        ServerAddress +
          `master/all_states/?search=${""}&p=${state_page}&records=${10}&state_search=${state_search_item}` +
          "&place_id=" +
          place_id +
          "&filter_by=" +
          filter_by,
        {
          headers: { Authorization: `Bearer ${AccessToken}` },
        }
      )
      .then((response) => {
        let data = response.data.results;
        console.log("data is", data);
        for (let index = 0; index < data.length; index++) {
          state_list.push([data[index].id, data[index].state]);
        }
        setstate_list_s(state_list);
      })
      .catch((err) => {
        alert(`Error Occur in Get States, ${err}`);
      });
  };

  useLayoutEffect(() => {
    getStates();
    // setdistrict_list([]);
  }, [state_search_item, refresh]);

  const [group_list, setgroup_list] = useState([" IS GROUP", " IS SUBGROUP"]);
  const [groupselected, setgroupselected] = useState("");

  const [group_list1, setgroup_list1] = useState([" IS GROUP", " IS SUBGROUP"]);
  const [groupselected1, setgroupselected1] = useState("");

  const [group_list2, setgroup_list2] = useState([" IS GROUP", " IS SUBGROUP"]);
  const [groupselected2, setgroupselected2] = useState("");
  const [group_list3, setgroup_list3] = useState([" IS GROUP", " IS SUBGROUP"]);
  const [groupselected3, setgroupselected3] = useState("");
  const getCities = (place_id, filter_by) => {
    setby_pincode(false);
    let cities_list = [];
    axios
      .get(
        ServerAddress +
          `master/all_cities/?search=${""}&p=${city_page}&records=${10}&city_search=${city_search_item}` +
          "&place_id=" +
          place_id +
          "&filter_by=" +
          filter_by,

        {
          headers: { Authorization: `Bearer ${AccessToken}` },
        }
      )
      .then((response) => {
        let data = response.data.results;
        for (let index = 0; index < data.length; index++) {
          cities_list.push([data[index].id, data[index].city]);
        }

        setcity_list_s(cities_list);
      })
      .catch((err) => {
        alert(`Error Occur While get City, ${err}`);
      });
  };

  useEffect(() => {
    if (state_id !== 0 && by_pincode === false) {
      setcity("");
      getCities(state_id, "state");
      setpincode_list_s([]);
      setpincode("");
    }
  }, [state_id]);

  const getPincode = (place_id, filter_by) => {
    let pincode_list = [];
    axios
      .get(
        ServerAddress +
          `master/all_pincode/?search=${""}&p=${pincode_page}&records=${10}&pincode_search=${pincode_search_item}` +
          "&place_id=" +
          place_id +
          "&filter_by=" +
          filter_by,
        {
          headers: { Authorization: `Bearer ${AccessToken}` },
        }
      )
      .then((response) => {
        console.log("first", response);
        for (let index = 0; index < response.data.results.length; index++) {
          const element = response.data.results[index];
          pincode_list.push([element.id, element.pincode]);
        }
        setpincode_list_s(pincode_list);
      })
      .catch((err) => {
        alert(`Error Occur in Get Pincode, ${err}`);
      });
  };

  useEffect(() => {
    if (city_id !== 0 && by_pincode === false) {
      setpincode("");
      getPincode(city_id, "city");
    }
  }, [city_id]);

  useLayoutEffect(() => {
    if (state != "") {
      setstate_error(false);
    }
    if (city != "") {
      setcity_error(false);
    }
    if (state !== "") {
      setpincode_loaded(true);
    }
  }, [state, city]);
  // Validations
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      // This should be in small letter or smallcase
      name: account_master.name || "",
      group: account_master.group || "",
      sub_group: account_master.sub_group || "",
      pan_number: account_master.pan_number || "",
      address_line_1: account_master.address || "",
    },

    // post method
    onSubmit: (values) => {
      console.log("first----------", values);
      console.log(state);
      console.log(city);
      console.log(pincode);
      is_updating
        ? update_accounts_master_data(values)
        : send_account_master_data(values);
    },
  });

  const address = [state, city, pincode];
  const send_account_master_data = (values) => {
    axios
      .post(
        ServerAddress + "finance/add-AccountMaster/",
        {
          name: values.name,
          group: values.group,
          sub_group: values.sub_group,
          pan_number: values.pan_number,
          address: values.address_line_1,
          state: state_id,
          state_s: state,
          city: city_id,
          city_s: city,
          location: pincode_id,
          loc: pincode,
          loc1: { state, city, pincode },
        },
        {
          headers: {
            Authorization: `Bearer ${AccessToken}`,
          },
        }
      )
      .then(function (response) {
        console.log("data", response.data);
        if (response.data.status === "success") {
          dispatch(setShowAlert(true));
          dispatch(setAlertType("success"));
          dispatch(
            setDataExist(`Account Master ${values.name} Created Successfully`)
          );
          // alert("Data Added");
          navigate("/finance/accountmaster");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // for update the data
  const update_accounts_master_data = (values) => {
    axios
      .put(
        ServerAddress + "finance/put-AccountMaster/" + account_master_id,
        {
          code: code,
          name: values.name,
          group: values.group,
          sub_group: values.sub_group,
          pan_number: values.pan_number,
          address: values.address_line_1,
          state: state_id,
          city: city_id,
          location: pincode_id,
          loc1: { state, city, pincode },
        },
        {
          headers: { Authorization: `Bearer ${AccessToken}` },
        }
      )
      .then((response) => {
        if (response.data.status === "success") {
          dispatch(setShowAlert(true));
          dispatch(setAlertType("warning"));
          dispatch(
            setDataExist(`Accounts Master ${values.name} Updated Successfully`)
          );
          navigate(-1);
        }
      })
      .catch((error) => {
        alert(`Error While Updating Profile ${error}`);
      });
  };
  useEffect(() => {
    try {
      let mastr = location.state.data;
      console.log("Acc Master Location==", location);
      setis_updating(true);
      setaccount_master(mastr);
      setaccount_master_id(mastr.id);
      setstate_id(mastr.state_id);
      setstate(mastr.state_name);
      setcode(mastr.code);
      setcity(mastr.city_name);
      setcity_id(mastr.city_id);
      setpincode_id(mastr.location);
      setpincode(mastr.pin_code);
    } catch (error) {
      setis_updating(false);
    }
  }, [is_updating]);

  const [msme_registerd, setmsme_registerd] = useState(false);
  const [msme_registerd1, setmsme_registerd1] = useState(false);
  const [sub_name, setsub_name] = useState("");
  return (
    <div>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          validation.handleSubmit(e.values);
          return false;
        }}
      >
        <div className="m-4">
          <PageTitle page={is_updating ? "Update Ledger" : "Add Ledger"} />
          <Title
            title={is_updating ? "Update Ledger" : "Add Ledger"}
            parent_title="Finance"
          />
        </div>

        <div className="m-4" id="section1">
          <Card className="shadow bg-white rounded">
            <CardTitle className="mb-1 header">
              <div className="header-text-icon header-text">
                Add Ledger
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
                    <div className="m-2 mb-2">
                      <Label className="header-child sm-10">
                        Name <span className="mandatory">*</span> :
                      </Label>
                      <Input
                        className="form-control d-block from control-md"
                        bsSize="sm"
                        name="name"
                        type="text"
                        placeholder=" Enter Your Name"
                        onChange={validation.handleChange}
                        value={validation.values.name}
                      />
                    </div>
                  </Col>

                  <Col lg={3} md={6} sm={6}>
                    <div className="mb-2">
                      <Label className="header-child">Main Group*</Label>
                      <Row>
                        <Col lg={4} md={4} sm={4}>
                          <div className="form-check mb-2">
                            <Input
                              className="form-check-input "
                              type="radio"
                              name="MSME_REG"
                              // id="MSMEREG"
                              value={msme_registerd}
                              onClick={() => {
                                setmsme_registerd(true);
                              }}
                              checked={msme_registerd === true}
                              readOnly={true}
                            />
                            <Label
                              className="form-check-label input-box"
                              htmlFor="exampleRadios1"
                            >
                              YES
                            </Label>
                          </div>
                        </Col>
                        <Col lg={3} md={3} sm={3}>
                          <div className="form-check mb-2">
                            <Input
                              className="form-check-input"
                              type="radio"
                              name="MSME_REG"
                              // id="MSMEREG"
                              value={msme_registerd}
                              onClick={() => {
                                setmsme_registerd(false);
                              }}
                              checked={msme_registerd === false}
                              readOnly={true}
                            />
                            <Label
                              className="form-check-label input-box"
                              htmlFor="exampleRadios2"
                            >
                              NO
                            </Label>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>

                {msme_registerd ? (
                  <Col lg={4} md={6} sm={6}>
                    <div className="m-2 mb-2">
                      <Label className="header-child sm-10">
                        Main Group <span className="mandatory">*</span> :
                      </Label>
                      <Input
                        className="form-control d-block from control-md"
                        bsSize="sm"
                        name="name"
                        type="text"
                        placeholder=" Enter Your Name"
                      />
                    </div>
                  </Col>
                ) : (
                  <Col lg={4} md={6} sm={6}>
                    <div className="m-2 mb-2">
                      <Label className="header-child sm-10">
                        Sub Group Name <span className="mandatory">*</span> :
                      </Label>
                      <Input
                        className="form-control d-block from control-md"
                        bsSize="sm"
                        name="name"
                        type="text"
                        value={sub_name}
                        placeholder=" Enter Sub Group Name"
                        onChange={(e) => {
                          setsub_name(e.target.value);
                        }}
                      />
                    </div>
                  </Col>
                )}

                {sub_name != "" ? (
                  <>
                    <Row>
                      <Col lg={3} md={6} sm={6}>
                        <div className="mb-2">
                          <Label className="header-child">Main Group*</Label>
                          <Row>
                            <Col lg={4} md={4} sm={4}>
                              <div className="form-check mb-2">
                                <Input
                                  className="form-check-input "
                                  type="radio"
                                  name="MSME_REG"
                                  // id="MSMEREG"
                                  value={msme_registerd}
                                  onClick={() => {
                                    setmsme_registerd1(true);
                                  }}
                                  checked={msme_registerd === true}
                                  readOnly={true}
                                />
                                <Label
                                  className="form-check-label input-box"
                                  htmlFor="exampleRadios1"
                                >
                                  YES
                                </Label>
                              </div>
                            </Col>
                            <Col lg={3} md={3} sm={3}>
                              <div className="form-check mb-2">
                                <Input
                                  className="form-check-input"
                                  type="radio"
                                  name="MSME_REG"
                                  // id="MSMEREG"
                                  value={msme_registerd}
                                  onClick={() => {
                                    setmsme_registerd1(false);
                                  }}
                                  checked={msme_registerd === false}
                                  readOnly={true}
                                />
                                <Label
                                  className="form-check-label input-box"
                                  htmlFor="exampleRadios2"
                                >
                                  NO
                                </Label>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </Col>
                    </Row>
                  </>
                ) : null}
              </CardBody>
            ) : null}
          </Card>
        </div>

        {/*Button */}
        <div className="m-4">
          <Col lg={12}>
            <div className="mb-1 footer_btn">
              <button
                type="submit"
                className="btn btn-success"
                style={{ marginRight: "15px", width: "77px" }}
              >
                {is_updating ? "Update" : "Save"}
              </button>

              <button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  navigate(-1);
                }}
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
export default AddAccountMaster;
