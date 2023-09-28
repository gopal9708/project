import React from 'react'
import DataList from '../../../../components/listDisplay/dataList/DataList'
import Title from '../../../../components/title/Title'
import PageTitle from '../../../../components/pageTitle/PageTitle'
import SearchList from '../../../../components/listDisplay/searchList/SearchList'
import Filter from '../../../../components/listDisplay/filter/Filter'
import { useSelector } from 'react-redux'
import InventoryTab from '../InventoryTab'
import NumPagination from '../../../../components/listDisplay/numPagination/NumPagination'
import NavBtn from '../../../../components/btn/NavBtn'
import { MdAdd } from 'react-icons/md'
import OccupiedBinDataFormate from "../../../../data/wms/inventory/occupiedbin/OccupiedBinDataFormate";
import OccupiedBinDataTitle from "../../../../data/wms/inventory/occupiedbin/OccupiedBinDataTitle";

const OccupiedBin = () => {
    const data_len = useSelector((state) => state.pagination.data_length);
  const page_num = useSelector((state) => state.pagination.page_number);
  const search = useSelector((state) => state.searchbar.search_item);

  return (
    <>
    {/* Page_Title */}
    <PageTitle page="OccupiedBin" />
    <InventoryTab/>
    <Title title="OccupiedBin" parent_title="Inventory" />
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
          Data_Title={ OccupiedBinDataTitle}
          Data_Format={OccupiedBinDataFormate}
          // path={`runsheet/get_runsheet/?&search=${search}&p=${page_num}&records=${data_len}`}
        />
        {/* <NumPagination path={"path"} /> */}
      </div>
    </div>
  </>
  )
}

export default OccupiedBin