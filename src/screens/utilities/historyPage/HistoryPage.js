import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import HistoryTab from "../../../components/historyTabComponents/HistoryTab";
import TableFormate from "./TableFormate";
import NumPagination from "../../../components/listDisplay/numPagination/NumPagination";

const HistoryPage = () => {
  const location = useLocation();
  console.log("\\\\\\\\", location);
  const [commdity_id, setcommdity_id] = useState(location.state.commodity.id);
  console.log("id is", commdity_id)

  const [card_data, setcard_data] = useState({
    0: "Sonari",
    1: "Kadma",
    2: "Sakchi",
    3: "Chili",
    4: "Aditpur",
    5: "Musabani",
    6: "Rampur",
    7: "Sita Nager",
    8: "Ghatshila",
    9: "Ganga Nager",
    10: "Hazaribag",
  });
  let commodity_data = Object.entries(location.state.commodity);
  let commdity_list = [
    commodity_data[1],
    commodity_data[2],
    commodity_data[3],
    // commodity_data[9],
  ];
  // console.log("List is", commdity_list)
  // console.log("com Data", commodity_data);
  let ele = Object.entries(card_data);
  // console.log("ele", ele);
  // console.log(card_data[0], card_data[1]);
  
  //Make list to pass the component
  let list1 = [ele[0], ele[1], ele[4], ele[5]];
  let list2 = [ele[3], ele[9], ele[6], ele[4]];

  return (
    <>
      <HistoryTab
        width={12}
        Number_OF_Card={1}
        Card_Title1={"Commodity Details"}
        Card_Data1={commdity_list}
        Table_Data_Title={["Operation", "Commodity Type", "Commodity Name", "Created By", "Created At", "Modified By", "Modified At"]}
        Table_Data_Formate={TableFormate}
        path={`analytic/get_masterdatahistory/?search=${""}&p=${1}&records=${10}&model_name=${["Commodity"]}&app_name=${["masters"]}&object_id=${[commdity_id]}`}
      />
      <NumPagination path={"path"} />
      {/* <HistoryPage/> */}
    </>
  );
};

export default HistoryPage;
