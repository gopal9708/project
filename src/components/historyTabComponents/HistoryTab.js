/*eslint-disable*/
import React, { useLayoutEffect } from "react";
import { useState } from "react";
import classnames from "classnames";
import "bootstrap/dist/css/bootstrap.css";
import {
  Card,
  CardBody,
  CardText,
  CardTitle,
  Col,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";

import toTitleCase from "../../lib/titleCase/TitleCase";
// import TableFormate from "../historyPage/TableFormate";
// import { width } from "@mui/system";
import {useSelector} from "react-redux";
import axios from "axios";
import { ServerAddress } from "../../constants/ServerAddress";

const HistoryTab = ({
  Number_OF_Card = 0,
width,
  Card_Title1="",
  Card_Title2="",
  Card_Title3="",
  Card_Title4="",
  Card_Title5="",

  Card_Data1={},
  Card_Data2 = {},
  Card_Data3 = {},
  Card_Data4 = {},
  Card_Data5 = {},
 
  Table_Name="",
  Table_Data_Title = [],
  Table_Data_Formate =[],
  path,
  path1,
}) => {

  // redux state
  const accessToken = useSelector((state) => state.authentication.access_token);
  //for data
  const [Card1_data, setCard1_data] = useState(Card_Data1);
  const [Card2_data, setCard2_data] = useState(Card_Data2);
  const [Card3_data, setCard3_data] = useState(Card_Data3);
  const [Card4_data, setCard4_data] = useState(Card_Data4);
  const [Card5_Data, setCard5_Data] = useState(Card_Data5);

  const [customActiveTab, setcustomActiveTab] = useState("1");
  const toggleCustom = (tab) => {
    if (customActiveTab !== tab) {
      setcustomActiveTab(tab);
    }
  };

  //For Table Head
  const [data_title, setdata_title] = useState(Table_Data_Title);
  const myArr = JSON.parse(JSON.stringify(data_title));
  // console.log("8888888888888888888888",Table_Data_Title);
  // console.log("9999999999999999999999",myArr)

  // this is used to show all data in one card
  // let ele = Object.entries(Card_Data);
  //For map card

  const [card_list, setcard_list] = useState("");
  useLayoutEffect(() => {
    let card_list1 = [];

    if (Number_OF_Card > 0) {
      for (let i = 1; i <= Number_OF_Card; i++) {
        card_list1.push([i]);
      }
    }
    setcard_list(card_list1);
  }, [Number_OF_Card]);

  // console.log("Formatae",TableFormate)

  // used for Table
  const [table_data, settable_data] = useState("");

  const getdata = () => {
    axios
      .get(ServerAddress + path, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        console.log("History Response",response.data.results)
        settable_data(response.data.results);
        // dispatch(setTotalData(response.data.count));
        // dispatch(setDataLoaded(true));
        // dispatch(setPrev(response.data.previous));
        // dispatch(setNext(response.data.next));
        // let total_data = response.data.results;
        // let temp_data = [];
        // for (let index = 0; index < total_data.length; index++) {
        //   const element = total_data[index];
        //   temp_data.push(element.id);
        // }
        // setdata_ids(temp_data);
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
        console.log("Created History Response",response.data.results)
        // settable_data(response.data.results);
        // dispatch(setTotalData(response.data.count));
        // dispatch(setDataLoaded(true));
        // dispatch(setPrev(response.data.previous));
        // dispatch(setNext(response.data.next));
        // let total_data = response.data.results;
        // let temp_data = [];
        // for (let index = 0; index < total_data.length; index++) {
        //   const element = total_data[index];
        //   temp_data.push(element.id);
        // }
        // setdata_ids(temp_data);
      })
      .catch((err) => {
        alert(`Error Occur in Get Data ${err}`);
      });
  };
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

                          {card_list.length > 0 ? (
                            <>
                              {card_list.map((item, index) => {
                                return (
                                  // < key={index}>

                                  <>
                                    <Col lg={width} md="12" sm="12">
                                      <div>
                                        <Card
                                          style={{
                                            overflow: "scrollX",
                                            overflowY: "hidden",
                                          }}
                                          className="shadow bg-white rounded"
                                        >
                                          <CardTitle>
                                            <div
                                              style={{
                                                display: "flex",
                                                paddingLeft: "16px",
                                                paddingTop: "8px",
                                                paddingBottom: "2px",
                                                color: "Black",
                                                fontSize: "18px",
                                                fontFamily: "arial, sans-serif",
                                                borderBottom:"2px solid black",
                                              }}
                                            >
                                              {index == 0 && Card_Title1}
                                              {index == 1 && Card_Title2}
                                              {index == 2 && Card_Title3}
                                              {index == 3 && Card_Title4}
                                              {index == 4 && Card_Title5}
                                            </div>
                                          </CardTitle>
                                          <CardBody>
                                            <div>
                                              <h6
                                                style={{ marginTop: "16px" }}
                                                className="fw-bold mb-1"
                                              >
                                                {index == 0 &&
                                                <>
                                                {Object.values(Card1_data) < 1 ? (
                                                  <div>Data Not Found</div>
                                                ) : (
                                                  Card1_data.map(
                                                    (item0, index0) => {
                                                      // console.log("=====>",item0[0])
                                                      // if(item0[0].indexOf("_") !== -1) { // check if the element contains an underscore
                                                      //   let parts = item0[0].split("_"); // split the element into parts at the underscore
                                                      //   console.log(`Element contains an underscore. Parts are ${parts}`);
                                                      // }
                                                      let lable =
                                                        item0[0].split("_");
                                                      let lable_name =
                                                        toTitleCase(
                                                          lable[0]
                                                        ) +
                                                        " " +
                                                        toTitleCase(lable[1]);
                                                      return (
                                                        <div
                                                          style={{
                                                            margin:
                                                              "0 20px 18px 20px",
                                                            padding: "12px",
                                                          }}
                                                          key={index0}
                                                        >
                                                          <span
                                                            style={{
                                                              color: "red",
                                                              margin: "20px",
                                                            }}
                                                          >
                                                            {" "}
                                                            {/* {(item0[0].split("_"))} */}
                                                            {toTitleCase(lable_name)}
                                                          </span>{" "}
                                                          {""}
                                                          <span
                                                            style={{
                                                              color: "blue",
                                                              margin: "20px",
                                                            }}
                                                          >
                                                            {item0[1]}
                                                          </span>
                                                        </div>
                                                      );
                                                    }
                                                  )
                                                )}
                                                </>}

                                                {index == 1 && (
                                                  <>
                                                    {Object.values(Card2_data)
                                                      .length < 1 ? (
                                                      <div>Data Not Found</div>
                                                    ) : (
                                                      Card2_data.map(
                                                        (item1, index1) => {
                                                          return (
                                                            <div
                                                              style={{
                                                                margin:
                                                                  "0 0 40px 0",
                                                              }}
                                                              key={index1}
                                                            >
                                                              <span
                                                                style={{
                                                                  color:
                                                                    "green",
                                                                  margin:
                                                                    "20px",
                                                                }}
                                                              >
                                                                {" "}
                                                                {item1[0]}
                                                              </span>{" "}
                                                              {""}
                                                              <span
                                                                style={{
                                                                  color:
                                                                    "black",
                                                                  margin:
                                                                    "20px",
                                                                }}
                                                              >
                                                                {item1[1]}
                                                              </span>
                                                            </div>
                                                          );
                                                        }
                                                      )
                                                    )}
                                                  </>
                                                )}

                                                {index == 2 && (
                                                  <>
                                                    {Object.values(Card3_data)
                                                      .length < 1 ? (
                                                      <div>Data Not Found</div>
                                                    ) : (
                                                      Card3_data.map(
                                                        (item2, index2) => {
                                                          return (
                                                            <div
                                                              style={{
                                                                margin:
                                                                  "0 0 40px 0",
                                                              }}
                                                              key={index2}
                                                            >
                                                              <span
                                                                style={{
                                                                  color: "gray",
                                                                  margin:
                                                                    "20px",
                                                                }}
                                                              >
                                                                {" "}
                                                                {item2[0]}
                                                              </span>{" "}
                                                              {""}
                                                              <span
                                                                style={{
                                                                  color: "pink",
                                                                  margin:
                                                                    "20px",
                                                                }}
                                                              >
                                                                {item2[1]}
                                                              </span>
                                                            </div>
                                                          );
                                                        }
                                                      )
                                                    )}
                                                  </>
                                                )}

                                                {index == 3 && (
                                                  <>
                                                    {Object.values(Card4_data)
                                                      .length < 1 ? (
                                                      <div>Data Not Found</div>
                                                    ) : (
                                                      Card_Data4.map(
                                                        (item3, index3) => {
                                                          return (
                                                            <div
                                                              style={{
                                                                margin:
                                                                  "0 0 40px 0",
                                                              }}
                                                              key={index3}
                                                            >
                                                              <span
                                                                style={{
                                                                  color:
                                                                    "skyblue",
                                                                  margin:
                                                                    "20px",
                                                                }}
                                                              >
                                                                {" "}
                                                                {item3[0]}
                                                              </span>{" "}
                                                              {""}
                                                              <span
                                                                style={{
                                                                  color:
                                                                    "orange",
                                                                  margin:
                                                                    "20px",
                                                                }}
                                                              >
                                                                {item3[1]}
                                                              </span>
                                                            </div>
                                                          );
                                                        }
                                                      )
                                                    )}
                                                  </>
                                                )}

                                                {index == 4 && (
                                                  <>
                                                    {Object.values(Card5_Data)
                                                      .length < 1 ? (
                                                      <div>Data Not Found</div>
                                                    ) : (
                                                      Card_Data5.map(
                                                        (item4, index4) => {
                                                          return (
                                                            <div
                                                              style={{
                                                                margin:
                                                                  "0 0 40px 0",
                                                              }}
                                                              key={index4}
                                                            >
                                                              <span
                                                                style={{
                                                                  color:
                                                                    "purple",
                                                                  margin:
                                                                    "20px",
                                                                }}
                                                              >
                                                                {" "}
                                                                {item4[0]}
                                                              </span>{" "}
                                                              {""}
                                                              <span
                                                                style={{
                                                                  color:
                                                                    "yellow",
                                                                  margin:
                                                                    "20px",
                                                                }}
                                                              >
                                                                {item4[1]}
                                                              </span>
                                                            </div>
                                                          );
                                                        }
                                                      )
                                                    )}
                                                  </>
                                                )}
                                              </h6>
                                            </div>
                                          </CardBody>
                                        </Card>
                                      </div>
                                    </Col>
                                  </>
                                );
                              })}
                            </>
                          ) : null}
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
                              {/* <Card>
                                <CardTitle> */}
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
                              {/* </CardTitle>
                                <CardBody> */}
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
                              {/* </CardBody>
                              </Card> */}
                            </div>
                          </Col>
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

export default HistoryTab;
