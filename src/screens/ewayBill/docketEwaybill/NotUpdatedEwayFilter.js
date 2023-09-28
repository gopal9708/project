import React, { useState, useEffect } from "react";
import "../../../assets/scss/filters/filter.scss";
import { useDispatch } from "react-redux";
import { Form, Label,Col, Row  } from "reactstrap";
import { setFilterA } from "../../../store/filterValue/FilterValue";
import { setToggle } from "../../../store/parentFilter/ParentFilter";

function NotUpdatedFilter() {
  const dispatch = useDispatch();
  // Additional Fields
  const [user_active_btn, setuser_active_btn] = useState(["True", "False"]);

useEffect(() => {
  setuser_active_btn("False")
}, [])


  const handleSubmit = () => {
    settoggle(true);
  };

  const [toggle, settoggle] = useState(false);

  useEffect(() => {
    settoggle(false);
  }, []);

  useEffect(() => {
    dispatch(setToggle(toggle));
  }, [toggle]);

  useEffect(() => {
    dispatch(setFilterA([user_active_btn]));
  }, [user_active_btn]);

  return (
    <>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div>
          <Label className="filter-label">Is Updated</Label>
          <Row>
            <Col lg={6} md={6} sm={6}>
              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name="user_type"
                  id="exampleRadio2"
                  value="Not Active"
                  onClick={() => {
                    setuser_active_btn("False");
                  }}
                  checked={user_active_btn === "False"}
                />
                <label
                  className="form-check-label input-box"
                  htmlFor="exampleRadios2"
                >
                  Not Updated
                </label>
              </div>
            </Col>
            <Col lg={6} md={6} sm={6}>
              <div className="form-check mb-2">
                <input
                  className="form-check-input "
                  type="radio"
                  name="user_type"
                  id="exampleRadio1"
                  value="Is Active"
                  onClick={() => {
                    setuser_active_btn("True");
                  }}
                  checked={user_active_btn === "True"}
                />

                <label
                  className="form-check-label input-box"
                  htmlFor="exampleRadios1"
                >
                  Updated
                </label>
              </div>
            </Col>
          </Row>
        </div>
        <div style={{ paddingTop: "10px" }}>
          <button type="submit" className="btn btn-primary m-1">
            Submit
          </button>
        </div>
      </Form>
    </>
  );
}

export default NotUpdatedFilter;
