import React, { useState, useEffect, useLayoutEffect } from 'react';
import "../../../../assets/scss/forms/form.scss";
import { useFormik } from 'formik';
import * as Yup from "yup";
import { IconContext } from 'react-icons';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { MdAddCircleOutline, MdOutlineRemoveCircleOutline, MdRemoveCircleOutline } from 'react-icons/md';
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
import { ServerAddress } from '../../../../constants/ServerAddress';
import toTitleCase from '../../../../lib/titleCase/TitleCase';
import { setToggle } from '../../../../store/parentFilter/ParentFilter';
import {
  setAlertType,
  setDataExist,
  setShowAlert,
} from "../../../../store/alert/Alert";
import NSearchInput from '../../../../components/formComponent/nsearchInput/NSearchInput';
import { Button } from 'react-bootstrap';
// import Modal from 'reactstrap-bootstrap/Modal';


const AddBinProperty = () => {

  const accessToken = useSelector((state) => state.authentication.access_token);
  const user = useSelector((state) => state.authentication.userdetails);

  const [isupdating, setisupdating] = useState(false);
  const location_data = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [circle_btn, setcircle_btn] = useState(true);

  const location = useLocation();
  const [property_up, setproperty_up] = useState("");
  const [property_id, setproperty_id] = useState("");
  const [is_updating, setis_updating] = useState("");

  const toggle_circle = () => {
    setcircle_btn(!circle_btn);
  };


  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      bin_property: property_up.name || "",
    },

    validationSchema: Yup.object({
      bin_property: Yup.string().required("Bin Name is required"),
    }),

    onSubmit: (values) => {
      is_updating ? update_binProperty(values) : add_binProperty(values);
    },
  });

  const add_binProperty = (values) => {
    // alert("Add bin proprty called----")
    axios
      .post(
        ServerAddress + "wms/add_binproperty/",
        {
          name: values.bin_property ? toTitleCase(values.bin_property).toUpperCase() : "",
        }, 
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (response) {
        console.log("addBin Property response==", response.data)
      if (response.data.status === "success") {
        dispatch(setToggle(true));
        dispatch(setShowAlert(true));
        dispatch(
          setDataExist(
            `Bin Property "${toTitleCase(values.bin_property)}" Added sucessfully.`
          )
        );
        dispatch(setAlertType("success"));
        navigate(-1);
      } else if (response.data === "duplicate") {
        dispatch(setShowAlert(true));
        dispatch(
          setDataExist(
            `Bin Property "${toTitleCase(values.bin_property)}" already exists`
          )
        );
        dispatch(setAlertType("warning"));
      }
      })
      .catch((error) => {
        alert(`Error Happen while posting raches  Data ${error}`);
      });
  };

  const update_binProperty = (values) => {
    // alert("update_binproperty HISTORY called-----------");
    let fields_names = Object.entries({
      name: values.bin_property ? toTitleCase(values.bin_property).toUpperCase() : "",
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
      // alert("UPDATE binproperty CALLED------");
      axios
        .put(
           ServerAddress + "wms/update_binproperty/" + property_id,
          {
            change_fields: change_fields,
            name: values.bin_property ? toTitleCase(values.bin_property).toUpperCase() : "",
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then(function (response) {
          console.log("update_binproperty response", response.data)
          if (response.data.status === "success") {
            dispatch(setToggle(true));
            dispatch(setShowAlert(true));
            dispatch(setDataExist(`Bin Property  "${(values.bin_property)}" Updated sucessfully`));
            dispatch(setAlertType("success"));
            navigate(-1);
          } else if (response.data === "duplicate") {
            dispatch(setShowAlert(true));
            dispatch(setDataExist(`Bin Property  "${(values.bin_property)}" already exists`));
            dispatch(setAlertType("warning"));
          }
        })
        .catch(function () {
          alert("Error Error While Updateing binProperty");
        });
    });
  };

 

  useLayoutEffect(() => {
    try {
      let property_loc = location.state.item;
      console.log("property_loc", property_loc)
      setis_updating(true);
      setproperty_up(property_loc);
      setproperty_id(property_loc.id);
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
              {isupdating ? "Update Charges" : "Add Bin Property"}{" "}
            </div>

            <Col lg={12}>

              <Card className="shadow bg-white rounded">
                <CardTitle className="mb-1 header">
                  <div className="header-text-icon header-text">
                    <div>Bin property</div>

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
                      {/* <Col lg={4} md={6} sm={6}>
                        <div className="mb-3">
                          <Label className="header-child">Bin Name*</Label>
                          <Input
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.bin_property || ""}
                            invalid={
                              validation.touched.bin_property &&
                                validation.errors.bin_property
                                ? true
                                : false
                            }
                            type="text"
                            name="bin_property"
                            className="form-control-md"
                            id="input"
                            placeholder="Enter Bin Name"
                          />
                          {validation.touched.bin_property &&
                            validation.errors.bin_property ? (
                            <FormFeedback type="invalid">
                              {validation.errors.bin_property}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col> */}

                      {/* <Col lg={4} md={6} sm={6}>
                        <div className="mb-2">
                          <Label className="header-child">Bin Size*</Label>
                          <NSearchInput
                            data_list={bin_size_list}
                            data_item_s={bin_size}
                            set_data_item_s={setbin_size}
                            show_search={false}
                            error_s={bin_size_error}
                            error_message={"Please Select Bin Size"}
                          />
                        </div>
                      </Col> */}

                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-2">
                          <Label className="header-child">Bin Property*</Label>
                          {/* <NSearchInput
                            data_list={bin_property_list}
                            data_item_s={bin_property}
                            set_data_item_s={setbin_property}
                            show_search={false}
                            error_s={bin_property_error}
                            error_message={"Please Select Bin Property"}
                          /> */}
                          <Input
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.bin_property || ""}
                            invalid={
                              validation.touched.bin_property &&
                                validation.errors.bin_property
                                ? true
                                : false
                            }
                            type="text"
                            name="bin_property"
                            className="form-control-md"
                            id="input"
                            placeholder="Enter Bin Property"
                          />
                          {validation.touched.bin_property &&
                            validation.errors.bin_property ? (
                            <FormFeedback type="invalid">
                              {validation.errors.bin_property}
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

          {/*Button */}
          <div className=" m-4">
            <Col lg={12}>
              <div className="mb-1 footer_btn">
                <button
                  type="submit"
                  className={isupdating && (user.user_department_name === "ADMIN") ? "btn btn-info m-1" : !isupdating ? "btn btn-info m-1" : "btn btn-success m-1"}
                >
                  {isupdating && (user.user_department_name === "ADMIN" || user.is_superuser) ? "Update" : !isupdating ? "Save" : "Approved"}
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

export default AddBinProperty