import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Label,Col, Row  } from "reactstrap";
import MultiSelect from "../../../components/formComponent/multiSelect/MultiSelect";
import { ServerAddress } from "../../../constants/ServerAddress";
import { useSelector } from "react-redux";
import { setToggle } from "../../../store/parentFilter/ParentFilter";
import { useDispatch } from "react-redux";
import { setFilterA,setFilterB,setFilterC,setFilterD, setFilterE } from "../../../store/filterValue/FilterValue";
import toTitleCase from "../../../lib/titleCase/TitleCase";

const UserFilter = () => {
  const accessToken = useSelector((state) => state.authentication.access_token);
  const data_len = useSelector((state) => state.pagination.data_length);
  const page_num = useSelector((state) => state.pagination.page_number);
  const [home_branch, sethome_branch] = useState([]);
  const [branch_name_filter, setbranch_name_filter] = useState([]);
  const [branch_name_id, setbranch_name_id] = useState([]);
  const [page, setpage] = useState(1);
  const [search_txt, setsearch_txt] = useState("");
  const [user_loaded, setuser_loaded] = useState(false);
  const [user_count, setuser_count] = useState(1);
  const [user_bottom, setuser_bottom] = useState(100);
  const dispatch = useDispatch();

  const [user_type_filter, setuser_type_filter] = useState([
    ["1","Employee"],
    ["2","Bill To"],
    ["3","Coloader"],
    ["4","Customer"],
    ["5","QIL User"],
    ["6","Company User"],
    ["7","Client User"],
  ]);
  const [user_type, setuser_type] = useState([]);
  const [user_type_id, setuser_type_id] = useState([]);

  const [access_type_filter, setaccess_type_filter] = useState([
    ["1","Web"],
    ["2","Mobile"],
    ["3","Web + Mobile"],
  ]);
  const [access_type, setaccess_type] = useState([]);
  const [access_type_id, setaccess_type_id] = useState([]);

  const [department, setdepartment] = useState("");
  const [department_filter, setdepartment_filter] = useState([]);
  const [department_id, setdepartment_id] = useState("");
  const [department_page, setdepartment_page] = useState(1);
  const [department_page_search, setdepartment_page_search] = useState("")
  const [department_loaded, setdepartment_loaded] = useState(false);
  const [department_count, setdepartment_count] = useState(1);
  const [department_bottom, setdepartment_bottom] = useState(100);

  const [user_active_btn, setuser_active_btn] = useState(["True", "False"]);

 
  const gethomeBranch = () => {
    let temp = [];
    let temp_list = [...branch_name_filter];
    axios
      .get(
        ServerAddress +
          `master/all-branches/?search=${""}&p=${page_num}&records=${data_len}&branch_name=${[
            "",
          ]}&branch_city=${[""]}&branch_search=${search_txt}&vendor=&data=all`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        if (response.data.next === null) {
          setuser_loaded(false);
        } else {
          setuser_loaded(true);
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
          setuser_count( user_count + 2);
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

  const getDepartmentName = () => {
    let temp = [];
    let temp_list = [];
    axios
    .get(
      ServerAddress +
      `ems/all-departments/?search=${department_page_search}&p=${department_page}&records=${10}&name=${[
        "",
      ]}&department_search=${department_page_search}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
      )
      .then((response) => {
        // console.log("the department name is =====",response);
        if (response.data.next === null) {
          setdepartment_loaded(false);
        } else {
          setdepartment_loaded(true);
        }
        temp = response.data.results;

        if (temp.length > 0) {
          if (department_page === 1) {
            temp_list = response.data.results.map((v) => [
              v.id,
              toTitleCase(v.name),
            ]);
          } else {
            temp_list = [
              ...department_filter,
              ...response.data.results.map((v) => [v.id, toTitleCase(v.name)]),
            ];
          }
          setdepartment_count(department_count + 2);
          setdepartment_filter(temp_list);
        }
        else {
          setdepartment_filter([])
        }
      })
      .catch((err) => {
        alert(`Error Occur in Get ${err}`);
      });
  };
  const handleSubmit = () => {
    settoggle(true);
  };
  const [toggle, settoggle] = useState(false);

  useEffect(() => {
    settoggle(false);
  }, []);

  useEffect(() => {
    dispatch(setToggle(toggle));
  }, [toggle]);

  useEffect(() => {
    // console.log("branch_name_id====", branch_name_id)
    dispatch(setFilterA([branch_name_id]));
    dispatch(setFilterB([String(user_type).toUpperCase()]));
    dispatch(setFilterC([String(access_type).toUpperCase()]));
    dispatch(setFilterD([department_id]));
    dispatch(setFilterE([user_active_btn]));
  }, [branch_name_id ,user_type,access_type,department_id,user_active_btn]);

  useEffect(() => {
    gethomeBranch();
  }, [page, search_txt]);

  useEffect(() => {
    getDepartmentName();
  }, [department_page,department_page_search])
  

  return (
    <>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div>
          <Label className="filter-label">User Type </Label>
          <MultiSelect
            list_a={user_type_filter}
            list_b={user_type}
            setlist_b={setuser_type}
            show_search={false}
            setlist_id={setuser_type_id} 
            page={page}
            setpage={setpage}
            setsearch_txt={setsearch_txt}
          />
        </div>
        <div>
          <Label className="filter-label">Department</Label>
          <MultiSelect
            list_a={department_filter}
            setlist_a={setdepartment_filter}
            list_b={department}
            setlist_b={setdepartment}
            show_search={true}
            setlist_id={setdepartment_id}
            page={department_page}
            setpage={setdepartment_page}
            setsearch_txt={setdepartment_page_search}
            type={"backend"}
            loaded={department_loaded}
            count={department_count}
            bottom={department_bottom}
            setbottom={setdepartment_bottom}
          />
        </div>
        <div>
          <Label className="filter-label">Channel Access </Label>
          <MultiSelect
            list_a={access_type_filter}
            list_b={access_type}
            setlist_b={setaccess_type}
            show_search={false}
            setlist_id={setaccess_type_id}
            page={page}
            setpage={setpage}
            setsearch_txt={setsearch_txt}
          />
        </div>
        
        <div>
          <Label className="filter-label">Home branch</Label>
          <MultiSelect
            list_a={branch_name_filter}
            list_b={home_branch}
            setlist_b={sethome_branch}
            setlist_id={setbranch_name_id}
            show_search={true}
            page={page}
            setpage={setpage}
            setsearch_txt={setsearch_txt}
            type={"backend"}
            loaded={user_loaded}
            count={user_count}
            bottom={user_bottom}
            setbottom={setuser_bottom}

          />
        </div>
        <div>
          <Label className="filter-label">By User Active</Label>
          <Row>
            <Col lg={6} md={6} sm={6}>
              <div className="form-check mb-2">
                <input
                  className="form-check-input "
                  type="radio"
                  name="user_type"
                  id="exampleRadio1"
                  value="Is Active"
                  onClick={() => {
                    setuser_active_btn("True");
                  }}
                  checked={user_active_btn === "True"}
                />

                <label
                  className="form-check-label input-box"
                  htmlFor="exampleRadios1"
                >
                  Active
                </label>
              </div>
            </Col>
            <Col lg={6} md={6} sm={6}>
              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name="user_type"
                  id="exampleRadio2"
                  value="Not Active"
                  onClick={() => {
                    setuser_active_btn("False");
                  }}
                  checked={user_active_btn === "False"}
                />
                <label
                  className="form-check-label input-box"
                  htmlFor="exampleRadios2"
                >
                  Not Active
                </label>
              </div>
            </Col>
          </Row>
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

export default UserFilter;
