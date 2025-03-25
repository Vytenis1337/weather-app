export const getViewedCities = () =>
  JSON.parse(localStorage.getItem("viewedCities") || "[]");

export const saveCity = (cityName) => {
  const existing = getViewedCities();
  const updated = [cityName, ...existing.filter((c) => c !== cityName)].slice(
    0,
    3
  );
  localStorage.setItem("viewedCities", JSON.stringify(updated));
};
