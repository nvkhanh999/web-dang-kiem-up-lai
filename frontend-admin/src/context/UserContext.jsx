//user clarification

import React, { createContext, useEffect, useState } from "react";
import { Navigate } from 'react-router-dom';

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [token, setToken] = useState(localStorage.getItem("theFuckingToken"));

  useEffect(() => {
    const fetchUser = async () => {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };

      const response = await fetch("http://127.0.0.1:8000/verify", requestOptions);
	  const data = await response.json();

	  localStorage.setItem("theFuckingToken", data.access_token);

      if (!response.ok && window.location.pathname != '/login') {
        setToken(null);
		
		return <Navigate to='/login'/>
      }  
    };
    fetchUser();
  }, [token]);

  const providerValue = token;
  
  return (
    <UserContext.Provider value={ providerValue }>
      {props.children}
    </UserContext.Provider>
  );
};