import React, { useLayoutEffect, useRef } from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import MultiRowSearchInput from "../../../components/formComponent/multiRowSearchInput/MultiRowSearchInput";
import axios from "axios";
import Compressor from "compressorjs";
import "bootstrap/dist/css/bootstrap.css";
import "./EmployeeTab.css";
import classnames from "classnames";
import { IconContext } from "react-icons";
import { FiMoreHorizontal } from "react-icons/fi";
import { GrOverview } from "react-icons/gr";
import { BiTrip } from "react-icons/bi";
import { BsCloudUpload } from "react-icons/bs";
import { FaTruckMoving } from "react-icons/fa";
import { AiOutlineSchedule } from "react-icons/ai";
import {
  MdOutlineKeyboardArrowDown,
  MdAddCircleOutline,
  MdRemoveCircleOutline,
  MdAdd,
  MdDeleteForever,
} from "react-icons/md";

import {
  Card,
  CardBody,
  CardText,
  CardTitle,
  Col,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  Button,
  Label,
  Input,
  FormFeedback,
} from "reactstrap";

import NSearchInput from "../../../components/formComponent/nsearchInput/NSearchInput";
import { ServerAddress } from "../../../constants/ServerAddress";
import SearchInput from "../../../components/formComponent/searchInput/SearchInput";
// Add More Component
import AddBeneficiary from "./AddBeneficiary";
import AddAllowance from "./AddAllowance";
import AddAsset from "./AddAsset";
import AddWorkInformation from "./AddWorkInformation";
import toTitleCase from "../../../components/Title_Case/TitleCase";
import {
  setAlertType,
  setDataExist,
  setShowAlert,
} from "../../../store/alert/Alert";
import { useDispatch } from "react-redux";
import ProgressBar from "./ProgressBar";
import { Modal } from "react-bootstrap";
import { BsFillFileEarmarkPdfFill } from "react-icons/bs";

const EmployeeTab = () => {
  const dispatch = useDispatch();
  const location_data = useLocation();
  const [get_username, setget_username] = useState(location_data.state.employee.user_username )
  console.log("first", location_data)

  // Redux State
  const user = useSelector(
    (state) => state.authentication.userdetails.username
  );
  const user_info = useSelector((state) => state.authentication.userdetails);
  const accessToken = useSelector((state) => state.authentication.access_token);

  // to handle tab
  const [customActiveTab, setcustomActiveTab] = useState("1");
  const [isactive, setisactive] = useState(false);
  const toggleCustom = (tab) => {
    if (customActiveTab !== tab) {
      setcustomActiveTab(tab);
    }
  };

  // toggle btn
  const [circle_btn, setcircle_btn] = useState(true);
  const toggle_circle = () => {
    setcircle_btn(!circle_btn);
  };

  //for address details
  // permanent Address
  const [state_list_s, setstate_list_s] = useState([]);
  const [permanent_add_line1, setpermanent_add_line1] = useState("");
  const [permanent_add_line2, setpermanent_add_line2] = useState("");
  const [permanent_add1_err, setpermanent_add1_err] = useState(false);
  const [temporary_add1_err, settemporary_add1_err] = useState(false);
  const [permanent_state, setpermanent_state] = useState("");
  const [permanent_state_id, setpermanent_state_id] = useState("");
  const [city_page, setcity_page] = useState(1);
  const [city_search_item, setcity_search_item] = useState("");
  const [permanent_id, setpermanent_id] = useState(0);

  const [permanent_city, setpermanent_city] = useState("");
  const [permanent_city_id, setpermanent_city_id] = useState("");
  const [permanent_city_list, setpermanent_city_list] = useState([]);
  const [permanent_pincode, setpermanent_pincode] = useState("");
  const [permanent_pincode_list, setpermanent_pincode_list] = useState([]);
  const [permanent_pincode_id, setpermanent_pincode_id] = useState("");
  const [pincode_page, setpincode_page] = useState(1);
  const [pincode_search_item, setpincode_search_item] = useState("");

  const [permanent_locality, setpermanent_locality] = useState("");
  const [permanent_locality_list, setpermanent_locality_list] = useState("");
  const [permanent_locality_id, setpermanent_locality_id] = useState("");
  const [locality_page, setlocality_page] = useState(1);
  const [locality_search_item, setlocality_search_item] = useState("");
  const [local_err, setlocal_err] = useState(false);
  const [local_err2, setlocal_err2] = useState(false);

  const [update_temporary_address, setupdate_temporary_address] = useState("");
  const [update_permanent_address, setupdate_permanent_address] = useState("");

  // Fortemporary Address
  const [emergency_name, setemergency_name] = useState("");
  const [emergency_relation, setemergency_relation] = useState("");
  const [emergency_phone, setemergency_phone] = useState("");
  const [updaet_emergency_id, setupdaet_emergency_id] = useState("");

  const [bill_color, setbill_color] = useState(false);
  const [temporary_add_line1, settemporary_add_line1] = useState("");
  const [temporary_add_line2, settemporary_add_line2] = useState("");
  const [temporary_state, settemporary_state] = useState("");
  const [temporary_state_id, settemporary_state_id] = useState("");
  const [permanent_state_page, setpermanent_state_page] = useState(1);
  const [permanent_state_search_item, setpermanent_state_search_item] =
    useState("");
  const [permanent_state_loaded, setpermanent_state_loaded] = useState(false);
  const [permanent_state_count, setpermanent_state_count] = useState(1);
  const [permanent_state_bottom, setpermanent_state_bottom] = useState(103);

  const [temporary_city, settemporary_city] = useState("");
  const [temporary_city_list, settemporary_city_list] = useState([]);
  const [temporary_city_id, settemporary_city_id] = useState("");
  const [permanent_city_page, setpermanent_city_page] = useState(1);
  const [permanent_city_search_item, setpermanent_city_search_item] =
    useState("");
  const [temporary_pincode, settemporary_pincode] = useState("");
  const [temporary_pincode_list, settemporary_pincode_list] = useState([]);
  const [temporary_pincode_id, settemporary_pincode_id] = useState("");
  const [permanent_pincode_page, setpermanent_pincode_page] = useState(1);
  const [permanent_pincode_search_item, setpermanent_pincode_search_item] =
    useState("");
  const [temporary_id, settemporary_id] = useState(0);

  const [update_temporary_address_id, setupdate_temporary_address_id] =
    useState("");
  const [update_permanent_address_id, setupdate_permanent_address_id] =
    useState("");

  const [temporary_locality, settemporary_locality] = useState("");
  const [temporary_locality_list, settemporary_locality_list] = useState([]);
  const [temporary_locality_id, settemporary_locality_id] = useState("");
  const [permanent_locality_page, setpermanent_locality_page] = useState(1);
  const [permanent_locality_search_item, setpermanent_locality_search_item] =
    useState("");

  //data Load
  const [temporary_pincode_loaded, settemporary_pincode_loaded] =
    useState(false);
  const [permanent_pincode_loaded, setpermanent_pincode_loaded] =
    useState(false);

  const [updated_gstaddress, setupdated_gstaddress] = useState([]);

  const [active_tab, setactive_tab] = useState("first");
  const [circle_btn1, setcircle_btn1] = useState(true);
  const toggle_circle1 = () => {
    setcircle_btn1(!circle_btn1);
  };
  const [same_as_permanent_add, setsame_as_permanent_add] = useState(false);
  const [by_pincode, setby_pincode] = useState(false);

  // Location Info
  const [pincode_loaded, setpincode_loaded] = useState(false);
  const [state_error, setstate_error] = useState(false);
  const [city_error, setcity_error] = useState(false);
  const [state_error1, setstate_error1] = useState(false);
  const [city_error1, setcity_error1] = useState(false);
  const [pin_code_error, setpin_code_error] = useState(false);
  const [pincode_error, setpincode_error] = useState(false);
  const [pincode_error2, setpincode_error2] = useState(false);

  // stata
  const [refresh, setrefresh] = useState(false);
  const [user_details, setuser_details] = useState("");

  const [nick_name, setnick_name] = useState("");
  const [personal_email, setpersonal_email] = useState("");
  const [date_of_birth, setdate_of_birth] = useState("");
  const [age_is, setage_is] = useState("");

  const [blood_group, setblood_group] = useState("");
  const [blood_group_list, setblood_group_list] = useState([
    "A+",
    "A-",
    "B+",
    "B-",
    "AB+",
    "AB-",
    "O+",
    "O-",
  ]);
  const [gender, setgender] = useState("");
  const [marital_status, setmarital_status] = useState("");
  const [nationality, setnationality] = useState("");
  const [user_image, setuser_image] = useState("");

  //for update basic info

  const [get_employee_basic_info, setget_employee_basic_info] = useState("");

  const [update_basic_info, setupdate_basic_info] = useState(false);
  const [updaet_qualification, setupdaet_qualification] = useState(false);
  const [update__identifaction, setupdate__identifaction] = useState(false);
  const [update_bank_info, setupdate_bank_info] = useState(false);
  const [update__Experience, setupdate__Experience] = useState(false);
  const [update_address_info, setupdate_address_info] = useState(false);
  const [employe_data, setemploye_data] = useState("");
  const [emp_id, setemp_id] = useState("");
  const [bank_data, setbank_data] = useState("");

  // user image
  // Open file field at the time of update
  const fileInputRef = React.useRef(null);
  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  // THis function is used for handle image & compress image size
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log("Select file ", file);
    if (file && file.size > 300 * 1024) {
      alert("Image Size is Greater than 300kb");

      new Compressor(file, {
        // quality: 0.8,
        // maxWidth: file.width * 0.8,
        // maxHeight: file.height * 0.8,

        quality: 0.9,
        maxWidth: file.width * 0.9,
        maxHeight: file.height * 0.9,
        success(result) {
          const reader = new FileReader();
          reader.onload = () => {
            const base64Url = reader.result;
            console.log("Compressed image size:", result.size);
            setuser_image(base64Url);
          };
          reader.readAsDataURL(result);
        },
        error(err) {
          console.error("Image compression error:", err);
        },
      });
    } else {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Url = reader.result;
        console.log("file is ===>>", base64Url);
        setuser_image(base64Url);
      };
      reader.readAsDataURL(file);
    }
  };

  // identification details

  const fileInputRef2 = React.useRef(null);
  const handleIdlick = () => {
    alert("k");
    // fileInputRef2.current.value = null;
    fileInputRef2.current.click();
  };

  const [doc_type, setdoc_type] = useState("");
  const [certificate_no, setcertificate_no] = useState("");
  const [doc_upload, setdoc_upload] = useState("");

  let dimension_list = [doc_type, certificate_no, doc_upload];
  const [document, setdocument] = useState([dimension_list]);
  console.log("document ===-->>", document);
  const addDocument = () => {
    setdoc_type("");
    setcertificate_no("");
    setdoc_upload("");
    dimension_list = ["", "", ""];
    setdocument([...document, dimension_list]);
  };

  //--- delete input field
  const delete_document = (item) => {
    let temp = [...document];
    const index = temp.indexOf(item);
    if (index > -1) {
      temp.slice(index, 1);
      setdocument(temp);
    }
  };

  // education details
  let edu_dimension_list = ["", "", "", "", "", ""];
  const [education_info, seteducation_info] = useState([edu_dimension_list]);
  console.log("education_info=====", education_info)

  // for new row
  const add_another_edu = () => {
    let nedu_dimension_list = ["", "", "", "", "", ""];
    seteducation_info([...education_info, nedu_dimension_list]);
  };

  // to delete exsisting row
  const delete_edu = (item) => {
    alert("Delete");
    let temp = [...education_info];
    const index_val = temp.indexOf(item);

    if (index_val > -1) {
      temp.splice(index_val, 1);
      seteducation_info(temp);
    }
  };

  // bank details
  const [name_of_bank, setname_of_bank] = useState("");
  const [ifsc_code, setifsc_code] = useState("");
  const [bank_account, setbank_account] = useState("");
  const [account_holdername, setaccount_holdername] = useState("");
  const [branch, setbranch] = useState("");
  const [bank_address, setbank_address] = useState("");
  const [bank_update_id, setbank_update_id] = useState("");

  // Get Bank infi fron IFSC Code
  const getBankDetails = (ifsc) => {
    axios
      .get(`https://ifsc.razorpay.com/${ifsc}`)
      .then((response) => {
        console.log("the ifsc res",response)
        // Handle the successful response here
        const data = response.data;
        console.log("the Bank Data is ",data)
        if (data.BRANCH) {
          setname_of_bank(data.BANK);
          setbranch(data.BRANCH);
          setbank_address(data.ADDRESS);
        } else {
          console.log("Invalid IFSC Code");
        }
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error("Error:", error);
      });
  };
  useEffect(() => {
    if (ifsc_code && ifsc_code.length === 11) {
      getBankDetails(ifsc_code);
    }
  }, [ifsc_code]);

  const [employee, setemployee] = useState("");
  const [isupdating, setisupdating] = useState(false);

  //For getting the state data
  const getStates = async (place_id, filter_by) => {
    // let state_list = [...state_list_s];
    let state_list = [];
    try {
      const response = await axios.get(
        ServerAddress +
          `master/all_states/?search=${""}&place_id=${place_id}&filter_by=${filter_by}&p=${permanent_state_page}&records=${10}&state_search=${permanent_state_search_item}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      if (response.data.next === null) {
        setpermanent_state_loaded(false);
      } else {
        setpermanent_state_loaded(true);
      }
      if (response.data.results.length > 0) {
        if (permanent_state_page === 1) {
          state_list = response.data.results.map((v) => [
            v.id,
            toTitleCase(v.state),
          ]);
        } else {
          state_list = [
            ...state_list_s,
            ...response.data.results.map((v) => [v.id, toTitleCase(v.state)]),
          ];
        }
      }
      setpermanent_state_count(permanent_state_count + 2);
      setstate_list_s(state_list);
    } catch (err) {
      alert(`Error Occur in Get States, ${err}`);
    }
  };
  useLayoutEffect(() => {
    getStates("all", "all");
  }, [permanent_state_page, permanent_state_search_item]);

  //for getting the city

  const getCities = async (place_id, filter_by, state_type) => {
    setby_pincode(false);
    let cities_list = [];
    try {
      const response = await axios.get(
        ServerAddress +
          `master/all_cities/?search=${""}&p=${
            active_tab == "first" ? city_page : permanent_city_page
          }&records=${10}&city_search=${
            active_tab == "first"
              ? city_search_item
              : permanent_city_search_item
          }` +
          "&place_id=" +
          place_id +
          "&filter_by=" +
          filter_by,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      if (response.data.results.length > 0) {
        if (city_page === 1) {
          cities_list = response.data.results.map((v) => [
            v.id,
            toTitleCase(v.city),
          ]);
        } else {
          if (state_type === "temporary_state_id") {
            cities_list = [
              ...temporary_city_list,
              ...response.data.results.map((v) => [v.id, toTitleCase(v.city)]),
            ];
          } else {
            cities_list = [
              ...permanent_city_list,
              ...response.data.results.map((v) => [v.id, toTitleCase(v.city)]),
            ];
          }
        }
        if (state_type === "temporary_state_id") {
          settemporary_city_list(cities_list);
        } else {
          setpermanent_city_list(cities_list);
        }
      } else {
        // setcity("");
        settemporary_city_list([]);
        setpermanent_city_list([]);
      }
    } catch (err) {
      alert(`Error Occur in Get City, ${err}`);
    }
  };

  //for getting the pincode
  const getPincode = async (place_id, filter_by, city_type) => {
    let pincode_list = [];
    try {
      const response = await axios.get(
        ServerAddress +
          `master/all_pincode/?search=${""}&p=${
            active_tab == "first" ? pincode_page : permanent_pincode_page
          }&records=${10}&pincode_search=${
            active_tab == "first"
              ? pincode_search_item
              : permanent_pincode_search_item
          }` +
          "&place_id=" +
          place_id +
          "&filter_by=" +
          filter_by,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      if (filter_by !== "pincode") {
        console.log("tttttttttttttttttt====>", response);
        if (pincode_page === 1) {
          pincode_list = response.data.results.map((v) => [v.id, v.pincode]);
          console.log("pincode_list===>", pincode_list);
        } else {
          if (city_type === "permanent_city") {
            pincode_list = [
              ...permanent_pincode_list,
              ...response.data.results.map((v) => [v.id, v.pincode]),
            ];
          } else {
            pincode_list = [
              ...temporary_pincode_list,
              ...response.data.results.map((v) => [v.id, v.pincode]),
            ];
          }
        }

        if (city_type === "permanent_city") {
          setpermanent_pincode_list(pincode_list);
        } else {
          settemporary_pincode_list(pincode_list);
        }
      } else if (city_type === "permanent_city") {
        setpermanent_state(toTitleCase(response.data.results[0].state_name));
        setpermanent_state_id(response.data.results[0].state);

        setpermanent_city(toTitleCase(response.data.results[0].city_name));
        setpermanent_city_id(response.data.results[0].city);

        setpermanent_pincode(response.data.results[0].pincode);
        setpermanent_pincode_id(response.data.results[0].id);
      } else if (city_type === "temporary_city") {
        settemporary_state(toTitleCase(response.data.results[0].state_name));
        settemporary_state_id(response.data.results[0].state);
        settemporary_city(toTitleCase(response.data.results[0].city_name));
        settemporary_city_id(response.data.results[0].city);
        settemporary_pincode(response.data.results[0].pincode);
        settemporary_pincode_id(response.data.results[0].id);
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
      alert(`Error Occur in Get Pin Code, ${err}`);
    }
  };

  const getLocality = async (place_id, filter_by, pincode_type) => {
    let locality_list = [];
    try {
      const response = await axios.get(
        ServerAddress +
          `master/all_locality/?search=${""}&p=${
            active_tab == "first" ? locality_page : permanent_locality_page
          }&records=${10}` +
          `&place_id=${place_id}&filter_by=${filter_by}&name_search=${
            active_tab == "first"
              ? locality_search_item
              : permanent_locality_search_item
          }&state=&city=&name=&data=all`,
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
          if (pincode_type === "permanent_pincode") {
            locality_list = [
              ...permanent_locality_list,
              ...response.data.results.map((v) => [v.id, toTitleCase(v.name)]),
            ];
          } else {
            locality_list = [
              ...temporary_locality_list,
              ...response.data.results.map((v) => [v.id, toTitleCase(v.name)]),
            ];
          }
        }
        // setgst_locality_list(locality_list)
        if (pincode_type === "permanent_pincode") {
          setpermanent_locality_list(locality_list);
        } else {
          settemporary_locality_list(locality_list);
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
    if (temporary_state_id != "" && by_pincode === false) {
      getCities(temporary_state_id, "state", "temporary_state_id");
    }
  }, [temporary_state_id, permanent_city_page, permanent_city_search_item]);

  useLayoutEffect(() => {
    if (permanent_state_id != "" && !by_pincode) {
      getCities(permanent_state_id, "state", "permanent_state_id");
    }
  }, [permanent_state_id, city_page, city_search_item]);

  useLayoutEffect(() => {
    if (temporary_city_id !== "") {
      getPincode(temporary_city_id, "city", "temporary_city");
    }
  }, [
    temporary_city_id,
    permanent_pincode_page,
    permanent_pincode_search_item,
  ]);
  useLayoutEffect(() => {
    if (temporary_city_id !== "") {
      getPincode(temporary_city_id, "city", "temporary_city");
    }
  }, [
    temporary_city_id,
    permanent_pincode_page,
    permanent_pincode_search_item,
  ]);

  // if address is same
  useLayoutEffect(() => {
    if (same_as_permanent_add) {
      setpermanent_add_line1(temporary_add_line1);
      setpermanent_add_line2(temporary_add_line2);
      setpermanent_state(temporary_state);
      setpermanent_state_id(temporary_state_id);
      setpermanent_city(temporary_city);
      setpermanent_city_id(temporary_city_id);
      setpermanent_pincode(temporary_pincode);
      setpermanent_pincode_id(temporary_pincode_id);
      setpermanent_locality_id(temporary_locality_id);
    } else {
      setpermanent_add_line1("");
      setpermanent_add_line2("");
      setpermanent_state("");
      setpermanent_city("");
      setpermanent_pincode("");
      setpermanent_pincode_id("");
      setpermanent_locality_id("");
    }
  }, [same_as_permanent_add]);

  useLayoutEffect(() => {
    getStates("all", "all");
  }, [permanent_state_page, permanent_state_search_item]);

  useLayoutEffect(() => {
    if (permanent_state_id != "" && by_pincode === false) {
      getCities(permanent_state_id, "state", "permanent_state_id");
    }
  }, [permanent_state_id, permanent_city_page, permanent_city_search_item]);

  useLayoutEffect(() => {
    if (permanent_city_id != "" && by_pincode === false) {
      getPincode(permanent_city_id, "city", "permanent_city");
    }
  }, [
    permanent_city_id,
    permanent_pincode_page,
    permanent_pincode_search_item,
  ]);

  useLayoutEffect(() => {
    if (permanent_pincode_id != "") {
      getLocality(permanent_pincode_id, "pincode", "permanent_pincode");
    }
  }, [
    permanent_pincode_id,
    permanent_locality_page,
    permanent_locality_search_item,
  ]);

  useLayoutEffect(() => {
    if (temporary_state_id != "" && !by_pincode) {
      getCities(temporary_state_id, "state", "temporary_state_id");
    }
  }, [temporary_state_id, city_page, city_search_item]);

  useLayoutEffect(() => {
    if (temporary_city_id != "") {
      getPincode(temporary_city_id, "city", "temporary_city");
    }
  }, [temporary_city_id, pincode_page, pincode_search_item]);

  useLayoutEffect(() => {
    if (temporary_pincode_id !== "") {
      getLocality(temporary_pincode_id, "pincode", "temporary_pincode");
    }
  }, [temporary_pincode_id, locality_page, locality_search_item]);

  useLayoutEffect(() => {
    if (permanent_city !== "") {
      setpermanent_pincode_loaded(true);
    }
    if (temporary_city_id !== "") {
      settemporary_pincode_loaded(true);
    }
  }, [permanent_city_id, temporary_city_id]);

  // get location in work experiance
  const [origin_city_list_s, setorigin_city_list_s] = useState([]);
  const [origin_city, setorigin_city] = useState("");
  const [origin_city_page, setorigin_city_page] = useState(1);
  const [origin_city_search_item, setorigin_city_search_item] = useState("");
  const [city_loaded, setcity_loaded] = useState(0);
  const [city_count, setcity_count] = useState(1);
  const [city_bottom, setcity_bottom] = useState(101);

  const getOriginCities = (place_id, filter_by) => {
    let cities_list = [];
    axios
      .get(
        ServerAddress +
          `master/all_cities/?p=${origin_city_page}&records=${10}&city_search=${origin_city_search_item}` +
          "&place_id=" +
          place_id +
          "&filter_by=" +
          filter_by,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((resp) => {
        console.log("response city ", resp);
        if (resp.data.next === null) {
          setcity_loaded(false);
        } else {
          setcity_loaded(true);
        }
        if (resp.data.results.length > 0) {
          if (origin_city_page == 1) {
            cities_list = resp.data.results.map((v) => [v.id, v.city]);
          } else {
            cities_list = [
              ...origin_city_list_s,
              ...resp.data.results.map((v) => [v.id, v.city]),
            ];
          }
          setcity_count(city_count + 2);
          setorigin_city("");
          setorigin_city_list_s(cities_list);
        } else {
          setorigin_city_list_s([]);
        }
      })
      .catch((err) => {
        console.log("city api err", err);
        alert(`Error Occur in Get Origin City, ${err}`);
      });
  };

  useEffect(() => {
    getOriginCities("all", "all");
  }, [origin_city_page, origin_city_search_item]);

  // work experiance
  let work_dimension_list = ["", "", "", ["", ""], "", ""];
  const [work_experiance_info, setwork_experiance_info] = useState([
    work_dimension_list,
  ]);

  // for new row experiance
  const add_another_work_experiance = () => {
    let n_work_dimension_list = ["", "", "", ["", ""], "", ""];
    setwork_experiance_info([...work_experiance_info, n_work_dimension_list]);
  };

  // delete work experiance
  const delete_work_experience = (item) => {
    let temp = [...work_experiance_info];
    const index_val = temp.indexOf(item);
    if (index_val > -1) {
      temp.splice(index_val, 1);
      setwork_experiance_info(temp);
    }
  };


  
  // This function is used to get user details
  const getUserDetails = (name, token) => {
    axios
      .get(ServerAddress + "get_user_details/?username=" + name, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((resp) => {
        if (resp.status === 200) {
          // setcustomActiveTab("1");
          setuser_details(resp.data);
          get_employee(resp.data.id);
        }
      })
      .catch((err) => {
        alert(`Error Occur While Getting User Details, ${err}`);
      });
  };

  useEffect(() => {
    if (user !== "" && accessToken !== "") {
      getUserDetails(get_username, accessToken);
    }
  }, []);

  // this function is used to post employee basic info
  const send_employee = () => {
    axios
      .post(
        ServerAddress + "ems/Add_Employee/",
        {
          user_id: user_details.id,
          nick_name: nick_name,
          date_of_birth: date_of_birth,
          blood_group: blood_group,
          gender: gender,
          marital_status: marital_status,
          nationality: nationality,
          personal_email: personal_email,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (resp) {
        console.log("EMployee response ===>", resp.data);
        if (resp.data.status === "success") {
          setcustomActiveTab("2");
        }
      })
      .catch((err) => {
        alert(`error occur while Posting Employee Basic Details ${err}`);
      });
  };

  // this function is used to get employee basic info
  const get_employee = (id) => {
    axios
      .get(ServerAddress + "ems/Get_Employee/?user_id=" + id, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((resp) => {
        console.log("get user emp into rseponse==>", resp);
        if (resp.status === 200) {
          setget_employee_basic_info(resp.data);
          setnick_name(resp.data.nick_name);
          setdate_of_birth(resp.data.date_of_birth);
          setgender(resp.data.gender);
          setmarital_status(resp.data.marital_status);
          setnationality(resp.data.nationality);
          setpersonal_email(resp.data.personal_email);
          setblood_group(resp.data.blood_group);
        }
        if (resp.data.created_at !== "") {
          setupdate_basic_info(true);
        } else {
          setupdate_basic_info(false);
        }
      })
      .catch((err) => {
        alert(`Error Occur While Getting User Details, ${err}`);
      });
  };

  useEffect(() => {
    if (user_details && customActiveTab === "1") {
      get_employee(user_details.id);
    }
  }, [customActiveTab]);

  //for update basic info
  const update_employee = () => {
    axios
      .put(
        ServerAddress + "ems/update_employee/" + get_employee_basic_info.id,
        {
          user_id: user_details.id,
          nick_name: nick_name,
          date_of_birth: date_of_birth,
          gender: gender,
          marital_status: marital_status,
          nationality: nationality,
          personal_email: personal_email,
          blood_group:blood_group
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (resp) {
        if (resp.data.status === "success") {
          setcustomActiveTab("2");
        }
      })
      .catch((err) => {
        alert(`error occur while Posting Employee Basic Details ${err}`);
      });
  };

  //This function is used to post Qualification Details data
  const send__education_info = () => {
    axios
      .post(
        ServerAddress + "ems/add_qualification/",
        {
          employee: get_employee_basic_info.id,
          education_info: education_info,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (resp) {
        console.log("education info response ===>", resp.data);
        if (resp.data.status === "success") {
          setcustomActiveTab("3");
        }
      })
      .catch((err) => {
        alert(`error occur while adding ${err}`);
      });
  };

  // for getting the data of  Qualification Details
  const fileInputRef1 = React.useRef(null);

  const handleIClick = () => {
    fileInputRef1.current.click();
  };

  const get_education_info = (id) => {
    axios
      .get(ServerAddress + "ems/get_qualification/?employee_id=" + id, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((resp) => {
        console.log("get employee education into rseponse==>", resp);
        if (resp.status === 200) {
          if (resp.data.length !== 0) {
            setupdaet_qualification(true);
          } else {
            setupdaet_qualification(false);
          }
          if (resp.data.length !== 0) {
            console.log("get data is 0000");
            let temp = [];
            let temp_list = [];
            temp = resp.data;
            console.log("tempp value", temp);
            console.log("response length", resp.data.length);
            for (let i = 0; i < resp.data.length; i++) {
              console.log("pass", i);
              temp_list.push([
                temp[i].qualification,
                temp[i].university,
                temp[i].specialization,
                temp[i].percent,
                temp[i].year_of_graduation,
                temp[i].document,
                // "",
                // temp[i].document,
                temp[i].id,
              ]);
            }
            seteducation_info(temp_list);
            // console.log("jhgyjfthdtjhvjk", temp_list)
          }
        }
      })
      .catch((err) => {
        alert(`Error Occur While Getting Employee Education info, ${err}`);
      });
  };

  useEffect(() => {
    if (customActiveTab === "2") {
      get_education_info(get_employee_basic_info.id);
    }
  }, [customActiveTab]);

  //for update Qualification Details
  const update__education_info = () => {
    setshow_loader(true);
    axios
      .put(
        ServerAddress + "ems/update_qualification/",
        {
          employee: get_employee_basic_info.id,
          education_info: education_info,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (resp) {
        setshow_loader(false);
        // alert("Updaet Done");
        console.log("education info response ===>", resp.data);
      })
      .catch((err) => {
        alert(`error occur while adding ${err}`);
      });
  };

  // this function is for post Identification Details

  const send__identification_info = () => {
    axios
      .post(
        ServerAddress + "ems/add_supportingdoc/",
        {
          employee: get_employee_basic_info.id,
          identification_info: document,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (resp) {
        console.log("identityfication info response ===>", resp.data);
        if (resp.data.status === "success") {
          setcustomActiveTab("4");
        }
      })
      .catch((err) => {
        alert(`error occur while adding ${err}`);
      });
  };

  // for getting identification
  const get_identifaction_info = (id) => {
    axios
      .get(ServerAddress + "ems/get_supportingdoc/?employee_id=" + id, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((resp) => {
        console.log("get identifaction into rseponse==>", resp);
        if (resp.data.length !== 0) {
          setupdate__identifaction(true);
        } else {
          setupdate__identifaction(false);
        }

        if (resp.status === 200) {
          if (resp.data.length !== 0) {
            let temp = [];
            let temp_list1 = [];
            temp = resp.data;
            for (let i = 0; i < resp.data.length; i++) {
              console.log("pass", i);
              temp_list1.push([
                temp[i].document_type,
                temp[i].document_no,
                temp[i].document,
                temp[i].id,
              ]);
            }
            setdocument(temp_list1);
          }
        }
      })
      .catch((err) => {
        alert(`Error Occur While Getting Employee Education info, ${err}`);
      });
  };

  useEffect(() => {
    if (customActiveTab === "3") {
      get_identifaction_info(get_employee_basic_info.id);
    }
  }, [customActiveTab]);

  //for update identifaction details
  const update__identifaction_info = () => {
    axios
      .put(
        ServerAddress +
          "ems/update_supportingdoc/?employee_id=" +
          get_employee_basic_info.id,
        {
          // employee: get_employee_basic_info.id,
          identification_info: document,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (resp) {
        alert("Updaet Done");
        console.log("identifaction info response ===>", resp.data);
      })
      .catch((err) => {
        alert(`error occur while adding ${err}`);
      });
  };

  // send address
  const send_address_data = async () => {
    try {
      const response = await axios
        .post(
          ServerAddress + "ems/add_employeeaddress/",
          {
            employee: get_employee_basic_info.id,
            address: [
              [
                "RESIDENTIAL ADDRESS",
                toTitleCase(temporary_add_line1).toUpperCase(),
                toTitleCase(temporary_add_line2).toUpperCase(),
                temporary_pincode_id,
                temporary_city_id,
                temporary_state_id,
              ],
              [
                "PERMANENT ADDRESS",
                toTitleCase(permanent_add_line1).toUpperCase(),
                toTitleCase(permanent_add_line2).toUpperCase(),
                permanent_pincode_id,
                permanent_city_id,
                permanent_state_id,
              ],
            ],
            same_as_permanent_add: same_as_permanent_add,
            name: emergency_name,
            relationship: emergency_relation,
            contactno: emergency_phone,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then(function (response) {
          console.log("Address info response ===>", response.data);
          if (response.data.status === "success") {
            setcustomActiveTab("5");
          }
        });
    } catch (error) {
      alert(`Error Happen while posting Address Data ${error}`);
    }
  };

  const get_address_info = (id) => {
    axios
      .get(ServerAddress + "ems/get_address/?employee_id=" + id, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((resp) => {
        console.log("get Address into rseponse==>", resp);
        if (
          resp.data.address.length !== 0 &&
          resp.data.contact.created_at !== ""
        ) {
          const contact = resp.data.contact;
          const address = resp.data.address;

          if (
            address[0].address_line1 === address[1].address_line1 &&
            address[0].address_line2 === address[1].address_line2 &&
            address[0].locality === address[1].locality
          ) {
            setsame_as_permanent_add(true);
          }
          settemporary_add_line1(address[0].address_line1);
          settemporary_add_line2(address[0].address_line2);
          settemporary_state(address[0].state_name);
          settemporary_city(address[0].city_name);
          settemporary_pincode(address[0].pincode_name);
          // settemporary_locality(address[0].locality_name);
          // settemporary_locality_id(address[0].locality);
          setupdate_temporary_address_id(address[0].id);

          setpermanent_add_line1(address[1].address_line1);
          setpermanent_add_line2(address[1].address_line2);
          setpermanent_state(address[1].state_name);
          setpermanent_city(address[1].city_name);
          setpermanent_pincode(address[1].pincode_name);
          // setpermanent_locality(address[1].locality_name);
          // setpermanent_locality_id(address[1].locality);
          setupdate_permanent_address_id(address[1].id);

          setemergency_name(contact[0].name);
          setemergency_relation(contact[0].relationship);
          setemergency_phone(contact[0].mobile_number);
          setupdaet_emergency_id(contact[0].id);

          setupdate_address_info(true);
        } else {
          setupdate_address_info(false);
        }
      })
      .catch((err) => {
        alert(`Error Occur While Getting Employee Education info, ${err}`);
      });
  };

  useEffect(() => {
    if (customActiveTab === "4") {
      get_address_info(get_employee_basic_info.id);
    }
  }, [customActiveTab]);

  const update_address = () => {
    axios
      .put(
        ServerAddress + `ems/update_address/` + get_employee_basic_info.id,
        {
          // employee: get_employee_basic_info.id,
          address: [
            [
              "RESIDENTIAL ADDRESS",
              toTitleCase(temporary_add_line1).toUpperCase(),
              toTitleCase(temporary_add_line2).toUpperCase(),
              temporary_pincode_id,
              temporary_city_id,
              temporary_state_id,
              update_temporary_address_id,
            ],
            [
              "PERMANENT ADDRESS",
              toTitleCase(permanent_add_line1).toUpperCase(),
              toTitleCase(permanent_add_line2).toUpperCase(),
              permanent_pincode_id,
              permanent_city_id,
              permanent_state_id,
              update_permanent_address_id,
            ],
          ],
          name: emergency_name,
          relationship: emergency_relation,
          contactno: emergency_phone,
          emergency_contact_id: updaet_emergency_id,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (resp) {
        if (resp.data.status === "success") {
          alert("Update Address");
          setcustomActiveTab("5");
        }
      })
      .catch((err) => {
        alert(`error occur while Posting Employee Basic Details ${err}`);
      });
  };
  // this function is used to post bank info
  const send__bank_info = () => {
    axios
      .post(
        ServerAddress + "ems/add_bankdetails/",
        {
          employee: get_employee_basic_info.id,
          name_of_bank: name_of_bank,
          ifsc_code: ifsc_code,
          branch: branch,
          branch_address: bank_address,
          bank_account: bank_account,
          account_holdername: account_holdername,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (resp) {
        console.log("bank info response ===>", resp.data);
        if (resp.data.status === "success") {
          setcustomActiveTab("6");
        }
      })
      .catch((err) => {
        alert(`error occur while adding ${err}`);
      });
  };

  console.log("update_bank_info ==== >>>", update_bank_info);
  //for getting bank details
  const get_bank_details = (id) => {
    axios
      .get(ServerAddress + "ems/get_bankdetails/?employee_id=" + id, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((resp) => {
        console.log("get user bank info==>", resp);
        if (resp.status === 200) {
          if (
            resp.data.detail === "No Bank Details found for the given Employee"
          ) {
            setupdate_bank_info(false);
          } else {
            setupdate_bank_info(true);
          }
          setname_of_bank(resp.data.name_of_bank);
          setifsc_code(resp.data.ifsc_code);
          setbranch(resp.data.branch);
          setbank_address(resp.data.branch_address);
          setbank_account(resp.data.bank_account);
          setaccount_holdername(resp.data.account_holdername);
          setbank_update_id(resp.data.id);
        }
      })
      .catch((err) => {
        alert(`Error Occur While Getting User Details, ${err}`);
      });
  };

  useEffect(() => {
    if (customActiveTab === "5" && get_employee_basic_info.id) {
      get_bank_details(get_employee_basic_info.id);
    }
  }, [customActiveTab]);

  //for update Bnak details
  const update_bank = () => {
    axios
      .put(
        ServerAddress + `ems/update_bankdetails/` + bank_update_id,
        {
          // employee_id: get_employee_basic_info.id,
          name_of_bank: name_of_bank,
          ifsc_code: ifsc_code,
          branch: branch,
          branch_address: bank_address,
          bank_account: bank_account,
          account_holdername: account_holdername,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (resp) {
        if (resp.data.status === "success") {
          setcustomActiveTab("6");
        }
      })
      .catch((err) => {
        alert(`error occur while Posting Employee Basic Details ${err}`);
      });
  };

  // This Function is used to post Experience info
  const send__Experience_info = () => {
    axios
      .post(
        ServerAddress + "ems/add_workexperience/",
        {
          employee: get_employee_basic_info.id,
          work_experiance_info: work_experiance_info,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (resp) {
        alert("Details Saved Sucessfully");
        console.log("Experience info response ===>", resp.data);
      })
      .catch((err) => {
        alert(`error occur while adding ${err}`);
      });
  };

  // This Function is used to GET Experience info
  const get__Experience_info = (id) => {
    axios
      .get(ServerAddress + "ems/get_workexperience/?employee_id=" + id, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((resp) => {
        console.log("get Experiences id into rseponse==>", resp);

        if (resp.status === 200) {
          if (resp.data.length !== 0) {
            console.log("get data is 0000");
            let temp = [];
            let temp_list1 = [];
            temp = resp.data;
            console.log("get  Id info", temp);
            console.log("response length", resp.data.length);
            for (let i = 0; i < resp.data.length; i++) {
              console.log("pass", i);
              temp_list1.push([
                temp[i].designation,
                temp[i].employement_type,
                temp[i].company,
                [temp[i].work_location, toTitleCase(temp[i].city_name)],
                temp[i].joining_date,
                temp[i].leaving_date,
                temp[i].id,
              ]);
            }
            setwork_experiance_info(temp_list1);
            console.log("set id info ==>>", temp_list1);
          }

          if (resp.data.length !== 0) {
            setupdate__Experience(true);
          } else {
            setupdate__Experience(false);
          }
        }
      })
      .catch((err) => {
        alert(`Error Occur While Getting Employee Experiences info, ${err}`);
      });
  };

  useEffect(() => {
    if (customActiveTab === "6") {
      get__Experience_info(get_employee_basic_info.id);
    }
  }, [customActiveTab]);

  // This Function is used to Update Experience info
  const update__experience_info = () => {
    axios
      .put(
        ServerAddress +
          "ems/update_workexperience/?employee_id=" +
          get_employee_basic_info.id,
        {
          employee: get_employee_basic_info.id,
          work_experiance_info: work_experiance_info,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (resp) {
        alert("Updaet Done");
        console.log("identifaction update info response ===>", resp.data);
      })
      .catch((err) => {
        alert(`error occur while adding ${err}`);
      });
  };

  // to calculate age from Date Of Birth
  const calculateAge = (dateOfBirth) => {
    let today = new Date();
    let birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    // let monthDiff = today.getMonth() - birthDate.getMonth();
    setage_is(age);
    return age;
  };
  useEffect(() => {
    if (date_of_birth) {
      calculateAge(date_of_birth);
    }
  }, [date_of_birth]);
   // ------------- Response Loader Modal---------
   const [show_loader, setshow_loader] = useState(false);
   //--------------- For Update Qualification Details Tab , Document Update----------- 
    const fileInputRef4 = React.useRef(null);
    function handlebtnClick(item) {
      fileInputRef4.current.click();
    }
    const [id_index, setid_index] = useState(); 
    async function handleFileChangeDoc(event, item) {
      console.log("Click item uis ", item);
      const file = event.target.files[0];
  
      if (file && file.type === "application/pdf") {
        try {
          const base64Url = await readFileAsBase64(file);
          console.log("Selected file is ===>>", base64Url);
  //----------------- Update the 'item' array with the base64 data---------------------
          education_info[id_index][5] = base64Url;
          setrefresh(!refresh);
        } catch (error) {
          console.error("Error reading file:", error);
        }
      } else {
        console.log("Please select a PDF file.");
      }
    }
    console.log("Edu list file is ===>>", education_info);
    //------------ this funcation read base64 file fast -------------------  
    function readFileAsBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
  
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(reader.error);
  
        reader.readAsDataURL(file);
      });
    }
  //------------------ For Update Identification Details, Document Upload Update----------------
    const fileInputRef5 = React.useRef(null);
    function handlebtnClickIdentificationDoc(item) {
      fileInputRef5.current.click();
    }
    const [identification_index, setidentification_index] = useState();
  
    async function handleFileChangeIdentificationDoc(event, item) {
      // console.log("Click item uis ", item);
      const file = event.target.files[0];
  
      if (file && file.type === "application/pdf") {
        try {
          const base64Url = await readFileAsBase64(file);
          console.log("Selected file is ===>>", base64Url);
  //--------------------Update the 'item' array with the base64 data------------------------------
          document[identification_index][2] = base64Url;
          setrefresh(!refresh);
        } catch (error) {
          console.error("Error reading file:", error);
        }
      } else {
        console.log("Please select a PDF file.");
      }
    }

  return (
    <div>
       {/* ------------- Response Loader Modal--------- */}
       <Modal
        show={show_loader}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div>
              <h4> Please wait...</h4>
            </div>
            <div class="loader"></div>
          </div>
        </Modal.Body>
      </Modal>

      <Row>
        <Col lg={12}>
          <Card>
            <CardBody>
              <Nav tabs className="nav-tabs-custom nav-justified">
                <NavItem>
                  <NavLink
                    style={{ cursor: "pointer" }}
                    className={classnames({
                      active: customActiveTab === "1",
                    })}
                    onClick={() => {
                      toggleCustom("1");
                    }}
                  >
                    <span className="d-block d-sm-none">
                      <GrOverview />
                    </span>
                    <span className="d-none d-sm-block">Basic Info </span>
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink
                    style={{ cursor: "pointer" }}
                    className={classnames({
                      active: customActiveTab === "2",
                    })}
                    onClick={() => {
                      toggleCustom("2");
                    }}
                  >
                    <span className="d-block d-sm-none">
                      <BiTrip />
                    </span>
                    <span className="d-none d-sm-block">
                      Qualification Details
                    </span>
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink
                    style={{ cursor: "pointer" }}
                    className={classnames({
                      active: customActiveTab === "3",
                    })}
                    onClick={() => {
                      toggleCustom("3");
                    }}
                  >
                    <span className="d-block d-sm-none">
                      <BiTrip />
                    </span>
                    <span className="d-none d-sm-block">
                      Identification Details
                    </span>
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink
                    style={{ cursor: "pointer" }}
                    className={classnames({
                      active: customActiveTab === "4",
                    })}
                    onClick={() => {
                      toggleCustom("4");
                    }}
                  >
                    <span className="d-block d-sm-none">
                      <i className="far fa-user"></i>
                    </span>
                    <span className="d-none d-sm-block">
                      Address/Emergency Details
                    </span>
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink
                    style={{ cursor: "pointer" }}
                    className={classnames({
                      active: customActiveTab === "5",
                    })}
                    onClick={() => {
                      toggleCustom("5");
                    }}
                  >
                    <span className="d-block d-sm-none">
                      <FaTruckMoving />
                    </span>
                    <span className="d-none d-sm-block">Bank Details</span>
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink
                    style={{ cursor: "pointer" }}
                    className={classnames({
                      active: customActiveTab === "6",
                    })}
                    onClick={() => {
                      toggleCustom("6");
                    }}
                  >
                    <span className="d-block d-sm-none">
                      <AiOutlineSchedule />
                    </span>
                    <span className="d-none d-sm-block">Work Experience</span>
                  </NavLink>
                </NavItem>

                {user_info.is_onborded && (
                  <NavItem>
                    <NavLink
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setisactive(!isactive);
                      }}
                    >
                      <span className="d-block d-sm-none">
                        <i>
                          <FiMoreHorizontal />
                        </i>
                      </span>
                      <span className="d-none d-sm-block">
                        <Button
                          style={{
                            backgroundColor: "green",
                            borderRadius: "5px",
                            color: "white",
                            position: "relative",
                          }}
                        >
                          Add More
                          <MdOutlineKeyboardArrowDown />
                        </Button>
                      </span>
                    </NavLink>
                  </NavItem>
                )}

                {isactive ? (
                  <>
                    <div className="drop1">
                      <span className="head"> </span>

                      <ul className="click">
                        <li className="click_item">
                          <AddBeneficiary />
                        </li>
                        <li className="click_item">
                          <AddAllowance />
                        </li>
                        <li className="click_item">
                          <AddAsset />
                        </li>
                        <li className="click_item">
                          <AddWorkInformation />
                        </li>
                        <li className="click_item">
                          <p>Add More</p>
                        </li>
                      </ul>
                    </div>
                  </>
                ) : null}
              </Nav>
              {/* <ProgressBar customActiveTab = {customActiveTab} /> */}

              <TabContent
                activeTab={customActiveTab}
                className="p-3 text-muted"
              >
                <TabPane tabId="1">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      {
                        update_basic_info ? update_employee() : send_employee();
                      }
                    }}
                  >
                    <Row>
                      <Col sm="12">
                        <CardText className="mb-0">
                          <Row>
                            <Col lg={12} md={12} sm={12} xs={12}>
                              <div>
                                <Row>
                                  <div className="m-1">
                                    <Col lg={12}>
                                      <Card className="shadow bg-white rounded">
                                        <CardTitle className="mb-1 header">
                                          <div className="header-text-icon header-text">
                                            Employee Basic Details
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
                                              {/* <Col lg={3} md={6} sm={6}>
                          <div className="mb-2">
                            <Label className="header-child">Employee ID </Label>
                            <Input
                              type="text"
                              className="form-control-md"
                              id="input"
                              name="employee_id"
                              disabled
                            />
                          </div>
                        </Col> */}

                                              <Col lg={3} md={6} sm={6}>
                                                <div className="mb-2">
                                                  <Label className="header-child">
                                                    UserName
                                                    <span className="mandatory">
                                                      *
                                                    </span>
                                                  </Label>
                                                  <Input
                                                    value={
                                                      user_details.username
                                                    }
                                                    disabled
                                                    type="text"
                                                    className="form-control-md"
                                                    id="input"
                                                    name="first_name"
                                                    placeholder="Enter first name"
                                                  />
                                                </div>
                                              </Col>

                                              <Col lg={3} md={6} sm={6}>
                                                <div className="mb-2">
                                                  <Label className="header-child">
                                                    First Name
                                                    <span className="mandatory">
                                                      *
                                                    </span>
                                                  </Label>
                                                  <Input
                                                    value={
                                                      user_details.firstname
                                                    }
                                                    disabled
                                                    type="text"
                                                    className="form-control-md"
                                                    id="input"
                                                    name="first_name"
                                                    placeholder="Enter first name"
                                                  />
                                                </div>
                                              </Col>
                                              {/* 
                        <Col lg={3} md={6} sm={6}>
                          <div className="mb-2">
                            <Label className="header-child">
                              Middle Name <span className="mandatory">*</span>
                            </Label>
                            <Input
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.middle_name}
                              invalid={
                                validation.touched.middle_name &&
                                validation.errors.middle_name
                                  ? true
                                  : false
                              }
                              type="text"
                              className="form-control-md"
                              id="input"
                              name="middle_name"
                              placeholder="Enter middle name"
                            />
                            {validation.touched.middle_name &&
                            validation.errors.middle_name ? (
                              <FormFeedback type="invalid">
                                {validation.errors.middle_name}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </Col> */}

                                              <Col lg={3} md={6} sm={6}>
                                                <div className="mb-3">
                                                  <Label className="header-child">
                                                    Last Name
                                                    <span className="mandatory">
                                                      *
                                                    </span>
                                                  </Label>
                                                  <Input
                                                    value={
                                                      user_details.lastname
                                                    }
                                                    disabled
                                                    type="text"
                                                    className="form-control-md"
                                                    id="input"
                                                    name="last_name"
                                                    placeholder="Enter last name"
                                                  />
                                                </div>
                                              </Col>

                                              <Col lg={3} md={6} sm={6}>
                                                <div className="mb-3">
                                                  <Label className="header-child">
                                                    Nick Name
                                                  </Label>
                                                  <Input
                                                    value={nick_name}
                                                    onChange={(val) => {
                                                      setnick_name(
                                                        val.target.value
                                                      );
                                                    }}
                                                    type="text"
                                                    className="form-control-md"
                                                    id="input"
                                                    name="nick_name"
                                                    placeholder="Enter nick name"
                                                  />
                                                </div>
                                              </Col>

                                              <Col lg={3} md={6} sm={6}>
                                                <div className="mb-3">
                                                  <Label className="header-child">
                                                    Gender
                                                    <span className="mandatory">
                                                      *
                                                    </span>
                                                  </Label>

                                                  <Col lg={12} md={12} sm={12}>
                                                    <Row>
                                                      <Col lg={6} md={6} sm={6}>
                                                        <div className="mb-3">
                                                          <Input
                                                            type="radio"
                                                            className="form-control-md"
                                                            style={{
                                                              marginRight:
                                                                "4px",
                                                            }}
                                                            id="input"
                                                            name="gender"
                                                            onClick={() => {
                                                              setgender("MALE");
                                                            }}
                                                            readOnly={true}
                                                            checked={
                                                              gender === "MALE"
                                                            }
                                                          />

                                                          <Label>Male</Label>
                                                        </div>
                                                      </Col>

                                                      <Col lg={6} md={6} sm={6}>
                                                        <div className="mb-3">
                                                          <Input
                                                            type="radio"
                                                            className="form-control-md"
                                                            id="input"
                                                            name="gender"
                                                            style={{
                                                              marginRight:
                                                                "4px",
                                                            }}
                                                            onClick={() => {
                                                              setgender(
                                                                "FEMALE"
                                                              );
                                                            }}
                                                            readOnly={true}
                                                            checked={
                                                              gender ===
                                                              "FEMALE"
                                                            }
                                                          />

                                                          <Label>Female</Label>
                                                        </div>
                                                      </Col>
                                                    </Row>
                                                  </Col>
                                                </div>
                                              </Col>

                                              <Col lg={3} md={6} sm={6}>
                                                <div className="mb-3">
                                                  <Label className="header-child">
                                                    Marital status
                                                    <span className="mandatory">
                                                      *
                                                    </span>
                                                  </Label>
                                                  <Col lg={12} md={12} sm={12}>
                                                    <Row>
                                                      <Col lg={6} md={6} sm={6}>
                                                        <div className="mb-3">
                                                          <Input
                                                            type="radio"
                                                            className="form-control-md"
                                                            style={{
                                                              marginRight:
                                                                "3px",
                                                            }}
                                                            id="input"
                                                            name="marital_status"
                                                            onClick={() => {
                                                              setmarital_status(
                                                                "MARRIED"
                                                              );
                                                            }}
                                                            readOnly={true}
                                                            checked={
                                                              marital_status ===
                                                              "MARRIED"
                                                            }
                                                          />

                                                          <Label>Married</Label>
                                                        </div>
                                                      </Col>

                                                      <Col lg={6} md={6} sm={6}>
                                                        <div className="mb-3">
                                                          <Input
                                                            type="radio"
                                                            className="form-control-md"
                                                            style={{
                                                              marginRight:
                                                                "3px",
                                                            }}
                                                            id="input"
                                                            name="marital_status"
                                                            onClick={() => {
                                                              setmarital_status(
                                                                "NOT MARRIED"
                                                              );
                                                            }}
                                                            readOnly={true}
                                                            checked={
                                                              marital_status ===
                                                              "NOT MARRIED"
                                                            }
                                                          />

                                                          <Label>
                                                            Not Married
                                                          </Label>
                                                        </div>
                                                      </Col>
                                                    </Row>
                                                  </Col>
                                                </div>
                                              </Col>

                                              <Col lg={3} md={6} sm={6}>
                                                <div className="mb-3">
                                                  <Label className="header-child">
                                                    Nationality
                                                    <span className="mandatory">
                                                      *
                                                    </span>
                                                  </Label>
                                                  <Col lg={12} md={12} sm={12}>
                                                    <Row>
                                                      <Col lg={6} md={6} sm={6}>
                                                        <div className="mb-3">
                                                          <Input
                                                            type="radio"
                                                            className="form-control-md"
                                                            style={{
                                                              marginRight:
                                                                "4px",
                                                            }}
                                                            id="input"
                                                            name="nationality"
                                                            onClick={() => {
                                                              setnationality(
                                                                "INDIAN"
                                                              );
                                                            }}
                                                            readOnly={true}
                                                            checked={
                                                              nationality ===
                                                              "INDIAN"
                                                            }
                                                          />

                                                          <Label>Indian</Label>
                                                        </div>
                                                      </Col>

                                                      <Col lg={6} md={6} sm={6}>
                                                        <div className="mb-3">
                                                          <Input
                                                            type="radio"
                                                            className="form-control-md"
                                                            style={{
                                                              marginRight:
                                                                "4px",
                                                            }}
                                                            id="input"
                                                            name="nationality"
                                                            onClick={() => {
                                                              setnationality(
                                                                "NOT INDIAN"
                                                              );
                                                            }}
                                                            readOnly={true}
                                                            checked={
                                                              nationality ===
                                                              "NOT INDIAN"
                                                            }
                                                          />

                                                          <Label>Other</Label>
                                                        </div>
                                                      </Col>
                                                    </Row>
                                                  </Col>
                                                </div>
                                              </Col>

                                              <Col lg={2} md={6} sm={6}>
                                                <div className="mb-3">
                                                  <Label className="header-child">
                                                    Date of Birth
                                                    <span className="mandatory">
                                                      *
                                                    </span>
                                                  </Label>
                                                  <Input
                                                    type="date"
                                                    className="form-control-md"
                                                    id="input"
                                                    name="date_of_birth"
                                                    value={date_of_birth}
                                                    onChange={(val) => {
                                                      setdate_of_birth(
                                                        val.target.value
                                                      );
                                                    }}
                                                  />
                                                </div>
                                              </Col>

                                              <Col lg={1} md={6} sm={6}>
                                                <div className="mb-3">
                                                  <Label className="header-child">
                                                    Age
                                                    <span className="mandatory">
                                                      *
                                                    </span>
                                                  </Label>
                                                  <Input
                                                    type="number"
                                                    className="form-control-md"
                                                    id="input"
                                                    name="age"
                                                    value={age_is}
                                                    disabled
                                                  />
                                                </div>
                                              </Col>

                                              <Col lg={3} md={6} sm={6}>
                                                <div className="mb-3">
                                                  <Label className="header-child">
                                                    Blood Group
                                                    <span className="mandatory">
                                                      *
                                                    </span>
                                                  </Label>
                                                  <NSearchInput
                                                    data_list={blood_group_list}
                                                    data_item_s={blood_group}
                                                    set_data_item_s={
                                                      setblood_group
                                                    }
                                                  />
                                                </div>
                                              </Col>

                                              <Col lg={3} md={6} sm={6}>
                                                <div className="mb-3">
                                                  <Label className="header-child">
                                                    Phone Number
                                                    <span className="mandatory">
                                                      *
                                                    </span>
                                                  </Label>
                                                  <Input
                                                    disabled
                                                    value={
                                                      user_details.mobilenumber
                                                    }
                                                    type="number"
                                                    min={0}
                                                    className="form-control-md"
                                                    id="input"
                                                    name="phone_number"
                                                    placeholder="Enter Phone Number"
                                                  />
                                                </div>
                                              </Col>

                                              <Col lg={3} md={6} sm={6}>
                                                <div className="mb-3">
                                                  <Label className="header-child">
                                                    Personal email
                                                    <span className="mandatory">
                                                      *
                                                    </span>
                                                  </Label>
                                                  <Input
                                                    value={personal_email}
                                                    onChange={(val) => {
                                                      setpersonal_email(
                                                        val.target.value
                                                      );
                                                    }}
                                                    type="email"
                                                    className="form-control-md"
                                                    id="input"
                                                    name="personal_email"
                                                    placeholder="Enter Personal Email"
                                                  />
                                                </div>
                                              </Col>

                                              <Col lg={3} md={6} sm={6}>
                                                <div className="mb-3">
                                                  <Label className="header-child">
                                                    Email
                                                    <span className="mandatory">
                                                      *
                                                    </span>
                                                  </Label>
                                                  <Input
                                                    value={user_details.email}
                                                    disabled
                                                    type="email"
                                                    className="form-control-md"
                                                    id="input"
                                                    name="email"
                                                    placeholder="Enter Email"
                                                  />
                                                </div>
                                              </Col>

                                              <Col lg={4} md={4} sm={6}>
                                                <div className="mb-2">
                                                  <Label
                                                    className={
                                                      user_image === ""
                                                        ? "header-child"
                                                        : "header_child_after"
                                                    }
                                                  >
                                                    {" "}
                                                    Upload Image{" "}
                                                  </Label>
                                                  {user_image !== "" && (
                                                    <Col lg={12} md={4} sm={6}>
                                                      <div className="mb-3 parent_div">
                                                        <img
                                                          src={user_image}
                                                          style={{
                                                            width: "45%",
                                                            height: "125px",
                                                            borderRadius: "8px",
                                                            boxShadow:
                                                              "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                                                          }}
                                                        />
                                                        {update_basic_info && (
                                                          <>
                                                            <div
                                                              className="child_div"
                                                              onClick={() => {
                                                                handleIconClick();
                                                              }}
                                                            >
                                                              <BsCloudUpload
                                                                size={30}
                                                              />
                                                            </div>
                                                            <input
                                                              style={{
                                                                display: "none",
                                                              }}
                                                              name="user_image"
                                                              type="file"
                                                              accept="image/png,image/jpeg, image/jpg"
                                                              ref={fileInputRef}
                                                              onChange={(
                                                                val
                                                              ) => {
                                                                handleFileChange(
                                                                  val
                                                                );
                                                              }}
                                                            />
                                                          </>
                                                        )}
                                                      </div>
                                                    </Col>
                                                  )}

                                                  {!update_basic_info && (
                                                    <Input
                                                      className="form-control-md"
                                                      name="user_image"
                                                      type="file"
                                                      accept="image/png,image/jpeg, image/jpg"
                                                      onChange={(val) => {
                                                        handleFileChange(val);
                                                      }}
                                                    />
                                                  )}
                                                </div>
                                              </Col>
                                            </Row>
                                          </CardBody>
                                        ) : null}
                                      </Card>
                                    </Col>
                                  </div>
                                </Row>
                              </div>
                            </Col>
                          </Row>
                          {/* fotter btn */}
                          <div className="m-1">
                            <Col lg={12}>
                              <div className="mb-1 footer_btn">
                                <Button
                                  type="submit"
                                  className="btn btn-success m-1 cu_btn"
                                >
                                  {update_basic_info
                                    ? "Update & Next"
                                    : "Save & Next"}
                                </Button>
                              </div>
                            </Col>
                          </div>{" "}
                        </CardText>
                      </Col>
                    </Row>
                  </form>
                </TabPane>

                <TabPane tabId="2">
                  <form
                    onSubmit={(r) => {
                      r.preventDefault();
                      // alert("s2");
                      {
                        updaet_qualification
                          ? update__education_info()
                          : send__education_info();
                      }
                    }}
                  >
                    {" "}
                    <Row>
                      <Col sm="12">
                        <CardText className="mb-0">
                          <Row>
                            <Col lg={12} md={12} sm={12} xs={12}>
                              {/* education info */}
                              <div className="m-1">
                                <Card className="shadow bg-white rounded">
                                  <CardTitle className="mb-1 header">
                                    <div className="header-text-icon header-text">
                                      Education Details
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
                                      <div>
                                        <Row>
                                          <Col lg={2} md={3} sm={3}>
                                            <div className="mb-3">
                                              <Label className="header-child">
                                                {/* Education Mode{" "} */}
                                                Qulification
                                                <span className="manadatory">
                                                  *
                                                </span>
                                              </Label>
                                              {education_info.map(
                                                (item, index) => {
                                                  return (
                                                    <select
                                                      className="form-select"
                                                      id="input-s"
                                                      key={index}
                                                      value={item[0]}
                                                      style={{
                                                        marginBottom: "15px",
                                                        height: "28px",
                                                        fontSize: "10px",
                                                      }}
                                                      bsSize="sm"
                                                      onChange={(val) => {
                                                        item[0] =
                                                          val.target.value;
                                                        setrefresh(!refresh);
                                                      }}
                                                    >
                                                      <option value="" disabled>
                                                        select...
                                                      </option>
                                                      <option value="Non-metric">
                                                        Non-metric
                                                      </option>
                                                      <option value="Metric">
                                                        Metric
                                                      </option>
                                                      <option value="Intermediate">
                                                        Intermediate
                                                      </option>
                                                      <option value="Under Graduate">
                                                        Under Graduate(UG)
                                                      </option>
                                                      <option value="Post Graduate">
                                                        Post Graduate(PG)
                                                      </option>
                                                    </select>
                                                  );
                                                }
                                              )}
                                            </div>
                                          </Col>

                                          <Col lg={2} md={3} sm={3}>
                                            <Label className="header-child">
                                              Instituate Name{" "}
                                              <span className="manadatory">
                                                *
                                              </span>
                                            </Label>
                                            {education_info.map(
                                              (item, index) => (
                                                <Input
                                                  className="form-control d-block from control-md"
                                                  key={index}
                                                  value={item[1]}
                                                  bsSize="sm"
                                                  type="text"
                                                  style={{
                                                    marginBottom: "15px",
                                                  }}
                                                  name="instituate_name"
                                                  id="input-s"
                                                  placeholder="Enter Institute Name"
                                                  onChange={(val) => {
                                                    item[1] = val.target.value;
                                                    setrefresh(!refresh);
                                                  }}
                                                />
                                              )
                                            )}
                                          </Col>

                                          <Col lg={1} md={3} sm={3}>
                                            <Label className="header-child">
                                              Degree{" "}
                                              <span className="manadatory">
                                                *
                                              </span>
                                            </Label>
                                            {education_info.map(
                                              (item, index) => (
                                                <Input
                                                  className="form-control d-block from control-md"
                                                  key={index}
                                                  value={item[2]}
                                                  bsSize="sm"
                                                  type="text"
                                                  style={{
                                                    marginBottom: "15px",
                                                  }}
                                                  name="degree_name"
                                                  id="input-s"
                                                  placeholder="Enter Degree"
                                                  onChange={(val) => {
                                                    item[2] = val.target.value;
                                                    setrefresh(!refresh);
                                                  }}
                                                />
                                              )
                                            )}
                                          </Col>

                                          <Col lg={2} md={3} sm={3}>
                                            <Label className="header-child">
                                              Percentage/ CGPA{" "}
                                              <span className="manadatory">
                                                *
                                              </span>
                                            </Label>
                                            {education_info.map(
                                              (item, index) => (
                                                <Input
                                                  className="form-control d-block from control-md"
                                                  key={index}
                                                  value={item[3]}
                                                  bsSize="sm"
                                                  type="number"
                                                  min={0}
                                                  step={0.1}
                                                  style={{
                                                    marginBottom: "15px",
                                                  }}
                                                  name="percentage"
                                                  id="input-s"
                                                  placeholder="Enter Percentage"
                                                  onChange={(val) => {
                                                    item[3] = val.target.value;
                                                    setrefresh(!refresh);
                                                  }}
                                                />
                                              )
                                            )}
                                          </Col>

                                          <Col lg={2} md={3} sm={3}>
                                            <Label className="header-child">
                                              Passing Year{" "}
                                              <span className="manadatory">
                                                *
                                              </span>
                                            </Label>
                                            {education_info.map(
                                              (item, index) => (
                                                <Input
                                                  className="form-control d-block from control-md"
                                                  key={index}
                                                  value={item[4]}
                                                  bsSize="sm"
                                                  type="date"
                                                  style={{
                                                    marginBottom: "15px",
                                                  }}
                                                  name="passing_year"
                                                  id="input-s"
                                                  onChange={(val) => {
                                                    item[4] = val.target.value;
                                                    setrefresh(!refresh);
                                                  }}
                                                />
                                              )
                                            )}
                                          </Col>
                                          <Col lg={2} md={3} sm={3}>
                                            <Label className="header-child">
                                              Document
                                              <span className="manadatory">
                                                *
                                              </span>
                                            </Label>

                                            {education_info.map(
                                              (item, index) => {
                                                // console.log(
                                                //   "index------------",
                                                //   index
                                                // );
                                                let get_doc =
                                                item[5] !== "" &&
                                                  item[5].split("/");
                                                let get_doc_name =
                                                  get_doc !== "" &&
                                                  get_doc[get_doc?.length - 1];
                                                return (
                                                  <div
                                                    key={index}
                                                    style={{ width: "100%" }}
                                                  >
                                                    {updaet_qualification ? (
                                                      <>
                                                        <div
                                                          style={{
                                                            display: "flex",
                                                          }}
                                                        >
                                                          <button
                                                            type="button"
                                                            style={{
                                                              width: "35%",
                                                              // border: "none",
                                                              border:
                                                                " 0.1px solid gray",
                                                              borderRight:
                                                                "none",
                                                              fontSize: "10px",
                                                              height: "26px",
                                                              fontWeight: "540",
                                                              color: "gray",
                                                            }}
                                                            onClick={() => {
                                                              alert(index);
                                                              setid_index(
                                                                index
                                                              );
                                                              handlebtnClick(
                                                                item
                                                              );
                                                            }}
                                                          >
                                                            Update
                                                          </button>
                                                          <input
                                                            value={get_doc_name}
                                                            disabled
                                                            style={{
                                                              marginBottom:
                                                                "16.5px",
                                                              width: "75%",
                                                              fontSize:
                                                                "10.5px",
                                                              height: "26px",
                                                              border:
                                                                "0.1px solid gray",
                                                              borderLeft:
                                                                "0.1px solid black",
                                                            }}
                                                          />
                                                          <input
                                                            ref={fileInputRef4}
                                                            type="file"
                                                            style={{
                                                              display: "none",
                                                            }}
                                                            accept=".pdf"
                                                            onChange={(e) => {
                                                              handleFileChangeDoc(
                                                                e,
                                                                item
                                                              );
                                                            }}
                                                          />
                                                          {item[5] && (
                                                          <span 
                                                            style={{
                                                              marginLeft: "8px",
                                                            }}
                                                          >
                                                            {" "}
                                                            <a
                                                              href={`${item[5]}`}
                                                              target="_blank"
                                                              rel="noopener noreferrer"
                                                            >
                                                              <BsFillFileEarmarkPdfFill
                                                                size={26}
                                                              />{" "}
                                                            </a>
                                                          </span>
                                                          )}
                                                        </div>
                                                      </>
                                                    ) : (
                                                      <Input
                                                        className="form-control d-block from control-md"
                                                        bsSize="sm"
                                                        type="file"
                                                        style={{
                                                          marginBottom: "15px",
                                                        }}
                                                        name="degree_doc"
                                                        id="input-s"
                                                        accept=".pdf"
                                                        onChange={(event) => {
                                                          const file =
                                                            event.target
                                                              .files[0];

                                                          if (
                                                            file &&
                                                            file.type ===
                                                              "application/pdf"
                                                          ) {
                                                            const reader =
                                                              new FileReader();

                                                            reader.onload =
                                                              () => {
                                                                const base64Url =
                                                                  reader.result;
                                                                item[5] =
                                                                  base64Url; // Set the value at index 5 in the 'item' directly
                                                                setrefresh(
                                                                  !refresh
                                                                );
                                                              };

                                                            reader.readAsDataURL(
                                                              file
                                                            );
                                                          } else {
                                                            // Handle invalid file type error
                                                            console.log(
                                                              "Please select a PDF file."
                                                            );
                                                          }
                                                        }}
                                                      />
                                                    )}
                                                  </div>
                                                );
                                              }
                                            )}
                                          </Col>
                                          {/* //----Delete---/// */}
                                          <Col lg={1} md={1} sm={1}>
                                            <div className="mb-3">
                                              {education_info.length > 1 ? (
                                                <Label className="header-child">
                                                  Delete
                                                </Label>
                                              ) : null}
                                              {education_info.map(
                                                (item, index) => (
                                                  <IconContext.Provider
                                                    key={index}
                                                    value={{
                                                      className:
                                                        "icon multi-input",
                                                    }}
                                                  >
                                                    {education_info.length >
                                                    1 ? (
                                                      <div
                                                        className="mb-2 mt-2"
                                                        onClick={() => {
                                                          delete_edu(item);
                                                        }}
                                                      >
                                                        <MdDeleteForever
                                                          size={20}
                                                          style={{
                                                            justifyContent:
                                                              "center",
                                                            color: "red",
                                                            cursor: "pointer",
                                                            marginBottom:
                                                              "15px",
                                                          }}
                                                        />
                                                      </div>
                                                    ) : null}
                                                  </IconContext.Provider>
                                                )
                                              )}
                                            </div>
                                          </Col>

                                          <div>
                                            <span
                                              className="link-text"
                                              onClick={() => {
                                                // const lastItem = document[document.length - 1];
                                                // const docType = lastItem[0];
                                                // const certNo = lastItem[1];

                                                // let allFilled = lastItem
                                                //   .slice(0, 2)
                                                //   .every((val) => val.toString() !== "");

                                                // if (allFilled) {
                                                //   if (
                                                //     (docType === "Pan Card" &&
                                                //       certNo.length !== 10) ||
                                                //     (docType === "Aadhar Card" &&
                                                //       certNo.length !== 12)
                                                //   ) {
                                                //     if (docType === "Pan Card") {
                                                //       alert(
                                                //         "Certificate No should have 10 digits for Pan Card."
                                                //       );
                                                //     } else if (docType === "Aadhar Card") {
                                                //       alert(
                                                //         "Certificate No should have 12 digits for Aadhar Card."
                                                //       );
                                                //     }
                                                //   } else {
                                                add_another_edu();
                                                // }
                                                // } else {
                                                //   alert("All fields are required.");
                                                // }
                                              }}
                                            >
                                              <IconContext.Provider
                                                value={{
                                                  className: "icon",
                                                }}
                                              >
                                                <MdAdd />
                                              </IconContext.Provider>
                                              Add Another
                                            </span>
                                          </div>
                                        </Row>
                                      </div>
                                    </CardBody>
                                  ) : null}
                                </Card>
                              </div>
                            </Col>
                          </Row>
                          <div className="m-1">
                            <Col lg={12}>
                              <div className="mb-1 footer_btn">
                                <Button
                                  type="submit"
                                  className="btn btn-success m-1 cu_btn"
                                  // onClick={() => {
                                  //   if (
                                  //     education_info[
                                  //       education_info.length - 1
                                  //     ].some((some) => some === "")
                                  //   ) {
                                  //     alert("Please Enter Education Deatils");
                                  //   } else {
                                  //   }
                                  //   setcustomActiveTab("3");
                                  // }}
                                >
                                  {updaet_qualification
                                    ? "Update & Next"
                                    : "Save & Next"}
                                </Button>
                              </div>
                            </Col>
                          </div>{" "}
                        </CardText>
                      </Col>
                    </Row>
                  </form>
                </TabPane>

                <TabPane tabId="3">
                  <Row>
                    <Col sm="12">
                      <CardText className="mb-0">
                        <form
                          onSubmit={(t) => {
                            t.preventDefault();
                            update__identifaction
                              ? update__identifaction_info()
                              : send__identification_info();
                          }}
                        >
                          <Row>
                            <Col lg={12} md={12} sm={12} xs={12}>
                              {/* Documents info */}
                              <div className="m-1">
                                <Card className="shadow bg-white rounded">
                                  <CardTitle className="mb-1 header">
                                    <div className="header-text-icon header-text">
                                      Identification Details
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
                                      <div>
                                        <Row>
                                          <Col lg={3} md={3} sm={3}>
                                            <div className="mb-3">
                                              <Label className="header-child">
                                                Document Type{" "}
                                                <span className="manadatory">
                                                  *
                                                </span>
                                              </Label>
                                              {document.map((item, index) => {
                                                return (
                                                  <select
                                                    className="form-select"
                                                    id="input-s"
                                                    key={index}
                                                    value={item[0]}
                                                    style={{
                                                      marginBottom: "15px",
                                                      height: "28px",
                                                      fontSize: "10px",
                                                    }}
                                                    bsSize="sm"
                                                    onChange={(val) => {
                                                      setdoc_type(
                                                        val.target.value
                                                      );
                                                      item[0] =
                                                        val.target.value;
                                                    }}
                                                  >
                                                    <option value="" disabled>
                                                      select status
                                                    </option>
                                                    <option value="Pan Card">
                                                      Pan Number
                                                    </option>
                                                    <option value="Aadhar Card">
                                                      Aadhar Number
                                                    </option>
                                                    <option value="Voter Card">
                                                      Voter Card
                                                    </option>
                                                  </select>
                                                );
                                              })}
                                            </div>
                                          </Col>

                                          <Col lg={3} md={3} sm={3}>
                                            <Label className="header-child">
                                              Document No{" "}
                                              <span className="manadatory">
                                                *
                                              </span>
                                            </Label>
                                            {document.map((item, index) => (
                                              <Input
                                                className="form-control d-block from control-md"
                                                key={index}
                                                value={item[1]}
                                                bsSize="sm"
                                                type="text"
                                                style={{ marginBottom: "15px" }}
                                                name="certificate_no"
                                                id="input-s"
                                                placeholder="Enter Certificate Number"
                                                onChange={(val) => {
                                                  setcertificate_no(
                                                    val.target.value
                                                  );
                                                  item[1] = val.target.value;
                                                }}
                                              />
                                            ))}
                                          </Col>
                                          <Col lg={3} md={3} sm={3}>
                                            <Label className="header-child">
                                              Document Upload{" "}
                                              <span className="manadatory">
                                                *
                                              </span>
                                            </Label>
                                            {document.map(
                                              (item, index) => {
                                                // console.log(
                                                //   "index------------",
                                                //   index
                                                // );
                                                let get_identification =
                                                item[2] !== "" 
                                                  && item[2].split("/");
                                                  let get_identification_name =
                                                  get_identification !== "" &&
                                                  get_identification[get_identification?.length - 1];
                                                return (
                                                  <div
                                                    key={index}
                                                    style={{ width: "100%" }}
                                                  >
                                                    {update__identifaction ? (
                                                      <>
                                                        <div
                                                          style={{
                                                            display: "flex",
                                                          }}
                                                        >
                                                          <button
                                                            type="button"
                                                            style={{
                                                              width: "35%",
                                                              // border: "none",
                                                              border:
                                                                " 0.1px solid gray",
                                                              borderRight:
                                                                "none",
                                                              fontSize: "10px",
                                                              height: "26px",
                                                              fontWeight: "540",
                                                              color: "gray",
                                                            }}
                                                            onClick={() => {
                                                              alert(index);
                                                              setidentification_index(
                                                                index
                                                              );
                                                              handlebtnClickIdentificationDoc(
                                                                item
                                                              );
                                                            }}
                                                          >
                                                            Update
                                                          </button>
                                                          <input
                                                            value={get_identification_name}
                                                            disabled
                                                            style={{
                                                              marginBottom:
                                                                "16.5px",
                                                              width: "75%",
                                                              fontSize:
                                                                "10.5px",
                                                              height: "26px",
                                                              border:
                                                                "0.1px solid gray",
                                                              borderLeft:
                                                                "0.1px solid black",
                                                            }}
                                                          />
                                                          <input
                                                            ref={fileInputRef5}
                                                            type="file"
                                                            style={{
                                                              display: "none",
                                                            }}
                                                            accept=".pdf"
                                                            onChange={(e) => {
                                                              handleFileChangeIdentificationDoc(
                                                                e,
                                                                item
                                                              );
                                                            }}
                                                          />

                                                          <span
                                                            style={{
                                                              marginLeft: "8px",
                                                            }}
                                                          >
                                                            {" "}
                                                            <a
                                                              href={`${item[2]}`}
                                                              target="_blank"
                                                              rel="noopener noreferrer"
                                                            >
                                                              <BsFillFileEarmarkPdfFill
                                                                size={26}
                                                              />{" "}
                                                            </a>
                                                          </span>
                                                        </div>
                                                      </>
                                                    ) : (
                                                      <Input
                                                        className="form-control d-block from control-md"
                                                        bsSize="sm"
                                                        type="file"
                                                        style={{
                                                          marginBottom: "15px",
                                                        }}
                                                        name="degree_doc"
                                                        id="input-s"
                                                        accept=".pdf"
                                                        onChange={(event) => {
                                                          const file =
                                                            event.target
                                                              .files[0];

                                                          if (
                                                            file &&
                                                            file.type ===
                                                              "application/pdf"
                                                          ) {
                                                            const reader =
                                                              new FileReader();

                                                            reader.onload =
                                                              () => {
                                                                const base64Url =
                                                                  reader.result;
                                                                item[2] =
                                                                  base64Url; // Set the value at index 2 in the 'item' directly
                                                                setrefresh(
                                                                  !refresh
                                                                );
                                                              };

                                                            reader.readAsDataURL(
                                                              file
                                                            );
                                                          } else {
                                                            // Handle invalid file type error
                                                            console.log(
                                                              "Please select a PDF file."
                                                            );
                                                          }
                                                        }}
                                                      />
                                                    )}
                                                  </div>
                                                );
                                              }
                                            )}
                                          </Col>

                                          {/* <Col lg={3} md={3} sm={3}>
                                            <Label className="header-child">
                                              Document Upload{" "}
                                              <span className="manadatory">
                                                *
                                              </span>
                                            </Label>
                                            {document.map((item, index) => (
                                              <div key={index}>
                                                {!update__identifaction && (
                                                  <Input
                                                    className="form-control d-block from control-md"
                                                    bsSize="sm"
                                                    type="file"
                                                    style={{
                                                      marginBottom: "15px",
                                                    }}
                                                    name="id_doc"
                                                    id="input-s"
                                                    accept=".pdf"
                                                    onChange={(event) => {
                                                      const file =
                                                        event.target.files[0];

                                                      if (
                                                        file &&
                                                        file.type ===
                                                          "application/pdf"
                                                      ) {
                                                        const reader =
                                                          new FileReader();

                                                        reader.onload = () => {
                                                          const base64Url =
                                                            reader.result;
                                                          item[2] = base64Url; // Set the value at index 5 in the 'item' directly
                                                          setrefresh(!refresh);
                                                        };

                                                        reader.readAsDataURL(
                                                          file
                                                        );
                                                      } else {
                                                        // Handle invalid file type error
                                                        console.log(
                                                          "Please select a PDF file."
                                                        );
                                                      }
                                                    }}
                                                  />
                                                )}

                                                {update__identifaction &&
                                                  item[2] !== "" && (
                                                    <div
                                                      style={{
                                                        display: "flex",
                                                      }}
                                                    >
                                                      <button
                                                        // style={{
                                                        //   height: "32px",
                                                        // }}
                                                        type="button"
                                                        onClick={handleIdlick}
                                                      >
                                                        {" "}
                                                        Update
                                                      </button>
                                                      <input
                                                       style={{height:"26px", marginBottom: "15px"}}
                                                        ref={fileInputRef2}
                                                        className="form-control d-block from control-md"
                                                        bsSize="sm"
                                                        type="text"                                                        
                                                        id="input-s"
                                                        name="id_doc"
                                                        disabled
                                                        value={item[2].substring(
                                                          item[2].lastIndexOf(
                                                            "/"
                                                          ) + 1
                                                        )}
                                                      />
                                                    </div>
                                                  )}
                                              </div>
                                              // <div>
                                              //   <Input
                                              //     className="form-control d-block from control-md"
                                              //     key={index}
                                              //     type="file"
                                              //     accept=".pdf"
                                              //     bsSize="sm"
                                              //     style={{
                                              //       marginBottom: "15px",
                                              //     }}
                                              //     name="file"
                                              //     id="input-s canvas"
                                              //     // onChange={(event) => {
                                              //     //   setdoc_upload(event.target.files[0]);
                                              //     //   item[2] = event.target.files[0];
                                              //     // }}

                                              //     onChange={(event) => {
                                              //       const file =
                                              //         event.target.files[0];

                                              //       if (file) {
                                              //         const fileSizeInBytes =
                                              //           file.size;
                                              //         const fileSizeInKB =
                                              //           fileSizeInBytes / 1024;

                                              //         if (fileSizeInKB > 300) {
                                              //           alert(
                                              //             "File size is greater than 300KB"
                                              //           );
                                              //           return;
                                              //         }

                                              //         if (
                                              //           file.type ===
                                              //             "image/jpeg" ||
                                              //           file.type ===
                                              //             "image/png"
                                              //         ) {
                                              //           // setfile_type(true);
                                              //           alert(
                                              //             "File type image "
                                              //           );
                                              //           // Handle image file
                                              //           new Compressor(file, {
                                              //             quality: 0.9,
                                              //             maxWidth:
                                              //               file.width * 0.9,
                                              //             maxHeight:
                                              //               file.height * 0.9,
                                              //             success(result) {
                                              //               const reader =
                                              //                 new FileReader();
                                              //               reader.onload =
                                              //                 () => {
                                              //                   const base64Url =
                                              //                     reader.result;
                                              //                   console.log(
                                              //                     "Compressed image size:",
                                              //                     base64Url
                                              //                   );
                                              //                   console.log(
                                              //                     base64Url
                                              //                   );
                                              //                   setdoc_type(
                                              //                     base64Url
                                              //                   );
                                              //                   item[2] =
                                              //                     base64Url;
                                              //                   setrefresh(
                                              //                     !refresh
                                              //                   );
                                              //                 };
                                              //               reader.readAsDataURL(
                                              //                 result
                                              //               );
                                              //             },
                                              //             error(err) {
                                              //               console.error(
                                              //                 "Image compression error:",
                                              //                 err
                                              //               );
                                              //             },
                                              //           });
                                              //         } else if (
                                              //           file.type ===
                                              //           "application/pdf"
                                              //         ) {
                                              //           alert(
                                              //             "File Type is PDF"
                                              //           );
                                              //           // Handle PDF file
                                              //           const reader =
                                              //             new FileReader();

                                              //           reader.onload = () => {
                                              //             // const base64String = reader.result.split(",")[1];
                                              //             const base64String =
                                              //               reader.result;

                                              //             console.log(
                                              //               "Base64 String:",
                                              //               base64String
                                              //             );
                                              //             setdoc_type(
                                              //               base64String
                                              //             );
                                              //             item[2] =
                                              //               base64String;
                                              //             setrefresh(!refresh);
                                              //             // Perform further processing with the base64String if needed
                                              //           };
                                              //           reader.readAsDataURL(
                                              //             file
                                              //           );
                                              //         } else {
                                              //           alert(
                                              //             "Unsupported file type"
                                              //           );
                                              //         }
                                              //       }
                                              //     }}
                                              //   />
                                              // </div>
                                            ))}
                                          </Col> */}

                                          {/* //----Delete---/// */}
                                          <Col lg={1} md={1} sm={1}>
                                            <div className="mb-3">
                                              {document.length > 1 ? (
                                                <Label className="header-child">
                                                  Delete
                                                </Label>
                                              ) : null}
                                              {document.map((item, index) => (
                                                <IconContext.Provider
                                                  key={index}
                                                  value={{
                                                    className:
                                                      "icon multi-input",
                                                  }}
                                                >
                                                  {document.length > 1 ? (
                                                    <div
                                                      className="mb-2 mt-2"
                                                      onClick={() => {
                                                        delete_document(item);
                                                      }}
                                                    >
                                                      <MdDeleteForever
                                                        size={20}
                                                        style={{
                                                          justifyContent:
                                                            "center",
                                                          color: "red",
                                                          cursor: "pointer",
                                                          marginBottom: "15px",
                                                        }}
                                                      />
                                                    </div>
                                                  ) : null}
                                                </IconContext.Provider>
                                              ))}
                                            </div>
                                          </Col>

                                          <div>
                                            <span
                                              className="link-text"
                                              onClick={() => {
                                                const lastItem =
                                                  document[document.length - 1];
                                                const docType = lastItem[0];
                                                const certNo = lastItem[1];

                                                let allFilled = lastItem
                                                  .slice(0, 2)
                                                  .every(
                                                    (val) =>
                                                      val.toString() !== ""
                                                  );

                                                if (allFilled) {
                                                  if (
                                                    (docType === "Pan Card" &&
                                                      certNo.length !== 10) ||
                                                    (docType ===
                                                      "Aadhar Card" &&
                                                      certNo.length !== 12)
                                                  ) {
                                                    if (
                                                      docType === "Pan Card"
                                                    ) {
                                                      alert(
                                                        "Certificate No should have 10 digits for Pan Card."
                                                      );
                                                    } else if (
                                                      docType === "Aadhar Card"
                                                    ) {
                                                      alert(
                                                        "Certificate No should have 12 digits for Aadhar Card."
                                                      );
                                                    }
                                                  } else {
                                                    addDocument();
                                                  }
                                                } else {
                                                  alert(
                                                    "All fields are required."
                                                  );
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
                                              Add Another
                                            </span>
                                          </div>
                                        </Row>
                                      </div>
                                    </CardBody>
                                  ) : null}
                                </Card>
                              </div>
                            </Col>
                          </Row>
                          <div className="m-1">
                            <Col lg={12}>
                              <div className="mb-1 footer_btn">
                                <Button
                                  type="submit"
                                  className="btn btn-success m-1 cu_btn"
                                >
                                  {update__identifaction
                                    ? "Update & Next "
                                    : "Save & Next"}
                                </Button>
                              </div>
                            </Col>
                          </div>{" "}
                        </form>
                      </CardText>
                    </Col>
                  </Row>
                </TabPane>

                <TabPane tabId="4">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      {
                        update_address_info
                          ? update_address()
                          : send_address_data();
                      }
                    }}
                  >
                    <Row>
                      <Col sm="12">
                        <CardText className="mb-0">
                          <Row>
                            <Col lg={12} md={12} sm={12} xs={12}>
                              {/* Address info */}
                              <div className="m-1">
                                <Col lg={12}>
                                  <Card className="shadow bg-white rounded">
                                    <CardTitle className="mb-1">
                                      <div className="btn-header">
                                        <div className="btn-subheader">
                                          <div
                                            style={{
                                              background:
                                                active_tab == "first"
                                                  ? "#C4D7FE"
                                                  : null,
                                            }}
                                            className="btn1 footer-text"
                                            value="first"
                                            onClick={() => {
                                              setactive_tab("first");
                                            }}
                                          >
                                            Residental Address
                                          </div>

                                          <div
                                            style={{
                                              background:
                                                active_tab == "second"
                                                  ? "#C4D7FE"
                                                  : null,
                                              color: bill_color ? "red" : null,
                                            }}
                                            className="btn1 footer-text"
                                            value="second"
                                            onClick={() => {
                                              setactive_tab("second");
                                            }}
                                          >
                                            Permanent Address
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
                                            /*permanent address*/
                                            <Row>
                                              <div style={{ display: "flex" }}>
                                                <Label className="add">
                                                  *IF PERMANENT ADDRESS IS SAME
                                                  AS RESIDENTIAL ADDRESS{" "}
                                                </Label>
                                                <Input
                                                  style={{
                                                    width: "15px",
                                                    margin: "-1px 5px 5px 5px",
                                                  }}
                                                  type="checkbox"
                                                  onChange={() => {
                                                    setsame_as_permanent_add(
                                                      !same_as_permanent_add
                                                    );
                                                  }}
                                                  checked={
                                                    same_as_permanent_add
                                                  }
                                                />
                                              </div>
                                              <Col lg={4} md={6} sm={6}>
                                                <div className="mb-3">
                                                  <Label className="header-child">
                                                    Address Line 1:*
                                                  </Label>
                                                  <Input
                                                    value={temporary_add_line1}
                                                    onChange={(val) => {
                                                      settemporary_add_line1(
                                                        val.target.value
                                                      );
                                                    }}
                                                    onBlur={() => {
                                                      if (
                                                        temporary_add_line1 ===
                                                        ""
                                                      ) {
                                                        settemporary_add1_err(
                                                          true
                                                        );
                                                      }
                                                    }}
                                                    invalid={temporary_add1_err}
                                                    type="text"
                                                    className="form-control-md"
                                                    id="input"
                                                    name="temporary_add_line1"
                                                    placeholder="Enter Address Line1"
                                                  />
                                                  <div
                                                    className="mt-1 error-text"
                                                    color="danger"
                                                  >
                                                    {temporary_add1_err
                                                      ? "Address field is required"
                                                      : null}
                                                  </div>
                                                </div>
                                              </Col>

                                              <Col lg={4} md={6} sm={6}>
                                                <div className="mb-3">
                                                  <Label className="header-child">
                                                    Address Line 2
                                                  </Label>
                                                  <Input
                                                    onChange={(val) => {
                                                      settemporary_add_line2(
                                                        val.target.value
                                                      );
                                                    }}
                                                    value={temporary_add_line2}
                                                    type="text"
                                                    className="form-control-md"
                                                    id="input"
                                                    name="temporary_add_line2"
                                                    placeholder="Enter Address Line2"
                                                  />
                                                </div>
                                              </Col>

                                              <Col lg={4} md={6} sm={6}>
                                                <div className="mb-3">
                                                  <Label className="header-child">
                                                    State*
                                                  </Label>
                                                  <span
                                                    onClick={() =>
                                                      setby_pincode(false)
                                                    }
                                                  >
                                                    <SearchInput
                                                      data_list={state_list_s}
                                                      setdata_list={
                                                        setstate_list_s
                                                      }
                                                      data_item_s={
                                                        temporary_state
                                                      }
                                                      set_data_item_s={
                                                        settemporary_state
                                                      }
                                                      set_id={
                                                        settemporary_state_id
                                                      }
                                                      page={
                                                        permanent_state_page
                                                      }
                                                      setpage={
                                                        setpermanent_state_page
                                                      }
                                                      setsearch_item={
                                                        setpermanent_state_search_item
                                                      }
                                                      error_message={
                                                        "Please Select Any State"
                                                      }
                                                      error_s={state_error}
                                                      loaded={
                                                        permanent_state_loaded
                                                      }
                                                      count={
                                                        permanent_state_count
                                                      }
                                                      bottom={
                                                        permanent_state_bottom
                                                      }
                                                      setbottom={
                                                        setpermanent_state_bottom
                                                      }
                                                    />
                                                  </span>
                                                  {/* <div className="mt-1 error-text" color="danger">
                                {state_error ? "Please Select Any State" : null}
                              </div> */}
                                                </div>
                                              </Col>

                                              <Col lg={4} md={6} sm={6}>
                                                <div className="mb-3">
                                                  <Label className="header-child">
                                                    City*
                                                  </Label>
                                                  <SearchInput
                                                    data_list={
                                                      temporary_city_list
                                                    }
                                                    setdata_list={
                                                      settemporary_city_list
                                                    }
                                                    data_item_s={temporary_city}
                                                    set_data_item_s={
                                                      settemporary_city
                                                    }
                                                    set_id={
                                                      settemporary_city_id
                                                    }
                                                    page={city_page}
                                                    setpage={setcity_page}
                                                    search_item={
                                                      city_search_item
                                                    }
                                                    setsearch_item={
                                                      setcity_search_item
                                                    }
                                                    error_message={
                                                      "Please Select Any City"
                                                    }
                                                    error_s={city_error}
                                                  />
                                                  {/* <div className="mt-1 error-text" color="danger">
                                {city_error ? "Please Select Any City" : null}
                              </div> */}
                                                </div>
                                              </Col>

                                              <Col lg={4} md={6} sm={6}>
                                                {temporary_pincode_loaded ? (
                                                  <div className="mb-3">
                                                    <Label className="header-child">
                                                      Pin Code*
                                                    </Label>

                                                    <SearchInput
                                                      data_list={
                                                        temporary_pincode_list
                                                      }
                                                      setdata_list={
                                                        settemporary_pincode_list
                                                      }
                                                      data_item_s={
                                                        temporary_pincode
                                                      }
                                                      set_data_item_s={
                                                        settemporary_pincode
                                                      }
                                                      set_id={
                                                        settemporary_pincode_id
                                                      }
                                                      page={pincode_page}
                                                      setpage={setpincode_page}
                                                      search_item={
                                                        pincode_search_item
                                                      }
                                                      setsearch_item={
                                                        setpincode_search_item
                                                      }
                                                      error_message={
                                                        "Please add Code"
                                                      }
                                                      error_s={pincode_error}
                                                    />
                                                  </div>
                                                ) : (
                                                  <div className="mb-3">
                                                    <Label className="header-child">
                                                      Pin Code*:
                                                    </Label>
                                                    <Input
                                                      onChange={(val) => {
                                                        settemporary_pincode(
                                                          val.target.value
                                                        );
                                                        if (
                                                          val.target.value
                                                            .length !== 0
                                                        ) {
                                                          setpincode_error(
                                                            false
                                                          );
                                                          if (
                                                            val.target.value
                                                              .length === 6
                                                          ) {
                                                            setpincode_error2(
                                                              false
                                                            );
                                                          } else {
                                                            setpincode_error2(
                                                              true
                                                            );
                                                          }
                                                        } else {
                                                          setpincode_error(
                                                            true
                                                          );
                                                        }
                                                      }}
                                                      onBlur={() => {
                                                        if (
                                                          temporary_pincode.length ===
                                                          0
                                                        ) {
                                                          setpincode_error(
                                                            true
                                                          );
                                                        } else {
                                                          if (
                                                            temporary_pincode.length !==
                                                            6
                                                          ) {
                                                            setpincode_error(
                                                              false
                                                            );
                                                            setpincode_error2(
                                                              true
                                                            );
                                                          } else {
                                                            getPincode(
                                                              temporary_pincode,
                                                              "pincode",
                                                              "temporary_city"
                                                            );
                                                            setpincode_error2(
                                                              false
                                                            );
                                                            setby_pincode(true);
                                                          }
                                                        }
                                                      }}
                                                      value={temporary_pincode}
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

                                              {/* <Col lg={4} md={6} sm={6}>
                                                {temporary_pincode_loaded && (
                                                  <div className="mb-3">
                                                    <Label className="header-child">
                                                      Locality*:
                                                    </Label>

                                                    <SearchInput
                                                      data_list={
                                                        temporary_locality_list
                                                      }
                                                      setdata_list={
                                                        settemporary_locality_list
                                                      }
                                                      data_item_s={
                                                        temporary_locality
                                                      }
                                                      set_data_item_s={
                                                        settemporary_locality
                                                      }
                                                      set_id={
                                                        settemporary_locality_id
                                                      }
                                                      page={locality_page}
                                                      setpage={setlocality_page}
                                                      setsearch_item={
                                                        setlocality_search_item
                                                      }
                                                      error_message={
                                                        "Select Locality"
                                                      }
                                                      error_s={local_err}
                                                    />
                                                  </div>
                                                )}
                                              </Col> */}
                                            </Row>
                                          ) : null}

                                          {active_tab == "second" ? (
                                            // temporary address
                                            <Row>
                                              <Col lg={4} md={6} sm={6}>
                                                <div className="mb-3">
                                                  <Label className="header-child">
                                                    Address Line 1:*
                                                  </Label>
                                                  <Input
                                                    value={permanent_add_line1}
                                                    onChange={(val) => {
                                                      setpermanent_add_line1(
                                                        val.target.value
                                                      );
                                                    }}
                                                    onBlur={() => {
                                                      if (
                                                        permanent_add_line1 ===
                                                        ""
                                                      )
                                                        setpermanent_add1_err(
                                                          true
                                                        );
                                                    }}
                                                    invalid={permanent_add1_err}
                                                    type="text"
                                                    className="form-control-md"
                                                    id="input"
                                                    name="permanent_add_line1"
                                                    placeholder="Enter Address Line1"
                                                  />
                                                  <div
                                                    className="mt-1 error-text"
                                                    color="danger"
                                                  >
                                                    {permanent_add1_err
                                                      ? "Address Field  is required"
                                                      : null}
                                                  </div>
                                                </div>
                                              </Col>

                                              <Col lg={4} md={6} sm={6}>
                                                <div className="mb-3">
                                                  <Label className="header-child">
                                                    Address Line 2
                                                  </Label>
                                                  <Input
                                                    onChange={(val) => {
                                                      setpermanent_add_line2(
                                                        val.target.value
                                                      );
                                                    }}
                                                    value={permanent_add_line2}
                                                    type="text"
                                                    className="form-control-md"
                                                    id="input"
                                                    name="permanent_add_line2"
                                                    placeholder="Enter Address Line2"
                                                  />
                                                </div>
                                              </Col>

                                              <Col lg={4} md={6} sm={6}>
                                                <div className="mb-3">
                                                  <Label className="header-child">
                                                    State*:
                                                  </Label>
                                                  <span
                                                    onClick={() =>
                                                      setby_pincode(false)
                                                    }
                                                  >
                                                    <SearchInput
                                                      data_list={state_list_s}
                                                      setdata_list={
                                                        setstate_list_s
                                                      }
                                                      data_item_s={
                                                        permanent_state
                                                      }
                                                      set_data_item_s={
                                                        setpermanent_state
                                                      }
                                                      set_id={
                                                        setpermanent_state_id
                                                      }
                                                      page={
                                                        permanent_state_page
                                                      }
                                                      setpage={
                                                        setpermanent_state_page
                                                      }
                                                      setsearch_item={
                                                        setpermanent_state_search_item
                                                      }
                                                      error_message={
                                                        "Please Select Any State"
                                                      }
                                                      error_s={state_error1}
                                                    />
                                                  </span>
                                                  {/* <div className="mt-1 error-text" color="danger">
                                  {state_error ? "Please Select Any State" : null}
                                </div> */}
                                                </div>
                                              </Col>

                                              <Col lg={4} md={6} sm={6}>
                                                <div className="mb-3">
                                                  <Label className="header-child">
                                                    City*:
                                                  </Label>
                                                  <SearchInput
                                                    data_list={
                                                      permanent_city_list
                                                    }
                                                    setdata_list={
                                                      setpermanent_city_list
                                                    }
                                                    data_item_s={permanent_city}
                                                    set_data_item_s={
                                                      setpermanent_city
                                                    }
                                                    set_id={
                                                      setpermanent_city_id
                                                    }
                                                    page={permanent_city_page}
                                                    setpage={
                                                      setpermanent_city_page
                                                    }
                                                    search_item={
                                                      permanent_city_search_item
                                                    }
                                                    setsearch_item={
                                                      setpermanent_city_search_item
                                                    }
                                                    error_message={
                                                      "Please Select Any City"
                                                    }
                                                    error_s={city_error1}
                                                  />
                                                  {/* <div className="mt-1 error-text" color="danger">
                                  {city_error ? "Please Select Any City" : null}
                                </div> */}
                                                </div>
                                              </Col>

                                              <Col lg={4} md={6} sm={6}>
                                                {permanent_pincode_loaded ? (
                                                  <div className="mb-3">
                                                    <Label className="header-child">
                                                      Pin Code*:
                                                    </Label>

                                                    <SearchInput
                                                      data_list={
                                                        permanent_pincode_list
                                                      }
                                                      setdata_list={
                                                        setpermanent_pincode_list
                                                      }
                                                      data_item_s={
                                                        permanent_pincode
                                                      }
                                                      set_data_item_s={
                                                        setpermanent_pincode
                                                      }
                                                      set_id={
                                                        setpermanent_pincode_id
                                                      }
                                                      page={
                                                        permanent_pincode_page
                                                      }
                                                      setpage={
                                                        setpermanent_pincode_page
                                                      }
                                                      setsearch_item={
                                                        setpermanent_pincode_search_item
                                                      }
                                                      error_message={
                                                        "Please Add Pin Code"
                                                      }
                                                      error_s={pincode_error2}
                                                    />
                                                  </div>
                                                ) : (
                                                  <div className="mb-3">
                                                    <Label className="header-child">
                                                      Pin Code*:
                                                    </Label>
                                                    <Input
                                                      onChange={(val) => {
                                                        setpermanent_pincode(
                                                          val.target.value
                                                        );
                                                        if (
                                                          val.target.value
                                                            .length !== 0
                                                        ) {
                                                          setpincode_error(
                                                            false
                                                          );
                                                          if (
                                                            val.target.value
                                                              .length === 6
                                                          ) {
                                                            setpincode_error2(
                                                              false
                                                            );
                                                          } else {
                                                            setpincode_error2(
                                                              true
                                                            );
                                                          }
                                                        } else {
                                                          setpincode_error(
                                                            true
                                                          );
                                                        }
                                                      }}
                                                      onBlur={() => {
                                                        if (
                                                          permanent_pincode.length ===
                                                          0
                                                        ) {
                                                          setpincode_error(
                                                            true
                                                          );
                                                        } else {
                                                          if (
                                                            permanent_pincode.length !==
                                                            6
                                                          ) {
                                                            setpincode_error(
                                                              false
                                                            );
                                                            setpincode_error2(
                                                              true
                                                            );
                                                          } else {
                                                            getPincode(
                                                              permanent_pincode,
                                                              "pincode",
                                                              "permanent_city"
                                                            );
                                                            setpincode_error2(
                                                              false
                                                            );
                                                            setby_pincode(true);
                                                          }
                                                        }
                                                      }}
                                                      value={permanent_pincode}
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

                                              {/* <Col lg={4} md={6} sm={6}>
                                                {permanent_pincode_loaded && (
                                                  <div className="mb-3">
                                                    <Label className="header-child">
                                                      Locality*:
                                                    </Label>
                                                    <SearchInput
                                                      data_list={
                                                        permanent_locality_list
                                                      }
                                                      setdata_list={
                                                        setpermanent_locality_list
                                                      }
                                                      data_item_s={
                                                        permanent_locality
                                                      }
                                                      set_data_item_s={
                                                        setpermanent_locality
                                                      }
                                                      set_id={
                                                        setpermanent_locality_id
                                                      }
                                                      page={
                                                        permanent_locality_page
                                                      }
                                                      setpage={
                                                        setpermanent_locality_page
                                                      }
                                                      setsearch_item={
                                                        setpermanent_locality_search_item
                                                      }
                                                      error_message={
                                                        "Select locality"
                                                      }
                                                      error_s={local_err2}
                                                    />
                                                  </div>
                                                )}
                                              </Col> */}
                                            </Row>
                                          ) : null}
                                        </Row>
                                      </CardBody>
                                    ) : null}
                                  </Card>
                                </Col>
                              </div>

                              <div>
                                <Card className="shadow bg-white rounded">
                                  <CardTitle className="mb-1 header">
                                    <div className="header-text-icon header-text">
                                      Emergency Contact
                                    </div>
                                  </CardTitle>
                                  <CardBody>
                                    <Row>
                                      <Col lg={4} md={6} sm={6}>
                                        <div className="mb-3">
                                          <Label className="header-child">
                                            Name*{" "}
                                          </Label>
                                          <Input
                                            value={emergency_name}
                                            onChange={(val) => {
                                              setemergency_name(
                                                val.target.value
                                              );
                                            }}
                                            type="text"
                                            className="form-control-md"
                                            id="input"
                                            name="name"
                                            placeholder="Enter Name"
                                          />
                                        </div>
                                      </Col>

                                      <Col lg={4} md={6} sm={6}>
                                        <div className="mb-3">
                                          <Label className="header-child">
                                            Relationship*{" "}
                                          </Label>
                                          <Input
                                            value={emergency_relation}
                                            onChange={(val) => {
                                              setemergency_relation(
                                                val.target.value
                                              );
                                            }}
                                            type="text"
                                            className="form-control-md"
                                            id="input"
                                            name="relationship"
                                            placeholder="Enter relationship"
                                          />
                                        </div>
                                      </Col>

                                      <Col lg={4} md={6} sm={6}>
                                        <div className="mb-3">
                                          <Label className="header-child">
                                            Phone Number*{" "}
                                          </Label>
                                          <Input
                                            value={emergency_phone}
                                            onChange={(val) => {
                                              setemergency_phone(
                                                val.target.value
                                              );
                                            }}
                                            type="text"
                                            className="form-control-md"
                                            id="input"
                                            name="number"
                                            placeholder="Enter number"
                                          />
                                        </div>
                                      </Col>
                                    </Row>{" "}
                                  </CardBody>
                                </Card>
                              </div>
                            </Col>
                          </Row>
                          {/* fotter btn */}
                          <div className="m-1">
                            <Col lg={12}>
                              <div className="mb-1 footer_btn">
                                <Button
                                  type="submit"
                                  className="btn btn-success m-1 cu_btn"
                                  onClick={() => {
                                    setcustomActiveTab("4");
                                  }}
                                >
                                  {update_address_info
                                    ? "Update & Next"
                                    : "Save & Next"}
                                </Button>
                              </div>
                            </Col>
                          </div>{" "}
                        </CardText>
                      </Col>
                    </Row>
                  </form>
                </TabPane>

                <TabPane tabId="5">
                  <Row>
                    <Col sm="12">
                      <CardText className="mb-0">
                        <form
                          onSubmit={(u) => {
                            u.preventDefault();
                            {
                              update_bank_info
                                ? update_bank()
                                : send__bank_info();
                            }
                            // send__bank_info()
                          }}
                        >
                          <Row>
                            <Col lg={12} md={12} sm={12} xs={12}>
                              <div className="m-1">
                                <Card className="shadow bg-white rounded">
                                  <CardTitle className="mb-1 header">
                                    <div className="header-text-icon header-text">
                                      Bank Details
                                    </div>
                                  </CardTitle>
                                  <CardBody>
                                    <Row>
                                      <Col lg={2} md={6} sm={6}>
                                        <div className="mb-3">
                                          <Label className="header-child">
                                            IFSC Code
                                            <span className="mandatory">*</span>
                                          </Label>
                                          <Input
                                            value={ifsc_code}
                                            onChange={(val) => {
                                              setifsc_code(val.target.value);
                                            }}
                                            type="text"
                                            className="form-control-md"
                                            id="input"
                                            name="ifsc_code"
                                            placeholder="Enter IFSC Code"
                                          />
                                        </div>
                                      </Col>

                                      <Col lg={3} md={6} sm={6}>
                                        <div className="mb-3">
                                          <Label className="header-child">
                                            Bank Name
                                            <span className="mandatory">*</span>
                                          </Label>
                                          <Input
                                            value={name_of_bank}
                                            onChange={(val) => {
                                              setname_of_bank(val.target.value);
                                            }}
                                            type="text"
                                            className="form-control-md"
                                            id="input"
                                            name="name_of_bank"
                                            placeholder="Enter Bank Name"
                                          />
                                        </div>
                                      </Col>
                                      <Col lg={3} md={6} sm={6}>
                                        <div className="mb-3">
                                          <Label className="header-child">
                                            Branch Name
                                            <span className="mandatory">*</span>
                                          </Label>
                                          <Input
                                            value={branch}
                                            onChange={(val) => {
                                              setbranch(val.target.value);
                                            }}
                                            type="text"
                                            className="form-control-md"
                                            id="input"
                                            name="branch"
                                            placeholder="Enter Branch Name"
                                          />
                                        </div>
                                      </Col>

                                      <Col lg={4} md={6} sm={6}>
                                        <div className="mb-3">
                                          <Label className="header-child">
                                            Branch Address
                                            <span className="mandatory">*</span>
                                          </Label>
                                          <Input
                                            value={bank_address}
                                            onChange={(val) => {
                                              setbank_address(val.target.value);
                                            }}
                                            type="text"
                                            className="form-control-md"
                                            id="input"
                                            name="branch_address"
                                            placeholder="Enter Branch Address"
                                          />
                                        </div>
                                      </Col>

                                      <Col lg={2} md={6} sm={6}>
                                        <div className="mb-3">
                                          <Label className="header-child">
                                            Account Number
                                            <span className="mandatory">*</span>
                                          </Label>
                                          <Input
                                            value={bank_account}
                                            onChange={(val) => {
                                              setbank_account(val.target.value);
                                            }}
                                            type="number"
                                            min={0}
                                            className="form-control-md"
                                            id="input"
                                            name="bank_account"
                                            placeholder="Enter Account Number"
                                          />
                                        </div>
                                      </Col>

                                      <Col lg={3} md={6} sm={6}>
                                        <div className="mb-3">
                                          <Label className="header-child">
                                            A/c Holder Name
                                            <span className="mandatory">*</span>
                                          </Label>
                                          <Input
                                            value={account_holdername}
                                            onChange={(val) => {
                                              setaccount_holdername(
                                                val.target.value
                                              );
                                            }}
                                            type="text"
                                            className="form-control-md"
                                            id="input"
                                            name="account_holdername"
                                            placeholder="Enter Account Holder  Name"
                                          />
                                        </div>
                                      </Col>
                                    </Row>{" "}
                                  </CardBody>
                                </Card>
                              </div>
                            </Col>
                          </Row>
                          {/* fotter btn */}
                          <div className="m-1">
                            <Col lg={12}>
                              <div className="mb-1 footer_btn">
                                <Button
                                  type="submit"
                                  className="btn btn-success m-1 cu_btn"
                                  onClick={() => {
                                    setcustomActiveTab("5");
                                  }}
                                >
                                  {update_bank_info
                                    ? "Update & Next"
                                    : "Save & Next"}
                                </Button>
                              </div>
                            </Col>
                          </div>{" "}
                        </form>
                      </CardText>
                    </Col>
                  </Row>
                </TabPane>

                <TabPane tabId="6">
                  <Row>
                    <Col sm="12">
                      <CardText className="mb-0">
                        <form
                          onSubmit={(i) => {
                            i.preventDefault();
                            {
                              update__Experience
                                ? update__experience_info()
                                : send__Experience_info();
                            }
                          }}
                        >
                          <Row>
                            <Col lg={12} md={12} sm={12} xs={12}>
                              <div className="m-1">
                                <Card className="shadow bg-white rounded">
                                  <CardTitle className="mb-1 header">
                                    <div className="header-text-icon header-text">
                                      Work Experience
                                    </div>
                                  </CardTitle>
                                  <CardBody>
                                    <Row>
                                      <Col lg={1} md={4} sm={12}>
                                        <div className="mb-3">
                                          <Label className="header-child">
                                            Title
                                            <span className="mandatory">*</span>
                                          </Label>
                                          {work_experiance_info.map(
                                            (item, index) => {
                                              return (
                                                <Input
                                                  className="form-control d-block from control-md"
                                                  key={index}
                                                  value={item[0]}
                                                  bsSize="sm"
                                                  type="text"
                                                  style={{
                                                    marginBottom: "15px",
                                                  }}
                                                  name="title"
                                                  id="input-s"
                                                  placeholder="Enter Title"
                                                  onChange={(val) => {
                                                    item[0] = val.target.value;
                                                    setrefresh(!refresh);
                                                  }}
                                                />
                                              );
                                            }
                                          )}
                                        </div>
                                      </Col>

                                      <Col lg={2} md={3} sm={3}>
                                        <div className="mb-3">
                                          <Label className="header-child">
                                            Employment Type{" "}
                                            <span className="manadatory">
                                              *
                                            </span>
                                          </Label>
                                          {work_experiance_info.map(
                                            (item, index) => {
                                              return (
                                                <div
                                                  style={{
                                                    marginBottom: "15px",
                                                    // height: "24px",
                                                    // fontSize: "10px",
                                                  }}
                                                >
                                                  <select
                                                    className="form-select"
                                                    id="input-s"
                                                    key={index}
                                                    value={item[1]}
                                                    style={{
                                                      marginBottom: "15px",
                                                      height: "27.8px",
                                                      fontSize: "10px",
                                                    }}
                                                    bsSize="sm"
                                                    onChange={(val) => {
                                                      item[1] =
                                                        val.target.value;
                                                      setrefresh(!refresh);
                                                    }}
                                                  >
                                                    <option value="" disabled>
                                                      select...
                                                    </option>
                                                    <option value="Full-time">
                                                      Full-time
                                                    </option>
                                                    <option value="Part-time">
                                                      Part-time
                                                    </option>
                                                    <option value="Self-employed">
                                                      Self-employed
                                                    </option>
                                                    <option value="Freelance">
                                                      Freelance
                                                    </option>
                                                    <option value="Internship">
                                                      Internship
                                                    </option>
                                                    <option value="Trainee">
                                                      Trainee
                                                    </option>
                                                  </select>
                                                </div>
                                              );
                                            }
                                          )}
                                        </div>
                                      </Col>

                                      <Col lg={2} md={4} sm={12}>
                                        <div className="mb-3">
                                          <Label className="header-child">
                                            Company Name*
                                            <span className="mandatory">*</span>
                                          </Label>
                                          {work_experiance_info.map(
                                            (item, index) => {
                                              return (
                                                <Input
                                                  className="form-control d-block from control-md"
                                                  key={index}
                                                  value={item[2]}
                                                  bsSize="sm"
                                                  type="text"
                                                  style={{
                                                    marginBottom: "15px",
                                                  }}
                                                  name="company_name"
                                                  id="input-s"
                                                  placeholder="Enter Company Name"
                                                  onChange={(val) => {
                                                    item[2] = val.target.value;
                                                    setrefresh(!refresh);
                                                  }}
                                                />
                                              );
                                            }
                                          )}
                                        </div>
                                      </Col>

                                      <Col lg={2} md={4} sm={12}>
                                        <div className="mb-3">
                                          <Label className="header-child">
                                            Location *
                                            <span className="mandatory">*</span>
                                          </Label>

                                          {work_experiance_info.map(
                                            (item, index) => {
                                              return (
                                                <div
                                                  style={{
                                                    marginBottom: "15px",
                                                  }}
                                                >
                                                  <MultiRowSearchInput
                                                    data_list={
                                                      origin_city_list_s
                                                    }
                                                    setdata_list={
                                                      setorigin_city_list_s
                                                    }
                                                    data_item_s={
                                                      work_experiance_info[
                                                        index
                                                      ][3]
                                                    }
                                                    page={origin_city_page}
                                                    setpage={
                                                      setorigin_city_page
                                                    }
                                                    setsearch_txt={
                                                      setorigin_city
                                                    }
                                                    // error_message={"Please Select Any Option"}
                                                    idx={index}
                                                    refresh={refresh}
                                                    setrefresh={setrefresh}
                                                    current_width="100%"
                                                    changeWidth={false}
                                                    loaded={city_loaded}
                                                    count={city_count}
                                                    bottom={city_bottom}
                                                    setbottom={setcity_bottom}
                                                  />
                                                </div>
                                              );
                                            }
                                          )}
                                        </div>
                                      </Col>

                                      <Col lg={2} md={4} sm={12}>
                                        <div className="mb-3">
                                          <Label className="header-child">
                                            Start Date
                                            <span className="mandatory">*</span>
                                          </Label>
                                          {work_experiance_info.map(
                                            (item, index) => {
                                              return (
                                                <Input
                                                  className="form-control d-block from control-md"
                                                  key={index}
                                                  value={item[4]}
                                                  bsSize="sm"
                                                  type="date"
                                                  style={{
                                                    marginBottom: "15px",
                                                  }}
                                                  name="start_date"
                                                  id="input-s"
                                                  onChange={(val) => {
                                                    item[4] = val.target.value;
                                                    setrefresh(!refresh);
                                                  }}
                                                />
                                              );
                                            }
                                          )}
                                        </div>
                                      </Col>

                                      <Col lg={2} md={4} sm={12}>
                                        <div className="mb-3">
                                          <Label className="header-child">
                                            End Date
                                            <span className="mandatory">*</span>
                                          </Label>
                                          {work_experiance_info.map(
                                            (item, index) => {
                                              return (
                                                <Input
                                                  className="form-control d-block from control-md"
                                                  key={index}
                                                  value={item[5]}
                                                  bsSize="sm"
                                                  type="date"
                                                  style={{
                                                    marginBottom: "15px",
                                                  }}
                                                  name="end_date"
                                                  id="input-s"
                                                  onChange={(val) => {
                                                    item[5] = val.target.value;
                                                    setrefresh(!refresh);
                                                  }}
                                                />
                                              );
                                            }
                                          )}
                                        </div>
                                      </Col>

                                      {/* //----Delete---/// */}
                                      <Col lg={1} md={1} sm={1}>
                                        <div className="mb-3">
                                          {work_experiance_info.length > 1 ? (
                                            <Label className="header-child">
                                              Delete
                                            </Label>
                                          ) : null}
                                          {work_experiance_info.map(
                                            (item, index) => (
                                              <IconContext.Provider
                                                key={index}
                                                value={{
                                                  className: "icon multi-input",
                                                }}
                                              >
                                                {work_experiance_info.length >
                                                1 ? (
                                                  <div
                                                    className="mb-2 mt-2"
                                                    onClick={() => {
                                                      delete_work_experience(
                                                        item
                                                      );
                                                    }}
                                                  >
                                                    <MdDeleteForever
                                                      size={20}
                                                      style={{
                                                        justifyContent:
                                                          "center",
                                                        color: "red",
                                                        cursor: "pointer",
                                                        marginBottom: "15px",
                                                      }}
                                                    />
                                                  </div>
                                                ) : null}
                                              </IconContext.Provider>
                                            )
                                          )}
                                        </div>
                                      </Col>
                                    </Row>{" "}
                                    <div>
                                      {" "}
                                      <span
                                        className="link-text"
                                        onClick={() => {
                                          add_another_work_experiance();
                                        }}
                                      >
                                        <IconContext.Provider
                                          value={{
                                            className: "icon",
                                          }}
                                        >
                                          <MdAdd />
                                        </IconContext.Provider>
                                        Add Another
                                      </span>
                                    </div>
                                  </CardBody>
                                </Card>
                              </div>
                            </Col>
                          </Row>
                          {/* fotter btn */}
                          <div className="m-1">
                            <Col lg={12}>
                              <div className="mb-1 footer_btn">
                                <Button
                                  type="submit"
                                  className="btn btn-success m-1 cu_btn"
                                >
                                  {update__Experience
                                    ? "Update & Save"
                                    : "Submit"}
                                </Button>
                              </div>
                            </Col>
                          </div>{" "}
                        </form>
                      </CardText>
                    </Col>
                  </Row>
                </TabPane>
              </TabContent>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default EmployeeTab;
