import React from 'react';
import DataList from '../../../../components/listDisplay/dataList/DataList';
import PageTitle from '../../../../components/pageTitle/PageTitle';
import Title from '../../../../components/title/Title';
import SearchList from '../../../../components/listDisplay/searchList/SearchList';
import { MdAdd } from 'react-icons/md';
import NavBtn from '../../../../components/btn/NavBtn';
import BinSizeDataTitle from '../../../../data/wms/bindetails/binsize/BinSizeDataTitle';
import BinDetailsTab from '../BinDetailsTab';
import BinSizeDataFormate from '../../../../data/wms/bindetails/binsize/BinSizeDataFormat';
import { useSelector } from 'react-redux';


const BinSize = () => {

  const data_len = useSelector((state) => state.pagination.data_length);
  const page_num = useSelector((state) => state.pagination.page_number);
  const search = useSelector((state) => state.searchbar.search_item);

  return (
    <>
      {/* Page_Title */}
      <PageTitle page="Bin Size" />
      <BinDetailsTab />
      <Title title="Bin Size" parent_title="BinDetails" />
      <div className="mx-3">
        <div className="container-fluid " style={{ background: "white" }}>
          <div className="mb-2 row ">
            <div className="col-sm-4">
              <SearchList />
            </div>
           
            <div className="col-sm-8"> 
            
              <div className="text-sm-end">
              <NavBtn
                    btn_name="Add BinSize"
                    icon={<MdAdd size={15} />}
                    form_path="/wms/bindetails/binsize/AddBinSize"
                  />
                {/* <Filter type={"baseinfo"} /> */} 
              </div>
            </div>
          </div>

          {/* DataTable */}
          <DataList
            Data_Title={BinSizeDataTitle}
            Data_Format={BinSizeDataFormate}
            path={`wms/get_binsize/?&search=${search}&p=${page_num}&records=${data_len}`}
          />
          {/* <NumPagination path={"path"} /> */}
        </div>
      </div>
    </>
  )
}

export default BinSize