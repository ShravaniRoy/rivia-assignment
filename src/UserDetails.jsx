import React from 'react';
import { useParams } from 'react-router-dom';

const UserDetails = () => {
  const { userId } = useParams();

  // Fetch user details using the API endpoint: `https://jsonplaceholder.typicode.com/users/${userId}`

  return (
    <div>
      <h1>User Details</h1>
      <p>User ID: {userId}</p>
      {/* Display the fetched user details */}
    </div>
  );
};

export default UserDetails;