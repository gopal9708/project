import React, { useState, useEffect, useLayoutEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IconContext } from "react-icons";
import { MdAddCircleOutline, MdRemoveCircleOutline } from "react-icons/md";
import axios from "axios";
import { BiTrash } from "react-icons/bi";
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
import { MdDeleteForever, MdAdd } from "react-icons/md";
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
import NSearchInput from "../../../components/formComponent/nsearchInput/NSearchInput";
import EditManifestDataFormat from "../editManifest/editManifestOrders/EditManifestDataFormat";
import AddAnotherOrder from "../editManifest/AddAnotherOrder";
import ImgModal from "../../../components/crop/ImgModal";
const UpdateManifest = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authentication.userdetails);
  const alert = useSelector((state) => state.alert.show_alert);
  const accessToken = useSelector((state) => state.authentication.access_token);
  
  // const location= useLocation
  const success = useSelector((state) => state.alert.show_alert);

  const user_id = useSelector((state) => state.authentication.userdetails.id);
  const user_branch = useSelector(
    (state) => state.authentication.userdetails.home_branch
  );
  const navigate = useNavigate();
  const location = useLocation();
  // console.log("location---------", location)
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
  //////////////Manifest///////////////////
  const [manifest_no, setmanifest_no] = useState("")
  const [manifest_data, setmanifest_data] = useState([])
  const [data, setdata] = useState([])
  const [order_active_btn, setorder_active_btn] = useState("first");

  const [isupdating, setisupdating] = useState(false);
  const [origin_branch, setorigin_branch] = useState("")
  const [destination_branch, setdestination_branch] = useState("")
  const [destination_city, setdestination_city] = useState("")

  const [refresh, setrefresh] = useState("false");
  const [coloader_mode_list, setcoloader_mode_list] = useState([
  ]);
  const [coloader_selcted_m, setcoloader_selcted_m] = useState("");
  const [coloader_selected, setcoloader_selected] = useState("");
  const [coloader_id, setcoloader_id] = useState("");
  const [search, setsearch] = useState("");
  const [page, setpage] = useState(1);
  const [today, settoday] = useState("");
  // console.log("today-----=========", today)
  const [coloader_mode_error, setcoloader_mode_error] = useState(false);
  const [forwording_date_error, setforwording_date_error] = useState(false);
  const [docket_weight, setdocket_weight] = useState("")
  const [manifest_id, setmanifest_id] = useState();
  const [coloader_list, setcoloader_list] = useState([]);

  //used for tax slab 
  const [tax_slab_list, settax_slab_list] = useState([
    "0%",
    "9%",
    "18%",
    "27%",
  ]);
  const [tax_slab, settax_slab] = useState("0%");
  const [isTaxSlabDisabled, setIsTaxSlabDisabled] = useState(false);

  //  State For Cropping In React Crop
  const [document, setdocument] = useState([]);

  // adding extra input fields in Packages
  const [length, setlength] = useState("");
  const [breadth, setbreadth] = useState("");
  const [height, setheight] = useState("");
  const [pieces, setpieces] = useState("");
  const [package_id_list, setpackage_id_list] = useState("");
  const [packages_id, setpackages_id] = useState([]);
  const [deleted_packages_id, setdeleted_packages_id] = useState([]);
  // console.log("deleted_packages_id----", deleted_packages_id)
  let dimension_list = [length, breadth, height, pieces];
  const [row, setrow] = useState([dimension_list]);
  // console.log("row-----------", row)
  // adding extra input fields in Order Images
  const [selectedFile, setSelectedFile] = useState("");

  let dimension_list1 = [selectedFile];
  const [row1, setrow1] = useState([dimension_list1]);
  // console.log("row1----", row1)
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
// console.log("ord_id----", ord_id)
// console.log("ord_data----", ord_data)
  const deleteimage = (item1) => {
    // console.log("Deleted item1======", item1)
    if (location.state !== null && item1[1] !== "") {
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
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      coloader_no: manifest_data.airwaybill_no || "",
      flight_num: toTitleCase(manifest_data.carrier_no) || "",
      flight_name: toTitleCase(manifest_data.carrier_name) || "",
      no_of_bags: manifest_data.bag_count || "",
      actual_weight: manifest_data.total_weight || "",
      chargeable_weight: manifest_data.chargeable_weight || "",
      no_of_box: manifest_data.box_count || "",
      other_charges: manifest_data.other_charges || "",
      tsp: manifest_data.tsp || "",
      rate: manifest_data.rate || "",
      carrier_charges: manifest_data.carrier_charges || "",
    },

    validationSchema: Yup.object({
      coloader_no: Yup.string().required("Coloader No is required"),
      flight_num: Yup.string().required("Flight Name is required"),
      actual_weight: Yup.string().required("Enter Manifest Weight"),
      chargeable_weight: Yup.string().required("Enter Chargable Weight"),
      actual_weight: Yup.string().required("Enter Actual Weight"),
    }),

    onSubmit: (values) => {
      // if (docket_weight + 5 >= values.actual_weight) {
      //   updateManifest(values);
      // }
      // else {
      //   const result = window.confirm('Docket Weight Is Not Equal To Coloader Actual Weight Are you sure you want to proceed?');
      //   if (result) {
      updateManifest(values);
      //   }
      // }
    },
  });
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

  const getVendorService = (id) => {
    let temp = [];

    axios
      .get(ServerAddress + `master/get_vendorservice/?vendor_id=${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((resp) => {
        // console.log("vendor res------", resp)

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
  useLayoutEffect(() => {
    get_coloader();
  }, [search, page]);

  useEffect(() => {
    if (coloader_id !== "") {
      getVendorService(coloader_id)

    }
  }, [coloader_id])
  useEffect(() => {
    try {
      let data = location.state.manifest
      setmanifest_data(location.state.manifest);
      setmanifest_id(data.id)
      setcoloader_selcted_m(toTitleCase(data.coloader_mode))
      setmanifest_no(data.manifest_no)
      setdestination_branch(toTitleCase(data.to_branch_n))
      setorigin_branch(toTitleCase(data.from_branch_n))
      setdestination_city(toTitleCase(data.destination_branch_n))
      setcoloader_selected(toTitleCase(data.coloader_name))
      setcoloader_id(data.coloader)
      // settoday(data.forwarded_at)

      // let a=  2023-04-11T11:26:47.268447+05:30
      let a = data.forwarded_at
      let b = a.split("+")[0]
      settoday(b)
    } catch (error) { }
  }, []);

  useEffect(() => {
    let temp = []
    let temp_list = []
    if (manifest_data?.images?.length > 0) {
      temp = manifest_data.images;
      for (let index = 0; index < temp.length; index++) {
        temp_list.push([
          temp[index].manifest_image,
          temp[index].id,
        ]);
      }
      // console.log("temp_list====", temp_list)
      setrow1(temp_list);
    }

  }, [manifest_data])


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
      coloader_name: coloader_selected,
      coloader: coloader_id,
      total_weight: values.actual_weight,
    });
    // console.log("fields_name-------", fields_name)
    let change_fields = {};
    for (let j = 0; j < fields_name.length; j++) {
      const ele = fields_name[j];
      // console.log("ele-----", ele)
      let prev = manifest_data[`${ele[0]}`];
      // console.log("prev-----", prev)
      let new_v = ele[1];
      // console.log("new_v-----", new_v)
      if (String(prev).toUpperCase() !== String(new_v).toUpperCase()) {
        change_fields[`${ele[0]}`] = new_v.toString().toUpperCase();
      }
    }
    // console.log("change_fields----", change_fields)
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
          chargeable_weight: values.chargeable_weight ? values.chargeable_weight : null,
          coloader_name: (coloader_selected).toUpperCase(),
          carrier_name: values.flight_name ? toTitleCase(values.flight_name).toUpperCase() : null,
          carrier_no: values.flight_num ? toTitleCase(values.flight_num).toUpperCase() : null,
          carrier_charges: values.carrier_charges ? values.carrier_charges : 0,
          tsp: values.tsp ? values.tsp : 0,
          rate: values.rate ? values.rate : 0,
          tax_slab: tax_slab,
          other_charges: values.other_charges ? values.other_charges : null,
          departed: "False",
          forwarded: "False",
          update: "True",
          forwarded_by: user_id,
          // open_box:open_box ? "True" :"False",
          // box_count:box_quantity,
          is_scanned: true,
          is_update: "True",
          forwarded_branch: user_branch,
          modified_by: user_id,
          manifest_packages: row,
          manifest_image: row1,
          deleted_packages: deleted_packages_id,

          cm_transit_status: status_toggle === true ? cm_current_status : "",
          cm_current_status: cm_current_status.toUpperCase(),
          cm_remarks: toTitleCase(message).toUpperCase(),
        },

        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (response) {
        // console.log("response-----", response.data)
        if (response.data.status === "success") {
          dispatch(setToggle(true));
          dispatch(setShowAlert(true));
          dispatch(
            setDataExist(`Manifest of  ${manifest_no} Updated sucessfully`)
          );
          dispatch(setAlertType("info"));
          navigate(-1)
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
                // console.log("ImageResssssssssssssssssssss", res.data);
                // successMSg();
              })
              .catch((err) => {
                console.log("ImaeErrrrrrrrrrrrrrrrrrr", err);
              });
          } else {
            // console.log("Manifest created without image");
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

  const update_manifeststatus = (id) => {
    axios
      .put(
        ServerAddress + "manifest/reject_manifest/" + id,
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
          navigate(-1);
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
      update_manifeststatus(manifest_data.id);
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
      })
      .catch((err) => {
        alert(`Error While Loading Client , ${err}`);
      });
  };
  useLayoutEffect(() => {
    manifest_no && get_orderof_manifest();
  }, [manifest_no, success, refresh]);

  useEffect(() => {
    if (location.state.manifest.packages.length !== 0) {
      let data = location.state.manifest.packages
      // console.log("daat88888888", data)
      let temp_list = [];
      let temp_list2 = [];
      for (let index = 0; index < data.length; index++) {
        temp_list.push([
          data[index].manifest_length,
          data[index].manifest_breadth,
          data[index].manifest_height,
          data[index].manifest_pieces,
          data[index].id,
        ]);
        temp_list2.push(data[index].id);
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
  }, [location])

  useEffect(() => {
    if (package_id_list !== "") {
      let id_list = packages_id.filter(
        (p) => package_id_list.indexOf(p) === -1
      );
      setdeleted_packages_id(id_list);
    }
  }, [package_id_list, packages_id]);

  useEffect(() => {
    if (coloader_selcted_m === "Direct AWB") {
      settax_slab("18%");
      setIsTaxSlabDisabled(true);
    } else {
      setIsTaxSlabDisabled(false);
    }
  }, [coloader_selcted_m]);

  const deleteManifestImage = (id, item1) => {
    axios
      .delete(ServerAddress + `manifest/delete_manifest_images/${id}`, {
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
          // getOrderImages();
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.warn("deleteManifestImage--", err)
      });
  };


  const action = () => {
    deleteManifestImage(ord_id, ord_data)
  }
  return (
    <div>

      <Modal show={showinv} onHide={() => setShowinv(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body> "Do you Want to delete this Manifest image.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowinv(false)}>
            No
          </Button>
          <Button variant="danger" onClick={() => action()}>
            Yes
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
      {/* For Checker Maker */}
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          validation.handleSubmit(e.values);
          return false;
        }}
      >
        {/* Manifest */}
        <div className="mt-3">
          <PageTitle page="Update Manifest" />
          <Title
            title="Update Manifest"
            parent_title="Manifest"
          />
        </div>
        <div className="m-3">
          {/* //Added For History */}

          <Col lg={12}>
            <Card className="shadow bg-white rounded">
              <CardTitle className="mb-1 header">
                <div className="header-text-icon header-text">
                  <div>Manifest Info :</div>
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
                    <Col lg={3} md={6} sm={6}>
                      <div className="mb-3">
                        <Label className="header-child">Manifest No.*</Label>
                        <Input
                          value={manifest_no}
                          type="text"
                          name="manifest_no"
                          className="form-control-md"
                          id="input"
                          disabled
                        />
                      </div>
                    </Col>
                    <Col lg={3} md={6} sm={6}>
                      <div className="mb-3">
                        <Label className="header-child">Origin Branch*</Label>
                        <Input
                          value={origin_branch}
                          type="text"
                          name="origin_branch"
                          className="form-control-md"
                          id="input"
                          disabled
                        />
                      </div>
                    </Col>
                    <Col lg={3} md={6} sm={6}>
                      <div className="mb-3">
                        <Label className="header-child">Destination Branch*</Label>
                        <Input
                          value={destination_branch}
                          type="text"
                          name="destination_branch"
                          className="form-control-md"
                          id="input"
                          disabled
                        />
                      </div>
                    </Col>
                    <Col lg={3} md={3} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">Destination City* :</Label>
                        <Input id="input" disabled value={destination_city} />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              ) : null}
            </Card>
          </Col>
        </div>

        {/* Coloader info */}
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
                        />
                      </div>
                    </Col>


                    <Col lg={3} md={3} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">
                          Coloader Mode* :
                        </Label>
                        <span>
                          {/* <span onClick={() => setby_pincode(false)}> */}
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
                          Co-loader No / Airway bill no* :
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
                              Flight Name :
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
                              name="flight_num"
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
                          invalid={today === "" && forwording_date_error}
                        />
                        {today === "" && forwording_date_error ? (
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
                        <Label className="header-child">No of Bags :</Label>
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
                        />
                      </div>
                    </Col>
                    <Col lg={3} md={3} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">No of Box :</Label>
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
                        />
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
                          placeholder="Enter Manifest Weight"
                        />
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
                      data2={data}
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
                                // onFocus={() => {
                                //   setclicked(true);
                                // }}
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

        {/*Button */}
        <div className="m-3">
          <Col lg={12}>
            <div className="mb-1 footer_btn">
              <Button
                type="submit"
                className={
                  (user.user_department_name + " " + user.designation_name ===
                    "DATA ENTRY OPERATOR" ||
                    user.user_department_name +
                    " " +
                    user.designation_name ===
                    "CUSTOMER SERVICE EXECUTIVE")
                    ? "btn btn-info m-1"
                    : "btn btn-success m-1"
                }
              >
                {
                  (user.user_department_name + " " + user.designation_name ===
                    "DATA ENTRY OPERATOR" ||
                    user.user_department_name + " " + user.designation_name ===
                    "CUSTOMER SERVICE EXECUTIVE" ||
                    user.is_superuser)
                    ? "Update" : "Approved"}
              </Button>

              {
                user.user_department_name + " " + user.designation_name !==
                "DATA ENTRY OPERATOR" &&
                user.user_department_name + " " + user.designation_name !==
                "CUSTOMER SERVICE EXECUTIVE" &&
                !user.is_superuser &&
                (
                  <button
                    type="button"
                    className="btn btn-danger m-1"
                    onClick={handleShow}
                  >
                    Rejected
                  </button>
                )
              }
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
export default UpdateManifest;
