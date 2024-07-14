import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import axiosInstance from '../../apis/axiosInstance';

const WeddingBudget = () => {
  const [budget, setBudget] = useState(10000);
  const [expenses, setExpenses] = useState([]);
  const [category, setCategory] = useState(''); // State for selected category
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const [editingExpense, setEditingExpense] = useState(null); // Track currently editing expense

  useEffect(() => {
    const authToken = localStorage.getItem('token');
    if (authToken) {
      try {
        const decoded = jwtDecode(authToken);
        setUserId(decoded.id);
        setToken(authToken);
        fetchExpenses(decoded.id, authToken);
      } catch (error) {
        console.error('Error decoding token or fetching expenses:', error);
        setError('Error decoding token or fetching expenses');
      }
    } else {
      console.error('Token not found in local storage.');
      setError('Token not found in local storage');
    }
  }, []);

  const fetchExpenses = async (userId, authToken) => {
    try {
      const response = await axiosInstance.get(`${import.meta.env.VITE_BACKEND_URL}/expenses`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (Array.isArray(response.data)) {
        setExpenses(response.data);
      } else {
        console.error('Unexpected response data format:', response.data);
        setError('Unexpected response data format');
      }
    } catch (error) {
      console.error('Error fetching expenses:', error);
      setError('Error fetching expenses');
    }
  };

  const handleAddExpense = async () => {
    const newExpense = { category, amount: parseFloat(amount), description, user: userId };
    try {
      const response = await axiosInstance.post(`${import.meta.env.VITE_BACKEND_URL}/expenses`, newExpense, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setExpenses([...expenses, response.data]);
      setCategory(''); // Clear category after adding expense
      setAmount('');
      setDescription('');
    } catch (error) {
      console.error('Error adding expense:', error);
      setError('Error adding expense');
    }
  };

  const handleEditExpense = async (expenseId) => {
    const updatedExpense = { category: editingExpense.category, amount: editingExpense.amount, description: editingExpense.description };
    try {
      const response = await axiosInstance.put(`${import.meta.env.VITE_BACKEND_URL}/expenses/${expenseId}`, updatedExpense, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedExpenses = expenses.map(expense => {
        if (expense._id === expenseId) {
          return response.data;
        }
        return expense;
      });
      setExpenses(updatedExpenses);
      setEditingExpense(null); // Clear editing state after successful edit
    } catch (error) {
      console.error('Error editing expense:', error);
      setError('Error editing expense');
    }
  };

  const handleDeleteExpense = async (expenseId) => {
    try {
      await axiosInstance.delete(`${import.meta.env.VITE_BACKEND_URL}/expenses/${expenseId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedExpenses = expenses.filter(expense => expense._id !== expenseId);
      setExpenses(updatedExpenses);
    } catch (error) {
      console.error('Error deleting expense:', error);
      setError('Error deleting expense');
    }
  };

  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
  const remainingBudget = budget - totalExpenses;

  const getCategoryExpenses = (category) =>
    expenses.filter((expense) => expense.category === category)
      .reduce((total, expense) => total + expense.amount, 0);

  // Define category options for dropdown
  const categoryOptions = ['Catering', 'Photography', 'Venue', 'Decorations'];

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Wedding Budget Tracker</h1>

      <div className="row mb-3">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Total Budget</h4>
              <p className="card-text">₹{budget.toFixed(2)}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Total Expenses</h4>
              <p className="card-text text-danger">₹{totalExpenses.toFixed(2)}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Remaining Budget</h4>
              <p className="card-text text-success">₹{remainingBudget.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      <h3 className="mb-3">Add Expense</h3>
      <div className="row mb-4">
        <div className="col-md-3">
          <select
            className="form-control"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            {categoryOptions.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <input
            type="number"
            className="form-control"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <button className="btn btn-primary w-100" onClick={handleAddExpense}>
            Add Expense
          </button>
        </div>
      </div>

      <h3 className="mb-3">Expenses by Category</h3>
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Venue</h4>
              <p className="card-text">₹{getCategoryExpenses('Venue').toFixed(2)}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Catering</h4>
              <p className="card-text">₹{getCategoryExpenses('Catering').toFixed(2)}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Photography</h4>
              <p className="card-text">₹{getCategoryExpenses('Photography').toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      <h3 className="mt-5 mb-3">Expense List</h3>
      {expenses.length === 0 ? (
        <p>No expenses found.</p>
      ) : (
        <ul className="list-group">
          {expenses.map((expense) => (
            <li key={expense._id} className="list-group-item">
              {editingExpense && editingExpense._id === expense._id ? (
                <div className="row">
                  <div className="col-md-3">
                    <input
                      type="text"
                      className="form-control"
                      value={editingExpense.category}
                      onChange={(e) => setEditingExpense({ ...editingExpense, category: e.target.value })}
                    />
                  </div>
                  <div className="col-md-3">
                    <input
                      type="number"
                      className="form-control"
                      value={editingExpense.amount}
                      onChange={(e) => setEditingExpense({ ...editingExpense, amount: parseFloat(e.target.value) })}
                    />
                  </div>
                  <div className="col-md-4">
                    <input
                      type="text"
                      className="form-control"
                      value={editingExpense.description}
                      onChange={(e) => setEditingExpense({ ...editingExpense, description: e.target.value })}
                    />
                  </div>
                  <div className="col-md-2">
                    <button className="btn btn-success mr-2" onClick={() => handleEditExpense(expense._id)}>
                      Save
                    </button>
                    <button className="btn btn-secondary" onClick={() => setEditingExpense(null)}>
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="row">
                  <div className="col-md-3">{expense.category}</div>
                  <div className="col-md-3">₹{expense.amount.toFixed(2)}</div>
                  <div className="col-md-4">{expense.description}</div>
                  <div className="col-md-2">
                    <button className="btn btn-primary mr-2" onClick={() => setEditingExpense(expense)}>
                      Edit
                    </button>
                    <button className="btn btn-danger" onClick={() => handleDeleteExpense(expense._id)}>
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      {error && <p className="text-danger mt-3">{error}</p>}
    </div>
  );
};

export default WeddingBudget;
