import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  setIsDeleted,
  setToggle,
} from "../../../store/pagination/Pagination";
import {
  setIds,
  setIndexValue,
} from "../../../store/dataList/DataList";
import pdf from "../../../assets/images/Pdf/printer.png";
import toTitleCase from "../../../lib/titleCase/TitleCase";
import { Button } from "reactstrap";

const HubAirDataFormat = ({ data, data1, can_delete }) => {

  
  const dispatch = useDispatch();
  const total_data = useSelector((state) => state.pagination.total_data);
  const list_toggle = useSelector((state) => state.datalist.list_toggle);

  //Multi Delete function
  const close = useSelector((state) => state.datalist.close);
  const select_all = useSelector((state) => state.datalist.select_all);

  const [selected, setselected] = useState([]);

  const ids = useSelector((state) => state.datalist.ids);
  
  // const deleteCharge = (id) => {
  //   axios
  //     .post(
  //       ServerAddress + "master/delete-asset-info/",
  //       {
  //         data: id,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       }
  //     )
  //     .then(function (response) {
  //       if (response.statusText === "OK") {
  //         dispatch(setDeleteId(false));
  //         setclick(false);
  //         dispatch(setIds([]));
  //         dispatch(setSelect(false));
  //         setselected([]);
  //         dispatch(setShowAlert(true));
  //         dispatch(setDataExist(`Data Deleted Sucessfully`));
  //         dispatch(setAlertType("danger"));
  //         dispatch(setIsDeleted("Yes"));
  //         dispatch(setToggle(true));
  //       }
  //     })
  //     .catch((err) => {
  //       alert(`Error While delete Asset ${err}`);
  //     });
  // };

  useEffect(() => {
    dispatch(setToggle(false));
  }, []);

  useEffect(() => {
    dispatch(setIsDeleted("No"));
  }, [total_data]);

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
    if (select_all === true) {
      setselected(ids);
    }
  }, [select_all, ids]);

  useEffect(() => {
    if (select_all === false) {
      setselected([]);
    }
  }, [select_all]);

  useEffect(() => {
    if (close === true) {
      setselected([]);
    }
  }, [close]);

  // useEffect(() => {
  //   if (delete_id == true) {
  //     deleteCharge(ids);
  //   }
  // }, [delete_id]);

  //For Shorting
  const index = useSelector((state) => state.datalist.index);

  useEffect(() => {
    if (index === 0) {
      dispatch(setIndexValue("asset_id"));
    } else if (index === 1) {
      dispatch(setIndexValue("barcode"));
    }
  }, [index]);

  //Permission
  const userpermission = useSelector(
    (state) => state.authentication.userpermission
  );
  const [can_update, setcan_update] = useState(false);

  useEffect(() => {
    if (
      userpermission.some((e) => e.sub_model === "Raugh Manifest" && e.update === true)
    ) {
      setcan_update(true);
    } else {
      setcan_update(false);
    }
  }, [userpermission]);

  return (
    <>
      {(list_toggle === true ? data1 : data).length === 0 ? (
        <tr>
          <td>No Data Found</td>
        </tr>
      ) : (
        (list_toggle === true ? data1 : data).map((manifest, index) => {
          let f_date_f = manifest.manifest_date.split("T");
          let f_date = f_date_f[0];
          let f_time_r = String(f_date_f[1]).substring(0, 5);
          let l_fdate = f_date + " " + f_time_r;

          return (
            <tr
              key={index}
              style={{
                borderWidth: 1,
              }}
            >
              {/* {(can_delete || user.is_superuser) && (
              <td
                className="selection-cell"
                onClick={() => {
                  handlefunn(manifest.id);
                  dispatch(setSelect(true));
                  dispatch(setDeleteId(false));
                  dispatch(setClose(false));
                }}
              >
                {selected.includes(manifest.id) ? (
                  <FiCheckSquare size={14} />
                ) : (
                  <FiSquare size={14} />
                )}
              </td>
              )} */}
              <td>{
                // <Link to="/manifest/pendingfordispatch">{manifest.manifest_no}</Link>
                manifest.manifest_no
              }</td>

              <td>{toTitleCase(manifest.from_branch_n)}</td>
              <td>{toTitleCase(manifest.to_branch_n)}</td>
              <td>{toTitleCase(manifest.destination_branch_n)}</td>
              <td>{manifest.orders.length}</td>
              <td>
                {manifest.bag_count ? manifest.bag_count : 
                <div style={{ color: "red" }}>
                 Bag Is Not Added
              </div>
                }
              </td>
              <td>
                {manifest.box_count ? manifest.box_count : 
                  <div style={{ color: "red" }}>
                  Box Is Not Added
                </div>
                }
              </td>
              {/* <td>{""}</td> */}
              <td>{l_fdate}</td>
              <td>
                <div>
                  <Link
                    to="/manifest/roughmanfest"
                    state={{ manifest: manifest, is_manifest:true }}
                  >
                    <img src={pdf} alt="pdf" width="20" height="20" />
                  </Link>
                </div>
              </td>
              <td>
                {/* <AddAnotherOrder
                  edit={true}
                  id_m={manifest.manifest_no}
                  refresh={refresh}
                  setrefresh={setrefresh}
                /> */}
                <Link to="/manifest/editraughdocket" state={{ manifest: manifest }}>
                  <Button size="sm" outline type="button" color="primary">
                    Edit
                  </Button>
                </Link>
              </td>
            </tr>
          );
        })
      )}
    </>
  );
};

export default HubAirDataFormat;
