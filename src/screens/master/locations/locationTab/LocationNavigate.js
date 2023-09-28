import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {setLocationTab} from "../../../../store/parentFilter/ParentFilter.js"

const LocationNavigate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location_tab = useSelector((state) => state.parentfilter.location_tab);
  const user = useSelector((state) => state.authentication.userdetails);
  //Permission
  const userpermission = useSelector(
    (state) => state.authentication.userpermission
  );
  const [location, setlocation] = useState(false);

  useEffect(() => {
    if (
      userpermission.some(
        (e) => e.sub_model === "Locations" && e.read === true
      )
    ) {
      setlocation(true);
    } else {
      setlocation(false);
    }
  }, [userpermission]);

  return (
    <div className="mt-0 m-3 parent_tab">
      {(location || user.is_superuser) && (
        <div
          className="header_tab"
          style={{
            background: location_tab === 1 ? "#d6e8ff" : "#F8F8FB",
          }}
          onClick={() => {
            dispatch(setLocationTab(1));
            navigate("/master/locations");
          }}
        >
              All Locations
        </div>
      )}
      {(location || user.is_superuser) && (
        <div
          className="header_tab"
          style={{
            background: location_tab === 2 ? "#d6e8ff" : "#F8F8FB",
          }}
          onClick={() => {
            dispatch(setLocationTab(2));
            navigate("/master/city");
          }}
        >
              All City
        </div>
      )}
            {(location || user.is_superuser) && (
        <div
          className="header_tab"
          style={{
            background: location_tab === 3 ? "#d6e8ff" : "#F8F8FB",
          }}
          onClick={() => {
            dispatch(setLocationTab(3));
            navigate("/master/Pincode");
          }}
        >
          All Pincode
        </div>
      )}
    </div>
  );
};

export default LocationNavigate;
