import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if(storedUser) return storedUser
    else return null
  });

  useEffect(()=>{
    // infinite loop -> maybe some kind of timeout
    const fetchData = async () => {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser) {
        try {
          const res = await axios.get('http://localhost:3000/api/users/id?id=' + storedUser.id);
          setUser(res.data[0]);
        } catch (error) {
          console.error(error);
          setUser(null);
        }
      }
    };

    fetchData();
  },[])

  const setUserAndUpdateLocalStorage = (newUser) => {
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  return (
    <UserContext.Provider value={{ user, setUser: setUserAndUpdateLocalStorage }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);