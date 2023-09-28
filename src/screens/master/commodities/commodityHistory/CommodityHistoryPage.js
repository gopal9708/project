import React, { useState } from 'react';
import NewHistoryTab from '../../../../components/historyTabComponents/NewHistoryTab';
import CommodityCreatedHistory from './CommodityCreatedHistory';
import CommodityHistoryTableTitle from "../commodityHistory/CommodityHistoryTableTitle";
import CommoditieHistoryTableFormate from './CommodityHistoryTableFormate';
import { useLocation } from 'react-router-dom';

const CommodityHistoryPage = () => {
  const location = useLocation();
  // console.log(location)
  const [commodity_id, setcommodity_id] = useState(location.state.commodity.id);

  return (
    <div>
      <NewHistoryTab
        Page={CommodityCreatedHistory}
        Table_Data_Title={CommodityHistoryTableTitle}
        Table_Data_Formate={CommoditieHistoryTableFormate}
        path1={`analytic/get_createdmasterdatahistory/?search=${""}&p=${1}&records=${10}&model_name=${["Commodities"]}&app_name=${["master"]}&object_id=${[commodity_id]}`}
        path={`analytic/get_updatedmasterdatahistory/?search=${""}&p=${1}&records=${10}&model_name=${["Commodities"]}&app_name=${["master"]}&object_id=${[commodity_id]}`}

      />
    </div>
  )
}

export default CommodityHistoryPage