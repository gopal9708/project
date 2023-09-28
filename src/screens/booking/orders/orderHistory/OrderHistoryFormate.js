import React from 'react'
const OrderHistoryFormate = ({table_data}) => {
  // console.log("Updated data.....>>>",table_data);
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
        // console.log("length ....>>.",new_data);
        // console.log(item);
        return (
          <tr key={idx}   style={{
            borderWidth: 1,
          }}>
            <td>{idx +1}</td>
            <td>{(item.action_flag === 1 ? "Created" : "Updated")}</td>
          {/* <td>{(new_data.docket_no ? new_data.docket_no : "-")}</td>
          <td>{(new_data.entry_type ? new_data.entry_type : "-")}</td>
          <td>{(new_data.delivery_type ? new_data.delivery_type : "-")}</td>
          <td>{(new_data.cold_chain === true ? "Yes" : "No")}</td>
          <td>{(new_data.booking_time ? new_data.booking_time : "-")}</td>
          <td>{(new_data.booking_type ? new_data.booking_type : "-")}</td>
          <td>{(new_data.billto_name ? new_data.billto_name : "-")}</td>
          <td>{(new_data.client_name ? new_data.client_name: "-")}</td> */}
          <td>{(new_data.order_channel ? new_data.order_channel : "-")}</td>
          <td>{(new_data.booking_type ? new_data.booking_type : "-")}</td>
          <td>{(new_data.shipper ? new_data.shipper : "-")}</td>
          <td>{(new_data.shipper_address1 ? new_data.shipper_address1 : "-")}</td>
          <td>{(new_data.shipper_state ? new_data.shipper_state : "-")}</td>
          <td>{(new_data.shipper_city ? new_data.shipper_city : "-")}</td>
          <td>{(new_data.shipper_pincode ? new_data.shipper_pincode : "-")}</td>
          <td>{(new_data.consignee ? new_data.consignee : "-")}</td>
          <td>{(new_data.consignee_address1 ? new_data.consignee_address1 : "-")}</td>
          <td>{(new_data.consignee_state ? new_data.consignee_state : "-")}</td>
          <td>{(new_data.consignee_city ? new_data.consignee_city : "-")}</td>
          <td>{(new_data.consignee_pincode ? new_data.consignee_pincode : "-")}</td>
          <td>{(new_data.commodity_name ? new_data.commodity_name : "-")}</td>
          <td>{(new_data.cod ? new_data.cod : "-")}</td>
          <td>{(new_data.transportation_cost ? new_data.transportation_cost : "-")}</td>
          <td>{(new_data.total_quantity ? new_data.total_quantity : "-")}</td>
          <td>{(new_data.actual_weight ? new_data.actual_weight : "-")}</td>
          <td>{(new_data.chargeable_weight ? new_data.chargeable_weight : "-")}</td>
          <td>{(new_data.remarks ? new_data.remarks : "-")}</td>
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
export default OrderHistoryFormate