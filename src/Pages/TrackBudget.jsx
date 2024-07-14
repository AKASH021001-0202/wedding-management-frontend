import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVendors, addVendor } from "../redux/slices/vendorSlice";


const ManageVendors = () => {
  const dispatch = useDispatch();
  const vendors = useSelector((state) => state.vendors.items || []);
  const loading = useSelector((state) => state.vendors.loading);
  const error = useSelector((state) => state.vendors.error);
  const [newVendor, setNewVendor] = useState({
    name: "",
    service: "",
    contact: "",
  });

  useEffect(() => {
    dispatch(fetchVendors());
  }, [dispatch]);

  const handleChange = (e) => {
    setNewVendor({ ...newVendor, [e.target.name]: e.target.value });
  };

  const handleAddVendor = () => {
    if (!newVendor.name || !newVendor.service || !newVendor.contact) {
      alert("All fields are required.");
      return;
    }
    dispatch(addVendor(newVendor)).then(() => {
      dispatch(fetchVendors());
      setNewVendor({ name: "", service: "", contact: "" });
    });
  };

  return (
    <Layout>
      <div className="container card p-5 mt-3 mb-3">
        <h1 className="mt-5">Manage Vendors</h1>
        {error && <div className="alert alert-danger">{error}</div>}
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div>
            <ul>
              {vendors.map((vendor) => (
                <li key={vendor._id}>
                  <h3>{vendor.name}</h3>
                  <p>Service: {vendor.service}</p>
                  <p>Contact: {vendor.contact}</p>
                </li>
              ))}
            </ul>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={newVendor.name}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Service</label>
              <input
                type="text"
                name="service"
                value={newVendor.service}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Contact</label>
              <input
                type="text"
                name="contact"
                value={newVendor.contact}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <button onClick={handleAddVendor} className="btn btn-primary">
              Add Vendor
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ManageVendors;
