import icon from "../../assets/hospitalicon.png";
import { Box, Button, Chip, Divider, Stack, Typography } from "@mui/material";
import thumb from "../../assets/thumbsup.png";
import Calendar from "../Calendar/Calendar";
import { useState } from "react";
import { format, isValid } from "date-fns";
import styles from './HospitalCard.module.css';

export default function HospitalCard({
  details,
  availableSlots,
  handleBooking,
  booking = false,
}) {
  const [showCalendar, setShowCalendar] = useState(false);

  const hospitalName = details["Hospital Name"] ? details["Hospital Name"].toLowerCase() : "Unknown Hospital";
  const city = details["City"] ? details["City"].toLowerCase() : "Unknown City";
  const state = details["State"] || "Unknown State";
  const hospitalRating = details["Hospital overall rating"] === "Not Available" ? 0 : details["Hospital overall rating"];

  const bookingDate = details.bookingDate && isValid(new Date(details.bookingDate))
    ? format(new Date(details.bookingDate), "dd MMMM yyyy")
    : "Unknown Date";

  return (
    <Box className={styles.hospitalCard}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={{ xs: 1, md: 4 }}
        className={`${styles.hospitalStack} ${styles.hospitalStackRow}`}
      >
        <Box
          component="img"
          src={icon}
          className={`${styles.hospitalIcon} ${styles.hospitalIconMd}`}
        />

        <Box flex={1}>
          <Typography
            component="h3"
            className={`${styles.hospitalName} ${styles.hospitalNameMd}`}
          >
            {hospitalName}
          </Typography>
          <Typography
            className={styles.hospitalLocation}
          >
            {`${city}, ${state}`}
          </Typography>
          <Typography className={styles.hospitalType}>
            {details["Hospital Type"]}
          </Typography>
          <Stack direction="row" className={styles.consultationFeeStack}>
            <Typography className={styles.consultationFeeFree}>
              Free
            </Typography>
            <Typography className={styles.consultationFeeStrikethrough}>
              ₹500
            </Typography>
            <Typography>Consultation fee at clinic</Typography>
          </Stack>
          <Divider className={styles.dividerDashed} />
          <Stack
            direction="row"
            alignItems="center"
            className={styles.ratingStack}
          >
            <Box
              component={"img"}
              src={thumb}
              className={`${styles.thumbIcon} ${styles.thumbIconMd}`}
            />
            <Typography
              className={`${styles.ratingText} ${styles.ratingTextMd}`}
            >
              {hospitalRating}
            </Typography>
          </Stack>
        </Box>

        <Stack
          justifyContent={booking ? "flex-start" : "flex-end"}
          className={`${styles.bookingStack} ${booking && styles.bookingStackStart}`}
        >
          {!booking && (
            <>
              <Typography
                className={styles.bookingButton}
              >
                Available Today
              </Typography>
              <Button
                variant="contained"
                disableElevation
                onClick={() => setShowCalendar((prev) => !prev)}
              >
                {!showCalendar
                  ? "Book FREE Center Visit"
                  : "Hide Booking Calendar"}
              </Button>
            </>
          )}

          {booking && (
            <Stack direction="row" spacing={1} mt={{ xs: 2, md: 0 }}>
              <Chip
                label={details.bookingTime}
                variant="outlined"
                color="primary"
                className={styles.bookingChip}
              />
              <Chip
                label={bookingDate}
                variant="outlined"
                color="success"
                className={styles.bookingChip}
              />
            </Stack>
          )}
        </Stack>
      </Stack>

      {showCalendar && (
        <Calendar
          details={details}
          availableSlots={availableSlots}
          handleBooking={handleBooking}
          className={styles.calendarContainer}
        />
      )}
    </Box>
  );
}
