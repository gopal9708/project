/* eslint-disable */
import React, { useRef, useState, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { FiSquare, FiCheckSquare } from "react-icons/fi";
import Logo003 from "../../../assets/images/Logo003.jpg";
import toTitleCase from "../../../lib/titleCase/TitleCase";

export const ComponentToPrint = React.forwardRef(({ order }, ref) => {
    console.log("order======", order)
    //used for date and time
    const [booking_date, setbooking_date] = useState("");
    const [booking_date_time, setbooking_date_time] = useState("");
    useLayoutEffect(() => {
        if (order.booking_at) {
            let s = new Date(order.booking_at).toLocaleString(undefined, {
                timeZone: "Asia/Kolkata",
            });
            let s_date = s.split(",");
            setbooking_date(s_date[0]);
            setbooking_date_time(s_date[1]);
        }
    }, [order.booking_at]);
    return (
        <div className="m-2" ref={ref} id={"invoice_div"}>
            <table
                className="table-grid">
                <tbody>
                    <tr>
                        <td colSpan={2}>
                            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                                <div style={{ marginTop: "20px" }}> <h3>AIRWAYBILL NUMBER</h3><br></br><h2><b> {order.docket_no}</b></h2></div>
                                <div>
                                    <img src={order.qrcode}
                                        height="135"
                                        width="135"

                                    />
                                </div>
                            </div>

                        </td>
                        <td colSpan={4}>
                            <div style={{ display: "flex", alignItems: "center", marginLeft: 20, marginTop: 20 }}>
                                <img src={Logo003} width="250vw" height="60vh" />
                            </div>

                            <div style={{ float: "right", marginRight: 20 }}><b>Web:</b> www.ssciogistics.in<br></br><b>E-Mail: </b>info@ssciogistics.in</div></td>

                    </tr>

                    <tr>
                        <td colSpan={2}><b>DATE<br></br>{booking_date}</b></td>
                        <th colSpan={4}>&nbsp;<b>ISO 9001 2015 CERTIFIED COMPANY</b></th>
                    </tr>
                    <tr>
                        <th rowSpan={2}>&nbsp;Name</th><td rowSpan={2}>Shipper<br></br>{order.shipper}</td>
                    </tr>
                    <tr>
                        <th colSpan={1}>&nbsp;Shipper's Acct No.</th><td colSpan={3}>--</td>
                    </tr>
                    <tr>
                        <th rowSpan={2}>&nbsp;Address</th>
                        <td rowSpan={2}>
                            {
                                order.shipper_address1 ?
                                    (toTitleCase(order.shipper_address1))
                                    :
                                    (toTitleCase(order.shipper_city) +
                                        ", " +
                                        toTitleCase(order.shipper_state) +
                                        ", " +
                                        order.shipper_pincode)
                            }

                        </td>

                        <th colSpan={1}>&nbsp;Shipper,s Ref/Protocol No.</th><td colSpan={3}>--</td>
                    </tr>
                    <tr><th colSpan={1}>&nbsp;Origin</th><td colSpan={3}>
                        {toTitleCase(order.shipper_locality) +
                            ", " +
                            toTitleCase(order.shipper_pincode)}
                    </td></tr>
                    <tr>
                        <th rowSpan={2}>&nbsp;Contact No.</th><td rowSpan={2}><b>Phone:</b>--<br></br>&nbsp;</td>
                    </tr>
                    <tr>
                        <th colSpan={1}>&nbsp;Destination</th><td colSpan={3}>
                            {toTitleCase(order.consignee_locality) +
                                ", " +
                                toTitleCase(order.consignee_pincode)}
                        </td>
                    </tr>
                    <tr>
                        <th rowSpan={2}>&nbsp;Name</th><td rowSpan={2}>Consignee<br></br>{order.consignee}</td>
                    </tr>
                    <tr>
                        <th colSpan={1}>&nbsp;No. of Pcs</th><td colSpan={3}>{order.total_quantity}</td>
                    </tr>
                    <tr>
                        <th rowSpan={3}>&nbsp;Address</th>
                        <td rowSpan={3}>
                            {
                                order.consignee_address1 ?
                                    (toTitleCase(order.consignee_address1))
                                    :
                                    (toTitleCase(order.consignee_city) +
                                        ", " +
                                        toTitleCase(order.consignee_state) +
                                        ", " +
                                    order.consignee_pincode)
                            }
                        </td>
                        <th colSpan={1}>&nbsp;Actual Weight.</th><td colSpan={3}>{order.actual_weight}</td>
                    </tr>
                    <tr><th colSpan={1}>&nbsp;Chargeable Weight</th><td colSpan={3}>{order.chargeable_weight}</td></tr>

                    <tr><th colSpan={1}>&nbsp;Invoice Values</th><td colSpan={3}>--</td></tr>

                    <tr>
                        <th rowSpan={2}>&nbsp;Contact No.</th><td rowSpan={2}><b>Phone:</b>--<br></br>&nbsp;</td>
                    </tr>
                    <tr>
                        <th colSpan={1}>&nbsp;Dimensions</th><td colSpan={3}>--</td>
                    </tr>

                    <tr>
                        <th colSpan={2}>&nbsp;Content:: Pharmacutical sample.<br></br>&emsp;</th>
                        <th colSpan={4}>&nbsp;Special Instruction :<br></br>&nbsp;Dry ice with data logger.<br></br>&nbsp;<br></br>&emsp;</th>
                    </tr>

                    <tr>
                        <td rowSpan={3} colSpan={2}>Sensitive Supply Chain Logistics LTD liability is limited. By tendering the <br></br>shipment to Sensitive
                            Supply Chain Logistics LTD shipper agrees to the terms and conditions.Sensitive Supply <br></br>
                            Chain Logistics LTD liability for any loss or damage of the shipment will not exceed more<br></br> than $50 or declared value for insurance where shown . This is the non negotiable airway bill. </td>
                    </tr>
                    <tr colSpan={4}>
                        <td><input type="checkbox"></input><br></br>Ambient</td><td><input type="checkbox"></input><br></br>Frozen</td><td><input type="checkbox"></input><br></br>Refrigerated</td><td><input type="checkbox"></input><br></br>Other&emsp;</td>
                    </tr>
                    <tr>
                        <td colSpan={4} style={{ textAlign: "left", paddingLeft: "4px" }}>
                            <div>Does this shipment contains dangerous goods &emsp;<input type="checkbox"></input>&emsp; <b>By Air</b>  &emsp;&emsp; </div>
                            <div> UN Number </div>
                            <div><b> Expected  &emsp;&emsp; Packing Group</b> </div>
                        </td>
                    </tr>

                    <tr>
                        <th rowSpan={2}>&nbsp;Shipper's Signature <br></br>&emsp;<br></br>&emsp;<br></br>&emsp;</th>
                        <th rowSpan={2}>Date<br></br>Time<br></br>&emsp;<br></br>&emsp;</th>
                    </tr>
                    <tr>
                        <th colSpan={2}>&nbsp;Consignee Name<br></br>&emsp;<br></br>&emsp;<br></br>&emsp;</th>
                        <th colSpan={2}>Date<br></br>&emsp;<br></br>&emsp;<br></br>&emsp;</th>
                    </tr>

                    <tr>
                        <th rowSpan={2}>&nbsp;Pick up By <br></br>&emsp;<br></br>&emsp;<br></br>&emsp;<br></br>&emsp;</th>
                        <th rowSpan={2}>Date<br></br>Time<br></br>&emsp;<br></br>&emsp;<br></br>&emsp;</th>
                    </tr>
                    <tr>
                        <th colSpan={2}>&nbsp;Received in good order and condition.<br></br>&nbsp;Consignee Signature<br></br>&emsp;<br></br>&emsp;<br></br>&emsp;</th>
                        <th colSpan={2}>Date<br></br>&emsp;<br></br>&emsp;<br></br>&emsp;<br></br>&emsp;</th>
                    </tr>
                </tbody>
            </table>
        </div>
    );
});

const OrderPdf = () => {
    const [order, setorder] = useState([]);
    const location = useLocation();
    console.log("loc=======", location)
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    useLayoutEffect(() => {
        setorder(location.state.order);
    }, []);

    return (
        <div>
            <ComponentToPrint ref={componentRef} order={order} />
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
        // window.location.reload();
    );
};

export default OrderPdf;