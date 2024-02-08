import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');

    if(storedUser) return storedUser
    else return null
  });

  const setUserAndUpdateLocalStorage = (newUser) => {
    if (newUser) {
      localStorage.setItem("user", newUser)
      setUser(newUser)
    }else{
      setUser(null)
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser: setUserAndUpdateLocalStorage }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);