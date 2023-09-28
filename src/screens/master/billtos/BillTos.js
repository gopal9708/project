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
import BillTosDataFormat from "../../../data/master/clients/BillTosDataFormat";
import BillTosDataTitles from "../../../data/master/clients/BillTosDataTitles";
import Navigate from "../navigateTab/Navigate";

const Clients = () => {
  const dispatch = useDispatch();
  const data_len = useSelector((state) => state.pagination.data_length);
  const page_num = useSelector((state) => state.pagination.page_number);
  const search = useSelector((state) => state.searchbar.search_item);
  const user = useSelector((state) => state.authentication.userdetails);
  const cm_value = useSelector((state) => state.datalist.cm_filter);
  const panno = useSelector((state) => state.filtervalue.data_a);
  const name_search = useSelector((state) => state.filtervalue.data_b);
  const state_name = useSelector((state) => state.filtervalue.data_c);


  
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
      userpermission.some((e) => e.sub_model === "Bill To" && e.write === true)
    ) {
      setcan_add(true);
    } else {
      setcan_add(false);
    }
  }, [userpermission]);

  useEffect(() => {
    if (
      userpermission.some((e) => e.sub_model === "Bill To" && e.delete === true)
    ) {
      setcan_delete(true);
    } else {
      setcan_delete(false);
    }
  }, [userpermission]);

  return (
    <>
      <PageTitle page="Bill To" />
      <Title title="Bill To" parent_title="Masters" />
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
                {(can_add || user.is_superuser) && (
                  <Nav_Btn
                    btn_name="Add Bill To"
                    icon={<MdAdd size={15} />}
                    form_path="/master/billtos/addbillto"
                  />
                )}
                {/* Filter Tool */}
                <Filter type={"client"} />
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
            Data_Title={BillTosDataTitles}
            Data_Format={BillTosDataFormat}
            path={`master/all_billtoes/?search=${search}&p=${page_num}&records=${data_len}&pan_no=${panno}&name=${name_search}&state=${state_name}&data=&value=${cm_value}`}
          />
          <NumPagination path={"client"} />
        </div>
      </div>
    </>
  );
};
export default Clients;
