import React, { useState, useEffect, useLayoutEffect } from "react";
import "../../../assets/scss/forms/form.scss";
import { IconContext } from "react-icons";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import {
  MdAddCircleOutline,
  MdRemoveCircleOutline,
  MdAdd,
  MdDelete,
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
} from "reactstrap";
import { ServerAddress } from "../../../constants/ServerAddress";
import {
  setAlertType,
  setDataExist,
  setShowAlert,
} from "../../../store/alert/Alert";
import MultiRowSearchInput from "../../../components/formComponent/multiRowSearchInput/MultiRowSearchInput";

const AddBillClosed = () => {
  const [bill_orders, setbill_orders] = useState({});

  const [primary_charge, setprimary_charge] = useState("");
  
  const [primary_charge_error, setprimary_charge_error] = useState(false);

  const accessToken = useSelector((state) => state.authentication.access_token);
  const [isupdating, setisupdating] = useState(false);
  const { state: up_params } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [circle_btn, setcircle_btn] = useState(true);
  const toggle_circle = () => {
    setcircle_btn(!circle_btn);
  };

  const [circle_btn_location, setcircle_btn_location] = useState(true);
  const toggle_circle_location = () => {
    setcircle_btn_location(!circle_btn_location);
  };

  const [associated_charges_list, setassociated_charges_list] = useState([]);
  const [associated_charges_list2, setassociated_charges_list2] = useState([]);
  const [rem_charges, setrem_charges] = useState([]);
  const [selected_charges, setselected_charges] = useState([]);
  const [refresh, setrefresh] = useState(false);
  const [show_add_link, setshow_add_link] = useState(false);

  const [additional_charges, setadditional_charges] = useState([]);

  const [chg_page, setchg_page] = useState(1);
  const [search_txt, setsearch_txt] = useState("");

  // getAllCharges
  const getAllCharges = (available_charges, temps) => {
    axios
      .get(
        ServerAddress +
          `master/all_charges/?search=${""}&p=${chg_page}&records=${10}&primary_charges=${[
            "OTHER CHARGE",
            "MAIN AMOUNT",
            "TAX",
            "ADDITIONAL CHARGE",
          ]}&secondary_charge_search=${search_txt}&data=all`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((resp) => {
        let temp3 = resp.data.results
          .filter(
            (v) =>
              available_charges.indexOf(v.secondary_charge) === -1 &&
              available_charges.indexOf(v.secondary_charge) === -1 &&
              v.secondary_charge !== "WARAI" &&
              v.primary_charge !== "OTHER CHARGE"
          )
          .map((el) => [el.id, el.secondary_charge]);

        if (temp3.length > 0) {
          setshow_add_link(true);
        }

        setrem_charges(temp3);
      })
      .catch((err) => {
        alert(`Error Occur in Get 3 , ${err}`);
      });
  };

  const removeCharge = (entry, indxx) => {
    additional_charges.splice(indxx, 1);
    // if (additional_charges.length - 1 === indxx && indxx != 0) {
    //   let slst = additional_charges[additional_charges.length - 2][0];
    //   let indx = selected_charges.indexOf(slst);
    //   selected_charges.splice(indx, 1);
    // } else {
    //   let idx = selected_charges.indexOf(entry[0]);
    //   if (idx > -1) {
    //     selected_charges.splice(idx, 1);
    //   }
    // }

    // if (indx > -1) {
    //   selected_charges.splice(indx,1)
    // }

    setrefresh(!refresh);
    // setadditional_charges(
    //   additional_charges.filter(val => val.toString() != entry.toString())
    // );
  };

  const addCharge = (last_entr) => {
    if (additional_charges.length > 0) {
      if (last_entr[0] !== "" && +last_entr[1] > 0) {
        setadditional_charges([...additional_charges, [["", ""], 0]]);
        setselected_charges([...selected_charges, last_entr[0]]);
      } else {
        alert("Please Add Valid Values");
      }
    } else {
      setadditional_charges([...additional_charges, [["", ""], 0]]);
    }

    // setrefresh(!refresh);
  };

  const update_bill_closed = () => {
    axios
      .post(
        ServerAddress + "billing/update_bill_closed/",
        {
          update_cost: associated_charges_list2,
          add_cost: additional_charges,
          ord_no: bill_orders.docket_no,
          cold_chain: bill_orders.cold_chain,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((resp) => {
        if (resp.data === "done") {
          dispatch(setShowAlert(true));
          dispatch(setDataExist(`BillClosed Updated Sucessfully`));
          dispatch(setAlertType("info"));
          navigate("/billing/billclosed");
        }
      })
      .catch(function (err) {
        alert("Error Occur While Updating Bill Closed");
      });
  };

  useLayoutEffect(() => {
    try {
      let bill_ord = up_params.b_order;

      setisupdating(true);
      setbill_orders(bill_ord);
      let as_chrg = bill_ord.ordertocost.filter((chr) => chr.cost_value !== 0);
      let temp2 = bill_ord.ordertocost
        .filter((ch) => ch.additional_new === false)
        .map((chr) => chr.cost_name);
      let tempa = [];
      let temps = [];

      for (let chr of bill_ord.ordertocost) {
        if (chr.additional_new) {
          tempa.push([[chr.id, chr.cost_name], chr.cost_value]);
        }
      }
      let temp = [];
      for (const chr of bill_ord.ordertocost) {
        if (chr.additional_new === false) {
          temp.push([
            chr.cost_name,
            (Math.round(+chr.cost_value * 2) / 2).toFixed(2),
          ]);
        }
      }

      setassociated_charges_list(as_chrg);
      setassociated_charges_list2(temp);
      setadditional_charges(tempa);
      getAllCharges(temp2, temps);
    } catch (error) {}
  }, []);

  useEffect(() => {
    if (primary_charge !== "") {
      setprimary_charge_error(false);
    }
  }, [primary_charge]);

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        update_bill_closed();
        return false;
      }}
    >
      {/* Coloader */}
      <div className="m-4">
        <div className=" mb-2 main-header">
          {isupdating ? "Update Bill Closed" : "Add Bill Closed"}{" "}
        </div>
        <Col lg={12}>
          <Card className="shadow bg-white rounded">
            <CardTitle className="mb-1 header">
              <div className="header-text-icon header-text">
                <div>Order Info</div>

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
                    <div className="mb-3">
                      <Label className="header-child">Order No.*</Label>
                      <Input
                        value={bill_orders.docket_no}
                        type="text"
                        name="order_no"
                        className="form-control-md input"
                        disabled
                      />
                    </div>
                  </Col>

                  <Col lg={4} md={6} sm={6}>
                    <div className="mb-3">
                      <Label className="header-child">Client*</Label>
                      <Input
                        value={bill_orders.client_name}
                        type="text"
                        name="client"
                        className="form-control-md input"
                        disabled
                      />
                    </div>
                  </Col>

                  <Col lg={4} md={6} sm={6}>
                    <div className="mb-3">
                      <Label className="header-child">Cold Chain</Label>
                      <br />
                      <Input
                        className="form-check-input-sm"
                        type="checkbox"
                        // value="false"
                        id="defaultCheck1"
                        // onClick={() => {
                        //   setcold_chain(!cold_chain);
                        // }}
                        readOnly={true}
                        checked={bill_orders}
                        disabled
                      />
                    </div>
                  </Col>

                  <Col lg={4} md={6} sm={6}>
                    <div className="mb-3">
                      <Label className="header-child">Shipper*</Label>
                      <Input
                        value={bill_orders.shipper_name}
                        type="text"
                        name="shipper"
                        className="form-control-md input"
                        disabled
                      />
                    </div>
                  </Col>

                  <Col lg={4} md={6} sm={6}>
                    <div className="mb-3">
                      <Label className="header-child">Consignee*</Label>
                      <Input
                        value={bill_orders.consignee_name}
                        type="text"
                        name="consignee"
                        className="form-control-md input"
                        disabled
                      />
                    </div>
                  </Col>

                  <Col lg={4} md={6} sm={6}>
                    <div className="mb-3">
                      <Label className="header-child">Origin*</Label>
                      <Input
                        value={
                          bill_orders.shipper_pincode +
                          ", " +
                          bill_orders.shipper_city
                        }
                        type="text"
                        name="origin"
                        className="form-control-md input"
                        disabled
                      />
                    </div>
                  </Col>

                  <Col lg={4} md={6} sm={6}>
                    <div className="mb-3">
                      <Label className="header-child">Destination*</Label>
                      <Input
                        value={
                          bill_orders.consignee_pincode +
                          ", " +
                          bill_orders.consignee_city
                        }
                        type="text"
                        name="destination"
                        className="form-control-md input"
                        disabled
                      />
                    </div>
                  </Col>

                  <Col lg={4} md={6} sm={6}>
                    <div className="mb-3">
                      <Label className="header-child">Delivery Type*</Label>
                      <Input
                        value={bill_orders.delivery_type}
                        type="text"
                        name="delivery_type"
                        className="form-control-md input"
                        disabled
                      />
                    </div>
                  </Col>
                </Row>
              </CardBody>
            ) : null}
          </Card>

          <Card className="shadow bg-white rounded">
            <CardTitle className="mb-1 header">
              <div className="header-text-icon header-text">
                <div>All Charges Info</div>

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
                  {associated_charges_list2.map((charge, index) => {
                    return (
                      <Col md={4} sm={6} key={index}>
                        <div className="mb-3">
                          <Label className="header-child">{charge[0]}*</Label>
                          <Input
                            min={0}
                            step={0.5}
                            value={charge[1]}
                            onChange={(val) => {
                              charge[1] = val.target.value;
                              setrefresh(!refresh);
                            }}
                            type="number"
                            name="main_amt"
                            className="form-control-md input"
                            placeholder={`Enter ${charge[0]}`}
                          />
                        </div>
                      </Col>
                    );
                  })}
                </Row>

                {additional_charges.length > 0 && (
                  <>
                    <Row>
                      <Col md={5}>
                        <Label>Charge Name</Label>
                      </Col>
                      <Col md={5}>
                        <Label>Charge Value</Label>
                      </Col>
                      <Col md={2}>
                        <Label>Delete</Label>
                      </Col>
                    </Row>

                    {additional_charges.map((item, index) => {
                      return (
                        <Row key={index} style={{ marginBottom: 10 }}>
                          <Col md={5}>
                            <MultiRowSearchInput
                              data_list={rem_charges}
                              setdata_list={setrem_charges}
                              data_item_s={item[0]}
                              page={chg_page}
                              setpage={setchg_page}
                              setsearch_txt={setsearch_txt}
                              error_message={"Please Select Any Option"}
                              refresh={refresh}
                              setrefresh={setrefresh}
                            />
                          </Col>
                          <Col md={5}>
                            <Input
                              value={item[1]}
                              type="number"
                              name="order_no"
                              min={0}
                              step={0.5}
                              className="form-control-md input"
                              onChange={(val) => {
                                item[1] = val.target.value;
                                setrefresh(!refresh);
                              }}
                              placeholder="Enter Charge Value"
                            />
                          </Col>
                          <Col md={2}>
                            <IconContext.Provider
                              value={{ color: "red", size: "20px" }}
                            >
                              <div
                                onClick={() => {
                                  if (
                                    window.confirm(
                                      "Do You Want To Delete This Entry ?"
                                    ) === true
                                  ) {
                                    removeCharge(item, index);
                                  } else {
                                  }
                                }}
                              >
                                <MdDelete />
                              </div>
                            </IconContext.Provider>
                          </Col>
                        </Row>
                      );
                    })}
                  </>
                )}

                {show_add_link && (
                  <Row style={{ marginTop: 10 }}>
                    <Col md={12}>
                      <span
                        className="link-text"
                        onClick={() => {
                          let last_entr =
                            additional_charges.length > 0
                              ? additional_charges[0]
                              : [];
                          addCharge(last_entr);
                        }}
                        style={{
                          fontSize: "14px",
                          color: "purple",
                          cursor: "pointer",
                        }}
                      >
                        <IconContext.Provider
                          value={{
                            className: "icon",
                          }}
                        >
                          <MdAdd />
                        </IconContext.Provider>
                        Add Additional Charges
                      </span>
                    </Col>
                  </Row>
                )}
              </CardBody>
            ) : null}
          </Card>
        </Col>
      </div>

      {/*Button */}
      <div className=" m-4">
        <Col lg={12}>
          <div className="mb-1 footer_btn">
            <button type="submit" className="btn btn-info m-1">
              Save
            </button>

            <button
              type="submit"
              className="btn btn-info m-1"
              onClick={() => navigate("/billing/billclosed")}
            >
              Cancel
            </button>
          </div>
        </Col>
      </div>
    </Form>
  );
};

export default AddBillClosed;
