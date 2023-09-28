import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setEwayBilltTab } from "../../../store/parentFilter/ParentFilter";

const Navigate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ewaybill_tab = useSelector((state) => state.parentfilter.ewaybill_tab);
  // console.log("ewaybill_tab-----", ewaybill_tab)
  
  // const [p_delivery, setp_delivery] = useState(false);
  // const [all_runsheet, setall_runsheet] = useState(false);

  // useEffect(() => {
  //   if (
  //     userpermission.some(
  //       (e) => e.sub_model === "Pending Delivery" && e.read === true
  //     )
  //   ) {
  //     setp_delivery(true);
  //   } else {
  //     setp_delivery(false);
  //   }
  // }, [userpermission]);

  // useEffect(() => {
  //   if (
  //     userpermission.some(
  //       (e) => e.sub_model === "All Runsheet" && e.read === true
  //     )
  //   ) {
  //     setall_runsheet(true);
  //   } else {
  //     setall_runsheet(false);
  //   }
  // }, [userpermission]);

  return (
    <div className="mt-0 m-3 parent_tab">
      {/* {(p_delivery || user.is_superuser) && ( */}
        <div
          className="header_tab"
          style={{
            background: ewaybill_tab === 1 ? "#d6e8ff" : "#F8F8FB",
          }}
          onClick={() => {
            dispatch(setEwayBilltTab(1));
            navigate("/ewaybill/docketEwayBill");
          }}
        >
        Eway Bill Dockets
        </div>
      {/* )} */}
      {/* {(all_runsheet || user.is_superuser) && ( */}
        <div
          className="header_tab"
          style={{
            background: ewaybill_tab === 2 ? "#d6e8ff" : "#F8F8FB",
          }}
          onClick={() => {
            dispatch(setEwayBilltTab(2));
            navigate("/ewaybill/notupdateddocketEwayBill");
          }}
        >
         Not updated EwayBill
        </div>
      {/* )} */}
    </div>
  );
};

export default Navigate;
