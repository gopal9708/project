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

  const arr = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "l",
    "l",
    "l ",
    "l",
    "l",
    "l",
    "l",
    "l",
    "l",
  ];

  const scroll_fun = () => {
    let list = [...data_list_is];
    setdata_list_is(list);
  };
  return (
    <>
      {show_list && (
        <div
        className="select_box"
          style={{
         
          }}
        >
          <div
           className="select_box_container"
          >
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

              {/* // close button */}

              <button
                style={{
                  width: "10%",
                  // height: "32px",
                  // margin: "2px",
                  border: "none",
                  background: "none",
                  color: "black",
                  textAlign: "center",
                  margin: "3px",
                  // borderRadius: "50%",
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
              onScroll={() => {
                // setdata_list_is([""]);
                scroll_fun();
                 console.log("ref.current.scrollTop", ref.current.scrollTop)
                  for (let i = 1; i <= count; i += 3) {
                    if (ref.current.scrollTop > bottom - i && loaded) {
                      alert(page)
                      setpage(page + 1);
                      setbottom(bottom + 262 - with_add);
      
                      break;
                    }
                  }
                }}
                
            >
              {data_list_is.length === 0 ? (
                <div style={{ fontSize: "22px" }}>No Data</div>
              ) : (
                <>
                  {" "}
                  {data_list_is.map((itm, idx) => {
                    return (
                      <div
                      className="select_itm"
                        onClick={() => {
                          setdata_item(itm);
                          setshow_list(false);
                        }}
                        onScroll={() => {
                          // console.log("ref.current.scrollTop", ref.current.scrollTop)
                          // for (let i = 1; i <= count; i += 3) {
                          //   if (ref.current.scrollTop > bottom - i && loaded) {
                          //     // alert(page)
                          //     // setpage(page + 1);
                          //     // setbottom(bottom + 262 - with_add);
              
                          //     break;
                          //   }
                          // }
                        }}
                       
                      >
                        {" "}
                        {itm}
                      </div>
                    );
                  })}
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
