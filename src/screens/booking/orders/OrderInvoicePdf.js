/* eslint-disable */
import React, { useRef, useState, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { FiSquare, FiCheckSquare } from "react-icons/fi";
import toTitleCase from "../../../lib/titleCase/TitleCase";
import qil_log from "../../../assets/images/qil_logo.png";

export const ComponentToPrint = React.forwardRef(({ order }, ref) => {
  //used for date and time
  const [booking_date, setbooking_date] = useState("");
  const [booking_date_time, setbooking_date_time] = useState("");

  const [pkg_list, setpkg_list] = useState([]);
  const [more_than_8_pkg, setmore_than_8_pkg] = useState(false);
  // const get_packages = id => {
  //   let temp = [];
  //   let temp_list = [];
  //   let t_pkg_l = [];

  //   axios
  //     .get(ServerAddress + "bookings/api/get-packages/?order_id=" + id, {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     })
  //     .then(function (response) {
  //       temp = response.data;
  //       if (response.data.length != 0) {
  //         for (let index = 0; index < temp.length; index++) {
  //           // temp_list.push([temp[index].length, temp[index].breadth, temp[index].height, temp[index].no_of_pieces]);
  //           temp_list.push(temp[index]);
  //         }
  //         if (response.data.length > 8) {
  //           setmore_than_8_pkg(true);
  //         }

  //         for (let index = 0; index < 8; index++) {
  //           if (index < response.data.length) {
  //             t_pkg_l.push([
  //               temp[index].length,
  //               temp[index].breadth,
  //               temp[index].height,
  //               temp[index].no_of_pieces,
  //             ]);
  //           } else {
  //             t_pkg_l.push(["-", "-", "-", "-"]);
  //           }
  //         }

  //         setpkg_list(t_pkg_l);
  //       } else {
  //         for (let index = 0; index < 8; index++) {
  //           t_pkg_l.push(["-", "-", "-", "-"]);
  //         }
  //         setpkg_list(t_pkg_l);
  //       }
  //       setid("");
  //     })
  //     .catch(error => {
  //       alert(`Error Happen while posting data  Data ${error}`);
  //     });
  // };

  // useLayoutEffect(() => {
  //   if (order.id) {
  //     setid(order.id);
  //   }
  // }, [order.id]);

  // useEffect(() => {
  //   if (id != "") {
  //     get_packages(id);
  //   }
  // }, [id]);

  // useLayoutEffect(() => {
  //   let temp = [];
  //   let temp_list = [];
  //   let t_pkg_l = [];
  //   temp = order.packages;
  //   if (temp && temp.length != 0)
  //   console.log("Tempchecking",temp)
  //     for (let i = 0; i < temp.length; i++) {
  //       temp_list.push([
  //         temp[i].length,
  //         temp[i].breadth,
  //         temp[i].height,
  //         temp[i].no_of_pieces,
  //       ]);
  //       console.log("first",temp_list)
  //     }

  //   for (let index = 0; index < 8; index++) {
  //     if (index < temp_list.length) {
  //       // console.log("jhgukjhlji778iuhkb")
  //       t_pkg_l.push([
  //         temp[index].length,
  //         temp[index].breadth,
  //         temp[index].height,
  //         temp[index].no_of_pieces,
  //       ]);
  //     } else {
  //       t_pkg_l.push(["-", "-", "-", "-"]);
  //     }
  //     console.log("t_pkg_l",t_pkg_l)
  //   }

  //   setpkg_list(t_pkg_l);
  //   console.log("pkg_list",pkg_list)
  // }, [order.packages]);

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

  // const Mycompoment =() =>{
  //   const htmlString = `<div><img src="${order.qrcode}" /></div>`;
  //   return {__html: htmlString};
  // }
  return (
    <div className="m-2" ref={ref} id={"invoice_div"}>
      {/* {pkg_list.length != 8 && ( */}
      <table
        className="table-grid"

        //  style={{ width: "286mm", height: "650px", border: '1px solid black', }}
      >
        <tbody>
          {/* Row1 */}
          <tr>
            <td colSpan={13} rowSpan={2}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "1vh",
                }}
                md="8"
              >
                <span style={{ display: "flex", alignItems: "center" }}>
                  <img src={qil_log} width="200vw" height="60vh" />
                </span>
                <span>
                  <b>
                    <div>
                      Web:{" "}
                      <a
                        href="http://beta.quickindialogistics.com/"
                        target={"_blank"}
                      >
                        http://beta.quickindialogistics.com/
                      </a>
                    </div>
                    <div>E-Mail: info@qilpl.com </div>{" "}
                    {/*need to add email link */}
                    {/* <div>Mobile No.1: +91 72800 44001</div>
                      <div>Mobile No.2: +91 72800 44002</div> */}
                  </b>
                  <div>Toll Free No: 1800 102 6594</div>
                </span>
              </div>
            </td>
            <td colSpan={4} rowSpan={2}>
            {/* <div >  */}
                <img  src={order.qrcode}
                      height="200"
                      width="200"
                                        
                />
              {/* </div> */}
            </td>
            <td colSpan={4}>
              <b style={{ color: "blue", lineHeight: "1em" }}>
                BOOKING DATE :{" "}
              </b>
              <br />
              <b>
                {booking_date} <br /> {booking_date_time}{" "}
              </b>
            </td>
          </tr>

          {/* Row2 */}
          <tr>
            <td colSpan={4}>
              <div>
                <b>
                  <div>
                    {console.log("hellooo jiii",order)}
                    {order.delivery_type == "DOMESTIC" ? (
                      <FiCheckSquare />
                    ) : (
                      <FiSquare />
                    )}
                    <label> DOMESTIC</label>
                  </div>

                  <div>
                    {order.delivery_type === "LOCAL" ? (
                      <FiCheckSquare />
                    ) : (
                      <FiSquare />
                    )}
                    <label> LOCAL</label>
                  </div>

                  <div>
                    {order.delivery_type == "INTERNATIONAL" ? (
                      <FiCheckSquare />
                    ) : (
                      <FiSquare />
                    )}
                    <label> INTERNATIONAL</label>
                  </div>
                </b>
              </div>
            </td>
          </tr>

          {/* Row3 */}
          <tr>
            <td colSpan={7} className="table_header">
              <span>SHIPPER</span>
            </td>
            <td
              colSpan={7}
              className="table_header"
              style={{ fontWeight: "bold" }}
            >
              CONSIGNEE
            </td>
            <td colSpan={4} className="table_header">
              ORIGIN
            </td>
            <td colSpan={3} className="table_header">
              DESTINATION
            </td>
          </tr>

          {/* Row4 */}
          <tr>
            <td colSpan={7} rowSpan={5}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <div style={{ fontSize: "20px" }}>{order.shipper_name}</div>
                <div style={{ fontSize: "15px" }}>
                  {toTitleCase(order.shipper_city) +
                    ", " +
                    toTitleCase(order.shipper_state) +
                    ", " +
                    order.shipper_pincode}
                </div>
              </div>
            </td>

            <td colSpan={7} rowSpan={5}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <div style={{ fontSize: "20px" }}>{order.consignee_name}</div>
                <div style={{ fontSize: "15px" }}>
                  {toTitleCase(order.consignee_city) +
                    ", " +
                    toTitleCase(order.consignee_state) +
                    ", " +
                    order.consignee_pincode}
                </div>
              </div>
            </td>

            <td colSpan={4}>
              {" "}
              {toTitleCase(order.consignee_locality) +
                ", " +
                toTitleCase(order.consignee_pincode)}
            </td>
            <td colSpan={3}>
              {toTitleCase(order.shipper_locality) +
                ", " +
                toTitleCase(order.shipper_pincode)}
            </td>
          </tr>

          <tr>
            <td colSpan={7}>TYPES OF BOOKING: </td>
          </tr>

          <tr>
            <td colSpan={7}>
              <div>
                <span>
                  {order.booking_type == "PRIORITY" ? (
                    <FiCheckSquare />
                  ) : (
                    <FiSquare />
                  )}
                  <label>PRIORITY</label>
                </span>{" "}
                {"  "}
                <span>
                  {order.booking_type == "ECONOMY" ? (
                    <FiCheckSquare />
                  ) : (
                    <FiSquare />
                  )}
                  <label>ECONOMY</label>
                </span>
              </div>
            </td>
          </tr>

          <tr>
            <td colSpan={7}>SHIPMENT TYPE:</td>
          </tr>

          <tr>
            <td colSpan={7}>
              <div>
                <span>
                  {/* <input type='checkbox' 
                    
                     checked={order.cold_chain =='true' ? true : false} 
                     /> */}
                  {order.cold_chain == true ? <FiCheckSquare /> : <FiSquare />}
                  <label>COLD CHAIN</label>
                </span>{" "}
                <span>
                  {/* <input type='checkbox' checked={order.cold_chain =='false' ? true : false}/> */}
                  {order.cold_chain == false ? <FiCheckSquare /> : <FiSquare />}
                  <label>NO COLD CHAIN</label>
                </span>
              </div>
            </td>
          </tr>

          <tr>
            <td colSpan={3}>PACKETS</td>
            <td colSpan={4}>COMMODITY</td>
            <td colSpan={7}>CONSIGNMENT NO.</td>
            <td colSpan={3}>INV.NO</td>
            <td colSpan={2}>INV.DATE</td>
            <td colSpan={2}>INV.VALUE</td>
          </tr>
          <tr>
            <td colSpan={3}>{order.total_quantity}</td>
            <td colSpan={4}>{order.commodity_name}</td>
            <td colSpan={7} rowSpan={4} style={{ fontSize: "30px" }}>
              {order.docket_no}
            </td>
            <td colSpan={3}></td>
            <td colSpan={2}></td>
            <td colSpan={2}></td>
          </tr>
          <tr>
            <td colSpan={3}>ACT. WEIGHT</td>
            <td colSpan={4}>CHARGEABLE WEIGHT</td>
            <td colSpan={3}></td>
            <td colSpan={2}></td>
            <td colSpan={2}></td>
          </tr>

          <tr>
            <td colSpan={3}>{order.actual_weight}</td>
            <td colSpan={4}>{order.chargeable_weight}</td>
            <td colSpan={3}></td>
            <td colSpan={2}></td>
            <td colSpan={2}></td>
          </tr>

          <tr>
            <td colSpan={7}>VOLUMETRIC WEIGHT CONVERSION (IN CMS)</td>
            <td colSpan={3}></td>
            <td colSpan={2}></td>
            <td colSpan={2}></td>
          </tr>
          <tr>
            <td colSpan={2}>L</td>
            <td colSpan={2} rowSpan={1}>
              B
            </td>
            <td colSpan={2}>H</td>
            <td>PCS.</td>
            <td colSpan={7}>Remarks</td>
            <td colSpan={4}>Total Invoice value</td>
            <td colSpan={3}></td>
          </tr>

          <tr>
            <td colSpan={2}>{8}</td>
            <td colSpan={2}>{4}</td>
            <td colSpan={2}>{3}</td>
            <td>{8}</td>

            <td colSpan={7} rowSpan={8}>
              {order.remarks}
              {more_than_8_pkg && `, More Packages Added`}
            </td>
            <td colSpan={7} rowSpan={8}>
              <div>
                <p>
                  Received above Shipment along with all document <br /> order
                  in good condition.
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  paddingLeft: "10px",
                  textAlign: "left",
                }}
              >
                <div
                  className="tc1"
                  style={{
                    flex: "1",
                  }}
                >
                  <p>
                    <b>Name:</b>
                  </p>
                </div>
                <div
                  classNamme="tc2"
                  style={{
                    flex: "1",
                  }}
                >
                  <p>
                    <b>Signature:</b>
                  </p>
                </div>
              </div>
              <br />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-Start",
                  paddingLeft: "10px",
                }}
              >
                <p>
                  <b>Date &amp; Time: </b>
                </p>
              </div>
            </td>
          </tr>
          {/* </>
        )
         })} */}

          <tr>
            <td colSpan={2}>{"-"}</td>
            <td colSpan={2}>{"-"}</td>
            <td colSpan={2}>{"-"}</td>
            <td>{"-"}</td>
          </tr>

          <tr>
            <td colSpan={2}>{"-"}</td>
            <td colSpan={2}>{"-"}</td>
            <td colSpan={2}>{"-"}</td>
            <td>{"-"}</td>
          </tr>

          <tr>
            <td colSpan={2}>{"-"}</td>
            <td colSpan={2}>{"-"}</td>
            <td colSpan={2}>{"-"}</td>
            <td>{"-"}</td>
          </tr>

          <tr>
            <td colSpan={2}>{"-"}</td>
            <td colSpan={2}>{"-"}</td>
            <td colSpan={2}>{"-"}</td>
            <td>{"-"}</td>
          </tr>

          <tr>
            <td colSpan={2}>{"-"}</td>
            <td colSpan={2}>{"-"}</td>
            <td colSpan={2}>{"-"}</td>
            <td>{"-"}</td>
          </tr>
          <tr>
            <td colSpan={2}>{"-"}</td>
            <td colSpan={2}>{"-"}</td>
            <td colSpan={2}>{"-"}</td>
            <td>{"-"}</td>
          </tr>
          <tr>
            <td colSpan={2}>{"-"}</td>
            <td colSpan={2}>{"-"}</td>
            <td colSpan={2}>{"-"}</td>
            <td>{"-"}</td>
          </tr>

          <tr>
            <td
              colSpan={7}
              rowSpan={2}
              style={{ paddingLeft: "10px", textAlign: "left" }}
            >
              <b>
                <p>
                  Received by : <b>Quick India Logistics pvt Ltd.</b>
                </p>
                <p>Booking Clerk:</p>
                <p>Shipper Signature:</p>
              </b>
            </td>
            <td colSpan={14}>
              <p style={{ color: "red" }}>
                <b>
                  Note: Quantity and Quality not Checked <br />
                  We are not responsible for Leakage/Damage.
                  <br /> Subject to terms &amp; Conditions.
                </b>
              </p>
            </td>
          </tr>
          <tr colSpan={14}>
            <td colSpan={3}>
              <p style={{ paddingTop: "5px " }}>
                <b> E-way Bill Number </b>
              </p>
            </td>
            <td colSpan={11}></td>
          </tr>
        </tbody>
      </table>
      {/* // )}  */}
      <br />
      <h6>
        <p
          style={{
            backgroundColor: "khaki",
            fontSize: "10px",
            width: "fit-content",
          }}
        >
          {" "}
          * Please visit our Website,
          <strong>
            <a href="http://beta.quickindialogistics.com/">
              http://beta.quickindialogistics.com/
            </a>{" "}
            <a href="http://beta.quickindialogistics.com/">
              terms &amp; conditions{" "}
            </a>
          </strong>{" "}
          for terms and conditions of our service.
        </p>
      </h6>
    </div>
  );
});

const OrderInvoicePdf = () => {
  const [order, setorder] = useState([]);
  const location = useLocation();
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

export default OrderInvoicePdf;
