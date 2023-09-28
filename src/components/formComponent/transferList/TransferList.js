import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { IconContext } from "react-icons";
import {
  BiChevronsRight,
  BiChevronRight,
  BiChevronsLeft,
  BiChevronLeft,
} from "react-icons/bi";
import { Col, Input } from "reactstrap";
import toTitleCase from "../../../lib/titleCase/TitleCase";

const TransferList = ({
  list_a,
  setlist_a,
  list_b,
  setlist_b,
  width,
  page = 1,
  setpage,
  setsearch_item,
  loaded=false,
  count=1,
  bottom=56,
  disabled=false,
  setbottom,
}) => {
  //for multi select Groups
  const ref = useRef();
  // const [bottom, setbottom] = useState(56);
  const [search, setsearch] = useState("");
  const [searching, setsearching] = useState(false);
  const [data_list_s, setdata_list_s] = useState(list_a);
  const [filterList, setfilterList] = useState(list_a);

  const getselected = (selected, setselected, name, index) => {
    if (selected.includes(name)) {
      return (
        <div
          key={index}
          className=" m-1"
          style={{
            fontSize: "13px",
            background: "hsl(213, 100%, 95%)",
            padding: "2px",
            cursor: "default",
          }}
          onClick={() => {
            setselected(selected.filter((val) => val !== name));
          }}
        >
          {" "}
          {name[1]}
        </div>
      );
    } else {
      return (
        <div
          key={index}
          className="m-1"
          style={{ fontSize: "13px", cursor: "copy" }}
          onClick={() => {
            setselected([...selected, name]);
          }}
        >
          {" "}
          {name[1]}
        </div>
      );
    }
  };

  const [selected_a, setselected_a] = useState([]);
  const [selected_filter_a, setselected_filter_a] = useState([]);
  const [selected_b, setselected_b] = useState([]);
  const [selected_filter_b, setselected_filter_b] = useState([]);

  const [filter_a, setfilter_a] = useState([]);
  const [filter_b, setfilter_b] = useState([]);

  const [search_a, setsearch_a] = useState("");
  const [search_b, setsearch_b] = useState("");

  useEffect(() => {
    setsearch_item(toTitleCase(search).toUpperCase());
  }, [search]);

  useLayoutEffect(() => {
    setdata_list_s(list_a);
    setfilterList(list_a);
  }, [list_a]);


  return (
    <div className="d-flex flex-wrap">
      <Col lg={width ? 6 : 4} md={11} sm={10} xs={10}>
        <div
          // style={{ height: "11.5%", marginBottom: "8px" }}
          style={{
            height: "11.5%",
            // marginTop: "5px",
            marginBottom: "8px",
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
              setbottom(56);
              setsearch(val.target.value);
            }}
            placeholder="Search....."
          />
        </div>

        <div
          className="card"
          style={{ overflow: "auto", height: "200px" }}
          ref={ref}
          // onScroll={() => {
          //   for (let i = 1; i <= count; i += 3) {
              
          //     if (ref.current.scrollTop > bottom - i && loaded) {
             
          //       setpage(page + 1);
          //       setbottom(bottom + 236);
             
          //       break;   
                           
          //     }
          //   }
          // }}

          onScroll={() => {
            if (ref.current.scrollTop > bottom - count && loaded) {
              setpage(page + 1);
              setbottom(bottom + 236);
            }
          }}
        >
          <div
            className="card-body p-2"
            style={{ border: "1px solid #D3D3D3" }}
          >
            {search_a !== ""
              ? filter_a.map((item, index) =>
                  getselected(
                    selected_filter_a,
                    setselected_filter_a,
                    item,
                    index
                  )
                )
              : list_a.map((item, index) =>
                  getselected(selected_a, setselected_a, item, index)
                )}
          </div>
        </div>
      </Col>
      {/* </div> */}
      <div>
        <div className="icon1">
          <IconContext.Provider
            value={{
              className: "icon",
            }}
          >
            <BiChevronsRight
              name="right_btn1"
              style={{
                background: disabled ? "#D3D3D3" : "hsl(213, 100%, 95%)",
                  // btn == "right_btn1" ? "#D3D3D3" : "hsl(213, 100%, 95%)",
                fontSize: "22px",
              }}
              onClick={() => {
                if(disabled === false)
                {
                if (filter_a.length > 0) {
                  setlist_b([...list_b, ...filter_a]);

                  let temp = filter_a;
                  let temp2 = list_a;

                  for (let index = 0; index < temp.length; index++) {
                    let position = temp2.indexOf(temp[index]);
                    temp2.splice(position, 1);
                  }

                  setsearch_a("");
                  setfilter_a([]);
                  setselected_a([]);
                } else {
                  setlist_b([...list_b, ...list_a]);
                  setlist_a([]);
                  setselected_a([]);
                }
              }
              }}
            />
          </IconContext.Provider>
        </div>
        <div className="icon1">
          <IconContext.Provider
            value={{
              className: "icon",
            }}
          >
            <BiChevronRight
              name="right_btn2"
              style={{
                background: disabled ? "#D3D3D3" : "hsl(213, 100%, 95%)",
                fontSize: "22px",
              }}
              onClick={() => {
                if(disabled === false){
                let temp_selected =
                  search_a !== "" ? selected_filter_a : selected_a;
                setlist_b([...list_b, ...temp_selected]);

                let temp2 = list_a;
                let temp3 = temp_selected;

                for (let index = 0; index < temp3.length; index++) {
                  let position = temp2.indexOf(temp3[index]);
                  temp2.splice(position, 1);
                }

                setsearch_a("");
                setfilter_a([]);
                setselected_a([]);
                setselected_filter_a([]);
              }
              }}
            />
          </IconContext.Provider>
        </div>
        <div className="icon1">
          <IconContext.Provider
            value={{
              className: "icon",
            }}
          >
            <BiChevronLeft
              name="left_btn1"
              style={{
                background: disabled ? "#D3D3D3" : "hsl(213, 100%, 95%)",
                fontSize: "22px",
              }}
              onClick={() => {
                if(disabled === false){
                let temp_selected =
                  search_b !== "" ? selected_filter_b : selected_b;
                setlist_a([...list_a, ...temp_selected]);

                let temp2 = list_b;
                let temp3 = temp_selected;

                for (let index = 0; index < temp3.length; index++) {
                  let position = temp2.indexOf(temp3[index]);
                  temp2.splice(position, 1);
                }

                setsearch_b("");
                setfilter_b([]);
                setselected_b([]);
                setselected_filter_b([]);
              }
              }}
            />
          </IconContext.Provider>
        </div>
        <div className="icon1">
          <IconContext.Provider
            value={{
              className: "icon",
            }}
          >
            <BiChevronsLeft
              name="left_btn2"
              style={{
                background: disabled ? "#D3D3D3" : "hsl(213, 100%, 95%)",
                fontSize: "22px",
              }}
              onClick={() => {
                if(disabled === false){
                if (filter_b.length > 0) {
                  setlist_a([...list_a, ...filter_b]);

                  let temp = filter_b;
                  let temp2 = list_b;

                  for (let index = 0; index < temp.length; index++) {
                    let position = temp2.indexOf(temp[index]);
                    temp2.splice(position, 1);
                  }

                  setsearch_b("");
                  setfilter_b([]);
                } else {
                  setlist_a([...list_a, ...list_b]);
                  setlist_b([]);
                  setselected_b([]);
                }
              }
              }}
            />
          </IconContext.Provider>
        </div>
      </div>
      <Col lg={width ? 5 : 4} bd={12} sm={12} xs={12}>
        <div style={{ height: "11.5%", marginBottom: "8px" }}>
          <input
            className="input"
            type="search"
            placeholder="Search........"
            style={{
              width: "100%",
              height: "100%",
              border: "1px solid #D3D3D3",
            }}
            value={search_b}
            onChange={(event) => {
              let val = event.target.value;
              setsearch_b(val);
              setfilter_b(
                list_b.filter((item) => {
                  let name = item[1];
                  name = name.toLowerCase();
                  val = val.toLowerCase();
                  if (String(name).includes(String(val))) {
                    return name;
                  }
                })
              );
            }}
          />
        </div>

        <div className="card" style={{ overflow: "auto", height: "200px" }}>
          <div
            className="card-body p-2"
            style={{ border: "1px solid #D3D3D3" }}
          >
            {search_b !== ""
              ? filter_b.map((item, index) =>
                  getselected(
                    selected_filter_b,
                    setselected_filter_b,
                    item,
                    index
                  )
                )
              : list_b.map((item, index) =>
                  getselected(selected_b, setselected_b, item, index)
                )}
          </div>
        </div>
      </Col>
    </div>
  );
};

export default TransferList;
