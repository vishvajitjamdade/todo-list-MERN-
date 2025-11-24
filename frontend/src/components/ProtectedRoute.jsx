import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  // Show loading screen while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading...
      </div>
    );
  }

  // If user is not logged in → redirect to login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If logged in → render the protected component
  return children;
}
