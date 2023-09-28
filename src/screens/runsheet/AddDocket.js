/* eslint-disable */
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
// import Search_list from "../../../components/List_Display/Search_list";
import { Card, Col, Row, CardBody } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { ServerAddress } from "../../constants/ServerAddress";
import SearchList from "../../components/listDisplay/searchList/SearchList";
import AllDocketsDataFormat from "../../data/runsheets/allDockets/AllDockets/AllDocketsDataFormat";
import CreatedDocketDataFormat from "../../data/runsheets/allDockets/CreatedDockets/CreatedDocketDataFormat";
import {
  setAlertType,
  setDataExist,
  setShowAlert,
} from "../../store/alert/Alert";
import { gstin_no } from "../../constants/CompanyDetails";
import UpateEwaybillPartB from "../authentication/signin/UpateEwaybillPartB";
import LogInEwayBill from "../authentication/signin/LogInEwayBill";

function AddDocket({ runsheet }) {

  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(true);
    setsuccess(true);
  };
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.authentication.access_token);
  const user = useSelector((state) => state.authentication.userdetails);
  const [success, setsuccess] = useState(false);
  const business_access_token = useSelector((state) => state.eway_bill.business_access_token);

  // Additional Fields
  const [local_list, setlocal_list] = useState([]);
  const [createRunsheet_list, setcreateRunsheet_list] = useState([]);
  let awb_no_list = [];
  for (let index = 0; index < createRunsheet_list.length; index++) {
    const loc = createRunsheet_list[index];
    awb_no_list.push(loc.awb_no);
  }

  const remove_transfer_list = (index) => {
    let remove_list = createRunsheet_list;
    let remove = remove_list[index];
    let remove_list1 = local_list;
    remove_list1.push(remove);
    setlocal_list(remove_list1);
    setcreateRunsheet_list(
      createRunsheet_list.filter((data) => data != remove)
    );
  };

  const transfer_list = (index) => {
    let temp_list = local_list;
    let item = temp_list[index];
    let temp_list1 = createRunsheet_list;
    temp_list1.push(item);
    setcreateRunsheet_list(temp_list1);
    setlocal_list(local_list.filter((data) => data != item));
  };

  //Add Runsheet Orders
  const add_runsheet_orders = (temp) => {
    axios
      .post(
        ServerAddress + "runsheet/add_runsheetorders/",
        {
          runsheet_id: runsheet.id,
          docket_no_id: temp,
          created_by: user.id,
          runsheet_no: runsheet.runsheet_no,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (response) {
        if (response.data.status === "success") {
          UpateEwaybillPartB({
            gstin_no: gstin_no,
            Data: list_data,
            ewayTokenB: business_access_token,
            access_token: accessToken,
          });
          // EwayUpdate();
          setShow(false);
          dispatch(setAlertType("success"));
          dispatch(setShowAlert(true));
          dispatch(setDataExist(`Docket Added Sucessfully`));
        }
      })
      .catch((error) => {
        alert(`Error While Add Docket ${error}`);
      });
  };
  // console.log("createRunsheet_list-----", createRunsheet_list)
  const handleClick = () => {
    if (createRunsheet_list.length !== 0) {
      let temp = [];
      createRunsheet_list.map((data) => {
        temp.push(data.id);
      });
      add_runsheet_orders(temp);
      setcreateRunsheet_list([]);
      // navigate(
      //   "/runsheet/createdrunsheet", { state: { orders: createRunsheet_list } }
      // );
    }
    let temp_rn_list = [...rn_orders];
    let temp_rn_list_id = [...frn_id_list];

    for (let index = 0; index < createRunsheet_list.length; index++) {
      let nrn_ord = createRunsheet_list[index];
      temp_rn_list.push(nrn_ord);
      temp_rn_list_id.push(nrn_ord.id);
    }
  };

  const handleClose = () => {
    setShow(false);
    setcreateRunsheet_list([]);
  };

  const getLocalOrders = () => {
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
    if (success) {
      getLocalOrders();
    }
  }, [success]);

  useEffect(() => {
    setsuccess(false);
  }, [success]);

  const [docket_nos, setdocket_nos] = useState([])

  useEffect(() => {
    if (createRunsheet_list.length !== 0) {
      let temp2 = [];
      createRunsheet_list.map((data) => {
        temp2.push(data.docket_no)
      });
      setdocket_nos(temp2)
    }
    else {
      setdocket_nos([])
    }
  }, [createRunsheet_list, local_list])

  // console.log("docket_nos-------", docket_nos)

  //For Update Part B
  const userDetail = useSelector((state) => state.authentication.userdetails);

  const [EwayBillData, setEwayBillData] = useState([])
  const [list_data, setlist_data] = useState([])
  // console.log("list_data------", list_data)

  const getEwayBills = (docket_num) => {
    axios
      .get(
        ServerAddress +
        `booking/get_all_ewaybill/?type=${"order"}&value=${docket_num}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        // console.log("resres----", res)
        if (res?.data?.length !== 0) {
          setEwayBillData(prevData => prevData.concat(res.data));
          // setEwayBillData((prevData) => [...prevData, res.data]);
          // setEwayBillData(...EwayBillData, res.data);
        }

      })
      .catch((err) => {
        console.log("rerrerer", err);
      });
  };

  useEffect(() => {
    if(EwayBillData?.length>0){
    let li = [];
    EwayBillData?.forEach((e) => {
      let obj = {
        transMode: "1",
        fromPlace: userDetail.branch_nm,
        fromState: userDetail.branch_location_state_code,
        transDocNo: e.trans_doc_no,
        transDocDate: String(
          e.docDate.split("-")[1] +
          "/" +
          e.docDate.split("-")[2] +
          "/" +
          e.docDate.split("-")[0]
        ),
        vehicleNo: runsheet?.vehicle_number ? runsheet?.vehicle_number : runsheet?.contracted_vehicle_number,
        reasonCode: "2",
        reasonRem: "text",
        userGstin: gstin_no,
        ewbNo: e.ewb_no,
      };
      li.push(obj);
    });
    setlist_data(li)
  }
    // Rest of your code...
  }, [EwayBillData, runsheet]);



  useEffect(() => {
    setEwayBillData([])
    if (docket_nos.length > 0 && show) {
      for (let index = 0; index < docket_nos.length; index++) {
        getEwayBills(docket_nos[index])
      }

    }
  }, [docket_nos, show])

  // const [eway_loaded, seteway_loaded] = useState(false)

  // useEffect(() => {
  //   seteway_loaded(true)
  // }, []);

  // const memoizedLogInEwayBill = useMemo(() => <LogInEwayBill />, []);

  return (
    <>
      {/* {!eway_loaded && memoizedLogInEwayBill} */}
      <LogInEwayBill />
      <Button className="btn btn-info m-1 cu_btn" onClick={handleShow}>
        Add More
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        dialogClassName="main-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Another Docket</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            {/* <form> */}
            <div className="">
              <Col lg={12}>
                <Card className="shadow bg-white rounded">
                  <h5>All Docket</h5>

                  <CardBody style={{ padding: "0px 10px 0px 10px" }}>
                    <Row>
                      <div
                        className="container-fluid "
                        style={{ background: "white", padding: "0px" }}
                      >
                        <div className="mb-1 row">
                          <div className="col-sm-4">
                            <SearchList />
                          </div>
                        </div>

                        {/* DataTable */}
                        <AllDocketsDataFormat
                          local_list={local_list}
                          check={transfer_list}
                        />
                      </div>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </div>
            <div className="">
              <Col lg={12}>
                <Card className="shadow bg-white rounded">
                  <h5>Create Docket</h5>
                  <CardBody style={{ padding: "0px" }}>
                    <Row>
                      <div
                        className="container-fluid "
                        style={{
                          background: "white",
                          marginTop: "20px",
                        }}
                      >
                        <CreatedDocketDataFormat
                          sel_rn_list={createRunsheet_list}
                          remove_list={remove_transfer_list}
                        />
                      </div>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </div>
            {/* </form> */}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClick}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddDocket;
