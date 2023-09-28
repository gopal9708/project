import React from "react";
import { useSelector, useDispatch } from "react-redux";
import SearchList from "../../../../components/listDisplay/searchList/SearchList";
import PageTitle from "../../../../components/pageTitle/PageTitle";
import Title from "../../../../components/title/Title";
import DataList from "../../../../components/listDisplay/dataList/DataList";
import { setPageNumber } from "../../../../store/pagination/Pagination";
import NavBtn from "../../../../components/btn/NavBtn";
// import NAV_BTN from "../../../components/btn/NavBtn"; add this line warning is removed, Imported JSX component Nav_Btn must be in PascalCase or SCREAMING_SNAKE_CASE
import NumPagination from "../../../../components/listDisplay/numPagination/NumPagination";
import DepartmentsDataFormat from "../../../../data/organization/departments/DepartmentsDataFormat";
import DepartmentsDataTitle from "../../../../data/organization/departments/DepartmentsDataTitle"
const Users = () => {
  const data_len = useSelector((state) => state.pagination.data_length);
  const page_num = useSelector((state) => state.pagination.page_number);
  const search = useSelector((state) => state.searchbar.search_item);
  const dispatch = useDispatch();

  return (
    <>
      <PageTitle page="Depertments" />
      <Title title="Depertments" parent_title="Ems" />
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
                <NavBtn        //   <NAV_BTN,       Imported JSX component Nav_Btn must be in PascalCase or SCREAMING_SNAKE_CASE
                  btn_name="Add Department"
                  // icon={<MdAdd size={20}/>}
                  form_path="/organization/AddDepartment"
                />
                {/* Filter Tool */}
                {/* <Filter type={""} /> */}
              </div>
            </div>
          </div>
          {/* DataTable */}
          <DataList
            Data_Title={DepartmentsDataTitle}
            Data_Format={DepartmentsDataFormat}
            path={`organization/get_department/?search=${search}&p=${page_num}&records=${data_len}&name=${[
              "",
            ]}`}
          />
          <NumPagination path={"path"} />
        </div>
      </div>
    </>
  );
};

export default Users;
