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
import { useState, useLayoutEffect } from "react";
import { useFormik } from "formik"; //used for validation
import * as Yup from "yup"; //used for validation
import { useNavigate } from "react-router-dom"; // For navigation
import { ServerAddress } from "../../../../constants/ServerAddress";
import axios from "axios";
import { useSelector } from "react-redux";
import SearchInput from "../../../../components/formComponent/searchInput/SearchInput";

const AddLeaveTracker = () => {
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
  //for dropdown
  const [date, setdate] = useState("");
  const [from_date, setfrom_date] = useState("");
  const [approved, setapproved] = useState(false);
  const [to_date, setto_date] = useState("");

  const [user_list, setuser_list] = useState("");
  const [user, setuser] = useState("");
  const [user_id, setuser_id] = useState("");
  const [page, setpage] = useState(1);
  const [search_branch, setsearch_branch] = useState("");

  const [leave_tracker_list, setleave_tracker_list] = useState("");
  const [leave, setleave] = useState("");
  const [leave_tracker_id, setleave_tracker_id] = useState("");
  const [leave_page, setleave_page] = useState(1);
  const accessToken = useSelector((state) => state.authentication.access_token);
  const [leave_search, setleave_search] = useState("");

  const getBranches = () => {
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
            temp3.push([data[index].id, data[index].branch_name]);
          }
          temp3 = [...new Set(temp3.map((v) => `${v}`))].map((v) =>
            v.split(",")
          );
          setuser_list(temp3);
        }
      })
      // .then((resp) => {
      //   sethome_branch_list(resp.data);
      // })
      .catch((err) => {
        alert(`Error Occur in Get`, err);
      });
  };
  //leave tracker
  const getleave_tracker = () => {
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
          setleave_tracker_list(temp3);
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
    getBranches();
  }, [page, search_branch]);

  useLayoutEffect(() => {
    getleave_tracker();
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
            page={is_updating ? "Update Sub Group Master" : "Leave Tracker"}
          />
          <Title
            title={
              is_updating ? "Update Sub Group Master" : "Add Leave Tracker"
            }
            parent_title="Leave Tracker"
          />
        </div>

        <div className="m-4" id="section1">
          <Card className="shadow bg-white rounded">
            <CardTitle className="mb-1 header">
              <div className="header-text-icon header-text">
                Leave Tracker
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
                      <Label className="header-child">User</Label>
                      <SearchInput
                        data_list={user_list}
                        setdata_list={setuser_list}
                        data_item_s={user}
                        set_data_item_s={setuser}
                        page={page}
                        setpage={setpage}
                        set_id={setuser_id}
                        setsearch_item={setleave_search}
                      />
                    </div>
                  </Col>

                  <Col lg={4} md={6} sm={6}>
                    <div className="mb-2">
                      <Label className="header-child"> Date :</Label>
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

                  <Col lg={4} md={6} sm={6}>
                    <div className="mb-2">
                      <Label className="header-child">From Date :</Label>
                      <Input
                        type="date"
                        className="form-control d-block form-control-md"
                        id="input"
                        value={from_date}
                        onChange={(val) => {
                          setfrom_date(val.target.value);
                        }}
                      />
                    </div>
                  </Col>

                  <Col lg={4} md={6} sm={6}>
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
                  </Col>

                  <Col lg={4} md={6} sm={6}>
                    <div className="mb-2">
                      <Label className="header-child">To Date :</Label>
                      <Input
                        type="date"
                        className="form-control d-block form-control-md"
                        id="input"
                        value={to_date}
                        onChange={(val) => {
                          setto_date(val.target.value);
                        }}
                      />
                    </div>
                  </Col>

                  <Col lg={4} md={6} sm={6}>
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
export default AddLeaveTracker;
