import React, { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import Nav_Btn from "../../../components/btn/NavBtn";
import { useSelector, useDispatch } from "react-redux";
import DataList from "../../../components/listDisplay/dataList/DataList";
import PageTitle from "../../../components/pageTitle/PageTitle";
import Title from "../../../components/title/Title";
import { setPageNumber } from "../../../store/pagination/Pagination";
import { setToggle } from "../../../store/parentFilter/ParentFilter";
import SearchList from "../../../components/listDisplay/searchList/SearchList";
import Filter from "../../../components/listDisplay/filter/Filter";
import NumPagination from "../../../components/listDisplay/numPagination/NumPagination";
import VendorDataFormat from "../../../data/master/vendor/VendorDataFormat";
import VendorDataTitle from "../../../data/master/vendor/VendorDataTitle";
import Navigate from "../navigateTab/Navigate";

const Vendor = () => {
  const dispatch = useDispatch();
  const vendorname = useSelector((state) => state.filtervalue.data_a);
  const companytype = useSelector((state) => state.filtervalue.data_b);
  const lob = useSelector((state) => state.filtervalue.data_c);
  const service = useSelector((state) => state.filtervalue.data_d);

  const user = useSelector((state) => state.authentication.userdetails);

  // // Additional Fields
  const data_len = useSelector((state) => state.pagination.data_length);
  const page_num = useSelector((state) => state.pagination.page_number);
  const search = useSelector((state) => state.searchbar.search_item);
  const cm_value = useSelector((state) => state.datalist.cm_filter);


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
      userpermission.some((e) => e.sub_model === "Vendor" && e.write === true)
    ) {
      setcan_add(true);
    } else {
      setcan_add(false);
    }
  }, [userpermission]);

  useEffect(() => {
    if (
      userpermission.some((e) => e.sub_model === "Vendor" && e.delete === true)
    ) {
      setcan_delete(true);
    } else {
      setcan_delete(false);
    }
  }, [userpermission]);

  return (
    <>
      <PageTitle page="Vendors" />
      <Title title="Vendor" parent_title="Masters" />
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
                {(can_add || user.is_superuser) && (
                  <Nav_Btn
                    btn_name="Add Vendor"
                    icon={<MdAdd size={15} />}
                    form_path="/master/vendor/AddVendor"
                  />
                )}
                {/* Filter Tool */}
                <Filter type={"vendor"} />
              </div>
            </div>
            {(user.user_department_name === "ADMIN" || user.user_department_name === "ACCOUNTANT" ||  user.user_department_name+" "+ user.designation_name === "ACCOUNT MANAGER") &&
            (
            <Navigate />
            )
                }
          </div>

          {/* DataTable */}
          <DataList
            can_delete={can_delete}
            Data_Title={VendorDataTitle}
            Data_Format={VendorDataFormat}
            path={`master/all_vendor/?search=${search}&p=${page_num}&records=${data_len}&vendor_name=${vendorname}&company_type=${companytype}&lob_type=${lob}&service_type=${service}&data=&value=${cm_value}`}
          />
          <NumPagination path={"path"} />
        </div>
      </div>
    </>
  );
};
export default Vendor;
