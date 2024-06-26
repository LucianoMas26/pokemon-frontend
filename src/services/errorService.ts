import { showAlert } from "./alertService"
import axios, { AxiosError } from "axios"

type ErrorResponse = {
  error: string
}
export const handleError = (error: any) => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ErrorResponse>
    const errorMessage =
      axiosError.response?.data.error || "Upps ocurrio un error"
    showAlert("error", errorMessage)
  } else {
    showAlert("error", "Upps ocurrio un error")
  }
}
