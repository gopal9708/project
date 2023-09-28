/* eslint-disable */
import React, { useState, useEffect, useLayoutEffect } from "react";
import "../../../assets/scss/forms/form.scss";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useLocation, useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
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
import { MdAdd, MdDeleteForever } from "react-icons/md";
import MultiRowSearchInput from "../../../components/formComponent/multiRowSearchInput/MultiRowSearchInput";
import { FiCheckSquare, FiSquare } from "react-icons/fi";
import NSearchInput from "../../../components/formComponent/nsearchInput/NSearchInput";
import ImgModal from "../../../components/crop/ImgModal";

function handleLogoUpload(event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onload = () => {
    setLogo(reader.result);
  };
}

const AddOrganization = () => {
  //Redux State
  const user = useSelector((state) => state.authentication.userdetails);
  const accessToken = useSelector((state) => state.authentication.access_token);

  const dispatch = useDispatch();
  const location_data = useLocation();
  const navigate = useNavigate();
  // Used for Company Type list
  const [company_type, setcompany_type] = useState("");
  const [company_type_list, setcompany_type_list] = useState([
    "Individual",
    "Pvt Ltd / Ltd",
    "Partnership",
    "LLP",
    "Others",
  ]);
  const [gst_error, setgst_error] = useState(false)
  const [gst_text, setgst_text] = useState("")

  const [service_error, setservice_error] = useState(false)

  const [company_type_error, setcompany_type_error] = useState(false);
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
  const [circle_btn3, setcircle_btn3] = useState(true);
  const toggle_circle3 = () => {
    setcircle_btn3(!circle_btn3);
  };

  const [circle_btn4, setcircle_btn4] = useState(true);
  const toggle_circle4 = () => {
    setcircle_btn4(!circle_btn4);
  };

  // Discription
  const [descripation, setdescripation] = useState("");

  // Location Info

  const [by_pincode, setby_pincode] = useState(false);
  const [pincode_loaded, setpincode_loaded] = useState(false);

  const [state_error, setstate_error] = useState(false);
  const [city_error, setcity_error] = useState(false);
  const [state_error1, setstate_error1] = useState(false);
  const [city_error1, setcity_error1] = useState(false);
  const [pincode_error, setpincode_error] = useState(false);
  const [pincode_error2, setpincode_error2] = useState(false);
  const [sec_mobile2, setsec_mobile2] = useState("");
  const [pan_no, setpan_no] = useState("")
  const [pan_no_error, setpan_no_error] = useState(false);
  const [isupdating, setisupdating] = useState(false);
  //Get Updated Location Data
  const [organization, setOrganization] = useState([]);
  const [organizationname, setOrganizationname] = useState([]);

  const [refresh, setrefresh] = useState(false);

  const [active_tab, setactive_tab] = useState("first");
  const [same_as_billing_add, setsame_as_billing_add] = useState(false);

  // Office Address
  const [state_list_s, setstate_list_s] = useState([]);
  const [office_add_line1, setoffice_add_line1] = useState("");
  const [office_add_line2, setoffice_add_line2] = useState("");
  const [office_add1_err, setoffice_add1_err] = useState(false);
  const [bill_add1_err, setbill_add1_err] = useState(false);
  const [office_state, setoffice_state] = useState("");
  const [office_state_id, setoffice_state_id] = useState("");
  const [city_page, setcity_page] = useState(1);
  const [city_search_item, setcity_search_item] = useState("");
  const [office_id, setoffice_id] = useState(0);

  const [office_city, setoffice_city] = useState("");
  const [office_city_id, setoffice_city_id] = useState("");
  const [office_city_list, setoffice_city_list] = useState([]);
  const [office_pincode, setoffice_pincode] = useState("");
  const [office_pincode_list, setoffice_pincode_list] = useState([]);
  const [office_pincode_id, setoffice_pincode_id] = useState("");
  const [pincode_page, setpincode_page] = useState(1);
  const [pincode_search_item, setpincode_search_item] = useState("");

  const [office_locality, setoffice_locality] = useState("");
  const [office_locality_list, setoffice_locality_list] = useState("");
  const [office_locality_id, setoffice_locality_id] = useState("");
  const [locality_page, setlocality_page] = useState(1);
  const [locality_search_item, setlocality_search_item] = useState("");
  const [local_err, setlocal_err] = useState(false);
  const [local_err2, setlocal_err2] = useState(false);

  const [state_loded, setstate_loded] = useState(false);
  const [state_count, setstate_count] = useState(1);
  const [billing_state_bottom, setbilling_state_bottom] = useState(103)

  const [city_loaded, setcity_loaded] = useState(false);
  const [city_count, setcity_count] = useState(1);

  const [load_office_pincode, setload_office_pincode] = useState(false);
  const [office_pincode_count, setoffice_pincode_count] = useState(1);

  // Billing Address
  const [togstate, settogstate] = useState(false)
  const [togcity, settogcity] = useState(false)
  const [togpincode, settogpincode] = useState(false)
  const [bill_color, setbill_color] = useState(false);
  const [billing_add_line1, setbilling_add_line1] = useState("");
  const [billing_add_line2, setbilling_add_line2] = useState("");
  const [billing_state, setbilling_state] = useState("");
  const [billing_state_id, setbilling_state_id] = useState("");
  const [billing_state_page, setbilling_state_page] = useState(1);
  const [billing_state_search_item, setbilling_state_search_item] =
    useState("");
  const [billing_city, setbilling_city] = useState("");
  const [billing_city_list, setbilling_city_list] = useState([]);
  const [billing_city_id, setbilling_city_id] = useState("");
  const [billing_city_page, setbilling_city_page] = useState(1);
  const [billing_city_search_item, setbilling_city_search_item] = useState("");
  const [billing_pincode, setbilling_pincode] = useState("");
  const [billing_pincode_list, setbilling_pincode_list] = useState([]);
  const [billing_pincode_id, setbilling_pincode_id] = useState("");
  const [billing_pincode_page, setbilling_pincode_page] = useState(1);
  const [billing_pincode_search_item, setbilling_pincode_search_item] =
    useState("");
  const [billing_id, setbilling_id] = useState(0);
  const [billing_pincode_bottom, setbilling_pincode_bottom] = useState(103)

  const [billing_locality, setbilling_locality] = useState("");
  const [billing_locality_list, setbilling_locality_list] = useState([]);
  const [billing_locality_id, setbilling_locality_id] = useState("");
  const [billing_locality_page, setbilling_locality_page] = useState(1);
  const [billing_locality_search_item, setbilling_locality_search_item] =
    useState("");
  const [loaded_billing_locality, setloaded_billing_locality] = useState(false)
  const [billing_locality_count, setbilling_locality_count] = useState(1)
  const [billing_locality_bottom, setbilling_locality_bottom] = useState(103)

  const [billing_city_loaded, setbilling_city_loaded] = useState(false);
  const [billing_city_count, setbilling_city_count] = useState(1);
  const [billing_city_bottom, setbilling_city_bottom] = useState(103)

  const [loaded_billing_pincode, setloaded_billing_pincode] = useState(false);
  const [billing_pincode_count, setbilling_pincode_count] = useState(1);

  //data Load
  const [billing_pincode_loaded, setbilling_pincode_loaded] = useState(false);
  const [office_pincode_loaded, setoffice_pincode_loaded] = useState(false);

  const [updated_gstaddress, setupdated_gstaddress] = useState([]);
  // console.log("updated_gstaddress----", updated_gstaddress);

  //for upload logo 
  const [modal, setmodal] = useState(false);
  const [uploaded_img, setuploaded_img] = useState("");
  const [result_img, setresult_img] = useState("");
  const [upload_logo_error, setupload_logo_error] = useState(false);
  // console.log("resu image ", result_img);
  // console.log("uploaded image ", uploaded_img);

  // Validation
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      organisation_name: toTitleCase(organization.name) || "",
      alias_name: organization.alias_name || "",
      toll_free_number: organization.tollfree_no || "",
      registeration_number: organization.regd_no || "",
      // pan_no: organization.pan_no || "",
      phone_numberp: organization.mobile_nop || "",
      tan_no: organization.tan_no || "",
      // phone_numbers: organization.mobile_nos || "",
      email: organization.email || "",
      web_url: organization.website || "",
      contact_person_name: toTitleCase(organization.contact_person) || "",
      // description: toTitleCase(organization.description) || "",
      contact_person_email: organization.contact_person_email || "",
      contact_person_ph_no: organization.contact_person_mobile || "",
    },

    validationSchema: Yup.object({
      alias_name: Yup.string().required("Alias Name is required"),
      organisation_name: Yup.string().required("Organization Name is required"),
      registeration_number: Yup.string()
        .min(21, "Number must be 21 digit")
        .max(21, "Number must be 21 digit")
        .required("Registration Number is required"),
      toll_free_number: Yup.string()
        .min(11, "Number must be 11 digit")
        .max(11, "Number must be 11 digit")
        .required("Toll Free Number is required"),
      // pan_no: Yup.string().min(10).max(10).required("PAN Number is required"),
      email: Yup.string().email().required("Email is required"),
      web_url: Yup.string().required("Website URL is required"),
      phone_numberp: Yup.string()
        .min(10, "Invalid number")
        .max(10, "invalid number")
        .required("Phone Number is required"),
      tan_no: Yup.string()
        .min(10, "Invalid number")
        .max(10, "invalid number")
        .required("Tan Number is required"),
      contact_person_name: Yup.string().required("Name is required"),
      contact_person_email: Yup.string()
        .email("Please Enter a Valid email")
        .required("Email is required"),
      contact_person_ph_no: Yup.string()
        .min(10, "Invalid number")
        .max(10, "invalid number")
        .required("Phone Number is required"),
      // phone_numbers: Yup.string().min(10,"invalid").max(10,"invalid").required("Number is required"),
    }),
    onSubmit: (values) => {
      let data = row.some((a) => a[5] == true)
      let shaw = Object.entries(validation.values);
      let filter_value = shaw.filter((v) => v[1] == "" || v[1] == 0);
      let map_value = filter_value.map((m) => m[0]);
      let all_value = map_value[0];

      let fields1 = [
        "organisation_name",
        "email",
        "tollfree_no",
        "registeration_number",
        "pan_no",
        "phone_numberp",

        // "web_url",
      ];
      let fields2 = [
        "contact_person_name",
        "contact_person_email",
        "contact_person_ph_no",
      ];


      if (pan_no === "") {
        setpan_no_error(true);
        document.getElementById("org_id").scrollIntoView();
      }
      else if (pan_no !== "" && (pan_no.length !== 10 || !/^([A-Z]{5}[0-9]{4}[A-Z]{1})$/.test(pan_no))) {
        setpan_no_error(true);
        document.getElementById("org_id").scrollIntoView();
      }
      else if (fields1.includes(all_value)) {
        document.getElementById("org_id").scrollIntoView();
      }
      else if (result_img === "") {
        setupload_logo_error(true);
        document.getElementById("org_id").scrollIntoView();
      }
      else if (row[row.length - 1].some((some) => some === "")) {
        document.getElementById('gst_details').scrollIntoView();
      }
      else if (data === false) {
        document.getElementById('gst_details').scrollIntoView();
        setgst_error(true)
        setgst_text("Please Checked, checkBox of Head Office")
      }
      else if (row[row.length - 1][0].length !== 15) {
        document.getElementById('gst_details').scrollIntoView();
        setgst_error(true)
        setgst_text("Gst Number Must Be 15 Digit")
      }
      else if (row[row.length - 1][0].substring(2, 12) !== pan_no) {
        document.getElementById('gst_details').scrollIntoView();
        setgst_error(true)
        setgst_text("PAN Number Is Not Mached with Gst Number")
      }
      else if (row1[row1.length - 1][0] !== "" && row1[row1.length - 1].some((some) => some === "")) {
        document.getElementById('config_details').scrollIntoView();
      }
      else if (
        office_add_line1 !== "" &&
        office_state !== "" &&
        office_city !== "" &&
        office_pincode !== "" &&
        office_locality !== ""

        &&
        billing_add_line1 === "" ||
        billing_state === "" ||
        billing_city === "" ||
        billing_pincode === "" ||
        billing_locality === ""
      ) {
        setbill_color(true);
        document.getElementById("add").scrollIntoView();
      }

      else if (billing_add_line1 === "") {
        setbill_add1_err(true);
        document.getElementById("add").scrollIntoView();
      } else if (billing_state === "") {
        setstate_error1(true);
        document.getElementById("add").scrollIntoView();
      } else if (billing_city === "") {
        setcity_error1(true);
        document.getElementById("add").scrollIntoView();
      } else if (billing_pincode === "") {
        setpincode_error2(true);
        document.getElementById("add").scrollIntoView();
      } else if (billing_locality === "") {
        setlocal_err2(true);
        document.getElementById("add").scrollIntoView();
      }
      else if (fields2.includes(all_value)) {
        document.getElementById("section2").scrollIntoView();
      }



      else {
        isupdating ? update_organisation(values) : send_organisation_data(values);

      }
    },
  });

  // Post Branch
  const send_organisation_data = async (values) => {
    try {
      const response = await axios.post(
        ServerAddress + "organization/add_organization/",
        {
          name: toTitleCase(values.organisation_name).toUpperCase(),
          alias_name: toTitleCase(values.alias_name).toUpperCase(),
          regd_no: values.registeration_number,
          type: (company_type).toUpperCase(),
          tollfree_no: values.toll_free_number,
          mobile_nop: values.phone_numberp,
          mobile_nos: sec_mobile2 !== "" ? sec_mobile2 : null,
          email: values.email,
          tan_no: toTitleCase(values.tan_no).toUpperCase(),
          description: toTitleCase(descripation).toUpperCase(),
          pan_no: toTitleCase(pan_no).toUpperCase(),
          website: values.web_url,
          contact_person: toTitleCase(values.contact_person_name).toUpperCase(),
          contact_person_email: values.contact_person_email,
          contact_person_mobile: values.contact_person_ph_no,
          logo_uploaded_by: user.id,
          logo_image: result_img,
          created_by: user.id,
          org_config: row1,
          organization_name: [],
          is_same: same_as_billing_add,
          address: [
            [
              "HEAD OFFICE ADDRESS",
              toTitleCase(office_add_line1).toUpperCase(),
              toTitleCase(office_add_line2).toUpperCase(),
              office_pincode_id,
              office_locality_id,
            ],
            [
              "BILLING ADDRESS",
              toTitleCase(billing_add_line1).toUpperCase(),
              toTitleCase(billing_add_line2).toUpperCase(),
              billing_pincode_id,
              billing_locality_id,
            ],
          ],
          gst_address: row,
          org_config: row1,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.data.status === "success") {
        dispatch(setToggle(true));
        dispatch(
          setDataExist(
            `"${values.organisation_name}" Created Sucessfully`
          )
        );
        dispatch(setAlertType("success"));
        dispatch(setShowAlert(true));
        navigate(-1);
      } else if (
        response.data.data.pan_no &&
        response.data.data.pan_no[0] ===
        "organization with this PAN Number * already exists."
      ) {
        dispatch(setDataExist(`"${pan_no}" already exists`));
        dispatch(setAlertType("warning"));
        dispatch(setShowAlert(true));
      } else if (
        response.data.data.website &&
        response.data.data.website[0] ===
        "organization with this Website Address already exists."
      ) {
        dispatch(setDataExist(`"${values.web_url}" already exists`));
        dispatch(setAlertType("warning"));
        dispatch(setShowAlert(true));
      } else if (
        response.data.data.website &&
        response.data.data.website[0] === "Enter a valid URL."
      ) {
        dispatch(
          setDataExist(`Website Address "${values.web_url}" Is Invalid`)
        );
        dispatch(setAlertType("warning"));
        dispatch(setShowAlert(true));
      } else if (
        response.data.data.name &&
        response.data.data.name[0] ===
        "organization with this Organization Name * already exists."
      ) {
        dispatch(
          setDataExist(
            `Organisation Name "${values.organisation_name}" already exists`
          )
        );
        dispatch(setAlertType("warning"));
        dispatch(setShowAlert(true));
      } else if (
        response.data.data.regd_no &&
        response.data.data.regd_no[0] ===
        "organization with this Registeration Number already exists."
      ) {
        dispatch(
          setDataExist(
            `Organisation with this  Registeration No  "${values.registeration_number}" already exists`
          )
        );
        dispatch(setAlertType("warning"));
        dispatch(setShowAlert(true));
      }
    } catch (error) {
      alert(`Error Happen while posting Organisation Data ${error}`);
    }
  };

  // Update Branch
  const update_organisation = (values) => {
    let id = organization.id;

    let fields_names = Object.entries({
      contact_person: values.contact_person_name,
      contact_person_email: values.contact_person_email,
      contact_person_mobile: values.contact_person_ph_no,
      description: descripation,

      email: values.email,
      mobile_nop: values.phone_numberp,
      // mobile_nos: values.phone_numbers,
      mobile_nos: sec_mobile2,
      name: values.organisation_name,

      pan_no: pan_no,
      regd_no: values.registeration_number,
      tollfree_no: values.toll_free_number,

      website: values.web_url,
      tan_no: values.tan_no,
      type: company_type,
      // logo_image: result_img,
    });

    let change_fields = {};
    for (let j = 0; j < fields_names.length; j++) {
      const ele = fields_names[j];
      let prev = location_data.state.organization[`${ele[0]}`];
      let new_v = ele[1];
      if (String(prev).toUpperCase() != String(new_v).toUpperCase()) {
        change_fields[`${ele[0]}`] = new_v.toString().toUpperCase();
      }
    }

    axios
      .put(
        ServerAddress + "organization/update_organization/" + id,
        {
          name: toTitleCase(values.organisation_name).toUpperCase(),
          alias_name: toTitleCase(values.alias_name).toUpperCase(),
          regd_no: values.registeration_number,
          tollfree_no: values.toll_free_number,
          mobile_nop: values.phone_numberp,
          type: (company_type).toUpperCase(),
          tan_no: toTitleCase(values.tan_no).toUpperCase(),
          // mobile_nos: values.phone_numbers ? values.phone_numbers : null,
          mobile_nos: sec_mobile2,
          email: values.email,
          description: toTitleCase(descripation).toUpperCase(),
          pan_no: toTitleCase(pan_no).toUpperCase(),
          website: values.web_url,
          contact_person: toTitleCase(values.contact_person_name).toUpperCase(),
          contact_person_email: values.contact_person_email,
          contact_person_mobile: values.contact_person_ph_no,
          logo_uploaded_by: user.id,
          logo_image: result_img?.substring(0, 4) !== "http" ? result_img : null,
          is_same: same_as_billing_add,
          address: [
            [
              "HEAD OFFICE ADDRESS",
              toTitleCase(office_add_line1).toUpperCase(),
              toTitleCase(office_add_line2).toUpperCase(),
              office_pincode_id,
              office_locality_id,
              office_id,
            ],
            [
              "BILLING ADDRESS",
              toTitleCase(billing_add_line1).toUpperCase(),
              toTitleCase(billing_add_line2).toUpperCase(),
              billing_pincode_id,
              billing_locality_id,
              billing_id,
            ],
          ],
          gst_address: row,
          modified_by: user.id,
          deleted_gst: deleted_gst_id,
          org_config: row1,
          deleted_config: deleted_config_id,
          change_fields: change_fields,
        },

        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (response) {
        if (response.data.status === "success") {
          dispatch(
            setDataExist(`"${values.organisation_name}" Updated Sucessfully`)
          );
          dispatch(setAlertType("info"));
          dispatch(setShowAlert(true));
          navigate(-1);
        } else if (response.data === "duplicate") {
          dispatch(setShowAlert(true));
          dispatch(
            setDataExist(
              `Organization already exists`
            )
          );
          dispatch(setAlertType("warning"));
        }
      })
      .catch(function () {
        alert("Error Error While Updateing Organization");
      });
  };
  // Locations Function
  const getStates = async () => {
    let state_list = [];
    try {
      const resp = await axios.get(
        ServerAddress +
        `master/all_states/?search=${""}&place_id=all&filter_by=all&p=${billing_state_page}&records=${10}&state_search=${billing_state_search_item}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      settogstate(true);
      if (resp.data.next === null) {
        setstate_loded(false);
      } else {
        setstate_loded(true);
      }
      if (resp.data.results.length > 0) {
        if (billing_state_page == 1) {
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
      alert(`Error Occur in Get States, ${err}`);
    }
  };

  const getCities = async (place_id, filter_by, state_type) => {
    setby_pincode(false);
    let cities_list = [];
    try {
      const resp = await axios.get(
        ServerAddress +
        `master/all_cities/?search=${""}&p=${active_tab == "first" ? city_page : billing_city_page
        }&records=${10}&city_search=${active_tab == "first" ? city_search_item : billing_city_search_item
        }` +
        "&place_id=" +
        place_id +
        "&filter_by=" +
        filter_by,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      settogcity(true);
      if (resp.data.next === null) {
        setcity_loaded(false);
        setbilling_city_loaded(false);
      } else {
        setcity_loaded(true);
        setbilling_city_loaded(true);
      }

      if (resp.data.results.length > 0) {
        if (state_type === "billing_state_id") {
          if (billing_city_page == 1) {
            cities_list = resp.data.results.map((v) => [
              v.id,
              toTitleCase(v.city),
            ]);
          } else {
            cities_list = [
              ...billing_city_list,
              ...resp.data.results.map((v) => [v.id, toTitleCase(v.city)]),
            ];
          }
          setbilling_city_count(billing_city_count + 2);
          setbilling_city_list(cities_list);
        }
        else {
          if (city_page == 1) {
            cities_list = resp.data.results.map((v) => [
              v.id,
              toTitleCase(v.city),
            ]);
          } else {
            cities_list = [
              ...office_city_list,
              ...resp.data.results.map((v) => [v.id, toTitleCase(v.city)]),
            ];
          }
          setcity_count(city_count + 2);
          setoffice_city_list(cities_list);
        }
      }
      else {
        setbilling_city_list([]);
        setoffice_city_list([]);
      }

    } catch (err) {
      console.warn(`Error Occur in Get City, ${err}`);
    }
  };

  const getPincode = async (place_id, filter_by, city_type) => {
    let pincode_list = [];

    try {
      const resp = await axios.get(
        ServerAddress +
        `master/all_pincode/?search=${""}&p=${active_tab == "first" ? pincode_page : billing_pincode_page
        }&records=${10}&pincode_search=${active_tab == "first"
          ? pincode_search_item
          : billing_pincode_search_item
        }` +
        "&place_id=" +
        place_id +
        "&filter_by=" +
        filter_by,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      settogpincode(true)
      if (resp.data.next === null) {
        setloaded_billing_pincode(false);
      } else {
        setloaded_billing_pincode(true);
      }

      if (filter_by !== "pincode") {
        if (billing_pincode == 1) {
          pincode_list = resp.data.results.map((v) => [v.id, v.pincode]);
        }
        else {
          pincode_list = [
            ...billing_pincode_list,
            ...resp.data.results.map((v) => [v.id, v.pincode]),
          ];
        }
        setbilling_pincode_count(billing_pincode_count + 2);
        setbilling_pincode_list(pincode_list);

      } else if (city_type == "billin_city") {
        setbilling_state(toTitleCase(resp.data.results[0].state_name));
        setbilling_state_id(resp.data.results[0].state);

        setbilling_city(toTitleCase(resp.data.results[0].city_name));
        setbilling_city_id(resp.data.results[0].city);

        setbilling_pincode(resp.data.results[0].pincode);
        setbilling_pincode_id(resp.data.results[0].id);
      } else if (city_type == "office_city") {
        setoffice_state(toTitleCase(resp.data.results[0].state_name));
        setoffice_state_id(resp.data.results[0].state);
        setoffice_city(toTitleCase(resp.data.results[0].city_name));
        setoffice_city_id(resp.data.results[0].city);
        setoffice_pincode(resp.data.results[0].pincode);
        setoffice_pincode_id(resp.data.results[0].id);
      } else {
        dispatch(
          setDataExist(
            "You entered invalid pincode or pincode not available in database"
          )
        );
        dispatch(setAlertType("warning"));
        dispatch(setShowAlert(true));
      }
    } catch (err) {
      console.warn(`Error Occur in Get Pin Code, ${err}`);
    }
  };

  const getLocality = async (place_id, filter_by, pincode_type) => {
    let locality_list = [];
    try {
      const resp = await axios.get(
        ServerAddress +
        `master/all_locality/?search=${""}&p=${active_tab == "first" ? locality_page : billing_locality_page
        }&records=${10}` +
        `&place_id=${place_id}&filter_by=${filter_by}&name_search=${active_tab == "first"
          ? locality_search_item
          : billing_locality_search_item
        }&state=&city=&name=&data=all`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      if (resp.data.next === null) {
        setloaded_billing_locality(false);
      } else {
        setloaded_billing_locality(true);
      }
      if (filter_by !== "locality") {
        if (billing_locality_page == 1) {
          locality_list = resp.data.results.map((v) => [
            v.id,
            toTitleCase(v.name),
          ]);
        } else {
          if (pincode_type == "billing_pincode") {
            locality_list = [
              ...billing_locality_list,
              ...resp.data.results.map((v) => [v.id, toTitleCase(v.name)]),
            ];
          } else {
            locality_list = [
              ...office_locality_list,
              ...resp.data.results.map((v) => [v.id, toTitleCase(v.name)]),
            ];
          }
        }
        if (pincode_type == "billing_pincode") {
          setbilling_locality_list(locality_list);
          setbilling_locality_count(billing_locality_count + 2);
        } else {
          setoffice_locality_list(locality_list);
        }
      } else {
        dispatch(setDataExist("You entered invalid Locality"));
        dispatch(setAlertType("warning"));
        dispatch(setShowAlert(true));
      }
    } catch (err) {
      alert(`Error Occur in Get Locality , ${err}`);
    }
  };

  useLayoutEffect(() => {
    try {
      // console.log("location_data.state.organization=====", location_data.state.organization.org_detail)
      setOrganization(location_data.state.organization);
      setisupdating(true);
      setcompany_type(toTitleCase(location_data.state.organization.type));
      setpan_no(location_data.state.organization.pan_no);
      setsame_as_billing_add(location_data.state.organization.is_same);
      setOrganizationname(toTitleCase(location_data.state.organization.name));
      setdescripation(
        toTitleCase(location_data.state.organization.description)
      );
      setsec_mobile2(location_data.state.organization.mobile_nos);
      setoffice_add_line1(
        toTitleCase(
          location_data.state.organization.organization_address[0].address_line1
        )
      );
      setoffice_add_line2(
        toTitleCase(
          location_data.state.organization.organization_address[0].address_line2
        )
      );
      setoffice_state(
        toTitleCase(
          location_data.state.organization.organization_address[0].state_name
        )
      );
      setoffice_pincode_id(
        location_data.state.organization.organization_address[0].pincode_id
      );
      setoffice_locality_id(
        location_data.state.organization.organization_address[0].location
      );
      setoffice_state_id(
        location_data.state.organization.organization_address[0].state_id
      );
      setoffice_city_id(
        location_data.state.organization.organization_address[0].city_id
      );
      setoffice_city(
        toTitleCase(
          location_data.state.organization.organization_address[0].city_name
        )
      );
      setoffice_pincode(
        location_data.state.organization.organization_address[0].pincode
      );
      setoffice_locality(
        toTitleCase(
          location_data.state.organization.organization_address[0].location_name
        )
      );
      setoffice_id(location_data.state.organization.organization_address[0].id);
      // console.log(
      //   "location_data.state.organization.organization_gst1111111----",
      //   location_data.state.organization
      // );
      setbilling_add_line1(
        toTitleCase(
          location_data.state.organization.organization_address[1].address_line1
        )
      );

      // console.log("location_data.state.organization.organization_gst55555----", location_data.state.organization.organization_address[0])
      setbilling_add_line2(
        toTitleCase(
          location_data.state.organization.organization_address[1].address_line2
        )
      );
      setbilling_state(
        toTitleCase(
          location_data.state.organization.organization_address[1].state_name
        )
      );
      setbilling_pincode_id(
        location_data.state.organization.organization_address[1].pincode_id
      );
      setbilling_locality_id(
        location_data.state.organization.organization_address[1].location
      );
      setbilling_state_id(
        location_data.state.organization.organization_address[1].state_id
      );
      setbilling_city_id(
        location_data.state.organization.organization_address[1].city_id
      );
      setbilling_city(
        toTitleCase(
          location_data.state.organization.organization_address[1].city_name
        )
      );
      setbilling_pincode(
        location_data.state.organization.organization_address[1].pincode
      );
      setbilling_locality(
        toTitleCase(
          location_data.state.organization.organization_address[1].location_name
        )
      );
      setupdated_gstaddress(location_data.state.organization.organization_gst);
      setbilling_id(
        location_data.state.organization.organization_address[1].id
      );
      setresult_img(location_data.state.organization.logo);
    } catch (error) { }
  }, []);

  useLayoutEffect(() => {
    getStates();
  }, [billing_state_page, billing_state_search_item]);

  useLayoutEffect(() => {
    if (billing_state_id !== 0) {
      setbilling_city_page(1);
      setbilling_city_count(1);
      setbilling_city_bottom(103)
      setbilling_city_loaded(true);
    }
  }, [billing_state_id])

  useEffect(() => {
    let timeoutId;
    if (billing_state_id !== "" && billing_state_id !== null && by_pincode === false) {
      timeoutId = setTimeout(() => {
        getCities(billing_state_id, "state", "billing_state_id");
      }, 1);
    }
    return () => clearTimeout(timeoutId);
  }, [billing_state_id, billing_city_page, billing_city_search_item]);

  useLayoutEffect(() => {
    if (billing_city_id !== 0) {
      setbilling_pincode_page(1);
      setbilling_pincode_count(1);
      setbilling_pincode_bottom(103)
      setloaded_billing_pincode(true)
    }
  }, [billing_city_id])

  useEffect(() => {
    let timeoutId;
    if (billing_city_id !== "" && by_pincode === false) {
      timeoutId = setTimeout(() => {
        getPincode(billing_city_id, "city", "billin_city");
      }, 1);
    }
    return () => clearTimeout(timeoutId);
  }, [billing_city_id, billing_pincode_page, billing_pincode_search_item]);

  useLayoutEffect(() => {
    if (billing_pincode_id !== 0) {
      setbilling_locality_page(1);
      setbilling_locality_count(1);
      setbilling_locality_bottom(103)
      setloaded_billing_locality(true);
    }
  }, [billing_pincode_id])


  useEffect(() => {
    if (!location_data.state && billing_state && !by_pincode && !same_as_billing_add) {
      setbilling_city("");
      setbilling_city_list([]);
      setbilling_pincode("");
      setbilling_pincode_list([]);
      setbilling_locality("");
      setbilling_locality_list([]);
    }
  }, [billing_state]);

  useEffect(() => {
    if (billing_state !== "" && togstate && !same_as_billing_add) {
      setbilling_city("");
      setbilling_city_list([]);
      setbilling_pincode("");
      setbilling_pincode_list([]);
      setbilling_locality("");
      setbilling_locality_list([]);
    }
  }, [billing_state]);

  useEffect(() => {
    if (!location_data.state && billing_city && !by_pincode && !same_as_billing_add) {
      setbilling_pincode("");
      setbilling_pincode_list([]);
      setbilling_locality("");
      setbilling_locality_list([]);
    }
  }, [billing_city]);

  useEffect(() => {
    if (billing_city !== "" && togcity && !same_as_billing_add) {
      setbilling_pincode("");
      setbilling_pincode_list([]);
      setbilling_locality("");
      setbilling_locality_list([]);
    }
  }, [billing_city]);


  useEffect(() => {
    if (billing_pincode !== "" && togpincode && !same_as_billing_add) {
      setbilling_locality("");
      setbilling_locality_list([]);
    }
  }, [billing_pincode]);

  useEffect(() => {
    if (!location_data.state && billing_pincode && !by_pincode && !same_as_billing_add) {
      setbilling_locality("");
      setbilling_locality_list([]);
    }
  }, [billing_pincode]);

  useEffect(() => {
    if (isupdating) {
      settogstate(false);
      settogcity(false);
      settogpincode(false)
    }
  }, []);

  useEffect(() => {
    let timeoutId;
    if (billing_pincode_id != "") {
      timeoutId = setTimeout(() => {
        getLocality(billing_pincode_id, "pincode", "billing_pincode");
      }, 1);
    }
    return () => clearTimeout(timeoutId);
  }, [billing_pincode_id, billing_locality_page, billing_locality_search_item]);

  useLayoutEffect(() => {
    if (office_state_id !== "" && office_state_id !== null && !by_pincode) {
      getCities(office_state_id, "state", "office_state_id");
    }
  }, [office_state_id, city_page, city_search_item]);

  useLayoutEffect(() => {
    if (office_city_id != "") {
      getPincode(office_city_id, "city", "office_city");
    }
  }, [office_city_id, pincode_page, pincode_search_item]);

  useLayoutEffect(() => {
    if (office_pincode_id !== "") {
      getLocality(office_pincode_id, "pincode", "office_pincode");
    }
  }, [office_pincode_id, locality_page, locality_search_item]);

  useLayoutEffect(() => {
    if (billing_city_id !== "") {
      setbilling_pincode_loaded(true);
    }
    if (office_city_id !== "") {
      setoffice_pincode_loaded(true);
    }
  }, [billing_city_id, office_city_id]);

  //Gst address
  const [gst_state_id, setgst_state_id] = useState("");
  const [gst_no, setgst_no] = useState("");
  const [gst_address, setgst_address] = useState("");
  const [gst_state, setgst_state] = useState(["", ""]);
  const [gst_state_list, setgst_state_list] = useState([]);
  const [gst_city_list, setgst_city_list] = useState([]);
  const [gst_city, setgst_city] = useState(["", "", ""]);
  const [gst_pincode, setgst_pincode] = useState(["", ""]);
  const [gstpincode_list, setgstpincode_list] = useState([]);
  const [gst_pincode_page, setgst_pincode_page] = useState(1);
  const [gst_pincode_search_item, setgst_pincode_search_item] = useState("");
  const [gstpincode_loaded, setgstpincode_loaded] = useState(false);
  const [gstpincode_count, setgstpincode_count] = useState(1);
  const [gstpincode_bottom, setgstpincode_bottom] = useState(103)

  const [gst_locality_list, setgst_locality_list] = useState([]);
  const [gst_locality, setgst_locality] = useState(["", ""]);
  const [gst_locality_page, setgst_locality_page] = useState(1);
  const [gst_locality_search_item, setgst_locality_search_item] = useState("");
  const [gstlocality_loaded, setgstlocality_loaded] = useState(false);
  const [gstlocality_count, setgstlocality_count] = useState(1);
  const [gstlocality_bottom, setgstlocality_bottom] = useState(103)

  const [gst_city_page, setgst_city_page] = useState(1);
  const [gst_city_search_item, setgst_city_search_item] = useState("");
  const [gstcity_loaded, setgstcity_loaded] = useState(false);
  const [gstcity_count, setgstcity_count] = useState(1);
  const [gstcity_bottom, setgstcity_bottom] = useState(103)

  const [selected, setselected] = useState([]);

  const [active, setactive] = useState(false);

  const [gst_id_list, setgst_id_list] = useState([]);
  const [gst_ids, setgst_ids] = useState([]);
  const [deleted_gst_id, setdeleted_gst_id] = useState([]);
  //  Organisation Configration


  const [config_id_list, setconfig_id_list] = useState([]);
  const [config_ids, setconfig_ids] = useState([]);
  const [deleted_config_id, setdeleted_config_id] = useState([]);

  const [config_type, setconfig_type] = useState([
    ("AADHAR"),
    ("EWAY BILL"),
    ("PANCARD"),
    ("GPS")
  ])
  const [config_type_sel, setconfig_type_sel] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [url, seturl] = useState("");
  let dimension_list1 = [
    config_type_sel,
    username,
    password,
    url
  ]
  const [row1, setrow1] = useState([dimension_list1]);
  const addConfig = () => {
    dimension_list1 = ["", "", "", ""];
    setrow1([...row1, dimension_list1]);
  };
  const deleteConfig = (item) => {
    setconfig_type_sel("");
    setusername("");
    setpassword("");
    let temp = [...row1];
    let temp2 = [...config_id_list]
    const index = temp.indexOf(item);
    if (index > -1) {
      temp.splice(index, 1);
      temp2.splice(index, 1)

    }
    setrow1(temp);
    setconfig_id_list(temp2);
  };
  let dimension_list = [
    gst_no,
    gst_city,
    gst_pincode,
    gst_locality,
    gst_address,
    active,
  ];
  const [row, setrow] = useState([dimension_list]);

  const addGST = () => {
    dimension_list = ["", ["", "", ""], ["", ""], ["", ""], "", false];
    setrow([...row, dimension_list]);
  };

  const deleteGST = (item) => {
    setgst_no("gst_no");
    setgst_state("state");
    setgst_city("city");
    setgst_pincode("pincode");
    setgst_locality("gst_locality");
    setgst_address("gst_address");
    let temp = [...row];
    let temp_2 = [...gst_id_list];
    const index = temp.indexOf(item);
    if (index > -1) {
      temp.splice(index, 1);
      temp_2.splice(index, 1);
    }
    setrow(temp);
    setgst_id_list(temp_2);
  };

  useLayoutEffect(() => {
    if (same_as_billing_add) {
      setbilling_add_line1(office_add_line1);
      setbilling_add_line2(office_add_line2);
      setbilling_state(office_state);
      setbilling_city(office_city);
      setbilling_pincode(office_pincode);
      setbilling_locality(office_locality);
      setbilling_pincode_id(office_pincode_id);
      setbilling_locality_id(office_locality_id);
    }
    else if (!same_as_billing_add && location_data.state === null) {
      setbilling_add_line1("");
      setbilling_add_line2("");
      setbilling_state("");
      setbilling_city("");
      setbilling_pincode("");
      setbilling_locality("");
      setbilling_pincode_id("");
      setbilling_locality_id("");
    }
  }, [same_as_billing_add, dimension_list]);

  // used to fetch data from gst number
  const getGstStates = async (place_id, filter_by) => {
    let state_list = [];
    try {
      const resp = await axios.get(
        ServerAddress +
        `master/all_states/?search=${""}&place_id=${place_id}&filter_by=${filter_by}&p=${1}&records=${10}&state_search=${""}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      if (resp.data.results.length > 0) {
        state_list = resp.data.results.map((v) => [v.id, toTitleCase(v.state)]);
        setgst_state_list(state_list);
        setgst_state_id(resp.data.results[0].id);
      }
    } catch (err) {
      alert(`Error Occur in Get States, ${err}`);
    }
  };

  const getGstCities = async (place_id, filter_by) => {
    let cities_list = [];

    try {
      const resp = await axios.get(
        ServerAddress +
        `master/all_cities/?search=${""}&p=${gst_city_page}&records=${10}&city_search=${gst_city_search_item}` +
        "&place_id=" +
        place_id +
        "&filter_by=" +
        filter_by,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      if (resp.data.results.length > 0) {
        if (resp.data.next === null) {
          setgstcity_loaded(false);
        } else {
          setgstcity_loaded(true);
        }
        if (gst_city_page === 1) {
          cities_list = resp.data.results.map((v) => [
            v.id,
            toTitleCase(v.state_name) + "-" + toTitleCase(v.city),
            v.state,
          ]);
        } else {
          cities_list = [
            ...gst_city_list,
            ...resp.data.results.map((v) => [
              v.id,
              toTitleCase(v.state_name) + "-" + toTitleCase(v.city),
              v.state,
            ]),
          ];
        }
        setgstcity_count(gstcity_count + 2);
        setgst_city_list(cities_list);
      } else {
        setgst_city_list([]);
      }
    } catch (err) {
      console.warn(`Error Occur in Get City, ${err}`);
    }
  };

  const getGstPincode = async (place_id, filter_by) => {
    let pincode_list = [];

    try {
      const resp = await axios.get(
        ServerAddress +
        `master/all_pincode/?search=${""}&p=${gst_pincode_page}&records=${10}&pincode_search=${gst_pincode_search_item}` +
        "&place_id=" +
        place_id +
        "&filter_by=" +
        filter_by,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      if (resp.data.results.length > 0) {
        if (resp.data.next === null) {
          setgstpincode_loaded(false);
        } else {
          setgstpincode_loaded(true);
        }
        if (gst_pincode_page === 1) {
          pincode_list = resp.data.results.map((v) => [v.id, v.pincode]);
        } else {
          pincode_list = [
            ...gstpincode_list,
            ...resp.data.results.map((v) => [v.id, v.pincode]),
          ];
        }
        setgstpincode_count(gstpincode_count + 2);
        setgstpincode_list(pincode_list);
      } else {
        setgstpincode_list([]);
      }
    } catch (err) {
      console.warn(`Error Occur in Get Pincode, ${err}`);
    }
  };

  const getGstLocality = async (place_id, filter_by) => {
    let loc_list = [];
    try {
      const resp = await axios.get(
        ServerAddress +
        `master/all_locality/?search=${""}&p=${gst_locality_page}&records=${10}&name_search=${gst_locality_search_item}` +
        "&place_id=" +
        place_id +
        "&filter_by=" +
        filter_by +
        "&state=&city=&name=&data=all",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      if (resp.data.results.length > 0) {
        if (resp.data.next === null) {
          setgstlocality_loaded(false);
        } else {
          setgstlocality_loaded(true);
        }
        if (gst_pincode_page === 1) {
          loc_list = resp.data.results.map((v) => [v.id, toTitleCase(v.name)]);
        } else {
          loc_list = [
            ...gst_locality_list,
            ...resp.data.results.map((v) => [v.id, toTitleCase(v.name)]),
          ];
        }
        setgstlocality_count(gstlocality_count + 2);
        setgst_locality_list(loc_list);
      } else {
        setgst_locality_list([]);
      }
    } catch (err) {
      console.warn(`Error Occur in Get City, ${err}`);
    }
  };

  useEffect(() => {
    if (gst_state_id !== "" && !by_pincode) {
      getGstCities(gst_state_id, "state");
    }
  }, [gst_state_id, gst_city_page, gst_city_search_item]);

  const [gst_city_id, setgst_city_id] = useState("");
  const [gst_pincode_id, setgst_pincode_id] = useState("");
  const [gst_val, setgst_val] = useState("");
  useLayoutEffect(() => {
    let result = row[row.length - 1][0].substring(0, 12);
    setgst_val(result);
    setgst_city_id(row[row.length - 1][1][0]);
    setgst_pincode_id(row[row.length - 1][2][0]);
  }, [dimension_list]);

  useLayoutEffect(() => {
    if (gst_city_id !== 0) {
      setgst_pincode_page(1);
      setgstpincode_count(1);
      setgstpincode_bottom(103)
      setgstpincode_loaded(true)
    }
  }, [gst_city_id])

  useEffect(() => {
    let timeoutId;
    if (gst_city_id != "") {
      timeoutId = setTimeout(() => {
        getGstPincode(gst_city_id, "city");
      }, 1);
    }
    return () => clearTimeout(timeoutId);
  }, [gst_city_id, gst_pincode_page, gst_pincode_search_item]);

  useEffect(() => {
    if (gst_pincode_id !== 0) {
      setgst_locality_page(1);
      setgstlocality_count(1);
      setgstlocality_bottom(103)
      setgstlocality_loaded(true)
    }
  }, [gst_pincode_id])

  useLayoutEffect(() => {
    let timeoutId;
    if (gst_pincode_id != "") {
      timeoutId = setTimeout(() => {
        getGstLocality(gst_pincode_id, "pincode");
      }, 1);
    }
    return () => clearTimeout(timeoutId);

  }, [gst_pincode_id, gst_locality_page, gst_locality_search_item]);

  useEffect(() => {
    if (isupdating) {
      if (updated_gstaddress.length !== 0) {
        let temp = [];
        let temp_list = [];
        let temp_list2 = [];
        temp = updated_gstaddress;

        for (let index = 0; index < updated_gstaddress.length; index++) {
          temp_list.push([
            temp[index].gst_no,
            [
              temp[index].city_id,
              toTitleCase(temp[index].state_name + "-" + temp[index].city_name),
              temp[index].state,
            ],
            [temp[index].pincode, temp[index].pincode_name],
            [temp[index].location, toTitleCase(temp[index].location_name)],
            toTitleCase(temp[index].address),
            temp[index].is_active,
            temp[index].id,
          ]);
          temp_list2.push(temp[index].id);
        }
        setrow(temp_list);
        setgst_ids(temp_list2);
        setgst_id_list(temp_list2);
      }
    }
  }, [isupdating]);

  useEffect(() => {
    if (gst_id_list !== "") {
      let id_list = gst_ids.filter((p) => gst_id_list.indexOf(p) === -1);
      setdeleted_gst_id(id_list);
    }
  }, [gst_id_list, gst_ids]);

  useEffect(() => {
    if (config_id_list !== "") {
      let id_list = config_ids.filter((p) => config_id_list.indexOf(p) === -1);
      setdeleted_config_id(id_list);
    }
  }, [config_id_list, config_ids]);

  useEffect(() => {
    if (isupdating) {
      if (location_data.state.organization.organization_config.length !== 0) {
        let temp = [];
        let temp_list = [];
        let temp_list2 = [];
        temp = location_data.state.organization.organization_config;

        for (let index = 0; index < location_data.state.organization.organization_config.length; index++) {
          temp_list.push([
            temp[index].config_type,
            temp[index].username,
            temp[index].password,
            temp[index].url,
            temp[index].id,
          ]);
          temp_list2.push(temp[index].id);
        }
        setrow1(temp_list);
        setconfig_ids(temp_list2);
        setconfig_id_list(temp_list2);
      }
    }
  }, [isupdating]);

  useEffect(() => {
    let temp = [];
    for (let index = 0; index < row.length; index++) {
      const element = row[index];
      if (element[5] !== false) {
        temp.push(element);
      }
    }
    if (temp.length !== 0) {
      let b = temp[0][1][1].split("-");

      setoffice_add_line1(toTitleCase(temp[0][4]));
      setoffice_state(b[0]);
      setoffice_state_id(temp[0][1][2]);
      setoffice_city(b[1]);
      setoffice_city_id(temp[0][1][0]);
      setoffice_pincode(temp[0][2][1]);
      setoffice_pincode_id(temp[0][2][0]);
      setoffice_locality(temp[0][3][1]);
      setoffice_locality_id(temp[0][3][0]);
    } else if (temp.length === 0) {
      setoffice_add_line1("");
      setoffice_state("");
      setoffice_state_id(0);
      setoffice_city("");
      setoffice_city_id(0);
      setoffice_pincode("");
      setoffice_pincode_id(0);
      setoffice_locality("");
      setoffice_locality_id(0);
    }
  }, [dimension_list]);

  // for history
  const handlClk = () => {
    navigate(
      "/organization/organization/organizationHistory/OrganizationHistoryPage",
      {
        state: { organization: organization },
      }
    );
  };

  useEffect(() => {
    if (office_add_line1) {
      setoffice_add1_err(false);
    }
    if (office_state) {
      setstate_error(false);
    }
    if (office_city) {
      setcity_error(false);
    }
    if (office_pincode) {
      setpincode_error(false);
    }
    if (office_locality) {
      setlocal_err(false);
    }
    if (billing_add_line1) {
      setbill_add1_err(false);
    }
    if (billing_state) {
      setstate_error1(false);
    }
    if (billing_city) {
      setcity_error1(false);
    }
    if (billing_pincode) {
      setpincode_error2(false);
    }
    if (billing_locality) {
      setlocal_err2(false);
    }

    if (
      office_add_line1 !== "" &&
      office_state !== "" &&
      office_city !== "" &&
      office_pincode !== "" &&
      office_locality !== ""

      &&
      billing_add_line1 !== "" &&
      billing_state !== "" &&
      billing_city !== "" &&
      billing_pincode !== "" &&
      billing_locality !== ""
    ) {
      setbill_color(false);

    }
  }, [
    dimension_list,
    office_add_line1,
    office_state,
    office_city,
    office_pincode,
    office_locality,
    billing_add_line1,
    billing_state,
    billing_city,
    billing_pincode,
    billing_locality,
  ]);

  //  For Check Pan Validation
  const send_org_pan = async () => {
    try {
      const response = await axios.post(
        ServerAddress + "organization/check_org_pan/",
        {
          pan_no: (pan_no).toUpperCase(),
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.data === "duplicate") {
        dispatch(setDataExist(`"${pan_no}" Already Exists`));
        dispatch(setAlertType("warning"));
        dispatch(setShowAlert(true));
        setpan_no_error(true)

        // setpan_no("")
      }
      setloaded_pan(false)
    } catch (error) {
      alert(`Error Happen while posting Organisation Data ${error}`);
    }
  };
  const [loaded_pan, setloaded_pan] = useState(false)

  useEffect(() => {
    if (loaded_pan && !isupdating) {
      send_org_pan()
    }
  }, [loaded_pan])

  useEffect(() => {
    if (pan_no.length === 10) {
      setloaded_pan(true)
    }
    else {
      setloaded_pan(false)
    }
  }, [pan_no])

  useEffect(() => {
    if (pan_no !== "" && (pan_no.length === 10 || !/^([A-Z]{5}[0-9]{4}[A-Z]{1})$/.test(pan_no))) {
      setpan_no_error(false);
    }
  }, [pan_no]);
  useEffect(() => {
    if (result_img !== "") {
      setupload_logo_error(false);
    }
  }, [result_img]);

  useEffect(() => {
    let data = row.some((a) => a[5] == true)
    if (row[row.length - 1].every((e) => e !== "" && data !== false && row[row.length - 1][0].substring(2, 12) === pan_no) && row[row.length - 1][0].length === 15) {
      setgst_error(false)
    }
  }, [dimension_list])

  useEffect(() => {
    let data = row.some((a) => a[5] == true)
    if (row1[row1.length - 1].every((e) => e !== "")) {
      setservice_error(false)
    }
  }, [dimension_list1])

 
  return (
    <>
      <div>
        <Form
          onSubmit={(e) => {
            e.preventDefault();

            let shaw = Object.entries(validation.values);
            let filter_value = shaw.filter((v) => v[1] == "" || v[1] == 0);
            let map_value = filter_value.map((m) => m[0]);
            let all_value = map_value[0];
            let data = row.some((a) => a[5] == true)

            let fields1 = [
              "organisation_name",
              "email",
              "tollfree_no",
              "registeration_number",
              "pan_no",
              "phone_numberp",

              "web_url",
            ];
            let fields2 = [
              "contact_person_name",
              "contact_person_email",
              "contact_person_ph_no",
            ];


            if (pan_no === "") {
              setpan_no_error(true);
              document.getElementById("org_id").scrollIntoView();
            }
            else if (pan_no !== "" && (pan_no.length !== 10 || !/^([A-Z]{5}[0-9]{4}[A-Z]{1})$/.test(pan_no))) {
              setpan_no_error(true);
              document.getElementById("org_id").scrollIntoView();
            }
            else if (company_type === "") {
              setcompany_type_error(true);
              document.getElementById("org_id").scrollIntoView();
            }
            else if (fields1.includes(all_value)) {
              document.getElementById("org_id").scrollIntoView();
            }
            else if (result_img === "") {
              setupload_logo_error(true);
              document.getElementById("org_id").scrollIntoView();
            }
            else if (row[row.length - 1].some((some) => some === "")) {
              document.getElementById('gst_details').scrollIntoView();
              setgst_error(true)
              setgst_text("Please Fill All GST Address")
              // alert("Please Fill GST No, Selcet City , Select Pincode,Select Locality,Enter Address")
            }
            // else if(row[row.length - 1][0].length !== 15){
            //   document.getElementById('gst_details').scrollIntoView();
            //   alert("Gst Number Must Be 15 Digit")
            // }
            else if (data === false) {
              document.getElementById('gst_details').scrollIntoView();
              setgst_error(true)
              setgst_text("Please Checked, checkBox of Head Office")
              // alert("Please Checked, checkBox of Head Office")
            }
            else if (row1[row1.length - 1][0] !== "" && row1[row1.length - 1].some((some) => some === "")) {
              document.getElementById('config_details').scrollIntoView();
              setservice_error(true)
            }
            else if (office_add_line1 === "") {
              setoffice_add1_err(true);
              document.getElementById("add").scrollIntoView();
            }
            else if (office_state === "") {
              setstate_error(true);
              document.getElementById("add").scrollIntoView();
            }
            else if (office_city === "") {
              setcity_error(true);
              document.getElementById("add").scrollIntoView();
            }
            else if (office_pincode === "") {
              setpincode_error(true);
              document.getElementById("add").scrollIntoView();
            }
            else if (office_locality === "") {
              setlocal_err(true);
              document.getElementById("add").scrollIntoView();
            }
            else if (fields2.includes(all_value)) {
              document.getElementById("section2").scrollIntoView();
            }


            // else if (
            //   office_add_line1 !== "" &&
            //   office_state !== "" &&
            //   office_city !== "" &&
            //   office_pincode !== "" &&
            //   office_locality !== ""
            // // ) {
            // //   if (
            //   &&
            //     billing_add_line1 === "" ||
            //     billing_state === "" ||
            //     billing_city === "" ||
            //     billing_pincode === "" ||
            //     billing_locality === ""
            //   )
            //    {
            //     setbill_color(true);
            //     document.getElementById("add").scrollIntoView();
            //   } 
            //   // else {
            //   //   setbill_color(false);
            //   // }
            // // }
            // else if (billing_add_line1 === "") {
            //   setbill_add1_err(true);
            //   document.getElementById("add").scrollIntoView();
            // } else if (billing_state !== "") {
            //   setstate_error1(true);
            //   document.getElementById("add").scrollIntoView();
            // } else if (billing_city !== "") {
            //   setcity_error1(true);
            //   document.getElementById("add").scrollIntoView();
            // } else if (billing_pincode !== "") {
            //   setpincode_error2(true);
            //   document.getElementById("add").scrollIntoView();
            // } else if (billing_locality !== "") {
            //   setlocal_err2(true);
            //   document.getElementById("add").scrollIntoView();
            // }
            validation.handleSubmit(e.values);
            return false;
          }}
        >
          <div className="mt-3">
            <PageTitle
              page={isupdating ? "Update Organization" : "Add Organization"}
            />
            <Title
              title={isupdating ? "Update Organization" : "Add Organization"}
              parent_title="Masters"
            />
          </div>
          {/* Add For History Button */}
          {isupdating && (
            <div style={{ justifyContent: "right", display: "flex", marginRight: "20px" }}>
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

          {/* organization Info */}
          <div className="m-3" id="org_id">
            <Col lg={12}>
              <Card className="shadow bg-white rounded">
                <CardTitle className="mb-1 header">
                  <div className="header-text-icon header-text">
                    Organization Info
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
                          <Label className="header-child">PAN Number *:</Label>
                          <Input
                            maxLength={10}
                            value={pan_no}
                            onChange={(e) =>
                              setpan_no(e.target.value)
                            }
                            onBlur={() => {
                              if (pan_no.length !== 10 || !/^([A-Z]{5}[0-9]{4}[A-Z]{1})$/.test(pan_no)) {
                                setpan_no_error(true)
                              }
                              // else {
                              //   setpan_no_error(false)
                              // }
                            }}
                            id="input"
                            type="text"
                            placeholder="Please Enter PAN"
                            invalid={pan_no_error}
                          />
                          <FormFeedback type="invalid">
                            PAN is required (e.g. ABCDE1234F)
                          </FormFeedback>
                        </div>
                      </Col>

                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-2" id="section1">
                          <Label className="header-child">Name*</Label>
                          <Input
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.organisation_name || ""}
                            invalid={
                              validation.touched.organisation_name &&
                                validation.errors.organisation_name
                                ? true
                                : false
                            }
                            type="text"
                            className="form-control-md"
                            id="input"
                            name="organisation_name"
                            placeholder="Enter Organization Name"
                          />
                          {validation.touched.organisation_name &&
                            validation.errors.organisation_name ? (
                            <FormFeedback type="invalid">
                              {validation.errors.organisation_name}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>

                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-2" id="section1">
                          <Label className="header-child">Alias Name*</Label>
                          <Input
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.alias_name || ""}
                            invalid={
                              validation.touched.alias_name &&
                                validation.errors.alias_name
                                ? true
                                : false
                            }
                            type="text"
                            className="form-control-md"
                            id="input"
                            name="alias_name"
                            placeholder="Enter Alias Name"
                          />
                          {validation.touched.alias_name &&
                            validation.errors.alias_name ? (
                            <FormFeedback type="invalid">
                              {validation.errors.alias_name}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>

                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-2">
                          <Label className="header-child">Company Type *</Label>
                          <NSearchInput
                            data_list={company_type_list}
                            data_item_s={company_type}
                            set_data_item_s={setcompany_type}
                            show_search={false}
                            error_message={"Please Select Company Type"}
                            error_s={company_type_error}
                          />
                        </div>
                      </Col>

                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-2">
                          <Label className="header-child">Email:</Label>
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
                            className="form-control-md"
                            id="input"
                            name="email"
                            type="email"
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
                          <Label className="header-child">
                            Toll Free Number*
                          </Label>
                          <Input
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.toll_free_number || ""}
                            invalid={
                              validation.touched.toll_free_number &&
                                validation.errors.toll_free_number
                                ? true
                                : false
                            }
                            type="number"
                            min={0}
                            className="form-control-md"
                            id="input"
                            name="toll_free_number"
                            placeholder="Enter Toll Free Number"
                          />
                          {validation.touched.toll_free_number &&
                            validation.errors.toll_free_number ? (
                            <FormFeedback type="invalid">
                              {validation.errors.toll_free_number}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>

                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-2">
                          <Label className="header-child">
                            Registration / Incorporation No:
                          </Label>
                          <Input
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.registeration_number || ""}
                            invalid={
                              validation.touched.registeration_number &&
                                validation.errors.registeration_number
                                ? true
                                : false
                            }
                            type="text"
                            className="form-control-md"
                            id="input"
                            name="registeration_number"
                            placeholder="Enter Registration Number"
                          />
                          {validation.touched.registeration_number &&
                            validation.errors.registeration_number ? (
                            <FormFeedback type="invalid">
                              {validation.errors.registeration_number}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-2">
                          <Label className="header-child">
                            TAN Number*:
                          </Label>
                          <Input
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.tan_no || ""}
                            invalid={
                              validation.touched.tan_no &&
                                validation.errors.tan_no
                                ? true
                                : false
                            }
                            className="form-control-md"
                            id="input"
                            name="tan_no"
                            type="text"
                            placeholder="Enter Tan Number"
                          />
                          {validation.touched.tan_no &&
                            validation.errors.tan_no ? (
                            <FormFeedback type="invalid">
                              {validation.errors.tan_no}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>

                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-2">
                          <Label className="header-child">
                            Primary Mobile No.
                          </Label>
                          <Input
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.phone_numberp || ""}
                            invalid={
                              validation.touched.phone_numberp &&
                                validation.errors.phone_numberp
                                ? true
                                : false
                            }
                            className="form-control-md"
                            id="input"
                            type="number"
                            name="phone_numberp"
                            placeholder="Enter Phone Number"
                            min={0}
                          />
                          {validation.touched.phone_numberp &&
                            validation.errors.phone_numberp ? (
                            <FormFeedback type="invalid">
                              {validation.errors.phone_numberp}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>

                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-2">
                          <Label className="header-child">
                            Secondary Mobile No.
                          </Label>
                          <Input
                            onChange={(val) => {
                              setsec_mobile2(val.target.value);
                            }}
                            value={sec_mobile2}
                            // invalid={mobile_error}
                            className="form-control-md"
                            id="input"
                            name="phone_numbers"
                            type="number"
                            min={0}
                            placeholder="Enter Phone Number"
                          />
                        </div>
                      </Col>

                      {/* <Col lg={4} md={6} sm={6}>
                        <div className="mb-2">
                          <Label className="header-child">Upload logos</Label>
                          <Input
                            className="form-control-md"
                            id="input"
                            name="logo"
                            type="file"
                          />
                        </div>
                      </Col> */}

                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-2">
                          <Label className="header-child">
                            Website Address*:
                          </Label>
                          <Input
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.web_url || ""}
                            invalid={
                              validation.touched.web_url &&
                                validation.errors.web_url
                                ? true
                                : false
                            }
                            className="form-control-md"
                            id="input"
                            name="web_url"
                            type="text"
                            placeholder="Enter Website URL"
                          />
                          {validation.touched.web_url &&
                            validation.errors.web_url ? (
                            <FormFeedback type="invalid">
                              {validation.errors.web_url}
                            </FormFeedback>
                          ) : null}
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
                            <Label>Upload Logos</Label>
                            <Input
                              style={{ background: "white" }}
                              className="form-control-md"
                              name="logo"
                              // type=""
                              id="input"
                              disabled
                              value={result_img}
                              invalid={upload_logo_error}
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
                                marginLeft: "1px",
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
                              Logo is required
                            </FormFeedback>
                          </div>
                        </Col>
                      }
                      {result_img && (
                        <Col lg={4} md={4} sm={6}>
                         <Label>Upload Logos</Label>
                          <div className="mb-3" onClick={() => setmodal(true)}>
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

                    </Row>
                  </CardBody>
                ) : null}
              </Card>
            </Col>
          </div>

          {/*  GST Address */}
          <div className="m-3" id="gst_details">
            <Col lg={12}>
              <Card className="shadow bg-white rounded">
                <CardTitle className="mb-1 header">
                  <div className="header-text-icon header-text">
                    GST Address
                    <IconContext.Provider
                      value={{
                        className: "header-add-icon",
                      }}
                    >
                      <div onClick={toggle_circle3}>
                        {circle_btn3 ? (
                          <MdRemoveCircleOutline />
                        ) : (
                          <MdAddCircleOutline />
                        )}
                      </div>
                    </IconContext.Provider>
                  </div>
                </CardTitle>
                {circle_btn3 ? (
                  <CardBody>
                    <Row>
                      <>
                        <Row className="hide">
                          <Col lg={2} md={3} sm={3}>
                            <div className="mb-3">
                              <Label className="header-child">GST No*</Label>
                              {row.map((item, index) => {
                                return (
                                  <Input
                                    min={0}
                                    key={index}
                                    value={item[0]}
                                    disabled={row.length - 1 !== index}
                                    type="text"
                                    className="form-control-md"
                                    id="input"
                                    style={{ marginBottom: "15px" }}
                                    placeholder="Enter GST No. "
                                    onChange={(val) => {
                                      // setlength(val.target.value);
                                      item[0] = val.target.value;
                                      setrefresh(!refresh);
                                    }}
                                    onBlur={() => {
                                      // setclicked(true);
                                      // alert("----")
                                      let itm = item[0];

                                      if (
                                        item[0].length == 15 &&
                                        gst_val ==
                                        itm[0] +
                                        itm[1] +
                                        pan_no
                                      ) {
                                        getGstStates(
                                          itm[0] + itm[1],
                                          "gst_code"
                                        );
                                      } else if (
                                        item[0].length > 10 &&
                                        row.length - 1 === index
                                      ) {
                                        dispatch(setShowAlert(true));
                                        dispatch(
                                          setDataExist(`Invalid GST Number`)
                                        );
                                        dispatch(setAlertType("warning"));
                                      }
                                    }}
                                  />
                                );
                              })}
                            </div>
                          </Col>

                          <Col lg={2} md={3} sm={3}>
                            <div className="mb-3">
                              <Label className="header-child"> City*</Label>
                              {row.map((item, index) => (
                                <div className="mb-3">
                                  <MultiRowSearchInput
                                    data_list={gst_city_list}
                                    setdata_list={setgst_city_list}
                                    data_item_s={row[index][1]}
                                    page={gst_city_page}
                                    setpage={setgst_city_page}
                                    setsearch_txt={setgst_city_search_item}
                                    refresh={refresh}
                                    setrefresh={setrefresh}
                                    idx={index}
                                    loaded={gstcity_loaded}
                                    count={gstcity_count}
                                    bottom={gstcity_bottom}
                                    setbottom={setgstcity_bottom}
                                    disable_me={row.length - 1 !== index}
                                  />
                                </div>
                              ))}
                            </div>
                          </Col>

                          <Col lg={2} md={3} sm={3}>
                            <div className="mb-3">
                              <Label className="header-child">Pincode* </Label>
                              {row.map((item, index) => (
                                <div className="mb-3">
                                  <MultiRowSearchInput
                                    data_list={gstpincode_list}
                                    setdata_list={setgstpincode_list}
                                    data_item_s={row[index][2]}
                                    page={gst_pincode_page}
                                    setpage={setgst_pincode_page}
                                    setsearch_txt={setgst_pincode_search_item}
                                    refresh={refresh}
                                    setrefresh={setrefresh}
                                    idx={index}
                                    count={gstpincode_count}
                                    bottom={gstpincode_bottom}
                                    setbottom={setgstpincode_bottom}
                                    disable_me={row.length - 1 !== index}
                                  />
                                </div>
                              ))}
                            </div>
                          </Col>
                          <Col lg={2} md={3} sm={3}>
                            <div className="mb-3">
                              <Label className="header-child">Locality* </Label>
                              {row.map((item, index) => (
                                <div className="mb-3">
                                  <MultiRowSearchInput
                                    data_list={gst_locality_list}
                                    setdata_list={setgst_locality_list}
                                    data_item_s={row[index][3]}
                                    page={gst_locality_page}
                                    setpage={setgst_locality_page}
                                    setsearch_txt={setgst_locality_search_item}
                                    refresh={refresh}
                                    setrefresh={setrefresh}
                                    idx={index}
                                    loaded={gstlocality_loaded}
                                    count={gstlocality_count}
                                    bottom={gstlocality_bottom}
                                    setbottom={setgstlocality_bottom}
                                    disable_me={row.length - 1 !== index}
                                  />
                                </div>
                              ))}
                            </div>
                          </Col>

                          <Col lg={2} md={3} sm={3}>
                            <div className="mb-3">
                              <Label className="header-child">Address*</Label>
                              {row.map((item, index) => {
                                return (
                                  <Input
                                    min={0}
                                    key={index}
                                    value={item[4]}
                                    type="text"
                                    className="form-control-md"
                                    id="input"
                                    style={{ marginBottom: "15px" }}
                                    placeholder="Enter Address "
                                    onChange={(val) => {
                                      item[4] = val.target.value;
                                      setrefresh(!refresh);
                                    }}
                                  />
                                );
                              })}
                            </div>
                          </Col>
                          <Col lg={1} md={3} sm={3}>
                            <div
                              className="mb-3"
                              style={{ textAlign: "center" }}
                            >
                              <Label className="header-child">H.O</Label>
                              {row.map((item, index) => {
                                return (
                                  <div
                                  >
                                    {row.some((a) => a[5] == true && a[5] === row[index][5]) &&
                                      (
                                        <FiCheckSquare
                                          onClick={() => {
                                            if (selected.includes(index)) {
                                              let lis = [...selected];
                                              setselected(
                                                lis.filter((e) => e !== index)
                                              );
                                              setactive(false);
                                              item[5] = false;
                                            } else {
                                              setselected([...selected, index]);
                                              setactive(true);
                                              item[5] = true;
                                            }
                                          }}
                                          style={{ marginBottom: "40px" }}
                                        />
                                      )
                                    }

                                    {row.every((a) => a[5] == false) ?
                                      <FiSquare onClick={() => {
                                        if (selected.includes(index)) {
                                          let lis = [...selected];
                                          setselected(
                                            lis.filter((e) => e !== index)
                                          );
                                          setactive(false);
                                          item[5] = false;
                                        } else {
                                          setselected([...selected, index]);
                                          setactive(true);
                                          item[5] = true;
                                        }
                                      }} style={{ marginBottom: "40px" }} />
                                      : row.some((a) => a[5] !== true && a[5] === row[index][5]) ? <FiSquare style={{ marginBottom: "40px" }} /> : null
                                    }

                                  </div>
                                );
                              })}
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
                                      {/* <div style={{ height: "14.5px" }}></div> */}
                                      <div
                                        onClick={() => {
                                          deleteGST(item);
                                        }}
                                      >
                                        <MdDeleteForever
                                          style={{
                                            justifyContent: "center",
                                            cursor: "pointer",
                                            marginBottom: "37px",
                                          }}
                                        />
                                      </div>
                                    </>
                                  ) : null}
                                </IconContext.Provider>
                              ))}
                            </div>
                          </Col>
                          {gst_error ? (
                            <div style={{ color: "#f46a6a", fontSize: "12px", marginBottom: "12px" }}>
                              {gst_text}
                            </div>
                          ) : null}
                        </Row>
                        <>
                          {row.length < 20 && (
                            <div style={{ margin: " 0 0 20px 0" }}>

                              <span
                                className="link-text"
                                onClick={() => {
                                  setgst_city_list([])
                                  setgst_city_page(1)
                                  setgstcity_bottom(103)
                                  const lastRow = row[row.length - 1];
                                  if (row[row.length - 1].some((data) => data === "")) {
                                    setgst_error(true)
                                    setgst_text("Please Fill All GST Address")
                                    // alert("Please Fill GST No, Selcet City , Select Pincode,Select Locality,Enter Address")
                                  } else {
                                    addGST();
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
                                Add Another GST
                              </span>
                            </div>
                          )}
                        </>
                      </>
                    </Row>
                  </CardBody>
                ) : null}
              </Card>
            </Col>
          </div>

          {/*  Organisaziation Configration */}
          <div className="m-3" id="config_details">
            <Col lg={12}>
              <Card className="shadow bg-white rounded">
                <CardTitle className="mb-1 header">
                  <div className="header-text-icon header-text">
                    Organization Configuration
                    <IconContext.Provider
                      value={{
                        className: "header-add-icon",
                      }}
                    >
                      <div onClick={toggle_circle3}>
                        {circle_btn3 ? (
                          <MdRemoveCircleOutline />
                        ) : (
                          <MdAddCircleOutline />
                        )}
                      </div>
                    </IconContext.Provider>
                  </div>
                </CardTitle>
                {circle_btn3 ? (
                  <CardBody>
                    <Row>
                      <>
                        <Row className="hide">
                          <Col lg={3} md={4} sm={4}>
                            <div className="mb-3">
                              <Label className="header-child">System Type:</Label>
                              {row1.map((item1, index1) => {
                                return (

                                  <div
                                    key={index1}
                                  >

                                    <select
                                      style={{
                                        marginBottom: "15px",
                                        boxShadow: "none",
                                      }}
                                      className="form-select"
                                      placeholder="Select status"
                                      id="input"
                                      value={item1[0]}
                                      onChange={(val) => {
                                        setconfig_type_sel(val.target.value);
                                        item1[0] = val.target.value;
                                        // row3[index1][1] = val.target.value;
                                      }}
                                      defaultValue="Select status"
                                    >

                                      <option>    </option>
                                      <option>PANCARD</option>
                                      <option>EWAYBILL</option>
                                      <option>AADHAR</option>
                                      <option>GPS</option>
                                    </select>
                                  </div>
                                );
                              })}
                            </div>
                          </Col>

                          <Col lg={3} md={4} sm={4}>
                            <div className="mb-3">
                              <Label className="header-child"> Username</Label>
                              {row1.map((item1, index1) => (
                                <div className="mb-3">
                                  <Input
                                    min={0}
                                    key={index1}
                                    value={item1[1]}
                                    type="text"
                                    className="form-control-md"
                                    id="input"
                                    style={{ marginBottom: "15px" }}
                                    placeholder="Enter Username "
                                    onChange={(val) => {
                                      setusername(val.target.value);
                                      item1[1] = val.target.value;
                                      // setrefresh(!refresh);
                                    }}
                                  />
                                </div>
                              ))}
                            </div>
                          </Col>

                          <Col lg={3} md={4} sm={4}>
                            <div className="mb-3">
                              <Label className="header-child">Password </Label>
                              {row1.map((item1, index1) => (
                                <div className="mb-3">
                                  <Input
                                    min={0}
                                    key={index1}
                                    value={item1[2]}
                                    type="text"
                                    className="form-control-md"
                                    id="input"
                                    style={{ marginBottom: "15px" }}
                                    placeholder="Enter Password "
                                    onChange={(val) => {
                                      setpassword(val.target.value);
                                      item1[2] = val.target.value;
                                      // setrefresh(!refresh);
                                    }}
                                  />
                                </div>
                              ))}
                            </div>
                          </Col>
                          <Col lg={2} md={4} sm={4}>
                            <div className="mb-3">
                              <Label className="header-child"> URL </Label>
                              {row1.map((item1, index1) => (
                                <div className="mb-3">
                                  <Input
                                    min={0}
                                    key={index1}
                                    value={item1[3]}
                                    type="text"
                                    className="form-control-md"
                                    id="input"
                                    style={{ marginBottom: "15px" }}
                                    placeholder="Enter Url "
                                    onChange={(val) => {
                                      seturl(val.target.value);
                                      item1[3] = val.target.value;
                                      // setrefresh(!refresh);
                                    }}
                                  />
                                </div>
                              ))}
                            </div>
                          </Col>


                          <Col lg={1}>
                            <div
                              className="mb-3"
                              style={{ textAlign: "center" }}
                            >
                              {row1.length > 1 ? (
                                <Label className="header-child">Delete</Label>
                              ) : null}
                              {row1.map((item, index) => (
                                <IconContext.Provider
                                  key={index}
                                  value={{
                                    className: "icon multi-input",
                                  }}
                                >
                                  {row1.length > 1 ? (
                                    <>
                                      <div style={{ height: "14.5px" }}></div>
                                      <div
                                        onClick={() => {
                                          deleteConfig(item)
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
                          {service_error ? (
                            <div style={{ color: "#f46a6a", fontSize: "12px", marginBottom: "12px" }}>
                              Please Fill All Configuration Details
                            </div>
                          ) : null}
                        </Row>
                        <>
                          {row1.length < 20 && (
                            <div >
                              <span
                                className="link-text"
                                onClick={() => {
                                  const lastRow = row1[row1.length - 1];
                                  if (row1[row1.length - 1].some((data) => data === "")) {
                                    document.getElementById('config_details').scrollIntoView();
                                    setservice_error(true)
                                  } else {
                                    addConfig();
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
                                ADD ANOTHER CONFIG
                              </span>
                            </div>
                          )}
                        </>
                      </>
                    </Row>
                  </CardBody>
                ) : null}
              </Card>
            </Col>
          </div>


          {/* Address info */}
          <div className="m-3" id="add">
            <Col lg={12}>
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
                        Head Office Address
                      </div>

                      <div
                        style={{
                          background: active_tab == "second" ? "#C4D7FE" : null,
                          color: bill_color ? "red" : null,
                        }}
                        className="btn1 footer-text"
                        value="second"
                        onClick={() => {
                          setactive_tab("second");
                        }}
                      >
                        Billing Address
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
                        /*billing address*/
                        <Row>
                          <div style={{ display: "flex" }}>
                            <Label className="add">
                              *IF BILLING ADDRESS IS SAME AS HEAD OFFICE ADDRESS{" "}
                            </Label>
                            <Input
                              style={{
                                width: "15px",
                                margin: "-1px 5px 5px 5px",
                              }}
                              type="checkbox"
                              onChange={() => {
                                setsame_as_billing_add(!same_as_billing_add);
                              }}
                              checked={same_as_billing_add}
                            />
                          </div>
                          <Col lg={4} md={6} sm={6}>
                            <div className="mb-2">
                              <Label className="header-child">
                                Address Line :*
                              </Label>
                              <Input
                                value={office_add_line1}
                                onChange={(val) => {
                                  setoffice_add_line1(val.target.value);
                                }}
                                onBlur={() => {
                                  if (office_add_line1 === "") {
                                    setoffice_add1_err(true);
                                  }
                                }}
                                invalid={office_add1_err}
                                type="text"
                                className="form-control-md"
                                id="input"
                                name="office_add_line1"
                                placeholder="Enter Address Line1"
                                disabled
                              />
                              <div className="mt-1 error-text" color="danger">
                                {office_add1_err
                                  ? "Address field is required"
                                  : null}
                              </div>
                            </div>
                          </Col>

                          <Col lg={4} md={6} sm={6}>
                            <div className="mb-2">
                              <Label className="header-child">
                                Address Line 2
                              </Label>
                              <Input
                                onChange={(val) => {
                                  setoffice_add_line2(val.target.value);
                                }}
                                value={office_add_line2}
                                type="text"
                                className="form-control-md"
                                id="input"
                                name="office_add_line2"
                                placeholder="Enter Address Line2"
                              />
                            </div>
                          </Col>

                          <Col lg={4} md={6} sm={6}>
                            <div className="mb-2">
                              <Label className="header-child">State*</Label>
                              <span onClick={() => setby_pincode(false)}>
                                <SearchInput
                                  data_list={state_list_s}
                                  setdata_list={setstate_list_s}
                                  data_item_s={office_state}
                                  set_data_item_s={setoffice_state}
                                  set_id={setoffice_state_id}
                                  page={billing_state_page}
                                  setpage={setbilling_state_page}
                                  setsearch_item={setbilling_state_search_item}
                                  error_message={"Please Select Any State"}
                                  error_s={state_error}
                                  loaded={state_loded}
                                  count={state_count}
                                  bottom={billing_state_bottom}
                                  setbottom={setbilling_state_bottom}
                                  disable_me={true}
                                />
                              </span>
                              {/* <div className="mt-1 error-text" color="danger">
                                {state_error ? "Please Select Any State" : null}
                              </div> */}
                            </div>
                          </Col>

                          <Col lg={4} md={6} sm={6}>
                            <div className="mb-2">
                              <Label className="header-child">City*</Label>
                              <SearchInput
                                data_list={office_city_list}
                                setdata_list={setoffice_city_list}
                                data_item_s={office_city}
                                set_data_item_s={setoffice_city}
                                set_id={setoffice_city_id}
                                page={city_page}
                                setpage={setcity_page}
                                search_item={city_search_item}
                                setsearch_item={setcity_search_item}
                                error_message={"Please Select Any City"}
                                error_s={city_error}
                                loaded={city_loaded}
                                count={city_count}
                                disable_me={true}
                              />
                              {/* <div className="mt-1 error-text" color="danger">
                                {city_error ? "Please Select Any City" : null}
                              </div> */}
                            </div>
                          </Col>

                          <Col lg={4} md={6} sm={6}>
                            {office_pincode_loaded ? (
                              <div className="mb-2">
                                <Label className="header-child">
                                  Pin Code*
                                </Label>

                                <SearchInput
                                  data_list={office_pincode_list}
                                  setdata_list={setoffice_pincode_list}
                                  data_item_s={office_pincode}
                                  set_data_item_s={setoffice_pincode}
                                  set_id={setoffice_pincode_id}
                                  page={pincode_page}
                                  setpage={setpincode_page}
                                  search_item={pincode_search_item}
                                  setsearch_item={setpincode_search_item}
                                  error_message={"Please add Code"}
                                  error_s={pincode_error}
                                  loaded={load_office_pincode}
                                  count={office_pincode_count}
                                  disable_me={true}
                                />
                              </div>
                            ) : (
                              <div className="mb-2">
                                <Label className="header-child">
                                  Pin Code*:
                                </Label>
                                <Input
                                  onChange={(val) => {
                                    setoffice_pincode(val.target.value);
                                    if (val.target.value.length !== 0) {
                                      setpincode_error(false);
                                      if (val.target.value.length === 6) {
                                        setpincode_error2(false);
                                      } else {
                                        setpincode_error2(true);
                                      }
                                    } else {
                                      setpincode_error(true);
                                    }
                                  }}
                                  onBlur={() => {
                                    if (office_pincode.length === 0) {
                                      setpincode_error(true);
                                    } else {
                                      if (office_pincode.length !== 6) {
                                        setpincode_error(false);
                                        setpincode_error2(true);
                                      } else {
                                        getPincode(
                                          office_pincode,
                                          "pincode",
                                          "office_city"
                                        );
                                        setpincode_error2(false);
                                        setby_pincode(true);
                                      }
                                    }
                                  }}
                                  value={office_pincode}
                                  disabled
                                  invalid={pincode_error}
                                  type="number"
                                  className="form-control-md"
                                  id="input"
                                  name="pincode1"
                                  placeholder="Enter Pin code"
                                />

                                {pincode_loaded === false &&
                                  pincode_error === true ? (
                                  <div
                                    className="mt-1 error-text"
                                    color="danger"
                                  >
                                    {pincode_error
                                      ? "Please Add Pin code"
                                      : null}
                                  </div>
                                ) : null}

                                {pincode_loaded === false &&
                                  pincode_error === false &&
                                  pincode_error2 === true ? (
                                  <div
                                    style={{
                                      color: "#F46E6E",
                                      fontSize: "10.4px",
                                      marginTop: "4px",
                                    }}
                                  >
                                    pincode should 6 digit
                                  </div>
                                ) : null}
                              </div>
                            )}
                          </Col>

                          <Col lg={4} md={6} sm={6}>
                            {office_pincode_loaded && (
                              <div className="mb-2">
                                <Label className="header-child">
                                  Locality*:
                                </Label>

                                <SearchInput
                                  data_list={office_locality_list}
                                  setdata_list={setoffice_locality_list}
                                  data_item_s={office_locality}
                                  set_data_item_s={setoffice_locality}
                                  set_id={setoffice_locality_id}
                                  page={locality_page}
                                  setpage={setlocality_page}
                                  setsearch_item={setlocality_search_item}
                                  error_message={"Please Select Locality"}
                                  error_s={local_err}
                                  disable_me={true}
                                />
                              </div>
                            )}
                          </Col>
                        </Row>
                      ) : null}

                      {active_tab == "second" ? (
                        // Office address
                        <Row>
                          {same_as_billing_add ? (
                            <Col lg={4} md={6} sm={6}>
                              <div className="mb-2">
                                <Label className="header-child">
                                  Address Line 1:*
                                </Label>
                                <Input
                                  value={billing_add_line1}
                                  type="text"
                                  className="form-control-md"
                                  id="input"
                                  disabled
                                />
                              </div>
                            </Col>
                          ) : (
                            <Col lg={4} md={6} sm={6}>
                              <div className="mb-2">
                                <Label className="header-child">
                                  Address Line 1:*
                                </Label>
                                <Input
                                  value={
                                    same_as_billing_add
                                      ? office_add_line1
                                      : billing_add_line1
                                  }
                                  onChange={(val) => {
                                    setbilling_add_line1(val.target.value);
                                  }}
                                  onBlur={() => {
                                    if (billing_add_line1 === "")
                                      setbill_add1_err(true);
                                  }}
                                  invalid={bill_add1_err}
                                  type="text"
                                  className="form-control-md"
                                  id="input"
                                  name="billing_add_line1"
                                  placeholder="Enter Address Line1"
                                />
                                <div className="mt-1 error-text" color="danger">
                                  {bill_add1_err
                                    ? "Address Field  is required"
                                    : null}
                                </div>
                              </div>
                            </Col>
                          )}
                          {same_as_billing_add ? (
                            <Col lg={4} md={6} sm={6}>
                              <div className="mb-2">
                                <Label className="header-child">
                                  Address Line 2
                                </Label>
                                <Input
                                  value={billing_add_line2}
                                  type="text"
                                  className="form-control-md"
                                  id="input"
                                  disabled
                                />
                              </div>
                            </Col>
                          ) : (
                            <Col lg={4} md={6} sm={6}>
                              <div className="mb-2">
                                <Label className="header-child">
                                  Address Line 2
                                </Label>
                                <Input
                                  onChange={(val) => {
                                    setbilling_add_line2(val.target.value);
                                  }}
                                  value={
                                    same_as_billing_add
                                      ? office_add_line2
                                      : billing_add_line2
                                  }
                                  type="text"
                                  className="form-control-md"
                                  id="input"
                                  name="billing_add_line2"
                                  placeholder="Enter Address Line2"
                                />
                              </div>
                            </Col>
                          )}
                          {same_as_billing_add ? (
                            <Col lg={4} md={6} sm={6}>
                              <div className="mb-2">
                                <Label className="header-child">State*</Label>
                                <Input
                                  value={billing_state}
                                  type="text"
                                  className="form-control-md"
                                  id="input"
                                  disabled
                                />
                              </div>
                            </Col>
                          ) : (
                            <Col lg={4} md={6} sm={6}>
                              <div className="mb-2">
                                <Label className="header-child">State*:</Label>
                                <span onClick={() => setby_pincode(false)}>
                                  <SearchInput
                                    data_list={state_list_s}
                                    setdata_list={setstate_list_s}
                                    data_item_s={billing_state}
                                    set_data_item_s={setbilling_state}
                                    set_id={setbilling_state_id}
                                    page={billing_state_page}
                                    setpage={setbilling_state_page}
                                    setsearch_item={
                                      setbilling_state_search_item
                                    }
                                    error_message={"Please Select Any State"}
                                    error_s={state_error1}
                                    loaded={state_loded}
                                    count={state_count}
                                    bottom={billing_state_bottom}
                                    setbottom={setbilling_state_bottom}
                                  />
                                </span>
                                {/* <div className="mt-1 error-text" color="danger">
                                  {state_error ? "Please Select Any State" : null}
                                </div> */}
                              </div>
                            </Col>
                          )}
                          {same_as_billing_add ? (
                            <Col lg={4} md={6} sm={6}>
                              <div className="mb-2">
                                <Label className="header-child">City*</Label>
                                <Input
                                  value={billing_city}
                                  type="text"
                                  className="form-control-md"
                                  id="input"
                                  disabled
                                />
                              </div>
                            </Col>
                          ) : (
                            <Col lg={4} md={6} sm={6}>
                              <div className="mb-2">
                                <Label className="header-child">City*:</Label>
                                <SearchInput
                                  data_list={billing_city_list}
                                  setdata_list={setbilling_city_list}
                                  data_item_s={billing_city}
                                  set_data_item_s={setbilling_city}
                                  set_id={setbilling_city_id}
                                  page={billing_city_page}
                                  setpage={setbilling_city_page}
                                  search_item={billing_city_search_item}
                                  setsearch_item={setbilling_city_search_item}
                                  error_message={"Please Select Any City"}
                                  error_s={city_error1}
                                  loaded={billing_city_loaded}
                                  count={billing_city_count}
                                  bottom={billing_city_bottom}
                                  setbottom={setbilling_city_bottom}
                                />
                                {/* <div className="mt-1 error-text" color="danger">
                                  {city_error ? "Please Select Any City" : null}
                                </div> */}
                              </div>
                            </Col>
                          )}
                          {same_as_billing_add ? (
                            <Col lg={4} md={6} sm={6}>
                              <div className="mb-2">
                                <Label className="header-child">Pincode*</Label>
                                <Input
                                  value={billing_pincode}
                                  type="text"
                                  className="form-control-md"
                                  id="input"
                                  disabled
                                />
                              </div>
                            </Col>
                          ) : (
                            <Col lg={4} md={6} sm={6}>
                              {billing_pincode_loaded ? (
                                <div className="mb-2">
                                  <Label className="header-child">
                                    Pin Code*:
                                  </Label>

                                  <SearchInput
                                    data_list={billing_pincode_list}
                                    setdata_list={setbilling_pincode_list}
                                    data_item_s={billing_pincode}
                                    set_data_item_s={setbilling_pincode}
                                    set_id={setbilling_pincode_id}
                                    page={billing_pincode_page}
                                    setpage={setbilling_pincode_page}
                                    setsearch_item={
                                      setbilling_pincode_search_item
                                    }
                                    error_message={"Please Add Pin Code"}
                                    error_s={pincode_error2}
                                    loaded={loaded_billing_pincode}
                                    count={billing_pincode_count}
                                    bottom={billing_pincode_bottom}
                                    setbottom={setbilling_pincode_bottom}
                                  />
                                </div>
                              ) : (
                                <div className="mb-2">
                                  <Label className="header-child">
                                    Pin Code*:
                                  </Label>
                                  <Input
                                    onChange={(val) => {
                                      setbilling_pincode(val.target.value);
                                      if (val.target.value.length !== 0) {
                                        setpincode_error(false);
                                        if (val.target.value.length === 6) {
                                          setpincode_error2(false);
                                        } else {
                                          setpincode_error2(true);
                                        }
                                      } else {
                                        setpincode_error(true);
                                      }
                                    }}
                                    onBlur={() => {
                                      if (billing_pincode.length === 0) {
                                        setpincode_error(true);
                                      } else {
                                        if (billing_pincode.length !== 6) {
                                          setpincode_error(false);
                                          setpincode_error2(true);
                                        } else {
                                          getPincode(
                                            billing_pincode,
                                            "pincode",
                                            "billin_city"
                                          );
                                          setpincode_error2(false);
                                          setby_pincode(true);
                                        }
                                      }
                                    }}
                                    value={billing_pincode}
                                    invalid={pincode_error2}
                                    type="number"
                                    className="form-control-md"
                                    id="input"
                                    name="pincode1"
                                    placeholder="Enter Pin code"
                                  />

                                  {pincode_loaded === false &&
                                    pincode_error === true ? (
                                    <div
                                      className="mt-1 error-text"
                                      color="danger"
                                    >
                                      {pincode_error2
                                        ? "Please Add PinCode"
                                        : null}
                                    </div>
                                  ) : null}

                                  {pincode_loaded === false &&
                                    pincode_error === false &&
                                    pincode_error2 === true ? (
                                    <div
                                      style={{
                                        color: "#F46E6E",
                                        fontSize: "10.4px",
                                        marginTop: "4px",
                                      }}
                                    >
                                      pincode should 6 digit
                                    </div>
                                  ) : null}
                                </div>
                              )}
                            </Col>
                          )}
                          {same_as_billing_add ? (
                            <Col lg={4} md={6} sm={6}>
                              <div className="mb-2">
                                <Label className="header-child">Locality*</Label>
                                <Input
                                  value={billing_locality}
                                  type="text"
                                  className="form-control-md"
                                  id="input"
                                  disabled
                                />
                              </div>
                            </Col>
                          ) : (
                            <Col lg={4} md={6} sm={6}>
                              {billing_pincode_loaded && (
                                <div className="mb-2">
                                  <Label className="header-child">
                                    Locality*:
                                  </Label>
                                  <SearchInput
                                    data_list={billing_locality_list}
                                    setdata_list={setbilling_locality_list}
                                    data_item_s={billing_locality}
                                    set_data_item_s={setbilling_locality}
                                    set_id={setbilling_locality_id}
                                    page={billing_locality_page}
                                    setpage={setbilling_locality_page}
                                    setsearch_item={
                                      setbilling_locality_search_item
                                    }
                                    error_message={"Select locality"}
                                    error_s={local_err2}
                                    loaded={loaded_billing_locality}
                                    count={billing_locality_count}
                                    bottom={billing_locality_bottom}
                                    setbottom={setbilling_locality_bottom}
                                  />
                                </div>
                              )}
                            </Col>
                          )}
                        </Row>
                      ) : null}
                    </Row>
                  </CardBody>
                ) : null}
              </Card>
            </Col>
          </div>

          {/*Employee info*/}
          <div className="m-3" id="section2">
            <Col lg={12}>
              <Card className="shadow bg-white rounded">
                <CardTitle className="mb-1 header">
                  <div className="header-text-icon header-text">
                    Contact Person Info
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
                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-2">
                          <Label className="header-child">
                            Contact Person:*{" "}
                          </Label>
                          <Input
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.contact_person_name || ""}
                            invalid={
                              validation.touched.contact_person_name &&
                                validation.errors.contact_person_name
                                ? true
                                : false
                            }
                            type="text"
                            className="form-control-md"
                            id="input"
                            name="contact_person_name"
                            placeholder="Enter Name"
                          />
                          {validation.touched.contact_person_name &&
                            validation.errors.contact_person_name ? (
                            <FormFeedback type="invalid">
                              {validation.errors.contact_person_name}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>

                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-2">
                          <Label className="header-child">
                            Contact Person Email*:
                          </Label>
                          <Input
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.contact_person_email || ""}
                            invalid={
                              validation.touched.contact_person_email &&
                                validation.errors.contact_person_email
                                ? true
                                : false
                            }
                            type="email"
                            className="form-control-md"
                            id="input"
                            name="contact_person_email"
                            placeholder="Enter Email"
                          />
                          {validation.touched.contact_person_email &&
                            validation.errors.contact_person_email ? (
                            <FormFeedback type="invalid">
                              {validation.errors.contact_person_email}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>

                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-2">
                          <Label className="header-child">
                            Contact Person Phone Number*:
                          </Label>
                          <Input
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.contact_person_ph_no || ""}
                            invalid={
                              validation.touched.contact_person_ph_no &&
                                validation.errors.contact_person_ph_no
                                ? true
                                : false
                            }
                            type="number"
                            min={0}
                            className="form-control-md"
                            id="input"
                            name="contact_person_ph_no"
                            placeholder="Enter Phone Number"
                          />
                          {validation.touched.contact_person_ph_no &&
                            validation.errors.contact_person_ph_no ? (
                            <FormFeedback type="invalid">
                              {validation.errors.contact_person_ph_no}
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

          {/* Dispription */}
          <div className="m-3">
            <Col lg={12}>
              <Card className="shadow bg-white rounded">
                <CardTitle className="mb-1 header">
                  <div className="header-text-icon header-text">
                    Description
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
                </CardTitle>
                {circle_btn4 ? (
                  <CardBody>
                    <Row>
                      <Col>
                        <div className="mb-2">
                          <Label className="header-child">Description:</Label>
                          <br />
                          <textarea
                            style={{
                              width: "700px",
                              height: "200px",
                              borderRadius: "8px",
                            }}
                            type="text"
                            cols="20"
                            wrap="hard"
                            maxLength="200"
                            rows="1"
                            max-rows="3"
                            value={descripation}
                            onChange={(val) => {
                              setdescripation(val.target.value);
                            }}
                          />
                        </div>
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
                <Button
                  type="submit"
                  name="submit"
                  className="btn btn-info m-1 cu_btn"
                >
                  {isupdating ? "Update" : "Save"}
                </Button>

                <Button
                  type="button"
                  className="btn btn-info m-1 cu_btn"
                  onClick={() => {
                    navigate(-1);
                  }}
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

export default AddOrganization;
