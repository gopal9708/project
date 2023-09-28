/* eslint-disable */
import axios from "axios";
import React, { useRef, useEffect, useState, useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { ServerAddress } from "../../../constants/ServerAddress";
import toTitleCase from "../../../lib/titleCase/TitleCase";

const Manifest_pdf = () => {
  //   const [order, setorder] = useState([]);
  const location = useLocation();
  console.log("location---", location)
  const accessToken = useSelector((state) => state.authentication.access_token);
  const [mn_orders_s, setmn_orders_s] = useState([]);
  const [loading_err, setloading_err] = useState(true);
  const [coloader_name, setcoloader_name] = useState();
  const componentRef = useRef();
  const [manifest, setmanifest] = useState(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });


  const get_mn_details = (mn_no) => {

    axios
      .get(ServerAddress + `manifest/get_manifestpdf/?mn_no=${mn_no}&p=1&records=1`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        console.log("response====", response)
        if(response.data.results.length > 0){
          setloading_err(false);
          setmanifest(response.data.results[0])
          setmn_orders_s(response.data.results[0].orders)
        }
      })
      .catch((err) => {
        alert(`Error Occur in Get Manifest Order Data , ${err}`);
      });
  };

  useLayoutEffect(() => {
    if (location.state.is_manifest) {
      let data = location.state.manifest
      setmanifest(data);
      setloading_err(false);

      setmn_orders_s(location.state.manifest.orders);
      if (location.state.mn_coloader) {
        alert(location.state.mn_coloader);
      }
    }
    else {
      get_mn_details(location.state.manifest_no);
    }
  }, []);

  return (
    <div>
      {loading_err == false && (
        <ComponentToPrint
          ref={componentRef}
          manifest={manifest}
          mn_orders={mn_orders_s}
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
  console.log("manifest--------nnn000", mn_orders)
  console.log("manifest--------manifest", manifest)
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
        <a>Manifest Created Date : {(manifest.manifest_date).split("T")[0]} </a>
        <br />
        <a>From: {manifest.from_branch_n} </a> <br />
        <a>Manifest No: {manifest.manifest_no}</a> <br />
        <a>Origin: {manifest.orgin_branch_n} </a> <br />
        <a>Manifest Actual Weight:{manifest.total_weight}</a> <br />
        <a>Chargeable Weight : {manifest.chargeable_weight} </a> <br />
        <a>Flight Name & No : {manifest.carrier_name} </a> <br />
      </div>

      <div
        style={{
          paddingRight: "20px",
          float: "right",
          letterSpacing: "1.5px",
          fontSize: "15px",
        }}
      >
        <a>
          Coloader No. / AirwayBill No. :{" "}
          {manifest.airwaybill_no ? manifest.airwaybill_no : "-"}
        </a>{" "}
        <br />
        <a>
          Manifest Forwarding Date :{" "}
          {manifest.forwarded_at ? (manifest.forwarded_at).split("T")[0] : "-"}
        </a>{" "}
        <br />
        <a>To : {manifest.to_branch_n}</a> <br />
        <a>Destination : {manifest.destination_branch_n}</a> <br />
        <a>
          Co-loader Name : {manifest.coloader_name ? manifest.coloader_name : "-"}
        </a>{" "}
        <br />
        <a>No of Bags : {manifest.bag_count}</a>{" , "}
        <a>Box : {manifest.box_count}</a>{" , "}
        <br />
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
          {mn_orders.map((val, key) => {
            let f_date_f = val.created_at.split("T");
            let f_date = f_date_f[0];
            let f_time_r = String(f_date_f[1]).substring(0, 5);
            let l_fdate = f_date + " " + f_time_r;

            return (
              <tr
                key={key}
                style={{
                  textAlign: "centre",
                  border: "0.5px solid black",
                  padding: "0.5rem",
                }}
              >
                <td>{key + 1}</td>
                <td>{l_fdate}</td>
                <td>{val.docket_no}</td>
                <td>{toTitleCase(val.consignee_city)}</td>
                <td>{toTitleCase(val.shipper)}</td>
                <td>{toTitleCase(val.shipper_city)}</td>
                <td>{toTitleCase(val.consignee)}</td>
                <td>{val.eway_bill_no ? val.eway_bill_no : "-"}</td>
                <td>{val.total_quantity}</td>
                <td>{val.actual_weight}</td>
                <td>{val.remarks ? val.remarks : "-"}</td>
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

export default Manifest_pdf;
