import React, { useState, useLayoutEffect } from "react";
import { IconContext } from "react-icons";
import { MdAdd } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { Col, Row, Input, Label, Button } from "reactstrap";
import { useSelector } from "react-redux";
import { ServerAddress } from "../../../../constants/ServerAddress";
import toTitleCase from "../../../../lib/titleCase/TitleCase";
import ChargeRates from "../chargeRates/ChargeRates";
import MultiRowSearchInput from "../../multiRowSearchInput/MultiRowSearchInput";

const AssociatedCharges = ({
  refresh,
  setrefresh,
  activeTab,

  associated_charges,
  setassociated_charges,

  setfreight_rate_category_o,
  local_cal_type,

  per_charge_list,
  setper_charge_list,

  is_per_charge,
}) => {
  const accessToken = useSelector((state) => state.authentication.access_token);
  

  const [sec_charge, setsec_charge] = useState("");
  const [rate_category, setrate_category] = useState("");

  const [other_rate_categories, setother_rate_categories] = useState([
    "Per Box",
    "Per Docket",
    "% Of Total Amount",
    "% Of Total Freight",
  ]);
  const [other_rate_categoriesd, setother_rate_categoriesd] = useState([
    "Per Kg",
    "Per Docket",
    "% Of Total Amount",
    "% Of Total Freight",
  ]);

  const [rate, setrate] = useState("");
  const [duplicate, setduplicate] = useState(false);

  /// Asso new
  const [nc_rate, setnc_rate] = useState(0);
  const [cc_rate, setcc_rate] = useState(0);

  const [nc_min_boxes, setnc_min_boxes] = useState(0);
  const [nc_min_amount, setnc_min_amount] = useState(0);
  const [cc_min_boxes, setcc_min_boxes] = useState(0);
  const [cc_min_amount, setcc_min_amount] = useState(0);

  const [fr_mn_amt_blr, setfr_mn_amt_blr] = useState(false);


  const [rate_blr, setrate_blr] = useState(false);

  const [onfocus_inp, setonfocus_inp] = useState("");

  //   Freight Rates
  const [freight_rate_categories, setfreight_rate_categories] = useState([
    "Flat",
    "Minimum",
    "Upto",
  ]);

  const [freight_rate_category, setfreight_rate_category] = useState("");

  const [less_than_1_error, setless_than_1_error] = useState(false);
  const [greater_than_1_error, setgreater_than_1_error] = useState(false);
  const [freight_added, setfreight_added] = useState(0);

  const [changing, setchanging] = useState(false);
  const [freight_rate_error2, setfreight_rate_error2] = useState(false);
  const [ass_charges_err, setass_charges_err] = useState(false);
  const [btn_click, setbtn_click] = useState(false);

  const [sec_charges_list, setsec_charges_list] = useState([]);
  const [sec_search_txt, setsec_search_txt] = useState("");
  const [sec_search_page, setsec_search_page] = useState(1);

  const [freight_idx, setfreight_idx] = useState("");
  const [warai_idx, setwarai_idx] = useState("");
  const [oda_idx, setoda_idx] = useState("");

  const getSecondaryCharges = () => {
    let temp_lis = [];
    axios
      .get(
        ServerAddress +
          `master/all_charges/?search=${""}&p=${sec_search_page}&records=${10}&charge_category=${[
            "ASSOCIATED CHARGE",
          ]}&charge_name_search=${sec_search_txt}&data=all`,

        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((resp) => {
        let data = resp.data.results;
        for (let index = 0; index < data.length; index++) {
          const chrg = data[index];
          temp_lis.push([chrg.id, toTitleCase(chrg.charge_name)]);
        }
        setsec_charges_list(temp_lis);

        try {
          let fght_idx = temp_lis.find((val) => val[1] === "Freight")[0];
          setfreight_idx(fght_idx);
          let wrai_idx = temp_lis.find((val) => val[1] === "Warai")[0];
          setwarai_idx(wrai_idx);
          let oda_idx = temp_lis.find((val) => val[1] === "Oda")[0];
          setoda_idx(oda_idx);
        } catch {}
      })
      .catch((err) => {
        alert(`Error Occur while getting secondary charges , ${err}`);
      });
  };

  const addAssociated_Charge_entry = () => {
    let freigth_p = associated_charges.filter((val) => val[0] === freight_idx);
    setfreight_added(freigth_p.length);

    let dimension_list = [["", ""], "", 0, 0, activeTab, false, "", 0, 0, 0, 0];
    setassociated_charges([...associated_charges, dimension_list]);
    setsec_charge("");
    setrate_category("");
    setrate("");
  };

  const deleteAssociated_Charge_entry = (indx) => {
    let temp = [...associated_charges];
    temp.splice(indx, 1);
    setassociated_charges(temp);
    let last_entry = temp[temp.length - 1];
    setsec_charge(last_entry[1]);
    setrate_category(last_entry[2]);
    setrate(last_entry[3]);
  };

  useLayoutEffect(() => {
    getSecondaryCharges();
  }, [sec_search_txt, sec_search_page]);

  return (
    <>
      {/* Column */}
      <Row>
        <Col lg={3}>
          <div className="mb-3">
            <Label className="header-child">Charge Name</Label>
          </div>
        </Col>
        <Col lg={3}>
          <div className="mb-3">
            <Label className="header-child">Rate Category</Label>
          </div>
        </Col>
        <Col lg={1}>
          <div className="mb-3">
            <Label className="header-child">Delete</Label>
          </div>
        </Col>
      </Row>

      {associated_charges.map((item, index) => {
        return (
          <Row key={index}>
            <Col lg={3}>
              <div className="mb-3">
                {/* <Input
                  key={index}
                  value={item[0]}
                  type="select"
                  onChange={(event) => {
                    setrefresh(!refresh);
                    setsec_charge(event.target.value);
                    item[0] = event.target.value;
                  }}
                  style={{ marginBottom: "15px" }}
                  // disabled={item[5]}
                >
                  <option value="" hidden></option>
                  {sec_charges_list.map((itms, index) => {
                    return (
                      <option
                        className="option"
                        value={itms[0]}
                        key={index}
                        hidden={use_sec_ch_lst.some((v) => v[0] === itms[0])}
                      >
                        {itms[1]}
                      </option>
                    );
                  })}
                </Input> */}

                <MultiRowSearchInput
                  data_list={sec_charges_list}
                  setdata_list={setsec_charges_list}
                  data_item_s={associated_charges[index][0]}
                  page={sec_search_page}
                  setpage={setsec_search_page}
                  setsearch_txt={setsec_search_txt}
                  error_message={"Please Select Any Option"}
                  refresh={refresh}
                  setrefresh={setrefresh}
                />
              </div>
            </Col>
            <Col lg={3}>
              <div className="mb-3">
                {item[0][0] === warai_idx ? (
                  <div
                    className="mb-3"
                    style={{ paddingTop: 8, paddingBottom: 22 }}
                  >
                    -
                  </div>
                ) : (
                  <Input
                    key={index}
                    value={toTitleCase(item[1])}
                    type="select"
                    onChange={(event) => {
                      setrefresh(!refresh);
                      if (item[0][0] === freight_idx) {
                        setfreight_rate_category(event.target.value);
                        setfreight_rate_category_o(event.target.value);
                      } else {
                        setrate_category(event.target.value);
                      }
                      item[1] = event.target.value;
                    }}
                    style={{ marginBottom: "15px" }}
                  >
                    <option value="" hidden></option>
                    {item[0][0] === freight_idx && (
                      <>
                        {freight_rate_categories.map((item, idx) => {
                          return (
                            <option value={`${item}`} key={idx}>
                              {item}
                            </option>
                          );
                        })}
                      </>
                    )}
                    {item[0][0] !== freight_idx && (
                      <>
                        {local_cal_type === "BOX"
                          ? other_rate_categories.map((item, idx) => {
                              return (
                                <option value={`${item}`} key={idx}>
                                  {item}
                                </option>
                              );
                            })
                          : other_rate_categoriesd.map((item, idx) => {
                              return (
                                <option value={`${item}`} key={idx}>
                                  {item}
                                </option>
                              );
                            })}
                      </>
                    )}
                  </Input>
                )}
              </div>
            </Col>

            <Col lg={1}>
              <div className="mb-3">
                {associated_charges.length > 1 ? (
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
                            ) === true
                          ) {
                            deleteAssociated_Charge_entry(index);
                          } else {
                          }
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
              </div>
            </Col>
            <Col lg={3}>
              {item[0][0] !== warai_idx ? (
                <div className="mb-3">
                  <Button
                    color={item[5] ? "danger" : "success"}
                    disabled={duplicate}
                    onClick={() => {
                      item[5] = !item[5];

                      setrefresh(!refresh);
                    }}
                  >
                    {item[5] ? "Remove Rates" : "Add Rates"}
                  </Button>
                </div>
              ) : (
                <div
                  className="mb-3"
                  style={{ paddingTop: 8, paddingBottom: 22 }}
                >
                  -
                </div>
              )}
            </Col>

            {item[5] && (
              <div
                style={{
                  marginLeft: 20,
                  //  marginTop: 20,
                  marginBottom: 10,
                  backgroundColor: "#F2F2F6",
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderColor: "#000",
                  overflowX: "scroll",
                }}
              >
                {activeTab === "1" && (
                  <ChargeRates
                    refresh={refresh}
                    setrefresh={setrefresh}
                    rate_category={
                      item[0][0] === freight_idx
                        ? freight_rate_category
                        : item[1]
                    }
                    sec_charge={sec_charge}
                    freight_idx={freight_idx}
                    item={item}
                    index={index}
                    setfr_mn_amt_blr={setfr_mn_amt_blr}
                    setrate_blr={setrate_blr}
                    onfocus_inp={onfocus_inp}
                    setonfocus_inp={setonfocus_inp}
                    rate_blr={rate_blr}
                    nc_rate={nc_rate}
                    setnc_rate={setnc_rate}
                    cc_rate={cc_rate}
                    setcc_rate={setcc_rate}
                    setnc_min_boxes={setnc_min_boxes}
                    setnc_min_amount={setnc_min_amount}
                    setcc_min_boxes={setcc_min_boxes}
                    setcc_min_amount={setcc_min_amount}
                    nc_min_amount={nc_min_amount}
                    cc_min_amount={cc_min_amount}
                    nc_min_boxes={nc_min_boxes}
                    cc_min_boxes={cc_min_boxes}
                    local_cal_type={local_cal_type}
                    per_charge_list={per_charge_list}
                    setper_charge_list={setper_charge_list}
                    is_per_charge={is_per_charge}
                  />
                )}
              </div>
            )}
          </Row>
        );
      })}

      {less_than_1_error && (
        <div style={{ color: "red" }}>
          Please Add All Proper Data of Less than Freight Range
        </div>
      )}
      {greater_than_1_error && (
        <div style={{ color: "red" }}>
          Please Add All Proper Data of Greater than Freight Range
        </div>
      )}
      {sec_charges_list.length > 0 ? (
        <div>
          <span
            className="link-text"
            onClick={() => {
              setbtn_click(true);
              setrefresh(!refresh);

              let have_error =
                freight_rate_error2 ||
                greater_than_1_error ||
                less_than_1_error ||
                ass_charges_err;

              addAssociated_Charge_entry();
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
            Add another Associated Charge{" "}
          </span>
        </div>
      ) : (
        <div style={{ color: "red" }}>Duplicate Entry Found</div>
      )}

      {ass_charges_err && (
        <div style={{ color: "red" }}>Please Fill Associated Charge Data</div>
      )}
    </>
  );
};

export default AssociatedCharges;
