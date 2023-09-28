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


const AddAccountSubGroupMaster = () => {
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
  const [subgroup_master, setaccount_master] = useState("");
  const [bankaccounts_master_id, setaccount_master_id] = useState("");

  

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      // This should be in small letter or smallcase
      sub_group_code: subgroup_master.sub_group_code || "",
      sub_group_name: subgroup_master.sub_group_name || "",
    },

    validationSchema: Yup.object({}),

    onSubmit: (values) => {
      is_updating
        ? update_subgroup_data(values)
        : send_AccountsSubGroup_data(values);
    },
  });
  // post method
  const send_AccountsSubGroup_data = (values) => {
    axios
      .post(
        ServerAddress + "finance/add-AccountSubGroupMaster/",
        {
          sub_group_code: values.sub_group_code,
          sub_group_name: values.sub_group_name,
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
              `Add Sub Group ${values.sub_group_name} is Added Successfully`
            )
          );
          navigate("/master/accountsubgroupmaster");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //for update
  const update_subgroup_data = (values) => {
    axios
      .put(
        ServerAddress +
          "finance/put-AccountSubGroupMaster/" +
          bankaccounts_master_id,
        {
          sub_group_code: values.sub_group_code,
          sub_group_name: values.sub_group_name,
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
              `Accounts Sub Group ${values.sub_group_name} Updated Successfully`
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
    } catch (error) {
      setis_updating(false);
    }
  }, [is_updating]);

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
              is_updating ? "Update Sub Group Master" : "Add Sub Group Master"
            }
          />
          <Title
            title={
              is_updating ? "Update Sub Group Master" : "Add Sub Group Master"
            }
            parent_title="finance&accounts"
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
                        Sub-Group Code <span className="mandatory">*</span> :
                      </Label>
                      <Input
                        className="form-control d-block from control-md"
                        bsSize="sm"
                        name="sub_group_code"
                        type="number"
                        placeholder=" Enter Sub Group Code "
                        onChange={validation.handleChange}
                        value={validation.values.sub_group_code}
                      />
                    </div>
                  </Col>

                  <Col lg={4} md={6} sm={6}>
                    <div className="m-2 mb-2">
                      <Label className="header-child sm-10">
                        Sub-Group Name <span className="mandatory">*</span> :
                      </Label>
                      <Input
                        className="form-control d-block from control-md"
                        bsSize="sm"
                        name="sub_group_name"
                        type="text"
                        placeholder=" Enter Sub Group Name"
                        onChange={validation.handleChange}
                        value={validation.values.sub_group_name}
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
export default AddAccountSubGroupMaster;
