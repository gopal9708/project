import React, { useEffect, useState } from "react";
import LocationDataFormat from "../../../data/master/locations/LocationDataFormat";
import LocationDataTitle from "../../../data/master/locations/LocationDataTitle";
import DataList from "../../../components/listDisplay/dataList/DataList";
import PageTitle from "../../../components/pageTitle/PageTitle";
import Title from "../../../components/title/Title";
import NumPagination from "../../../components/listDisplay/numPagination/NumPagination";
import Filter from "../../../components/listDisplay/filter/Filter";
import { setToggle } from "../../../store/parentFilter/ParentFilter";
import { MdAdd } from "react-icons/md";
import Nav_Btn from "../../../components/btn/NavBtn";
import SearchList from "../../../components/listDisplay/searchList/SearchList";
import { setPageNumber } from "../../../store/pagination/Pagination";
import { useSelector, useDispatch } from "react-redux";
import LocationNavigate from "./locationTab/LocationNavigate";
import Navigate from "../navigateTab/Navigate";

const Locations = () => {
  const dispatch = useDispatch();
  const page_num = useSelector((state) => state.pagination.page_number);
  const data_len = useSelector((state) => state.pagination.data_length);
  const search = useSelector((state) => state.searchbar.search_item);
  const user = useSelector((state) => state.authentication.userdetails);
  const name = useSelector((state) => state.filtervalue.data_a);
  const state_name = useSelector((state) => state.filtervalue.data_b);
  const city_name = useSelector((state) => state.filtervalue.data_c);
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
      <PageTitle page="Locations" />
      <LocationNavigate />
      <Title title="Locations" parent_title="Masters" />
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
                {/* {user_permissions.includes('Can add locations') || is_superuser &&( */}
                {(can_add || user.is_superuser) && (
                  <Nav_Btn
                    btn_name="Add Location"
                    icon={<MdAdd size={20} />}
                    form_path="/master/locations/addlocation"
                  />
                )}
                {/* ) } */}

                <Filter type={"locations"} />
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
            Data_Title={LocationDataTitle}
            Data_Format={LocationDataFormat}
            path={`master/all_locality/?place_id=all&filter_by=all&search=${search}&p=${page_num}&records=${data_len}&state=${state_name}&city=${city_name}&name=${name}&data=&value=${cm_value}`}
          />
          <NumPagination path={"path"} />
        </div>
      </div>
    </>
  );
};

export default Locations;
