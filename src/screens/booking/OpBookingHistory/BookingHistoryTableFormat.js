import React from 'react';

const BookingHistoryTableFormat = ({ table_data}) => {
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
          {/* <td>{(new_data.type ? new_data.type : "-")}</td>
          <td>{(new_data.commodity_name ? new_data.commodity_name : "-")}</td>
          <td>{item.name_r }</td>
          <td>{time}</td> */}
        </tr>
        )
         
        })}
      </>
    )}
  </>
  )
}

export default BookingHistoryTableFormat;