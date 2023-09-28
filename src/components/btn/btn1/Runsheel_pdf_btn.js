/* eslint-disable */
import React, { useRef, useEffect, useState } from "react";
// import "../../../assets/scss/Pdf/runshet.scss"
// import { useLocation } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

const data = [
  {
    s_no: 1,
    docket_no: 800259,
    eway_bill_no: 157474464645,
    shipper: "Atul Medicine",
    consignee: "Atul Medicine",
    origin: "New Delhi- Delhi",
    destination: "New Delhi- Delhi",
    pieces: 2,
    weight: "24.0",
    date: "March 1, 2022",
    name: "",
    stamp: "",
  },
  // { s_no: 2, date: "Feb. 15, 2022", docket_no: 800027,origin:"Sarsod- Haryana",shipper:"IMS",destination:"DELHI- DELHI",consignee:"ADS",eway_bill_no:"---",packet:23,weight:"---",remarks:"------"},
];

export const ComponentToPrint = React.forwardRef((props, ref) => {
  //   const { value } = props;
  return (
    <div ref={ref}>
      {/* Runsheet {value} */}
      <h1
        style={{
          marginTop: "10px",
          textAlign: "center",
          color: "rgb(116, 113, 113)",
          fontFamily: "sans-serif",
        }}
      >
        Etechcube Pvt. Ltd.
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
      {/* <div style={{ display: "flex" ,flexDirection:"row",justifyContent:"flex-start",paddingLeft: "20px"}}> */}
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
        <a>Route : Mumbai- Panvel</a>
        <br />
        <a>Vehicle No : Fgf78t</a>
        <br />
        <a>Driver Name : Ajit</a>
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
        <a>DRS No : 100126</a>
        <br />
        <a>Date : 2022-03-29 10:49:39 </a>
        <br />
        <a>Market / Fixed Vehicle : </a>
        <br />
      </div>
      {/* </div> */}
      <br />
      <br />
      <br />
      <br />
      <br />

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
          {data.map((val, key) => {
            return (
              <tr
                key={key}
                style={{ textAlign: "centre", border: "0.5px solid black" }}
              >
                <td>{val.s_no}</td>
                <td>{val.date}</td>
                <td>{val.eway_bill_no}</td>
                <td>{val.shipper}</td>
                <td>{val.consignee}</td>
                <td>{val.origin}</td>
                <td>{val.destination}</td>
                <td>{val.pieces}</td>
                <td>{val.weight}</td>
                <td>{val.date}</td>
                <td>{val.name}</td>
                <td>{val.stamp}</td>
              </tr>
            );
          })}
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

const Runsheet_pdf_btn = () => {
  //   const [order, setorder] = useState([]);
  //   const location = useLocation();
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <ComponentToPrint ref={componentRef} />
      <br />
      <br />
      <button
        onClick={() => {
          handlePrint();
          window.location.reload();
          // window.print();
        }}
      >
        Reload the Page
      </button>

      <button
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
    // window.location.reload();
  );
};

export default Runsheet_pdf_btn;
