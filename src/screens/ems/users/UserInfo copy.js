import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Col,
  Card,
  CardBody,
  CardTitle,
  Label,
  FormFeedback,
  Row,
  Button,
} from "reactstrap";
import { ServerAddress } from "../../../constants/ServerAddress";
import { useSelector } from "react-redux";
import toTitleCase from "../../../lib/titleCase/TitleCase";
import axios from "axios";
import { IconContext } from "react-icons";
import { MdRemoveCircleOutline, MdAddCircleOutline } from "react-icons/md";
import SearchInput from "../../../components/formComponent/searchInput/SearchInput";

import { FiCheckSquare, FiSquare } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  setAlertType,
  setDataExist,
  setShowAlert,
} from "../../../store/alert/Alert";
import { useDispatch } from "react-redux";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import { useLayoutEffect } from "react";
import NSearchInput from "../../../components/formComponent/nsearchInput/NSearchInput";
import TransferList from "../../../components/formComponent/transferList/TransferList";
import Main_c from "../../../components/crop/main";
const UserInfo = () => {
  const locations = useLocation();

  const { state: up_params } = useLocation();
  const [profile_pic, setprofile_pic] = useState("")
  const [is_update, setis_update] = useState(false);
  const accessToken = useSelector((state) => state.authentication.access_token);
  const [is_active, setis_active] = useState(true);
  const [is_docket, setis_docket] = useState(false)
  const [docket_no, setdocket_no] = useState("")
  const [is_staff, setis_staff] = useState(true);
  const [is_coldchain, setis_coldchain] = useState(false)
  const [is_superuser, setis_superuser] = useState(false);
  const [channel_access, setchannel_access] = useState("");
  const [channel_access_o, setchannel_access_id] = useState("");
  const [date_joined, setdate_joined] = useState(new Date().toISOString().split("T")[0]);
  const [password, setpassword] = useState("");
  const [user, setuser] = useState("");
  const [user_type, setuser_type] = useState("");
  const [user_type_o, setuser_type_id] = useState([]);
  const [lodated, setlodated] = useState(false);
  const [user_role, setuser_role] = useState("");
  const [page, setpage] = useState(1);

  const [designation_list, setdesignation_list] = useState([]);

  const [designation, setdesignation] = useState("");
  const [designation_page, setdesignation_page] = useState(1)
  const [designation_id, setdesignation_id] = useState(0)
  const [designation_search, setdesignation_search] = useState("")
  const [designation_loaded, setdesignation_loaded] = useState(false)
  const [designation_count, setdesignation_count] = useState(1)
  const [designation_bottom, setdesignation_bottom] = useState(103)

  const userid = useSelector((state) => state.authentication.userdetails);
  const username = useSelector(
    (state) => state.authentication.userdetails.username
  );
  const [search_item, setsearch_item] = useState("");

  const [circle_btn, setcircle_btn] = useState(true);
  const [circle_btn2, setcircle_btn2] = useState(true);
  const [confirm_password, setconfirm_password] = useState("");
  const data_len = useSelector((state) => state.pagination.data_length);
  const page_num = useSelector((state) => state.pagination.page_number);
  const search = useSelector((state) => state.searchbar.search_item);
  const [password_err_1, setpassword_err_1] = useState(false);
  const [password_err_2, setpassword_err_2] = useState(false);
  const [password_err_3, setpassword_err_3] = useState(false);
  const [user_type_err, setuser_type_err] = useState(false);
  const [channel_access_err, setchannel_access_err] = useState(false);

  const [designation_err, setdesignation_err] = useState(false);
  const [user_role_err, setuser_role_err] = useState(false);
  const [permissions_list, setpermissions_list] = useState([]);
  const [home_branch_id, sethome_branch_id] = useState("");
  const [home_branch_list, sethome_branch_list] = useState([]);
  const [home_branch, sethome_branch] = useState("");
  const [search_branch, setsearch_branch] = useState("");
  const [branch_count, setbranch_count] = useState(1)
  const [branch_loaded, setbranch_loaded] = useState(false)
  const [branch_bottom, setbranch_bottom] = useState(103)
  const [home_branch_err, sethome_branch_err] = useState("");
  
  const [user_department_list, setuser_department_list] = useState([]);
  const [user_department, setuser_department] = useState("");
  const [user_department_page, setuser_department_page] = useState(1);
  const [user_department_id, setuser_department_id] = useState(null);
  const [search_user_department, setsearch_user_department] = useState("");
  const [user_department_err, setuser_department_err] = useState(false);
  const [department_loaded, setdepartment_loaded] = useState(false)
  const [department_count, setdepartment_count] = useState(1)
  const [department_bottom, setdepartment_bottom] = useState(103)

  // Ass Branch
  const [ass_branch_list, setass_branch_list] = useState([]);
  const [ass_branch_list2, setass_branch_list2] = useState([]);
  const [ass_branch_page, setass_branch_page] = useState(1);
  const [search_ass_branch, setsearch_ass_branch] = useState("");
  const [ass_branch_list_loaded, setass_branch_list_loaded] = useState(false)
const [ass_branch_list_count, setass_branch_list_count] = useState(1)

  // Ass Branch
  const [ass_department_list, setass_department_list] = useState([]);
  const [ass_department_list2, setass_department_list2] = useState([]);
  const [ass_department_page, setass_department_page] = useState(1);
  const [search_ass_department, setsearch_ass_department] = useState("");

  const dispatch = useDispatch();
  const toggle_circle = () => {
    setcircle_btn(!circle_btn);
  };
  const toggle_circle2 = () => {
    setcircle_btn2(!circle_btn2);
  };
  // const renderTooltip = (props) => (
  //   <Tooltip id="button-tooltip" {...props}>
  //     *Your password can’t be too similar to your other personal information.
  //     *Your password must contain at least 8 characters. *Your password can’t be
  //     a commonly used password. *Your password can’t be entirely numeric.
  //   </Tooltip>
  // );

  // Images state
  const [modal, setmodal] = useState(false);
  const [document, setdocument] = useState("");
  const [doc_result_image, setdoc_result_image] = useState("");

  const getBranches = () => {
    let temp3 = [];

    axios
      .get(
        ServerAddress +
        `master/all-branches/?search=${""}&p=${page}&records=${10}&branch_name=${[
          "",
        ]}&branch_city=${[""]}&vendor=${[""]}&branch_search=${search_branch}&data=all`,
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
              ...home_branch_list,
              ...response.data.results.map((v) => [v.id, toTitleCase(v.name)]),
            ];
          }
          setbranch_count(branch_count+2)
          sethome_branch_list(temp3);
        }
        else{
          sethome_branch_list([]);
        }

      })
      .catch((err) => {
        alert(`Error Occur in Get`, err);
      });
  };

  const getDesignations = () => {
    let temp3 = [];
    axios
      .get(
        ServerAddress +
        `master/get_designations/?search=${""}&p=${designation_page}&records=${10}&name_search=${designation_search}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        if (response.data.next === null) {
          setdesignation_loaded(false);
        } else {
          setdesignation_loaded(true);
        }

        if (response.data.results.length > 0) {
          if (designation_page === 1) {
            temp3 = response.data.results.map((v) => [
              v.id,
              toTitleCase(v.name),
            ]);
          } else {
            temp3 = [
              ...designation_list,
              ...response.data.results.map((v) => [v.id, toTitleCase(v.name)]),
            ];
          }
          setdesignation_count(designation_count+2)
          setdesignation_list(temp3);
        }
        else{
          setdesignation_list([]);
        }

      })
      .catch((err) => {
        alert(`Error Occur in Get`, err);
      });
  };

  const getAssBranches = () => {
    let temp_2 = [];
    let temp = [...ass_branch_list];
    axios
      .get(
        ServerAddress +
        `master/all-branches/?search=${""}&p=${ass_branch_page}&records=${10}&branch_name=${[
          "",
        ]}&branch_city=${[""]}&vendor=${[
          "",
        ]}&branch_search=${search_ass_branch}&data=all`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        temp = response.data.results;
        if (temp.length > 0) {
          if (response.data.next === null) {
            setass_branch_list_loaded(false);
          } else {
            setass_branch_list_loaded(true);
          }
          if (ass_branch_page === 1) {
            temp_2 = response.data.results.map((v) => [
              v.id,
              toTitleCase(v.name),
            ]);
          } else {
            temp_2 = [
              ...ass_branch_list,
              ...response.data.results.map((v) => [
                v.id,
                toTitleCase(v.name),
              ]),
            ];
          }
    
          setass_branch_list_count(ass_branch_list_count + 2);
          setass_branch_list(temp_2);
        }
        else{
          setass_branch_list([])
        }
        try {
          get_assupbranch(up_params.user.id, temp_2);
        } catch (error) { }
      })
      .catch((err) => {
        alert(`Error Occur in Get`, err);
      });
  };

  const getDepartments = () => {
    let temp3 = [];
    axios
      .get(
        ServerAddress +
        `ems/all-departments/?search=${""}&p=${user_department_page}&records=${10}&name=${[
          "",
        ]}&department_search=${search_user_department}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        if (response.data.next === null) {
          setdepartment_loaded(false);
        } else {
          setdepartment_loaded(true);
        }

        if (response.data.results.length > 0) {
          if (user_department_page === 1) {
            temp3 = response.data.results.map((v) => [
              v.id,
              toTitleCase(v.name),
            ]);
          } else {
            temp3 = [
              ...user_department_list,
              ...response.data.results.map((v) => [v.id, toTitleCase(v.name)]),
            ];
          }
          setdepartment_count(department_count+2)
          setuser_department_list(temp3);
        }
        else{
          setuser_department_list([]);
        }

        try {
          get_assupdepartment(up_params.user.id, temp3);
        } catch (error) { }
      })
      .catch((err) => {
        alert(`Error Occur in Get`, err);
      });
  };

  const getAssDepartments = () => {
    let temp3 = [];
    let data = [];
    axios
      .get(
        ServerAddress +
        `ems/all-departments/?search=${""}&p=${user_department_page}&records=${10}&name=${[
          "",
        ]}&department_search=${search_ass_department}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        if (response.data.results.length > 0) {
          data = response.data.results;
          for (let index = 0; index < data.length; index++) {
            temp3.push([data[index].id, toTitleCase(data[index].name)]);
          }
          temp3 = [...new Set(temp3.map((v) => `${v}`))].map((v) =>
            v.split(",")
          );
          setass_department_list(temp3);
        }
      })

      .catch((err) => {
        alert(`Error Occur in Get`, err);
      });
  };

  // Get Ass Updated Branch
  const [deleted_branchid, setdeleted_branchid] = useState([]);
  const [ass_branch_ids, setass_branch_ids] = useState([]);
  const [new_branch_ids, setnew_branch_ids] = useState([])
  const [old_branch_ids, setold_branch_ids] = useState([])

  const get_assupbranch = (user_id, branch_list) => {
    let temp = [];
    let temp2 = [];
    axios
      .get(ServerAddress + "ems/get_associatedbranch/?user_id=" + user_id, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        for (
          let index = 0;
          index < response.data.associated_branch.length;
          index++
        ) {
          const op_city = response.data.associated_branch[index];
          temp.push([op_city.id, toTitleCase(op_city.branch__name)]);
          temp2.push(op_city.id);
        }
        setass_branch_ids(temp2);
        setass_branch_list2(temp);
        let temp3 = [];
        let other_branches = [];

        for (let index = 0; index < temp.length; index++) {
          const element2 = temp[index][1];
          temp3.push(element2);
        }

        for (let index = 0; index < branch_list.length; index++) {
          const element = branch_list[index][1];
          if (temp3.includes(element) === false) {
            other_branches.push(branch_list[index]);
          }
        }
        setass_branch_list(other_branches);
        console.log("temp value is", temp);
        console.log("temp2 value is", temp2);
        console.log("temp3 value is", temp3);
        console.log("ass_branch_list", ass_branch_list);
      })
      .catch((err) => {
        alert(`Error Occur in Get , ${err}`);
      });
  };

  // useEffect(() => {
  //   if (ass_branch_ids !== "") {
  //     let id_list = packages_id.filter(
  //       (p) => package_id_list.indexOf(p) === -1
  //     );
  //     setdeleted_packages_id(id_list);
  //   }
  // }, [ass_branch_ids, packages_id]);

  // Get Ass Updated Branch
  console.log("is_docket-----", is_docket)
  console.log("docket_no-----", docket_no)
  const get_assupdepartment = (user_id, department_list) => {
    axios
      .get(ServerAddress + "ems/get_associateddepartment/?user_id=" + user_id, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        let temp = [];
        for (
          let index = 0;
          index < response.data.associated_department.length;
          index++
        ) {
          const op_city = response.data.associated_department[index];
          temp.push([op_city.id, toTitleCase(op_city.department__name)]);
        }

        setass_department_list2(temp);
        let temp3 = [];
        let other_cities = [];

        for (let index = 0; index < temp.length; index++) {
          const element2 = temp[index][1];
          temp3.push(element2);
        }

        for (let index = 0; index < department_list.length; index++) {
          const element = department_list[index][1];
          if (temp3.includes(element) === false) {
            other_cities.push(department_list[index]);
          }
        }
        setass_department_list(other_cities);
      })
      .catch((err) => {
        alert(`Error Occur in Get , ${err}`);
      });
  };

  const add_user = (values) => {

    axios
      .post(
        ServerAddress + "ems/add-user/",
        {
          username: values.username,
          email: values.email,
          first_name: toTitleCase(values.first_name).toUpperCase(),
          last_name: toTitleCase(values.last_name).toUpperCase(),
          mobilenumber: values.phone_number,
          date_joined: date_joined,
          password: password,
          user_type: user_type.toUpperCase(),
          channel_access: channel_access.toUpperCase(),
          designation: designation_id,
          // user_role: user_role.toUpperCase(),
          is_staff: is_staff,
          is_active: is_active,
          is_coldchain: is_coldchain,
          is_superuser: is_superuser,
          home_branch: home_branch_id,
          created_by: username,
          user_department: user_department_id,
          associated_branch: ass_branch_list2,
          // associated_department: ass_department_list2,
          is_docket_entry: is_docket,
          starting_docket_no: docket_no === "" ? null : docket_no,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (resp) {
        if (resp.status === 201) {
          if (document) {
            send_user_pic(resp.data.user_id);
          }
          add_user_permission(resp.data);          
          add_user_permission(resp.data.user_id);
          dispatch(setShowAlert(true));
          dispatch(setDataExist(`${values.username} Added sucessfully`));
          dispatch(setAlertType("success"));
          navigate("/ems/users");
        }
        else if (resp.data === "duplicate mobilenumber") {
          dispatch(
            setDataExist(
              `Mobile Number ${values.phone_number} already exists`
            )
          );
          dispatch(setAlertType("warning"));
          dispatch(setShowAlert(true));
        }
        else if (resp.data === "duplicate username") {
          dispatch(
            setDataExist(
              `User Name "${values.username}" already exists`
            )
          );
          dispatch(setAlertType("warning"));
          dispatch(setShowAlert(true));
        }
      })
      .catch((err) => {
        alert(`error occur while adding ${username},${err}`);
      });
  };

  const getGroupPermission = () => {
    axios
      .get(
        ServerAddress +
        "ems/get_grouppermission/?department_id=" +
        user_department_id,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((resp) => {
        setupdated_permission(resp.data.grouppermission);
      })
      .catch((err) => {
        alert(`Error Occur While Getting User Details, ${err}`);
      });
  };

  const update_user_permission = () => {
    axios
      .post(
        ServerAddress + "ems/update_user_permissions/",
        {
          user: user.id,
          permissions_list: permission_title_list,
          modified_by: userid.id,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (resp) {
        if (resp.data.status === "success") {
          dispatch(setDataExist(`${user.username} Updated sucessfully`));
          dispatch(setAlertType("info"));
          dispatch(setShowAlert(true));
          navigate("/ems/users");
        }
      })
      .catch((err) => {
        alert(`error occur while updating permission by ${username},${err}`);
      });
  };

  const update_user = (values) => {
    axios
      .post(
        ServerAddress + "ems/update-user/",
        {
          username: values.username,
          email: values.email,
          first_name: toTitleCase(values.first_name).toUpperCase(),
          last_name: toTitleCase(values.last_name).toUpperCase(),
          mobilenumber: values.phone_number,
          date_joined: date_joined,
          user_type: user_type.toUpperCase(),
          channel_access: channel_access.toUpperCase(),
          designation: designation_id,
          // user_role: user_role.toUpperCase(),
          is_staff: is_staff,
          is_active: is_active,
          is_coldchain: is_coldchain,
          is_superuser: is_superuser,
          home_branch: home_branch_id,
          modified_by: username,
          user_department: user_department_id,
          // associated_branch: ass_branch_list2,
          old_branch_ids: old_branch_ids,
          new_branch_ids: new_branch_ids,
          deleted_branchid: deleted_branchid,
          // associated_department: ass_department_list2,
          is_docket_entry: is_docket,
          starting_docket_no: docket_no,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (resp) {
        console.log("up resp----", resp)
        if (resp.status == 202 && user.is_superuser === false) {
          // setlodated(true)
          update_user_permission();
          if (document) {
            send_user_pic(up_params.user.id);
          }

          // navigate("/ems/users");
        }
        else if (resp.status == 202 && user.is_superuser === true) {
          dispatch(setDataExist(`"${values.username}" Updated Sucessfully`));
          dispatch(setAlertType("info"));
          dispatch(setShowAlert(true));
          navigate("/ems/users");
        }
        else if (resp.data === "duplicate mobilenumber") {
          dispatch(
            setDataExist(
              `Mobile Number ${values.phone_number} already exists`
            )
          );
          dispatch(setAlertType("warning"));
          dispatch(setShowAlert(true));
        }
      else if (resp.data === "duplicate username") {
          dispatch(
            setDataExist(
              `User Name "${values.username}" already exists`
            )
          );
          dispatch(setAlertType("warning"));
          dispatch(setShowAlert(true));
        }
      })
      .catch((err) => {
        alert(`error occur while updating${username},${err}`);
      });
  };

  const add_user_permission = (user_id) => {
    axios
      .post(
        ServerAddress + "ems/add_user_permissions/",
        {
          user: user_id,
          permissions_list: permission_title_list,
          created_by: userid.id,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (resp) {
        // navigate("/ems/users");
        // dispatch(setShowAlert(true));
        // dispatch(setDataExist(`${usernm} Permission Added sucessfully`));
        // dispatch(setAlertType("success"));
      })
      .catch((err) => {
        alert(`error occur while adding permission by ${username}, ${err}`);
      });
  };

  const setPermissions = (idxx, idx) => {
    let tmp = permissions_list;
    // if (permissions_list.length > 0) {
    //   let avl = permissions_list.some(
    //     (val) => val.toString() == permissions.toString()
    //   );
    //   if (!avl) {
    //     tmp.push(permissions);
    //   }
    // } else {
    //   tmp.push(permissions);
    // }
    permission_title_list[idx][idxx] = true;
    setrefresh(!refresh);
  };
  const removePermissions = (idxx, idx) => {
    // let filterlist = permissions_list.filter(
    //   (val) => val.toString() != permissions.toString()
    // );
    // setpermissions_list(filterlist);
    permission_title_list[idx][idxx] = false;
    setrefresh(!refresh);
  };
  const navigate = useNavigate();

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      // This should be in small letter or smallcase
      first_name: toTitleCase(user.first_name) || "",
      last_name: toTitleCase(user.last_name) || "",
      username: user.username || "",
      phone_number: user.mobilenumber || "",
      email: user.email || "",
    },

    validationSchema: Yup.object({
      first_name: Yup.string().required("First name is required"),
      last_name: Yup.string().required("Last name is required"),
      username: Yup.string().required("Username is required"),
      email: Yup.string()
        .email("Invalid Email Formate")
        .required("Email is required"),
      phone_number: Yup.string()
        .min(10, "Invalid number")
        .max(10, "invalid number")
        .required("Phone number is required"),
    }),

    onSubmit: (values) => {
      is_update ? update_user(values) : add_user(values);
    },
  });
  const [updated_permission, setupdated_permission] = useState([]);
  const [permission_title_list, setpermission_title_list] = useState([
    ["Ems", "Login Details", false, false, false, false, ""],
    ["Ems", "Users", false, false, false, false, ""],
    ["Booking", "Order", false, false, false, false, ""],
    ["Booking", "Airport Order", false, false, false, false, ""],
    ["Booking", "eWaybill", false, false, false, false, ""],
    ["Booking", "Cold Chain", false, false, false, false, ""],
    ["Booking", "Packages", false, false, false, false, ""],
    ["Booking", "Order Images", false, false, false, false],
    ["Booking", "Invoices", false, false, false, false, ""],
    ["Booking", "Order Status", false, false, false, false],
    ["Booking", "Delivery Info", false, false, false, false, ""],
    ["Booking", "Docket Issues", false, false, false, false, ""],
    ["Master", "Bill To", false, false, false, false, ""],

    ["Master", "Client", false, false, false, false, ""],
    ["Master", "Calculation Info", false, false, false, false, ""],
    ["Master", "Billing Info", false, false, false, false, ""],
    ["Master", "Commodity", false, false, false, false, ""],

    ["Master", "Locations", false, false, false, false, ""],
    ["Master", "Branch", false, false, false, false, ""],
    ["Master", "Vendor", false, false, false, false, ""],
    ["Master", "Charges", false, false, false, false, ""],
    ["Master", "Asset", false, false, false, false, ""],
    ["Master", "Routes", false, false, false, false, ""],
    ["Master", "Shipper/Consignee", false, false, false, false, ""],
    ["Master", "Domestic Rates", false, false, false, false, ""],
    ["Billing", "Bill Closed", false, false, false, false, ""],
    ["Billing", "Warai Charges", false, false, false, false, ""],

    ["Billing", "Invoices", false, false, false, false, ""],
    ["Manifest", "Panding For Dispatch", false, false, false, false, ""],
    ["Manifest", "Hub Dispatch", false, false, false, false, ""],
    ["Manifest", "Raugh Manifest", false, false, false, false, ""],
    ["Manifest", "Panding To Depart", false, false, false, false, ""],
    ["Manifest", "Incoming Manifest", false, false, false, false, ""],
    ["Manifest", "All Manifest", false, false, false, false, ""],
    ["Runsheet", "Pending Delivery", false, false, false, false, ""],
    ["Runsheet", "All Runsheet", false, false, false, false, ""],
  ]);

  const [refresh, setrefresh] = useState(false);
  const [user_role_o, setuser_role_id] = useState("");

  const [user_type_list, setuser_type_list] = useState([
    ["EMPLOYEE", "Employee"],
    ["BILL TO", "Bill To"],
    ["COLOADER", "Coloader"],
    ["CUSTOMER", "Customer"],
    ["QU", "QIL User"],
    ["COM", "Company User"],
    ["CU", "Client User"],
  ]);

  const [channel_access_list, setchannel_access_list] = useState([
    ["Web", "Web"],
    ["Mobile", "Mobile"],
    ["Both", "Web + Mobile"],
  ]);

  const [user_role_list, setuser_role_list] = useState([
    ["Marketing Team", "Marketing Team"],
    ["Front Desk Team", "Front Desk Team"],
    ["Sales Team", "Sales"],
    ["Operations", "Operations"],
    ["Admin Team", "Admin Team"],
  ]);

  useEffect(() => {
    if (home_branch) {
      sethome_branch_err(false);
    }
    if (user_type) {
      setuser_type_err(false);
    }
    if (channel_access) {
      setchannel_access_err(false);
    }
    if (designation) {
      setdesignation_err(false);
    }
    if (password) {
      setpassword_err_1(false);
    }
    if (password.length >= 8) {
      setpassword_err_2(false);
    }
    if (password === confirm_password) {
      setpassword_err_3(false);
    }
    if (user_department) {
      setuser_department_err(false);
    }
  }, [
    home_branch,
    user_type,
    channel_access,
    designation,

    password,
    confirm_password,
  ]);


  const send_user_pic = (u_id) =>{
    const docket_imageform = new FormData();
    docket_imageform.append(`user_image`,document,document?.name)   
    docket_imageform.append(`user_id`,u_id)

    axios
    .post(ServerAddress + "ems/add_profilepic/", docket_imageform, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "content-type": "multipart/form-data",
      },
    })
    .then((res) => {
      if (res.data.Data === "Done") {
        dispatch(setShowAlert(true));
        dispatch(
          setDataExist(`Image Has Been Saved Successfully !`)
        );
        dispatch(setAlertType("success"));
        // alert(`Your Docket Image Saved Successfully`);
      
      } 
    })
    .catch((err) => { });

  }
  useLayoutEffect(() => {
    try {
      let user_u = up_params.user;
      let date1 = user_u.date_joined;
      console.log("user_u--------", user_u)
      let fdate = date1.split("T")[0];
      setis_update(true);
      setuser(user_u);
      sethome_branch(toTitleCase(user_u.branch_nm));
      setdate_joined(fdate);
      // setdate_joined(date1);
      sethome_branch_id(user_u.home_branch);
      setuser_type(toTitleCase(user_u.user_type));
      setchannel_access(toTitleCase(user_u.channel_access));
      setdesignation(toTitleCase(user_u.designation_name));
      setdesignation_id(user_u.designation)
      // setuser_role(toTitleCase(user_u.user_role));
      setis_staff(user_u.is_staff);
      setis_active(user_u.is_active);
      setis_superuser(user_u.is_superuser);
      setuser_department(toTitleCase(user_u.user_department_name));
      setuser_department_id(user_u.user_department);
      setdocket_no(user_u.starting_docket_no)
      setis_docket(user_u.is_docket_entry)
      setis_coldchain(user_u.view_coldchain)
    } catch (error) { }
  }, []);

  useLayoutEffect(() => {
    getBranches();
  }, [page, search_branch]);

  useEffect(() => {
    getDesignations()
  }, [designation_page, designation_search])

  useLayoutEffect(() => {
    getAssBranches();
  }, [ass_branch_page, search_ass_branch]);

  useLayoutEffect(() => {
    getDepartments();
  }, [user_department_page, search_user_department]);

  useLayoutEffect(() => {
    getAssDepartments();
  }, [ass_department_page, search_ass_department]);

  // useLayoutEffect(() => {
  //   if (home_branch !== "") {
  //     console.log("ass_branch_list---", ass_branch_list)
  //     console.log("home_branch---", home_branch)
  //     let newData = home_branch_list.filter((e) =>
  //       e[1] !== home_branch
  //     )
  //     console.log("newData---", newData)
  //     // setass_branch_list(newData);
  //   }
  // }, [home_branch]);

  //Permission
  const getUserPermission = () => {
    axios
      .get(
        ServerAddress + "ems/get_userpermission/?username=" + user.username,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((resp) => {
        setupdated_permission(resp.data.permission);
      })
      .catch((err) => {
        alert(`Error Occur While Getting User Details, ${err}`);
      });
  };

  useEffect(() => {
    if (is_update === true && user.is_superuser === false) {
      getUserPermission();
    }
  }, [is_update]);

  useEffect(() => {
    if (user.is_superuser === false && is_update === true) {
      let temp_p = [];
      for (let index = 0; index < updated_permission.length; index++) {
        const element = updated_permission[index];
        temp_p.push(Object.values(element));
      }
      setpermission_title_list(temp_p);
    }
  }, [updated_permission, user]);

  useEffect(() => {
    if (is_update === false && user_department_id !== null) {
      let temp_p = [];
      for (let index = 0; index < updated_permission.length; index++) {
        const element = updated_permission[index];
        temp_p.push(Object.values(element));
      }
      setpermission_title_list(temp_p);
    }
  }, [updated_permission, user_department_id]);

  useEffect(() => {
    if (is_update === false && user_department_id !== null) {
      getGroupPermission();
    }
  }, [is_update, user_department]);

  useEffect(() => {
    if (is_superuser === true) {
      setuser_department("");
    }
  }, [is_superuser]);

  useEffect(() => {
    let item = ass_branch_list2.map((p) => p[0])
    let new_ids = item.filter((p) => !ass_branch_ids.includes(p))
    setnew_branch_ids(new_ids)
    let deleted_ids = ass_branch_ids.filter((p) => item.indexOf(p) == -1);
    setdeleted_branchid(deleted_ids)

    let old_data = ass_branch_ids.filter(v => !deleted_ids.includes(v))
    setold_branch_ids(old_data)

  }, [ass_branch_ids, ass_branch_list2, ass_branch_list])
  console.log("user_type_err=======", user_type_err)
  console.log("user_type========", user_type)
  return (
    <div>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          if (!home_branch) {
            sethome_branch_err(true);
          }
          else if (!user_type) {
            setuser_type_err(true);
          }
          else if (!channel_access) {
            setchannel_access_err(true);
          }
          else if (!designation) {
            setdesignation_err(true);
          }
          else if (!user_department && !is_superuser) {
            setuser_department_err(true);
          }
          else if (!is_update && !password) {
            setpassword_err_1(true);
            alert("lllll")
          }
          else if (!is_update && password.length < 8) {
            setpassword_err_2(true);
            alert("lllll")
          }
          else if (!is_update && password !== confirm_password) {
            setpassword_err_3(true);
            alert("kkkkk")
          }
          else{
            validation.handleSubmit(e.values);
          }

          return false;
        }}
      >
        <div className="m-4">
          <div className="mb-2 main-header">
            {is_update ? "Update User" : "Add User"}
          </div>
          <Col lg={12}>
            <Card className="shadow bg-white rounded">
              <CardTitle className="mb-1 header">
                <div className="header-text-icon header-text">
                  <div>User info</div>
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
                        <Label className="header-child">First Name*</Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.first_name || ""}
                          invalid={
                            validation.touched.first_name &&
                              validation.errors.first_name
                              ? true
                              : false
                          }
                          type="text"
                          name="first_name"
                          className="form-control-md"
                          id="input"
                          placeholder="Enter first name"
                        />
                        {validation.touched.first_name &&
                          validation.errors.first_name ? (
                          <FormFeedback type="invalid">
                            {validation.errors.first_name}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-3">
                        <Label className="header-child">Last Name*</Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.last_name || ""}
                          invalid={
                            validation.touched.last_name &&
                              validation.errors.last_name
                              ? true
                              : false
                          }
                          type="text"
                          name="last_name"
                          className="form-control-md"
                          id="input"
                          placeholder="Enter last name"
                        />
                        {validation.touched.last_name &&
                          validation.errors.last_name ? (
                          <FormFeedback type="invalid">
                            {validation.errors.last_name}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-3">
                        <Label className="header-child">Username*:</Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.username || ""}
                          invalid={
                            validation.touched.username &&
                              validation.errors.username
                              ? true
                              : false
                          }
                          type="text"
                          name="username"
                          className="form-control-md"
                          id="input"
                          placeholder="Enter user Id"
                          disabled={is_update}
                        />
                        {validation.touched.username &&
                          validation.errors.username ? (
                          <FormFeedback type="invalid">
                            {validation.errors.username}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                    {!is_update && (
                      <>
                        <Col lg={4} md={6} sm={6}>
                          <div className="mb-2">
                            <Label className="header-child">Password*:</Label>
                            <Row>
                              <Col lg={12}>
                                <div>
                                  <Input
                                    onChange={(val) =>
                                      setpassword(val.target.value)
                                    }
                                    value={password}
                                    invalid={password_err_1 || password_err_2}
                                    type="password"
                                    name="password"
                                    className="form-control-md"
                                    id="input"
                                    placeholder="Enter password"
                                    disabled={is_update}
                                  />

                                  {password_err_1 && (
                                    <FormFeedback type="invalid">
                                      Please Add Password
                                    </FormFeedback>
                                  )}
                                  {password_err_2 && (
                                    <FormFeedback type="invalid">
                                      Password Atleast 8 Character long
                                    </FormFeedback>
                                  )}
                                </div>
                              </Col>
                            </Row>
                          </div>
                        </Col>
                        <Col lg={4} md={6} sm={6}>
                          <div className="mb-3">
                            <Label className="header-child">
                              {" "}
                              Password Confirmation*:
                            </Label>
                            <Input
                              onChange={(val) =>
                                setconfirm_password(val.target.value)
                              }
                              value={confirm_password}
                              invalid={password_err_3}
                              type="password"
                              name="confirm_password"
                              className="form-control-md"
                              id="input"
                              placeholder="Confirm password"
                              disabled={is_update}
                            />
                            {password_err_3 && (
                              <FormFeedback type="invalid">
                                Password and Confirm Password must match
                              </FormFeedback>
                            )}
                          </div>
                        </Col>
                      </>
                    )}
                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-3">
                        <Label className="header-child">Phone number*</Label>
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
                          name="phone_number"
                          className="form-control-md"
                          id="input"
                          placeholder="Enter phone number"
                        />
                        {validation.touched.phone_number &&
                          validation.errors.email ? (
                          <FormFeedback type="invalid">
                            {validation.errors.phone_number}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-3">
                        <Label className="header-child">Email*</Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.email || ""}
                          invalid={
                            validation.touched.email && validation.errors.email
                              ? true
                              : false
                          }
                          type="text"
                          name="email"
                          className="form-control-md"
                          id="input"
                          placeholder="Enter email"
                        />
                        {validation.touched.email && validation.errors.email ? (
                          <FormFeedback type="invalid">
                            {validation.errors.email}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">Home Branch *:</Label>
                        <SearchInput
                          data_list={home_branch_list}
                          setdata_list={sethome_branch_list}
                          data_item_s={home_branch}
                          set_data_item_s={sethome_branch}
                          page={page}
                          setpage={setpage}
                          set_id={sethome_branch_id}
                          setsearch_item={setsearch_branch}
                          error_message={"Please Select Any Branch"}
                          error_s={home_branch_err}
                          loaded={branch_loaded}
                          count={branch_count}
                          bottom={branch_bottom}
                          setbottom={setbranch_bottom}
                        />
                      </div>
                      {/* <div className="mt-1 error-text" color="danger">
                        {home_branch_err ? "Please Select Any Branch" : null}
                      </div> */}
                    </Col>
                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">
                          Application Usage Type*:
                        </Label>
                        <NSearchInput
                          data_list={user_type_list}
                          data_item_s={user_type}
                          set_data_item_s={setuser_type}
                          set_id={setuser_type_id}
                          show_search={false}
                          setsearch_item={setsearch_item}
                          error_message={"Please Select Any Application Usage Type"}
                          error_s={user_type_err}
                        />
                      </div>
                      {/* <div className="mt-1 error-text" color="danger">
                        {user_type_err ? "Please Select Any User Type" : null}
                      </div> */}
                    </Col>
                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">Channel Access*:</Label>
                        <NSearchInput
                          data_list={channel_access_list}
                          data_item_s={channel_access}
                          set_data_item_s={setchannel_access}
                          set_id={setchannel_access_id}
                          show_search={false}
                          setsearch_item={setsearch_item}
                          error_message={"Please Select Any Channel Access"}
                          error_s={channel_access_err}
                        />
                      </div>
                      {/* <div className="mt-1 error-text" color="danger">
                        {channel_access_err
                          ? "Please Select Any Channel Access"
                          : null}
                      </div> */}
                    </Col>
                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">Designation*:</Label>
                        <SearchInput
                          data_list={designation_list}
                          setdata_list={setdesignation_list}
                          data_item_s={designation}
                          set_data_item_s={setdesignation}
                          set_id={setdesignation_id}
                          page={designation_page}
                          setpage={setdesignation_page}
                          setsearch_item={setdesignation_search}
                          error_message={"Please Select Any Designation"}
                          error_s={designation_err}
                          loaded={designation_loaded}
                          count={designation_count}
                          bottom={designation_bottom}
                          setbottom={setdesignation_bottom}
                        />
                      </div>
                      {/* <div className="mt-1 error-text" color="danger">
                        {designation_err
                          ? "Please Select Any Designation"
                          : null}
                      </div> */}
                    </Col>
                    {/* <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">User Role * :</Label>
                        <NSearchInput
                          data_list={user_role_list}
                          data_item_s={user_role}
                          set_data_item_s={setuser_role}
                          set_id={setuser_role_id}
                          show_search={false}
                          setsearch_item={setsearch_item}
                          error_message={"Please Select Any Designation"}
                          error_s={user_role_err}
                        />
                      </div>
                      {/* <div className="mt-1 error-text" color="danger">
                        {user_role_err ? "Please Select Any Designation" : null}
                      </div>
                    </Col> */}
                    {!is_superuser && (
                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-2">
                          <Label className="header-child"></Label>
                          <SearchInput
                            data_list={user_department_list}
                            setdata_list={setuser_department_list}
                            data_item_s={user_department}
                            set_data_item_s={setuser_department}
                            page={user_department_page}
                            error_message={"Please Select Any Department"}
                            error_s={user_department_err}
                            setpage={setuser_department_page}
                            set_id={setuser_department_id}
                            setsearch_item={setsearch_user_department}
                            loaded={department_loaded}
                            count={department_count}
                            bottom={department_bottom}
                            setbottom={setdepartment_bottom}
                          />
                        </div>
                        {/* <div className="mt-1 error-text" color="danger">
                          {user_department_err
                            ? "Please Select Any Designation"
                            : null}
                        </div> */}
                      </Col>
                    )}
                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">Joined Date :</Label>
                        <Input
                          type="date"
                          className="form-control d-block form-control-md"
                          id="input"
                          value={date_joined}
                          onChange={(val) => {
                            setdate_joined(val.target.value);
                          }}
                        />
                      </div>
                    </Col>
                    {is_update &&
                      <Col lg={2} md={3} sm={3}>
                        <div className="mb-3">
                          <Label className="header-child">Is Staff</Label>
                          <div onClick={() => setis_staff(!is_staff)}>
                            {is_staff ? (
                              <FiCheckSquare size={17} />
                            ) : (
                              <FiSquare size={17} />
                            )}
                          </div>
                        </div>
                      </Col>
                    }
                    <Col lg={2} md={3} sm={3}>
                      <div className="mb-3">
                        <Label className="header-child">Is Active</Label>
                        <div onClick={() => setis_active(!is_active)}>
                          {is_active ? (
                            <FiCheckSquare size={17} />
                          ) : (
                            <FiSquare size={17} />
                          )}
                        </div>
                      </div>
                    </Col>
                    <Col lg={2} md={3} sm={3}>
                      <div className="mb-3">
                        <Label className="header-child">Cold Chain</Label>
                        <div onClick={() => setis_coldchain(!is_coldchain)}>
                          {is_coldchain ? (
                            <FiCheckSquare size={17} />
                          ) : (
                            <FiSquare size={17} />
                          )}
                        </div>
                      </div>
                    </Col>

                    <Col lg={2} md={3} sm={3}>
                      <div className="mb-3">
                        <Label className="header-child">Docket Start From</Label>
                        <div onClick={() => setis_docket(!is_docket)}>
                          {is_docket ? (
                            <FiCheckSquare size={17} />
                          ) : (
                            <FiSquare size={17} />
                          )}
                        </div>
                      </div>
                    </Col>
                    {is_docket &&
                      <Col lg={2} md={6} sm={6}>
                        <Label className="header-child">Starting Docket No.</Label>
                        <div className="">
                          <Input
                            type="number"
                            className="form-control-md"
                            id="input"
                            value={docket_no}
                            onChange={(e) =>
                              setdocket_no(e.target.value)
                            }
                            placeholder="Enter Docket Number"
                          />
                        </div>
                      </Col>
                    }
                    {user.is_superuser && is_update &&
                      <Col lg={2} md={3} sm={3}>
                        <div className="mb-3">
                          <Label className="header-child">Is Superuser</Label>
                          <div onClick={() => setis_superuser(!is_superuser)}>
                            {is_superuser ? (
                              <FiCheckSquare size={17} />
                            ) : (
                              <FiSquare size={17} />
                            )}
                          </div>
                        </div>
                      </Col>
                    }
                    {modal ? <Main_c modal={modal}
                            modal_set={setmodal}
                            upload_image={setdocument}
                            result_image={setdoc_result_image}

                            /> : null}
                     <Col lg={6} md={6} sm={6}>
                            <div className="mb-3">
                              <Label className="header-child">
                                Profile Pic
                              </Label>
                              <div
                             className="mb-3"
                             onClick={() => {
                               setmodal(true);
                             }}
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                height: "38px",
                                border: "1px solid #dad7d7",
                                alignItems:"center"
                              }}
                            >
                              <div style={{marginLeft:"3px"}} >Choose File:</div>
                              <div style={{fontSize:"25px",color:"#dad7d7",marginLeft:"5px"}}>|</div>
                             {document ? (
                              <div style={{fontWeight:"bold",color:"blue"}}>Image Uploaded</div>
                             ):(
                              <div> No File Chosen</div>
                             )
                            }
                            </div>
                            </div>
                          </Col>
                    <Col lg={12} md={6} sm={12}>
                      <div style={{ width: "" }}>
                        <Label className="header-child">
                          Associated Branch *
                        </Label>
                        <TransferList
                          list_a={ass_branch_list}
                          setlist_a={setass_branch_list}
                          list_b={ass_branch_list2}
                          setlist_b={setass_branch_list2}
                          page={ass_branch_page}
                          setpage={setass_branch_page}
                          setsearch_item={setsearch_ass_branch}
                          loaded={ass_branch_list_loaded}
                          count={ass_branch_list_count}
                        // width={"width"}
                        />
                      </div>
                    </Col>
                    

                    {/* <Col lg={6} md={6} sm={12}>
                      <div style={{ width: "", marginLeft: "" }}>
                        <Label className="header-child">
                          Associated Department *
                        </Label>
                        <TransferList
                          list_a={ass_department_list}
                          setlist_a={setass_department_list}
                          list_b={ass_department_list2}
                          setlist_b={setass_department_list2}
                          page={ass_department_page}
                          setpage={setass_department_page}
                          setsearch_item={setsearch_ass_department}
                          width={"width"}
                        />
                      </div>
                    </Col> */}
                  </Row>
                </CardBody>
              ) : null}
            </Card>
          </Col>
        </div>
        <div className="m-4">
          <div className=" mb-2 main-header"></div>
          <Col lg={12}>
            <Card className="shadow bg-white rounded">
              <CardTitle className="mb-1 header">
                <div className="header-text-icon header-text">
                  <div>Permissions</div>
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
                  <div style={{ borderWidth: 1 }}>
                    <div
                      className="fixTableHead"
                      style={{ overflowY: "auto", maxHeight: "500px" }}
                    >
                      <table
                        className="topheader table-light"
                        style={{
                          borderCollapse: "collapse",
                          width: "100%",
                          borderWidth: 1,
                        }}
                      >
                        <thead>
                          <tr style={{ lineHeight: 2, borderWidth: 1 }}>
                            <th
                              style={{
                                whiteSpace: "nowrap",
                                textAlign: "center",
                                padding: "0px 0px",
                              }}
                            >
                              Section
                            </th>
                            <th
                              style={{
                                whiteSpace: "nowrap",
                                textAlign: "center",
                                padding: "0px 0px",
                              }}
                            >
                              Page
                            </th>
                            <th
                              style={{
                                whiteSpace: "nowrap",
                                textAlign: "center",
                              }}
                            >
                              View
                            </th>
                            <th
                              style={{
                                whiteSpace: "nowrap",
                                textAlign: "center",
                              }}
                            >
                              Add
                            </th>
                            <th
                              style={{
                                whiteSpace: "nowrap",
                                textAlign: "center",
                              }}
                            >
                              Change
                            </th>
                            <th
                              style={{
                                whiteSpace: "nowrap",
                                textAlign: "center",
                              }}
                            >
                              Delete
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          {permission_title_list.map((item, idx) => {
                            return (
                              <tr
                                key={idx}
                                style={{
                                  borderWidth: 1,
                                }}
                              >
                                <td>{item[0]}</td>
                                <td>{item[1]}</td>
                                <td>
                                  <Input
                                    className="form-check-input-sm"
                                    type="checkbox"
                                    onClick={() => {
                                      // if (!item[3] && !item[4] && !item[5]) {
                                      if (!item[2]) {
                                        setPermissions(2, idx);
                                      } else {
                                        removePermissions(2, idx);
                                      }
                                      // }
                                    }}
                                    checked={is_superuser ? true : item[2]}
                                    disabled={is_superuser}
                                    readOnly
                                  />
                                </td>

                                <td>
                                  <Input
                                    className="form-check-input-sm"
                                    type="checkbox"
                                    onClick={() => {
                                      if (!item[3]) {
                                        setPermissions(3, idx);
                                        setPermissions(2, idx);
                                      } else {
                                        removePermissions(3, idx);
                                      }
                                    }}
                                    checked={is_superuser ? true : item[3]}
                                    disabled={is_superuser}
                                    readOnly
                                  />
                                </td>
                                <td>
                                  <Input
                                    className="form-check-input-sm"
                                    type="checkbox"
                                    onClick={() => {
                                      if (!item[4]) {
                                        setPermissions(4, idx);
                                        setPermissions(3, idx);
                                        setPermissions(2, idx);
                                      } else {
                                        removePermissions(4, idx);
                                      }
                                    }}
                                    checked={is_superuser ? true : item[4]}
                                    disabled={is_superuser}
                                    readOnly
                                  />
                                </td>
                                <td>
                                  <Input
                                    className="form-check-input-sm"
                                    type="checkbox"
                                    onClick={() => {
                                      if (!item[5]) {
                                        setPermissions(4, idx);
                                        setPermissions(5, idx);
                                        setPermissions(3, idx);
                                        setPermissions(2, idx);
                                      } else {
                                        removePermissions(5, idx);
                                      }
                                    }}
                                    checked={is_superuser ? true : item[5]}
                                    disabled={is_superuser}
                                    readOnly
                                  />
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardBody>
              ) : null}
            </Card>
          </Col>
        </div>
        <div className=" m-4">
          <Col lg={12}>
            <div className="mb-1 footer_btn">
              <button type="submit" className="btn btn-info m-1">
                {is_update ? "Update" : "Save"}
              </button>
              <button
                type="button"
                className="btn btn-info m-1"
                onClick={() => {
                  navigate("/ems/users");
                }}
              >
                Cancel
              </button>
            </div>
          </Col>
        </div>
      </Form >
    </div >
  );
};

export default UserInfo;
