import React, { useState, useLayoutEffect } from "react";
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

  const [city, setcity] = useState([])

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      city: toTitleCase(city.city ? city.city : city.city_name) || "",
    },

    validationSchema: Yup.object({
      city: Yup.string().required("City Name is required"),
    }),

    onSubmit: (values) => {
   updateCity(values)
    },
  });


  
  const [state_list_s, setstate_list_s] = useState([]);
  const [state, setstate] = useState("");
  const [state_id, setstate_id] = useState(0);
  const [state_error, setstate_error] = useState(false);
  const [state_page, setstate_page] = useState(1);
  const [state_search_item, setstate_search_item] = useState("");
  const [state_loaded, setstate_loaded] = useState(false);
  const [state_count, setstate_count] = useState(1);
  const [state_bottom, setstate_bottom] = useState(103)


  
  const getStates = async () => {
    let state_list = [];
    try {
      const resp = await axios.get(
        ServerAddress +
        `master/all_states/?search=${""}&place_id=all&filter_by=all&p=${state_page}&records=${10}&state_search=${state_search_item}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
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
        setstate_count(state_count + 2);
        setstate_list_s(state_list);
      }
      else {
        setstate_list_s([])
      }
    } catch (err) {
      console.warn(`Error Occur in Get States, ${err}`);
    }
  };
  useLayoutEffect(() => {
    getStates();
  }, [state_page, state_search_item]);

  const updateCity= async (values) => {
    let id =  city?.city ? city.id : city.city_id;
    let fields_names = Object.entries({
      city: values.city,
      state_name: state,
    });

    let change_fields = {};
    for (let j = 0; j < fields_names.length; j++) {
      const ele = fields_names[j];
      let prev = location_data.state.city[`${ele[0]}`];
      let new_v = ele[1];

      if (String(prev).toUpperCase() !== String(new_v).toUpperCase()) {
        change_fields[`${ele[0]}`] = new_v.toString().toUpperCase();
      }
    }

    try {
      const response = await axios.put(
        ServerAddress + "master/update_city/" + id,
        {
          change_fields: change_fields,
          city: toTitleCase(values.city).toUpperCase(),
          state: state_id,
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
          setDataExist(`City "${values.city}" Updated sucessfully`)
        );
        dispatch(setAlertType("info"));
        city?.city ? navigate(-1) : navigate("/master/locations");
      } else if (response.data === "duplicate") {
        dispatch(setShowAlert(true));
        dispatch(
          setDataExist(
            `City Name "${toTitleCase(
              values.city
            )}" already exists`
          )
        );
        dispatch(setAlertType("warning"));
      }
    } catch (error) {
      alert(`Error While  Updateing Charge ${error}`);
    }
  };


  useLayoutEffect(() => {
    try {
      let city = location_data.state.city;
      console.log("city====", city)
      setcity(city)
      setstate_id(city.state)
      setstate(toTitleCase(city.state_name))
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
          Update City
          </div>
          <Col lg={12}>

            <Card className="shadow bg-white rounded">
              <CardTitle className="mb-1 header">
                <div className="header-text-icon header-text">
                  <div>City Details</div>

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
                          <Label className="header-child">State*</Label>
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
                          {/* <div className="mt-1 error-text" color="danger">
                            {state_error ? "Please Select Any State" : null}
                          </div> */}
                        </div>
                      </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-3">
                        <Label className="header-child">City Name*</Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.city || ""}
                          invalid={
                            validation.touched.city &&
                              validation.errors.city
                              ? true
                              : false
                          }
                          type="text"
                          name="city"
                          className="form-control-md"
                          id="input"
                          placeholder="Enter City Name"
                        />
                        {validation.touched.city &&
                          validation.errors.city ? (
                          <FormFeedback type="invalid">
                            {validation.errors.city}
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
