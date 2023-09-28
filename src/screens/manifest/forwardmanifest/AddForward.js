/* eslint-disable */
import React, { useState, useEffect, useLayoutEffect } from "react";
import "../../../assets/scss/forms/form.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import Modal from "react-bootstrap/Modal";
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
} from "reactstrap";
import { MdDeleteForever, MdAdd } from "react-icons/md";
import { IconContext } from "react-icons";
import { MdAddCircleOutline, MdRemoveCircleOutline } from "react-icons/md";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "reactstrap";
import toTitleCase from "../../../lib/titleCase/TitleCase";
import SearchInput from "../../../components/formComponent/searchInput/SearchInput";
import NSearchInput from "../../../components/formComponent/nsearchInput/NSearchInput";
import { ServerAddress } from "../../../constants/ServerAddress";
import { BiTrash } from "react-icons/bi";
import {
  setAlertType,
  setDataExist,
  setShowAlert,
} from "../../../store/alert/Alert";
import { setToggle } from "../../../store/pagination/Pagination";
import EditManifestDataFormat from "../editManifest/editManifestOrders/EditManifestDataFormat";
import AddAnotherOrder from "../editManifest/AddAnotherOrder";
import ImgModal from "../../../components/crop/ImgModal";

const AddForward = (manifest) => {
  // console.log("manifest--yyy---", manifest)
  const user_id = useSelector((state) => state.authentication.userdetails.id);
  const user_branch = useSelector(
    (state) => state.authentication.userdetails.home_branch
  );
  const [show, setShow] = useState(false);
  const accessToken = useSelector((state) => state.authentication.access_token);
  const alert = useSelector((state) => state.alert.show_alert);
  const [data, setdata] = useState([]);
  const [data2, setdata2] = useState([])
  // const location= useLocation
  const success = useSelector((state) => state.alert.show_alert);
  const b_acess_token = useSelector((state) => state.eway_bill.business_access_token);
  const dispatch = useDispatch();
  const location_data = useLocation();
  // console.log("location_data-----", location_data);
  const navigate = useNavigate();
  const [manifest_data, setmanifest_data] = useState([])
  //Circle Toogle Btn
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
  const [circle_btn4, setcircle_btn4] = useState(true);
  const toggle_circle4 = () => {
    setcircle_btn4(!circle_btn4);
  };
  //used for tax slab 
  const [tax_slab_list, settax_slab_list] = useState([
    "0%",
    "9%",
    "18%",
    "27%",
  ]);
  const [tax_slab, settax_slab] = useState("18%");
  const [isTaxSlabDisabled, setIsTaxSlabDisabled] = useState(false);

  //  Coloader Mode
  const [coloader_mode_list, setcoloader_mode_list] = useState([
    // "Direct Awb",
    // "Air Console",
    // "By Road (Surface)",
    // "By Train",
    // "Direct Vehicle",
    // "Partload",
  ]);
  // console.log("coloader_mode_list-----", coloader_mode_list)
  const [refresh, setrefresh] = useState("false");
  const [coloader_selcted_m, setcoloader_selcted_m] = useState("");
  const [coloader_selected, setcoloader_selected] = useState("");
  const [search, setsearch] = useState("");
  const [page, setpage] = useState(1);
  const [coloader_loaded, setcoloader_loaded] = useState(false)
  const [coloader_count, setcoloader_count] = useState(1)

  const [manifest_no, setmanifest_no] = useState("");
  const [forward_branch, setforward_branch] = useState("");
  const [today, settoday] = useState("");

  const [coloader_list, setcoloader_list] = useState([]);
  const [coloader_id, setcoloader_id] = useState("");
  const [orgin, setorgin] = useState("");
  const [dest, setdest] = useState("");
  const [manifest_id, setmanifest_id] = useState();
  const [coloader_bottom, setcoloader_bottom] = useState(103)

  const [orders, setorders] = useState([])
  const [docket_weight, setdocket_weight] = useState("")

  //This state is used for date
  const [coloader_mode_error, setcoloader_mode_error] = useState(false);
  const [forwording_date_error, setforwording_date_error] = useState(false);

  const [order_active_btn, setorder_active_btn] = useState("first");

  //  State For Cropping In React Crop
  const [document, setdocument] = useState([]);

  //  State For Cropping In React Crop Ended

  // adding extra input fields in Packages
  const [length, setlength] = useState("");
  const [breadth, setbreadth] = useState("");
  const [height, setheight] = useState("");
  const [pieces, setpieces] = useState("");
  const [package_id_list, setpackage_id_list] = useState("");

  let dimension_list = [length, breadth, height, pieces];
  const [row, setrow] = useState([dimension_list]);
  // console.log("row-----------", row)

  // adding extra input fields in Order Images
  const [selectedFile, setSelectedFile] = useState("");

  let dimension_list1 = [selectedFile];
  const [row1, setrow1] = useState([dimension_list1]);
  // console.log("row1=====================", row1)
  const [row3, setrow3] = useState([[""]]);
  const [showModalOrder, setshowModalOrder] = useState({
    value: false,
    ind: "",
  });
  const [ord_id, setord_id] = useState(null)
  const [ord_data, setord_data] = useState("")
  const [showinv, setShowinv] = useState(false);

  const addorderimage = () => {
    setSelectedFile("");
    dimension_list1 = [""];
    setrow1([...row1, dimension_list1]);
    setrow3([...row3, [""]]);
  };

  const deleteimage = (item1) => {
    if (location_data.state !== null && item1[1] !== "") {
      setord_data(item1)
      setord_id(item1[1])
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

  // adding extra input fields in Invoice
  const [invoice_img, setinvoice_img] = useState("");
  const [invoice_no, setinvoice_no] = useState("");
  const [invoice_value, setinvoice_value] = useState("");

  let dimension_list2 = [invoice_img, today, invoice_no, invoice_value];
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

  const [ewb_no, setewb_no] = useState([])
  useEffect(() => {
    let m = data?.map(item => item.eway_bill_no).filter(Boolean);
    setewb_no(m)
  }, [data])

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
  // Validation
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      coloader_no: "",
      flight_name: "",
      flight_num: "",
      no_of_bags: manifest_data.bag_count || "",
      actual_weight: "",
      chargeable_weight: "",
      no_of_box: manifest_data.box_count || "",
      other_charges: "",
      tsp: "",
      rate: "",
      carrier_charges: "",

    },

    validationSchema: Yup.object({
      coloader_no: Yup.string().required("Coloader No is required"),
      // flight_name: Yup.string().required("Flight Name is required"),
      flight_num: Yup.string()
        .min(7, "Flight Number must be 7 Digit")
        .max(7, "Flight Number must be 7 Digit")
        .required("Flight Number is required"),
      // no_of_bags: Yup.string().required("Bags is required"),
      // no_of_box: Yup.string().required("Box is required"),
      chargeable_weight: Yup.string().required("Enter Chargable Weight"),
      actual_weight: Yup.string().required("Enter Actual Weight"),
    }),

    onSubmit: (values) => {
      console.log("tax slab values", tax_slab)
      if (docket_weight + 5 >= values.actual_weight) {
        updateManifest(values);
        // update_eway_b(values);
      }
      else {
        const result = window.confirm('Docket Weight Is Not Equal To Coloader Actual Weight Are you sure you want to proceed?');
        if (result) {
          updateManifest(values);
          // update_eway_b(values);
        }
      }
    },
  });
  const get_orderof_manifest = () => {
    axios
      .get(
        ServerAddress +
        `manifest/get_all_manifest_order/?manifest_no=${manifest_no}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        setdata(response.data[0].orders);
        setdata2(response.data[0].orders);
      })
      .catch((err) => {
        alert(`Error While Loading Client , ${err}`);
      });
  };
  useLayoutEffect(() => {
    manifest_no && get_orderof_manifest();
  }, [manifest_no, success, refresh]);

  const updateManifest = (values) => {
    let fields_name = Object.entries({
      airwaybill_no: values.coloader_no,
      bag_count: values.no_of_bags ? values.no_of_bags : 0,
      box_count: values.no_of_box ? values.no_of_box : 0,
      carrier_charges: values.carrier_charges ? values.carrier_charges : 0,
      carrier_name: values.flight_name ? toTitleCase(values.flight_name).toUpperCase() : '',
      carrier_no: values.flight_num ? toTitleCase(values.flight_num).toUpperCase() : '',
      chargeable_weight: values.chargeable_weight ? values.chargeable_weight : "",
      coloader_mode: coloader_selcted_m,
      coloader: coloader_id,
      coloader_name: coloader_selected,
      total_weight: values.actual_weight,
    });
    console.log("fields_name-------", fields_name)
    let change_fields = {};
    for (let j = 0; j < fields_name.length; j++) {
      const ele = fields_name[j];
      console.log("ele-----", ele)
      let prev = manifest.manifest[`${ele[0]}`];
      console.log("prev-----", prev)
      let new_v = ele[1];
      console.log("new_v-----", new_v)
      if (String(prev).toUpperCase() !== String(new_v).toUpperCase()) {
        change_fields[`${ele[0]}`] = new_v.toString().toUpperCase();
      }
    }
    console.log("change_fields----", change_fields)
    axios
      .put(
        ServerAddress + "manifest/update_manifest/" + manifest_id,
        {
          change_fields: change_fields,
          coloader_mode: coloader_selcted_m.toUpperCase(),
          coloader: coloader_id,
          airwaybill_no: toTitleCase(values.coloader_no).toUpperCase(),
          forwarded_at: today,
          bag_count: values.no_of_bags ? values.no_of_bags : 0,
          box_count: values.no_of_box ? values.no_of_box : 0,
          total_weight: values.actual_weight,
          manifest_no: manifest_no,
          chargeable_weight: values.chargeable_weight,
          coloader_name: (coloader_selected).toUpperCase(),
          carrier_name: values.flight_name ? toTitleCase(values.flight_name).toUpperCase() : null,
          carrier_no: toTitleCase(values.flight_num).toUpperCase(),
          is_forwarded: "True",
          forwarded_by: user_id,
          // open_box:open_box ? "True" :"False",
          // box_count:box_quantity,

          forwarded: "True",
          forwarded_branch: user_branch,
          modified_by: user_id,
          manifest_packages: row,
          manifest_image: row1,
          tsp: values.tsp ? values.tsp : 0,
          rate: values.rate ? values.rate : 0,
          carrier_charges: values.carrier_charges ? values.carrier_charges : 0,
          tax_slab: tax_slab,
          other_charges: values.other_charges ? values.other_charges : null,
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
          dispatch(setToggle(true));
          dispatch(setShowAlert(true));
          dispatch(
            setDataExist(`Manifest of  ${manifest_no} Forwarded sucessfully`)
          );
          dispatch(setAlertType("info"));
          setShow(false)
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
              `Commodity Name "${toTitleCase(
                values.commodity_name
              )}" already exists`
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
    if (manifest.manifest && show) {
      setmanifest_data(manifest.manifest)
      setorders(manifest.manifest.orders)
      setmanifest_no(manifest.manifest.manifest_no);
      setforward_branch(
        toTitleCase(manifest.manifest.from_branch_n)
      );
      setorgin(toTitleCase(manifest.manifest.orgin_branch_n));
      setdest(toTitleCase(manifest.manifest.destination_branch_n));
      setmanifest_id(manifest.manifest.id);

    }

  }, [show]);

  useEffect(() => {
    if (orders.length > 0) {
      const sum = orders.map((item) => item.actual_weight).reduce((accumulator, currentValue) => accumulator + currentValue);
      setdocket_weight(sum)
    }
  }, [orders])
  useEffect(() => {
    if (coloader_selcted_m === "Direct AWB") {
      settax_slab("18%");
      setIsTaxSlabDisabled(true);
    } else {
      setIsTaxSlabDisabled(false);
    }
  }, [coloader_selcted_m]);

  const get_coloader = () => {
    let coloader_lst = [];
    axios
      .get(
        ServerAddress +
        `master/get_coloader/?p=${page}&records=${10}&name_search=${search}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        if (response.data.results.length > 0) {
          if (response.data.next === null) {
            setcoloader_loaded(false);
          } else {
            setcoloader_loaded(true);
          }
          if (page == 1) {
            coloader_lst = response.data.results.map((v) => [
              v.id,
              toTitleCase(v.name),
            ]);
          } else {
            coloader_lst = [
              ...coloader_list,
              ...response.data.results.map((v) => [v.id, toTitleCase(v.name)]),
            ];
          }
          setcoloader_count(coloader_count + 2);
          setcoloader_list(coloader_lst);

        }

        else {
          setcoloader_list([]);
        }
      })
      .catch((err) => {
        alert(`Error While Loading Client , ${err}`);
      });
  };

  const getVendorService = (id) => {
    let temp = [];

    axios
      .get(ServerAddress + `master/get_vendorservice/?vendor_id=${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((resp) => {
        console.log("vendor res------", resp)

        for (let index = 0; index < resp.data.vendor_service.length; index++) {
          const data = resp.data.vendor_service[index];

          if (data.service_type === 'AIRWAY BILL') {
            temp.push('Direct AWB')
          }
          // else if (data.service_type === 'DIRECT VEHICLE') {
          //   temp.push('Direct Vehicle')
          // }
          else if (data.service_type === 'CONSOLE CONNECTION') {
            temp.push('Air Console')
          }
          // else if (data.service_type === 'PART LOAD VEHICLE') {
          //   temp.push('Part Load')
          // }
          // else if (data.service_mode === 'FORWARDING BY TRAIN') {
          //   temp.push('By Train')
          // }
          // else if (data.service_type === 'DIRECT VEHICLE' || data.service_type === 'KG WISE' || data.service_type === 'PART LOAD VEHICLE') {
          //   temp.push('By Road')
          // }

        }
        setcoloader_mode_list([...new Set(temp)])

      })
      .catch((err) => {
        alert(`Error Occur in Get vendor service, ${err}`);
      });
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
    settoday(`${year}-${month}-${added_date_time}T${hour}:${minutes}`);
  }, []);

  useLayoutEffect(() => {
    get_coloader();
  }, [search, page]);

  useEffect(() => {
    if (coloader_id !== "") {
      getVendorService(coloader_id)

    }
    setcoloader_selcted_m("")
  }, [coloader_id])

  //Modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSuccess = () => {
    // send_runsheet_data();
  };

  useEffect(() => {
    dispatch(setToggle(false));
  }, [alert])

  const user_l_state = useSelector((state) => state.authentication.userdetails.branch_location_state);
  const user_l_statecode = useSelector((state) => state.authentication.userdetails.branch_location_state_code);
  //   const update_eway_b = (values) => { 
  //     const dateString = '2023-04-16T16:45';
  // const date = new Date(dateString);
  // const day = String(date.getDate()).padStart(2, '0');
  // const month = String(date.getMonth() + 1).padStart(2, '0');
  // const year = date.getFullYear();
  // const formattedDate = `${day}/${month}/${year}`;
  //     axios
  //       .post(
  //         `https://dev.api.easywaybill.in/ezewb/v1/cewb/generateByEwbNos?gstin=${gstin_no}`,

  //         {

  //           "fromPlace":user_l_state,
  //           "fromState": user_l_statecode,
  //           "vehicleNo": null,
  //           "transMode": "3",
  //           "transDocNo": values.coloader_no,
  //           "transDocDate": formattedDate, 
  //           "ewbNos": ewb_no,
  //           "userGstin": gstin_no,
  //          },

  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${b_acess_token}`,
  //           },


  //           }

  //       )
  //       .then(function (response) {

  //         console.log("response=======eway bill detail", response);
  //         if (response.data.status === 1) {
  //           dispatch(setToggle(true));
  //           dispatch(setShowAlert(true));
  //           dispatch(
  //             setDataExist(`Updated  ${ewb_no}sucessfully`)
  //           )
  //           dispatch(setAlertType("success"));
  //             setShow(false)
  //             updateManifest(values)
  //         }else{
  //           dispatch(setToggle(true));
  //           dispatch(setShowAlert(true));
  //           dispatch(
  //             setDataExist(`Updated  ${ewb_no} Failed `)
  //           )
  //           dispatch(setAlertType("danger"));
  //             setShow(false)
  //             updateManifest(values)
  //         }

  //       })
  //       .catch((error) => {
  //         console.log("eroorrrrrrrr",error)
  //         dispatch(setToggle(true));
  //         dispatch(setShowAlert(true));
  //         dispatch(
  //           setDataExist(`Updated  ${ewb_no} Failed `)
  //         )
  //         dispatch(setAlertType("danger"));
  //           setShow(false)
  //           updateManifest(values)

  //       })
  //   };
  const showFun = () => {
    setcoloader_selected("")
    setcoloader_selcted_m("")
    setcoloader_mode_list([])
    setShow(true)
  }

  return (
    <>
      <Button size="sm" outline color="primary" type="button" onClick={() => showFun()}>
        Forward
      </Button>

      <Modal show={showinv} onHide={() => setShowinv(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body> "Do you Want to delete this Manifest image.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowinv(false)}>
            No
          </Button>
          {/* <Button variant="danger" onClick={() => action()}>
            Yes
          </Button> */}
        </Modal.Footer>
      </Modal>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="custom-modal"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Create Manifest
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form
            onSubmit={(e) => {
              e.preventDefault();
              if (coloader_selcted_m == "") {
                setcoloader_mode_error(true);
              }
              if (today == "") {
                setforwording_date_error(true);
              }
              validation.handleSubmit(e.values);
              return false;
            }}
          >
            {/* Branch Info */}
            <div className="m-3">
              <Col lg={12}>
                <Card className="shadow bg-white rounded">
                  <CardTitle className="mb-1 header">
                    <div className="header-text-icon header-text">
                      Manifest Info :
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
                        <Col lg={3} md={3} sm={6}>
                          <div className="mb-2">
                            <Label className="header-child">Manifest No* :</Label>
                            <Input id="input" disabled value={manifest_no} />
                          </div>
                        </Col>
                        <Col lg={3} md={3} sm={6}>
                          <div className="mb-2">
                            <Label className="header-child">
                              Forward Branch* :
                            </Label>
                            <Input id="input" disabled value={forward_branch} />
                          </div>
                        </Col>

                        <Col lg={3} md={3} sm={6}>
                          <div className="mb-2">
                            <Label className="header-child"> Orgin:</Label>
                            <Input id="input" disabled value={orgin} />
                          </div>
                        </Col>

                        <Col lg={3} md={3} sm={6}>
                          <div className="mb-2">
                            <Label className="header-child">Destination* :</Label>
                            <Input id="input" disabled value={dest} />
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  ) : null}
                </Card>
              </Col>
            </div>

            {/* Colader info */}
            <div className="m-3">
              <Col lg={12}>
                <Card className="shadow bg-white rounded">
                  <CardTitle className="mb-1 header">
                    <div className="header-text-icon header-text">
                      Coloader Info
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
                        <Col lg={3} md={3} sm={6}>
                          <div className="mb-2">
                            <Label className="header-child">
                              Select Coloader* :
                            </Label>
                            <SearchInput
                              data_list={coloader_list}
                              setdata_list={setcoloader_list}
                              data_item_s={coloader_selected}
                              set_data_item_s={setcoloader_selected}
                              set_id={setcoloader_id}
                              page={page}
                              setpage={setpage}
                              error_message={"Please Select Colader"}
                              search_item={search}
                              setsearch_item={setsearch}
                              loaded={coloader_loaded}
                              count={coloader_count}
                              bottom={coloader_bottom}
                              setbottom={setcoloader_bottom}
                            />
                          </div>
                        </Col>


                        <Col lg={3} md={3} sm={6}>
                          <div className="mb-2">
                            <Label className="header-child">
                              Coloader Mode* :
                            </Label>
                            <span onClick={() => setby_pincode(false)}>
                              <NSearchInput
                                data_list={coloader_mode_list}
                                data_item_s={coloader_selcted_m}
                                set_data_item_s={setcoloader_selcted_m}
                                show_search={false}
                                error_message={"Please Select Coloader Mode"}
                                error_s={coloader_mode_error}
                              />
                            </span>
                          </div>
                        </Col>

                        <Col lg={3} md={3} sm={6}>
                          <div className="mb-2">
                            <Label className="header-child">
                              Co-loader/Airway bill no:
                            </Label>
                            <Input
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.coloader_no || ""}
                              invalid={
                                validation.touched.coloader_no &&
                                  validation.errors.coloader_no
                                  ? true
                                  : false
                              }
                              type="text"
                              className="form-control-md"
                              id="input"
                              name="coloader_no"
                              placeholder="Enter Coloader No:"
                            />
                            {validation.touched.coloader_no &&
                              validation.errors.coloader_no ? (
                              <FormFeedback type="invalid">
                                {validation.errors.coloader_no}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </Col>
                        {(coloader_selcted_m === "Direct AWB" || coloader_selcted_m === "Air Console") &&
                          <>
                            <Col lg={3} md={3} sm={6}>
                              <div className="mb-2">
                                <Label className="header-child">
                                  Flight Name:
                                </Label>
                                <Input
                                  onChange={validation.handleChange}
                                  onBlur={validation.handleBlur}
                                  value={validation.values.flight_name}
                                  invalid={
                                    validation.touched.flight_name &&
                                      validation.errors.flight_name
                                      ? true
                                      : false
                                  }
                                  type="text"
                                  className="form-control-md"
                                  id="input"
                                  name="flight_name"
                                  placeholder="Enter Flight Name"
                                />
                              </div>
                            </Col>

                            <Col lg={3} md={3} sm={6}>
                              <div className="mb-2">
                                <Label className="header-child">
                                  Flight Number *:
                                </Label>
                                <Input
                                  onChange={validation.handleChange}
                                  onBlur={validation.handleBlur}
                                  value={validation.values.flight_num}
                                  invalid={
                                    validation.touched.flight_num &&
                                      validation.errors.flight_num
                                      ? true
                                      : false
                                  }
                                  type="text"
                                  maxLength={7}
                                  className="form-control-md"
                                  id="input"
                                  name="flight_num"
                                  placeholder="Enter Flight Number"
                                />
                                {validation.touched.flight_num &&
                                  validation.errors.flight_num ? (
                                  <FormFeedback type="invalid">
                                    {validation.errors.flight_num}
                                  </FormFeedback>
                                ) : null}
                              </div>
                            </Col>
                          </>
                        }
                        <Col lg={3} md={3} sm={6}>
                          <div className="mb-2">
                            <Label className="header-child">
                              Forwarding Date* :
                            </Label>
                            <Input
                              type="datetime-local"
                              className="form-control d-block form-control-md "
                              id="input"
                              value={today}
                              onChange={(val) => {
                                settoday(val.target.value);
                              }}
                              onBlur={() => {
                                setforwording_date_error(true);
                              }}
                              invalid={today == "" && forwording_date_error}
                            />
                            {today == "" && forwording_date_error ? (
                              <FormFeedback type="invalid">
                                Date is required
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

            {/*Package info*/}
            <div className="m-3">
              <Col lg={12}>
                <Card className="shadow bg-white rounded">
                  <CardTitle className="mb-1 header">
                    <div className="header-text-icon header-text">
                      Package Info :
                      <IconContext.Provider
                        value={{
                          className: "header-add-icon",
                        }}
                      >
                        <div onClick={toggle_circle2}>
                          {circle_btn2 ? (
                            <MdRemoveCircleOutline />
                          ) : (
                            <MdAddCircleOutline />
                          )}
                        </div>
                      </IconContext.Provider>
                    </div>
                  </CardTitle>
                  {circle_btn2 ? (
                    <CardBody>
                      <Row>
                        <Col lg={3} md={3} sm={6}>
                          <div className="mb-2">
                            <Label className="header-child">No of Bags* :</Label>
                            <Input
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.no_of_bags || ""}
                              invalid={
                                validation.touched.no_of_bags &&
                                  validation.errors.no_of_bags
                                  ? true
                                  : false
                              }
                              type="number"
                              min={0}
                              className="form-control-md"
                              id="input"
                              name="no_of_bags"
                              placeholder="Enter Total  Bags"
                              disabled
                            />
                            {/* {validation.touched.no_of_bags &&
                              validation.errors.no_of_bags ? (
                              <FormFeedback type="invalid">
                                {validation.errors.no_of_bags}
                              </FormFeedback>
                            ) : null} */}
                          </div>
                        </Col>
                        <Col lg={3} md={3} sm={6}>
                          <div className="mb-2">
                            <Label className="header-child">No of Box* :</Label>
                            <Input
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.no_of_box || ""}
                              invalid={
                                validation.touched.no_of_box &&
                                  validation.errors.no_of_box
                                  ? true
                                  : false
                              }
                              type="number"
                              min={0}
                              className="form-control-md"
                              id="input"
                              name="no_of_box"
                              placeholder="Enter Total Box"
                              disabled
                            />
                            {/* {validation.touched.no_of_box &&
                              validation.errors.no_of_box ? (
                              <FormFeedback type="invalid">
                                {validation.errors.no_of_box}
                              </FormFeedback>
                            ) : null} */}
                          </div>
                        </Col>
                        <Col lg={3} md={3} sm={6}>
                          <div className="mb-2">
                            <Label className="header-child">
                              Docket Weight* :
                            </Label>
                            <Input
                              id="input"
                              disabled
                              placeholder="Docket Weight"
                              value={docket_weight}
                            />
                          </div>
                        </Col>
                        <Col lg={3} md={3} sm={6}>
                          <div className="mb-2">
                            <Label className="header-child">TSP :</Label>
                            <Input
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.tsp || ""}
                              type="number"
                              min={0}
                              className="form-control-md"
                              id="input"
                              name="tsp"
                              placeholder="Enter TSP"
                            />
                          </div>
                        </Col>

                        <Col lg={3} md={3} sm={6}>
                          <div className="mb-2">
                            <Label className="header-child">
                              Coloader Actual Weight* :
                            </Label>
                            <Input
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.actual_weight || ""}
                              invalid={
                                validation.touched.actual_weight &&
                                  validation.errors.actual_weight
                                  ? true
                                  : false
                              }
                              type="number"
                              min={0}
                              className="form-control-md"
                              id="input"
                              name="actual_weight"
                              placeholder="Enter Manifest Weight"
                            />
                            <FormFeedback type="invalid">
                              Please Enter Actual Weight
                            </FormFeedback>
                          </div>
                        </Col>

                        <Col lg={3} md={3} sm={6}>
                          <div className="mb-2">
                            <Label className="header-child">
                              Coloader Chargeable Weight* :
                            </Label>
                            <Input
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.chargeable_weight || ""}
                              invalid={
                                validation.touched.chargeable_weight &&
                                  validation.errors.chargeable_weight
                                  ? true
                                  : false
                              }
                              type="number"
                              min={0}
                              className="form-control-md"
                              id="input"
                              name="chargeable_weight"
                              placeholder="Enter Chargeable Weight"
                            />
                            <FormFeedback type="invalid">
                              Please Enter Chargeable Weight
                            </FormFeedback>
                          </div>
                        </Col>

                        <Col lg={3} md={3} sm={6}>
                          <div className="mb-2">
                            <Label className="header-child">Rate :</Label>
                            <Input
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.rate || ""}
                              type="number"
                              min={0}
                              className="form-control-md"
                              id="input"
                              name="rate"
                              placeholder="Enter Rate"
                            />
                          </div>
                        </Col>
                        <Col lg={3} md={3} sm={6}>
                          <div className="mb-2">
                            <Label className="header-child">
                              Other Charges :
                            </Label>
                            <Input
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.other_charges || ""}
                              type="number"
                              min={0}
                              className="form-control-md"
                              id="input"
                              name="other_charges"
                              placeholder="Enter Other Charges"
                            />
                          </div>
                        </Col>
                        <Col lg={3} md={3} sm={6}>
                          <div className="mb-2">
                            <Label className="header-child">
                              Carrier Charges
                            </Label>
                            <Input
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.carrier_charges || ""}
                              type="number"
                              min={0}
                              className="form-control-md"
                              id="input"
                              name="carrier_charges"
                              placeholder="Enter Carrier Charges"
                            />
                          </div>
                        </Col>

                        <Col lg={3} md={3} sm={6}>
                          <div className="mb-2">
                            <Label className="header-child">Tax Slab</Label>
                            <NSearchInput
                              data_list={tax_slab_list}
                              data_item_s={tax_slab}
                              set_data_item_s={settax_slab}
                              show_search={false}
                              disable_me={isTaxSlabDisabled}
                            />
                          </div>
                        </Col>
                        {/* <Col lg={3} md={3} sm={6}>
                          <div className="mb-2">
                            <Label className="header-child">Open Box</Label>
                            {
                              open_box ? 
                              <FiCheckSquare onClick={()=>{
                                setopen_box(!open_box)
                              }} />:
                              <FiSquare  onClick={()=>{
                                setopen_box(!open_box);
                               }}/>
                            }
                          
                          </div>
                        </Col>
                        {open_box &&
                        
                        <Col lg={3} md={3} sm={6}>
                          <div className="mb-2">
                            <Label className="header-child">Box Quantity</Label>
                            <Input
                              id="input"
                              placeholder="Enter Box Quantity"
                              value={box_quantity}
                              onChange={(e)=>{
                                setbox_quantity(e.target.value);
                              }}
                            />
                          </div>
                        </Col>
                        }
                         */}
                      </Row>
                    </CardBody>
                  ) : null}
                </Card>
              </Col>
            </div>
            {/* Packages */}
            {/* Docket Info */}

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
                          id_m={manifest_no}
                          refresh2={refresh}
                          setrefresh2={setrefresh}
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
                          Manifest Dimesions
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
                          Forwarding Images
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
                                console.log("val------------", val)
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
                                if (row1[row1.length - 1][0]) {
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
                              Add Another Manifest Images
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
            {/* Footer */}
            <div className="m-3">
              <Col lg={12}>
                <div className="mb-1 footer_btn">
                  <Button type="submit" className="btn btn-info m-1 cu_btn">
                    Forward
                  </Button>

                  <Button
                    type="button"
                    className="btn btn-info m-1 cu_btn"
                    onClick={() => setShow(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </Col>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddForward;
