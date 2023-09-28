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
import { FiCheckSquare, FiSquare } from "react-icons/fi";
import PageTitle from "../../../../components/pageTitle/PageTitle";
import Title from "../../../../components/title/Title";
import { BsSave } from "react-icons/bs";
import { useState, useEffect } from "react";
import { useFormik } from "formik"; //used for validation
import * as Yup from "yup"; //used for validation
import { useLocation, useNavigate } from "react-router-dom"; // For navigation
import { ServerAddress } from "../../../../constants/ServerAddress";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  setShowAlert,
  setDataExist,
  setAlertType,
} from "../../../../store/alert/Alert";
import { useDispatch } from "react-redux";
import toTitleCase from "../../../../components/Title_Case/TitleCase";
import NSearchInput from "../../../../components/formComponent/nsearchInput/NSearchInput";
import { responsivePropType } from "react-bootstrap/esm/createUtilityClasses";

const AddCsvs = () => {
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
  // console.log("is_updating is", is_updating);
  const [subgroup_master, setaccount_master] = useState("");
  const [bankaccounts_master_id, setaccount_master_id] = useState("");

  const [date, setdate] = useState("");
  const [from_date, setfrom_date] = useState("");
  const [approved, setapproved] = useState(false);
  const [to_date, setto_date] = useState("");

  //for documents

  ///----adding extra input fields in Driver

  const [doc_type, setdoc_type] = useState("");
  const [certificate_no, setcertificate_no] = useState("");
  const [doc_upload, setdoc_upload] = useState("");

  let dimension_list = [doc_type, certificate_no, doc_upload];

  const [document, setdocument] = useState([dimension_list]);
  console.log("document", document);

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

      send_Csvn_data(values);
    },
  });
  // post method
  const send_Csvn_data = (values) => {
    axios
      .post(
        ServerAddress + "",
        {
          upload_date: values.upload_date,
          document: document,
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
            setDataExist(`Add csvs ${values.branch} is Added Successfully`)
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
          validation.handleSubmit(e.values);
          return false;
        }}
      >
        <div className="m-4">
          <PageTitle page={is_updating ? "Update Csvn" : "Add Csvn"} />
          <Title
            title={is_updating ? "Update Csvn" : "Add Csvn"}
            parent_title="Payroll"
          />
        </div>

        <div className="m-4" id="section1">
          <Card className="shadow bg-white rounded">
            <CardTitle className="mb-1 header">
              <div className="header-text-icon header-text">
                Add Csvn
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
                        Upload Date <span className="mandatory">*</span> :
                      </Label>
                      <Input
                        className="form-control d-block from control-md"
                        bsSize="sm"
                        name="upload_date"
                        type="date"
                        placeholder=" Enter Upload Date"
                        onChange={validation.handleChange}
                        value={validation.values.upload_date}
                      />
                    </div>
                  </Col>
                  <Col lg={4} md={3} sm={3}>
                    <Label className="header-child">
                      Document Upload <span className="manadatory">*</span>
                    </Label>
                    {document.map((item, index) => (
                      <Input
                        className="form-control d-block from control-md"
                        key={index}
                        type="file"
                        bsSize="sm"
                        style={{ marginBottom: "15px" }}
                        name="file"
                        id="input-s"
                        onChange={(event) => {
                          setdoc_upload(event.target.files[0]);
                          item[2] = event.target.files[0];
                        }}
                      />
                    ))}
                  </Col>
                  <Col lg={4} md={6} sm={6}>
                    <div className="mb-3">
                      <Label className="header-child">Activated</Label>
                      <div onClick={() => setapproved(!approved)}>
                        {approved ? (
                          <FiCheckSquare size={18} />
                        ) : (
                          <FiSquare size={18} />
                        )}
                      </div>
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
export default AddCsvs;
