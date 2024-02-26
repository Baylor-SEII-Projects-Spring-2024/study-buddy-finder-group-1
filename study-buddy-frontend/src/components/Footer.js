import React from "react";
import {Box, Container, Grid, Link as MuiLink, Paper, Typography} from "@mui/material";
import styles from "@/styles/Home.module.css";

export default function Footer({mainFont, whiteText}) {
    return (
        <Paper elevation={0} component="footer" sx={{ backgroundColor: 'rgba(0, 36, 53)', padding: 2 }}>
            <Container maxWidth="lg" component="footer">
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={4} sm={2}>
                        <Typography variant="h6" gutterBottom sx={{ fontFamily: mainFont, color: 'white' }}>
                            Learn More
                        </Typography>
                        <Box>
                            <MuiLink href="/about-us" className={styles.yourClassName} style={{ textDecoration: 'none', color: 'white' }}>
                                About Us
                            </MuiLink>
                            <br />
                            <MuiLink href="/about-us" className={styles.yourClassName} style={{ textDecoration: 'none', color: 'white' }}>
                                FAQ
                            </MuiLink>
                            <br />
                            <MuiLink href="/about-us" className={styles.yourClassName} style={{ textDecoration: 'none', color: 'white' }}>
                                Contact Us
                            </MuiLink>
                        </Box>
                    </Grid>

                    <Grid item xs={4} sm={2}>
                        <Typography variant="h6" gutterBottom sx={{ fontFamily: mainFont, color: 'white' }}>
                            Join Us
                        </Typography>
                        <Box>
                            <MuiLink href="/about-us" className={styles.yourClassName} style={{ textDecoration: 'none', color: 'white' }}>
                                Become a Tutor
                            </MuiLink>
                            <br />
                        </Box>
                    </Grid>

                    <Grid item xs={4} sm={2}>
                        <Typography variant="h6" gutterBottom sx={{ fontFamily: mainFont, color: 'white' }}>
                            Locations
                        </Typography>
                        <Box>
                            <MuiLink href="/about-us" className={styles.yourClassName} style={{ textDecoration: 'none', color: 'white' }}>
                                Moody Library
                            </MuiLink>
                            <br />
                            <MuiLink href="/about-us" className={styles.yourClassName} style={{ textDecoration: 'none', color: 'white' }}>
                                Baylor Science Building
                            </MuiLink>
                            <br />
                            <MuiLink href="/about-us" className={styles.yourClassName} style={{ textDecoration: 'none', color: 'white' }}>
                                Student Union Building
                            </MuiLink>
                            <br />
                            <MuiLink href="/about-us" className={styles.yourClassName} style={{ textDecoration: 'none', color: 'white' }}>
                                Armstrong Library
                            </MuiLink>
                        </Box>
                    </Grid>

                    <Grid item xs style={{ flexGrow: 0.1 }} />

                    <Grid item xs={4} sm={2}>
                        <Typography variant="h6" gutterBottom sx={{ fontFamily: mainFont, color: 'white' }}>
                            Social Media
                        </Typography>
                        <Box>
                            <MuiLink href="/about-us" className={styles.yourClassName} style={{ textDecoration: 'none', color: 'white' }}>
                                Facebook
                            </MuiLink>
                            <br />
                            <MuiLink href="/about-us" className={styles.yourClassName} style={{ textDecoration: 'none', color: 'white' }}>
                                X (Twitter)
                            </MuiLink>
                            <br />
                            <MuiLink href="/about-us" className={styles.yourClassName} style={{ textDecoration: 'none', color: 'white' }}>
                                Tik Tok
                            </MuiLink>
                            <br />
                            <MuiLink href="/about-us" className={styles.yourClassName} style={{ textDecoration: 'none', color: 'white' }}>
                                Snapchat
                            </MuiLink>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Paper>
    );
}