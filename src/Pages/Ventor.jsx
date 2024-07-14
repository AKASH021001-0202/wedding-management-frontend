import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVendors, deleteVendor } from '../redux/slices/vendorSlice';
import { Link, useNavigate } from 'react-router-dom';

const Vendors = () => {
    const dispatch = useDispatch();
    const vendors = useSelector(state => state.vendors.items || []);
    const loading = useSelector(state => state.vendors.loading);
    const error = useSelector(state => state.vendors.error);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchVendors());
    }, [dispatch]);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this vendor?')) {
            dispatch(deleteVendor(id))
                .then(() => dispatch(fetchVendors()))
                .catch(err => console.error('Error deleting vendor:', err));
        }
    };

    const handleEdit = (id) => {
      navigate(`/edit-vendor/${id}`);
    };

    return (
        <div className='card p-5 mt-3 mb-3'>
            <h1>Manage Vendors</h1>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>Error fetching vendors: {error}</p>}
            <div className="mb-3">
                <Link to="/manage-vendors">
                    <button className="btn btn-primary mr-2">Add New Vendor</button>
                </Link>
            </div>
            <div className="table-responsive">
                <table className="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Service Type</th>
                            <th>Contact</th>
                            <th>Action</th>
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
                                <td>
                                    <button className="btn btn-info btn-sm mr-2" onClick={() => handleEdit(vendor._id)}>Edit</button>
                                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(vendor._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Vendors;
