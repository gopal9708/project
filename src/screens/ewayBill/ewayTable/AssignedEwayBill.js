import React, { useState, useEffect } from 'react'
import { gstin_no } from '../../../constants/CompanyDetails';
import { useSelector } from 'react-redux';
import axios from 'axios';
import PageTitle from '../../../components/pageTitle/PageTitle';
import Title from '../../../components/title/Title';
import AssignedDataFormat from '../../../data/ewayBill/assignedEwayBill/AssignedDataFormat';
import { Input } from "reactstrap";

const AssignedEwayBill = () => {

  const b_acess_token = useSelector((state) => state.eway_bill.business_access_token);
  const [data, setdata] = useState([]);

  const [today_date, settoday_date] = useState("");
  const [prev_date, setprev_date] = useState("");

  useEffect(() => {
    const currentDate = new Date();

    // Get date 48 hours before current date
    const beforeDate = new Date(currentDate.getTime() - (72 * 60 * 60 * 1000));

    // Format dates as strings with slashes
    const currentDateStr = currentDate.toISOString().slice(0, 10).replace(/-/g, '/');
    const beforeDateStr = beforeDate.toISOString().slice(0, 10).replace(/-/g, '/');
    settoday_date(currentDateStr);
    setprev_date(beforeDateStr)
    // console.log("Current date:", currentDateStr);
    // console.log("48 hours before date:", beforeDateStr);
  }, [])
  const get_assign_eway = () => {
    axios
      .post(
        `https://dev.api.easywaybill.in/ezewb/v1/ewb/search?gstin=${gstin_no}`,
        {
          "type": "MY_EWB",
          "defaultquery": null,
          "page": 0,
          "size": 100,
          "addlquery": {
            "operator": "and",
            "criterias": [
              {
                "p": "ewbDt",
                "o": "gte",
                "v": prev_date,
              },
              {
                "p": "ewbDt",
                "o": "lte",
                "v": today_date,
              }
            ]
          }
        },

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${b_acess_token}`,
          },
        }
      )
      .then(function (response) {
        // console.log("response=======eway bill assigned", response);
        // setpart_b_12(response.data.response);
        setdata(response.data.response);

      })
      .catch((error) => { });
  };
  useEffect(() => {
    if (prev_date && today_date) {

      get_assign_eway();
    }
  }, [prev_date && today_date])

  const [searchQuery, setSearchQuery] = useState("");
  const filteredData = data?.filter((ewb) =>
    Object.values(ewb)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery?.toLowerCase())
  );

  return (
    <>

      <PageTitle page="Assgined Eway Bill" />
      <Title title="Assgined Eway Bill" parent_title="EwayBill" />
      <div className="mx-3">
        <div className="container-fluid " style={{ background: "white" }}>
        <div className="search-box me-2 mt-3 d-inline-block">
        <div className="position-relative">
          <label htmlFor="search-bar-0" className="search-label">
            <span id="search-bar-0-label" className="sr-only">
              Search this table
            </span>
            <Input
              id="search-bar-0"
              // style={{padding:"10px"}}
              type="text"
              aria-labelledby="search-bar-0-label"
              className="form-control "
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </label>
          <button
            type="submit"
            style={{ background: "transparent", border: "white" }}
        
          >
            <i className="bx bx-search-alt search-icon"></i>
          </button>
        </div>
      </div>

          {/* DataTable */}

          <AssignedDataFormat
            data={filteredData}
          //  search={searchQuery}
          />
        </div>
      </div>

    </>
  )
}

export default AssignedEwayBill