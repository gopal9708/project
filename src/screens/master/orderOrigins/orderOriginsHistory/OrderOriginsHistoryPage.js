import React,{useState} from 'react';
import { useLocation } from 'react-router-dom';
import NewHistoryTab from '../../../../components/historyTabComponents/NewHistoryTab';
import OrderOriginsHistoryCreatedPage from './OrderOriginsHistoryCreatedPage';
import OrderOriginsHistoryFormate from './OrderOriginsHistoryFormate';
import OrderOriginsHistoryTitle from './OrderOriginsHistoryTitle';

const OrderOriginsHistoryPage = () => {
    const location = useLocation();

    const [orderOrigin_id, setorderOrigin_id] = useState(location.state.orderorigin.id);
  return (
    <>
    <NewHistoryTab
    Page={OrderOriginsHistoryCreatedPage}
    Table_Data_Title={OrderOriginsHistoryTitle}
    Table_Data_Formate={OrderOriginsHistoryFormate}
    path1={`analytic/get_createdmasterdatahistory/?search=${""}&p=${1}&records=${10}&model_name=${["ShipperConsignee"]}&app_name=${["master"]}&object_id=${[orderOrigin_id]}`}
    path={`analytic/get_updatedmasterdatahistory/?search=${""}&p=${1}&records=${10}&model_name=${["ShipperConsignee"]}&app_name=${["master"]}&object_id=${[orderOrigin_id]}`}
    />
    </>
  )
}

export default OrderOriginsHistoryPage