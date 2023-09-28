import React, { useState, useEffect, useLayoutEffect } from "react";
import "../../../assets/scss/forms/form.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IconContext } from "react-icons";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { MdAddCircleOutline, MdRemoveCircleOutline } from "react-icons/md";
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
import { ServerAddress } from "../../../constants/ServerAddress";
import toTitleCase from "../../../lib/titleCase/TitleCase";
import { setToggle } from "../../../store/parentFilter/ParentFilter";
import {
  setAlertType,
  setDataExist,
  setShowAlert,
} from "../../../store/alert/Alert";
import NSearchInput from "../../../components/formComponent/nsearchInput/NSearchInput";
import { Button } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';

const AddCharge = () => {
  const user_id = useSelector((state) => state.authentication.userdetails.id);
  const user = useSelector((state) => state.authentication.userdetails);
  const [charge, setcharge] = useState([]);
  const [charge_category, setcharge_category] = useState("");
  const [charge_category_list] = useState([
    "Associated Charge",
    "Percentage Charge",
  ]);
  const [charge_category_error, setcharge_category_error] = useState(false);

  const accessToken = useSelector((state) => state.authentication.access_token);
  const [isupdating, setisupdating] = useState(false);
  const location_data = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [circle_btn, setcircle_btn] = useState(true);

  const toggle_circle = () => {
    setcircle_btn(!circle_btn);
  };

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      charge_name: toTitleCase(charge.charge_name) || "",
    },

    validationSchema: Yup.object({
      charge_name: Yup.string().required("Charge Name is required"),
    }),

    onSubmit: (values) => {
      isupdating ? updateCharge(values) : addCharge(values);
    },
  });

  // const addCharge = (values) => {
  //   axios
  //     .post(
  //       ServerAddress + "master/add_charge/",
  //       {
  //         charge_category: charge_category.toUpperCase(),
  //         charge_name: toTitleCase(values.charge_name).toUpperCase(),
  //         created_by: user_id,
  //         //For C&M
  //         cm_current_department: user.user_department,
  //         cm_current_status: (user.user_department_name === "ADMIN") ? 'NOT APPROVED' : (current_status).toUpperCase(),
  //         cm_transit_status: (user.user_department_name === "ADMIN") ? 'NOT APPROVED' : (current_status).toUpperCase(),
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       }
  //     )
  //     .then(function (resp) {
  //       if (resp.data.status === "success") {
  //         dispatch(setToggle(true));
  //         dispatch(setShowAlert(true));
  //         dispatch(
  //           setDataExist(
  //             `Charge "${toTitleCase(values.charge_name)}" Added sucessfully`
  //           )
  //         );
  //         dispatch(setAlertType("success"));
  //         navigate("/master/charges");
  //       } else if (resp.data == "duplicate") {
  //         dispatch(setShowAlert(true));
  //         dispatch(
  //           setDataExist(
  //             `Charge Name "${toTitleCase(values.charge_name)}" already exists`
  //           )
  //         );
  //         dispatch(setAlertType("warning"));
  //       }
  //     })
  //     .catch((error) => {
  //       alert(`Error Happen while posting Coloder  Data ${error}`);
  //     });
  // };


  const addCharge = async (values) => {
    try {
      const resp = await axios.post(
        ServerAddress + "master/add_charge/",
        {
          charge_category: charge_category.toUpperCase(),
          charge_name: toTitleCase(values.charge_name).toUpperCase(),
          created_by: user_id,
          //For C&M
          cm_current_department: user.user_department,
          cm_current_status: (user.user_department_name === "ADMIN") ? 'NOT APPROVED' : (current_status).toUpperCase(),
          cm_transit_status: (user.user_department_name === "ADMIN") ? 'NOT APPROVED' : (current_status).toUpperCase(),
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (resp.data.status === "success") {
        dispatch(setToggle(true));
        dispatch(setShowAlert(true));
        dispatch(
          setDataExist(
            `Charge "${toTitleCase(values.charge_name)}" Added sucessfully`
          )
        );
        dispatch(setAlertType("success"));
        navigate("/master/charges");
      } else if (resp.data === "duplicate") {
        dispatch(setShowAlert(true));
        dispatch(
          setDataExist(
            `Charge Name "${toTitleCase(values.charge_name)}" already exists`
          )
        );
        dispatch(setAlertType("warning"));
      }
    } catch (error) {
      alert(`Error Happen while posting Coloder  Data ${error}`);
    }
  };

  // const updateCharge = (values) => {
  //   let id = charge.id;
  //   let fields_names = Object.entries({
  //     charge_category: charge_category,
  //     charge_name: values.charge_name,
  //   });

  //   let change_fields = {};
  //   var prom = new Promise((resolve, reject) => {
  //     for (let j = 0; j < fields_names.length; j++) {
  //       const ele = fields_names[j];
  //       let prev = location_data.state.charge[`${ele[0]}`];
  //       let new_v = ele[1];

  //       if (prev !== new_v.toUpperCase()) {
  //         change_fields[`${ele[0]}`] = new_v.toUpperCase();
  //       }
  //       if (j === fields_names.length - 1) resolve();
  //     }
  //   });

  //   prom.then(() => {
  //     axios
  //       .put(
  //         ServerAddress + "master/update_charge/" + charge.id,
  //         {
  //           charge_category: charge_category.toUpperCase(),
  //           charge_name: toTitleCase(values.charge_name).toUpperCase(),
  //           change_fields: change_fields,
  //           modified_by: user_id,
  //           //For C&M
  //           cm_transit_status: status_toggle === true ? current_status : "",
  //           cm_current_status: (current_status).toUpperCase(),
  //           cm_remarks: ""
  //         },

  //         {
  //           headers: {
  //             Authorization: `Bearer ${accessToken}`,
  //           },
  //         }
  //       )
  //       .then(function (response) {
  //         if (response.data.status === "success") {
  //           dispatch(setToggle(true));
  //           dispatch(setShowAlert(true));
  //           dispatch(
  //             setDataExist(`Charge "${values.charge_name}" Updated sucessfully`)
  //           );
  //           dispatch(setAlertType("info"));
  //           navigate("/master/charges");

  //         } else if (response.data == "duplicate") {
  //           dispatch(setShowAlert(true));
  //           dispatch(
  //             setDataExist(
  //               `Charge Name "${toTitleCase(
  //                 values.charge_name
  //               )}" already exists`
  //             )
  //           );
  //           dispatch(setAlertType("warning"));
  //         }

  //       })
  //       .catch(function (err) {
  //         alert(`Error While  Updateing Charge ${err}`);
  //       });

  //   });
  // };

  const updateCharge = async (values) => {
    let fields_names = Object.entries({
      charge_category: charge_category,
      charge_name: values.charge_name,
    });
    let change_fields = {};
    for (let j = 0; j < fields_names.length; j++) {
      const ele = fields_names[j];
      let prev = charge[`${ele[0]}`];
      let new_v = ele[1];

      if (prev !== new_v.toUpperCase()) {
        change_fields[`${ele[0]}`] = new_v.toUpperCase();
      }
    }

    try {
      const response = await axios.put(
        ServerAddress + "master/update_charge/" + charge.id,
        {
          charge_category: charge_category.toUpperCase(),
          charge_name: toTitleCase(values.charge_name).toUpperCase(),
          change_fields: change_fields,
          modified_by: user_id,
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
          setDataExist(`Charge "${values.charge_name}" Updated sucessfully`)
        );
        dispatch(setAlertType("info"));
        navigate("/master/charges");
      } else if (response.data === "duplicate") {
        dispatch(setShowAlert(true));
        dispatch(
          setDataExist(
            `Charge Name "${toTitleCase(
              values.charge_name
            )}" already exists`
          )
        );
        dispatch(setAlertType("warning"));
      }
    } catch (error) {
      alert(`Error While  Updateing Charge ${error}`);
    }
  };


  useLayoutEffect(() => {
    try {
      let charge_u = location_data.state.charge;
      setisupdating(true);
      setcharge(charge_u);
      setcharge_category(toTitleCase(charge_u.charge_category));
    } catch (error) { }
  }, []);

  //For Checker Maker
  const userpermission = useSelector(
    (state) => state.authentication.userpermission
  );
  const [can_update, setcan_update] = useState(false);

  useEffect(() => {
    if (
      userpermission.some((e) => e.sub_model === "Charges" && e.update === true)
    ) {
      setcan_update(true);
    } else {
      setcan_update(false);
    }
  }, [userpermission]);

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

  const update_chargestatus = (id) => {

    axios
      .put(
        ServerAddress + "master/update_charge/" + id,
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
          navigate("/master/charges");
        }
      })
      .catch(function (err) {
        alert(`rror While  Updateing Coloader ${err}`);
      });
  };

  const handleSubmit = () => {
    if (message === "") {
      setmessage_error(true);
    }
    else {
      update_chargestatus(charge.id)
      setShow(false)
    }
  }

  // Used to History
  // const handlClk = () => {
  //   navigate(
  //     "/master/charges/chargesHistory/ChargeHistoryPage",
  //     {
  //       state: { charge: charge },
  //     });
  // };

  {/* For Checker Maker */ }
  const [table_data1, settable_data1] = useState([]);
  const [table_count1, settable_count1] = useState(0);
  const [data_type1, setdata_type1] = useState(false);

  // const get_charge = (value) => {
  //   axios
  //     .get(
  //       ServerAddress +
  //       `master/all_charges/?search=${""}&p=${1}&records=${""}&charge_category=${""}&data=&value=${value}`,

  //       {
  //         headers: { Authorization: `Bearer ${accessToken}` },
  //       }
  //     )
  //     .then((response) => {
  //       console.log("com info", response.data);
  //       settable_count1(response.data.count)
  //       settable_data1(response.data.results);
  //     });
  // };

  // useLayoutEffect(() => {
  //   try {
  //     if (location_data.state.type) {
  //       console.log("location_data-----", location_data)
  //       setdata_type1(true)
  //       setcharge_category("")
  //       get_charge(location_data.state.charge);

  //     }
  //   }
  //   catch {
  //     setdata_type1(false)
  //   }
  // }, [location_data, alert]);

  // const set_form_data1 = (item) => {
  //   setcharge(item);
  //   setcharge_category(toTitleCase(item.charge_category));
  //   // setcharge_type_id(item.id); 
  // }

  return (
    <div style={{ display: data_type1 && "flex" }}>
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
      {/* For Checker Maker  */}
      {data_type1 &&
        <div
          style={{
            width: "15%",
            // overflowY: "scroll",
            margin: "18px 10px 5px 20px",
            zIndex: 1,
            height: "100%",
            // border:"1px solid #2CA67A"
            border: "1px solid #2A3042",
            borderRadius: "5px"
          }}
          className="custom-scrollbars__content"
        >
          <div style={{ background: "#f4bc61", margin: "3px", padding: "3px", borderRadius: "5px", textAlign: "center", cursor: "pointer" }} onClick={() => {
            if (typeof (charge) === "object") {
              // handlClk();
            }
          }}>History</div>
          <div style={{ background: "#E6F1FF", margin: "3px", padding: "3px", borderRadius: "5px", textAlign: "center" }}>
            Total {location_data.state.charge === "P" ? "Pending" : location_data.state.charge === "A" ? "Approved" : "Rejected"} - {table_count1}
          </div>
          <table className="table-grid">
            <thead>
              <tr style={{ lineHeight: 2, blocalWidth: 1 }}>
                <th
                  style={{
                    width: "8rem",
                    textAlign: "center",
                    paddingLeft: "4px",
                    paddingRight: "4px",
                    border: "1px solid #E6E9EC"
                  }}
                  rowSpan={2}
                >
                  Charge Name
                </th>
              </tr>
            </thead>

            <tbody>
              {table_data1.length === 0 ? (
                <tr>
                  <td>No Data Found</td>
                </tr>
              ) : (
                table_data1.map((item, index) => {
                  return (
                    <tr key={index} style={{ border: "1px solid red" }}>
                      <td>
                        {(can_update && item.cm_current_status !== "APPROVED") || user.is_superuser ?
                          <span
                            style={{ cursor: "pointer", color: "blue", fontSize: "11px" }}
                            onClick={() => {
                              // set_form_data1(item);
                              // setselected_docket(true);
                            }}
                          >
                            {toTitleCase(item.charge_name)}
                          </span>
                          :
                          <span style={{ fontSize: "11px" }}>
                            {toTitleCase(item.charge_name)}
                          </span>
                        }
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

      }
      {/* For Checker Maker */}
      <div style={{
        width: data_type1 && "85%",
        margin: "2px",
        zIndex: 1,
        height: "100%",
      }}>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            if (charge_category === "") {
              setcharge_category_error(true);
            }
            validation.handleSubmit(e.values);
            return false;
          }}
        >
          {/* Coloader */}
          <div className="m-4">
            {isupdating &&
              <div style={{ justifyContent: "right", display: "flex" }}>
                <Button
                  type="button"
                  onClick={() => {
                    // handlClk();
                  }}
                >
                  History
                </Button>
              </div>
            }
            <div className=" mb-2 main-header">
              {isupdating ? "Update Charges" : "Add Charges"}{" "}
            </div>
            <Col lg={12}>

              <Card className="shadow bg-white rounded">
                <CardTitle className="mb-1 header">
                  <div className="header-text-icon header-text">
                    <div>Charges Details</div>

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
                          <Label className="header-child">Charge Category*</Label>
                          <NSearchInput
                            data_list={charge_category_list}
                            data_item_s={charge_category}
                            set_data_item_s={setcharge_category}
                            show_search={false}
                            error_s={charge_category_error}
                            error_message={"Please Select Charge Category"}
                          // disable_me={true}
                          />
                        </div>
                      </Col>

                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-3">
                          <Label className="header-child">Charge Name*</Label>
                          <Input
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.charge_name || ""}
                            invalid={
                              validation.touched.charge_name &&
                                validation.errors.charge_name
                                ? true
                                : false
                            }
                            type="text"
                            name="charge_name"
                            className="form-control-md"
                            id="input"
                            placeholder="Enter Charge Name"
                          />
                          {validation.touched.charge_name &&
                            validation.errors.charge_name ? (
                            <FormFeedback type="invalid">
                              {validation.errors.charge_name}
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

          {/*Button */}
          <div className=" m-4">
            <Col lg={12}>
              <div className="mb-1 footer_btn">
                <button
                  type="submit"
                  className={isupdating && (user.user_department_name === "ADMIN") ? "btn btn-info m-1" : !isupdating ? "btn btn-info m-1" : "btn btn-success m-1"}
                >
                  {isupdating && (user.user_department_name === "ADMIN" || user.is_superuser) ? "Update" : !isupdating ? "Save" : "Approved"}
                </button>

                {isupdating && (user.user_department_name !== "ADMIN" && !user.is_superuser) &&
                  <button
                    type="button"
                    className="btn btn-danger m-1"
                    onClick={handleShow}
                  >
                    Rejected
                  </button>
                }

                <button
                  type="submit"
                  className="btn btn-info m-1"
                  onClick={() => navigate("/master/charges")}
                >
                  Cancel
                </button>
              </div>
            </Col>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddCharge;
