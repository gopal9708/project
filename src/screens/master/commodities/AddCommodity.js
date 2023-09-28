import React, { useState, useEffect, useLayoutEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IconContext } from "react-icons";
import { MdAddCircleOutline, MdRemoveCircleOutline } from "react-icons/md";
import axios from "axios";
import { ServerAddress } from "../../../constants/ServerAddress";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Card,
  Col,
  Row,
  CardBody,
  CardTitle,
  Label,
  Input,
  FormFeedback,
  Form,
  FormGroup
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import toTitleCase from "../../../lib/titleCase/TitleCase";
import { setToggle } from "../../../store/pagination/Pagination";
import {
  setAlertType,
  setDataExist,
  setShowAlert,
} from "../../../store/alert/Alert";
import PageTitle from "../../../components/pageTitle/PageTitle";
import Title from "../../../components/title/Title";
import { Button } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import SearchInput from "../../../components/formComponent/searchInput/SearchInput";
import * as XLSX from "xlsx";

const Add_Commodity = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authentication.userdetails);
  const alert = useSelector((state) => state.alert.show_alert);
  const accessToken = useSelector((state) => state.authentication.access_token);

  const navigate = useNavigate();
  const location = useLocation();
  // console.log("location-----", location)

  const [isupdating, setisupdating] = useState(false);
  const [commodity, setcommodity] = useState([]);

  // Commodity
  const [commodity_type_id, setcommodity_type_id] = useState(0);
  const [commodity_type_list, setcommodity_type_list] = useState([]);
  const [approved_entry, setapproved_entry] = useState(false);
  const [commodity_type, setcommodity_type] = useState("");
  const [commodity_type_error, setcommodity_type_error] = useState(false);
  const [commodity_type_page, setcommodity_type_page] = useState(1);
  const [commodity_type_search_item, setcommodity_type_search_item] =
    useState("");
  const [other_commodity_type, setother_commodity_type] = useState("");
  const [commodity_type_loaded, setcommodity_type_loaded] = useState(false)
  const [commodity_type_count, setcommodity_type_count] = useState(1)
  const [commodity_type_bottom, setcommodity_type_bottom] = useState(103)

  const [showModal, setShowModal] = useState(false);
  const [jsonData, setJsonData] = useState([]);
  const [add_como_err, setadd_como_err] = useState(false);

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      commodity_name: toTitleCase(commodity.commodity_name) || "",
    },
    validationSchema: Yup.object({
      commodity_name: Yup.string().required("Commodity name is required"),

    }),
    onSubmit: (values) => {
      isupdating ? update_commodity(values) : add_commodity(values);
    },
  });
  // console.log("location--commodity------", commodity.length)
  // console.log("location--commodity------", typeof (commodity))
  const [circle_btn, setcircle_btn] = useState(true);
  const toggle_circle = () => {
    setcircle_btn(!circle_btn);
  };
  useEffect(() => {
    try {
      setcommodity(location.state.commodity);
      setisupdating(true);
      setcommodity_type(toTitleCase(location.state.commodity.type));
      setcommodity_type_id(location.state.commodity.commodity_type);
      if (location.state.commodity.current_status === "Approved") {
        setapproved_entry(true);
      }
    } catch (error) { }
  }, []);

  //Get Commodity Type
  const getCommodityType = () => {
    let commodity_list = [];
    let data = [];
    axios
      .get(
        ServerAddress +
        `master/all_commoditytype/?search=${""}&p=${commodity_type_page}&records=${10}&commodity_type_search=${commodity_type_search_item}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((resp) => {
        if (resp.data.results.length > 0) {
          if (resp.data.next === null) {
            setcommodity_type_loaded(false);
          } else {
            setcommodity_type_loaded(true);
          }

          if (commodity_type_page === 1) {
            commodity_list = resp.data.results.map((v) => [
              v.id,
              toTitleCase(v.type),
            ]);
          } else {
            commodity_list = [
              ...commodity_type_list,
              ...resp.data.results.map((v) => [v.id, toTitleCase(v.type)]),
            ];
          }
        }
        let a_index = commodity_list.indexOf("Add New");
        if (a_index !== -1) {
          commodity_list.splice(a_index, 1);
        }
        commodity_list = [...new Set(commodity_list.map((v) => `${v}`))].map(
          (v) => v.split(",")
        );
        commodity_list.push("Add New");
        setcommodity_type_count(commodity_type_count + 2);
        setcommodity_type_list(commodity_list);

      })
      .catch((err) => {
        alert(`Error Occur in Get Commodity Type, ${err}`);
      });
  };

  const setCommodityType = () => {
    axios
      .post(
        ServerAddress + "master/add_commoditytype/",
        {
          type: toTitleCase(other_commodity_type).toUpperCase(),
          created_by: user.id,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (response) {
        if (response.data.status !== "duplicated") {
          if (response.statusText === "Created") {
            setcommodity_type_id(response.data.commoditytype_id);
            dispatch(setShowAlert(true));
            dispatch(
              setDataExist(
                `Commodity Type ${toTitleCase(
                  other_commodity_type
                )} Added Sucessfully`
              )
            );
            dispatch(setAlertType("success"));
            setcommodity_type(toTitleCase(other_commodity_type));
            getCommodityType();
            // getDistrict();
          }
        } else {
          dispatch(setShowAlert(true));
          dispatch(
            setDataExist(
              `Commodity Type ${toTitleCase(
                other_commodity_type
              )} Already Exist`
            )
          );
          dispatch(setAlertType("warning"));
          if (isupdating) {
            setcommodity_type(toTitleCase(location.type));
          } else {
            setcommodity_type("");
          }
        }
      })
      .catch((error) => {
        alert(`Error Happen while posting Commodity Type Data ${error}`);
      });
  };

  //Post Data
  const add_commodity = (values) => {
    axios
      .post(
        ServerAddress + "master/add_commodity/",
        {
          commodity_type: commodity_type_id,
          commodity_name: toTitleCase(values.commodity_name).toUpperCase(),
          created_by: user.id,

          //For C&M
          cm_current_department: user.user_department,
          cm_current_status: (user.user_department_name === "ADMIN") ? 'NOT APPROVED' : (current_status).toUpperCase(),
          cm_transit_status: (user.user_department_name === "ADMIN") ? 'NOT APPROVED' : (current_status).toUpperCase(),
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (response) {
        if (response.data.status === "success") {
          dispatch(setToggle(true));
          dispatch(setShowAlert(true));
          dispatch(
            setDataExist(
              `Commidity  "${toTitleCase(
                values.commodity_name
              )}" Added sucessfully`
            )
          );
          dispatch(setAlertType("success"));
          navigate("/master/commodities");
        } else if (response.data === "duplicate") {
          dispatch(setShowAlert(true));
          dispatch(
            setDataExist(
              `Commodity Name "${toTitleCase(
                values.commodity_name
              )}" already exists`
            )
          );
          dispatch(setAlertType("warning"));
        }
      })
      .catch((error) => {
        alert(`Error Happen while posting Commodity  Data ${error}`);
      });
  };

  // Update Data

  const update_commodity = (values) => {
    let id = commodity.id;
    let fields_names = Object.entries({
      commodity_name: values.commodity_name,
      type: commodity_type,
    });
    let change_fields = {};
    var prom = new Promise((resolve, reject) => {
      for (let j = 0; j < fields_names.length; j++) {
        const ele = fields_names[j];
        console.log("ele-----", ele)
        let prev = location.state.commodity[`${ele[0]}`];
        let new_v = ele[1];
        console.log("new_v---", new_v)
        if (prev !== new_v.toUpperCase()) {
          change_fields[`${ele[0]}`] = new_v.toUpperCase();
        }
        if (j === fields_names.length - 1) resolve();
      }
    });
    console.log("change_fields---", change_fields)
    prom.then(() => {
      axios
        .put(
          ServerAddress + "master/update_commodity/" + id,
          {
            commodity_type: commodity_type_id,
            commodity_name: toTitleCase(values.commodity_name).toUpperCase(),
            modified_by: user.id,
            change_fields: change_fields,

            //For C&M
            cm_transit_status: status_toggle === true ? current_status : "",
            cm_current_status: (current_status).toUpperCase(),
            cm_remarks: ""

          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then(function (response) {
          console.log(response.data)
          if (response.data.status === "success") {
            dispatch(setToggle(true));
            dispatch(setShowAlert(true));
            dispatch(
              setDataExist(
                `Commidity  "${toTitleCase(
                  values.commodity_name
                )}" Updated sucessfully`
              )
            );
            dispatch(setAlertType("info"));
            if (!data_type) {
              navigate("/master/commodities");
            }
          } else if (response.data === "duplicate") {
            dispatch(setShowAlert(true));
            dispatch(
              setDataExist(
                `Commodity Name "${toTitleCase(
                  values.commodity_name
                )}" already exists`
              )
            );
            dispatch(setAlertType("warning"));
          }
        })
        .catch(function () {
          alert("Error Error While  Updateing commidity");
        });
    });
  };

  const handleAction = () => {
    dispatch(setToggle(true));
    navigate("/master/commodities");
  };
  // Used to History
  const handlClk = () => {
    navigate(
      "/master/commodities/commodityHistory/CommodityHistoryPage",
      // "/utilities/historyPage/HistoryPage",
      {
        state: { commodity: commodity },
      });
  };

  useEffect(() => {
    getCommodityType();
  }, [commodity_type_page, commodity_type_search_item]);

  useEffect(() => {
    if (commodity_type === "Add New") {
      setother_commodity_type("");
    }
    if (other_commodity_type) {
      setadd_como_err(false);
    }
  }, [commodity_type], [other_commodity_type]);

  useLayoutEffect(() => {
    if (commodity_type !== "") {
      setcommodity_type_error(false);
    }
  }, [commodity_type]);

  const data = [
    {
      commodity_type: 0,
      commodity_name: "",
      created_by: 0,
    },
  ];
  const headers = ["Commodity Type", "Commodity Name", "Created By"];
  const downloadExcel = (data) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "data.xlsx");
  };

  {/* this code for import export dont`t remove it  */ }
  function handleFileUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (event) {
      const workbook = XLSX.read(event.target.result, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      console.log("jsonData", jsonData);
      setShowModal(true);
      setJsonData(jsonData);
    };
    reader.readAsBinaryString(file);
  }

  function closeModal() {
    setShowModal(false);
    setJsonData([]);
  }
  {/* this code for import export dont`t remove it  */ }
  function handleSave() {
    closeModal();
    axios
      .post(
        ServerAddress + "master/add_commodity/",
        {
          data: jsonData
          //   commodity_type: e.commodity_type,
          // commodity_name: String(e.commodity_name),
          // created_by: e.created_by,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      ).then((res) => {
        console.log(res.data.status)
      }).catch(() => {
        console.log("error")
      })
    // })

  }
  {/* this code for import export dont`t remove it  */ }

  //For Checker Maker
  const [current_status, setcurrent_status] = useState("");
  const [status_toggle, setstatus_toggle] = useState(false)
  const [message, setmessage] = useState("")
  const [message_error, setmessage_error] = useState(false);


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true)
    setmessage_error(false)
  };
  useEffect(() => {
    if (user.user_department_name === "ADMIN") {
      setcurrent_status("NOT APPROVED")
      setstatus_toggle(true)
    }
    else if (user.user_department_name === "ACCOUNTANT" || user.user_department_name + " " + user.designation_name === "ACCOUNT MANAGER" || user.is_superuser) {
      setcurrent_status("APPROVED")
      setstatus_toggle(true)
    }
    else {
      setcurrent_status("NOT APPROVED")
      // setstatus_toggle(false)
    }

  }, [user, isupdating])

  const update_commoditystatus = (id) => {

    axios
      .put(
        ServerAddress + "master/update_commodity/" + id,
        {

          cm_current_status: "REJECTED",
          cm_remarks: toTitleCase(message).toUpperCase(),
          change_fields: {},
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (response) {
        if (response.data.status === "success") {
          // dispatch(Toggle(true))
          dispatch(setShowAlert(true));
          dispatch(setDataExist(`Status Updated sucessfully`));
          dispatch(setAlertType("info"));
          if (!data_type) {
            navigate("/master/commodities");
          }
        }
      })
      .catch(function (err) {
        alert(`rror While  Updateing Coloader ${err}`);
      });
  };

  const handleSubmit = () => {
    if (message === "") {
      setmessage_error(true);
    }
    else {
      update_commoditystatus(commodity.id)
      setShow(false)
    }
  }

  {/* For Checker Maker */ }
  const userpermission = useSelector(
    (state) => state.authentication.userpermission
  );
  const [can_update, setcan_update] = useState(false);

  useEffect(() => {
    if (
      userpermission.some((e) => e.sub_model === "Commodity" && e.update === true)
    ) {
      setcan_update(true);
    } else {
      setcan_update(false);
    }
  }, [userpermission]);

  const [table_data, settable_data] = useState(["", "", ""]);
  const [table_count, settable_count] = useState(0);
  const get_commodity = (value) => {
    axios
      .get(
        ServerAddress +
        `master/all_commodities/?search=${""}&p=${1}&records=${10}&commodity_type=${""}&commodity_name=${""}&data=&value=${value}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        console.log("com info", response.data);
        settable_count(response.data.count)
        settable_data(response.data.results);
      });
  };

  const [data_type, setdata_type] = useState(false);
  useLayoutEffect(() => {
    try {
      console.log("location------", location)
      if (location.state.type) {
        setdata_type(true)
        setcommodity([])
        setcommodity_type("")
        setcommodity_type_id(0)
        get_commodity(location.state.commodity);
      }
    }
    catch {
      setdata_type(false)
    }
  }, [location, alert]);

  const set_form_data = (item) => {
    setcommodity(item);
    setcommodity_type(toTitleCase(item.type));
    setcommodity_type_id(item.commodity_type);
  }

  //To Save Eway data through API'S

  //Eway no
  const b_acess_token = useSelector((state) => state.eway_bill.business_access_token);
  console.log("b_acess_token com====", b_acess_token)
  const [a, seta] = useState([])
  const post_awb = (index) => {
    axios
      .post(
        `https://dev.api.easywaybill.in/ezewb/v1/ewb/generate?gstin=05AAAAT2562R1Z3`,
        {
          "supplyType": "O",
          "transactionType": "1",
          "subSupplyType": "1",
          "docType": "INV",
          "docNo": `DHLMH42000${index}`,
          "docDate": "06/08/2023",
          "invTyp": "B2B",
          "fromGstin": "05AAAAT2562R1Z3",
          "fromTrdName": "K R AGENCIES",
          "dispatchFromGstin": "05AAAAT2562R1Z3",
          "dispatchFromTradeNam": "Nandss entity-1",
          "fromAddr1": "f 174 ground floor saraswati loke,",
          "fromAddr2": "shyam vihar phase 3 complex;HO 1272 indira nagar sastri nagar",
          "fromPlace": "Shirur",
          "fromStateCode": "27",
          "fromPincode": "413249",
          "toGstin": "05AAAAU1183B2ZZ",
          "toTrdName": "UTTARANCHALL KRISHI K R UTPADAN",
          "shipToGstin": "05AAAAU1183B2ZZ",
          "shipToTradeName": "Nina entity-2",
          "toAddr1": "LASUDIA MORI DEWAS NAKA",
          "toAddr2": "LASUDIA MORI DEWAS NAKA",
          "toPlace": "Ichalkaranji",
          "toPincode": "413248",
          "toStateCode": "27",
          "totInvValue": "100032",
          "totalValue": "1000",
          "cgstValue": "16",
          "sgstValue": "16",
          "igstValue": "0",
          "cessValue": "0",
          "cessNonAdvolValu": "0.00",
          "otherValue": "0",
          "transMode": "2",
          "transDistance": "196",
          "transDocDate": "06/08/2023",
          "transDocNo": "124423",
          "transId": "05AAAAR1685F1ZO",
          "transName": "Ashwin Guj Trans",
          "vehicleNo": null,
          "actFromStateCode": "27",
          "actToStateCode": "27",
          "vehicleType": null,
          "itemList": [
            {
              "itemNo": "1",
              "productName": "Mango-1",
              "productDesc": "Fruit",
              "hsnCode": "71",
              "quantity": "10.00",
              "qtyUnit": "KGS",
              "taxableAmount": "700",
              "sgstRate": 2.50,
              "cgstRate": 2.50,
              "igstRate": 0,
              "cessRate": "0.00",
              "cessNonAdvol": "0.00",
              "txp": "T"
            },
            {
              "itemNo": "2",
              "productName": "Mango-2",
              "productDesc": "Fruit",
              "hsnCode": "71",
              "quantity": "10.00",
              "qtyUnit": "KGS",
              "taxableAmount": "400",
              "sgstRate": 0.125,
              "cgstRate": 0.125,
              "igstRate": 0,
              "cessRate": "0.00",
              "cessNonAdvol": "0.00",
              "txp": "T"
            }
          ],
          "userGstin": "05AAAAT2562R1Z3"
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${b_acess_token}`,
          },
        }
      )
      .then(function (response) {
        console.log("response=======eway bill detail", response);
        if (response.data?.response) {
          seta(prevData => prevData.concat(response.data.response.ewbNo))
        }


      })
      .catch((error) => {
        console.log("eroorrrrrrrr", error)
      })
  };

  useEffect(() => {
    for (let index = 0; index < 10; index++) {
      // post_awb(index)
    }
  }, [])

  useEffect(() => {
    console.log("a---------", a)

  }, [a])

  return (
    <div style={{ display: data_type && "flex" }}>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Reject Resion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup>
            <Label for="exampleText">
              Text Area
            </Label>
            <Input
              id="exampleText"
              name="text"
              type="textarea"
              style={{ height: "90px" }}
              onChange={(e) => {
                setmessage(e.target.value)
              }}
            />
            <div className="mt-1 error-text" color="danger">
              {message_error ? "Please Enter Reject Resion" : null}
            </div>
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => handleSubmit()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      {/* For Checker Maker */}
      {data_type &&
        <div
          style={{
            width: "15%",
            // overflowY: "scroll",
            margin: "18px 10px 5px 20px",
            zIndex: 1,
            height: "100%",
            // border:"1px solid #2CA67A"
            border: "1px solid #2A3042",
            borderRadius: "5px"
          }}
          className="custom-scrollbars__content"
        >
          <div style={{ background: "#f4bc61", margin: "3px", padding: "3px", borderRadius: "5px", textAlign: "center", cursor: "pointer" }} onClick={() => {
            if (typeof (commodity) === "object") {
              handlClk();
            }
          }}>History</div>
          <div style={{ background: "#E6F1FF", margin: "3px", padding: "3px", borderRadius: "5px", textAlign: "center" }}>
            {/* Total Pending - {table_count} */}
            Total {location.state.commodity === "P" ? "Pending" : location.state.commodity === "A" ? "Approved" : "Rejected"} - {table_count}
          </div>
          <table className="table-grid">
            <thead>
              <tr style={{ lineHeight: 2, blocalWidth: 1 }}>
                <th
                  style={{
                    width: "8rem",
                    textAlign: "center",
                    paddingLeft: "4px",
                    paddingRight: "4px",
                    border: "1px solid #E6E9EC"
                  }}
                  rowSpan={2}
                >
                  Commodity Name
                </th>
              </tr>
            </thead>

            <tbody>
              {table_data.length === 0 ? (
                <tr>
                  <td>No Data Found</td>
                </tr>
              ) : (
                table_data.map((item, index) => {
                  return (
                    <tr key={index} style={{ border: "1px solid red" }}>
                      <td style={{ border: "1px solid #E6E9EC", padding: "3px" }}>
                        {(can_update && item.cm_current_status !== "APPROVED") || user.is_superuser ?
                          <span
                            style={{ cursor: "pointer", color: "blue", fontSize: "11px" }}
                            onClick={() => {
                              set_form_data(item);
                              // setselected_docket(true);
                            }}
                          >
                            {toTitleCase(item.commodity_name)}
                          </span>
                          :
                          <span style={{ fontSize: "11px" }}>
                            {toTitleCase(item.commodity_name)}
                          </span>
                        }
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      }
      {/* For Checker Maker */}

      <div style={{

        width: data_type && "85%",
        // width: "85%",
        // overflowY: "scroll",
        margin: "2px",
        zIndex: 1,
        height: "100%",
      }}>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            if (commodity_type === "") {
              setcommodity_type_error(true);
            }
            if (other_commodity_type === "") {
              setadd_como_err(true);
            }
            validation.handleSubmit(e.values);
            return false;
          }}
        >
          {/* Commodity */}
          {!data_type &&
            <div className="mt-3">
              <PageTitle page={isupdating ? "Update Commodity" : "Add Commodity"} />
              <Title
                title={isupdating ? "Update Commodity" : "Add Commodity"}
                parent_title="Masters"
              />
            </div>
          }
          <div className="m-3">
            {isupdating && !data_type && (
              // {isupdating &&(
              <div style={{ justifyContent: "right", display: "flex" }}>
                <Button
                  type="button"
                  onClick={() => {
                    handlClk();
                  }}
                >
                  History
                </Button>
              </div>
            )}

            {/* //Added For History */}

            <Col lg={12}>
              <Card className="shadow bg-white rounded">
                <CardTitle className="mb-1 header">
                  <div className="header-text-icon header-text">
                    <div></div>
                    <IconContext.Provider
                      value={{
                        className: "header-add-icon",
                      }}
                    >
                      <div onClick={toggle_circle}>
                        {circle_btn ? (
                          <MdRemoveCircleOutline />
                        ) : (
                          <MdAddCircleOutline />
                        )}
                      </div>
                    </IconContext.Provider>
                  </div>
                </CardTitle>
                {circle_btn ? (
                  <CardBody>
                    <Row>
                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-3">
                          <Label className="header-child">Commidity Type*</Label>
                          <SearchInput
                            data_list={commodity_type_list}
                            setdata_list={setcommodity_type_list}
                            data_item_s={commodity_type}
                            set_data_item_s={setcommodity_type}
                            set_id={setcommodity_type_id}
                            page={commodity_type_page}
                            setpage={setcommodity_type_page}
                            setsearch_item={setcommodity_type_search_item}
                            error_message={"Please Select Commidity Type"}
                            error_s={commodity_type_error}
                            loaded={commodity_type_loaded}
                            count={commodity_type_count}
                            bottom={commodity_type_bottom}
                            setbottom={setcommodity_type_bottom}
                          />
                        </div>
                      </Col>
                      {commodity_type === "Add New" ? (
                        <Col lg={4} md={6} sm={6}>
                          <div className="mb-2">
                            <Label className="header-child">
                              Add Commodity Type*
                            </Label>
                            <Input
                              onChange={(val) =>
                                setother_commodity_type(val.target.value)
                              }
                              onBlur={() => {
                                if (other_commodity_type !== "") {
                                  if (
                                    window.confirm(
                                      `Are you want to add commodity type ${toTitleCase(
                                        other_commodity_type
                                      )}?`
                                    )
                                  ) {
                                    setCommodityType();
                                  } else {
                                    setcommodity_type("");
                                  }
                                }
                              }}
                              value={other_commodity_type}
                              invalid={add_como_err}
                              type="text"
                              name="other_commodity_type"
                              className="form-control-md"
                              id="input"
                              placeholder="Enter Commodity Type"
                            />
                            <FormFeedback type="invalid">
                              Please Enter Commodity Type
                            </FormFeedback>
                          </div>
                        </Col>
                      ) : null}
                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-2">
                          <Label className="header-child">Commodity Name*</Label>
                          <Input
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.commodity_name}
                            invalid={
                              validation.touched.commodity_name &&
                                validation.errors.commodity_name
                                ? true
                                : false
                            }
                            type="text"
                            name="commodity_name"
                            className="form-control-md"
                            id="input"
                            placeholder="Enter Commodity name"
                            disabled={approved_entry}
                          />
                          {validation.touched.commodity_name &&
                            validation.errors.commodity_name ? (
                            <FormFeedback type="invalid">
                              {validation.errors.commodity_name}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                ) : null}
              </Card>
            </Col>
          </div>
          {/*Button */}
          <div className="m-3">
            <Col lg={12}>
              <div className="mb-1 footer_btn">
                <button
                  type="submit"
                  className={isupdating && (user.user_department_name === "ADMIN") ? "btn btn-info m-1" : !isupdating ? "btn btn-info m-1" : "btn btn-success m-1"}
                >
                  {isupdating && (user.user_department_name === "ADMIN" || user.is_superuser) ? "Update" : !isupdating ? "Save" : "Approved"}
                </button>

                {isupdating && (user.user_department_name !== "ADMIN" && !user.is_superuser) &&
                  <button
                    type="button"
                    className="btn btn-danger m-1"
                    onClick={handleShow}
                  >
                    Rejected
                  </button>
                }
                <Button
                  className="btn btn-info m-1 cu_btn"
                  type="button"
                  onClick={handleAction}
                >
                  Cancel
                </Button>
              </div>
            </Col>
          </div>
        </Form>

      </div>
    </div>
  );
};
export default Add_Commodity;
