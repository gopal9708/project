import React, { useState } from "react";
import PageTitle from "../../../components/pageTitle/PageTitle";
import Title from "../../../components/title/Title";
import {
  CardTitle,
  Row,
  Form,
  Table,
  CardText,
  Col,
  CardBody,
  Card,
} from "reactstrap";
import { IconContext } from "react-icons";
import { MdAddCircleOutline, MdRemoveCircleOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Report = () => {
  const navigate = useNavigate();
  const [circle_btn, setcircle_btn] = useState(true);

  const toggle_circle = () => {
    setcircle_btn(!circle_btn);
    console.log("circle_btn");
  };

  const [circle_btn1, setcircle_btn1] = useState(true);

  const toggle_circle1 = () => {
    setcircle_btn1(!circle_btn1);
    // console.log("circle_btn");
  };

  const [circle_btn2, setcircle_btn2] = useState(true);

  const toggle_circle2 = () => {
    setcircle_btn2(!circle_btn2);
    // console.log("circle_btn");
  };

  return (
    <div>
      {/* <form> */}
        <PageTitle page="Reports" />
        <Title title="Reports" parent_title="Analytics" />
        <div className="m-4">
          <div className=" mb-2 main-header"></div>
          <Row>
            <Col lg={6} md={6} sm={12}>
              <Card className="shadow bg-white rounded">
                <CardTitle className="mb-1 header">
                  <div className="header-text-icon header-text">
                    Orders
                    <div></div>
                    <IconContext.Provider
                      value={{
                        className: "header-add-icon",
                      }}
                    >
                      <div onClick={toggle_circle}>
                        {circle_btn ? (
                          <MdAddCircleOutline />
                        ) : (
                          <MdRemoveCircleOutline />
                        )}
                      </div>
                    </IconContext.Provider>
                  </div>
                </CardTitle>
                {circle_btn ? (
                  <CardBody>
                    <Form>
                      <Row>
                        <Table hover>
                          <Row>
                            {/* Detailed Report(MIS) */}
                            <div className="list" style={{ cursor: "pointer" }}>
                              <Card body
                              onClick={() => navigate("/analytics/reports/MisDetailedReport")}
                              >
                                <CardTitle tag="h5">
                                  Detailed Report(MIS)
                                </CardTitle>
                                <CardText>
                                  Summary of all the details associated with
                                  Detailed Report(MIS)
                                </CardText>
                              </Card>
                            </div>
                            {/* Incoming Detailed Report(MIS) */}
                            <div className="list" style={{ cursor: "pointer" }}>
                              <Card
                                body
                                onClick={() =>
                                  navigate(
                                    "/analytics/reports/IncomingDetailReport"
                                  )
                                }
                              >
                                <CardTitle tag="h5">
                                    Incoming Detailed Report(MIS)
                                </CardTitle>
                                <CardText>
                                Summary of all the details associated with
                                  Incoming Detailed Report(MIS)
                                </CardText>
                              </Card>
                            </div>
                            {/* Pending Status Report */}
                            <div className="list" style={{ cursor: "pointer" }}>
                                <Card body
                                onClick={() => navigate("/analytics/reports/PendingStatusReport")}
                                >
                                <CardTitle tag="h5">
                                    Pending Status Report
                                </CardTitle>
                                <CardText>
                                Summary of all the details associated with
                                  Pending Status Report
                                </CardText>
                                </Card>
                            </div>
                            {/* User Report */}
                            <div className="list" style={{ cursor: "pointer" }}>
                                <Card body
                                onClick={() => navigate("/analytics/reports/UserReport")}
                                >
                                    <CardTitle tag="h5">User Report</CardTitle>
                                    <CardText>
                                        Summary of all the details associated with 
                                          User Report
                                    </CardText> 
                                </Card>
                            </div>
                            {/* Branch Report */}
                            <div className="list" style={{ cursor: "pointer" }}>
                                <Card body 
                                onClick={() => navigate("/analytics/reports/BranchReport")}
                                >
                                    <CardTitle tag="h5">Branch Report</CardTitle>
                                    <CardText>
                                        Summary of all the details associated with
                                          Branch Report
                                    </CardText>
                                </Card>
                            </div>
                            {/* Vendor Bill Report */}
                            <div className="list" style={{ cursor: "pointer" }}>
                                <Card body
                                onClick={() => navigate("/analytics/reports/VendorReport")}
                                >
                                    <CardTitle tag="h5">Vendor Bill Report</CardTitle>
                                    <CardText>
                                        Summary of all the details associated with
                                          Vendor Bill Report
                                    </CardText>  
                                </Card> 
                            </div>
                            {/* Airport Order Report */}
                            <div className="list" style={{ cursor: "pointer" }}>
                                <Card body
                                onClick={() => navigate("/analytics/reports/AirportOrderReport")}
                                >
                                    <CardTitle tag="h5">Airport Order Report</CardTitle>
                                    <CardText>
                                        Summary of all the details associated with
                                          Airport Order Report
                                    </CardText>  
                                </Card> 
                            </div>
                          </Row>
                        </Table>
                      </Row>
                    </Form>
                  </CardBody>
                ) : null}
              </Card>
            </Col>
            {/* Runsheet Reports */}
            <Col lg={6} md={6} sm={12}>
                <Card className="shadow bg-white rounded">
                    <CardTitle className="mb-1 header">
                        <div className="header-text-icon header-text">
                        Runsheets
                        <div></div>
                        <IconContext.Provider
                      value={{
                        className: "header-add-icon",
                      }}
                    >
                        <div onClick={toggle_circle1}>
                        {circle_btn1 ? (
                          <MdAddCircleOutline />
                        ) : (
                          <MdRemoveCircleOutline />
                        )}
                      </div>
                        </IconContext.Provider>
                    </div>
                    </CardTitle>
                    {circle_btn1 ? (
                        <CardBody>
                            <Form>
                                <Row>
                                    {/* Select Branch */}
                                    <Table hover>
                                        <Row>
                                            {/* Local Runsheet Report */}
                                            <div className="list" style={{ cursor: "pointer" }}>
                                            <Card body
                                             onClick={() => navigate("/analytics/reports/RunsheetReport/LocalRunsheetReport")}
                                            >
                                                <CardTitle tag="h5">
                                                    Local Runsheet Report
                                                </CardTitle>
                                                <CardText>
                                                Summary of all the details associated with
                                                  Local Runsheet Report
                                                </CardText>
                                            </Card>
                                
                                            </div>
                                            {/* Local Runsheet Report2
                                            <div className="list" style={{ cursor: "pointer" }}>
                                            <Card body>
                                                <CardTitle tag="h5">
                                                    Local Runsheet Report2
                                                </CardTitle>
                                                <CardText>
                                                Summary of all the details associated with
                                                  Local Runsheet Report2
                                                </CardText>
                                            </Card>
                                
                                            </div> */}
                                            {/* Local Runsheet Report3
                                            <div className="list" style={{ cursor: "pointer" }}>
                                            <Card body>
                                                <CardTitle tag="h5">
                                                    Local Runsheet Report3
                                                </CardTitle>
                                                <CardText>
                                                Summary of all the details associated with
                                                  Local Runsheet Report3
                                                </CardText>
                                            </Card>
                                
                                            </div> */}
                                            {/* Local Runsheet Report4
                                            <div className="list" style={{ cursor: "pointer" }}>
                                            <Card body>
                                                <CardTitle tag="h5">
                                                    Local Runsheet Report4
                                                </CardTitle>
                                                <CardText>
                                                Summary of all the details associated with
                                                  Local Runsheet Report4
                                                </CardText>
                                            </Card>
                                
                                            </div> */}
                                        </Row>
                                    </Table>
                                </Row>
                            </Form>
                        </CardBody>
                    ) : null}
                </Card>

                {/* <div className="m-4"> */}
                <div className=" mb-2 main-header"></div>
                {/* <Row> */}
                {/* <Col lg={6} md={6} sm={12}> */}
                    <Card className="shadow bg-white rounded">
                        <CardTitle className="mb-1 header">
                            <div className="header-text-icon header-text">
                                Manifest
                            <div></div>
                            <IconContext.Provider
                                value={{
                                    className: "header-add-icon",
                                }}
                                >
                                    <div onClick={toggle_circle2}>
                                        {circle_btn2 ? (
                                        <MdAddCircleOutline />
                                        ) : (
                                        <MdRemoveCircleOutline />
                                        )}
                                    </div>
                                </IconContext.Provider>
                            </div>
                        </CardTitle>
                        {circle_btn2 ? (
                            <CardBody>
                                <Form>
                                    <Row>
                                      <Table hover>
                                        <Row>
                                        <div className="list" style={{ cursor: "pointer" }}>
                                            <Card body 
                                            onClick={() => navigate("/analytics/reports/ColoaderReport")}
                                            >
                                                <CardTitle tag="h5">Coloader Report</CardTitle>
                                                <CardText>
                                                    Summary of all the details associated with
                                                    Coloader Report
                                                </CardText>
                                            </Card>
                                        </div>
                                        {/* Weight Difference Report */}
                                        <div className="list" style={{ cursor: "pointer" }}>
                                        <Card body 
                                        onClick={() => navigate("/analytics/reports/WeightDiffReport")}
                                        >
                                            <CardTitle tag="h5">Weight Difference Report</CardTitle>
                                            <CardText>
                                            Summary of all the details associated with
                                                Weight Difference Report
                                            </CardText>
                                        </Card>  
                                        </div>
                                        </Row>
                                      </Table>
                                        
                                    </Row>
                                </Form>
                            </CardBody>
                             ) : null}
                    </Card>
                {/* </Col> */}
            {/* </Row> */}
            {/* </div> */}
            </Col>
          </Row>
        </div>
        {/* Manifest Reports  */}
        {/* <div className="m-4">
            <div className=" mb-2 main-header"></div>
            <Row>
                <Col lg={6} md={6} sm={12}>
                    <Card className="shadow bg-white rounded">
                        <CardTitle className="mb-1 header">
                            <div className="header-text-icon header-text">
                                Manifest
                            <div></div>
                            <IconContext.Provider
                                value={{
                                    className: "header-add-icon",
                                }}
                                >
                                    <div onClick={toggle_circle2}>
                                        {circle_btn2 ? (
                                        <MdAddCircleOutline />
                                        ) : (
                                        <MdRemoveCircleOutline />
                                        )}
                                    </div>
                                </IconContext.Provider>
                            </div>
                        </CardTitle>
                        {circle_btn2 ? (
                            <CardBody>
                                <Form>
                                    <Row>
                                        <div className="list" style={{ cursor: "pointer" }}>
                                            <Card body 
                                            onClick={() => navigate("/analytics/reports/ColoaderReport")}
                                            >
                                                <CardTitle tag="h5">Coloader Report</CardTitle>
                                                <CardText>
                                                    Summary of all the details associated with
                                                    Coloader Report
                                                </CardText>
                                            </Card>
                                        </div>
                                        {/* Weight Difference Report */}
                                        {/* <div className="list" style={{ cursor: "pointer" }}>
                                        <Card body 
                                        onClick={() => navigate("/analytics/reports/WeightDiffReport")}
                                        >
                                            <CardTitle tag="h5">Weight Difference Report</CardTitle>
                                            <CardText>
                                            Summary of all the details associated with
                                                Weight Difference Report
                                            </CardText>
                                        </Card>  
                                        </div>
                                    </Row>
                                </Form>
                            </CardBody>
                             ) : null}
                    </Card>
                </Col>
            </Row>
        </div> */} 
      {/* </form> */}
    </div>
  );
};

export default Report;
