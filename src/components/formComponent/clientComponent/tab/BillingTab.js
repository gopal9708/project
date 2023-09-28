import React, { useState, useEffect, useLayoutEffect } from "react";
import classnames from "classnames";
import {
  CardBody,
  Col,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  Nav,
  Input,
  Label,
  Table,
  Button,
} from "reactstrap";
import { useSelector } from "react-redux";

// import Associated_Charges from "./Tab_Components/Associated_Charges";
import { FiCheckSquare, FiSquare } from "react-icons/fi";
import { IconContext } from "react-icons";
import { MdAdd, MdDelete } from "react-icons/md";
import axios from "axios";
import toTitleCase from "../../../../lib/titleCase/TitleCase";
import { ServerAddress } from "../../../../constants/ServerAddress";
import MultiRowSearchInput from "../../multiRowSearchInput/MultiRowSearchInput";
import NSearchInput from "../../nsearchInput/NSearchInput";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
//for css
import "../../../../screens/test/Test.css";

//for export
import { useJsonToCsv } from "react-json-csv";
import { Modal } from "react-bootstrap";
const BillingTab = ({
  activeTab,
  setactiveTab,
  activeAirTab,
  setactiveAirTab,
  activeSurfaceTab,
  setactiveSurfaceTab,

  // Percentg List
  is_per_charge,
  setis_per_charge,
  is_per_charge_air,
  setis_per_charge_air,
  is_per_charge_surfc,
  setis_per_charge_surfc,
  per_charge_list,
  setper_charge_list,
  per_charge_list_air,
  setper_charge_list_air,
  per_charge_list_surface,
  setper_charge_list_surface,

  // Checkis
  is_local,
  is_air,
  is_surface,
  is_cargo,
  is_train,
  is_courier,
  is_warehouse,

  // Table Data Domestics
  datalist,
  setdatalist,
  datalist1,
  setdatalist1,
  dom_rate_type,
  setdom_rate_type,

  // Table Data Zone
  dom_rate_category,
  setdom_rate_category,

  // Table Data Local
  local_datalist,
  setlocal_datalist,
  dom_rate_type_local,
  setdom_rate_type_local,

  // Del ids
  asso_del_ids,
  setasso_del_ids,
  per_del_ids,
  setper_del_ids,

  dom_rt_del_ids_air,
  setdom_rt_del_ids_air,

  dom_rt_del_ids_zone_air,
  setdom_rt_del_ids_zone_air,

  per_del_ids_air,
  setper_del_ids_air,

  per_del_ids_surfc,
  setper_del_ids_surfc,

  isupdating,

  is_oda_air,
  setis_oda_air,

  is_oda_surface,
  setis_oda_surface,

  //
}) => {
  const accessToken = useSelector((state) => state.authentication.access_token);
  const { saveAsCsv } = useJsonToCsv(); // To Covert json data to .csv
  // for navigate to import file page
  const navigate = useNavigate();

  //  Additional Charges
  const [ot_chg_page, setot_chg_page] = useState(1);
  const [ot_search_txt, setot_search_txt] = useState("");

  const [local_cal_errd, setlocal_cal_errd] = useState(false);
  const [local_cal_errb, setlocal_cal_errb] = useState(false);

  const [rate, setrate] = useState(false);
  const [case_, setcase_] = useState(false);

  const [case_row, setcase_row] = useState([["", ""]]);
  const [case_chrgs_list, setcase_chrgs_list] = useState([
    [1, "Charge 1"],
    [2, "Charge 2"],
    [3, "Charge 3"],
    [4, "Charge 4"],
  ]);
  const [case_chrg_page, setcase_chrg_page] = useState(1);
  const [case_chrg_search_txt, setcase_chrg_search_txt] = useState("");

  // Domestic Rate
  const [origin_city_list_s, setorigin_city_list_s] = useState([]);
  const [origin_city, setorigin_city] = useState("");
  const [origin_city_page, setorigin_city_page] = useState(1);
  const [origin_city_search_item, setorigin_city_search_item] = useState("");

  const [destination_city_list_s, setdestination_city_list_s] = useState([]);
  const [destination_city, setdestination_city] = useState("");
  const [destination_city_page, setdestination_city_page] = useState(1);
  const [destination_city_search_item, setdestination_city_search_item] =
    useState("");

  const [sec_charges_list, setsec_charges_list] = useState([]);
  const [sec_search_txt, setsec_search_txt] = useState("");
  const [sec_search_page, setsec_search_page] = useState(1);

  const [freight_idx, setfreight_idx] = useState("");
  const [warai_idx, setwarai_idx] = useState("");

  // Used for origin and destination city
  const [city_page_no, setcity_page_no] = useState(1);
  const [city_search_itm, setcity_search_itm] = useState("");
  const [city_list, setcity_list] = useState([]);

  //Used for Origin and destination Zone
  const [zone_page_no, setzone_page_no] = useState(1);
  const [zone_search_itm, setzone_search_itm] = useState("");
  const [zone_list, setzone_list] = useState([
    ["East Zone", "East Zone"],
    ["West Zone", "West Zone"],
    ["North Zone", "North Zone"],
    ["South Zone", "South Zone"],
  ]);

  //  % Of Other Charges List
  const [oth_charges_list, setoth_charges_list] = useState([]);

  const [per_charge_categories, setper_charge_categories] = useState([
    "% of client invoice",
    "% of other charges",
  ]);

  const [refresh, setrefresh] = useState(false);
  const [show, setshow] = useState(false);
  const [import_for, setimport_for] = useState("Local");

  //For Domestic

  const [dom_rate_category_list] = useState([
    "City to City",
    "Zone to Zone",
    "Both",
  ]);

  const [dom_rate_type_list, setdom_rate_type_list] = useState([
    "Flat",
    "Minimum",
    "Upto",
  ]);

  //Check Box
  const [is_oda, setis_oda] = useState(false);

  // Local Billing colmn span
  const [cc_rate_call_span_local, setcc_rate_call_span_local] = useState(1);
  const [ncc_rate_call_span_local, setncc_rate_call_span_local] = useState(1);
  const [oda_selected_local, setoda_selected_local] = useState(0);
  const [fillterd_charge_list_local, setfillterd_charge_list_local] = useState(
    []
  );

  // Domestic Billing colmn span
  const [cc_rate_call_span, setcc_rate_call_span] = useState(1);
  const [ncc_rate_call_span, setncc_rate_call_span] = useState(1);
  const [oda_selected, setoda_selected] = useState(0);
  const [fillterd_charge_list, setfillterd_charge_list] = useState([]);

  // Billing Table Import States
  // on change states
  const [excelFile, setExcelFile] = useState(null);
  const [excelFileError, setExcelFileError] = useState(null);

  //map the data list of excel app
  let mtarr = [];
  let mtarr_air_city = [];
  let mtarr_surface_city = [];
  let mtarr_air_zone = [];
  let mtarr_surface_zone = [];

  // FOr Table while import
  const [local_datalisttmp, setlocal_datalisttmp] = useState([]);
  const [datalisttmp, setdatalisttmp] = useState([]);
  const [datalist1tmp, setdatalist1tmp] = useState([]);
  const [excelData, setExcelData] = useState(null);
  const [per_chrgs, setper_chrgs] = useState([]);
  // it will contain array of objects

  // handle File Type
  // const fileType=['application/vnd.ms-excel'];
  const fileType = [
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.xls",
    "text/csv",
  ];

  const [Headers, setHeaders] = useState([]);
  const [cc_headers, setcc_headers] = useState([]);
  const [nc_headers, setnc_headers] = useState([]);

  const [count_s, setcount_s] = useState(null);

  // Export Billing Local Data Function
  const exportBillingData = () => {
    let cc_titles = ["CC_Rate_Per_KG"];
    let nc_titles = ["NCC_Rate_Per_KG"];

    if (import_for === "Local") {
      if (dom_rate_type_local === "Upto") {
        cc_titles.push("CC_Minimum_Box");
        nc_titles.push("NCC_Minimum_Box");
      }
      if (dom_rate_type_local !== "Flat") {
        cc_titles.push("CC_Minimum_Amount");
        nc_titles.push("NCC_Minimum_Amount");
      }
    }

    let per_chrg = fillterd_charge_list_local.map((v) => v[0][1]);
    for (const b of per_chrg) {
      cc_titles.push("CC_" + b);
      nc_titles.push("NCC_" + b);
    }

    let sheet_titles = ["Associate_Charge", ...cc_titles, ...nc_titles];
    let sheet_titles_f = {};
    for (const val of sheet_titles) {
      sheet_titles_f[val] = val;
    }

    let sheet_data = [];
    for (let n = 0; n < local_datalist.length; n++) {
      const ele = local_datalist[n];
      let n_list = {};
      n_list[sheet_titles[0]] = ele[0][0][1];

      for (let j = 0; j < cc_titles.length; j++) {
        n_list[cc_titles[j]] = ele[1][j];
      }
      for (let k = 0; k < nc_titles.length; k++) {
        n_list[nc_titles[k]] = ele[2][k];
      }
      sheet_data.push(n_list);
    }

    saveAsCsv({
      data: sheet_data,
      fields: sheet_titles_f,
      filename: "Local_Billing_Data",
    });
  };

  // Export Billing Air City Data Function
  const exportBillingDataAirCity = () => {
    let cc_titles = ["CC_Rate_Per_KG"];
    let nc_titles = ["NCC_Rate_Per_KG"];

    if (dom_rate_type === "Upto") {
      cc_titles.push("CC_Minimum_Box");
      nc_titles.push("NCC_Minimum_Box");
    }

    if (dom_rate_type !== "Flat") {
      cc_titles.push("CC_Minimum_Amount");
      nc_titles.push("NCC_Minimum_Amount");
    }

    if (is_oda_air) {
      cc_titles.push("CC_ODA");
      nc_titles.push("NCC_ODA");
    }

    if (is_oda_surface) {
      cc_titles.push("CC_ODA");
      nc_titles.push("NCC_ODA");
    }

    let per_chrg = fillterd_charge_list.map((v) => v[0][1]);
    for (const b of per_chrg) {
      cc_titles.push("CC_" + b);
      nc_titles.push("NCC_" + b);
    }

    let sheet_titles = [
      "Origin_City",
      "Destination_City",
      ...cc_titles,
      ...nc_titles,
    ];

    let sheet_titles_f = {};

    for (const val of sheet_titles) {
      sheet_titles_f[val] = val;
    }

    let sheet_data = [];
    for (let n = 0; n < datalist.length; n++) {
      const ele = datalist[n];
      let n_list = {};

      n_list[sheet_titles[0]] = ele[0][0][1];
      n_list[sheet_titles[1]] = ele[0][1][1];

      for (let j = 0; j < cc_titles.length; j++) {
        n_list[cc_titles[j]] = ele[1][j];
      }
      for (let k = 0; k < nc_titles.length; k++) {
        n_list[nc_titles[k]] = ele[2][k];
      }
      sheet_data.push(n_list);
    }

    saveAsCsv({
      data: sheet_data,
      fields: sheet_titles_f,
      filename: "Air_City_Billing_Data",
    });
  };


  // Export Billing Surface City Data Function
  const exportBillingDataSurfaceCity = () => {
    let cc_titles = ["CC_Rate_Per_KG"];
    let nc_titles = ["NCC_Rate_Per_KG"];

    if (dom_rate_type === "Upto") {
      cc_titles.push("CC_Minimum_Box");
      nc_titles.push("NCC_Minimum_Box");
    }

    if (dom_rate_type !== "Flat") {
      cc_titles.push("CC_Minimum_Amount");
      nc_titles.push("NCC_Minimum_Amount");
    }

    if (is_oda_air) {
      cc_titles.push("CC_ODA");
      nc_titles.push("NCC_ODA");
    }

    if (is_oda_surface) {
      cc_titles.push("CC_ODA");
      nc_titles.push("NCC_ODA");
    }

    let per_chrg = fillterd_charge_list.map((v) => v[0][1]);
    for (const b of per_chrg) {
      cc_titles.push("CC_" + b);
      nc_titles.push("NCC_" + b);
    }

    let sheet_titles = [
      "Origin_City",
      "Destination_City",
      ...cc_titles,
      ...nc_titles,
    ];

    let sheet_titles_f = {};

    for (const val of sheet_titles) {
      sheet_titles_f[val] = val;
    }

    let sheet_data = [];
    for (let n = 0; n < datalist.length; n++) {
      const ele = datalist[n];
      let n_list = {};

      n_list[sheet_titles[0]] = ele[0][0][1];
      n_list[sheet_titles[1]] = ele[0][1][1];

      for (let j = 0; j < cc_titles.length; j++) {
        n_list[cc_titles[j]] = ele[1][j];
      }
      for (let k = 0; k < nc_titles.length; k++) {
        n_list[nc_titles[k]] = ele[2][k];
      }
      sheet_data.push(n_list);
    }

    saveAsCsv({
      data: sheet_data,
      fields: sheet_titles_f,
      filename: "Surface_City_Billing_Data",
    });
  };

  // Export Billing Air City Data Function
  const exportBillingDataAirZone = () => {
    let cc_titles = ["CC_Rate_Per_KG"];
    let nc_titles = ["NCC_Rate_Per_KG"];

    if (dom_rate_type === "Upto") {
      cc_titles.push("CC_Minimum_Box");
      nc_titles.push("NCC_Minimum_Box");
    }

    if (dom_rate_type !== "Flat") {
      cc_titles.push("CC_Minimum_Amount");
      nc_titles.push("NCC_Minimum_Amount");
    }

    if (is_oda_air) {
      cc_titles.push("CC_ODA");
      nc_titles.push("NCC_ODA");
    }

    let per_chrg = fillterd_charge_list.map((v) => v[0][1]);
    for (const b of per_chrg) {
      cc_titles.push("CC_" + b);
      nc_titles.push("NCC_" + b);
    }

    let sheet_titles = [
      "Origin_Zone",
      "Destination_Zone",
      ...cc_titles,
      ...nc_titles,
    ];

    let sheet_titles_f = {};

    for (const val of sheet_titles) {
      sheet_titles_f[val] = val;
    }

    let sheet_data = [];
    for (let n = 0; n < datalist1.length; n++) {
      const ele = datalist1[n];
      let n_list = {};
      n_list[sheet_titles[0]] = ele[0][0][1];
      n_list[sheet_titles[1]] = ele[0][1][1];

      for (let j = 0; j < cc_titles.length; j++) {
        n_list[cc_titles[j]] = ele[1][j];
      }
      for (let k = 0; k < nc_titles.length; k++) {
        n_list[nc_titles[k]] = ele[2][k];
      }
      sheet_data.push(n_list);
    }

    saveAsCsv({
      data: sheet_data,
      fields: sheet_titles_f,
      filename: "Air_Zone_Billing_Data",
    });
  };

  const exportBillingDataSurfaceZone = () => {
    let cc_titles = ["CC_Rate_Per_KG"];
    let nc_titles = ["NCC_Rate_Per_KG"];

    if (dom_rate_type === "Upto") {
      cc_titles.push("CC_Minimum_Box");
      nc_titles.push("NCC_Minimum_Box");
    }

    if (dom_rate_type !== "Flat") {
      cc_titles.push("CC_Minimum_Amount");
      nc_titles.push("NCC_Minimum_Amount");
    }

    if (is_oda_surface) {
      cc_titles.push("CC_ODA");
      nc_titles.push("NCC_ODA");
    }

    let per_chrg = fillterd_charge_list.map((v) => v[0][1]);
    for (const b of per_chrg) {
      cc_titles.push("CC_" + b);
      nc_titles.push("NCC_" + b);
    }

    let sheet_titles = [
      "Origin_Zone",
      "Destination_Zone",
      ...cc_titles,
      ...nc_titles,
    ];

    let sheet_titles_f = {};

    for (const val of sheet_titles) {
      sheet_titles_f[val] = val;
    }

    let sheet_data = [];
    for (let n = 0; n < datalist1.length; n++) {
      const ele = datalist1[n];
      let n_list = {};
      n_list[sheet_titles[0]] = ele[0][0][1];
      n_list[sheet_titles[1]] = ele[0][1][1];

      for (let j = 0; j < cc_titles.length; j++) {
        n_list[cc_titles[j]] = ele[1][j];
      }
      for (let k = 0; k < nc_titles.length; k++) {
        n_list[nc_titles[k]] = ele[2][k];
      }
      sheet_data.push(n_list);
    }

    saveAsCsv({
      data: sheet_data,
      fields: sheet_titles_f,
      filename: "Surface_Zone_Billing_Data",
    });
  };

  // To Convert Excel data file into JSON
  const handleSubmit = (e) => {
    // e.preventDefault();

    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: "buffer" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      const header_s = Object.keys(data[0]);

      setExcelData(data);
      setHeaders(header_s);
    } else {
      setExcelData(null);
      setHeaders([]);
    }
  };

  // To Select Excel File
  const handleFile = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setExcelFileError(null);
          setExcelFile(e.target.result);
        };
      } else {
        setExcelFileError("** Please select only excel file types **");
        setExcelFile(null);
      }
    } else {
      console.log("plz select your file");
    }
  };

  // To Load Local Data into Review Table
  const setTable = (all_chg) => {
    let cc_head_list = [];
    let Ncc_head_list = [];

    let count = {};

    let all_ex_tls = excelData.map((v) => v["Associate_Charge"]);

    console.log("all_ex_tls", all_ex_tls);

    all_ex_tls.forEach(function (i) {
      count[i] = (count[i] || 0) + 1;
    });
    console.log("count", count);
    setcount_s(count);

    excelData.forEach((element, idx) => {
      let temp = [[["", ""]], ["", "", ""], ["", "", ""], ""];

      let cc_temp = [];
      let ncc_temp = [];

      // To Separate Cold Chain and Non Cold Chain Rate
      for (const itm in element) {
        if (itm.startsWith("CC")) {
          cc_temp.push(element[`${itm}`]);
        } else if (itm.startsWith("NCC")) {
          ncc_temp.push(element[`${itm}`]);
        }
      }

      let idcx = all_chg
        .map((c) => c[1])
        .indexOf(element[`Associate_Charge`].toUpperCase());

      if (idcx > -1) {
        temp[0][0][0] = all_chg[idcx][0];
      }

      temp[0][0][1] = element[`Associate_Charge`];
      temp[1] = cc_temp;
      temp[2] = ncc_temp;
      mtarr.push(temp);
    });

    setlocal_datalisttmp(mtarr);

    // Setting Column Data
    Headers.slice(1).forEach((cl, idx) => {
      if (cl.startsWith("CC")) {
        cc_head_list.push(cl);
      } else if (cl.startsWith("NCC")) {
        Ncc_head_list.push(cl);
      }
    });

    setcc_headers(cc_head_list);
    setnc_headers(Ncc_head_list);
  };

  // To Load Air City Data into Review Table
  const setTableAirCity = () => {
    let cc_head_list = [];
    let Ncc_head_list = [];

    let count = {};
    let all_ex_tls = excelData.map((v) => [
      v["Origin_City"],
      v["Destination_City"],
    ]);
    all_ex_tls.forEach(function (i) {
      count[i[0] + i[1]] = (count[i[0] + i[1]] || 0) + 1;
    });

    setcount_s(count);
    console.log(
      "ele_c",
      Object.keys(excelData[0]).filter((v) => v.endsWith("ODA"))[0]
    );

    if (Object.keys(excelData[0]).filter((v) => v.endsWith("ODA")).length > 0) {
      setis_oda_air(true);
      setis_oda_surface(true);
    }
    excelData.forEach((ele, idx) => {
      // let ele_c = Object.keys(ele)

      let temp = [
        [
          ["", ""],
          ["", ""],
        ],
        ["", "", "", ""],
        ["", "", "", ""],
      ];

      let cc_temp = [];
      let ncc_temp = [];

      // To Separate Cold Chain and Non Cold Chain Rate
      for (const itm in ele) {
        if (itm.startsWith("CC")) {
          cc_temp.push(ele[`${itm}`]);
        } else if (itm.startsWith("NCC")) {
          ncc_temp.push(ele[`${itm}`]);
        }
      }

      let idcx = city_list
        .map((c) => c[1].toUpperCase())
        .indexOf(ele[`Origin_City`].toUpperCase());

      let idcx2 = city_list
        .map((c) => c[1].toUpperCase())
        .indexOf(ele[`Destination_City`].toUpperCase());

      if (idcx > -1 && idcx2 > -1) {
        temp[0][0][0] = city_list[idcx][0];
        temp[0][1][0] = city_list[idcx2][0];
      }

      temp[0][0][1] = ele[`Origin_City`];
      temp[0][1][1] = ele[`Destination_City`];
      temp[1] = cc_temp;
      temp[2] = ncc_temp;

      mtarr_air_city.push(temp);
    });

    setdatalisttmp(mtarr_air_city);

    //   // Setting Column Data
    Headers.slice(1).forEach((cl, idx) => {
      if (cl.startsWith("CC")) {
        cc_head_list.push(cl);
      } else if (cl.startsWith("NCC")) {
        Ncc_head_list.push(cl);
      }
    });

    setcc_headers(cc_head_list);
    setnc_headers(Ncc_head_list);
  };

  const setTableSurfaceCity = () => {
    let cc_head_list = [];
    let Ncc_head_list = [];

    let count = {};
    let all_ex_tls = excelData.map((v) => [
      v["Origin_City"],
      v["Destination_City"],
    ]);
    all_ex_tls.forEach(function (i) {
      count[i[0] + i[1]] = (count[i[0] + i[1]] || 0) + 1;
    });

    setcount_s(count);
    console.log(
      "ele_c",
      Object.keys(excelData[0]).filter((v) => v.endsWith("ODA"))[0]
    );

    if (Object.keys(excelData[0]).filter((v) => v.endsWith("ODA")).length > 0) {
      // setis_oda_air(true);
      setis_oda_surface(true);
    }
    excelData.forEach((ele, idx) => {
      // let ele_c = Object.keys(ele)

      let temp = [
        [
          ["", ""],
          ["", ""],
        ],
        ["", "", "", ""],
        ["", "", "", ""],
      ];

      let cc_temp = [];
      let ncc_temp = [];

      // To Separate Cold Chain and Non Cold Chain Rate
      for (const itm in ele) {
        if (itm.startsWith("CC")) {
          cc_temp.push(ele[`${itm}`]);
        } else if (itm.startsWith("NCC")) {
          ncc_temp.push(ele[`${itm}`]);
        }
      }

      let idcx = city_list
        .map((c) => c[1].toUpperCase())
        .indexOf(ele[`Origin_City`].toUpperCase());

      let idcx2 = city_list
        .map((c) => c[1].toUpperCase())
        .indexOf(ele[`Destination_City`].toUpperCase());

      if (idcx > -1 && idcx2 > -1) {
        temp[0][0][0] = city_list[idcx][0];
        temp[0][1][0] = city_list[idcx2][0];
      }

      temp[0][0][1] = ele[`Origin_City`];
      temp[0][1][1] = ele[`Destination_City`];
      temp[1] = cc_temp;
      temp[2] = ncc_temp;

      mtarr_surface_city.push(temp);
    });

    setdatalisttmp(mtarr_surface_city);

    //   // Setting Column Data
    Headers.slice(1).forEach((cl, idx) => {
      if (cl.startsWith("CC")) {
        cc_head_list.push(cl);
      } else if (cl.startsWith("NCC")) {
        Ncc_head_list.push(cl);
      }
    });

    setcc_headers(cc_head_list);
    setnc_headers(Ncc_head_list);
  };


  // To Load Air City Data into Review Table
  const setTableAirZone = () => {
    let cc_head_list = [];
    let Ncc_head_list = [];

    let count = {};
    let all_ex_tls = excelData.map((v) => [
      v["Origin_Zone"],
      v["Destination_Zone"],
    ]);
    all_ex_tls.forEach(function (i) {
      count[i[0] + i[1]] = (count[i[0] + i[1]] || 0) + 1;
    });

    setcount_s(count);
    // console.log("ele_c",Object.keys(excelData[0]).filter(v => v.endsWith('ODA'))[0])

    if (Object.keys(excelData[0]).filter((v) => v.endsWith("ODA")).length > 0) {
      setis_oda_air(true);
    }
    excelData.forEach((ele, idx) => {
      let temp = [
        [
          ["", ""],
          ["", ""],
        ],
        ["", "", "", ""],
        ["", "", "", ""],
      ];

      let cc_temp = [];
      let ncc_temp = [];

      // To Separate Cold Chain and Non Cold Chain Rate
      for (const itm in ele) {
        if (itm.startsWith("CC")) {
          cc_temp.push(ele[`${itm}`]);
        } else if (itm.startsWith("NCC")) {
          ncc_temp.push(ele[`${itm}`]);
        }
      }

      let idcx = zone_list
        .map((c) => c[1].toUpperCase())
        .indexOf(ele[`Origin_Zone`].toUpperCase());

      let idcx2 = zone_list
        .map((c) => c[1].toUpperCase())
        .indexOf(ele[`Destination_Zone`].toUpperCase());

      if (idcx > -1 && idcx2 > -1) {
        temp[0][0][0] = zone_list[idcx][0];
        temp[0][1][0] = zone_list[idcx2][0];
      }

      temp[0][0][1] = ele[`Origin_Zone`];
      temp[0][1][1] = ele[`Destination_Zone`];
      temp[1] = cc_temp;
      temp[2] = ncc_temp;

      mtarr_air_zone.push(temp);
    });

    console.log("mtarr_air_zone", mtarr_air_zone);
    setdatalist1tmp(mtarr_air_zone);

    //   // Setting Column Data
    Headers.slice(1).forEach((cl, idx) => {
      if (cl.startsWith("CC")) {
        cc_head_list.push(cl);
      } else if (cl.startsWith("NCC")) {
        Ncc_head_list.push(cl);
      }
    });

    setcc_headers(cc_head_list);
    setnc_headers(Ncc_head_list);
  };

  const setTableSurfaceZone = () => {
    let cc_head_list = [];
    let Ncc_head_list = [];

    let count = {};
    let all_ex_tls = excelData.map((v) => [
      v["Origin_Zone"],
      v["Destination_Zone"],
    ]);
    all_ex_tls.forEach(function (i) {
      count[i[0] + i[1]] = (count[i[0] + i[1]] || 0) + 1;
    });

    setcount_s(count);
    // console.log("ele_c",Object.keys(excelData[0]).filter(v => v.endsWith('ODA'))[0])

    if (Object.keys(excelData[0]).filter((v) => v.endsWith("ODA")).length > 0) {
      setis_oda_surface(true);
    }
    excelData.forEach((ele, idx) => {
      let temp = [
        [
          ["", ""],
          ["", ""],
        ],
        ["", "", "", ""],
        ["", "", "", ""],
      ];

      let cc_temp = [];
      let ncc_temp = [];

      // To Separate Cold Chain and Non Cold Chain Rate
      for (const itm in ele) {
        if (itm.startsWith("CC")) {
          cc_temp.push(ele[`${itm}`]);
        } else if (itm.startsWith("NCC")) {
          ncc_temp.push(ele[`${itm}`]);
        }
      }

      let idcx = zone_list
        .map((c) => c[1].toUpperCase())
        .indexOf(ele[`Origin_Zone`].toUpperCase());

      let idcx2 = zone_list
        .map((c) => c[1].toUpperCase())
        .indexOf(ele[`Destination_Zone`].toUpperCase());

      if (idcx > -1 && idcx2 > -1) {
        temp[0][0][0] = zone_list[idcx][0];
        temp[0][1][0] = zone_list[idcx2][0];
      }

      temp[0][0][1] = ele[`Origin_Zone`];
      temp[0][1][1] = ele[`Destination_Zone`];
      temp[1] = cc_temp;
      temp[2] = ncc_temp;

      mtarr_surface_zone.push(temp);
    });

    console.log("mtarr_surface_zone", mtarr_surface_zone);
    setdatalist1tmp(mtarr_surface_zone);

    //   // Setting Column Data
    Headers.slice(1).forEach((cl, idx) => {
      if (cl.startsWith("CC")) {
        cc_head_list.push(cl);
      } else if (cl.startsWith("NCC")) {
        Ncc_head_list.push(cl);
      }
    });

    setcc_headers(cc_head_list);
    setnc_headers(Ncc_head_list);
  };

  // Set Import Data to Billing Table
  const send_list_data = () => {
    let filter_chrg = local_datalisttmp.filter(
      (g) => g[0][0][0] !== "" && count_s[g[0][0][1]] === 1
    );

    let duplicate_chrg = local_datalisttmp.filter(
      (g) => g[0][0][0] !== "" && count_s[g[0][0][1]] > 1
    );

    if (duplicate_chrg.length > 1) {
      alert(
        "Please Remove Duplicate Entries in Excel Sheet, Entries with Bugs will  Remove Automatically"
      );
    } else {
      let c_type = "Flat";
      if (local_datalisttmp[0][1][2] === "") {
        c_type = "Flat";
      } else if (local_datalisttmp[0][1][1] === "") {
        c_type = "Minimum";
      } else {
        c_type = "Upto";
      }

      let per_charge_names_list = per_chrgs.map((s) => s[1]);

      if (local_datalisttmp[0][1].length > 3) {
        setis_per_charge(true);
        let cc_per = local_datalisttmp.map((l) => l[1].slice(3));
        let nc_per = local_datalisttmp.map((l) => l[2].slice(3));

        // To Separate Cold Chain and Noncoldchain Percentage Charge
        let cc_headers = Headers.filter((h) => h.startsWith("CC_"))
          .slice(3)
          .map((v) => v.slice(3));
        let nc_headers = Headers.filter((h) => h.startsWith("NCC_"))
          .slice(3)
          .map((v) => v.slice(4));

        let p_list = [];
        for (let y = 0; y < cc_per.length; y++) {
          if (per_charge_names_list.indexOf(cc_headers[y]) > -1) {
            // To Check Percentage Charge Available in Database or Not
            let p_id =
              per_chrgs[per_charge_names_list.indexOf(cc_headers[y])][0];
            let p_name =
              per_chrgs[per_charge_names_list.indexOf(cc_headers[y])][1];
            let p_cat = "% of other charges";
            let p_val = {};
            let pent = [[p_id, p_name], p_cat, p_val];
            p_list.push(pent);
          }
        }

        let tmp = per_charge_list.filter((ch) => ch[0][0] !== "");
        setper_charge_list([...tmp, ...p_list]);
      }
      setdom_rate_type_local(c_type);
      setlocal_datalist(filter_chrg);
    }
  };

  const send_list_data_air_city = () => {
    let filter_chrg = datalisttmp.filter(
      (g) =>
        g[0][0][0] !== "" &&
        g[0][1][0] !== "" &&
        count_s[g[0][0][1] + g[0][1][1]] === 1
    );

    // console.log("filter_chrg",filter_chrg)

    let duplicate_chrg = datalisttmp.filter(
      (g) =>
        g[0][0][0] !== "" &&
        g[0][1][0] !== "" &&
        count_s[g[0][0][1] + g[0][1][1]] > 1
    );

    if (duplicate_chrg.length > 1) {
      alert(
        "Please Remove Duplicate Entries in Excel Sheet, Entries with Bugs will  Remove Automatically"
      );
    } else {
      let c_type = "Flat";
      if (datalisttmp[0][1][2] === "") {
        c_type = "Flat";
      } else if (datalisttmp[0][1][1] === "") {
        c_type = "Minimum";
      } else {
        c_type = "Upto";
      }

      let per_charge_names_list = per_chrgs.map((s) => s[1]);

      if (datalisttmp[0][1].length > 4) {
        setis_per_charge_surfc(true);
        setis_per_charge_air(true);
        let cc_per = datalisttmp.map((l) => l[1].slice(4));
        let nc_per = datalisttmp.map((l) => l[2].slice(4));

        console.log("cc_per", cc_per);
        console.log("nc_per", nc_per);

        // To Separate Cold Chain and Noncoldchain Percentage Charge
        let cc_headers = Headers.filter((h) => h.startsWith("CC_"))
          .slice(3)
          .map((v) => v.slice(3));

        let p_list = [];

        for (let y = 0; y < cc_headers.length; y++) {
          if (per_charge_names_list.indexOf(cc_headers[y].toUpperCase()) > -1) {
            // To Check Percentage Charge Available in Database or Not
            let p_data = per_chrgs.find(
              (v) => v[1] === cc_headers[y].toUpperCase()
            );
            let p_id = p_data[0];
            let p_name = p_data[1];
            let p_cat = "% of other charges";
            let p_val = {};
            let pent = [[p_id, p_name], p_cat, p_val];
            p_list.push(pent);
          }
        }
        console.log("p_list", p_list);

        let tmp = per_charge_list.filter((ch) => ch[0][0] !== "");
        setper_charge_list_air([...tmp, ...p_list]);
      }
      console.log("filter_chrg", filter_chrg);
      setdom_rate_type(c_type);
      setdatalist(filter_chrg);
    }
  };

  const send_list_data_surface_city = () => {
    let filter_chrg = datalisttmp.filter(
      (g) =>
        g[0][0][0] !== "" &&
        g[0][1][0] !== "" &&
        count_s[g[0][0][1] + g[0][1][1]] === 1
    );

    // console.log("filter_chrg",filter_chrg)

    let duplicate_chrg = datalisttmp.filter(
      (g) =>
        g[0][0][0] !== "" &&
        g[0][1][0] !== "" &&
        count_s[g[0][0][1] + g[0][1][1]] > 1
    );

    if (duplicate_chrg.length > 1) {
      alert(
        "Please Remove Duplicate Entries in Excel Sheet, Entries with Bugs will  Remove Automatically"
      );
    } else {
      let c_type = "Flat";
      if (datalisttmp[0][1][2] === "") {
        c_type = "Flat";
      } else if (datalisttmp[0][1][1] === "") {
        c_type = "Minimum";
      } else {
        c_type = "Upto";
      }

      let per_charge_names_list = per_chrgs.map((s) => s[1]);

      if (datalisttmp[0][1].length > 4) {
        setis_per_charge_surfc(true);
        setis_per_charge_air(true);
        let cc_per = datalisttmp.map((l) => l[1].slice(4));
        let nc_per = datalisttmp.map((l) => l[2].slice(4));

        console.log("cc_per", cc_per);
        console.log("nc_per", nc_per);

        // To Separate Cold Chain and Noncoldchain Percentage Charge
        let cc_headers = Headers.filter((h) => h.startsWith("CC_"))
          .slice(3)
          .map((v) => v.slice(3));

        let p_list = [];

        for (let y = 0; y < cc_headers.length; y++) {
          if (per_charge_names_list.indexOf(cc_headers[y].toUpperCase()) > -1) {
            // To Check Percentage Charge Available in Database or Not
            let p_data = per_chrgs.find(
              (v) => v[1] === cc_headers[y].toUpperCase()
            );
            let p_id = p_data[0];
            let p_name = p_data[1];
            let p_cat = "% of other charges";
            let p_val = {};
            let pent = [[p_id, p_name], p_cat, p_val];
            p_list.push(pent);
          }
        }
        console.log("p_list", p_list);

        let tmp = per_charge_list.filter((ch) => ch[0][0] !== "");
        setper_charge_list_surface([...tmp, ...p_list]);
      }
      console.log("filter_chrg", filter_chrg);
      setdom_rate_type(c_type);
      setdatalist(filter_chrg);
    }
  };

  const send_list_data_air_zone = () => {
    let filter_chrg = datalist1tmp.filter(
      (g) =>
        g[0][0][0] !== "" &&
        g[0][1][0] !== "" &&
        count_s[g[0][0][1] + g[0][1][1]] === 1
    );

    // console.log("filter_chrg",filter_chrg)

    let duplicate_chrg = datalist1tmp.filter(
      (g) =>
        g[0][0][0] !== "" &&
        g[0][1][0] !== "" &&
        count_s[g[0][0][1] + g[0][1][1]] > 1
    );

    if (duplicate_chrg.length > 1) {
      alert(
        "Please Remove Duplicate Entries in Excel Sheet, Entries with Bugs will  Remove Automatically"
      );
    } else {
      let c_type = "Flat";
      if (datalist1tmp[0][1][2] === "") {
        c_type = "Flat";
      } else if (datalist1tmp[0][1][1] === "") {
        c_type = "Minimum";
      } else {
        c_type = "Upto";
      }

      let per_charge_names_list = per_chrgs.map((s) => s[1]);

      if (datalist1tmp[0][1].length > 4) {
        setis_per_charge_air(true);
        setis_per_charge_surfc(true);
        // To Separate Cold Chain and Noncoldchain Percentage Charge
        let cc_headers = Headers.filter((h) => h.startsWith("CC_"))
          .slice(3)
          .map((v) => v.slice(3));

        let p_list = [];

        for (let y = 0; y < cc_headers.length; y++) {
          if (per_charge_names_list.indexOf(cc_headers[y].toUpperCase()) > -1) {
            // To Check Percentage Charge Available in Database or Not
            let p_data = per_chrgs.find(
              (v) => v[1] === cc_headers[y].toUpperCase()
            );
            let p_id = p_data[0];
            let p_name = p_data[1];
            let p_cat = "% of other charges";
            let p_val = {};
            let pent = [[p_id, p_name], p_cat, p_val];
            p_list.push(pent);
          }
        }

        let tmp = per_charge_list.filter((ch) => ch[0][0] !== "");
        setper_charge_list_air([...tmp, ...p_list]);
      }
      console.log("filter_chrg", filter_chrg);
      setdom_rate_type(c_type);
      setdatalist1(filter_chrg);
    }
  };

  const send_list_data_surface_zone = () => {
    let filter_chrg = datalist1tmp.filter(
      (g) =>
        g[0][0][0] !== "" &&
        g[0][1][0] !== "" &&
        count_s[g[0][0][1] + g[0][1][1]] === 1
    );

    // console.log("filter_chrg",filter_chrg)

    let duplicate_chrg = datalist1tmp.filter(
      (g) =>
        g[0][0][0] !== "" &&
        g[0][1][0] !== "" &&
        count_s[g[0][0][1] + g[0][1][1]] > 1
    );

    if (duplicate_chrg.length > 1) {
      alert(
        "Please Remove Duplicate Entries in Excel Sheet, Entries with Bugs will  Remove Automatically"
      );
    } else {
      let c_type = "Flat";
      if (datalist1tmp[0][1][2] === "") {
        c_type = "Flat";
      } else if (datalist1tmp[0][1][1] === "") {
        c_type = "Minimum";
      } else {
        c_type = "Upto";
      }

      let per_charge_names_list = per_chrgs.map((s) => s[1]);

      if (datalist1tmp[0][1].length > 4) {
        setis_per_charge_air(true);
        setis_per_charge_surfc(true);
        // To Separate Cold Chain and Noncoldchain Percentage Charge
        let cc_headers = Headers.filter((h) => h.startsWith("CC_"))
          .slice(3)
          .map((v) => v.slice(3));

        let p_list = [];

        for (let y = 0; y < cc_headers.length; y++) {
          if (per_charge_names_list.indexOf(cc_headers[y].toUpperCase()) > -1) {
            // To Check Percentage Charge Available in Database or Not
            let p_data = per_chrgs.find(
              (v) => v[1] === cc_headers[y].toUpperCase()
            );
            let p_id = p_data[0];
            let p_name = p_data[1];
            let p_cat = "% of other charges";
            let p_val = {};
            let pent = [[p_id, p_name], p_cat, p_val];
            p_list.push(pent);
          }
        }

        let tmp = per_charge_list.filter((ch) => ch[0][0] !== "");
        setper_charge_list_surface([...tmp, ...p_list]);
      }
      console.log("filter_chrg", filter_chrg);
      setdom_rate_type(c_type);
      setdatalist1(filter_chrg);
    }
  };


  const getAssoCharges = () => {
    axios
      .get(
        ServerAddress +
        `master/all_charges/?search=${""}&p=${1}&records=${10}&charge_category=${""}&data=all`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((resp) => {
        let per_chg = resp.data.results
          .filter((g) => g.charge_category === "PERCENTAGE CHARGE")
          .map((v) => [v.id, v.charge_name]);
        let asso_chrg = resp.data.results
          .filter((g) => g.charge_category === "ASSOCIATED CHARGE")
          .map((v) => [v.id, v.charge_name]);

        setper_chrgs(per_chg);
        if (import_for === "Local") {
          setTable(asso_chrg);
        } else if (import_for === "Air_City") {
          setTableAirCity();
        } else if (import_for === "Air_Zone") {
          setTableAirZone();
        }
      })
      .catch((e) => alert(`Err occur while getting asso chrgs : ${e}`));
  };

  // Local Percentage Charge API Function
  const getSecOthCharges = () => {
    let temp_lis = [...oth_charges_list];
    axios
      .get(
        ServerAddress +
        `master/all_charges/?search=${""}&p=${ot_chg_page}&records=${10}&charge_category=${[
          "PERCENTAGE CHARGE",
        ]}&charge_name_search=${ot_search_txt}&data=all`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((resp) => {
        let data = resp.data.results;
        for (let index = 0; index < data.length; index++) {
          const chrg = data[index];
          temp_lis.push([chrg.id, toTitleCase(chrg.charge_name)]);
        }
        temp_lis = [...new Set(temp_lis.map((v) => `${v}`))].map((v) =>
          v.split(",")
        );
        setoth_charges_list(temp_lis);
      })
      .catch((err) => {
        alert(`Error Occur while getting secondary charges , ${err}`);
      });
  };

  // Local Associated Charge API Function
  const getAssociatedCharges = () => {
    let temp_lis = [];
    axios
      .get(
        ServerAddress +
        `master/all_charges/?search=${""}&p=${sec_search_page}&records=${10}&charge_category=${[
          "ASSOCIATED CHARGE",
        ]}&charge_name_search=${sec_search_txt}&data=all`,

        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((resp) => {
        let data = resp.data.results;
        for (let index = 0; index < data.length; index++) {
          const chrg = data[index];
          temp_lis.push([chrg.id, toTitleCase(chrg.charge_name)]);
        }
        setsec_charges_list(temp_lis);

        try {
          let fght_idx = temp_lis.find((val) => val[1] === "Freight")[0];
          setfreight_idx(fght_idx);
          let wrai_idx = temp_lis.find((val) => val[1] === "Warai")[0];
          setwarai_idx(wrai_idx);
        } catch { }
      })
      .catch((err) => {
        alert(`Error Occur while getting secondary charges , ${err}`);
      });
  };

  // Air / Domestic Cities API Function
  const getOriginCities = (place_id, filter_by) => {
    let cities_list = [];
    axios
      .get(
        ServerAddress +
        `master/all_cities/?search=${""}&p=${origin_city_page}&records=${10}&city_search=${origin_city_search_item}` +
        "&place_id=" +
        place_id +
        "&filter_by=" +
        filter_by,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((resp) => {
        if (resp.data.results.length > 0) {
          if (origin_city_page === 1) {
            cities_list = resp.data.results.map((v) => [
              v.id,
              toTitleCase(v.city),
            ]);
          } else {
            cities_list = [
              ...origin_city_list_s,
              ...resp.data.results.map((v) => [v.id, toTitleCase(v.city)]),
            ];
          }
          setcity_list(cities_list);
          setorigin_city("");
          setorigin_city_list_s(cities_list);
        } else {
          setorigin_city_list_s([]);
        }
      })
      .catch((err) => {
        alert(`Error Occur in Get Origin City, ${err}`);
      });
  };

  const getDestinationCities = (place_id, filter_by) => {
    let cities_list = [];
    axios
      .get(
        ServerAddress +
        `master/all_cities/?search=${""}&p=${destination_city_page}&records=${10}&city_search=${destination_city_search_item}` +
        "&place_id=" +
        place_id +
        "&filter_by=" +
        filter_by,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((resp) => {
        if (resp.data.results.length > 0) {
          if (destination_city_page === 1) {
            cities_list = resp.data.results.map((v) => [
              v.id,
              toTitleCase(v.city),
            ]);
          } else {
            cities_list = [
              ...destination_city_list_s,
              ...resp.data.results.map((v) => [v.id, toTitleCase(v.city)]),
            ];
          }
          setdestination_city("");
          setdestination_city_list_s(cities_list);
        } else {
          setdestination_city_list_s([]);
        }
      })
      .catch((err) => {
        alert(`Error Occur in Get destination City, ${err}`);
      });
  };

  // getOriginCities Function Call
  useLayoutEffect(() => {
    getOriginCities("all", "all");
  }, [origin_city_page, origin_city_search_item]);

  // getDestinationCities Function Call
  useLayoutEffect(() => {
    getDestinationCities("all", "all");
  }, [destination_city_page, destination_city_search_item]);

  const toggle = (tab) => {
    if (activeTab !== tab) {
      setactiveTab(tab);
    }
  };

  const toggleAir = (tab) => {
    if (activeAirTab !== tab) {
      setactiveAirTab(tab);
    }
  };

  const toggleSurface = (tab) => {
    if (activeSurfaceTab !== tab) {
      setactiveSurfaceTab(tab);
    }
  }

  useLayoutEffect(() => {
    getSecOthCharges();
  }, [ot_chg_page, ot_search_txt]);

  // Handling Local Call Span
  useEffect(() => {
    if (dom_rate_type_local === "Flat") {
      setcc_rate_call_span_local(1);
      setncc_rate_call_span_local(1);
    } else if (dom_rate_type_local === "Minimum") {
      setcc_rate_call_span_local(2);
      setncc_rate_call_span_local(2);
    } else if (dom_rate_type_local === "Upto") {
      setcc_rate_call_span_local(3);
      setncc_rate_call_span_local(3);
    }
    if (is_oda) {
      setoda_selected_local(1);
    } else setoda_selected_local(0);
  }, [is_oda, dom_rate_type_local]);

  //Handle Domestic Call Span
  useEffect(() => {
    if (dom_rate_type === "Flat") {
      setcc_rate_call_span(1);
      setncc_rate_call_span(1);
    } else if (dom_rate_type === "Minimum") {
      setcc_rate_call_span(2);
      setncc_rate_call_span(2);
    } else if (dom_rate_type === "Upto") {
      setcc_rate_call_span(3);
      setncc_rate_call_span(3);
    }
    if (is_oda_air) {
      setoda_selected(1);
    } else setoda_selected(0);
  }, [is_oda_air, dom_rate_type]);

  useEffect(() => {
    if (dom_rate_type === "Flat") {
      setcc_rate_call_span(1);
      setncc_rate_call_span(1);
    } else if (dom_rate_type === "Minimum") {
      setcc_rate_call_span(2);
      setncc_rate_call_span(2);
    } else if (dom_rate_type === "Upto") {
      setcc_rate_call_span(3);
      setncc_rate_call_span(3);
    }

    if (is_oda_surface) {
      setoda_selected(1);
    } else setoda_selected(0);
  }, [is_oda_surface, dom_rate_type]);


  // This used to filter other charges categorys
  // local percentage charges
  useEffect(() => {
    if (per_charge_list) {
      let per_otch_tmp = per_charge_list.filter(
        (v) => v[1] === "% of other charges"
      );
      setfillterd_charge_list_local(per_otch_tmp);
    }
  }, [per_charge_list, refresh]);

  // domestic percentage charges
  useEffect(() => {
    if (per_charge_list_air) {
      let per_otch_tmp_air = per_charge_list_air.filter(
        (v) => v[1] === "% of other charges"
      );
      setfillterd_charge_list(per_otch_tmp_air);
    }
  }, [per_charge_list_air, refresh]);

  // Local Row Control Functions
  // Function to add New row in Local rate table
  const add_new_row_asso = () => {
    let new_dlist = [[["", ""]], ["", "", ""], ["", "", ""]];
    setlocal_datalist([...local_datalist, new_dlist]);
    setrefresh(!refresh);
  };

  const delete_row_asso = (idx) => {
    let list_data = [...local_datalist];
    if (local_datalist[idx].length > 3) {
      setasso_del_ids([...asso_del_ids, local_datalist[idx][3]]);
    }
    if (idx > -1) {
      list_data.splice(idx, 1);
    }
    setlocal_datalist(list_data);
  };

  // Domestic Row Control Functions
  // Function to add New row in Domestic City to City rate table
  const add_new_row_city = () => {
    let new_dlist = [
      [
        ["", ""],
        ["", ""],
      ],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
    ];
    setdatalist([...datalist, new_dlist]);
    setrefresh(!refresh);
  };

  const delete_row_city = (idx) => {
    let list_data = [...datalist];
    if (datalist[idx].length > 3) {
      setdom_rt_del_ids_air([...dom_rt_del_ids_air, datalist[idx][3]]);
    }
    if (idx > -1) {
      list_data.splice(idx, 1);
    }
    setdatalist(list_data);
  };

  // Function to add New row in Domestic Zone to Zone rate table
  const add_new_row_zone = () => {
    let new_dlist = [
      [
        ["", ""],
        ["", ""],
      ],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
    ];
    setdatalist1([...datalist1, new_dlist]);
    setrefresh(!refresh);
  };

  const delete_row_zone = (idx) => {
    let list_data1 = [...datalist1];

    if (datalist1[idx].length > 3) {
      setdom_rt_del_ids_zone_air([
        ...dom_rt_del_ids_zone_air,
        datalist1[idx][3],
      ]);
    }
    if (idx > -1) {
      list_data1.splice(idx, 1);
    }
    setdatalist1(list_data1);
  };

  useLayoutEffect(() => {
    getAssociatedCharges();
  }, [sec_search_txt, sec_search_page]);

  useLayoutEffect(() => {
    if (excelData !== null) {
      getAssoCharges();
    }
  }, [excelData]);

  return (
    <div>
      <Col lg={12}>
        <CardBody>
          {/* Tabs */}
          <Nav tabs>
            {is_local && (
              <NavItem>
                <NavLink
                  style={{
                    cursor: "pointer",
                    fontSize: "16px",
                    color: local_cal_errd || local_cal_errb ? "red" : "",
                  }}
                  className={classnames({
                    active: activeTab === "1",
                  })}
                  onClick={() => {
                    toggle("1");
                  }}
                >
                  Local
                </NavLink>
              </NavItem>
            )}
            {is_air && (
              <NavItem>
                <NavLink
                  style={{ cursor: "pointer", fontSize: "16px" }}
                  className={classnames({
                    active: activeTab === "2",
                  })}
                  onClick={() => {
                    toggle("2");
                  }}
                >
                  Air
                </NavLink>
              </NavItem>
            )}

            {is_surface && (
              <NavItem>
                <NavLink
                  style={{ cursor: "pointer", fontSize: "16px" }}
                  className={classnames({
                    active: activeTab === "3",
                  })}
                  onClick={() => {
                    toggle("3");
                  }}
                >
                  Surface
                </NavLink>
              </NavItem>
            )}

            {is_cargo && (
              <NavItem>
                <NavLink
                  style={{ cursor: "pointer", fontSize: "16px" }}
                  className={classnames({
                    active: activeTab === "4",
                  })}
                  onClick={() => {
                    toggle("4");
                  }}
                >
                  Cargo
                </NavLink>
              </NavItem>
            )}

            {is_train && (
              <NavItem>
                <NavLink
                  style={{ cursor: "pointer", fontSize: "16px" }}
                  className={classnames({
                    active: activeTab === "5",
                  })}
                  onClick={() => {
                    toggle("5");
                  }}
                >
                  Train
                </NavLink>
              </NavItem>
            )}

            {is_courier && (
              <NavItem>
                <NavLink
                  style={{ cursor: "pointer", fontSize: "16px" }}
                  className={classnames({
                    active: activeTab === "6",
                  })}
                  onClick={() => {
                    toggle("6");
                  }}
                >
                  Courier
                </NavLink>
              </NavItem>
            )}
          </Nav>

          {/* Tab Content */}
          <TabContent activeTab={activeTab} className="p-3 text-muted">
            {is_local && (
              <TabPane tabId="1">
                {/* Charge Type Checkboxes */}
                {/* Percentage Charge Rates */}
                <>
                  <Row className="mb-3 mt-3">
                    <Col lg={3} md={4} sm={8}>
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <div onClick={() => setis_per_charge(!is_per_charge)}>
                          {is_per_charge ? (
                            <FiCheckSquare size={20} />
                          ) : (
                            <FiSquare size={20} />
                          )}
                        </div>
                        <Label className="header-child">
                          &nbsp; % of Charge{" "}
                        </Label>
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <Col lg={3} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">Rate Type</Label>
                        <NSearchInput
                          data_list={dom_rate_type_list}
                          data_item_s={dom_rate_type_local}
                          set_data_item_s={setdom_rate_type_local}
                          show_search={false}
                          error_message={"Select ODA Rate"}
                        />
                      </div>
                    </Col>
                  </Row>
                </>

                {/* Percentage Rates Row */}
                {is_per_charge && (
                  <div>
                    <Label style={{ fontSize: 20 }}>% Of Charges</Label>
                    <Row>
                      <Col md={4}>
                        <Label className="header-child">Charge Name</Label>
                      </Col>
                      <Col md={4}>
                        <Label className="header-child">Category</Label>
                      </Col>
                      <Col md={2}>
                        <Label className="header-child">Rate %</Label>
                      </Col>
                      <Col md={2}>
                        <Label className="header-child">Delete</Label>
                      </Col>
                    </Row>

                    {per_charge_list.map((per_chrg, idx) => {
                      return (
                        <Row key={idx}>
                          <Col md={4}>
                            <MultiRowSearchInput
                              data_list={oth_charges_list}
                              setdata_list={setoth_charges_list}
                              data_item_s={per_charge_list[idx][0]}
                              page={ot_chg_page}
                              setpage={setot_chg_page}
                              setsearch_txt={setot_search_txt}
                              error_message={"Please Select Any Option"}
                              refresh={refresh}
                              setrefresh={setrefresh}
                              idx={idx}
                            />
                          </Col>

                          <Col md={4}>
                            <Input
                              key={idx}
                              value={per_chrg[1]}
                              type="select"
                              onChange={(event) => {
                                setrefresh(!refresh);

                                per_chrg[1] = event.target.value;
                              }}
                              style={{ marginBottom: "15px" }}
                              className="form-control-md"
                              id="input"
                            // disabled={item[6]}
                            >
                              <option value="" hidden></option>
                              {per_charge_categories.map((itms, index) => {
                                return (
                                  <option
                                    className="option"
                                    value={itms}
                                    key={index}
                                  // hidden={use_sec_ch_lst.some(v=> v[0] == itms[0])}
                                  >
                                    {itms}
                                  </option>
                                );
                              })}
                            </Input>
                          </Col>

                          <Col md={2}>
                            {per_chrg[1] === "% of client invoice" ? (
                              <Input
                                key={idx}
                                step={0.01}
                                className="form-control-md"
                                id="input"
                                placeholder="Enter Rate %"
                                type="number"
                                value={per_chrg[2]}
                                onChange={(val) => {
                                  per_chrg[2] = val.target.value;
                                  setrefresh(!refresh);
                                }}
                                disabled={false}
                              />
                            ) : (
                              <div style={{ paddingTop: 8, paddingBottom: 8 }}>
                                -
                              </div>
                            )}
                          </Col>

                          <Col md={2}>
                            {per_charge_list.length > 1 ? (
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  height: 34,
                                  marginBottom: 18,
                                }}
                              >
                                <IconContext.Provider
                                  value={{ color: "red", size: "20px" }}
                                >
                                  <div
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                      if (
                                        window.confirm(
                                          "Do You Want To Delete this row ? "
                                        ) === true
                                      ) {
                                        let temp = [...per_charge_list];
                                        temp.splice(idx, 1);
                                        if (per_charge_list[idx].length > 3) {
                                          setper_del_ids([
                                            ...per_del_ids,
                                            per_charge_list[idx][3],
                                          ]);
                                        }
                                        setper_charge_list(temp);
                                      } else {
                                      }
                                      setrefresh(!refresh);
                                    }}
                                  >
                                    <MdDelete />
                                  </div>
                                </IconContext.Provider>
                              </div>
                            ) : (
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  height: 34,
                                  marginBottom: 18,
                                }}
                              >
                                {"-"}
                              </div>
                            )}
                          </Col>
                        </Row>
                      );
                    })}

                    {/* % Charge Add Btn */}
                    <div>
                      <span
                        className="link-text"
                        onClick={() => {
                          let per_tmp_lst = [["", ""], "", ""];
                          setper_charge_list([...per_charge_list, per_tmp_lst]);
                          setrefresh(!refresh);
                        }}
                        style={{
                          fontSize: "14px",
                          color: "purple",
                          cursor: "pointer",
                        }}
                      >
                        <IconContext.Provider
                          value={{
                            className: "link-text",
                          }}
                        >
                          <MdAdd />
                        </IconContext.Provider>
                        Add another % of Charge
                      </span>
                    </div>
                  </div>
                )}

                {/* Local Table */}
                <div
                  style={{
                    marginTop: 50,
                    overflowX: "scroll",
                    zIndex: "1",
                  }}
                >
                  <table className="table-grid" style={{ zIndex: "0" }}>
                    <thead>
                      <tr>
                        <th
                          style={{
                            width: "2rem",
                            textAlign: "center",
                            paddingLeft: "2px",
                            paddingRight: "2px",
                          }}
                          rowSpan={2}
                        >
                          SL
                        </th>
                        <th
                          style={{
                            width: "8rem",
                            textAlign: "center",
                            paddingLeft: "6px",
                            paddingRight: "4px",
                          }}
                          rowSpan={2}
                        >
                          Associated Charges
                        </th>
                        <th
                          style={{
                            width: "25rem",
                            textAlign: "center",
                            paddingLeft: "2px",
                            paddingRight: "2px",
                          }}
                          colSpan={
                            cc_rate_call_span_local +
                            fillterd_charge_list_local.length +
                            oda_selected_local
                          }
                        >
                          Cold Chain
                        </th>
                        <th
                          style={{
                            width: "25rem",
                            textAlign: "center",
                            paddingLeft: "2px",
                            paddingRight: "2px",
                          }}
                          colSpan={
                            ncc_rate_call_span_local +
                            fillterd_charge_list_local.length +
                            oda_selected_local
                          }
                        >
                          Non Cold Chain
                        </th>
                        <th
                          style={{
                            width: "2rem",
                            textAlign: "center",
                            paddingLeft: "6px",
                            paddingRight: "4px",
                          }}
                          rowSpan={2}
                        >
                          Delete
                        </th>
                      </tr>

                      <tr>
                        <th
                          style={{
                            width: "2rem",
                            textAlign: "center",
                            paddingLeft: "2px",
                            paddingRight: "2px",
                          }}
                        >
                          Rate Per Kg
                        </th>

                        {dom_rate_type_local === "Upto" && (
                          <th
                            style={{
                              width: "2rem",
                              textAlign: "center",
                              paddingLeft: "2px",
                              paddingRight: "2px",
                            }}
                          >
                            Minimum Box
                          </th>
                        )}

                        {dom_rate_type_local !== "Flat" && (
                          <th
                            style={{
                              width: "2rem",
                              textAlign: "center",
                              paddingLeft: "2px",
                              paddingRight: "2px",
                            }}
                          >
                            Minimum Amount
                          </th>
                        )}

                        {/* Percentage Charges Rates */}
                        {is_per_charge && (
                          <>
                            {fillterd_charge_list_local.length > 0 && (
                              <>
                                {fillterd_charge_list_local.map(
                                  (itam, indx) => {
                                    return (
                                      <th
                                        style={{
                                          width: "2rem",
                                          textAlign: "center",
                                          paddingLeft: "2px",
                                          paddingRight: "2px",
                                        }}
                                      >
                                        {itam[0][1]}(in %)
                                      </th>
                                    );
                                  }
                                )}
                              </>
                            )}
                          </>
                        )}

                        <th
                          style={{
                            width: "2rem",
                            textAlign: "center",
                            paddingLeft: "2px",
                            paddingRight: "2px",
                          }}
                        >
                          Rate Per Kg
                        </th>

                        {dom_rate_type_local === "Upto" && (
                          <th
                            style={{
                              width: "2rem",
                              textAlign: "center",
                              paddingLeft: "2px",
                              paddingRight: "2px",
                            }}
                          >
                            Minimum Box
                          </th>
                        )}

                        {dom_rate_type_local !== "Flat" && (
                          <th
                            style={{
                              width: "2rem",
                              textAlign: "center",
                              paddingLeft: "2px",
                              paddingRight: "2px",
                            }}
                          >
                            Minimum Amount
                          </th>
                        )}

                        {/* % of Other Charges Colums */}
                        {is_per_charge && (
                          <>
                            {fillterd_charge_list_local.length > 0 && (
                              <>
                                {fillterd_charge_list_local.map(
                                  (itam, indx) => {
                                    return (
                                      <th
                                        style={{
                                          width: "2rem",
                                          textAlign: "center",
                                          paddingLeft: "2px",
                                          paddingRight: "2px",
                                        }}
                                      >
                                        {itam[0][1]} (in %)
                                      </th>
                                    );
                                  }
                                )}
                              </>
                            )}
                          </>
                        )}
                      </tr>
                    </thead>

                    <tbody>
                      {local_datalist.map((itm, idx) => {
                        return (
                          <tr key={idx}>
                            <td>{idx + 1}</td>

                            {/* Associated Charges Row */}
                            {itm[0].map((itam, idex) => {
                              return (
                                <td>
                                  <MultiRowSearchInput
                                    data_list={sec_charges_list}
                                    setdata_list={setsec_charges_list}
                                    data_item_s={local_datalist[idx][0][idex]}
                                    page={sec_search_page}
                                    setpage={setsec_search_page}
                                    setsearch_txt={setsec_search_txt}
                                    error_message={"Please Select Any Option"}
                                    refresh={refresh}
                                    setrefresh={setrefresh}
                                    current_width={"180px"}
                                    idx={idex}
                                  />
                                </td>
                              );
                            })}

                            {/* For COld Chain */}

                            {itm[1].map((v, i) => {
                              {
                                /* Flat Rates */
                              }
                              if (i === 0) {
                                return (
                                  <td key={i}>
                                    <input
                                      value={local_datalist[idx][1][i]}
                                      onChange={(val) => {
                                        local_datalist[idx][1][i] =
                                          val.target.value;
                                        setrefresh(!refresh);
                                      }}
                                      className="input"
                                      type="number"
                                      min={0}
                                      step="0.5"
                                      name="voucher_amount"
                                      placeholder="Enter Value"
                                      style={{
                                        borderWidth: 0,
                                        width: "2.5rem",
                                      }}
                                    />
                                  </td>
                                );
                              }

                              // Min Box
                              if (i === 1 && dom_rate_type_local === "Upto") {
                                return (
                                  <td key={i}>
                                    <input
                                      value={local_datalist[idx][1][i]}
                                      onChange={(val) => {
                                        local_datalist[idx][1][i] =
                                          val.target.value;
                                        setrefresh(!refresh);
                                      }}
                                      type="number"
                                      min={0}
                                      // step={"0.5"}
                                      name="min box"
                                      placeholder="Enter Value"
                                      style={{
                                        borderWidth: 0,
                                        width: "2.5rem",
                                      }}
                                    />
                                  </td>
                                );
                              }

                              // Min Amount
                              if (i === 2 && dom_rate_type_local !== "Flat") {
                                return (
                                  <td key={i}>
                                    <input
                                      value={local_datalist[idx][1][i]}
                                      onChange={(val) => {
                                        local_datalist[idx][1][i] =
                                          val.target.value;
                                        setrefresh(!refresh);
                                      }}
                                      type="number"
                                      min={0}
                                      step={"0.5"}
                                      name="voucher_amount"
                                      placeholder="Enter Value"
                                      style={{
                                        borderWidth: 0,
                                        width: "2.5rem",
                                      }}
                                    />
                                  </td>
                                );
                              }
                            })}

                            {/* % of Other Charge Row Cold Chain */}
                            {fillterd_charge_list_local.length > 0 &&
                              fillterd_charge_list_local.map(
                                (itam1, index1) => {
                                  return (
                                    <td key={index1}>
                                      <input
                                        value={
                                          local_datalist[idx][1][3 + index1] ||
                                          ""
                                        }
                                        onChange={(val) => {
                                          local_datalist[idx][1][3 + index1] =
                                            val.target.value;
                                          setrefresh(!refresh);
                                        }}
                                        type="number"
                                        min={0}
                                        step={0.01}
                                        name="charge"
                                        placeholder="Enter Value"
                                        style={{
                                          borderWidth: 0,
                                          width: "2.5rem",
                                        }}
                                      />
                                    </td>
                                  );
                                }
                              )}

                            {/*  For Non cold Chain */}
                            {itm[2].map((v, j) => {
                              if (j === 0) {
                                // CHeck
                                return (
                                  <td key={j}>
                                    <input
                                      value={local_datalist[idx][2][j]}
                                      onChange={(val) => {
                                        local_datalist[idx][2][j] =
                                          val.target.value;
                                        setrefresh(!refresh);
                                      }}
                                      type="number"
                                      min={0}
                                      step="0.5"
                                      name="voucher_amount"
                                      placeholder="Enter Value"
                                      style={{
                                        borderWidth: 0,
                                        width: "2.5rem",
                                      }}
                                    />
                                  </td>
                                );
                              }

                              if (j === 1 && dom_rate_type_local === "Upto") {
                                return (
                                  <td key={j}>
                                    <input
                                      value={local_datalist[idx][2][j]}
                                      onChange={(val) => {
                                        local_datalist[idx][2][j] =
                                          val.target.value;
                                        setrefresh(!refresh);
                                      }}
                                      type="number"
                                      min={0}
                                      // step={"0.5"}
                                      name="voucher_amount"
                                      placeholder="Enter Min Amt"
                                      style={{
                                        borderWidth: 0,
                                        width: "2.5rem",
                                      }}
                                    />
                                  </td>
                                );
                              }

                              if (j === 2 && dom_rate_type_local !== "Flat") {
                                return (
                                  <td key={j}>
                                    <input
                                      value={local_datalist[idx][2][j]}
                                      onChange={(val) => {
                                        local_datalist[idx][2][j] =
                                          val.target.value;
                                        setrefresh(!refresh);
                                      }}
                                      type="number"
                                      min={0}
                                      step={"0.5"}
                                      name="voucher_amount"
                                      placeholder="Enter Value"
                                      style={{
                                        borderWidth: 0,
                                        width: "2.5rem",
                                      }}
                                    />
                                  </td>
                                );
                              }
                            })}

                            {/* % of Other Charge Row Non Cold Chain */}
                            {fillterd_charge_list_local.map((itam1, index1) => {
                              return (
                                <td key={index1}>
                                  <input
                                    value={
                                      local_datalist[idx][2][3 + index1] || ""
                                    }
                                    onChange={(val) => {
                                      local_datalist[idx][2][3 + index1] =
                                        val.target.value;
                                      setrefresh(!refresh);
                                    }}
                                    type="number"
                                    min={0}
                                    step={0.01}
                                    name="charge"
                                    placeholder="Enter Value"
                                    style={{
                                      borderWidth: 0,
                                      width: "2.5rem",
                                    }}
                                  />
                                </td>
                              );
                            })}

                            {/* Delete Row Button */}
                            <td
                              style={{
                                color: "red",
                                cursor: "pointer",
                                size: "50px",
                              }}
                              onClick={() => {
                                delete_row_asso(idx);
                              }}
                            >
                              <MdDelete />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* //Action Btn */}

                <div className="action_container">
                  {/* Add New Row Button */}
                  <Button
                    style={{ margin: "8px" }}
                    type="button"
                    className="btn btn-info m-1 cu_btn"
                    onClick={() => {
                      add_new_row_asso();
                    }}
                  >
                    Add New Row
                  </Button>

                  {isupdating ? (
                    <>
                      {/* Import Local Data Button */}
                      <Button
                        style={{ margin: "8px" }}
                        type="button"
                        className="btn btn-info m-1 cu_btn"
                        onClick={() => {
                          exportBillingData();
                        }}
                      >
                        Export
                      </Button>
                    </>
                  ) : (
                    <>
                      {/* Export Local Table Data Button */}
                      <Button //
                        style={{ margin: "8px" }}
                        type="button"
                        className="btn btn-info m-1 cu_btn"
                        onClick={() => {
                          setimport_for("Local");
                          setshow(true);
                          setlocal_datalisttmp([]);
                        }}
                      >
                        Import
                      </Button>
                    </>
                  )}
                </div>
              </TabPane>
            )}

            {is_air && (
              <TabPane tabId="2">
                <Nav tabs>
                  <NavItem>
                    <NavLink
                      style={{
                        cursor: "pointer",
                        fontSize: "16px",
                        color: local_cal_errd || local_cal_errb ? "red" : "",
                      }}
                      className={classnames({
                        active: activeAirTab === "01",
                      })}
                      onClick={() => {
                        toggleAir("01");
                      }}
                    >
                      Case To Case
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      style={{ cursor: "pointer", fontSize: "16px" }}
                      className={classnames({
                        active: activeAirTab === "02",
                      })}
                      onClick={() => {
                        toggleAir("02");
                      }}
                    >
                      Based on Destination
                    </NavLink>
                  </NavItem>
                </Nav>

                <TabContent activeTab={activeAirTab} className="p-3 text-muted">
                  <TabPane tabId="01">
                    <Row>
                      <Col lg={3}>
                        <div
                          onClick={() => {
                            setcase_(!case_);
                          }}
                        >
                          {case_ ? (
                            <FiCheckSquare size={20} />
                          ) : (
                            <FiSquare size={20} />
                          )}
                          <Label className="header-child">&nbsp; Case</Label>
                        </div>
                      </Col>

                      <Col lg={3}>
                        <div
                          onClick={() => {
                            setrate(!rate);
                          }}
                        >
                          {rate ? (
                            <FiCheckSquare size={20} />
                          ) : (
                            <FiSquare size={20} />
                          )}
                          <Label className="header-child">&nbsp; Rate</Label>
                        </div>
                      </Col>
                    </Row>

                    {case_ && (
                      <>
                        <Row>
                          <Col lg={3}>
                            <Label className="header-child">Rate Name</Label>
                          </Col>
                          <Col lg={3}></Col>
                        </Row>
                        {case_row.map((itm, idx) => {
                          return (
                            <Row key={idx}>
                              <Col lg={3}>
                                <div className="mb-2">
                                  {/* <Input
                                    onChange={(val) => {
                                      case_row[idx] = val.target.value;
                                      setrefresh(!refresh);
                                    }}
                                    value={itm}
                                    type="text"
                                    name="charge_name"
                                    className="form-control-md"
                                    id="input"
                                    placeholder="Enter Case Rate Name"
                                  /> */}

                                  <MultiRowSearchInput
                                    data_list={case_chrgs_list}
                                    setdata_list={setcase_chrgs_list}
                                    data_item_s={case_row[idx]}
                                    page={case_chrg_page}
                                    setpage={setcase_chrg_page}
                                    setsearch_txt={setcase_chrg_search_txt}
                                    error_message={"Please Select Any Option"}
                                    refresh={refresh}
                                    setrefresh={setrefresh}
                                    idx={idx}
                                  />
                                </div>
                              </Col>
                              <Col lg={1}>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: 34,
                                    marginBottom: 10,
                                  }}
                                >
                                  <IconContext.Provider
                                    value={{ color: "red", size: "20px" }}
                                  >
                                    <div
                                      style={{ cursor: "pointer" }}
                                      onClick={() => {
                                        if (
                                          window.confirm(
                                            "Do You Want To Delete this row ? "
                                          ) === true
                                        ) {
                                          let temp = [...case_row];
                                          temp.splice(idx, 1);
                                          setcase_row(temp);
                                        } else {
                                        }
                                      }}
                                    >
                                      <MdDelete />
                                    </div>
                                  </IconContext.Provider>
                                </div>
                              </Col>
                            </Row>
                          );
                        })}

                        <div>
                          <span
                            className="link-text"
                            onClick={() => {
                              let tmp = [...case_row];
                              tmp.push(["", ""]);
                              setcase_row(tmp);
                            }}
                          >
                            <IconContext.Provider
                              value={{
                                className: "link-text",
                              }}
                            >
                              <MdAdd />
                            </IconContext.Provider>
                            Add Another Rate
                          </span>
                        </div>
                      </>
                    )}
                  </TabPane>

                  <TabPane tabId="02">
                    <Row>
                      <div className="main_container">
                        <Label>Domestic Rate</Label>
                        <Row>
                          <Col lg={3} md={4} sm={8}>
                            <div
                              style={{ display: "flex", flexDirection: "row" }}
                            >
                              <div
                                onClick={() =>
                                  setis_per_charge_air(!is_per_charge_air)
                                }
                              >
                                {is_per_charge_air ? (
                                  <FiCheckSquare size={20} />
                                ) : (
                                  <FiSquare size={20} />
                                )}
                              </div>
                              <Label className="header-child">
                                &nbsp; % of Charge{" "}
                              </Label>
                            </div>
                          </Col>

                          <Col lg={3}>
                            <div
                              onClick={() => {
                                setis_oda_air(!is_oda_air);
                              }}
                            >
                              {is_oda_air ? (
                                <FiCheckSquare size={20} />
                              ) : (
                                <FiSquare size={20} />
                              )}
                              <Label className="header-child">&nbsp; ODA</Label>
                            </div>
                          </Col>
                          {/* <Col lg={3}>
                      <div
                        onClick={() => {
                          setother(!other);
                        }}
                      >
                        {other ? (
                          <FiCheckSquare size={20} />
                        ) : (
                          <FiSquare size={20} />
                        )}
                        <Label className="header-child">
                          &nbsp; Other Charge
                        </Label>
                      </div>
                    </Col> */}
                        </Row>
                        {/* % Of Charges */}

                        {is_per_charge_air && (
                          <div>
                            <Label style={{ fontSize: 20 }}>% Of Charges</Label>
                            <Row>
                              <Col md={4}>
                                <Label className="header-child">
                                  Charge Name
                                </Label>
                              </Col>
                              <Col md={4}>
                                <Label className="header-child">Category</Label>
                              </Col>
                              <Col md={2}>
                                <Label className="header-child">Rate %</Label>
                              </Col>
                              <Col md={2}>
                                <Label className="header-child">Delete</Label>
                              </Col>
                            </Row>

                            {per_charge_list_air.map((per_chrg, idx) => {
                              return (
                                <Row key={idx}>
                                  <Col md={4}>
                                    <MultiRowSearchInput
                                      data_list={oth_charges_list}
                                      setdata_list={setoth_charges_list}
                                      data_item_s={per_charge_list_air[idx][0]}
                                      page={ot_chg_page}
                                      setpage={setot_chg_page}
                                      setsearch_txt={setot_search_txt}
                                      error_message={"Please Select Any Option"}
                                      refresh={refresh}
                                      setrefresh={setrefresh}
                                      idx={idx}
                                    />
                                  </Col>

                                  <Col md={4}>
                                    <Input
                                      key={idx}
                                      value={per_chrg[1]}
                                      type="select"
                                      onChange={(event) => {
                                        setrefresh(!refresh);

                                        per_chrg[1] = event.target.value;
                                      }}
                                      className="form-control-md"
                                      id="input"
                                    >
                                      <option value="" hidden></option>
                                      {per_charge_categories.map(
                                        (itms, index) => {
                                          return (
                                            <option
                                              className="option"
                                              value={itms}
                                              key={index}
                                            >
                                              {itms}
                                            </option>
                                          );
                                        }
                                      )}
                                    </Input>
                                  </Col>

                                  <Col md={2}>
                                    {per_chrg[1] === "% of client invoice" ? (
                                      <Input
                                        key={idx}
                                        step={0.01}
                                        className="form-control-md"
                                        id="input"
                                        placeholder="Enter Rate %"
                                        type="number"
                                        value={per_chrg[2]}
                                        onChange={(val) => {
                                          per_chrg[2] = val.target.value;
                                          setrefresh(!refresh);
                                        }}
                                        disabled={false}
                                      />
                                    ) : (
                                      <div
                                        style={{
                                          paddingTop: 8,
                                          paddingBottom: 8,
                                        }}
                                      >
                                        -
                                      </div>
                                    )}
                                  </Col>

                                  <Col md={2}>
                                    {idx > 0 ? (
                                      <div
                                        style={{
                                          display: "flex",
                                          justifyContent: "center",
                                          alignItems: "center",
                                          height: 34,
                                          // marginBottom: 18,
                                        }}
                                      >
                                        <IconContext.Provider
                                          value={{ color: "red", size: "20px" }}
                                        >
                                          <div
                                            style={{ cursor: "pointer" }}
                                            onClick={() => {
                                              if (
                                                window.confirm(
                                                  "Do You Want To Delete this row ? "
                                                ) === true
                                              ) {
                                                let temp = [
                                                  ...per_charge_list_air,
                                                ];

                                                if (
                                                  per_charge_list_air[idx]
                                                    .length > 3
                                                ) {
                                                  setper_del_ids_air([
                                                    ...per_del_ids_air,
                                                    per_charge_list_air[idx][3],
                                                  ]);
                                                }

                                                temp.splice(idx, 1);
                                                setper_charge_list_air(temp);
                                              } else {
                                              }
                                              setrefresh(!refresh);
                                            }}
                                          >
                                            <MdDelete />
                                          </div>
                                        </IconContext.Provider>
                                      </div>
                                    ) : (
                                      <div
                                        style={{
                                          display: "flex",
                                          justifyContent: "center",
                                          alignItems: "center",
                                          height: 34,
                                        }}
                                      >
                                        {"-"}
                                      </div>
                                    )}
                                  </Col>
                                </Row>
                              );
                            })}

                            {/* % Charge Add Btn */}
                            <div style={{ margin: "1px 0 10px 0" }}>
                              <span
                                className="link-text"
                                onClick={() => {
                                  let per_tmp_lst = [["", ""], "", ""];
                                  setper_charge_list_air([
                                    ...per_charge_list_air,
                                    per_tmp_lst,
                                  ]);
                                  setrefresh(!refresh);
                                }}
                                style={{
                                  fontSize: "14px",
                                  color: "purple",
                                  cursor: "pointer",
                                }}
                              >
                                <IconContext.Provider
                                  value={{
                                    className: "link-text",
                                  }}
                                >
                                  <MdAdd />
                                </IconContext.Provider>
                                Add another % of Charge
                              </span>
                            </div>
                          </div>
                        )}
                        <Row style={{ margin: "5px 0 5px 0" }}>
                          <Col lg={4} md={6} sm={6}>
                            <div className="mb-2">
                              <Label className="header-child">
                                Domestic Rates Type*
                              </Label>
                              <NSearchInput
                                data_list={dom_rate_category_list}
                                data_item_s={dom_rate_category}
                                set_data_item_s={setdom_rate_category}
                                show_search={false}
                                error_message={"Select Domestic Rate Category"}
                              />
                            </div>
                          </Col>

                          <Col lg={3} md={6} sm={6}>
                            <div className="mb-2">
                              <Label className="header-child">Rate Type</Label>
                              <NSearchInput
                                data_list={dom_rate_type_list}
                                data_item_s={dom_rate_type}
                                set_data_item_s={setdom_rate_type}
                                show_search={false}
                                error_message={"Select ODA Rate"}
                              />
                            </div>
                          </Col>
                        </Row>

                        {(dom_rate_category === "City to City" ||
                          dom_rate_category === "Both") && (
                            <>
                              <div
                                style={{
                                  overflowX: "scroll",
                                }}
                              >
                                {/* Domestic City Table */}
                                <Table className="table-grid">
                                  <thead>
                                    <tr>
                                      <th
                                        style={{
                                          width: "2rem",
                                          textAlign: "center",
                                          paddingLeft: "2px",
                                          paddingRight: "2px",
                                        }}
                                        rowSpan={2}
                                      >
                                        SL
                                      </th>
                                      <th
                                        style={{
                                          width: "8rem",
                                          textAlign: "center",
                                          paddingLeft: "4px",
                                          paddingRight: "4px",
                                        }}
                                        rowSpan={2}
                                      >
                                        Origin City
                                      </th>
                                      <th
                                        style={{
                                          width: "8rem",
                                          textAlign: "center",
                                          paddingLeft: "6px",
                                          paddingRight: "4px",
                                        }}
                                        rowSpan={2}
                                      >
                                        Destination City
                                      </th>
                                      <th
                                        style={{
                                          width: "25rem",
                                          textAlign: "center",
                                          paddingLeft: "2px",
                                          paddingRight: "2px",
                                        }}
                                        colSpan={
                                          cc_rate_call_span +
                                          fillterd_charge_list.length +
                                          oda_selected
                                        }
                                      >
                                        Cold Chain
                                      </th>
                                      <th
                                        style={{
                                          width: "25rem",
                                          textAlign: "center",
                                          paddingLeft: "2px",
                                          paddingRight: "2px",
                                        }}
                                        colSpan={
                                          ncc_rate_call_span +
                                          fillterd_charge_list.length +
                                          oda_selected
                                        }
                                      >
                                        Non Cold Chain
                                      </th>
                                      <th
                                        style={{
                                          width: "2rem",
                                          textAlign: "center",
                                          paddingLeft: "6px",
                                          paddingRight: "4px",
                                        }}
                                        rowSpan={2}
                                      >
                                        Delete
                                      </th>
                                    </tr>

                                    <tr>
                                      <th
                                        style={{
                                          width: "2rem",
                                          textAlign: "center",
                                          paddingLeft: "2px",
                                          paddingRight: "2px",
                                        }}
                                      >
                                        Rate Per Kg
                                      </th>
                                      {dom_rate_type === "Upto" && (
                                        <th
                                          style={{
                                            width: "2rem",
                                            textAlign: "center",
                                            paddingLeft: "2px",
                                            paddingRight: "2px",
                                          }}
                                        >
                                          Minimum Box
                                        </th>
                                      )}
                                      {dom_rate_type !== "Flat" && (
                                        <th
                                          style={{
                                            width: "2rem",
                                            textAlign: "center",
                                            paddingLeft: "2px",
                                            paddingRight: "2px",
                                          }}
                                        >
                                          Minimum Amount
                                        </th>
                                      )}

                                      {is_oda_air && (
                                        <th
                                          style={{
                                            width: "2rem",
                                            textAlign: "center",
                                            paddingLeft: "2px",
                                            paddingRight: "2px",
                                          }}
                                        >
                                          ODA
                                        </th>
                                      )}

                                      {fillterd_charge_list.length > 0 && (
                                        <>
                                          {fillterd_charge_list.map(
                                            (itam, indx) => {
                                              return (
                                                <th
                                                  style={{
                                                    width: "2rem",
                                                    textAlign: "center",
                                                    paddingLeft: "2px",
                                                    paddingRight: "2px",
                                                  }}
                                                >
                                                  {itam[0][1]}(in %)
                                                </th>
                                              );
                                            }
                                          )}
                                        </>
                                      )}

                                      <th
                                        style={{
                                          width: "2rem",
                                          textAlign: "center",
                                          paddingLeft: "2px",
                                          paddingRight: "2px",
                                        }}
                                      >
                                        Rate Per Kg
                                      </th>

                                      {dom_rate_type === "Upto" && (
                                        <th
                                          style={{
                                            width: "2rem",
                                            textAlign: "center",
                                            paddingLeft: "2px",
                                            paddingRight: "2px",
                                          }}
                                        >
                                          Minimum Box
                                        </th>
                                      )}

                                      {dom_rate_type !== "Flat" && (
                                        <th
                                          style={{
                                            width: "2rem",
                                            textAlign: "center",
                                            paddingLeft: "2px",
                                            paddingRight: "2px",
                                          }}
                                        >
                                          Minimum Amount
                                        </th>
                                      )}

                                      {is_oda_air && (
                                        <th
                                          style={{
                                            width: "2rem",
                                            textAlign: "center",
                                            paddingLeft: "2px",
                                            paddingRight: "2px",
                                          }}
                                        >
                                          ODA
                                        </th>
                                      )}
                                      {fillterd_charge_list.length > 0 && (
                                        <>
                                          {fillterd_charge_list.map(
                                            (itam, indx) => {
                                              return (
                                                <th
                                                  style={{
                                                    width: "2rem",
                                                    textAlign: "center",
                                                    paddingLeft: "2px",
                                                    paddingRight: "2px",
                                                  }}
                                                >
                                                  {itam[0][1]} (in %)
                                                </th>
                                              );
                                            }
                                          )}
                                        </>
                                      )}
                                    </tr>
                                  </thead>

                                  <tbody>
                                    {datalist.map((itm, idx) => {
                                      return (
                                        <tr key={idx}>
                                          <td>{idx + 1}</td>

                                          {/* For origin City & Destination City */}
                                          {itm[0].map((v, i) => {
                                            return (
                                              <td key={i}>
                                                <MultiRowSearchInput
                                                  data_list={city_list}
                                                  setdata_list={setcity_list}
                                                  data_item_s={
                                                    datalist[idx][0][i]
                                                  }
                                                  page={city_page_no}
                                                  setpage={setcity_page_no}
                                                  setsearch_txt={
                                                    setcity_search_itm
                                                  }
                                                  error_message={
                                                    "Please Select Any Option"
                                                  }
                                                  refresh={refresh}
                                                  setrefresh={setrefresh}
                                                  current_width={"180px"}
                                                  idx={idx}
                                                />
                                              </td>
                                            );
                                          })}

                                          {/* For COld Chain */}
                                          {itm[1].map((v, i) => {
                                            if (i === 0) {
                                              return (
                                                <td key={i}>
                                                  <input
                                                    value={datalist[idx][1][i]}
                                                    onChange={(val) => {
                                                      datalist[idx][1][i] =
                                                        val.target.value;
                                                      const files =
                                                        val.target.files;

                                                      setrefresh(!refresh);
                                                    }}
                                                    className="input"
                                                    type="number"
                                                    min={0}
                                                    step="0.5"
                                                    accept=".csv,.xlsx,.xls"
                                                    name="voucher_amount"
                                                    placeholder="Enter Value"
                                                    style={{
                                                      borderWidth: 0,
                                                      width: "2.5rem",
                                                    }}
                                                  />
                                                </td>
                                              );
                                            }
                                            if (
                                              i === 1 &&
                                              dom_rate_type === "Upto"
                                            ) {
                                              return (
                                                <td key={i}>
                                                  <input
                                                    value={datalist[idx][1][i]}
                                                    onChange={(val) => {
                                                      datalist[idx][1][i] =
                                                        val.target.value;
                                                      setrefresh(!refresh);
                                                    }}
                                                    type="number"
                                                    min={0}
                                                    // step={"0.5"}
                                                    name="voucher_amount"
                                                    placeholder="Enter Value"
                                                    style={{
                                                      borderWidth: 0,
                                                      width: "2.5rem",
                                                    }}
                                                  />
                                                </td>
                                              );
                                            }
                                            if (
                                              i === 2 &&
                                              dom_rate_type !== "Flat"
                                            ) {
                                              return (
                                                <td key={i}>
                                                  <input
                                                    value={datalist[idx][1][i]}
                                                    onChange={(val) => {
                                                      datalist[idx][1][i] =
                                                        val.target.value;
                                                      setrefresh(!refresh);
                                                    }}
                                                    type="number"
                                                    min={0}
                                                    step={"0.5"}
                                                    name="voucher_amount"
                                                    placeholder="Enter Value"
                                                    style={{
                                                      borderWidth: 0,
                                                      width: "2.5rem",
                                                    }}
                                                  />
                                                </td>
                                              );
                                            }
                                            if (i === 3 && is_oda_air) {
                                              return (
                                                <td key={i}>
                                                  <input
                                                    value={datalist[idx][1][i]}
                                                    onChange={(val) => {
                                                      datalist[idx][1][i] =
                                                        val.target.value;
                                                      setrefresh(!refresh);
                                                    }}
                                                    min={0}
                                                    step="0.5"
                                                    type="number"
                                                    name="voucher_amount"
                                                    placeholder="Enter Value"
                                                    style={{
                                                      borderWidth: 0,
                                                      width: "2.5rem",
                                                    }}
                                                  />
                                                </td>
                                              );
                                            }
                                          })}

                                          {fillterd_charge_list.map(
                                            (itam1, index1) => {
                                              return (
                                                <td key={index1}>
                                                  <input
                                                    value={
                                                      datalist[idx][1][
                                                      4 + index1
                                                      ] || ""
                                                    }
                                                    onChange={(val) => {
                                                      datalist[idx][1][
                                                        4 + index1
                                                      ] = val.target.value;
                                                      setrefresh(!refresh);
                                                    }}
                                                    type="number"
                                                    min={0}
                                                    step={0.01}
                                                    name="charge"
                                                    placeholder="Enter Value"
                                                    style={{
                                                      borderWidth: 0,
                                                      width: "2.5rem",
                                                    }}
                                                  />
                                                </td>
                                              );
                                            }
                                          )}

                                          {/*  For Non cold Chain */}

                                          {itm[2].map((v, i) => {
                                            if (i === 0) {
                                              return (
                                                <td key={i}>
                                                  <input
                                                    value={datalist[idx][2][i]}
                                                    onChange={(val) => {
                                                      datalist[idx][2][i] =
                                                        val.target.value;
                                                      setrefresh(!refresh);
                                                    }}
                                                    type="number"
                                                    min={0}
                                                    step="0.5"
                                                    name="voucher_amount"
                                                    placeholder="Enter Value"
                                                    style={{
                                                      borderWidth: 0,
                                                      width: "2.5rem",
                                                    }}
                                                  />
                                                </td>
                                              );
                                            }
                                            if (
                                              i === 1 &&
                                              dom_rate_type === "Upto"
                                            ) {
                                              return (
                                                <td key={i}>
                                                  <input
                                                    value={datalist[idx][2][i]}
                                                    onChange={(val) => {
                                                      datalist[idx][2][i] =
                                                        val.target.value;
                                                      setrefresh(!refresh);
                                                    }}
                                                    type="number"
                                                    min={0}
                                                    // step={"0.5"}
                                                    name="voucher_amount"
                                                    placeholder="Enter Value"
                                                    style={{
                                                      borderWidth: 0,
                                                      width: "2.5rem",
                                                    }}
                                                  />
                                                </td>
                                              );
                                            }
                                            if (
                                              i === 2 &&
                                              dom_rate_type !== "Flat"
                                            ) {
                                              return (
                                                <td key={i}>
                                                  <input
                                                    value={datalist[idx][2][i]}
                                                    onChange={(val) => {
                                                      datalist[idx][2][i] =
                                                        val.target.value;
                                                      setrefresh(!refresh);
                                                    }}
                                                    type="number"
                                                    min={0}
                                                    step={"0.5"}
                                                    name="voucher_amount"
                                                    placeholder="Enter Value"
                                                    style={{
                                                      borderWidth: 0,
                                                      width: "2.5rem",
                                                    }}
                                                  />
                                                </td>
                                              );
                                            }
                                            if (i === 3 && is_oda_air) {
                                              return (
                                                <td key={i}>
                                                  <input
                                                    value={datalist[idx][2][i]}
                                                    onChange={(val) => {
                                                      datalist[idx][2][i] =
                                                        val.target.value;
                                                      setrefresh(!refresh);
                                                    }}
                                                    type="number"
                                                    min={0}
                                                    step="0.5"
                                                    name="voucher_amount"
                                                    placeholder="Enter Value"
                                                    style={{
                                                      borderWidth: 0,
                                                      width: "2.5rem",
                                                    }}
                                                  />
                                                </td>
                                              );
                                            }
                                          })}

                                          {fillterd_charge_list.map(
                                            (itam1, index1) => {
                                              return (
                                                <td key={index1}>
                                                  <input
                                                    value={
                                                      datalist[idx][2][
                                                      4 + index1
                                                      ] || ""
                                                    }
                                                    onChange={(val) => {
                                                      datalist[idx][2][
                                                        4 + index1
                                                      ] = val.target.value;
                                                      setrefresh(!refresh);
                                                    }}
                                                    type="number"
                                                    min={0}
                                                    step={0.01}
                                                    name="Ncc_charge"
                                                    placeholder="Enter Value"
                                                    style={{
                                                      borderWidth: 0,
                                                      width: "2.5rem",
                                                    }}
                                                  />
                                                </td>
                                              );
                                            }
                                          )}
                                          <td
                                            style={{
                                              color: "red",
                                              cursor: "pointer",
                                              size: "50px",
                                            }}
                                            onClick={() => {
                                              delete_row_city(idx);
                                            }}
                                          >
                                            <MdDelete />
                                          </td>
                                        </tr>
                                      );
                                    })}
                                  </tbody>
                                </Table>
                              </div>

                              {/* //Action Btn */}
                              <div className="action_container">
                                <Button
                                  style={{ margin: "8px" }}
                                  type="button"
                                  className="btn btn-info m-1 cu_btn"
                                  onClick={() => {
                                    add_new_row_city();
                                  }}
                                >
                                  Add New Row
                                </Button>

                                {/* Import Excel Data Button */}
                                <Button
                                  style={{ margin: "8px" }}
                                  type="button"
                                  className="btn btn-info m-1 cu_btn"
                                  onClick={() => {
                                    setshow(true);
                                    setimport_for("Air_City");
                                    // navigate("/customers/ImportCityData");
                                  }}
                                >
                                  Import
                                </Button>

                                <Button
                                  style={{ margin: "8px" }}
                                  type="button"
                                  className="btn btn-info m-1 cu_btn"
                                  onClick={() => exportBillingDataAirCity()}
                                >
                                  Export
                                </Button>
                              </div>
                            </>
                          )}

                        {(dom_rate_category === "Zone to Zone" ||
                          dom_rate_category === "Both") && (
                            <>
                              <div
                                style={{
                                  overflowX: "scroll",
                                }}
                              >
                                <table className="table-grid">
                                  <thead>
                                    <tr>
                                      <th
                                        style={{
                                          width: "2rem",
                                          textAlign: "center",
                                          paddingLeft: "2px",
                                          paddingRight: "2px",
                                        }}
                                        rowSpan={2}
                                      >
                                        SL
                                      </th>
                                      <th
                                        style={{
                                          width: "8rem",
                                          textAlign: "center",
                                          paddingLeft: "4px",
                                          paddingRight: "4px",
                                        }}
                                        rowSpan={2}
                                      >
                                        Origin Zone
                                      </th>
                                      <th
                                        style={{
                                          width: "8rem",
                                          textAlign: "center",
                                          paddingLeft: "6px",
                                          paddingRight: "4px",
                                        }}
                                        rowSpan={2}
                                      >
                                        Destination Zone
                                      </th>
                                      <th
                                        style={{
                                          width: "25rem",
                                          textAlign: "center",
                                          paddingLeft: "2px",
                                          paddingRight: "2px",
                                        }}
                                        // colSpan={is_oda ? cc_rate_call_span + 1 : cc_rate_call_span + fillterd_charge_list.length}
                                        colSpan={
                                          cc_rate_call_span +
                                          fillterd_charge_list.length +
                                          oda_selected
                                        }
                                      >
                                        Cold Chain
                                      </th>
                                      <th
                                        style={{
                                          width: "25rem",
                                          textAlign: "center",
                                          paddingLeft: "2px",
                                          paddingRight: "2px",
                                        }}
                                        // colSpan={ is_oda ? ncc_rate_call_span + 1 : ncc_rate_call_span + fillterd_charge_list.length }
                                        colSpan={
                                          ncc_rate_call_span +
                                          fillterd_charge_list.length +
                                          oda_selected
                                        }
                                      >
                                        Non Cold Chain
                                      </th>
                                      <th
                                        style={{
                                          width: "2rem",
                                          textAlign: "center",
                                          paddingLeft: "6px",
                                          paddingRight: "4px",
                                        }}
                                        rowSpan={2}
                                      >
                                        Delete
                                      </th>
                                    </tr>

                                    <tr>
                                      <th
                                        style={{
                                          width: "2rem",
                                          textAlign: "center",
                                          paddingLeft: "2px",
                                          paddingRight: "2px",
                                        }}
                                      >
                                        Rate Per Kg
                                      </th>

                                      {dom_rate_type === "Upto" && (
                                        <th
                                          style={{
                                            width: "2rem",
                                            textAlign: "center",
                                            paddingLeft: "2px",
                                            paddingRight: "2px",
                                          }}
                                        >
                                          Minimum Box
                                        </th>
                                      )}

                                      {dom_rate_type !== "Flat" && (
                                        <th
                                          style={{
                                            width: "2rem",
                                            textAlign: "center",
                                            paddingLeft: "2px",
                                            paddingRight: "2px",
                                          }}
                                        >
                                          Minimum Amount
                                        </th>
                                      )}

                                      {is_oda_air && (
                                        <th
                                          style={{
                                            width: "2rem",
                                            textAlign: "center",
                                            paddingLeft: "2px",
                                            paddingRight: "2px",
                                          }}
                                        >
                                          ODA
                                        </th>
                                      )}
                                      {fillterd_charge_list.length > 0 && (
                                        <>
                                          {fillterd_charge_list.map(
                                            (itam, indx) => {
                                              return (
                                                <th
                                                  style={{
                                                    width: "2rem",
                                                    textAlign: "center",
                                                    paddingLeft: "2px",
                                                    paddingRight: "2px",
                                                  }}
                                                >
                                                  {itam[0][1]}(in %)
                                                </th>
                                              );
                                            }
                                          )}
                                        </>
                                      )}

                                      <th
                                        style={{
                                          width: "2rem",
                                          textAlign: "center",
                                          paddingLeft: "2px",
                                          paddingRight: "2px",
                                        }}
                                      >
                                        Rate Per Kg
                                      </th>

                                      {dom_rate_type === "Upto" && (
                                        <th
                                          style={{
                                            width: "2rem",
                                            textAlign: "center",
                                            paddingLeft: "2px",
                                            paddingRight: "2px",
                                          }}
                                        >
                                          Minimum Box
                                        </th>
                                      )}

                                      {dom_rate_type !== "Flat" && (
                                        <th
                                          style={{
                                            width: "2rem",
                                            textAlign: "center",
                                            paddingLeft: "2px",
                                            paddingRight: "2px",
                                          }}
                                        >
                                          Minimum Amount
                                        </th>
                                      )}

                                      {is_oda_air && (
                                        <th
                                          style={{
                                            width: "2rem",
                                            textAlign: "center",
                                            paddingLeft: "2px",
                                            paddingRight: "2px",
                                          }}
                                        >
                                          ODA
                                        </th>
                                      )}
                                      {fillterd_charge_list.length > 0 && (
                                        <>
                                          {fillterd_charge_list.map(
                                            (itam, indx) => {
                                              return (
                                                <th
                                                  style={{
                                                    width: "2rem",
                                                    textAlign: "center",
                                                    paddingLeft: "2px",
                                                    paddingRight: "2px",
                                                  }}
                                                >
                                                  {itam[0][1]} (in %)
                                                </th>
                                              );
                                            }
                                          )}
                                        </>
                                      )}
                                    </tr>
                                  </thead>

                                  <tbody>
                                    {datalist1.map((itm, idx) => {
                                      return (
                                        <tr key={idx}>
                                          <td>{idx + 1}</td>

                                          {/* For origin City & Destination City */}
                                          {itm[0].map((v, i) => {
                                            return (
                                              <td key={i}>
                                                <MultiRowSearchInput
                                                  data_list={zone_list}
                                                  setdata_list={setzone_list}
                                                  data_item_s={
                                                    datalist1[idx][0][i]
                                                  }
                                                  page={zone_page_no}
                                                  setpage={setzone_page_no}
                                                  setsearch_txt={
                                                    setzone_search_itm
                                                  }
                                                  error_message={
                                                    "Please Select Any Option"
                                                  }
                                                  refresh={refresh}
                                                  setrefresh={setrefresh}
                                                  current_width={"180px"}
                                                  idx={idx}
                                                />
                                              </td>
                                            );
                                          })}

                                          {/* For COld Chain */}
                                          {itm[1].map((v, i) => {
                                            if (i === 0) {
                                              return (
                                                <td key={i}>
                                                  <input
                                                    value={datalist1[idx][1][i]}
                                                    onChange={(val) => {
                                                      datalist1[idx][1][i] =
                                                        val.target.value;
                                                      setrefresh(!refresh);
                                                    }}
                                                    className="input"
                                                    type="number"
                                                    min={0}
                                                    step="0.5"
                                                    name=""
                                                    placeholder="Enter Value"
                                                    style={{
                                                      borderWidth: 0,
                                                      width: "2.5rem",
                                                    }}
                                                  />
                                                </td>
                                              );
                                            }
                                            if (
                                              i === 1 &&
                                              dom_rate_type === "Upto"
                                            ) {
                                              return (
                                                <td key={i}>
                                                  <input
                                                    value={datalist1[idx][1][i]}
                                                    onChange={(val) => {
                                                      datalist1[idx][1][i] =
                                                        val.target.value;
                                                      setrefresh(!refresh);
                                                    }}
                                                    type="number"
                                                    min={0}
                                                    // step={"0.5"}
                                                    name=""
                                                    placeholder="Enter Value"
                                                    style={{
                                                      borderWidth: 0,
                                                      width: "2.5rem",
                                                    }}
                                                  />
                                                </td>
                                              );
                                            }
                                            if (
                                              i === 2 &&
                                              dom_rate_type !== "Flat"
                                            ) {
                                              return (
                                                <td key={i}>
                                                  <input
                                                    value={datalist1[idx][1][i]}
                                                    onChange={(val) => {
                                                      datalist1[idx][1][i] =
                                                        val.target.value;
                                                      setrefresh(!refresh);
                                                    }}
                                                    type="number"
                                                    min={0}
                                                    step={"0.5"}
                                                    name=""
                                                    placeholder="Enter Value"
                                                    style={{
                                                      borderWidth: 0,
                                                      width: "2.5rem",
                                                    }}
                                                  />
                                                </td>
                                              );
                                            }
                                            if (i === 3 && is_oda_air) {
                                              return (
                                                <td key={i}>
                                                  <input
                                                    value={datalist1[idx][1][i]}
                                                    onChange={(val) => {
                                                      datalist1[idx][1][i] =
                                                        val.target.value;
                                                      setrefresh(!refresh);
                                                    }}
                                                    min={0}
                                                    step="0.5"
                                                    type="number"
                                                    name=""
                                                    placeholder="Enter Value"
                                                    style={{
                                                      borderWidth: 0,
                                                      width: "2.5rem",
                                                    }}
                                                  />
                                                </td>
                                              );
                                            }
                                          })}

                                          {fillterd_charge_list.map(
                                            (itam1, index1) => {
                                              return (
                                                <td key={index1}>
                                                  <input
                                                    value={
                                                      datalist1[idx][1][
                                                      4 + index1
                                                      ] || ""
                                                    }
                                                    onChange={(val) => {
                                                      datalist1[idx][1][
                                                        4 + index1
                                                      ] = val.target.value;
                                                      setrefresh(!refresh);
                                                    }}
                                                    type="number"
                                                    min={0}
                                                    step={0.01}
                                                    name="charge"
                                                    placeholder="Enter Value"
                                                    style={{
                                                      borderWidth: 0,
                                                      width: "2.5rem",
                                                    }}
                                                  />
                                                </td>
                                              );
                                            }
                                          )}

                                          {/*  For Non cold Chain */}

                                          {itm[2].map((v, i) => {
                                            if (i === 0) {
                                              return (
                                                <td key={i}>
                                                  <input
                                                    value={datalist1[idx][2][i]}
                                                    onChange={(val) => {
                                                      datalist1[idx][2][i] =
                                                        val.target.value;
                                                      setrefresh(!refresh);
                                                    }}
                                                    type="number"
                                                    min={0}
                                                    step="0.5"
                                                    name=""
                                                    placeholder="Enter Value"
                                                    style={{
                                                      borderWidth: 0,
                                                      width: "2.5rem",
                                                    }}
                                                  />
                                                </td>
                                              );
                                            }
                                            if (
                                              i === 1 &&
                                              dom_rate_type === "Upto"
                                            ) {
                                              return (
                                                <td key={i}>
                                                  <input
                                                    value={datalist1[idx][2][i]}
                                                    onChange={(val) => {
                                                      datalist1[idx][2][i] =
                                                        val.target.value;
                                                      setrefresh(!refresh);
                                                    }}
                                                    type="number"
                                                    min={0}
                                                    // step={"0.5"}
                                                    name=""
                                                    placeholder="Enter Value"
                                                    style={{
                                                      borderWidth: 0,
                                                      width: "2.5rem",
                                                    }}
                                                  />
                                                </td>
                                              );
                                            }
                                            if (
                                              i === 2 &&
                                              dom_rate_type !== "Flat"
                                            ) {
                                              return (
                                                <td key={i}>
                                                  <input
                                                    value={datalist1[idx][2][i]}
                                                    onChange={(val) => {
                                                      datalist1[idx][2][i] =
                                                        val.target.value;
                                                      setrefresh(!refresh);
                                                    }}
                                                    type="number"
                                                    min={0}
                                                    step={"0.5"}
                                                    name=""
                                                    placeholder="Enter Value"
                                                    style={{
                                                      borderWidth: 0,
                                                      width: "2.5rem",
                                                    }}
                                                  />
                                                </td>
                                              );
                                            }
                                            if (i === 3 && is_oda_air) {
                                              return (
                                                <td key={i}>
                                                  <input
                                                    value={datalist1[idx][2][i]}
                                                    onChange={(val) => {
                                                      datalist1[idx][2][i] =
                                                        val.target.value;
                                                      setrefresh(!refresh);
                                                    }}
                                                    type="number"
                                                    min={0}
                                                    step="0.5"
                                                    name=""
                                                    placeholder="Enter Value"
                                                    style={{
                                                      borderWidth: 0,
                                                      width: "2.5rem",
                                                    }}
                                                  />
                                                </td>
                                              );
                                            }
                                          })}

                                          {fillterd_charge_list.map(
                                            (itam1, index1) => {
                                              return (
                                                <td key={index1}>
                                                  <input
                                                    value={
                                                      datalist1[idx][2][
                                                      4 + index1
                                                      ] || ""
                                                    }
                                                    onChange={(val) => {
                                                      datalist1[idx][2][
                                                        4 + index1
                                                      ] = val.target.value;
                                                      setrefresh(!refresh);
                                                    }}
                                                    type="number"
                                                    min={0}
                                                    step={0.01}
                                                    name="Ncc_charge"
                                                    placeholder="Enter Value"
                                                    style={{
                                                      borderWidth: 0,
                                                      width: "2.5rem",
                                                    }}
                                                  />
                                                </td>
                                              );
                                            }
                                          )}

                                          <td
                                            style={{
                                              color: "red",
                                              cursor: "pointer",
                                              size: "50px",
                                            }}
                                            onClick={() => {
                                              delete_row_zone(idx);
                                            }}
                                          >
                                            <MdDelete />
                                          </td>
                                        </tr>
                                      );
                                    })}
                                  </tbody>
                                </table>
                              </div>

                              {/* //Action Btn */}
                              <div className="action_container">
                                <Button
                                  style={{ margin: "8px" }}
                                  type="button"
                                  className="btn btn-info m-1 cu_btn"
                                  onClick={() => {
                                    add_new_row_zone();
                                  }}
                                >
                                  Add New Row
                                </Button>

                                <Button
                                  style={{ margin: "8px" }}
                                  type="button"
                                  className="btn btn-info m-1 cu_btn"
                                  onClick={() => {
                                    setshow(true);
                                    setimport_for("Air_Zone");
                                    // navigate("/customers/importlocalassodata");
                                  }}
                                >
                                  Import
                                </Button>

                                <Button
                                  style={{ margin: "8px" }}
                                  type="button"
                                  className="btn btn-info m-1 cu_btn"
                                  onClick={() => {
                                    exportBillingDataAirZone();
                                  }}
                                >
                                  Export
                                </Button>
                              </div>
                            </>
                          )}
                      </div>
                    </Row>
                  </TabPane>
                </TabContent>
              </TabPane>
            )}

            {is_surface && (
              <TabPane tabId="3">
                {/* <span> Work Under Progress</span> */}
                <Nav tabs>
                  <NavItem>
                    <NavLink
                      style={{
                        cursor: "pointer",
                        fontSize: "16px",
                        color: local_cal_errd || local_cal_errb ? "red" : "",
                      }}
                      className={classnames({
                        active: activeSurfaceTab === "01",
                      })}
                      onClick={() => {
                        toggleSurface("01");
                      }}
                    >
                      Case To Case
                    </NavLink>
                  </NavItem>

                  <NavItem>
                    <NavLink
                      style={{ cursor: "pointer", fontSize: "16px" }}
                      className={classnames({
                        active: activeSurfaceTab === "02",
                      })}
                      onClick={() => {
                        toggleSurface("02");
                      }}
                    >
                      Based on Destination
                    </NavLink>
                  </NavItem>
                </Nav>

                <TabContent activeTab={activeSurfaceTab} className="p-3 text-muted">
                  <TabPane tabId="01">
                    <Row>
                      <Col lg={3}>
                        <div
                          onClick={() => {
                            setcase_(!case_);
                          }}
                        >
                          {case_ ? (
                            <FiCheckSquare size={20} />
                          ) : (
                            <FiSquare size={20} />
                          )}
                          <Label className="header-child">&nbsp; Case </Label>
                        </div>
                      </Col>
                      <Col lg={3}>
                        <div
                          onClick={() => {
                            setrate(!rate);
                          }}
                        >
                          {rate ? (
                            <FiCheckSquare size={20} />
                          ) : (
                            <FiSquare size={20} />
                          )}
                          <Label className="header-child">&nbsp; Rate </Label>
                        </div>
                      </Col>
                    </Row>
                    {case_ && (
                      <>
                        <Row>
                          <Col lg={3}>
                            <Label className="header-child"> Rate Name</Label>
                          </Col>
                          <Col lg={3}></Col>
                        </Row>
                        {case_row.map((itm2, idx2) => {
                          return (
                            <Row key={idx2}>
                              <Col lg={3}>
                                <div className="mb-2">
                                  <MultiRowSearchInput
                                    data_list={case_chrgs_list}
                                    setdata_list={setcase_chrgs_list}
                                    data_item_s={case_row[idx2]}
                                    page={case_chrg_page}
                                    setpage={setcase_chrg_page}
                                    setsearch_txt={setcase_chrg_search_txt}
                                    error_message={"Please Select Any Option"}
                                    refresh={refresh}
                                    setrefresh={setrefresh}
                                    idx={idx2}
                                  />
                                </div>
                              </Col>
                              <Col lg={1}>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignContent: "center",
                                    height: 34,
                                    marginBottom: 10,
                                  }}
                                >
                                  <IconContext.Provider
                                    value={{ color: "red", size: "20px" }}
                                  >
                                    <div
                                      style={{ cursor: "pointer" }}
                                      onClick={() => {
                                        if (
                                          window.confirm("Do you want to delete this row?") === true
                                        ) {
                                          let temp = [...case_row];
                                          temp.splice(idx2, 1);
                                          setcase_row(temp)
                                        } else { }
                                      }}
                                    >
                                      <MdDelete />
                                    </div>
                                  </IconContext.Provider>
                                </div>
                              </Col>
                            </Row>
                          );
                        })}
                        <div>
                          <span
                            className="link-text"
                            onClick={() => {
                              let tmp1 = [...case_row];
                              tmp1.push(["", ""]);
                              setcase_row(tmp1);
                            }}
                          >
                            <IconContext.Provider
                              value={{
                                className: "link-text",
                              }}
                            >
                              <MdAdd />
                            </IconContext.Provider>
                            Add Another Rate
                          </span>
                        </div>
                      </>
                    )}
                  </TabPane>

                  <TabPane tabId="02">
                    <Row>
                      <div className="main_container">
                        <Label>Domestic Rate</Label>
                        <Row>
                          <Col lg={3} md={4} sm={8}>
                            <div
                              style={{ display: "flex", flexDirection: "row" }}
                            >
                              <div
                                onClick={() => {
                                  setis_per_charge_surfc(!is_per_charge_surfc)
                                }}
                              >
                                {is_per_charge_surfc ? (
                                  <FiCheckSquare size={20} />
                                ) : (
                                  <FiSquare size={20} />
                                )
                                }
                              </div>
                              <Label className="header-child">&nbsp; % of Charge{" "}</Label>
                            </div>
                          </Col>
                          <Col lg={3}>
                            <div
                              onClick={() => {
                                setis_oda_surface(!is_oda_surface)
                              }}
                            >
                              {is_oda_surface ? (
                                <FiCheckSquare size={20} />
                              ) : (
                                <FiSquare size={20} />
                              )}
                              <Label className="header-child">&nbsp; ODA</Label>
                            </div>
                          </Col>
                        </Row>

                        {/* % of charges */}
                        {is_per_charge_surfc && (
                          <div>
                            <Label style={{ fontSize: 20 }}> % of Chrages </Label>
                            <Row>
                              <Col md={4}>
                                <Label className="header-child"> Charge Name</Label>
                              </Col>
                              <Col md={4}>
                                <Label className="header-child"> Category</Label>
                              </Col>
                              <Col md={2}>
                                <Label className="header-child"> Rate % </Label>
                              </Col>
                              <Col md={2}>
                                <Label className="header-child"> Delete</Label>
                              </Col>
                            </Row>
                            {per_charge_list_surface.map((per_chrg, idx) => {
                              return (
                                <Row key={idx}>
                                  <Col md={4}>
                                    <MultiRowSearchInput
                                      data_list={oth_charges_list}
                                      setdata_list={setoth_charges_list}
                                      data_item_s={per_charge_list_surface[idx][0]}
                                      page={ot_chg_page}
                                      setpage={setot_chg_page}
                                      setsearch_txt={setot_search_txt}
                                      error_message={"Please Select Any Option"}
                                      refresh={refresh}
                                      setrefresh={setrefresh}
                                      idx={idx}
                                      current_width="100%"
                                    />
                                  </Col>
                                  <Col md={4}>
                                    <Input
                                      key={idx}
                                      value={per_chrg[1]}
                                      type="select"
                                      onChange={(event) => {
                                        setrefresh(!refresh);
                                        per_chrg[1] = event.target.value;
                                      }}
                                      className="form-control-md"
                                      id="input"
                                    >
                                      <option value="" hidden></option>
                                      {per_charge_categories.map((itms, index) => {
                                        return (
                                          <option className="option"
                                            value={itms}
                                            key={index}
                                          >{itms}</option>
                                        )
                                      })}
                                    </Input>
                                  </Col>
                                  <Col md={2}>
                                    {per_chrg[1] === "% of client invoice" ? (
                                      <Input
                                        key={idx}
                                        step={0.01}
                                        classname="form-control-md"
                                        id="input"
                                        placeholder="Enter Rate %"
                                        type="number"
                                        value={per_chrg[2]}
                                        onChange={(val) => {
                                          per_chrg[2] = val.target.value;
                                          setrefresh(!refresh);
                                        }}
                                        disabled={false}
                                      />
                                    ) : (
                                      <div
                                        style={{
                                          paddingTop: 8,
                                          paddingBottom: 8,
                                        }}
                                      >
                                        -
                                      </div>
                                    )}
                                  </Col>
                                  <Col md={2}>
                                    {idx > 0 ? (
                                      <div
                                        style={{
                                          display: "flex",
                                          justifyContent: "center",
                                          alignItems: "center",
                                          height: 34,
                                        }}
                                      >
                                        <IconContext.Provider
                                          value={{ color: "red", size: "20px" }}
                                        >
                                          <div
                                            style={{ cursor: "pointer" }}
                                            onClick={() => {
                                              if (
                                                window.confirm("Do you want to delete this row?") === true
                                              ) {
                                                let temp = [...per_charge_list_surface,]
                                                if (per_charge_list_surface[idx].length > 3) {
                                                  setper_del_ids_surfc([...per_del_ids_surfc, per_charge_list_surface[idx][3]]);
                                                }
                                                temp.splice(idx, 1);
                                                setper_charge_list_surface(temp)
                                              } else {

                                              }
                                              setrefresh(!refresh)
                                            }}
                                          >
                                            <MdDelete />
                                          </div>

                                        </IconContext.Provider>
                                      </div>
                                    ) : (
                                      <div
                                        style={{
                                          display: "flex",
                                          justifyContent: "center",
                                          alignItems: "center",
                                          height: 34,
                                        }}
                                      >
                                        {"-"}
                                      </div>
                                    )
                                    }
                                  </Col>
                                </Row>
                              )
                            })}
                            {/* % Charge Add button */}
                            <div style={{ margin: "1px 0 10px 0" }}>
                              <span
                                className="link-text"
                                onClick={() => {
                                  let per_tmp_lst = [["", ""], "", ""];
                                  setper_charge_list_surface([...per_charge_list_surface, per_tmp_lst])
                                  setrefresh(!refresh);
                                }}
                                style={{
                                  fontSize: "14px",
                                  color: "purple",
                                  cursor: "pointer",
                                }}
                              >
                                <IconContext.Provider value={{ className: "link-text" }}>
                                  <MdAdd />
                                </IconContext.Provider>
                                Add another % of Charge
                              </span>

                            </div>
                          </div>
                        )}
                        <Row style={{ margin: "5px 0 5px 0 " }}>
                          <Col lg={4} md={6} sm={6}>
                            <div className="mb-2">
                              <Label> Domestic Rate Types *</Label>
                              <NSearchInput
                                data_list={dom_rate_category_list}
                                data_item_s={dom_rate_category}
                                set_data_item_s={setdom_rate_category}
                                show_search={false}
                                error_message={"Select Domestic Rate Category"}
                              />
                            </div>
                          </Col>

                          <Col lg={3} md={6} sm={6}>
                            <div className="mb-2">
                              <Label className="header-child"> Rate Type </Label>
                              <NSearchInput
                                data_list={dom_rate_type_list}
                                data_item_s={dom_rate_type}
                                set_data_item_s={setdom_rate_type}
                                show_search={false}
                                error_message={"Select ODA Rate"}
                              />

                            </div>
                          </Col>

                        </Row>
                        {(dom_rate_category === "City to City" ||
                          dom_rate_category === "Both") && (
                            <>
                              <div style={{ overflowX: "scroll", }}>
                                {/* Domestic City table(surface) */}
                                <Table className="table-grid">
                                  <thead>
                                    <tr>
                                      <th style={{
                                        width: "2rem",
                                        textAlign: "center",
                                        paddingLeft: "2px",
                                        paddingRight: "2px",
                                      }}
                                        rowSpan={2}
                                      >
                                        SL
                                      </th>
                                      <th style={{
                                        width: "8rem",
                                        textAlign: "center",
                                        paddingLeft: "4px",
                                        paddingRight: "4px",
                                      }}
                                        rowSpan={2}
                                      >
                                        Origin City
                                      </th>
                                      <th style={{
                                        width: "8rem",
                                        textAlign: "center",
                                        paddingLeft: "6px",
                                        paddingRight: "4px",
                                      }}
                                        rowSpan={2}
                                      >
                                        Destination City
                                      </th>
                                      <th style={{
                                        width: "25rem",
                                        textAlign: "center",
                                        paddingLeft: "2px",
                                        paddingRight: "2px",
                                      }}
                                        colSpan={cc_rate_call_span + fillterd_charge_list.length + oda_selected}
                                      >
                                        Cold Chain
                                      </th>
                                      <th style={{
                                        width: "25rem",
                                        textAlign: "center",
                                        paddingLeft: "2px",
                                        paddingRight: "2px",
                                      }}
                                        colSpan={ncc_rate_call_span + fillterd_charge_list.length + oda_selected}
                                      >
                                        Non-Cold Chain
                                      </th>
                                      <th style={{
                                        width: "2rem",
                                        textAlign: "center",
                                        paddingLeft: "6px",
                                        paddingRight: "4px",
                                      }}
                                        rowSpan={2}
                                      >
                                        Delete
                                      </th>
                                    </tr>
                                    <tr>
                                      <th
                                        style={{
                                          width: "2rem",
                                          alignItems: "center",
                                          paddingLeft: "2px",
                                          paddingRight: "2px",
                                        }}>
                                        Rate Per Kg
                                      </th>
                                      {dom_rate_type === "Upto" && (
                                        <th style={{
                                          width: "2rem",
                                          alignItems: "center",
                                          paddingLeft: "2px",
                                          paddingRight: "2px",
                                        }}>
                                          Minimum Box
                                        </th>
                                      )}
                                      {dom_rate_type !== "Flat" && (
                                        <th style={{
                                          width: "2rem",
                                          alignItems: "center",
                                          paddingLeft: "2px",
                                          paddingRight: "2px",
                                        }}>
                                          Minimum Amount
                                        </th>
                                      )}
                                      {is_oda_surface && (
                                        <th style={{
                                          width: "2rem",
                                          alignItems: "center",
                                          paddingLeft: "2px",
                                          paddingRight: "2px",
                                        }}>
                                          ODA
                                        </th>
                                      )}
                                      {fillterd_charge_list.length > 0 && (
                                        <>
                                          {fillterd_charge_list.map((itam, index) => {
                                            return (
                                              <th style={{
                                                width: "2rem",
                                                alignItems: "center",
                                                paddingLeft: "2px",
                                                paddingright: "2px",
                                              }}>
                                                {itam[0][1]} (in %)
                                              </th>
                                            )
                                          })}
                                        </>
                                      )}
                                      <th style={{
                                        width: "2rem",
                                        alignItems: "center",
                                        paddingLeft: "2px",
                                        paddingRight: "2px"
                                      }}>
                                        Rate Per Kg
                                      </th>
                                      {dom_rate_type === "Upto" && (
                                        <th style={{
                                          width: "2rem",
                                          alignItems: "center",
                                          paddingLeft: "2px",
                                          paddingRight: "2px",
                                        }}>
                                          Minimum Box
                                        </th>
                                      )}
                                      {dom_rate_type !== "Flat" && (
                                        <th style={{
                                          width: "2rem",
                                          alignItems: "center",
                                          paddingLeft: "2px",
                                          paddingRight: "2px",
                                        }}>
                                          Minimum Amount
                                        </th>
                                      )}
                                      {is_oda_surface && (
                                        <th style={{
                                          width: "2rem",
                                          alignItems: "center",
                                          paddingLeft: "2px",
                                          paddingRight: "2px",
                                        }}>
                                          ODA
                                        </th>
                                      )}
                                      {fillterd_charge_list.length > 0 && (
                                        <>
                                          {fillterd_charge_list.map((itam, indx) => {
                                            return (
                                              <th style={{
                                                width: "2rem",
                                                alignItems: "center",
                                                paddingLeft: "2px",
                                                paddingRight: "2px",
                                              }}>
                                                {itam[0][1]} ( in % )
                                              </th>
                                            )
                                          })}
                                        </>
                                      )}
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {datalist.map((itm, idx) => {
                                      return (
                                        <tr key={idx}>
                                          <td>{idx + 1}</td>
                                          {/* for origin & destination city */}
                                          {itm[0].map((v, i) => {
                                            return (
                                              <td key={i}>
                                                <MultiRowSearchInput
                                                  data_list={city_list}
                                                  setdata_list={setcity_list}
                                                  data_item_s={datalist[idx][0][i]}
                                                  page={city_page_no}
                                                  setpage={setcity_page_no}
                                                  setsearch_txt={setcity_search_itm}
                                                  error_message={"Please select any option"}
                                                  refresh={refresh}
                                                  setrefresh={setrefresh}
                                                  current_width={"180px"}
                                                  idx={idx}
                                                />
                                              </td>
                                            )
                                          })}
                                          {/* For Cold Chain */}
                                          {itm[1].map((v, i) => {
                                            if (i === 0) {
                                              return (
                                                <td key={i}>
                                                  <input
                                                    value={datalist[idx][1][i]}
                                                    onChange={(val) => {
                                                      datalist[idx][1][i] = val.target.value;
                                                      const files = val.target.files;
                                                      setrefresh(!refresh);
                                                    }}
                                                    className="input"
                                                    type="number"
                                                    min={0}
                                                    step="0.5"
                                                    accept=".csv,.xlsx,.xls"
                                                    name="voucher_amount"
                                                    placeholder="Enter value"
                                                    style={{
                                                      borderWidth: 0,
                                                      width: "2.5rem",
                                                    }}
                                                  />
                                                </td>
                                              )
                                            }
                                            if (i === 1 && dom_rate_type === "Upto") {
                                              return (
                                                <td key={i}>
                                                  <input
                                                    value={datalist[idx][1][i]}
                                                    onChange={(val) => {
                                                      datalist[idx][1][i] = val.target.value;
                                                      setrefresh(!refresh);
                                                    }}
                                                    type="number"
                                                    min={0}
                                                    name="voucher_amount"
                                                    placeholder="Enter Value"
                                                    style={{
                                                      borderWidth: 0,
                                                      width: "2.5rem",
                                                    }}
                                                  />
                                                </td>
                                              )
                                            }
                                            if (i === 2 && dom_rate_type !== "Flat") {
                                              return (
                                                <td key={i}>
                                                  <input
                                                    value={datalist[idx][1][i]}
                                                    onChange={(val) => {
                                                      datalist[idx][1][i] = val.target.value;
                                                      setrefresh(!refresh);
                                                    }}
                                                    type="number"
                                                    min={0}
                                                    step={"0.5"}
                                                    name="voucher_amount"
                                                    placeholder="Enter Value"
                                                    style={{
                                                      borderWidth: 0,
                                                      width: "2.5rem",
                                                    }}
                                                  />
                                                </td>
                                              )
                                            }
                                            if (i === 3 && is_oda_surface) {
                                              return (
                                                <td key={i} >
                                                  <input
                                                    value={datalist[idx][1][i]}
                                                    onChange={(val) => {
                                                      datalist[idx][1][i] = val.target.value;
                                                      setrefresh(!refresh);
                                                    }}
                                                    min={0}
                                                    step="0.5"
                                                    type="number"
                                                    name="voucher_amount"
                                                    placeholder="Enter Value"
                                                    style={{
                                                      borderWidth: 0,
                                                      width: "2.5rem",
                                                    }}
                                                  />
                                                </td>
                                              )
                                            }
                                          })}
                                          {fillterd_charge_list.map((item2, index2) => {
                                            return (
                                              <td key={index2}>
                                                <input
                                                  value={datalist[idx][1][4 + index2]}
                                                  onChange={(val) => {
                                                    datalist[idx][1][4 + index2] = val.target.value;
                                                    setrefresh(!refresh);
                                                  }}
                                                  type="number"
                                                  min={0}
                                                  step={0.01}
                                                  name="charge"
                                                  placeholder="Enter Value"
                                                  style={{
                                                    borderWidth: 0,
                                                    width: "2.5rem",
                                                  }}
                                                />
                                              </td>
                                            )
                                          })}
                                          {/* For Non-Cold Chain */}
                                          {itm[2].map((v, i) => {
                                            if (i === 0) {
                                              return (
                                                <td key={i}>
                                                  <input
                                                    value={datalist[idx][2][i]}
                                                    onChange={(val) => {
                                                      datalist[idx][2][i] = val.target.value;
                                                      setrefresh(!refresh);
                                                    }}
                                                    type="number"
                                                    min={0}
                                                    step="0.5"
                                                    name="voucher_name"
                                                    placeholder="Enter Value"
                                                    style={{
                                                      borderWidth: 0,
                                                      width: "2.5rem",
                                                    }}
                                                  />
                                                </td>
                                              )
                                            }
                                            if (i === 1 && dom_rate_type === "Upto") {
                                              return (
                                                <td key={i}>
                                                  <input
                                                    value={datalist[idx][2][i]}
                                                    onChange={(val) => {
                                                      datalist[idx][2][i] = val.target.value;
                                                      setrefresh(!refresh);
                                                    }}
                                                    type="number"
                                                    min={0}
                                                    name="voucher_amount"
                                                    placeholder="Enter Value"
                                                    style={{
                                                      borderWidth: 0,
                                                      width: "2.5rem",
                                                    }}
                                                  />
                                                </td>
                                              )
                                            }
                                            if (i === 2 && dom_rate_type !== "Flat") {
                                              return (
                                                <td key={i}>
                                                  <input
                                                    value={datalist[idx][2][i]}
                                                    onChange={(val) => {
                                                      datalist[idx][2][i] = val.target.value;
                                                      setrefresh(!refresh);
                                                    }}
                                                    type="number"
                                                    min={0}
                                                    name="voucher_name"
                                                    placeholder="Enter Value"
                                                    style={{
                                                      borderWidth: 0,
                                                      width: "2.5rem",
                                                    }}
                                                  />
                                                </td>
                                              )
                                            }
                                            if (i === 3 && is_oda_surface) {
                                              return (
                                                <td key={i}>
                                                  <input
                                                    value={datalist[idx][2][i]}
                                                    onChange={(val) => {
                                                      datalist[idx][2][i] = val.target.value;
                                                      setrefresh(!refresh);
                                                    }}
                                                    type="number"
                                                    min={0}
                                                    step="0.5"
                                                    name="voucher_amount"
                                                    placeholder="Enter Value"
                                                    style={{
                                                      borderWidth: 0,
                                                      width: "2.5rem",
                                                    }}
                                                  />
                                                </td>
                                              )
                                            }
                                          })}
                                          {fillterd_charge_list.map((itam2, index2) => {
                                            return (
                                              <td key={index2}>
                                                <input
                                                  value={datalist[idx][2][4 + index2] || ""}
                                                  onChange={(val) => {
                                                    datalist[idx][2][4 + index2] = val.target.value;
                                                    setrefresh(!refresh);
                                                  }}
                                                  type="number"
                                                  min={0}
                                                  step={0.01}
                                                  name="Ncc_charge"
                                                  placeholder="Enter Value"
                                                  style={{
                                                    borderWidth: 0,
                                                    width: "2.5rem"
                                                  }}
                                                />
                                              </td>
                                            )
                                          })}
                                          <td
                                            style={{
                                              color: "red",
                                              cursor: "pointer",
                                              size: "50px",
                                            }}
                                            onClick={() => {
                                              delete_row_city(idx);
                                            }}
                                          >
                                            <MdDelete />
                                          </td>
                                        </tr>
                                      )
                                    })}
                                  </tbody>
                                </Table>
                              </div>
                              {/* Action Button */}
                              <div className="action_container">
                                <Button
                                  style={{ margin: "8px" }}
                                  type="button"
                                  className="btn btn-info m-1 cu_btn"
                                  onClick={() => {
                                    add_new_row_city();
                                  }}
                                >
                                  Add New Row
                                </Button>
                                {/* Import Button  */}
                                <Button
                                  style={{ margin: "8px" }}
                                  type='button'
                                  className="btn btn-info m-1 cu_btn"
                                  onClick={() => {
                                    setshow(true);
                                    setimport_for("Surface_city");
                                  }}
                                >
                                  Import
                                </Button>
                                <Button
                                  style={{ margin: "8px" }}
                                  type="button"
                                  className="btn btn-info m-1 cu_btn"
                                  onClick={() => {
                                    exportBillingDataSurfaceCity()
                                  }}
                                >
                                  Export
                                </Button>
                              </div>
                            </>
                          )
                        }
                        {(dom_rate_category === "Zone to Zone" || dom_rate_category === "Both") && (
                          <>
                            <div style={{
                              overflowX: "scroll",
                            }}>
                              <table className="table-grid">
                                <thead>
                                  <tr>
                                    <th style={{
                                      width: "2rem",
                                      textAlign: "center",
                                      paddingLeft: "2px",
                                      paddingRight: "2px"
                                    }}
                                      rowSpan={2}
                                    >
                                      SL
                                    </th>
                                    <th style={{
                                      width: "8rem",
                                      textAlign: "center",
                                      paddingLeft: "4px",
                                      paddingRight: "4px",
                                    }}
                                      rowSpan={2}
                                    >
                                      Origin Zone
                                    </th>
                                    <th style={{
                                      width: "8rem",
                                      textAlign: "center",
                                      paddingLeft: "6px",
                                      paddingRight: "4px",
                                    }}
                                      rowSpan={2}
                                    >
                                      Destination Zone
                                    </th>
                                    <th style={{
                                      width: "25rem",
                                      textAlign: "center",
                                      paddingLeft: "2px",
                                      paddingRight: "2px",
                                    }}
                                      colSpan={cc_rate_call_span + fillterd_charge_list.length + oda_selected}
                                    >
                                      Cold Chain
                                    </th>
                                    <th style={{
                                      width: "25rem",
                                      textAlign: "center",
                                      paddingLeft: "2px",
                                      paddingRight: "2px",
                                    }}
                                      colSpan={ncc_rate_call_span + fillterd_charge_list.length + oda_selected}
                                    >
                                      Non-Cold Chain
                                    </th>
                                    <th style={{
                                      width: "2rem",
                                      textAlign: "center",
                                      paddingLeft: "6px",
                                      paddingRight: "4px",
                                    }}
                                      rowSpan={2}>
                                      Delete
                                    </th>
                                  </tr>
                                  <tr>
                                    <th style={{
                                      width: "2rem",
                                      textAlign: "center",
                                      paddingLeft: "2px",
                                      paddingRight: "2px",
                                    }}>
                                      Rate Per Kg
                                    </th>
                                    {dom_rate_type === "Upto" && (
                                      <th style={{
                                        width: "2rem",
                                        textAlign: "center",
                                        paddingLeft: "2px",
                                        paddingRight: "2px",
                                      }}>
                                        Minimum Box
                                      </th>
                                    )}
                                    {dom_rate_type !== "Flat" && (
                                      <th style={{
                                        width: "2rem",
                                        textAlign: "center",
                                        paddingLeft: "2px",
                                        paddingRight: "2px",
                                      }}>
                                        Minimum Amount
                                      </th>
                                    )}
                                    {is_oda_surface && (
                                      <th style={{
                                        width: "2rem",
                                        textAlign: "center",
                                        paddingLeft: "2px",
                                        paddingRight: "2px",
                                      }}>
                                        ODA
                                      </th>
                                    )}
                                    {fillterd_charge_list.length > 0 && (
                                      <>
                                        {fillterd_charge_list.map((itam, indx) => {
                                          return (
                                            <th style={{
                                              width: "2rem",
                                              textAlign: "center",
                                              paddingLeft: "2px",
                                              paddingRight: "2px"
                                            }}>
                                              {itam[0][1]} (in %)
                                            </th>
                                          )
                                        })}

                                      </>
                                    )}
                                    <th
                                      style={{
                                        width: "2rem",
                                        textAlign: "center",
                                        paddingLeft: "2px",
                                        paddingRight: "2px",
                                      }}
                                    >
                                      Rate Per Kg
                                    </th>

                                    {dom_rate_type === "Upto" && (
                                      <th
                                        style={{
                                          width: "2rem",
                                          textAlign: "center",
                                          paddingLeft: "2px",
                                          paddingRight: "2px",
                                        }}
                                      >
                                        Minimum Box
                                      </th>
                                    )}

                                    {dom_rate_type !== "Flat" && (
                                      <th
                                        style={{
                                          width: "2rem",
                                          textAlign: "center",
                                          paddingLeft: "2px",
                                          paddingRight: "2px",
                                        }}
                                      >
                                        Minimum Amount
                                      </th>
                                    )}

                                    {is_oda_surface && (
                                      <th
                                        style={{
                                          width: "2rem",
                                          textAlign: "center",
                                          paddingLeft: "2px",
                                          paddingRight: "2px",
                                        }}
                                      >
                                        ODA
                                      </th>
                                    )}
                                    {fillterd_charge_list.length > 0 && (
                                      <>
                                        {fillterd_charge_list.map((itam, indx) => {
                                          return (
                                            <th
                                              style={{
                                                width: "2rem",
                                                textAlign: "center",
                                                paddingLeft: "2px",
                                                paddingRight: "2px",
                                              }}
                                            >
                                              {itam[0][1]} (in %)
                                            </th>
                                          );
                                        }
                                        )}
                                      </>
                                    )}
                                  </tr>
                                </thead>
                                <tbody>
                                  {datalist1.map((itm, idx) => {
                                    return (
                                      <tr key={idx}>
                                        <td>{idx + 1}</td>
                                        {/* For Origin city & destination */}
                                        {itm[0].map((v, i) => {
                                          return (
                                            <td key={i}>
                                              <MultiRowSearchInput
                                                data_list={zone_list}
                                                setdata_list={setzone_list}
                                                data_item_s={datalist1[idx][0][i]}
                                                page={zone_page_no}
                                                setpage={setzone_page_no}
                                                setsearch_txt={setzone_search_itm}
                                                error_message={"Please select any option"}
                                                refresh={refresh}
                                                setrefresh={setrefresh}
                                                current_width={"180px"}
                                                idx={idx}
                                              />
                                            </td>
                                          )
                                        })}
                                        {/* For Cold Chain */}
                                        {itm[1].map((v, i) => {
                                          if (i === 0) {
                                            return (
                                              <td key={i}>
                                                <input
                                                  value={datalist1[idx][1][i]}
                                                  onChange={(val) => {
                                                    datalist1[idx][1][i] = val.target.value;
                                                    setrefresh(!refresh);
                                                    const files =
                                                      val.target.files;

                                                  }}
                                                  className="input"
                                                  type="number"
                                                  min={0}
                                                  step="0.5"
                                                  name="voucher_amount"
                                                  accept=".csv,.xlsx,.xls"
                                                  placeholder="Enter Value"
                                                  style={{
                                                    borderWidth: 0,
                                                    width: "2.5rem",
                                                  }}
                                                />
                                              </td>
                                            )
                                          }
                                          if (i === 1 && dom_rate_type === "Upto") {
                                            return (
                                              <td key={i}>
                                                <input
                                                  value={datalist1[idx][1][i]}
                                                  onChange={(val) => {
                                                    datalist1[idx][1][i] = val.target.value;
                                                    setrefresh(!refresh);
                                                  }}
                                                  type="number"
                                                  min={0}
                                                  name="voucher_amount"
                                                  placeholder="Enter Value"
                                                  style={{
                                                    borderWidth: 0,
                                                    width: "2.5rem",
                                                  }}
                                                />
                                              </td>
                                            )
                                          }
                                          if (i === 2 && dom_rate_type !== "Flat") {
                                            return (
                                              <td key={i}>
                                                <input
                                                  value={datalist1[idx][1][i]}
                                                  onChange={(val) => {
                                                    datalist1[idx][1][i] = val.target.value;
                                                    setrefresh(!refresh);
                                                  }}
                                                  type="number"
                                                  min={0}
                                                  step={"0.5"}
                                                  name=""
                                                  placeholder="Enter Value"
                                                  style={{
                                                    borderWidth: 0,
                                                    width: "2.5rem",
                                                  }}
                                                />
                                              </td>
                                            )
                                          }
                                          if (i === 3 && is_oda_surface) {
                                            return (
                                              <td key={i}>
                                                <input
                                                  value={datalist1[idx][1][i]}
                                                  onChange={(val) => {
                                                    datalist1[idx][1][i] = val.target.value;
                                                    setrefresh(!refresh);
                                                  }}
                                                  min={0}
                                                  step="0.5"
                                                  type="number"
                                                  name=""
                                                  placeholder="Enter Value"
                                                  style={{
                                                    borderWidth: 0,
                                                    width: "2.5rem",
                                                  }}
                                                />
                                              </td>
                                            )
                                          }
                                        })}
                                        {fillterd_charge_list.map((itam2, index2) => {
                                          return (
                                            <td key={index2}>
                                              <input
                                                value={datalist1[idx][1][4 + index2] || ""}
                                                onChange={(val) => {
                                                  datalist1[idx][1][4 + index2] = val.target.value;
                                                  setrefresh(!refresh);
                                                }}
                                                type="number"
                                                min={0}
                                                step={0.01}
                                                name="charge"
                                                placeholder="Enter Value"
                                                style={{
                                                  borderWidth: 0,
                                                  width: "2.5rem",
                                                }}
                                              />
                                            </td>
                                          )
                                        })}
                                        {/* For Non Cold Chain */}
                                        {itm[2].map((v, i) => {
                                          if (i === 0) {
                                            return (
                                              <td key={i}>
                                                <input
                                                  value={datalist1[idx][2][i]}
                                                  onChange={(val) => {
                                                    datalist1[idx][2][i] = val.target.value;
                                                    setrefresh(!refresh);
                                                  }}
                                                  type="number"
                                                  min={0}
                                                  step="0.5"
                                                  name=""
                                                  placeholder="Enter Value"
                                                  style={{
                                                    borderWidth: 0,
                                                    width: "2.5rem",
                                                  }}
                                                />
                                              </td>
                                            )
                                          }
                                          if (i === 1 && dom_rate_type === "Upto") {
                                            return (
                                              <td key={i}>
                                                <input
                                                  value={datalist1[idx][2][i]}
                                                  onChange={(val) => {
                                                    datalist1[idx][2][i] = val.target.value;
                                                    setrefresh(!refresh);
                                                  }}
                                                  type="number"
                                                  min={0}
                                                  name=""
                                                  placeholder="Enter Value"
                                                  style={{
                                                    borderWidth: 0,
                                                    width: "2.5rem",
                                                  }}
                                                />
                                              </td>
                                            )
                                          }
                                          if (i === 2 && dom_rate_type !== "Flat") {
                                            return (
                                              <td key={i}>
                                                <input
                                                  value={datalist1[idx][2][i]}
                                                  onChange={(val) => {
                                                    datalist1[idx][2][i] = val.target.value;
                                                    setrefresh(!refresh);
                                                  }}
                                                  type="number"
                                                  min={0}
                                                  step={"0.5"}
                                                  name=""
                                                  placeholder="Enter Value"
                                                  style={{
                                                    borderWidth: 0,
                                                    width: "2.5rem",
                                                  }}
                                                />
                                              </td>
                                            )
                                          }
                                          if (i === 3 && is_oda_surface) {
                                            return (
                                              <td key={i}>
                                                <input
                                                  value={datalist1[idx][2][i]}
                                                  onChange={(val) => {
                                                    datalist1[idx][2][i] = val.target.value;
                                                    setrefresh(!refresh);
                                                  }}
                                                  type="number"
                                                  min={0}
                                                  step="0.5"
                                                  name=""
                                                  placeholder="Enter Value"
                                                  style={{
                                                    borderWidth: 0,
                                                    width: "2.5rem",
                                                  }}
                                                />

                                              </td>
                                            )
                                          }
                                        })}
                                        {fillterd_charge_list.map((itam1, index3) => {
                                          return (
                                            <td key={index3}>
                                              <input
                                                value={datalist1[idx][2][4 + index3] || ""}
                                                onChange={(val) => {
                                                  datalist1[idx][2][4 + index3] = val.target.value;
                                                  setrefresh(!refresh);
                                                }}
                                                type="number"
                                                min={0}
                                                step={0.01}
                                                name="Ncc_charge"
                                                placeholder="Enter Value"
                                                style={{
                                                  borderWidth: 0,
                                                  width: "2.5rem",
                                                }}
                                              />
                                            </td>
                                          )
                                        })}
                                        <td
                                          style={{
                                            color: "red",
                                            cursor: "pointer",
                                            size: "50px",
                                          }}
                                          onClick={() => {
                                            delete_row_zone(idx);
                                          }}
                                        >
                                          <MdDelete />
                                        </td>
                                      </tr>
                                    )
                                  })}
                                </tbody>
                              </table>
                            </div>
                            {/* //Action Btn */}
                            <div className="action_container">
                              <Button style={{
                                margin: "8px"
                              }}
                                type="button"
                                className="btn btn-info m-1 cu_btn"
                                onClick={() => {
                                  add_new_row_zone();
                                }}
                              >
                                Add New Row
                              </Button>
                              <Button
                                style={{ margin: "8px" }}
                                type="button"
                                className="btn btn-info m-1 cu_btn"
                                onClick={() => {
                                  setshow(true);
                                  setimport_for("Surface_zone")
                                }}
                              >
                                Import
                              </Button>
                              <Button style={{
                                margin: "8px"
                              }}
                                type="button"
                                className="btn btn-info m-1 cu_btn"
                                onClick={() => {
                                  exportBillingDataSurfaceZone();
                                }}
                              >
                                Export
                              </Button>
                            </div>
                          </>

                        )}
                      </div>
                    </Row>

                  </TabPane>
                </TabContent>
              </TabPane>
            )}
            {is_cargo && (
              <TabPane tabId="4">
                <span> Work Under Progress</span>
              </TabPane>
            )}
            {is_train && (
              <TabPane tabId="5">
                <span> Work Under Progress</span>
              </TabPane>
            )}
            {is_courier && (
              <TabPane tabId="6">
                <span> Work Under Progress</span>
              </TabPane>
            )}
          </TabContent>
        </CardBody>
      </Col>

      <Modal
        contentClassName="content-test"
        show={show}
        onHide={() => {
          setshow(false);
        }}
        size="xl"
      >
        <Modal.Header
          closeButton
        //  style={{width: '90vw', backgroundColor:'red'}}
        >
          {/* <!-- <Modal.Title>Update Your Image:</Modal.Title> --> */}
        </Modal.Header>
        <Modal.Body
        // style={{width: '90vw', backgroundColor:'red'}}
        >
          <div style={{ margin: "30px", padding: "20px" }}>
            <div>
              {/* Upload file to import Data */}
              <div
                style={{ textAlign: "center", padding: "10px", margin: "0px" }}
              >
                <h4 style={{ fontSize: "28px" }}>
                  <strong>--- Upload File ---</strong>
                </h4>
              </div>

              <div
                className="md-4"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <div style={{ marginRight: "10px" }}>
                  <Col lg={12}>
                    {/* <Label className="header-child">Upload Excel File</Label>
              <br /> */}
                    <Input type="file" onChange={handleFile}></Input>
                  </Col>
                </div>

                <div>
                  <Button
                    style={{
                      backgroundColor: "green",
                      color: "white",
                      width: "120px",
                      height: "36px",
                    }}
                    onClick={() => {
                      handleSubmit();
                    }}
                  >
                    Submit file
                  </Button>
                </div>
              </div>

              <div
                className="md-4 mt-3"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/* To Export Format */}
                <div>
                  <Button
                    style={{
                      backgroundColor: "green",
                      color: "white",
                      width: "120px",
                      height: "36px",
                    }}
                    onClick={() => {
                      if (import_for === "Local") {
                        exportBillingData();
                      } else if (import_for === "Air_City") {
                        exportBillingDataAirCity();
                      } else if (import_for === "Air_Zone") {
                        exportBillingDataAirZone();
                      }
                      // handleSubmit();
                    }}
                  >
                    Export Format
                  </Button>
                </div>

                <div
                  style={{
                    marginTop: 10,
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginRight: 20,
                    }}
                  >
                    <div
                      style={{
                        height: 15,
                        width: 15,
                        backgroundColor: "#FDE1E1",
                        marginRight: 5,
                      }}
                    >
                      {" "}
                    </div>{" "}
                    Entries With Bug{" "}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        height: 15,
                        width: 15,
                        backgroundColor: "#DCEDFC",
                        marginRight: 5,
                      }}
                    >
                      {" "}
                    </div>{" "}
                    Duplicate Entries{" "}
                  </div>
                </div>
              </div>

              <div
                style={{
                  color: "red",
                  textAlign: "center",
                  // marinTop: "20px",
                  fontSize: "16px",
                }}
              >
                {excelFileError}
              </div>
            </div>

            {/* Table  */}
            {excelData !== null ? (
              <>
                <div
                  style={{
                    overflowX: "scroll",
                    marginTop: "10px",
                  }}
                >
                  <Table className="table-grid">
                    <thead>
                      <tr>
                        <th
                          style={{
                            width: "2rem",
                            textAlign: "center",
                            paddingLeft: "2px",
                            paddingRight: "2px",
                          }}
                          rowSpan={2}
                        >
                          SL
                        </th>

                        {import_for === "Local" && (
                          <th
                            style={{
                              width: "20rem",
                              textAlign: "center",
                              paddingLeft: "4px",
                              paddingRight: "4px",
                            }}
                            rowSpan={2}
                          >
                            Associated Charge
                          </th>
                        )}

                        {import_for === "Air_City" && (
                          <>
                            <th
                              style={{
                                width: "20rem",
                                textAlign: "center",
                                paddingLeft: "4px",
                                paddingRight: "4px",
                              }}
                              rowSpan={2}
                            >
                              Origin City
                            </th>
                            <th
                              style={{
                                width: "20rem",
                                textAlign: "center",
                                paddingLeft: "4px",
                                paddingRight: "4px",
                              }}
                              rowSpan={2}
                            >
                              Destination City
                            </th>
                          </>
                        )}

                        {import_for === "Air_Zone" && (
                          <>
                            <th
                              style={{
                                width: "20rem",
                                textAlign: "center",
                                paddingLeft: "4px",
                                paddingRight: "4px",
                              }}
                              rowSpan={2}
                            >
                              Origin Zone
                            </th>
                            <th
                              style={{
                                width: "20rem",
                                textAlign: "center",
                                paddingLeft: "4px",
                                paddingRight: "4px",
                              }}
                              rowSpan={2}
                            >
                              Destination Zone
                            </th>
                          </>
                        )}

                        <th
                          style={{
                            width: "25rem",
                            textAlign: "center",
                            paddingLeft: "2px",
                            paddingRight: "2px",
                          }}
                          colSpan={cc_headers.length}
                        >
                          Cold Chain
                        </th>
                        <th
                          style={{
                            width: "25rem",
                            textAlign: "center",
                            paddingLeft: "2px",
                            paddingRight: "2px",
                          }}
                          colSpan={nc_headers.length}
                        >
                          Non Cold Chain
                        </th>
                      </tr>

                      <tr>
                        {cc_headers.map((itm, indx) => {
                          return (
                            <th
                              key={indx}
                              style={{
                                width: "2rem",
                                textAlign: "center",
                                paddingLeft: "2px",
                                paddingRight: "2px",
                              }}
                            >
                              {itm}
                            </th>
                          );
                        })}

                        {nc_headers.map((itam, inax) => {
                          return (
                            <th
                              key={inax}
                              style={{
                                width: "2rem",
                                textAlign: "center",
                                paddingLeft: "2px",
                                paddingRight: "2px",
                              }}
                            >
                              {itam}
                            </th>
                          );
                        })}
                      </tr>
                    </thead>

                    <tbody>
                      {local_datalisttmp.length > 0 &&
                        local_datalisttmp.map((itm, idx) => {
                          return (
                            <tr
                              key={idx}
                              // style={{backgroundColor: itm[0][0][0] ===''? 'red' : '' }}
                              className={
                                itm[0][0][0] === ""
                                  ? "table-danger"
                                  : "" + count_s[itm[0][0][1]] > 1
                                    ? "table-info"
                                    : ""
                              }
                            >
                              <td>{idx + 1}</td>

                              {/* For origin City & Destination City */}
                              {itm[0].map((v, i) => {
                                return (
                                  <td key={i}>
                                    <input
                                      value={local_datalisttmp[idx][0][i][1]}
                                      type="text"
                                      readOnly
                                      name="voucher_amount"
                                      placeholder="Enter Value"
                                      style={{
                                        borderWidth: 0,
                                        width: "2.5rem",
                                      }}
                                    />
                                  </td>
                                );
                              })}

                              {/* For COld Chain */}
                              {itm[1].map((v, i) => {
                                // if (i === 0) {
                                return (
                                  <td key={i}>
                                    <input
                                      value={local_datalisttmp[idx][1][i]}
                                      // onChange={(val) => {
                                      //   datalist[idx][1][i] = val.target.value;
                                      //   setrefresh(!refresh);
                                      // }}
                                      readOnly
                                      className="input"
                                      type="number"
                                      min={0}
                                      step="0.5"
                                      name="voucher_amount"
                                      placeholder="Enter Value"
                                      style={{
                                        borderWidth: 0,
                                        width: "2.5rem",
                                      }}
                                    />
                                  </td>
                                );
                              })}

                              {/*  For Non cold Chain */}
                              {itm[2].map((v, i) => {
                                return (
                                  <td key={i}>
                                    <input
                                      value={local_datalisttmp[idx][2][i]}
                                      // onChange={(val) => {
                                      //   datalist[idx][2][i] = val.target.value;
                                      //   setrefresh(!refresh);
                                      // }}
                                      readOnly
                                      type="number"
                                      min={0}
                                      step="0.5"
                                      name="voucher_amount"
                                      placeholder="Enter Value"
                                      style={{
                                        borderWidth: 0,
                                        width: "2.5rem",
                                      }}
                                    />
                                  </td>
                                );
                              })}
                            </tr>
                          );
                        })}

                      {datalisttmp.length > 0 &&
                        datalisttmp.map((itm, idx) => {
                          return (
                            <tr
                              key={idx}
                              // style={{backgroundColor: itm[0][0][0] ===''? 'red' : '' }}
                              className={
                                itm[0][0][0] === ""
                                  ? "table-danger"
                                  : "" + count_s[itm[0][0][1] + itm[0][1][1]] >
                                    1
                                    ? "table-info"
                                    : ""
                              }
                            >
                              <td>{idx + 1}</td>

                              {/* For origin City & Destination City */}
                              {itm[0].map((v, i) => {
                                return (
                                  <td key={i}>
                                    <input
                                      value={datalisttmp[idx][0][i][1]}
                                      type="text"
                                      readOnly
                                      name="voucher_amount"
                                      placeholder="Enter Value"
                                      style={{
                                        borderWidth: 0,
                                        width: "2.5rem",
                                      }}
                                    />
                                  </td>
                                );
                              })}

                              {/* For COld Chain */}
                              {itm[1].map((v, i) => {
                                // if (i === 0) {
                                return (
                                  <td key={i}>
                                    <input
                                      value={datalisttmp[idx][1][i]}
                                      // onChange={(val) => {
                                      //   datalist[idx][1][i] = val.target.value;
                                      //   setrefresh(!refresh);
                                      // }}
                                      readOnly
                                      className="input"
                                      type="number"
                                      min={0}
                                      step="0.5"
                                      name="voucher_amount"
                                      placeholder="Enter Value"
                                      style={{
                                        borderWidth: 0,
                                        width: "2.5rem",
                                      }}
                                    />
                                  </td>
                                );
                              })}

                              {/*  For Non cold Chain */}
                              {itm[2].map((v, i) => {
                                return (
                                  <td key={i}>
                                    <input
                                      value={datalisttmp[idx][2][i]}
                                      // onChange={(val) => {
                                      //   datalist[idx][2][i] = val.target.value;
                                      //   setrefresh(!refresh);
                                      // }}
                                      readOnly
                                      type="number"
                                      min={0}
                                      step="0.5"
                                      name="voucher_amount"
                                      placeholder="Enter Value"
                                      style={{
                                        borderWidth: 0,
                                        width: "2.5rem",
                                      }}
                                    />
                                  </td>
                                );
                              })}
                            </tr>
                          );
                        })}

                      {datalist1tmp.length > 0 &&
                        datalist1tmp.map((itm, idx) => {
                          return (
                            <tr
                              key={idx}
                              // style={{backgroundColor: itm[0][0][0] ===''? 'red' : '' }}
                              className={
                                itm[0][0][0] === ""
                                  ? "table-danger"
                                  : "" + count_s[itm[0][0][1] + itm[0][1][1]] >
                                    1
                                    ? "table-info"
                                    : ""
                              }
                            >
                              <td>{idx + 1}</td>

                              {/* For origin Zone & Destination Zone */}
                              {itm[0].map((v, i) => {
                                return (
                                  <td key={i}>
                                    <input
                                      value={datalist1tmp[idx][0][i][1]}
                                      type="text"
                                      readOnly
                                      name="voucher_amount"
                                      placeholder="Enter Value"
                                      style={{
                                        borderWidth: 0,
                                        width: "2.5rem",
                                      }}
                                    />
                                  </td>
                                );
                              })}

                              {/* For COld Chain */}
                              {itm[1].map((v, i) => {
                                // if (i === 0) {
                                return (
                                  <td key={i}>
                                    <input
                                      value={datalist1tmp[idx][1][i]}
                                      // onChange={(val) => {
                                      //   datalist[idx][1][i] = val.target.value;
                                      //   setrefresh(!refresh);
                                      // }}
                                      readOnly
                                      className="input"
                                      type="number"
                                      min={0}
                                      step="0.5"
                                      name="voucher_amount"
                                      placeholder="Enter Value"
                                      style={{
                                        borderWidth: 0,
                                        width: "2.5rem",
                                      }}
                                    />
                                  </td>
                                );
                              })}

                              {/*  For Non cold Chain */}
                              {itm[2].map((v, i) => {
                                return (
                                  <td key={i}>
                                    <input
                                      value={datalist1tmp[idx][2][i]}
                                      // onChange={(val) => {
                                      //   datalist[idx][2][i] = val.target.value;
                                      //   setrefresh(!refresh);
                                      // }}
                                      readOnly
                                      type="number"
                                      min={0}
                                      step="0.5"
                                      name="voucher_amount"
                                      placeholder="Enter Value"
                                      style={{
                                        borderWidth: 0,
                                        width: "2.5rem",
                                      }}
                                    />
                                  </td>
                                );
                              })}
                            </tr>
                          );
                        })}
                    </tbody>
                  </Table>
                </div>
                <div style={{ textAlign: "right", marginTop: "12px" }}>
                  <Button
                    style={{
                      background: "blue",
                      borderRadius: "8px",
                      margin: "10px",
                    }}
                    onClick={() => {
                      if (import_for === "Local") {
                        send_list_data();
                      } else if (import_for === "Air_City") {
                        send_list_data_air_city();
                      } else if (import_for === "Air_Zone") {
                        send_list_data_air_zone();
                      } else if (import_for === "Surface_City") {
                        send_list_data_surface_city();
                      } else if (import_for === "Surface_Zone") {
                        send_list_data_surface_zone();
                      }
                      setshow(false);
                    }}
                  >
                    Confirm Import
                  </Button>

                  <Button
                    style={{
                      background: "blue",
                      borderRadius: "8px",
                      margin: "10px",
                    }}
                    onClick={() => {
                      // navigate("/master/clients/addclient");
                      setshow(false);
                      setlocal_datalisttmp([]);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </>
            ) : null}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default BillingTab;
