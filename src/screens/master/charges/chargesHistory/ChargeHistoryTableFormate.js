import React from 'react';

const ChargeHistoryTableFormate = ({ table_data }) => {
  // console.log("table data", table_data);
  return (
    <>
      {table_data.length === 0 ? (
        <tr>
          <td>Data Not Found</td>
        </tr>
      ) : (
        <>
          {table_data.map((item, idx) => {
            const new_data = JSON.parse(item.change_message);
            var time = new Date(item.action_time).toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });

            return (
              <tr key={idx} style={{ borderWidth: 1 }}>
                <td>{idx + 1}</td>
                <td>{item.action_flag === 1 ? "Created" : "Updated"}</td>
                <td>{new_data.charge_category ? new_data.charge_category : "-"}</td>
                <td>{new_data.charge_name ? new_data.charge_name : "-"}</td>
                <td>{item.name_r}</td>
                <td>{time}</td>
              </tr>
            );
          })}
        </>
      )}
    </>
  );
};

export default ChargeHistoryTableFormate;
