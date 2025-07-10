import React, { useEffect, useRef, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import "./UploadImage.css";
import { Box, Button } from "@mui/material";
const UploadImage = ({
  propertyDetails,
  setPropertyDetails,
  nextStep,
  prevStep,
}) => {
  const [imageURL, setImageURL] = useState(propertyDetails.image);
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const handleNext = () => {
    setPropertyDetails((prev) => ({ ...prev, image: imageURL }));
    nextStep();
  };

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dvlrrlxwj",
        uploadPreset: "auiebhvao",
        maxFiles: 1,
      },
      (err, result) => {
        if (result.event === "success") {
          setImageURL(result.info.secure_url);
        }
      }
    );
  }, []);
  return (
    <>
      <div className="flexColCenter uploadWrapper">
        {!imageURL ? (
          <div
            className="flexColCenter uploadZone"
            onClick={() => widgetRef.current?.open()}
          >
            <AiOutlineCloudUpload size={50} color="grey" />
            <span>Upload Image</span>
          </div>
        ) : (
          <div
            className="uploadedImage"
            onClick={() => widgetRef.current?.open()}
          >
            <img src={imageURL} alt="" />
          </div>
        )}
      </div>

      {/* Buttons for this step */}
      <Box mt={4} display="flex" justifyContent="center">
        <Button variant="outlined" color="inherit" onClick={prevStep}>
          Back
        </Button>
        <Button variant="contained" onClick={handleNext} disabled={!imageURL} sx={{ ml: 2 }}>
          Next
        </Button>
      </Box>
    </>
  );
};

export default UploadImage;
