import React, { useEffect, useState } from "react";
// import { MdAdd } from "react-icons/md";
// import Nav_Btn from "../../../components/btn/NavBtn";
import { useSelector, useDispatch } from "react-redux";
import DataList from "../../../components/listDisplay/dataList/DataList";
import PageTitle from "../../../components/pageTitle/PageTitle";
import Title from "../../../components/title/Title";
import { setPageNumber } from "../../../store/pagination/Pagination";
import { setToggle } from "../../../store/parentFilter/ParentFilter";
import SearchList from "../../../components/listDisplay/searchList/SearchList";
import Filter from "../../../components/listDisplay/filter/Filter";
import NumPagination from "../../../components/listDisplay/numPagination/NumPagination";
// import OnBordingDataTitle from "../../../data/hr/onboarding/OnBordingDataTitle";
// import OnBoardingDataFormate from "../../../data/hr/onboarding/OnBoardingDataFormate";
import EmployeeDataTitle from "../../../data/hr/employees/EmployeeDataTitle";
import EmployeeDataFormate from "../../../data/hr/employees/EmployeeDataFormate";

const Employee = () => {
  const dispatch = useDispatch();
  // const toggle = useSelector((state) => state.parentfilter.toggle);
  // const branch_name = useSelector((state) => state.filtervalue.data_a);
  // const branch_company_id = useSelector((state) => state.filtervalue.data_b);
  // const branch_city_id = useSelector((state) => state.filtervalue.data_c);

  const data_len = useSelector((state) => state.pagination.data_length);
  const page_num = useSelector((state) => state.pagination.page_number);
  const search = useSelector((state) => state.searchbar.search_item);

  // // Permissions
  const userpermission = useSelector((state) => state.authentication.userpermission);
  // const user = useSelector((state) => state.authentication.userdetails);

  // const [can_add, setcan_add] = useState(false);
  const [can_delete, setcan_delete] = useState(false);  

  useEffect(() => {  
    if (
      userpermission.some((e) => e.sub_model === "Employees" && e.delete === true)
    ) {
      setcan_delete(true);
    } else {
      setcan_delete(false);
    }
  }, [userpermission])

  useEffect(() => {
    dispatch(setToggle(false));
  });

  return (
    <>
      <PageTitle page="Employees" />
      <Title title="Employee" parent_title="EMS" />
      <div className="mx-3">
        <div className="container-fluid" style={{ background: "white" }}>
          <div className="mb-2 row ">
            <div className="col-sm-4">
              <SearchList />
            </div>
            <div className="col-sm-8">
              <div
                className="text-sm-end"
                onClick={() => dispatch(setPageNumber(1))}
              >
                {/* <Nav_Btn
                  btn_name="Add Charges"
                  icon={<MdAdd />}
                  form_path="/master/charges/addcharges"
                /> */}

                {/* Filter */}
                <Filter type={"charges"} />
              </div>
            </div>
          </div>

          {/* DataTable */}
          <DataList
          can_delete={can_delete}
            Data_Title={EmployeeDataTitle}
            Data_Format={EmployeeDataFormate}
            path={`ems/get_onboardedlist/?onboarded="complete"&?search=${search}&p=${page_num}&records=${data_len}`}
          />
          <NumPagination path={"path"} />
        </div>
      </div>
    </>
  );
};
export default Employee;