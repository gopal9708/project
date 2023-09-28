import React, { useState, useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { ServerAddress, bucket_address } from "../../../constants/ServerAddress";
import { BiEditAlt, BiTrash } from "react-icons/bi";
import axios from "axios";
import { setAlertType, setDataExist, setShowAlert } from "../../../store/alert/Alert";
import ImgModal from "../../../components/crop/ImgModal";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {
  Row,
  Input
} from "reactstrap";
const InvoiceImgDataFormat = ({ id }) => {

  const Title = [
    "EwayBill No.",
    "Invoice No",
    "Invoice Date",
    "Invoice Amount",
    "Invoice Image",
    "Edit",
    "Delete"
  ];

  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.authentication.access_token);
  const [openModal, setopenModal] = useState(false);
  const [img, setimg] = useState("");
  const [inv_id, setinv_id] = useState(null)
  const [index, setindex] = useState(null)
  const [row4, setrow4] = useState([["", "", "", "", "", "", ""]]);

  const [showModalInvoice, setshowModalInvoice] = useState({
    value: false,
    ind: "",
  });
  console.log("showModalInvoice11111111---", showModalInvoice)
  const [img_index, setimg_index] = useState("")

  const [show, setShow] = useState(false);
  const [text, settext] = useState("")

  const handleShow = () => setShow(true);

  const [inv_data, setinv_data] = useState(false)
  const [row_list, setrow_list] = useState([])
  const [row, setrow] = useState([])
  console.log("row_list-----", row_list)
  const [refresh, setrefresh] = useState(false);

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
        console.log("res===", res)
        let temp = []
        let temp_list = []
        let data_list = []
        if (res.data.Data.length > 0) {
          temp = res.data.Data;
          setinv_data(true)
          let data = res.data.Data;
          for (let index = 0; index < temp.length; index++) {
            temp_list.push([
              temp[index].ewaybill_no,
              temp[index].invoice_no,
              (temp[index].invoice_at).split("T")[0],
              temp[index].invoice_amount,
              temp[index].invoice_image,
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

        // setrow2(aa);
      })
      .catch((err) => {
        // console.log("errrrrrrrrrrrrrankit----", err)
      });
  };

  const deleteInvoice = (id) => {
    axios
      .delete(ServerAddress + `booking/delete-invoice-images/${id}`, {
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

  const updateInvoice = (id) => {
    axios
      .put(
        ServerAddress + "booking/update_invoice/" + id,
        {
          invoice: row_list,
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

  // This Function is Used To Delete Existing Element From Array
  const operation = (index, inv_id, type, item) => {
    handleShow()
    setinv_id(inv_id)
    // deleteOrderImg(id)
    if (type === "delete") {
      setindex(index)
      settext("Do you Want to delete this invoice. ?")
    }
    else {
      setrow_list(item)
      settext("Do you Want to edit this invoice. ?")
    }
  };

  const action = () => {
    if (text === "Do you Want to delete this invoice. ?") {
      deleteInvoice(inv_id)
    }
    else {
      if (row_list[0]?.length === 0 || row_list[0]?.length === 12) {
        updateInvoice(inv_id)
      }
      else {
        setShow(false)
        dispatch(setShowAlert(true));
        dispatch(
          setDataExist(`Ewaybill Number Must Have 12 Digit.`)
        );
        dispatch(setAlertType("danger"));
      }

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
              <Button variant={text === "Do you Want to delete this invoice. ?" ? "danger" : "primary"} onClick={() => action()}>
                {text === "Do you Want to delete this invoice. ?" ? "Delete" : "Update"}
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
                        row4[showModalInvoice.ind][4] = val;
                        setshowModalInvoice({
                          ...showModalInvoice,
                          value: false,
                          ind: "",
                        });
                      } else {
                        row4[img_index][4] = val;
                      }
                    }}
                    result_image={(val) => {
                      if (showModalInvoice.ind !== "") {
                        row[showModalInvoice.ind][4] = val;
                      } else {
                        row[img_index][4] = val;
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
                          <td className="sl">
                            <Input
                              type="number"
                              className="form-control-md"
                              id="input"
                              min={0}
                              step={0.01}
                              placeholder="Enter EwayBill Number"
                              value={item[0]}
                              onChange={(val) => {
                                const { value } = val.target;
                                if (value.length <= 12) {
                                  item[0] = val.target.value;
                                  setrefresh(!refresh);
                                }
                              }}
                            />
                          </td>
                          <td className="range_type">
                            <Input
                              maxLength={20}
                              type="text"
                              className="form-control-md"
                              id="input"
                              min={0}
                              step={0.01}
                              placeholder="Enter Invoice Number"
                              value={item[1]}
                              onChange={(val) => {
                                item[1] = val.target.value;
                                setrefresh(!refresh);
                              }}
                            />
                          </td>
                          <td className="amount">
                            <Input
                              type="date"
                              className="form-control d-block form-control-md"
                              id="input"
                              min={0}
                              step={0.01}
                              placeholder="Enter Date"
                              value={item[2]}
                              onChange={(val) => {
                                item[2] = val.target.value;
                                setrefresh(!refresh);
                              }}
                            />
                          </td>
                          <td className="amount">
                            <Input
                              type="number"
                              className="form-control-md"
                              id="input"
                              min={0}
                              step={0.01}
                              placeholder="Enter Invoice Amount"
                              value={item[3]}
                              onChange={(val) => {
                                item[3] = val.target.value;
                                setrefresh(!refresh);
                              }}
                            />
                          </td>
                          <td className="amount">
                            {item[4]?.substring(0, 4) !== "data" ?
                              <div
                                onClick={() => {
                                  setshowModalInvoice({
                                    ...showModalInvoice,
                                    value: true,
                                    ind: index,
                                  });
                                }}
                              >
                                <img src={bucket_address + item[4]} style={{
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
                                  {item[4] && (
                                    <img
                                      src={item[4]}
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
                                operation(index, item[6], "edit", item)
                              }
                              }
                            />

                          </td>
                          <td className="delete">
                            <BiTrash
                              style={{ cursor: "pointer" }}
                              size={21}
                              color="red"
                              onClick={() => operation(index, item[6], "delete")}
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

export default InvoiceImgDataFormat;
