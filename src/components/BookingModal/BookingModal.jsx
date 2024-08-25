import {
  Modal,
  Typography,
  Box,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import { useState } from "react";
import { format } from "date-fns";
import styles from './BookingModal.module.css';

export default function BookingModal({
  setOpen,
  open,
  bookingDetails,
  showSuccessMessage,
}) {
  const [email, setEmail] = useState("");

  const handleBooking = (e) => {
    e.preventDefault();
    triggerEvent();

    const bookings = localStorage.getItem("bookings") || "[]";
    const oldBookings = JSON.parse(bookings);

    localStorage.setItem(
      "bookings",
      JSON.stringify([
        ...oldBookings,
        { ...bookingDetails, bookingEmail: email },
      ])
    );
    showSuccessMessage(true);
    setEmail("");
    setOpen(false);
  };

  const triggerEvent = () => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "first_visit",
      eventDate: new Date().toISOString(),
    });
  };

  const formatDate = (day) => {
    if (day) {
      const date = new Date(day);
      return format(date, "E, d LLL");
    } else {
      return null;
    }
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box className={styles.modalBox}>
        <Typography component="h3" variant="h3" className={styles.heading}>
          Confirm booking
        </Typography>
        <Typography fontSize={14} mb={3} className={styles.subText}>
          <Box component="span">
            Please enter your email to confirm booking for{" "}
          </Box>
          <Box component="span" className={styles.spanBold}>
            {`${bookingDetails.bookingTime} on ${formatDate(
              bookingDetails.bookingDate
            )}`}
          </Box>
        </Typography>
        <form onSubmit={handleBooking}>
          <Stack className={styles.formStack} spacing={2}>
            <TextField
              type="email"
              label="Enter your email"
              variant="outlined"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Stack direction="row" spacing={1} className={styles.buttonGroup}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                disableElevation
              >
                Confirm
              </Button>
              <Button
                variant="outlined"
                size="large"
                disableElevation
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
            </Stack>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
}
