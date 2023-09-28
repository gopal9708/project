import React, { useState, useEffect, useLayoutEffect } from "react";
import "../../../assets/scss/forms/form.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IconContext } from "react-icons";
import useWindowDimensions from "../../dashboard/ScreenSize";
import "../../dashboard/Dashboard.css";
import { BiTrash } from "react-icons/bi";
import { Link } from "react-router-dom";
import ReactImageMagnify from 'react-image-magnify';
import "./Orderchecker.css";
import {
  MdAddCircleOutline,
  MdRemoveCircleOutline,
  MdDeleteForever,
  MdAdd,
} from "react-icons/md";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
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
import {
  bucket_address,
  ServerAddress,
  EServerAddress,
} from "../../../constants/ServerAddress";
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
import DeliveryInfoDataTitle from "../../../data/booking/deliveryInfo/DeliveryInfoDataTitle";
import DeliveryInfoDataFormat from "../../../data/booking/deliveryInfo/DeliveryInfoDataFormat";
import { gstin_no } from "../../../constants/CompanyDetails";
import LogInEwayBill from "../../authentication/signin/LogInEwayBill";
import ImgModal from "../../../components/crop/ImgModal";
import Loader from "../../../components/loader/Loader";
import { RiNurseFill } from "react-icons/ri";
import SearchList from "../../../components/listDisplay/searchList/SearchList";
import { Hidden } from "@mui/material";

const AddOrder = () => {
  const user = useSelector((state) => state.authentication.userdetails);
  const home_branch_id = useSelector(
    (state) => state.authentication.userdetails.home_branch
  );
  const [isLoading, setIsLoading] = useState(false);
  const success = useSelector((state) => state.alert.show_alert);
  const nav_toggle = useSelector((state) => state.datalist.nav_toggle);
  const business_access_token = useSelector((state) => state.eway_bill.business_access_token);
  const { width } = useWindowDimensions();
  const cm_value = useSelector((state) => state.datalist.cm_filter);
  const data_len = useSelector((state) => state.pagination.data_length);
  const page_num = useSelector((state) => state.pagination.page_number);
  const search = useSelector((state) => state.searchbar.search_item);
  const accessToken = useSelector((state) => state.authentication.access_token);
  const dispatch = useDispatch();
  const location = useLocation();
  console.log("location====", location)
  const navigate = useNavigate();
  const [page, setpage] = useState(1);

  const [show_pincode, setshow_pincode] = useState(false);

  const handleClose_Pincode = () => setshow_pincode(false);
  // const handleShow_Pincode = () => setshow_pincode(true);
  const [from_pin, setfrom_pin] = useState(false)
  const [to_pin, setto_pin] = useState(false)

  //Get Updated Location Data
  const [order, setorder] = useState([]);
  const [status_data, setstatus_data] = useState([])
  // console.log("status_data-----", status_data)
  const [order_id, setorder_id] = useState("");
  const [isupdating, setisupdating] = useState(false);
  const [hash, sethash] = useState("");
  const [returned_data, setreturned_data] = useState([]);
  const [total_delivered_pcs, settotal_delivered_pcs] = useState(0);
  //Submit Buttom
  const [submit_btn, setsubmit_btn] = useState(false);

  const [all_ord_images, setall_ord_images] = useState([])
  // console.log("all_ord_images-----", all_ord_images)
  const [all_inv_images, setall_inv_images] = useState([])
  // console.log("all_inv_images-----", all_inv_images)
  const [all_images, setall_images] = useState([])
  console.log("all_images-----", all_images)

  // For Onfocus
  const [clicked, setclicked] = useState(false);

  //local delivery_type
  const [delivery_type, setdelivery_type] = useState("");

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

  // Logger Remarks
  const [is_credo_box_return, setis_credo_box_return] = useState(false)
  const [is_credo_return, setis_credo_return] = useState(false)
  const [is_logger_return, setis_logger_return] = useState(false)

  const [assettype_remarks, setassettype_remarks] = useState("")



  //Cold chain
  const [cold_chain, setcold_chain] = useState(false);
  const [nonecold_chain, setnonecold_chain] = useState(false);
  const [coldchain_error, setcoldchain_error] = useState(false)
  const [cod_list, setcod_list] = useState(["Yes", "No"]);
  const [asset_prov, setasset_prov] = useState(false);
  const [d_cod, setd_cod] = useState("No");

  const [type_list, settype_list] = useState(["Ambient", "Frozen", "Refrigerated", "Controlled Ambient"])
  const [type, settype] = useState(type_list[0])
  const [state_list_c, setstate_list_c] = useState([]);
  const [state_id_f_c, setstate_id_f_c] = useState(0);
  const [state_error_c, setstate_error_c] = useState(false);
  const [state_page_c, setstate_page_c] = useState(1);
  const [statec_count, setstatec_count] = useState(1);
  const [statec_loaded, setstatec_loaded] = useState(false);
  const [statec_bottom, setstatec_bottom] = useState(103);

  const [state_search_item_c, setstate_search_item_c] = useState("");
  const [city_list__c, setcity_list__c] = useState([]);
  const [city_id_c, setcity_id_c] = useState(0);
  const [city_error_c, setcity_error_c] = useState(false);
  const [city_page_c, setcity_page_c] = useState(1);
  const [city_search_item_c, setcity_search_item_c] = useState("");
  const [cityc_loaded, setcityc_loaded] = useState(false);
  const [cityc_count, setcityc_count] = useState(1);
  const [cityc_bottom, setcityc_bottom] = useState(103);

  const [by_pincode_f_c, setby_pincode_f_c] = useState(false);
  const [pincode_list_f_c, setpincode_list_f_c] = useState([]);
  const [pincode_error_f_c, setpincode_error_f_c] = useState(false);
  const [pincode_error2_f_c, setpincode_error2_f_c] = useState(false);
  const [pincode_page_c, setpincode_page_c] = useState(1);
  const [pincode_search_item_c, setpincode_search_item_c] = useState("");
  const [pincode_loaded_f_c, setpincode_loaded_f_c] = useState(false);
  const [pincode_list_error_c, setpincode_list_error_c] = useState(false);
  const [locality_c, setlocality_c] = useState("");
  const [locality_list_s_c, setlocality_list_s_c] = useState([]);
  const [locality_page_c, setlocality_page_c] = useState(1);
  const [localityc_loaded, setlocalityc_loaded] = useState(false);
  const [localityc_count, setlocalityc_count] = useState(1);
  const [localityc_bottom, setlocalityc_bottom] = useState(103);

  const [locality_search_item_c, setlocality_search_item_c] = useState("");
  const [locality_id_f_c, setlocality_id_f_c] = useState(0);
  const [locality_error_c, setlocality_error_c] = useState(false);
  const [refresh_c, setrefresh_c] = useState(false);

  //Type of Booking
  const [type_of_booking_list, setype_of_booking_list] = useState([
    "Priority",
    "Economy",
  ]);

  const [type_of_booking, settype_of_booking] = useState(
    type_of_booking_list[1]
  );
  const [booking_type_error, setbooking_type_error] = useState(false);

  //For Booking Date
  const [booking_date, setbooking_date] = useState("");
  const [booking_date_error, setbooking_date_error] = useState(false)

  //Delivery Mode
  const [delivery_mode_list, setdelivery_mode_list] = useState([]);
  const [delivery_mode, setdelivery_mode] = useState("Door To Door");
  const [booking_through, setbooking_through] = useState(false);
  const [ewaybill_no, setewaybill_no] = useState("");

  //Client
  const [client_list, setclient_list] = useState([]);
  const [client, setclient] = useState("");
  const [client_id, setclient_id] = useState(0);
  const [selectClient, setselectClient] = useState([]);
  const [search_client, setsearch_client] = useState("");
  const [client_page, setclient_page] = useState(1);
  const [client_bottom, setclient_bottom] = useState(103);
  const [client_loaded, setclient_loaded] = useState(false);
  const [client_count, setclient_count] = useState(1);

  // Clients Commidities Lists
  const [clients_commidities_lists, setclients_commidities_lists] = useState(
    []
  );
  const [client_commidities_list, setclient_commidities_list] = useState([]);

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
  const [pincodec_count, setpincodec_count] = useState(1);
  const [pincodec_bottom, setpincodec_bottom] = useState(103);
  const [loadc_pincode, setloadc_pincode] = useState(false);

  const [consignee_locality, setconsignee_locality] = useState("");
  const [consignee_add_1, setconsignee_add_1] = useState("");
  const [consignee_add_2, setconsignee_add_2] = useState("");
  const [all_consignee_details, setall_consignee_details] = useState([]);
  // Asset Info
  const [asset_idlist, setasset_idlist] = useState([]);
  const [assetdeleted_ids, setassetdeleted_ids] = useState([]);
  const [assetnew_ids, setassetnew_ids] = useState([]);
  const [asset_info_list, setasset_info_list] = useState([
    // "None",
    "With Box",
    // "With Logger",
    "With Box + With Logger",
  ]);
  const [asset_info_selected, setasset_info_selected] = useState("");
  const [box, setbox] = useState([]);
  const [logger, setlogger] = useState([]);
  const [both, setboth] = useState([]);

  //Box Type

  //Box Number
  const [box_list_1, setbox_list_1] = useState([]);
  const [box_list_2, setbox_list_2] = useState([]);
  const [box_list_page, setbox_list_page] = useState(1);
  const [search_box, setsearch_box] = useState("");
  const [box_loaded, setbox_loaded] = useState(false);
  const [box_count, setbox_count] = useState(1);
  const [box_bottom, setbox_bottom] = useState(56)

  //Logger Number
  const [Logger_list, setLogger_list] = useState([]);
  const [Logger_Selected, setLogger_Selected] = useState([]);
  const [logger_loaded, setlogger_loaded] = useState(false);
  const [logger_count, setlogger_count] = useState(1);
  const [logger_bottom, setlogger_bottom] = useState(56)
  const [Logger_page, setLogger_page] = useState(1);
  const [search_logger, setsearch_logger] = useState("");

  //Temperature Type

  const [temp_selected, settemp_selected] = useState("");

  //Commodity
  const [commodity, setcommodity] = useState("");
  const [commodity_id, setcommodity_id] = useState(0);
  const [commodity_loaded, setcommodity_loaded] = useState(false);
  const [commodity_count, setcommodity_count] = useState(1);
  const [commodity_bottom, setcommodity_bottom] = useState(103);

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

  let dimension_list1 = [selectedFile, caption1, ""];
  const [row1, setrow1] = useState([dimension_list1]);
  console.log("row1-------", row1)

  const [documentOrder, setdocumentOrder] = useState("");
  let dimension_list3 = [documentOrder, caption1];
  const [row3, setrow3] = useState([["", "", ""]]);

  // adding extra input fields in Invoice
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
  let val = (`${year}-${month}-${added_date_time}`)
  const [today, settoday] = useState(val);

  const [invoice_img, setinvoice_img] = useState("");
  const [ewaybill_img, setewaybill_img] = useState("");
  const [invoice_no, setinvoice_no] = useState("");
  const [invoice_value, setinvoice_value] = useState("");
  const [e_waybill_inv, sete_waybill_inv] = useState("");

  let dimension_list2 = [
    e_waybill_inv,
    today,
    invoice_no,
    invoice_value,
    invoice_img,
    ewaybill_img,
    ""
  ];

  const [row2, setrow2] = useState([dimension_list2]);
  console.log("row2-----", row2)
  const [row4, setrow4] = useState([["", val, "", "", "", "", ""]]);


  //For Calculation Info
  const [cal_type, setcal_type] = useState("");

  //origincity
  const [origincity, setorigincity] = useState("");

  const [origincity_id, setorigincity_id] = useState(0);

  //destinationcity
  const [destinationcity_list, setdestinationcity_list] = useState([]);
  const [destinationcity, setdestinationcity] = useState("");
  const [destinationcity_id, setdestinationcity_id] = useState(0);
  const [destinationcity_page, setdestinationcity_page] = useState(1);
  const [destinationcity_search_item, setdestinationcity_search_item] =
    useState("");

  //State
  const [state_list_s, setstate_list_s] = useState([]);
  const [state, setstate] = useState("");
  const [state_id, setstate_id] = useState(0);


  // WareHouse
  const [is_warehouse, setis_warehouse] = useState(false)
  const [warehouse_list, setwarehouse_list] = useState([])
  const [warehouse, setwarehouse] = useState("")
  const [warehouse_id, setwarehouse_id] = useState(null)
  const [warehouse_page, setwarehouse_page] = useState(1)
  const [warehouse_error, setwarehouse_error] = useState(false)
  const [warehouse_loaded, setwarehouse_loaded] = useState(false)
  const [warehouse_count, setwarehouse_count] = useState(1)
  const [warehouse_bottom, setwarehouse_bottom] = useState(103)
  const [search_warehouse, setsearch_warehouse] = useState("")



  //Pincode
  const [pincode_list_s, setpincode_list_s] = useState([]);
  const [pincode_loaded, setpincode_loaded] = useState(false);
  const [pincode, setpincode] = useState("");
  const [by_pincode, setby_pincode] = useState(false);

  // Delivery Info
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

  const [circle_del_btn, setcircle_del_btn] = useState(true);
  const toggle_circle_del = () => {
    setcircle_del_btn(!circle_del_btn);
  };

  // Error State
  const [transportation_cost_err, settransportation_cost_err] = useState(false);
  const [pincode_error, setpincode_error] = useState(false);
  const [pincode_error2, setpincode_error2] = useState(false);
  // const [delivery_mode_error, setdelivery_mode_error] = useState(false);
  const [client_error, setclient_error] = useState(false);
  const [billto_error, setbillto_error] = useState(false);
  const [billto_bottom, setbillto_bottom] = useState(103);
  const [billto_count, setbillto_count] = useState(1);
  const [billto_loaded, setbillto_loaded] = useState(false);
  const [transport_mode_error, settransport_mode_error] = useState(false);
  const [shipper_error, setshipper_error] = useState(false);
  const [consignee_error, setconsignee_error] = useState(false);
  const [ewaybill_no_error, setewaybill_no_error] = useState(false)
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
    type: "",
  });
  // console.log("showModalOrder===", showModalOrder)

  const [img_index, setimg_index] = useState("")

  // Packages
  let p = row.length - 1;
  // const a = parseInt(row[p][3]) + parseInt(row[p][3]);
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


  const addorderimage = () => {
    setSelectedFile("");
    setcaption1("");
    dimension_list1 = ["", "", ""];
    setrow1([...row1, dimension_list1]);
    setrow3([...row3, ["", "", ""]]);
  };

  // Invoice
  const addinvoice = () => {
    setinvoice_img("");
    // settoday("");
    setewaybill_img("")
    setinvoice_no("");
    setinvoice_value("");
    dimension_list2 = ["", val, "", "", "", "", ""];
    setrow2([...row2, dimension_list2]);
    setrow4([...row4, ["", val, "", "", "", "", ""]]);
  };
  const [showinv, setShowinv] = useState(false);
  const [inv_id, setinv_id] = useState(null)
  const [inv_data, setinv_data] = useState("")
  const [ord_id, setord_id] = useState(null)
  const [ord_data, setord_data] = useState("")
  const [delete_type, setdelete_type] = useState("")

  const deleteInvoice = (id, item2) => {
    // console.log("id", id)
    axios
      .delete(ServerAddress + `booking/delete-invoice-images/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        setShowinv(false)
        if (res.data.message === "Image deleted successfully.") {
          const updatedEwayValue = eway_value.filter(item => item.ewbNo !== item2[0]);
          seteway_value(updatedEwayValue)
          let temp2 = [...row2];
          let temp4 = [...row4];
          const index2 = temp2.indexOf(item2);

          if (index2 > -1) {
            temp2.splice(index2, 1);
            temp4.splice(index2, 1);
          }
          setrow2(temp2);
          setrow4(temp4);

          dispatch(setShowAlert(true));
          dispatch(
            setDataExist(`Invoice Deleted Successfully !`)
          );
          dispatch(setAlertType("danger"));
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log(console.log("err----delete---Order--", err))
      });
  };

  const deleteOrderImage = (id, item1) => {
    axios
      .delete(ServerAddress + `booking/delete-order-images/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        setShowinv(false)
        if (res.data.message === "Image deleted successfully.") {
          let temp1 = [...row1];
          let temp3 = [...row3];

          const index1 = temp1.indexOf(item1);

          if (index1 > -1) {
            temp1.splice(index1, 1);
            temp3.splice(index1, 1);
          }

          setrow1(temp1);
          setrow3(temp3);

          dispatch(setShowAlert(true));
          dispatch(
            setDataExist(`Image Deleted Successfully !`)
          );
          dispatch(setAlertType("danger"));
          getOrderImages();
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.warn("deleteOrderImage--", err)
      });
  };

  const deleteinvoice = (item2) => {
    setdelete_type("invoice_image")
    if (location.state !== null && item2[6] !== "") {
      setinv_data(item2)
      setinv_id(item2[6])
      setShowinv(true)
    }
    else {
      const updatedEwayValue = eway_value.filter(item => item.ewbNo !== item2[0]);
      seteway_value(updatedEwayValue)
      let temp2 = [...row2];
      let temp4 = [...row4];
      const index2 = temp2.indexOf(item2);

      if (index2 > -1) {
        temp2.splice(index2, 1);
        temp4.splice(index2, 1);
      }
      setrow2(temp2);
      setrow4(temp4);
    }
  };

  const deleteimage = (item1) => {
    setdelete_type("order_image")
    if (location.state !== null && item1[2] !== "") {
      setord_data(item1)
      setord_id(item1[2])
      setShowinv(true)
    }
    else {
      let temp1 = [...row1];
      let temp3 = [...row3];

      const index1 = temp1.indexOf(item1);

      if (index1 > -1) {
        temp1.splice(index1, 1);
        temp3.splice(index1, 1);
      }

      setrow1(temp1);
      setrow3(temp3);
    }

  };

  //Logger PDF

  const [logger_pdf, setlogger_pdf] = useState("");
  const [text, settext] = useState("");
  const dimension_list5 = [logger_pdf, text];
  const [row5, setrow5] = useState([dimension_list5]);

  useEffect(() => {
    if (Logger_Selected.length > 0) {
      let temp_log = [];
      for (let index = 0; index < Logger_Selected.length; index++) {
        const element = Logger_Selected[index];
        temp_log.push(["", element[1]]);
      }
      setrow5(temp_log);
    }
  }, [Logger_Selected]);

  const [logger_id_list, setlogger_id_list] = useState([]);
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

  const [same_as, setsame_as] = useState(false);
  const [showOrder, setShowOrder] = useState(false);

  const [toggle_order, settoggle_order] = useState(false);

  const [linked_order, setlinked_order] = useState("");
  const [order_type_list, setorder_type_list] = useState([
    "New",
    "Return",
    "Issue",
    "Airport To Airport"
  ]);
  const [order_type, setorder_type] = useState(order_type_list[0]);
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

      rate_class: order.rate_class && toTitleCase(order.rate_class) || "",
      airlines_name: order.airlines_name && toTitleCase(order.airlines_name) || "",
      no_of_bags: order.no_of_bags || "0",
      flight_no: order.flight_no || "",
      handling_charge: order.handling_charge || 0,
      tsp: order.tsp || 0,
      other_charge: order.other_charge || 0,
      carrier_charge: order.carrier_charge || 0,
      rate: order.rate || 0,
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
      let shipper = window.document.getElementById("shipper");
      let consignee = window.document.getElementById("consignee");
      let tariff_info = window.document.getElementById("tariff_info");

      if (
        entry_type_btn === "MANUALLY" &&
        docket_no_value.length <= 5
        // || (entry_type_btn === "MANUALLY" && docket_no_value.length < 6)
      ) {
        setdocket_error(true);
        doc_no_scroll.scrollIntoView();
      } else if (transport_mode === "" && delivery_type !== "LOCAL" && order_type !== "Airport To Airport") {
        settransport_mode_error(true);
        doc_no_scroll.scrollIntoView();
      } else if (billto === "") {
        setbillto_error(true);
        doc_no_scroll.scrollIntoView();
      } else if (client === "") {
        setclient_error(true);
        doc_no_scroll.scrollIntoView();
      }
      else if (ewaybill_no?.length !== 12 && booking_through) {
        setewaybill_no_error(true);
        doc_no_scroll.scrollIntoView();
      } else if (!cold_chain && !nonecold_chain && order_type !== "Airport To Airport") {
        setcoldchain_error(true);
        doc_no_scroll.scrollIntoView();
      }
      else if (type_of_booking === "") {
        setbooking_type_error(true);
        doc_no_scroll.scrollIntoView();
      }
      else if (booking_date === "") {
        setbooking_date_error(true);
        doc_no_scroll.scrollIntoView();
      }
      else if (shipper_n === "" && !booking_through) {
        setshipper_error(true);
        doc_no_scroll.scrollIntoView();
      } else if ((state === "" || !state) && !booking_through) {
        setstate_error(true);
        shipper.scrollIntoView();
      } else if (city === "" && !booking_through) {
        setcity_error(true);
        shipper.scrollIntoView();
      } else if (pincode === "" && !booking_through) {
        setpincode_list_error(true);
        shipper.scrollIntoView();
      } else if (locality === "" && !booking_through) {
        setlocality_error(true);
        shipper.scrollIntoView();
      }
      else if ((locality_sel === "" || !locality_sel) && booking_through) {
        setlocality_sel_error(true);
        shipper.scrollIntoView();
      }
      else if (consignee_n === "" && !booking_through) {
        setconsignee_error(true);
        doc_no_scroll.scrollIntoView();
      }
      else if ((consginee_st === "" || !consginee_st) && !booking_through) {
        setstate_error_c(true);
        consignee.scrollIntoView();
      } else if (consginee_c === "" && !booking_through) {
        setcity_error_c(true);
        consignee.scrollIntoView();
      } else if (consignee_pincode === "" && !booking_through) {
        setpincode_list_error_c(true);
        consignee.scrollIntoView();
      } else if ((locality_sel_to === "" || !locality_sel_to) && booking_through) {
        setlocality_sel_to_error(true);
        consignee.scrollIntoView();
      }
      else if (locality_c === "" && !booking_through) {
        setlocality_error_c(true);
        consignee.scrollIntoView();
      } else if (commodity === "" || !commodity) {
        setcommodity_error(true);
        tariff_info.scrollIntoView();
      } else if (delivery_type === "LOCAL" && local_delivery_type === "" && order_type !== "Airport To Airport") {
        setlocal_delivery_type_error(true);
        tariff_info.scrollIntoView();
      } else if (d_cod === "" && order_type !== "Airport To Airport") {
        setd_cod_error(true);
        tariff_info.scrollIntoView();
      } else if (order_type !== "Airport To Airport" &&
        cal_type === "DIMENSION" &&
        (length === "" || breadth === "" || height === "" || pieces === "")
      ) {
        alert("Please Add Dimensions Details");
      } else if (order_type !== "Airport To Airport" &&
        (length !== "" || breadth !== "" || height !== "" || pieces !== "") &&
        (length === "" || breadth === "" || height === "" || pieces === "")
      ) {
        alert(
          "Dimensions All Details Is Required"
        );
      } else if (order_type !== "Airport To Airport" && total_no_of_pieces !== parseInt(values.total_quantity)) {
        alert(
          "Total Number Of Pieces Is Not Equal To Total Number Of Quantity"
        );
      } else if (d_cod === "Yes" && transportation_cost === "") {
        settransportation_cost_err(true);
      } else if (booking_date === "") {
        alert("Please Add Booking Date");
      } else if (
        order_type === "Issue" &&
        returned_data[0].issue.length === 0 &&
        returned_data[0].issue_notreceived.length === 0
      ) {
        alert("This Docket Number Does Not Have Any Issue");
      }
      else if (row2[row2.length - 1][0].length !== 12 && row2[row2.length - 1][0].length !== 0) {
        alert("Eway Bill Number Must Be 12 Digit");
      }
      else {
        let total = 0;
        let hasInvalidData = false;
        for (let i = 0; i < row2.length; i++) {
          total += parseInt(row2[i][3]);
          const data = row2[i][0].trim();

          if (data.length === 12 && !/^.{1,11}$/.test(data)) {
            hasInvalidData = true;
            break;
          }
        }
        if (total >= 50000 && !hasInvalidData) {
          alert(`Your invoice amount is "${total}" and you don't have a valid EwayBill number.`);
        }
        isupdating ? update_order(values) : setShowOrder(true);
      }
    },
  });

  //Barcode Box
  const [box_bq, setbox_bq] = useState("");
  let dimension_list8 = [box_bq];
  const [row6, setrow6] = useState([dimension_list8]);

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

  // Get destination city
  const getDes_Cities = (place_id, filter_by) => {
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

  const check_ewb_attached = (ewb_no) => {
    axios
      .get(ServerAddress + "analytic/check_exits_eway/?ewb_no=" + ewb_no, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(function (response) {
        if (response.data.result === true) {
          dispatch(setShowAlert(true));
          dispatch(
            setDataExist(`${ewb_no} Is Already Attached To Some Docket`)
          );
          dispatch(setAlertType("danger"));
        } else {
          // if (ewb_no.length === 12 && type==="Invoice") {
          //   alert("-=---22---")
          //   // get_eway_detail(e_waybill_inv, "no")
          // }
          // if(eway_detail_l?.length === 0 && type==="Ewaybill"){
          // if(ewb_no.length === 12  && type==="Ewaybill"){
          get_eway_detail(ewb_no, "yes");
          // }
        }
      })
      .catch((error) => {
        alert(`Error Happen while Getting data  Data ${error}`);
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
  // const getorder_delivery_data = (order_id) => {
  //   axios
  //     .get(
  //       ServerAddress +
  //       "booking/get_delivery_info/?order_id=" +
  //       order_id,
  //       {
  //         headers: { Authorization: `Bearer ${accessToken}` },
  //       }
  //     )
  //     .then((response) => {
  //       console.log("response-----del----", response.data)
  //       // setdelivery_info(response.data[0]);
  //     })
  //     .catch((err) => {
  //       alert(`Error Occur while Order Delivery Info, ${err}`);
  //     });
  // };
  //  Post Invoice Image data

  //Post Order Image
  const send_order_image = async (awb) => {
    let newrow3 = row3.filter((e) => e[0] !== "" && e[1] !== "");
    let newrow4 = row4.filter((e) => e[2] !== "" && e[3] !== "");
    const docket_imageform = new FormData();
    if (newrow3.length !== 0 || newrow4.length !== 0) {
      docket_imageform.append(`awb_no`, awb);
      docket_imageform.append(
        "docketcount",
        row3[0][0] !== "" ? row3.length : 0
      );
      if (newrow3.length !== 0 && newrow3[0][0] !== "") {
        for (let index = 0; index < newrow3.length; index++) {
          docket_imageform.append(
            `DocketImage${index}`,
            newrow3[index][0],
            newrow3[index][0]?.name
          );
          docket_imageform.append(
            `DocketImageCaption${index}`,
            newrow3[index][1]
          );
          docket_imageform.append(`id`, 0);
        }
      }

      docket_imageform.append(
        "invoice_count",
        row4.length
      );
      // if (row4[row4.length-1][2] !== "" &&  row4[row4.length-1][3] !== "") {
      for (let index = 0; index < row4.length; index++) {
        if (row4[index][4]) {
          docket_imageform.append(
            `InvoiceImage${index}`,
            row4[index][4],
            row4[index][4]?.nane
          );
        }
        docket_imageform.append(`invoice_date${index}`, row4[index][1]);
        docket_imageform.append(`invoice_no${index}`, row4[index][2]);
        docket_imageform.append(`invoice_amount${index}`, row4[index][3]);
        docket_imageform.append(`ewayBill_no${index}`, row4[index][0]);
      }
      // }

      await axios
        .post(ServerAddress + "booking/add-order-images/", docket_imageform, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "content-type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.data.Data === "Done") {
            // dispatch(setShowAlert(true));
            // dispatch(setDataExist(`Image Has Been Saved Successfully !`));
            // dispatch(setAlertType("success"));
          }
        })
        .catch((err) => {
          console.warn("Error While Post Image", err);
        });
    }
  };

  // Post Order Data
  const send_order_data = async (values, val) => {
    try {
      setIsLoading(true)
      const response = await axios.post(
        ServerAddress + "booking/add_order/",
        {
          // organization: user.organization,
          is_warehouse: is_warehouse,
          warehouse: is_warehouse ? warehouse_id : null,
          shipper_na_state: (!locality_id && eway_confirm) ? toTitleCase(from_state_eway).toUpperCase() : "",
          shipper_na_pincode: (!locality_id && eway_confirm) ? eway_list?.fromPincode : "",
          shipper_na_locality: (!locality_id && eway_confirm) ? toTitleCase(locality_sel).toUpperCase() : "",
          consignee_na_state: (!locality_id_to && eway_confirm) ? toTitleCase(to_state_eway).toUpperCase() : "",
          consignee_na_pincode: (!locality_id_to && eway_confirm) ? eway_list?.toPincode : "",
          consignee_na_locality: (!locality_id_to && eway_confirm) ? toTitleCase(locality_sel_to).toUpperCase() : "",
          type: type ? type.toUpperCase() : null,
          assettype_remarks: assettype_remarks,
          docket_no: (entry_type_btn === "AUTO GENERATE" && order_type !== "Airport To Airport") ? "" : docket_no_value,
          entry_type: order_type !== "Airport To Airport" ? entry_type_btn : "MANUALLY",
          delivery_type: order_type !== "Airport To Airport" ? String(delivery_type).toUpperCase() : "DOMESTIC",
          order_created_branch: user.home_branch,
          transportation_mode:
            delivery_type === "LOCAL"
              ? "LOCAL"
              : order_type === "Airport To Airport" ? "AIR" : String(transport_mode).toUpperCase(),
          // delivery_mode: delivery_type === "LOCAL" ? "LOCAL" : String(delivery_mode).toUpperCase(),
          delivery_mode: "DOOR TO DOOR",
          order_channel: "WEB",
          billto: billto_id,
          client: client_id,
          shipper: eway_confirm
            ? eway_list.fromTrdName
            : shipper_n.toUpperCase(),
          consignee: eway_confirm
            ? eway_list.toTrdName
            : consignee_n.toUpperCase(),
          booking_at: booking_date,
          local_delivery_type: String(local_delivery_type).toUpperCase(),
          cold_chain: cold_chain,
          // cold_chain: cold_chain ? true : false,
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
          asset_type: asset_prov
            ? String(asset_info_selected).toUpperCase()
            : "NONE",
          asset:
            asset_info_selected === "With Box" &&
              asset_info_selected !== "None" &&
              cold_chain
              ? box
              // : asset_info_selected === "With Logger" &&
              //   asset_info_selected !== "None" &&
              //   cold_chain
              //   ? logger
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
          shipper_location: eway_confirm ? locality_id : locality_id_f,
          consignee_location: eway_confirm ? locality_id_to : locality_id_f_c,
          with_ewayBill: eway_confirm ? "True" : "False",
          eway_bill_no: ewaybill_no,
          consignee_address1: eway_confirm
            ? eway_list.toAddr1.toUpperCase() +
            "," +
            eway_list.toAddr2.toUpperCase()
            : consignee_address.toUpperCase(),
          shipper_address1: eway_confirm
            ? eway_list.fromAddr1.toUpperCase() +
            "," +
            eway_list.fromAddr2.toUpperCase()
            : shipper_address.toUpperCase(),

          billto_name: billto.toUpperCase(),
          shipper_address: shipper_add_1.toUpperCase(),
          consignee_address: consignee_add_1.toUpperCase(),
          order_origin: all_shipper_details ? all_shipper_details?.toUpperCase() : "",
          order_destination: all_consignee_details ? all_consignee_details?.toUpperCase() : "",
          origin_city: city ? city?.toUpperCase() : "",
          origin_state: state ? state?.toUpperCase() : "",
          origin_pincode: pincode ? pincode : "",
          origin_locality: locality ? locality?.toUpperCase() : "",
          destination_city: consginee_c ? consginee_c?.toUpperCase() : "",
          destination_state: consginee_st ? consginee_st?.toUpperCase() : "",
          destination_pincode: consignee_pincode ? consignee_pincode : "",
          destination_locality: locality_c ? locality_c?.toUpperCase() : "",
          billto_name: billto.toUpperCase(),
          // eway_detail: eway_confirm ? eway_detail_l : null,
          eway_detail: eway_confirm ? eway_value : [],
          is_docket_entry: user.is_docket_entry ? user.is_docket_entry : false,
          starting_docket_no: user.starting_docket_no
            ? user.starting_docket_no
            : "",
          shipper_contact_no: shipper_contact_no ? shipper_contact_no : null,
          consignee_contact_no: consignee_contact_no ? consignee_contact_no : null,
          // barcode_no: row6,
          barcode_no: [],
          linked_order: (order_type === "New" || order_type === "Airport To Airport") ? null : linked_order,
          order_type: order_type.toUpperCase(),

          cm_current_department: user.user_department,
          cm_current_status:
            user.user_department_name + " " + user.designation_name ===
              "DATA ENTRY OPERATOR" ||
              user.user_department_name + " " + user.designation_name ===
              "CUSTOMER SERVICE EXECUTIVE"
              ? "NOT APPROVED"
              : cm_current_status.toUpperCase(),
          cm_transit_status:
            user.user_department_name + " " + user.designation_name ===
              "DATA ENTRY OPERATOR" ||
              user.user_department_name + " " + user.designation_name ===
              "CUSTOMER SERVICE EXECUTIVE"
              ? "NOT APPROVED"
              : cm_current_status.toUpperCase(),
          invoice_image: (row2[row2.length - 1][0] === "" && row2[row2.length - 1][2] === "" && row2[row2.length - 1][3] === "" && row2[row2.length - 1][4] === "" && row2[row2.length - 1][5] === "") ? [] : row2,
          order_image: (row1[row1.length - 1][0] === "" && row1[row1.length - 1][1] === "") ? [] : row1,

          rate_class: (order_type === "Airport To Airport" && values.rate_class) ? toTitleCase(values.rate_class).toUpperCase() : "",
          coloader: (order_type === "Airport To Airport" && coloader_id) ? coloader_id : null,
          airlines_name: (order_type === "Airport To Airport" && values.airlines_name) ? toTitleCase(values.airlines_name).toUpperCase() : "",
          flight_no: (order_type === "Airport To Airport" && values.flight_no) ? values.flight_no : "",
          no_of_bags: (order_type === "Airport To Airport" && values.no_of_bags) ? values.no_of_bags : 0,
          rate: (order_type === "Airport To Airport" && values.rate) ? values.rate : 0,
          other_charge: (order_type === "Airport To Airport" && values.other_charge) ? values.other_charge : 0,
          carrier_charge: (order_type === "Airport To Airport" && values.carrier_charge) ? values.carrier_charge : 0,
          handling_charge: (order_type === "Airport To Airport" && values.handling_charge) ? values.handling_charge : 0,
          tsp: (order_type === "Airport To Airport" && values.tsp) ? values.tsp : 0,
          tax_slab: (order_type === "Airport To Airport" && tax_slab) ? tax_slab : "",
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      // .then(function (response) {
      if (response.data.status === "success") {
        setIsLoading(false)
        if (val === "yes") {
          setewaybill_no("")
          seteway_value([])
          setrow2([["", val, "", "", "", "", ""]])
          seteway_list([])
          seteway_value([])
          seteway_detail_l([])
          setlocality_sel("")
          setlocality_sel_to("")
          setrow4([["", val, "", "", "", "", ""]])
          settoggle_order(true);
          setShowOrder(false);
          setrow([["", "", "", ""]])
          setconsignee_n("")
          setconsginee_st("")
          setstate_id_f_c(0)
          setconsginee_c("")
          setcity_id_c(0)
          setconsignee_pincode("")
          setconsignee_p_id(0)
          setlocality_c("")
          setlocality_id_f_c(0)
          setcommodity("")
          setlocal_delivery_type("")
          setrow1([["", "", ""]])
          seteway_confirm(false)
          setbooking_through(false)
          setfrom_address([])
          setto_address([])
          seteway_pincode_c("")
          seteway_pincode_s("")
          setshow_pincode(false)
        }
        else {
          setShowOrder(false);
          navigate("/booking/orders");
        }
        // eway_confirm && update_ewayBill(response.data.data.docket_no, response.data.data.eway_bill_no,response.data.data.booking_at)
        // if (row4[row4.length - 1][2] !== "" && row4[row4.length - 1][3] !== "") {
        //   send_order_image(response.data.data.docket_no);
        // }
        dispatch(setToggle(true));
        setsubmit_btn(true);
        setresponse_awb_no(response.data.awb_no);
        dispatch(setShowAlert(true));
        dispatch(setDataExist(`Order  ${docket_no_value} Added sucessfully`));
        dispatch(setAlertType("success"));
        // setShowOrder(true);
      }
      else if (response.data === "duplicate") {
        setIsLoading(false)
        dispatch(setShowAlert(true));
        dispatch(setDataExist(`Docket Number "${docket_no_value}"  Already Exist`));
        dispatch(setAlertType("warning"));
      }
      else {
        setIsLoading(false)
        dispatch(setShowAlert(true));
        dispatch(setDataExist(`Somthing Went Wrong`));
        dispatch(setAlertType("warning"));
      }
      // })
    } catch (error) {
      setIsLoading(false)
      alert(`Error Happen while posting Order  Data ${error}`);
    }
  };
  // Update Order
  const update_order = async (values) => {
    setIsLoading(true)
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
      consignee_address_line: consignee_address, //
      consignee_city: destinationcity,
      consignee_contact_no: consignee_contact_no ? consignee_contact_no : "",
      consignee_locality: locality_c,
      consignee_name: consignee_n,
      consignee_pincode: consignee_pincode,
      // delivery_mode: delivery_mode,
      delivery_type: delivery_type.toUpperCase(),
      entry_type: entry_type_btn,

      local_delivery_type: local_delivery_type,
      remarks: values.remarks,

      shipper_address_line: shipper_address,
      shipper_city: origincity,
      shipper_contact_no: shipper_contact_no ? shipper_contact_no : "",
      shipper_locality: shipper_locality,
      shipper_name: shipper_n,
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
    try {
      const response = await axios.put(
        ServerAddress + "booking/update_order/" + id,
        {
          change_fields: change_fields,
          is_warehouse: is_warehouse,
          warehouse: is_warehouse ? warehouse_id : null,
          shipper_na_state: (!locality_id && eway_confirm) ? toTitleCase(from_state_eway).toUpperCase() : "",
          shipper_na_pincode: (!locality_id && eway_confirm) ? eway_list?.fromPincode : "",
          shipper_na_locality: (!locality_id && eway_confirm) ? toTitleCase(locality_sel).toUpperCase() : "",
          consignee_na_state: (!locality_id_to && eway_confirm) ? toTitleCase(to_state_eway).toUpperCase() : "",
          consignee_na_pincode: (!locality_id_to && eway_confirm) ? eway_list?.toPincode : "",
          consignee_na_locality: (!locality_id_to && eway_confirm) ? toTitleCase(locality_sel_to).toUpperCase() : "",
          assettype_remarks: assettype_remarks,
          type: type?.toUpperCase(),
          // organization: user.organization,
          docket_no: docket_no_value,
          entry_type: entry_type_btn,
          delivery_type: String(delivery_type)?.toUpperCase(),
          order_created_branch: user.home_branch,
          transportation_mode:
            delivery_type === "LOCAL"
              ? "LOCAL"
              : order_type === "Airport To Airport" ? "AIR" : String(transport_mode).toUpperCase(),
          // delivery_mode: delivery_type === "LOCAL" ? "LOCAL" : String(delivery_mode).toUpperCase(),
          delivery_mode: "DOOR TO DOOR",
          order_channel: "WEB",
          billto: billto_id,
          client: client_id,
          // shipper: eway_confirm ? eway_list.fromTrdName : shipper_n,
          // consignee: eway_confirm ?eway_list.,
          booking_at: booking_date,
          local_delivery_type: String(local_delivery_type)?.toUpperCase(),
          cold_chain: cold_chain,
          actual_weight: actual_weigth,
          total_quantity: values.total_quantity,
          cod: String(d_cod)?.toUpperCase(),
          transportation_cost: d_cod === "Yes" ? transportation_cost : null,
          remarks: values.remarks,
          modified_by: user.id,
          booking_type: String(type_of_booking)?.toUpperCase(),
          commodity: commodity_id,
          packageList: row,
          deleted_packages: deleted_packages_id,
          shipper_contact_no: shipper_contact_no ? shipper_contact_no : null,
          consignee_contact_no: consignee_contact_no ? consignee_contact_no : null,
          InvoiceList: [],
          notification: true,
          asset_type:
            cold_chain === true && asset_prov
              ? String(asset_info_selected)?.toUpperCase()
              : "NONE",
          asset:
            asset_info_selected === "With Box" &&
              asset_info_selected !== "None" &&
              cold_chain
              ? box
              // : asset_info_selected === "With Logger" &&
              //   asset_info_selected !== "None" &&
              //   cold_chain
              //   ? logger
              : asset_info_selected === "With Box + With Logger" &&
                asset_info_selected !== "None" &&
                cold_chain
                ? both
                : [],

          client_name: client?.toUpperCase(),
          branch_name: user.branch_nm ? user.branch_nm : "BRANCH NOT SET",
          shipper_name: shipper_n?.toUpperCase(),
          consignee_name: consignee_n?.toUpperCase(),
          commodity_name: commodity?.toUpperCase(),
          shipper_address: shipper_address ? shipper_address?.toUpperCase() : "",
          consignee_address: consignee_address ? consignee_address?.toUpperCase() : "",
          order_origin: all_shipper_details ? all_shipper_details?.toUpperCase() : "",
          order_destination: all_consignee_details ? all_consignee_details?.toUpperCase() : "",
          origin_city: city ? city?.toUpperCase() : "",
          origin_state: state ? state?.toUpperCase() : "",
          origin_pincode: pincode ? pincode : "",
          origin_locality: locality ? locality?.toUpperCase() : "",
          destination_city: consginee_c ? consginee_c?.toUpperCase() : "",
          destination_state: consginee_st ? consginee_st?.toUpperCase() : "",
          destination_pincode: consignee_pincode ? consignee_pincode : "",
          destination_locality: locality_c ? locality_c?.toUpperCase() : "",
          billto_name: billto?.toUpperCase(),
          shipper_location: shipper_locality_id,
          consignee_location: consignee_locality_id,
          assetdeleted_ids: assetdeleted_ids,
          // assetold_ids: assetold_ids,
          assetnew_ids: assetnew_ids,
          linked_order: (order_type === "New" || order_type === "Airport To Airport") ? null : linked_order,
          order_type: order_type?.toUpperCase(),
          eway_detail: eway_confirm ? eway_value : [],
          cm_transit_status: status_toggle === true ? cm_current_status : "",
          cm_current_status: cm_current_status?.toUpperCase(),
          cm_remarks: toTitleCase(message)?.toUpperCase(),
          shipper: shipper_n?.toUpperCase(),
          consignee: consignee_n?.toUpperCase(),
          // shipper: eway_confirm ? eway_list.fromTrdName : (shipper_n).toUpperCase(),
          // consignee: eway_confirm ? eway_list.toTrdName : (consignee_n).toUpperCase(),
          shipper_location: eway_confirm ? locality_id : locality_id_f,
          consignee_location: eway_confirm ? locality_id_to : locality_id_f_c,
          with_ewayBill: eway_confirm ? "True" : "False",
          eway_bill_no: ewaybill_no,
          consignee_address1: consignee_address?.toUpperCase(),
          shipper_address1: shipper_address?.toUpperCase(),
          invoice_image: (row2[row2.length - 1][0] === "" && row2[row2.length - 1][2] === "" && row2[row2.length - 1][3] === "" && row2[row2.length - 1][4] === "" && row2[row2.length - 1][5] === "") ? [] : row2,
          order_image: (row1[row1.length - 1][0] === "" && row1[row1.length - 1][1] === "") ? [] : row1,

          rate_class: (order_type === "Airport To Airport" && values.rate_class) ? toTitleCase(values.rate_class).toUpperCase() : "",
          coloader: (order_type === "Airport To Airport" && coloader_id) ? coloader_id : null,
          airlines_name: (order_type === "Airport To Airport" && values.airlines_name) ? toTitleCase(values.airlines_name).toUpperCase() : "",
          flight_no: (order_type === "Airport To Airport" && values.flight_no) ? values.flight_no : "",
          no_of_bags: (order_type === "Airport To Airport" && values.no_of_bags) ? values.no_of_bags : 0,
          rate: (order_type === "Airport To Airport" && values.rate) ? values.rate : 0,
          other_charge: (order_type === "Airport To Airport" && values.other_charge) ? values.other_charge : 0,
          carrier_charge: (order_type === "Airport To Airport" && values.carrier_charge) ? values.carrier_charge : 0,
          handling_charge: (order_type === "Airport To Airport" && values.handling_charge) ? values.handling_charge : 0,
          tsp: (order_type === "Airport To Airport" && values.tsp) ? values.tsp : 0,
          tax_slab: (order_type === "Airport To Airport" && tax_slab) ? tax_slab : "",
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.data.status === "success") {
        setIsLoading(false)
        // eway_confirm && update_ewayBill(response.data.data.docket_no, response.data.data.eway_bill_no)
        // send_order_image(order.docket_no);
        dispatch(setToggle(true));
        dispatch(setDataExist(`Order Updated Sucessfully`));
        dispatch(setAlertType("info"));
        dispatch(setShowAlert(true));
        if (!check_ord) {
          navigate("/booking/orders");
        }
        else {
          setselected_docket(false)
        }
      }
      else {
        setIsLoading(false)
        dispatch(setShowAlert(true));
        dispatch(setDataExist(`Somthing Went Wrong`));
        dispatch(setAlertType("warning"));
      }
    } catch (error) {
      setIsLoading(false)
      alert(`Error While  Updateing Orders,${error}`);
    }
  };

  const [data, setdata] = useState(false);
  const [togclient, settogclient] = useState(false)
  const [togcommodity, settogcommodity] = useState(false)

  const getBillto = () => {
    let b_temp2 = [];
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
        settogclient(true);
        b_data = response.data.results;
        if (response.data.results.length > 0) {
          if (response.data.next === null) {
            setbillto_loaded(false);
          } else {
            setbillto_loaded(true);
          }
          if (billto_page === 1) {
            b_temp2 = response.data.results.map((v) => [
              v.id,
              toTitleCase(v.name),
            ]);
          } else {
            b_temp2 = [
              ...billto_list,
              ...response.data.results.map((v) => [v.id, toTitleCase(v.name)]),
            ];
          }
        }
        setbillto_count(billto_count + 2);
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
        `master/all_clients/?bill_to=${billto_id}&search=${""}&p=${client_page}&records=${10}&name_search=${search_client}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        data = response.data.results;
        let com_list_cl = data.map((v) => [v.id, v.commodities]);
        setclients_commidities_lists(com_list_cl);
        if (response.data.results.length > 0) {
          if (response.data.next === null) {
            setclient_loaded(false);
          } else {
            setclient_loaded(true);
          }
          if (client_page === 1) {
            temp2 = response.data.results.map((v) => [
              v.id,
              toTitleCase(v.name),
            ]);
          } else {
            temp2 = [
              ...client_list,
              ...response.data.results.map((v) => [v.id, toTitleCase(v.name)]),
            ];
          }
        }

        setclient_count(client_count + 2);
        setclient_list(temp2);
        // temp2 = [...new Set(temp2.map((v) => `${v}`))].map((v) => v.split(","));
      })
      .catch((err) => {
        alert(`Error Occur in Get Data ${err}`);
      });
  };

  // Get Commodity
  const getCommidityData = () => {
    let data = [];
    let temp3 = [];
    axios
      .get(
        ServerAddress +
        // &commodity_name_search=${search_commodity}&data=all
        `master/get_clientcommodity/?search=${search_commodity}&p=${page}&records=${10}&client=${client_id}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        settogcommodity(true)
        if (response.data.next === null) {
          setcommodity_loaded(false);
        } else {
          setcommodity_loaded(true);
        }
        if (response.data.results.length > 0) {
          data = response.data.results;
          if (page === 1) {
            temp3 = data.map((v) => [v.id, toTitleCase(v.commodity_name)]);
          } else {
            temp3 = [
              ...client_commidities_list,
              ...data.map((v) => [v.id, toTitleCase(v.commodity_name)]),
            ];
          }
          // for (let index = 0; index < data.length; index++) {
          //   temp3.push([
          //     data[index].id,
          //     toTitleCase(data[index].commodity_name),
          //   ]);
          // }
          // temp3 = [...new Set(temp3.map((v) => `${v}`))].map((v) =>
          //   v.split(",")
          // );
          setcommodity_count(commodity_count + 2);
          // setcommodity_data_list(temp3);
          setclient_commidities_list(temp3);
        } else {
          setclient_commidities_list([]);
        }
      })
      .catch((err) => {
        alert(`Error Occur in Get Data ${err}`);
      });
  };

  const [new_datas, setnew_datas] = useState([]);
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
        let temps = [];
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
            temps.push(
              order_asset.id,
              order_asset.asset_id +
              "-" +
              order_asset.box_type +
              "-" +
              order_asset.product_id
            );
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
            temps.push(
              order_asset.id,
              order_asset.asset_id +
              "-" +
              order_asset.box_type +
              "-" +
              order_asset.manufacturer_name
            );
          }
        }
        setasset_idlist(deleted_id);
        setbox_list_2(temp);
        setLogger_Selected(temp2);
        setnew_datas(temps);

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
        //Can Be used
        // setbox_list_1(other_boxes);
        // setLogger_list(other_logger);
      })
      .catch((err) => {
        alert(`Error Occur in Get , ${err}`);
      });
  };

  //  Get Asset Details
  const getassetData = (type) => {
    let data = [];
    let box = [...box_list_1];
    let logger = [...Logger_list];

    axios
      .get(
        ServerAddress +
        `master/get_asset_details/?p=${type === "logger" ? Logger_page : box_list_page
        }&records=${10}&asset_type=${type === "logger" ? "WITH LOGGER" : "WITH BOX"}&product_id_search=${type === "logger" ? search_logger : search_box
        }`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        data = response.data.results;
        if (data.length > 0) {
          if (type === "logger") {
            if (response.data.next === null) {
              setlogger_loaded(false);
            } else {
              setlogger_loaded(true);
            }
            if (Logger_page === 1) {
              logger = response.data.results.map(
                (v) =>
                  v.asset_type === "LOGGER" && [
                    v.id,
                    v.asset_id + "-" + v.box_type + "-" + v.manufacturer_name,
                  ]
              );
            } else {
              logger = [
                ...Logger_list,
                ...response.data.results.map(
                  (v) =>
                    v.asset_type === "LOGGER" && [
                      v.id,
                      v.asset_id + "-" + v.box_type + "-" + v.manufacturer_name,
                    ]
                ),
              ];
            }
            setlogger_count(logger_count + 2);
            setLogger_list(logger);
          } else {
            if (response.data.next === null) {
              setbox_loaded(false);
            } else {
              setbox_loaded(true);
            }
            // console.log("========", response.data.results)

            if (box_list_page === 1) {
              box = response.data.results.map(
                (v) =>
                  v.asset_type === "TEMPERATURE CONTROL BOX" && [
                    v.id,
                    v.asset_id + "-" + v.box_type + "-" + v.product_id,
                    v.id,
                    v.asset_id + "-" + v.box_type + "-" + v.manufacturer_name,
                  ]
              );
            } else {
              box = [
                ...box_list_1,
                ...response.data.results.map(
                  (v) =>
                    v.asset_type === "TEMPERATURE CONTROL BOX" && [
                      v.id,
                      v.asset_id + "-" + v.box_type + "-" + v.product_id,
                    ]
                ),
              ];
            }
            setbox_count(box_count + 2);
            // console.log("box========", box)
            setbox_list_1(box);
          }
        }
        else {
          if (type === "logger") {
            setLogger_list([]);
          }
          else {
            setbox_list_1([])
          }
        }

        // for (let index = 0; index < data.length; index++) {
        //   const element = data[index];
        //   if (element.asset_type === "TEMPERATURE CONTROL BOX") {
        //     box.push([
        //       element.id,
        //       element.asset_id +
        //       "-" +
        //       element.box_type +
        //       "-" +
        //       element.product_id,
        //     ]);
        //   } else {
        //     logger.push([
        //       element.id,
        //       element.asset_id +
        //       "-" +
        //       element.box_type +
        //       "-" +
        //       element.manufacturer_name,
        //     ]);
        //   }
        // }
        // logger = [...new Set(logger.map((v) => `${v}`))].map((v) =>
        //   v.split(",")
        // );
        // box = [...new Set(box.map((v) => `${v}`))].map((v) => v.split(","));
        // setbox_list_1(box);
        // setLogger_list(logger);
        if (isupdating && order_id !== "") {
          get_orderasset(order_id, box, logger);
        }
      })
      .catch((err) => {
        console.warn(`Error Occur in Get Data ${err}`);
      });
  };

  // Navigation At the time of Cancel
  const handleAction = () => {
    dispatch(setToggle(true));
    navigate("/booking/orders");
  };

  // Type Of Booking
  const booking_type = () => {
    if (delivery_type === "DOMESTIC" && location.state === null) {
      settype_of_booking(type_of_booking_list[0]);
    } else if (cold_chain === true && location.state === null) {
      settype_of_booking(type_of_booking_list[0]);
    } else if (nonecold_chain === true && location.state === null && delivery_type === "LOCAL") {
      settype_of_booking(type_of_booking_list[1]);
    } else if (location.state === null) {
      settype_of_booking(type_of_booking_list[1]);
    }
  };

  // useEffect(() => {
  //   if (location.state === null) {
  //     let date = new Date();
  //     let added_date_time =
  //       String(date.getDate()).length === 1
  //         ? "0" + String(date.getDate())
  //         : String(date.getDate());
  //     let month =
  //       String(date.getMonth() + 1).length === 1
  //         ? "0" + String(date.getMonth() + 1)
  //         : String(date.getMonth() + 1);
  //     let year = String(date.getFullYear());

  //     let hour =
  //       String(date.getHours()).length === 1
  //         ? "0" + String(date.getHours())
  //         : String(date.getHours());
  //     let minutes =
  //       String(date.getMinutes()).length === 1
  //         ? "0" + String(date.getMinutes())
  //         : date.getMinutes();
  //     setbooking_date(`${year}-${month}-${added_date_time}T${hour}:${minutes}`);
  //   }
  // }, []);

  useEffect(() => {
    if (location.state === null) {
      booking_type();
    }
  }, [cold_chain, delivery_type]);

  useEffect(() => {
    if (order_type === "Airport To Airport") {
      setcoldchain_error(false);
    }
  }, [order_type])


  useEffect(() => {
    let timeoutId;
    // if (asset_info_selected !== "None" && asset_info_selected && asset_info_selected === "With Logger") {
    //   timeoutId = setTimeout(() => {
    //   getassetData("logger");
    // }, 1);
    // }
    if (asset_info_selected !== "None" && asset_info_selected && asset_info_selected === "With Box + With Logger") {
      timeoutId = setTimeout(() => {
        getassetData("logger");
      }, 1);
    }
    return () => clearTimeout(timeoutId);
  }, [asset_info_selected, search_logger, Logger_page]);

  useEffect(() => {
    let timeoutId;
    if (asset_info_selected !== "None" && asset_info_selected && asset_info_selected === "With Box") {
      timeoutId = setTimeout(() => {
        getassetData("box");
      }, 1);
    }
    if (asset_info_selected !== "None" && asset_info_selected && asset_info_selected === "With Box + With Logger") {
      timeoutId = setTimeout(() => {
        getassetData("box");
      }, 1);
    }
    return () => clearTimeout(timeoutId);
  }, [asset_info_selected, search_box, box_list_page]);

  useEffect(() => {
    getBillto();
  }, [billto_page, search_billto]);

  useLayoutEffect(() => {
    if (billto_id !== 0) {
      setclient_page(1);
      setclient_count(1);
      setclient_bottom(103);
      setclient_loaded(true);
    }
  }, [billto_id]);

  useEffect(() => {
    let timeoutId;
    if (billto_id !== 0) {
      timeoutId = setTimeout(() => {
        getClient();
      }, 1);
    }
    return () => clearTimeout(timeoutId);
  }, [billto_id, search_client, client_page]);

  useEffect(() => {
    if (billto_id !== 0) {
      if (!isupdating && returned_data.length === 0) {
        setclient("");
        setclient_id("");
      }
    }
  }, [billto_id]);

  useEffect(() => {
    if (billto_id !== 0) {
      if (togclient && returned_data.length === 0 && !check_ord) {
        setclient("");
        setclient_id("");
      }
    }
  }, [billto_id]);

  useEffect(() => {
    if (isupdating) {
      settogclient(false)
    }
  }, [])

  useLayoutEffect(() => {
    if (client_id !== 0) {
      setpage(1);
      setcommodity_count(1);
      setcommodity_bottom(103);
      setcommodity_loaded(true);
    }
  }, [client_id]);

  useEffect(() => {
    let timeoutId;
    if (client_id !== 0 && client_id !== "") {
      timeoutId = setTimeout(() => {
        getCommidityData();
      }, 1);
    }
    return () => clearTimeout(timeoutId);
  }, [page, search_commodity, client_id, search_commodity]);

  useEffect(() => {
    if (client_id !== 0) {
      if (!isupdating && returned_data.length === 0) {
        setcommodity("");
        setcommodity_id("");
      }
    }
  }, [client_id]);

  useEffect(() => {
    if (client_id !== 0) {
      if (togcommodity && returned_data.length === 0 && !check_ord) {
        setcommodity("");
        setcommodity_id("");
      }
    }
  }, [client_id]);

  useEffect(() => {
    if (isupdating) {
      settogcommodity(false)
    }
  }, [])

  useEffect(() => {
    if (order_id !== "") {
      get_packages();
    }
  }, [order_id]);

  useEffect(() => {
    if (data === true && isupdating === true && returned_data.length === 0) {
      setclient_id(order.client);
    }
    if (location.state === null && order_type === "New") {
      setorigincity("");
      setorigincity_id("");
      setshipper_id("");
      setdestinationcity("");
      setdestinationcity_id("");
      setconsignee_id("");
    }
    // Setting Client Commidities After Selecting Client
    // if (client_id != 0 && clients_commidities_lists.length !== 0) {
    //   let sel_com = clients_commidities_lists.find((v) => v[0] == client_id)[1];
    //   let tmp_com_data_list = commodity_data_list.filter((v) =>
    //     sel_com.includes(parseInt(v[0]))
    //   );
    //   setclient_commidities_list(tmp_com_data_list);
    // }
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
  }, [shipper_id, shipperdata]);

  useEffect(() => {
    let selected_consignee = consigneedata.filter(
      (val) => val.id === consignee_id
    );
    setconsignee_details(selected_consignee[0]);
  }, [consignee_id, consigneedata]);

  // useLayoutEffect(() => {
  //   if (shipper_details) {
  //     setshipper_state(toTitleCase(shipper_details.state_name));
  //     setshipper_city(toTitleCase(shipper_details.city_name));
  //     setshipper_pincode(toTitleCase(shipper_details.pincode_name));
  //     setshipper_add_1(toTitleCase(shipper_details.address_line1));
  //     setshipper_locality(toTitleCase(shipper_details.locality_name));
  //     setshipper_locality_id(shipper_details.location);
  //   }
  // }, [shipper_details, shipper_id]);

  // useLayoutEffect(() => {
  //   console.log("consignee_details========", consignee_details)
  //   if (consignee_details) {
  //     setconsignee_state(toTitleCase(consignee_details.state_name));
  //     setconsignee_city(toTitleCase(consignee_details.city_name));
  //     setconsignee_pincode(toTitleCase(consignee_details.pincode_name));
  //     setconsignee_add_1(toTitleCase(consignee_details.address_line1));
  //     setconsignee_locality(toTitleCase(consignee_details.locality_name));
  //     setconsignee_locality_id(consignee_details.location);
  //   }
  // }, [consignee_details,consignee_id]);

  useEffect(() => {
    if (location.state === null && returned_data.length === 0) {
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

  // useEffect(() => {
  //   let date = new Date();
  //   let date_n =
  //     String(date.getDate()).length === 1
  //       ? "0" + String(date.getDate())
  //       : String(date.getDate());
  //   let month =
  //     String(date.getMonth() + 1).length === 1
  //       ? "0" + String(date.getMonth() + 1)
  //       : String(date.getMonth() + 1);
  //   let year = String(date.getFullYear());
  //   settoday(`${year}-${month}-${date_n}`);
  // }, []);

  // useEffect(() => {
  //   if(isupdating && order.is_delivered)
  //   {
  //     getorder_delivery_data(order.id);
  //   }
  // }, [isupdating,order]);
  const [check_ord, setcheck_ord] = useState(false)

  useLayoutEffect(() => {
    try {
      if (location.state.is_checkermaker) {
        setcheck_ord(true)
      }
      else {
        setcheck_ord(false)
      }
      let order_data = location.state.order;
      console.log("order_data-----", order_data)
      setisupdating(true);
      setis_warehouse(order_data.is_warehouse)
      setwarehouse(order_data.name ? toTitleCase(order_data.name) : "")
      setshipper_n(toTitleCase(order_data.shipper));
      setm_shipper(toTitleCase(order_data.shipper));
      setorder_type(toTitleCase(order_data.order_type));
      settax_slab(order_data.tax_slab)
      setcoloader(order_data.coloader_name ? toTitleCase(order_data.coloader_name) : "")
      setcoloader_id(order_data.coloader)
      setlinked_order(
        order_data.order_type === "RETURN" || order_data.order_type === "ISSUE"
          ? order_data.linked_order_value
          : ""
      );
      if (order_data.assettype_remarks === "CREDO BOX AND LOGGER RETURN") {
        setis_credo_box_return(true)
      }
      else if (order_data.assettype_remarks === "CREDO BOX RETURN ONLY") {
        setis_credo_return(true)
      }
      else if (order_data.assettype_remarks === "LOGGER RETURN ONLY") {
        setis_logger_return(true)
      }
      seteway_pincode_s(order_data.shipper_pincode ? order_data.shipper_pincode : order_data.shipper_na_pincode)
      seteway_pincode_c(order_data.consignee_pincode ? order_data.consignee_pincode : order_data.consignee_na_pincode)

      setto_state_eway(toTitleCase(order_data.consignee_na_state))
      setfrom_state_eway(toTitleCase(order_data.shipper_na_state))
      settype(toTitleCase(order_data.type))
      setm_origin(order_data.mobile_origin ? toTitleCase(order_data.mobile_origin) : null)
      setm_destination(order_data.mobile_destination ? toTitleCase(order_data.mobile_destination) : null)
      setstate(toTitleCase(order_data.shipper_state));
      setlocality_id_f(order_data.shipper_location);
      setcity(toTitleCase(order_data.shipper_city));
      setconsignee_n(toTitleCase(order_data.consignee));
      setm_consignee(toTitleCase(order_data.consignee));
      setpincode(order_data.shipper_pincode);
      setconsginee_st(toTitleCase(order_data.consignee_state));
      // setlocality_sel_to(toTitleCase(order_data.consignee_locality ? order_data.consignee_locality : locslity_to_list?.length === 0 ? order_data.consignee_na_locality : ""));
      setlocality_id_to(order_data.consignee_location);
      // setlocality_sel(toTitleCase(order_data.shipper_locality ? order_data.shipper_locality : locality_list?.length === 0 ? order_data.shipper_na_locality : ""));
      setlocality_id(order_data.shipper_location);
      setconsignee_address(toTitleCase(order_data.consignee_address1));
      setconsginee_c(toTitleCase(order_data.consignee_city));
      setconsignee_pincode(order_data.consignee_pincode);
      setlocality_c(toTitleCase(order_data.consignee_locality));
      setlocality_id_f_c(order_data.consignee_location);
      setlocality(toTitleCase(order_data.shipper_locality));
      setshipper_address(toTitleCase(order_data.shipper_address1));
      setewaybill_no(order_data.eway_bill_no);
      setbooking_through(order_data.with_ewayBill);
      seteway_confirm(order_data.with_ewayBill);
      seteway_detail_l(order_data);
      // seteway_confirm(order_data)
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

      setorder_id(order_data.id);
      setdocket_no_value(order_data.docket_no);
      dispatch(setCurOrderId(order_data.id));
      dispatch(setCurOrderDocketNo(order_data.docket_no));
      settype_of_booking(toTitleCase(order_data.booking_type));
      settransport_mode(toTitleCase(order_data.transportation_mode));
      // setdelivery_mode(order_data.delivery_mode);
      settransportation_cost(order_data.transportation_cost);

      setcommodity(order_data.commodity_name);
      setcommodity_id(order_data.commodity);
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
      setshipper_contact_no(order_data.shipper_contact_no);
      setconsignee_contact_no(order_data.consignee_contact_no);

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
        setasset_prov(false);
      } else {
        setasset_prov(true);
      }
      setcal_type(order_data.local_cal_type);

      setshipper_add_1(toTitleCase(order_data.shipper_address_line));
      setdestinationcity(toTitleCase(order_data.consignee_city));
      setdestinationcity_id(toTitleCase(order_data.consignee_city_id));

      let data = order_data.booking_at
      const dateTime = new Date(data);

      // Get the hours and minutes in the desired format
      const hours = String(dateTime.getUTCHours()).padStart(2, '0');
      const minutes = String(dateTime.getUTCMinutes()).padStart(2, '0');

      // Create the converted date and time string
      const convertedDateTime = `${dateTime.toISOString().slice(0, 10)}T${hours}:${minutes}`;
      setbooking_date(convertedDateTime)

    } catch (error) { }
  }, [location]);

  useEffect(() => {
    if (location?.state?.order?.qrcode_details?.length !== 0 && location.state !== null && location?.state?.order?.qrcode_details) {
      let data2 = []
      data2 = location?.state?.order?.qrcode_details.map(data => {
        return ([data?.barcode_no])

      })
      setrow6(data2)
    }

  }, [location])

  useEffect(() => {
    if (asset_info_selected === "With Box") {
      let box = box_list_2.map((data) => data[0]);
      box = [...new Set(box)];
      setbox(box);
    } else if (asset_info_selected === "With Logger") {
      let logger = Logger_Selected.map((data) => data[0]);
      logger = [...new Set(logger)];
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
    if (box !== [] && asset_info_selected === "With Box") {
      let item = asset_idlist.filter((p) => box.indexOf(p) === -1);
      setassetdeleted_ids(item);
      // let item2 = asset_idlist.filter((p) => box.indexOf(p) !== -1);
      // setassetold_ids(item2);
      let item3 = box.filter((a) => asset_idlist.indexOf(a) === -1);
      setassetnew_ids(item3);
    } else if (logger !== [] && asset_info_selected === "With Logger") {
      let item = asset_idlist.filter((p) => logger.indexOf(p) === -1);
      setassetdeleted_ids(item);
      // let item2 = asset_idlist.filter((p) => logger.indexOf(p) !== -1);
      // setassetold_ids(item2);
      let item3 = logger.filter((a) => asset_idlist.indexOf(a) === -1);
      setassetnew_ids(item3);
    } else {
      let item = asset_idlist.filter((p) => both.indexOf(p) === -1);
      setassetdeleted_ids(item);
      // let item2 = asset_idlist.filter((p) => both.indexOf(p) !== -1);
      // setassetold_ids(item2);
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

  const [ewaybill, setewaybill] = useState(false);

  // useLayoutEffect(() => {
  //   getCities("all", "all");
  // }, [origincity_page, origincity_search_item]);

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
    if (location.state !== null || returned_data.length !== 0) {
      if (cold_chain) {
        setcold_chain(true);
        setnonecold_chain(false);
      } else {
        setnonecold_chain(true);
        setcold_chain(false);
      }
    }
  }, [cold_chain, returned_data]);

  useEffect(() => {
    if (cold_chain && location.state === null && returned_data.length === 0) {
      setcold_chain(true);
      setnonecold_chain(false);
    }
  }, [cold_chain]);

  useEffect(() => {
    if (
      nonecold_chain &&
      location.state === null &&
      returned_data.length === 0
    ) {
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

  const labelArray = ["Step 1", "Step 2", "Step 3"];
  const [currentStep, updateCurrentStep] = useState(1);

  function updateStep(step) {
    if (step === 1) {
      setorder_active_btn("first");
    } else if (step === 2) {
      setorder_active_btn("second");
    } else {
      setorder_active_btn("third");
    }
    updateCurrentStep(step);
  }

  useEffect(() => {
    if (
      delivery_type === "LOCAL" &&
      location.state === null &&
      returned_data.length === 0 &&
      returned_data.length === 0
    ) {
      settransport_mode("LOCAL");
    } else if (
      delivery_type === "DOMESTIC" &&
      location.state === null &&
      returned_data.length === 0 &&
      returned_data.length === 0
    ) {
      settransport_mode("");
    } else if (
      delivery_type === "INTERNATIONAL" &&
      location.state === null &&
      returned_data.length === 0 &&
      returned_data.length === 0
    ) {
      settransport_mode("");
    }
  }, [delivery_type]);

  useEffect(() => {
    if (!asset_prov && location.state == null) {
      setasset_info_selected("");
    }
  }, [asset_prov]);

  //For Checker & Maker
  const [toggle_rejected, settoggle_rejected] = useState(false);
  const [message, setmessage] = useState("");
  const [message_error, setmessage_error] = useState(false);
  const [status_toggle, setstatus_toggle] = useState(false);
  const [cm_current_status, setcm_current_status] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    setmessage_error(false);
  };

  useEffect(() => {
    settoggle_rejected(false);
  }, []);

  const update_orderstatus = (id) => {
    axios
      .put(
        ServerAddress + "booking/reject_order/" + id,
        {
          cm_current_status: "REJECTED",
          cm_remarks: toTitleCase(message).toUpperCase(),
          // transit_status: current_status,
          change_fields: { cm_current_status: "REJECTED" },
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
          if (!check_ord) {
            navigate("/booking/orders");
          }
          else {
            setselected_docket(false)
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
    } else {
      update_orderstatus(order.id);
      setShow(false);
    }
  };

  useEffect(() => {
    if (
      user.user_department_name + " " + user.designation_name ===
      "CUSTOMER SERVICE EXECUTIVE" ||
      user.user_department_name + " " + user.designation_name ===
      "DATA ENTRY OPERATOR"
    ) {
      setcm_current_status("NOT APPROVED");
      setstatus_toggle(true);
    } else if (
      user.user_department_name + " " + user.designation_name ===
      "OPERATION MANAGER"
    ) {
      setcm_current_status("VERIFIED OPERATION MANAGER");
      setstatus_toggle(true);
    } else if (
      user.user_department_name + " " + user.designation_name ===
      "CUSTOMER SUPPORT MANAGER"
    ) {
      setcm_current_status("VERIFIED CUSTOMER SUPPORT MANAGER");
      setstatus_toggle(true);
    } else if (user.user_department_name === "ACCOUNTANT") {
      setcm_current_status("VERIFIED ACCOUNTANT");
      setstatus_toggle(true);
    } else if (
      user.user_department_name + " " + user.designation_name ===
      "ACCOUNT MANAGER"
    ) {
      setcm_current_status("VERIFIED ACCOUNT MANAGER");
      setstatus_toggle(true);
    } else if (user.user_department_name === "ADMIN" || user.is_superuser) {
      setcm_current_status("APPROVED");
      setstatus_toggle(true);
    } else {
      setcm_current_status("NOT APPROVED");
      // setstatus_toggle(false)
    }
  }, [user, isupdating]);

  //If Same Client
  // const [same_as, setsame_as] = useState(false)
  // const [showOrder, setShowOrder] = useState(false);
  // const [toggle_order, settoggle_order] = useState(false)

  const handleCloseOrder = () => setShowOrder(false);

  // const handleShowOrder = () => {
  //   setShowOrder(true);
  //   setsame_as(false)
  //   settoggle_order(false)
  // }

  const handleSubmitOrder = () => {
    // setShowOrder(false);
    settoggle_order(true);
    setsame_as(true);
  };

  //  step 1
  const [eway_confirm, seteway_confirm] = useState(false);
  const [eway_list, seteway_list] = useState([]);
  const [eway_pincode_s, seteway_pincode_s] = useState("")

  const [eway_pincode_c, seteway_pincode_c] = useState("")
  const [from_address, setfrom_address] = useState([]);
  const [to_address, setto_address] = useState([]);
  const [locality_list, setlocality_list] = useState([]);
  const [locality_id, setlocality_id] = useState("");
  const [locality_sel, setlocality_sel] = useState("");
  const [locality_sel_page, setlocality_sel_page] = useState(1)
  const [locality_sel_error, setlocality_sel_error] = useState(false)
  const [locality_sel_search_item, setlocality_sel_search_item] = useState("")
  const [locality_sel_loaded, setlocality_sel_loaded] = useState(false)
  const [locality_sel_count, setlocality_sel_count] = useState(1)
  const [locality_sel_bottom, setlocality_sel_bottom] = useState(103)

  const [eway_detail_l, seteway_detail_l] = useState([]);
  const [eway_value, seteway_value] = useState([])

  const get_eway_detail = (eway, is_eway) => {
    axios
      .get(
        EServerAddress + `ezewb/v1/ewb/data?ewbNo=${eway}&gstin=${gstin_no}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${business_access_token}`,
          },
        }
      )
      .then(function (response) {
        if (response.data.response !== null && typeof (response.data) !== "string") {
          // if (response.data.length > 0) {
          // alert("----app----")
          if (is_eway === "yes") {
            if (location.state === null) {
              seteway_detail_l(response.data.response);
            }

            // seteway_value([...eway_value, response.data.response])
            seteway_value(prevEwayValue => {
              const newEwayValue = [...prevEwayValue, response.data.response];
              const uniqueEwayValue = Array.from(new Set(newEwayValue.map(item => item.ewbNo)))
                .map(ewbNo => newEwayValue.find(item => item.ewbNo === ewbNo));
              return uniqueEwayValue;

            });
            seteway_confirm(true);
            dispatch(setShowAlert(true));
            dispatch(setDataExist(`Eway Bill no Details Matched`));
            dispatch(setAlertType("success"));
            seteway_list(response.data.response);
            seteway_pincode_s(response.data.response.fromPincode)
            seteway_pincode_c(response.data.response.toPincode)
          }
          else {
            if (eway_detail_l.fromTrdName === response.data.response.fromTrdName && eway_detail_l.toTrdName === response.data.response.toTrdName && eway_detail_l.toPincode === response.data.response.toPincode && eway_detail_l.fromPincode === response.data.response.fromPincode) {
              // seteway_value([...eway_value, response.data.response])
              seteway_value(prevEwayValue => {
                const newEwayValue = [...prevEwayValue, response.data.response];
                const uniqueEwayValue = Array.from(new Set(newEwayValue.map(item => item.ewbNo)))
                  .map(ewbNo => newEwayValue.find(item => item.ewbNo === ewbNo));
                return uniqueEwayValue;

              });

            }
            else {
              dispatch(setShowAlert(true));
              dispatch(setDataExist(`Previous Eway Bill details is not same as entered Eway Bill Number`));
              dispatch(setAlertType("warning"));
            }

          }

        } else if (response.data?.status === 0) {
          dispatch(setShowAlert(true));
          dispatch(setDataExist(`Entered EwayBill No Is Wrong`));
          dispatch(setAlertType("danger"));
          seteway_confirm(false);
          seteway_detail_l([]);
          seteway_list([]);
        }
        else {
          dispatch(setShowAlert(true));
          dispatch(setDataExist("Invalid Authentication Token."));
          dispatch(setAlertType("danger"));

        }
      })
      .catch((error) => {
        seteway_confirm(false);
        dispatch(setShowAlert(true));
        dispatch(setDataExist(`Entered EwayBill No Is Wrong Or You Are Unauthorized`));
        dispatch(setAlertType("danger"));
      });
  };

  const gefilterlocalityfrom = (pincode) => {
    let locality_from = [];
    axios
      .get(
        ServerAddress +
        `master/filter_locality/?pincode=${pincode}&p=${locality_sel_page}&records=${10}&locality_search=${locality_sel_search_item}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((resp) => {
        if (resp.data.next === null) {
          setlocality_sel_loaded(false);
        } else {
          setlocality_sel_loaded(true);
        }
        if (resp.data.results.length !== 0) {
          setfrom_address(resp.data.results[0]);
          if (locality_sel_page === 1) {
            locality_from = resp.data.results.map((v) => [
              v.id,
              toTitleCase(v.name),
            ]);
          } else {
            locality_from = [
              ...locality_list,
              ...resp.data.results.map((v) => [v.id, toTitleCase(v.name)]),
            ];
          }
          setlocality_sel_count(locality_sel_count + 2);
          setlocality_list(locality_from);
          setfrom_pin(false)
        }
        else {
          getStatesCode(eway_list.fromStateCode, "gst_code", "from")
          setfrom_pin(true)
          setshow_pincode(true)
          setlocality_list([])
        }

        // if (response.data.results.length !== 0) {
        //   setfrom_address(response.data.results[0]);
        //   for (let index = 0; index < response.data.results.length; index++) {
        //     const element = [
        //       response.data.results[index].id,
        //       response.data.results[index].name,
        //     ];
        //     locality_from.push(element);
        //   }
        //   setlocality_list(locality_from);
        // }
        // else {
        //   alert("not")
        // }

      })
      .catch((err) => {
        alert(`Error Occur in Get Data ${err}`);
      });
  };

  const [locslity_to_list, setlocslity_to_list] = useState([]);
  const [locality_sel_to, setlocality_sel_to] = useState("");
  const [locality_id_to, setlocality_id_to] = useState("");
  const [locality_sel_to_page, setlocality_sel_to_page] = useState(1)
  const [locality_sel_to_error, setlocality_sel_to_error] = useState(false)
  const [locality_sel_to_search_item, setlocality_sel_to_search_item] = useState("")
  const [locality_sel_to_loaded, setlocality_sel_to_loaded] = useState(false)
  const [locality_sel_to_count, setlocality_sel_to_count] = useState(1)
  const [locality_sel_to_bottom, setlocality_sel_to_bottom] = useState(103)

  const gefilterlocalityto = (pincode) => {
    let localityto = [];
    axios
      .get(ServerAddress + `master/filter_locality/?pincode=${pincode}&p=${locality_sel_to_page}&records=${10}&locality_search=${locality_sel_to_search_item}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((resp) => {
        if (resp.data.results.length > 0) {
          setto_address(resp.data.results[0]);
          if (resp.data.next === null) {
            setlocality_sel_to_loaded(false);
          } else {
            setlocality_sel_to_loaded(true);
          }
          if (locality_sel_to_page === 1) {
            localityto = resp.data.results.map((v) => [
              v.id,
              toTitleCase(v.name),
            ]);
          } else {
            localityto = [
              ...state_list_c,
              ...resp.data.results.map((v) => [v.id, toTitleCase(v.name)]),
            ];
          }
          setlocality_sel_to_count(locality_sel_to_count + 2);
          setlocslity_to_list(localityto);
          setto_pin(false)
        }
        else {
          getStatesCode(eway_list.toStateCode, "gst_code", "to")
          setto_pin(true)
          setshow_pincode(true)
          setlocslity_to_list([])
        }
      })
      .catch((err) => {
        alert(`Error Occur in Get Data ${err}`);
      });
  };

  // Location Info
  // Address Line 1 Shipper and consignee started
  const [shipper_n, setshipper_n] = useState("");
  const [consignee_n, setconsignee_n] = useState("");
  const [consignee_address, setconsignee_address] = useState("");
  const [consignee_contact_no, setconsignee_contact_no] = useState(null)
  const [shipper_address, setshipper_address] = useState("");
  const [shipper_contact_no, setshipper_contact_no] = useState(null)
  const [m_origin, setm_origin] = useState(null)
  const [m_shipper, setm_shipper] = useState(null)
  const [m_consignee, setm_consignee] = useState(null)
  const [m_destination, setm_destination] = useState(null)
  // Address Line 1 Shipper and consignee Ended
  const [state_error, setstate_error] = useState(false);
  const [state_page, setstate_page] = useState(1);
  const [state_search_item, setstate_search_item] = useState("");
  const [state_loaded, setstate_loaded] = useState(false);
  const [state_count, setstate_count] = useState(1);
  const [state_bottom, setstate_bottom] = useState(103);
  const [togstate, settogstate] = useState(false);

  const [city_list_s, setcity_list_s] = useState([]);
  const [city, setcity] = useState("");
  const [city_id, setcity_id] = useState(0);
  const [city_error, setcity_error] = useState(false);
  const [city_page, setcity_page] = useState(1);
  const [city_search_item, setcity_search_item] = useState("");
  const [city_loaded, setcity_loaded] = useState(false);
  const [city_count, setcity_count] = useState(1);
  const [city_bottom, setcity_bottom] = useState(103);
  const [togcity, settogcity] = useState(false);

  const [pincode_page, setpincode_page] = useState(1);
  const [pincode_search_item, setpincode_search_item] = useState("");
  const [pincode_id, setpincode_id] = useState(0);
  const [load_pincode, setload_pincode] = useState(false);
  const [pincode_count, setpincode_count] = useState(1);
  const [pincode_bottom, setpincode_bottom] = useState(103);
  const [togpincode, settogpincode] = useState(false);

  const [pincode_list_error, setpincode_list_error] = useState(false);
  const [locality, setlocality] = useState("");
  const [locality_list_s, setlocality_list_s] = useState([]);
  const [locality_page, setlocality_page] = useState(1);
  const [locality_loaded, setlocality_loaded] = useState(false);
  const [locality_bottom, setlocality_bottom] = useState(103);
  const [locality_count, setlocality_count] = useState(1);

  const [locality_search_item, setlocality_search_item] = useState("");
  const [locality_id_f, setlocality_id_f] = useState(0);
  const [locality_error, setlocality_error] = useState(false);
  const [refresh, setrefresh] = useState(false);
  const [consginee_st, setconsginee_st] = useState("");
  const [consginee_c, setconsginee_c] = useState("");
  const [consignee_p_id, setconsignee_p_id] = useState(0);

  const [togstate_c, settogstate_c] = useState(false);
  const [togcity_c, settogcity_c] = useState(false);
  const [togpincode_c, settogpincode_c] = useState(false);

  const getStates = () => {
    // let state_list = [...state_list_s];
    let state_list = [];
    axios
      .get(
        ServerAddress +
        `master/all_shipper_states/?search=${state_search_item}&p=${state_page}&records=${10}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((resp) => {
        settogstate(true);
        if (resp.data.next === null) {
          setstate_loaded(false);
        } else {
          setstate_loaded(true);
        }
        if (resp.data.results.length > 0) {
          if (state_page === 1) {
            state_list = resp.data.results.map((v) => [
              v.id,
              toTitleCase(v.state),
            ]);
          } else {
            state_list = [
              ...state_list_s,
              ...resp.data.results.map((v) => [v.id, toTitleCase(v.state)]),
            ];
          }
          setstate_count(state_count + 2);
          setstate_list_s(state_list);
        } else {
          setstate_list_s([]);
        }
      })
      .catch((err) => {
        alert(`Error Occur in Get States, ${err}`);
      });
  };

  const getCities = (place_id, filter_by, val) => {
    setby_pincode(false);
    setby_pincode_f_c(false);
    let cities_list = [];
    axios
      .get(
        ServerAddress +
        `master/${val === "Shipper" ? "all_shipper_cities" : "all_cities"}/?search=${""}&p=${val === "Shipper" ? city_page : city_page_c
        }&records=${10}&city_search=${val === "Shipper" ? city_search_item : city_search_item_c
        }` +
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
          if (val === "Shipper") {
            settogcity(true);
            if (resp.data.next === null) {
              setcity_loaded(false);
            } else {
              setcity_loaded(true);
            }
            if (city_page === 1) {
              cities_list = resp.data.results.map((v) => [
                v.id,
                toTitleCase(v.city),
              ]);
            } else {
              cities_list = [
                ...city_list_s,
                ...resp.data.results.map((v) => [v.id, toTitleCase(v.city)]),
              ];
            }
            setcity_count(city_count + 2);
            setcity_list_s(cities_list);
          } else {
            settogcity_c(true);
            if (resp.data.next === null) {
              setcityc_loaded(false);
            } else {
              setcityc_loaded(true);
            }
            if (city_page_c === 1) {
              cities_list = resp.data.results.map((v) => [
                v.id,
                toTitleCase(v.city),
              ]);
            } else {
              cities_list = [
                ...city_list__c,
                ...resp.data.results.map((v) => [v.id, toTitleCase(v.city)]),
              ];
            }
            setcityc_count(cityc_count + 2);
            setcity_list__c(cities_list);
          }
        } else {
          setcity_list_s([]);
          setcity_list__c([]);
        }
      })
      .catch((err) => {
        console.warn(`Error Occur in Get City, ${err}`);
      });
  };

  const getPincode = (place_id, filter_by, val) => {
    let pincode_list = [];
    axios
      .get(
        ServerAddress +
        `master/${val === "Shipper" ? "all_shipper_pincode" : "all_pincode"}/?search=${""}&p=${val === "Shipper" ? pincode_page : pincode_page_c
        }&records=${10}&pincode_search=${val === "Shipper" ? pincode_search_item : pincode_search_item_c
        }` +
        "&place_id=" +
        place_id +
        "&filter_by=" +
        filter_by,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((resp) => {
        if (filter_by !== "pincode") {
          if (val === "Shipper") {
            settogpincode(true);
            if (resp.data.next === null) {
              setload_pincode(false);
            } else {
              setload_pincode(true);
            }
            if (pincode_page === 1) {
              pincode_list = resp.data.results.map((v) => [v.id, v.pincode]);
            } else {
              pincode_list = [
                ...pincode_list_s,
                ...resp.data.results.map((v) => [v.id, v.pincode]),
              ];
            }
            setpincode_count(pincode_count + 2);
            setpincode_list_s(pincode_list);
          } else {
            settogpincode_c(true);
            if (resp.data.next === null) {
              setloadc_pincode(false);
            } else {
              setloadc_pincode(true);
            }
            if (pincode_page_c === 1) {
              pincode_list = resp.data.results.map((v) => [v.id, v.pincode]);
            } else {
              pincode_list = [
                ...pincode_list_f_c,
                ...resp.data.results.map((v) => [v.id, v.pincode]),
              ];
            }
            setpincodec_count(pincodec_count + 2);
            setpincode_list_f_c(pincode_list);
          }
        } else if (resp.data.results.length > 0 && val === "Shipper") {
          setcity(toTitleCase(resp.data.results[0].city_name));
          setcity_id(resp.data.results[0].city);
          setstate(toTitleCase(resp.data.results[0].state_name));
          setstate_id(resp.data.results[0].state);
          setpincode(resp.data.results[0].pincode);
          setpincode_id(resp.data.results[0].id);
        } else if (resp.data.results.length > 0 && val === "Consignee") {
          setconsginee_c(toTitleCase(resp.data.results[0].city_name));
          setcity_id_c(resp.data.results[0].city);
          setconsginee_st(toTitleCase(resp.data.results[0].state_name));
          setstate_id_f_c(resp.data.results[0].state);
          setconsignee_pincode(resp.data.results[0].pincode);
          setconsignee_p_id(resp.data.results[0].id);
        } else {
          dispatch(
            setDataExist(
              "You entered invalid pincode or pincode not available in database"
            )
          );
          dispatch(setAlertType("warning"));
          dispatch(setShowAlert(true));
          setcity("");
          setcity_id("");
          // setstate("");
          setstate_id("");
        }
      })
      .catch((err) => {
        console.warn(`Error Occur in Get City, ${err}`);
      });
  };

  const getLocality = (place_id, filter_by, val) => {
    let locality_list = [];
    axios
      .get(
        ServerAddress +
        `master/all_locality/?search=${""}&p=${val === "Shipper" ? locality_page : locality_page_c
        }&records=${10}` +
        `&place_id=${place_id}&filter_by=${filter_by}&name_search=${val === "Shipper" ? locality_search_item : locality_search_item_c
        }&state=&city=&name=&data=all`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((resp) => {
        if (filter_by !== "locality") {
          if (resp.data.results.length > 0) {
            if (val === "Shipper") {
              if (resp.data.next === null) {
                setlocality_loaded(false);
              } else {
                setlocality_loaded(true);
              }

              if (locality_page === 1) {
                locality_list = resp.data.results.map((v) => [
                  v.id,
                  toTitleCase(v.name),
                ]);
              } else {
                locality_list = [
                  ...locality_list_s,
                  ...resp.data.results.map((v) => [v.id, toTitleCase(v.name)]),
                ];
              }

              locality_list = [
                ...new Set(locality_list.map((v) => `${v}`)),
              ].map((v) => v.split(","));
              setlocality_count(locality_count + 2);
              setlocality_list_s(locality_list);
            } else {
              if (resp.data.next === null) {
                setlocalityc_loaded(false);
              } else {
                setlocalityc_loaded(true);
              }
              if (locality_page_c === 1) {
                locality_list = resp.data.results.map((v) => [
                  v.id,
                  toTitleCase(v.name),
                ]);
              } else {
                locality_list = [
                  ...locality_list_s_c,
                  ...resp.data.results.map((v) => [v.id, toTitleCase(v.name)]),
                ];
              }

              locality_list = [
                ...new Set(locality_list.map((v) => `${v}`)),
              ].map((v) => v.split(","));
              setlocalityc_count(localityc_count + 2);
              setlocality_list_s_c(locality_list);
            }
          } else {
            setlocality_list_s([]);
          }
        } else if (resp.data.results.length > 0) {
          setlocality(toTitleCase(resp.data.results[0].name));
          setlocality_id(resp.data.results[0].id);
          setcity(toTitleCase(resp.data.results[0].city_name));
          setstate(toTitleCase(resp.data.results[0].state_name));
          setpincode(resp.data.results[0].pincode_name);
          setpincode_id(resp.data.results[0].pincode);
        } else {
          dispatch(setDataExist("You entered invalid Locality"));
          dispatch(setAlertType("warning"));
          dispatch(setShowAlert(true));
        }
      })
      .catch((err) => {
        alert(`Error Occur in Get Pincode , ${err}`);
      });
  };


  useEffect(() => {
    if (eway_pincode_s?.length === 6 && eway_pincode_s) {
      gefilterlocalityfrom(eway_pincode_s);
    }
  }, [eway_pincode_s, locality_sel_page, locality_sel_search_item])

  useEffect(() => {
    if (eway_pincode_c?.length === 6 && eway_pincode_c) {
      gefilterlocalityto(eway_pincode_c);
    }
  }, [eway_pincode_c, locality_sel_to_page, locality_sel_to_search_item])

  useLayoutEffect(() => {
    if (state_id !== 0) {
      setcity_page(1);
      setcity_count(1);
      setcity_bottom(103);
      setcity_loaded(true);
    }
  }, [state_id]);

  useEffect(() => {
    // let timeoutId;
    // if (state_id !== 0) {
    //   timeoutId = setTimeout(() => {
    getCities(state_id, "state", "Shipper");
    //   }, 1);
    // }
    // return () => clearTimeout(timeoutId);
  }, [state_id, city_page, city_search_item]);

  useLayoutEffect(() => {
    if (state_id_f_c !== 0) {
      setcity_page_c(1);
      setcityc_count(1);
      setcityc_bottom(103);
      setcityc_loaded(true);
    }
  }, [state_id_f_c]);

  useEffect(() => {
    getCities(state_id_f_c, "state", "Consignee");
  }, [state_id_f_c, city_page_c, city_search_item_c]);

  useLayoutEffect(() => {
    if (state !== "") {
      setpincode_loaded(true);
    }
  }, [state]);
  useLayoutEffect(() => {
    if (consginee_st !== "") {
      setpincode_loaded_f_c(true);
    }
  }, [consginee_st]);

  useLayoutEffect(() => {
    if (pincode_id !== 0) {
      setlocality_page(1);
      setlocality_count(1);
      setlocality_bottom(103);
      setlocality_loaded(true);
    }
  }, [pincode_id]);

  useEffect(() => {
    let timeoutId;
    if (pincode_id !== 0) {
      timeoutId = setTimeout(() => {
        getLocality(pincode_id, "pincode", "Shipper");
      }, 1);
    }
    return () => clearTimeout(timeoutId);
  }, [pincode_id, locality_page, locality_search_item]);

  useLayoutEffect(() => {
    if (consignee_p_id !== 0) {
      setlocality_page_c(1);
      setlocalityc_count(1);
      setlocalityc_bottom(103);
      setlocalityc_loaded(true);
    }
  }, [consignee_p_id]);

  useEffect(() => {
    let timeoutId;
    if (consignee_p_id !== 0) {
      timeoutId = setTimeout(() => {
        getLocality(consignee_p_id, "pincode", "Consignee");
      }, 1);
    }
    return () => clearTimeout(timeoutId);
  }, [consignee_p_id, locality_page_c, locality_search_item_c]);

  useLayoutEffect(() => {
    getStates();
  }, [state_page, state_search_item, refresh]);

  const getStates_c = () => {
    // let state_list = [...state_list_s];
    let state_list = [];
    axios
      .get(
        ServerAddress +
        `master/all_states/?search=${""}&place_id=all&filter_by=all&p=${state_page_c}&records=${10}&state_search=${state_search_item_c}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((resp) => {
        settogstate_c(true);
        if (resp.data.results.length > 0) {
          if (resp.data.next === null) {
            setstatec_loaded(false);
          } else {
            setstatec_loaded(true);
          }
          if (state_page_c === 1) {
            state_list = resp.data.results.map((v) => [
              v.id,
              toTitleCase(v.state),
            ]);
          } else {
            state_list = [
              ...state_list_c,
              ...resp.data.results.map((v) => [v.id, toTitleCase(v.state)]),
            ];
          }
          setstatec_count(statec_count + 2);
          setstate_list_c(state_list);
        }
        else {
          setstate_list_c([])
        }

      })
      .catch((err) => {
        alert(`Error Occur in Get States, ${err}`);
      });
  };

  // useLayoutEffect(() => {
  //   if (state != "") {
  //     setpincode_loaded(true);
  //   }
  // }, [state_s_c]);

  useLayoutEffect(() => {
    getStates_c();
  }, [state_page_c, state_search_item_c, refresh_c]);
  ////////
  useLayoutEffect(() => {
    if (city_id !== 0) {
      setpincode_page(1);
      setpincode_count(1);
      setpincode_bottom(103);
      setload_pincode(true);
    }
  }, [city_id]);

  useEffect(() => {
    let timeoutId;
    if (city_id !== 0) {
      timeoutId = setTimeout(() => {
        getPincode(city_id, "city", "Shipper");
      }, 1);
    }
    return () => clearTimeout(timeoutId);
  }, [city_id, pincode_page, pincode_search_item]);

  useLayoutEffect(() => {
    if (city_id_c !== 0) {
      setpincode_page_c(1);
      setpincodec_count(1);
      setpincodec_bottom(103);
      setloadc_pincode(true);
    }
  }, [city_id_c]);

  useEffect(() => {
    let timeoutId;
    if (city_id_c !== 0) {
      timeoutId = setTimeout(() => {
        getPincode(city_id_c, "city", "Consignee");
      }, 1);
    }
    return () => clearTimeout(timeoutId);
  }, [city_id_c, pincode_page_c, pincode_search_item_c]);

  useEffect(() => {
    if (delivery_type === "INTERNATIONAL") {
      settransport_mode_data_list(["Cargo", "Courier"]);
    } else {
      settransport_mode_data_list(["Air", "Surface", "By Road", "Train"]);
    }
  }, [delivery_type]);

  // Get Return Order

  const getReturnOrder = () => {
    let temp2 = [];
    let data = [];
    axios
      .get(
        ServerAddress + `booking/get_return_order/?docket_no=${linked_order}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        if (response.data.results.length === 0) {
          dispatch(setShowAlert(true));
          dispatch(setDataExist(`Docket Number Does not Exist`));
          dispatch(setAlertType("warning"));
        } else {
          setreturned_data(response.data.results);
          if (
            order_type === "Issue" &&
            response.data.results[0].issue.length === 0 &&
            response.data.results[0].issue_notreceived.length === 0
          ) {
            dispatch(setShowAlert(true));
            dispatch(
              setDataExist(`This Docket Number Does Not Have Any Issue`)
            );
            dispatch(setAlertType("warning"));
          }
        }
      })
      .catch((err) => {
        alert(`Error Occur in Get Data ${err}`);
      });
  };

  useEffect(() => {
    if (
      returned_data.length !== 0 &&
      (order_type === "Return" || order_type === "Issue") &&
      location.state === null
    ) {
      setorder(returned_data[0]);
      settransport_mode(toTitleCase(returned_data[0].transportation_mode));
      setorder_type(order_type === "Issue" ? "Issue" : "Return");
      setcurrent_status(returned_data[0].current_status);
      // setdocket_no_value(returned_data[0].docket_no);
      // setisupdating(true);
      setorder_id(returned_data[0].id);
      setdocket_no_value(returned_data[0].docket_no);
      dispatch(setCurOrderId(returned_data[0].id));
      dispatch(setCurOrderDocketNo(returned_data[0].docket_no));
      settype_of_booking(toTitleCase(returned_data[0].booking_type));

      // setdelivery_mode(returned_data[0].delivery_mode);
      settransportation_cost(returned_data[0].transportation_cost);

      setcommodity(returned_data[0].commodity_name);
      setcommodity_id(returned_data[0].commodity);
      setd_cod(toTitleCase(returned_data[0].cod));
      if (returned_data[0].cod === "Yes") {
        settransportation_cost(returned_data[0].transportation_cost);
      }
      settotal_delivered_pcs(
        parseInt(returned_data[0].total_quantity) -
        returned_data[0].issue_notreceived.length
      );
      setcold_chain(returned_data[0].cold_chain);
      setdelivery_type(returned_data[0].delivery_type);
      setentry_type_btn(returned_data[0].entry_type);
      setactual_weigth(returned_data[0].actual_weight);
      setcommodity(toTitleCase(returned_data[0].commodity_name));
      setclient(toTitleCase(returned_data[0].client_name));
      setclient_id(returned_data[0].client);
      setbillto(toTitleCase(returned_data[0].billto_name));
      setbillto_id(returned_data[0].billto);
      // setclient_id(returned_data[0].client)
      setshipper_n(toTitleCase(returned_data[0].shipper));
      // setshipper_id(returned_data[0].shipper);
      setstate(toTitleCase(returned_data[0].shipper_state));
      setcity(toTitleCase(returned_data[0].shipper_city));
      setpincode(returned_data[0].shipper_pincode);
      setshipper_address(toTitleCase(returned_data[0].shipper_address1));
      setorigincity(toTitleCase(returned_data[0].shipper_city));
      setorigincity_id(toTitleCase(returned_data[0].shipper_city_id));
      setlocality(toTitleCase(returned_data[0].shipper_locality));

      setconsignee_n(toTitleCase(returned_data[0].consignee));
      // setconsignee_id(returned_data[0].consignee);
      setconsginee_st(toTitleCase(returned_data[0].consignee_state));
      setconsginee_c(toTitleCase(returned_data[0].consignee_city));
      setconsignee_pincode(returned_data[0].consignee_pincode);
      setconsignee_address(toTitleCase(returned_data[0].consignee_address1));
      setlocality_c(toTitleCase(returned_data[0].consignee_locality));
      setconsignee_add_2(
        toTitleCase(returned_data[0].consignee_address_line_2)
      );
      setlocal_delivery_type(toTitleCase(returned_data[0].local_delivery_type));
      setasset_info_selected(toTitleCase(returned_data[0].asset_type));
      if (returned_data[0].asset_type === "NONE") {
        setasset_prov(false);
      } else {
        setasset_prov(true);
      }
      setcal_type(returned_data[0].local_cal_type);

      setshipper_add_1(toTitleCase(returned_data[0].shipper_address1));
      setdestinationcity(toTitleCase(returned_data[0].consignee_city));
      setdestinationcity_id(toTitleCase(returned_data[0].consignee_city_id));

      setlocality_id_f(returned_data[0].shipper_location);
      setlocality_id_f_c(returned_data[0].consignee_location);
    }
  }, [returned_data, order_type]);

  useEffect(() => {
    setall_shipper_details(state + "," + city + "," + pincode);
  }, [state, city, pincode]);

  useEffect(() => {
    setall_consignee_details(
      consginee_st + "," + consginee_c + "," + consignee_pincode
    );
  }, [consginee_st, consginee_c, consignee_pincode]);

  useEffect(() => {
    if (
      location.state === null &&
      order_type !== "Return" &&
      order_type !== "Issue"
    ) {
      setorder([]);
      settransport_mode("");
      setcurrent_status("");
      // setdocket_no_value(returned_data[0].docket_no);
      // setisupdating(true);
      setorder_id("");
      setdocket_no_value("");
      // settype_of_booking("");

      // setdelivery_mode(returned_data[0].delivery_mode);
      settransportation_cost("");

      setcommodity("");
      setcommodity_id("");
      setd_cod(toTitleCase(""));

      setcold_chain(false);
      setdelivery_type("LOCAL");
      setentry_type_btn("AUTO GENERATE");
      setactual_weigth("0");
      setcommodity("");
      setclient("");
      setclient_id("");
      setbillto("");
      setbillto_id("");
      // setclient_id(returned_data[0].client)
      setshipper_n("");
      setstate("");
      setcity("");
      setpincode("");
      setshipper_address("");
      setorigincity("");
      setorigincity_id("");
      setlocality("");
      setlocality_id_f(0);
      setlocality_id_f_c(0);

      setconsignee_n("");
      setconsginee_st("");
      setconsignee_city("");
      setconsignee_pincode("");
      setconsignee_address("");
      setlocality_c("");
      setconsignee_add_2("");
      setlocal_delivery_type("");
      setasset_info_selected("");
      // if (returned_data[0].asset_type === "NONE") {
      //   setasset_prov(false)
      // }
      // else {
      //   setasset_prov(true)
      // }
      setcal_type("");

      setshipper_add_1("");
      setdestinationcity("");
      setdestinationcity_id("");
    }
  }, [returned_data, order_type]);

  useEffect(() => {
    if (
      linked_order.length >= 6 &&
      (order_type === "Return" || order_type === "Issue") &&
      location.state === null
    ) {
      getReturnOrder();
    }
  }, [linked_order]);

  // Used for History
  const handlClk = () => {
    navigate("/booking/orders/orderHistory/OrderHistoryPage", {
      state: { Booking: order },
    });
  };
  useEffect(() => {
    if (eway_detail_l.length !== 0 && eway_detail_l) {
      const dateStr = eway_detail_l.docDate ?? "";
      // const [day, month, year] = dateStr.split("-");
      const [day, month, year] = dateStr?.split("-") ?? ["", "", ""];
      const isoDate = `${year}-${(month || "").padStart(2, "0")}-${(
        day || ""
      ).padStart(2, "0")}`;

      // const isoDate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
      // let temp_list = [];
      // temp_list.push([
      //   eway_detail_l.ewbNo,
      //   isoDate,
      //   eway_detail_l.docNo,
      //   eway_detail_l.totInvValue,
      //   "",
      // ]);
      // setrow2(temp_list);
      setinvoice_value(eway_detail_l.docNo);
    }
  }, [eway_detail_l]);

  useEffect(() => {
    let temp_list = [];

    if (eway_value && eway_value.length > 0 && location.state === null) {
      const uniqueValues = eway_value.filter(
        (value, index, self) => index === self.findIndex(obj => obj.ewbNo === value.ewbNo)
      );

      for (let index = 0; index < uniqueValues.length; index++) {
        const element = uniqueValues[index];
        const dateStr = element.docDate ?? "";
        const [day, month, year] = dateStr?.split("-") ?? ["", "", ""];
        const isoDate = `${year}-${(month || "").padStart(2, "0")}-${(day || "").padStart(2, "0")}`;
        temp_list.push([
          String(element.ewbNo),
          String(isoDate),
          String(element.docNo),
          String(element.totInvValue),
          "",
          "",
          ""
        ]);

      }
      setrow2(temp_list);

    }
  }, [eway_value]);

  useEffect(() => {
    if (location.state !== null) {

      if (!eway_value || eway_value.length === 0) return;

      setrow2(prevRow2 => {
        // Create a new array to hold the updated rows
        const updatedRows = [...prevRow2];

        // Iterate through each element in eway_value
        for (let i = 0; i < eway_value.length; i++) {
          const element = eway_value[i];
          const dateStr = element.docDate ?? "";
          const [day, month, year] = dateStr?.split("-") ?? ["", "", ""];
          const isoDate = `${year}-${(month || "").padStart(2, "0")}-${(day || "").padStart(2, "0")}`;

          // Find the index of the row with the same 'ewbNo' in updatedRows
          const existingRowIndex = updatedRows.findIndex(row => row[0] === String(element.ewbNo));

          // If the 'ewbNo' is found in existingRows, update the row with new data
          if (existingRowIndex !== -1) {
            updatedRows[existingRowIndex] = [
              String(element.ewbNo),
              String(isoDate),
              String(element.docNo),
              String(element.totInvValue),
              "",
              "",
              "",
            ];
          }
          // If the 'ewbNo' is not found in existingRows, add a new row
          else {
            updatedRows.push([
              String(element.ewbNo),
              String(isoDate),
              String(element.docNo),
              String(element.totInvValue),
              "",
              "",
              "",
            ]);
          }
        }

        return updatedRows;
      });
    }
  }, [eway_value]);


  useEffect(() => {
    let temp_list2 = [];
    if (eway_value && eway_value.length > 0) {
      for (let index = 0; index < row2.length; index++) {
        const element = row2[index];
        temp_list2.push([element[0], element[1], element[2], element[3], '', '', ''])
      }
      setrow4(temp_list2);
    }
  }, [row2])

  useEffect(() => {
    if (client !== "") {
      setclient_error(false);
    }
    if (billto !== "") {
      setbillto_error(false);
    }
    if (state !== "" && state) {
      setstate_error(false);
    }
    if (locality_sel !== "" && locality_sel) {
      setlocality_sel_error(false);
    }
    if (locality_sel_to !== "" && locality_sel_to) {
      setlocality_sel_to_error(false);
    }
    if (city !== "") {
      setcity_error(false);
    }
    if (pincode !== "") {
      setpincode_list_error(false);
    }
    if (shipper_n !== "") {
      setshipper_error(false);
    }
    if (consignee_n !== "") {
      setconsignee_error(false);
    }
    if (ewaybill_no?.length === 12 && booking_through) {
      setewaybill_no_error(false);
    }

    if (locality !== "") {
      setlocality_error(false);
    }
    if (consginee_st !== "" && consginee_st) {
      setstate_error_c(false);
    }
    if (consginee_c !== "") {
      setcity_error_c(false);
    }
    if (consignee_pincode !== "") {
      setpincode_list_error_c(false);
    }
    if (locality_c !== "") {
      setlocality_error_c(false);
    }
    if (transport_mode !== "") {
      settransport_mode_error(false);
    }

    if (commodity !== "" && commodity) {
      setcommodity_error(false);
    }
    if (local_delivery_type !== "") {
      setlocal_delivery_type_error(false);
    }
    if (d_cod !== "") {
      setd_cod_error(false);
    }
    if (transportation_cost !== "") {
      settransportation_cost_err(false);
    }
    if (cold_chain || nonecold_chain) {
      setcoldchain_error(false);
    }
    if (booking_date) {
      setbooking_date_error(false);
    }
  }, [
    cold_chain,
    nonecold_chain,
    temp_selected,
    client,
    transport_mode,
    shipper,
    booking_date,
    consignee,
    shipper_n,
    consignee_n,
    local_delivery_type,
    d_cod,
    billto,
    state,
    city,
    pincode,
    locality,
    consginee_st,
    consginee_c,
    consignee_pincode,
    locality_c,
    locality_sel_to,
    locality_sel,
    ewaybill_no,
    transportation_cost
  ]);

  useEffect(() => {
    if (
      !location.state &&
      state &&
      !by_pincode &&
      order_type !== "Return" &&
      order_type !== "Issue"
    ) {
      setcity_list_s([]);
      setpincode("");
      setpincode_list_s([]);
      setlocality("");
      setlocality_list_s([]);
    }
  }, [state]);

  useEffect(() => {
    if (
      state !== "" &&
      togstate &&
      !by_pincode &&
      order_type !== "Return" &&
      order_type !== "Issue" && !check_ord
    ) {
      setcity("");
      setcity_list_s([]);
      setpincode("");
      setpincode_list_s([]);
      setlocality("");
      setlocality_list_s([]);
    }
  }, [state]);

  useEffect(() => {
    if (
      !location.state &&
      city &&
      !by_pincode &&
      order_type !== "Return" &&
      order_type !== "Issue"
    ) {
      setpincode("");
      setpincode_list_s([]);
      setlocality("");
      setlocality_list_s([]);
    }
  }, [city]);

  useEffect(() => {
    if (
      city !== "" &&
      togcity &&
      !by_pincode &&
      order_type !== "Return" &&
      order_type !== "Issue"
    ) {
      setpincode("");
      setpincode_list_s([]);
      setlocality("");
      setlocality_list_s([]);
    }
  }, [city]);

  useEffect(() => {
    if (
      !location.state &&
      pincode &&
      !by_pincode &&
      order_type !== "Return" &&
      order_type !== "Issue"
    ) {
      setlocality("");
      setlocality_list_s([]);
    }
  }, [pincode]);

  useEffect(() => {
    if (
      pincode !== "" &&
      togpincode &&
      !by_pincode &&
      order_type !== "Return" &&
      order_type !== "Issue"
    ) {
      setlocality("");
      setlocality_list_s([]);
    }
  }, [pincode]);

  useEffect(() => {
    if (isupdating) {
      settogstate(false);
      settogcity(false);
      settogpincode(false);
    }
  }, []);

  useEffect(() => {
    if (
      !location.state &&
      consginee_st &&
      !by_pincode_f_c &&
      order_type !== "Return" &&
      order_type !== "Issue"
    ) {
      setconsginee_c("");
      setcity_list__c([]);
      setconsignee_pincode("");
      setpincode_list_f_c([]);
      setlocality_c("");
      setlocality_list_s_c([]);
    }
  }, [consginee_st]);

  useEffect(() => {
    if (
      consginee_st !== "" &&
      togstate_c &&
      !by_pincode_f_c &&
      order_type !== "Return" &&
      order_type !== "Issue" && !check_ord
    ) {
      setconsginee_c("");
      setcity_list__c([]);
      setconsignee_pincode("");
      setpincode_list_f_c([]);
      setlocality_c("");
      setlocality_list_s_c([]);
    }
  }, [consginee_st]);

  useEffect(() => {
    if (
      !location.state &&
      consginee_c &&
      !by_pincode_f_c &&
      order_type !== "Return" &&
      order_type !== "Issue"
    ) {
      setconsignee_pincode("");
      setpincode_list_f_c([]);
      setlocality_c("");
      setlocality_list_s_c([]);
    }
  }, [consginee_c]);

  useEffect(() => {
    if (
      consginee_c !== "" &&
      togcity_c &&
      !by_pincode_f_c &&
      order_type !== "Return" &&
      order_type !== "Issue"
    ) {
      setconsignee_pincode("");
      setpincode_list_f_c([]);
      setlocality_c("");
      setlocality_list_s_c([]);
    }
  }, [consginee_c]);

  useEffect(() => {
    if (
      !location.state &&
      consignee_pincode &&
      !by_pincode_f_c &&
      order_type !== "Return" &&
      order_type !== "Issue"
    ) {
      setlocality_c("");
      setlocality_list_s_c([]);
    }
  }, [consignee_pincode]);

  useEffect(() => {
    if (
      consignee_pincode !== "" &&
      togpincode_c &&
      !by_pincode_f_c &&
      order_type !== "Return" &&
      order_type !== "Issue"
    ) {
      setlocality_c("");
      setlocality_list_s_c([]);
    }
  }, [consignee_pincode]);

  useEffect(() => {
    if (isupdating) {
      settogstate_c(false);
      settogcity_c(false);
      settogpincode_c(false);
    }
  }, []);
  useEffect(() => {
    if (e_waybill_inv.length > 12) {
      dispatch(setShowAlert(true));
      dispatch(
        setDataExist(`Number Should be 12 digit only`)
      );
      dispatch(setAlertType("warning"));
    }
  }, [e_waybill_inv])

  const [coldchain_permission, setcoldchain_permission] = useState([])

  const userpermission = useSelector(
    (state) => state.authentication.userpermission
  );

  useEffect(() => {
    if (userpermission?.length > 0) {
      let coldchain_val = userpermission?.filter((e) => e.sub_model === "Cold Chain")
      setcoldchain_permission(coldchain_val)
    }
  }, [userpermission]);

  // const [eway_loaded, seteway_loaded] = useState(false)

  // useEffect(() => {
  //   seteway_loaded(true)
  // }, []);

  // const memoizedLogInEwayBill = useMemo(() => <LogInEwayBill />, []);

  useEffect(() => {
    if (!user.is_superuser && location.state === null) {
      const currentDate = new Date();
      const yesterday = new Date();
      yesterday.setDate(currentDate.getDate() - 1);
      const tomorrow = new Date();
      tomorrow.setDate(currentDate.getDate() + 1); // Add 2 instead of 1 to include tomorrow

      const formattedYesterday = formatDateTime(yesterday);
      const formattedToday = formatDateTime(currentDate);
      const formattedTomorrow = formatDateTime(tomorrow);

      setbooking_date(formattedToday);
      document.getElementById("input").setAttribute("min", formattedYesterday);
      document.getElementById("input").setAttribute("max", formattedTomorrow);
    }
    else if (user.is_superuser && location.state === null) {
      const currentDate = new Date();
      const formattedToday = formatDateTime(currentDate);
      setbooking_date(formattedToday);
    }
  }, [user.is_superuser]);

  const formatDateTime = (dateTime) => {
    const year = dateTime.getFullYear();
    const month = String(dateTime.getMonth() + 1).padStart(2, "0");
    const day = String(dateTime.getDate()).padStart(2, "0");
    const hours = String(dateTime.getHours()).padStart(2, "0");
    const minutes = String(dateTime.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    const currentDate = new Date().toISOString().slice(0, 10);

    // Calculate the minimum and maximum dates allowed
    const minDate = new Date();
    minDate.setDate(minDate.getDate() - 1);
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 2); // Add 2 instead of 1 to include tomorrow

    if (
      (!user.is_superuser && selectedDate >= minDate.toISOString().slice(0, 10) && selectedDate <= maxDate.toISOString().slice(0, 10)) ||
      user.is_superuser
    ) {
      setbooking_date(selectedDate);
    } else {
      // Reset the booking date if it's outside the allowed range
      setbooking_date("");
    }
  };

  useEffect(() => {
    if (location.state === null) {
      if (ewaybill_no?.length === 12 && booking_through) {
        check_ewb_attached(ewaybill_no);
      }
      else if (ewaybill_no?.length !== 12 && booking_through) {
        setewaybill_no_error(true);
      }
    }
  }, [ewaybill_no])

  useEffect(() => {
    if (is_credo_box_return) {
      setassettype_remarks("CREDO BOX AND LOGGER RETURN")
      setis_credo_return(false)
      setis_logger_return(false)
    }
  }, [is_credo_box_return])

  useEffect(() => {
    if (is_credo_return) {
      setassettype_remarks("CREDO BOX RETURN ONLY")
      setis_credo_box_return(false)
      setis_logger_return(false)
    }
  }, [is_credo_return])

  useEffect(() => {
    if (is_logger_return) {
      setassettype_remarks("LOGGER RETURN ONLY")
      setis_credo_return(false)
      setis_credo_box_return(false)
    }

  }, [is_logger_return])

  useEffect(() => {
    if (!booking_through && location.state === null) {
      seteway_confirm(false);
      setewaybill_no("")
      seteway_value([])
      setrow2([["", val, "", "", "", "", ""]])
      seteway_list([])
      seteway_value([])
      seteway_detail_l([])
      setfrom_address([])
      setto_address([])
      setshow_pincode(false)
      seteway_pincode_c("")
      seteway_pincode_s("")
    }
  }, [booking_through])

  const [from_state_eway, setfrom_state_eway] = useState("")
  const [to_state_eway, setto_state_eway] = useState("")
  const getStatesCode = async (place_id, filter_by, type) => {
    try {
      const resp = await axios.get(
        ServerAddress +
        `master/all_states/?search=${""}&place_id=${place_id}&filter_by=${filter_by}&p=${1}&records=${10}&state_search=${""}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      if (resp.data.results.length > 0) {
        if (type === "from") {
          setfrom_state_eway(resp.data?.results[0]?.state)
        }
        else {
          setto_state_eway(resp.data?.results[0]?.state)
        }
      }
      else if (resp.data.results.length === 0 && location.state === null) {
        if (type === "from") {
          setfrom_state_eway("")
        }
        else {
          setto_state_eway("")
        }
      }
    } catch (err) {
      alert(`Error Occur in Get States, ${err}`);
    }
  };

  useEffect(() => {
    setlocality_sel_to(toTitleCase(eway_detail_l?.consignee_locality ? eway_detail_l?.consignee_locality : locslity_to_list?.length === 0 ? eway_detail_l.consignee_na_locality : ""));
    setlocality_sel(toTitleCase(eway_detail_l?.shipper_locality ? eway_detail_l?.shipper_locality : locality_list?.length === 0 ? eway_detail_l.shipper_na_locality : ""));
  }, [eway_detail_l, locslity_to_list])


  const getOrderImages = (id) => {
    axios
      .get(
        ServerAddress + `booking/get-order-images/${id}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((res) => {
        console.log("ord res===", res)
        let temp = []
        let temp_list = []
        if (res.data?.Status === "Not available") {
          setrow1([["", "", ""]])
        }
        if (res.data?.Data.length > 0) {
          temp = res.data.Data;
          // console.log("ord temp-------",temp)
          // // setall_images([...all_images,...temp])
          // const combinedImages = [...all_images, ...temp];

          // // Use filter and Set to get unique items based on id property
          // const uniqueImages = Array.from(new Set(combinedImages.map((item) => item.id))).map(
          //   (id) => combinedImages.find((item) => item.id === id)
          // );

          // // Set the state with unique items
          // setall_images(uniqueImages);

          for (let index = 0; index < temp.length; index++) {
            temp_list.push([
              (temp[index].image ? bucket_address + temp[index].image : ""),
              temp[index].caption,
              temp[index].id,
            ]);
          }
          // console.log("temp_list====", temp_list)
          setrow1(temp_list);
        }
      })
      .catch((err) => {
        // console.log("errrrrrrrrrrrrrankit----", err)
      });
  };

  const getInvoiceImages = (id) => {
    axios
      .get(
        ServerAddress + `booking/get-invoice-images/${id}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((res) => {
        console.log("Inv res===", res)
        let temp = []
        let temp_list = []
        if (res.data.Data.length > 0) {
          temp = res.data.Data;
          // console.log("Inv temp-------",temp)
          // // setall_images([...all_images,...temp])
          // const combinedImages = [...all_images, ...temp];

          // // Use filter and Set to get unique items based on id property
          // const uniqueImages = Array.from(new Set(combinedImages.map((item) => item.id))).map(
          //   (id) => combinedImages.find((item) => item.id === id)
          // );

          // // Set the state with unique items
          // setall_images(uniqueImages);

          for (let index = 0; index < temp.length; index++) {
            temp_list.push([
              temp[index].ewaybill_no,
              (temp[index].invoice_at).split("T")[0],
              temp[index].invoice_no,
              temp[index].invoice_amount,
              (temp[index].invoice_image ? bucket_address + temp[index].invoice_image : ""),
              (temp[index].ewaybill_image ? bucket_address + temp[index].ewaybill_image : ""),
              temp[index].id,
            ]);
          }
          // console.log("temp_list====", temp_list)
          setrow2(temp_list);
        }
        else {
          setrow2([["", val, "", "", "", "", ""]])
        }
      })

      .catch((err) => {
        // console.log("errrrrrrrrrrrrrankit----", err)
      });
  };

  useEffect(() => {
    if (location.state !== null && order?.id) {
      getOrderImages(order?.id)
      getInvoiceImages(order?.id)
    }
  }, [order])


  const divStyle = {
    backgroundColor: '#f2f2f2',
    padding: '8px',
    boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
    borderRadius: '5px',
    marginBottom: '10px',
  };

  const spanStyle = {
    marginRight: '10px',
  };

  const action = () => {
    if (delete_type === "order_image") {
      deleteOrderImage(ord_id, ord_data)
    }
    else {
      deleteInvoice(inv_id, inv_data)
    }
  }

  useLayoutEffect(() => {
    setbox_list_page(1)
    setsearch_box("")
    setbox_loaded(false)
    setbox_count(1)
    setbox_bottom(56)

    setLogger_page(1)
    setsearch_logger("")
    setlogger_loaded(false)
    setlogger_count(1)
    setlogger_bottom(56)
  }, [asset_info_selected])

  //Permission

  const [can_add, setcan_add] = useState(false);
  const [can_view, setcan_view] = useState(false);
  // console.log("can_add----", can_add)

  useEffect(() => {
    if (
      userpermission.some(
        (e) => e.sub_model === "Order Status" && e.write === true
      )
    ) {
      setcan_add(true);
    } else {
      setcan_add(false);
    }
  }, [userpermission]);

  useEffect(() => {
    if (
      userpermission.some(
        (e) => e.sub_model === "Order Status" && e.read === true
      )
    ) {
      setcan_view(true);
    } else {
      setcan_view(false);
    }
  }, [userpermission]);

  useEffect(() => {
    // eway_detail_l.transDocNo
    if (eway_confirm && location.state === null) {
      setentry_type_btn("MANUALLY");
      setdocket_no_value(eway_detail_l?.transDocNo)
    }
  }, [eway_confirm, eway_detail_l])

  //////////////A2A
  // Airport To Aiport  work
  const [tax_slab_list, settax_slab_list] = useState(["0%", "9%", "18%", "27%",]);
  const [tax_slab, settax_slab] = useState(tax_slab_list[2]);
  const [coloader, setcoloader] = useState("");
  const [coloader_list, setcoloader_list] = useState([]);
  const [coloader_page, setcoloader_page] = useState(1)
  const [coloader_bottom, setcoloader_bottom] = useState(103)
  const [coloader_count, setcoloader_count] = useState(1)
  const [coloader_error, setcoloader_error] = useState(false)
  const [coloader_loaded, setcoloader_loaded] = useState(false)
  const [coloader_search_item, setcoloader_search_item] = useState("")
  const [coloader_id, setcoloader_id] = useState(null)

  const get_coloader = () => {
    let coloader_list = [];
    axios
      .get(
        ServerAddress +
        `master/get_coloader/?search=${coloader_search_item}&p=${coloader_page}&records=${10}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        // temp = response.data.results;
        // for (let index = 0; index < temp.length; index++) {
        //   temp2.push([temp[index].id, toTitleCase(temp[index].name)]);
        // }
        // temp2 = [...new Set(temp2.map((v) => `${v}`))].map((v) => v.split(","));
        // setcoloader_list(temp2);

        if (response.data.next === null) {
          setcoloader_loaded(false);
        } else {
          setcoloader_loaded(true);
        }
        if (response.data.results.length > 0) {
          if (coloader_page === 1) {
            coloader_list = response.data.results.map((v) => [
              v.id,
              toTitleCase(v.name),
            ]);
          } else {
            coloader_list = [
              ...coloader_list,
              ...response.data.results.map((v) => [v.id, toTitleCase(v.name)]),
            ];
          }
          setcoloader_count(coloader_count + 2);
          setcoloader_list(coloader_list);
        } else {
          setcoloader_list([]);
        }
      })
      .catch((err) => {
        alert(`Error While Loading Client , ${err}`);
      });
  };

  useEffect(() => {
    if (order_type === "Airport To Airport") {
      get_coloader();
    }
  }, [coloader_search_item, coloader_page, order_type])

  //For Check Order
  const [table_data, settable_data] = useState([]);

  // This function is used to get all the orders
  const get_orders = () => {
    axios
      .get(
        ServerAddress +
        `booking/all_orders/?search=${search}&p=${page_num}&records=${data_len}&delivery_type=${""}&cold_chain_order=${""}&transportation_mode=${""}&created_by=${""}&current_branch=${""}&current_status=${""}&iscompleted=${""}&order_channel=${""}&value=${"P"}`,
        // `booking/all_orders/?search=${search}&p=${page_num}&records=${data_len}&delivery_type=${""}&cold_chain_order=${""}&transportation_mode=${""}&created_by=${""}&current_branch=${""}&current_status=${""}&iscompleted=${""}&order_channel=${""}&value=${cm_value}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        settable_data(response.data.results);
      });
  };

  useLayoutEffect(() => {
    if (check_ord) {
      get_orders();
    }
  }, [success, check_ord, search]);

  const [selected_docket, setselected_docket] = useState(false);

  useEffect(() => {
    if (row1.length > 0) {
      let a = row1.filter((v) => v !== "").map((v) => v[0]);
      a = a.map((item) => "Order " + item);
      setall_ord_images(a)
    }
  }, [row1])

  useEffect(() => {
    if (row2.length > 0) {
      let b = row2.flatMap((v) => [v[4], v[5]]).filter((v) => v !== "");
      b = b.map((item) => "Invoice " + item);
      setall_inv_images(b)
    }
  }, [row2])

  useEffect(() => {
    let data = all_ord_images.concat(all_inv_images);
    console.log("data-------", data)
    setall_images(data)
  }, [all_ord_images, all_inv_images])

  //Warehouse
  const getWarehouse = () => {
    let w_list = [];
    axios
      .get(
        ServerAddress +
        `wms/get_warehouse/?search=${""}&p=${warehouse_page}&records=${10}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        console.log("wresponse====", response)
        if (response.data.results.length > 0) {
          if (response.data.next === null) {
            setwarehouse_loaded(false);
          } else {
            setwarehouse_loaded(true);
          }
          if (warehouse_page === 1) {
            w_list = response.data.results.map((v) => [
              v.id,
              toTitleCase(v.name),
            ]);
          } else {
            w_list = [
              ...warehouse_list,
              ...response.data.results.map((v) => [v.id, toTitleCase(v.name)]),
            ];
          }
          setwarehouse_count(warehouse_count + 2);
          setwarehouse_list(w_list);
        }
        else {
          setwarehouse_list([])
        }
      })
      .catch((err) => {
        alert(`Error Occur in Get Data ${err}`);
      });
  };

  useEffect(() => {
    // if(is_warehouse){
    getWarehouse();
    // }
  }, [warehouse_page, search_warehouse]);

  return (
    <div style={{ display: "flex", height: "100%" }}>
      {/* {!eway_loaded && memoizedLogInEwayBill} */}
      <LogInEwayBill />
      {/* For Delete Invoice */}
      <Modal show={showinv} onHide={() => setShowinv(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body> {delete_type === "order_image" ? "Do you Want to delete this order image." : "Do you Want to delete this invoice."}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowinv(false)}>
            No
          </Button>
          <Button variant="danger" onClick={() => action()}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* For Not Matching Pincode */}
      <Modal
        show={show_pincode}
        onHide={handleClose_Pincode}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {(from_pin && !to_pin) && (
            <span>
              Shipper With This Pincode And Locality Is Not Present In Your Data Base To Proceed Further Enter Locality.
            </span>
          )}
          {(to_pin && !from_pin) &&
            <span>
              Consignee With This Pincode And Locality Is Not Present In Your Data Base To Proceed Further Enter Locality.
            </span>}
          {(to_pin && from_pin) &&
            <span>
              {`Shipper And Consignee With This Pincode And Locality Is Not Present In Your Data Base${location.state === null ? `To Proceed Further Enter Locality.` : `.`}`}
            </span>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose_Pincode}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Reject Resion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup>
            <Label for="exampleText">Text Area</Label>
            <Input
              id="exampleText"
              name="text"
              type="textarea"
              style={{ height: "90px" }}
              onChange={(e) => {
                setmessage(e.target.value);
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
      {/* Above code for table Section */}
      {check_ord &&
        <div
          style={{
            width: "calc(100% / 6)",
            zIndex: 1,
            height: "100%",
            overflowY: "scroll",
            boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
          }}
          className="custom-scrollbars__content"
        >
          <table className="styled-table" style={{ width: "100%" }}>
            <thead>
              <tr style={{ lineHeight: 2, blocalWidth: 1 }}>
                <th
                  style={{
                    width: "100%",
                    textAlign: "center",
                    // paddingLeft: "4px",
                    // paddingRight: "4px",
                    color: "black",
                    fontWeight: "bold",
                    background: "#92B4EC",
                  }}
                  rowSpan={2}
                >
                  {/* <div>
                    Docket No
                  </div> */}
                  <SearchList />
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
                    <tr key={index}>
                      <td>
                        <span
                          style={{
                            cursor: "pointer",
                            color: "blue",
                            fontFamily: "sans-serif",
                            fontSize: "300",
                          }}
                          onClick={() => {
                            // set_form_data(item);
                            setselected_docket(true);
                          }}
                        >
                          <Link
                            to="/booking/orders/addorder"
                            state={{ order: item, is_checkermaker: true }}
                          >
                            {item.docket_no}
                          </Link>
                          {/* {item.docket_no} */}
                          {/* <i
                          className="bx bxs-right-arrow-circle font-size-18 bx-fade-right"
                          style={{
                            color: "blue",
                            display: "flex",
                            position: "relative",
                            left: "13px",
                          }}
                        ></i> */}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      }
      {/* This code is for form Section */}
      <div
        style={{
          width: check_ord && width / 1.5,
          background: "",
          overflowY: "scroll",
          // borderRight: "1px solid black",
          // cursor:"col-resize",
          borderTopRightRadius: "8px",
          // borderLeft: "1px solid black",
          borderBottomLeftRadius: "8px",
          zIndex: 1,
          boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
        }}
        className={check_ord && "custom-scrollbars__content"}
      >
        {(selected_docket || !check_ord) ? (
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              validation.handleSubmit(e.values);
              return false;
            }}
            encType="multipart/form-data"
          >
            <Modal show={showOrder} onHide={handleCloseOrder}>
              <Modal.Header closeButton>
                <Modal.Title>Confirmation </Modal.Title>
              </Modal.Header>
              <Modal.Body>Do you want add another docket with same shipper</Modal.Body>
              <Modal.Footer>
                {!isLoading ?
                  <Button type="button" variant="secondary" onClick={() => send_order_data(validation.values, "yes")}>
                    Yes
                  </Button>
                  :
                  <Button
                    type="button" variant="secondary"
                  >
                    <Loader />
                  </Button>
                }
                {!isLoading ?
                  <Button type="button" variant="primary" onClick={() => send_order_data(validation.values, "no")}>
                    No
                  </Button>
                  :
                  <Button
                    type="button" variant="primary"
                  >
                    <Loader />
                  </Button>
                }
                <Button
                  variant="danger" onClick={() => setShowOrder(false)}
                  style={{ marginLeft: "-420px", marginRight: "380px" }}>
                  Cancel
                </Button>
              </Modal.Footer>
            </Modal>
            {/* Booking type */}

            <div className="m-3">
              <div
                className=" mb-2 main-header"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div>{isupdating ? "Update Order" : "Add Order"}</div>
                {/* {isupdating ? (
              <div style={{ justifyContent: "right", display: "flex" }}>
              <Button
              type="button"
              onClick={() => {
                handlClk();
              }}
              >History</Button>
            </div>
            ):(
              <></>
            )} */}

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
                {isupdating && (
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
                        <Col
                          lg={
                            order_type === "Return" || order_type === "Issue" ? 2 : 4
                          }
                          md={6}
                          sm={6}
                        >
                          <Label className="header-child">Booking For</Label>
                          <div className="">
                            <NSearchInput
                              data_list={order_type_list}
                              data_item_s={order_type}
                              show_search={false}
                              set_data_item_s={setorder_type}
                              disable_me={isupdating}
                            />
                          </div>
                        </Col>
                        {(order_type === "Return" || order_type === "Issue") && (
                          <Col lg={2} md={6} sm={6}>
                            <Label className="header-child">
                              Refrence Docket No
                            </Label>
                            <div className="">
                              <Input
                                type="number"
                                className="form-control-md"
                                id="input"
                                value={linked_order}
                                onChange={(e) => setlinked_order(e.target.value)}
                                placeholder="Enter Docket Number"
                                disabled={isupdating}
                              />
                            </div>
                          </Col>
                        )}

                        <Col lg={4} md={6} sm={6}>
                          <Label className="header-child">Bill To*</Label>
                          <SearchInput
                            data_list={billto_list}
                            setdata_list={setbillto_list}
                            data_item_s={billto}
                            set_data_item_s={setbillto}
                            set_id={setbillto_id}
                            // disable_me={isupdating}
                            page={billto_page}
                            setpage={setbillto_page}
                            setsearch_item={setsearch_billto}
                            error_message={"Plesae Select Any Bill To"}
                            error_s={billto_error}
                            loaded={billto_loaded}
                            count={billto_count}
                            bottom={billto_bottom}
                            setbottom={setbillto_bottom}
                          />
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
                              // disable_me={isupdating}
                              page={client_page}
                              setpage={setclient_page}
                              setsearch_item={setsearch_client}
                              error_message={"Plesae Select Any Client"}
                              error_s={client_error}
                              loaded={client_loaded}
                              count={client_count}
                              bottom={client_bottom}
                              setbottom={setclient_bottom}
                            />
                            {/* <div className="mt-1 error-text" color="danger">
                          {client_error ? "Please Select Client " : null}
                        </div> */}
                          </Col>
                        )}

                        {order_type !== "Airport To Airport" &&
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
                                      disabled={isupdating}
                                    />
                                    <label
                                      className="form-check-label input-box"
                                      htmlFor="exampleRadios1"
                                    >
                                      With Eway Bill No.
                                    </label>
                                  </div>
                                </Col>
                                {booking_through && (
                                  <Col lg={7} md={6} sm={6}>
                                    <div className="">
                                      <Input
                                        // max={12}
                                        type="number"
                                        className="form-control-md"
                                        id="input"
                                        value={ewaybill_no}
                                        onChange={(e) => {
                                          const { value } = e.target;
                                          if (value.length <= 12) {
                                            setewaybill_no(e.target.value);
                                          }
                                          // if (e.target.value.length <= 12) {
                                          //   // check_ewb_attached(e.target.value);
                                          // }
                                          // else {
                                          //   setewaybill_no_error(true);
                                          // }
                                        }}
                                        // onBlur={() => {
                                        //   if (ewaybill_no.length !== 12 && booking_through) {
                                        //     setewaybill_no_error(true);
                                        //   }
                                        // }}
                                        placeholder="Enter Eway Bill Number"
                                        disabled={isupdating}
                                        invalid={
                                          ewaybill_no_error
                                        }
                                      />
                                    </div>
                                    {ewaybill_no_error && (
                                      <div
                                        className="error-text" color="danger"
                                        style={{
                                          marginTop: 1,
                                        }}
                                      >
                                        Please Add Eway Bill No. (12 Digit)
                                      </div>
                                    )}
                                  </Col>
                                )}
                              </Row>
                            </div>
                          </Col>
                        }
                        {order_type !== "Airport To Airport" &&
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
                                      value="INTERNATIONAL"
                                      disabled={isupdating ? delivery_type : ""}
                                      onClick={() => {
                                        setdelivery_type("INTERNATIONAL");
                                      }}
                                      checked={delivery_type === "INTERNATIONAL"}
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
                        }
                        {order_type !== "Airport To Airport" &&
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
                        }
                        {entry_type_btn === "MANUALLY" && order_type !== "Airport To Airport" ? (
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
                                  const { value } = event.target;
                                  if (value.length <= 20) {
                                    setdocket_no_value(event.target.value);
                                  }
                                  if (event.target.value.length <= 5) {
                                    setdocket_error(true);
                                  } else {
                                    setdocket_error(false);
                                  }
                                }}
                                invalid={
                                  docket_error
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
                                  Docket number must be 6 or greater than 6 digit
                                  {/* </FormFeedback> */}
                                </div>
                              )}
                            </div>
                          </Col>
                        ) : null}

                        {order_type === "Airport To Airport" ? (
                          <Col lg={4} md={6} sm={6}>
                            <div className="mb-2">
                              <Label className="header-child">
                                AWB Number *
                              </Label>
                              <Input
                                min={0}
                                value={docket_no_value}
                                disabled={isupdating ? docket_no_value : ""}
                                onChange={(event) => {
                                  const { value } = event.target;
                                  if (value.length <= 20) {
                                    setdocket_no_value(event.target.value);
                                  }
                                  if (event.target.value.length <= 5) {
                                    setdocket_error(true);
                                  } else {
                                    setdocket_error(false);
                                  }
                                }}
                                invalid={
                                  docket_error
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
                                  AWB number must be 6 or greater than 6 digit
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

                        {order_type !== "Airport To Airport" &&
                          <>
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
                                  invalid={
                                    coldchain_error
                                  }
                                />
                              </div>
                              {coldchain_error && (
                                <div
                                  className="error-text" color="danger"
                                  style={{
                                    marginTop: -14,
                                  }}
                                >
                                  Select Any One Option
                                </div>
                              )}
                            </Col>
                            <Col
                              // lg={user.view_coldchain || user.is_superuser ? 2 : 4}
                              lg={2}
                              md={2}
                              sm={6}
                            >
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
                                  invalid={
                                    coldchain_error
                                  }
                                />
                              </div>
                            </Col>
                          </>
                        }
                        {order_type !== "Airport To Airport" &&
                          <Col lg={4} md={6} sm={6}>
                            <div className="mb-3">
                              <Label className="header-child">Type Of Booking*</Label>
                              <NSearchInput
                                data_list={type_of_booking_list}
                                data_item_s={type_of_booking}
                                set_data_item_s={settype_of_booking}
                                show_search={false}
                                error_message={"Please Select Type Of Booking"}
                                error_s={booking_type_error}
                              />
                            </div>
                          </Col>
                        }
                        <Col lg={4} md={6} sm={6}>
                          <div className="mb-2">
                            <Label className="header-child">
                              Booking Date & Time
                            </Label>
                            <div>
                              {/* <input
                            type="datetime-local"
                            className="form-control d-block form-control-md "
                            id="input"
                            value={booking_date}
                            onChange={(val) => {
                              setbooking_date(val.target.value);
                            }}
                            disabled={!user.is_superuser}
                          /> */}
                              <Input
                                type="datetime-local"
                                className="form-control d-block form-control-md"
                                id="input"
                                value={booking_date}
                                onChange={handleDateChange}
                                invalid={booking_date_error}
                              />
                              <FormFeedback type="invalid">
                                Booking Date Date Required
                              </FormFeedback>
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
                        {order_type !== "Airport To Airport" &&
                          <Col lg={4} md={6} sm={6}>
                            <div className="mb-3">
                              <Label className="header-child">Delivery Mode</Label>
                              <NSearchInput
                                data_list={delivery_mode_list}
                                data_item_s={delivery_mode}
                                set_data_item_s={setdelivery_mode}
                                show_search={false}
                              />
                              {/* <div className="mt-1 error-text" color="danger">
                          {delivery_mode_error
                            ? "Delivery Mode is required"
                            : null}
                        </div> */}
                            </div>
                          </Col>
                        }
                        {delivery_type !== "LOCAL" && (
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
                        )}
                        <Col lg={4} md={6} sm={6}>
                          <div className="mb-3">
                            <Label className="header-child">Is Warehouse</Label>
                            <br />
                            <Input
                              className="form-check-input-sm"
                              type="checkbox"
                              // value="false"
                              id="is_warehouse"
                              onClick={() => {
                                setis_warehouse(!is_warehouse);
                              }}
                              readOnly={true}
                              checked={is_warehouse}
                              disabled={isupdating}
                            />
                          </div>
                        </Col>
                        {is_warehouse &&
                          <Col lg={4} md={6} sm={6}>
                            <Label className="header-child">Warehouse *</Label>
                            <SearchInput
                              data_list={warehouse_list}
                              setdata_list={setwarehouse_list}
                              data_item_s={warehouse}
                              set_data_item_s={setwarehouse}
                              set_id={setwarehouse_id}
                              // disable_me={isupdating}
                              page={warehouse_page}
                              setpage={setwarehouse_page}
                              setsearch_item={setsearch_warehouse}
                              error_message={"Plesae Select Any Warehouse"}
                              error_s={warehouse_error}
                              loaded={warehouse_loaded}
                              count={warehouse_count}
                              bottom={warehouse_bottom}
                              setbottom={setwarehouse_bottom}
                            />
                          </Col>
                        }
                      </Row>
                    </CardBody>
                  ) : null}
                </Card>
              </Col>
            </div>

            {/*  Cold Chain Info Started  */}
            {cold_chain && (user.is_superuser || coldchain_permission[0]?.read) && (
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
                    {/* {(user.view_coldchain || user.is_superuser) && ( */}
                    {circle_btn3 ? (
                      <CardBody>
                        <Row>
                          <Col lg={2} md={2} sm={6}>
                            <div className="mb-3">
                              <Label className="header-child">
                                Qil Provide Asset
                              </Label>
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
                                disabled={isupdating || (!user.is_superuser && !coldchain_permission[0]?.write)}


                              />
                            </div>
                          </Col>
                          {asset_prov && (
                            <Col lg={4} md={6} sm={6}>
                              <div className="mb-2">
                                <Label className="header-child">Asset Type *</Label>
                                <NSearchInput
                                  data_list={asset_info_list}
                                  data_item_s={asset_info_selected}
                                  show_search={false}
                                  set_data_item_s={setasset_info_selected}
                                  error_message={"Please Select Asset Type"}
                                />
                              </div>
                            </Col>
                          )}
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
                                  setsearch_item={setsearch_box}
                                  loaded={box_loaded}
                                  count={box_count}
                                  bottom={box_bottom}
                                  setbottom={setbox_bottom}
                                  disabled={isupdating && !coldchain_permission[0]?.update && !user.is_superuser}
                                // setlist_id={}
                                />
                              </Col>
                            </>
                          ) : null}

                          {/* {asset_info_selected === "With Logger" ? (
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
                              loaded={logger_loaded}
                              count={logger_count}
                              bottom={logger_bottom}
                              setbottom={setlogger_bottom}
                              disabled={isupdating && !coldchain_permission[0]?.update && !user.is_superuser}
                            // setlist_id={}
                            />
                          </Col>
                        </>
                      ) : null} */}

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
                                    loaded={logger_loaded}
                                    count={logger_count}
                                    bottom={logger_bottom}
                                    setbottom={setlogger_bottom}
                                    disabled={isupdating && !coldchain_permission[0]?.update && !user.is_superuser}
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
                                    page={box_list_page}
                                    setpage={setbox_list_page}
                                    setsearch_item={setsearch_box}
                                    loaded={box_loaded}
                                    count={box_count}
                                    bottom={box_bottom}
                                    setbottom={setbox_bottom}
                                    disabled={isupdating && !coldchain_permission[0]?.update && !user.is_superuser}
                                  // setlist_id={}
                                  />
                                </div>
                              </Col>
                            </>
                          ) : null}

                          {asset_info_selected && <>
                            <Col
                              lg={4}
                              md={4}
                              sm={6}
                            >
                              <div className="mb-3">
                                <Label className="header-child">Credo box and Logger return</Label>
                                <br />
                                <Input
                                  className="form-check-input-sm"
                                  type="checkbox"
                                  id="box"
                                  onClick={() => {
                                    setis_credo_box_return(!is_credo_box_return);
                                  }}
                                  readOnly={true}
                                  checked={is_credo_box_return}
                                />
                              </div>
                            </Col>

                            <Col
                              lg={4}
                              md={4}
                              sm={6}
                            >
                              <div className="mb-3">
                                <Label className="header-child">Logger return only</Label>
                                <br />
                                <Input
                                  className="form-check-input-sm"
                                  type="checkbox"
                                  id="box"
                                  onClick={() => {
                                    setis_logger_return(!is_logger_return);
                                  }}
                                  readOnly={true}
                                  checked={is_logger_return}
                                />
                              </div>
                            </Col>

                            <Col
                              lg={4}
                              md={4}
                              sm={6}
                            >
                              <div className="mb-3">
                                <Label className="header-child">Credo box return only</Label>
                                <br />
                                <Input
                                  className="form-check-input-sm"
                                  type="checkbox"
                                  id="box"
                                  onClick={() => {
                                    setis_credo_return(!is_credo_return);
                                  }}
                                  readOnly={true}
                                  checked={is_credo_return}
                                />
                              </div>
                            </Col>
                          </>}
                        </Row>
                      </CardBody>
                    ) : null}
                  </Card>
                </Col>
              </div>
            )}

            {/*Manually Entry through  Shipper Info*/}
            {eway_confirm ? null : (
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
                                <Label className="header-child">Shipper*</Label>
                                <Input
                                  placeholder="Enter shipper name"
                                  id="input"
                                  value={shipper_n}
                                  onChange={(e) => {
                                    setshipper_n(e.target.value);
                                  }}
                                  onBlur={() => {
                                    if (shipper_n === "" && !booking_through) {
                                      setshipper_error(true);
                                    }
                                  }}
                                  invalid={
                                    shipper_error
                                  }
                                />
                              </div>
                              {shipper_error && (
                                <div
                                  className="error-text" color="danger"
                                  style={{
                                    marginTop: -14,
                                  }}
                                >
                                  Please Add Shipper Name
                                </div>
                              )}
                            </Col>

                            <>
                              <Col lg={4} md={6} sm={6}>
                                <div className="mb-2">
                                  <Label className="header-child">State*</Label>
                                  <SearchInput
                                    data_list={state_list_s}
                                    setdata_list={setstate_list_s}
                                    data_item_s={state}
                                    set_data_item_s={setstate}
                                    set_id={setstate_id}
                                    page={state_page}
                                    setpage={setstate_page}
                                    error_message={"Please Select Any State"}
                                    error_s={state_error}
                                    search_item={state_search_item}
                                    setsearch_item={setstate_search_item}
                                    loaded={state_loaded}
                                    count={state_count}
                                    bottom={state_bottom}
                                    setbottom={setstate_bottom}
                                  />
                                </div>
                              </Col>

                              <Col lg={4} md={6} sm={6}>
                                <div className="mb-2">
                                  <Label className="header-child">City*</Label>

                                  <SearchInput
                                    data_list={city_list_s}
                                    setdata_list={setcity_list_s}
                                    data_item_s={city}
                                    set_data_item_s={setcity}
                                    set_id={setcity_id}
                                    page={city_page}
                                    setpage={setcity_page}
                                    error_message={"Please Select Any City"}
                                    error_s={city_error}
                                    search_item={city_search_item}
                                    setsearch_item={setcity_search_item}
                                    loaded={city_loaded}
                                    count={city_count}
                                    bottom={city_bottom}
                                    setbottom={setcity_bottom}
                                  />
                                </div>
                              </Col>

                              <Col lg={4} md={6} sm={6}>
                                {pincode_loaded ? (
                                  <div className="mb-2">
                                    <Label className="header-child">
                                      Pin Code*
                                    </Label>
                                    <SearchInput
                                      data_list={pincode_list_s}
                                      setdata_list={setpincode_list_s}
                                      data_item_s={pincode}
                                      set_data_item_s={setpincode}
                                      set_id={setpincode_id}
                                      page={pincode_page}
                                      setpage={setpincode_page}
                                      search_item={pincode_search_item}
                                      setsearch_item={setpincode_search_item}
                                      error_message={"Please Select Any Pincode"}
                                      error_s={pincode_list_error}
                                      loaded={load_pincode}
                                      count={pincode_count}
                                      bottom={pincode_bottom}
                                      setbottom={setpincode_bottom}
                                    />
                                  </div>
                                ) : (
                                  <div className="mb-2">
                                    <Label className="header-child">
                                      Pin Code*
                                    </Label>
                                    <Input
                                      onChange={(val) => {
                                        setpincode(val.target.value);
                                        if (val.target.value.length !== 0) {
                                          setpincode_error(false);
                                          if (val.target.value.length === 6) {
                                            setpincode_error2(false);
                                          } else {
                                            setpincode_error2(true);
                                          }
                                        } else {
                                          setpincode_error(true);
                                        }
                                      }}
                                      onBlur={() => {
                                        if (pincode.length === 0) {
                                          setpincode_error(true);
                                        } else {
                                          if (pincode.length !== 6) {
                                            setpincode_error(false);
                                            setpincode_error2(true);
                                          } else {
                                            getPincode(
                                              pincode,
                                              "pincode",
                                              "Shipper"
                                            );
                                            setpincode_error2(false);
                                            setby_pincode(true);
                                          }
                                        }
                                      }}
                                      value={pincode}
                                      invalid={
                                        validation.touched.pincode &&
                                          validation.errors.pincode
                                          ? true
                                          : false
                                      }
                                      type="number"
                                      className="form-control-md"
                                      id="input"
                                      name="pincode1"
                                      placeholder="Enter Pin code"
                                    />

                                    {pincode_loaded === false &&
                                      pincode_error === true ? (
                                      <div
                                        style={{
                                          color: "#F46E6E",
                                          fontSize: "11.4px",
                                        }}
                                      >
                                        Please add pincode
                                      </div>
                                    ) : null}

                                    {pincode_loaded === false &&
                                      pincode_error === false &&
                                      pincode_error2 === true ? (
                                      <div
                                        style={{
                                          color: "#F46E6E",
                                          fontSize: "10.4px",
                                          marginTop: "4px",
                                        }}
                                      >
                                        pincode should 6 digit
                                      </div>
                                    ) : null}
                                  </div>
                                )}
                              </Col>

                              <Col lg={4} md={6} sm={6}>
                                <div className="mb-2">
                                  <Label className="header-child">Locality*</Label>
                                  <SearchInput
                                    data_list={locality_list_s}
                                    setdata_list={setlocality_list_s}
                                    data_item_s={locality}
                                    set_data_item_s={setlocality}
                                    set_id={setlocality_id_f}
                                    page={locality_page}
                                    setpage={setlocality_page}
                                    setsearch_item={setlocality_search_item}
                                    error_message={"Please Select Any Locality"}
                                    error_s={locality_error}
                                    loaded={locality_loaded}
                                    count={locality_count}
                                    bottom={locality_bottom}
                                    setbottom={setlocality_bottom}
                                  />
                                </div>
                              </Col>


                              <Col lg={4} md={6} sm={6}>
                                <div className="mb-2">
                                  <Label className="header-child">
                                    Contact Number
                                  </Label>
                                  <Input
                                    maxLength={10}
                                    value={shipper_contact_no}
                                    type="number"
                                    className="form-control-md"
                                    id="input"
                                    onChange={(e) => {
                                      const { value } = e.target;
                                      if (value.length <= 10) {
                                        setshipper_contact_no(e.target.value);
                                      }
                                    }}
                                  />
                                </div>
                              </Col>

                              <Col lg={4} md={6} sm={6}>
                                <div className="mb-2">
                                  <Label className="header-child">
                                    Address Line
                                  </Label>
                                  <Input
                                    value={shipper_address}
                                    type="text"
                                    className="form-control-md"
                                    id="input"
                                    onChange={(e) => {
                                      setshipper_address(e.target.value);
                                    }}
                                  />
                                </div>
                              </Col>
                              {!booking_through && isupdating && order?.order_channel === "MOBILE" && !locality_id_f &&
                                <Col lg={4} md={6} sm={6}>
                                  <div className="mb-2">
                                    <Label className="header-child">
                                      Mobile Shipper
                                    </Label>
                                    <Input
                                      value={m_shipper}
                                      type="text"
                                      className="form-control-md"
                                      id="input"
                                      onChange={(e) => {
                                        setm_shipper(e.target.value);
                                      }}
                                      disabled
                                    />
                                  </div>
                                </Col>
                              }
                              {!booking_through && isupdating && order?.order_channel === "MOBILE" && !locality_id_f &&
                                <Col lg={4} md={6} sm={6}>
                                  <div className="mb-2">
                                    <Label className="header-child">
                                      Mobile Origin
                                    </Label>
                                    <Input
                                      value={m_origin}
                                      type="text"
                                      className="form-control-md"
                                      id="input"
                                      onChange={(e) => {
                                        setm_origin(e.target.value);
                                      }}
                                      disabled
                                    />
                                  </div>
                                </Col>
                              }
                            </>
                          </>
                        </Row>
                      </CardBody>
                    ) : null}
                  </Card>
                </Col>
              </div>
            )}

            {/* Manually Entry Cosignee Info*/}
            {eway_confirm ? null : (
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
                            <Col lg={4} md="6" sm="6">
                              <div className="mb-3">
                                <Label className="header-child">Consignee *</Label>
                                <Input
                                  value={consignee_n}
                                  id="input"
                                  onChange={(e) => {
                                    setconsignee_n(e.target.value);
                                  }}
                                  onBlur={() => {
                                    if (consignee_n === "" && !booking_through) {
                                      setconsignee_error(true);
                                    }
                                  }}
                                  invalid={
                                    consignee_error
                                  }
                                  placeholder="Enter Consignee Name"
                                />
                              </div>
                              {consignee_error && (
                                <div
                                  className="error-text" color="danger"
                                  style={{
                                    marginTop: -14,
                                  }}
                                >
                                  Please Add Consignee Name
                                </div>
                              )}
                            </Col>

                            <>
                              <Col lg={4} md={6} sm={6}>
                                <div className="mb-2">
                                  <Label className="header-child">State*</Label>
                                  <SearchInput
                                    data_list={state_list_c}
                                    setdata_list={setstate_list_c}
                                    data_item_s={consginee_st}
                                    set_data_item_s={setconsginee_st}
                                    set_id={setstate_id_f_c}
                                    page={state_page_c}
                                    setpage={setstate_page_c}
                                    error_message={"Please Select Any State"}
                                    error_s={state_error_c}
                                    search_item={state_search_item_c}
                                    setsearch_item={setstate_search_item_c}
                                    loaded={statec_loaded}
                                    count={statec_count}
                                    bottom={statec_bottom}
                                    setbottom={setstatec_bottom}
                                  />
                                </div>
                              </Col>

                              <Col lg={4} md={6} sm={6}>
                                <div className="mb-2">
                                  <Label className="header-child">City*</Label>

                                  <SearchInput
                                    data_list={city_list__c}
                                    setdata_list={setcity_list__c}
                                    data_item_s={consginee_c}
                                    set_data_item_s={setconsginee_c}
                                    set_id={setcity_id_c}
                                    page={city_page_c}
                                    setpage={setcity_page_c}
                                    error_message={"Please Select Any City"}
                                    error_s={city_error_c}
                                    search_item={city_search_item_c}
                                    setsearch_item={setcity_search_item_c}
                                    loaded={cityc_loaded}
                                    count={cityc_count}
                                    bottom={cityc_bottom}
                                    setbottom={setcityc_bottom}
                                  />
                                </div>
                              </Col>
                              <Col lg={4} md={6} sm={6}>
                                {pincode_loaded_f_c ? (
                                  <div className="mb-2">
                                    <Label className="header-child">
                                      Pin Code*
                                    </Label>
                                    <SearchInput
                                      data_list={pincode_list_f_c}
                                      setdata_list={setpincode_list_f_c}
                                      data_item_s={consignee_pincode}
                                      set_data_item_s={setconsignee_pincode}
                                      set_id={setconsignee_p_id}
                                      page={pincode_page_c}
                                      setpage={setpincode_page_c}
                                      search_item={pincode_search_item_c}
                                      setsearch_item={setpincode_search_item_c}
                                      error_message={"Please Select Any Pincode"}
                                      error_s={pincode_list_error_c}
                                      loaded={loadc_pincode}
                                      count={pincodec_count}
                                      bottom={pincodec_bottom}
                                      setbottom={setpincodec_bottom}
                                    />
                                  </div>
                                ) : (
                                  <div className="mb-2">
                                    <Label className="header-child">
                                      Pin Code*
                                    </Label>
                                    <Input
                                      onChange={(val) => {
                                        setconsignee_pincode(val.target.value);
                                        if (val.target.value.length !== 0) {
                                          setpincode_error_f_c(false);
                                          if (val.target.value.length === 6) {
                                            setpincode_error2_f_c(false);
                                          } else {
                                            setpincode_error2_f_c(true);
                                          }
                                        } else {
                                          setpincode_error_f_c(true);
                                        }
                                      }}
                                      onBlur={() => {
                                        if (consignee_pincode.length === 0) {
                                          setpincode_error_f_c(true);
                                        } else {
                                          if (consignee_pincode.length !== 6) {
                                            setpincode_error_f_c(false);
                                            setpincode_error2_f_c(true);
                                          } else {
                                            getPincode(
                                              consignee_pincode,
                                              "pincode",
                                              "Consignee"
                                            );
                                            setpincode_error2_f_c(false);
                                            setby_pincode_f_c(true);
                                          }
                                        }
                                      }}
                                      value={consignee_pincode}
                                      invalid={
                                        validation.touched.consignee_pincode &&
                                          validation.errors.consignee_pincode
                                          ? true
                                          : false
                                      }
                                      type="number"
                                      className="form-control-md"
                                      id="input"
                                      name="pincode1"
                                      placeholder="Enter Pin code"
                                    />

                                    {pincode_loaded_f_c === false &&
                                      pincode_error_f_c === true ? (
                                      <div
                                        style={{
                                          color: "#F46E6E",
                                          fontSize: "11.4px",
                                        }}
                                      >
                                        Please add pincode
                                      </div>
                                    ) : null}

                                    {pincode_loaded_f_c === false &&
                                      pincode_error_f_c === false &&
                                      pincode_error2_f_c === true ? (
                                      <div
                                        style={{
                                          color: "#F46E6E",
                                          fontSize: "10.4px",
                                          marginTop: "4px",
                                        }}
                                      >
                                        pincode should 6 digit
                                      </div>
                                    ) : null}
                                  </div>
                                )}
                              </Col>

                              <Col lg={4} md={6} sm={6}>
                                <div className="mb-2">
                                  <Label className="header-child">Locality*</Label>
                                  <SearchInput
                                    data_list={locality_list_s_c}
                                    setdata_list={setlocality_list_s_c}
                                    data_item_s={locality_c}
                                    set_data_item_s={setlocality_c}
                                    set_id={setlocality_id_f_c}
                                    page={locality_page_c}
                                    setpage={setlocality_page_c}
                                    setsearch_item={setlocality_search_item_c}
                                    search_item={locality_search_item_c}
                                    error_message={"Please Select Any Locality"}
                                    error_s={locality_error_c}
                                    loaded={localityc_loaded}
                                    count={localityc_count}
                                    bottom={localityc_bottom}
                                    setbottom={setlocalityc_bottom}
                                  />
                                </div>
                              </Col>


                              <Col lg={4} md={6} sm={6}>
                                <div className="mb-2">
                                  <Label className="header-child">
                                    Contact Number
                                  </Label>
                                  <Input
                                    maxLength={10}
                                    value={consignee_contact_no}
                                    type="number"
                                    className="form-control-md"
                                    id="input"
                                    onChange={(e) => {
                                      const { value } = e.target;
                                      if (value.length <= 10) {
                                        setconsignee_contact_no(e.target.value);
                                      }
                                    }}
                                  />
                                </div>
                              </Col>

                              <Col lg={4} md={6} sm={6}>
                                <div className="mb-2">
                                  <Label className="header-child">
                                    Address Line
                                  </Label>
                                  <Input
                                    value={consignee_address}
                                    id="input"
                                    onChange={(e) => {
                                      setconsignee_address(e.target.value);
                                    }}
                                  />
                                </div>
                              </Col>

                              {!booking_through && isupdating && order?.order_channel === "MOBILE" && !locality_id_f_c &&
                                <Col lg={4} md={6} sm={6}>
                                  <div className="mb-2">
                                    <Label className="header-child">
                                      Mobile Consignee
                                    </Label>
                                    <Input
                                      value={m_consignee}
                                      type="text"
                                      className="form-control-md"
                                      id="input"
                                      onChange={(e) => {
                                        setm_consignee(e.target.value);
                                      }}
                                      disabled
                                    />
                                  </div>
                                </Col>
                              }
                              {!booking_through && isupdating && order?.order_channel === "MOBILE" && !locality_id_f_c &&
                                <Col lg={4} md={6} sm={6}>
                                  <div className="mb-2">
                                    <Label className="header-child">
                                      Mobile Destination
                                    </Label>
                                    <Input
                                      value={m_destination}
                                      type="text"
                                      className="form-control-md"
                                      id="input"
                                      onChange={(e) => {
                                        setm_destination(e.target.value);
                                      }}
                                      disabled
                                    />
                                  </div>
                                </Col>
                              }
                            </>
                          </>
                        </Row>
                      </CardBody>
                    ) : null}
                  </Card>
                </Col>
              </div>
            )}

            {/*Eway Bill through  Shipper Info*/}
            {eway_confirm ? (
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
                        {((!locality_id || locality_id === "") && (isupdating)) &&
                          <div style={divStyle}>
                            <div>These Fields Are Need To Add In Master Location Data</div>
                            <div><span style={spanStyle}>State: {toTitleCase(eway_detail_l.shipper_na_state)}</span> <span style={spanStyle}>Pincode: {toTitleCase(eway_detail_l.shipper_na_pincode)}</span> <span style={spanStyle}>Locality: {toTitleCase(eway_detail_l.shipper_na_locality)}</span></div>
                          </div>
                        }
                        <Row>
                          <>
                            <Col lg={4} md={6} sm={6}>
                              <div className="mb-3">
                                <Label className="header-child">Shipper *</Label>
                                {isupdating ? (
                                  <Input value={toTitleCase(eway_detail_l.shipper)} disabled id="input" />
                                ) : (
                                  <Input value={toTitleCase(eway_list?.fromTrdName)} disabled id="input" />
                                )}
                              </div>
                            </Col>

                            <>
                              <Col lg={4} md={6} sm={6}>
                                <div className="mb-2">
                                  <Label className="header-child">State</Label>

                                  {isupdating ? (
                                    <Input
                                      value={toTitleCase(eway_detail_l?.shipper_state ? eway_detail_l?.shipper_state : eway_detail_l?.shipper_na_state)}
                                      type="text"
                                      className="form-control-md"
                                      id="input"
                                      disabled
                                    />
                                  ) : (
                                    <Input
                                      value={toTitleCase(from_address?.state_name ? from_address?.state_name : from_state_eway)}
                                      type="text"
                                      className="form-control-md"
                                      id="input"
                                      disabled
                                    />
                                  )}
                                </div>
                              </Col>

                              <Col lg={4} md={6} sm={6}>
                                <div className="mb-2">
                                  <Label className="header-child">Pincode</Label>
                                  {isupdating ? (
                                    <Input
                                      value={eway_detail_l?.shipper_pincode ? eway_detail_l?.shipper_pincode : eway_detail_l?.shipper_na_pincode}
                                      disabled
                                      id="input"
                                    />
                                  ) : (
                                    <Input
                                      value={from_address?.pincode_name ? from_address?.pincode_name : eway_list?.fromPincode}
                                      type="text"
                                      className="form-control-md"
                                      id="input"
                                      disabled
                                    />
                                  )}
                                </div>
                              </Col>

                              {/* {from_state_eway && locality_list?.length === 0 ? */}
                              {locality_list?.length === 0 ?
                                <Col lg={4} md={6} sm={6}>
                                  <div className="mb-2">
                                    <Label className="header-child">
                                      Locality *
                                    </Label>
                                    <Input
                                      value={locality_sel}
                                      type="text"
                                      className="form-control-md"
                                      id="input"
                                      onChange={(e) => {
                                        setlocality_sel(e.target.value);
                                      }}
                                      invalid={locality_sel_error}
                                    />
                                    <FormFeedback type="invalid">
                                      Please Enter Locality
                                    </FormFeedback>
                                  </div>
                                </Col>
                                :
                                <Col lg={4} md={6} sm={6}>
                                  <div className="mb-2">
                                    <Label className="header-child">
                                      Locality shipper *
                                    </Label>

                                    <SearchInput
                                      data_list={locality_list}
                                      setdata_list={setlocality_list}
                                      data_item_s={locality_sel}
                                      set_data_item_s={setlocality_sel}
                                      set_id={setlocality_id}
                                      page={locality_sel_page}
                                      setpage={setlocality_sel_page}
                                      error_message={"Please Select Locality Type"}
                                      error_s={locality_sel_error}
                                      search_item={locality_sel_search_item}
                                      setsearch_item={setlocality_sel_search_item}
                                      loaded={locality_sel_loaded}
                                      count={locality_sel_count}
                                      bottom={locality_sel_bottom}
                                      setbottom={setlocality_sel_bottom}
                                    />
                                  </div>
                                </Col>
                              }

                              <Col lg={4} md={6} sm={6}>
                                <div className="mb-2">
                                  <Label className="header-child">
                                    Contact Number
                                  </Label>
                                  <Input
                                    maxLength={10}
                                    value={shipper_contact_no}
                                    type="number"
                                    className="form-control-md"
                                    id="input"
                                    onChange={(e) => {
                                      const { value } = e.target;
                                      if (value.length <= 10) {
                                        setshipper_contact_no(e.target.value);
                                      }
                                    }}
                                  />
                                </div>
                              </Col>

                              <Col lg={4} md={6} sm={6}>
                                <div className="mb-2">
                                  <Label className="header-child">
                                    Address Line
                                  </Label>
                                  {
                                    isupdating ? (
                                      <div
                                        style={{
                                          border: "1px solid",
                                          padding: "8px",
                                          backgroundColor: "#eff2f7",
                                          borderRadius: 5,
                                          borderColor: "#aaa",
                                        }}
                                      >
                                        {toTitleCase(eway_detail_l.shipper_address1)}
                                      </div>
                                    ) : (
                                      <div
                                        style={{
                                          border: "1px solid",
                                          padding: "8px",
                                          backgroundColor: "#eff2f7",
                                          borderRadius: 5,
                                          borderColor: "#aaa",
                                        }}
                                      >
                                        {toTitleCase(eway_list.fromAddr1) +
                                          "," +
                                          toTitleCase(eway_list.fromAddr2)}
                                      </div>
                                    )
                                    // {/* <Input

                                    //                                 value={eway_list.fromAddr1 + eway_list.fromAddr2}
                                    //                                 type="text"
                                    //                                 className="w-100"
                                    //                                 id="input"
                                    //                                 disabled
                                    //                               /> */}
                                  }
                                </div>
                              </Col>
                            </>
                          </>
                        </Row>
                      </CardBody>
                    ) : null}
                  </Card>
                </Col>
              </div>
            ) : null}

            {/* Eway Bill Through Cosignee Info*/}
            {eway_confirm ? (
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
                        {((!locality_id_to || locality_id_to === "") && (isupdating)) &&
                          <div style={divStyle}>
                            <div>These Fields Are Need To Add In Master Location Data</div>
                            <div><span style={spanStyle}>State: {toTitleCase(eway_detail_l.consignee_na_state)}</span> <span style={spanStyle}>Pincode: {toTitleCase(eway_detail_l.consignee_na_pincode)}</span> <span style={spanStyle}>Locality: {toTitleCase(eway_detail_l.consignee_na_locality)}</span></div>
                          </div>
                        }
                        <Row>
                          <>
                            <Col lg={4} md="6" sm="6">
                              <div className="mb-3">
                                <Label className="header-child">Consignee *</Label>
                                {isupdating ? (
                                  <Input value={toTitleCase(eway_detail_l.consignee)} disabled id="input" />
                                ) : (
                                  <Input value={toTitleCase(eway_list?.toTrdName)} disabled id="input" />
                                )}
                              </div>
                            </Col>

                            {eway_list && (
                              <>
                                <Col lg={4} md={6} sm={6}>
                                  <div className="mb-2">
                                    <Label className="header-child">State</Label>
                                    {isupdating ? (
                                      <Input
                                        value={toTitleCase(eway_detail_l?.consignee_state ? eway_detail_l?.consignee_state : eway_detail_l?.consignee_na_state)}
                                        disabled
                                        id="input"
                                      />
                                    ) : (
                                      <Input
                                        value={toTitleCase(to_address?.state_name ? to_address?.state_name : to_state_eway)}
                                        disabled
                                        id="input"
                                      />
                                    )}
                                  </div>
                                </Col>

                                <Col lg={4} md={6} sm={6}>
                                  <div className="mb-2">
                                    <Label className="header-child">Pincode</Label>
                                    {isupdating ? (
                                      <Input
                                        value={eway_detail_l?.consignee_pincode ? eway_detail_l?.consignee_pincode : eway_detail_l?.consignee_na_pincode}
                                        disabled
                                        id="input"
                                      />
                                    ) : (
                                      <Input
                                        value={to_address?.pincode_name ? to_address?.pincode_name : eway_list.toPincode}
                                        disabled
                                        id="input"
                                      />
                                    )}
                                  </div>
                                </Col>
                                {/* {to_state_eway && locslity_to_list?.length === 0 ? */}
                                {locslity_to_list?.length === 0 ?
                                  <Col lg={4} md={6} sm={6}>
                                    <div className="mb-2">
                                      <Label className="header-child">
                                        Locality *
                                      </Label>
                                      <Input
                                        value={locality_sel_to}
                                        type="text"
                                        className="form-control-md"
                                        id="input"
                                        onChange={(e) => {
                                          setlocality_sel_to(e.target.value);
                                        }}
                                        invalid={locality_sel_to_error}
                                      />
                                      <FormFeedback type="invalid">
                                        Please Enter Locality
                                      </FormFeedback>
                                    </div>
                                  </Col>
                                  :
                                  <Col lg={4} md={6} sm={6}>
                                    <div className="mb-2">
                                      <Label className="header-child">Locality *</Label>

                                      <SearchInput
                                        data_list={locslity_to_list}
                                        setdata_list={setlocslity_to_list}
                                        data_item_s={locality_sel_to}
                                        set_data_item_s={setlocality_sel_to}
                                        set_id={setlocality_id_to}
                                        page={locality_sel_to_page}
                                        setpage={setlocality_sel_to_page}
                                        error_message={"Please Select Locality Type"}
                                        error_s={locality_sel_to_error}
                                        search_item={locality_sel_to_search_item}
                                        setsearch_item={setlocality_sel_to_search_item}
                                        loaded={locality_sel_to_loaded}
                                        count={locality_sel_to_count}
                                        bottom={locality_sel_to_bottom}
                                        setbottom={setlocality_sel_to_bottom}
                                      />
                                    </div>
                                  </Col>
                                }

                                <Col lg={4} md={6} sm={6}>
                                  <div className="mb-2">
                                    <Label className="header-child">
                                      Contact Number
                                    </Label>
                                    <Input
                                      maxLength={10}
                                      value={consignee_contact_no}
                                      type="number"
                                      className="form-control-md"
                                      id="input"
                                      onChange={(e) => {
                                        const { value } = e.target;
                                        if (value.length <= 10) {
                                          setconsignee_contact_no(e.target.value);
                                        }
                                      }}
                                    />
                                  </div>
                                </Col>

                                <Col lg={4} md={6} sm={6}>
                                  <div className="mb-2">
                                    <Label className="header-child">
                                      Address Line
                                    </Label>
                                    {isupdating ? (
                                      // <Input
                                      //   value={toTitleCase(eway_detail_l.consignee_address1)}
                                      //   disabled
                                      //   id="input"
                                      // />
                                      <div
                                        style={{
                                          border: "1px solid",
                                          padding: "8px",
                                          backgroundColor: "#eff2f7",
                                          borderRadius: 5,
                                          borderColor: "#aaa",
                                        }}
                                      >
                                        {toTitleCase(eway_detail_l.consignee_address1)}
                                      </div>
                                    ) : (
                                      // <Input value={eway_list?.toAddr1} disabled />
                                      <div
                                        style={{
                                          border: "1px solid",
                                          padding: "8px",
                                          backgroundColor: "#eff2f7",
                                          borderRadius: 5,
                                          borderColor: "#aaa",
                                        }}
                                      >
                                        {toTitleCase(eway_list.toAddr1) +
                                          "," +
                                          toTitleCase(eway_list.toAddr2)}
                                      </div>
                                    )}
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
            {order_type !== "Airport To Airport" ?
              <div className="m-3">
                <Col lg={12}>
                  <Card className="shadow bg-white rounded">
                    <CardTitle className="mb-1 header">
                      <div className="header-text-icon header-text" id="tariff_info">
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
                              loaded={commodity_loaded}
                              count={commodity_count}
                              bottom={commodity_bottom}
                              setbottom={setcommodity_bottom}
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
                                  invalid={
                                    transportation_cost_err
                                  }
                                />
                              </div>

                              {transportation_cost_err && (
                                <div
                                  className="error-text" color="danger"
                                  style={{
                                    marginTop: -14,
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
                          {order_type === "Issue" && returned_data.length !== 0 && (
                            <Col lg={4} md={6} sm={6}>
                              <div className="mb-2">
                                <Label className="header-child">
                                  Total Delivered PCS
                                </Label>
                                <Input
                                  value={total_delivered_pcs}
                                  type="number"
                                  name="total_delivered_pcs"
                                  className="form-control-md"
                                  id="input"
                                  disabled
                                />
                              </div>
                            </Col>
                          )}
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
                          <Col lg={4} md={6} sm={6}>
                            <div className="mb-3">
                              <Label className="header-child">Type</Label>
                              <NSearchInput
                                data_list={type_list}
                                data_item_s={type}
                                set_data_item_s={settype}
                                show_search={false}
                              />
                              {/* <div className="mt-1 error-text" color="danger">
                          {d_cod_error ? "Select COD Type" : null}
                        </div> */}
                            </div>
                          </Col>
                          <Col lg={8}>
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
              :
              <div className="m-3">
                <Col lg={12}>
                  <Card className="shadow bg-white rounded">
                    <CardTitle className="mb-1 header">
                      <div className="header-text-icon header-text" id="tariff_info">
                        Commodity Flight Weight Info
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
                              loaded={commodity_loaded}
                              count={commodity_count}
                              bottom={commodity_bottom}
                              setbottom={setcommodity_bottom}
                            />
                            {/* {commodity_error ? (
                        <div className="mt-1 error-text" color="danger">
                          Please Select Any Commodity
                        </div>
                      ) : null} */}
                          </Col>

                          <Col lg={4} md={6} sm={6}>
                            <div className="mb-2">
                              <Label className="header-child">Rate Class</Label>
                              <Input

                                type="text"
                                name="rate_class"
                                className="form-control-md"
                                id="input"
                                placeholder="Enter Rate Class"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.rate_class || ""}
                              // onChange={(e)=>{
                              //   setrate_class(e.target.value)
                              // }}
                              // value={rate_class}
                              />
                              {/* {validation.touched.total_quantity &&
                          validation.errors.total_quantity ? (
                          <FormFeedback type="invalid">
                            {validation.errors.total_quantity}
                          </FormFeedback>
                        ) : null} */}
                            </div>
                          </Col>

                          <Col lg={4} md={6} sm={6}>
                            <div className="mb-3">
                              <Label className="header-child">Coloader</Label>
                              <SearchInput
                                data_list={coloader_list}
                                setdata_list={coloader_list}
                                data_item_s={coloader}
                                set_data_item_s={setcoloader}
                                set_id={setcoloader_id}
                                page={coloader_page}
                                setpage={setcoloader_page}
                                error_message={"Please Select Any State"}
                                error_s={coloader_error}
                                search_item={coloader_search_item}
                                setsearch_item={setcoloader_search_item}
                                loaded={coloader_loaded}
                                count={coloader_count}
                                bottom={coloader_bottom}
                                setbottom={setcoloader_bottom}
                              />
                            </div>
                          </Col>

                          <Col lg={4} md={6} sm={6}>
                            <div className="mb-2">
                              <Label className="header-child">Airlines Name *</Label>
                              <Input
                                type="text"
                                name="airlines_name"
                                className="form-control-md"
                                id="input"
                                placeholder="Enter Flight Name"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.airlines_name || ""}
                              // onChange={(e)=>{
                              //   setairlines_name(e.target.value)
                              // }}
                              // value={airlines_name}
                              />
                            </div>
                          </Col>

                          <Col lg={4} md={6} sm={6}>
                            <div className="mb-2">
                              <Label className="header-child">Flight Number *</Label>
                              <Input
                                type="text"
                                name="flight_no"
                                className="form-control-md"
                                id="input"
                                placeholder="Enter Flight Number"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.flight_no || ""}
                              // onChange={(e) => {
                              //   setflight_no(e.target.value)
                              // }}
                              // value={flight_no}
                              />
                            </div>
                          </Col>

                          <Col lg={4} md={6} sm={6}>
                            <div className="mb-2">
                              <Label className="header-child">Number Of Bags *</Label>
                              <Input
                                type="number"
                                name="no_of_bags"
                                className="form-control-md"
                                id="input"
                                placeholder="Enter Number Of Bags"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.no_of_bags || ""}
                              // onChange={(e) => {
                              //   setno_of_bags(e.target.value)
                              // }}
                              // value={no_of_bags}
                              />
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
                        </Row>
                      </CardBody>
                    ) : null}
                  </Card>
                </Col>
              </div>
            }

            {/* Tariff Info A2A*/}
            {order_type === "Airport To Airport" &&
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
                            <div className="mb-2">
                              <Label className="header-child">Rate *</Label>
                              <Input
                                type="number"
                                name="rate"
                                className="form-control-md"
                                id="input"
                                placeholder="Enter Rate"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.rate || ""}
                              // onChange={(e) => {
                              //   setrate(e.target.value)
                              // }}
                              // value={rate}
                              />
                            </div>
                          </Col>

                          <Col lg={4} md={6} sm={6}>
                            <div className="mb-2">
                              <Label className="header-child">Other Charge *</Label>
                              <Input
                                type="number"
                                name="other_charge"
                                className="form-control-md"
                                id="input"
                                placeholder="Enter Other Charge"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.other_charge || ""}
                              // onChange={(e) => {
                              //   setother_charge(e.target.value)
                              // }}
                              // value={other_charge}
                              />
                            </div>
                          </Col>

                          <Col lg={4} md={6} sm={6}>
                            <div className="mb-2">
                              <Label className="header-child">Carrier Charge *</Label>
                              <Input
                                type="number"
                                name="carrier_charge"
                                className="form-control-md"
                                id="input"
                                placeholder="Enter Carrier Charge"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.carrier_charge || ""}
                              // onChange={(e) => {
                              //   setcarrier_charge(e.target.value)
                              // }}
                              // value={carrier_charge}
                              />
                            </div>
                          </Col>

                          <Col lg={4} md={6} sm={6}>
                            <div className="mb-3">
                              <Label className="header-child">Tax Slab</Label>
                              <NSearchInput
                                data_list={tax_slab_list}
                                data_item_s={tax_slab}
                                set_data_item_s={settax_slab}
                                show_search={false}
                              />
                            </div>
                          </Col>

                          <Col lg={4} md={6} sm={6}>
                            <div className="mb-2">
                              <Label className="header-child">Handling Charge*</Label>
                              <Input
                                type="number"
                                name="handling_charge"
                                className="form-control-md"
                                id="input"
                                placeholder="Enter Handling Charge"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.handling_charge || ""}
                              // onChange={(e) => {
                              //   sethandling_charge(e.target.value)
                              // }}
                              // value={handling_charge}
                              />
                            </div>
                          </Col>

                          <Col lg={4} md={6} sm={6}>
                            <div className="mb-2">
                              <Label className="header-child">TSP *</Label>
                              <Input
                                type="number"
                                name="tsp"
                                className="form-control-md"
                                id="input"
                                placeholder="Enter TSP"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.tsp || ""}
                              // onChange={(e) => {
                              //   settsp(e.target.value)
                              // }}
                              // value={tsp}
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
            }

            {/*Status Info */}
            {(isupdating && can_view) || (isupdating && user.is_superuser) ? (
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

                          {(can_add || user.is_superuser) && (
                            <span>
                              <Button
                                type="button"
                                className="btn btn-info mx-1 cu_btn "
                                onClick={() => {
                                  if (
                                    status_data?.length > 1
                                  ) {
                                    navigate("/manifest/pickeduporders");
                                  } else {
                                    navigate("/booking/orders/adddocketstatus", {
                                      state: { order: order, type: "add" },
                                    });
                                  }
                                }}
                                disabled={(status_data?.length > 2)}
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
                            setstatus_data={setstatus_data}
                          />
                        </div>
                      </>
                    ) : null}
                  </Card>
                </Col>
              </div>
            ) : null}

            {/*Delivery Info */}
            {isupdating && user.is_superuser && order.is_delivered ? (
              <div className="m-3">
                <Col lg={12}>
                  <Card className="shadow bg-white rounded" id="status_info">
                    <CardTitle className="mb-1 header">
                      <div className="header-text-icon header-text">
                        Delivery Info
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <IconContext.Provider
                            value={{
                              className: "header-add-icon",
                            }}
                          >
                            <div onClick={toggle_circle_del}>
                              {circle_del_btn ? (
                                <MdRemoveCircleOutline />
                              ) : (
                                <MdAddCircleOutline />
                              )}
                            </div>
                          </IconContext.Provider>
                        </div>
                      </div>
                    </CardTitle>
                    {circle_del_btn ? (
                      <>
                        <div
                          style={{
                            maxHeight: "351px",
                            // maxHeight: "70px",
                            overflowY: "scroll",
                          }}
                        >
                          <DataList
                            Data_Title={DeliveryInfoDataTitle}
                            Data_Format={DeliveryInfoDataFormat}
                            order_id={order.id}
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
                        // onClick={() => {
                        //   setorder_active_btn("first");
                        //   updateCurrentStep(1);
                        // }}
                        >
                          {/* Packages */}
                          Dimensions
                        </div>
                        <div
                          id="images"
                          value="second"
                          style={{
                            background:
                              order_active_btn === "second" ? "#C4D7FE" : null,
                          }}
                          className="btn2 footer-text"
                        // onClick={() => {
                        //   setorder_active_btn("second");
                        //   updateCurrentStep(2);
                        // }}
                        >
                          Order Images
                        </div>
                        <div
                          style={{
                            background:
                              order_active_btn === "third" ? "#C4D7FE" : null,
                          }}
                          className="btn3 footer-text"
                        // onClick={() => {
                        //   setorder_active_btn("third");
                        //   updateCurrentStep(3);
                        // }}
                        >
                          Invoices
                        </div>
                        {cold_chain && (
                          <div
                            style={{
                              background:
                                order_active_btn === "forth" ? "#C4D7FE" : null,
                            }}
                            className="btn3 footer-text"
                            onClick={() => {
                              setorder_active_btn("forth");
                              updateCurrentStep(3);
                            }}
                          >
                            Logger Report
                          </div>
                        )}
                        {isupdating && validation.values.total_quantity > 0 && (
                          <div
                            style={{
                              background:
                                order_active_btn === "fifth" ? "#C4D7FE" : null,
                            }}
                            className="btn3 footer-text"
                            onClick={() => {
                              setorder_active_btn("fifth");
                              updateCurrentStep(3);
                            }}
                          >
                            Box Barcode
                          </div>
                        )}
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
                                <Label className="header-child">Length (Cm)</Label>
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
                                <Label className="header-child">Breadth (Cm)</Label>
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
                                <Label className="header-child">Height (Cm)</Label>
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
                                Add Another Dimensions
                              </span>
                            </div>
                          )}
                        </>
                      ) : (
                        ""
                      )}
                      {order_active_btn === "second" ? (
                        <>
                          {/* {" "}
                      {isupdating && (
                        <OrderImgDataFormat id={location.state.order.id} />
                      )} */}
                          <Row className="hide">
                            <Col md={5} sm={5}>
                              <div className="mb-3">
                                <Label className="header-child">Caption</Label>
                                {row1.map((item1, index1) => (
                                  <div
                                    style={{ height: "95px", paddingTop: 35 }}
                                    key={index1}
                                  >
                                    <select
                                      // disabled={item1[2] ? true : false}
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
                            <Col md={5} sm={5}>
                              <div className="mb-3">
                                <Label className="header-child">Image</Label>
                                {row1.map((item1, index1) => {
                                  return (
                                    <div style={{ width: "100%" }} key={index1}>
                                      {item1[0] ? (
                                        <img
                                          src={item1[0]}
                                          style={{
                                            height: "95px",
                                            width: "95px",
                                            borderRadius: "10px",
                                            paddingBottom: "5px",
                                          }}
                                          onClick={() => {
                                            setshowModalOrder({
                                              ...showModalOrder,
                                              value: true,
                                              ind: index1,
                                            });
                                          }}
                                        />
                                      ) : (
                                        <div
                                          style={{
                                            height: "95px",
                                            paddingTop: 35,
                                          }}
                                        >
                                          <div
                                            style={{
                                              display: "flex",
                                              flexDirection: "row",
                                              border: "0.5px solid #DAD7D7",
                                              alignItems: "center",
                                              height: "38px",
                                              borderRadius: 5,
                                              height: 31,
                                            }}
                                            onClick={() => {
                                              setshowModalOrder({
                                                ...showModalOrder,
                                                value: true,
                                                ind: index1,
                                              });
                                            }}
                                          >
                                            <a
                                              style={{
                                                marginLeft: "3px",
                                                fontSize: 11,
                                              }}
                                            >
                                              Chooose File
                                            </a>
                                            <div
                                              style={{
                                                fontSize: "25px",
                                                color: "#DAD7D7",
                                                marginLeft: "5px",
                                              }}
                                            >
                                              |
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </Col>
                            {showModalOrder.value ? (
                              // <Main_c
                              <ImgModal
                                modal={showModalOrder.value}
                                modal_set={() => {
                                  setshowModalOrder({
                                    ...showModalOrder,
                                    value: false,
                                  });
                                }}
                                pre_image={showModalOrder.ind !== "" ? row1[showModalOrder.ind][0] : ""}
                                upload_image={(val) => {
                                  // setdocumentOrder(val);
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
                                  // console.log("val------------", val)
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
                                    style={{ height: "95px", paddingTop: 35 }}
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
                                              deleteimage(item1);
                                              setSelectedFile(
                                                row1[row1.length - 1][0]
                                              );
                                              setcaption1(
                                                row1[row1.length - 1][1]
                                              );
                                            }}
                                          >
                                            <BiTrash
                                              color="red"
                                              size={21}
                                              style={{
                                                alignItems: "center",
                                                cursor: "pointer"
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
                                    row1[row1.length - 1][0] &&
                                    row1[row1.length - 1][1]
                                  ) {
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
                        </>
                      ) : (
                        ""
                      )}
                      {order_active_btn === "third" ? (
                        <>
                          {/* {isupdating && (
                        <InvoiceImgDataFormat id={location.state.order.id} />
                      )} */}
                          <Row>
                            {showModalInvoice.value ? (
                              // <Main_c
                              <ImgModal
                                modal={showModalInvoice.value}
                                modal_set={() => {
                                  setshowModalInvoice({
                                    ...showModalInvoice,
                                    value: false,
                                  });
                                }}
                                pre_image={(showModalInvoice.type === "invoice" && showModalInvoice.ind !== "") ? row2[showModalInvoice.ind][4] : (showModalInvoice.type === 'ewaybill' && showModalInvoice.ind !== "") ? row2[showModalInvoice.ind][5] : ""}
                                upload_image={(val) => {
                                  if (showModalInvoice.type === "invoice") {
                                    if (showModalInvoice.ind !== "") {
                                      row4[showModalInvoice.ind][4] = val;
                                      setshowModalInvoice({
                                        ...showModalInvoice,
                                        value: false,
                                        ind: "",
                                      });
                                    } else {
                                      row4[img_index][4] = val;
                                    }
                                  }
                                  else {
                                    if (showModalInvoice.ind !== "") {
                                      row4[showModalInvoice.ind][5] = val;
                                      setshowModalInvoice({
                                        ...showModalInvoice,
                                        value: false,
                                        ind: "",
                                      });
                                    } else {
                                      row4[img_index][5] = val;
                                    }
                                  }
                                }}
                                result_image={(val) => {
                                  if (showModalInvoice.type === "invoice") {
                                    if (showModalInvoice.ind !== "") {
                                      row2[showModalInvoice.ind][4] = val;
                                    } else {
                                      row2[img_index][4] = val;
                                      setinvoice_img(val);
                                    }
                                  }
                                  else {
                                    if (showModalInvoice.ind !== "") {
                                      row2[showModalInvoice.ind][5] = val;
                                    } else {
                                      row2[img_index][5] = val;
                                      setewaybill_img(val);
                                    }
                                  }
                                }}
                              />
                            ) : null}
                            {/* <Col md={row2.length > 1} sm={2}> */}
                            <Col md={2} sm={2}>
                              <div className="mb-3">
                                <Label className="header-child">EwayBill No</Label>
                                {row2.map((item2, index2) => (
                                  <div
                                    style={{ height: "95px", paddingTop: 35 }}
                                    key={index2}
                                  >
                                    <Input
                                      // min={0}
                                      key={index2}
                                      value={item2[0]}
                                      type="number"
                                      className="form-control-md"
                                      id="input"
                                      style={{ marginBottom: "15px" }}
                                      placeholder="Enter EwayBill No"

                                      onChange={(val) => {
                                        if (val.target.value.length === 12 && booking_through) {
                                          check_ewb_attached(val.target.value);
                                        }
                                        // else if (e.target.value.length < 12) {
                                        //   setewaybill_no(e.target.value);
                                        // }
                                        const { value } = val.target;
                                        if (value.length <= 12) {
                                          sete_waybill_inv(val.target.value);
                                          item2[0] = val.target.value;
                                          row4[index2][0] = val.target.value;
                                        }
                                      }}

                                    />
                                  </div>
                                ))}

                              </div>
                            </Col>
                            <Col md={2} sm={2}>
                              <div className="mb-3">
                                <Label className="header-child">
                                  Invoices Date
                                </Label>
                                {row2.map((item2, index2) => (
                                  <div
                                    key={index2}
                                    style={{ height: "95px", paddingTop: 35 }}
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
                                    // disabled={eway_confirm && index2 == 0}
                                    />
                                  </div>
                                ))}
                              </div>
                            </Col>
                            <Col md={2} sm={2}>
                              <div className="mb-3">
                                <Label className="header-child">
                                  Invoice Number
                                </Label>
                                {row2.map((item2, index2) => {
                                  return (
                                    <div
                                      style={{ height: "95px", paddingTop: 35 }}
                                      key={index2}
                                    >
                                      <Input
                                        min={0}
                                        maxLength={20}
                                        key={index2}
                                        value={item2[2]}
                                        type="text"
                                        className="form-control-md"
                                        id="input"
                                        style={{ marginBottom: "15px" }}
                                        placeholder="Enter Invoice No"
                                        onChange={(val) => {
                                          const { value } = val.target;
                                          if (value.length <= 20) {
                                            setinvoice_no(val.target.value);
                                            item2[2] = val.target.value;
                                            row4[index2][2] = val.target.value;
                                          }
                                        }}
                                      />
                                    </div>
                                  );
                                })}
                              </div>
                            </Col>
                            <Col md={1} sm={2}>
                              <div className="mb-3">
                                <Label className="header-child">
                                  Amount
                                </Label>
                                {row2.map((item2, index2) => (
                                  <div
                                    style={{ height: "95px", paddingTop: 35 }}
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
                                    // disabled={eway_confirm && index2 == 0}
                                    />
                                  </div>
                                ))}
                              </div>
                            </Col>
                            <Col md={2} sm={2}>
                              <div className="mb-3">
                                <Label className="header-child">
                                  Invoice Images
                                </Label>
                                {row2.map((item1, index1) => {
                                  return (
                                    <div style={{ width: "100%" }} key={index1}>
                                      {item1[4] ? (
                                        <img
                                          src={item1[4]}
                                          style={{
                                            height: "95px",
                                            width: "95px",
                                            borderRadius: "10px",
                                            paddingBottom: "5px",
                                          }}
                                          onClick={() => {
                                            setshowModalInvoice({
                                              ...showModalInvoice,
                                              value: true,
                                              ind: index1,
                                              type: "invoice",
                                            });
                                          }}
                                        />
                                      ) : (
                                        <div
                                          style={{
                                            height: "95px",
                                            paddingTop: 35,
                                          }}
                                        >
                                          <div
                                            style={{
                                              display: "flex",
                                              flexDirection: "row",
                                              border: "0.5px solid #dad7d7",
                                              alignItems: "center",
                                              height: "38px",
                                              borderRadius: 5,
                                              height: 31,
                                            }}
                                            onClick={() => {
                                              setimg_index(index1)
                                              setshowModalInvoice({
                                                ...showModalInvoice,
                                                value: true,
                                                ind: index1,
                                                type: "invoice",
                                              });
                                            }}
                                          >
                                            <a
                                              style={{
                                                marginLeft: "3px",
                                                fontSize: 11,
                                              }}
                                            >
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
                                            {/* {invoice_img === "" ? (
                                          <a style={{ fontSize: 11 }}>
                                            Image Not Uploaded
                                          </a>
                                        ) : (
                                          <a style={{ fontSize: 11 }}>
                                            Image Uploaded
                                          </a>
                                        )} */}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </Col>

                            <Col md={2} sm={2}>
                              <div className="mb-3">
                                <Label className="header-child">
                                  EwayBill Images
                                </Label>
                                {row2.map((item1, index1) => {
                                  return (
                                    <div style={{ width: "100%" }} key={index1}>
                                      {item1[5] ? (
                                        <img
                                          src={item1[5]}
                                          style={{
                                            height: "95px",
                                            width: "95px",
                                            borderRadius: "10px",
                                            paddingBottom: "5px",
                                          }}
                                          onClick={() => {
                                            setshowModalInvoice({
                                              ...showModalInvoice,
                                              value: true,
                                              ind: index1,
                                              type: "ewaybill",
                                            });
                                          }}
                                        />
                                      ) : (
                                        <div
                                          style={{
                                            height: "95px",
                                            paddingTop: 35,
                                          }}
                                        >
                                          <div
                                            style={{
                                              display: "flex",
                                              flexDirection: "row",
                                              border: "0.5px solid #dad7d7",
                                              alignItems: "center",
                                              height: "38px",
                                              borderRadius: 5,
                                              height: 31,
                                            }}
                                            onClick={() => {
                                              setimg_index(index1)
                                              setshowModalInvoice({
                                                ...showModalInvoice,
                                                value: true,
                                                ind: index1,
                                                type: "ewaybill",
                                              });
                                            }}
                                          >
                                            <a
                                              style={{
                                                marginLeft: "3px",
                                                fontSize: 11,
                                              }}
                                            >
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
                                            {/* {invoice_img === "" ? (
                                          <a style={{ fontSize: 11 }}>
                                            Image Not Uploaded
                                          </a>
                                        ) : (
                                          <a style={{ fontSize: 11 }}>
                                            Image Uploaded
                                          </a>
                                        )} */}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </Col>
                            {row2.length > 1 && (
                              <Col md={1}>
                                <div className="mb-3" style={{ textAlign: "center" }}>
                                  {row2.length > 1 ? (
                                    <Label className="header-child">Delete</Label>
                                  ) : null}
                                  {row2.map((item2, index2) => (
                                    <div
                                      style={{ height: "95px", paddingTop: 35 }}
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
                                                // if (item2[4] && isupdating) {
                                                //   deleteInvoiceImg(item2);
                                                // } else {
                                                deleteinvoice(item2);
                                                sete_waybill_inv(row2[row2.length - 1][0]);
                                                settoday(row2[row2.length - 1][1]);
                                                setinvoice_no(
                                                  row2[row2.length - 1][2]
                                                );
                                                setinvoice_value(
                                                  row2[row2.length - 1][3]
                                                );
                                                setinvoice_img(
                                                  row2[row2.length - 1][4]
                                                );
                                                setewaybill_img(
                                                  row2[row2.length - 1][5]
                                                );
                                                // }
                                              }}
                                            >
                                              <BiTrash
                                                color="red"
                                                size={21}
                                                style={{
                                                  alignItems: "center",
                                                  cursor: "pointer"
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
                            )}
                            <div>
                              <span
                                className="link-text"
                                onClick={() => {
                                  if (
                                    (row2[row2.length - 1][0].length === 12 || row2[row2.length - 1][0].length === 0) &&
                                    (row2[row2.length - 1][2] ||
                                      row2[row2.length - 1][3])
                                  ) {
                                    setshowModalInvoice({
                                      ...showModalInvoice,
                                      value: false,
                                      ind: "",
                                    });
                                    addinvoice();
                                  }
                                  else if (row2[row2.length - 1][0].length !== 12 && row2[row2.length - 1][0].length !== 0) {
                                    alert("Eway Bill Number Must Be 12 Digit");
                                  }
                                  else {
                                    alert("Invoice All Details Is Required");
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
                        </>
                      ) : (
                        ""
                      )}
                      {order_active_btn === "forth" && cold_chain ? (
                        <>
                          <Row className="hide">
                            <Col lg={3} md={3} sm={3}>
                              <div className="mb-3">
                                <Label className="header-child">
                                  Upload Report
                                </Label>
                                {row5.map((item, index) => {
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
                                        <div style={{ height: "5px" }}></div>
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

                      {isupdating && order_active_btn === "fifth" && (
                        <>
                          <Row>
                            <div style={{ display: "flex", flexWrap: "wrap" }}>
                              {row6.map((item, index) => (
                                <Col lg={2} md={2} sm={4} key={index}>
                                  <div className="mb-2" style={{ marginLeft: "3px" }}>
                                    <Input
                                      min={0}
                                      value={item[0]}
                                      type="text"
                                      className="form-control-md"
                                      id="input"
                                      style={{ marginBottom: "15px" }}
                                      placeholder="Barcode Not Added Yet"
                                      onChange={(val) => {
                                        setbox_bq(val.target.value);
                                        item[0] = val.target.value;
                                      }}
                                      disabled
                                    />
                                  </div>
                                </Col>
                              ))}
                            </div>
                          </Row>

                        </>
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
                  {currentStep !== 1 && (
                    <Button
                      type="button"
                      className="btn btn-info m-1 cu_btn"
                      disabled={currentStep === 1}
                      onClick={() => updateStep(currentStep - 1)}
                    >
                      <BiSkipPrevious size={18} /> Previous
                    </Button>
                  )}
                  {currentStep !== labelArray.length && (
                    <Button
                      type="button"
                      className="btn btn-info m-1 cu_btn"
                      onClick={() => {
                        let total_no_of_pieces = 0;
                        row.forEach((package_i) => {
                          let no_pi = package_i[3];
                          total_no_of_pieces += no_pi !== "" ? parseInt(no_pi) : 0;
                        });
                        if (order_type !== "Airport To Airport" &&
                          (length !== "" || breadth !== "" || height !== "" || pieces !== "") &&
                          (length === "" || breadth === "" || height === "" || pieces === "")
                        ) {
                          alert(
                            "Dimensions All Details Is Required"
                          );
                        }
                        else if (order_type !== "Airport To Airport" && total_no_of_pieces !== parseInt(validation.values.total_quantity)) {
                          alert(
                            "Total Number Of Pieces Is Not Equal To Total Number Of Quantity"
                          );
                        }
                        else {
                          updateStep(currentStep + 1)
                        }
                      }
                      }
                    // disabled={currentStep === labelArray.length}
                    // onClick={() => 
                    //   updateStep(currentStep + 1)}
                    >
                      Next <BiSkipNext size={18} />
                    </Button>
                  )}
                  {currentStep === labelArray.length && (
                    !isLoading ?
                      <Button
                        type="submit"
                        className={
                          isupdating &&
                            (user.user_department_name + " " + user.designation_name ===
                              "DATA ENTRY OPERATOR" ||
                              user.user_department_name +
                              " " +
                              user.designation_name ===
                              "CUSTOMER SERVICE EXECUTIVE")
                            ? "btn btn-info m-1"
                            : !isupdating
                              ? "btn btn-info m-1"
                              : "btn btn-success m-1"
                        }
                        onClick={() => setsame_as(false)}
                      >
                        {isupdating &&
                          (user.user_department_name + " " + user.designation_name ===
                            "DATA ENTRY OPERATOR" ||
                            user.user_department_name + " " + user.designation_name ===
                            "CUSTOMER SERVICE EXECUTIVE" ||
                            user.is_superuser)
                          ? "Update"
                          : !isupdating
                            ? "Save"
                            : "Approved"}
                      </Button>
                      :
                      <Button
                        type="button"
                        className={
                          isupdating &&
                            (user.user_department_name + " " + user.designation_name ===
                              "DATA ENTRY OPERATOR" ||
                              user.user_department_name +
                              " " +
                              user.designation_name ===
                              "CUSTOMER SERVICE EXECUTIVE")
                            ? "btn btn-info m-1"
                            : !isupdating
                              ? "btn btn-info m-1"
                              : "btn btn-success m-1"
                        }
                      >
                        <Loader />
                      </Button>
                  )}

                  {isupdating &&
                    user.user_department_name + " " + user.designation_name !==
                    "DATA ENTRY OPERATOR" &&
                    user.user_department_name + " " + user.designation_name !==
                    "CUSTOMER SERVICE EXECUTIVE" &&
                    !user.is_superuser &&
                    currentStep === labelArray.length && (
                      <button
                        type="button"
                        className="btn btn-danger m-1"
                        onClick={handleShow}
                      >
                        Rejected
                      </button>
                    )}

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
        ) : (
          <div
            className="Main-div"
            style={{
              textAlign: "center",
              alignContent: "center",
              fontSize: "20px",
              // marginTop: "70px",
              background: "#FFFFFF",
              width: "100%",
              height: "100%",
            }}
          >
            {" "}
            <span className="up_er">Please Select Any Docket </span>
          </div>
        )}
      </div>
      {/* This code is for order image Section */}
      {check_ord &&
        <div
          style={{
            width: width / 3.0,
            background: "",
            overflowY: "scroll",
            zIndex: 1,
          }}
          className="custom-scrollbars__content"
        >
          {selected_docket ? (
            <div className="m-1">
              {/* <div
                className=" mb-2 main-header"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                Order Images
              </div> */}

              {all_images.length > 0 && all_images.map((item, idx) => {
                return (
                  <Col lg={12} key={idx}>
                    <Card className="shadow bg-white rounded" id="doc_no">
                      <CardTitle className="mb-1 header">
                        <div
                          className="header-text-icon header-text"
                          style={{ fontSize: "400", fontWeight: "0.5rem" }}
                        >
                          {item.split(" ")[0]} Image
                        </div>
                      </CardTitle>
                      <CardBody
                        style={{
                          boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                          borderRadius: "20px",
                          color: "#FFFDE3",
                        }}
                      >

                        {/* <img
                            src={item.split(" ")[1]}
                            alt="React"
                            style={{
                              padding: "35px",
                              position: "absolute",
                              top: "18px",
                              left: "0",
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          /> */}
                        <ReactImageMagnify {...{
                          smallImage: {
                            alt: 'Wristwatch by Ted Baker London',
                            isFluidWidth: true,
                            src: item.split(" ")[1],
                            // width: 380,
                            // height: 240,
                          },
                          largeImage: {
                            src: item.split(" ")[1],
                            width: 1200,
                            height: 1800,
                          },
                          enlargedImagePosition: "over",
                          // enlargedImageContainerDimensions:{width: '100%', height: '100%'},
                        }} />
                      </CardBody>
                    </Card>
                  </Col>
                );
              })}
            </div>
          ) : (
            <div
              style={{
                textAlign: "center",
                alignContent: "center",
                fontSize: "20px",
                // marginTop: "70px",
                background: "#FFFFFF",
                width: "100%",
                height: "100%",
              }}
            >
              <span className="up_err">Please Select Any Docket </span>
            </div>
          )}
        </div>
      }
    </div>
  );
};

export default AddOrder;
