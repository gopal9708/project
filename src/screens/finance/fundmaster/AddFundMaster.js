/* eslint-disable */
import { IconContext } from "react-icons";
import { MdAddCircleOutline, MdRemoveCircleOutline } from "react-icons/md";
import {
  CardBody,
  CardTitle,
  Col,
  Form,
  Label,
  Row,
  Input,
  Card,
  Button,
  FormFeedback,
} from "reactstrap";
import PageTitle from "../../../components/pageTitle/PageTitle";
import Title from "../../../components/title/Title";
import { useState, useEffect, useLayoutEffect } from "react";
import { useFormik } from "formik"; //used for validation
import * as Yup from "yup"; //used for validation
import { useLocation, useNavigate } from "react-router-dom"; // For navigation
import { ServerAddress } from "../../../constants/ServerAddress";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  setShowAlert,
  setDataExist,
  setAlertType,
} from "../../../store/alert/Alert";
import { useDispatch } from "react-redux";
import NSearchInput from "../../../components/formComponent/nsearchInput/NSearchInput";

const AddFundMaster = () => {
  const AccessToken = useSelector((state) => state.authentication.access_token);
  const user = useSelector((state) => state.authentication.userdetails);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [organization_id, setorganization_id] = useState("");
  // Toggle Btn
  const [circle_btn, setcircle_btn] = useState(true);
  const toggle_circle = () => {
    setcircle_btn(!circle_btn);
  };

  //Dropdown
  const [acc_type, setacc_type] = useState("");
  const [acc_type_list, setacc_type_list] = useState([
    "Savings",
    "Current",
    "Cash Credit",
  ]);
  const [acc_type_error, setacc_type_error] = useState(false);

  const [refresh, setrefresh] = useState(false);

  // Location Info
  const [state_list_s, setstate_list_s] = useState([]);
  const [state, setstate] = useState("");
  const [state_id, setstate_id] = useState(0);
  const [state_error, setstate_error] = useState(false);
  const [state_page, setstate_page] = useState(1);
  const [state_search_item, setstate_search_item] = useState("");

  const [city_list_s, setcity_list_s] = useState([]);
  const [city, setcity] = useState("");
  const [city_id, setcity_id] = useState(0);
  const [city_error, setcity_error] = useState(false);
  const [city_page, setcity_page] = useState(1);
  const [city_search_item, setcity_search_item] = useState("");

  const [by_pincode, setby_pincode] = useState(false);
  const [pincode, setpincode] = useState("");
  const [pincode_list, setpincode_list] = useState([]);
  const [pincode_id, setpincode_id] = useState(0);
  const [pincode_search_item, setpincode_search_item] = useState("");
  const [pincode_page, setpincode_page] = useState(1);
  const [pincode_error, setpincode_error] = useState(false);

  //For Update
  const [is_updating, setis_updating] = useState(false);
  const [fund_master, setfund_master] = useState("");
  const [fund_master_id, setfund_master_id] = useState("");
  const [fund_code, setfund_code] = useState("");

  //for error
  const [branch_error, setbranch_error] = useState(false);

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      // This should be in small letter or smallcase
      account_no: fund_master.account_no || "",
      account_no_hide: fund_master.account_no || "",
      beneficiary_name: fund_master.beneficiary_name || "",
      ifsc_code: fund_master.ifsc_code || "",
      bank_name: fund_master.bank_name || "",
      bank_branch: fund_master.bank_branch || "",
      mob_no: fund_master.mob_no || "",
      email: fund_master.email || "",
      ledger_code: fund_master.ledger_code || "",
      remarks: fund_master.remarks || "",
    },

    validationSchema: Yup.object({
      account_no:Yup.string()
      .required("Account No is required"),
      account_no_hide:Yup.string()
      .required("Account No is required "),
    beneficiary_name:Yup.string()
      .required("Beneficiary Name is requried"),
    ifsc_code:Yup.string()
      .required("IFSC code is required"),
    bank_name:Yup.string()
      .required("Bank name is required"),
    bank_branch:Yup.string()
      .required("Bank branch is required"),
    mob_no:Yup.string()
      .min(10,"invalid number")
      .max(10,"invalid number")
      .required("Phone Number is required"),
    email: Yup.string()
      .email()
      .required("Email is required"),
    ledger_code:Yup.string()
    .required("Ledger code is required"),
    remarks:Yup.string()
    .required("Remarks is required"),
    }),

    onSubmit: (values) => {
      let shaw = Object.entries(validation.values);
      let filter_value = shaw.filter((v) => v[1] == "" || v[1] == 0);
      let map_value = filter_value.map((m) => m[0]);
      let all_value = map_value[0];
      
      let field =[
        "account_no",
        "account_no_hide",
        "beneficiary_name",
        "ifsc_code",
        "bank_name",
        "bank_branch",
        "mob_no",
        "email",
        "ledger_code",
        "remarks",
      ]
      if (branch_n === ""){
        setbranch_error(true);
        document.getElementById("secation1").scrollIntoView();
      }else if (field.includes(all_value)){
        document.getElementById("section1").scrollIntoView();
      }else if (acc_type === ""){
        setacc_type_error(true);
      }else if (state === ""){
        setstate_error(true);
      }else if (city === ""){
        setcity_error(true);
      }else if (pincode === ""){
        setpincode_error(true);
      }
      else{
        is_updating ? update_fund_master_data(values) : send_fundmaster_data(values);
      }
    },
  });

  // post method
  const send_fundmaster_data = (values) => {
   
    axios
      .post(
        ServerAddress + "finance/add-FundMasterEntry/",
        {
          organization_name:user.organization_name,
          organization:user.organization_id,
          user_branch: user.home_branch,
          user_branch_name:user.home_branch_name,
          branch: branch_n_id,
          branch_name:branch_n,
          account_no: values.account_no,
          account_type: acc_type,
          beneficiary_name: values.beneficiary_name,
          ifsc_code: values.ifsc_code,
          bank_name: values.bank_name,
          bank_branch: values.bank_branch,
          pincode: pincode_id,
          mob_no: values.mob_no,
          email: values.email,
          ledger_code: values.ledger_code,
          remarks: values.remarks,
          state: state_id,
          state_name:state,
          city: city_id,
          city_name:city,
          // loc: { state, city, pincode },
        },
        {
          headers: { Authorization: `Bearer ${AccessToken}` },
        }
      )
      .then((response) => {
        if (response.data.status === "success") {
          dispatch(setShowAlert(true));
          dispatch(setAlertType("Warning"));
          dispatch(
            setDataExist(`Add Fund Master ${branch_n} is Added Successfully`)
          );
          // alert ("Data Add Ho Gaya");
          navigate("/master/fundmaster");
        }
      })
      .catch((error) => {
        console.log(error);
      });    
  };

  const update_fund_master_data = (values) => {
    axios
      .put(
        ServerAddress + "finance/put-FundMasterEntry/" + fund_code ,
        {
          organization_name:user.organization_name,
          organization:user.organization_id,
          user_branch: user.home_branch,
          user_branch_name:user.home_branch_name,
          branch_name: branch_n,
          branch: branch_n_id,
          account_no: values.account_no,
          account_type: acc_type,
          beneficiary_name: values.beneficiary_name,
          ifsc_code: values.ifsc_code,
          bank_name: values.bank_name,
          bank_branch: values.bank_branch,
          pincode: pincode_id,
          mob_no: values.mob_no,
          email: values.email,
          ledger_code: values.ledger_code,
          remarks: values.remarks,
          state: state_id,
          state_name:state,
          city: city_id,
          city_name:city,
          fund_code:fund_code,
          // loc: { state, city, pincode },
        },
        {
          headers: { Authorization: `Bearer ${AccessToken}` },
        }
      )
      .then((response) => {
        if (response.data.status === "success") {
          dispatch(setShowAlert(true));
          dispatch(setAlertType("warning"));
          dispatch(
            setDataExist(`Fund Master ${branch_n} Updated Successfully`)
          );
          navigate(-1);
        }
      })
      .catch((error) => {
        alert(`Error While Updating Profile ${error}`);
      });
  };

  // for getting the state and city and pincode

  // Locations Function
  const getStates = (place_id, filter_by) => {
    // let state_list = [...state_list_s];
    let state_list = [];
    axios
      .get(
        ServerAddress +
          `master/all_states/?search=${""}&p=${state_page}&records=${10}&state_search=${state_search_item}` +
          "&place_id=" +
          place_id +
          "&filter_by=" +
          filter_by,
        {
          headers: { Authorization: `Bearer ${AccessToken}` },
        }
      )
      .then((response) => {
        let data = response.data.results;
        for (let index = 0; index < data.length; index++) {
          state_list.push([data[index].id, data[index].state]);
        }
        setstate_list_s(state_list);
      })
      .catch((err) => {
        alert(`Error Occur in Get States, ${err}`);
      });
  };

  useLayoutEffect(() => {
    getStates();
  }, [state_search_item, refresh]);

  const getCities = (place_id, filter_by) => {
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
          headers: { Authorization: `Bearer ${AccessToken}` },
        }
      )
      .then((response) => {
        let data = response.data.results;
        for (let index = 0; index < data.length; index++) {
          cities_list.push([data[index].id, data[index].city]);
        }

        setcity_list_s(cities_list);
      })
      .catch((err) => {
        alert(`Error Occur While get City, ${err}`);
      });
  };

  useEffect(() => {
    if (state_id !== 0 && by_pincode === false) {
      setcity("");
      getCities(state_id, "state");
      setpincode_list([]);
      setpincode("");
    }
  }, [state_id]);

  const getPincode = (place_id, filter_by) => {
    let pin_code = [];
    axios
      .get(
        ServerAddress +
          `master/all_pincode/?search=${""}&p=${pincode_page}&records=${10}&pincode_search=${pincode_search_item}` +
          "&place_id=" +
          place_id +
          "&filter_by=" +
          filter_by,
        {
          headers: { Authorization: `Bearer ${AccessToken}` },
        }
      )
      .then((response) => {
        for (let index = 0; index < response.data.results.length; index++) {
          const element = response.data.results[index];
          pin_code.push([element.id, element.pincode]);
        }
        setpincode_list(pin_code);
      })
      .catch((err) => {
        alert(`Error Occur in Get Pincode, ${err}`);
      });
  };

  useEffect(() => {
    if (city_id !== 0 && by_pincode === false) {
      setpincode("");
      getPincode(city_id, "city");
    }
  }, [city_id]);

  //for getting the branch data
  const [branch_n, setbranch_n] = useState("");
  const [branch_n_list, setbranch_n_list] = useState([]);
  const [branch_n_id, setbranch_n_id] = useState();
  

  const get_branch = () => {
    let branch = [];
    axios
      .get(ServerAddress + "master/get-Branch/?p=1&records", {
        headers: { Authorization: `Bearer ${AccessToken}` },
      })
      .then((response) => {
        let data = response.data.results;
        for (let index = 0; index < data.length; index++) {
          branch.push([data[index].id, data[index].branch_name]);
        }
        setbranch_n_list(branch);
      })
      .catch((err) => {
        alert(`Error occured while getting data Data ${err}`);
      });
  };

  useEffect(() => {
    get_branch();
  }, []);

  useEffect(() => {
    try {
      let fund = location.state.data;
      setis_updating(true);
      setfund_master(fund);
      setfund_master_id(fund.id);
      setacc_type(fund.account_type);
      setbranch_n(fund.branch_name);
      setstate_id(fund.state_id);
      setstate(fund.state_name);
      setcity(fund.city_name);
      setcity_id(fund.city_id);
      setpincode_id(fund.location);
      setpincode(fund.pin_code);
      setorganization_id(user.organization_id)
      setfund_code(fund.fund_code)
    } catch (error) {
      setis_updating(false);
    }
  }, [is_updating]);
  useEffect(() => {
    if (state) {
      setstate_error(false);
    }
    if (city) {
      setcity_error(false);
    }
    if (pincode) {
      setpincode_error(false);
    }
  }, [state, city]);

  return (
    <div>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          let shaw = Object.entries(validation.values);
      let filter_value = shaw.filter((v) => v[1] == "" || v[1] == 0);
      let map_value = filter_value.map((m) => m[0]);
      let all_value = map_value[0];
      
      let field =[
        "account_no",
        "account_no_hide",
        "beneficiary_name",
        "ifsc_code",
        "bank_name",
        "bank_branch",
        "mob_no",
        "email",
        "ledger_code",
        "remarks",
      ]
      if (branch_n === ""){
        setbranch_error(true);
        document.getElementById("secation1").scrollIntoView();
      }else if (field.includes(all_value)){
        document.getElementById("section1").scrollIntoView();
      }else if (acc_type === ""){
        setacc_type_error(true);
      }else if (state === ""){
        setstate_error(true);
      }else if (city === ""){
        setcity_error(true);
      }else if (pincode === ""){
        setpincode_error(true);
      }
       validation.handleSubmit(e.values);
       return false;
        }}
      >
        <div className="m-4">
          <PageTitle
            page={is_updating ? "Update Fund Master" : " Add Fund Master"}
          />
          <Title
            title={is_updating ? "Update Fund Master" : "Add Fund Master"}
            parent_title="Finance"
          />
        </div>

        <div className="m-4" id="section1">
          <Card className="shadow bg-white rounded">
            <CardTitle className="mb-1 header">
              <div className="header-text-icon header-text">
                Fund Master
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

                  {is_updating ? (
                     <Col lg={4} md={6} sm={6}>
                     <div className="m-2 mb-2">
                       <Label className="header-child sm-10">
                         Fund Code :
                       </Label>
                       <Input
                         className="form-control d-block from control-md"
                         bsSize="sm"
                         name="fund_code"
                          type="char"                       
                         value={fund_code}
                         disabled
                       />
                     </div>
                   </Col>
                  ): null}
                  <Col lg={4} md={6} sm={6}>
                    <div className="m-2 mb-2">
                      <Label className="header-child sm-10">
                        {" "}
                        Branch Name<span className="mandatory">*</span> :
                      </Label>
                      <NSearchInput
                        data_list={branch_n_list}
                        data_item_s={branch_n}
                        set_data_item_s={setbranch_n}
                        set_id={setbranch_n_id}
                        error_message={" Branch Name is required"}
                        error_s={branch_error}
                      />
                    </div>
                  </Col>
                  <Col lg={4} md={6} sm={6}>
                    <div className="m-2 mb-2">
                      <Label className="header-child sm-10">
                        Account No. Hide <span className="mandatory">*</span> :
                      </Label>
                      <Input
                        className="form-control d-block from control-md"
                        bsSize="sm"
                        name="account_no_hide"
                        type="password"
                        min={0}
                        placeholder=" Enter Account No."
                        onChange={validation.handleChange}
                        value={validation.values.account_no_hide}
                        invalid={
                          validation.touched.account_no_hide &&
                          validation.errors.account_no_hide
                          ? true
                          : false
                        }
                      />
                      {validation.touched.account_no_hide && 
                      validation.errors.account_no_hide ? (
                        <FormFeedback type="invalid">
                          {validation.errors.account_no_hide}
                        </FormFeedback>
                      ):null}
                    </div>
                  </Col>

                  <Col lg={4} md={6} sm={6}>
                    <div className="m-2 mb-2">
                      <Label className="header-child sm-10">
                        Account No.<span className="mandatory">*</span> :
                      </Label>
                      <Input
                        className="form-control d-block from control-md"
                        bsSize="sm"
                        name="account_no"
                        type="number"
                        min={0}
                        placeholder=" Enter Account No"
                        onChange={validation.handleChange}
                        value={validation.values.account_no}
                        invalid={
                          validation.touched.account_no &&
                          validation.errors.account_no
                            ? true
                            : false
                        }
                      />
                      {validation.touched.account_no &&
                            validation.errors.account_no ? (
                            <FormFeedback type="invalid">
                              {validation.errors.account_no}
                            </FormFeedback>
                          ) : null}
                    </div>
                  </Col>

                  <Col lg={4} md={6} sm={6}>
                    <div className="m-2 mb-2">
                      <Label className="header-child sm-10">
                        A/C Type <span className="mandatory">*</span> :
                      </Label>
                      <NSearchInput
                        data_list={acc_type_list}
                        data_item_s={acc_type}
                        set_data_item_s={setacc_type}
                        show_search={false}
                        error_message={"A/C Type is required"}
                        error_s={acc_type_error}
                      />
                      
                    </div>
                  </Col>
                  <Col lg={4} md={6} sm={6}>
                    <div className="m-2 mb-2">
                      <Label className="header-child sm-10">
                        Beneficiary Name <span className="mandatory">*</span> :
                      </Label>
                      <Input
                        className="form-control d-block from control-md"
                        bsSize="sm"
                        name="beneficiary_name"
                        type="text"
                        placeholder="Enter Beneficiary Name"
                        onChange={validation.handleChange}
                        value={validation.values.beneficiary_name}
                        invalid={
                          validation.touched.beneficiary_name &&
                            validation.errors.beneficiary_name
                            ? true
                            : false
                        }
                      />
                      {validation.touched.beneficiary_name &&
                            validation.errors.beneficiary_name ? (
                            <FormFeedback type="invalid">
                              {validation.errors.beneficiary_name}
                            </FormFeedback>
                          ) : null}
                    </div>
                  </Col>
                  <Col lg={4} md={6} sm={6}>
                    <div className="m-2 mb-2">
                      <Label className="header-child sm-10">
                        Bank IFSC Code <span className="mandatory">*</span> :
                      </Label>
                      <Input
                        className="form-control d-block from control-md"
                        bsSize="sm"
                        name="ifsc_code"
                        type="text"
                        placeholder="Enter IFSC Code"
                        onChange={validation.handleChange}
                        value={validation.values.ifsc_code}
                        invalid={
                          validation.touched.ifsc_code &&
                          validation.errors.ifsc_code
                          ? true
                          : false
                        }
                      />
                      { validation.touched.ifsc_code &&
                      validation.errors.ifsc_code ? (
                        <FormFeedback type = "invalid">
                          {validation.errors.ifsc_code}
                        </FormFeedback>
                      ):null}
                    </div>
                  </Col>
                  <Col lg={4} md={6} sm={6}>
                    <div className="m-2 mb-2">
                      <Label className="header-child sm-10">
                        Bank Name <span className="mandatory">*</span> :
                      </Label>
                      <Input
                        className="form-control d-block from control-md"
                        bsSize="sm"
                        name="bank_name"
                        type="text"
                        placeholder="Enter Bank Name"
                        onChange={validation.handleChange}
                        value={validation.values.bank_name}
                        invalid={
                          validation.touched.bank_name &&
                          validation.errors.bank_name 
                          ? true
                          : false
                        }
                      />
                      {validation.touched.bank_name &&
                      validation.errors.bank_name ?(
                        <FormFeedback type="invalid">
                          {validation.errors.bank_name}
                        </FormFeedback>
                      ):null}
                    </div>
                  </Col>
                  <Col lg={4} md={6} sm={6}>
                    <div className="m-2 mb-2">
                      <Label className="header-child sm-10">
                        Bank Branch <span className="mandatory">*</span> :
                      </Label>
                      <Input
                        className="form-control d-block from control-md"
                        bsSize="sm"
                        name="bank_branch"
                        type="text"
                        placeholder=" Enter Bank Branch"
                        onChange={validation.handleChange}
                        value={validation.values.bank_branch}
                        invalid={
                          validation.touched.bank_branch &&
                          validation.errors.bank_branch 
                          ? true
                          : false
                        }
                      />
                      {validation.touched.bank_branch && 
                      validation.errors.bank_branch ?(
                        <FormFeedback type="invalid">
                          {validation.errors.bank_branch}
                        </FormFeedback>
                      ):null}
                    </div>
                  </Col>

                  <Col lg={4} md={6} sm={6}>
                    <div className="m-2 mb-2">
                      <Label className="header-child">
                        State<span className="mandatory">*</span>
                      </Label>
                      <NSearchInput
                        data_list={state_list_s}
                        // setdata_list={setstate_list_s}
                        data_item_s={state}
                        set_data_item_s={setstate}
                        set_id={setstate_id}
                        page={state_page}
                        setpage={setstate_page}
                        error_message={"State is required"}
                        error_s={state_error}
                        search_item={state_search_item}
                        setsearch_item={setstate_search_item}
                      />
                      {/* <div className="mt-1 error-text" color="danger">
                        {state_error ? "Please Select Any State" : null}
                      </div> */}
                    </div>
                  </Col>
                  <Col lg={4} md={6} sm={6}>
                    <div className="m-2 mb-2">
                      <Label className="header-child">
                        City<span className="mandatory">*</span>
                      </Label>
                      <NSearchInput
                        data_list={city_list_s}
                        setdata_list={setcity_list_s}
                        data_item_s={city}
                        set_data_item_s={setcity}
                        set_id={setcity_id}
                        page={city_page}
                        setpage={setcity_page}
                        error_message={"City is required"}
                        error_s={city_error}
                        search_item={city_search_item}
                        setsearch_item={setcity_search_item}
                      />
                      {/* <div className="mt-1 error-text" color="danger">
                        {city_error ? "Please Select Any City" : null}
                      </div> */}
                    </div>
                  </Col>

                  <Col lg={4} md={6} sm={6}>
                    <div className="m-2 mb-2">
                      <Label className="header-child">
                        Pincode<span className="mandatory">*</span>
                      </Label>
                      <NSearchInput
                        data_list={pincode_list}
                        setdata_list={setpincode_list}
                        data_item_s={pincode}
                        set_data_item_s={setpincode}
                        set_id={setpincode_id}
                        page={pincode_page}
                        setpage={setpincode_page}
                        error_message={" PinCode is required"}
                        error_s={pincode_error}
                        search_item={pincode_search_item}
                        setsearch_item={setpincode_search_item}
                      />
                      {/* <div className="mt-1 error-text" color="danger">
                        {pincode_error ? "Please Select Any City" : null}
                      </div> */}
                    </div>
                  </Col>

                  <Col lg={4} md={6} sm={6}>
                    <div className="m-2 mb-2">
                      <Label className="header-child sm-10">
                        Email ID <span className="mandatory">*</span> :
                      </Label>
                      <Input
                        className="form-control d-block from control-md"
                        bsSize="sm"
                        name="email"
                        type="email"
                        placeholder=" Enter Email ID"
                        onChange={validation.handleChange}
                        value={validation.values.email}
                        invalid={
                          validation.touched.email &&
                            validation.errors.email
                            ? true
                            : false
                        }
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
                    <div className="m-2 mb-2">
                      <Label className="header-child sm-10">
                        Mobile No. <span className="mandatory">*</span> :
                      </Label>
                      <Input
                        className="form-control d-block from control-md"
                        bsSize="sm"
                        name="mob_no"
                        type="number"
                        min={0}
                        placeholder=" Enter Mobile No."
                        onChange={validation.handleChange}
                        value={validation.values.mob_no}
                        invalid ={
                          validation.touched.mob_no &&
                          validation.errors.mob_no
                          ? true
                          :false
                        }
                      />
                      {validation.touched.mob_no &&
                      validation.errors.mob_no ?(
                        <FormFeedback type="invalid">
                          {validation.errors.mob_no}
                        </FormFeedback>
                      ) :null}
                    </div>
                  </Col>
                  <Col lg={4} md={6} sm={6}>
                    <div className="m-2 mb-2">
                      <Label className="header-child sm-10">
                        Ledger Code <span className="mandatory">*</span> :
                      </Label>
                      <Input
                        className="form-control d-block from control-md"
                        bsSize="sm"
                        name="ledger_code"
                        type="text"
                        placeholder=" Enter Ledger Code"
                        onChange={validation.handleChange}
                        value={validation.values.ledger_code}
                        invalid = {
                          validation.touched.ledger_code &&
                          validation.errors.ledger_code 
                          ? true
                          : false
                        }
                      />
                      {validation.touched.ledger_code &&
                      validation.errors.ledger_code ?(
                    <FormFeedback type = "invalid">
                      {validation.errors.ledger_code}
                    </FormFeedback>):null}
                    </div>
                  </Col>
                  <Col lg={4} md={6} sm={6}>
                    <div className="m-2 mb-2">
                      <Label className="header-child sm-10">
                        Remarks<span className="mandatory">*</span>:
                      </Label>
                      <Input
                        className="form-control d-block from control-md"
                        bsSize="sm"
                        name="remarks"
                        type="text"
                        placeholder=" Enter Remarks"
                        onChange={validation.handleChange}
                        value={validation.values.remarks}
                        invalid ={
                          validation.touched.remarks &&
                          validation.errors.remarks 
                          ?true
                          :false
                        }
                      />
                      {validation.touched.remarks &&
                      validation.errors.remarks ?(
                        <FormFeedback type = "invalid">
                          {validation.errors.remarks}
                        </FormFeedback>
                      ):null}
                    </div>
                  </Col>
                </Row>
              </CardBody>
            ) : null}
          </Card>
        </div>

        {/*Button */}
        <div className="m-4">
          <Col lg={12}>
            <div className="mb-1 footer_btn">
            <Button type="submit" className="btn btn-success m-1 cu_btn">
                  {is_updating ? "Update" : "Save"}
                </Button>

              {/* <button
                type="submit"
                className="btn btn-success"
                style={{ marginRight: "15px", width: "77px" }}
              >
                <BsSave /> Save
              </button> */}

              <button
                type="button"
                className="btn btn-danger m-1 cu_btn"
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
export default AddFundMaster;
