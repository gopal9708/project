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
import SearchInput from "../../../components/formComponent/searchInput/SearchInput";
import toTitleCase from "../../../lib/titleCase/TitleCase";
import {
  setAlertType,
  setDataExist,
  setShowAlert,
} from "../../../store/alert/Alert";
import NSearchInput from "../../../components/formComponent/nsearchInput/NSearchInput";
import ClientOrdersDataFormat from "../../../data/billings/invoices/clientOrders/ClientOrdersDataFormat";

const AddInvoice = () => {

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

  //  Order Wise State
  const [remark, setremark] = useState("");
  const [discount, setdiscount] = useState("");
  const [draft, setdraft] = useState(false);

  //modal state
  const [active_tab, setactive_tab] = useState("first");

  const [show_Table, setshow_Table] = useState(false);
  const [client, setclient] = useState("");
  const [client_id, setclient_id] = useState(0);
  const [client_page, setclient_page] = useState(1);
  const [client_search, setclient_search] = useState("");
  const [client_list, setclient_list] = useState([]);

  const [cl_ords_list, setcl_ords_list] = useState([]);
  const [cl_ords_page, setcl_ords_page] = useState(1);

  const [inv_st_list_list, setinv_st_list_list] = useState([
    "Approved",
    "Pending",
    "Dispute",
    //  "Partial Paid"
  ]);
  const [inv_status, setinv_status] = useState("");
  const [inv_status_err, setinv_status_err] = useState(false);

  const createInvoice = () => {
    let tmps = [];
    for (let h = 0; h < cl_ords_list.length; h++) {
      const ord = cl_ords_list[h];
      if (ord.included) {
        tmps.push([ord["id"], ord["add_rmark"]]);
      }
    }

    if (tmps.length === 0) {
      alert("No Order Included to Create Invoice");
    } else {
      axios
        .post(
          ServerAddress + "billing/add_inv_ord/",
          {
            client_orders: tmps,
            client: client_id,
            remark_r: toTitleCase(remark).toUpperCase(),
            discount_r: toTitleCase(discount).toUpperCase(),
            is_draft: draft,
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
    }
  };

  // const update_warai = () => {
  //   let order_ids = created_warai.map(v => [v.id, total * v.total_quantity])
  //   axios
  //     .put(
  //       ServerAddress + "billing/update_warai_charges/" + warai_id,
  //       {
  //         no_of_boxes: total_boxes,
  //         warai_charge: total,
  //         total_amount: warai_amount,
  //         voucher_number: toTitleCase(voucher_no).toUpperCase(),
  //         voucher_amount: toTitleCase(voucher_amount).toUpperCase(),
  //         warai_date: warai_date,
  //         warai_image: warai_image,
  //         order_ids: order_ids,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       }
  //     )
  //     .then(function (resp) {
  //
  //       if (resp.data.status === "success") {
  //         dispatch(setShowAlert(true));
  //         dispatch(
  //           setDataExist(`Warai Updated sucessfully`)
  //         );
  //         dispatch(setAlertType("info"));
  //         navigate(-1)
  //       }
  //     })
  //     .catch(function () {
  //       alert("Error Error While  Updateing Warai");
  //     });
  // };

  const getClients = () => {
    axios
      .get(
        ServerAddress +
          `master/all_clients/?search=${""}&p=${client_page}&records=${10}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((resp) => {
        let cl_lst = resp.data.results.map((cl) => [cl.id, cl.name]);
        setclient_list(cl_lst);
      })
      .catch((err) => {
        alert(`Error Occur in Get 3 , ${err}`);
      });
  };

  const getClientOrders = () => {
    axios
      .get(
        ServerAddress +
          `billing/get_client_ords/?search=${""}&p=${cl_ords_page}&records=${10}&client=${client_id}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((resp) => {
        for (const v of resp.data.results) {
          v["included"] = true;
          v["add_rmark"] = "";
        }
        setcl_ords_list(resp.data.results);
      })
      .catch((err) => {
        alert(`Error Occur in Get 3 , ${err}`);
      });
  };

  useLayoutEffect(() => {
    try {
      let inv_up = up_params.invoice;

      setisupdating(true);
      setclient_id(inv_up.client);
      setclient(inv_up.client_name);
      setdiscount(inv_up.discount);
      setremark(inv_up.remark);
      setdraft(inv_up.is_draft);
    } catch (error) {}
  }, []);

  useLayoutEffect(() => {
    getClients();
  }, [client_page, client_search]);

  useEffect(() => {
    if (client_id !== 0) {
      setshow_Table(true);
      getClientOrders();
    }
  }, [client_id]);

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        createInvoice();
        return false;
      }}
    >
      {/* Coloader */}
      <div className="m-4">
        <div className=" mb-2 main-header">
          {isupdating ? "Update Invoice" : "Add Invoice"}{" "}
        </div>
        <Col lg={12}>
          <Card className="shadow bg-white rounded">
            <CardTitle className="mb-1  " id="packages">
              <div className="btn-header">
                <div className="btn-subheader">
                  <div
                    style={{
                      background: active_tab === "first" ? "#C4D7FE" : null,
                    }}
                    className="btn1 footer-text"
                    value="first"
                    onClick={() => {
                      setactive_tab("first");
                    }}
                  >
                    Client Wise
                  </div>

                  <div
                    style={{
                      background: active_tab === "second" ? "#C4D7FE" : null,
                    }}
                    className="btn1 footer-text"
                    value="second"
                    onClick={() => {
                      setactive_tab("second");
                    }}
                  >
                    Order Wise
                  </div>
                </div>
                <div className="btn-icon">
                  <IconContext.Provider
                    value={{
                      className: "header-add-icon",
                    }}
                  >
                    <div onClick={toggle_circle}>
                      {circle_btn ? (
                        <MdAddCircleOutline />
                      ) : (
                        <MdRemoveCircleOutline />
                      )}
                    </div>
                  </IconContext.Provider>
                </div>
              </div>
            </CardTitle>

            {circle_btn ? (
              <CardBody>
                <Row>
                  {active_tab === "first" ? (
                    // Client Wise Report
                    <>
                      <Col lg={12} md={12} sm={12}>
                        <div className="mb-3">
                          {/*  Form Should Be there  */}

                          <Col lg={22} md={22} sm={22}>
                            <Row>
                              {/*  Select Bill To name For CLient WIse Report */}
                              <Col lg={3} md={4} sm={6}>
                                <div className="mb-3">
                                  <Label className="header-child">
                                    Select Client
                                  </Label>

                                  <SearchInput
                                    data_list={client_list}
                                    setdata_list={setclient_list}
                                    data_item_s={client}
                                    set_data_item_s={setclient}
                                    set_id={setclient_id}
                                    page={client_page}
                                    setpage={setclient_page}
                                    error_message={"Please Select Any Option"}
                                    search_item={client_search}
                                    setsearch_item={setclient_search}
                                  />
                                </div>
                              </Col>

                              <Col lg={3} md={4} sm={6}>
                                <div className="mb-3">
                                  <Label className="header-child">
                                    Discount
                                  </Label>

                                  <Input
                                    value={discount}
                                    onChange={(val) => {
                                      setdiscount(val.target.value);
                                    }}
                                  />
                                </div>
                              </Col>
                              <Col lg={3} md={4} sm={6}>
                                <div className="mb-3">
                                  <Label className="header-child">Remark</Label>

                                  <Input
                                    value={remark}
                                    onChange={(val) => {
                                      setremark(val.target.value);
                                    }}
                                  />
                                </div>
                              </Col>

                              <Col lg={3} md={4} sm={6}>
                                <div className="mb-2">
                                  <Label className="header-child">
                                    Draft Version
                                  </Label>

                                  <Row>
                                    <Col lg={4} md={6} sm={6}>
                                      <div className="form-check mb-2">
                                        <Input
                                          className="form-check-input-sm"
                                          type="checkbox"
                                          onClick={() => {
                                            setdraft(!draft);
                                          }}
                                          checked={draft}
                                          readOnly
                                        />

                                        <label
                                          className="form-check-label input-box"
                                          htmlFor="exampleRadios1"
                                        >
                                          Draft
                                        </label>
                                      </div>
                                    </Col>
                                  </Row>
                                </div>
                              </Col>

                              <Col lg={3} md={4} sm={6}>
                                <div className="mb-2">
                                  <Label className="header-child">
                                    Invoice Status
                                  </Label>

                                  {/* <Search_input
                                            data_list={client_list}
                                            data_item_s={client}
                                            set_data_item_s={setclient}
                                            show_search={false}
                                            disable_me = {true}
                                          /> */}

                                  <NSearchInput
                                    data_list={inv_st_list_list}
                                    data_item_s={inv_status}
                                    set_data_item_s={setinv_status}
                                    show_search={false}
                                    error_message={
                                      "Please Select Invoice Status"
                                    }
                                    error_s={inv_status_err}
                                  />
                                </div>
                              </Col>

                              {/* Draft Approved Date */}

                              <div
                                style={{
                                  marginTop: "10px",
                                  overflowX: "scroll",
                                }}
                              >
                                {show_Table && (
                                  <ClientOrdersDataFormat
                                    cl_ords_list={cl_ords_list}
                                  />
                                )}
                              </div>
                            </Row>
                          </Col>
                        </div>
                      </Col>
                    </>
                  ) : null}

                  {/* Order Wise Section Started */}
                  {circle_btn ? (
                    <CardBody>
                      {active_tab === "second" ? (
                        <>
                          <Col lg={12} md={12} sm={12}>
                            <div className="mb-3">
                              <Form>
                                <Col lg={22} md={22} sm={22}>
                                  <Row>
                                    {/* Select Docket Number For Order  Wise */}
                                    <Col lg={3} md={4} sm={6}>
                                      <div className="mb-3">
                                        <Label className="header-child">
                                          Select Docket No:
                                        </Label>

                                        {/* <Search_input
                                              data_list={docket_type_list}
                                              data_item_s={docket_type}
                                              set_data_item_s={setdocket_type}
                                              set_id={setdocket_id}
                                            /> */}
                                      </div>
                                    </Col>

                                    {/* Select Bill To Name For Order Wise */}
                                    <Col lg={3} md={4} sm={6}>
                                      <div className="mb-3">
                                        <Label className="header-child">
                                          Select Bill To Name :
                                        </Label>

                                        {/* <Search_input
                                              data_list={client_type_list}
                                              data_item_s={client_type}
                                              set_data_item_s={setclient_type}
                                              error_message="Select Client"
                                            /> */}
                                      </div>
                                    </Col>

                                    {/* Select Bill To Format For Order  Wise */}
                                    {/* <Col lg={3} md={4} sm={6}>
                                          <div className="mb-3">
                                            <Label className="header-child">
                                              Select Bill To Format:
                                            </Label>

                                            <Search_input
                                              data_list={client_type_list}
                                              data_item_s={client_type}
                                              set_data_item_s={setclient_type}
                                              error_message="Select Client"
                                            />
                                          </div>
                                        </Col> */}

                                    <Col lg={3} md={4} sm={6}>
                                      <div className="mb-3">
                                        <Label className="header-child">
                                          Message :
                                        </Label>

                                        <Input />
                                      </div>
                                    </Col>

                                    {/*  Create Button For Order Wise */}
                                    <Col lg={2} md={4} sm={6}>
                                      <div className="mb-2">
                                        <Label className="header-child"></Label>
                                        <div
                                          style={{
                                            height: "10%",
                                            paddingTop: "12px",
                                          }}
                                        >
                                          <Button
                                            type="Button"
                                            className="btn btn-info"
                                          >
                                            Create
                                          </Button>
                                        </div>
                                      </div>
                                    </Col>
                                  </Row>
                                </Col>
                              </Form>
                            </div>
                          </Col>
                        </>
                      ) : (
                        ""
                      )}
                    </CardBody>
                  ) : null}
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
            <button type="submit" className="btn btn-info m-1">
              Save
            </button>

            <button
              type="button"
              className="btn btn-info m-1"
              onClick={() => navigate("/billing/invoices")}
            >
              Cancel
            </button>
          </div>
        </Col>
      </div>
    </Form>
  );
};

export default AddInvoice;
