import React, { useState, useEffect } from "react";
import { Label } from "reactstrap";
import "../../../assets/scss/filters/filter.scss";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import MultiSelect from "../../../components/formComponent/multiSelect/MultiSelect";
import {
  setFilterA,
  setFilterB,
  setFilterC,
  setFilterD,
} from "../../../store/filterValue/FilterValue";
import { ServerAddress } from "../../../constants/ServerAddress";
import toTitleCase from "../../../lib/titleCase/TitleCase";
import { setToggle } from "../../../store/parentFilter/ParentFilter";

const AssetsFilter = () => {

  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.authentication.access_token);
  const [toggle, settoggle] = useState(false);
  const [branch_name_filter, setbranch_name_filter] = useState([]);
  const [branch_name, setbranch_name] = useState([]);
  const [branch_name_id, setbranch_name_id] = useState([]);
  const [page, setpage] = useState(1);
  const [search_txt, setsearch_txt] = useState("");
  const [assets_loaded, setassets_loaded] = useState(false);
  const [assets_count, setassets_count] = useState(1);
  const [assets_bottom, setassets_bottom] = useState(100);

  const [assets_type_filter, setassets_type_filter] = useState([
    ["1","Logger"],
    ["2","Temperature Control Box"],
  ]);
  const [assets_type, setassets_type] = useState([]);
  const [assets_type_id, setassets_type_id] = useState([]);

  const [logger_type_filter, setlogger_type_filter] = useState([
    ["1","Single Use"],
    ["2","Multi Use"],
    ["3","Dry Ice Single Use"],
    ["4","Dry Ice Multi Use"],
  ]);
  const [logger_type, setlogger_type] = useState([]);
  const [logger_type_id, setlogger_type_id] = useState([]);

  const [box_type_filter, setbox_type_filter] = useState([
    ["1","Cool Guard"],
    ["2","Credo"],
    ["3","Vype"],
    ["4","Isgo"],
    ["5","Safe"]
  ]);
  const [box_type, setbox_type] = useState([]);
  const [box_type_id, setbox_type_id] = useState([]);

  const getBranch = () => {
    let temp = [];
    let temp_list = [];
    axios
      .get(
        ServerAddress +
          `master/all-branches/?search=${""}&p=${page}&records=${10}&branch_name=${[
            "",
          ]}&branch_city=${[""]}&vendor=${[
            "",
          ]}&branch_search=${search_txt}&vendor_search=${""}&data=all`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        if (response.data.next === null) {
          setassets_loaded(false);
        } else {
          setassets_loaded(true);
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
              ...branch_name_filter,
              ...response.data.results.map((v) => [v.id, toTitleCase(v.name)]),
            ];
          }
          setassets_count(assets_count + 2);
          setbranch_name_filter(temp_list);
        }
        else {
          setbranch_name_filter([])
        }
      })
      .catch((err) => {
        alert(`Error Occur in Get`, err);
      });
  };

  const handleSubmit = () => {
    settoggle(true);  
  };

  useEffect(() => {
    dispatch(setToggle(toggle));
  }, [toggle]);

  useEffect(() => {
    getBranch();
  }, [page, search_txt]);

  useEffect(() => {
    dispatch(setFilterA([String(branch_name).toUpperCase()]));
    dispatch(setFilterB([String(assets_type).toUpperCase()]));
    dispatch(setFilterC([String(logger_type).toUpperCase()]));
    dispatch(setFilterD([String(box_type).toUpperCase()]));
  }, [branch_name,assets_type,logger_type,box_type]);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div>
          <Label className="filter-label">Asset Type </Label>
          <MultiSelect
            list_a={assets_type_filter}
            list_b={assets_type}
            setlist_b={setassets_type}
            show_search={false}
            setlist_id={setassets_type_id}
            page={page}
            setpage={setpage}
            setsearch_txt={setsearch_txt}
          />
        </div>

        <div>
          <Label className="filter-label">Logger Type </Label>
          <MultiSelect
            list_a={logger_type_filter}
            list_b={logger_type}
            setlist_b={setlogger_type}
            show_search={false}
            setlist_id={setlogger_type_id}
            page={page}
            setpage={setpage}
            setsearch_txt={setsearch_txt}
          />
        </div>
        
        <div>
          <Label className="filter-label">Box Type </Label>
          <MultiSelect
            list_a={box_type_filter}
            list_b={box_type}
            setlist_b={setbox_type}
            show_search={false}
            setlist_id={setbox_type_id}
            page={page}
            setpage={setpage}
            setsearch_txt={setsearch_txt}
          />
        </div>
        <div>
          <Label className="filter-label">Current Branch</Label>
          <MultiSelect
            list_a={branch_name_filter}
            setlist_a={setbranch_name_filter}
            list_b={branch_name}
            setlist_b={setbranch_name}
            setlist_id={setbranch_name_id}
            show_search={true}
            get_id={false}
            page={page}
            setpage={setpage}
            setsearch_txt={setsearch_txt}
            type={"backend"}
            loaded={assets_loaded}
            count={assets_count}
            bottom={assets_bottom}
            setbottom={setassets_bottom}
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
};

export default AssetsFilter;
