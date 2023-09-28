import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setBusinesssAccessToken, setEAccessToken, setOrgs } from "../../../store/ewayBill/EwayBill";
import { setAlertType, setDataExist, setShowAlert } from "../../../store/alert/Alert";
import { EServerAddress, ServerAddress } from "../../../constants/ServerAddress";


function LogInEwayBill() {
  const accessToken = useSelector((state) => state.authentication.access_token);
  const dispatch = useDispatch();

  //For Eway Bill

  const orgId = useSelector((state) => state.eway_bill?.orgs[0]?.orgId);

  const org_name = useSelector(
    (state) => state.authentication.userdetails.organization
  );
  const business_access_token = useSelector((state) => state.eway_bill.business_access_token);

  const e_access_token = useSelector((state) => state.eway_bill.e_access_token);

  const [ass_token, setass_token] = useState(false);
  const [euser_name, seteuser_name] = useState("");
  const [epass, setepass] = useState("");
  const [id_is, setid_is] = useState("");

  const [AccessToken_Modifiedat, setAccessToken_Modifiedat] = useState("");
  const [time_diff, settime_diff] = useState("");

  const getEwayAccessToken = () => {
    axios
      .get(
        ServerAddress +
        `organization/get_eway_accesstoken/?org_name=${org_name}`,

        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then(function (response) {
        if (response.data.results.length !== 0) {
          let res_data = response.data.results[0];
          setid_is(res_data.id);
          seteuser_name(res_data.username);
          setepass(res_data.password);
          setAccessToken_Modifiedat(res_data.AccessToken_Modifiedat);
          // if (e_access_token === "") {
            dispatch(setEAccessToken(res_data.access_token));
          // }
          // if (business_access_token === "") {
            dispatch(setBusinesssAccessToken(res_data.business_token));
          // }

          if (response.data.results[0].access_token === null) {
            setass_token(true);
          } else {
            setass_token(false);
          }
        }
        else {
          dispatch(setEAccessToken(""));
          dispatch(setBusinesssAccessToken(""));
        }
      })
      .catch((error) => {
        alert(`Error Happen while login  with eway bill ${error}`);
      });
  };

  const AddEwayAccessToken = () => {
    axios
      .post(
        EServerAddress + "ezewb/v1/auth/initlogin",

        {
          // userid: "test.easywaybill@gmail.com",
          // password: "Abcd@12345",
          userid: euser_name,
          password: epass,
        },

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        if (response.data.message !== "Please verify account (or sign up first).") {
          dispatch(setEAccessToken(response.data.response.token));
          dispatch(setOrgs(response.data.response.orgs));
          if (response.data.status === 1 && id_is !== "") {
            postAssToken(response.data.response.token);
          }
        }
        else {
          dispatch(setShowAlert(true));
          dispatch(setDataExist(`Invalid Username And Password Sign Up First`));
          dispatch(setAlertType("warning"));
        }
      })
      .catch((error) => {
        alert(`Error Happen while login  with eway bill ${error}`);
      });
  };

  const postAssToken = (access_token) => {
    axios
      .put(
        ServerAddress + "organization/update_token/" + id_is,

        {
          type: "access_token",
          access_token: access_token,
        },

        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then(function (response) {

      })
      .catch((error) => {
        alert(`Error Happen while login  with eway bill ${error}`);
      });
  };

  const GetBusiness_token = () => {
    axios
      .post(
        EServerAddress + "ezewb/v1/auth/completelogin",
        {
          token: `${e_access_token}`,
          orgid: orgId,
        },

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        dispatch(setBusinesssAccessToken(response.data.response.token));
        if (response.data.status === 1 && id_is !== "") {
          postBusinessToken(response.data.response.token);
        }
      })
      .catch((error) => {
        dispatch(setShowAlert(true));
        dispatch(setDataExist(`Eway Bill Server Is Currently Down`));
        dispatch(setAlertType("danger"));
      });
  };

  const postBusinessToken = (business_token) => {
    axios
      .put(
        ServerAddress + "organization/update_token/" + id_is,

        {
          type: "business_token",
          business_token: business_token,
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then(function (response) {

      })
      .catch((error) => {
        alert(`Error Happen while login  with eway bill ${error}`);
      });
  };

  useLayoutEffect(() => {
    if (ass_token) {
      AddEwayAccessToken();
    }
    if (time_diff >= 6) {
      AddEwayAccessToken();
    }
  }, [ass_token, time_diff]);

  //  For Step 1 Eway bill
  useLayoutEffect(() => {
    if (org_name) {
      getEwayAccessToken();
    }
  }, []);

  // For Step 2 Eway Bill
  useLayoutEffect(() => {
    if (e_access_token !== "" && ass_token && orgId) {
      GetBusiness_token();
    }
    if (time_diff >= 6 && orgId) {
      GetBusiness_token();
    }
  }, [e_access_token, ass_token, time_diff]);

  useEffect(() => {
    // Calculate the time difference when AccessToken_Modifiedat changes
    if (AccessToken_Modifiedat) {
      var dateTime1 = new Date(AccessToken_Modifiedat);
      var dateTime2 = new Date(); // Current date-time
      var timeDiff = Math.abs(dateTime2 - dateTime1);
      var diffHours = Math.floor(timeDiff / (1000 * 60 * 60));
      settime_diff(diffHours);
    }

  }, [AccessToken_Modifiedat]);
  return (
    null
  )
}

export default LogInEwayBill