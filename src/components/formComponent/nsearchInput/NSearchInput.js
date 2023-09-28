import React, { useEffect, useLayoutEffect, useState } from "react";
import { Input } from "reactstrap";
import { MdOutlineKeyboardArrowDown, MdErrorOutline } from "react-icons/md";
import { IconContext } from "react-icons";

const NSearchInput = ({
  data_list,
  data_item_s,
  set_data_item_s,
  error_message = null,
  set_id,
  error_s = false,
  show_search = true,
  disable_me = false,
  current_width = "100%",
  child_width = "95%"
}) => {
  
  const [showfilter, setshowfilter] = useState(false);
  const [data_list_s, setdata_list_s] = useState(data_list);
  const [filterList, setfilterList] = useState(data_list);
  const [searchWord, setsearchWord] = useState("");

  useLayoutEffect(() => {
    setdata_list_s(data_list);
    setfilterList(data_list);
  }, [data_list]);

  const handleFilter2 = (event) => {
    const search2 = event.target.value;
    setsearchWord(search2);
    const newFilter = data_list_s.filter((value) => {
      let search_val;
      if (typeof value === "string") {
        search_val = value;
      } else {
        search_val = value[1];
      }
      return search_val.toLowerCase().includes(search2.toLowerCase());
    });
    setfilterList(newFilter);
  };

  const [error, seterror] = useState(false);
  const [searching, setsearching] = useState(false);

  useEffect(() => {
    seterror(error_s);
  }, [error_s]);

  return (
    <>
      <div
        onBlur={() => {
          if (searching === false) {
            setshowfilter(false);
            if (!data_item_s) {
              seterror(true);
            } else {
              seterror(false);
            }
          }
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
                  // style={{borderBottom:"1px solid red"}}
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
        <div className="mt-1 error-text" color="danger">
          {error ? error_message : null}
        </div>

        {showfilter ? (
          <div
            className="dataResult custom-select"
            style={{
              // position: "absolute",
              // width: "95%",
              width: child_width,
              zIndex: "1",
              border: showfilter ? "1px solid #d3d3d3" : null,
            }}
          >
            {showfilter && show_search && data_list.length !== 0 ? (
              <div
                style={{ margin: "5px" }}
                onMouseDown={() => setsearching(true)}
                onBlur={() => {
                  setshowfilter(false);
                  setsearching(false);
                  setsearchWord("");
                  setdata_list_s(data_list);
                  setfilterList(data_list);
                }}
              >
                <Input
                  className="form-control-md"
                  id="input"
                  value={searchWord}
                  onChange={handleFilter2}
                  placeholder="Search....."
                  // onMouseDown = {() => {
                  //   // alert("On Mouse Down Function")
                  //   setshowfilter(true);
                  // }}
                />
              </div>
            ) : (
              <div></div>
            )}

            {showfilter && filterList !== ""
              ? filterList.map((value, key) => {
                  return (
                    <div key={key} className="data_item">
                      <span
                        onMouseDown={() => {
                          if (typeof value === "string") {
                            set_data_item_s(value);
                          } else {
                            set_data_item_s(value[1]);
                            set_id(value[0]);
                          }

                          // set_data_item_s(value)
                          setshowfilter(false);
                          setsearchWord("");
                          setfilterList(data_list_s);
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
              : null}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default NSearchInput;
