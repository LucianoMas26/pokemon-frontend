import React, { useState } from "react"
import axios from "axios"
import { NavLink, useNavigate } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { handleError } from "../../services/errorService"
import { useAuth } from "../../utils/auth"
import image from "../../assets/images/loginImage.jpg"

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      handleError({
        response: {
          data: { error: "Por favor, complete todos los campos correctamente" }
        }
      })
      return
    }

    const user = { email, password }

    try {
      const response = await axios.post(
        "http://localhost:3000/users/login",
        user
      )
      login(response.data)
      navigate("/homePage")
    } catch (error) {
      handleError(error)
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex w-3/4 lg:w-[768px] h-[496px] mt-10 animate-fade animate-once animate-duration-700 animate-delay-100 animate-ease-linear justify-center">
        <form
          onSubmit={handleLogin}
          className="lg:w-1/2 bg-gray-100 p-8 flex flex-col text-center justify-center items-center lg:rounded-l-xl lg:rounded-r-none rounded-xl shadow-lg w-[70%]"
        >
          <div className="mb-6">
            <h2 className="sm:text-3xl text-2xl font-black mb-6">
              Inicia sesión
            </h2>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-[#FF416C]"
              placeholder="Ingrese email"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-[#FF416C]"
              placeholder="Ingrese contraseña"
            />
          </div>
          <button
            className="bg-[#f28d00] min-w-[9rem] max-w-[9rem] duration-200 font-bold py-2 px-4 rounded-[20px] focus:outline-none focus:shadow-outline text-white"
            type="submit"
          >
            Ingresar
          </button>
          <div className="mt-4 text-gray-700 text-sm">
            ¿Todavía no tienes una cuenta?{" "}
            <NavLink
              className="text-[#f28d00] font-semibold hover:underline"
              to="/register"
            >
              Registrarse
            </NavLink>
          </div>
        </form>
        <div className="hidden lg:block w-1/2 relative">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white w-[90%] z-10">
            <h1 className="text-3xl font-black">Bienvenido/a</h1>
            <p className="leading-6 my-4 text-sm">
              Ingrese su usuario y contraseña para continuar
            </p>
          </div>
          <img
            src={image}
            alt="Login Image"
            className="h-full w-full object-cover rounded-r-xl shadow-lg brightness-75"
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default LoginForm
