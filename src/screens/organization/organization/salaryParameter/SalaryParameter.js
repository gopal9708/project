import React, { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import NavBtn from "../../../../components/btn/NavBtn";
import { useSelector, useDispatch } from "react-redux";
import DataList from "../../../../components/listDisplay/dataList/DataList";
import PageTitle from "../../../../components/pageTitle/PageTitle";
import Title from "../../../../components/title/Title";
import { setPageNumber } from "../../../../store/pagination/Pagination";
import { setToggle } from "../../../../store/parentFilter/ParentFilter";
import SearchList from "../../../../components/listDisplay/searchList/SearchList";
import Filter from "../../../../components/listDisplay/filter/Filter";
import NumPagination from "../../../../components/listDisplay/numPagination/NumPagination";
import SalaryParameterFormate from "../../../../data/organization/salaryparameter/SalaryParameterFormate";
import SalaryParameterTitle from "../../../../data/organization/salaryparameter/SalaryParameterTitle";

const SalaryParameter = () => {
  const dispatch = useDispatch();
  // const toggle = useSelector((state) => state.parentfilter.toggle);
  // const branch_name = useSelector((state) => state.filtervalue.data_a);
  // const branch_company_id = useSelector((state) => state.filtervalue.data_b);
  // const branch_city_id = useSelector((state) => state.filtervalue.data_c);
  // redux to get org id 
  const org_id= useSelector((state) => state.authentication.userdetails.organization_id);

  const data_len = useSelector((state) => state.pagination.data_length);
  const page_num = useSelector((state) => state.pagination.page_number);
  const search = useSelector((state) => state.searchbar.search_item);
// const orgna_name =useSelector((state)=>state.organization_name.company_name);

  // Permissions
  const userpermission = useSelector((state) => state.authentication.userpermission);
  const user = useSelector((state) => state.authentication.userdetails);

  const [can_add, setcan_add] = useState(false);
  const [can_delete, setcan_delete] = useState(false);

  useEffect(() => {
    if (
      userpermission.some((e) => e.sub_model === "Salary Parameter" && e.write === true)
    ) {
      setcan_add(true);
    } else {
      setcan_add(false);
    }
  }, [userpermission])

  useEffect(() => {
    if (
      userpermission.some((e) => e.sub_model === "Salary Parameter" && e.delete === true)
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
      <PageTitle page="Salary Parameter List" />
      <Title title="Salary Parameter List" parent_title="Masters" />
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
                {(can_add || user.is_superuser) && (
                <NavBtn
                  btn_name="Add Salary Parameter"
                  icon={<MdAdd />}
                  form_path="/organization/AddSalaryParameter"
                />
                )}

                {/* Filter */}
                <Filter type={"name"} />
              </div>
            </div>
          </div>

          {/* DataTable */}
          <DataList
          can_delete={can_delete}
            Data_Title={SalaryParameterTitle}
            Data_Format={SalaryParameterFormate}
            path={`ems/GetSalaryParameter/?search=${search}&p=${page_num}&records=${data_len}&org_id=${org_id}`}
          />
          <NumPagination path={"path"} />
        </div>
      </div>
    </>
  );
};
export default SalaryParameter