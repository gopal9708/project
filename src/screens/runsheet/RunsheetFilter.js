import React, { useState, useEffect } from "react";
import { Label } from "reactstrap";
import "../../assets/scss/filters/filter.scss";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import MultiSelect from "../../components/formComponent/multiSelect/MultiSelect";
import { ServerAddress } from "../../constants/ServerAddress";
import { setFilterA, setFilterB } from "../../store/filterValue/FilterValue";
import toTitleCase from "../../lib/titleCase/TitleCase";
import { setToggle } from "../../store/parentFilter/ParentFilter";

function RunsheetFilter() {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.authentication.access_token);
  // Additional Fields
  const data_len = useSelector((state) => state.pagination.data_length);
  const page_num = useSelector((state) => state.pagination.page_number);
  const [route_filter, setroute_filter] = useState([]);
  const [route, setroute] = useState([]);
  const [vehicle_no_filter, setvehicle_no_filter] = useState([]);
  const [vehicle_no, setvehicle_no] = useState([]);
  const [route_id, setroute_id] = useState([]);
  const [vehicle_no_id, setvehicle_no_id] = useState([]);
  const [page, setpage] = useState(1);
  const [search_txt, setsearch_txt] = useState("");
  const [runsheet_loaded, setrunsheet_loaded] = useState(false);
  const [runsheet_count, setrunsheet_count] = useState(1);
  const [runsheet_bottom, setrunsheet_bottom] = useState(100);

      const [driver, setdriver] = useState("");
      const [driver_filter, setdriver_filter] = useState([]);
      const [driver_id, setdriver_id] = useState("");
      const [driver_page, setdriver_page] = useState(1);
      const [driver_page_search, setdriver_page_search] = useState("");   
      const [driver_loaded, setdriver_loaded] = useState(false);
      const [driver_count, setdriver_count] = useState(1);
      const [driver_bottom, setdriver_bottom] = useState(100);

      const getDrivers =() =>{
        let temp = [];
        let temp_list = [];
        axios
      .get(
        ServerAddress +
        `ems/get_driver/?search=${driver_page_search}&p=${driver_page}&records=${10}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        console.log(" the response ====",response)
        if ( response.data.next === null){
          setdriver_loaded(false);
        } else {
          setdriver_loaded(true);
        }
        temp = response.data.results;
        if( temp.length > 0){
          if(driver_page === 1){
            temp_list = response.data.results.map((v) =>[
              v.id,
              toTitleCase(v.username),
            ]);
          } else{
            temp_list = [
              ...driver_filter,
              ...response.data.results.map((v) => [v.id, toTitleCase(v.username)]),
            ];
          }
          setdriver_count( runsheet_count + 2);
          setdriver_filter(temp_list);
        }
        else {
          setdriver_filter([])
        }
      })
      .catch((err) => {
        alert(`Error Occur in Get ${err}`);
      });
      };
  const getRoute = () => {
    let temp = [];
    let temp_list = [...route_filter];
    // let temp_list2 = [];
    axios
      .get(
        ServerAddress +
          `master/get_routes/?search=${""}&p=${page}&records=${10}&name=&name_search=${search_txt}&data=all`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        console.log(" the response ====",response)
        if ( response.data.next === null){
          setrunsheet_loaded(false);
        } else {
          setrunsheet_loaded(true);
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
          setrunsheet_count( runsheet_count + 2);
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
  }, [page,search_txt]);
  useEffect(() => {
    getDrivers();
  }, [driver_page,driver_page_search]);

  const [toggle, settoggle] = useState(false);

  useEffect(() => {
    settoggle(false);
  }, []);

  useEffect(() => {
    dispatch(setToggle(toggle));
  }, [toggle]);

  useEffect(() => {
    dispatch(setFilterA([route_id]));
    dispatch(setFilterB([driver_id]));
  }, [route_id,driver_id]);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div>
          <Label className="filter-label">Route</Label>
          <MultiSelect
            list_a={route_filter}
            setlist_a={setroute_filter}
            list_b={route}
            setlist_b={setroute}
            setlist_id={setroute_id}
            show_search={true}
            page={page}
            setpage={setpage}
            setsearch_txt={setsearch_txt}
            type={"backend"}
            loaded={runsheet_loaded}
            count={runsheet_count}
            bottom={runsheet_bottom}
            setbottom={setrunsheet_bottom}
          />
        </div>
        <div>
          <Label className="filter-label"> By Driver</Label>
          <MultiSelect
            list_a={driver_filter}
            setlist_a={setdriver_filter}
            list_b={driver}
            setlist_b={setdriver}
            show_search={true}
            setlist_id={setdriver_id}
            page={driver_page}
            setpage={setdriver_page}
            setsearch_txt={setdriver_page_search}
            type={"backend"}
            loaded={driver_loaded}
            count={driver_count}
            bottom={driver_bottom}
            setbottom={setdriver_bottom}
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

export default RunsheetFilter;
