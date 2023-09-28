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
} from "reactstrap";
import PageTitle from "../../../../components/pageTitle/PageTitle";
import Title from "../../../../components/title/Title";
import { useState } from "react";
import { useFormik } from "formik"; //used for validation
import * as Yup from "yup"; //used for validation
import { useNavigate } from "react-router-dom"; // For navigation
import axios from "axios";
import {
  setShowAlert,
  setDataExist,
  setAlertType,
} from "../../../../store/alert/Alert";
import { useDispatch } from "react-redux";
import NSearchInput from "../../../../components/formComponent/nsearchInput/NSearchInput";

const AddPaySlip = () => {
  // const AccessToken = useSelector((state) => state.authentication.access_token);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const location = useLocation();

  // Toggle Btn
  const [circle_btn, setcircle_btn] = useState(true);
  const toggle_circle = () => {
    setcircle_btn(!circle_btn);
  };

  //for update
  const [is_updating, setis_updating] = useState(false);
  // console.log("is_updating is", is_updating);
  // const [subgroup_master, setaccount_master] = useState("");
  // const [bankaccounts_master_id, setaccount_master_id] = useState("");

  // const [date, setdate] = useState("");
  // const [from_date, setfrom_date] = useState("");
  // const [approved, setapproved] = useState(false);
  // const [to_date, setto_date] = useState("");

  //for Dropdown
  //Dropdown employee
  const [employee_type, setemployee_type] = useState("");
  const [employee_list, setemployee_list] = useState(["XYZ", "ABC"]);
  const [employee_error, setemployee_error] = useState(false);

  const [payrolltype, setpayrolltype] = useState("");
  const [payroll_list, setpayrolllist] = useState(["xyz", "abc"]);
  const [payrolltype_error, setpayroll_error] = useState(false);

  const [currency_type, setcurrency_type] = useState("");
  const [currency_list, setcurrency_list] = useState(["xyz", "abc"]);
  const [currencytype_error, setcurrencytype_error] = useState(false);

  ///----adding extra input fields in Driver

  const [doc_type, setdoc_type] = useState("");
  const [certificate_no, setcertificate_no] = useState("");
  const [doc_upload, setdoc_upload] = useState("");

  let dimension_list = [doc_type, certificate_no, doc_upload];

  const [document, setdocument] = useState([dimension_list]);

  const addDocument = () => {
    setdoc_type("");
    setcertificate_no("");
    setdoc_upload("");
    dimension_list = ["", "", ""];
    setdocument([...document, dimension_list]);
  };

  //--- delete input field

  const delete_document = (item) => {
    let temp = [...document];
    const index = temp.indexOf(item);
    if (index > -1) {
      temp.slice(index, 1);
    }
    setdocument(temp);
  };

  //Dropdown
  const [report, setreport] = useState("");
  const [report_list, setreport_list] = useState(["Yes", "No"]);

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      // This should be in small letter or smallcase
    },

    validationSchema: Yup.object({}),

    onSubmit: (values) => {
      console.log("first----------", values);

      send_payslip_data(values);
    },
  });
  // post method
  const send_payslip_data = (values) => {
    axios
      // .post(
      //   ServerAddress + "",
      //   {
      //
      //     employee: employee_type,
      //     },
      //   {
      //     headers: { Authorization: `Bearer ${AccessToken}` },
      //   }
      // )
      .then((response) => {
        if (response.data.status === "success") {
          dispatch(setShowAlert(true));
          dispatch(setAlertType("Warning"));
          dispatch(
            setDataExist(`Add Pay Slip ${values.branch} is Added Successfully`)
          );
          navigate(-1);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          if (employee_type == "") {
            setemployee_error(true);
          }
          if (payrolltype == "") {
            setpayroll_error(true);
          }
          if (currency_type == "") {
            setcurrencytype_error();
          }
          validation.handleSubmit(e.values);
          return false;
        }}
      >
        <div className="m-4">
          <PageTitle page={is_updating ? "Update Pay Slip" : "Add Pay Slip"} />
          <Title
            title={is_updating ? "Update Pay Slip" : "Add Pay Slip"}
            parent_title="Payroll"
          />
        </div>

        <div className="m-4" id="section1">
          <Card className="shadow bg-white rounded">
            <CardTitle className="mb-1 header">
              <div className="header-text-icon header-text">
                Add PaySlip
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
                    <div className="m-2 mb-2">
                      <Label className="header-child sm-10">
                        Employee<span className="mandatory">*</span> :
                      </Label>
                      <NSearchInput
                        data_list={employee_list}
                        data_item_s={employee_type}
                        set_data_item_s={setemployee_type}
                        show_search={false}
                        error_message={"Please Select Employee Type"}
                        error_s={employee_error}
                      />
                    </div>
                  </Col>
                  <Col lg={4} md={6} sm={6}>
                    <div className="m-2 mb-2">
                      <Label className="header-child sm-10">
                        PayRoll<span className="mandatory">*</span> :
                      </Label>
                      <NSearchInput
                        data_list={payroll_list}
                        data_item_s={payrolltype}
                        set_data_item_s={setpayrolltype}
                        show_search={false}
                        error_message={"Please Select Card Type"}
                        error_s={payrolltype_error}
                      />
                    </div>
                  </Col>

                  <Col lg={4} md={6} sm={6}>
                    <div className="m-2 mb-2">
                      <Label className="header-child sm-10">
                        Employee nssf <span className="mandatory">*</span> :
                      </Label>
                      <Input
                        className="form-control d-block from control-md"
                        bsSize="sm"
                        name="employee_nssf"
                        type="text"
                        placeholder=" Enter Employee nssf"
                        onChange={validation.handleChange}
                        value={validation.values.employee_nssf}
                      />
                    </div>
                  </Col>
                  <Col lg={4} md={6} sm={6}>
                    <div className="m-2 mb-2">
                      <Label className="header-child sm-10">
                        Employeer nssf <span className="mandatory">*</span> :
                      </Label>
                      <Input
                        className="form-control d-block from control-md"
                        bsSize="sm"
                        name="employee_nssf"
                        type="text"
                        placeholder=" Enter Employer nssf"
                        onChange={validation.handleChange}
                        value={validation.values.employeer_nssf}
                      />
                    </div>
                  </Col>
                  <Col lg={4} md={6} sm={6}>
                    <div className="m-2 mb-2">
                      <Label className="header-child sm-10">
                        Gross Salary <span className="mandatory">*</span> :
                      </Label>
                      <Input
                        className="form-control d-block from control-md"
                        bsSize="sm"
                        name="gross_salary"
                        type="num"
                        placeholder=" Enter Gross salary"
                        onChange={validation.handleChange}
                        value={validation.values.gross_salary}
                      />
                    </div>
                  </Col>
                  <Col lg={4} md={6} sm={6}>
                    <div className="m-2 mb-2">
                      <Label className="header-child sm-10">
                        Pay <span className="mandatory">*</span> :
                      </Label>
                      <Input
                        className="form-control d-block from control-md"
                        bsSize="sm"
                        name="pay"
                        type="text"
                        placeholder=" Enter Pay Type"
                        onChange={validation.handleChange}
                        value={validation.values.pay}
                      />
                    </div>
                  </Col>
                  <Col lg={4} md={6} sm={6}>
                    <div className="m-2 mb-2">
                      <Label className="header-child sm-10">
                        Total nssf Contribution{" "}
                        <span className="mandatory">*</span> :
                      </Label>
                      <Input
                        className="form-control d-block from control-md"
                        bsSize="sm"
                        name="total_nssf"
                        type="text"
                        placeholder=" Enter Total nssf Contribution"
                        onChange={validation.handleChange}
                        value={validation.values.total_nssf}
                      />
                    </div>
                  </Col>
                  <Col lg={4} md={6} sm={6}>
                    <div className="m-2 mb-2">
                      <Label className="header-child sm-10">
                        Overtime <span className="mandatory">*</span> :
                      </Label>
                      <Input
                        className="form-control d-block from control-md"
                        bsSize="sm"
                        name="overtime"
                        type="text"
                        placeholder=" Enter Total Overtime"
                        onChange={validation.handleChange}
                        value={validation.values.overtime}
                      />
                    </div>
                  </Col>
                  <Col lg={4} md={6} sm={6}>
                    <div className="m-2 mb-2">
                      <Label className="header-child sm-10">
                        Bonus <span className="mandatory">*</span> :
                      </Label>
                      <Input
                        className="form-control d-block from control-md"
                        bsSize="sm"
                        name="bonus"
                        type="text"
                        placeholder=" Enter Total Bonus"
                        onChange={validation.handleChange}
                        value={validation.values.bonus}
                      />
                    </div>
                  </Col>
                  <Col lg={4} md={6} sm={6}>
                    <div className="m-2 mb-2">
                      <Label className="header-child sm-10">
                        Local Service Tax<span className="mandatory">*</span> :
                      </Label>
                      <Input
                        className="form-control d-block from control-md"
                        bsSize="sm"
                        name="local_service"
                        type="text"
                        placeholder=" Enter Local Service Tax"
                        onChange={validation.handleChange}
                        value={validation.values.local_service}
                      />
                    </div>
                  </Col>
                  <Col lg={4} md={6} sm={6}>
                    <div className="m-2 mb-2">
                      <Label className="header-child sm-10">
                        Local Service Tax Deduction{" "}
                        <span className="mandatory">*</span> :
                      </Label>
                      <Input
                        className="form-control d-block from control-md"
                        bsSize="sm"
                        name="tax_deduction"
                        type="text"
                        placeholder=" Enter Local Tax Deduction"
                        onChange={validation.handleChange}
                        value={validation.values.tax_deduction}
                      />
                    </div>
                  </Col>
                  <Col lg={4} md={6} sm={6}>
                    <div className="m-2 mb-2">
                      <Label className="header-child sm-10">
                        Total nssf Contribution
                        <span className="mandatory">*</span> :
                      </Label>
                      <Input
                        className="form-control d-block from control-md"
                        bsSize="sm"
                        name="total_contribution"
                        type="text"
                        placeholder=" Enter Total nssf Contribution"
                        onChange={validation.handleChange}
                        value={validation.values.total_contribution}
                      />
                    </div>
                  </Col>
                  <Col lg={4} md={6} sm={6}>
                    <div className="m-2 mb-2">
                      <Label className="header-child sm-10">
                        Sacco Deduction <span className="mandatory">*</span> :
                      </Label>
                      <Input
                        className="form-control d-block from control-md"
                        bsSize="sm"
                        name="sacco_deduction"
                        type="text"
                        placeholder=" Enter Sacco Deduction"
                        onChange={validation.handleChange}
                        value={validation.values.sacco_deduction}
                      />
                    </div>
                  </Col>
                  <Col lg={4} md={6} sm={6}>
                    <div className="m-2 mb-2">
                      <Label className="header-child sm-10">
                        Damage Deduction<span className="mandatory">*</span> :
                      </Label>
                      <Input
                        className="form-control d-block from control-md"
                        bsSize="sm"
                        name="damage_deduction"
                        type="text"
                        placeholder=" Enter Damage Deduction"
                        onChange={validation.handleChange}
                        value={validation.values.damage_deduction}
                      />
                    </div>
                  </Col>
                  <Col lg={4} md={6} sm={6}>
                    <div className="m-2 mb-2">
                      <Label className="header-child sm-10">
                        Salary Advance <span className="mandatory">*</span> :
                      </Label>
                      <Input
                        className="form-control d-block from control-md"
                        bsSize="sm"
                        name="salary_advance"
                        type="text"
                        placeholder=" Enter Advance Salary"
                        onChange={validation.handleChange}
                        value={validation.values.salary_advance}
                      />
                    </div>
                  </Col>
                  <Col lg={4} md={6} sm={6}>
                    <div className="m-2 mb-2">
                      <Label className="header-child sm-10">
                        Police Fine<span className="mandatory">*</span> :
                      </Label>
                      <Input
                        className="form-control d-block from control-md"
                        bsSize="sm"
                        name="police_fine"
                        type="text"
                        placeholder=" Enter Police Fine"
                        onChange={validation.handleChange}
                        value={validation.values.police_fine}
                      />
                    </div>
                  </Col>
                  <Col lg={4} md={6} sm={6}>
                    <div className="m-2 mb-2">
                      <Label className="header-child sm-10">
                        Basic Salary <span className="mandatory">*</span> :
                      </Label>
                      <Input
                        className="form-control d-block from control-md"
                        bsSize="sm"
                        name="basic_salary"
                        type="text"
                        placeholder=" Enter Basic Salary"
                        onChange={validation.handleChange}
                        value={validation.values.basic_salary}
                      />
                    </div>
                  </Col>
                  <Col lg={4} md={6} sm={6}>
                    <div className="m-2 mb-2">
                      <Label className="header-child sm-10">
                        Currency<span className="mandatory">*</span> :
                      </Label>
                      <NSearchInput
                        data_list={currency_list}
                        data_item_s={currency_type}
                        set_data_item_s={setcurrency_type}
                        show_search={false}
                        error_message={"Please Select Currency Type"}
                        error_s={currencytype_error}
                      />
                    </div>
                  </Col>
                  <Col lg={4} md={6} sm={6}>
                    <div className="m-2 mb-2">
                      <Label className="header-child sm-10">
                        Currency Rate<span className="mandatory">*</span> :
                      </Label>
                      <Input
                        className="form-control d-block from control-md"
                        bsSize="sm"
                        name="currency_rate"
                        type="text"
                        placeholder=" Enter Employee nssf"
                        onChange={validation.handleChange}
                        value={validation.values.currency_rate}
                      />
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
                style={{ marginRight: "15px", width: "77px" }}
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
export default AddPaySlip;
