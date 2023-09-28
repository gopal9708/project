import React, { useState } from "react";
import {
  IoIosArrowDropright,
  IoIosCloseCircleOutline,
  IoMdShare,
} from "react-icons/io";
import "../../components/trip/VehicleCard.css";
import { BsFileBarGraph } from "react-icons/bs";
import { VscLocation } from "react-icons/vsc";
import Modal from "react-bootstrap/Modal";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { Link } from 'react-router-dom';

const VehicleCard = ({
  vehicle_no,
  last_data,
  location = [],
  setlocation_is,
}) => {
  const [show, setShow] = useState(false);
  const [fuel_show, setfuel_Show] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleFuelShow = () => setfuel_Show(true);
  const handleFuelClose = () => setfuel_Show(false);
  const fuelData = [
    { date: '01 Sep 2023 01:40 PM', fuelLevel: 0 },
    { date: '01 Sep 2023 04:50 PM', fuelLevel: 25 },
  ];
  
  const speedData = [
    { date: '01 Sep 2023 01:40 PM', speed: 0 },
    { date: '01 Sep 2023 04:50 PM', speed: 10 },
  ];
  return (
    <>
      <Modal
        size="lg"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Body>
          <>
            <div className="modal_close_btn">
              <span
                className="more-info"
                style={{
                  display: "flex",
                  alignItem: "center",
                  fontSize: "1.125rem",
                  lineHeight: "215%",
                  fontWeight: "500",
                  color: "#747474",
                }}
              >
                <p> More Information-</p>
                {/* {"      "} - {"     "} */}
                {/* <p
                  color="#3bb3c3"
                  style={{
                    color: "#3bb3c3",
                    lineHeight: "167%",
                    fontSize: "1.2rem",
                    fontWeight: "700",
                  }}
                  > */}
                <h4
                  style={{
                    color: "#3bb3c3",
                    lineHeight: "200%",
                    fontWeight: "700",
                    color: "#3bb3c3",
                  }}
                >
                  {" "}
                  BH33JN3433
                </h4>
                {/* </p> */}
              </span>

              <span>
                <IoIosCloseCircleOutline
                  size={22}
                  color="#fff"
                  onClick={() => setShow(false)}
                  style={{
                    cursor: "pointer",
                    backgroundColor: "#747474",
                    borderRadius: "20px",
                  }}
                />
              </span>
            </div>
            <div className="content_container">
              <div className="content1">
                <div className="content_item">
                  <p className="content-item-p">Fuel:</p>
                  <p>
                    <b>64.37 Ls(64.37%)</b>
                  </p>
                  <BsFileBarGraph size={16} color="#3bb3c3" />
                </div>
                <div className="content_item">
                  <p className="content-item-p">GPS Satellites:</p>
                  <p>
                    <b>19</b>
                  </p>
                </div>
                <div className="content_item">
                  <p className="content-item-p">Speed:</p>
                  <p>
                    <b>0km/h</b>
                  </p>
                </div>
                <div className="content_item">
                  <p className="content-item-p">Ambient Temperature:</p>
                  <p>
                    <b>89 °C</b>
                  </p>
                </div>
                <div className="content_item">
                  <p className="content-item-p">Distance MIL On:</p>
                  <p>
                    <b>0 Meter</b>
                  </p>
                </div>
                <div className="content_item">
                  <p className="content-item-p">Engine Fuel Rate:</p>
                  <p>
                    <b>01/100 km</b>
                  </p>
                </div>
                <div className="content_item">
                  <p className="content-item-p">Device Battery %: </p>
                  <p>
                    <b>0 %</b>
                  </p>
                </div>
                <div className="content_item">
                  <p className="content-item-p">Throttle Position:</p>
                  <p>
                    <b>41%</b>
                  </p>
                </div>
                <div className="content_item">
                  <p className="content-item-p">Location:</p>
                  <p>
                    <b>NH 48, Mohanpur, Haryana 123501, India</b>
                  </p>
                </div>
              </div>
              <div className="content2">
                <div className="content_item">
                  <p className="content-item-p">Temperature:</p>
                  <p>
                    <b>N/A</b>
                  </p>
                </div>
                <div className="content_item">
                  <p className="content-item-p">Ignition:</p>
                  <p>
                    <b>OFF</b>
                  </p>
                </div>
                <div className="content_item">
                  <p className="content-item-p">Vehicle Battery Voltage:</p>
                  <p>
                    <b>12.06 V </b>
                  </p>
                </div>
                <div className="content_item">
                  <p className="content-item-p">Control Module Voltage:</p>
                  <p>
                    <b>13.5 Volt</b>
                  </p>
                </div>
                <div className="content_item">
                  <p className="content-item-p">Engine Coolant Temperature: </p>
                  <p>
                    <b>73 °C</b>
                  </p>
                </div>
                <div className="content_item">
                  <p className="content-item-p">Engine Oil Temperature:</p>
                  <p>
                    <b>124 °C </b>
                  </p>
                </div>
                <div className="content_item">
                  <p className="content-item-p">Engine RPM:</p>
                  <p>
                    <b>1278.71 RPM</b>
                  </p>
                </div>
                <div className="content_item">
                  <p className="content-item-p">Orientation Value:</p>
                  <p>
                    <b>52</b>
                  </p>
                </div>
              </div>
            </div>
          </>
        </Modal.Body>
      </Modal>
      <Modal
        size="xl"
        show={fuel_show}
        onHide={handleFuelClose}
        backdrop="static"
        keyboard={false}
        // centered
      >
        <Modal.Body>
          <div className="contain-close">
            <IoIosCloseCircleOutline
              size={24}
              onClick={() => setfuel_Show(false)}
            />
          </div>
          <div className="contain-fuel-vh">
            <p className="contain-fuel">Fuel-</p>
            <p className="contain-fuel-vhno">UP44AT4446</p>
          </div>
          <div className="tank-summary">Tank Summary</div>
          <div className="contain-dropdwon">
            <div className="contain-dropdwon1" >
              <span className="select-1">
              <select>
                <option>Last 6 Hours</option>
                <option>Last 24 Hours</option>
                <option>Last 48 Hours</option>
                <option>Yesterday</option>
                <option>Last 7 Days</option>
                <option>custom date range</option>
              </select>
              </span>
            </div>
            <div className="contain-dropdwon1" >
            <span className="select-1">
              <select>
                <option>Time Interval - 5 Minutes </option>
                <option>Time Interval - 15 Minutes </option>
                <option>Time Interval - 30 Minutes </option>
                <option>Time Interval - 1 Hours </option>
              </select>
              </span>
              </div>
          </div>
          <div className="contain-fuel-details">
          <div className="contain-tank-capacity">
            <p className="conation-details-name">Tank Capacity</p>
            <p className="conatin-Capacity-liter">400 L</p>
          </div>
          <div className="contain-tank-capacity">
            <p className="conation-details-name">Fuel Consumed</p>
            <p  className="conatin-consumed-liter">289.5 L</p>
          </div>
          <div className="contain-tank-capacity">
            <p className="conation-details-name" >Refuel</p>
            <p className="conatin-consumed-liter">191.44 L</p>
            <p>Total Refueled :<span>1 times</span> </p> 
          </div>
          <div className="contain-tank-capacity" style={{borderRight:"none"}}>
            <p className="conation-details-name">Fuel Drained</p>
            <p className="conatin-consumed-liter">40 L</p>
            <p>Total Fuel Drained :<span> 0 times</span> </p> 
          </div>
          </div>
          <p className="Driving-Metric">Driving Metrics</p>
          <div className="contain-fuel-details">
          <div className="contain-Driving-details">
          <p className="conation-details-name">Distance</p>
          <p className="conatin-Driving-liter">646.53 km</p>
          </div>
          <div className="contain-Driving-details">
          <p className="conation-details-name">Average Speed</p>
          <p className="conatin-Driving-liter">49.33 km/hr</p>
          </div>
          <div className="contain-Driving-details">
          <p className="conation-details-name">Top Speed</p>
          <p className="conatin-Driving-liter">191.44 L</p>
          </div>
          <div className="contain-Driving-details">
          <p className="conation-details-name">Harsh Acceleration</p>
          <p className="conatin-Driving-liter">0 times</p>
          </div>
          <div className="contain-Driving-details">
          <p className="conation-details-name">Sudden Brake</p>
          <p className="conatin-Driving-liter">0 times</p>
          </div>
          <div className="contain-Driving-details"  style={{borderRight:"none"}}>
          <p className="conation-details-name">Fuel Efficiency</p>
          <p className="conatin-Driving-liter">1.92 km/l</p>
          </div>

          </div>
          {/* <div className="App">
      <h1>Fuel Level Trend and Speed Chart</h1>
      <AddAsn fuelData={fuelData} speedData={speedData} />
    </div> */}
           
          
           
        </Modal.Body>
      </Modal>
      <div className="cart-container">
        <div className="cart-header">
          <h5 className="vehicle-number">{vehicle_no}</h5>
          <div className="header-icons">
            <button className="icon-button">
              <span>
                <IoMdShare
                  data-tooltip-id="Share-tooltip"
                  data-tooltip-content="Share"
                />
              </span>
              <ReactTooltip id="Share-tooltip" effect="solid" place="left" />
            </button>
            <button className="icon-button">
              <i
                className="fas fa-user"
                data-tooltip-id="driver-tooltip"
                data-tooltip-content="Driver"
              ></i>
              <ReactTooltip id="driver-tooltip" effect="solid" place="left" />
            </button>
            <button className="icon-button">
              <i
                className="fas fa-route"
                data-tooltip-id="trip-tooltip"
                data-tooltip-content="Create Trip"
              ></i>
              <ReactTooltip id="trip-tooltip" effect="solid" place="left" />
            </button>
            <button className="icon-button">
              <i
                className="fas fa-car"
                data-tooltip-id="vehicle-tooltip"
                data-tooltip-content="Vehicle State"
              ></i>
              <ReactTooltip id="vehicle-tooltip" effect="solid" place="left" />
            </button>
          </div>
        </div>
        <div className="cart-info">
          <div className="cart-stats">
            <span>Stopped..</span>
            <span>1 hour</span>
            <span>|</span>
            <span className="today-car-info">Today:</span>
            <span className="today-car-info">260.9 km</span>
          </div>
        </div>
        <div className="last-data-received">{last_data}</div>
        <div className="location-info">
          <div className="location-icon">
            {/* <i className="fas fa-map-marker-alt"></i> */}
            <VscLocation size={22} />
          </div>
          <div className="location-text">
            Sagarpali, Chhattisgarh 493558, India
          </div>
          <div className="location-icon">
            <i className="fas fa-bed"></i>
          </div>
          <div>
            <button onClick={() => setlocation_is(location)}>Track</button>
          </div>
        </div>

        <div className="toll-info">
          <div className="toll-icon">
            <i className="fas fa-road"></i>
          </div>
          <div className="toll-text">
            Last Toll: KARJEEVANHALLY TOLL PLAZA
            <span className="toll-date">Aug 29, 7:14 PM</span>
          </div>
        </div>
        <div className="vehicle-state-info">
          <div className="vehicle-state-icon">
            <i className="fas fa-car"></i>
          </div>
          <div className="vehicle-state-text">Vehicle State: Fueling</div>
        </div>
        <div className="road-trip-info">
          <div className="road-trip-icon">
            <i className="fas fa-route"></i>
          </div>
          <div className="road-trip-text">loco/27440</div>
        </div>

        <div className="footer-div">
          <div className="box1" onClick={handleFuelShow}>
            <p style={{ margin: "0", fontWeight: "650" }}>#9.5L (78.5)</p>
            <p style={{ margin: "0", textAlign: "center" }}>
              Fuel
              <BsFileBarGraph size={16} color="#1eb290" />
            </p>
          </div>
          <div className="box2">
            <p style={{ margin: "0", fontWeight: "650" }}>OFF</p>
            <p style={{ margin: "0", textAlign: "center" }}>Ignition</p>
          </div>
          <div className="box3">
            <p style={{ margin: "0", fontWeight: "650" }}>100 km/h</p>
            <p style={{ margin: "0", textAlign: "center" }}>Speed</p>
          </div>
          <div className="box4">
            <span onClick={handleShow}>
              <IoIosArrowDropright
                size={24}
                color="#747474"
                data-tooltip-id="more-tooltip"
                data-tooltip-content="View More"
              />
              <ReactTooltip
                id="more-tooltip"
                effect="red solid"
                place="right"
                type="light"
              />
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default VehicleCard;
