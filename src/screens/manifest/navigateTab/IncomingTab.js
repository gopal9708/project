import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIncomingTab } from "../../../store/parentFilter/ParentFilter";

const IncomingTab = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authentication.userdetails);
  const tab = useSelector((state) => state.parentfilter.incoming_tab);

  //Permission
  const userpermission = useSelector(
    (state) => state.authentication.userpermission
  );
  const [can_dispatch, setcan_dispatch] = useState(false);
  const [can_depart, setcan_depart] = useState(false);
  const [raugh, setraugh] = useState(false);
  const [incoming, setincoming] = useState(false);
  const [all, setall] = useState(false);

  useEffect(() => {
    if (
      userpermission.some(
        (e) => e.sub_model === "Panding For Dispatch" && e.read === true
      )
    ) {
      setcan_dispatch(true);
    } else {
      setcan_dispatch(false);
    }
  }, [userpermission]);

  useEffect(() => {
    if (
      userpermission.some(
        (e) => e.sub_model === "Panding To Depart" && e.read === true
      )
    ) {
      setcan_depart(true);
    } else {
      setcan_depart(false);
    }
  }, [userpermission]);

  useEffect(() => {
    if (
      userpermission.some(
        (e) => e.sub_model === "Raugh Manifest" && e.read === true
      )
    ) {
      setraugh(true);
    } else {
      setraugh(false);
    }
  }, [userpermission]);

  useEffect(() => {
    if (
      userpermission.some(
        (e) => e.sub_model === "Incoming Manifest" && e.read === true
      )
    ) {
      setincoming(true);
    } else {
      setincoming(false);
    }
  }, [userpermission]);

  useEffect(() => {
    if (
      userpermission.some(
        (e) => e.sub_model === "All Manifest" && e.read === true
      )
    ) {
      setall(true);
    } else {
      setall(false);
    }
  }, [userpermission]);

  return (
    <div className="mt-0 m-3 parent_tab">
      {(can_dispatch || user.is_superuser) && (
        <div
          className="header_tab"
          style={{
            background: tab === 1 ? "#d6e8ff" : "#F8F8FB",
          }}
          onClick={() => {
            dispatch(setIncomingTab(1));
            navigate("/manifest/incomingmanifest");
          }}
        >
          {/* Panding For Dispatch */}
          IncomingManifest(Air)
        </div>
      )}
      {(raugh || user.is_superuser) && (
        <div
          className="header_tab"
          style={{
            background: tab === 2 ? "#d6e8ff" : "#F8F8FB",
          }}
          onClick={() => {
            dispatch(setIncomingTab(2));
            // navigate("/manifest/incomingmanifest");
            navigate("/manifest/incominghub");
          }}
        >
          IncomingManifest(Branch)
        </div>
      )}
       {(raugh || user.is_superuser) && (
        <div
          className="header_tab"
          style={{
            background: tab === 3 ? "#d6e8ff" : "#F8F8FB",
          }}
          onClick={() => {
            dispatch(setIncomingTab(3));
            // navigate("/manifest/incomingmanifest");
            navigate("/manifest/pickeduporders");
          }}
        >
          Picked Orders
          {/* Incoming For Branch */}
        </div>
      )}
    </div>
  );
};

export default IncomingTab;
