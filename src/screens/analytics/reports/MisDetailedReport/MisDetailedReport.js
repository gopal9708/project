import React, { useState, useEffect, useLayoutEffect } from "react";
import { Button, Form, Label, Col, Row } from "reactstrap";
import SearchList from "../../../../components/listDisplay/searchList/SearchList";
import PageTitle from "../../../../components/pageTitle/PageTitle";
import Title from "../../../../components/title/Title";
import { MultiSelect } from "react-multi-select-component";
import { ServerAddress } from "../../../../constants/ServerAddress";
import axios from "axios";
import { useSelector } from "react-redux";
import ColumnFilter from "../../../../components/listDisplay/columnfilter/ColumnFilter";
import NSearchInput from "../../../../components/formComponent/nsearchInput/NSearchInput";
import ReportDataList from "../../../../components/listDisplay/ReportDatalist/ReportDataList";
// eslint-disable-next-line
import { useJsonToCsv } from "react-json-csv";

const MisDetailedReport = () => {

  const [branch, setbranch] = useState([]);
  const [branches_list, setbranches_list] = useState([]);
  const username = useSelector((state) => state.filtervalue.data_b);
  const [client, setclient] = useState([]);
  const[billto, setbillto] = useState([]);
  const[client_list,setClient_list] = useState([]);
  const [billTo_list, setBillTo_list] = useState([]);
  const [page, setpage] = useState(1);
  const accessToken = useSelector((state) => state.authentication.access_token);
  const [column_list, setcolumn_list] = useState([]);
  const search = useSelector((state) => state.searchbar.search_item);
  const [empty_billto, setempty_c] = useState(false);
  const data_len = useSelector((state) => state.pagination.data_length);
  const page_num = useSelector((state) => state.pagination.page_number);
  const [booking_type_list, setbooking_type_list] = useState([
    "ALL(Air+Local)",
    "Air",
    "Local",
    "Surface",
  ]);
  const [booking_type, setbooking_type] = useState("");
  const [from_date, setfrom_date] = useState("");
  const [to_date, setto_date] = useState("");
  const [selected_report_columns, setselected_report_columns] = useState([]);
  const [selected_details_report_data, setselected_details_report_data] =
    useState([]);
    // console.log("selected_report_columns----", selected_report_columns)
    // console.log("selected_details_report_data-----", selected_details_report_data)
  const [detailed_report_list, set_detailed_report_list] = useState([]);
  // console.log("detailed_report_list----", detailed_report_list)
  // JSON to CSV
  const [sheet_data, setsheet_data] = useState([]);
  const [sheet_title, setsheet_title] = useState(null);
  const { saveAsCsv } = useJsonToCsv();

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

  const getclients = (billto2_list) => {
    let temp3 = [];
    console.log("temp3",temp3)
    axios
      .get(
        ServerAddress +
          `master/all_clients/?bill_to=${billto2_list}&p=${page_num}&records=${data_len}&name=${[""]}&data=all`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        for (let index = 0; index < response.data.results.length; index++) {
          // console.log("clients.....",response.data.results)
          const client = response.data.results[index];
          let pair = { label: client.name, value: client.name };
          temp3.push(pair);
        }

        setClient_list(temp3);
      })
      .catch((err) => {
        alert(`Error Occur in Get Clients , ${err}`);
      });
  };



  useLayoutEffect(() => {
    getBranch();
    getbilltos();
    
    setfrom_date();
    setto_date();
  }, []);

  const getbilltos = () => {
    let temp2 = [];
    // console.log("billto", )
    axios
      .get(
        ServerAddress +
          `master/all_billtoes/?search=${search}&bill_to=${billTo_list}&p=${page_num}&records=${data_len}&pan_no=${[]}&data=all`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        for (let index = 0; index < response.data.results.length; index++) {
          const billto = response.data.results[index];
          let pair = { label: billto.name, value: billto.id };
          temp2.push(pair);
        }

        setBillTo_list(temp2);
      })
      .catch((err) => {
        alert(`Error Occur in Get Clients , ${err}`);
      });
  };

  const getDetailReportData = (branches) => {
    let temp2 = [];
    axios
      .post(
        ServerAddress + "analytic/get_detail_report/?username=" + username,
        {
          branches_list: branches,
          bill_to: billto,
          client : client,
          booking_type: booking_type,
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
  };

  const submit_data = () => {
    let branches = [];
    let billtos = [];
    let clients = [];
    for (let index = 0; index < branch.length; index++) {
      let branch_name = branch[index].label;
      branches.push(branch_name);
    }
    for (let index = 0; index < billtos.length; index++) {
      let billto_name = billto[index].label;
      billtos.push(billto_name);
    }
    for (let index = 0; index < clients.length; index++) {
      let client_name = client[index].label;
      clients.push(client_name);
    }

    getDetailReportData(branches, billtos, clients);
  };
  // console.log("submit_data..client",client.length)
  
  // const submit_data = () => {
  //   let branches = [];
  //   for (let index = 0; index < branch.length; index++) {
  //     let name = branch[index].label;
  //     branches.push(name);
  //   }

  //   getDetailReportData(branches);
  // };

  useEffect(() => {
    if (detailed_report_list.length !== 0) {
      setData();
    }
  }, [selected_report_columns]);

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

  useLayoutEffect(()=>{
    
    if (billto.length>0){
      let billto2_list= billto.map(b=>b.value)
      getclients(billto2_list);
    }
    
  },[billto]);

  return (
    <div>
      <PageTitle page="Detailed Report(MIS)" />
      <Title title="Detailed Report(MIS)" parent_title="Analytics" />
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
                <span
                  className=" mb-2 me-2 mt-3 btn "
                  // style={{width:"30%", border:"none"}}
                >
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
                      filename: "Detailed_Report",
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
              <Col lg={14} md={12} sm={12}>
                <Row>
                  {/* Select Branch */}
                  <Col lg={2} md={4} sm={4}>
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
                  {/* Select BillTo */}
                  
                  
                  <Col lg={2} md={4} sm={4}>
                    <div className="mb-3">
                      <Label className="header-child">Select BillTo:</Label>
                      <MultiSelect
                        options={billTo_list.map((billto) => ({
                          label: `${billto.label}`,
                          value: `${billto.value}`,
                        }))}
                        value={billto}
                        onChange={setbillto}
                        labelledBy="Select"
                        error_message="Select BillTo"
                      />
                      <div className="mt-1 error-text" color="danger">
                          {empty_billto
                            ? "billto is required"
                            : null}
                        </div>
                    </div>
                  </Col> 
                  {billto.length >0 ? (
                  <Col lg={2} md={4} sm={4}>
                      <div className="mb-3">
                        <Label className="header-child">Select Client:</Label>
                        <MultiSelect 
                          options={client_list.map((client) => ({
                            label: `${client.label}`,
                            value: `${client.value}`,
                          }))}
                          value={client}
                          onChange={setclient}
                          labelledBy="Select"
                          error_message="Select client"
                        />
                      
                      </div>
                    </Col>
                  ) : null}
                  
                  {/* Booking Type Via */}
                  <Col lg={2} md={3} sm={4}>
                    <div className="mb-3">
                      <Label className="header-child">Booking Type:</Label>
                      <NSearchInput
                        data_list={booking_type_list}
                        setdata_list={setbooking_type_list}
                        data_item_s={booking_type}
                        set_data_item_s={setbooking_type}
                        show_search={false}
                        page={page}
                        error_message="Select Booking Type"
                      />
                    </div>
                  </Col>
                  {/* From Date */}
                  <Col lg={2} md={3} sm={4}>
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
                  <Col lg={2} md={3} sm={4}>
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
                  <Col lg={1} md={3} sm={4}>
                    <div className="mb-3">
                      <Label></Label>
                      <div style={{ height: "10%", paddingTop: "12px" }}>
                        <Button
                          onClick={submit_data}
                          type="Button"
                          className="btn btn-info"
                        >
                          submit
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
  );
};

export default MisDetailedReport;