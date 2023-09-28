import React, { useState, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Input, Button } from "reactstrap";
import * as XLSX from "xlsx";

const ImportCityData = () => {
  const navigate = useNavigate();
  // on change states
  const [excelFile, setExcelFile] = useState(null);
  const [excelFileError, setExcelFileError] = useState(null);

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
      // console.log(selectedFile.type);
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
  const handleSubmit = (e) => {
    // e.preventDefault();
    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: "buffer" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      const headers = Object.keys(data[0]);
      setExcelData(data);
      setHeaders(headers);
      // console.log("Excel Data:", excelData);
      // console.log("Headers:", headers);
    } else {
      setExcelData(null);
      setHeaders([]);
    }
  };

  //map the data list of excel app
  let mtarr = [];
  let cc_head_list = [];
  let Ncc_head_list = [];
  let otherColumns = {};

  if (excelData !== null) {
    excelData.forEach((element) => {
      let temp = [
        [[element.Origin_City], [element.Destination_City]],
        ["", "", "", ""],
        ["", "", "", ""],
      ];
      let cc_temp = [];
      let ncc_temp = [];
      for (const itm in element) {
        //  console.log("value",itm)
        if (itm.startsWith("CC")) {
          // console.log("CC Item", itm);
          cc_temp.push(element[`${itm}`]);
        } else if (itm.startsWith("NCC")) {
          // console.log("NCC", itm);
          ncc_temp.push(element[`${itm}`]);
        }
      }
      // console.log("CC TEmp", cc_temp);
      // console.log("NCC TEmp", ncc_temp);
      temp[1] = cc_temp;
      temp[2] = ncc_temp;
      mtarr.push(temp);

      // Get the remaining column names
      otherColumns = Object.keys(element).filter(
        (key) => !["Origin_City", "Destination_City"].includes(key)
      );

      // Add the values of the remaining columns to mtarr
      // otherColumns.forEach((column) => {
      //   mtarr.push([element[column]]);
      // });

      // add_data.push(mtarr);
    });
  }

  if (excelData !== null) {
    // Split the remaining columns between CC and NCC
    otherColumns.forEach((column) => {
      if (column.startsWith("CC")) {
        cc_head_list.push(column);
      } else if (column.startsWith("NCC")) {
        Ncc_head_list.push(column);
      }
    });
  }

  // FOr Table

  const [datalist, setdatalist] = useState();

  useLayoutEffect(() => {
    if (excelData !== null) {
      excelData.forEach((element) => {
        // for(let i=0 ; i < excelData.length ; i++) {
        // list.push(
        //   (mtarr = [
        //     [[element.Origin_City], [element.Destination_City]],
        //     [
        //       element.CC_Rate_Per_KG,
        //       element.CC_Minimum_Amount,
        //       element.CC_Minimum_Box,
        //       element.CC_ODA,
        //     ],
        //     [
        //       element.NCC_Rate_Per_KG,
        //       element.NCC_Minimum_Amount,
        //       element.NCC_Minimum_Box,
        //       element.NCC_ODA,
        //     ],
        //   ])
        // );
        // }
      });
    }
    setdatalist(mtarr);
    // console.log("DATA List", list);
  }, [excelData]);

  const send_list_data = () => {
    alert("Data Saved");
  };

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
                    colSpan={cc_head_list.length}
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
                    colSpan={Ncc_head_list.length}
                  >
                    Non Cold Chain
                  </th>
                </tr>

                <tr>
                  {cc_head_list.map((itm, indx) => {
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

                  {Ncc_head_list.map((itam, inax) => {
                    return (
                      <th
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
                {datalist.map((itm, idx) => {
                  return (
                    <tr key={idx}>
                      <td>{idx + 1}</td>

                      {/* For origin City & Destination City */}
                      {itm[0].map((v, i) => {
                        // console.log("LOCATION,",i)
                        return (
                          <td key={i}>
                            <input
                              value={datalist[idx][0][i]}
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
                              value={datalist[idx][1][i]}
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
                              value={datalist[idx][2][i]}
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
            </table>
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

export default ImportCityData;
