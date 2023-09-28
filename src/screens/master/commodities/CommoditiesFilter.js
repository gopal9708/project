import React, { useState, useEffect } from "react";
import { Form, Label } from "reactstrap";
import "../../../assets/scss/filters/filter.scss";
import { useSelector } from "react-redux";
import { ServerAddress } from "../../../constants/ServerAddress";
import axios from "axios";
import { useDispatch } from "react-redux";
import toTitleCase from "../../../lib/titleCase/TitleCase";
import { setFilterA, setFilterB } from "../../../store/filterValue/FilterValue";
import { setToggle } from "../../../store/parentFilter/ParentFilter";
import MultiSelect from "../../../components/formComponent/multiSelect/MultiSelect";

function CommoditiesFilter() {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.authentication.access_token);
  // Additional Fields
  const data_len = useSelector((state) => state.pagination.data_length);
  const page_num = useSelector((state) => state.pagination.page_number);
  const [page, setpage] = useState(1);
  const [commodity_loaded, setcommodity_loaded] = useState(false);
  const [commodity_count, setcommodity_count] = useState(1);
  const [commodity_bottom, setcommodity_bottom] = useState(100);

  const [commodity_type_filter, setcommodity_type_filter] = useState([]);
  const [commodity_type, setcommodity_type] = useState([]);
  const [commodity_type_search_item, setcommodity_type_search_item] = useState("");
  const [commodity_type_id, setcommodity_type_id] = useState([]);

  const [commodity_name_filter, setcommodity_name_filter] = useState([]);
  const [commodity_name, setcommodity_name] = useState([]);
  const [commodity_name_id, setcommodity_name_id] = useState([]);

  const getCommodityType = () => {
    let temp = [];
    let temp_list = [...commodity_type_filter];

    axios
      .get(
        ServerAddress +
          `master/all_commoditytype/?search=${""}&p=${page}&records=${10}&commodity_type_search=${commodity_type_search_item}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        if (response.data.next === null) {
           setcommodity_loaded(false);
        } else {
          setcommodity_loaded(true);
        }
        temp = response.data.results;
        if (temp.length > 0) {
          if (page === 1) {
            temp_list = response.data.results.map((v) => [
              v.id,
              toTitleCase(v.type),
            ]);
          } else {
            temp_list = [ 
              ...setcommodity_type_filter,
              ...response.data.results.map((v) => [v.id, toTitleCase(v.type)]),
            ];
          }
           setcommodity_count(commodity_count + 2);
           setcommodity_type_filter(temp_list);
        }
        else {
          setcommodity_type_filter([])
        }
      })
      //   for (let index = 0; index < temp.length; index++) {
      //     temp_list.push([temp[index].id, toTitleCase(temp[index].type)]);
      //   }
      //   temp_list = [...new Set(temp_list.map((v) => `${v}`))].map((v) =>
      //     v.split(",")
      //   );
      //   setcommodity_type_filter(temp_list);
      // })
      .catch((err) => {
        alert(`Error Occur in Get ${err}`);
      });
  };

  const handleSubmit = () => {
    settoggle(true);
  };

  useEffect(() => {
    getCommodityType();
  }, [page, commodity_type_search_item]);

  const [toggle, settoggle] = useState(false);

  useEffect(() => {
    settoggle(false);
  }, []);

  useEffect(() => {
    dispatch(setToggle(toggle));
  }, [toggle]);

  useEffect(() => {
    dispatch(setFilterA([String(commodity_type_id).toUpperCase()]));
  }, [commodity_type_id]);

  return (
    <>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div>
          <Label className="filter-label">Commodity Type </Label>
          <MultiSelect
            list_a={commodity_type_filter}
            setlist_a={setcommodity_type_filter}
            list_b={commodity_type}
            setlist_b={setcommodity_type}
            show_search={true}
            setlist_id={setcommodity_type_id}
            page={page}
            setpage={setpage}
            setsearch_txt={setcommodity_type_search_item}
            type={"backend"}
            loaded={commodity_loaded}
            count={commodity_count}
            setbottom={setcommodity_bottom}
          />
        </div>
        {/* <div>
          <Label className="filter-label">Commodity Name</Label>
          <MultiSelect
            list_a={commodity_name_filter}
            setlist_a={setcommodity_name_filter}
            list_b={commodity_name}
            setlist_b={setcommodity_name}
            setlist_id={setcommodity_name_id}
            show_search={true}
            get_id={false}
            page={page}
            setpage={setpage}
            setsearch_txt={setcommodity_name}
            type={"backend"}

          />
        </div> */}

        <div style={{ paddingTop: "10px" }}>
          <button type="submit" className="btn btn-primary m-1">
            Submit
          </button>
        </div>
      </Form>
    </>
  );
}

export default CommoditiesFilter;
