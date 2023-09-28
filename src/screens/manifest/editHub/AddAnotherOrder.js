import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
// import "../../../assets/scss/forms/form.scss";
import {
  Col,
  Row,
  CardBody,
  Button,
} from "reactstrap";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import SearchList from "../../../components/listDisplay/searchList/SearchList";
import { ServerAddress } from "../../../constants/ServerAddress";
import Modal from "react-bootstrap/Modal";
import {
  setAlertType,
  setDataExist,
  setShowAlert,
} from "../../../store/alert/Alert";
import EditUnmanifestDataFormat from "./addAnother/unmanifests/UnrunsheetsDataFormat";
import EditDeliveryDataFormat from "./addAnother/manifests/PendingDeliveryDataFormat";
import "./addanother.css";

const AddAnotherOrder = ({id_m, data2, setrefresh2, type}) => {
  // console.log("id_mdata2-------", data2)
  const [success, setsuccess] = useState(false);
  const [refresh, setrefresh] = useState(false);
  const [old_data2, setold_data2] = useState(data2);
  const data2Ref = useRef(data2);
  const [deleted_ids, setdeleted_ids] = useState([])
  const [new_ids, setnew_ids] = useState([])
  // Additional Fields

  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.authentication.access_token);
  const [domestic_order, setdomestic_order] = useState([]);
  const [unmanifest_list, setunmanifest_list] = useState(domestic_order);
  const [Show, setShow] = useState(false);

  const [createRunsheet_list, setcreateRunsheet_list] = useState([]);
  useEffect(() => {
    if (refresh) {
      setcreateRunsheet_list(data2)
    }

  }, [refresh])
  const handleClose = () => {
    setrefresh(false)
    setcreateRunsheet_list([]);
    setShow(false);
    setrefresh2(true)
  };
  const handleShow = () => {
    setrefresh2(false)
    setrefresh(true)
    setShow(true);
    setsuccess(true);
  };

  let awb_no_list = [];
  for (let index = 0; index < createRunsheet_list.length; index++) {
    const loc = createRunsheet_list[index];
    awb_no_list.push(loc.awb_no);
  }
  const remove_transfer_list = (index) => {
    let remove_list = createRunsheet_list;
    let remove = remove_list[index];

    let remove_list1 = unmanifest_list;
    remove_list1.push(remove);
    setunmanifest_list(remove_list1);
    setcreateRunsheet_list(
      createRunsheet_list.filter((data) => data !== remove)
    );
  };
  const transfer_list = (index) => {
    let temp_list = unmanifest_list;
    let item = temp_list[index];
    let temp_list1 = createRunsheet_list;
    temp_list1.push(item);
    setcreateRunsheet_list(temp_list1);
    setunmanifest_list(unmanifest_list.filter((data) => data !== item));
  };
  //  FOr fetching Branch Data Ended
  useLayoutEffect(() => {
    setunmanifest_list(domestic_order);
  }, [domestic_order]);

  const getPendindOrders = (val) => {
    axios
      .get(ServerAddress + `${val ? "runsheet/get_localorder" : "manifest/get_domesticorder"}/`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        setdomestic_order(response.data);
      })
      .catch((err) => {
        alert(`Error Occur in Get Domestic Order , ${err}`);
      });
  };
  useEffect(() => {
    if (success) {
      getPendindOrders(type);
    }
  }, [success]);
  useEffect(() => {
    setsuccess(false);
  }, [success]);

  const send_hub_data = () => {
    let data1 = createRunsheet_list;
    let id = [];
    for (let index = 0; index < data1.length; index++) {
      const element = data1[index];
      id.push(element.id);
    }
    axios
      .post(
        ServerAddress + "manifest/add_hub_order/",
        {
          hub_transfer_no: id_m,
          // from_branch: user_homebranch_id,
          // destination: branch_dest_id,
          // to_branch: branch_dest_id,
          awb_no_list: new_ids,
          deleted_ids: deleted_ids,
          // orgin_branch_name: user_home_branch,
          // destination_branch_name: branch_selected,
          // origin_city: user_home_branch_city,
          // destination_city: branch_dest,
          steps: "FIRST",
          // origin: user_home_branch_location_id,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (response) {
        if (response.data === "done") {
          setrefresh(false)
          setShow(false);
          dispatch(setAlertType("success"));
          dispatch(setShowAlert(true));
          getPendindOrders();
          setcreateRunsheet_list([]);
          dispatch(setDataExist(`Order Added Sucessfully`));
        }
      })
      .catch((error) => {
        alert(`Error While Creating Manifest ${error}`);
      });
  };

  useEffect(() => {
    data2Ref.current = data2;
  }, [data2]);

  useLayoutEffect(() => {
    if (refresh) {
      setold_data2([...data2Ref.current]);
    }
  }, [refresh]);

  useEffect(() => {
    // get list of IDs from createRunsheet_list
    const createRunsheet_ids = createRunsheet_list.map((item) => item.id);

    // get list of IDs from old_data2
    const old_data2_ids = old_data2.map((item) => item.id);

    // find new IDs in createRunsheet_list that are not in old_data2
    let new_list = createRunsheet_ids.filter((id) => !old_data2_ids.includes(id));
    setnew_ids(new_list)

    // find deleted IDs in old_data2 that are not in createRunsheet_list
    let deleted_ids = old_data2_ids.filter((id) => !createRunsheet_ids.includes(id));
    setdeleted_ids(deleted_ids)

  }, [createRunsheet_list, old_data2, unmanifest_list])

  return (
    <>
      <Button className="btn btn-info m-1 cu_btn" onClick={handleShow}>
        Add More
      </Button>

      <Modal
        show={Show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        dialogClassName="main-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Another Docket</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mt-0 m-3">
              <Col lg={12}>
                <div className="cust-header">{type ? "UnRunsheet Orders" : "Unmanifest Orders"}</div>
                <CardBody style={{ paddingTop: "0px" }}>
                  <Row>
                    <div
                      className="container-fluid "
                      style={{ background: "white", maxHeight: "290px" }}
                    >
                      <div className="mb-2 row ">
                        <div className="col-sm-4">
                          <SearchList />
                        </div>
                      </div>
                      <EditDeliveryDataFormat
                        local_list={unmanifest_list}
                        check={transfer_list}
                      />
                    </div>
                  </Row>
                </CardBody>
              </Col>
            </div>
            <div className="">
              <Col lg={12}>
                <div className="cust-header">{type ? "Hub Runsheet Orders" : "Manifest Orders"}</div>
                <Row>
                  <div
                    className="container-fluid "
                    style={{
                      background: "white",
                      maxHeight: "290px",
                      marginTop: "20px",
                    }}
                  >
                    {/* DataTable */}
                    <EditUnmanifestDataFormat
                      Manifest_list={createRunsheet_list}
                      remove_list={remove_transfer_list}
                    />
                  </div>
                </Row>

                {/* <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                  }}
                >
                  <div>
                    <Button
                      type="button"
                      color="success"
                      onClick={() => {
                        send_manifest_data();
                      }}
                    >
                      Add
                    </Button>
                  </div>
                  <div>
                    <Button type="button" color="danger" onClick={handleClose}>
                      Cancel
                    </Button>
                  </div>
                </div> */}
              </Col>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              if(createRunsheet_list.length>0)
              {
              send_hub_data();
            }
            else{
              alert("Please Select At Least One Docket")
            }
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddAnotherOrder;
