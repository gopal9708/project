import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiSquare, FiCheckSquare } from "react-icons/fi";
import axios from "axios";
import { ServerAddress } from "../../constants/ServerAddress";
import { setIsDeleted, setToggle } from "../../store/pagination/Pagination";
import pdf from "../../assets/images/Pdf/printer.png";
import {
  setClose,
  setDeleteId,
  setIds,
  setIndexValue,
  setSelect,
} from "../../store/dataList/DataList";
import {
  setAlertType,
  setDataExist,
  setShowAlert,
} from "../../store/alert/Alert";
import { gstin_no } from "../../constants/CompanyDetails";
import FileSaver from 'file-saver';
// import { saveAs } from 'file-saver';

const EwayDocDataFormat = ({ data, data1, can_delete }) => {
  // console.log("dataaaaaaaaaa", data)
  const dispatch = useDispatch();
  const total_data = useSelector((state) => state.pagination.total_data);
  const accessToken = useSelector((state) => state.authentication.access_token);
  const ids = useSelector((state) => state.datalist.ids);
  const list_toggle = useSelector((state) => state.datalist.list_toggle);
  const user = useSelector((state) => state.authentication.userdetails);

  //  For Delete Eay Bill
  const delete_ewaybill = (id) => {
    axios
      .post(
        ServerAddress + "analytic/delete_ewaybill/",
        {
          data: id,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (response) {
        if (response.statusText === "OK") {
          dispatch(setDeleteId(false));
          dispatch(setIds([]));
          dispatch(setSelect(false));
          setselected([]);
          dispatch(setShowAlert(true));
          dispatch(setDataExist(`Data Deleted Sucessfully`));
          dispatch(setAlertType("danger"));
          dispatch(setIsDeleted("Yes"));
          dispatch(setToggle(true));
        }
      })
      .catch((err) => {
        alert(`Error While delete Commidity ${err}`);
      });
  };
  //Multi Delete
  const close = useSelector((state) => state.datalist.close);
  const select_all = useSelector((state) => state.datalist.select_all);
  const delete_id = useSelector((state) => state.datalist.delete_id);
  const b_acess_token = useSelector((state) => state.eway_bill.business_access_token);
  const [selected, setselected] = useState([]);
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

  useEffect(() => {
    if (delete_id === true) {
      delete_ewaybill(ids);
    }
  }, [delete_id]);

  useEffect(() => {
    dispatch(setToggle(false));
  }, []);

  useEffect(() => {
    dispatch(setIsDeleted("No"));
  }, [total_data]);

  //For Shorting
  const index = useSelector((state) => state.datalist.index);

  useEffect(() => {
    if (index === 0) {
      dispatch(setIndexValue("ewb_no"));
    } else if (index === 1) {
      dispatch(setIndexValue("docket_no"));
    }
    else if (index === 2) {
      dispatch(setIndexValue("ewb_id"));
    }
    else if (index === 3) {
      dispatch(setIndexValue("valid_upto"));
    }
    else if (index === 4) {
      dispatch(setIndexValue("created_at"));
    }
  }, [index]);

  
  // const [can_update, setcan_update] = useState(false);

  // useEffect(() => {
  //   if (
  //     userpermission.some((e) => e.sub_model === "Commodity" && e.update === true)
  //   ) {
  //     setcan_update(true);
  //   } else {
  //     setcan_update(false);
  //   }
  // }, [userpermission]);

  //For C&M
  const [showM, setShowM] = useState(false);

  const handleCloseM = () => setShowM(false);
  const handleShowM = () => setShowM(true);
  const [reject_resion, setreject_resion] = useState("")

  const handleModal = (ewaybill) => {
    console.log("NOT APPROVED-----", ewaybill)
    handleShowM()
    setreject_resion(ewaybill)
    console.log("reject_resion----", reject_resion)
  }



  const downloadEwayBill = (ewb) => {
    axios({
      url: `https://dev.api.easywaybill.in/ezewb/v1/reports/generatePdf?gstin=${gstin_no}`,
      method: 'POST',
      responseType: 'blob',
      data: {
        ewbNo: [ewb],
        type: 4,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${b_acess_token}`,
      },
    })
      .then(response => {
        console.log("Img response=====", response)
        const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
        FileSaver.saveAs(pdfBlob, 'eway-bill.pdf');
        // const contentDisposition = response.headers['content-disposition'];
        // const filename = contentDisposition.split(';')[1].split('filename')[1].split('=')[1].trim();
        // const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
        // saveAs(pdfBlob, filename);
      })
      .catch(error => {
        console.error(error);
      });
  };


  return (
    <>


      {(list_toggle === true ? data1 : data).length === 0 ? (
        <tr>
          <td>No Data Found</td>
        </tr>
      ) : (
        (list_toggle === true ? data1 : data).map((ewaybill, index) => {
          var time = new Date(ewaybill.valid_upto).toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });
          var crtime = new Date(ewaybill.created_at).toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });
          return (

            <tr
              key={index}
              style={{
                borderWidth: 1,
              }}
            >
              {(can_delete || user.is_superuser) && (
                <td
                  className="selection-cell"
                  onClick={() => {
                    handlefunn(ewaybill.id);
                    dispatch(setSelect(true));
                    dispatch(setDeleteId(false));
                    dispatch(setClose(false));
                  }}
                >
                  {selected.includes(ewaybill.id) ? (
                    <FiCheckSquare size={14} />
                  ) : (
                    <FiSquare size={14} />
                  )}
                </td>
              )}
              <td>{ewaybill.ewb_no}</td>
              <td>{ewaybill.docket_no}</td>
              <td>{ewaybill.ewb_id}</td>
              <td>{time}</td>
              <td>{crtime}</td>
              {/* <td>
                <Button size="sm" variant="success" onClick={() => {
                  downloadEwayBill(ewaybill.ewb_no);
                }}>Download</Button>
              </td> */}
              <td>
                <div style={{cursor:"pointer"}}>
                  <img src={pdf} alt="pdf" width="18" height="18" onClick={() => {
                  downloadEwayBill(ewaybill.ewb_no);
                }}/>
                </div>
              </td>
            </tr>
          );
        })
      )}
    </>
  );
};

export default EwayDocDataFormat;
