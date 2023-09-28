import React, { useState, useLayoutEffect, useEffect } from 'react';
import PageTitle from '../../../../components/pageTitle/PageTitle';
import Title from '../../../../components/title/Title';
import SearchList from '../../../../components/listDisplay/searchList/SearchList';
import ColumnFilter from '../../../../components/listDisplay/columnfilter/ColumnFilter';
import { Button, Form, Label, Col, Row } from "reactstrap";
import { MultiSelect } from 'react-multi-select-component';
import axios from 'axios';
import { ServerAddress } from '../../../../constants/ServerAddress';
import { useSelector } from "react-redux";
// eslint-disable-next-line
import { JsonToCsv, useJsonToCsv } from "react-json-csv";
import ReportDataList from '../../../../components/listDisplay/ReportDatalist/ReportDataList';

const VendorReport = () => {
  const [selected_report_columns, setselected_report_columns] = useState([]);
  const [column_list, setcolumn_list] = useState([]);
  const [branches_list, setbranches_list] = useState([]);
  const [branch, setbranch] = useState([]);
  const [from_date, setfrom_date] = useState("");
  const [to_date, setto_date] = useState("");
  const [detailed_report_list, set_detailed_report_list] = useState([]);
  const [selected_details_report_data, setselected_details_report_data] =
    useState([]);
  const accessToken = useSelector((state) => state.authentication.access_token);
  const username = useSelector((state) => state.filtervalue.data_b);
  // JSON to CSV
  const [sheet_data, setsheet_data] = useState([]);
  const [sheet_title, setsheet_title] = useState(null);
  const { saveAsCsv } = useJsonToCsv();


  const setData = () => {
    let selected_entries = [];
    let sheet_dta_list = [];
    let sheet_tle_obj = {};
    // console.log("detailed_report_list-----", detailed_report_list)
    for (let index = 0; index < detailed_report_list.length; index++) {
      let entry = detailed_report_list[index];
      // console.log("entry------", entry)
      let entr_list = Object.entries(entry);
      // console.log("entr_list------", entr_list)
      let sheet_dta_obj = {};

      for (let ind = 0; ind < entr_list.length; ind++) {
        let entry_item = entr_list[ind];
        let colmn = rmv_title(entry_item[0]);
        // console.log("colmn----", colmn)
        let data = entry_item[1];
        // console.log("selected_report_columns----", selected_report_columns)
        let idx = selected_report_columns.indexOf(colmn);
        // console.log("idx------", idx)
        let or_idx = column_list.indexOf(colmn);

        if (idx === -1) {
          entr_list[ind] = ["Removed Data", "Removed Data"];
        } else {
          sheet_dta_obj[colmn] = data;
          sheet_tle_obj[colmn] = colmn;
        }
      }
      // console.log("entr_list-----", entr_list)
      sheet_dta_list.push(sheet_dta_obj);
      selected_entries.push(entr_list);
    }
    setsheet_title(sheet_tle_obj);
    setsheet_data(sheet_dta_list);
    // console.log("selected_entries----", selected_entries)
    setselected_details_report_data(selected_entries);
  };

  const getBranch = () => {
    let temp = [];

    axios
      .get(ServerAddress + "master/get-branch-details/?username=" + username, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        for (let index = 0; index < response.data.length; index++) {
          const branch = response.data[index];
          let pair = { label: branch.name, value: branch.name };
          temp.push(pair);
        }
        setbranches_list(temp);
      })
      .catch((err) => {
        alert(`Error Occur in Get Branches , ${err}`);
      });
  };

  const getVendorReport = (branches) => {
    let temp2 = [];
    axios
      .post(
        ServerAddress + "analytic/get_vendor_report/?username=" + username,
        {
          branches_list: branches,
          from_date: from_date,
          to_date: to_date,
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        console.log("response data report data length", response.data);

        if (response.data.length !== 0) {
          let sample_data = response.data[0];
          let columns = Object.keys(sample_data);
          for (let index = 0; index < columns.length; index++) {
            const col = columns[index];
            temp2.push(rmv_title(col));

          }
          set_detailed_report_list(response.data);
          setcolumn_list(temp2);
          setselected_report_columns(temp2);

        } else {
          set_detailed_report_list([]);
          setcolumn_list([]);
          setselected_report_columns([]);
          setselected_details_report_data([]);
        }
      })
      .catch((err) => {
        alert(`Error Occur in Get Branches , ${err}`);
      });
  }

  useLayoutEffect(() => {
    getBranch();
    setfrom_date();
    setto_date();
  }, []);


  const rmv_title = col => {
    // console.log("col----", col)
    let temp = [];
    let result_str = "";
    let tmp_col_list = col.split("_");
    for (let index = 0; index < tmp_col_list.length; index++) {
      const str = tmp_col_list[index];
      let final_string = "";
      final_string = str.toUpperCase();

      temp.push(final_string);
    }
    result_str = temp.join(" ");
    return result_str;
  };

  const submit_data = () => {
    let branches = [];
    for (let index = 0; index < branch.length; index++) {
      let branch_name = branch[index].label;
      branches.push(branch_name);
    }
    getVendorReport(branches);
  };
  // console.log("submit_data", branch.length)

  useEffect(() => {
    if (detailed_report_list.length !== 0) {
      setData();
    }
  }, [selected_report_columns]);


  return (
    <div>
      <PageTitle page="Vendor Bill Report" />
      <Title title="Vendor Bill Report" parent_title="Analytics" />
      <div className="mx-3">
        <div className="container-fluid " style={{ background: "white" }}>
          {/* Toolbar Section */}
          <div className="mb-2 row ">
            <div className=" mt-3 col-sm-4">
              <SearchList />
            </div>
            <div className="col-sm-8">
              <div className="text-sm-end">
                {/* Add Branch Navigation Button */}
                <span className=" mb-2 me-2 mt-3 btn ">
                  {column_list.length !== 0 && (
                    <ColumnFilter
                      column_list={column_list}
                      selected_data={selected_report_columns}
                      setselected_data={setselected_report_columns}
                    />
                  )}
                </span>
                {sheet_data.length !== 0 && (
                  <Button
                    type="button"
                    className="btn-rounded fluid mb-2 me-2 mt-3 btn btn-success"
                    onClick={() =>
                      saveAsCsv({
                        data: sheet_data,
                        fields: sheet_title,
                        filename: "Vendor_Report",
                      })
                    }
                  >
                    Download Report
                  </Button>
                )}
              </div>
            </div>
          </div>
          <div>
            <Form>
              <Col lg={12} md={12} sm={12}>
                <Row>
                  {/* Select Branch */}
                  <Col lg={3} md={4} sm={6}>
                    <div className="mb-3">
                      <Label className="header-child">Select Branch:</Label>
                      <MultiSelect
                        options={branches_list.map((branch) => ({
                          label: `${branch.label}`,
                          value: `${branch.value}`,
                        }))}
                        value={branch}
                        onChange={setbranch}
                        labelledBy="Select "
                        error_message="Select Branch"
                      />
                    </div>
                  </Col>
                  {/* From Date */}
                  <Col lg={3} md={4} sm={6}>
                    <div className="mb-3">
                      <Label className="header-child">From:</Label>
                      <input
                        type="date"
                        className="form-control d-block form-control-md "
                        value={from_date}
                        onChange={(val) => {
                          setfrom_date(val.target.value);
                        }}
                        error_message="Select From Date"
                      />
                    </div>
                  </Col>
                  {/* To Date */}
                  <Col lg={3} md={4} sm={6}>
                    <div className="mb-3">
                      <Label className="header-child">To:</Label>
                      <input
                        type="date"
                        className="form-control d-block form-control-md "
                        value={to_date}
                        onChange={(val) => {
                          setto_date(val.target.value);
                        }}
                      />
                    </div>
                  </Col>
                  {/* Submit Button */}
                  <Col lg={3} md={4} sm={6}>
                    <div className="mb-2">
                      <Label></Label>
                      <div style={{ height: "10%", paddingTop: "12px" }}>
                        <Button
                          onClick={submit_data}
                          type="Button"
                          className="btn btn-info"
                        >
                          Submit
                        </Button>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Form>
          </div>
          {/* DataTable */}
          <div>
            {selected_details_report_data.length !== 0 ? (
              <ReportDataList
                Data_Title={selected_report_columns}
                Data_Format={selected_details_report_data}
              />
            ) : (
              <span>No Data Found</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default VendorReport;