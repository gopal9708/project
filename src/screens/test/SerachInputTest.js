import axios from "axios";
import React, { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Row } from "reactstrap";
import SearchInput from "../../components/formComponent/searchInput/SearchInput";
import { ServerAddress } from "../../constants/ServerAddress";
import toTitleCase from "../../lib/titleCase/TitleCase";
import { setUserDetails } from "../../store/authentication/Authentication";

const Test = () => {
  const dispatch = useDispatch();
  // let test_lst = [false,false,false]

  const accessToken = useSelector((state) => state.authentication.access_token);
  const [test_lst, settest_lst] = useState([]);
  const [test_st, settest_st] = useState("");
  const [test_id, settest_id] = useState(0);
  // const search = useSelector(state => state.searchbar.search_item);

  const [page, setpage] = useState(1);
  const [search_item, setsearch_item] = useState("");

  const getSecondaryCharges = () => {
    let temp_lis2 = [...test_lst];

    axios
      .get(
        ServerAddress +
          `master/all_charges/?search=${""}&p=${page}&records=${10}&primary_charges=${[
            "",
          ]}&secondary_charge_search=${search_item}&data=all`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        if (response.data.results.length > 0) {
          for (let index = 0; index < response.data.results.length; index++) {
            const chrg = response.data.results[index];
            temp_lis2.push([chrg.id, toTitleCase(chrg[`secondary_charge`])]);
          }

          temp_lis2 = [...new Set(temp_lis2.map((v) => `${v}`))].map((v) =>
            v.split(",")
          );
          settest_lst(temp_lis2);
        }
      })
      .catch((err) => {
        alert(`Error Occur while getting secondary charges , ${err}`);
      });
  };

  useLayoutEffect(() => {
    getSecondaryCharges();
  }, [page, search_item]);

  return (
    <div style={{ padding: 10 }}>
      <Row>
        <Col lg={4} md={4} sm={6}>
          <SearchInput
            data_list={test_lst}
            setdata_list={settest_lst}
            data_item_s={test_st}
            set_data_item_s={settest_st}
            set_id={settest_id}
            page={page}
            setpage={setpage}
            error_message={"Please Select Any Option"}
            setsearch_item={setsearch_item}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Test;
