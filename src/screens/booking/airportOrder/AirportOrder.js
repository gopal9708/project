import React, { useEffect } from "react";
import { MdAdd } from "react-icons/md";
import NavBtn from "../../../components/btn/NavBtn";
import { useDispatch } from "react-redux";
import DataList from "../../../components/listDisplay/dataList/DataList";
import PageTitle from "../../../components/pageTitle/PageTitle";
import Title from "../../../components/title/Title";
import { setPageNumber } from "../../../store/pagination/Pagination";
import { setToggle } from "../../../store/parentFilter/ParentFilter";
import SearchList from "../../../components/listDisplay/searchList/SearchList";
import Filter from "../../../components/listDisplay/filter/Filter";
import NumPagination from "../../../components/listDisplay/numPagination/NumPagination";
// import { useLocation } from "react-router-dom";
import AirportOrderDataFormat from "../../../data/booking/airportToAirport/AirportOrderDataFormat";
import AirportOrderDataTitle from "../../../data/booking/airportToAirport/AirportOrderDataTitle";

const AirportOrder = () => {
  // const location = useLocation();
  const dispatch = useDispatch();
  // const toggle = useSelector((state) => state.parentfilter.toggle);
  // const delivery_type = useSelector((state) => state.filtervalue.data_a);
  // const cold_chain_btn = useSelector((state) => state.filtervalue.data_b);
  // const transportation_mode = useSelector((state) => state.filtervalue.data_c);
  // const current_status = useSelector((state) => state.filtervalue.data_d);
  // const iscompleted = useSelector((state) => state.filtervalue.data_i);
  // const current_branch = useSelector((state) => state.filtervalue.data_f);
  // const created_by_id = useSelector((state) => state.filtervalue.data_e);

  // const data_len = useSelector((state) => state.pagination.data_length);
  // const page_num = useSelector((state) => state.pagination.page_number);
  // const search = useSelector((state) => state.searchbar.search_item);

  // // Permissions
  // const user_permissions = useSelector(
  //   (state) => state.permissions.user_permissions
  // );

  // let is_superuser = useSelector(
  //   (state) => state.authentication.userdetails.is_superuser
  // );

  useEffect(() => {
    dispatch(setToggle(false));
  }, []);

  return (
    <>
      <PageTitle page="Airport To Airport Order" />
      <Title title="Airport To Aiport Order" parent_title="Bookings" />
      <div className="mx-3">
        <div
          className="container-fluid"
          style={{ background: "white", width: "" }}
        >
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
                  btn_name="Add A2A Order"
                  icon={<MdAdd size={15} />}
                  form_path="/booking/airportorder/addairportorder"
                />

                {/* Filter */}
                <Filter type={"booking"} />
              </div>
            </div>
          </div>

          {/* DataTable */}
          <DataList
            Data_Title={AirportOrderDataTitle}
            Data_Format={AirportOrderDataFormat}
            // path={`booking/get_airport_order/?search=${search}&p=${page_num}&records=${data_len}&delivery_type=${delivery_type}&cold_chain_order=${cold_chain_btn}&transportation_mode=${transportation_mode}&created_by=${created_by_id}&current_branch=${current_branch}&current_status=${current_status}&iscompleted=${iscompleted}`}
            // `bookings/api/get_orderfilter_data/?delivery_type=${delivery_type}&cold_chain_order=${cold_chain_btn}&transportation_mode=${transportation_mode}&current_status=${current_status}&created_by=${created_by_id}&current_branch=${current_branch}&order_origin=${order_origin_id}&order_destination=${order_destination_id}&iscompleted=${iscompleted}&p=${page_num}&records=${data_len}`
          />
          <NumPagination path={"path"} />
        </div>
      </div>
    </>
  );
};
export default AirportOrder;
