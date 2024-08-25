import * as React from 'react';
import AddIcon from '@mui/icons-material/Add';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import styles from './Accordion.module.css';

export default function CustomizedAccordions({ data }) {
    const [expanded, setExpanded] = React.useState('');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <div>
            {data.map((item, index) => (
                <MuiAccordion
                    key={index}
                    className={styles.accordion}
                    expanded={expanded === `panel${index}`}
                    onChange={handleChange(`panel${index}`)}
                    disableGutters
                    elevation={0}
                    square
                >
                    <MuiAccordionSummary
                        className={styles.accordionSummary}
                        aria-controls={`panel${index}d-content`}
                        id={`panel${index}d-header`}
                        expandIcon={<AddIcon className={styles.expandIconWrapper} />}
                    >
                        <Typography className={styles.typographyTitle}>
                            {item.question}
                        </Typography>
                    </MuiAccordionSummary>
                    <MuiAccordionDetails className={styles.accordionDetails}>
                        <Typography className={styles.typographyContent}>
                            {item.answer}
                        </Typography>
                    </MuiAccordionDetails>
                </MuiAccordion>
            ))}
        </div>
    );
}
