import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Box,
  Paper,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddLocation from "../AddLocation/AddLocation";
import { useAuth0 } from "@auth0/auth0-react";
import UploadImage from "../UploadImage/UploadImage";
import BasicDetails from "../BasicDetails/BasicDetails";
import Facilities from "../Facilities/Facilities";

const steps = [
  { label: "Location", description: "Address" },
  { label: "Images", description: "Upload" },
  { label: "Basics", description: "Details" },
  { label: "Facilities", description: "Facilities" }
];

const AddPropertyModal = ({ opened, setOpened }) => {
  const [activeStep, setActiveStep] = useState(0);

  const { user } = useAuth0();
  const [propertyDetails, setPropertyDetails] = useState({
    title: "",
    description: "",
    price: 0,
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

  const nextStep = () => {
    setActiveStep((current) => (current < 4 ? current + 1 : current));
  };

  const prevStep = () => {
    setActiveStep((current) => (current > 0 ? current - 1 : current));
  };

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);
  const handleReset = () => setActiveStep(0);

  const stepContent = (step) => {
    switch (step) {
      case 0:
        return "Step 1 content: Create an account";
      case 1:
        return "Step 2 content: Verify email";
      case 2:
        return "Step 3 content: Property details";
      case 3:
        return "Step 4 content: Property facilities"
      default:
        return "Unknown step";
    }
  };

  return (
    <>
      <Dialog
        open={opened}
        onClose={() => setOpened(false)}
        maxWidth={false}
        slotProps={{
          paper: {
            sx: {
              width: "80vw",
              maxWidth: "1000px",
              borderRadius: "16px",
              padding: "2rem",
              backgroundColor: "#fff",
              boxShadow: 24,
            },
          },
        }}
      >
        {/* Close button for the whole popup */}
        <Box
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            zIndex: 1,
          }}
        >
          <IconButton onClick={() => setOpened(false)} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent>
          <Box sx={{ width: "100%" }}>
            <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
              {steps.map((step, index) => (
                <Step key={index}>
                  <StepLabel
                    optional={
                      <Typography variant="caption" color="text.secondary">
                        {step.description}
                      </Typography>
                    }
                  >
                    {step.label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>

            {/* Step content */}
            <Box sx={{ mb: 4 }}>
              {/* Location */}
              {activeStep === 0 && (
                <AddLocation
                  nextStep={nextStep}
                  propertyDetails={propertyDetails}
                  setPropertyDetails={setPropertyDetails}
                  setOpened={setOpened}
                />
              )}

              {/* image upload */}
              {activeStep === 1 && (
                <UploadImage
                  prevStep={prevStep}
                  nextStep={nextStep}
                  propertyDetails={propertyDetails}
                  setPropertyDetails={setPropertyDetails}
                />
              )}

              {/* residency details */}
              {activeStep === 2 && (
                <BasicDetails
                  prevStep={prevStep}
                  nextStep={nextStep}
                  propertyDetails={propertyDetails}
                  setPropertyDetails={setPropertyDetails}
                />
              )}

              {/* residency facilities */}
              {activeStep === 3 && (
                <Facilities
                  prevStep={prevStep}
                  propertyDetails={propertyDetails}
                  setPropertyDetails={setPropertyDetails}
                  setOpened={setOpened}
                  setActiveStep={setActiveStep}
                />
              )}
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddPropertyModal;
