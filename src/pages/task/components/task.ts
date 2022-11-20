export const getColor = (value: string) => {
  if (value === "OPEN") {
    return "#ddd8d8";
  } else if (value === "DOING") {
    return "#ff4700";
  } else if (value === "COMPLETED") {
    return "#4fff16";
  } else if (value === "ILLEGAL") {
    return "#ff00e0";
  } else if (value === "PENDDING") {
    return "#ffeb00";
  }
};
