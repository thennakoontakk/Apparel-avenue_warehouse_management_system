import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../SideBarS';

const SupplierManagerHome = () => {
  const navigate = useNavigate();

  const handleViewSuppliers = () => {
    navigate('/supplier/allsuppliers');
  };

  const handleViewSupplierOrders = () => {
    navigate('/supplierOrder/allsupplierOrders');
  };

  return (
    <div className="container-fluid mt-0 pt-0"> {/* Remove all top margin and padding */}
      <div className="row">
        <div className="col-md-3 p-0"> {/* Remove padding */}
          <Sidebar />
        </div>
        <div className="col-md-9 p-0"> {/* Remove padding */}
          <div className="container">
            <h2 className="mb-4">Welcome to Supplier Manager Homepage</h2>
            <div className="row">
              <div className="col-md-6 mb-4">
                <button className="btn btn-primary btn-lg btn-block" onClick={handleViewSuppliers}>View Suppliers</button>
              </div>
              <div className="col-md-6 mb-4">
                <button className="btn btn-primary btn-lg btn-block" onClick={handleViewSupplierOrders}>View Supplier Orders</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SupplierManagerHome;
