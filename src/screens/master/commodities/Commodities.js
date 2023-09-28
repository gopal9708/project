import React, { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import Nav_Btn from "../../../components/btn/NavBtn";
import { useSelector, useDispatch } from "react-redux";
import DataList from "../../../components/listDisplay/dataList/DataList";
import PageTitle from "../../../components/pageTitle/PageTitle";
import Title from "../../../components/title/Title";
import { setPageNumber } from "../../../store/pagination/Pagination";
import CommoditiesDataTitle from "../../../data/master/commodities/CommoditiesDataTitle";
import CommoditiesDataFormat from "../../../data/master/commodities/CommoditiesDataFormat";
import { setToggle } from "../../../store/parentFilter/ParentFilter";
import SearchList from "../../../components/listDisplay/searchList/SearchList";
import Filter from "../../../components/listDisplay/filter/Filter";
import NumPagination from "../../../components/listDisplay/numPagination/NumPagination";
import Navigate from "../navigateTab/Navigate";

const Commodities = () => {
  const dispatch = useDispatch();
  const commodity_type = useSelector((state) => state.filtervalue.data_a);
  const commodity_name = useSelector((state) => state.filtervalue.data_b);

  const user = useSelector((state) => state.authentication.userdetails);
  const cm_value = useSelector((state) => state.datalist.cm_filter);

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
  const [can_add, setcan_add] = useState(false);
  const [can_delete, setcan_delete] = useState(false);

  useEffect(() => {
    if (
      userpermission.some(
        (e) => e.sub_model === "Commodity" && e.write === true
      )
    ) {
      setcan_add(true);
    } else {
      setcan_add(false);
    }
  }, [userpermission]);

  useEffect(() => {
    if (
      userpermission.some(
        (e) => e.sub_model === "Commodity" && e.delete === true
      )
    ) {
      setcan_delete(true);
    } else {
      setcan_delete(false);
    }
  }, [userpermission]);

  // console.log("user.user_department_name----", user.user_department_name)
  return (
    <>
      <PageTitle page="Commodities" />
      <Title title="Commodities" parent_title="Masters" />
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
                {(can_add || user.is_superuser) && (
                  <Nav_Btn
                    btn_name="Add Commodity"
                    icon={<MdAdd size={15} />}
                    form_path="/master/commodities/addcommodity"
                  />
                )}
                {/* Filter Tool */}
                <Filter type={"commodity"} />
              </div>
            </div>
            {(user.user_department_name === "ADMIN" || user.user_department_name === "ACCOUNTANT" ||  user.user_department_name+" "+ user.designation_name === "ACCOUNT MANAGER") &&
            (
            <Navigate />
            )
                }
          </div>

          {/* DataTable */}
          <DataList
            can_delete={can_delete}
            Data_Title={CommoditiesDataTitle}
            Data_Format={CommoditiesDataFormat}
            path={`master/all_commodities/?search=${search}&p=${page_num}&records=${data_len}&commodity_type=${commodity_type}&commodity_name=${commodity_name}&data=&value=${cm_value}`}
          />
          <NumPagination path={"path"} />
        </div>
      </div>
    </>
  );
};
export default Commodities;
