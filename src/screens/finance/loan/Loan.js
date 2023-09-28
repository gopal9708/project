import React, { useEffect } from "react";
import { MdAdd } from "react-icons/md";
import NavBtn from "../../../components/btn/NavBtn";
import { useDispatch, useSelector } from "react-redux";
import DataList from "../../../components/listDisplay/dataList/DataList";
import PageTitle from "../../../components/pageTitle/PageTitle";
import Title from "../../../components/title/Title";
import SearchList from "../../../components/listDisplay/searchList/SearchList";
import Filter from "../../../components/listDisplay/filter/Filter";
import NumPagination from "../../../components/listDisplay/numPagination/NumPagination";
import LoanDataTitle from "../../../data/accounts/loan/LoanDataTitle";
import LoanDataFormat from "../../../data/accounts/loan/LoanDataFormat";

const Loan = () => {
  const dispatch = useDispatch();
   // redux state
  const data_len = useSelector((state) => state.pagination.data_length);
  const page_num = useSelector((state) => state.pagination.page_number);
  const search = useSelector((state) => state.searchbar.search_item);
  return (
    <>
      <PageTitle page={"Loan"} />
      <Title title="Loan" parent_title="Accounts" />
      <div className="mx-3">
        <div className="container-fluid" style={{ background: "White" }}>
          <div className="mb-2 row">
            <div className="col-sm-4">
              <SearchList />
            </div>
            <div className="col-sm-8">
              <div
                className="text-sm-end"
                // onClick={() => dispatch(setPageNumber(1))}
              >
                <NavBtn
                  btn_name="Add Loan"
                  icon={<MdAdd size={15} />}
                  form_path="/finance/Loan/AddLoan"
                />
                {/* Filter */}
                <Filter type={"Loan"} />
              </div>
            </div>
          </div>
          {/* DataTable */}
          <DataList
            Data_Title={LoanDataTitle}
            Data_Format={LoanDataFormat}
            path={`finance/get-loan/?search=${search}&p=${page_num}&records=${data_len}`}
          />
          <NumPagination path={"path"} />
        </div>
      </div>
    </>
  );
};
export default Loan;
