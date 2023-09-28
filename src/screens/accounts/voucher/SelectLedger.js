import React, { useState, useRef, useEffect } from "react";
import { MdClose } from "react-icons/md";
import "./AddVoucher.scss";

const SelectLedger = ({
  data_list,
  setdata_list,
  data_item,
  setdata_item,
  data_id,
  setdata_id,
  index_value,
  setindex_value,
  search_item,
  setsearch_item,
  count = 1,
  bottom = 25,
  setbottom,
  loaded = false,
  page = 1,
  setpage,
  with_add = 0,
}) => {
  const ref = useRef(null);
  const [data_list_is, setdata_list_is] = useState(data_list);
  const [show_list, setshow_list] = useState(true);
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
console.log("data list", data_list);
  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedItemIndex((prevIndex) =>
          prevIndex < data_list_is.length - 1 ? prevIndex + 1 : prevIndex
        );
        setdata_item(data_list_is[selectedItemIndex]);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedItemIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : prevIndex
        );
        setdata_item(data_list_is[selectedItemIndex]);
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (data_list_is.length > 0) {
          setdata_item(data_list_is[selectedItemIndex]);
          setshow_list(false);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [data_list_is, selectedItemIndex, setdata_item, setshow_list]);

  const handleItemClick = (idx, itm) => {
    console.log("selected data",idx , itm)
    setSelectedItemIndex(idx);
    console.log("first", data_list_is[idx])
    setdata_item(data_list_is[idx]);
    setshow_list(false);
  };

  const handleScroll = () => {
    if (ref.current) {
      const scrollOffset = ref.current.scrollTop;
      const containerHeight = ref.current.clientHeight;
      const itemHeight = ref.current.firstChild.clientHeight;
      const visibleItems = Math.floor(containerHeight / itemHeight);
      const startIndex = Math.floor(scrollOffset / itemHeight);
      const endIndex = startIndex + visibleItems - 1;

      setSelectedItemIndex(startIndex);

      const maxScrollOffset =
        ref.current.scrollHeight - containerHeight - with_add;

      if (scrollOffset >= maxScrollOffset) {
        setpage((prevPage) => prevPage + 1);
        setbottom((prevBottom) => prevBottom + 262 - with_add);
      }
    }
  };

  const scroll_fun = () => {
    let list = [...data_list_is];
    setdata_list_is(list);
  };

  return (
    <>
      {show_list && (
        <div className="select_box">
          <div className="select_box_container">
            <div style={{ width: "98%", margin: "2px", display: "flex" }}>
              <input
                type="text"
                placeholder="Enter name..."
                style={{
                  width: "90%",
                  height: "35px",
                  margin: "2px",
                  borderRadius: "6px",
                }}
              />

              {/* close button */}

              <button
                style={{
                  width: "10%",
                  border: "none",
                  background: "none",
                  color: "black",
                  textAlign: "center",
                  margin: "3px",
                }}
                onClick={() => {
                  setshow_list(false);
                }}
              >
                <MdClose size={28} />
              </button>
            </div>
            <div
              className="data_container"
              ref={ref}
              tabIndex={0}
              onScroll={handleScroll}
            >
              {data_list_is.length === 0 ? (
                <div style={{ fontSize: "22px" }}>No Data</div>
              ) : (
                <>
                  {data_list_is.map((itm, idx) => (
                    <div
                      className={`select_itm ${
                        idx === selectedItemIndex ? "selected" : ""
                      }`}
                      key={idx}
                      onClick={() => handleItemClick(idx ,itm)}
                      style={{
                        backgroundColor:
                          idx === selectedItemIndex ? "#d2e0fa" : "transparent",
                      }}
                    >
                      {itm}
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SelectLedger;
