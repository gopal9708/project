import React, { useState, useEffect } from "react";
import { FaAngleDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  setDataLength,
  setDataLengthB,
  setDataLoaded,
  setPageNumber,
  setPageNumberB,
  setToggle,
  setToggleB,
} from "../../../store/pagination/Pagination";

const NumPagination = ({ path, pathb }) => {
  const dispatch = useDispatch();

  //Path
  const is_loaded = useSelector((state) => state.pagination.is_loaded);
  const total_data = useSelector((state) => state.pagination.total_data);
  const next = useSelector((state) => state.pagination.next);
  const prev = useSelector((state) => state.pagination.prev);
  const data_length = useSelector((state) => state.pagination.data_length);
  const [showfilter, setshowfilter] = useState(false);
  const [show_per_page, setshow_per_page] = useState(data_length);
  const is_deleted = useSelector((state) => state.pagination.is_deleted);
  const filt_toggle = useSelector((state) => state.filtervalue.filt_toggle);
  const is_search = useSelector((state) => state.searchbar.is_search);
  const show_per_page_list = [10, 20, 50];
  const [first, setfirst] = useState(0);
  const [page_no, setpage_no] = useState(1);
  let total = total_data;
  // console.log("next=========", next)
  const leftClick = () => {
    if (prev !== null && is_loaded === true) {
      setpage_no(page_no - 1);
      setfirst(first - data_length);
    }
  };

  const rightClick = () => {
    if (next !== null && is_loaded === true) {
      setpage_no(page_no + 1);
      setfirst(first + data_length);
    }
  };

  useEffect(() => {
    dispatch(setPageNumber(page_no));
  }, [page_no]);

  useEffect(() => {
    dispatch(setPageNumber(1));
    setfirst(0);
    setpage_no(1);
  }, [data_length, is_deleted, filt_toggle, is_search]);

  useEffect(() => {
    dispatch(setToggle(false));
  }, [data_length]);

  const clk_right = () => {
    dispatch(setToggle(true));
    dispatch(setDataLoaded(false));
    rightClick();
  };

  const clk_left = () => {
    dispatch(setToggle(true));
    dispatch(setDataLoaded(false));
    leftClick();
  };

  //pathb
  const is_loadedb = useSelector((state) => state.pagination.is_loadedb);
  const total_datab = useSelector((state) => state.pagination.total_datab);
  const prevb = useSelector((state) => state.pagination.prevb);
  const nextb = useSelector((state) => state.pagination.nextb);
  const data_lengthb = useSelector((state) => state.pagination.data_lengthb);
  const [showfilterb, setshowfilterb] = useState(false);
  const [show_per_pageb, setshow_per_pageb] = useState(data_lengthb);
  const is_deletedb = useSelector((state) => state.pagination.is_deletedb);
  const show_per_page_listb = [10, 20, 50];
  const [firstb, setfirstb] = useState(0);
  const [page_nob, setpage_nob] = useState(1);
  let totalb = total_datab;
  const leftClickb = () => {
    if (prevb !== "" && is_loadedb === true) {
      setpage_nob(page_nob - 1);
      setfirstb(firstb - data_lengthb);
    }
  };

  const rightClickb = () => {
    if (nextb !== "" && is_loadedb === true) {
      setpage_nob(page_nob + 1);
      setfirstb(firstb + data_lengthb);
    }
  };

  useEffect(() => {
    dispatch(setPageNumberB(page_nob));
  }, [page_nob]);

  useEffect(() => {
    dispatch(setPageNumberB(1));
    setfirstb(0);
    setpage_nob(1);
  }, [data_lengthb, is_deletedb, filt_toggle, is_search]);

  useEffect(() => {
    dispatch(setToggleB(false));
  }, [data_lengthb]);

  const clk_rightb = () => {
    dispatch(setToggleB(true));
    // dispatch(setDataLoadedB(false));
    rightClickb();
  };

  const clk_leftb = () => {
    dispatch(setToggleB(true));
    // dispatch(setDataLoadedB(false));
    leftClickb();
  };

  return (
    <div className="space_between">
      {path && (
        <>
          <span>
            {total >= 20 ? (
              <>
                {/* Select Options */}
                <div>
                  <div
                    onClick={() => setshowfilter(!showfilter)}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100px",
                      padding: "5px 15px",
                      border: "1px solid #ced4da",
                      borderRadius: "5px",
                    }}
                  >
                    <span style={{ fontSize: "13px" }}>{show_per_page}</span>
                    <FaAngleDown />
                  </div>
                </div>
                <div className="dataResult_sort">
                  {showfilter
                    ? show_per_page_list.map((item, index) => {
                      if (total >= item) {
                        return (
                          <div
                            key={index}
                            className="dataItem"
                            onClick={() => {
                              setshow_per_page(item);
                              setshowfilter(false);
                              dispatch(setDataLength(item));
                              dispatch(setToggle(true));
                            }}
                          >
                            <span style={{ fontSize: "13px" }}>{item}</span>
                          </div>
                        );
                      }
                    })
                    : null}
                </div>
              </>
            ) : null}
          </span>
          <span>
            <span>
              {/* {total >= 20 && ( */}

              {/* <span>
                {first + 1} - {next !== null ? first + data_length : total} of{" "}
                {total}
              </span> */}
              {/* )} */}
            </span>
            {/* Page Arrow */}

            <span className="arrow_style">
              {page_no !== 1 && is_loaded ? (
                <span
                  className="active_arrow"
                  onClick={() => {
                    dispatch(setDataLoaded(false));
                    if (is_loaded) {
                      clk_left();
                    }
                  }}
                >
                  &lt;
                </span>
              ) : (
                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              )}

              {"   "}
              <span style={{ fontSize: "13px" }}>
                {first + 1} - {next !== null ? first + data_length : total} of{" "}
                {total}
              </span>
              {"   "}
              {next !== null && is_loaded ? (
                <span
                  className="active_arrow"
                  onClick={() => {
                    dispatch(setDataLoaded(false));
                    if (is_loaded) {
                      clk_right();
                    }
                  }}
                >
                  <span> &gt; </span>
                </span>
              ) : (
                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              )}
            </span>
          </span>
        </>
      )}
      {pathb && (
        <>
          <span>
            {totalb >= 20 ? (
              <>
                {/* Select Options */}
                <div>
                  <div
                    onClick={() => setshowfilterb(!showfilterb)}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100px",
                      padding: "5px 15px",
                      border: "1px solid #ced4da",
                      borderRadius: "5px",
                    }}
                  >
                    <span style={{ fontSize: "13px" }}>{show_per_pageb}</span>
                    <FaAngleDown />
                  </div>
                </div>
                <div className="dataResult_sort">
                  {showfilter
                    ? show_per_page_listb.map((item, index) => {
                      if (totalb >= item) {
                        return (
                          <div
                            key={index}
                            className="dataItem"
                            onClick={() => {
                              setshow_per_pageb(item);
                              setshowfilterb(false);
                              dispatch(setDataLengthB(item));
                              dispatch(setToggleB(true));
                            }}
                          >
                            <span style={{ fontSize: "13px" }}>{item}</span>
                          </div>
                        );
                      }
                    })
                    : null}
                </div>
              </>
            ) : null}
          </span>
          <span>
            <span>
              {/* {total >= 20 && ( */}
              {/* <span>
                {firstb + 1} - {nextb !== null ? firstb + data_lengthb : totalb}{" "}
                of {totalb}
              </span> */}
              {/* )} */}
            </span>
            {/* Page Arrow */}

            <span className="arrow_style">
              {page_nob !== 1 && is_loadedb ? (
                <span
                  className="active_arrow"
                  onClick={() => {
                    if (is_loadedb) {
                      clk_leftb();
                    }
                  }}
                >
                  &lt;
                </span>
              ) : (
                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              )}
              <span style={{ fontSize: "13px" }}>
                {firstb + 1} - {nextb !== null ? firstb + data_lengthb : totalb}{" "}
                of {totalb}
              </span>
              {"   "}
              {nextb !== null && is_loadedb ? (
                <span
                  className="active_arrow"
                  onClick={() => {
                    if (is_loadedb) {
                      clk_rightb();
                    }
                  }}
                >
                  <span> &gt; </span>
                </span>
              ) : (
                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              )}
            </span>
          </span>
        </>
      )}
    </div>
  );
};

export default NumPagination;
