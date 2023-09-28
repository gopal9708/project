import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import DataList from "../../../components/listDisplay/dataList/DataList";
import PageTitle from "../../../components/pageTitle/PageTitle";
import Title from "../../../components/title/Title";
import { setPageNumber } from "../../../store/pagination/Pagination";
import { setToggle } from "../../../store/parentFilter/ParentFilter";
import SearchList from "../../../components/listDisplay/searchList/SearchList";
import NumPagination from "../../../components/listDisplay/numPagination/NumPagination";
import PendingHubTitle from "../../../data/manifests/pendingForHub/PendingForHubTitle";
import PendingHubDataFormat from "../../../data/manifests/pendingForHub/PendingForHub";
import Navigate from "../navigateTab/Navigate";
import DepartTab from "../navigateTab/DepartTab";

const PendingDepartVehicle = () => {

  const dispatch = useDispatch();
  // // Additional Fields
  const data_len = useSelector((state) => state.pagination.data_length);
  const page_num = useSelector((state) => state.pagination.page_number);
  const search = useSelector((state) => state.searchbar.search_item);

  useEffect(() => {
    dispatch(setToggle(false));
  }, []);
  //Permission
  const userpermission = useSelector(
    (state) => state.authentication.userpermission
  );
  const [can_delete, setcan_delete] = useState(false);

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
  return (
    <>
      <PageTitle page="Pending For Depart" />
      <Navigate />
      <DepartTab />
      <Title title="Pending For Depart Hub" parent_title="Manifests" />
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
              ></div>
            </div>
          </div>

          <DataList
            can_delete={can_delete}
            Data_Title={PendingHubTitle}
            Data_Format={PendingHubDataFormat}
            path={`manifest/get_depart_hub/?search=${search}&p=${page_num}&records=${data_len}`}
            checkbox={"NO"}
          />
          <NumPagination path={"path"} />
        </div>
      </div>
    </>
  );
};
export default PendingDepartVehicle;
