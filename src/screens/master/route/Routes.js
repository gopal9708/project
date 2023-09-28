import React, { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import Nav_Btn from "../../../components/btn/NavBtn";
import { useSelector, useDispatch } from "react-redux";
import DataList from "../../../components/listDisplay/dataList/DataList";
import PageTitle from "../../../components/pageTitle/PageTitle";
import Title from "../../../components/title/Title";
import { setPageNumber } from "../../../store/pagination/Pagination";
import { setToggle } from "../../../store/parentFilter/ParentFilter";
import SearchList from "../../../components/listDisplay/searchList/SearchList";
import Filter from "../../../components/listDisplay/filter/Filter";
import NumPagination from "../../../components/listDisplay/numPagination/NumPagination";
import RouteDataTitle from "../../../data/master/route/RouteDataTitle";
import RouteDataFormat from "../../../data/master/route/RouteDataFormat";
import Navigate from "../navigateTab/Navigate";

const Routes = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authentication.userdetails);
  const name = useSelector((state) => state.filtervalue.data_a);
  const data_len = useSelector((state) => state.pagination.data_length);
  const page_num = useSelector((state) => state.pagination.page_number);
  const search = useSelector((state) => state.searchbar.search_item);
  const cm_value = useSelector((state) => state.datalist.cm_filter);

  let is_superuser = useSelector(
    (state) => state.authentication.userdetails.is_superuser
  );

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
      userpermission.some((e) => e.sub_model === "Routes" && e.write === true)
    ) {
      setcan_add(true);
    } else {
      setcan_add(false);
    }
  }, [userpermission]);

  useEffect(() => {
    if (
      userpermission.some((e) => e.sub_model === "Routes" && e.delete === true)
    ) {
      setcan_delete(true);
    } else {
      setcan_delete(false);
    }
  }, [userpermission]);

  return (
    <>
      <PageTitle page="Routes" />
      <Title title="Routes" parent_title="Masters" />
      <div className="mx-3">
        <div className="container-fluid" style={{ background: "white" }}>
          <div className="mb-2 row ">
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
                    btn_name="Add Routes"
                    icon={<MdAdd size={15} />}
                    form_path="/master/routes/addroute"
                  />
                )}
                {/* Filter */}
                <Filter type={"route"} />
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
            Data_Title={RouteDataTitle}
            Data_Format={RouteDataFormat}
            path={`master/get_routes/?search=${search}&p=${page_num}&records=${data_len}&name=${name}&data=&value=${cm_value}`}
          />
          <NumPagination path={"path"} />
        </div>
      </div>
    </>
  );
};
export default Routes;
