/* eslint-disable */
import Title from "../../../components/title/Title";
import React from "react";
import { MdAdd } from "react-icons/md";
import SearchList from "../../../components/listDisplay/searchList/SearchList";
import NavBtn from "../../../components/btn/NavBtn";
import Filter from "../../../components/listDisplay/filter/Filter";
import PageTitle from "../../../components/pageTitle/PageTitle";
import DataList from "../../../components/listDisplay/dataList/DataList";
import AccountTitle from "../../../data/finance/account_master/AccountTitle";
import AccountDataFormat from "../../../data/finance/account_master/AccountDataFormat";
import { useSelector } from "react-redux";
import NumPagination from "../../../components/listDisplay/numPagination/NumPagination";

const AccountMaster = () => {
  const search = useSelector((state) => state.searchbar.search_item);
  const page_num = useSelector((state) => state.pagination.page_number);
  const data_len = useSelector((state) => state.pagination.data_length);
  const toggle = useSelector((state) => state.parentfilter.toggle);
  return (
    <>
      {/* Page_Title */}
      <PageTitle page="Ledger" />
      <Title title="Ledger" parent_title="Accounts" />
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
                <NavBtn
                  btn_name="Add Ledger"
                  icon={<MdAdd />}
                  form_path="/finance/accountmaster/addaccountmaster"
                />
                {/* Filter Tool */}
                <Filter />
              </div>
            </div>
          </div>
          {/* DataTable */}
          <DataList
            path={`finance/get-AccountMaster/?search=${search}&p=${page_num}&records=${data_len}`}
            Data_Title={AccountTitle}
            Data_Format={AccountDataFormat}
          />

          <NumPagination path={"path"} />
        </div>
      </div>
      <br />
    </>
  );
};

export default AccountMaster;
