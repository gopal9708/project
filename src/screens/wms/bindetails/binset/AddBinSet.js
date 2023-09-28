import React, { useState, useEffect, useLayoutEffect } from "react";
import "../../../../assets/scss/forms/form.scss";
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
  FormGroup
} from "reactstrap";
import { ServerAddress } from "../../../../constants/ServerAddress";
import toTitleCase from "../../../../lib/titleCase/TitleCase";
import { setToggle } from "../../../../store/parentFilter/ParentFilter";
import {
  setAlertType,
  setDataExist,
  setShowAlert,
} from "../../../../store/alert/Alert";
import NSearchInput from "../../../../components/formComponent/nsearchInput/NSearchInput";
import { Button } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import SearchInput from "../../../../components/formComponent/searchInput/SearchInput";

const AddBinSet = () => {

  const navigate = useNavigate();
  const location = useLocation();
  console.log("the location data ",location)
  const dispatch = useDispatch();

  const accessToken = useSelector((state) => state.authentication.access_token);
  const user_id = useSelector((state) => state.authentication.userdetails.id);
  const user = useSelector((state) => state.authentication.userdetails);

  const [binset_up, setbinset_up] = useState("");
  const [binset_id, setbinset_id] = useState("");


  //Size name-----
  const [bin_size_list, setbin_size_list] = useState([]);
  const [bin_size, setbin_size] = useState("");
  const [bin_size_id, setbin_size_id] = useState("");
  const [bin_size_page, setbin_size_page] = useState(1);
  const [bin_size_error, setbin_size_error] = useState(false);
  const [bin_size_search_item, setbin_size_search_item] = useState("");

  // Property name-----
  const [bin_property_list, setbin_property_list] = useState([]);
  const [bin_property, setbin_property] = useState("");
  const [bin_property_id, setbin_property_id] = useState("");
  const [bin_property_page, setbin_property_page] = useState(1);
  const [bin_property_error, setbin_property_error] = useState(false);
  const [bin_property_search_item, setbin_property_search_item] = useState("");

  const [is_updating, setis_updating] = useState(false);

  const [circle_btn, setcircle_btn] = useState(true);
  const toggle_circle = () => {
    setcircle_btn(!circle_btn);
  };


  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      set_name: binset_up.name || "",
    },

    validationSchema: Yup.object({
      set_name: Yup.string().required("Set Name is required"),
    }),

    // onSubmit: (values) => {
    //   isupdating ? updateCharge(values) : addCharge(values);
    // },
    onSubmit: (values) => {
      is_updating ? update_binset(values) : add_binset(values);
    },
  });




  // To get Bin property name-----
  const get_binProperty = () => {
    let temp = [];
    axios
      .get(
        ServerAddress +
        `wms/get_binproperty/?p=${1}&records=${10}&name=${[
          "",
        ]}&name_search=${1}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        // console.log("get bin property response==",response)

        let data = response.data.results
        for (let i = 0; i < data.length; i++) {
          temp.push([data[i].id, data[i].name]);
        }
        setbin_property_list(temp);
      })
      .catch((error) => {
        alert(`Error Occured While Getting Bin Property ${error}`);
      });
  };


  // To get Bin size name-----
  const get_binSize = () => {
    let temp = [];
    axios
      .get(
        ServerAddress +
        `wms/get_binsize/?p=${1}&records=${10}&name=${[
          "",
        ]}&name_search=${1}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        // console.log("get bin size response==", response)

        let data = response.data.results
        for (let i = 0; i < data.length; i++) {
          temp.push([data[i].id, data[i].name]);
        }
        setbin_size_list(temp);
      })
      .catch((error) => {
        alert(`Error Occured While Getting Bin Size ${error}`);
      });
  };


  const add_binset = (values) => {
    alert("add binset data-----")
    axios
      .post(
        ServerAddress + "wms/add_binset/",
        {
          name: values.set_name ? toTitleCase(values.set_name).toUpperCase() : "",
          bin_size: bin_size_id,
          bin_property: bin_property_id,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (response) {
        console.log("add_binset==", response.data)
        if (response.data.status === "success") {
          dispatch(setToggle(true));
          dispatch(setShowAlert(true));
          dispatch(
            setDataExist(
              `Bin Set Name "${toTitleCase(values.set_name)}" Added sucessfully.`
            )
          );
          dispatch(setAlertType("success"));
          navigate(-1);
        } else if (response.data === "duplicate") {
          dispatch(setShowAlert(true));
          dispatch(
            setDataExist(
              `Bin Set Name "${toTitleCase(values.set_name)}" already exists`
            )
          );
          dispatch(setAlertType("warning"));
        }
      })
      .catch((error) => {
        alert(`Error Happen While Posting Vehicle Dimension Data ${error}`);
      });
  };


  const update_binset = (values) => {
    alert("update_binset HISTORY called-----------");
    let fields_names = Object.entries({
      name: values.set_name ? toTitleCase(values.set_name).toUpperCase() : "",
      bin_size: bin_size_id,
      bin_property: bin_property_id,
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
      alert("UPDATE Binset CALLED------");
      axios
        .put(
          ServerAddress + "wms/update_binset/" + binset_id,
          {
            change_fields: change_fields,
            name: values.set_name ? toTitleCase(values.set_name).toUpperCase(): "",
            bin_size: bin_size_id,
            bin_property: bin_property_id,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then(function (response) {
          console.log("update_binset response", response.data)
          if (response.data.status === "success") {
            dispatch(setToggle(true));
            dispatch(setShowAlert(true));
            dispatch(setDataExist(`Bin Set Name# "${(values.set_name)}" Updated sucessfully`));
            dispatch(setAlertType("success"));
            navigate(-1);
          } else if (response.data === "duplicate") {
            dispatch(setShowAlert(true));
            dispatch(setDataExist(`Bin Set Name # "${(values.set_name)}" already exists`));
            dispatch(setAlertType("warning"));
          }
        })
        .catch(function () {
          alert("Error Error While Updateing Bin Set");
        });
    });
  };

  useEffect(() => {
    get_binProperty(); 
  }, []);

  useEffect(() => {
    get_binSize();
  }, []);

  useLayoutEffect(() => {
    try {
      let binset_loc = location.state.item;
      console.log("binset_loc====", binset_loc)
      setis_updating(true);
      setbinset_up(binset_loc);
      setbinset_id(binset_loc.id);

      setbin_size(binset_loc.bin_size_nm);
      setbin_size_id(binset_loc.bin_size);

      setbin_property(binset_loc.bin_property_nm);
      setbin_property_id(binset_loc.bin_property);

    } catch (error) { }
  }, [])

  return (
    <div >

      <div  >
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            validation.handleSubmit(e.values);
            return false;
          }}
        >
          {/* Coloader */}
          <div className="m-4">
            <div className=" mb-2 main-header">
              {is_updating ? "Update Charges" : "Add Bin Set"}{" "}
            </div>

            <Col lg={12}>

              <Card className="shadow bg-white rounded">
                <CardTitle className="mb-1 header">
                  <div className="header-text-icon header-text">
                    <div>Bin Set</div>

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
                        <div className="mb-3">
                          <Label className="header-child">Name*</Label>
                          <Input
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.set_name}
                            invalid={
                              validation.touched.set_name &&
                                validation.errors.set_name
                                ? true
                                : false
                            }
                            type="text"
                            name="set_name"
                            className="form-control-md"
                            id="input"
                            placeholder="Enter Set Name"
                          />
                          {validation.touched.set_name &&
                            validation.errors.set_name ? (
                            <FormFeedback type="invalid">
                              {validation.errors.set_name}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>

                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-2">
                          <Label className="header-child">Bin Size*</Label>
                          <SearchInput
                            data_list={bin_size_list}
                            setdata_list={setbin_size_list}
                            data_item_s={bin_size}
                            set_data_item_s={setbin_size}
                            set_id={setbin_size_id}
                            page={bin_size_page}
                            setpage={setbin_size_page}
                            error_message={"Please Select Size Name"}
                            error_s={bin_size_error}
                            setsearch_item={setbin_size_search_item}
                          />
                          {/* <NSearchInput
                            data_list={bin_size_list}
                            data_item_s={bin_size}
                            set_data_item_s={setbin_size}
                            show_search={false}
                            error_s={bin_size_error}
                            error_message={"Please Select Bin Size"}
                          /> */}
                        </div>
                      </Col>

                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-2">
                          <Label className="header-child">Bin Property*</Label>
                          <SearchInput
                            data_list={bin_property_list}
                            setdata_list={setbin_property_list}
                            data_item_s={bin_property}
                            set_data_item_s={setbin_property}
                            set_id={setbin_property_id}
                            page={bin_property_page}
                            setpage={setbin_property_page}
                            error_message={"Please Select Size Name"}
                            error_s={bin_property_error}
                            setsearch_item={setbin_property_search_item}
                          />
                          {/* <NSearchInput
                            data_list={bin_property_list}
                            data_item_s={bin_property}
                            set_data_item_s={setbin_property}
                            show_search={false}
                            error_s={bin_property_error}
                            error_message={"Please Select Bin Property"}
                          /> */}
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                ) : null}
              </Card>
            </Col>
          </div>

          {/*Button */}
          <div className=" m-4">
            <Col lg={12}>
              <div className="mb-1 footer_btn">
                <button
                  type="submit"
                  className={is_updating && (user.user_department_name === "ADMIN") ? "btn btn-info m-1" : !is_updating ? "btn btn-info m-1" : "btn btn-success m-1"}
                >
                  {is_updating && (user.user_department_name === "ADMIN" || user.is_superuser) ? "Update" : !is_updating ? "Save" : "Approved"}
                </button>


                <button
                  type="submit"
                  className="btn btn-info m-1"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </button>
              </div>
            </Col>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default AddBinSet