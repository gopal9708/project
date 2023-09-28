/* eslint-disable */
import React,{useState,useEffect} from "react";
import RunsheetDataTitle from "../../data/runsheets/allRunsheet/RunsheetDataTitle";
import RunsheetDataFormat from "../../data/runsheets/allRunsheet/RunsheetDataFormat";
import DataList from "../../components/listDisplay/dataList/DataList";
import PageTitle from "../../components/pageTitle/PageTitle";
import Title from "../../components/title/Title";
import SearchList from "../../components/listDisplay/searchList/SearchList";
import Filter from "../../components/listDisplay/filter/Filter";
import NumPagination from "../../components/listDisplay/numPagination/NumPagination";
import { useSelector } from "react-redux";
import Navigate from "./runsheetTab/Navigate";
import OperationNavigate from "../booking/navigateTab/OperationNavigate";

const AllRunsheet = () => {
  const data_len = useSelector((state) => state.pagination.data_length);
  const page_num = useSelector((state) => state.pagination.page_number);
  const search = useSelector((state) => state.searchbar.search_item);
  const route = useSelector((state) => state.filtervalue.data_a);
  const driver = useSelector((state) => state.filtervalue.data_b);
  const user = useSelector((state) => state.authentication.userdetails);
  const cm_value = useSelector((state) => state.datalist.cm_filter);

  //Permission
  const userpermission = useSelector(
    (state) => state.authentication.userpermission
  );
  const [can_delete, setcan_delete] = useState(false);

  useEffect(() => {
    if (
      userpermission.some(
        (e) => e.sub_model === "All Runsheet" && e.delete === true
      )
    ) {
      setcan_delete(true);
    } else {
      setcan_delete(false);
    }
  }, [userpermission]);

  return (
    <>
      {/* Page_Title */}
      <PageTitle page="Runsheets" />
      <Navigate />
      <Title title="All Runsheets" parent_title="Runsheets" />
      <div className="mx-3">
        <div className="container-fluid " style={{ background: "white" }}>
          <div className="mb-2 row ">
            <div className="col-sm-4">
              <SearchList />
            </div>
            <div className="col-sm-8">
              <div className="text-sm-end">
                <Filter type={"runsheet"} />
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
            Data_Title={RunsheetDataTitle}
            Data_Format={RunsheetDataFormat}
            // path={toggle == false ? `manifestation/api/all-runsheets/?&search=${search}&p=${page_num}&records=${data_len}` : `manifestation/api/get_runsheetfilter_data/?route=${route}&vehicle_no=${vehicle_no}&p=${page_num}&records=${data_len}`}
            path={`runsheet/get_runsheet/?&search=${search}&p=${page_num}&records=${data_len}&route=${route}&driver=${driver}&value=${cm_value}`}
          />
          <NumPagination path={"path"} />
        </div>
      </div>
    </>
  );
};

export default AllRunsheet;
