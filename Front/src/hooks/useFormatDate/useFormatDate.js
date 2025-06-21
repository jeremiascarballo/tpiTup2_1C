export const useFormatDate = (newDate) => {
    if (!newDate) return "";
  
    const date = new Date(newDate);
  
    const configDate = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "America/Argentina/Buenos_Aires",
      hour12: false,
    };
  
    return date.toLocaleString("es-AR", configDate);
  };
  