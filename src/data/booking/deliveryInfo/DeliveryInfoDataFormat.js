/* eslint-disable */
import React, { useState, useEffect } from "react";
// import { HashLink } from 'react-router-hash-link';
import { useSelector } from "react-redux";
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import { ServerAddress } from "../../../constants/ServerAddress";
import toTitleCase from "../../../lib/titleCase/TitleCase";

const DeliveryInfoDataFormat = ({ order_id }) => {

  // const success = useSelector((state) => state.alert.show_alert);
  // const active_order_last_del_info = useSelector(
  //   state => state.orders.last_active_order_del_info
  // );
  // Permissions
  const user_permissions = useSelector(
    (state) => state.permissions.user_permissions
  );
  // const active_order_id = useSelector(state => state.orders.active_order_id);
  // const active_order_no = useSelector(state => state.orders.active_order_no);
  const accessToken = useSelector((state) => state.authentication.access_token);
  const [delivery_list, setdelivery_list] = useState([]);
  const [modal_backdrop, setmodal_backdrop] = useState(false);
  function tog_backdrop() {
    setmodal_backdrop(!modal_backdrop);
    removeBodyCss();
  }
  function removeBodyCss() {
    document.body.classList.add("no_padding");
  }
  // Get Order Delivery Data
  const getorder_delivery_data = () => {
    axios
      .get(
        ServerAddress +
        `booking/get_delivery_info/?order_id=${order_id}&signature_person_name=${''}&p=1&records=50&client=${''}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        console.log("response-----del----", response.data)
        setdelivery_list(response.data.results);
      })
      .catch((err) => {
        alert(`Error Occur while Order Delivery Info, ${err}`);
      });
  };
  // const delete_order_del_info = (id, del_info) => {
  //   axios
  //     .delete(ServerAddress + "booking/delete_order_del_info/" + id, {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     })
  //     .then(function (resp) {
  //       if (resp.data.data == "Deleted") {
  //         dispatch(setShowAlert(true));
  //         dispatch(
  //           setDataExist(`del_info "${toTitleCase(del_info)}" Deleted Sucessfully`)
  //         );
  //         dispatch(setAlertType("danger"));
  //       }
  //     })
  //     .catch((err) => {
  //       alert(`Error While delete Orders ${err}`);
  //     });
  // };
  useEffect(() => {
    if (order_id !== "") {
      getorder_delivery_data(order_id);
    }
  }, [order_id]);

  // Image Modal
  const [openModal, setopenModal] = useState(false);
  const handleCloseMod = () => {
    setopenModal(false);
  }
  const [img, setimg] = useState("");
  const handle_img = (a) => {
    setimg(a)
  }

  return (
    <>
      <Modal show={openModal} onHide={handleCloseMod}

      >
        <Modal.Header closeButton>
          <Modal.Title>

          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <img src={img} style={{ maxWidth: "100%", maxHeight: "100%", display: "block", margin: "auto", borderRaidus: "15px" }} />

        </Modal.Body>

      </Modal>
      {delivery_list.length === 0
        ? " No Data Found"
        : delivery_list.map((del_info, index) => {
          let added_at = "-";
          if (del_info?.created_at) {
            console.log("del_info.created_date----", del_info.created_at)
            let added_at_r = del_info?.created_at.split("T");
            let date = added_at_r[0];
            let time = added_at_r[1].substring(0, 5);
            added_at = date + " " + time;
          }
          return (
            <>
              <tr
                key={index}
                style={{
                  borderWidth: 1,
                }}
              >
                <td>{toTitleCase(del_info.signature_person_name)}</td>
                <td>
                  {del_info.signature_person_phone_number}
                </td>
                <td className="selection-cell">{added_at}</td>
                <td
                  onClick={() => {
                    handle_img(del_info.pod_image);
                    setopenModal(true)
                  }}
                >
                  <img src={del_info.pod_image} style={{ width: 70, height: 50 }} />
                </td>
                <td
                  onClick={() => {
                    handle_img(del_info.image);
                    setopenModal(true)
                  }}
                >
                  <img src={del_info.image} style={{ width: 70, height: 50 }} />
                </td>
              </tr>
            </>
          );
        })}
    </>
  );
};
export default DeliveryInfoDataFormat;