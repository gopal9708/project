import React from 'react';

const VendorHistoryTableFormate = ({ table_data }) => {
  // console.log("Table Data is ", table_data);
  return (
    <>
      {table_data.length === 0 ? (
        <tr>Data Not Found</tr>
      ) : (
        <>
          {table_data.map((item, idx) => {
            // console.log("CHnage msg", item.change_message);
            const new_data = JSON.parse(item.change_message);
            var time = new Date(item.action_time).toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });
            // console.log("data is ==>",new_data)
            // console.log(item)
            return (
              <tr key={idx} style={{
                borderWidth: 1,
              }}>
                <td>{idx + 1}</td>
                <td>{(item.action_flag === 1 ? "Created" : "Updated")}</td>
                <td>{(new_data.pan_no ? new_data.pan_no : "-")}</td>
                <td>{(new_data.name ? new_data.name : "-")}</td>
                <td>{(new_data.company_type ? new_data.company_type : "-")}</td>
                <td>{(new_data.is_msme_regitered ? new_data.is_msme_regitered : "-")}</td>
                <td>{(new_data.msme_registration_no ? new_data.msme_registration_no : "-")}</td>
                <td>{(new_data.registration_date ? new_data.registration_date : "-")}</td>
                {/* <td>{(new_data.msme_certificate ? new_data.msme_certificate : "-")}</td> */}
                <td>{(new_data.emailp ? new_data.emailp : "-")}</td>
                <td>{(new_data.mobile_numberp ? new_data.mobile_numberp : "-")}</td>
                <td>{(new_data.emails ? new_data.emails : "-")}</td>
                <td>{(new_data.mobile_numbers ? new_data.mobile_numbers : "-")}</td>
                <td>{(new_data.lob ? new_data.lob : "-")}</td>
                <td>{(new_data.service_region ? new_data.service_region : "-")}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>{item.name_r}</td>
                <td>{time}</td>
              </tr>
            )

          })}
        </>
      )}
    </>
  )
}

export default VendorHistoryTableFormate