import React, { useEffect } from "react";
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
import LedgerDataTitle from "../../../data/accounts/ledger/LedgerDataTitle";
import LedgerDataFormate from "../../../data/accounts/ledger/LedgerDataFormate";
import VoucherDataTitle from "../../../data/accounts/voucher/VoucherDataTitle";
import VoucherDataFormate from "../../../data/accounts/voucher/VoucherDataFormate";

const Voucher = () => {
  const dispatch = useDispatch();
  const toggle = useSelector((state) => state.parentfilter.toggle);
  const item_name = useSelector((state) => state.filtervalue.data_a);
  const branch_company_id = useSelector((state) => state.filtervalue.data_b);
  const item_code = useSelector((state) => state.filtervalue.data_c);

  const data_len = useSelector((state) => state.pagination.data_length);
  const page_num = useSelector((state) => state.pagination.page_number);
  const search = useSelector((state) => state.searchbar.search_item);

  // // Permissions
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
      <PageTitle page="Voucher" />
      <Title title="Voucher" parent_title="Accounts" />
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
                <Nav_Btn
                  btn_name="Cretae Voucher"
                  icon={<MdAdd size={15} />}
                  form_path="/accounts/voucher/AddVoucher"
                />

                {/* Filter */}
                <Filter type={"item"} />
              </div>
            </div>
          </div>

          {/* DataTable */}
          <DataList
            Data_Title={VoucherDataTitle}
            Data_Format={VoucherDataFormate}
            path={`account/get-voucher/?search=${search}&p=${page_num}&records=${data_len}`}
          />
          <NumPagination path={"path"} />
        </div>
      </div>
    </>
  );
};
export default Voucher;