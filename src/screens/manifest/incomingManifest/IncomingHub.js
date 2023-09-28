import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import DataList from "../../../components/listDisplay/dataList/DataList";
import PageTitle from "../../../components/pageTitle/PageTitle";
import Title from "../../../components/title/Title";
import { setPageNumber } from "../../../store/pagination/Pagination";
import { setToggle } from "../../../store/parentFilter/ParentFilter";
import SearchList from "../../../components/listDisplay/searchList/SearchList";
import NumPagination from "../../../components/listDisplay/numPagination/NumPagination";
import Navigate from "../navigateTab/Navigate";
import IncomingHubDataFormat from "../../../data/manifests/incomingHubManifest/IncomingHubDataFormat";
import IncomingHubTitle from "../../../data/manifests/incomingHubManifest/IncomingTittle";
import IncomingTab from "../navigateTab/IncomingTab";

const IncomingHub = () => {
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
          (e) => e.sub_model === "Raugh Manifest" && e.delete === true
        )
      ) {
        setcan_delete(true);
      } else {
        setcan_delete(false);
      }
    }, [userpermission]);
  return (
    <>
      <PageTitle page="IncomingHub" />
      <Navigate />
      <IncomingTab/>
      <Title title="IncomingHub(Vehicle)" parent_title="Manifest" />
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
                {/* <Filter type={"client"} /> */}
              </div>
            </div>
          </div>

          {/* DataTable */}
          <DataList
          can_delete={can_delete}
          Data_Title={IncomingHubTitle}
          Data_Format={IncomingHubDataFormat}
            path={`manifest/get_incoming_hub/?search=${search}&p=${page_num}&records=${data_len}`}
            checkbox={"NO"}
          />
          <NumPagination path={"path"} />
        </div>
      </div>
    </>
  );
};
export default IncomingHub;
