import React from 'react';

const BranchHistoryTableFormate = ({table_data}) => {
  return (
    <>
      {table_data.length === 0 ? (
        <tr>Data Not Found</tr>
      ) : (
        <>
          {table_data.map((item, idx) => {
            const new_data = JSON.parse(item.change_message);
            console.log(new_data);
          var time = new Date(item.action_time).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'});
          return (
            <tr key={idx}   style={{
              borderWidth: 1,
            }}>
              <td>{idx+1}</td>
              <td>{(item.action_flag === 1 ? "Created" : "Updated")}</td>
              <td>{new_data.code ? new_data.code:"-"}</td>
            <td>{new_data.type ? new_data.type : "-" }</td>
            <td>{new_data.vendor_name? new_data.vendor_name : "-"}</td>
            <td>{new_data.name ? new_data.name : "-"}</td>
            <td>{new_data.email ? new_data.email : "-"}</td>
            <td>{new_data.contact_number ? new_data.contact_number : "-"}</td>
            <td>{new_data.pan_no ? new_data.pan_no : "-"}</td>
            <td>{new_data.gst_no ? new_data.gst_no : "-"}</td>
            <td>{new_data.operating_city ? new_data.operating_city : "_"}</td>
            <td>{new_data.address_line_1 ? new_data.address_line_1 :"-"}</td>
            <td>{new_data.state_name ? new_data.state_name :"-"}</td>
            <td>{new_data.city_name ? new_data.city_name :"-"}</td>
            <td>{new_data.pincode_name ? new_data.pincode_name : "-"}</td>
            <td>{new_data.locality_name ? new_data.locality_name : "-"}</td>
            <td>{new_data.head ? new_data.head :"-"}</td>
            <td>{new_data.head_email ? new_data.head_email :"-"}</td>
            <td>{new_data.head_phone_number? new_data.head_phone_number :"-"}</td>
            <td>{item.name_r}</td>
            <td>{time}</td>
          </tr>
          )
           
          })}
        </>
      )}
    </>  )
}

export default BranchHistoryTableFormate