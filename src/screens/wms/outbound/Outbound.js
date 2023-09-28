import React, {useState,useEffect} from "react";
import DataList from "../../../components/listDisplay/dataList/DataList";
import PageTitle from "../../../components/pageTitle/PageTitle";
import Title from "../../../components/title/Title";
import SearchList from "../../../components/listDisplay/searchList/SearchList";
import { useSelector } from "react-redux";
import OutBoundTab from "./OutBoundTab";
import { MdAdd } from "react-icons/md";
import NavBtn from "../../../components/btn/NavBtn";
import DnDataTitle from "../../../data/wms/outbond/dn/DnDataTitle";
import DnDataFormate from "../../../data/wms/outbond/dn/DnDataFormate";




const Outbound = () => {
  const data_len = useSelector((state) => state.pagination.data_length);
  const page_num = useSelector((state) => state.pagination.page_number);
  const search = useSelector((state) => state.searchbar.search_item);
  return (
    <>
      {/* Page_Title */}
      <PageTitle page="Outbound" />
      <OutBoundTab />
      <Title title="DN" parent_title="Warehouse" />
      <div className="mx-3">
        <div className="container-fluid " style={{ background: "white" }}>
          <div className="mb-2 row ">
            <div className="col-sm-4">
              <SearchList />
            </div>
           
            <div className="col-sm-8">
            
              <div className="text-sm-end">
              <NavBtn
                    btn_name="Add DN "
                    icon={<MdAdd size={15} />}
                    form_path="/wms/outbound/dn/AddDn"
                  />
                {/* <Filter type={"baseinfo"} /> */}
              </div>
            </div>
          </div>

          {/* DataTable */}
          <DataList
            Data_Title={DnDataTitle}
            Data_Format={DnDataFormate}
            // path={`runsheet/get_runsheet/?&search=${search}&p=${page_num}&records=${data_len}`}
          />
          {/* <NumPagination path={"path"} /> */}
        </div>
      </div>
    </>
  )
}

export default Outbound