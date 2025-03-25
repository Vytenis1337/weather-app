import { getViewedCities, saveCity } from "./localStorage";

beforeEach(() => {
  localStorage.clear();
});

test("saves and retrieves viewed cities", () => {
  saveCity("Vilnius");
  saveCity("London");
  saveCity("Tokyo");
  saveCity("Berlin");

  const cities = getViewedCities();
  expect(cities).toEqual(["Berlin", "Tokyo", "London"]); // max 3, newest first
});
