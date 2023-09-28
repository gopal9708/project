import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { Input, Label, FormFeedback, FormGroup, Button } from "reactstrap";
import NSearchInput from "../../../components/formComponent/nsearchInput/NSearchInput";
import Modal from "react-bootstrap/Modal";
import "./AddVoucher.scss";
import SelectLedger from "./SelectLedger";
import axios from "axios";
import { ServerAddress } from "../../../constants/ServerAddress";
import { useSelector } from "react-redux";
import toTitleCase from "../../../lib/titleCase/TitleCase";
import { useLocation, useNavigate } from "react-router-dom";

const AddVoucher = () => {
  
  const navigate = useNavigate();
  const location = useLocation();
  console.log("location data", location);
  const accessToken = useSelector((state) => state.authentication.access_token);
  const org_id = useSelector(
    (state) => state.authentication.userdetails.organization_id
  );

  let list_is = [[[], "", "", "", ""]];

  const [data_id, setdata_id] = useState("");
  // set dafault current date
  const currentDate = new Date();
  // const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
  const formattedDate = currentDate.toISOString().slice(0, 10);
  const [entry_date, setEntry_date] = useState(formattedDate);

  const [is_updateing, setis_updateing] = useState(false);
  const [voucher_number, setvoucher_number] = useState("");


  const [voucher_update_id, setvoucher_update_id] = useState("");
  const [refresh, setrefresh] = useState(false);
  const [main_list, setmain_list] = useState(list_is);
  const [led_len, setled_len] = useState("");
  console.log("filter ledger", led_len);
  const [page_len, setPage_len] = useState(1);
  const [data_list, setdata_list] = useState([]);
  const [data_item, setdata_item] = useState("");
  // const [branch_id, setbranch_id] = useState("");
  const [pagelen, setPagelen] = useState(1);
  const [error, setError] = useState(false);
  const [search_ledger, setsearch_ledger] = useState("");
  const [ledger_loaded, setledger_loaded] = useState(false);
  const [ledger_count, setledger_count] = useState(1);
  const [ledger_bottom, setledger_bottom] = useState(25);

  const [led_val_index, setled_val_index] = useState("");
  console.log("index is ====>>>", led_val_index);
  console.log("main List", main_list);
  const add_new_row = () => {
    let list_a = [[], "", "", "", ""];
    setmain_list([...main_list, list_a]);
  };

  const delete_row = (index) => {
    // alert(`Delete Row Number ${index + 1} `)
    if (window.confirm(`Do you want to Delete Row ${index + 1}?`)) {
      const updatedList = main_list.slice();
      updatedList.splice(index, 1);
      setmain_list(updatedList);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.shiftKey && event.key === "N") {
        event.preventDefault();
        add_new_row();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [main_list]);

  // For Branch dropdown
  const [branch_list, setbranch_list] = useState([]);
  const [branch, setbranch] = useState("");
  const [branch_id, setbranch_id] = useState("");
  // console.log("idddddddddddddd", branch_id);

  const GetBranch = async () => {
    let branch = [];
    console.log("first", branch);
    try {
      const response = await axios.get(
        ServerAddress +
          `master/get-branch-details/?p=1&records=${10}&branch_name=${""}&branch_city=${""}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log("broker_branch is", response);
      if (response.data.length !== 0) {
        branch = response.data.map((v) => [
          v.id,
          toTitleCase(v.branch_name),
        ]);
      } else {
        branch = [
          ...branch_list,
          response.data.results.map((v) => [v.id, toTitleCase(v.branch_name)]),
        ];
      }
      setbranch_list(branch);
    } catch (err) {
      alert(`Error occured while gettin Billing Branch Data ${err}`);
    }
  };

  // to open ledger list

  //   useEffect(() => {
  //  {main_list.map((item , idx) => {
  //   if(item[0][1].length === 4) {
  //     alert("Hello")
  //   }
  //  })}
  //   }, [main_list])

  const addNewRowOnEnter = (event, index) => {
    if (event.key === "Enter") {
      event.preventDefault();
      add_new_row();
    }
  };

  const get_ledger = () => {
    let ledger_list = [];
    axios
      .get(
        ServerAddress +
          `account/all-ledger/?search=${led_len}&p=${page_len}&records=${10}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (response) {
        console.log("123---:", response.data);
        if (response.data.results.length > 0) {
          let data = response.data.results;
          ledger_list = data.map((v) => [v.id, toTitleCase(v.name)]);
          console.log("item ==============>> ledger", ledger_list);
        }
        setdata_list(ledger_list);
      })
      .catch((error) => {
        alert(`Error occured while getting  Data ${error}`);
      });
  };

  const CreateVoucher = () => {
    axios
      .post(
        ServerAddress + "finance/add-voucher/",
        {
          organization: org_id,
          branch: branch_id,
          date: entry_date,
          data_list: main_list,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (response) {
        console.log("charges data===", response.data);
        if (response.status === 201) {
          alert("Voucehr Created")
          navigate(-1);
          // dispatch(setAlertType("warning"));
          // dispatch(setShowAlert(true));
          // dispatch(
          //   setDataExist(` "${ledger_name.toUpperCase()}" Updated Sucessfully`)
          // );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const UpdateVoucher = () => {
    axios
      .put(
        ServerAddress + `finance/put-voucher/` + voucher_update_id,
        {
          organization: org_id,
          branch: branch_id,
          date: entry_date,
          data_list: main_list,
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((resp) => {
        if (resp.status === 201) {
          alert("Voucehr Updated")
          navigate(-1);
          // dispatch(setAlertType("warning"));
          // dispatch(setShowAlert(true));
          // dispatch(
          //   setDataExist(` "${ledger_name.toUpperCase()}" Updated Sucessfully`)
          // );
        }
      })
      .catch((err) => {
        alert(`Error Occur in While , ${err}`);
      });
  };
  useEffect(() => {
    get_ledger();
    GetBranch();
  }, [led_len]);

  useEffect(() => {
    if (data_item !== "") {
      console.log("Dtaa is ", data_item);
      console.log("main_list is ", main_list);
      main_list[led_val_index][0] = data_item;
      setrefresh(!refresh);
      setdata_item("");
      // main_list[led_val_index] = data_item
      // {main_list.map((item,index) => {

      //   item[0][0] == data_item

      // })}
    }
  }, [led_val_index, data_item]);

  useEffect(() => {
    try {
      setbranch(location?.state.item.branch_name);
      setbranch_id(location?.state.item.branch);
      setEntry_date(location?.state.item.date);
      setvoucher_number(location?.state.item.voucher_no);
      setvoucher_update_id(location?.state.item.id)
      setis_updateing(true);
    } catch (error) {}
  }, []);

  useEffect(() => {
    let list = [];
    const fixed_list = location?.state?.item.vouchercharge;
    if (is_updateing) {
      if (fixed_list&& fixed_list.length !== 0) {
        for (let i = 0; i < fixed_list.length; i++) {
          console.log("item is ",fixed_list[i] )
          list.push([
          [fixed_list[i].ledger, fixed_list[i].ledger_name] ,
            fixed_list[i].mode,
            fixed_list[i].tvno,
            fixed_list[i].amount,
            fixed_list[i].narration,
            fixed_list[i].id,
          ]);
          setmain_list(list);
        }
      }
    }
  }, [is_updateing]);

  return (
    <>
      <Modal
      // show={show} onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Reject Resion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup>
            <Label for="exampleText">Text Area</Label>
            <Input
              id="exampleText"
              name="text"
              type="textarea"
              style={{ height: "90px" }}
              // onChange={(e) => {
              //   setmessage(e.target.value)
              // }}
            />
            <div className="mt-1 error-text" color="danger">
              {/* {message_error ? "Please Enter Reject Resion" : null} */}
            </div>
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            //  onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            // onClick={() => handleSubmit()}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          return false;
        }}
      >
        <div
          style={{
            border: "2px solid black",
            margin: "12px",
            minHeight: "90vh",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "13px",
              }}
            >
              <h3>{is_updateing ? "Update Voucher" : "Add Voucher"} </h3>
            </div>

            <div className="m-3">
              <Col lg={12}>
                <Row>
                  <Col lg={4}>
                    <div>
                      <Label>Branch</Label>
                      <NSearchInput
                        data_list={branch_list}
                        data_item_s={branch}
                        set_id={setbranch_id}
                        set_data_item_s={setbranch}
                      />
                    </div>
                  </Col>
                  <Col lg={4}>
                    <div>
                      <Label>Date</Label>
                      <Input
                        type="date"
                        value={entry_date}
                        onChange={(e) => setEntry_date(e.target.value)}
                      />
                    </div>
                  </Col>

                  {is_updateing && (
                    <Col lg={4}>
                      <div>
                        <Label>Voucher Number</Label>
                        <Input disabled value={voucher_number} />
                      </div>
                    </Col>
                  )}
                </Row>
                <Row></Row>
                <Row>
                
                </Row>
              </Col>
            </div>
          </div>

          {/* // Select Ledger
          {led_len.length === 3 && (
            <div id="ledger_search">
              <SelectLedger />
            </div>
          )} */}

          <div style={{ background: "" }}>
            <div
              // id="table_container"
              style={{
                marginTop: 50,
                overflowX: "scroll",
                zIndex: 0, // Change this value to a higher number
                margin: "20px 20px 20px 20px",
              }}
            >
              <table
                // table-grid
                className="
              table-grid
               table_container"
                style={{ zIndex: "0" }}
              >
                <thead>
                  <tr>
                    <th
                      style={{
                        // width: "1rem",
                        textAlign: "center",
                        paddingLeft: "2px",
                        paddingRight: "2px",
                        padding: "8px",
                      }}
                      //   rowSpan={1}
                      colSpan={1}
                    >
                      SL
                    </th>

                    <th
                      style={{
                        width: "2rem",
                        textAlign: "center",
                        paddingLeft: "2px",
                        paddingRight: "2px",
                        padding: "8px",
                      }}
                      colSpan={1}
                    >
                      Name
                    </th>
                    <th
                      style={{
                        width: "20px",
                        textAlign: "center",
                        paddingLeft: "2px",
                        paddingRight: "2px",
                      }}
                      colSpan={1}
                    >
                      Mode
                    </th>
                    <th
                      style={{
                        width: "20px",
                        textAlign: "center",
                        paddingLeft: "2px",
                        paddingRight: "2px",
                      }}
                      colSpan={1}
                    >
                      Murchant
                    </th>
                    <th
                      style={{
                        width: "20px",
                        textAlign: "center",
                        paddingLeft: "2px",
                        paddingRight: "2px",
                      }}
                      colSpan={1}
                    >
                      Category
                    </th>

                    <th
                      style={{
                        width: "2rem",
                        textAlign: "center",
                        paddingLeft: "2px",
                        paddingRight: "2px",
                      }}
                      colSpan={1}
                    >
                      TVNO
                    </th>

                    <th
                      style={{
                        width: "2rem",
                        textAlign: "center",
                        paddingLeft: "2px",
                        paddingRight: "2px",
                      }}
                      colSpan={1}
                    >
                      Amount
                    </th>
                    <th
                      style={{
                        width: "2rem",
                        textAlign: "center",
                        paddingLeft: "2px",
                        paddingRight: "2px",
                      }}
                      colSpan={1}
                    >
                      Reimbursable
                    </th>

                    <th
                      style={{
                        width: "2rem",
                        textAlign: "center",
                        paddingLeft: "2px",
                        paddingRight: "2px",
                      }}
                      colSpan={1}
                    >
                      Narration
                    </th>
                  </tr>
                </thead>

                {/* // Select Ledger */}
                {led_len.length === 3 && (
                  <div
                    //
                    className="ledger_search"
                  >
                    <SelectLedger
                      data_list={data_list}
                      setdata_list={setdata_list}
                      data_item={data_item}
                      setdata_item={setdata_item}
                      data_id={data_id}
                      setdata_id={setdata_id}
                      index_value={led_val_index}
                      setindex_value={setled_val_index}
                      page={pagelen}
                      setpage={setPagelen}
                      setsearch_item={setled_len}
                      error_message={"Please select Ledger"}
                      error_s={setError}
                      loaded={ledger_loaded}
                      count={ledger_count}
                      bottom={ledger_bottom}
                      setbottom={setledger_bottom}
                    />
                  </div>
                )}
                {/* // Select Ledger */}

                <tbody>
                  {main_list.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td
                          className="sl-column"
                          onClick={() => {
                            delete_row(index);
                          }}
                        >
                          {index + 1}
                        </td>

                        <td>
                          <input
                            style={{ width: "100%" }}
                            name="ledger_name"
                            // value={item[0][1]}
                            value={item[0]}
                            onChange={(val) => {
                              // item[0][1] = val.target.value;
                              item[0] = val.target.value;
                              setled_val_index(index);
                              setled_len(val.target.value);
                              // if(item[0][1].length === 4) {
                              //   alert("Ledger List")
                              // }
                              setrefresh(!refresh);
                            }}
                          />
                        </td>
                        <td className="mode-column">
                          {/* <input
                            style={{ width: "100%" }}

                            value={item[1]}
                            onChange={(val) => {
                              item[1] = val.target.value;
                              setrefresh(!refresh);
                            }}
                          /> */}
                          <select
                            style={{ width: "100%" }}
                            value={item[1]}
                            onChange={(val) => {
                              item[1] = val.target.value;
                              setrefresh(!refresh);
                            }}
                          >
                            <option disabled value={""}>
                              Select...
                            </option>
                            <option value={"Cr"}>Cr</option>
                            <option value={"Dr"}>Dr</option>
                          </select>
                        </td>
                        <td className="tvno-column">
                          <input
                            style={{ width: "100%" }}
                            name="tnno"
                            type="number"
                            min={0}
                            value={item[2]}
                            onChange={(val) => {
                              item[2] = val.target.value;
                              setrefresh(!refresh);
                            }}
                          />
                        </td>
                        <td className="amount-column">
                          <input
                            style={{ width: "100%" }}
                            name="amount"
                            type="number"
                            min={0}
                            value={item[3]}
                            onChange={(val) => {
                              item[3] = val.target.value;
                              setrefresh(!refresh);
                            }}
                          />
                        </td>
                        {/* <td>
                          <input style={{ width: "100%" }} 
                          name="narration"
                          type="number" min={0}
                          step={"0.5"}
                           value={item[4]}
                           onChange={(val) => {
                             item[4] = val.target.value;
                             setrefresh(!refresh);
                           }}/>
                        </td> */}
                        <td>
                          <input
                            style={{ width: "100%" }}
                            name="narration"
                            type="text"
                            value={item[4]}
                            ref={(narrationInput) => {
                              if (narrationInput) {
                                narrationInput.addEventListener(
                                  "keydown",
                                  (event) => addNewRowOnEnter(event, index)
                                );
                              }
                            }}
                            onChange={(val) => {
                              item[4] = val.target.value;
                              setrefresh(!refresh);
                            }}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "right",
                margin: "12px",
              }}
            >
              <button
                type="submit"
                onClick={() => {
             

                  {is_updateing ? UpdateVoucher() :   CreateVoucher() }
                
                }}
              >
              {is_updateing ? "Update Voucher" : "Create" }  
              </button>
              <button
                type="button"
                onClick={() => {
                  add_new_row();
                }}
              >
                Add New
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddVoucher;
