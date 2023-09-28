import React, { useState, useLayoutEffect, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { ServerAddress, bucket_address } from "../../../constants/ServerAddress";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import axios from "axios";
import { setAlertType, setDataExist, setShowAlert } from "../../../store/alert/Alert";
import toTitleCase from "../../../lib/titleCase/TitleCase";


const OrderImgDataFormat = ({ id }) => {

  const PacketTitle = [
    "Caption",
    "Image",
    "Action",

  ];
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.authentication.access_token);
  const [openModal, setopenModal] = useState(false);
  const [img, setimg] = useState("");
  const [ord_img, setord_img] = useState(false)

  const [data, setdata] = useState([]);

  const handleCloseM = () => {
    setopenModal(false);
  }
  const handle_img = (a) => {
    setimg(a)
  }

  useLayoutEffect(() => {
    id && getOrderImages();
  }, [id])

  const getOrderImages = () => {
    axios
      .get(
        ServerAddress + `booking/get-order-images/${id}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((res) => {
        if (res.data.Data.length > 0) {
          setord_img(true)
          setdata(res.data.Data)
        }
        else {
          setord_img(false)
          setdata([])
        }

      })
      .catch((err) => {
        // console.log("errrrrrrrrrrrrrankit----", err)
      });
  };
  const deleteOrderImg = (id) => {
    axios
      .delete(ServerAddress + `booking/delete-order-images/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        if (res.data.message === "Image deleted successfully.") {
          dispatch(setShowAlert(true));
          dispatch(
            setDataExist(`Image Deleted Successfully !`)
          );
          dispatch(setAlertType("danger"));
          getOrderImages();
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        // console.log(console.log("err----delete---Order--", err))
      });
  };



  return (
    <>
      {ord_img ?
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
                    return (
                      <>
                        <tr
                          key={index}
                          style={{
                            borderWidth: 1,
                          }}
                        >
                          {console.log("ewb", ewb)}
                          <td>{toTitleCase(ewb.caption)}</td>
                          <td>
                            <div onClick={() => {
                              handle_img(bucket_address + ewb.image);
                              setopenModal(true)
                            }}>
                              {console.log("bucket_address + ewb.image", bucket_address + ewb.image)}
                              <img src={bucket_address + ewb.image} height="70px" width="70px"

                              />
                            </div>
                          </td>
                          <td>
                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
                              {/* <div>
                                <BsFillPencilFill  color="blue" size={17}/>
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
        : null
      }
    </>
  );
};

export default OrderImgDataFormat;
