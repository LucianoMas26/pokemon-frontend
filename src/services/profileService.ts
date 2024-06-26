import axios from "axios"

const API_BASE_URL = "http://localhost:3000"

export interface User {
  id: number
  email: string
  pokemons: Pokemon[]
}

export interface Pokemon {
  id: number
  name: string
  level: number
  type: string
  abilities: string
}

export const getUserProfile = async (token: string): Promise<User | null> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const userData = response.data
    const user: User = {
      id: userData.id,
      email: userData.email,
      pokemons: userData.pokemons
    }

    return user
  } catch (error) {
    console.error("Error al obtener el perfil del usuario:", error)
    return null
  }
}
