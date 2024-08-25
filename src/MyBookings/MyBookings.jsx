import React, { useEffect, useState } from "react";
import styles from "./MyBookings.module.css"; 
import { Box, Typography, Container, Stack } from "@mui/material";
import HospitalCard from "../components/HospitalCard/HospitalCard";
import cta from "../assets/cta.png";
import SearchBar from "../components/SearchBar/SearchBar";
import NavBar from "../components/NavBar/NavBar";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);

  useEffect(() => {
    const localBookings = localStorage.getItem("bookings") || "[]";
    setBookings(JSON.parse(localBookings));
  }, []);

  useEffect(() => {
    setFilteredBookings(bookings);
  }, [bookings]);

  return (
    <>
      <NavBar />
      <Box className={styles.gradientBackground}>
        <Box className={styles.heroSection}>
          <Container maxWidth="xl" className={styles.heroContainer}>
            <Stack
              className={styles.heroStack}
              alignItems={{ xs: "center", md: "flex-end" }}
            >
              <Typography className={styles.heroTitle}>
                My Bookings
              </Typography>
              <Box className={styles.searchBarBox}>
                <SearchBar list={bookings} filterList={setFilteredBookings} />
              </Box>
            </Stack>
          </Container>
        </Box>

        <Container maxWidth="xl" className={styles.bookingsContainer}>
          <Stack alignItems="flex-start" direction={{ md: "row" }}>
            <Stack className={styles.bookingsList}>
              {filteredBookings.length > 0 &&
                filteredBookings.map((hospital) => (
                  <HospitalCard
                    key={hospital["Hospital Name"]}
                    details={hospital}
                    booking={true}
                  />
                ))}

              {filteredBookings.length === 0 && (
                <Typography variant="h3" className={styles.noBookingsText}>
                  No Bookings Found!
                </Typography>
              )}
            </Stack>
            <img src={cta} className={styles.ctaImage} alt="Call to Action" />
          </Stack>
        </Container>
      </Box>
    </>
  );
}
