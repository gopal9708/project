/* eslint-disable */
import React, { useRef, useState, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import axios from "axios";
import { FiSquare, FiCheckSquare } from "react-icons/fi";
import { useSelector } from "react-redux";
import { ServerAddress } from "../../../../constants/ServerAddress";
import qil_logo from "../../../../assets/images/qil_logo.png";
import Logo003 from "../../../../assets/images/Logo003.jpg"

export const ComponentToPrint = React.forwardRef(({ order }, ref) => {
  const accessToken = useSelector((state) => state.authentication.access_token);

  const [id, setid] = useState("");

  const [pkg_list, setpkg_list] = useState([]);
  const [more_than_8_pkg, setmore_than_8_pkg] = useState(false);
  const [pdf_li, setpdf_li] = useState([]);

  const get_packages = (id) => {
    let temp = [];
    let temp_list = [];
    let t_pkg_l = [];

    axios
      .get(ServerAddress + "bookings/api/get-packages/?order_id=" + id, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(function (response) {
        temp = response.data;
        if (response.data.length != 0) {
          for (let index = 0; index < temp.length; index++) {
            // temp_list.push([temp[index].length, temp[index].breadth, temp[index].height, temp[index].no_of_pieces]);
            temp_list.push(temp[index]);
          }
          if (response.data.length > 8) {
            setmore_than_8_pkg(true);
          }

          for (let index = 0; index < 8; index++) {
            if (index < response.data.length) {
              t_pkg_l.push([
                temp[index].length,
                temp[index].breadth,
                temp[index].height,
                temp[index].no_of_pieces,
              ]);
            } else {
              t_pkg_l.push(["-", "-", "-", "-"]);
            }
          }

          setpkg_list(t_pkg_l);
        } else {
          for (let index = 0; index < 8; index++) {
            t_pkg_l.push(["-", "-", "-", "-"]);
          }
          setpkg_list(t_pkg_l);
        }
        setid("");
      })
      .catch((error) => {
        alert(`Error Happen while posting data  Data ${error}`);
      });
  };

  useLayoutEffect(() => {
    if (order.id) {
      setid(order.id);
    }
  }, [order.id]);

  const location = useLocation();
  useLayoutEffect(() => {
    setpdf_li(location.state.order);
    setpkg_list(location.state.packages);
  }, []);

  const [booking_date, setbooking_date] = useState("");
  const [booking_date_time, setbooking_date_time] = useState("");
  // useLayoutEffect(() => {
  // if( pdf_li.booking_at){
  //   let booking_date = pdf_li.booking_at
  // let booking_at_s = booking_date.split("T");
  //   setdate(booking_at_s[0])
  //   let B_time = booking_at_s[1]
  //   let Book_time = B_time.split("+")

  //   settime(Book_time[1])
  // }
  // }, [pdf_li.booking_at])
  useLayoutEffect(() => {
    if (pdf_li.booking_at) {
      let s = new Date(pdf_li.booking_at).toLocaleString(undefined, {
        timeZone: "Asia/Kolkata",
      });
      let s_date = s.split(",");
      setbooking_date(s_date[0]);
      setbooking_date_time(s_date[1]);
    }
  }, [pdf_li.booking_at]);

  return (
    <div className="m-2" ref={ref} id={"invoice_div"}>
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
                  <img src={Logo003} width="200vw" height="60vh" />
                  {/* <img src={qil_logo} width="200vw" height="60vh" /> */}
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
                    <div>E-Mail: info@qilpl.com</div>{" "}
                    {/*need to add email link */}
                    {/* <div>Mobile No.1: +91 72800 44001</div>
                      <div>Mobile No.2: +91 72800 44002</div> */}
                  </b>
                  <div>Toll Free No: 1800 102 6594</div>
                </span>
              </div>
            </td>
            <td colSpan={4} rowSpan={2}>
              {/* <div dangerouslySetInnerHTML={{ __html: order.qrcode }}></div> */}
              <img  src={pdf_li.qrcode}
                      height="200"
                      width="200"
                                        
                />
              
            </td>
            <td colSpan={4}>
              <b style={{ color: "blue", lineHeight: "1em" }}>
                BOOKING DATE :{" "}
              </b>
              <br />
              <b>
                {booking_date}
                <br /> {booking_date_time}{" "}
              </b>
            </td>
          </tr>
          {/* Row2 */}
          <tr>
            <td colSpan={4}>
              <div>
                <b>
                  <div>
                    {pdf_li.delivery_type == "DOMESTIC" ? (
                      <FiCheckSquare />
                    ) : (
                      <FiSquare />
                    )}
                    <label> DOMESTIC</label>
                  </div>

                  <div>
                    {pdf_li.delivery_type == "LOCAL" ? (
                      <FiCheckSquare />
                    ) : (
                      <FiSquare />
                    )}
                    <label> LOCAL</label>
                  </div>

                  <div>
                    {pdf_li.delivery_type == "INTERNATIONAL" ? (
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
                <div style={{ fontSize: "20px" }}>{pdf_li.shipper_name}</div>
                <div style={{ fontSize: "15px" }}>
                  {pdf_li.shipper_state +
                    "," +
                    pdf_li.shipper_city +
                    "," +
                    pdf_li.shipper_pincode}
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
                <div style={{ fontSize: "20px" }}>{pdf_li.consignee_name}</div>
                <div style={{ fontSize: "15px" }}>
                  {pdf_li.consignee_state +
                    "," +
                    pdf_li.consignee_city +
                    "," +
                    pdf_li.consignee_pincode}
                </div>
              </div>
            </td>

            <td colSpan={4}>
              {pdf_li.shipper_state +
                ", " +
                pdf_li.shipper_city +
                ", " +
                pdf_li.shipper_pincode}
              ,
            </td>
            <td colSpan={3}>
              {pdf_li.consignee_state +
                ", " +
                pdf_li.consignee_city +
                ", " +
                pdf_li.consignee_pincode}
            </td>
          </tr>
          <tr>
            <td colSpan={7}>TYPES OF BOOKING:</td>
          </tr>
          <tr>
            <td colSpan={7}>
              <div>
                <span>
                  {pdf_li.booking_type == "PRIORITY" ? (
                    <FiCheckSquare />
                  ) : (
                    <FiSquare />
                  )}
                  <label>PRIORITY</label>
                </span>{" "}
                {"  "}{" "}
                <span>
                  {pdf_li.booking_type == "ECONOMY" ? (
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
                  {pdf_li.cold_chain == true ? <FiCheckSquare /> : <FiSquare />}
                  <label>COLD CHAIN</label>
                </span>

                <span>
                  {/* <input type='checkbox' checked={order.cold_chain =='false' ? true : false}/> */}
                  {pdf_li.cold_chain == false ? (
                    <FiCheckSquare />
                  ) : (
                    <FiSquare />
                  )}
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
            <td colSpan={3}>{pdf_li.total_quantity}</td>
            <td colSpan={4}>{pdf_li.commodity_name}</td>
            <td colSpan={7} rowSpan={4} style={{ fontSize: "30px" }}>
              {pdf_li.docket_no}
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
            <td colSpan={3}>{pdf_li.actual_weight}</td>
            <td colSpan={4}>{pdf_li.chargeable_weight}</td>
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
            <td colSpan={2}>{""}</td>
            <td colSpan={2}>{""}</td>
            <td colSpan={2}>{""}</td>
            <td>{""}</td>

            <td colSpan={7} rowSpan={8}>
              {pdf_li.remarks}
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
            <td colSpan={2}>{""}</td>
            <td colSpan={2}>{""}</td>
            <td colSpan={2}>{12}</td>
            <td>{13}</td>
          </tr>
          <tr>
            <td colSpan={2}>{""}</td>
            <td colSpan={2}>{""}</td>
            <td colSpan={2}>{12}</td>
            <td>{13}</td>
          </tr>
          <tr>
            <td colSpan={2}>{""}</td>
            <td colSpan={2}>{""}</td>
            <td colSpan={2}>{12}</td>
            <td>{13}</td>
          </tr>
          <tr>
            <td colSpan={2}>{""}</td>
            <td colSpan={2}>{""}</td>
            <td colSpan={2}>{12}</td>
            <td>{13}</td>
          </tr>{" "}
          <tr>
            <td colSpan={2}>{""}</td>
            <td colSpan={2}>{""}</td>
            <td colSpan={2}>{12}</td>
            <td>{13}</td>
          </tr>{" "}
          <tr>
            <td colSpan={2}>{""}</td>
            <td colSpan={2}>{""}</td>
            <td colSpan={2}>{12}</td>
            <td>{13}</td>
          </tr>
          <tr>
            <td colSpan={2}>{""}</td>
            <td colSpan={2}>{""}</td>
            <td colSpan={2}>{12}</td>
            <td>{13}</td>
          </tr>
          {/* <tr>
              <td colSpan={2}>{pkg_list[2][0]}</td>
              <td colSpan={2}>{pkg_list[2][1]}</td>
              <td colSpan={2}>{pkg_list[2][2]}</td>
              <td>{pkg_list[2][3]}</td>
            </tr> */}
          {/* <tr>
              <td colSpan={2}>{pkg_list[3][0]}</td>
              <td colSpan={2}>{pkg_list[3][1]}</td>
              <td colSpan={2}>{pkg_list[3][2]}</td>
              <td>{pkg_list[3][3]}</td>
            </tr> */}
          {/* <tr>
              <td colSpan={2}>{pkg_list[4][0]}</td>
              <td colSpan={2}>{pkg_list[4][1]}</td>
              <td colSpan={2}>{pkg_list[4][2]}</td>
              <td>{pkg_list[4][3]}</td>
            </tr> */}
          {/* <tr>
              <td colSpan={2}>{pkg_list[5][0]}</td>
              <td colSpan={2}>{pkg_list[5][1]}</td>
              <td colSpan={2}>{pkg_list[5][2]}</td>
              <td>{pkg_list[5][3]}</td>
            </tr> */}
          {/* <tr>
              <td colSpan={2}>{pkg_list[6][0]}</td>
              <td colSpan={2}>{pkg_list[6][1]}</td>
              <td colSpan={2}>{pkg_list[6][2]}</td>
              <td>{pkg_list[6][3]}</td>
            </tr> */}
          {/* <tr>
              <td colSpan={2}>{pkg_list[7][0]}</td>
              <td colSpan={2}>{pkg_list[7][1]}</td>
              <td colSpan={2}>{pkg_list[7][2]}</td>
              <td>{pkg_list[7][3]}</td>
            </tr> */}
          <tr>
            <td
              colSpan={7}
              rowSpan={2}
              style={{ paddingLeft: "10px", textAlign: "left" }}
            >
              <b>
                <p>
                  Received by <b>Quick India Logistics pvt Ltd.</b>
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

const Invoice_PDF = () => {
  const [order, setorder] = useState([]);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

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

export default Invoice_PDF;
