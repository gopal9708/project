import React from 'react';
import DataList from '../../../../components/listDisplay/dataList/DataList';
import PageTitle from '../../../../components/pageTitle/PageTitle';
import Title from '../../../../components/title/Title';
import SearchList from '../../../../components/listDisplay/searchList/SearchList';
import OutBoundTab from '../OutBoundTab';
import ProofOfDeliveryDataFormate from '../../../../data/wms/outbond/proofofdelivery/ProofOfDeliveryDataFormate';
import ProofOfDeliveryDataTitle from '../../../../data/wms/outbond/proofofdelivery/ProofOfDeliveryDataTitle';


const ProofOfDelivery = () => {
    return (
      <>
        {/* Page_Title */}
        <PageTitle page="ProofOfDelivery" />
        <OutBoundTab />
        <Title title="Proof Of Delivery" parent_title="Outbound" />
        <div className="mx-3">
          <div className="container-fluid " style={{ background: "white" }}>
            <div className="mb-2 row ">
              <div className="col-sm-4">
                <SearchList />
              </div>
             
              <div className="col-sm-8">
              
                {/* <div className="text-sm-end">
                <NavBtn
                      btn_name="Add PreOrder"
                      icon={<MdAdd size={15} />}
                      form_path="/warehouse/Outbound/Preorder/addpreorder"
                    />
                  <Filter type={"baseinfo"} /> 
                </div> */}
              </div>
            </div>
  
            {/* DataTable */}
            <DataList
              Data_Title={ProofOfDeliveryDataTitle}
              Data_Format={ProofOfDeliveryDataFormate}
              // path={`runsheet/get_runsheet/?&search=${search}&p=${page_num}&records=${data_len}`}
            />
            {/* <NumPagination path={"path"} /> */}
          </div>
        </div>
      </>
    )
  }

export default ProofOfDelivery