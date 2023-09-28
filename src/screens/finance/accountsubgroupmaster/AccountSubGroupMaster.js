/* eslint-disable */
import Title from "../../../components/title/Title";
import React, {useState, useEffect} from "react";
import { MdAdd } from "react-icons/md";
import SearchList from "../../../components/listDisplay/searchList/SearchList";
import NavBtn from "../../../components/btn/NavBtn";
import Filter from "../../../components/listDisplay/filter/Filter";
import PageTitle from "../../../components/pageTitle/PageTitle";
import DataList from "../../../components/listDisplay/dataList/DataList";
import AccountSubGroupTitle from "../../../data/finance/sub_account_group/AccountSubGroupTitle";
import AccountSubGroupDataFormat from "../../../data/finance/sub_account_group/AccountSubGroupDataFormate";
import { useSelector } from "react-redux";
import NumPagination from "../../../components/listDisplay/numPagination/NumPagination";

const AccountSubGroupMaster = () => {
  const search = useSelector((state) => state.searchbar.search_item);
  const page_num = useSelector((state) => state.pagination.page_number);
  const data_len = useSelector((state) => state.pagination.data_length);

  //Permissions
  const userpermission = useSelector((state) => state.authentication.userpermission);
  const user = useSelector((state) => state.authentication.userdetails);

  const [can_add, setcan_add] = useState(false);
  const [can_delete, setcan_delete] = useState(false);

  useEffect(() => {
    if (
      userpermission.some((e) => e.sub_model === "Sub Group Master" && e.write === true)
    ) {
      setcan_add(true);
    } else {
      setcan_add(false);
    }
  }, [userpermission])

  useEffect(() => {  
    if (
      userpermission.some((e) => e.sub_model === "Sub Group Master" && e.delete === true)
    ) {
      setcan_delete(true);
    } else {
      setcan_delete(false);
    }
  }, [userpermission])
  return (
    <>
      {/* Page_Title */}
      <PageTitle page="Account Sub Group Master" />
      <Title title="Account Sub Group Master" parent_title="Master" />
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
                  btn_name="Add Account Sub Group Master"
                  icon={<MdAdd />}
                  form_path="/finance/accountsubgroupmaster/AddAccountSubGroupMaster"
                />
                )}
                {/* Filter Tool */}
                <Filter />
              </div>
            </div>
          </div>
          {/* DataTable */}
          <DataList
          can_delete={can_delete}
            path={`finance/get-AccountSubGroupMaster/?search=${search}&p=${page_num}&records=${data_len}`}
            Data_Title={AccountSubGroupTitle}
            Data_Format={AccountSubGroupDataFormat}
          />

          <NumPagination path={"path"} />
        </div>
      </div>
      <br />
    </>
  );
};

export default AccountSubGroupMaster;
