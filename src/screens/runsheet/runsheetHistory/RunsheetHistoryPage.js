import React from 'react'
import NewHistoryTab from '../../../components/historyTabComponents/NewHistoryTab'
import  RunsheetCreatedHistory from "./RunsheetCreatedHistory";
import RunsheetHistoryFormate from './RunsheetHistoryFormate';
import RunsheetHistoryTitle from './RunsheetHistoryTitle';
import { useLocation } from 'react-router-dom';


const RunSheetHistoryPage = () => {

    const location = useLocation();
    
  return (
    <div>
        
        <NewHistoryTab
         Page={RunsheetCreatedHistory}
         Table_Data_Title={RunsheetHistoryTitle}
         Table_Data_Formate={RunsheetHistoryFormate}
         path1={`analytic/get_createdmasterdatahistory/?search=${""}&p=${1}&records=${10}&model_name=${["Commodities"]}&app_name=${["master"]}&object_id=${[commodity_id]}`}
         path={`analytic/get_updatedmasterdatahistory/?search=${""}&p=${1}&records=${10}&model_name=${["Commodities"]}&app_name=${["master"]}&object_id=${[commodity_id]}`}
 
        
        />
    </div>
  )
}

export default RunSheetHistoryPage