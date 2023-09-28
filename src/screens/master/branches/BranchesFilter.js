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
  setFilterE,
} from "../../../store/filterValue/FilterValue";
import { ServerAddress } from "../../../constants/ServerAddress";
import toTitleCase from "../../../lib/titleCase/TitleCase";
import { setToggle } from "../../../store/parentFilter/ParentFilter";

function BranchesFilter() {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.authentication.access_token);

  const [branch_name_filter, setbranch_name_filter] = useState([]);
  const [branch_name, setbranch_name] = useState([]);
  const [branch_name_id, setbranch_name_id] = useState([]);
  const [page, setpage] = useState(1);
  const [search_txt, setsearch_txt] = useState("");
  const [branch_loaded, setbranch_loaded] = useState(false);
  const [branch_count, setbranch_count] = useState(1);
  const [branch_bottom, setbranch_bottom] = useState(100);

  const [vendor_filter, setvendor_filter] = useState([]);
  const [vendor, setvendor] = useState([]);
  const [vendor_id, setvendor_id] = useState([]);
  const [vendor_page, setvendor_page] = useState(1);
  const [search_vendor, setsearch_vendor] = useState("");
  const [vendor_loaded, setvendor_loaded] = useState(false)
  const [vendor_count, setvendor_count] = useState(1)
  const [vendor_bottom, setvendor_bottom] = useState(100)

  const [branch_city_filter, setbranch_city_filter] = useState([]);
  const [branch_city, setbranch_city] = useState([]);
  const [branch_city_id, setbranch_city_id] = useState([]);
  const [branch_city_page, setbranch_city_page] = useState(1);
  const [search_branch_city, setsearch_branch_city] = useState("");
  const [branch_city_count, setbranch_city_count] = useState(1);
  const [branch_city_loaded, setbranch_city_loaded] = useState(false);
  const [branch_city_bottom, setbranch_city_bottom] = useState(100);

  const [org_filter, setorg_filter] = useState([]);
  const [org, setorg] = useState([]);
  const [org_id, setorg_id] = useState([]);
  const [org_page, setorg_page] = useState(1);
  const [search_org, setsearch_org] = useState("");
  const [org_count, setorg_count] = useState(1);
  const [org_loaded, setorg_loaded] = useState(false);
  const [org_bottom, setorg_bottom] = useState(100);

  const [branch_type_filter, setbranch_type_filter] = useState([
    ["OB","Own Branch"],
    ["VR","Vendor"],
  ]);
  const [branch_type, setbranch_type] = useState([]);
  const [branch_type_id, setbranch_type_id] = useState([]);

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
        ]}&branch_search=${search_txt}&vendor_search=${search_vendor}&data=all`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        if (response.data.next === null) {
          setbranch_loaded(false);
        } else {
          setbranch_loaded(true);
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
          setbranch_count(branch_count + 2);
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
  const getOrg = () => {
    let temp = [];
    let temp_list = [];
    axios
      .get(
        ServerAddress +
        `organization/get_organization/?search=${search_org}&p=${org_page}&records=${10}&name=${[]}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        if (response.data.next === null) {
        console.log("the org data is ======",response)
          setorg_loaded(false);
        } else {
          setorg_loaded(true);
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
          setorg_count(org_count + 2);
          setorg_filter(temp_list);
        }
        else {
          setorg_filter([])
        }
      })
      .catch((err) => {
        alert(`Error Occur in Get`, err);
      });
  };
  const getCity = () => {
    let temp = [];
    let temp_list = [];
    axios
      .get(
        ServerAddress +
        `master/all_cities/?search=${""}&p=${branch_city_page}&records=${10}&city_search=${search_branch_city}&place_id=all&filter_by=all`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        if (response.data.next === null) {
          setbranch_city_loaded(false);
        } else {
          setbranch_city_loaded(true);
        }

        temp = response.data.results;
        if (temp.length > 0) {
          if (branch_city_page === 1) {
            temp_list = response.data.results.map((v) => [
              v.id,
              toTitleCase(v.city),
            ]);
          } else {
            temp_list = [
              ...branch_city_filter,
              ...response.data.results.map((v) => [v.id, toTitleCase(v.city)]),
            ];
          }
          setbranch_city_count(branch_city_count + 2);
          setbranch_city_filter(temp_list);
        }
        else {
          setbranch_city_filter([])
        }
      })
      .catch((err) => {
        alert(`Error Occur in Get`, err);
      });
  };
  const getVendor = () => {
    let temp = [];
    let temp_list = [];
    axios
      .get(
        ServerAddress +
        `master/all_vendor/?p=${vendor_page}&records=${10}&vendor_name=${[
          "",
        ]}&name_search=${search_vendor}&data=all`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        if (response.data.next === null) {
          setvendor_loaded(false);
        } else {
          setvendor_loaded(true);
        }
        temp = response.data.results;
        if (temp.length > 0) {
          if (vendor_page === 1) {
            temp_list = response.data.results.map((v) => [
              v.id,
              toTitleCase(v.name),
            ]);
          } else {
            temp_list = [
              ...vendor_filter,
              ...response.data.results.map((v) => [v.id, toTitleCase(v.name)]),
            ];
          }
          setvendor_count(vendor_count + 2);
          setvendor_filter(temp_list);
        }
        else {
          setvendor_filter([])
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
    getBranch();
  }, [page, search_txt]);

  useEffect(() => {
    getOrg();
  }, [org_page, search_org]);

  useEffect(() => {
    getVendor();
  }, [vendor_page, search_vendor]);

  useEffect(() => {
    getCity();
  }, [branch_city_page, search_branch_city]);

  const [toggle, settoggle] = useState(false);

  useEffect(() => {
    settoggle(false);
  }, []);

  useEffect(() => {
    dispatch(setToggle(toggle));
  }, [toggle]);

  useEffect(() => {
    dispatch(setFilterA([String(branch_name).toUpperCase()]));
    dispatch(setFilterB([vendor_id]));
    dispatch(setFilterC([branch_city_id]));
    dispatch(setFilterD([String(branch_type_id).toUpperCase()]));
    dispatch(setFilterE([String(org).toUpperCase()]));
  }, [branch_name, vendor_id, branch_city_id,branch_type_id,org]);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div>
          <Label className="filter-label">Branch Type </Label>
          <MultiSelect
            list_a={branch_type_filter}
            list_b={branch_type}
            setlist_b={setbranch_type}
            show_search={false}
            setlist_id={setbranch_type_id}
            page={page}
            setpage={setpage}
            setsearch_txt={setsearch_txt}
          />
        </div>
        <div>
          <Label className="filter-label">Branch Name</Label>
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
            loaded={branch_loaded}
            count={branch_count}
            bottom={branch_bottom}
            setbottom={setbranch_bottom}
          />
        </div>

        <div>
          <Label className="filter-label">	Organization Name </Label>
          <MultiSelect
            list_a={org_filter}
            setlist_a={setorg_filter}
            list_b={org}
            setlist_b={setorg}
            setlist_id={setorg_id}
            show_search={true}
            get_id={false}
            page={org_page}
            setpage={setorg_page}
            setsearch_txt={setsearch_org}
            type={"backend"}
            loaded={org_loaded}
            count={org_count}
            bottom={org_bottom}
            setbottom={setorg_bottom}
          />
        </div>

        <div>
          <Label className="filter-label">Vendor</Label>
          <MultiSelect
            list_a={vendor_filter}
            setlist_a={setvendor_filter}
            list_b={vendor}
            setlist_b={setvendor}
            setlist_id={setvendor_id}
            show_search={true}
            page={vendor_page}
            setpage={setvendor_page}
            setsearch_txt={setsearch_vendor}
            type={"backend"}
            loaded={vendor_loaded}
            count={vendor_count}
            bottom={vendor_bottom}
            setbottom={setvendor_bottom}
          />
        </div>

        <div>
          <Label className="filter-label">Branch City</Label>
          <MultiSelect
            list_a={branch_city_filter}
            setlist_a={setbranch_city_filter}
            list_b={branch_city}
            setlist_b={setbranch_city}
            setlist_id={setbranch_city_id}
            show_search={true}
            page={branch_city_page}
            setpage={setbranch_city_page}
            setsearch_txt={setsearch_branch_city}
            type={"backend"}
            loaded={branch_city_loaded}
            count={branch_city_count}
            bottom={branch_city_bottom}
            setbottom={setbranch_city_bottom}
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

export default BranchesFilter;
