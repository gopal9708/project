import React, { useState, useEffect } from "react";
import { Label } from 'reactstrap';
import "../../../assets/scss/filters/filter.scss";
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import MultiSelect from '../../../components/formComponent/multiSelect/MultiSelect';
import { setFilterA,setFilterB, setFilterC, } from '../../../store/filterValue/FilterValue';
import { ServerAddress } from '../../../constants/ServerAddress';
import toTitleCase from '../../../lib/titleCase/TitleCase';
import { setToggle } from '../../../store/parentFilter/ParentFilter';

const BillTosFilter = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.authentication.access_token);
  const [pan_no_filter, setpan_no_filter] = useState([]);
  const [pan_no, setpan_no] = useState([]);
  const [pan_no_id, setpan_no_id] = useState([]);
  const [page, setpage] = useState(1);
  const [search_txt, setsearch_txt] = useState("");
  const [pan_no_loaded, setpan_no_loaded] = useState(false);
  const [pan_no_count, setpan_no_count] = useState(1);
  const [pan_no_bottom, setpan_no_bottom] = useState(100);

const [billto_name_filter, setbillto_name_filter] = useState([]);
const [billto_name, setbillto_name] = useState([]);
const [billto_name_id, setbillto_name_id] = useState([]);
const [billto_name_page, setbillto_name_page] = useState(1);
const [billto_name_loaded, setbillto_name_loaded] = useState(false);
const [billto_name_count, setbillto_name_count] = useState(1);
const [billto_name_bottom, setbillto_name_bottom] = useState(100);

const [state, setstate] = useState("");
  const [state_filter, setstate_filter] = useState([]);
  const [state_id, setstate_id] = useState("");
  const [state_page, setstate_page] = useState(1);
  const [state_page_search, setstate_page_search] = useState("")
  const [state_loaded, setstate_loaded] = useState(false);
  const [state_count, setstate_count] = useState(1);
  const [state_bottom, setstate_bottom] = useState(100);

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


  const getName =() =>{
    let temp = [];
    let temp_list = [];
    axios
    .get(
      ServerAddress +
      `master/all_billtoes/?search=${search_txt}&p=${page}&records=${10}&pan_no=${[]}&name=&name_search=${""}&data=all`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    )
    .then((response) => {
      console.log(" the response data is ====",response)
      if ( response.data.next === null){
        setbillto_name_loaded(false);
      } else {
        setbillto_name_loaded(true);
      }
      temp = response.data.results;
      if( temp.length > 0){
        if(page === 1){
          temp_list = response.data.results.map((v) =>[
            v.id,
            (v.name),
          ]);
        } else{
          temp_list = [
            ...billto_name_filter,
            ...response.data.results.map((v) => [v.id, (v.name)]),
          ];
        }
        setbillto_name_count(  billto_name_count + 2);
        setbillto_name_filter(temp_list);
      }
      else {
        setbillto_name_filter([])
      }
    })
    .catch((err) => {
      alert(`Error Occur in Get ${err}`);
    });
};

 
  const getPan =() =>{
    let temp = [];
    let temp_list = [];
    axios
    .get(
      ServerAddress +
      `master/all_billtoes/?search=${search_txt}&p=${page}&records=${10}&pan_no=${[]}&name=&name_search=${""}&data=all`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    )
    .then((response) => {
      if ( response.data.next === null){
        setpan_no_loaded(false);
      } else {
        setpan_no_loaded(true);
      }
      temp = response.data.results;
      if( temp.length > 0){
        if(page === 1){
          temp_list = response.data.results.map((v) =>[
            v.id,
            (v.pan_no),
          ]);
        } else{
          temp_list = [
            ...pan_no_filter,
            ...response.data.results.map((v) => [v.id, (v.pan_no)]),
          ];
        }
        setpan_no_count(  pan_no_count + 2);
        setpan_no_filter(temp_list);
      }
      else {
        setpan_no_filter([])
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
  getPan();
}, [page, search_txt])

useEffect(() => {
  getName();
}, [page, search_txt])

useEffect(() => {
  getStateName();
}, [state_page,state_page_search])




const [toggle, settoggle] = useState(false);

useEffect(() => {
  settoggle(false);
}, [])
useEffect(() => {
  dispatch(setToggle(toggle));
}, [toggle]);
useEffect(() => {
  dispatch(setFilterA([pan_no]));
  dispatch(setFilterB([billto_name]));
  dispatch(setFilterC([String(state_id).toUpperCase()]));
}, [pan_no,billto_name,state_id]);

  return(
    <>
    <form
     onSubmit={(e) => {
      e.preventDefault();
      handleSubmit();
     }}
    >



        <div>
          <Label className="filter-label">Name</Label>
          <MultiSelect
            list_a={billto_name_filter}
            setlist_a={setbillto_name_filter}
            list_b={billto_name}
            setlist_b={setbillto_name}
            setlist_id={setbillto_name_id}
            show_search={true}
            page={billto_name_page}
            setpage={setbillto_name_page}
            setsearch_txt={setsearch_txt}
            type={"backend"}
            loaded={billto_name_loaded}
            count={billto_name_count}
            bottom={billto_name_bottom}
            setbottom={setbillto_name_bottom}
          />
        </div>

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
          <Label className="filter-label">PAN NO </Label>
          <MultiSelect
            list_a={pan_no_filter}
            setlist_a={setpan_no_filter}
            list_b={pan_no}
            setlist_b={setpan_no}
            setlist_id={setpan_no_id}
            show_search={true}
            page={page}
            setpage={setpage}
            setsearch_txt={setsearch_txt}
            type={"backend"}
            loaded={pan_no_loaded}
            count={pan_no_count}
            bottom={pan_no_bottom}
            setbottom={setpan_no_bottom}
          />
        </div>

        <div style={{ paddingTop: "10px" }}>
          <button type="submit" className="btn btn-primary m-1">
            Submit
          </button>
        </div>

    </form>
    </>
  )


}
export default BillTosFilter
