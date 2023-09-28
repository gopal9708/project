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
import { setFilterA } from "../../../store/filterValue/FilterValue";
import OrderOriginsDataTitle from "../../../data/master/orderOrigins/OrderOriginsDataTitle";
import OrderOriginsDataFormat from "../../../data/master/orderOrigins/OrderOriginsDataFormat";
import Navigate from "../navigateTab/Navigate";

const OrderOrigins = () => {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.searchbar.search_item);
  // Additional Fields
  const data_len = useSelector((state) => state.pagination.data_length);
  const page_num = useSelector((state) => state.pagination.page_number);
  const user = useSelector((state) => state.authentication.userdetails);
  const city_filter = useSelector((state) => state.filtervalue.data_a);
  const client_filter = useSelector((state) => state.filtervalue.data_b);
  const cm_value = useSelector((state) => state.datalist.cm_filter);


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
      userpermission.some(
        (e) => e.sub_model === "Shipper/Consignee" && e.write === true
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
        (e) => e.sub_model === "Shipper/Consignee" && e.delete === true
      )
    ) {
      setcan_delete(true);
    } else {
      setcan_delete(false);
    }
  }, [userpermission]);

  return (
    <>
      <PageTitle page="All Shipper/Consignee" />

      <Title title="All Shipper/Consignee" parent_title="Masters" />
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
                    btn_name="Add Shipper/Consignee"
                    icon={<MdAdd />}
                    form_path="/master/orderorigins/addorderorigin"
                  />
                )}
                <Filter type={"consignee_shipper"} />
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
            Data_Title={OrderOriginsDataTitle}
            Data_Format={OrderOriginsDataFormat}
            path={`master/all_shipperconsignee/?search=${search}&p=${page_num}&records=${data_len}&city=${city_filter}&client=${client_filter}&data=&value=${cm_value}`}
          />

          <NumPagination path={"path"} />
        </div>
      </div>
    </>
  );
};

export default OrderOrigins;
