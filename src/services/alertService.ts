import Swal from "sweetalert2"

export const showAlert = (type: "success" | "error", message: string) => {
  Swal.fire({
    icon: type,
    title: type === "success" ? "¡Éxito!" : "¡Error!",
    text: message
  })
}
