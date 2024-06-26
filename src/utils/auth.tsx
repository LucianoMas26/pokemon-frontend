import { useState, createContext, useContext, useEffect } from "react"
import { User, getUserProfile } from "../services/profileService"
import { showAlert } from "../services/alertService"

const TOKEN_KEY = "token"
const AuthContext = createContext<any>(null)

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [authToken, setAuthToken] = useState<string | null>(
    localStorage.getItem(TOKEN_KEY)
  )

  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_KEY)
    if (storedToken) {
      setAuthToken(storedToken)
      loadUserProfile(storedToken)
    }
  }, [])

  const login = async (token: string) => {
    await loadUserProfile(token)
    localStorage.setItem(TOKEN_KEY, token)
    setAuthToken(token)
    showAlert("success", `¡Bienvenido ${user?.email}!`)
  }

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY)
    setAuthToken(null)
    setUser(null)
  }

  const loadUserProfile = async (token: string) => {
    try {
      const userProfile = await getUserProfile(token)
      setUser(userProfile)
    } catch (error) {
      console.error("Error al cargar perfil de usuario:", error)
      setUser(null)
    }
  }

  const contextValue = {
    user,
    authToken,
    login,
    logout,
    loadUserProfile
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
