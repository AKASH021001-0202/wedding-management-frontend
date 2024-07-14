import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVendors } from '../redux/slices/vendorSlice';
import { Link, useNavigate } from 'react-router-dom';

const FetchVendors = () => {
    const dispatch = useDispatch();
    const vendors = useSelector(state => state.vendors.items || []);
    const loading = useSelector(state => state.vendors.loading);
    const error = useSelector(state => state.vendors.error);
  

    useEffect(() => {
        dispatch(fetchVendors());
    }, [dispatch]);



    return (
        <div className='card p-5 mt-3 mb-3'>
            <h1>Manage Vendors</h1>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>Error fetching vendors: {error}</p>}
            <div className="mb-3">
                
                    <h2>All Vendor</h2>
              
            </div>
            <div className="table-responsive">
                <table className="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Service Type</th>
                            <th>Contact</th>
                           
                        </tr>
                    </thead>
                    <tbody>
                        {vendors.map(vendor => (
                            <tr key={vendor._id}>
                                <td>{vendor.name}</td>
                                <td>{vendor.service_type || 'N/A'}</td>
                                <td>
                                    {vendor.contact_info && (
                                        <>
                                            Phone: {vendor.contact_info.phone || 'N/A'} <br />
                                            Email: {vendor.contact_info.email || 'N/A'} <br />
                                            Address: {vendor.contact_info.address || 'N/A'}
                                        </>
                                    )}
                                </td>
                               
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FetchVendors;
