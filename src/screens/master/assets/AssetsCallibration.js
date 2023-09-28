/* eslint-disable */
import React, { useState, useEffect, useLayoutEffect } from "react";
// import "../../../multiassets/scss/forms/form.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Card,
  Col,
  Row,
  CardBody,
  CardTitle,
  Label,
  Input,
  FormFeedback,
  Form,
} from "reactstrap";
import { IconContext } from "react-icons";
import { MdAddCircleOutline, MdRemoveCircleOutline } from "react-icons/md";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import toTitleCase from "../../../lib/titleCase/TitleCase";
import { ServerAddress } from "../../../constants/ServerAddress";
import {
  setAlertType,
  setDataExist,
  setShowAlert,
} from "../../../store/alert/Alert";
import PageTitle from "../../../components/pageTitle/PageTitle";
import Title from "../../../components/title/Title";
import { setToggle } from "../../../store/pagination/Pagination";
import TransferList from "../../../components/formComponent/transferList/TransferList";
import SearchInput from "../../../components/formComponent/searchInput/SearchInput";

function AssetsCallibration() {
  const user = useSelector((state) => state.authentication.userdetails);
  const accessToken = useSelector((state) => state.authentication.access_token);
  const page_num = useSelector((state) => state.pagination.page_number);
  const data_len = useSelector((state) => state.pagination.data_length);
  const dispatch = useDispatch();
  const multiasset_data = useLocation();
  const navigate = useNavigate();
  const [isupdating, setisupdating] = useState(false);

  // Callibration
  const [callibration_from_date, setcallibration_from_date] = useState("")
  const [callibration_to_date, setcallibration_to_date] = useState("")
  const [issued_by, setissued_by] = useState("")
  const [issued_date, setissued_date] = useState("")
  const [document, setDocument] = useState('');
  const [base64URL, setBase64URL] = useState('');
  console.log("document---", document)
  console.log("base64URL---", base64URL)
  // Asset
  const [asset_list_1, setasset_list_1] = useState([]);
  const [asset_list_2, setasset_list_2] = useState([]);
  const [asset_page, setasset_page] = useState(1);
  const [asset_search, setasset_search] = useState("");
  const [asset_loaded, setasset_loaded] = useState(false)
  const [asset_count, setasset_count] = useState(1)
  const [asset_bottom, setasset_bottom] = useState(56)

  const [multiasset_error, setmultiasset_error] = useState(false)

  //Circle Toogle Btn
  const [circle_btn, setcircle_btn] = useState(true);
  const toggle_circle = () => {
    setcircle_btn(!circle_btn);
  };

  // Navigation At the time of Cancel
  const handleAction = () => {
    dispatch(setToggle(true));
    navigate("/master/assets");
  };

  const handleDocumentChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result;
      setBase64URL(base64);
    };
    reader.readAsDataURL(file);
    setDocument(file.name);
  };

  const update_asset_callibration = async () => {
    let assetid_list = asset_list_2.map((v) => v[0]).filter((v) => v !== null);

    let asset_ids = [...new Set(assetid_list.map((v) => `${v}`))].map((v) =>
      parseInt(v.split(","))
    );
    try {
      const response = await axios.post(ServerAddress + "master/update_asset_callibration/", {
        assets: asset_ids,
        callibration_from: callibration_from_date,
        callibration_to: callibration_to_date,
        issued_by: issued_by,
        issued_date: issued_date,
        certificate: base64URL,
        is_callibration: true,
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.statusText === "Created") {
        dispatch(setShowAlert(true));
        dispatch(
          setDataExist(
            `Callibration Updated Sucessfully`
          )
        );
        dispatch(setAlertType("success"));
        navigate("/master/assets");
      }
    } catch (error) {
      alert(`Error Happen while Updating Callibration ${error}`);
    }
  };

  const getAsset = () => {
    let temp3 = [];
    let data = [];
    axios
      .get(
        ServerAddress +
        `master/get_asset_details/?search=${""}&p=${asset_page}&records=${20}&asset_type=LOGGER&product_id_search=${asset_search}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        if (response.data.next === null) {
          setasset_loaded(false);
        } else {
          setasset_loaded(true);
        }

        if (response.data.results.length > 0) {
          data = response.data.results;
          console.log("data==========", data)
          if (asset_page === 1) {
            temp3 = response.data.results.map((v) => [
              v.id,
              v.asset_id +
              "-" +
              v.box_type +
              "-" +
              v.manufacturer_name
            ]);
          } else {
            temp3 = [
              ...asset_list_1,
              ...response.data.results.map((v) => [v.id, v.asset_id +
                "-" +
                v.box_type +
                "-" +
                v.manufacturer_name]),
            ];
          }
          setasset_count(asset_count + 2)
          setasset_list_1(temp3);
        }
        else {
          setasset_list_1([]);
        }
      })
      // .then((resp) => {
      //   setbranch_list(resp.data);
      // })
      .catch((err) => {
        alert(`Error Occur in Get`, err);
      });
  };


  useLayoutEffect(() => {
    getAsset();
  }, [asset_page, asset_search]);

  useEffect(() => {
    if (asset_list_2.length !== 0) {
      setmultiasset_error(false);
    }
  }, [asset_list_2])


  return (
    <div>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          if (callibration_from_date === "" || callibration_to_date === "" || issued_by === "" || issued_date === "" || base64URL === "") {
            alert("Please Fill All Callibaration Details")
          }
          else if (asset_list_2.length === 0) {
            setmultiasset_error(true);
          }
          else {
            update_asset_callibration()
          }
        }}
      >
        <div className="mt-3">
          <PageTitle
            page="Update Assets Callibaration"
          />
          <Title
            title="Assets Callibaration"
            parent_title="Masters"
          />
        </div>

        {/* Routes Info */}
        <div className="m-3">
          <Col lg={12}>
            <Card className="shadow bg-white rounded">
              <CardTitle className="mb-1 header">
                <div className="header-text-icon header-text">
                  Update Asset Callibaration
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
                    <Col lg={2} md={6} sm={6}>
                      <div className="mb-3">
                        <Label className="header-child">
                          Callibration From *
                        </Label>
                        <Input
                          type="date"
                          value={callibration_from_date}
                          className="form-control-md"
                          id="input"
                          onChange={(val) => {
                            setcallibration_from_date(val.target.value);
                          }}
                        />
                      </div>
                    </Col>

                    <Col lg={2} md={6} sm={6}>
                      <div className="mb-3">
                        <Label className="header-child">
                          Callibration To
                        </Label>
                        <Input
                          value={callibration_to_date}
                          type="date"
                          className="form-control-md"
                          id="input"
                          onChange={(val) => {
                            setcallibration_to_date(val.target.value);
                          }}
                        />
                      </div>
                    </Col>

                    <Col lg={3} md={6} sm={6}>
                      <div className="mb-3">
                        <Label className="header-child">
                          {/* Callibration */}
                          Certificate Issued By *
                        </Label>
                        <Input
                          value={issued_by}
                          type="text"
                          className="form-control-md"
                          id="input"
                          placeholder="Enter name"
                          onChange={(val) => {
                            setissued_by(val.target.value);
                          }}
                        />
                      </div>
                    </Col>

                    <Col lg={2} md={6} sm={6}>
                      <div className="mb-3">
                        <Label className="header-child">
                          {/* Callibration Certificate*/} Issued Date *
                        </Label>
                        <Input
                          value={issued_date}
                          type="date"
                          className="form-control-md"
                          id="input"
                          onChange={(val) => {
                            setissued_date(val.target.value);
                          }}
                        />
                      </div>
                    </Col>

                    <Col lg={2} md={6} sm={6}>
                      <div className="mb-3">
                        <Label className="header-child">
                          {/* Callibration */}
                          Certificate *
                        </Label>
                        <Input
                          className="form-control d-block from control-md"
                          name="document"
                          type="file"
                          id="input"
                          readOnly
                          onChange={(event) => { handleDocumentChange(event) }}
                        />
                      </div>
                    </Col>


                    <Label className="header-child">Asset *</Label>
                    <Col lg={12} md={12} sm={12}>
                      <TransferList
                        list_a={asset_list_1}
                        setlist_a={setasset_list_1}
                        list_b={asset_list_2}
                        setlist_b={setasset_list_2}
                        page={asset_page}
                        setpage={setasset_page}
                        error_message={"Please Select Any Option"}
                        setsearch_item={setasset_search}
                        loaded={asset_loaded}
                        count={asset_count}
                        bottom={asset_bottom}
                        setbottom={setasset_bottom}
                      />
                      {multiasset_error ? (
                        <div style={{ color: "#f46a6a", fontSize: "10.4px" }}>
                          Please Select At Least One Asset
                        </div>
                      ) : null}
                    </Col>
                  </Row>
                </CardBody>
              ) : null}
            </Card>
          </Col>
        </div>

        {/* Footer */}
        <div className="m-3">
          <Col lg={12}>
            <div className="mb-1 footer_btn">
              <Button type="submit" className="btn btn-info m-1 cu_btn">
                {isupdating ? "Update" : "Save"}
              </Button>

              <Button
                type="button"
                className="btn btn-info m-1 cu_btn"
                onClick={handleAction}
              >
                Cancel
              </Button>
            </div>
          </Col>
        </div>
      </Form>
    </div>
  );
}

export default AssetsCallibration;
