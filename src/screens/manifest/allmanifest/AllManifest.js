import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import DataList from "../../../components/listDisplay/dataList/DataList";
import PageTitle from "../../../components/pageTitle/PageTitle";
import Title from "../../../components/title/Title";
import { setPageNumber } from "../../../store/pagination/Pagination";
import { setToggle } from "../../../store/parentFilter/ParentFilter";
import SearchList from "../../../components/listDisplay/searchList/SearchList";
import Filter from "../../../components/listDisplay/filter/Filter";
import NumPagination from "../../../components/listDisplay/numPagination/NumPagination";
import Navigate from "../navigateTab/Navigate";
import AllManifestTitle from "../../../data/manifests/allManifest/AllManifestTitle";
import AllManifestDataFormat from "../../../data/manifests/allManifest/AllManifestDataFormat";
import OperationNavigate from "../../booking/navigateTab/OperationNavigate";

const AllManifest = () => {
  const dispatch = useDispatch();

  // // Additional Fields
  const data_len = useSelector((state) => state.pagination.data_length);
  const page_num = useSelector((state) => state.pagination.page_number);
  const search = useSelector((state) => state.searchbar.search_item);
  const user = useSelector((state) => state.authentication.userdetails);
  const cm_value = useSelector((state) => state.datalist.cm_filter);

  const originbranch = useSelector((state) => state.filtervalue.data_b);
  const destinationbranch = useSelector((state) => state.filtervalue.data_c);
  const origincity  = useSelector((state) => state.filtervalue.data_d);
  const destinationcity = useSelector((state) => state.filtervalue.data_e);
  const weight = useSelector((state) => state.filtervalue.data_a);

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
  const [can_delete, setcan_delete] = useState(false);
  useEffect(() => {
    if (
      userpermission.some(
        (e) => e.sub_model === "All Manifest" && e.delete === true
      )
    ) {
      setcan_delete(true);
    } else {
      setcan_delete(false);
    }
  }, [userpermission]);
  return (
    <>
      <PageTitle page="All Manifest" />
      <Navigate />
      <Title title="All Manifest" parent_title="Manifest" />
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
                {/* Filter Tool */}
                <Filter type={"manifest"} />
              </div>
            </div>
            {(!user.is_superuser) &&
            (
            <OperationNavigate />
            )
                }
          </div>

          {/* DataTable */}
          <DataList
            can_delete={can_delete}
            Data_Title={AllManifestTitle}
            Data_Format={AllManifestDataFormat}
            path={`manifest/all_manifest/?search=${search}&p=${page_num}&records=${data_len}&origin_branch=${originbranch}&destination_branch=${destinationbranch}&origin_city=${origincity}&destination_city=${destinationcity}&weight=${weight}&value=${cm_value}`}
            checkbox={"NO"}
          />
          <NumPagination path={"path"} />
        </div>
      </div>
    </>
  );
};
export default AllManifest;
