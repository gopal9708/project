import React from 'react';

const AssetHistoryTableFormate = ({ table_data}) => {
  return (
    <>
    {table_data.length === 0 ? (  
      <tr>Data Not Found</tr>
    ) : (
      <>
        {table_data.map((item, idx) => {
          // console.log("CHnage msg", item.change_message);
          const new_data = JSON.parse(item.change_message);
          var time = new Date(item.action_time).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'});
        console.log("length",new_data)
        console.log(item)
        return (
          <tr key={idx}   style={{
            borderWidth: 1,
          }}>
            <td>{idx +1}</td>
            <td>{(item.action_flag === 1 ? "Created" : "Updated")}</td>
          <td>{(new_data.asset_type ? new_data.asset_type : "-")}</td>
          <td>{(new_data.box_type ? new_data.box_type : "-")}</td>
          <td>{(new_data.manufacturer_name ? new_data.manufacturer_name : "-")}</td>
          <td>{(new_data.temperature_type ? new_data.temperature_type : "-")}</td>
          <td>{(new_data.product_id ? new_data.product_id : "-")}</td>
          <td>{(new_data.box_type ? new_data.box_type : "-")}</td>
          <td>{(new_data.box_capacities ? new_data.box_capacities : "-")}</td>
          <td>{(new_data.product_id ? new_data.product_id : "-")}</td>
          <td>{(new_data.old_box_no ? new_data.old_box_no : "-")}</td>
          <td>{(new_data.assigned_branch_n ? new_data.assigned_branch_n : "-")}</td>
          <td>{(new_data.callibration_from ? new_data.callibration_from : "-")}</td>
          <td>{(new_data.callibration_to ? new_data.callibration_to : "-")}</td>
          <td>{}</td>
          <td>{}</td>
          <td>{}</td>
          <td>{item.name_r }</td>
          <td>{time}</td>
        </tr>
        )
         
        })}
      </>
    )}
  </>
  )
}

export default AssetHistoryTableFormate