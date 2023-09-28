/* eslint-disable */
import axios from "axios";
import React, { useRef, useEffect, useState, useLayoutEffect } from "react";
import { useSelector } from "react-redux";
// import "../../../assets/scss/Pdf/manifest.scss";
import { useLocation } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { ServerAddress } from "../../../constants/ServerAddress";
import toTitleCase from "../../../lib/titleCase/TitleCase";

const Manifest_pdf = () => {
  //   const [order, setorder] = useState([]);
  const location = useLocation();
  const [mn_orders_s, setmn_orders_s] = useState([]);
  const [loading_err, setloading_err] = useState(true);
  const [coloader_name, setcoloader_name] = useState();
  const componentRef = useRef();
  const [manifest, setmanifest] = useState(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      {loading_err == false && (
        <ComponentToPrint
          ref={componentRef}
          // manifest={manifest}
          // mn_orders={mn_orders_s}
        />
      )}

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
          zoom: 100%;
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
          zoom: 70%;
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
          zoom: 95%;
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
          zoom: 65%;
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

export const ComponentToPrint = React.forwardRef((props, ref) => {
  const { manifest, mn_orders } = props;

  // let f_date_f = manifest.created_at.split("T");
  // let f_date = f_date_f[0];
  // let f_time_r = String(f_date_f[1]).substring(0, 5);
  // let l_fdate = f_date + " " + f_time_r;

  // let for_date = "ATE";
  // let for_date_f = manifest.forwarding_datetime
  //   ? manifest.forwarding_datetime.split("T")
  //   : for_date.split("T");

  // for_date = for_date_f[0];
  // let for_time_r = String(for_date_f[1]).substring(0, 5);
  // let lor_fdate = for_date + " " + for_time_r;

  return (
    <div ref={ref}>
      {/* Manifest {value} */}
      <h1
        style={{
          textAlign: "center",
          marginTop: "10px",
          color: "rgb(116, 113, 113)",
        }}
      >
        Etechcube Pvt. Ltd.
      </h1>
      <h3
        style={{
          textAlign: "center",
          marginBottom: "px",
          color: "rgb(116, 113, 113)",
          paddingLeft: "10px",
          paddingRight: "10px",
        }}
      >
        C/O: J P Singh, Plot No :5, road No: 1, Vivek Nagar P/O: G H Colony,
        Chhota Govindpur, Jamshedpur, Jharkhand 831015
      </h3>
      <hr style={{ color: "rgb(211, 208, 208)" }} />

      <div
        style={{
          paddingLeft: "20px",
          float: "left",
          letterSpacing: "1.5px",
          fontSize: "15px",
        }}
      >
        <a>Manifest Created Date : {"-----"} </a>
        <br />
        <a>From: {"----"} </a> <br />
        <a>Manifest No: {""}</a> <br />
        <a>Origin: {""} </a> <br />
        <a>Manifest Actual Weight: </a> <br />
        <a>Chargeable Weight : {""}</a> <br />
        <a>Flight Name & No : {"-"}</a> <br />
      </div>

      <div
        style={{
          paddingRight: "20px",
          float: "right",
          letterSpacing: "1.5px",
          fontSize: "15px",
        }}
      >
        <a>Coloader No. / AirwayBill No. : {"-"}</a> <br />
        <a>Manifest Forwarding Date : {"-"}</a> <br />
        <a>To : {""}</a> <br />
        <a>Destination : {""}</a> <br />
        <a>Co-loader Name : {"-"}</a> <br />
        <a>No of Bags : {"-"}</a> <br />
        <br />
        <br />
        <br />
      </div>

      <table
        className="table table-bordered mb-0"
        style={{
          width: "98%",
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
              background: "rgb(211, 208, 208)",
              color: "black",
              fontSize: "12px",
            }}
          >
            <th>S.no</th>
            <th>Date</th>
            <th>Docket No.</th>
            <th>Origin</th>
            <th>Shipper</th>
            <th>Destination</th>
            <th>Consignee</th>
            <th>E-Way Bill No.</th>
            <th>Pkt</th>
            <th>Wgt</th>
            <th>Remarks</th>
          </tr>
        </thead>

        <tbody>
          return (
          <tr
            key={key}
            style={{
              textAlign: "centre",
              border: "0.5px solid black",
              padding: "0.5rem",
            }}
          >
            <td>{""}</td>
            <td>{""}</td>
            <td>{""}</td>
            <td>{""}</td>
            <td>{""}</td>
            <td>{""}</td>
            <td>{""}</td>
            <td>{"-"}</td>
            <td>{""}</td>
            <td>{""}</td>
            <td>{""}</td>
          </tr>
          );
        </tbody>
      </table>

      <br />
      <br />
    </div>
  );
});

export default Manifest_pdf;
