
import React, { useState, useEffect } from "react";
import { Form, Label, Input } from "reactstrap";
import "../../../assets/scss/filters/filter.scss";
import { useDispatch } from "react-redux";
import toTitleCase from "../../../lib/titleCase/TitleCase";
import { setFilterA, setFilterB, setFilterC } from "../../../store/filterValue/FilterValue";
import { setToggle } from "../../../store/parentFilter/ParentFilter";
import { useSelector } from "react-redux";
import axios from "axios";
import { ServerAddress } from "../../../constants/ServerAddress";
import { MultiSelect } from "react-multi-select-component";

function DeliveryInfoFilter() {
    const dispatch = useDispatch();
    const accessToken = useSelector((state) => state.authentication.access_token);
    const [toggle, settoggle] = useState(false);
    const [client_name_filter, setclient_name_filter] = useState([]);
    const [client_name, setclient_name] = useState([]);
    const [client_name_id, setclient_name_id] = useState([]);
    const [page, setpage] = useState(1);
    const [search_txt, setsearch_txt] = useState("");
    const [client_loaded, setclient_loaded] = useState(false);
    const [client_count, setclient_count] = useState(1);
    const [client_bottom, setclient_bottom] = useState(100);
  
    const [from_date, setfrom_date] = useState("")
    const [to_date, setto_date] = useState("")
    // console.log("from_date----", from_date)

    const handleSubmit = () => {
      settoggle(true);
    };
  
    const getBranch = () => {
      let temp = [];
      let temp_list = [];
      axios
        .get(
          ServerAddress +
          `master/all_clients/?search=${search_txt}&p=${page}&records=${10}&bill_to=`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        )
        .then((response) => {
          console.log("response--cl----", response)
          if (response.data.next === null) {
            setclient_loaded(false);
          } else {
            setclient_loaded(true);
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
                ...client_name_filter,
                ...response.data.results.map((v) => [v.id, toTitleCase(v.name)]),
              ];
            }
            setclient_count(client_count + 2);
            setclient_name_filter(temp_list);
          }
          else {
            setclient_name_filter([])
          }
        })
        .catch((err) => {
          alert(`Error Occur in Get`, err);
        });
    };
 
    useEffect(() => {
      getBranch();
    }, [page, search_txt]);

    useEffect(() => {
      settoggle(false);
    }, []);
  
    useEffect(() => {
      dispatch(setToggle(toggle));
    }, [toggle]);
  
    useEffect(() => {
      dispatch(setFilterA([from_date]));
      dispatch(setFilterB([to_date]));
      dispatch(setFilterC([String(client_name).toUpperCase()]));
    }, [from_date,to_date,client_name]);
  
    return (
      <>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div>
            <Label className="filter-label">From Date</Label>
            <Input
              style={{ marginBottom: "10px" }}
              value={from_date}
              className="form-control-md"
              id="input"
              name="date"
              type="date"
              onChange={(val) => {
                setfrom_date(val.target.value);
              }}
            />
          </div>
          <div>
            <Label className="filter-label">To Date</Label>
            <Input
              style={{ marginBottom: "10px" }}
              value={to_date}
              className="form-control-md"
              id="input"
              name="date"
              type="date"
              onChange={(val) => {
                setto_date(val.target.value);
              }}
            />
          </div>

          <div>
          <Label className="filter-label">Client Name</Label>
          <MultiSelect
            list_a={client_name_filter}
            setlist_a={setclient_name_filter}
            list_b={client_name}
            setlist_b={setclient_name}
            setlist_id={setclient_name_id}
            show_search={true}
            get_id={false}
            page={page}
            setpage={setpage}
            setsearch_txt={setsearch_txt}
            type={"backend"}
            loaded={client_loaded}
            count={client_count}
            bottom={client_bottom}
            setbottom={setclient_bottom}
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

export default DeliveryInfoFilter
