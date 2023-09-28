import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Label,Col, Row  } from "reactstrap";
import MultiSelect from "../../../components/formComponent/multiSelect/MultiSelect";
import { ServerAddress } from "../../../constants/ServerAddress";
import { useSelector } from "react-redux";
import { setToggle } from "../../../store/parentFilter/ParentFilter";
import { useDispatch } from "react-redux";
import { setFilterA,setFilterB } from "../../../store/filterValue/FilterValue";
import toTitleCase from "../../../lib/titleCase/TitleCase";


const AddFundMasterFilter = () => {
    const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.authentication.access_token);
  const data_len = useSelector((state) => state.pagination.data_length);
  const page_num = useSelector((state) => state.pagination.page_number);

  const [branch_name_filter, setbranch_name_filter] = useState([]);
  const [branch_name, setbranch_name] = useState([]);
  const [branch_name_id, setbranch_name_id] = useState([]);
  const [branch_page, setbranch_page] = useState(1);
  const [search_txt, setsearch_txt] = useState("");
  const [branch_loaded, setbranch_loaded] = useState(false);
  const [branch_count, setbranch_count] = useState(1);
  const [branch_bottom, setbranch_bottom] = useState(100);

  const [acc_type_filter, setstatus_type_filter] = useState([
    ["1", "Savings"],
    ["2", "Current"],
    ["2", "Cash Credit"],
  ]);
  const [acc_type, setacc_type] = useState([]);
  const [acc_type_id, setacc_type_id] = useState([]);
  const [page, setpage] = useState(1);
  const [toggle, settoggle] = useState(false);

  const getBranch = () => {
    let temp = [];
    let temp_list = [...branch_name_filter];
    axios
      .get(
        ServerAddress +
          `master/GetAllBranch/?search=${""}&p=${branch_page}&records=${data_len}&branch_name=${[
            "",
          ]}&branch_city=${[""]}&branch_search=${search_txt}&vendor=${[""]}&document_type=${""}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        console.log("the branch is =====",response);
        if (response.data.next === null) {
          setbranch_loaded(false);
        } else {
          setbranch_loaded(true);
        }
        temp = response.data.results;
        console.log("home branch ====",temp)
        if (temp.length > 0) {
            if (branch_page === 1) {
            temp_list = response.data.results.map((v) => [
              v.id,
              toTitleCase(v.branch_name),
            ]);
          } else {
            temp_list = [
              ...branch_name_filter,
              ...response.data.results.map((v) => [v.id, toTitleCase(v.branch_name)]),
            ];
          }
          setbranch_count( branch_count + 2);
          setbranch_name_filter(temp_list);
        }
        else {
          setbranch_name_filter([])
        }
      })
      .catch((err) => {
        alert(`Error Occur in Get`);
      });
  };
  const handleSubmit = () => {
    settoggle(true);
  };
  useEffect(() => {
    settoggle(false);
  }, []);

  useEffect(() => {
    dispatch(setToggle(toggle));
  }, [toggle]);

  useEffect(() => {
    console.log("branch_name_id====", branch_name_id)
    dispatch(setFilterA([branch_name_id]));
    dispatch(setFilterB([String(acc_type)]));
  }, [branch_name_id,acc_type]);

  useEffect(() => {
    getBranch();
  }, [branch_page, search_txt]);
  return (
    <>
    <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div>
          <Label className="filter-label">Branch</Label>
          <MultiSelect
            list_a={branch_name_filter}
            list_b={branch_name}
            setlist_b={setbranch_name}
            setlist_id={setbranch_name_id}
            show_search={true}
            page={branch_page}
            setpage={setbranch_page}
            setsearch_txt={setsearch_txt}
            type={"backend"}
            loaded={branch_loaded}
            count={branch_count}
            bottom={branch_bottom}
            setbottom={setbranch_bottom}
          />
        </div>
        
        <div>
          <Label className="filter-label">A/C Type  </Label>
          <MultiSelect
            list_a={acc_type_filter}
            list_b={acc_type}
            setlist_b={setacc_type}
            show_search={false}
            setlist_id={setacc_type_id}
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
      </form>
    </>
  )
}

export default AddFundMasterFilter