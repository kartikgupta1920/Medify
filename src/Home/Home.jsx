import React from "react";
import styles from "./Home.module.css"; 
import { Container, Box, Stack } from "@mui/material";
import HeroSlider from "../components/HeroSlider/HeroSlider";
import SearchHospital from "../components/SearchHospital/SearchHospital";
import FAQs from "../components/Sections/FAQs/FAQs";
import OurFamilies from "../components/Sections/OurFamilies/OurFamilies";
import Blogs from "../components/Sections/Blogs/Blogs";
import PatientCaring from "../components/Sections/PatientCaring/PatientCaring";
import Specialists from "../components/Sections/Specialists/Specialists";
import Specialization from "../components/Sections/Specialization/Specialization";
import Offers from "../components/Sections/Offers/Offers";
import NavBar from "../components/NavBar/NavBar";
import HeroServices from "../components/IconLayout/HeroServices";

export default function Home() {
  return (
    <Box className={styles.homeBox}>
      <Box className={styles.heroBackground} mb={4}>
        <NavBar />
        <Container maxWidth="xl">
          {/* hero section, with doc images and text */}
          <HeroSlider />
          <Stack
            className={styles.heroStack}
            spacing={10}
          >
            <SearchHospital />
            <HeroServices />
          </Stack>
        </Container>
      </Box>

      <Offers />
      <Specialization />
      <Specialists />
      <PatientCaring />
      <Blogs />
      <OurFamilies />
      <FAQs />
    </Box>
  );
}

