import React, { useState } from "react";
import { useGetAllUsersHook } from "@/modules/users/hooks/useGetAllUsersHook";

const TestList = () => {
  const { users, isLoading } = useGetAllUsersHook();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h2>Test Users List</h2>
      <input
        type="text"
        placeholder="Search users..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {isLoading ? (
        <p>Loading users...</p>
      ) : (
        <ul>
          {filteredUsers.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TestList;
