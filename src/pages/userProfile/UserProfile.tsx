import React from "react"
import { useAuth } from "../../utils/auth"
import { Pokemon } from "../../services/pokemonService"
import { offerPokemonForTrade } from "../../services/pokemonService"
import { showAlert } from "../../services/alertService"
import {
  removeOfferForTrade,
  deletePokemon
} from "../../services/pokemonService"
import Swal from "sweetalert2"

const UserProfile: React.FC = () => {
  const { user, authToken, loadUserProfile } = useAuth()

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        Cargando perfil del usuario...
      </div>
    )
  }

  const handleOfferForTrade = async (pokemonId: number) => {
    if (!authToken) return

    try {
      const pokemon = user?.pokemons.find((p: Pokemon) => p.id === pokemonId)

      if (!pokemon) {
        throw new Error("Pokémon no encontrado en la lista del usuario")
      }

      if (pokemon.offerForTrade) {
        showAlert("error", "Este Pokémon ya ha sido ofrecido para intercambio.")
        return
      }

      await offerPokemonForTrade(pokemonId, authToken)
      showAlert("success", "¡Pokémon ofrecido para intercambio exitosamente!")
      loadUserProfile(authToken)
    } catch (error) {
      console.error("Error offering pokemon for trade:", error)
      showAlert(
        "error",
        "Hubo un problema al ofrecer el Pokémon para intercambio. Por favor, intenta de nuevo más tarde."
      )
    }
  }

  const handleRemoveOfferForTrade = async (pokemonId: number) => {
    if (!authToken) return

    try {
      const pokemon = user?.pokemons.find((p: Pokemon) => p.id === pokemonId)

      if (!pokemon) {
        throw new Error("Pokémon no encontrado en la lista del usuario")
      }

      if (!pokemon.offerForTrade) {
        showAlert("error", "Este Pokémon no ha sido ofrecido para intercambio.")
        return
      }

      await removeOfferForTrade(pokemonId, authToken)
      showAlert(
        "success",
        "¡Pokémon retirado de la lista de intercambio exitosamente!"
      )
      loadUserProfile(authToken)
    } catch (error) {
      console.error("Error removing pokemon from trade list:", error)
      showAlert(
        "error",
        "Hubo un problema al retirar el Pokémon de la lista de intercambio. Por favor, intenta de nuevo más tarde."
      )
    }
  }

  const handleDeletePokemon = async (pokemonId: number) => {
    if (!authToken) return

    const confirmDelete = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar Pokémon",
      cancelButtonText: "Cancelar"
    })

    if (confirmDelete.isConfirmed) {
      try {
        await deletePokemon(pokemonId, authToken)
        showAlert("success", "¡Pokémon eliminado exitosamente!")
        loadUserProfile(authToken)
      } catch (error) {
        console.error("Error deleting pokemon:", error)
        showAlert(
          "error",
          "Hubo un problema al eliminar el Pokémon. Por favor, intenta de nuevo más tarde."
        )
      }
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Perfil del Usuario</h1>
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <p>
          <strong>ID:</strong> {user.id}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Pokémons</h2>
      {user.pokemons.length === 0 ? (
        <p>No tienes Pokémons.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {user.pokemons.map((pokemon: Pokemon) => (
            <li key={pokemon.id} className="bg-white shadow-md rounded-lg p-6">
              <div className="flex justify-center">
                <img
                  src={pokemon.image}
                  alt={pokemon.name}
                  className="w-32 h-32 mb-4"
                />
              </div>
              <p>
                <strong>Nombre:</strong> {pokemon.name}
              </p>
              <p>
                <strong>Nivel:</strong> {pokemon.level}
              </p>
              <p>
                <strong>Tipo:</strong> {pokemon.type}
              </p>
              <p>
                <strong>Habilidades:</strong> {pokemon.abilities}
              </p>

              {pokemon.offerForTrade ? (
                <button
                  onClick={() => handleRemoveOfferForTrade(pokemon.id)}
                  className="mt-4 w-full bg-[#f28d00] hover:bg-[#b67821] text-white font-bold py-2 px-4 rounded"
                >
                  Retirar de intercambio
                </button>
              ) : (
                <button
                  onClick={() => handleOfferForTrade(pokemon.id)}
                  className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Ofrecer para intercambio
                </button>
              )}
              <div className="flex justify-center">
                <button
                  onClick={() => handleDeletePokemon(pokemon.id)}
                  className="mt-4 w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Eliminar Pokémon
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default UserProfile
