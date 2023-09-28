/*eslint-disable*/
import React, { useLayoutEffect } from "react";
import { useState } from "react";
import classnames from "classnames";
import "bootstrap/dist/css/bootstrap.css";
import {
  Card,
  CardBody,
  CardText,
  Col,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import { useSelector } from "react-redux";
import axios from "axios";
import { ServerAddress } from "../../constants/ServerAddress";

const NewHistoryTab = ({
  Page,
  Table_Name = "",
  Table_Data_Title = [],
  Table_Data_Formate = [],
  path,
  path1,
  path2,
  path3,
}) => {
  // redux state
  const accessToken = useSelector((state) => state.authentication.access_token);

  const [customActiveTab, setcustomActiveTab] = useState("1");
  const toggleCustom = (tab) => {
    if (customActiveTab !== tab) {
      setcustomActiveTab(tab);
    }
  };

  //For Table Head
  const [data_title, setdata_title] = useState(Table_Data_Title);
  const myArr = JSON.parse(JSON.stringify(data_title));
  
  // used for Table
  const [page_data, setpage_data] = useState("");
  const [table_data, settable_data] = useState("");
  const [callibration_data, setcallibration_data] =useState("");
  const [callibration, setcallibration] =useState("");

  const getdata = () => {
    axios
      .get(ServerAddress + path, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        console.log("Updated History Response", response.data.results);
        settable_data(response.data.results);
      })
      .catch((err) => {
        alert(`Error Occur in Get Data ${err}`);
      });
  };

  const getCreateddata = () => {
    axios
      .get(ServerAddress + path1, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        console.log("Created History Response", response.data.results);
        setpage_data(response.data.results);
      })
      .catch((err) => {
        alert(`Error Occur in Get Data ${err}`);
      });
  };

 
  const getCallibrationa= () => {
    axios
      .get(ServerAddress + path3, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        console.log("Callibration Response==", response.data.results);
        setcallibration(response.data.results);
      })
      .catch((err) => {
        alert(`Error Occur in Get Data ${err}`);
      });
  };
  const getCallibrationaData= () => {
    axios
      .get(ServerAddress + path2, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        console.log("getCallibrationaData  Response==", response.data);
        setcallibration_data(response.data.results);
      })
      .catch((err) => {
        alert(`Error Occur in Get Data ${err}`);
      });
  };

  useLayoutEffect(() => {
    if (path2) {
      getCallibrationaData();
    }
  }, [path2]);

  useLayoutEffect(() => {
    if (path3) {
      getCallibrationa();
    }
  }, [path3]);
   
  
  useLayoutEffect(() => {
    if (path1) {
      getCreateddata();
    }
  }, [path1]);
  useLayoutEffect(() => {
    if (path) {
      getdata();
    }
  }, [path]);

  return (
    <div>
      <Row>
        <Col lg={12}>
          <Card
          // style={{ background: "#ebebeb" }}
          >
            <CardBody>
              <Nav tabs className="nav-tabs-custom nav-justified">
                <NavItem>
                  <NavLink
                    style={{
                      cursor: "pointer",
                      // display: "flex",
                      // justifyContent: "flex-start",
                      // borderBottom: "2px solid white",
                    }}
                    className={classnames({
                      active: customActiveTab === "1",
                    })}
                    onClick={() => {
                      toggleCustom("1");
                    }}
                  >
                    <span className="d-none d-sm-block">Created</span>
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink
                    style={{ cursor: "pointer" }}
                    className={classnames({
                      active: customActiveTab === "2",
                    })}
                    onClick={() => {
                      toggleCustom("2");
                    }}
                  >
                    <span className="d-none d-sm-block">Edited</span>
                  </NavLink>
                </NavItem>
              </Nav>

              <TabContent
                activeTab={customActiveTab}
                className="p-3 text-muted"
              >
                <TabPane tabId="1">
                  <Row>
                    <Col lg={12}>
                      <CardText className="mb-0">
                        <Row>
                          <Page
                          page_data={page_data} callibration={callibration}/>
                        
                        </Row>
                      </CardText>
                    </Col>
                  </Row>
                </TabPane>

                <TabPane tabId="2">
                  <Row>
                    <Col sm="12">
                      <CardText className="mb-0">
                        <Row>
                          <Col lg={12} md={12} sm={12} xs={12}>
                            <div>
                              <div
                                style={{
                                  fontWeight: "800",
                                  fontSize: "30px",
                                  color: "black",
                                }}
                              >
                                {" "}
                                {Table_Name}{" "}
                              </div>

                              <div
                                className="fixTableHead"
                                style={{
                                  overflowY: "auto",
                                  maxHeight: "58.2vh",
                                  width: "",
                                }}
                              >
                                <table
                                  className="topheader table-light"
                                  style={{
                                    borderCollapse: "collapse",
                                    width: "100%",
                                    borderWidth: 1,
                                  }}
                                >
                                  <thead
                                    style={{
                                      position: "sticky",
                                      top: "0",
                                    }}
                                  >
                                    <tr
                                      style={{
                                        lineHeight: 2,
                                        borderWidth: 2,
                                      }}
                                    >
                                      {myArr.map((item, index) => {
                                        return (
                                          <th
                                            style={{
                                              whiteSpace: "nowrap",
                                              textAlign: "center",
                                              fontSize: "12.5px",
                                            }}
                                            key={index}
                                          >
                                            {item}{" "}
                                          </th>
                                        );
                                      })}
                                    </tr>
                                  </thead>

                                  <tbody style={{ fontSize: "12px" }}>
                                    {/* <Data_Format data={data} datab={datab} val_data={value} data1={data1} order_id={order_id} /> */}
                                    <Table_Data_Formate
                                      table_data={table_data}
                                      path={path}
                                    />
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </Col>S
                        </Row>
                      </CardText>
                    </Col>
                  </Row>
                </TabPane>
              </TabContent>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default NewHistoryTab;
