/* eslint-disable */
import React, { useState, useLayoutEffect } from "react";
import { FiSquare } from "react-icons/fi";
import HiredDetailsEndModal from "../../../screens/trip/hiredDetails/HiredDetailsEndModal";
import HiredDetailsModal from "../../../screens/trip/hiredDetails/HiredDetailsModal";

// import { Toggle } from "../../../store/Filter/Parent_Filter/action";

const HiredDetailsDataFormate = ({ data }) => {
  console.log("object", data);
  // const dispatch = useDispatch();
  // const accessToken = useSelector(state => state.token.access_token);
  //--------state-------
  const [hired_info, sethired_info] = useState("");
  const [hired_data, sethired_data] = useState("");

  useLayoutEffect(() => {
    sethired_info(hired_data.id);
  }, []);
  // useEffect(() => {
  //   dispatch(Toggle(false));
  // }, []);

  return (
    <>
      {data.length == 0 ? (
        <span>No data found</span>
      ) : (
        <>
          {data.map((item, index) => {
            return (
              <tr key={index}>
                <td>{<FiSquare />}</td>
                {/* <td>
                  <Link to="/">{item.Vehicle_ID}</Link>
                </td> */}
                <td>{item.Vehicle_ID}</td>
                <td>{item.Employee_ID}</td>
                <td>{item.Runsheet_ID}</td>
                <td>{item.Start_Km}</td>
                <td>{item.Assigned_By}</td>
                <td>{item.Is_Full == true ? "Full" : "Vacant"}</td>
                <td>{item.Status == true ? "  Active" : " Not Active"}</td>
                <td>{item.Route_Name}</td>

                <td>
                  {item.Closed_Timing ? (
                    <span style={{ color: "green" }}>Completed</span>
                  ) : (
                    <>
                      {item.trip_start ? (
                        <HiredDetailsEndModal
                          id={item.id}
                          Start_Km={item.Start_Km}
                        />
                      ) : (
                        <HiredDetailsModal
                          //  get_data=
                          // {get_data}
                          id={item.id}
                        />
                      )}
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </>
      )}
    </>
  );
};

export default HiredDetailsDataFormate;
