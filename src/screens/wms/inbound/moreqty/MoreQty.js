import React from 'react';
import DataList from '../../../../components/listDisplay/dataList/DataList';
import PageTitle from '../../../../components/pageTitle/PageTitle';
import Title from '../../../../components/title/Title';
import SearchList from '../../../../components/listDisplay/searchList/SearchList';

import InboundTab from '../InboundTab';

import MoreQtyDataFormate from '../../../../data/wms/inbound/moreqty/MoreQtyDataFormate';
import MoreQtyDataTitle from '../../../../data/wms/inbound/moreqty/MoreQtyDataTitle';
const MoreQty = () => {
  return (
    <>
      {/* Page_Title */}
      <PageTitle page="More Qty" />
      <InboundTab />
      <Title title="More Qty" parent_title="Inbound" />
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
            Data_Title={MoreQtyDataTitle}
            Data_Format={MoreQtyDataFormate}
            // path={`runsheet/get_runsheet/?&search=${search}&p=${page_num}&records=${data_len}`}
          />
          {/* <NumPagination path={"path"} /> */}
        </div>
      </div>
    </>
  )
}
export default MoreQty