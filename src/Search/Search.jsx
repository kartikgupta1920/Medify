import React, { useEffect, useState } from "react";
import styles from "./Search.module.css"; // Importing CSS module
import { Container, Stack, Box, Typography } from "@mui/material";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import HospitalCard from "../components/HospitalCard/HospitalCard";
import icon from "../assets/tick.png";
import cta from "../assets/cta.png";
import SearchHospital from "../components/SearchHospital/SearchHospital";
import BookingModal from "../components/BookingModal/BookingModal";
import AutohideSnackbar from "../components/AutohideSnackbar/AutohideSnackbar";
import NavBar from "../components/NavBar/NavBar";

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [hospitals, setHospitals] = useState([]);
  const [state, setState] = useState(searchParams.get("state"));
  const [city, setCity] = useState(searchParams.get("city"));
  const availableSlots = {
    morning: ["11:30 AM"],
    afternoon: ["12:00 PM", "12:30 PM", "01:30 PM", "02:00 PM", "02:30 PM"],
    evening: ["06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM"],
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({});
  const [showBookingSuccess, setShowBookingSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getHospitals = async () => {
      setHospitals([]);
      setIsLoading(true);
      try {
        const data = await axios.get(
          `https://meddata-backend.onrender.com/data?state=${state}&city=${city}`
        );

        console.log("hospitals", data.data);
        setHospitals(data.data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };

    if (state && city) {
      getHospitals();
    }
  }, [state, city]);

  useEffect(() => {
    setState(searchParams.get("state"));
    setCity(searchParams.get("city"));
  }, [searchParams]);

  const handleBookingModal = (details) => {
    setBookingDetails(details);
    setIsModalOpen(true);
  };

  return (
    <>
      <NavBar />
      <Box className={styles.gradientBackground}>
        <Box className={styles.heroSection}>
          <Container maxWidth="xl" className={styles.heroContainer}>
            <SearchHospital />
          </Container>
        </Box>

        <Container maxWidth="xl" className={styles.hospitalsContainer}>
          {hospitals.length > 0 && (
            <Box className={styles.availableCenters}>
              <Typography className={styles.availableCentersHeading}>
                {`${hospitals.length} medical centers available in `}
                <span style={{ textTransform: "capitalize" }}>
                  {city.toLocaleLowerCase()}
                </span>
              </Typography>
              <Stack direction="row" spacing={2} className={styles.iconText}>
                <img src={icon} height={24} width={24} alt="icon" className={styles.iconImage}/>
                <Typography color="#787887" lineHeight={1.4}>
                  Book appointments with minimum wait-time & verified doctor
                  details
                </Typography>
              </Stack>
            </Box>
          )}

          <Stack alignItems="flex-start" direction={{ md: "row" }}>
            <Stack className={styles.hospitalsList}>
              {hospitals.length > 0 &&
                hospitals.map((hospital) => (
                  <HospitalCard
                    key={hospital["Hospital Name"]}
                    details={hospital}
                    availableSlots={availableSlots}
                    handleBooking={handleBookingModal}
                  />
                ))}

              {isLoading && (
                <Typography variant="h3" className={styles.loadingMessage}>
                  Loading...
                </Typography>
              )}

              {!state && (
                <Typography variant="h3" className={styles.selectStateMessage}>
                  Please select a state and city
                </Typography>
              )}
            </Stack>

            <img src={cta} alt="banner" className={styles.bannerImage} />
          </Stack>
        </Container>

        <BookingModal
          sx={{ background: "red" }}
          open={isModalOpen}
          setOpen={setIsModalOpen}
          bookingDetails={bookingDetails}
          showSuccessMessage={setShowBookingSuccess}
        />

        <AutohideSnackbar
          open={showBookingSuccess}
          setOpen={setShowBookingSuccess}
          message="Booking Successful"
        />
      </Box>
    </>
  );
}
