import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Input, Label, Row, Col } from "reactstrap";

const CalTab = ({
  active_tabs,
  cal,
  cal_dimn,
  box_cal,
  setCal,
}) => {
  const dispatch = useDispatch();

  const [transportation_mode, settransportation_mode] = useState("LOCAL");
  const [calculation_type, setcalculation_type] = useState("DONT");

  const [local_cal_errd, setlocal_cal_errd] = useState(false);
  const [local_cal_errb, setlocal_cal_errb] = useState(false);

  // Cal Info Temp
  const [cft, setcft] = useState("");
  const [divided_by, setdivided_by] = useState("");
  const [box_value, setbox_value] = useState("");
  const [refh, setrefh] = useState(false);

  return (
    <>
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
              dispatch(
                setCal({
                  ...cal,
                  cal_type: "DONT",
                })
              );

              active_tabs[0] = "DONT";
              setrefh(!refh);
            }}
            checked={cal.cal_type === "DONT"}
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
              dispatch(
                setCal({
                  ...cal,
                  cal_type: "DIMENSION",
                })
              );
              active_tabs[0] = "DIMENSION";
              setrefh(!refh);
            }}
            checked={cal.cal_type === "DIMENSION"}
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

              dispatch(
                setCal({
                  ...cal,
                  cal_type: "BOX",
                })
              );

              active_tabs[0] = "BOX";
              setrefh(!refh);
            }}
            checked={cal.cal_type === "BOX"}
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
        {cal.cal_type === "DIMENSION" && (
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
                  value={cal_dimn.cft}
                  onChange={(val) => {
                    dispatch(
                      setCal({
                        ...cal,
                        dimn: {
                          ...cal.dimn,
                          cft: val.target.value,
                        },
                      })
                    );
                    setrefh(!refh);
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
                      setCal({
                        ...cal,
                        dimn: {
                          ...cal.dimn,
                          divided_by: val.target.value,
                        },
                      })
                    );
                    setrefh(!refh);
                    setdivided_by(val.target.value);
                  }}
                  value={cal_dimn.divided_by}
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
                      setCal({
                        ...cal,
                        dimn: {
                          ...cal.dimn,
                          from_date: val.target.value,
                        },
                      })
                    );
                    setrefh(!refh);
                  }}
                  value={cal_dimn.from_date}
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
                      setCal({
                        ...cal,
                        dimn: {
                          ...cal.dimn,
                          to_date: val.target.value,
                        },
                      })
                    );
                    setrefh(!refh);
                  }}
                  value={cal_dimn.to_date}
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

        {cal.cal_type === "BOX" && (
          <>
            <Col lg={4} md={6} sm={6}>
              <div className="mb-2">
                <Label className="header-child">Box Value</Label>
                <Input
                  min={0}
                  value={box_cal.box_value}
                  onChange={(val) => {
                    dispatch(
                      setCal({
                        ...cal,
                        box_cal: {
                          ...cal.box_cal,
                          box_value: val.target.value,
                        },
                      })
                    );
                    setrefh(!refh);
                    setbox_value(val.target.value);
                  }}
                  type="number"
                  name="box_value"
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
                      setCal({
                        ...cal,
                        box_cal: {
                          ...cal.box_cal,
                          from_date: val.target.value,
                        },
                      })
                    );
                    setrefh(!refh);
                  }}
                  value={box_cal.from_date}
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
                      setCal({
                        ...cal,
                        box_cal: {
                          ...cal.box_cal,
                          to_date: val.target.value,
                        },
                      })
                    );
                    setrefh(!refh);
                  }}
                  value={box_cal.to_date}
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
    </>
  );
};

export default CalTab;
