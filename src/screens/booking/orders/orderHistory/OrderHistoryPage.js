import React, {useState} from 'react';
import NewHistoryTab from '../../../../components/historyTabComponents/NewHistoryTab';
import { useLocation } from 'react-router-dom';
import OrderCreatedHistory from "../orderHistory/OrderCreatedHistory";
import OrderHistoryTitle from "../orderHistory/OrderHstoryTitle";
import OrderHistoryFormate from "../orderHistory/OrderHistoryFormate"


const OrderHistoryPage = () => {
  const location = useLocation();
  // console.log("order data",location.state.Booking)
  const [order_id] = useState(location.state.Booking.id);
  // console.log("order id =-=-=-=->>",order_id)
  return (
    <div>
        <NewHistoryTab
        Page={OrderCreatedHistory}
        Table_Data_Title={OrderHistoryTitle}
        Table_Data_Formate={OrderHistoryFormate}
        // for created Data
        path1={`analytic/get_createoperationdatahistory/?search=${""}&p=${1}&records=${10}&model_name=${["Order"]}&app_name=${["bookings"]}&object_id=${[order_id]}`}

        //For Updated Data
        path={`analytic/get_updateoperationdatahistory/?search=${""}&p=${1}&records=${10}&model_name=${["Order"]}&app_name=${["bookings"]}&object_id=${[order_id]}`}
        
        />
    </div>
  )
}

export default OrderHistoryPage;