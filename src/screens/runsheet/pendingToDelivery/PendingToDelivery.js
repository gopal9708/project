import React, { useState, useEffect } from "react";
import "../../../assets/scss/forms/form.scss";
import { Card, Col, Row, CardBody, CardTitle } from "reactstrap";
import axios from "axios";
import { useSelector } from "react-redux";
import CreateRunsheet from "./CreateRunsheet";
import SearchList from "../../../components/listDisplay/searchList/SearchList";
import UnrunsheetsDataFormat from "../../../data/runsheets/pendingToDelivery/Unrunsheets/UnrunsheetsDataFormat";
import Title from "../../../components/title/Title";
import PageTitle from "../../../components/pageTitle/PageTitle";
import { ServerAddress } from "../../../constants/ServerAddress";
import PendingDeliveryDataFormat from "../../../data/runsheets/pendingToDelivery/Runsheets/PendingDeliveryDataFormat";
import Navigate from "../runsheetTab/Navigate";

const PendingToDelivery = () => {
  // Additional Fields
  const accessToken = useSelector((state) => state.authentication.access_token);
  const [local_list, setlocal_list] = useState([]);

  const [createRunsheet_list, setcreateRunsheet_list] = useState([]);
  const [issuereceived_total, setreceived_total] = useState()
  const [issuenon_received_total, setissuenon_received_total] = useState()
  const [total_pieces, settotal_pieces] = useState()

  const [awbno_list, setawbno_list] = useState([]);
  const [docket_no, setdocket_no] = useState([])

  const remove_transfer_list = (index) => {
    let remove_list = createRunsheet_list;
    let remove = remove_list[index];

    let remove_list1 = local_list;
    remove_list1.push(remove);
    setlocal_list(remove_list1);
    setcreateRunsheet_list(
      createRunsheet_list.filter((data) => data !== remove)
    );
  };
  const transfer_list = (index) => {
    let temp_list = local_list;
    let item = temp_list[index];
    let temp_list1 = createRunsheet_list;
    temp_list1.push(item);
    setcreateRunsheet_list(temp_list1);
    setlocal_list(local_list.filter((data) => data !== item));
  };

  const getPendindOrders = () => {
    axios
      .get(ServerAddress + `runsheet/get_localorder/`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        setlocal_list(response.data);
      })
      .catch((err) => {
        alert(`Error Occur in Get state , ${err}`);
      });
  };
  useEffect(() => {
    getPendindOrders();
  }, []);

  useEffect(() => {
    if (createRunsheet_list.length !== 0) {
      let awb_no_list = [];
      let docket_no = [];
      let received = []
      let sum_received = []
      let non_received = []
      let sum_nonreceived = []
      let total_pkt=[]

      console.log("createRunsheet_list======", createRunsheet_list)
      for (let index = 0; index < createRunsheet_list.length; index++) {
        const loc = createRunsheet_list[index];
        awb_no_list.push(loc.id);
        docket_no.push(loc.docket_no);
        received.push(loc.issue)
        non_received.push(loc.issue_notreceived)
        total_pkt.push(loc.total_quantity)
      }
      console.log("a---len-------", received)
      for (let index = 0; index < received.length; index++) {
        const element = received[index];
        sum_received.push(element.length)
      }
      for (let index = 0; index < non_received.length; index++) {
        const element = non_received[index];
        sum_nonreceived.push(element.length)
      }
      const sumrec = sum_received.reduce((acc, curr) => acc + curr, 0);
      const sumnonrec = sum_nonreceived.reduce((acc, curr) => acc + curr, 0);
      const total_pcs = total_pkt.reduce((acc, curr) => acc + curr, 0);
      console.log("total_pcs--------", total_pcs)
      setreceived_total(sumrec)
      setissuenon_received_total(sumnonrec)
      setawbno_list(awb_no_list);
      setdocket_no(docket_no)
      settotal_pieces(total_pcs)
    } else {
      setawbno_list([]);
    }

  }, [createRunsheet_list, local_list]);

  return (
    <>
      {/* <form> */}
      <Navigate />
      <Title title="Pending For Delivery" parent_title="Runsheet" />
      <PageTitle page="Pending For Delivery" />
      <div className="mt-0 m-3">
        <Col lg={12}>
          <Card className="shadow bg-white rounded">
            <CardTitle
              className="mb-1 header"
              style={{
                textAlign: "center",
                fontWeight: 600,
                fontSize: 18,
              }}
            >
              Local Order
            </CardTitle>

            <CardBody style={{ paddingTop: "0px" }}>
              <Row>
                <div
                  className="container-fluid "
                  style={{ background: "white", height: "290px" }}
                >
                  <div className="mb-2 row ">
                    <div className="col-sm-4">
                      <SearchList />
                    </div>
                  </div>
                  <PendingDeliveryDataFormat
                    local_list={local_list}
                    check={transfer_list}
                  />
                </div>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </div>
      <div className="m-3">
        <Col lg={12}>
          <Card className="shadow bg-white rounded">
            <CardTitle
              className="mb-1 header"
              style={{
                fontWeight: 600,
                textAlign: "center",
                fontSize: 18,
              }}
            >
              Create Runsheet
            </CardTitle>

            <CardBody style={{ paddingTop: "5px" }}>
              <Row>
                <Col lg={4}>
                  <CreateRunsheet awb_numbers={awbno_list} docket_no={docket_no} issuereceived_total={issuereceived_total} issuenon_received_total={issuenon_received_total} total_pieces={total_pieces}/>
                </Col>
              </Row>

              <Row>
                <div
                  className="container-fluid "
                  style={{
                    background: "white",
                    height: "290px",
                    marginTop: "20px",
                  }}
                >
                  {/* DataTable */}
                  <UnrunsheetsDataFormat
                    Manifest_list={createRunsheet_list}
                    remove_list={remove_transfer_list}
                  />
                </div>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </div>
      {/* </form> */}
    </>
  );
};

export default PendingToDelivery;
