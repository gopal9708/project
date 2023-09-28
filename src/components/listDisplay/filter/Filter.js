import React, { useState, useEffect } from "react";
import { Button, Offcanvas } from "react-bootstrap";
// import { Button, Offcanvas } from "react-bootstrap";
import { MdFilterListAlt } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import LoginDetailsFilter from "../../../screens/ems/loginDetails/LoginDetailsFilter";
import ChargesFilter from "../../../screens/master/charges/ChargesFilter";
import BranchesFilter from "../../../screens/master/branches/BranchesFilter";

// import { useDispatch, useSelector } from "react-redux";
// import Order_Filter from "../../pages/Bookings/Orders/Order_Filter";
// import Branch_Filter from "../../pages/Master/Branches/Branch_Filter";
// import CompanyFilter from "../../../screens/master/company/CompanyFilter";

import BillTosFilter from "../../../screens/master/billtos/BillTosFilter";
import CommoditiesFilter from "../../../screens/master/commodities/CommoditiesFilter";
import LocationsFilter from "../../../screens/master/locations/LocationsFilter";
import { setFilterToggle } from "../../../store/filterValue/FilterValue";
import { setIsSearch, setSearchItem } from "../../../store/searchBar/SearchBar";
import UserFilter from "../../../screens/ems/users/UserFilter";
import OrdersFilter from "../../../screens/booking/orders/OrdersFilter";
import RunsheetFilter from "../../../screens/runsheet/RunsheetFilter";
import ShipperConsigneeFilter from "../../../screens/master/orderOrigins/OrderOriginsFilter";
// import Coloader_Filter from "../../pages/Master/Coloader/Coloader_Filter";
// import Location_Filter from "../../pages/Master/Location/Location_Filter";
// import Client_Filter from "../../pages/Master/Clients/Client_Filter";
// import Runsheet_Filter from "../../pages/Runsheet/Runsheet_Filter";
// import Manifest_Filter from "../../pages/Manifests/All_Manifest/Manifest_Filter";
// import Issue_Docket_Filter from "../../pages/Bookings/Issues_Dockets/Issue_Docket_Filter";
// import Profile_Filter from "../../pages/Ems/Profile/Profile_Filter";
// import Leave_Filter from "../../pages/Ems/Leave_apply/Leave_Filter";
// import Warai_Filter from "../../pages/Billings/Bill_Closeds/Warai_Filter";
// import Charges_Filter from "../../pages/Master/Charges/Charges_Filter";
// import { isSearch, searchItem } from "../../store/Search_Bar/action";
// import { setFiltToggle } from "../../store/Components/FilterValue/action";
// import Invoice_Filter from "../../pages/Billings/Invoices/Invoice_Filter";

// import Assets_Filter from "../../pages/Master/Asset_Info/Asset_Filter";
// import Vehicle_Filter from "../../pages/Vms/Vehicle/Vehicle_Filter";
// import Transporter_Filter from "../../pages/Transporter/Transporter_details/Transporter_Filter";
// import Hired_Details_Filter from "../../pages/Transporter/Hired_Details/Hired_Details_Filter";
// import Trip_Filter from "../../pages/Transporter/Trip/Trip_Details/Trip_Filter";
import VendorFilter from "../../../screens/master/vendor/VendorFilter";
import RouteFilter from "../../../screens/master/route/RouteFilter";
import AssetsFilter from "../../../screens/master/assets/AssetsFilter";
import ManifestFilter from "../../../screens/manifest/allmanifest/ManifestFilter";
import NotUpdatedFilter from "../../../screens/ewayBill/docketEwaybill/NotUpdatedEwayFilter";
import DeliveryInfoFilter from "../../../screens/booking/deliveryInfo/DeliveryInfoFilter";

const Filter = ({ type }) => {
  const dispatch = useDispatch();
  const toggle = useSelector((state) => state.parentfilter.toggle);
  const page_num = useSelector((state) => state.pagination.page_number);
  const tog = useSelector((state) => state.pagination.toggle);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    dispatch(setIsSearch(false));
    dispatch(setSearchItem(""));
    dispatch(setFilterToggle(true));
  };

  useEffect(() => {
    if (toggle === true) {
      setShow(false);
    }
  }, [toggle === true]);

  useEffect(() => {
    dispatch(setFilterToggle(false));
  }, [tog, page_num, toggle]);

  const [filter, setfilter] = useState("");
  useEffect(() => {
    if (type === "invoices") {
      setfilter("Invoice");
    } else if (type === "booking") {
      setfilter("booking");
    } else if (type === "manifest") {
      setfilter("manifest");
    } else if (type === "runsheet") {
      setfilter("runsheet");
    } else if (type === "branches") {
      setfilter("branches");
    } else if (type === "commodity") {
      setfilter("commodity");
    } else if (type === "locations") {
      setfilter("locations");
    } else if (type === "charges") {
      setfilter("charges");
    } else if (type === "warai") {
      setfilter("warai");
    } else if (type === "coloader") {
      setfilter("coloader");
    } else if (type === "client") {
      setfilter("client");
    } else if (type === "issuedocket") {
      setfilter("issuedocket");
    } else if (type === "warai") {
      setfilter("warai");
    } else if (type === "profile") {
      setfilter("profile");
    } else if (type === "leave") {
      setfilter("leave");
    } else if (type === "assets") {
      setfilter("assets");
    } else if (type === "vehicle") {
      setfilter("vehicle");
    } else if (type === "transporter") {
      setfilter("transporter");
    } else if (type === "hired_details") {
      setfilter("hired_details");
    } else if (type === "trip") {
      setfilter("trip");
    } else if (type === "logindetails") {
      setfilter("logindetails");
    } else if (type === "Users") {
      setfilter("users");
    } else if (type === "vendor") {
      setfilter("vendor");
    } else if (type === "consignee_shipper") {
      setfilter("consignee_shipper");
    } else if (type === "route") {
      setfilter("route");
    }
    else if (type === "notupdated_eway") {
      setfilter("notupdated_eway");
    }
    else if (type === "delivery_info") {
      setfilter("delivery_info");
    }
    
  }, [type]);

  return (
    <>
      <Button
        style={{ padding: "5.8px" }}
        type="button"
        className="btn-rounded fluid mb-2 me-2 mt-3 btn btn-success"
        onClick={handleShow}
      >
        <MdFilterListAlt size={15} />
        Filter
      </Button>

      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        style={{ width: "300px" }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            {" "}
            <h3>Filter</h3>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body style={{ paddingTop: "0px" }}>
          { 
          filter === "delivery_info" ? (
            <DeliveryInfoFilter />
          ) : filter === "notupdated_eway" ? (
            <NotUpdatedFilter />
          ) :
          filter === "assets" ? (
            <AssetsFilter />
          ) : filter === "commodity" ? (
            <CommoditiesFilter />
          ) : filter === "branches" ? (
            <BranchesFilter />
          ) : filter === "logindetails" ? (
            <LoginDetailsFilter />
          ) : filter === "charges" ? (
            <ChargesFilter />
          ) : filter === "locations" ? (
            <LocationsFilter />
          ) : filter === "users" ? (
            <UserFilter />
          ) : filter === "booking" ? (
            <OrdersFilter />
          ) : filter === "vendor" ? (
            <VendorFilter />
          ) : filter === "runsheet" ? (
            <RunsheetFilter />
          ) : filter === "manifest" ? (
            <ManifestFilter />
          ) : filter === "client" ? (
            <BillTosFilter />
          ) : filter === "consignee_shipper" ? (
            <ShipperConsigneeFilter />
          ) : filter === "route" ? (
            <RouteFilter />
          ) : (
            ""
          )}
          <br />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Filter;
