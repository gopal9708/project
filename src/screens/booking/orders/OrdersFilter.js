import React, { useState, useEffect } from "react";
import { Label } from "reactstrap";

import { Col, Row } from "reactstrap";
import "../../../assets/scss/filters/filter.scss";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import MultiSelect from "../../../components/formComponent/multiSelect/MultiSelect";
import { ServerAddress } from "../../../constants/ServerAddress";
import {
  setFilterA,
  setFilterB,
  setFilterC,
  setFilterD,
  setFilterE,
  setFilterF,
  setFilterG,
  setFilterH,
  setFilterI,
} from "../../../store/filterValue/FilterValue";
import { setToggle } from "../../../store/parentFilter/ParentFilter";
import toTitleCase from "../../../lib/titleCase/TitleCase";

function OrdersFilter() {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.authentication.access_token);
  const [page, setpage] = useState(1);
  const [search_txt, setsearch_txt] = useState("");
  const [toggle, settoggle] = useState(false);
  // Additional Fields
  const data_len = useSelector((state) => state.pagination.data_length);

  const [delivery_type_filter, setdelivery_type_filter] = useState([
    ["1", "Domestic"],
    ["2", "Local"],
    ["3", "International"],
  ]);
  const [delivery_type, setdelivery_type] = useState([]);
  const [delivery_type_id, setdelivery_type_id] = useState([]);

  const [order_origin_id, setorder_origin_id] = useState([]);

  const [order_destination_id, setorder_destination_id] = useState([]);

  const [transportation_mode_filter, settransportation_mode_filter] = useState([
    ["1", "Air"],
    ["2", "Surface"],
    ["3", "Train"],
  ]);
  const [transportation_mode, settransportation_mode] = useState([]);
  const [transportation_mode_id, settransportation_mode_id] = useState([]);

  const [current_branch_filter, setcurrent_branch_filter] = useState([]);
  const [current_branch, setcurrent_branch] = useState([]);
  const [current_branch_id, setcurrent_branch_id] = useState("");
  const [branch_page, setbranch_page] = useState(1);
  const [branch_page_search, setbranch_page_search] = useState("")
  const [current_branch_loaded, setcurrent_branch_loaded] = useState(false);
  const [current_branch_count, setcurrent_branch_count] = useState(1);
  const [current_branch_bottom, setcurrent_branch_bottom] = useState(100);


  const [current_status_filter, setcurrent_status_filter] = useState([
    ["1", "Shipment Delivered"],
    ["2", "Shipment Out For Delivery"],
    ["3", "Shipment Arrived at Hub"],
    ["4", "Shipment Picked Up"],
  ]);
  const [current_status, setcurrent_status] = useState([]);
  const [current_status_id, setcurrent_status_id] = useState([]);

  const [order_channel_filter, setorder_channel_filter] = useState([["WEB","Web"],["MOBILE","Mobile"]])
  const [order_channel, setorder_channel] = useState([])
  const [order_channel_id, setorder_channel_id] = useState([])

  const [created_by_filter, setcreated_by_filter] = useState([]);
  const [created_by, setcreated_by] = useState([]);
  const [created_by_id, setcreated_by_id] = useState([]);
  const [created_loaded, setcreated_loaded] = useState(false);
  const [created_count, setcreated_count] = useState(1);
  const [created_bottom, setcreated_bottom] = useState(100);
  const [cold_chain_btn, setcold_chain_btn] = useState(["True", "False"]);
  const [iscompleted, setiscompleted] = useState(["True", "False"]);

  const [order_type_filter, setorder_type_filter] = useState([
    ["1", "New"],
    ["2", "Return"],
    ["3", "Issue"],
    ["4", "Airport To Airport"],
  ]);
  const [order_type, setorder_type] = useState([]);
  const [order_type_id, setorder_type_id] = useState([]);

  const getuserdata = () => {
    let temp = [];
    let temp_list = [];
    axios
      .get(
        ServerAddress +
        `ems/all-users/?search=${search_txt}&p=${page}&records=${data_len}&home_branch=${[
          "",
        ]}&username=${[""]}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        // console.log("response========",)
        if (response.data.next === null) {
          setcreated_loaded(false);
        } else {
          setcreated_loaded(true);
        }
        temp = response.data.results;
        if (temp.length > 0) {
          if (page === 1) {
            temp_list = response.data.results.map((v) => [
              v.id,
              toTitleCase(v.username),
            ]);
          } else {
            temp_list = [
              ...created_by_filter,
              ...response.data.results.map((v) => [v.id, toTitleCase(v.username)]),
            ];
          }
          setcreated_count(created_count + 2);
          setcreated_by_filter(temp_list);
        }
        else {
          setcreated_by_filter([])
        }
      })
      .catch((err) => {
        alert(`Error Occur in Get ${err}`);
      });
    //   for (let index = 0; index < temp.length; index++) {
    //     temp_list.push([temp[index].id, toTitleCase(temp[index].username)]);
    //   }
    //   setcreated_by_filter(temp_list);
    // })
    // .catch((err) => {
    //   alert(`Error Occur in Get`);
    // });
  };

  // const getlocationdata = () => {
  //   let temp = [];
  //   let temp_list = [];
  //   axios
  //     .get(
  //       ServerAddress +
  //         "masters/api/all-locations/?place_id=all&filter_by=all",
  //       {
  //         headers: { Authorization: `Bearer ${accessToken}` },
  //       }
  //     )
  //     .then((response) => {
  //       temp = response.data;
  //       for (let index = 0; index < temp.length; index++) {
  //         temp_list.push([temp[index].id, temp[index].city_name]);
  //       }
  //       setorder_destination_filter(temp_list);
  //       setorder_origin_filter(temp_list);
  //     })
  //     .catch((err) => {
  //       alert(`Error Occur in Get`);
  //     });
  // };

  const getBranchdata = () => {
    let temp = [];
    let temp_list = [];
    axios
      .get(
        ServerAddress +
        `master/all-branches/?search=${branch_page_search}&p=${branch_page}&records=${10}&branch_name=${[
          "",
        ]}&branch_city=${[""]}&branch_search=${search_txt}&vendor=&data=all`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        if (response.data.next === null) {
          setcurrent_branch_loaded(false);
        } else {
          setcurrent_branch_loaded(true);
        }
        temp = response.data.results;
        if (temp.length > 0) {
          if (branch_page === 1) {
            temp_list = response.data.results.map((v) => [
              v.id,
              toTitleCase(v.name),
            ]);
          } else {
            temp_list = [
              ...current_branch_filter,
              ...response.data.results.map((v) => [v.id, toTitleCase(v.name)]),
            ];
          }
          setcurrent_branch_count(current_branch_count + 2);
          setcurrent_branch_filter(temp_list);
        }
        else {
          setcurrent_branch_filter([])
        }
      })
      .catch((err) => {
        alert(`Error Occur in Get ${err}`);
      });
  };
  const handleSubmit = () => {
    settoggle(true);
  };

  // useEffect(() => {
  //   getuserdata();
  //   // getlocationdata();
  //   getBranchdata();
  // }, []);
  useEffect(() => {
    getBranchdata();
  }, [branch_page, branch_page_search]);

  useEffect(() => {
    getuserdata();
  }, [page, search_txt]);

  useEffect(() => {
    settoggle(false);
  }, []);

  useEffect(() => {
    dispatch(setToggle(toggle));
  }, [toggle]);

  useEffect(() => {
    dispatch(setFilterA([String(delivery_type).toUpperCase()]));
    dispatch(setFilterB([cold_chain_btn]));
    dispatch(setFilterC([String(transportation_mode).toUpperCase()]));
    dispatch(setFilterD([String(current_status).toUpperCase()]));
    dispatch(setFilterE([created_by_id]));
    dispatch(setFilterF([current_branch_id]));
    // dispatch(setFilterG([order_origin_id]));
    dispatch(setFilterH([order_channel_id]));
    dispatch(setFilterI([iscompleted]));
    dispatch(setFilterG([String(order_type).toUpperCase()]));
  }, [
    delivery_type,
    cold_chain_btn,
    order_origin_id,
    order_channel_id,
    order_destination_id,
    transportation_mode,
    current_status,
    created_by_id,
    current_branch_id,
    iscompleted,
    order_type,
  ]);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div>
          <Label className="filter-label">By Delivery Type</Label>
          <MultiSelect
            list_a={delivery_type_filter}
            list_b={delivery_type}
            setlist_b={setdelivery_type}
            show_search={false}
            setlist_id={setdelivery_type_id}
            page={page}
            setpage={setpage}
            setsearch_txt={setsearch_txt}
          />
        </div>
        <div>
          <Label className="filter-label">Order Type </Label>
          <MultiSelect
            list_a={order_type_filter}
            list_b={order_type}
            setlist_b={setorder_type}
            show_search={false}
            setlist_id={setorder_type_id}
            page={page}
            setpage={setpage}
            setsearch_txt={setsearch_txt}
          />
        </div>
        {/* <div>
          <Label className="filter-label">By Order Origin</Label>
          <MultiSelect
            list_a={order_origin_filter}
            list_b={order_origin}
            setlist_b={setorder_origin}
            setlist_id={setorder_origin_id}
          />
        </div>
        <div>
          <Label className="filter-label">By Order Destination</Label>
          <MultiSelect
            list_a={order_destination_filter}
            list_b={order_destination}
            setlist_b={setorder_destination}
            setlist_id={setorder_destination_id}
          />
        </div> */}
        <div>
          <Label className="filter-label">By current branch</Label>
          <MultiSelect
            list_a={current_branch_filter}
            setlist_a={setcurrent_branch_filter}
            list_b={current_branch}
            setlist_b={setcurrent_branch}
            setlist_id={setcurrent_branch_id}
            show_search={true}
            page={branch_page}
            setpage={setbranch_page}
            setsearch_txt={setbranch_page_search}
            type={"backend"}
            loaded={current_branch_loaded}
            count={current_branch_count}
            bottom={current_branch_bottom}
            setbottom={setcurrent_branch_bottom}

          />
        </div>
        <div>
          <Label className="filter-label">By Transportation Mode</Label>
          <MultiSelect
            list_a={transportation_mode_filter}
            list_b={transportation_mode}
            setlist_b={settransportation_mode}
            show_search={false}
            setlist_id={settransportation_mode_id}
            page={page}
            setpage={setpage}
            setsearch_txt={setsearch_txt}
          />
        </div>

        <div>
          <Label className="filter-label">By current status</Label>
          <MultiSelect
            list_a={current_status_filter}
            list_b={current_status}
            setlist_b={setcurrent_status}
            show_search={false}
            setlist_id={setcurrent_status_id}
            page={page}
            setpage={setpage}
            setsearch_txt={setsearch_txt}
          />
        </div>

        <div>
          <Label className="filter-label">By Order Channel</Label>
          <MultiSelect
            list_a={order_channel_filter}
            list_b={order_channel}
            setlist_b={setorder_channel}
            show_search={false}
            setlist_id={setorder_channel_id}
            page={page}
            setpage={setpage}
            setsearch_txt={setsearch_txt}
          />
        </div>

        <div>
          <Label className="filter-label">Created By</Label>
          <MultiSelect
            list_a={created_by_filter}
            list_b={created_by}
            setlist_b={setcreated_by}
            setlist_id={setcreated_by_id}
            page={page}
            setpage={setpage}
            setsearch_txt={setsearch_txt}
            show_search={true}
            type={"backend"}
            loaded={created_loaded}
            count={created_count}
            bottom={created_bottom}
            setbottom={setcreated_bottom}
          />
        </div>

        <div>
          <Label className="filter-label">By cold chain</Label>
          <Row>
            <Col lg={4} md={4} sm={4}>
              <div className="form-check mb-2">
                <input
                  className="form-check-input "
                  type="radio"
                  name="delivery_type"
                  id="exampleRadio1"
                  value="Both"
                  onClick={() => {
                    setcold_chain_btn(["True", "False"]);
                  }}
                  checked={
                    cold_chain_btn !== "True" && cold_chain_btn !== "False"
                  }
                />

                <label
                  className="form-check-label input-box"
                  htmlFor="exampleRadio1"
                >
                  Both
                </label>
              </div>
            </Col>
            <Col lg={4} md={4} sm={4}>
              <div className="form-check mb-2">
                <input
                  className="form-check-input "
                  type="radio"
                  name="delivery_type"
                  id="exampleRadio1"
                  value="Cold Chain"
                  onClick={() => {
                    setcold_chain_btn("True");
                  }}
                  checked={cold_chain_btn === "True"}
                />

                <label
                  className="form-check-label input-box"
                  htmlFor="exampleRadios1"
                >
                  Yes
                </label>
              </div>
            </Col>
            <Col lg={3} md={3} sm={3}>
              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name="delivery_type"
                  id="exampleRadio1"
                  value="Non Cold Chain"
                  onClick={() => {
                    setcold_chain_btn("False");
                  }}
                  checked={cold_chain_btn === "False"}
                />
                <label
                  className="form-check-label input-box"
                  htmlFor="exampleRadios2"
                >
                  No
                </label>
              </div>
            </Col>
          </Row>
        </div>

        <div>
          <Label className="filter-label">By Is Completed</Label>
          <Row>
            <Col lg={4} md={4} sm={4}>
              <div className="form-check mb-2">
                <input
                  className="form-check-input "
                  type="radio"
                  name="is_completed"
                  id="exampleRadio2"
                  value="Both"
                  onClick={() => {
                    setiscompleted(["True", "False"]);
                  }}
                  checked={iscompleted !== "True" && iscompleted !== "False"}
                />

                <label
                  className="form-check-label input-box"
                  htmlFor="exampleRadios1"
                >
                  Both
                </label>
              </div>
            </Col>
            <Col lg={4} md={4} sm={4}>
              <div className="form-check mb-2">
                <input
                  className="form-check-input "
                  type="radio"
                  name="is_completed"
                  id="exampleRadio2"
                  value="Is Completed"
                  onClick={() => {
                    setiscompleted("True");
                  }}
                  checked={iscompleted === "True"}
                />

                <label
                  className="form-check-label input-box"
                  htmlFor="exampleRadios"
                >
                  Yes
                </label>
              </div>
            </Col>
            <Col lg={3} md={3} sm={3}>
              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name="is_completed"
                  id="exampleRadio2"
                  value="Not Completed"
                  onClick={() => {
                    setiscompleted("False");
                  }}
                  checked={iscompleted === "False"}
                />
                <label
                  className="form-check-label input-box"
                  htmlFor="exampleRadios2"
                >
                  No
                </label>
              </div>
            </Col>
          </Row>
        </div>

        <div style={{ paddingTop: "10px" }}>
          <button type="submit" className="btn btn-primary m-1">
            Submit
          </button>
        </div>
      </form>
    </>
  );
}

export default OrdersFilter;
