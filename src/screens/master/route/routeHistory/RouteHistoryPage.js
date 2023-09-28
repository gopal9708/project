import React, {useState} from 'react';
import NewHistoryTab from '../../../../components/historyTabComponents/NewHistoryTab';
import RouteCreatedHistory from './RouteCreatedHistory';
import RouteHistoryTableTitle from "../routeHistory/RouteHistoryTabletitle";
import RouteHistoryTableFormate from './RouteHistoryTableFormate';
import { useLocation } from 'react-router-dom';

const RouteHistoryPage = () => {
  const location = useLocation();  
  // console.log(location)
  const [route_id, setroute_id] = useState(location.state.routes.id);
  return (
    <>
    
        <NewHistoryTab
        Page={RouteCreatedHistory}
        Table_Data_Title={RouteHistoryTableTitle}
        Table_Data_Formate={RouteHistoryTableFormate}
        path1={`analytic/get_createdmasterdatahistory/?search=${""}&p=${1}&records=${10}&model_name=${["Routes"]}&app_name=${["master"]}&object_id=${[route_id]}`}
        path={`analytic/get_updatedmasterdatahistory/?search=${""}&p=${1}&records=${10}&model_name=${["Routes"]}&app_name=${["master"]}&object_id=${[route_id]}`}
        
        />
    </>
  )
}

export default RouteHistoryPage