import React from 'react';
import DataList from '../../../../components/listDisplay/dataList/DataList';
import PageTitle from '../../../../components/pageTitle/PageTitle';
import Title from '../../../../components/title/Title';
import SearchList from '../../../../components/listDisplay/searchList/SearchList';
import InboundTab from '../InboundTab';
import ShortageDataFormate from '../../../../data/wms/inbound/shortage/ShortageDataFormate';
import ShortageDataTitle from '../../../../data/wms/inbound/shortage/ShortageDataTitle';
const Shortage = () => {
  return (
    <>
      {/* Page_Title */}
      <PageTitle page="Shortage" />
      <InboundTab />
      <Title title="Shortage" parent_title="Inbound" />
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
            Data_Title={ShortageDataTitle}
            Data_Format={ShortageDataFormate}
            // path={`runsheet/get_runsheet/?&search=${search}&p=${page_num}&records=${data_len}`}
          />
          {/* <NumPagination path={"path"} /> */}
        </div>
      </div>
    </>
  )
}
export default Shortage