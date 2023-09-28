import React, {useState,useEffect} from "react";
import DataList from "../../../components/listDisplay/dataList/DataList";
import PageTitle from "../../../components/pageTitle/PageTitle";
import Title from "../../../components/title/Title";
import SearchList from "../../../components/listDisplay/searchList/SearchList";
import { useSelector } from "react-redux";
import InboundTab from "./InboundTab";
import { MdAdd } from "react-icons/md";
import NavBtn from "../../../components/btn/NavBtn";
import AsnDataTitle from "../../../data/wms/inbound/asn/AsnDataTitle";
import AsnDataFormate from "../../../data/wms/inbound/asn/AsnDataFormate";

const Inbound = () => {
  const data_len = useSelector((state) => state.pagination.data_length);
  const page_num = useSelector((state) => state.pagination.page_number);
  const search = useSelector((state) => state.searchbar.search_item);
  return (
    <>
      {/* Page_Title */}
      <PageTitle page="Inbound" />
      <InboundTab />
      <Title title="ASN" parent_title="Warehouse" />
      <div className="mx-3">
        <div className="container-fluid " style={{ background: "white" }}>
          <div className="mb-2 row ">
            <div className="col-sm-4">
              <SearchList />
            </div>
           
            <div className="col-sm-8">
            
              <div className="text-sm-end">
              <NavBtn
                    btn_name="Add ASN "
                    icon={<MdAdd size={15} />}
                    form_path="/Inbound/wms/Inbound/asn/AddAsn"
                  />
                {/* <Filter type={"baseinfo"} /> */}
              </div>
            </div>
          </div>

          {/* DataTable */}
          <DataList
            Data_Title={AsnDataTitle}
            Data_Format={AsnDataFormate}
            // path={`runsheet/get_runsheet/?&search=${search}&p=${page_num}&records=${data_len}`}
          />
          {/* <NumPagination path={"path"} /> */}
        </div>
      </div>
    </>
  )
}

export default Inbound