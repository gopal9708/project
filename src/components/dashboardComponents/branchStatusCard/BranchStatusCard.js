import React from "react";
import "./BranchStatusCard.css";
import "./MyComponet";

const BranchStatusCard = ({
  CardHeading,
  Upper = "",
  Cold_chain = 0,
  Manifest_order = 0,
  Pending_order = 0,
  Total_count = 0,
}) => {
  return (
    <div className="brCard-container">
      <div className="brCard">
        <div className="container_upper" style={{ fontSize: "8px" }}>
          {Upper}
        </div>
       
        <div className="tow">
          <div className="lumn">
            <div className="box box-1">{Cold_chain}</div>
            <div className="box box-2">{Manifest_order}</div>
          </div>
          <div className="lumn">
            <div className="box box-3">{Pending_order}</div>
            <div className="box box-4">{Total_count}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BranchStatusCard;
