import React, { useState, useEffect } from "react";

const TableFormate = ({ table_data }) => {
  // console.log("History Table data", table_data.length);
  const [data, setdata] = useState("");

  const jsonData = JSON.stringify(table_data); // convert the dictionary to a JSON string

  // state to save obj data
  useEffect(() => {
    setdata({ jsonData });
  }, [table_data]);

  return (
    <>
      {table_data.length == 0 ? (
        <tr>Data Not Found</tr>
      ) : (
        table_data.map((item, idx) => {
          const jsonData = JSON.stringify(item);
          // console.log("json Data ==>>", jsonData);
          const objData = JSON.parse(jsonData);
          const a = objData.change_message;
          // console.log("object Data a ==>>", a);
          const addedObject = a[idx]["added"];
         
          {
            addedObject.map((itm, index) => {
              return (
                <tr
                  key={idx}
                  style={{
                    lineHeight: 2,
                    borderWidth: 2,
                  }}
                >
                  <td>{itm.billto_name}</td>
                </tr>
              );
            });
          }
        })
      )}
    </>
  );
};

export default TableFormate;
