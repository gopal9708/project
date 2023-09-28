import React, { useState, useEffect } from 'react'
import { gstin_no } from '../../../constants/CompanyDetails';
import { useSelector } from 'react-redux';
import axios from 'axios';
import PageTitle from '../../../components/pageTitle/PageTitle';
import Title from '../../../components/title/Title';


const PendingPartB = () => {

  const b_acess_token = useSelector((state) => state.eway_bill.business_access_token);
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
  const get_partb_12 = () => {
    axios
      .post(
        `https://dev.api.easywaybill.in/ezewb/v1/ewb/search?gstin=${gstin_no}`,
        {
          "type": "PARTB_NOT_UPDATED_FOR_12D",
          "defaultquery": null
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${b_acess_token}`,
          },
        }
      )
      .then(function (response) {
        // console.log("response=======eway bill part b 12", response.data);
        // setpart_b_12(response.data.response);
      })
      .catch((error) => { });
  };

  useEffect(() => {
    get_partb_12();
  }, [])


  useEffect(() => {
    if (prev_date && today_date) {
      // get_assign_eway();
    }
  }, [prev_date && today_date])

  const [searchQuery, setSearchQuery] = useState("");
  //       const filteredData = data.filter((ewb) =>
  //   Object.values(ewb)
  //     .join(" ")
  //     .toLowerCase()
  //     .includes(searchQuery?.toLowerCase())
  // );

  return (
    <>
      <PageTitle page="PendingPartB" />
      <Title title="PendingPartB" parent_title="EwayBill" />
      <div className="mx-3">
        <div className="container-fluid " style={{ background: "white" }}>
          <div className="mb-2 row">
            <div className="col-sm-4">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ backgroundColor: "white", borderRadius: "10px" }}
              />
            </div>
          </div>
          {/* DataTable */}

          {/* <AssignedDataFormat 
       data={filteredData}
      //  search={searchQuery}
       /> */}
        </div>
      </div>
    </>
  )
}

export default PendingPartB