import React, { useEffect } from "react";
import { MdAdd } from "react-icons/md";
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
import NavBtn from "../../../components/btn/NavBtn";
import Filter from "../../../components/listDisplay/filter/Filter";
import PageTitle from "../../../components/pageTitle/PageTitle";
import NumPagination from "../../../components/listDisplay/numPagination/NumPagination";
import { setPageNumber } from "../../../store/pagination/Pagination";
import { setFilterA } from "../../../store/filterValue/FilterValue";
import WaraiesTitle from "../../../data/billings/waraies/WaraiesTitle";
import WaraiesDataFormat from "../../../data/billings/waraies/WaraiesDataFormat";

const Waraies = () => {
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
      <PageTitle page="Waraies" />

      <Title title="Waraies" parent_title="Billings" />
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
                <NavBtn
                  btn_name="Add Warai"
                  icon={<MdAdd size={15} />}
                  form_path="/billing/waraies/addwarai"
                />
                <Filter type={"waraies"} />
              </div>
            </div>
          </div>

          <DataList
            Data_Title={WaraiesTitle}
            Data_Format={WaraiesDataFormat}
            // bookings/api/get-warai-charges/?search=${search}&p=${page_num}&records=${data_len}
            path={`billing/all_waraies/?search=${search}&p=${page_num}&records=${data_len}`}
          />
          <NumPagination path={"path"} />
        </div>
      </div>
    </>
  );
};

export default Waraies;
