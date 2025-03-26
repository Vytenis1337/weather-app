import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchDropdown from "./SearchDropdown";
import { searchCityByName } from "../services/geolocationService";
import { getViewedCities, saveCity } from "../utils/localStorage";

jest.mock("../services/geolocationService", () => ({
  __esModule: true,
  searchCityByName: jest.fn(),
}));

jest.mock("../utils/localStorage", () => ({
  __esModule: true,
  getViewedCities: jest.fn(),
  saveCity: jest.fn(),
}));

describe("SearchDropdown", () => {
  it("lets the user type and select a city from options", async () => {
    getViewedCities.mockReturnValue([]);
    searchCityByName.mockResolvedValue([{ name: "London" }]);

    const onCitySelect = jest.fn();
    render(<SearchDropdown onCitySelect={onCitySelect} />);

    const input = screen.getByRole("combobox", { name: /search for a city/i });

    await userEvent.type(input, "Lon");

    const option = await screen.findByRole("option", { name: /london/i });

    await userEvent.click(option);

    expect(saveCity).toHaveBeenCalledWith("London");
    expect(onCitySelect).toHaveBeenCalledWith({ name: "London" });
  });
});
