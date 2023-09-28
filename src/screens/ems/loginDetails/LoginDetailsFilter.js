import React, { useState, useEffect } from "react";
import { Form, Label } from "reactstrap";
import "../../../assets/scss/filters/filter.scss";
import { useSelector } from "react-redux";
import { ServerAddress } from "../../../constants/ServerAddress";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setFilterA, setFilterB } from "../../../store/filterValue/FilterValue";
import { setToggle } from "../../../store/parentFilter/ParentFilter";
import MultiSelect from "../../../components/formComponent/multiSelect/MultiSelect";

function LoginDetailsFilter() {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.authentication.access_token);
  // Additional Fields
  const data_len = useSelector((state) => state.pagination.data_length);
  const page_num = useSelector((state) => state.pagination.page_number);

  const [user_filter, setuser_filter] = useState([]);
  const [user, setuser] = useState([]);
  const [platform_filter, setplatform_filter] = useState([]);
  const [platform, setplatform] = useState([]);

  //   const [commodity_type_filter, setcommodity_type_filter] = useState([
  //     ["1", "General"],
  //     ["2", "Pharmaceutical"],
  //     ["3", "Medical Equipment"],
  //     ["4", "Perishable"],
  //     ["5", "Temperature Sensitive"],
  //     ["6", "Others"],
  //   ]);
  //   const [commodity_type, setcommodity_type] = useState([]);
  //   const [commodity_type_id, setcommodity_type_id] = useState([]);
  //   const [commodity_name_filter, setcommodity_name_filter] = useState([]);
  //   const [commodity_name, setcommodity_name] = useState([]);
  //   const [commodity_name_id, setcommodity_name_id] = useState([]);

  const getLoginDetails = () => {
    let temp = [];
    axios
      .get(
        ServerAddress +
          `ems/get_login_details/?p=${page_num}&records=${data_len}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((resp) => {
        temp = resp.data.results;

        let all_users = temp.map((v) => v.user_name);
        let users = [...new Set(all_users)];
        users = users.map((v, ind) => [ind, v]);
        setuser_filter(users);

        let all_platform = temp.map((v) => v.platform.toUpperCase());
        let platform = [...new Set(all_platform)];
        platform = platform.map((v, ind) => [ind, v]);
        setplatform_filter(platform);
      })
      .catch((err) => {
        alert(`Error Occur in Get ${err}`);
      });
  };

  const handleSubmit = () => {
    dispatch(setToggle(true));
  };

  useEffect(() => {
    getLoginDetails();
  }, []);

  useEffect(() => {
    dispatch(setToggle(false));
  }, []);

  useEffect(() => {
    dispatch(setFilterA([String(user)]));
    dispatch(setFilterB([String(platform).toUpperCase()]));
  }, [user]);

  return (
    <>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div>
          <Label className="filter-label">Users</Label>
          <MultiSelect
            list_a={user_filter}
            list_b={user}
            setlist_b={setuser}
            show_search={false}
            get_id={false}
          />
        </div>
        <div>
          <Label className="filter-label">Platform</Label>
          <MultiSelect
            list_a={platform_filter}
            list_b={platform}
            setlist_b={setplatform}
            show_search={false}
            get_id={false}
          />
        </div>

        <div style={{ paddingTop: "10px" }}>
          <button type="submit" className="btn btn-primary m-1">
            Submit
          </button>
        </div>
      </Form>
    </>
  );
}

export default LoginDetailsFilter;
