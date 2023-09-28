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

const AddPincode = () => {

  const accessToken = useSelector((state) => state.authentication.access_token);
  const location_data = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [circle_btn, setcircle_btn] = useState(true);


  const toggle_circle = () => {
    setcircle_btn(!circle_btn);
  };

  const [pincode, setpincode] = useState([])

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      pincode: pincode.is_pincode ? pincode.pincode.pincode : pincode.pincode?.pincode_name || "",
    },

    validationSchema: Yup.object({
      pincode: Yup.string()
        .min(6, " Number should not less then 6 digit")
        .max(6, " Number should not grater more then 6 digit")
        .required("Pin code is required"),
    }),

    onSubmit: (values) => {
      updatepincode(values)
    },
  });
  const [city_list_s, setcity_list_s] = useState([]);
  const [city, setcity] = useState("");
  const [city_id, setcity_id] = useState(0);
  const [city_error, setcity_error] = useState(false);
  const [city_page, setcity_page] = useState(1);
  const [city_search_item, setcity_search_item] = useState("");
  const [city_loaded, setcity_loaded] = useState(false);
  const [city_count, setcity_count] = useState(1);
  const [togcity, settogcity] = useState(false)
  const [city_bottom, setcity_bottom] = useState(103)

  const getCities = async (place_id, filter_by) => {
    let cities_list = [];
    try {
      const resp = await axios.get(
        ServerAddress +
        `master/all_cities/?search=${""}&p=${city_page}&records=${10}&city_search=${city_search_item}` +
        "&place_id=" +
        place_id +
        "&filter_by=" +
        filter_by,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
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
          // if (get_state_wise_op) {
          //   setoperating_city_list(cities_list);
          // }
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
    } catch (err) {
      console.warn(`Error Occur in Get City, ${err}`);
    }
  };
  useEffect(() => {
        getCities("all", "all");
  }, [city_page, city_search_item]);


  const updatepincode = async (values) => {
    let id =  pincode.is_pincode ? pincode.pincode.id : pincode.pincode.pincode;
    let fields_names = Object.entries({
      city_name: city,
      pincode: values.pincode,
    });
    // console.log("fields_names----", fields_names)

    let change_fields = {};
    for (let j = 0; j < fields_names.length; j++) {
      const ele = fields_names[j];
      let prev = location_data.state.pincode[`${ele[0]}`];
      let new_v = ele[1];
      // console.log("prev===", prev)

      if (String(prev).toUpperCase() !== String(new_v).toUpperCase()) {
        change_fields[`${ele[0]}`] = new_v.toString().toUpperCase();
      }
    }

    try {
      const response = await axios.put(
        ServerAddress + "master/update_pincode/" + id,
        {
          change_fields: change_fields,
          pincode: values.pincode,
          city: city_id,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.data.status === "success") {
        dispatch(setToggle(true));
        dispatch(setShowAlert(true));
        dispatch(
          setDataExist(`"${values.pincode}" Updated sucessfully`)
        );
        dispatch(setAlertType("info"));
        pincode.is_pincode ? navigate(-1) : navigate("/master/locations");
      } else if (response.data === "duplicate") {
        dispatch(setShowAlert(true));
        dispatch(
          setDataExist(
            `Pincode "${toTitleCase(
              values.pincode
            )}" already exists`
          )
        );
        dispatch(setAlertType("warning"));
      }
    } catch (error) {
      alert(`Error While  Updateing Pincode ${error}`);
    }
  };


  useLayoutEffect(() => {
    try {
      let pincode = location_data.state;
      // console.log("pincode====", pincode)
      setpincode(pincode)
      setcity_id(pincode.pincode.city)
      setcity(toTitleCase(pincode.pincode.city_name))
    } catch (error) { }
  }, []);

  return (
    <div>
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
            Update Pincode
          </div>
          <Col lg={12}>

            <Card className="shadow bg-white rounded">
              <CardTitle className="mb-1 header">
                <div className="header-text-icon header-text">
                  <div>Pincode Details</div>

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
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-3">
                        <Label className="header-child">Pincode*</Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.pincode || ""}
                          invalid={
                            validation.touched.pincode &&
                              validation.errors.pincode
                              ? true
                              : false
                          }
                          type="text"
                          name="pincode"
                          className="form-control-md"
                          id="input"
                          placeholder="Enter Pincode"
                        />
                        {validation.touched.pincode &&
                          validation.errors.pincode ? (
                          <FormFeedback type="invalid">
                            {validation.errors.pincode}
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
                className="btn btn-info m-1"
              >
                Update
              </button>

              <button
                type="submit"
                className="btn btn-info m-1"
                onClick={() => navigate("/master/city")}
              >
                Cancel
              </button>
            </div>
          </Col>
        </div>
      </Form>
    </div>
  );
};

export default AddPincode;
