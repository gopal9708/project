import React, { useState, useEffect, useLayoutEffect } from "react";
import "../../../assets/scss/forms/form.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IconContext } from "react-icons";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { MdAddCircleOutline, MdRemoveCircleOutline } from "react-icons/md";
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
} from "reactstrap";
import { ServerAddress } from "../../../constants/ServerAddress";
import SearchInput from "../../../components/formComponent/searchInput/SearchInput";
import toTitleCase from "../../../lib/titleCase/TitleCase";
import {
  setAlertType,
  setDataExist,
  setShowAlert,
} from "../../../store/alert/Alert";
import { FiCheckSquare, FiSquare } from "react-icons/fi";
import Tab from "../../../components/formComponent/clientComponent/tab/Tab";
import BillingTab from "../../../components/formComponent/clientComponent/tab/BillingTab";
import NSearchInput from "../../../components/formComponent/nsearchInput/NSearchInput";
import { setAirCal, setLocalCal, setSurfaceCal } from "../../../store/master/client/Client";
import TransferList from "../../../components/formComponent/transferList/TransferList";

const AddClient = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { state: up_params } = useLocation();
  // console.log("up_params-------", up_params)

  const [same_as_data, setsame_as_data] = useState(false)

  const user_id = useSelector((state) => state.authentication.userdetails.id);
  const accessToken = useSelector((state) => state.authentication.access_token);
  const [isupdating, setisupdating] = useState(false);
  const [update_cal, setupdate_cal] = useState(false);
  // const [update_bill, setupdate_bill] = useState(false);

  // Client Details
  const [client_id, setclient_id] = useState(null);
  const [bill_to_nm, setbill_to_nm] = useState("");
  const [customer, setcustomer] = useState({});

  // Location Info
  const [state_list_s, setstate_list_s] = useState([]);
  const [state, setstate] = useState("");
  const [state_id, setstate_id] = useState(0);
  const [state_error, setstate_error] = useState(false);
  const [state_page, setstate_page] = useState(1);
  const [state_search_item, setstate_search_item] = useState("");
  const [state_loaded, setstate_loaded] = useState(false);
  const [state_count, setstate_count] = useState(1);
  const [state_bottom, setstate_bottom] = useState(103)
  const [togstate, settogstate] = useState(false)

  const [city_list_s, setcity_list_s] = useState([]);
  const [city, setcity] = useState("");
  const [city_id, setcity_id] = useState(0);
  const [city_error, setcity_error] = useState(false);
  const [city_page, setcity_page] = useState(1);
  const [city_search_item, setcity_search_item] = useState("");
  const [city_loaded, setcity_loaded] = useState(false);
  const [city_count, setcity_count] = useState(1);
  const [city_bottom, setcity_bottom] = useState(103)
  const [togcity, settogcity] = useState(false)

  const [by_pincode, setby_pincode] = useState(false);
  const [pincode_list_s, setpincode_list_s] = useState([]);
  const [pincode, setpincode] = useState("");
  const [pin_code_error, setpin_code_error] = useState(false);
  const [pincode_error, setpincode_error] = useState(false);
  const [pincode_error2, setpincode_error2] = useState(false);
  const [pincode_page, setpincode_page] = useState(1);
  const [pincode_search_item, setpincode_search_item] = useState("");
  const [pincode_id, setpincode_id] = useState(0);
  const [load_pincode, setload_pincode] = useState(false)
  const [pincode_count, setpincode_count] = useState(1)
  const [pincode_bottom, setpincode_bottom] = useState(103)
  const [togpincode, settogpincode] = useState(false)

  const [locality, setlocality] = useState("");
  const [pincode_loaded, setpincode_loaded] = useState(false);
  const [locality_list_s, setlocality_list_s] = useState([]);
  const [locality_page, setlocality_page] = useState(1);
  const [locality_search_item, setlocality_search_item] = useState("");
  const [locality_id, setlocality_id] = useState(0);
  const [locality_loaded, setlocality_loaded] = useState(false)
  const [locality_count, setlocality_count] = useState(1)
  const [locality_bottom, setlocality_bottom] = useState(103)
  const [locality_error, setlocality_error] = useState(false);
  const [locality_error2, setlocality_error2] = useState(false);

  // console.log("locality_id-----", locality_id)
  // console.log("locality-----", locality)

  // Calculation Info
  const local_cal = useSelector((state) => state.client.local_cal);
  const air_cal = useSelector((state) => state.client.air_cal);
  const surface_cal = useSelector((state) => state.client.surface_cal)

  // active Tabs
  let temp_active_tabs = [
    local_cal.cal_type,
    air_cal.cal_type,
    surface_cal.cal_type,
    "DONT",
    "DONT",
    "DONT",
  ];
  const [active_tabs, setactive_tabs] = useState(temp_active_tabs);
  const [activeTab, setactiveTab] = useState("1");
  const [activeAirTab, setactiveAirTab] = useState("02");
  const [activeSurfaceTab, setactiveSurfaceTab] = useState("03");
  const [is_oda_air, setis_oda_air] = useState(false);
  const [is_oda_surface, setis_oda_surface] = useState(false);

  // % Of Charge State
  const [is_per_charge, setis_per_charge] = useState(false);
  let per_tmp_lst = [[["", ""], "", ""]];
  const [per_charge_list, setper_charge_list] = useState(per_tmp_lst);

  // % Of Charge State
  const [is_per_charge_surfc, setis_per_charge_surfc] = useState(false);
  const [is_per_charge_air, setis_per_charge_air] = useState(false);
  let per_tmp_lst_air = [[["", ""], "", ""]];
  const [per_charge_list_air, setper_charge_list_air] =
    useState(per_tmp_lst_air);
  let per_tmp_lst_srfc = [[["", ""], "", ""]];
  const [per_charge_list_surface, setper_charge_list_surface] = useState(per_tmp_lst_srfc)

  // Business Info
  const [documentFiles, setdocumentFiles] = useState("");
  const [agreement_date, setagreement_date] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [agreement_end_date, setagreement_end_date] = useState(
    new Date(new Date().setMonth(new Date().getMonth() + 1))
      .toISOString()
      .split("T")[0]
  );

  const [refresh, setrefresh] = useState(false);

  // Service Offered Control
  const [is_local, setis_local] = useState(true);
  const [is_air, setis_air] = useState(false);
  const [is_surface, setis_surface] = useState(false);
  const [is_train, setis_train] = useState(false);
  const [is_cargo, setis_cargo] = useState(false);
  const [is_courier, setis_courier] = useState(false);
  const [is_warehouse, setis_warehouse] = useState(false);
  const [is_other, setis_other] = useState(false)

  // Multi Billing
  const [bill_row, setbill_row] = useState([["1", true]]);

  const [bill_generation_list, setbill_generation_list] = useState([
    "DAILY",
    "HALF-MONTHLY",
    "MONTHLY",
  ]);

  const [bill_generation, setbill_generation] = useState(
    bill_generation_list[0]
  );

  // Table Data Domestic
  // City to City
  let alist = [
    [
      [
        ["", ""],
        ["", ""],
      ],
      ["", "", "", ""],
      ["", "", "", ""],
    ],
    [
      [
        ["", ""],
        ["", ""],
      ],
      ["", "", "", ""],
      ["", "", "", ""],
    ],
    [
      [
        ["", ""],
        ["", ""],
      ],
      ["", "", "", ""],
      ["", "", "", ""],
    ],
    [
      [
        ["", ""],
        ["", ""],
      ],
      ["", "", "", ""],
      ["", "", "", ""],
    ],
    [
      [
        ["", ""],
        ["", ""],
      ],
      ["", "", "", ""],
      ["", "", "", ""],
    ],
    [
      [
        ["", ""],
        ["", ""],
      ],
      ["", "", "", ""],
      ["", "", "", ""],
    ],
    [
      [
        ["", ""],
        ["", ""],
      ],
      ["", "", "", ""],
      ["", "", "", ""],
    ],
    [
      [
        ["", ""],
        ["", ""],
      ],
      ["", "", "", ""],
      ["", "", "", ""],
    ],
    [
      [
        ["", ""],
        ["", ""],
      ],
      ["", "", "", ""],
      ["", "", "", ""],
    ],
    [
      [
        ["", ""],
        ["", ""],
      ],
      ["", "", "", ""],
      ["", "", "", ""],
    ],
  ];

  // Zone to Zone
  let blist = [
    [
      [
        ["", ""],
        ["", ""],
      ],
      ["", "", "", ""],
      ["", "", "", ""],
    ],
    [
      [
        ["", ""],
        ["", ""],
      ],
      ["", "", "", ""],
      ["", "", "", ""],
    ],
    [
      [
        ["", ""],
        ["", ""],
      ],
      ["", "", "", ""],
      ["", "", "", ""],
    ],
    [
      [
        ["", ""],
        ["", ""],
      ],
      ["", "", "", ""],
      ["", "", "", ""],
    ],
    [
      [
        ["", ""],
        ["", ""],
      ],
      ["", "", "", ""],
      ["", "", "", ""],
    ],
    [
      [
        ["", ""],
        ["", ""],
      ],
      ["", "", "", ""],
      ["", "", "", ""],
    ],
    [
      [
        ["", ""],
        ["", ""],
      ],
      ["", "", "", ""],
      ["", "", "", ""],
    ],
    [
      [
        ["", ""],
        ["", ""],
      ],
      ["", "", "", ""],
      ["", "", "", ""],
    ],
    [
      [
        ["", ""],
        ["", ""],
      ],
      ["", "", "", ""],
      ["", "", "", ""],
    ],
    [
      [
        ["", ""],
        ["", ""],
      ],
      ["", "", "", ""],
      ["", "", "", ""],
    ],
  ];
  const [datalist, setdatalist] = useState(alist);
  const [datalist1, setdatalist1] = useState(blist);
  const [dom_rate_type, setdom_rate_type] = useState("Flat");
  const [domestic_rate_type, setdomestic_rate_type] = useState("");

  const [dom_rate_category, setdom_rate_category] = useState("City to City");

  // FOr Local Billing Table
  let local_list = [
    [[["", ""]], ["", "", ""], ["", "", ""]],
    [[["", ""]], ["", "", ""], ["", "", ""]],
  ];

  const [local_datalist, setlocal_datalist] = useState(local_list);
  const [ot_chrg_prv, setot_chrg_prv] = useState([]);
  const [ot_chrg_prv_air, setot_chrg_prv_air] = useState([]);
  const [ot_chrg_prv_surface, setot_chrg_prv_surface] = useState([]);
  const [ot_chrg_prv_air_zone, setot_chrg_prv_air_zone] = useState([]);
  const [ot_chrg_prv_surface_zone, setot_chrg_prv_surface_zone] = useState([]);

  const [asso_del_ids, setasso_del_ids] = useState([]);
  const [dom_rt_del_ids_air, setdom_rt_del_ids_air] = useState([]);
  const [dom_rt_del_ids_surface, setdom_rt_del_ids_surface] = useState([]);
  const [dom_rt_del_ids_zone_air, setdom_rt_del_ids_zone_air] = useState([]);
  const [dom_rt_del_ids_zone_surface, setdom_rt_del_ids_zone_surface] = useState([]);
  const [per_del_ids, setper_del_ids] = useState([]);
  const [per_del_ids_air, setper_del_ids_air] = useState([]);
  const [per_del_ids_surfc, setper_del_ids_surfc] = useState([]);

  // local rate category
  const [dom_rate_type_local, setdom_rate_type_local] = useState("Flat");

  // clients commodities
  const [commodities_list, setcommodities_list] = useState([])
  const [commodities_list2, setcommodities_list2] = useState([])
  console.log("commodities_list2-----", commodities_list2)
  const [commodities_page, setcommodities_page] = useState(1)
  const [commodities_search_txt, setcommodities_search_txt] = useState("")
  const [commodities_error, setcommodities_error] = useState(false);
  const [commodities_loaded, setcommodities_loaded] = useState(false);
  const [commodities_count, setcommodities_count] = useState(1);
  const [commodities_bottom, setcommodities_bottom] = useState(103)

  // Card Control
  const [circle_btn, setcircle_btn] = useState(true);

  const toggle_circle = () => {
    setcircle_btn(!circle_btn);
  };

  const [circle_btn_location, setcircle_btn_location] = useState(true);
  const toggle_circle_location = () => {
    setcircle_btn_location(!circle_btn_location);
  };

  const [circle_btn_cal, setcircle_btn_cal] = useState(true);
  const toggle_circle_cal = () => {
    setcircle_btn_cal(!circle_btn_cal);
  };

  const [circle_btn5, setcircle_btn5] = useState(true);
  const toggle_circle5 = () => {
    setcircle_btn5(!circle_btn5);
  };

  //  Formik Yup Validation
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      customer_name: toTitleCase(customer.name) || "",
      email: customer.email || "",
      phone_number: customer.phone_number || "",
      address_line_1: toTitleCase(customer.address_line) || "",
    },

    validationSchema: Yup.object({
      customer_name: Yup.string().required("Client name is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      phone_number: Yup.string()
        .min(10, "Number should not less then 10 digit")
        .max(10, "Number should not more then 10 digit")
        .required("Phone number is required"),

      address_line_1: Yup.string().required("Address line 1 is required"),
    }),

    onSubmit: (values) => {
      let shaw = Object.entries(validation.values);
            let filter_value = shaw.filter((v) => v[1] === "" || v[1] === 0);
            let map_value = filter_value.map((m) => m[0]);
            let all_value = map_value[0];
        let fields = ["customer_name","email","phone_number"];
        let fields2= ["address_line_1"];


         if (fields.includes(all_value)) {
          document.getElementById("client_details").scrollIntoView();
        }
        else if (fields2.includes(all_value)){
          document.getElementById('location_info').scrollIntoView();
         }  
        else if (state === "") {
          setstate_error(true);
          document.getElementById('location_info').scrollIntoView();
        }
         else if (city === "") {
          setcity_error(true);
          document.getElementById('location_info').scrollIntoView();
        }
        else if (pincode === "") {
          setpin_code_error(true);
          document.getElementById('location_info').scrollIntoView();
        } 
        else if (pincode_loaded === false && pincode === "") {
          setpincode_error2(true);
          document.getElementById('location_info').scrollIntoView();
        }
        else if (pincode_loaded === false && locality === "") {
          setlocality_error2(true);
          document.getElementById('location_info').scrollIntoView();
        }
         else if (locality === "") {
          setlocality_error(true);
          document.getElementById('location_info').scrollIntoView();
        }
         else if (commodities_list2.length === 0) {
          setcommodities_error(true);
          document.getElementById("commidity_list").scrollIntoView();
        }
      else{
        isupdating ? updateClient(values) : addClient(values);
      }
    },
  });

  const setEmpty = () => {
    dispatch(
      setLocalCal({
        cal_type: "DONT",
        dimn: {
          cft: "",
          divided_by: "",
          from_date: new Date().toISOString().split("T")[0],
          to_date: new Date(new Date().setMonth(new Date().getMonth() + 1))
            .toISOString()
            .split("T")[0],
        },
        box_cal: {
          box_value: "",
          from_date: new Date().toISOString().split("T")[0],
          to_date: new Date(new Date().setMonth(new Date().getMonth() + 1))
            .toISOString()
            .split("T")[0],
        },
      })
    );

    dispatch(
      setAirCal({
        cal_type: "DONT",
        dimn: {
          cft: "",
          divided_by: "",
          from_date: new Date().toISOString().split("T")[0],
          to_date: new Date(new Date().setMonth(new Date().getMonth() + 1))
            .toISOString()
            .split("T")[0],
        },
        box_cal: {
          box_value: "",
          from_date: new Date().toISOString().split("T")[0],
          to_date: new Date(new Date().setMonth(new Date().getMonth() + 1))
            .toISOString()
            .split("T")[0],
        },
      })
    );

    dispatch(
      setSurfaceCal({
        cal_type: "DONT",
        dimn: {
          cft: "",
          divided_by: "",
          from_date: new Date().toISOString().split("T")[0],
          to_date: new Date(new Date().setMonth(new Date().getMonth() + 1))
            .toISOString()
            .split("T")[0],
        },
        box_cal: {
          box_value: "",
          from_date: new Date().toISOString().split("T")[0],
          to_date: new Date(new Date().setMonth(new Date().getMonth() + 1))
            .toISOString()
            .split("T")[0],
        },
      })
    );
  };


  // set and navigate function
  const setAllAdd = () => {
    setEmpty();
    dispatch(
      setDataExist(
        `New Client "${toTitleCase(
          validation.values.customer_name
        )}" Added Successfully`
      )
    );
    dispatch(setAlertType("success"));
    dispatch(setShowAlert(true));
    navigate(-1);
  }

  const setAllUpdate = () => {
    setEmpty();
    dispatch(
      setDataExist(
        `Client '${validation.values.customer_name}' Updated Sucessfully`
      )
    );
    dispatch(setAlertType("info"));
    dispatch(setShowAlert(true));
    navigate(-1);
  }


  // Commodities API Function
  const getCommodities = (val) => {
    let com_list = [];
    axios
      .get(
        ServerAddress +
        `master/GetClientCommodity/?search=${commodities_search_txt}&p=${commodities_page}&records=${10}&data=${val}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((resp) => {
        // console.log("commidity resp", resp)

        if (resp.data.results.length > 0) {
          if (resp.data.next === null) {
            setcommodities_loaded(false)
          }
          else {
            setcommodities_loaded(true)
          }
          if (commodities_page === 1) {
            com_list = resp.data.results.map((v) => [
              v.id,
              toTitleCase(v.commodity_name),
            ]);
          } else {
            com_list = [
              ...commodities_list,
              ...resp.data.results.map((v) => [
                v.id,
                toTitleCase(v.commodity_name),
              ]),
            ];
          }
          setcommodities_count(commodities_count + 2)
          setcommodities_list(com_list)
        }
        else {
          setcommodities_list([])
        }
        try {
          console.log("up_params======++++++", up_params)
          get_CommodityDetails(up_params.customer.id);
        } catch (error) { }

      })
      .catch((err) => {
        alert(`Error Occur in Get Commidities, ${err}`);
      });
  };

  const get_CommodityDetails = (id) => {

    let commodity_temp = [];
    let data = [];
    axios
      .get(
        ServerAddress +
        `master/get_client_commodities/?client_id=${id}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        data = response.data.commodities;

        if (data.length > 0) {
          commodity_temp = data.map((v) => [v.commodities, toTitleCase(v.commodities__commodity_name)]);
          setcommodities_list2(commodity_temp)
        }
      })
      .catch((err) => {
        alert(`Error Occur in Get Commodity, ${err}`);
      });
  };

  // Locations API Functions
  const getStates = () => {
    let state_list = [];
    axios
      .get(
        ServerAddress +
        `master/all_states/?search=${""}&place_id=all&filter_by=all&p=${state_page}&records=${10}&state_search=${state_search_item}&data=all`,
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
        }
        setstate_count(state_count + 2);
        setstate_list_s(state_list);
      })
      .catch((err) => {
        console.warn(`Error Occur in Get States, ${err}`);
      });
  };

  const getCities = (place_id, filter_by) => {
    setby_pincode(false);
    let cities_list = [];
    axios
      .get(
        ServerAddress +
        `master/all_cities/?search=${""}&p=${city_page}&records=${20}&city_search=${city_search_item}&data=all` +
        "&place_id=" +
        place_id +
        "&filter_by=" +
        filter_by,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((resp) => {
        settogcity(true);
        if (resp.data.next === null) {
          setcity_loaded(false);
        } else {
          setcity_loaded(true);
        }
        if (resp.data.results.length > 0) {
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
          setcity_list_s([]);
        }
      })
      .catch((err) => {
        console.warn(`Error Occur in Get City, ${err}`);
      });
  };

  const getPincode = (place_id, filter_by) => {
    let pincode_list = [];
    axios
      .get(
        ServerAddress +
        `master/all_pincode/?search=${""}&p=${pincode_page}&records=${10}&pincode_search=${pincode_search_item}&data=all` +
        "&place_id=" +
        place_id +
        "&filter_by=" +
        filter_by,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((resp) => {
        settogpincode(true);
        if (resp.data.next === null) {
          setload_pincode(false);
        } else {
          setload_pincode(true);
        }
        if (filter_by !== "pincode") {
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
        } else if (resp.data.results.length > 0) {
          setcity(toTitleCase(resp.data.results[0].city_name));
          setcity_id(resp.data.results[0].city);
          setstate(toTitleCase(resp.data.results[0].state_name));
          setstate_id(resp.data.results[0].state);
          setpincode(resp.data.results[0].pincode);
          setpincode_id(resp.data.results[0].id);
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

  const getLocality = (place_id, filter_by) => {
    let locality_list = [];
    axios
      .get(
        ServerAddress +
        `master/all_locality/?search=${""}&p=${locality_page}&records=${10}` +
        `&place_id=${place_id}&filter_by=${filter_by}&name_search=${locality_search_item}&state=&city=&name=&data=all`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((resp) => {
        if (resp.data.next === null) {
          setlocality_loaded(false);
        } else {
          setlocality_loaded(true);
        }
        if (resp.data.results.length > 0) {
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
          setlocality_count(locality_count + 2);
          setlocality_list_s(locality_list);
        }
        else {
          setlocality_list_s([]);
        }
      })
      .catch((err) => {
        console.warn(`Error Occur in Get Pincode , ${err}`);
      });
  };



  // Client Document Api Function
  const addClientDoc = (client_id) => {
    const docket_imageform = new FormData();
    docket_imageform.append(`client_id`, client_id);
    docket_imageform.append(`clientdocument`, documentFiles, documentFiles?.name);
    console.log("clientdocumentclientdocumentclientdocument", documentFiles?.name)
    axios
      .post(ServerAddress + "master/add_client_doc/", docket_imageform, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "content-type": "multipart/form-data",
        },
      })
      .then(function (resp) {

        console.log("resp", resp)
      })
      .catch((err) => alert(`Error occur while add client doc , ${err}`));
  };

  // Client API Functions
  const addClient = (values) => {
    let commodity_id = commodities_list2.map((v) => v[0]);

    let commidity_lst = [...new Set(commodity_id.map((v) => `${v}`))].map((v) =>
      parseInt(v.split(","))
    );
    axios
      .post(
        ServerAddress + "master/add_client/",
        {
          name: toTitleCase(values.customer_name).toUpperCase(),
          email: values.email,
          phone_number: values.phone_number,
          address_line: toTitleCase(values.address_line_1).toUpperCase(),
          location: locality_id,
          created_by: user_id,
          bill_to: client_id,
          commodities: commidity_lst,
          bill_generation_time_frame: bill_generation,
          agreement_start_date: agreement_date,
          agreement_end_date: agreement_end_date,
          current_billing_mode_local: local_cal.cal_type,
          current_billing_mode_air: air_cal.cal_type,
          current_billing_mode_surface: surface_cal.cal_type,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (resp) {
        console.log("add client resp", resp);
        if (resp.status === 201) {
          if (documentFiles !== "") {
            addClientDoc(resp.data.data.id);
          }

          if (local_cal.cal_type !== "DONT" || air_cal.cal_type !== "DONT" || surface_cal.cal_type !== "DONT") {
            addCalculation(
              resp.data.data.id,
              toTitleCase(values.customer_name)
            );
          } else {

            setAllAdd()
          }
        } else if (resp.data === "duplicate") {
          dispatch(setShowAlert(true));
          dispatch(
            setDataExist(
              `Client Name "${toTitleCase(
                values.customer_name
              )}" Already Exists`
            )
          );
          dispatch(setAlertType("warning"));
        }
      })
      .catch((error) => {
        alert(`Error Happen while posting Client  Data ${error}`);
      });
  };
  const updateClient = (values) => {
    let cust_up = up_params.customer;

    // Object Similar To JSON Object get from backend To Compare New and Old Data
    let fields_names = Object.entries({
      name: toTitleCase(values.customer_name).toUpperCase(),
      email: values.email,
      phone_number: values.phone_number,
      address_line: toTitleCase(values.address_line_1).toUpperCase(),
      location: locality_id,
      bill_to: client_id,
      current_billing_mode_local: local_cal.cal_type,
      current_billing_mode_air: air_cal.cal_type,
      current_billing_mode_surface: surface_cal.cal_type,
    });
    // To Check Any Changes Happen or Not
    let change_fields = {};
    for (let j = 0; j < fields_names.length; j++) {
      const ele = fields_names[j];
      let prev = cust_up[`${ele[0]}`];
      let new_v = ele[1];
      if (prev !== new_v) {
        change_fields[`${ele[0]}`] = new_v;
      }
    }

    let commidity_lst_tmp = up_params.customer.commodities

    let commidity_id_list = commodities_list2.map((v) => v[0]).filter((v) => v !== null);
    let commidity_lst = [...new Set(commidity_id_list.map((v) => `${v}`))].map((v) =>
      parseInt(v.split(","))
    );
    let com_change = commidity_lst.every((v, idx) => commidity_lst_tmp.includes(v))

    if ((commidity_lst_tmp.length !== commidity_lst.length) || com_change === false) {
      change_fields['commodities'] = commidity_lst
    }

    axios
      .put(
        ServerAddress + "master/update_client/" + customer.id,
        {
          name: toTitleCase(values.customer_name).toUpperCase(),
          email: values.email,
          phone_number: values.phone_number,
          address_line: toTitleCase(values.address_line_1).toUpperCase(),
          location: locality_id,
          bill_to: client_id,
          commodities: commidity_lst,
          current_billing_mode_local: local_cal.cal_type,
          current_billing_mode_air: air_cal.cal_type,
          current_billing_mode_surface: surface_cal.cal_type,
          modified_by: user_id,
          change_fields: change_fields,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (resp) {
        console.log("update data " ,  resp.data);
        if (resp.data.status === "success") {

          if (documentFiles !== "") {
            // addClientDoc(resp.data.data.id);
          }
          if (local_cal.cal_type !== "DONT" || air_cal.cal_type !== "DONT" || surface_cal.cal_type !== "DONT") {
            if (update_cal) {
              updateCalculation(values.customer_name);
            } else {
              addCalculation(customer.id, values.customer_name);
            }
          } else {


            setAllUpdate()
          }
        } else if (resp.data === "duplicate") {
          dispatch(setShowAlert(true));
          dispatch(
            setDataExist(
              `Client Name "${toTitleCase(
                values.customer_name
              )}" Already Exists`
            )
          );
          dispatch(setAlertType("warning"));
        }
      })
      .catch((error) => {
        alert(`Error Happen while posting Client Data ${error}`);
      });
  };

  // Client Billing API Functions
  // Calculation API Functions
  const addCalculation = (cust_id, name) => {
    let tmp_cal_info_data = {
      local: local_cal,
      air: air_cal,
      surface: surface_cal,
    };

    axios
      .post(
        ServerAddress + "master/add_calculation/",
        {
          bill_to: client_id,
          client: cust_id,
          created_by: user_id,
          calculation_info_data: tmp_cal_info_data,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (resp) {
        // console.log("add cal resp", resp);
        if (resp.status === 201) {
          if (local_cal.cal_type !== "DONT" && local_datalist.filter((v) => v[0][0][0] !== "")) {
            addAssociatedCharges(cust_id, name);
          }
          else if (is_per_charge) {
            addPerCharges(cust_id, name)
          }
          else {
            setAllAdd()
          }


          if (air_cal.cal_type !== "DONT") {
            if (dom_rate_category === "City to City") {
              addDomesticCityRates(cust_id, name);
            } else if (dom_rate_category === "Zone to Zone") {
              addDomesticZoneRates(cust_id, name);
            } else {
              addDomesticCityRates(cust_id, name);
              addDomesticZoneRates(cust_id, name);
            }
          }

          if (surface_cal.cal_type !== "DONT") {
            if (dom_rate_category === "City to City") {
              addDomesticCityRates(cust_id, name);
            } else if (dom_rate_category === "Zone to Zone") {
              addDomesticZoneRates(cust_id, name);
            } else {
              addDomesticCityRates(cust_id, name);
              addDomesticZoneRates(cust_id, name);
            }
          }
        }
      })
      .catch((error) => {
        alert(`Error Happen while add Calculation  Data ${error}`);
      });
  };

  const updateCalculation = (name) => {
    let tmp_cal_info_data = [];

    if (is_local) {
      tmp_cal_info_data.push({ local: local_cal });
    }

    if (is_air) {
      tmp_cal_info_data.push({ air: air_cal });
    }

    if (is_surface) {
      tmp_cal_info_data.push({ surface: surface_cal });
    }

    let cust_up = up_params.customer;
    // To Filter Calculation Data acording to calculation Tab
    let local_cals = cust_up.cal_infos_cust.filter(
      (v) => v.transportation_mode === "LOCAL"
    );
    let air_cals = cust_up.cal_infos_cust.filter(
      (v) => v.transportation_mode === "AIR"
    );
    let surface_cals = cust_up.cal_infos_cust.filter(
      (v) => v.transportation_mode === "SURFACE"
    );

    let pr_cals = [];

    // push calculation data
    pr_cals.push(local_cals[0]);
    pr_cals.push(air_cals[0]);
    pr_cals.push(surface_cals[0]);

    let change_fields_list = [];

    for (const pr_cal of pr_cals) {
      // To Check Changes in Local Calculation
      if (pr_cal.transportation_mode === "LOCAL") {
        let change_fields = {};
        let field_nm = [];

        // Object To Check Changes
        if (local_cal.cal_type === "DIMENSION") {
          let fields_names_dimn = Object.entries({
            cft: local_cal.dimn.cft,
            divided_by: local_cal.dimn.divided_by,
            from_date: local_cal.dimn.from_date,
            to_date: local_cal.dimn.to_date,
          });

          field_nm = fields_names_dimn;
        } else {
          let fields_names_box = Object.entries({
            box_value: local_cal.box_cal.box_value,
            from_date: local_cal.box_cal.from_date,
            to_date: local_cal.box_cal.to_date,
          });
          field_nm = fields_names_box;
        }

        for (let j = 0; j < field_nm.length; j++) {
          const ele = field_nm[j];
          let prev = pr_cal[`${ele[0]}`];
          let new_v = ele[1];

          if (prev !== new_v) {
            change_fields[`${ele[0]}`] = new_v;
          }
        }
        // If have changes then push changes or push "No Change"
        if (!!Object.keys(change_fields).length) {
          change_fields_list.push(change_fields);
        } else {
          change_fields_list.push("No Change");
        }
      }

      if (pr_cal.transportation_mode === "AIR") {
        let change_fields = {};
        let field_nm = [];
        if (air_cal.cal_type === "DIMENSION") {
          let fields_names_dimn = Object.entries({
            cft: air_cal.dimn.cft,
            divided_by: air_cal.dimn.divided_by,
            from_date: air_cal.dimn.from_date,
            to_date: air_cal.dimn.to_date,
          });
          field_nm = fields_names_dimn;
        } else {
          let fields_names_box = Object.entries({
            box_value: air_cal.box_cal.box_value,
            from_date: air_cal.box_cal.from_date,
            to_date: air_cal.box_cal.to_date,
          });
          field_nm = fields_names_box;
        }

        for (let j = 0; j < field_nm.length; j++) {
          const ele = field_nm[j];
          let prev = pr_cal[`${ele[0]}`];
          let new_v = ele[1];

          if (prev !== new_v) {
            change_fields[`${ele[0]}`] = new_v;
          }
        }

        if (!!Object.keys(change_fields).length) {
          change_fields_list.push(change_fields);
        } else {
          change_fields_list.push("No Change");
        }
      }

      if (pr_cal.transportation_mode === "SURFACE") {
        let change_fields = {};
        let field_nm = [];
        if (surface_cal.cal_type === "DIMENSION") {
          let fields_names_dimn = Object.entries({
            cft: surface_cal.dimn.cft,
            divided_by: surface_cal.dimn.divided_by,
            from_date: surface_cal.dimn.from_date,
            to_date: surface_cal.dimn.to_date,
          });
          field_nm = fields_names_dimn;
        } else {
          let fields_names_box = Object.entries({
            box_value: surface_cal.box_cal.box_value,
            from_date: surface_cal.box_cal.from_date,
            to_date: surface_cal.box_cal.to_date,
          });
          field_nm = fields_names_box;
        }

        for (let j = 0; j < field_nm.length; j++) {
          const ele = field_nm[j];
          let prev = pr_cal[`${ele[0]}`];
          let new_v = ele[1];

          if (prev !== new_v) {
            change_fields[`${ele[0]}`] = new_v;
          }
        }

        if (!!Object.keys(change_fields).length) {
          change_fields_list.push(change_fields);
        } else {
          change_fields_list.push("No Change");
        }
      }
    }

    // To Check If its have any changes or Goto UpdateAssociated Charges
    if (!change_fields_list.every((v) => v === "No Change")) {
      axios
        .put(
          ServerAddress + "master/update_calculation/",
          {
            bill_to: client_id,
            modified_by: user_id,
            calculation_info_data: tmp_cal_info_data,
            client: customer.id,
            change_fields_list: change_fields_list,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then(function (resp) {
          if (resp.status === 200) {
            if (local_cal.cal_type !== "DONT") {
              updateAssociatedCharge(name);
            }

            if (air_cal.cal_type !== "DONT") {
              if (dom_rate_category === "City to City") {
                updateDomesticCityRates(name);
              } else {
                updateDomesticZoneRates(name);
              }
            }

            if (surface_cal.cal_type !== "DONT") {
              if (dom_rate_category === "City to City") {
                updateDomesticCityRates(name);
              } else {
                updateDomesticZoneRates(name);
              }
            }
          }
        })
        .catch((error) => {
          alert(`Error Happen while update Calculation  Data ${error}`);
        });
    } else {
      if (local_cal.cal_type !== "DONT") {
        updateAssociatedCharge(name);
      }

      if (air_cal.cal_type !== "DONT") {
        updateDomesticCityRates(name);
      }

      if (surface_cal.cal_type !== "DONT") {
        updateDomesticCityRates(name);
      }
    }
  };

  // Local Associated Charges Functions
  const addAssociatedCharges = (cust_id, name) => {
    let temp_ass_list = local_datalist.filter((v) => v[0][0][0] !== "");

    axios
      .post(
        ServerAddress + "master/add_associated_charge/",
        {
          bill_to: client_id,
          client: cust_id,
          associated_charges: temp_ass_list,
          local_cal_type: local_cal.cal_type,
          rate_category: dom_rate_type_local,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (resp) {
        // console.log("add asso resp", resp);
        if (is_per_charge) {
          addPerCharges(cust_id, name, resp.data.asschrg_ids);
        }
      })
      .catch((error) => {
        alert(`Error Happen while add_associated_charges ${error}`);
      });
  };

  const updateAssociatedCharge = (name) => {
    let cust_up_asso = up_params.customer.cust_asso_chrg;
    let chng_list = [];
    let f_local_datalist = [];
    let add_local_datalist = [];

    // To remove empty row from Billing Table
    let temp_ass_list = local_datalist.filter((v) => v[0][0][0] !== "");

    for (let n = 0; n < temp_ass_list.length; n++) {
      const itm = temp_ass_list[n];

      if (itm.length > 3) {
        const prv_itm = cust_up_asso.find((v) => v.id === itm[3]);
        let change_fields = {};
        let asso_fields = Object.entries({
          calculation_type: local_cal.cal_type,
          rate_category: dom_rate_type_local.toUpperCase(),
          cc_min_boxes: itm[1][1],
          nc_min_boxes: itm[2][1],
          cc_min_amount: itm[1][2],
          nc_min_amount: itm[2][2],
          cc_rate: itm[1][0],
          nc_rate: itm[2][0],
          charge: itm[0][0][0],
        });

        for (let j = 0; j < asso_fields.length; j++) {
          const ele = asso_fields[j];
          let prev = prv_itm[`${ele[0]}`];
          let new_v = ele[1];
          if (prev !== new_v) {
            change_fields[`${ele[0]}`] = new_v;
          }
        }

        // push item in final list if its have any changes
        if (!!Object.keys(change_fields).length) {
          chng_list.push(change_fields);
          f_local_datalist.push(itm);
        } else {
          chng_list.push("No Change");
        }
      } else {
        add_local_datalist.push(itm);
      }
    }

    if (
      f_local_datalist.length > 0 ||
      add_local_datalist.length > 0 ||
      asso_del_ids.length > 0
    ) {
      axios
        .put(
          ServerAddress + "master/update_associated_charge/",
          {
            associated_charges: f_local_datalist,
            add_associated_charges: add_local_datalist,
            bill_to: client_id,
            client: customer.id,
            local_cal_type: local_cal.cal_type,
            chng_list: chng_list,
            rate_category: dom_rate_type_local,
            asso_del_ids: asso_del_ids,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then(function (resp) {
          if (resp.status === 200) {
            updatePerCharges(name, resp.data.asschrg_ids);
          }
        })
        .catch((error) => {
          alert(`Error Happen while Updating Associated Charges ${error}`);
        });
    } else {
      updatePerCharges(name, []);
    }
  };

  // Local Percentage Rates Functions
  const addPerCharges = (cust_id, name, asschrg_ids = []) => {
    axios
      .post(
        ServerAddress + "master/add_percentage_charge/",
        {
          bill_to: client_id,
          client: cust_id,
          per_charge_list: per_charge_list,
          per_charge_list_air: per_charge_list_air,
          per_charge_list_surface: per_charge_list_surface,
          local_cal_type: local_cal.cal_type,
          air_cal_type: air_cal.cal_type,
          surface_cal_type: surface_cal.cal_type,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (resp) {
        // console.log("add per resp", resp);
        if (resp.status === 201) {
          addOthCharges(
            name,
            cust_id,
            asschrg_ids,
            resp.data.perchrg_ids,
            resp.data.perchrg_ids_air,
            resp.data.perchrg_ids_surface,
          );
        }
      })
      .catch((error) => {
        alert(`Error Happen while add_percentage_charge ${error}`);
      });
  };

  const updatePerCharges = (name, asschrg_ids = []) => {
    let cust_up_per = up_params.customer.per_chrg_client;

    let tmp_per_list = per_charge_list.filter((v) => v[0][0] !== "");

    let chng_list = [];
    let f_per_chrg_list_add = [];
    let f_per_chrg_list = [];

    for (let m of tmp_per_list) {
      if (m.length > 3) {
        let prev_per = cust_up_per.find((v) => v.id === m[3]);
        let prev_per_fields = Object.entries({
          rate_percentage: m[2],
          charge: m[0][0],
        });

        let change_fields = {};
        for (let j = 0; j < prev_per_fields.length; j++) {
          const ele = prev_per_fields[j];
          let prev = prev_per[`${ele[0]}`];
          let new_v = ele[1];

          if (prev !== new_v) {
            change_fields[`${ele[0]}`] = new_v;
          }
        }

        if (Object.keys(change_fields).length > 0) {
          f_per_chrg_list.push(m);
          chng_list.push(change_fields);
        }
      } else {
        f_per_chrg_list_add.push(m);
      }
    }

    // To Check percenate final charge list of either branch or any percentge charge delete To Call api
    if (
      f_per_chrg_list.length > 0 ||
      per_del_ids.length > 0 ||
      f_per_chrg_list_add.length > 0
    ) {
      axios
        .put(
          ServerAddress + "master/update_percentage_charge/",
          {
            bill_to: client_id,
            client: customer.id,
            per_charge_list: f_per_chrg_list,
            local_cal_type: local_cal.cal_type,
            chng_list: chng_list,
            per_del_ids: per_del_ids,
            f_per_chrg_list_add: f_per_chrg_list_add,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then(function (resp) {
          // console.log('update per resp', resp)
          if (resp.status === 200) {
            updateOthCharges(
              name,
              asschrg_ids,
              resp.data.perchrg_ids,
              resp.data.perchrg_ids_air,
              resp.data.perchrg_ids_surface,
            );
          }
        })
        .catch((error) => {
          alert(`Error Happen while Updating Percentage Charges ${error}`);
        });
    } else {
      updateOthCharges(name, asschrg_ids, [], []);
    }
  };

  const updatePerChargesAir = (name, domrts_ids = []) => {
    let cust_up_per = up_params.customer.per_chrg_client;

    let tmp_per_list = per_charge_list_air.filter((v) => v[0][0] !== "");

    let chng_list_air = [];
    let f_per_chrg_list_air_add = [];
    let f_per_chrg_list_air = [];

    for (let m of tmp_per_list) {
      if (m.length > 3) {
        let prev_per = cust_up_per.find((v) => v.id === m[3]);
        let prev_per_fields = Object.entries({
          rate_percentage: m[2],
          charge: m[0][0],
        });

        let change_fields = {};
        for (let j = 0; j < prev_per_fields.length; j++) {
          const ele = prev_per_fields[j];
          let prev = prev_per[`${ele[0]}`];
          let new_v = ele[1];

          if (prev !== new_v) {
            change_fields[`${ele[0]}`] = new_v;
          }
        }

        if (Object.keys(change_fields).length > 0) {
          f_per_chrg_list_air.push(m);
          chng_list_air.push(change_fields);
        }
      } else {
        f_per_chrg_list_air_add.push(m);
      }
    }

    // To Check percenate final charge list of either branch or any percentge charge delete To Call api
    if (
      f_per_chrg_list_air.length > 0 ||
      per_del_ids_air.length > 0 ||
      f_per_chrg_list_air_add.length > 0
    ) {
      axios
        .put(
          ServerAddress + "master/update_percentage_charge_air/",
          {
            bill_to: client_id,
            client: customer.id,
            per_charge_list_air: f_per_chrg_list_air,
            air_cal_type: air_cal.cal_type,
            chng_list_air: chng_list_air,
            f_per_chrg_list_air_add: f_per_chrg_list_air_add,
            per_del_ids_air: per_del_ids_air,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then(function (resp) {
          // console.log('update per air resp', resp)
          if (resp.status === 200) {
            if (dom_rate_category === "City to City") {
              updateOthChargesAir(name, domrts_ids, resp.data.perchrg_ids_air);
            } else if (dom_rate_category === "Zone to Zone") {
              updateOthChargesAirZone(
                name,
                domrts_ids,
                resp.data.perchrg_ids_air
              );
            }
          }
        })
        .catch((error) => {
          alert(`Error Happen while Updating Percentage Charges ${error}`);
        });
    } else {
      if (dom_rate_category === "City to City") {
        updateOthChargesAir(name, domrts_ids, []);
      } else if (dom_rate_category === "Zone to Zone") {
        updateOthChargesAirZone(name, domrts_ids, []);
      }
      // updateOthChargesAir(name, domrts_ids, []);
    }
  };

  const updatePerChargesSurface = (name, domrts_ids = []) => {
    let cust_up_per = up_params.customer.per_chrg_client;

    let tmp_per_list = per_charge_list_surface.filter((v) => v[0][0] !== "");

    let chng_list_surface = [];
    let f_per_chrg_list_surface_add = [];
    let f_per_chrg_list_surface = [];

    for (let m of tmp_per_list) {
      if (m.length > 3) {
        let prev_per = cust_up_per.find((v) => v.id === m[3]);
        let prev_per_fields = Object.entries({
          rate_percentage: m[2],
          charge: m[0][0],
        });

        let change_fields = {};
        for (let j = 0; j < prev_per_fields.length; j++) {
          const ele = prev_per_fields[j];
          let prev = prev_per[`${ele[0]}`];
          let new_v = ele[1];

          if (prev !== new_v) {
            change_fields[`${ele[0]}`] = new_v;
          }
        }

        if (Object.keys(change_fields).length > 0) {
          f_per_chrg_list_surface.push(m);
          chng_list_surface.push(change_fields);
        }
      } else {
        f_per_chrg_list_surface_add.push(m);
      }
    }

    // To Check percenate final charge list of either branch or any percentge charge delete To Call api
    if (
      f_per_chrg_list_surface.length > 0 ||
      per_del_ids_surfc.length > 0 ||
      f_per_chrg_list_surface_add.length > 0
    ) {
      axios
        .put(
          ServerAddress + "master/update_percentage_charge_surface/",
          {
            bill_to: client_id,
            client: customer.id,
            per_charge_list_surface: f_per_chrg_list_surface,
            surface_cal_type: surface_cal.cal_type,
            chng_list_surface: chng_list_surface,
            f_per_chrg_list_surface_add: f_per_chrg_list_surface_add,
            per_del_ids_surface: per_del_ids_surfc,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then(function (resp) {
          // console.log('update per air resp', resp)
          if (resp.status === 200) {
            if (dom_rate_category === "City to City") {
              updateOthChargesSurface(name, domrts_ids, resp.data.perchrg_ids_surface);

            } else if (dom_rate_category === "Zone to Zone") {
              updateOthChargesSurfaceZone(
                name,
                domrts_ids,
                resp.data.perchrg_ids_surface
              );
            }
          }
        })
        .catch((error) => {
          alert(`Error Happen while Updating Percentage Charges ${error}`);
        });
    } else {
      if (dom_rate_category === "City to City") {
        updateOthChargesSurface(name, domrts_ids, []);
      } else if (dom_rate_category === "Zone to Zone") {
        updateOthChargesSurfaceZone(name, domrts_ids, []);
      }
      // updateOthChargesAir(name, domrts_ids, []);
    }
  };

  const addPerChargesAir = (cust_id, name, domrts_ids = []) => {
    let tmp_per_list = per_charge_list_air.filter((v) => v[0][0] !== "");

    if (tmp_per_list.length > 0) {
      axios
        .post(
          ServerAddress + "master/add_percentage_charge_air/",
          {
            bill_to: client_id,
            client: cust_id,
            per_charge_list_air: tmp_per_list,
            air_cal_type: air_cal.cal_type,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then(function (resp) {
          // console.log("per air resp", resp);

          if (resp.status === 201) {
            if (dom_rate_category === "City to City") {
              addOthChargesAir(
                name,
                cust_id,
                domrts_ids,
                resp.data.perchrg_ids_air
              );
            } else if (dom_rate_category === "Zone to Zone") {
              addOthChargesAirZone(
                name,
                cust_id,
                domrts_ids,
                resp.data.perchrg_ids_air
              );
            }
          }
        })
        .catch((error) => {
          alert(`Error Happen while add_percentage_charge ${error}`);
        });
    } else {
      if (dom_rate_category === "City to City") {
        addOthChargesAir(name, cust_id, domrts_ids, []);
      } else if (dom_rate_category === "Zone to Zone") {
        addOthChargesAirZone(name, cust_id, domrts_ids, []);
      }
    }
  };

  const addPerChargesSurface = (cust_id, name, domrts_ids = []) => {
    let tmp_per_list = per_charge_list_surface.filter((v) => v[0][0] !== "");

    if (tmp_per_list.length > 0) {
      axios
        .post(
          ServerAddress + "master/add_percentage_charge_surface/",
          {
            bill_to: client_id,
            client: cust_id,
            per_charge_list_surface: tmp_per_list,
            surface_cal_type: surface_cal.cal_type,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then(function (resp) {
          // console.log("per air resp", resp);

          if (resp.status === 201) {
            if (dom_rate_category === "City to City") {
              addOthChargesSurface(
                name,
                cust_id,
                domrts_ids,
                resp.data.perchrg_ids_air
              );
            } else if (dom_rate_category === "Zone to Zone") {
              addOthChargesSurfaceZone(
                name,
                cust_id,
                domrts_ids,
                resp.data.perchrg_ids_air
              );
            }
          }
        })
        .catch((error) => {
          alert(`Error Happen while add_percentage_charge ${error}`);
        });
    } else {
      if (dom_rate_category === "City to City") {
        addOthChargesAir(name, cust_id, domrts_ids, []);
      } else if (dom_rate_category === "Zone to Zone") {
        addOthChargesAirZone(name, cust_id, domrts_ids, []);
      }
    }
  };
  // Air Percentage Rates Functions

  // Local Percentage of Other Charges Functions
  const addOthCharges = (name, cust_id, asschrg_ids = [], perchrg_ids = []) => {
    let n_list = [];

    let cl_local_datalist = local_datalist.filter((v) => v[0][0][0] !== "");

    for (let t = 0; t < perchrg_ids.length; t++) {
      let k = 0;
      for (let a = 0; a < cl_local_datalist.length; a++) {
        const ld = cl_local_datalist[a];

        if (ld[0][0] !== "") {
          n_list.push([
            ld[1][3 + t],
            ld[2][3 + t],
            perchrg_ids[t],
            asschrg_ids[k],
          ]);
        }
        k += 1;
      }
    }

    if (n_list.length > 0) {
      axios
        .post(
          ServerAddress + "master/add_other_charge/",
          {
            oth_char_list: n_list,
            local_cal_type: local_cal.cal_type,
            air_cal_type: air_cal.cal_type,
            surface_cal_type: surface_cal.cal_type,
            bill_to: client_id,
            client: cust_id,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then(function (resp) {
          console.log("add oth resp", resp);
          if (air_cal.cal_type === "DONT") {

            setAllAdd()
          }
          if (surface_cal.cal_type === "DONT") {

            setAllAdd()
          }
        })
        .catch((error) => {
          alert(`Error Happen while add_other_charge ${error}`);
        });
    }
  };

  const addOthChargesAir = (
    name,
    cust_id,
    domrts_ids = [],
    perchrg_ids = []
  ) => {
    let n_list = [];
    let cl_datalist = datalist.filter((v) => v[0][0][0] !== "");

    for (let t = 0; t < perchrg_ids.length; t++) {
      let k = 0;
      for (let a = 0; a < cl_datalist.length; a++) {
        const ld = cl_datalist[a];

        if (ld[0][0] !== "") {
          n_list.push([
            ld[1][4 + t],
            ld[2][4 + t],
            perchrg_ids[t],
            domrts_ids[k],
          ]);
        }
        k += 1;
      }
    }

    if (n_list.length > 0) {
      axios
        .post(
          ServerAddress + "master/add_other_charge_air/",
          {
            oth_char_list: n_list,
            local_cal_type: local_cal.cal_type,
            air_cal_type: air_cal.cal_type,
            bill_to: client_id,
            client: cust_id,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then(function (resp) {
          // console.log("oth chrgs air resp", resp)
          setAllAdd()
        })
        .catch((error) => {
          alert(`Error Happen while add_other_charge ${error}`);
        });
    }
  };

  const addOthChargesSurface = (
    name,
    cust_id,
    domrts_ids = [],
    perchrg_ids = []
  ) => {
    let n_list = [];
    let cl_datalist = datalist.filter((v) => v[0][0][0] !== "");

    for (let t = 0; t < perchrg_ids.length; t++) {
      let k = 0;
      for (let a = 0; a < cl_datalist.length; a++) {
        const ld = cl_datalist[a];

        if (ld[0][0] !== "") {
          n_list.push([
            ld[1][4 + t],
            ld[2][4 + t],
            perchrg_ids[t],
            domrts_ids[k],
          ]);
        }
        k += 1;
      }
    }

    if (n_list.length > 0) {
      axios
        .post(
          ServerAddress + "master/add_other_charge_surface/",
          {
            oth_char_list: n_list,
            local_cal_type: local_cal.cal_type,
            air_cal_type: air_cal.cal_type,
            surface_cal_type: surface_cal.cal_type,
            bill_to: client_id,
            client: cust_id,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then(function (resp) {
          // console.log("oth chrgs air resp", resp)
          setAllAdd()
        })
        .catch((error) => {
          alert(`Error Happen while add_other_charge ${error}`);
        });
    }
  };

  const addOthChargesAirZone = (
    name,
    cust_id,
    domrts_ids = [],
    perchrg_ids = []
  ) => {
    let n_list = [];
    let cl_datalist = datalist1.filter((v) => v[0][0][0] !== "");

    for (let t = 0; t < perchrg_ids.length; t++) {
      let k = 0;
      for (let a = 0; a < cl_datalist.length; a++) {
        const ld = cl_datalist[a];

        if (ld[0][0] !== "") {
          n_list.push([
            ld[1][4 + t],
            ld[2][4 + t],
            perchrg_ids[t],
            domrts_ids[k],
          ]);
        }
        k += 1;
      }
    }

    if (n_list.length > 0) {
      axios
        .post(
          ServerAddress + "master/add_other_charge_zone_air/",
          {
            oth_char_list: n_list,
            local_cal_type: local_cal.cal_type,
            air_cal_type: air_cal.cal_type,
            bill_to: client_id,
            client: cust_id,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then(function (resp) {
          // console.log("oth chrgs z air resp", resp);
          setAllAdd()
        })
        .catch((error) => {
          alert(`Error Happen while add_other_charge ${error}`);
        });
    }
  };

  const addOthChargesSurfaceZone = (
    name,
    cust_id,
    domrts_ids = [],
    perchrg_ids = []
  ) => {
    let n_list = [];
    let cl_datalist = datalist1.filter((v) => v[0][0][0] !== "");

    for (let t = 0; t < perchrg_ids.length; t++) {
      let k = 0;
      for (let a = 0; a < cl_datalist.length; a++) {
        const ld = cl_datalist[a];

        if (ld[0][0] !== "") {
          n_list.push([
            ld[1][4 + t],
            ld[2][4 + t],
            perchrg_ids[t],
            domrts_ids[k],
          ]);
        }
        k += 1;
      }
    }

    if (n_list.length > 0) {
      axios
        .post(
          ServerAddress + "master/add_other_charge_zone_surface/",
          {
            oth_char_list: n_list,
            local_cal_type: local_cal.cal_type,
            air_cal_type: air_cal.cal_type,
            surface_cal_type: surface_cal.cal_type,
            bill_to: client_id,
            client: cust_id,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then(function (resp) {
          // console.log("oth chrgs z air resp", resp);
          setAllAdd()
        })
        .catch((error) => {
          alert(`Error Happen while add_other_charge ${error}`);
        });
    }
  };

  const updateOthCharges = (
    name,
    asschrg_ids = [],
    perchrg_ids = [],
    del_perchrg_ids = []
  ) => {
    let up_oth_chrgs = [];
    let c_list = [];
    let p_list = [];

    let n_list = [];
    let chng_list = [];

    let per_otch_tmp = per_charge_list.filter(
      (v) => v[1] === "% of other charges"
    );

    for (let t = 0; t < per_otch_tmp.length; t++) {
      const pel = per_otch_tmp[t];

      let k = 0;
      for (let a = 0; a < local_datalist.length; a++) {
        const ld = local_datalist[a];

        if (ld[1].length > 3 && ld[0][0] !== "") {
          if (ld.length > 3) {
            // Format for updated data
            c_list.push([ld[1][3 + t], ld[2][3 + t], pel[3], ld[3]]);
          } else {
            // Format for new data
            n_list.push([ld[1][3 + t], ld[2][3 + t], pel[3], asschrg_ids[k]]);
            k += 1;
          }
        }
      }

      for (let b = 0; b < ot_chrg_prv.length; b++) {
        const od = ot_chrg_prv[b];

        if (od.length > 3) {
          // Previous Data Format to compare
          p_list.push([od[1][3 + t], od[2][3 + t], pel[3], od[3]]);
        }
      }
    }

    if (c_list.length === p_list.length) {
      for (let p = 0; p < c_list.length; p++) {
        let nw = c_list[p];
        let pw = p_list[p];
        let change_fields = {};
        // To Check Changes
        if (nw[0] !== pw[0] || nw[1] !== pw[1]) {
          if (nw[0] !== pw[0]) {
            change_fields["cc_rate_percentage"] = nw[0];
          }
          if (nw[1] !== pw[1]) {
            change_fields["nc_rate_percentage"] = nw[1];
          }
          chng_list.push(change_fields);
          up_oth_chrgs.push(nw);
        }
      }
    }

    if (up_oth_chrgs.length > 0 || n_list.length > 0) {
      axios
        .put(
          ServerAddress + "master/update_other_charge/",
          {
            oth_char_list: up_oth_chrgs,
            n_list: n_list,
            local_cal_type: local_cal.cal_type,
            air_cal_type: air_cal.cal_type,
            surface_cal_type: surface_cal.cal_type,
            chng_list: chng_list,
            bill_to: client_id,
            client: customer.id,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then(function (resp) {
          if (!is_air) {

            setAllUpdate()
          }
          if (!is_surface) {

            setAllUpdate()
          }
        })
        .catch((error) => {
          alert(`Error Happen while add_other_charge ${error}`);
        });
    } else {
      if (!is_air) {

        setAllUpdate()
      }
      if (!is_surface) {

        setAllUpdate()
      }
    }
  };

  const updateOthChargesAir = (
    name,
    domrts_ids = [],
    perchrg_ids_air = [],
    del_perchrg_ids = []
  ) => {
    let up_oth_chrgs = [];
    let c_list = [];
    let p_list = [];

    let n_list = [];
    let chng_list = [];

    let per_otch_tmp = per_charge_list_air.filter(
      (v) => v[1] === "% of other charges"
    );

    let cl_datalist = datalist.filter((v) => v[0][0][0] !== "");

    for (let t = 0; t < per_otch_tmp.length; t++) {
      const pel = per_otch_tmp[t];

      let k = 0;
      for (let a = 0; a < cl_datalist.length; a++) {
        const ld = cl_datalist[a];

        if (ld[1].length > 3 && ld[0][0] !== "") {
          if (ld.length > 3) {
            // Format for updated data
            c_list.push([ld[1][4 + t], ld[2][4 + t], pel[3], ld[3]]);
          } else {
            // Format for new data
            n_list.push([ld[1][4 + t], ld[2][4 + t], pel[3], domrts_ids[k]]);
            k += 1;
          }
        }
      }

      for (let b = 0; b < ot_chrg_prv_air.length; b++) {
        const od = ot_chrg_prv_air[b];

        if (od.length > 3) {
          // Previous Data Format to compare
          p_list.push([od[1][4 + t], od[2][4 + t], pel[3], od[3]]);
        }
      }
    }

    if (c_list.length === p_list.length) {
      for (let p = 0; p < c_list.length; p++) {
        let nw = c_list[p];
        let pw = p_list[p];
        let change_fields = {};
        // To Check Changes
        if (nw[0] !== pw[0] || nw[1] !== pw[1]) {
          if (nw[0] !== pw[0]) {
            change_fields["cc_rate_percentage"] = nw[0];
          }
          if (nw[1] !== pw[1]) {
            change_fields["nc_rate_percentage"] = nw[1];
          }
          chng_list.push(change_fields);
          up_oth_chrgs.push(nw);
        }
      }
    }

    if (up_oth_chrgs.length > 0 || n_list.length > 0) {
      axios
        .put(
          ServerAddress + "master/update_other_charge_air/",
          {
            oth_char_list: up_oth_chrgs,
            n_list: n_list,
            chng_list: chng_list,
            bill_to: client_id,
            client: customer.id,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then(function (resp) {
          // console.log('up dom oth chrg resp', resp)
          setAllUpdate()
        })
        .catch((error) => {
          alert(`Error Happen while add_other_charge ${error}`);
        });
    } else {
      setAllUpdate()
    }
  };

  const updateOthChargesSurface = (
    name,
    domrts_ids = [],
    perchrg_ids_surface = [],
    del_perchrg_ids = []
  ) => {
    let up_oth_chrgs = [];
    let c_list = [];
    let p_list = [];

    let n_list = [];
    let chng_list = [];

    let per_otch_tmp = per_charge_list_surface.filter(
      (v) => v[1] === "% of other charges"
    );

    let cl_datalist = datalist.filter((v) => v[0][0][0] !== "");

    for (let t = 0; t < per_otch_tmp.length; t++) {
      const pel = per_otch_tmp[t];

      let k = 0;
      for (let a = 0; a < cl_datalist.length; a++) {
        const ld = cl_datalist[a];

        if (ld[1].length > 3 && ld[0][0] !== "") {
          if (ld.length > 3) {
            // Format for updated data
            c_list.push([ld[1][4 + t], ld[2][4 + t], pel[3], ld[3]]);
          } else {
            // Format for new data
            n_list.push([ld[1][4 + t], ld[2][4 + t], pel[3], domrts_ids[k]]);
            k += 1;
          }
        }
      }

      for (let b = 0; b < ot_chrg_prv_surface.length; b++) {
        const od = ot_chrg_prv_surface[b];

        if (od.length > 3) {
          // Previous Data Format to compare
          p_list.push([od[1][4 + t], od[2][4 + t], pel[3], od[3]]);
        }
      }
    }

    if (c_list.length === p_list.length) {
      for (let p = 0; p < c_list.length; p++) {
        let nw = c_list[p];
        let pw = p_list[p];
        let change_fields = {};
        // To Check Changes
        if (nw[0] !== pw[0] || nw[1] !== pw[1]) {
          if (nw[0] !== pw[0]) {
            change_fields["cc_rate_percentage"] = nw[0];
          }
          if (nw[1] !== pw[1]) {
            change_fields["nc_rate_percentage"] = nw[1];
          }
          chng_list.push(change_fields);
          up_oth_chrgs.push(nw);
        }
      }
    }

    if (up_oth_chrgs.length > 0 || n_list.length > 0) {
      axios
        .put(
          ServerAddress + "master/update_other_charge_surface/",
          {
            oth_char_list: up_oth_chrgs,
            n_list: n_list,
            chng_list: chng_list,
            bill_to: client_id,
            client: customer.id,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then(function (resp) {
          // console.log('up dom oth chrg resp', resp)
          setAllUpdate()
        })
        .catch((error) => {
          alert(`Error Happen while add_other_charge ${error}`);
        });
    } else {
      setAllUpdate()
    }
  };

  const updateOthChargesAirZone = (
    name,
    domrts_ids = [],
    perchrg_ids_air = [],
    del_perchrg_ids = []
  ) => {
    let up_oth_chrgs = [];
    let c_list = [];
    let p_list = [];

    let n_list = [];
    let chng_list = [];

    let per_otch_tmp = per_charge_list_air.filter(
      (v) => v[1] === "% of other charges"
    );

    let cl_datalist = datalist1.filter((v) => v[0][0][0] !== "");

    for (let t = 0; t < per_otch_tmp.length; t++) {
      const pel = per_otch_tmp[t];

      let k = 0;
      for (let a = 0; a < cl_datalist.length; a++) {
        const ld = cl_datalist[a];

        if (ld[1].length > 3 && ld[0][0] !== "") {
          if (ld.length > 3) {
            // Format for updated data
            c_list.push([ld[1][4 + t], ld[2][4 + t], pel[3], ld[3]]);
          } else {
            // Format for new data
            n_list.push([ld[1][4 + t], ld[2][4 + t], pel[3], domrts_ids[k]]);
            k += 1;
          }
        }
      }

      for (let b = 0; b < ot_chrg_prv_air_zone.length; b++) {
        const od = ot_chrg_prv_air_zone[b];

        if (od.length > 3) {
          // Previous Data Format to compare
          p_list.push([od[1][4 + t], od[2][4 + t], pel[3], od[3]]);
        }
      }
    }

    if (c_list.length === p_list.length) {
      for (let p = 0; p < c_list.length; p++) {
        let nw = c_list[p];
        let pw = p_list[p];
        let change_fields = {};
        // To Check Changes
        if (nw[0] !== pw[0] || nw[1] !== pw[1]) {
          if (nw[0] !== pw[0]) {
            change_fields["cc_rate_percentage"] = nw[0];
          }
          if (nw[1] !== pw[1]) {
            change_fields["nc_rate_percentage"] = nw[1];
          }
          chng_list.push(change_fields);
          up_oth_chrgs.push(nw);
        }
      }
    }

    if (up_oth_chrgs.length > 0 || n_list.length > 0) {
      axios
        .put(
          ServerAddress + "master/update_other_charge_zone_air/",
          {
            oth_char_list: up_oth_chrgs,
            n_list: n_list,
            chng_list: chng_list,
            bill_to: client_id,
            client: customer.id,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then(function (resp) {
          // console.log('up dom z oth chrg resp', resp)
          setAllUpdate()
        })
        .catch((error) => {
          alert(`Error Happen while add_other_charge ${error}`);
        });
    } else {
      setAllUpdate()
    }
  };

  const updateOthChargesSurfaceZone = (
    name,
    domrts_ids = [],
    perchrg_ids_surface = [],
    del_perchrg_ids = []
  ) => {
    let up_oth_chrgs = [];
    let c_list = [];
    let p_list = [];

    let n_list = [];
    let chng_list = [];

    let per_otch_tmp = per_charge_list_surface.filter(
      (v) => v[1] === "% of other charges"
    );

    let cl_datalist = datalist1.filter((v) => v[0][0][0] !== "");

    for (let t = 0; t < per_otch_tmp.length; t++) {
      const pel = per_otch_tmp[t];

      let k = 0;
      for (let a = 0; a < cl_datalist.length; a++) {
        const ld = cl_datalist[a];

        if (ld[1].length > 3 && ld[0][0] !== "") {
          if (ld.length > 3) {
            // Format for updated data
            c_list.push([ld[1][4 + t], ld[2][4 + t], pel[3], ld[3]]);
          } else {
            // Format for new data
            n_list.push([ld[1][4 + t], ld[2][4 + t], pel[3], domrts_ids[k]]);
            k += 1;
          }
        }
      }

      for (let b = 0; b < ot_chrg_prv_surface_zone.length; b++) {
        const od = ot_chrg_prv_surface_zone[b];

        if (od.length > 3) {
          // Previous Data Format to compare
          p_list.push([od[1][4 + t], od[2][4 + t], pel[3], od[3]]);
        }
      }
    }

    if (c_list.length === p_list.length) {
      for (let p = 0; p < c_list.length; p++) {
        let nw = c_list[p];
        let pw = p_list[p];
        let change_fields = {};
        // To Check Changes
        if (nw[0] !== pw[0] || nw[1] !== pw[1]) {
          if (nw[0] !== pw[0]) {
            change_fields["cc_rate_percentage"] = nw[0];
          }
          if (nw[1] !== pw[1]) {
            change_fields["nc_rate_percentage"] = nw[1];
          }
          chng_list.push(change_fields);
          up_oth_chrgs.push(nw);
        }
      }
    }

    if (up_oth_chrgs.length > 0 || n_list.length > 0) {
      axios
        .put(
          ServerAddress + "master/update_other_charge_zone_surface/",
          {
            oth_char_list: up_oth_chrgs,
            n_list: n_list,
            chng_list: chng_list,
            bill_to: client_id,
            client: customer.id,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then(function (resp) {
          // console.log('up dom z oth chrg resp', resp)
          setAllUpdate()
        })
        .catch((error) => {
          alert(`Error Happen while add_other_charge ${error}`);
        });
    } else {
      setAllUpdate()
    }
  };

  // Air / Domestic Rates Funcions
  const addDomesticCityRates = (cust_id, name) => {
    let temp_as_list = datalist.filter((v) => v[0][0][0] !== "");

    axios
      .post(
        ServerAddress + "master/add_domestic_city_rates/",
        {
          bill_to: client_id,
          client: cust_id,
          domestic_rates_list: temp_as_list,
          air_cal_type: air_cal.cal_type,
          surface_cal_type: surface_cal.cal_type,
          rate_category: dom_rate_type,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (resp) {
        if (resp.status === 201) {
          // console.log("domrts_ids ", resp.data.domrts_ids)
          addPerChargesAir(cust_id, name, resp.data.domrts_ids);
          addPerChargesSurface(cust_id, name, resp.data.domrts_ids)
        }
      })
      .catch((error) => {
        alert(`Error Happen while add_associated_charges ${error}`);
      });
  };

  const addDomesticZoneRates = (cust_id, name) => {
    let temp_as_list = datalist1.filter((v) => v[0][0][0] !== "");

    if (temp_as_list.length > 0) {
      axios
        .post(
          ServerAddress + "master/add_domestic_zone_rates/",
          {
            bill_to: client_id,
            client: cust_id,
            domestic_zone_rates_list: temp_as_list,
            air_cal_type: air_cal.cal_type,
            surface_cal_type: surface_cal.cal_type,
            rate_category: dom_rate_type,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then(function (resp) {
          if (resp.status === 201) {
            // console.log("add zone resp", resp);
            if (dom_rate_category !== "Both") {
              addPerChargesAir(cust_id, name, resp.data.domrts_ids);
              addPerChargesSurface(cust_id, name, resp.data.domrts_ids);
            } else {
              addOthChargesAirZone(name, cust_id, resp.data.domrts_ids, []);
              addOthChargesSurfaceZone(name, cust_id, resp.data.domrts_ids, []);
            }
          }
        })
        .catch((error) => {
          alert(`Error Happen while add_associated_charges ${error}`);
        });
    } else {
      //later
    }
  };

  const updateDomesticCityRates = (name) => {
    let cust_up_dom = up_params.customer.client_dom_city;
    let chng_list = [];
    let f_datalist = [];
    let add_datalist = [];

    // To remove empty row from Domestic Billing Table
    let temp_ass_list = datalist.filter((v) => v[0][0][0] !== "");

    for (let n = 0; n < temp_ass_list.length; n++) {
      const itm = temp_ass_list[n];
      let change_fields = {};
      if (itm.length > 3) {
        const prv_itm = cust_up_dom.find((v) => v.id === itm[3]);

        let dom_city_fields = Object.entries({
          calculation_type: air_cal.cal_type || surface_cal.cal_type,
          rate_type: dom_rate_type.toUpperCase(),
          cc_min_box: itm[1][1],
          nc_min_box: itm[2][1],
          cc_oda_rate: itm[1][3],
          nc_oda_rate: itm[2][3],
          cc_min_amount: itm[1][2],
          nc_min_amount: itm[2][2],
          cc_rate: itm[1][0],
          nc_rate: itm[2][0],
          origin_city: itm[0][0][0],
          destination_city: itm[0][1][0],
        });

        for (let j = 0; j < dom_city_fields.length; j++) {
          const ele = dom_city_fields[j];
          let prev = prv_itm[`${ele[0]}`];
          let new_v = ele[1];
          if (prev !== new_v) {
            change_fields[`${ele[0]}`] = new_v;
          }
        }

        if (!!Object.keys(change_fields).length) {
          chng_list.push(change_fields);
          f_datalist.push(itm); // push item in final list if its have any changes
        }
      } else {
        add_datalist.push(itm);
      }
    }


    if (
      f_datalist.length > 0 ||
      add_datalist.length > 0 ||
      dom_rt_del_ids_air.length > 0 || dom_rt_del_ids_surface.length > 0
    ) {
      axios
        .put(
          ServerAddress + "master/update_domestic_city_rates/",
          {
            bill_to: client_id,
            domestic_city_rates: f_datalist,
            add_domestic_city_rates: add_datalist,
            client: customer.id,
            chng_list: chng_list,
            rate_type: dom_rate_type,
            air_cal_type: air_cal.cal_type,
            surface_cal_type: surface_cal.cal_type,
            dom_rt_del_ids_air: dom_rt_del_ids_air,
            dom_rt_del_ids_surface: dom_rt_del_ids_surface,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then(function (resp) {
          // console.log("domestic city rate resp",resp)
          if (resp.status === 201) {
            updatePerChargesAir(name, resp.data.domrts_ids);
            updatePerChargesSurface(name, resp.data.domrts_ids);
          }
        })
        .catch((error) => {
          alert(`Error Happen while Updating Associated Charges ${error}`);
        });
    } else {
      updatePerChargesAir(name, []);
      updatePerChargesSurface(name, []);
    }
  };

  const updateDomesticZoneRates = (name) => {
    let cust_up_dom = up_params.customer.client_dom_zone;
    let chng_list = [];
    let f_datalist = [];
    let add_datalist = [];

    // To remove empty row from Domestic Billing Table
    let temp_ass_list = datalist1.filter((v) => v[0][0][0] !== "");

    for (let n = 0; n < temp_ass_list.length; n++) {
      const itm = temp_ass_list[n];
      let change_fields = {};
      if (itm.length > 3) {
        const prv_itm = cust_up_dom.find((v) => v.id === itm[3]);
        let dom_city_fields = Object.entries({
          calculation_type: air_cal.cal_type || surface_cal.cal_type,
          rate_type: dom_rate_type.toUpperCase(),
          cc_min_box: itm[1][1],
          nc_min_box: itm[2][1],
          cc_oda_rate: itm[1][3],
          nc_oda_rate: itm[2][3],
          cc_min_amount: itm[1][2],
          nc_min_amount: itm[2][2],
          cc_rate: itm[1][0],
          nc_rate: itm[2][0],
          origin_zone: itm[0][0][1],
          destination_zone: itm[0][1][1],
        });

        for (let j = 0; j < dom_city_fields.length; j++) {
          const ele = dom_city_fields[j];
          let prev = prv_itm[`${ele[0]}`];
          let new_v = ele[1];
          if (prev === new_v) {
            change_fields[`${ele[0]}`] = new_v;
          }
        }

        if (!!Object.keys(change_fields).length) {
          chng_list.push(change_fields);
          f_datalist.push(itm); // push item in final list if its have any changes
        }
      } else {
        add_datalist.push(itm);
      }
    }

    if (
      f_datalist.length > 0 ||
      add_datalist.length > 0 ||
      dom_rt_del_ids_zone_air.length > 0 || dom_rt_del_ids_zone_surface.length > 0
    ) {
      axios
        .put(
          ServerAddress + "master/update_domestic_zone_rates/",
          {
            bill_to: client_id,
            domestic_zone_rates: f_datalist,
            add_domestic_zone_rates: add_datalist,
            client: customer.id,
            chng_list: chng_list,
            rate_type: dom_rate_type,
            air_cal_type: air_cal.cal_type,
            surface_cal_type: surface_cal.cal_type,
            dom_rt_del_ids_air: dom_rt_del_ids_zone_air,
            dom_rt_del_ids_surface: dom_rt_del_ids_zone_surface,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then(function (resp) {
          // console.log("domestic city rate resp",resp)
          if (resp.status === 201) {
            if (dom_rate_category !== "Both") {
              updatePerChargesAir(name, resp.data.domrts_ids);
              updatePerChargesSurface(name, resp.data.domrts_ids);
            } else {
              updateOthChargesAirZone(
                name,
                resp.data.domrts_ids,
                resp.data.perchrg_ids_air
              );
              updateOthChargesSurfaceZone(
                name,
                resp.data.domrts_ids,
                resp.data.perchrg_ids_surface
              );
            }
          }
        })
        .catch((error) => {
          alert(`Error Happen while Updating Associated Charges ${error}`);
        });
    } else {
      if (dom_rate_category !== "Both") {
        updatePerChargesAir(name, []);
        updatePerChargesSurface(name, []);
      } else {
        updateOthChargesAirZone(name, [], []);
        updateOthChargesSurfaceZone(name, [])
      }
    }
  };

  // Location Functions Call
  useEffect(() => {
    if (state_id !== 0) {
      setcity_page(1);
      setcity_count(1);
      setcity_bottom(103)
      setcity_loaded(true);

    }
  }, [state_id])

  useEffect(() => {
    let timeoutId;
    if (state_id !== 0 && by_pincode === false) {
      timeoutId = setTimeout(() => {
        getCities(state_id, "state");
      }, 1);
    }
    return () => clearTimeout(timeoutId);
  }, [state_id, city_page, city_search_item]);

  useEffect(() => {
    if (pincode_id !== 0) {
      setlocality_page(1);
      setlocality_count(1);
      setlocality_bottom(103)
      setlocality_loaded(true);
    }
  }, [pincode_id])

  useEffect(() => {
    let timeoutId;
    if (pincode_id !== 0) {
      timeoutId = setTimeout(() => {
        getLocality(pincode_id, "pincode");
      }, 1);
    }
    return () => clearTimeout(timeoutId);
  }, [pincode_id, locality_page, locality_search_item]);

  useEffect(() => {
    if (city_id !== 0) {
      setpincode_page(1);
      setpincode_count(1);
      setpincode_bottom(103)
      setload_pincode(true)
    }
  }, [city_id])
  console.log("up_params=====", up_params)

  useEffect(() => {
    if (!isupdating && state && !by_pincode) {
      if(!same_as_data){
        setcity("");
        setcity_list_s([]);
        setpincode("");
        setpincode_list_s([]);
        setlocality("");
        setlocality_list_s([]);
      }
    }
  }, [state]);


  useEffect(() => {
    if (state !== "" && togstate && !by_pincode) {
      if(!same_as_data){
      setcity("");
      setcity_list_s([]);
      setpincode("");
      setpincode_list_s([]);
      setlocality("");
      setlocality_list_s([]);
      }
    }
  }, [state]);

  useEffect(() => {
    if (!isupdating && city && !by_pincode) {
      setsame_as_data(false)
      if(!same_as_data){
      setpincode("");
      setpincode_list_s([]);
      setlocality("");
      setlocality_list_s([]);
      }
    }
  }, [city]);

  useEffect(() => {
    if (city !== "" && togcity && !by_pincode) {
      if(!same_as_data){
      setpincode("");
      setpincode_list_s([]);
      setlocality("");
      setlocality_list_s([]);
      }
    }
  }, [city]);

  useEffect(() => {
    if (pincode !== "" && togpincode && !by_pincode) {
      if(!same_as_data){
      setlocality("");
      setlocality_list_s([]);
      }
    }
  }, [pincode]);

  useEffect(() => {
    if (!isupdating && pincode && !by_pincode) {
      if(!same_as_data){
      setlocality("");
      setlocality_list_s([]);
      }
    }
  }, [pincode]);

  useEffect(() => {
    if (isupdating) {
      settogstate(false);
      settogcity(false);
      settogpincode(false)
    }
  }, []);

  useEffect(() => {
    let timeoutId;
    if (city_id !== 0 && by_pincode === false) {
      timeoutId = setTimeout(() => {
        getPincode(city_id, "city");
      }, 1);
    }
    return () => clearTimeout(timeoutId);
  }, [city_id, pincode_page, pincode_search_item]);

  useLayoutEffect(() => {
    getStates();
  }, [state_page, state_search_item, refresh]);

  useLayoutEffect(() => {
    if (up_params === null) {
      getCommodities("all");
    }
    else {
      if (up_params?.customer) {
        getCommodities(parseInt(up_params?.customer?.id));
      }
      else {
        getCommodities("all");
      }

    }
  }, [commodities_page, commodities_search_txt, refresh]);

  useLayoutEffect(() => {
    console.log("up_params-------", up_params)
    try {
      // let cust_up = up_params.billto;
      // setcustomer(cust_up);
      let bill_to_name = up_params.billto.name;
      let bill_to_email = up_params.billto.email;
      let bill_to_phone_number = up_params.billto.phone_number;
      let bill_to_address_line_1 = up_params.billto.address_line;

      let bill_to_locality_name = up_params.bill_to_locality_name;

      customer["name"] = bill_to_name;
      customer["email"] = bill_to_email;
      customer["phone_number"] = bill_to_phone_number;
      customer["address_line"] = bill_to_address_line_1;

      setsame_as_data(true)

      setstate(toTitleCase(up_params.billto.state_name))
      setstate_id(up_params.billto.state_id)
      setcity(toTitleCase(up_params.billto.city_name))
      setcity_id(up_params.billto.city_id)
      setpincode(up_params.billto.pincode_name)
      setpincode_id(up_params.billto.pincode)
      setlocality(toTitleCase(up_params.billto.locality_name))
      setlocality_id(up_params.billto.location)
      setbill_to_nm(toTitleCase(bill_to_name));

      getLocality(bill_to_locality_name.toUpperCase(), "locality");
    } catch (error) { }
    try {
      // let cl_id = up_params.bill_to_id ? up_params.bill_to_id : up_params.billto.id;
      // setclient_id(cl_id);
      if(up_params.type === "update") {
        let cust_up = up_params.customer;
        // Setting Normal Client Details
        setdocumentFiles(cust_up.agreement_documents)
        setcustomer(cust_up);
        setisupdating(true);
        setstate(toTitleCase(cust_up.state_name));
        setstate_id(cust_up.state_id);
        setcity_id(cust_up.city_id);
        setcity(toTitleCase(cust_up.city_name));
        setpincode(cust_up.pincode_name);
        setpincode_id(cust_up.pincode);
        setlocality(toTitleCase(cust_up.locality_name));
        setlocality_id(cust_up.location);
        setbill_generation(cust_up.bill_generation_time_frame);
        setagreement_date(cust_up.agreement_start_date);
        setagreement_end_date(cust_up.agreement_end_date);
        setclient_id(cust_up.bill_to)

        // Associate Charge Data Setting Local
        let temp_lis = [];
        let cl_asso_chrg = cust_up.cust_asso_chrg;

        if (cl_asso_chrg.length > 0) {
          setdom_rate_type_local(toTitleCase(cl_asso_chrg[0].rate_category));
          for (let i = 0; i < cl_asso_chrg.length; i++) {
            const ele = cl_asso_chrg[i];

            let lst = [
              [[ele.charge, ele.charge_name]],
              [ele.cc_rate, ele.cc_min_boxes, ele.cc_min_amount],
              [ele.nc_rate, ele.nc_min_boxes, ele.nc_min_amount],
              ele.id,
            ];
            temp_lis.push(lst);
          }
        }

        //  Domestic City Air Datalist  started for update
        let dom_chrg = cust_up.client_dom_city;
        let tmplist_air = [];
        let tmplist_surface = [];
        if (dom_chrg.length > 0) {
          setdom_rate_type(toTitleCase(dom_chrg[0].rate_type));

          if (dom_chrg[0].cc_oda_rate !== "") {
            setis_oda_air(true);
            setis_per_charge_surfc(true);
          }

          for (const chr of dom_chrg) {
            let tmpl = [
              [
                [chr.origin_city, chr.orgin_n],
                [chr.destination_city, chr.destination_n],
              ],
              [chr.cc_rate, chr.cc_min_box, chr.cc_min_amount, chr.cc_oda_rate],
              [chr.nc_rate, chr.nc_min_box, chr.nc_min_amount, chr.nc_oda_rate],
              chr.id,
            ];

            tmplist_air.push(tmpl);
            tmplist_surface.push(tmpl);
          }
        }

        //  Domestic Zone Air Datalist  started for update
        let dom_chrg_zone = cust_up.client_dom_zone;
        let tmplist_air_zone = [];
        let tmplist_surface_zone = [];
        if (dom_chrg_zone.length > 0) {
          setdom_rate_category("Zone to Zone");
          setdom_rate_type(toTitleCase(dom_chrg_zone[0].rate_type));

          if (dom_chrg_zone[0].cc_oda_rate !== "") {
            setis_oda_air(true);
            setis_oda_surface(true);
          }

          for (const chr of dom_chrg_zone) {
            let tmpl = [
              [
                [chr.origin_zone, chr.origin_zone],
                [chr.destination_zone, chr.destination_zone],
              ],
              [chr.cc_rate, chr.cc_min_box, chr.cc_min_amount, chr.cc_oda_rate],
              [chr.nc_rate, chr.nc_min_box, chr.nc_min_amount, chr.nc_oda_rate],
              chr.id,
            ];

            tmplist_air_zone.push(tmpl);
            tmplist_surface_zone.push(tmpl);
          }
          for (const chr of dom_chrg_zone) {
            let tmpl1 = [
              [
                [chr.origin_zone, chr.origin_zone],
                [chr.destination_zone, chr.destination_zone],
              ],
              [chr.cc_rate, chr.cc_min_box, chr.cc_min_amount, chr.cc_oda_rate],
              [chr.nc_rate, chr.nc_min_box, chr.nc_min_amount, chr.nc_oda_rate],
              chr.id,
            ];

            tmplist_surface_zone.push(tmpl1);
          }
        }

        // Percentage Charge Setting Local
        let ptmp_lst = [];
        let ptmp_lst_air = [];
        let ptmp_lst_surface = [];
        let cl_per_chrg = cust_up.per_chrg_client;

        let asso_set = false;
        let asso_set_air = false;
        let asso_set_surface = false;

        let local_per = cl_per_chrg.filter(
          (v) => v.transportation_mode === "LOCAL"
        );
        let air_per = cl_per_chrg.filter((v) => v.transportation_mode === "AIR");
        let surface_per = cl_per_chrg.filter((v) => v.transportation_mode === "SURFACE")

        if (local_per.length > 0) {
          setis_per_charge(true);
          for (let k = 0; k < local_per.length; k++) {
            const pel = local_per[k];
            let ptmp = [
              [pel.charge, pel.charge_name],
              pel.category,
              pel.rate_percentage,
              pel.id,
            ];
            ptmp_lst.push(ptmp);

            if (pel.category !== "% of client invoice") {
              let ot_chg_list = pel.other_percentage_charge;

              for (let m = 0; m < ot_chg_list.length; m++) {
                let otchg = ot_chg_list[m];
                let ldtemp = [...temp_lis];
                let ldi = ldtemp[m];
                ldi[1].push(otchg.cc_rate_percentage);
                ldi[2].push(otchg.nc_rate_percentage);
                setlocal_datalist(ldtemp);
                let sn_list = structuredClone(ldtemp);
                setot_chrg_prv(sn_list);
                asso_set = true;
              }
            }
          }
        }
        // // Setting Domestic Percebtage Charge
        if (air_per.length > 0 || surface_per.length > 0) {
          setis_per_charge_air(true);
          setis_per_charge_surfc(true);
          for (let v = 0; v < air_per.length; v++) {
            const pela = air_per[v];

            let ptmp = [
              [pela.charge, pela.charge_name],
              pela.category,
              pela.rate_percentage,
              pela.id,
            ];
            ptmp_lst_air.push(ptmp);

            if (pela.category !== "% of client invoice") {
              let ot_chg_list = pela.other_percentage_charge;

              for (let g = 0; g < ot_chg_list.length; g++) {
                let otchg = ot_chg_list[g];
                let ldtemp = [];
                if (tmplist_air.length > 0) {
                  ldtemp = [...tmplist_air];
                  let ldi = ldtemp[g];
                  ldi[1].push(otchg.cc_rate_percentage);
                  ldi[2].push(otchg.nc_rate_percentage);
                  setdatalist(ldtemp);
                  let sn_list = structuredClone(ldtemp);
                  setot_chrg_prv_air(sn_list);
                } else {
                  ldtemp = [...tmplist_air_zone];
                  let ldi = ldtemp[g];
                  ldi[1].push(otchg.cc_rate_percentage);
                  ldi[2].push(otchg.nc_rate_percentage);
                  setdatalist1(ldtemp);
                  let sn_list = structuredClone(ldtemp);
                  setot_chrg_prv_air_zone(sn_list);
                }

                asso_set_air = true;
              }
            }
          }
          for (let v = 0; v < surface_per.length; v++) {
            const pela = surface_per[v];

            let ptmp = [
              [pela.charge, pela.charge_name],
              pela.category,
              pela.rate_percentage,
              pela.id,
            ];
            ptmp_lst_surface.push(ptmp);

            if (pela.category !== "% of client invoice") {
              let ot_chg_list = pela.other_percentage_charge;

              for (let g = 0; g < ot_chg_list.length; g++) {
                let otchg = ot_chg_list[g];
                let ldtemp = [];
                if (tmplist_surface.length > 0) {
                  ldtemp = [...tmplist_surface];
                  let ldi = ldtemp[g];
                  ldi[1].push(otchg.cc_rate_percentage);
                  ldi[2].push(otchg.nc_rate_percentage);
                  setdatalist(ldtemp);
                  let sn_list = structuredClone(ldtemp);
                  setot_chrg_prv_surface(sn_list);
                } else {
                  ldtemp = [...tmplist_surface_zone];
                  let ldi = ldtemp[g];
                  ldi[1].push(otchg.cc_rate_percentage);
                  ldi[2].push(otchg.nc_rate_percentage);
                  setdatalist1(ldtemp);
                  let sn_list = structuredClone(ldtemp);
                  setot_chrg_prv_surface_zone(sn_list);
                }

                asso_set_surface = true;
              }
            }
          }
        }

        setper_charge_list(ptmp_lst);
        setper_charge_list_air(ptmp_lst_air);
        setper_charge_list_surface(ptmp_lst_surface);

        if (asso_set === false) {
          setlocal_datalist(temp_lis);
        }
        if (asso_set_air === false) {
          setdatalist(tmplist_air);
          setdatalist1(tmplist_air_zone);
        }
        if (asso_set_surface === false) {
          setdatalist(tmplist_surface);
          setdatalist1(tmplist_surface_zone);
        }


        // Calculation Data Setting
        if (cust_up.cal_infos_cust.length > 0) {
          setupdate_cal(true);
          let local_cals = cust_up.cal_infos_cust.filter(
            (v) => v.transportation_mode === "LOCAL"
          );
          let air_cals = cust_up.cal_infos_cust.filter(
            (v) => v.transportation_mode === "AIR"
          );
          let surface_cals = cust_up.cal_infos_cust.filter(
            (v) => v.transportation_mode === "SURFACE"
          );

          if (local_cals[0].calculation_type !== "DONT") {
            setis_local(true);
            let cal = local_cals[local_cals.length - 1];
            if (cal.calculation_type === "DIMENSION") {
              dispatch(
                setLocalCal({
                  ...local_cal,
                  id: cal.id,
                  cal_type: "DIMENSION",
                  dimn: {
                    cft: cal.cft,
                    divided_by: cal.divided_by,
                    from_date: cal.from_date,
                    to_date: cal.to_date,
                  },
                })
              );
            } else {
              dispatch(
                setLocalCal({
                  ...local_cal,
                  id: cal.id,
                  cal_type: "BOX",
                  box_cal: {
                    box_value: cal.box_value,
                    from_date: cal.from_date,
                    to_date: cal.to_date,
                  },
                })
              );
            }
          } else {
            setis_local(false);
          }

          if (air_cals[0].calculation_type !== "DONT") {
            setis_air(true);
            setactiveTab("2");
            let cal = air_cals[air_cals.length - 1];
            if (cal.calculation_type === "DIMENSION") {
              dispatch(
                setAirCal({
                  ...air_cal,
                  id: cal.id,
                  cal_type: "DIMENSION",
                  dimn: {
                    cft: cal.cft,
                    divided_by: cal.divided_by,
                    from_date: cal.from_date,
                    to_date: cal.to_date,
                  },
                })
              );
            } else {
              dispatch(
                setAirCal({
                  ...air_cal,
                  id: cal.id,
                  cal_type: "BOX",
                  box_cal: {
                    box_value: cal.box_value,
                    from_date: cal.from_date,
                    to_date: cal.to_date,
                  },
                })
              );
            }
          }

          if (surface_cals[0].calculation_type !== "DONT") {
            setis_surface(true);
            setactiveTab("3");
            let cal = surface_cals[surface_cals.length - 1];
            if (cal.calculation_type === "DIMENSION") {
              dispatch(
                setSurfaceCal({
                  ...surface_cal,
                  id: cal.id,
                  cal_type: "DIMENSION",
                  dimn: {
                    cft: cal.cft,
                    divided_by: cal.divided_by,
                    from_date: cal.from_date,
                    to_date: cal.to_date,
                  },
                })
              );
            } else {
              dispatch(
                setSurfaceCal({
                  ...surface_cal,
                  id: cal.id,
                  cal_type: "BOX",
                  box_cal: {
                    box_value: cal.box_value,
                    from_date: cal.from_date,
                    to_date: cal.to_date,
                  },
                })
              );
            }
          }
        }
      }

      else if(up_params.type === "same_as"){
        setclient_id(up_params.billto.id)
      }
      else if(up_params.type === "add"){
        setclient_id(up_params.bill_to_id)
        setbill_to_nm(toTitleCase(up_params.bill_to_nm))
      }
      else {
        setEmpty();
      }
  

    } catch (error) {
      console.log("try err", error);
    }
  }, []);
  console.log("customer--------", customer)

  useLayoutEffect(() => {
    if (state !== "") {
      setpincode_loaded(true);
    }
  }, [state, city]);

  useLayoutEffect(() => {
    if (is_local) {
      setactiveTab("1");
    } else if (is_air) {
      setactiveTab("2");
    } else if (is_surface) {
      setactiveTab("3");
    } else if (is_cargo) {
      setactiveTab("4");
    } else if (is_train) {
      setactiveTab("5");
    } else if (is_courier) {
      setactiveTab("6");
    }
  }, [is_local, is_air, is_surface, is_cargo, is_train, is_courier]);


  useLayoutEffect(() => {
    if (commodities_list2.length !== 0) {
      setcommodities_error(false);
    }
  }, [commodities_list2])

  // console.log("client_id--------", client_id)

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        let shaw = Object.entries(validation.values);
            let filter_value = shaw.filter((v) => v[1] === "" || v[1] === 0);
            let map_value = filter_value.map((m) => m[0]);
            let all_value = map_value[0];
        let fields = ["customer_name","email","phone_number"];
        let fields2= ["address_line_1"];


         if (fields.includes(all_value)) {
          document.getElementById("client_details").scrollIntoView();
        }
        else if (fields2.includes(all_value)){
          document.getElementById('location_info').scrollIntoView();
         }  
        else if (state === "") {
          setstate_error(true);
          document.getElementById('location_info').scrollIntoView();
        }
         else if (city === "") {
          setcity_error(true);
          document.getElementById('location_info').scrollIntoView();
        }
         else if (pincode === "") {
          setpincode_error(true);
          document.getElementById('location_info').scrollIntoView();
        } 
        else if (pincode_loaded === false && pincode === "") {
          setpin_code_error(true);
          document.getElementById('location_info').scrollIntoView();
        }
        else if (pincode_loaded === false && locality === "") {
          setlocality_error(true);
          document.getElementById('location_info').scrollIntoView();
        }
         else if (locality === "") {
          setlocality_error2(true);
          document.getElementById('location_info').scrollIntoView();
        }
         else if (commodities_list2.length === 0) {
          setcommodities_error(true);
          document.getElementById("commidity_list").scrollIntoView();
        }
          validation.handleSubmit(e.values);
        return false;
        
      }}
    >
      {/* Client Details */}
      <div className="m-4" id="client_details">
        <div className=" mb-2 main-header">
          {isupdating ? "Update Client" : "Add Client"}
        </div>
        <Col lg={12}>
          <Card className="shadow bg-white rounded">
            <CardTitle className="mb-1 header">
              <div className="header-text-icon header-text">
                Client Details
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
                  <Col lg={4} md={4} sm={4}>
                    <div className="mb-2">
                      <Label className="header-child">Bill To Name *</Label>
                      <Input
                        value={isupdating ? toTitleCase(customer.billto_name) : bill_to_nm}
                        type="text"
                        name="billto_name"
                        className="form-control-md"
                        id="input"
                        placeholder="Enter Bill To Name"
                        disabled
                      />
                    </div>
                  </Col>

                  <Col lg={4} md={4} sm={4}>
                    <div className="mb-2">
                      <Label className="header-child">Client Name *</Label>
                      <Input
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.customer_name || ""}
                        invalid={
                          validation.touched.customer_name &&
                            validation.errors.customer_name
                            ? true
                            : false
                        }
                        type="text"
                        name="customer_name"
                        className="form-control-md"
                        id="input"
                        placeholder="Enter Client Name"
                      />

                      {validation.touched.customer_name &&
                        validation.errors.customer_name && (
                          <FormFeedback type="invalid">
                            {validation.errors.customer_name}
                          </FormFeedback>
                        )}
                    </div>
                  </Col>

                  <Col lg={4} md={6} sm={6}>
                    <div className="mb-3">
                      <Label className="header-child">Email</Label>
                      <Input
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.email || ""}
                        invalid={
                          validation.touched.email && validation.errors.email
                            ? true
                            : false
                        }
                        type="email"
                        name="email"
                        className="form-control-md"
                        id="input"
                        placeholder="Enter Email"
                      />
                      {validation.touched.email && validation.errors.email ? (
                        <FormFeedback type="invalid">
                          {validation.errors.email}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>

                  <Col lg={3} md={6} sm={6}>
                    <div className="mb-3">
                      <Label className="header-child">Phone number</Label>
                      <Input
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.phone_number || ""}
                        invalid={
                          validation.touched.phone_number &&
                            validation.errors.phone_number
                            ? true
                            : false
                        }
                        type="number"
                        name="phone_number"
                        className="form-control-md"
                        id="input"
                        placeholder="Enter phone number"
                        min={0}
                      />
                      {validation.touched.phone_number &&
                        validation.errors.phone_number ? (
                        <FormFeedback type="invalid">
                          {validation.errors.phone_number}
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

      {/* Location info */}
      <div className=" m-4" id="location_info">
        <Col lg={12}>
          <Card className="shadow bg-white rounded">
            <CardTitle className="mb-1 header">
              <div className="header-text-icon header-text">
                Location Info
                <IconContext.Provider
                  value={{
                    className: "header-add-icon",
                  }}
                >
                  <div onClick={toggle_circle_location}>
                    {circle_btn_location ? (
                      <MdRemoveCircleOutline />
                    ) : (
                      <MdAddCircleOutline />
                    )}
                  </div>
                </IconContext.Provider>
              </div>
            </CardTitle>
            {circle_btn_location ? (
              <CardBody>
                <Row>
                  <Col lg={4} md={6} sm={6}>
                    <div className="mb-2">
                      <Label className="header-child">Address Line *</Label>
                      <Input
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.address_line_1 || ""}
                        invalid={
                          validation.touched.address_line_1 &&
                            validation.errors.address_line_1
                            ? true
                            : false
                        }
                        type="text"
                        className="form-control-md"
                        id="input"
                        name="address_line_1"
                        placeholder="Enter Address Line 1"
                      />
                      {validation.touched.address_line_1 &&
                        validation.errors.address_line_1 ? (
                        <FormFeedback type="invalid">
                          {validation.errors.address_line_1}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>

                  {/* location */}
                  <Col lg={4} md={6} sm={6}>
                    <div className="mb-2">
                      <Label className="header-child">State*</Label>
                      <span onClick={() => setby_pincode(false)}>
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
                      </span>
                      {/* <div className="mt-1 error-text" color="danger">
                        {state_error ? "Please Select Any State" : null}
                      </div> */}
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
                      {/* <div className="mt-1 error-text" color="danger">
                        {city_error ? "Please Select Any City" : null}
                      </div> */}
                    </div>
                  </Col>

                  <Col lg={4} md={6} sm={6}>
                    {pincode_loaded ? (
                      <div className="mb-2">
                        <Label className="header-child">Pin Code*</Label>

                        <SearchInput
                          data_list={pincode_list_s}
                          setdata_list={setpincode_list_s}
                          data_item_s={pincode}
                          set_data_item_s={setpincode}
                          set_id={setpincode_id}
                          page={pincode_page}
                          setpage={setpincode_page}
                          error_message={"Please Select Any Option"}
                          error_s={pin_code_error}
                          search_item={pincode_search_item}
                          setsearch_item={setpincode_search_item}
                          loaded={load_pincode}
                          count={pincode_count}
                          bottom={pincode_bottom}
                          setbottom={setpincode_bottom}
                        />
                      </div>
                    ) : (
                      <div className="mb-2">
                        <Label className="header-child">Pin Code*</Label>
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
                                getPincode(pincode, "pincode");
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

                        {pincode_loaded === false && pincode_error === true ? (
                          <div style={{ color: "red" }}>Please add pincode</div>
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
                    {pincode_loaded ? (
                      <div className="mb-2">
                        <Label className="header-child">Locality*</Label>

                        <SearchInput
                          data_list={locality_list_s}
                          setdata_list={setlocality_list_s}
                          data_item_s={locality}
                          set_data_item_s={setlocality}
                          set_id={setlocality_id}
                          page={locality_page}
                          setpage={setlocality_page}
                          error_message={"Please Select Any Loaclity"}
                          error_s={locality_error}
                          search_item={locality_search_item}
                          setsearch_item={setlocality_search_item}
                          loaded={locality_loaded}
                          count={locality_count}
                          bottom={locality_bottom}
                          setbottom={setlocality_bottom}
                        />
                      </div>
                    ) : (
                      <div className="mb-2">
                        <Label className="header-child">Locality*</Label>
                        <Input
                          onChange={(val) => {
                            setlocality(val.target.value);
                            if (val.target.value.length !== 0) {
                              setlocality_error(false);
                            } else {
                              setlocality_error(true);
                            }
                          }}
                          onBlur={() => {
                            if (locality.length === 0) {
                              setlocality_error(true);
                            } else {
                              getLocality(locality.toUpperCase(), "locality");
                            }
                          }}
                          value={locality}
                          invalid={
                            validation.touched.locality &&
                              validation.errors.locality
                              ? true
                              : false
                          }
                          type="text"
                          className="form-control-md"
                          id="input"
                          name="pincode1"
                          placeholder="Enter Locality"
                        />

                        {pincode_loaded === false &&
                          locality_error2 === true ? (
                          <div
                            style={{
                              fontSize: "10.5px",
                              color: " #f46a6a",
                            }}
                          >
                            Please add Locality
                          </div>
                        ) : null}

                        {/* {pincode_loaded === false &&
                              pincode_error === false &&
                              pincode_error2 === true ? (
                              <div
                                style={{
                                  fontSize: "10.5px",
                                  color: " #f46a6a",
                                }}
                              >
                                pincode should 6 digit
                              </div>
                            ) : null} */}
                      </div>
                    )}
                  </Col>
                </Row>
              </CardBody>
            ) : null}
          </Card>
        </Col>
      </div>

      {/* Commidity Transer List */}
      <div className="m-4" id="commidity_list">
        <Col lg={12}>
          <Card className="shadow bg-white rounded">
            <CardTitle className="mb-1 header">
              <div className="header-text-icon header-text">
                Clients Commodities
                <IconContext.Provider
                  value={{
                    className: "header-add-icon",
                  }}
                >
                  <div onClick={toggle_circle_cal}>
                    {circle_btn_cal ? (
                      <MdRemoveCircleOutline />
                    ) : (
                      <MdAddCircleOutline />
                    )}
                  </div>
                </IconContext.Provider>
              </div>
            </CardTitle>

            {circle_btn_cal ? (
              <CardBody>
                {/* Billing Checks */}
                <Row>
                  <Label className="header-child">Clients Commodities</Label>
                  <Col lg={12} md={12} sm={12}>

                    <TransferList
                      list_a={commodities_list}
                      setlist_a={setcommodities_list}
                      list_b={commodities_list2}
                      setlist_b={setcommodities_list2}
                      page={commodities_page}
                      setpage={setcommodities_page}
                      // error_message={"Please Select Any Option"}
                      setsearch_item={setcommodities_search_txt}
                      loaded={commodities_loaded}
                      count={commodities_count}
                      bottom={commodities_bottom}
                      setbottom={setcommodities_bottom}
                    />
                    {commodities_error ? (
                        <div style={{ color: "#f46a6a", fontSize: "10.4px" }}>
                          Please Select Any Commodities
                        </div>
                      ) : null}
                    {/* <div style={{
                      color: "#F46E6E",
                      fontSize: "10.4px",
                    }}>
                      {commodities_error && "Please Select Any Commodities"}
                    </div> */}

                  </Col>
                </Row>
              </CardBody>
            ) : null}
          </Card>
        </Col>
      </div>

      {/* 
      <Label className="header-child">Associated Branch</Label>
                  <Col lg={12} md={12} sm={12}>
                    <TransferList
                      list_a={associate_branch_list_1}
                      setlist_a={setassociate_branch_list_1}
                      list_b={associate_branch_list_2}
                      setlist_b={setassociate_branch_list_2}
                      page={branch_page}
                      setpage={setbranch_page}
                      error_message={"Please Select Any Option"}
                      setsearch_item={setbranch_search}
                    />
                  </Col> */}

      {/* Service offered */}
      <div className="m-4">
        <Col lg={12}>
          <Card className="shadow bg-white rounded">
            <CardTitle className="mb-1 header">
              <div className="header-text-icon header-text">
                Service Offered
                <IconContext.Provider
                  value={{
                    className: "header-add-icon",
                  }}
                >
                  <div onClick={toggle_circle_cal}>
                    {circle_btn_cal ? (
                      <MdRemoveCircleOutline />
                    ) : (
                      <MdAddCircleOutline />
                    )}
                  </div>
                </IconContext.Provider>
              </div>
            </CardTitle>

            {circle_btn_cal ? (
              <CardBody>
                {/* Billing Checks */}
                <Row>
                  <Col lg={1}>
                    <div
                      onClick={() => {
                        setis_local(!is_local);
                      }}
                    >
                      {is_local ? (
                        <FiCheckSquare size={20} />
                      ) : (
                        <FiSquare size={20} />
                      )}
                      <Label className="header-child">&nbsp; Local</Label>
                    </div>
                  </Col>

                  <Col lg={1}>
                    <div
                      onClick={() => {
                        setis_air(!is_air);
                      }}
                    >
                      {is_air ? (
                        <FiCheckSquare size={20} />
                      ) : (
                        <FiSquare size={20} />
                      )}
                      <Label className="header-child">&nbsp; Air</Label>
                    </div>
                  </Col>

                  <Col lg={1}>
                    <div
                      onClick={() => {
                        setis_surface(!is_surface);
                      }}
                    >
                      {is_surface ? (
                        <FiCheckSquare size={20} />
                      ) : (
                        <FiSquare size={20} />
                      )}
                      <Label className="header-child">&nbsp; Surface</Label>
                    </div>
                  </Col>

                  <Col lg={1}>
                    <div
                      onClick={() => {
                        setis_cargo(!is_cargo);
                      }}
                    >
                      {is_cargo ? (
                        <FiCheckSquare size={20} />
                      ) : (
                        <FiSquare size={20} />
                      )}
                      <Label className="header-child">&nbsp; Cargo</Label>
                    </div>
                  </Col>

                  <Col lg={2}>
                    <div
                      onClick={() => {
                        setis_train(!is_train);
                      }}
                    >
                      {is_train ? (
                        <FiCheckSquare size={20} />
                      ) : (
                        <FiSquare size={20} />
                      )}
                      <Label className="header-child">&nbsp; Train</Label>
                    </div>
                  </Col>

                  <Col lg={2}>
                    <div
                      onClick={() => {
                        setis_courier(!is_courier);
                      }}
                    >
                      {is_courier ? (
                        <FiCheckSquare size={20} />
                      ) : (
                        <FiSquare size={20} />
                      )}
                      <Label className="header-child">&nbsp; Courier</Label>
                    </div>
                  </Col>

                  <Col lg={2}>
                    <div
                      onClick={() => {
                        setis_warehouse(!is_warehouse);
                      }}
                    >
                      {is_warehouse ? (
                        <FiCheckSquare size={20} />
                      ) : (
                        <FiSquare size={20} />
                      )}
                      <Label className="header-child">&nbsp; Warehouse</Label>
                    </div>
                  </Col>

                  <Col lg={2}>
                    <div
                      onClick={() => {
                        setis_other(!is_other);
                      }}
                    >
                      {is_other ? (
                        <FiCheckSquare size={20} />
                      ) : (
                        <FiSquare size={20} />
                      )}
                      <Label className="header-child">&nbsp; Other</Label>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            ) : null}
          </Card>
        </Col>
      </div>

      {(is_local ||
        is_air ||
        is_cargo ||
        is_courier ||
        is_train ||
        is_surface) && (
          <>
            {/* Calculation Info */}
            <div className="m-4">
              <Col lg={12}>
                <Card className="shadow bg-white rounded">
                  <CardTitle className="mb-1 header">
                    <div className="header-text-icon header-text">
                      Calculation Info
                      <IconContext.Provider
                        value={{
                          className: "header-add-icon",
                        }}
                      >
                        <div onClick={toggle_circle_cal}>
                          {circle_btn_cal ? (
                            <MdRemoveCircleOutline />
                          ) : (
                            <MdAddCircleOutline />
                          )}
                        </div>
                      </IconContext.Provider>
                    </div>
                  </CardTitle>

                  {circle_btn_cal ? (
                    <CardBody>
                      <Row>
                        <Col lg={12}>
                          {/* Component For Calculation Tab */}
                          <Tab
                            activeTab={activeTab}
                            setactiveTab={setactiveTab}
                            // active tabs
                            active_tabs={active_tabs}
                            setactive_tabs={setactive_tabs}
                            // Checkis
                            is_local={is_local}
                            is_air={is_air}
                            is_surface={is_surface}
                            is_cargo={is_cargo}
                            is_train={is_train}
                            is_courier={is_courier}
                            is_warehouse={is_warehouse}
                          />
                        </Col>
                      </Row>
                    </CardBody>
                  ) : null}
                </Card>
              </Col>
            </div>

            {/* Billing Info */}
            <div className="m-4">
              <Col lg={12}>
                <Card className="shadow bg-white rounded">
                  <CardTitle className="mb-1 header">
                    <div className="header-text-icon header-text">
                      Billing Info
                      <IconContext.Provider
                        value={{
                          className: "header-add-icon",
                        }}
                      >
                        <div onClick={toggle_circle_cal}>
                          {circle_btn_cal ? (
                            <MdRemoveCircleOutline />
                          ) : (
                            <MdAddCircleOutline />
                          )}
                        </div>
                      </IconContext.Provider>
                    </div>
                  </CardTitle>

                  {circle_btn_cal ? (
                    <CardBody>
                      {bill_row.map((itm, indx) => {
                        return (
                          <>
                            <Row className="mb-3 mt-3">
                              <Col lg={4} md="6" sm="6">
                                <div className="mb-2">
                                  <Label className="header-child">
                                    Bill Generation Time Frame
                                  </Label>

                                  <NSearchInput
                                    data_list={bill_generation_list}
                                    data_item_s={bill_generation}
                                    set_data_item_s={setbill_generation}
                                    show_search={false}
                                    error_message={"Please Select An Option"}
                                  />
                                </div>
                              </Col>
                            </Row>

                            <Row>
                              <Col lg={3} md={6} sm={6}>
                                <div className="mb-3">
                                  <Label className="header-child">
                                    Agreement Document
                                  </Label>

                                  <Input
                                    className="form-control-md"
                                    id="input"
                                    type="file"
                                    // id="file"
                                    multiple
                                    onChange={e => {
                                      setdocumentFiles(e.target.files[0]);
                                    }}
                                  />
                                </div>
                              </Col>
                              <Col lg={3} md={6} sm={6}>
                                <div className="mb-2">
                                  <Label className="header-child">
                                    Agreement start Date
                                  </Label>
                                  <Input
                                    type="date"
                                    className="form-control-md"
                                    id="input"
                                    value={agreement_date}
                                    onChange={(val) => {
                                      setagreement_date(val.target.value);
                                    }}
                                  />
                                </div>
                              </Col>

                              <Col lg={3} md={6} sm={6}>
                                <div className="mb-2">
                                  <Label className="header-child">
                                    Agreement End Date
                                  </Label>
                                  <Input
                                    type="date"
                                    className="form-control-md"
                                    id="input"
                                    value={agreement_end_date}
                                    onChange={(val) => {
                                      setagreement_end_date(val.target.value);
                                    }}
                                  />
                                </div>
                              </Col>

                              <Col lg={3} md={6} sm={6}>
                                <div className="mb-2 mt-3">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      itm[1] = !itm[1];
                                      setrefresh(!refresh);
                                    }}
                                    // className= {itm[1] ? "btn-danger btn  m-1" : "btn-success btn  m-1"}
                                    className="btn btn-success  m-1"
                                  >
                                    {itm[1] ? "Hide" : "Show"} Billing
                                  </button>
                                </div>
                              </Col>
                            </Row>

                            {itm[1] && (
                              <Row>
                                <Col lg={12}>
                                  {/* Component For Billing Info */}
                                  <BillingTab
                                    activeTab={activeTab}
                                    setactiveTab={setactiveTab}
                                    activeAirTab={activeAirTab}
                                    setactiveAirTab={setactiveAirTab}
                                    activeSurfaceTab={activeSurfaceTab}
                                    setactiveSurfaceTab={setactiveSurfaceTab}
                                    // Percentage Charges
                                    is_per_charge={is_per_charge}
                                    setis_per_charge={setis_per_charge}
                                    per_charge_list={per_charge_list}
                                    setper_charge_list={setper_charge_list}
                                    per_charge_list_air={per_charge_list_air}
                                    setper_charge_list_air={
                                      setper_charge_list_air
                                    }
                                    per_charge_list_surface={per_charge_list_surface}
                                    setper_charge_list_surface={setper_charge_list_surface}
                                    // Charge Type Air
                                    is_per_charge_air={is_per_charge_air}
                                    setis_per_charge_air={setis_per_charge_air}
                                    is_per_charge_surfc={is_per_charge_surfc}
                                    setis_per_charge_surfc={setis_per_charge_surfc}
                                    // Checkis
                                    is_local={is_local}
                                    is_air={is_air}
                                    is_surface={is_surface}
                                    is_cargo={is_cargo}
                                    is_train={is_train}
                                    is_courier={is_courier}
                                    is_warehouse={is_warehouse}
                                    // Table Data Domestic
                                    datalist={datalist}
                                    setdatalist={setdatalist}
                                    datalist1={datalist1}
                                    setdatalist1={setdatalist1}
                                    dom_rate_type={dom_rate_type}
                                    setdom_rate_type={setdom_rate_type}
                                    dom_type={domestic_rate_type}
                                    setdom_type={setdomestic_rate_type}
                                    // Table Zone Data
                                    dom_rate_category={dom_rate_category}
                                    setdom_rate_category={setdom_rate_category}
                                    // Local TAble
                                    local_datalist={local_datalist}
                                    setlocal_datalist={setlocal_datalist}
                                    dom_rate_type_local={dom_rate_type_local}
                                    setdom_rate_type_local={
                                      setdom_rate_type_local
                                    }
                                    // DELete ids
                                    asso_del_ids={asso_del_ids}
                                    setasso_del_ids={setasso_del_ids}
                                    per_del_ids={per_del_ids}
                                    setper_del_ids={setper_del_ids}
                                    dom_rt_del_ids_air={dom_rt_del_ids_air}
                                    setdom_rt_del_ids_air={setdom_rt_del_ids_air}
                                    dom_rt_del_ids_zone_air={
                                      dom_rt_del_ids_zone_air
                                    }
                                    setdom_rt_del_ids_zone_air={
                                      setdom_rt_del_ids_zone_air
                                    }
                                    per_del_ids_air={per_del_ids_air}
                                    setper_del_ids_air={setper_del_ids_air}
                                    per_del_ids_surfc={per_del_ids_surfc}
                                    setper_del_ids_surfc={setper_del_ids_surfc}
                                    isupdating={isupdating}
                                    is_oda_air={is_oda_air}
                                    setis_oda_air={setis_oda_air}
                                    is_oda_surface={is_oda_surface}
                                    setis_oda_surface={setis_oda_surface}
                                  />
                                </Col>
                              </Row>
                            )}

                            {/* Button To show Historical Data */}
                            {/* <Row>
                        <Col lg={3} md={6} sm={6}>
                          <div>
                            <button
                              type="button"
                              onClick={() => {
                                setrefresh(!refresh);
                              }}
                              className="btn btn-success  m-1"
                            >
                              Show Billing Historical Data
                            </button>
                          </div>
                        </Col>
                      </Row> */}
                          </>
                        );
                      })}
                      {/* 
                <div>
                  <span
                    className="link-text"
                    onClick={() => {
                      let tmp_row = [...bill_row];
                      tmp_row.push(["1", false]);
                      setbill_row(tmp_row);
                      
                    }}
                  >
                    <IconContext.Provider
                      value={{
                        className: "link-text",
                      }}
                    >
                      <MdAdd />
                    </IconContext.Provider>
                    Add Another Billing
                  </span>
                </div> */}
                    </CardBody>
                  ) : null}
                </Card>
              </Col>
            </div>
          </>
        )}

      {/* Submission Button */}
      {/*Button */}
      <div className=" m-4">
        <Col lg={12}>
          <div className="mb-1 footer_btn">
            <button type="submit" className="btn btn-info m-1">
             {isupdating ? "Update"  : "Save" } 
            </button>

            <button
              type="button"
              className="btn btn-info m-1"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
          </div>
        </Col>
      </div>
    </Form>
  );
};

export default AddClient;
