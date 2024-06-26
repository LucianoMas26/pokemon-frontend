import React from "react"
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom"
import LoginForm from "./pages/loginForm/LoginForm"
import HomePage from "./pages/homePage/HomePage"
import PrivateRoute from "./utils/privateRoute"
import RegisterForm from "./pages/registerForm/RegisterForm"
import UserProfile from "./pages/userProfile/UserProfile"
import { AuthProvider } from "./utils/auth"
import OffersPage from "./pages/offerts/Offerts"
import Navbar from "./components/navbar/navbar"

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route element={<PrivateRoute />}>
            <Route element={<Navbar />}>
              <Route path="/homePage" element={<HomePage />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/offers" element={<OffersPage />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
