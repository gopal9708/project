import React, { useEffect, useState } from "react";
import { Button, Col, Input, Label, Row } from "reactstrap";
import NSearchInput from "../../components/formComponent/nsearchInput/NSearchInput";
import { FiCheckSquare, FiSquare } from "react-icons/fi";
import { MdAdd } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IconContext } from "react-icons";

import MultiRowSearchInput from "../../components/formComponent/multiRowSearchInput/MultiRowSearchInput";
import "./Test.css";
import * as XLSX from "xlsx";

const Test = () => {
  // Redux States

  let dlist = [
    ["1", "", "", "", "5", "", "", "", "", "", "", "", "", ""],
    ["2", "", "", "", "5", "", "", "", "", "", "", "", "", ""],
    ["3", "", "", "", "5", "", "", "", "", "", "", "", "", ""],
    ["4", "", "", "", "5", "", "", "", "", "", "", "", "", ""],
  ];
  // Used for origin and destination city
  const [city_page_no, setcity_page_no] = useState(1);
  const [city_search_itm, setcity_search_itm] = useState("");
  const [city_list, setcity_list] = useState([
    [1, "Jamshedpur"],
    [2, "Ranchi"],
    [3, "Ghatshila"],
    [4, "Aditpur"],
    [5, "Parsodih"],
  ]);

  let alist = [
    [
      [
        ["", ""],
        ["", ""],
      ],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
    ],
    [
      [
        ["", ""],
        ["", ""],
      ],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
    ],
    [
      [
        ["", ""],
        ["", ""],
      ],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
    ],
    [
      [
        ["", ""],
        ["", ""],
      ],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
    ],
    [
      [
        ["", ""],
        ["", ""],
      ],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
    ],
    [
      [
        ["", ""],
        ["", ""],
      ],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
    ],
    [
      [
        ["", ""],
        ["", ""],
      ],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
    ],
    [
      [
        ["", ""],
        ["", ""],
      ],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
    ],
    [
      [
        ["", ""],
        ["", ""],
      ],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
    ],
    [
      [
        ["", ""],
        ["", ""],
      ],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
    ],
  ];

  let charge_list = [[["", ""], "", ""]];
  const [per_charge_list, setper_charge_list] = useState(charge_list);
  //  Additional Charges
  const [oth_charges_list, setoth_charges_list] = useState([
    [2, "charge3"],
    [4, "charge2"],
    [5, "charge1"],
  ]);
  const [ot_chg_page, setot_chg_page] = useState(1);
  const [ot_search_txt, setot_search_txt] = useState("");

  const [per_chg_page, setper_chg_page] = useState(1);
  const [per_chg_search_txt, setper_chg_search_txt] = useState("");
  const [per_charge_categories, setper_charge_categories] = useState([
    "% of client invoice",
    "% of other charges",
  ]);

  // USed for Import Feature
  const [imported_file, setimported_file] = useState(false);
  // on change states
  const [excelFile, setExcelFile] = useState(null);
  const [excelFileError, setExcelFileError] = useState(null);

  // submit
  const [excelData, setExcelData] = useState(null);
  // it will contain array of objects

  // handle File

  // const fileType=['application/vnd.ms-excel'];
  const fileType = [
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.xls",
    "text/csv",
  ];

  const handleFile = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      // console.log(selectedFile.type);
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setExcelFileError(null);
          setExcelFile(e.target.result);
        };
      } else {
        setExcelFileError("Please select only excel file types");
        setExcelFile(null);
      }
    } else {
      console.log("plz select your file");
    }
  };

  // submit function
  const handleSubmit = (e) => {
    // e.preventDefault();
    if (excelFile !== null) {
      setimported_file(true);
      const workbook = XLSX.read(excelFile, { type: "buffer" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      setExcelData(data);
      console.log("Excel Data", excelData);
    } else {
      setExcelData(null);
    }
  };
  //map the data list of excel app
  let mtarr = [];
  let add_data = [];
  if (excelData !== null) {
    excelData.forEach((element) => {
      // console.log("===============>>",element)
      mtarr = [
        [2, element.Origin_City, 3, element.Destination_City],
        [
          element.CC_Rate_Per_KG,
          element.Minimum_Amount,
          element.Minimum_Box,
          "",
          "",
        ],
        [
          element.NCC_Rate_Per_KG,
          element.Minimum_Amount_1,
          element.Minimum_Box_1,
          "",
          "",
        ],
      ];
      add_data.push(mtarr);
      // console.log("MY New Arr",mtarr)
    });
  }

  // console.log("Row FOrmate data", add_data);

  const [datalist, setdatalist] = useState(imported_file ? add_data : alist);
  // console.log("7777777777777777777777777777777", imported_file);

  const [refresh, setrefresh] = useState(false);

  //For Domestic
  const [dom_rate_category, setdom_rate_category] = useState("City to City");
  const [dom_rate_category_list] = useState([
    "City to City",
    "Zone to Zone",
    "Both",
  ]);

  // const [dom_rate_type_list, setdom_rate_type_list] = useState([
  //   "Flat",
  //   "Minimum",
  //   "Upto",
  // ]);
  // const [dom_rate_type, setdom_rate_type] = useState("");

  const [dom_rate_type_list, setdom_rate_type_list] = useState([
    "Flat",
    "Minimum",
    "Upto",
  ]);
  const [dom_rate_type, setdom_rate_type] = useState("Flat");

  //Check Box
  const [is_per_charge_air, setis_per_charge_air] = useState(false);
  const [is_oda, setis_oda] = useState(false);

  // GET charge

  // const getSecOthCharges = () => {
  //   let temp_lis = [...oth_charges_list];
  //   axios
  //     .get(
  //       ServerAddress +
  //         `master/all_charges/?search=${""}&p=${ot_chg_page}&records=${10}&charge_category=${[
  //           "OTHER CHARGE",
  //         ]}&charge_name_search=${ot_search_txt}`,
  //       {
  //         headers: { Authorization: `Bearer ${accessToken}` },
  //       }
  //     )
  //     .then((resp) => {
  //       console.log("Charge",resp.data)
  //       let data = resp.data.results;
  //       for (let index = 0; index < data.length; index++) {
  //         const chrg = data[index];
  //         temp_lis.push([chrg.id, toTitleCase(chrg.charge_name)]);
  //       }
  //       temp_lis = [...new Set(temp_lis.map((v) => `${v}`))].map((v) =>
  //         v.split(",")
  //       );
  //       setoth_charges_list(temp_lis);
  //     })
  //     .catch((err) => {
  //       alert(`Error Occur while getting secondary charges , ${err}`);
  //     });
  // };

  // useLayoutEffect(() => {
  //   getSecOthCharges();
  // }, [ot_chg_page, ot_search_txt]);

  const [cc_rate_call_span, setcc_rate_call_span] = useState(1);
  const [ncc_rate_call_span, setncc_rate_call_span] = useState(1);

  const [oda_selected, setoda_selected] = useState(0);
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
    if (is_oda) {
      setoda_selected(1);
    } else setoda_selected(0);
  }, [is_oda, dom_rate_type]);

  const [fillterd_charge_list, setfillterd_charge_list] = useState([]);
  useEffect(() => {
    if (per_charge_list) {
      let per_otch_tmp = per_charge_list.filter(
        (v) => v[1] === "% of other charges"
      );
      setfillterd_charge_list(per_otch_tmp);

      // console.log(
      //   "///|||\\\\",
      //   datalist[0][1].slice(4).length == fillterd_charge_list.length
      // );
      // if(datalist[0][1].slice(4).length == fillterd_charge_list.length) {
      //   datalist.map((ele,id) =>{
      //     ele[1].push("")
      //     ele[2].push("");
      //   })
      // }
      // if(fillterd_charge_list.length > 0) {
      //   fillterd_charge_list.map((ele,id) => {

      //     datalist[1].push("008");
      // ele[2].push("009");
      //   })
      // }
      // console.log("Fillterd Charge",fillterd_charge_list)
      console.log("Data List", datalist[1], datalist[2]);
    }
  }, [per_charge_list, refresh]);

  console.log("=>>>>>>", per_charge_list);

  // Function to add New ow in table
  const add_new_row = () => {
    // alert(" New Row Added ");
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

  const delete_row = (idx) => {
    // alert("delete",itm)
    let list_data = [...datalist];
    // const index = list_data.indexOf(itm)
    console.log("Index is -------------->>", idx);
    if (idx > -1) {
      console.log("delele==============>", list_data.splice(idx, 1));

      console.log("delete");
    }
    setdatalist(list_data);
  };
  console.log("=-=-=-=-=-==-=-==>>>>>>", datalist);
  console.log(
    "col Span Value of cc",
    cc_rate_call_span + fillterd_charge_list.length + oda_selected
  );
  console.log(
    "COl Span Value of NCC",
    ncc_rate_call_span + fillterd_charge_list.length + oda_selected
  );

  return (
    <>
      <div className="main_container">
        <Label>Domestic Rate</Label>

        <Row>
          <Col lg={3} md={4} sm={8}>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div onClick={() => setis_per_charge_air(!is_per_charge_air)}>
                {is_per_charge_air ? (
                  <FiCheckSquare size={20} />
                ) : (
                  <FiSquare size={20} />
                )}
              </div>
              <Label className="header-child">&nbsp; % of Charge </Label>
            </div>
          </Col>

          <Col lg={3} md={4} sm={8}>
            <div
              onClick={() => {
                setis_oda(!is_oda);
              }}
            >
              {is_oda ? <FiCheckSquare size={20} /> : <FiSquare size={20} />}
              <Label className="header-child">&nbsp; ODA</Label>
            </div>
          </Col>
        </Row>

        {/* % Of Charges */}

        {is_per_charge_air && (
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
                <Row
                  // className="pb-3"
                  key={idx}
                >
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
                      // style={{ marginBottom: "15px" }}
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
                      <div style={{ paddingTop: 8, paddingBottom: 8 }}>-</div>
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
                                let temp = [...per_charge_list];
                                temp.splice(idx, 1);
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
                          // marginBottom: 18,
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
                  let per_tmp_lst = [["", ""], "", "", ""];
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

        <Row style={{ margin: "5px 0 5px 0" }}>
          <Col lg={4} md={6} sm={6}>
            <div className="mb-2">
              <Label className="header-child">Domestic Rates Type*</Label>
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

        <div
          style={{
            overflowX: "scroll",
            //  height:"40%",
            // background: "red"
          }}
        >
          <table className="table-grid">
            <thead>
              <tr
              // style={{ lineHeight: 2, blocalWidth: 1 }}
              >
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

              <tr
              // style={{ lineHeight: 2, blocalWidth: 1 }}
              >
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

                {is_oda && (
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
                          {itam[0][1]}(in %)
                        </th>
                      );
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
                {dom_rate_type === "Upto" && (
                  <th
                    style={{
                      width: "2rem",
                      textAlign: "center",
                      paddingLeft: "2px",
                      paddingRight: "2px",
                    }}
                  >
                    Minmum Box
                  </th>
                )}

                {is_oda && (
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
                    })}
                  </>
                )}
              </tr>
            </thead>

            <tbody>
              {datalist.map((itm, idx) => {
                return (
                  <>
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      {/* <td>{itm[1]}</td> */}

                      {/* For origin City & Destination City */}
                      {itm[0].map((v, i) => {
                        return (
                          // <td key={i}>
                          //   <input
                          //     value={datalist[idx][0][i]}
                          //     onChange={(val) => {
                          //       datalist[idx][0][i] = val.target.value;
                          //       setrefresh(!refresh);
                          //     }}
                          //     type="text"
                          //     name="voucher_amount"
                          //     placeholder="Enter Value"
                          //     style={{ borderWidth: 0, width: "2.5rem" }}
                          //   />

                          // </td>

                          <td key={i}>
                            <MultiRowSearchInput
                              data_list={city_list}
                              setdata_list={setcity_list}
                              data_item_s={datalist[idx][0][i]}
                              page={city_page_no}
                              setpage={setcity_page_no}
                              setsearch_txt={setcity_search_itm}
                              error_message={"Please Select Any Option"}
                              refresh={refresh}
                              setrefresh={setrefresh}
                              current_width={"180px"}
                            />
                            {/* <input
                            value={datalist[idx][0][i]}
                            onChange={(val) => {
                              datalist[idx][0][i] = val.target.value;
                              setrefresh(!refresh);
                            }}
                            type="text"
                            name="voucher_amount"
                            placeholder="Enter Value"
                            style={{ borderWidth: 0, width: "2.5rem" }}
                          /> */}
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
                                  datalist[idx][1][i] = val.target.value;
                                  const files = val.target.files;
                                  console.log(
                                    "------------------------>>",
                                    files
                                  );
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
                                style={{ borderWidth: 0, width: "2.5rem" }}
                              />
                            </td>
                          );
                        }
                        if (i === 3 && is_oda) {
                          return (
                            <td key={i}>
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
                                style={{ borderWidth: 0, width: "2.5rem" }}
                              />
                            </td>
                          );
                        }

                        // if(fillterd_charge_list.length > 0){
                        // console.log("=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=->>",fillterd_charge_list)
                        // {alist.map((itam1, indx1) => {
                        //   console.log("Map working===>>",itam1)
                        //   return (
                        //     <td key={i}>

                        //       <input
                        //         value={datalist[idx][1][i]}
                        //         onChange={(val) => {
                        //           datalist[idx][1][i] = val.target.value;
                        //           setrefresh(!refresh);
                        //         }}
                        //         type="text"
                        //         name="voucher_amount"
                        //         placeholder="Enter Value"
                        //         style={{ borderWidth: 0, width: "2.5rem" }}
                        //       />
                        //     </td>
                        //   );
                        // })}

                        // }
                      })}

                      {fillterd_charge_list.map((itam1, index1) => {
                        return (
                          <td key={index1}>
                            <input
                              value={datalist[idx][1][4 + index1] || ""}
                              onChange={(val) => {
                                datalist[idx][1][4 + index1] = val.target.value;
                                setrefresh(!refresh);
                              }}
                              type="number"
                              min={0}
                              step={"0.5"}
                              name="charge"
                              placeholder="Enter Value"
                              style={{ borderWidth: 0, width: "2.5rem" }}
                            />
                          </td>
                        );
                      })}

                      {/*  For Non cold Chain */}

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
                                name="voucher_amount"
                                placeholder="Enter Value"
                                style={{ borderWidth: 0, width: "2.5rem" }}
                              />
                            </td>
                          );
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
                                step={"0.5"}
                                name="voucher_amount"
                                placeholder="Enter Value"
                                style={{ borderWidth: 0, width: "2.5rem" }}
                              />
                            </td>
                          );
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
                                step={"0.5"}
                                name="voucher_amount"
                                placeholder="Enter Value"
                                style={{ borderWidth: 0, width: "2.5rem" }}
                              />
                            </td>
                          );
                        }
                        if (i === 3 && is_oda) {
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
                                style={{ borderWidth: 0, width: "2.5rem" }}
                              />
                            </td>
                          );
                        }
                      })}

                      {fillterd_charge_list.map((itam1, index1) => {
                        return (
                          <td key={index1}>
                            <input
                              value={datalist[idx][2][4 + index1] || ""}
                              onChange={(val) => {
                                datalist[idx][2][4 + index1] = val.target.value;
                                setrefresh(!refresh);
                              }}
                              type="number"
                              min={0}
                              step={"0.5"}
                              name="Ncc_charge"
                              placeholder="Enter Value"
                              style={{ borderWidth: 0, width: "2.5rem" }}
                            />
                          </td>
                        );
                      })}
                      <td
                        style={{
                          color: "red",
                          cursor: "pointer",
                          size: "50px",
                        }}
                        onClick={() => {
                          delete_row(idx);
                        }}
                      >
                        <MdDelete />
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* //Action Btn */}
      <div className="action_container">
        <Button
          style={{ margin: "8px" }}
          type="button"
          className="btn btn-info m-1 cu_btn"
          onClick={() => {
            add_new_row();
          }}
        >
          Add New Row
        </Button>

        {/* Upload file to import Data */}
        <div className="md-4" style={{ display: "flex", marginTop: "4px" }}>
          <div>
            <Col lg={12}>
              {/* <Label className="header-child">Upload Excel File</Label> */}
              {/* <br /> */}
              <Input type="file" onChange={handleFile}></Input>
            </Col>
          </div>
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

        <Button
          style={{ margin: "8px" }}
          type="button"
          className="btn btn-info m-1 cu_btn"
        >
          Export
        </Button>
      </div>
    </>
  );
};

export default Test;
