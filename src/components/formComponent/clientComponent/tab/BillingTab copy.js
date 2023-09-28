import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import classnames from "classnames";
import {
  CardBody,
  Col,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  Nav,
  Input,
  Label,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";

// import Associated_Charges from "./Tab_Components/Associated_Charges";
import { FiCheckSquare, FiSquare } from "react-icons/fi";
import { IconContext } from "react-icons";
import { MdAdd, MdDelete } from "react-icons/md";
import axios from "axios";
import toTitleCase from "../../../../lib/titleCase/TitleCase";
import { setLocalCal } from "../../../../store/master/client/Client";
import { setLocalCalCust } from "../../../../store/master/customer/Customer";
import { ServerAddress } from "../../../../constants/ServerAddress";
import AssociatedCharges from "../associatedCharges/AssociatedCharges";
import SearchInput from "../../searchInput/SearchInput";
import MultiRowSearchInput from "../../multiRowSearchInput/MultiRowSearchInput";
import NSearchInput from "../../nsearchInput/NSearchInput";

const Tab = ({
  forp,
  // active tabs
  active_tabs,
  setactive_tabs,

  // Charge Type
  is_per_charge,
  setis_per_charge,
  is_ass_charge,
  setis_ass_charge,
  per_charge_list,
  setper_charge_list,

  // Bill Generation
  bill_generation_list,
  bill_generation,
  setbill_generation,

  // Associated_Charges Data
  associated_charges_local,
  setassociated_charges_local,

  setfreight_rate_category_o,
}) => {
  const dispatch = useDispatch();
  const refl = useRef();
  const accessToken = useSelector((state) => state.authentication.access_token);
  const username = useSelector((state) => state.authentication.username);
  // const search = useSelector((state) => state.searchbar.search_item);

  //  Additional Charges
  const [refresh, setrefresh] = useState(false);

  const [oth_charges_list, setoth_charges_list] = useState([]);
  const [ot_chg_page, setot_chg_page] = useState(1);
  const [ot_search_txt, setot_search_txt] = useState("");

  const local_cal = useSelector((state) => state.client.local_cal);

  const local_cal_dimn = useSelector((state) => state.client.local_cal.dimn);
  const local_cal_box_cal = useSelector(
    (state) => state.client.local_cal.box_cal
  );

  const local_cal_cust = useSelector((state) => state.customer.local_cal_cust);
  const local_cal_cust_dimn = useSelector(
    (state) => state.customer.local_cal_cust.dimn
  );
  const local_cal_cust_box_cal = useSelector(
    (state) => state.customer.local_cal_cust.box_cal
  );

  const [per_charge_categories, setper_charge_categories] = useState([
    "% of client invoice",
    "% of other charges",
  ]);

  const [activeTab, setactiveTab] = useState("1");

  // Cal Info Temp
  const [cft, setcft] = useState("");
  const [div_by, setdiv_by] = useState("");
  const [box_val, setbox_val] = useState("");
  const [refh, setrefh] = useState(false);

  const [transportation_mode, settransportation_mode] = useState("LOCAL");
  const [calculation_type, setcalculation_type] = useState("DONT");

  const [local_cal_errd, setlocal_cal_errd] = useState(false);
  const [local_cal_errb, setlocal_cal_errb] = useState(false);

  const getSecOthCharges = () => {
    let temp_lis = [...oth_charges_list];
    axios
      .get(
        ServerAddress +
          `master/all_charges/?search=${""}&p=${ot_chg_page}&records=${10}&primary_charges=${[
            "OTHER CHARGE",
          ]}&secondary_charge_search=${ot_search_txt}&data=all`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((resp) => {
        let data = resp.data.results;
        for (let index = 0; index < data.length; index++) {
          const chrg = data[index];
          temp_lis.push([chrg.id, toTitleCase(chrg.secondary_charge)]);
        }
        temp_lis = [...new Set(temp_lis.map((v) => `${v}`))].map((v) =>
          v.split(",")
        );
        setoth_charges_list(temp_lis);
      })
      .catch((err) => {
        alert(`Error Occur while getting secondary charges , ${err}`);
      });
  };

  const toggle = (tab) => {
    if (activeTab !== tab) {
      setactiveTab(tab);
    }
  };

  useLayoutEffect(() => {
    getSecOthCharges();
  }, [ot_chg_page, ot_search_txt]);

  return (
    <div>
      <Col lg={12}>
        <CardBody>
          <Nav tabs>
            <NavItem>
              <NavLink
                style={{
                  cursor: "pointer",
                  fontSize: "16px",
                  color: local_cal_errd || local_cal_errb ? "red" : "",
                }}
                className={classnames({
                  active: activeTab === "1",
                })}
                onClick={() => {
                  toggle("1");
                }}
              >
                Local
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                style={{ cursor: "pointer", fontSize: "16px" }}
                className={classnames({
                  active: activeTab === "2",
                })}
                onClick={() => {
                  toggle("2");
                }}
              >
                Air
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                style={{ cursor: "pointer", fontSize: "16px" }}
                className={classnames({
                  active: activeTab === "3",
                })}
                onClick={() => {
                  toggle("3");
                }}
              >
                Surface
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                style={{ cursor: "pointer", fontSize: "16px" }}
                className={classnames({
                  active: activeTab === "4",
                })}
                onClick={() => {
                  toggle("4");
                }}
              >
                Cargo
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                style={{ cursor: "pointer", fontSize: "16px" }}
                className={classnames({
                  active: activeTab === "5",
                })}
                onClick={() => {
                  toggle("5");
                }}
              >
                Train
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                style={{ cursor: "pointer", fontSize: "16px" }}
                className={classnames({
                  active: activeTab === "6",
                })}
                onClick={() => {
                  toggle("6");
                }}
              >
                Courier
              </NavLink>
            </NavItem>
          </Nav>

          <TabContent activeTab={activeTab} className="p-3 text-muted">
            <TabPane tabId="1">
              {/* <Label style={{ fontSize: 18 }}>Calculation</Label> */}
              <Row className="mb-2">
                <Label className="header-child" style={{ marginRight: "20px" }}>
                  Calculation Type:
                </Label>

                <Col lg={3}>
                  <Input
                    className="form-control-md"
                    id="input"
                    type="radio"
                    name="calculation_type_local"
                    value="DONT"
                    onClick={() => {
                      if (forp === "client") {
                        dispatch(
                          setLocalCal({
                            ...local_cal,
                            cal_type: "DONT",
                          })
                        );
                      } else {
                        dispatch(
                          setLocalCalCust({
                            ...local_cal_cust,
                            cal_type: "DONT",
                          })
                        );
                      }

                      active_tabs[0] = "DONT";
                      setrefh(!refh);
                    }}
                    checked={
                      forp === "client"
                        ? local_cal.cal_type === "DONT"
                        : local_cal_cust.cal_type === "DONT"
                    }
                    readOnly
                  />
                  <Label className="header-child">&nbsp; Don't Use</Label>
                </Col>

                <Col lg={3}>
                  <Input
                    className="form-control-md"
                    id="input"
                    type="radio"
                    name="calculation_type_local"
                    value="DIMENSION"
                    onClick={() => {
                      settransportation_mode("LOCAL");
                      setcalculation_type("DIMENSION");

                      if (forp === "client") {
                        dispatch(
                          setLocalCal({
                            ...local_cal,
                            cal_type: "DIMENSION",
                          })
                        );
                      } else {
                        dispatch(
                          setLocalCalCust({
                            ...local_cal_cust,
                            cal_type: "DIMENSION",
                          })
                        );
                      }
                      active_tabs[0] = "DIMENSION";
                      setrefh(!refh);
                    }}
                    checked={
                      forp === "client"
                        ? local_cal.cal_type === "DIMENSION"
                        : local_cal_cust.cal_type === "DIMENSION"
                    }
                    readOnly
                  />
                  <Label
                    className="header-child"
                    style={{ color: local_cal_errd ? "red" : "" }}
                  >
                    &nbsp; Use Dimension (K.G)
                  </Label>
                </Col>

                <Col lg={3}>
                  <Input
                    className="form-control-md"
                    id="input"
                    type="radio"
                    name="calculation_type_local"
                    value="BOX"
                    onClick={() => {
                      settransportation_mode("LOCAL");
                      setcalculation_type("BOX");

                      if (forp === "client") {
                        dispatch(
                          setLocalCal({
                            ...local_cal,
                            cal_type: "BOX",
                          })
                        );
                      } else {
                        dispatch(
                          setLocalCalCust({
                            ...local_cal_cust,
                            cal_type: "BOX",
                          })
                        );
                      }
                      active_tabs[0] = "BOX";
                      setrefh(!refh);
                    }}
                    checked={
                      forp == "client"
                        ? local_cal.cal_type == "BOX"
                        : local_cal_cust.cal_type == "BOX"
                    }
                    readOnly
                  />
                  <Label
                    className="header-child"
                    style={{ color: local_cal_errb ? "red" : "" }}
                  >
                    &nbsp; Use Box Calculation
                  </Label>
                </Col>
              </Row>

              <Row>
                {forp === "client" && local_cal.cal_type === "DIMENSION" && (
                  <>
                    <Col lg={3}>
                      <div className="mb-2">
                        <Label className="header-child">CFT</Label>
                        <Input
                          min={0}
                          className="form-control-md"
                          id="input"
                          placeholder="Enter CFT Value"
                          type="number"
                          value={local_cal_dimn.cft}
                          onChange={(val) => {
                            dispatch(
                              setLocalCal({
                                ...local_cal,
                                dimn: {
                                  ...local_cal.dimn,
                                  cft: val.target.value,
                                },
                              })
                            );
                            setcft(val.target.value);
                          }}
                        />
                      </div>
                    </Col>

                    <Col lg={3}>
                      <div className="mb-2">
                        <Label className="header-child">Divided By</Label>
                        <Input
                          min={0}
                          placeholder="Enter Divided By Value"
                          onChange={(val) => {
                            dispatch(
                              setLocalCal({
                                ...local_cal,
                                dimn: {
                                  ...local_cal.dimn,
                                  div_by: val.target.value,
                                },
                              })
                            );
                            setdiv_by(val.target.value);
                          }}
                          value={local_cal_dimn.div_by}
                          type="number"
                          name="cft_surface"
                          className="form-control-md"
                          id="input"
                        />
                      </div>
                    </Col>

                    <Col lg={3}>
                      <div className="mb-2">
                        <Label className="header-child">From Date</Label>
                        <Input
                          onChange={(val) => {
                            dispatch(
                              setLocalCal({
                                ...local_cal,
                                dimn: {
                                  ...local_cal.dimn,
                                  from_date: val.target.value,
                                },
                              })
                            );
                          }}
                          value={local_cal_dimn.from_date}
                          type="date"
                          name="cft_surface"
                          className="form-control-md"
                          id="input"
                        />
                      </div>
                    </Col>

                    <Col lg={3}>
                      <div className="mb-2">
                        <Label className="header-child">To Date</Label>
                        <Input
                          onChange={(val) => {
                            dispatch(
                              setLocalCal({
                                ...local_cal,
                                dimn: {
                                  ...local_cal.dimn,
                                  to_date: val.target.value,
                                },
                              })
                            );
                          }}
                          value={local_cal_dimn.to_date}
                          type="date"
                          name="cft_surface"
                          className="form-control-md"
                          id="input"
                        />
                      </div>
                    </Col>

                    {local_cal_errd && (
                      <Row>
                        <span style={{ color: "red" }}>
                          Please Fill All Dimension Calculation Values
                        </span>
                      </Row>
                    )}
                  </>
                )}

                {forp !== "client" &&
                  local_cal_cust.cal_type === "DIMENSION" && (
                    <>
                      <Col lg={3}>
                        <div className="mb-2">
                          <Label className="header-child">CFT</Label>
                          <Input
                            min={0}
                            className="form-control-md"
                            id="input"
                            placeholder="Enter CFT Value"
                            type="number"
                            value={local_cal_cust_dimn.cft}
                            onChange={(val) => {
                              dispatch(
                                setLocalCalCust({
                                  ...local_cal_cust,
                                  dimn: {
                                    ...local_cal_cust.dimn,
                                    cft: val.target.value,
                                  },
                                })
                              );
                              setcft(val.target.value);
                            }}
                          />
                        </div>
                      </Col>

                      <Col lg={3}>
                        <div className="mb-2">
                          <Label className="header-child">Divided By</Label>
                          <Input
                            min={0}
                            placeholder="Enter Divided By Value"
                            onChange={(val) => {
                              dispatch(
                                setLocalCalCust({
                                  ...local_cal_cust,
                                  dimn: {
                                    ...local_cal_cust.dimn,
                                    div_by: val.target.value,
                                  },
                                })
                              );
                              setdiv_by(val.target.value);
                            }}
                            value={local_cal_cust_dimn.div_by}
                            type="number"
                            name="cft_surface"
                            className="form-control-md"
                            id="input"
                          />
                        </div>
                      </Col>

                      <Col lg={3}>
                        <div className="mb-2">
                          <Label className="header-child">From Date</Label>
                          <Input
                            onChange={(val) => {
                              dispatch(
                                setLocalCalCust({
                                  ...local_cal_cust,
                                  dimn: {
                                    ...local_cal_cust.dimn,
                                    from_date: val.target.value,
                                  },
                                })
                              );
                            }}
                            value={local_cal_cust_dimn.from_date}
                            type="date"
                            name="cft_surface"
                            className="form-control-md"
                            id="input"
                          />
                        </div>
                      </Col>

                      <Col lg={3}>
                        <div className="mb-2">
                          <Label className="header-child">To Date</Label>
                          <Input
                            onChange={(val) => {
                              dispatch(
                                setLocalCalCust({
                                  ...local_cal_cust,
                                  dimn: {
                                    ...local_cal_cust.dimn,
                                    to_date: val.target.value,
                                  },
                                })
                              );
                            }}
                            value={local_cal_cust_dimn.to_date}
                            type="date"
                            name="cft_surface"
                            className="form-control-md"
                            id="input"
                          />
                        </div>
                      </Col>

                      {local_cal_errd && (
                        <Row>
                          <span style={{ color: "red" }}>
                            Please Fill All Dimension Calculation Values
                          </span>
                        </Row>
                      )}
                    </>
                  )}

                {forp == "client" && local_cal.cal_type == "BOX" && (
                  <>
                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">Box Value</Label>
                        <Input
                          min={0}
                          value={local_cal_box_cal.box_val}
                          onChange={(val) => {
                            dispatch(
                              setLocalCal({
                                ...local_cal,
                                box_cal: {
                                  ...local_cal.box_cal,
                                  box_val: val.target.value,
                                },
                              })
                            );
                            setbox_val(val.target.value);
                          }}
                          type="number"
                          name="box_val"
                          className="form-control-md"
                          id="input"
                        />
                      </div>
                    </Col>
                    <Col lg={4} md={6} sm={6}>
                      <div>
                        <Label className="header-child">Valid From Date</Label>
                        <Input
                          min={0}
                          onChange={(val) => {
                            dispatch(
                              setLocalCal({
                                ...local_cal,
                                box_cal: {
                                  ...local_cal.box_cal,
                                  from_date: val.target.value,
                                },
                              })
                            );
                          }}
                          value={local_cal_box_cal.from_date}
                          type="date"
                          name="cft_surface"
                          className="form-control-md"
                          id="input"
                        />
                      </div>
                    </Col>
                    <Col lg={4} md={6} sm={6}>
                      <div>
                        <Label className="header-child">Valid To Date</Label>
                        <Input
                          min={0}
                          onChange={(val) => {
                            dispatch(
                              setLocalCal({
                                ...local_cal,
                                box_cal: {
                                  ...local_cal.box_cal,
                                  to_date: val.target.value,
                                },
                              })
                            );
                          }}
                          value={local_cal_box_cal.to_date}
                          type="date"
                          name="cft_surface"
                          className="form-control-md"
                          id="input"
                        />
                      </div>
                    </Col>
                    {local_cal_errb && (
                      <Row>
                        <span style={{ color: "red" }}>
                          Please Fill All Box Calculation Values
                        </span>
                      </Row>
                    )}
                  </>
                )}

                {forp != "client" && local_cal_cust.cal_type == "BOX" && (
                  <>
                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">Box Value</Label>
                        <Input
                          min={0}
                          value={local_cal_cust_box_cal.box_val}
                          onChange={(val) => {
                            dispatch(
                              setLocalCalCust({
                                ...local_cal_cust,
                                box_cal: {
                                  ...local_cal_cust.box_cal,
                                  box_val: val.target.value,
                                },
                              })
                            );
                            setbox_val(val.target.value);
                          }}
                          type="number"
                          name="box_val"
                          className="form-control-md"
                          id="input"
                        />
                      </div>
                    </Col>
                    <Col lg={4} md={6} sm={6}>
                      <div>
                        <Label className="header-child">Valid From Date</Label>
                        <Input
                          min={0}
                          onChange={(val) => {
                            dispatch(
                              setLocalCalCust({
                                ...local_cal_cust,
                                box_cal: {
                                  ...local_cal_cust.box_cal,
                                  from_date: val.target.value,
                                },
                              })
                            );
                          }}
                          value={local_cal_cust_box_cal.from_date}
                          type="date"
                          name="cft_surface"
                          className="form-control-md"
                          id="input"
                        />
                      </div>
                    </Col>
                    <Col lg={4} md={6} sm={6}>
                      <div>
                        <Label className="header-child">Valid To Date</Label>
                        <Input
                          min={0}
                          onChange={(val) => {
                            dispatch(
                              setLocalCalCust({
                                ...local_cal_cust,
                                box_cal: {
                                  ...local_cal_cust.box_cal,
                                  to_date: val.target.value,
                                },
                              })
                            );
                          }}
                          value={local_cal_cust_box_cal.to_date}
                          type="date"
                          name="cft_surface"
                          className="form-control-md"
                          id="input"
                        />
                      </div>
                    </Col>
                    {local_cal_errb && (
                      <Row>
                        <span style={{ color: "red" }}>
                          Please Fill All Box Calculation Values
                        </span>
                      </Row>
                    )}
                  </>
                )}
              </Row>

              {forp == "client" && local_cal.cal_type != "DONT" && (
                <Row className="mb-3 mt-3">
                  <Col lg={4} md="6" sm="6">
                    <div className="mb-2">
                      <Label className="header-child">
                        Bill Generation Time Frame
                      </Label>

                      <NSearchInput
                        data_list={bill_generation_list}
                        data_item_s={bill_generation}
                        set_data_item_s={setbill_generation}
                        show_search={false}
                      />
                    </div>
                  </Col>
                </Row>
              )}

              {forp != "client" && local_cal_cust.cal_type != "DONT" && (
                <Row className="mb-3 mt-3">
                  <Col lg={4} md="6" sm="6">
                    <div className="mb-2">
                      <Label className="header-child">
                        Bill Generation Time Frame
                      </Label>

                      <NSearchInput
                        data_list={bill_generation_list}
                        data_item_s={bill_generation}
                        set_data_item_s={setbill_generation}
                        show_search={false}
                      />
                    </div>
                  </Col>
                </Row>
              )}

              {/* Charge Type Checkboxes */}
              {forp == "client" && local_cal.cal_type != "DONT" && (
                <Row className="mb-3 mt-3">
                  <Col lg={3} md={4} sm={8}>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <div onClick={() => setis_per_charge(!is_per_charge)}>
                        {is_per_charge ? (
                          <FiCheckSquare size={20} />
                        ) : (
                          <FiSquare size={20} />
                        )}
                      </div>
                      <Label className="header-child">
                        &nbsp; % of Charge{" "}
                      </Label>
                    </div>
                  </Col>

                  <Col lg={3} md={4} sm={8}>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <div onClick={() => setis_ass_charge(!is_ass_charge)}>
                        {is_ass_charge ? (
                          <FiCheckSquare size={20} />
                        ) : (
                          <FiSquare size={20} />
                        )}
                      </div>
                      <Label className="header-child">
                        &nbsp; Associated Charges{" "}
                      </Label>
                    </div>
                  </Col>
                </Row>
              )}

              {forp != "client" && local_cal_cust.cal_type != "DONT" && (
                <Row className="mb-3 mt-3">
                  <Col lg={3} md={4} sm={8}>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <div onClick={() => setis_per_charge(!is_per_charge)}>
                        {is_per_charge ? (
                          <FiCheckSquare size={20} />
                        ) : (
                          <FiSquare size={20} />
                        )}
                      </div>
                      <Label className="header-child">
                        &nbsp; % of Charge{" "}
                      </Label>
                    </div>
                  </Col>

                  <Col lg={3} md={4} sm={8}>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <div onClick={() => setis_ass_charge(!is_ass_charge)}>
                        {is_ass_charge ? (
                          <FiCheckSquare size={20} />
                        ) : (
                          <FiSquare size={20} />
                        )}
                      </div>
                      <Label className="header-child">
                        &nbsp; Associated Charges{" "}
                      </Label>
                    </div>
                  </Col>
                </Row>
              )}

              {/* % Of Other Charges */}
              {is_per_charge && (
                <div>
                  <Label style={{ fontSize: 20 }}>% Of Charges</Label>
                  <Row>
                    <Col md={4}>
                      <Label className="header-child">Charge Name</Label>
                    </Col>
                    <Col md={4}>
                      <Label className="header-child">Category</Label>
                    </Col>
                    <Col md={2}>
                      <Label className="header-child">Rate %</Label>
                    </Col>
                    <Col md={2}>
                      <Label className="header-child">Delete</Label>
                    </Col>
                  </Row>

                  {per_charge_list.map((per_chrg, idx) => {
                    return (
                      <Row
                        // className="pb-3"
                        key={idx}
                      >
                        <Col md={4}>
                          <MultiRowSearchInput
                            data_list={oth_charges_list}
                            setdata_list={setoth_charges_list}
                            data_item_s={per_charge_list[idx][0]}
                            page={ot_chg_page}
                            setpage={setot_chg_page}
                            setsearch_txt={setot_search_txt}
                            error_message={"Please Select Any Option"}
                            refresh={refresh}
                            setrefresh={setrefresh}
                          />
                        </Col>

                        <Col md={4}>
                          <Input
                            key={idx}
                            value={per_chrg[1]}
                            type="select"
                            onChange={(event) => {
                              setrefresh(!refresh);

                              per_chrg[1] = event.target.value;
                            }}
                            style={{ marginBottom: "15px" }}
                            className="form-control-md"
                            id="input"
                            // disabled={item[6]}
                          >
                            <option value="" hidden></option>
                            {per_charge_categories.map((itms, index) => {
                              return (
                                <option
                                  className="option"
                                  value={itms}
                                  key={index}
                                  // hidden={use_sec_ch_lst.some(v=> v[0] == itms[0])}
                                >
                                  {itms}
                                </option>
                              );
                            })}
                          </Input>
                        </Col>

                        <Col md={2}>
                          {per_chrg[1] == "% of client invoice" ? (
                            <Input
                              key={idx}
                              step={0.1}
                              className="form-control-md"
                              id="input"
                              placeholder="Enter Rate %"
                              type="number"
                              value={per_chrg[2]}
                              onChange={(val) => {
                                per_chrg[2] = val.target.value;
                                setrefresh(!refresh);
                              }}
                              disabled={false}
                            />
                          ) : (
                            <div style={{ paddingTop: 8, paddingBottom: 8 }}>
                              -
                            </div>
                          )}
                        </Col>

                        <Col md={2}>
                          {idx > 0 ? (
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: 34,
                                marginBottom: 18,
                              }}
                            >
                              <IconContext.Provider
                                value={{ color: "red", size: "20px" }}
                              >
                                <div
                                  style={{ cursor: "pointer" }}
                                  onClick={() => {
                                    if (
                                      window.confirm(
                                        "Do You Want To Delete this row ? "
                                      ) == true
                                    ) {
                                      let temp = [...per_charge_list];
                                      temp.splice(idx, 1);
                                      setper_charge_list(temp);
                                    } else {
                                    }
                                    setrefresh(!refresh);
                                  }}
                                >
                                  <MdDelete />
                                </div>
                              </IconContext.Provider>
                            </div>
                          ) : (
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: 34,
                                marginBottom: 18,
                              }}
                            >
                              {"-"}
                            </div>
                          )}
                        </Col>
                      </Row>
                    );
                  })}

                  {/* % Charge Add Btn */}
                  <div>
                    <span
                      className="link-text"
                      onClick={() => {
                        let per_tmp_lst = [["", ""], "", "", ""];
                        setper_charge_list([...per_charge_list, per_tmp_lst]);
                        setrefresh(!refresh);
                      }}
                      style={{
                        fontSize: "14px",
                        color: "purple",
                        cursor: "pointer",
                      }}
                    >
                      <IconContext.Provider
                        value={{
                          className: "link-text",
                        }}
                      >
                        <MdAdd />
                      </IconContext.Provider>
                      Add another % of Charge
                    </span>
                  </div>
                </div>
              )}

              {/* Associated Charges */}
              {is_ass_charge && (
                <div style={{ marginBottom: 20, marginTop: 20 }}>
                  <Label style={{ fontSize: 20 }}>Associated Charges</Label>
                  <AssociatedCharges
                    refresh={refresh}
                    setrefresh={setrefresh}
                    activeTab={activeTab}
                    associated_charges={associated_charges_local}
                    setassociated_charges={setassociated_charges_local}
                    setfreight_rate_category_o={setfreight_rate_category_o}
                    local_cal_type={local_cal.cal_type}
                    per_charge_list={per_charge_list}
                    setper_charge_list={setper_charge_list}
                    is_per_charge={is_per_charge}
                  />
                </div>
              )}
            </TabPane>
            <TabPane tabId="2">
              <span> Work Under Progress</span>
            </TabPane>
            <TabPane tabId="3">
              <span> Work Under Progress</span>
            </TabPane>
            <TabPane tabId="4">
              <span> Work Under Progress</span>
            </TabPane>
            <TabPane tabId="5">
              <span> Work Under Progress</span>
            </TabPane>
            <TabPane tabId="6">
              <span> Work Under Progress</span>
            </TabPane>
          </TabContent>
        </CardBody>
      </Col>
    </div>
  );
};

export default Tab;
