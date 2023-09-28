import React from "react";

const TableFormat = ({ table_data }) => {
  // console.log("Table Data", table_data);

  return (
    <>
      {table_data.length === 0 ? (
        <tr>Data Not Found</tr>
      ) : (
        <>
          {table_data.map((item, idx) => {
            // console.log("CHnage msg", item.change_message);
            const new_data = JSON.parse(item.change_message);

          // console.log("length",new_data)
          return (
            <tr key={idx}   style={{
              borderWidth: 1,
            }}>
              <td>{(item.action_flag === 1 ? "Created" : "Updated")}</td>
            <td>{(new_data.type ? new_data.type : "-")}</td>
            <td>{(new_data.commodity_name ? new_data.commodity_name : "-")}</td>
            <td>{"Rohit"}</td>
            <td>{(new_data.created_at ? new_data.created_at : "-")}</td>
            <td>{"Sumit"}</td>
            <td>{new_data.modified_at ? new_data.modified_at : "-" }</td>
          </tr>
          )
           
          })}
        </>
      )}
    </>
  );
};

export default TableFormat;
