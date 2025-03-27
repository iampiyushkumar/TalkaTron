import React from "react";
import User from "./User";
import useGetAllUsers from "../../context/useGetAllUsers";

function Users() {
  const [allUsers, loading, error] = useGetAllUsers(); // Destructure the array
  
  console.log("All Users:", allUsers);
  console.log("Loading:", loading);
  console.log("Error:", error);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1 className="px-8 py-2 text-white font-semibold bg-slate-800 rounded-md">
        Messages
      </h1>
      <div
        className="py-2 flex-1 overflow-y-auto"
        style={{ maxHeight: "calc(84vh - 10vh)" }}
      >
        {allUsers.map((user, index) => (
          <User key={user._id || index} user={user} />
        ))}
      </div>
    </div>
  );
}

export default Users;