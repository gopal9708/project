import React, { useState ,useEffect} from "react";
import VehicleCard from "../../../components/trip/VehicleCard";
import { ReactBingmaps } from "react-bingmaps";
import TripTab from "./TripTab";
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const AllVehicle = () => {
  let arr = [
    {
      vehicle_no: "JH09VG6767 ",
      last_data: "Last data received 2 mins ago",
      location: [22.804565, 86.202873],
    },
    {
      vehicle_no: "JH09VG6765 ",
      last_data: "Last data received 2 mins ago",
      location: [22.8205828, 86.1740037],
    },
    {
      vehicle_no: "UP09VG6767 ",
      last_data: "Last data received 2 mins ago",
      location: [27.173891, 78.042068],
    },
    {
      vehicle_no: "DL09VG6767 ",
      last_data: "Last data received 2 mins ago",
      location: [28.6097867, 77.2344243],
    },
  ];
  const [vehicleCoordinates, setVehicleCoordinates] = useState([]);
  

  // Simulated vehicle movement - Replace with your actual data source
  // useEffect(() => {
  //   const simulateVehicleMovement = () => {
  //     // Replace this with your actual data source or API call to get vehicle coordinates
  //     // For this example, we'll simulate vehicle movement with random coordinates.
  //     const newCoordinates = [
  //       [22.804565, 86.202873], // Initial coordinates
  //       [28.6097867, 77.2344243],
  //       [27.173891, 78.042068],// Example new coordinates
  //       // Add more coordinates as the vehicle moves
  //     ];

  //     setVehicleCoordinates(newCoordinates);

  //     setTimeout(simulateVehicleMovement, 5000); // Update every 5 seconds
  //   };

  //   simulateVehicleMovement();
  // }, []);
  const [location_is, setlocation_is] = useState([]);
  const [no_of_vehicle, setno_of_vehicle] = useState(0);
  const [filter_by, setfilter_by] = useState("");
  console.log("No Subscription Attached vfilter_by", filter_by);
  console.log("setlocation_is === >>", location_is);
  return (
    <>
      <TripTab setfilter_by={setfilter_by} filter_by={filter_by} />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ width: "30%" }}>
          <div style={{ textAlign: "left", margin: "0px 16px 0px 16px" }}>
            Results :{"  "}
            {no_of_vehicle} {"  "}
            Vehicles
          </div>
          <div style={{ overflowY: "scroll", height: "85vh" }}>
            {arr.map((item, index) => {
              return (
                <div>
                  <VehicleCard
                    vehicle_no={item.vehicle_no}
                    last_data={item.last_data}
                    location={item.location}
                    setlocation_is={setlocation_is}
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div
          style={{
            width: "70%",
            background: "gray",
            height: "85vh",
            display: "flex",
            cursor: "grab",
            margin: "2px",
          }}
        >
          <ReactBingmaps
            bingmapKey="46rjePFqxyaoLYTlT2aY~_31j0a-D6Z93gJpo-MH41w~AnWpkuEBrGyGNvHpPH9AHN0Nu3-V1fcSoo6P0nnk0jyUHjZl-X2B3qQDEjWLxux1"
            center={location_is}
            zoom={12}
          />
        </div>
      </div>
    </>
  );
};
export default AllVehicle;
