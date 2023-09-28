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
import { ServerAddress } from "../../../../constants/ServerAddress";
import { useSelector } from "react-redux";
import axios from "axios";
import { IconContext } from "react-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { setAlertType,setDataExist,setShowAlert } from "../../../../store/alert/Alert";
import { useDispatch } from "react-redux";
import NSearchInput from "../../../../components/formComponent/nsearchInput/NSearchInput";
import { MdAddCircleOutline, MdRemoveCircleOutline } from "react-icons/md";
import { MdAdd, MdDeleteForever } from "react-icons/md";
import toTitleCase from "../../../../lib/titleCase/TitleCase";
import SearchInput from "../../../../components/formComponent/searchInput/SearchInput";
import { FiCheckSquare, FiSquare } from "react-icons/fi";
import PageTitle from "../../../../components/pageTitle/PageTitle";
import Title from "../../../../components/title/Title";
 
 const AddDn = () => {
  const [circle_btn3, setcircle_btn3] = useState(true);
    const toggle_circle3 = () => {
      setcircle_btn3(!circle_btn3);
    };
    const [refresh, setrefresh] = useState(false);
    const [salary_type, setsalary_type] = useState("")
    const [amount, setamount] = useState("");
  // add Another
    let dimension_list = [
      salary_type,
      amount
  ];
    const [row, setrow] = useState([dimension_list]);
    console.log("the row data",row)
    const addSalary = () => {
       let new_row = ["", ""];
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
  
   return (
    <div className="m-3" id="salary_details">
    <Col lg={12}>
      <Card className="shadow bg-white rounded">
        <CardTitle className="mb-1 header">
          <div className="header-text-icon header-text">
             DN
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
                      <Label className="header-child">Customer Name </Label>
                      {row.map((item, index) => {
                        return (
                          <Input
                            min={0}
                            key={index}
                            value={item[0]}
                            type="number"
                            className="form-control-md"
                            id="input"
                            style={{ marginBottom: "15px" }}
                            placeholder="Enter Customer Name "
                            onChange={(val) => {
                              item[0] = val.target.value;
                              setrefresh(!refresh);
                            }}
                          />
                        );
                      })}
                    </div>
                  </Col>
                  <Col lg={3} md={6} sm={6}>
                    <div className="mb-3">
                      <Label className="header-child">Goods Code </Label>
                      {row.map((item, index) => {
                        return (
                          <Input
                            min={0}
                            key={index}
                            value={item[0]}
                            type="number"
                            className="form-control-md"
                            id="input"
                            style={{ marginBottom: "15px" }}
                            placeholder="Enter Goods Code "
                            onChange={(val) => {
                              item[0] = val.target.value;
                              setrefresh(!refresh);
                            }}
                          />
                        );
                      })}
                    </div>
                  </Col>

                  <Col lg={3} md={6} sm={6}>
                    <div className="mb-3">
                      <Label className="header-child">Total Quantity</Label>
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
                            placeholder="Enter Total Quantity "
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
                            addSalary();                                    
                        }}
                      >
                        <IconContext.Provider
                          value={{
                            className: "link-text",
                          }}
                        >
                          <MdAdd />
                        </IconContext.Provider>
                        Add Another 
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
   )
 }
 
 export default AddDn