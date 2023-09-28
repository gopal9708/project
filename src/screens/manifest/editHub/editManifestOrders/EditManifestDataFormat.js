/* eslint-disable */
import React, { useState, useEffect } from "react";
import "./unmanifest.css";
import EditManifestTitle from "./EditManifestTitle";
import { Button } from "reactstrap";
import Modal from "react-bootstrap/Modal";
import Remove from "../../../../assets/images/bookings/remove.png";
import axios from "axios";
import { ServerAddress } from "../../../../constants/ServerAddress";
import { useSelector, useDispatch } from "react-redux";
import { setAlertType, setDataExist, setShowAlert } from "../../../../store/alert/Alert";
import toTitleCase from "../../../../lib/titleCase/TitleCase";

const EditManifestDataFormat = ({ Manifest_list }) => {
  // console.log("Manifest_list-hub------------", Manifest_list)
  const [data_title, setdata_title] = useState(EditManifestTitle);
  const [hub_transfer_no, sethub_transfer_no] = useState("");
  const [openMoal, setopenMoal] = useState(false);
  const [docket_no, setdocket_no] = useState("");
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.authentication.access_token);

  const handleClose = () => {
    setopenMoal(false);
  };

  const delete_order_row = (id) => {
    axios
      .post(
        ServerAddress + "manifest/delete_hub_order/",
        {
          order_id: id,
          hub_transfer_no: hub_transfer_no,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (response) {
        if (response.statusText === "OK") {
          setopenMoal(false);
          dispatch(setShowAlert(true));
          dispatch(setDataExist(`Data Deleted Sucessfully`));
          dispatch(setAlertType("danger"));
        }
      })

      .catch((err) => {
        alert(`Error While delete Hub Order ${err}`);
      });
  };


  const handleModal = (a, b) => {
    setdocket_no(a);
    sethub_transfer_no(b);
    setopenMoal(true);
  };
  return (
    <>
      <Modal show={openMoal} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div style={{ marginLeft: "170px" }}>
            <img src={Remove} width="100vw" height="100vh" />
          </div>
          <div
            style={{ marginTop: "20px", fontSize: "14px", fontWeight: "bold" }}
          >
            Do You Really Want To Delete This Order From Manifest{" "}
            {hub_transfer_no} ?
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            <Button
              color="success"
              onClick={() => {
                delete_order_row(docket_no);
              }}
            >
              Yes
            </Button>
            <Button
              color="danger"
              onClick={() => {
                handleClose();
              }}
            >
              {" "}
              Cancel
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      <div className="table">
        <table
          className="topheader table-light"
          style={{ borderCollapse: "collapse", width: "100%", borderWidth: 1 }}
        >
          <thead>
            <tr style={{ lineHeight: 2, borderWidth: 1 }}>
              {data_title.map((item, index) => {
                return (
                  <th
                    style={{ whiteSpace: "nowrap", textAlign: "center" }}
                    key={index}
                  >
                    {item}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {Manifest_list.length === 0 ? (
              <tr>
                <td>Select Docket To Create Manifest</td>
              </tr>
            ) : (
              Manifest_list.map((order, index) => {
                let booking_date_n = order.booking_at
                  ? order.booking_at.split("T")[0]
                  : "none";
                return (
                  <tr
                    key={index}
                    style={{
                      borderWidth: 1,
                    }}
                  >
                    <td>{order.docket_no}</td>

                    <td>{toTitleCase(order.shipper)}</td>
                    <td>{toTitleCase(order.consignee)}</td>
                    <td>
                      {
                        order.eway_bill_no ?
                        toTitleCase(order.eway_bill_no)

                        :
                        <div style={{color:"red"}}>No EwayBill</div>
                      }
                      
                      </td>
                    <td>{order.total_quantity}</td>                  
                    <td>{(order.issue).length}</td>
                    <td>{(order.issue_notreceived).length}</td>
                    <td>{order.actual_weight}</td>
                    <td>{booking_date_n}</td>
                    <td>{toTitleCase(order.current_status)}</td>
                    <td>
                    {Manifest_list.length > 1 && (
                      <div
                      onClick={() => {
                        handleModal(order.id, order.hub_transfer_no);
                      }}
                    >
                      <Button
                        color="danger"
                        size="sm"
                        outline
                        type="button"
                      >
                        Remove
                      </Button>
                       </div>
                       )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default EditManifestDataFormat;
