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
import PageTitle from "../../../components/pageTitle/PageTitle";
import Title from "../../../components/title/Title";
import { useState, useEffect } from "react";
import { useFormik } from "formik"; //used for validation
import * as Yup from "yup"; //used for validation
import { useLocation, useNavigate } from "react-router-dom"; // For navigation
import { ServerAddress } from "../../../constants/ServerAddress";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  setShowAlert,
  setDataExist,
  setAlertType,
} from "../../../store/alert/Alert";
import { useDispatch } from "react-redux";
import NSearchInput from "../../../components/formComponent/nsearchInput/NSearchInput";

const AddBankAccountMaster = () => {
  const AccessToken = useSelector((state) => state.authentication.access_token);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  // Toggle Btn
  const [circle_btn, setcircle_btn] = useState(true);
  const toggle_circle = () => {
    setcircle_btn(!circle_btn);
  };

  //for update
  const [is_updating, setis_updating] = useState(false);
  const [bankaccount_master, setaccount_master] = useState("");
  const [bankaccounts_master_id, setaccount_master_id] = useState("");

  //Dropdown
  const [report, setreport] = useState("");
  const [report_list, setreport_list] = useState(["YES", "NO"]);

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      // This should be in small letter or smallcase
      branch: bankaccount_master.branch || "",
      bank_code: bankaccount_master.bank_code || "",
      bank_name: bankaccount_master.bank_name || "",
      od_limit: bankaccount_master.od_limit || "",
      account_no: bankaccount_master.account_no || "",
      close_date: bankaccount_master.close_date || "",
      avg_balance: bankaccount_master.avg_balance || "",
      // open_date: values.open_date,
    },

    validationSchema: Yup.object({
      // transit_days: Yup.string().required("Transit Days is required"),
      // distance: Yup.string().required("Distance is required "),
    }),

    onSubmit: (values) => {
      is_updating
        ? update_bankaccounts_data(values)
        : send_bankaccount_data(values);
    },
  });
  // post method
  const send_bankaccount_data = (values) => {
    axios
      .post(
        ServerAddress + "finance/add-BankAccountMaster/",
        {
          branch: values.branch,
          bank_code: values.bank_code,
          bank_name: values.bank_name,
          od_limit: values.od_limit,
          account_no: values.account_no,
          close_date: values.close_date,
          avg_balance: values.avg_balance,
          print_in_reason_report: report,
        },
        {
          headers: { Authorization: `Bearer ${AccessToken}` },
        }
      )
      .then((response) => {
        if (response.data.status === "success") {
          dispatch(setShowAlert(true));
          dispatch(setAlertType("Warning"));
          dispatch(
            setDataExist(
              `Add Accounts ${values.bank_name} is Added Successfully`
            )
          );
          navigate("/master/bankaccountmaster");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // for update the data
  const update_bankaccounts_data = (values) => {
    axios
      .put(
        ServerAddress +
          "finance/put-BankAccountMaster/" +
          bankaccounts_master_id,
        {
          branch: values.branch,
          bank_code: values.bank_code,
          bank_name: values.bank_name,
          od_limit: values.od_limit,
          account_no: values.account_no,
          print_in_reason_report: report,
          close_date: values.close_date,
          avg_balance: values.avg_balance,
        },
        {
          headers: { Authorization: `Bearer ${AccessToken}` },
        }
      )
      .then((response) => {
        if (response.data.status === "success") {
          dispatch(setShowAlert(true));
          dispatch(setAlertType("warning"));
          dispatch(
            setDataExist(
              `Accounts Master ${values.bank_name} Updated Successfully`
            )
          );
          navigate(-1);
        }
      })
      .catch((error) => {
        alert(`Error While Updating Profile ${error}`);
      });
  };
  useEffect(() => {
    try {
      let mastr = location.state.data;
      setis_updating(true);
      setaccount_master(mastr);
      setaccount_master_id(mastr.id);
      setreport(mastr.print_in_reason_report);
    } catch (error) {
      setis_updating(false);
    }
  }, [is_updating]);
  // const[bran]

  return (
    <div>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          validation.handleSubmit(e.values);
          return false;
        }}
      >
        <div className="m-4">
          <PageTitle
            page={
              is_updating
                ? "Update Bank Account Master"
                : "Add Bank Account Master"
            }
          />
          <Title
            title={
              is_updating
                ? "Update Bank Account Master"
                : "Add Bank Account Master"
            }
            parent_title="Finance"
          />
        </div>

        <div className="m-4" id="section1">
          <Card className="shadow bg-white rounded">
            <CardTitle className="mb-1 header">
              <div className="header-text-icon header-text">
                Bank Account Master
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
                        Branch <span className="mandatory">*</span> :
                      </Label>
                      <Input
                        className="form-control d-block from control-md"
                        bsSize="sm"
                        name="branch"
                        type="text"
                        placeholder=" Enter Your Branch "
                        onChange={validation.handleChange}
                        value={validation.values.branch}
                      />
                    </div>
                  </Col>

                  <Col lg={4} md={6} sm={6}>
                    <div className="m-2 mb-2">
                      <Label className="header-child sm-10">
                        Bank Code <span className="mandatory">*</span> :
                      </Label>
                      <Input
                        className="form-control d-block from control-md"
                        bsSize="sm"
                        name="bank_code"
                        type="text"
                        placeholder=" Enter Your Bank Code"
                        onChange={validation.handleChange}
                        value={validation.values.bank_code}
                      />
                    </div>
                  </Col>

                  <Col lg={4} md={6} sm={6}>
                    <div className="m-2 mb-2">
                      <Label className="header-child sm-10">
                        Print in Recon. Report
                        <span className="mandatory">*</span> :
                      </Label>
                      <NSearchInput
                        data_list={report_list}
                        data_item_s={report}
                        set_data_item_s={setreport}
                        show_search={false}
                      />
                    </div>
                  </Col>

                  <Col lg={4} md={6} sm={6}>
                    <div className="m-2 mb-2">
                      <Label className="header-child sm-10">
                        Bank Name <span className="mandatory">*</span> :
                      </Label>
                      <Input
                        className="form-control d-block from control-md"
                        bsSize="sm"
                        name="bank_name"
                        type="text"
                        placeholder=" Enter Your Bank Name"
                        onChange={validation.handleChange}
                        value={validation.values.bank_name}
                      />
                    </div>
                  </Col>
                  <Col lg={4} md={6} sm={6}>
                    <div className="m-2 mb-2">
                      <Label className="header-child sm-10">
                        OD Limit <span className="mandatory">*</span> :
                      </Label>
                      <Input
                        className="form-control d-block from control-md"
                        bsSize="sm"
                        name="od_limit"
                        type="number"
                        placeholder="OD Limit"
                        onChange={validation.handleChange}
                        value={validation.values.od_limit}
                      />
                    </div>
                  </Col>
                  <Col lg={4} md={6} sm={6}>
                    <div className="m-2 mb-2">
                      <Label className="header-child sm-10">
                        Average Balance <span className="mandatory">*</span> :
                      </Label>
                      <Input
                        className="form-control d-block from control-md"
                        bsSize="sm"
                        name="avg_balance"
                        type="number"
                        placeholder=" Enter Average Balance"
                        onChange={validation.handleChange}
                        value={validation.values.avg_balance}
                      />
                    </div>
                  </Col>
                 
                  <Col lg={4} md={6} sm={6}>
                    <div className="m-2 mb-2">
                      <Label className="header-child sm-10">
                        Closing Date <span className="mandatory">*</span> :
                      </Label>
                      <Input
                        className="form-control d-block from control-md"
                        bsSize="sm"
                        name="close_date"
                        type="date"
                        placeholder=" Enter Closing Date"
                        onChange={validation.handleChange}
                        value={validation.values.close_date}
                      />
                    </div>
                  </Col>
                  <Col lg={4} md={6} sm={6}>
                    <div className="m-2 mb-2">
                      <Label className="header-child sm-10">
                        Account No <span className="mandatory">*</span> :
                      </Label>
                      <Input
                        className="form-control d-block from control-md"
                        bsSize="sm"
                        name="account_no"
                        type="char"
                        placeholder=" Enter Account No"
                        onChange={validation.handleChange}
                        value={validation.values.account_no}
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
export default AddBankAccountMaster;
