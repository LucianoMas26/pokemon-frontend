import React, { useEffect, useState } from "react"

import { getOfferedPokemons, Pokemon } from "../../services/pokemonService"
import { useAuth } from "../../utils/auth"
import TradeOfferModal from "../../components/tradeOfferForm"
import { getUserPokemons } from "../../services/pokemonService"
import { offerTrade } from "../../services/tradeService"
import { showAlert } from "../../services/alertService"

const HomePage: React.FC = () => {
  const [offeredPokemons, setOfferedPokemons] = useState<Pokemon[]>([])
  const [loadingPokemons, setLoadingPokemons] = useState<boolean>(true)

  const [selectedPokemonId, setSelectedPokemonId] = useState<number | null>(
    null
  )
  const [selectedOfferedPokemonId, setSelectedOfferedPokemonId] = useState<
    number | null
  >(null)
  const [userPokemons, setUserPokemons] = useState<Pokemon[]>([])
  const [acceptingUserId, setAcceptingUserId] = useState<number | null>(null)

  const { user, authToken } = useAuth()

  useEffect(() => {
    const fetchOfferedPokemons = async () => {
      try {
        const pokemons = await getOfferedPokemons()
        const filteredPokemons = pokemons.filter(
          (pokemon) => pokemon.user?.email !== user?.email
        )
        setOfferedPokemons(filteredPokemons)
        setLoadingPokemons(false)
      } catch (error) {
        setLoadingPokemons(false)
      }
    }

    fetchOfferedPokemons()
  }, [user])

  useEffect(() => {
    const fetchUserPokemons = async () => {
      try {
        const userPokemons = await getUserPokemons(user.id)
        setUserPokemons(userPokemons)
      } catch (error) {
        console.error("Error fetching user pokemons:", error)
      } finally {
        setLoadingPokemons(false)
      }
    }

    if (user && user.id) {
      fetchUserPokemons()
    }
  }, [user])

  const handleSelectPokemon = (pokemonId: number, acceptingUserId: number) => {
    setSelectedPokemonId(pokemonId)
    setAcceptingUserId(acceptingUserId)
  }

  const handleCloseModal = () => {
    setSelectedPokemonId(null)
    setSelectedOfferedPokemonId(null)
  }

  const handleOfferTrade = async () => {
    if (selectedPokemonId && acceptingUserId && authToken) {
      let acceptingPokemonId: number
      if (selectedOfferedPokemonId !== null) {
        acceptingPokemonId = selectedOfferedPokemonId
      } else {
        console.error("acceptingPokemonId no debería ser null")
        return
      }

      try {
        const response = await offerTrade(
          user.id,
          selectedPokemonId,
          acceptingUserId,
          acceptingPokemonId,
          authToken
        )
        console.log("Trade ofrecido exitosamente!")
        console.log(response)
      } catch (error: any) {
        console.error("Error ofreciendo el trade:", error)
        showAlert("error", "Ya hay un trade pendiente similar")
      } finally {
        handleCloseModal()
      }
    }
  }

  if (loadingPokemons) {
    return <div>Cargando...</div>
  }

  return (
    <div className="h-screen flex flex-col items-center mx-auto p-4">
      <h1 className="text-3xl font-bold mb-10">Tradea Pokémons</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {offeredPokemons.map((pokemon) => (
          <div key={pokemon.id} className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-bold mb-2">{pokemon.name}</h2>
            {pokemon.image && (
              <img
                src={pokemon.image}
                alt={pokemon.name}
                className="w-full h-auto rounded-md mb-2"
              />
            )}
            <p className="text-lg">Nivel: {pokemon.level}</p>
            <p className="text-lg">Tipo: {pokemon.type}</p>
            <p className="text-lg">
              Habilidades:{" "}
              {Array.isArray(pokemon.abilities)
                ? pokemon.abilities.join(", ")
                : pokemon.abilities}
            </p>
            <p className="text-lg">Ofrecido por: {pokemon.user.email}</p>
            <button
              onClick={() => {
                handleSelectPokemon(pokemon.id, pokemon.user.id)
                setSelectedOfferedPokemonId(pokemon.id)
              }}
              className="bg-[#f28d00] hover:bg-[#b67821] text-white font-bold py-2 px-4 rounded mt-2"
            >
              Iniciar Trade
            </button>
          </div>
        ))}
      </div>

      {selectedPokemonId && (
        <TradeOfferModal
          userPokemons={userPokemons}
          offeringPokemonId={selectedPokemonId}
          acceptingUserId={acceptingUserId!}
          onSelectPokemon={(pokemonId) => setSelectedPokemonId(pokemonId)}
          onOfferTrade={handleOfferTrade}
          onCloseModal={handleCloseModal}
        />
      )}
    </div>
  )
}

export default HomePage
