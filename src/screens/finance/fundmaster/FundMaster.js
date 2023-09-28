/* eslint-disable */
import Title from "../../../components/title/Title";
import React, {useState, useEffect} from "react";
import { MdAdd } from "react-icons/md";
import SearchList from "../../../components/listDisplay/searchList/SearchList";
import NavBtn from "../../../components/btn/NavBtn";
import Filter from "../../../components/listDisplay/filter/Filter";
import PageTitle from "../../../components/pageTitle/PageTitle";
import DataList from "../../../components/listDisplay/dataList/DataList";
import FundMasterTitle from "../../../data/finance/fund_master/FundMasterTitle";
import FundMasterDataFormat from "../../../data/finance/fund_master/FundMasterDataformate";
import { useSelector } from "react-redux";
import NumPagination from "../../../components/listDisplay/numPagination/NumPagination";

const FundMaster = () => {
  const search = useSelector((state) => state.searchbar.search_item);
  const page_num = useSelector((state) => state.pagination.page_number);
  const data_len = useSelector((state) => state.pagination.data_length);
  // const toggle = useSelector((state) => state.parentfilter.toggle);

  const branch_name = useSelector((state) => state.filtervalue.data_a);
  const acc_type = useSelector((state) => state.filtervalue.data_b);

  //Permission
  const userpermission = useSelector((state) => state.authentication.userpermission);
  const user = useSelector((state) => state.authentication.userdetails);

  const [can_add, setcan_add] = useState(false);
  const [can_delete, setcan_delete] = useState(false);

  useEffect(() => {
    if (
      userpermission.some((e) => e.sub_model === "Fund Master Entry" && e.write === true)
    ) {
      setcan_add(true);
    } else {
      setcan_add(false);
    }
  }, [userpermission])

  useEffect(() => {  
    if (
      userpermission.some((e) => e.sub_model === "Fund Master Entry" && e.delete === true)
    ) {
      setcan_delete(true);
    } else {
      setcan_delete(false);
    }
  }, [userpermission])

  return (
    <>
      {/* Page_Title */}
      <PageTitle page="Fund Master" />
      <Title title="Fund Master" parent_title="Master" />
      <div className="mx-3">
        <div className="container-fluid" style={{ background: "white" }}>
          {/* Toolbar Section */}
          <div className="mb-2 row">
            <div className="col-sm-4">
              <SearchList />
            </div>
            <div className="col-sm-8">
              <div className="text-sm-end">
                {/* Add Form Navigation Button */}
                {(can_add || user.is_superuser) && (
                <NavBtn
                  btn_name="Add Fund Master"
                  icon={<MdAdd />}
                  form_path="/finance/fundmaster/FundMaster"
                />
                )}
                {/* Filter Tool */}
                <Filter type={"addfundmaster"}/>
              </div>
            </div>
          </div>
          {/* DataTable */}
          <DataList
          can_delete={can_delete}
          Data_Title={FundMasterTitle}
          Data_Format={FundMasterDataFormat}
          path={`finance/get-FundMasterEntry/?search=${search}&p=${page_num}&records=${data_len}&branch_name=${branch_name}&account_type=${acc_type}`}
          />

          <NumPagination path={"path"} />
        </div>
      </div>
      <br />
    </>
  );
};

export default FundMaster;
