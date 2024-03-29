import React, { useContext } from "react";
import { AuthContext } from "../contexts/auth";
import { Navigate } from "react-router-dom";

interface UserIsLoggedPrivatePageProps {
  children: React.ReactNode;
}

export const UserIsLogged = ({ children }: UserIsLoggedPrivatePageProps) => {
  const { signed, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div>
        <h1>Carregando...</h1>
      </div>
    );
  }

  if (signed) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};
