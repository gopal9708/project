import React, {useState} from 'react';
import NewHistoryTab from "../../../../components/historyTabComponents/NewHistoryTab";
import VendorCreatedHistory from './VendorCreatedHistory';
import VendorHistoryTableTitle from './VendorHistoryTableTitle';
import VendorHistoryTableFormate from './VendorHistoryTableFormate';
import { useLocation } from 'react-router-dom';

const VendorHistoryPage = () => {
  const location = useLocation();
  // console.log(location)
  const [vendor_id, setvendor_id] = useState(location.state.vendor.id);
  return (
    <>
    <NewHistoryTab
    Page={VendorCreatedHistory}
    Table_Data_Title={VendorHistoryTableTitle}
    Table_Data_Formate={VendorHistoryTableFormate}
    path1={`analytic/get_createdmasterdatahistory/?search=${""}&p=${1}&records=${100}&model_name=${["Vendors"]}&app_name=${["master"]}&object_id=${[vendor_id]}`}
    path={`analytic/get_updatedmasterdatahistory/?search=${""}&p=${1}&records=${100}&model_name=${["Vendors"]}&app_name=${["master"]}&object_id=${[vendor_id]}`}
    />
    </>
  )
}

export default VendorHistoryPage