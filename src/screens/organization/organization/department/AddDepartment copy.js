import React, { useState, useEffect, useLayoutEffect } from "react";
import "../../../assets/scss/forms/form.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IconContext } from "react-icons";
import { MdAddCircleOutline, MdRemoveCircleOutline } from "react-icons/md";
import axios from "axios";
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
} from "reactstrap";

import { useDispatch, useSelector } from "react-redux";
import { ServerAddress } from "../../../constants/ServerAddress";
import { setToggle } from "../../../store/pagination/Pagination";
import {
  setAlertType,
  setDataExist,
  setShowAlert,
} from "../../../store/alert/Alert";
import toTitleCase from "../../../lib/titleCase/TitleCase";
import PageTitle from "../../../components/pageTitle/PageTitle";
import Title from "../../../components/title/Title";
import { RiArrowDropDownLine } from "react-icons/ri";
function AddDepartment() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authentication.userdetails);
  const accessToken = useSelector((state) => state.authentication.access_token);
  const [circle_btn, setcircle_btn] = useState(true);
  const [circle_btn2, setcircle_btn2] = useState(true);
  const [is_checker_maker, setis_checker_maker] = useState(false);
  const [departments, setdepartments] = useState("");
  const [isupdating, setisupdating] = useState(false);
  const [showRow, setshowRow] = useState([]);
  
  const toggle_circle = () => {
    setcircle_btn(!circle_btn);
  };
  const toggle_circle2 = () => {
    setcircle_btn2(!circle_btn2);
  };
  const handleAction = () => {
    dispatch(setToggle(true));
    navigate("/Ems/department");
  };
  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      department: toTitleCase(departments.name) || "",
      // priority: toTitleCase(departments.priority) || "",
    },

    validationSchema: Yup.object({
      department: Yup.string().required("Department name is required"),
      // priority: Yup.string().required("Priority is required"),
    }),

    onSubmit: (values) => {
      if (check_validation !== true) {
        alert("Please Select Any Department Permissions");
      } else {
        isupdating
          ? changed_department_role(values)
          : send_department_data(values);
      }
    },
  });

  const send_department_data = (values) => {
    axios
      .post(
        ServerAddress + "ems/add_department/",
        {
          name: String(values.department).toUpperCase(),
          // priority: values.priority,
          // is_checker_maker: is_checker_maker,
          created_by: user.id,
          // role: (department_role).toUpperCase(),
        },

        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (response) {
        if (response.data.status === "success") {
          add_user_permission(response.data.id);
          dispatch(setToggle(true));
          dispatch(setShowAlert(true));
          dispatch(
            setDataExist(
              `"${toTitleCase(values.department)}" Added sucessfully`
            )
          );
          dispatch(setAlertType("success"));
          navigate("/ems/department");
        } else if (response.data == "duplicate") {
          dispatch(setShowAlert(true));
          dispatch(
            setDataExist(
              `Department Name "${toTitleCase(
                values.department
              )}" already exists`
            )
          );
          dispatch(setAlertType("warning"));
        }
      })
      .catch((error) => {
        alert(`Error Happen while Adding Department Data ${error}`);
      });
  };

  const add_user_permission = (dep_id) => {
    const newarrdata = permission_title_list.filter((e)=>e[1]!=="All Section")
    axios
      .post(
        ServerAddress + "ems/add_group_permissions/",
        {
          group: dep_id,
          permissions_list: newarrdata,
          created_by: user.id,
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
        alert(`error occur while adding group permission, ${err}`);
      });
  };

  const changed_department_role = (values) => {
    axios
      .put(
        ServerAddress + "ems/update_department/" + departments.id,
        {
          name: String(values.department).toUpperCase(),
          // priority: values.priority,
          // is_checker_maker: is_checker_maker,
          modified_by: user.id,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (response) {
        if (response.data.status === "success") {
          update_user_permission();
          dispatch(setToggle(true));
          dispatch(setShowAlert(true));
          dispatch(
            setDataExist(
              ` "${toTitleCase(values.department)}" Updated sucessfully`
            )
          );
          dispatch(setAlertType("info"));
          navigate("/ems/department");
        }
      })
      .catch(function (error) {
        alert(`Error Happen while Updating Department Data ${error}`);
      });
  };
  useEffect(() => {
    try {
      setdepartments(location.state.user);
      setisupdating(true);
      setis_checker_maker(location.state.user.is_checker_maker);
    } catch (error) {}
  }, []);

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
    setpermis(false);
    setrefresh(!refresh);
  };
  const removePermissions = (idxx, idx) => {
    // let filterlist = permissions_list.filter(
    //   (val) => val.toString() != permissions.toString()
    // );
    // setpermissions_list(filterlist);
    if (idxx===2) {
      permission_title_list[idx][idxx] = false;
      permission_title_list[idx][3] = false;
      permission_title_list[idx][4] = false;
      permission_title_list[idx][5] = false;
      
    }else {
      permission_title_list[idx][idxx] = false;
    }
    setpermis(true);
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

  const [check_validation, setcheck_validation] = useState("");

  useLayoutEffect(() => {
    // console.log("Lenght", permission_title_list.length);
    let arr = permission_title_list.map((item, idx) => {
      return item.slice(2, -1).some((v) => v == true);
    });

    let res = arr.some((v) => v == true);
    setcheck_validation(res);
    // console.log("////////////", res);
    // console.log("validation999",check_validation)
  }, [permission_title_list, updated_permission, refresh]);

  const update_user_permission = () => {
    const newarrdata = permission_title_list.filter((e)=>e[1]!=="All Section")
    axios
      .post(
        ServerAddress + "ems/update_group_permissions/",
        {
          group: departments.id,
          permissions_list: newarrdata,
          modified_by: user.id,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (resp) {
        if (resp.data.status === "success") {
          // dispatch(setDataExist(`${user.username} Updated sucessfully`));
          // dispatch(setAlertType("info"));
          // dispatch(setShowAlert(true));
          // navigate("/ems/users");
        }
      })
      .catch((err) => {
        alert(`error occur while updating group permission ,${err}`);
      });
  };

  const getUserPermission = () => {
    axios
      .get(
        ServerAddress +
          "ems/get_grouppermission/?department_id=" +
          departments.id,
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

  useEffect(() => {
    if (isupdating === true) {
      let temp_p = [];
      for (let index = 0; index < updated_permission.length; index++) {
        const element = updated_permission[index];
        temp_p.push(Object.values(element));
      }
      temp_p.splice(0,0,["Ems App", "All Section", false, false, false, false, ""])
      temp_p.splice(3,0,["Booking App", "All Section", false, false, false, false, ""])
      temp_p.splice(14,0,["Master App", "All Section", false, false, false, false, ""])
      temp_p.splice(28,0,["Billing App", "All Section", false, false, false, false, ""])
      temp_p.splice(32,0,["Manifest App", "All Section", false, false, false, false, ""])
      temp_p.splice(38,0,["Runsheet App", "All Section", false, false, false, false, ""])
      setpermission_title_list(temp_p);
    }
  }, [updated_permission, isupdating]);

  useEffect(() => {
    if (isupdating === true) {
      getUserPermission();
    }
  }, [isupdating]);

  // useEffect(() => {
  //   if (permission_title_list[0][2]) {
  //     alert("its a correct ind")
  //   }
  // }, [permission_title_list]);

  const TilteColor = (idx) => {
    if (idx===0) {
      return "red"
    }else if (idx===3) {
      return "red"
    }else if (idx===14) {
      return "red"
    }else if (idx===28) {
      return "red"
    }else if (idx===32) {
      return "red"
    }else if (idx===38) {
      return "red"
    }else {
      return "#000"
    }
  }

  const RotateDrop = (idx) =>{
    if (idx===0&&showRow.includes(1)) {
      return true
    }else if (idx===3&&showRow.includes(4)) {
      return true
    }else if (idx===14&&showRow.includes(15)) {
      return true
    }else if (idx===28&&showRow.includes(29)) {
      return true
    }else if (idx===32&&showRow.includes(33)) {
      return true
    }else if (idx===38&&showRow.includes(39)) {
      return true
    }else {
      return false
    }
  }

  const showData = (i) => {
    if (i===0) {
      if (showRow.includes(1)) {
        let ind = showRow.indexOf(1)
        let newData = [...showRow]
        newData.splice(ind, 2);
        setshowRow(newData)
      }else {
        setshowRow([...showRow,1,2])
      }
    }else if (i===3) {
      if (showRow.includes(4)) {
        let ind = showRow.indexOf(4)
        let newData = [...showRow]
        newData.splice(ind, 10);
        setshowRow(newData)
      }else {
        setshowRow([...showRow,4,5,6,7,8,9,10,11,12,13])
      }
    }else if (i===14) {
      if (showRow.includes(15)) {
        let ind = showRow.indexOf(15)
        let newData = [...showRow]
        newData.splice(ind, 13);
        setshowRow(newData)
      }else {
        setshowRow([...showRow,15,16,17,18,19,20,21,22,23,24,25,26,27])
      }
    }else if (i===28) {
      if (showRow.includes(29)) {
        let ind = showRow.indexOf(29)
        let newData = [...showRow]
        newData.splice(ind, 3);
        setshowRow(newData)
      }else {
        setshowRow([...showRow,29,30,31])
      }
    }else if (i===32) {
      if (showRow.includes(33)) {
        let ind = showRow.indexOf(33)
        let newData = [...showRow]
        newData.splice(ind, 5);
        setshowRow(newData)
      }else {
        setshowRow([...showRow,33,34,35,36,37])
      }
    }else if (i===38) {
      if (showRow.includes(39)) {
        let ind = showRow.indexOf(39)
        let newData = [...showRow]
        newData.splice(ind, 2);
        setshowRow(newData)
      }else {
        setshowRow([...showRow,39,40])
      }
    }
  }

  const allperm2 = (idx) => {
    let ttt = permission_title_list[idx][2]
    if (idx===0) {
      permission_title_list.map((e,i)=>{
        if (i<3) {
          e[2]=!ttt
        }
      })
    }else if (idx===3) {
      permission_title_list.map((e,i)=>{
        if (i>2&&i<14) {
          e[2]=!ttt
        }
      })
    }else if (idx===14) {
      permission_title_list.map((e,i)=>{
        if (i>13&&i<28) {
          e[2]=!ttt
        }
      })
    }else if (idx===28) {
      permission_title_list.map((e,i)=>{
        if (i>27&&i<32) {
          e[2]=!ttt
        }
      })
    }else if (idx===32) {
      permission_title_list.map((e,i)=>{
        if (i>31&&i<38) {
          e[2]=!ttt
        }
      })
    }else if (idx===38) {
      permission_title_list.map((e,i)=>{
        if (i>37&&i<41) {
          e[2]=!ttt
        }
      })
    }
    setpermis(true);
    setrefresh(!refresh);
  }
  const allperm3 = (idx) => {
    let ttt = permission_title_list[idx][3]
    if (idx===0) {
      permission_title_list.map((e,i)=>{
        if (i<3) {
          e[3]=!ttt
        }
      })
    }else if (idx===3) {
      permission_title_list.map((e,i)=>{
        if (i>2&&i<14) {
          e[3]=!ttt
        }
      })
    }else if (idx===14) {
      permission_title_list.map((e,i)=>{
        if (i>13&&i<28) {
          e[3]=!ttt
        }
      })
    }else if (idx===28) {
      permission_title_list.map((e,i)=>{
        if (i>27&&i<32) {
          e[3]=!ttt
        }
      })
    }else if (idx===32) {
      permission_title_list.map((e,i)=>{
        if (i>31&&i<38) {
          e[3]=!ttt
        }
      })
    }else if (idx===38) {
      permission_title_list.map((e,i)=>{
        if (i>37&&i<41) {
          e[3]=!ttt
        }
      })
    }
    setpermis(true);
    setrefresh(!refresh);
  }
  const allperm4 = (idx) => {
    let ttt = permission_title_list[idx][4]
    if (idx===0) {
      permission_title_list.map((e,i)=>{
        if (i<3) {
          e[4]=!ttt
        }
      })
    }else if (idx===3) {
      permission_title_list.map((e,i)=>{
        if (i>2&&i<14) {
          e[4]=!ttt
        }
      })
    }else if (idx===14) {
      permission_title_list.map((e,i)=>{
        if (i>13&&i<28) {
          e[4]=!ttt
        }
      })
    }else if (idx===28) {
      permission_title_list.map((e,i)=>{
        if (i>27&&i<32) {
          e[4]=!ttt
        }
      })
    }else if (idx===32) {
      permission_title_list.map((e,i)=>{
        if (i>31&&i<38) {
          e[4]=!ttt
        }
      })
    }else if (idx===38) {
      permission_title_list.map((e,i)=>{
        if (i>37&&i<41) {
          e[4]=!ttt
        }
      })
    }
    setpermis(true);
    setrefresh(!refresh);
  }
  const allperm5 = (idx) => {
    let ttt = permission_title_list[idx][5]
    if (idx===0) {
      permission_title_list.map((e,i)=>{
        if (i<3) {
          e[5]=!ttt
        }
      })
    }else if (idx===3) {
      permission_title_list.map((e,i)=>{
        if (i>2&&i<14) {
          e[5]=!ttt
        }
      })
    }else if (idx===14) {
      permission_title_list.map((e,i)=>{
        if (i>13&&i<28) {
          e[5]=!ttt
        }
      })
    }else if (idx===28) {
      permission_title_list.map((e,i)=>{
        if (i>27&&i<32) {
          e[5]=!ttt
        }
      })
    }else if (idx===32) {
      permission_title_list.map((e,i)=>{
        if (i>31&&i<38) {
          e[5]=!ttt
        }
      })
    }else if (idx===38) {
      permission_title_list.map((e,i)=>{
        if (i>37&&i<41) {
          e[5]=!ttt
        }
      })
    }
    setpermis(true);
    setrefresh(!refresh);
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          validation.handleSubmit(e.values);
          return false;
        }}
      >
        {/* Commodity */}
        <div className="mt-4">
          <PageTitle page="Add Department" />
          <Title title={isupdating?"Update Department":"Add Department"} parent_title={isupdating?"Department":"Department"} />
        </div>
        <div className="m-4">
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
                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">Department Name*</Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.department}
                          invalid={
                            validation.touched.department &&
                            validation.errors.department
                              ? true
                              : false
                          }
                          type="text"
                          name="department"
                          className="form-control-md"
                          id="input"
                          placeholder="Enter Department"
                        />
                        {validation.touched.department &&
                        validation.errors.department ? (
                          <FormFeedback type="invalid">
                            {validation.errors.department}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                    {/* <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">Priority*</Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.priority}
                          invalid={
                            validation.touched.priority &&
                              validation.errors.priority
                              ? true
                              : false
                          }
                          type="text"
                          name="priority"
                          className="form-control-md"
                          id="input"
                          placeholder="Enter priority "
                         
                        />
                        {validation.touched.priority &&
                          validation.errors.priority ? (
                          <FormFeedback type="invalid">
                            {validation.errors.priority}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                     <Col lg={4} md={6} sm={6}>
                      <div className="mb-3">
                        <Label className="header-child">Is Checker Maker</Label>
                        <br />
                        <Input
                          className="form-check-input-md"
                          type="checkbox"
                          id="defaultCheck1"
                          name="isAgree"
                          onChange={() => setis_checker_maker(!is_checker_maker)}
                          checked={is_checker_maker}
                        />
                      </div>
                    </Col> */}
                  </Row>
                </CardBody>
              ) : null}
            </Card>
          </Col>
        </div>

        {/* Permission */}
        <div className="m-4">
          <div className=" mb-2 main-header"></div>
          <Col lg={12}>
            <Card className="shadow bg-white rounded">
              <CardTitle className="mb-1 header">
                <div className="header-text-icon header-text">
                  <div>Department Permissions</div>
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
                  <div 
                  style={{ borderWidth: 1 }}
                  >
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
                        <thead >
                          <tr style={{ lineHeight: 2, }}>
                            <th
                              style={{
                                whiteSpace: "nowrap",
                                textAlign: "center",
                                padding: "0px 0px",
                              }}
                            >
                              App
                            </th>
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
                            // console.log("ersssssssssssssssssssss",permission_title_list)
                            return (
                              <>
                              {!showRow.includes(idx)?<tr
                                key={idx}
                                style={{
                                  borderWidth: 1,
                                  color:TilteColor(idx),
                                  // fontWeight:"800"
                                }}
                              >
                                <td style={{alignItems:"center"}}>
                                {TilteColor(idx)=="red"?
                                <RiArrowDropDownLine color="#000" size={30}
                                onClick={()=>{
                                  showData(idx)
                                }}
                                style={{transform: RotateDrop(idx)?'rotate(180deg)':''}}
                                />
                                :null}
                                  {item[0]}  
                                  {TilteColor(idx)=="red"?<Input
                                    className="form-check-input-sm"
                                    type="checkbox"
                                    style={{margin:10,borderColor:"red"}}
                                    onClick={() => {
                                      if (idx===0||idx===3||idx===14||idx===28||idx===32||idx===38) {
                                        // alert(idx)
                                        allperm2(idx)
                                        allperm3(idx)
                                        allperm4(idx)
                                        allperm5(idx)
                                      }
                                    }}
                                    checked={item[2]}
                                    readOnly
                                  />:null}
                                  </td>
                                <td>{item[1]}</td>
                                <td>
                                  <Input
                                    className="form-check-input-sm"
                                    type="checkbox"
                                    onClick={() => {
                                      if (idx===0||idx===3||idx===14||idx===28||idx===32||idx===38) {
                                        // alert(idx)
                                        allperm2(idx)
                                      }else {
                                        if (!item[2]) {
                                          setPermissions(2, idx);
                                        } else {
                                          removePermissions(2, idx);
                                        }

                                      }
                                    }}
                                    checked={item[2]}
                                    readOnly
                                  />
                                </td>

                                <td>
                                  <Input
                                    className="form-check-input-sm"
                                    type="checkbox"
                                    onClick={() => {
                                      if (idx===0||idx===3||idx===14||idx===28||idx===32||idx===38) {
                                        allperm3(idx)
                                      }else {
                                      if (!item[3]) {
                                        setPermissions(3, idx);
                                        setPermissions(2, idx);
                                      } else {
                                        removePermissions(3, idx);
                                      }
                                    }
                                    }}
                                    checked={item[3]}
                                    readOnly
                                  />
                                </td>
                                <td>
                                  <Input
                                    className="form-check-input-sm"
                                    type="checkbox"
                                    onClick={() => {
                                      if (idx===0||idx===3||idx===14||idx===28||idx===32||idx===38) {
                                        allperm4(idx)
                                      }else {
                                      if (!item[4]) {
                                        setPermissions(4, idx);
                                        setPermissions(3, idx);
                                        setPermissions(2, idx);
                                      } else {
                                        removePermissions(4, idx);
                                      }
                                    }
                                    }}
                                    checked={item[4]}
                                    readOnly
                                  />
                                </td>
                                <td>
                                  <Input
                                    className="form-check-input-sm"
                                    type="checkbox"
                                    onClick={() => {
                                      if (idx===0||idx===3||idx===14||idx===28||idx===32||idx===38) {
                                        allperm5(idx)
                                      }else {
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
                                    checked={item[5]}
                                    readOnly
                                  />
                                </td>
                              </tr>:null}
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

        {/*Button */}
        <div className=" m-4">
          <Col lg={12}>
            <div className="mb-1 footer_btn">
              <button type="submit" className="btn btn-info m-1 cu_btn">
                Save
              </button>

              <button
                className="btn btn-info m-1 cu_btn"
                type="button"
                onClick={handleAction}
              >
                Cancel
              </button>
            </div>
          </Col>
        </div>
      </form>
    </div>
  );
}

export default AddDepartment;
