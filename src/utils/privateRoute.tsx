import React from "react"
import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "./auth"

const PrivateRoute: React.FC = () => {
  const { authToken } = useAuth()

  return authToken ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoute
