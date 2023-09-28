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


const AddTrainingShedule = () => {
  // const AccessToken = useSelector((state) => state.authentication.access_token);
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const location = useLocation();

  // Toggle Btn
  const [circle_btn, setcircle_btn] = useState(true);
  const toggle_circle = () => {
    setcircle_btn(!circle_btn);
  };

  //for update
  const [is_updating, setis_updating] = useState(false);

  const [programer, setprogramer] = useState("");
  const [duration, setduration] = useState("");
  const [cost, setcost] = useState(false);
  const [date, setdate] = useState(false);
  const [purpose, setpurpose] = useState("");

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      // This should be in small letter or smallcase
    },

    validationSchema: Yup.object({}),

    onSubmit: (values) => {
     
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
            page={is_updating ? "Update Sub Group Master" : "Training"}
          />
          <Title
            title={
              is_updating ? "Update Sub Group Master" : "Add Training Shedules"
            }
            parent_title="Training"
          />
        </div>

        <div className="m-4" id="section1">
          <Card className="shadow bg-white rounded">
            <CardTitle className="mb-1 header">
              <div className="header-text-icon header-text">
                Training Shedules
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
                    <div className="mb-2">
                      <Label className="header-child"> Programmer</Label>
                      <Input
                        type="text"
                        className="form-control d-block form-control-md"
                        id="input"
                        value={programer}
                        onChange={(val) => {
                          setprogramer(val.target.value);
                        }}
                      />
                    </div>
                  </Col>

                  <Col lg={4} md={6} sm={6}>
                    <div className="mb-2">
                      <Label className="header-child">Duration</Label>
                      <Input
                        type="number"
                        className="form-control d-block form-control-md"
                        id="input"
                        value={duration}
                        onChange={(val) => {
                          setduration(val.target.value);
                        }}
                      />
                    </div>
                  </Col>

                  <Col lg={4} md={6} sm={6}>
                    <div className="mb-2">
                      <Label className="header-child">cost</Label>
                      <Input
                        type="number"
                        className="form-control d-block form-control-md"
                        id="input"
                        value={cost}
                        onChange={(val) => {
                          setcost(val.target.value);
                        }}
                      />
                    </div>
                  </Col>

                  <Col lg={4} md={6} sm={6}>
                    <div className="mb-2">
                      <Label className="header-child">Purpose</Label>
                      <Input
                        type="text"
                        className="form-control d-block form-control-md"
                        id="input"
                        value={purpose}
                        onChange={(val) => {
                          setpurpose(val.target.value);
                        }}
                      />
                    </div>
                  </Col>

                  <Col lg={4} md={6} sm={6}>
                    <div className="mb-2">
                      <Label className="header-child">Date :</Label>
                      <Input
                        type="date"
                        className="form-control d-block form-control-md"
                        id="input"
                        value={date}
                        onChange={(val) => {
                          setdate(val.target.value);
                        }}
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
export default AddTrainingShedule;
