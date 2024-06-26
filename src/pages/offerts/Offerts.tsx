import React, { useEffect, useState } from "react"
import { Trade } from "../../services/tradeService"
import { useAuth } from "../../utils/auth"
import { fetchPendingTrades, acceptTrade } from "../../services/tradeService"
import { showAlert } from "../../services/alertService"

const OffersPage: React.FC = () => {
  const { user, authToken } = useAuth()
  const [trades, setTrades] = useState<Trade[]>([])
  const [loadingTrades, setLoadingTrades] = useState<boolean>(true)

  useEffect(() => {
    const fetchTradesData = async () => {
      if (!user || !authToken) return

      try {
        const pendingTrades = await fetchPendingTrades(user.id, authToken)
        setTrades(pendingTrades)
        setLoadingTrades(false)
      } catch (error) {
        console.error("Error fetching trades:", error)
        showAlert("error", "Error fetching trades")
        setLoadingTrades(false)
      }
    }

    fetchTradesData()
  }, [user, authToken])

  const handleAcceptTrade = async (
    tradeId: number,
    acceptingPokemonId: number | null
  ) => {
    try {
      if (acceptingPokemonId === null) {
        showAlert(
          "error",
          "Por favor selecciona un Pokémon para aceptar el trade."
        )
        return
      }

      await acceptTrade(tradeId, acceptingPokemonId, authToken)
      showAlert("success", "Trade aceptado exitosamente!")

      const updatedTrades = await fetchPendingTrades(user.id, authToken)
      setTrades(updatedTrades)
    } catch (error: any) {
      console.error("Error accepting trade:", error)
      showAlert("error", error.message)
    }
  }

  if (loadingTrades) {
    return <div>Cargando...</div>
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mt-8 mb-4">Trades Pendientes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {trades.map((trade) => (
          <div
            key={trade.id}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center justify-center"
          >
            <div className="mt-4">
              <h3 className="text-lg font-bold">Pokémon Ofrecido:</h3>
              {trade.offeringPokemon && trade.offeringPokemon.image ? (
                <div className="flex flex-col items-center justify-center">
                  <img
                    src={trade.offeringPokemon.image}
                    alt={trade.offeringPokemon.name}
                    className="w-32 h-32 mb-2 rounded-full"
                  />

                  <p className="text-lg font-semibold">
                    Nombre: {trade.offeringPokemon.name}
                  </p>
                  <p className="text-lg font-semibold">
                    Tipo: {trade.offeringPokemon.type}
                  </p>
                </div>
              ) : (
                <p className="text-lg">Pokémon no disponible</p>
              )}
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-bold">Tu Pokémon:</h3>
              {trade.acceptingPokemon && trade.acceptingPokemon.image ? (
                <div className="flex flex-col items-center justify-center">
                  <img
                    src={trade.acceptingPokemon.image}
                    alt={trade.acceptingPokemon.name}
                    className="w-32 h-32 mb-2 rounded-full"
                  />

                  <p className="text-lg font-semibold">
                    Nombre: {trade.acceptingPokemon.name}
                  </p>
                  <p className="text-lg font-semibold">
                    Tipo: {trade.acceptingPokemon.type}
                  </p>
                </div>
              ) : (
                <p className="text-lg">Pokémon no disponible</p>
              )}
            </div>
            {trade.status === "pending" && (
              <div className="mt-4">
                <button
                  onClick={() =>
                    handleAcceptTrade(trade.id, trade.acceptingPokemonId)
                  }
                  className="bg-[#f28d00] hover:bg-[#b67821] text-white font-bold py-2 px-4 rounded mt-2"
                >
                  Aceptar Trade
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default OffersPage
