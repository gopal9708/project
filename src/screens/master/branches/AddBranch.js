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
  FormGroup,
} from "reactstrap";
import { IconContext } from "react-icons";
import { MdAddCircleOutline, MdRemoveCircleOutline } from "react-icons/md";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import toTitleCase from "../../../lib/titleCase/TitleCase";
import SearchInput from "../../../components/formComponent/searchInput/SearchInput";
import TransferList from "../../../components/formComponent/transferList/TransferList";
import { ServerAddress } from "../../../constants/ServerAddress";
import {
  setAlertType,
  setDataExist,
  setShowAlert,
} from "../../../store/alert/Alert";
import PageTitle from "../../../components/pageTitle/PageTitle";
import Title from "../../../components/title/Title";
import { setToggle } from "../../../store/pagination/Pagination";
import NSearchInput from "../../../components/formComponent/nsearchInput/NSearchInput";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

const AddBranch = () => {
  //Redux State
  const user = useSelector((state) => state.authentication.userdetails);
  const accessToken = useSelector((state) => state.authentication.access_token);

  const dispatch = useDispatch();
  const location_data = useLocation();
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

  const [branchName, setBranchName] = useState('');
  console.log("branchName====", branchName)
  // Branch Type
  const [branch_type, setbranch_type] = useState("");
  const [branch_type_list, setbranch_type_list] = useState([
    ["OB", "Own Branch"],
    ["VR", "Vendor"],
  ]);
  const [branch_type_short, setbranch_type_short] = useState("");

  // Vendor
  const [vendor_list, setvendor_list] = useState([]);
  const [vendor_name, setvendor_name] = useState("");
  const [vendor_id, setvendor_id] = useState("");
  const [vendor_n_page, setvendor_n_page] = useState(1);
  const [search_vendor_name, setsearch_vendor_name] = useState("");


  //GST LIST
  //When brach is own
  const [gst_number, setgst_number] = useState("");
  const [gst_search, setgst_search] = useState("");
  const [gst_id, setgst_id] = useState("");
  const [gst_data_list, setgst_data_list] = useState([]);
  const [select_gst, setselect_gst] = useState("");
  const [toggst, settoggst] = useState(false)
  const [select_gst_error, setselect_gst_error] = useState(false);
  const [gst_list, setgst_list] = useState([]);
  const [selectgst_search, setselectgst_search] = useState("");
  const [selectgst_id, setselectgst_id] = useState(0);
  const [gst_loaded, setgst_loaded] = useState(false)
  const [gst_count, setgst_count] = useState(1)
  const [gst_bottom, setgst_bottom] = useState(103)
  const [gst_page, setgst_page] = useState(1)

  const [vendor_gst_page, setvendor_gst_page] = useState(1)
  const [vendor_gst_loaded, setvendor_gst_loaded] = useState(false)
  const [vendor_gst_count, setvendor_gst_count] = useState(1)
  const [vendor_gst_bottom, setvendor_gst_bottom] = useState(103)

  const [org_list_s, setorg_list_s] = useState([])
  const [org, setorg] = useState("")
  const [org_id, setorg_id] = useState(null)
  const [org_page, setorg_page] = useState(1)
  const [org_error, setorg_error] = useState(false)
  const [org_search_item, setorg_search_item] = useState("")
  const [org_loaded, setorg_loaded] = useState(false)
  const [org_count, setorg_count] = useState(1)
  const [org_bottom, setorg_bottom] = useState(103)

  // Location Info

  const [city_bottom, setcity_bottom] = useState(103)
  const [state_bottom, setstate_bottom] = useState(103)
  const [pincode_bottom, setpincode_bottom] = useState(103)
  const [locality_bottom, setlocality_bottom] = useState(103)

  const [state_list_s, setstate_list_s] = useState([]);
  const [state, setstate] = useState("");
  const [state_id, setstate_id] = useState(0);
  const [state_error, setstate_error] = useState(false);
  const [state_page, setstate_page] = useState(1);
  const [state_search_item, setstate_search_item] = useState("");
  const [state_loaded, setstate_loaded] = useState(false);
  const [state_count, setstate_count] = useState(1);
  const [togstate, settogstate] = useState(false)
  console.log("togstate----", togstate)

  const [city_list_s, setcity_list_s] = useState([]);
  const [city, setcity] = useState("");
  const [city_id, setcity_id] = useState(0);
  const [city_error, setcity_error] = useState(false);
  const [city_page, setcity_page] = useState(1);
  const [city_search_item, setcity_search_item] = useState("");
  const [city_loaded, setcity_loaded] = useState(false);
  const [city_count, setcity_count] = useState(1);
  const [togcity, settogcity] = useState(false)
  console.log("togcity----", togcity)

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
  const [load_pincode, setload_pincode] = useState(false);
  const [pincode_count, setpincode_count] = useState(1);
  const [togpincode, settogpincode] = useState(false);

  const [pincode_list_error, setpincode_list_error] = useState(false);

  const [locality, setlocality] = useState("");
  const [locality_list_s, setlocality_list_s] = useState([]);
  const [locality_page, setlocality_page] = useState(1);
  const [locality_search_item, setlocality_search_item] = useState("");
  const [locality_id, setlocality_id] = useState(0);
  const [locality_error, setlocality_error] = useState(false);
  const [locality_loaded, setlocality_loaded] = useState(false)
  const [locality_count, setlocality_count] = useState(1)
  //If address is same as gst
  const [same_as_gst, setsame_as_gst] = useState(false);
  const [gst_txt, setgst_txt] = useState("")
  const [select_gst_txt, setselect_gst_txt] = useState("")

  //get State wise operating city
  const [get_state_wise_op, setget_state_wise_op] = useState(false);

  // Operatinf City
  const [operating_city_list, setoperating_city_list] = useState([]);
  const [operating_city_list2, setoperating_city_list2] = useState([]);

  const [op_city_page, setop_city_page] = useState(1);
  const [search_op_city, setsearch_op_city] = useState("");
  const [operating_city_loaded, setoperating_city_loaded] = useState(false);
  const [operating_city_count, setoperating_city_count] = useState(1);
  const [operating_city_bottom, setoperating_city_bottom] = useState(56)
  // Error State
  const [branch_type_error, setbranch_type_error] = useState(false);
  const [vendor_error, setvendor_error] = useState(false);
  const [own_gst_error, setown_gst_error] = useState(false);
  const [own_pan_error, setown_pan_error] = useState(false);
  const [vendor_loaded, setvendor_loaded] = useState(false);
  const [vendor_count, setvendor_count] = useState(1);
  const [vendor_bottom, setvendor_bottom] = useState(103)
  const [logistic_partner_error, setlogistic_partner_error] = useState(false);
  const [operating_city_error, setoperating_city_error] = useState(false);

  const [own_pan_number, setown_pan_number] = useState("");

  const [address_line, setaddress_line] = useState("");
  const [address_line_err, setaddress_line_err] = useState(false);
  const [isupdating, setisupdating] = useState(false);
  // Save an add button
  const [save_clickd, setsave_clickd] = useState(false);
  const [add_another_clickd, setadd_another_clickd] = useState(false);
  //Get Updated Location Data
  const [branch, setbranch] = useState([]);
  const [refresh, setrefresh] = useState(false);
  const [gstaddress, setgstaddress] = useState("");
  // Validation
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      // branch_name: toTitleCase(branch.name) || "",
      branch_email: branch.email || "",
      branch_phone_number: branch.contact_number || "",
      address_line_1: toTitleCase(branch.address_line_1) || "",
      branch_head: toTitleCase(branch.head) || "",
      branch_head_email: branch.head_email || "",
      branch_head_phone_number: branch.head_phone_number || "",
    },

    validationSchema: Yup.object({
      // branch_name: Yup.string().required("Branch name is required"),
      branch_email: Yup.string()
        .email("Invalid email format")
        .required("Branch Email is required"),
      branch_phone_number: Yup.string()
        .min(10, "Branch Phone Number must be at least 10")
        .max(10, "Branch Phone Number must be at most 10")
        .required("Branch Phone number is required"),

      // address_line_1: Yup.string().required("Address Line 1 is required"),
      branch_head: Yup.string().required("Branch head name is required"),
      branch_head_email: Yup.string()
        .email("Invalid email format")
        .required("Branch Head Email is required"),
      branch_head_phone_number: Yup.string()
        .min(10, "Branch Head Phone Number must be at least 10")
        .max(10, "Branch Head Phone Number must be at most 10")
        .required("Branch Head Phone Number is required"),
    }),

    onSubmit: (values) => {
      let shaw = Object.entries(validation.values);
      let filter_value = shaw.filter((v) => v[1] == "" || v[1] == 0);
      let map_value = filter_value.map((m) => m[0]);
      let all_value = map_value[0];

      let fields = ["branch_email", "branch_phone_number"];

      if (branch_type === "") {
        setbranch_type_error(true);
        document.getElementById("branch_info").scrollIntoView();
      }
      else if (branch_type === "Vendor" && vendor_name === "") {
        setvendor_error(true);
        document.getElementById("branch_info").scrollIntoView();
      }
      else if (branchName?.split("-")[1] === "" || !branchName) {
        setbranch_blur(true)
        document.getElementById("branch_info").scrollIntoView();
      }
      else if (branch_type === "Own Branch" && org === "") {
        setorg_error(true);
        document.getElementById("branch_info").scrollIntoView();
      }
      else if (fields.includes(all_value)) {
        document.getElementById("branch_info").scrollIntoView();
      }
      else if (branch_type === "Vendor" && select_gst === "" && vendor_pan_no) {
        setselect_gst_error(true);
        document.getElementById("branch_info").scrollIntoView();
      }
      else if (branch_type === "Own Branch" && own_pan_number == "") {
        setown_pan_error(true);
        document.getElementById("branch_info").scrollIntoView();
      }
      else if (branch_type === "Own Branch" && gst_number === "") {
        setown_gst_error(true);
        document.getElementById("branch_info").scrollIntoView();
      }
      else if (address_line === "") {
        setaddress_line_err(true);
        document.getElementById("location_info").scrollIntoView();
      }
      else if (state === "") {
        setstate_error(true);
        document.getElementById("location_info").scrollIntoView();
      }
      else if (city === "") {
        setcity_error(true);
        document.getElementById("location_info").scrollIntoView();
      }
      else if (pincode_loaded && pincode === "") {
        setpincode_list_error(true);
        document.getElementById("location_info").scrollIntoView();
      }
      else if (pincode_loaded === false && pincode === "") {
        setpincode_error(true);
        document.getElementById("location_info").scrollIntoView();
      }
      else if (pincode_loaded && locality === "") {
        setlocality_error(true);
        document.getElementById("location_info").scrollIntoView();
      }
      else if (operating_city_list2.length === 0) {
        setoperating_city_error(true);
        document.getElementById("operating_city").scrollIntoView();
      }
      else {
        isupdating ? update_branch(values) : send_branch_data(values);
      }
    },
  });

  const [vendor_data, setvendor_data] = useState([]);
  const [vendor_pan_no, setvendor_pan_no] = useState("");

  // Get vendor
  const get_vendor = async () => {
    let vendor_temp = [];
    let data = [];
    try {
      const response = await axios.get(
        ServerAddress +
        `master/all_vendor/?search=${""}&p=${vendor_n_page}&records=${10}&name_search=${search_vendor_name}&vendor_name=&data=all`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      data = response.data.results;
      setvendor_data(data);
      if (response.data.results.length > 0) {
        if (response.data.next === null) {
          setvendor_loaded(false);
        } else {
          setvendor_loaded(true);
        }
        if (vendor_n_page == 1) {
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
      setvendor_count(vendor_count + 2);
      setvendor_list(vendor_temp);
    } catch (error) {
      alert(`Error Occur in Get , ${error}`);
    }
  };

  //post Branch using async and await
  const send_branch_data = async (values) => {
    const buttonType = window.event.submitter.name;
    let op_city_id = operating_city_list2.map((v) => v[0]);

    let op_city_id_list = [...new Set(op_city_id.map((v) => `${v}`))].map((v) =>
      parseInt(v.split(","))
    );

    try {
      const response = await axios.post(
        ServerAddress + "master/add_branch/",
        {
          name: toTitleCase(branchName).toUpperCase(),
          type: branch_type_short,
          // organization: branch_type === "Own Branch" ? org_id : null,
          organization: org_id,
          vendor: branch_type === "Own Branch" ? "" : vendor_id,
          email: values.branch_email,
          contact_number: values.branch_phone_number,
          head: toTitleCase(values.branch_head).toUpperCase(),
          head_email: values.branch_head_email,
          head_phone_number: values.branch_head_phone_number,
          pan_no:
            branch_type === "Own Branch"
              ? toTitleCase(own_pan_number).toUpperCase()
              : toTitleCase(vendor_pan_no).toUpperCase(),
          gst_no:
            branch_type === "Own Branch"
              ? toTitleCase(gst_txt).toUpperCase()
              : toTitleCase(select_gst_txt).toUpperCase(),
          created_by: user.id,
          address_line_1: toTitleCase(address_line).toUpperCase(),
          pincode: pincode_id,
          location: locality_id,
          operating_city: op_city_id_list,
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
        dispatch(
          setDataExist(`New Branch "${branchName}" Added Sucessfully`)
        );
        dispatch(setAlertType("success"));
        dispatch(setShowAlert(true));
        if (buttonType === "save_add") {
          setrefresh(!refresh);
          setpincode_loaded(false);
          setbranch_type("");
          // setoperating_city_list2([]);
          setstate("");
          setcity("");
          setpincode("");
          setsame_as_gst(false)
          setoperating_city_list2([])
          // validation.values.branch_name = "";
          setBranchName("")
          setaddress_line("")
          validation.values.branch_email = "";
          validation.values.branch_phone_number = "";
          validation.values.address_line_1 = "";
          validation.values.gst_number = "";
          validation.values.branch_head = "";
          validation.values.branch_head_email = "";
          validation.values.branch_head_phone_number = "";
        } else {
          navigate("/master/branches");
        }
      } else if (response.data === "duplicate") {
        dispatch(setShowAlert(true));
        dispatch(
          setDataExist(
            `Branch Name "${toTitleCase(branchName)}" already exists`
          )
        );
        dispatch(setAlertType("warning"));
      }
    } catch (error) {
      alert(`Error Happen while posting Braches Data ${error}`);
    }
  };

  //update branch with async and await
  const update_branch = async (values) => {
    let id = branch.id;
    let op_city_id_list = operating_city_list2.map((v) => v[0]).filter((v) => v !== null);

    let opcity_ids = [...new Set(op_city_id_list.map((v) => `${v}`))].map((v) =>
      parseInt(v.split(","))
    );

    let fields_names = Object.entries({
      address_line_1: values.address_line_1,
      city_name: city,
      contact_number: values.branch_phone_number,
      email: values.branch_email,
      gst_no:
        branch_type === "Own Branch" ? gst_number.toUpperCase() : select_gst,
      head: values.branch_head,
      head_email: values.branch_head_email,
      head_phone_number: values.branch_head_phone_number,
      locality_name: locality,
      name: branchName,
      operating_city: opcity_ids,
      organization_name: org,
      pan_no:
        branch_type === "Own Branch"
          ? own_pan_number.toUpperCase()
          : vendor_pan_no,
      pincode_name: pincode,
      state_name: state,
      type: branch_type_short,
      vendor_name: vendor_name,
    });

    let change_fields = {};


    for (let j = 0; j < fields_names.length; j++) {
      const ele = fields_names[j];
      let prev = location_data.state.branch[`${ele[0]}`];
      let new_v = ele[1];
      if (String(prev).toUpperCase() != String(new_v).toUpperCase()) {
        change_fields[`${ele[0]}`] = new_v.toString().toUpperCase();
      }
    }

    try {
      const response = await axios.put(
        ServerAddress + "master/update_branch/" + id,
        {
          name: toTitleCase(branchName).toUpperCase(),
          type: branch_type_short,
          // organization: branch_type === "Own Branch" ? org_id : null,
          organization: org_id,
          vendor: branch_type === "Own Branch" ? "" : vendor_id,
          email: values.branch_email,
          contact_number: values.branch_phone_number,
          head: toTitleCase(values.branch_head).toUpperCase(),
          head_email: values.branch_head_email,
          head_phone_number: values.branch_head_phone_number,
          pan_no:
            branch_type === "Own Branch"
              ? toTitleCase(own_pan_number).toUpperCase()
              : toTitleCase(vendor_pan_no).toUpperCase(),
          gst_no:
            branch_type === "Own Branch"
              ? toTitleCase(gst_txt).toUpperCase()
              : toTitleCase(select_gst_txt).toUpperCase(),
          address_line_1: toTitleCase(address_line).toUpperCase(),
          pincode: pincode_id,
          location: locality_id,
          operating_city: opcity_ids,
          modified_by: user.id,
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
        dispatch(
          setDataExist(`Branch "${branchName}" Updated Sucessfully`)
        );
        dispatch(setAlertType("info"));
        dispatch(setShowAlert(true));
        navigate("/master/branches");
      } else if (response.data === "duplicate") {
        dispatch(setShowAlert(true));
        dispatch(
          setDataExist(
            `Branch Name "${toTitleCase(branchName)}" already exists`
          )
        );
        dispatch(setAlertType("warning"));
      }
    } catch (error) {
      alert("Error Error While Updateing branches");
    }
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
        setstate_count(state_count + 2);
        setstate_list_s(state_list);
      }
      else {
        setstate_list_s([])
      }
    } catch (err) {
      console.warn(`Error Occur in Get States, ${err}`);
    }
  };

  useLayoutEffect(() => {
    if (get_state_wise_op && state) {
      setoperating_city_list([])
    }
  }, [get_state_wise_op, state])

  console.log("operating_city_list---", operating_city_list)

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
      settogcity(true);
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
          // if (get_state_wise_op) {
          //   setoperating_city_list(cities_list);
          // }
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

  // to get operating citys

  const getop_cities = (place_id, filter_by, val) => {
    let temp_2 = [];
    let temp = [];
    axios
      .get(
        ServerAddress +
        `master/all_branches_opcity/?search=${""}&p=${op_city_page}&records=${20}&city_search=${search_op_city}&place_id=${place_id}&filter_by=${filter_by}&data=${val}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        temp = response.data.results;
        console.log("temp-----", temp)
        if (temp.length > 0) {
          if (response.data.next === null) {
            setoperating_city_loaded(false);
          } else {
            setoperating_city_loaded(true);
          }
          if (op_city_page === 1) {
            temp_2 = response.data.results.map((v) => [
              v.id,
              toTitleCase(v.city),
            ]);
          } else {
            temp_2 = [
              ...operating_city_list,
              ...response.data.results.map((v) => [
                v.id,
                toTitleCase(v.city),
              ]),
            ];
          }

          setoperating_city_count(operating_city_count + 2);
          setoperating_city_list(temp_2);
        }
        else {
          setoperating_city_list([])
        }
      });
  };

  // const getop_cities = (place_id, filter_by) => {
  //   let temp_2 = [];
  //   let temp = [...operating_city_list];
  //   axios
  //     .get(
  //       ServerAddress +
  //       `master/all_cities/?search=${""}&p=${op_city_page}&records=${20}&city_search=${search_op_city}&place_id=${place_id}&filter_by=${filter_by}`,
  //       {
  //         headers: { Authorization: `Bearer ${accessToken}` },
  //       }
  //     )
  //     .then((response) => {
  //       temp = response.data.results;
  //       if (temp.length > 0) {
  //         if (response.data.next === null) {
  //           setoperating_city_loaded(false);
  //         } else {
  //           setoperating_city_loaded(true);
  //         }
  //         if (op_city_page === 1) {
  //           temp_2 = response.data.results.map((v) => [
  //             v.id,
  //             toTitleCase(v.city),
  //           ]);
  //         } else {
  //           temp_2 = [
  //             ...operating_city_list,
  //             ...response.data.results.map((v) => [
  //               v.id,
  //               toTitleCase(v.city),
  //             ]),
  //           ];
  //         }

  //         setoperating_city_count(operating_city_count + 2);
  //         setoperating_city_list(temp_2);
  //       }
  //       else {
  //         setoperating_city_list([])
  //       }
  //     });
  // };

  const get_OpCitiesDetails = (id) => {

    let opcity_temp = [];
    let data = [];
    axios
      .get(
        ServerAddress +
        `master/get_branch_operating_cities/?branch_id=${id}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        data = response.data.oper_cities;

        if (data.length > 0) {
          opcity_temp = data.map((v) => [v.operating_city, toTitleCase(v.operating_city__city)]);
          setoperating_city_list2(opcity_temp)
        }
      })
      .catch((err) => {
        alert(`Error Occur in Get OpCity, ${err}`);
      });
  };


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

      settogpincode(true)

      if (resp.data.next === null) {
        setload_pincode(false);
      } else {
        setload_pincode(true);
      }

      if (filter_by !== "pincode") {
        if (pincode_page === 1) {
          pincode_list = resp.data.results.map((v) => [v.id, v.pincode]);
        } else {
          pincode_list = [
            ...pincode_list_s,
            ...resp.data.results.map((v) => [v.id, v.pincode]),
          ];
        }
        setpincode_count(pincode_count + 2);
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
        setstate(toTitleCase(resp.data.results[0].state_name));
        setstate_id(resp.data.results[0].state);
      }
    } catch (err) {
      alert(`Error Occur in Get Pincode, ${err}`);
    }
  };
  console.log("location_data=====", location_data)
  // get locality
  const getLocality = async (place_id, filter_by) => {
    try {
      let locality_list = [];
      const resp = await axios.get(
        ServerAddress +
        `master/all_locality/?search=${""}&p=${locality_page}&records=${10}&place_id=${place_id}&filter_by=${filter_by}&name_search=${locality_search_item}&state=&city=&name=&data=all`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      if (resp.data.next === null) {
        setlocality_loaded(false);
      } else {
        setlocality_loaded(true);
      }
      if (resp.data.results.length > 0) {
        if (locality_page === 1) {
          locality_list = resp.data.results.map((v) => [
            v.id,
            toTitleCase(v.name),
          ]);
        }
        else {
          locality_list = [
            ...locality_list_s,
            ...resp.data.results.map((v) => [v.id, toTitleCase(v.name)]),
          ];
        }

        setlocality_count(locality_count + 2);
        setlocality_list_s(locality_list);
      }
      else {
        setlocality_list_s([]);
      }
    } catch (err) {
      console.warn(`Error Occur in Get Locality, ${err}`);
    }
  };

  const getOrganization = async () => {
    let orgs_list = [];
    try {
      const resp = await axios.get(
        ServerAddress +
        `organization/get_organization/?search=${""}&p=${org_page}&records=${10}&name=${[]}&organization_search=${org_search_item}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      if (resp.data.next === null) {
        setorg_loaded(false);
      } else {
        setorg_loaded(true);
      }

      if (resp.data.results.length > 0) {
        if (org_page === 1) {
          orgs_list = resp.data.results.map((v) => [
            v.id,
            toTitleCase(v.name),
          ]);
        } else {
          orgs_list = [
            ...org_list_s,
            ...resp.data.results.map((v) => [v.id, toTitleCase(v.name)]),
          ];
        }
      }
      setorg_count(org_count + 2);
      setorg_list_s(orgs_list);
    } catch (err) {
      console.warn(`Error Occur in Get States, ${err}`);
    }
  };

  // Navigation At the time of Cancel
  const handleAction = () => {
    dispatch(setToggle(true));
    navigate("/master/branches");
  };

  useLayoutEffect(() => {
    get_vendor();
  }, [vendor_n_page, search_vendor_name, refresh]);
  //this is used to get all operating city

  // Location Functions Call
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
    if (state_id !== 0 && by_pincode === false) {
      timeoutId = setTimeout(() => {
        getCities(state_id, "state");
      }, 1);
    }
    return () => clearTimeout(timeoutId);
  }, [state_id, city_page, city_search_item, get_state_wise_op]);

  useLayoutEffect(() => {
    if (pincode_id !== 0) {
      setlocality_page(1);
      setlocality_count(1);
      setlocality_bottom(103)
      setlocality_loaded(true);
    }
  }, [pincode_id])

  useEffect(() => {
    let timeoutId;
    if (pincode_id !== 0 && pincode_id) {
      timeoutId = setTimeout(() => {
        getLocality(pincode_id, "pincode");
      }, 1);
    }
    return () => clearTimeout(timeoutId);
  }, [pincode_id, locality_page, locality_search_item]);

  useEffect(() => {
    if (branch_type === "Own Branch" && !user.organization_name) {
      getOrganization()
    }
  }, [org_page, org_search_item, branch_type])

  useEffect(() => {
    if (user.organization) {
      setorg(toTitleCase(user.organization_name))
      setorg_id(user.organization)
    }
  }, [user])

  useLayoutEffect(() => {
    if (city_id !== 0) {
      setpincode_page(1);
      setpincode_count(1);
      setpincode_bottom(103)
      setload_pincode(true)
    }
  }, [city_id])

  useLayoutEffect(() => {
    if (state_id !== 0 && get_state_wise_op) {
      setop_city_page(1);
      setoperating_city_count(1);
      setoperating_city_loaded(false)
      setoperating_city_bottom(56)
    }
  }, [state_id, get_state_wise_op])

  useEffect(() => {
    let timeoutId;
    if (city_id !== 0 && by_pincode === false) {
      timeoutId = setTimeout(() => {
        getPincode(city_id, "city");
      }, 1);
    }
    return () => clearTimeout(timeoutId);
  }, [city_id, pincode_page, pincode_search_item]);

  useLayoutEffect(() => {
    getStates();
  }, [state_page, state_search_item, refresh]);

  useEffect(() => {
    if (!get_state_wise_op && location_data.state === null) {
      getop_cities('all', 'all', 'all');
    }
    else if (!get_state_wise_op && location_data.state !== null) {
      getop_cities('all', 'all', parseInt(location_data.state.branch.id));
    }
  }, [get_state_wise_op, op_city_page, search_op_city]);

  useEffect(() => {
    if (get_state_wise_op && location_data.state === null) {
      getop_cities(state_id, "state", 'all');
    }
    else if (get_state_wise_op && location_data.state !== null) {
      getop_cities(state_id, "state", parseInt(location_data.state.branch.id));
    }
  }, [state_id, get_state_wise_op, op_city_page, search_op_city]);


  useEffect(() => {

    if (location_data.state !== null && branch.length !== 0) {
      get_OpCitiesDetails(branch.id)
    }
  }, [branch])


  useEffect(() => {
    if (operating_city_list2.length !== 0) {
      setoperating_city_error(false);
    }
  }, [operating_city_list2, refresh]);

  useEffect(() => {
    if (state) {
      setstate_error(false);
    }
    if (city) {
      setcity_error(false);
    }
  }, [state, city]);

  useLayoutEffect(() => {
    // if (vendor_name != "") {
    //   setvendor_error(false);
    // }
    if (own_pan_number != "") {
      setown_pan_error(false);
    }
    if (address_line !== "") {
      setaddress_line_err(false);
    }
    if (same_as_gst) {
      setaddress_line(gstaddress);
    }
    if (state !== "") {
      setpincode_loaded(true);
    }
  }, [
    // vendor_name,
    address_line,
    gstaddress,
    state,
    // city,
    //  gst_number,
    own_pan_number,
  ]);
  useLayoutEffect(() => {
    try {
      setbranch(location_data.state.branch);
      setisupdating(true);
      setbranch_type_short(location_data.state.branch.type);
      let bnch_type = location_data.state.branch.type;
      setBranchName(location_data.state.branch.name)
      if (bnch_type === "OB") {
        setbranch_type("Own Branch");
        setown_pan_number(location_data.state.branch.pan_no);
        setgst_number(location_data.state.branch.gst_no);
      } else if (bnch_type === "VR") {
        setbranch_type("Vendor");
        setvendor_pan_no(location_data.state.branch.pan_no);
        setselect_gst(location_data.state.branch.gst_no);
      }
      setorg(toTitleCase(location_data.state.branch.organization_name))
      setorg_id(location_data.state.branch.organization)
      setaddress_line(toTitleCase(location_data.state.branch.address_line_1));
      setstate(toTitleCase(location_data.state.branch.state_name));
      setstate_id(location_data.state.branch.state_id);
      setcity_id(location_data.state.branch.city_id);
      setcity(toTitleCase(location_data.state.branch.city_name));
      setpincode(location_data.state.branch.pincode_name);
      setpincode_id(location_data.state.branch.pincode);
      setlocality(toTitleCase(location_data.state.branch.locality_name));
      setlocality_id(location_data.state.branch.location);

      setvendor_name(toTitleCase(location_data.state.branch.vendor_name));
      setvendor_id(location_data.state.branch.vendor);
    } catch (error) { }
  }, []);

  useEffect(() => {
    if (!location_data.state && state && !by_pincode && !same_as_gst) {
      setcity("");
      setcity_list_s([]);
      setpincode("");
      setpincode_list_s([]);
      setlocality("");
      setlocality_list_s([]);
    }
  }, [state]);

  useEffect(() => {
    if (state !== "" && togstate && !same_as_gst && !by_pincode) {
      setcity("");
      setcity_list_s([]);
      setpincode("");
      setpincode_list_s([]);
      setlocality("");
      setlocality_list_s([]);
    }
  }, [state]);

  useEffect(() => {
    if (!location_data.state && city && !by_pincode && !same_as_gst) {
      setpincode("");
      setpincode_list_s([]);
      setlocality("");
      setlocality_list_s([]);
    }
  }, [city]);

  useEffect(() => {
    if (city !== "" && togcity && !same_as_gst) {
      setpincode("");
      setpincode_list_s([]);
      setlocality("");
      setlocality_list_s([]);
    }
  }, [city]);


  useEffect(() => {
    if (pincode !== "" && togpincode && !same_as_gst) {
      setlocality("");
      setlocality_list_s([]);
    }
  }, [pincode]);

  useEffect(() => {
    if (!location_data.state && pincode && !by_pincode && !same_as_gst) {
      setlocality("");
      setlocality_list_s([]);
    }
  }, [pincode]);

  useEffect(() => {
    if (isupdating) {
      settogstate(false);
      settogcity(false);
      settogpincode(false)
    }
  }, []);


  const [gst_alldetails, setgst_alldetails] = useState([]);
  const [vendoegst_alldetails, setvendoegst_alldetails] = useState([]);
  const get_gstDetails = () => {
    let gst_temp = [];
    let data = [];
    axios
      .get(
        ServerAddress +
        `organization/get_gstaddress/?type=${`ORGANIZATION`}&vendor_id=&organization_id=${branch_type === "Own Branch" ? org_id : ""}&search=${""}&p=${gst_page}&records=${10}&gst_no_search=${[
          gst_search,
        ]}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        data = response.data.results;
        settoggst(true);
        if (response.data.results.length > 0) {
          if (response.data.next === null) {
            setgst_loaded(false);
          } else {
            setgst_loaded(true);
          }
          if (gst_page === 1) {
            gst_temp = response.data.results.map((v) => [
              v.id,
              v.gst_no
              + (v.is_active ? "-" + "H.O" : "")
            ]);
          } else {
            gst_temp = [
              ...gst_data_list,
              ...response.data.results.map((v) => [v.id, v.gst_no + (v.is_active ? "-" + "H.O" : "")]),
            ];
          }

          setgst_alldetails(data);
          let pan_no = response.data.results[0].organization_pan_no;
          setown_pan_number(pan_no);
        }
        setgst_count(gst_count + 2);
        setgst_data_list(gst_temp);
      })
      .catch((err) => {
        alert(`Error Occur in Get , ${err}`);
      });
  };

  const get_vendorgstDetails = async (id) => {
    try {
      let vgst_temp = [];
      let data = [];

      const response = await axios.get(
        ServerAddress +
        `organization/get_gstaddress/?type=${`VENDOR`}&vendor_id=${id}&organization_id=&search=${""}&p=${vendor_gst_page}&records=${10}&gst_no_search=${[
          selectgst_search,
        ]}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      data = response.data.results;
      console.log("data----", data)
      if (response.data.results.length > 0) {

        if (response.data.next === null) {
          setvendor_gst_loaded(false);
        } else {
          setvendor_gst_loaded(true);
        }

        setvendoegst_alldetails(data);
        let pan_no = response.data.results[0].vandor_pan_no;
        setvendor_pan_no(pan_no);

        if (vendor_gst_page === 1) {
          vgst_temp = response.data.results.map((v) => [
            v.id,
            v.gst_no + (v.is_active ? "-" + "H.O" : "")
          ]);
        } else {
          vgst_temp = [
            ...gst_list,
            ...response.data.results.map((v) => [v.id, v.gst_no + (v.is_active ? "-" + "H.O" : "")]),
          ];
        }
      }
      else{
        setvendor_pan_no("");
      }
      setvendor_gst_count(vendor_gst_count + 2);
      setgst_list(vgst_temp);
    } catch (err) {
      alert(`Error Occur in Get, ${err}`);
    }
  };

  useEffect(() => {
    if (org_id !== null && branch_type === "Own Branch") {
      get_gstDetails();
    }
  }, [org_id, gst_page, gst_search, branch_type]);

  useEffect(() => {
    if (vendor_id !== null && vendor_id !== "") {
      get_vendorgstDetails(vendor_id);
    }
    if (vendor_id !== null && !location_data.state) {
      setselect_gst("");
    }
  }, [selectgst_search, vendor_id, isupdating, vendor_gst_page]);

  useEffect(() => {
    let selected_gst = [];
    if (gst_id !== "" && branch_type === "Own Branch") {
      selected_gst = gst_alldetails.filter((value) => value.id === gst_id);
    }
    if (selectgst_id !== "" && branch_type === "Vendor") {
      selected_gst = vendoegst_alldetails.filter(
        (value) => value.id === selectgst_id
      );
    }
    if (same_as_gst && selected_gst.length !== 0) {
      setgstaddress(toTitleCase(selected_gst[0].address));
      setstate(toTitleCase(selected_gst[0].state_name));
      setstate_id(selected_gst[0].state);
      setcity(toTitleCase(selected_gst[0].city_name));
      setcity_id(selected_gst[0].city_id);
      setpincode(toTitleCase(selected_gst[0].pincode_name));
      setpincode_id(selected_gst[0].pincode);
      setlocality(toTitleCase(selected_gst[0].location_name));
      setlocality_id(selected_gst[0].location);
    } else if (!same_as_gst && !location_data.state) {
      setaddress_line("")
      setstate("");
      setgstaddress("");
      setcity("");
      setpincode("");
      setlocality("");
    }
  }, [gst_id, same_as_gst, selectgst_id]);

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

  const update_commoditystatus = (id) => {
    axios
      .put(
        ServerAddress + "master/update_branch/" + id,
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
          navigate("/master/branches");
        }
      })
      .catch(function (err) {
        alert(`rror While  Updateing Coloader ${err}`);
      });
  };

  const handleSubmit = () => {
    if (message == "") {
      setmessage_error(true);
    } else {
      update_commoditystatus(branch.id);
      setShow(false);
    }
  };

  const handlClk = () => {
    navigate("/master/branches/branchHistory/BranchHistoryPage", {
      state: { Branch: branch },
    });
  };

  useEffect(() => {
    if (vendor_name !== "" && toggst) {
      setselect_gst("")
    }
  }, [vendor_name])

  useEffect(() => {
    if (!location_data.state && vendor_name) {
      setselect_gst("")
    }
  }, [vendor_name])

  useEffect(() => {
    if (org !== "" && toggst) {
      setgst_number("")
    }
  }, [org])

  useEffect(() => {
    if (!location_data.state && org) {
      setgst_number("")
    }
  }, [org])

  useEffect(() => {
    let gst_data = ""
    if (gst_number.endsWith("-H.O")) {
      gst_data = gst_number.slice(0, -4); // Remove the last 4 characters ("-H.O")
      setgst_txt(gst_data)
    }
    else {
      gst_data = gst_number
      setgst_txt(gst_data)
    }

    let vendor_gstdata = ""
    if (select_gst.endsWith("-H.O")) {
      vendor_gstdata = select_gst.slice(0, -4);
      setselect_gst_txt(vendor_gstdata)
    }
    else {
      vendor_gstdata = select_gst
      setselect_gst_txt(vendor_gstdata)
    }
  }, [gst_number, select_gst])

  // useEffect(() => {
  //   console.log("validation.values.branch_name===", validation.values.branch_name)
  //   console.log(" user.organization_alias===", user.organization_alias?.length)
  //   let len = user.organization_alias?.length
  //   console.log("len====", len)
  //   let val = validation.values.branch_name.substring(0, len)
  //   console.log("val=====", val)
  //   setbranch_alias(val)
  // }, [validation, user])

  const [branch_blur, setbranch_blur] = useState(false)

  const handleChange = (event) => {
    const { value } = event.target;

    // Ensure that the first three characters are always "QIL"
    let len = user.organization_alias?.length
    if (user.organization_alias) {
      if (value.substring(0, len) === user.organization_alias + "-") {
        setBranchName(value);
      } else {
        setBranchName(user.organization_alias + "-" + value.substring(len + 1));
      }
    }
    else {
      setBranchName(value)
    }

  };

  const handleBlur = () => {
    if (branchName?.split("-")[1] === "" || !branchName) {
      setbranch_blur(true)
    }
  };

  useEffect(() => {
    if (branchName?.split("-")[1] !== "" && branchName) {
      setbranch_blur(false)
    }
  }, [branchName])

  return (
    <>
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
            let shaw = Object.entries(validation.values);
            let filter_value = shaw.filter((v) => v[1] == "" || v[1] == 0);
            let map_value = filter_value.map((m) => m[0]);
            let all_value = map_value[0];

            let fields = ["branch_email", "branch_phone_number"];

            if (branch_type === "") {
              setbranch_type_error(true);
              document.getElementById("branch_info").scrollIntoView();
            }
            else if (branch_type === "Vendor" && vendor_name === "") {
              setvendor_error(true);
              document.getElementById("branch_info").scrollIntoView();
            }
            else if (branch_type === "Own Branch" && org === "") {
              setorg_error(true);
              document.getElementById("branch_info").scrollIntoView();
            }
            else if (fields.includes(all_value)) {
              document.getElementById("branch_info").scrollIntoView();
            }
            // else if (branch_type === "Vendor" && select_gst === "") {
            //   setselect_gst_error(true);
            //   document.getElementById("branch_info").scrollIntoView();
            // }
            else if (branch_type === "Own Branch" && own_pan_number == "") {
              setown_pan_error(true);
              document.getElementById("branch_info").scrollIntoView();
            }
            else if (branch_type === "Own Branch" && gst_number === "") {
              setown_gst_error(true);
              document.getElementById("branch_info").scrollIntoView();
            }
            else if (address_line === "") {
              setaddress_line_err(true);
              document.getElementById("location_info").scrollIntoView();
            }
            else if (state === "") {
              setstate_error(true);
              document.getElementById("location_info").scrollIntoView();
            }
            else if (city === "") {
              setcity_error(true);
              document.getElementById("location_info").scrollIntoView();
            }
            else if (pincode_loaded && pincode === "") {
              setpincode_list_error(true);
              document.getElementById("location_info").scrollIntoView();
            }
            else if (pincode_loaded === false && pincode === "") {
              setpincode_error(true);
              document.getElementById("location_info").scrollIntoView();
            }
            else if (pincode_loaded && locality === "") {
              setlocality_error(true);
              document.getElementById("location_info").scrollIntoView();
            }
            else if (operating_city_list2.length === 0) {
              setoperating_city_error(true);
              document.getElementById("operating_city").scrollIntoView();
            }
            validation.handleSubmit(e.values);

            return false;
          }}
        >
          <div className="mt-3">
            <PageTitle page={isupdating ? "Update Branch" : "Add Branch"} />
            <Title
              title={isupdating ? "Update Branch" : "Add Branch"}
              parent_title="Masters"
            />
          </div>

          {/* Branch Info */}
          <div className="m-3">
            {/* Add For History Button */}
            {isupdating && (
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
            )}
            {/* Add For History Button */}
            <Col lg={12}>
              <Card className="shadow bg-white rounded">
                <CardTitle className="mb-1 header">
                  <div className="header-text-icon header-text">
                    Branch Info
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
                        <div className="mb-2" id="branch_info">
                          <Label className="header-child">Branch Type*</Label>
                          <NSearchInput
                            data_list={branch_type_list}
                            data_item_s={branch_type}
                            set_data_item_s={setbranch_type}
                            set_id={setbranch_type_short}
                            show_search={false}
                            error_message={"Please Select Branch Type"}
                            error_s={branch_type_error}
                          />
                        </div>
                      </Col>

                      {branch_type === "Own Branch" &&
                        <Col lg={4} md={6} sm={6}>
                          <div className="mb-2">
                            <Label className="header-child">Organization*</Label>
                            <SearchInput
                              data_list={org_list_s}
                              setdata_list={setorg_list_s}
                              data_item_s={org}
                              set_data_item_s={setorg}
                              set_id={setorg_id}
                              page={org_page}
                              setpage={setorg_page}
                              error_message={"Please Select Any Organization"}
                              error_s={org_error}
                              search_item={org_search_item}
                              setsearch_item={setorg_search_item}
                              loaded={org_loaded}
                              count={org_count}
                              bottom={org_bottom}
                              setbottom={setorg_bottom}
                              disable_me={user.organization_name}
                            />
                            {/* <div className="mt-1 error-text" color="danger">
                            {state_error ? "Please Select Any State" : null}
                          </div> */}
                          </div>
                        </Col>
                      }

                      {branch_type === "Vendor" && (
                        <Col lg={4} md={6} sm={6}>
                          <div className="mb-2" id="branch_info">
                            <Label className="header-child">
                              Vendor Name *
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
                              loaded={vendor_loaded}
                              count={vendor_count}
                              bottom={vendor_bottom}
                              setbottom={setvendor_bottom}
                            />
                            {/* <div className="mt-1 error-text" color="danger">
                              {vendor_error ? "Please Select Any Vendor" : null}
                            </div> */}
                          </div>
                        </Col>
                      )}

                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-2" id="branch_info">
                          <Label className="header-child">Branch Name*</Label>
                          {/* <Input
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={ validation.values.branch_name.substring(0, 3) !== "QIL" ?  "QIL"+"-"+validation.values.branch_name : validation.values.branch_name || ""}
                            // value={branch_alias !== user?.organization_alias ?  user?.organization_alias +"-"+validation.values.branch_name : validation.values.branch_name || ""}
                            // value={validation.values.branch_name || ""}
                            invalid={
                              validation.touched.branch_name &&
                                validation.errors.branch_name
                                ? true
                                : false
                            }
                            type="text"
                            className="form-control-md"
                            id="input"
                            name="branch_name"
                            placeholder="Enter Branch Name"
                          /> */}
                          <Input
                            onChange={handleChange}
                            onBlur={handleBlur}
                            // value={
                            //   branchName?.substring(0, user.organization_alias?.length) !== user.organization_alias
                            //     ? user.organization_alias+"-" + branchName
                            //     : branchName || ""
                            // }
                            value={user.organization_alias
                              ? branchName?.substring(0, user.organization_alias?.length) !== user.organization_alias
                                ? user.organization_alias + "-" + branchName
                                : branchName || ""
                              : branchName}
                            invalid={
                              branch_blur
                                ? true
                                : false
                            }
                            type="text"
                            className="form-control-md"
                            id="input"
                            name="branch_name"
                            placeholder="Enter Branch Name"
                          />
                          {branch_blur ? (
                            <FormFeedback type="invalid">
                              Branch Name Is Required
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>

                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-2" id="branch_info">
                          <Label className="header-child">Branch Email*</Label>
                          <Input
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.branch_email || ""}
                            invalid={
                              validation.touched.branch_email &&
                                validation.errors.branch_email
                                ? true
                                : false
                            }
                            type="email"
                            className="form-control-md"
                            id="input"
                            name="branch_email"
                            placeholder="Enter Branch Email"
                          />
                          {validation.touched.branch_email &&
                            validation.errors.branch_email ? (
                            <FormFeedback type="invalid">
                              {validation.errors.branch_email}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>

                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-2" id="branch_info">
                          <Label className="header-child">
                            Branch Phone Number*
                          </Label>
                          <Input
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.branch_phone_number || ""}
                            invalid={
                              validation.touched.branch_phone_number &&
                                validation.errors.branch_phone_number
                                ? true
                                : false
                            }
                            type="number"
                            min={0}
                            className="form-control-md"
                            id="input"
                            name="branch_phone_number"
                            placeholder="Enter Branch Phone"
                          />
                          {validation.touched.branch_phone_number &&
                            validation.errors.branch_phone_number ? (
                            <FormFeedback type="invalid">
                              {validation.errors.branch_phone_number}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>

                      {branch_type === "Vendor" && vendor_name !== "" && vendor_pan_no ? (
                        <>
                          <Col lg={4} md={6} sm={6}>
                            <div className="mb-2" id="branch_info">
                              <Label className="header-child">
                                Vendor PAN No*.
                              </Label>
                              <Input
                                className="form-control-md"
                                id="input"
                                value={vendor_pan_no}
                                disabled
                              />
                            </div>
                          </Col>
                          {vendor_pan_no &&
                            <Col lg={4} md={6} sm={6}>
                              <div className="mb-2" id="branch_info">
                                <Label className="header-child">
                                  Vendor GST Number *
                                </Label>
                                <SearchInput
                                  data_list={gst_list}
                                  setdata_list={setgst_list}
                                  data_item_s={select_gst}
                                  set_data_item_s={setselect_gst}
                                  set_id={setselectgst_id}
                                  setsearch_item={setselectgst_search}
                                  error_message={"Please Select Vendor GST No"}
                                  error_s={select_gst_error}
                                  page={vendor_gst_page}
                                  setpage={setvendor_gst_page}
                                  loaded={vendor_gst_loaded}
                                  count={vendor_gst_count}
                                  bottom={vendor_gst_bottom}
                                  setbottom={setvendor_gst_bottom}
                                />
                              </div>
                            </Col>
                          }
                        </>
                      ) : null}

                      {branch_type === "Own Branch" && org !== "" ? (
                        <>
                          <Col lg={4} md={6} sm={6}>
                            <div className="mb-2" id="branch_info">
                              <Label className="header-child">
                                {" "}
                                PAN Number*{" "}
                              </Label>
                              <Input
                                type="text"
                                className="form-control-md"
                                id="input"
                                name="pan_no"
                                value={own_pan_number}
                                disabled
                                placeholder="Enter PAN Number"
                              />
                              <div className="mt-1 error-text" color="danger">
                                {own_pan_error ? "Please Enter PAN No." : null}
                              </div>
                            </div>
                          </Col>

                          <Col lg={4} md={6} sm={6}>
                            <div className="mb-2" id="branch_info">
                              <Label className="header-child">
                                GST Number *
                              </Label>
                              <SearchInput
                                data_list={gst_data_list}
                                setdata_list={setgst_data_list}
                                data_item_s={gst_number}
                                set_data_item_s={setgst_number}
                                set_id={setgst_id}
                                setsearch_item={setgst_search}
                                error_message={"Please Select GST"}
                                page={gst_page}
                                setpage={setgst_page}
                                error_s={own_gst_error}
                                loaded={gst_loaded}
                                count={gst_count}
                                bottom={gst_bottom}
                                setbottom={setgst_bottom}
                              />
                            </div>
                          </Col>
                        </>
                      ) : null}
                    </Row>
                  </CardBody>
                ) : null}
              </Card>
            </Col>
          </div>

          {/* Location info */}
          <div className="m-3" id="location_info">
            <Col lg={12}>
              <Card className="shadow bg-white rounded">
                <CardTitle className="mb-1 header">
                  <div className="header-text-icon header-text">
                    Location Info
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
                    {(vendor_pan_no && branch_type !== "Own Branch") &&
                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-2">
                          <Label className="header-child">
                            Same As Above Registered GST Address{" "}
                          </Label>
                          <Input
                            style={{ marginLeft: "12px" }}
                            type="checkbox"
                            className="form-control-md"
                            id="input"
                            onClick={() => {
                              setsame_as_gst(!same_as_gst);
                            }}
                            checked={same_as_gst}
                          />
                        </div>
                      </Col>
                    }
                    {(own_pan_number && branch_type === "Own Branch") &&
                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-2">
                          <Label className="header-child">
                            Same As Above Registered GST Address{" "}
                          </Label>
                          <Input
                            style={{ marginLeft: "12px" }}
                            type="checkbox"
                            className="form-control-md"
                            id="input"
                            onClick={() => {
                              setsame_as_gst(!same_as_gst);
                            }}
                            checked={same_as_gst}
                          />
                        </div>
                      </Col>
                    }
                    <Row>
                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-2">
                          <Label className="header-child">Address Line *</Label>
                          <Input
                            value={address_line}
                            invalid={address_line_err}
                            onChange={(val) => {
                              setaddress_line(val.target.value);
                            }}
                            type="text"
                            className="form-control-md"
                            id="input"
                            name="address_line_1"
                            placeholder="Enter Address Line 1"
                            disabled={same_as_gst}
                          />

                          <div className="mt-1 error-text" color="danger">
                            {address_line_err
                              ? "Address Field  is required"
                              : null}
                          </div>
                        </div>
                      </Col>

                      {/* location */}

                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-2">
                          <Label className="header-child">State*</Label>
                          <span onClick={() => setby_pincode(false)}>
                            <SearchInput
                              data_list={state_list_s}
                              setdata_list={setstate_list_s}
                              data_item_s={state}
                              set_data_item_s={setstate}
                              set_id={setstate_id}
                              page={state_page}
                              setpage={setstate_page}
                              error_message={"Please Select Any State"}
                              error_s={state_error}
                              search_item={state_search_item}
                              setsearch_item={setstate_search_item}
                              loaded={state_loaded}
                              count={state_count}
                              bottom={state_bottom}
                              setbottom={setstate_bottom}
                              disable_me={same_as_gst}
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
                            data_list={city_list_s}
                            setdata_list={setcity_list_s}
                            data_item_s={city}
                            set_data_item_s={setcity}
                            set_id={setcity_id}
                            page={city_page}
                            setpage={setcity_page}
                            error_message={"Please Select Any City"}
                            error_s={city_error}
                            search_item={city_search_item}
                            setsearch_item={setcity_search_item}
                            loaded={city_loaded}
                            count={city_count}
                            bottom={city_bottom}
                            setbottom={setcity_bottom}
                            disable_me={same_as_gst}
                          />
                          {/* <div className="mt-1 error-text" color="danger">
                            {city_error ? "Please Select Any City" : null}
                          </div> */}
                        </div>
                      </Col>

                      <Col lg={4} md={6} sm={6}>
                        {pincode_loaded ? (
                          <div className="mb-2">
                            <Label className="header-child">Pin Code*</Label>
                            <SearchInput
                              data_list={pincode_list_s}
                              setdata_list={setpincode_list_s}
                              data_item_s={pincode}
                              set_data_item_s={setpincode}
                              set_id={setpincode_id}
                              page={pincode_page}
                              setpage={setpincode_page}
                              search_item={pincode_search_item}
                              setsearch_item={setpincode_search_item}
                              error_message={"Please Select Any Pincode"}
                              error_s={pincode_list_error}
                              loaded={load_pincode}
                              count={pincode_count}
                              bottom={pincode_bottom}
                              setbottom={setpincode_bottom}
                              disable_me={same_as_gst}
                            />
                          </div>
                        ) : (
                          <div className="mb-2">
                            <Label className="header-child">Pin Code*</Label>
                            <Input
                              onChange={(val) => {
                                setpincode(val.target.value);
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
                                if (pincode.length === 0) {
                                  setpincode_error(true);
                                } else {
                                  if (pincode.length !== 6) {
                                    setpincode_error(false);
                                    setpincode_error2(true);
                                  } else {
                                    getPincode(pincode, "pincode");
                                    setpincode_error2(false);
                                    setby_pincode(true);
                                  }
                                }
                              }}
                              value={pincode}
                              type="number"
                              className="form-control-md"
                              id="input"
                              name="pincode1"
                              placeholder="Enter Pin code"
                            />

                            {pincode_loaded === false &&
                              pincode_error === true ? (
                              <div
                                style={{
                                  color: "#F46E6E",
                                  fontSize: "11.4px",
                                }}
                              >
                                Please add pincode
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
                              setsearch_item={setlocality_search_item}
                              search_item={locality_search_item}
                              error_message={"Please Select Any Locality"}
                              error_s={locality_error}
                              loaded={locality_loaded}
                              count={locality_count}
                              bottom={locality_bottom}
                              setbottom={setlocality_bottom}
                              disable_me={same_as_gst}
                            />
                          </div>
                        )}
                      </Col>
                    </Row>

                    {state !== "" && (
                      <div style={{ margin: "20px 0 20px 0" }}>
                        Do You Want To Include State wise operating City{" "}
                        <Input
                          style={{ marginRight: "5px" }}
                          type="checkbox"
                          values={get_state_wise_op}
                          onClick={() => {
                            setget_state_wise_op(!get_state_wise_op);
                          }}
                        />
                      </div>
                    )}

                    <Label className="header-child" id="operating_city">
                      Operating City*{" "}
                    </Label>
                    <Col lg={12} md={12} sm={12}>
                      <TransferList
                        list_a={operating_city_list}
                        setlist_a={setoperating_city_list}
                        list_b={operating_city_list2}
                        setlist_b={setoperating_city_list2}
                        page={op_city_page}
                        setpage={setop_city_page}
                        setsearch_item={setsearch_op_city}
                        loaded={operating_city_loaded}
                        count={operating_city_count}
                        bottom={operating_city_bottom}
                        setbottom={setoperating_city_bottom}
                      />
                      {operating_city_error ? (
                        <div style={{ color: "#f46a6a", fontSize: "10.4px" }}>
                          Please Select At Least One Operating City
                        </div>
                      ) : null}
                    </Col>
                  </CardBody>
                ) : null}
              </Card>
            </Col>
          </div>

          {/*Employee info*/}
          <div className="m-3" id="employee_info">
            <Col lg={12}>
              <Card className="shadow bg-white rounded">
                <CardTitle className="mb-1 header">
                  <div className="header-text-icon header-text">
                    Employee Info
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
                          <Label className="header-child">Branch Head* </Label>
                          <Input
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.branch_head || ""}
                            invalid={
                              validation.touched.branch_head &&
                                validation.errors.branch_head
                                ? true
                                : false
                            }
                            type="text"
                            className="form-control-md"
                            id="input"
                            name="branch_head"
                            placeholder="Enter Branch Head"
                          />
                          {validation.touched.branch_head &&
                            validation.errors.branch_head ? (
                            <FormFeedback type="invalid">
                              {validation.errors.branch_head}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>

                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-2">
                          <Label className="header-child">
                            Branch Head Email*
                          </Label>
                          <Input
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.branch_head_email || ""}
                            invalid={
                              validation.touched.branch_head_email &&
                                validation.errors.branch_head_email
                                ? true
                                : false
                            }
                            type="text"
                            className="form-control-md"
                            id="input"
                            name="branch_head_email"
                            placeholder="Enter Email"
                          />
                          {validation.touched.branch_head_email &&
                            validation.errors.branch_head_email ? (
                            <FormFeedback type="invalid">
                              {validation.errors.branch_head_email}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>

                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-2">
                          <Label className="header-child">
                            Branch Head Phone Number*
                          </Label>
                          <Input
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={
                              validation.values.branch_head_phone_number || ""
                            }
                            invalid={
                              validation.touched.branch_head_phone_number &&
                                validation.errors.branch_head_phone_number
                                ? true
                                : false
                            }
                            type="number"
                            min={0}
                            className="form-control-md"
                            id="input"
                            name="branch_head_phone_number"
                            placeholder="Enter Phone Number"
                          />
                          {validation.touched.branch_head_phone_number &&
                            validation.errors.branch_head_phone_number ? (
                            <FormFeedback type="invalid">
                              {validation.errors.branch_head_phone_number}
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

          {/* Footer */}
          <div className="m-3">
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
                {!isupdating && (
                  <Button
                    type="submit"
                    name="save_add"
                    className="btn btn-info m-1 cu_btn"
                  >
                    Save & Add Another
                  </Button>
                )}

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

export default AddBranch;
