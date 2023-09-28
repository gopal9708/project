import React, { useState, useEffect } from "react";
import { IconContext } from "react-icons";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setToggle } from "../../store/parentFilter/ParentFilter";
import {
  Card,
  CardBody,
  CardTitle,
  FormFeedback,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { MdAddCircleOutline, MdRemoveCircleOutline } from "react-icons/md";
import {
  setAlertType,
  setDataExist,
  setShowAlert,
} from "../../store/alert/Alert";
import { ServerAddress } from "../../constants/ServerAddress";
import { useNavigate } from "react-router-dom";
import toTitleCase from "../../lib/titleCase/TitleCase";

const Miscellaneous = () => {
  const navigate = useNavigate();
  const accessToken = useSelector((state) => state.authentication.access_token);
  
  //Circle Toogle Btn
  const [circle_btn, setcircle_btn] = useState(true);
  const toggle_circle = () => {
    setcircle_btn(!circle_btn);
  };
  const dispatch = useDispatch();
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");

  const [name_err, setname_err] = useState(false);
  const [description_err, setdescription_err] = useState(false);
  //----- Api For Posting Data------//
  const Category = async () => {
    try {
      const response = await axios.post(
        ServerAddress + "notice_board/add-Category/",
        {
          // vehcile_no: vehcile_no,
          name: toTitleCase(name).toUpperCase(),
          description: description,
        },

        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },

        }
      );
      if(response.data.status ==="success") {
        dispatch(setToggle(true));
        dispatch(setShowAlert(true));
        dispatch(setDataExist(`User Added sucessfully`));
        dispatch(setAlertType("success"));
        navigate(-1)
      }
      console.log("Timline", response.data);
    } catch (error) {
      alert(`Error Happened while posting Timeline Data ${error}`);
    }
  };


  useEffect(() => {
  if(name !== "") {
    setname_err(false);
  }
  if(description !== "") {
    setdescription_err(false);
  }
  }, [name,description]);
  
  return (
    <React.Fragment>
      <Form
        onSubmit={(e) => {
          e.preventDefault();

          if (name === "") {
            setname_err(true);
          }else if(description === "") {
            setdescription_err(true);
          } else {
            Category();
          }
        }}
      >
        <div className="page-content">
          <Container fluid>
            <Row>
              <Col lg={12}>
                <Card>
                  <CardTitle className="mb-1 header">
                    <div className="header-text-icon header-text">
                      Notice Category
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
                      <CardTitle className="mb-4">Notice Category</CardTitle>
                      <Form>
                        <FormGroup className="mb-4" row>
                          <Label
                            htmlFor="projectname"
                            className="col-form-label col-lg-2"
                          >
                            Name*
                          </Label>
                          <Col lg="10">
                            <Input
                              value={name}
                              onChange={(val) => {
                                setname(val.target.value);
                              }}
                              id="input"
                              name="name_timeline"
                              type="text"
                              className="form-control"
                              placeholder="Enter Your Title..."
                              invalid={name_err}
                            />
                            <FormFeedback type="invalid">Enter your Name</FormFeedback>
                          </Col>
                        </FormGroup>
                        <FormGroup className="mb-4" row>
                          <Label
                            htmlFor="projectdesc"
                            className="col-form-label col-lg-2"
                          >
                            Description
                          </Label>
                          <Col lg="10">
                            <textarea
                              value={description}
                              onChange={(val) => {
                                setdescription(val.target.value);
                              }}
                              className="form-control"
                              name="Description"
                              id="input"
                              rows="3"
                              placeholder="Enter  Description..."
                            />
                            {description_err && 
                            <div style={{color:"red"}}>Enter Description</div>}
                          </Col>
                        </FormGroup>
                        {/*Button */}
                      </Form>
                    </CardBody>
                  ) : null}
                </Card>
              </Col>
            </Row>
            <div className=" m-4">
              <Col lg={12}>
                <div className="mb-1 footer_btn">
                  <button className="btn btn-info m-2" type="submit">
                    Save
                  </button>

                  <button
                    type="submit"
                    className="btn btn-info m-2 "
                    onClick={() => navigate(-1)}
                  >
                    Cancel
                  </button>
                </div>
              </Col>
            </div>
          </Container>
        </div>
      </Form>
    </React.Fragment>
  );
};

export default Miscellaneous;
