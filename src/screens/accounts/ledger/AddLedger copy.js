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
} from "reactstrap";
import PageTitle from "../../../components/pageTitle/PageTitle";
import Title from "../../../components/title/Title";
import { BsSave } from "react-icons/bs";
import { useState, useLayoutEffect, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // For navigation
import { ServerAddress } from "../../../constants/ServerAddress";
import axios from "axios";
import { useSelector } from "react-redux";
import { AiFillPlusCircle } from "react-icons/ai";
import {
  setShowAlert,
  setDataExist,
  setAlertType,
} from "../../../store/alert/Alert";
import { useDispatch } from "react-redux";
import toTitleCase from "../../../components/Title_Case/TitleCase";
import NSearchInput from "../../../components/formComponent/nsearchInput/NSearchInput";
import SearchInput from "../../../components/formComponent/searchInput/SearchInput";

const AddLedger = () => {
  const AccessToken = useSelector((state) => state.authentication.access_token);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  console.log("location data ===>> ", location);

  // Toggle Btn
  const [circle_btn, setcircle_btn] = useState(true);
  const toggle_circle = () => {
    setcircle_btn(!circle_btn);
  };

  // for update

  const [ledger_id, setledger_id] = useState("");
  const [is_updating, setis_updating] = useState(false);
  const [get_group_data, setget_group_data] = useState([]);
  console.log("get grp lis===>>", get_group_data);
  const [refresh, setrefresh] = useState(false);
  const [ledger_name, setledger_name] = useState("");
  const [is_main_group, setis_main_group] = useState("");
  const [is_main_group_1, setis_main_group_1] = useState("");
  const [is_main_group_2, setis_main_group_2] = useState("");
  const [is_main_group_3, setis_main_group_3] = useState("");

  const [main_group, setmain_group] = useState("");
  const [main_group_list, setmain_group_list] = useState([]);

  // Main Group Level 1 Started
  const [main_gp_id, setmain_gp_id] = useState("");
  const [main_enter, setmain_enter] = useState("");
  const [add_new, setadd_new] = useState(false);

  // SubGroup 1 Started
  const [sub_group, setsub_group] = useState("");
  const [sub_group_list, setsub_group_list] = useState([]);
  const [sub_group_id, setsub_group_id] = useState("");
  const [sub_add, setsub_add] = useState(false);
  const [sub_enter, setsub_enter] = useState("");
  const [sub_enter_3, setsub_enter_3] = useState("");

  const [sub_enter1, setsub_enter1] = useState("");
  const [sub_add1, setsub_add1] = useState(false);
  const [sub_add3, setsub_add3] = useState(false);
  // Sub group 1  started

  const [sub_group_1, setsub_group_1] = useState("");
  const [sub_group_1_id, setsub_group_1_id] = useState("");
  const [sub_group_1_list, setsub_group_1_list] = useState([]);

  // sub group 2
  const [sub_group_2, setsub_group_2] = useState("");
  const [sub_group_2_id, setsub_group_2_id] = useState("");
  const [sub_group_2_list, setsub_group_2_list] = useState([]);
  const [sub_group_3_list, setsub_group_3_list] = useState([]);

  const [update_id, setupdate_id] = useState("");

  //get data for update ledger

  console.log("is_updating", is_updating);

  const [update_is_list, setupdate_is_list] = useState([]);

  const [new_id_list, setnew_id_list] = useState([]);
  const [delete_ld_list, setdelete_ld_list] = useState([]);
  const [id_list_to_delete, setid_list_to_delete] = useState([]);
  useEffect(() => {
    try {
      setupdate_is_list(location.state.item.group_names);
      setledger_id(location.state.item.id);
      setledger_name(location.state.item.name);
      setis_updating(true);
      setget_group_data(location.state.item.group_names);
      setmain_group(location.state.item?.group_names[0].group__group_name);
      setmain_gp_id(location.state.item?.group_names[0].group);

      setsub_group(location.state.item?.group_names[1].group__group_name);
      setsub_group_id(location.state.item?.group_names[1].group);

      setsub_group_1(location.state.item?.group_names[2].group__group_name);
      setsub_group_1_id(location.state.item?.group_names[2].group);

      setsub_group_2(location.state.item?.group_names[3].group__group_name);
      setsub_group_2_id(location.state.item?.group_names[3].group);
    } catch (error) {}
  }, []);

  useEffect(() => {
    if (get_group_data.length == 1) {
      console.log("pass");
      setis_main_group("YES");
    }
    if (get_group_data.length == 2) {
      console.log("pass");
      setis_main_group("NO");
      setis_main_group_1("YES");
    }
    if (get_group_data.length == 3) {
      console.log("pass");
      setis_main_group("NO");
      setis_main_group_1("NO");
      setis_main_group_2("YES");
    }
    if (get_group_data.length == 4) {
      console.log("pass");
      setis_main_group("NO");
      setis_main_group_1("NO");
      setis_main_group_2("NO");
      setis_main_group_3("YES");
    }
  }, [get_group_data]);
  console.log("main grp0909 .....>>", is_main_group);

  const get_main_group = () => {
    axios
      .get(ServerAddress + `finance/all-groups/`, {
        headers: { Authorization: `Bearer ${AccessToken}` },
      })
      .then((resp) => {
        console.log("Main Group res ===>>", resp);
        let data = resp.data;
        let temp_list = [];
        console.log("dataaaaaaaaa", data);
        for (let index = 0; index < data.length; index++) {
          const element = [data[index].id, data[index].name];
          console.log("elementttttttttt", element);

          temp_list.push(element);
        }
        setmain_group_list(temp_list);
      })
      .catch((err) => {
        alert(`Error Occur in Get  Main Group, ${err}`);
      });
  };

  const get_sub_group = (filter_by, id) => {
    axios
      .get(ServerAddress + `finance/groups/?parent_id=${id}`, {
        headers: { Authorization: `Bearer ${AccessToken}` },
      })
      .then((resp) => {
        console.log("first", filter_by);
        if (filter_by === "level1") {
          console.log(" Sub respppppp", resp);
          let data = resp.data;
          let temp_list = [];
          console.log("dataaaaaaaaa", data);
          for (let index = 0; index < data.length; index++) {
            const element = [data[index].id, data[index].name];
            console.log("elementttttttttt", element);

            temp_list.push(element);
          }
          setsub_group_list(temp_list);
        }

        if (filter_by === "level2") {
          console.log(" Sub respppppp", resp);
          let data = resp.data;
          let temp_list = [];
          console.log("dataaaaaaaaa", data);
          for (let index = 0; index < data.length; index++) {
            const element = [data[index].id, data[index].name];
            console.log("elementttttttttt", element);

            temp_list.push(element);
          }
          setsub_group_1_list(temp_list);
        }

        if (filter_by === "level3") {
          console.log(" Sub respppppp", resp);
          let data = resp.data;
          let temp_list = [];
          console.log("dataaaaaaaaa  2", data);
          for (let index = 0; index < data.length; index++) {
            const element = [data[index].id, data[index].name];
            console.log("elementttttttttt", element);

            temp_list.push(element);
          }
          setsub_group_2_list(temp_list);
        }

        if (filter_by === "level3") {
          console.log(" Sub respppppp", resp);
          let data = resp.data;
          let temp_list = [];
          console.log("dataaaaaaaaa", data);
          for (let index = 0; index < data.length; index++) {
            const element = [data[index].id, data[index].name];
            console.log("elementttttttttt", element);

            temp_list.push(element);
          }
          setsub_group_2_list(temp_list);
        }
      })
      .catch((err) => {
        alert(`Error Occur in Get  Main Group, ${err}`);
      });
  };

  const add_group = (type, value) => {
    axios
      .post(
        ServerAddress + `finance/add-groupmaster/`,
        {
          group_type: type,
          group_name: value,
        },
        {
          headers: { Authorization: `Bearer ${AccessToken}` },
        }
      )
      .then((resp) => {
        console.log("respppppp POSTINGGGG", resp);
        if (resp.status === 201) {
          setadd_new(false);
          get_main_group();
          dispatch(setAlertType("success"));
          dispatch(setShowAlert(true));
          dispatch(setDataExist(`New Group "${main_enter}" Added Sucessfully`));
        }
      })
      .catch((err) => {
        alert(`Error Occur in Get  Main Group, ${err}`);
      });
  };

  const add_subgroup = (value, id) => {
    axios
      .post(
        ServerAddress + `finance/add-group/`,
        {
          group_name: value.toUpperCase(),
          group: id,
        },
        {
          headers: { Authorization: `Bearer ${AccessToken}` },
        }
      )
      .then((resp) => {
        if (resp.status === 201) {
          setadd_new(false);
          get_main_group();
          dispatch(setAlertType("success"));
          dispatch(setShowAlert(true));
          dispatch(
            setDataExist(`New Group "${value.toUpperCase()}" Added Sucessfully`)
          );
        }
      })
      .catch((err) => {
        alert(`Error Occur in Get  Main Group, ${err}`);
      });
  };

  const [id_is, setid_is] = useState("");
  const [is_main, setis_main] = useState(false);
  const [id_list, setid_list] = useState([]); // group id -list
  console.log("id -list is ===>", id_list);
  useEffect(() => {
    if (main_group !== "") {
      setid_list([main_gp_id]);
    }
    if (main_group !== "" && sub_group !== "") {
      setid_list([main_gp_id, sub_group_id]);
    }
    if (main_group !== "" && sub_group !== "" && sub_group_1 !== "") {
      setid_list([main_gp_id, sub_group_id, sub_group_1_id]);
    }
    if (
      main_group !== "" &&
      sub_group !== "" &&
      sub_group_1 !== "" &&
      sub_group_2 !== ""
    ) {
      setid_list([main_gp_id, sub_group_id, sub_group_1_id, sub_group_2_id]);
    }

    // setid_list([main_gp_id, sub_group_id, sub_group_1_id ,sub_group_2_id  ])
  }, [
    main_gp_id,
    sub_group_id,
    sub_group_1_id,
    sub_group_2_id,

    main_group,
    sub_group,
    sub_group_1,
    sub_group_2,
  ]);

  const add_ledger = () => {
    axios
      .post(
        ServerAddress + `finance/add-ledger/`,
        {
          name: ledger_name.toUpperCase(),
          group_ids: id_list,
          main_group: is_main,
        },
        {
          headers: { Authorization: `Bearer ${AccessToken}` },
        }
      )
      .then((resp) => {
        console.log("respppppp POSTINGGGG", resp);
        if (resp.status === 201) {
          setadd_new(false);
          get_main_group();
          navigate(-1);
          dispatch(setAlertType("success"));
          dispatch(setShowAlert(true));
          dispatch(
            setDataExist(
              `New Group "${ledger_name.toUpperCase()}" Added Sucessfully`
            )
          );
        }
      })
      .catch((err) => {
        alert(`Error Occur in While , ${err}`);
      });
  };

  // to compaire list of id at the time of update
  useEffect(() => {
    let item = update_is_list.map((p) => p.group);
    // console.log("update_is_list====", update_is_list)

    console.log("Update id list is=========== ", item);
    console.log("id_list=======", id_list);

    //For New
    let new_ids = id_list.filter((p) => !item.includes(p));
    setnew_id_list(new_ids);

    // for delete

    let delete_id_list = item.filter((p) => id_list.indexOf(p) == -1);
    delete_id_list = [...new Set(delete_id_list)];

    const filteredIds = update_is_list
      .filter((item) => delete_id_list.includes(parseInt(item.group))) // Filter items based on group values in 'a'
      .map((item) => item.id); // Retrieve the 'id' values from the filtered items
    setid_list_to_delete(filteredIds);
  }, [id_list, update_is_list]);
  console.log("new id list ===>", new_id_list);
  console.log("Delete id list === >>", id_list_to_delete);

  const Update_ledger = () => {
    axios
      .put(
        ServerAddress + `finance/put-ledger/` + ledger_id,
        {
          name: ledger_name.toUpperCase(),
          new_id: new_id_list,
          deleted_id: id_list_to_delete,
        },
        {
          headers: { Authorization: `Bearer ${AccessToken}` },
        }
      )
      .then((resp) => {
        console.log("respppppp Updatiing", resp);
        if (resp.status === 201) {
          navigate(-1);
          dispatch(setAlertType("warning"));
          dispatch(setShowAlert(true));
          dispatch(
            setDataExist(` "${ledger_name.toUpperCase()}" Updated Sucessfully`)
          );
        }
      })
      .catch((err) => {
        alert(`Error Occur in While , ${err}`);
      });
  };

  useEffect(() => {
    get_main_group();
  }, []);

  useEffect(() => {
    if (main_gp_id !== "") {
      get_sub_group("level1", main_gp_id);
    }
  }, [main_gp_id, refresh]);

  useEffect(() => {
    if (sub_group_id !== "" && is_main_group === "NO") {
      get_sub_group("level2", sub_group_id);
    }
  }, [sub_group_id, refresh]);

  useEffect(() => {
    if (sub_group_1_id !== "" && is_main_group_1 === "NO") {
      get_sub_group("level3", sub_group_1_id);
    }
  }, [sub_group_1_id, refresh]);

  useEffect(() => {
    if (is_main_group === "YES") {
      setid_is(main_gp_id);
      setis_main(true);
    } else if (is_main_group_1 === "YES") {
      setid_is(sub_group_id);
      setis_main(true);
    } else {
      setid_is("");
      setis_main(false);
    }
  }, [is_main_group, is_main_group_1, is_main_group_2, is_main_group_3]);

  // useEffect(() => {
  // if (is_main_group === "NO") {

  useEffect(() => {
    if (is_main_group === "YES") {
      setid_is(main_gp_id);
      setis_main(true);
    } else if (is_main_group_1 === "YES") {
      setid_is(sub_group_id);
      setis_main(true);
    } else {
      setid_is("");
      setis_main(false);
    }
  }, [is_main_group, is_main_group_1, is_main_group_2, is_main_group_3]);
  console.log("id issssssssssss", id_is);

  // useEffect(() => {
  // if (is_main_group === "NO") {

  //   setmain_gp_id()
  //   sub_enter()
  // }
  // }, [])

  return (
    <div>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          is_updating ? Update_ledger() : add_ledger();
          return false;
        }}
      >
        <div className="m-4">
          <PageTitle page={is_updating ? "Update Ledger" : "Add Ledger"} />
          <Title
            title={is_updating ? "Update Ledger" : "Add Ledger"}
            parent_title="Finance"
          />
        </div>

        <div className="m-4" id="section1">
          <Card className="shadow bg-white rounded">
            <CardTitle className="mb-1 header">
              <div className="header-text-icon header-text">
                Add Ledger
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
                  <Col lg={3} md={4} sm={6}>
                    <div className="m-2 mb-4">
                      <Label className="header-child sm-10">
                        Name <span className="mandatory">*</span>
                      </Label>
                      <Input
                        className="form-control d-block from control-md"
                        bsSize="sm"
                        name="name"
                        type="text"
                        placeholder=" Enter Ledger Name"
                        value={ledger_name}
                        onChange={(val) => {
                          setledger_name(val.target.value);
                        }}
                      />
                    </div>
                  </Col>

                  {/* // Level 1 */}
                  <div
                    style={{ background: "#f0ebeb", border: "2px solid gray" }}
                  >
                    <Col lg={3} md={4} sm={6}>
                      <div className="m-2 mb-2">
                        <Label className="header-child sm-10">
                          Group * <span className="mandatory">*</span> :
                        </Label>
                        <div style={{ display: "flex" }}>
                          <NSearchInput
                            data_list={main_group_list}
                            data_item_s={main_group}
                            set_data_item_s={setmain_group}
                            show_search={false}
                            set_id={setmain_gp_id}
                            current_width="240px"
                            error_message={"Please Select Group First"}
                          />
                          <AiFillPlusCircle
                            onClick={() => {
                              setadd_new(!add_new);
                            }}
                            size={27}
                          />
                        </div>
                      </div>
                    </Col>

                    {add_new && (
                      <Col lg={3} md={4} sm={6}>
                        <div className="m-2 mb-2">
                          <Label className="header-child sm-10">
                            Add New Group <span className="mandatory">*</span> :
                          </Label>
                          <Input
                            className="form-control d-block from control-md"
                            bsSize="sm"
                            type="text"
                            onChange={(val) => {
                              setmain_enter(val.target.value);
                            }}
                            onBlur={() => {
                              if (main_enter != "") {
                                // check_main_name("group", main_enter);
                                add_group("main_group", main_enter);
                              }
                            }}
                          />
                        </div>
                      </Col>
                    )}

                    <Col lg={3} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">Main Group*</Label>
                        <Row>
                          <Col lg={4} md={4} sm={4}>
                            <div className="form-check mb-2">
                              <Input
                                className="form-check-input "
                                type="radio"
                                name="main_group"
                                // id="MSMEREG"
                                value={is_main_group}
                                onClick={() => {
                                  setis_main_group("YES");
                                }}
                                checked={is_main_group === "YES"}
                                readOnly={true}
                              />
                              <Label
                                className="form-check-label input-box"
                                htmlFor="exampleRadios1"
                              >
                                YES
                              </Label>
                            </div>
                          </Col>
                          <Col lg={3} md={3} sm={3}>
                            <div className="form-check mb-2">
                              <Input
                                className="form-check-input"
                                type="radio"
                                name="main_group"
                                // id="MSMEREG"
                                value={is_main_group}
                                onClick={() => {
                                  setis_main_group("NO");
                                }}
                                checked={is_main_group === "NO"}
                                //   readOnly={true}
                              />
                              <Label
                                className="form-check-label input-box"
                                htmlFor="exampleRadios2"
                              >
                                NO
                              </Label>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  </div>

                  {/* //Level 2 */}
                  {is_main_group === "NO" && (
                    <div
                      style={{
                        background: "#f0ebeb",
                        border: "2px solid gray",
                      }}
                    >
                      <Col lg={3} md={4} sm={6}>
                        <div className="m-2 mb-2">
                          <Label className="header-child sm-10">
                            Sub Group 1 <span className="mandatory">*</span> :
                          </Label>
                          <div style={{ display: "flex" }}>
                            <NSearchInput
                              data_list={sub_group_list}
                              data_item_s={sub_group}
                              set_data_item_s={setsub_group}
                              set_id={setsub_group_id}
                              current_width="240px"
                            />

                            <AiFillPlusCircle
                              onClick={() => {
                                setsub_add(!sub_add);
                              }}
                              size={27}
                            />
                          </div>
                        </div>
                      </Col>

                      {sub_add && (
                        <Col lg={3} md={4} sm={6}>
                          <div className="m-2 mb-2">
                            <Label className="header-child sm-10">
                              Add Sub Group 1
                              <span className="mandatory">*</span> :
                            </Label>
                            <Input
                              className="form-control d-block from control-md"
                              bsSize="sm"
                              type="text"
                              onChange={(val) => {
                                setsub_enter(val.target.value);
                              }}
                              onBlur={() => {
                                // if ( is_main_group === "No" && sub_enter != "") {
                                add_subgroup(sub_enter, main_gp_id);
                                setrefresh(!refresh);
                                //  }
                              }}
                            />
                          </div>
                        </Col>
                      )}

                      <Col lg={3} md={6} sm={6}>
                        <div className="mb-2">
                          <Label className="header-child">Main Group*</Label>
                          <Row>
                            <Col lg={4} md={4} sm={4}>
                              <div className="form-check mb-2">
                                <Input
                                  className="form-check-input "
                                  type="radio"
                                  name="main_group1"
                                  // id="MSMEREG"
                                  value={is_main_group_1}
                                  onClick={() => {
                                    setis_main_group_1("YES");
                                  }}
                                  checked={is_main_group_1 === "YES"}
                                  readOnly={true}
                                />
                                <Label
                                  className="form-check-label input-box"
                                  htmlFor="exampleRadios1"
                                >
                                  YES
                                </Label>
                              </div>
                            </Col>
                            <Col lg={3} md={3} sm={3}>
                              <div className="form-check mb-2">
                                <Input
                                  className="form-check-input"
                                  type="radio"
                                  name="main_group1"
                                  // id="MSMEREG"
                                  value={is_main_group_1}
                                  onClick={() => {
                                    setis_main_group_1("NO");
                                  }}
                                  checked={is_main_group_1 === "NO"}
                                  //   readOnly={true}
                                />
                                <Label
                                  className="form-check-label input-box"
                                  htmlFor="exampleRadios2"
                                >
                                  NO
                                </Label>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </Col>
                    </div>
                  )}

                  {/* // Level 3 */}
                  {is_main_group_1 === "NO" && (
                    <div
                      style={{
                        background: "#f0ebeb",
                        border: "2px solid gray",
                      }}
                    >
                      <Col lg={3} md={4} sm={6}>
                        <div className="m-2 mb-2">
                          <Label className="header-child sm-10">
                            Sub Group 2 <span className="mandatory">*</span> :
                          </Label>
                          <div style={{ display: "flex" }}>
                            <NSearchInput
                              data_list={sub_group_1_list}
                              data_item_s={sub_group_1}
                              set_data_item_s={setsub_group_1}
                              set_id={setsub_group_1_id}
                              current_width="240px"
                            />
                            <AiFillPlusCircle
                              onClick={() => {
                                setsub_add1(!sub_add1);
                              }}
                              size={27}
                            />
                          </div>
                        </div>
                      </Col>

                      {sub_add1 && (
                        <Col lg={3} md={4} sm={6}>
                          <div className="m-2 mb-2">
                            <Label className="header-child sm-10">
                              Add Sub Group 2
                              <span className="mandatory">*</span> :
                            </Label>
                            <Input
                              className="form-control d-block from control-md"
                              bsSize="sm"
                              type="text"
                              onChange={(val) => {
                                setsub_enter1(val.target.value);
                              }}
                              onBlur={() => {
                                if (sub_enter1 != "") {
                                  add_subgroup(sub_enter1, sub_group_id);
                                  setrefresh(!refresh);
                                }
                              }}
                            />
                          </div>
                        </Col>
                      )}

                      <Col lg={3} md={6} sm={6}>
                        <div className="mb-2">
                          <Label className="header-child">Main Group*</Label>
                          <Row>
                            <Col lg={4} md={4} sm={4}>
                              <div className="form-check mb-2">
                                <Input
                                  className="form-check-input "
                                  type="radio"
                                  name="main_group2"
                                  // id="MSMEREG"
                                  value={is_main_group_2}
                                  onClick={() => {
                                    setis_main_group_2("YES");
                                  }}
                                  checked={is_main_group_2 === "YES"}
                                  readOnly={true}
                                />
                                <Label
                                  className="form-check-label input-box"
                                  htmlFor="exampleRadios1"
                                >
                                  YES
                                </Label>
                              </div>
                            </Col>
                            <Col lg={3} md={3} sm={3}>
                              <div className="form-check mb-2">
                                <Input
                                  className="form-check-input"
                                  type="radio"
                                  name="main_group2"
                                  // id="MSMEREG"
                                  value={is_main_group_2}
                                  onClick={() => {
                                    setis_main_group_2("NO");
                                  }}
                                  checked={is_main_group_2 === "NO"}
                                  //   readOnly={true}
                                />
                                <Label
                                  className="form-check-label input-box"
                                  htmlFor="exampleRadios2"
                                >
                                  NO
                                </Label>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </Col>
                    </div>
                  )}

                  {/* // Level 4 */}

                  {is_main_group_2 === "NO" && (
                    <div
                      style={{
                        background: "#f0ebeb",
                        border: "2px solid gray",
                      }}
                    >
                      <Col lg={3} md={4} sm={6}>
                        <div className="m-2 mb-2">
                          <Label className="header-child sm-10">
                            Sub Group 3<span className="mandatory">*</span> :
                          </Label>
                          <div style={{ display: "flex" }}>
                            <NSearchInput
                              data_list={sub_group_2_list}
                              data_item_s={sub_group_2}
                              set_data_item_s={setsub_group_2}
                              set_id={setsub_group_2_id}
                              current_width="240px"
                            />
                            <AiFillPlusCircle
                              onClick={() => {
                                setsub_add3(!sub_add3);
                              }}
                              size={27}
                            />
                          </div>
                        </div>
                      </Col>

                      {sub_add3 && (
                        <Col lg={3} md={4} sm={6}>
                          <div className="m-2 mb-2">
                            <Label className="header-child sm-10">
                              Add Sub Group 3
                              <span className="mandatory">*</span> :
                            </Label>
                            <Input
                              className="form-control d-block from control-md"
                              bsSize="sm"
                              type="text"
                              onChange={(val) => {
                                setsub_enter_3(val.target.value);
                              }}
                              onBlur={() => {
                                if (sub_enter_3 != "") {
                                  add_subgroup(sub_enter_3, sub_group_1_id);
                                }
                              }}
                            />
                          </div>
                        </Col>
                      )}

                      <Col lg={3} md={6} sm={6}>
                        <div className="mb-2">
                          <Label className="header-child">Main Group*</Label>
                          <Row>
                            <Col lg={4} md={4} sm={4}>
                              <div className="form-check mb-2">
                                <Input
                                  className="form-check-input "
                                  type="radio"
                                  name="main_group3"
                                  // id="MSMEREG"
                                  value={is_main_group_3}
                                  onClick={() => {
                                    setis_main_group_3("YES");
                                  }}
                                  checked={is_main_group_3 === "YES"}
                                  readOnly={true}
                                />
                                <Label
                                  className="form-check-label input-box"
                                  htmlFor="exampleRadios1"
                                >
                                  YES
                                </Label>
                              </div>
                            </Col>
                            <Col lg={3} md={3} sm={3}>
                              <div className="form-check mb-2">
                                <Input
                                  className="form-check-input"
                                  type="radio"
                                  name="main_group3"
                                  value={is_main_group_3}
                                  onClick={() => {
                                    setis_main_group_3("NO");
                                  }}
                                  checked={is_main_group_3 === "NO"}
                                  readOnly={true}
                                />
                                <Label
                                  className="form-check-label input-box"
                                  htmlFor="exampleRadios2"
                                >
                                  NO
                                </Label>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </Col>
                    </div>
                  )}
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
export default AddLedger;
