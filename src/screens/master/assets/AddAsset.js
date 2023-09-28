/* eslint-disable */
import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import "../../../assets/scss/forms/form.scss";
import pdf from "../../../assets/images/Pdf/printer.png";
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
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import toTitleCase from "../../../lib/titleCase/TitleCase";
import SearchInput from "../../../components/formComponent/searchInput/SearchInput";
import TransferList from "../../../components/formComponent/transferList/TransferList";
import { ServerAddress, bucket_address } from "../../../constants/ServerAddress";
import {
  setAlertType,
  setShowAlert,
  setDataExist,
} from "../../../store/alert/Alert";
import PageTitle from "../../../components/pageTitle/PageTitle";
import Title from "../../../components/title/Title";
import { FiSquare, FiCheckSquare } from "react-icons/fi";
import { setToggle } from "../../../store/pagination/Pagination";
import NSearchInput from "../../../components/formComponent/nsearchInput/NSearchInput";
import { MdAdd, MdDeleteForever } from "react-icons/md";
// import { IconContext } from "react-icons";
import ImgModal from "../../../components/crop/ImgModal";

const AddAsset = () => {
  const user = useSelector((state) => state.authentication.userdetails);
  const navigate = useNavigate();
  const data_len = useSelector((state) => state.pagination.data_length);
  const page_num = useSelector((state) => state.pagination.page_number);
  const [circle_btn, setcircle_btn] = useState(true);

  const [circle_btn1, setcircle_btn1] = useState(true);
  const [circle_btn2, setcircle_btn2] = useState(true);
  const [isupdating, setisupdating] = useState(false);
  const location_data = useLocation();
  const accessToken = useSelector((state) => state.authentication.access_token);
  const user_id = useSelector((state) => state.authentication.userdetails.id);
  const [null_value, setnull_value] = useState(false)
  const dispatch = useDispatch();
  const [logger_box_list, setlogger_box_list] = useState([
    "Single Use",
    "Multi Use",
    "Dry Ice Single Use",
    "Dry Ice Multi Use",
    "Liquid Nitrogen",
  ]);
  const [logger_box_type, setlogger_box_type] = useState("");
  const [manufacture_name_list, setmanufacture_name_list] = useState([]);
  // "Escort",
  // "Sensitech",
  // "Temp Note",
  const [manufacture_type, setmanufacture_type] = useState("");
  const [manufacture_type_id, setmanufacture_type_id] = useState(0);
  const [manufacture_type_page, setmanufacture_type_page] = useState(1)
  const [manufacture_type_search, setmanufacture_type_search] = useState("")
  const [other_manufacture_type, setother_manufacture_type] = useState("")

  const [temperature_log_list, settemperature_log_list] = useState([
    "2-8 C",
    "15-25 C",
    "-25 TO -15 C",
    "Dry Ice",
    "-90 TO -20 C",
    "-250 TO -150 C",
  ]);
  const [temperature_log_type, settemperature_log_type] = useState("");
  const [box_type_list, setbox_type_list] = useState([
    "Credo",
    "Vype",
    "Cool Guard",
    "Isgo",
    "Safe",
  ]);
  const [box_type, setbox_type] = useState("");
  const [box_type_short, setbox_type_short] = useState("");
  const [temperature_box_list, settemperature_box_list] = useState([
    "2-8 C",
    "15-25 C",
    "-25C TO -15C",
  ]);
  const [temperature_type_box, settemperature_type_box] = useState("");
  const [page, setpage] = useState(1);

  const [box_cap_list, setbox_cap_list] = useState([
    "03L",
    "04L",
    "07L",
    "12L",
    "14L",
    "16L",
    "28L",
    "30L",
    "56L",
    "60L",
    "96L",
    "100L",
  ]);
  const [box_cap, setbox_cap] = useState("");
  const [asset, setasset] = useState([]);
  const [asset_type_list, setasset_type_list] = useState([
    "Logger",
    "Temperature Control Box",
  ]);
  const [asset_type, setasset_type] = useState("");
  const [asset_type_short, setasset_type_short] = useState("");
  const [branch_list, setbranch_list] = useState([]);
  const [branch_short_id, setbranch_short_id] = useState("");
  const [branch_selected, setbranch_selected] = useState("");
  const [search_branch, setsearch_branch] = useState("");
  const [branch_loaded, setbranch_loaded] = useState(false);
  const [branch_count, setbranch_count] = useState(1);
  const [branch_bottom, setbranch_bottom] = useState(103)

  const [useproduct_id, setuseproduct_id] = useState("");
  const [product_id_error, setproduct_id_error] = useState(false)
  const [isChecked, setisChecked] = useState(true);
  const [is_defective, setis_defective] = useState(false)
  const [purchase_date, setpurchase_date] = useState("");
  const [expiry_date, setexpiry_date] = useState("");
  const [logger_box_no, setlogger_box_no] = useState("");
  const [old_box_no, setold_box_no] = useState("");
  const [callibration_from, setcallibration_from] = useState("");
  const [callibration_to, setcallibration_to] = useState("");
  const [issued_by, setissued_by] = useState("");
  const [issued_date, setissued_date] = useState("");

  const [expired, setexpired] = useState(false);

  useEffect(() => {
    const currentDate = new Date();
    const registrationDate = new Date(expiry_date);
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(currentDate.getDate() + 30);

    if (registrationDate < thirtyDaysFromNow) {
      setexpired(true);
    } else {
      setexpired(false);
    }
  }, [expiry_date]);

  //Callibaration Info

  const [callibration_from_date, setcallibration_from_date] = useState("");
  const [callibration_to_date, setcallibration_to_date] = useState("");
  const [
    callibration_certificate_issue_by,
    setcallibration_certificate_issue_by,
  ] = useState("");
  const [
    callibration_certificate_issued_date,
    setcallibration_certificate_issued_date,
  ] = useState("");
  const [certificate, setcertificate] = useState("")
  const [callibration_id, setcallibration_id] = useState("")

  const [calibration_ids, setcalibration_ids] = useState([])
  const [calibration_id_list, setcalibration_id_list] = useState([])


  const [deleted_calibration_id, setdeleted_calibration_id] = useState([])
  const [refresh, setrefresh] = useState(false);
  let dimensiton_list = [
    callibration_from_date,
    callibration_to_date,
    callibration_certificate_issue_by,
    callibration_certificate_issued_date,
    certificate,
    callibration_id
  ];

  const [row, setrow] = useState([dimensiton_list]);
  console.log("setrow=======", row)
  const [callibaration_from_date_error, setcallibaration_from_date_error] = useState(false);

  const add_callibration = () => {
    setcallibration_from_date("");
    setcallibration_to_date("");
    setcallibration_certificate_issue_by("");
    setcallibration_certificate_issued_date("");
    setcertificate("")
    setcallibration_id("")
    setrow([...row, dimensiton_list]);
  };

  const delete_callibration = (item) => {
    setcallibration_from_date("");
    setcallibration_to_date("");
    setcallibration_certificate_issue_by("");
    setcallibration_certificate_issued_date("");
    setcertificate("")
    setcallibration_id("")
    let temp = [...row];
    let temp_2 = [...calibration_id_list];
    const index = temp.indexOf(item);
    if (index > -1) {
      temp.splice(index, 1);
      temp_2.splice(index, 1);
    }
    setrow(temp);
    setcalibration_id_list(temp_2)
  };
  //used for image 
  const [show_modal_certificate, setshow_modal_certificate] = useState({
    value: false,
    ind: "",
  });
  const [img_index, setimg_index] = useState("")
  const [certificate_img, setcertificate_img] = useState("");
  //Used for error
  const [asset_type_error, setasset_type_error] = useState(false);
  const [box_type_error, setbox_type_error] = useState(false);
  const [temperature_type_box_error, settemperature_type_box_error] =
    useState(false);
  const [box_capacity_error, setbox_capacity_error] = useState(false);
  const [logger_box_type_error, setlogger_box_type_error] = useState(false);
  const [manufacture_type_error, setmanufacture_type_error] = useState(false);
  const [manufacture_type_loaded, setmanufacture_type_loaded] = useState(false)
  const [manufacture_type_count, setmanufacture_type_count] = useState(1)
  const [manufacture_type_bottom, setmanufacture_type_bottom] = useState(103)

  const [temperature_log_type_error, settemperature_log_type_error] =
    useState(false);
  const [logger_number_error, setlogger_number_error] = useState(false);
  const [expire_date_error, setexpire_date_error] = useState(false);
  const [branch_error, setbranch_error] = useState(false);
  const [callibration_from_date_error, setcallibration_from_date_error] =
    useState(false);
  const [callibration_to_date_error, setcallibration_to_date_error] =
    useState(false);

  const [Add_manufacture_err, setAdd_manufacture_err] = useState(false);


  //Used for circle btn
  const toggle_circle = () => {
    setcircle_btn(!circle_btn);
  };

  const toggle_circle1 = () => {
    setcircle_btn1(!circle_btn1);
  };

  const toggle_circle2 = () => {
    setcircle_btn2(!circle_btn2);
  };

  const getManifacturer = async () => {
    let manufacture_list = [...manufacture_name_list];
    try {
      const resp = await axios.get(ServerAddress + `master/all_asset_manufacture/?search=${""}&p=${manufacture_type_page}&records=${10}&name_search=${manufacture_type_search}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (resp.data.results.length > 0) {
        if (resp.data.next === null) {
          setmanufacture_type_loaded(false);
        } else {
          setmanufacture_type_loaded(true);
        }
        if (manufacture_type_page == 1) {
          manufacture_list = resp.data.results.map((v) => [v.id, toTitleCase(v.name)]);
        } else {
          manufacture_list = [
            ...manufacture_name_list,
            ...resp.data.results.map((v) => [v.id, toTitleCase(v.name)]),
          ];
        }
      }
      let a_index = manufacture_list.indexOf("Add New");
      if (a_index != -1) {
        manufacture_list.splice(a_index, 1);
      }
      manufacture_list = [...new Set(manufacture_list.map((v) => `${v}`))].map((v) => v.split(","));
      manufacture_list.push("Add New");
      setmanufacture_type_count(manufacture_type_count + 2)
      setmanufacture_name_list(manufacture_list);
    } catch (err) {
      alert(`Error Occur in Get Commodity Type, ${err}`);
    }
  };


  const setManufactureName = async () => {
    try {
      const response = await axios.post(ServerAddress + "master/add_asset_manufacture/", {
        name: toTitleCase(other_manufacture_type).toUpperCase(),
        created_by: user_id,
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.data.status !== "duplicated") {
        if (response.statusText === "Created") {
          setmanufacture_type_id(response.data.manufacture_id);
          dispatch(setShowAlert(true));
          dispatch(
            setDataExist(
              `Manufacture Name ${toTitleCase(other_manufacture_type)} Added Sucessfully`
            )
          );
          dispatch(setAlertType("success"));
          setmanufacture_type(toTitleCase(other_manufacture_type));
          await getManifacturer();
          // getDistrict();
        }
      } else {
        dispatch(setShowAlert(true));
        dispatch(
          setDataExist(
            `Manifacturer Name ${toTitleCase(other_manufacture_type)} Already Exist`
          )
        );
        dispatch(setAlertType("warning"));
        if (isupdating) {
          setmanufacture_type(toTitleCase(location_data.name));
        } else {
          setmanufacture_type("");
        }
      }
    } catch (error) {
      alert(`Error Happen while posting Manufacture Data ${error}`);
    }
  };


  const get_branch = async () => {
    try {
      let branch_list_is = [];
      const response = await axios.get(
        ServerAddress +
        `master/all-branches/?search=${""}&p=${page}&records=${10}&branch_name=${[
          "",
        ]}&branch_city=${[""]}&vendor=${[""]}&branch_search=${search_branch}&data=all`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      if (response.data.next === null) {
        setbranch_loaded(false);
      } else {
        setbranch_loaded(true);
      }
      if (response.data.results.length > 0) {
        if (page == 1) {
          branch_list_is = response.data.results.map((v) => [
            v.id,
            toTitleCase(v.name),
          ]);
        } else {
          branch_list_is = [
            ...branch_list,
            ...response.data.results.map((v) => [v.id, v.name]),
          ];
        }
      }
      setbranch_count(branch_count + 2);
      setbranch_list(branch_list_is);
      // let temp = [];
      // let temp2 = [...branch_list];
      // temp = response.data.results;
      // for (let index = 0; index < temp.length; index++) {
      //   temp2.push([temp[index].id, toTitleCase(temp[index].name)]);
      // }
      // temp2 = [...new Set(temp2.map((v) => `${v}`))].map((v) => v.split(","));
      // setbranch_list(temp2);
    } catch (err) {
      alert(`Error While Loading Client , ${err}`);
    }
  };


  useLayoutEffect(() => {
    get_branch();
  }, [search_branch, page]);

  useLayoutEffect(() => {
    getManifacturer();
  }, [manufacture_type_page, manufacture_type_search]);


  // useEffect(() => {
  //   let date = new Date();
  //   let date_n =
  //     String(date.getDate()).length === 1
  //       ? "0" + String(date.getDate())
  //       : String(date.getDate());
  //   let month =
  //     String(date.getMonth() + 1).length === 1
  //       ? "0" + String(date.getMonth() + 1)
  //       : String(date.getMonth() + 1);
  //   let year = String(date.getFullYear());
  //   setfrom_date(`${year}-${month}-${date_n}`);
  // }, []);

  useLayoutEffect(() => {
    try {
      let asset_u = location_data.state.asset;
      console.log("asset_u---", asset_u)
      setisupdating(true);
      setasset(asset_u);
      setasset_type(toTitleCase(asset_u.asset_type));
      setbranch_short_id(asset_u.assigned_branch);

      setbox_cap(toTitleCase(asset_u.box_capacities));
      settemperature_type_box(asset_u.temperature_type);

      setmanufacture_type(toTitleCase(asset_u.manufacturer_name));
      settemperature_log_type(asset_u.temperature_type);
      // settoday(asset_u.expiry_date);
      // setfrom_date(asset_u.purchase_date);
      // if (asset_type === "Temperature Control Box") {
      setuseproduct_id(asset_u.product_id);
      setold_box_no(asset_u.old_box_no)
      setbox_type(toTitleCase(asset_u.box_type));
      // }
      // else {
      setlogger_box_no(asset_u.product_id)
      setlogger_box_type(toTitleCase(asset_u.box_type));
      // }
      setbranch_selected(toTitleCase(asset_u.assigned_branch_n));
      setisChecked(asset_u.is_checked);
      setis_defective(asset_u.is_damaged)
      setrow([["", val, "", "", ""]])

    } catch (error) { }
  }, []);

  const add_asset = async () => {
    try {
      const response = await axios.post(
        ServerAddress + "master/add_asset/",
        {
          is_damaged: is_defective,
          asset_type: asset_type.toUpperCase(),
          box_type:
            asset_type == "Logger"
              ? logger_box_type.toUpperCase()
              : box_type.toUpperCase(),
          manufacturer_name: asset_type == "Logger" ? manufacture_type.toUpperCase() : "",
          temperature_type:
            asset_type == "Logger"
              ? temperature_log_type.toUpperCase()
              : temperature_type_box.toUpperCase(),
          box_capacities: asset_type == "Logger" ? "" : box_cap,
          product_id:
            asset_type == "Logger"
              ? logger_box_no.toUpperCase()
              : useproduct_id ? useproduct_id.toUpperCase() : null,
          assigned_branch: branch_short_id,
          created_branch: user.home_branch, // It will not updated
          checked_by: isChecked ? user_id : null,
          current_branch: user.home_branch, // It will updated according to the Branch
          is_checked: isChecked,
          created_by: user_id,
          callibration_from: asset_type === "Logger" ? purchase_date : null,
          callibration_to: asset_type === "Logger" ? expiry_date : null,
          asset_callibration: asset_type === "Logger" ? row : [],
          //For C&M
          cm_current_department: user.user_department,
          cm_current_status: (user.user_department_name === "ADMIN") ? 'NOT APPROVED' : (current_status).toUpperCase(),
          cm_transit_status: (user.user_department_name === "ADMIN") ? 'NOT APPROVED' : (current_status).toUpperCase(),
          //For old box no 
          old_box_no: asset_type === "Logger" ? null : old_box_no,
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
            `Asset Id  "${response.data.data.asset_id}" Added sucessfully`
          )
        );
        dispatch(setAlertType("success"));
        navigate(-1);
      } else if (response.data === "duplicate") {
        dispatch(setShowAlert(true));
        dispatch(
          setDataExist(
            `Asset ${asset_type == "Logger" ? "Logger Number" : "Product Id"} "${asset_type == "Logger" ? logger_box_no : useproduct_id}" already exists`
          )
        );
        dispatch(setAlertType("warning"));
      }
    } catch (error) {
      alert(`Error while posting Data ${error}`);
    }
  };

  const updateAsset = async () => {

    let fields_names = Object.entries({
      asset_type: asset_type,
      assigned_branch_n: branch_selected,
      box_capacities: box_cap,
      box_type: asset_type === "Logger" ? logger_box_type : box_type,
      current_branch_n: user.branch_nm,
      expiry_date: expiry_date,
      is_checked: isChecked,
      is_damaged: is_defective,
      manufacturer_name: manufacture_type,
      old_box_no: asset_type === "Logger" ? null : old_box_no,
      product_id: asset_type == "Logger" ? logger_box_no : useproduct_id,
      purchase_date: purchase_date,
      temperature_type:
        asset_type === "Logger" ? temperature_log_type : temperature_type_box,
    });

    let change_fields = {};

    for (let j = 0; j < fields_names.length; j++) {
      const ele = fields_names[j];
      let prev = location_data.state.asset[`${ele[0]}`];
      let new_v = ele[1];
      if (String(prev).toUpperCase() != String(new_v).toUpperCase()) {
        change_fields[`${ele[0]}`] = new_v.toString().toUpperCase();
      }
    }

    let fields_names2 = Object.entries({
      callibration_from: callibration_from,
      callibration_to: callibration_to,
      issued_by: issued_by,
      issued_date: issued_date,
    })
    let change_fields2 = {};

    for (let j = 0; j < fields_names2.length; j++) {
      const ele = fields_names2[j];
      let prev = location_data.state.asset.calibration_detail[0][`${ele[0]}`];
      let new_v = ele[1];
      if (String(prev).toUpperCase() != String(new_v).toUpperCase()) {
        change_fields2[`${ele[1]}`] = new_v.toString().toUpperCase();
      }
    }

    try {
      const response = await axios.put(
        ServerAddress + "master/update_asset/" + asset.id,
        {
          asset_type: asset_type.toUpperCase(),
          box_type:
            asset_type == "Logger"
              ? logger_box_type.toUpperCase()
              : box_type.toUpperCase(),
          manufacturer_name: asset_type == "Logger" ? manufacture_type.toUpperCase() : "",
          temperature_type:
            asset_type == "Logger"
              ? temperature_log_type.toUpperCase()
              : temperature_type_box.toUpperCase(),
          box_capacities: asset_type == "Logger" ? "" : box_cap,
          product_id:
            asset_type == "Logger"
              ? logger_box_no.toUpperCase()
              : useproduct_id ? useproduct_id.toUpperCase() : null,
          old_box_no: asset_type === "Logger" ? null : old_box_no,
          assigned_branch: branch_short_id,
          created_branch: user.home_branch, // It will not updated
          checked_by: isChecked ? user_id : null,
          current_branch: branch_short_id, // It will updated accordind to the Branch
          is_checked: isChecked,
          modified_by: user_id,
          callibration_from: asset_type === "Logger" ? purchase_date : null,
          callibration_to: asset_type === "Logger" ? expiry_date : null,
          asset_callibration: asset_type === "Logger" ? row : [],
          change_fields: change_fields,
          change_fields2: change_fields2,
          is_damaged: is_defective,
          deleted_calibration: deleted_calibration_id,
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
        dispatch(setToggle(true));
        dispatch(setShowAlert(true));
        dispatch(
          setDataExist(
            `Asset Id "${response.data.data.asset_id}" Updated sucessfully`
          )
        );
        dispatch(setAlertType("info"));
        navigate(-1);
      } else if (response.data === "duplicate") {
        dispatch(setShowAlert(true));
        dispatch(
          setDataExist(
            `Asset ${asset_type == "Logger" ? "Logger Number" : "Product Id"} "${asset_type == "Logger" ? logger_box_no : useproduct_id}" already exists`
          )
        );
        dispatch(setAlertType("warning"));
      }
    } catch (err) {
      alert(`Error While  Updateing Asset ${err}`);
    }
  };


  useLayoutEffect(() => {
    if (box_type !== "") {
      setbox_type_error(false);
    }
    if (temperature_type_box !== "") {
      settemperature_type_box_error(false);
    }
    if (box_cap !== "") {
      setbox_capacity_error(false);
    }
    if (logger_box_type !== "") {
      setlogger_box_type_error(false);
    }
    if (manufacture_type !== "") {
      setmanufacture_type_error(false);
    }
    if (other_manufacture_type !== "") {
      setAdd_manufacture_err(false);
    }
    if (temperature_log_type !== "") {
      settemperature_log_type_error(false);
    }
  }, [
    box_type,
    temperature_type_box,
    box_cap,
    logger_box_type,
    manufacture_type,
    temperature_log_type,
  ]);

  useEffect(() => {
    if (isupdating) {

      if (asset.calibration_detail.length !== 0) {
        let temp = [];
        let temp_list = [];
        let temp_list2 = [];
        temp = asset.calibration_detail

        for (let index = 0; index < temp.length; index++) {
          temp_list.push([
            temp[index].callibration_from,
            temp[index].callibration_to,
            toTitleCase(temp[index].issued_by),
            temp[index].issued_date,
            temp[index].certificate,
            temp[index].id
          ]);
          temp_list2.push(temp[index].id);

        }
        setrow(temp_list);
        setcalibration_ids(temp_list2)
        setcalibration_id_list(temp_list2)
      }
    }

  }, [isupdating])

  useEffect(() => {
    if (calibration_id_list !== "") {
      let id_list = calibration_ids.filter(
        (p) => calibration_id_list.indexOf(p) === -1
      );
      setdeleted_calibration_id(id_list);
    }
  }, [calibration_id_list, calibration_ids]);

  useEffect(() => {
    if (manufacture_type) {
      setmanufacture_type_error(false);
    }
    if (manufacture_type === "Add New") {
      setother_manufacture_type("");
    }

  }, [manufacture_type]);
  useEffect(() => {
    if (other_manufacture_type) {
      setAdd_manufacture_err(false);
    }
  }, [other_manufacture_type]);

  useEffect(() => {
    if (logger_box_no) {
      setlogger_number_error(false);
    }
  }, [logger_box_no]);

  useEffect(() => {
    if (box_type !== "Credo") {
      setproduct_id_error(false);
    }
    if (useproduct_id) {
      setproduct_id_error(false);
    }
  }, [useproduct_id, box_type]);


  useEffect(() => {
    let a = row[row.length - 1];
    if (a[0] !== "" && a[0] !== "") {
      setpurchase_date(a[0])
      setexpiry_date(a[1])
    }
    else {
      setpurchase_date("")
      setexpiry_date("")
    }

  }, [dimensiton_list])
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

  const update_assetstatus = (id) => {

    axios
      .put(
        ServerAddress + "master/update_asset/" + id,
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
          navigate("/master/commodities");
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
      update_assetstatus(asset.id)
      setShow(false)
    }
  }
  // for history
  const handlClk = () => {
    navigate("/assets/assetHistory/AssetHistoryPage", {
      state: { asset: asset },
    });
  };
  // use for logger temperature type
  useEffect(() => {
    if (logger_box_type === "Single Use") {
      settemperature_log_list(["2-8 C", "15-25 C", "-25 TO -15 C", "Dry Ice",])
    } if (logger_box_type === "Multi Use") {
      settemperature_log_list(["2-8 C", "15-25 C", "-25 TO -15 C"])
    } if (logger_box_type === "Dry Ice Single Use") {
      settemperature_log_list(["-90 TO -20 C"])
    } if (logger_box_type === "Dry Ice Multi Use") {
      settemperature_log_list(["-90 TO -20 C"])
    } if (logger_box_type === "Liquid Nitrogen") {
      settemperature_log_list(["-250 TO -150 C"])
    }
  }, [logger_box_type]);


  // for getting the data of  Qualification Details
  const fileInputRef1 = React.useRef(null);

  const handleIClick = () => {
    fileInputRef1.current.click();
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
      <Form>
        <div className="mt-3">
          <PageTitle page={isupdating ? "Update Asset" : "Add Asset"} />
          <Title
            title={isupdating ? "Update Asset" : "Add Asset"}
            parent_title="Masters"
          />
        </div>
        {/* Add For History Button */}
        {isupdating &&
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
        }

        {/* Branch Info */}
        <div className="m-3" id="asset_info">
          <Col lg={12}>
            <Card className="shadow bg-white rounded">
              <CardTitle className="mb-1 header">
                <div className="header-text-icon header-text">
                  Asset Info
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
                        <Label className="header-child">Asset Type* </Label>

                        <NSearchInput
                          disable_me={isupdating && true}
                          data_list={asset_type_list}
                          data_item_s={asset_type}
                          set_data_item_s={setasset_type}
                          set_id={setasset_type_short}
                          show_search={false}
                          error_message={"Please select Asset Type"}
                          error_s={asset_type_error}
                        />
                      </div>
                    </Col>

                    {/*Logger Type Fields Started  */}
                    {asset_type == "Logger" && (
                      <>
                        <Col lg={4} md={6} sm={6}>
                          <div className="mb-2" id="log">
                            <Label className="header-child">Logger Type *</Label>
                            <NSearchInput
                              data_list={logger_box_list}
                              data_item_s={logger_box_type}
                              set_data_item_s={setlogger_box_type}
                              show_search={false}
                              error_message={"Please select Logger Box type"}
                              error_s={logger_box_type_error}
                              disable_me={isupdating && true}
                            />
                          </div>
                        </Col>

                        <Col lg={4} md={6} sm={6}>
                          <div className="mb-2" id="log1">
                            <Label className="header-child">
                              Manufacture Name *
                            </Label>
                            <SearchInput
                              data_list={manufacture_name_list}
                              setdata_list={setmanufacture_name_list}
                              data_item_s={manufacture_type}
                              set_data_item_s={setmanufacture_type}
                              set_id={setmanufacture_type_id}
                              page={manufacture_type_page}
                              setpage={setmanufacture_type_page}
                              setsearch_item={setmanufacture_type_search}
                              error_message={
                                "Please select Manufacture Name type"
                              }
                              error_s={manufacture_type_error}
                              loaded={manufacture_type_loaded}
                              count={manufacture_type_count}
                              bottom={manufacture_type_bottom}
                              setbottom={setmanufacture_type_bottom}
                            />
                          </div>
                        </Col>

                        {manufacture_type === "Add New" ? (
                          <Col lg={4} md={6} sm={6}>
                            <div className="mb-2">
                              <Label className="header-child">
                                Add Manufacture Name *
                              </Label>
                              <Input
                                onChange={(val) =>
                                  setother_manufacture_type(val.target.value)
                                }
                                onBlur={() => {
                                  if (other_manufacture_type != "") {
                                    if (
                                      window.confirm(
                                        `Do you want to add ${toTitleCase(
                                          other_manufacture_type
                                        )}?`
                                      )
                                    ) {
                                      setManufactureName();
                                    } else {
                                      setmanufacture_type("");
                                    }
                                  }
                                  if (other_manufacture_type === "") {
                                    setAdd_manufacture_err(true);
                                  }
                                }}
                                value={other_manufacture_type}
                                invalid={Add_manufacture_err}
                                type="text"
                                name="other_manufacture_type"
                                className="form-control-md"
                                id="input"
                                placeholder="Enter Manufacture Name"
                              />
                            </div>
                            <div className="mt-1 error-text" color="danger">
                              {Add_manufacture_err ? "Add manufacture name" : null}
                            </div>
                          </Col>
                        ) : null}

                        <Col lg={4} md={6} sm={6}>
                          <div className="mb-2">
                            <Label className="header-child">
                              Temperature Type *
                            </Label>
                            <NSearchInput
                              data_list={temperature_log_list}
                              data_item_s={temperature_log_type}
                              set_data_item_s={settemperature_log_type}
                              show_search={false}
                              error_message={
                                "Please select Logger Temperature type"
                              }
                              error_s={temperature_log_type_error}
                            />
                          </div>
                        </Col>
                        <Col lg={4} md={6} sm={6}>
                          <div className="mb-2">
                            <Label className="header-child">
                              Logger Number *
                            </Label>
                            <Input
                              className="form-control-md"
                              maxLength={15}
                              id="input"
                              type="text"
                              value={logger_box_no}
                              onChange={(r) => {
                                setlogger_box_no(r.target.value);
                              }}
                              onBlur={() => {
                                if (logger_box_no) {
                                  setlogger_number_error(false);
                                }
                                else {
                                  setlogger_number_error(true);
                                }
                              }}
                              invalid={logger_number_error}
                            />
                            {/* <div className="mt-1 error-text" color="danger">
                                  {logger_number_error ? "Logger Number  is required" : null}
                                </div> */}
                            {logger_number_error ? (
                              <FormFeedback type="invalid">
                                Logger Number is required
                              </FormFeedback>
                            ) : null}
                          </div>
                        </Col>
                      </>
                    )}
                    {/*Logger Type Fields Ended  */}

                    {/* Temp control Box TYpe Fields Stated */}
                    {asset_type == "Temperature Control Box" && (
                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-2" id="box">
                          <Label className="header-child">Box Type * </Label>
                          <NSearchInput
                            data_list={box_type_list}
                            data_item_s={box_type}
                            set_data_item_s={setbox_type}
                            show_search={false}
                            error_message={"Please select Box  Type"}
                            error_s={box_type_error}
                            disable_me={isupdating && true}
                          />
                        </div>
                      </Col>
                    )}

                    {asset_type == "Temperature Control Box" && (
                      <>
                        <Col lg={4} md={6} sm={6}>
                          <div className="mb-2">
                            <Label className="header-child">
                              Temperature Type*
                            </Label>
                            <NSearchInput
                              data_list={temperature_box_list}
                              data_item_s={temperature_type_box}
                              set_data_item_s={settemperature_type_box}
                              show_search={false}
                              error_message={"Please select Box Temperature Type"}
                              error_s={temperature_type_box_error}
                            />
                          </div>
                        </Col>

                        <Col lg={4} md={6} sm={6}>
                          <div className="mb-2">
                            <Label className="header-child">
                              Box Capacities *
                            </Label>
                            <NSearchInput
                              data_list={box_cap_list}
                              data_item_s={box_cap}
                              set_data_item_s={setbox_cap}
                              show_search={false}
                              error_message={"Please select Box  Capacities"}
                              error_s={box_capacity_error}
                            />
                          </div>
                        </Col>

                        <Col lg={4} md={6} sm={6}>
                          <div className="mb-2">
                            <Label className="header-child">Manufacture Product ID</Label>
                            <Input
                              type="text"
                              maxLength={15}
                              className="form-control-md"
                              id="input"
                              placeholder="Enter Manufacture Product Id"
                              value={useproduct_id}
                              onChange={(e) => {
                                setuseproduct_id(e.target.value);
                              }}
                              onBlur={() => {
                                if (box_type === "Credo" && !useproduct_id) {
                                  setproduct_id_error(true);
                                }
                                else {
                                  setproduct_id_error(false);
                                }
                              }}
                              invalid={product_id_error}
                            />
                            {product_id_error ? (
                              <FormFeedback type="invalid">
                                Manufacture Product ID is required
                              </FormFeedback>
                            ) : null}
                          </div>
                        </Col>

                        <Col lg={4} md={6} sm={6}>
                          <div className="mb-2">
                            <Label className="header-child">Old Box Number</Label>
                            <Input
                              type="text"
                              className="form-control-md"
                              id="input"
                              placeholder="Enter Old Box Number"
                              value={old_box_no}
                              onChange={(e) => {
                                setold_box_no(e.target.value);
                              }}
                            />
                          </div>
                        </Col>
                      </>
                    )}
                    {/* temp control Box TYpe Fields Ended */}
                  </Row>
                </CardBody>
              ) : null}
            </Card>
          </Col>
        </div>

        {/* Asset Details */}
        <div className="m-3" id="asset_details">
          <Col lg={12}>
            <Card className="shadow bg-white rounded">
              <CardTitle className="mb-1 header">
                <div className="header-text-icon header-text">
                  Asset Details
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
                  <Row>
                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">
                          Initial Assign Branch *
                        </Label>
                        <SearchInput
                          data_list={branch_list}
                          setdata_list={setbranch_list}
                          data_item_s={branch_selected}
                          set_data_item_s={setbranch_selected}
                          set_id={setbranch_short_id}
                          // show_search={false}
                          page={page}
                          setpage={setpage}
                          setsearch_item={setsearch_branch}
                          error_message={"Please select Assign Branch"}
                          error_s={branch_error}
                          loaded={branch_loaded}
                          count={branch_count}
                          bottom={branch_bottom}
                          setbottom={setbranch_bottom}
                        />
                        {/* <div className="mt-1 error-text" color="danger">
                          {branch_error ? "Please Select Any Branch" : null}
                        </div> */}
                      </div>
                    </Col>

                    {/* <Col lg={4} md={6} sm={6}>
                      <div className="mb-3">
                        <Label className="header-child">Purchase Date</Label>
                        <Input
                          type="date"
                          className="form-control d-block form-control-md "
                          id="input"
                          value={from_date}
                          onChange={(val) => {
                            setfrom_date(val.target.value);
                          }}
                        />
                      </div>
                    </Col>
                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-3">
                        <Label className="header-child">Expire Date *</Label>
                        <Input
                          // min={from_date}
                          type="date"
                          className="form-control d-block form-control-md "
                          id="input"
                          value={today}
                          onChange={(val) => {
                            settoday(val.target.value);
                          }}
                          onBlur={() => {
                            setexpire_date_error(true);
                          }}
                          invalid={today == "" && expire_date_error}
                        />
                        {today == "" && expire_date_error ? (
                          <FormFeedback type="invalid">
                            Expire Date is required
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col> */}

                    <Col lg={4} md={6} sm={6}>
                      <div style={{ marginTop: "30px" }}>
                        <Label
                          className="header-child "
                          style={{ marginRight: "5px" }}
                        >
                          Is Checked{" "}
                        </Label>
                        {isChecked ? (
                          <FiCheckSquare
                            size={17}
                            onClick={() => {
                              setisChecked(false);
                            }}
                          />
                        ) : (
                          <FiSquare
                            size={17}
                            onClick={() => {
                              setisChecked(true);
                            }}
                          />
                        )}
                      </div>
                    </Col>
                    {isupdating &&
                      <Col lg={4} md={6} sm={6}>
                        <div style={{ marginTop: "30px" }}>
                          <Label
                            className="header-child "
                            style={{ marginRight: "5px" }}
                          >
                            Is Defective{" "}
                          </Label>
                          {is_defective ? (
                            <FiCheckSquare
                              size={17}
                              onClick={() => {
                                setis_defective(false);
                              }}
                            />
                          ) : (
                            <FiSquare
                              size={17}
                              onClick={() => {
                                setis_defective(true);
                              }}
                            />
                          )}
                        </div>
                      </Col>
                    }
                  </Row>
                </CardBody>
              ) : null}
            </Card>
          </Col>
        </div>

        {/* Asset Callibration info */}
        {asset_type == "Logger" && (
          <div className="m-3">
            <Col lg={12}>
              <Card className="shadow bg-white rounded">
                <CardTitle className="mb-1 header">
                  <div className="header-text-icon header-text">
                    Asset Callibration info
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
                      {show_modal_certificate.value ? (
                        <ImgModal
                          modal={show_modal_certificate.value}
                          modal_set={() => {
                            setshow_modal_certificate({
                              ...show_modal_certificate,
                              value: false,
                            });
                          }}
                          upload_image={(val) => {
                            if (show_modal_certificate.ind !== "") {
                              row[show_modal_certificate.ind][4] = val;
                              setshow_modal_certificate({
                                ...show_modal_certificate,
                                value: false,
                                ind: "",
                              });
                            } else {
                              row[img_index][4] = val;
                            }
                          }}
                          result_image={(val) => {
                            setcertificate_img(val);
                            if (show_modal_certificate.ind !== "") {
                              row[show_modal_certificate.ind][4] = val;
                            } else {
                              row[img_index][4] = val;
                            }
                          }}
                        />
                      ) : null}
                      <Col lg={2} md={6} sm={6}>
                        <div className="mb-3">
                          <Label className="header-child">
                            Callibration From *{/* Effective */}
                          </Label>
                          {row.map((item, index) => {
                            return (
                              <Input
                                style={{ marginBottom: "10px" }}
                                type="date"
                                disabled={row.length - 1 !== index}
                                key={index}
                                value={item[0]}
                                className="form-control-md"
                                id="input"
                                invalid={callibration_from_date_error}
                                onChange={(val) => {
                                  item[0] = val.target.value;
                                  setrefresh(!refresh);
                                }}
                              />
                            );
                          })}
                          <FormFeedback type="invalid">
                            Callibration From Date is required
                          </FormFeedback>
                        </div>
                      </Col>

                      <Col lg={2} md={6} sm={6}>
                        <div className="mb-3">
                          <Label className="header-child">
                            Callibration To *{/* Effective */}
                          </Label>
                          {row.map((item, index) => {
                            return (
                              <Input
                                style={{ marginBottom: "10px" }}
                                key={index}
                                disabled={row.length - 1 !== index}
                                value={item[1]}
                                type="date"
                                className="form-control-md"
                                id="input"
                                onChange={(val) => {
                                  item[1] = val.target.value;
                                  setrefresh(!refresh);
                                }}
                              />
                            );
                          })}
                        </div>
                      </Col>

                      <Col lg={2} md={6} sm={6}>
                        <div className="mb-3">
                          <Label className="header-child">
                            {/* Callibration */}
                            Certificate Issued By *
                          </Label>
                          {row.map((item, index) => {
                            return (
                              <Input
                                style={{ marginBottom: "10px" }}
                                key={index}
                                value={item[2]}
                                disabled={row.length - 1 !== index}
                                type="text"
                                className="form-control-md"
                                id="input"
                                placeholder="Enter name"
                                onChange={(val) => {
                                  item[2] = val.target.value;
                                  setrefresh(!refresh);
                                }}

                              />
                            );
                          })}
                        </div>
                      </Col>

                      <Col lg={2} md={6} sm={6}>
                        <div className="mb-3">
                          <Label className="header-child">
                            {/* Callibration Certificate*/} Issued Date *
                          </Label>
                          {row.map((item, index) => {
                            return (
                              <Input
                                style={{ marginBottom: "10px" }}
                                key={index}
                                disabled={row.length - 1 !== index}
                                value={item[3]}
                                type="date"
                                className="form-control-md"
                                id="input"
                                onChange={(val) => {
                                  item[3] = val.target.value;
                                  setrefresh(!refresh);
                                }}
                              />
                            );
                          })}
                        </div>
                      </Col>

                      {/* <Col lg={2} md={6} sm={6}>
                        <div className="mb-3">
                          <Label className="header-child">
                            Certificate *
                          </Label>
                          {row.map((item, index) => {
                            return (
                              <Input
                                key={index}
                                disabled={row.length - 1 !== index}
                                style={{ marginBottom: "10px" }}
                                type="file"
                                className="form-control-md"
                                id="input"
                                // value={item[4]}
                                onChange={(val) => {
                                  setcertificate(val.target.files[0]);
                                  item[4] = val.target.files;
                                  setrefresh(!refresh);
                                }}
                              />
                            );
                          })}
                        </div>
                      </Col> */}

                      {/* <Col lg={2} md={6} sm={6}>
                        <div className="mb-3">
                          <Label className="header-child">
                            Certificate
                          </Label>
                          {row.map((item, index) => {
                            return (
                              <div style={{ width: "100%" }} key={index}>
                                {item[4] ? (
                                  <img
                                    src={item[4]}
                                    style={{
                                      height: "110px",
                                      width: "110px",
                                      borderRadius: "10px",
                                      paddingBottom: "5px",
                                    }}
                                    onClick={() => {
                                      setshow_modal_certificate({
                                        // ...show_modal_certificate,
                                        value: true,
                                        ind: index,
                                      });
                                    }}
                                  />
                                ) : (
                                  <div
                                    style={{
                                      height: "40px",
                                    }}
                                  >
                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        border: "0.5px solid #dad7d7",
                                        alignItems: "center",
                                        height: "38px",
                                        borderRadius: 5,
                                        height: 31,
                                      }}
                                      onClick={() => {
                                        setimg_index(index)
                                        setshow_modal_certificate({
                                          ...show_modal_certificate,
                                          value: true,
                                        });
                                      }}
                                    >
                                      <a
                                        style={{
                                          marginLeft: "3px",
                                          fontSize: 11,
                                        }}
                                      >
                                        Chooose File
                                      </a>
                                      <div
                                        style={{
                                          fontSize: "25px",
                                          color: "#dad7d7",
                                          marginLeft: "5px",
                                        }}
                                      >
                                        |
                                      </div>
                                      {certificate_img === "" ? (
                                        <a style={{ fontSize: 11 }}>
                                          Image Not Uploaded
                                        </a>
                                      ) : (
                                        <a style={{ fontSize: 11 }}>
                                          Image Uploaded
                                        </a>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </Col> */}

                      <Col lg={3} md={3} sm={6}>
                        <Label className="header-child">
                          Document *
                        </Label>

                        {row.map(
                          (item, index) => (
                            <div key={index}>
                              {item[4] == "" ? (
                                <input
                                  className="form-control d-block from control-md"
                                  bsSize="sm"
                                  type="file"
                                  style={{
                                    marginBottom: "15px",
                                  }}
                                  name="degree_doc"
                                  // disabled={row.length - 1 !== index}
                                  id="input"
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
                                      const reader = new FileReader();

                                      reader.onload =
                                        () => {
                                          const base64Url =
                                            reader.result;
                                          item[4] =
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
                              )
                                :
                                <>
                                  {console.log("item[4] ----", item[4].substring(0, 4))}
                                  <div
                                    style={{
                                      // height: "5px",
                                      // display:"flex",
                                      paddingBottom: 8,
                                    }}
                                  >
                                    {item[4].substring(0, 4) !== "data" ?
                                      <div style={{marginBottom:"13px"}}>
                                        <a
                                          href={`${bucket_address+item[4]}`}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                        >
                                          <img src={pdf} width="18" height="18" />
                                        </a>

                                      </div>
                                      :
                                      <div
                                        style={{
                                          background: row.length - 1 !== index && "#EFF2F7",
                                          display: "flex",
                                          flexDirection: "row",
                                          border: "0.5px solid #dad7d7",
                                          alignItems: "center",
                                          height: "38px",
                                          borderRadius: 5,
                                          height: 31,
                                        }}
                                        onClick={row.length - 1 === index && handleIClick}
                                      >
                                        <a
                                          style={{
                                            marginLeft: "3px",
                                            fontSize: 11,
                                          }}
                                        >
                                          Chooose File
                                        </a>
                                        <div
                                          style={{
                                            fontSize: "25px",
                                            color: "#dad7d7",
                                            marginLeft: "5px",
                                          }}
                                        >
                                          |
                                        </div>
                                        <a style={{ fontSize: 11 }}>
                                          Image Uploaded
                                        </a>
                                      </div>
                                    }

                                  </div>
                                  <input
                                    ref={fileInputRef1}
                                    type="file"
                                    style={{
                                      marginBottom:
                                        "15px",
                                      display: "none",
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
                                            //  item[5] = base64Url; // Set the value at index 5 in the 'item' directly
                                            const updatedInfo =
                                              [
                                                ...row,
                                              ];
                                            updatedInfo[
                                              index
                                            ][4] =
                                              base64Url;

                                            // Update the state with the modified 'education_info' array
                                            // seteducation_info(
                                            //   updatedInfo
                                            // );
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

                                </>
                              }

                            </div>
                          )
                        )}
                      </Col>

                      {/* ////////////////// */}

                      <Col lg={1}>
                        <div className="mb-3" style={{ textAlign: "center" }}>
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
                                  <div style={{ height: "10.5px" }}></div>
                                  <div
                                    onClick={() => {
                                      delete_callibration(item);
                                    }}
                                  // onClick={() => {
                                  //   if (item[4] && isupdating) {
                                  //     delete_callibration(item);
                                  //   } else {
                                  //     deleteinvoice(item);
                                  //     setinvoice_img(
                                  //       row[row.length - 1][0]
                                  //     );
                                  //     settoday(row[row.length - 1][1]);
                                  //     setinvoice_no(
                                  //       row[row.length - 1][2]
                                  //     );
                                  //     setinvoice_value(
                                  //       row[row.length - 1][3]
                                  //     );
                                  //   }
                                  // }}
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
                    {(isupdating && expired) &&
                      <>
                        <div style={{ margin: " 0 0 20px 0" }}>
                          <span
                            className="link-text"
                            // onClick={() => {
                            //   const lastRow = row[row.length - 1];
                            //   if (row[row.length - 1].some((data) => data === "")) {
                            //     alert("Please Fill Asset Callibration info")
                            //   } else {
                            //     add_callibration();
                            //   }
                            // }}
                            onClick={() => {
                              if (
                                row[row.length - 1][0] &&
                                row[row.length - 1][1] &&
                                row[row.length - 1][2] &&
                                row[row.length - 1][3]
                              ) {
                                setshow_modal_certificate({
                                  ...show_modal_certificate,
                                  value: false,
                                  ind: "",
                                });
                                add_callibration();
                              } else {
                                alert(" Asset Callibration info All Details Is Required");
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
                            Add Another
                          </span>
                        </div>
                      </>
                    }
                  </CardBody>
                ) : null}
              </Card>
            </Col>
          </div>
        )}
        {/* Footer */}
        <div className="m-3">
          <Col lg={12}>
            <div className="mb-1 footer_btn">
              <Button
                type="button"
                className={isupdating && (user.user_department_name === "ADMIN") ? "btn btn-info m-1" : !isupdating ? "btn btn-info m-1" : "btn btn-success m-1"}
                onClick={() => {

                  if (asset_type === "") {
                    setasset_type_error(true);
                    document.getElementById("asset_info").scrollIntoView();
                  }
                  else if (logger_box_type === "" && asset_type === "Logger") {
                    setlogger_box_type_error(true);
                    document.getElementById("log").scrollIntoView();

                  }

                  else if (manufacture_type === "" && asset_type === "Logger") {
                    setmanufacture_type_error(true);
                    document.getElementById("asset_info").scrollIntoView();
                  }

                  else if (temperature_log_type === "" && asset_type === "Logger") {
                    settemperature_log_type_error(true);
                  }
                  else if (logger_box_no == "" && asset_type === "Logger") {
                    setlogger_number_error(true);
                    document.getElementById("asset_info").scrollIntoView();
                  }
                  else if (other_manufacture_type === "" && manufacture_type === "Add New" && asset_type === "Logger") {
                    setAdd_manufacture_err(true);
                  }
                  else if ((row[row.length - 1][0] === "" || row[row.length - 1][1] === "" || row[row.length - 1][2] === "" || row[row.length - 1][3] === "" || row[row.length - 1][4] === "") && asset_type === "Logger") {
                    alert("Please Fill All Callibration info")
                  }

                  else if (box_type === "" && asset_type === "Temperature Control Box") {
                    setbox_type_error(true);
                    document.getElementById("box").scrollIntoView();
                  }
                  else if (temperature_type_box === "" && asset_type === "Temperature Control Box") {
                    settemperature_type_box_error(true);
                    document.getElementById("box").scrollIntoView();
                  }
                  else if (box_cap === "" && asset_type === "Temperature Control Box") {
                    setbox_capacity_error(true);
                    document.getElementById("box").scrollIntoView();
                  }
                  else if (!useproduct_id && asset_type === "Temperature Control Box" && box_type === "Credo") {
                    setproduct_id_error(true);
                    document.getElementById("box").scrollIntoView();
                  }
                  else if (branch_selected === "") {
                    setbranch_error(true);
                    document.getElementById("asset_details").scrollIntoView();

                  }
                  else {
                    isupdating ? updateAsset() : add_asset();
                  }

                }}
              >
                {isupdating && (user.user_department_name === "ADMIN" || user.is_superuser) ? "Update" : !isupdating ? "Save" : "Approved"}
              </Button>
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
  );
};

export default AddAsset;
