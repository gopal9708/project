import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { FiSquare, FiCheckSquare } from "react-icons/fi";
import toTitleCase from "../../../lib/titleCase/TitleCase";
import { useDispatch  } from "react-redux";
import { setIsDeleted,setToggle } from '../../../store/pagination/Pagination';
import { setIds,setSelect,setIndexValue} from "../../../store/dataList/DataList";

const ViewLeaveDataFormate = ({data , data1}) => {
    const total_data = useSelector((state) => state.pagination.total_data);
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(setToggle(false));
    }, []);
    useEffect(() => {
      dispatch(setIsDeleted("No"));
    }, [total_data]);
      //For Sorting
  const list_toggle = useSelector((state) => state.datalist.list_toggle);
  const index = useSelector((state) => state.datalist.index);

  useEffect(() => {
    if (index === 1) {
      dispatch(setIndexValue("leave_category"));
    } else if (index === 2) {
      dispatch(setIndexValue("total_leaves"));
    } else if (index === 3) {
      dispatch(setIndexValue("leaves_left"));
    }  else if (index === 4) {
      dispatch(setIndexValue("leaves_taken"));
    }    
  }, [index]);
    //Multi Select function
    const ids = useSelector((state) => state.datalist.ids);
    const select_all = useSelector((state) => state.datalist.select_all);
    const [selected, setselected] = useState([]);
    const handlefunn = (id) => {
      if (selected.includes(id)) {
        let lis = [...selected];
        setselected(lis.filter((e) => e !== id));
      } else {
        setselected([...selected, id]);
      }
    };
    useEffect(() => {
      dispatch(setIds(selected));
    }, [selected]);
    useEffect(() => {
      if (ids !== [] && select_all === true) {
        setselected(ids);
      }
    }, [ids, select_all]);
    useEffect(() => {
      if (select_all === false) {
        setselected([]);
      }
    }, [select_all])
  return (
    <>
      {(list_toggle === true ? data1 : data) === 0 ? (
        <tr>
          <td>No Data Found</td>
        </tr>
      ) : (
        (list_toggle === true ? data1 : data).map((item, index) => {
          return (
            <tr
              key={index}
              style={{
                borderWidth: 1,
              }}
            >
                <td
                className="selection-cell"
                onClick={() => {
                  handlefunn(item.id);
                  dispatch(setSelect(true));
                }}
              >
                {selected.includes(item.id) ? (
                  <FiCheckSquare size={14} />
                ) : (
                  <FiSquare size={14} />
                )}
              </td>
              <td>{index + 1}</td>
              <td>
                {toTitleCase(item.leave_category)}
              </td>
              <td>{item.total_leaves}</td>
              <td>{item.leaves_left}</td>
              <td>{item.leaves_taken}</td>
            </tr>
          );
        })
      )}
    </>
  )
}

export default ViewLeaveDataFormate