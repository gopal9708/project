import React from 'react'

const BilltoHistoryTableFormate = ({table_data}) => {
  // console.log("table Data",table_data);
  return (
    <>
      {table_data.length === 0 ? (
        <tr>Data Not Found</tr>
      ) : (
        <>
          {table_data.map((item, idx) => {
            const new_data = JSON.parse(item.change_message);
            console.log("data",new_data)
          var time = new Date(item.action_time).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'});

          return (
            <tr key={idx}   style={{
              borderWidth: 1,
            }}>
              <td>{idx+1}</td>
              <td>{(item.action_flag === 1 ? "Created" : "Updated")}</td>
            <td>{new_data.name ? new_data.name : "-"}</td>
            <td>{new_data.email ? new_data.email : "-"}</td>
            <td>{new_data.phone_number ? new_data.phone_number : "-"}</td>
            <td>{new_data.branches? new_data.branches : "-"}</td>
            <td>{new_data.credit_amount ? new_data.credit_amount: "-"}</td>
            <td>{new_data.pan_no ? new_data.pan_no : "-"}</td>
            <td>{new_data.address_line ? new_data.address_line : "-"}</td>
            <td>{new_data.state_name ? new_data.state_name: "-"}</td>
            <td>{new_data.city_name ? new_data.city_name : "-"}</td>
            <td>{new_data.pincode_name ? new_data.pincode_name : "-"}</td>
            <td>{new_data.locality_name? new_data.pincode_name : "-"}</td>
            <td>{new_data.authorised_person_name ? new_data.authorised_person_name: "-"}</td>
            <td>{new_data.authorised_person_email ? new_data.authorised_person_email: "-"}</td>
            <td>{new_data.authorised_person_number ? new_data.authorised_person_number: "-"}</td>
            <td>{item.name_r }</td>
            <td>{time}</td>
          </tr>
          )
           
          })}
        </>
      )}
    </>  )
}

export default BilltoHistoryTableFormate