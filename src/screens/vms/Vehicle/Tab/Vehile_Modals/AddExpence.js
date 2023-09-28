import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../../../../../assets/scss/forms/form.scss";
import SearchInput from "../../../../../components/formComponent/searchInput/SearchInput.js";
import NSearchInput from "../../../../../components/formComponent/nsearchInput/NSearchInput";
import {
  Card,
  Col,
  Row,
  CardBody,
  Label,
  Input,
  FormFeedback,
} from "reactstrap";
import { useFormik } from "formik";
import axios from "axios";
import { ServerAddress } from "../../../../../constants/ServerAddress";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import toTitleCase from "../../../../../lib/titleCase/TitleCase";

function AddExpence({ data, id }) {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const handleClick = () => {
    setShow(false);
  };
  const accessToken = useSelector((state) => state.authentication.access_token);

  const [expense_type_S, setexpense_type_S] = useState("");
  const [expense_type_error, setexpense_type_error] = useState(false);
  const [expense_type_S_list, setexpense_type_S_list] = useState([
    "Anuual Inspection Fee",
    "Depreciation",
    "Down Payment",
    "Equipment",
    "Fine",
    "Insurance",
    "Lease",
    "Legal/Court Cost",
    "Loan Payment",
    "Miscellaneous",
    "Moving Voilation",
    "Safety Technology",
    "Telemactics Device",
    "Toll",
    "Vehicle Disposal Cost",
    "Vehical Registration & Taxes",
  ]);

  const send_expense = (values) => {
    axios
      .post(
        ServerAddress + "vms/add_vehicle-expense/",
        {
          vehicle: id,
          expense_type: expense_type_S,
          date: values.date,
          amount: values.amount,
          vendor: toTitleCase(values.vendor).toUpperCase(),
          photos: values.image,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (response) {
        if (response.status === 201) {
          // navigate("/CustomerInvoice");
          alert("DOne");
          setShow(false);
        }
      })
      .catch((error) => {
        alert(`Error Happen while posting raches  Data ${error}`);
      });
  };
  //----------------Validation--------------------------------//
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      amount: "",
      vendor: "",
      date: "",
    },
    validationSchema: Yup.object({
      amount: Yup.string().required("Amount is required"),
      vendor: Yup.string().required("Vendor name is required"),
      date: Yup.string().required("Date is required"),
    }),
    onSubmit: (values) => {
      send_expense(values);
    },
  });

  return (
    <>
      <div style={{ padding: "5px", textAlign: "center" }} onClick={handleShow}>
        <span>Expense History</span>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        dialogClassName="main-modal"
        style={{ marginTop: "15px" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Expense History</Modal.Title>
        </Modal.Header>
        <>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (expense_type_S == "") {
                setexpense_type_error(true);
              }
              validation.handleSubmit(e.values);
              return false;
            }}
          >
            <Modal.Body>
              <div className="">
                <Col lg={12} md={12} sm={12}>
                  <Card className="shadow bg-white rounded">
                    {/* <h3>All Docket</h3> */}
                    <CardBody>
                      <Row>
                        <div
                          className="container-fluid "
                          style={{ background: "white" }}
                        >
                          <Row>
                            <Col lg={6} md={6} sm={6}>
                              <div className="mb-3">
                                <Label className="header-child ">
                                  Vehicle Number*
                                </Label>
                                <Input
                                  className="form-control-md "
                                  id="input"
                                  value={data}
                                  disabled
                                />
                              </div>
                            </Col>

                            <Col lg={6} md={6} sm={6}>
                              <div className="mb-3">
                                <Label className="header-child ">
                                  Expense Type*
                                </Label>
                                <NSearchInput
                                  data_list={expense_type_S_list}
                                  data_item_s={expense_type_S}
                                  set_data_item_s={setexpense_type_S}
                                  show_search={true}
                                  error_message={"Please Select Expense Type "}
                                  error_s={expense_type_error}
                                />
                              </div>
                            </Col>
                          </Row>

                          <Row>
                            <Col lg={6} md={6} sm={6}>
                              <div className="mb-3">
                                <Label className="header-child ">Vendor</Label>
                                <Input
                                  onChange={validation.handleChange}
                                  onBlur={validation.handleBlur}
                                  value={validation.values.vendor || ""}
                                  invalid={
                                    validation.touched.vendor &&
                                    validation.errors.vendor
                                      ? true
                                      : false
                                  }
                                  type="text"
                                  placeholder="Enter Vendor name"
                                  className="form-control-md "
                                  id="input"
                                  name="vendor"
                                />
                                {validation.touched.vendor &&
                                validation.errors.vendor ? (
                                  <FormFeedback type="invalid">
                                    {validation.errors.vendor}
                                  </FormFeedback>
                                ) : null}
                              </div>
                            </Col>

                            <Col lg={6} md={6} sm={6}>
                              <div className="mb-3">
                                <Label className="header-child ">Amount</Label>
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
                                  className="form-control-md "
                                  id="input"
                                  name="amount"
                                  type="number"
                                  min={0}
                                  placeholder="Enter amount"
                                />
                                {validation.touched.amount &&
                                validation.errors.amount ? (
                                  <FormFeedback type="invalid">
                                    {validation.errors.amount}
                                  </FormFeedback>
                                ) : null}
                              </div>
                            </Col>
                          </Row>

                          <Row>
                            <Col lg={6} md={6} sm={6}>
                              <div className="mb-3">
                                <Label className="header-child ">
                                  Upload Receipt*
                                </Label>
                                <Input
                                  type="file"
                                  className="form-control-md "
                                  id="input"
                                  name="image"
                                />
                              </div>
                            </Col>

                            <Col lg={6} md={6} sm={6}>
                              <div className="m-3">
                                <Label className="header-child ">
                                  Due Date
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
                                  className="form-control-md "
                                  id="input"
                                  type="date"
                                  name="date"
                                />
                                {validation.touched.date &&
                                validation.errors.date ? (
                                  <FormFeedback type="invalid">
                                    {validation.errors.date}
                                  </FormFeedback>
                                ) : null}
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="primary"
                type="submit"
                // onClick={handleClose}
              >
                Submit
              </Button>
              <Button type="button" variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </form>
        </>
      </Modal>
    </>
  );
}
export default AddExpence;
