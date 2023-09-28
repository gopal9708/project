import React, { useEffect, useState } from "react";
import {
  CardBody,
  CardTitle,
  Form,
  Col,
  Card,
  Label,
  Input,
  Row,
  Button,
} from "reactstrap";
import PageTitle from "../../../components/pageTitle/PageTitle";
import Title from "../../../components/title/Title";
import { IconContext } from "react-icons";
import {
  MdAddCircleOutline,
  MdRemoveCircleOutline,
  MdAdd,
  MdDeleteForever,
} from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import toTitleCase from "../../../lib/titleCase/TitleCase";
import axios from "axios";
import { ServerAddress } from "../../../constants/ServerAddress";
import {
  setDataExist,
  setShowAlert,
  setAlertType,
} from "../../../store/alert/Alert";
import { useLocation, useNavigate } from "react-router-dom";
import { FiCheckSquare, FiSquare } from "react-icons/fi";

const AddLoan = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  console.log("location is", location);
  const user = useSelector((state) => state.authentication.userdetails);
  const AccessToken = useSelector((state) => state.authentication.access_token);
  const employee = useSelector((state) => state.authentication.employee);

  const [circle_btn, setcircle_btn] = useState(true);
  const togg_circle = () => {
    setcircle_btn(!circle_btn);
  };
  // For Update
  const [loan_data, setloan_data] = useState([]);
  const [loan_id, setloan_id] = useState("");
  console.log("loan_id is", loan_id);
  const [is_updating, setis_updating] = useState(false);

  //for Update Add Another
  const [loan_transaction, setloan_transaction] = useState([]);

  // For Add Another
  const [selected, setselected] = useState([]);
  const [active, setactive] = useState(false);
  console.log("active", active);

  let list_b = ["", "", "", active];
  const [transaction, settransaction] = useState([list_b]);
  const [refresh, setrefresh] = useState(false);
  const add_new_row = () => {
    let list_a = ["", "", "", false];
    settransaction([...transaction, list_a]);
    setrefresh(!refresh);
  };

  const delete_row = (item) => {
    const list_t = [...transaction];
    const index = list_t.indexOf(item);
    if (index > -1) {
      list_t.splice(index, 1);
    }
    settransaction(list_t);
  };

  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [middle_name, setmiddle_name] = useState("");
  const [bcd, setbcd] = useState("");
  const [ada_salary, setada_salary] = useState("");
  const [loan_date, setloan_date] = useState("");
  const [emp_id, setemp_id] = useState("");
  const [department, setdepartment] = useState("");
  const [loan_purpose, setloan_purpose] = useState("");
  const [amount, setamount] = useState("");
  const [file, setfile] = useState("");
  const [department_id, setdepartment_id] = useState("");
  const [emp_idd, setemp_idd] = useState("");

  useEffect(() => {
    setfirst_name(toTitleCase(user.firstname));
    setmiddle_name(toTitleCase(user.middlename));
    setlast_name(toTitleCase(user.lastname));
    setdepartment_id(user.department);
    setdepartment(toTitleCase(user.department_name));
    // setemp_id(toTitleCase(employee.employee_id));
    // setemp_idd(employee.id);
  }, [first_name, middle_name, last_name, department, emp_idd]);

  // for Update State

  // post the add loan form
  const send_loan = () => {
    axios
      .post(
        ServerAddress + "finance/add-loan/",
        {
          date_issue: loan_date,
          employee: emp_idd,
          department: department_id,
          loan_purpose: loan_purpose,
          amount: amount,
          file: file,
        },
        {
          headers: {
            Authorization: `Bearer ${AccessToken}`,
          },
        }
      )
      .then(function (response) {
        console.log("response is", response);
        if (response.data.status === "success") {
          dispatch(setShowAlert(true));
          dispatch(setAlertType("success"));
          dispatch(
            setDataExist(`Loan ${emp_id} Request Submitted Successfully`)
          );
          navigate(-1);
        }
      })
      .catch((err) => {
        alert(`Error While Submitting Loan Form ${err}`);
      });
  };

  // update the add loan form
  const update_loan = () => {
    axios
      .put(
        ServerAddress + "finance/update-loan/" + loan_id,
        {
          date_issue: loan_date,
          employee: emp_idd,
          department: department_id,
          loan_purpose: loan_purpose,
          amount: amount,
          file: file,
          transaction_details: transaction,
        },
        {
          headers: {
            Authorization: `Bearer ${AccessToken}`,
          },
        }
      )
      .then(function (response) {
        if (response.status === 200) {
          dispatch(setShowAlert(true));
          dispatch(setAlertType("warning"));
          dispatch(
            setDataExist(`Loan ${emp_id} Request Submitted Successfully`)
          );
          navigate(-1);
        }
      })
      .catch((err) => {
        alert(`Error While Updating Loan Form ${err}`);
      });
  };

  useEffect(() => {
    try {
      let data = location.state.data;
      setloan_data(data);
      setloan_id(data.id);
      setis_updating(true);
      setfirst_name(data.emp_First_name);
      setmiddle_name(data.emp_Middle_name);
      setlast_name(data.emp_Last_name);
      // setemp_id(data.emp_id);s
      setdepartment(toTitleCase(data.department_name));
      setdepartment_id(data.department);
      setloan_date(data.date_issue);
      setloan_transaction(data.loan_payment);
      setamount(data.amount);
      setloan_purpose(data.loan_purpose);
    } catch (err) {}
  }, [is_updating]);

  useEffect(() => {
    if (is_updating) {
      if (loan_transaction.length !== 0) {
        let temp = [];
        let temp_list = [];
        temp = loan_transaction;
        console.log("loan_transaction", loan_transaction);
        for (let index = 0; index < loan_transaction.length; index++) {
          temp_list.push([
            temp[index].transaction_number,
            temp[index].payment_mode,
            temp[index].emi_amount,
            temp[index].is_verified,
            temp[index].id,
          ]);
        }
        settransaction(temp_list);
        console.log("first");
      }
    }
  }, [is_updating]);
  return (
    <>
      <div>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            return false;
          }}
        >
          <div>
            <PageTitle page={is_updating ? "Update Loan" : "Add Loan"} />
            <Title
              title={is_updating ? "Update Loan" : "Add Loan"}
              parent_title={"Accounts"}
            />

            <div className="m-3">
              <Col lg={12}>
                <Card className="shadow bg-white rounded">
                  <CardTitle className="mb-1 header">
                    <div className="header-text-icon header-text">
                      Loan Form
                      <IconContext.Provider
                        value={{
                          className: "header-add-icon",
                        }}
                      >
                        <div onClick={togg_circle}>
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
                              First Name <span className="mandatory">*</span>
                            </Label>
                            <Input
                              className="form-control-md"
                              type="char"
                              bsSize="sm"
                              value={first_name}
                              placeholder="Enter Name"
                              disabled
                            />
                          </div>
                        </Col>

                        <Col lg={4} md={6} sm={6}>
                          <div className="mb-2">
                            <Label className="header-child">
                              Middle Name <span className="mandatory">*</span>
                            </Label>
                            <Input
                              className="form-control-md"
                              type="char"
                              bsSize="sm"
                              value={middle_name}
                              placeholder="Enter Middle Name"
                              disabled
                            />
                          </div>
                        </Col>

                        <Col lg={4} md={6} sm={6}>
                          <div className="mb-2">
                            <Label className="header-child">
                              Last Name <span className="mandatory">*</span>
                            </Label>
                            <Input
                              className="form-control-md"
                              type="char"
                              bsSize="sm"
                              value={last_name}
                              placeholder="Enter Last Name"
                              disabled
                            />
                          </div>
                        </Col>

                        <Col lg={4} md={6} sm={6}>
                          <div className="mb-2">
                            <Label className="header-child">
                              Emp Id <span className="mandatory">*</span>
                            </Label>
                            <Input
                              className="form-control-md"
                              type="char"
                              bsSize="sm"
                              placeholder="Enter Emp_id"
                              value={emp_id}
                              disabled
                            />
                          </div>
                        </Col>

                        <Col lg={4} md={6} sm={6}>
                          <div className="mb-2">
                            <Label className="header-child">
                              Department <span className="mandatory">*</span>
                            </Label>
                            <Input
                              className="form-control-md"
                              type="char"
                              value={department}
                              bsSize="sm"
                              placeholder="Department Name"
                              disabled
                            />
                          </div>
                        </Col>

                        <Col lg={4} md={6} sm={6}>
                          <div className="mb-2">
                            <Label className="header-child">
                              Loan Issue Date{" "}
                              <span className="mandatory">*</span>
                            </Label>
                            <Input
                              className="form-control-md"
                              type="date"
                              bsSize="sm"
                              value={loan_date}
                              onChange={(event) => {
                                setloan_date(event.target.value);
                              }}
                            />
                          </div>
                        </Col>

                        <Col lg={4} md={6} sm={6}>
                          <div className="mb-2">
                            <Label className="header-child">
                              Amount <span className="mandatory">*</span>
                            </Label>
                            <Input
                              className="form-control-md"
                              type="number"
                              bsSize="sm"
                              placeholder="Enter Amount"
                              value={amount}
                              onChange={(event) => {
                                setamount(event.target.value);
                              }}
                            />
                          </div>
                        </Col>

                        <Col lg={4} md={2} sm={2}>
                          <div className="mb-2">
                            <Label className="header-child">
                              BCD <span className="mandatory">*</span>
                            </Label>
                            <Input
                              className="form-control-md"
                              type="char"
                              placeholder="Enter BCD"
                              bsSize="sm"
                              value={bcd}
                              onChange={(event) => {
                                setbcd(event.target.value);
                              }}
                            />
                          </div>
                        </Col>

                        <Col lg={4} md={2} sm={2}>
                          <div className="mb-2">
                            <Label className="header-child">
                              Advance Against Salary{" "}
                              <span className="mandatory">*</span>
                            </Label>
                            <Input
                              className="form-control-md"
                              type="char"
                              placeholder="Enter Advance Against Loan"
                              value={ada_salary}
                              bsSize="sm"
                              onChange={(event) => {
                                setada_salary(event.target.value);
                              }}
                            />
                          </div>
                        </Col>

                        <Col lg={4} md={6} sm={6}>
                          <div className="mb-2">
                            <Label className="header-child">
                              Document <span className="mandatory">*</span>
                            </Label>
                            <Input
                              className="form-control-md"
                              type="file"
                              bsSize="sm"
                              value={file}
                              onChange={(event) => {
                                setfile(event.target.value);
                              }}
                            />
                          </div>
                        </Col>

                        <Col lg={4} md={6} sm={6}>
                          <div className="mb-2">
                            <Label className="header-child">
                              Purpose of Loan{" "}
                              <span className="mandatory">*</span>
                            </Label>
                            <Input
                              className="form-control-md"
                              type="textarea"
                              style={{ height: "100px", width: "350px" }}
                              placeholder="Enter Advance Against Salary"
                              bsSize="sm"
                              value={loan_purpose}
                              onChange={(event) => {
                                setloan_purpose(event.target.value);
                              }}
                            />
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  ) : null}
                </Card>
              </Col>
            </div>

            {is_updating ? (
              <div className="m-3">
                <Col lg={12}>
                  <Card className="shadow bg-white rounded">
                    <CardTitle className="mb-1 header">
                      <div className="header-text-icon header-text">
                        Entry Loan Form
                        <IconContext.Provider
                          value={{
                            className: "header-add-icon",
                          }}
                        >
                          <div onClick={togg_circle}>
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
                          <Col lg={2} md={2} sm={2}>
                            <div className="mb-3">
                              <Label className="header-child">
                                Transaction Number
                              </Label>
                              {transaction.map((item, index) => {
                                return (
                                  <div className="mb-3">
                                    <Input
                                      className="form-control d-block from control-md input-s"
                                      bsSize="sm"
                                      type="text"
                                      key={index}
                                      placeholder="Enter Transaction Number"
                                      value={item[0]}
                                      onChange={(val) => {
                                        item[0] = val.target.value;
                                        setrefresh(!refresh);
                                      }}
                                    />
                                  </div>
                                );
                              })}
                            </div>
                          </Col>

                          <Col lg={2} md={2} sm={2}>
                            <div className="mb-3">
                              <Label className="header-child">
                                Payment Mode
                              </Label>
                              {transaction.map((item, index) => {
                                return (
                                  <div className="mb-3">
                                    <Input
                                      className="form-control d-block from control-md input-s"
                                      bsSize="sm"
                                      type="text"
                                      key={index}
                                      placeholder="Enter Payment Mode"
                                      value={item[1]}
                                      onChange={(val) => {
                                        item[1] = val.target.value;
                                        setrefresh(!refresh);
                                      }}
                                    />
                                  </div>
                                );
                              })}
                            </div>
                          </Col>

                          <Col lg={2} md={2} sm={2}>
                            <div className="mb-3">
                              <Label className="header-child">Emi Amount</Label>
                              {transaction.map((item, index) => {
                                return (
                                  <div className="mb-3">
                                    <Input
                                      className="form-control d-block from control-md input-s"
                                      bsSize="sm"
                                      type="text"
                                      key={index}
                                      placeholder="Enter Emi Amount"
                                      value={item[2]}
                                      onChange={(val) => {
                                        item[2] = val.target.value;
                                        setrefresh(!refresh);
                                      }}
                                    />
                                  </div>
                                );
                              })}
                            </div>
                          </Col>

                          <Col lg={2} md={2} sm={2}>
                            <div className="mb-3">
                              <Label className="header-child">Verified</Label>
                              {transaction.map((item, index) => {
                                return (
                                  // <div className="mb-3">
                                  //   <div
                                  //     onClick={() => {
                                  //        setactive(!active);
                                  //        item[4](!active);
                                  //       setrefresh(!refresh);
                                  //     }}
                                  //     key={index}
                                  //   >
                                  //     {active ? (
                                  //       <FiCheckSquare
                                  //         size={21}
                                  //         color={"blue"}
                                  //       />
                                  //     ) : (
                                  //       <FiSquare size={21} />
                                  //     )}
                                  //   </div>
                                  // </div>
                                  <div
                                    onClick={() => {
                                      if (selected.includes(index)) {
                                        let lis = [...selected];
                                        setselected(
                                          lis.filter((e) => e !== index)
                                        );
                                        setactive(false);
                                        item[3] = false;
                                      } else {
                                        setselected([...selected, index]);
                                        setactive(true);
                                        item[3] = true;
                                      }
                                    }}
                                  >
                                    {item[3] ? (
                                      <FiCheckSquare
                                        style={{ marginBottom: "35px" }}
                                      />
                                    ) : (
                                      <FiSquare
                                        style={{ marginBottom: "35px" }}
                                      />
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </Col>

                          {/* Delete */}

                          <Col lg={1} md={1} sm={1}>
                            <div className="mb-3">
                              {transaction.length > 1 ? (
                                <Label className="header-child">Delete</Label>
                              ) : null}
                              {transaction.map((item, index) => (
                                <IconContext.Provider
                                  key={index}
                                  value={{
                                    className: "icon multi-input",
                                  }}
                                >
                                  {transaction.length > 1 ? (
                                    <div
                                      className="mb-2 mt-2"
                                      onClick={() => {
                                        delete_row(item);
                                      }}
                                    >
                                      <MdDeleteForever
                                        style={{
                                          justifyContent: "center",
                                          cursor: "pointer",
                                          marginBottom: "26px",
                                        }}
                                      />
                                    </div>
                                  ) : null}
                                </IconContext.Provider>
                              ))}
                            </div>
                          </Col>
                        </Row>

                        <div>
                          <span
                            className="link-text"
                            onClick={() => {
                              add_new_row();
                            }}
                          >
                            <IconContext.Provider
                              value={{
                                className: "icon",
                              }}
                            >
                              <MdAdd />
                            </IconContext.Provider>
                            Add Another
                          </span>
                        </div>
                      </CardBody>
                    ) : null}
                  </Card>
                </Col>
              </div>
            ) : null}
            {/* Button */}
            <div className="m-3">
              <Col lg={12}>
                <div className="mb-1 footer_btn">
                  <Button
                    type="submit"
                    className="btn btn-success m-1 cu_btn"
                    onClick={is_updating ? update_loan : send_loan}
                  >
                    {is_updating ? "Update" : "Save"}
                  </Button>

                  <Button type="button" className="btn btn-danger m-1 cu_btn">
                    Cancel
                  </Button>
                </div>
              </Col>
            </div>
          </div>
        </Form>
      </div>
    </>
  );
};

export default AddLoan;
