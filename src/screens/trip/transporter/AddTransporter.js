/* eslint-disable */
import React, { useState, useEffect, useLayoutEffect } from "react";
import { IconContext } from "react-icons";
import {
  MdAddCircleOutline,
  MdRemoveCircleOutline,
  MdDeleteForever,
  MdAdd,
} from "react-icons/md";
import { useFormik } from "formik"; //used for validation
import * as Yup from "yup"; //used for validation
import {
  Card,
  Col,
  Row,
  CardBody,
  CardTitle,
  Label,
  Form,
  Input,
  FormFeedback,
} from "reactstrap";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { ServerAddress } from "../../../constants/ServerAddress";
import SearchInput from "../../../components/formComponent/searchInput/SearchInput";
import { useDispatch, useSelector } from "react-redux";
import toTitleCase from "../../../lib/titleCase/TitleCase";
import {
  setAlertType,
  setDataExist,
  setShowAlert,
} from "../../../store/alert/Alert";
import { setToggle } from "../../../store/pagination/Pagination";

const AddTransporter = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const accessToken = useSelector((state) => state.authentication.access_token);

  const [transporter_u, settransporter_u] = useState("");

  //-----------Date----------
  const [join_date, setjoin_date] = useState("");
  const [company_start_date, setcompany_start_date] = useState("");

  const [data, setdata] = useState([]);
  const [transporter_id, settransporter_id] = useState("");

  const [get_office_location, setget_office_location] = useState("");
  const [get_hub_location, setget_hub_location] = useState("");
  const [get_bank_details, setget_bank_details] = useState("");
  //
  const [active_tab, setactive_tab] = useState("first");

  //---------Error----------------
  const [join_date_error, setjoin_date_error] = useState(false);
  const [company_start_date_error, setcompany_start_date_error] = useState(false);
  const [bank_details_error, setbank_details_error] = useState(false);

  const [office_state_error, setoffice_state_error] = useState(false);
  const [office_city_error, setoffice_city_error] = useState(false);
  const [office_pincode_error, setoffice_pincode_error] = useState(false);
  const [office_add1_error, setoffice_add1_error] = useState(false);


  //---------------===================
  const [office_address_line1, setoffice_address_line1] = useState("");
  const [office_address_line2, setoffice_address_line2] = useState("");

  const [state_list_s, setstate_list_s] = useState([]);
  const [office_state, setoffice_state] = useState("");
  const [office_state_id, setoffice_state_id] = useState("");

  const [office_city_list_s, setoffice_city_list_s] = useState([]);
  const [office_city, setoffice_city] = useState("");
  const [office_city_id, setoffice_city_id] = useState("");

  const [res_pincode_loaded, setres_pincode_loaded] = useState(false);
  const [res_pincode_list_s, setres_pincode_list_s] = useState([]);
  const [res_pincode, setres_pincode] = useState("");

  const [hub_address_line1, sethub_address_line1] = useState("");
  const [hub_address_line2, sethub_address_line2] = useState("");
  const [hub_state, sethub_state] = useState("");
  const [per_city_list_s, setper_city_list_s] = useState([]);
  const [pincode, setpincode] = useState("");
  const [pincode_list_s, setpincode_list_s] = useState([]);

  const [pincode_loaded, setpincode_loaded] = useState(false);

  const [hub_city, sethub_city] = useState("");
  const [hub_city_id, sethub_city_id] = useState("");
  const [hub_state_id, sethub_state_id] = useState("");

  const [office_location_id, setoffice_location_id] = useState("");

  const [hub_location_id, sethub_location_id] = useState("");

  const [search_item, setsearch_item] = useState("");

  const [state_page, setstate_page] = useState(1);
  const [state_search_item, setstate_search_item] = useState("");


  const [pincode_page, setpincode_page] = useState(1);
  const [pincode_search_item, setpincode_search_item] = useState("");


  const [city, setcity] = useState("");
  const [city_page, setcity_page] = useState(1);
  const [city_search_item, setcity_search_item] = useState("");
  //---------Drop Down----------


  //----------Address--------------
  const [address_save, setaddress_save] = useState(false);
  const [same_as_office, setsame_as_office] = useState(false);

  //---------------Bank deatils--------------------------
  const [bank_name, setbank_name] = useState("");
  const [ifsc_code, setifsc_code] = useState("");
  const [acc_holder_name, setacc_holder_name] = useState("");
  const [account_number, setaccount_number] = useState("");
  const [tag, settag] = useState("");
  const [tag_name, settag_name] = useState("");

  
  
  //----------state----------
  const [radio, setradio] = useState("True");
  const [isupdating, setisupdating] = useState(false);
  
  //---------toggle Btn----------
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
  
  let dimension_list = [
    bank_name,
    acc_holder_name,
    account_number,
    ifsc_code,
    tag_name,
    tag,
  ];
  const [bank_details, setbank_details] = useState([dimension_list]);

  const add_bank_details = () => {
    setbank_name("");
    setacc_holder_name("");
    setaccount_number("");
    setifsc_code("");
    settag("");
    // tag_name("");
    dimension_list = ["", "", "", "", ""];

    setbank_details([...bank_details, dimension_list]);
  };

  const delet_bank_details = (item) => {
    let temp = [...bank_details];
    const index = temp.indexOf(item);
    if (index > -1) {
      temp.splice(index, 1);
    }
    setbank_details(temp);
  };

  let temp_list = [];
  for (let i = 0; i < bank_details.length; i++) {
    let dist = {};
    dist["bank_name"] = bank_details[i][0].toUpperCase();
    dist["acc_person_name"] = bank_details[i][1].toUpperCase();
    dist["account_number"] = bank_details[i][2];
    dist["ifsc_code"] = bank_details[i][3].toUpperCase();
    dist["tag"] = bank_details[i][4];
    dist["tag_name"] = bank_details[i][5].toUpperCase();
    temp_list.push(dist);
  }



  //----------validation--------------
  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      // This should be in small letter or smallcase
      transporter_name: transporter_u.name || "",
      no_of_vehicle: transporter_u.total_vehicle || "",
      pan_no: transporter_u.pan_no || "",
      // gst_no: transporter_u.gst_no || "",
      gst_no: (transporter_u.vendor_gst && transporter_u.vendor_gst.length > 0) ? transporter_u.vendor_gst[0].gst_no || "" : "",
      credit_limit: transporter_u.credit_limit || "",
      balance: transporter_u.balance || "",
    },

    validationSchema: Yup.object({
      transporter_name: Yup.string().required("Transporter name is required"),
      no_of_vehicle: Yup.string().required("Number of vehicle is required"),
      pan_no: Yup.string().min(10).max(10).required("Pan number is required"),
      gst_no: Yup.string().min(15).max(15).required("GST Number is required"),
      credit_limit: Yup.string().required("Credit limit is required"),
      balance: Yup.string().required("Balance is required"),
    }),

    onSubmit: (values) => {
      isupdating
        ? update_transporter_data(values)
        : send_transporter_data(values);
    },
    // },
  });


  


  const getStates = () => {
    let state_list = [];
    axios
      .get(
        ServerAddress +
        `master/all_states/?search=${""}&p=${state_page}&records=${10}&state_search=${state_search_item}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        console.log("Get STATE response is==", response.data);
        for (let index = 0; index < response.data.results.length; index++) {
          const element = response.data.results[index];
          state_list.push([element.id, toTitleCase(element.state)]);
        }
        setstate_list_s(state_list);
      })
      // console.log(state_list_s)
      .catch((err) => {
        alert(`Error Occur in Get States, ${err}`);
      });
  };


  // To get CITY
  const getCities = (place_id, filter_by, state_type) => {
    let temp_list = [];
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
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        console.log("Get CITY response is==", response.data);
        for (let index = 0; index < response.data.results.length; index++) {
          const element = response.data.results[index];
          let city = toTitleCase(element.city);
          cities_list.push([element.id, city]);
          temp_list.push(city);
        }
        if (state_type == "hub_state_id") {
          setper_city_list_s(cities_list);
          sethub_city("");
        } else {
          setoffice_city_list_s(cities_list);
          setoffice_city("");
        }

        if (filter_by != "all") {
          if (state_type == "hub_state_id") {
            setpincode_loaded(true);
            setpincode("");
          } else {
            setres_pincode_loaded(true);
            setres_pincode("");
          }
        }
      })
      .catch((err) => {
        alert(`Error Occur in Get States , ${err}`);
      });
  };

  // To get PINCODE
  const getPincode = (place_id, filter_by, city_type) => {
    let pincode_list = [];
    axios
      .get(
        ServerAddress +
        `master/all_pincode/?search=${""}&p=${pincode_page}&records=${10}&pincode_search=${pincode_search_item}` +
        `&place_id=${place_id}&filter_by=${filter_by}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        console.log("Gest PINCODE response is==", response.data);
        if (filter_by != "pincode") {
          for (let index = 0; index < response.data.results.length; index++) {
            const loc = response.data.results[index];
            pincode_list.push([loc.id, String(loc.pincode)]);
          }
          if (city_type == "res_city") {
            setres_pincode_list_s(pincode_list);
          } else {
            setpincode_list_s(pincode_list);
          }
        } else {
          if (city_type == "res_city") {
            setoffice_location_id(response.data.id);
            setoffice_city(toTitleCase(response.data.city_name));
            setoffice_state(toTitleCase(response.data.state_name));
            setoffice_state_id(response.data.state);
            setoffice_city_id(response.data.city);
          } else {
            sethub_location_id(response.data.id);
            sethub_city(toTitleCase(response.data.city_name));
            sethub_state(toTitleCase(response.data.state_name));
            sethub_state_id(response.data.state);
            sethub_city_id(response.data.city);
          }
        }
      })
      .catch((err) => {
        alert(`Error Occur in Get PINCODE , ${err}`);
      });
  };

  const send_transporter_data = (values) => {
    axios
      .post(
        ServerAddress + "trip/add_transporter/",
        {
          name: values.transporter_name,
          is_active: radio,
          joined_date: join_date,
          total_vehicle: values.no_of_vehicle,
          started_date: company_start_date,
          pan_no: values.pan_no,
          gst_no: values.gst_no,
          credit_limit: values.credit_limit,
          balance: values.balance,
          bank_deatils: temp_list,

          address: [
            [
              "OFFICE ADDRESS",
              office_address_line1,
              office_address_line2,
              office_location_id,
            ],
            [
              "HUB ADDRESS",
              same_as_office ? office_address_line1 : hub_address_line1,
              same_as_office ? office_address_line2 : hub_address_line2,
              same_as_office ? office_location_id : hub_location_id,
            ],
          ],
        },

        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (response) {
        alert("Done");
        if (response.statusText === "Created") {
          dispatch(setToggle(true));
          dispatch(
            setDataExist(
              `New Transporter '${values.transporter_name}' Added Sucessfully`
            )
          );
          dispatch(setAlertType("success"));
          dispatch(setShowAlert(true));
          navigate(-1);
        }
      })
      .catch((error) => {
        alert(`Error Happen while posting Transporter Data ${error}`);
      });
  };

  const update_transporter_data = (values) => {
    axios
      .put(
        ServerAddress + "trip/add_transporter/",
        {
          name: values.transporter_name,
          is_active: radio,
          joined_date: join_date,
          total_vehicle: values.no_of_vehicle,
          started_date: company_start_date,
          pan_no: values.pan_no,
          gst_no: values.gst_no,
          credit_limit: values.credit_limit,
          balance: values.balance,
          bank_deatils: temp_list,

          address: [
            [office_address_line1, office_address_line2, office_location_id],
            [
              same_as_office ? office_address_line1 : hub_address_line1,
              same_as_office ? office_address_line2 : hub_address_line2,
              same_as_office ? office_location_id : hub_location_id,
            ],
          ],
        },

        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (response) {
        alert("Done");
        if (response.statusText === "Created") {
          dispatch(setToggle(true));
          dispatch(
            setDataExist(
              ` Transporter '${values.transporter_name}' Updated Sucessfully`
            )
          );
          dispatch(setAlertType("info"));
          dispatch(setShowAlert(true));
          navigate(-1);
        }
      })
      .catch((error) => {
        alert(`Error Happen while posting Transporter Data ${error}`);
      });
  };

  useLayoutEffect(() => {
    getCities("all", "all");
    getStates();
  }, [state_page, state_search_item]);

  useEffect(() => {
    if (office_state_id != "") {
      getCities(office_state_id, "state", "res_state_id");
    }
  }, [office_state_id]);

  useEffect(() => {
    if (hub_state_id != "") {
      setsame_as_office(false);
      getCities(hub_state_id, "state", "hub_state_id");
    }
  }, [hub_state_id]);

  useEffect(() => {
    if (office_city_id != "") {
      getPincode(office_city_id, "city", "res_city");
    }
  }, [office_city_id]);

  useEffect(() => {
    if (hub_city_id != "") {
      setsame_as_office(false);
      getPincode(hub_city_id, "city", "hub_city");
    }
  }, [hub_city_id]);

  // const get_transporter_another_data = () => {
  //   axios
  //     .get(
  //       server_address + "Transporter/get-Transporter",
  //       {
  //         // headers: { Authorization: `Bearer ${accessToken}` },
  //       }
  //     )
  //     .then(response => {
  //       // console.log("response",response)
  //       console.log("Transporter another data", response.data);

  //       if (response.data.data.length != 0) {
  //         let bank_info = response.data.data;
  //         console.log("ytytyuikl", bank_info)
  //         let temp_list = [];
  //         let temp_bank_list = [];
  //         for (let index = 0; index < bank_info.length; index++) {
  //           const ele = bank_info[index];

  //           console.log("8i8ii",ele)
  //           temp_list.push([
  //             ele.banks_name,
  //             ele.ifsc_codes,
  //             ele.acc_person_name,
  //             ele.account_number,
  //             ele.tag,
  //             ele.tag_name,
  //           ]);
  //           temp_bank_list.push(ele.id);
  //         }
  //         setbank_name(temp_list[0][0]);
  //         setifsc_code(temp_list[0][1]);
  //         setacc_holder_name(temp_list[0][2]);
  //         setaccount_number(temp_list[0][3]);
  //         settag(temp_list[0][4]);
  //         settag_name(temp_list[0][5]);
  //         setbank_details(temp_list);
  //         settransport_id_list(temp_bank_list);
  //         console.log("bank details list", temp_list);
  //       }
  //     })
  //     .catch(err => {
  //       alert(`Error Occur in Get , ${err}`);
  //     });
  // };

  // if (data.length != 0) {
  useEffect(() => {
    let temp_list = [];
    let temp_bank_list = [];
    if (isupdating && data && data.length > 0) {      
      for (let index = 0; index < data.length; index++) {
        // console.log("8i8ii",ele)
        temp_list.push([
          data[index].Bank_Name,
        data[index].Ac_Person_Name,
        data[index].Account_Number,
        data[index].Ifsc_Code,
        data[index].Tag,
        data[index].Tag_Name,
      ]);
      temp_bank_list.push(data[index].id);
    }
  }
    // setbank_name(temp_list[0][0]);
    // setacc_holder_name(temp_list[0][1]);
    // setaccount_number(temp_list[0][2]);
    // setifsc_code(temp_list[0][3]);
    // settag(temp_list[0][4]);
    // settag_name(temp_list[0][5]);
    // setbank_details(temp_list);
    // settransport_id_list(temp_bank_list);
  }, []);

  // useEffect(() => {
  //   if (transporter_id != "") {
  //     get_transporter_another_data();
  //   }
  // }, [transporter_id])

  const handleAction = () => {
    dispatch(Toggle(true));
    navigate("/Transporter_details/Transporter");
  };

  useLayoutEffect(() => {
    try {
      let transporter_loc = location.state.transport;
      console.log("transporter_loc====",transporter_loc);
      settransporter_u(transporter_loc);
      settransporter_id(transporter_loc.id);
      setradio(transporter_loc.Is_Active);

      let s_date = transporter_loc.created_at;
      let f_date_f = s_date.split("T");
      let f_date = f_date_f[0];
      let l_fdate = f_date;
      setjoin_date(l_fdate);

      let vendor_gst_no=transporter_loc.vendor_gst[0];

      setcompany_start_date(transporter_loc.started_date);
      // console.log("transporter_loc.addresses", transporter_loc.addresses);
      // setget_office_location(transporter_loc.addresses[0]);
      let office_add = transporter_loc.addresses.filter(
        (v) => v.address_type == "OFFICE ADDRESS"
      );
      // console.log("office_add",office_add);
      setoffice_address_line1("address_Line_1");
      setoffice_address_line2(office_add[0].address_Line_2);
      setoffice_state(office_add[0].state);
      setoffice_city(office_add[0].city);
      setres_pincode(office_add[0].pincode);
      let hub_add = transporter_loc.addresses.filter(
        (v) => v.address_type == "HUB ADDRESS"
        );
      // console.log("hub_add",hub_add);
      sethub_address_line1("address_Line_1");
      sethub_address_line2(hub_add[0].address_Line_2);
      sethub_state(hub_add[0].state);
      sethub_city(hub_add[0].city);
      setpincode(hub_add[0].pincode);
      // if(office_add == "OFFICE ADDRESS") {
      // }
      // setget_hub_location(transporter_loc.addresses[1]);
      setget_bank_details(transporter_loc.bankers);
      setoffice_address_line1(transporter_loc.Address_Line_1);
      setcity(transporter_loc.City);
      sethub_address_line2(location.state.hub_address_line1);
      setdata(transporter_u.bankers);
      setisupdating(true);
    } catch (error) { }
  }, []);

  return (
    <div>
      <Form
        onSubmit={(e) => {
          e.preventDefault();

          //variables for scroll
          let ele = window.document.getElementById("section1");

          if (join_date == "") {
            setjoin_date_error(true);
            ele.scrollIntoView();
          }
          if (company_start_date == "") {
            setcompany_start_date_error(true);
            ele.scrollIntoView();
          }
          if (office_state == "") {
            setoffice_state_error(true);
          }
          if (office_city == "") {
            setoffice_city_error(true);
          }
          if (res_pincode == "") {
            setoffice_pincode_error(true);
          }
          validation.handleSubmit(e.values);
          return false;
        }}
      >
        <div className="m-4">
          <div className=" mb-2 main-header">Add Transporter </div>

          {/* Basic info  */}
          <Col lg={12} id="section1">
            <Card className="shadow bg-white rounded">
              <CardTitle className="mb-1 header">
                <div className="header-text-icon header-text">
                  Basic info
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
                          Transporter Name *
                        </Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.transporter_name || ""}
                          invalid={
                            validation.touched.transporter_name &&
                              validation.errors.transporter_name
                              ? true
                              : false
                          }
                          type="text"
                          name="transporter_name"
                          className="form-control-md "
                          id="input"
                          placeholder="Enter Transporter Name"
                        />
                        {validation.touched.transporter_name &&
                          validation.errors.transporter_name ? (
                          <FormFeedback type="invalid">
                            {validation.errors.transporter_name}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child text-color">
                          Is Active*
                        </Label>
                        <Row>
                          <Col md={4} sm={4}>
                            <div className="form-check mb-2">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="is_active"
                                id="exampleRadios2"
                                value="True"
                                // defaultChecked
                                checked
                                // disabled={isupdating ? radio : ""}
                                // checked={radio === "True"}
                                onClick={() => {
                                  setradio("True");
                                }}
                              />
                              <label
                                className="form-check-label input-box"
                                htmlFor="exampleRadios2"
                              >
                                Yes
                              </label>
                            </div>
                          </Col>
                          <Col lg={4} md={4} sm={4}>
                            <div className="form-check mb-2">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="is_active"
                                id="exampleRadios3"
                                value="False"
                                // onChange={handleChange}
                                // disabled={isupdating ? radio : ""}
                                // checked={radio === "False"}
                                // defaultChecked
                                onClick={() => {
                                  setradio("False");
                                }}
                              />

                              <label
                                className="form-check-label input-box"
                                htmlFor="exampleRadios1"
                              >
                                {" "}
                                No{" "}
                              </label>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child text-color">
                          Joined Date*
                        </Label>
                        <Input
                          type="date"
                          className="form-control d-block form-control-md "
                          value={join_date}
                          onChange={(val) => {
                            setjoin_date(val.target.value);
                          }}
                          onBlur={() => {
                            setjoin_date_error(true);
                          }}
                          invalid={join_date == "" && join_date_error}
                        />
                        {join_date == "" && join_date_error ? (
                          <FormFeedback type="invalid">
                            Join Date is required
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-3">
                        <Label className="header-child">NO Of Vehicle*</Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.no_of_vehicle || ""}
                          invalid={
                            validation.touched.no_of_vehicle &&
                              validation.errors.no_of_vehicle
                              ? true
                              : false
                          }
                          type="number"
                          min={0}
                          name="no_of_vehicle"
                          className="form-control-md "
                          id="input"
                          placeholder="Enter Number Of Vehicle"
                        />
                        {validation.touched.no_of_vehicle &&
                          validation.errors.no_of_vehicle ? (
                          <FormFeedback type="invalid">
                            {validation.errors.no_of_vehicle}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-3">
                        <Label className="header-child">
                          Company Started Date *
                        </Label>
                        <Input
                          type="date"
                          className="form-control d-block form-control-md "
                          value={company_start_date}
                          onChange={(val) => {
                            setcompany_start_date(val.target.value);
                          }}
                          onBlur={() => {
                            setcompany_start_date_error(true);
                          }}
                          invalid={
                            company_start_date == "" && company_start_date_error
                          }
                        />
                        {company_start_date == "" &&
                          company_start_date_error ? (
                          <FormFeedback type="invalid">
                            Company Start Date is required
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-3">
                        <Label className="header-child">PAN NO*</Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.pan_no || ""}
                          invalid={
                            validation.touched.pan_no &&
                              validation.errors.pan_no
                              ? true
                              : false
                          }
                          type="text"
                          name="pan_no"
                          className="form-control-md "
                          id="input"
                          placeholder="Enter PAN Number"
                        />
                        {validation.touched.pan_no &&
                          validation.errors.pan_no ? (
                          <FormFeedback type="invalid">
                            {validation.errors.pan_no}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-3">
                        <Label className="header-child">GST NO*</Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.gst_no}
                          invalid={
                            validation.touched.gst_no &&
                              validation.errors.gst_no
                              ? true
                              : false
                          }
                          type="text"
                          name="gst_no"
                          className="form-control-md"
                          id="input"
                          placeholder="Enter GST Number"
                        />
                        {validation.touched.gst_no &&
                          validation.errors.gst_no ? (
                          <FormFeedback type="invalid">
                            {validation.errors.gst_no}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-3">
                        <Label className="header-child">Credit Limit*</Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.credit_limit || ""}
                          invalid={
                            validation.touched.credit_limit &&
                              validation.errors.credit_limit
                              ? true
                              : false
                          }
                          min={0}
                          type="number"
                          name="credit_limit"
                          className="form-control-md "
                          id="input"
                          placeholder="Enter Credit Limit"
                        />
                        {validation.touched.credit_limit &&
                          validation.errors.credit_limit ? (
                          <FormFeedback type="invalid">
                            {validation.errors.credit_limit}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-3">
                        <Label className="header-child">Balance*</Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.balance || ""}
                          invalid={
                            validation.touched.balance &&
                              validation.errors.balance
                              ? true
                              : false
                          }
                          min={0}
                          type="number"
                          name="balance"
                          className="form-control-md "
                          id="input"
                          placeholder="Enter Balance"
                        />
                        {validation.touched.balance &&
                          validation.errors.balance ? (
                          <FormFeedback type="invalid">
                            {validation.errors.balance}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              ) : null}
            </Card>
          </Col>

          {/*Address Info*/}
          <Col lg={12} id="section2">
            <Card className="shadow bg-white rounded">
              <CardTitle className="mb-1">
                <div className="btn-header">
                  <div className="btn-subheader">
                    <div
                      style={{
                        background: active_tab == "first" ? "#C4D7FE" : null,
                      }}
                      className="btn1 footer-text"
                      value="first"
                      onClick={() => {
                        setactive_tab("first");
                      }}
                    >
                      Office Address
                    </div>

                    <div
                      style={{
                        background: active_tab == "second" ? "#C4D7FE" : null,
                      }}
                      className="btn1 footer-text"
                      value="second"
                      onClick={() => {
                        setactive_tab("second");
                      }}
                    >
                      Hub Address
                    </div>
                  </div>
                  <div className="btn-icon">
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
                  <Row>
                    {active_tab == "first" ? (
                      /*office address*/
                      <>
                        <Col lg={4} md={6} sm={6}>
                          <div className="mb-3">
                            <Label className="header-child">
                              Address Line 1*
                            </Label>
                            <Input
                              onChange={(val) => {
                                setoffice_address_line1(val.target.value);
                              }}
                              onBlur={validation.handleBlur}
                              onFocus={() => {
                                setaddress_save(true);
                              }}
                              type="text"
                              name="office_address_line1"
                              className="form-control-md "
                              id="input"
                              placeholder="Enter Address"
                              value={office_address_line1}
                            />
                          </div>
                        </Col>

                        <Col lg={4} md={6} sm={6}>
                          <div className="mb-2">
                            <Label className="header-child">
                              Address Line 2
                            </Label>
                            <Input
                              onChange={(val) => {
                                setoffice_address_line2(val.target.value);
                              }}
                              className="form-control-md "
                              id="input"
                              value={office_address_line2}
                              type="text"
                              name="address_line2"
                              placeholder="Enter Address"
                            />
                          </div>
                        </Col>

                        {/* <Col lg={4} md={6} sm={6}>
                          <div className="mb-3">
                            <Label className="header-child">Country*</Label>
                            <SearchInput
                              data_list={country_list}
                              data_item_s={country}
                              set_data_item_s={setcountry}
                              show_search={false}
                              error_message={"Please Select Country"}
                              // error_s={country_erro}
                            />
                          </div>
                        </Col> */}

                        <Col lg={4} md={6} sm={6}>
                          <div className="mb-3">
                            <Label className="header-child">State*:</Label>
                            <SearchInput
                              data_list={state_list_s}
                              setdata_list={setstate_list_s}
                              data_item_s={office_state}
                              set_data_item_s={setoffice_state}
                              set_id={setoffice_state_id}
                              page={state_page}
                              setpage={setstate_page}
                              error_message={"State is required"}
                              error_s={office_state_error}
                              search_item={state_search_item}
                              setsearch_item={setstate_search_item}
                            />
                          </div>
                        </Col>

                        <Col lg={4} md={6} sm={6}>
                          <div className="mb-3">
                            <Label className="header-child">City*:</Label>
                            <SearchInput
                              data_list={office_city_list_s}
                              data_item_s={office_city}
                              set_data_item_s={setoffice_city}
                              set_id={setoffice_city_id}
                              page={city_page}
                              setpage={setcity_page}
                              error_message="City is required"
                              error_s={office_city_error}
                              search_item={search_item}
                              setsearch_item={setsearch_item}
                            />
                          </div>
                        </Col>

                        <Col lg={4} md={6} sm={6}>
                          <div className="mb-3">
                            {res_pincode_loaded ? (
                              <>
                                <div className="mb-2">
                                  <Label className="header-child">
                                    Pin Code*:
                                  </Label>
                                  <SearchInput
                                    data_list={res_pincode_list_s}
                                    data_item_s={res_pincode}
                                    set_data_item_s={setres_pincode}
                                    set_id={setoffice_location_id}
                                    error_message="Pin Code is required"
                                    error_s={office_pincode_error}
                                    page={pincode_page}
                                    setpincode={setpincode_page}
                                    search_item={pincode_search_item}
                                    setsearch_item={setpincode_search_item}
                                  />
                                </div>
                              </>
                            ) : (
                              <div className="mb-2">
                                <Label className="header-child">
                                  Pin Code*:
                                </Label>
                                <Input
                                  onChange={(val) =>
                                    setres_pincode(val.target.value)
                                  }
                                  onBlur={() => {
                                    if (res_pincode.length == 6) {
                                      getPincode(
                                        res_pincode,
                                        "pincode",
                                        "res_city"
                                      );
                                    }
                                  }}
                                  value={res_pincode}
                                  // invalid={
                                  //   validation.touched.pin_code &&
                                  //   validation.errors.pin_code
                                  //     ? true
                                  //     : false
                                  // }
                                  type="number"
                                  className="form-control-md input"
                                  // id="docket_no"
                                  name="pin_code"
                                  placeholder="Pin code"
                                />
                                {validation.touched.pin_code &&
                                  validation.errors.pin_code ? (
                                  <FormFeedback type="invalid">
                                    {validation.errors.pin_code}
                                  </FormFeedback>
                                ) : null}
                              </div>
                              // </Col>
                            )}
                          </div>
                        </Col>
                      </>
                    ) : null}

                    {active_tab == "second" ? (
                      <>
                        {/*Hub address */}
                        {/* 
                        {resident_address_line_1 &&
                        resident_address_line_2 &&
                        res_state &&
                        res_city &&
                        res_pincode != "" ? ( */}
                        <div style={{ display: "flex" }}>
                          <Label className="add">
                            *IF HUB ADDRESS IF SAME AS OFFICE ADDRESS{" "}
                          </Label>
                          <input
                            style={{
                              width: "12px",
                              margin: "-1px 5px 5px 5px",
                            }}
                            type="checkbox"
                            // value="checkbox"
                            onChange={() => {
                              setsame_as_office(!same_as_office);
                              // if(resident_address_line_1!="" && same_as_resident)
                              // {
                              // setpermanent_address_line_1(resident_address_line_1)
                              // }
                              // setresedent_address(true false)
                            }}
                            checked={same_as_office}
                          />
                        </div>
                        {/* ) : null} */}

                        <Col lg={4} md={6} sm={6}>
                          <div className="mb-3">
                            <Label className="header-child">
                              Address Line 1*
                            </Label>
                            <Input
                              // onBlur={validation.handleBlur}
                              value={
                                same_as_office
                                  ? office_address_line1
                                  : hub_address_line1
                              }
                              onChange={(val) => {
                                sethub_address_line1(val.target.value);
                              }}
                              // invalid={
                              //   validation.touched.address_line1 &&
                              //     validation.errors.address_line1
                              //     ? true
                              //     : false
                              // }
                              type="text"
                              name="address_line1"
                              className="form-control-md "
                              id="input"
                              placeholder="Enter Address"
                            />
                            {/* {validation.touched.address_line1 &&
                              validation.errors.address_line1 ? (
                              <FormFeedback type="invalid">
                                {validation.errors.address_line1}
                              </FormFeedback>
                            ) : null} */}
                          </div>
                        </Col>

                        <Col lg={4} md={6} sm={6}>
                          <div className="mb-2">
                            <Label className="header-child text-color">
                              Address Line 2
                            </Label>
                            <Input
                              value={
                                same_as_office
                                  ? office_address_line2
                                  : hub_address_line2
                              }
                              onChange={(val) => {
                                sethub_address_line2(val.target.value);
                              }}
                              className="form-control-md "
                              id="input"
                              type="text"
                              name="address_line2"
                              placeholder="Enter Address"
                            />
                          </div>
                        </Col>

                        {/* <Col lg={4} md={6} sm={6}>
                          <div className="mb-3">
                            <Label className="header-child">Country*</Label>
                            <SearchInput
                              data_list={country_list}
                              data_item_s={hub_country}
                              set_data_item_s={sethub_country}
                              show_search={false}
                            />
                          </div>
                        </Col> */}

                        <Col lg={4} md={6} sm={6}>
                          <div className="mb-3">
                            <Label className="header-child">State:</Label>
                            <SearchInput
                              data_list={state_list_s}
                              data_item_s={
                                same_as_office ? office_state : hub_state
                              }
                              set_data_item_s={sethub_state}
                              set_id={sethub_state_id}
                              setsearch_item={setsearch_item}
                            />
                          </div>
                        </Col>

                        <Col lg={4} md={6} sm={6}>
                          <div className="mb-3">
                            <Label className="header-child">City:</Label>
                            <SearchInput
                              data_list={
                                same_as_office
                                  ? office_city_list_s
                                  : per_city_list_s
                              }
                              data_item_s={
                                same_as_office ? office_city : hub_city
                              }
                              set_data_item_s={sethub_city}
                              set_id={sethub_city_id}
                              setsearch_item={setsearch_item}
                            />
                          </div>
                        </Col>

                        <Col lg={4} md={6} sm={6}>
                          <div className="mb-3">
                            {pincode_loaded ? (
                              <Col lg={4} md={6} sm={6}>
                                <div className="mb-2">
                                  <Label className="header-child">
                                    Pin Code*:
                                  </Label>
                                  <SearchInput
                                    data_list={pincode_list_s}
                                    data_item_s={pincode}
                                    set_data_item_s={setpincode}
                                    set_id={sethub_location_id}
                                    setsearch_item={setsearch_item}
                                  />
                                </div>
                              </Col>
                            ) : (
                              <Col lg={4} md={6} sm={6}>
                                <div className="mb-3">
                                  <Label className="header-child">
                                    Pin Code*:
                                  </Label>
                                  <Input
                                    onChange={(val) =>
                                      setpincode(val.target.value)
                                    }
                                    onBlur={() => {
                                      if (pincode.length == 6) {
                                        getPincode(
                                          pincode,
                                          "pincode",
                                          "hub_city"
                                        );
                                      }
                                    }}
                                    value={
                                      same_as_office ? res_pincode : pincode
                                    }
                                    // invalid={
                                    //   validation.touched.pin_code &&
                                    //   validation.errors.pin_code
                                    //     ? true
                                    //     : false
                                    // }
                                    type="number"
                                    className="form-control-md input"
                                    // id="docket_no"
                                    name="pin_code"
                                    placeholder="Pin code"
                                  />
                                  {validation.touched.pin_code &&
                                    validation.errors.pin_code ? (
                                    <FormFeedback type="invalid">
                                      {validation.errors.pin_code}
                                    </FormFeedback>
                                  ) : null}
                                </div>
                              </Col>
                            )}
                          </div>
                        </Col>
                      </>
                    ) : null}
                  </Row>
                </CardBody>
              ) : null}
            </Card>
          </Col>

          {/*Bank Details*/}
          <Col lg={12} id="section3">
            <Card className="shadow bg-white rounded">
              <CardTitle className="mb-1 header">
                <div className="header-text-icon header-text">
                  Bank Details
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
                    <Row className="hide">
                      <Col lg={2} md={3} sm={3}>
                        <div className="mb-3">
                          <Label className="header-child">Bank name*</Label>
                          {bank_details.map((item, index) => {
                            return (
                              <Input
                                key={index}
                                value={item[0]}
                                type="text"
                                className="form-control-md input"
                                id="multi-input"
                                style={{ marginBottom: "15px" }}
                                placeholder="Enter Bank Name "
                                onChange={(val) => {
                                  setbank_name(val.target.value.toUpperCase());
                                  item[0] = val.target.value;
                                }}
                              />
                            );
                          })}
                        </div>
                        {/* {bank_details_error ? (
                          <div style={{ color: "red" }}>
                            Bank Details is required
                          </div>
                        ) : null} */}
                      </Col>

                      <Col md={2} sm={3}>
                        <div className="mb-3">
                          <Label className="header-child">
                            Acc Holder Name*
                          </Label>
                          {bank_details.map((item, index) => (
                            <Input
                              key={index}
                              value={item[1]}
                              type="text"
                              className="form-control-md input d"
                              id="d"
                              style={{ marginBottom: "15px" }}
                              placeholder="Enter Account Holder Name"
                              onChange={(val) => {
                                setacc_holder_name(
                                  val.target.value.toUpperCase()
                                );
                                item[1] = val.target.value;
                              }}
                            />
                          ))}
                        </div>
                      </Col>

                      <Col lg={2} md={3} sm={3}>
                        <div className="mb-3">
                          <Label className="header-child">Acc Number*</Label>
                          {bank_details.map((item, index) => (
                            <Input
                              key={index}
                              value={item[2]}
                              type="number"
                              min="0"
                              //  max="9999"
                              className="form-control-md input"
                              id="d"
                              style={{ marginBottom: "15px" }}
                              placeholder="Enter Account Number"
                              onChange={(val) => {
                                setaccount_number(val.target.value);
                                item[2] = val.target.value;
                                // seteducation_info_error(false);
                              }}
                            />
                          ))}
                        </div>
                      </Col>

                      <Col lg={2} md={3} sm={3}>
                        <div className="mb-3">
                          <Label className="header-child">IFSC Code*</Label>
                          {bank_details.map((item, index) => (
                            <Input
                              key={index}
                              value={item[3]}
                              type="text"
                              className="form-control-md input"
                              id="d"
                              style={{ marginBottom: "15px" }}
                              placeholder="Enter IFSC Code"
                              onChange={(val) => {
                                setifsc_code(val.target.value.toUpperCase());
                                item[3] = val.target.value;
                              }}
                            />
                          ))}
                        </div>
                      </Col>

                      <Col lg={2} md={2} sm={3}>
                        <div className="mb-3">
                          <Label className="header-child">Tag</Label>
                          {bank_details.map((item, index) => (
                            <select
                              key={index}
                              value={item[4]}
                              className="form-select"
                              id="multi-input"
                              style={{ marginBottom: "15px" }}
                              onChange={(val) => {
                                settag(val.target.value);
                                item[4] = val.target.value;
                                // setid_info_error(false);
                              }}
                            >
                              {/* <option selected>Select Type...</option> */}
                              <option value="OFFICE">Office</option>
                              <option value="CORPORATE OFFICE">
                                Corporate Office
                              </option>
                              <option value="BRANCH NAME">Branch Name</option>
                              <option value="OTHER">Others</option>
                            </select>
                          ))}
                        </div>
                      </Col>

                      {tag == "OTHER" ? (
                        <Col lg={2} md={3} sm={3}>
                          <div className="mb-3">
                            <Label className="header-child">Tag Name</Label>
                            {bank_details.map((item, index) => (
                              <Input
                                key={index}
                                value={item[5]}
                                type="text"
                                className="form-control-md input"
                                id="d"
                                style={{ marginBottom: "15px" }}
                                placeholder="Enter Tag Name"
                                onChange={(val) => {
                                  settag_name(val.target.value);
                                  item[5] = val.target.value;
                                  // seteducation_info_error(false);
                                }}
                              />
                            ))}
                          </div>
                        </Col>
                      ) : null}

                      <Col lg={1} md={1} sm={1}>
                        <div className="mb-3">
                          {bank_details.length > 1 ? (
                            <Label className="header-child">Delete</Label>
                          ) : null}
                          {bank_details.map((item, index) => (
                            <IconContext.Provider
                              key={index}
                              value={{
                                className: "icon multi-input",
                              }}
                            >
                              {bank_details.length > 1 ? (
                                <div
                                  className="mb-2 mt-2"
                                  onClick={() => {
                                    delet_bank_details(item);
                                  }}
                                >
                                  <MdDeleteForever
                                    style={{
                                      justifyContent: "center",
                                      cursor: "pointer",
                                      marginBottom: "26px",
                                    }}
                                  />
                                </div>
                              ) : null}
                            </IconContext.Provider>
                          ))}
                        </div>
                      </Col>
                    </Row>
                    <div>
                      <span
                        className="link-text"
                        onClick={() => {
                          if (
                            bank_name &&
                            acc_holder_name &&
                            account_number &&
                            ifsc_code &&
                            tag
                          ) {
                            add_bank_details();
                          } else {
                            alert("Fill Bank Details");
                          }
                        }}
                        style={{
                          fontSize: "14px",
                          color: "purple",
                          cursor: "pointer",
                        }}
                      >
                        <IconContext.Provider
                          value={{
                            className: "link-text",
                          }}
                        >
                          <MdAdd />
                        </IconContext.Provider>
                        Add another
                      </span>
                    </div>
                  </Row>
                </CardBody>
              ) : null}
            </Card>
          </Col>
        </div>

        {/*Button */}

        <div className=" m-4">
          <Col lg={12}>
            <div className="mb-1 footer_btn">
              <button type="submit" className="btn btn-info m-1">
                Save
              </button>

              <button
                type="button"
                className="btn btn-info m-1"
                // onClick={handleAction}
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

export default AddTransporter;
