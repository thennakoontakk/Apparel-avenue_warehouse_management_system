import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import "./App.css";

// Import Adminpage components
import ManagerRegister from "./componenets/adminPage/ManagerRegister";
import ManagerList from "./componenets/adminPage/ManagerList";
import EditManager from "./componenets/adminPage/EditManager";
import AdminList from "./componenets/adminPage/AdminList";
import AdminRegister from "./componenets/adminPage/AdminRegister";
import CustomerList from "./componenets/adminPage/CustomerList";
import EditAdmin from "./componenets/adminPage/EditAdmin";
import AdminManagerLogin from "./componenets/adminPage/AdminMangerLogin";
import AdminHome from "./componenets/adminPage/AdminHome";
import EditCustomer from "./componenets/adminPage/EditCustomer";
import ChangePassword from "./componenets/adminPage/ChangePassword";
// Import customer components
import CustomerRegister from "./componenets/customer/CustomerRegister";
import CustomerLogin from "./componenets/customer/CustomerLogin";
import Test from "./componenets/customer/Test";
import CustomerProfile from "./componenets/customer/CustomerProfile";
import EditCustomerProfile from "./componenets/customer/EditCustomerProfile";

//import ecom pages
import LandingPage from "./componenets/ecommercePages/LandingPage";
import RecentlyAddedItems from "./componenets/ecommercePages/recentlyAddeditems";

//lakna
// Import complaint Manager components
import ComplaintHome from "./componenets/complaintManager/ComplaintHome";
import ComplaintList from "./componenets/complaintManager/ComplaintList";
import FeedbackList from "./componenets/complaintManager/FeedbackList";
import EditComplaint from "./componenets/complaintManager/EditComplaint";
import ViewOtherFb from "./componenets/complaintCustomer/ViewOtherFb";
//import Thankyou from "./components/complaintCustomer/Thankyou";

// Import customer complaint components
import CusComplaintHome from "./componenets/complaintCustomer/CusComplaintHome";
import SubmitComplaint from "./componenets/complaintCustomer/SubmitComplaint";
import SubmitFeedback from "./componenets/complaintCustomer/SubmitFeedback";
import Sidebar from "./componenets/complaintManager/Sidebar";
import EmailForm from "./componenets/complaintManager/EmailForm";

//naduni
// Import driver components
import DriverRegister from "./componenets/Driver/DriverRegister";
import EditDriver from "./componenets/Driver/EditDriver";
import DriverList from "./componenets/Driver/DriverList";

// Import driver components
import VehicleRegister from "./componenets/Vehicle/VehicleRegister";
import VehicleList from "./componenets/Vehicle/VehicleList";
import EditVehicle from "./componenets/Vehicle/EditVehicle";
import TransportHome from "./componenets/TransportHome";

// import Side Bar
//import SidebarT from "./componenets/Driver/SideBarTransport";

// import assign componenets
import AssignRegister from "./componenets/Assign/AssignRegister";
import AssignList from "./componenets/Assign/AssignList";
import EditAssign from "./componenets/Assign/EditAssign";

//import tracking components
import TrackingOrder from "./componenets/Track/TrackingOrder";
import DriverRating from "./componenets/Rate/DriverRating";
import DriverRatingPage from "./componenets/Rate/DriverRatingPage";

//veenadhi
// Import Supplier component
import RegisterSupplierForm from "./componenets/supplierpage/RegisterSupplierForm";
import ViewSupplierList from "./componenets/supplierpage/ViewSupplierList";
import EditSupplier from "./componenets/supplierpage/EditSupplier";
import EditSupplierOrder from "./componenets/supplierorderpage/EditSupplierOrder";
import SupplierOrderForm from "./componenets/supplierorderpage/SupplierOrderForm";
import ViewSupplierOrders from "./componenets/supplierorderpage/ViewSupplierOrders";
import SupplierManagerHome from "./componenets/supplierpage/SupplierManagerHome";
import SupplierBillCalculator from "./componenets/supplierorderpage/SupplierBillCalculator";

//finance
import InvoiceForm from "./componenets/F_component/InvoiceForm";
import InvoiceList from "./componenets/F_component/InvoiceList";
import Home from "./pages/home";
import ManageInvoicepage from "./pages/manageInvoice";
import TansactionForm from "./componenets/F_component/transactionForm";
import ManageSalaryPage from "./componenets/F_component/manageSalary";
import TansactionChart from "./componenets/F_component/transactionChart";
import UpdateTransaction from "./componenets/F_component/UpdateTransaction";
import InvoiceDetails from "./componenets/F_component/InvoiceDetails";
import TransactionPage from "./pages/transactionPage";
import InvoiceView from "./pages/invoiceView";
import UpdateInvoice from "./componenets/F_component/UpdateInvoice";

//janusiya
// Import OrderAdminpage components
import OrderHome from "./componenets/orderPage/OrderHome";
import DiscountRegister from "./componenets/orderPage/DiscountRegister";
import DiscountList from "./componenets/orderPage/DiscountList";
import EditDiscount from "./componenets/orderPage/EditDiscount";
import Cart from "./componenets/cartPage/Cart";
import ProductDetail from "./componenets/cartPage/ProductDetail";
import CheckoutPage from "./componenets/cartPage/Checkout";
import OrderList from "./componenets/orderPage/OrderList";

function App() {
  // Set default base URL for Axios
  axios.defaults.baseURL = "http://localhost:8500"; //  backend server URL

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/Test" element={<Test />} />
          <Route path="/AdminHome" element={<AdminHome />} />
          <Route path="/user/register-manager" element={<ManagerRegister />} />
          <Route path="/user/allmanagers" element={<ManagerList />} />
          <Route path="/user/update-manager/:Id" element={<EditManager />} />
          <Route path="/user/register-admin" element={<AdminRegister />} />
          <Route path="/user/allAdmins" element={<AdminList />} />
          <Route path="/user/update-admin/:Id" element={<EditAdmin />} />
          <Route path="/user/allcustomers" element={<CustomerList />} />
          <Route
            path="/user/change-password/:Id"
            element={<ChangePassword />}
          />
          <Route
            path="/user/login-adminAndManger"
            element={<AdminManagerLogin />}
          />
          <Route
            path="/user/register-customer"
            element={<CustomerRegister />}
          />
          <Route path="/user/login-customer" element={<CustomerLogin />} />
          <Route
            path="/user/customer-profile/:id"
            element={<CustomerProfile />}
          />
          <Route path="/user/update-customer/:id" element={<EditCustomer />} />
          <Route
            path="/user/update-customerProfile/:id"
            element={<EditCustomerProfile />}
          />
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/apparelavenue/RecentlyAddedItems"
            element={<RecentlyAddedItems />}
          />
          {/* //complaint routes */}
          <Route path="/CusComplaintHome" element={<CusComplaintHome />} />
          <Route
            path="/complaint/add-Complaint"
            element={<SubmitComplaint />}
          />
          <Route path="/feedback/add-feedback" element={<SubmitFeedback />} />
          <Route path="/ComplaintHome" element={<ComplaintHome />} />
          <Route path="/complaint/allComplaints" element={<ComplaintList />} />
          <Route path="/feedback/allFeedbacks" element={<FeedbackList />} />
          <Route
            path="/complaint/update-complaint/:complaintID"
            element={<EditComplaint />}
          />
          <Route path="ViewOtherFb" element={<ViewOtherFb />} />
          <Route path="EmailForm" element={<EmailForm />} />
          {/* <Route path="Thankyou" element={<Thankyou />} />{" "} */}
          {/* //transport routes */}
          <Route path="/TransportHome" element={<TransportHome />} />a
          <Route path="/Trackingorder" element={<TrackingOrder />} />
          <Route path="/DriverRating" element={<DriverRating />} />
          <Route path="/DriverRatingPage" element={<DriverRatingPage />} />
          <Route path="/driver/add" element={<DriverRegister />} />
          <Route path="/driver/update/:Id" element={<EditDriver />} />
          <Route path="/driver/" element={<DriverList />} />
          <Route path="/vehicle/add" element={<VehicleRegister />} />
          <Route path="/vehicle/" element={<VehicleList />} />
          <Route path="/vehicle/update/:Id" element={<EditVehicle />} />
          <Route path="/assign/add" element={<AssignRegister />} />
          <Route path="/assign/" element={<AssignList />} />
          <Route path="/assign/update/:Id" element={<EditAssign />} />
          {/* //supplier routes */}
          <Route
            path="/supplier/register-supplier"
            element={<RegisterSupplierForm />}
          />
          <Route path="/supplier/allsuppliers" element={<ViewSupplierList />} />
          <Route
            path="/supplier/update-supplier/:id"
            element={<EditSupplier />}
          />
          <Route
            path="/supplierOrder/Create-supplierOrder"
            element={<SupplierOrderForm />}
          />
          <Route
            path="/supplierOrder/allsupplierOrders"
            element={<ViewSupplierOrders />}
          />
          <Route
            path="/supplierOrder/update-supplierOrder/:id"
            element={<EditSupplierOrder />}
          />
          <Route
            path="/supplier/supplierManager/Home"
            element={<SupplierManagerHome />}
          />
          <Route
            path="/supplier/SupplierBillCalculator"
            element={<SupplierBillCalculator />}
          />
          {/* //finance */}
          <Route path="/invoice-form" element={<InvoiceForm />} />
          <Route path="/invoice-list" element={<InvoiceList />} />
          <Route path="/financeHome" element={<Home />} />
          <Route path="/ManageInvoicepage" element={<ManageInvoicepage />} />
          <Route path="/tansaction-form" element={<TansactionForm />} />
          <Route path="/ManageSalaryPage" element={<ManageSalaryPage />} />
          <Route path="/tansaction-chart" element={<TansactionChart />} />
          <Route
            path="/transactions/update/:id"
            element={<UpdateTransaction />}
          />
          <Route path="/invoices/:id" element={<InvoiceDetails />} />
          <Route path="/transactionPage" element={<TransactionPage />} />
          <Route path="/invoiceView/:id" element={<InvoiceView />} />
          <Route path="/invoices/update/:id" element={<UpdateInvoice />} />
          {/* //order */}
          <Route path="/OrderHome" element={<OrderHome />} />
          <Route path="/discount/add" element={<DiscountRegister />} />
          <Route path="/discount/alldiscounts" element={<DiscountList />} />
          <Route path="/discount/update/:id" element={<EditDiscount />} />
          <Route path="cart/cart" element={<Cart />} />
          <Route path="cart/productDetail/:id" element={<ProductDetail />} />
          <Route path="cart/checkout" element={<CheckoutPage />} />
          <Route path="order/allorders" element={<OrderList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
