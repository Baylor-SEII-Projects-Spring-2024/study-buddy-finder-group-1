import React from 'react';
import { Box, Container, Typography, TextField, Button } from '@mui/material';
import Navbar from "@/components/Navbar";

const ContactUs = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
        // Add logic to handle form submission here
    };

    return (
        <div>
            <Navbar showLinks={false} />
            <Container maxWidth="md" style={{ marginTop: '150px' }}>
                <Box mt={5} pb={10}>
                    <Typography variant="h3" gutterBottom align="center" style={{ fontSize: '2.5rem' }}>
                        Contact Us
                    </Typography>
                    <Typography variant="body1" gutterBottom align="center">
                        Have a question or feedback for us? Fill out the form below and we'll get back to you as soon as possible.
                    </Typography>
                    <Box mt={5}>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Your Name"
                                variant="outlined"
                                required
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Your Email"
                                variant="outlined"
                                type="email"
                                required
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Message"
                                variant="outlined"
                                multiline
                                rows={4}
                                required
                            />
                            <Box textAlign="center">
                                <Button type="submit" variant="contained" color="primary">
                                    Submit
                                </Button>
                            </Box>
                        </form>
                    </Box>
                </Box>
            </Container>
        </div>
    );
};

export default ContactUs;
