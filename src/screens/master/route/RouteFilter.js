import React, { useState, useEffect } from "react";
import { Form, Label } from "reactstrap";
import "../../../assets/scss/filters/filter.scss";
import { useSelector } from "react-redux";
import { ServerAddress } from "../../../constants/ServerAddress";
import axios from "axios";
import { useDispatch } from "react-redux";
import toTitleCase from "../../../lib/titleCase/TitleCase";
import { setFilterA } from "../../../store/filterValue/FilterValue";
import { setToggle } from "../../../store/parentFilter/ParentFilter";
import MultiSelect from "../../../components/formComponent/multiSelect/MultiSelect";

function RouteFilter() {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.authentication.access_token);
  // Additional Fields
  const [page, setpage] = useState(1);

  const [route_filter, setroute_filter] = useState([]);
  const [route, setroute] = useState([]);
  const [route_search_item, setroute_search_item] = useState("");
  const [route_id, setroute_id] = useState([]);
  const [route_loaded, setroute_loaded] = useState(false);
  const [route_count, setroute_count] = useState(1);
  const [route_bottom, setroute_bottom] = useState(100);


  const getRoute = () => {
    let temp = [];
    let temp_list = [...route_filter];

    axios
      .get(
        ServerAddress +
          `master/get_routes/?search=${""}&p=${page}&records=${10}&name=&name_search=${route_search_item}&data=all`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        if ( response.data.next === null){
          setroute_loaded(false);
        } else {
          setroute_loaded(true);
        }
        temp = response.data.results;
        if( temp.length > 0){
          if(page === 1){
            temp_list = response.data.results.map((v) =>[
              v.id,
              toTitleCase(v.name),
            ]);
          } else{
            temp_list = [
              ...route_filter,
              ...response.data.results.map((v) => [v.id, toTitleCase(v.name)]),
            ];
          }
          setroute_count( route_count + 2);
          setroute_filter(temp_list);
        }
        else {
          setroute_filter([])
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
    getRoute();
  }, [page, route_search_item]);

  const [toggle, settoggle] = useState(false);

  useEffect(() => {
    settoggle(false);
  }, []);

  useEffect(() => {
    dispatch(setToggle(toggle));
  }, [toggle]);

  useEffect(() => {
    dispatch(setFilterA([String(route).toUpperCase()]));
  }, [route]);

  return (
    <>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div>
          <Label className="filter-label">Name </Label>
          <MultiSelect
            list_a={route_filter}
            setlist_a={setroute_filter}
            list_b={route}
            setlist_b={setroute}
            show_search={true}
            setlist_id={setroute_id}
            page={page}
            setpage={setpage}
            setsearch_txt={setroute_search_item}
            type={"backend"}
            loaded={route_loaded}
            count={route_count}
            bottom={route_bottom}
            setbottom={setroute_bottom}
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

export default RouteFilter;
