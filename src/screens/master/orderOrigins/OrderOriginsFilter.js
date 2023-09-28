import React, { useState, useEffect } from "react";
import { Form, Label } from "reactstrap";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import toTitleCase from "../../../lib/titleCase/TitleCase";
import { setToggle } from "../../../store/parentFilter/ParentFilter";
import { ServerAddress } from "../../../constants/ServerAddress";
import { setFilterA, setFilterB } from "../../../store/filterValue/FilterValue";
import MultiSelect from "../../../components/formComponent/multiSelect/MultiSelect";

const ShipperConsigneeFilter = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.authentication.access_token);
  // Additional Fields
  const [page, setpage] = useState(1);

  const [city_filter, setcity_filter] = useState([]);
  const [city, setcity] = useState([]);
  const [city_search_item, setcity_search_item] = useState("");
  const [city_id, setcity_id] = useState([]);

  const [client_filter, setclient_filter] = useState([]);
  const [client, setclient] = useState([]);
  const [client_id, setclient_id] = useState([]);
  const [client_page, setclient_page] = useState(1);
  const [client_search, setclient_search] = useState("");

  const getCommodityType = () => {
    let temp = [];
    let temp_list = [...city_filter];

    axios
      .get(
        ServerAddress +
          `master/all_cities/?search=${""}&p=${page}&records=${10}&city_search=${city_search_item}&place_id=all&filter_by=all`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        temp = response.data.results;
        for (let index = 0; index < temp.length; index++) {
          temp_list.push([temp[index].id, toTitleCase(temp[index].city)]);
        }
        temp_list = [...new Set(temp_list.map((v) => `${v}`))].map((v) =>
          v.split(",")
        );
        setcity_filter(temp_list);
      })
      .catch((err) => {
        alert(`Error Occur in Get ${err}`);
      });
  };

  const getClient = () => {
    let temp2 = [];
    let temp_list2 = [...client_filter];

    axios
      .get(
        ServerAddress +
          `master/all_clients/?bill_to=${[
            "",
          ]}&search=${""}&p=${client_page}&records=${10}&name_search=${client_search}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        temp2 = response.data.results;
        console.log("temp2========", temp2);
        for (let index = 0; index < temp2.length; index++) {
          temp_list2.push([temp2[index].id, toTitleCase(temp2[index].name)]);
        }
        temp_list2 = [...new Set(temp_list2.map((v) => `${v}`))].map((v) =>
          v.split(",")
        );
        setclient_filter(temp_list2);
      })
      .catch((err) => {
        alert(`Error Occur in Get ${err}`);
      });
  };

  const handleSubmit = () => {
    settoggle(true);
  };

  useEffect(() => {
    getCommodityType();
  }, [page, city_search_item]);

  useEffect(() => {
    getClient();
  }, [client_page, client_search]);

  const [toggle, settoggle] = useState(false);

  useEffect(() => {
    settoggle(false);
  }, []);

  useEffect(() => {
    dispatch(setToggle(toggle));
  }, [toggle]);

  useEffect(() => {
    dispatch(setFilterA([city_id]));
    dispatch(setFilterB([client_id]));
  }, [city_id, client_id]);

  return (
    <>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div>
          <Label className="filter-label">City </Label>
          <MultiSelect
            list_a={city_filter}
            setlist_a={setcity_filter}
            list_b={city}
            setlist_b={setcity}
            show_search={true}
            setlist_id={setcity_id}
            page={page}
            setpage={setpage}
            setsearch_txt={setcity_search_item}
            type={"backend"}
          />
        </div>
        <div>
          <Label className="filter-label">Client</Label>
          <MultiSelect
            list_a={client_filter}
            setlist_a={setclient_filter}
            list_b={client}
            setlist_b={setclient}
            setlist_id={setclient_id}
            show_search={true}
            page={client_page}
            setpage={setclient_page}
            setsearch_txt={setclient_search}
            type={"backend"}
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
};

export default ShipperConsigneeFilter;
