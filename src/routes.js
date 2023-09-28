import React, { lazy } from "react";
import { Navigate } from "react-router-dom";
// import Warehouse from "./screens/WMS/wms/Warehouse.js";

// Authentication
const SignIn = React.lazy(() =>
  import("./screens/authentication/signin/SignIn.js")
);

const ResetPassword = React.lazy(() =>
  import("./screens/authentication/resetpassword/ResetPassword.js")
);
const ForgetPassword = React.lazy(() =>
  import("./screens/authentication/forgetPassword/ForgetPassword.js")
);
const AdminChangePassword = React.lazy(() =>
  import("./screens/ems/adminChangePasspword/AdminChangePassword.js")
);

// Test
const Test = React.lazy(() => import("./screens/test/Test.js"));
const TestImport = React.lazy(() => import("./screens/test/TestImport.js"));

//Dashboard
const Dashboard = React.lazy(() => import("./screens/dashboard/Dashboard.js"));

// 404
const Page_Not_Found = React.lazy(() =>
  import("./screens/utilities/page404/Page404.js")
);

//Warehouse
const Warehouse = React.lazy(() =>
  import("./screens/wms/warehouse/Warehouse.js")
);
const AddWarehouse = React.lazy(() =>
  import("./screens/wms/warehouse/AddWarehouse.js")
);


//BinDetails
const BinDetails = React.lazy(() =>
  import("./screens/wms/bindetails/BinDetails.js")
);
const BinDetailsTab = React.lazy(() =>
  import("./screens/wms/bindetails/BinDetailsTab.js")
);
const BinSet = React.lazy(() =>
  import("./screens/wms/bindetails/binset/BinSet.js")
);
const AddBinSet = React.lazy(() =>
  import("./screens/wms/bindetails/binset/AddBinSet.js")
);

const BinSize = React.lazy(() =>
  import("./screens/wms/bindetails/binsize/BinSize.js")
);
const AddBinSize = React.lazy(() =>
  import("./screens/wms/bindetails/binsize/AddBinSize.js")
);
const BinProperty = React.lazy(() =>
  import("./screens/wms/bindetails/binproperty/BinProperty.js")
);
const AddBinProperty = React.lazy(() =>
  import("./screens/wms/bindetails/binproperty/AddBinProperty.js")
);
// Outbound
const Outbound = React.lazy(() =>
  import("./screens/wms/outbound/Outbound.js")
);
const AddDn = React.lazy(() =>
  import("./screens/wms/outbound/dn/AddDn.js")
);
const PreOrder = React.lazy(() =>
  import("./screens/wms/outbound/preorder/PreOrder.js")
);
const AddPreOrder = React.lazy(() =>
  import("./screens/wms/outbound/preorder/AddPreOrder.js")
);
const NewOrder = React.lazy(() =>
  import("./screens/wms/outbound/neworder/NewOrder.js")
);
const AddNewOrder = React.lazy(() =>
  import("./screens/wms/outbound/neworder/AddNewOrder.js")
);
const BackOrder = React.lazy(() =>
  import("./screens/wms/outbound/backorder/BackOrder.js")
);
const AddBackOrder = React.lazy(() =>
  import("./screens/wms/outbound/backorder/AddBackOrder.js")
);
const PrePick = React.lazy(() =>
  import("./screens/wms/outbound/prepick/PrePick.js")
);
const AddPrePick = React.lazy(() =>
  import("./screens/wms/outbound/prepick/AddPrePick.js")
);
const Picked = React.lazy(() =>
  import("./screens/wms/outbound/picked/Picked.js")
);
const AddPicked = React.lazy(() =>
  import("./screens/wms/outbound/picked/AddPicked.js")
);
const PickingList = React.lazy(() =>
  import("./screens/wms/outbound/pickinglist/PickingList.js")
);
const AddPickingList = React.lazy(() =>
  import("./screens/wms/outbound/pickinglist/AddPickingList.js")
);
const ShippingList = React.lazy(() =>
  import("./screens/wms/outbound/shippinglist/ShippingList.js")
);
const AddShippingList = React.lazy(() =>
  import("./screens/wms/outbound/shippinglist/AddShippingList.js")
);
const ProofOfDelivery = React.lazy(() =>
  import("./screens/wms/outbound/proofofdelivery/ProofOfDelivery.js")
);
const AddProofOfDelivery = React.lazy(() =>
  import("./screens/wms/outbound/proofofdelivery/AddProofOfDelivery.js")
);
// Inbound
const Inbound = React.lazy(() =>
  import("./screens/wms/inbound/Inbound.js")
);
const AddAsn = React.lazy(() =>
  import("./screens/wms/inbound/asn/AddAsn.js")
);
const PreDelivery = React.lazy(() =>
  import("./screens/wms/inbound/predelivery/PreDelivery.js")
);
const AddPreDelivery = React.lazy(() =>
  import("./screens/wms/inbound/predelivery/AddPreDelivery.js")
);
const PreLoad = React.lazy(() =>
  import("./screens/wms/inbound/preload/PreLoad.js")
);
const AddPreLoad = React.lazy(() =>
  import("./screens/wms/inbound/preload/AddPreLoad.js")
);
const Sorting = React.lazy(() =>
  import("./screens/wms/inbound/sorting/Sorting.js")
);
const AddSorting = React.lazy(() =>
  import("./screens/wms/inbound/sorting/AddSorting.js")
);
const Sorted = React.lazy(() =>
  import("./screens/wms/inbound/sorted/Sorted.js")
);
const AddSorted = React.lazy(() =>
  import("./screens/wms/inbound/sorted/AddSorted.js")
);
const Shortage = React.lazy(() =>
  import("./screens/wms/inbound/shortage/Shortage.js")
);
const AddShortage = React.lazy(() =>
  import("./screens/wms/inbound/shortage/AddShortage.js")
);
const MoreQty = React.lazy(() =>
  import("./screens/wms/inbound/moreqty/MoreQty.js")
);
const AddMoreQty = React.lazy(() =>
  import("./screens/wms/inbound/moreqty/AddMoreQty.js")
);
const ReceivingList = React.lazy(() =>
  import("./screens/wms/inbound/receivinglist/ReceivingList.js")
);
const AddReceivingList = React.lazy(() =>
  import("./screens/wms/inbound/receivinglist/AddReceivingList.js")
);
// Inventory
const Inventory = React.lazy(() =>
  import("./screens/wms/inventory/Inventory.js")
);
const EmptyBin = React.lazy(() =>
  import("./screens/wms/inventory/emptybin/EmptyBin.js")
);

const BinList = React.lazy(() =>
  import("./screens/wms/inventory/binlist/BinList.js")
);
const OccupiedBin = React.lazy(() =>
  import("./screens/wms/inventory/occupiedbin/OccupiedBin.js")
);
const CycleCount = React.lazy(() =>
  import("./screens/wms/inventory/cyclecount/CycleCount.js")
);
const CountRecorder = React.lazy(() =>
  import("./screens/wms/inventory/countrecorder/CountRecorder.js")
);
const SingleCount = React.lazy(() =>
  import("./screens/wms/inventory/singlecount/SingleCount.js")
);
const SingleCountRecorder = React.lazy(() =>
  import(
    "./screens/wms/inventory/singleCountRecorder/SingleCountRecorder.js"
  )
);
//Analytics
const Report = React.lazy(() =>
  import("./screens/analytics/reports/Report.js")
);
const MisDetailedReport = React.lazy(() =>
  import("./screens/analytics/reports/MisDetailedReport/MisDetailedReport.js")
);
const LocalRunsheetReport = React.lazy(() =>
  import("./screens/analytics/reports/RunsheetReport/LocalRunsheetReport.js")
);
const IncomingDetailReport = React.lazy(() =>
  import(
    "./screens/analytics/reports/IncomingDetailReport/IncomingDetailReport.js"
  )
);
const VendorReport = React.lazy(() =>
  import("./screens/analytics/reports/VendorReport/VendorReport.js")
);
const BranchReport = React.lazy(() =>
  import("./screens/analytics/reports/BranchReport/BranchReport.js")
);
const ColoaderReport = React.lazy(() =>
  import("./screens/analytics/reports/ColoaderReport/ColoaderReport.js")
);
const WeightDiffReport = React.lazy(() =>
  import("./screens/analytics/reports/WeightDiffReport/WeightDiffReport.js")
);

const AirportOrderReport = React.lazy(() =>
  import("./screens/analytics/reports/AirportOrderReport/AirportOrderReport.js")
);
const UserReport = React.lazy(() =>
  import("./screens/analytics/reports/UserReport/UserReport.js")
);

const PendingStatusReport = React.lazy(() =>
  import(
    "./screens/analytics/reports/PendingStatusReport/PendingStatusReport.js"
  )
);

// EMS
const LoginDetails = React.lazy(() =>
  import("./screens/ems/loginDetails/LoginDetails.js")
);
const Users = React.lazy(() => import("./screens/ems/users/Users.js"));
const UserInfo = React.lazy(() => import("./screens/ems/users/UserInfo.js"));
const AddDepertment = React.lazy(() =>
  import("./screens/ems/department/AddDepartment.js")
);
const Department = React.lazy(() =>
  import("./screens/ems/department/Department.js")
);
const Designation = React.lazy(() =>
  import("./screens/ems/designation/Designation.js")
);
const AddDesignation = React.lazy(() =>
  import("./screens/organization/organization/designation/AddDesignation.js")
);
const AddAttendance = React.lazy(() =>
  import("./screens/ems/attendance/userAttendance/AddAttendance.js")
);
const MyAttendance = React.lazy(() =>
  import("./screens/ems/attendance/myAttendance/MyAttendance.js")
);
const MyAttendanceCalenderView = React.lazy(() =>
  import("./screens/ems/attendance/myAttendance/MyAttendanceCalenderView.js")
);
const MyLeaveCalendarView = React.lazy(() =>
  import("./screens/ems/leave/leaveTracker/MyLeaveCalendarView.js")
);
const TodayAttendance = React.lazy(() =>
  import("./screens/ems/attendance/todayAttendance/TodayAttendance.js")
);
//ems leave 
const AddLeave = React.lazy(() =>
  import("./screens/ems/leave/leaveApply/AddLeave.js")
);
const AddLeaveMain = React.lazy(() =>
  import("./screens/ems/leave/leaveApply/AddLeaveMain.js")
);
const ViewLeave = React.lazy(() =>
  import("./screens/ems/leave/leaveApply/ViewLeave.js")
);
const LeaveTracker = React.lazy(() =>
  import("./screens/ems/leave/leaveTracker/LeaveTracker.js")
);
const AddLeaveTracker = React.lazy(() =>
  import("./screens/ems/leave/leaveTracker/AddLeaveTracker.js")
);
const AddLeaveCategory = React.lazy(() =>
  import("./screens/ems/leave/leaveCategory/AddLeaveCategory.js")
);
const PaySlip = React.lazy(() =>
  import("./screens/ems/payroll/payrollSlip/PaySlip.js")
);
const AddPaySlip = React.lazy(() =>
  import("./screens/ems/payroll/payrollSlip/AddPaySlip.js")
);
// training
const AddTraining = React.lazy(() =>
  import("./screens/ems/traning/training/AddTraining.js")
);
const AddTrainingShedule = React.lazy(() =>
  import("./screens/ems/traning/trainingSchedule/AddTrainingShedule.js")
);

//  Accounts

const Ledger = React.lazy(() => import("./screens/accounts/ledger/Ledger.js"));
const AddLedger = React.lazy(() =>
  import("./screens/accounts/ledger/AddLedger.js")
);


const Voucher = React.lazy(() => import("./screens/accounts/voucher/Voucher.js"));
const AddVoucher = React.lazy(() =>
  import("./screens/accounts/voucher/AddVoucher.js")
);
const VoucherPdf = React.lazy(() =>
  import("./screens/accounts/voucher/voucherPdf/VoucherPdf.js")
);


// finance 
// finance // Loan
const Loan = React.lazy(() => import("./screens/finance/loan/Loan.js"));
const AddLoan = React.lazy(() => import("./screens/finance/loan/AddLoan.js"));

const CardMaster = React.lazy(() =>
  import("./screens/finance/cardmaster/CardMaster.js")
);
const AddCardMaster = React.lazy(() =>
  import("./screens/finance/cardmaster/AddCardMaster.js")
);

const Advance = React.lazy(() => import("./screens/finance/advances/Advance.js"));
const AddAdvance = React.lazy(() => import("./screens/finance/advances/AddAdvance.js"));

const Expense = React.lazy(() => import("./screens/finance/expenses/Expense.js"));
const AddExpense = React.lazy(() => import("./screens/finance/expenses/AddExpense.js"));

const BankAccountMaster = React.lazy(() =>
  import("./screens/finance/bankaccountmaster/BankAccountMaster.js")
);
const AddBankAccountMaster = React.lazy(() =>
  import("./screens/finance/bankaccountmaster/AddBankAccountMaster.js")
);
const AccountSubGroupMaster = React.lazy(() =>
  import("./screens/finance/accountsubgroupmaster/AccountSubGroupMaster.js")
);
const AddAccountSubGroupMaster = React.lazy(() =>
  import("./screens/finance/accountsubgroupmaster/AddAccountSubGroupMaster.js")
);


const FundMaster = React.lazy(() =>
  import("./screens/finance/fundmaster/FundMaster.js")
);
const AddFundMaster = React.lazy(() =>
  import("./screens/finance/fundmaster/AddFundMaster.js")
);

//Profile

const Profile = React.lazy(() =>
  import("./screens/authentication/userProfile/Profile.js")
);
//vehicle
const Model = React.lazy(() => import("./screens/vms/vehicleModel/Model.js"));
const AddModel = React.lazy(() =>
  import("./screens/vms/vehicleModel/AddModel.js")
);
const AddVehicleEngine = React.lazy(() =>
  import("./screens/vms/vehicleEngine/AddVehicleEngine.js")
);
const AddVehicleDimension = React.lazy(() =>
  import("./screens/vms/vehicleDimension/AddVehicleDimension.js")
);
const AddModelPerformance = React.lazy(() =>
  import("./screens/vms/VehicleModelPerformance/AddModelPerformance.js")
);
const AddModelFuelEconomy = React.lazy(() =>
  import("./screens/vms/VehicleModelFuelEconomy/AddModelFuelEconomy.js")
);
const AddModelWeight = React.lazy(() =>
  import("./screens/vms/vehicleModelWeight/AddModelWeight.js")
);
const AddVehicleInspection = React.lazy(() =>
  import("./screens/vms/vehicleInspection/AddVehicleInspection.js")
);
const AddVehicleTransmission = React.lazy(() =>
  import("./screens/vms/vehicleTransmission/AddVehicleTransmission.js")
);
const AddVehicleWheel = React.lazy(() =>
  import("./screens/vms/vehicleWheels/AddVehicleWheel.js")
);

// Calendar

//vms
const Vehicle = React.lazy(() => import("./screens/vms/Vehicle/Vehicle.js"));
const AddVehicle = React.lazy(() =>
  import("./screens/vms/Vehicle/AddVehicle.js")
);
// const Tabs = React.lazy(() => import("./screens/vms/Vehicle/Tab/Tabs.js"));
const ModelTabs = React.lazy(() => import("./screens/vms/Vehicle/Tab/ModelTabs.js"));
const VehicleTabs = React.lazy(() => import("./screens/vms/Vehicle/Tab/VehicleTabs.js"));

//Trip
const TripTab = React.lazy(() =>
  import("./screens/trip/trip/TripTab.js")
);
const AllVehicle = React.lazy(() =>
  import("./screens/trip/trip/AllVehicle.js")
);
const Transporter = React.lazy(() =>
  import("./screens/trip/transporter/Transporter.js")
);
const AddTransporter = React.lazy(() =>
  import("./screens/trip/transporter/AddTransporter.js")
);

//hired
const HiredDetails = React.lazy(() =>
  import("./screens/trip/hiredDetails/HiredDetails.js")
);

// Master
const Assets = React.lazy(() => import("./screens/master/assets/Assets.js"));

const City = React.lazy(() => import("./screens/master/locations/City.js"));

const AddCity = React.lazy(() =>
  import("./screens/master/locations/AddCity.js")
);

const Pincode = React.lazy(() =>
  import("./screens/master/locations/Pincode.js")
);

const AddPincode = React.lazy(() =>
  import("./screens/master/locations/AddPincode.js")
);

const AssetHistoryPage = React.lazy(() =>
  import("./screens/master/assets/assetHistory/AssetHistoryPage.js")
);

const AssigneBranch = React.lazy(() =>
  import("./screens/master/assets/AssigneBranch.js")
);

const AssetsCallibration = React.lazy(() =>
  import("./screens/master/assets/AssetsCallibration.js")
);

const AddAsset = React.lazy(() =>
  import("./screens/master/assets/AddAsset.js")
);

const Commodities = React.lazy(() =>
  import("./screens/master/commodities/Commodities.js")
);

const AddCommodity = React.lazy(() =>
  import("./screens/master/commodities/AddCommodity.js")
);

const UpateCommodityType = React.lazy(() =>
  import("./screens/master/commodities/UpadteCommodityType.js")
);

const CommodityHistoryPage = React.lazy(() =>
  import(
    "./screens/master/commodities/commodityHistory/CommodityHistoryPage.js"
  )
);

const Charges = React.lazy(() => import("./screens/master/charges/Charges.js"));

const AddCharge = React.lazy(() =>
  import("./screens/master/charges/AddCharge.js")
);

const ChargeHistoryPage = React.lazy(() =>
  import("./screens/master/charges/chargesHistory/ChargeHistoryPage.js")
);

const BillTos = React.lazy(() => import("./screens/master/billtos/BillTos.js"));

const AddBillTo = React.lazy(() =>
  import("./screens/master/billtos/AddBillTo.js")
);
const BilltoHistoryPage = React.lazy(() => import("./screens/master/billtos/billtoHistory/BilltoHistoryPage.js"));

const AddClient = React.lazy(() =>
  import("./screens/master/customers/AddClient.js")
);
// TO Import City TO City Billing Info
const ImportCityData = React.lazy(() =>
  import("./screens/master/customers/ImportCityData.js")
);

// To Import Local Billing Data
const ImportLocalAssoData = React.lazy(() =>
  import("./screens/master/customers/ImportLocalAssoData.js")
);

const Branches = React.lazy(() =>
  import("./screens/master/branches/Branches.js")
);

const AddBranch = React.lazy(() =>
  import("./screens/master/branches/AddBranch.js")
);

const BranchHistoryPage = React.lazy(() =>
  import("./screens/master/branches/branchHistory/BranchHistoryPage.js")
);

const Locations = React.lazy(() =>
  import("./screens/master/locations/Locations.js")
);

const AddLocation = React.lazy(() =>
  import("./screens/master/locations/AddLocation.js")
);
const LocationHistoryPage = React.lazy(() =>
  import("./screens/master/locations/locationHistory/LocationHistoryPage.js")
);

const Routes = React.lazy(() => import("./screens/master/route/Routes.js"));

const AddRoute = React.lazy(() => import("./screens/master/route/AddRoute.js"));
const RouteHistoryPage = React.lazy(() =>
  import("./screens/master/route/routeHistory/RouteHistoryPage.js")
);

const Vendor = React.lazy(() => import("./screens/master/vendor/Vendor.js"));
const UpateCompanyType = React.lazy(() =>
  import("./screens/master/vendor/UpadteCompanyType.js")
);

const AddVendor = React.lazy(() =>
  import("./screens/master/vendor/AddVendor.js")
);
const VendorHistoryPage = React.lazy(() =>
  import("./screens/master/vendor/vendorHistory/VendorHistoryPage.js")
);

const OrderOrigins = React.lazy(() =>
  import("./screens/master/orderOrigins/OrderOrigins.js")
);

const AddOrderOrigin = React.lazy(() =>
  import("./screens/master/orderOrigins/AddOrderOrigin.js")
);

const OrderOriginsHistoryPage = React.lazy(() =>
  import(
    "./screens/master/orderOrigins/orderOriginsHistory/OrderOriginsHistoryPage.js"
  )
);

const Organization = React.lazy(() =>
  import("./screens/organization/organization/Organization.js")
);
//For History Page in organization
const OrganizationHistoryPage = React.lazy(() =>
  import(
    "./screens/organization/organization/organizationHistory/OrganizationHistoryPage.js"
  )
);

const AddOrganization = React.lazy(() =>
  import("./screens/organization/organization/AddOrganization.js")
);
const AddHoliday = React.lazy(() =>
  import("./screens/organization/organization/holidays/AddHoliday.js")
);
const Holidays = React.lazy(() =>
  import("./screens/organization/organization/holidays/Holiday.js")
);
const HolidayMain = React.lazy(() =>
  import("./screens/organization/organization/holidays/HolidayMain.js")
);
const SalaryParameter = React.lazy(() =>
  import("./screens/organization/organization/salaryParameter/SalaryParameter.js")
);
const AddSalaryParameter = React.lazy(() =>
  import("./screens/organization/organization/salaryParameter/AddSalaryParameter.js")
);
const SalaryComponent = React.lazy(() =>
  import("./screens/organization/organization/salaryComponent/SalaryComponent.js")
);
const AddSalaryComponent = React.lazy(() =>
  import("./screens/organization/organization/salaryComponent/AddSalaryComponent.js")
);

// HR
const OnBoardEmployee = React.lazy(() =>
  import("./screens/hr/onBoardEmployee/OnBoardEmployee.js")
);
const Employee = React.lazy(() =>
  import("./screens/hr/employees/Employee.js")
);
const JobList = React.lazy(() =>
  import("./screens/hr/recruitment/jobAdvertisements/JobList.js")
);
const JobAdvertisements = React.lazy(() =>
  import("./screens/hr/recruitment/jobAdvertisements/JobAdvertisements.js")
);
const JobApplications = React.lazy(() =>
  import("./screens/hr/recruitment/jobApplications/JobApplications.js")
);



// Booking
const Orders = React.lazy(() => import("./screens/booking/orders/Orders.js"));

const AddOrder = React.lazy(() =>
  import("./screens/booking/orders/AddOrder.js")
);
const AddDocketStatus = React.lazy(() =>
  import("./screens/booking/docketstatus/AddDocketStatus.js")
);

const OrderInvoicePdf = React.lazy(() =>
  import("./screens/booking/orders/OrderInvoicePdf.js")
);
const OrderPdf = React.lazy(() =>
  import("./screens/booking/orders/OrderPdf.js")
);

const OrderHistoryPage = React.lazy(() =>
  import("./screens/booking/orders/orderHistory/OrderHistoryPage.js")
);

const AirportOrder = React.lazy(() =>
  import("./screens/booking/airportOrder/AirportOrder.js")
);
const AddAirportOrder = React.lazy(() =>
  import("./screens/booking/airportOrder/AddAirportOrder.js")
);

//Delivery Info

const DeliveryInfo = React.lazy(() =>
  import("./screens/booking/deliveryInfo/DeliveryInfo.js")
);

const UpdateDeliveryInfo = React.lazy(() =>
  import("./screens/booking/deliveryInfo/UpdateDeliveryInfo.js")
);

//Order Checking page
const OrderCheckingPage = React.lazy(() =>
  import("./screens/booking/orderCheckingPage/OrderCheckingPage.js")
);

// Runsheet
const IncomingRunsheetHub = React.lazy(() =>
  import("./screens/runsheet/incomingRunsheet/IncomingRunsheetHub.js")
);
const HubRunsheet = React.lazy(() =>
  import("./screens/runsheet/HubRunsheet.js")
);
const AllRunsheet = React.lazy(() =>
  import("./screens/runsheet/AllRunsheet.js")
);
const PendingToDelivery = React.lazy(() =>
  import("./screens/runsheet/pendingToDelivery/PendingToDelivery.js")
);
const ChangedRusheet = React.lazy(() =>
  import("./screens/runsheet/ChangedRunsheet.js")
);

const CreateRunsheet = React.lazy(() =>
  import("./screens/runsheet/pendingToDelivery/CreateRunsheet.js")
);

const RunsheetPDF = React.lazy(() =>
  import("./screens/runsheet/runsheetPdf/RunsheetPDF.js")
);

//  Manifests
const PendingForDispatch = React.lazy(() =>
  import("./screens/manifest/pendingfordispatch/PendingForDispatch.js")
);
const Forwarding = React.lazy(() =>
  import("./screens/manifest/forwardmanifest/Forwarding.js")
);
const AddForwarding = React.lazy(() =>
  import("./screens/manifest/forwardmanifest/AddForward.js")
);
const ManifestPdf = React.lazy(() =>
  import("./data/manifests/pendingForDispatch/manifests/ManifestPdf.js")
);
const UpdateManifest = React.lazy(() =>
  import("./screens/manifest/updateManifest/UpdateManifest.js")
);
const PendingDepart = React.lazy(() =>
  import("./screens/manifest/pendingDepart/PendingDepart.js")
);
const PendingDepartVehicle = React.lazy(() =>
  import("./screens/manifest/pendingDepart/PendingDepartVehicle.js")
);
const IncomingManifest = React.lazy(() =>
  import("./screens/manifest/incomingManifest/IncomingManifest.js")
);

const EditManifest = React.lazy(() =>
  import("./screens/manifest/editManifest/EditManifest.js")
);
const EditRoughDocket = React.lazy(() =>
  import("./screens/manifest/editManifest/EditRoughDocket.js")
);

const EditHubDocket = React.lazy(() =>
  import("./screens/manifest/editHub/EditHubDocket.js")
);

const AddHubAir = React.lazy(() =>
  import("./screens/manifest/hubAirForward/AddHubAir.js")
);

const HubAirForwarding = React.lazy(() =>
  import("./screens/manifest/hubAirForward/HubAirForwarding.js")
);

const AddHubVehicle = React.lazy(() =>
  import("./screens/manifest/hubVehicleForward/AddHubVehicle.js")
);

const HubVehicleForwarding = React.lazy(() =>
  import("./screens/manifest/hubVehicleForward/HubVehicleForwarding.js")
);

const BreakManifest = React.lazy(() =>
  import("./screens/manifest/recieveManifest/BreakManifest.js")
);
const BreakHubManifest = React.lazy(() =>
  import("./screens/manifest/recieveHubManifest/BreakHubManifest.js")
);
const EditHub = React.lazy(() =>
  import("./screens/manifest/editHub/EditHub.js")
);
const ReciveManifest = React.lazy(() =>
  import("./screens/manifest/recieveManifest/ReciveManifest.js")
);
const RecieveHubManifest = React.lazy(() =>
  import("./screens/manifest/recieveHubManifest/ReciveHubManifest.js")
);
const RecieveHub = React.lazy(() =>
  import("./screens/manifest/incomingManifest/IncomingHub.js")
);
const AllManifest = React.lazy(() =>
  import("./screens/manifest/allmanifest/AllManifest.js")
);
const RoughManifestPdf = React.lazy(() =>
  import("./data/manifests/roughManifest/ManifestPdf.js")
);
const BranchForwarding = React.lazy(() =>
  import("./screens/manifest/forwardbranchmanifest/BranchForwarding.js")
);
const PdfBranchForward = React.lazy(() =>
  import("./data/manifests/branchManifest/BranchManifestPdf.js")
);
const AddBranchForward = React.lazy(() =>
  import("./screens/manifest/forwardbranchmanifest/AddBranchForward.js")
);

const DocketIssue = React.lazy(() =>
  import("./screens/booking/docketIssue/DocketIssue.js")
);
const AddDocketIssue = React.lazy(() =>
  import("./screens/booking/docketIssue/AddDocketIssue.js")
);

// Manifest Ended
// Billing
const BillCloseds = React.lazy(() =>
  import("./screens/billing/billClosed/BillCloseds.js")
);
const AddBillClosed = React.lazy(() =>
  import("./screens/billing/billClosed/AddBillClosed.js")
);
const Waraies = React.lazy(() => import("./screens/billing/warai/Waraies.js"));
const AddWarai = React.lazy(() =>
  import("./screens/billing/warai/AddWarai.js")
);
const Invoices = React.lazy(() =>
  import("./screens/billing/invoice/Invoices.js")
);
const AddInvoice = React.lazy(() =>
  import("./screens/billing/invoice/AddInvoice.js")
);
const InvoicePdf = React.lazy(() =>
  import("./screens/billing/invoice/invoicePdf/InvoicePdf.js")
);

//For History Page in commodity
const HistoryPage = React.lazy(() =>
  import("./screens/utilities/historyPage/HistoryPage.js")
);

// Trackin Order Page
const TrackingOrder = React.lazy(() =>
  import("./screens/track/trackingPage/TrackingOrder.js")
);
//order
const OrderDetails = React.lazy(() =>
  import("./screens/dashboard/DashboardTypes/OrderDetails.js")
);
const BranchDailyDetails = React.lazy(() =>
  import("./screens/dashboard/DashboardTypes/BranchDailyDetails.js")
);
//test
const Sample = React.lazy(() => import("./screens/dashboard/Sample.js"));

// Calender
const Calender = React.lazy(() =>
  import("./screens/dashboard/Calendar/Calendar.js")
);
//Notification
const Notification = React.lazy(() =>
  import("./screens/dashboard/Notification/Notification.js")
);

//Timeline
const Notifications = React.lazy(() =>
  import("./screens/dashboard/Timeline/Timelinenotification.js")
);

const Pickedup = React.lazy(() =>
  import("./screens/manifest/incomingVehcile/PickedUp.js")
);
const BoxDetail = React.lazy(() => import("./screens/manifest/incomingVehcile/BoxDetail.js"))
// Routes

// eway bill
// eway bill
const EloginIn = React.lazy(() => import("./screens/ewayBill/EwayBill.js"));
const EDashboard = React.lazy(() => import("./screens/ewayBill/dashboard/Dashboard.js"));
const DocEwayBill = React.lazy(() => import("./screens/ewayBill/docketEwaybill/DocketEway.js"))
const NotUpdatedDocketEway = React.lazy(() => import("./screens/ewayBill/docketEwaybill/NotUpdatedDocketEway.js"))
// const Vehcile=React.lazy(()=>import("./screens/master/vehcile/vehcile.js"))
// const AddVehcile=React.lazy(()=>import("./screens/master/vehcile/add_Vehcile.js"))
const Extent_eway = React.lazy(() => import("./screens/ewayBill/ewayTable/EwbExpiredYesterday.js"))
const Assign_eway = React.lazy(() => import("./screens/ewayBill/ewayTable/AssignedEwayBill.js"))
// const CheckerMaster= React.lazy(()=>import ("./screen"))
const Part_b = React.lazy(() => import("./screens/ewayBill/ewayTable/PendingPartB.js"))
// Miscellaneous
const Miscellaneous = React.lazy(() => import("./screens/miscellaneous/Miscellaneous.js"));



const auth_routes = [
  { path: "/signin", element: <SignIn /> },
  { path: "/", exact: true, element: <Navigate to="/signin" /> },
  { path: "/dashboard", element: <Navigate to="/signin" /> },
  { path: "/resetpassword", element: <ResetPassword /> },
  // { path: "/forgetpassword", element: <ForgetPassword /> },
  {
    path: "/track/trackingPage/TrackingOrder", element: <TrackingOrder />,
  },
];

const routes = [
  { path: "/signin", element: <Navigate to="/dashboard" /> },
  { path: "/", element: <Navigate to="/dashboard" /> },
  { path: "/dashboard", element: <Dashboard /> },

  { path: "/404", element: <Page_Not_Found /> },
  { path: "*", element: <Navigate to="/404" replace /> },

  // Test
  {
    path: "/test",
    element: <Test />,
  },
  {
    path: "/order/boxdetail",
    element: <BoxDetail />,
  },
  {
    path: "/testImport",
    element: <TestImport />,
  },

  //Warehose
  {
    path: "/wms/warehouse/Warehouse",
    element: <Warehouse />,
  },
  {
    path: "/wms/warehouse/AddWarehouse",
    element: <AddWarehouse />,
  },


  //BinDetails
 
  {
    path: "/wms/bindetails/BinDetails",
    element: <BinDetails />,
  },
  {
    path: "/wms/bindetails/BinDetailsTab",
    element: <BinDetailsTab />,
  },
  {
    path: "/wms/bindetails/binset/AddBinSet",
    element: <AddBinSet />,
  },
  {
    path: "/wms/bindetails/binset/BinSet",
    element: <BinSet />,
  },
  {
    path: "/wms/bindetails/binsize/BinSize",
    element: <BinSize />,
  },
  {
    path: "/wms/bindetails/binsize/AddBinSize",
    element: <AddBinSize />,
  },

  {
    path: "/wms/bindetails/binproperty/BinProperty",
    element: <BinProperty />,
  },
  {
    path: "/wms/bindetails/binproperty/AddBinProperty",
    element: <AddBinProperty />,
  },
  //Outbound
  {
    path: "/Outbound",
    element: <Outbound />,
  },
  {
    path: "/wms/outbound/dn/AddDn",
    element: <AddDn />,
  },
  {
    path: "/wms/Outbound/Preorder",
    element: <PreOrder />,
  },
  {
    path: "/wms/Outbound/Preorder/addpreorder",
    element: <AddPreOrder />,
  },
  {
    path: "/wms/Outbound/neworder/NewOrder",
    element: <NewOrder />,
  },
  {
    path: "/wms/Outbound/neworder/AddNewOrder",
    element: <AddNewOrder />,
  },
  {
    path: "/wms/Outbound/backorder/BackOrder",
    element: <BackOrder />,
  },
  {
    path: "/wms/Outbound/backorder/AddBackOrder",
    element: <AddBackOrder />,
  },
  {
    path: "/wms/Outbound/prepick/PrePick",
    element: <PrePick />,
  },
  {
    path: "/wms/Outbound/prepick/AddPrePick",
    element: <AddPrePick />,
  },
  {
    path: "/wms/Outbound/Picked/Picked",
    element: <Picked />,
  },
  {
    path: "/wms/Outbound/neworder/AddPicked",
    element: <AddPicked />,
  },
  {
    path: "/wms/Outbound/pickinglist/PickingList",
    element: <PickingList />,
  },
  {
    path: "/wms/Outbound/pickinglist/AddPickingList",
    element: <AddPickingList />,
  },
  {
    path: "/wms/Outbound/shippinglist/ShippingList",
    element: <ShippingList />,
  },
  {
    path: "/wms/Outbound/shippinglist/AddShippingList",
    element: <AddShippingList />,
  },
  {
    path: "/wms/Outbound/proofofdelivery/ProofOfDelivery",
    element: <ProofOfDelivery />,
  },
  {
    path: "/wms/Outbound/proofofdelivery/AddProofOfDelivery",
    element: <AddProofOfDelivery />,
  },
  //Inbound
  {
    path: "/Inbound",
    element: <Inbound />,
  },
  {
    path: "/Inbound/wms/Inbound/asn/AddAsn",
    element: <AddAsn />,
  },
  {
    path: "/wms/Inbound/Predelivery/PreDelivery",
    element: <PreDelivery />,
  },
  {
    path: "/wms/Inbound/Predelivery/AddPreDelivery",
    element: <AddPreDelivery />,
  },
  {
    path: "/wms/Inbound/preload/PreLoad",
    element: <PreLoad />
  },
  {
    path: "/wms/Inbound/preload/AddPreLoad",
    element: <AddPreLoad />
  },
  {
    path: "/wms/Inbound/sorting/Sorting",
    element: <Sorting />
  },
  {
    path: "/wms/Inbound/sorting/AddSorting",
    element: <AddSorting />
  },
  {
    path: "/wms/Inbound/sorted/Sorted",
    element: <Sorted />
  },
  {
    path: "/wms/Inbound/sorted/AddSorted",
    element: <AddSorted />
  },
  {
    path: "/wms/Inbound/shortage/Shortage",
    element: <Shortage />
  },
  {
    path: "/wms/Inbound/shortage/AddShortage",
    element: <AddShortage />
  },
  {
    path: "/wms/Inbound/moreqty/MoreQty",
    element: <MoreQty />
  },
  {
    path: "/wms/Inbound/moreqty/AddMoreQty",
    element: <AddMoreQty />
  },
  {
    path: "/wms/Inbound/receivinglist/ReceivingList",
    element: <ReceivingList />
  },
  {
    path: "/wms/Inbound/receivinglist/AddReceivingList",
    element: <AddReceivingList />
  },
  //Inventory
  {
    path: "/Inventory",
    element: <Inventory />,
  },
  {
    path: "/wms/inventory/binlist",
    element: <BinList />,
  },
  {
    path: "/wms/inventory/OccupiedBin",
    element: <OccupiedBin />,
  },
  {
    path: "/wms/inventory/CycleCount",
    element: <CycleCount />,
  },
  {
    path: "/wms/inventory/CountRecorder",
    element: <CountRecorder />,
  },
  {
    path: "/wms/inventory/SingleCount",
    element: <SingleCount />,
  },
  {
    path: "/wms/inventory/emptybin",
    element: <EmptyBin />,
  },
  {
    path: "/wms/inventory/SingleCountRecorder",
    element: <SingleCountRecorder />,
  },
  // Ems
  {
    path: "/ems/logindetails/logindetails",
    element: <LoginDetails />,
  },
  {
    path: "/ems/users",
    element: <Users />,
  },
  {
    path: "/ems/adminChangePassword",
    element: <AdminChangePassword />,
  },
  {
    path: "/elogin",
    element: <EloginIn />,
  },
  {
    path: "/ems/users/Userinfo",
    element: <UserInfo />,
  },
   
  // for ems attdndance
  {
    path: "/attendance/userAttendance/AddAttendance",
    element: <AddAttendance />,
  },
  {
    path: "/attendance/myAttendance/MyAttendance",
    element: <MyAttendance />,
  },
  {
    path: "/ems/attendance/myAttendance/MyAttendanceCalenderView",
    element: <MyAttendanceCalenderView />,
  },
  {
    path: "/ems/leave/leaveTracker/MyLeaveCalendarView",
    element: <MyLeaveCalendarView />,
  },
  {
    path: "/attendance/todayAttendance/TodayAttendance",
    element: <TodayAttendance />,
  },
  // for ems leave 
  {
    path: "/ems/leave",
    element: <AddLeaveMain />,
  },
  {
    path: "/ems/leave/AddLeave",
    element: <AddLeave />,
  },
  {
    path: "/ems/leave/ViewLeave",
    element: <ViewLeave />,
  },
  {
    path: "/ems/leave/leaveTracker",
    element: <LeaveTracker />,
  },
  {
    path: "/ems/leave/AddLeaveTracker",
    element: <AddLeaveTracker />,
  },
  {
    path: "/ems/payroll/PaySlip",
    element: <PaySlip />,
  },
  {
    path: "/ems/payroll/AddPaySlip",
    element: <AddPaySlip />,
  },
  {
    path: "/ems/traning/AddTraining",
    element: <AddTraining />,
  },
  {
    path: "/ems/traning/AddTrainingShedule",
    element: <AddTrainingShedule />,
  },
  // Account 
  //  Accounts
  {
    path: "/account/ledger",
    element: <Ledger />,
  },
  {
    path: "/accounts/ledger/AddLedger",
    element: <AddLedger />,
  },
  {
    path: "/accounts/voucher/Voucher",
    element: <Voucher />,
  },
  {
    path: "/accounts/voucher/AddVoucher",
    element: <AddVoucher />,
  },
  {
    path: "/accounts/voucher/VoucherPdf",
    element: <VoucherPdf />,
  },

  // {
  //   path: "/master/Vehcile",
  //   element: <Vehcile />,
  // },
  // {
  //   path: "/master/Add_Vehcile",
  //   element: <AddVehcile/>,
  // },
  {
    path: "/organization/AddDepartment",
    name: "AddDepartment",
    element: <AddDepertment />,
  },
  {
    path: "/organization/Department",
    name: "Department",
    element: <Department />,
  },
  {
    path: "/organization/designation",
    name: "Designation",
    element: <Designation />,
  },
  {
    path: "/organization/designation/adddesignation",
    name: "Adddesignation",
    element: <AddDesignation />,
  },
  // Eway Bill Path Defined
  {
    path: "/ewaybill/docketEwayBill",
    element: <DocEwayBill />,
  },
  {
    path: "/ewaybill/notupdateddocketEwayBill",
    element: <NotUpdatedDocketEway />,
  },
  {
    path: "/ewaybill/pendingPartB",
    element: <Part_b />,
  },
  {
    path: "/ewaybill/extendEway",
    element: <Extent_eway />,
  },
  {
    path: "/ewaybill/dashboard",
    element: <EDashboard />,
  },
  {
    path: "/ewaybill/assignedEwaybill",
    element: <Assign_eway />,
  },
  //veicle model
  {
    path: "/vehicleModel/Model",
    element: <Model />,
  },
  {
    path: "/vehicleModel/AddModel",
    element: <AddModel />,
  },
  {
    path: "/vehicleEngine/AddVehicleEngine",
    element: <AddVehicleEngine />,
  },
  {
    path: "/vehicleDimension/AddVehicleDimension",
    element: <AddVehicleDimension />,
  },
  {
    path: "/VehicleModelPerformance/AddModelPerformance",
    element: <AddModelPerformance />,
  },
  {
    path: "/VehicleModelFuelEconomy/AddModelFuelEconomy",
    element: <AddModelFuelEconomy />,
  },
  {
    path: "/vehicleModelWeight/AddModelWeight",
    element: <AddModelWeight />,
  },
  {
    path: "/vehicleInspection/AddVehicleInspection",
    element: <AddVehicleInspection />,
  },
  {
    path: "/vehicleTransmission/AddVehicleTransmission",
    element: <AddVehicleTransmission />,
  },
  {
    path: "/vehicleWheels/AddVehicleWheel",
    element: <AddVehicleWheel />,
  },

  // Reports
  {
    path: "/analytics/reports",
    element: <Report />,
  },
  {
    path: "/analytics/reports/MisDetailedReport",
    element: <MisDetailedReport />,
  },
  {
    path: "/analytics/reports/IncomingDetailReport",
    element: <IncomingDetailReport />,
  },
  {
    path: "/analytics/reports/VendorReport",
    element: <VendorReport />,
  },
  {
    path: "/analytics/reports/UserReport",
    element: <UserReport />,
  },
  {
    path: "/analytics/reports/BranchReport",
    element: <BranchReport />,
  },
  {
    path: "/analytics/reports/ColoaderReport",
    element: <ColoaderReport />,
  },
  {
    path: "/analytics/reports/WeightDiffReport",
    element: <WeightDiffReport />,
  },
  {
    path: "/analytics/reports/PendingStatusReport",
    element: <PendingStatusReport />,
  },
  {
    path: "/analytics/reports/AirportOrderReport",
    element: <AirportOrderReport />,
  },
  {
    path: "/analytics/reports/RunsheetReport/LocalRunsheetReport",
    element: <LocalRunsheetReport />,
  },

  //vms
  {
    path: "/vms/vehicle/Vehicle",
    element: <Vehicle />,
  },
  {
    path: "/vms/vehicle/add_vehicle",
    element: <AddVehicle />,
  },
  // {
  //   path: "/Vehicle/Tab/Tabs",
  //   element: <Tabs />,
  // },
  {
    path: "/Vehicle/Tab/modelTabs",
    element: <ModelTabs />,
  },
  {
    path: "/Vehicle/Tab/vehicleTabs",
    element: <VehicleTabs />,
  },

  //trip
  {
    path: "/trip/TripTab",
    element: <TripTab />,
  },
  {
    path: "/trip/AllVehicle",
    element: <AllVehicle />,
  },
  {
    path: "/trip/transporter/transporter",
    element: <Transporter />,
  },
  {
    path: "/trip/transporter/add_transporter",
    element: <AddTransporter />,
  },

  //hired
  {
    path: "/trip/hiredDetails/hired_details",
    element: <HiredDetails />,
  },

  // Master
  {
    path: "/master/assets",
    element: <Assets />,
  },
  {
    path: "/master/city",
    element: <City />,
  },
  {
    path: "/master/city/AddCity",
    element: <AddCity />,
  },
  {
    path: "/master/pincode",
    element: <Pincode />,
  },
  {
    path: "/master/pincode/AddPincode",
    element: <AddPincode />,
  },
  {
    path: "/master/assets/assignbranch",
    element: <AssigneBranch />,
  },
  {
    path: "/master/assets/assetscallibration",
    element: <AssetsCallibration />,
  },
  {
    path: "/master/add-asset",
    element: <AddAsset />,
  },
  {
    path: "/assets/assetHistory/AssetHistoryPage",
    element: <AssetHistoryPage />,
  },
  {
    path: "/master/commodities",
    element: <Commodities />,
  },
  {
    path: "/master/commodities/addcommodity",
    element: <AddCommodity />,
  },
  {
    path: "/master/commodities/updatecommoditytype",
    element: <UpateCommodityType />,
  },
  {
    path: "/master/commodities/addcommodities/:id",
    element: <AddCommodity />,
  },
  {
    path: "/master/commodities/commodityHistory/CommodityHistoryPage",
    element: <CommodityHistoryPage />,
  },
  {
    path: "/master/charges",
    element: <Charges />,
  },
  {
    path: "/master/charges/addcharge",
    element: <AddCharge />,
  },
  {
    path: "/master/charges/chargesHistory/ChargeHistoryPage",
    element: <ChargeHistoryPage />,
  },
  {
    path: "/master/billtos",
    element: <BillTos />,
  },
  {
    path: "/master/billtos/addbillto",
    element: <AddBillTo />,
  },
  {
    path: "/master/billtos/billtoHistory/BilltoHistoryPage",
    element: <BilltoHistoryPage />
  },
  {
    path: "/master/clients/addclient",
    element: <AddClient />,
  },
  {
    path: "/customers/ImportCityData",
    element: <ImportCityData />,
  },
  {
    path: "/customers/importlocalassodata",
    element: <ImportLocalAssoData />,
  },
  {
    path: "/master/branches",
    element: <Branches />,
  },
  {
    path: "/master/branches/addbranch",
    element: <AddBranch />,
  },
  {
    path: "/master/branches/branchHistory/BranchHistoryPage",
    element: <BranchHistoryPage />,
  },
  {
    path: "/master/locations",
    element: <Locations />,
  },
  {
    path: "/master/locations/addlocation",
    element: <AddLocation />,
  },
  {
    path: "/locations/locationHistory/LocationHistoryPage",
    element: <LocationHistoryPage />,
  },
  {
    path: "/master/routes",
    element: <Routes />,
  },
  {
    path: "/master/routes/addroute",
    element: <AddRoute />,
  },
  {
    path: "/route/routeHistory/RouteHistoryPage",
    element: <RouteHistoryPage />,
  },
  {
    path: "/master/vendor/Vendor",
    element: <Vendor />,
  },
  {
    path: "/master/vendor/updatecompanytype",
    element: <UpateCompanyType />,
  },
  {
    path: "/master/vendor/AddVendor",
    element: <AddVendor />,
  },
  {
    path: "/master/vendor/vendorHistory/VendorHistoryPage",
    element: <VendorHistoryPage />,
  },
  {
    path: "/master/orderorigins",
    element: <OrderOrigins />,
  },
  {
    path: "/master/orderorigins/addorderorigin",
    element: <AddOrderOrigin />,
  },
  {
    path: "/master/orderOrigins/orderOriginsHistory/OrderOriginsHistoryPage",
    element: <OrderOriginsHistoryPage />,
  },
  {
    path: "/organization/organization",
    element: <Organization />,
  },
  {
    path: "/organization/AddOrganization",
    element: <AddOrganization />,
  },
  {
    path: "/organization/organization/organizationHistory/OrganizationHistoryPage",
    element: <OrganizationHistoryPage />,
  },
  {
    path: "/organization/holidays/HolidayMain",
    element: <HolidayMain />,
  },
  {
    path: "/organization/holidays/HolidayMain",
    element: <HolidayMain />,
  },
  {
    path: "/organization/holidays",
    element: <Holidays />,
  },
  {
    path: "/organization/AddSalaryParameter",
    element: <AddSalaryParameter />,
  },
  {
    path: "/organization/SalaryParameter",
    element: <SalaryParameter />,
  },
  {
    path: "/organization/AddSalaryComponent",
    element: <AddSalaryComponent />,
  },
  {
    path: "/organization/SalaryComponent",
    element: <SalaryComponent />,
  },

  // HR
  {
    path: "/hr/onBoardEmployee/",
    element: <OnBoardEmployee />,
  },
  {
    path: "/hr/Employee",
    element: <Employee />,
  },
  {
    path: "/hr/recruitment/jobAdvertisements/JobList",
    element: <JobList />,
  },
  {
    path: "/hr/recruitment/jobAdvertisements",
    element: <JobAdvertisements />,
  },
  {
    path: "/hr/recruitment/jobApplications",
    element: <JobApplications />,
  },
  // Finance 
  // Loan
  {
    path: "/finance/Loan",
    element: <Loan />,
  },
  {
    path: "/finance/Loan/AddLoan",
    element: <AddLoan />,
  },
  {
    path: "/finance/cardmaster/CardMaster",
    element: <CardMaster />,
  },
  {
    path: "/finance/cardmaster/AddCardMaster",
    element: <AddCardMaster />,
  },
  {
    path: "/finance/advances/Advance",
    element: <Advance />,
  },
  {
    path: "/finance/advances/AddAdvance",
    element: <AddAdvance />,
  },
  {
    path: "/finance/expenses/Expense",
    element: <Expense />,
  },
  {
    path: "/finance/expenses/AddExpense",
    element: <AddExpense />,
  },
  {
    path: "/finance/bankaccountmaster/AddBankAccountMaster",
    element: <AddBankAccountMaster />,
  },
  {
    path: "/finance/bankaccountmaster/BankAccountMaster",
    element: <BankAccountMaster />,
  },
  {
    path: "/finance/accountsubgroupmaster/AccountSubGroupMaster",
    element: <AccountSubGroupMaster />,
  },

  {
    path: "/finance/accountsubgroupmaster/AddAccountSubGroupMaster",
    element: <AddAccountSubGroupMaster />,
  },
  {
    path: "/finance/fundmaster/FundMaster",
    element: <FundMaster />,
  },
  {
    path: "/finance/fundmaster/FundMaster",
    element: <AddFundMaster />,
  },


  // Booking
  {
    path: "/booking/orders",
    element: <Orders />,
  },
  {
    path: "/booking/orders/addorder",
    element: <AddOrder />,
  },
  {
    path: "/booking/orders/OrderInvoicePdf",
    element: <OrderInvoicePdf />,
  },
  {
    path: "/booking/orders/OrderPdf",
    element: <OrderPdf />,
  },
  {
    path: "/booking/orders/orderHistory/OrderHistoryPage",
    element: <OrderHistoryPage />,
  },
  {
    path: "/booking/orders/adddocketstatus",
    element: <AddDocketStatus />,
  },
  {
    path: "/booking/updatedeliveryinfo",
    element: <UpdateDeliveryInfo />,
  },
  {
    path: "/booking/deliveryinfo",
    element: <DeliveryInfo />,
  },

  {
    path: "/booking/airportorder/airportorder",
    element: <AirportOrder />,
  },
  {
    path: "/booking/airportorder/addairportorder",
    element: <AddAirportOrder />,
  },

  //Runsheet
  {
    path: "/runsheet/incomingrunsheet",
    element: <IncomingRunsheetHub />,
  },
  {
    path: "/runsheet/hubrunsheet",
    element: <HubRunsheet />,
  },
  {
    path: "/runsheet/allrunsheet",
    element: <AllRunsheet />,
  },
  {
    path: "/runsheet/pendingdelivery",
    element: <PendingToDelivery />,
  },
  {
    path: "/runsheet/changedrunsheet",
    element: <ChangedRusheet />,
  },
  {
    path: "/runsheet/createdrunsheet",
    element: <CreateRunsheet />,
  },
  {
    path: "/runsheet/runsheetPdf/RunsheetPDF",
    element: <RunsheetPDF />,
  },

  // Manifest
  {
    path: "/manifest/pendingfordispatch",
    element: <PendingForDispatch />,
  },
  {
    path: "/manifest/breakmanifest",
    element: <BreakManifest />,
  },
  {
    path: "/manifest/updatemanifest",
    element: <UpdateManifest />,
  },
  {
    path: "/manifest/breakhubmanifest",
    element: <BreakHubManifest />,
  },
  {
    path: "/manifest/pickeduporders",
    element: <Pickedup />,
  },
  {
    path: "/manifest/roughmanifest",
    element: <Forwarding />,
  },
  {
    path: "/manifest/branchforward",
    element: <AddBranchForward />,
  },
  {
    path: "/manifest/branchmanifest",
    element: <BranchForwarding />,
  },
  {
    path: "/manifest/branch_pdf",
    element: <PdfBranchForward />,
  },
  {
    path: "/manifest/forward",
    element: <AddForwarding />,
  },
  {
    path: "/manifest/manifestPdf",
    element: <ManifestPdf />,
  },
  {
    path: "/manifest/pendingtodepart",
    element: <PendingDepart />,
  },
  {
    path: "/manifest/pendingtodepartvehicle",
    element: <PendingDepartVehicle />,
  },
  {
    path: "/manifest/incomingmanifest",
    element: <IncomingManifest />,
  },
  {
    path: "/manifest/editmanifest",
    element: <EditManifest />,
  },
  {
    path: "/manifest/editraughdocket",
    element: <EditRoughDocket />,
  },
  {
    path: "/manifest/edithubdocket",
    element: <EditHubDocket />,
  },
  {
    path: "/manifest/edithub",
    element: <EditHub />,
  },
  {
    path: "/manifest/recieve_hub_manifest",
    element: <RecieveHubManifest />,
  },
  {
    path: "/manifest/incominghub",
    element: <RecieveHub />,
  },
  {
    path: "/manifest/recieve_manifest",
    element: <ReciveManifest />,
  },
  {
    path: "/manifest/allmanifest",
    element: <AllManifest />,
  },
  {
    path: "/manifest/roughmanfest",
    element: <RoughManifestPdf />,
  },

  {
    path: "/manifest/addhubair",
    element: <AddHubAir />,
  },

  {
    path: "/manifest/hubairforward",
    element: <HubAirForwarding />,
  },
  {
    path: "/manifest/addhubvehicle",
    element: <AddHubVehicle />,
  },
  {
    path: "/manifest/hubvehicleforward",
    element: <HubVehicleForwarding />,
  },
  {
    path: "/booking/docketIssue/DocketIssue",
    element: <DocketIssue />,
  },
  {
    path: "/booking/docketIssue/AddDocketIssue",
    element: <AddDocketIssue />,
  },

  // Billings
  {
    path: "/billing/billclosed",
    element: <BillCloseds />,
  },
  {
    path: "/billing/billclosed/addbillclosed",
    element: <AddBillClosed />,
  },
  {
    path: "/billing/waraies",
    element: <Waraies />,
  },
  {
    path: "/billing/waraies/addwarai",
    element: <AddWarai />,
  },
  {
    path: "/billing/invoices",
    element: <Invoices />,
  },
  {
    path: "/billing/invoices/addinvoice",
    element: <AddInvoice />,
  },
  {
    path: "/billing/invoices/invoice_pdf",
    element: <InvoicePdf />,
  },
  {
    path: "/utilities/historyPage/HistoryPage",
    element: <HistoryPage />,
  },

  // Billings
  {
    path: "/billing/billclosed",
    element: <BillCloseds />,
  },
  {
    path: "/billing/billclosed/addbillclosed",
    element: <AddBillClosed />,
  },
  {
    path: "/billing/waraies",
    element: <Waraies />,
  },
  {
    path: "/billing/waraies/addwarai",
    element: <AddWarai />,
  },
  {
    path: "/billing/invoices",
    element: <Invoices />,
  },
  {
    path: "/billing/invoices/addinvoice",
    element: <AddInvoice />,
  },
  {
    path: "/billing/invoices/invoice_pdf",
    element: <InvoicePdf />,
  },

  {
    path: "/Sample",
    element: <Sample />,
  },
  {
    path: "/orderCheckingPage/OrderCheckingPage",
    element: <OrderCheckingPage />,
  },
  {
    path: "/dashboard/DashboardTypes/OrderDetails",
    element: <OrderDetails />,
  },

  {
    path: "/DashboardTypes/BranchDailyDetails",
    element: <BranchDailyDetails />,
  },
  {
    path: "/authentication/userProfile/Profile",
    element: <Profile />,
  },
  {
    path: "/dashboard/Calendar/Calendar",
    element: <Calender />,
  },

  {
    path: "/dashboard/Notification/Notification",
    element: <Notification />,
  },

  {
    path: "/miscellaneous/Miscellaneous",
    element: <Miscellaneous />
  },
  {
    path: "/dashboard/Timeline/Timelinenotification",
    element: <Notifications />
  },

];

export { auth_routes, routes };
