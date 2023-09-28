import React, { useState, useLayoutEffect, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { ServerAddress, bucket_address } from "../../../constants/ServerAddress";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import axios from "axios";
import { setAlertType, setDataExist, setShowAlert } from "../../../store/alert/Alert";


const InvoiceImgDataFormat = ({ id }) => {

  const PacketTitle = [
    "EwayBill No.",
    "Invoice No",
    "Invoice Date",
    "Invoice Value",
    "Invoice Image",
    "Action"

  ];

  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.authentication.access_token);
  const [openModal, setopenModal] = useState(false);
  const [img, setimg] = useState("");

  const [data, setdata] = useState([]);
  const [inv_data, setinv_data] = useState(false)

  const handleCloseM = () => {
    setopenModal(false);
  }
  const handle_img = (a) => {
    setimg(a)
  }
  console.log("Invoiceiddd", id)
  useLayoutEffect(() => {
    id && getInvoiceImages();
  }, [id])

  const getInvoiceImages = () => {
    axios
      .get(
        ServerAddress + `booking/get-invoice-images/${id}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((res) => {
        console.log("datataaaaaaaaaaaaaaa", res)
        if (res.data.Data.length > 0) {
          setinv_data(true)
          let data = res.data.Data;
          setdata(data);
        }
        else {
          setinv_data(false)
          setdata([])
        }

        // setrow2(aa);
      })
      .catch((err) => {
        // console.log("errrrrrrrrrrrrrankit----", err)
      });
  };
  const deleteOrderImg = (id) => {
    console.log("id", id)
    axios
      .delete(ServerAddress + `booking/delete-invoice-images/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        if (res.data.message === "Image deleted successfully.") {
          dispatch(setShowAlert(true));
          dispatch(
            setDataExist(`Invoice Deleted Successfully !`)
          );
          dispatch(setAlertType("danger"));
          getInvoiceImages();
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log(console.log("err----delete---Order--", err))
      });
  };



  return (
    <>
      {inv_data ?
        <>
          <Modal show={openModal} onHide={handleCloseM}

          >
            <Modal.Header closeButton>
              <Modal.Title>

              </Modal.Title>
            </Modal.Header>
            <Modal.Body>

              <img src={img} style={{ maxWidth: "100%", maxHeight: "100%", display: "block", margin: "auto", borderRaidus: "15px" }} />

            </Modal.Body>

          </Modal>

          <div className="table">
            <table
              className="topheader table-light"
              style={{ borderCollapse: "collapse", width: "100%", borderWidth: 1 }}
            >
              <thead>
                <tr style={{ lineHeight: 2, borderWidth: 2 }}>

                  {PacketTitle.map((i, j) => {
                    return (
                      <th
                        style={{ whiteSpace: "nowrap", textAlign: "center" }}
                        key={j}
                      >
                        {i}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {!data ? (
                  <tr>
                    <td>No Data Found</td>
                  </tr>
                ) : (
                  data.map((ewb, index) => {
                    const timestamp = ewb.invoice_at;
                    const date = new Date(timestamp);
                    const formattedDate = date.toLocaleDateString();
                    console.log("formattedDate", formattedDate);
                    return (
                      <>

                        <tr
                          key={index}
                          style={{
                            borderWidth: 1,
                          }}
                        >
                          {console.log("ewb", ewb)}

                          <td>{ewb.ewaybill_no}</td>
                          <td>{ewb.invoice_no}</td>
                          <td>{formattedDate}</td>
                          <td>{ewb.invoice_amount}</td>
                          <td>
                            <div onClick={() => {
                              handle_img(bucket_address + ewb.invoice_image);
                              setopenModal(true)
                            }}>
                              {console.log("bucket_address + ewb.image", bucket_address + ewb.invoice_image)}
                              <img src={bucket_address + ewb.invoice_image} height="70px" width="70px" />
                            </div>
                          </td>
                          <td>
                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", cursor: "pointer" }}>
                              {/* <div>
                            <BsFillPencilFill color="blue" size={17} />
                          </div> */}
                              <div>
                                <BsFillTrashFill color="red" size={17} onClick={() => {
                                  deleteOrderImg(ewb.id);
                                }} />
                              </div>
                            </div>
                          </td>
                        </tr>
                      </>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </>
        : null}
    </>

  );
};

export default InvoiceImgDataFormat;
