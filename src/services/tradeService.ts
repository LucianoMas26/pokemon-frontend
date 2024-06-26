import axios from "axios"
// import { Pokemon } from "./profileService"
// import { User } from "./profileService"

const API_URL = "http://localhost:3000"

export interface Trade {
  id: number
  offeringUserId: number
  acceptingUserId: number
  offeringPokemonId: number
  acceptingPokemonId: number | null
  status: string
  offeringUser: {
    id: number
    email: string
  }
  acceptingUser: {
    id: number
    email: string
  }
  offeringPokemon: {
    id: number
    name: string
    type: string
    image: string
  } | null
  acceptingPokemon: {
    id: number
    name: string
    type: string
    image: string
  } | null
}

export const offerTrade = async (
  offeringUserId: number,
  offeringPokemonId: number,
  acceptingUserId: number,
  acceptingPokemonId: number,
  authToken: string
) => {
  try {
    const response = await axios.post(
      `${API_URL}/trades/offer`,
      {
        offeringUserId,
        offeringPokemonId,
        acceptingUserId,
        acceptingPokemonId
      },
      {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      }
    )

    return response.data as Trade // Asegúrate de devolver un Trade correctamente
  } catch (error: any) {
    throw new Error(`Error ofreciendo el trade: ${error}`)
  }
}

export const fetchPendingTrades = async (
  userId: number,
  authToken: string
): Promise<Trade[]> => {
  const response = await axios.get<Trade[]>(
    `${API_URL}/trades/pending/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    }
  )
  return response.data
}

export const acceptTrade = async (
  tradeId: number,
  acceptingPokemonId: number | null,
  authToken: string
) => {
  try {
    const response = await axios.post(
      `${API_URL}/trades/accept`,
      {
        tradeId,
        acceptingPokemonId
      },
      {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      }
    )

    return response.data
  } catch (error: any) {
    throw new Error(
      `Error accepting trade: ${error.response?.data?.error || error.message}`
    )
  }
}
