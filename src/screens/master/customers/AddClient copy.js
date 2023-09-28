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
import { setToggle } from "../../../store/parentFilter/ParentFilter";
import {
  setAlertType,
  setDataExist,
  setShowAlert,
} from "../../../store/alert/Alert";
import { FiCheckSquare, FiSquare } from "react-icons/fi";
import Tab from "../../../components/formComponent/clientComponent/tab/Tab";
import BillingTab from "../../../components/formComponent/clientComponent/tab/BillingTab";
import NSearchInput from "../../../components/formComponent/nsearchInput/NSearchInput";
import { setAirCal, setLocalCal } from "../../../store/master/client/Client";

const AddClient = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state: up_params } = useLocation();

  const user_id = useSelector((state) => state.authentication.userdetails.id);
  const accessToken = useSelector((state) => state.authentication.access_token);
  const [isupdating, setisupdating] = useState(false);
  const [update_cal, setupdate_cal] = useState(false);
  const [update_bill, setupdate_bill] = useState(false);

  // Client Details
  const [client_id, setclient_id] = useState(null);
  const [customer, setcustomer] = useState({});

  // Location Info
  const [state_list_s, setstate_list_s] = useState([]);
  const [state, setstate] = useState("");
  const [state_id, setstate_id] = useState(0);
  const [state_error, setstate_error] = useState(false);
  const [state_page, setstate_page] = useState(1);
  const [state_search_item, setstate_search_item] = useState("");

  const [city_list_s, setcity_list_s] = useState([]);
  const [city, setcity] = useState("");
  const [city_id, setcity_id] = useState(0);
  const [city_error, setcity_error] = useState(false);
  const [city_page, setcity_page] = useState(1);
  const [city_search_item, setcity_search_item] = useState("");

  const [by_pincode, setby_pincode] = useState(false);
  const [pincode_list_s, setpincode_list_s] = useState([]);
  const [pincode, setpincode] = useState("");
  const [pin_code_error, setpin_code_error] = useState(false);
  const [pincode_error, setpincode_error] = useState(false);
  const [pincode_error2, setpincode_error2] = useState(false);
  const [pincode_page, setpincode_page] = useState(1);
  const [pincode_search_item, setpincode_search_item] = useState("");
  const [pincode_id, setpincode_id] = useState(0);

  const [locality, setlocality] = useState("");
  const [pincode_loaded, setpincode_loaded] = useState(false);
  const [locality_list_s, setlocality_list_s] = useState([]);
  const [locality_page, setlocality_page] = useState(1);
  const [locality_search_item, setlocality_search_item] = useState("");
  const [locality_id, setlocality_id] = useState(0);
  const [locality_error, setlocality_error] = useState(false);
  const [locality_error2, setlocality_error2] = useState(false);

  // Calculation Info

  const local_cal_cust = useSelector((state) => state.customer.local_cal_cust);
  const local_cal = useSelector((state) => state.client.local_cal);
  const air_cal = useSelector((state) => state.client.air_cal);
  // active Tabs
  let temp_active_tabs = [
    local_cal.cal_type,
    air_cal.cal_type,
    "DONT",
    "DONT",
    "DONT",
    "DONT",
  ];
  const [active_tabs, setactive_tabs] = useState(temp_active_tabs);
  // Calculation Info Data
  const [local_cal_errd_o, setlocal_cal_errd_o] = useState(false);
  const [local_cal_errb_o, setlocal_cal_errb_o] = useState(false);

  // % Of Charge State
  const [is_per_charge, setis_per_charge] = useState(false);
  const [is_ass_charge, setis_ass_charge] = useState(false);
  let per_tmp_lst = [[["", ""], "", ""]];
  const [per_charge_list, setper_charge_list] = useState(per_tmp_lst);

  // % Of Charge State
  const [is_per_charge_air, setis_per_charge_air] = useState(false);
  let per_tmp_lst_air = [[["", ""], "", ""]];
  const [per_charge_list_air, setper_charge_list_air] =
    useState(per_tmp_lst_air);

  // Business Info
  const [agreement, setagreement] = useState(false);
  const [documentFiles, setdocumentFiles] = useState([]);
  const [agreement_date, setagreement_date] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [agreement_end_date, setagreement_end_date] = useState(
    new Date(new Date().setMonth(new Date().getMonth() + 1))
      .toISOString()
      .split("T")[0]
  );

  const [refresh, setrefresh] = useState(false);

  const [is_local, setis_local] = useState(true);
  const [is_air, setis_air] = useState(false);
  const [is_surface, setis_surface] = useState(false);
  const [is_train, setis_train] = useState(false);
  const [is_cargo, setis_cargo] = useState(false);
  const [is_courier, setis_courier] = useState(false);
  const [is_warehouse, setis_warehouse] = useState(false);

  let associated_charges_list_local = [
    ["", ""],
    "",
    0,
    0,
    "1",
    false,
    "",
    0,
    0,
    0,
    0,
  ];
  const [associated_charges_local, setassociated_charges_local] = useState([
    associated_charges_list_local,
  ]);

  // Multi Billing
  const [bill_row, setbill_row] = useState([["1", true]]);

  // New Freight
  const [nc_min_boxes_o, setnc_min_boxes_o] = useState(1);
  const [nc_min_amount_o, setnc_min_amount_o] = useState(1);
  const [nc_rate_per_o, setnc_rate_per_o] = useState(1);
  const [cc_min_boxes_o, setcc_min_boxes_o] = useState(1);
  const [cc_min_amount_o, setcc_min_amount_o] = useState(1);
  const [cc_rate_per_o, setcc_rate_per_o] = useState(1);
  const [freight_rate_category_o, setfreight_rate_category_o] = useState("");

  const [bill_generation_list, setbill_generation_list] = useState([
    "DAILY",
    "HALF-MONTHLY",
    "MONTHLY",
  ]);

  const [bill_generation, setbill_generation] = useState(
    bill_generation_list[0]
  );

  // Table Data Domestic
  let alist = [
    [
      [
        ["", ""],
        ["", ""],
      ],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
    ],
    [
      [
        ["", ""],
        ["", ""],
      ],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
    ],
    [
      [
        ["", ""],
        ["", ""],
      ],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
    ],
    [
      [
        ["", ""],
        ["", ""],
      ],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
    ],
    [
      [
        ["", ""],
        ["", ""],
      ],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
    ],
    [
      [
        ["", ""],
        ["", ""],
      ],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
    ],
    [
      [
        ["", ""],
        ["", ""],
      ],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
    ],
    [
      [
        ["", ""],
        ["", ""],
      ],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
    ],
    [
      [
        ["", ""],
        ["", ""],
      ],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
    ],
    [
      [
        ["", ""],
        ["", ""],
      ],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
    ],
  ];
  let blist = [
    [
      [
        ["", ""],
        ["", ""],
      ],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
    ],
    [
      [
        ["", ""],
        ["", ""],
      ],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
    ],
    [
      [
        ["", ""],
        ["", ""],
      ],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
    ],
    [
      [
        ["", ""],
        ["", ""],
      ],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
    ],
    [
      [
        ["", ""],
        ["", ""],
      ],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
    ],
    [
      [
        ["", ""],
        ["", ""],
      ],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
    ],
    [
      [
        ["", ""],
        ["", ""],
      ],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
    ],
    [
      [
        ["", ""],
        ["", ""],
      ],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
    ],
    [
      [
        ["", ""],
        ["", ""],
      ],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
    ],
    [
      [
        ["", ""],
        ["", ""],
      ],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
    ],
  ];
  const [datalist, setdatalist] = useState(alist);
  const [datalist1, setdatalist1] = useState(blist);
  const [dom_rate_type, setdom_rate_type] = useState("Flat");
  const [domestic_rate_type, setdomestic_rate_type] = useState("");

  // FOr Local Billing  Table
  let local_list = [
    [[["", ""]], ["", "", ""], ["", "", ""], ""],
    [[["", ""]], ["", "", ""], ["", "", ""], ""],
  ];

  const [local_datalist, setlocal_datalist] = useState(local_list);
  const [ot_chrg_prv, setot_chrg_prv] = useState([]);
  const [dom_rate_type_local, setdom_rate_type_local] = useState("Flat");

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
      //   if(state == "") {
      //     setstate_error(true);
      //   }
      //   if (city == "") {
      //     setcity_error(true);
      //   }
      //   if (pincode == "") {
      //     setpin_code_error(true);
      //   }
      //     else {

      isupdating ? updateClient(values) : addClient(values);
      // }
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
  };

  // Locations Function
  const getStates = () => {
    // let state_list = [...state_list_s];
    let state_list = [];
    axios
      .get(
        ServerAddress +
          `master/all_states/?search=${""}&place_id=all&filter_by=all&p=${state_page}&records=${10}&state_search=${state_search_item}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((resp) => {
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
        // setcity("");
        setcity_list_s([]);
        setstate_list_s(state_list);
      })
      .catch((err) => {
        alert(`Error Occur in Get States, ${err}`);
      });
  };

  const getCities = (place_id, filter_by) => {
    setby_pincode(false);
    let cities_list = [];
    axios
      .get(
        ServerAddress +
          `master/all_cities/?search=${""}&p=${city_page}&records=${20}&city_search=${city_search_item}` +
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

          setcity_list_s(cities_list);
        } else {
          setcity_list_s([]);
        }
      })
      .catch((err) => {
        alert(`Error Occur in Get City, ${err}`);
      });
  };

  const getPincode = (place_id, filter_by) => {
    let pincode_list = [];
    axios
      .get(
        ServerAddress +
          `master/all_pincode/?search=${""}&p=${pincode_page}&records=${10}&pincode_search=${pincode_search_item}` +
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
          if (pincode_page === 1) {
            pincode_list = resp.data.results.map((v) => [v.id, v.pincode]);
          } else {
            pincode_list = [
              ...pincode_list_s,
              ...resp.data.results.map((v) => [v.id, v.pincode]),
            ];
          }

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
        alert(`Error Occur in Get City, ${err}`);
      });
  };

  const getLocality = (place_id, filter_by) => {
    let locality_list = [];
    axios
      .get(
        ServerAddress +
          `master/all_locality/?search=${""}&p=${locality_page}&records=${10}` +
          `&place_id=${place_id}&filter_by=${filter_by}&name_serach=${locality_search_item}&state=&city=&name=`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((resp) => {
        if (filter_by !== "locality") {
          if (pincode_page === 1) {
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

          setlocality_list_s(locality_list);
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

  const addClientDoc = (client_id) => {
    const docket_imageform = new FormData();
    docket_imageform.append(`client_id`, client_id);
    let ind = 0;
    for (const documentFile of documentFiles) {
      docket_imageform.append(
        `clientdocument_${ind}`,
        documentFile,
        documentFile.name
      );
      ind += 1;
    }
    docket_imageform.append(`count`, ind);

    axios
      .post(ServerAddress + "master/add_client_doc/", docket_imageform, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "content-type": "multipart/form-data",
        },
      })
      .then(function (resp) {})
      .catch((err) => alert(`Error occur while add client doc , ${err}`));
  };

  const addClient = (values) => {
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
          bill_generation_time_frame: bill_generation,
          agreement_start_date: agreement_date,
          agreement_end_date: agreement_end_date,
          current_billing_mode_local: local_cal.cal_type,
          current_billing_mode_air: air_cal.cal_type,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (resp) {
        if (resp.status === 201) {
          if (documentFiles.length > 0) {
            addClientDoc(resp.data.data.id);
          }

          if (local_cal.cal_type !== "DONT") {
            addCalculation(
              resp.data.data.id,
              toTitleCase(values.customer_name)
            );
          } else {
            setEmpty();
            dispatch(
              setDataExist(
                `New Client "${toTitleCase(
                  values.customer_name
                )}" Added Successfully`
              )
            );
            dispatch(setAlertType("success"));
            dispatch(setShowAlert(true));
            navigate(-1);
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
        alert(`Error Happen while posting Companies  Data ${error}`);
      });
  };

  const updateClient = (values) => {
    let cust_up = up_params.customer;

    let fields_names = Object.entries({
      name: toTitleCase(values.customer_name).toUpperCase(),
      email: values.email,
      phone_number: values.phone_number,
      address_line: toTitleCase(values.address_line_1).toUpperCase(),
      location: locality_id,
      bill_to: client_id,
      current_billing_mode_local: local_cal.cal_type,
      current_billing_mode_air: air_cal.cal_type,
    });

    let change_fields = {};

    for (let j = 0; j < fields_names.length; j++) {
      const ele = fields_names[j];
      let prev = cust_up[`${ele[0]}`];
      let new_v = ele[1];
      if (prev !== new_v) {
        change_fields[`${ele[0]}`] = new_v;
      }
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
          current_billing_mode_local: local_cal.cal_type,
          current_billing_mode_air: air_cal.cal_type,
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
        // console.log("client upd resp", resp)
        if (resp.data.status === "success") {
          if (local_cal.cal_type != "DONT" || air_cal.cal_type != "DONT") {
            if (update_cal) {
              updateCalculation(values.customer_name);
            } else {
              addCalculation(customer.id, values.customer_name);
            }
          } else {
            setEmpty();
            dispatch(
              setDataExist(
                `Client '${values.customer_name}' Updated Sucessfully`
              )
            );
            dispatch(setAlertType("info"));
            dispatch(setShowAlert(true));
            navigate(-1);
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

  const addCalculation = (cust_id, name) => {
    alert("Add Call Is Started");
    let tmp_cal_info_data = {
      local: local_cal,
      air: air_cal,
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
        if (resp.status === 201) {
          addDomesticCharge(cust_id, name);
          addAssociatedCharges(cust_id, name);
        }
      })
      .catch((error) => {
        alert(`Error Happen while add Calculation  Data ${error}`);
      });
  };

  const updateCalculation = (name) => {
    let tmp_cal_info_data = [
      { local: local_cal },
      { air: air_cal },
      // { surface: surface_cal },
      // { cargo: cargo_cal },
      // { train: train_cal },
      // { courier: courier_cal },
    ];

    let cust_up = up_params.customer;

    let local_cals = cust_up.cal_infos_cust.filter(
      (v) => v.transportation_mode === "LOCAL"
    );
    let air_cals = cust_up.cal_infos_cust.filter(
      (v) => v.transportation_mode === "AIR"
    );

    // let pr_cals = cust_up.cal_infos_cust;
    let pr_cals = [];
    pr_cals.push(local_cals[local_cals.length - 1]);
    pr_cals.push(air_cals[air_cals.length - 1]);

    let change_fields_list = [];

    for (const pr_cal of pr_cals) {
      if (pr_cal.transportation_mode === "LOCAL") {
        let change_fields = {};
        let field_nm = [];

        if (local_cal.cal_type == "DIMENSION") {
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
        if (!!Object.keys(change_fields).length) {
          change_fields_list.push(change_fields);
        } else {
          change_fields_list.push("No Change");
        }
      }

      if (pr_cal.transportation_mode === "AIR") {
        let change_fields = {};
        let field_nm = [];
        if (air_cal.cal_type == "DIMENSION") {
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
    }

    if (!change_fields_list.every((v) => v == "No Change")) {
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
          if (resp.status == 201) {
            updateAssociatedCharge(name);
          }
        })
        .catch((error) => {
          alert(`Error Happen while update Calculation  Data ${error}`);
        });
    } else {
      updateAssociatedCharge(name);
    }
  };

  const addAssociatedCharges = (cust_id, name) => {
    let temp_ass_list = local_datalist.filter((v) => v[0][0][0] != "");

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
        if (is_per_charge) {
          addPerCharges(cust_id, name, resp.data.asschrg_ids);
        }
      })
      .catch((error) => {
        alert(`Error Happen while add_associated_charges ${error}`);
      });
  };

  const addDomesticCharge = (cust_id, name) => {
    let temp_as_list = datalist.filter((v) => v[0][0][0] != "");

    axios
      .post(
        ServerAddress + "master/add_domestic_rates/",
        {
          bill_to: client_id,
          client: cust_id,
          associated_charges: temp_as_list,
          local_cal_type: air_cal.cal_type,
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
          navigate(-1);
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

    let temp_ass_list = local_datalist.filter((v) => v[0][0][0] != "");
    let all_asso_ids = temp_ass_list.map((v) => v[3]);

    for (let n = 0; n < temp_ass_list.length; n++) {
      const itm = temp_ass_list[n];

      if (itm.length > 3) {
        const prv_itm = cust_up_asso.find((v) => v.id == itm[3]);
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

        if (!!Object.keys(change_fields).length) {
          chng_list.push(change_fields);
          f_local_datalist.push(itm);
        } else {
          chng_list.push("No Change");
        }
      } else {
        f_local_datalist.push(itm);
      }
    }

    // if (!chng_list.every((v) => v == "No Change")) {
    if (f_local_datalist.length > 0) {
      axios
        .put(
          ServerAddress + "master/update_associated_charge/",
          {
            bill_to: client_id,
            associated_charges: f_local_datalist,
            client: customer.id,
            local_cal_type: local_cal.cal_type,
            chng_list: chng_list,
            rate_category: dom_rate_type_local,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then(function (resp) {
          if (resp.status == 201) {
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

  const addPerCharges = (cust_id, name, asschrg_ids = []) => {
    axios
      .post(
        ServerAddress + "master/add_percentage_charge/",
        {
          bill_to: client_id,
          client: cust_id,
          per_charge_list: per_charge_list,
          per_charge_list_air: per_charge_list_air,
          local_cal_type: local_cal.cal_type,
          air_cal_type: air_cal.cal_type,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (resp) {
        if (resp.status == 201) {
          addOthCharges(
            name,
            asschrg_ids,
            resp.data.perchrg_ids,
            resp.data.perchrg_ids_air
          );
        }
      })
      .catch((error) => {
        alert(`Error Happen while add_percentage_charge ${error}`);
      });
  };

  const updatePerCharges = (name, asschrg_ids = []) => {
    let cust_up_per = up_params.customer.per_chrg_client;

    let chng_list = [];
    let chng_list_air = [];
    let f_per_chrg_list = [];
    let f_per_chrg_list_air = [];

    for (let m of per_charge_list) {
      if (m[0][0] != "") {
        if (typeof m[2] != "object") {
          let prev_per = cust_up_per.find((v) => v.id == m[3]);
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
          }

          chng_list.push([
            prev_per.id,
            Object.keys(change_fields).length !== 0
              ? change_fields
              : "No Change",
          ]);
        }
      }
    }

    for (let m of per_charge_list_air) {
      if (m[0][0] != "") {
        if (typeof m[2] != "object") {
          let prev_per = cust_up_per.find((v) => v.id == m[3]);
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
          }

          chng_list_air.push([
            prev_per.id,
            Object.keys(change_fields).length !== 0
              ? change_fields
              : "No Change",
          ]);
        }
      }
    }

    if (f_per_chrg_list.length > 0 || f_per_chrg_list_air.length > 0) {
      axios
        .post(
          ServerAddress + "master/add_percentage_charge/",
          {
            bill_to: client_id,
            client: customer.id,
            per_charge_list: f_per_chrg_list,
            per_charge_list_air: f_per_chrg_list_air,
            local_cal_type: local_cal.cal_type,
            air_cal_type: air_cal.cal_type,

            // bill_to: client_id,
            // client: customer.id,
            // per_charge_list: per_charge_list,
            // local_cal_type: local_cal.cal_type,
            // chng_list: chng_list,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then(function (resp) {
          if (resp.status == 201) {
            updateOthCharges(
              name,
              asschrg_ids,
              resp.data.perchrg_ids,
              resp.data.perchrg_ids_air
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

  const addOthCharges = (
    name,
    asschrg_ids = [],
    perchrg_ids = [],
    perchrg_ids_air = []
  ) => {
    let per_otch_tmp = per_charge_list.filter(
      (v) => v[1] == "% of other charges"
    );
    per_otch_tmp.map((v, indx) => (v[3] = perchrg_ids[indx]));

    local_datalist.map((v, idc) => {
      if (v[1].length > 3) {
        for (let k = 0; k < per_otch_tmp.length; k++) {
          let ele1 = v[1].slice(3)[k];
          let ele2 = v[2].slice(3)[k];
          per_otch_tmp[k][2] = [ele1, ele2];
        }
      }
    });

    axios
      .post(
        ServerAddress + "master/add_other_charge/",
        {
          per_otch_tmp: per_otch_tmp,
          local_cal_type: local_cal.cal_type,
          air_cal_type: air_cal.cal_type,
          asschrg_ids: asschrg_ids,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (resp) {
        setEmpty();
        dispatch(setDataExist(`Client '${name}' Added Sucessfully`));
        dispatch(setAlertType("success"));
        dispatch(setShowAlert(true));
        navigate(-1);
      })
      .catch((error) => {
        alert(`Error Happen while add_other_charge ${error}`);
      });
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
    let ass_ids_lst = [];

    let per_otch_tmp = per_charge_list.filter(
      (v) => v[1] === "% of other charges"
    );

    for (let t = 0; t < per_otch_tmp.length; t++) {
      const pel = per_otch_tmp[t];

      let k = 0;
      for (let a = 0; a < local_datalist.length; a++) {
        const ld = local_datalist[a];
        if (ld.length > 3) {
          c_list.push([ld[1][3 + t], ld[2][3 + t], pel[3], ld[3]]);
        } else {
          up_oth_chrgs.push([
            ld[1][3 + t],
            ld[2][3 + t],
            pel[3],
            asschrg_ids[k],
          ]);
          k += 1;
        }
      }

      for (let b = 0; b < ot_chrg_prv.length; b++) {
        const od = ot_chrg_prv[b];
        if (od.length > 3) {
          p_list.push([od[1][3 + t], od[2][3 + t], pel[3], od[3]]);
        }
      }
    }

    for (let p = 0; p < c_list.length; p++) {
      let nw = c_list[p];
      let pw = p_list[p];

      if (nw[0] != pw[0] || nw[1] != pw[1]) {
        up_oth_chrgs.push(nw);
      }
    }

    if (up_oth_chrgs.length > 0) {
      axios
        .put(
          ServerAddress + "master/update_other_charge/",
          {
            oth_char_list: up_oth_chrgs,
            local_cal_type: local_cal.cal_type,
            air_cal_type: air_cal.cal_type,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then(function (resp) {
          // setEmpty();
          // dispatch(setDataExist(`Client '${name}' Updated Sucessfully`));
          // dispatch(setAlertType("info"));
          // dispatch(setShowAlert(true));
          // navigate(-1);
        })
        .catch((error) => {
          alert(`Error Happen while add_other_charge ${error}`);
        });
    }
  };

  // Location Functions Call
  useEffect(() => {
    if (state_id !== 0 && by_pincode === false) {
      setcity_page(1);
      getCities(state_id, "state");
      // setpincode("");
      setpincode_list_s([]);
      // setlocality("");
      setlocality_list_s([]);
    }
  }, [state_id, city_page, city_search_item]);

  useEffect(() => {
    if (pincode_id !== 0) {
      setlocality_page(1);
      getLocality(pincode_id, "pincode");
    }
  }, [pincode_id, locality_page, locality_search_item]);

  useEffect(() => {
    if (city_id !== 0 && by_pincode === false) {
      setpincode_page(1);
      getPincode(city_id, "city");
      // setpincode("");
    }
  }, [city_id, pincode_page, pincode_search_item]);

  useLayoutEffect(() => {
    getStates();
    setcity_list_s([]);
  }, [state_page, state_search_item, refresh]);

  useLayoutEffect(() => {
    try {
      let bill_to_name = up_params.bill_to_name;
      let bill_to_email = up_params.bill_to_email;
      let bill_to_phone_number = up_params.bill_to_phone_number;
      customer["name"] = bill_to_name;
      customer["email"] = bill_to_email;
      customer["phone_number"] = bill_to_phone_number;
    } catch (error) {}

    try {
      let cl_id = up_params.bill_to_id
        ? up_params.bill_to_id
        : up_params.customer.bill_to;

      setclient_id(cl_id);

      if (!up_params.bill_to_id) {
        let cust_up = up_params.customer;
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

        // Associate Charge Data Setting Local
        let temp_lis = [];
        let cl_asso_chrg = cust_up.cust_asso_chrg;

        if (cl_asso_chrg.length > 0) {
          let chag_names = Array.from(
            new Set(cl_asso_chrg.map((v) => v.charge_name))
          );
          setdom_rate_type_local(toTitleCase(cl_asso_chrg[0].rate_category));

          let n_ass_chrgs_list = [];
          for (const chrg of chag_names) {
            let asso_chg_itm = cl_asso_chrg.filter(
              (g) => g.charge_name == chrg
            );
            n_ass_chrgs_list.push(asso_chg_itm[asso_chg_itm.length - 1]);
          }

          for (let i = 0; i < n_ass_chrgs_list.length; i++) {
            const ele = n_ass_chrgs_list[i];
            let lst = [
              [[ele.charge, ele.charge_name]],
              [ele.cc_rate, ele.cc_min_boxes, ele.cc_min_amount],
              [ele.nc_rate, ele.nc_min_boxes, ele.nc_min_amount],
              ele.id,
            ];
            temp_lis.push(lst);
          }
        }

        //  Domestic Datalist update
        let temp_list2 = [];
        let dom_chrg = cust_up.client_dom_city;
        //  console.log("[][][{{{}}}{{}{{}{{}{}}{",dom_chrg)
        if (dom_chrg.length > 0) {
          setdom_rate_type(toTitleCase(dom_chrg[0].rate_category));
          for (let i = 0; i < dom_chrg.length; i++) {
            const ele = dom_chrg[i];
            let lst = [
              [
                [ele.orgin_city, ele.orgin_n],
                [ele.destination_city, ele.destination_n],
              ],
              [ele.cold_per_box, ele.min_c_box, ele.min_amount_cold],
              [ele.non_cold_per_kg, ele.min_nc_box, ele.min_amount_noncold],
              ele.id,
            ];
            temp_list2.push(lst);
          }
          setdatalist(temp_list2);
        }

        // Percentage Charge Setting Local
        let ptmp_lst = [];
        let cl_per_chrg = cust_up.per_chrg_client;

        if (cl_per_chrg.length > 0) {
          setis_per_charge(true);
          let chag_names = Array.from(
            new Set(cl_per_chrg.map((v) => v.charge_name))
          );

          let n_per_chrgs_list = [];
          for (const chrg of chag_names) {
            let per_chg_itm = cl_per_chrg.filter((g) => g.charge_name == chrg);
            n_per_chrgs_list.push(per_chg_itm[per_chg_itm.length - 1]);
          }

          for (let k = 0; k < n_per_chrgs_list.length; k++) {
            const pel = n_per_chrgs_list[k];
            let rate_pt = {};
            if (pel.category != "% of client invoice") {
              let chag_names_ot = Array.from(
                new Set(pel.other_percentage_charge.map((v) => v.charge))
              );

              let n_ot_chrgs_list = [];
              for (const chrg of chag_names_ot) {
                let ot_chg_itm = pel.other_percentage_charge.filter(
                  (g) => g.charge == chrg
                );
                n_ot_chrgs_list.push(ot_chg_itm[ot_chg_itm.length - 1]);
              }

              for (let m = 0; m < n_ot_chrgs_list.length; m++) {
                let otchg = n_ot_chrgs_list[m];
                let ldtemp = [...temp_lis];
                let ldi = ldtemp[m];
                ldi[1].push(otchg.cc_rate_percentage);
                ldi[2].push(otchg.nc_rate_percentage);
                setlocal_datalist(ldtemp);
                let sn_list = structuredClone(ldtemp);
                setot_chrg_prv(sn_list);
              }
            } else {
              rate_pt = pel.rate_percentage;
            }

            let plst = [
              [pel.charge, pel.charge_name],
              pel.category,
              rate_pt,
              pel.id,
            ];
            ptmp_lst.push(plst);
          }
          setper_charge_list(ptmp_lst);
        }

        // Calculation Data Setting
        if (cust_up.cal_infos_cust.length > 0) {
          setupdate_cal(true);

          let local_cals = cust_up.cal_infos_cust.filter(
            (v) => v.transportation_mode == "LOCAL"
          );
          let air_cals = cust_up.cal_infos_cust.filter(
            (v) => v.transportation_mode == "AIR"
          );

          if (local_cals.length > 0) {
            setis_local(true);
            let cal = local_cals[local_cals.length - 1];
            if (cal.calculation_type == "DIMENSION") {
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
          }

          if (air_cals.length > 0) {
            setis_air(true);
            let cal = air_cals[air_cals.length - 1];
            if (cal.calculation_type == "DIMENSION") {
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
        }
      } else {
        setEmpty();
      }
    } catch (error) {}
  }, []);

  useLayoutEffect(() => {
    if (state !== "") {
      setpincode_loaded(true);
    }
  }, [state, city]);

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        // if (primary_charge == "") {
        //   setprimary_charge_error(true);
        // } else {
        validation.handleSubmit(e.values);
        // addCalculation(2,'name')
        // addAssociatedCharges(15,'name')
        // addPerCharges(15, 'name', ['']);
        // }
        return false;
      }}
    >
      {/* Client Details */}
      <div className="m-4">
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
                {/* Add customer */}

                <Row>
                  <Col lg={4} md={6} sm={6}>
                    <div className="mb-2">
                      <Label className="header-child">Name *</Label>
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
                      validation.errors.customer_name ? (
                        <FormFeedback type="invalid">
                          {validation.errors.customer_name}
                        </FormFeedback>
                      ) : null}
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

                  <Col lg={4} md={6} sm={6}>
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
      <div className=" m-4">
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
                          // error_message={"Please Select Any Option"}
                          search_item={state_search_item}
                          setsearch_item={setstate_search_item}
                        />
                      </span>
                      <div className="mt-1 error-text" color="danger">
                        {state_error ? "Please Select Any State" : null}
                      </div>
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
                        // error_message={"Please Select Any Option"}
                        search_item={city_search_item}
                        setsearch_item={setcity_search_item}
                      />
                      <div className="mt-1 error-text" color="danger">
                        {city_error ? "Please Select Any City" : null}
                      </div>
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
                          search_item={pincode_search_item}
                          setsearch_item={setpincode_search_item}
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
                          error_message={"Please Select Any Option"}
                          search_item={locality_search_item}
                          setsearch_item={setlocality_search_item}
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

                        {/* {pincode_loaded === false &&
                              pincode_error === true ? (
                              <div
                                style={{
                                  fontSize: "10.5px",
                                  color: " #f46a6a",
                                }}
                              >
                                Please add pincode
                              </div>
                            ) : null} */}

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

      {/* Service offerd */}
      <div className="m-4">
        <Col lg={12}>
          <Card className="shadow bg-white rounded">
            <CardTitle className="mb-1 header">
              <div className="header-text-icon header-text">
                Service Offerd
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

                  <Col lg={2}>
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

                  <Col lg={2}>
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
                </Row>
              </CardBody>
            ) : null}
          </Card>
        </Col>
      </div>

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
                {/* Billing Checks */}
                {/* <Row>
                  <Col lg={2}>
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
                  <Col lg={2}>
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
                  <Col lg={2}>
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
                  <Col lg={2}>
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
                </Row> */}
                <Row>
                  <Col lg={12}>
                    <Tab
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
                              onChange={(e) => {
                                const chosenFiles = Array.prototype.slice.call(
                                  e.target.files
                                );

                                setdocumentFiles(chosenFiles);
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
                            <BillingTab
                              forp={"customer"}
                              active_tabs={active_tabs}
                              setactive_tabs={setactive_tabs}
                              setlocal_cal_errd_o={setlocal_cal_errd_o}
                              setlocal_cal_errb_o={setlocal_cal_errb_o}
                              is_per_charge={is_per_charge}
                              setis_per_charge={setis_per_charge}
                              is_ass_charge={is_ass_charge}
                              setis_ass_charge={setis_ass_charge}
                              // Percentage Charges
                              per_charge_list={per_charge_list}
                              setper_charge_list={setper_charge_list}
                              per_charge_list_air={per_charge_list_air}
                              setper_charge_list_air={setper_charge_list_air}
                              // Charge Type Air
                              is_per_charge_air={is_per_charge_air}
                              setis_per_charge_air={setis_per_charge_air}
                              associated_charges_local={
                                associated_charges_local
                              }
                              setassociated_charges_local={
                                setassociated_charges_local
                              }
                              setnc_min_boxes_o={setnc_min_boxes_o}
                              setnc_min_amount_o={setnc_min_amount_o}
                              setnc_rate_per_o={setnc_rate_per_o}
                              setcc_min_boxes_o={setcc_min_boxes_o}
                              setcc_min_amount_o={setcc_min_amount_o}
                              setcc_rate_per_o={setcc_rate_per_o}
                              setfreight_rate_category_o={
                                setfreight_rate_category_o
                              }
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
                              local_datalist={local_datalist}
                              setlocal_datalist={setlocal_datalist}
                              dom_rate_type_local={dom_rate_type_local}
                              setdom_rate_type_local={setdom_rate_type_local}
                            />
                          </Col>
                        </Row>
                      )}

                      {/* Button To show Historical Data */}
                      <Row>
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
                      </Row>
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

      {/*Button */}
      <div className=" m-4">
        <Col lg={12}>
          <div className="mb-1 footer_btn">
            <button type="submit" className="btn btn-info m-1">
              Save
            </button>

            <button
              type="buttom"
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
