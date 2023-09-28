import React, { useState, useEffect } from "react";
import { Label } from "reactstrap";
import Multi_Select from "../../../components/Form_Componenets/Multi_Select";
import "../../../assets/scss/filters/filter.scss";
import { useSelector } from "react-redux";
import { server_address } from "../../../constants/server_details";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Toggle } from "../../../store/Filter/Parent_Filter/action";
import toTitleCase from "../../../components/Title_Case/Title_Case";
import {
  setFiltA,
  setFiltB,
} from "../../../store/Components/FilterValue/action";

function Hired_Details_Filter() {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.token.access_token);

  const [vehicle_id_filter, setvehicle_id_filter] = useState([]);
  const [vehicle_id, setvehicle_id] = useState([]);
  const [vehicle_id_id, setvehicle_id_id] = useState([]);

  const [employee_id_filter, setemployee_id_filter] = useState([]);
  const [employee_id, setemployee_id] = useState([]);
  const [employee_id_id, setemployee_id_id] = useState([]);

  // Additional Fields
  const data_len = useSelector((state) => state.all_data.data_length);
  const page_num = useSelector((state) => state.all_data.page_number);
  const getBranch = () => {
    let temp = [];
    let temp_list = [];
    axios
      .get(
        server_address +
          `masters/api/all-branches/?p=${page_num}&records=${data_len}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        temp = response.data.results;
        for (let index = 0; index < temp.length; index++) {
          temp_list.push([temp[index].id, toTitleCase(temp[index].vehicle_id)]);
        }
        setvehicle_id_filter(temp_list);
      })
      .catch((err) => {
        alert(`Error Occur in Get`, err);
      });
  };
  const getData = () => {
    let temp = [];
    let temp_list = [];
    let temp_list2 = [];
    axios
      .get(
        server_address +
          `Transporter/get-hiredetails/?p=${page_num}&records=${data_len}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        temp = response.data.results;
        for (let index = 0; index < temp.length; index++) {
          temp_list.push([temp[index].id, temp[index].Vehicle_ID]);
          temp_list2.push([temp[index].id, temp[index].Employee_ID]);
        }
        setvehicle_id_filter(temp_list);
        setemployee_id_filter(temp_list2);
      })
      .catch((err) => {
        alert(`Error Occur in Get`, err);
      });
  };

  const handleSubmit = () => {
    settoggle(true);
  };
  useEffect(() => {
    getData();
  }, []);

  const [toggle, settoggle] = useState(false);

  useEffect(() => {
    settoggle(false);
  }, []);

  useEffect(() => {
    dispatch(Toggle(toggle));
  }, [toggle]);

  useEffect(() => {
    dispatch(setFiltA([vehicle_id]));
    dispatch(setFiltB([employee_id]));
  }, [vehicle_id, employee_id]);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div>
          <Label className="filter-label">Vehicle ID</Label>
          <Multi_Select
            list_a={vehicle_id_filter}
            list_b={vehicle_id}
            setlist_b={setvehicle_id}
            setlist_id={setvehicle_id_id}
          />
        </div>

        <div>
          <Label className="filter-label">Employee ID</Label>
          <Multi_Select
            list_a={employee_id_filter}
            list_b={employee_id}
            setlist_b={setemployee_id}
            setlist_id={setemployee_id_id}
          />
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

export default Hired_Details_Filter;
