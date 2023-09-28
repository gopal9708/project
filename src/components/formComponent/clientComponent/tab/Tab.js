import React, { useState, useLayoutEffect } from "react";
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
import { useSelector } from "react-redux";

import axios from "axios";
import toTitleCase from "../../../../lib/titleCase/TitleCase";
import {
  setAirCal,
  setCargoCal,
  setCourierCal,
  setLocalCal,
  setSurfaceCal,
  setTrainCal,
} from "../../../../store/master/client/Client";
import { ServerAddress } from "../../../../constants/ServerAddress";
import CalTab from "../cal_tab/CalTab";

const Tab = ({
  activeTab,
  setactiveTab,

  // active tabs
  active_tabs,

  is_local,
  is_air,
  is_surface,
  is_cargo,
  is_train,
  is_courier,
  is_warehouse,
}) => {
  const accessToken = useSelector((state) => state.authentication.access_token);
  // const search = useSelector((state) => state.searchbar.search_item);

  //  Additional Charges

  const [oth_charges_list, setoth_charges_list] = useState([]);
  const [ot_chg_page, setot_chg_page] = useState(1);
  const [ot_search_txt, setot_search_txt] = useState("");

  const local_cal = useSelector((state) => state.client.local_cal);
  const local_cal_dimn = useSelector((state) => state.client.local_cal.dimn);
  const local_cal_box_cal = useSelector(
    (state) => state.client.local_cal.box_cal
  );

  const air_cal = useSelector((state) => state.client.air_cal);
  const air_cal_dimn = useSelector((state) => state.client.air_cal.dimn);
  const air_cal_box_cal = useSelector((state) => state.client.air_cal.box_cal);

  const surface_cal = useSelector((state) => state.client.surface_cal);
  const surface_cal_dimn = useSelector(
    (state) => state.client.surface_cal.dimn
  );
  const surface_cal_box_cal = useSelector(
    (state) => state.client.surface_cal.box_cal
  );

  const cargo_cal = useSelector((state) => state.client.cargo_cal);
  const cargo_cal_dimn = useSelector((state) => state.client.cargo_cal.dimn);
  const cargo_cal_box_cal = useSelector(
    (state) => state.client.cargo_cal.box_cal
  );

  const train_cal = useSelector((state) => state.client.train_cal);
  const train_cal_dimn = useSelector((state) => state.client.train_cal.dimn);
  const train_cal_box_cal = useSelector(
    (state) => state.client.train_cal.box_cal
  );

  const courier_cal = useSelector((state) => state.client.courier_cal);
  const courier_cal_dimn = useSelector(
    (state) => state.client.courier_cal.dimn
  );
  const courier_cal_box_cal = useSelector(
    (state) => state.client.courier_cal.box_cal
  );

  

  const [local_cal_errd, setlocal_cal_errd] = useState(false);
  const [local_cal_errb, setlocal_cal_errb] = useState(false);

  const getSecOthCharges = () => {
    let temp_lis = [...oth_charges_list];
    axios
      .get(
        ServerAddress +
          `master/all_charges/?search=${""}&p=${ot_chg_page}&records=${10}&charge_category=${[
            "OTHER CHARGE",
          ]}&charge_name_search=${ot_search_txt}&data=all`,
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
        temp_lis = [...new Set(temp_lis.map((v) => `${v}`))].map((v) =>
          v.split(",")
        );
        setoth_charges_list(temp_lis);
      })
      .catch((err) => {
        alert(`Error Occur while getting charges , ${err}`);
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
            {is_local && (
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
            )}

            {is_air && (
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
            )}

            {is_surface && (
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
            )}
            {is_cargo && (
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
            )}

            {is_train && (
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
            )}

            {is_courier && (
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
            )}

            {is_warehouse && (
              <NavItem>
                <NavLink
                  style={{ cursor: "pointer", fontSize: "16px" }}
                  className={classnames({
                    active: activeTab === "7",
                  })}
                  onClick={() => {
                    toggle("7");
                  }}
                >
                  Warehouse
                </NavLink>
              </NavItem>
            )}
          </Nav>

          <TabContent activeTab={activeTab} className="p-3 text-muted">
            {is_local && (
              <TabPane tabId="1">
               
                {activeTab == "1" && (
                  <CalTab
                    cal={local_cal}
                    cal_dimn={local_cal_dimn}
                    box_cal={local_cal_box_cal}
                    active_tabs={active_tabs}
                    setactive_tabs={setactiveTab}
                    setCal={setLocalCal}
                  />
                )}
              </TabPane>
            )}
            {is_air && (
              <TabPane tabId="2">
                {activeTab === "2" && (
                  <CalTab
                    cal={air_cal}
                    cal_dimn={air_cal_dimn}
                    box_cal={air_cal_box_cal}
                    active_tabs={active_tabs}
                    setactive_tabs={setactiveTab}
                    setCal={setAirCal}
                  />
                )}
              </TabPane>
            )}
            {is_surface && (
              <TabPane tabId="3">
                {activeTab === "3" && (
                  <CalTab
                    cal={surface_cal}
                    cal_dimn={surface_cal_dimn}
                    box_cal={surface_cal_box_cal}
                    active_tabs={active_tabs}
                    setactive_tabs={setactiveTab}
                    setCal={setSurfaceCal}
                  />
                )}
              </TabPane>
            )}
            {is_cargo && (
              <TabPane tabId="4">
                {activeTab === "4" && (
                  <CalTab
                    cal={cargo_cal}
                    cal_dimn={cargo_cal_dimn}
                    box_cal={cargo_cal_box_cal}
                    active_tabs={active_tabs}
                    setactive_tabs={setactiveTab}
                    setCal={setCargoCal}
                  />
                )}
              </TabPane>
            )}
            {is_train && (
              <TabPane tabId="5">
                {activeTab === "5" && (
                  <CalTab
                    cal={train_cal}
                    cal_dimn={train_cal_dimn}
                    box_cal={train_cal_box_cal}
                    active_tabs={active_tabs}
                    setactive_tabs={setactiveTab}
                    setCal={setTrainCal}
                  />
                )}
              </TabPane>
            )}

            {is_courier && (
              <TabPane tabId="6">
                {activeTab === "6" && (
                  <CalTab
                    cal={courier_cal}
                    cal_dimn={courier_cal_dimn}
                    box_cal={courier_cal_box_cal}
                    active_tabs={active_tabs}
                    setactive_tabs={setactiveTab}
                    setCal={setCourierCal}
                  />
                )}
              </TabPane>
            )}

            {is_warehouse && (
              <TabPane tabId="7">
                {activeTab === "7" && (
                  <Row>
                    <Col lg={3}>
                      <Label className="header-child">
                        &nbsp; Warehouse Charge
                      </Label>
                      <Input
                        onChange={(val) => {
                          // setpincode(val.target.value);
                        }}
                        // value={pincode}
                        type="text"
                        className="form-control-md"
                        id="input"
                        name="pincode1"
                        placeholder="Enter Warehouse Charge"
                      />
                    </Col>
                  </Row>
                )}
              </TabPane>
            )}
          </TabContent>
        </CardBody>
      </Col>
    </div>
  );
};

export default Tab;
