import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Input } from "reactstrap";
import { MdOutlineKeyboardArrowDown, MdErrorOutline } from "react-icons/md";
import { IconContext } from "react-icons";
import toTitleCase from "../../../lib/titleCase/TitleCase";

const MultiRowSearchInput = ({
  data_list,
  data_item_s,
  error_message = null,
  show_search = true,
  disable_me = false,
  current_width = "100%",
  page = 1,
  setpage,
  setsearch_txt,
  refresh = false,
  setrefresh,
  with_add = 0,
  idx = 0,
  loaded=false,
  bottom=103,
  setbottom,
  count=1,
}) => {
  // const is_search = useSelector((state) => state.searchbar.is_search);
  const [is_search, setis_search] = useState(false);
  const [showfilter, setshowfilter] = useState(false);
  const [data_list_s, setdata_list_s] = useState(data_list);
  const [filterList, setfilterList] = useState(data_list);

  // Pagination
  const ref = useRef();
  // const [bottom, setbottom] = useState(103);
  const [search, setsearch] = useState("");
  const [error, seterror] = useState(false);
  const [searching, setsearching] = useState(false);
  const [focused, setfocused] = useState(false);

  // Postion
  const [list_top, setlist_top] = useState(0);

  useEffect(() => {
    setis_search(false);
    // dispatch(setIsSearch(false));
    // dispatch(setSearchItem(""));
    setsearch_txt("");
  }, []);

  // useEffect(() => {
  //   if (search == "") {
  //     setis_search(true);
  //     // dispatch(setIsSearch(true));
  //     // dispatch(setSearchItem(""));
  //     setsearch_txt("");
  //   }
  // }, [search]);

  useEffect(() => {
    setsearch_txt(toTitleCase(search).toUpperCase());
  }, [search]);

  useLayoutEffect(() => {
    setdata_list_s(data_list);
    setfilterList(data_list);
  }, [data_list]);

  // useEffect(() => {
  //   if (!showfilter) {
  //     setsearch("");
  //     if (!data_item_s[1] && error_message && focused) {
  //       seterror(true);
  //     } else {
  //       seterror(false);
  //     }
  //   }
  // }, [showfilter]);

  return (
    <div
      onFocus={() => setfocused(true)}
      // onBlur={() => {
      //   setshowfilter(false);
      // }}
      id={`tab${idx}`}
      onClick={() => {
        const el = document.getElementById(`tab${idx}`);
        var rect = el.getBoundingClientRect();

        setlist_top(rect.top);
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
          background: disable_me ? "#EFF2F7" : "white",
          margin: "0px",
        }}
        className="form-control-sm"
        onClick={() => {
          if (disable_me === false) {
            setshowfilter(!showfilter);
          }
        }}
      >
        <div
          style={{ paddingTop: "3px", fontSize: "10.7px", color: "#545454" }}
        >
          {typeof data_item_s === "string" ? data_item_s : data_item_s[1]}
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
            for (let i = 1; i <= count; i += 3) {
              // setpage(page + 1);
              if (ref.current.scrollTop > bottom - i && loaded) {
                setpage(page + 1);
                setbottom(bottom + 262 - with_add);
             
                break;   
                           
              }
            }
          }} 
          // onScroll={() => {
          //   if (ref.current.scrollTop > bottom - 1) {
          //     setpage(page + 1);
          //     setbottom(bottom + 260);
          //   }
          // }}
          style={{
            // width: current_width,
            width:"95%",
            zIndex: "10000000",
            border: showfilter ? "1px solid #d3d3d3" : null,
            position: "absolute",
            top: `${list_top + 30}`,
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
                  setpage(1);
                  setbottom(103);
                  setsearch(val.target.value);
                  // dispatch(setIsSearch(false));
                  setis_search(false);
                }}
                placeholder="Search....."
              />
              {/* <i
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
                  // dispatch(setIsSearch(true));
                  setis_search(true);
                  // dispatch(setSearchItem(search));
                  setsearch_txt(search);
                  dispatch(setPageNumber(1));
                  setpage(1);
                  setbottom(103);
                }}
                className="bx bx-search-alt search-icon"
              ></i> */}
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
                            data_item_s = value;
                          } else {
                            if (data_item_s.length === 3) {
                              data_item_s[0] = value[0];
                              data_item_s[1] = value[1];
                              data_item_s[2] = value[2];
                            } else {
                              data_item_s[0] = value[0];
                              data_item_s[1] = value[1];
                            }
                          }
                          setrefresh(!refresh);
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
