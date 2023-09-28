import React, { useState, useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { FiSquare, FiCheckSquare } from "react-icons/fi";
import { ServerAddress } from "../../../constants/ServerAddress";

const LoginDetailsDataformat = () => {
  const username = useSelector(
    (state) => state.authentication.userdetails.username
  );

  const accessToken = useSelector((state) => state.authentication.access_token);

  const get_employess = () => {
    axios
      .get(ServerAddress + "ems/get_login_details/?username=" + username, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        setdata(response.data);
      })
      .catch((err) => {
        alert(`Error Occur in Get , ${err}`);
      });
  };

  useLayoutEffect(() => {
    get_employess();
  }, []);

  const [data, setdata] = useState([]);

  return (
    <>
      {data.length === 0 ? (
        <tr>
          <td>No Data Found</td>
        </tr>
      ) : (
        data.map((logindetail, index) => {
          let f_date_f = logindetail.logintime.split("T");
          let f_date = f_date_f[0];
          let f_time_r = String(f_date_f[1]).substring(0, 8);
          let l_fdate = f_date + " " + f_time_r;
          let l_fdate_lg = "";

          if (logindetail.logouttime) {
            let f_date_lg = logindetail.logouttime.split("T");
            let f_datelg = f_date_lg[0];
            let f_time_rlg = String(f_date_lg[1]).substring(0, 8);
            l_fdate_lg = f_datelg + " " + f_time_rlg;
          }
          return (
            <tr key={index}>
              <td className="selection-cell">
                {false ? <FiCheckSquare /> : <FiSquare />}
              </td>
              <td>{logindetail.user_name}</td>
              <td>{logindetail.ip_address}</td>
              <td>
                {logindetail.longitude}, {logindetail.latitude}
              </td>
              <td>{logindetail.os_name}</td>
              <td>{logindetail.is_mob ? "No" : "Yes"}</td>
              <td>{l_fdate}</td>
              <td>{logindetail.logouttime ? l_fdate_lg : "-"}</td>
            </tr>
          );
        })
      )}
    </>
  );
};

export default LoginDetailsDataformat;
