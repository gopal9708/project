import React from 'react';
import DataList from '../../../components/listDisplay/dataList/DataList';
import PageTitle from '../../../components/pageTitle/PageTitle';
import Title from '../../../components/title/Title';
import SearchList from '../../../components/listDisplay/searchList/SearchList';
import { MdAdd } from 'react-icons/md';
import NavBtn from '../../../components/btn/NavBtn';
import BinDetailsTab from './BinDetailsTab';
import BinSetDataFormat from '../../../data/wms/bindetails/binset/BinSetDataFormat';
import BinSetDataTitle from '../../../data/wms/bindetails/binset/BinSetDataTitle';
import { useSelector } from 'react-redux';

const BinDetails = () => {

  const data_len = useSelector((state) => state.pagination.data_length);
  const page_num = useSelector((state) => state.pagination.page_number);
  const search = useSelector((state) => state.searchbar.search_item);


  return (
    <>
      {/* Page_Title */}
      <PageTitle page="Bin Detail" />
      <BinDetailsTab />
      <Title title="Bin Detail" parent_title="WMS" />
      <div className="mx-3">
        <div className="container-fluid " style={{ background: "white" }}>
          <div className="mb-2 row ">
            <div className="col-sm-4">
              <SearchList />
            </div>
           
            <div className="col-sm-8">
            
              <div className="text-sm-end">
              <NavBtn
                    btn_name="Add BinSet"
                    icon={<MdAdd size={15} />}
                    form_path="/wms/bindetails/binset/AddBinSet"
                  />
                {/* <Filter type={"baseinfo"} /> */} 
              </div>
            </div>
          </div>

          {/* DataTable */}
          <DataList
            Data_Title={BinSetDataTitle}
            Data_Format={BinSetDataFormat}
            path={`wms/get_binset/?&search=${search}&p=${page_num}&records=${data_len}`}
            />
          {/* <NumPagination path={"path"} /> */}
        </div>
      </div>
    </>
  )
}

export default BinDetails