import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  MdKeyboardArrowUp,
  MdKeyboardArrowDown,
  MdNavigateNext,
} from "react-icons/md";
import { useSelector } from "react-redux";
import { setPageNumber } from "../../store/pagination/Pagination";
import { setNavToggle } from "../../store/dataList/DataList";
import {
  setFilterA,
  setFilterB,
  setFilterC,
  setFilterD,
} from "../../store/filterValue/FilterValue";
import { setDepartTab, setEwayBilltTab, setHubTab, setIncomingTab, setLocationTab, setManifestTab, setRoughTab, setRunsheetTab } from "../../store/parentFilter/ParentFilter";

const SideBar = () => {
  const dispatch = useDispatch();
  const [refresh, setrefresh] = useState(false);
  const navigation_list_o = useSelector(
    (state) => state.permissions.navigation_list
  );
  const [navigation_lst, setnavigation_lst] = useState();
  let navigation_list_p = structuredClone(navigation_list_o);
  const [innerWidth, setinnerWidth] = useState();
  let wind_Width = window.innerWidth;
  useEffect(() => {
    setinnerWidth(wind_Width);
  }, [wind_Width]);

  useEffect(() => {
    setnavigation_lst(navigation_list_p);
  }, [navigation_list_o]);

  const handlefun = () => {
    dispatch(setPageNumber(1));
    dispatch(setFilterA([]));
    dispatch(setFilterB([]));
    dispatch(setFilterC([]));
    dispatch(setFilterD([]));
  };

  const handleClick = (e) => {
    // console.log(e)
    if(e[0] ==="Pending For Dispatch"){
      dispatch(setManifestTab(1));
    }
    else if(e[0] === "Hub Dispatch"){
      dispatch(setManifestTab(2));
      dispatch(setHubTab(1))
    }
    else if(e[0] === "Raugh Manifest"){
      dispatch(setManifestTab(3));
      dispatch(setRoughTab(1));
    }
    else if(e[0] === "Pending To Depart"){
      dispatch(setManifestTab(4));
      dispatch(setDepartTab(1));
    }
    else if(e[0] === "Incoming Manifest"){
      dispatch(setManifestTab(5));
      dispatch(setIncomingTab(1));
    }
    else if(e[0] === "All Manifest"){
      dispatch(setManifestTab(6));
    }
    else if(e[0] === "Pending Delivery"){
      dispatch(setRunsheetTab(1));
    }
    else if(e[0] === "All Runsheet"){
      dispatch(setRunsheetTab(4));
    }
    else if(e[0] === "DocketWithEwayBill"){
      dispatch(setEwayBilltTab(1));
    }
    else if(e[0] === "Locations"){
      dispatch(setLocationTab(1));
    }
  }

  return (
    <>
      <div className={innerWidth < 1200 ? "tog" : "vertical-menu"}>
        {/* <SimpleBar style={{ height: "100%" }}> */}
        <div className="sidebar-conatiner navbar-brand-box">
          <div className="sidebar">
            {/* <div> */}
            <h4 className="text-light">
              <Link to="/dashboard">Logistics Cube </Link>
              {innerWidth < 1200 && (
                <span
                  style={{ marginLeft: "20px", cursor: "pointer" }}
                  onClick={() => dispatch(setNavToggle(true))}
                >
                  <MdNavigateNext />
                </span>
              )}
            </h4>

            {/* </div> */}
            <hr />
            <nav>
              {navigation_lst &&
                navigation_lst.map((n, indx) => {
                  return (
                    <div className="dropdown" key={n.id}>
                      <p
                        onClick={() => {
                          navigation_lst[indx].trigger =
                            !navigation_lst[indx].trigger;
                          setrefresh(!refresh);
                        }}
                      >
                        <img src="./img/file.svg" alt="" />
                        {n.dropdown}
                        <span>
                          {navigation_lst[indx].trigger ? (
                            <MdKeyboardArrowUp />
                          ) : (
                            <MdKeyboardArrowDown />
                          )}
                        </span>
                      </p>
                      <div
                        className="dropdownMenu"
                        id={navigation_lst[indx].trigger ? "active" : ""}
                        onClick={() => handlefun()}
                      >
                        {n.dropdownMenu.map((i) => (
                          <Link to={i[1]} key={i[0]} onClick={() => handleClick(i)}>
                            {i[0]}
                          </Link>
                        ))}
                      </div>
                      <hr />
                    </div>
                  );
                })}
            </nav>
          </div>
        </div>
        {/* </SimpleBar> */}
      </div>
    </>
  );
};
export default SideBar;
