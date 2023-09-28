import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from "reactstrap";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

// Coded by Manjula

const ReportDataList = ({ Data_Title, Data_Format }) => {
  const [data, setData] = useState(Data_Format);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    setData(Data_Format);
  }, []);

  const handleSave = () => {
    // Handle save logic here
  };

  const handleRowClick = useCallback((rowIndex) => {
    if (selectedRow === rowIndex) {
      setSelectedRow(null);
    } else {
      setSelectedRow(rowIndex);
    }
  }, [selectedRow]);

  const columnDefs = Data_Title.map(title => {
    if (title !== "Removed") {
      return {
        headerName: title,
        field: title,
      }
    }
  }).filter(Boolean);

  // const rowData = Data_Format.map((entry) => {
  //   console.log("entry", entry)
  //   const row = {};
  //   Data_Title.map((x, titleIndex) => {
  //     console.log("x....", x)
  //     console.log("titleIndex..",titleIndex)
  //     if (typeof entry[titleIndex] === 'string') {
  //       console.log("entrytitle",entry[titleIndex])
  //       console.log("rowX",row[x])
  //       row[x] = entry[titleIndex].replace(/,/g, "");
  //     } else {
  //       row[x] = entry[titleIndex];
  //     }
  //   });
  //   return row;
  // });

  const rowData = Data_Format.map((entry) => {
    const row = {};
    Data_Title.forEach((title, titleIndex) => {
      const entryValue = entry[titleIndex];
      if (typeof entryValue === 'string') {
        row[title] = entry[titleIndex][1]
      } else {
        row[title] = entry[titleIndex][1];
      }
    });
    return row;
  });
  
  console.log(rowData);

  return (
    <div className="ag-theme-alpine" style={{ height: 600 }}>
      <AgGridReact 
        columnDefs={columnDefs}
        rowData={rowData}
        
        rowSelection={'single'}
        // onRowClicked={({ node }) => handleRowClick(node.rowIndex)}
        getRowClass={({ node }) => node.rowIndex === selectedRow ? "selected-row" : ""}
      />
      
      {/* <Button onClick={handleSave}>Save</Button> */}
    </div>
  );
};

export default ReportDataList;
