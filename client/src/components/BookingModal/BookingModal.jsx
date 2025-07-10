import React, { useContext, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useMutation } from "react-query";
import UserDetailContext from "../../Context/UserDetailContext";
import { bookVisit } from "../../utils/api";
import { toast } from "react-toastify";
import dayjs from "dayjs";

const BookingModal = ({ opened, setOpened, email, propertyId }) => {
  const [value, setSelectedDate] = useState(null);

  const {
    userDetails: { token },
    setUserDetails,
  } = useContext(UserDetailContext);

  const handleBookingSuccess = () => {
    toast.success("You have booked your visit", {
      position: "bottom-right",
    });
    setUserDetails((prev) => ({
      ...prev,
      bookings: [
        ...prev.bookings,
        {
          id: propertyId,
          date: dayjs(value).format("DD/MM/YYYY"),
        },
      ],
    }));
  };

  const handleClose = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    setOpened(false);
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: () => bookVisit(value, propertyId, email, token),
    onSuccess: () => handleBookingSuccess(),
    onError: ({ response }) => toast.error(response.data.message),
    onSettled: () => setOpened(false),
  });

  return (
    <Dialog open={opened} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Select your date of visit:</DialogTitle>
      <DialogContent>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <div className="paddings flexCenter">
            <DatePicker
              label="Visit Date"
              value={value}
              onChange={(newValue) => setSelectedDate(newValue)}
              enableAccessibleFieldDOMStructure={false}
              slots={{
                textField: (props) => (
                  <TextField {...props} fullWidth size="small" />
                ),
              }}
              minDate={new Date()}
            />
          </div>
        </LocalizationProvider>
        <div className="flexCenter">
          <Button
            disabled={!value || isLoading}
            onClick={() => mutate()}
            variant="contained"
            color="primary"
          >
            Book visit
          </Button>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookingModal;
