import React from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Autocomplete, Box, Button } from "@mui/material";
import { validateString } from "../../utils/common";
import useCountries from "../../hooks/useCountries";
import Map from "../Map/Map";

const AddLocation = ({ propertyDetails, setPropertyDetails, nextStep, setOpened = {} }) => {
  const { getAll } = useCountries();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      country: propertyDetails?.country || "",
      city: propertyDetails?.city || "",
      address: propertyDetails?.address || "",
    },
  });

  const onSubmit = (data) => {
  setPropertyDetails((prev) => ({
    ...prev,
    country: data.country,
    city: data.city,
    address: data.address,
  }));

  console.log("Updated property details with location:", data);
  nextStep();
};

  const country = watch("country");
  const city = watch("city");
  const address = watch("address");

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }} // stack on small screens
          gap={4}
          mt={4}
        >
          {/* Left side - Form */}
          <Box flex={1} display="flex" flexDirection="column" gap={2}>
            {/* Country - Autocomplete */}
            <Controller
              name="country"
              control={control}
              rules={{
                required: "Country is required",
                validate: (value) => validateString(value) || "Invalid country",
              }}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  options={getAll()}
                  freeSolo
                  onChange={(e, value) => field.onChange(value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Country"
                      fullWidth
                      required
                      error={!!errors.country}
                      helperText={errors.country?.message}
                    />
                  )}
                />
              )}
            />

            {/* City */}
            <Controller
              name="city"
              control={control}
              rules={{
                required: "City is required",
                validate: (value) => validateString(value) || "Invalid city",
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="City"
                  fullWidth
                  required
                  error={!!errors.city}
                  helperText={errors.city?.message}
                />
              )}
            />

            {/* Address */}
            <Controller
              name="address"
              control={control}
              rules={{
                required: "Address is required",
                validate: (value) => validateString(value) || "Invalid address",
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Address"
                  fullWidth
                  required
                  error={!!errors.address}
                  helperText={errors.address?.message}
                />
              )}
            />
          </Box>

          {/* Right side - Map */}
          <Box flex={1}>
            {/* Replace with your actual Map component when ready */}
            <div>Map content here</div>
            {/* <Map address={address} city={city} country={country} /> */}
          </Box>
        </Box>
      </form>
      <Box mt={4} display="flex" justifyContent="center">
        <Button variant="contained" onClick={handleSubmit(onSubmit)} disabled={!isValid}>
          Next step
        </Button>
      </Box>
    </>
  );
};

export default AddLocation;
