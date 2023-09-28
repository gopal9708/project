import React, { useLayoutEffect, useState, useEffect } from "react";
import { MdAddCircleOutline, MdRemoveCircleOutline } from "react-icons/md";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { IconContext } from "react-icons";
import PageTitle from "../../../components/pageTitle/PageTitle";
import Title from "../../../components/title/Title";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  setAlertType,
  setDataExist,
  setShowAlert,
} from "../../../store/alert/Alert";
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
  FormGroup,
} from "reactstrap";
import toTitleCase from "../../../lib/titleCase/TitleCase";
import { setToggle } from "../../../store/pagination/Pagination";
import SearchInput from "../../../components/formComponent/searchInput/SearchInput";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { ServerAddress } from "../../../constants/ServerAddress";
import NSearchInput from "../../../components/formComponent/nsearchInput/NSearchInput";

const AddLocation = () => {
  const [isupdating, setisupdating] = useState(false);
  const user_id = useSelector((state) => state.authentication.userdetails.id);
  const accessToken = useSelector((state) => state.authentication.access_token);
  const user = useSelector((state) => state.authentication.userdetails);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location_data = useLocation();

  //used for toggle
  const [circle_btn, setcircle_btn] = useState(true);
  const toggle_circle = () => {
    setcircle_btn(!circle_btn);
  };

  const [district_id, setdistrict_id] = useState(0);
  const [district, setdistrict] = useState("");
  const [empty_city, setempty_city] = useState(false);
  const [location, setlocation] = useState([]);
  const [override, setoverride] = useState(false);
  const [other_city, setother_city] = useState("");
  const [other_city_error, setother_city_error] = useState(false);
  const [other_pincode, setother_pincode] = useState("");
  const [other_pincode_error, setother_pincode_error] = useState(false);
  const [pincode_len_error, setpincode_len_error] = useState(false);
  // Location Info
  const [state_list_s, setstate_list_s] = useState([]);
  const [state, setstate] = useState("");
  const [state_id, setstate_id] = useState(0);
  const [state_page, setstate_page] = useState(1);
  const [state_search_item, setstate_search_item] = useState("");
  const [other_state, setother_state] = useState("");
  const [other_state_error, setother_state_error] = useState(false);
  const [empty_state, setempty_state] = useState(false);
  const [zone_error, setzone_error] = useState(false);
  const [togstate, settogstate] = useState(false);

  //Zone
  const [zone_list, setzone_list] = useState([
    "East Zone",
    "West Zone",
    "North Zone",
    "South Zone",
  ]);
  const [zone, setzone] = useState("");

  const [country_list_s, setcountry_list_s] = useState([]);
  const [country, setcountry] = useState(location_data.state === null ? toTitleCase(user.branch_country) : "");
  const [country_id, setcountry_id] = useState(location_data.state === null ? user.branch_country_id : 0);
  const [country_page, setcountry_page] = useState(1);
  const [country_search_item, setcountry_search_item] = useState("");
  const [country_error, setcountry_error] = useState(false);
  const [other_country, setother_country] = useState("");
  const [empty_country, setempty_country] = useState(false);

  const [city_list_s, setcity_list_s] = useState([]);
  const [city, setcity] = useState("");
  const [city_id, setcity_id] = useState(0);
  const [city_page, setcity_page] = useState(1);
  const [city_search_item, setcity_search_item] = useState("");
  const [togcity, settogcity] = useState(false);

  const [pincode_list_s, setpincode_list_s] = useState([]);
  const [pincode, setpincode] = useState("");
  const [pincode_id, setpincode_id] = useState(0);
  const [pincode_page, setpincode_page] = useState(1);
  const [pincode_search_item, setpincode_search_item] = useState("");
  const [pincode_error, setpincode_error] = useState(false);
  const [pincode_bottom, setpincode_bottom] = useState(103)

  // For Loading Data
  const [city_loaded, setcity_loaded] = useState(false);
  const [city_count, setcity_count] = useState(1);
  const [city_bottom, setcity_bottom] = useState(103)

  const [country_loaded, setcountry_loaded] = useState(false);
  const [country_count, setcountry_count] = useState(1);
  const [country_bottom, setcountry_bottom] = useState(103)

  const [state_loaded, setstate_loaded] = useState(false);
  const [state_count, setstate_count] = useState(1);
  const [state_bottom, setstate_bottom] = useState(103)

  const [pincode_loaded, setpincode_loaded] = useState(false);
  const [pincode_count, setpincode_count] = useState(1);

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      locality: toTitleCase(location.name) || "",
      // pincode: location.pincode || "",
    },

    validationSchema: Yup.object({
      locality: Yup.string().required("Post locality is required"),
      // pincode: Yup.string()
      //   .min(6, " Number should not less then 6 digit")
      //   .max(6, " Number should not grater more then 6 digit")
      //   .required("Pin code is required"),
    }),
    onSubmit: (values) => {
      isupdating ? update_location(values) : send_locality_data(values);
    },
  });



  const getCountry = async () => {
    try {
      let country_list = [...country_list_s];
      const resp = await axios.get(
        ServerAddress +
        `master/all_country/?search=${""}&p=${country_page}&records=${10}&name_search=${country_search_item}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      console.log("Countary===>", resp.data);

      if (resp.data.next === null) {
        setcountry_loaded(false);
      } else {
        setcountry_loaded(true);
      }

      if (resp.data.results.length > 0) {
        // console.log("resp.data.results", resp.data);
        if (country_page === 1) {
          console.log("state_page", state_page);
          country_list = resp.data.results.map((v) => [v.id, toTitleCase(v.name)]);
        } else {
          country_list = [
            ...country_list_s,
            ...resp.data.results.map((v) => [v.id, toTitleCase(v.name)]),
          ];
        }
        let a_index = country_list.indexOf("Add New");
        if (a_index !== -1) {
          country_list.splice(a_index, 1);
        }
        country_list = [...new Set(country_list.map((v) => `${v}`))].map((v) =>
          v.split(",")
        );
        country_list.push("Add New");
        setcountry_count(country_count + 2);
        setcountry_list_s(country_list);
      }
      else {
        setcountry_list_s(['Add New'])
      }
      // state_list = resp.data.results.map(v => [v.id, toTitleCase(v.state)])\


      // if(country_search_item !== "") {
      //   setcountry_list_s(country_list);
      // } else {
      // }
    } catch (err) {
      alert(`Error Occur in Get States, ${err}`);
    }
  };

  const setCountry = async () => {
    try {
      const response = await axios.post(
        ServerAddress + "master/add_country/",
        {
          name: toTitleCase(other_country).toUpperCase(),
          created_by: user_id,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.data.status !== "duplicated") {
        if (response.statusText === "Created") {
          setcountry_id(response.data.country_id);
          dispatch(setShowAlert(true));
          dispatch(
            setDataExist(
              `Country ${toTitleCase(other_country)} Added Sucessfully`
            )
          );
          dispatch(setAlertType("success"));
          setcountry(toTitleCase(other_country));
          await getCountry();
          // await getDistrict();
        }
      } else {
        dispatch(setShowAlert(true));
        dispatch(
          setDataExist(`Country ${toTitleCase(other_country)} Already Exist`)
        );
        dispatch(setAlertType("warning"));
        if (isupdating) {
          setcountry(toTitleCase(location.name));
        } else {
          setcountry("");
        }
      }
    } catch (error) {
      alert(`Error Happen while posting State  Data ${error}`);
    }
  };

  const getStates = async (place_id, filter_by) => {
    try {
      let state_list = [...state_list_s];
      const resp = await axios.get(
        ServerAddress +
        `master/all_states/?search=${""}&p=${state_page}&records=${10}&state_search=${state_search_item}` +
        "&place_id=" +
        place_id +
        "&filter_by=" +
        filter_by,
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
        let a_index = state_list.indexOf("Add New");
        if (a_index !== -1) {
          // setstate_list_s([])
          state_list.splice(a_index, 1);
        }
        state_list = [...new Set(state_list.map((v) => `${v}`))].map((v) =>
          v.split(",")
        );
        state_list.push("Add New");
        setstate_count(state_count + 2);
        setstate_list_s(state_list);
      }
      else {
        setstate_list_s(["Add New"])
      }
      // state_list = resp.data.results.map(v => [v.id, toTitleCase(v.state)])\
    } catch (error) {
      console.warn(`Error Occur in Get State, ${error}`);
    }
  };

  const setState = async () => {
    try {
      const response = await axios.post(
        ServerAddress + "master/add_state/",
        {
          country: country_id,
          state: toTitleCase(other_state).toUpperCase(),
          zone: zone.toUpperCase(),
          created_by: user_id,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.data.status !== "duplicated") {
        if (response.statusText === "Created") {
          setstate_id(response.data.state_id);
          dispatch(setShowAlert(true));
          dispatch(
            setDataExist(
              `State ${toTitleCase(other_state)} Added Sucessfully`
            )
          );
          dispatch(setAlertType("success"));
          setstate(toTitleCase(other_state));
          // getStates();
          // getDistrict();
        }
      } else {
        dispatch(setShowAlert(true));
        dispatch(
          setDataExist(`State ${toTitleCase(other_state)} Already Exist`)
        );
        dispatch(setAlertType("warning"));
        if (isupdating) {
          setstate(toTitleCase(location.state_name));
        } else {
          setstate("");
        }
      }
    } catch (error) {
      alert(`Error Happen while posting State  Data ${error}`);
    }
  };

  const getCities = async (place_id, filter_by) => {
    try {
      let cities_list = [...city_list_s];
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

      settogcity(true);
      console.log("City ===>>", resp.data);

      if (resp.data.next === null) {
        setcity_loaded(false);
      } else {
        setcity_loaded(true);
      }

      if (resp.data.results.length > 0) {
        if (city_page === 1) {
          cities_list = resp.data.results.map((v) => [v.id, toTitleCase(v.city)]);
        } else {
          cities_list = [
            ...city_list_s,
            ...resp.data.results.map((v) => [v.id, toTitleCase(v.city)]),
          ];
        }
        let a_index = cities_list.indexOf("Add New");
        if (a_index !== -1) {
          cities_list.splice(a_index, 1);
        }

        cities_list = [...new Set(cities_list.map((v) => `${v}`))].map((v) =>
          v.split(",")
        );
        cities_list.push("Add New");

        setcity_count(city_count + 2);
        setcity_list_s(cities_list);
      }
      else {
        setcity_list_s(["Add New"])
      }

    } catch (err) {
      alert(`Error Occur in Get City, ${err}`);
    }
  };

  const getPincode = async (place_id, filter_by) => {
    try {
      let pincode_list = [...pincode_list_s];
      const response = await axios.get(
        ServerAddress +
        `master/all_pincode/?search=${""}&p=${pincode_page}&records=${10}&pincode_search=${pincode_search_item}` +
        "&place_id=" +
        place_id +
        "&filter_by=" +
        filter_by,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      if (response.data.next === null) {
        setpincode_loaded(false);
      } else {
        setpincode_loaded(true);
      }

      if (response.data.results.length > 0) {
        if (pincode_page === 1) {
          pincode_list = response.data.results.map((v) => [v.id, v.pincode]);
        } else {
          pincode_list = [
            ...pincode_list_s,
            ...response.data.results.map((v) => [v.id, v.pincode]),
            // ...response.data.results.map((v) => [v.id, toTitleCase(v.pincode)]),
          ];
        }
        let a_index = pincode_list.indexOf("Add New");
        if (a_index !== -1) {
          pincode_list.splice(a_index, 1);
        }
        pincode_list = [...new Set(pincode_list.map((v) => `${v}`))].map((v) =>
          v.split(",")
        );
        pincode_list.push("Add New");
        setpincode_count(pincode_count + 2);
        setpincode_list_s(pincode_list);
      }
      else {
        setpincode_list_s(["Add New"])
      }
    } catch (err) {
      alert(`Error Occur in Get City, ${err}`);
    }
  };

  const setCity = async () => {
    try {
      const response = await axios.post(ServerAddress + "master/add-city/", {
        city: toTitleCase(other_city).toUpperCase(),
        state: state_id,
        district: district_id,
        created_by: user_id,
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.data.status !== "duplicated") {
        if (response.statusText === "Created") {
          setcity_id(response.data.city_id);

          dispatch(
            setDataExist(
              `City ${toTitleCase(other_city)} in State ${toTitleCase(
                other_state
              )} Added Sucessfully`
            )
          );

          dispatch(setAlertType("success"));
          dispatch(setShowAlert(true));
          setcity(toTitleCase(other_city));
          // getCities();
        }
      } else {
        dispatch(setShowAlert(true));
        dispatch(
          setDataExist(
            `City ${toTitleCase(other_city)} in District ${toTitleCase(
              district
            )} Already Exist`
          )
        );

        dispatch(setAlertType("warning"));
        // if (isupdating === false) {
        //   setcity("");
        // }
        if (isupdating) {
          setcity(toTitleCase(location.city_name));
        } else {
          setcity("");
        }
      }
    } catch (error) {
      alert(`Error Happen while posting City Data ${error}`);
    }
  };

  const setPicode = async () => {
    try {
      const response = await axios.post(
        ServerAddress + "master/add_pincode/",
        {
          city: city_id,
          pincode: other_pincode,
          created_by: user_id,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.data.status !== "duplicated") {
        if (response.statusText === "Created") {
          setpincode_id(response.data.pincode_id);

          dispatch(
            setDataExist(
              `Pincode ${toTitleCase(other_pincode)} Added Sucessfully`
            )
          );

          dispatch(setAlertType("success"));
          dispatch(setShowAlert(true));
          setpincode(toTitleCase(other_pincode));
          // getCities();
        }
      } else {
        dispatch(setShowAlert(true));
        dispatch(
          setDataExist(`Pincode ${toTitleCase(other_pincode)}Already Exist`)
        );

        dispatch(setAlertType("warning"));
        // if (isupdating === false) {
        //   setcity("");
        // }
        if (isupdating) {
          setpincode(toTitleCase(location.pincode));
        } else {
          setpincode("");
        }
      }
    } catch (error) {
      alert(`Error Happen while posting City Data ${error}`);
    }
  };

  const update_location = async (values) => {
    try {
      let id = location.id;
      let fields_name = Object.entries({
        city_name: city,
        country_name: country,
        name: values.locality,
        pincode_name: pincode,
        state_name: state,
      });
      let change_fields = {};
      for (let j = 0; j < fields_name.length; j++) {
        const ele = fields_name[j];
        let prev = location_data.state.location[`${ele[0]}`];
        let new_v = ele[1];
        if (String(prev).toUpperCase() !== String(new_v).toUpperCase()) {
          change_fields[`${ele[0]}`] = new_v.toString().toUpperCase();
        }
      }
      const response = await axios.put(
        ServerAddress + "master/update_location/" + id,
        {
          name: toTitleCase(values.locality).toUpperCase(),
          pincode: pincode_id,
          modified_by: user_id,
          change_fields: change_fields,
          //For C&M
          cm_transit_status: status_toggle === true ? current_status : "",
          cm_current_status: current_status.toUpperCase(),
          cm_remarks: "",
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.data.status === "success") {
        dispatch(setToggle(true));
        dispatch(setShowAlert(true));
        dispatch(
          setDataExist(
            `Location of ${location.pincode} updated sucessfully ${location.pincode !== values.pincode
              ? `by overriding pincode ${values.pincode}`
              : ""
            }`
          )
        );
        dispatch(setAlertType("info"));
        setoverride(false);
        navigate("/master/locations");
      } else if (response.data === "duplicate") {
        dispatch(setShowAlert(true));
        dispatch(
          setDataExist(
            `Location Name "${toTitleCase(values.locality)}" already exists`
          )
        );
        dispatch(setAlertType("warning"));
      }
    } catch (err) {
      alert("Error Error While  Updateing LocAtion");
      dispatch(setShowAlert(false));
    }
  };


  const send_locality_data = async (values) => {
    try {
      const response = await axios.post(
        ServerAddress + "master/add_locality/",
        {
          name: toTitleCase(values.locality).toUpperCase(),
          pincode: pincode_id,
          created_by: user_id,
          //For C&M
          cm_current_department: user.user_department,
          cm_current_status:
            user.user_department_name === "ADMIN"
              ? "NOT APPROVED"
              : current_status.toUpperCase(),
          cm_transit_status:
            user.user_department_name === "ADMIN"
              ? "NOT APPROVED"
              : current_status.toUpperCase(),
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("Location resp", response.data);
      if (response.data.status === "data_exist") {
        dispatch(setToggle(true));
        dispatch(setAlertType("warning"));
        dispatch(setDataExist(`${response.data.data} Already Exist`));
        dispatch(setShowAlert(true));
      } else if (response.statusText === "Created") {
        dispatch(setShowAlert(true));
        dispatch(setDataExist(`New location  Added Sucessfully`));
        dispatch(setAlertType("success"));
        navigate("/master/locations");
      }
    } catch (error) {
      alert(`Error Happen while posting Location  Data ${error}`);
    }
  };


  const handleAction = () => {
    dispatch(setToggle(true));
    navigate("/master/locations");
  };

  useLayoutEffect(() => {
    try {
      setlocation(location_data.state.location);
      setisupdating(true);
      setcountry(toTitleCase(location_data.state.location.country_name));
      setcountry_id(location_data.state.location.country_id);
      setstate(toTitleCase(location_data.state.location.state_name));
      setstate_id(location_data.state.location.state_id);
      setcity(toTitleCase(location_data.state.location.city_name));
      setcity_id(location_data.state.location.city_id);
      setpincode(toTitleCase(location_data.state.location.pincode_name));
      setpincode_id(location_data.state.location.pincode);
    } catch (error) { }
  }, []);

  useLayoutEffect(() => {
    getCountry();
  }, [country_page, country_search_item, other_country]);

  useEffect(() => {
    if (country_id !== 0) {
      setstate_page(1);
      setstate_count(1);
      setstate_bottom(103)
      setstate_loaded(true);
    }
  }, [country_id])

  useLayoutEffect(() => {
    let timeoutId;
    if (country_id !== 0) {
      timeoutId = setTimeout(() => {
        getStates(country_id, "counter");
      }, 1);
    }
    return () => clearTimeout(timeoutId);
  }, [country_id, state_page, state_search_item]);

  useEffect(() => {
    if (country !== "" && !isupdating) {
      setstate("");
    }
  }, [country]);

  useEffect(() => {
    if (state_id !== 0) {
      setcity_page(1);
      setcity_count(1);
      setcity_bottom(103)
      setcity_loaded(true);
    }
  }, [state_id])

  useLayoutEffect(() => {
    let timeoutId;
    if (state_id !== 0) {
      timeoutId = setTimeout(() => {
        getCities(state_id, "state");
      }, 1);
    }
    return () => clearTimeout(timeoutId);
  }, [state_id, city_page, city_search_item]);

  useEffect(() => {
    if (state !== "" && !isupdating) {
      setempty_state(false);
      setcity("");
    }
  }, [state]);

  useEffect(() => {
    if (state !== "" && togstate) {
      setcity("");
      setpincode("");
    }
  }, [state]);

  useEffect(() => {
    if (city !== "" && togcity) {
      setpincode("");
    }
  }, [city]);

  useEffect(() => {
    if (isupdating) {
      settogstate(false);
      settogcity(false);
    }
  }, []);

  useEffect(() => {
    if (city_id !== 0) {
      setpincode_page(1);
      setpincode_count(1);
      setpincode_bottom(103);
      setpincode_loaded(true);
    }
  }, [city_id])

  useLayoutEffect(() => {
    let timeoutId;
    if (city_id !== 0) {
      timeoutId = setTimeout(() => {
        getPincode(city_id, "city");
      }, 1);
    }
    return () => clearTimeout(timeoutId);
  }, [city_id, pincode_page, pincode_search_item]);

  useEffect(() => {
    if (city !== "" && !isupdating) {
      setempty_state(false);
      setpincode("");
    }
  }, [city, city_page, city_search_item]);

  useEffect(() => {
    if (state === "Add New") {
      setother_state("");
    }
  }, [state]);

  useEffect(() => {
    if (city === "Add New") {
      setother_city("");
    }
  }, [city]);

  //For Checker Maker
  const [current_status, setcurrent_status] = useState("");
  const [status_toggle, setstatus_toggle] = useState(false);
  const [message, setmessage] = useState("");
  const [message_error, setmessage_error] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    setmessage_error(false);
  };

  useEffect(() => {
    if (user.user_department_name === "ADMIN") {
      setcurrent_status("NOT APPROVED");
      setstatus_toggle(true);
    } else if (
      user.user_department_name === "ACCOUNTANT" ||
      user.user_department_name === "ACCOUNTANT" ||
      user.user_department_name + " " + user.designation_name ===
      "ACCOUNT MANAGER" ||
      user.is_superuser
    ) {
      setcurrent_status("APPROVED");
      setstatus_toggle(true);
    } else {
      setcurrent_status("NOT APPROVED");
      // setstatus_toggle(false)
    }
  }, [user, isupdating]);

  const update_locationstatus = (id) => {
    axios
      .put(
        ServerAddress + "master/update_location/" + id,
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
          navigate("/master/locations");
        }
      })
      .catch(function (err) {
        alert(`rror While  Updateing Coloader ${err}`);
      });
  };

  const handleSubmit = () => {
    if (message === "") {
      setmessage_error(true);
    } else {
      update_locationstatus(location.id);
      setShow(false);
    }
  };
  const handlClk = () => {
    navigate("/locations/locationHistory/LocationHistoryPage", {
      state: { location: location },
    });
  };

  //for validation
  useLayoutEffect(() => {
    if (other_state !== "") {
      setother_state_error(false);
    }
    if (other_city !== "") {
      setother_city_error(false);
    }
    if (other_pincode !== "") {
      setother_pincode_error(false);
    }
    if (other_pincode.length === 6) {
      setpincode_len_error(false);
    }
  }, [other_state, other_city, other_pincode]);

  console.log("pintype", other_pincode, typeof other_pincode);
  return (

    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Reject Resion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup>
            <Label for="exampleText">Text Area</Label>
            <Input
              id="exampleText"
              name="text"
              type="textarea"
              style={{ height: "90px" }}
              onChange={(e) => {
                setmessage(e.target.value);
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
          if (country === "") {
            setcountry_error(true);
          } else if (country !== "" && state === "") {
            setempty_state(true);
          } else if (state === "Add New" && zone === "") {
            setzone_error(true);
          } else if (state === "Add New" && zone !== "" && other_state === "") {
            setother_state_error(true);
          } else if (state !== "" && city === "") {
            setempty_city(true);
          } else if (city === "Add New" && other_city === "") {
            setother_city_error(true);
          } else if (city !== "" && pincode === "") {
            setpincode_error(true);
          } else if (pincode === "Add New" && other_pincode === "") {
            setother_pincode_error(true);
          }
          //         else if(pincode === "Add New" && other_pincode !== "" && other_pincode.length !== 6){
          // setpincode_len_error(true);
          //         }
          else {
            validation.handleSubmit(e.values);
          }
          return false;
        }}
      >
        {/* Locations */}
        <div className="mt-3">
          <PageTitle page={isupdating ? "Update Locations" : "Add Locations"} />
          <Title
            title={isupdating ? "Update Locations" : "Add Locations"}
            parent_title="Masters"
          />
        </div>
        {/* Add For History Button  */}
        {isupdating && (
          <div style={{ justifyContent: "right", display: "flex",marginRight:"20px"}}>
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
        )}
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
                    <Col lg={4} md={4} sm={4}>
                      <div className="mb-3">
                        <Label className="header-child">Country*</Label>
                        <SearchInput
                          data_list={country_list_s}
                          setdata_list={setcountry_list_s}
                          data_item_s={country}
                          set_data_item_s={setcountry}
                          setsearch_item={setcountry_search_item}
                          set_id={setcountry_id}
                          page={country_page}
                          setpage={setcountry_page}
                          disable_me={isupdating}
                          // with_add={26}
                          add_nav={"/master/locations"}
                          error_message={"Please Select Any Country"}
                          error_s={country_error}
                          loaded={country_loaded}
                          count={country_count}
                          bottom={country_bottom}
                          setbottom={setcountry_bottom}
                        // add_nav={'/master/locations/addlocation'}
                        />
                      </div>
                      <div className="mt-1 error-text" color="danger">
                        {empty_country ? "Please Select Any Country" : null}
                      </div>
                    </Col>

                    {country === "Add New" ? (
                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-2">
                          <Label className="header-child">Add Country*</Label>
                          <Input
                            onChange={(val) => {
                              setother_country(val.target.value);
                            }}
                            onBlur={() => {
                              if (other_country !== "") {
                                if (
                                  window.confirm(
                                    `Do you want to add country ${toTitleCase(
                                      other_country
                                    )}?`
                                  )
                                ) {
                                  setCountry();
                                } else {
                                  setcountry("");
                                }
                              }
                            }}
                            value={other_country}
                            type="text"
                            name="other_country"
                            className="form-control-md"
                            id="input"
                            placeholder="Enter Other State"
                          />
                        </div>
                      </Col>
                    ) : null}

                    {country !== "Add New" && country ? (
                      <Col lg={4} md={4} sm={4}>
                        <div className="mb-3">
                          <Label className="header-child">State*</Label>
                          <SearchInput
                            data_list={state_list_s}
                            setdata_list={setstate_list_s}
                            data_item_s={state}
                            set_data_item_s={setstate}
                            setsearch_item={setstate_search_item}
                            set_id={setstate_id}
                            page={state_page}
                            setpage={setstate_page}
                            error_message={"Please Select Any State"}
                            error_s={empty_state}
                            loaded={state_loaded}
                            count={state_count}
                            bottom={state_bottom}
                            setbottom={setstate_bottom}
                          />
                          {/* <div className="mt-1 error-text" color="danger">
                          {empty_state ? "Please Select Any State" : null}
                        </div> */}
                        </div>
                      </Col>
                    ) : (
                      ""
                    )}

                    {state === "Add New" && country ? (
                      <>
                        <Col lg={4} md={6} sm={6}>
                          <div className="mb-3">
                            <Label className="header-child">Select Zone*</Label>
                            <NSearchInput
                              data_list={zone_list}
                              data_item_s={zone}
                              set_data_item_s={setzone}
                              show_search={false}
                              error_message={"Zone is required"}
                              error_s={zone_error}
                            />
                            {/* <div className="mt-1 error-text" color="danger">
                            {zone_error ? "Zone is required" : null}
                          </div> */}
                          </div>
                        </Col>

                        <Col lg={4} md={6} sm={6}>
                          <div className="mb-2">
                            <Label className="header-child">Add State*</Label>
                            <Input
                              onChange={(val) =>
                                setother_state(val.target.value)
                              }
                              onBlur={() => {
                                if (other_state !== "" && zone !== "") {
                                  if (
                                    window.confirm(
                                      `Do You Want To Add State ${toTitleCase(
                                        other_state
                                      )}?`
                                    )
                                  ) {
                                    setState();
                                  } else {
                                    setstate("");
                                  }
                                }
                              }}
                              value={other_state}
                              type="text"
                              name="other_city"
                              className="form-control-md"
                              id="input"
                              placeholder="Enter Other State"
                            />
                            {other_state_error ? (
                              <div
                                style={{ fontSize: "10.5px", color: "#f46a6a" }}
                              >
                                Please Enter State
                              </div>
                            ) : null}
                          </div>
                        </Col>
                      </>
                    ) : null}

                    {state !== "Add New" && state ? (
                      <Col lg={4} md={4} sm={4}>
                        <div className="mb-3">
                          <Label className="header-child">City*</Label>
                          <SearchInput
                            data_list={city_list_s}
                            setdata_list={setcity_list_s}
                            data_item_s={city}
                            set_data_item_s={setcity}
                            set_id={setcity_id}
                            page={city_page}
                            setpage={setcity_page}
                            setsearch_item={setcity_search_item}
                            error_message={"Please Select Any City"}
                            error_s={empty_city}
                            loaded={city_loaded}
                            count={city_count}
                            bottom={city_bottom}
                            setbottom={setcity_bottom}
                          />
                        </div>
                        {/* <div className="mt-1 error-text" color="danger"> */}
                        {/* {empty_district ? "Please Select Any District" : null} */}
                        {/* </div> */}
                      </Col>
                    ) : null}

                    {city === "Add New" ? (
                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-2">
                          <Label className="header-child">Add City*</Label>
                          <Input
                            onChange={(val) => setother_city(val.target.value)}
                            onBlur={() => {
                              if (other_city !== "") {
                                if (
                                  window.confirm(
                                    `Do you Want To Add City ${toTitleCase(
                                      other_city
                                    )} in ${toTitleCase(state)} ?`
                                  )
                                ) {
                                  setCity();
                                } else {
                                  if (isupdating === false) {
                                    setcity("");
                                  }
                                }
                              }
                            }}
                            value={other_city}
                            type="text"
                            name="other_district"
                            className="form-control-md"
                            id="input"
                            placeholder="Enter Other City"
                          />

                          {other_city_error ? (
                            <div
                              style={{ fontSize: "10.5px", color: "#f46a6a" }}
                            >
                              Please Enter City
                            </div>
                          ) : null}
                        </div>
                      </Col>
                    ) : null}

                    {city !== "Add New" && city && state ? (
                      <Col lg={4} md={4} sm={4}>
                        <div className="mb-3">
                          <Label className="header-child">Pin Code*</Label>
                          <SearchInput
                            data_list={pincode_list_s}
                            setdata_list={setpincode_list_s}
                            data_item_s={pincode}
                            set_data_item_s={setpincode}
                            set_id={setpincode_id}
                            page={pincode_page}
                            setpage={setpincode_page}
                            setsearch_item={setpincode_search_item}
                            error_message={"Please Select Any Pincode"}
                            error_s={pincode_error}
                            loaded={pincode_loaded}
                            count={pincode_count}
                            bottom={pincode_bottom}
                            setbottom={setpincode_bottom}
                          />
                        </div>
                        <div className="mt-1 error-text" color="danger">
                          {/* {empty_district ? "Please Select Any District" : null} */}
                        </div>
                      </Col>
                    ) : null}

                    {pincode === "Add New" ? (
                      <>
                        <Col lg={4} md={6} sm={6}>
                          <div className="mb-3">
                            <Label className="header-child">
                              Add Pin Code*
                            </Label>
                            <Input
                              onChange={(val) =>
                                setother_pincode(val.target.value)
                              }
                              onBlur={() => {
                                if (
                                  other_pincode !== "" &&
                                  other_pincode.length === 6
                                ) {
                                  if (
                                    window.confirm(
                                      `Do You Want To Add Pin Code ${toTitleCase(
                                        other_pincode
                                      )} ?`
                                    )
                                  ) {
                                    setPicode();
                                  } else {
                                    if (isupdating === false) {
                                      setPicode("");
                                    }
                                  }
                                } else {
                                  setpincode_len_error(true);
                                }
                              }}
                              value={other_pincode}
                              type="number"
                              name="other_pincode"
                              className="form-control-md"
                              id="input"
                              placeholder="Enter Other Pin Code"
                            />
                            {other_pincode_error ? (
                              <div
                                style={{ fontSize: "10.5px", color: "#f46a6a" }}
                              >
                                Please Enter Pincode
                              </div>
                            ) : null}

                            {pincode_len_error ? (
                              <div
                                style={{ fontSize: "10.5px", color: "#f46a6a" }}
                              >
                                Please Enter a Valid Pincode
                              </div>
                            ) : null}
                          </div>
                        </Col>
                      </>
                    ) : null}

                    {city &&
                      state &&
                      pincode &&
                      city !== "Add New" &&
                      state !== "Add New" &&
                      pincode !== "Add New" ? (
                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-3">
                          <Label className="header-child">Locality*</Label>
                          <Input
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.locality || ""}
                            invalid={
                              validation.touched.locality &&
                                validation.errors.locality
                                ? true
                                : false
                            }
                            type="text"
                            name="locality"
                            className="form-control-md"
                            id="input"
                            placeholder="Enter Locality"
                          />
                          {validation.touched.locality &&
                            validation.errors.locality ? (
                            <FormFeedback type="invalid">
                              {validation.errors.locality}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                    ) : (
                      ""
                    )}
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
              <button
                type="submit"
                className={
                  isupdating && user.user_department_name === "ADMIN"
                    ? "btn btn-info m-1"
                    : !isupdating
                      ? "btn btn-info m-1"
                      : "btn btn-success m-1"
                }
              >
                {isupdating &&
                  (user.user_department_name === "ADMIN" || user.is_superuser)
                  ? "Update"
                  : !isupdating
                    ? "Save"
                    : "Approved"}
              </button>

              {isupdating &&
                user.user_department_name !== "ADMIN" &&
                !user.is_superuser && (
                  <button
                    type="button"
                    className="btn btn-danger m-1"
                    onClick={handleShow}
                  >
                    Rejected
                  </button>
                )}
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

export default AddLocation;
