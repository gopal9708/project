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
} from "reactstrap";
import { RiArrowDropDownLine } from "react-icons/ri";
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
import { useLayoutEffect } from "react";
import NSearchInput from "../../../components/formComponent/nsearchInput/NSearchInput";
import TransferList from "../../../components/formComponent/transferList/TransferList";
import { setUserDetails, setUserPermission } from "../../../store/authentication/Authentication";
import ImgModal from "../../../components/crop/ImgModal";
const UserInfo = () => {
  const locations = useLocation();

  const { state: up_params } = useLocation();
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
  const [page, setpage] = useState(1);
  const [showRow, setshowRow] = useState([]);
  const [designation_list, setdesignation_list] = useState([]);

  const [designation, setdesignation] = useState("");
  const [designation_page, setdesignation_page] = useState(1)
  const [designation_id, setdesignation_id] = useState(0)
  const [designation_search, setdesignation_search] = useState("")
  const [designation_loaded, setdesignation_loaded] = useState(false)
  const [designation_count, setdesignation_count] = useState(1)
  const [designation_bottom, setdesignation_bottom] = useState(103)

  const [toOrg, settoOrg] = useState(false)

  const user_detail = useSelector((state) => state.authentication.userdetails);
  const username = useSelector(
    (state) => state.authentication.userdetails.username
  );
  const [search_item, setsearch_item] = useState("");

  const [circle_btn, setcircle_btn] = useState(true);
  const [circle_btn2, setcircle_btn2] = useState(true);
  const [confirm_password, setconfirm_password] = useState("");
  const [password_err_1, setpassword_err_1] = useState(false);
  const [password_err_2, setpassword_err_2] = useState(false);
  const [password_err_3, setpassword_err_3] = useState(false);
  const [user_type_err, setuser_type_err] = useState(false);
  const [channel_access_err, setchannel_access_err] = useState(false);

  const [designation_err, setdesignation_err] = useState(false);
  const [home_branch_id, sethome_branch_id] = useState(user_detail.home_branch);
  const [home_branch_list, sethome_branch_list] = useState([]);
  const [home_branch, sethome_branch] = useState(toTitleCase(user_detail?.branch_nm));
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
  const [ass_branch_bottom, setass_branch_bottom] = useState(56)
  // Ass Branch
  const [ass_department_list, setass_department_list] = useState([]);
  const [ass_department_list2, setass_department_list2] = useState([]);
  const [ass_department_page, setass_department_page] = useState(1);
  const [search_ass_department, setsearch_ass_department] = useState("");

  //Organization
  const [org_list_s, setorg_list_s] = useState([])
  const [org, setorg] = useState(toTitleCase(user_detail.organization_name))
  const [org_id, setorg_id] = useState(user_detail.organization)
  const [org_page, setorg_page] = useState(1)
  const [org_error, setorg_error] = useState(false)
  const [org_search_item, setorg_search_item] = useState("")
  const [org_loaded, setorg_loaded] = useState(false)
  const [org_count, setorg_count] = useState(1)
  const [org_bottom, setorg_bottom] = useState(103)


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
  const [uploaded_img, setuploaded_img] = useState("");
  const [result_img, setresult_img] = useState("");
  const [document, setdocument] = useState("");

  const getBranches = () => {
    let temp3 = [];

    axios
      .get(
        ServerAddress +
        `master/get_org_branch/?org_id=${org_id ? org_id : ""}&search=${search_branch}&p=${page}&records=${10}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        settoOrg(true);
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
          setbranch_count(branch_count + 2)
          sethome_branch_list(temp3);
        }
        else {
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
          setdesignation_count(designation_count + 2)
          setdesignation_list(temp3);
        }
        else {
          setdesignation_list([]);
        }

      })
      .catch((err) => {
        alert(`Error Occur in Get`, err);
      });
  };

  const getAssBranches = (val, branch) => {
    let temp_2 = [];
    let temp = [...ass_branch_list];
    axios
      .get(
        ServerAddress +
        `master/all_user_ass_branches/?search=${""}&p=${ass_branch_page}&records=${10}&branch_search=${search_ass_branch}&data=${val}&org_id=${org_id ? org_id : ""}&branch=${branch}`,
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
        else {
          setass_branch_list([])
        }
        try {
          // get_assupbranch(up_params.user.id, temp_2);
        }
        catch (error) { }
      })
      .catch((err) => {
        alert(`Error Occur in Get`, err);
      });
  };

  // const getAssBranches = (val) => {
  //   let temp_2 = [];
  //   let temp = [...ass_branch_list];
  //   axios
  //     .get(
  //       ServerAddress +
  //       `master/all-branches/?search=${""}&p=${ass_branch_page}&records=${10}&branch_name=${[
  //         "",
  //       ]}&branch_city=${[""]}&vendor=${[
  //         "",
  //       ]}&branch_search=${search_ass_branch}&data=${val}`,
  //       {
  //         headers: { Authorization: `Bearer ${accessToken}` },
  //       }
  //     )
  //     .then((response) => {
  //       temp = response.data.results;
  //       console.log("data---------", temp)
  //       if (temp.length > 0) {
  //         if (response.data.next === null) {
  //           setass_branch_list_loaded(false);
  //         } else {
  //           setass_branch_list_loaded(true);
  //         }
  //         if (ass_branch_page === 1) {
  //           temp_2 = response.data.results.map((v) => [
  //             v.id,
  //             toTitleCase(v.name),
  //           ]);
  //         } else {
  //           temp_2 = [
  //             ...ass_branch_list,
  //             ...response.data.results.map((v) => [
  //               v.id,
  //               toTitleCase(v.name),
  //             ]),
  //           ];
  //         }

  //         setass_branch_list_count(ass_branch_list_count + 2);
  //         setass_branch_list(temp_2);
  //       }
  //       else{
  //         setass_branch_list([])
  //       }
  //       try {
  //         // get_assupbranch(up_params.user.id, temp_2);
  //       } 
  //       catch (error) { }
  //     })
  //     .catch((err) => {
  //       alert(`Error Occur in Get`, err);
  //     });
  // };

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
          setdepartment_count(department_count + 2)
          setuser_department_list(temp3);
        }
        else {
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
  // const [old_branch_ids, setold_branch_ids] = useState([])

  const [new_datas, setnew_datas] = useState([])
  const get_assupbranch = (user_id) => {
    let temp = [];
    let temp2 = [];
    let temp3 = [];
    let data = [];
    axios
      .get(ServerAddress + "ems/get_associatedbranch/?user_id=" + user_id, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        data = response.data.associated_branch
        if (data.length > 0) {
          temp2 = data.map((v) => [v.branch, toTitleCase(v.branch__name)]);
          temp = data.map((v) => v.branch);
          temp3 = data.map((v) => [v.id, toTitleCase(v.branch__name)]);
          setass_branch_list2(temp2)
          setass_branch_ids(temp);
          setnew_datas(temp3)
        }
      })
      .catch((err) => {
        alert(`Error Occur in Get , ${err}`);
      });
  };

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

  const add_user = (values) => {
    let branch_id = ass_branch_list2.map((v) => v[0]);

    let branch_id_list = [...new Set(branch_id.map((v) => `${v}`))].map((v) =>
      parseInt(v.split(","))
    );
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
          user_department: is_superuser ? "" : user_department_id,
          associated_branch: branch_id_list,
          // associated_department: ass_department_list2,
          is_docket_entry: is_docket,
          starting_docket_no: docket_no === "" ? null : docket_no,
          organization: org_id,
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
    const newarrdata = permission_title_list.filter((e) => e[1] !== "All Section")
    axios
      .post(
        ServerAddress + "ems/update_user_permissions/",
        {
          user: user.id,
          permissions_list: newarrdata,
          modified_by: user_detail.id,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (resp) {
        if (resp.data.status === "success") {
          if(validation.values.username===username){
            getUserPermissions(validation.values.username)
          }
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
          id: user.id,
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
          user_department: is_superuser ? "" : user_department_id,
          // associated_branch: ass_branch_list2,
          new_branch_ids: new_branch_ids,
          deleted_branchid: deleted_branchid,
          // associated_department: ass_department_list2,
          is_docket_entry: is_docket,
          starting_docket_no: docket_no,
          organization: org_id,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (resp) {
        if (is_update && resp.status === 202 && validation.values.username===username) {
          getUserDetails(validation.values.username)
          // getUserPermissions(validation.values.username)
        }
    
        if (resp.status === 202 && is_superuser === false && permission_title_list[1][6] !== "") {
          // setlodated(true)
          update_user_permission();
          if (document) {
            send_user_pic(up_params.user.id);
          }

          // navigate("/ems/users");
        }
        else if (resp.status === 202 && is_superuser === false && permission_title_list[1][6] === "") {
          add_user_permission(up_params.user.id);
        }
        else if (resp.status === 202 && user.is_superuser === true) {
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
    const newarrdata = permission_title_list.filter((e) => e[1] !== "All Section")
    axios
      .post(
        ServerAddress + "ems/add_user_permissions/",
        {
          user: user_id,
          permissions_list: newarrdata,
          created_by: user_detail.id,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (resp) {
        if (resp.data.status === "success" && is_superuser === false && permission_title_list[1][6] === "") {
          dispatch(setDataExist(`Permission Updated Sucessfully`));
          dispatch(setAlertType("info"));
          dispatch(setShowAlert(true));
          navigate("/ems/users");
        }
        // navigate("/ems/users");
        // dispatch(setShowAlert(true));
        // dispatch(setDataExist(`${usernm} Permission Added sucessfully`));
        // dispatch(setAlertType("success"));
      })
      .catch((err) => {
        alert(`error occur while adding permission by ${username}, ${err}`);
      });
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

  // Permission
  const [permissions_list, setpermissions_list] = useState([]);
  const [refresh, setrefresh] = useState(false);

  const [permis, setpermis] = useState(false);
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

  const [updated_permission, setupdated_permission] = useState([]);
  const [permission_title_list, setpermission_title_list] = useState([
    ["Ems App", "All Section", false, false, false, false, ""],
    ["Ems", "Login Details", false, false, false, false, ""],
    ["Ems", "Users", false, false, false, false, ""],
    ["Booking App", "All Section", false, false, false, false, ""],
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
    ["Master App", "All Section", false, false, false, false, ""],
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
    ["Billing App", "All Section", false, false, false, false, ""],
    ["Billing", "Bill Closed", false, false, false, false, ""],
    ["Billing", "Warai Charges", false, false, false, false, ""],

    ["Billing", "Invoices", false, false, false, false, ""],
    ["Manifest App", "All Section", false, false, false, false, ""],
    ["Manifest", "Panding For Dispatch", false, false, false, false, ""],
    ["Manifest", "Raugh Manifest", false, false, false, false, ""],
    ["Manifest", "Panding To Depart", false, false, false, false, ""],
    ["Manifest", "Incoming Manifest", false, false, false, false, ""],
    ["Manifest", "All Manifest", false, false, false, false, ""],
    ["Runsheet App", "All Section", false, false, false, false, ""],
    ["Runsheet", "Pending Delivery", false, false, false, false, ""],
    ["Runsheet", "All Runsheet", false, false, false, false, ""],
  ]);

  const [user_type_list, setuser_type_list] = useState([
    ["EMPLOYEE", "Employee"],
    ["BILL TO", "Bill To"],
    ["COLOADER", "Coloader"],
    ["QU", "QIL User"],
    ["COM", "Company User"],
    ["CU", "Client User"],
    ["DRIVER", "Driver"],
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


  const send_user_pic = (u_id) => {
    const docket_imageform = new FormData();
    docket_imageform.append(`user_image`, document, document?.name)
    docket_imageform.append(`user_id`, u_id)

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
      setorg_id(user_u.organization)
      setorg(toTitleCase(user_u.organization_name))
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
    if (org_id !== 0) {
      setpage(1);
      setbranch_count(1);
      setbranch_bottom(103)
      setbranch_loaded(true);
    }
  }, [org_id])


  useLayoutEffect(() => {
    if (org_id !== 0) {
      setass_branch_page(1);
      setass_branch_list_count(1);
      setass_branch_list_loaded(true);
    }
  }, [org_id])

  useEffect(() => {
    let timeoutId;
    if (org_id !== "" && org_id) {
      timeoutId = setTimeout(() => {
        getBranches()
      }, 1);
    }
    else {
      getBranches()
    }
    return () => clearTimeout(timeoutId);
  }, [page, search_branch, org_id]);

  useEffect(() => {
    getDesignations()
  }, [designation_page, designation_search])

  useEffect(() => {
    getOrganization()
  }, [org_page, org_search_item])

  useLayoutEffect(() => {
    let timeoutId;
    if (locations.state === null && org_id !== "" && org_id && home_branch_id) {
      timeoutId = setTimeout(() => {
        getAssBranches("all",home_branch_id);
      }, 1);
    }
    else if (locations.state === null && home_branch_id) {
      getAssBranches("all",home_branch_id);
    }
    else if (locations.state !== null && org_id !== "" && org_id && home_branch_id) {
      getAssBranches(parseInt(up_params.user.id),home_branch_id);
    }
    else if (locations.state !== null && home_branch_id) {
      timeoutId = setTimeout(() => {
        getAssBranches(parseInt(up_params.user.id),home_branch_id);
      }, 1);
    }
    return () => clearTimeout(timeoutId);
  }, [ass_branch_page, search_ass_branch, org_id, home_branch_id]);

  useLayoutEffect(() => {
    getDepartments();
  }, [user_department_page, search_user_department]);

  useLayoutEffect(() => {
    getAssDepartments();
  }, [ass_department_page, search_ass_department]);

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

  const [sortedArray, setSortedArray] = useState([]);
  const [shouldSort, setShouldSort] = useState(true);
  const [data, setdata] = useState([])
  useEffect(() => {
    if (is_update) {
      let temp_p = [];
      for (let index = 0; index < updated_permission.length; index++) {
        const element = updated_permission[index];
        temp_p.push(Object.values(element));
      }
      setdata(temp_p);
    }
  }, [updated_permission, is_update]);

  useEffect(() => {
    const order = ['Ems', 'Booking', 'Master', 'Billing', 'Manifest', 'Runsheet'];

    const sorted = [...data].sort((item1, item2) => {
      const index1 = order.indexOf(item1[0]);
      const index2 = order.indexOf(item2[0]);

      if (index1 !== index2) {
        return index1 - index2;
      }

      const compareSecond = item1[1].localeCompare(item2[1]);
      if (compareSecond !== 0) {
        return compareSecond;
      }

      if (item1[6] === '') {
        return 1;
      } else if (item2[6] === '') {
        return -1;
      } else if (item1[6] < item2[6]) {
        return -1;
      } else if (item1[6] > item2[6]) {
        return 1;
      }

      return 0;
    });

    setSortedArray(sorted);
    setShouldSort(false); // Disable sorting until permission_title_list changes
  }, [data]);

  useEffect(() => {
    if (!shouldSort && is_superuser === false && locations.state !== null) {
      const updatedArray = [...sortedArray];
      updatedArray.splice(0, 0, ["Ems App", "All Section", false, false, false, false, ""])
      updatedArray.splice(3, 0, ["Booking App", "All Section", false, false, false, false, ""])
      updatedArray.splice(14, 0, ["Master App", "All Section", false, false, false, false, ""])
      updatedArray.splice(28, 0, ["Billing App", "All Section", false, false, false, false, ""])
      updatedArray.splice(32, 0, ["Manifest App", "All Section", false, false, false, false, ""])
      updatedArray.splice(38, 0, ["Runsheet App", "All Section", false, false, false, false, ""])
      setpermission_title_list(updatedArray);
    }
  }, [sortedArray, shouldSort]);

  useEffect(() => {
    if (locations.state !== null && user.length !== 0) {
      get_assupbranch(user.id);
    }
  }, [user])


  useEffect(() => {
    if (is_update === true && user.is_superuser === false) {
      getUserPermission();
    }
  }, [is_update]);


  const TilteColor = (idx) => {
    if (idx === 0) {
      return "red"
    } else if (idx === 3) {
      return "red"
    } else if (idx === 14) {
      return "red"
    } else if (idx === 28) {
      return "red"
    } else if (idx === 32) {
      return "red"
    } else if (idx === 38) {
      return "red"
    } else {
      return "#000"
    }
  }

  const RotateDrop = (idx) => {
    if (idx === 0 && showRow.includes(1)) {
      return true
    } else if (idx === 3 && showRow.includes(4)) {
      return true
    } else if (idx === 14 && showRow.includes(15)) {
      return true
    } else if (idx === 28 && showRow.includes(29)) {
      return true
    } else if (idx === 32 && showRow.includes(33)) {
      return true
    } else if (idx === 38 && showRow.includes(39)) {
      return true
    } else {
      return false
    }
  }

  const showData = (i) => {
    if (i === 0) {
      if (showRow.includes(1)) {
        let ind = showRow.indexOf(1)
        let newData = [...showRow]
        newData.splice(ind, 2);
        setshowRow(newData)
      } else {
        setshowRow([...showRow, 1, 2])
      }
    } else if (i === 3) {
      if (showRow.includes(4)) {
        let ind = showRow.indexOf(4)
        let newData = [...showRow]
        newData.splice(ind, 10);
        setshowRow(newData)
      } else {
        setshowRow([...showRow, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13])
      }
    } else if (i === 14) {
      if (showRow.includes(15)) {
        let ind = showRow.indexOf(15)
        let newData = [...showRow]
        newData.splice(ind, 13);
        setshowRow(newData)
      } else {
        setshowRow([...showRow, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27])
      }
    } else if (i === 28) {
      if (showRow.includes(29)) {
        let ind = showRow.indexOf(29)
        let newData = [...showRow]
        newData.splice(ind, 3);
        setshowRow(newData)
      } else {
        setshowRow([...showRow, 29, 30, 31])
      }
    } else if (i === 32) {
      if (showRow.includes(33)) {
        let ind = showRow.indexOf(33)
        let newData = [...showRow]
        newData.splice(ind, 5);
        setshowRow(newData)
      } else {
        setshowRow([...showRow, 33, 34, 35, 36, 37])
      }
    } else if (i === 38) {
      if (showRow.includes(39)) {
        let ind = showRow.indexOf(39)
        let newData = [...showRow]
        newData.splice(ind, 2);
        setshowRow(newData)
      } else {
        setshowRow([...showRow, 39, 40])
      }
    }
  }

  const allperm2 = (idx) => {
    let ttt = permission_title_list[idx][2]
    if (idx === 0) {
      permission_title_list.map((e, i) => {
        if (i < 3) {
          e[2] = !ttt
        }
      })
    } else if (idx === 3) {
      permission_title_list.map((e, i) => {
        if (i > 2 && i < 14) {
          e[2] = !ttt
        }
      })
    } else if (idx === 14) {
      permission_title_list.map((e, i) => {
        if (i > 13 && i < 28) {
          e[2] = !ttt
        }
      })
    } else if (idx === 28) {
      permission_title_list.map((e, i) => {
        if (i > 27 && i < 32) {
          e[2] = !ttt
        }
      })
    } else if (idx === 32) {
      permission_title_list.map((e, i) => {
        if (i > 31 && i < 38) {
          e[2] = !ttt
        }
      })
    } else if (idx === 38) {
      permission_title_list.map((e, i) => {
        if (i > 37 && i < 41) {
          e[2] = !ttt
        }
      })
    }
    setpermis(true);
    setrefresh(!refresh);
  }
  const allperm3 = (idx) => {
    let ttt = permission_title_list[idx][3]
    if (idx === 0) {
      permission_title_list.map((e, i) => {
        if (i < 3) {
          e[3] = !ttt
        }
      })
    } else if (idx === 3) {
      permission_title_list.map((e, i) => {
        if (i > 2 && i < 14) {
          e[3] = !ttt
        }
      })
    } else if (idx === 14) {
      permission_title_list.map((e, i) => {
        if (i > 13 && i < 28) {
          e[3] = !ttt
        }
      })
    } else if (idx === 28) {
      permission_title_list.map((e, i) => {
        if (i > 27 && i < 32) {
          e[3] = !ttt
        }
      })
    } else if (idx === 32) {
      permission_title_list.map((e, i) => {
        if (i > 31 && i < 38) {
          e[3] = !ttt
        }
      })
    } else if (idx === 38) {
      permission_title_list.map((e, i) => {
        if (i > 37 && i < 41) {
          e[3] = !ttt
        }
      })
    }
    setpermis(true);
    setrefresh(!refresh);
  }
  const allperm4 = (idx) => {
    let ttt = permission_title_list[idx][4]
    if (idx === 0) {
      permission_title_list.map((e, i) => {
        if (i < 3) {
          e[4] = !ttt
        }
      })
    } else if (idx === 3) {
      permission_title_list.map((e, i) => {
        if (i > 2 && i < 14) {
          e[4] = !ttt
        }
      })
    } else if (idx === 14) {
      permission_title_list.map((e, i) => {
        if (i > 13 && i < 28) {
          e[4] = !ttt
        }
      })
    } else if (idx === 28) {
      permission_title_list.map((e, i) => {
        if (i > 27 && i < 32) {
          e[4] = !ttt
        }
      })
    } else if (idx === 32) {
      permission_title_list.map((e, i) => {
        if (i > 31 && i < 38) {
          e[4] = !ttt
        }
      })
    } else if (idx === 38) {
      permission_title_list.map((e, i) => {
        if (i > 37 && i < 41) {
          e[4] = !ttt
        }
      })
    }
    setpermis(true);
    setrefresh(!refresh);
  }
  const allperm5 = (idx) => {
    let ttt = permission_title_list[idx][5]
    if (idx === 0) {
      permission_title_list.map((e, i) => {
        if (i < 3) {
          e[5] = !ttt
        }
      })
    } else if (idx === 3) {
      permission_title_list.map((e, i) => {
        if (i > 2 && i < 14) {
          e[5] = !ttt
        }
      })
    } else if (idx === 14) {
      permission_title_list.map((e, i) => {
        if (i > 13 && i < 28) {
          e[5] = !ttt
        }
      })
    } else if (idx === 28) {
      permission_title_list.map((e, i) => {
        if (i > 27 && i < 32) {
          e[5] = !ttt
        }
      })
    } else if (idx === 32) {
      permission_title_list.map((e, i) => {
        if (i > 31 && i < 38) {
          e[5] = !ttt
        }
      })
    } else if (idx === 38) {
      permission_title_list.map((e, i) => {
        if (i > 37 && i < 41) {
          e[5] = !ttt
        }
      })
    }
    setpermis(true);
    setrefresh(!refresh);
  }

  // useEffect(() => {
  //   if (user.is_superuser === false && is_update === true) {
  //     alert("1111111")
  //     let temp_p = [];
  //     for (let index = 0; index < updated_permission.length; index++) {
  //       const element = updated_permission[index];
  //       temp_p.push(Object.values(element));
  //     }
  //     alert("0000000")
  //     setpermission_title_list(temp_p);
  //   }
  // }, [updated_permission, user]);
  const [data2, setdata2] = useState([])
  const [sortedArray2, setSortedArray2] = useState([]);
  const [shouldSort2, setShouldSort2] = useState(true);

  useEffect(() => {
    if (is_update === false && user_department_id !== null) {
      let temp_p = [];
      for (let index = 0; index < updated_permission.length; index++) {
        const element = updated_permission[index];
        temp_p.push(Object.values(element));
      }
      setdata2(temp_p)
    }
  }, [updated_permission, user_department_id]);

  useEffect(() => {
    const order = ['Ems', 'Booking', 'Master', 'Billing', 'Manifest', 'Runsheet'];

    const sorted = [...data2].sort((item1, item2) => {
      const index1 = order.indexOf(item1[0]);
      const index2 = order.indexOf(item2[0]);

      if (index1 !== index2) {
        return index1 - index2;
      }

      const compareSecond = item1[1].localeCompare(item2[1]);
      if (compareSecond !== 0) {
        return compareSecond;
      }

      if (item1[6] === '') {
        return 1;
      } else if (item2[6] === '') {
        return -1;
      } else if (item1[6] < item2[6]) {
        return -1;
      } else if (item1[6] > item2[6]) {
        return 1;
      }

      return 0;
    });

    setSortedArray2(sorted);
    setShouldSort2(false); // Disable sorting until permission_title_list changes
  }, [data2]);

  useEffect(() => {
    if (!shouldSort2 && is_update === false && user_department_id !== null && is_superuser === false) {
      const updatedArray = [...sortedArray2];
      updatedArray.splice(0, 0, ["Ems App", "All Section", false, false, false, false, ""])
      updatedArray.splice(3, 0, ["Booking App", "All Section", false, false, false, false, ""])
      updatedArray.splice(14, 0, ["Master App", "All Section", false, false, false, false, ""])
      updatedArray.splice(28, 0, ["Billing App", "All Section", false, false, false, false, ""])
      updatedArray.splice(32, 0, ["Manifest App", "All Section", false, false, false, false, ""])
      updatedArray.splice(38, 0, ["Runsheet App", "All Section", false, false, false, false, ""])
      setpermission_title_list(updatedArray);
    }
  }, [sortedArray2, shouldSort2, user_department_id]);

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

    //For New
    let new_ids = item.filter((p) => !ass_branch_ids.includes(p))
    new_ids = [...new Set(new_ids)];
    // console.log("new_ids-----", new_ids)
    setnew_branch_ids(new_ids)

    //For Deleted
    let prev = ass_branch_list2.map((p) => p[1])
    let next = new_datas.map((p) => p[1])

    let deleted_id = next.filter((p) => prev.indexOf(p) === -1);

    let deleted_ids = new_datas
      .filter(item => deleted_id.includes(item[1]))
      .map(item => item[0]);

    deleted_ids = [...new Set(deleted_ids)];

    // let deleted_ids = ass_branch_ids.filter((p) => item.indexOf(p) == -1);
    // console.log("deleted_ids----", deleted_ids)
    setdeleted_branchid(deleted_ids)

    //For Old
    // let old_data = ass_branch_ids.filter(v => !deleted_ids.includes(v))
    // old_data = [...new Set(old_data)];
    // console.log("old_data----", old_data)
    // setold_branch_ids(old_data)

  }, [ass_branch_ids, ass_branch_list2, ass_branch_list])

  // const getBranches = async (org_id) => {
  //   try {
  //     const resp = await axios.get(
  //       ServerAddress +
  //       `master/get_org_branch/?org_id=${org_id}&search=${search_branch}&p=${page}&records=${10}`,
  //       {
  //         headers: { Authorization: `Bearer ${accessToken}` },
  //       }
  //     );
  //     console.log("Org-----resp", resp)
  //     if (resp.data?.branch_org?.length > 0) {
  //     // setorg(toTitleCase(resp.data?.branch_org[0].organizaton__name));
  //     // setorg_id(resp.data?.branch_org[0].organizaton);
  //     }

  //   } catch (err) {
  //     console.warn(`Error Occur in Get States, ${err}`);
  //   }
  // };

  // useEffect(() => {
  //   if(home_branch_id && home_branch_id !== "" && !user_detail.organization_name && (!user.is_superuser || user.organization_name)){
  //   // if(home_branch_id && home_branch_id !== "" && !user_detail.organization_name && user.organization_name){
  //     getBranchOrganization(home_branch_id)
  //   }    
  // }, [home_branch_id])
  useEffect(() => {
    if (org !== "" && toOrg) {
      sethome_branch("");
      sethome_branch_list([]);
    }
  }, [org, toOrg]);

  useEffect(() => {
    if (is_update) {
      settoOrg(false);
    }
  }, [is_update]);

  const getUserDetails = (usern) => {
    axios
      .get(ServerAddress + "ems/get_user_details/?username=" + usern, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((resp) => {
        dispatch(setUserDetails(resp.data));
      })
      .catch((err) => {
        alert(`Error Occur While Getting User Details, ${err}`);
      });
  };

  const getUserPermissions = (usern) => {
    axios
      .get(ServerAddress + "ems/get_userpermission/?username=" + usern, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((resp) => {
        dispatch(setUserPermission(resp.data.permission));
      })
      .catch((err) => {
        alert(`Error Occur While Getting User Details, ${err}`);
      });
  };

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
          }
          else if (!is_update && password.length < 8) {
            setpassword_err_2(true);
          }
          else if (!is_update && password !== confirm_password) {
            setpassword_err_3(true);
          }
          else {
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
                        // disabled={is_update}
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
                          disable_me={!user_detail.is_superuser}
                        />
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
                          disable_me={!user_detail.is_superuser && is_update}
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
                    {!is_superuser && (
                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-2">
                          <Label className="header-child">Department * :</Label>
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
                      </Col>
                    )}

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
                    
                    {/* <Col lg={2} md={3} sm={3}>
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
                    </Col> */}

                  {/* Need To Add */}
                    {/* <Col lg={is_docket ? 2 : 4} md={3} sm={3}>
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
                    } */}
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
                    {/* {modal ? <Main_c modal={modal}
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
                            height: "35px",
                            border: "1px solid #dad7d7",
                            alignItems: "center"
                          }}
                        >
                          <div style={{ marginLeft: "3px" }} >Choose File:</div>
                          <div style={{ fontSize: "25px", color: "#dad7d7", marginLeft: "5px" }}>|</div>
                          {document ? (
                            <div style={{ fontWeight: "bold", color: "blue" }}>Image Uploaded</div>
                          ) : (
                            <div> No File Chosen</div>
                          )
                          }
                        </div>
                      </div>
                    </Col> */}
                    <Col lg={4} md={6} sm={6}>
                        <div className="mb-2" style={{ position: "relative" }}>
                          <Label>Profile Pic</Label>
                          <Input
                          style={{background:"white"}}
                            className="form-control-md"
                            name="logo"
                            type=""
                            id="input"
                            disabled
                            value={result_img}
                            onChange={(val) => {
                              setresult_img(val.target.value)
                            }}
                            accept="image/png,image/jpeg, image/jpg"
                          />
                          <button
                            style={{
                              border:"none",
                              position: "absolute",
                              borderRadius:"2px",
                              height: "29px",
                              top: "28.5px",
                              padding: "0.375rem 0.75rem",
                              marginLeft: "1px",
                              background:"#e9ecef",
                            }}
                            className="form-control-md"
                            id="input"
                            type="button"
                            onClick={() => setmodal(true)}
                          >
                            Choose Image 
                          </button>
                          <ImgModal
                            modal={modal}
                            modal_set={() => {
                              setmodal(false);
                            }}
                            upload_image={(val) => {
                              setuploaded_img(val);
                            }}
                            result_image={(val) => {
                              setresult_img(val);
                            }}
                          />
                          <FormFeedback type="invalid">
                           Profile Pic is required
                          </FormFeedback>
                        </div>
                      </Col>
                      {result_img !== "" && (
                        <Col lg={1} md={4} sm={6}>
                          <div className="mb-3 parent_div">
                            <img
                              onClick={() => setmodal(true)}
                              src={result_img}
                              alt="result_img"
                              style={{
                                width: "70px",
                                height: "70px",
                                borderRadius: "8px",
                                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                              }}
                            />
                          </div>
                        </Col>
                      )}
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
                          bottom={ass_branch_bottom}
                          setbottom={setass_branch_bottom}
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
                              <>
                                {!showRow.includes(idx) ? <tr
                                  key={idx}
                                  style={{
                                    borderWidth: 1,
                                    color: TilteColor(idx),
                                    // fontWeight:"800"
                                  }}
                                >
                                  <td style={{ alignItems: "center" }}>
                                    {TilteColor(idx) === "red" ?
                                      <RiArrowDropDownLine color="#000" size={30}
                                        onClick={() => {
                                          showData(idx)
                                        }}
                                        style={{ transform: RotateDrop(idx) ? 'rotate(180deg)' : '' }}
                                      />
                                      : null}
                                    {item[0]}
                                    {TilteColor(idx) === "red" ? <Input
                                      className="form-check-input-sm"
                                      type="checkbox"
                                      style={{ margin: 10, borderColor: "red" }}
                                      onClick={() => {
                                        if (idx === 0 || idx === 3 || idx === 14 || idx === 28 || idx === 32 || idx === 38) {
                                          // alert(idx)
                                          allperm2(idx)
                                          allperm3(idx)
                                          allperm4(idx)
                                          allperm5(idx)
                                        }
                                        permission_title_list[idx][2] = item[2]
                                        permission_title_list[idx][3] = item[2]
                                        permission_title_list[idx][4] = item[2]
                                        permission_title_list[idx][5] = item[2]
                                        if (idx === 0) {
                                          permission_title_list[1][2] = item[2]
                                          permission_title_list[1][3] = item[2]
                                          permission_title_list[1][4] = item[2]
                                          permission_title_list[1][5] = item[2]

                                          permission_title_list[2][2] = item[2]
                                          permission_title_list[2][3] = item[2]
                                          permission_title_list[2][4] = item[2]
                                          permission_title_list[2][5] = item[2]
                                        }
                                        else if (idx === 3) {
                                          permission_title_list[4][2] = item[2]
                                          permission_title_list[4][3] = item[2]
                                          permission_title_list[4][4] = item[2]
                                          permission_title_list[4][5] = item[2]

                                          permission_title_list[5][2] = item[2]
                                          permission_title_list[5][3] = item[2]
                                          permission_title_list[5][4] = item[2]
                                          permission_title_list[5][5] = item[2]

                                          permission_title_list[6][2] = item[2]
                                          permission_title_list[6][3] = item[2]
                                          permission_title_list[6][4] = item[2]
                                          permission_title_list[6][5] = item[2]

                                          permission_title_list[7][2] = item[2]
                                          permission_title_list[7][3] = item[2]
                                          permission_title_list[7][4] = item[2]
                                          permission_title_list[7][5] = item[2]

                                          permission_title_list[8][2] = item[2]
                                          permission_title_list[8][3] = item[2]
                                          permission_title_list[8][4] = item[2]
                                          permission_title_list[8][5] = item[2]

                                          permission_title_list[9][2] = item[2]
                                          permission_title_list[9][3] = item[2]
                                          permission_title_list[9][4] = item[2]
                                          permission_title_list[9][5] = item[2]

                                          permission_title_list[10][2] = item[2]
                                          permission_title_list[10][3] = item[2]
                                          permission_title_list[10][4] = item[2]
                                          permission_title_list[10][5] = item[2]

                                          permission_title_list[11][2] = item[2]
                                          permission_title_list[11][3] = item[2]
                                          permission_title_list[11][4] = item[2]
                                          permission_title_list[11][5] = item[2]

                                          permission_title_list[12][2] = item[2]
                                          permission_title_list[12][3] = item[2]
                                          permission_title_list[12][4] = item[2]
                                          permission_title_list[12][5] = item[2]

                                          permission_title_list[13][2] = item[2]
                                          permission_title_list[13][3] = item[2]
                                          permission_title_list[13][4] = item[2]
                                          permission_title_list[13][5] = item[2]
                                        }
                                        else if (idx === 14) {
                                          permission_title_list[15][2] = item[2]
                                          permission_title_list[15][3] = item[2]
                                          permission_title_list[15][4] = item[2]
                                          permission_title_list[15][5] = item[2]

                                          permission_title_list[16][2] = item[2]
                                          permission_title_list[16][3] = item[2]
                                          permission_title_list[16][4] = item[2]
                                          permission_title_list[16][5] = item[2]

                                          permission_title_list[17][2] = item[2]
                                          permission_title_list[17][3] = item[2]
                                          permission_title_list[17][4] = item[2]
                                          permission_title_list[17][5] = item[2]

                                          permission_title_list[18][2] = item[2]
                                          permission_title_list[18][3] = item[2]
                                          permission_title_list[18][4] = item[2]
                                          permission_title_list[18][5] = item[2]

                                          permission_title_list[19][2] = item[2]
                                          permission_title_list[19][3] = item[2]
                                          permission_title_list[19][4] = item[2]
                                          permission_title_list[19][5] = item[2]

                                          permission_title_list[20][2] = item[2]
                                          permission_title_list[20][3] = item[2]
                                          permission_title_list[20][4] = item[2]
                                          permission_title_list[20][5] = item[2]

                                          permission_title_list[21][2] = item[2]
                                          permission_title_list[21][3] = item[2]
                                          permission_title_list[21][4] = item[2]
                                          permission_title_list[21][5] = item[2]

                                          permission_title_list[22][2] = item[2]
                                          permission_title_list[22][3] = item[2]
                                          permission_title_list[22][4] = item[2]
                                          permission_title_list[22][5] = item[2]

                                          permission_title_list[23][2] = item[2]
                                          permission_title_list[23][3] = item[2]
                                          permission_title_list[23][4] = item[2]
                                          permission_title_list[23][5] = item[2]

                                          permission_title_list[24][2] = item[2]
                                          permission_title_list[24][3] = item[2]
                                          permission_title_list[24][4] = item[2]
                                          permission_title_list[24][5] = item[2]

                                          permission_title_list[25][2] = item[2]
                                          permission_title_list[25][3] = item[2]
                                          permission_title_list[25][4] = item[2]
                                          permission_title_list[25][5] = item[2]

                                          permission_title_list[26][2] = item[2]
                                          permission_title_list[26][3] = item[2]
                                          permission_title_list[26][4] = item[2]
                                          permission_title_list[26][5] = item[2]

                                          permission_title_list[27][2] = item[2]
                                          permission_title_list[27][3] = item[2]
                                          permission_title_list[27][4] = item[2]
                                          permission_title_list[27][5] = item[2]
                                        }
                                        else if (idx === 28) {
                                          permission_title_list[29][2] = item[2]
                                          permission_title_list[29][3] = item[2]
                                          permission_title_list[29][4] = item[2]
                                          permission_title_list[29][5] = item[2]

                                          permission_title_list[30][2] = item[2]
                                          permission_title_list[30][3] = item[2]
                                          permission_title_list[30][4] = item[2]
                                          permission_title_list[30][5] = item[2]

                                          permission_title_list[31][2] = item[2]
                                          permission_title_list[31][3] = item[2]
                                          permission_title_list[31][4] = item[2]
                                          permission_title_list[31][5] = item[2]

                                        }
                                        else if (idx === 32) {
                                          permission_title_list[33][2] = item[2]
                                          permission_title_list[33][3] = item[2]
                                          permission_title_list[33][4] = item[2]
                                          permission_title_list[33][5] = item[2]

                                          permission_title_list[34][2] = item[2]
                                          permission_title_list[34][3] = item[2]
                                          permission_title_list[34][4] = item[2]
                                          permission_title_list[34][5] = item[2]

                                          permission_title_list[35][2] = item[2]
                                          permission_title_list[35][3] = item[2]
                                          permission_title_list[35][4] = item[2]
                                          permission_title_list[35][5] = item[2]

                                          permission_title_list[36][2] = item[2]
                                          permission_title_list[36][3] = item[2]
                                          permission_title_list[36][4] = item[2]
                                          permission_title_list[36][5] = item[2]

                                          permission_title_list[37][2] = item[2]
                                          permission_title_list[37][3] = item[2]
                                          permission_title_list[37][4] = item[2]
                                          permission_title_list[37][5] = item[2]
                                        }
                                        else if (idx === 38) {
                                          permission_title_list[39][2] = item[2]
                                          permission_title_list[39][3] = item[2]
                                          permission_title_list[39][4] = item[2]
                                          permission_title_list[39][5] = item[2]

                                          permission_title_list[40][2] = item[2]
                                          permission_title_list[40][3] = item[2]
                                          permission_title_list[40][4] = item[2]
                                          permission_title_list[40][5] = item[2]
                                        }
                                      }}
                                      checked={item[2]}
                                      readOnly
                                    /> : null}
                                  </td>
                                  <td>{item[1]}</td>
                                  <td>
                                    <Input
                                      className="form-check-input-sm"
                                      type="checkbox"
                                      onClick={() => {
                                        if (idx === 0 || idx === 3 || idx === 14 || idx === 28 || idx === 32 || idx === 38) {
                                          // alert(idx)
                                          allperm2(idx)
                                        } else {
                                          if (!item[2]) {
                                            setPermissions(2, idx);
                                          } else {
                                            removePermissions(2, idx);
                                          }

                                        }
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
                                        if (idx === 0 || idx === 3 || idx === 14 || idx === 28 || idx === 32 || idx === 38) {
                                          allperm3(idx)
                                        } else {
                                          if (!item[3]) {
                                            setPermissions(3, idx);
                                            setPermissions(2, idx);
                                          } else {
                                            removePermissions(3, idx);
                                          }
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
                                        if (idx === 0 || idx === 3 || idx === 14 || idx === 28 || idx === 32 || idx === 38) {
                                          allperm4(idx)
                                        } else {
                                          if (!item[4]) {
                                            setPermissions(4, idx);
                                            setPermissions(3, idx);
                                            setPermissions(2, idx);
                                          } else {
                                            removePermissions(4, idx);
                                          }
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
                                        if (idx === 0 || idx === 3 || idx === 14 || idx === 28 || idx === 32 || idx === 38) {
                                          allperm5(idx)
                                        } else {
                                          if (!item[5]) {
                                            setPermissions(4, idx);
                                            setPermissions(5, idx);
                                            setPermissions(3, idx);
                                            setPermissions(2, idx);
                                          } else {
                                            removePermissions(5, idx);
                                          }
                                        }
                                      }}
                                      checked={is_superuser ? true : item[5]}
                                      disabled={is_superuser}
                                      readOnly
                                    />
                                  </td>
                                </tr> : null}
                              </>
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
