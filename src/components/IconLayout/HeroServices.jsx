import { Box, Grid, Typography } from "@mui/material";
import doctorIcon from "../../assets/Doctor.png";
import pharmacyIcon from "../../assets/Drugstore.png";
import hospitalIcon from "../../assets/Hospital.png";
import capsuleIcon from "../../assets/Capsule.png";
import ambulanceIcon from "../../assets/Ambulance.png";
import IconCard from "../IconCard/IconCard";
import { useMemo } from "react";
import styles from './HeroServices.module.css';

export default function HeroServices() {
  const Services = useMemo(
    () => [
      { img: doctorIcon, title: "Doctors" },
      { img: pharmacyIcon, title: "Labs" },
      { img: hospitalIcon, title: "Hospitals", active: true },
      { img: capsuleIcon, title: "Medical Store" },
      { img: ambulanceIcon, title: "Ambulance" },
    ],
    []
  );

  return (
    <Box className={styles.container}>
      <Typography
        component="h4"
        className={styles.title}
      >
        You may be looking for
      </Typography>
      <Grid
        container
        className={styles.gridContainer}
        rowSpacing={{xs:2}}
        columnSpacing={{ xs: 1, md: 2 }}
      >
        {Services.map((service) => (
          <Grid item key={service.title} xs={12} md={2.4}>
            <IconCard
              img={service.img}
              title={service.title}
              active={service.active || false}
              bgColor="#FAFBFE"
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
