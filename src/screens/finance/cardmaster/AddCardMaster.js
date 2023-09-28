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

const AddCardMaster = () => {
  const AccessToken = useSelector((state) => state.authentication.access_token);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  // Toggle Btn
  const [circle_btn, setcircle_btn] = useState(true);
  const toggle_circle = () => {
    setcircle_btn(!circle_btn);
  };

  const [is_updating, setis_updating] = useState(false);
  const [card_master, setaccount_master] = useState("");
  const [bankaccounts_master_id, setaccount_master_id] = useState("");

  //Dropdown
  const [bankname, setbankname] = useState("");
  const [bankname_list, setbankname_list] = useState([
    "State Bank Of India",
    "HDFC Bank",
    "HDFC Bank",
    "ICICI Bank",
    "BOB Bank",
  ]);
  const [bankname_error, setbankname_error] = useState(false);

  const [cardtype, setcardtype] = useState("");
  const [cardtype_list, setcardtype_list] = useState([
    "CREDIT CARD",
    "DEBIT CARD",
  ]);
  const [cardtype_error, setcardtype_error] = useState(false);

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      // This should be in small letter or smallcase
      from_branch: card_master.from_branch || "",
      card: cardtype,
      card_key: card_master.card_key || "",
      card_no: card_master.card_no || "",
      valid_from: card_master.valid_from || "",
      valid_to: card_master.valid_to || "",
      pin: card_master.pin || "",
      remarks: card_master.remarks || "",
    },

    validationSchema: Yup.object({}),

    onSubmit: (values) => {
      is_updating
        ? update_card_master_data(values)
        : Send_CardMaster_data(values);
    },
  });

  const Send_CardMaster_data = (values) => {
    axios
      .post(
        ServerAddress + "finance/add-CardMasterEntry/",
        {
          from_branch: values.from_branch,
          bank: bankname,
          card: cardtype,
          card_key: values.card_key,
          card_no: values.card_no,
          valid_from: values.valid_from,
          valid_to: values.valid_to,
          pin: values.pin,
          remarks: values.remarks,
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
              `Card Master ${values.card_key} is Added is Successfully`
            )
          );
          navigate("/master/cardmaster");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // for update

  const update_card_master_data = (values) => {
    axios
      .put(
        ServerAddress + "finance/put-CardMasterEntry/" + bankaccounts_master_id,
        {
          from_branch: values.from_branch,
          card_key: values.card_key,
          card_no: values.card_no,
          bank: bankname,
          card: cardtype,
          valid_from: values.valid_from,
          valid_to: values.valid_to,
          pin: values.pin,
          remarks: values.remarks,
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
            setDataExist(`Card Master ${values.card_key} Updated Successfully`)
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
      setbankname(mastr.bank);
      setcardtype(mastr.card);
    } catch (error) {
      setis_updating(false);
    }
  }, [is_updating]);

  return (
    <div>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          if (bankname == "") {
            setbankname_error(true);
          }
          if (cardtype == "") {
            setcardtype_error(true);
          }
          validation.handleSubmit(e.values);
          return false;
        }}
      >
        <div className="m-4">
          <PageTitle page={"Card Master"} />
          <Title
            title={is_updating ? "Update Card Master " : "Card Master"}
            parent_title="Finance"
          />
        </div>

        <div className="m-4" id="section1">
          <Card className="shadow bg-white rounded">
            <CardTitle className="mb-1 header">
              <div className="header-text-icon header-text">
                Add Card Master
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
                        Bank Name <span className="mandatory">*</span> :
                      </Label>
                      <NSearchInput
                        data_list={bankname_list}
                        data_item_s={bankname}
                        set_data_item_s={setbankname}
                        show_search={false}
                        error_message={"Please Select Bank Name"}
                        error_s={bankname_error}
                      />
                    </div>
                  </Col>

                  <Col lg={4} md={6} sm={6}>
                    <div className="m-2 mb-2">
                      <Label className="header-child sm-10">
                        Card Type <span className="mandatory">*</span> :
                      </Label>
                      <NSearchInput
                        data_list={cardtype_list}
                        data_item_s={cardtype}
                        set_data_item_s={setcardtype}
                        show_search={false}
                        error_message={"Please Select Card Type"}
                        error_s={cardtype_error}
                      />
                    </div>
                  </Col>

                  <Col lg={4} md={6} sm={6}>
                    <div className="m-2 mb-2">
                      <Label className="header-child sm-10">
                        Card No. <span className="mandatory">*</span> :
                      </Label>
                      <Input
                        className="form-control d-block from control-md"
                        bsSize="sm"
                        name="card_no"
                        type="number"
                        placeholder=" Enter Card No."
                        onChange={validation.handleChange}
                        value={validation.values.card_no}
                      />
                    </div>
                  </Col>

                  <Col lg={4} md={6} sm={6}>
                    <div className="m-2 mb-2">
                      <Label className="header-child sm-10">
                        From Branch <span className="mandatory">*</span> :
                      </Label>
                      <Input
                        className="form-control d-block from control-md"
                        bsSize="sm"
                        name="from_branch"
                        type="text"
                        placeholder=" Enter Your Branch"
                        onChange={validation.handleChange}
                        value={validation.values.from_branch}
                      />
                    </div>
                  </Col>

                  <Col lg={4} md={6} sm={6}>
                    <div className="m-2 mb-2">
                      <Label className="header-child sm-10">
                        Card Key/ ID<span className="mandatory">*</span> :
                      </Label>
                      <Input
                        className="form-control d-block from control-md"
                        bsSize="sm"
                        name="card_key"
                        type="text"
                        placeholder=" Enter Card Key/ ID"
                        onChange={validation.handleChange}
                        value={validation.values.card_key}
                      />
                    </div>
                  </Col>

                  
                  <Col lg={4} md={6} sm={6}>
                    <div className="m-2 mb-2">
                      <Label className="header-child sm-10">
                        Valid From <span className="mandatory">*</span> :
                      </Label>
                      <Input
                        className="form-control d-block from control-md"
                        bsSize="sm"
                        name="valid_from"
                        type="date"
                        onChange={validation.handleChange}
                        value={validation.values.valid_from}
                      />
                    </div>
                  </Col>
                  <Col lg={4} md={6} sm={6}>
                    <div className="m-2 mb-2">
                      <Label className="header-child sm-10">
                        Valid To <span className="mandatory">*</span> :
                      </Label>
                      <Input
                        className="form-control d-block from control-md"
                        bsSize="sm"
                        name="valid_to"
                        type="date"
                        onChange={validation.handleChange}
                        value={validation.values.valid_to}
                      />
                    </div>
                  </Col>
                  <Col lg={4} md={6} sm={6}>
                    <div className="m-2 mb-2">
                      <Label className="header-child sm-10">
                        Pin <span className="mandatory">*</span> :
                      </Label>
                      <Input
                        className="form-control d-block from control-md"
                        bsSize="sm"
                        name="pin"
                        type="number"
                        placeholder=" Enter Pin"
                        onChange={validation.handleChange}
                        value={validation.values.pin}
                      />
                    </div>
                  </Col>
                  <Col lg={4} md={6} sm={6}>
                    <div className="m-2 mb-2">
                      <Label className="header-child sm-10">
                        Remarks <span className="mandatory">*</span> :
                      </Label>
                      <Input
                        className="form-control d-block from control-md"
                        bsSize="sm"
                        name="remarks"
                        type="text"
                        placeholder=" Enter Remarks"
                        onChange={validation.handleChange}
                        value={validation.values.remarks}
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
export default AddCardMaster;
