import React, { useState, useEffect, useLayoutEffect } from "react";
import "../../../assets/scss/forms/form.scss";
import { IconContext } from "react-icons";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import {
  MdAddCircleOutline,
  MdRemoveCircleOutline,
} from "react-icons/md";
import {
  Card,
  Col,
  Row,
  CardBody,
  CardTitle,
  Label,
  Input,
  Form,
  Button,
} from "reactstrap";
import { ServerAddress } from "../../../constants/ServerAddress";
import toTitleCase from "../../../lib/titleCase/TitleCase";
import {
  setAlertType,
  setDataExist,
  setShowAlert,
} from "../../../store/alert/Alert";
import SearchList from "../../../components/listDisplay/searchList/SearchList";
import WithoutWaraiDataFormat from "../../../data/billings/waraies/withoutWarai/WithoutWaraiDataFormat";
import WithWaraiDataFormat from "../../../data/billings/waraies/withWarai/WithWaraiDataFormat";
import { Modal } from "react-bootstrap";

const AddWarai = () => {
  const search = useSelector((state) => state.searchbar.search_item);

  const accessToken = useSelector((state) => state.authentication.access_token);
  const [isupdating, setisupdating] = useState(false);
  const { state: up_params } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Circle Toogle Btn
  const [circle_btn, setcircle_btn] = useState(true);

  const toggle_circle = () => {
    setcircle_btn(!circle_btn);
  };

  const [circle_btn_location, setcircle_btn_location] = useState(true);
  const toggle_circle_location = () => {
    setcircle_btn_location(!circle_btn_location);
  };

  const [total, settotal] = useState(0);
  const [total_boxes, settotal_boxes] = useState(0);
  const [warai_amount, setwarai_amount] = useState(0);
  const [voucher_no, setvoucher_no] = useState(0);
  const [voucher_amount, setvoucher_amount] = useState(0);

  const [created_warai, setcreated_warai] = useState([]);
  const [warai_image, setwarai_image] = useState(null);
  const [warai_date, setwarai_date] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [refresh, setrefresh] = useState(false);

  const [warai_id, setwarai_id] = useState(null);

  // const [tot_warai, settot_warai] = useState([])
  // const [total_warai, settotal_warai] = useState([])

  const [total_boxes_error, settotal_boxes_error] = useState("");
  const [warai_amount_error, setwarai_amount_error] = useState("");

  // Without Warai
  const [wow_ords_list, setwow_ords_list] = useState([]);
  const [wow_page, setwow_page] = useState(1);

  //modal state
  const [show, setshow] = useState(false);

  const transfer_list = (index) => {
    let temp_list = wow_ords_list;
    let item = temp_list[index];
    let temp_list1 = created_warai;
    temp_list1.push(item);
    setcreated_warai(temp_list1);
    setwow_ords_list(wow_ords_list.filter((data) => data !== item));
    setrefresh(!refresh);
  };

  const remove_transfer_list = (index) => {
    let remove_list = [...created_warai];
    let remove = remove_list[index];

    remove_list.splice(index, 1);
    let remove_list1 = [...wow_ords_list];
    remove_list1.push(remove);
    setwow_ords_list(remove_list1);
    setcreated_warai(remove_list);
    setrefresh(!refresh);
  };

  const check_qnty = () => {
    let all_qnty = 0;
    // if (total_boxes == "" && warai_amount == "") {
    //     settotal_boxes_error(true);
    //     setwarai_amount_error(true);
    // }

    if (created_warai.length !== 0) {
      for (let index = 0; index < created_warai.length; index++) {
        let qnty = created_warai[index].total_quantity;
        all_qnty += qnty;
      }

      if (all_qnty !== total_boxes) {
        setshow(true);
      } else {
        isupdating ? update_warai() : send_warai_data();
      }
    } else {
      alert("Please Fill Addition Fields By Searching");
    }
  };

  const send_warai_data = () => {
    let order_ids = created_warai.map((v) => [v.id, total * v.total_quantity]);
    axios
      .post(
        ServerAddress + "billing/add_warai_charges/",
        {
          no_of_boxes: total_boxes,
          warai_charge: total,
          total_amount: warai_amount,
          voucher_number: toTitleCase(voucher_no).toUpperCase(),
          voucher_amount: toTitleCase(voucher_amount).toUpperCase(),
          warai_date: warai_date,
          warai_image: warai_image,
          order_ids: order_ids,
        },

        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (response) {
        if (response.data.status === "success") {
          dispatch(setShowAlert(true));
          dispatch(setDataExist(`Warai Added sucessfully`));
          dispatch(setAlertType("success"));
          navigate(-1);
        }
      })
      .catch((error) => {
        alert(`Error Happen while posting Warai Data ${error}`);
      });
  };

  const update_warai = () => {
    let order_ids = created_warai.map((v) => [v.id, total * v.total_quantity]);
    axios
      .put(
        ServerAddress + "billing/update_warai_charges/" + warai_id,
        {
          no_of_boxes: total_boxes,
          warai_charge: total,
          total_amount: warai_amount,
          voucher_number: toTitleCase(voucher_no).toUpperCase(),
          voucher_amount: toTitleCase(voucher_amount).toUpperCase(),
          warai_date: warai_date,
          warai_image: warai_image,
          order_ids: order_ids,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (resp) {
        if (resp.data.status === "success") {
          dispatch(setShowAlert(true));
          dispatch(setDataExist(`Warai Updated sucessfully`));
          dispatch(setAlertType("info"));
          navigate(-1);
        }
      })
      .catch(function () {
        alert("Error Error While  Updateing Warai");
      });
  };

  const getWithoutWaraiOrders = () => {
    let temp3 = [];
    axios
      .get(
        ServerAddress +
          `billing/all_without_warai_orders/?search=${""}&p=${wow_page}&records=${10}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((resp) => {
        for (let ord of resp.data.results) {
          if (ord.wr_charge.length > 0) {
            temp3.push(ord);
          }
        }
        setwow_ords_list(temp3);
      })
      .catch((err) => {
        alert(`Error Occur in Get 3 , ${err}`);
      });
  };

  useEffect(() => {
    if (search !== "") {
      getWithoutWaraiOrders();
    }
  }, [wow_page, search]);

  useEffect(() => {
    if (warai_amount !== 0 && total_boxes !== 0) {
      settotal(parseFloat(warai_amount / total_boxes).toFixed(3));
    }
  }, [warai_amount, total_boxes]);

  useLayoutEffect(() => {
    try {
      let warai_up = up_params.warai;
      setisupdating(true);
      setwarai_id(warai_up.id);
      settotal_boxes(warai_up.no_of_boxes);
      setvoucher_amount(warai_up.voucher_amount);
      setvoucher_no(warai_up.voucher_number);
      setwarai_amount(warai_up.total_amount);
      setwarai_date(warai_up.warai_date);
      setcreated_warai(warai_up.order_warai);
    } catch (error) {}
  }, []);

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        check_qnty();
        return false;
      }}
    >
      {/* Coloader */}
      <div className="m-4">
        <div className=" mb-2 main-header">
          {isupdating ? "Update Warai" : "Add Warai"}{" "}
        </div>
        <Col lg={12}>
          <Card className="shadow bg-white rounded">
            <CardTitle className="mb-1 header">
              <div className="header-text-icon header-text">
                <div>Warai Info</div>

                <IconContext.Provider
                  value={{
                    className: "header-add-icon",
                  }}
                >
                  <div onClick={toggle_circle}>
                    {circle_btn ? (
                      <MdRemoveCircleOutline />
                    ) : (
                      <MdAddCircleOutline />
                    )}
                  </div>
                </IconContext.Provider>
              </div>
            </CardTitle>

            {circle_btn ? (
              <CardBody>
                <Row>
                  <Col lg={4} md={6} sm={6}>
                    <div className="mb-2">
                      <Label className="header-child">
                        Total Number Of Boxes*
                      </Label>
                      <Input
                        min={1}
                        onChange={(val) => {
                          settotal_boxes(val.target.value);
                          if (val.target.value !== "") {
                            settotal_boxes_error(false);
                          }
                        }}
                        onBlur={() => {
                          if (total_boxes === "") {
                            settotal_boxes_error(true);
                          }
                        }}
                        invalid={total_boxes_error}
                        value={total_boxes}
                        type="number"
                        name="total_boxes"
                        className="form-control-md input"
                        id="total_boxes"
                        placeholder="Enter Total Number Of Boxes"
                      />

                      {total_boxes_error && (
                        <div
                          style={{
                            color: "#F46A6A",
                            fontSize: 11,
                            paddingTop: "1px",
                          }}
                        >
                          Please Add Warai Charge{" "}
                        </div>
                      )}
                    </div>
                  </Col>
                  <Col lg={4} md={6} sm={6}>
                    <div className="mb-2">
                      <Label className="header-child">Warai Amount*</Label>
                      <Input
                        min={1}
                        onChange={(val) => {
                          setwarai_amount(val.target.value);
                          if (val.target.value !== "") {
                            setwarai_amount_error(false);
                          }
                        }}
                        onBlur={() => {
                          if (warai_amount === "") {
                            setwarai_amount_error(true);
                          }
                        }}
                        invalid={warai_amount_error}
                        value={warai_amount}
                        type="number"
                        name="warai_amount"
                        className="form-control-md input"
                        id="warai_amount"
                        placeholder="Enter Warai Amount"
                      />

                      {warai_amount_error && (
                        <div
                          style={{
                            color: "#F46A6A",
                            fontSize: 11,
                            paddingTop: "1px",
                          }}
                        >
                          Enter Warai Amount{" "}
                        </div>
                      )}
                    </div>
                  </Col>

                  <Col lg={4} md={6} sm={6}>
                    <div className="mb-2">
                      <Label className="header-child">Voucher Number*</Label>
                      <Input
                        value={voucher_no}
                        onChange={(e) => {
                          setvoucher_no(e.target.value);
                        }}
                        type="text"
                        name="voucher_no"
                        className="form-control-md input"
                        // id=""
                        placeholder="Enter Warai Amount"
                      />
                    </div>
                  </Col>

                  <Col lg={4} md={6} sm={6}>
                    <div className="mb-2">
                      <Label className="header-child">Voucher Amount*</Label>
                      <Input
                        value={voucher_amount}
                        onChange={(e) => {
                          setvoucher_amount(e.target.value);
                        }}
                        type="text"
                        name="voucher_amount"
                        className="form-control-md input"
                        placeholder="Enter Warai Amount"
                      />
                    </div>
                  </Col>

                  <Col lg={4} md={6} sm={6}>
                    <div className="mb-2">
                      <Label className="header-child">Warai Date</Label>
                      <input
                        type="date"
                        className="form-control d-block form-control-md "
                        value={warai_date}
                        onChange={(val) => {
                          setwarai_date(val.target.value);
                        }}
                      />
                    </div>
                  </Col>

                  <Col lg={4} md={6} sm={6}>
                    <div className="mb-2">
                      <Label className="header-child">Warai Image</Label>

                      <Input
                        className="form-control form-control-md"
                        id="formFileSm"
                        type="file"
                        onChange={(event) => {
                          setwarai_image(event.target.files[0]);
                        }}
                      />
                    </div>
                  </Col>
                </Row>
              </CardBody>
            ) : null}
          </Card>
        </Col>

        <Col lg={12}>
          <Card className="shadow bg-white rounded">
            {circle_btn ? (
              <CardBody>
                <Row>
                  <div className="col-sm-4">
                    <SearchList />
                  </div>

                  {search !== "" ? (
                    <div
                      className=""
                      style={{
                        background: "white",
                        maxHeight: "290px",
                      }}
                    >
                      <WithoutWaraiDataFormat
                        wow_ords_list={wow_ords_list}
                        check={transfer_list}
                        warai_list1={created_warai}
                      />
                    </div>
                  ) : (
                    ""
                  )}

                  <div
                    className="container-fluid"
                    style={{
                      background: "white",
                      maxHeight: "290px",
                      marginTop: search !== "" ? "50px" : "",
                    }}
                  >
                    <WithWaraiDataFormat
                      warai_ords_list={created_warai}
                      remove_list={remove_transfer_list}
                      total_warai={total}
                      isupdating={isupdating}
                    />
                  </div>
                </Row>
              </CardBody>
            ) : null}
          </Card>
        </Col>
      </div>

      {/*Button */}
      <div className=" m-4">
        <Col lg={12}>
          <div className="mb-1 footer_btn">
            <button
              type="submit"
              className="btn btn-info m-1"
              disabled={
                voucher_amount === 0 ||
                warai_amount === 0 ||
                voucher_no === 0 ||
                total_boxes === 0 ||
                created_warai.length === 0
              }
            >
              Save
            </button>

            <button
              type="button"
              className="btn btn-info m-1"
              onClick={() => navigate("/billing/waraies")}
            >
              Cancel
            </button>
          </div>
        </Col>

        <Modal show={show} onHide={() => setshow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmation</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div style={{ fontSize: "15px" }}>
              Total number of Boxes is not equal to total Quantity So, Do you
              want to proceed further ?
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setshow(false)}
            >
              No
            </Button>
            <Button
              type="button"
              onClick={() => {
                if (isupdating) {
                  update_warai();
                } else {
                  send_warai_data();
                }
                setshow(false);
              }}
            >
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Form>
  );
};

export default AddWarai;
