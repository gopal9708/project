import { combineReducers } from "redux";
import authenticationReducer from "./authentication/Authentication";
import permissionsReducer from "./permissions/Permissions";
import paginationReducer from "./pagination/Pagination";
import alertReducer from "./alert/Alert";
import parentFilterReducer from "./parentFilter/ParentFilter";
import filterValueReducer from "./filterValue/FilterValue";
import searchBarReducer from "./searchBar/SearchBar";
import dataListReducer from "./dataList/DataList";
import clientReducer from "./master/client/Client";
import customerReducer from "./master/customer/Customer";
import orderReducer from "./booking/order/Order";
import RecieveManifest from "./manifest/RecieveManifest";
import OrderTracking from "./orderTracking/OrderTracking";
import Ewaybill from "./ewayBill/EwayBill"; 

const appReducer = combineReducers({
  authentication: authenticationReducer,
  alert: alertReducer,
  pagination: paginationReducer,
  permissions: permissionsReducer,
  parentfilter: parentFilterReducer,
  filtervalue: filterValueReducer,
  searchbar: searchBarReducer,
  datalist: dataListReducer,
  client: clientReducer,
  customer: customerReducer,
  order: orderReducer,
  manifest: RecieveManifest,
  OrderTracking: OrderTracking,
  eway_bill:Ewaybill,

});

export default appReducer;
