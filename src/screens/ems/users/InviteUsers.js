 import React, { useState, useEffect,useLayoutEffect } from "react";
import {
  Form,
  Input,
  Col,
  Card,
  CardBody,
  CardTitle,
  Label,
  Row,
  FormFeedback,
} from "reactstrap";
import { ServerAddress } from "../../../constants/ServerAddress";
import { useSelector } from "react-redux";
import axios from "axios";
import { IconContext } from "react-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { setAlertType,setDataExist,setShowAlert } from "../../../store/alert/Alert";
import { useDispatch } from "react-redux";
import NSearchInput from "../../../components/formComponent/nsearchInput/NSearchInput";
import { MdAddCircleOutline, MdRemoveCircleOutline } from "react-icons/md";
import { MdAdd, MdDeleteForever } from "react-icons/md";
import MultiRowSearchInput from "../../../components/formComponent/multiRowSearchInput/MultiRowSearchInput";
import toTitleCase from "../../../lib/titleCase/TitleCase";
import SearchInput from "../../../components/formComponent/searchInput/SearchInput";
import { FiCheckSquare, FiSquare } from "react-icons/fi";
import PageTitle from "../../../components/pageTitle/PageTitle";
import Title from "../../../components/title/Title";

const InviteUsers = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    const location = useLocation();
    // for update state
    const [ isupdating, setisupdating] =  useState(false);
    const [invite_data, setinvite_data] =  useState("");
    const [invite_data_id, setinvite_data_id] =  useState("");
  
    //redux state
    const accessToken = useSelector((state) => state.authentication.access_token);
    const user_detail = useSelector((state) => state.authentication.userdetails);
    const user_id = useSelector((state) => state.authentication.userdetails.id);
  
  
    // const [email, SetEmail] = useState("");
    const [joined_date, setjoined_date] = useState("");
    const [username, SetUsername] = useState("");
    // const [phone_number, SetPhoneNumber] = useState("");
    // const [password, SetPassword] = useState("");
    // const [aadhar_number, SetAadhar] = useState("")
    // const [first_name, SetFirstName] = useState("");
    // const [middle_name, SetMiddleName] = useState("");
    // const [Last_name, SetLastName] = useState("");
    // const [title, SetTitle] = useState("");
    const [title_list, settitle_list] = useState([" Mr.", "Mrs.", "Ms."]);
    const [title_is, settitle_is] = useState("");
  
    const [is_creadentials , setis_creadentials] = useState(false);
    // const [hr_email, sethr_email] = useState("");
  
  
   
  
    const [employment_type, setemployment_type] = useState("");
    const [employment_type_list, setemployment_type_list] = useState([
      "Full Time",
      "Part Time",
      "contractual ",
    ]);
  
    const validation = useFormik({
      enableReinitialize: true,
      initialValues: {
        username: invite_data.username|| "",
        email: invite_data.email|| "",
        phone_number: invite_data.mobilenumber || "",
        aadhar_number: invite_data.aadhar_number || "",
        first_name: invite_data.firstname || "",
        last_name: invite_data.lastname || "",
        middle_name: invite_data.middlename || "",
        hr_email :invite_data.hr_email || "",
      },
      onSubmit: (values) => {
       isupdating ? Update_Invite_user(values) : invite_user(values);
      },
    });
  
    const [refresh, setrefresh] = useState(false);
    const [salary_type, setsalary_type] = useState(["",""])
    const [amount, setamount] = useState("");
    // const [remarks, setremarks] = useState("");
  
    const [circle_btn3, setcircle_btn3] = useState(true);
    const toggle_circle3 = () => {
      setcircle_btn3(!circle_btn3);
    };
  // add Another
    let dimension_list = [
      salary_type,
      amount
  ];
    const [row, setrow] = useState([dimension_list]);
    const addSalary = () => {
       let new_row = [["",""], ""];
      setrow([...row, new_row]);
    };
  
    const deleteSalary = (item) => {
      setsalary_type("salary_type");
      setamount("amount");
      // setremarks("remarks");
  
      let temp = [...row];
      // let temp_2 = [...gst_id_list];
      const index = temp.indexOf(item);
      if (index > -1) {
        temp.splice(index, 1);
        // temp_2.splice(index, 1);
      }
      setrow(temp);
      // setgst_id_list(temp_2);
    };
  
    const [salary_component_list, setsalary_component_list] = useState([]);
    // const [salary_component, setsalary_component] = useState("");
    // const [salary_component_id, setsalary_component_id] = useState("");
    const [salary_component_page, setsalary_component_page] = useState(1);
    const [salary_component_search, setsalary_component_search] = useState("");
    const [salary_component_loaded, setsalary_component_loaded] = useState(false);
    const [salary_component_count, setsalary_component_count] = useState(1);
    const [salary_component_bottom, setsalary_component_bottom] = useState(103);
    // const [salary_component_err, setsalary_component_err] = useState(false);
    // const [salary_component_text, setsalary_component_text] = useState("");
  
    const get_department_salary = async () => {
      let depart = [];
      try {
        const response = await axios.get(
          ServerAddress +
            `ems/get_salarycomponent/?p=${salary_component_page}&records=${10}&search=${salary_component_search}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        if (response.data.next === null) {
          setsalary_component_loaded(false);
        } else {
          setsalary_component_loaded(true);
        }
        if (response.data.results.length > 0) {
          if (salary_component_page === 1) {
            depart = response.data.results.map((v) => [
              v.id,
              toTitleCase(v.name),
            ]);
          } else {
            depart = [
              ...salary_component_list,
              response.data.results.map((v) => [
                v.id,
                toTitleCase(v.name),
              ]),
            ];
          }
        }
        setsalary_component_count(salary_component_count + 2);
         setsalary_component_list(depart);
      } catch (err) {
        alert(`Error Occur in Get Departments, ${err}`);
      }
    };
  
    useEffect(() => {
      get_department_salary();
    }, [salary_component_page, salary_component_search]);
  
    const [org, setorg] = useState("");
    const [org_list, setorg_list] = useState([]);
    const [org_page, setorg_page] = useState(1);
    const [org_search_item, setorg_search_item] = useState("");
    const [org_error, setorg_error] = useState(false);
    const [org_loaded, setorg_loaded] = useState(false);
    const [org_count, setorg_count] = useState(1);
    const [org_bottom, setorg_bottom] = useState(103);
    // Home Organization field name id
    const [org_id, setorg_id] = useState("");
  
    const getOrganization = async () => {
      let org_name = [];
      try {
        const response = await axios.get(
          ServerAddress +
            `organization/get_organization/?p=${org_page}&records=${10}&name_search=${org_search_item}&user_id=${user_id}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        if (response.data.next === null) {
          setorg_loaded(false);
        } else {
          setorg_loaded(true);
        }
        if (response.data.results.length > 0) {
          if (org_page === 1) {
            org_name = response.data.results.map((v) => [
              v.pan_no,
              toTitleCase(v.name),
            ]);
          } else {
            org_name = [
              ...org_list,
              ...response.data.results.map((v) => [
                v.pan_no,
                toTitleCase(v.name),
              ]),
            ];
          }
        }
        setorg_count(org_count + 2);
        setorg_list(org_name);
      } catch (err) {
        alert(`Error Occur in Get Organisation Name, ${err}`);
      }
    };
  
    useEffect(() => {
      getOrganization();
    }, [org_page, org_search_item]);
  
    
    const [search_branch, setsearch_branch] = useState("");
    const [page, setpage] = useState(1);
    const [home_branch_list, sethome_branch_list] = useState([]);
    const [home_branch_id, sethome_branch_id] = useState("");
    const [refresh1, setrefresh1] = useState(false);
    const [home_branch, sethome_branch] = useState("");
    const [home_branch_err, sethome_branch_err] = useState("");
    
    const getBranches = (org_id, filter_by) => {
      let temp3 = [];
      let data = [];
      axios
        .get(
          ServerAddress +
            `master/get_org_branch/?&p=${page}&records=${10}&branch_search=${search_branch}` +
            "&org_id=" +
            org_id +
            "&filter_by=" +
            filter_by,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        )
        .then((response) => {
          if (response.data.results.length > 0) {
            data = response.data.results;
            for (let index = 0; index < data.length; index++) {
              temp3.push([data[index].id, data[index].branch_name]);
            }
            setrefresh1(!refresh1);
            temp3 = [...new Set(temp3.map((v) => `${v}`))].map((v) =>
              v.split(",")
            );
            sethome_branch_list(temp3);
          }
        })
        .catch((err) => {
          alert(`Error Occur in Get Branch`, err);
        });
    };
  
    useLayoutEffect(() => {
      if (org_id !== "") {
        // sethome_branch("");
        getBranches(org_id, "organization");
      }
    }, [org_id, page, search_branch]);
  
    const [user_department_list, setuser_department_list] = useState([]);
    const [user_department, setuser_department] = useState("");
    const [user_department_id, setuser_department_id] = useState("");
    const [user_department_page, setuser_department_page] = useState(1);
    const [user_department_search, setuser_department_search] = useState("");
    const [user_department_loaded, setuser_department_loaded] = useState(false);
    const [user_department_count, setuser_department_count] = useState(1);
    const [user_department_bottom, setuser_department_bottom] = useState(103);
    const [user_department_err, setuser_department_err] = useState(false);
  
    const get_department = async () => {
      let depart = [];
      try {
        const response = await axios.get(
          ServerAddress +
            `organization/Get-Department/?p=${user_department_page}&records=${10}&department_search=${user_department_search}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        if (response.data.next === null) {
          setuser_department_loaded(false);
        } else {
          setuser_department_loaded(true);
        }
        if (response.data.results.length > 0) {
          if (user_department_page === 1) {
            depart = response.data.results.map((v) => [
              v.id,
              toTitleCase(v.departement_name),
            ]);
          } else {
            depart = [
              ...user_department_list,
              response.data.results.map((v) => [
                v.id,
                toTitleCase(v.departement_name),
              ]),
            ];
          }
        }
        setuser_department_count(user_department_count + 2);
        setuser_department_list(depart);
      } catch (err) {
        alert(`Error Occur in Get Departments, ${err}`);
      }
    };
  
    useEffect(() => {
      get_department();
    }, [user_department_page, user_department_search]);
  
  
    const [designation_list, setdesignation_list] = useState([]);
    const [designation, setdesignation] = useState("");
    const [designation_id, setdesignation_id] = useState("");
    const [designation_page, setdesignation_page] = useState(1);
    const [designation_search, setdesignation_search] = useState("");
    const [designation_loaded, setdesignation_loaded] = useState(false);
    const [designation_count, setdesignation_count] = useState(1);
    const [designation_bottom, setdesignation_bottom] = useState(103);
    const [designation_err, setdesignation_err] = useState(false);
    // const [designation_text, setdesignation_text] = useState("");
  
    const get_designation = async () => {
      let depart = [];
      try {
        const response = await axios.get(
          ServerAddress +
            `ems/Get-Designation/?p=${designation_page}&records=${10}&search=${designation_search}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        if (response.data.next === null) {
          setdesignation_loaded(false);
        } else {
          setdesignation_loaded(true);
        }
        if (response.data.results.length > 0) {
          if (designation_page === 1) {
            depart = response.data.results.map((v) => [
              v.id,
              toTitleCase(v.designation),
            ]);
          } else {
            depart = [
              ...designation_list,
              response.data
              .results.map((v) => [
                v.id,
                toTitleCase(v.designation),
              ]),
            ];
          }
        }
        setdesignation_count(designation_count + 2);
         setdesignation_list(depart);
      } catch (err) {
        alert(`Error Occur in Get Departments, ${err}`);
      }
    };
  
    useEffect(() => {
        get_designation();
      
    }, [designation_page, designation_search]);
  
    const invite_user = (values) => {
      axios
        .post(
          ServerAddress + "ems/Add_User_details/",
          {
            aadhar_number: values.aadhar_number,
            username: values.username,
            email: values.email,
            mobilenumber: values.phone_number,
            date_joined: joined_date,
            // password: "TO",
            firstname: values.first_name,
            middlename: values.middle_name,
            lastname: values.last_name,
            title: title_is,
            organization_id: org_id,
            organization_name: org,
            home_branch: home_branch_id,
            home_branch_name: home_branch,
            employment_type: employment_type,
            department : user_department_id,
            department_name: user_department,
            designation: designation_id,
            designation_name: designation,
            get_hr_email: is_creadentials,
            hr_email: values.hr_email,
            salary_info:row,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then(function (resp) {
          console.log("response ===>", resp.data);
          if (resp.status === 201) {
            send_msg(resp.data.username, resp.data.password);
            dispatch(setShowAlert(true));
            dispatch(setDataExist(`${values.username} Added sucessfully`));
            dispatch(setAlertType("success"));
            navigate("/ems/users");
          }
        })
        .catch((err) => {
          alert(`error occur while adding ${username},${err}`);
        });
    };
  
    const Update_Invite_user = (values) => {
      axios
        .put(
          ServerAddress + "ems/Update-invite-user/" + invite_data_id,
          {
            aadhar_number: values.aadhar_number,
            username: values.username,
            email: values.email,
            mobilenumber: values.phone_number,
            firstname: values.first_name,
            middlename: values.middle_name,
            lastname: values.last_name,
            title: title_is,
            organization_id: org_id,
            organization_name: org,
            home_branch: home_branch_id,
            home_branch_name: home_branch,
            employment_type: employment_type,
            department : user_department_id,
            department_name: user_department,
            designation: designation_id,
            designation_name: designation,
            get_hr_email: is_creadentials,
            hr_email: values.hr_email,
            salary_info:row,
          },
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        )
        .then((response) => {
          if (response.data.status === "success") {
            dispatch(setShowAlert(true));
            dispatch(setAlertType("warning"));
            dispatch(
              setDataExist(`Invite User ${values.username} Updated Successfully`)
            );
            navigate("/ems/users");
          }
        })
        .catch((error) => {
          alert(`Error While Updating Invite User ${error}`);
        });
    };
  
    
    const send_msg = (uname, password) => {
      const axios = require("axios");
  
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
  
      const data = {
        token: "a8u6imzxp5jbfy98",
        to: validation.values.phone_number,
        body: `Welcome to the team! We're excited to have you on board at DHTC India Limited.\n\n Your skills and expertise will be a great asset to our organization. Please go through this company URL: ${`http://dhtc.etechcube.com/signin`} and complete the onboarding process. If you have any questions, feel free to reach out to your HR and ${`info@dhtc.com`}.\n\n We're here to support you as you settle into your role. Let's work together to achieve great things!\n\n Please Use below mentioned credentials: \n\nUsername: ${uname}\nPassword: ${password}`,
      };
  
      axios
        .post(
          "https://api.ultramsg.com/instance52709/messages/chat",
          data,
          config
        )
        .then((response) => {
          if (response.data.message === "ok") {
            alert("Message Sent Successfully");
          }
          console.log(response.data);
        })
        .catch((error) => {
          console.log("error", error);
        });
    };
  
    
  useEffect(() => {
    try{
      let invite = location.state.user;
      setisupdating(true);
      setinvite_data(invite);
      setinvite_data_id(invite.id);
      settitle_is(invite.title);
      setjoined_date(invite.date_joined);
      setorg(toTitleCase(invite.organization_name));
      setorg_id(invite.organization_id);
      sethome_branch(toTitleCase(invite.home_branch_name));
      sethome_branch_id(invite.home_branch);
      setupdate_salary_info(invite.user_salary);
      setemployment_type(invite.employment_type);
      setuser_department(toTitleCase(invite.department_name));
      setuser_department_id(invite.department);
      setdesignation(toTitleCase(invite.designation_name));
      setdesignation_id(invite.designation);
    } catch (error) {}
  }, [])
  
  //Add Update and Another
  const [update_salary_info, setupdate_salary_info] = useState([]);
  useEffect(() => {
  if (isupdating) {
    if (update_salary_info.length !==0) {
      let temp = [];
      let temp_list = [];
      temp = update_salary_info;
  
      for (let i = 0; i < update_salary_info.length; i++) {
        temp_list.push([
          [temp[i].salarycomponent ,temp[i].salary_component_name],
          temp[i].amount,
          temp[i].id,
          temp[i].employee
        ]);
      }
      setrow(temp_list);
    }
  }
  }, [isupdating])
  
  
    return (
      <div>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            validation.handleSubmit(e.values);
            return false;
          }}
        >       
          {/* // user basic info */}
          <div className="m-4">
          <PageTitle
            page = {isupdating ? "Update Invite User" : "Add Invite User"} />
            <Title
                title={isupdating ? "Update Invite User" : "Add Invite User"}
                parent_title="Ems"
              />
              </div>
  <div className="m-4">
            <Col lg={12}>
              <Card className="shadow bg-white rounded">
                <CardTitle className="mb-1 header">
                  <div className="header-text-icon header-text">
                    <div>User info</div>
                    <IconContext.Provider
                      value={{
                        className: "header-add-icon",
                      }}
                    ></IconContext.Provider>
                  </div>
                </CardTitle>
                <CardBody>
                  <Row>
                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-3">
                        <Label className="header-child">Aadhar Number*</Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.aadhar_number || ""}
                          type="number"
                          min={0}
                          name="aadhar_number"
                          className="form-control-md"
                          id="input"
                          placeholder="Enter Aadhar Number"
                        />
                      </div>
                    </Col>
  
                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-3">
                        <Label className="header-child">Joined Date*</Label>
                        <Input
                          onBlur={validation.handleBlur}
                          type="date"
                          bsSize="sm"
                          min={0}
                          name="joined_date"
                          className="form-control-md"
                          value={joined_date}
                          onChange = {(event) => {
                            setjoined_date(event.target.value);
                          }}
                        />
                      </div>
                    </Col>
  
                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-3">
                        <Label className="header-child">Title*</Label>
                        <NSearchInput
                          data_list={title_list}
                          data_item_s={title_is}
                          set_data_item_s={settitle_is}
                          show_search={false}
                        />                      
                      </div>
                    </Col>
                    
                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-3">
                        <Label className="header-child">First Name*</Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.first_name || ""}
                          type="text"
                          name="first_name"
                          className="form-control-md"
                          id="input"
                          placeholder="Enter First Name"
                        />
                      </div>
                    </Col>
  
                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-3">
                        <Label className="header-child">Middle Name*</Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.middle_name || ""}
                          type="text"
                          name="middle_name"
                          className="form-control-md"
                          id="input"
                          placeholder="Enter Middle Name"
                        />
                      </div>
                    </Col>
  
                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-3">
                        <Label className="header-child">Last Name*</Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.last_name || ""}
                          type="text"
                          name="last_name"
                          className="form-control-md"
                          id="input"
                          placeholder="Enter Last Name"
                        />
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
                            bsSize="sm"
                            className="form-control-md"
                            placeholder="Enter user Id"
                          />
                          {validation.touched.username &&
                          validation.errors.username ? (
                            <FormFeedback type="invalid">
                              {validation.errors.username}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
  
                      
  
                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-3">
                        <Label className="header-child">Phone Number*</Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.phone_number|| ""}
                          type="tel"
                          name="phone_number"
                          className="form-control-md"
                          id="input"
                          placeholder="Enter Phone Number"
                        />
                      </div>
                    </Col>
  
                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-3">
                        <Label className="header-child">Email*</Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.email || ""}
                          type="email"
                          name="email"
                          className="form-control-md"
                          id="input"
                          placeholder="Enter Email"
                        />
                      </div>
                    </Col>
                    <Col lg={4} md={6} sm={6}>
                        <div className="mb-3">
                          <Label className="header-child">Get Creadentials on HR Email</Label>
                          <div onClick={() => setis_creadentials(!is_creadentials)}>
                            {is_creadentials ? (
                              <FiCheckSquare size={18} />
                            ) : (
                              <FiSquare size={18} />
                            )}
                          </div>
                        </div>
                      </Col>
             {is_creadentials ? (
                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-3">
                      <Label className="header-child">
                          HR Email{" "}
                        </Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.hr_email || ""}
                          type="email"
                          name="hr_email"
                          className="form-control-md"
                          id="input"
                          placeholder="Enter HR Email"
                        />
                      </div>
                    </Col>
                    ):null}                
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </div>
  
          {/* // user work info */}
          <div className="m-4">
            <div className="mb-2 main-header" id="workinfo"></div>
            <Col lg={12}>
              <Card className="shadow bg-white rounded">
                <CardTitle className="mb-1 header">
                  <div className="header-text-icon header-text">
                    <div>Work Info</div>
                    <IconContext.Provider
                      value={{
                        className: "header-add-icon",
                      }}
                    ></IconContext.Provider>
                  </div>
                </CardTitle>
                <CardBody>
                  <Row>
                  <Col lg={4} md={6} sm={6}>
                        <div className="mb-2">
                          <Label className="header-child">
                            Organization Name:
                          </Label>
                          <SearchInput
                            data_list={org_list}
                            setdata_list={setorg_list}
                            data_item_s={org}
                            set_data_item_s={setorg}
                            set_id={setorg_id}
                            page={org_page}
                            setpage={setorg_page}
                            setsearch_item={setorg_search_item}
                            error_message={"Please Select Organization"}
                            error_s={org_error}
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
                            // setrefresh1={refresh}
                            page={page}
                            setpage={setpage}
                            set_id={sethome_branch_id}
                            setsearch_item={setsearch_branch}
                            // disable_me={!user_detail.is_superuser && is_update}
                          />
                        </div>
                        <div className="mt-1 error-text" color="danger">
                          {home_branch_err ? "Please Select Any Branch" : null}
                        </div>
                      </Col>
  
                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-3">
                        <Label className="header-child">Employment Type*</Label>
                        <NSearchInput
                          data_list={employment_type_list}
                          data_item_s={employment_type}
                          set_data_item_s={setemployment_type}
                          show_search={false}
                        />
                      </div>
                    </Col>
  
                    <Col lg={4} md={6} sm={6}>
                        <div className="mb-2">
                          <Label className="header-child">Department * :</Label>
                          <SearchInput
                            data_list={user_department_list}
                            set_data_list={setuser_department_list}
                            data_item_s={user_department}
                            set_data_item_s={setuser_department}
                            set_id={setuser_department_id}
                            page={user_department_page}
                            setpage={setuser_department_page}
                            error_message={"Please Select Any Department"}
                            error_s={user_department_err}
                            search_item={user_department_search}
                            setsearch_item={setuser_department_search}
                            loaded={user_department_loaded}
                            count={user_department_count}
                            bottom={user_department_bottom}
                            setbottom={setuser_department_bottom}
                          />
                        </div>
                      </Col>
  
                    <Col lg={4} md={6} sm={6}>
                        <div className="mb-2">
                          <Label className="header-child">Designation*:</Label>
                          <SearchInput
                            data_list={designation_list}
                            set_data_list={setdesignation_list}
                            data_item_s={designation}
                            set_data_item_s={setdesignation}
                            set_id={setdesignation_id}
                            page={designation_page}
                            setpage={setdesignation_page}
                            error_message={"Please Select Any Designation"}
                            error_s={designation_err}
                            search_item={designation_search}
                            setsearch_item={setdesignation_search}
                            loaded={designation_loaded}
                            count={designation_count}
                            bottom={designation_bottom}
                            setbottom={setdesignation_bottom}
                          />
                        </div>
                      </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </div>
  
          {/* // user salary */}
          <div className="m-3" id="salary_details">
              <Col lg={12}>
                <Card className="shadow bg-white rounded">
                  <CardTitle className="mb-1 header">
                    <div className="header-text-icon header-text">
                       Salary Info
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
                            <Col lg={3} md={6} sm={6}>
                              <div className="mb-3">
                                <Label className="header-child">Salary Type </Label>
                                {row.map((item, index) => (
                                  <div className="mb-3">
                                    <MultiRowSearchInput
                                      data_list={salary_component_list}
                                      setdata_list={setsalary_component_list}
                                      data_item_s={row[index][0]}
                                      page={salary_component_page}
                                      setpage={setsalary_component_page}
                                      setsearch_txt={setsalary_component_search}
                                      refresh={refresh}
                                      setrefresh={setrefresh}
                                      idx={index}
                                      loaded={salary_component_loaded}
                                      count={salary_component_count}
                                      bottom={salary_component_bottom}
                                      setbottom={setsalary_component_bottom}
                                    />
                                  </div>
                                ))}
                              </div>
                            </Col>
  
                            <Col lg={3} md={6} sm={6}>
                              <div className="mb-3">
                                <Label className="header-child">Amount</Label>
                                {row.map((item, index) => {
                                  return (
                                    <Input
                                      min={0}
                                      key={index}
                                      value={item[1]}
                                      type="number"
                                      className="form-control-md"
                                      id="input"
                                      style={{ marginBottom: "15px" }}
                                      placeholder="Enter Amount "
                                      onChange={(val) => {
                                        item[1] = val.target.value;
                                        setrefresh(!refresh);
                                      }}
                                    />
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
                                            deleteSalary(item);
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
                          </Row>
                          <>
                            {row.length < 20 && (
                              <div style={{ margin: " 0 0 20px 0" }}>
                                  
                                <span
                                  className="link-text"
                                  onClick={() => {
                                    // setgst_city_list([])
                                    // setgst_city_page(1)
                                    // setgstcity_bottom(103)
                                    let lastRow = row[row.length - 1].slice(0,1).every((val) => val.toString() !== "");
                                    if (lastRow) {
                                      // setsalary_component_err(true)
                                      // setsalary_component_text("Please Fill Salary Info")
                                      addSalary();                                    
                                    } else {
                                      alert("Please Fill salary info")
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
                                  Add Another Salary Info
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
  
         
  
          <div className=" m-4">
            <Col lg={12}>
              <div className="mb-1 footer_btn">
                <button 
                type="submit" 
                className="btn btn-success"
                style={{ marginRight: "15px", width: "77px" }}
                >
                {isupdating ? "Update" : "Save"}
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => {
                    navigate("/ems/users");
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

export default InviteUsers