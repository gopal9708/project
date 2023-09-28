import React from "react";

const DashboardTable = ({ title, data }) => {
  const myArr = JSON.parse(JSON.stringify(title));
  return (
    <>
      <table
        style={{
          borderCollapse: "collapse",
          width: "100%",
          borderWidth: 1,
          overflowX: "scroll",
        }}
      >
        <thead
          style={{
            position: "sticky",
            top: "0",
          }}
        >
          <tr style={{ lineHeight: 2, borderWidth: 1 }}>
            {myArr.map((item, index) => {
              return (
                <th
                  style={{
                    whiteSpace: "nowrap",
                    textAlign: "center",
                    fontSize: "12.5px",
                    backgroundColor: "#eff2f7",
                  }}
                  key={index}
                >
                  {item}{" "}
                </th>
              );
            })}
          </tr>
          <tbody>
            <tr>
              <td>Data1</td>
              <td>Data1</td>
              <td>Data1</td>
              <td>Data1</td>
              <td>Data1</td>
              <td>Data1</td>
            </tr>
          </tbody>
        </thead>
      </table>
    </>
  );
};

export default DashboardTable;
