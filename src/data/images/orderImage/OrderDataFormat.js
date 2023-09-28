import React, { useState, useLayoutEffect, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { ServerAddress, bucket_address } from "../../../constants/ServerAddress";
import { BiEditAlt, BiTrash } from "react-icons/bi";
import axios from "axios";
import { setAlertType, setDataExist, setShowAlert } from "../../../store/alert/Alert";
import {
  Row,
  Input
} from "reactstrap";
import ImgModal from "../../../components/crop/ImgModal";


const OrderImgDataFormat = ({ id }) => {

  const Title = [
    "Caption",
    "Image",
    "Edit",
    "Delete"

  ];
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.authentication.access_token);
  const [openModal, setopenModal] = useState(false);
  const [img, setimg] = useState("");
  const [ord_img, setord_img] = useState(false)

  const [data, setdata] = useState([]);
  const [inv_id, setinv_id] = useState(null)
  const [index, setindex] = useState(null)
  const [row4, setrow4] = useState([["", "", "", ""]]);

  const handleShow = () => setShow(true);

  const [inv_data, setinv_data] = useState(false)
  const [row_list, setrow_list] = useState([])
  const [row, setrow] = useState([])
  console.log("row_list-----", row_list)
  const [refresh, setrefresh] = useState(false);

  const [showModalInvoice, setshowModalInvoice] = useState({
    value: false,
    ind: "",
  });
  console.log("showModalInvoice11111111---", showModalInvoice)
  const [img_index, setimg_index] = useState("")
  const [show, setShow] = useState(false);
  const [text, settext] = useState("")

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
        console.log("img res====", res)
        let temp = []
        let temp_list = []
        let data_list = []
        if (res.data.Data.length > 0) {
          temp = res.data.Data;
          setinv_data(true)
          let data = res.data.Data;
          for (let index = 0; index < temp.length; index++) {
            temp_list.push([
              temp[index].caption,
              temp[index].image,
              temp[index].order_id,
              temp[index].id,
            ]);
            data_list.push([temp[index].invoice_image])
          }

          setrow(temp_list);
        }
        else {
          setinv_data(false)
          setrow([])
        }

      })
      .catch((err) => {
        // console.log("errrrrrrrrrrrrrankit----", err)
      });
  };
  const deleteOrderImage = (id) => {
    axios
      .delete(ServerAddress + `booking/delete-order-images/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        setShow(false)
        if (res.data.message === "Image deleted successfully.") {
          const newlist = row.slice();
          newlist.splice(index, 1);
          setrow(newlist);

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


  const UpdateOrderImage = (id) => {
    axios
      .put(
        ServerAddress + "booking/update_order_image/" + id,
        {
          order_image: row_list,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (response) {
        setShow(false)
        if (response.data.status === "success") {
          // dispatch(Toggle(true))
          dispatch(setShowAlert(true));
          dispatch(setDataExist(`Invoice Updated sucessfully`));
          dispatch(setAlertType("info"));
        }
      })
      .catch(function (err) {
        alert(`rror While  Updateing Coloader ${err}`);
      });
  };

  const operation = (index, inv_id, type, item) => {
    handleShow()
    setinv_id(inv_id)
    // deleteOrderImg(id)
    if (type === "delete") {
      setindex(index)
      settext("Do you Want to delete this. ?")
    }
    else {
      setrow_list(item)
      settext("Do you Want to edit this. ?")
    }
  };

  const action = () => {
    if (text === "Do you Want to delete this. ?") {
      deleteOrderImage(inv_id)
    }
    else {
        UpdateOrderImage(inv_id)
    }
  }
  return (
    <>
      {inv_data ?
        <>
          <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>{text}</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShow(false)}>
                Cancel
              </Button>
              <Button variant={text === "Do you Want to delete this. ?" ? "danger" : "primary"} onClick={() => action()}>
                {text === "Do you Want to delete this. ?" ? "Delete" : "Update"}
              </Button>
            </Modal.Footer>
          </Modal>

          <div
            style={{
              overflowX: "scroll",
              display: "flex",
              justifyContent: "center",
              padding: "8px 2px",
            }}
          >
            <table className="topheader table-light"
              style={{ borderCollapse: "collapse", width: "100%", borderWidth: 1 }}>
              <Row>
                {showModalInvoice.value ? (
                  // <Main_c
                  <ImgModal
                    modal={showModalInvoice.value}
                    modal_set={() => {
                      setshowModalInvoice({
                        ...showModalInvoice,
                        value: false,
                      });
                    }}
                    upload_image={(val) => {
                      if (showModalInvoice.ind !== "") {
                        row4[showModalInvoice.ind][1] = val;
                        setshowModalInvoice({
                          ...showModalInvoice,
                          value: false,
                          ind: "",
                        });
                      } else {
                        row4[img_index][1] = val;
                      }
                    }}
                    result_image={(val) => {
                      if (showModalInvoice.ind !== "") {
                        row[showModalInvoice.ind][1] = val;
                      } else {
                        row[img_index][1] = val;
                        // setinvoice_img(val);
                      }
                    }}
                  />
                ) : null}
              </Row>
              <thead>
                <tr style={{ lineHeight: 2, borderWidth: 1, textAlign:"center" }}>
                  {Title.map((itm) => {
                    return <th>{itm}</th>;
                  })}
                </tr>
              </thead>
              <tbody>
                <>
                  {row.length === 0 ? (
                    <tr key="noData">No Data</tr>
                  ) : (
                    row.map((item, index) => {
                      return (
                        <tr
                          key={index}
                          style={{
                            borderWidth: 1,
                          }}
                        >
                          <td className="amount">
                              <select
                                // disabled={item[0] ? true : false}
                                style={{
                                  // marginBottom: "15px",
                                  boxShadow: "none",
                                }}
                                className="form-select"
                                placeholder="Select status"
                                id="input"
                                value={item[0]}
                                onChange={(val) => {
                                  item[0] = val.target.value;
                                  setrefresh(!refresh);
                                }}
                                defaultValue="Select status"
                              >
                                <option value={item[0]} disabled selected>
                                  {item[0] ? item[0] : "Select Value"}
                                </option>
                                <option>Parcel Image</option>
                                <option>eWaybill Image</option>
                                <option>Order Image</option>
                                <option>Weight Image</option>
                              </select>
                          </td>

                          <td className="amount">
                            {item[1]?.substring(0, 4) !== "data" ?
                              <div
                                onClick={() => {
                                  setshowModalInvoice({
                                    ...showModalInvoice,
                                    value: true,
                                    ind: index,
                                  });
                                }}
                              >
                                <img src={bucket_address + item[1]} style={{
                                  height: "70px",
                                  width: "70px",
                                  borderRadius: "10px",
                                  paddingBottom: "5px",
                                }}
                                />
                              </div>
                              :
                              <div className="mb-3">
                                <div style={{ width: "100%" }}>
                                  {item[1] && (
                                    <img
                                      src={item[1]}
                                      style={{
                                        height: "70px",
                                        width: "70px",
                                        borderRadius: "10px",
                                        paddingBottom: "5px",
                                      }}
                                      onClick={() => {
                                        setshowModalInvoice({
                                          ...showModalInvoice,
                                          value: true,
                                          ind: index,
                                        });
                                      }}
                                    />
                                  )
                                  }
                                </div>
                              </div>
                            }
                          </td>

                          <td className="delete">

                            <BiEditAlt
                              style={{ cursor: "pointer" }}
                              size={21}
                              color="blue"
                              onClick={() => {
                                operation(index, item[3], "edit", item)
                              }
                              }
                            />

                          </td>
                          <td className="delete">
                            <BiTrash
                              style={{ cursor: "pointer" }}
                              size={21}
                              color="red"
                              onClick={() => operation(index, item[3], "delete")}
                            />
                          </td>
                        </tr>
                      );
                    })
                  )}
                </>
              </tbody>
            </table>
          </div>
        </>
        : null}
    </>
  );
};

export default OrderImgDataFormat;
