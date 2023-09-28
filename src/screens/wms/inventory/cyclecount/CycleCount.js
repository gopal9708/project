import React from 'react'
import DataList from '../../../../components/listDisplay/dataList/DataList'
import Title from '../../../../components/title/Title'
import PageTitle from '../../../../components/pageTitle/PageTitle'
import SearchList from '../../../../components/listDisplay/searchList/SearchList'
import InventoryTab from '../InventoryTab'
import CycleCountDataFormate from "../../../../data/wms/inventory/cyclecount/CycleCountDataFormate";
import CycleCountDataTitle from '../../../../data/wms/inventory/cyclecount/CycleCountDataTitle'

const CycleCount = () => {
  return (
    <>
    {/* Page_Title */}
    <PageTitle page="CycleCount" />
    <InventoryTab/>
    <Title title="CycleCount" parent_title="Inventory" />
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
          Data_Title={ CycleCountDataTitle}
          Data_Format={CycleCountDataFormate}
          // path={`runsheet/get_runsheet/?&search=${search}&p=${page_num}&records=${data_len}`}
        />
        {/* <NumPagination path={"path"} /> */}
      </div>
    </div>
  </>
  )
}

export default CycleCount