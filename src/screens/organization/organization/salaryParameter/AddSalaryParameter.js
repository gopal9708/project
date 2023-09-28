import React, { useState, useEffect } from "react";
import {
  Col,
  Card,
  CardTitle,
  Form,
  CardBody,
  Row,
  Label,
  Input,
  FormFeedback,
} from "reactstrap";
import { Button } from "react-bootstrap";
import PageTitle from "../../../../components/pageTitle/PageTitle";
import Title from "../../../../components/title/Title";
import { IconContext } from "react-icons";
import { MdAddCircleOutline, MdRemoveCircleOutline } from "react-icons/md";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ServerAddress } from "../../../../constants/ServerAddress";
import { setAlertType,setDataExist,setShowAlert } from "../../../../store/alert/Alert";

const AddSalaryParameter = () => {
    const accessToken = useSelector((state) => state.authentication.access_token);
    //redux for company name
    const user = useSelector((state) => state.authentication.userdetails);
    console.log("the user details ",user)
    const dispatch = useDispatch();
    const location = useLocation();
    // Toggle btn
    const [circle_btn, setcircle_btn] = useState(true);
    const toggle_circle = () => {
      setcircle_btn(!circle_btn);
    };
  
   
    const navigate = useNavigate();
  
    const handleAction = () => {
      // dispatch(setToggle(true));
      navigate("/");
    };
  
  
  //update salary parameter
    const [org_id, setorg_id] = useState("");
    const [is_updating, setis_updating] = useState(false);
    const [salary_data, setsalary_data] = useState("");
  
  
    //for vallidation
    const validation = useFormik({
      enableReinitialize: true,
      initialValues: {
        //pf
        organization:salary_data.organization_name || "",
            company_esi_code: salary_data.company_esi_code || "",
            esi_limit: salary_data.esi_limit || "",   
            esi_rate_employer: salary_data.esi_rate_employer  || "",
            esi_rate_employee: salary_data.esi_rate_employee || "",
  
            company_pf_code: salary_data.company_pf_code || "",
            pf_rate_employer: salary_data.pf_rate_employer || "",
            pf_rate_employee: salary_data.pf_rate_employee || "",
            vpf_employee: salary_data.vpf_employee || "",
            eps_salary_limit: salary_data.eps_salary_limit || "",
            eps_rate_employe: salary_data.eps_rate_employe || "",
            eps_limit: salary_data.eps_limit || "",
  
            yearly_basic_limit_bonus: salary_data.yearly_basic_limit_bonus || "",
            bonus_percent: salary_data.bonus_percent || "",
            monthly_leave_allowable: salary_data.monthly_leave_allowable || "",  
            },
      validationSchema: Yup.object({
        //pf
        // company_pf_code: Yup.string().min(15).max(15).required("Company PF Code is required"),
        // pf_rate_employer: Yup.string().required("FIeld is reuired"),
        // pf_rate_employee: Yup.string().required("P.F Rate is required"),
        // vpf_employee: Yup.string().required("V.P.F is required"),
        // eps_salary_limit: Yup.string().required("E.P.S Salary Limit is required"),
        // eps_rate_employe: Yup.string().required(
        //   "E.P.S Rate Employee is required"
        // ),
        // eps_limit: Yup.string().required("E.P.S Rate is required"),
        // // esi
        // company_esi_code: Yup.string().min(15).max(15).required("Company ESI Code is required"),
        // esi_limit: Yup.string().required("E.S.I Limit is required"),
        // esi_rate_employer: Yup.string().required(
        //   "E.S.I Rate Employee is required"
        // ),
        // esi_rate_employee: Yup.string().required(
        //   "E.S.I Rate Employee is requied"
        // ),
        // yearly_basic_limit_bonus: Yup.string().required("Year Basis Bonus Limit"),
        // bonus_percent: Yup.string().required("Bonus Percentage is required"),
        // monthly_leave_allowable: Yup.string().required(
        //   "Monthly Leave Allowance is required"
        // ),
      }),
      onSubmit: (values) => {
       is_updating?update(values): add_salary_parameter(values);
      },
    });
  
  //post salary parameter
  
    const add_salary_parameter = (values) => {
      axios
      .post(
          ServerAddress + "organization/add-SalaryParameter/",
          {
  
            organization:user.organization_id,
            //ESI Info
  
            company_esi_code: values.company_esi_code,
            esi_limit: values.esi_limit,   
            esi_rate_employer: values.esi_rate_employer,
            esi_rate_employee: values.esi_rate_employee,
  
            company_pf_code: values.company_pf_code,
            pf_rate_employer: values.pf_rate_employer,
            pf_rate_employee: values.pf_rate_employee,
            vpf_employee: values.vpf_employee,
            eps_salary_limit: values.eps_salary_limit,
            eps_rate_employe: values.eps_rate_employe,
            eps_limit: values.eps_limit,
  
            yearly_basic_limit_bonus: values.yearly_basic_limit_bonus,
            bonus_percent: values.bonus_percent,
            monthly_leave_allowable: values.monthly_leave_allowable,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((response) => {
          console.log("the respone ==",response)
          if (response !=="") {
            alert("success");
            dispatch(setShowAlert(true));
            dispatch(setAlertType("Warning"));
            dispatch(
              setDataExist(
                `Add Salary Component ${values.esi_rate_employer} is Added Successfully`
              )
            );
            navigate(-1);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
  
  
    const update = (values) => {
      axios
        .put(
          ServerAddress + "organization/update-Salaryparameter/" + user.organization_id,
          {
           organization:user.organization_id,
            company_esi_code: values.company_esi_code,         
             esi_limit: values.esi_limit,   
            esi_rate_employer: values.esi_rate_employer,
            esi_rate_employee: values.esi_rate_employee,
  
            company_pf_code: values.company_pf_code,
            pf_rate_employer: values.pf_rate_employer,
            pf_rate_employee: values.pf_rate_employee,
            vpf_employee: values.vpf_employee,
            eps_salary_limit: values.eps_salary_limit,
            eps_rate_employe: values.eps_rate_employe,
            eps_limit: values.eps_limit,
  
            yearly_basic_limit_bonus: values.yearly_basic_limit_bonus,
            bonus_percent: values.bonus_percent,
            monthly_leave_allowable: values.monthly_leave_allowable,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
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
                `salary Parameter is Update Successfully`
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
        let data = location.state.salary_data;  
        setis_updating(true);
        setsalary_data(data);
        setorg_id(data.organization_id); 
      } catch (error) {}
    },[is_updating, location]);
  
   // for history 
   const handlClk = () => {
    navigate("/organisation/salaryParameter/SalaryParameterHistory", {
      state: { salary_parameter: salary_data },
    });
  };
    return (
      <>
        <div>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              validation.handleSubmit(e.values);
              return false;
            }}
          >
            <div className="mt-3">
              <PageTitle
                page={
                  is_updating ? "Update Salary Parameter" : "Add Salary Parameter"
                }
              />
              <Title
                title={
                  is_updating ? "Update Salary Parameter" : "Add Salary Parameter"
                }
                parent_title="Organisation"
              />
              {is_updating && (
                <div style={{ justifyContent: "right", display: "flex",marginRight:"20px" }}>
                  <Button
                    type="button"
                    onClick={() => {
                      handlClk();
                    }}
                  >
                    History
                  </Button>
                </div>
              )}
  
              <div className="m-1">
                <Col lg={12}>
                  <Card className="shadow bg-white rounded">
                    <CardTitle className="mb-1 header">
                      <div className="header-text-icon header-text">
                        Salary Info :
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
                          <Col lg={12} md={12} sm={12}>
                            <div className="mb-2">
                              <Label className="header-child">
                                Company Name <span className="mandatory">*</span>
                              </Label>
                              <Input
                                type="text"
                                className="form-control form-control-sm"
                                id="input"
                                value={user.organization_name}
                                disabled
                              />
                            </div>
                          </Col>
  
                          <Col lg={6} md={6} sm={6}>
                            <div className="mb-1">
                              <Label className="header-child">
                                Company PF Code{" "}
                                <span className="mandatory">*</span>
                              </Label>
                              <Input
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.company_pf_code}
                                invalid={
                                  validation.touched.company_pf_code &&
                                  validation.errors.company_pf_code
                                    ? true
                                    : false
                                }
                                type="text"
                                className="form-control form-control-sm"
                                id="sp_input"
                                name="company_pf_code"
                                placeholder="Enter PF Code"
                              />
                              {validation.touched.company_pf_code &&
                              validation.errors.company_pf_code ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.company_pf_code}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </Col>
  
                          <Col lg={6} md={6} sm={6}>
                            <div className="mb-1">
                              <Label className="header-child">
                                Company E.S.I Code:{" "}
                                <span className="mandatory">*</span>
                              </Label>
                              <Input
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.company_esi_code}
                                invalid={
                                  validation.touched.company_esi_code &&
                                  validation.errors.company_esi_code
                                    ? true
                                    : false
                                }
                                type="text"
                                className="form-control form-control-sm"
                                id="sp_input"
                                name="company_esi_code"
                                placeholder="Enter E.S.I COde"
                              />
                              {validation.touched.company_esi_code &&
                              validation.errors.company_esi_code ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.company_esi_code}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </Col>
  
                          <Col lg={6} md={6} sm={6}>
                            <div className="mb-1">
                              <Label className="header-child">
                                PF Rate(Employer){" "}
                                <span className="mandatory">*</span>
                              </Label>
                              <Input
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.pf_rate_employer}
                                invalid={
                                  validation.touched.pf_rate_employer &&
                                  validation.errors.pf_rate_employer
                                    ? true
                                    : false
                                }
                                type="number"
                                step="0.1"
                                maxlength="6"
                                max="999999"
                                min={0}
                                className="form-control form-control-sm"
                                id="sp_input"
                                name="pf_rate_employer"
                                placeholder="Enter PF Rate"
                              />
                              {validation.touched.pf_rate_employer &&
                              validation.errors.pf_rate_employer ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.pf_rate_employer}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </Col>
  
                          <Col lg={6} md={6} sm={6}>
                            <div className="mb-1">
                              <Label className="header-child">
                                E.S.I Limit <span className="mandatory">*</span>
                              </Label>
                              <Input
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.esi_limit}
                                invalid={
                                  validation.touched.esi_limit &&
                                  validation.errors.esi_limit
                                    ? true
                                    : false
                                }
                                type="number"
                                min={0}
                                name="esi_limit"
                                step="0.1"
                                maxlength="6"
                                max="999999"
                                className="form-control form-control-sm"
                                id="sp_input"
                                placeholder="Enter ESI Limit"
                              />
                              {validation.touched.esi_limit &&
                              validation.errors.esi_limit ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.esi_limit}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </Col>
  
                          <Col lg={6} md={6} sm={6}>
                            <div className="mb-1">
                              <Label className="header-child">
                                P.F. Rate (Employee):{" "}
                                <span className="mandatory">*</span>
                              </Label>
                              <Input
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.pf_rate_employee}
                                invalid={
                                  validation.touched.pf_rate_employee &&
                                  validation.errors.pf_rate_employee
                                    ? true
                                    : false
                                }
                                type="number"
                                min={0}
                                step="0.1"
                                maxlength="6"
                                max="999999"
                                className="form-control form-control-sm"
                                id="sp_input"
                                name="pf_rate_employee"
                                placeholder="Enter PF Rate"
                              />
                              {validation.touched.pf_rate_employee &&
                              validation.errors.pf_rate_employee ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.pf_rate_employee}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </Col>
  
                          <Col lg={6} md={6} sm={6}>
                            <div className="mb-1">
                              <Label className="header-child">
                                E.S.I Rate (Employeer):{" "}
                                <span className="mandatory">*</span>
                              </Label>
                              <Input
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.esi_rate_employer}
                                invalid={
                                  validation.touched.esi_rate_employer &&
                                  validation.errors.esi_rate_employer
                                    ? true
                                    : false
                                }
                                type="number"
                                min={0}
                                step="0.1"
                                maxlength="6"
                                max="999999"
                                name="esi_rate_employer"
                                className="form-control form-control-sm"
                                id="sp_input"
                                placeholder="Enter ESI Rate"
                              />
                              {validation.touched.esi_rate_employer &&
                              validation.errors.esi_rate_employer ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.esi_rate_employer}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </Col>
  
                          <Col lg={6} md={6} sm={6}>
                            <div className="mb-1">
                              <Label className="header-child">
                                V.P.F(Employee):{" "}
                                <span className="mandatory">*</span>
                              </Label>
                              <Input
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.vpf_employee}
                                invalid={
                                  validation.touched.vpf_employee &&
                                  validation.errors.vpf_employee
                                    ? true
                                    : false
                                }
                                type="number"
                                min={0}
                                step="0.1"
                                maxlength="6"
                                max="999999"
                                className="form-control form-control-sm"
                                id="sp_input"
                                name="vpf_employee"
                                placeholder="Enter V.P.F "
                              />
                              {validation.touched.vpf_employee &&
                              validation.errors.vpf_employee ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.vpf_employee}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </Col>
  
                          <Col lg={6} md={6} sm={6}>
                            <div className="mb-1">
                              <Label className="header-child">
                                E.S.I Rate (Employee){" "}
                                <span className="mandatory">*</span>
                              </Label>
                              <Input
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.esi_rate_employee}
                                invalid={
                                  validation.touched.esi_rate_employee &&
                                  validation.errors.esi_rate_employee
                                    ? true
                                    : false
                                }
                                type="number"
                                min={0}
                                step="0.1"
                                maxlength="6"
                                max="999999"
                                className="form-control form-control-sm"
                                id="sp_input"
                                name="esi_rate_employee"
                                placeholder="Enter E.S.I Rate"
                              />
                              {validation.touched.esi_rate_employee &&
                              validation.errors.esi_rate_employee ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.esi_rate_employee}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </Col>
  
                          <Col lg={6} md={6} sm={6}>
                            <div className="mb-1">
                              <Label className="header-child">
                                E.P.S Salary Limit{" "}
                                <span className="mandatory">*</span>
                              </Label>
                              <Input
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.eps_salary_limit}
                                invalid={
                                  validation.touched.eps_salary_limit &&
                                  validation.errors.eps_salary_limit
                                    ? true
                                    : false
                                }
                                type="number"
                                min={0}
                                step="0.1"
                                maxlength="6"
                                max="999999"
                                className="form-control form-control-sm"
                                id="sp_input"
                                name="eps_salary_limit"
                                placeholder="Enter E.P.S Salary Limit"
                              />
                              {validation.touched.eps_salary_limit &&
                              validation.errors.eps_salary_limit ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.eps_salary_limit}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </Col>
  
                          <Col lg={6} md={6} sm={6}>
                            <div className="mb-1">
                              <Label className="header-child">
                                Yearly Basic Limit(Bonus){" "}
                                <span className="mandatory">*</span>
                              </Label>
                              <br />
                              <Input
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.yearly_basic_limit_bonus}
                                invalid={
                                  validation.touched.yearly_basic_limit_bonus &&
                                  validation.errors.yearly_basic_limit_bonus
                                    ? true
                                    : false
                                }
                                step="0.1"
                                maxlength="6"
                                max="999999"
                                className="form-control form-control-sm"
                                id="sp_input"
                                type="number"
                                min={0}
                                name="yearly_basic_limit_bonus"
                                placeholder="Enter Bonus Limit"
                              />
                              {validation.touched.yearly_basic_limit_bonus &&
                              validation.errors.yearly_basic_limit_bonus ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.yearly_basic_limit_bonus}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </Col>
  
                          <Col lg={6} md={6} sm={6}>
                            <div className="mb-1">
                              <Label className="header-child">
                                E.P.S Rate (Employer):{" "}
                                <span className="mandatory">*</span>
                              </Label>
                              <Input
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.eps_rate_employe}
                                invalid={
                                  validation.touched.eps_rate_employe &&
                                  validation.errors.eps_rate_employe
                                    ? true
                                    : false
                                }
                                type="number"
                                min={0}
                                step="0.1"
                                maxlength="6"
                                max="999999"
                                className="form-control form-control-sm"
                                id="sp_input"
                                name="eps_rate_employe"
                                placeholder="Enter E.P.S Rate"
                              />
                              {validation.touched.eps_rate_employe &&
                              validation.errors.eps_rate_employe ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.eps_rate_employe}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </Col>
  
                          <Col lg={6} md={6} sm={6}>
                            <div className="mb-1">
                              <Label className="header-child">
                                Bonus Percentage %{" "}
                                <span className="mandatory">*</span>
                              </Label>
                              <Input
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.bonus_percent}
                                invalid={
                                  validation.touched.bonus_percent &&
                                  validation.errors.bonus_percent
                                    ? true
                                    : false
                                }
                                type="number"
                                min={0}
                                step="0.1"
                                maxlength="6"
                                max="999999"
                                className="form-control form-control-sm"
                                id="sp_input"
                                name="bonus_percent"
                                placeholder="Enter Bonus Percentage %"
                              />
                              {validation.touched.bonus_percent &&
                              validation.errors.bonus_percent ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.bonus_percent}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </Col>
  
                          <Col lg={6} md={6} sm={6}>
                            <div className="mb-1">
                              <Label className="header-child">
                                E.P.S Limit: <span className="mandatory">*</span>
                              </Label>
                              <Input
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.eps_limit}
                                invalid={
                                  validation.touched.eps_limit &&
                                  validation.errors.eps_limit
                                    ? true
                                    : false
                                }
                                type="number"
                                min={0}
                                step="0.1"
                                maxlength="6"
                                max="999999"
                                className="form-control form-control-sm"
                                id="sp_input"
                                name="eps_limit"
                                placeholder="Enter E.P.S Limit"
                              />
                              {validation.touched.eps_limit &&
                              validation.errors.eps_limit ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.eps_limit}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </Col>
  
                          <Col lg={6} md={6} sm={6}>
                            <div className="mb-1">
                              <Label className="header-child">
                                Monthly Leave Allowable{" "}
                                <span className="mandatory">*</span>
                              </Label>
                              <Input
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.monthly_leave_allowable}
                                invalid={
                                  validation.touched.monthly_leave_allowable &&
                                  validation.errors.monthly_leave_allowable
                                    ? true
                                    : false
                                }
                                type="number"
                                min={0}
                                step="0.1"
                                maxlength="6"
                                max="999999"
                                className="form-control form-control-sm"
                                id="sp_input"
                                name="monthly_leave_allowable"
                                placeholder="Enter Monthly Leave Allowable"
                              />
                              {validation.touched.monthly_leave_allowable &&
                              validation.errors.monthly_leave_allowable ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.monthly_leave_allowable}
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
            </div>
  
            <div className="m-1">
              <Col lg={12}>
                <div className="mb-1 footer_btn">
                  <Button type="submit" className="btn btn-success m-1 cu_btn">
                    {is_updating ? "Update" : "Save"}
                  </Button>
  
                  <Button
                    type="button"
                    className="btn btn-danger m-1 cu_btn"
                    onClick={handleAction}
                  >
                    Exit
                  </Button>
                </div>
              </Col>
            </div>
          </Form>
        </div>
      </>
    );
  }

export default AddSalaryParameter