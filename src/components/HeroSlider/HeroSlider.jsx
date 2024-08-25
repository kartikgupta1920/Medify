import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import img from '../../assets/home.webp';
import { Box, Stack, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './HeroSlider.module.css';

export default function HeroSlider() {
    return (
        <Swiper>
            <SwiperSlide className={styles.heroSlide}>
                <Stack direction={{ xs: 'column', md: "row" }} spacing={6} alignItems="center" pt={2} className={styles.heroSlideRow}>
                    <Box>
                        <Typography variant='h3' component='h1' className={styles.heroTitle}>
                            Skip the travel! Find Online
                        </Typography>
                        <Typography variant='h1' component='h1' mb={1} className={styles.heroSubtitle}>
                            Medical <span className={styles.heroSpan}>Centers</span>
                        </Typography>
                        <Typography fontSize={{ md: 20 }} mb={3} className={styles.heroDescription}>
                            Connect instantly with a 24x7 specialist or choose to video visit a particular doctor.
                        </Typography>
                        <Link to='/search'>
                            <Button variant='contained' size="large" disableElevation>
                                Find Centers
                            </Button>
                        </Link>
                    </Box>
                    <Box
                        component={'img'}
                        src={img}
                        className={styles.heroImage}
                    />
                </Stack>
            </SwiperSlide>
        </Swiper>
    )
}
