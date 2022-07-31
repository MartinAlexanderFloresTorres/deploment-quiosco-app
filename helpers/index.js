export const formatearDinero = (cantida) =>{
  return cantida.toLocaleString("en-US", {
    style: "currency",
    currency: "USD"
  })
}