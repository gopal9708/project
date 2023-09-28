import React, { useEffect } from "react";
import { MdAdd } from "react-icons/md";
import NavBtn from "../../../components/btn/NavBtn";
import { useSelector, useDispatch } from "react-redux";
import DataList from "../../../components/listDisplay/dataList/DataList";
import PageTitle from "../../../components/pageTitle/PageTitle";
import Title from "../../../components/title/Title";
import { setPageNumber } from "../../../store/pagination/Pagination";
import { setToggle } from "../../../store/parentFilter/ParentFilter";
import SearchList from "../../../components/listDisplay/searchList/SearchList";
import Filter from "../../../components/listDisplay/filter/Filter";
import NumPagination from "../../../components/listDisplay/numPagination/NumPagination";
import EngineDataTitle from "../../../data/vms/engine/EngineDataTitle";
import EngineDataFormat from "../../../data/vms/engine/EngineDataFormat";

const VehicleEngine = () => {
  const dispatch = useDispatch();

  // State for pagination
  const data_len = useSelector((state) => state.pagination.data_length);
  const page_num = useSelector((state) => state.pagination.page_number);
  const search = useSelector((state) => state.searchbar.search_item);

  useEffect(() => {
    dispatch(setToggle(false));
  }, []);

  return (
    <>
      <PageTitle page="Engine" />
      <Title title="Vehicle Engine" parent_title="VMS" />
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
                <NavBtn
                  btn_name="Add Vehicle Engine"
                  icon={<MdAdd size={15} />}
                  form_path="/vehicleEngine/AddVehicleEngine"
                />

                {/* Filter Tool */}
                <Filter type={"client"} />
              </div>
            </div>
          </div>

          {/* DataTable */}
          <DataList
            Data_Title={EngineDataTitle}
            Data_Format={EngineDataFormat}
            path={`vms/get_vehicleengine/?search=${search}&p=${page_num}&records=${data_len}`}
          />
          <NumPagination path={"client"} />
        </div>
      </div>
    </>
  );
};

export default VehicleEngine;
