import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataList from "../../../components/listDisplay/dataList/DataList";
import Title from "../../../components/title/Title";
import SearchList from "../../../components/listDisplay/searchList/SearchList";
import PageTitle from "../../../components/pageTitle/PageTitle";
import NumPagination from "../../../components/listDisplay/numPagination/NumPagination";
import { setPageNumber } from "../../../store/pagination/Pagination";
import PincodeDataTitle from "../../../data/master/locations/PincodeDataTitle";
import PincodeDataFormat from "../../../data/master/locations/PincodeDataFormat ";
import LocationNavigate from "./locationTab/LocationNavigate";

const Pincode = () => {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.searchbar.search_item);

  // Additional Fields
  const data_len = useSelector((state) => state.pagination.data_length);
  const page_num = useSelector((state) => state.pagination.page_number);

  //Permission
  const userpermission = useSelector(
    (state) => state.authentication.userpermission
  );
  const [can_add, setcan_add] = useState(false);
  const [can_delete, setcan_delete] = useState(false);

  useEffect(() => {
    if (
      userpermission.some(
        (e) => e.sub_model === "Locations" && e.write === true
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
        (e) => e.sub_model === "Locations" && e.delete === true
      )
    ) {
      setcan_delete(true);
    } else {
      setcan_delete(false);
    }
  }, [userpermission]);

  return (
    <>
      <PageTitle page="All Pincode" />
      <LocationNavigate />
      <Title title="All Pincode" parent_title="Masters" />
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
                {/* {(can_add || user.is_superuser) && (
                  <NavBtn
                    btn_name="Add Charge"
                    icon={<MdAdd />}
                    form_path="/master/charges/addcharge"
                  />
                )} */}
              </div>
            </div>
            {/* {(user.user_department_name === "ADMIN" || user.user_department_name === "ACCOUNTANT" ||  user.user_department_name+" "+ user.designation_name === "ACCOUNT MANAGER") &&
            (
            <Navigate />
            )
                } */}
          </div>

          <DataList
            can_delete={can_delete}
            Data_Title={PincodeDataTitle}
            Data_Format={PincodeDataFormat}
            path={`master/all_pincode/?search=${search}&p=${page_num}&records=${data_len}&city_search=${""}&place_id=all&filter_by=all`}
          />
          <NumPagination path={"path"} />
        </div>
      </div>
    </>
  );
};

export default Pincode;
