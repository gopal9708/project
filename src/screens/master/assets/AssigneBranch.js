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

function AssigneBranch() {
  const user = useSelector((state) => state.authentication.userdetails);
  const accessToken = useSelector((state) => state.authentication.access_token);
  const page_num = useSelector((state) => state.pagination.page_number);
  const data_len = useSelector((state) => state.pagination.data_length);
  const dispatch = useDispatch();
  const multiasset_data = useLocation();
  const navigate = useNavigate();
  const [isupdating, setisupdating] = useState(false);

  // Asset
  const [asset_list_1, setasset_list_1] = useState([]);
  const [asset_list_2, setasset_list_2] = useState([]);
  const [asset_page, setasset_page] = useState(1);
  const [asset_search, setasset_search] = useState("");
  const [asset_loaded, setasset_loaded] = useState(false)
  const [asset_bottom, setasset_bottom] = useState(56)
  const [asset_count, setasset_count] = useState(1)
  const [asset_error, setasset_error] = useState(false)

  //BranCh
  const [branch_id, setbranch_id] = useState("");
  const [branch_list, setbranch_list] = useState([]);
  const [branch, setbranch] = useState("");
  const [page, setpage] = useState(1);
  const [search_branch, setsearch_branch] = useState("");
  const [branch_err, setbranch_err] = useState("");
  const [branch_loaded, setbranch_loaded] = useState(false)
  const [branch_count, setbranch_count] = useState(1)
  const [branch_bottom, setbranch_bottom] = useState(103)
  const [branch_error, setbranch_error] = useState(false)

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

  const update_asset_branch = async () => {
    let assetid_list = asset_list_2.map((v) => v[0]).filter((v) => v !== null);

    let asset_ids = [...new Set(assetid_list.map((v) => `${v}`))].map((v) =>
      parseInt(v.split(","))
    );
    try {
      const response = await axios.post(ServerAddress + "master/update_asset_callibration/", {
        assets: asset_ids,
        branch_id: branch_id,
        is_callibration: false,
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

  const getBranches = () => {
    let temp3 = [];
    let data = [];
    axios
      .get(
        ServerAddress +
          `master/all-branches/?search=${""}&p=${page}&records=${10}&branch_name=${[
            "",
          ]}&branch_city=${[""]}&vendor=${[""]}&branch_search=${search_branch}&data=all`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        if (response.data.next === null) {
          setbranch_loaded(false);
        } else {
          setbranch_loaded(true);
        }

        if (response.data.results.length > 0) {
          data = response.data.results;
          if (page === 1) {
            temp3 = response.data.results.map((v) => [
              v.id,
              toTitleCase(v.name),
            ]);
          } else {
            temp3 = [
              ...branch_list,
              ...response.data.results.map((v) => [v.id, toTitleCase(v.name)]),
            ];
          }
          setbranch_count(branch_count+2)
          setbranch_list(temp3);
        }
        else{
          setbranch_list([])
        }
      })
      // .then((resp) => {
      //   setbranch_list(resp.data);
      // })
      .catch((err) => {
        console.warn(`Error Occur in Get`, err);
      });
  };

  const getAsset = () => {
    let temp3 = [];
    let data = [];
    axios
      .get(
        ServerAddress +
          `master/get_asset_details/?search=${""}&p=${asset_page}&records=${20}&asset_type=BOTH&product_id_search=${asset_search}`,
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
             (v.manufacturer_name ? v.manufacturer_name : v.product_id)
            ]);
          } else {
            temp3 = [
              ...asset_list_1,
              ...response.data.results.map((v) => [v.id, v.asset_id+
                "-" +
                v.box_type +
                "-" +
                (v.manufacturer_name ? v.manufacturer_name : v.product_id)]),
            ];
          }
          setasset_count(asset_count+2)
          setasset_list_1(temp3);
        }
        else{
          setasset_list_1([]);
        }
      })
      // .then((resp) => {
      //   setbranch_list(resp.data);
      // })
      .catch((err) => {
        console.warn(`Error Occur in Get`, err);
      });
  };

  useLayoutEffect(() => {
    getBranches();
  }, [page, search_branch]);

  useLayoutEffect(() => {
    getAsset();
  }, [asset_page, asset_search]);

  useEffect(() => {
    if (branch !== "") {
      setbranch_error(false);
    }
  }, [branch])

  useEffect(() => {
    if (asset_list_2.length !== 0) {
      setasset_error(false);
    }
  }, [asset_list_2])

  return (
    <div>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          if (branch === ""){
            setbranch_error(true)
          }
          else if (asset_list_2.length === 0) {
            setasset_error(true);
          }
          else{
          update_asset_branch()
          }
        }}
      >
        <div className="mt-3">
          <PageTitle
            page="Add Assign Branch"
          />
          <Title
            title="Add Assign Branch"
            parent_title="Masters"
          />
        </div>

        {/* Routes Info */}
        <div className="m-3">
          <Col lg={12}>
            <Card className="shadow bg-white rounded">
              <CardTitle className="mb-1 header">
                <div className="header-text-icon header-text">
                Update Assign Branch
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
                        <Label className="header-child">Branch *</Label>
                        <SearchInput
                          data_list={branch_list}
                          setdata_list={setbranch_list}
                          data_item_s={branch}
                          set_data_item_s={setbranch}
                          page={page}
                          setpage={setpage}
                          set_id={setbranch_id}
                          error_message={"Please Select Branch"}
                          error_s={branch_error}
                          setsearch_item={setsearch_branch}
                          loaded={branch_loaded}
                          count={branch_count}
                          bottom={branch_bottom}
                          setbottom={setbranch_bottom}
                        />
                      </div>
                      <div className="mt-1 error-text" color="danger">
                        {branch_err ? "Please Select Any Branch" : null}
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
                      {asset_error ? (
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

export default AssigneBranch;
