import React, { useState, useEffect } from "react";
import { Form, Label } from "reactstrap";
import "../../../assets/scss/filters/filter.scss";
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import MultiSelect from '../../../components/formComponent/multiSelect/MultiSelect';
import { setFilterA, setFilterB, setFilterC, setFilterD, setFilterE } from '../../../store/filterValue/FilterValue';
import { ServerAddress } from '../../../constants/ServerAddress';
import toTitleCase from '../../../lib/titleCase/TitleCase';
import { setToggle } from '../../../store/parentFilter/ParentFilter';

const ManifestFilter = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.authentication.access_token);
  const [page, setpage] = useState(1);
  const [search_txt, setsearch_txt] = useState("");
  const [weight_filter, setweight_filter] = useState([
    ["1", "0 To 10"],
    ["2", "10 To 20"],
    ["3", "20 To 30 "],
    ["4", "30 To 40"],
    ["5", "Above 40"],
  ]);
  const [weight, setweight] = useState([]);
  const [weight_id, setweight_id] = useState([]);

  const [origin_branch, setorigin_branch] = useState("");
  const [origin_branch_filter, setorigin_branch_filter] = useState([]);
  const [origin_branch_id, setorigin_branch_id] = useState("");
  const [origin_branch_page, setorigin_branch_page] = useState(1);
  const [origin_branch_page_search, setorigin_branch_page_search] = useState("");
  const [origin_branch_loaded, setorigin_branch_loaded] = useState(false);
  const [origin_branch_count, setorigin_branch_count] = useState(1);
  const [origin_branch_bottom, setorigin_branch_bottom] = useState(100);

  const [destination_br, setdestination_br] = useState("");
  const [destination_br_filter, setdestination_br_filter] = useState([]);
  const [destination_br_id, setdestination_br_id] = useState("");
  const [destination_br_page, setdestination_br_page] = useState(1);
  const [destination_br_page_search, setdestination_br_page_search] = useState("");
  const [destination_br_loaded, setdestination_br_loaded] = useState(false);
  const [destination_br_count, setdestination_br_count] = useState(1);
  const [destination_br_bottom, setdestination_br_bottom] = useState(100);

  const [city, setcity] = useState("");
  const [city_filter, setcity_filter] = useState([]);
  const [city_id, setcity_id] = useState("");
  const [city_page, setcity_page] = useState(1);
  const [city_page_search, setcity_page_search] = useState("")
  const [city_loaded, setcity_loaded] = useState(false);
  const [city_count, setcity_count] = useState(1);
  const [city_bottom, setcity_bottom] = useState(100);

  const [destination_city, setdestination_city] = useState("");
  const [destination_city_filter, setdestination_city_filter] = useState([]);
  const [destination_city_id, setdestination_city_id] = useState("");
  const [destination_city_page, setdestination_city_page] = useState(1);
  const [destination_city_page_search, setdestination_city_page_search] = useState("")
  const [destination_city_loaded, setdestination_city_loaded] = useState(false);
  const [destination_city_count, setdestination_city_count] = useState(1);
  const [destination_city_bottom, setdestination_city_bottom] = useState(100);


  const getOriginBranch = () => {
    let temp = [];
    let temp_list = [];
    axios
      .get(
        ServerAddress +
        `master/all-branches/?search=${origin_branch_page_search}&p=${origin_branch_page}&records=${10}&branch_name=${[]}&branch_city=${[]}&vendor=${[]}&branch_type=${""}&organization=${""}&data=&value=${""}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        // console.log("the location  data is ====", response)
        if (response.data.next === null) {
          setorigin_branch_loaded(false);
        } else {
          setorigin_branch_loaded(true);
        }
        temp = response.data.results;

        if (temp.length > 0) {
          if (origin_branch_page === 1) {
            temp_list = response.data.results.map((v) => [
              v.id,
              toTitleCase(v.name),
            ]);
          } else {
            temp_list = [
              ...origin_branch_filter,
              ...response.data.results.map((v) => [v.id, toTitleCase(v.name)]),
            ];
          }
          setorigin_branch_count(origin_branch_count + 2);
          setorigin_branch_filter(temp_list);
        }
        else {
          setorigin_branch_filter([])
        }
      })
      .catch((err) => {
        alert(`Error Occur in Get ${err}`);
      });
  };
  const getDestinationBranch = () => {
    let temp = [];
    let temp_list = [];

    axios
      .get(
        ServerAddress +
        `master/all-branches/?search=${destination_br_page_search}&p=${destination_br_page}&records=${10}&branch_name=${[]}&branch_city=${[]}&vendor=${[]}&branch_type=${""}&organization=${""}&data=&value=${""}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }

      )
      .then((response) => {
        // console.log("the location  data is ====", response)
        if (response.data.next === null) {
          setdestination_br_loaded(false);
        } else {
          setdestination_br_loaded(true);
        }
        temp = response.data.results;

        if (temp.length > 0) {
          if (destination_br_page === 1) {
            temp_list = response.data.results.map((v) => [
              v.id,
              toTitleCase(v.name),
            ]);
          } else {
            temp_list = [
              ...destination_br_filter,
              ...response.data.results.map((v) => [v.id, toTitleCase(v.name)]),
            ];
          }
          setdestination_br_count(destination_br_count + 2);
          setdestination_br_filter(temp_list);
        }
        else {
          setdestination_br_filter([])
        }
      })
      .catch((err) => {
        alert(`Error Occur in Get ${err}`);
      });
  };

  const getCityName = () => {
    let temp = [];
    let temp_list = [];


    axios
      .get(
        ServerAddress +
        `master/all_cities/?place_id=all&filter_by=all&search=${city_page_search}&p=${city_page}&records=${10}&name_search=${city_page_search}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        if (response.data.next === null) {
          setcity_loaded(false);
        } else {
          setcity_loaded(true);
        }
        temp = response.data.results;

        if (temp.length > 0) {
          if (city_page === 1) {
            temp_list = response.data.results.map((v) => [
              v.id,
              toTitleCase(v.city),
            ]);
          } else {
            temp_list = [
              ...city_filter,
              ...response.data.results.map((v) => [v.id, toTitleCase(v.city)]),
            ];
          }
          setcity_count(city_count + 2);
          setcity_filter(temp_list);
        }
        else {
          setcity_filter([])
        }
      })
      .catch((err) => {
        alert(`Error Occur in Get ${err}`);
      });
  };
  const getDestinationCity = () => {
    let temp = [];
    let temp_list = [];


    axios
      .get(
        ServerAddress +
        `master/all_cities/?place_id=all&filter_by=all&search=${destination_city_page_search}&p=${destination_city_page}&records=${10}&name_search=${city_page_search}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        if (response.data.next === null) {
          setdestination_city_loaded(false);
        } else {
          setdestination_city_loaded(true);
        }
        temp = response.data.results;

        if (temp.length > 0) {
          if (destination_city_page === 1) {
            temp_list = response.data.results.map((v) => [
              v.id,
              toTitleCase(v.city),
            ]);
          } else {
            temp_list = [
              ...destination_city_filter,
              ...response.data.results.map((v) => [v.id, toTitleCase(v.city)]),
            ];
          }
          setdestination_city_count(destination_city_count + 2);
          setdestination_city_filter(temp_list);
        }
        else {
          setdestination_city_filter([])
        }
      })
      .catch((err) => {
        alert(`Error Occur in Get ${err}`);
      });
  };


  const handleSubmit = () => {
    settoggle(true);
  };

  useEffect(() => {
    getOriginBranch();
  }, [origin_branch_page, origin_branch_page_search])

  useEffect(() => {
    getDestinationBranch();
  }, [destination_br_page, destination_br_page_search])

  useEffect(() => {
    getCityName();
  }, [city_page, city_page_search])

  useEffect(() => {
    getDestinationCity();
  }, [destination_city_page, destination_city_page_search])

  const [toggle, settoggle] = useState(false);

  useEffect(() => {
    settoggle(false);
  }, []);

  useEffect(() => {
    dispatch(setToggle(toggle));
  }, [toggle]);

  useEffect(() => {
    dispatch(setFilterA([weight_id]));
    dispatch(setFilterB([String(origin_branch_id).toUpperCase()]));
    dispatch(setFilterC([String(destination_br_id).toUpperCase()]));
    dispatch(setFilterD([String(city_id).toUpperCase()]));
    dispatch(setFilterE([String(destination_city_id).toUpperCase()]));
  }, [weight_id, origin_branch_id, destination_br_id, city_id, destination_city_id]);




  return (
    <>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div>
          <Label className="filter-label"> By Origin Branch</Label>
          <MultiSelect
            list_a={origin_branch_filter}
            setlist_a={setorigin_branch_filter}
            list_b={origin_branch}
            setlist_b={setorigin_branch}
            show_search={true}
            setlist_id={setorigin_branch_id}
            page={origin_branch_page}
            setpage={setorigin_branch_page}
            setsearch_txt={setorigin_branch_page_search}
            type={"backend"}
            loaded={origin_branch_loaded}
            count={origin_branch_count}
            bottom={origin_branch_bottom}
            setbottom={setorigin_branch_bottom}
          />
        </div>
        <div>
          <Label className="filter-label"> By Destination Branch</Label>
          <MultiSelect
            list_a={destination_br_filter}
            setlist_a={setdestination_br_filter}
            list_b={destination_br}
            setlist_b={setdestination_br}
            show_search={true}
            setlist_id={setdestination_br_id}
            page={destination_br_page}
            setpage={setdestination_br_page}
            setsearch_txt={setdestination_br_page_search}
            type={"backend"}
            loaded={destination_br_loaded}
            count={destination_br_count}
            bottom={destination_br_bottom}
            setbottom={setdestination_br_bottom}
          />
        </div>
        <div>
          <Label className="filter-label"> By Origin City</Label>
          <MultiSelect
            list_a={city_filter}
            setlist_a={setcity_filter}
            list_b={city}
            setlist_b={setcity}
            show_search={true}
            setlist_id={setcity_id}
            page={city_page}
            setpage={setcity_page}
            setsearch_txt={setcity_page_search}
            type={"backend"}
            loaded={city_loaded}
            count={city_count}
            bottom={city_bottom}
            setbottom={setcity_bottom}
          />
        </div>
        <div>
          <Label className="filter-label"> By Destination City</Label>
          <MultiSelect
            list_a={destination_city_filter}
            setlist_a={setdestination_city_filter}
            list_b={destination_city}
            setlist_b={setdestination_city}
            show_search={true}
            setlist_id={setdestination_city_id}
            page={destination_city_page}
            setpage={setdestination_city_page}
            setsearch_txt={setdestination_city_page_search}
            type={"backend"}
            loaded={destination_city_loaded}
            count={destination_city_count}
            bottom={destination_city_bottom}
            setbottom={setdestination_city_bottom}
          />
        </div>

        <div>
          <Label className="filter-label">weight </Label>
          <MultiSelect
            list_a={weight_filter}
            list_b={weight}
            setlist_b={setweight}
            show_search={false}
            setlist_id={setweight_id}
            page={page}
            setpage={setpage}
            setsearch_txt={setsearch_txt}
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

export default ManifestFilter