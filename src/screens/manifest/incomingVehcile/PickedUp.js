import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PageTitle from "../../../components/pageTitle/PageTitle";
import Title from "../../../components/title/Title";
import { setPageNumber } from "../../../store/pagination/Pagination";
import SearchList from "../../../components/listDisplay/searchList/SearchList";
import { ServerAddress } from "../../../constants/ServerAddress";
import axios from "axios";
import PickDataFormat from "../../../data/manifests/recieveManifest/PickDataFormat";
import IncomingTab from "../navigateTab/IncomingTab";
import Navigate from "../navigateTab/Navigate";

const PickedUpOrders = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.authentication.access_token);
  const [picked_orders, setpicked_orders] = useState([]);
  const getPendindOrders = () => {
    axios
      .get(ServerAddress + `booking/orderboxqrcodecheck/`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        console.log("response[[[]", response.data)
        setpicked_orders(response.data);
      })
      .catch((err) => {
        alert(`Error Occur in Get Domestic Order , ${err}`);
      });
  };

  useEffect(() => {
    getPendindOrders();
  }, []);
  return (
    <>
      <PageTitle page="Picked Orders" />
      <Navigate />
      <IncomingTab />
      <Title title="Picked Orders" parent_title="Incoming" />
      <div className="mx-3">
        <div className="container-fluid " style={{ background: "white" }}>
          <div className="mb-2 row ">
            <div className="col-sm-4">
              <SearchList />
            </div>
            <div className="col-sm-8">
              <div
                className="text-sm-end"
                onClick={() => dispatch(setPageNumber(1))}
              >
                {/* Filter Tool */}
              </div>
            </div>
          </div>

          {/* DataTable */}
          <PickDataFormat
            data={picked_orders}
          />
        </div>
      </div>
    </>
  );
};
export default PickedUpOrders;
