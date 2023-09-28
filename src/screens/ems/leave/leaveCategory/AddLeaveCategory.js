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
// import toTitleCase from "../../../components/Title_Case/TitleCase";
import toTitleCase from "../../../../lib/titleCase/TitleCase";
import NSearchInput from "../../../../components/formComponent/nsearchInput/NSearchInput";
import { responsivePropType } from "react-bootstrap/esm/createUtilityClasses";

const AddLeaveCategory = () => {
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
  //for dropdown

  const [leave_type, setleave_type] = useState("");
  const [leave_type_list, setleave_type_list] = useState(["Half", "Full"]);
  const [leave_type_error, setleave_type_error] = useState(false);

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      // This should be in small letter or smallcase
    },

    validationSchema: Yup.object({}),

    onSubmit: (values) => {
      console.log("first----------", values);
      console.log("first----------", leave_type);

      send_leavecategory_data(values);
    },
  });

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
            page={is_updating ? "Update Sub Group Master" : "Leave Category"}
          />
          <Title
            title={
              is_updating ? "Update Sub Group Master" : "Add Leave Category"
            }
            parent_title="Leave Category"
          />
        </div>

        <div className="m-4" id="section1">
          <Card className="shadow bg-white rounded">
            <CardTitle className="mb-1 header">
              <div className="header-text-icon header-text">
                Leave Category
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
                        Leave Name <span className="mandatory">*</span> :
                      </Label>
                      <Input
                        className="form-control d-block from control-md"
                        bsSize="sm"
                        name="leave_name"
                        type="text"
                        placeholder=" Enter Leave Name"
                        onChange={validation.handleChange}
                        value={validation.values.leave_name}
                      />
                    </div>
                  </Col>
                  <Col lg={4} md={6} sm={6}>
                    <div className="m-2 mb-2">
                      <Label className="header-child sm-10">
                        Leave Type <span className="mandatory">*</span> :
                      </Label>
                      <NSearchInput
                        data_list={leave_type_list}
                        data_item_s={leave_type}
                        set_data_item_s={setleave_type}
                        show_search={false}
                        error_message={"Please Select Leave Type"}
                        error_s={leave_type_error}
                      />
                    </div>
                  </Col>
                  <Col lg={4} md={6} sm={6}>
                    <div className="m-2 mb-2">
                      <Label className="header-child sm-10">
                        preapproved <span className="mandatory">*</span> :
                      </Label>
                      <Input
                        className="form-control d-block from control-md"
                        bsSize="sm"
                        name="preapproved"
                        type="text"
                        placeholder=" Enter preapproved"
                        onChange={validation.handleChange}
                        value={validation.values.preapproved}
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
export default AddLeaveCategory;
