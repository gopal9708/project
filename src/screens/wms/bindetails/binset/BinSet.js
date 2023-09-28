// import React from 'react';
// import DataList from '../../../../components/listDisplay/dataList/DataList';
// import PageTitle from '../../../../components/pageTitle/PageTitle';
// import Title from '../../../../components/title/Title';
// import SearchList from '../../../../components/listDisplay/searchList/SearchList';
// import BinDetailsTab from '../BinDetailsTab';
// import { MdAdd } from 'react-icons/md';
// import NavBtn from '../../../../components/btn/NavBtn';
// import AddBinSetData from "../../../../data/wms/bindetails/binset/BinSetDataFormat";
// import AddBinSetTitle from "../../../../data/wms/bindetails/binset/BinSetDataTitle";
// import { useSelector } from 'react-redux';
// import BinSetDataFormat from '../../../../data/wms/bindetails/binset/BinSetDataFormat';
// import BinSetDataTitle from '../../../../data/wms/bindetails/binset/BinSetDataTitle';

// const BinSet = () => {

//   const data_len = useSelector((state) => state.pagination.data_length);
//   const page_num = useSelector((state) => state.pagination.page_number);
//   const search = useSelector((state) => state.searchbar.search_item);


//   return (
//     <>
//       {/* Page_Title */}
//       <PageTitle page="BinSet" />
//       <BinDetailsTab />
//       <Title title="BinSet" parent_title="WMS" />
//       <div className="mx-3">
//         <div className="container-fluid " style={{ background: "white" }}>
//           <div className="mb-2 row ">
//             <div className="col-sm-4">
//               <SearchList />
//             </div>

//             <div className="col-sm-8">

//               <div className="text-sm-end">
//                 <NavBtn
//                   btn_name="Add BinSet"
//                   icon={<MdAdd size={15} />}
//                   form_path="/wms/bindetails/binset/AddBinSet"
//                 />
//                 {/* <Filter type={"baseinfo"} /> */}
//               </div>
//             </div>
//           </div>

//           {/* DataTable */}
//           <DataList
//             Data_Title={BinSetDataTitle}
//             Data_Format={BinSetDataFormat}
//             path={`wms/get_binset/?&search=${search}&p=${page_num}&records=${data_len}`}
//           />
//           {/* <NumPagination path={"path"} /> */}
//         </div>
//       </div>
//     </>
//   )
// }

// export default BinSet