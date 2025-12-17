import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAdmin = false,
}) => {
  const { isAuthenticated,isAdmin, user } = useAuthStore();


  // console.log({
  //   isAuthenticated,
  //   requireAdmin,
  //   user,
  // });

//   console.log("ProtectedRoute render", {
//   path: window.location.pathname,
//   requireAdmin,
//   isAuthenticated,
//   user,
// });

  // Show loading while checking auth state
  if (isAuthenticated && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size={40} />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
