import React from 'react';

const OrganizationHistoryTableFormate = ({ table_data}) => {
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
          return (
            <tr key={idx}   style={{
              borderWidth: 1,
            }}>
              <td>{idx +1}</td>
              <td>{(item.action_flag === 1 ? "Created" : "Updated")}</td>
            <td>{(new_data.name ? new_data.name: "-")}</td>
            <td>{(new_data.email ? new_data.email:"-")}</td>
            <td>{(new_data.tollfree_no ? new_data.tollfree_no :"-")}</td>
            <td>{(new_data.regd_no ? new_data.regd_no:"-")}</td>
            <td>{(new_data.pan_no ? new_data.pan_no:"-")}</td>
            <td>{(new_data.mobile_nop ? new_data.mobile_nop:"-")}</td>
            <td>{(new_data.mobile_nos ? new_data.mobile_nos:"-")}</td>
            <td>{(new_data.website ? new_data.website:"-")}</td>
            <td>{(new_data.gst_no ? new_data.gst_no:"-")}</td>
            <td>{(new_data.city_name ? new_data.city_name:"-")}</td>
            <td>{(new_data.pincode_name ? new_data.pincode_name:"-")}</td>
            <td>{(new_data.locality_name ? new_data.locality_name:"-")}</td>
            <td>{(new_data.address_line ? new_data.address_line:"-")}</td>
            <td>{(new_data.hoaddress_line ?new_data.hoaddress_line:"-")}</td>
            <td>{(new_data.hostate_name ? new_data.hostate_name:"-")}</td>
            <td>{(new_data.hocity_name ? new_data.hocity_name:"-")}</td>
            <td>{(new_data.holocality_name?new_data.holocality_name:"-")}</td>
            <td>{(new_data.contact_person ? new_data.contact_person:"-")}</td>
            <td>{(new_data.contact_person_email ? new_data.contact_person_email:"-")}</td>
            <td>{(new_data.contact_person_mobile ? new_data.contact_person_mobile:"-")}</td>
            <td>{(new_data.description? new_data.description:"-")}</td>
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

export default OrganizationHistoryTableFormate