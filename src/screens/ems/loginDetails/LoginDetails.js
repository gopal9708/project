// import { DataList } from "../../../components/List_Display/DataList";
import React, { useEffect } from "react";
// import { MdAdd } from "react-icons/md";
// import Search_list from "../../../components/List_Display/Search_list";
// import Nav_Btn from "../../../components/btn/NavBtn";
// import Filter from "../../../components/List_Display/Filter";
// import Commodity_Data_Format from "../../../data/Masters/Commidity/Commodity_Data_format";
// import Commodity_title from "../../../data/Masters/Commidity/Commodity_Data_Title";
import { useSelector, useDispatch } from "react-redux";
// import Pagination from "../../../components/List_Display/Num_Pagination/Pagination";
// import { Toggle } from "../../../store/Filter/Parent_Filter/action";
import DataList from "../../../components/listDisplay/dataList/DataList";
import PageTitle from "../../../components/pageTitle/PageTitle";
import Title from "../../../components/title/Title";
import { setPageNumber } from "../../../store/pagination/Pagination";
import LoginDetailsDataTitle from "../../../data/ems/logindetails/LoginDetailsDataTitle";
import LoginDetailsDataFormat from "../../../data/ems/logindetails/LoginDetailsDataFormat";
import { setToggle } from "../../../store/parentFilter/ParentFilter";
import SearchList from "../../../components/listDisplay/searchList/SearchList";
import Filter from "../../../components/listDisplay/filter/Filter";
import NumPagination from "../../../components/listDisplay/numPagination/NumPagination";

const Commodities = () => {
  const dispatch = useDispatch();
  const toggle = useSelector((state) => state.parentfilter.toggle);
  const user_name = useSelector((state) => state.filtervalue.data_a);
  const platform = useSelector((state) => state.filtervalue.data_b);
  const is_mob = useSelector((state) => state.filtervalue.data_c);
  const data_len = useSelector((state) => state.pagination.data_length);
  const page_num = useSelector((state) => state.pagination.page_number);
  const search = useSelector((state) => state.searchbar.search_item);

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
      <PageTitle page="Login Details" />
      <Title title="Login Details" parent_title="Ems" />
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
                {/* {user_permissions.includes("Can add Commodity") || is_superuser && (
                  <Nav_Btn
                    btn_name="Add Commodity"
                    icon={<MdAdd size={15}/>}
                    form_path="/master/commodities/addcommodities"
                  />
                )} */}

                {/* Filter Tool */}
                <Filter type={"logindetails"} />
              </div>
            </div>
          </div>

          {/* DataTable */}
          <DataList
            Data_Title={LoginDetailsDataTitle}
            Data_Format={LoginDetailsDataFormat}
            path={
              toggle === false
                ? `ems/get_login_details/?search=${search}&p=${page_num}&records=${data_len}`
                : `ems/get_filtered_login_details/?platform=${platform}&user=${user_name}&is_mob=${is_mob}&p=${page_num}&records=${data_len}`
            }
          />
          <NumPagination path={"path"} />
        </div>
      </div>
    </>
  );
};
export default Commodities;
