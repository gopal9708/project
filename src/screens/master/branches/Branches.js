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
import BranchesDataTitle from "../../../data/master/branches/BranchDataTitle";
import BranchDataFormat from "../../../data/master/branches/BranchDataFormat";
import Navigate from "../navigateTab/Navigate";

const Branches = () => {
  const dispatch = useDispatch();
  const branchname = useSelector((state) => state.filtervalue.data_a);
  const vendorid = useSelector((state) => state.filtervalue.data_b);
  const branch_cityid = useSelector((state) => state.filtervalue.data_c);
  const branchtype = useSelector((state) => state.filtervalue.data_d);
  const organization = useSelector((state) => state.filtervalue.data_e);
  const data_len = useSelector((state) => state.pagination.data_length);
  const page_num = useSelector((state) => state.pagination.page_number);
  const search = useSelector((state) => state.searchbar.search_item);
  const user = useSelector((state) => state.authentication.userdetails);
  const cm_value = useSelector((state) => state.datalist.cm_filter);

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

  //Permission
  const userpermission = useSelector(
    (state) => state.authentication.userpermission
  );
  const [can_add, setcan_add] = useState(false);
  const [can_delete, setcan_delete] = useState(false);

  useEffect(() => {
    if (
      userpermission.some((e) => e.sub_model === "Branch" && e.write === true)
    ) {
      setcan_add(true);
    } else {
      setcan_add(false);
    }
  }, [userpermission]);

  useEffect(() => {
    if (
      userpermission.some((e) => e.sub_model === "Branch" && e.delete === true)
    ) {
      setcan_delete(true);
    } else {
      setcan_delete(false);
    }
  }, [userpermission]);

  return (
    <>
      <PageTitle page="Branches" />
      <Title title="Branches" parent_title="Masters" />
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
                    btn_name="Add Branch"
                    icon={<MdAdd size={15} />}
                    form_path="/master/branches/addbranch"
                  />
                )}
                {/* Filter */}
                <Filter type={"branches"} />
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
            Data_Title={BranchesDataTitle}
            Data_Format={BranchDataFormat}
            path={
              `master/all-branches/?search=${search}&p=${page_num}&records=${data_len}&branch_name=${[
                branchname,
              ]}&branch_city=${[branch_cityid]}&vendor=${[vendorid]}&branch_type=${branchtype}&organization=${organization}&data=&value=${cm_value}`
              // &branch_name=${branch_name}&branch_city=${branch_city_id}
            }
          />
          <NumPagination path={"path"} />
        </div>
      </div>
    </>
  );
};
export default Branches;
