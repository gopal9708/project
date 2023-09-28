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
  Button,
  FormFeedback,
} from "reactstrap";
import PageTitle from "../../../../components/pageTitle/PageTitle";
import Title from "../../../../components/title/Title";
import { BsSave } from "react-icons/bs";
import { useState, useEffect, useLayoutEffect } from "react";
import { useFormik } from "formik"; //used for validation
import * as Yup from "yup"; //used for validation
import { useLocation, useNavigate } from "react-router-dom"; // For navigation
import { ServerAddress } from "../../../../constants/ServerAddress";
import axios from "axios";
import { useSelector } from "react-redux";
import { setShowAlert,setDataExist,setAlertType, } from "../../../../store/alert/Alert";
import { useDispatch } from "react-redux";
import toTitleCase from "../../../../lib/titleCase/TitleCase";
import NSearchInput from "../../../../components/formComponent/nsearchInput/NSearchInput";
import TransferList from "../../../../components/formComponent/transferList/TransferList";
const AddHoliday = () => {
  const AccessToken = useSelector((state) => state.authentication.access_token);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  console.log("location data is ", location);

  // Toggle Btn
  const [circle_btn, setcircle_btn] = useState(true);
  const toggle_circle = () => {
    setcircle_btn(!circle_btn);
  };

  // For Update
  const [is_updating, setis_updating] = useState(false);
  //Get Updated Location Data
  const [branch, setbranch] = useState([]);
  const [refresh, setrefresh] = useState(false);

  const [from_date, setfrom_date] = useState("");
  const [end_date, setend_date] = useState("");
  const [descripation, setdescripation] = useState("");
  const user = useSelector((state) => state.authentication.userdetails);
  // console.log("ther usrs info is === ",user);


  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      // This should be in small letter or smallcase
      holiday: branch.name || "",
    },

    validationSchema: Yup.object({

    }),
    

    onSubmit: (values) => {
      console.log("first----------", values);
      is_updating ? update_holiday_data(values) : send_holiday_data(values);
    },
  });

  //get brnch
  const [op_branch_list, setop_branch_list] = useState([]);
  const [op_branch, setop_branch] = useState("");
  const [op_branch_id, setop_branch_id] = useState("");
  const [op_branch_page, setop_branch_page] = useState(1);
  const [op_branch_search, setop_branch_search] = useState("");
  const [op_branch_loaded, setop_branch_loaded] = useState(false);
  const [op_branch_count, setop_branch_count] = useState(1);
  const [op_branch_bottom, setop_branch_bottom] = useState(103);
  const [op_branch_err, setop_branch_err] = useState(false);
  const [op_branch_list2, setop_branch_list2] = useState([]);
  console.log("op_branch_list2=====",op_branch_list2)


  // const get_op_branch = async () => {
  //   let depart = [];
  //   try {
  //     const response = await axios.get(
  //       ServerAddress +
  //         `master/get-Branch/?p=${op_branch_page}&records=${10}&op_branch_search=${op_branch_search}`,
  //       {
  //         headers: { Authorization: `Bearer ${AccessToken}` },
  //       }
  //     );
  //     if (response.data.next === null) {
  //       console.log("the op branch data ===",response)
  //       setop_branch_loaded(false);
  //     } else {
  //       setop_branch_loaded(true);
  //     }
  //     if (response.data.results.length > 0) {
  //       if (op_branch_page === 1) {
  //         depart = response.data.results.map((v) => [
  //           v.id,
  //           toTitleCase(v.branch_name),
  //         ]);
  //       } else {
  //         depart = [
  //           ...op_branch_list,
  //           response.data.results.map((v) => [
  //             v.id,
  //             toTitleCase(v.branch_name),
  //           ]),
  //         ];
  //       }
  //     }
  //     setop_branch_count(op_branch_count + 2);
  //     setop_branch_list(depart);
  //   } catch (err) {
  //     alert(`Error Occur in Get Departments, ${err}`);
  //   }
  // };

  // useEffect(() => {
  //   get_op_branch();
  // }, [op_branch_page, op_branch_search]);

  const get_op_branch = (place_id, filter_by, val) => {
    let temp_2 = [];
    let temp = [];
    axios
      .get(
        ServerAddress +
        `master/get-branch-transfer/?search=${""}&p=${op_branch_page}&records=${20}&city_search=${op_branch_search}&place_id=${place_id}&filter_by=${filter_by}&data=${val}`,
        {
          headers: { Authorization: `Bearer ${AccessToken}` },
        }
      )
      .then((response) => {
        temp = response.data.results;
        console.log("temp-----", temp)
        if (temp.length > 0) {
          if (response.data.next === null) {
            console.log("the op branch data is===",response)
            setop_branch_loaded(false);
          } else {
            setop_branch_loaded(true);
          }
          if (op_branch_page === 1) {
            temp_2 = response.data.results.map((v) => [
              v.id,
              toTitleCase(v.branch_name),
            ]);
          } else {
            temp_2 = [
              ...op_branch_list,
              // ...operating_city_list,
              ...response.data.results.map((v) => [
                v.id,
                toTitleCase(v.branch_name),
              ]),
            ];
          }

          setop_branch_count(op_branch_count + 2);
          setop_branch_list(temp_2)
        }
        else {
          setop_branch_count([])
        }
      });
  };
  useEffect(() => {
    if ( location.state === null) {
      get_op_branch('all', 'all', 'all');
    }
    else if (location.state !== null) {
      get_op_branch('all', 'all', parseInt(location.state.item.id));
    }
  }, [  op_branch_page, op_branch_search]);

  const get_OpBranchDetails = (id) => {
    let opbranch_temp = [];
    let data = [];
    axios
      .get(
        ServerAddress +
        `organization/Get_Branch_Station/?operating_branch=${id}`,
        {
          headers: { Authorization: `Bearer ${AccessToken}` },
        }
      )
      .then((response) => {
        console.log("the get branch respone ===",response)
        data = response.data.operating_branch;

        if (data.length > 0) {
          console.log("data is", data);
          opbranch_temp = data.map((v) => [v.branch, toTitleCase(v.branch__branch_name)]);
          setop_branch_list2(opbranch_temp)
        }
      })
      .catch((err) => {
        alert(`Error Occur in Get opBranch, ${err}`);
      });
  };

  useEffect(() => {
    if (op_branch_list2 !== "") {
      // setop_branch_err(false);
    }
  }, [op_branch_list2, refresh]);

  useEffect(() => {

    if (location.state !== null && branch.length !== 0) {
      get_OpBranchDetails(branch.id)
    }
  }, [branch])

  const send_holiday_data = (values) =>{
    let op_branch_id = op_branch_list2.map((v) => v[0]);
    console.log("op branch id===",op_branch_id)

    let op_branch_id_list = [...new Set(op_branch_id.map((v) => `${v}`))].map((v) =>
      parseInt(v.split(","))
    );
    console.log("op_branch_id_list=====",op_branch_id_list)
    axios
    .post(
      ServerAddress + "organization/add_holiday/",
      {
        organization:user.organization_id,
        branch_name:user.home_branch,
        from_date:from_date,
        end_date:end_date,
        name:values.holiday,
        description: toTitleCase(descripation).toUpperCase(),
        branch: op_branch_id_list,
      },
      {
        headers: {
          Authorization: `Bearer ${AccessToken}`,
        },
      }
    )
    .then((response) => {
      if (response.data.status === "success") {
        dispatch(setShowAlert(true));
        dispatch(setAlertType("Warning"));
        dispatch(
          setDataExist(`Add HoliDay  ${values.holiday} is Added Successfully`)
        );
        // alert ("Data Add Ho Gaya");
        navigate("/organisation/holidays/HolidayMain");
      }
    })
    .catch((error) => {
      console.log(error);
    }); 
  }
  const update_holiday_data = (values) => {
    let id = branch.id;
    let op_branch_id_list = op_branch_list2.map((v) => v[0]);

    console.log("op_branch_id_list111111111111111",op_branch_id_list)
    let op_branch_ids = [...new Set(op_branch_id_list.map((v) => `${v}`))].map((v) =>
      parseInt(v.split(","))
    );
    for (let index = 0; index <op_branch_list2.length; index++) {
      const op_branch_id = op_branch_list2[index];
      console.log("op_branch_id----",)
      op_branch_id_list.push(op_branch_id[0]);
    }

    axios
      .put(
        ServerAddress + "organization/update_holiday/"  + branch.id ,
        {
        organization:user.organization_id,
        from_date:from_date,
        end_date:end_date,
        name:values.holiday,
        description: toTitleCase(descripation).toUpperCase(),
        branch_name:user.home_branch,
        branch: op_branch_ids,
        },
        {
          headers: { Authorization: `Bearer ${AccessToken}` },
        }
      )
      .then((response) => {
        console.log("response", response);
        if (response.data.status === "success") {
          dispatch(setShowAlert(true));
          dispatch(setAlertType("warning"));
          dispatch(
            setDataExist(`Fund Master ${values.holiday} Updated Successfully`)
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
      let data = location.state.item;
      console.log("location is", location);
      setis_updating(true);
      setbranch(data);
      setfrom_date(data.from_date);
      setend_date(data.end_date);
      setdescripation(data.description);

    } catch (error) {
      setis_updating(false);
    }
  }, [ ]);
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
          <PageTitle page={is_updating ? "Update Holiday" : "Add Holiday"} />
          <Title
            title={is_updating ? "Update Holiday" : "Add Holiday"}
            parent_title="Organisation"
          />
        </div>

        <div className="m-4" id="section1">
          <Card className="shadow bg-white rounded">
            <CardTitle className="mb-1 header">
              <div className="header-text-icon header-text">
                Add Holiday
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
                        From Date <span className="mandatory">*</span>
                      </Label>
                      <Input
                        value={from_date}
                        onChange={(val) => {
                          setfrom_date(val.target.value);
                        }}
                        className="form-control d-block from control-md"
                        bsSize="sm"
                        name="from_date"
                        type="date"

                      />
                    </div>
                  </Col>
                  
                  <Col lg={4} md={6} sm={6}>
                    <div className="m-2 mb-2">
                      <Label className="header-child sm-10">
                        End Date <span className="mandatory">*</span>
                      </Label>
                      <Input
                        value={end_date}
                        onChange={(val) => {
                          setend_date(val.target.value);
                        }}
                        className="form-control d-block from control-md"
                        bsSize="sm"
                        name="end_date"
                        type="date"
                      />
                    </div>
                  </Col>

                  <Col lg={4} md={6} sm={6}>
                    <div className="m-2 mb-2">
                      <Label className="header-child sm-10">
                        Holiday Name<span className="mandatory">*</span>
                      </Label>
                      <Input
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.holiday}
                        invalid={
                          validation.touched.holiday &&
                          validation.errors.holiday
                            ? true
                            : false
                        }
                        className="form-control d-block from control-md"
                        bsSize="sm"
                        name="holiday"
                        type="text"
                        placeholder=" Enter holiday"
                      />
                      {validation.touched.holiday &&
                      validation.errors.holiday ? (
                        <FormFeedback type="invalid">
                          {validation.errors.holiday}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>
                  <Col lg={4} md={6} sm={6}>
                        <div className="mb-3">
                          <Label className="header-child">Description</Label>
                          <br />
                          <textarea
                            style={{
                              width: "auto",
                              minWidth: "300px",
                              height: "90px",
                              borderRadius: "8px",
                            }}
                            type="text"
                            cols="20"
                            wrap="hard"
                            maxLength="200"
                            rows="1"
                            max-rows="3"
                            value={descripation}
                            onChange={(val) => {
                              setdescripation(val.target.value);
                            }}
                          />
                        </div>
                      </Col>
                </Row>

                <Label className="header-child">
                  Operating Branch<span className="mandatory">*</span>{" "}
                </Label>
                <Col lg={12} md={12} sm={12}>
                  <TransferList
                    list_a={op_branch_list}
                    setlist_a={setop_branch_list}
                    list_b={op_branch_list2}
                    setlist_b={setop_branch_list2}
                    page={op_branch_page}
                    setpage={setop_branch_page}
                    setsearch_item={setop_branch_search}
                    loaded={op_branch_loaded}
                    count={op_branch_count}
                    bottom={op_branch_bottom}
                    setbottom={setop_branch_bottom}
                  />
                  {op_branch_err ? (
                    <div style={{ color: "#f46a6a", fontSize: "10.4px" }}>
                      Please Select operating branch
                    </div>
                  ) : null}
                </Col>
              </CardBody>
            ) : null}
          </Card>
        </div>

        {/*Button */}
        <div className="m-4">
        <Col lg={12}>
            <div className="mb-1 footer_btn">
            <Button type="submit" className="btn btn-success m-1 cu_btn">
                  {is_updating ? "Update" : "Save"}
                </Button>

                <button
                type="button"
                className="btn btn-danger m-1 cu_btn"
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
export default AddHoliday;
