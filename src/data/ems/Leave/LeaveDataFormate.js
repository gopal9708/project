// /* eslint-disable */
// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { MdDownloadDone, MdClear } from "react-icons/md";
// import { FiSquare, FiCheckSquare } from "react-icons/fi";
// import NavBtn from "../../../components/btn/NavBtn";
// // import Dropdown from "../../components/formComponent/newDropdown/Dropdown";
// import Dropdown from "../../components/formComponent/newDropdown/Dropdown";

// import {
//   setDeleteId,
//   setIds,
//   setIndexValue,
//   setSelect,
// } from "../../store/dataList/DataList";
// import { setIsDeleted, setToggle } from "../../store/pagination/Pagination";
// import {
//   setAlertType,
//   setDataExist,
//   setShowAlert,
// } from "../../store/alert/Alert";
// import toTitleCase from "../../lib/titleCase/TitleCase";
// import { ServerAddress } from "../../constants/ServerAddress";

// const LeaveDataFormate = ({ data, data1, can_delete }) => {
//   const total_data = useSelector((state) => state.pagination.total_data);
//   const accessToken = useSelector((state) => state.authentication.access_token);  
//   //for dropdown
//   const [branch_type, setbranch_type] = useState("Accept");
//   const [branch_type_list, setbranch_type_list] = useState([
//     "Accept",
//     "Reject",
//     "Pending",
//   ]);

//   const [refresh, setrefresh] = useState(false);
//   const delete_branch_row = (id) => {
//     axios
//       .post(
//         ServerAddress + "master/delete-branch/",
//         {
//           data: id,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       )
//       .then(function (response) {
//         if (response.statusText === "OK") {
//           dispatch(setDeleteId(false));
//           dispatch(setIds([]));
//           dispatch(setSelect(false));
//           setselected([]);
//           dispatch(setIsDeleted(false));
//           dispatch(setShowAlert(true));
//           dispatch(setDataExist(`Data Deleted Sucessfully`));
//           dispatch(setAlertType("danger"));
//           setrefresh(!refresh);
//           dispatch(setIsDeleted("Yes"));
//           dispatch(setToggle(true));
//         }
//       })
//       .catch((err) => {
//         alert(`Error While delete branch ${err}`);
//       });
//   };

//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(setToggle(false));
//   });

//   useEffect(() => {
//     dispatch(setIsDeleted("No"));
//   }, [total_data]);

//   //For Sorting
//   const list_toggle = useSelector((state) => state.datalist.list_toggle);
//   const index = useSelector((state) => state.datalist.index);

//   useEffect(() => {
//     if (index === 0) {
//       dispatch(setIndexValue("name"));
//     } else if (index === 1) {
//       dispatch(setIndexValue("code"));
//     } else if (index === 2) {
//       dispatch(setIndexValue("type"));
//     } else if (index === 3) {
//       dispatch(setIndexValue("company_name"));
//     } else if (index === 4) {
//       dispatch(setIndexValue("city_name"));
//     } else if (index === 5) {
//       dispatch(setIndexValue("email"));
//     } else if (index === 6) {
//       dispatch(setIndexValue("head"));
//     } else if (index === 7) {
//       dispatch(setIndexValue("office_contact_number"));
//     }
//   }, [index]);
// //Permissions
//   const userpermission = useSelector((state) => state.authentication.userpermission);
//   const user = useSelector((state) => state.authentication.userdetails);
//   const [can_update, setcan_update] = useState(false);

//   useEffect(() => {
//     if (
//       userpermission.some((e) => e.sub_model === "Leave Tracker" && e.update === true)
//     ) {
//       setcan_update(true)
//     } else {
//       setcan_update(false)
//     }
//   }, [userpermission])
  

//   //Multi Delete function
//   const close = useSelector((state) => state.datalist.close);
//   const ids = useSelector((state) => state.datalist.ids);
//   const select_all = useSelector((state) => state.datalist.select_all);
//   const delete_id = useSelector((state) => state.datalist.delete_id);
//   const [selected, setselected] = useState([]);

//   const handlefunn = (id) => {
//     if (selected.includes(id)) {
//       let lis = [...selected];
//       setselected(lis.filter((e) => e !== id));
//     } else {
//       setselected([...selected, id]);
//     }
//   };
//   useEffect(() => {
//     dispatch(setIds(selected));
//   }, [selected]);
//   useEffect(() => {
//     if (ids !== [] && select_all === true) {
//       setselected(ids);
//     }
//   }, [select_all, ids]);
//   useEffect(() => {
//     if (select_all === false) {
//       setselected([]);
//     }
//   }, [select_all]);

//   useEffect(() => {
//     if (close === true) {
//       setselected([]);
//     }
//   }, [close]);

//   useEffect(() => {
//     if (delete_id === true) {
//       delete_branch_row(ids);
//     }
//   }, [delete_id]);

//   return (
//     <>
//       {(list_toggle === true ? data1 : data) === 0 ? (
//         <tr>
//           <td>No Data Found</td>
//         </tr>
//       ) : (
//         (list_toggle === true ? data1 : data).map((branch, index) => {
//           // let branch_type_n;
//           // if (branch.branch_type == "OWN BRANCH") {
//           //   branch_type_n = "Own Branch";
//           // } else {
//           //   branch_type_n = "Vendor";
//           // }

//           return (
//             <tr
//               key={index}
//               style={{
//                 borderWidth: 1,
//               }}
//             >
//               {(can_delete || user.is_superuser) && (
//               <td
//                 className="selection-cell"
//                 onClick={() => {
//                   handlefunn(branch.id);
//                   dispatch(setSelect(true));
//                 }}
//                 disabled
//               >
//                 {selected.includes(branch.id) ? (
//                   <FiCheckSquare size={14} />
//                 ) : (
//                   <FiSquare size={14} />
//                 )}
//               </td>
//               )}
//               <td>Rahul</td>

//               <td>
//                 {(can_update || user.is_superuser) ? (
//                 <Link 
//                 state = {{data : branch}}
//                 to="/ems/leave/leaveTracker/AddLeaveTracker.js"> 
//                 {toTitleCase(branch.branch)}
//                 </Link>                
//         ) : (
//           toTitleCase(branch.branch)
//         )}
//               </td>

//               <td>Medical</td>
//               <td>09/06/2023</td>
//               {/* <td>
//                 {branch.vendor_name ? toTitleCase(branch.vendor_name) : "-"}
//               </td> */}
//               <td>10/06/2023</td>
//               <td>
//                 <Dropdown
//                   data_list={branch_type_list}
//                   data_item_s={branch_type}
//                   set_data_item_s={setbranch_type}
//                   show_search={false}
//                   current_width={"100%"}
//                   current_position={"relative"}
//                 />

//                 {/* <div>
//                                     <button type="button" onClick={handleClick} style={buttonStyle}>
//                                         status
//                                     </button>
//                                     <ul className="dropdown" style={dropdownStyle}>
//                                         <li style={dropdownItemStyle}>
//                                             <a href="#">Accept</a>
//                                         </li>
//                                         <li style={dropdownItemStyle}>
//                                             <a href="#">Reject</a>
//                                         </li>
//                                     </ul>
//                                 </div> */}
//                 {/* <div className="form-check mb-2">
//                                     <input type="checkbox"
//                                         name="entry_type"
//                                         value="Approve"
//                                         onClick={() => {
//                                             if (window.confirm('Do You Want to Approve?'))
//                                                 setentry_type_btn("Approve");
//                                         }}
//                                         checked={entry_type_btn === "Approve"}
//                                         readOnly={true}
//                                         className="form-check-label input-box"
//                                     />
//                                     <NavBtn
//                                         btn_name="Accept"
//                                         icon={<MdDownloadDone size={15} />}
//                                     />
//                                     <input type="checkbox"
//                                         name="entry_type"
//                                         value="Reject"
//                                         onClick={() => {
//                                             if (window.confirm('Do You Want to Reject?'))
//                                                 setentry_type_btn("Reject");
//                                         }}
//                                         checked={entry_type_btn === "Reject"}
//                                         readOnly={true}
//                                         className="form-check-label input-box"
//                                     />
//                                     <NavBtn
//                                         btn_name="Reject"
//                                         icon={<MdClear size={15} />}
//                                     />
//                                 </div> */}
//               </td>
//               <td>Approved</td>
//             </tr>
//           );
//         })
//       )}
//     </>
//   );
// };

// export default LeaveDataFormate;

import React from 'react'

const LeaveDataFormate = () => {
  return (
    <div>LeaveDataFormate</div>
  )
}

export default LeaveDataFormate
