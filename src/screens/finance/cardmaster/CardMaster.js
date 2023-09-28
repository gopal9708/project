/* eslint-disable */
import Title from "../../../components/title/Title";
import React, {useState, useEffect} from "react";
import { MdAdd } from "react-icons/md";
import SearchList from "../../../components/listDisplay/searchList/SearchList";
import NavBtn from "../../../components/btn/NavBtn";
import Filter from "../../../components/listDisplay/filter/Filter";
import PageTitle from "../../../components/pageTitle/PageTitle";
import DataList from "../../../components/listDisplay/dataList/DataList";
import CardMasterTitle from "../../../data/finance/card_master/CardMasterTitle";
import CardMasterDataFormat from "../../../data/finance/card_master/CardMasterDataformate";
import { useSelector } from "react-redux";
import NumPagination from "../../../components/listDisplay/numPagination/NumPagination";

const CardMaster = () => {
  const search = useSelector((state) => state.searchbar.search_item);
  const page_num = useSelector((state) => state.pagination.page_number);
  const data_len = useSelector((state) => state.pagination.data_length);
  // const toggle = useSelector((state) => state.parentfilter.toggle);

  //Permissions
  const userpermission = useSelector((state) => state.authentication.userpermission);
  const user = useSelector((state) => state.authentication.userdetails);

  const [can_add, setcan_add] = useState(false);
  const [can_delete, setcan_delete] = useState(false);

  useEffect(() => {
    if (
      userpermission.some((e) => e.sub_model === "Card Master Entry" && e.write === true)
    ) {
      setcan_add(true);
    } else {
      setcan_add(false);
    }
  }, [userpermission])

  useEffect(() => {  
    if (
      userpermission.some((e) => e.sub_model === "Card Master Entry" && e.delete === true)
    ) {
      setcan_delete(true);
    } else {
      setcan_delete(false);
    }
  }, [userpermission])
  return (
    <>
      {/* Page_Title */}
      <PageTitle page="Card Master" />
      <Title title="Card Master" parent_title="Master" />
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
                  btn_name="Add Card Master"
                  icon={<MdAdd />}
                  form_path="/finance/cardmaster/AddCardMaster"
                />
                )}
                {/* Filter Tool */}
                <Filter />
              </div>
            </div>
          </div>
          {/* DataTable */}
          <DataList
          can_delete={can_delete}
          Data_Title={CardMasterTitle}
          Data_Format={CardMasterDataFormat}
          path={`finance/get-CardMasterEntry/?search=${search}&p=${page_num}&records=${data_len}`}
          />

          <NumPagination path={"path"} />
        </div>
      </div>
      <br />
    </>
  );
};

export default CardMaster;
