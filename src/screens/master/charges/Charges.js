import React, { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import DataList from "../../../components/listDisplay/dataList/DataList";
import Title from "../../../components/title/Title";
import SearchList from "../../../components/listDisplay/searchList/SearchList";
import NavBtn from "../../../components/btn/NavBtn";
import Filter from "../../../components/listDisplay/filter/Filter";
import PageTitle from "../../../components/pageTitle/PageTitle";
import NumPagination from "../../../components/listDisplay/numPagination/NumPagination";
import { setPageNumber } from "../../../store/pagination/Pagination";
import ChargesDataFormat from "../../../data/master/charges/ChargesDataFormat";
import ChargesDataTitle from "../../../data/master/charges/ChargesDataTitle";
import { setFilterA } from "../../../store/filterValue/FilterValue";
import Navigate from "../navigateTab/Navigate";

const Charges = () => {
  const dispatch = useDispatch();
  const primary_charges = useSelector((state) => state.filtervalue.data_a);
  const search = useSelector((state) => state.searchbar.search_item);
  const user = useSelector((state) => state.authentication.userdetails);
  const cm_value = useSelector((state) => state.datalist.cm_filter);

  // Additional Fields
  const data_len = useSelector((state) => state.pagination.data_length);
  const page_num = useSelector((state) => state.pagination.page_number);

  useEffect(() => {
    dispatch(setFilterA([]));
  }, []);

  //Permission
  const userpermission = useSelector(
    (state) => state.authentication.userpermission
  );
  const [can_add, setcan_add] = useState(false);
  const [can_delete, setcan_delete] = useState(false);

  useEffect(() => {
    if (
      userpermission.some((e) => e.sub_model === "Charges" && e.write === true)
    ) {
      setcan_add(true);
    } else {
      setcan_add(false);
    }
  }, [userpermission]);

  useEffect(() => {
    if (
      userpermission.some((e) => e.sub_model === "Charges" && e.delete === true)
    ) {
      setcan_delete(true);
    } else {
      setcan_delete(false);
    }
  }, [userpermission]);

  return (
    <>
      <PageTitle page="All Charges" />
      <Title title="All Charges" parent_title="Masters" />
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
                  <NavBtn
                    btn_name="Add Charge"
                    icon={<MdAdd />}
                    form_path="/master/charges/addcharge"
                  />
                )}
                <Filter type={"charges"} />
              </div>
            </div>
            {(user.user_department_name === "ADMIN" || user.user_department_name === "ACCOUNTANT" ||  user.user_department_name+" "+ user.designation_name === "ACCOUNT MANAGER") &&
            (
            <Navigate />
            )
                }
          </div>

          <DataList
            can_delete={can_delete}
            Data_Title={ChargesDataTitle}
            Data_Format={ChargesDataFormat}
            path={`master/all_charges/?search=${search}&p=${page_num}&records=${data_len}&charge_category=${primary_charges}&data=&value=${cm_value}`}
          />
          <NumPagination path={"path"} />
        </div>
      </div>
    </>
  );
};

export default Charges;
