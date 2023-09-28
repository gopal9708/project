import React, { useState, useLayoutEffect } from "react";

// import useWindowDimensions from "../ScreenSize";

import { MdDashboard } from "react-icons/md";
import { IoMdInformationCircleOutline } from "react-icons/io";
// import "bootstrap/dist/css/bootstrap.css";
import "./Client.scss";
import "./OrderDetail.css"
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
} from "reactstrap";

import { useSelector } from "react-redux";
import { ServerAddress } from "../../../constants/ServerAddress";
import axios from "axios";

const OrderDetails = () => {
  const [width, height] = useState();
  const accessToken = useSelector((state) => state.authentication.access_token);

  const [cold_chain_incoming, setcold_chain_incoming] = useState("");
  const [cold_chain_outgoing, setcold_chain_outgoing] = useState("");

  const [ougoing_order, setougoing_order] = useState("");
  const [delivery_order, setdelivery_order] = useState("");
  const [pending_order, setpending_order] = useState("");

  const [income_order_incoming, setincome_order_incoming] = useState("");
  const [income_deliverd_order, setincome_deliverd_order] = useState("");
  const [income_pending_order, setincome_pending_order] = useState("");


  const [manifest_income_recived, setmanifest_income_recived] = useState("");
  const [manifest_income_Nrecived, setmanifest_income_Nrecived] = useState("");

  const [manifest_outgoing_recived, setmanifest_outgoing_recived] = useState("")
  const [manifest_outgoing_Nrecived, setmanifest_outgoing_Nrecived] = useState("");
  //-------------------------Cold Chain Order------------------------

  const [delay_incom_24, setdelay_incom_24] = useState("");
  const [delay_outgoing_24, setdelay_outgoing_24] = useState("");

  const [Delay_incoming_48, setdelay_incom_48] = useState("");
  const [Delay_outgoing_48, setdelay_outgoing_48] = useState("");
  //-------------------Manifest state------------------------//
  // const [Manifest_incom, setManifest_incom] = useState("");
  // const [Manifest_outgoing, setManifest_outgoing] = useState("");

  // const [manifest_out_rescive, setmanifest_out_rescive] = useState("");
  // const [manifest_income_nrecived, setmanifest_income_nrecived] = useState("");


  const get_daily_detail = async () => {
    try {
      const resp = await axios.get(
        ServerAddress + "analytic/get_dailyDetailedDashboard/",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      // console.log("daily deatils-----", resp.data);
      if (resp.data.cold_chain_order.length > 0) {
        let cold_income = resp.data.cold_chain_order[0];
        let cold_outgoing = resp.data.cold_chain_order[1];
        setcold_chain_incoming(cold_income.cold_chain_incoming);
        setcold_chain_outgoing(cold_outgoing.cold_chain_outgoing)

      }
      if (resp.data.outgoing_order.length > 0) {
        let out_going_order = resp.data.outgoing_order[0];
        let delivery_order = resp.data.outgoing_order[1];;
        let pending_order = resp.data.outgoing_order[2];
        setougoing_order(out_going_order.outgoing_order);
        setdelivery_order(delivery_order.delivered_order);
        setpending_order(pending_order.pending_order);

      }

      if (resp.data.incoming_order.length > 0) {
        let incom_orde = resp.data.incoming_order[0];
        let income_deliv = resp.data.incoming_order[1];
        let income_pending = resp.data.incoming_order[2];

        setincome_order_incoming(incom_orde.incoming_order);
        setincome_deliverd_order(income_deliv.delivered_order);
        setincome_pending_order(income_pending.pending_order);

      }

      if (resp.data.manifest_order.length > 0) {
        let manifest_recived = resp.data.manifest_order[0];
        let manifest_not_recived = resp.data.manifest_order[1];

        setmanifest_income_recived(manifest_recived.incoming_manifest_recieved);
        setmanifest_income_Nrecived(manifest_not_recived.incoming_manifest_notrecived);

      }

      if (resp.data.manifest_order.length > 0) {
        let manifest_out_rescive = resp.data.manifest_order[2];
        let manifest_not_out_rescive = resp.data.manifest_order[3];

        setmanifest_outgoing_recived(manifest_out_rescive.outgoing_manifest_recieved);
        setmanifest_outgoing_Nrecived(manifest_not_out_rescive.outgoing_manifest_notrecieved);
      }

      if (resp.data.delay_cold_chain_order.length > 0) {
        let Delay_incoming_24 = resp.data.delay_cold_chain_order[0];
        // console.log("delayed_chain_", resp.data.delay_cold_chain_order)
        let Delay_outgoing_24 = resp.data.delay_cold_chain_order[1];

        let Delay_incoming_48 = resp.data.delay_cold_chain_order[2];
        let Delay_outgoing_48 = resp.data.delay_cold_chain_order[3];

        setdelay_incom_24(Delay_incoming_24.delay24_incoming_order);
        setdelay_outgoing_24(Delay_outgoing_24.delay24_outgoing_order);
        setdelay_incom_48(Delay_incoming_48.delay48_incoming_order);
        setdelay_outgoing_48(Delay_outgoing_48.delay48_outgoing_order);

      }

    } catch (err) {
      alert(`Error Occur in , ${err}`);
    }
  };
  // console.log("res =====>>", delay_incom_24);


  const get_daily_status_detail = async () => {
    try {
      const resp = await axios.get(
        ServerAddress + "analytic/get_dailyDetailedDashboard/",
        // ServerAddress + "analytic/get_dailyStatusDashboard/",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

    } catch (err) {
      alert(`Error Occur in , ${err}`);
    }
  };
  useLayoutEffect(() => {
    get_daily_detail();
    get_daily_status_detail();
  }, []);



  return (
    <>
      <div style={{ width: width, margin: "20px" }}>
        <div
          style={{
            textAlign: "center",
            fontSize: "32px",
            fontFamily: "Georgia",
            display: "flex",
            postion: "relative",
            padding: "inherit",
            margin: "inherit",
          }}
        >
          Outgoing Orders
        </div>
        <Col lg={12}>
          <Row style={{ display: "flex" }}>
            {" "}
            <Col lg={4}>
              <Card style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                <CardBody>
                  <div className="d-flex flex-wrap">
                    <div className="me-3">
                      <h6 className="text-muted mb-2">OUTGOING ORDERS</h6>
                      <span className="order_api">{ougoing_order}</span>
                      <p
                        style={{
                          fontSize: "11px",
                          fontWeight: "bold",
                          color: "#0078AA",
                        }}
                      >
                        More Info{" "}
                        <span>
                          {" "}
                          <IoMdInformationCircleOutline />
                        </span>
                      </p>
                    </div>

                    <div className="avatar-sm ms-auto">
                      <div className="avatar-title bg-light rounded-circle text-primary font-size-20">
                        <i className="icon2" style={{ color: "#0078AA" }}>
                          <MdDashboard />{" "}
                        </i>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg={4}>
              <Card
                className="mini-stats-wid"
                style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
              >
                <CardBody>
                  <div className="d-flex flex-wrap">
                    <div className="me-3">
                      <h6 className="text-muted mb-2">DELIVERED ORDERS</h6>
                      <span className="order_api">{delivery_order}</span>
                      <p
                        style={{
                          fontSize: "11px",
                          fontWeight: "bold",
                          color: "#54B435",
                        }}
                      >
                        More Info{" "}
                        <span>
                          {" "}
                          <IoMdInformationCircleOutline />
                        </span>{" "}
                      </p>
                    </div>

                    <div className="avatar-sm ms-auto">
                      <div className="avatar-title bg-light rounded-circle text-primary font-size-20">
                        <i className="icon3" style={{ color: "#54B435" }}>
                          <MdDashboard />{" "}
                        </i>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg={4}>
              <Card
                className="mini-stats-wid"
                style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
              >
                <CardBody>
                  <div className="d-flex flex-wrap">
                    <div className="me-3">
                      <h6 className="text-muted mb-0.5">PENDING ORDERS</h6>
                      <span className="order_api">{pending_order}</span>
                      <p
                        style={{
                          fontSize: "11px",
                          fontWeight: "bold",
                          color: "#E64848",
                        }}
                      >
                        More Info{" "}
                        <span>
                          {" "}
                          <IoMdInformationCircleOutline />
                        </span>{" "}
                      </p>
                    </div>

                    <div className="avatar-sm ms-auto">
                      <div className="avatar-title bg-light rounded-circle text-primary font-size-20">
                        <i className="icon4" style={{ color: "#E64848" }}>
                          <MdDashboard />{" "}
                        </i>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Col>
      </div>

      <div style={{ width: width, margin: "20px" }}>
        <div
          style={{
            textAlign: "center",
            fontSize: "32px",
            fontFamily: "Georgia",
            display: "flex",
            postion: "relative",
            padding: "inherit",
            margin: "inherit",
          }}
        >
          Incoming Orders
        </div>
        <Col lg={12}>
          <Row style={{ display: "flex" }}>
            {" "}
            <Col lg={4}>
              <Card style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                <CardBody>
                  <div className="d-flex flex-wrap">
                    <div className="me-3">
                      <h6 className="text-muted mb-2">INCOMING ORDERS</h6>
                      <span className="order_api">{income_order_incoming}</span>
                      <p
                        style={{
                          fontSize: "11px",
                          fontWeight: "bold",
                          color: "#0078AA",
                        }}
                      >
                        More Info{" "}
                        <span>
                          {" "}
                          <IoMdInformationCircleOutline />
                        </span>{" "}
                      </p>
                    </div>

                    <div className="avatar-sm ms-auto">
                      <div className="avatar-title bg-light rounded-circle text-primary font-size-20">
                        <i className="icon2" style={{ color: "#0078AA" }}>
                          <MdDashboard />{" "}
                        </i>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg={4}>
              <Card
                className="mini-stats-wid"
                style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
              >
                <CardBody>
                  <div className="d-flex flex-wrap">
                    <div className="me-3">
                      <h6 className="text-muted mb-2">DELIVERED ORDERS</h6>
                      <span className="order_api">{income_deliverd_order}</span>
                      <p
                        style={{
                          fontSize: "11px",
                          fontWeight: "bold",
                          color: "#54B435",
                        }}
                      >
                        More Info{" "}
                        <span>
                          {" "}
                          <IoMdInformationCircleOutline />
                        </span>{" "}
                      </p>
                    </div>

                    <div className="avatar-sm ms-auto">
                      <div className="avatar-title bg-light rounded-circle text-primary font-size-20">
                        <i className="icon3" style={{ color: "#54B435" }}>
                          <MdDashboard />{" "}
                        </i>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg={4}>
              <Card
                className="mini-stats-wid"
                style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
              >
                <CardBody>
                  <div className="d-flex flex-wrap">
                    <div className="me-3">
                      <h6 className="text-muted mb-0.5">PENDING ORDERS</h6>
                      <span className="order_api">{income_pending_order}</span>
                      <p
                        style={{
                          fontSize: "11px",
                          fontWeight: "bold",
                          color: "#E64848",
                        }}
                      >
                        More Info{" "}
                        <span>
                          {" "}
                          <IoMdInformationCircleOutline />
                        </span>{" "}
                      </p>
                    </div>

                    <div className="avatar-sm ms-auto">
                      <div className="avatar-title bg-light rounded-circle text-primary font-size-20">
                        <i className="icon4" style={{ color: "#E64848" }}>
                          <MdDashboard />{" "}
                        </i>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Col>
      </div>

      <div style={{ width: width, margin: "10px", display: "flex", flexWrap: "wrap" }}>
        <div
          style={{
            textAlign: "center",
            fontSize: "2rem",
            fontFamily: "Georgia",
            display: "flex",
            postion: "relative",
            padding: "inherit",
            margin: "inherit",
          }}
        >
          Cold Chain Orders
          <span
            style={{ display: "flex", position: "relative", left: "10rem" }}
          >
            Delay Orders
          </span>
        </div>
        <Row>
          <Col lg={4}>
            <Card style={{ background: "transparent", boxShadow: "none" }}>
              <CardBody>
                <Row>
                  <Col lg={6}>
                    <Card
                      className="mini-stats-wid"
                      style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
                    >
                      <CardBody>
                        <div className="d-flex flex-wrap">
                          <div className="me-3">
                            <h6 className="text-muted mb-0.2">
                              INCOMING ORDERS{" "}
                              <i className="icon4" style={{ color: "#59CE8F" }}>
                                <MdDashboard />{" "}
                              </i>
                              <span className="order_api">{cold_chain_incoming}</span>
                            </h6>
                            <span
                              style={{
                                fontSize: "11px",
                                fontWeight: "bold",
                                color: "#7DB9B6",
                              }}
                            >
                              More Info{" "}
                              <span>
                                {" "}
                                <IoMdInformationCircleOutline />
                              </span>{" "}
                            </span>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg={6}>
                    <Card
                      className="mini-stats-wid"
                      style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
                    >
                      <CardBody>
                        <div className="d-flex flex-wrap">
                          <div className="me-3">
                            <h6 className="text-muted mb-0.2">
                              OUTGOING ORDERS{" "}
                              <i className="icon4" style={{ color: "#66BFBF" }}>
                                <MdDashboard />{" "}
                              </i>
                              <span className="order_api">{cold_chain_outgoing}</span>
                            </h6>
                            <span
                              style={{
                                fontSize: "11px",
                                fontWeight: "bold",
                                color: "#609966",
                              }}
                            >
                              More Info{" "}
                              <span>
                                {" "}
                                <IoMdInformationCircleOutline />
                              </span>{" "}
                            </span>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>

          <Col lg={8}>
            <Card style={{ background: "transparent", boxShadow: "none" }}>
              <CardBody>
                <Row>
                  <Col lg={3}>
                    <Card
                      className="mini-stats-wid"
                      style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
                    >
                      <CardBody>
                        <div className="d-flex flex-wrap">
                          <div className="me-1">
                            <h6 className="text-muted mb-0.1">
                              INCOMING ORDERS 24 hrs{" "}
                              <i className="icon4" style={{ color: "#59CE8F" }}>
                                <MdDashboard />{" "}
                              </i>
                              <span className="order_api">{delay_incom_24}</span>

                            </h6>
                            <span
                              style={{
                                fontSize: "11px",
                                fontWeight: "bold",
                                color: "#181823",
                              }}
                            >
                              More Info{" "}
                              <span>
                                {" "}
                                <IoMdInformationCircleOutline />
                              </span>{" "}
                            </span>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg={3}>
                    <Card
                      className="mini-stats-wid"
                      style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
                    >
                      <CardBody>
                        <div className="d-flex flex-wrap">
                          <div className="me-3">
                            <h6 className="text-muted mb-0.2">
                              OUTGOING ORDERS 24 hrs{" "}

                              <i className="icon4" style={{ color: "#66BFBF" }}>
                                <MdDashboard />{" "}
                              </i>
                              <span className="order_api">{delay_outgoing_24}</span>
                            </h6>
                            <span
                              style={{
                                fontSize: "11px",
                                fontWeight: "bold",
                                color: "#181823",
                              }}
                            >
                              More Info{" "}
                              <span>
                                {" "}
                                <IoMdInformationCircleOutline />
                              </span>{" "}
                            </span>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg={3}>
                    <Card
                      className="mini-stats-wid"
                      style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
                    >
                      <CardBody>
                        <div className="d-flex flex-wrap">
                          <div className="me-3">
                            <h6 className="text-muted mb-0.2">
                              INCOMING ORDERS 48 hrs{" "}

                              <i className="icon4" style={{ color: "#59CE8F" }}>
                                <MdDashboard />{" "}
                              </i>
                              <span className="order_api">{Delay_incoming_48}</span>
                            </h6>
                            <span
                              style={{
                                fontSize: "11px",
                                fontWeight: "bold",
                                color: "#181823",
                              }}
                            >
                              More Info{" "}
                              <span>
                                {" "}
                                <IoMdInformationCircleOutline />
                              </span>{" "}
                            </span>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg={3}>
                    <Card
                      className="mini-stats-wid"
                      style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
                    >
                      <CardBody>
                        <div className="d-flex flex-wrap">
                          <div className="me-3">
                            <h6 className="text-muted mb-0.2">
                              OUTGOING ORDERS 48 hrs{" "}

                              <i className="icon4" style={{ color: "#66BFBF" }}>
                                <MdDashboard />{" "}
                              </i>
                              <span className="order_api">{Delay_outgoing_48}</span>
                            </h6>
                            <span
                              style={{
                                fontSize: "11px",
                                fontWeight: "bold",
                                color: "#181823",
                              }}
                            >
                              More Info{" "}
                              <span>
                                {" "}
                                <IoMdInformationCircleOutline />
                              </span>{" "}
                            </span>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

      <div style={{ width: width, margin: "20px" }}>
        <div
          style={{
            textAlign: "center",
            fontSize: "32px",
            fontFamily: "Georgia",
            display: "flex",
            postion: "relative",
            padding: "inherit",
            marginTop: "-20px",
          }}
        >
          Manifest Orders
        </div>
        <Row>
          <Col lg={6}>
            <Card style={{ background: "transparent", boxShadow: "none" }}>
              <CardBody>
                <CardTitle
                  style={{ textAlign: "center", marginBottom: "20px" }}
                >
                  Incoming Orders
                </CardTitle>
                <Row>
                  <Col lg={6}>
                    <Card
                      className="mini-stats-wid"
                      style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
                    >
                      <CardBody>
                        <div className="d-flex flex-wrap">
                          <div className="me-3">
                            <h6 className="text-muted mb-0.2">
                              RECEIVED{" "}
                              <i className="icon4" style={{ color: "#5FD068" }}>
                                <MdDashboard />{" "}
                              </i>
                              <span className="order_api">{manifest_income_recived}</span>

                            </h6>
                            <span
                              style={{
                                fontSize: "11px",
                                fontWeight: "bold",
                                color: "#A7727D",
                              }}
                            >
                              More Info{" "}
                              <span>
                                {" "}
                                <IoMdInformationCircleOutline />
                              </span>{" "}
                            </span>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg={6}>
                    <Card
                      className="mini-stats-wid"
                      style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
                    >
                      <CardBody>
                        <div className="d-flex flex-wrap">
                          <div className="me-3">
                            <h6 className="text-muted mb-0.2">
                              NOT RECEIVED{" "}
                              <i className="icon4" style={{ color: "#E64848" }}>
                                <MdDashboard />{" "}
                              </i>
                              <span className="order_api">{manifest_income_Nrecived}</span>

                            </h6>
                            <span
                              style={{
                                fontSize: "11px",
                                fontWeight: "bold",
                                color: "#609966",
                              }}
                            >
                              More Info{" "}
                              <span>
                                {" "}
                                <IoMdInformationCircleOutline />
                              </span>{" "}
                            </span>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>

          <Col lg={6}>
            <Card style={{ background: "transparent", boxShadow: "none" }}>
              <CardBody>
                <CardTitle
                  style={{ textAlign: "center", marginBottom: "20px" }}
                >
                  Outgoing Orders
                </CardTitle>
                <Row>
                  <Col lg={6}>
                    <Card
                      className="mini-stats-wid"
                      style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
                    >
                      <CardBody>
                        <div className="d-flex flex-wrap">
                          <div className="me-1">
                            <h6 className="text-muted mb-0.1">
                              RECEIVED{" "}
                              <i className="icon4" style={{ color: "#5FD068" }}>
                                <MdDashboard />{" "}
                              </i>
                              <span className="order_api">{manifest_outgoing_recived}</span>
                            </h6>
                            <span
                              style={{
                                fontSize: "11px",
                                fontWeight: "bold",
                                color: "#A7727D",
                              }}
                            >
                              More Info{" "}
                              <span>
                                {" "}
                                <IoMdInformationCircleOutline />
                              </span>{" "}
                            </span>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg={6}>
                    <Card
                      className="mini-stats-wid"
                      style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
                    >
                      <CardBody>
                        <div className="d-flex flex-wrap">
                          <div className="me-3">
                            <h6 className="text-muted mb-0.2">
                              NOT RECEIVED{" "}
                              <i className="icon4" style={{ color: "#E64848" }}>
                                <MdDashboard />{" "}
                              </i>
                              <span className="order_api">{manifest_outgoing_Nrecived}</span>
                            </h6>
                            <span
                              style={{
                                fontSize: "11px",
                                fontWeight: "bold",
                                color: "#F99417",
                              }}
                            >
                              More Info{" "}
                              <span>
                                {" "}
                                <IoMdInformationCircleOutline />
                              </span>{" "}
                            </span>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default OrderDetails;
