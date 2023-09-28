import React, { useEffect } from "react";
// import Search_list from "../../../components/List_Display/Search_list";
// import Nav_Btn from "../../../components/Btn/Nav_Btn";
// import Filter from "../../../components/List_Display/Filter";
// import Page_Title from "../../../components/Page_Title/Page_Title";
// import Charges_Data_Format from "../../../data/Masters/Charges/Charges_Data_format";
// import Charges_title from "../../../data/Masters/Charges/Charges_Data_Title";
import { useDispatch, useSelector } from "react-redux";
// import { Toggle } from "../../../store/Filter/Parent_Filter/action";
// import { setPageNumber } from "../../../store/Components/Pagination/action";
import DataList from "../../../components/listDisplay/dataList/DataList";
import Title from "../../../components/title/Title";
import SearchList from "../../../components/listDisplay/searchList/SearchList";
import Filter from "../../../components/listDisplay/filter/Filter";
import PageTitle from "../../../components/pageTitle/PageTitle";
import NumPagination from "../../../components/listDisplay/numPagination/NumPagination";
import { setPageNumber } from "../../../store/pagination/Pagination";
import { setFilterA } from "../../../store/filterValue/FilterValue";
import BillClosedDataTitle from "../../../data/billings/billcloseds/BillClosedDataTitle";
import BillClosedDataFormat from "../../../data/billings/billcloseds/BillClosedDataFormat";

const BillCloseds = () => {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.searchbar.search_item);
  // Additional Fields
  const data_len = useSelector((state) => state.pagination.data_length);
  const page_num = useSelector((state) => state.pagination.page_number);

  useEffect(() => {
    dispatch(setFilterA([]));
  }, []);

  return (
    <>
      <PageTitle page="Bill Closeds" />

      <Title title="Bill Closeds" parent_title="Billings" />
      <div className="mx-3">
        <div className="container-fluid " style={{ background: "white" }}>
          <div className="mb-2 row ">
            <div className="col-sm-4">
              <SearchList />
            </div>
            <div className="col-sm-8">
              <div
                className="text-sm-end"
                onClick={() => dispatch(setPageNumber(1))}
              >
                <Filter type={"billclosed"} />
              </div>
            </div>
          </div>

          <DataList
            Data_Title={BillClosedDataTitle}
            Data_Format={BillClosedDataFormat}
            path={`billing/all_bill_orders/?search=${search}&p=${page_num}&records=${data_len}`}
          />
          <NumPagination path={"path"} />
        </div>
      </div>
    </>
  );
};

export default BillCloseds;
