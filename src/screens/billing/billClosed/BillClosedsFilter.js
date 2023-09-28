import React, { useState, useEffect, useLayoutEffect } from "react";
import { Form, Label } from "reactstrap";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import toTitleCase from "../../../lib/titleCase/TitleCase";
import { setToggle } from "../../../store/parentFilter/ParentFilter";
import { ServerAddress } from "../../../constants/ServerAddress";
import { setFilterA } from "../../../store/filterValue/FilterValue";
import MultiSelect from "../../../components/formComponent/multiSelect/MultiSelect";

const BillClosedsFilter = () => {
  const dispatch = useDispatch();

  const [primary_charge_filter, setprimary_charge_filter] = useState([
    // ['1', 'MAIN AMOUNT'],
    // ['2', 'ADDITIONAL CHARGE'],
    // ['3', 'OTHER CHARGE'],
    // ['4', 'TAX']
  ]);

  const [primary_charge, setprimary_charge] = useState([]);

  const accessToken = useSelector((state) => state.authentication.access_token);
  const [page, setpage] = useState(1);
  const [search_txt, setsearch_txt] = useState("");

  const getSecondaryCharges = () => {
    let temp_lis2 = [...primary_charge_filter];

    axios
      .get(
        ServerAddress +
          `master/all_charges/?search=${""}&p=${page}&records=${10}&primary_charges=${[
            "",
          ]}&secondary_charge_search=${search_txt}&data=all`,
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

          setprimary_charge_filter(temp_lis2);
        }
      })
      .catch((err) => {
        alert(`Error Occur while getting secondary charges , ${err}`);
      });
  };

  useLayoutEffect(() => {
    getSecondaryCharges();
  }, [page, search_txt]);

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
    dispatch(setFilterA([String(primary_charge).toUpperCase()]));
  }, [primary_charge]);

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <div>
        <Label className="filter-label">Primary Charges</Label>
        <MultiSelect
          list_a={primary_charge_filter}
          setlist_a={setprimary_charge_filter}
          list_b={primary_charge}
          setlist_b={setprimary_charge}
          show_search={true}
          get_id={false}
          page={page}
          setpage={setpage}
          setsearch_txt={setsearch_txt}
          type={"backend"}
        />
      </div>

      <div style={{ paddingTop: "10px" }}>
        <button type="submit" className="btn btn-primary m-1">
          Submit
        </button>
      </div>
    </Form>
  );
};

export default BillClosedsFilter;
