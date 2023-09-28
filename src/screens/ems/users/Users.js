import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SearchList from "../../../components/listDisplay/searchList/SearchList";
import PageTitle from "../../../components/pageTitle/PageTitle";
import Title from "../../../components/title/Title";
import DataList from "../../../components/listDisplay/dataList/DataList";
import UsersDataTitle from "../../../data/ems/Users/UsersDataTitle";
import UsersDataFormat from "../../../data/ems/Users/UsersDataFormat";
import { setPageNumber } from "../../../store/pagination/Pagination";
import Filter from "../../../components/listDisplay/filter/Filter";
import { MdAdd } from "react-icons/md";
import Nav_Btn from "../../../components/btn/NavBtn";
import NumPagination from "../../../components/listDisplay/numPagination/NumPagination";
import { setToggle } from "../../../store/parentFilter/ParentFilter";

const Users = () => {
  const data_len = useSelector((state) => state.pagination.data_length);
  const page_num = useSelector((state) => state.pagination.page_number);
  const home_branch = useSelector((state) => state.filtervalue.data_a);
  const usertype = useSelector((state) => state.filtervalue.data_b);
  const accesstype = useSelector((state) => state.filtervalue.data_c);
  const department = useSelector((state) => state.filtervalue.data_d);
  const is_active = useSelector((state) => state.filtervalue.data_e);
  const search = useSelector((state) => state.searchbar.search_item);
  const user = useSelector((state) => state.authentication.userdetails);

  const dispatch = useDispatch();

  //Permission
  const userpermission = useSelector(
    (state) => state.authentication.userpermission
  );
  const [can_add, setcan_add] = useState(false);
  const [can_delete, setcan_delete] = useState(false);

  useEffect(() => {
    if (
      userpermission.some((e) => e.sub_model === "Users" && e.write === true)
    ) {
      setcan_add(true);
    } else {
      setcan_add(false);
    }
  }, [userpermission]);

  useEffect(() => {
    if (
      userpermission.some((e) => e.sub_model === "Users" && e.delete === true)
    ) {
      setcan_delete(true);
    } else {
      setcan_delete(false);
    }
  }, [userpermission]);

  useEffect(() => {
    dispatch(setToggle(false));
  }, []);

  return (
    <>
      <PageTitle page="Users" />
      <Title title="Users" parent_title="Ems" />
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
                <Nav_Btn
                  btn_name="Invite User"
                  form_path="/ems/users/InviteUsers"
                />
                {(can_add || user.is_superuser) && (
                  <Nav_Btn
                    btn_name="Add User"
                    icon={<MdAdd size={20} />}
                    form_path="/ems/users/userinfo"
                  />
                )}
                {/* Filter Tool */}
                <Filter type={"Users"} />
              </div>
            </div>
          </div>
          {/* DataTable */}
          <DataList
            can_delete={can_delete}
            Data_Title={UsersDataTitle}
            Data_Format={UsersDataFormat}
            path={`ems/all-users/?search=${search}&p=${page_num}&records=${data_len}&home_branch=${home_branch}&access_type=${accesstype}&user_type=${usertype}&is_active=${is_active}&department=${department}`}
          />
          <NumPagination path={"path"} />
        </div>
      </div>
    </>
  );
};

export default Users;
