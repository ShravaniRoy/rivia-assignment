import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BiSortAlt2 } from "react-icons/bi"


const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortField, setSortField] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      setUsers(response.data);
    };
    fetchData();
  }, []);

  const deleteUser = (userId) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  const openUserDetails = (userId) => {
    // Navigate to the user details view using React Router 
    // Pass the relevant user details to the new view
    navigate(`/user-details/${userId}`);
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setUsers([...users].reverse());
    } else {
      setSortField(field);
      setUsers([...users].sort((a, b) => a[field].localeCompare(b[field])));
    }
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = users.slice(indexOfFirstRow, indexOfLastRow);

  const renderTableRows = currentRows.map((user) => (
    <tr key={user.id}>
      <td>{user.name}</td>
      <td>{user.username}</td>
      <td>{user.email}</td>
      <td>{user.address.city}</td>
      <td>{user.phone}</td>
      <td>{user.website}</td>
      <td>{user.company.name}</td>
      <td>
        <button onClick={() => openUserDetails(user.id)}>Open</button>
        <button onClick={() => deleteUser(user.id)}>Delete</button>
      </td>
    </tr>
  ));

  const renderTableHeaders = (
    //using table headers for sorting based on respective field
    <tr>
      <th className='sortingFields' onClick={() => handleSort('name')}>Name  <BiSortAlt2 /></th>
      <th>Username</th>
      <th className='sortingFields' onClick={() => handleSort('email')}>Email <BiSortAlt2 /> </th>
      <th>Address</th>
      <th>Phone</th>
      <th>Website</th>
      <th>Company</th>
      <th>Actions</th>
    </tr>
  );

  const renderPagination = (
    <div className='pagination'>
      <button
        onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      <button
        onClick={() =>
          setCurrentPage(
            currentPage < Math.ceil(users.length / rowsPerPage)
              ? currentPage + 1
              : currentPage
          )
        }
        disabled={currentPage === Math.ceil(users.length / rowsPerPage)}
      >
        Next
      </button>
    </div>
  );
  const handleRowsPerPageChange = (event) => {
    const value = parseInt(event.target.value);
    setCurrentPage(1);
    setRowsPerPage(value);
  };

  return (
    <div className='container'>
        <div class="pagination">
            <label htmlFor="rowsPerPage" className='form-label'>Rows per page: </label>
            <select id="rowsPerPage" className='form-select rowsSelect'  value={rowsPerPage} onChange={handleRowsPerPageChange}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20} disabled>20</option>
            </select>
        </div>
        <div class="well">
            <table className='table'>
                <thead>{renderTableHeaders}</thead>
                <tbody>{renderTableRows}</tbody>
            </table>
            {renderPagination}
        </div>
    </div>
  );
};

export default UserTable;
