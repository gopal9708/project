import React, { useState, useEffect, useLayoutEffect } from "react";
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
  Button,
} from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import PageTitle from "../../../components/pageTitle/PageTitle";
import Title from "../../../components/title/Title";
import { useDispatch, useSelector } from "react-redux";
import { IconContext } from "react-icons";
import { MdAddCircleOutline, MdRemoveCircleOutline } from "react-icons/md";
import axios from "axios";
import NSearchInput from "../../../components/formComponent/nsearchInput/NSearchInput";
import {
  setAlertType,
  setDataExist,
  setShowAlert,
} from "../../../store/alert/Alert";
import { ServerAddress } from "../../../constants/ServerAddress";
import { setToggle } from "../../../store/pagination/Pagination";
import toTitleCase from "../../../lib/titleCase/TitleCase";
import { useLocation, useNavigate } from "react-router-dom";
import SearchInput from "../../../components/formComponent/searchInput/SearchInput";
import TransferList from "../../../components/formComponent/transferList/TransferList";
import ImgModal from "../../../components/crop/ImgModal";

const AddExpense = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const location = useLocation();

  const accessToken = useSelector((state) => state.authentication.access_token);
  const data_len = useSelector((state) => state.pagination.data_length);
  const page_num = useSelector((state) => state.pagination.page_number);
  const search = useSelector((state) => state.searchbar.search_item);
  const [refresh, setrefresh] = useState(false);


  // Report
  const [report_list, setreport_list] = useState(
    ["Report 1", "Report 2", "Report 3", "Report 4", "Report 5", "Report 6"]);
  const [report_name, setreport_name] = useState("");
  const [report_id, setreport_id] = useState("");
  const [report_n_page, setreport_n_page] = useState(1);
  const [search_report_name, setsearch_report_name] = useState("");
  const [report_error, setreport_error] = useState(false);

  // Merchant
  const [merchant_list, setmerchant_list] = useState(
    ["Merchant 1", "Merchant 2", "Merchant 3"]);
  const [merchant_name, setmerchant_name] = useState("");
  const [merchant_id, setmerchant_id] = useState("");
  const [merchant_n_page, setmerchant_n_page] = useState(1);
  const [search_merchant_name, setsearch_merchant_name] = useState("");
  const [merchant_error, setmerchant_error] = useState(false);

  // Category
  const [category_list, setcategory_list] = useState(
    ["Air Travel Expense", "Auto Mobile Expense", "Construction Loan",
    "Fuel/Mileage Expense", "IT and Internet Expense", " Job Costing",
     "Labor", "Lodging", "Materials"]);
  const [category_name, setcategory_name] = useState("");
  const [category_id, setcategory_id] = useState("");
  const [category_n_page, setcategory_n_page] = useState(1);
  const [search_category_name, setsearch_category_name] = useState("");
  const [category_error, setcategory_error] = useState(false);

  // Apply To Trip
  const [trip_name_list, settrip_name_list] = useState(["Trip1", "Trip2"]);
  const [trip_name, settrip_name] = useState("");
  const [trip_name_id, settrip_name_id] = useState("");
  const [trip_name_page, settrip_name_page] = useState(1);
  const [trip_name_error, settrip_name_error] = useState(false);
  const [trip_name_search_item, settrip_name_search_item] = useState("");

  // for update
  const [is_updating, setis_updating] = useState(false);
  const [advance_up, setadvance_up] = useState("");
  const [advance_id, setadvance_id] = useState("");
  const [dateAt, setdateAt] = useState("");


  const [circle_btn, setcircle_btn] = useState(true);
  const toggle_circle = () => {
    setcircle_btn(!circle_btn);
  };


  //  ----------------------validation-----------------------------------
  const validation = useFormik({
    enableReinitialize: true,


    initialValues: {
      // This should be in small letter or smallcase
      amount: advance_up.amount || "",
      date: dateAt || "",
      reference: advance_up.reference || "",
      notes: advance_up.notes || "",
    },

    validationSchema: Yup.object({
      amount: Yup.number().required("Amount is required"),
      date: Yup.date().required("Date is required"),
      reference: Yup.string().required("Reference is required"),
      notes: Yup.string().required("Notes is required"),
    }),

    onSubmit: (values) => {
      is_updating ? update_expense(values) : add_expense(values);
    },
  });

  //   Api For Posting Data
  const add_expense = (values) => {
    alert("add_expense called--------------------")
    axios
      .post(
        ServerAddress + "finance/add_expense/",
        {
          report: report_name,
          expense_date: values.expense_date,
          merchant: merchant_name,
          category: category_name,
          amount: values.amount,
          claim: values.claim_reimbursement,
          description: values.description,
          reference: values.reference,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (response) {
        console.log("add_expense RESPONSE==", response.data);
        if (response.data.status === "success") {
          dispatch(setToggle(true));
          dispatch(setShowAlert(true));
          dispatch(setDataExist(`Advance Detail, Reference# "${(values.reference)}" Added Successfully.`));
          dispatch(setAlertType("success"));
          navigate(-1);
        }
        else if (response.data === "duplicate") {
          dispatch(setShowAlert(true));
          dispatch(setDataExist(`Advance Detail, Reference# "${(values.reference)}" Already Exists.`));
          dispatch(setAlertType("warning"));
        }
      })
      .catch((error) => {
        alert(`Error Happen while posting Advance Data ${error}`);
      });
  };


  // Api for Update data
  const update_expense = (values) => {
    alert("update_expense HISTORY called-----------");
    let fields_names = Object.entries({
      amount: values.amount,
      date: values.date,
      merchant: merchant_name,
      reference: values.reference,
      notes: values.notes,
      trip_name: trip_name,
    });
    let change_fields = {};
    console.log("fields_names========", fields_names)
    var prom = new Promise((resolve, reject) => {
      for (let j = 0; j < fields_names.length; j++) {
        const ele = fields_names[j];
        let prev = location.state[`${ele[0]}`];
        let new_v = ele[1];
        if (String(prev).toUpperCase() !== String(new_v).toUpperCase()) {
          change_fields[`${ele[0]}`] = new_v.toString().toUpperCase();
        }
        if (j === fields_names.length - 1) resolve();
      }
    });
    prom.then(() => {
      alert("UPDATE Advance CALLED------");
      axios
        .put(
          ServerAddress + "finance/update_expense/" + advance_id,
          {
            change_fields: change_fields,
            amount: values.amount,
            date: values.date,
            merchant_name: merchant_name,
            reference: values.reference,
            notes: values.notes,
            trip_name: trip_name,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then(function (response) {
          console.log("update_expense response", response.data)
          if (response.data.status === "success") {
            dispatch(setToggle(true));
            dispatch(setShowAlert(true));
            dispatch(setDataExist(`Reference# "${(values.reference)}" Updated sucessfully`));
            dispatch(setAlertType("success"));
            navigate(-1);
          } else if (response.data === "duplicate") {
            dispatch(setShowAlert(true));
            dispatch(setDataExist(`Reference# "${(values.reference)}" already exists`));
            dispatch(setAlertType("warning"));
          }
        })
        .catch(function () {
          alert("Error Error While Updateing Advance");
        });
    });
  };

  useLayoutEffect(() => {
    try {
      let advance_loc = location.state.data;
      // console.log("LOCATION DATA is==", advance_loc);

      setadvance_up(advance_loc);
      setadvance_id(advance_loc.id);
      setmerchant_name(advance_loc.merchant);
      settrip_name(advance_loc.trip_name);
      setdateAt(advance_loc.date.split("T")[0]);

      setis_updating(true);
    } catch (error) { }
  }, []);


  // useEffect(() => {
  //   if (branch_list2?.length > 0) {
  //     setbranch_err(false);
  //   }
  //   if (vehicle_owner_s !== "") {
  //     setvehicle_owner_error(false);
  //   }
  //   if (vehicle_owner_s === "PARTNER VEHICLE" && vendor_name !== "") {
  //     setvendor_error(false);
  //   }
  //   if (vehicle_no !== "") {
  //     setvehicle_number_error(false);
  //   }
  //   if (trip_name !== "") {
  //     settrip_name_error(false);
  //   }
  //   if (vehicle_img !== "") {
  //     setvehicle_img_error(false)
  //   }
  //   if (vehicle_no !== "" && vehicle_no.length !== 10) {
  //     setvehicle_len_error(true);
  //   } else {
  //     setvehicle_len_error(false);
  //   }
  // }, [vehicle_type_s, vehicle_no, trip_name, vehicle_img, branch_list2, vehicle_owner_s]);


  return (
    <div>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          validation.handleSubmit(e.values);
          return false;
        }}
      >
        {/* Commodity */}
        <div className="mt-3">
          <PageTitle page={is_updating ? "Update Expense" : "Add Expense"} />
          <Title
            title={is_updating ? "Update Expense" : "Add Expense"}
            parent_title="Finance"
          />
        </div>

        <Col lg={12}>
          <Card className="shadow bg-white rounded">
            <CardTitle className="mb-1 header">
              <div className="header-text-icon header-text">
                Expense Info..
                {/* <div>Vehicle Info..</div> */}
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
                        Report
                      </Label>
                      <SearchInput
                        data_list={report_list}
                        setdata_list={setreport_list}
                        data_item_s={report_name}
                        set_data_item_s={setreport_name}
                        set_id={setreport_id}
                        page={report_n_page}
                        setpage={setreport_n_page}
                        search_item={search_report_name}
                        setsearch_item={setsearch_report_name}
                        error_message={"Please Select"}
                        error_s={report_error}
                      />
                    </div>
                  </Col>

                  <Col lg={4} md={6} sm={6}>
                    <div className="mb-2">
                      <Label className="header-child">
                        Expense Date*
                      </Label>
                      <Input
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.expense_date || ""}
                        invalid={
                          validation.touched.expense_date &&
                            validation.errors.expense_date
                            ? true
                            : false
                        }
                        type="date"
                        name="expense_date"
                        className="form-control-md "
                        id="date"
                        placeholder="Select the Expense Date"
                      />
                      {validation.touched.expense_date &&
                        validation.errors.expense_date ? (
                        <FormFeedback type="invalid">
                          {validation.errors.expense_date}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>


                  <Col lg={4} md={4} sm={4}>
                    <div className="mb-3">
                      <Label className="header-child">
                        Merchant
                      </Label>
                      <SearchInput
                        data_list={merchant_list}
                        setdata_list={setmerchant_list}
                        data_item_s={merchant_name}
                        set_data_item_s={setmerchant_name}
                        set_id={setmerchant_id}
                        page={merchant_n_page}
                        setpage={setmerchant_n_page}
                        search_item={search_merchant_name}
                        setsearch_item={setsearch_merchant_name}
                        error_message={"Please Select or Type or Add"}
                        error_s={merchant_error}
                      />
                    </div>
                  </Col>


                  <Col lg={4} md={6} sm={6}>
                    <div className="mb-3">
                      <Label className="header-child">
                        Category*
                      </Label>
                      <SearchInput
                        data_list={category_list}
                        setdata_list={setcategory_list}
                        data_item_s={category_name}
                        set_data_item_s={setcategory_name}
                        set_id={setcategory_id}
                        page={category_n_page}
                        setpage={setcategory_n_page}
                        search_item={search_category_name}
                        setsearch_item={setsearch_category_name}
                        error_message={"Please Select or Type or Add"}
                        error_s={category_error}
                      />
                    </div>
                  </Col>

                  <Col lg={4} md={6} sm={6}>
                    <div className="mb-2">
                      <Label className="header-child">
                        Amount*
                      </Label>
                      <Input
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.amount || ""}
                        invalid={
                          validation.touched.amount &&
                            validation.errors.amount
                            ? true
                            : false
                        }
                        type="number"
                        name="amount"
                        className="form-control-md "
                        id="input"
                        placeholder="Enter the amount"
                      />
                      {validation.touched.amount &&
                        validation.errors.amount ? (
                        <FormFeedback type="invalid">
                          {validation.errors.amount}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>

                  <Col lg={4} md={6} sm={6}>
                    <div className="mb-2">
                      <Label className="header-child">
                        Claim Reimbursement ?
                      </Label>
                      <Input
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.claim_reimbursement || ""}
                        invalid={
                          validation.touched.claim_reimbursement &&
                            validation.errors.claim_reimbursement
                            ? true
                            : false
                        }
                        type="text"
                        name="claim_reimbursement"
                        className="form-control-md "
                        id="input"
                        placeholder="Enter the claim_reimbursement"
                      />
                      {validation.touched.claim_reimbursement &&
                        validation.errors.claim_reimbursement ? (
                        <FormFeedback type="invalid">
                          {validation.errors.claim_reimbursement}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>

                  <Col lg={4} md={6} sm={6}>
                    <div className="mb-2">
                      <Label className="header-child">
                        Description
                      </Label>
                      <Input
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.description || ""}
                        invalid={
                          validation.touched.description &&
                            validation.errors.description
                            ? true
                            : false
                        }
                        type="text"
                        name="description"
                        className="form-control-md "
                        id="input"
                        placeholder="Enter the description"
                      />
                      {validation.touched.description &&
                        validation.errors.description ? (
                        <FormFeedback type="invalid">
                          {validation.errors.description}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>

                  <Col lg={4} md={6} sm={6}>
                    <div className="mb-2">
                      <Label className="header-child">
                        Reference#
                      </Label>
                      <Input
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.reference || ""}
                        invalid={
                          validation.touched.reference &&
                            validation.errors.reference
                            ? true
                            : false
                        }
                        type="number"
                        name="reference"
                        className="form-control-md "
                        id="input"
                        placeholder="Enter the reference"
                      />
                      {validation.touched.reference &&
                        validation.errors.reference ? (
                        <FormFeedback type="invalid">
                          {validation.errors.reference}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>

                  

                </Row>
              </CardBody>
            ) : null}
          </Card>
        </Col>


        {/*  Button Footer */}
        {/*Button */}
        <div className="m-3">
          <Col lg={12}>
            <div className="mb-1 footer_btn">
              <Button
                className="btn btn-info m-1 cu_btn"
                type="submit">
                Save
              </Button>

              <Button
                className="btn btn-info m-1 cu_btn"
                type="button"
                onClick={() => navigate(-1)}
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

export default AddExpense;
