import React ,{useState} from "react";

import BookingCreatedHistory from "./BookingCreatedHistory";
import BookingHistoryTableFormat from "./BookingHistoryTableFormat";
import BookingHistorytableTitle from "./BookingHistorytableTitle";
import { useLocation } from 'react-router-dom';
import NewHistoryTab from "../../../components/historyTabComponents/NewHistoryTab";

const BookingHistoryPage = () => {
    const location = useLocation();
    const [order_id, setorder_id] = useState(location.state.order.id);
    console.log("ordersssss", order_id)

    return (
        // <div>hello</div>
        <NewHistoryTab 
        page={BookingCreatedHistory}
        Table_Data_Title={BookingHistorytableTitle}
        Table_Data_Formate={BookingHistoryTableFormat}
        path1={`analytic/get_createdbookingdatahistory/?search=${""}&p=${1}&records=${10}&model_name=${["Orders"]}&app_name=${["booking"]}&object_id=${[order_id]}`}
        path={`analytic/get_updatedbookingdatahistory/?search=${""}&p=${1}&records=${10}&model_name=${["Orders"]}&app_name=${["booking"]}&object_id=${[order_id]}`}
        
        />
    )
}

export default BookingHistoryPage;