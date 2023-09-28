/* eslint-disable */
import Title from "../../../../components/title/Title";
import React, {useState, useEffect} from "react";
import { MdAdd } from "react-icons/md";
import SearchList from "../../../../components/listDisplay/searchList/SearchList";
import NavBtn from "../../../../components/btn/NavBtn";
import Filter from "../../../../components/listDisplay/filter/Filter";
import PageTitle from "../../../../components/pageTitle/PageTitle";
import DataList from "../../../../components/listDisplay/dataList/DataList";
import JobAdvTitle from "../../../../data/hr/jobadvertisement/JobAdvTitle";
import JobAdvDataFormate from "../../../../data/hr/jobadvertisement/JobAdvDataFormate";
import { useSelector } from "react-redux";
import NumPagination from "../../../../components/listDisplay/numPagination/NumPagination";

const JobList = () => {
  const search = useSelector((state) => state.searchbar.search_item);
  const page_num = useSelector((state) => state.pagination.page_number);
  const data_len = useSelector((state) => state.pagination.data_length);
  const toggle = useSelector((state) => state.parentfilter.toggle);

  const branch_name = useSelector((state) => state.filtervalue.data_a);
  const acc_type = useSelector((state) => state.filtervalue.data_b);

  //Permission
  const userpermission = useSelector((state) => state.authentication.userpermission);
  const user = useSelector((state) => state.authentication.userdetails);

  const [can_add, setcan_add] = useState(false);
  const [can_delete, setcan_delete] = useState(false);

  useEffect(() => {
    if (
      userpermission.some((e) => e.sub_model === "Job Advertisements" && e.write === true)
    ) {
      setcan_add(true);
    } else {
      setcan_add(false);
    }
  }, [userpermission])

  useEffect(() => {  
    if (
      userpermission.some((e) => e.sub_model === "Job Advertisements" && e.delete === true)
    ) {
      setcan_delete(true);
    } else {
      setcan_delete(false);
    }
  }, [userpermission])

  return (
    <>
      {/* Page_Title */}
      <PageTitle page="Job Advertisements" />
      <Title title="Job Advertisements" parent_title="HR" />
      <div className="mx-3">
        <div className="container-fluid" style={{ background: "white" }}>
          {/* Toolbar Section */}
          <div className="mb-2 row">
            <div className="col-sm-4">
              <SearchList />
            </div>
            <div className="col-sm-8">
              <div className="text-sm-end">
                {/* Add Form Navigation Button */}
                {(can_add || user.is_superuser) && (
                <NavBtn
                  btn_name="Add Job Advertisements"
                  icon={<MdAdd />}
                  form_path="/hr/recruitment/jobAdvertisements"
                />
                )}
                {/* Filter Tool */}
                <Filter type={"addjobadvertisements"}/>
              </div>
            </div>
          </div>
          {/* DataTable */}
          <DataList
          can_delete={can_delete}
          Data_Title={JobAdvTitle}
          Data_Format={JobAdvDataFormate}
          path={`ems/get_jobadvertisment/?search=${search}&p=${page_num}&records=${data_len}&branch_name=${branch_name}&account_type=${acc_type}`}
          />

          <NumPagination path={"path"} />
        </div>
      </div>
      <br />
    </>
  );
};

export default JobList;
