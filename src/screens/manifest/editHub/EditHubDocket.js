/* eslint-disable */
import React, { useState, useEffect, useLayoutEffect } from "react";
import "../../../assets/scss/forms/form.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { FiSquare, FiCheckSquare } from "react-icons/fi";
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
import { IconContext } from "react-icons";
import { MdAddCircleOutline, MdRemoveCircleOutline } from "react-icons/md";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import toTitleCase from "../../../lib/titleCase/TitleCase";
import NSearchInput from "../../../components/formComponent/nsearchInput/NSearchInput";

import TransferList from "../../../components/formComponent/transferList/TransferList";
import { EServerAddress, ServerAddress } from "../../../constants/ServerAddress";
import {
  setAlertType,
  setDataExist,
  setShowAlert,
} from "../../../store/alert/Alert";

import PageTitle from "../../../components/pageTitle/PageTitle";
import Title from "../../../components/title/Title";
import { setToggle } from "../../../store/pagination/Pagination";
import EditManifestDataFormat from "./editManifestOrders/EditManifestDataFormat";
import AddAnotherOrder from "./AddAnotherOrder";
import SearchInput from "../../../components/formComponent/searchInput/SearchInput";
import { setBusinesssAccessToken, setEAccessToken, setOrgs } from "../../../store/ewayBill/EwayBill";
import { gstin_no } from "../../../constants/CompanyDetails";
import UpateEwaybillPartB from "../../authentication/signin/UpateEwaybillPartB";
import LogInEwayBill from "../../authentication/signin/LogInEwayBill";
const EditHubDocket = () => {
  const user = useSelector((state) => state.authentication.userdetails);
  const accessToken = useSelector((state) => state.authentication.access_token);
  const search = useSelector((state) => state.searchbar.search_item);
  const [page, setpage] = useState(1);
  const user_branch = useSelector(
    (state) => state.authentication.userdetails.home_branch
  );
  const business_access_token = useSelector((state) => state.eway_bill.business_access_token);

  const [refresh, setrefresh] = useState(false);
  const dispatch = useDispatch();
  const location_data = useLocation();
  const [same_box, setsame_box] = useState(true)
  console.log("location_data--------hub-", location_data)
  const user_id = useSelector((state) => state.authentication.userdetails.id);
  const navigate = useNavigate();
  const [hub_data, sethub_data] = useState([])
  //Circle Toogle Btn
  const [circle_btn, setcircle_btn] = useState(true);
  const toggle_circle = () => {
    setcircle_btn(!circle_btn);
  };
  const [data2, setdata2] = useState([])
  console.log("data2data2data2data2data2data2'''''", data2)
  const [circle_btn1, setcircle_btn1] = useState(true);
  const toggle_circle1 = () => {
    setcircle_btn1(!circle_btn1);
  };

  const [circle_btn2, setcircle_btn2] = useState(true);
  const toggle_circle2 = () => {
    setcircle_btn2(!circle_btn2);
  };
  const [circle_btn4, setcircle_btn4] = useState(true);
  const toggle_circle4 = () => {
    setcircle_btn4(!circle_btn4);
  };

  // Navigation At the time of Cancel
  const handleAction = () => {
    dispatch(setToggle(true));
    navigate(-1);
  };

  const [order_active_btn, setorder_active_btn] = useState("first");

  //  State For Cropping In React Crop
  const [showModal, setshowModal] = useState(false);
  const [document, setdocument] = useState([]);
  const [doc_result_image, setdoc_result_image] = useState([]);

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

  let dimension_list1 = [selectedFile];
  const [row1, setrow1] = useState([dimension_list1]);

  // adding extra input fields in Invoice
  const [invoice_img, setinvoice_img] = useState("");
  const [invoice_no, setinvoice_no] = useState("");
  const [invoice_value, setinvoice_value] = useState("");

  let dimension_list2 = [invoice_img, invoice_no, invoice_value];
  const [row2, setrow2] = useState([dimension_list2]);

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
  const [from_branch, setfrom_branch] = useState("");
  const [to_branch, setto_branch] = useState("");
  const [hub_no, sethub_no] = useState("");
  const [hub_id, sethub_id] = useState("");
  const success = useSelector((state) => state.alert.show_alert);

  const [data, setdata] = useState([]);

  const [coloader_mode_list, setcoloader_mode_list] = useState([

  ]);
  const [coloader_mode, setcoloader_mode] = useState("");
  const [search_text, setsearch_text] = useState("")
  const [coloader_list, setcoloader_list] = useState([]);
  const [coloader_selected, setcoloader_selected] = useState("");
  const [coloader_id, setcoloader_id] = useState("");

  const [total_bags, settotal_bags] = useState(0);
  const [total_box, settotal_box] = useState(0)
  console.log("total_bags----", total_bags)

  // Validation
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      coloader_no: hub_data.airwaybill_no || "",
      actual_weight: hub_data.total_weight || "",
      chargeable_weight: hub_data.chargeable_weight || "",
      driver_name: hub_data.driver_name || "",
      supporting_staff: hub_data.supporting_staff || "",
    },

    validationSchema: Yup.object({
      // coloader_no: Yup.string().required("Coloader No is required"),
      // vehicle_no: Yup.string().required("Vehicle Number is required"),
      // actual_weight: Yup.string().required("Manifest Weight is required"),
      // driver_name: Yup.string().required("Driver Name is required"),
      // supporting_staff: Yup.string().required("Spporting Staff Name is required"),
    }),

    onSubmit: (values) => {
      if (!total_bags && !total_box) {
        alert("Please Enter Either Bag and Box Value")
        // settotal_bag_error(true);
      }
      else if (vehicle_no == "" || vehicle_no?.toString().length !== 10) {
        setvehicle_error(true);
      }
      else if (!is_valid_barcode && total_bags !== "" && total_bags) {
        alert("Please Add Barcode Bag With Unique Value")
      }
      else if (!is_valid_box && total_box !== "" && total_box) {
        alert("Please Add Barcode Box With Unique Value")
      }
      else if (old_barcodes.length < parseInt(total_bags ? total_bags : 0)+parseInt(total_box ? total_box : 0)) {
        alert(`You Have Total ${old_barcodes.length} Quantity And You Have Enter Total No. Of Bag Or Box ${parseInt(total_bags ? total_bags : 0)+parseInt(total_box ? total_box : 0)} `)
      }
      else {
        updateManifest(values);
      }
   
    },
  });


  useLayoutEffect(() => {
    let manifest_data = location_data.state.hub;
    console.log("manifest_data----", manifest_data)
    sethub_data(manifest_data)
    sethub_no(manifest_data.hub_transfer_no);
    sethub_id(manifest_data.id);
    setfrom_branch(toTitleCase(manifest_data.orgin_branch_name));
    setto_branch(toTitleCase(manifest_data.destination_branch_name));
    settotal_bags(manifest_data.bag_count);
    settotal_box(manifest_data.box_count);
    setvehicle_no(manifest_data.vehicle_no);
    setrental(manifest_data.is_rented_vehcile);
  }, []);

  const get_orderof_manifest = () => {
    axios
      // .get(ServerAddress + `manifest/get_hub_orders/?hub_no=${hub_no}`, 
      .get(ServerAddress + `manifest/get_all_hub_orders/?hub_no=${hub_no}`,

        {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
      .then((response) => {

        console.log("responsesss==hub===", response)
        setdata(response.data[0].orders);
        setdata2(response.data[0].orders);
      })
      .catch((err) => {
        alert(`Error While Loading Client , ${err}`);
      });
  };

  useLayoutEffect(() => {
    hub_no && get_orderof_manifest();
  }, [hub_no, success]);

  const updateManifest = (values) => {
    axios
      .put(
        ServerAddress + "manifest/update_hub_manifest/" + hub_data.id,
        {
          coloader_mode: coloader_mode.toUpperCase(),
          coloader: coloader_id,
          airwaybill_no: values.coloader_no,
          // forwarded_at: today,
          bag_count: total_bags ? total_bags : 0,
          box_count: total_box ? total_box : 0,
          total_weight: 0,
          chargeable_weight: 0,
          coloader_name: coloader_selected.toUpperCase(),
          carrier_name: "",

          is_scanned: true,
          update: "True",
          forwarded_by: user_id,
          forwarded: "False",
          departed: "False",
          forwarded_branch: null,
          modified_by: user_id,
          hub_packages: row,
          driver_name: values.driver_name,
          supporting_staff: values.supporting_staff,
          deleted_packages: deleted_packages_id,
          hubtransfer_no: hub_no,
          vehicle_no: vehicle_no,
          vehcile_no_f: vehicle_id,
          is_rented_vehcile: rental ? "True" : "False",
        },

        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (response) {
        console.log("response-----", response.data)
        if (response.data.status === "success") {
          if (list_data.length>0){
            UpateEwaybillPartB({
              gstin_no: gstin_no,
              Data: list_data,
              ewayTokenB: business_access_token,
              access_token: accessToken,
            });
            // EwayUpdate();
          }
          add_manifestbarcode()
          dispatch(setToggle(true));
          dispatch(setShowAlert(true));
          dispatch(
            setDataExist(`Manifest Updated sucessfully`)
          );
          dispatch(setAlertType("info"));
          navigate(-1)
          let form = new FormData();
          if (document.length !== 0) {
            document.forEach((e, i) => {
              form.append(`manifestImage${i}`, e, e.name);
            });
            let imageLength = document.length;
            form.append(`manifest_count`, imageLength);
            form.append(`manifest_no`, response.data.data.manifest_no);
            axios
              .post(ServerAddress + `manifest/add-manifest-image/`, form, {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                  "content-type": "multipart/form-data",
                },
              })
              .then((res) => {
                console.log("ImageResssssssssssssssssssss", res.data);
                successMSg();
              })
              .catch((err) => {
                console.log("ImaeErrrrrrrrrrrrrrrrrrr", err);
              });
          } else {
            console.log("Manifest created without image");
          }
        } else if (response.data === "duplicate") {
          dispatch(setShowAlert(true));
          dispatch(
            setDataExist(
              `Already exists`
            )
          );
          dispatch(setAlertType("warning"));
        }
      })
      .catch(function (err) {
        alert(`Error While  Updateing Manifest ${err}`);
      });
  };
  useEffect(() => {
    if (total_bags == hub_data.bag_count && total_box == hub_data.box_count) {
      setsame_box(true)
    }
    else {
      setsame_box(false)
    }

  }, [total_bags, total_box, hub_data])

  const [rental, setrental] = useState(false);
  const [vehicle_no, setvehicle_no] = useState("");
  const [vehicle_list, setvehicle_list] = useState([]);
  const [vehicle_id, setvehicle_id] = useState("");
  const [vehicle_n_page, setvehicle_n_page] = useState(1);
  const [search_vehicle_name, setsearch_vehicle_name] = useState("");
  const [vehicle_error, setvehicle_error] = useState(false);
  const [vehicle_loaded, setvehicle_loaded] = useState(false)
  const [vehicle_count, setvehicle_count] = useState(1)
  const [vehicle_bottom, setvehicle_bottom] = useState(103)

  //  For getting Vehcile number
  const get_vehcile_no = () => {
    let vehicle_temp = [];
    let data = [];
    axios
      .get(
        ServerAddress +
        `master/all_vehcile/?search=${search_vehicle_name}&p=${vehicle_n_page}&records=${10}&name_search=${''}&vehicle_name=&data=all`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        if (response.data.next === null) {
          setvehicle_loaded(false);
        } else {
          setvehicle_loaded(true);
        }
        data = response.data.results;
        if (response.data.results.length > 0) {
          if (vehicle_n_page == 1) {
            vehicle_temp = response.data.results.map((v) => [
              v.id,
              v.vehcile_no,
            ]);
          } else {
            vehicle_temp = [
              ...vehicle_list,
              ...response.data.results.map((v) => [v.id, v.vehcile_no]),
            ];
          }
          setvehicle_count(vehicle_count + 2);
          setvehicle_list(vehicle_temp);
        }
        else {
          setvehicle_list([])
        }

      })
      .catch((err) => {
        alert(`Error Occur in Get , ${err}`);
      });
  };

  useLayoutEffect(() => {
    get_vehcile_no();
  }, [vehicle_n_page, search_vehicle_name]);

    // For Barcode
    const [is_valid_barcode, setis_valid_barcode] = useState(false)
    const [is_valid_box, setis_valid_box] = useState(false)
    const [old_barcodes, setold_barcodes] = useState([])
    console.log("old_barcodes-----", old_barcodes)
    const [bag_bq, setbag_bq] = useState("");
    let dimension_list_barcode = [bag_bq];
    const [row_barcode, setrow_barcode] = useState([dimension_list_barcode]);
    console.log("row_barcode----", row_barcode)
  
    const [box_bq, setbox_bq] = useState("");
    let dimension_list_barcodebox = [box_bq];
    const [row_barcodebox, setrow_barcodebox] = useState([dimension_list_barcodebox]);
  
  
    // For Barcode validation
    const check_barcode = (barcode, index, type) => {
      axios
        .get(
          ServerAddress + `manifest/checkDuplicateManifestBarcode/${barcode}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then(function (response) {
          console.log("barcode---------", response.data);
          if (response.data === "true") {
            if (type === "bag") {
              row_barcode[index] = ['']
              dispatch(setDataExist(`This Barcode Is Already Used In Manifest`));
              dispatch(setAlertType("warning"));
              dispatch(setShowAlert(true));
            }
            else {
              row_barcodebox[index] = ['']
              dispatch(setDataExist(`This Barcode Is Already Used In Manifest`));
              dispatch(setAlertType("warning"));
              dispatch(setShowAlert(true));
            }
  
          }
        })
        .catch((error) => {
          alert(`Error Happen while Geting Order Status Data ${error}`);
        });
    };
    const check_order_barcode = (barcode, index) => {
      axios
        .get(
          ServerAddress + `booking/checkDuplicateBarcode/${barcode}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then(function (response) {
          if (response.data === "true") {
            row_barcode[index] = ['']
            dispatch(setDataExist(`This Barcode Is Already Used`));
            dispatch(setAlertType("warning"));
            dispatch(setShowAlert(true));
  
          }
        })
        .catch((error) => {
          alert(`Error Happen while Geting Order Status Data ${error}`);
        });
    };
  
    useEffect(() => {
      if (total_bags !== "" && total_bags?.toString().length < 4) {
        let val = total_bags;
        let val_bag = Array.from({ length: val }, () => [""]);
        setrow_barcode(val_bag);
      }
      else {
        setrow_barcode([])
      }
    }, [total_bags]);
  
    useEffect(() => {
      if (total_box !== "" && total_box?.toString().length < 4) {
        let val = total_box;
        let val_box = Array.from({ length: val }, () => [""]);
        setrow_barcodebox(val_box);
      }
      else {
        setrow_barcodebox([])
      }
    }, [total_box]);
  
    useEffect(() => {
  
      if (data.length > 0) {
        let barcode = data.map(v => v?.qrcode_details).flat().map((v) => v?.barcode_no)
  
        setold_barcodes(barcode)
      }
      else {
        setold_barcodes([])
      }
  
    }, [data])
  
    useEffect(() => {
      if (vehicle_no !== "" || vehicle_no?.toString().length === 10) {
        setvehicle_error(false)
      }
    }, [vehicle_no])
  
    useEffect(() => {
      if (row_barcode?.length > 0) {
        let result = row_barcode.every((item, index, array) => {
          if (item[0] !== " " && item[0].startsWith("SSCL") && array.findIndex((el) => el[0] === item[0]) === index) {
            return true;
          } else {
            return false;
          }
        });
  
        setis_valid_barcode(result)
  
      }
  
    }, [dimension_list_barcode])
  
    useEffect(() => {
      if (row_barcodebox?.length > 0) {
        let result2 = row_barcodebox.every((item, index, array) => {
          if (item[0] !== " " && item[0].startsWith("SSCL") && array.findIndex((el) => el[0] === item[0]) === index) {
            return true;
          } else {
            return false;
          }
        });
  
        setis_valid_box(result2)
  
      }
  
    }, [dimension_list_barcodebox])
  
    console.log("data------", old_barcodes)
    // console.log("row_barcode====", row_barcode)
    // console.log("row_barcode====", row_barcodebox)
    const [total_barcodes, settotal_barcodes] = useState([])
    console.log("total_barcodes------", total_barcodes)
  
    useEffect(() => {
      
      let result = [
        ...row_barcode.filter((barcode) => barcode[0] !== "").map((barcode) => ({

          'hub_transfer_id': hub_id,
          'hub_transfer_no': hub_no,
          'barcode_no': barcode[0],
          'is_active': true,
          'vehicle_no': vehicle_no,
          'box_tpye': 'BAG'
        })),
        ...row_barcodebox.filter((barcode) => barcode[0] !== "").map((barcode) => ({

          'hub_transfer_id': hub_id,
          'hub_transfer_no': hub_no,
          'barcode_no': barcode[0],
          'is_active': true,
          'vehicle_no': vehicle_no,
          'box_tpye': 'BOX'
        }))
      ];
      settotal_barcodes(result)
    }, [box_bq,bag_bq,vehicle_no]);

    const add_manifestbarcode = () => {
      let data = total_barcodes
      axios
        .post(
          ServerAddress + `manifest/manifestBagqrcode/`, data,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then(function (response) {
  
          console.log("barcode response====", response)
        })
        .catch((error) => {
          alert(`Error Happen while posting Commodity  Data ${error}`);
        });
    };

  //For Update Part B
  const userDetail = useSelector((state) => state.authentication.userdetails);

  const [EwayBillData, setEwayBillData] = useState([])
  const [list_data, setlist_data] = useState([])
  console.log("list_data------", list_data)

  const getEwayBills = (hub_num) => {
    axios
      .get(
        ServerAddress +
        `booking/get_all_ewaybill/?type=${"hub"}&value=${hub_num}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        console.log("resres----", res)
        if (res?.data?.length !== 0) {
          setEwayBillData(res.data);
        //   // setEwayBillData((prevData) => [...prevData, res.data]);
        //   // setEwayBillData(...EwayBillData, res.data);
        }

      })
      .catch((err) => {
        console.log("rerrerer", err);
      });
  };

  useEffect(() => {
    if(EwayBillData?.length>0){
      let li = [];
      EwayBillData?.forEach((e) => {
        let obj = {
          transMode: "1",
          fromPlace: userDetail.branch_nm,
          fromState: userDetail.branch_location_state_code,
          transDocNo: e.trans_doc_no,
          transDocDate: String(
            e.docDate.split("-")[1] +
            "/" +
            e.docDate.split("-")[2] +
            "/" +
            e.docDate.split("-")[0]
          ),
          vehicleNo: vehicle_no,
          reasonCode: "2",
          reasonRem: "text",
          userGstin: gstin_no,
          ewbNo: e.ewb_no,
        };
        li.push(obj);
      });
      setlist_data(li)
      console.log("li--------", li)
    }

    // Rest of your code...
  }, [EwayBillData,vehicle_no]);

  useEffect(() => {
    if(hub_no !== ""){
      getEwayBills(hub_no)
    }
  }, [hub_no])

  // const [eway_loaded, seteway_loaded] = useState(false)

  // useEffect(() => {
  //   seteway_loaded(true)
  // }, []);

  // const memoizedLogInEwayBill = useMemo(() => <LogInEwayBill />, []);

  useEffect(() => {
  if (old_barcodes.length < parseInt(total_bags ? total_bags : 0)+parseInt(total_box ? total_box : 0)) {
      alert(`You Have Total ${old_barcodes.length} Quantity And You Have Enter Total No. Of Bag Or Box ${parseInt(total_bags ? total_bags : 0)+parseInt(total_box ? total_box : 0)} `)
    }
  }, [total_bags,total_box,old_barcodes])
  

  return (
    <>
     {/* {!eway_loaded && memoizedLogInEwayBill} */}
     <LogInEwayBill />
      <div>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            validation.handleSubmit(e.values);
            return false;
          }}
        >
          <div className="mt-3">
            <PageTitle page={location_data?.state?.type ? "Edit Hub Runsheet" : "Edit Hub Manifest"} />
            <Title title={location_data?.state?.type ? "Edit Hub Runsheet" : "Edit Hub Manifest"} parent_title={location_data?.state?.type ? "Runsheet" : "Manifests"} />
          </div>

          {/* Company Info */}
          <div className="m-3">
            <Col lg={12}>
              <Card className="shadow bg-white rounded">
                <CardTitle className="mb-1 header">
                  <div className="header-text-icon header-text">
                    {location_data?.state?.type ? "Hub Runsheet Info" : "Hub Manifest Info"} :
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
                        <div className="mb-2">
                          <Label className="header-child">  {location_data?.state?.type ? "Hub Runsheet No*" : "Hub Manifest No*"} :</Label>

                          <Input id="input" disabled value={hub_no} />
                        </div>
                      </Col>
                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-2">
                          <Label className="header-child">From Branch* :</Label>
                          <Input id="input" disabled value={from_branch} />
                        </div>
                      </Col>

                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-2">
                          <Label className="header-child">To Branch* :</Label>
                          <Input id="input" disabled value={to_branch} />
                        </div>
                      </Col>


                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-2">
                          <Label className="header-child">Total Bags </Label>
                          <Input
                            value={total_bags}
                            onChange={(e) => {
                              settotal_bags(e.target.value);
                            }}
                            // onBlur={() => {
                            //   settotal_bag_error(true);
                            // }}
                            // invalid={total_bags == "" && total_bag_error}
                            type="text"
                            className="form-control-md"
                            id="input"
                            name="total_bags"
                            placeholder="Enter No Of Bags"
                            disabled
                          />
                          {/* {total_bags == "" && total_bag_error ? (
                            <FormFeedback type="invalid">
                              Total Bages is required
                            </FormFeedback>
                          ) : null} */}
                        </div>
                      </Col>

                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-2">
                          <Label className="header-child">Total Boxes </Label>
                          <Input
                            value={total_box}
                            onChange={(e) => {
                              settotal_box(e.target.value);
                            }}
                            type="text"
                            className="form-control-md"
                            id="input"
                            name="total_box"
                            placeholder="Enter No Of Bags"
                          />
                        </div>
                      </Col>

                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-2">
                          <Label className="header-child">
                            Market Vehcile:
                          </Label>
                          <Row>
                          <Col lg={12} md={12} sm={12}>
                          {rental ? (
                            <FiCheckSquare
                              size={20}
                              onClick={() => {
                                setrental(false);
                              }}
                            />
                          ) : (
                            <FiSquare
                              size={20}
                              onClick={() => {
                                setrental(true);
                              }}
                            />
                          )}
                          </Col>
                          </Row>
                        </div>
                      </Col>
                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-2">
                          {rental ? (
                            <Label className="header-child">
                              {" "}
                              Market Vehcile No* :
                            </Label>
                          ) : (
                            <Label className="header-child">
                              Vehcile No* :
                            </Label>
                          )}
                          {rental ? null : (
                            <SearchInput
                              data_list={vehicle_list}
                              setdata_list={setvehicle_list}
                              data_item_s={vehicle_no}
                              set_data_item_s={setvehicle_no}
                              set_id={setvehicle_id}
                              page={vehicle_n_page}
                              setpage={setvehicle_n_page}
                              search_item={search_vehicle_name}
                              setsearch_item={setsearch_vehicle_name}
                              error_message={"Please Select Any Vechile Number"}
                              error_s={vehicle_error}
                              loaded={vehicle_loaded}
                              count={vehicle_count}
                              bottom={vehicle_bottom}
                              setbottom={setvehicle_bottom}
                            />
                          )}

                          {rental &&
                            <div className="mb-2">
                              <Input
                                name="vehicle_no"
                                type="text"
                                id="input"
                                maxLength={10}
                                value={vehicle_no}
                                onChange={(e) => {
                                  setvehicle_no(e.target.value);
                                }}
                                onBlur={() => {
                                  if (vehicle_no === "" || vehicle_no?.toString().length !== 10) {
                                    setvehicle_error(true)
                                  }
                                }
                                }
                                invalid={
                                  vehicle_error
                                }
                              />
                              {vehicle_error && (
                                <FormFeedback type="invalid">
                                  Vehicle Number Must Have 10 Character
                                </FormFeedback>
                              )}
                            </div>
                          }
                        </div>
                      </Col>
                   
                    </Row>
                    {(row_barcode.length > 0) &&
                      <Row className="hide">
                        <Label className="header-child">Add Bag Barcode *</Label>
                        <div style={{ display: "flex", flexWrap: "wrap" }}>
                          {row_barcode.map((item, index) => (
                            <Col lg={2} md={2} sm={4} key={index}>
                              <div className="mb-2" style={{ marginLeft: "3px" }}>
                                <Input
                                  min={0}
                                  value={item[0]}
                                  type="text"
                                  className="form-control-md"
                                  id="input"
                                  style={{ marginBottom: "15px" }}
                                  placeholder="Enter Barcode"
                                  onChange={(val) => {
                                    setbag_bq(val.target.value);
                                    item[0] = val.target.value;
                                  }}
                                  onBlur={() => {
                                    if (item[0].length >= 4 && item[0].startsWith("SSCL")) {
                                      check_order_barcode(item[0], index);
                                      check_barcode(item[0], index, "bag");  
                                    } else if ((item[0].length >= 4 && !item[0].startsWith("SSCL"))) {
                                      row_barcode[index] = ['']
                                      dispatch(setShowAlert(true));
                                      dispatch(
                                        setDataExist(`Invalid Barcode`)
                                      );
                                      dispatch(setAlertType("warning"));
                                    }
                                  }}
                                  
                                />
                              </div>
                            </Col>
                          ))}
                        </div>
                      </Row>
                    }

                    {(row_barcodebox.length > 0) &&
                      <Row className="hide">
                        <Label className="header-child">Add Box Barcode *</Label>
                        <div style={{ display: "flex", flexWrap: "wrap" }}>
                          {row_barcodebox.map((item, index) => (
                            <Col lg={2} md={2} sm={4} key={index}>
                              <div className="mb-2" style={{ marginLeft: "3px" }}>
                                <Input
                                  min={0}
                                  value={item[0]}
                                  type="text"
                                  className="form-control-md"
                                  id="input"
                                  style={{ marginBottom: "15px" }}
                                  placeholder="Enter Barcode"
                                  onChange={(val) => {
                                    setbox_bq(val.target.value);
                                    item[0] = val.target.value;
                                  }}
                                  onBlur={() => {
                                    if (old_barcodes.some((v) => v === item[0])) {                                    
                                      check_barcode(item[0], index, "box");
                                      dispatch(setShowAlert(true));
                                      dispatch(
                                        setDataExist(`Barcode Mached`)
                                      );
                                      dispatch(setAlertType("success"));
                                    } else {
                                      row_barcodebox[index] = ['']
                                      dispatch(setShowAlert(true));
                                      dispatch(
                                        setDataExist(`Invalid Barcode`)
                                      );
                                      dispatch(setAlertType("warning"));
                                    }
                                  }}
                                />
                              </div>
                            </Col>
                          ))}
                        </div>
                      </Row>
                    }
                  </CardBody>
                ) : null}
              </Card>
            </Col>
          </div>

          {/* Colader Services */}
          <div className="m-3">
            <Col lg={12}>
              <Card className="shadow bg-white rounded">
                <CardTitle className="mb-1 header">
                  <div className="header-text-icon header-text">
                    Docket Info
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                      }}
                    >
                      <AddAnotherOrder
                        data2={data2}
                        id_m={hub_no}
                        refresh2={refresh}
                        setrefresh2={setrefresh}
                        type={location_data?.state?.type ? location_data?.state?.type : ""}
                      />
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
                  </div>
                </CardTitle>
                {circle_btn1 ? (
                  <CardBody>
                    <EditManifestDataFormat Manifest_list={data} />
                  </CardBody>
                ) : null}
              </Card>
            </Col>
          </div>

          {/* Footer */}
          <div className="m-3">
            <Col lg={12}>
              <div className="mb-1 footer_btn">
                <Button type="submit" className="btn btn-info m-1 cu_btn">
                  Save
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
    </>
  );
};

export default EditHubDocket;
