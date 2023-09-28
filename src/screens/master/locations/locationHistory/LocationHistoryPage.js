import React, {useState} from 'react';
import NewHistoryTab from '../../../../components/historyTabComponents/NewHistoryTab';
import LocationCreatedHistory from './LocationCreatedHistory';
import LocationHistoryTableTitle from "../locationHistory/LocationHistoryTableTitle";
import LocationHistoryTableFormate from './LocationHistoryTableFormate';
import { useLocation } from 'react-router-dom';

const LocationHistoryPage = () => {
  const location = useLocation();  

  // console.log(location)
  const [location_id, setlocation_id] = useState(location.state.location.id);
  // console.log("location=-=-=-=->>",location_id) 
  return (
    <>
      
        <NewHistoryTab
        Page={LocationCreatedHistory}
        Table_Data_Title={LocationHistoryTableTitle}
        Table_Data_Formate={LocationHistoryTableFormate}
        path1={`analytic/get_createdmasterdatahistory/?search=${""}&p=${1}&records=${10}&model_name=${["Location"]}&app_name=${["master"]}&object_id=${[location_id]}`}
        path={`analytic/get_updatedmasterdatahistory/?search=${""}&p=${1}&records=${10}&model_name=${["Location"]}&app_name=${["master"]}&object_id=${[location_id]}`}
        
        />
    </>
  )
}

export default LocationHistoryPage