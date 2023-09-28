import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import DataList from "../../../components/listDisplay/dataList/DataList";
import PageTitle from "../../../components/pageTitle/PageTitle";
import Title from "../../../components/title/Title";
import { setPageNumber } from "../../../store/pagination/Pagination";
import { setToggle } from "../../../store/parentFilter/ParentFilter";
import SearchList from "../../../components/listDisplay/searchList/SearchList";
import NumPagination from "../../../components/listDisplay/numPagination/NumPagination";
import DocketIssueDataTitle from "../../../data/booking/docketIssue/DocketIssueDataTitle";
import DocketIssueDataFormate from "../../../data/booking/docketIssue/DocketIssueDataFormate";
import Navigate from "../navigateTab/Navigate";

const DocketIssue = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.authentication.userdetails);
  const cm_value = useSelector((state) => state.datalist.cm_filter);

  // // Pagination
  const data_len = useSelector((state) => state.pagination.data_length);
  const page_num = useSelector((state) => state.pagination.page_number);
  const search = useSelector((state) => state.searchbar.search_item);

  // // Permissions

  useEffect(() => {
    dispatch(setToggle(false));
  }, []);

  //Permission
  const userpermission = useSelector(
    (state) => state.authentication.userpermission
  );
  const [can_add, setcan_add] = useState(false);
  const [can_delete, setcan_delete] = useState(false);

  useEffect(() => {
    if (
      userpermission.some(
        (e) => e.sub_model === "Commodity" && e.write === true
      )
    ) {
      setcan_add(true);
    } else {
      setcan_add(false);
    }
  }, [userpermission]);

  useEffect(() => {
    if (
      userpermission.some(
        (e) => e.sub_model === "Commodity" && e.delete === true
      )
    ) {
      setcan_delete(true);
    } else {
      setcan_delete(false);
    }
  }, [userpermission]);

  // console.log("user.user_department_name----", user.user_department_name)
  return (
    <>
      <PageTitle page="Docket Issues" />
      <Title title="Docket Issues" parent_title="Booking" />
      <div className="mx-3">
        <div className="container-fluid " style={{ background: "white" }}>
          <div className="mb-2 row">
            <div className="col-sm-4">
              <SearchList />
            </div>
            <div className="col-sm-8">
              <div
                className="text-sm-end"
                onClick={() => dispatch(setPageNumber(1))}
              >
                {/* {(can_add || user.is_superuser) && (
                  <Nav_Btn
                    btn_name="Add Docket Issues"
                    icon={<MdAdd size={15} />}
                    form_path="/booking/docketIssue/AddDocketIssue"
                  />
                )} */}
                {/* Filter Tool */}
                {/* <Filter type={"commodity"} /> */}
              </div>
            </div>
            {(user.user_department_name + " " + user.designation_name === "DATA ENTRY OPERATOR" || user.user_department_name + " " + user.designation_name === "CUSTOMER SERVICE EXECUTIVE" || 
            user.user_department_name + " " + user.designation_name === "OPERATION MANAGER" || user.user_department_name + " " + user.designation_name === "CUSTOMER SUPPORT MANAGER"
            ) &&
              (
                <Navigate />
              )
            }
          </div>

          {/* DataTable */}
          <DataList
            can_delete={can_delete}
            Data_Title={DocketIssueDataTitle}
            Data_Format={DocketIssueDataFormate}
            // path={`booking/get_order_issue/?search=${search}&p=${page_num}&records=${data_len}`}
            path={`booking/get_all_issue/?search=${search}&p=${page_num}&records=${data_len}&barcode_type=${''}&value=${cm_value}`}
          />
          <NumPagination path={"path"} />
        </div>
      </div>
    </>
  );
};
export default DocketIssue;