import React from 'react';
import DataList from '../../../../components/listDisplay/dataList/DataList';
import PageTitle from '../../../../components/pageTitle/PageTitle';
import Title from '../../../../components/title/Title';
import SearchList from '../../../../components/listDisplay/searchList/SearchList';
import { useSelector } from 'react-redux';
import { MdAdd } from 'react-icons/md';
import NavBtn from '../../../../components/btn/NavBtn';
import BinDetailsTab from '../BinDetailsTab';
import BinPropertyDataFormat from '../../../../data/wms/bindetails/binproperty/BinPropertyDataFormat';
import BinPropertyDataTitle from '../../../../data/wms/bindetails/binproperty/BinPropertyDataTitle';


const BinProperty = () => { 

  const data_len = useSelector((state) => state.pagination.data_length);
  const page_num = useSelector((state) => state.pagination.page_number);
  const search = useSelector((state) => state.searchbar.search_item);


    return (
        <>
          {/* Page_Title */}
          <PageTitle page="Bin Property" />
          <BinDetailsTab />
          <Title title="Bin Property" parent_title="BinDetails" />
          <div className="mx-3">
            <div className="container-fluid " style={{ background: "white" }}>
              <div className="mb-2 row ">
                <div className="col-sm-4">
                  <SearchList />
                </div>
               
                <div className="col-sm-8">
                
                  <div className="text-sm-end">
                  <NavBtn
                        btn_name="Add BinProperty"
                        icon={<MdAdd size={15} />}
                        form_path="/wms/bindetails/binproperty/AddBinProperty"
                      />
                    {/* <Filter type={"baseinfo"} /> */} 
                  </div>
                </div>
              </div>
    
              {/* DataTable */}
              <DataList
                Data_Title={BinPropertyDataTitle}
                Data_Format={BinPropertyDataFormat}
                path={`wms/get_binproperty/?&search=${search}&p=${page_num}&records=${data_len}`}
              />
              {/* <NumPagination path={"path"} /> */}
            </div>
          </div>
        </>
      )
}

export default BinProperty