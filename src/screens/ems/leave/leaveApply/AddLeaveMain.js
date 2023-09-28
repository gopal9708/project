import React , { useEffect } from 'react'
import { MdAdd } from "react-icons/md";
import NavBtn from '../../../../components/btn/NavBtn';
import { useSelector, useDispatch } from "react-redux";
import DataList from '../../../../components/listDisplay/dataList/DataList';
import PageTitle from '../../../../components/pageTitle/PageTitle';
import Title from '../../../../components/title/Title';
import { setPageNumber } from '../../../../store/pagination/Pagination';
import { setToggle } from '../../../../store/pagination/Pagination';
import SearchList from '../../../../components/listDisplay/searchList/SearchList';
import Filter from '../../../../components/listDisplay/filter/Filter';
import NumPagination from '../../../../components/listDisplay/numPagination/NumPagination';
import LeaveApplyDataFormate from '../../../../data/ems/leaveApply/LeaveApplyDataFormate';
import LeaveApplyDataTitle from '../../../../data/ems/leaveApply/LeaveApplyDataTitle';

const AddLeaveMain = () => {
    const dispatch = useDispatch();
  const toggle = useSelector((state) => state.parentfilter.toggle);
  // redux to get org id 
  const org_id= useSelector((state) => state.authentication.userdetails.organization_id);

  const data_len = useSelector((state) => state.pagination.data_length);
  const page_num = useSelector((state) => state.pagination.page_number);
  const search = useSelector((state) => state.searchbar.search_item);
   // Permissions
   const user_permissions = useSelector(
    (state) => state.permissions.user_permissions
  );
  let is_superuser = useSelector(
    (state) => state.authentication.userdetails.is_superuser
  );
  useEffect(() => {
    dispatch(setToggle(false));
  }, []); 
  return (
    <>
      <PageTitle page="Add Leave" />
      <Title title="Leave" parent_title="ems" />
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
                <NavBtn
                  btn_name="View Entitled Leave"
                  form_path="/ems/leave/ViewLeave"
                />
                <NavBtn
                  btn_name="Add Leave"
                  icon={<MdAdd />}
                  form_path="/ems/leave/AddLeave"
                />

                {/* Filter */}
                <Filter type={"name"} />
              </div>
            </div>
          </div>

          {/* DataTable */}
          <DataList
             Data_Title={LeaveApplyDataTitle}
             Data_Format={LeaveApplyDataFormate}
            path={`ems/Get_leave_track/?search=${search}&p=${page_num}&records=${data_len}&org_id=${org_id}`}
          />
          <NumPagination path={"path"} />
      </div>
      </div>

    
    </>
  )
}

export default AddLeaveMain