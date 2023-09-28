import { Form, Label } from "reactstrap";
import "../../../assets/scss/filters/filter.scss";
import { ServerAddress } from "../../../constants/ServerAddress";
import axios from "axios";
import MultiSelect from "../../../components/formComponent/multiSelect/MultiSelect";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setToggle } from "../../../store/parentFilter/ParentFilter";
import React, { useState, useEffect } from "react";
import {
  setFilterA, setFilterB,setFilterC
  // setFilterB,
  // setFilterC,
} from "../../../store/filterValue/FilterValue";
import toTitleCase from "../../../lib/titleCase/TitleCase";

const LocationsFilter = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.authentication.access_token);

  const [name, setname] = useState("");
  const [name_filter, setname_filter] = useState([]);
  const [page_search, setpage_search] = useState("")
  const [name_id, setname_id] = useState(0)
  const [page, setpage] = useState(1);
  const [location_loaded, setlocation_loaded] = useState(false);
  const [location_count, setlocation_count] = useState(1);
  const [location_bottom, setlocation_bottom] = useState(100);

  const [state, setstate] = useState("");
  const [state_filter, setstate_filter] = useState([]);
  const [state_id, setstate_id] = useState("");
  const [state_page, setstate_page] = useState(1);
  const [state_page_search, setstate_page_search] = useState("")
  const [state_loaded, setstate_loaded] = useState(false);
  const [state_count, setstate_count] = useState(1);
  const [state_bottom, setstate_bottom] = useState(100);

  const [city, setcity] = useState("");
  const [city_filter, setcity_filter] = useState([]);
  const [city_id, setcity_id] = useState("");
  const [city_page, setcity_page] = useState(1);
  const [city_page_search, setcity_page_search] = useState("")
  const [city_loaded, setcity_loaded] = useState(false);
  const [city_count, setcity_count] = useState(1);
  const [city_bottom, setcity_bottom] = useState(100);


  const getStateName = () => {
    let temp = [];
    let temp_list = [];

    axios
      .get(
        ServerAddress +
        `master/all_states/?search=${state_page_search}&place_id=all&filter_by=all&p=${state_page}&records=${10}&state_search=${state_page_search}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
    console.log("the location  data is ====",response)
        if (response.data.next === null) {
          setstate_loaded(false);
        } else {
          setstate_loaded(true);
        }
        temp = response.data.results;

        if (temp.length > 0) {
          if (state_page === 1) {
            temp_list = response.data.results.map((v) => [
              v.id,
              toTitleCase(v.state),
            ]);
          } else {
            temp_list = [
              ...state_filter,
              ...response.data.results.map((v) => [v.id, toTitleCase(v.state)]),
            ];
          }
          setstate_count(state_count + 2);
          setstate_filter(temp_list);
        }
        else {
          setstate_filter([])
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

  const getLocationName = () => {
    let temp = [];
    let temp_list = [];

    axios
      .get(
        ServerAddress +
          `master/all_locality/?place_id=all&filter_by=all&search=${""}&p=${page}&records=${10}&name_search=${page_search}&state=&city=&name=&data=all`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        if (response.data.next === null) {
          setlocation_loaded(false);
        } else {
          setlocation_loaded(true);
        }
        temp = response.data.results;

        if (temp.length > 0) {
          if (page === 1) {
            temp_list = response.data.results.map((v) => [
              v.id,
              toTitleCase(v.name),
            ]);
          } else {
            temp_list = [
              ...name_filter,
              ...response.data.results.map((v) => [v.id, toTitleCase(v.name)]),
            ];
          }
          setlocation_count(location_count + 2);
          setname_filter(temp_list);
        }
        else {
          setname_filter([])
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
    getLocationName();
  }, [page,page_search]);

  useEffect(() => {
    getStateName();
  }, [state_page,state_page_search])

  useEffect(() => {
    getCityName();
  }, [city_page,city_page_search])
  

  const [toggle, settoggle] = useState(false);

  useEffect(() => {
    settoggle(false);
  }, []);

  useEffect(() => {
    dispatch(setToggle(toggle));
  }, [toggle]);

  useEffect(() => {
    dispatch(setFilterA([String(name).toUpperCase()]));
    dispatch(setFilterB([String(state_id).toUpperCase()]));
    dispatch(setFilterC([String(city_id).toUpperCase()]));
  }, [name,state_id,city_id]);

  return (
    <>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div>
          <Label className="filter-label">State</Label>
          <MultiSelect
            list_a={state_filter}
            setlist_a={setstate_filter}
            list_b={state}
            setlist_b={setstate}
            show_search={true}
            setlist_id={setstate_id}
            page={state_page}
            setpage={setstate_page}
            setsearch_txt={setstate_page_search}
            type={"backend"}
            loaded={state_loaded}
            count={state_count}
            bottom={state_bottom}
            setbottom={setstate_bottom}
          />
        </div>

        <div>
          <Label className="filter-label">City</Label>
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
          <Label className="filter-label">Locality</Label>
          <MultiSelect
            list_a={name_filter}
            setlist_a={setname_filter}
            list_b={name}
            setlist_b={setname}
            show_search={true}
            setlist_id={setname_id}
            page={page}
            setpage={setpage}
            setsearch_txt={setpage_search}
            type={"backend"}
            loaded={location_loaded}
            count={location_count}
            bottom={location_bottom}
            setbottom={setlocation_bottom}

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

export default LocationsFilter;
