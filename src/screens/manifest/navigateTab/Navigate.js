import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setDepartTab, setHubTab, setIncomingTab, setManifestTab, setRoughTab } from "../../../store/parentFilter/ParentFilter";

const Navigate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authentication.userdetails);
  const tab = useSelector((state) => state.parentfilter.manifest_tab);

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
            dispatch(setManifestTab(1));
            navigate("/manifest/pendingfordispatch");
          }}
        >
          {/* Panding For Dispatch */}
          Pending For Dispatch
        </div>
      )}
      <div
        className="header_tab"
        style={{
          background: tab === 2 ? "#d6e8ff" : "#F8F8FB",
        }}
        onClick={() => {
          dispatch(setManifestTab(2));
          dispatch(setHubTab(1))
          navigate("/manifest/hubairforward");
        }}
      >
        {/* Panding For Dispatch */}
        Hub Dispatch
      </div>

      {(raugh || user.is_superuser) && (
        <div
          className="header_tab"
          style={{
            background: tab === 3 ? "#d6e8ff" : "#F8F8FB",
          }}
          onClick={() => {
            dispatch(setManifestTab(3));
            dispatch(setRoughTab(1));
            navigate("/manifest/roughmanifest");
          }}
        >
          {/* Rough Manifest */}
          Forwarding Details
        </div>
      )}
      {/* {(raugh || user.is_superuser) && (
        <div
          className="header_tab"
          style={{
            background: tab === 3 ? "#d6e8ff" : "#F8F8FB",
          }}
          onClick={() => {
            dispatch(setManifestTab(3));
            navigate("/manifest/branchmanifest");
          }}
        >
          Rough Manifest(Vehicle)
        </div>
      )} */}
      {(can_depart || user.is_superuser) && (
        <div
          className="header_tab"
          style={{
            background: tab === 4 ? "#d6e8ff" : "#F8F8FB",
          }}
          onClick={() => {
            dispatch(setManifestTab(4));
            dispatch(setDepartTab(1));
            navigate("/manifest/pendingtodepart");
          }}
        >
          Pending To Depart
        </div>
      )}
      {(incoming || user.is_superuser) && (
        <div
          className="header_tab"
          style={{
            background: tab === 5 ? "#d6e8ff" : "#F8F8FB",
          }}
          onClick={() => {
            dispatch(setManifestTab(5));
            dispatch(setIncomingTab(1));
            navigate("/manifest/incomingmanifest");
          }}
        >
          Incoming Manifest
        </div>
      )}
      {(all || user.is_superuser) && (
        <div
          className="header_tab"
          style={{
            background: tab === 6 ? "#d6e8ff" : "#F8F8FB",
          }}
          onClick={() => {
            dispatch(setManifestTab(6));
            navigate("/manifest/allmanifest");
          }}
        >
          All Manifest
        </div>
      )}
    </div>
  );
};

export default Navigate;
