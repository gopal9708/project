import React, { useState, useEffect } from "react";
import { Form, Label } from "reactstrap";
import "../../../assets/scss/filters/filter.scss";
import { useSelector } from "react-redux";
import { ServerAddress } from "../../../constants/ServerAddress";
import axios from "axios";
import { useDispatch } from "react-redux";
import toTitleCase from "../../../lib/titleCase/TitleCase";
import { setFilterA, setFilterB,setFilterC,setFilterD} from "../../../store/filterValue/FilterValue";
import { setToggle } from "../../../store/parentFilter/ParentFilter";
import MultiSelect from "../../../components/formComponent/multiSelect/MultiSelect";

function VendorFilter() {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.authentication.access_token);

  const [vendor_filter, setvendor_filter] = useState([]);
  const [vendor, setvendor] = useState([]);
  const [vendor_id, setvendor_id] = useState([]);
  const [page, setpage] = useState(1);
  const [vendor_search, setvendor_search] = useState("");
  const [vendor_loaded, setvendor_loaded] = useState(false);
  const [vendor_count, setvendor_count] = useState(1);
  const [vendor_bottom, setvendor_bottom] = useState(100);

  const [search_txt, setsearch_txt] = useState("");
  const [company_type_filter, setcompany_type_filter] = useState([
    ["1","Individual"],
    ["2","Pvt Ltd/Ltd"],
    ["3","Partnership"],
    ["4","LLP"],
    ["5","Others"],
  ]);
  const [company_type, setcompany_type] = useState([]);
  const [company_type_id, setcompany_type_id] = useState([]);

  const [lob_type_filter, setlob_type_filter] = useState([
    ["1","Manufacturing"],
    ["2","Production"],
    ["3","Transportation"],
    ["4","Inventory"],
    ["5","Coloader"],
  ]);
  const [lob_type, setlob_type] = useState([]);
  const [lob_type_id, setlob_type_id] = useState([]);

  const [service_type_filter, setservice_type_filter] = useState([
    ["1","Pan India"],
    ["2","State"],
  ]);
  const [service_type, setservice_type] = useState([]);
  const [service_type_id, setservice_type_id] = useState([]);
  
  const getvendor = () => {
    let temp = [];
    let temp_list = [...vendor_filter];

    axios
      .get(
        ServerAddress +
          `master/all_vendor/?search=${""}&p=${page}&records=${10}&name_search=${vendor_search}&vendor_name=&data=all`,
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
          if (page === 1) {
            temp_list = response.data.results.map((v) => [
              v.id,
              toTitleCase(v.name),
            ]);
          } else {
            temp_list = [
              ... vendor_filter,
              ...response.data.results.map((v) => [v.id, toTitleCase(v.name)]),
            ];
          }
          setvendor_count( vendor_count + 2);
          setvendor_filter(temp_list);
        }
        else {
          setvendor_filter([])
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
    getvendor();
  }, [page, vendor_search]);

  const [toggle, settoggle] = useState(false);

  useEffect(() => {
    settoggle(false);
  }, []);

  useEffect(() => {
    dispatch(setToggle(toggle));
  }, [toggle]);

  useEffect(() => {
    dispatch(setFilterA([String(vendor).toUpperCase()]));
    dispatch(setFilterB([String(company_type).toUpperCase()]));
    dispatch(setFilterC([String(lob_type).toUpperCase()]));
    dispatch(setFilterD([String(service_type).toUpperCase()]));
  }, [vendor,company_type,lob_type,service_type]);

  return (
    <>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div>
          <Label className="filter-label">Company Type </Label>
          <MultiSelect
            list_a={company_type_filter}
            list_b={company_type}
            setlist_b={setcompany_type}
            show_search={false}
            setlist_id={setcompany_type_id}
            page={page}
            setpage={setpage}
            setsearch_txt={setsearch_txt}
          />
        </div>
        <div>
          <Label className="filter-label">Line Of Business  </Label>
          <MultiSelect
            list_a={lob_type_filter}
            list_b={lob_type}
            setlist_b={setlob_type}
            show_search={false}
            setlist_id={setlob_type_id}
            page={page}
            setpage={setpage}
            setsearch_txt={setsearch_txt}
          />
        </div>
        <div>
          <Label className="filter-label">Service Region  </Label>
          <MultiSelect
            list_a={service_type_filter}
            list_b={service_type}
            setlist_b={setservice_type}
            show_search={false}
            setlist_id={setservice_type_id}
            page={page}
            setpage={setpage}
            setsearch_txt={setsearch_txt}
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
            get_id={false}
            page={page}
            setpage={setpage}
            setsearch_txt={setvendor_search}
            type={"backend"}
            loaded={vendor_loaded}
            count ={vendor_count}
            bottom={vendor_bottom}
            setbottom={setvendor_bottom}
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

export default VendorFilter;
