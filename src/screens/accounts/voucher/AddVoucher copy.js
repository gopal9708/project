import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { Input, Label, FormFeedback, FormGroup, Button } from "reactstrap";
import NSearchInput from "../../../components/formComponent/nsearchInput/NSearchInput";
import Modal from "react-bootstrap/Modal";
import "./AddVoucher.css";

const AddVoucher = () => {
  let list_is = [
    [["", ""], "", "", "", ""],
    [["", ""], "", "", "", ""],
    [["", ""], "", "", "", ""],
    [["", ""], "", "", "", ""],
    [["", ""], "", "", "", ""],
    [["", ""], "", "", "", ""],
    [["", ""], "", "", "", ""],
    [["", ""], "", "", "", ""],
    [["", ""], "", "", "", ""],
    [["", ""], "", "", "", ""],
  ];

  const [refresh, setrefresh] = useState(false);
  const [main_list, setmain_list] = useState(list_is);
  console.log("main List", main_list);
  const add_new_row = () => {
    let list_a = [["", ""], "", "", "", "", ""];
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

  // for date
  const date = new Date();

  // For Branch dropdown
  const [branch_list, setbranch_list] = useState([
    "DHTC (Kolkata)",
    "DHTC (Jamshedpur)",
    "DHTC (Ranchi)",
  ]);
  const [branch, setbranch] = useState("");

  // to open ledger list

  //   useEffect(() => {
  //  {main_list.map((item , idx) => {
  //   if(item[0][1].length === 4) {
  //     alert("Hello")
  //   }
  //  })}
  //   }, [main_list])

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
      <form>
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
              <h3> Add Voucher</h3>
            </div>

            <div className="m-3">
              <Col lg={12}>
                <Row>
                  <Col lg={3}>
                    <div>
                      <Label>Branch</Label>
                      <NSearchInput
                        data_list={branch_list}
                        data_item_s={branch}
                        set_data_item_s={setbranch}
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col lg={3}>
                    <div>
                      <Label>Date</Label>
                      <Input type="date" value={date} />
                    </div>
                  </Col>

                  <Col lg={3}>
                    <div>
                      <Label>Entry By</Label>
                      <Input type="text" />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col lg={3}>
                    <div>
                      <Label>Voucher Number</Label>
                      <Input />
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div>
                      <Label>Entry Date</Label>
                      <Input type="date" />
                    </div>
                  </Col>
                </Row>
              </Col>
            </div>
          </div>

          <div style={{ background: "" }}>
            <div
              style={{
                marginTop: 50,
                overflowX: "scroll",
                zIndex: "1",
                margin: "20px 20px 20px 20px ",
              }}
            >
              <table className="table-grid" style={{ zIndex: "0" }}>
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
                      Narration
                    </th>
                  </tr>
                </thead>

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
                            value={item[0][1]}
                            onChange={(val) => {
                              item[0][1] = val.target.value;
                              if (item[0][1].length === 4) {
                                alert("Ledger List");
                              }
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
                          <select style={{ width: "100%" }}>
                            <option disabled value={""}>
                              Select...
                            </option>
                            <option value={"Credit"}>Cr</option>
                            <option value={"Debit"}>Dr</option>
                          </select>
                        </td>
                        <td className="tvno-column">
                          <input
                            style={{ width: "100%" }}
                            name="tnno"
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
                            value={item[3]}
                            onChange={(val) => {
                              item[3] = val.target.value;
                              setrefresh(!refresh);
                            }}
                          />
                        </td>
                        <td>
                          <input
                            style={{ width: "100%" }}
                            name="narration"
                            type="number"
                            min={0}
                            step={"0.5"}
                            value={item[4]}
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
