import { Box, Stack, Typography } from "@mui/material";
import styles from './IconCard.module.css';

export default function IconCard({
  img,
  title,
  bgColor,
  active = false,
  shadow = false,
}) {
  return (
    <Stack
      className={`${styles.iconCard} ${active ? styles.iconCardActive : ''} ${shadow ? styles.iconCardShadow : ''}`}
      style={{ backgroundColor: !active ? bgColor : undefined }}
      spacing={2}
      alignItems="center"
    >
      <Box component="img" src={img} className={styles.iconImage} />
      <Typography
        className={`${styles.iconTitle} ${active ? styles.iconTitleActive : ''}`}
      >
        {title}
      </Typography>
    </Stack>
  );
}
