import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setRunsheetTab } from "../../../store/parentFilter/ParentFilter";

const Navigate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const runsheet_tab = useSelector((state) => state.parentfilter.runsheet_tab);
  const user = useSelector((state) => state.authentication.userdetails);
  //Permission
  const userpermission = useSelector(
    (state) => state.authentication.userpermission
  );
  const [p_delivery, setp_delivery] = useState(false);
  const [all_runsheet, setall_runsheet] = useState(false);

  useEffect(() => {
    if (
      userpermission.some(
        (e) => e.sub_model === "Pending Delivery" && e.read === true
      )
    ) {
      setp_delivery(true);
    } else {
      setp_delivery(false);
    }
  }, [userpermission]);

  useEffect(() => {
    if (
      userpermission.some(
        (e) => e.sub_model === "All Runsheet" && e.read === true
      )
    ) {
      setall_runsheet(true);
    } else {
      setall_runsheet(false);
    }
  }, [userpermission]);

  return (
    <div className="mt-0 m-3 parent_tab">
      {(p_delivery || user.is_superuser) && (
        <div
          className="header_tab"
          style={{
            background: runsheet_tab === 1 ? "#d6e8ff" : "#F8F8FB",
          }}
          onClick={() => {
            dispatch(setRunsheetTab(1));
            navigate("/runsheet/pendingdelivery");
          }}
        >
          Pending Delivery
        </div>
      )}
      {(all_runsheet || user.is_superuser) && (
        <div
          className="header_tab"
          style={{
            background: runsheet_tab === 2 ? "#d6e8ff" : "#F8F8FB",
          }}
          onClick={() => {
            dispatch(setRunsheetTab(2));
            navigate("/runsheet/hubrunsheet");
          }}
        >
          Hub Dispatch
        </div>
      )}
      {(all_runsheet || user.is_superuser) && (
        <div
          className="header_tab"
          style={{
            background: runsheet_tab === 3 ? "#d6e8ff" : "#F8F8FB",
          }}
          onClick={() => {
            dispatch(setRunsheetTab(3));
            navigate("/runsheet/incomingrunsheet");
          }}
        >
          Incoming Runsheet
        </div>
      )}
      {(all_runsheet || user.is_superuser) && (
        <div
          className="header_tab"
          style={{
            background: runsheet_tab === 4 ? "#d6e8ff" : "#F8F8FB",
          }}
          onClick={() => {
            dispatch(setRunsheetTab(4));
            navigate("/runsheet/allrunsheet");
          }}
        >
          All Runsheet
        </div>
      )}
    </div>
  );
};

export default Navigate;
