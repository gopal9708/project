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
import { Button } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  Col,
  Row,
  CardBody,
  CardTitle,
  Label,
  Input,
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
import { ServerAddress } from "../../../constants/ServerAddress";
import TransferList from "../../../components/formComponent/transferList/TransferList";
import DataList from "../../../components/listDisplay/dataList/DataList";
import StatusInfoDataTitle from "../../../data/booking/statusInfo/StatusInfoDataTitle";
import StatusInfoDataFormat from "../../../data/booking/statusInfo/StatusInfoDataFormat";
import NSearchInput from "../../../components/formComponent/nsearchInput/NSearchInput";
// import Button from 'react-bootstrap/Button';
import Modal from "react-bootstrap/Modal";
import Main_c from "../../../components/crop/main";

const AddAirportOrder = () => {
  const user = useSelector((state) => state.authentication.userdetails);


  // const page_num = useSelector((state) => state.pagination.page_number);
  const [page_num, setpage_num] = useState(1);
  const accessToken = useSelector((state) => state.authentication.access_token);
  const search = useSelector((state) => state.searchbar.search_item);
  const dispatch = useDispatch();

  const location = useLocation();
  // console.log("Airport_Order Location-----", location)

  const navigate = useNavigate();
  const [page, setpage] = useState(1);

  //Get Updated Location Data
  const [airport_order, setairport_order] = useState([]);
  // console.log("airport_order====",airport_order);
  const [airport_order_id, setairport_order_id] = useState("");
  const [isupdating, setisupdating] = useState(false);

  const [togclient, settogclient] = useState(false)
  const [togcommodity, settogcommodity] = useState(false)

  //Submit Buttom
  const [submit_btn, setsubmit_btn] = useState(false);

  // For Onfocus
  const [clicked, setclicked] = useState(false);
  //local delivery_type
  const [delivery_type, setdelivery_type] = useState("LOCAL");


  const [local_delivery_type, setlocal_delivery_type] = useState("");

  // Entry Type
  const [entry_type_btn, setentry_type_btn] = useState("AUTO GENERATE");

  //Docket number
  const [awb_no_value, setawb_no_value] = useState("");
  const [awb_error, setawb_error] = useState(false);

  //Cold chain
  const [cold_chain, setcold_chain] = useState(false);
  // console.log("cold_chain----", cold_chain)
  const [nonecold_chain, setnonecold_chain] = useState(true);

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
  // const [delivery_mode_list, setdelivery_mode_list] = useState();
  const [delivery_mode, setdelivery_mode] = useState("DOOR TO DOOR");

  //Client
  const [client_list, setclient_list] = useState([]);
  const [client, setclient] = useState("");
  const [client_id, setclient_id] = useState(0);
  const [selectClient, setselectClient] = useState([]);
  const [search_client, setsearch_client] = useState("");
  const [client_page, setclient_page] = useState(1);

  //Billto
  const [billto_list, setbillto_list] = useState([]);
  const [billto, setbillto] = useState("");
  const [billto_id, setbillto_id] = useState(0);
  const [search_billto, setsearch_billto] = useState("");
  const [billto_page, setbillto_page] = useState(1);
  const [billto_bottom, setbillto_bottom] = useState(103);
  const [billto_count, setbillto_count] = useState(1);
  const [billto_loaded, setbillto_loaded] = useState(false);

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
  const [shipper_locality_id, setshipper_locality_id] = useState(0);
  const [shipper_add_1, setshipper_add_1] = useState("");
  const [shipper_add_2, setshipper_add_2] = useState("");
  const [all_shipper_details, setall_shipper_details] = useState([]);
  // console.log("shipper_locality_id----", shipper_locality_id);

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
    // Clients Commidities Lists
    const [clients_commidities_lists, setclients_commidities_lists] = useState(
      []
    );
    const [client_commidities_list, setclient_commidities_list] = useState([]);
  
  const [commodity_data_list, setcommodity_data_list] = useState([]);
  const [commodity, setcommodity] = useState("");
  const [commodity_id, setcommodity_id] = useState(0);
  const [search_commodity, setsearch_commodity] = useState("");

  //Actual Weight
  const [actual_weight, setactual_weight] = useState("0");
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
  const [origincity_id, setorigincity_id] = useState(0);
  const [origincity_page, setorigincity_page] = useState(1);
  const [origincity_search_item, setorigincity_search_item] = useState("");
  const [origincity_bottom, setorigincity_bottom] = useState(103)
  const [origincity_count, setorigincity_count] = useState(1)
  const [origincity_loaded, setorigincity_loaded] = useState(false)
  const [origincity_error, setorigincity_error] = useState(false)

  //destinationcity
  const [destinationcity_list, setdestinationcity_list] = useState([]);
  const [destinationcity, setdestinationcity] = useState("");
  const [destinationcity_id, setdestinationcity_id] = useState(0);
  const [destinationcity_page, setdestinationcity_page] = useState(1);
  const [destinationcity_search_item, setdestinationcity_search_item] =
    useState("");
  const [destinationcity_bottom, setdestinationcity_bottom] = useState(103)
  const [destinationcity_count, setdestinationcity_count] = useState(1)
  const [destinationcity_loaded, setdestinationcity_loaded] = useState(false)
  const [destinationcity_error, setdestinationcity_error] = useState(false)



  // Delivery Info
  const [response_awb_no, setresponse_awb_no] = useState("");


  // Airport To Aiport  work
  const [tax_slab_list, settax_slab_list] = useState(["0%", "9%", "18%", "27%",]);
  const [tax_slab, settax_slab] = useState(tax_slab_list[2]);

  const [coloader, setcoloader] = useState("");
  const [coloader_list, setcoloader_list] = useState([]);

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
  const [delivery_mode_error, setdelivery_mode_error] = useState(false);
  const [client_error, setclient_error] = useState(false);
  const [client_bottom, setclient_bottom] = useState(103);
  const [client_loaded, setclient_loaded] = useState(false);
  const [client_count, setclient_count] = useState(1);

  const [billto_error, setbillto_error] = useState(false);
  const [transport_mode_error, settransport_mode_error] = useState(false);
  const [shipper_error, setshipper_error] = useState(false);
  const [consignee_error, setconsignee_error] = useState(false);
  const [commodity_error, setcommodity_error] = useState(false);
  const [commodity_loaded, setcommodity_loaded] = useState(false);
  const [commodity_count, setcommodity_count] = useState(1);
  const [commodity_bottom, setcommodity_bottom] = useState(103);

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

  // useEffect(() => {
  //   console.log("row1,,,,,,,,,,,,", row1);
  //   console.log("row3,,,,,,,,,,,,", row3);
  // }, [row1, row3]);
  // useEffect(() => {
  //   console.log("row2222222222222222222", row2)
  //   console.log("row4444444444444444444", row4)
  // }, [row2, row4])

  useEffect(() => {
    get_coloader();
  }, [])

  // validation
  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      // awb_no:  "",
      rate_class: airport_order.rate_class || "",
      flight_name: airport_order.flight_name || "",
      flight_no: airport_order.flight_no || "",
      no_of_bags: airport_order.no_of_bags || "0",
      chargeable_weight: airport_order.chargeable_weight || "0",
      rate: airport_order.rate || "0",
      other_charge: airport_order.other_charge || "0",
      carrier_charge: airport_order.carrier_charge || "0",
      // settax_slab: "",
      handling_charge: airport_order.handling_charge || "0",
      tsp: airport_order.tsp || "0",
      total_amount: airport_order.total_amount || "0",
      remarks: airport_order.remarks || "",
    },

    validationSchema: Yup.object({

      // total_quantity: Yup.string().required(" Total quantity is required"),
    }),

    onSubmit: (values) => {
      isupdating ? update_airport_order(values) : send_airport_order_data(values);
    }
  });

  // Get Packages
  const get_packages = () => {
    let temp = [];
    let temp_list = [];
    let temp_list2 = [];
    axios
      .get(ServerAddress + "booking/get-packages/?airport_order_id=" + airport_order_id, {
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
        alert(`Error Happen while Get Airport Package data  Data ${error}`);
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
          if (resp.data.next === null) {
            setorigincity_loaded(false);
          } else {
            setorigincity_loaded(true);
          }
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
          // cities_list = [...new Set(cities_list.map((v) => `${v}`))].map((v) =>
          //   v.split(",")
          // );
          // dcities_list = [...new Set(dcities_list.map((v) => `${v}`))].map(
          //   (v) => v.split(",")
          // );
          setorigincity_count(origincity_count + 2);
          setorigincity_list(cities_list);
          // setdestinationcity_list(dcities_list);
        }
        else{
          setorigincity_list([]);
        }
      })
      .catch((err) => {
        alert(`Error Occur in Get City, ${err}`);
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
          if (resp.data.next === null) {
            setdestinationcity_loaded(false);
          } else {
            setdestinationcity_loaded(true);
          }
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
          // dcities_list = [...new Set(dcities_list.map((v) => `${v}`))].map(
          //   (v) => v.split(",")
          // );
          setdestinationcity_count(destinationcity_count + 2);
          setdestinationcity_list(dcities_list);
        }
        else{
          setdestinationcity_list([]);
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
  // const getorder_delivery_data = (order_id) => {
  //   axios
  //     .get(
  //       ServerAddress +
  //       "bookings/api/get-order-delivery-info/?order_id=" +
  //       order_id,
  //       {
  //         headers: { Authorization: `Bearer ${accessToken}` },
  //       }
  //     )
  //     .then((response) => {
  //       setdelivery_info(response.data[0]);
  //     })
  //     .catch((err) => {
  //       alert(`Error Occur while Order Delivery Info, ${err}`);
  //     });
  // };

  const get_coloader = () => {
    axios
      .get(
        ServerAddress +
        `master/get_coloader/?p=${page}&records=${10}&name_search=${search}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        let temp = [];
        let temp2 = [...coloader_list];
        temp = response.data.results;
        for (let index = 0; index < temp.length; index++) {
          temp2.push([temp[index].id, toTitleCase(temp[index].name)]);
        }
        temp2 = [...new Set(temp2.map((v) => `${v}`))].map((v) => v.split(","));
        setcoloader_list(temp2);
      })
      .catch((err) => {
        alert(`Error While Loading Client , ${err}`);
      });
  };

  //Post Order Image
  const send_order_image = (awb) => {

    // console.log("=--=--=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-==-==-=-=-=")
    const docket_imageform = new FormData();

    // For Docket Image
    docket_imageform.append(`awb_no`, awb);
    docket_imageform.append("docketcount", row3.length);

    if (row3.length !== 0) {
      for (let index = 0; index < row3.length; index++) {
        docket_imageform.append(`DocketImage${index}`, row3[index][0], row3[index][0].name);
        docket_imageform.append(`DocketImageCaption${index}`, row1[index][1]);
      }
    }

    // For Invoice and Invoice Image
    docket_imageform.append("invoice_count", row4.length);
    if (row4.length !== 0) {
      for (let index = 0; index < row4.length; index++) {
        docket_imageform.append(`InvoiceImage${index}`,
          row4[index][0], row4[index][0].nane);
        docket_imageform.append(`invoice_date${index}`, row4[index][1]);
        docket_imageform.append(`invoice_no${index}`, row4[index][2]);
        docket_imageform.append(`invoice_amount${index}`, row4[index][3]);
        // docket_imageform.append(`Docket Image Caption ${index}`, row1[index][1]);
      }
    }


    axios
      .post(
        ServerAddress + "booking/add-order-images/",
        docket_imageform,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "content-type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        // console.log("Order Image Response1111", res.data);
        if (res.data.Data === "Done") {
          // successMSg();
          alert(
            `Your Docket Image Saved Successfully`,
          );
          // wipe_data();
          // setvisible(false);
        } else {
          // console.log("Ankkiii");
        }
      }).catch((err) => {
        // console.log("errrrrrrrrrrrrrrrrrrrAnkit", err)
      })
  };

  // Post Airport Order Data
  const send_airport_order_data = (values) => {
    alert("Send Airport To Airport Order !!")
    axios
      .post(
        ServerAddress + "booking/add_airport_order/",
        {
          awb_no: awb_no_value,
          booking_at: booking_date,
          billto: billto_id,
          client: client_id,
          shipper: shipper_id,
          consignee: consignee_id,
          // mobile_shipper: mobile_shipper,
          // mobile_consignee: mobile_consignee,
          // mobile_origin: mobile_origin,
          // mobile_destination: mobile_destination,
          shipper_name: shipper.toUpperCase(),
          // shipper_mobile: shipper_mobile,
          // shipper_email: shipper_email,        
          shipper_location: shipper_locality_id,
          consignee_name: consignee.toUpperCase(),
          // consignee_mobile: consignee_mobile,
          // consignee_email: consignee_email,        
          consignee_location: consignee_locality_id,
          commodity: commodity_id,
          rate_class: values.rate_class,
          coloader: coloader,
          flight_name: values.flight_name,
          flight_no: values.flight_no,
          no_of_bags: values.no_of_bags,
          actual_weight: actual_weight,
          chargeable_weight: values.chargeable_weight === "" ? null : values.chargeable_weight,
          rate: values.rate,
          other_charge: values.other_charge,
          carrier_charge: values.carrier_charge,
          tax_slab: tax_slab,
          handling_charge: values.handling_charge,
          tsp: values.tsp,
          total_amount: values.total_amount,
          remarks: values.remarks,
          packageList: row,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (response) {
        if (response.data.status === "success") {
          // console.log("Response data", response.data.data);
          // dispatch(setToggle(true));
          // setsubmit_btn(true);
          // send_order_image(response.data.data.docket_no)
          // setresponse_awb_no(response.data.awb_no);
          // dispatch(setShowAlert(true));
          // dispatch(setDataExist(`Order  ${awb_no_value} Added sucessfully`));
          // dispatch(setAlertType("success"));
          // navigate("/booking/orders");
        }
      })
      .catch((error) => {
        alert(`Error Happen while posting Order  Data ${error}`);
      });
  };

  const update_airport_order = (values) => {
    let id = airport_order.id;

    let fields_names = Object.entries({
      actual_weight: actual_weight,
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
      let prev = location.state.airport[`${ele[0]}`];
      let new_v = ele[1];
      if (String(prev).toUpperCase() !== String(new_v).toUpperCase()) {
        change_fields[`${ele[0]}`] = new_v.toString().toUpperCase();
      }
    }
    alert("Update Airport Order !!")
    axios
      .put(
        ServerAddress + "booking/" + id,
        {
          awb_no: awb_no_value,
          booking_at: booking_date,
          billto: billto_id,
          client: client_id,
          shipper: shipper_id,
          consignee: consignee_id,
          // mobile_shipper: mobile_shipper,
          // mobile_consignee: mobile_consignee,
          // mobile_origin: mobile_origin,
          // mobile_destination: mobile_destination,
          shipper_name: shipper.toUpperCase(),
          // shipper_mobile: shipper_mobile,
          // shipper_email: shipper_email,        
          shipper_location: shipper_locality_id,
          consignee_name: consignee.toUpperCase(),
          // consignee_mobile: consignee_mobile,
          // consignee_email: consignee_email,        
          consignee_location: consignee_locality_id,
          commodity: commodity_id,
          rate_class: values.rate_class,
          coloader: coloader,
          flight_name: values.flight_name,
          flight_no: values.flight_no,
          no_of_bags: values.no_of_bags,
          actual_weight: actual_weight,
          chargeable_weight: values.chargeable_weight === "" ? null : values.chargeable_weight,
          rate: values.rate,
          other_charge: values.other_charge,
          carrier_charge: values.carrier_charge,
          tax_slab: tax_slab,
          handling_charge: values.handling_charge,
          tsp: values.tsp,
          total_amount: values.total_amount,
          remarks: values.remarks,
          packageList: row,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (response) {
        // console.log("response-----", response)
        // console.log("response-----", order)
        if (response.data.status === "success") {
          send_order_image(airport_order.awb_no)
          dispatch(setToggle(true));
          dispatch(
            setDataExist(`Order Updated Sucessfully`)
          );
          dispatch(setAlertType("info"));
          dispatch(setShowAlert(true));
          navigate("/booking/AirportOrders");
        }
      })
      .catch(function () {
        alert(" Error While  UPDATING Airport Order");
      });
  };

  const [data, setdata] = useState(false);

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
        `master/get_asset_details/?p=${page_num}&records=${10}&asset_type=${String(
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
        if (isupdating && airport_order_id !== "") {
          get_orderasset(airport_order_id, box, logger);
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
    if (isupdating) {
      settogclient(false)
    }
  }, [])

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
    let timeoutId;
    if (client_id !== 0 && client_id !== "") {
      timeoutId = setTimeout(() => {
        getCommidityData();
      }, 1);
    }
    return () => clearTimeout(timeoutId);
  }, [page, search_commodity, client_id, search_commodity]);

  useEffect(() => {
    if (isupdating) {
      settogcommodity(false)
    }
  }, [])

  useEffect(() => {
    if (billto_id !== 0) {
      if (togclient) {
        setclient("");
        setclient_id("");
      }
    }
  }, [billto_id]);

  useEffect(() => {
    if (client_id !== 0) {
      if (togcommodity) {
        setcommodity("");
        setcommodity_id("");
      }
    }
  }, [client_id]);

  useEffect(() => {
    if (airport_order_id !== "") {
      get_packages();
    }
  }, [airport_order_id]);

  useEffect(() => {
    if ((data === true) & (isupdating === true)) {
      setclient_id(airport_order.client);
    }
    if (!isupdating) {
      setorigincity("");
      setorigincity_id("");
      setshipper_id("");
      setdestinationcity("");
      setdestinationcity_id("");
      setconsignee_id("");
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
      setshipper_locality_id(shipper_details.location);
    }
  }, [shipper_details, shipper_id]);

  useEffect(() => {
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

  // useEffect(() => {
  //   delivery_list();
  // }, [delivery_type]);

  useEffect(() => {
    if (response_awb_no !== "") {
      send_order_image();
    }
  }, [response_awb_no]);

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
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [message, setmessage] = useState("");
  const [ewaybill, setewaybill] = useState(false);

  useLayoutEffect(() => {
    getCities("all", "all");
  }, [origincity_page, origincity_search_item]);

  useLayoutEffect(() => {
    getDes_Cities("all", "all");
  }, [destinationcity_page, destinationcity_search_item])

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

  useLayoutEffect(() => {
    if (!isupdating) {
      if (delivery_type === "DOMESTIC") {
        settransport_mode_data_list(["Air", "Surface", "Train"]);
      } else {
        settransport_mode_data_list(["Local"]);
      }
      settransport_mode("");
    }
  }, [delivery_type]);

  //Cold chain
  // const [cold_chain, setcold_chain] = useState(false);
  // console.log("cold_chain----", cold_chain)
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
    if (cold_chain) {
      setnonecold_chain(false);
    } else {
      setnonecold_chain(true);
    }
  }, [cold_chain]);

  useEffect(() => {
    if (!location.state) {
      if (nonecold_chain) {
        setcold_chain(false);
      } else {
        setcold_chain(true);
      }
    }
  }, [nonecold_chain]);

  useLayoutEffect(() => {
    try {
      let airport_u = location.state.airport
      // console.log("airport_u====", airport_u.airport_packages[0].length);

      setairport_order(airport_u);
      setawb_no_value(airport_u.awb_no);
      setbooking_date(airport_u.booking_at);
      setbillto_id(airport_u.billto);
      setbillto(airport_u.billto_name);
      setclient_id(airport_u.client);
      setclient(airport_u.client_name);
      setcommodity_id(airport_u.commodity);
      setcommodity(airport_u.commodity_name);
      setcoloader(airport_u.coloader);
      setactual_weight(airport_u.actual_weight);

      setpackages_id(airport_u.airport_packages[0].id);
      setlength(airport_u.airport_packages[0].length);
      setbreadth(airport_u.airport_packages[0].breadth);
      setheight(airport_u.airport_packages[0].height);
      setpieces(airport_u.airport_packages[0].no_of_pieces);


    } catch (error) {

    }

  }, [location])

  return (
    <div>
      {/* Return The Order */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Return Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup>
            <Label for="exampleText">Resion</Label>
            <Input
              id="exampleText"
              name="text"
              type="textarea"
              style={{ height: "90px" }}
              onChange={(e) => {
                setmessage(e.target.value);
              }}
            />
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Save
          </Button>
          <Button color="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Return The Order */}
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
            <div>{isupdating ? "Update Airport Order" : "Add Airport To Airport"}</div>
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
                        <Label className="header-child">AWB Number *</Label>
                        <Input
                          onChange={(event) => {
                            setawb_no_value(event.target.value);
                            if (event.target.value.length !== 6) {
                              setawb_error(true);
                            } else {
                              setawb_error(false);
                            }
                          }}
                          value={awb_no_value}
                          type="number"
                          name="awb_no"
                          className="form-control-md"
                          id="input"
                          placeholder="Enter AWB Number"
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
                            value={booking_date}
                            onChange={(val) => {
                              setbooking_date(val.target.value);
                            }}
                          />
                        </div>
                      </div>
                    </Col>

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
                              setdata_list={setorigincity_list}
                              data_item_s={origincity}
                              set_data_item_s={setorigincity}
                              set_id={setorigincity_id}
                              page={origincity_page}
                              setpage={setorigincity_page}
                              error_message={"Please Select Any Option"}
                              error_s={origincity_error}
                              setsearch_item={setorigincity_search_item}
                              loaded={origincity_loaded}
                              count={origincity_count}
                              bottom={origincity_bottom}
                              setbottom={setorigincity_bottom}
                            />
                          </div>
                        </Col>

                        <Col lg={4} md={6} sm={6}>
                          <div className="mb-3">
                            <Label className="header-child">Shipper *</Label>
                            <Input
                              placeholder="Enter shipper name"
                              id="input"
                              value={shipper}
                              onChange={(e) => {
                                setshipper(e.target.value);
                              }}
                              onBlur={() => {
                                if (shipper === "") {
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
                              error_s={destinationcity_error}
                              search_item={destinationcity_search_item}
                              setsearch_item={setdestinationcity_search_item}
                              loaded={destinationcity_loaded}
                              count={destinationcity_count}
                              bottom={destinationcity_bottom}
                              setbottom={setdestinationcity_bottom}
                            />
                          </div>
                        </Col>

                        <Col lg={4} md="6" sm="6">
                          <div className="mb-3">
                            <Label className="header-child">Consignee *</Label>
                            <Input
                              value={consignee}
                              id="input"
                              onChange={(e) => {
                                setconsignee(e.target.value);
                              }}
                              onBlur={() => {
                                if (consignee === "") {
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



        {/*Commodity Flight Weight Info */}
        <div className="m-3">
          <Col lg={12}>
            <Card className="shadow bg-white rounded">
              <CardTitle className="mb-1 header">
                <div className="header-text-icon header-text">
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
                        <NSearchInput
                          data_list={coloader_list}
                          data_item_s={coloader}
                          set_data_item_s={setcoloader}
                          show_search={false}
                        />
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">Airlines Name *</Label>
                        <Input
                          type="text"
                          name="flight_name"
                          className="form-control-md"
                          id="input"
                          placeholder="Enter Flight Name"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.flight_name || ""}
                        // onChange={(e)=>{
                        //   setflight_name(e.target.value)
                        // }}
                        // value={flight_name}
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
                          onChange={(e) => setactual_weight(e.target.value)}
                          value={actual_weight}
                          type="number"
                          name="actual_weight"
                          className="form-control-md"
                          id="input"
                          placeholder="Enter Actual Weight in Kg"
                        />
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">
                          Chargeable Weight
                        </Label>
                        <Input
                          // disabled
                          type="number"
                          name="chargeable_weight"
                          className="form-control-md"
                          id="input"
                          placeholder="Enter Chargeable Weight in Kg"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.chargeable_weight || ""}
                        // onChange={(e) => {
                        //   setchargeable_weight(e.target.value)
                        // }}
                        // value={chargeable_weight}
                        />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              ) : null}
            </Card>
          </Col>
        </div>

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

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">Total Amount *</Label>
                        <Input
                          type="number"
                          name="total_amount"
                          className="form-control-md"
                          id="input"
                          placeholder="Enter Total Amount"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.total_amount || ""}
                        // onChange={(e) => {
                        //   settotal_amount(e.target.value)
                        // }}
                        // value={total_amount}
                        />
                      </div>
                    </Col>
                    <Col lg={4}>
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
                                  state: { airport_order: airport_order },
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
                        order_id={airport_order.awb_no}
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
                                        setshowModalOrder({
                                          ...showModalOrder,
                                          value: true,
                                          ind: index1
                                        });
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
                            <div style={{ height: "110px", paddingTop: 35 }} key={index1}>
                              <select
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
                                <option value="" disabled selected>Select status</option>
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
                            setdocumentOrder(val)
                            if (showModalOrder.ind !== "") {

                              console.log("ifffffffffffffffffffffffffff", val)
                              row3[showModalOrder.ind][0] = val
                              setshowModalOrder({
                                ...showModalOrder,
                                value: false,
                                ind: ""
                              });
                            } else {
                              console.log("elseeeeeeeeeeeeeeeeeeeeeeeeeeeeee333333333", val)
                              row3[row3.length - 1][0] = val
                            }
                          }
                          }
                          result_image={(val) => {
                            setSelectedFile(val);
                            if (showModalOrder.ind !== "") {

                              console.log("ifffffffffffffffffffffffffff",)
                              row1[showModalOrder.ind][0] = val
                            } else {
                              console.log("elseeeeeeeeeeeeeeeeeeeeeeeeeeeeee1111111111")
                              row1[row1.length - 1][0] = val
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
                            <div style={{ height: "110px", paddingTop: 35 }} key={index1}>
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
                                        if (row1.length - 1 === index1) {
                                          setSelectedFile(row1[row1.length - 2][0])
                                          setcaption1(row1[row1.length - 2][1])
                                        } else {
                                          setSelectedFile(row1[row1.length - 1][0])
                                          setcaption1(row1[row1.length - 1][1])

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
                            if (selectedFile && caption1) {
                              setshowModalOrder({
                                ...showModalOrder,
                                value: false,
                                ind: ""
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
                              row4[showModalInvoice.ind][0] = val
                              setshowModalInvoice({
                                ...showModalInvoice,
                                value: false,
                                ind: ""
                              });
                            } else {
                              row4[row4.length - 1][0] = val
                            }
                          }
                          }
                          result_image={(val) => {
                            if (showModalInvoice.ind !== "") {

                              row2[showModalInvoice.ind][0] = val

                            } else {
                              row2[row2.length - 1][0] = val
                              setinvoice_img(val)
                            }
                          }}
                        />
                      ) : null}
                      <Col md={3}>
                        <div className="mb-3"  >
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
                                // console.log("item!1111111111111111111111111111111111", item1)
                                return (
                                  <div style={{ width: "100%", }} key={index1}>
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
                                          ind: index1
                                        });
                                      }}
                                    />
                                  </div>
                                );
                              })
                            : null}
                          {invoice_img === "" ? (
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
                            <div key={index2} style={{ height: "110px", paddingTop: 35 }}>
                              <input
                                style={{ marginBottom: "15px" }}
                                type="date"
                                className="form-control d-block form-control-md"
                                id="input"
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
                            <div style={{ height: "110px", paddingTop: 35 }} key={index2}>
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
                            <div style={{ height: "110px", paddingTop: 35 }} key={index2}>
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
                            <div style={{ height: "110px", paddingTop: 35 }} key={index2}>
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
                                        deleteinvoice(item2);
                                        if (row2.length - 1 === index2) {

                                          setinvoice_img(row2[row2.length - 2][0])
                                          settoday(row2[row2.length - 2][1])
                                          setinvoice_no(row2[row2.length - 2][2])
                                          setinvoice_value(row2[row2.length - 2][3])
                                        } else {
                                          setinvoice_img(row2[row2.length - 1][0])
                                          settoday(row2[row2.length - 1][1])
                                          setinvoice_no(row2[row2.length - 1][2])
                                          setinvoice_value(row2[row2.length - 1][3])

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
                              invoice_img &&
                              today &&
                              invoice_no &&
                              invoice_value
                            ) {
                              setshowModalInvoice({
                                ...showModalInvoice,
                                value: false,
                                ind: ""
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
  );
};

export default AddAirportOrder;
