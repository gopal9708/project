
import React, { useState, useLayoutEffect, useEffect } from "react";
import { MdAddCircleOutline, MdRemoveCircleOutline } from "react-icons/md";
import {
  Col,
  Card,
  CardTitle,
  CardBody,
  Label,
  Form,
  Row,
  Input,
  FormFeedback,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
// import { Modal } from "react-bootstrap"
import PageTitle from "../../../components/pageTitle/PageTitle"
import Title from "../../../components/title/Title";
import { IconContext } from "react-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ServerAddress } from "../../../constants/ServerAddress";
import { useSelector } from "react-redux";
import {
  setShowAlert,
  setDataExist,
  setAlertType,
} from "../../../store/alert/Alert";
import { useDispatch } from "react-redux";
import { setToggle } from "../../../store/parentFilter/ParentFilter";
import SearchInput from "../../../components/formComponent/searchInput/SearchInput";

const AddWarehouse = () => {

  const location = useLocation();
  const accessToken = useSelector((state) => state.authentication.access_token);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [circle_btn, setcircle_btn] = useState(true);
  const toggle_circle = () => {
    setcircle_btn(!circle_btn);
  };
  const [circle_btn1, setcircle_btn1] = useState(true);
  const toggle_circle1 = () => {
    setcircle_btn1(!circle_btn1);
  };
  const [circle_btn2, setcircle_btn2] = useState(true);
  const toggle_circle2 = () => {
    setcircle_btn2(!circle_btn2);
  };
  const [circle_btn3, setcircle_btn3] = useState(true);
  const toggle_circle3 = () => {
    setcircle_btn3(!circle_btn3);
  };

  const [circle_btn4, setcircle_btn4] = useState(true);
  const toggle_circle4 = () => {
    setcircle_btn4(!circle_btn4);
  };
  //state for open stroge  
  const [open_stroge, setopen_stroge] = useState(false);
  const [open_stroge_sec, setopen_stroge_sec] = useState("");
  const [open_stroge_no, setopen_stroge_no] = useState([]); // Array to store open stroge section
  // this function is wrok for onclick open input value equal to section /area name 
  const handleOpenStroge = () => {
    const numberOfOpenStroge = parseInt(open_stroge_sec, 10);

    if (!isNaN(numberOfOpenStroge) && numberOfOpenStroge > -1) {
      const newNumberOfOpenStroge = Array.from(
        { length: numberOfOpenStroge },
        (_, index) => index + 1
      );
      setopen_stroge_no(newNumberOfOpenStroge);
    }
  };
 
  //state for bulk stroge 
  const [bulk_stroge, setbulk_stroge] = useState(false);
  const [bulk_stroge_sec, setbulk_stroge_sec] = useState("");
  const [bulk_stroge_no, setbulk_stroge_no] = useState([]); // Array to store bulk stroge section
  // this function is wrok for onclick open input value equal to section /area name 
  const handleBulkStroge = () => {
    const numberOfBulkStroge = parseInt(bulk_stroge_sec, 10);

    if (!isNaN(numberOfBulkStroge) && numberOfBulkStroge > -1) {
      const newNumberOfBulkStroge = Array.from(
        { length: numberOfBulkStroge },
        (_, index) => index + 1
      );
      setbulk_stroge_no(newNumberOfBulkStroge);
    }
  };

  //for high rack
  const [high_rack, sethigh_rack] = useState(false);
  const [high_rack_no, sethigh_rack_no] = useState("");
  const [rack, setrack] = useState([]); // Array to store rack buttons

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [active_rack, setactive_rack] = useState(null);
  // this function is wrok for onclick open input value equal to rack button  
  const handleBlur = () => {
    const numberOfRack = parseInt(high_rack_no, 10);

    if (!isNaN(numberOfRack) && numberOfRack >= 0) {
      const newRacks = Array.from(
        { length: numberOfRack },
        (_, index) => index + 1
      );
      setrack(newRacks);
    }
  };
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const [rackData, setRackData] = useState({});
   console.log("RackData",rackData)
   const [accumulatedRackData, setAccumulatedRackData] = useState([]); 
   console.log("accumulatedRackData===",accumulatedRackData)// State to accumulate rack data
  // Function to open the modal for a specific rack
  const openModalForRack = (RackValue) => {
    // Set the active rack
    setactive_rack(RackValue);

    // Find the data for the active rack in the rackData array
    const rackDataForRack = rackData[RackValue];
    console.log("rackDataForRack=====",rackDataForRack)
    // If data for this rack exists, load it
    if (rackDataForRack) {
      setstack_no(rackDataForRack.stack_no || "");
      setlevel_no(rackDataForRack.level_no || "");
      setbin_size(rackDataForRack.bin_size || "");
      setbin_property(rackDataForRack.bin_property || "");
    } else {
      // If no data exists, reset the form inputs
      setstack_no("");
      setlevel_no("");
      setbin_size("");
      setbin_property("");
    }
    setIsModalOpen(true);
  };

  // Function to handle the modal save action
  const handleModalSave = (active_rack) => {
    const newRackData = {
      // high_rack_no:high_rack_no,
      high_rack_no:active_rack,
      active_rack:encode_active_rack,
      stack_no:stack_no,
      level_no:level_no,
      bin_size:bin_size,
      bin_property:bin_property
    };
    // Update the rackData object with the new data for the active rack
    setRackData({
      ...rackData,
      [active_rack]: newRackData,
    });
    // Accumulate the rack data into the array
    let val = accumulatedRackData.some(v=>v.high_rack_no === active_rack)
    console.log("val=====", val)
    if(val){
      const updatedRackData = accumulatedRackData[parseInt(active_rack)-1]
      updatedRackData.bin_property = bin_property; 
      updatedRackData.bin_size = bin_size; 
      updatedRackData.level_no = level_no; 
      updatedRackData.stack_no = stack_no; 
      console.log("updatedRackData",updatedRackData)
    }
    else{
      setAccumulatedRackData([...accumulatedRackData, newRackData]);
    }
    // Close the modal
    setIsModalOpen(false);
  };

  //  state for modal body
  const [stack_no, setstack_no] = useState("");
  const [bin_property, setbin_property] = useState("");
  const [bin_size, setbin_size] = useState("");
  const [level_no, setlevel_no] = useState("");

  // rack naming
  function encodeNumber(number) {
    const baseChar = 'A';
    const firstDigit = String.fromCharCode(baseChar.charCodeAt(0) + Math.floor((number - 1) / 26));
    const secondDigit = String.fromCharCode(baseChar.charCodeAt(0) + (number - 1) % 26);
    return firstDigit + secondDigit;
  }
  const encode_active_rack = encodeNumber(active_rack);

  const [warehouse_up, setwarehouse_up] = useState("");
  const [warehouse_id, setwarehouse_id] = useState("");
  const [is_updating, setis_updating] = useState("");

  const [branch_name_list, setbranch_name_list] = useState([]);
  const [branch_name, setbranch_name] = useState("");
  const [branch_name_id, setbranch_name_id] = useState("");
  console.log("branch_name,id==", branch_name, branch_name_id)
  const [branch_name_page, setbranch_name_page] = useState(1);
  const [branch_name_error, setbranch_name_error] = useState(false);
  const [branch_name_search_item, setbranch_name_search_item] = useState("");




  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      // This should be in small letter or smallcase
      warehouse_name: warehouse_up.name || "",
      warehouse_city: warehouse_up.city || "",
      warehouse_address: warehouse_up.address || "",
      warehouse_contact: warehouse_up.contact || "",
      warehouse_manager: warehouse_up.manager || "",
    },
    validationSchema: Yup.object({
      warehouse_name: Yup.string().required("warehouse name is required"),
      warehouse_address: Yup.string().required("Warehouse Address is required"),
      warehouse_contact: Yup.string().required("Warehouse Contact is required"),
      warehouse_manager: Yup.string().required("Warehouse Manager is required"),
    }),

    onSubmit: (values) => {
      is_updating ? update_warehouse(values) : send_warehouse_data(values);
    },
  });

  const [page, setpage] = useState(1);
  const search = useSelector((state) => state.searchbar.search_item);

  // To get Branch name-----
  const get_branch = () => {
    let temp = [];
    axios
      .get(
        ServerAddress +
        `master/get-branch-details/?p=${1}&records=${10}&name=${[
          "",
        ]}&name_search=${1}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log("get branch response==", response.data)

        let data = response.data
        for (let i = 0; i < data.length; i++) {
          temp.push([data[i].id, data[i].name]);
        }
        setbranch_name_list(temp);
      })
      .catch((error) => {
        alert(`Error Occured While Getting Bin Size ${error}`);
      });
  };
  // post the warehose data 
  const send_warehouse_data = (values) => {
    // alert("add wms called-----")
    const requestData = {
      name: values.warehouse_name,
      city: branch_name_id,
      address: values.warehouse_address,
      contact: values.warehouse_contact,
      manager: values.warehouse_manager,
      high_rack_data: accumulatedRackData,
    };
  console.log("Data to be sent in the request:", requestData); 
    axios
      .post(
        ServerAddress + "wms/add_warehouse/",
        {
          name: values.warehouse_name,
          city: branch_name_id,
          address: values.warehouse_address,
          contact: values.warehouse_contact,
          manager: values.warehouse_manager,
          high_rack_data: accumulatedRackData,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (response) {
        console.log("Add Warehouse Response is==", response.data)
        if (response.data.status === "success") {
          dispatch(setShowAlert(true));
          dispatch(setAlertType("success"));
          dispatch(
            setDataExist(`WareHouse "${(values.warehouse_name)}" Added Sucessfully`)
          );
          navigate(-1);
        } else if (response.data === "duplicate") {
          dispatch(setShowAlert(true));
          dispatch(
            setDataExist(
              `Ware House "${(values.warehouse_name)}" already exists`
            )
          );
          dispatch(setAlertType("danger"));
        }
      })
      .catch((error) => {
        alert(`Error Happen while posting raches  Data ${error}`);
      });
  };


  const update_warehouse = (values) => {
    // alert("update_warehouse HISTORY called-----------");
    let fields_names = Object.entries({
      name: values.warehouse_name,
      city: branch_name_id,
      address: values.warehouse_address,
      contact: values.warehouse_contact,
      manager: values.warehouse_manager,
    });
    let change_fields = {};
    // console.log("fields_names========", fields_names)
    var prom = new Promise((resolve, reject) => {
      for (let j = 0; j < fields_names.length; j++) {
        const ele = fields_names[j];
        let prev = location.state[`${ele[0]}`];
        let new_v = ele[1];
        if (String(prev).toUpperCase() !== String(new_v).toUpperCase()) {
          change_fields[`${ele[0]}`] = new_v.toString().toUpperCase();
        }
        if (j === fields_names.length - 1) resolve();
      }
    });
    prom.then(() => {
      // alert("UPDATE Warehouse CALLED------");
      axios
        .put(
          ServerAddress + "wms/update_warehouse/" + warehouse_id,
          {
            change_fields: change_fields,
            name: values.warehouse_name,
            city: branch_name_id,
            address: values.warehouse_address,
            contact: values.warehouse_contact,
            manager: values.warehouse_manager,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then(function (response) {
          console.log("update_warehouse response", response.data)
          if (response.data.status === "success") {
            dispatch(setToggle(true));
            dispatch(setShowAlert(true));
            dispatch(setDataExist(`Ware House "${(values.warehouse_name)}" Updated sucessfully`));
            dispatch(setAlertType("success"));
            navigate(-1);
          } else if (response.data === "duplicate") {
            dispatch(setShowAlert(true));
            dispatch(setDataExist(`Ware House "${(values.warehouse_name)}" already exists`));
            dispatch(setAlertType("warning"));
          }
        })
        .catch(function () {
          alert("Error Error While Updateing Warehouse");
        });
    });
  };

  useEffect(() => {
    get_branch();
  }, [])


  useLayoutEffect(() => {
    try {
      let warehouse_loc = location.state.item;
      console.log("warehouse_loc", warehouse_loc)
      setis_updating(true);
      setwarehouse_up(warehouse_loc);
      setwarehouse_id(warehouse_loc.id);

      setbranch_name(warehouse_loc.city_nm)
      setbranch_name_id(warehouse_loc.city)
    } catch (error) { }
  }, [])

  

  return (
    <div>
      {/* this modal is  open when High Rack button clicked   */}
      <Modal isOpen={isModalOpen} toggle={toggleModal} size="lg" backdrop="static" keyboard={false}>
        <ModalHeader toggle={toggleModal}>RACK Name  {encodeNumber(active_rack)} </ModalHeader>
        <ModalBody>
          <Row>
            <Col lg={4} md={6} sm={6}>
              <div className="m-2 mb-2">
                <Label className="header-child sm-10">Stack No</Label>
                <Input
                  value={stack_no}
                  onChange={(val) => {
                    setstack_no(val.target.value);
                  }}
                  className="form-control d-block from control-md"
                  bsSize="sm"
                  name="stack_no"
                  type="number"
                  min={0}
                />
              </div>
            </Col>
            <Col lg={4} md={6} sm={6}>
              <div className="m-2 mb-2">
                <Label className="header-child sm-10">level No</Label>
                <Input
                  value={level_no}
                  onChange={(val) => {
                    setlevel_no(val.target.value);
                  }}
                  className="form-control d-block from control-md"
                  bsSize="sm"
                  name="level_no"
                  type="number"
                  min={0}
                />
              </div>
            </Col>
            <Col lg={4} md={6} sm={6}>
              <div className="m-2 mb-2">
                <Label className="header-child sm-10">Bin Size</Label>
                <Input
                  value={bin_size}
                  onChange={(val) => {
                    setbin_size(val.target.value);
                  }}
                  className="form-control d-block from control-md"
                  bsSize="sm"
                  name="bin_size"
                  type="text"
                  min={0}
                />
              </div>
            </Col>
            <Col lg={4} md={6} sm={6}>
              <div className="m-2 mb-2">
                <Label className="header-child sm-10">Bin Property</Label>
                <Input
                  value={bin_property}
                  onChange={(val) => {
                    setbin_property(val.target.value);
                  }}
                  className="form-control d-block from control-md"
                  bsSize="sm"
                  name="bin_property"
                  type="text"
                />
              </div>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={toggleModal}>
            Cancel
          </Button>
          <Button color="success"
          onClick={()=>handleModalSave(active_rack)}
          >
            Save2
          </Button>
        </ModalFooter>
      </Modal>

      <Form
        onSubmit={(e) => {
          e.preventDefault();
          validation.handleSubmit(e.values);
          return false;
        }}
      >
        <div className="mt-3">
          <PageTitle page="Warehouse" />
          <Title title=" Add Warehouse" parent_title="Warehouse" />
        </div>

        {/*  Warehouse */}
        <div className=" m-3">
          <Col lg={12}>
            <Card className="shadow bg-white rounded">
              <CardTitle className="mb-1 header">
                <div className="header-text-icon header-text">
                  Warehouse
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
                        <Label className="header-child">Warehouse Name:*</Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.warehouse_name || ""}
                          // invalid={
                          //   validation.touched.warehouse_name &&
                          //   validation.errors.warehouse_name
                          //     ? true
                          //     : false
                          // }
                          type="text"
                          name="warehouse_name"
                          className="form-control-md "
                          id="input"
                          placeholder="Enter Warehouse Name"
                        />
                        {/* {validation.touched.warehouse_name &&
                        validation.errors.warehouse_name ? (
                          <FormFeedback type="invalid">
                            {validation.errors.warehouse_name}
                          </FormFeedback>
                        ) : null} */}
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className='header-child"'>Warehouse City:</Label>
                        <SearchInput
                          data_list={branch_name_list}
                          setdata_list={setbranch_name_list}
                          data_item_s={branch_name}
                          set_data_item_s={setbranch_name}
                          set_id={setbranch_name_id}
                          page={branch_name_page}
                          setpage={setbranch_name_page}
                          error_message={"Please Select city Name"}
                          error_s={branch_name_error}
                          setsearch_item={setbranch_name_search_item}
                        />
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">
                          Warehouse Address:
                        </Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.warehouse_address || ""}
                          // invalid={
                          //   validation.touched.warehouse_address && validation.errors.warehouse_address
                          //     ? true
                          //     : false
                          // }
                          className="form-control-md "
                          name="warehouse_address"
                          id="input"
                          type="text"
                          placeholder="Enter Warehouse Address"
                        />
                        {/* {validation.touched.warehouse_address && validation.errors.warehouse_address ? (
                          <FormFeedback type="invalid">
                            {validation.errors.warehouse_address}
                          </FormFeedback>
                        ) : null} */}
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">
                          Warehouse Contact:
                        </Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.warehouse_contact || ""}
                          // invalid={
                          //   validation.touched.warehouse_contact &&
                          //   validation.errors.warehouse_contact
                          //     ? true
                          //     : false
                          // }
                          className="form-control-md "
                          name="warehouse_contact"
                          id="input"
                          type="tel"
                          placeholder="Enter Warehouse Contact"
                        />
                        {/* {validation.touched.warehouse_contact &&
                        validation.errors.warehouse_contact ? (
                          <FormFeedback type="invalid">
                            {validation.errors.warehouse_contact}
                          </FormFeedback>
                        ) : null} */}
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">
                          Warehouse Manager:
                        </Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.warehouse_manager || ""}
                          // invalid={
                          //   validation.touched.warehouse_manager &&
                          //   validation.errors.warehouse_manager
                          //     ? true
                          //     : false
                          // }
                          className="form-control-md "
                          name="warehouse_manager"
                          id="input"
                          type="text"
                          placeholder="Enter Warehouse Manager"
                        />
                        {/* {validation.touched.warehouse_manager &&
                        validation.errors.warehouse_manager ? (
                          <FormFeedback type="invalid">
                            {validation.errors.warehouse_manager}
                          </FormFeedback>
                        ) : null} */}
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              ) : null}
            </Card>
          </Col>
        </div>
        {/* Storge Type */}
        <div className=" m-3">
          <Col lg={12}>
            <Card className="shadow bg-white rounded">
              <CardTitle className="mb-1 header">
                <div className="header-text-icon header-text">
                  Storge Type
                  <IconContext.Provider
                    value={{
                      className: "header-add-icon",
                    }}
                  >
                    <div onClick={toggle_circle1}>
                      {circle_btn1 ? (
                        <MdRemoveCircleOutline />
                      ) : (
                        <MdAddCircleOutline />
                      )}
                    </div>
                  </IconContext.Provider>
                </div>
              </CardTitle>
              {circle_btn1 ? (
                <CardBody>
                  <Row>
                    <Col lg={4} md={6} sm={6}>
                      <div className="m-2 mb-2">
                        <Label className="header-child sm-10">
                          Open Storage
                        </Label>
                        {/* <br /> */}
                        <Input
                          checked={open_stroge === true}
                          onClick={() => {
                            setopen_stroge(!open_stroge);
                          }}
                          style={{ margin: "5px", alignItems: "center" }}
                          type="checkbox"
                        />
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="m-2 mb-2">
                        <Label className="header-child sm-10">
                          Bulk Storage
                        </Label>
                        {/* <br /> */}
                        <Input
                          checked={bulk_stroge === true}
                          onClick={() => {
                            setbulk_stroge(!bulk_stroge);
                          }}
                          style={{ margin: "5px", alignItems: "center" }}
                          type="checkbox"
                        />
                      </div>
                    </Col>
                    <Col lg={4} md={6} sm={6}>
                      <div className="m-2 mb-2">
                        <Label className="header-child sm-10">High Rack</Label>
                        {/* <br /> */}
                        <Input
                          checked={high_rack === true}
                          onClick={() => {
                            sethigh_rack(!high_rack);
                          }}
                          style={{ margin: "5px", alignItems: "center" }}
                          type="checkbox"
                        />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              ) : null}
            </Card>
          </Col>
        </div>
        {/* this is open when Open Storge is checked  */}
        {open_stroge === true && (
          <div className=" m-3">
            <Col lg={12}>
              <Card className="shadow bg-white rounded">
                <CardTitle className="mb-1 header">
                  <div className="header-text-icon header-text">
                    Open Storge Section
                    <IconContext.Provider
                      value={{
                        className: "header-add-icon",
                      }}
                    >
                      <div onClick={toggle_circle3}>
                        {circle_btn3 ? (
                          <MdRemoveCircleOutline />
                        ) : (
                          <MdAddCircleOutline />
                        )}
                      </div>
                    </IconContext.Provider>
                  </div>
                </CardTitle>
                {circle_btn3 ? (
                  <CardBody>
                    <Row>
                      <Col lg={4} md={6} sm={6}>
                        <div className="m-2 mb-2">
                          <Label className="header-child sm-10">
                            How Many Section
                          </Label>
                          <Input
                            value={open_stroge_sec}
                            onChange={(val) => {
                              setopen_stroge_sec(val.target.value);
                            }}
                            onClick={handleOpenStroge}
                            className="form-control d-block from control-md"
                            bsSize="sm"
                            name="open_stroge_sec"
                            type="number"
                            min={0}
                          />
                        </div>
                      </Col>
                    </Row>

                    <Row>
                      {open_stroge_no.map((storageValue, index) => (
                        <Col lg={4} md={6} sm={6} key={index}>
                          <div className="m-2 mb-2">
                            <div className="section-item">
                              <Label>Section/Area Name {storageValue}</Label>
                              <Input
                                className="form-control d-block from control-md"
                                bsSize="sm"
                                name={`section_${storageValue}_name`}
                                type="text"
                                placeholder={`Enter Section/Area Name ${storageValue}`}
                              />
                            </div>
                          </div>
                        </Col>
                      ))}
                    </Row>
                  </CardBody>
                ) : null}
              </Card>
            </Col>
          </div>
        )}
        {/* this is open when Bulk Storage is checked */}
        {bulk_stroge === true && (
          <div className=" m-3">
            <Col lg={12}>
              <Card className="shadow bg-white rounded">
                <CardTitle className="mb-1 header">
                  <div className="header-text-icon header-text">
                    Bulk Storge Section
                    <IconContext.Provider
                      value={{
                        className: "header-add-icon",
                      }}
                    >
                      <div onClick={toggle_circle4}>
                        {circle_btn4 ? (
                          <MdRemoveCircleOutline />
                        ) : (
                          <MdAddCircleOutline />
                        )}
                      </div>
                    </IconContext.Provider>
                  </div>
                </CardTitle>
                {circle_btn4 ? (
                  <CardBody>
                    <Row>
                      <Col lg={4} md={6} sm={6}>
                        <div className="m-2 mb-2">
                          <Label className="header-child sm-10">
                            How Many Section
                          </Label>
                          <Input
                            value={bulk_stroge_sec}
                            onChange={(val) => {
                              setbulk_stroge_sec(val.target.value);
                            }}
                            onClick={handleBulkStroge}
                            className="form-control d-block from control-md"
                            bsSize="sm"
                            name="bulk_stroge_sec"
                            type="number"
                            min={0}
                          />
                        </div>
                      </Col>
                    </Row>

                    <Row>
                      {bulk_stroge_no.map((storageBulkValue, index) => (
                        <Col lg={4} md={6} sm={6} key={index}>
                          <div className="m-2 mb-2">
                            <div className="section-item">
                              <Label>Section/Area Name {storageBulkValue}</Label>
                              <Input
                                className="form-control d-block from control-md"
                                bsSize="sm"
                                name={`section_${storageBulkValue}_name`}
                                placeholder={`Enter Section/Area Name ${storageBulkValue}`}
                                type="text"
                              />
                            </div>
                          </div>
                        </Col>
                      ))}
                    </Row>
                  </CardBody>
                ) : null}
              </Card>
            </Col>
          </div>
        )}
        {/* this is open when High Rack is checked */}
        {high_rack === true && (
          <div className=" m-3">
            <Col lg={12}>
              <Card className="shadow bg-white rounded">
                <CardTitle className="mb-1 header">
                  <div className="header-text-icon header-text">
                    High Rack Storge Type
                    <IconContext.Provider
                      value={{
                        className: "header-add-icon",
                      }}
                    >
                      <div onClick={toggle_circle2}>
                        {circle_btn2 ? (
                          <MdRemoveCircleOutline />
                        ) : (
                          <MdAddCircleOutline />
                        )}
                      </div>
                    </IconContext.Provider>
                  </div>
                </CardTitle>
                {circle_btn2 ? (
                  <CardBody>
                    <Row>
                      {/* {high_rack === true && ( */}
                      <Col lg={4} md={6} sm={6}>
                        <div className="m-2 mb-2">
                          <Label className="header-child sm-10">
                            Number Of High Rack
                          </Label>
                          <Input
                            value={high_rack_no}
                            onChange={(val) => {
                              sethigh_rack_no(val.target.value);
                            }}
                            onClick={handleBlur}
                            onBlur={handleBlur}
                            className="form-control d-block from control-md"
                            bsSize="sm"
                            name="high_rack_no"
                            type="number"
                            min={0}
                          />
                        </div>
                      </Col>
                      {/* )} */}
                      {high_rack && (
                        <Col lg={12}>
                          <div
                            className="m-2 mb-2 section-container"
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                              gap: "20px",
                            }}
                          >
                            {rack.map((RackValue, index) => (
                              <div key={index} className="section-item">
                                <Button
                                  color="primary"
                                  onClick={() => openModalForRack(RackValue)}
                                //  onClick={toggleModal}
                                >
                                  RACK {RackValue}
                                </Button>
                              </div>
                            ))}
                          </div>
                        </Col>
                      )}
                    </Row>
                  </CardBody>
                ) : null}
              </Card>
            </Col>
          </div>
        )}
        {/*Button */}
        <div className=" m-3">
          <Col lg={12}>
            <div className="mb-1 footer_btn">
              <button type="submit" className="btn btn-info m-1">
                Save
              </button>

              <button
                type="submit"
                className="btn btn-info m-1 "
                onClick={() => navigate(-1)}
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

export default AddWarehouse;