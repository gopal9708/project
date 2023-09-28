import React, {useState} from 'react';
import { useLocation } from 'react-router-dom';
import NumPagination from '../../../../components/listDisplay/numPagination/NumPagination';
import BranchHistoryTableFormate from "./BranchHistoryTableFormate";
import BranchHistoryTableTitle from "./BranchHistoryTableTitle";
import NewHistoryTab from '../../../../components/historyTabComponents/NewHistoryTab';
import BranchCreatedHistory from './BranchCreatedHistory';

const BranchHistoryPage = () => {
  const location = useLocation();
  const [branch_id, setbranch_id] = useState(location.state.Branch.id);
   
  return (
    <>
      <NewHistoryTab
      Page={BranchCreatedHistory}
       Table_Data_Title={BranchHistoryTableTitle}
       Table_Data_Formate={BranchHistoryTableFormate}
       path1={`analytic/get_createdmasterdatahistory/?search=${""}&p=${1}&records=${10}&model_name=${["Branch"]}&app_name=${["master"]}&object_id=${[branch_id]}`}
       path={`analytic/get_updatedmasterdatahistory/?search=${""}&p=${1}&records=${10}&model_name=${["Branch"]}&app_name=${["master"]}&object_id=${[branch_id]}`}
      />
      <NumPagination 
      
      />
    </>
  )
}

export default BranchHistoryPage