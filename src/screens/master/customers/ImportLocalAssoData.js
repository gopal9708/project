import axios from "axios";
import React, { useState, useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Col, Input, Button, Table } from "reactstrap";
import * as XLSX from "xlsx";
import { ServerAddress } from "../../../constants/ServerAddress";

const ImportLocalAssoData = () => {
  const navigate = useNavigate();

  // on change states
  const [excelFile, setExcelFile] = useState(null);
  const [excelFileError, setExcelFileError] = useState(null);

  //map the data list of excel app
  let mtarr = [];

  // FOr Table
  const [local_datalisttmp, setlocal_datalisttmp] = useState([]);
  const accessToken = useSelector((state) => state.authentication.access_token);

  // submit
  const [excelData, setExcelData] = useState(null);
  // it will contain array of objects

  // handle File Type
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

  // submit function

  const [Headers, setHeaders] = useState([]);
  const [cc_headers, setcc_headers] = useState([]);
  const [nc_headers, setnc_headers] = useState([]);

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

  const setTable = (all_chg) => {
    // Setting Table Rows Data

    let cc_head_list = [];
    let Ncc_head_list = [];
    excelData.forEach((element, idx) => {
      let temp = [[["", ""]], ["", "", ""], ["", "", ""], ""];

      let cc_temp = [];
      let ncc_temp = [];
      for (const itm in element) {
        if (itm.startsWith("CC")) {
          cc_temp.push(element[`${itm}`]);
        } else if (itm.startsWith("NCC")) {
          ncc_temp.push(element[`${itm}`]);
        }
      }
      // console.log("element[`Associate_Charge`]",element[`Associate_Charge`])
      // console.log("test all_chrgs", all_chg)
      // console.log(all_chg.map(c => c[1]).includes((element[`Associate_Charge`]).toUpperCase()))

      let idcx = all_chg
        .map((c) => c[1])
        .indexOf(element[`Associate_Charge`].toUpperCase());

      if (idcx > -1) {
        temp[0][0][0] = all_chg[idcx][0];
      }
      temp[0][0][1] = element[`Associate_Charge`];
      temp[1] = cc_temp;
      temp[2] = ncc_temp;
      // console.log("temp",temp)
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

  const send_list_data = () => {
    console.log("local_datalisttmp", local_datalisttmp);
    navigate("/master/clients/addclient", {
      state: { local_datalisttmp: local_datalisttmp },
    });
  };

  const getAssoCharges = () => {
    axios
      .get(
        ServerAddress +
          `master/all_charges/?search=${""}&p=${1}&records=${10}&charge_category=${"ASSOCIATED CHARGE"}&data=all`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((resp) => {
        // console.log('chrgs resp', resp.data.results)
        let all_chg = resp.data.results.map((v) => [v.id, v.charge_name]);
        // console.log("all_chg",all_chg)
        setTable(all_chg);
      })
      .catch((e) => alert(`Err occur while getting asso chrgs : ${e}`));
  };

  useLayoutEffect(() => {
    if (excelData !== null) {
      getAssoCharges();
    }
  }, [excelData]);

  return (
    <div style={{ margin: "30px", padding: "20px" }}>
      <div>
        {/* Upload file to import Data */}
        <div style={{ textAlign: "center", padding: "10px", margin: "0px" }}>
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
          style={{
            color: "red",
            textAlign: "center",
            marinTop: "20px",
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
              marginTop: "40px",
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
                {local_datalisttmp.map((itm, idx) => {
                  console.log("itm", itm[0][0], itm[0][0][0] === "");
                  return (
                    <tr
                      key={idx}
                      // style={{backgroundColor: itm[0][0][0] ==''? 'red' : '' }}
                      className={itm[0][0][0] === "" ? "table-danger" : ""}
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
                              style={{ borderWidth: 0, width: "2.5rem" }}
                            />
                          </td>
                        );
                      })}

                      {/* For COld Chain */}
                      {itm[1].map((v, i) => {
                        // if (i == 0) {
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
                              style={{ borderWidth: 0, width: "2.5rem" }}
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
                send_list_data();
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
                navigate("/master/clients/addclient");
              }}
            >
              Cancle
            </Button>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default ImportLocalAssoData;
