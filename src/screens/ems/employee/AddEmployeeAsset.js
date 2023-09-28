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
  Button,
} from "reactstrap";
import PageTitle from "../../../components/pageTitle/PageTitle";
import Title from "../../../components/title/Title";
import { IconContext } from "react-icons";
import { MdAddCircleOutline, MdRemoveCircleOutline } from "react-icons/md";
import { useFormik } from "formik";
import * as Yup from "yup";
import NSearchInput from "../../../components/formComponent/nsearchInput/NSearchInput";
import { setToggle } from "../../../store/pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ServerAddress } from "../../../constants/ServerAddress";
import {
  setAlertType,
  setDataExist,
  setShowAlert,
} from "../../../store/alert/Alert";
import toTitleCase from "../../../lib/titleCase/TitleCase";
import { FiCheckSquare, FiSquare } from "react-icons/fi";

function AddEmployeeAsset() {
  const user = useSelector((state) => state.authentication.userdetails);
  const accessToken = useSelector((state) => state.authentication.access_token);

  const [isupdating, setisupdating] = useState(false);

  //For Update
  const [get_item_data, setget_item_data] = useState("");
  const [get_item_data_id, setget_item_data_id] = useState("");

  const [circle_btn, setcircle_btn] = useState(true);
  const toggle_circle = () => {
    setcircle_btn(!circle_btn);
  };
  const dispatch = useDispatch();
  const location_data = useLocation();
  const navigate = useNavigate();

  // Item Mode
  const [item_mode_list, setitem_mode_list] = useState([
    ["Per Kg", "Per Kg"],
    ["Per Pkg", "Per Package"],
  ]);
  const [item_mode, setitem_mode] = useState("");
  const [item_mode_short, setitem_mode_short] = useState("");
  const [item_mode_error, setitem_mode_error] = useState(false);

  // Item Group
  const [item_group_list, setitem_group_list] = useState([
    ["Electronics", "Electronics"],
    ["Perishable", "Perishable"],
    ["Tea", "Tea"],
    ["others", "others"],
  ]);
  const [item_group, setitem_group] = useState("");
  const [item_group_short, setitem_group_short] = useState("");
  const [item_group_error, setitem_group_error] = useState(false);

  const handleAction = () => {
    dispatch(setToggle(true));
    navigate("/master/item");
  };

  // Cold Chain
  const [gst_exempt, setgst_exempt] = useState(false);

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      item_name: get_item_data.item_name || "",
      costing_ratio: get_item_data.costing_ratio || "",
    },
    validationSchema: Yup.object({
      item_name: Yup.string().required("Item name is required"),
      costing_ratio: Yup.number().required("Costing Ratio is required"),
    }),
    onSubmit: (values) => {
      console.log("Value is response", values);
      isupdating ? update_item_data(values) : send_item_data(values);
    },
  });

  const send_item_data = (values) => {
    axios
      .post(
        ServerAddress + "master/add-ItemMaster/",
        {
          item_name: values.item_name,
          item_mode: item_mode,
          item_group: item_group,
          costing_ratio: values.costing_ratio,
          st_exempt: gst_exempt === "false" ? "False" : "True",
          created_by: user.id,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (response) {
        console.log(response.data);
        if (response.statusText === "Created") {
          dispatch(setToggle(true));
          dispatch(
            setDataExist(`New Item "${values.item_name}" Added Sucessfully`)
          );
          dispatch(setAlertType("success"));
          dispatch(setShowAlert(true));
          navigate("/master/item");
        } else if (response.data === "duplicate") {
          dispatch(setShowAlert(true));
          dispatch(
            setDataExist(
              `Item Name "${toTitleCase(values.item_name)}" already exists`
            )
          );
          dispatch(setAlertType("warning"));
        }
      })
      .catch((error) => {
        alert(`Error Happen while posting Braches Data ${error}`);
      });
  };

  const update_item_data = (values) => {
    axios
      .put(
        ServerAddress + "master/put-ItemMaster/" + get_item_data_id,
        {
          item_name: values.item_name,
          item_mode: item_mode,
          item_group: item_group,
          costing_ratio: values.costing_ratio,
          st_exempt: gst_exempt === "false" ? "False" : "True",
          created_by: user.id,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        if (response.data.status === "success") {
          dispatch(setShowAlert(true));
          dispatch(setAlertType("warning"));
          dispatch(
            setDataExist(`Item ${values.item_name} Updated Successfully`)
          );
          navigate("/master/item");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    try {
      let item_m = location_data.state.item;
      setisupdating(true);
      setget_item_data(item_m);
      setget_item_data_id(item_m.id);
      setitem_mode(item_m.item_mode);
      setitem_group(item_m.item_group);
      setgst_exempt(true);
    } catch (error) {
      console.log(error);
    }
  }, []);

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
            <PageTitle page={isupdating ? "Update Item" : "Add Item"} />
            <Title
              title={isupdating ? "Update Item" : "Add Employee Asset"}
              parent_title="Masters"
            />

            {/*  Employee Asset */}
            <div className="m-3">
              <Col lg={12}>
                <Card className="shadow bg-white rounded">
                  <CardTitle className="mb-1 header">
                    <div className="header-text-icon header-text">
                      Employee Asset Info :
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
                          <div className="mb-3">
                            <Label className="header-child">
                              Employee: :<span className="mandatory">*</span>
                            </Label>
                            <Input
                              type="number"
                              min={0}
                              className="form-control-md"
                              id="input"
                              name="costing_ratio"
                              placeholder="Enter Costing Ratio"
                            />
                          </div>
                        </Col>

                        <Col lg={4} md={6} sm={6}>
                          <div className="mb-3">
                            <Label className="header-child">
                              Asset:
                              <span className="mandatory">*</span>
                            </Label>
                            <Input
                              type="number"
                              min={0}
                              className="form-control-md"
                              id="input"
                              name="costing_ratio"
                              placeholder="Enter Costing Ratio"
                            />
                          </div>
                        </Col>

                        <Col lg={4} md={6} sm={6}>
                          <div className="mb-3">
                            <Label className="header-child">
                              Asset ID:
                              <span className="mandatory">*</span>
                            </Label>
                            <Input
                              type="number"
                              min={0}
                              className="form-control-md"
                              id="input"
                              name="costing_ratio"
                              placeholder="Enter Costing Ratio"
                            />
                          </div>
                        </Col>

                        <Col lg={4} md={6} sm={6}>
                          <div className="mb-3">
                            <Label className="header-child">
                              Issue Date
                              <span className="mandatory">*</span>
                            </Label>
                            <Input
                              type="number"
                              min={0}
                              className="form-control-md"
                              id="input"
                              name="costing_ratio"
                              placeholder="Enter Costing Ratio"
                            />
                          </div>
                        </Col>

                        <Col lg={4} md={6} sm={6}>
                          <div className="mb-3">
                            <Label className="header-child">
                              Status
                              <span className="mandatory">*</span>
                            </Label>
                            <br />
                            <textarea
                              style={{ minHeight: "120px", minWidth: "320px" }}
                            />
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  ) : null}
                </Card>
              </Col>
            </div>
          </div>

          {/* fotter btn */}
          <div className="m-3">
            <Col lg={12}>
              <div className="mb-1 footer_btn">
                <Button type="submit" className="btn btn-success m-1 cu_btn">
                  {isupdating ? "Update" : "Save"}
                </Button>

                <Button
                  type="button"
                  className="btn btn-danger m-1 cu_btn"
                  onClick={handleAction}
                >
                  Cancel
                </Button>
              </div>
            </Col>
          </div>
        </Form>
      </div>
    </>
  );
}

export default AddEmployeeAsset;
