import React, { useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import { Box, Button, TextField } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import UserDetailContext from "../../Context/UserDetailContext";
import useProperties from "../../hooks/useProperties.jsx";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { createResidency } from "../../utils/api.js";

const Facilities = ({
  prevStep,
  propertyDetails,
  setPropertyDetails,
  setOpened,
  setActiveStep,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      bedrooms: propertyDetails.facilities?.bedrooms || 0,
      parkings: propertyDetails.facilities?.parkings || 0,
      bathrooms: propertyDetails.facilities?.bathrooms || 0,
    },
  });

  // ✅ Hooks MUST be outside functions like onSubmit
  const { user } = useAuth0();
  const {
    userDetails: { token },
  } = useContext(UserDetailContext);
  const { refetch: refetchProperties } = useProperties();

  const { mutate, isLoading } = useMutation({
    mutationFn: (finalDetails) => createResidency(finalDetails, token),
    onError: ({ response }) =>
      toast.error(response.data.message, { position: "bottom-right" }),
    onSuccess: () => {
      toast.success("Added successfully", { position: "bottom-right" });
      setPropertyDetails({
        title: "",
        description: "",
        price: "",
        country: "",
        city: "",
        address: "",
        image: null,
        facilities: {
          bedrooms: 0,
          parkings: 0,
          bathrooms: 0,
        },
        userEmail: user?.email,
      });

      setOpened(false);
      setActiveStep(0);
      refetchProperties();
    },
  });

  // ✅ Submit handler
  const onSubmit = (data) => {
    const updatedDetails = {
      ...propertyDetails,
      userEmail: user?.email,
      country: propertyDetails.country?.value || propertyDetails.country,
      price: Number(propertyDetails.price),
      facilities: {
        bedrooms: Number(data.bedrooms),
        parkings: Number(data.parkings),
        bathrooms: Number(data.bathrooms),
      },
    };

    console.log(updatedDetails);
    setPropertyDetails(updatedDetails);
    mutate(updatedDetails); // ✅ trigger mutation with correct data
  };

  return (
    <Box maxWidth="400px" mx="auto" my={4}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="bedrooms"
          control={control}
          rules={{
            required: "At least 1 bedroom required",
            min: { value: 1, message: "Must have at least one bedroom" },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="No of Bedrooms"
              type="number"
              fullWidth
              required
              margin="normal"
              error={!!errors.bedrooms}
              helperText={errors.bedrooms?.message}
            />
          )}
        />

        <Controller
          name="parkings"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="No of Parkings"
              type="number"
              fullWidth
              margin="normal"
            />
          )}
        />

        <Controller
          name="bathrooms"
          control={control}
          rules={{
            required: "At least 1 bathroom required",
            min: { value: 1, message: "Must have at least one bathroom" },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="No of Bathrooms"
              type="number"
              fullWidth
              required
              margin="normal"
              error={!!errors.bathrooms}
              helperText={errors.bathrooms?.message}
            />
          )}
        />

        {/* Buttons */}
        <Box mt={4} display="flex" justifyContent="center">
          <Button variant="outlined" color="inherit" onClick={prevStep}>
            Back
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{
              ml: 2,
              backgroundColor: "green",
              "&:hover": { backgroundColor: "darkgreen" },
            }}
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Add Property"}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Facilities;
