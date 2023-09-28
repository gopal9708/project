import React, { useState, useLayoutEffect } from "react";
import { MdAddCircleOutline, MdRemoveCircleOutline } from "react-icons/md";
import {
  Col,
  Card,
  CardTitle,
  CardBody,
  Label,
  Form,
  Row,
  Input,
  FormFeedback,
} from "reactstrap";
import PageTitle from "../../../../components/pageTitle/PageTitle";
import Title from "../../../../components/title/Title";
import { IconContext } from "react-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik"; 
import * as Yup from "yup";
import SearchInput from "../../../../components/formComponent/searchInput/SearchInput";
import NSearchInput from "../../../../components/formComponent/nsearchInput/NSearchInput";
import axios from "axios";
import { ServerAddress } from "../../../../constants/ServerAddress";
import { useSelector } from "react-redux";
import { setAlertType, setDataExist, setShowAlert } from "../../../../store/alert/Alert";
import { useDispatch } from "react-redux";
import { setToggle } from "../../../../store/parentFilter/ParentFilter";
import toTitleCase from "../../../../lib/titleCase/TitleCase";

const AddBinSize = () => {


  const accessToken = useSelector((state) => state.authentication.access_token);
  const search = useSelector((state) => state.searchbar.search_item);
   

  const dispatch = useDispatch();


  const location = useLocation();
  const [binsize_up, setproperty_up] = useState("");
  const [binsize_id, setproperty_id] = useState("");
  const [is_updating, setis_updating] = useState("");

  const navigate = useNavigate();


  //circle btn
  const [circle_btn, setcircle_btn] = useState(true);
  const toggle_circle = () => {
    setcircle_btn(!circle_btn);
  };

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      // This should be in small letter or smallcase
      bin_size: binsize_up.name || "",
      wide: binsize_up.wide || "",
      height: binsize_up.height || "",
      depth: binsize_up.depth || "",
    },

    validationSchema: Yup.object({
      // Size_type: Yup.string().required("Type Name is required"),
      // wide: Yup.string().required("Width is required"),
      // height: Yup.string().required("Height is required"),
      // depth: Yup.string().required("Length is required"),
      
    }),

    onSubmit: (values) => {
      is_updating ? update_binsize(values) : add_binsize(values);
    },
  });

  const add_binsize = (values) => {
    // alert("add binsize data-----")
    axios
      .post(
        ServerAddress + "wms/add_binsize/",
        {
          name: values.bin_size ? toTitleCase(values.bin_size).toUpperCase() : "",
          wide: values.wide,
          height: values.height,     
          depth: values.depth,     
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (response) {
        console.log("add_binsize response==",response.data)

        if (response.data.status === "success") {
          dispatch(setToggle(true));
          dispatch(setShowAlert(true));
          dispatch(setDataExist(`Bin Size  "${(values.bin_size)}" Updated sucessfully`));
          dispatch(setAlertType("success"));
          navigate(-1);
        } else if (response.data === "duplicate") {
          dispatch(setShowAlert(true));
          dispatch(setDataExist(`Bin Size  "${(values.bin_size)}" already exists`));
          dispatch(setAlertType("warning"));
        }
      })
      .catch((error) => {
        alert(`Error Happen While Posting Vehicle Dimension Data ${error}`);
      });
  };

  const update_binsize = (values) => {
    // alert("update_binsize HISTORY called-----------");
    let fields_names = Object.entries({
      name: values.bin_size ? toTitleCase(values.bin_size).toUpperCase() : "",
      wide: values.wide,
      height: values.height,     
      depth: values.depth,
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
      // alert("UPDATE binsize CALLED------");
      axios
        .put(
          ServerAddress + "wms/update_binsize/" + binsize_id,
          {
            change_fields: change_fields,
            name: values.bin_size ? toTitleCase(values.bin_size).toUpperCase() : "",
            wide: values.wide,
            height: values.height,     
            depth: values.depth,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then(function (response) {
          console.log("update_binsize response", response.data)
          if (response.data.status === "success") {
            dispatch(setToggle(true));
            dispatch(setShowAlert(true));
            dispatch(setDataExist(`Bin Size  "${(values.bin_size)}" Updated sucessfully`));
            dispatch(setAlertType("success"));
            navigate(-1);
          } else if (response.data === "duplicate") {
            dispatch(setShowAlert(true));
            dispatch(setDataExist(`Bin Size  "${(values.bin_size)}" already exists`));
            dispatch(setAlertType("warning"));
          }
        })
        .catch(function () {
          alert("Error Error While Updateing binsize");
        });
    });
  };

  useLayoutEffect(() => {
    try {
      let binsize_loc = location.state.item;
      console.log("binsize_loc", binsize_loc)
      setis_updating(true);
      setproperty_up(binsize_loc);
      setproperty_id(binsize_loc.id);
    } catch (error) { }
  }, [])


  return (
    <div>
      <Form
        onSubmit={(e) => {
          e.preventDefault();          
          validation.handleSubmit(e.values);
          return false;
        }}
      >
        <div className="mt-3">
          <PageTitle page="Bin Size" />
          <Title title=" Add Bin Size" parent_title="BinDetails" />
        </div>

        {/*  Vehicle dimension*/}
        <div className=" m-3">
          <Col lg={12}>
            <Card className="shadow bg-white rounded">
              <CardTitle className="mb-1 header">
                <div className="header-text-icon header-text">
                  Bin Size
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
                        <Label className="header-child">Size Name:</Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.bin_size || ""}
                          invalid={
                            validation.touched.bin_size && validation.errors.bin_size
                              ? true
                              : false
                          }
                          type="text"
                          min={0}
                          name="bin_size"
                          className="form-control-md "
                          id="input"
                          placeholder="Enter Name"
                        />
                        {validation.touched.bin_size && validation.errors.bin_size ? (
                          <FormFeedback type="invalid">
                            {validation.errors.bin_size}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">Wide:</Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.wide || ""}
                          invalid={
                            validation.touched.wide && validation.errors.wide
                              ? true
                              : false
                          }
                          type="number"
                          min={0}
                          name="wide"
                          className="form-control-md "
                          id="input"
                          placeholder="Enter Wide"
                        />
                        {validation.touched.wide && validation.errors.wide ? (
                          <FormFeedback type="invalid">
                            {validation.errors.wide}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className='header-child"'>Height:</Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.height || ""}
                          invalid={
                            validation.touched.height &&
                            validation.errors.height
                              ? true
                              : false
                          }
                          className="form-control-md "
                          name="height"
                          id="input"
                          type="number"
                          min={0}
                          placeholder="Enter Height"
                        />
                        {validation.touched.height &&
                        validation.errors.height ? (
                          <FormFeedback type="invalid">
                            {validation.errors.height}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header_child">Depth:</Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.depth || ""}
                          invalid={
                            validation.touched.depth &&
                            validation.errors.depth
                              ? true
                              : false
                          }
                          className="form-control-md "
                          name="depth"
                          id="input"
                          type="number"
                          min={0}
                          placeholder="Enter Depth"
                        />
                        {validation.touched.depth &&
                        validation.errors.depth ? (
                          <FormFeedback type="invalid">
                            {validation.errors.depth}
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
        <div className=" m-3">
          <Col lg={12}>
            <div className="mb-1 footer_btn">
              <button type="submit" className="btn btn-info m-1">
                Save
              </button>

              <button
                type="submit"
                className="btn btn-info m-1 "
                onClick={() => navigate(-1)}
              >
                Cancel
              </button>
            </div>
          </Col>
        </div>
      </Form>
    </div>
  );
}

export default AddBinSize;