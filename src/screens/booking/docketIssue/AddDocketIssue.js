import React, { useState, useEffect, useLayoutEffect } from "react";
import "../../../assets/scss/forms/form.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IconContext } from "react-icons";
import {
  MdAddCircleOutline,
  MdRemoveCircleOutline,
  MdDeleteForever,
  MdAdd,
} from "react-icons/md";
import {
  BiSkipNext,
  BiSkipPrevious

} from "react-icons/bi";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
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
  FormGroup,
} from "reactstrap";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { setToggle } from "../../../store/parentFilter/ParentFilter";
import {
  setAlertType,
  setDataExist,
  setShowAlert,
} from "../../../store/alert/Alert";
import toTitleCase from "../../../lib/titleCase/TitleCase";
import SearchInput from "../../../components/formComponent/searchInput/SearchInput";
import { bucket_address, ServerAddress } from "../../../constants/ServerAddress";
import TransferList from "../../../components/formComponent/transferList/TransferList";
import DataList from "../../../components/listDisplay/dataList/DataList";
import StatusInfoDataTitle from "../../../data/booking/statusInfo/StatusInfoDataTitle";
import StatusInfoDataFormat from "../../../data/booking/statusInfo/StatusInfoDataFormat";
import NSearchInput from "../../../components/formComponent/nsearchInput/NSearchInput";
import {
  setCurOrderDocketNo,
  setCurOrderId,
} from "../../../store/booking/order/Order";
// import Button from 'react-bootstrap/Button';
import Modal from "react-bootstrap/Modal";
import Main_c from "../.././../components/crop/main";

const AddDocketIssue = () => {
  const user = useSelector((state) => state.authentication.userdetails);
  const home_branch_id = useSelector(
    (state) => state.authentication.userdetails.home_branch
  );

  const accessToken = useSelector((state) => state.authentication.access_token);
  const dispatch = useDispatch();
  const location = useLocation();
  // console.log("Order Data is ====>>", location)
  const navigate = useNavigate();
  const [page, setpage] = useState(1);

  //Get Updated Location Data
  const [order, setorder] = useState([]);
  const [order_id, setorder_id] = useState("");
  const [isupdating, setisupdating] = useState(false);
  const [hash, sethash] = useState("");

  //Submit Buttom
  const [submit_btn, setsubmit_btn] = useState(false);

  // For Onfocus
  const [clicked, setclicked] = useState(false);

  
  //local delivery_type
  const [delivery_type, setdelivery_type] = useState("LOCAL");

  const [local_delivery_type_list, setlocal_delivery_type_list] = useState([
    "Sales",
    "Sample",
    "Expiry Goods",
  ]);
  const [local_delivery_type, setlocal_delivery_type] = useState("");

  // Entry Type
  const [entry_type_btn, setentry_type_btn] = useState("AUTO GENERATE");

  //Docket number
  const [docket_no_value, setdocket_no_value] = useState("");
  const [docket_error, setdocket_error] = useState(false);

  //Cold chain
  const [cold_chain, setcold_chain] = useState(false);
  const [nonecold_chain, setnonecold_chain] = useState(false);
  const [cod_list, setcod_list] = useState(["Yes", "No"]);
  const [asset_prov, setasset_prov] = useState(false)
  // console.log("----------asset_prov", asset_prov)
  const [d_cod, setd_cod] = useState("No");
  //Type of Booking
  const [type_of_booking_list, setype_of_booking_list] = useState([
    "Priority",
    "Economy",
  ]);

  const [type_of_booking, settype_of_booking] = useState(
    type_of_booking_list[1]
  );

  //For Booking Date
  const [booking_date, setbooking_date] = useState("");

  //Delivery Mode
  const [delivery_mode_list, setdelivery_mode_list] = useState([]);
  const [delivery_mode, setdelivery_mode] = useState("Door To Door");
  const [booking_through, setbooking_through] = useState(false)
  const [ewaybill_no, setewaybill_no] = useState("")

  //Client
  const [client_list, setclient_list] = useState([]);
  const [client, setclient] = useState("");
  const [client_id, setclient_id] = useState(0);
  const [selectClient, setselectClient] = useState([]);
  const [search_client, setsearch_client] = useState("");
  const [client_page, setclient_page] = useState(1);

  // Clients Commidities Lists
  const [clients_commidities_lists, setclients_commidities_lists] = useState([])
  const [client_commidities_list, setclient_commidities_list] = useState([])

  //Billto
  const [billto_list, setbillto_list] = useState([]);
  const [billto, setbillto] = useState("");
  const [billto_id, setbillto_id] = useState(0);
  const [search_billto, setsearch_billto] = useState("");
  const [billto_page, setbillto_page] = useState(1);

  //transport Mode
  const [transport_mode_data_list, settransport_mode_data_list] = useState([
    "Air",
    "Surface",
    "Train",
  ]);
  const [transport_mode, settransport_mode] = useState("");
  // Shipper
  const [customer, setcustomer] = useState([]);

  const [shipper_details, setshipper_details] = useState([]);
  const [shipperdata, setshipperdata] = useState([]);
  const [shipper_list, setshipper_list] = useState([]);
  const [shipper, setshipper] = useState("");
  const [shipper_id, setshipper_id] = useState(null);
  const [shipper_page, setshipper_page] = useState("");
  const [shipper_search_item, setshipper_search_item] = useState("");

  const [shipper_state, setshipper_state] = useState("");
  const [shipper_city, setshipper_city] = useState("");
  const [shipper_pincode, setshipper_pincode] = useState("");
  const [shipper_locality, setshipper_locality] = useState("");
  const [shipper_locality_id, setshipper_locality_id] = useState(0);
  const [shipper_add_1, setshipper_add_1] = useState("");
  const [shipper_add_2, setshipper_add_2] = useState("");
  const [all_shipper_details, setall_shipper_details] = useState([]);
  //consignee
  const [consignee_details, setconsignee_details] = useState([]);
  const [consigneedata, setconsigneedata] = useState([]);
  const [consignee_list, setconsignee_list] = useState([]);
  const [consignee, setconsignee] = useState("");
  const [consignee_locality_id, setconsignee_locality_id] = useState(0);
  const [consignee_id, setconsignee_id] = useState(null);
  const [consignee_page, setconsignee_page] = useState("");
  const [consignee_search_item, setconsignee_search_item] = useState("");
  const [consignee_state, setconsignee_state] = useState("");
  const [consignee_city, setconsignee_city] = useState("");
  const [consignee_pincode, setconsignee_pincode] = useState("");
  const [consignee_locality, setconsignee_locality] = useState("");
  const [consignee_add_1, setconsignee_add_1] = useState("");
  const [consignee_add_2, setconsignee_add_2] = useState("");
  const [all_consignee_details, setall_consignee_details] = useState([]);
  // Asset Info
  const [asset_idlist, setasset_idlist] = useState([]);
  const [assetdeleted_ids, setassetdeleted_ids] = useState([]);
  const [assetold_ids, setassetold_ids] = useState([]);
  const [assetnew_ids, setassetnew_ids] = useState([]);
  const [asset_info_list, setasset_info_list] = useState([
    // "None",
    "With Box",
    "With Logger",
    "With Box + With Logger",
  ]);
  const [asset_info_selected, setasset_info_selected] = useState(
    ""
  );
  const [box, setbox] = useState([]);
  const [logger, setlogger] = useState([]);
  const [both, setboth] = useState([]);

  //Box Number
  const [box_list_1, setbox_list_1] = useState([]);
  const [box_list_2, setbox_list_2] = useState([]);
  const [box_list_page, setbox_list_page] = useState(1);
  const [search_box_list, setsearch_box_list] = useState("");

  //Logger Number
  const [Logger_list, setLogger_list] = useState([]);
  const [Logger_Selected, setLogger_Selected] = useState([]);
  const [Logger_page, setLogger_page] = useState(1);
  const [search_logger, setsearch_logger] = useState("");

  const [temp_selected, settemp_selected] = useState("");

  //Commodity
  const [commodity_data_list, setcommodity_data_list] = useState([]);
  const [commodity, setcommodity] = useState("");
  const [commodity_id, setcommodity_id] = useState(0);
  const [search_commodity, setsearch_commodity] = useState("");

  //Transportation cost
  const [transportation_cost, settransportation_cost] = useState("");

  //Actual Weight
  const [actual_weigth, setactual_weigth] = useState("0");

  // Status Info
  const [current_status, setcurrent_status] = useState("");

  //Multi Field List(Packages----)
  const [order_active_btn, setorder_active_btn] = useState("first");


  // adding extra input fields in Packages
  const [length, setlength] = useState("");
  const [breadth, setbreadth] = useState("");
  const [height, setheight] = useState("");
  const [pieces, setpieces] = useState("");
  const [package_id_list, setpackage_id_list] = useState("");
  const [packages_id, setpackages_id] = useState([]);
  const [deleted_packages_id, setdeleted_packages_id] = useState([]);

  let dimension_list = [length, breadth, height, pieces];
  const [row, setrow] = useState([dimension_list]);

  // adding extra input fields in Order Images
  const [selectedFile, setSelectedFile] = useState("");
  const [caption1, setcaption1] = useState("");

  let dimension_list1 = [selectedFile, caption1];
  const [row1, setrow1] = useState([dimension_list1]);

  const [documentOrder, setdocumentOrder] = useState("");
  let dimension_list3 = [documentOrder, caption1];
  const [row3, setrow3] = useState([["", ""]]);

  // useEffect(() => {
  //   console.log("SelectedFile-----------------", selectedFile);
  // }, [selectedFile]);
  // adding extra input fields in Invoice
  const [invoice_img, setinvoice_img] = useState("");
  const [today, settoday] = useState("");
  const [invoice_no, setinvoice_no] = useState("");
  const [invoice_value, setinvoice_value] = useState("");

  let dimension_list2 = [invoice_img, today, invoice_no, invoice_value];
  const [row2, setrow2] = useState([dimension_list2]);
  const [row4, setrow4] = useState([["", "", "", ""]]);

  //For Calculation Info
  const [cal_type, setcal_type] = useState("");

  //origincity
  const [origincity_list, setorigincity_list] = useState([]);
  const [origincity, setorigincity] = useState("");
  // console.log("origincity----", origincity)
  const [origincity_id, setorigincity_id] = useState(0);
  const [origincity_page, setorigincity_page] = useState(1);
  const [origincity_search_item, setorigincity_search_item] = useState("");

  //destinationcity
  const [destinationcity_list, setdestinationcity_list] = useState([]);
  const [destinationcity, setdestinationcity] = useState("");
  const [destinationcity_id, setdestinationcity_id] = useState(0);
  const [destinationcity_page, setdestinationcity_page] = useState(1);
  const [destinationcity_search_item, setdestinationcity_search_item] =
    useState("");

  // Delivery Info
  const [delivery_info, setdelivery_info] = useState([]);
  const [response_awb_no, setresponse_awb_no] = useState("");

  //Circle Toogle Btn
  const [circle_btn, setcircle_btn] = useState(true);
  const toggle_circle = () => {
    setcircle_btn(!circle_btn);
  };

  const [circle_btn1, setcircle_btn1] = useState(true);
  const toggle_circle1 = () => {
    setcircle_btn1(!circle_btn1);
  };

  const [circle_btn12, setcircle_btn12] = useState(true);
  const toggle_circle12 = () => {
    setcircle_btn12(!circle_btn12);
  };

  const [circle_btn2, setcircle_btn2] = useState(true);
  const toggle_circle2 = () => {
    setcircle_btn2(!circle_btn2);
  };

  const [circle_btn3, setcircle_btn3] = useState(true);
  const toggle_circle3 = () => {
    setcircle_btn3(!circle_btn3);
  };

  const [circle_btn4, setcircle_btn4] = useState(true);
  const toggle_circle4 = () => {
    setcircle_btn4(!circle_btn4);
  };

  const [circle_btn_a, setcircle_btn_a] = useState(true);
  const toggle_circle_a = () => {
    setcircle_btn_a(!circle_btn_a);
  };

  const [circle_btn_pod, setcircle_btn_pod] = useState(true);
  const toggle_pod = () => {
    setcircle_btn_pod(!circle_btn_pod);
  };

  // Error State
  const [transportation_cost_err, settransportation_cost_err] = useState(false);
  // const [delivery_mode_error, setdelivery_mode_error] = useState(false);
  const [client_error, setclient_error] = useState(false);
  const [billto_error, setbillto_error] = useState(false);
  const [transport_mode_error, settransport_mode_error] = useState(false);

  const [origin_city_error, setorigin_city_error] = useState(false);
  const [destination_city_error, setdestination_city_error] = useState(false);
  const [shipper_error, setshipper_error] = useState(false);
  const [consignee_error, setconsignee_error] = useState(false);
  const [commodity_error, setcommodity_error] = useState(false);
  const [local_delivery_type_error, setlocal_delivery_type_error] =
    useState(false);
  const [d_cod_error, setd_cod_error] = useState(false);
  const [showModalOrder, setshowModalOrder] = useState({
    value: false,
    ind: "",
  });
  const [showModalInvoice, setshowModalInvoice] = useState({
    value: false,
    ind: "",
  });

  // Packages
  let p = row.length - 1;
  const a = parseInt(row[p][3]) + parseInt(row[p][3]);
  const addPackage = () => {
    setlength("");
    setbreadth("");
    setheight("");
    setpieces("");
    dimension_list = ["", "", "", ""];
    setrow([...row, dimension_list]);
  };

  const deletePackage = (item) => {
    setlength("length");
    setbreadth("breadth");
    setheight("height");
    setpieces("pieces");

    let temp = [...row];
    let temp_2 = [...package_id_list];

    const index = temp.indexOf(item);

    if (index > -1) {
      temp.splice(index, 1);
      temp_2.splice(index, 1);
    }
    setrow(temp);
    setpackage_id_list(temp_2);
  };

  // Order Images

  const getOrderImages = () => {
    axios.get(ServerAddress + `booking/get-order-images/${location.state.order.id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    }).then((res) => {
      let data = res.data.Data
      if (data) {
        let aa = []
        let aaa = []

        data?.map((e) => {
          let addImg = [bucket_address + e.image, e.caption, e.id]
          aa.unshift(addImg)
          aaa.unshift(["", "", e.id])
        })
        setrow1(aa)
        setrow3(aaa)
      }
    }).catch((err) => {
      // console.log("errrrrrrrrrrrrrankit----", err)
    })
  }

  const deleteOrderImg = (item1) => {
    axios.delete(ServerAddress + `booking/delete-order-images/${item1[2]}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    }).then((res) => {
      if (res.data.message === "Image deleted successfully.") {
        deleteimage(item1);
      } else {
        alert(res.data.message)
      }
    }).catch((err) => {
      // console.log(console.log("err----delete---Order--", err))
    })
  }
  const deleteInvoiceImg = (item2) => {
    axios.delete(ServerAddress + `booking/delete-invoice-images/${item2[4]}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    }).then((res) => {
      deleteinvoice(item2);
    }).catch((err) => {
      // console.log(console.log("err----delete---invoice--", err))
    })
  }

  const getInvoiceImages = () => {
    axios.get(ServerAddress + `booking/get-invoice-images/${location.state.order.id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    }).then((res) => {
      let data = res.data.Data
      let aa = []
      data.map((e) => {
        let addImg = [bucket_address + e.invoice_image, e.invoice_at.split("T")[0], e.invoice_no, e.invoice_amount, e.id]
        aa.unshift(addImg)
      })
      setrow2(aa)

    }).catch((err) => {
      // console.log("errrrrrrrrrrrrrankit----", err)
    })
  }

  useLayoutEffect(() => {
    if (isupdating && order_active_btn === 'second') {
      getOrderImages()
    } else if (isupdating && order_active_btn === 'third') {
      getInvoiceImages()
    }
  }, [order_active_btn])

  const addorderimage = () => {
    setSelectedFile("");
    setcaption1("");
    dimension_list1 = ["", ""];
    setrow1([...row1, dimension_list1]);
    setrow3([...row3, ["", ""]]);
  };
  const deleteimage = (item1) => {
    let temp1 = [...row1];
    let temp3 = [...row3];

    const index1 = temp1.indexOf(item1);

    if (index1 > -1) {
      temp1.splice(index1, 1);
      temp3.splice(index1, 1);
    }

    setrow1(temp1);
    setrow3(temp3);
  };

  // Invoice
  const addinvoice = () => {
    setinvoice_img("");
    settoday("");
    setinvoice_no("");
    setinvoice_value("");
    dimension_list2 = ["", "", "", ""];
    setrow2([...row2, dimension_list2]);
    setrow4([...row4, ["", "", "", ""]]);
  };
  const deleteinvoice = (item2) => {
    let temp2 = [...row2];
    let temp4 = [...row4];
    const index2 = temp2.indexOf(item2);

    if (index2 > -1) {
      temp2.splice(index2, 1);
      temp4.splice(index2, 1);
    }
    setrow2(temp2);
    setrow4(temp4);
  };

  //Logger PDF

  const [logger_pdf, setlogger_pdf] = useState("")
  const [text, settext] = useState("")
  const dimension_list5 = [logger_pdf, text]
  const [row5, setrow5] = useState([dimension_list5])

  useEffect(() => {
    if (Logger_Selected.length > 0) {
      let temp_log = []
      for (let index = 0; index < Logger_Selected.length; index++) {
        const element = Logger_Selected[index];
        temp_log.push(["", element[1]])

      }
      setrow5(temp_log)
    }
  }, [Logger_Selected])

  const [logger_id_list, setlogger_id_list] = useState([])
  let log = row.length - 1;
  const addLogger = () => {
    setlogger_pdf("");

    dimension_list = ["", "", "", ""];
    setrow5([...row5, dimension_list5]);
  };

  const deleteLogger = (item) => {
    setlogger_pdf("logger_pdf");

    let temp = [...row5];
    let temp_2 = [...logger_id_list];

    const index = temp.indexOf(item);

    if (index > -1) {
      temp.splice(index, 1);
      temp_2.splice(index, 1);
    }
    setrow5(temp);
    setlogger_id_list(temp_2);
  };


  // validation
  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      ewaybill_no: "",
      consignor_city: "",
      consignor_state: "",
      consignor_pin_code: "",
      consignee_city: "",
      consignee_state: "",
      consignee_pin_code: "",
      total_quantity: order.total_quantity || "0",
      chargeable_weight: order.chargeable_weight || "0",
      e_way_bill_no: order.e_waybill_number || "",
      e_Way_Billpart_two: order.e_waybill_number_part_b || "",
      remarks: order.remarks || "",
      consignor_address_line1: order.shipper_address || "",
      consignor_address_line2: "",
      consignor_phone_no: order.mobile_shipper || "",
      consignee_address_line1: order.consignee_address || "",
      consignee_address_line2: "",
      consignee_phone_no: order.mobile_consignee || "",
      person_name: "" || delivery_info.signature_person_name,
      person_ph_no: "" || delivery_info.signature_person_phone_number,
    },

    validationSchema: Yup.object({
      total_quantity: Yup.string().required(" Total quantity is required"),
    }),

    onSubmit: (values) => {
      let total_no_of_pieces = 0;
      row.forEach((package_i) => {
        let no_pi = package_i[3];
        total_no_of_pieces += no_pi !== "" ? parseInt(no_pi) : 0;
      });
      // TO Scroll the page
      let doc_no_scroll = window.document.getElementById("doc_no");
      // let shipper = window.document.getElementById("shipper");

      if (
        entry_type_btn === "MANUALLY" &&
        docket_no_value.length < 6
        // || (entry_type_btn === "MANUALLY" && docket_no_value.length < 6)
      ) {
        setdocket_error(true);
        doc_no_scroll.scrollIntoView();
      } else if (transport_mode === "") {
        settransport_mode_error(true);
        doc_no_scroll.scrollIntoView();
      } else if (billto === "") {
        setbillto_error(true);
      } else if (client === "") {
        setclient_error(true);
        doc_no_scroll.scrollIntoView();
      } else if (origincity === "") {
        document.getElementById("shipper").scrollIntoView();
        setorigin_city_error(true);
      } else if (shipper === "") {
        setshipper_error(true);
        document.getElementById("shipper").scrollIntoView();
      } else if (destinationcity === "") {
        setdestination_city_error(true);
        document.getElementById("consignee").scrollIntoView();
      } else if (consignee === "") {
        setconsignee_error(true);
        document.getElementById("consignee").scrollIntoView();
      } else if (commodity === "") {
        setcommodity_error(true);
      } else if (delivery_type === "LOCAL" && local_delivery_type === "") {
        setlocal_delivery_type_error(true);
      } else if (d_cod === "") {
        setd_cod_error(true);
      } else if (
        cal_type === "DIMENSION" &&
        (length === "" || breadth === "" || height === "" || pieces === "")
      ) {
        alert("Please Add Pakage Details");
      } else if (
        (length !== "" || breadth !== "" || height !== "" || pieces !== "") &&
        (length === "" || breadth === "" || height === "" || pieces === "")
      ) {
        alert(
          "Total Number Of Pieces Is Not Equal To Total Number Of Quantity"
        );
      } else if (total_no_of_pieces !== parseInt(values.total_quantity)) {
        alert(
          "Total Number Of Pieces Is Not Equal To Total Number Of Quantity"
        );
      } else if (d_cod === "Yes" && transportation_cost === "") {
        settransportation_cost_err(true);
      } else if (booking_date === "") {
        alert("Please Add Booking Date");
      } else {
        isupdating ? update_order(values) : send_order_data(values);
      }
    },
  });

  //Barcode Box
  const [box_bq, setbox_bq] = useState("")
  let dimension_list8 = [box_bq];
  const [row6, setrow6] = useState([dimension_list8])
  console.log("row6--------------------------", row6)
  console.log("validation.values.total_quantity", validation.values.total_quantity)
  useEffect(() => {
    if (validation.values.total_quantity !== 0) {
      let val = validation.values.total_quantity
      console.log("val----", val)
      let val_box = []
      for (let index = 0; index < val; index++) {
        console.log("val--------", index)
        // const element = val[index];
        // console.log("element----", element)
        val_box.push([""])

      }
      setrow6(val_box)
    }
  }, [validation.values.total_quantity])

  // Get Packages
  const get_packages = () => {
    let temp = [];
    let temp_list = [];
    let temp_list2 = [];
    axios
      .get(ServerAddress + "booking/get-packages/?order_id=" + order_id, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(function (response) {
        temp = response.data;
        // console.log("temp---------", temp);

        if (response.data.length !== 0) {
          for (let index = 0; index < response.data.length; index++) {
            temp_list.push([
              temp[index].length,
              temp[index].breadth,
              temp[index].height,
              temp[index].no_of_pieces,
              temp[index].id,
            ]);
            temp_list2.push(temp[index].id);
          }

          setrow(temp_list);
          setlength(temp_list[0][0]);
          setbreadth(temp_list[0][1]);
          setheight(temp_list[0][2]);
          setpieces(temp_list[0][3]);
          setpackage_id_list(temp_list2);
          setpackages_id(temp_list2);
        } else {
          setrow([["", "", "", ""]]);
        }
      })
      .catch((error) => {
        alert(`Error Happen while posting data  Data ${error}`);
      });
  };

  // Delivery List
  // const delivery_list = () => {
  //   if (delivery_type === "LOCAL") {
  //     setdelivery_mode_list(["Door To Door"]);
  //     setdelivery_mode("Door To Door");
  //   } else {
  //     setdelivery_mode_list(["Door To Door", "Airport To AirPort"]);
  //     setdelivery_mode("Door To Door");
  //   }
  // };

  //Get Origin  City
  const getCities = (place_id, filter_by) => {
    let cities_list = [...origincity_list];
    // let dcities_list = [...destinationcity_list];
    axios
      .get(
        ServerAddress +
        `master/all_cities/?search=${""}&p=${origincity_page}&records=${10}&city_search=${origincity_search_item}` +
        "&place_id=" +
        place_id +
        "&filter_by=" +
        filter_by,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((resp) => {
        if (resp.data.results.length > 0) {
          if (origincity_page === 1) {
            cities_list = resp.data.results.map((v) => [
              v.id,
              toTitleCase(v.city),
            ]);
          } else {
            cities_list = [
              ...origincity_list,
              ...resp.data.results.map((v) => [v.id, toTitleCase(v.city)]),
            ];
          }

          // if (destinationcity_page == 1) {
          //   dcities_list = resp.data.results.map((v) => [
          //     v.id,
          //     toTitleCase(v.city),
          //   ]);
          // } else {
          //   dcities_list = [
          //     ...destinationcity_list,
          //     ...resp.data.results.map((v) => [v.id, toTitleCase(v.city)]),
          //   ];
          // }
          cities_list = [...new Set(cities_list.map((v) => `${v}`))].map((v) =>
            v.split(",")
          );
          // dcities_list = [...new Set(dcities_list.map((v) => `${v}`))].map(
          //   (v) => v.split(",")
          // );
          setorigincity_list(cities_list);
          // setdestinationcity_list(dcities_list);
        }
      })
      .catch((err) => {
        // alert(`Error Occur in Get City, ${err}`);
      });
  };

  // Get destination city
  const getDes_Cities = (place_id, filter_by) => {
    // let cities_list = [...origincity_list];
    let dcities_list = [...destinationcity_list];
    axios
      .get(
        ServerAddress +
        `master/all_cities/?search=${""}&p=${destinationcity_page}&records=${10}&city_search=${destinationcity_search_item}` +
        "&place_id=" +
        place_id +
        "&filter_by=" +
        filter_by,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((resp) => {
        if (resp.data.results.length > 0) {
          // if (origincity_page == 1) {
          //   cities_list = resp.data.results.map((v) => [
          //     v.id,
          //     toTitleCase(v.city),
          //   ]);
          // } else {
          //   cities_list = [
          //     ...origincity_list,
          //     ...resp.data.results.map((v) => [v.id, toTitleCase(v.city)]),
          //   ];
          // }

          if (destinationcity_page === 1) {
            dcities_list = resp.data.results.map((v) => [
              v.id,
              toTitleCase(v.city),
            ]);
          } else {
            dcities_list = [
              ...destinationcity_list,
              ...resp.data.results.map((v) => [v.id, toTitleCase(v.city)]),
            ];
          }
          // cities_list = [...new Set(cities_list.map((v) => `${v}`))].map((v) =>
          //   v.split(",")
          // );
          dcities_list = [...new Set(dcities_list.map((v) => `${v}`))].map(
            (v) => v.split(",")
          );
          // setorigincity_list(cities_list);
          setdestinationcity_list(dcities_list);
        }
      })
      .catch((err) => {
        alert(`Error Occur in Get City, ${err}`);
      });
  };

  // Get Client Shipper & Consignee
  const get_client_shipper = (client_id, origin_id) => {
    let shipperlist = [];
    axios
      .get(
        ServerAddress +
        `master/get_client_shipperconsignee/?client_id=${client_id}&city_id=${origin_id}&p=${shipper_page}&records=${10}&name_search=${shipper_search_item}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        setshipperdata(response.data.results);
        shipperlist = response.data.results.map((v) => [
          v.id,
          toTitleCase(v.name),
        ]);
        setshipper_list(shipperlist);
      })
      .catch((err) => {
        alert(`Error Occur in Get , ${err}`);
      });
  };

  const get_client_consignee = (client_id, destination_id) => {
    let consigneelist = [];
    axios
      .get(
        ServerAddress +
        `master/get_client_shipperconsignee/?client_id=${client_id}&city_id=${destination_id}&p=${consignee_page}&records=${10}&name_search=${consignee_search_item}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        setconsigneedata(response.data.results);
        consigneelist = response.data.results.map((v) => [
          v.id,
          toTitleCase(v.name),
        ]);
        setconsignee_list(consigneelist);
      })
      .catch((err) => {
        alert(`Error Occur in Get , ${err}`);
      });
  };

  // Get Order Delivery Data
  const getorder_delivery_data = (order_id) => {
    axios
      .get(
        ServerAddress +
        "bookings/api/get-order-delivery-info/?order_id=" +
        order_id,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        setdelivery_info(response.data[0]);
      })
      .catch((err) => {
        alert(`Error Occur while Order Delivery Info, ${err}`);
      });
  };

  //Post Order Image
  const send_order_image = (awb) => {

    let newrow3 = row3.filter((e) => e[0] !== "" && e[1] !== "")
    const docket_imageform = new FormData();
    if (newrow3.length !== 0) {


      docket_imageform.append(`awb_no`, awb);
      docket_imageform.append("docketcount", newrow3[0][0] !== "" ? newrow3.length : 0);
      if (newrow3.length !== 0 && newrow3[0][0] !== "") {
        for (let index = 0; index < newrow3.length; index++) {
          // docket_imageform.append("docketcount", row3[0][0] !== "" ? row3.length : 0);
          // if (row3.length !== 0 && row3[0][0] !== "") {
          //   for (let index = 0; index < row3.length; index++) {

          docket_imageform.append(
            `DocketImage${index}`,
            newrow3[index][0],
            newrow3[index][0]?.name
          );
          docket_imageform.append(`DocketImageCaption${index}`, newrow3[index][1]);
          docket_imageform.append(`id`, 0);
        }
      }

      docket_imageform.append("invoice_count", row4[0][0] !== "" ? row4.length : 0);
      if (row4.length !== 0 && row4[0][0] !== "") {
        for (let index = 0; index < row4.length; index++) {
          docket_imageform.append(
            `InvoiceImage${index}`,
            row4[index][0],
            row4[index][0]?.nane
          );
          docket_imageform.append(`invoice_date${index}`, row4[index][1]);
          docket_imageform.append(`invoice_no${index}`, row4[index][2]);
          docket_imageform.append(`invoice_amount${index}`, row4[index][3]);
        }
      }

      console.log("docket_imageform----------", row4.length)
      axios
        .post(ServerAddress + "booking/add-order-images/", docket_imageform, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "content-type": "multipart/form-data",
          },
        })
        .then((res) => {
          // console.log("Order Image Response1111", res.data);
          if (res.data.Data === "Done") {
            // successMSg();
            alert(`Your Docket Image Saved Successfully`);
            // wipe_data();
            // setvisible(false);
          } else {
            // console.log("Ankkiii");
          }
        })
        .catch((err) => {
        });
    }
  };

  // Post Order Data
  const send_order_data = (values) => {
    axios
      .post(
        ServerAddress + "booking/add_order/",
        {
          docket_no: entry_type_btn === "AUTO GENERATE" ? "" : docket_no_value,
          entry_type: entry_type_btn,
          delivery_type: String(delivery_type).toUpperCase(),
          order_created_branch: user.home_branch,
          transportation_mode: delivery_type === "LOCAL" ? "LOCAL" : String(transport_mode).toUpperCase(),
          // delivery_mode: delivery_type === "LOCAL" ? "LOCAL" : String(delivery_mode).toUpperCase(),
          delivery_mode: "DOOR TO DOOR",
          order_channel: "WEB APP",
          billto: billto_id,
          client: client_id,
          shipper: shipper_id,
          consignee: consignee_id,
          booking_at: booking_date,
          local_delivery_type: String(local_delivery_type).toUpperCase(),
          cold_chain: cold_chain ? true : false,
          actual_weight: actual_weigth,
          total_quantity: values.total_quantity,
          cod: String(d_cod).toUpperCase(),
          transportation_cost: d_cod === "Yes" ? transportation_cost : null,
          remarks: values.remarks,
          created_by: user.id,
          booking_type: String(type_of_booking).toUpperCase(),
          commodity: commodity_id,
          packageList: row,
          InvoiceList: [],
          notification: true,
          asset_type: asset_prov ? String(asset_info_selected).toUpperCase() : "NONE",
          asset:
            asset_info_selected === "With Box" &&
              asset_info_selected !== "None" &&
              cold_chain
              ? box
              : asset_info_selected === "With Logger" &&
                asset_info_selected !== "None" &&
                cold_chain
                ? logger
                : asset_info_selected === "With Box + With Logger" &&
                  asset_info_selected !== "None" &&
                  cold_chain
                  ? both
                  : [],
          current_branch: home_branch_id,
          client_name: client.toUpperCase(),
          branch_name: user.branch_nm ? user.branch_nm : "BRANCH NOT SET",
          shipper_name: shipper.toUpperCase(),
          consignee_name: consignee.toUpperCase(),
          commodity_name: commodity.toUpperCase(),
          shipper_address: shipper_add_1.toUpperCase(),
          shipper_location: shipper_locality_id,
          consignee_location: consignee_locality_id,
          consignee_address: consignee_add_1.toUpperCase(),
          order_origin: all_shipper_details.toUpperCase(),
          order_destination: all_consignee_details.toUpperCase(),
          billto_name: billto.toUpperCase(),
          is_docket_entry: user.is_docket_entry ? user.is_docket_entry : false,
          starting_docket_no: user.starting_docket_no ? user.starting_docket_no : "",
          barcode_no: row6,

          cm_current_department: user.user_department,
          cm_current_status: (user.user_department_name + " " + user.designation_name === "DATA ENTRY OPERATOR" || user.user_department_name + " " + user.designation_name === "CUSTOMER SERVICE EXECUTIVE") ? 'NOT APPROVED' : (cm_current_status).toUpperCase(),
          cm_transit_status: (user.user_department_name + " " + user.designation_name === "DATA ENTRY OPERATOR" || user.user_department_name + " " + user.designation_name === "CUSTOMER SERVICE EXECUTIVE") ? 'NOT APPROVED' : (cm_current_status).toUpperCase(),
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (response) {
        if (response.data.status === "success") {
          if (row3[0][0] !== "" || row4[0][0] !== "") {
            send_order_image(response.data.data.docket_no);
          }
          dispatch(setToggle(true));
          setsubmit_btn(true);
          setresponse_awb_no(response.data.awb_no);
          dispatch(setShowAlert(true));
          dispatch(setDataExist(`Order  ${docket_no_value} Added sucessfully`));
          dispatch(setAlertType("success"));
          navigate("/booking/orders");
        }
      })
      .catch((error) => {
        alert(`Error Happen while posting Order  Data ${error}`);
      });
  };
  // Update Order
  const update_order = (values) => {
    let id = order.id;

    let fields_names = Object.entries({
      actual_weight: actual_weigth,
      asset_type: asset_info_selected,
      billto_name: billto,
      // booking_at: booking_date,
      booking_type: type_of_booking,
      branch_name: user.branch_nm,
      client_name: client,
      // chargeable_weight: values.branch_phone_number,
      cod: d_cod,
      cold_chain: cold_chain,
      commodity_name: commodity,
      consignee_address_line: consignee_add_1,//
      consignee_city: destinationcity,
      consignee_locality: consignee_locality,
      consignee_name: consignee,
      consignee_pincode: consignee_pincode,
      // delivery_mode: delivery_mode,
      delivery_type: (delivery_type).toUpperCase(),
      entry_type: entry_type_btn,

      local_delivery_type: local_delivery_type,
      remarks: values.remarks,

      shipper_address_line: shipper_add_1,
      shipper_city: origincity,
      shipper_locality: shipper_locality,
      shipper_name: shipper,
      shipper_pincode: shipper_pincode,
      shipper_state: shipper_state,
      total_quantity: values.total_quantity,
      transportation_mode: transport_mode,

      // billto_name: billto,
    });

    let change_fields = {};

    for (let j = 0; j < fields_names.length; j++) {
      const ele = fields_names[j];
      let prev = location.state.order[`${ele[0]}`];
      let new_v = ele[1];
      if (String(prev).toUpperCase() !== String(new_v).toUpperCase()) {
        change_fields[`${ele[0]}`] = new_v.toString().toUpperCase();
      }
    }
    axios
      .put(
        ServerAddress + "booking/update_order/" + id,
        {
          change_fields: change_fields,
          docket_no: docket_no_value,
          entry_type: entry_type_btn,
          delivery_type: String(delivery_type).toUpperCase(),
          order_created_branch: user.home_branch,
          transportation_mode: delivery_type === "LOCAL" ? "LOCAL" : String(transport_mode).toUpperCase(),
          // delivery_mode: delivery_type === "LOCAL" ? "LOCAL" : String(delivery_mode).toUpperCase(),
          delivery_mode: "DOOR TO DOOR",
          order_channel: "WEB APP",
          billto: billto_id,
          client: client_id,
          shipper: shipper_id,
          consignee: consignee_id,
          booking_at: booking_date,
          local_delivery_type: String(local_delivery_type).toUpperCase(),
          cold_chain: cold_chain,
          actual_weight: actual_weigth,
          total_quantity: values.total_quantity,
          cod: String(d_cod).toUpperCase(),
          transportation_cost: d_cod === "Yes" ? transportation_cost : null,
          remarks: values.remarks,
          modified_by: user.id,
          booking_type: String(type_of_booking).toUpperCase(),
          commodity: commodity_id,
          packageList: row,
          deleted_packages: deleted_packages_id,
          InvoiceList: [],
          notification: true,
          asset_type:
            cold_chain === true && asset_prov
              ? String(asset_info_selected).toUpperCase()
              : "NONE",
          asset:
            asset_info_selected === "With Box" &&
              asset_info_selected !== "None" &&
              cold_chain
              ? box
              : asset_info_selected === "With Logger" &&
                asset_info_selected !== "None" &&
                cold_chain
                ? logger
                : asset_info_selected === "With Box + With Logger" &&
                  asset_info_selected !== "None" &&
                  cold_chain
                  ? both
                  : [],

          client_name: client.toUpperCase(),
          branch_name: user.branch_nm ? user.branch_nm : "BRANCH NOT SET",
          shipper_name: shipper.toUpperCase(),
          consignee_name: consignee.toUpperCase(),
          commodity_name: commodity.toUpperCase(),
          shipper_address: shipper_add_1.toUpperCase(),
          consignee_address: consignee_add_1.toUpperCase(),
          order_origin: all_shipper_details.toUpperCase(),
          order_destination: all_consignee_details.toUpperCase(),
          billto_name: billto.toUpperCase(),
          shipper_location: shipper_locality_id,
          consignee_location: consignee_locality_id,
          assetdeleted_ids: assetdeleted_ids,
          assetold_ids: assetold_ids,
          assetnew_ids: assetnew_ids,

          cm_transit_status: status_toggle === true ? cm_current_status : "",
          cm_current_status: (cm_current_status).toUpperCase(),
          cm_remarks: toTitleCase(message).toUpperCase(),
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (response) {
        if (response.data.status === "success") {
          send_order_image(order.docket_no)
          dispatch(setToggle(true));
          dispatch(
            setDataExist(`Order Updated Sucessfully`)
          );
          dispatch(setAlertType("info"));
          dispatch(setShowAlert(true));
          navigate("/booking/orders");
        }
      })
      .catch(function () {
        alert(" Error While  Updateing Orders");
      });
  };

  const [clientdata, setclientdata] = useState([]);
  const [data, setdata] = useState(false);

  const getBillto = () => {
    let b_temp2 = [...billto_list];
    let b_data = [];
    axios
      .get(
        ServerAddress +
        `master/all_billtoes/?search=${""}&p=${billto_page}&records=${10}&name_search=${search_billto}&pan_no=${[]}&data=all`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        b_data = response.data.results;
        for (let index = 0; index < b_data.length; index++) {
          b_temp2.push([b_data[index].id, toTitleCase(b_data[index].name)]);
        }
        b_temp2 = [...new Set(b_temp2.map((v) => `${v}`))].map((v) =>
          v.split(",")
        );
        setbillto_list(b_temp2);
      })
      .catch((err) => {
        alert(`Error Occur in Get Data ${err}`);
      });
  };

  const getClient = () => {
    let temp2 = [...client_list];
    let data = [];
    axios
      .get(
        ServerAddress +
        `master/all_clients/?bill_to=${billto_id}&search=${""}&p=${client_page}&records=${10}&name_search=${search_client}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        data = response.data.results;

        console.log("clients data", data)

        let com_list_cl = data.map(v => [v.id, v.commodities])
        console.log('com_list_cl', com_list_cl)
        setclients_commidities_lists(com_list_cl)
        for (let index = 0; index < data.length; index++) {
          temp2.push([data[index].id, toTitleCase(data[index].name)]);
        }
        temp2 = [...new Set(temp2.map((v) => `${v}`))].map((v) => v.split(","));
        setclient_list(temp2);
      })
      .catch((err) => {
        alert(`Error Occur in Get Data ${err}`);
      });
  };

  // Get Commodity
  const getCommidityData = () => {
    let data = [];
    let temp3 = [...commodity_data_list];
    axios
      .get(
        ServerAddress +
        `master/all_commodities/?search=${""}&p=${page}&records=${10}&commodity_type=${[""]}&commodity_name=${[""]}&commodity_name_search=${search_commodity}&data=all`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        if (response.data.results.length > 0) {
          data = response.data.results;
          for (let index = 0; index < data.length; index++) {
            temp3.push([
              data[index].id,
              toTitleCase(data[index].commodity_name),
            ]);
          }
          temp3 = [...new Set(temp3.map((v) => `${v}`))].map((v) =>
            v.split(",")
          );
          setcommodity_data_list(temp3);
        }
      })
      .catch((err) => {
        alert(`Error Occur in Get Data ${err}`);
      });
  };

  // Get Order Assets
  const get_orderasset = (order_id, box, logger) => {
    axios
      .get(
        ServerAddress +
        `master/get_orderasset/?order_id=${order_id}&p=1&records=10`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        let temp = [];
        let temp2 = [];
        let deleted_id = [];
        for (let index = 0; index < response.data.results.length; index++) {
          const order_asset = response.data.results[index];
          if (order_asset.asset_type === "TEMPERATURE CONTROL BOX") {
            temp.push([
              order_asset.asset,
              order_asset.asset_id +
              "-" +
              order_asset.box_type +
              "-" +
              order_asset.product_id,
            ]);
            deleted_id.push(order_asset.asset);
          } else {
            temp2.push([
              order_asset.asset,
              order_asset.asset_id +
              "-" +
              order_asset.box_type +
              "-" +
              order_asset.manufacturer_name,
            ]);
            deleted_id.push(order_asset.asset);
          }
        }
        setasset_idlist(deleted_id);
        setbox_list_2(temp);
        setLogger_Selected(temp2);
        let temp3 = [];
        let other_boxes = [];
        let temp4 = [];
        let other_logger = [];

        //Box
        for (let index = 0; index < temp.length; index++) {
          const element2 = temp[index][1];
          temp3.push(element2);
        }

        for (let index = 0; index < box.length; index++) {
          const element = box[index][1];
          if (temp3.includes(element) === false) {
            other_boxes.push(box[index]);
          }
        }

        //Logger
        for (let index = 0; index < temp2.length; index++) {
          const element2 = temp2[index][1];
          temp4.push(element2);
        }

        for (let index = 0; index < logger.length; index++) {
          const element = logger[index][1];
          if (temp4.includes(element) === false) {
            other_logger.push(logger[index]);
          }
        }
        setbox_list_1(other_boxes);
        setLogger_list(other_logger);
      })
      .catch((err) => {
        alert(`Error Occur in Get , ${err}`);
      });
  };

  //  Get Asset Details
  const getassetData = () => {
    let data = [];
    let box = [...box_list_1];
    let logger = [...Logger_list];

    axios
      .get(
        ServerAddress +
        `master/get_asset_details/?p=${asset_info_selected === "With Logger" ? Logger_page : box_list_page}&records=${10}&asset_type=${String(
          asset_info_selected
        ).toUpperCase()}&product_id_search=${search_logger}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        data = response.data.results;
        for (let index = 0; index < data.length; index++) {
          const element = data[index];
          if (element.asset_type === "TEMPERATURE CONTROL BOX") {
            box.push([
              element.id,
              element.asset_id +
              "-" +
              element.box_type +
              "-" +
              element.product_id,
            ]);
          } else {
            logger.push([
              element.id,
              element.asset_id +
              "-" +
              element.box_type +
              "-" +
              element.manufacturer_name,
            ]);
          }
        }
        logger = [...new Set(logger.map((v) => `${v}`))].map((v) =>
          v.split(",")
        );
        box = [...new Set(box.map((v) => `${v}`))].map((v) =>
          v.split(",")
        );
        setbox_list_1(box);
        setLogger_list(logger);
        if (isupdating && order_id !== "") {
          get_orderasset(order_id, box, logger);
        }
      })
      .catch((err) => {
        alert(`Error Occur in Get Data ${err}`);
      });
  };

  // Navigation At the time of Cancel
  const handleAction = () => {
    dispatch(setToggle(true));
    navigate("/booking/orders");
  };

  // Type Of Booking
  const booking_type = () => {
    if (cold_chain === true) {
      settype_of_booking(type_of_booking_list[0]);
    } else {
      settype_of_booking(type_of_booking_list[1]);
    }
  };

  useEffect(() => {
    let date = new Date();
    let added_date_time =
      String(date.getDate()).length === 1
        ? "0" + String(date.getDate())
        : String(date.getDate());
    let month =
      String(date.getMonth() + 1).length === 1
        ? "0" + String(date.getMonth() + 1)
        : String(date.getMonth() + 1);
    let year = String(date.getFullYear());

    let hour =
      String(date.getHours()).length === 1
        ? "0" + String(date.getHours())
        : String(date.getHours());
    let minutes =
      String(date.getMinutes()).length === 1
        ? "0" + String(date.getMinutes())
        : date.getMinutes();
    setbooking_date(`${year}-${month}-${added_date_time}T${hour}:${minutes}`);
  }, []);

  useEffect(() => {
    booking_type();
  }, [cold_chain]);

  useLayoutEffect(() => {
    if (asset_info_selected !== "None" && asset_info_selected) {
      getassetData();
    }
  }, [asset_info_selected, search_logger, search_box_list, box_list_page]);

  useEffect(() => {
    getBillto();
  }, [billto_page, search_billto]);

  useEffect(() => {
    // setdata(false);
    if (billto_id !== 0) {
      getClient();
    }
  }, [billto_id, search_client, client_page]);

  useEffect(() => {
    if (billto_id !== 0) {
      if (!isupdating) {
        setclient("");
        setclient_id("");
      }
    }
  }, [billto_id]);

  useEffect(() => {
    getCommidityData();
  }, [page, search_commodity]);

  useEffect(() => {
    if (order_id !== "") {
      get_packages();
    }
  }, [order_id]);

  useEffect(() => {
    if ((data === true) & (isupdating === true)) {
      setclient_id(order.client);
    }
    if (location.state === null) {
      setorigincity("");
      setorigincity_id("");
      setshipper_id("");
      setdestinationcity("");
      setdestinationcity_id("");
      setconsignee_id("");
    }
    // Setting Client Commidities After Selecting Client
    if (client_id !== 0 && clients_commidities_lists.length !== 0) {
      let sel_com = clients_commidities_lists.find(v => v[0] === client_id)[1]
      // console.log("commodity_data_list", commodity_data_list)
      // console.log("sel_com", sel_com)
      let tmp_com_data_list = commodity_data_list.filter(v => sel_com.includes(parseInt(v[0])))

      // console.log("tmp_com_data_list", tmp_com_data_list)
      setclient_commidities_list(tmp_com_data_list)
    }
  }, [client_id, data, clients_commidities_lists]);

  useEffect(() => {
    setcustomer([]);
    let temp = [];
    selectClient.map((value) => {
      temp.push([value.id, value.name]);
      setcustomer(temp);
    });
  }, [selectClient]);

  useLayoutEffect(() => {
    if (shipper_id !== "") {
      let selected_shipper = shipperdata.filter(
        (value) => value.id === shipper_id
      );
      setshipper_details(selected_shipper[0]);
    }
  }, [shipper_id]);

  useEffect(() => {
    let selected_consignee = consigneedata.filter(
      (val) => val.id === consignee_id
    );
    setconsignee_details(selected_consignee[0]);
  }, [consignee_id]);


  useLayoutEffect(() => {
    if (shipper_details) {
      setshipper_state(toTitleCase(shipper_details.state_name));
      setshipper_city(toTitleCase(shipper_details.city_name));
      setshipper_pincode(toTitleCase(shipper_details.pincode_name));
      setshipper_add_1(toTitleCase(shipper_details.address_line1));
      setshipper_locality(toTitleCase(shipper_details.locality_name));
      setshipper_locality_id(shipper_details.location);
    }
  }, [shipper_details, shipper_id]);

  useLayoutEffect(() => {
    if (consignee_details) {
      setconsignee_state(toTitleCase(consignee_details.state_name));
      setconsignee_city(toTitleCase(consignee_details.city_name));
      setconsignee_pincode(toTitleCase(consignee_details.pincode_name));
      setconsignee_add_1(toTitleCase(consignee_details.address_line1));
      setconsignee_locality(toTitleCase(consignee_details.locality_name));
      setconsignee_locality_id(consignee_details.location);
    }
  }, [consignee_details]);

  useEffect(() => {
    if (location.state === null) {
      setshipper("");
      setshipper_state("");
      setshipper_city("");
      setshipper_pincode("");
      setshipper_add_1("");
      setshipper_add_2("");
      setconsignee("");
      setconsignee_state("");
      setconsignee_city("");
      setconsignee_pincode("");
      setconsignee_add_1("");
      setconsignee_add_2("");
    }
  }, [client_id]);

  useEffect(() => {
    let date = new Date();
    let date_n =
      String(date.getDate()).length === 1
        ? "0" + String(date.getDate())
        : String(date.getDate());
    let month =
      String(date.getMonth() + 1).length === 1
        ? "0" + String(date.getMonth() + 1)
        : String(date.getMonth() + 1);
    let year = String(date.getFullYear());
    settoday(`${year}-${month}-${date_n}`);
  }, []);

  // useEffect(() => {
  //   delivery_list();
  // }, [delivery_type]);


  useLayoutEffect(() => {
    try {
      let order_data = location.state.order;
      if (location.state.hash) {
        sethash(location.state.hash);
        let hsh = location.state.hash;
        if (hsh === "images") {
          setorder_active_btn("second");
        }
      }
      setorder(location.state.order);
      console.log("Docket data  =>",order)
      setcurrent_status(order_data.current_status);
      setdocket_no_value(order_data.docket_no);
      setisupdating(true);
      setorder_id(order_data.id);
      setdocket_no_value(order_data.docket_no);
      dispatch(setCurOrderId(order_data.id));
      dispatch(setCurOrderDocketNo(order_data.docket_no));
      settype_of_booking(toTitleCase(order_data.booking_type));
      settransport_mode(toTitleCase(order_data.transportation_mode));
      // setdelivery_mode(order_data.delivery_mode);
      settransportation_cost(order_data.transportation_cost);

      setcommodity(order_data.commodity_name);
      setcommodity_id(order.commodity);
      setd_cod(toTitleCase(order_data.cod));
      if (order_data.cod === "Yes") {
        settransportation_cost(order_data.transportation_cost);
      }
      setcold_chain(order_data.cold_chain);
      setdelivery_type(order_data.delivery_type);
      setentry_type_btn(order_data.entry_type);
      setactual_weigth(order_data.actual_weight);
      setcommodity(toTitleCase(order_data.commodity_name));
      setclient(toTitleCase(order_data.client_name));
      setclient_id(order_data.client);
      setbillto(toTitleCase(order_data.billto_name));
      setbillto_id(order_data.billto);
      // setclient_id(order_data.client)
      setshipper(toTitleCase(order_data.shipper_name));
      setshipper_id(order_data.shipper);
      setshipper_state(toTitleCase(order_data.shipper_state));
      setshipper_city(toTitleCase(order_data.shipper_city));
      setshipper_pincode(order_data.shipper_pincode);
      setshipper_add_2(toTitleCase(order_data.shipper_address_line_2));
      setorigincity(toTitleCase(order_data.shipper_city));
      setorigincity_id(toTitleCase(order_data.shipper_city_id));
      setshipper_locality(toTitleCase(order_data.shipper_locality));

      setconsignee(toTitleCase(order_data.consignee_name));
      setconsignee_id(order_data.consignee);
      setconsignee_state(toTitleCase(order_data.consignee_state));
      setconsignee_city(toTitleCase(order_data.consignee_city));
      setconsignee_pincode(order_data.consignee_pincode);
      setconsignee_add_1(toTitleCase(order_data.consignee_address_line));
      setconsignee_locality(toTitleCase(order_data.consignee_locality));
      setconsignee_add_2(toTitleCase(order_data.consignee_address_line_2));
      setlocal_delivery_type(toTitleCase(order_data.local_delivery_type));
      setasset_info_selected(toTitleCase(order_data.asset_type));
      if (order_data.asset_type === "NONE") {
        setasset_prov(false)
      }
      else {
        setasset_prov(true)
      }
      setcal_type(order_data.local_cal_type);


      setshipper_add_1(toTitleCase(order_data.shipper_address_line));
      setdestinationcity(toTitleCase(order_data.consignee_city));
      setdestinationcity_id(toTitleCase(order_data.consignee_city_id));

    } catch (error) { }
  }, []);

  useEffect(() => {
    // if (delivery_mode !== "") {
    //   setdelivery_mode_error(false);
    // }
    if (client !== "") {
      setclient_error(false);
    }
    if (billto !== "") {
      setbillto_error(false);
    }
    if (transport_mode !== "") {
      settransport_mode_error(false);
    }
    if (shipper !== "") {
      setshipper_error(false);
    }
    if (consignee !== "") {
      setconsignee_error(false);
    }
    if (commodity !== "") {
      setcommodity_error(false);
    }
    if (local_delivery_type !== "") {
      setlocal_delivery_type_error(false);
    }
    if (d_cod !== "") {
      setd_cod_error(false);
    }
  }, [
    temp_selected,
    // delivery_mode,
    client,
    transport_mode,
    shipper,
    consignee,
    commodity,
    local_delivery_type,
    d_cod,
  ]);

  useEffect(() => {
    if (asset_info_selected === "With Box") {
      let box = box_list_2.map((data) => data[0]);
      setbox(box);
    } else if (asset_info_selected === "With Logger") {
      let logger = Logger_Selected.map((data) => data[0]);
      setlogger(logger);
    }
  }, [box_list_2, Logger_Selected, Logger_list, box_list_1]);

  useEffect(() => {
    if (asset_info_selected === "With Box + With Logger") {
      let box = box_list_2.map((data) => data[0]);
      let logger = Logger_Selected.map((data) => data[0]);

      let final = box.concat(logger);
      setboth(final);
    }
  }, [
    asset_info_selected,
    Logger_Selected,
    box_list_2,
    Logger_list,
    box_list_1,
  ]);

  useEffect(() => {
    setall_shipper_details(
      shipper_state + "," + shipper_city + "," + shipper_pincode
    );
  }, [shipper_state, shipper_city, shipper_pincode]);

  useEffect(() => {
    setall_consignee_details(
      consignee_state + "," + consignee_city + "," + consignee_pincode
    );
  }, [consignee_state, consignee_city, consignee_pincode]);

  useEffect(() => {
    if (box !== [] && asset_info_selected === "With Box") {
      let item = asset_idlist.filter((p) => box.indexOf(p) === -1);
      setassetdeleted_ids(item);
      let item2 = asset_idlist.filter((p) => box.indexOf(p) !== -1);
      setassetold_ids(item2);
      let item3 = box.filter((a) => asset_idlist.indexOf(a) === -1);
      setassetnew_ids(item3);
    } else if (logger !== [] && asset_info_selected === "With Logger") {
      let item = asset_idlist.filter((p) => logger.indexOf(p) === -1);
      setassetdeleted_ids(item);
      let item2 = asset_idlist.filter((p) => logger.indexOf(p) !== -1);
      setassetold_ids(item2);
      let item3 = logger.filter((a) => asset_idlist.indexOf(a) === -1);
      setassetnew_ids(item3);
    } else {
      let item = asset_idlist.filter((p) => both.indexOf(p) === -1);
      setassetdeleted_ids(item);
      let item2 = asset_idlist.filter((p) => both.indexOf(p) !== -1);
      setassetold_ids(item2);
      let item3 = both.filter((a) => asset_idlist.indexOf(a) === -1);
      setassetnew_ids(item3);
    }
  }, [asset_idlist, box, logger, both]);

  useEffect(() => {
    if (package_id_list !== "") {
      let id_list = packages_id.filter(
        (p) => package_id_list.indexOf(p) === -1
      );
      setdeleted_packages_id(id_list);
    }
  }, [package_id_list, packages_id]);

  useLayoutEffect(() => {
    getCities("all", "all");
  }, [origincity_page, origincity_search_item]);

  useLayoutEffect(() => {
    getDes_Cities("all", "all");
  }, [destinationcity_page, destinationcity_search_item]);

  useEffect(() => {
    if (client_id && origincity_id) {
      get_client_shipper(client_id, origincity_id);
    }
  }, [client_id, origincity_id, shipper_page, shipper_search_item]);

  useEffect(() => {
    if (client_id && destinationcity_id) {
      get_client_consignee(client_id, destinationcity_id);
    }
  }, [client_id, destinationcity_id, consignee_page, consignee_search_item]);

  // useLayoutEffect(() => {
  //   if (!isupdating) {
  //     if (delivery_type === "DOMESTIC") {
  //       settransport_mode_data_list(["Air", "Surface", "Train"]);
  //     } else {
  //       settransport_mode_data_list(["Local"]);
  //     }
  //     settransport_mode("");
  //   }
  // }, [delivery_type]);

  //Cold chain
  // const [cold_chain, setcold_chain] = useState(false);
  // const [nonecold_chain, setnonecold_chain] = useState(true)
  // const [cod_list, setcod_list] = useState(["Yes", "No"]);

  // useEffect(() => {
  //   if(nonecold_chain){
  //    setcold_chain(false)
  //   }
  //  }, [nonecold_chain])

  //  useEffect(() => {
  //    if(cold_chain){
  //    setnonecold_chain(false)
  //   }
  //  }, [cold_chain])

  //  useLayoutEffect(() => {
  //   if(cold_chain){
  //     setnonecold_chain(false)
  //   }
  //   else{
  //     setnonecold_chain(true)
  //   }
  //  }, [cold_chain])

  useEffect(() => {
    if (location.state !== null) {
      if (cold_chain) {
        setcold_chain(true);
        setnonecold_chain(false);
      }
      else {
        setnonecold_chain(true);
        setcold_chain(false);
      }
    }
  }, [cold_chain]);

  useEffect(() => {
    if (cold_chain && location.state === null) {
      setcold_chain(true);
      setnonecold_chain(false);

    }
  }, [cold_chain]);

  useEffect(() => {
    if (nonecold_chain && location.state === null) {
      setnonecold_chain(true);
      setcold_chain(false);
    }
  }, [nonecold_chain]);

  // useEffect(() => {
  //   if (!location.state) {
  //     if (nonecold_chain) {
  //       setcold_chain(false);
  //     } else {
  //       setcold_chain(true);
  //     }
  //   }
  // }, [nonecold_chain,]);


  // useEffect(() => {
  //   if(delivery_type === "LOCAL"){
  //     settransport_mode("LOCAL")
  //   }
  // }, [delivery_type])

  const labelArray = ['Step 1', 'Step 2', 'Step 3']
  const [currentStep, updateCurrentStep] = useState(1);

  function updateStep(step) {
    if (step === 1) {
      setorder_active_btn("first")
    }
    else if (step === 2) {
      setorder_active_btn("second");
    }
    else {
      setorder_active_btn("third");
    }
    updateCurrentStep(step);
  }

  useEffect(() => {
    if (delivery_type === "LOCAL" && location.state === null) {
      settransport_mode("LOCAL")
    }
    else if (delivery_type === "DOMESTIC" && location.state === null) {
      settransport_mode("")
    }
  }, [delivery_type])

  useEffect(() => {
    if (!asset_prov && location.state == null) {
      setasset_info_selected("")
    }
  }, [asset_prov])

  //For Checker & Maker
  const [toggle_rejected, settoggle_rejected] = useState(false)
  const [message, setmessage] = useState("")
  const [message_error, setmessage_error] = useState(false);
  const [status_toggle, setstatus_toggle] = useState(false)
  const [cm_current_status, setcm_current_status] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true)
    setmessage_error(false)
  };

  useEffect(() => {
    settoggle_rejected(false)
  }, [])

  const update_orderstatus = (id) => {

    axios
      .put(
        ServerAddress + "booking/reject_order/" + id,
        {
          cm_current_status: "REJECTED",
          cm_remarks: toTitleCase(message).toUpperCase(),
          // transit_status: current_status,
          change_fields:{'cm_current_status': 'REJECTED'}
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
          navigate("/booking/orders");
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
      update_orderstatus(order.id)
      setShow(false)
    }
  }

  useEffect(() => {
    if (user.user_department_name + " " + user.designation_name === "CUSTOMER SERVICE EXECUTIVE" || user.user_department_name + " " + user.designation_name === "DATA ENTRY OPERATOR") {
      setcm_current_status("NOT APPROVED")
      setstatus_toggle(true)
    }
    else if (user.user_department_name + " " + user.designation_name === "OPERATION MANAGER") {
      setcm_current_status("VERIFIED OPERATION MANAGER")
      setstatus_toggle(true)
    }
    else if (user.user_department_name + " " + user.designation_name === "CUSTOMER SUPPORT MANAGER") {
      setcm_current_status("VERIFIED CUSTOMER SUPPORT MANAGER")
      setstatus_toggle(true)
    }
    else if (user.user_department_name === "ACCOUNTANT") {
      setcm_current_status("VERIFIED ACCOUNTANT")
      setstatus_toggle(true)
    }
    else if (user.user_department_name + " " + user.designation_name === "ACCOUNT MANAGER") {
      setcm_current_status("VERIFIED ACCOUNT MANAGER")
      setstatus_toggle(true)
    }
    else if (user.user_department_name === "ADMIN" || user.is_superuser) {
      setcm_current_status("APPROVED")
      setstatus_toggle(true)
    }
    else {
      setcm_current_status("NOT APPROVED")
      // setstatus_toggle(false)
    }

  }, [user, isupdating])


  return (
    <div>
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
      <Form
        onSubmit={(e) => {
          e.preventDefault();

          validation.handleSubmit(e.values);
          return false;
        }}
        encType="multipart/form-data"
      >
        {/* Booking type */}

        <div className="m-3">
          <div
            className=" mb-2 main-header"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div>{isupdating ? "Update Issue Order" : "Add Issue Order"}</div>
            {/* 
            <div>
              <Button
                type="button"
                style={{ padding: "5.8px" }}
                className="btn-rounded fluid btn btn-success"
                onClick={() => {
                  navigate("/bookings/airport_orders/add_airport_orders");
                }}
              >
                <i className="mdi mdi-plus me-1" />
                Airport Order
              </Button>
            </div> */}
            {/* {isupdating &&
              <div>
                <Button size="sm" outline color="warning" type="button" onClick={handleShow}>
                  Return
                </Button>
              </div>
            } */}
          </div>
          <Col lg={12}>
            <Card className="shadow bg-white rounded" id="doc_no">
              <CardTitle className="mb-1 header">
                <div className="header-text-icon header-text">
                  Booking Info
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
                  {/* Booking Info */}

                  <Row>
                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">Booking Through</Label>
                        <Row>
                          <Col lg={5} md={6} sm={6}>
                            <div className="form-check mb-2">
                              <input
                                className="form-check-input "
                                type="checkbox"
                                name="booking_through"
                                id="OrderTypeRadio"
                                // disabled={isupdating ? delivery_type : ""}
                                onClick={() => {
                                  setbooking_through(!booking_through);
                                }}
                                checked={booking_through}
                                readOnly={true}
                              />
                              <label
                                className="form-check-label input-box"
                                htmlFor="exampleRadios1"
                              >
                                With Eway Bill No.
                              </label>
                            </div>
                          </Col>
                          {booking_through &&
                            <Col lg={7} md={6} sm={6}>
                              <div className="">
                                <Input
                                  type="number"
                                  className="form-control-md"
                                  id="input"
                                  value={ewaybill_no}
                                  onChange={(e) =>
                                    setewaybill_no(e.target.value)
                                  }
                                  placeholder="Enter Eway Bill Number"
                                />
                              </div>
                            </Col>
                          }
                        </Row>
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">Delivery Type</Label>
                        <Row>
                          <Col lg={3} md={3} sm={3}>
                            <div className="form-check mb-2">
                              <Input
                                className="form-check-input"
                                type="radio"
                                name="delivery_type"
                                id="exampleRadios2"
                                value="LOCAL"
                                disabled={isupdating ? delivery_type : ""}
                                onClick={() => {
                                  setdelivery_type("LOCAL");
                                }}
                                checked={delivery_type === "LOCAL"}
                                readOnly={true}
                              />
                              <Label
                                className="form-check-label input-box"
                                htmlFor="exampleRadios2"
                              >
                                Local
                              </Label>
                            </div>
                          </Col>
                          <Col lg={4} md={4} sm={4}>
                            <div className="form-check mb-2">
                              <Input
                                className="form-check-input "
                                type="radio"
                                name="delivery_type"
                                id="exampleRadios1"
                                value="DOMESTIC"
                                disabled={isupdating ? delivery_type : ""}
                                onClick={() => {
                                  setdelivery_type("DOMESTIC");
                                }}
                                checked={delivery_type === "DOMESTIC"}
                                readOnly={true}
                              />

                              <Label
                                className="form-check-label input-box"
                                htmlFor="exampleRadios1"
                              >
                                Domestic
                              </Label>
                            </div>
                          </Col>

                          <Col lg={5} md={5} sm={5}>
                            <div className="form-check">
                              <Input
                                className="form-check-input"
                                type="radio"
                                name="delivery_type"
                                id="exampleRadios2"
                                value="International"
                                disabled={isupdating ? delivery_type : ""}
                                onClick={() => {
                                  setdelivery_type("International");
                                }}
                                checked={delivery_type === "International"}
                                readOnly={true}
                              />
                              <Label
                                className="form-check-label input-box"
                                htmlFor="exampleRadios2"
                              >
                                International
                              </Label>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child text-color">
                          Entry Type
                        </Label>
                        <Row>
                          <Col md={4} sm={5}>
                            <div className="form-check mb-2">
                              <Input
                                className="form-check-input"
                                type="radio"
                                name="entry_type"
                                id="exampleRadios3"
                                value="MANUALLY"
                                disabled={isupdating ? entry_type_btn : ""}
                                onClick={() => {
                                  setentry_type_btn("MANUALLY");
                                }}
                                checked={entry_type_btn === "MANUALLY"}
                                readOnly={true}
                              />
                              <Label
                                className="form-check-label input-box"
                                htmlFor="exampleRadios2"
                              >
                                Manually
                              </Label>
                            </div>
                          </Col>
                          <Col md={6} sm={7}>
                            <div className="form-check mb-2">
                              <Input
                                className="form-check-input"
                                type="radio"
                                name="entry_type"
                                id="exampleRadios4"
                                value="AUTO GENERATE"
                                disabled={isupdating ? entry_type_btn : ""}
                                onClick={() => {
                                  setentry_type_btn("AUTO GENERATE");
                                }}
                                checked={entry_type_btn === "AUTO GENERATE"}
                                readOnly={true}
                              />

                              <Label
                                className="form-check-label input-box"
                                htmlFor="exampleRadios1"
                              >
                                Auto Genrate
                              </Label>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                    {entry_type_btn === "MANUALLY" ? (
                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-2">
                          <Label className="header-child">
                            Docket Number *
                          </Label>
                          <Input
                            min={0}
                            value={docket_no_value}
                            disabled={isupdating ? docket_no_value : ""}
                            onChange={(event) => {
                              setdocket_no_value(event.target.value);
                              if (event.target.value.length !== 6) {
                                setdocket_error(true);
                              } else {
                                setdocket_error(false);
                              }
                            }}
                            // onFocus={() => {
                            //   setclicked(true);
                            // }}
                            invalid={
                              docket_no_value === "" && docket_error
                                ? true
                                : false
                            }
                            type="number"
                            label="First Name"
                            name="docket_no"
                            className="form-control-md"
                            id="input"
                            placeholder="Enter Docket Number"
                          />
                          {docket_error && (
                            <div className="mt-1 error-text" color="danger">
                              {/* <FormFeedback type="invalid"> */}
                              Docket number must be 8 digit
                              {/* </FormFeedback> */}
                            </div>
                          )}
                        </div>
                      </Col>
                    ) : null}
                    {/* Field */}
                    {entry_type_btn === "AUTO GENERATE" && isupdating ? (
                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-2">
                          <Label className="header-child">
                            Docket Number *
                          </Label>
                          <Input
                            onBlur={validation.handleBlur}
                            value={isupdating ? docket_no_value : ""}
                            type="text"
                            label="First Name"
                            // name="docket_no"
                            id="input"
                            className="form-control-md"
                            placeholder="Auto Generate"
                            disabled
                          />
                        </div>
                      </Col>
                    ) : null}
                    {(user.view_coldchain || user.is_superuser) &&
                      <Col lg={2} md={2} sm={6}>
                        <div className="mb-3">
                          <Label className="header-child">Cold Chain</Label>
                          <br />
                          <Input
                            className="form-check-input-sm"
                            type="checkbox"
                            // value="false"
                            id="defaultCheck1"
                            onClick={() => {
                              setcold_chain(!cold_chain);
                            }}
                            readOnly={true}
                            checked={cold_chain}
                            disabled={isupdating}
                          />
                        </div>
                      </Col>
                    }
                    <Col lg={(user.view_coldchain || user.is_superuser) ? 2 : 4} md={2} sm={6}>
                      <div className="mb-3">
                        <Label className="header-child">Non Cold Chain</Label>
                        <br />
                        <Input
                          className="form-check-input-sm"
                          type="checkbox"
                          // value="false"
                          id="defaultCheck1"
                          onClick={() => {
                            setnonecold_chain(!nonecold_chain);
                          }}
                          readOnly={true}
                          checked={nonecold_chain}
                          disabled={isupdating}
                        />
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-3">
                        <Label className="header-child">Type Of Booking</Label>
                        <NSearchInput
                          data_list={type_of_booking_list}
                          data_item_s={type_of_booking}
                          set_data_item_s={settype_of_booking}
                          show_search={false}
                          disable_me={isupdating}
                        />
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">
                          Booking Date & Time
                        </Label>
                        <div>
                          <input
                            type="datetime-local"
                            className="form-control d-block form-control-md "
                            id="input"
                            disabled={isupdating}
                            value={booking_date}
                            onChange={(val) => {
                              setbooking_date(val.target.value);
                            }}

                          />
                        </div>
                      </div>
                    </Col>

                    {/* <Col lg={4} md={6} sm={6}>
                      <div className="mb-3">
                        <Label className="header-child">Delivery Mode</Label>
                        <NSearchInput
                          data_list={delivery_mode_list}
                          data_item_s={delivery_mode}
                          set_data_item_s={setdelivery_mode}
                          show_search={false}
                        />
                        <div className="mt-1 error-text" color="danger">
                          {delivery_mode_error
                            ? "Delivery Mode is required"
                            : null}
                        </div>
                      </div>
                    </Col> */}

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-3">
                        <Label className="header-child">Delivery Mode</Label>
                        <NSearchInput
                          data_list={delivery_mode_list}
                          data_item_s={delivery_mode}
                          set_data_item_s={setdelivery_mode}
                          show_search={false}
                          disable_me={isupdating}
                        />
                        {/* <div className="mt-1 error-text" color="danger">
                          {delivery_mode_error
                            ? "Delivery Mode is required"
                            : null}
                        </div> */}
                      </div>
                    </Col>

                    {delivery_type !== "LOCAL" &&
                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-3">
                          <Label className="header-child">Transport Mode *</Label>
                          <NSearchInput
                            data_list={transport_mode_data_list}
                            data_item_s={transport_mode}
                            set_data_item_s={settransport_mode}
                            error_message="Select Transport Mode"
                            error_s={transport_mode_error}
                            show_search={false}
                            disable_me={isupdating}
                          />
                        </div>
                      </Col>
                    }

                    <Col lg={4} md={6} sm={6}>
                      <Label className="header-child">Bill To*</Label>
                      <SearchInput
                        data_list={billto_list}
                        setdata_list={setbillto_list}
                        data_item_s={billto}
                        set_data_item_s={setbillto}
                        set_id={setbillto_id}
                        disable_me={isupdating}
                        page={billto_page}
                        setpage={setbillto_page}
                        setsearch_item={setsearch_billto}
                        error_message={"Plesae Select Any Bill To"}
                        error_s={billto_error}
                      />
                      {/* <div className="mt-1 error-text" color="danger">
                        {billto_error ? "Please Select Client " : null}
                      </div> */}
                    </Col>
                    {billto && (
                      <Col lg={4} md={6} sm={6}>
                        <Label className="header-child">Client *</Label>
                        <SearchInput
                          data_list={client_list}
                          setdata_list={setclient_list}
                          data_item_s={client}
                          set_data_item_s={setclient}
                          // error_message="Select Client "
                          set_id={setclient_id}
                          disable_me={isupdating}
                          page={client_page}
                          setpage={setclient_page}
                          setsearch_item={setsearch_client}
                          error_message={"Plesae Select Any Client"}
                          error_s={client_error}
                        />
                        {/* <div className="mt-1 error-text" color="danger">
                          {client_error ? "Please Select Client " : null}
                        </div> */}
                      </Col>
                    )}
                    {/* <Col lg={4} md={6} sm={6}>
                      <div className="mb-3">
                        <Label className="header-child">By Ewaybill</Label>
                        <br />
                        <Input
                          className="form-check-input-sm"
                          type="checkbox"
                          // value="false"
                          id="defaultCheck1"
                          onClick={() => {
                            setewaybill(!ewaybill);
                          }}
                          readOnly={true}
                          checked={ewaybill}
                        />
                      </div>
                    </Col> */}
                  </Row>
                </CardBody>
              ) : null}
            </Card>
          </Col>
        </div>

        {/* Shipper Info*/}
        {client ? (
          <div className="m-3" id="shipper">
            <Col lg={12}>
              <Card className="shadow bg-white rounded">
                <CardTitle className="mb-1 header">
                  <div className="header-text-icon header-text">
                    Shipper Info
                    <IconContext.Provider
                      value={{
                        className: "header-add-icon",
                      }}
                    >
                      <div onClick={toggle_circle12}>
                        {circle_btn12 ? (
                          <MdRemoveCircleOutline />
                        ) : (
                          <MdAddCircleOutline />
                        )}
                      </div>
                    </IconContext.Provider>
                  </div>
                </CardTitle>
                {circle_btn12 ? (
                  <CardBody>
                    <Row>
                      <>
                        <Col lg={4} md={6} sm={6}>
                          <div className="mb-3">
                            <Label className="header-child">Origin City*</Label>
                            <SearchInput
                              data_list={origincity_list}
                              setdata_list={setorigincity}
                              data_item_s={origincity}
                              set_data_item_s={setorigincity}
                              set_id={setorigincity_id}
                              page={origincity_page}
                              setpage={setorigincity_page}
                              error_message={"Please Select Any Option"}
                              error_s={origin_city_error}
                              setsearch_item={setorigincity_search_item}
                              disable_me={isupdating}
                            />
                          </div>
                        </Col>

                        <Col lg={4} md={6} sm={6}>
                          <div className="mb-3">
                            <Label className="header-child">Shipper *</Label>
                            <SearchInput
                              data_list={shipper_list}
                              setdata_list={setshipper_list}
                              data_item_s={shipper}
                              set_data_item_s={setshipper}
                              set_id={setshipper_id}
                              page={shipper_page}
                              setpage={setshipper_page}
                              error_message={"Please Select Any Option"}
                              error_s={shipper_error}
                              search_item={shipper_search_item}
                              setsearch_item={setshipper_search_item}
                              disable_me={isupdating}
                            />
                            {/* <div className="mt-1 error-text" color="danger">
                              {shipper_error ? "Please Select Shipper" : null}
                            </div> */}
                          </div>
                        </Col>

                        {shipper_id && (
                          <>
                            <Col lg={4} md={6} sm={6}>
                              <div className="mb-2">
                                <Label className="header-child">State</Label>
                                <Input
                                  value={shipper_state}
                                  type="text"
                                  className="form-control-md"
                                  id="input"
                                  disabled
                                />
                              </div>
                            </Col>

                            <Col lg={4} md={6} sm={6}>
                              <div className="mb-2">
                                <Label className="header-child">Pincode</Label>
                                <Input
                                  value={shipper_pincode}
                                  type="text"
                                  className="form-control-md"
                                  id="input"
                                  disabled
                                />
                              </div>
                            </Col>

                            <Col lg={4} md={6} sm={6}>
                              <div className="mb-2">
                                <Label className="header-child">Locality</Label>
                                <Input
                                  value={shipper_locality}
                                  type="text"
                                  className="form-control-md"
                                  id="input"
                                  disabled
                                />
                              </div>
                            </Col>

                            <Col lg={4} md={6} sm={6}>
                              <div className="mb-2">
                                <Label className="header-child">
                                  Address Line
                                </Label>
                                <Input
                                  value={shipper_add_1}
                                  type="text"
                                  className="form-control-md"
                                  id="input"
                                  disabled
                                />
                              </div>
                            </Col>
                          </>
                        )}
                      </>
                    </Row>
                  </CardBody>
                ) : null}
              </Card>
            </Col>
          </div>
        ) : null}

        {/* Cosignee Info*/}
        {client ? (
          <div className="m-3" id="consignee">
            <Col lg={12}>
              <Card className="shadow bg-white rounded">
                <CardTitle className="mb-1 header">
                  <div className="header-text-icon header-text">
                    Consignee Info
                    <IconContext.Provider
                      value={{
                        className: "header-add-icon",
                      }}
                    >
                      <div onClick={toggle_circle1}>
                        {circle_btn1 ? (
                          <MdRemoveCircleOutline />
                        ) : (
                          <MdAddCircleOutline />
                        )}
                      </div>
                    </IconContext.Provider>
                  </div>
                </CardTitle>
                {circle_btn1 ? (
                  <CardBody>
                    <Row>
                      <>
                        <Col lg={4} md={6} sm={6}>
                          <div className="mb-3">
                            <Label className="header-child">
                              Destination City*
                            </Label>
                            <SearchInput
                              data_list={destinationcity_list}
                              setdata_list={setdestinationcity_list}
                              data_item_s={destinationcity}
                              set_data_item_s={setdestinationcity}
                              set_id={setdestinationcity_id}
                              page={destinationcity_page}
                              setpage={setdestinationcity_page}
                              error_message={"Please Select Any Option"}
                              error_s={destination_city_error}
                              search_item={destinationcity_search_item}
                              setsearch_item={setdestinationcity_search_item}
                              disable_me={isupdating}
                            />
                          </div>
                        </Col>

                        <Col lg={4} md="6" sm="6">
                          <div className="mb-3">
                            <Label className="header-child">Consignee *</Label>
                            <SearchInput
                              data_list={consignee_list}
                              setdata_list={setconsignee_list}
                              data_item_s={consignee}
                              set_data_item_s={setconsignee}
                              set_id={setconsignee_id}
                              page={consignee_page}
                              setpage={setconsignee_page}
                              error_message={"Please Select Any Option"}
                              error_s={consignee_error}
                              search_item={consignee_search_item}
                              setsearch_item={setconsignee_search_item}
                              disable_me={isupdating}
                            />
                            {/* <div className="mt-1 error-text" color="danger">
                              {consignee_error ? "Consignee is required" : null}
                            </div> */}
                          </div>
                        </Col>

                        {consignee_id && (
                          <>
                            <Col lg={4} md={6} sm={6}>
                              <div className="mb-2">
                                <Label className="header-child">State</Label>
                                <Input
                                  value={consignee_state}
                                  type="text"
                                  className="form-control-md"
                                  id="input"
                                  disabled
                                />
                              </div>
                            </Col>

                            <Col lg={4} md={6} sm={6}>
                              <div className="mb-2">
                                <Label className="header-child">Pincode</Label>
                                <Input
                                  value={consignee_pincode}
                                  type="text"
                                  className="form-control-md"
                                  id="input"
                                  disabled
                                />
                              </div>
                            </Col>

                            <Col lg={4} md={6} sm={6}>
                              <div className="mb-2">
                                <Label className="header-child">Locality</Label>
                                <Input
                                  value={consignee_locality}
                                  type="text"
                                  className="form-control-md"
                                  id="input"
                                  disabled
                                />
                              </div>
                            </Col>

                            <Col lg={4} md={6} sm={6}>
                              <div className="mb-2">
                                <Label className="header-child">
                                  Address Line
                                </Label>
                                <Input
                                  value={consignee_add_1}
                                  type="text"
                                  className="form-control-md"
                                  id="input"
                                  disabled
                                />
                              </div>
                            </Col>
                          </>
                        )}
                      </>
                    </Row>
                  </CardBody>
                ) : null}
              </Card>
            </Col>
          </div>
        ) : null}

        {/*  Cold Chain Info Started  */}
        {cold_chain && (
          <div className="m-3">
            <Col lg={12}>
              <Card className="shadow bg-white rounded">
                <CardTitle className="mb-1 header">
                  <div className="header-text-icon header-text">
                    Cold Chain Info
                    <IconContext.Provider
                      value={{
                        className: "header-add-icon",
                      }}
                    >
                      <div onClick={toggle_circle3}>
                        {circle_btn3 ? (
                          <MdRemoveCircleOutline />
                        ) : (
                          <MdAddCircleOutline />
                        )}
                      </div>
                    </IconContext.Provider>
                  </div>
                </CardTitle>
                {circle_btn3 ? (
                  <CardBody>
                    <Row>
                      <Col lg={2} md={2} sm={6}>
                        <div className="mb-3">
                          <Label className="header-child">Qil Provide Asset</Label>
                          <br />
                          <Input
                            className="form-check-input-sm"
                            type="checkbox"
                            // value="false"
                            id="defaultCheck1"
                            onClick={() => {
                              setasset_prov(!asset_prov);
                            }}
                            readOnly={true}
                            checked={asset_prov}
                            disabled={isupdating}
                          />
                        </div>
                      </Col>
                      {asset_prov &&
                        <Col lg={4} md={6} sm={6}>
                          <div className="mb-2">
                            <Label className="header-child">Asset Type *</Label>
                            <NSearchInput
                              data_list={asset_info_list}
                              data_item_s={asset_info_selected}
                              show_search={false}
                              set_data_item_s={setasset_info_selected}
                            />
                          </div>
                        </Col>
                      }
                      {asset_info_selected === "With Box" ? (
                        <>
                          <Col lg={12} md={6} sm={6}>
                            <Label className="header-child">Box No*</Label>
                            <TransferList
                              list_a={box_list_1}
                              setlist_a={setbox_list_1}
                              list_b={box_list_2}
                              setlist_b={setbox_list_2}
                              page={box_list_page}
                              setpage={setbox_list_page}
                              setsearch_item={setsearch_logger}
                            // setlist_id={}
                            />
                          </Col>
                        </>
                      ) : null}

                      {asset_info_selected === "With Logger" ? (
                        <>
                          <Col lg={12} md={6} sm={6}>
                            <Label className="header-child">Logger No *</Label>
                            <TransferList
                              list_a={Logger_list}
                              setlist_a={setLogger_list}
                              list_b={Logger_Selected}
                              setlist_b={setLogger_Selected}
                              page={Logger_page}
                              setpage={setLogger_page}
                              setsearch_item={setsearch_logger}
                            // setlist_id={}
                            />
                          </Col>
                        </>
                      ) : null}

                      {asset_info_selected === "With Box + With Logger" ? (
                        <>
                          <Col lg={6} md={6} sm={6}></Col>
                          <Col lg={6} md={6} sm={12}>
                            <div style={{ width: "" }}>
                              <Label className="header-child">
                                Logger No *
                              </Label>
                              <TransferList
                                list_a={Logger_list}
                                setlist_a={setLogger_list}
                                list_b={Logger_Selected}
                                setlist_b={setLogger_Selected}
                                page={Logger_page}
                                setpage={setLogger_page}
                                setsearch_item={setsearch_logger}
                                width={"width"}
                              // setlist_id={}
                              />
                            </div>
                          </Col>

                          <Col lg={6} md={6} sm={12}>
                            <div style={{ width: "", marginLeft: "" }}>
                              <Label className="header-child">Box No. *</Label>
                              <TransferList
                                list_a={box_list_1}
                                setlist_a={setbox_list_1}
                                list_b={box_list_2}
                                setlist_b={setbox_list_2}
                                width={"width"}
                                page={box_list_page}
                                setpage={setbox_list_page}
                                setsearch_item={setsearch_logger}
                              // setlist_id={}
                              />
                            </div>
                          </Col>
                        </>
                      ) : null}
                    </Row>
                  </CardBody>
                ) : null}
              </Card>
            </Col>
          </div>
        )}

        {/* Eway Bill  */}
        {/* {ewaybill && (
          <div className="m-3">
            <Col lg={12}>
              <Card className="shadow bg-white rounded">
                <CardTitle className="mb-1 header">
                  <div className="header-text-icon header-text">
                    Eway Bill Info
                    <IconContext.Provider
                      value={{
                        className: "header-add-icon",
                      }}
                    >
                      <div onClick={toggle_circle3}>
                        {circle_btn3 ? (
                          <MdRemoveCircleOutline />
                        ) : (
                          <MdAddCircleOutline />
                        )}
                      </div>
                    </IconContext.Provider>
                  </div>
                </CardTitle>
                {circle_btn3 ? (
                  <CardBody>
                    <Row>
                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-2">
                          <Label className="header-child">Ewaybill No *</Label>
                          <Input
                            onBlur={validation.handleBlur}
                            value={validation.values.ewaybill_no}
                            type="text"
                            label="First Name"
                            // name="docket_no"
                            id="input"
                            className="form-control-md"
                            placeholder="Enter Ewaybill No"
                           
                          />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                ) : null}
              </Card>
            </Col>
          </div>
        )} */}

        {/* Tariff Info */}
        <div className="m-3">
          <Col lg={12}>
            <Card className="shadow bg-white rounded">
              <CardTitle className="mb-1 header">
                <div className="header-text-icon header-text">
                  Tariff Info
                  <IconContext.Provider
                    value={{
                      className: "header-add-icon",
                    }}
                  >
                    <div onClick={toggle_circle3}>
                      {circle_btn3 ? (
                        <MdRemoveCircleOutline />
                      ) : (
                        <MdAddCircleOutline />
                      )}
                    </div>
                  </IconContext.Provider>
                </div>
              </CardTitle>
              {circle_btn3 ? (
                <CardBody>
                  <Row>
                    <Col lg={4} md={6} sm={6}>
                      <Label className="header-child">Commodity *</Label>
                      <SearchInput
                        data_list={client_commidities_list}
                        setdata_list={setclient_commidities_list}
                        data_item_s={commodity}
                        set_data_item_s={setcommodity}
                        set_id={setcommodity_id}
                        page={page}
                        setpage={setpage}
                        setsearch_item={setsearch_commodity}
                        error_message={"Please Select Any Commodity"}
                        error_s={commodity_error}
                        disable_me={isupdating}
                      />
                      {/* {commodity_error ? (
                        <div className="mt-1 error-text" color="danger">
                          Please Select Any Commodity
                        </div>
                      ) : null} */}
                    </Col>

                    {delivery_type === "LOCAL" ? (
                      <Col lg={4} md={6} sm={6}>
                        <Label className="header-child">
                          Local Delivery Type *{" "}
                        </Label>
                        <NSearchInput
                          data_list={local_delivery_type_list}
                          data_item_s={local_delivery_type}
                          set_data_item_s={setlocal_delivery_type}
                          error_message={"Select local delivery type"}
                          show_search={false}
                          error_s={local_delivery_type_error}
                        />
                      </Col>
                    ) : null}

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-3">
                        <Label className="header-child">COD *</Label>
                        <NSearchInput
                          data_list={cod_list}
                          data_item_s={d_cod}
                          set_data_item_s={setd_cod}
                          show_search={false}
                          error_message={"Select any option"}
                          error_s={d_cod_error}
                        />
                        {/* <div className="mt-1 error-text" color="danger">
                          {d_cod_error ? "Select COD Type" : null}
                        </div> */}
                      </div>
                    </Col>

                    {d_cod === "Yes" ? (
                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-3">
                          <Label className="header-child">
                            Transportation cost
                          </Label>
                          <Input
                            min={0}
                            onChange={(val) => {
                              settransportation_cost(val.target.value);
                              if (val.target.value !== "") {
                                settransportation_cost_err(false);
                              }
                            }}
                            onBlur={() => {
                              if (transportation_cost === "") {
                                settransportation_cost_err(true);
                              }
                            }}
                            value={transportation_cost}
                            type="number"
                            name="transportation_cost"
                            className="form-control-md"
                            id="input"
                            placeholder="Enter Transportation cost"
                          />
                        </div>

                        {transportation_cost_err && (
                          <div
                            style={{
                              color: "red",
                              marginTop: -15,
                              fontSize: 12,
                            }}
                          >
                            Please Add Transportation Cost
                          </div>
                        )}
                      </Col>
                    ) : null}
                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">Total Quantity *</Label>
                        <Input
                          min={0}
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.total_quantity || ""}
                          invalid={
                            validation.touched.total_quantity &&
                              validation.errors.total_quantity
                              ? true
                              : false
                          }
                          type="number"
                          name="total_quantity"
                          className="form-control-md"
                          id="input"
                          placeholder="Enter Total Quantity"
                        />
                        {validation.touched.total_quantity &&
                          validation.errors.total_quantity ? (
                          <FormFeedback type="invalid">
                            {validation.errors.total_quantity}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">Actual Weight</Label>
                        <Input
                          min={0}
                          onChange={(e) => setactual_weigth(e.target.value)}
                          value={actual_weigth}
                          type="number"
                          name="actual_weight"
                          className="form-control-md"
                          id="input"
                          placeholder="Enter Actual Weight"
                        />
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">
                          Chargeable Weight
                        </Label>
                        <Input
                          disabled
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.chargeable_weight || ""}
                          type="number"
                          lname="chargeable_weight"
                          className="form-control-md"
                          id="input"
                          placeholder="Enter Chargeable Weight"
                        />
                      </div>
                    </Col>

                    <Col lg={12}>
                      <div className="mb-2">
                        <Label className="header-child">Remarks</Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.remarks || ""}
                          type="Text"
                          name="remarks"
                          className="form-control-md"
                          id="input"
                          placeholder="Enter Remarks"
                        />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              ) : null}
            </Card>
          </Col>
        </div>

        {/*Status Info */}
        {isupdating ? (
          <div className="m-3">
            <Col lg={12}>
              <Card className="shadow bg-white rounded" id="status_info">
                <CardTitle className="mb-1 header">
                  <div className="header-text-icon header-text">
                    Status Info
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      {
                        // current_status !== "Shipment Arrived at Hub" &&
                        current_status !== "Shipment In Transit" &&
                        current_status !==
                        "Shipment Arrived at Destination Hub" &&
                        current_status !== "Shipment Delivered" &&
                        user.is_superuser && (
                          <span>
                            <Button
                              type="button"
                              className="btn btn-info mx-1 cu_btn "
                              onClick={() => {
                                navigate("/booking/orders/adddocketstatus", {
                                  state: { order: order, type: "add" },
                                });
                              }}
                            >
                              Add Status
                            </Button>
                          </span>
                        )
                      }

                      <IconContext.Provider
                        value={{
                          className: "header-add-icon",
                        }}
                      >
                        <div onClick={toggle_circle_a}>
                          {circle_btn_a ? (
                            <MdRemoveCircleOutline />
                          ) : (
                            <MdAddCircleOutline />
                          )}
                        </div>
                      </IconContext.Provider>
                    </div>
                  </div>
                </CardTitle>
                {circle_btn_a ? (
                  <>
                    <div
                      style={{
                        maxHeight: "351px",
                        // maxHeight: "70px",
                        overflowY: "scroll",
                      }}
                    >
                      <DataList
                        Data_Title={StatusInfoDataTitle}
                        Data_Format={StatusInfoDataFormat}
                        order_id={order.docket_no}
                        checkbox={"NO"}
                      />
                    </div>
                  </>
                ) : null}
              </Card>
            </Col>
          </div>
        ) : null}

        {/* Packages */}
        <div className="m-3">
          <Col lg={12}>
            <Card className="shadow bg-white rounded">
              <CardTitle className="mb-1 ">
                <div className="btn-header">
                  <div className="btn-subheader">
                    <div
                      id="packages"
                      value="first"
                      style={{
                        background:
                          order_active_btn === "first" ? "#C4D7FE" : null,
                      }}
                      className="btn1 footer-text"
                      onClick={() => {
                        setorder_active_btn("first");
                        updateCurrentStep(1);
                      }}
                    >
                      Packages
                    </div>
                    <div
                      id="images"
                      value="second"
                      style={{
                        background:
                          order_active_btn === "second" ? "#C4D7FE" : null,
                      }}
                      className="btn2 footer-text"
                      onClick={() => {
                        setorder_active_btn("second");
                        updateCurrentStep(2);
                      }}
                    >
                      Order Images
                    </div>
                    <div
                      style={{
                        background:
                          order_active_btn === "third" ? "#C4D7FE" : null,
                      }}
                      className="btn3 footer-text"
                      onClick={() => {
                        setorder_active_btn("third");
                        updateCurrentStep(3);
                      }}
                    >
                      Invoices
                    </div>
                    {cold_chain &&
                      <div
                        style={{
                          background:
                            order_active_btn === "forth" ? "#C4D7FE" : null,
                        }}
                        className="btn3 footer-text"
                        onClick={() => {
                          setorder_active_btn("forth");
                          // updateCurrentStep(3);
                        }}
                      >
                        Logger Report
                      </div>
                    }
                    {validation.values.total_quantity > 0 &&
                      <div
                        style={{
                          background:
                            order_active_btn === "fifth" ? "#C4D7FE" : null,
                        }}
                        className="btn3 footer-text"
                        onClick={() => {
                          setorder_active_btn("fifth");
                          // updateCurrentStep(3);
                        }}
                      >
                        Box Barcode
                      </div>
                    }
                  </div>
                  <div className="btn-icon">
                    <IconContext.Provider
                      value={{
                        className: "header-add-icon",
                      }}
                    >
                      <div onClick={toggle_circle4}>
                        {circle_btn4 ? (
                          <MdRemoveCircleOutline />
                        ) : (
                          <MdAddCircleOutline />
                        )}
                      </div>
                    </IconContext.Provider>
                  </div>
                </div>
              </CardTitle>

              {circle_btn4 ? (
                <CardBody>
                  {order_active_btn === "first" ? (
                    <>
                      <Row className="hide">
                        <Col md={3} sm={3}>
                          <div className="mb-3">
                            <Label className="header-child">Length</Label>
                            {row.map((item, index) => {
                              return (
                                <Input
                                  min={0}
                                  key={index}
                                  value={item[0]}
                                  type="number"
                                  className="form-control-md"
                                  id="input"
                                  style={{ marginBottom: "15px" }}
                                  placeholder="Enter Packages Length "
                                  onChange={(val) => {
                                    setlength(val.target.value);
                                    item[0] = val.target.value;
                                  }}
                                  onFocus={() => {
                                    setclicked(true);
                                  }}
                                />
                              );
                            })}
                          </div>
                        </Col>
                        <Col md={3} sm={3}>
                          <div className="mb-3">
                            <Label className="header-child">Breadth</Label>
                            {row.map((item, index) => (
                              <Input
                                min={0}
                                key={index}
                                value={item[1]}
                                type="number"
                                className="form-control-md"
                                id="input"
                                style={{ marginBottom: "15px" }}
                                placeholder="Enter Packages Breadth"
                                onChange={(val) => {
                                  setbreadth(val.target.value);
                                  item[1] = val.target.value;
                                }}
                              />
                            ))}
                          </div>
                        </Col>
                        <Col md={3} sm={3}>
                          <div className="mb-3">
                            <Label className="header-child">Height</Label>
                            {row.map((item, index) => (
                              <Input
                                min={0}
                                key={index}
                                value={item[2]}
                                type="number"
                                className="form-control-md d"
                                id="input"
                                style={{ marginBottom: "15px" }}
                                placeholder="Enter Packages Height"
                                onChange={(val) => {
                                  setheight(val.target.value);
                                  item[2] = val.target.value;
                                }}
                              />
                            ))}
                          </div>
                        </Col>
                        <Col md={row.length > 1 ? 2 : 3} sm={3}>
                          <div className="mb-3">
                            <Label className="header-child">No of Pieces</Label>
                            {row.map((item, index) => (
                              <Input
                                min={0}
                                key={index}
                                // value={item[3] + pieces}
                                value={item[3]}
                                type="number"
                                className="form-control-md"
                                id="input"
                                style={{ marginBottom: "15px" }}
                                placeholder="Enter No of Pieces"
                                onChange={(val) => {
                                  setpieces(val.target.value);
                                  item[3] = val.target.value;
                                }}
                              />
                            ))}
                          </div>
                        </Col>

                        <Col lg={1}>
                          <div className="mb-3" style={{ textAlign: "center" }}>
                            {row.length > 1 ? (
                              <Label className="header-child">Delete</Label>
                            ) : null}
                            {row.map((item, index) => (
                              <IconContext.Provider
                                key={index}
                                value={{
                                  className: "icon multi-input",
                                }}
                              >
                                {row.length > 1 ? (
                                  <>
                                    <div style={{ height: "14.5px" }}></div>
                                    <div
                                      onClick={() => {
                                        deletePackage(item);
                                      }}
                                    >
                                      <MdDeleteForever
                                        style={{
                                          justifyContent: "center",
                                          cursor: "pointer",
                                        }}
                                      />
                                    </div>
                                  </>
                                ) : null}
                              </IconContext.Provider>
                            ))}
                          </div>
                        </Col>
                      </Row>

                      {row.length < 20 && (
                        <div>
                          <span
                            className="link-text"
                            onClick={() => {
                              if (length && breadth && height && pieces) {
                                addPackage();
                              } else {
                                alert("Packages is required");
                              }
                            }}
                          >
                            <IconContext.Provider
                              value={{
                                className: "link-text",
                              }}
                            >
                              <MdAdd />
                            </IconContext.Provider>
                            Add Another Packages
                          </span>
                        </div>
                      )}
                    </>
                  ) : (
                    ""
                  )}
                  {order_active_btn === "second" ? (
                    <Row className="hide">
                      <Col md={5} sm={5}>
                        <div className="mb-3">
                          <Label className="header-child">Image</Label>
                          {/* {row1.map((item1, index1) => (
                            <Input
                              style={{ marginBottom: "15px" }}
                              key={index1}
                              className="form-control-md"
                              type="file"
                              id="input"
                              onClick={(event) => {
                                // setshowModalOrder(true)
                                setSelectedFile(event.target.files[0]);
                                item1[0] = event.target.files;
                              }}
                            />
                          ))} */}
                          {row1[row.length - 1][0] !== ""
                            ? row1
                              .filter((e) => e[0] !== "")
                              .map((item1, index1) => {
                                // console.log("item!1111111111111111111111111111111111",item1)
                                return (
                                  <div style={{ width: "100%" }} key={index1}>
                                    <img
                                      src={item1[0]}
                                      alt="item1[0]"
                                      style={{
                                        height: "110px",
                                        width: "110px",
                                        borderRadius: "10px",
                                        padding: 20,
                                      }}
                                      onClick={() => {
                                        // setshowModalOrder({
                                        //   ...showModalOrder,
                                        //   value: true,
                                        //   ind: index1,
                                        // });
                                      }}
                                    />
                                  </div>
                                );
                              })
                            : null}
                          {row1[row1.length - 1][0] === "" ? (
                            <div style={{ height: "110px", paddingTop: 35 }}>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  border: "0.5px solid #dad7d7",
                                  alignItems: "center",
                                  height: "38px",
                                  borderRadius: 5,
                                  // height: 31,
                                }}
                                onClick={() => {
                                  setshowModalOrder({
                                    ...showModalOrder,
                                    value: true,
                                  });
                                }}
                              >
                                <a style={{ marginLeft: "3px", fontSize: 11 }}>
                                  Chooose File
                                </a>
                                <div
                                  style={{
                                    fontSize: "25px",
                                    color: "#dad7d7",
                                    marginLeft: "5px",
                                  }}
                                >
                                  |
                                </div>
                                {selectedFile === "" ? (
                                  <a style={{ fontSize: 11 }}>
                                    Image Not Uploaded
                                  </a>
                                ) : (
                                  <a style={{ fontSize: 11 }}>Image Uploaded</a>
                                )}
                              </div>
                            </div>
                          ) : null}
                        </div>
                      </Col>
                      <Col md={5} sm={5}>
                        <div className="mb-3">
                          <Label className="header-child">Caption</Label>
                          {row1.map((item1, index1) => (
                            <div
                              style={{ height: "110px", paddingTop: 35 }}
                              key={index1}
                            >

                              {console.log("222222222222222222222222", item1)}
                              <select
                                disabled={item1[2] ? true : false}
                                style={{
                                  marginBottom: "15px",
                                  boxShadow: "none",
                                }}
                                className="form-select"
                                placeholder="Select status"
                                id="input"
                                value={item1[1]}
                                onChange={(val) => {
                                  setcaption1(val.target.value);
                                  item1[1] = val.target.value;
                                  row3[index1][1] = val.target.value;
                                }}
                                defaultValue="Select status"
                              >
                                <option value={item1[1]} disabled selected>
                                  {item1[1] ? item1[1] : "Select Value"}
                                </option>
                                <option>Parcel Image</option>
                                <option>eWaybill Image</option>
                                <option>Order Image</option>
                                <option>Weight Image</option>
                              </select>
                            </div>
                          ))}
                        </div>
                      </Col>
                      {/* <Col md={1} sm={5}>
                        <Button title="Add" style={{ backgroundColor: "blue", marginTop: 25, maxHeight: 32, alignItems: 'center', justifyContent: 'center' }}>Add</Button>
                      </Col> */}
                      {showModalOrder.value ? (
                        <Main_c
                          modal={showModalOrder.value}
                          modal_set={() => {
                            setshowModalOrder({
                              ...showModalOrder,
                              value: false,
                            });
                          }}
                          upload_image={(val) => {
                            setdocumentOrder(val);
                            if (showModalOrder.ind !== "") {
                              row3[showModalOrder.ind][0] = val;
                              setshowModalOrder({
                                ...showModalOrder,
                                value: false,
                                ind: "",
                              });
                            } else {
                              row3[row3.length - 1][0] = val;
                            }
                          }}
                          result_image={(val) => {
                            setSelectedFile(val);
                            if (showModalOrder.ind !== "") {
                              row1[showModalOrder.ind][0] = val;
                            } else {
                              row1[row1.length - 1][0] = val;
                            }
                            // setdoc_result_image([...doc_result_image, val])
                          }}
                        />
                      ) : null}
                      <Col md={1}>
                        <div className="mb-3" style={{ textAlign: "center" }}>
                          {row1.length > 1 ? (
                            <Label className="header-child">Delete</Label>
                          ) : null}
                          {row1.map((item1, index1) => (
                            <div
                              style={{ height: "110px", paddingTop: 35 }}
                              key={index1}
                            >
                              <IconContext.Provider
                                value={{
                                  className: "icon multi-input",
                                }}
                              >
                                {row1.length > 1 ? (
                                  <>
                                    <div
                                      onClick={() => {
                                        if (item1[2]) {
                                          deleteOrderImg(item1)
                                          console.log("11111111111111", item1[2])
                                        } else {
                                          deleteimage(item1)
                                          setSelectedFile(
                                            row1[row1.length - 1][0]
                                          );
                                          setcaption1(row1[row1.length - 1][1]);
                                        }
                                      }}
                                    >
                                      <MdDeleteForever
                                        color="red"
                                        size={26}
                                        style={{
                                          alignItems: "center",
                                          background: "",
                                        }}
                                      />
                                    </div>
                                  </>
                                ) : null}
                              </IconContext.Provider>
                            </div>
                          ))}
                        </div>
                      </Col>

                      <div>
                        <span
                          className="link-text"
                          onClick={() => {
                            if (row1[row1.length - 1][0] && row1[row1.length - 1][1]) {
                              setshowModalOrder({
                                ...showModalOrder,
                                value: false,
                                ind: "",
                              });
                              addorderimage();
                            } else {
                              alert("Order images is required");
                            }
                          }}
                        >
                          <IconContext.Provider
                            value={{
                              className: "icon",
                            }}
                          >
                            <MdAdd />
                          </IconContext.Provider>
                          Add Another Order Images
                        </span>
                      </div>
                    </Row>
                  ) : (
                    ""
                  )}
                  {order_active_btn === "third" ? (
                    <Row>
                      {showModalInvoice.value ? (
                        <Main_c
                          modal={showModalInvoice.value}
                          modal_set={() => {
                            setshowModalInvoice({
                              ...showModalInvoice,
                              value: false,
                            });
                          }}
                          upload_image={(val) => {
                            if (showModalInvoice.ind !== "") {
                              row4[showModalInvoice.ind][0] = val;
                              setshowModalInvoice({
                                ...showModalInvoice,
                                value: false,
                                ind: "",
                              });
                            } else {
                              row4[row4.length - 1][0] = val;
                            }
                          }}
                          result_image={(val) => {
                            if (showModalInvoice.ind !== "") {
                              row2[showModalInvoice.ind][0] = val;
                            } else {
                              row2[row2.length - 1][0] = val;
                              setinvoice_img(val);
                            }
                          }}
                        />
                      ) : null}
                      <Col md={3}>
                        <div className="mb-3">
                          <Label className="header-child">Invoice Images</Label>
                          {/* {row2.map((item2, index2) => (
                            <Input
                              style={{ marginBottom: "15px" }}
                              key={index2}
                              className="form-control-md"
                              type="file"
                              id="input"
                              onChange={(event) => {
                                setinvoice_img(event.target.files[0]);

                                item2[0] = event.target.files;
                              }}
                            />
                          ))} */}
                          {row2[row.length - 1][0] !== ""
                            ? row2
                              .filter((e) => e[0] !== "")
                              .map((item1, index1) => {
                                return (
                                  <div style={{ width: "100%" }} key={index1}>
                                    <img
                                      src={item1[0]}
                                      alt="item1[0]"
                                      style={{
                                        height: "110px",
                                        width: "110px",
                                        borderRadius: "10px",
                                        padding: 20,
                                      }}
                                      onClick={() => {
                                        setshowModalInvoice({
                                          ...showModalInvoice,
                                          value: true,
                                          ind: index1,
                                        });
                                      }}
                                    />
                                  </div>
                                );
                              })
                            : null}
                          {row2[row2.length - 1][0] === "" ? (
                            <div style={{ height: "110px", paddingTop: 35 }}>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  border: "0.5px solid #dad7d7",
                                  alignItems: "center",
                                  height: "38px",
                                  borderRadius: 5,
                                  // height: 31,
                                }}
                                onClick={() => {
                                  setshowModalInvoice({
                                    ...showModalInvoice,
                                    value: true,
                                  });
                                }}
                              >
                                <a style={{ marginLeft: "3px", fontSize: 11 }}>
                                  Chooose File
                                </a>
                                <div
                                  style={{
                                    fontSize: "25px",
                                    color: "#dad7d7",
                                    marginLeft: "5px",
                                  }}
                                >
                                  |
                                </div>
                                {invoice_img === "" ? (
                                  <a style={{ fontSize: 11 }}>
                                    Image Not Uploaded
                                  </a>
                                ) : (
                                  <a style={{ fontSize: 11 }}>Image Uploaded</a>
                                )}
                              </div>
                            </div>
                          ) : null}
                        </div>
                      </Col>
                      <Col md={3} sm={3}>
                        <div className="mb-3">
                          <Label className="header-child">Invoices Date</Label>
                          {row2.map((item2, index2) => (
                            <div
                              key={index2}
                              style={{ height: "110px", paddingTop: 35 }}
                            >
                              <input
                                style={{ marginBottom: "15px" }}
                                type="date"
                                className="form-control d-block form-control-md"
                                id="input"
                                value={row2[index2][1]}
                                onChange={(event) => {
                                  settoday(event.target.value[1]);
                                  item2[1] = event.target.value;
                                  row4[index2][1] = event.target.value;
                                }}
                              />
                            </div>
                          ))}
                        </div>
                      </Col>
                      <Col md={3} sm={3}>
                        <div className="mb-3">
                          <Label className="header-child">Invoice Number</Label>
                          {row2.map((item2, index2) => (
                            <div
                              style={{ height: "110px", paddingTop: 35 }}
                              key={index2}
                            >
                              <Input
                                min={0}
                                key={index2}
                                value={item2[2]}
                                type="number"
                                className="form-control-md"
                                id="input"
                                style={{ marginBottom: "15px" }}
                                placeholder="Enter Invoice No"
                                onChange={(val) => {
                                  setinvoice_no(val.target.value);
                                  item2[2] = val.target.value;
                                  row4[index2][2] = val.target.value;
                                }}
                              />
                            </div>
                          ))}
                        </div>
                      </Col>
                      <Col md={row2.length > 1 ? 2 : 3} sm={4}>
                        <div className="mb-3">
                          <Label className="header-child">Invoice Amount</Label>
                          {row2.map((item2, index2) => (
                            <div
                              style={{ height: "110px", paddingTop: 35 }}
                              key={index2}
                            >
                              <Input
                                min={0}
                                key={index2}
                                value={item2[3]}
                                type="number"
                                className="form-control-md"
                                id="input"
                                style={{ marginBottom: "15px" }}
                                placeholder="Enter Amount"
                                onChange={(val) => {
                                  setinvoice_value(val.target.value);
                                  item2[3] = val.target.value;
                                  row4[index2][3] = val.target.value;
                                }}
                              />
                            </div>
                          ))}
                        </div>
                      </Col>
                      <Col md={1}>
                        <div className="mb-3" style={{ textAlign: "center" }}>
                          {row2.length > 1 ? (
                            <Label className="header-child">Delete</Label>
                          ) : null}
                          {row2.map((item2, index2) => (
                            <div
                              style={{ height: "110px", paddingTop: 35 }}
                              key={index2}
                            >
                              <IconContext.Provider
                                key={index2}
                                value={{
                                  className: "icon multi-input",
                                }}
                              >
                                {row2.length > 1 ? (
                                  <>
                                    <div
                                      onClick={() => {
                                        if (item2[4]) {
                                          console.log("item2aaaaaaaaaaaaa", item2[4])
                                          deleteInvoiceImg(item2)
                                        } else {
                                          deleteinvoice(item2);
                                          setinvoice_img(
                                            row2[row2.length - 1][0]
                                          );
                                          settoday(row2[row2.length - 1][1]);
                                          setinvoice_no(
                                            row2[row2.length - 1][2]
                                          );
                                          setinvoice_value(
                                            row2[row2.length - 1][3]
                                          );
                                        }

                                      }}
                                    >
                                      <MdDeleteForever
                                        color="red"
                                        size={27}
                                        style={{
                                          alignItems: "center",
                                          background: "",
                                        }}
                                      />
                                    </div>
                                  </>
                                ) : null}
                              </IconContext.Provider>
                            </div>
                          ))}
                        </div>
                      </Col>
                      <div>
                        <span
                          className="link-text"
                          onClick={() => {
                            if (
                              row2[row2.length - 1][0] !== "" &&
                              row2[row2.length - 1][1] !== "" &&
                              row2[row2.length - 1][2] !== "" &&
                              row2[row2.length - 1][3] !== ""
                            ) {
                              setshowModalInvoice({
                                ...showModalInvoice,
                                value: false,
                                ind: "",
                              });
                              addinvoice();
                            } else {
                              alert("Invoice is required");
                            }
                          }}
                        >
                          <IconContext.Provider
                            value={{
                              className: "icon",
                            }}
                          >
                            <MdAdd />
                          </IconContext.Provider>
                          Add Another Invoices
                        </span>
                      </div>
                    </Row>
                  ) : (
                    ""
                  )}
                  {order_active_btn === "forth" && cold_chain ? (
                    <>
                      <Row className="hide">

                        <Col lg={3} md={3} sm={3}>
                          <div className="mb-3">
                            <Label className="header-child">Upload Report</Label>
                            {row5.map((item, index) => {
                              console.log("row5---log----", row5)
                              return (
                                <Input
                                  min={0}
                                  key={index}
                                  // value={item[0]}
                                  type="file"
                                  className="form-control-md"
                                  id="input"
                                  style={{ marginBottom: "15px" }}
                                  placeholder="Enter Packages Length "
                                  onChange={(val) => {
                                    setlogger_pdf(val.target.files[0]);
                                    item[0] = val.target.files;
                                  }}
                                  onFocus={() => {
                                    setclicked(true);
                                  }}
                                />
                              );
                            })}
                          </div>
                        </Col>

                        <Col lg={4} md={3} sm={3}>
                          <div className="mb-3">
                            <Label className="header-child">Details</Label>
                            {row5.map((item, index) => {
                              return (
                                <div style={{ height: "50px" }}>{item[1]}</div>
                              );
                            })}
                          </div>
                        </Col>

                        <Col lg={1}>
                          <div className="mb-3" style={{ textAlign: "center" }}>
                            {row5.length > 1 ? (
                              <Label className="header-child">Delete</Label>
                            ) : null}
                            {row5.map((item, index) => (
                              <IconContext.Provider
                                key={index}
                                value={{
                                  className: "icon multi-input",
                                }}
                              >
                                {row5.length > 1 ? (
                                  <>
                                    <div style={{ height: "14px" }}></div>
                                    <div
                                      onClick={() => {
                                        deleteLogger(item);
                                      }}
                                    >
                                      <MdDeleteForever
                                        style={{
                                          justifyContent: "center",
                                          cursor: "pointer",
                                        }}
                                      />
                                    </div>
                                  </>
                                ) : null}
                              </IconContext.Provider>
                            ))}
                          </div>
                        </Col>
                      </Row>

                      {row.length < 20 && (
                        <div>
                          <span
                            className="link-text"
                            onClick={() => {
                              if (logger_pdf) {
                                addLogger();
                              } else {
                                alert("Logger Report is required");
                              }
                            }}
                          >
                            <IconContext.Provider
                              value={{
                                className: "link-text",
                              }}
                            >
                              <MdAdd />
                            </IconContext.Provider>
                            Add Another Report
                          </span>
                        </div>
                      )}
                    </>
                  ) : (
                    ""
                  )}

                  {order_active_btn === "fifth" && validation.values.total_quantity > 0 &&
                    <>
                      <Row className="hide">

                        <Col lg={4} md={6} sm={6}>
                          <div className="mb-2">
                            <Label className="header-child">Enter Value*</Label>
                            {row6.map((item, index) => {
                              console.log("item-------", item)
                              return (
                                <Input
                                  min={0}
                                  key={index}
                                  value={item[0]}
                                  type="text"
                                  className="form-control-md"
                                  id="input"
                                  style={{ marginBottom: "15px" }}
                                  placeholder="Enter Value"
                                  onChange={(val) => {
                                    setbox_bq(val.target.value);
                                    item[0] = val.target.value;
                                  }}
                                />
                              );
                            })}
                          </div>
                        </Col>
                      </Row>
                    </>
                  }
                </CardBody>
              ) : null}
            </Card>
          </Col>
        </div>


{/* //Docket Issue */}
<div className="m-3">
          <Col lg={12}>
            <Card className="shadow bg-white rounded">
              <CardTitle className="mb-1 header">
                <div className="header-text-icon header-text">
                   Docket Issue
                  <IconContext.Provider
                    value={{
                      className: "header-add-icon",
                    }}
                  >
                    <div onClick={toggle_circle3}>
                      {circle_btn3 ? (
                        <MdRemoveCircleOutline />
                      ) : (
                        <MdAddCircleOutline />
                      )}
                    </div>
                  </IconContext.Provider>
                </div>
              </CardTitle>
              {circle_btn3 ? (
                <CardBody>
                  <Row>

                    <Col lg={4} md={6} sm={6}>
                    <Label>Manifest No</Label>
                    <Input
                     className="form-control-md"
                     id="input"
                   value={order.manifest_no} 
                    />
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <Label className="header-child">Issue Type</Label>
                      <Input
                       className="form-control-md"
                       id="input"
                      value={order.issue_type}
                      />
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-3">
                        <Label className="header-child">Issue Created By *</Label>
                        <Input 
                         className="form-control-md"
                         id="input"
                        value={order.issue_raised_by}
                        />
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">Issue Created At *</Label>
                        <Input
                          className="form-control-md"
                          id="input"
                          value={order.issue_raised_at}
                        />
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <Label className="header-child">Issue Resolved </Label>
                      <Row>
                          <Col lg={3} md={3} sm={3}>
                            <div className="form-check mb-2">
                              <Input
                                className="form-check-input"
                                type="radio"
                                // name="delivery_type"
                                id="exampleRadios2"
                                // value="LOCAL"
                                // disabled={isupdating ? delivery_type : ""}
                                // onClick={() => {
                                //   setdelivery_type("LOCAL");
                                // }}
                                // checked={delivery_type === "LOCAL"}
                                // readOnly={true}
                              />
                              <Label
                                className="form-check-label input-box"
                                htmlFor="exampleRadios2"
                              >
                                Yes
                              </Label>
                            </div>
                          </Col>
                          <Col lg={4} md={4} sm={4}>
                            <div className="form-check mb-2">
                              <Input
                                className="form-check-input "
                                type="radio"
                                // name="delivery_type"
                                id="exampleRadios1"
                                // value="DOMESTIC"
                                // disabled={isupdating ? delivery_type : ""}
                                // onClick={() => {
                                //   setdelivery_type("DOMESTIC");
                                // }}
                                // checked={delivery_type === "DOMESTIC"}
                                // readOnly={true}
                              />

                              <Label
                                className="form-check-label input-box"
                                htmlFor="exampleRadios1"
                              >
                                No
                              </Label>
                            </div>
                          </Col>
                        </Row>
                    </Col>

                    <Col lg={12}>
                      <div className="mb-2">
                        <Label className="header-child">Remarks*</Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.remarks || ""}
                          type="Text"
                          name="remarks"
                          className="form-control-md"
                          id="input"
                          placeholder="Enter Remarks"
                        />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              ) : null}
            </Card>
          </Col>
        </div>
        {/* Footer Btn*/}

        <div className="page-control m-3">
          <Col lg={12}>
            <div className="mb-1 footer_btn">
              {currentStep !== 1 &&
                <Button
                  type="button"
                  className="btn btn-info m-1 cu_btn"
                  disabled={currentStep === 1}
                  onClick={() => updateStep(currentStep - 1)}
                >
                  <BiSkipPrevious size={18} /> Previous
                </Button>
              }
              {currentStep !== labelArray.length
                &&
                <Button
                  type="button"
                  className="btn btn-info m-1 cu_btn"
                  // disabled={currentStep === labelArray.length}
                  onClick={() => updateStep(currentStep + 1)}
                >
                  Next <BiSkipNext size={18} />
                </Button>
              }
              {currentStep === labelArray.length &&
                <Button
                  type="submit"
                  className={isupdating && (user.user_department_name + " " + user.designation_name === "DATA ENTRY OPERATOR" || user.user_department_name + " " + user.designation_name === "CUSTOMER SERVICE EXECUTIVE") ? "btn btn-info m-1" : !isupdating ? "btn btn-info m-1" : "btn btn-success m-1"}
                >
                  {isupdating && (user.user_department_name + " " + user.designation_name === "DATA ENTRY OPERATOR" || user.user_department_name + " " + user.designation_name === "CUSTOMER SERVICE EXECUTIVE" || user.is_superuser) ? "Update" : !isupdating ? "Save" : "Approved"}
                </Button>
              }

              {isupdating && (user.user_department_name + " " + user.designation_name !== "DATA ENTRY OPERATOR" && user.user_department_name + " " + user.designation_name !== "CUSTOMER SERVICE EXECUTIVE" && !user.is_superuser) && currentStep === labelArray.length &&
                <button
                  type="button"
                  className="btn btn-danger m-1"
                  onClick={handleShow}
                >
                  Rejected
                </button>
              }

              <Button
                type="button"
                className="btn btn-info m-1 cu_btn"
                onClick={handleAction}
              >
                Cancel
              </Button>
            </div>
          </Col>
        </div>
      </Form>
    </div>
  );
};

export default AddDocketIssue;