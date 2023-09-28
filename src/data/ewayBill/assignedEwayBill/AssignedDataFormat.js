import React from "react";
import correct from "../../../assets/images/bookings/check-mark.png";
import cross from "../../../assets/images/bookings/remove.png";
import toTitleCase from "../../../lib/titleCase/TitleCase";

const PacketTitle = [
  "Ewb No",
  "Valid Upto",
  "Shipper",
  "Consignee",
  "Is Expired",
  "Shipper Address",
  "Consignee Address",
  "Shipper Gstin",
  "Consignee Gstin",

];

const AssignedDataFormat = ({ data }) => {
  
  return (
    <>
         <div className="fixTableHead" style={{ overflowY: "auto", maxHeight: "58.2vh"}}>
        <table
          className="topheader table-light"
          style={{ borderCollapse: "collapse", width: "100%", borderWidth: 1 }}
        >
          <thead>
            <tr style={{ lineHeight: 2, borderWidth: 1 }}>
              {PacketTitle.map((i, j) => {
                return (
                  <th
                    style={{ whiteSpace: "nowrap", textAlign: "center" }}
                    key={j}
                  >
                    {i}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {!data ? (
              <tr>
                <td>No Data Found</td>
              </tr>
            ) : (
              (() => {
                // const currentDate = new Date();
                const rows = data.map((ewb, index) => {
                  const dateString = ewb.validUpto;
                  const [datePart, timePart] = dateString.split(" ");
                  const [day, month, year] = datePart.split("/");
                  const [hours, minutes, seconds] = timePart.split(":");
                  const validUptoDate = new Date(Date.UTC(year, month - 1, day, hours, minutes, seconds));
                  const currentDate = new Date();
                  const expired = currentDate.getTime() > validUptoDate.getTime();
                  console.log("validUptoDate", validUptoDate);
                  console.log("current date", currentDate);
                  return (
                    <tr key={index} style={{ borderWidth: 1 }}>
                      {console.log(
                        "reyanzzz", ewb
                      )}

                      <td>{ewb.ewbNo}</td>
                      <td>{ewb.validUpto}</td>
                      <td>{toTitleCase(ewb.fromTrdName)}</td>
                      <td>{toTitleCase(ewb.toTrdName)}</td>
                      <td>{expired ?
                        <img src={correct} alt="correct" height="20px" width="20px" />
                        :
                        <img src={cross} alt="cross" height="20px" width="20px" />


                      }</td>
                      <td> {toTitleCase(ewb.fromPlace) + "," + ewb.fromPincode}</td>
                      <td>{toTitleCase(ewb.toPlace) + "," + ewb.toPincode}</td>
                      <td>{ewb.fromGstin}</td>
                      <td>{ewb.toGstin}</td>
                    </tr>
                  );
                });
                return rows;
              })()
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AssignedDataFormat;
