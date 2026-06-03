import { createContext, useState } from "react";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  function registerUser(data) {
    setUser({
      name: data.name.trim(),
      email: data.email.trim(),
    });
  }

  function logoutUser() {
    setUser(null);
  }

  const value = {
    user,
    isAuthenticated: Boolean(user),
    registerUser,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
