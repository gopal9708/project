/* eslint-disable */
import React, { useRef, useEffect, useState } from "react";
// import "../../../assets/scss/Pdf/manifest.scss";
// import { useLocation } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

const data = [
  {
    s_no: 1,
    date: "March 18, 2022",
    docket_no: 800287,
    origin: "DELHI- DELHI",
    shipper: "IMS",
    destination: "Jamshedpur- jharkhand",
    consignee: "SWATI MEDICALS",
    eway_bill_no: "--",
    packet: 5,
    weight: "55.0",
    remarks: "fdf",
  },
  // { name: "Megha", age: 19, gender: "Female" },
  // { name: "Subham", age: 25, gender: "Male"},
];

export const ComponentToPrint = React.forwardRef((props, ref) => {
  // const { value } = props;
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
        <a>Manifest Created Date : 2022-04-22 11:45:50 </a>
        <br />
        <a>From :QUICK INDIA ( ANDHERI ) </a> <br />
        <a>Manifest No:100268</a> <br />
        <a>Origin : QUICK INDIA ( ANDHERI ) </a> <br />
        <a>Manifest Actual Weight :78 </a> <br />
        <a>Chargeable Weight :5 </a> <br />
        <a>Flight Name & No :AirIndia </a> <br />
      </div>
      {/* <div class="leftdata">
	{leftdata.map((val, key) => {
		return (
			<u1 key={key}>
			
			<u1>{val.manifest_created_date}</u1>
			<br></br>
			<u1>{val.from}</u1>
			<br></br>
			<u1>{val.manifest_no}</u1>
			<br></br>
			<u1>{val.origin}</u1>
			<br></br>
			<u1>{val.manifest_actual_weight}</u1>
			<br></br>
			<u1>{val.chargeable_weight}</u1>
			<br></br>
			<u1>{val.flight_name_and_no}</u1>
			<br></br>
			
			</u1>
		)
		})}

	
	</div> */}
      <div
        style={{
          paddingRight: "20px",
          float: "right",
          letterSpacing: "1.5px",
          fontSize: "15px",
        }}
      >
        <a>Coloader No. / AirwayBill No. : 123</a> <br />
        <a>Manifest Forwarding Date : April 8, 2022</a> <br />
        <a>To : QUICK INDIA ( ANDHERI )</a> <br />
        <a>Destination : MUMBAI</a> <br />
        <a>Co-loader Name : SURYA CARGO</a> <br />
        <a>No of Bags : 2</a> <br />
        <br />
        <br />
        <br />
      </div>
      {/* <div class="rightdata">
	{rightdata.map((val, key) => {
		return (
			<u1 key={key}>
			
			<u1>{val.coloader_no_or_airwaybill_no}</u1>
			<br></br>
			<u1>{val.manifest_forwarding_date}</u1>
			<br></br>
			<u1>{val.to}</u1>
			<br></br>
			<u1>{val.destination}</u1>
			<br></br>
			<u1>{val.co_loader_name}</u1>
			<br></br>
			<u1>{val.no_of_bags}</u1>
			<br></br>
		
			</u1>
		)
		})}
	</div> */}

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
          {data.map((val, key) => {
            return (
              <tr
                key={key}
                style={{
                  textAlign: "centre",
                  border: "0.5px solid black",
                  padding: "0.5rem",
                }}
              >
                {/* <td>{val.name}</td>
			<td>{val.age}</td>
			<td>{val.gender}</td> */}
                <td>{val.s_no}</td>
                <td>{val.date}</td>
                <td>{val.docket_no}</td>
                <td>{val.origin}</td>
                <td>{val.shipper}</td>
                <td>{val.destination}</td>
                <td>{val.consignee}</td>
                <td>{val.eway_bill_no}</td>
                <td>{val.packet}</td>
                <td>{val.weight}</td>
                <td>{val.remarks}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <br />
      <br />
    </div>
  );
});

const Manifest_pdf_btn = () => {
  //   const [order, setorder] = useState([]);
  //   const location = useLocation();
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <ComponentToPrint ref={componentRef} />
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
    // window.location.reload();
  );
};

export default Manifest_pdf_btn;
