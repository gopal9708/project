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
import { useState, useLayoutEffect } from "react";
import { useFormik } from "formik"; //used for validation
import * as Yup from "yup"; //used for validation
import { useNavigate } from "react-router-dom"; // For navigation
import { ServerAddress } from "../../../../constants/ServerAddress";
import axios from "axios";
import { useSelector } from "react-redux";
import NSearchInput from "../../../../components/formComponent/nsearchInput/NSearchInput";
import SearchInput from "../../../../components/formComponent/searchInput/SearchInput";

const AddTraining = () => {
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
  const [ins, setins] = useState("");
  const [duration, setduration] = useState("");
  const [cost, setcost] = useState(false);
  const [objective, setobjective] = useState("");
  const [start_date, setstart_date] = useState("");
  const [end_date, setend_date] = useState("");
  const [bussiness, setbussiness] = useState("");
  const [prepration, setprepration] = useState("");
  const [skill, setskill] = useState("");
  const [knowledge, setknowledge] = useState("");
  const [comments, setcomments] = useState("");
  const [currency, setcurrency] = useState("");
  const [currency_list, setcurrency_list] = useState(["abc", "xyz"]);

  const [supervisor, setsupervisor] = useState("");
  const [hold, sethold] = useState("");
  const [hr, sethr] = useState("");
  const [cfo, setcfo] = useState("");
  const [ceo, setceo] = useState("");
  const [status, setstatus] = useState("");

  const accessToken = useSelector((state) => state.authentication.access_token);
  const [applicant, setapplicant] = useState("");
  const [applicant_list, setapplicant_list] = useState("");
  const [applicant_err, setapplicant_err] = useState(false);
  const [applicant_id, setapplicant_id] = useState("");
  const [page, setpage] = useState(1);
  const [search_branch, setsearch_branch] = useState("");

  const [leave_search, setleave_search] = useState("");

 
  //leave tracker
  const getapplicant = () => {
    let temp3 = [];
    let data = [];
    axios
      .get(
        ServerAddress +
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
      )
      .then((response) => {
        if (response.data.results.length > 0) {
          data = response.data.results;
          for (let index = 0; index < data.length; index++) {
            temp3.push([data[index].id, data[index].leave_tracker]);
          }
          temp3 = [...new Set(temp3.map((v) => `${v}`))].map((v) =>
            v.split(",")
          );
          setapplicant_list(temp3);
        }
      })
      // .then((resp) => {
      //   sethome_branch_list(resp.data);
      // })
      .catch((err) => {
        alert(`Error Occur in Get`, err);
      });
  };

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      // This should be in small letter or smallcase
    },

    validationSchema: Yup.object({}),

    onSubmit: (values) => {
      
    },
  });

  useLayoutEffect(() => {
    getapplicant();
  }, [page, search_branch]);

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
            title={is_updating ? "Update Sub Group Master" : "Add Training"}
            parent_title="Training"
          />
        </div>

        <div className="m-4" id="section1">
          <Card className="shadow bg-white rounded">
            <CardTitle className="mb-1 header">
              <div className="header-text-icon header-text">
                Training
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
                      <Label className="header-child">Applicant</Label>
                      <SearchInput
                        data_list={applicant_list}
                        setdata_list={setapplicant_list}
                        data_item_s={applicant}
                        set_data_item_s={setapplicant}
                        page={page}
                        setpage={setpage}
                        set_id={setapplicant_id}
                        setsearch_item={setleave_search}
                      />
                    </div>
                  </Col>

                  <Col lg={4} md={6} sm={6}>
                    <div className="mb-2">
                      <Label className="header-child"> Programme</Label>
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
                      <Label className="header-child">Institutation</Label>
                      <Input
                        type="text"
                        className="form-control d-block form-control-md"
                        id="input"
                        value={ins}
                        onChange={(val) => {
                          setins(val.target.value);
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
                        min={0}
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
                        min={0}
                        value={cost}
                        onChange={(val) => {
                          setcost(val.target.value);
                        }}
                      />
                    </div>
                  </Col>

                  {/* <Col lg={4} md={6} sm={6}>
                      <div className="mb-3">
                        <Label className="header-child">Approver</Label>
                        <div onClick={() => setapproved(!approved)}>
                          {approved ? (
                            <FiCheckSquare size={18} />
                          ) : (
                            <FiSquare size={18} />
                          )}
                        </div>
                      </div>
                    </Col> */}

                  <Col lg={4} md={6} sm={6}>
                    <div className="mb-2">
                      <Label className="header-child">Start Date :</Label>
                      <Input
                        type="date"
                        className="form-control d-block form-control-md"
                        id="input"
                        value={start_date}
                        onChange={(val) => {
                          setstart_date(val.target.value);
                        }}
                      />
                    </div>
                  </Col>

                  <Col lg={4} md={6} sm={6}>
                    <div className="mb-2">
                      <Label className="header-child">End Date :</Label>
                      <Input
                        type="date"
                        className="form-control d-block form-control-md"
                        id="input"
                        value={end_date}
                        onChange={(val) => {
                          setend_date(val.target.value);
                        }}
                      />
                    </div>
                  </Col>

                  {/* <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">Leave tracker</Label>
                        <SearchInput
                          data_list={leave_tracker_list}
                          setdata_list={setleave_tracker_list}
                          data_item_s={leave}
                          set_data_item_s={setleave}
                          page={leave_page}
                          setpage={setleave_page}
                          set_id={setleave_tracker_id}
                          setsearch_item={setsearch_branch}
                        />
                      </div>
                     
                    </Col> */}

                  <Col lg={4} md={6} sm={6}>
                    <div className="mb-2">
                      <Label className="header-child">Bussiness Case :</Label>
                      <Input
                        type="text"
                        className="form-control d-block form-control-md"
                        id="input"
                        value={bussiness}
                        onChange={(val) => {
                          setbussiness(val.target.value);
                        }}
                      />
                    </div>
                  </Col>

                  <Col lg={4} md={6} sm={6}>
                    <div className="mb-2">
                      <Label className="header-child">Objective</Label>
                      <Input
                        type="text"
                        className="form-control d-block form-control-md"
                        id="input"
                        value={objective}
                        onChange={(val) => {
                          setobjective(val.target.value);
                        }}
                      />
                    </div>
                  </Col>

                  <Col lg={4} md={6} sm={6}>
                    <div className="mb-2">
                      <Label className="header-child">Preprations</Label>
                      <Input
                        type="text"
                        className="form-control d-block form-control-md"
                        id="input"
                        value={prepration}
                        onChange={(val) => {
                          setprepration(val.target.value);
                        }}
                      />
                    </div>
                  </Col>

                  <Col lg={4} md={6} sm={6}>
                    <div className="mb-2">
                      <Label>Skill </Label>
                      <Input
                        type="text"
                        className="form-control d-block form-control-md"
                        id="input"
                        value={skill}
                        onChange={(val) => {
                          setskill(val.target.value);
                        }}
                      />
                    </div>
                  </Col>

                  <Col lg={4} md={6} sm={6}>
                    <div className="mb-2">
                      <Label>knowledge </Label>
                      <Input
                        type="text"
                        className="form-control d-block form-control-md"
                        id="input"
                        value={knowledge}
                        onChange={(val) => {
                          setknowledge(val.target.value);
                        }}
                      />
                    </div>
                  </Col>

                  <Col lg={4} md={6} sm={6}>
                    <div className="mb-2">
                      <Label>Comments </Label>
                      <Input
                        type="text"
                        className="form-control d-block form-control-md"
                        id="input"
                        value={comments}
                        onChange={(val) => {
                          setcomments(val.target.value);
                        }}
                      />
                    </div>
                  </Col>

                  <Col lg={4} md={6} sm={6}>
                    <div className="mb-2">
                      <Label>Currency </Label>
                      <NSearchInput
                        data_list={currency_list}
                        data_item_s={currency}
                        className="form-control d-block form-control-md"
                        id="input"
                        value={currency}
                        onChange={(val) => {
                          setcurrency(val.target.value);
                        }}
                      />
                    </div>
                  </Col>

                  <Col lg={4} md={6} sm={6}>
                    <div className="mb-2">
                      <Label>Supervisor </Label>
                      <Input
                        type="text"
                        className="form-control d-block form-control-md"
                        id="input"
                        value={supervisor}
                        onChange={(val) => {
                          setsupervisor(val.target.value);
                        }}
                      />
                    </div>
                  </Col>

                  <Col lg={4} md={6} sm={6}>
                    <div className="mb-2">
                      <Label>Hold Approval</Label>
                      <Input
                        type="text"
                        className="form-control d-block form-control-md"
                        id="input"
                        value={hold}
                        onChange={(val) => {
                          sethold(val.target.value);
                        }}
                      />
                    </div>
                  </Col>

                  <Col lg={4} md={6} sm={6}>
                    <div className="mb-2">
                      <Label>Hr Approval</Label>
                      <Input
                        type="text"
                        className="form-control d-block form-control-md"
                        id="input"
                        value={hr}
                        onChange={(val) => {
                          sethr(val.target.value);
                        }}
                      />
                    </div>
                  </Col>

                  <Col lg={4} md={6} sm={6}>
                    <div className="mb-2">
                      <Label>Cfo Approval</Label>
                      <Input
                        type="text"
                        className="form-control d-block form-control-md"
                        id="input"
                        value={cfo}
                        onChange={(val) => {
                          setcfo(val.target.value);
                        }}
                      />
                    </div>
                  </Col>

                  <Col lg={4} md={6} sm={6}>
                    <div className="mb-2">
                      <Label>Ceo Approval</Label>
                      <Input
                        type="text"
                        className="form-control d-block form-control-md"
                        id="input"
                        value={ceo}
                        onChange={(val) => {
                          setceo(val.target.value);
                        }}
                      />
                    </div>
                  </Col>

                  <Col lg={4} md={6} sm={6}>
                    <div className="mb-2">
                      <Label>Status</Label>
                      <Input
                        type="text"
                        className="form-control d-block form-control-md"
                        id="input"
                        value={status}
                        onChange={(val) => {
                          setstatus(val.target.value);
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
export default AddTraining;
