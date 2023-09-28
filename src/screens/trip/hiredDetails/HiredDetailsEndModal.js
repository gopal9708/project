/* eslint-disable */
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../../../assets/scss/forms/form.scss";
import { Col, Label, Input, FormFeedback } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ServerAddress } from "../../../constants/ServerAddress";

function HiredDetailsEndModal({ id, Start_Km }) {
  const accessToken = useSelector((state) => state.token.access_token);

  //----------For Current Time--------------
  const time = null;
  const [gtime, setgtime] = useState(time);

  const handelTime = () => {
    let time = new Date().toLocaleTimeString();
    setgtime(time);
  };

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    // setcreateRunsheet_list([]);
  };
  const handleShow = () => {
    setShow(true);
  };
  const handleClick = () => {
    setShow(false);
  };

  const send_hire_end_data = (values) => {
    axios
      .post(
        ServerAddress + "Transporter/post-tripendtime/",
        // server_address + "Transporter/post-tripendtime/",
        {
          hired_id: id,
          end_km: values.end_km,
        },

        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (response) {
        if (response.statusText === "Created") {
          alert("Trip End");
        }
      })
      .catch((error) => {
        alert(`Error Happen while posting Trip End Data ${error}`);
      });
  };

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      end_km: "",
    },
    validationSchema: Yup.object({
      end_km: Yup.string().required("field is required"),
    }),
    onSubmit: (values) => {
      if (values.end_km <= Start_Km) {
        alert("End Km Is Not Lessthen Start Km");
      } else {
        send_hire_end_data(values);
      }
    },
  });

  return (
    <>
      <Button
        style={{
          background: "radial-gradient(red, transparent)",
          borderRadius: "5px",
          color: "white",
        }}
        onClick={handleShow}
      >
        End
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        // backdrop="static"
        // keyboard={false}
        // dialogClassName="main-modal"
        // style={{ marginTop: "25px" }}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>End Trip</Modal.Title>
        </Modal.Header>

        <>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              validation.handleSubmit(e.values);
              return false;
            }}
          >
            <Modal.Body>
              <div>
                <Col lg={10} md={12} sm={12}>
                  <div className="mb-3">
                    <Label>Close KM</Label>
                    <Input
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.end_km || ""}
                      invalid={
                        validation.touched.end_km && validation.errors.end_km
                          ? true
                          : false
                      }
                      type="number"
                      min={0}
                      className="form-control-md input"
                      placeholder="Enter end KM"
                      name="end_km"
                    />
                    {validation.touched.end_km && validation.errors.end_km ? (
                      <FormFeedback type="invalid">
                        {validation.errors.end_km}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
              </div>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="primary" type="submit" onClick={handleClick}>
                Submit
              </Button>

              <Button type="button" variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </form>
        </>
      </Modal>
    </>
  );
}

export default HiredDetailsEndModal;
