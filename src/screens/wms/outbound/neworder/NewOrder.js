import React from 'react';
import DataList from '../../../../components/listDisplay/dataList/DataList';
import PageTitle from '../../../../components/pageTitle/PageTitle';
import Title from '../../../../components/title/Title';
import SearchList from '../../../../components/listDisplay/searchList/SearchList';
import Filter from '../../../../components/listDisplay/filter/Filter';
import { useSelector } from 'react-redux';
import OutBoundTab from '../OutBoundTab';
import NumPagination from '../../../../components/listDisplay/numPagination/NumPagination';
import { MdAdd } from 'react-icons/md';
import NavBtn from '../../../../components/btn/NavBtn';
import NewOrderDataFormate from '../../../../data/wms/outbond/neworder/NewOrderDataFormate';
import NewOrderDataTitle from '../../../../data/wms/outbond/neworder/NewOrderDataTitle';

const NewOrder = () => {
    return (
      <>
        {/* Page_Title */}
        <PageTitle page="New Order" />
        <OutBoundTab />
        <Title title="New Order" parent_title="Outbound" />
        <div className="mx-3">
          <div className="container-fluid " style={{ background: "white" }}>
            <div className="mb-2 row ">
              <div className="col-sm-4">
                <SearchList />
              </div>
             
              <div className="col-sm-8">
              
                {/* <div className="text-sm-end">
                <NavBtn
                      btn_name="Add Neworder"
                      icon={<MdAdd size={15} />}
                      form_path="/warehouse/Outbound/neworder/AddNewOrder"
                    />
                  <Filter type={"baseinfo"} /> 
                </div> */}
              </div>
            </div>
  
            {/* DataTable */}
            <DataList
              Data_Title={NewOrderDataTitle}
              Data_Format={NewOrderDataFormate}
              // path={`runsheet/get_runsheet/?&search=${search}&p=${page_num}&records=${data_len}`}
            />
            {/* <NumPagination path={"path"} /> */}
          </div>
        </div>
      </>
    )
  }

export default NewOrder