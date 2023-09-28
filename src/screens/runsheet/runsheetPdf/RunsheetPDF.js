/* eslint-disable */
import axios from "axios";
import React, { useRef, useState, useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import toTitleCase from "../../../lib/titleCase/TitleCase";
import { ServerAddress } from "../../../constants/ServerAddress";

export const ComponentToPrint = React.forwardRef((props, ref) => {
  const { runsheet } = props;
  // console.log("runsheet=====", runsheet)

  const [order_data, setorder_data] = useState("");
  const [booking_date, setbooking_date] = useState("");

  useLayoutEffect(() => {
    setorder_data(runsheet.orders);
    if (runsheet.orders) {
      let book_date = new Date(runsheet.orders[0].booking_at).toLocaleString(
        undefined,
        { timeZone: "Asia/Kolkata" }
      );

      setbooking_date(book_date);
    }
  }, [runsheet.orders]);

  return (
    <div style={{ border: "2px solid black", margin: "20px" }} ref={ref}>
      <h1
        style={{
          marginTop: "10px",
          textAlign: "center",
          color: "rgb(116, 113, 113)",
          fontFamily: "sans-serif",
        }}
      >
        Quick India Logistics Pvt Ltd.
      </h1>
      <h3
        style={{
          marginBottom: "25px",
          textAlign: "center",
          color: "rgb(116, 113, 113)",
          fontFamily: "sans-serif",
        }}
      >
        <span style={{ color: "grey", width: "250px" }}>
          DELIVERY RUN SHEET{" "}
          <hr
            style={{ width: "30%", marginLeft: "auto", marginRight: "auto" }}
          />
        </span>
      </h3>
      <div
        style={{
          float: "left",
          flex: "1",
          paddingLeft: "20px",
          fontSize: "16px",
          letterSpacing: "1.5px",
          marginTop: "20px",
          marginBttom: "50px",
        }}
      >
        <a>Route : {toTitleCase(runsheet.route_name)}</a>
        <br />
        <a>Vehicle No : {runsheet.vehicle_number}</a>
        <br />
        <a>Driver Name : {toTitleCase(runsheet.driver_name)}</a>
        <br />
      </div>

      <div
        style={{
          float: "right",
          flex: "1",
          paddingRight: "20px",
          fontSize: "16px",
          letterSpacing: "1.5px",
          marginTop: "20px",
          marginBottom: "50px",
        }}
      >
        <a>DRS No : {runsheet.runsheet_no}</a>
        <br />
        <a>Date : {booking_date}</a>
        <br />
        <a>Market / Fixed Vehicle : {toTitleCase(runsheet.vehicle_type)} </a>
        <br />
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />

      <table
        className="table table-bordered mb-0"
        style={{
          width: "98%",
          marginTop: "5px",
          marginLeft: "10px",
          marginRight: "10px",
          border: "1px solid black",
          borderCollapse: "collapse",
          borderSpacing: "0.5rem",
        }}
      >
        <thead>
          <tr
            style={{
              textAlign: "centre",
              border: "0.5px solid black",
              padding: "0.5rem",
              background: "#007BFF",
              color: "white",
              fontSize: "12px",
            }}
          >
            <th>S.No.</th>
            <th>Docket No.</th>
            <th>E-Way Bill No.</th>
            <th>Shipper</th>
            <th>Consignee</th>
            <th>Origin</th>
            <th>Destination</th>
            <th>Pcs</th>
            <th>Wt</th>
            <th>Date</th>
            <th>Name </th>
            <th>Stamp </th>
          </tr>
        </thead>

        <tbody>
          {order_data.length != 0 ? (
            <>
              {order_data.map((val, key) => {
                let rn_book_date = val.booking_at.split("T");
                let rnb_date = rn_book_date[0];
                let rnb_time_r = String(rn_book_date[1]).substring(0, 5);
                let l_rnbdate = rnb_date + " " + rnb_time_r;
                return (
                  <tr
                    key={key}
                    style={{ textAlign: "centre", border: "0.5px solid black" }}
                  >
                    <td>{key + 1}</td>
                    <td>{val.docket_no}</td>
                    <td> {val.eway_bill_no} </td>
                    <td>{toTitleCase(val.shipper)}</td>
                    <td>{toTitleCase(val.consignee)}</td>
                    <td>
                      {toTitleCase(val.shipper_state)}, {toTitleCase(val.shipper_city)}
                    </td>
                    <td>
                      {toTitleCase(val.consignee_state)}, {toTitleCase(val.consignee_city)}
                    </td>
                    <td>{val.total_quantity}</td>
                    <td>{val.actual_weight}</td>
                    <td>{l_rnbdate}</td>
                    <td></td>
                    <td></td>
                  </tr>
                );
              })}
            </>
          ) : null}
          {/* {order_data.map((val, key) => {
            // let rn_book_date = val.booking_date.split("T");
            // let rnb_date = rn_book_date[0];
            // let rnb_time_r = String(rn_book_date[1]).substring(0, 5);
            // let l_rnbdate = rnb_date + " " + rnb_time_r;
            return (
              <tr
                key={key}
                style={{ textAlign: "centre", border: "0.5px solid black" }}
              >
                <td>{key + 1}</td>
                <td>{val.awb_no}</td>
                <td> {val.eway_bill_no} </td> 
                 <td>{val.shipper_name}</td>
                <td>{val.consignee_name}</td>
                <td>
                  {val.origin_postoffice}, {val.origin_city_name}
                </td>
                <td>
                  {val.destination_postoffice}, {val.destination_city_name}
                </td>
                <td>{val.total_quantity}</td>
                <td>{val.actual_weight}</td>
                <td>{12321}</td>
                <td></td>
                <td></td>
              </tr>
            );
          })}  */}
        </tbody>
      </table>

      <br />
      <br />
      <br />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          paddingLeft: "20px",
        }}
      >
        <h4
          style={{
            margiTop: "20px",
            fontSize: "15px",
            float: "left",
            flex: "1",
          }}
        >
          Supervisor :
        </h4>

        <h4
          style={{
            margiTop: "20px",
            fontSize: "15px",
            float: "center",
            flex: "1",
          }}
        >
          Ops Manager :
        </h4>
        <h4
          style={{
            margiTop: "20px",
            fontSize: "15px",
            float: "right",
            flex: "1",
          }}
        >
          Staff on :
        </h4>
      </div>
    </div>
  );
});

const RunsheetPDF = () => {
  const componentRef = useRef();
  const location = useLocation();
  const [loading_err, setloading_err] = useState(true);
  const accessToken = useSelector((state) => state.authentication.access_token);
  const [rn_orders_s, setrn_orders_s] = useState([]);
  const [runsheet, setrunsheet] = useState([]);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const get_rn_details = (rn_no) => {
    axios
      .get(ServerAddress + `runsheet/get_runsheetpdf/?rn_no=${rn_no}&p=1&records=1`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        if(response.data.results.length > 0){
          setloading_err(false);
          setrunsheet(response.data.results[0]);
        }
      })
      .catch((err) => {
        alert(`Error Occur in Get Manifest Order Data , ${err}`);
      });
  };

  useLayoutEffect(() => {
    if (location.state.is_runsheet) {
      setrunsheet(location.state.runsheet);
      setloading_err(false);
    } 
    else{
      get_rn_details(location.state.rn_no)
    }
  }, []);

  return (
    <div>
      {loading_err == false && (
        <ComponentToPrint
          ref={componentRef}
          runsheet={runsheet}
          rn_orders_s={rn_orders_s}
        />
      )}
      <br />
      <br />
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
          zoom: 110%;
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
            // window.print();
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
          zoom: 75%;
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
            // window.print();
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
          zoom: 75%;
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
            // window.print();
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
          zoom: 55%;
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
            // window.print();
            handlePrint();
          }}
        >
          Print in A5 Portrait
        </button>
      </div>
    </div>
  );
};

export default RunsheetPDF;
