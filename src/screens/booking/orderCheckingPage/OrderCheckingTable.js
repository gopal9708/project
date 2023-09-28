import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataList from "../../../components/listDisplay/dataList/DataList";
import ChargesDataFormat from "../../../data/master/charges/ChargesDataFormat";
import ChargesDataTitle from "../../../data/master/charges/ChargesDataTitle";
import { setFilterA } from "../../../store/filterValue/FilterValue";

const Charges = () => {
  const dispatch = useDispatch();
  const primary_charges = useSelector((state) => state.filtervalue.data_a);
  const search = useSelector((state) => state.searchbar.search_item);

  // Additional Fields
  const data_len = useSelector((state) => state.pagination.data_length);
  const page_num = useSelector((state) => state.pagination.page_number);


  useEffect(() => {
    dispatch(setFilterA([]));
  }, []);

  //Permission
  const userpermission = useSelector(
    (state) => state.authentication.userpermission
  );
  const [can_add, setcan_add] = useState(false);
  const [can_delete, setcan_delete] = useState(false);

  useEffect(() => {
    if (
      userpermission.some((e) => e.sub_model === "Charges" && e.write === true)
    ) {
      setcan_add(true);
    } else {
      setcan_add(false);
    }
  }, [userpermission]);

  useEffect(() => {
    if (
      userpermission.some((e) => e.sub_model === "Charges" && e.delete === true)
    ) {
      setcan_delete(true);
    } else {
      setcan_delete(false);
    }
  }, [userpermission]);

  return (
    <>
      <DataList
        can_delete={can_delete}
        Data_Title={ChargesDataTitle}
        Data_Format={ChargesDataFormat}
        path={`master/all_charges/?search=${search}&p=${page_num}&records=${data_len}&charge_category=${primary_charges}`}
      />
    </>
  );
};

export default Charges;
