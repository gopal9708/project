import React, { useState, useLayoutEffect } from "react";
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
import {
  setAlertType,
  setDataExist,
  setShowAlert,
} from "../../../store/alert/Alert";
import { ServerAddress } from "../../../constants/ServerAddress";
import { setToggle } from "../../../store/pagination/Pagination";
import { useLocation, useNavigate } from "react-router-dom";
import SearchInput from "../../../components/formComponent/searchInput/SearchInput";

const AddAdvance = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const location = useLocation();

  const accessToken = useSelector((state) => state.authentication.access_token);
  const data_len = useSelector((state) => state.pagination.data_length);
  const page_num = useSelector((state) => state.pagination.page_number);
  const search = useSelector((state) => state.searchbar.search_item);
  const [refresh, setrefresh] = useState(false);


  // Paid Through
  const [paidthrough_list, setpaidthrough_list] = useState(
    ["Cash-Petty cash", "Cash-Undeposited Funds",
      "Other Currently Liability-TDS Payable", 
      "Credit Card", "Debit Card", "Paytm", "PhonePe", "GooglePay"]);
  const [paidthrough_name, setpaidthrough_name] = useState("");
  const [paidthrough_id, setpaidthrough_id] = useState("");
  const [paidthrough_n_page, setpaidthrough_n_page] = useState(1);
  const [search_paidthrough_name, setsearch_paidthrough_name] = useState("");
  const [paidthrough_error, setpaidthrough_error] = useState(false);

  // Apply To Trip
  const [trip_name_list, settrip_name_list] = useState(["Trip1", "Trip2", "Trip3", "Trip4", "Trip5", "Trip6", "Trip7", "Trip8"]);
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
      is_updating ? update_advance(values) : add_advance(values);
    },
  });

  //   Api For Posting Data
  const add_advance = (values) => {
    alert("add_advance called--------------------")
    axios
      .post(
        ServerAddress + "finance/add_advance/",
        {
          amount: values.amount,
          date: values.date,
          paid_through: paidthrough_name,
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
        console.log("add_advance RESPONSE==", response.data);
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
  const update_advance = (values) => {
    alert("update_vehicle HISTORY called-----------");
    let fields_names = Object.entries({
      amount: values.amount,
      date: values.date,
      paid_through: paidthrough_name,
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
          ServerAddress + "finance/update_advance/" + advance_id,
          {
            change_fields: change_fields,
            amount: values.amount,
            date: values.date,
            paid_through: paidthrough_name,
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
          console.log("update_advance response", response.data)
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
      setpaidthrough_name(advance_loc.paid_through);
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
          <PageTitle page={is_updating ? "Update Advance" : "Add Advance"} />
          <Title
            title={is_updating ? "Update Advance" : "Add Advance"}
            parent_title="Finance"
          />
        </div>

        <Col lg={12}>
          <Card className="shadow bg-white rounded">
            <CardTitle className="mb-1 header">
              <div className="header-text-icon header-text">
                Advance Info..
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
                        Date*
                      </Label>
                      <Input
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.date || ""}
                        invalid={
                          validation.touched.date &&
                            validation.errors.date
                            ? true
                            : false
                        }
                        type="date"
                        name="date"
                        className="form-control-md "
                        id="date"
                        placeholder="Select the Date"
                      />
                      {validation.touched.date &&
                        validation.errors.date ? (
                        <FormFeedback type="invalid">
                          {validation.errors.date}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>


                  <Col lg={4} md={4} sm={4}>
                    <div className="mb-3">
                      <Label className="header-child">
                        Paid Through
                      </Label>
                      <SearchInput
                        data_list={paidthrough_list}
                        setdata_list={setpaidthrough_list}
                        data_item_s={paidthrough_name}
                        set_data_item_s={setpaidthrough_name}
                        set_id={setpaidthrough_id}
                        page={paidthrough_n_page}
                        setpage={setpaidthrough_n_page}
                        search_item={search_paidthrough_name}
                        setsearch_item={setsearch_paidthrough_name}
                        error_message={"Please Select Any"}
                        error_s={paidthrough_error}
                      />
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

                  <Col lg={4} md={6} sm={6}>
                    <div className="mb-2">
                      <Label className="header-child">
                        Notes
                      </Label>
                      <Input
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.notes || ""}
                        invalid={
                          validation.touched.notes &&
                            validation.errors.notes
                            ? true
                            : false
                        }
                        type="text"
                        name="notes"
                        className="form-control-md "
                        id="input"
                        placeholder="Enter the notes"
                      />
                      {validation.touched.notes &&
                        validation.errors.notes ? (
                        <FormFeedback type="invalid">
                          {validation.errors.notes}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>

                  <Col lg={4} md={6} sm={6}>
                    <div className="mb-3">
                      <Label className="header-child">Apply To Trip*</Label>
                      <SearchInput
                        data_list={trip_name_list}
                        setdata_list={settrip_name_list}
                        data_item_s={trip_name}
                        set_data_item_s={settrip_name}
                        set_id={settrip_name_id}
                        page={trip_name_page}
                        setpage={settrip_name_page}
                        error_message={"Please Select Trip Name"}
                        error_s={trip_name_error}
                        setsearch_item={settrip_name_search_item}
                      />
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

export default AddAdvance;
