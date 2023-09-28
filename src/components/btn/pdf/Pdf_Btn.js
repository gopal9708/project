import React from "react";
import "../../../assets/scss/Pdf/Pdf.scss";
//Import Image
import logo from "./logo.png";
// import MetaTags from "react-meta-tags";
// import PropTypes from "prop-types";
// import { Link } from "react-router-dom";
// import { Card, CardBody, Col, Container, Row, Table } from "reactstrap";
// import { isEmpty, map } from "lodash";

//Import Breadcrumb
// import Breadcrumbs from "../../components/Common/Breadcrumb";

//Import Image
// import logo from "../../assets/images/logo-dark.png";
// import { getInvoiceDetail as onGetInvoiceDetail } from "../../store/invoices/actions";
//redux
// import { useSelector, useDispatch } from "react-redux";

// const InvoiceDetail = props => {
//   const dispatch = useDispatch();

//   const { invoiceDetail } = useSelector(state => ({
//     invoiceDetail: state.invoices.invoiceDetail,
//   }));

//   const {
//     match: { params },
//   } = props;

//   useEffect(() => {
//     if (params && params.id) {
//       dispatch(onGetInvoiceDetail(params.id));
//     } else {
//       dispatch(onGetInvoiceDetail(1)); //remove this after full integration
//     }
//   }, [params, onGetInvoiceDetail]);

//Print the Invoice
const Pdf_Btn = () => {
  // window.print();
  // };

  return (
    //  <div>

    //     <legend classNameName="text-center header">Print</legend>
    //                                               <div classNameName="form-group">
    //                                                   <span classNameName="col-md-1 col-md-offset-2 text-center"><i classNameName="fa fa-user bigicon"></i></span>
    //                                                   {/* <input onChange={this.onChange('title')} name="title" type="text" placeholder="Post Title" classNameName="form-control" /> */}
    //                                                </div>
    //                                                <table style="width: 286mm; height: 650px;"/>
    <body>
      <br></br>
      <table></table>
      <tbody>
        <tr>
          <td colSpan="15" rowSpan="2">
            <div
              className="logo"
              style={{
                paddingLeft: "80px",
                textAlign: "centre",
                display: "flex",
              }}
            >
              <center>
                <img
                  src={logo}
                  alt="logo"
                  style={{
                    paddingTop: "100px",
                    textAlign: "centre",
                    paddingLeft: "15px",
                    width: "185px",
                    height: "175px",
                  }}
                ></img>
                <p>
                  <b>
                    <h6>
                      ISO 9001 2015 CERTIFIED <br />
                      COMPANY
                    </h6>
                  </b>
                </p>
              </center>
            </div>
            <div className="column1" style={{ fontWeight: "10px" }}>
              <p className="data">
                <b>Web:</b>www.quickindialogistics.com
              </p>{" "}
              <br />
              <p className="data">
                <b>E-Mail:</b>info@qilpl.com
              </p>{" "}
              <br />
              <p className="data">
                <b>Tel:</b>+91 022 4005 8229/2684 5232
              </p>{" "}
              <br />
              <p className="data">
                <b>Toll Free No:1800 209 1969</b>
              </p>
            </div>
          </td>

          <td colSpan="3" rowSpan="2">
            <div className="row1" style={{ paddingLeft: "5px" }}>
              <div id="qr">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="145"
                  width="145"
                  className="pyqrcode"
                >
                  <path
                    transform="scale(5)"
                    stroke="#000"
                    className="pyqrline"
                    d="M4 4.5h7m1 0h1m1 0h1m3 0h7m-21 1h1m5 0h1m3 0h1m1 0h1m1 0h1m5 0h1m-21 1h1m1 0h3m1 0h1m3 0h1m3 0h1m1 0h3m1 0h1m-21 1h1m1 0h3m1 0h1m1 0h1m1 0h3m1 0h1m1 0h3m1 0h1m-21 1h1m1 0h3m1 0h1m3 0h1m3 0h1m1 0h3m1 0h1m-21 1h1m5 0h1m7 0h1m5 0h1m-21 1h7m1 0h1m1 0h1m1 0h1m1 0h7m-19 2h1m1 0h3m1 0h2m1 0h3m3 0h1m2 0h1m-20 1h2m1 0h1m3 0h6m3 0h1m1 0h1m-20 1h1m1 0h3m1 0h2m5 0h1m2 0h3m1 0h1m-19 1h1m2 0h1m1 0h2m1 0h1m2 0h2m4 0h2m-20 1h1m1 0h1m2 0h3m1 0h2m2 0h1m1 0h1m1 0h1m1 0h1m-13 1h1m2 0h1m2 0h2m4 0h1m-21 1h7m2 0h3m2 0h2m2 0h1m-19 1h1m5 0h1m1 0h2m2 0h1m1 0h4m-18 1h1m1 0h3m1 0h1m1 0h1m6 0h1m2 0h1m1 0h1m-21 1h1m1 0h3m1 0h1m2 0h1m1 0h1m1 0h1m4 0h2m-20 1h1m1 0h3m1 0h1m1 0h3m2 0h2m1 0h1m3 0h1m-21 1h1m5 0h1m2 0h1m3 0h2m3 0h1m-19 1h7m2 0h2m5 0h1m1 0h1m1 0h1"
                  ></path>
                </svg>
              </div>
            </div>
          </td>

          <td colSpan="4">
            <p>
              <b style={{ color: "blue", lineHeight: "2em" }}>
                BOOKING DATE :{" "}
              </b>
              <br />
              <b>April 20, 2022 </b>
            </p>
          </td>
        </tr>
        <tr>
          <td colSpan="4" style={{ paddingLeft: "30px", textAlign: "centre" }}>
            <p>
              <b></b>
            </p>
            <div
              className="row2"
              style={{ lineHeight: "2", fontWeight: "bold" }}
            >
              <b>
                <p className="local">
                  <input type="checkbox" id="one" name="one" value="loc" />
                  <label htmlFor="one"> LOCAL</label>
                </p>
                <p></p>
                <p className="domestics">
                  {" "}
                  <input
                    type="checkbox"
                    id="two"
                    name="two"
                    value="Dom"
                    checked=""
                  />
                  <label htmlFor="two"> DOMESTIC</label>
                </p>
                <p></p>
                <p className="international"></p>
                <input type="checkbox" id="three" name="three" value="Int" />
                <label htmlFor="three"> INTERNATIONAL</label>
                <p></p>
              </b>
            </div>
            <b></b>
            <p></p>
          </td>
        </tr>

        <tr className="header">
          <td colSpan="6">
            <p>
              <b>SHIPPER</b>
            </p>
          </td>
          <td colSpan="8">
            <p>
              <b>CONSIGNEE</b>
            </p>
          </td>
          <td colSpan="4">
            <p>
              <b>ORIGIN</b>
            </p>
          </td>
          <td colSpan="3">
            <p>
              <b>DESTINATION</b>
            </p>
          </td>
        </tr>
        <tr>
          <td
            colSpan="6"
            rowSpan="5"
            style={{ paddingLeft: "20px", paddingTop: "4px" }}
          >
            <center className="consignor1">Kfc Customer</center> <br />
            <center>
              <p className="consignor">delhi</p>
            </center>
          </td>
          <td
            colSpan="8"
            rowSpan="5"
            style={{ paddingLeft: "20px", paddingTop: "4px" }}
          >
            <center className="consignor1">Sonu Bhagat</center>
            <br />
            <center>
              <p className="consignee">mumbai</p>
            </center>

            <b style={{ fontSize: "12px" }}></b>
          </td>
          <td className="text-a" colSpan="4">
            <p>
              <b>New Delhi Jawahar Lal Nehru Stadium</b>
            </p>
          </td>
          <td className="text-a" colSpan="3">
            <p>
              <b>Mumbai</b>
            </p>
          </td>
        </tr>

        <tr className="header">
          <td colSpan="7" style={{ textAlign: "center" }}>
            <p>
              <b>TYPES OF BOOKING:</b>
            </p>
          </td>
        </tr>
        <tr>
          <td colSpan="7">
            <div
              className="row3"
              style={{ display: "flex", marginLeft: "80px" }}
            >
              <div className="qui3" style={{ flex: "1", display: "flex" }}>
                <p className="pri" style={{ lineHeight: "2" }}>
                  <input type="checkbox" id="prio" name="prio" value="Prio" />
                  <label htmlFor="prio">
                    <b> PRIORITY </b>
                  </label>
                </p>
              </div>
              <div className="qui3" style={{ flex: "1", display: "flex" }}>
                <p className="pri" style={{ lineHeight: "2" }}>
                  <input
                    type="checkbox"
                    id="eco"
                    name="eco"
                    value="Eco"
                    checked=""
                  />
                  <label htmlFor="eco">
                    <b> ECONOMY</b>
                  </label>
                </p>
              </div>
            </div>
          </td>
        </tr>

        <tr className="header">
          <td colSpan="7" style={{ textAlign: "center" }}>
            <p>
              <b>SHIPMENT TYPE:</b>
            </p>
          </td>
        </tr>
        <tr>
          <td colSpan="7">
            <div
              className="row3"
              style={{ display: "flex", marginLeft: "60px" }}
            >
              <div
                className="qui3"
                style={{ flex: "1", display: "flex", textAlign: "center" }}
              >
                <p className="pri" style={{ lineHeight: "2" }}>
                  <input type="checkbox" id="prio" name="prio" value="Prio" />
                  <label htmlFor="prio">
                    <b> COLD CHAIN </b>
                  </label>
                </p>
              </div>
              <div className="qui3" style={{ flex: "1", display: "flex" }}>
                <p className="pri" style={{ lineHeight: "2" }}>
                  <input
                    type="checkbox"
                    id="eco"
                    name="eco"
                    value="Eco"
                    checked=""
                  />
                  <label htmlFor="eco">
                    <b> NO COLD CHAIN</b>
                  </label>
                </p>
              </div>
            </div>
          </td>
        </tr>

        <tr>
          <td
            className="header"
            colSpan="3"
            style={{ backgroundColor: "#01185c4f", textAlign: "center" }}
          >
            <p>
              <b>PACKETS</b>
            </p>
          </td>
          <td
            className="header"
            colSpan="4"
            style={{ backgroundColor: "#01185c4f", textAlign: "center" }}
          >
            <p>
              <b>DESCRIPTION</b>
            </p>
          </td>
          <td
            className="inv"
            colSpan="7"
            style={{
              textAlign: "center",
              fontSize: "15px",
              color: "red",
              fontWeight: "bold",
            }}
          >
            <p>CONSIGNMENT NO.</p>
          </td>

          <td
            colSpan="3"
            className="inv"
            style={{ textAlign: "center", fontWeight: "bold" }}
          >
            <p>
              <b>INV.NO</b>
            </p>
            <p></p>
          </td>
          <td
            colSpan="2"
            className="inv"
            style={{ textAlign: "center", fontWeight: "bold" }}
          >
            <p>
              <b> INV.DATE</b>
            </p>
          </td>

          <td
            colSpan="2"
            className="inv"
            style={{ textAlign: "center", fontWeight: "bold" }}
          >
            <p>
              <b> INV.VALUE</b>
            </p>
          </td>
        </tr>

        <tr>
          <td colSpan="3" style={{ textAlign: "center" }}>
            <p style={{ fontSize: "13px" }}>
              <b>10</b>
            </p>
          </td>
          <td colSpan="4" style={{ textAlign: "center" }}>
            <p style={{ fontSize: "13px" }}>
              <b>Sugar</b>
            </p>
          </td>
          <td
            colSpan="7"
            rowSpan="3"
            style={{
              textAlign: "center",
              fontSize: "30px",
              fontWeight: "bold",
            }}
          >
            800081
          </td>
          {/* <td colSpan="2" style={{textAlign: "center"}}>
  <p><b></b></p>
  <p></p>
</td>
<td colSpan="2" style={{textAlign: "center"}}>
  <p><b>

  </b></p>
</td> */}
          <td colSpan="3" style={{ textAlign: "center" }}>
            <p>
              <b></b>
            </p>
            <p></p>
          </td>

          <td colSpan="2" style={{ textAlign: "center", fontSize: "10px" }}>
            <p>
              <b> </b>
            </p>
          </td>
          <td colSpan="2" style={{ textAlign: "center" }}>
            <p>
              <b> </b>
            </p>
          </td>
          {/* <td colSpan="2" style={{textAlign: "center"}}>
  <p><b></b></p>
</td> */}
        </tr>

        <tr>
          <td
            className="header"
            colSpan="3"
            style={{ textAlign: "center", fontSize: "10px" }}
          >
            <p>
              <b> ACT. WEIGHT</b>
            </p>
          </td>
          <td
            className="header"
            colSpan="4"
            style={{ textAlign: "center", fontSize: "10px" }}
          >
            <p>
              <b>CHARGABLE WEIGHT</b>
            </p>
          </td>
          <td colSpan="3" style={{ textAlign: "center" }}>
            <p>
              <b></b>
            </p>
            <p></p>
          </td>
          <td
            colSpan="2"
            rowSpan=" "
            style={{ textAlign: "center", fontSize: "10px" }}
          >
            <p>
              <b></b>
            </p>
          </td>
          <td colSpan="2" rowSpan=" " style={{ textAlign: "center" }}>
            <p>
              <b></b>
            </p>
          </td>
        </tr>

        <tr>
          <td className="text-a" colSpan="3">
            <p style={{ height: "12px", lineHeight: "1", fontSize: "13px" }}>
              <b>20.0</b>
            </p>
          </td>
          <td className="text-a" colSpan="4">
            <p style={{ height: "12px", lineHeight: "1", fontSize: "13px" }}>
              <b>20.0</b>
            </p>
          </td>
          <td colSpan="3" rowSpan="" style={{ textAlign: "center" }}>
            <p>
              <b></b>
            </p>
            <p></p>
          </td>

          <td colSpan="2" style={{ textAlign: "center", fontSize: "10px" }}>
            <p>
              <b> </b>
            </p>
          </td>
          <td colSpan="2" style={{ textAlign: "center" }}>
            <p>
              <b> </b>
            </p>
          </td>
        </tr>

        <tr>
          <td
            className="header"
            style={{
              backgroundColor: "#01185c4f",
              textalign: "center",
              height: "20px",
              colSpan: "7",
            }}
          >
            <p style={{ textAlign: "center", fontSize: "10px" }}>
              <b>VOLUMETRIC WEIGHT CONVERSION (IN CMS)</b>
            </p>
            {/* <div style="">
  </div> */}
          </td>
          <td
            colSpan="16"
            rowSpan="1"
            style={{ textAlign: "center", height: "5px" }}
          >
            <p>
              <b></b>
            </p>
            <p></p>
          </td>

          <td
            rowSpan=""
            colSpan="2"
            style={{ textAlign: "center", fontSize: "10px" }}
          >
            <p>
              <b></b>
            </p>
          </td>
          <td rowSpan="" colSpan="2" style={{ textAlign: "center" }}>
            <p>
              <b></b>
            </p>
          </td>
        </tr>

        <tr>
          <td
            colSpan="2"
            style={{ textAlign: "center", backgroundColor: "#01185c4f" }}
          >
            <p>
              <b>L</b>
            </p>
          </td>
          <td
            colSpan="2"
            style={{ textAlign: "center", backgroundColor: "#01185c4f" }}
          >
            <p>
              <b>B</b>
            </p>
          </td>
          <td
            colSpan="2"
            style={{ textAlign: "center", backgroundColor: "#01185c4f" }}
          >
            <p>
              <b>H</b>
            </p>
          </td>
          <td
            className="text-a"
            style={{ textAlign: "center", backgroundColor: "#01185c4f" }}
          >
            <p>
              <b> PCS.</b>
            </p>
          </td>
          <td
            colSpan="7"
            className="header"
            style={{ fontSize: "15px", fontWeight: "bold" }}
          >
            REMARKS
          </td>
          <td
            colSpan="4"
            rowSpan="1"
            style={{
              textAlign: "center",
              height: "5px",
              backgroundColor: "#01185c4f",
              fontSize: "bold",
            }}
          >
            <p>
              <b>TOTAL INV. VALUE</b>
            </p>
            <p></p>
          </td>

          <td rowSpan="1" colSpan="3" style={{ textAlign: "center" }}>
            <p>
              <b></b>
            </p>
          </td>
        </tr>

        <tr>
          <td className="text-a" colSpan="2" style={{ width: "0px" }}>
            <p>
              {" "}
              <b> </b>
            </p>
          </td>
          <td className="text-a" colSpan="2" style={{ width: "0px" }}>
            <p>
              <b></b>
            </p>
          </td>
          <td className="text-a" colSpan="2" style={{ width: "0px" }}>
            <p>
              <b></b>
            </p>
          </td>
          <td className="text-a" style={{ width: "0px" }}>
            <p>
              <b></b>
            </p>
          </td>

          {/* <!-- //Remarks body --> */}
          <td
            colSpan="7"
            rowSpan="8"
            style={{ fontSize: "15px", textAlign: "center", marginTop: "5px" }}
          >
            <p></p>
            Chechked <br />
          </td>
          <td colSpan="7" rowSpan="8">
            <div style={{ marginTop: "2px", textAlign: "left" }}>
              <h6>
                Received above Shipment along with all document <br /> order in
                good condition.
              </h6>
            </div>
            <div
              className="row4"
              style={{
                marginTop: "20px",
                paddingLeft: "0px",
                textAlign: "left",
              }}
            >
              <div className="tc1">
                <p>
                  <b>Name:</b>
                </p>
              </div>
              <div className="tc2">
                <p>
                  <b>Signature:</b>
                </p>
              </div>
            </div>
            <div
              className="row4"
              style={{
                marginTop: "25px",
                paddingLeft: "0px",
                textAlign: "left",
              }}
            >
              <div className="tc1" style={{ marginTop: "15px" }}>
                <p>
                  <b>Date &amp; Time: </b>
                </p>
              </div>
            </div>
          </td>
        </tr>

        <tr>
          <td className="text-a" colSpan="2">
            <p>
              <b></b>
            </p>
          </td>
          <td className="text-a" colSpan="2">
            <p>
              <b></b>
            </p>
          </td>
          <td className="text-a" colSpan="2">
            <p>
              <b></b>
            </p>
          </td>

          <td className="text-a" style={{ width: "0px" }}>
            <p>
              <b></b>
            </p>
          </td>
        </tr>

        <tr>
          <td className="text-a" colSpan="2">
            <p>
              <b></b>
            </p>
          </td>
          <td className="text-a" colSpan="2">
            <p>
              <b></b>
            </p>
          </td>
          <td className="text-a" colSpan="2">
            <p>
              <b></b>
            </p>
          </td>
          <td className="text-a" style={{ width: "0px" }}>
            <p>
              <b></b>
            </p>
          </td>
        </tr>

        <tr>
          <td className="text-a" colSpan="2">
            <p>
              <b></b>
            </p>
          </td>
          <td className="text-a" colSpan="2">
            <p>
              <b></b>
            </p>
          </td>
          <td className="text-a" colSpan="2">
            <p>
              <b></b>
            </p>
          </td>
          <td className="text-a" style={{ width: "0px" }}>
            <p>
              <b></b>
            </p>
          </td>
        </tr>

        <tr>
          <td className="text-a" colSpan="2">
            <p>
              <b></b>
            </p>
          </td>
          <td className="text-a" colSpan="2">
            <p>
              <b></b>
            </p>
          </td>
          <td className="text-a" colSpan="2">
            <p>
              <b></b>
            </p>
          </td>
          <td className="text-a" style={{ width: "0px" }}>
            <p>
              <b></b>
            </p>
          </td>
        </tr>
        <tr>
          <td className="text-a" colSpan="2">
            <p>
              <b></b>
            </p>
          </td>
          <td className="text-a" colSpan="2">
            <p>
              <b></b>
            </p>
          </td>
          <td className="text-a" colSpan="2">
            <p>
              <b></b>
            </p>
          </td>
          <td className="text-a" style={{ width: "0px" }}>
            <p>
              <b></b>
            </p>
          </td>
        </tr>
        <tr>
          <td className="text-a" colSpan="2">
            <p>
              <b></b>
            </p>
          </td>
          <td className="text-a" colSpan="2">
            <p>
              <b></b>
            </p>
          </td>
          <td className="text-a" colSpan="2">
            <p>
              <b></b>
            </p>
          </td>
          <td className="text-a" style={{ width: "0px" }}>
            <p>
              <b></b>
            </p>
          </td>
        </tr>
        <tr>
          <td className="text-a" colSpan="2">
            <p>
              <b></b>
            </p>
          </td>
          <td className="text-a" colSpan="2">
            <p>
              <b></b>
            </p>
          </td>
          <td className="text-a" colSpan="2">
            <p>
              <b></b>
            </p>
          </td>
          <td className="text-a" style={{ width: "0px" }}>
            <p>
              <b></b>
            </p>
          </td>
        </tr>

        <tr>
          <td
            colSpan="7"
            rowSpan="2"
            style={{ lineHeight: "5mm", textAlign: "left" }}
          >
            <b>
              <p>
                Received by <b>Quick India Logistics Pvt. Ltd</b>
              </p>
              <p>Booking Clerk :</p>
              <p>Shipper Signature :</p>
            </b>
          </td>
          <td colSpan="14">
            <p
              style={{
                fontWeight: "bold",
                fontSize: "12px",
                color: "red",
                marginLeft: "10px",
                lineHeight: "4.5mm",
              }}
            />
            <b />
            Note: Quantity and Quality not Checked <br />
            We are not responsible for Leakage/Damage.
            <br /> Subject to terms &amp; Condition
            <b />
            <p />
          </td>
        </tr>

        <tr colSpan="14">
          <td colSpan="3" style={{ backgroundColor: "#01185c4f" }}>
            <p>
              <b> E-way Bill Number </b>
            </p>
          </td>
          <td colSpan="11" style={{ fontSize: "10px" }}>
            <p>
              <b> </b>
            </p>
          </td>
        </tr>
      </tbody>

      <h6>
        <p
          style={{
            backgroundColor: "khaki",
            fontSize: "13px",
            width: "fit-content",
          }}
        >
          {" "}
          * Please visit our Website,
          <strong>
            <a href="https://www.quickindialogistics.com/">
              www.quickindialogistics.com/
            </a>{" "}
            <a href="https://www.quickindialogistics.com/">
              terms &amp; conditions{" "}
            </a>
          </strong>{" "}
          for terms and conditions of our service.
        </p>
      </h6>

      {/* <view style= {{flexDirection:"row", justifyContent:"centre",alignItems:"centre",backgroundColor: "khaki", fontSize: "13px"}}>
<tr rowSpan="14">
<p>* Please visit our Website,<strong><a href="https://www.quickindialogistics.com/">www.quickindialogistics.com/</a> <a href="https://www.quickindialogistics.com/">terms &amp; conditions </a></strong> for terms and conditions of our service.</p>
</tr>

</view> */}

      <br />
      {/* // </table>  */}
    </body>
    //     </div>
    //  </div>
    //  </div>
    //  </div>
    //  </div>
    //  </div>
  );
};

export default Pdf_Btn;
