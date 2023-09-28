import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Input } from "reactstrap";
import { MdOutlineKeyboardArrowDown, MdErrorOutline } from "react-icons/md";
import { IconContext } from "react-icons";
import { setIsSearch, setSearchItem } from "../../../store/searchBar/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { setFilterToggle } from "../../../store/filterValue/FilterValue";
import { setPageNumber } from "../../../store/pagination/Pagination";

const MultiRowSearchInput = ({
  data_list,
  setdata_list,
  data_item_s,
  set_data_item_s,
  error_message = null,
  set_id,
  error_s = false,
  show_search = true,
  disable_me = false,
  current_width = "100%",
  page,
  setpage,
}) => {
  const dispatch = useDispatch();
  const is_search = useSelector((state) => state.searchbar.is_search);
  const [showfilter, setshowfilter] = useState(false);
  const [data_list_s, setdata_list_s] = useState(data_list);
  const [filterList, setfilterList] = useState(data_list);

  // Pagination
  const ref = useRef();
  const [bottom, setbottom] = useState(103);
  const [search, setsearch] = useState("");
  const [error, seterror] = useState(false);
  const [searching, setsearching] = useState(false);
  const [focused, setfocused] = useState(false);

  useEffect(() => {
    dispatch(setIsSearch(false));
    dispatch(setSearchItem(""));
  }, []);

  useEffect(() => {
    if (search == "") {
      dispatch(setIsSearch(true));
      dispatch(setSearchItem(""));
    }
  }, [search]);

  useLayoutEffect(() => {
    setdata_list_s(data_list);
    setfilterList(data_list);
  }, [data_list]);

  useEffect(() => {
    if (!show_search) {
      setbottom(62);
    }
  }, [show_search]);

  useEffect(() => {
    seterror(error_s);
  }, [error_s]);

  useEffect(() => {
    if (!showfilter) {
      setsearch("");
      if (!data_item_s && error_message && focused) {
        seterror(true);
      } else {
        seterror(false);
      }
    }
  }, [showfilter]);

  return (
    <div
      onFocus={() => setfocused(true)}
      onMouseLeave={() => {
        setshowfilter(false);
      }}
    >
      <button
        type="button"
        style={{
          border: error ? "1px solid #F46A6A" : "1px solid #d3d3d3",
          height: "30.5px",
          display: "flex",
          width: current_width,
          justifyContent: "space-between",
          position: "",
          background: disable_me ? "#EFF2F7" : "white",
        }}
        className="form-control-sm"
        onClick={() => {
          if (disable_me == false) {
            setshowfilter(!showfilter);
          }
        }}
      >
        <div
          style={{ paddingTop: "3px", fontSize: "10.7px", color: "#545454" }}
        >
          {data_item_s[1]}
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ borderLeft: "1px solid #d3d3d3" }}>
            {error ? (
              <IconContext.Provider
                value={{
                  className: "error-circle",
                }}
              >
                <MdErrorOutline />
              </IconContext.Provider>
            ) : (
              <IconContext.Provider
                value={{
                  className: "select-icon",
                }}
              >
                <MdOutlineKeyboardArrowDown />
              </IconContext.Provider>
            )}
          </div>
        </div>
      </button>
      <div className="error-text" color="danger">
        {error ? error_message : null}
      </div>

      {showfilter ? (
        <div
          ref={ref}
          className="dataResult custom-select"
          id="chk"
          onScroll={() => {
            // console.log("scrolling", ref.current.scrollTop,bottom,page,data_list.length)
            if (ref.current.scrollTop > bottom - 1) {
              // console.log("Time To Fetch More")
              setpage(page + 1);
              setbottom(bottom + 260);
            }
          }}
          style={{
            width: current_width,
            zIndex: "1",
            border: showfilter ? "1px solid #d3d3d3" : null,
          }}
        >
          {showfilter && show_search ? (
            // && data_list.length != 0
            <div
              style={{
                margin: "5px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Input
                autoComplete="off"
                className="form-control-md"
                id="input"
                value={search}
                onMouseDown={() => setsearching(true)}
                onChange={(val) => {
                  setsearch(val.target.value);
                  dispatch(setIsSearch(false));
                }}
                placeholder="Search....."
              />
              <i
                onMouseDown={() => {
                  if (search != "") {
                    setsearching(true);
                  }
                }}
                onClick={() => {
                  if (!is_search) {
                    setdata_list([]);
                  }
                  // dispatch(setFilterToggle(true));
                  dispatch(setIsSearch(true));
                  dispatch(setSearchItem(search));
                  dispatch(setPageNumber(1));
                  setpage(1);
                  setbottom(103);
                }}
                className="bx bx-search-alt search-icon"
              ></i>
            </div>
          ) : (
            <div></div>
          )}

          {showfilter ? (
            <>
              {filterList.length > 0 ? (
                filterList.map((value, key) => {
                  return (
                    <div key={key} className="data_item">
                      <span
                        onMouseDown={() => {
                          if (typeof value === "string") {
                            // set_data_item_s(value);
                            data_item_s = value;
                          } else {
                            // set_data_item_s(value[1]);
                            // set_id(value[0]);
                            data_item_s[0] = value[0];
                            data_item_s[1] = value[1];
                          }
                          setshowfilter(false);
                        }}
                        key={key}
                      >
                        <div
                          style={{
                            padding: "5px 7px",
                            cursor: "default",
                            fontSize: "10.7px",
                          }}
                        >
                          {typeof value == "string" ? value : value[1]}
                        </div>
                      </span>
                    </div>
                  );
                })
              ) : (
                <div>No Data Found</div>
              )}
            </>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default MultiRowSearchInput;
