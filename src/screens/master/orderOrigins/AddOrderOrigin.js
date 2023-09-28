import React, { useState, useEffect, useLayoutEffect } from "react";
import "../../../assets/scss/forms/form.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IconContext } from "react-icons";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { MdAddCircleOutline, MdRemoveCircleOutline } from "react-icons/md";
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
import { ServerAddress } from "../../../constants/ServerAddress";
import SearchInput from "../../../components/formComponent/searchInput/SearchInput";
import toTitleCase from "../../../lib/titleCase/TitleCase";
import { setToggle } from "../../../store/parentFilter/ParentFilter";
import {
  setAlertType,
  setDataExist,
  setShowAlert,
} from "../../../store/alert/Alert";
import PageTitle from "../../../components/pageTitle/PageTitle";
import Title from "../../../components/title/Title";
import { Button } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';

const AddOrderOrigin = () => {
  const user = useSelector((state) => state.authentication.userdetails);
  const [customer, setcustomer] = useState([]);
  const accessToken = useSelector((state) => state.authentication.access_token);
  const [isupdating, setisupdating] = useState(false);
  const location_data = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [circle_btn, setcircle_btn] = useState(true);

  // Location Info
  const [state, setstate] = useState("");
  const [state_id, setstate_id] = useState(0);
  const [state_error, setstate_error] = useState(false);

  const [city_list_s, setcity_list_s] = useState([]);
  const [citydata, setcitydata] = useState([]);

  const [data, setdata] = useState(false);
  const [city, setcity] = useState("");
  const [city_id, setcity_id] = useState(0);
  const [temp_state, settemp_state] = useState("");
  const [city_page, setcity_page] = useState(1);
  const [city_search_item, setcity_search_item] = useState("");
  const [city_loaded, setcity_loaded] = useState(false);
  const [city_count, setcity_count] = useState(1);

  const [by_pincode, setby_pincode] = useState(false);
  const [pincode_list_s, setpincode_list_s] = useState([]);
  const [pincode, setpincode] = useState("");

  const [pincode_page, setpincode_page] = useState(1);
  const [pincode_search_item, setpincode_search_item] = useState("");
  const [pincode_id, setpincode_id] = useState(0);
  const [pincode_loaded, setpincode_loaded] = useState(false);

  const [locality, setlocality] = useState("");
  const [locality_list_s, setlocality_list_s] = useState([]);
  const [locality_page, setlocality_page] = useState(1);
  const [locality_search_item, setlocality_search_item] = useState("");
  const [locality_id, setlocality_id] = useState(0);

  const [billto_list_s, setbillto_list_s] = useState([]);
  const [billto, setbillto] = useState("");
  const [billto_id, setbillto_id] = useState(0);
  const [billto_page, setbillto_page] = useState(1);
  const [billto_search_item, setbillto_search_item] = useState("");
  const [billto_loaded, setbillto_loaded] = useState(false);
  const [billto_count, setbillto_count] = useState(1);

  const [client_list_s, setclient_list_s] = useState([]);
  const [client, setclient] = useState("");
  const [client_id, setclient_id] = useState(0);
  const [client_page, setclient_page] = useState(1);
  const [client_search_item, setclient_search_item] = useState("");
  const [client_loaded, setclient_loaded] = useState(false);
  const [client_count, setclient_count] = useState(1);

  //error state
  const [bill_to_error, setbill_to_error] = useState(false);
  const [client_error, setclient_error] = useState(false);

  const [city_error, setcity_error] = useState(false);
  const [pincode_error, setpincode_error] = useState(false);
  const [locality_error, setlocality_error] = useState(false);

  const handleAction = () => {
    dispatch(setToggle(true));
    navigate("/master/orderorigins");
  };

  const toggle_circle = () => {
    setcircle_btn(!circle_btn);
  };

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      name: toTitleCase(customer.name) || "",
      address_line_1: toTitleCase(customer.address_line1) || "",
      email: customer.email || "",
      phone_number: customer.phone_number || "",
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      address_line_1: Yup.string().required("Address is required"),
      email: Yup.string().email().required("Email is required"),
      phone_number: Yup.string()
        .min(10,"Phone number must be at least 10 characters")
        .max(10,"Phone number must be at most 10 characters")
        .required("Phone number is required"),
    }),

    onSubmit: (values) => {
      isupdating ? updateOrderOrigin(values) : addOrderOrigin(values);
    },
  });

  // const getCities = (place_id, filter_by) => {
  //   setby_pincode(false);
  //   let cities_list = [];
  //   axios
  //     .get(
  //       ServerAddress +
  //       `master/all_cities/?search=${""}&p=${city_page}&records=${10}&city_search=${city_search_item}` +
  //       "&place_id=" +
  //       place_id +
  //       "&filter_by=" +
  //       filter_by,
  //       {
  //         headers: { Authorization: `Bearer ${accessToken}` },
  //       }
  //     )
  //     .then((resp) => {
  //       setcitydata(resp.data.results);
  //       setdata(true);
  //       if(resp.data.next === null) {
  //         setcity_loaded(false);
  //       } else {
  //         setcity_loaded(true);
  //       }

  //       if (resp.data.results.length > 0) {
  //         if (city_page === 1) {
  //           cities_list = resp.data.results.map((v) => [
  //             v.id,
  //             toTitleCase(v.city),
  //             toTitleCase(v.state_name),
  //           ]);
  //         } else {
  //           cities_list = [
  //             ...city_list_s,
  //             ...resp.data.results.map((v) => [
  //               v.id,
  //               toTitleCase(v.city),
  //               toTitleCase(v.state_name),
  //             ]),
  //           ];
  //         }
  //         // setcity("");
  //         setpincode_loaded(true);
  //         // setpincode("");
  //         setcity_count(city_count +2);
  //         setcity_list_s(cities_list);
  //       } else {
  //         setcity("");
  //         setpincode("");
  //         setcity_list_s([]);
  //       }
  //     })
  //     .catch((err) => {
  //       alert(`Error Occur in Get City, ${err}`);
  //     });
  // };
  const getCities = async (place_id, filter_by) => {
    setby_pincode(false);
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
      setcitydata(resp.data.results);
      setdata(true);
      if (resp.data.next === null) {
        setcity_loaded(false);
      } else {
        setcity_loaded(true);
      }
  
      if (resp.data.results.length > 0) {
        if (city_page === 1) {
          cities_list = resp.data.results.map((v) => [
            v.id,
            toTitleCase(v.city),
            toTitleCase(v.state_name),
          ]);
        } else {
          cities_list = [
            ...city_list_s,
            ...resp.data.results.map((v) => [
              v.id,
              toTitleCase(v.city),
              toTitleCase(v.state_name),
            ]),
          ];
        }
        // setcity("");
        setpincode_loaded(true);
        // setpincode("");
        setcity_count(city_count + 2);
        setcity_list_s(cities_list);
      } else {
        setcity("");
        setpincode("");
        setcity_list_s([]);
      }
    } catch (err) {
      alert(`Error Occur in Get City, ${err}`);
    }
  };
  

  // const getPincode = (place_id, filter_by) => {
  //   let pincode_list = [];
  //   axios
  //     .get(
  //       ServerAddress +
  //       `master/all_pincode/?search=${""}&p=${pincode_page}&records=${10}&pincode_search=${pincode_search_item}` +
  //       "&place_id=" +
  //       place_id +
  //       "&filter_by=" +
  //       filter_by,
  //       {
  //         headers: { Authorization: `Bearer ${accessToken}` },
  //       }
  //     )
  //     .then((resp) => {
  //       if (filter_by !== "pincode") {
  //         if (pincode_page === 1) {
  //           pincode_list = resp.data.results.map((v) => [v.id, v.pincode]);
  //         } else {
  //           pincode_list = [
  //             ...pincode_list_s,
  //             ...resp.data.results.map((v) => [v.id, v.pincode]),
  //           ];
  //         }

  //         setpincode_list_s(pincode_list);
  //       } else if (resp.data.results.length > 0) {
  //         setcity(toTitleCase(resp.data.results[0].city_name));
  //         setcity_id(resp.data.results[0].city);
  //         setstate(toTitleCase(resp.data.results[0].state_name));
  //         setstate_id(resp.data.results[0].state);
  //         setpincode(resp.data.results[0].pincode);
  //         setpincode_id(resp.data.results[0].id);
  //       } else {
  //         dispatch(
  //           setDataExist(
  //             "You entered invalid pincode or pincode not available in database"
  //           )
  //         );
  //         dispatch(setAlertType("warning"));
  //         dispatch(setShowAlert(true));
  //         setcity("");
  //         setcity_id("");
  //         // setstate("");
  //         setstate_id("");
  //       }
  //     })
  //     .catch((err) => {
  //       alert(`Error Occur in Get City, ${err}`);
  //     });
  // };
  const getPincode = async (place_id, filter_by) => {
    let pincode_list = [];
    try {
      const resp = await axios.get(
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
      if (filter_by !== "pincode") {
        if (pincode_page === 1) {
          pincode_list = resp.data.results.map((v) => [v.id, v.pincode]);
        } else {
          pincode_list = [          ...pincode_list_s,          ...resp.data.results.map((v) => [v.id, v.pincode]),
          ];
        }
  
        setpincode_list_s(pincode_list);
      } else if (resp.data.results.length > 0) {
        setcity(toTitleCase(resp.data.results[0].city_name));
        setcity_id(resp.data.results[0].city);
        setstate(toTitleCase(resp.data.results[0].state_name));
        setstate_id(resp.data.results[0].state);
        setpincode(resp.data.results[0].pincode);
        setpincode_id(resp.data.results[0].id);
      } else {
        dispatch(
          setDataExist(
            "You entered invalid pincode or pincode not available in database"
          )
        );
        dispatch(setAlertType("warning"));
        dispatch(setShowAlert(true));
        setcity("");
        setcity_id("");
        // setstate("");
        setstate_id("");
      }
    } catch (err) {
      alert(`Error Occur in Get City, ${err}`);
    }
  };
  
  // const getLocality = (place_id, filter_by) => {
  //   let locality_list = [...locality_list_s];
  //   axios
  //     .get(
  //       ServerAddress +
  //       `master/all_locality/?search=${""}&p=${locality_page}&records=${10}` +
  //       `&place_id=${place_id}&filter_by=${filter_by}&name_search=${locality_search_item}&state=&city=&name=&data=all`,
  //       {
  //         headers: { Authorization: `Bearer ${accessToken}` },
  //       }
  //     )
  //     .then((resp) => {
  //       if (filter_by !== "locality") {
  //         if (pincode_page === 1) {
  //           locality_list = resp.data.results.map((v) => [
  //             v.id,
  //             toTitleCase(v.name),
  //           ]);
  //         } else {
  //           locality_list = [
  //             ...locality_list_s,
  //             ...resp.data.results.map((v) => [v.id, toTitleCase(v.name)]),
  //           ];
  //         }
  //         locality_list = [...new Set(locality_list.map((v) => `${v}`))].map(
  //           (v) => v.split(",")
  //         );
  //         setlocality_list_s(locality_list);
  //       } else if (resp.data.results.length > 0) {
  //         setlocality(toTitleCase(resp.data.results[0].name));
  //         setlocality_id(resp.data.results[0].id);
  //         setcity(toTitleCase(resp.data.results[0].city_name));
  //         setstate(toTitleCase(resp.data.results[0].state_name));
  //         setpincode(resp.data.results[0].pincode_name);
  //         setpincode_id(resp.data.results[0].pincode);
  //       } else {
  //         dispatch(setDataExist("You entered invalid Locality"));
  //         dispatch(setAlertType("warning"));
  //         dispatch(setShowAlert(true));
  //       }
  //     })
  //     .catch((err) => {
  //       alert(`Error Occur in Get Pincode , ${err}`);
  //     });
  // };
  const getLocality = async (place_id, filter_by) => {
    try {
      let locality_list = [...locality_list_s];
      const response = await axios.get(
        ServerAddress +
        `master/all_locality/?search=${""}&p=${locality_page}&records=${10}` +
        `&place_id=${place_id}&filter_by=${filter_by}&name_search=${locality_search_item}&state=&city=&name=&data=all`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      if (filter_by !== "locality") {
        if (pincode_page === 1) {
          locality_list = response.data.results.map((v) => [
            v.id,
            toTitleCase(v.name),
          ]);
        } else {
          locality_list = [
            ...locality_list_s,
            ...response.data.results.map((v) => [v.id, toTitleCase(v.name)]),
          ];
        }
        locality_list = [...new Set(locality_list.map((v) => `${v}`))].map(
          (v) => v.split(",")
        );
        setlocality_list_s(locality_list);
      } else if (response.data.results.length > 0) {
        setlocality(toTitleCase(response.data.results[0].name));
        setlocality_id(response.data.results[0].id);
        setcity(toTitleCase(response.data.results[0].city_name));
        setstate(toTitleCase(response.data.results[0].state_name));
        setpincode(response.data.results[0].pincode_name);
        setpincode_id(response.data.results[0].pincode);
      } else {
        dispatch(setDataExist("You entered invalid Locality"));
        dispatch(setAlertType("warning"));
        dispatch(setShowAlert(true));
      }
    } catch (err) {
      alert(`Error Occur in Get Pincode , ${err}`);
    }
  };
  
  // const getBillto = () => {
  //   // let b_temp2 = [...billto_list_s];
  //   // let b_data = [];
  //   let billto_list = [];
  //   axios
  //     .get(
  //       ServerAddress +
  //       `master/all_billtoes/?search=${""}&p=${billto_page}&records=${10}&name_search=${billto_search_item}&data=all`,
  //       {
  //         headers: { Authorization: `Bearer ${accessToken}` },
  //       }
  //     )
  //     .then((response) => {
  //       if(response.data.next === null) {
  //         setbillto_loaded(false);
  //       } else {
  //         setbillto_loaded(true);
  //       }

  //       if(response.data.results.length > 0) {
  //         if(billto_page == 1) {
  //           billto_list = response.data.results.map((v) => [
  //             v.id, v.name,
  //           ]);
  //         }
  //         else   {
  //           billto_list = [
  //             ...billto_list_s,
  //             ...response.data.results.map((v) => [v.id, toTitleCase(v.name)]),
  //           ];
  //         }
  //       } 
  //       setbillto_count(billto_count +2);
  //       setbillto_list_s(billto_list);
  //       // b_data = response.data.results;
  //       // for (let index = 0; index < b_data.length; index++) {
  //       //   b_temp2.push([b_data[index].id, toTitleCase(b_data[index].name)]);
  //       // }
  //       // b_temp2 = [...new Set(b_temp2.map((v) => `${v}`))].map((v) =>
  //       //   v.split(",")
  //       // );
  //       // setbillto_list_s(b_temp2);
  //     })
  //     .catch((err) => {
  //       alert(`Error Occur in Get Data ${err}`);
  //     });
  // };
  const getBillto = async () => {
    let billto_list = [];
  
    try {
      const response = await axios.get(
        ServerAddress +
          `master/all_billtoes/?search=${""}&p=${billto_page}&records=${10}&name_search=${billto_search_item}&data=all`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
  
      if (response.data.next === null) {
        setbillto_loaded(false);
      } else {
        setbillto_loaded(true);
      }
  
      if (response.data.results.length > 0) {
        if (billto_page === 1) {
          billto_list = response.data.results.map((v) => [v.id, v.name]);
        } else {
          billto_list = [
            ...billto_list_s,
            ...response.data.results.map((v) => [v.id, toTitleCase(v.name)]),
          ];
        }
      }
      setbillto_count(billto_count + 2);
      setbillto_list_s(billto_list);
    } catch (err) {
      alert(`Error Occur in Get Data ${err}`);
    }
  };

  
//   const getClient = () => {
//     // let temp2 = [];
//     // let data = [];
//     let client_list = [];
//     axios
//       .get(
//         ServerAddress +
//         `master/all_clients/?bill_to=${billto_id}&search=${""}&p=${client_page}&records=${10}&name_search=${client_search_item}`,
//         {
//           headers: { Authorization: `Bearer ${accessToken}` },
//         }
//       )
//       .then((response) => {

// if(response.data.next === null) {
//   setclient_loaded(false);
// } else {
//   setclient_loaded(true);
// }

// if(response.data.results.length > 0) {
//   if(client_page == 1) {
// client_list = response.data.results.map((v) => [
//   v.id,v.name,
// ]);
//   } 
//   else {
//     client_list = [
//       ...client_list_s ,
//       ...response.data.results.map((v) => [
//         v.id,v.name,
//       ])
//     ]
//   }
// setclient_count(client_count +2);
//   setclient_list_s(client_list);
// }

//         // data = response.data.results;
//         // for (let index = 0; index < data.length; index++) {
//         //   temp2.push([data[index].id, toTitleCase(data[index].name)]);
//         // }
//         // temp2 = [...new Set(temp2.map((v) => `${v}`))].map((v) => v.split(","));
//         // setclient_list_s(temp2);
//       })
//       .catch((err) => {
//         alert(`Error Occur in Get Data ${err}`);
//       });
//   };
const getClient = async () => {
  let client_list = [];

  try {
    const response = await axios.get(
      ServerAddress +
        `master/all_clients/?bill_to=${billto_id}&search=${""}&p=${client_page}&records=${10}&name_search=${client_search_item}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    if (response.data.next === null) {
      setclient_loaded(false);
    } else {
      setclient_loaded(true);
    }

    if (response.data.results.length > 0) {
      if (client_page === 1) {
        client_list = response.data.results.map((v) => [v.id, v.name]);
      } else {
        client_list = [
          ...client_list_s,
          ...response.data.results.map((v) => [v.id, v.name]),
        ];
      }
      setclient_count(client_count + 2);
      setclient_list_s(client_list);
    }
  } catch (err) {
    alert(`Error Occur in Get Data ${err}`);
  }
};


  //Add Origin
  // const addOrderOrigin = (values) => {
  //   axios
  //     .post(
  //       ServerAddress + "master/add_shipperconsignee/",
  //       {
  //         name: toTitleCase(values.name).toUpperCase(),
  //         address_line1: toTitleCase(values.address_line_1).toUpperCase(),
  //         location: locality_id,
  //         bill_to: billto_id,
  //         client: client_id,
  //         created_by: user.id,
  //         email: values.email,
  //         phone_number: values.phone_number,
  //         pincode: pincode_id,
  //         //For C&M
  //         cm_current_department: user.user_department,
  //         cm_current_status: (user.user_department_name === "ADMIN") ? 'NOT APPROVED' : (current_status).toUpperCase(),
  //         cm_transit_status: (user.user_department_name === "ADMIN") ? 'NOT APPROVED' : (current_status).toUpperCase(),
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       }
  //     )
  //     .then(function (response) {
  //       if (response.statusText === "Created") {
  //         dispatch(setToggle(true));
  //         dispatch(setDataExist(`"${values.name}" Added Sucessfully`));
  //         dispatch(setAlertType("success"));
  //         dispatch(setShowAlert(true));
  //         navigate("/master/orderorigins");
  //       } else if (response.data === "duplicate") {
  //         dispatch(setShowAlert(true));
  //         dispatch(
  //           setDataExist(`Name "${toTitleCase(values.name)}" already exists`)
  //         );
  //         dispatch(setAlertType("warning"));
  //       }
  //     })
  //     .catch((error) => {
  //       alert(`Error Happen while posting Braches Data ${error}`);
  //     });
  // };

  const addOrderOrigin = async (values) => {
    try {
      const response = await axios.post(
        ServerAddress + "master/add_shipperconsignee/",
        {
          name: toTitleCase(values.name).toUpperCase(),
          address_line1: toTitleCase(values.address_line_1).toUpperCase(),
          location: locality_id,
          bill_to: billto_id,
          client: client_id,
          created_by: user.id,
          email: values.email,
          phone_number: values.phone_number,
          pincode: pincode_id,
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
      if (response.statusText === "Created") {
        dispatch(setToggle(true));
        dispatch(setDataExist(`"${values.name}" Added Sucessfully`));
        dispatch(setAlertType("success"));
        dispatch(setShowAlert(true));
        navigate("/master/orderorigins");
      } else if (response.data === "duplicate") {
        dispatch(setShowAlert(true));
        dispatch(
          setDataExist(`Name "${toTitleCase(values.name)}" already exists`)
        );
        dispatch(setAlertType("warning"));
      }
    } catch (error) {
      alert(`Error Happen while posting Braches Data ${error}`);
    }
  };
  

  // Update Origin
  // const updateOrderOrigin = (values) => {
  //   let id = customer.id;
  //   let fields_names = Object.entries({
  //     address_line1: values.address_line_1,
  //     billto_name: billto,
  //     city_name: city,
  //     client_name: client,
  //     email: values.email,
  //     locality_name: locality,
  //     name: values.name,
  //     phone_number: values.phone_number,
  //     pincode_name: pincode,
  //     state_name: state,
  //   });

  //   let change_fields = {};

  //   for (let j = 0; j < fields_names.length; j++) {
  //     const ele = fields_names[j];
  //     let prev = location_data.state.customer[`${ele[0]}`];
  //     let new_v = ele[1];
  //     if (String(prev).toUpperCase() !== String(new_v).toUpperCase()) {
  //       change_fields[`${ele[0]}`] = new_v.toString().toUpperCase();
  //     }
  //   }

  //   axios
  //     .put(
  //       ServerAddress + "master/update_shipperconsignee/" + id,
  //       {
  //         name: toTitleCase(values.name).toUpperCase(),
  //         address_line1: toTitleCase(values.address_line_1).toUpperCase(),
  //         location: locality_id,
  //         bill_to: billto_id,
  //         client: client_id,
  //         modified_by: user.id,
  //         change_fields: change_fields,
  //         email: values.email,
  //         phone_number: values.phone_number,
  //         pincode: pincode_id,
  //         //For C&M
  //         cm_transit_status: status_toggle === true ? current_status : "",
  //         cm_current_status: (current_status).toUpperCase(),
  //         cm_remarks: ""
  //       },

  //       {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       }
  //     )
  //     .then(function (response) {
  //       if (response.data.status === "success") {
  //         dispatch(setDataExist(`"${values.name}" Updated Sucessfully`));
  //         dispatch(setAlertType("info"));
  //         dispatch(setShowAlert(true));
  //         navigate("/master/orderorigins");
  //       } else if (response.data === "duplicate") {
  //         dispatch(setShowAlert(true));
  //         dispatch(
  //           setDataExist(`"${toTitleCase(values.name)}" already exists`)
  //         );
  //         dispatch(setAlertType("warning"));
  //       }
  //     })
  //     .catch(function () {
  //       alert("Error Error While Updateing branches");
  //     });
  // };
  const updateOrderOrigin = async (values) => {
    try {
      let id = customer.id;
      let fields_names = Object.entries({
        address_line1: values.address_line_1,
        billto_name: billto,
        city_name: city,
        client_name: client,
        email: values.email,
        locality_name: locality,
        name: values.name,
        phone_number: values.phone_number,
        pincode_name: pincode,
        state_name: state,
      });
  
      let change_fields = {};
  
      for (let j = 0; j < fields_names.length; j++) {
        const ele = fields_names[j];
        let prev = location_data.state.customer[`${ele[0]}`];
        let new_v = ele[1];
        if (String(prev).toUpperCase() !== String(new_v).toUpperCase()) {
          change_fields[`${ele[0]}`] = new_v.toString().toUpperCase();
        }
      }
  
      const response = await axios.put(
        ServerAddress + "master/update_shipperconsignee/" + id,
        {
          name: toTitleCase(values.name).toUpperCase(),
          address_line1: toTitleCase(values.address_line_1).toUpperCase(),
          location: locality_id,
          bill_to: billto_id,
          client: client_id,
          modified_by: user.id,
          change_fields: change_fields,
          email: values.email,
          phone_number: values.phone_number,
          pincode: pincode_id,
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
      );
  
      if (response.data.status === "success") {
        dispatch(setDataExist(`"${values.name}" Updated Sucessfully`));
        dispatch(setAlertType("info"));
        dispatch(setShowAlert(true));
        navigate("/master/orderorigins");
      } else if (response.data === "duplicate") {
        dispatch(setShowAlert(true));
        dispatch(
          setDataExist(`"${toTitleCase(values.name)}" already exists`)
        );
        dispatch(setAlertType("warning"));
      }
    } catch (error) {
      alert("Error Error While Updateing branches");
    }
  };
  

  useLayoutEffect(() => {
    getCities("all", "all");
  }, [city_page, city_search_item]);

  useEffect(() => {
    if (city_id !== 0 && by_pincode === false) {
      setpincode_page(1);
    }
  }, [city_id, pincode_page, pincode_search_item]);

  useEffect(() => {
    getBillto();
  }, [billto_search_item, billto_page]);

  useEffect(() => {
    // setdata(false);
    if (billto_id) {
      getClient();
    }
  }, [billto_id, client_page, client_search_item]);

  useEffect(() => {
    if (pincode_id !== 0) {
      getLocality(pincode_id, "pincode");
    }
  }, [pincode_id, locality_page, locality_search_item]);

  useEffect(() => {
    if (city_id !== 0 && by_pincode === false) {
      setpincode_page(1);
      getPincode(city_id, "city");
    }
  }, [city_id, pincode_page, pincode_search_item]);

  useLayoutEffect(() => {
    try {
      let s_data = location_data.state.customer;
      setisupdating(true);
      setcustomer(s_data);
      setbillto(toTitleCase(s_data.billto_name));
      setbillto_id(s_data.billto);
      setclient(toTitleCase(s_data.client_name));
      setclient_id(s_data.client);
      setcity(toTitleCase(s_data.city_name));
      setcity_id(s_data.city);
      setpincode(s_data.pincode_name);
      setpincode_id(s_data.pincode);
      setlocality(toTitleCase(s_data.locality_name));
      setlocality_id(s_data.location);
      settemp_state(toTitleCase(s_data.state_name));
    } catch (error) { }
  }, []);

  useEffect(() => {
    if (!location_data.state) {
      setpincode("");
    }
  }, [city]);

  useEffect(() => {
    if (!location_data.state) {
      setlocality("");
    }
  }, [pincode]);

  useEffect(() => {
    if (!location_data.state) {
      setclient("");
    }
  }, [billto]);


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

  const update_originstatus = (id) => {

    axios
      .put(
        ServerAddress + "master/update_shipperconsignee/" + id,
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
          navigate("/master/orderorigins");
        }
      })
      .catch(function (err) {
        alert(`rror While  Updateing Coloader ${err}`);
      });
  };

  const handleSubmit = () => {
    if (message === "") {
      setmessage_error(true);
    }
    else {
      update_originstatus(customer.id)
      setShow(false)
    }
  }

  // Used to History
  const handlClk = () => {
    navigate(
      "/master/orderOrigins/orderOriginsHistory/OrderOriginsHistoryPage",
     {
      state: { orderorigin: customer },
    });
  };

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
          if (billto === "") {
            setbill_to_error(true);
          }
          if (client === "") {
            setclient_error(true);
          }
          if (city === "") {
            setcity_error(true);
          }
          if (city !== 0 && pincode === "") {
            setpincode_error(true);
          }
          if (city !== 0 && locality === "") {
            setlocality_error(true);
          }
          validation.handleSubmit(e.values);
          return false;
        }}
      >
        {/* Coloader */}

        <div className="mt-3">
          <PageTitle
            page={
              isupdating ? "Update Shipper/Consignee" : "Add Shipper/Consignee"
            }
          />
          <Title
            title={
              isupdating ? "Update Shipper/Consignee" : "Add Shipper/Consignee"
            }
            parent_title="Masters"
          />
        </div>

        <div className="m-3">
        {isupdating && 
            <div style={{ justifyContent: "right", display: "flex" }}>
              <Button
                type="button"
                onClick={() => {
                  handlClk();
                }}
              >
                History
              </Button>
            </div>
          }
          <Col lg={12}>
            <Card className="shadow bg-white rounded">
              <CardTitle className="mb-1 header">
                <div className="header-text-icon header-text">
                  Shipper/Consignee Details
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
                      <div className="mb-3">
                        <Label className="header-child">
                          Shipper/Consignee *
                        </Label>
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
                          name="name"
                          className="form-control-md"
                          id="input"
                          placeholder="Enter Shipper Name"
                        />
                        {validation.touched.name && validation.errors.name ? (
                          <FormFeedback type="invalid">
                            {validation.errors.name}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-3">
                        <Label className="header-child">Bill To*</Label>
                        <SearchInput
                          data_list={billto_list_s}
                          setdata_list={setbillto_list_s}
                          data_item_s={billto}
                          set_data_item_s={setbillto}
                          set_id={setbillto_id}
                          page={billto_page}
                          setpage={setbillto_page}
                          error_message={"Please Select Bill To"}
                          setsearch_item={setbillto_search_item}
                          error_s={bill_to_error}
                          loaded={billto_loaded}
                          count={billto_count}
                        />
                      </div>
                    </Col>
                    {billto !== 0 && (
                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-3">
                          <Label className="header-child">Client*</Label>
                          <SearchInput
                            data_list={client_list_s}
                            setdata_list={setclient_list_s}
                            data_item_s={client}
                            set_data_item_s={setclient}
                            set_id={setclient_id}
                            page={client_page}
                            setpage={setclient_page}
                            error_message={"Please Select Client"}
                            setsearch_item={setclient_search_item}
                            error_s={client_error}
                            loaded={client_loaded}
                            count={client_count}
                          />
                        </div>
                      </Col>
                    )}
                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-3">
                        <Label className="header-child">City*</Label>
                        <SearchInput
                          data_list={city_list_s}
                          setdata_list={setcity_list_s}
                          data_item_s={city}
                          set_data_item_s={setcity}
                          set_id={setcity_id}
                          set_temp={settemp_state}
                          page={city_page}
                          setpage={setcity_page}
                          error_message={"Please Select Any City"}
                          setsearch_item={setcity_search_item}
                          error_s={city_error}
                          loaded={city_loaded}
                          count={city_count}
                        />
                      </div>
                    </Col>

                    {city_id !== 0 && (
                      <>
                        <Col lg={4} md={6} sm={6}>
                          <div className="mb-2">
                            <Label className="header-child">PinCode*</Label>
                            <SearchInput
                              data_list={pincode_list_s}
                              setdata_list={setpincode_list_s}
                              data_item_s={pincode}
                              set_data_item_s={setpincode}
                              set_id={setpincode_id}
                              page={pincode_page}
                              setpage={setpincode_page}
                              error_message={"Please Select Any PinCode"}
                              search_item={pincode_search_item}
                              setsearch_item={setpincode_search_item}
                              error_s={pincode_error}
                            />
                          </div>
                        </Col>
                        <Col lg={4} md={6} sm={6}>
                          {pincode_loaded && (
                            <div className="mb-2">
                              <Label className="header-child">Locality*</Label>
                              <SearchInput
                                data_list={locality_list_s}
                                setdata_list={setlocality_list_s}
                                data_item_s={locality}
                                set_data_item_s={setlocality}
                                set_id={setlocality_id}
                                page={locality_page}
                                setpage={setlocality_page}
                                error_message={"Please Select Any Locality"}
                                setsearch_item={setlocality_search_item}
                                error_s={locality_error}
                              />
                            </div>
                          )}
                        </Col>
                        <Col lg={4} md={6} sm={6}>
                          <div className="mb-2">
                            <Label className="header-child">State*</Label>
                            <Input
                              value={temp_state}
                              type="text"
                              className="form-control-md"
                              id="input"
                              disabled
                            />
                          </div>
                          <div className="mt-1 error-text" color="danger">
                            {state_error ? "Please Select Any State" : null}
                          </div>
                          { }
                        </Col>

                        <Col lg={4} md={6} sm={6}>
                          <div className="mb-2">
                            <Label className="header-child">Email*</Label>
                            <Input
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.email || ""}
                              invalid={
                                validation.touched.email &&
                                  validation.errors.email
                                  ? true
                                  : false
                              }
                              type="email"
                              className="form-control-md"
                              id="input"
                              name="email"
                              placeholder="Enter Email"
                            />
                            {validation.touched.email &&
                              validation.errors.email ? (
                              <FormFeedback type="invalid">
                                {validation.errors.email}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </Col>

                        <Col lg={4} md={6} sm={6}>
                          <div className="mb-2">
                            <Label className="header-child">Phone Number*</Label>
                            <Input
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.phone_number || ""}
                              invalid={
                                validation.touched.phone_number &&
                                  validation.errors.phone_number
                                  ? true
                                  : false
                              }
                              type="number"
                              min={0}
                              className="form-control-md"
                              id="input"
                              name="phone_number"
                              placeholder="Enter Phone Number"
                            />
                            {validation.touched.phone_number &&
                              validation.errors.phone_number ? (
                              <FormFeedback>
                                {validation.errors.phone_number}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </Col>

                        <Col lg={12} md={12} sm={6}>
                          <div className="mb-2">
                            <Label className="header-child">Address*</Label>
                            <Input
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.address_line_1 || ""}
                              invalid={
                                validation.touched.address_line_1 &&
                                  validation.errors.address_line_1
                                  ? true
                                  : false
                              }
                              type="text"
                              className="form-control-md"
                              id="input"
                              name="address_line_1"
                              placeholder="Address Line 1"
                            />
                            {validation.touched.address_line_1 &&
                              validation.errors.address_line_1 ? (
                              <FormFeedback type="invalid">
                                {validation.errors.address_line_1}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </Col>
                      </>
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
                className={isupdating && (user.user_department_name === "ADMIN") ? "btn btn-info m-1" : !isupdating ? "btn btn-info m-1" : "btn btn-success m-1"}
              >
                {isupdating && (user.user_department_name === "ADMIN" || user.is_superuser) ? "Update" : !isupdating ? "Save" : "Approved"}
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

export default AddOrderOrigin;
