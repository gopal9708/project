import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
// import "../../../assets/scss/forms/form.scss";
import {
  Card,
  Col,
  Row,
  CardBody,
  Button,
} from "reactstrap";
// import Button from "react-bootstrap/Button";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

// import CreateRunsheet from "./CreateRunsheet";
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
// import "./addanother.css";

const AddAnotherOrder = ({ id_m, edit = false, data2, setrefresh2}) => {
  const [refresh, setrefresh] = useState(false);
  const [old_data2, setold_data2] = useState(data2);
  const data2Ref = useRef(data2);
  // console.log("data2--------", data2)
  const [deleted_ids, setdeleted_ids] = useState([])
  const [new_ids, setnew_ids] = useState([])
  // Additional Fields
  const search = useSelector((state) => state.searchbar.search_item);
  // const success = useSelector((state) => state.alert.show_alert);

  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.authentication.access_token);
  const [domestic_order, setdomestic_order] = useState([]);
  const [unmanifest_list, setunmanifest_list] = useState(domestic_order);
  const [Show, setShow] = useState(false);
  const [success, setsuccess] = useState(false);

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
    setcreateRunsheet_list([]);
    setcreateRunsheet_list(
      createRunsheet_list.filter((data2) => data2 !== remove)
    );
  };
  const transfer_list = (index) => {
    let temp_list = unmanifest_list;
    let item = temp_list[index];
    let temp_list1 = createRunsheet_list;
    temp_list1.push(item);
    setcreateRunsheet_list([]);
    setcreateRunsheet_list(temp_list1);
    setunmanifest_list(unmanifest_list.filter((data2) => data2 !== item));
  };

  //  For Fetching Branch Data Started
  const [branch_list, setbranch_list] = useState([]);
  const [branch_type_short, setbranch_type_short] = useState("");
  const [branch_dest, setbranch_dest] = useState("");
  const [branch_dest_id, setbranch_dest_id] = useState("");
  const [page, setpage] = useState(1);

  const get_branch = () => {
    axios
      .get(
        ServerAddress +
        `master/all-branches/?search=${""}&p=${page}&records=${10}&branch_name=${[
          "",
        ]}&branch_city=${[""]}&branch_search=${search}&vendor=&data=all`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        let temp = [];
        let temp2 = [...branch_list];
        temp = response.data.results;
        // console.log("temp",temp)
        for (let index = 0; index < temp.length; index++) {
          temp2.push([
            temp[index].id,
            temp[index].name,
            temp[index].state_name,
            temp[index].location,
          ]);
          // console.log("temp2-----------",temp2);
        }
        temp2 = [...new Set(temp2.map((v) => `${v}`))].map((v) => v.split(","));
        setbranch_list(temp2);
      })
      .catch((err) => {
        alert(`Error While Loading Branches , ${err}`);
      });
  };

  useLayoutEffect(() => {
    get_branch();
  }, [search, page]);
  useLayoutEffect(() => {
    // console.log("branch list ---------",branch_list)
    if (branch_type_short) {
      branch_list.forEach((element) => {
        if (element[2]) {
          setbranch_dest(element[2]);
          setbranch_dest_id(element[3]);
        }
      });
    }
  }, [branch_type_short]);

  const [branch_search, setbranch_search] = useState("");
  //  FOr fetching Branch Data Ended
  useLayoutEffect(() => {
    setunmanifest_list(domestic_order);
  }, [domestic_order]);

  const getPendindOrders = () => {
    axios
      .get(ServerAddress + `manifest/get_domesticorder/`, {
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
      getPendindOrders();
    }
  }, [success]);

  useEffect(() => {
    setsuccess(false);
  }, [success]);

  const send_manifest_data = () => {
    let data1 = createRunsheet_list;
    let id = [];
    for (let index = 0; index < data1.length; index++) {
      const element = data1[index];
      id.push(element.id);
    }
    axios
      .post(
        ServerAddress + `manifest/add_manifest_order/`,
        {
          manifest_no: id_m,
          awb_no_list: new_ids,
          deleted_ids: deleted_ids,
          steps: "FIRST",
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
          dispatch(setDataExist(`Manifest Added sucessfully`));
        }
      })
      .catch((error) => {
        alert(`Error While Creating Manifest ${error}`);
      });
  };

  // const [a, seta] = useState(data2)
  // console.log("aaaaaaaaaaaaaaaaa[[]]", a)
  // useLayoutEffect(() => {
  //   if(refresh){
  //     seta(data2)
  //   }
  // }, [refresh])

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
      <Button size={edit && "sm"} outline color={edit && "primary"} className={!edit && "btn btn-info m-1 cu_btn"} onClick={() => handleShow()}>
        {edit ? "Edit" : "Add More"}

      </Button>

      <Modal
        show={Show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        dialogClassName="main-modal"
      >
        <Modal.Header>
          <Modal.Title>Add Another Docket</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <form> */}
          <div>
            <div className="">
              <Col lg={12}>
                <Card className="shadow bg-white rounded">
                  <h5>Unmanifest Orders</h5>
                  <CardBody style={{ padding: "0px 10px 0px 10px" }}>
                    <Row>
                      <div
                        className="container-fluid "
                        style={{ background: "white", padding: "0px" }}
                      >
                        <div className="mb-1 row ">
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
                </Card>
              </Col>
            </div>
            <div className="">
              <Col lg={12}>
                <Card className="shadow bg-white rounded">
                  <h5>Create Manifest</h5>
                  <CardBody style={{ paddingTop: "0px" }}>
                    <Row>
                      <div
                        className="container-fluid "
                        style={{
                          background: "white",
                          // height: "290px",
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
                  </CardBody>
                </Card>
                {/* Footer OF the Modal   */}
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
          </div>
          {/* </form> */}
        </Modal.Body>
        <Modal.Footer>

          <Button
            variant="primary"
            onClick={() => {
              if (createRunsheet_list.length > 0) {
                send_manifest_data();
              }
              else {
                alert("Please Select At Least One Docket")
              }
            }}
          >
            Save
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddAnotherOrder;
