import { useEffect, useContext, useState, createContext } from "react";

export const Context = createContext();

function ContextProvider({ children }) {
  let [user, setUser] = useState({});
  let [company, setCompany] = useState({});

  function setUserDetail(data) {
    setUser(data);
  }

  function setCompanyDetail(data) {
    setCompany(data);
  }
  return (
    <Context.Provider
      value={{ company, setCompanyDetail, setUserDetail, user }}
    >
      {children}
    </Context.Provider>
  );
}

export default ContextProvider;
