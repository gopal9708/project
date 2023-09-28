import React, { useState, useEffect } from "react";
import { Label } from "reactstrap";
import localforage from "localforage";
import { useNavigate } from "react-router-dom";

import {
  Col,
  Row,
  // Label,
} from "reactstrap";
import Multi_Select from "../../../components/Form_Componenets/Multi_Select";
import "../../../assets/scss/filters/filter.scss";
import { useSelector } from "react-redux";
import { server_address } from "../../../constants/server_details";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Toggle } from "../../../store/Filter/Parent_Filter/action";
import { divideProfileFilter } from "../../../store/Filter/Profile_Filter/action";

function Vehicle_Filter() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.token.access_token);

  const [first_name_filter, setfirst_name_filter] = useState([]);
  const [first_name, setfirst_name] = useState([]);
  const [first_name_id, setfirst_name_id] = useState([]);

  const [gender_filter, setgender_filter] = useState([
    ["Number_plate1", "Jh05BN5217"],
    ["Number", "Mh05BN5217"],
    ["FEMALE", "DL05BN5217"],
    ["OTHERS", "Others"],
  ]);
  const [gender, setgender] = useState([]);
  const [gender_id, setgender_id] = useState([]);

  const handleSubmit = () => {
    getdata();
  };
  const getName = () => {
    let temp = [];
    let temp_list = [];
    axios
      .get(server_address + "ems/api/view_employees/", {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        temp = response.data;
        for (let index = 0; index < temp.length; index++) {
          temp_list.push([temp[index].id, temp[index].first_name]);
        }
        setfirst_name_filter(temp_list);
      })
      .catch((err) => {
        alert(`Error Occur in Get`, err);
      });
  };

  const getdata = () => {
    axios
      .get(
        server_address +
          "ems/api/get_profilefilter_data/?first_name=" +
          first_name +
          "&gender=" +
          gender_id,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        dispatch(divideProfileFilter(response.data));
      })
      .catch((err) => {
        alert(`Error Occur in Get`, err);
      });
  };

  const sendData = () => {
    settoggle(true);
  };

  useEffect(() => {
    getName();
  }, []);

  const [toggle, settoggle] = useState(false);
  useEffect(() => {
    settoggle(false);
  }, []);
  dispatch(Toggle(toggle));

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div>
          <Label className="filter-label">Owner Name</Label>
          <Multi_Select
            list_a={first_name_filter}
            list_b={first_name}
            setlist_b={setfirst_name}
            setlist_id={setfirst_name_id}
          />
        </div>

        <div>
          <Label className="filter-label">Number Plate</Label>
          <Multi_Select
            list_a={gender_filter}
            list_b={gender}
            setlist_b={setgender}
            setlist_id={setgender_id}
          />
        </div>
        <div style={{ paddingTop: "10px" }}>
          <button
            type="submit"
            className="btn btn-primary m-1"
            onClick={sendData}
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
}

export default Vehicle_Filter;
