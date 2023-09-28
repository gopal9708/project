import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { MdAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import DataList from "../../../components/listDisplay/dataList/DataList";
import NumPagination from "../../../components/listDisplay/numPagination/NumPagination";
import SearchList from "../../../components/listDisplay/searchList/SearchList";
import PageTitle from "../../../components/pageTitle/PageTitle";
import Title from "../../../components/title/Title";
import Nav_Btn from "../../../components/btn/NavBtn";
import DesignationDataFormat from "../../../data/organization/designation/DesignationDataFormat";
import DesignationDataTitle from "../../../data/organization/designation/DesignationDataTitle"
import { setToggle } from "../../../store/parentFilter/ParentFilter";

function Designation() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authentication.userdetails);

  // // Pagination
  const data_len = useSelector((state) => state.pagination.data_length);
  const page_num = useSelector((state) => state.pagination.page_number);
  const search = useSelector((state) => state.searchbar.search_item);

  useEffect(() => {
    dispatch(setToggle(false));
  }, []);

  const [can_add, setcan_add] = useState(false);
  const [can_delete, setcan_delete] = useState(false);

  return (
    <>
      <PageTitle page="Designation" />
      <Title title="Designation" parent_title="Ems" />
      <div className="mx-3">
        <div className="container-fluid " style={{ background: "white" }}>
          <div className="row ">
            <div className="col-sm-4">
              <SearchList />
            </div>
            <div className="col-sm-8">
              <div
                className="text-sm-end"
                onClick={
                  () => {}
                  // dispatch(setPageNumber(1))
                }
              >
                {/* {user_permissions.includes("Can add Commodity") || is_superuser && ( */}
                {/* {(user_role === "MAKER" ||
                  user_role === "CHECKER+MAKER" ||
                  is_superuser) && ( */}
                {(can_add || user.is_superuser) && (
                  <Nav_Btn
                    btn_name="Add Designation"
                    icon={<MdAdd size={15} />}
                    form_path="/ems/designation/adddesignation"
                  />
                )}
              </div>
            </div>
          </div>

          {/* DataTable */}
          <DataList
            can_delete={can_delete}
            Data_Title={DesignationDataTitle}
            Data_Format={DesignationDataFormat}
            path={`master/get_designations/?search=${search}&p=${page_num}&records=${data_len}`}
          />
          <NumPagination path={"path"} />
        </div>
      </div>
    </>
  );
}

export default Designation;
