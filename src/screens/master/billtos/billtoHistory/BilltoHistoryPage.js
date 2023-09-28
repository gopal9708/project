import React,{useState} from 'react'
import { useLocation } from 'react-router-dom'
// import HistoryTab from '../../../../components/historyTabComponents/HistoryTab';
import NewHistoryTab from '../../../../components/historyTabComponents/NewHistoryTab';
import BilltoCreatedHistory from './BilltoCreatedHistory';
import BilltoHistoryTableTitle from './BilltoHistoryTableTitle';
import BilltoHistoryTableFormate from './BilltoHistoryTableFormate';

const BilltoHistoryPage = () => {
  const location = useLocation();
  const [billto_id, setbillto_id] = useState(location.state.client.id);
  console.log("location",location.state.client);
//   let billto_data =Object.entries(location.state.client);
// console.log(billto_data)
// let billto_details = [
//   billto_data[10],
//   billto_data[11],
//   billto_data[12],
// ];

// let gst_info = [
//   billto_data[21]
// ]

// let address_info = [
//   billto_data[13],
//   billto_data[5],
//   billto_data[4],
//   billto_data[6],
//   billto_data[7],
// ]
// let authorised_info = [
//   billto_data[14],
//   billto_data[15],
//   billto_data[16],
// ]
  return (
    <>
       <NewHistoryTab
       Page={BilltoCreatedHistory}
       Table_Data_Title={BilltoHistoryTableTitle}
       Table_Data_Formate={BilltoHistoryTableFormate}
       path1={`analytic/get_createdmasterdatahistory/?search=${""}&p=${1}&records=${10}&model_name=${["BillTo"]}&app_name=${["master"]}&object_id=${[billto_id]}`}
       path={`analytic/get_updatedmasterdatahistory/?search=${""}&p=${1}&records=${10}&model_name=${["BillTo"]}&app_name=${["master"]}&object_id=${[billto_id]}`}
       />
    </>
  )
}

export default BilltoHistoryPage