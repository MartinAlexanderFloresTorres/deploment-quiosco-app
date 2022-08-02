export const formatearDinero = (cantida) => {
  return cantida.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};
export const formatearFecha = (fecha) => {
  const _date = new Date(fecha);
  const opciones = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return _date.toLocaleString("es-PE", opciones);
};
