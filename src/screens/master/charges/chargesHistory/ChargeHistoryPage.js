import React,{useState} from 'react'
import { useLocation } from 'react-router-dom'
import NewHistoryTab from '../../../../components/historyTabComponents/NewHistoryTab'
import ChargeCreatedHistory from './ChargeCreatedHistory'
import ChargeHistoryTableFormate from './ChargeHistoryTableFormate'
import ChargeHistoryTableTitle from './ChargeHistoryTableTitle'

const ChargeHistoryPage = () => {

  const location = useLocation();
  const [charge_id, setcharge_id] = useState(location.state.charge.id);
  return (
<>
<NewHistoryTab
Page={ChargeCreatedHistory}
Table_Data_Title={ChargeHistoryTableTitle}
Table_Data_Formate={ChargeHistoryTableFormate}
path1={`analytic/get_createdmasterdatahistory/?search=${""}&p=${1}&records=${10}&model_name=${["Charges"]}&app_name=${["master"]}&object_id=${[charge_id]}`}
path={`analytic/get_updatedmasterdatahistory/?search=${""}&p=${1}&records=${10}&model_name=${["Charges"]}&app_name=${["master"]}&object_id=${[charge_id]}`}


/>
</>
    )
}

export default ChargeHistoryPage