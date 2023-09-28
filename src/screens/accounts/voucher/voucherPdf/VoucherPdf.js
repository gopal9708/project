import React, { useRef, useState, useLayoutEffect } from "react";
import "./VoucherPdf.css";
import logo from "./Newlogo.png";
import { useReactToPrint } from "react-to-print";
import { useLocation } from "react-router-dom";
import { fontWeight } from "@mui/system";
// import styled from "styled-components"; 


export const ComponentToPrint = React.forwardRef(( { voucher },ref) => {
  console.log("clicked5555")
  return (
    <div className="container" style={{border:"1px solid black"}} ref={ref}>
      <div className="container-child">
        <div className="image">
          <img src={logo}></img>   
        </div>
        <div className="cash">
          CASH/JOURNAL VOUCHER
          <div className="dhtc">DHTC INDIA LIMITED</div>
          <div className="address">
            95, SARAT BOSE ROAD, 4TH FLOOR, KOLKATA-26
          </div>
          <div className="voucher-no">
            VOUCHER NO.: MR0971594
            <div className="branch"> BRANCH : KOLKATA</div>
            <div className="entary-date"> ENTRAY DATE : 20/06/2023</div>
          </div>
          <div className="voucher-date"> VOUCHER DATE : 20/06/2023</div>
            <table className="table-m1" style={{border:"1px solid black"}}>   
            <tbody>
              <tr style={{fontSize:"medium", border:"1px solid black",fontWeight:"600"}}>
                <td width={"5%"} style={{border:"1px solid black"}}>Code</td>
                <td width={"15%"}style={{border:"1px solid black"}}> Account Name </td>
                <td width={"60%"}style={{border:"1px solid black"}}> Narration</td>
                <td width={"10%"}style={{border:"1px solid black"}}> Dr.</td>
                <td width={"10%"}style={{border:"1px solid black"}}> Cr.</td>
              </tr>
              <tr style={{fontSize:"small",fontWeight:"600"}}>
                <td style={{border:"1px solid black"}}>
                  191HD
                  <div style={{ marginTop: "100px" }}>444BB</div>
                  <div style={{ marginTop: "100px" }}></div>
                </td>
                <td style={{border:"1px solid black"}}>
                  
                  HDFC BANK (CC A/C)
                  <div style={{ marginTop: "100px" }}> MUMBAI OFFICE</div>
                  <div style={{ marginTop: "100px" }}></div>
                </td>
                <td style={{border:"1px solid black"}}>
                  
                  TO CHQ NO.RTGS DT 20/06/2023 RECD FROM AMAR TEA PRIVATE
                  LIMITED
                  <div style={{ marginTop: "100px" }}>
                    TO CHQ NO.RTGS DT 20/06/2023 RECD FROM AMAR TEA PRIVATE
                    LIMITED
                  </div>
                  <div style={{ marginTop: "100px" }}></div>
                </td>
                <td style={{border:"1px solid black"}}>
                  2794389.43
                  <div style={{ marginTop: "100px" }}>&nbsp;</div>
                  <div style={{ marginTop: "100px" }}></div>
                </td>
                <td style={{border:"1px solid black"}}>
                  <div style={{ marginTop: "100px" }}>2794389.43</div>
                  <div style={{ marginTop: "100px" }}></div>
                </td>
              </tr>
              <tr style={{fontSize:"small",fontWeight: "bold",}}>
                <td
                  colSpan={3}
                  style={{  textAlign: "right",border:"1px solid black" }}
                > 
                  TOTAL
                </td>
                <td style={{ textAlign: "center",border:"1px solid black"}}>2794389.43 </td>
                <td style={{ textAlign: "center",border:"1px solid black"}}>2794389.43 </td>
              </tr>
            </tbody>
          </table>
          <div className="voucher-no">
            Prepared By LAXMANRAM KHINW
            <div className="branch"> Checked By:</div>
            <div className="entary-date"> H.O./ Director: </div>
            <div className="entary-date"> Received By:</div>
          </div>
          <div className=""> </div>
        </div>
      </div>
    </div>
  );
});

const VoucherPdf = () => {
  const [voucher, setvoucher] = useState([]);
  const location = useLocation();
    console.log("loc=======", location)
  const componentRef = useRef();
  { console.log("clicked111 ")}
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    
  });
  { console.log("clicked222 ")}
  useLayoutEffect(() => {
    setvoucher(location.state);
}, []);

  
  
  return (
    <div>
      { console.log("clicked3333")}

      <ComponentToPrint ref={componentRef} voucher={voucher} />
      { console.log("clicked666")}
      {/* <button
      onClick={() => {
        handlePrint();
        window.location.reload();
      }}
    >
      Reload the Page
    </button> */}
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
            // window.print();
            { console.log("clicked4444 ")}
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
    }3
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
    // window.location.reload();
  );
};

export default VoucherPdf;
