import React, { useEffect, useState, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PageTitle from "../../../components/pageTitle/PageTitle";
import Title from "../../../components/title/Title";
import { setPageNumber } from "../../../store/pagination/Pagination";
import { setToggle } from "../../../store/parentFilter/ParentFilter";
import SearchList from "../../../components/listDisplay/searchList/SearchList";
import Filter from "../../../components/listDisplay/filter/Filter";
import Navigate from "../navigateTab/Navigate";
import PacketsDataFormat from "../../../data/manifests/packets/PacketsDataFormat";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ServerAddress } from "../../../constants/ServerAddress";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { setAlertType, setDataExist, setShowAlert } from "../../../store/alert/Alert";
import {
  Input,
} from "reactstrap";
import toTitleCase from "../../../lib/titleCase/TitleCase";
const BoxDetail = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.authentication.access_token);
  const user = useSelector((state) => state.authentication.userdetails);
  const location_data = useLocation();
  const navigate = useNavigate();
  const [data, setdata] = useState([]);
  const [docket_no, setdocket_no] = useState("")
  const [order_id, setorder_id] = useState()
  const [selected_id, setselected_id] = useState([]);
  const [is_issue, setis_issue] = useState(false);
  const [remarks, setremarks] = useState("")
  const [local_cal_type, setlocal_cal_type] = useState("")

  console.log("docket_no------", docket_no)
  console.log("data len=========", data.length)
  console.log("selected_id ========", selected_id)
  // // Permissions
  useEffect(() => {
    dispatch(setToggle(false));
  }, []);


  useEffect(() => {
    console.log("checking pass", location_data.state.order)
  }, [])

  //Permission
  const userpermission = useSelector(
    (state) => state.authentication.userpermission
  );

  const getOrderBarcode = (no) => {
    axios.get(ServerAddress + `booking/orderboxqrcodecheck/${no}`, {

      headers: { Authorization: `Bearer ${accessToken}` }

    }).then((res) => {
      console.log("ress", res)
      setdata(res.data);
      setdocket_no(res.data[0].docket_no)
      // setorder_id(res.data[0].order)
      setlocal_cal_type(res.data[0].local_cal_type)
      let data=[]
      // for (let index = 0; index < res.data.length; index++) {
      //   const element = res.data[index];
      //   a.push(element.order)
        
      // }
      for (let index = 0; index < res.data.length; index++) {
        const element = res.data[index];
        if (!data.includes(element.order)) {
          data.push(element.order);
        }
      }
      setorder_id(data)
      console.log("data==========",data)
    }).catch((err) => {
      console.log("errrrrr", err)
    })
  }

  useLayoutEffect(() => {
    getOrderBarcode(location_data.state.order.vehicle_no);
    setdata([])
  }, [])

  const add_order_status = () => {
    axios
      .post(
        ServerAddress + "booking/add_orderstatus/",
        {
          cal_type: local_cal_type,
          status: "SHIPMENT ARRIVED AT HUB",
          transit_status: "",
          transit_remarks:"",
          docket: order_id,
          // docket_no: docket_no,
          notreceived_pkt: selected_id,
          remarks: toTitleCase(remarks).toUpperCase(),
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (response) {
        if (response.statusText == "Created") {
          // dispatch(setLastActiveOrderStatus(status));
          dispatch(
            setDataExist(
              `New Order Status 'SHIPMENT ARRIVED AT HUB' for Order ${docket_no
              } Added Sucessfully`
            )
          );
          dispatch(setAlertType("success"));
          dispatch(setShowAlert(true));
          navigate(-1);
        }
      })
      .catch((error) => {
        alert(`Error Happen while posting Order Status  Data ${error}`);
      });
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      {/* <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Input
            value={remarks}
            onChange={(val) => {
              setremarks(val.target.value);
            }}
            type="text"
            className="form-control-md"
            id="input"
            placeholder="Enter Issue Remarks"
          />

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={()=> add_order_status()}>Save</Button>
        </Modal.Footer>
      </Modal> */}


      <PageTitle page="PacketsDetail" />
      <Title title="Packets Detail" parent_title="PickedupOrders" />
      <div className="mx-3">
        <div className="container-fluid " style={{ background: "white" }}>
          <div className="mb-2 row">
            <div className="col-sm-4">
              <SearchList />
            </div>
            <div className="col-sm-8">
              <div
                className="text-sm-end"
              >
              </div>
            </div>

          </div>

          {/* DataTable */}
          <PacketsDataFormat
            data={data}
            is_issue={is_issue}
            setis_issue={setis_issue}
            received={selected_id}
            setReceived={setselected_id}
          />
          <div style={{ textAlign: "right" }}>
            <Button variant="success"
              onClick={() =>{
                // if (selected_id.length>0) {
                //   handleShow()               
                // }
                // else {
                  add_order_status()
                // }
              } }
            >Save</Button>
            <Button variant="danger" style={{ margin: "10px" }} onClick={() => navigate(-1)}>Cancel</Button>
          </div>
        </div>
      </div>
    </>
  );
};
export default BoxDetail;
