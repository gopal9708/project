/* eslint-disable */
import { IconContext } from "react-icons";
import { MdAddCircleOutline, MdRemoveCircleOutline } from "react-icons/md";
import {
  CardBody,
  CardTitle,
  Col,
  Form,
  Label,
  Row,
  Input,
  Card,
  FormFeedback,
} from "reactstrap";
import PageTitle from "../../../../components/pageTitle/PageTitle";
import Title from "../../../../components/title/Title";
import { BsSave } from "react-icons/bs";
import { useState, useEffect, useLayoutEffect } from "react";
import { useFormik } from "formik"; //used for validation
import * as Yup from "yup"; //used for validation
import { useLocation, useNavigate } from "react-router-dom"; // For navigation
import { ServerAddress } from "../../../../constants/ServerAddress";
import axios from "axios";
import { useSelector,useDispatch} from "react-redux";
import { setShowAlert,setDataExist,setAlertType } from "../../../../store/alert/Alert";
import NSearchInput from "../../../../components/formComponent/nsearchInput/NSearchInput";

const AddSalaryComponent = () => {
  const AccessToken = useSelector((state) => state.authentication.access_token);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  // Toggle Btn
  const [circle_btn, setcircle_btn] = useState(true);
  const toggle_circle = () => {
    setcircle_btn(!circle_btn);
  };

  // For Update
  const [is_updating, setis_updating] = useState(false);
  const [salary_data, setsalary_data] = useState("");
  const [salary_data_id, setsalary_data_id] = useState("");

  //For Dropdown
  const [salary_list, setsalary_list] = useState(["Basic", "Allowance", "Overtime", "Bonus", "Incentive", "Provident Fund", "Gratuity",  "Deduction"]);
  const [salary_type, setsalary_type] = useState("");
  const [salary_err, setsalary_err] = useState(false);

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      // This should be in small letter or smallcase
      name: salary_data.name || "",
    },

    validationSchema: Yup.object({
      name: Yup.string().required("salary Name is required "),
    }),

    onSubmit: (values) => {
      is_updating ? update(values) : send_salary_data(values);
    },
  });

  const send_salary_data = (values) => {
    axios
      .post(
        ServerAddress + "ems/add_salarycomponent/",
        {
          salary_type: salary_type,
          name: values.name,
        },
        {
          headers: {
            Authorization: `Bearer ${AccessToken}`,
          },
        }
      )
      .then(function (response) {
        console.log("data", response.data);
        if (response.data.status === "success") {
          dispatch(setShowAlert(true));
          dispatch(setAlertType("success"));
          dispatch(
            setDataExist(
              `salary component is${salary_type} Created Successfully`
            )
          );
          navigate(-1);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const update = (values) => {
    axios
      .put(
        ServerAddress + "ems/update_salarycomponent/" + salary_data_id,
        {
          salary_type: salary_type,
          name: values.name,
        },
        {
          headers: {
            Authorization: `Bearer ${AccessToken}`,
          },
        }
      )
      .then(function (response) {
        if (response.data.status === "success") {
          dispatch(setShowAlert(true));
          dispatch(setAlertType("success"));
          dispatch(
            setDataExist(
              `salary component is${salary_type} Created Successfully`
            )
          );
          navigate(-1);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    try {
      let data = location.state.salary_type;
      setis_updating(true);
      setsalary_data(data);
      setsalary_data_id(location.state.salary_type.id);
      setsalary_type(data.salary_type);
    } catch (error) {}
  }, [location])


  return (
    <div>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          if (salary_type === "") {
            setsalary_err(true);
          }
          validation.handleSubmit(e.values);
          return false;
        }}
      >
        <div className="m-4">
          <PageTitle page={is_updating ? "Update salary Component" : "Add salary Component"} />
          <Title
            title={is_updating ? "Update salary Component" : "Add salary Component"}
            parent_title="Master"
          />
        </div>

        <div className="m-4" id="section1">
          <Card className="shadow bg-white rounded">
            <CardTitle className="mb-1 header">
              <div className="header-text-icon header-text">
                salarys Details
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
                  <Col lg={6} md={6} sm={6}>
                    <div className="m-2 mb-2">
                      <Label className="header-child sm-10">
                        Salary Component<span className="mandatory">*</span> :
                      </Label>
                      <NSearchInput
                        data_list={salary_list}
                        data_item_s={salary_type}
                        set_data_item_s={setsalary_type}
                        show_search={false}
                        error_message={"Please Select salary Type"}
                        error_s={salary_err}
                      />
                    </div>
                  </Col>

                  <Col lg={6} md={6} sm={6}>
                    <div className="m-2 mb-2">
                      <Label className="header-child sm-10">
                        Name <span className="mandatory">*</span> :
                      </Label>
                      <Input
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.name}
                        invalid={
                          validation.touched.name && validation.errors.name
                            ? true
                            : false
                        }
                        className="form-control d-block from control-md"
                        bsSize="sm"
                        name="name"
                        type="text"
                        placeholder=" Enter salary Name"
                      />
                      {validation.touched.name && validation.errors.name ? (
                        <FormFeedback type={"invalid"}>
                          {validation.errors.name}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>
                </Row>
              </CardBody>
            ) : null}
          </Card>
        </div>

        {/*Button */}
        <div className="m-4">
          <Col lg={12}>
            <div className="mb-1 footer_btn">
              <button
                type="submit"
                className="btn btn-success"
                style={{ marginRight: "10px", width: "100px" }}
              >
                {is_updating ? "Update" : "Save"}
              </button>

              <button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  navigate(-1);
                }}
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

export default AddSalaryComponent