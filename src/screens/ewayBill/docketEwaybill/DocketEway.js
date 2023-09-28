import React, { useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import DataList from "../../../components/listDisplay/dataList/DataList";
import PageTitle from "../../../components/pageTitle/PageTitle";
import Title from "../../../components/title/Title";
import { setPageNumber } from "../../../store/pagination/Pagination";
import { setToggle } from "../../../store/parentFilter/ParentFilter";
import SearchList from "../../../components/listDisplay/searchList/SearchList";
import NumPagination from "../../../components/listDisplay/numPagination/NumPagination";
import EwayDocDataFormat from "../../../data/ewayBill/EwayBillDataFormat";
import EwayDataTitle from "../../../data/ewayBill/EwayBillTitle";
import Navigate from "../ewayBillTab/Navigate";
import LogInEwayBill from "../../authentication/signin/LogInEwayBill";

const DocketEway = () => {
  const dispatch = useDispatch();
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
  const [can_delete, setcan_delete] = useState(false);

  useEffect(() => {
    if (
      userpermission.some(
        (e) => e.sub_model === "eWaybill" && e.delete === true
      )
    ) {
      setcan_delete(true);
    } else {
      setcan_delete(false);
    }
  }, [userpermission]);

  // const [eway_loaded, seteway_loaded] = useState(false)

  // useEffect(() => {
  //   seteway_loaded(true)
  // }, []);

  // const memoizedLogInEwayBill = useMemo(() => <LogInEwayBill />, []);

  return (
    <>
   {/* {!eway_loaded && memoizedLogInEwayBill} */}
   <LogInEwayBill />
     <Navigate />
      <PageTitle page="Part A" />
      <Title title="Eway Bill Dockets's" parent_title="Eway Bill" />
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
{/*                
                  <Nav_Btn
                    btn_name="Add Part A"
                    icon={<MdAdd size={15} />}
                    form_path="/eway/add_parta"
                  /> */}
              
                {/* Filter Tool */}
                {/* <Filter type={"commodity"} /> */}
              </div>
            </div>
          
          </div>

          {/* DataTable */}
          <DataList
            can_delete={can_delete}
            Data_Title={EwayDataTitle}
            Data_Format={EwayDocDataFormat}
            path={`analytic/all_eway/?search=${search}&p=${page_num}&records=${data_len}`}
          />
          <NumPagination path={"path"} />
        </div>
      </div>
    </>
  );
};
export default DocketEway;
