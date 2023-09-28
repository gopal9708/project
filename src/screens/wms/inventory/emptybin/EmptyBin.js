import React from 'react'
import DataList from '../../../../components/listDisplay/dataList/DataList'
import Title from '../../../../components/title/Title'
import PageTitle from '../../../../components/pageTitle/PageTitle'
import SearchList from '../../../../components/listDisplay/searchList/SearchList'
import { useSelector } from 'react-redux'
import InventoryTab from '../InventoryTab'
import EmptyBinDataFormate from "../../../../data/wms/inventory/emptybin/EmptyBinDataFormate";
import EmptyBinDataTitle from "../../../../data/wms/inventory/emptybin/EmptyBinDataTitle";

const EmptyBin = () => {
  const data_len = useSelector((state) => state.pagination.data_length);
  const page_num = useSelector((state) => state.pagination.page_number);
  const search = useSelector((state) => state.searchbar.search_item);
  return (
    <>
      {/* Page_Title */}
      <PageTitle page="EmptyBin" />
      <InventoryTab />
      <Title title="EmptyBin" parent_title="Inventory" />
      <div className="mx-3">
        <div className="container-fluid " style={{ background: "white" }}>
          <div className="mb-2 row ">
            <div className="col-sm-4">
              <SearchList />
            </div>

            <div className="col-sm-8">

              {/* <div className="text-sm-end">
            <NavBtn
                  btn_name="Add Warehouse"
                  icon={<MdAdd size={15} />}
                  form_path="/warehouse/AddWarehouse"
                />
              <Filter type={"baseinfo"} />
            </div> */}
            </div>
          </div>

          {/* DataTable */}
          <DataList
            Data_Title={EmptyBinDataTitle}
            Data_Format={EmptyBinDataFormate}
          // path={`runsheet/get_runsheet/?&search=${search}&p=${page_num}&records=${data_len}`}
          />
          {/* <NumPagination path={"path"} /> */}
        </div>
      </div>
    </>
  )
}

export default EmptyBin