import React, {useState} from 'react';
import NewHistoryTab from '../../../../components/historyTabComponents/NewHistoryTab';
import AssetCreatedHistory from './AssetCreatedHistory';
import AssetHistoryTableTitle from "../assetHistory/AssetHistoryTableTitle";
import AssetHistoryTableFormate from './AssetHistoryTableFormate';
import { useLocation } from 'react-router-dom';

const AssetHistoryPage = () => {
const location = useLocation();  

  console.log( "loc daata is ...==>.",location)
  const [asset_id, setasset_id] = useState(location.state.asset.id);
  console.log("location=-=-=-=->>",asset_id) 
  return (
    <>
      
        <NewHistoryTab
        Page={AssetCreatedHistory}
        Table_Data_Title={AssetHistoryTableTitle}
        Table_Data_Formate={AssetHistoryTableFormate}
        path1={`analytic/get_createdmasterdatahistory/?search=${""}&p=${1}&records=${100}&model_name=${["Assets"]}&app_name=${["master"]}&object_id=${[asset_id]}`}
        path={`analytic/get_updatedmasterdatahistory/?search=${""}&p=${1}&records=${100}&model_name=${["Assets"]}&app_name=${["master"]}&object_id=${[asset_id]}`}
        path2={`analytic/get_updatedmasterdatahistory/?search=${""}&p=${1}&records=${100}&model_name=${["AssetsCallibration"]}&app_name=${["master"]}&object_id=${[asset_id]}`}
        path3={`analytic/get_createdmasterdatahistory/?search=${""}&p=${1}&records=${100}&model_name=${["AssetsCallibration"]}&app_name=${["master"]}&object_id=${[asset_id]}`}
        
        />
    </>
  )
}

export default AssetHistoryPage