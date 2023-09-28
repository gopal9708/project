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
  FormFeedback,
} from "reactstrap";
import PageTitle from "../../../components/pageTitle/PageTitle";
import Title from "../../../components/title/Title";
import { BsSave } from "react-icons/bs";
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
import toTitleCase from "../../../components/Title_Case/TitleCase";
import NSearchInput from "../../../components/formComponent/nsearchInput/NSearchInput";
import { MdAdd, MdDeleteForever } from "react-icons/md";

const AddBilltyFinanaceInfo = () => {
  const AccessToken = useSelector((state) => state.authentication.access_token);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  console.log("first is", location);

  // Toggle Btn
  const [circle_btn, setcircle_btn] = useState(true);
  const toggle_circle = () => {
    setcircle_btn(!circle_btn);
  };

  const [refresh, setrefresh] = useState(false);
  // identification details

  let dimension_list = ["", "", "", ""];
  const [document, setdocument] = useState([dimension_list]);
  console.log("document ===-->>", document);
  const addDocument = () => {
    setdoc_type("");
    setcertificate_no("");
    setdoc_upload("");
    dimension_list = ["", "", ""];
    setdocument([...document, dimension_list]);
  };

  //--- delete input field
  const delete_document = (item) => {
    let temp = [...document];
    const index = temp.indexOf(item);
    if (index > -1) {
      temp.slice(index, 1);
      setdocument(temp);
    }
  };

  return (
    <div>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          if (charge === "") {
            setcharge_err(true);
          }
          validation.handleSubmit(e.values);
          return false;
        }}
      >
        <div className="m-4">
          <PageTitle page={"Add Billty Charges"} />
          <Title title={"Add Billty Charges"} parent_title="Billty" />
        </div>

        <div className="m-4" id="section1">
          <Card className="shadow bg-white rounded">
            <CardTitle className="mb-1 header">
              <div className="header-text-icon header-text">
                Bilty Details
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
                <h3>{location.state?.billty_info.bilty_no}</h3>

                <Row>
                  <Col lg={4} md={3} sm={3}>
                    <div className="mb-3">
                      <Label className="header-child">
                        Billty Discussed Price
                        <span className="manadatory">*</span>
                      </Label>
                      <Input
                        className="form-control d-block from control-md"
                        bsSize="sm"
                        type="text"
                        name="certificate_no"
                        id="input-s"
                        placeholder="Enter Price"
                      />
                    </div>
                  </Col>

                  <Col lg={4} md={3} sm={3}>
                    <Label className="header-child">
                      Discussed By <span className="manadatory">*</span>
                    </Label>
                    <Input
                      className="form-control d-block from control-md"
                      bsSize="sm"
                      type="text"
                      name="certificate_no"
                      placeholder="Enter Name"
                    />
                  </Col>

                  <Col lg={4} md={3} sm={3}>
                    <Label className="header-child">
                      Discussion Date <span className="manadatory">*</span>
                    </Label>
                    <Input
                      className="form-control d-block from control-md"
                      bsSize="sm"
                      type="datetime"
                      name="certificate_no"
                      placeholder="Enter Name"
                    />
                  </Col>

                  <Col lg={10} md={12} sm={12}>
                    <Label className="header-child">
                      Remark <span className="manadatory">*</span>
                    </Label>
                    <Input
                      className="form-control d-block from control-md"
                      bsSize="sm"
                      type="text"
                      name="certificate_no"
                      placeholder="Enter Remark"
                    />
                  </Col>
                </Row>
              </CardBody>
            ) : null}
          </Card>
        </div>

        <div className="m-4" id="section1">
          <Card className="shadow bg-white rounded">
            <CardTitle className="mb-1 header">
              <div className="header-text-icon header-text">
                Charges Details
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
                <div>
                  <Row>
                    <Col lg={2} md={3} sm={3}>
                      <div className="mb-3">
                        <Label className="header-child">
                          Charge <span className="manadatory">*</span>
                        </Label>
                        {document.map((item, index) => (
                          <Input
                            className="form-control d-block from control-md"
                            key={index}
                            value={item[0]}
                            bsSize="sm"
                            type="text"
                            style={{ marginBottom: "15px" }}
                            name="certificate_no"
                            id="input-s"
                            placeholder="Enter Charge"
                            onChange={(val) => {
                              item[0] = val.target.value;
                              setrefresh(!refresh);
                            }}
                          />
                        ))}
                      </div>
                    </Col>

                    <Col lg={2} md={3} sm={3}>
                      <Label className="header-child">
                        Amount <span className="manadatory">*</span>
                      </Label>
                      {document.map((item, index) => (
                        <Input
                          className="form-control d-block from control-md"
                          key={index}
                          value={item[1]}
                          bsSize="sm"
                          type="text"
                          style={{ marginBottom: "15px" }}
                          name="certificate_no"
                          id="input-s"
                          placeholder="Enter Certificate Number"
                          onChange={(val) => {
                            item[1] = val.target.value;
                            setrefresh(!refresh);
                          }}
                        />
                      ))}
                    </Col>

                    <Col lg={1} md={3} sm={3}>
                      <Label className="header-child">
                        Cr/ Dr <span className="manadatory">*</span>
                      </Label>
                      {document.map((item, index) => {
                        return (
                          <select
                            className="form-select"
                            id="input-s"
                            key={index}
                            value={item[2]}
                            style={{
                              marginBottom: "15px",
                              height: "28px",
                              fontSize: "10px",
                            }}
                            bsSize="sm"
                            onChange={(val) => {
                              setdoc_type(val.target.value);
                              item[2] = val.target.value;
                            }}
                          >
                            <option value="" disabled>
                              select mode ...
                            </option>
                            <option value="Credit">Cr.</option>
                            <option value="Debit">Dr.</option>
                          </select>
                        );
                      })}
                    </Col>

                    <Col lg={2} md={3} sm={3}>
                      <Label className="header-child">
                        Payment Mode <span className="manadatory">*</span>
                      </Label>
                      {document.map((item, index) => {
                        return (
                          <select
                            className="form-select"
                            id="input-s"
                            key={index}
                            value={item[2]}
                            style={{
                              marginBottom: "15px",
                              height: "28px",
                              fontSize: "10px",
                            }}
                            bsSize="sm"
                            onChange={(val) => {
                              setdoc_type(val.target.value);
                              item[2] = val.target.value;
                            }}
                          >
                            <option value="" disabled>
                              select mode ...
                            </option>
                            <option>UPI</option>
                            <option value="Credit">Cash</option>
                            <option value="Debit">Chaque</option>
                            <option value="Debit">NEFT / RTGS Coin</option>
                          </select>
                        );
                      })}
                    </Col>

                    <Col lg={2} md={3} sm={3}>
                      <Label className="header-child">
                        Recived By <span className="manadatory">*</span>
                      </Label>
                      {document.map((item, index) => (
                        <Input
                          className="form-control d-block from control-md"
                          key={index}
                          value={item[3]}
                          bsSize="sm"
                          type="text"
                          style={{ marginBottom: "15px" }}
                          name="certificate_no"
                          id="input-s"
                          placeholder="Enter name"
                          onChange={(val) => {
                            setcertificate_no(val.target.value);
                            item[3] = val.target.value;
                          }}
                        />
                      ))}
                    </Col>

                    <Col lg={2} md={3} sm={3}>
                      <Label className="header-child">
                        Recipt Image <span className="manadatory">*</span>
                      </Label>
                      {document.map((item, index) => (
                        <Input
                          className="form-control d-block from control-md"
                          key={index}
                          value={item[3]}
                          bsSize="sm"
                          type="file"
                          style={{ marginBottom: "15px" }}
                          name="certificate_no"
                          id="input-s"
                          placeholder="Enter name"
                          onChange={(val) => {
                            setcertificate_no(val.target.value);
                            item[3] = val.target.value;
                          }}
                        />
                      ))}
                    </Col>

                    {/* //----Delete---/// */}
                    <Col lg={1} md={1} sm={1}>
                      <div className="mb-3">
                        {document.length > 1 ? (
                          <Label className="header-child">Delete</Label>
                        ) : null}
                        {document.map((item, index) => (
                          <IconContext.Provider
                            key={index}
                            value={{
                              className: "icon multi-input",
                            }}
                          >
                            {document.length > 1 ? (
                              <div
                                className="mb-2 mt-2"
                                onClick={() => {
                                  delete_document(item);
                                }}
                              >
                                <MdDeleteForever
                                  size={20}
                                  style={{
                                    justifyContent: "center",
                                    color: "red",
                                    cursor: "pointer",
                                    marginBottom: "15px",
                                  }}
                                />
                              </div>
                            ) : null}
                          </IconContext.Provider>
                        ))}
                      </div>
                    </Col>

                    <div>
                      <span
                        className="link-text"
                        onClick={() => {
                          const lastItem = document[document.length - 1];
                          const docType = lastItem[0];
                          const certNo = lastItem[1];

                          let allFilled = lastItem
                            .slice(0, 2)
                            .every((val) => val.toString() !== "");

                          if (allFilled) {
                            if (
                              (docType === "Pan Card" &&
                                certNo.length !== 10) ||
                              (docType === "Aadhar Card" &&
                                certNo.length !== 12)
                            ) {
                              if (docType === "Pan Card") {
                                alert(
                                  "Certificate No should have 10 digits for Pan Card."
                                );
                              } else if (docType === "Aadhar Card") {
                                alert(
                                  "Certificate No should have 12 digits for Aadhar Card."
                                );
                              }
                            } else {
                              addDocument();
                            }
                          } else {
                            alert("All fields are required.");
                          }
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
                  </Row>

                  {/* <Col lg={3} md={3} sm={3}>
                                        <Label className="header-child">
                                          Document{" "}
                                          <span className="manadatory">*</span>
                                        </Label>
                                        {document.map((item, index) => (
                                          <div
                                            style={{
                                              display: "flex",
                                              justifyContent: "space-between",
                                            }}
                                          >
                                            {item[2] !== "" ? (
                                              <div
                                                style={{
                                                  display: "flex",
                                                  justifyContent: "center",
                                                  alignItems: "center",
                                                  borderRadius: "8px",
                                                }}
                                                className="mb-3"
                                              >
                                                <img
                                                  src={
                                                    item[2] !== ""
                                                      ? item[2]
                                                      : null
                                                  }
                                                  style={{
                                                    width: "40px",
                                                    height: "45px",
                                                    borderRadius: "8px",
                                                    boxShadow:
                                                      "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                                                  }}
                                                />
                                              </div>
                                            ) : null}
                                          </div>
                                        ))}
                                      </Col> */}
                </div>
              </CardBody>
            ) : null}
          </Card>
        </div>

        {/*Button */}
        <div className="m-4">
          <Col lg={12}>
            <div className="mb-1 footer_btn">
              <button
                type="submit"
                className="btn btn-success"
                style={{ marginRight: "10px", width: "100px" }}
              >
                Save
              </button>

              <button
                type="button"
                className="btn btn-danger"
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
export default AddBilltyFinanaceInfo;
