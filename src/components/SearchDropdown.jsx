import React, { useState, useEffect } from "react";
import {
  Autocomplete,
  TextField,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { getViewedCities, saveCity } from "../utils/localStorage";
import { searchCityByName } from "../services/geolocationService";

const SearchDropdown = ({ onCitySelect }) => {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const viewedCities = getViewedCities();

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (inputValue.length > 2) {
        setLoading(true);
        const results = await searchCityByName(inputValue);
        setOptions(results);
        setLoading(false);
      } else {
        setOptions([]);
      }
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [inputValue]);

  const handleSelect = (event, selectedCity) => {
    if (selectedCity) {
      saveCity(selectedCity.name);
      onCitySelect(selectedCity);
    }
  };

  return (
    <Box>
      <Autocomplete
        options={options || []}
        getOptionLabel={(option) => option?.name || ""}
        onChange={handleSelect}
        inputValue={inputValue}
        onInputChange={(e, newInputValue) => setInputValue(newInputValue)}
        loading={loading}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search for a city"
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? <CircularProgress size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
        fullWidth
      />

      {viewedCities.length > 0 && (
        <Box mt={2}>
          <Typography variant="subtitle2">Recently Viewed:</Typography>
          {viewedCities.map((cityName) => (
            <Box
              key={cityName}
              sx={{
                display: "inline-block",
                padding: "0.3rem 0.7rem",
                backgroundColor: "#eee",
                borderRadius: "20px",
                marginRight: "0.5rem",
                cursor: "pointer",
                "&:hover": { backgroundColor: "#ddd" },
              }}
              onClick={async () => {
                const results = await searchCityByName(cityName.split(",")[0]);
                const matched = results.find((r) => r.name === cityName);
                if (matched) handleSelect(null, matched);
              }}
            >
              {cityName}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default SearchDropdown;
