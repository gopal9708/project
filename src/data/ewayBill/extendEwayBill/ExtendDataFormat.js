import React, { useState, useEffect, useLayoutEffect } from "react";
import { Input, Col, Row, Label } from "reactstrap";
import { FiCheckSquare, FiSquare } from "react-icons/fi";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import NSearchInput from "../../../components/formComponent/nsearchInput/NSearchInput";
import { setAlertType, setDataExist, setShowAlert } from "../../../store/alert/Alert";
import { useDispatch, useSelector } from "react-redux";
import toTitleCase from "../../../lib/titleCase/TitleCase";
import { gstin_no } from "../../../constants/CompanyDetails";
import { EServerAddress, ServerAddress } from "../../../constants/ServerAddress";
import axios from "axios";

const PacketTitle = [
  "Ewb No",
  "Expiring Time",
  "Shipper",
  "Shipper Address",
  "Consignee",
  "Consignee Address",
  "Action",
];

const ExtendDataFormat = ({ type, count }) => {
  // console.log("type=====", type)
  const [data, setdata] = useState([])
  console.log("data-------", data)
  const business_access_token = useSelector((state) => state.eway_bill.business_access_token);
  const user = useSelector((state) => state.authentication.userdetails);
  const dispatch = useDispatch();
  const [show, setshow] = useState(false);
  const [docDate, setdocDate] = useState("")
  const [toggle, settoggle] = useState(false)
  const accessToken = useSelector((state) => state.authentication.access_token);
  const [state_code, setstate_code] = useState("")
  const [current_place, setcurrent_place] = useState("")
  const [d_pincode, setd_pincode] = useState("");
  const [c_pincode, setc_pincode] = useState("");
  const [vehicle_no, setvehicle_no] = useState("")
  const [trans_doc_no, settrans_doc_no] = useState("")
  const [consigment_l, setconsigment_l] = useState([
    ["M", "In Movement"],
    ["T", "In Transit"],
  ]);

  const [consigment_error, setconsigment_error] = useState(false)

  const [ext_reason_l, setext_reason_l] = useState([
    ["1", "Natural Calamity"],
    ["2", "Law & Order Situation"],
    ["4", "Transshipment"],
    ["5", "Accident"],
    ["99", "Others"]
  ]);

  const [consigment_sel, setconsigment_sel] = useState(consigment_l[0][1]);
  const [ext_reason_sel, setext_reason_sel] = useState(ext_reason_l[2][1]);
  const [ext_reason_id, setext_reason_id] = useState(ext_reason_l[2][0]);
  const [ext_reason_error, setext_reason_error] = useState(false)
  const [consigment_id, setconsigment_id] = useState(consigment_l[0][0]);
  const [all_data, setall_data] = useState([])
  const [transport_mode_l, settransport_mode_l] = useState([
    ["1", "Road"],
    ["3", "Air"],
  ])

  const [transport_mode_sel, settransport_mode_sel] = useState(transport_mode_l[0][1])
  const [transport_mode_id, settransport_mode_id] = useState(transport_mode_l[0][0])
  const [transport_mode_error, settransport_mode_error] = useState(false)

  const [ewb_no, setewb_no] = useState("");
  const [is_ready, setis_ready] = useState(false);
  const handleCloseM = () => {
    setshow(false);
  };

  // useLayoutEffect(() => {
  //   const currentTime = new Date().getHours();
  //   console.log("currentTime", currentTime)
  //   if (currentTime >= 16 || currentTime < 2) {
  //     setis_ready(true);
  //   } else {
  //     setis_ready(false);
  //     // Perform button action here
  // 4pm to 2AM
  //   }

  // }, [])

  const [eway_extend, seteway_extend] = useState([])
  const [tog_extd, settog_extd] = useState(false)

  useLayoutEffect(() => {
    const currentTime = new Date().getHours();
    if (currentTime >= 16 || currentTime < 8) {
      setis_ready(true);
    } else {
      setis_ready(false);
      // Perform button action here
      // 4pm to 8AM
    }
  }, []);

  const handleEData = (a, b, c) => {
    setd_pincode(a, b);
    setewb_no(c, b);
  }

  const send_data = async () => {
    // For  valid_upto
    const [datePart, timePart] = all_data?.validUpto.split(' ');
    const [day, month, year] = datePart.split('/');
    const convertedDate = `${year}-${month}-${day}`;
    // Combine the converted date and time with timezone offset
    const convertedDateTime = `${convertedDate} ${timePart}+00:00`;

    // For trans_doc_date
    const [datePart2, timePart2] = all_data?.transDocDate.split(' ');
    const [day2, month2, year2] = datePart2.split('/');
    const convertedDocDate = `${year2}-${month2}-${day2}`;


    try {
      const response = await axios.post(
        ServerAddress + 'analytic/add_extended_ewb/',
        {
          ewb: tog_extd ? all_data.ewb : null,
          valid_upto: tog_extd ? all_data.valid_upto : convertedDateTime,
          trans_doc_no: tog_extd ? all_data.trans_doc_no : all_data.transDocNo,
          trans_doc_date: tog_extd ? all_data.trans_doc_date : convertedDocDate,
          vehicle_no: tog_extd ? all_data.vehicle_no : vehicle_no,
          trans_mode: tog_extd ? (all_data.trans_mode === 1 ? "ROAD" : "AIR") : (all_data.transMode === 1 ? "ROAD" : "AIR"),
          from_state: tog_extd ? all_data.branch_location_state : (all_data.fromGstin).substring(0, 2),
          from_place: tog_extd ? all_data.branch_location_city : all_data.fromPlace,
          from_pincode: tog_extd ? all_data.branch_location_pincode : all_data.fromPincode,
          reason_code: tog_extd ? all_data.reason_code : 2,
          reason_remarks: tog_extd ? all_data.reason_remarks : "DUE TO TRANSSHIPMENT",
          ewb_no: tog_extd ? all_data.ewb_no : all_data.ewbNo,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("Extended response====", response)
    } catch (error) {
      console.warn(`Error Happened while posting Extended EWB Type Data: ${error}`);
    }
  };

  const ExtendEwb = () => {
    axios
      .put(
        EServerAddress + `ezewb/v1/ewb/extendValidityByNo?gstin=${gstin_no}`,
        {
          ewbNo: ewb_no,
          fromPlace: current_place,
          fromState: state_code,
          transDocDate: docDate,
          fromPincode: c_pincode,
          consignmentStatus: consigment_id,
          extnRsnCode: ext_reason_id,
          userGstin: gstin_no,
          transMode: transport_mode_id,
          extnRemarks: "Extend",
          addressLine1: null,
          addressLine2: null,
          addressLine3: null,
          transitType: "",
          vehicleNo: vehicle_no,
          transDocNo: trans_doc_no,
          // userid: euser_name,
          // password: epass,
        },

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${business_access_token}`,
          },
        }
      )
      .then(function (response) {
        console.log("Ewb response=====", response)
        if (response.data?.status === 1) {
          settoggle(true)
          send_data()
          setshow(false);
          // alert(response.data.message);
          dispatch(setShowAlert(true));
          dispatch(setDataExist(response.data.message));
          dispatch(setAlertType("success"));
        }
        else {
          send_data()
          setshow(false);
          alert(response.data.message)
        }
        // GetBusiness_token
      })
      .catch((error) => {
        alert(`Error Happen while login  with eway bill ${error}`);
      });
  };

  const getExtendedEwb = (ewb) => {
    axios
      .get(
        ServerAddress +
        `analytic/current_extededewb/?ewb_no=${ewb}&p=1&records=10`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((resp) => {
        console.log("Etd resp===========", resp)
        setshow(true);
        if (resp.data.results.length === 0) {
          settog_extd(false)
          dispatch(setShowAlert(true));
          dispatch(setDataExist(`Eway Bill Part B Not Updated Yet in this Eway Bill No.`));
          dispatch(setAlertType("warning"));
          // setstate_code((eway_extend.fromGstin).substring(0, 2))
          // setcurrent_place(toTitleCase(eway_extend.fromPlace))
          // setc_pincode(eway_extend.fromPincode)
          // setvehicle_no(eway_extend.vehicleNo)
          // settrans_doc_no(eway_extend.transDocNo)
        }
        else {
          settog_extd(true)
          setall_data(resp.data.results[0])
          setstate_code(resp.data.results[0].branch_location_state_code)
          setcurrent_place(toTitleCase(resp.data.results[0].branch_location_city))
          setc_pincode(resp.data.results[0].branch_location_pincode)
          setvehicle_no(resp.data.results[0].vehicle_no)
          settrans_doc_no(resp.data.results[0].trans_doc_no)

        }
      })
      .catch((err) => {
        alert(`Error Occur in Get States, ${err}`);
      });
  };
  console.log("current_place ===========", current_place)
  console.log("eway_extend=======", eway_extend)
  console.log("all_data=======", all_data)
  const get_expire_eway = () => {
    axios
      .post(
        `https://dev.api.easywaybill.in/ezewb/v1/ewb/search?gstin=${gstin_no}`,
        {
          "type": type === "Expiring_Today" ? "EWB_EXPIRING_TODAY" : "EWB_EXPIRED_YESTERDAY",
          "defaultquery": null,
          "page": 0,
          "size": count,

        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${business_access_token}`,
          },
        }
      )
      .then(function (response) {
        // setpart_b_12(response.data.response);
        setdata(response.data.response);

      })
      .catch((error) => { });
  };

  useEffect(() => {
    get_expire_eway();
  }, [type, toggle])

  const [searchQuery, setSearchQuery] = useState("");
  const filteredData = data?.filter((ewb) =>
    Object.values(ewb)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery?.toLowerCase())
  );

  useEffect(() => {
    if (!tog_extd && show) {
      setstate_code(eway_extend?.actFromStateCode)
      setcurrent_place(toTitleCase(eway_extend.fromPlace))
      setc_pincode(eway_extend.fromPincode)
      setvehicle_no(eway_extend.vehicleNo)
      settrans_doc_no(eway_extend.transDocNo)
      setall_data(eway_extend)
    }

  }, [eway_extend, tog_extd, show])

  useEffect(() => {
    if (!show) {
      setstate_code("")
      setcurrent_place("")
      setc_pincode("")
      setvehicle_no("")
      settrans_doc_no("")
      setall_data([])
      seteway_extend([])
    }
  }, [show])


  return (
    <>
      <Modal show={show} onHide={handleCloseM}
      // dialogClassName={"custom-modal2"}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <div style={{ fontSize: "15px", color: "" }}>Extend EwayBill No : {ewb_no}</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

          {/* <div style={{ display: "flex", flexDirection: "row" }}> */}
          <div style={{ marginTop: "10px" }}>
            <Row>
              <Col md={8} sm={8}>
                <div >
                  <Label>Destination Pincode *</Label>
                  <Input value={d_pincode} disabled id="input" />
                </div>
              </Col>
              <Col md={4} sm={4}>
                <div >
                  <Label>State Code*</Label>
                  <Input
                    value={state_code}
                    placeholder="Enter State Code"
                    onChange={(e) => {
                      setstate_code(e.target.value);
                    }}
                    id="input"
                  />
                </div>
              </Col>
            </Row>
          </div>
          <div style={{ marginTop: "10px" }}>
            <Label>Current Place *</Label>
            <Input
              value={current_place ? current_place : ""}
              placeholder="Enter Current Place"
              onChange={(e) => {
                setcurrent_place(e.target.value);
              }}
              id="input"
            />
          </div>
          <div style={{ marginTop: "10px" }}>
            <Label>Current Pincode *</Label>
            <Input
              value={c_pincode}
              placeholder="Enter Current Pincode"
              onChange={(e) => {
                setc_pincode(e.target.value);
              }}
              id="input"
            />
          </div>
          {/* </div> */}
          <div style={{ marginTop: "10px" }}>
            <Label>Consigment Is*</Label>
            <NSearchInput
              data_list={consigment_l}
              set_data_item_s={setconsigment_sel}
              set_id={setconsigment_id}
              show_search={false}
              error_message={"Please Select Consigment Status"}
              data_item_s={consigment_sel}
              error_s={consigment_error}

            />
          </div>


          <div style={{ marginTop: "10px" }}>
            <Label>Extend Reason*</Label>
            <NSearchInput
              data_list={ext_reason_l}
              set_data_item_s={setext_reason_sel}
              set_id={setext_reason_id}
              show_search={false}
              error_message={"Please Select Extend  Reason"}
              data_item_s={ext_reason_sel}
              error_s={ext_reason_error}
            />
          </div>

          <div style={{ marginTop: "10px" }}>
            <Label>Transport Mode*</Label>
            <NSearchInput
              data_list={transport_mode_l}
              set_data_item_s={settransport_mode_sel}
              set_id={settransport_mode_id}
              show_search={false}
              error_message={"Please Select Extend  Reason"}
              data_item_s={transport_mode_sel}
              error_s={transport_mode_error}
            />
          </div>
          {/* {(!vehicle_no )&& */}
            <div style={{ marginTop: "10px" }}>
              <Label>Vehicle Number *</Label>
              <Input
                maxLength={10}
                value={vehicle_no}
                placeholder="Enter Vehicle Number"
                onChange={(e) => {
                  setvehicle_no(e.target.value);
                }}
                id="input"
              />
            </div>
          {/* } */}
        </Modal.Body>
        <Modal.Footer>
          <Button color="success" onClick={() =>{
          if(vehicle_no){
            ExtendEwb()
          }
          else{
            alert("Please Add Vehicle Number")
          }
           
          }
             }>Save</Button>
          <Button color="danger" onClick={() => handleCloseM()}>Cancel</Button>
        </Modal.Footer>
      </Modal>
      <div className="search-box me-2 mt-3 d-inline-block">
        <div className="position-relative">
          <label htmlFor="search-bar-0" className="search-label">
            <span id="search-bar-0-label" className="sr-only">
              Search this table
            </span>
            <Input
              id="search-bar-0"
              // style={{padding:"10px"}}
              type="text"
              aria-labelledby="search-bar-0-label"
              className="form-control "
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </label>
          <button
            type="submit"
            style={{ background: "transparent", border: "white" }}

          >
            <i className="bx bx-search-alt search-icon"></i>
          </button>
        </div>
      </div>
      <div className="fixTableHead" style={{ overflowY: "auto", maxHeight: "58.2vh"}}>

        {/* <div className="col-sm-4">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ backgroundColor: "white", borderRadius: "10px" }}
              />
            </div> */}
        <table
          className="topheader table-light"
          style={{ borderCollapse: "collapse", width: "100%", borderWidth: 1 }}
        >
          <thead>
            <tr style={{ lineHeight: 2, borderWidth: 1 }}>
              {/* {PacketTitle.map((i,index)=>)} */}
              {PacketTitle.map((i, j) => {
                return (
                  <th
                    style={{ whiteSpace: "nowrap", textAlign: "center" }}
                    key={j}
                  >
                    {i}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {!filteredData ? (
              <tr>
                <td>No Data Found</td>
              </tr>
            ) : (
              filteredData.map((ewb, index) => {
                return (
                  <>
                    <tr
                      key={index}
                      style={{
                        borderWidth: 1,
                      }}
                    >
                      <td>{ewb.ewbNo}</td>

                      <td>{ewb.validUpto}</td>
                      <td>{toTitleCase(ewb.fromTrdName)}</td>
                      <td> {toTitleCase(ewb.fromPlace) + "," + ewb.fromPincode}</td>
                      <td>{toTitleCase(ewb.toTrdName)}</td>
                      <td>{toTitleCase(ewb.toPlace) + "," + ewb.toPincode}</td>
                      <td>
                        <Button
                          color="success"
                          size="sm"
                          onClick={() => {
                            if (is_ready) {
                              // setstate_code("")
                              // setcurrent_place("")
                              // setcurrent_place("")
                              // setc_pincode("")
                              // setvehicle_no("")
                              // settrans_doc_no("")
                              // setall_data([])
                              settoggle(false)
                              seteway_extend(ewb)
                              setdocDate(ewb?.docDate.split(" ")[0])
                              getExtendedEwb(ewb.ewbNo)
                              handleEData(ewb.toPincode, index, ewb.ewbNo)
                            } else {
                              dispatch(setShowAlert(true));
                              dispatch(setDataExist(`EwayBill Can Only Extend From 4 P.M To 8 A.M Onwards`));
                              dispatch(setAlertType("danger"));
                            }
                          }}
                        >
                          Extend
                        </Button>
                      </td>
                    </tr>
                  </>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ExtendDataFormat;
