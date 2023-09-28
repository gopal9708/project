/* eslint-disable */
import Title from "../../../../components/title/Title";
import React from "react";
import { MdAdd } from "react-icons/md";
import SearchList from "../../../../components/listDisplay/searchList/SearchList";
import NavBtn from "../../../../components/btn/NavBtn";
import Filter from "../../../../components/listDisplay/filter/Filter";
import PageTitle from "../../../../components/pageTitle/PageTitle";
import DataList from "../../../../components/listDisplay/dataList/DataList";
import AccountSubGroupTitle from "../../../../data/finance/sub_account_group/AccountSubGroupTitle";
import AccountSubGroupDataFormat from "../../../../data/finance/sub_account_group/AccountSubGroupDataFormate";
import { useSelector } from "react-redux";
import NumPagination from "../../../../components/listDisplay/numPagination/NumPagination";

const ListCsvn = () => {
  const search = useSelector((state) => state.searchbar.search_item);
  const page_num = useSelector((state) => state.pagination.page_number);
  const data_len = useSelector((state) => state.pagination.data_length);
  const toggle = useSelector((state) => state.parentfilter.toggle);
  return (
    <>
      {/* Page_Title */}
      <PageTitle page="PayRoll" />
      <Title title="PayRoll Records" parent_title="Payroll" />
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
                  btn_name="Add PayRoll Records"
                  icon={<MdAdd />}
                  form_path="/ems/payroll/payrollrecords/AddPayroll"
                />
                {/* Filter Tool */}
                <Filter />
              </div>
            </div>
          </div>
          {/* DataTable */}
          <DataList
            path={`/?search=${search}&p=${page_num}&records=${data_len}`}
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

export default ListCsvn;
