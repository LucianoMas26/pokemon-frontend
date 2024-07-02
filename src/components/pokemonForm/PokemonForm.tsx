import React, { useState } from "react"
import { createNewPokemon } from "../../services/pokemonService"
import { useAuth } from "../../utils/auth"
import { showAlert } from "../../services/alertService"

interface Props {
  isOpen: boolean
  onClose: () => void
}

const PokemonForm: React.FC<Props> = ({ isOpen, onClose }) => {
  const { user, authToken, loadUserProfile } = useAuth()
  const [newPokemon, setNewPokemon] = useState({
    name: "",
    level: 1,
    type: "",
    abilities: "",
    image: ""
  })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setNewPokemon({ ...newPokemon, [name]: value })
  }

  const handleCreatePokemon = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!authToken || !user?.id) return

    try {
      await createNewPokemon({ ...newPokemon, userId: user.id }, authToken)
      showAlert("success", `¡${newPokemon.name} creado exitosamente!`)
      loadUserProfile(authToken)
      onClose()
      setNewPokemon({
        name: "",
        level: 1,
        type: "",
        abilities: "",
        image: ""
      })
    } catch (error) {
      console.error("Error creating pokemon:", error)
      showAlert(
        "error",
        "Hubo un problema al crear el Pokémon. Por favor, intenta de nuevo más tarde."
      )
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Crear Nuevo Pokémon</h2>
        <form onSubmit={handleCreatePokemon} className="mb-6">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Nombre
            </label>
            <input
              type="text"
              name="name"
              required
              value={newPokemon.name}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="level"
            >
              Nivel
            </label>
            <input
              type="number"
              name="level"
              required
              value={newPokemon.level}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="type"
            >
              Tipo
            </label>
            <input
              type="text"
              name="type"
              required
              value={newPokemon.type}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="abilities"
            >
              Habilidades
            </label>
            <input
              type="text"
              name="abilities"
              required
              value={newPokemon.abilities}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="image"
            >
              URL de la Imagen
            </label>
            <input
              type="text"
              name="image"
              required
              value={newPokemon.image}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-white font-bold py-2 px-4 rounded hover:bg-gray-600 mr-2"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700"
            >
              Crear Pokémon
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PokemonForm
