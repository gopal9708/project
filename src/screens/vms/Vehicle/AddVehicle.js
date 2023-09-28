import React, { useState, useEffect, useLayoutEffect } from "react";
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
import { useFormik } from "formik";
import * as Yup from "yup";
import PageTitle from "../../../components/pageTitle/PageTitle";
import Title from "../../../components/title/Title";
import { useDispatch, useSelector } from "react-redux";
import { IconContext } from "react-icons";
import { MdAddCircleOutline, MdRemoveCircleOutline } from "react-icons/md";
import axios from "axios";
import NSearchInput from "../../../components/formComponent/nsearchInput/NSearchInput";
import {
  setAlertType,
  setDataExist,
  setShowAlert,
} from "../../../store/alert/Alert";
import { ServerAddress } from "../../../constants/ServerAddress";
import { setToggle } from "../../../store/pagination/Pagination";
import toTitleCase from "../../../lib/titleCase/TitleCase";
import { useLocation, useNavigate } from "react-router-dom";
import SearchInput from "../../../components/formComponent/searchInput/SearchInput";
import TransferList from "../../../components/formComponent/transferList/TransferList";
import ImgModal from "../../../components/crop/ImgModal";

const Add_Vehicle = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const location = useLocation();
  const location_data = useLocation();

  const accessToken = useSelector((state) => state.authentication.access_token);
  const data_len = useSelector((state) => state.pagination.data_length);
  const page_num = useSelector((state) => state.pagination.page_number);
  const search = useSelector((state) => state.searchbar.search_item);
  const [refresh, setrefresh] = useState(false);


  //Vehicle Owner Info*
  const [vehicle_owner, setvehicle_owner] = useState([
    "OWNED VEHICLE",
    "PARTNER VEHICLE",
    "HIRED",
    "LEASED",
    "CUSTOMER",
  ]);
  const [vehicle_owner_s, setvehicle_owner_s] = useState("");
  const [vehicle_owner_error, setvehicle_owner_error] = useState(false);

  //Vehicle Type*
  const [vehicle_type, setvehicle_type] = useState([
    "BIKE",
    "VAN",
    "CAR",
    "BUS",
    "TRUCK",
    "PICKUP TRUCK",
    "SEMI TRUCK",
    "TRAILER",
    "LOADER ",
    "OTHER ",
  ]);
  const [vehicle_type_s, setvehicle_type_s] = useState("");
  const [vehicle_type_error, setvehicle_type_error] = useState(false);

  // Transporter Name* vendor State
  const [vendor_list, setvendor_list] = useState([]);
  const [vendor_name, setvendor_name] = useState("");
  const [vendor_id, setvendor_id] = useState("");
  const [vendor_n_page, setvendor_n_page] = useState(1);
  const [search_vendor_name, setsearch_vendor_name] = useState("");
  const [vendor_error, setvendor_error] = useState(false);

  // Vehicle Model
  const [model_nu_list, setmodel_nu_list] = useState("");
  console.log("model_nu_list==",model_nu_list);
  const [model_nu, setmodel_nu] = useState("");
  const [model_nu_id, setmodel_nu_id] = useState("");
  const [model_page, setmodel_page] = useState(1);
  const [vehicle_model_error, setvehicle_model_error] = useState(false);
  const [model_search_item, setmodel_search_item] = useState("");

  const [branch, setbranch] = useState("");
  const [branch_id, setbranch_id] = useState("");
  const [branch_list, setbranch_list] = useState([]);
  const [branch_list2, setbranch_list2] = useState([])
  const [branch_page, setbranch_page] = useState(1);
  const [search_branch, setsearch_branch] = useState("");
  const [branch_count, setbranch_count] = useState(1)
  const [branch_loaded, setbranch_loaded] = useState(false)
  const [branch_bottom, setbranch_bottom] = useState(103)
  const [branch_err, setbranch_err] = useState(false);

  //  Bharat Stage(BS):
  const [bharat_type_list, setbharat_type_list] = useState([
    "BS1",
    "BS2",
    "BS3",
    "BS4",
    "BS5",
    "BS6",
  ]);
  const [bharat_type, setbharat_type] = useState("");
  const [bharat_stage_error, setbharat_stage_error] = useState(false);

  // Permit Type
  const [status_list, setstatus_list] = useState(["CITY", "STATE", "NATIONAL"]);
  const [status, setstatus] = useState("");

  // Fuel Type
  const [fuel_list, setfuel_list] = useState([
    "PETROL",
    "DIESEL",
    "CNG",
    "ELECTRIC",
  ]);
  const [fuel, setfuel] = useState("");
  const [fuel_type_error, setfuel_type_error] = useState(false);

  //Registration State/Province:
  const [reg_state_list, setreg_state_list] = useState([]);
  const [reg_state, setreg_state] = useState("");
  const [reg_state_id, setreg_state_id] = useState("");
  const [reg_state_page, setreg_state_page] = useState(1);
  const [reg_state_error, setreg_state_error] = useState(false);
  const [reg_state_search_item, setreg_state_search_item] = useState("");

  //Vehicle Status
  const [vehicle_status_list, setvehicle_status_list] = useState([
    "ACTIVE",
    "ENGAGE",
    "INACTIVE",
  ]);
  const [vehicle_status, setvehicle_status] = useState("");

  // vehicle image 
  const [modal, setmodal] = useState(false);
  const [vehicle_img, setvehicle_img] = useState("")
  const [uploaded_img, setuploaded_img] = useState("");
  const [vehicle_img_error, setvehicle_img_error] = useState(false);

  // for update
  const [is_updating, setis_updating] = useState(false);



  //------drop down list-------------
  const [transporter_search_item, settransporter_search_item] = useState("");
  const [get_transporter_name_list, setget_transporter_name_list] =
    useState("");
  const [get_transporter_name, setget_transporter_name] = useState("");
  const [transpoter_id, settranspoter_id] = useState("");



  const [page2, setpage2] = useState(1);
  const [vehicle_up, setvehicle_up] = useState("");
  const [vehicle_id, setvehicle_id] = useState("");
  // const [page, setpage] = useState(1);

  const [vehicle_number_error, setvehicle_number_error] = useState(false);
  const [vehicle_len_error, setvehicle_len_error] = useState(false);

  const [vehicle_no, setvehicle_no] = useState("");

  const [container_capacity, setcontainer_capacity] = useState("")

  const [vehicle_model, setvehicle_model] = useState("");
  const [vendor_data, setvendor_data] = useState([]);
  const [vehicle, setvehicle] = useState([]);




  const [circle_btn, setcircle_btn] = useState(true);
  const toggle_circle = () => {
    setcircle_btn(!circle_btn);
  };

  const [circle_btn1, setcircle_btn1] = useState(true);
  const toggle_circle1 = () => {
    setcircle_btn1(!circle_btn1);
  };

  const [circle_btn2, setcircle_btn2] = useState(true);
  const toggle_circle2 = () => {
    setcircle_btn2(!circle_btn2);
  };




  //  ----------------------validation-----------------------------------
  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      // This should be in small letter or smallcase
      vehicle_number: vehicle_up.vehicle_number || "",
      vin_sn: vehicle_up.vin_sn || "",
      color_space: vehicle_up.color || "",
      trim: vehicle_up.trim || "",
      fuel_tank_capacity: vehicle_up.fuel_tank_capacity || "",
      odo_number: vehicle_up.odo_number || "",
      last_odo: vehicle_up.last_odo || "",
    },

    validationSchema: Yup.object({
      // last_odo: Yup.string().required("Last Odo Meter is required"),
      vehicle_number: Yup.string()
        .min(10, "Enter a valid Vehicle Number")
        .max(10, "Enter a valid Vehicle Number")
        .required("Vehicle Number is required"),
      // state_space: Yup.string().required("Registration State is required"),
      color_space: Yup.string().required("Color is required"),
      trim: Yup.string().required("Trim number is required"),
      // vehicle_owner_name: Yup.string().required(
      //   "Vehicle Owner name is required"
      // ),
      vin_sn: Yup.string().required("Enter the ViN number"),
      fuel_tank_capacity: Yup.string().required(
        "Fuel Tank Capacity is required"
      ),
      // odo_number: Yup.string().required("Odo Meter is required"),
    }),

    onSubmit: (values) => {
      is_updating ? update_vehicle(values) : add_vehicle(values);
    },
  });



  //--------get Data from other modal---------------//
  const getModelNameList = () => {
    // alert("getModelNameList in ADD VEHICLE PAGE")
    let temp = [...model_nu_list];
    axios
      .get(
        ServerAddress +
        `vms/get_vehiclemodel/?p=${model_page}&records=${10}&name=${[
          "",
        ]}&model_name_search=${model_search_item}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (response) {
        console.log("get_transporter response==", response.data);
        let data = response.data.results;
        for (let index = 0; index < data.length; index++) {
          temp.push([data[index].id, data[index].model_name]);
        }
        temp = [...new Set(temp.map((v) => `${v}`))].map((v) => v.split(","));
        setmodel_nu_list(temp);
      })
      .catch((error) => {
        alert(`Error occured while Gettting Data ${error}`);
      });
  };

  const get_transporter = () => {
    let temp1 = [...get_transporter_name_list];
    axios
      .get(
        ServerAddress +
        `trip/get_transporter/?p=${page2}&records=${10}&name=${[
          "",
        ]}&name_search=${transporter_search_item}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log("get_transporter response==", response.data);
        let data = response.data.results;
        for (let i = 0; i < data.length; i++) {
          temp1.push([data[i].id, data[i].name]);
        }
        temp1 = [...new Set(temp1.map((v) => `${v}`))].map((v) => v.split(","));
        setget_transporter_name_list(temp1);
      })
      .catch((error) => {
        alert(`Error Occured While Getting Transporter ${error}`);
      });
  };

  // const get_States = () => {
  //   let state_list = [...reg_state_list];
  //   axios
  //     .get(
  //       ServerAddress +
  //       `master/all-states/?p=${reg_state_page}&records=${10}&name=${[
  //         "",
  //       ]}&state_search=${reg_state_search_item}`,
  //       {
  //         headers: { Authorization: `Bearer ${accessToken}` },
  //       }
  //     )
  //     .then((response) => {
  //       for (let index = 0; index < response.data.length; index++) {
  //         const element = response.data[index];
  //         state_list.push([element.id, toTitleCase(element.state)]);
  //       }
  //       state_list = [...new Set(state_list.map((v) => `${v}`))].map((v) =>
  //         v.split(",")
  //       );

  //       setreg_state_list(state_list);
  //     })
  //     .catch((err) => {
  //       alert(`Error Occur in Get , ${err}`);
  //     });
  // };

  // get registration state  Function

  const getStates = () => {
    let state_list = [...reg_state_list];
    axios
      .get(
        ServerAddress +
        `master/all_states/?search=${""}&p=${reg_state_page}&records=${10}&state_search=${reg_state_search_item}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((resp) => {
        console.log("getStates response==", resp.data);
        if (resp.data.results.length > 0) {
          if (reg_state_page == 1) {
            state_list = resp.data.results.map((v) => [
              v.id,
              toTitleCase(v.state),
            ]);
          } else {
            state_list = [
              ...reg_state_list,
              ...resp.data.results.map((v) => [v.id, toTitleCase(v.state)]),
            ];
          }
        }
        setreg_state_list(state_list);
      })
      .catch((err) => {
        alert(`Error Occur in Get States, ${err}`);
      });
  };

  const get_VehicleBranchDetails = (id) => {

    let branch_temp = [];
    let data = [];
    axios
      .get(
        ServerAddress +
        `master/get_vehicle_branch/?vehicle_id=${id}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        console.log("get_VehicleBranchDetails response====", response)
        data = response.data.vehicle_branch;

        if (data.length > 0) {
          branch_temp = data.filter((v) => v.branch !== null).map((v) => [v.branch, toTitleCase(v.branch__name)]);
          setbranch_list2(branch_temp)
        }
      })
      .catch((err) => {
        alert(`Error Occur in Get Vehicle Branch Details, ${err}`);
      });
  };


  // To Get Vendor name in Transporter list
  const get_vendor = () => {
    let vendor_temp = [];
    let data = [];
    axios
      .get(
        ServerAddress +
        `/master/all_transporter/?search=${search}&p=${page_num}&records=${data_len}`,
        // `master/all_vendor/?search=${""}&p=${vendor_n_page}&records=${10}&name_search=${search_vendor_name}&vendor_name=&data=all`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        data = response.data.results;
        setvendor_data(data);
        if (response.data.results.length > 0) {
          if (vendor_n_page === 1) {
            vendor_temp = response.data.results.map((v) => [
              v.id,
              toTitleCase(v.name),
            ]);
          } else {
            vendor_temp = [
              ...vendor_list,
              ...response.data.results.map((v) => [v.id, v.name]),
            ];
          }
        }
        setvendor_list(vendor_temp);
      })
      .catch((err) => {
        alert(`Error Occur in Get Vendor, ${err}`);
      });
  };

  const getBranches = (val) => {
    let temp3 = [];
    axios
      .get(
        ServerAddress +
        `master/all_vehicle_branch/?search=${search_branch}&p=${branch_page}&records=${10}&data=${val}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        if (response.data.next === null) {
          setbranch_loaded(false);
        } else {
          setbranch_loaded(true);
        }

        if (response.data.results.length > 0) {
          if (branch_page === 1) {
            temp3 = response.data.results.map((v) => [
              v.id,
              toTitleCase(v.name),
            ]);
          } else {
            temp3 = [
              ...branch_list,
              ...response.data.results.map((v) => [v.id, toTitleCase(v.name)]),
            ];
          }
          setbranch_count(branch_count + 2)
          setbranch_list(temp3);
        }
        else {
          setbranch_list([]);
        }

      })
      .catch((err) => {
        alert(`Error Occur in Get`, err);
      });
  };

  //   Api For Posting Data
  const add_vehicle = (values) => {
    alert("Add_vehicle called--------------------")
    let branch_id = branch_list2.map((v) => v[0]);
    console.log("branch_id====", branch_id);
    //or
    let branch_id_list = [...new Set(branch_id.map((v) => `${v}`))].map((v) =>
      parseInt(v.split(","))
    );
    console.log("branch_id_list====", branch_id_list);
    axios
      .post(
        ServerAddress + "vms/add_vehicle_details/",
        {
          vehicle_owner: vehicle_owner_s,
          vehicle_type: vehicle_type_s,
          transporter_name: vendor_id ? vendor_id : null,
          model: model_nu_id,
          vehicle_number: toTitleCase(values.vehicle_number).toUpperCase(),
          container_capacity: container_capacity ? container_capacity : "",
          associated_branch: branch_id,
          vin_sn: values.vin_sn,
          bharat_stage: bharat_type,
          permit_type: status,
          fuel_type: fuel,
          trim: values.trim,
          color: toTitleCase(values.color_space).toUpperCase(),
          registration_state: reg_state_id,
          fuel_tank_capacity: values.fuel_tank_capacity,
          odo_number: values.odo_number,
          last_odo: values.last_odo,
          vehicle_status: vehicle_status,
          // rc_book: rc_book;
          // vehicle_image: vehicle_img,



          // vehicle_no: toTitleCase(vehicle_no).toUpperCase(),
          // vehicle_model: toTitleCase(vehicle_model).toUpperCase(),
          // branch: branch_id_list,          
          // transporter: transpoter_id,
          // vehicle_type: vehicle_type,
          // vehicle_type: "Fixed vehicle",
          // vehicle_owner_name: values.vehicle_owner_name,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (response) {
        console.log("ADD VEHICLE RESPONSE==", response.data);
        if (response.data.status === "success") {
          dispatch(setToggle(true));
          dispatch(setShowAlert(true));
          dispatch(
            setDataExist(
              `Vehicle Number "${(values.vehicle_number).toUpperCase()}" Added Successfully`
            )
          );
          dispatch(setAlertType("success"));
          navigate(-1);
        } else if (response.data === "duplicate") {
          dispatch(setShowAlert(true));
          dispatch(
            setDataExist(
              `Vehicle Number "${(values.vehicle_number).toUpperCase()}" already exists`
            )
          );
          dispatch(setAlertType("warning"));
        }
      })
      .catch((error) => {
        alert(`Error Happen while posting Vehicle Data ${error}`);
      });
  };


  // Api for Update data
  const update_vehicle = (values) => {
    alert("update_vehicle HISTORY called-----------");
    let branch_id_list = branch_list2.map((v) => v[0]).filter((v) => v !== null);
    let branch_ids = [...new Set(branch_id_list.map((v) => `${v}`))].map((v) =>
      parseInt(v.split(","))
    );
    let fields_names = Object.entries({
      // associated_branch:branch_list2,
      bharat_stage: bharat_type,
      color: toTitleCase(values.color_space).toUpperCase(),
      container_capacity: container_capacity ? container_capacity : "",
      fuel_tank_capacity: values.fuel_tank_capacity,
      fuel_type: fuel,
      last_odo: values.last_odo,
      model: model_nu_id,
      odo_number: values.odo_number,
      permit_type: status,
      registration_state: reg_state_id,
      transporter_name: vendor_id ? vendor_id : "",
      trim: values.trim,
      vehicle_number: toTitleCase(values.vehicle_number).toUpperCase(),
      vehicle_owner: vehicle_owner_s,
      vehicle_status: vehicle_status,
      vehicle_type: vehicle_type_s,
      vin_sn: values.vin_sn,
      // rc_book: rc_book;
      // vehicle_image: vehicle_img,

    });
    let change_fields = {};
    console.log("fields_names========", fields_names)
    var prom = new Promise((resolve, reject) => {
      for (let j = 0; j < fields_names.length; j++) {
        const ele = fields_names[j];
        let prev = location.state[`${ele[0]}`];
        let new_v = ele[1];
        if (String(prev).toUpperCase() !== String(new_v).toUpperCase()) {
          change_fields[`${ele[0]}`] = new_v.toString().toUpperCase();
        }
        if (j === fields_names.length - 1) resolve();
      }
    });
    prom.then(() => {
      alert("UPDATE VEHICLE CALLED------");
      axios
        .put(
          ServerAddress + "vms/update_vehicle_details/" + vehicle_id,
          {
            change_fields: change_fields,
            vehicle_owner: vehicle_owner_s,
            vehicle_type: vehicle_type_s,
            transporter_name: vendor_id ? vendor_id : null,
            model: model_nu_id,
            vehicle_number: toTitleCase(values.vehicle_number).toUpperCase(),
            container_capacity: container_capacity ? container_capacity : "",
            // associated_branch:branch_list2,
            vin_sn: values.vin_sn,
            bharat_stage: bharat_type,
            permit_type: status,
            fuel_type: fuel,
            trim: values.trim,
            color: toTitleCase(values.color_space).toUpperCase(),
            registration_state: reg_state_id,
            fuel_tank_capacity: values.fuel_tank_capacity,
            odo_number: values.odo_number,
            last_odo: values.last_odo,
            vehicle_status: vehicle_status,
            // rc_book: rc_book;
            // vehicle_image: vehicle_img,

            // vehicle_no: toTitleCase(vehicle_no).toUpperCase(),
            // vehicle_model: toTitleCase(vehicle_model).toUpperCase(),
            // vehicle_type: (vehicle_type_s).toUpperCase(),
            // transporter_name: vendor_id,
            // branch: branch_ids,
            // change_fields: change_fields,
            // container_capacity: container_capacity ? toTitleCase(container_capacity).toUpperCase() : null,
            // vehicle_owner: toTitleCase(vehicle_owner_s).toUpperCase(),
            // vehicle_image: vehicle_img?.substring(0, 4) !== "http" ? vehicle_img : null,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then(function (response) {
          console.log("update_vehicle_details response", response.data)
          if (response.data.status === "success") {
            dispatch(setToggle(true));
            dispatch(setShowAlert(true));
            dispatch(
              setDataExist(
                `"${(
                  values.vehicle_number
                )}" Updated sucessfully`
              )
            );
            dispatch(setAlertType("info"));
            navigate(-1);
          } else if (response.data === "duplicate") {
            dispatch(setShowAlert(true));
            dispatch(
              setDataExist(
                `"${(
                  values.vehicle_number
                )}" already exists`
              )
            );
            dispatch(setAlertType("warning"));
          }
        })
        .catch(function () {
          alert("Error Error While Updateing Vehicle");
        });
    });
  };



  useLayoutEffect(() => {
    if (location.state === null) {
      getBranches("all");
    }
  }, [branch_page, search_branch]);

  // useLayoutEffect(() => {
  //   if (location.state !== null) {
  //     getBranches(parseInt(location.state.vehicle.id));
  //   }
  // }, [branch_page, search_branch]);

  useLayoutEffect(() => {
    get_vendor();
  }, [vendor_n_page, search_vendor_name, refresh]);



  useEffect(() => {
    if (location.state !== null && vehicle.length !== 0) {
      get_VehicleBranchDetails(vehicle.id)
    }
  }, [vehicle])


  useLayoutEffect(() => {
    getStates();
  }, [reg_state_page, reg_state_search_item]);

  // useLayoutEffect(() => {
  //   get_States();
  // }, [reg_state_page, reg_state_search_item]);

  useLayoutEffect(() => {
    getModelNameList();
  }, [model_page, model_search_item]);


  useLayoutEffect(() => {
    get_transporter();
  }, [page2, transporter_search_item]);

  useLayoutEffect(() => {
    try {
      console.log("LOCATION DATA is==", location.state.item);
      let vehicle_u = location.state.item;
      setvehicle_up(vehicle_u);
      setvehicle_id(vehicle_u.id);
      setvehicle_owner_s(vehicle_u.vehicle_owner);
      setvehicle_type_s(vehicle_u.vehicle_type);
      setvendor_id(vehicle_u.transporter_name);
      setvendor_name(vehicle_u.transporter_nm);
      setmodel_nu_id(vehicle_u.model);
      setmodel_nu(vehicle_u.model_nm);
      setcontainer_capacity(vehicle_u.container_capacity);

      setbranch_list(vehicle_u.associated_branch);

      setbharat_type(vehicle_u.bharat_stage);
      setstatus(vehicle_u.permit_type);
      setfuel(vehicle_u.fuel_type);
      setreg_state_id(vehicle_u.registration_state)
      setreg_state(vehicle_u.registration_state_nm)
      setvehicle_status(vehicle_u.vehicle_status);
      setis_updating(true);
    } catch (error) { }
  }, []);


  useEffect(() => {
    if (branch_list2?.length > 0) {
      setbranch_err(false);
    }
    if (vehicle_owner_s !== "") {
      setvehicle_owner_error(false);
    }
    if (vehicle_owner_s === "PARTNER VEHICLE" && vendor_name !== "") {
      setvendor_error(false);
    }
    if (vehicle_no !== "") {
      setvehicle_number_error(false);
    }
    if (vehicle_model !== "") {
      setvehicle_model_error(false);
    }
    if (vehicle_img !== "") {
      setvehicle_img_error(false)
    }
    if (vehicle_no !== "" && vehicle_no.length !== 10) {
      setvehicle_len_error(true);
    } else {
      setvehicle_len_error(false);
    }
  }, [vehicle_type_s, vehicle_no, vehicle_model, vehicle_img, branch_list2, vehicle_owner_s]);


  return (
    <div>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          validation.handleSubmit(e.values);
          return false;
        }}
      >
        {/* Commodity */}
        <div className="mt-3">
          <PageTitle page={is_updating ? "Update Vehicle" : "Add Vehicle"} />
          <Title
            title={is_updating ? "Update Vehicle" : "Add Vehicle"}
            parent_title="Masters"
          />
        </div>

        <Col lg={12}>
          <Card className="shadow bg-white rounded">
            <CardTitle className="mb-1 header">
              <div className="header-text-icon header-text">
                Vehicle Info..
                {/* <div>Vehicle Info..</div> */}
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
                    <div className="mb-3">
                      <Label className="header-child">Vehicle Owner Info*</Label>
                      <NSearchInput
                        data_list={vehicle_owner}
                        data_item_s={vehicle_owner_s}
                        set_data_item_s={setvehicle_owner_s}
                        show_search={false}
                        error_message={"Please Select Vehicle Type"}
                        error_s={vehicle_owner_error}
                      />
                    </div>
                  </Col>
                  <Col lg={4} md={4} sm={4}>
                    <div className="mb-3">
                      <Label className="header-child">Vehicle Type*</Label>
                      <NSearchInput
                        data_list={vehicle_type}
                        data_item_s={vehicle_type_s}
                        set_data_item_s={setvehicle_type_s}
                        show_search={false}
                        error_message={"Please Select Vehicle Type"}
                        error_s={vehicle_type_error}
                      />
                    </div>
                  </Col>

                  {vehicle_owner_s === "PARTNER VEHICLE" && (
                    <Col lg={4} md={4} sm={4}>
                      <div className="mb-3">
                        <Label className="header-child">
                          Transporter Name*
                        </Label>
                        <SearchInput
                          data_list={vendor_list}
                          setdata_list={setvendor_list}
                          data_item_s={vendor_name}
                          set_data_item_s={setvendor_name}
                          set_id={setvendor_id}
                          page={vendor_n_page}
                          setpage={setvendor_n_page}
                          search_item={search_vendor_name}
                          setsearch_item={setsearch_vendor_name}
                          error_message={"Please Select Any Vendor"}
                          error_s={vendor_error}
                        />
                      </div>
                    </Col>
                  )}

                  <Col lg={4} md={6} sm={6}>
                    <div className="mb-3">
                      <Label className="header-child">Vehicle Model*</Label>
                      <SearchInput
                        data_list={model_nu_list}
                        setdata_list={setmodel_nu_list}
                        data_item_s={model_nu}
                        set_data_item_s={setmodel_nu}
                        set_id={setmodel_nu_id}
                        page={model_page}
                        setpage={setmodel_page}
                        error_message={"Please Select Vehicle Mode"}
                        error_s={vehicle_model_error}
                        setsearch_item={setmodel_search_item}
                      />
                    </div>
                  </Col>


                  <Col lg={4} md={6} sm={6}>
                    <div className="mb-2">
                      <Label className="header-child">
                        Vehicle Number *
                      </Label>
                      <Input
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.vehicle_number || ""}
                        invalid={
                          validation.touched.vehicle_number &&
                            validation.errors.vehicle_number
                            ? true
                            : false
                        }
                        type="text"
                        name="vehicle_number"
                        className="form-control-md "
                        id="input"
                        placeholder="Enter the Vehicle registration"
                      />
                      {validation.touched.vehicle_number &&
                        validation.errors.vehicle_number ? (
                        <FormFeedback type="invalid">
                          {validation.errors.vehicle_number}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>



                  <Col lg={4} md={4} sm={4}>
                    <div className="mb-3">
                      <Label className="header-child">Container Capacity</Label>
                      <Input
                        name="container_capacity"
                        type="text"
                        id="input"
                        value={container_capacity}
                        onChange={(e) => {
                          setcontainer_capacity(e.target.value);
                        }}
                      />
                    </div>
                  </Col>

                  <Col lg={12} md={12} sm={12}>
                    <Label className="header-child">Associated Branch *:</Label>
                    <TransferList
                      list_a={branch_list}
                      setlist_a={setbranch_list}
                      list_b={branch_list2}
                      setlist_b={setbranch_list2}
                      page={branch_page}
                      setpage={setbranch_page}
                      setsearch_item={setsearch_branch}
                      loaded={branch_loaded}
                      count={branch_count}
                      bottom={branch_bottom}
                      setbottom={setbranch_bottom}
                    />
                    {branch_err ? (
                      <div style={{ color: "#f46a6a", fontSize: "10.4px" }}>
                        Please Select At Least One Branch
                      </div>
                    ) : null}
                  </Col>
                </Row>
              </CardBody>
            ) : null}
          </Card>


          <Card className="shadow bg-white rounded">
            <CardTitle className="mb-1 header">
              <div className="header-text-icon header-text">
                Document Info
                {/* <div>Vehicle Info..</div> */}
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


                  {/* <Col lg={4} md={6} sm={6}>
                    <div className="mb-2">
                      <Label className="header-child">
                        Vehicle Owner Name:
                        <span style={{ color: "red", opacity: 0.8 }}>
                          {" "}
                          *
                        </span>
                      </Label>
                      <Input
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.vehicle_owner_name || ""}
                        invalid={
                          validation.touched.vehicle_owner_name &&
                            validation.errors.vehicle_owner_name
                            ? true
                            : false
                        }
                        type="text"
                        name="vehicle_owner_name"
                        className="form-control-md "
                        id="input"
                        placeholder="Enter the Vehicle Owner Name"
                      />
                      {validation.touched.vehicle_owner_name &&
                        validation.errors.vehicle_owner_name ? (
                        <FormFeedback type="invalid">
                          {validation.errors.vehicle_owner_name}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col> */}


                  <Col lg={4} md={6} sm={6}>
                    <div className="mb-2">
                      <Label className="header-child">VIN/SN:</Label>
                      <Input
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.vin_sn || ""}
                        invalid={
                          validation.touched.vin_sn &&
                            validation.errors.vin_sn
                            ? true
                            : false
                        }
                        type="Number"
                        min={0}
                        name="vin_sn"
                        className="form-control-md "
                        id="input"
                        placeholder="Enter the seriel number"
                      />
                      {validation.touched.vin_sn &&
                        validation.errors.vin_sn ? (
                        <FormFeedback type="invalid">
                          {validation.errors.vin_sn}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>

                  <Col lg={4} md={6} sm={6}>
                    <div className="mb-3">
                      <Label className="header-child">
                        Bharat Stage(BS):
                      </Label>
                      <NSearchInput
                        data_list={bharat_type_list}
                        data_item_s={bharat_type}
                        set_data_item_s={setbharat_type}
                        show_search={false}
                        error_message={"Please Select BS"}
                        error_s={bharat_stage_error}
                      />
                    </div>
                  </Col>



                  <Col lg={4} md={6} sm={6}>
                    <div className="mb-3">
                      <Label className="header-child">Permit Type:</Label>
                      <NSearchInput
                        data_list={status_list}
                        data_item_s={status}
                        set_data_item_s={setstatus}
                        show_search={false}
                      />
                    </div>
                  </Col>

                  <Col lg={4} md={6} sm={6}>
                    <div className="mb-3">
                      <Label className="header-child">Fuel Type:</Label>
                      <NSearchInput
                        data_list={fuel_list}
                        data_item_s={fuel}
                        set_data_item_s={setfuel}
                        show_search={false}
                        error_message={"Please Select Fuel type"}
                        error_s={fuel_type_error}
                      />
                    </div>
                  </Col>

                  <Col lg={4} md={6} sm={6}>
                    <div className="mb-2">
                      <Label className="header-child">Trim:</Label>
                      <Input
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.trim || ""}
                        invalid={
                          validation.touched.trim &&
                            validation.errors.trim
                            ? true
                            : false
                        }
                        type="text"
                        name="trim"
                        className="form-control-md "
                        id="input"
                        placeholder="Enter the Trim Details"
                      />
                      {validation.touched.trim &&
                        validation.errors.trim ? (
                        <FormFeedback type="invalid">
                          {validation.errors.trim}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>

                  <Col lg={4} md={6} sm={6}>
                    <div className="mb-2">
                      <Label className="header-child">color:</Label>
                      <Input
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.color_space || ""}
                        invalid={
                          validation.touched.color_space &&
                            validation.errors.color_space
                            ? true
                            : false
                        }
                        type="text"
                        name="color_space"
                        className="form-control-md "
                        id="input"
                        placeholder="Enter the Color of  Vehicle"
                      />
                      {validation.touched.color_space &&
                        validation.errors.color_space ? (
                        <FormFeedback type="invalid">
                          {validation.errors.color_space}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>

                  <Col lg={4} md={6} sm={6}>
                    <div className="mb-2">
                      <Label className="header-child">
                        Registration State/Province:
                      </Label>
                      <SearchInput
                        data_list={reg_state_list}
                        setdata_list={setreg_state_list}
                        data_item_s={reg_state}
                        set_data_item_s={setreg_state}
                        set_id={setreg_state_id}
                        page={reg_state_page}
                        setpage={setreg_state_page}
                        error_message={"Please Select Registration State"}
                        error_s={reg_state_error}
                        search_item={reg_state_search_item}
                        setsearch_item={setreg_state_search_item}
                      />
                    </div>
                  </Col>

                  <Col lg={4} md={6} sm={6}>
                    <div className="mb-2">
                      <Label className="header-child">
                        Fuel Tank Capacity:
                      </Label>
                      <Input
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.fuel_tank_capacity || ""}
                        invalid={
                          validation.touched.fuel_tank_capacity &&
                            validation.errors.fuel_tank_capacity
                            ? true
                            : false
                        }
                        type="Number"
                        min={0}
                        name="fuel_tank_capacity"
                        className="form-control-md "
                        id="input"
                        placeholder="Enter the Fuel Tank Capacity"
                      />
                      {validation.touched.fuel_tank_capacity &&
                        validation.errors.fuel_tank_capacity ? (
                        <FormFeedback type="invalid">
                          {validation.errors.fuel_tank_capacity}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>

                  <Col lg={4} md={6} sm={6}>
                    <div className="mb-2">
                      <Label className="header-child">
                        Total Odo Reading:
                      </Label>
                      <Input
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.odo_number || ""}
                        invalid={
                          validation.touched.odo_number &&
                            validation.errors.odo_number
                            ? true
                            : false
                        }
                        type="Number"
                        min={0}
                        name="odo_number"
                        className="form-control-md "
                        id="input"
                        placeholder="Enter the Total Odo Meter Reading"
                      />
                      {validation.touched.odo_number &&
                        validation.errors.odo_number ? (
                        <FormFeedback type="invalid">
                          {validation.errors.odo_number}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>

                  <Col lg={4} md={6} sm={6}>
                    <div className="mb-2">
                      <Label className="header-child">
                        Last Service Odo Reading:
                      </Label>
                      <Input
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.last_odo || ""}
                        invalid={
                          validation.touched.last_odo &&
                            validation.errors.last_odo
                            ? true
                            : false
                        }
                        type="Number"
                        min={0}
                        name="last_odo"
                        className="form-control-md "
                        id="input"
                        placeholder="Enter the Last Odo Reading"
                      />
                      {validation.touched.last_odo &&
                        validation.errors.last_odo ? (
                        <FormFeedback type="invalid">
                          {validation.errors.last_odo}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>

                  <Col lg={4} md={6} sm={6}>
                    <div className="mb-3">
                      <Label className="header-child">Vehicle Status:</Label>
                      <NSearchInput
                        data_list={vehicle_status_list}
                        data_item_s={vehicle_status}
                        set_data_item_s={setvehicle_status}
                        show_search={false}
                      />
                    </div>
                  </Col>

                  <Col lg={4} md={5} sm={5}>
                    <div className="mb-3">
                      <Label className="header-child">RC Book</Label>
                      <Input
                        className="form-control form-control-md"
                        id="formFileSm"
                        type="file"
                      />
                    </div>
                  </Col>
                </Row>

              </CardBody>
            ) : null}
          </Card>

          <Card className="shadow bg-white rounded">
            <CardTitle className="mb-1 header">
              <div className="header-text-icon header-text">
                Vehicle Image
                {/* <div>Vehicle Info..</div> */}
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

                  <ImgModal
                    modal={modal}
                    modal_set={() => {
                      setmodal(false);
                    }}
                    pre_image={vehicle_img ? vehicle_img : ""}
                    upload_image={(val) => {
                      setuploaded_img(val);
                    }}
                    result_image={(val) => {
                      setvehicle_img(val);
                    }}
                  />
                  {(vehicle_img === "" || !vehicle_img) &&
                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2" style={{ position: "relative" }}>
                        <Label>Vehicle Front Image*</Label>
                        <Input
                          style={{ background: "white" }}
                          className="form-control-md"
                          name="logo"
                          // type=""
                          id="input"
                          disabled
                          value={vehicle_img}
                          invalid={vehicle_img_error}
                          onChange={(val) => {
                            setvehicle_img(val.target.value)
                          }}
                        // accept="image/png,image/jpeg, image/jpg"
                        />
                        <button
                          style={{
                            border: "none",
                            position: "absolute",
                            borderRadius: "2px",
                            height: "29px",
                            top: "28.5px",
                            // padding: "0.375rem 0.75rem",
                            marginLeft: ".9px",
                            background: "#e9ecef",
                          }}
                          className="form-control-md"
                          id="input"
                          type="button"
                          onClick={() => setmodal(true)}
                        >
                          Choose Image
                        </button>
                        <FormFeedback type="invalid">
                          Vehicle Image is required
                        </FormFeedback>
                      </div>
                    </Col>
                  }

                  {vehicle_img && (
                    <Col lg={4} md={4} sm={6}>
                      <Label>Vehicle Front Image*</Label>
                      <div className="mb-3">
                        <img
                          onClick={() => setmodal(true)}
                          src={vehicle_img}
                          style={{
                            width: "95px",
                            height: "95px",
                            borderRadius: "8px",
                            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                          }}
                        />
                      </div>
                    </Col>
                  )}


                  {/* Side Image */}
                  <ImgModal
                    modal={modal}
                    modal_set={() => {
                      setmodal(false);
                    }}
                    pre_image={vehicle_img ? vehicle_img : ""}
                    upload_image={(val) => {
                      setuploaded_img(val);
                    }}
                    result_image={(val) => {
                      setvehicle_img(val);
                    }}
                  />
                  {(vehicle_img === "" || !vehicle_img) &&
                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2" style={{ position: "relative" }}>
                        <Label>Vehicle Side Image*</Label>
                        <Input
                          style={{ background: "white" }}
                          className="form-control-md"
                          name="logo"
                          // type=""
                          id="input"
                          disabled
                          value={vehicle_img}
                          invalid={vehicle_img_error}
                          onChange={(val) => {
                            setvehicle_img(val.target.value)
                          }}
                        // accept="image/png,image/jpeg, image/jpg"
                        />
                        <button
                          style={{
                            border: "none",
                            position: "absolute",
                            borderRadius: "2px",
                            height: "29px",
                            top: "28.5px",
                            // padding: "0.375rem 0.75rem",
                            marginLeft: ".9px",
                            background: "#e9ecef",
                          }}
                          className="form-control-md"
                          id="input"
                          type="button"
                          onClick={() => setmodal(true)}
                        >
                          Choose Image
                        </button>
                        <FormFeedback type="invalid">
                          Vehicle Image is required
                        </FormFeedback>
                      </div>
                    </Col>
                  }

                  {vehicle_img && (
                    <Col lg={4} md={4} sm={6}>
                      <Label>Vehicle Side Image*</Label>
                      <div className="mb-3">
                        <img
                          onClick={() => setmodal(true)}
                          src={vehicle_img}
                          style={{
                            width: "95px",
                            height: "95px",
                            borderRadius: "8px",
                            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                          }}
                        />
                      </div>
                    </Col>
                  )}

                  {/* Back Image */}
                  <ImgModal
                    modal={modal}
                    modal_set={() => {
                      setmodal(false);
                    }}
                    pre_image={vehicle_img ? vehicle_img : ""}
                    upload_image={(val) => {
                      setuploaded_img(val);
                    }}
                    result_image={(val) => {
                      setvehicle_img(val);
                    }}
                  />
                  {(vehicle_img === "" || !vehicle_img) &&
                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2" style={{ position: "relative" }}>
                        <Label>Vehicle Back Image*</Label>
                        <Input
                          style={{ background: "white" }}
                          className="form-control-md"
                          name="logo"
                          // type=""
                          id="input"
                          disabled
                          value={vehicle_img}
                          invalid={vehicle_img_error}
                          onChange={(val) => {
                            setvehicle_img(val.target.value)
                          }}
                        // accept="image/png,image/jpeg, image/jpg"
                        />
                        <button
                          style={{
                            border: "none",
                            position: "absolute",
                            borderRadius: "2px",
                            height: "29px",
                            top: "28.5px",
                            // padding: "0.375rem 0.75rem",
                            marginLeft: ".9px",
                            background: "#e9ecef",
                          }}
                          className="form-control-md"
                          id="input"
                          type="button"
                          onClick={() => setmodal(true)}
                        >
                          Choose Image
                        </button>
                        <FormFeedback type="invalid">
                          Vehicle Image is required
                        </FormFeedback>
                      </div>
                    </Col>
                  }

                  {vehicle_img && (
                    <Col lg={4} md={4} sm={6}>
                      <Label>Vehicle Back Image*</Label>
                      <div className="mb-3">
                        <img
                          onClick={() => setmodal(true)}
                          src={vehicle_img}
                          style={{
                            width: "95px",
                            height: "95px",
                            borderRadius: "8px",
                            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                          }}
                        />
                      </div>
                    </Col>
                  )}




                </Row>

              </CardBody>
            ) : null}
          </Card>
        </Col>


        {/*  Button Footer */}
        {/*Button */}
        <div className="m-3">
          <Col lg={12}>
            <div className="mb-1 footer_btn">
              <Button
                className="btn btn-info m-1 cu_btn"
                type="submit"
              // onClick={() => {
              // if (vehicle_owner_s === "") {
              //   setvehicle_owner_error(true);
              // }
              // else if (
              //   vehicle_owner_s === "PARTNER VEHICLE" &&
              //   vendor_name === ""
              // ) {
              //   setvendor_error(true);
              // } else if (vehicle_no === "" || vehicle_no.length !== 10) {
              //   setvehicle_number_error(true);
              // } else if (vehicle_model === "") {
              //   setvehicle_model_error(true);
              // } else if (vehicle_img === "") {
              //   setvehicle_img_error(true);
              // } else if (branch_list2?.length === 0) {
              //   setbranch_err(true);
              // }
              // else {
              //   is_updating ? update_vehicle() :
              //     add_vehicle();
              // }
              // }}
              >
                {/* {is_updating ? "Update" : "Save" } */}
                Save

              </Button>

              <Button
                className="btn btn-info m-1 cu_btn"
                type="button"
                onClick={() => navigate(-1)}
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

export default Add_Vehicle;
