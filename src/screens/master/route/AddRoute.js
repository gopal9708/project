/* eslint-disable */
import React, { useState, useEffect, useLayoutEffect } from "react";
import "../../../assets/scss/forms/form.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
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
  FormGroup
} from "reactstrap";
import { IconContext } from "react-icons";
import { MdAddCircleOutline, MdRemoveCircleOutline } from "react-icons/md";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from "react-redux";
import toTitleCase from "../../../lib/titleCase/TitleCase";
import { ServerAddress } from "../../../constants/ServerAddress";
import {
  setAlertType,
  setDataExist,
  setShowAlert,
} from "../../../store/alert/Alert";
import { Button } from "react-bootstrap";
import PageTitle from "../../../components/pageTitle/PageTitle";
import Title from "../../../components/title/Title";
import { setToggle } from "../../../store/pagination/Pagination";
import TransferList from "../../../components/formComponent/transferList/TransferList";
import SearchInput from "../../../components/formComponent/searchInput/SearchInput";

function AddRoute() {
  const user = useSelector((state) => state.authentication.userdetails);
  const accessToken = useSelector((state) => state.authentication.access_token);
  const page_num = useSelector((state) => state.pagination.page_number);
  const data_len = useSelector((state) => state.pagination.data_length);
  const dispatch = useDispatch();
  const location_data = useLocation();
  const navigate = useNavigate();
  const [routes, setroutes] = useState([]);

  // Liocation

  const [city_bottom, setcity_bottom] = useState(103)
  const [state_bottom, setstate_bottom] = useState(103)

  const [location_list, setlocation_list] = useState([]);
  const [location, setlocation] = useState([]);
  const [location_id, setlocation_id] = useState([]);
  const [location_page, setlocation_page] = useState(1);
  const [location_search, setlocation_search] = useState("");
  const [location_loaded, setlocation_loaded] = useState(false)
  const [location_count, setlocation_count] = useState(1)
  const [location_bottom, setlocation_bottom] = useState(56)

  const [state_list_s, setstate_list_s] = useState([]);
  const [state, setstate] = useState("");
  const [state_id, setstate_id] = useState(0);
  const [state_error, setstate_error] = useState(false);
  const [state_page, setstate_page] = useState(1);
  const [state_search_item, setstate_search_item] = useState("");
  const [state_loaded, setstate_loaded] = useState(false);
  const [state_count, setstate_count] = useState(1);
  const [togstate, settogstate] = useState(false)

  const [city_list_s, setcity_list_s] = useState([]);
  const [city, setcity] = useState("");
  const [city_id, setcity_id] = useState(0);
  const [city_error, setcity_error] = useState(false);
  const [city_page, setcity_page] = useState(1);
  const [city_search_item, setcity_search_item] = useState("");
  const [city_loaded, setcity_loaded] = useState(false);
  const [city_count, setcity_count] = useState(1);
  const [togcity, settogcity] = useState(false);

  //state used for get data for update
  const [isupdating, setisupdating] = useState(false);
  const [routedata, setroutedata] = useState("");
  console.log("routedadad---", routedata);
  //USed for error
  const [location_error, setlocation_error] = useState(false);

  // Validation
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: toTitleCase(routedata.name) || "",
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Branch name is required"),
    }),

    onSubmit: (values) => {
      isupdating ? update_route(values) : add_route(values);
    },
  });

  // Get Route City
  const get_route_cities = (route_id) => {
    axios
      .get(ServerAddress + "master/get_routecities/?route_id=" + route_id, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        let temp = [];
        console.log("response Rurr---", response.data);
        for (let index = 0; index < response.data.cities.length; index++) {
          const loc = response.data.cities[index];
          temp.push([
            loc.pincode,
            loc.pincode__pincode + "-" +
            toTitleCase(loc.pincode__city__city) +
            "-" +
            toTitleCase(loc.pincode__city__state__state),
          ]);
        }
        setlocation(temp);

      })
      .catch((err) => {
        alert(`Error Occur in Get , ${err}`);
      });
  };

  // Get Operating City
  const get_locations = (place_id, filter_by) => {
    let temp_2 = [];
    let temp = [...location_list];
    axios
      .get(
        ServerAddress +
        `master/all_pincode/?search=${""}&p=${location_page}&records=${20}&pincode_search=${[
          location_search,
        ]}&place_id=${place_id}&filter_by=${filter_by}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {

        temp = response.data.results;
        if (temp.length > 0) {
          if (response.data.next === null) {
            setlocation_loaded(false);
          } else {
            setlocation_loaded(true);
          }
          if (location_page === 1) {
            temp_2 = response.data.results.map((v) => [
              v.id,
              v.pincode + "-" +
              toTitleCase(v.city_name) +
              "-" +
              toTitleCase(v.state_name),


            ]);
          } else {
            temp_2 = [
              ...location_list,
              ...response.data.results.map((v) => [
                v.id,
                v.pincode + "-" +
                toTitleCase(v.city_name) +
                "-" +
                toTitleCase(v.state_name),

              ]),
            ];
          }

          setlocation_count(location_count + 2);
          setlocation_list(temp_2);

        }
        else {
          setlocation_list([])
        }
        try {
          get_route_cities(location_data.state.route.id, temp_2);
        } catch (error) { }
      })
      .catch((err) => {
        console.worn(`Error Occur in Get , ${err}`);
      });
  };

  const getStates = async () => {
    let state_list = [];
    try {
      const resp = await axios.get(
        ServerAddress +
        `master/all_states/?search=${""}&place_id=all&filter_by=all&p=${state_page}&records=${10}&state_search=${state_search_item}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      settogstate(true);
      if (resp.data.next === null) {
        setstate_loaded(false);
      } else {
        setstate_loaded(true);
      }

      if (resp.data.results.length > 0) {
        if (state_page === 1) {
          state_list = resp.data.results.map((v) => [
            v.id,
            toTitleCase(v.state),
          ]);
        } else {
          state_list = [
            ...state_list_s,
            ...resp.data.results.map((v) => [v.id, toTitleCase(v.state)]),
          ];
        }
      }
      setstate_count(state_count + 2);
      setstate_list_s(state_list);
    } catch (err) {
      console.warn(`Error Occur in Get States, ${err}`);
    }
  };

  const getCities = async (place_id, filter_by) => {
    let cities_list = [];
    try {
      const resp = await axios.get(
        ServerAddress +
        `master/all_cities/?search=${""}&p=${city_page}&records=${10}&city_search=${city_search_item}` +
        "&place_id=" +
        place_id +
        "&filter_by=" +
        filter_by,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      if (resp.data.next === null) {
        setcity_loaded(false);
      } else {
        setcity_loaded(true);
      }

      if (resp.data.results.length > 0) {
        if (city_page == 1) {
          cities_list = resp.data.results.map((v) => [
            v.id,
            toTitleCase(v.city),
          ]);
        } else {
          cities_list = [
            ...city_list_s,
            ...resp.data.results.map((v) => [v.id, toTitleCase(v.city)]),
          ];
        }
        setcity_count(city_count + 2);
        setcity_list_s(cities_list);

      } else {
        setcity_list_s([]);
      }
    } catch (err) {
      console.warn(`Error Occur in Get City, ${err}`);
    }
  };


  // Post Route Data
  const add_route = (values) => {
    axios
      .post(
        ServerAddress + "master/add_route/",
        {
          name: String(values.name).toUpperCase(),
          pincode: location_id,
          created_by: user.id,
          //For C&M
          cm_current_department: user.user_department,
          cm_current_status: (user.user_department_name === "ADMIN") ? 'NOT APPROVED' : (current_status).toUpperCase(),
          cm_transit_status: (user.user_department_name === "ADMIN") ? 'NOT APPROVED' : (current_status).toUpperCase(),
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
              `Route  "${toTitleCase(values.name)}" Added sucessfully`
            )
          );
          dispatch(setAlertType("success"));
          navigate("/master/routes");
        } else if (response.data === "duplicate") {
          dispatch(setShowAlert(true));
          dispatch(
            setDataExist(
              `Route Name "${toTitleCase(values.name)}" already exists`
            )
          );
          dispatch(setAlertType("warning"));
        }
      })
      .catch((error) => {
        alert(`Error Happen while posting Commodity  Data ${error}`);
      });
  };

  // Update Branch
  const update_route = (values) => {
    let id = routedata.id;

    let id_list = location.map((v) => v[0]).filter((v) => v !== null);

    let city_id_list = [...new Set(id_list.map((v) => `${v}`))].map((v) =>
      parseInt(v.split(","))
    );


    let fields_names = Object.entries({
      name: values.name,
      pincode: city_id_list,
    });

    let change_fields = {};

    for (let j = 0; j < fields_names.length; j++) {
      const ele = fields_names[j];
      let prev = location_data.state.route[`${ele[0]}`];
      let new_v = ele[1];
      if (String(prev).toUpperCase() != String(new_v).toUpperCase()) {
        change_fields[`${ele[0]}`] = new_v.toString().toUpperCase();
      }
    }

    axios
      .put(
        ServerAddress + "master/update_route/" + id,
        {
          name: String(values.name).toUpperCase(),
          pincode: city_id_list,
          modified_by: user.id,
          change_fields: change_fields,
          //For C&M
          cm_transit_status: status_toggle === true ? current_status : "",
          cm_current_status: (current_status).toUpperCase(),
          cm_remarks: ""
        },

        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (response) {
        if (response.data.status === "success") {
          dispatch(setDataExist(`Branch "${values.name}" Updated Sucessfully`));
          dispatch(setAlertType("info"));
          dispatch(setShowAlert(true));
          navigate("/master/routes");
        } else if (response.data === "duplicate") {
          dispatch(setShowAlert(true));
          dispatch(
            setDataExist(
              `Route name "${toTitleCase(values.name)}" already exists`
            )
          );
          dispatch(setAlertType("warning"));
        }
      })
      .catch(function () {
        console.warn("Error Error While Updateing branches");
      });
  };

  //Circle Toogle Btn
  const [circle_btn, setcircle_btn] = useState(true);
  const toggle_circle = () => {
    setcircle_btn(!circle_btn);
  };
  // Navigation At the time of Cancel
  const handleAction = () => {
    dispatch(setToggle(true));
    navigate("/master/routes");
  };

  // useEffect(() => {
  //   try {
  //     setroutes(location.state.route);
  //     setisupdating(true);
  //   } catch (error) {}
  //
  // }, []);

  useEffect(() => {
    let id = location.map((data) => data[0]);
    let id_list = [...new Set(id.map((v) => `${v}`))].map((v) =>
      parseInt(v.split(","))
    );
    setlocation_id(id_list);

  }, [location]);

  useEffect(() => {
    if (location !== "") {
      setlocation_error(false);
    }
  }, [location]);

  //This useLayoutEffect is used to get data fro update
  useLayoutEffect(() => {
    try {
      setroutedata(location_data.state.route);
      setisupdating(true);
    } catch (error) { }
  }, []);

  useEffect(() => {
    if (city_id === 0) {
      get_locations("all", "all");
    }
  }, [location_page, location_search, city_id]);

  useEffect(() => {
    let timeoutId;
    if (city_id !== 0) {
      timeoutId = setTimeout(() => {
        get_locations(city_id, "city");
      }, 1);
    }
    return () => clearTimeout(timeoutId);
  }, [location_page, location_search, city_id]);

  useEffect(() => {
    setlocation_page(1)
  }, [city])


  //For Checker Maker
  const [current_status, setcurrent_status] = useState("");
  const [status_toggle, setstatus_toggle] = useState(false)
  const [message, setmessage] = useState("")
  const [message_error, setmessage_error] = useState(false);


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true)
    setmessage_error(false)
  };

  useEffect(() => {
    if (user.user_department_name === "ADMIN") {
      setcurrent_status("NOT APPROVED")
      setstatus_toggle(true)
    }

    else if (user.user_department_name === "ACCOUNTANT" || user.user_department_name === "ACCOUNTANT" || user.user_department_name + " " + user.designation_name === "ACCOUNT MANAGER" || user.is_superuser) {
      setcurrent_status("APPROVED")
      setstatus_toggle(true)
    }
    else {
      setcurrent_status("NOT APPROVED")
      // setstatus_toggle(false)
    }

  }, [user, isupdating])

  const update_routestatus = (id) => {

    axios
      .put(
        ServerAddress + "master/update_route/" + id,
        {

          cm_current_status: "REJECTED",
          cm_remarks: toTitleCase(message).toUpperCase(),
          change_fields: {},
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (response) {
        if (response.data.status === "success") {
          // dispatch(Toggle(true))
          dispatch(setShowAlert(true));
          dispatch(setDataExist(`Status Updated sucessfully`));
          dispatch(setAlertType("info"));
          navigate("/master/routes");
        }
      })
      .catch(function (err) {
        alert(`rror While  Updateing Coloader ${err}`);
      });
  };

  const handleSubmit = () => {
    if (message == "") {
      setmessage_error(true);
    }
    else {
      update_routestatus(routedata.id)
      setShow(false)
    }
  }
  //used for history
  const handlClk = () => {
    navigate("/route/routeHistory/RouteHistoryPage", {
      state: { routes: routedata },
    });
  };

  // Location Functions Call
  useLayoutEffect(() => {
    getStates();
  }, [state_page, state_search_item]);

  useLayoutEffect(() => {
    if (state_id !== 0) {
      setcity_page(1);
      setcity_count(1);
      setcity_bottom(103)
      setcity_loaded(true);
    }
  }, [state_id])

  useEffect(() => {
    let timeoutId;
    if (state_id !== 0) {
      timeoutId = setTimeout(() => {
        getCities(state_id, "state");
      }, 1);
    }
    return () => clearTimeout(timeoutId);

  }, [state_id, city_page, city_search_item]);

  useLayoutEffect(() => {
    if (city_id !== 0) {
      setlocation_page(1);
      setlocation_count(1);
      // setpincode_bottom(103)
      // setload_pincode(true)
    }
  }, [city_id])

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Reject Resion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup>
            <Label for="exampleText">
              Text Area
            </Label>
            <Input
              id="exampleText"
              name="text"
              type="textarea"
              style={{ height: "90px" }}
              onChange={(e) => {
                setmessage(e.target.value)
              }}
            />
            <div className="mt-1 error-text" color="danger">
              {message_error ? "Please Enter Reject Resion" : null}
            </div>
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => handleSubmit()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          if (location == "") {
            setlocation_error(true);
          }
          validation.handleSubmit(e.values);
          return false;
        }}
      >
        <div className="mt-3">
          <PageTitle page={isupdating ? "Update Route" : "Add Route"} />
          <Title
            title={isupdating ? "Update Route" : "Add Route"}
            parent_title="Masters"
          />
        </div>
        {/* Add For History Button  */}
        {isupdating &&
          <div style={{ justifyContent: "right", display: "flex",marginRight:"20px" }}>
            <Button
             variant="primary"
              type="button"
              onClick={() => {
                handlClk();
              }}
            >
              History
            </Button>
          </div>
        }

        {/* Routes Info */}
        <div className="m-3">
          <Col lg={12}>
            <Card className="shadow bg-white rounded">
              <CardTitle className="mb-1 header">
                <div className="header-text-icon header-text">
                  Route Info
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
                        <Label className="header-child">Name* </Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.name || ""}
                          invalid={
                            validation.touched.name && validation.errors.name
                              ? true
                              : false
                          }
                          type="text"
                          className="form-control-md"
                          id="input"
                          name="name"
                          placeholder="Enter Name"
                        />
                        {validation.touched.name && validation.errors.name ? (
                          <FormFeedback type="invalid">
                            {validation.errors.name}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">State</Label>
                        <SearchInput
                          data_list={state_list_s}
                          setdata_list={setstate_list_s}
                          data_item_s={state}
                          set_data_item_s={setstate}
                          set_id={setstate_id}
                          page={state_page}
                          setpage={setstate_page}
                          // error_message={"Please Select Any State"}
                          // error_s={state_error}
                          search_item={state_search_item}
                          setsearch_item={setstate_search_item}
                          loaded={state_loaded}
                          count={state_count}
                          bottom={state_bottom}
                          setbottom={setstate_bottom}
                        />
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">City</Label>

                        <SearchInput
                          data_list={city_list_s}
                          setdata_list={setcity_list_s}
                          data_item_s={city}
                          set_data_item_s={setcity}
                          set_id={setcity_id}
                          page={city_page}
                          setpage={setcity_page}
                          // error_message={"Please Select Any City"}
                          // error_s={city_error}
                          search_item={city_search_item}
                          setsearch_item={setcity_search_item}
                          loaded={city_loaded}
                          count={city_count}
                          bottom={city_bottom}
                          setbottom={setcity_bottom}
                        />
                      </div>
                    </Col>

                    <Label className="header-child">Pincode* </Label>
                    <Col lg={12} md={12} sm={12}>
                      <TransferList
                        list_a={location_list}
                        setlist_a={setlocation_list}
                        list_b={location}
                        setlist_b={setlocation}
                        page={location_page}
                        setpage={setlocation_page}
                        error_message={"Please Select Any Option"}
                        setsearch_item={setlocation_search}
                        loaded={location_loaded}
                        count={location_count}
                        bottom={location_bottom}
                        setbottom={setlocation_bottom}
                      />
                      {location_error ? (
                        <div style={{ color: "#f46a6a", fontSize: "10.4px" }}>
                          Please Select any pincode
                        </div>
                      ) : null}
                    </Col>
                  </Row>
                </CardBody>
              ) : null}
            </Card>
          </Col>
        </div>

        {/* Footer */}
        <div className="m-3">
          <Col lg={12}>
            <div className="mb-1 footer_btn">
              <button
                type="submit"
                className={isupdating && (user.user_department_name === "ADMIN") ? "btn btn-info m-1" : !isupdating ? "btn btn-info m-1" : "btn btn-success m-1"}
              >
                {isupdating && (user.user_department_name === "ADMIN") ? "Update" : !isupdating ? "Save" : "Approved"}
              </button>

              {isupdating && (user.user_department_name !== "ADMIN" && !user.is_superuser) &&
                <button
                  type="button"
                  className="btn btn-danger m-1"
                  onClick={handleShow}
                >
                  Rejected
                </button>
              }

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
  );
}

export default AddRoute;
