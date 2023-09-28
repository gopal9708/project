import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DataList from "../../../../components/listDisplay/dataList/DataList";
import PageTitle from "../../../../components/pageTitle/PageTitle";
import Title from "../../../../components/title/Title";
import { setToggle } from "../../../../store/parentFilter/ParentFilter";
import NumPagination from "../../../../components/listDisplay/numPagination/NumPagination";
import { useNavigate } from "react-router-dom";
import MyAttendanceTitle from "./MyAttendanceTitle";
import MyAttendanceFormate from "./MyAttendanceFormate";
import MyAttendanceCalenderView from "./MyAttendanceCalenderView";

const MyAttendance = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setToggle(false));
  }, []);

  const [change_view, setchange_view] = useState(false);

  return (
    <>
      <PageTitle page="My Attendance" />
      <Title title="My Attendance" parent_title="EMS" />
      <div className="mx-3">
        <div className="container-fluid" style={{ background: "white" }}>
          <div style={{ textAlign: "right", margin: "12px" }}>
            <button
              type="button"
              onClick={() => {
                setchange_view(!change_view);
              }}
            >
              {change_view ? "List View" : "Calender View"}
            </button>
          </div>

          {change_view ? (
            <MyAttendanceCalenderView />
          ) : (
            <>
              <DataList
                Data_Title={MyAttendanceTitle}
                Data_Format={MyAttendanceFormate}
                // path={`master/get-item/?search=${search}&p=${page_num}&records=${data_len}&item_name=${item_name}&item_code=${item_code}`}
              />

              <NumPagination path={"path"} />
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default MyAttendance;
