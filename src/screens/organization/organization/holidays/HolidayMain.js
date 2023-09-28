import React , { useEffect } from 'react'
import { MdAdd } from "react-icons/md";
import NavBtn from '../../../../components/btn/NavBtn';
import { useSelector, useDispatch } from "react-redux";
import DataList from '../../../../components/listDisplay/dataList/DataList';
import PageTitle from '../../../../components/pageTitle/PageTitle';
import Title from '../../../../components/title/Title';
import { setPageNumber } from '../../../../store/pagination/Pagination';
import { setToggle } from '../../../../store/parentFilter/ParentFilter';
import SearchList from '../../../../components/listDisplay/searchList/SearchList';
import Filter from '../../../../components/listDisplay/filter/Filter';
import NumPagination from '../../../../components/listDisplay/numPagination/NumPagination';
import HolidayDataFormate from '../../../../data/organization/holiday/HolidayDataFormate';
import HolidayDataTitle from '../../../../data/organization/holiday/HolidayDataTitle';
const HolidayMain = () => {
  const dispatch = useDispatch();
  // const toggle = useSelector((state) => state.parentfilter.toggle);
  // redux to get org id 
  const org_id= useSelector((state) => state.authentication.userdetails.organization_id);

  const data_len = useSelector((state) => state.pagination.data_length);
  const page_num = useSelector((state) => state.pagination.page_number);
  const search = useSelector((state) => state.searchbar.search_item);
   // Permissions
   
  
  useEffect(() => {
    dispatch(setToggle(false));
  }, [dispatch]); 

  return (
    <>
      <PageTitle page="Add Holiday" />
      <Title title="Add Holiday" parent_title="Organization" />
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
                  btn_name="Calendar View"
                  form_path="/organization/holidays"
                />
                <NavBtn
                  btn_name="Add Holiday"
                  icon={<MdAdd />}
                  form_path="/organisation/holidays/AddHoliday"
                />

                {/* Filter */}
                <Filter type={"name"} />
              </div>
            </div>
          </div>

          {/* DataTable */}
          <DataList
            Data_Title={HolidayDataTitle}
            Data_Format={HolidayDataFormate}
            path={`organization/get_holiday/?search=${search}&p=${page_num}&records=${data_len}&org_id=${org_id}`}
          />
          <NumPagination path={"path"} />

      </div>
      </div>

    
    </>
  )
}

export default HolidayMain