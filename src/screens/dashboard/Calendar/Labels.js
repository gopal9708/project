// import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Card, CardBody, Row, Col } from "reactstrap";

// export default function Labels({ labels, updateLabel }) {
//   const [selectedLabels, setSelectedLabels] = useState(
//     // labels.reduce((acc, { label }) => ({ ...acc, [label]: false }), {})
//   );

//   const handleLabelSelect = (label) => {
//     setSelectedLabels((prevSelected) => ({
//       ...prevSelected,
//       [label]: !prevSelected[label],
//     }));
//     updateLabel(label);
//   };

//   return (
//     <React.Fragment>
//       <Card
//         style={{
//           borderRadius: "13px",
//           boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
//           width: "230px",
//         }}
//       >
//         <CardBody>
//           <Row>
//             <Col lg={3}>
//               <p
//                 style={{
//                   display: "flex",
//                   textAlign: "center",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   fontFamily: "sanssarif",
//                   fontWeight: "bold",
//                 }}
//                 className=""
//               >
//                 Label
//               </p>
//               {/* {labels.map(({ label }, idx) => (
//                 <label key={idx} style={{ display: "flex" }}>
//                   <input
//                     type="checkbox"
//                     checked={selectedLabels[label]}
//                     onChange={() => handleLabelSelect(label)}
//                     className={`form-checkbox h-5 w-5 text-${label}-400 rounded focus:ring-0 cursor-pointer`}
//                   />
//                   <span
//                     style={{
//                       display: "flex",
//                       fontWeight: "bold",
//                       right: "41px",
//                       top: "51px",
//                     }}
//                     className=""
//                   >
//                     {label}
//                   </span>
//                 </label>
//               ))} */}
//             </Col>
//           </Row>
//         </CardBody>
//       </Card>
//     </React.Fragment>
//   );
// }
