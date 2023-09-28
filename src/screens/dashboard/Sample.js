import React, { useState, useEffect, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useWindowDimensions from "./ScreenSize";
import "./Dashboard.css";
import { IconContext } from "react-icons";
import {
  MdAddCircleOutline,
  MdRemoveCircleOutline,
  MdDeleteForever,
  MdAdd,
} from "react-icons/md";
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
  Button,
} from "reactstrap";
import axios from "axios";
import { ServerAddress } from "../../constants/ServerAddress";
import toTitleCase from "../../lib/titleCase/TitleCase";
import SearchInput from "../../components/formComponent/searchInput/SearchInput";
import TransferList from "../../components/formComponent/transferList/TransferList";
import NSearchInput from "../../components/formComponent/nsearchInput/NSearchInput";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  setAlertType,
  setDataExist,
  setShowAlert,
} from "../../store/alert/Alert";
import { setToggle } from "../../store/parentFilter/ParentFilter";
import {
  setCurOrderDocketNo,
  setCurOrderId,
} from "../../store/booking/order/Order";
import DataList from "../../components/listDisplay/dataList/DataList";
// import StatusInfoDataTitle from "../../../data/booking/statusInfo/StatusInfoDataTitle";
import StatusInfoDataTitle from "../../data/booking/statusInfo/StatusInfoDataTitle";
import StatusInfoDataFormat from "../../data/booking/statusInfo/StatusInfoDataFormat";
import { useLocation } from "react-router-dom";
// import StatusInfoDataFormat from "../../../data/booking/statusInfo/StatusInfoDataFormat";

const Sample = () => {
  const { width } = useWindowDimensions();

  const user = useSelector((state) => state.authentication.userdetails);
  const home_branch_id = useSelector(
    (state) => state.authentication.userdetails.home_branch
  );

  const data_len = useSelector((state) => state.pagination.data_length);
  const page_num = useSelector((state) => state.pagination.page_number);
  const accessToken = useSelector((state) => state.authentication.access_token);
  const search = useSelector((state) => state.searchbar.search_item);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [page, setpage] = useState(1);

  //Get Updated Location Data
  const [order, setorder] = useState([]);
  // console.log("order----", order);
  const [order_id, setorder_id] = useState("");
  const [isupdating, setisupdating] = useState(false);
  const [hash, sethash] = useState("");

  //Submit Buttom
  const [submit_btn, setsubmit_btn] = useState(false);

  // For Onfocus
  const [clicked, setclicked] = useState(false);

  //For order type
  const [order_type, setorder_type] = useState("NORMAL_ORDER");
  //local delivery_type
  const [delivery_type, setdelivery_type] = useState("DOMESTIC");

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
  const [cod_list, setcod_list] = useState(["Yes", "No"]);
  const [d_cod, setd_cod] = useState("");
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
  const [delivery_mode_list, setdelivery_mode_list] = useState();
  const [delivery_mode, setdelivery_mode] = useState("");

  //Client
  const [client_list, setclient_list] = useState([]);
  const [client, setclient] = useState("");
  const [client_id, setclient_id] = useState(0);
  const [selectClient, setselectClient] = useState([]);
  const [search_client, setsearch_client] = useState("");

  //Billto
  const [billto_list, setbillto_list] = useState([]);
  const [billto, setbillto] = useState("");
  const [billto_id, setbillto_id] = useState(0);
  const [search_billto, setsearch_billto] = useState("");

  //transport Mode
  const [transport_mode_data_list, settransport_mode_data_list] = useState([
    "Air",
    "Surface",
    "Train",
    "Local",
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
  const [shipper_add_1, setshipper_add_1] = useState("");
  const [shipper_add_2, setshipper_add_2] = useState("");
  const [all_shipper_details, setall_shipper_details] = useState([]);

  //consignee
  const [consignee_details, setconsignee_details] = useState([]);
  const [consigneedata, setconsigneedata] = useState([]);
  const [consignee_list, setconsignee_list] = useState([]);
  const [consignee, setconsignee] = useState("");
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
    "None",
    "With Box",
    "With Logger",
    "With Box + With Logger",
  ]);
  const [asset_info_selected, setasset_info_selected] = useState(
    asset_info_list[0]
  );
  const [box, setbox] = useState([]);
  const [logger, setlogger] = useState([]);
  const [both, setboth] = useState([]);

  //Box Type
  // const [box_list, setbox_list] = useState([
  //   "CREDO",
  //   "VYPE",
  //   "COOL GUARD",
  //   "ISGO",
  //   "SAFE",
  // ]);
  // const [box_selected, setbox_selected] = useState("");

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

  //Temperature Type
  // const [temp_list, settemp_list] = useState([
  //   "2c-8c",
  //   "15c-25c",
  //   "-25c To -15c",
  //   "Dry Ice",
  //   "All In One",
  // ]);
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

  // adding extra input fields in Invoice
  const [invoice_img, setinvoice_img] = useState("");
  const [today, settoday] = useState("");
  const [invoice_no, setinvoice_no] = useState("");
  const [invoice_value, setinvoice_value] = useState("");

  let dimension_list2 = [invoice_img, today, invoice_no, invoice_value];
  const [row2, setrow2] = useState([dimension_list2]);

  //For Calculation Info
  const [cal_type, setcal_type] = useState("");

  //origincity
  const [origincity_list, setorigincity_list] = useState([]);
  const [origincity, setorigincity] = useState("");
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
  const [delivery_mode_error, setdelivery_mode_error] = useState(false);
  const [client_error, setclient_error] = useState(false);
  const [billto_error, setbillto_error] = useState(false);
  const [transport_mode_error, settransport_mode_error] = useState(false);
  const [shipper_error, setshipper_error] = useState(false);
  const [consignee_error, setconsignee_error] = useState(false);
  const [commodity_error, setcommodity_error] = useState(false);
  const [local_delivery_type_error, setlocal_delivery_type_error] =
    useState(false);
  const [d_cod_error, setd_cod_error] = useState(false);

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
  const addorderimage = () => {
    setSelectedFile("");
    setcaption1("");
    dimension_list1 = ["", ""];
    setrow1([...row1, dimension_list1]);
  };
  const deleteimage = (item1) => {
    let temp1 = [...row1];

    const index1 = temp1.indexOf(item1);

    if (index1 > -1) {
      temp1.splice(index1, 1);
    }

    setrow1(temp1);
  };

  // Invoice
  const addinvoice = () => {
    setinvoice_img("");
    settoday("");
    setinvoice_no("");
    setinvoice_value("");
    dimension_list2 = ["", "", "", ""];
    setrow2([...row2, dimension_list2]);
  };
  const deleteinvoice = (item2) => {
    let temp2 = [...row2];
    const index2 = temp2.indexOf(item2);

    if (index2 > -1) {
      temp2.splice(index2, 1);
    }
    setrow2(temp2);
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
      } else if (client === "") {
        setclient_error(true);
        doc_no_scroll.scrollIntoView();
      } else if (shipper === "") {
        setshipper_error(true);
        document.getElementById("shipper").scrollIntoView();
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
  const delivery_list = () => {
    if (delivery_type === "LOCAL") {
      setdelivery_mode_list(["Door To Door"]);
      setdelivery_mode("Door To Door");
    } else {
      setdelivery_mode_list(["Door To Door", "Airport To AirPort"]);
      setdelivery_mode("Door To Door");
    }
  };

  //Get Origin & Destination City
  const getCities = (place_id, filter_by) => {
    let cities_list = [];
    let dcities_list = [];
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
          setorigincity_list(cities_list);
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
          `master/get_client_shipperconsignee/?client_id=${client_id}&city_id=${origin_id}&p=${origincity_page}&records=${10}`,
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
          `master/get_client_shipperconsignee/?client_id=${client_id}&city_id=${destination_id}&p=${destinationcity_page}&records=${10}`,
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
  const send_order_image = () => {
    const docket_imageform = new FormData();
    if (row1.length !== 0) {
      for (let index = 0; index < row1.length; index++) {
        docket_imageform[`Docket Image ${index}`] = {
          uri: row1[index][0],
          type: "image/jpeg",
          name:
            response_awb_no +
            "_docket" +
            "_" +
            row1[index][1] +
            "_" +
            index +
            ".jpg",
        };
        docket_imageform[`Docket Image Caption ${index}`] = row1[index][1];
      }
      docket_imageform[`awb_no`] = response_awb_no;
      docket_imageform[`username`] = user.id;
    }

    docket_imageform.append("awb_no", response_awb_no);

    axios
      .post(
        ServerAddress + "bookings/api/add-order-images/",
        {
          orderImageList: docket_imageform,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          data: docket_imageform,
        }
      )
      .then(function (response) {});
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
          transportation_mode: String(transport_mode).toUpperCase(),
          delivery_mode: String(delivery_mode).toUpperCase(),
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
          created_by: user.id,
          booking_type: String(type_of_booking).toUpperCase(),
          delivery_type: String(delivery_type).toUpperCase(),
          commodity: commodity_id,
          packageList: row,
          InvoiceList: [],
          notification: true,
          asset_type: String(asset_info_selected).toUpperCase(),
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
          client_name: client,
          branch_name: user.branch_nm ? user.branch_nm : "branch not set",
          shipper_name: shipper,
          consignee_name: consignee,
          commodity_name: commodity,
          shipper_address: all_shipper_details,
          consignee_address: all_consignee_details,
          order_origin: all_shipper_details,
          order_destination: all_consignee_details,
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
      booking_at: booking_date,
      booking_type: type_of_booking,
      branch_name: user.branch_nm,
      // chargeable_weight: values.branch_phone_number,
      client_name: client,
      cod: d_cod,
      cold_chain: cold_chain,
      commodity_name: commodity,
      consignee_address_line: consignee_add_1,
      consignee_city: consignee_city,
      consignee_locality: consignee_locality,
      consignee_name: consignee,
      consignee_pincode: consignee_pincode,
      delivery_mode: delivery_mode,
      delivery_type: delivery_type,
      local_delivery_type: local_delivery_type,
      remarks: values.remarks,
      shipper_address_line: shipper_add_1,
      shipper_city: shipper_city,
      shipper_locality: shipper_locality,
      shipper_name: shipper,
      shipper_pincode: shipper_pincode,
      shipper_state: shipper_state,
      total_quantity: values.total_quantity,
      transportation_mode: transport_mode,
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
          transportation_mode: String(transport_mode).toUpperCase(),
          delivery_mode: String(delivery_mode).toUpperCase(),
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
          delivery_type: String(delivery_type).toUpperCase(),
          commodity: commodity_id,
          packageList: row,
          deleted_packages: deleted_packages_id,
          InvoiceList: [],
          notification: true,
          asset_type:
            cold_chain === true
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

          client_name: client,
          branch_name: user.branch_nm,
          shipper_name: shipper,
          consignee_name: consignee,
          commodity_name: commodity,
          shipper_address: all_shipper_details,
          consignee_address: all_consignee_details,
          order_origin: all_shipper_details,
          order_destination: all_consignee_details,
          assetdeleted_ids: assetdeleted_ids,
          assetold_ids: assetold_ids,
          assetnew_ids: assetnew_ids,
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
          dispatch(
            setDataExist(`Order '${docket_no_value}' Updated Sucessfully`)
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
    let b_temp2 = [];
    let b_data = [];
    axios
      .get(
        ServerAddress +
          `master/all_billtoes/?search=${search}&p=${page_num}&records=${data_len}&pan_no=${[]}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        b_data = response.data.results;
        for (let index = 0; index < b_data.length; index++) {
          b_temp2.push([b_data[index].id, toTitleCase(b_data[index].name)]);
        }
        setbillto_list(b_temp2);
      })
      .catch((err) => {
        alert(`Error Occur in Get Data ${err}`);
      });
  };

  const getClient = () => {
    let temp2 = [];
    let data = [];
    axios
      .get(
        ServerAddress +
          `master/all_clients/?bill_to=${billto_id}&search=${search}&p=${page_num}&records=${data_len}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        data = response.data.results;
        for (let index = 0; index < data.length; index++) {
          temp2.push([data[index].id, toTitleCase(data[index].name)]);
        }
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
          `master/all_commodities/?search=${""}&p=${page}&records=${10}&commodity_type=${[
            "",
          ]}&commodity_name=${[""]}&commodity_name_search=${search}`,
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
          if (order_asset.asset_type === "BOX") {
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
    let box = [];
    let logger = [];
    let both = [];
    axios
      .get(
        ServerAddress +
          `master/get_asset_details/?p=${page_num}&records=${data_len}&asset_type=${String(
            asset_info_selected
          ).toUpperCase()}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        data = response.data.results;
        for (let index = 0; index < data.length; index++) {
          const element = data[index];
          if (element.asset_type === "BOX") {
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
  }, [asset_info_selected]);

  useEffect(() => {
    getBillto();
  }, []);

  useEffect(() => {
    // setdata(false);
    if (billto_id !== 0) {
      if (!isupdating) {
        setclient("");
        setclient_id("");
      }
      getClient();
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
    if (!isupdating) {
      setorigincity("");
      setorigincity_id("");
      setshipper_id("");
      setdestinationcity("");
      setdestinationcity_id("");
    }
  }, [client_id, data]);

  useEffect(() => {
    setcustomer([]);
    let temp = [];
    selectClient.map((value) => {
      temp.push([value.id, value.name]);
      setcustomer(temp);
    });
  }, [selectClient]);

  useEffect(() => {
    let selected_shipper = shipperdata.filter(
      (value) => value.id === shipper_id
    );
    setshipper_details(selected_shipper[0]);
  }, [shipper_id]);

  useEffect(() => {
    let selected_consignee = consigneedata.filter(
      (val) => val.id === consignee_id
    );
    setconsignee_details(selected_consignee[0]);
  }, [consignee_id]);

  useEffect(() => {
    if (shipper_details) {
      setshipper_state(toTitleCase(shipper_details.state_name));
      setshipper_city(toTitleCase(shipper_details.city_name));
      setshipper_pincode(toTitleCase(shipper_details.pincode_name));
      setshipper_add_1(toTitleCase(shipper_details.address_line1));
      setshipper_locality(toTitleCase(shipper_details.locality_name));
    }
  }, [shipper_details, shipper_id]);

  useEffect(() => {
    if (consignee_details) {
      setconsignee_state(toTitleCase(consignee_details.state_name));
      setconsignee_city(toTitleCase(consignee_details.city_name));
      setconsignee_pincode(toTitleCase(consignee_details.pincode_name));
      setconsignee_add_1(toTitleCase(consignee_details.address_line1));
      setconsignee_locality(toTitleCase(consignee_details.locality_name));
    }
  }, [consignee_details]);

  useEffect(() => {
    if (!isupdating) {
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

  useEffect(() => {
    delivery_list();
  }, [delivery_type]);

  useEffect(() => {
    if (response_awb_no !== "") {
      send_order_image();
    }
  }, [response_awb_no]);

  useEffect(() => {
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
      setcurrent_status(order_data.current_status);
      setdocket_no_value(order_data.docket_no);
      setisupdating(true);
      setorder_id(order_data.id);
      setdocket_no_value(order_data.docket_no);
      dispatch(setCurOrderId(order_data.id));
      dispatch(setCurOrderDocketNo(order_data.docket_no));
      settype_of_booking(toTitleCase(order_data.booking_type));
      settransport_mode(toTitleCase(order_data.transportation_mode));
      setdelivery_mode(toTitleCase(order_data.delivery_mode));
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
      setshipper_add_1(toTitleCase(order_data.shipper_address_line_1));
      setshipper_add_2(toTitleCase(order_data.shipper_address_line_2));
      setconsignee(toTitleCase(order_data.consignee_name));
      setconsignee_id(order_data.consignee);
      setconsignee_state(toTitleCase(order_data.consignee_state));
      setconsignee_city(toTitleCase(order_data.consignee_city));
      setconsignee_pincode(order_data.consignee_pincode);
      setconsignee_add_1(toTitleCase(order_data.consignee_address_line_1));
      setconsignee_add_2(toTitleCase(order_data.consignee_address_line_2));
      setlocal_delivery_type(toTitleCase(order_data.delivery_type));
      setasset_info_selected(toTitleCase(order_data.asset_type));
      setcal_type(order_data.local_cal_type);
      setorigincity(toTitleCase(order_data.shipper_city));
      setorigincity_id(toTitleCase(order_data.shipper_city_id));
      setshipper_locality(toTitleCase(order_data.shipper_locality));
      setshipper_add_1(toTitleCase(order_data.shipper_address_line));
      setdestinationcity(toTitleCase(order_data.consignee_city));
      setdestinationcity_id(toTitleCase(order_data.consignee_city_id));
      setconsignee_locality(toTitleCase(order_data.consignee_locality));
      setconsignee_add_1(toTitleCase(order_data.consignee_address_line));
    } catch (error) {}
  }, []);

  useEffect(() => {
    if (delivery_mode !== "") {
      setdelivery_mode_error(false);
    }
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
    delivery_mode,
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

  // Modal
  // const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  // const [message, setmessage] = useState("");
  // const [ewaybill, setewaybill] = useState(false);

  useLayoutEffect(() => {
    getCities("all", "all");
  }, []);

  useEffect(() => {
    if (client_id && origincity_id) {
      get_client_shipper(client_id, origincity_id);
    }
  }, [client_id, origincity_id]);

  useEffect(() => {
    if (client_id && destinationcity_id) {
      get_client_consignee(client_id, destinationcity_id);
    }
  }, [client_id, destinationcity_id]);

  return (
    <div style={{ display: "flex", overflow: "hidden", height: "100%" }}>
      <div
        style={{
          width: width / 4,
          background: "red",
          overflowY: "scroll",
          margin: "2px",
        }}
        className="custom-scrollbars__content"
      >
        <table className="table-grid">
          <thead>
            <tr style={{ lineHeight: 2, blocalWidth: 1 }}>
              {/* <th
                style={{
                  width: "2rem",
                  textAlign: "center",
                  paddingLeft: "2px",
                  paddingRight: "2px",
                }}
                rowSpan={2}
              >
                SL
              </th> */}
              <th
                style={{
                  width: "8rem",
                  textAlign: "center",
                  paddingLeft: "4px",
                  paddingRight: "4px",
                }}
                rowSpan={2}
              >
                Docket No
              </th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>1</td>
              <td>8000</td>
            </tr>
            <tr>
              <td>1</td>
              <td>8000</td>
            </tr>
            <tr>
              <td>1</td>
              <td>8000</td>
            </tr>
            <tr>
              <td>1</td>
              <td>8000</td>
            </tr>
            <tr>
              <td>1</td>
              <td>8000</td>
            </tr>
            <tr>
              <td>1</td>
              <td>8000</td>
            </tr>
            <tr>
              <td>1</td>
              <td>8000</td>
            </tr>
            <tr>
              <td>1</td>
              <td>8000</td>
            </tr>
            <tr>
              <td>1</td>
              <td>8000</td>
            </tr>
            <tr>
              <td>1</td>
              <td>8000</td>
            </tr>
            <tr>
              <td>1</td>
              <td>8000</td>
            </tr>
            <tr>
              <td>1</td>
              <td>8000</td>
            </tr>
            <tr>
              <td>1</td>
              <td>8000</td>
            </tr>
            <tr>
              <td>1</td>
              <td>8000</td>
            </tr>
            <tr>
              <td>1</td>
              <td>8000</td>
            </tr>
            <tr>
              <td>1</td>
              <td>8000</td>
            </tr>
            <tr>
              <td>1</td>
              <td>8000</td>
            </tr>
            <tr>
              <td>1</td>
              <td>8000</td>
            </tr>
            <tr>
              <td>1</td>
              <td>8000</td>
            </tr>
            <tr>
              <td>1</td>
              <td>8000</td>
            </tr>
            <tr>
              <td>1</td>
              <td>8000</td>
            </tr>
            <tr>
              <td>1</td>
              <td>8000</td>
            </tr>
            <tr>
              <td>1</td>
              <td>8000</td>
            </tr>
            <tr>
              <td>1</td>
              <td>8000</td>
            </tr>
            <tr>
              <td>1</td>
              <td>8000</td>
            </tr>
            <tr>
              <td>1</td>
              <td>8000</td>
            </tr>
            <tr>
              <td>1</td>
              <td>8000</td>
            </tr>
            <tr>
              <td>1</td>
              <td>8000</td>
            </tr>
            <tr>
              <td>1</td>
              <td>8000</td>
            </tr>
            <tr>
              <td>1</td>
              <td>8000</td>
            </tr>
            <tr>
              <td>1</td>
              <td>8000</td>
            </tr>
            <tr>
              <td>1</td>
              <td>8000</td>
            </tr>
            <tr>
              <td>1</td>
              <td>8000</td>
            </tr>
            <tr>
              <td>1</td>
              <td>8000</td>
            </tr>
            <tr>
              <td>1</td>
              <td>8000</td>
            </tr>
            <tr>
              <td>1</td>
              <td>8000</td>
            </tr>
            <tr>
              <td>1</td>
              <td>8000</td>
            </tr>
            <tr>
              <td>1</td>
              <td>8000</td>
            </tr>
            <tr>
              <td>1</td>
              <td>8000</td>
            </tr>
            <tr>
              <td>1</td>
              <td>8000</td>
            </tr>
            <tr>
              <td>1</td>
              <td>8000</td>
            </tr>
            <tr>
              <td>1</td>
              <td>8000</td>
            </tr>
            <tr>
              <td>1</td>
              <td>8000</td>
            </tr>
            <tr>
              <td>1</td>
              <td>8000</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        style={{
          width: width / 1.5,
          background: "",
          overflowY: "scroll",
          borderRight: "1px solid black",
          borderLeft: "1px solid red",
        }}
        className="custom-scrollbars__content"
      >
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
              <div>{isupdating ? "Update Order" : "Add Order"}</div>
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
                          <Label className="header-child">Order Type</Label>
                          <Row>
                            <Col lg={12} md={4} sm={4}>
                              <div className="form-check mb-2">
                                <input
                                  className="form-check-input "
                                  type="radio"
                                  name="NORMAL_ORDER"
                                  id="OrderTypeRadio"
                                  value="NORMAL_ORDER"
                                  // disabled={isupdating ? delivery_type : ""}
                                  onClick={() => {
                                    setorder_type("NORMAL_ORDER");
                                  }}
                                  checked={order_type === "NORMAL_ORDER"}
                                  readOnly={true}
                                />

                                <label
                                  className="form-check-label input-box"
                                  htmlFor="exampleRadios1"
                                >
                                  Normal Order
                                </label>
                              </div>
                            </Col>

                            <Col lg={12} md={3} sm={3}>
                              <div className="form-check mb-2">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="AIRPORT_ORDER"
                                  id="OrderTypeRadio"
                                  value="AIRPORT_ORDER"
                                  // disabled={isupdating ? delivery_type : ""}
                                  onClick={() => {
                                    setorder_type("AIRPORT_ORDER");
                                  }}
                                  checked={order_type === "AIRPORT_ORDER"}
                                  readOnly={true}
                                />
                                <label
                                  className="form-check-label input-box"
                                  htmlFor="exampleRadios2"
                                >
                                  Airport Order
                                </label>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </Col>

                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-2">
                          <Label className="header-child">Delivery Type</Label>
                          <Row>
                            <Col lg={12} md={4} sm={4}>
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
                            <Col lg={12} md={3} sm={3}>
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

                            <Col lg={12} md={5} sm={5}>
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
                            <Col md={12} sm={5}>
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
                            <Col md={12} sm={7}>
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
                      {entry_type_btn === "AUTO GENERATE" ? (
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

                      <Col lg={4} md={6} sm={6}>
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

                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-3">
                          <Label className="header-child">
                            Type Of Booking
                          </Label>
                          <NSearchInput
                            data_list={type_of_booking_list}
                            data_item_s={type_of_booking}
                            set_data_item_s={settype_of_booking}
                            show_search={false}
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
                              // className="form-control d-block form-control-sm input "
                              className="form-control-md"
                              id="input"
                              value={booking_date}
                              onChange={(val) => {
                                setbooking_date(val.target.value);
                              }}
                            />
                          </div>
                        </div>
                      </Col>

                      <Col lg={4} md={6} sm={6}>
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
                      </Col>
                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-3">
                          <Label className="header-child">
                            Transport Mode *
                          </Label>
                          <NSearchInput
                            data_list={transport_mode_data_list}
                            data_item_s={transport_mode}
                            set_data_item_s={settransport_mode}
                            error_message="Select Transport Mode"
                            error_s={transport_mode_error}
                            show_search={false}
                          />
                        </div>
                      </Col>

                      <Col lg={4} md={6} sm={6}>
                        <Label className="header-child">Bill To*</Label>
                        <SearchInput
                          data_list={billto_list}
                          data_item_s={billto}
                          set_data_item_s={setbillto}
                          // error_message="Select Client "
                          set_id={setbillto_id}
                          disable_me={isupdating}
                          setsearch_item={setsearch_billto}
                        />
                        <div className="mt-1 error-text" color="danger">
                          {billto_error ? "Please Select Client " : null}
                        </div>
                      </Col>
                      {billto && (
                        <Col lg={4} md={6} sm={6}>
                          <Label className="header-child">Client *</Label>
                          <SearchInput
                            data_list={client_list}
                            data_item_s={client}
                            set_data_item_s={setclient}
                            // error_message="Select Client "
                            set_id={setclient_id}
                            disable_me={isupdating}
                            setsearch_item={setsearch_client}
                          />
                          <div className="mt-1 error-text" color="danger">
                            {client_error ? "Please Select Client " : null}
                          </div>
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
                              <Label className="header-child">
                                Origin City*
                              </Label>
                              <SearchInput
                                data_list={origincity_list}
                                setdata_list={setorigincity}
                                data_item_s={origincity}
                                set_data_item_s={setorigincity}
                                set_id={setorigincity_id}
                                page={origincity_page}
                                setpage={setorigincity_page}
                                error_message={"Please Select Any Option"}
                                search_item={origincity_search_item}
                                setsearch_item={setorigincity_search_item}
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
                                search_item={shipper_search_item}
                                setsearch_item={setshipper_search_item}
                              />
                              <div className="mt-1 error-text" color="danger">
                                {shipper_error ? "Please Select Shipper" : null}
                              </div>
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
                                  <Label className="header-child">
                                    Pincode
                                  </Label>
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
                                  <Label className="header-child">
                                    Locality
                                  </Label>
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
                                search_item={destinationcity_search_item}
                                setsearch_item={setdestinationcity_search_item}
                              />
                            </div>
                          </Col>

                          <Col lg={4} md="6" sm="6">
                            <div className="mb-3">
                              <Label className="header-child">
                                Consignee *
                              </Label>
                              <SearchInput
                                data_list={consignee_list}
                                setdata_list={setconsignee_list}
                                data_item_s={consignee}
                                set_data_item_s={setconsignee}
                                set_id={setconsignee_id}
                                page={consignee_page}
                                setpage={setconsignee_page}
                                error_message={"Please Select Any Option"}
                                search_item={consignee_search_item}
                                setsearch_item={setconsignee_search_item}
                              />
                              <div className="mt-1 error-text" color="danger">
                                {consignee_error
                                  ? "Consignee is required"
                                  : null}
                              </div>
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
                                  <Label className="header-child">
                                    Pincode
                                  </Label>
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
                                  <Label className="header-child">
                                    Locality
                                  </Label>
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
                        {asset_info_selected === "With Box" ? (
                          <>
                            <Col lg={12} md={6} sm={6}>
                              <Label className="header-child">Box No *</Label>
                              <TransferList
                                list_a={box_list_1}
                                setlist_a={setbox_list_1}
                                list_b={box_list_2}
                                setlist_b={setbox_list_2}
                                page={box_list_page}
                                setpage={setbox_list_page}
                                setsearch_item={setsearch_box_list}
                                // setlist_id={}
                              />
                            </Col>
                          </>
                        ) : null}

                        {asset_info_selected === "With Logger" ? (
                          <>
                            <Col lg={12} md={6} sm={6}>
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
                                <Label className="header-child">Box No *</Label>
                                <TransferList
                                  list_a={box_list_1}
                                  setlist_a={setbox_list_1}
                                  list_b={box_list_2}
                                  setlist_b={setbox_list_2}
                                  width={"width"}
                                  page={box_list_page}
                                  setpage={setbox_list_page}
                                  setsearch_item={setsearch_box_list}
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
                          data_list={commodity_data_list}
                          setdata_list={setcommodity_data_list}
                          data_item_s={commodity}
                          set_data_item_s={setcommodity}
                          set_id={setcommodity_id}
                          page={page}
                          setpage={setpage}
                          setsearch_item={setsearch_commodity}
                          // error_message={"Please Select Any Commodity"}
                        />
                        {commodity_error ? (
                          <div className="mt-1 error-text" color="danger">
                            Please Select Any Commodity
                          </div>
                        ) : null}
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
                          <Label className="header-child">
                            Total Quantity *
                          </Label>
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
                            current_status !== "Shipment Delivered" && (
                              <span>
                                <Button
                                  type="button"
                                  className="btn btn-info mx-1 cu_btn "
                                  onClick={() => {
                                    navigate(
                                      "/booking/orders/adddocketstatus",
                                      {
                                        state: { order: order },
                                      }
                                    );
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
                        }}
                      >
                        Invoices
                      </div>
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
                              <Label className="header-child">
                                No of Pieces
                              </Label>
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
                            <div
                              className="mb-3"
                              style={{ textAlign: "center" }}
                            >
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
                        <Col md={row1.length > 1 ? 5 : 6} sm={5}>
                          <div className="mb-3">
                            <Label className="header-child">Image</Label>
                            {row1.map((item1, index1) => (
                              <Input
                                style={{ marginBottom: "15px" }}
                                key={index1}
                                className="form-control-md"
                                type="file"
                                id="input"
                                onChange={(event) => {
                                  setSelectedFile(event.target.files[0]);
                                  item1[0] = event.target.files;
                                }}
                              />
                            ))}
                          </div>
                        </Col>
                        <Col md={6} sm={5}>
                          <div className="mb-3">
                            <Label className="header-child">Caption</Label>
                            {row1.map((item1, index1) => (
                              <select
                                style={{
                                  marginBottom: "15px",
                                  boxShadow: "none",
                                }}
                                key={index1}
                                className="form-select"
                                id="input"
                                value={item1[1]}
                                onChange={(val) => {
                                  setcaption1(val.target.value);
                                  item1[1] = val.target.value;
                                }}
                              >
                                <option value="" disabled selected>
                                  Select status
                                </option>
                                <option>Parcel Image</option>
                                <option>eWayill Image</option>
                                <option>Order Image</option>
                                <option>Weight Image</option>
                              </select>
                            ))}
                          </div>
                        </Col>
                        <Col md={1}>
                          <div className="mb-3" style={{ textAlign: "center" }}>
                            {row1.length > 1 ? (
                              <Label className="header-child">Delete</Label>
                            ) : null}
                            {row1.map((item1, index1) => (
                              <IconContext.Provider
                                key={index1}
                                value={{
                                  className: "icon multi-input",
                                }}
                              >
                                {row1.length > 1 ? (
                                  <>
                                    <div style={{ height: "14.5px" }}></div>
                                    <div
                                      onClick={() => {
                                        deleteimage(item1);
                                      }}
                                    >
                                      <MdDeleteForever
                                        style={{
                                          alignItems: "center",
                                          background: "",
                                        }}
                                      />
                                    </div>
                                  </>
                                ) : null}
                              </IconContext.Provider>
                            ))}
                          </div>
                        </Col>
                        <div>
                          <span
                            className="link-text"
                            onClick={() => {
                              if (selectedFile && caption1) {
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
                        <Col md={3}>
                          <div className="mb-3">
                            <Label className="header-child">
                              Invoice Images
                            </Label>
                            {row2.map((item2, index2) => (
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
                            ))}
                          </div>
                        </Col>
                        <Col md={3} sm={3}>
                          <div className="mb-3">
                            <Label className="header-child">
                              Invoices Date
                            </Label>
                            {row2.map((item2, index2) => (
                              <div>
                                <input
                                  style={{ marginBottom: "15px" }}
                                  type="date"
                                  className="form-control d-block form-control-md"
                                  id="input"
                                  onChange={(event) => {
                                    settoday(event.target.value[1]);
                                    item2[1] = event.target.value;
                                  }}
                                />
                              </div>
                            ))}
                          </div>
                        </Col>
                        <Col md={3} sm={3}>
                          <div className="mb-3">
                            <Label className="header-child">
                              Invoice Number
                            </Label>
                            {row2.map((item2, index2) => (
                              <Input
                                min={0}
                                key={index2}
                                value={item2[2]}
                                type="number"
                                className="form-control-md"
                                id="input"
                                style={{ marginBottom: "15px" }}
                                placeholder="Enter No of Pieces"
                                onChange={(val) => {
                                  setinvoice_no(val.target.value);
                                  item2[2] = val.target.value;
                                }}
                              />
                            ))}
                          </div>
                        </Col>
                        <Col md={row2.length > 1 ? 2 : 3} sm={4}>
                          <div className="mb-3">
                            <Label className="header-child">
                              Invoice Value
                            </Label>
                            {row2.map((item2, index2) => (
                              <Input
                                min={0}
                                key={index2}
                                value={item2[3]}
                                type="number"
                                className="form-control-md"
                                id="input"
                                style={{ marginBottom: "15px" }}
                                placeholder="Enter No of Pieces"
                                onChange={(val) => {
                                  setinvoice_value(val.target.value);
                                  item2[3] = val.target.value;
                                }}
                              />
                            ))}
                          </div>
                        </Col>
                        <Col md={1}>
                          <div className="mb-3" style={{ textAlign: "center" }}>
                            {row2.length > 1 ? (
                              <Label className="header-child">Delete</Label>
                            ) : null}
                            {row2.map((item2, index2) => (
                              <IconContext.Provider
                                key={index2}
                                value={{
                                  className: "icon multi-input",
                                }}
                              >
                                {row2.length > 1 ? (
                                  <>
                                    <div style={{ height: "14.5px" }}></div>
                                    <div
                                      onClick={() => {
                                        deleteinvoice(item2);
                                      }}
                                    >
                                      <MdDeleteForever
                                        style={{
                                          alignItems: "center",
                                          background: "",
                                        }}
                                      />
                                    </div>
                                  </>
                                ) : null}
                              </IconContext.Provider>
                            ))}
                          </div>
                        </Col>
                        <div>
                          <span
                            className="link-text"
                            onClick={() => {
                              if (
                                invoice_img &&
                                today &&
                                invoice_no &&
                                invoice_value
                              ) {
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
                  </CardBody>
                ) : null}
              </Card>
            </Col>
          </div>

          {/* Footer Btn*/}

          <div className="page-control m-3">
            <Col lg={12}>
              <div className="mb-1 footer_btn">
                <Button
                  type="submit"
                  className="btn btn-info m-1 cu_btn" // disabled={submit_btn === true}
                >
                  {isupdating ? "Update" : "Save"}
                </Button>

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

      <div
        style={{ width: width / 2.5, background: "", overflowY: "scroll" }}
        className="custom-scrollbars__content"
      >
        <div className="m-1">
          <div
            className=" mb-2 main-header"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            Order Images
          </div>

          <Col lg={12}>
            <Card className="shadow bg-white rounded" id="doc_no">
              <CardTitle className="mb-1 header">
                <div className="header-text-icon header-text">Docket Image</div>
              </CardTitle>
              <CardBody
                style={{ background: "red", width: "300", height: "320px" }}
              >
                Image
              </CardBody>
            </Card>
          </Col>

          <Col lg={12}>
            <Card className="shadow bg-white rounded" id="doc_no">
              <CardTitle className="mb-1 header">
                <div className="header-text-icon header-text">POD Image</div>
              </CardTitle>
              <CardBody
                style={{ background: "white", width: "300", height: "320px" }}
              >
                Image2
              </CardBody>
            </Card>
          </Col>

          <Col lg={12}>
            <Card className="shadow bg-white rounded" id="doc_no">
              <CardTitle className="mb-1 header">
                <div className="header-text-icon header-text">
                  Invoice Image
                </div>
              </CardTitle>
              <CardBody
                style={{ background: "blue", width: "300", height: "320px" }}
              >
                Image3
              </CardBody>
            </Card>
          </Col>

          <Col lg={12}>
            <Card className="shadow bg-white rounded" id="doc_no">
              <CardTitle className="mb-1 header">
                <div className="header-text-icon header-text">POD Image</div>
              </CardTitle>
              <CardBody
                style={{ background: "white", width: "300", height: "320px" }}
              >
                Image2
              </CardBody>
            </Card>
          </Col>

          <Col lg={12}>
            <Card className="shadow bg-white rounded" id="doc_no">
              <CardTitle className="mb-1 header">
                <div className="header-text-icon header-text">POD Image</div>
              </CardTitle>
              <CardBody
                style={{ background: "skyblue", width: "300", height: "320px" }}
              >
                Image2
              </CardBody>
            </Card>
          </Col>
        </div>
      </div>
    </div>
  );
};

export default Sample;
