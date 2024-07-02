import axios from "axios"

const API_BASE_URL = "http://localhost:3000"

export interface Pokemon {
  id: number
  name: string
  level: number
  type: string
  abilities: string[]
  image: string
  offerForTrade: boolean
  user: {
    id: number
    email: string
  }
}

export const createNewPokemon = async (pokemonData: any, authToken: string) => {
  const response = await axios.post(
    `${API_BASE_URL}/pokemons/new/create`,
    pokemonData,
    {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    }
  )
  return response.data
}

export const addRandomPokemon = async (userId: number, authToken: string) => {
  const response = await axios.post(
    `${API_BASE_URL}/pokemons/${userId}/pokemons/random`,
    {},
    {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    }
  )
  return response.data
}

export const getOfferedPokemons = async (): Promise<Pokemon[]> => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/pokemons/offered-pokemons`
    )
    return response.data
  } catch (error) {
    console.error("Error al obtener pokémons ofrecidos:", error)
    throw error
  }
}

export const offerPokemonForTrade = async (
  pokemonId: number,
  token: string
): Promise<void> => {
  try {
    await axios.put(
      `${API_BASE_URL}/pokemons/${pokemonId}/offer-for-trade`,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
  } catch (error) {
    console.error("Error offering pokemon for trade:", error)
    throw error
  }
}

export const removeOfferForTrade = async (
  pokemonId: number,
  authToken: string
) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/pokemons/${pokemonId}/trade`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      }
    )

    return response.data
  } catch (error) {
    throw new Error(`Error removing offer for trade: ${error}`)
  }
}

export const getUserPokemons = async (userId: number): Promise<Pokemon[]> => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/pokemons/${userId}/pokemons`
    )
    return response.data
  } catch (error) {
    console.error("Error fetching user pokemons:", error)
    throw new Error("Failed to fetch user pokemons")
  }
}

export const deletePokemon = async (pokemonId: number, authToken: string) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/pokemons/${pokemonId}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      }
    )

    return response.data
  } catch (error) {
    throw new Error(`Error deleting pokemon: ${error}`)
  }
}

export const createPokemon = async (
  pokemonData: any,
  authToken: string | null
) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/pokemons/create`,
      pokemonData,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json"
        }
      }
    )
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.error || "Error al crear el Pokémon")
  }
}
