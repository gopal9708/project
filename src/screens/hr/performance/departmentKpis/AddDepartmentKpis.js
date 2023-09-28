import React, { useState } from "react";
import {
  Col,
  Card,
  CardTitle,
  Form,
  CardBody,
  Row,
  Label,
  Input,
  Button,
} from "reactstrap";
import PageTitle from "../../../../components/pageTitle/PageTitle";
import Title from "../../../../components/title/Title";
import { IconContext } from "react-icons";
import { MdAddCircleOutline, MdRemoveCircleOutline } from "react-icons/md";
import { useFormik } from "formik";
import * as Yup from "yup";
import NSearchInput from "../../../../components/formComponent/nsearchInput/NSearchInput";
import { setToggle } from "../../../../store/pagination/Pagination";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function AddDepartmentKpis() {
  const dispatch = useDispatch();
  // const location = useLocation();
  const navigate = useNavigate();

  // Redux state
  // const user = useSelector((state) => state.authentication.userdetails);
  // const accessToken = useSelector((state) => state.authentication.access_token);

  // for toggle btn
  const [circle_btn, setcircle_btn] = useState(true);
  const toggle_circle = () => {
    setcircle_btn(!circle_btn);
  };

  // usestate
  const [isupdating, setisupdating] = useState(false);

  const [department, setdepartment] = useState("");
  const [department_list, setdepartment_list] = useState([
    "Account",
    "HR",
    "Operation",
  ]);

  // Function to handle cancel btn
  const handleAction = () => {
    dispatch(setToggle(true));
    navigate("/master/item");
  };

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      item_name: "",
    },
    validationSchema: Yup.object({
      item_name: Yup.string().required("Item name is required"),
    }),
    onSubmit: (values) => {
      // isupdating ? update_item_data(values) : send_item_data(values);
    },
  });

  // const sen_advertisment = (values) => {
  //   axios
  //     .post(
  //       ServerAddress + "master/add-ItemMaster/",
  //       {
  //         item_name: values.item_name,
  //         item_mode: item_mode,
  //         item_group: item_group,
  //         costing_ratio: values.costing_ratio,
  //         st_exempt: gst_exempt === "false" ? "False" : "True",
  //         created_by: user.id,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       }
  //     )
  //     .then(function (response) {
  //       console.log(response.data);
  //       if (response.statusText === "Created") {
  //         dispatch(setToggle(true));
  //         dispatch(
  //           setDataExist(`New Item "${values.item_name}" Added Sucessfully`)
  //         );
  //         dispatch(setAlertType("success"));
  //         dispatch(setShowAlert(true));
  //         navigate("/master/item");
  //       } else if (response.data === "duplicate") {
  //         dispatch(setShowAlert(true));
  //         dispatch(
  //           setDataExist(
  //             `Item Name "${toTitleCase(values.item_name)}" already exists`
  //           )
  //         );
  //         dispatch(setAlertType("warning"));
  //       }
  //     })
  //     .catch((error) => {
  //       alert(`Error Happen while posting Braches Data ${error}`);
  //     });
  // };

  return (
    <>
      <div>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            // validation.handleSubmit(e.values);
            return false;
          }}
        >
          <div className="mt-3">
            <PageTitle
              page={isupdating ? "Update Department kpi" : "Add Department kpi"}
            />
            <Title
              title={
                isupdating ? "Update Department kpi" : "Add Department kpi"
              }
              parent_title="Performance"
            />
            <div className="m-3">
              <Col lg={12} md={12} sm={12}>
                <Card className="shadow bg-white rounded">
                  <CardTitle className="mb-1 header">
                    <div className="header-text-icon header-text">
                      Basic Info
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
                        <Col lg={4} md={4} sm={6}>
                          <div className="mb-2">
                            <Label className="header-child">
                              Department: <span className="mandatory">*</span>
                            </Label>
                            {/* SearchInput is required */}
                            <NSearchInput
                              data_list={department_list}
                              data_item_s={department}
                              set_data_item_s={setdepartment}
                            />
                          </div>
                        </Col>

                        <Col lg={4} md={4} sm={6}>
                          <div className="mb-2">
                            <Label className="header-child">
                              Measure of success: :{" "}
                              <span className="mandatory">*</span>
                            </Label>
                            <Input
                              type="text"
                              className="form-control-md"
                              id="input"
                              placeholder="Enter Measure of success"
                            />
                          </div>
                        </Col>

                        <Col lg={4} md={4} sm={6}>
                          <div className="mb-2">
                            <Label className="header-child">
                              Weight: <span className="mandatory">*</span>
                            </Label>
                            <Input
                              type="number"
                              min={0}
                              className="form-control-md"
                              id="input"
                              placeholder="Enter Weight"
                            />
                          </div>
                        </Col>

                        <Col lg={4} md={4} sm={6}>
                          <div className="mb-2">
                            <Label className="header-child">
                              Score: <span className="mandatory">*</span>
                            </Label>
                            <Input
                              type="number"
                              min={0}
                              className="form-control-md"
                              id="input"
                              placeholder="Enter Score"
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

          {/* footer btn */}
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

export default AddDepartmentKpis;
