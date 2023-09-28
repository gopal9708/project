import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import DataList from "../../../components/listDisplay/dataList/DataList";
import PageTitle from "../../../components/pageTitle/PageTitle";
import Title from "../../../components/title/Title";
import { setPageNumber } from "../../../store/pagination/Pagination";
import { setToggle } from "../../../store/parentFilter/ParentFilter";
import SearchList from "../../../components/listDisplay/searchList/SearchList";
import Filter from "../../../components/listDisplay/filter/Filter";
import NumPagination from "../../../components/listDisplay/numPagination/NumPagination";
import Navigate from "../ewayBillTab/Navigate";
import NotUpdatedEwayDataTitle from "../../../data/ewayBill/NotUpdatedEwayBillTitle";
import NotUpdatedEwayBillDataFormat from "../../../data/ewayBill/NotUpdatedEwayBillDataFormat";


const NotUpdatedDocketEway = () => {
  const dispatch = useDispatch();
  const is_updated = useSelector((state) => state.filtervalue.data_a);

  // // Pagination
  const data_len = useSelector((state) => state.pagination.data_length);
  const page_num = useSelector((state) => state.pagination.page_number);
  const search = useSelector((state) => state.searchbar.search_item);

  // // Permissions

  useEffect(() => {
    dispatch(setToggle(false));
  }, []);

  //Permission
  const userpermission = useSelector(
    (state) => state.authentication.userpermission
  );
  const [can_delete, setcan_delete] = useState(false);

  useEffect(() => {
    if (
      userpermission.some(
        (e) => e.sub_model === "eWaybill" && e.delete === true
      )
    ) {
      setcan_delete(true);
    } else {
      setcan_delete(false);
    }
  }, [userpermission]);
  
  return (
    <>
    <Navigate />
      <PageTitle page="Not Updated Eway Bill" />
      <Title title="Not Updated Eway Bill" parent_title="Eway Bill" />
      <div className="mx-3">
        <div className="container-fluid " style={{ background: "white" }}>
          <div className="mb-2 row">
            <div className="col-sm-4">
              <SearchList />
            </div>
            <div className="col-sm-8">
              <div
                className="text-sm-end"
                onClick={() => dispatch(setPageNumber(1))}
              >
{/*                
                  <Nav_Btn
                    btn_name="Add Part A"
                    icon={<MdAdd size={15} />}
                    form_path="/eway/add_parta"
                  /> */}
              
                {/* Filter Tool */}
                <Filter type={"notupdated_eway"} />
              </div>
            </div>
          
          </div>

          {/* DataTable */}
          <DataList
            can_delete={can_delete}
            Data_Title={NotUpdatedEwayDataTitle}
            Data_Format={NotUpdatedEwayBillDataFormat}
            path={`analytic/all_notupdated_eway_partb/?search=${search}&p=${page_num}&records=${data_len}&is_updated=${is_updated}`}
          />
          <NumPagination path={"path"} />
        </div>
      </div>
    </>
  );
};
export default NotUpdatedDocketEway;
