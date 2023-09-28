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
  const accessToken = useSelector((state) => state.authentication.access_token);
  const [mn_orders_s, setmn_orders_s] = useState([]);
  const [loading_err, setloading_err] = useState(true);
  const [coloader_name, setcoloader_name] = useState();
  const componentRef = useRef();
  const [manifest, setmanifest] = useState(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const mn_orders = (manifest_no) => {
    axios
      .get(
        ServerAddress +
          `manifest/get_manifest_order/?manifest_no=${manifest_no}`,

        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        if (response.data.length > 0) {
          setmn_orders_s(response.data);
        }
      })
      .catch((err) => {
        alert(`Error Occur in Get Manifest Order Data , ${err}`);
      });
  };

  const get_mn_details = (mn_no) => {
    // get_manifest/

    axios
      .get(ServerAddress + "manifestation/api/get_manifest/?mn_no=" + mn_no, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        setmanifest(response.data);
        mn_orders(response.data.manifest_no);
        setloading_err(false);
      })
      .catch((err) => {
        alert(`Error Occur in Get Manifest Order Data , ${err}`);
      });
  };

  useLayoutEffect(() => {
    try {
      setmanifest(location.state.manifest);
      setloading_err(false);
      mn_orders(location.state.manifest.manifest_no);
      if (location.state.mn_coloader) {
        alert(location.state.mn_coloader);
      }
    } catch (error) {
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
        <a>Manifest Created Date : {manifest.manifest_date} </a>
        <br />
        <a>From: {manifest.from_branch_n} </a> <br />
        <a>Manifest No: {manifest.manifest_no}</a> <br />
        <a>Origin: {manifest.orgin_branch_n} </a> <br />
        <a>Manifest Actual Weight:{""}</a> <br />
        <a>Chargeable Weight : {""} </a> <br />
        <a>Flight Name & No : {"-"} </a> <br />
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
          {manifest.airwaybill_number ? manifest.airwaybill_number : "-"}
        </a>{" "}
        <br />
        <a>
          Manifest Forwarding Date :{" "}
          {manifest.manifest_forwarding_date
            ? manifest.manifest_forwarding_date
            : "-"}
        </a>{" "}
        <br />
        <a>To : {manifest.to_branch_n}</a> <br />
        <a>Destination : {manifest.destination_n}</a> <br />
        <a>
          Co-loader Name : {manifest.coloader ? manifest.coloader : "-"}
        </a>{" "}
        <br />
        <a>No of Bags : {manifest.bag_count ? manifest.bag_count : "-"}</a>{" "}
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
                <td>{val.created_at}</td>
                <td>{val.docket_no}</td>
                <td>{val.consignee_city}</td>
                <td>{val.shipper_name}</td>
                <td>{val.shipper_city}</td>
                <td>{val.consignee_name}</td>
                <td>{""}</td>
                <td>{val.pcs}</td>
                <td>{val.weight}</td>
                <td>{""}</td>
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
