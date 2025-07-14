import { useState, createContext } from "react";

export const AuthContext= createContext();

export const AuthProvider= props => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  return (
    <AuthContext.Provider value={{user, setUser}}>
      {props.children}
    </AuthContext.Provider>
  );
};