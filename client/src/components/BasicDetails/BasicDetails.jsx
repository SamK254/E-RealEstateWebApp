import React from "react";
import { useForm } from "react-hook-form";
import { validateString } from "../../utils/common";
import { Box, Button, TextField } from "@mui/material";

const BasicDetails = ({
  prevStep,
  nextStep,
  propertyDetails,
  setPropertyDetails,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: propertyDetails.title,
      description: propertyDetails.description,
      price: propertyDetails.price,
    },
    mode: "onChange",
  });

  const onSubmit = (data) => {
    setPropertyDetails((prev) => ({
      ...prev,
      ...data,
    }));
    nextStep();
  };

  return (
    <Box maxWidth="500px" mx="auto" my={4}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Title"
          fullWidth
          margin="normal"
          {...register("title", {
            required: "Title is required",
            validate: (value) => validateString(value) || "Must have at least 3 characters",
          })}
          error={!!errors.title}
          helperText={errors.title?.message}
        />

        <TextField
          label="Description"
          fullWidth
          multiline
          rows={4}
          margin="normal"
          {...register("description", {
            required: "Description is required",
            validate: (value) => validateString(value) || "Must have at least 3 characters",
          })}
          error={!!errors.description}
          helperText={errors.description?.message}
        />

        <TextField
          label="Price"
          type="number"
          fullWidth
          margin="normal"
          {...register("price", {
            required: "Price is required",
            validate: (value) =>
              parseFloat(value) >= 1000 || "Must be greater than Ksh 999",
          })}
          error={!!errors.price}
          helperText={errors.price?.message}
        />

        {/* Buttons */}
        <Box mt={4} display="flex" justifyContent="center">
          <Button variant="outlined" color="inherit" onClick={prevStep}>
            Back
          </Button>
          <Button type="submit" variant="contained" sx={{ ml: 2 }}>
            Next
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default BasicDetails;
