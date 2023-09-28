import React, { useState } from 'react';
import NewHistoryTab from '../../../../components/historyTabComponents/NewHistoryTab';
import OrganizationCreatedHistory from './OrganizationCreatedHistory';
import OrganizationHistoryTableTitle from "../organizationHistory/OrganizationHistoryTableTitle";
import OrganizationHistoryTableFormate from './OrganizationHistoryTableFormate';
import { useLocation } from 'react-router-dom';

const OrganizationHistoryPage = () => {
  const location = useLocation();
  //  console.log(" organization Data ===>>",location)
  const [org_id, setorg_id] = useState(location.state.organization.id);

  // console.log("Organization Data>>>>>>>",org_id) 
  return (
    <>
      <NewHistoryTab
        Page={OrganizationCreatedHistory}
        Table_Data_Title={OrganizationHistoryTableTitle}
        Table_Data_Formate={OrganizationHistoryTableFormate}
        path1={`analytic/get_createdmasterdatahistory/?search=${""}&p=${1}&records=${10}&model_name=${["Organization"]}&app_name=${["organization"]}&object_id=${[org_id]}`}
        path={`analytic/get_updatedmasterdatahistory/?search=${""}&p=${1}&records=${10}&model_name=${["Organization"]}&app_name=${["organization"]}&object_id=${[org_id]}`}

      />
    </>
  )
}

export default OrganizationHistoryPage