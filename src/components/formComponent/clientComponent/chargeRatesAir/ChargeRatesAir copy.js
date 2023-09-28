import React, { useState, useLayoutEffect, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { FiSquare, FiCheckSquare } from "react-icons/fi";
import { Col, Row, Input, Label, FormFeedback } from "reactstrap";
import { IconContext } from "react-icons";
import { MdAdd } from "react-icons/md";
import { Button } from "react-bootstrap";

const ChargeRatesAir = ({
  refresh,
  setrefresh,
  // rate_category,
  // sec_charge,
  // freight_idx,
  // item,
  // index,
  // setfr_mn_amt_blr,

  // rate_blr,
  // nc_rate,

  // setrate_blr,
  // onfocus_inp,
  // setonfocus_inp,

  // setnc_rate,
  // cc_rate,
  // setcc_rate,

  // setnc_min_boxes,
  // setnc_min_amount,
  // setcc_min_boxes,
  // setcc_min_amount,

  // nc_min_amount,
  // cc_min_amount,
  // nc_min_boxes,
  // cc_min_boxes,

  // local_cal_type,

  // per_charge_list,
  // setper_charge_list,

  // is_per_charge,
}) => {
  const [same, setsame] = useState(false);
  const [per_of_otch_list, setper_of_otch_list] = useState([]);

  // useLayoutEffect(() => {
  //   let per_otch_tmp = per_charge_list.filter(
  //     (v) => v[1] == "% of other charges"
  //   );
  //   setper_of_otch_list(per_otch_tmp);
  // }, [refresh, per_charge_list]);

  return (
    <div style={{ marginBottom: 20 }}>
      <Row className="hide" style={{ marginTop: 20 }}>
        <Col md={3} sm={3} style={{ marginTop: -20 }}>
          <div className="mb-3">
            <Label className="header-child"></Label>
          </div>
          <div className="mb-3">
            <Label className="header-child">Cold Chain</Label>
          </div>
          <div className="mb-3">
            <Label className="header-child">Non Cold Chain</Label>
          </div>
        </Col>

        {item[1] == "Upto" && (
          <Col md={2} sm={2} style={{ marginTop: -20 }}>
            <div className="mb-3">
              <Label className="header-child">Min Boxes</Label>
              {/* <Input
                min={0}
                value={item[7]}
                type="number"
                className="form-control-md input"
                id="multi-input"
                style={{ marginBottom: "15px" }}
                placeholder="Enter Min Value"
                onChange={(val) => {
                  setrefresh(!refresh);
                  setnc_min_boxes(val.target.value);
                  item[7] = val.target.value;
                  if (same) {
                    item[8] = val.target.value;
                    setcc_min_boxes(val.target.value);
                  }
                }}
              />
              <Input
                min={0}
                value={item[8]}
                type="number"
                className="form-control-md input"
                id="multi-input"
                style={{ marginBottom: "15px" }}
                placeholder="Enter Min Value"
                onChange={(val) => {
                  setcc_min_boxes(val.target.value);
                  setrefresh(!refresh);
                  item[8] = val.target.value;
                }}
                disabled={same}
              /> */}
            </div>
          </Col>
        )}
        {(item[1] == "Upto" || item[1] == "Minimum") && (
          <Col md={2} sm={2} style={{ marginTop: -20 }}>
            <div className="mb-3">
              <Label className="header-child">Min Amount</Label>
              <Input
                min={0}
                value={item[9]}
                type="number"
                onBlur={() => setfr_mn_amt_blr(true)}
                className="form-control-md input"
                id="multi-input"
                style={{ marginBottom: "15px" }}
                placeholder="Enter Min Value"
                onChange={(val) => {
                  setrefresh(!refresh);
                  setnc_min_amount(val.target.value);
                  item[9] = val.target.value;
                  if (same) {
                    item[10] = val.target.value;
                    setcc_min_amount(val.target.value);
                  }
                }}
              />
              <Input
                min={0}
                value={item[10]}
                type="number"
                className="form-control-md input"
                id="multi-input"
                style={{ marginBottom: "15px" }}
                placeholder="Enter Min Value"
                onChange={(val) => {
                  setrefresh(!refresh);
                  setcc_min_amount(val.target.value);
                  item[10] = val.target.value;
                }}
                disabled={same}
              />
            </div>
          </Col>
        )}
        <Col md={3} sm={3} style={{ marginTop: -20 }}>
          <div className="mb-3">
            <Label className="header-child">
              Rate per {local_cal_type == "BOX" ? "Box" : "Kg"}
            </Label>

            <Input
              min={0}
              value={item[3]}
              type="number"
              // invalid={}
              className="form-control-md input"
              id="multi-input"
              style={{ marginBottom: "15px" }}
              placeholder="Enter Min Value"
              onChange={(val) => {
                setrefresh(!refresh);

                item[3] = val.target.value;
                setcc_rate(val.target.value);
              }}
            />

            <Input
              disabled={same}
              min={0}
              value={item[2]}
              type="number"
              onBlur={() => {
                setrate_blr(true);
              }}
              invalid={rate_blr == true && nc_rate == 0 && onfocus_inp == index}
              className="form-control-md input"
              id="multi-input"
              style={{ marginBottom: "15px" }}
              placeholder="Enter Min Value"
              onFocus={() => setonfocus_inp(index)}
              onChange={(val) => {
                setrefresh(!refresh);

                item[2] = val.target.value;
                setnc_rate(val.target.value);
                if (same) {
                  item[3] = val.target.value;
                  setcc_rate(val.target.value);
                }
              }}
            />
          </div>
        </Col>

        {per_of_otch_list.length > 0 && is_per_charge && (
          <>
            {per_of_otch_list.map((chg, iddx) => {
              chg[2] = { ...chg[2] };
              chg[2][item[0][0]] = chg[2][item[0][0]]
                ? chg[2][item[0][0]]
                : [0, 0];

              return (
                <Col lg={2} style={{ marginTop: -20 }} key={iddx}>
                  <div className="mb-3">
                    <Label className="header-child">{chg[0][1]} %</Label>

                    <Input
                      min={0}
                      type="number"
                      value={chg[2][item[0][0]][0]}
                      className="form-control-md input"
                      id="multi-input"
                      style={{ marginBottom: "15px" }}
                      onChange={(val) => {
                        chg[2][item[0][0]][0] = val.target.value;
                        if (same) {
                          chg[2][item[0][0]][1] = val.target.value;
                        }
                        setrefresh(!refresh);
                      }}
                      step={0.01}
                    />

                    <Input
                      min={0}
                      type="number"
                      value={chg[2][item[0][0]][1]}
                      className="form-control-md input"
                      id="multi-input"
                      style={{ marginBottom: "15px" }}
                      onChange={(val) => {
                        chg[2][item[0][0]][1] = val.target.value;
                        setrefresh(!refresh);
                      }}
                      step={0.01}
                      disabled={same}
                    />
                  </div>
                </Col>
              );
            })}
          </>
        )}

        <Col lg={1} style={{ marginTop: -20 }}>
          <div className="mb-3">
            <Label className="header-child">Same</Label>
            <div
              onClick={() => {
                setsame(!same);
                if (!same) {
                  setcc_min_boxes(nc_min_boxes);
                  setcc_min_amount(nc_min_amount);
                  setcc_rate(nc_rate);
                  item[3] = item[2];
                  item[8] = item[7];
                  item[10] = item[9];
                  setcc_rate(nc_rate);
                  per_of_otch_list.map(
                    (v) => (v[2][item[0][0]][1] = v[2][item[0][0]][0])
                  );
                }
              }}
            >
              {same ? <FiCheckSquare size={20} /> : <FiSquare size={20} />}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ChargeRatesAir;
