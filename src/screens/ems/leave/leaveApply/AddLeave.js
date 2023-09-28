import React, { useState, useEffect } from "react";
import {
  Col,
  Card,
  CardTitle,
  Form,
  CardBody,
  Row,
  Label,
  Input,
  Button,
} from "reactstrap";
import PageTitle from "../../../../components/pageTitle/PageTitle";
import Title from "../../../../components/title/Title";
import { IconContext } from "react-icons";
import { MdAddCircleOutline, MdRemoveCircleOutline } from "react-icons/md";
import { useFormik } from "formik";
import * as Yup from "yup";
import NSearchInput from "../../../../components/formComponent/nsearchInput/NSearchInput";
import { setToggle } from "../../../../store/pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ServerAddress } from "../../../../constants/ServerAddress";
import {
  setAlertType,
  setDataExist,
  setShowAlert,
} from "../../../../store/alert/Alert";
import { FiCheckSquare, FiSquare } from "react-icons/fi";

function AddLeave() {
//redux state
  const user = useSelector((state) => state.authentication.userdetails);
  const accessToken = useSelector((state) => state.authentication.access_token);
 //For Update
  const [leave_data, setleave_data] = useState("")
  const [isupdating, setisupdating] = useState(false);
 
//for leave leave_category 
const [leave_type, setleave_type] = useState("")
const [leave_type_list, setleave_type_list]=useState([
  "Annual Leave","Sick Leave","Maternity Leave","Paternity Leave"
]);
const [leave_type_error, setleave_type_error]=useState(false);
const [is_active, setis_active] = useState(true);

  const [circle_btn, setcircle_btn] = useState(true);
  const toggle_circle = () => {
    setcircle_btn(!circle_btn);
  };
  const dispatch = useDispatch();
  const location_data = useLocation();
  const navigate = useNavigate();

  const [from_date, setfrom_date] = useState("");
  const [to_date, setto_date] = useState("");
  const [date, setdate] = useState("");
  // const [remark, setremark] = useState("");
 
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      remark: leave_data.remarks || "",
    },
    validationSchema: Yup.object({
      // remark: Yup.string().required("remark   is required"),
    }),
    onSubmit: (values) => {
      isupdating ? update_leave_data(values) : send_leave_data(values);
    },
  });
  
//Post Data 
  const send_leave_data = (values) => {
    axios
      .post(
        ServerAddress + "ems/add-leave/",
        {
          user:user.id,
          // employ:,
          // leave_tracker:,
          leave_category:leave_type,
          date:date,
          from_date:from_date,
          to_date:to_date,
          is_approved: is_active,
          // is_approved_by:,
          remarks:values.remark,
          
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (response) {
        console.log(response.data);
        if (response.statusText === "Created") {
          dispatch(setToggle(true));
          dispatch(
            setDataExist(`New Leave "${leave_type}" Added Sucessfully`)
          );
          dispatch(setAlertType("success"));
          dispatch(setShowAlert(true));
          // alert("data add ho gaya ")
          navigate("/ems/leave");
        } 
        // else if (response.data === "duplicate") {
        //   dispatch(setShowAlert(true));
        //   dispatch(
        //     setDataExist(
        //       `Item Name "${toTitleCase(values.item_name)}" already exists`
        //     )
        //   );
        //   dispatch(setAlertType("warning"));
        // }
      })
      .catch((error) => {
        alert(`Error Happen while posting Braches Data ${error}`);
      });
  };
// update data 
  const update_leave_data = (values) => {
    axios
      .put(
        ServerAddress + "ems/update-leave/" + leave_data.id,
        {
          user:user.id,
          // employ:leave_data.employee,
          // leave_tracker:,
          leave_category:leave_type,
          date:date,
          from_date:from_date,
          to_date:to_date,
          is_approved: is_active,
          // is_approved_by:,
          remarks:values.remark,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        if (response.data.status === "success") {
          dispatch(setShowAlert(true));
          dispatch(setAlertType("warning"));
          dispatch(
            setDataExist(`Item ${values.item_name} Updated Successfully`)
          );
          navigate("/ems/leave");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
// set the form data at update time 
  useEffect(() => {
    try {
      let data = location_data.state.item;
      setisupdating(true);
      setleave_data(data);
      setleave_type(data.leave_category)
      setdate(data.date);
      setfrom_date(data.from_date);
      setto_date(data.to_date);
    } catch (error) {
      setisupdating(false);
    }
  }, [location_data]);

  return (
    <>
      <div>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            validation.handleSubmit(e.values);
            return false;
          }}
        >
          <div className="mt-3">
            <PageTitle page={isupdating ? "Update Leave" : "Add Leave"} />
            <Title
              title={isupdating ? "Update Leave" : "Add Leave"}
              parent_title="EMS"
            />

            {/*  LEave  details */}
            <div className="m-3">
              <Col lg={12}>
                <Card className="shadow bg-white rounded">
                  <CardTitle className="mb-1 header">
                    <div className="header-text-icon header-text">
                      Employee Leave Info :
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
                          <div  className="mb-3">
                            <Label className="header-child">
                          Leave category:<span className="mandatory">*</span>
                            </Label>
                            <NSearchInput 
                            data_list={leave_type_list}
                            data_item_s={leave_type}
                            set_data_item_s={setleave_type}
                            show_search={false}
                            error_message={"leave type is required"}
                            error_s={leave_type_error}
                            />
                          </div>
                        </Col>

                        <Col lg={4} md={6} sm={6}>
                    <div className="mb-3">
                      <Label className="header-child">
                         Date <span className="mandatory">*</span>
                      </Label>
                      <Input
                        value={date}
                        onChange={(val) => {
                          setdate(val.target.value);
                        }}
                        className="form-control d-block from control-md"
                        bsSize="sm"
                        name="date"
                        type="date"
                        // id="input"
                      />
                    </div>
                  </Col>

                  <Col lg={4} md={6} sm={6}>
                    <div className="mb-3">
                      <Label className="header-child">
                        From Date <span className="mandatory">*</span>
                      </Label>
                      <Input
                        value={from_date}
                        onChange={(val) => {
                          setfrom_date(val.target.value);
                        }}
                        className="form-control d-block from control-md"
                        bsSize="sm"
                        name="from_date"
                        type="date"
                        // id="input"
                      />
                    </div>
                  </Col>

                  <Col lg={4} md={6} sm={6}>
                    <div className="mb-3">
                      <Label className="header-child">
                        To Date <span className="mandatory">*</span>
                      </Label>
                      <Input
                        value={to_date}
                        onChange={(val) => {
                          setto_date(val.target.value);
                        }}
                        className="form-control d-block from control-md"
                        bsSize="sm"
                        name="to_date"
                        type="date"
                        // id="input"
                      />
                    </div>
                  </Col>

                        <Col lg={4} md={6} sm={6}>
                          <div className="mb-3">
                            <Label className="header-child">
                              Remark:
                              <span className="mandatory">*</span>
                            </Label>
                             <input 
                             className="form-control d-block from control-md"
                             type="Text"
                             name="remark"
                             placeholder="Enter remark "
                             bsSize="sm"
                             id="input"
                             onChange={validation.handleChange}
                              value={validation.values.remark}
                             />
                          </div>
                        </Col>
                        <Col md={2}>
                      <div className="mb-3">
                        <Label className="header-child">Is Approved</Label>
                        <div onClick={() => setis_active(!is_active)}>
                          {is_active ? (
                            <FiCheckSquare size={18} />
                          ) : (
                            <FiSquare size={18} />
                          )}
                        </div>
                      </div>
                    </Col>
                      </Row>
                    </CardBody>
                  ) : null}
                </Card>
              </Col>
            </div>
          </div>

          {/* fotter btn */}
          <div className="m-3">
          <Col lg={12}>
            <div className="mb-1 footer_btn">
            <Button type="submit" className="btn btn-success m-1 cu_btn">
                  {isupdating ? "Update" : "Save"}
                </Button>

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
    </>
  );
}

export default AddLeave;