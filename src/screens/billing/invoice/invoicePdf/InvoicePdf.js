import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import "./InvoicePdf.scss";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { ServerAddress } from "../../../../constants/ServerAddress";

export const ComponentToPrint = React.forwardRef((props, ref) => {
  const location = useLocation();
  const accessToken = useSelector((state) => state.authentication.access_token);

  const [invoice_number, setinvoice_number] = useState(
    location.state.invoice.invoice_number
  );

  const [invoice_order, setinvoice_order] = useState([]);
  const [total_net, settotal_net] = useState();

  const [data, setdata] = useState([]);
  let len = data.length;
  const [total_inword, settotal_inword] = useState();

  const get_invoice_order = () => {
    axios
      .get(
        ServerAddress +
          `billing/get_invoice_ords/?search=${""}&p=${1}&records=${10}`,
        // "biiling/get_invoice_ords/?invoice_number=" +
        // invoice_number,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((resp) => {
        let otis = [];
        let temp_ord = [];
        // temp = response.data.orderdetails;
        otis = resp.data.results;
        // temp_ord = response.data.ordercostlist
        // temp_ord = response.data.ordercostlist

        for (const ots of otis) {
          let i_ord = ots.order;
          let freight_charge = i_ord.ordertocost.filter(
            (v) => v.cost_name.toUpperCase() === "FREIGHT"
          );
          let oda_charge = i_ord.ordertocost.filter(
            (v) => v.cost_name.toUpperCase() === "ODA"
          );
          let warai_charge = i_ord.ordertocost.filter(
            (v) => v.cost_name.toUpperCase() === "WARAI"
          );

          let other_charge = i_ord.ordertocost.filter(
            (v) =>
              v.cost_name.toUpperCase() !== "WARAI" &&
              v.cost_name.toUpperCase() !== "ODA" &&
              v.cost_name.toUpperCase() !== "FREIGHT"
          );

          let frg =
            freight_charge.length > 0
              ? Math.round(freight_charge[0]["cost_value"])
              : "-";
          let od =
            oda_charge.length > 0
              ? Math.round(oda_charge[0]["cost_value"])
              : "-";
          let wra =
            warai_charge.length > 0
              ? Math.round(warai_charge[0]["cost_value"])
              : "-";
          let oth = 0;
          if (other_charge.length > 0) {
            oth = Math.round(
              other_charge.map((v) => v.cost_value).reduce((a, b) => a + b)
            );
          } else {
            oth = "-";
          }

          i_ord["frg"] = frg;
          i_ord["od"] = od;
          i_ord["wra"] = wra;
          i_ord["oth"] = oth;
          temp_ord.push(i_ord);

          let temp_data = [
            { value: "Sr. No" },
            { value: "Date" },
            { value: "Docket No." },
            { value: "Origin" },
            { value: "Destination" },
            { value: "PCS" },
            { value: "Act. Weight" },
            { value: "char. Weight" },
            { value: "Freight" },
            { value: "Warai Charges" },
            { value: "ODA" },
            { value: "Additional Charges" },
            { value: "Total Charges" },
          ];

          setdata(temp_data);
          setinvoice_order(temp_ord);
          // setinvoice_order(temp_list);
        }

        // for (let index = 0; index < temp.length; index++) {
        //   let entry = temp[index]
        //   let ord_le = temp_ord[index]
        //   let add_charge_cost = 0
        //   entry['total'] = 0

        //   for (let i = 0; i < ord_le.length; i++) {
        //     const ele = ord_le[i];

        //     if ((ele.cost_name).toUpperCase() == "FREIGHT") {
        //       entry['FREIGHT'] = ele.cost_value
        //       entry['total'] += ele.cost_value
        //     }
        //     else if ((ele.cost_name).toUpperCase() == "WARAI") {
        //       entry['WARAI'] = ele.cost_value
        //       entry['total'] += ele.cost_value
        //     }
        //     else if ((ele.cost_name).toUpperCase() == "ODA") {
        //       entry['ODA'] = ele.cost_value
        //       entry['total'] += ele.cost_value
        //     }
        //     else {
        //       add_charge_cost += ele.cost_value
        //       entry['total'] += ele.cost_value
        //     }

        //   }
        //   entry['Additional'] = add_charge_cost
        //   temp_list.push(entry)
        // }

        // let temp_data = [
        //   { value: "Sr. No" },
        //   { value: "Date" },
        //   { value: "AWB No." },
        //   { value: "Origin" },
        //   { value: "Destination" },
        //   { value: "PCS" },
        //   { value: "Act. Weight" },
        //   { value: "char. Weight" },
        //   { value: "Freight" },
        //   { value: "Warai Charges" },
        //   { value: "ODA" },
        //   { value: "Additional Charges" },
        //   { value: "Total Charges" },
        // ]

        // let freght_av = temp_list.find(val => val['FREIGHT'])
        // let warai_av = temp_list.find(val => val['WARAI'])
        // let oda_av = temp_list.find(val => val['ODA'])

        // let tmp_dat2 = []
        // for (let index = 0; index < temp_data.length; index++) {
        //   const ele = temp_data[index];

        //   if (ele.value == "Freight" && freght_av !== undefined) {
        //     setfright(true)
        //     tmp_dat2.push(ele)
        //   }
        //   else if (ele.value == "Warai Charges" && warai_av !== undefined) {
        //     setwarai(true)
        //     tmp_dat2.push(ele)
        //   }
        //   else if (ele.value == "ODA" && oda_av !== undefined) {
        //     setoda(true)
        //     tmp_dat2.push(ele)
        //   }
        //   else if (ele.value != "Freight" && ele.value != "Warai Charges" && ele.value != "ODA") {
        //     tmp_dat2.push(ele)
        //   }

        // }
        // setdata(temp_data)
        // setinvoice_order(temp_list);
      })
      .catch((err) => {
        alert(`Error While Loading Client , ${err}`);
      });
  };

  useEffect(() => {
    let temp_tot = 0;
    for (let index = 0; index < invoice_order.length; index++) {
      const item = invoice_order[index].total;
      temp_tot += item;
    }
    settotal_net(temp_tot);
    settotal_inword(temp_tot + (temp_tot * 9) / 100 + (temp_tot * 9) / 100);
  }, [invoice_order]);

  useLayoutEffect(() => {
    if (invoice_number) {
      get_invoice_order();
    }
  }, [invoice_number]);

  const [numToString, setnumToString] = useState();
  useEffect(() => {
    let numberInput = parseInt(total_inword);
    let myDiv = [];
    let oneToNineteen = [
      "",
      "One ",
      "Two ",
      "Three ",
      "Four ",
      "Five ",
      "Six ",
      "Seven ",
      "Eight ",
      "Nine ",
      "Ten ",
      "Eleven ",
      "Twelve ",
      "Thirteen ",
      "Fourteen ",
      "Fifteen ",
      "Sixteen ",
      "Seventeen ",
      "Eighteen ",
      "Nineteen ",
    ];
    let tenth = [
      "",
      "",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];

    let num = ("000000000" + numberInput)
      .slice(-9)
      .match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!num) return;

    let outputText =
      num[1] !== 0
        ? (oneToNineteen[Number(num[1])] ||
            `${tenth[num[1][0]]} ${oneToNineteen[num[1][1]]}`) + " Crore "
        : "";
    outputText +=
      num[2] !== 0
        ? (oneToNineteen[Number(num[2])] ||
            `${tenth[num[2][0]]} ${oneToNineteen[num[2][1]]}`) + "Lakh "
        : "";
    outputText +=
      num[3] !== 0
        ? (oneToNineteen[Number(num[3])] ||
            `${tenth[num[3][0]]} ${oneToNineteen[num[3][1]]}`) + " Thousand "
        : "";
    outputText +=
      num[4] !== 0
        ? (oneToNineteen[Number(num[4])] ||
            `${tenth[num[4][0]]} ${oneToNineteen[num[4][1]]}`) + "Hundred "
        : "";
    outputText +=
      num[5] !== 0
        ? oneToNineteen[Number(num[5])] ||
          `${tenth[num[5][0]]} ${oneToNineteen[num[5][1]]} `
        : "";

    myDiv.push(outputText);
    setnumToString(myDiv);
  }, [total_inword]);

  return (
    <div className="m-2 text-black" ref={ref} id={"invoice_div"}>
      <div className="pdf-flex">
        <table className="pdf-table">
          <thead>
            <tr>
              <td colSpan="13" style={{ padding: "0", margin: "0" }}>
                <div className="child_text">
                  <div
                    className="pdf-header"
                    style={{ borderBottom: "1px solid black" }}
                  >
                    ORIGINAL TAX INVOICE FOR THE RECEIPIENT
                  </div>

                  <div className="pdf-text">
                    <div className="pdf-child-text">
                      <div className="main_text">BILLED TO</div>

                      <div className="right-text">
                        <div
                          className="right-txt"
                          style={{ textAlign: "left" }}
                        >
                          Kind Attn : {"--"}
                        </div>
                      </div>

                      <div className="pdf-flex">
                        <div>Name</div>
                        <div
                          className="pdf-sub-text right-txt"
                          style={{ paddingLeft: "90px" }}
                        >
                          {location.state.invoice.client_name}
                        </div>
                      </div>

                      <div className="pdf-flex">
                        <div>Address</div>
                        <div
                          className="pdf-sub-text right-txt"
                          style={{ paddingLeft: "73px" }}
                        >
                          {location.state.invoice.client_state} ,{" "}
                          {location.state.invoice.client_city} ,{" "}
                          {location.state.invoice.client_pincode}
                        </div>
                      </div>

                      <div className="pdf-flex">
                        <div>PAN</div>
                        <div
                          className="pdf-sub-text right-txt"
                          style={{ paddingLeft: "107px" }}
                        >
                          {location.state.invoice.client_pan_no}
                        </div>
                      </div>

                      <div className="pdf-flex">
                        <div>State</div>
                        <div
                          className="pdf-sub-text right-txt"
                          style={{ paddingLeft: "97px" }}
                        >
                          {location.state.invoice.client_state}
                        </div>
                      </div>

                      <div className="pdf-flex">
                        <div>State Code</div>
                        <div
                          className="pdf-sub-text right-txt"
                          style={{ paddingLeft: "47px" }}
                        >
                          {location.state.invoice.client_state_code}
                        </div>
                      </div>

                      <div className="pdf-flex">
                        <div>GSTIN</div>
                        <div
                          className="pdf-sub-text right-txt"
                          style={{ paddingLeft: "93px" }}
                        >
                          {"-"}
                        </div>
                      </div>
                    </div>

                    <div className="pdf-child-text">
                      <div className="main_text">INVOICE DETAILS</div>

                      <div className="pdf-flex">
                        <div>Invoice No</div>
                        <div
                          className="pdf-sub-text right-txt"
                          style={{ paddingLeft: "50px" }}
                        >
                          {location.state.invoice.invoice_number}
                        </div>
                      </div>

                      <div className="pdf-flex">
                        <div>Invoice Date</div>
                        <div
                          className="pdf-sub-text right-txt"
                          style={{ paddingLeft: "33px" }}
                        >
                          {location.state.invoice.created_at.split("T")[0]}
                        </div>
                      </div>

                      <div className="pdf-flex">
                        <div>GST No </div>
                        <div
                          className="pdf-sub-text right-txt"
                          style={{ paddingLeft: "78px" }}
                        >
                          {/* {location.state.invoice.billto_gst_no} */}
                          {location.state.invoice.client_gst_no}
                        </div>
                      </div>

                      <div className="pdf-flex">
                        <div>ARN No</div>
                        <div
                          className="pdf-sub-text right-txt"
                          style={{ paddingLeft: "76px" }}
                        >
                          {/* {location.state.invoice.billto_arn_no} */}
                        </div>
                      </div>

                      <div className="pdf-flex">
                        <div>SAC Code </div>
                        <div
                          className="pdf-sub-text right-txt"
                          style={{ paddingLeft: "52px" }}
                        >
                          {location.state.invoice.client_sac_code}
                        </div>
                      </div>

                      <div className="pdf-flex">
                        <div>SAC Services</div>
                        <div
                          className="pdf-sub-text right-txt"
                          style={{ paddingLeft: "29px" }}
                        >
                          {location.state.invoice.client_sac_service}
                        </div>
                      </div>

                      <div className="pdf-flex">
                        <div>PAN No </div>
                        <div
                          className="pdf-sub-text right-txt"
                          style={{ paddingLeft: "76px" }}
                        >
                          {/* {location.state.invoice.billto_pan_no} */}
                        </div>
                      </div>

                      <div className="pdf-flex">
                        <div>State</div>
                        <div
                          className="pdf-sub-text right-txt"
                          style={{ paddingLeft: "92px" }}
                        >
                          {/* {location.state.invoice.billto_state} */}
                        </div>
                      </div>

                      <div className="pdf-flex">
                        <div>State Code</div>
                        <div
                          className="pdf-sub-text right-txt"
                          style={{ paddingLeft: "43px" }}
                        >
                          {"--"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr className="a" id="meta">
              {data.map((i, indx) => {
                return (
                  <td className="td-text" key={indx}>
                    {i.value}
                  </td>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {invoice_order.map((order, ind) => {
              return (
                <tr key={ind} className="a" id="row">
                  <td>{ind + 1}</td>
                  <td>{order.booking_at.split("T")[0]}</td>
                  <td>{order.docket_no}</td>
                  <td>{order.shipper_pincode + ", " + order.shipper_city}</td>
                  <td>
                    {order.consignee_pincode + ", " + order.consignee_city}
                  </td>
                  <td>{order.total_quantity}</td>
                  <td>{order.actual_weight}</td>
                  <td>{order.chargeable_weight}</td>
                  <td>{order.frg}</td>
                  <td>{order.wra}</td>
                  <td>{order.od}</td>
                  <td>{order.oth}</td>
                </tr>
              );
            })}

            <tr className="a">
              <td colSpan={len === len && len - 3} rowSpan="3" className="ps-1">
                (Rupees : {numToString} Only)
              </td>
              <td colSpan={2} style={{ textAlign: "center" }}>
                NET Total
              </td>
              <td style={{ textAlign: "center" }}>
                {parseFloat(total_net).toFixed(3)}
              </td>
            </tr>
            <tr className="a" id="meta">
              <td colSpan={2}>CGST @ 9%</td>
              <td>{parseFloat((total_net * 9) / 100).toFixed(3)}</td>
            </tr>
            <tr className="a" id="meta">
              <td colSpan={2}>SGST @ 9%</td>
              <td>{parseFloat((total_net * 9) / 100).toFixed(3)}</td>
            </tr>

            <tr className="a">
              <td colSpan={len === len && len - 3} id="pdf-main-text">
                Terms And Payments
              </td>
              <td colSpan={2}>
                <div style={{ textAlign: "center" }} className="ps-1 pdf-bold">
                  Gross Total
                </div>
              </td>
              <td>
                <div style={{ textAlign: "center" }} className="ps-1 pdf-bold">
                  {parseFloat(
                    total_net + (total_net * 9) / 100 + (total_net * 9) / 100
                  ).toFixed(3)}
                </div>
              </td>
            </tr>
            <tr className="a">
              <td colSpan={len === len && len - 3} className="ps-1">
                <div>
                  1. All cheques and Demand draft should be made in the name of{" "}
                  <span className="pdf-bold">
                    "Quick India Logistics Pvt Ltd"
                  </span>{" "}
                  on Mumbai Books only.{" "}
                </div>
              </td>
              <td colSpan={3}>
                <div className="ps-1 pdf-bold">
                  For Quick India Logistics Pvt Ltd
                </div>
              </td>
            </tr>
            <tr className="a">
              <td
                colSpan={len === len && len - 3}
                className="ps-1"
                style={{ borderTop: "none" }}
              >
                <div>
                  2. Interest of 24% per annumm will be charged if the Payment
                  is not made with in 15 days without prejudice.
                </div>
                <div style={{ paddingBottom: "30px" }}>
                  3. If payment is made in cash than official receipt should be
                  taken for the same.
                </div>
              </td>
              <td
                colSpan={3}
                style={{
                  borderTop: "None",
                }}
              ></td>
            </tr>
            <tr className="a">
              <td colSpan={len === len && len - 3} style={{ borderTop: "none" }}>
                <div className="ps-1 pdf-bold">
                  SUBJECT TO MUMBAI JURISDICATION
                </div>
              </td>
              <td colSpan={3} style={{ borderTop: "none" }}>
                <div className="ps-1 pdf-bold">Authorised Signatory</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
});

const Invoice_Pdf = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <ComponentToPrint ref={componentRef} />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItem: "center",
        }}
      >
        <button
          className="btn btn-info m-1"
          onClick={() => {
            handlePrint();
            var style = document.createElement("style");
            style.innerHTML = `
    @page 
      {
          size:  A4 landscape;   /* auto is the initial value */
          // margin: 5mm;  /* this affects the margin in the printer settings */

      }
      @media print {
        body {
          zoom: 98%;
        }
        table {
            page-break-inside: avoid;
        }
      }


      html
      {
          background-color: #FFFFFF; 
          margin: 0px;  /* this affects the margin on the html before sending to printer */
      }

      body
      {

          /*border: solid 1px black ;*/
          // margin: 5mm 5mm 5mm 5mm; /* margin you want for the content */
      }
    `;
            document.head.appendChild(style);

            handlePrint();
          }}
        >
          Print in A4 Landscape
        </button>

        <button
          className="btn btn-info m-1"
          onClick={() => {
            handlePrint();
            var style = document.createElement("style");
            style.innerHTML = `
    @page 
      {
          size:  A5 landscape;   /* auto is the initial value */
          // margin: 5mm;  /* this affects the margin in the printer settings */

      }
      @media print {
        body {
          zoom: 68%;
        }
        table {
            page-break-inside: avoid;
        }
      }

      html
      {
          background-color: #FFFFFF; 
          margin: 0px;  /* this affects the margin on the html before sending to printer */
      }

      body
      {

          /*border: solid 1px black ;*/
          // margin: 5mm 5mm 5mm 5mm; /* margin you want for the content */
      }
    `;
            document.head.appendChild(style);
            handlePrint();
          }}
        >
          Print in A5 Landscape
        </button>

        <button
          className="btn btn-info m-1"
          onClick={() => {
            handlePrint();
            var style = document.createElement("style");
            style.innerHTML = `
    @page 
      {
          size: A4 portrait;   /* auto is the initial value */
          // margin: 5mm;  /* this affects the margin in the printer settings */

      }

      html
      {
          background-color: #FFFFFF; 
          margin: 0px;  /* this affects the margin on the html before sending to printer */
      }
      @media print {
        body {
          zoom: 120%;
        }
        table {
            page-break-inside: avoid;
        }
      }

      body
      {

          /*border: solid 1px black ;*/
          // margin: 5mm 5mm 5mm 5mm; /* margin you want for the content */
      }
    `;
            document.head.appendChild(style);
            handlePrint();
          }}
        >
          Print in A4 Portrait
        </button>

        <button
          className="btn btn-info m-1"
          onClick={() => {
            handlePrint();
            var style = document.createElement("style");
            style.innerHTML = `
    @page 
      {
          size: A5 portrait;   /* auto is the initial value */
          // margin: 5mm;  /* this affects the margin in the printer settings */

      }

      html
      {
          background-color: #FFFFFF; 
          margin: 0px;  /* this affects the margin on the html before sending to printer */
      }
      @media print {
        body {
          zoom: 85%;
        }
        table {
            page-break-inside: avoid;
        }
      }

      body
      {

          /*border: solid 1px black ;*/
          // margin: 5mm 5mm 5mm 5mm; /* margin you want for the content */
      }
    `;
            document.head.appendChild(style);

            handlePrint();
          }}
        >
          Print in A5 Portrait
        </button>
      </div>
    </div>
  );
};

export default Invoice_Pdf;
