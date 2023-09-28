import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ServerAddress } from "../../../constants/ServerAddress";
import {
  setDeleteId,
  setIndexValue,
  setSelect,
  setIds,
  setClose,
} from "../../../store/dataList/DataList";
import { FiCheckSquare, FiSquare } from "react-icons/fi";
import { TiTick } from "react-icons/ti";
import { MdPendingActions, MdOutlinePause } from "react-icons/md";
import { ImCross } from "react-icons/im";
import { BsFillForwardFill } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import toTitleCase from "../../../lib/titleCase/TitleCase";
import {
  setAlertType,
  setShowAlert,
  setDataExist,
} from "../../../store/alert/Alert";
import { setIsDeleted, setToggle } from "../../../store/pagination/Pagination";
import { Modal } from "react-bootstrap";
import {
  CardBody,
  CardTitle,
  Col,
  Card,
  Label,
  Input,
  Row,
  Button,
} from "reactstrap";
import { TemplateService } from "ag-grid-community";
import NSearchInput from "../../../components/formComponent/nsearchInput/NSearchInput";

const LoanDataFormat = ({ data, data1 }) => {
  const [loan_data, setloan_data] = useState("");
  useEffect(() => {
    setloan_data(data);
  }, [data]);
  const dispatch = useDispatch();
  //Permission
  const userpermission = useSelector(
    (state) => state.authentication.userpermission
  );
  const user = useSelector((state) => state.authentication.userdetails);

  const total_data = useSelector((state) => state.pagination.total_data);
  const AccessToken = useSelector((state) => state.authentication.access_token);
  const [selectedLoanId, setSelectedLoanId] = useState(null);

  const [refresh, setrefresh] = useState(false);
  const delete_item_row = (id) => {
    axios
      .post(
        ServerAddress + "finance/delete-Loan/",
        {
          data: id,
        },
        {
          headers: {
            Authorization: `Bearer ${AccessToken}`,
          },
        }
      )
      .then(function (response) {
        if (response.statusText === "OK") {
          dispatch(setDeleteId(false));
          dispatch(setIds([]));
          dispatch(setSelect(false));
          setselected([]);
          dispatch(setIsDeleted(false));
          dispatch(setShowAlert(true));
          dispatch(setDataExist(`Data Deleted Sucessfully ${ids}`));
          dispatch(setAlertType("danger"));
          dispatch(setIsDeleted("Yes"));
          dispatch(setToggle(true));
          setrefresh(!refresh);
        }
      })
      .catch((err) => {
        alert(`Error While delete Loan Data ${err}`);
      });
  };

  useEffect(() => {
    dispatch(setToggle(false));
  });

  useEffect(() => {
    dispatch(setIsDeleted("No"));
  }, [total_data]);

  //For Sorting
  const list_toggle = useSelector((state) => state.datalist.list_toggle);
  const index = useSelector((state) => state.datalist.index);

  useEffect(() => {
    if (index === 0) {
      dispatch(setIndexValue(""));
    } else if (index === 1) {
      dispatch(setIndexValue(""));
    } else if (index === 2) {
      dispatch(setIndexValue(""));
    } else if (index === 3) {
      dispatch(setIndexValue(""));
    } else if (index === 4) {
      dispatch(setIndexValue(""));
    } else if (index === 5) {
      dispatch(setIndexValue(""));
    } else if (index === 6) {
      dispatch(setIndexValue(""));
    } else if (index === 7) {
      dispatch(setIndexValue(""));
    }
  }, [index]);

  //Multi Delete function
  const ids = useSelector((state) => state.datalist.ids);
  const select_all = useSelector((state) => state.datalist.select_all);
  const delete_id = useSelector((state) => state.datalist.delete_id);

  const [selected, setselected] = useState([]);

  const handlefunn = (id) => {
    if (selected.includes(id)) {
      let lis = [...selected];
      setselected(lis.filter((e) => e !== id));
    } else {
      setselected([...selected, id]);
    }
  };

  useEffect(() => {
    dispatch(setIds(selected));
  }, [selected]);

  useEffect(() => {
    if (ids !== [] && select_all === true) {
      setselected(ids);
    }
  }, [ids, select_all]);

  useEffect(() => {
    if (select_all === false) {
      setselected([]);
    }
  }, [select_all]);

  useEffect(() => {
    if (delete_id === true) {
      delete_item_row(ids);
    }
  }, [delete_id, ids]);

  //Modal
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setSelectedLoanId(null);
  };
  const handleShow = (loanId) => {
    setShow(true);
    setSelectedLoanId(loanId);
  };

  //Post Method

  const loan_approval = () => {
    axios
      .put(
        ServerAddress + "finance/update-loan/" + selectedLoanId,
        {
          approved_date: date,
          payment_type: salary,
          payment_mode: pay_mode,
          loan_percent: emi_percent,
          total_tenure: total_tenure,
          approved_by: user.id,
          status: status,
        },
        {
          headers: {
            Authorization: `Bearer ${AccessToken}`,
          },
        }
      )
      .then(function (response) {
        if (response.status === 200) {
          handleClose();
          alert("Loan Approval Updated Successfully");
        }
      })
      .catch((err) => {
        alert(`Error While Updating Loan Approval ${err}`);
        handleClose();
      });
  };

  // Field State
  const [date, setdate] = useState("");
  console.log("date is", date);
  const [emi_percent, setemi_percent] = useState("");
  console.log("emi_percent is", emi_percent);
  const [emi_list, setemi_list] = useState(["1", "3", "5", "10"]);
  const [salary_list, setsalary_list] = useState([
    "One Time Settlement",
    "Quaterly",
    "Monthly",
    "Yearly",
  ]);
  const [salary, setsalary] = useState("");
  console.log("salary is", salary);
  const [pay_mode_list, setpay_mode_list] = useState([
    "Salary Deduction",
    "Cash",
    "Cheque",
    "UPI",
    "Net Banking",
  ]);
  const [pay_mode, setpay_mode] = useState("");
  console.log("pay mode is", pay_mode);
  const [status, setstatus] = useState("");
  console.log("status is", status);
  const [status_list, setstatus_list] = useState([
    "Approved",
    "Hold",
    "Pending",
    "Rejected",
  ]);

  const [total_tenure, settotaltenure] = useState("");
  const [total_tenure_list, settotal_tenure_list]  = useState(["Quaterly", "Half Yearly", "Annually", "1.5 Yeras", "2 Years", "2.5 Years", "3 Years", "3.5 Years", "4 Years", "4.5 Years", "5 Years"]);

  return (
    <>
      {(list_toggle === true ? data1 : data) === 0 ? (
        <tr>
          <td>No Data Found</td>
        </tr>
      ) : (
        <>
          <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>Loan Approval</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                <Row>
                  <Col lg={4} md={6} sm={6}>
                    <div className="mb-2">
                      <Label className="header-child">
                        Date <span className="mandatory">*</span>
                      </Label>
                      <Input
                        className="form-control-md"
                        type="date"
                        bsSize="sm"
                        value={date}
                        onChange={(event) => {
                          setdate(event.target.value);
                        }}
                      />
                    </div>
                  </Col>

                  <Col lg={4} md={6} sm={6}>
                    <div className="mb-2">
                      <Label className="header-child">
                        Payment Frequency <span className="mandatory">*</span>
                      </Label>
                      <NSearchInput
                        data_list={salary_list}
                        data_item_s={salary}
                        set_data_item_s={setsalary}
                        show_search={false}
                        error_message="Select Salary Deduction"
                      />
                    </div>
                  </Col>

                  <Col lg={4} md={6} sm={6}>
                    <div className="mb-2">
                      <Label className="header-child">
                        Pay Mode <span className="mandatory">*</span>
                      </Label>
                      <NSearchInput
                        data_list={pay_mode_list}
                        data_item_s={pay_mode}
                        set_data_item_s={setpay_mode}
                        show_search={false}
                        error_message="Select Emi Percent Deduction"
                      />
                    </div>
                  </Col>

                  <Col lg={4} md={6} sm={6}>
                    <div className="mb-2">
                      <Label className="header-child">
                        Rate of Interest <span className="mandatory">*</span>
                      </Label>
                      <NSearchInput
                        data_list={emi_list}
                        data_item_s={emi_percent}
                        set_data_item_s={setemi_percent}
                        show_search={false}
                        error_message="Select Emi Percent Deduction"
                      />
                    </div>
                  </Col>
                  <Col lg={4} md={6} sm={6}>
                    <div className="mb-2">
                      <Label className="header-child">
                        Total Tenure <span className="mandatory">*</span>
                      </Label>
                      <NSearchInput
                        data_list={total_tenure_list}
                        data_item_s={total_tenure}
                        set_data_item_s={settotaltenure}
                        show_search={false}
                        error_message="Select Total Tennure"
                      />
                    </div>
                  </Col>

                  <Col lg={4} md={6} sm={6}>
                    <div className="mb-2">
                      <Label className="header-child">
                        Status <span className="mandatory">*</span>
                      </Label>
                      <NSearchInput
                        data_list={status_list}
                        data_item_s={status}
                        set_data_item_s={setstatus}
                        show_search={false}
                        error_message="Select Emi Percent Deduction"
                      />
                    </div>
                  </Col>
                </Row>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button className="btn btn-success" onClick={loan_approval}>
                Update
              </Button>
              <Button className="btn btn-danger" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

          {(list_toggle === true ? data1 : data).map((loan, index) => {
            return (
              <tr key={index} style={{ borderwidth: 1 }}>
                <td
                  className="selection-cell"
                  onClick={() => {
                    handlefunn(loan.id);
                    dispatch(setSelect(true));
                    dispatch(setDeleteId(false));
                    dispatch(setClose(false));
                  }}
                >
                  {selected.includes(loan.id) ? (
                    <FiCheckSquare size={15} />
                  ) : (
                    <FiSquare size={15} />
                  )}
                </td>
                <td>
                  <Link state={{ data: loan }} to="/accounts/Loan/AddLoan">
                    {loan.loan_id}
                  </Link>
                </td>
                <td>{loan.emp_First_name}</td>
                <td>
                  {loan.emp_Middle_name ? (
                    toTitleCase(loan.emp_Middle_name)
                  ) : (
                    <b>--</b>
                  )}
                </td>
                <td>{loan.emp_Last_name}</td>
                <td>{loan.emp_id}</td>
                <td>{toTitleCase(loan.department_name)}</td>
                <td>{loan.date_issue}</td>
                <td>{loan.amount}</td>
                <td>{loan.status === "Applied"? (
                  <BsFillForwardFill color= "blue" size={21}/>
                  ) : (
                    loan.status === "Approved" ? (
                    <TiTick color= "green" size={21} />
                    ) : (
                      loan.status === "Hold" ? (
                      <MdOutlinePause color= "#e06000" size={21} />
                      ) : (
                        loan.status === "Pending" ? (
                        <MdPendingActions color="#ffab00" size={21} />
                        ) : (
                          loan.status === "Rejected" ? (
                        <ImCross color = "Red" />
                          ) : (
                            null
                          )
                      )
                    )
                  )

                )}
                </td>
                <td>{toTitleCase(loan.loan_purpose)}</td>
                <td>{loan.remaining_amount}</td>              
                
                <td>
                  <button
                    className="btn btn-success"
                    onClick={() => handleShow(loan.id)}
                    type="button"
                  >
                    Approval
                  </button>
                </td>
              </tr>
            );
          })}
        </>
      )}
      ;
    </>
  );
};

export default LoanDataFormat;
