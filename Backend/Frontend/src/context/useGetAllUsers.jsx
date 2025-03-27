import React, { useState, useEffect } from 'react';
import Cookies from "js-cookie";
import axios from "axios";

const useGetAllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const token = Cookies.get("jwt");
        console.log("JWT Token from Cookies:", token);
        
        const response = await axios.get("/api/user/allusers", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        console.log("API Response:", response.data);
        setAllUsers(response.data.filteredUsers || []);
      } catch (error) {
        console.error("Error in useGetAllUsers:", error.response?.data || error);
        setAllUsers([]);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  return [allUsers, loading];  // Changed from an object to an array
};

export default useGetAllUsers;