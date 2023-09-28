import axios from "axios";
import React, { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Input, Label, Row } from "reactstrap";

const Test = () => {
  let dlist = [
    [
      "1",
      "Cotten Khadi",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    [
      "2",
      "Silk Khadi",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    [
      "3",
      "Woolen Khadi",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    [
      "4",
      "Silk2 Khadi",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
  ];
  const [datalist, setdatalist] = useState(dlist);
  const [refresh, setrefresh] = useState(false);

  return (
    <div
      // className="table"
      style={{ overflowX: "scroll" }}
    >
      <Label>With Warai Orders</Label>

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
                width: "5rem",
                textAlign: "center",
                paddingLeft: "4px",
                paddingRight: "4px",
              }}
              rowSpan={2}
            >
              Scheme
            </th>
            <th
              style={{
                width: "2rem",
                textAlign: "center",
                paddingLeft: "2px",
                paddingRight: "2px",
              }}
              colSpan={2}
            >
              Production*(Only Fabric)
            </th>
            <th
              style={{
                width: "2rem",
                textAlign: "center",
                paddingLeft: "2px",
                paddingRight: "2px",
              }}
              colSpan={2}
            >
              Retail Sales**(Fabric+Readymade
            </th>
            <th
              style={{
                width: "2rem",
                textAlign: "center",
                paddingLeft: "2px",
                paddingRight: "2px",
              }}
              colSpan={2}
            >
              Whole Sale
            </th>

            <th
              style={{
                width: "2rem",
                textAlign: "center",
                paddingLeft: "2px",
                paddingRight: "2px",
              }}
              colSpan={5}
            >
              Employment
            </th>

            <th
              style={{
                width: "2rem",
                textAlign: "center",
                paddingLeft: "2px",
                paddingRight: "2px",
              }}
              colSpan={2}
            >
              SC/ST
            </th>
            <th
              style={{
                width: "2rem",
                textAlign: "center",
                paddingLeft: "2px",
                paddingRight: "2px",
              }}
              colSpan={5}
            >
              Earning/Wages paid
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
              Qty.
            </th>
            <th
              style={{
                width: "2rem",
                textAlign: "center",
                paddingLeft: "2px",
                paddingRight: "2px",
              }}
            >
              Value
            </th>
            <th
              style={{
                width: "2rem",
                textAlign: "center",
                paddingLeft: "2px",
                paddingRight: "2px",
              }}
            >
              Qty.
            </th>
            <th
              style={{
                width: "2rem",
                textAlign: "center",
                paddingLeft: "2px",
                paddingRight: "2px",
              }}
            >
              Value
            </th>
            <th
              style={{
                width: "2rem",
                textAlign: "center",
                paddingLeft: "2px",
                paddingRight: "2px",
              }}
            >
              Qty.
            </th>
            <th
              style={{
                width: "2rem",
                textAlign: "center",
                paddingLeft: "2px",
                paddingRight: "2px",
              }}
            >
              Value
            </th>

            <th
              style={{
                width: "2rem",
                textAlign: "center",
                paddingLeft: "2px",
                paddingRight: "2px",
              }}
            >
              Spinner
            </th>
            <th
              style={{
                width: "2rem",
                textAlign: "center",
                paddingLeft: "2px",
                paddingRight: "2px",
              }}
            >
              Weavers
            </th>
            <th
              style={{
                width: "2rem",
                textAlign: "center",
                paddingLeft: "2px",
                paddingRight: "2px",
              }}
            >
              Other Artisans
            </th>
            <th
              style={{
                width: "2rem",
                textAlign: "center",
                paddingLeft: "2px",
                paddingRight: "2px",
              }}
            >
              Total Artisans
            </th>
            <th
              style={{
                width: "2rem",
                textAlign: "center",
                paddingLeft: "2px",
                paddingRight: "2px",
              }}
            >
              Salaried Staff
            </th>
            <th
              style={{
                width: "2rem",
                textAlign: "center",
                paddingLeft: "2px",
                paddingRight: "2px",
              }}
            >
              SC
            </th>
            <th
              style={{
                width: "2rem",
                textAlign: "center",
                paddingLeft: "2px",
                paddingRight: "2px",
              }}
            >
              ST
            </th>
            <th
              style={{
                width: "2rem",
                textAlign: "center",
                paddingLeft: "2px",
                paddingRight: "2px",
              }}
            >
              Spinner
            </th>
            <th
              style={{
                width: "2rem",
                textAlign: "center",
                paddingLeft: "2px",
                paddingRight: "2px",
              }}
            >
              Weavers
            </th>
            <th
              style={{
                width: "2rem",
                textAlign: "center",
                paddingLeft: "2px",
                paddingRight: "2px",
              }}
            >
              Other Artisans
            </th>
            <th
              style={{
                width: "2rem",
                textAlign: "center",
                paddingLeft: "2px",
                paddingRight: "2px",
              }}
            >
              Total Wages Paid
            </th>
            <th
              style={{
                width: "2rem",
                textAlign: "center",
                paddingLeft: "2px",
                paddingRight: "2px",
              }}
            >
              Staff Salaried Paid
            </th>
          </tr>
        </thead>

        <tbody>
          {datalist.map((itm, idx) => {
            return (
              <tr key={idx}>
                <td>{itm[0]}</td>
                <td>{itm[1]}</td>

                {itm.slice(2).map((v, i) => {
                  return (
                    <td key={i}>
                      <input
                        value={datalist[idx][i + 2]}
                        onChange={(val) => {
                          datalist[idx][i + 2] = val.target.value;
                          setrefresh(!refresh);
                        }}
                        type="text"
                        name="voucher_amount"
                        placeholder="SCCV"
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
  );
};

export default Test;
