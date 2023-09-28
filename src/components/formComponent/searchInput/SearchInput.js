import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Input } from "reactstrap";
import { MdOutlineKeyboardArrowDown, MdErrorOutline } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import { IconContext } from "react-icons";
import toTitleCase from "../../../lib/titleCase/TitleCase";

const SearchInput = ({
  data_list,
  data_item_s,
  set_data_item_s,
  error_s = false,
  error_message = null,
  set_id,
  show_search = true,
  disable_me = false,
  current_width = "100%",
  page = 1,
  setpage,
  setsearch_item,
  set_temp,
  with_add = 0,
  add_nav = "",
  loaded=false,
  bottom=103,
  setbottom,
  count=1,
}) => {

  //  Dropdown Handle
  const [showfilter, setshowfilter] = useState(false);
  const [data_list_s, setdata_list_s] = useState(data_list);
  const [filterList, setfilterList] = useState(data_list);

  // Pagination
  const ref = useRef();
  const [search, setsearch] = useState("");
  const [error, seterror] = useState(false);
  const [searching, setsearching] = useState(false);
  const [focused, setfocused] = useState(false);

  useEffect(() => {
    setsearch_item(toTitleCase(search).toUpperCase());
  }, [search]);

  useLayoutEffect(() => {
    setdata_list_s(data_list);
    setfilterList(data_list);
  }, [data_list]);

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

  //---error
  useEffect(() => {
    seterror(error_s);
  }, [error_s]);  

  return (
    <div
      onFocus={() => setfocused(true)}
      // onBlur={() => {
      //   setshowfilter(false);
      // }}
      onBlur={() => {
        if (!data_item_s) {
          seterror(true);
        } else {
          seterror(false);
        }
      }}
    >
      <div
        style={{
          // border: error ? "1px solid #F46A6A" : "1px solid #d3d3d3",
          height: "30.5px",
          display: "flex",
          width: current_width,
          justifyContent: "space-between",
          position: "",
          background: disable_me ? "#EFF2F7" : "white",
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
            if (disable_me === false) {
              setshowfilter(!showfilter);
            }
          }}
        >
          <div
            style={{ paddingTop: "3px", fontSize: "10.7px", color: "#545454" }}
          >
            {data_item_s}
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

        {add_nav !== "" && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
              border: "1px solid #d3d3d3",
            }}
            onClick={() => {
              window.open(add_nav, '_blank')
            }}
          >
            <AiOutlinePlus />
          </div>
        )}
      </div>

      <div className="error-text" color="danger">
        {error ? error_message : null}
      </div>

      {showfilter ? (
        <div
          ref={ref}
          className="dataResult custom-select"
          id="chk"
          // onScroll={() => {
          //   for (let i = 1; i <= count; i += 3) {
          //     if (ref.current.scrollTop > bottom - i && loaded) {
          //       setpage(page + 1);
          //       setbottom(bottom + 262 - with_add);
             
          //       break;   
                           
          //     }
          //   }
          // }} 
          onScroll={() => {
            if (ref.current.scrollTop > bottom - count && loaded) {
              setpage(page + 1);
              setbottom(bottom + 262 - with_add);
            }
          }}
          style={{
            width: "95%",
            // width: current_width,
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
                  setpage(1);
                  setbottom(103);
                  setsearch(val.target.value);
                }}
                placeholder="Search....."
              />
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
                            set_data_item_s(value);
                          } else {
                            set_data_item_s(value[1]);
                            set_id(value[0]);
                            set_temp && set_temp(value[2]);
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
                <div style={{ marginLeft: "6px", fontSize: "12px" }}>
                  No Data Found
                </div>
              )}
            </>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default SearchInput;
