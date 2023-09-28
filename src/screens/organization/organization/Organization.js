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
import NumPagination from "../../../components/listDisplay/numPagination/NumPagination";
import OrganizationDataTitle from "../../../data/organization/organization/OrganizationDataTitle";
import OrganizationDataFormat from "../../../data/organization/organization/OrganizationDataFormat";

const Organization = () => {
  const dispatch = useDispatch();
  const name = useSelector((state) => state.filtervalue.data_a);
  const data_len = useSelector((state) => state.pagination.data_length);
  const page_num = useSelector((state) => state.pagination.page_number);
  const search = useSelector((state) => state.searchbar.search_item);

  const user = useSelector((state) => state.authentication.userdetails);
  console.log("the user details====",user);


  useEffect(() => {
    dispatch(setToggle(false));
  }, []);

  //Permission
  // const userpermission = useSelector(
  //   (state) => state.authentication.userpermission
  // );
  // const [can_add, setcan_add] = useState(false);
  // const [can_delete, setcan_delete] = useState(false);

  return (
    <>
      <PageTitle page="Organization" />
      <Title title="Organization" parent_title="Organization" />
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
                {(user.is_superuser) && (
                  <Nav_Btn
                    btn_name="Add Organization"
                    icon={<MdAdd size={15} />}
                    form_path="/organization/AddOrganization"
                  />
                )}
              </div>
            </div>
          </div>

          {/* DataTable */}
          <DataList
            Data_Title={OrganizationDataTitle}
            Data_Format={OrganizationDataFormat}
            path={
              `organization/get_organization/?search=${search}&p=${page_num}&records=${data_len}&name=${[
                name,
              ]}`
            }
          />
          <NumPagination path={"path"} />
        </div>
      </div>
    </>
  );
};
export default Organization;
