/* eslint-disable */
import { DataList } from "../../../components/List_Display/DataList";
import Title from "../../../components/Title/Title";
import React, { useEffect } from "react";
import { MdAdd } from "react-icons/md";
import Search_list from "../../../components/List_Display/Search_list";
import Nav_Btn from "../../../components/Btn/Nav_Btn";
import Filter from "../../../components/List_Display/Filter";
import Page_Title from "../../../components/Page_Title/Page_Title";
import Commodity_Data_Format from "../../../data/Masters/Commidity/Commodity_Data_format";
import Commodity_title from "../../../data/Masters/Commidity/Commodity_Data_Title";
import My_Pagination from "../../../components/List_Display/Pagination/My_Pagination";
import { setNo_item_per_page_vehicles_maintainance } from "../../../store/Components/ListDisplay/Pagination/action";
import {
  alertCommodity,
  deleteCommodity,
  divideCommodities,
} from "../../../store/Masters/Commodity/action";
// import { useDispatch, useSelector } from "react-redux";
import { Alert } from "reactstrap";
import Vehicle_Mentainance_Data_Format from "../../../data/Vms/Vehicle_Maintainanace/Vehicle_Maintainance_Data_Formate";
import Vehicle_Maintainance_title from "../../../data/Vms/Vehicle_Maintainanace/Vehicle_Maintainance_Data_Title";
import Vehicle_Maintainance_Data_Format from "../../../data/Vms/Vehicle_Maintainanace/Vehicle_Maintainance_Data_Formate";
import {
  deleteVehicleMaintainance,
  divideVehicleMaintainance,
  setVehicleMaintainanceLength,
} from "../../../store/Vms/Vehicle_Maintainance/action";

const Vehicle_Maintainance = () => {
  const dispatch = useDispatch();

  const alert_commodity = useSelector(
    (state) => state.commodities.commodity_alert
  );

  const show_per_page_Vehicle_Maintainance = useSelector(
    (state) => state.no_item_per_page.no_item_per_page_vehicle_maintainance
  );
  const delete_vehicle_maintainance = useSelector(
    (state) => state.vehicle_maintainance.vehicle_maintainance_deleted
  );
  const show_pagination = useSelector(
    (state) => state.show_pagination.show_pagination
  );

  const checked = useSelector(
    (state) => state.main_checkbox.main_checkbox.commodities
  );

  return (
    <>
      {/* Page_Title */}
      <Page_Title page="Commodities" />

      <Title title="Vehicle Maintainance" parent_title="Vms" />
      <div className="mx-3">
        <div className="container-fluid " style={{ background: "white" }}>
          {/* Toolbar Section */}
          <div className="mb-2 row ">
            <div className="col-sm-4">
              <Search_list />
            </div>
            <div className="col-sm-8">
              <div className="text-sm-end">
                {/* Add Branch Navigation Button */}
                <Nav_Btn
                  btn_name="Add Vehicle Maintainance"
                  icon={<MdAdd />}
                  form_path="/vms/vehicle_maintainance/Add_vehicle_Maintainance/"
                />

                {/* Filter Tool */}
                <Filter />
              </div>
            </div>
          </div>
          {/* DataTable */}
          <DataList
            Data_Title={Vehicle_Maintainance_title}
            Data_Format={Vehicle_Maintainance_Data_Format}
            display_list={"vehicle_maintainance"}
          />
          Pagination
          {/* {show_pagination ? (
            <My_Pagination
              List_Name={"vehicle_maintainance"}
              Divided_List_Func={divideVehicleMaintainance}
              List_Len_Name={"vehicle_maintainance_len"}
              Show_Per_Page={show_per_page_Vehicle_Maintainance}
              Set_Per_Page={setNo_item_per_page_vehicles_maintainance}
              delete_name={delete_vehicle_maintainance}
              deleteItem={deleteVehicleMaintainance}
              type={"backend"}
              path={"vms/api/View_vehiclemaintainance/"}
              List_Len_Function={setVehicleMaintainanceLength}
            />
          ) : null} */}
        </div>
      </div>
    </>
  );
};

export default Vehicle_Maintainance;
