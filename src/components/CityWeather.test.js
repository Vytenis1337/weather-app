import React from "react";
import { render, screen } from "@testing-library/react";
import CityWeather from "./CityWeather";

describe("CityWeather", () => {
  const mockWeather = {
    current_weather: {
      temperature: 6.5,
      humidity: 82,
      windspeed: 10.2,
      time: "2025-03-25T10:30",
    },
    daily: {
      time: [
        "2025-03-26",
        "2025-03-27",
        "2025-03-28",
        "2025-03-29",
        "2025-03-30",
      ],
      temperature_2m_max: [10, 12, 11, 13, 14],
      temperature_2m_min: [3, 4, 5, 6, 7],
      precipitation_sum: [2, 1.5, 0, 0.5, 1],
    },
  };

  test("renders current weather info", () => {
    render(<CityWeather cityName="Kaunas" weather={mockWeather} />);

    expect(screen.getByText(/Kaunas - Current Weather/i)).toBeInTheDocument();
    expect(screen.getByText(/Temperature: 6.5/i)).toBeInTheDocument();
    expect(screen.getByText(/Humidity: 82/i)).toBeInTheDocument();
    expect(screen.getByText(/Wind: 10.2/i)).toBeInTheDocument();
    expect(screen.getByText(/Time: 2025-03-25T10:30/i)).toBeInTheDocument();
  });

  test("renders 5-day forecast correctly", () => {
    render(<CityWeather cityName="Kaunas" weather={mockWeather} />);

    expect(screen.getByText("2025-03-26")).toBeInTheDocument();
    expect(screen.getByText("2025-03-30")).toBeInTheDocument(); // 5th day
    expect(screen.getByText(/Min: 3/i)).toBeInTheDocument();
    expect(screen.getByText(/Max: 10/i)).toBeInTheDocument();
    expect(screen.getByText(/Precipitation: 2/i)).toBeInTheDocument();
  });
});
