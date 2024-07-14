// // src/components/BudgetTracker.jsx

// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// // import { fetchBudgets, addBudget, updateBudget, deleteBudget } from '../../redux/slices/budgetSlice';

// const BudgetTracker = () => {
//   const dispatch = useDispatch();
//   const { budgets, status, error } = useSelector((state) => state.budget);
//   const [newBudget, setNewBudget] = useState({
//     event_id: '',
//     category: '',
//     amount_allocated: 0,
//     amount_spent: 0,
//   });

//   useEffect(() => {
//     if (status === 'idle') {
//       dispatch(fetchBudgets());
//     }
//   }, [status, dispatch]);

//   const handleChange = (e) => {
//     setNewBudget({ ...newBudget, [e.target.name]: e.target.value });
//   };

//   const handleAddBudget = () => {
//     dispatch(addBudget(newBudget));
//     setNewBudget({
//       event_id: '',
//       category: '',
//       amount_allocated: 0,
//       amount_spent: 0,
//     });
//   };

//   const handleUpdateBudget = (budget) => {
//     dispatch(updateBudget({ ...budget, amount_allocated: budget.amount_allocated + 10 }));
//   };

//   const handleDeleteBudget = (id) => {
//     dispatch(deleteBudget(id));
//   };

//   return (
//     <div>
//       <h2>Budget Tracker</h2>
//       {status === 'loading' && <p>Loading...</p>}
//       {status === 'failed' && <p>Error: {error}</p>}
//       {status === 'succeeded' && budgets && (
//         <div>
//           <div>
//             <h3>Add New Budget</h3>
//             <input
//               type="text"
//               name="event_id"
//               value={newBudget.event_id}
//               onChange={handleChange}
//               placeholder="Event ID"
//             />
//             <input
//               type="text"
//               name="category"
//               value={newBudget.category}
//               onChange={handleChange}
//               placeholder="Category"
//             />
//             <input
//               type="number"
//               name="amount_allocated"
//               value={newBudget.amount_allocated}
//               onChange={handleChange}
//               placeholder="Amount Allocated"
//             />
//             <input
//               type="number"
//               name="amount_spent"
//               value={newBudget.amount_spent}
//               onChange={handleChange}
//               placeholder="Amount Spent"
//             />
//             <button onClick={handleAddBudget}>Add Budget</button>
//           </div>
//           <h3>Budgets</h3>
//           <ul>
//             {budgets.map((budget) => (
//               <li key={budget._id}>
//                 <span>{budget.category} - Allocated: ${budget.amount_allocated}, Spent: ${budget.amount_spent}</span>
//                 <button onClick={() => handleUpdateBudget(budget)}>Update</button>
//                 <button onClick={() => handleDeleteBudget(budget._id)}>Delete</button>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BudgetTracker;

